'use client';

import { Flex, Text } from '@radix-ui/themes';
import AddressSearchModal from './AddressSearchModal';
import { useModal } from '@/hooks';
import { getAddressValue } from '@/utils/address';

export default function AddressFormField({ value, onChange, showToast }) {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <Flex direction="column" gap="10px">
        <div className="row">
          <Text as="label" htmlFor="address" className="require">
            활동지역
          </Text>
          <div className="input input_btn">
            <input
              type="text"
              id="address"
              placeholder="활동 지역을 추가해주세요!"
              className="input input_btn"
              value={getAddressValue(value)}
              readOnly
            />
            <button type="button" onClick={openModal}>
              주소 검색
            </button>
          </div>
        </div>
      </Flex>
      <AddressSearchModal isOpen={isOpen} onClose={closeModal} onSelect={onChange} showToast={showToast} />
    </>
  );
}
