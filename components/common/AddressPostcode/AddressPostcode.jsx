'use client';

import { Text, Flex } from '@radix-ui/themes';
import Modal from '@/components/common/Modal/Modal';
import { updateAddresses } from '@/apis/mypageAPI';
import { ButtonL, ButtonM, Toast } from '@/components/common';
import useToast from '@/hooks/useToast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useModal from '@/hooks/useModal';
import DaumPostcodeEmbed from 'react-daum-postcode';

const doList = ['강원특별자치도', '경기', '경남', '경북', '전남', '전북특별자치도', '충남', '충북', '제주특별자치도'];
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

export default function AddressPostcode({ initialAddress, status }) {
  const { toast, setToast, toastMessage, showToast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: initialAddress || initEmpty,
    },
  });

  const { isOpen, openModal, closeModal } = useModal();
  const watchedAddress = watch('address') || {};

  const handleCompletePostcode = async (data) => {
    if (!data.jibunAddress) {
      showToast('잘못된 주소입니다. 다시 선택해주세요.');
      closeModal();
      return;
    }

    const fullAddress = data.jibunAddress;
    const addressParts = fullAddress.split(' ');

    let doName = NONE;
    let siName = NONE;
    let guName = NONE;
    let dongName = NONE;

    addressParts.forEach((part) => {
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

    if (siName === NONE || dongName === NONE) {
      showToast('올바른 주소를 선택해주세요.');
      closeModal();
      return;
    }

    setValue('address.doName', doName);
    setValue('address.siName', siName);
    setValue('address.guName', guName);
    setValue('address.dongName', dongName);
    closeModal();
  };

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

    if (status == 'update') {
      const response = await updateAddresses(address);
      if (response?.errorCode) {
        console.error(`활동지역 변경 실패: ${response.message}`);
        showToast('활동지역 저장에 실패했습니다.');
      } else {
        alert('주소가 성공적으로 저장되었습니다.');
        router.push('/service/mypage');
      }
    } else {
      console.log('회원가입 로직');
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        header={{ title: '주소 검색', text: '주소를 검색하고 선택해 주세요.' }}
      >
        <DaumPostcodeEmbed onComplete={handleCompletePostcode}></DaumPostcodeEmbed>
      </Modal>
      <Toast as="alert" isActive={toast} onClose={() => setToast(false)}>
        <Text>{toastMessage}</Text>
      </Toast>
      <form onSubmit={handleSubmit(handleUpdateAddress)}>
        <Flex direction="column" gap="10px">
          <div className="row">
            <Text as="label" htmlFor="address">
              활동지역
            </Text>
            <div className="input input_btn">
              <input
                type="text"
                id="address"
                value={getAddressValue(watchedAddress)}
                readOnly
                placeholder="활동 지역을 추가해주세요!"
                className="input input_btn"
              />
              <button type="button" onClick={openModal}>
                주소 검색
              </button>
            </div>
          </div>
          {status == 'update' ? (
            <ButtonL type="submit" style="deep">
              수정
            </ButtonL>
          ) : (
            <ButtonM leftButton={{ text: '이전' }} rightButton={{ text: '다음' }} />
          )}
          <div className="hidden">
            <input type="hidden" {...register('address.doName')} />
            <input type="hidden" {...register('address.siName')} />
            <input type="hidden" {...register('address.guName')} />
            <input type="hidden" {...register('address.dongName')} />
          </div>
        </Flex>
      </form>
    </>
  );
}
