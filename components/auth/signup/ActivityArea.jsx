'use client';

import { ButtonM } from '@/components/common';
import { Box, Flex, Text } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';

export default function ActivityArea() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="20px">
        <Box className="form_group">
          <Box className="row">
            <Text as="label" htmlFor="area_1" className="require">
              활동지역 #1
            </Text>
            <Box className="input input_btn">
              <input
                type="text"
                id="area_1"
                placeholder="활동지역을 추가해주세요"
                {...register('area_1', {
                  required: '활동지역을 추가해주세요!',
                })}
                className={errors.area_1 ? 'error' : ''}
              />
              <button>주소 검색</button>
            </Box>
            {errors.area_1 && (
              <Text as="p" className="error">
                {errors.area_1.message}
              </Text>
            )}
          </Box>
          <Box className="row">
            <Text as="label" htmlFor="area_2">
              활동지역 #2
            </Text>
            <Box className="input input_btn">
              <input type="text" id="area_2" placeholder="활동지역을 추가해주세요" {...register('area_2')} />
              <button>주소 검색</button>
            </Box>
          </Box>
          <Box className="row">
            <Text as="label" htmlFor="area_3">
              활동지역 #3
            </Text>
            <Box className="input input_btn">
              <input type="text" id="area_3" placeholder="활동지역을 추가해주세요" {...register('area_3')} />
              <button>주소 검색</button>
            </Box>
          </Box>
        </Box>
        <Box className="btn_group">
          <ButtonM
            leftButton={{ as: 'link', href: '/service/signup/step1', text: '이전' }}
            rightButton={{ type: 'submit', text: '완료' }}
          />
        </Box>
      </Flex>
    </form>
  );
}
