'use client';

import { useToast } from '@/hooks';
import { Flex, Text } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import { AddressFormField, ButtonL, Toast } from '@/components/common';
import { initEmpty, NONE } from '@/constants/address';
import { isAddressEmpty } from '@/utils/address';
import { useRouter } from 'next/navigation';
import { updateAddresses } from '@/apis/mypageAPI';

export default function AddressForm({ initialAddress }) {
  const { toast, setToast, toastMessage, showToast } = useToast();
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      address: initialAddress || initEmpty,
    },
  });
  const router = useRouter();

  const handleUpdateAddress = async (data) => {
    const isEmpty = isAddressEmpty(data.address);
    if (isEmpty) {
      showToast('활동 지역을 설정해주세요!');
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
    <>
      <Toast as="alert" isActive={toast} onClose={() => setToast(false)}>
        <Text>{toastMessage}</Text>
      </Toast>
      <form onSubmit={handleSubmit(handleUpdateAddress)}>
        <Flex direction="column" gap="10px">
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <AddressFormField
                value={field.value}
                onChange={(newAddress) => {
                  field.onChange(newAddress);
                  setValue('address', newAddress);
                }}
                showToast={showToast}
              />
            )}
          />
          <ButtonL type="submit" style="deep">
            수정
          </ButtonL>
        </Flex>
      </form>
    </>
  );
}
