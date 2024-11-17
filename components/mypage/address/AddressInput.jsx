'use client';
import { Box, Text } from '@radix-ui/themes';
import styles from './AddressInput.module.css';
import { useEffect, useState } from 'react';
import Modal from '@/components/common/Modal/Modal';
import instance from '@/apis/instance';
import { ButtonL, Toast } from '@/components/common';

export default function AddressInput({}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isToastActive, setIsToastActive] = useState(false);

  // 광역시 배열
  const majorCities = ['서울', '부산', '대구', '인천', '광주', '대전', '울산'];

  // 모달 상태를 3개로 초기화
  const [isModalOpen, setIsModalOpen] = useState([false, false, false]);

  // 주소 객체 초기 상태
  const defaultAddresses = [
    { type: 'HOME', doName: '', siName: '', guName: '', dongName: '' },
    { type: 'COMPANY', doName: '', siName: '', guName: '', dongName: '' },
    { type: 'OTHER', doName: '', siName: '', guName: '', dongName: '' },
  ];
  // 주소 상태 초기화
  const [addresses, setAddresses] = useState(defaultAddresses);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const response = await instance.get('/members/me/addresses');
        const data = response.data.addresses;
        // API 응답을 주소 객체 배열로 변환
        const formattedAddresses = data.map((address) => ({
          type: address.type,
          doName: address.do,
          siName: address.si,
          guName: address.gu,
          dongName: address.dong,
        }));

        // 주소 타입 순서에 따라 정렬: HOME, COMPANY, OTHER
        const sortedAddresses = [
          formattedAddresses.find((addr) => addr.type === 'HOME') || defaultAddresses[0],
          formattedAddresses.find((addr) => addr.type === 'COMPANY') || defaultAddresses[1],
          formattedAddresses.find((addr) => addr.type === 'OTHER') || defaultAddresses[2],
        ];

        // 상태 업데이트
        setAddresses(sortedAddresses);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('인증 토큰이 만료되었습니다. 재 로그인 해주세요.');
        } else {
          console.error('주소 가져오기에 실패했습니다:', error.message);
        }
        // 오류가 발생해도 기본 주소 데이터 유지
        setAddresses(defaultAddresses);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();

    // 카카오 주소찾기 API 로드
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    script.onload = () => {
      console.log('카카오 주소 찾기 API 로드 됨');
    };
    script.onerror = () => {
      console.error('카카오 주소 찾기 API 로드 실패됨');
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleAddressSearch = (index) => {
    setIsModalOpen((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const handleModalClose = (index) => {
    setIsModalOpen((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const renderAddressModal = (index) => {
    // SSR일 때 window 객체가 없을 수 있음
    if (typeof window === 'undefined' || !window.daum || !window.daum.Postcode) return null;
    return (
      <Modal
        isOpen={isModalOpen[index]}
        closeModal={() => handleModalClose(index)}
        header={{ title: '주소 검색', text: '주소를 검색하고 선택해 주세요.' }}
      >
        <div id={`postcodeContainer${index}`} className={styles.postcodeModalContent} />
      </Modal>
    );
  };

  useEffect(() => {
    // 주소 검색 API가 준비된 후 실행
    [0, 1, 2].forEach((index) => {
      if (isModalOpen[index] && window.daum && window.daum.Postcode) {
        new window.daum.Postcode({
          oncomplete: function (data) {
            if (!data.jibunAddress && !data.roadAddress) {
              alert('잘못된 주소입니다. 다시 올바른 주소를 선택해주세요.');
              handleModalClose(index);
              return;
            }

            const fullAddress = data.jibunAddress;
            const addressParts = fullAddress.split(' ');

            // 주요 도시에 따른 포맷팅 적용
            let doName = addressParts[0] || '';
            let siName = '';
            let guName = '';
            let dongName = '';

            if (majorCities.includes(doName)) {
              // 주요 도시일 경우
              siName = doName;
              guName = addressParts[1] || '';
              dongName = addressParts[2] || '';
            } else {
              // 주요 도시가 아닐 경우
              siName = addressParts[1] || '';
              guName = addressParts[2] || '';
              dongName = addressParts[3] || '';
            }

            // 상태 업데이트 (해당 인덱스의 주소값만 수정)
            setAddresses((prev) => {
              const updatedAddresses = [...prev];
              updatedAddresses[index] = {
                ...prev[index],
                doName,
                siName,
                guName,
                dongName,
              };
              return updatedAddresses;
            });

            handleModalClose(index);
          },
          width: '100%',
          height: '500px',
        }).embed(document.getElementById(`postcodeContainer${index}`));
      }
    });
  }, [isModalOpen, majorCities]);

  const formatAddressForBackend = (address) => ({
    type: address.type,
    doName: address.doName,
    siName: address.siName,
    guName: address.guName,
    dongName: address.dongName,
  });

  const sendAddressesToBackend = async () => {
    setIsLoading(true);
    setErrorMessage('');

    const formattedAddresses = addresses.map(formatAddressForBackend);
    const requestBody = { addresses: formattedAddresses };

    const isEmpty = addresses.every(
      (address) => !address.doName || !address.siName || !address.guName || !address.dongName,
    );

    if (isEmpty) {
      setIsToastActive(true);
      setIsLoading(false);
      return;
    }

    console.log('전송할 주소 데이터:', JSON.stringify(requestBody, null, 2));

    try {
      await instance.post('/members/me/addresses', requestBody);
      console.log('주소 전송 성공');
    } catch (error) {
      console.error('주소 전송 실패 :', error.message);
      setErrorMessage('다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const getAddressValue = (address) => {
    const { doName, siName, guName, dongName } = address;
    const hasAddress = doName || siName || guName || dongName;
    if (!hasAddress) {
      return '';
    }

    // (광역/특별시인 경우) = doName과 siName이 동일한 경우 -> doName을 한 번만 포함
    if (doName === siName) {
      return [doName, guName, dongName].filter(Boolean).join(' ');
    }

    // doName과 siName이 다른 경우, 모두 포함
    return [doName, siName, guName, dongName].filter(Boolean).join(' ');
  };

  return (
    <form onSubmit={sendAddressesToBackend}>
      <Box className={styles.rowContainer}>
        <Box className={styles.inputWrapper}>
          <Text as="label" htmlFor={`HOME`} className="require">
            <strong>관심지역 #1</strong>
          </Text>
          <div className={styles.inputContainer}>
            <input
              type="text"
              id={`HOME`}
              value={getAddressValue(addresses[0])}
              readOnly
              placeholder="활동 지역을 추가해주세요!"
              className={styles.inputField}
            />
            <button
              type="button"
              className={styles.searchButton}
              onClick={() => handleAddressSearch(0)}
              disabled={isLoading}
            >
              {isLoading ? '로딩 중...' : '주소 검색'}
            </button>
          </div>
          {renderAddressModal(0)}
        </Box>

        <Box className={styles.inputWrapper}>
          <Text as="label" htmlFor={`COMPANY`} className="require">
            <strong>관심지역 #2</strong>
          </Text>
          <div className={styles.inputContainer}>
            <input
              type="text"
              id={`COMPANY`}
              value={getAddressValue(addresses[1])}
              readOnly
              placeholder="활동 지역을 추가해주세요!"
              className={styles.inputField}
            />
            <button
              type="button"
              className={styles.searchButton}
              onClick={() => handleAddressSearch(1)}
              disabled={isLoading}
            >
              {isLoading ? '로딩 중...' : '주소 검색'}
            </button>
          </div>
          {renderAddressModal(1)}
        </Box>

        <Box className={styles.inputWrapper}>
          <Text as="label" htmlFor={`OTHER`} className="require">
            <strong>관심지역 #3</strong>
          </Text>
          <div className={styles.inputContainer}>
            <input
              type="text"
              id={`OTHER`}
              value={getAddressValue(addresses[2])}
              readOnly
              placeholder="활동 지역을 추가해주세요!"
              className={styles.inputField}
            />
            <button
              type="button"
              className={styles.searchButton}
              onClick={() => handleAddressSearch(2)}
              disabled={isLoading}
            >
              {isLoading ? '로딩 중...' : '주소 검색'}
            </button>
          </div>
          {renderAddressModal(2)}
        </Box>

        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

        <ButtonL onClick={sendAddressesToBackend} disabled={isLoading} style="deep">
          {isLoading ? '수정 중...' : '수정'}
        </ButtonL>
      </Box>

      <Toast as="error" isActive={isToastActive} onClose={() => setIsToastActive(false)}>
        <Text>활동 지역을 최소 1개 이상 설정해주세요!</Text>
      </Toast>
    </form>
  );
}
