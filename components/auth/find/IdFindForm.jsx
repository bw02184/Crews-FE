'use client';

import { Box, Callout, Flex, Text } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { ButtonL } from '../../common';
import { InfoCircledIcon } from '@radix-ui/react-icons';

export default function IdFindForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="20px">
        <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>이름과 휴대폰 번호를 입력하고 인증해주세요!</Callout.Text>
        </Callout.Root>
        <Box className="form_group">
          <Box className="row">
            <Text as="label" htmlFor="user_id" className="require">
              이름
            </Text>
            <Box className="input">
              <input
                type="text"
                id="user_name"
                placeholder="이름을 입력해주세요"
                {...register('user_name', {
                  required: '이름을 입력해주세요!',
                  pattern: {
                    value: /^[A-Za-z가-힣]/,
                    message: '한글 또는 영문만 입력 가능합니다',
                  },
                })}
                className={errors.user_name ? 'error' : ''}
              />
            </Box>
            {errors.user_name && (
              <Text as="p" className="error">
                {errors.user_name.message}
              </Text>
            )}
          </Box>
          <Box className="row">
            <Text as="label" htmlFor="user_mobile" className="require">
              휴대폰 번호
            </Text>
            <Box className="input">
              <input
                type="text"
                id="user_mobile"
                placeholder="숫자만 입력해주세요"
                {...register('user_mobile', {
                  required: '휴대폰 번호를 입력해주세요!',
                  pattern: {
                    value: /^\d{10,11}$/,
                    message: '휴대폰 번호는 10자리 또는 11자리 숫자만 입력 가능합니다.',
                  },
                })}
                className={errors.user_mobile ? 'error' : ''}
              />
            </Box>
            {errors.user_mobile && (
              <Text as="p" className="error">
                {errors.user_mobile.message}
              </Text>
            )}
          </Box>
        </Box>
        <Box className="btn_group">
          <ButtonL type="submit" style="deep">
            아이디 찾기
          </ButtonL>
        </Box>
      </Flex>
    </form>
  );
}
