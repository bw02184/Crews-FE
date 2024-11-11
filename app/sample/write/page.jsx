'use client';

import { postPosts } from '@/apis/sampleAPI';
import { ButtonL } from '@/components/common';
import { Box, Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    const response = await postPosts(data);

    if (response?.error) {
      alert(response.error);
    } else {
      alert('게시물이 저장되었습니다!');
      reset();
      router.push('/sample');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="row">
          <Text as="label" mb="2" htmlFor="title" className="require" size="2" weight="bold">
            Title
          </Text>
          <Box className="input" mb="2">
            <input
              type="text"
              id="title"
              placeholder="제목을 입력해주세요!"
              {...register('title', {
                required: '제목을 입력해주세요.',
                maxLength: {
                  value: 20,
                  message: '최대 20자까지만 입력할 수 있습니다.',
                },
              })}
              className={errors.title ? 'error' : ''}
            />
          </Box>
          {errors.title && (
            <Text as="p" my="1" className="error" size="1" weight="medium">
              {errors.title.message}
            </Text>
          )}
        </Box>
        <Box className="row">
          <Text as="label" mb="2" htmlFor="content" className="require" size="2" weight="bold">
            Content
          </Text>
          <Box className="input" mb="2">
            <textarea
              id="content"
              placeholder="내용을 입력해주세요!"
              {...register('content', {
                required: '내용을 입력해주세요.',
              })}
              className={errors.content ? 'error' : ''}
            />
          </Box>
          {errors.content && (
            <Text as="p" my="1" className="error" size="1" weight="medium">
              {errors.content.message}
            </Text>
          )}
        </Box>
        <ButtonL style="deep" type="submit">
          작성하기
        </ButtonL>
      </form>
    </div>
  );
}
