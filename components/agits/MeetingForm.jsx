'use client';

import { ButtonL } from '@/components/common';
import { Flex, Box, Text } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';

export default function MeetingForm({ status }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ name, image, date, place, content }) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="20px">
        <Flex direction="column" gap="10px">
          <Box className="row">
            <Text as="label" className="require">
              모임 이름
            </Text>
            <Box className="input">
              <input
                id="name"
                type="text"
                placeholder="모임 이름을 입력해주세요"
                {...register('name', {
                  required: '모임 이름을 입력해주세요.',
                  maxLength: {
                    value: 20,
                    message: '최대 20자까지만 입력할 수 있습니다.',
                  },
                })}
                className={errors.name ? 'error' : ''}
              />
            </Box>
            {errors.name && (
              <Text as="p" className="error">
                {errors.name.message}
              </Text>
            )}
          </Box>
          <Box className="row">
            <Text as="label">모임 이미지</Text>
            <Box className="input input_btn">
              <input
                id="image"
                type="text"
                placeholder="이미지를 추가해주세요"
                {...register('image')}
                className={errors.image ? 'error' : ''}
              />

              <button type="button">파일 선택</button>
            </Box>
            {errors.image && (
              <Text as="p" className="error">
                {errors.image.message}
              </Text>
            )}
          </Box>
          <Box className="row">
            <Text as="label" className="require">
              모임 일시
            </Text>
            <Box className="input">
              <input
                id="date"
                type="datetime-local"
                placeholder="YYYY / MM / DD T HH : MM : SS"
                {...register('date', {
                  required: '모임 일시를 설정해주세요',
                  maxLength: {
                    value: 20,
                    message: '연,월,일,시,분,초 순으로 작성해주세요.',
                  },
                })}
                className={errors.date ? 'error' : ''}
              />
            </Box>
            {errors.date && (
              <Text as="p" className="error">
                {errors.date.message}
              </Text>
            )}
          </Box>
          <Box className="row">
            <Text as="label" className="require">
              모임 위치
            </Text>
            <Box className="input input_btn">
              <input
                id="place"
                type="text"
                placeholder="모임 위치를 입력해주세요"
                {...register('place', {
                  required: '모임 위치를 입력해주세요',
                })}
                className={errors.place ? 'error' : ''}
              />
              <button type="button">주소 검색</button>
            </Box>
            {errors.place && (
              <Text as="p" className="error">
                {errors.place.message}
              </Text>
            )}
          </Box>
          <Box className="row">
            <Text as="label" className="require">
              안내사항
            </Text>
            <Box className="textarea">
              <textarea
                id="content"
                placeholder="해당 모임의 안내사항을 적어주세요"
                {...register('content', {
                  required: '해당 모임의 안내사항을 적어주세요',
                })}
                className={errors.content ? 'error' : ''}
              />
            </Box>
            {errors.content && (
              <Text as="p" className="error">
                {errors.content.message}
              </Text>
            )}
          </Box>
        </Flex>
        <ButtonL style="deep" type="submit">
          {status == 'create' ? '등록하기' : '수정하기'}
        </ButtonL>
      </Flex>
    </form>
  );
}
