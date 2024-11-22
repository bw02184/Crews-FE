'use client';

import { Text, Flex } from '@radix-ui/themes';
import styles from './AddressInput.module.css';
import { useEffect, useState, useMemo, useCallback } from 'react';
import Modal from '@/components/common/Modal/Modal';
import { getAddresses, updateAddresses } from '@/apis/mypageAPI';
import { ButtonL, Toast } from '@/components/common';
import useToast from '@/hooks/useToast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

const majorCities = ['서울', '부산', '대구', '인천', '광주', '대전', '울산'];

const initializeAddress = (type) => ({
  type,
  doName: '',
  siName: '',
  guName: '',
  dongName: '',
});

export default function AddressInput({ initialAddresses }) {
  const { toast, setToast, toastMessage, showToast } = useToast();
  const router = useRouter();

  const { data: fetchedAddresses, isLoading } = useSWR(
    'members/me/addresses',
    () => getAddresses().then((res) => res.data),
    {
      fallbackData: initialAddresses,
    },
  );

  const addressForm = useForm({
    defaultValues: {
      addresses: initialAddresses || ['HOME', 'COMPANY', 'OTHER'].map(initializeAddress),
    },
  });

  const { register, handleSubmit, setValue, watch } = addressForm;
  const [isModalOpen, setIsModalOpen] = useState([false, false, false]);
  const watchedAddresses = watch('addresses');
  const currentAddresses = useMemo(() => watchedAddresses || [], [watchedAddresses]);

  const handleAddressSearch = useCallback((index) => {
    setIsModalOpen((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  }, []);

  const handleModalClose = useCallback((index) => {
    setIsModalOpen((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  }, []);

  const getAddressValue = useCallback((address) => {
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
  }, []);

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

  useEffect(() => {
    if (fetchedAddresses && fetchedAddresses.length > 0) {
      ['HOME', 'COMPANY', 'OTHER'].forEach((type, index) => {
        const address = fetchedAddresses.find((addr) => addr.type === type) || {
          doName: '',
          siName: '',
          guName: '',
          dongName: '',
        };
        setValue(`addresses.${index}.type`, type);
        setValue(`addresses.${index}.doName`, address.doName);
        setValue(`addresses.${index}.siName`, address.siName);
        setValue(`addresses.${index}.guName`, address.guName);
        setValue(`addresses.${index}.dongName`, address.dongName);
      });
    }
  }, [fetchedAddresses, setValue]);

  useEffect(() => {
    if (document.getElementById('kakao-postcode-script')) return;
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

            setValue(`addresses.${index}.doName`, doName);
            setValue(`addresses.${index}.siName`, siName);
            setValue(`addresses.${index}.guName`, guName);
            setValue(`addresses.${index}.dongName`, dongName);
            handleModalClose(index);
          },
          width: '100%',
          height: '500px',
        }).embed(document.getElementById(`postcodeContainer${index}`));
      }
    });
  }, [isModalOpen, majorCities, setValue, handleModalClose, showToast]);

  const handleUpdateAddress = async (data) => {
    // 데이터 검증
    if (!data.addresses || data.addresses.length === 0) {
      showToast('활동 지역을 최소 1개 이상 설정해주세요!');
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
      return;
    }

    try {
      // 데이터 변환
      const requestData = {
        addresses: data.addresses.map((address, index) => ({
          type: address.type || ['HOME', 'COMPANY', 'OTHER'][index],
          doName: address.doName || '',
          siName: address.siName || '',
          guName: address.guName || '',
          dongName: address.dongName || '',
        })),
      };

      // 서버 요청
      await updateAddresses(requestData);
      alert('주소가 성공적으로 저장되었습니다.');
      router.push('/service/mypage');
    } catch (error) {
      console.error(`활동지역 변경 실패: ${error}`);
      showToast('활동지역 저장에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateAddress)}>
      <Flex direction="column" gap="10px">
        {['HOME', 'COMPANY', 'OTHER'].map((type, index) => (
          <Flex key={type} direction="column" gap="5px" className="row">
            <Text as="label" htmlFor={type}>
              <strong className="require">관심지역 #{index + 1}</strong>
            </Text>
            <div className="input input_btn">
              <input
                type="text"
                id={type}
                value={currentAddresses[index] ? getAddressValue(currentAddresses[index]) : ''}
                readOnly
                placeholder="활동 지역을 추가해주세요!"
                className="input input_btn"
                onClick={() => handleAddressSearch(index)}
                {...register(`addresses.${index}`)}
              />
              <button type="button" onClick={() => handleAddressSearch(index)} disabled={isLoading}>
                주소 검색
              </button>
            </div>
            {renderAddressModal(index)}
          </Flex>
        ))}
        <ButtonL type="submit" disabled={isLoading} style="deep">
          {isLoading ? '로딩 중...' : '수정'}
        </ButtonL>
      </Flex>

      <Toast as="alert" isActive={toast} onClose={() => setToast(false)}>
        <Text>{toastMessage}</Text>
      </Toast>
    </form>
  );
}
