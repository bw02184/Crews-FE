'use client';

import { Text, Flex } from '@radix-ui/themes';
import { useEffect, useState, useCallback } from 'react';
import Modal from '@/components/common/Modal/Modal';
import { updateAddresses } from '@/apis/mypageAPI';
import { ButtonL, Toast } from '@/components/common';
import useToast from '@/hooks/useToast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

// 도(Province) 목록
const doList = ['강원특별자치도', '경기', '경남', '경북', '전남', '전북특별자치도', '충남', '충북', '제주특별자치도'];

// 주요 광역시 목록 (특별시, 광역시)
const majorCities = ['서울', '부산', '대구', '인천', '광주', '대전', '울산'];

const NONE = '없음';

const initEmpty = {
  doName: NONE,
  siName: NONE,
  guName: NONE,
  dongName: NONE,
};

const isAddressEmpty = (address) => {
  if (!address) return true;

  const { doName, siName, guName, dongName } = address;
  if (doName === NONE && siName === NONE && guName === NONE && dongName === NONE) {
    return true;
  }

  if (!siName || siName.trim() === '' || siName === NONE) return true;
  if (!dongName || dongName.trim() === '' || dongName === NONE) return true;

  if (doName === NONE) {
    if (!guName || guName.trim() === '' || guName === NONE) return true;
  }

  return false;
};
const getAddressValue = (address) => {
  if (!address) return '';
  const { doName, siName, guName, dongName } = address;
  const hasAddress = doName !== NONE || siName !== NONE || guName !== NONE || dongName !== NONE;
  if (!hasAddress) return '';

  const parts = [];
  if (majorCities.includes(siName)) {
    // 주요 광역시일 경우 doName을 제외하고 siName, guName, dongName만 사용
    if (siName && siName !== NONE) parts.push(siName);
    if (guName && guName !== NONE) parts.push(guName);
    if (dongName && dongName !== NONE) parts.push(dongName);
  } else {
    // 일반 도 시 구 동
    if (doName && doName !== NONE) parts.push(doName);
    if (siName && siName !== NONE) parts.push(siName);
    if (guName && guName !== NONE) parts.push(guName);
    if (dongName && dongName !== NONE) parts.push(dongName);
  }

  return parts.join(' ');
};

export default function AddressInput({ initialAddress }) {
  const { toast, setToast, toastMessage, showToast } = useToast();
  const router = useRouter();

  const addressForm = useForm({
    defaultValues: {
      address: initialAddress || initEmpty,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = addressForm;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const watchedAddress = watch('address') || {};

  const handleAddressSearch = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const renderAddressModal = useCallback(() => {
    if (typeof window === 'undefined' || !window.daum || !window.daum.Postcode) return null;
    return (
      <Modal
        isOpen={isModalOpen}
        closeModal={handleModalClose}
        header={{ title: '주소 검색', text: '주소를 검색하고 선택해 주세요.' }}
      >
        <div id={`postcodeContainer`} />
      </Modal>
    );
  }, [isModalOpen, handleModalClose]);

  useEffect(() => {
    if (document.getElementById('kakao-postcode-script')) return;
    const script = document.createElement('script');
    script.id = 'kakao-postcode-script';
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    script.onload = () => console.log('카카오 주소 찾기 API 로드 됨');
    script.onerror = () => console.error('카카오 주소 찾기 API 로드 실패됨');
    document.head.appendChild(script);

    return () => {
      if (document.getElementById('kakao-postcode-script')) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (isModalOpen && window.daum?.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data) {
          if (!data.jibunAddress) {
            showToast('잘못된 주소입니다. 다시 선택해주세요.');
            handleModalClose();
            return;
          }

          const fullAddress = data.jibunAddress;
          const addressParts = fullAddress.split(' ');

          let doName = NONE;
          let siName = NONE;
          let guName = NONE;
          let dongName = NONE;

          addressParts.forEach((part) => {
            console.log('Parsing part:', part);

            if (majorCities.includes(part)) {
              siName = part;
              doName = NONE;
            } else if (doList.includes(part)) {
              doName = part;
            } else if (part.endsWith('시')) {
              siName = part;
            } else if (part.endsWith('구') || part.endsWith('군')) {
              guName = part;
            } else if (part.endsWith('동') || part.endsWith('면')) {
              dongName = part;
            }
          });

          console.log('Parsed Address:', { doName, siName, guName, dongName });

          if (siName === NONE || dongName === NONE) {
            showToast('올바른 주소를 선택해주세요.');
            handleModalClose();
            return;
          }

          setValue('address.doName', doName);
          setValue('address.siName', siName);
          setValue('address.guName', guName);
          setValue('address.dongName', dongName);
          handleModalClose();
        },
        width: '100%',
        height: '500px',
      }).embed(document.getElementById('postcodeContainer'));
    }
  }, [isModalOpen, setValue, handleModalClose, showToast]);

  const handleUpdateAddress = async (data) => {
    const isEmpty = isAddressEmpty(data.address);
    if (isEmpty) {
      showToast('활동 지역을 최소 1개 이상 설정해주세요!');
      return;
    }
    const address = {
      doName: data.address.doName || NONE,
      siName: data.address.siName || NONE,
      guName: data.address.guName || NONE,
      dongName: data.address.dongName || NONE,
    };
    const response = await updateAddresses(address);
    if (response?.errorCode) {
      console.error(`활동지역 변경 실패: ${response.message}`);
      showToast('활동지역 저장에 실패했습니다.');
    } else {
      alert('주소가 성공적으로 저장되었습니다.');
      router.push('/service/mypage');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateAddress)}>
      <Flex direction="column" gap="10px">
        {/* 주소 입력 필드 */}
        <Flex direction="column" gap="5px" className="row">
          <Text as="label" htmlFor="address">
            <strong className="require">관심지역</strong>
          </Text>
          <div className="input input_btn">
            <input
              type="text"
              id="address"
              value={getAddressValue(watchedAddress)}
              readOnly
              placeholder="활동 지역을 추가해주세요!"
              className="input input_btn"
              onClick={handleAddressSearch}
            />
            <button type="button" onClick={handleAddressSearch}>
              주소 검색
            </button>
          </div>
          {renderAddressModal()}
        </Flex>

        {/* 숨겨진 주소 필드 */}
        <input type="hidden" {...register('address.doName')} />
        <input type="hidden" {...register('address.siName')} />
        <input type="hidden" {...register('address.guName')} />
        <input type="hidden" {...register('address.dongName')} />

        {/* 제출 버튼 */}
        <ButtonL type="submit" style="deep">
          수정
        </ButtonL>
      </Flex>

      {/* 토스트 메시지 */}
      <Toast as="alert" isActive={toast} onClose={() => setToast(false)}>
        <Text>{toastMessage}</Text>
      </Toast>
    </form>
  );
}
