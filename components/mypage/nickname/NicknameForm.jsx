'use client';
import { ButtonL, Toast } from '@/components/common';
import { Box, Flex, Text } from '@radix-ui/themes';
import { updateNickname } from '@/apis/mypageAPI';
import BottomButton from '../bottombutton/BootomButton';
import useToast from '@/hooks/useToast';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import instance from '@/apis/instance';
import { useRouter } from 'next/navigation';

export default function NicknameForm({ nicknameData }) {
  const { data, isLoading } = useSWR('members/me/nickname', () => instance.get('members/me/nickname'), {
    fallbackData: nicknameData,
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { toast, setToast, toastMessage, showToast } = useToast();

  const handleUpdateNickname = async ({ nickname }) => {
    const nicknamePattern = /^[a-zA-Z0-9가-힣]{1,13}$/;
    if (!nicknamePattern.test(nickname)) {
      showToast('닉네임은 공백이 없는 영어, 숫자, 한글만 사용할 수 있습니다');
      return;
    }
    const response = await updateNickname(nickname);

    if (response?.errorCode) {
      console.log(`닉네임 변경 실패: ${response.message}`);
      showToast(`${response.message}`);
    } else {
      alert('성공적으로 변경되었습니다.');
      router.push('/service/mypage');
    }
  };

  return (
    <Box className="input">
      <Toast as="alert" isActive={toast} onClose={() => setToast(false)} autoClose={1500}>
        <Text>{toastMessage}</Text>
      </Toast>
      <form onSubmit={handleSubmit(handleUpdateNickname)}>
        <Flex direction="column" gap="5px">
          <Text as="label" htmlFor="user_nickname">
            닉네임
          </Text>
          <Flex direction="column" gapY="20px">
            <input
              type="text"
              id="user_nickname"
              {...register('nickname', {
                required: '닉네임을 입력해주세요',
                maxLength: {
                  value: 13,
                  message: '닉네임은 13자 이하로 입력해주세요',
                },
              })}
              disabled={isLoading}
              placeholder="닉네임"
              defaultValue={data?.nickname}
            />
            {errors.nickname && (
              <Text as="p" className="error">
                {errors.nickname.message}
              </Text>
            )}
            <ButtonL type="submit" style="deep" disabled={isLoading}>
              {isLoading ? '처리 중...' : '수정'}
            </ButtonL>
          </Flex>
        </Flex>
        <BottomButton />
      </form>
    </Box>
  );
}
