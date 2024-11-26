'use client';

import { ButtonL, Header, Toast } from '@/components/common';
import { useToast } from '@/hooks';
import { Box, Flex, Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Page() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { toast, setToast, toastMessage, showToast } = useToast();
  const router = useRouter();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const onSubmit = async ({ image, content }) => {
    showToast('수정되었습니다!');
    await delay(1000);
    router.back();
  };
  const [fileName, setFileName] = useState('');
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setValue('file', file);
    }
  };
  return (
    <>
      <Toast
        as="info"
        isActive={toast}
        onClose={() => {
          setToast(false);
        }}
      >
        {toastMessage}
      </Toast>
      <div className="page">
        <Header side="center">활동 기록</Header>
        <Box className="content">
          <section>
            <Flex direction="column" gap="20px">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap="10px">
                  <Box className="row">
                    <Text as="label">활동 이미지</Text>
                    <Box className="input input_btn input_file">
                      <input
                        type="file"
                        id="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        {...register('file')}
                        onChange={onFileChange}
                      />
                      <input
                        id="image"
                        type="text"
                        value={fileName}
                        placeholder="이미지를 추가해주세요"
                        className={errors.file ? 'error' : ''}
                        readOnly
                      />

                      <label htmlFor="file">파일 선택</label>
                    </Box>
                    {errors.file && (
                      <Text as="p" className="error">
                        {errors.file.message}
                      </Text>
                    )}
                  </Box>
                  <Box className="row">
                    <Text as="label" className="require">
                      활동 내용
                    </Text>
                    <Box className="textarea">
                      <textarea
                        id="content"
                        placeholder="기록하고 싶은 활동 내용을 적어주세요"
                        {...register('content', {
                          required: '한줄 소개를 입력해주세요.',
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
              </form>
              <ButtonL style="deep" onClick={handleSubmit(onSubmit)}>
                수정하기
              </ButtonL>
            </Flex>
          </section>
        </Box>
      </div>
    </>
  );
}
