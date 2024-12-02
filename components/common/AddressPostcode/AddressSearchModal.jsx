'use client';

import Modal from '@/components/common/Modal/Modal';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { doList, majorCities, NONE } from '@/constants/address';

export default function AddressSearchModal({ isOpen, onClose, onSelect, showToast }) {
  const handleCompletePostcode = async (data) => {
    if (!data.jibunAddress) {
      showToast('잘못된 주소입니다. 다시 선택해주세요.');
      onClose();
      return;
    }

    const fullAddress = data.jibunAddress;

    let doName = NONE;
    let siName = NONE;
    let guName = NONE;
    let dongName = NONE;

    fullAddress.split(' ').forEach((part) => {
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
      onClose();
      return;
    }

    onSelect({ doName, siName, guName, dongName });
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={onClose}
        header={{ title: '주소 검색', text: '주소를 검색하고 선택해 주세요.' }}
      >
        <DaumPostcodeEmbed onComplete={handleCompletePostcode}></DaumPostcodeEmbed>
      </Modal>
    </>
  );
}
