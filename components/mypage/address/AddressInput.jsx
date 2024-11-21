'use client';
import { Text, Flex } from '@radix-ui/themes';
import styles from './AddressInput.module.css';
import { useEffect, useState, useMemo, useCallback } from 'react';
import Modal from '@/components/common/Modal/Modal';
import mypageAPI from '@/apis/mypageAPI';
import { ButtonL, Toast } from '@/components/common';
import useToast from '@/hooks/useToast';
import { useForm } from 'react-hook-form';

export default function AddressInput() {
  const { toast, setToast, toastMessage, showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const addressForm = useForm({
    defaultValues: {
      addresses: [
        { type: 'HOME', doName: '', siName: '', guName: '', dongName: '' },
        { type: 'COMPANY', doName: '', siName: '', guName: '', dongName: '' },
        { type: 'OTHER', doName: '', siName: '', guName: '', dongName: '' },
      ],
    },
  });

  const { register, handleSubmit, setValue, watch } = addressForm;

  // 광역시 배열을 useMemo로 메모이제이션
  const majorCities = useMemo(() => ['서울', '부산', '대구', '인천', '광주', '대전', '울산'], []);
  // 모달 상태를 3개로 초기화
  const [isModalOpen, setIsModalOpen] = useState([false, false, false]);
  const watchedAddresses = watch('addresses');
  const addresses = useMemo(() => watchedAddresses || [], [watchedAddresses]);
  // 주소 검색 핸들러
  const handleAddressSearch = useCallback((index) => {
    setIsModalOpen((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  }, []);

  // 모달 닫기 핸들러
  const handleModalClose = useCallback((index) => {
    setIsModalOpen((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  }, []);

  // 주소 값 가져오기 함수
  const getAddressValue = useCallback(
    (address) => {
      if (!address) return '';
      const { doName, siName, guName, dongName } = address;
      const hasAddress = doName || siName || guName || dongName;
      if (!hasAddress) return '';

      const parts = [];

      if (majorCities.includes(doName)) {
        parts.push(doName);
        if (guName && guName !== '없음') parts.push(guName);
        if (dongName && dongName !== '없음') parts.push(dongName);
      } else {
        if (doName && doName !== '없음') parts.push(doName);
        if (siName && siName !== '없음') parts.push(siName);
        if (guName && guName !== '없음') parts.push(guName);
        if (dongName && dongName !== '없음') parts.push(dongName);
      }

      return parts.join(' ');
    },
    [majorCities],
  );

  // 주소 모달 렌더링 함수 메모이제이션
  const renderAddressModal = useCallback(
    (index) => {
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
    },
    [isModalOpen, handleModalClose],
  );

  // 초기 데이터 로딩
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const addresses = await mypageAPI.getAddresses();
        setValue('addresses', addresses);
      } catch (error) {
        if (error.response?.status === 401) {
          console.error('인증 토큰이 만료되었습니다. 재 로그인 해주세요.');
        } else {
          console.error('주소 가져오기에 실패했습니다:', error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();

    // 카카오 주소찾기 API 로드
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    script.onload = () => console.log('카카오 주소 찾기 API 로드 됨');
    script.onerror = () => console.error('카카오 주소 찾기 API 로드 실패됨');
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [setValue]);

  // 주소 검색 모달 설정
  useEffect(() => {
    [0, 1, 2].forEach((index) => {
      if (isModalOpen[index] && window.daum?.Postcode) {
        new window.daum.Postcode({
          oncomplete: function (data) {
            if (!data.jibunAddress) {
              showToast('잘못된 주소입니다. 다시 선택해주세요.');
              handleModalClose(index);
              return;
            }

            const fullAddress = data.jibunAddress;
            const addressParts = fullAddress.split(' ');
            const dongIndex = addressParts.findIndex((part) => part.includes('동'));
            const filteredParts = dongIndex !== -1 ? addressParts.slice(0, dongIndex + 1) : addressParts;

            let doName = filteredParts[0] || '없음';
            let siName = '없음';
            let guName = '없음';
            let dongName = '없음';

            if (majorCities.includes(doName)) {
              siName = doName;
              guName = filteredParts[1] || '없음';
              dongName = filteredParts[2] || '없음';
            } else {
              siName = filteredParts[1] || '없음';
              guName = filteredParts[2] || '없음';
              dongName = filteredParts[3] || '없음';
            }

            const addressTypes = ['HOME', 'COMPANY', 'OTHER'];
            const newAddresses = [...addresses];
            newAddresses[index] = {
              type: addressTypes[index],
              doName,
              siName,
              guName,
              dongName,
            };
            setValue('addresses', newAddresses);
            handleModalClose(index);
          },
          width: '100%',
          height: '500px',
        }).embed(document.getElementById(`postcodeContainer${index}`));
      }
    });
  }, [isModalOpen, majorCities, addresses, setValue, handleModalClose, showToast]);

  // 폼 제출 핸들러
  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage('');

    // 초기 데이터 로깅
    console.log('Initial Form Data:', data);

    if (!data.addresses || data.addresses.length === 0) {
      showToast('활동 지역을 최소 1개 이상 설정해주세요!');
      setIsLoading(false);
      return;
    }

    const isEmpty = data.addresses.every(
      (address) =>
        !address ||
        !address.doName ||
        !address.siName ||
        !address.guName ||
        !address.dongName ||
        (address.doName === '없음' &&
          address.siName === '없음' &&
          address.guName === '없음' &&
          address.dongName === '없음'),
    );

    if (isEmpty) {
      showToast('활동 지역을 최소 1개 이상 설정해주세요!');
      setIsLoading(false);
      return;
    }

    try {
      // addresses 배열만 추출하여 새로운 객체 생성
      const requestData = {
        addresses: data.addresses.map((address, index) => ({
          type: address.type || ['HOME', 'COMPANY', 'OTHER'][index],
          doName: address.doName || '',
          siName: address.siName || '',
          guName: address.guName || '',
          dongName: address.dongName || '',
        })),
      };

      // 최종 전송 데이터 로깅
      console.log(JSON.stringify(requestData, null, 2));

      await mypageAPI.updateAddresses(requestData);
      showToast('주소가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('주소 전송 실패 :', error.message);
      showToast('수정 실패.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="10px">
        <Flex direction="column" gap="5px" className="row">
          <Text as="label" htmlFor={`HOME`}>
            <strong className="require">관심지역 #1</strong>
          </Text>
          <div className="input input_btn">
            <input
              type="text"
              id={`HOME`}
              value={addresses && addresses[0] ? getAddressValue(addresses[0]) : ''}
              readOnly
              placeholder="활동 지역을 추가해주세요!"
              className="input input_btn"
              onClick={() => handleAddressSearch(0)}
              {...register('addresses.0')}
            />
            <button type="button" onClick={() => handleAddressSearch(0)} disabled={isLoading}>
              {isLoading ? '로딩 중...' : '주소 검색'}
            </button>
          </div>
          {renderAddressModal(0)}
        </Flex>

        <Flex direction="column" gap="5px" className="row">
          <Text as="label" htmlFor={`COMPANY`}>
            <strong>관심지역 #2</strong>
          </Text>
          <div className="input input_btn">
            <input
              type="text"
              id={`COMPANY`}
              value={addresses && addresses[1] ? getAddressValue(addresses[1]) : ''}
              readOnly
              placeholder="활동 지역을 추가해주세요!"
              className={styles.inputField}
              onClick={() => handleAddressSearch(1)}
              {...register('addresses.1')}
            />
            <button type="button" onClick={() => handleAddressSearch(1)} disabled={isLoading}>
              {isLoading ? '로딩 중...' : '주소 검색'}
            </button>
          </div>
          {renderAddressModal(1)}
        </Flex>

        <Flex direction="column" gap="5px" className="row">
          <Text as="label" htmlFor={`OTHER`}>
            <strong>관심지역 #3</strong>
          </Text>
          <div className="input input_btn">
            <input
              type="text"
              id={`OTHER`}
              value={addresses && addresses[2] ? getAddressValue(addresses[2]) : ''}
              readOnly
              placeholder="활동 지역을 추가해주세요!"
              className={styles.inputField}
              onClick={() => handleAddressSearch(2)}
              {...register('addresses.2')}
            />
            <button type="button" onClick={() => handleAddressSearch(2)} disabled={isLoading}>
              {isLoading ? '로딩 중...' : '주소 검색'}
            </button>
          </div>
          {renderAddressModal(2)}
        </Flex>

        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

        <ButtonL type="submit" disabled={isLoading} style="deep">
          {isLoading ? '수정 중...' : '수정'}
        </ButtonL>
      </Flex>

      <Toast as="alert" isActive={toast} onClose={() => setToast(false)}>
        <Text>{toastMessage}</Text>
      </Toast>
    </form>
  );
}
