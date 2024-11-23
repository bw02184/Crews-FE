'use client';

import { SelectFilter, TabMenu, Title, Label, ButtonL } from '@/components/common';
import { Flex, Box, Text } from '@radix-ui/themes';
import { tabMenuList } from '@/constants/tabMenuList/agits';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function Page({ params }) {
  const [agits] = agitsSelectMenuList.filter((select) => select.id == params.agitId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [fileName, setFileName] = useState('');
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setValue('file', file);
    }
  };

  const [selectedInterests, setSelectedInterests] = useState([]);
  const toggleInterest = (interests) => {
    setSelectedInterests((prev) => {
      const updated = prev.includes(interests) ? prev.filter((item) => item !== interests) : [...prev, interests];
      setValue('interests', updated);
      return updated;
    });
  };

  const onSubmit = async ({ image, introduce, content, interests }) => {};

  return (
    <div className="page">
      <header>
        <Box>
          <SelectFilter isHeader={true} as="link" pathname="/service/agits" selectList={agitsSelectMenuList}>
            {agits?.text}
          </SelectFilter>
        </Box>
        <TabMenu tabMenuList={tabMenuList} baseUrl={`/service/agits/${params.agitId}`} />
      </header>
      <Flex direction="column" gap="10px" className="content">
        <section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="20px">
              <Flex justify="between">
                <Title>어쩌고저쩌고 아지트명</Title>
                <Label style="lime">반려동물</Label>
              </Flex>
              <Flex direction="column" gap="10px">
                <Box className="row">
                  <Text as="label">소개 이미지</Text>
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
                    한줄 소개
                  </Text>
                  <Box className="input">
                    <input
                      id="introduce"
                      type="text"
                      placeholder="한줄 소개를 입력해주세요"
                      {...register('introduce', {
                        required: '한줄 소개를 입력해주세요.',
                        maxLength: {
                          value: 20,
                          message: '최대 20자까지만 입력할 수 있습니다.',
                        },
                      })}
                      className={errors.introduce ? 'error' : ''}
                    />
                  </Box>
                  {errors.introduce && (
                    <Text as="p" className="error">
                      {errors.introduce.message}
                    </Text>
                  )}
                </Box>
                <Box className="row">
                  <Text as="label">모임 특징</Text>
                  <Box className="textarea">
                    <textarea
                      id="content"
                      placeholder="우리 모임만의 특징을 입력해주세요"
                      {...register('content')}
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
            </Flex>
            <Flex direction="column" gap="20px" mt="26px">
              <Box className="row">
                <Text as="label" className="require">
                  관심사
                </Text>
                <div className="interest_list">
                  <Flex gap="10px" wrap="wrap" asChild>
                    <ul>
                      <li>
                        <input
                          type="checkbox"
                          id="interest-1"
                          checked={selectedInterests.includes(1)}
                          onChange={() => toggleInterest(1)}
                        />
                        <label htmlFor="interest-1">등산</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="interest-2"
                          checked={selectedInterests.includes(2)}
                          onChange={() => toggleInterest(2)}
                        />
                        <label htmlFor="interest-2">조기축구회</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="interest-3"
                          checked={selectedInterests.includes(3)}
                          onChange={() => toggleInterest(3)}
                        />
                        <label htmlFor="interest-3">해양 스포츠</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="interest-4"
                          checked={selectedInterests.includes(4)}
                          onChange={() => toggleInterest(4)}
                        />
                        <label htmlFor="interest-4">클라이밍</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="interest-5"
                          checked={selectedInterests.includes(5)}
                          onChange={() => toggleInterest(5)}
                        />
                        <label htmlFor="interest-5">피트니스</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="interest-6"
                          checked={selectedInterests.includes(6)}
                          onChange={() => toggleInterest(6)}
                        />
                        <label htmlFor="interest-6">러닝</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="interest-7"
                          checked={selectedInterests.includes(7)}
                          onChange={() => toggleInterest(7)}
                        />
                        <label htmlFor="interest-7">요가 및 필라테스</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="interest-8"
                          checked={selectedInterests.includes(8)}
                          onChange={() => toggleInterest(8)}
                        />
                        <label htmlFor="interest-8">격투기</label>
                      </li>
                      {errors.interests && (
                        <Text as="p" className="error">
                          {errors.interests.message}
                        </Text>
                      )}
                    </ul>
                  </Flex>
                  <Text as="p" size="2" weight="medium" className="gray_t1" mt="5px">
                    최소 1개에서 3개까지 등록할 수 있습니다!
                  </Text>
                </div>
              </Box>
              <ButtonL style="deep" type="submit">
                수정하기
              </ButtonL>
            </Flex>
          </form>
        </section>
      </Flex>
    </div>
  );
}
