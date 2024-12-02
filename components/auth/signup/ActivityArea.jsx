'use client';

import { useToast } from '@/hooks';
import { Flex, Text } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import { AddressFormField, ButtonM, Toast } from '@/components/common';
import { initEmpty } from '@/constants/address';
import { useSignupStore } from '@/stores/authStore';
import { isAddressEmpty } from '@/utils/address';
import { useRouter } from 'next/navigation';

export default function ActivityArea() {
  const { toast, setToast, toastMessage, showToast } = useToast();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      address: initEmpty,
    },
  });
  const router = useRouter();

  const { user, setUserField } = useSignupStore();
  const handleUpdateAddress = async (data) => {
    const isEmpty = isAddressEmpty(data.address);
    if (isEmpty) {
      showToast('활동 지역을 설정해주세요!');
      return;
    }

    if ((user.email == '') | (user.password == '') | (user.name == '') | (user.phoneNumber == '')) {
      alert('회원정보를 먼저 입력해주세요!');
      router.push('/service/signup/step1');
      return;
    }

    setUserField('addressDo', data.address.doName);
    setUserField('addressSi', data.address.siName);
    setUserField('addressGuGun', data.address.guName);
    setUserField('addressDong', data.address.dongName);

    router.push('/service/signup/step3?stage=create');
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
                }}
                showToast={showToast}
              />
            )}
          />
          <ButtonM
            leftButton={{ as: 'link', href: '/service/signup/step1', text: '이전' }}
            rightButton={{ type: 'submit', text: '다음' }}
          />
        </Flex>
      </form>
    </>
  );
}
