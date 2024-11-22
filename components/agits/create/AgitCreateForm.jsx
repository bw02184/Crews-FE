'use client';
import { Box, Flex, RadioGroup, Text } from '@radix-ui/themes';
import { Header } from '@/components/common';
import styles from '@/components/agits/create/AgitCreateForm.module.css';
import { useForm } from 'react-hook-form';
import { ButtonL, Toast } from '@/components/common';
import { useState } from 'react';
import useToast from '@/hooks/useToast';
// import mypageAPI from '@/apis/mypageAPI';
import scrollToTop from '@/utils/scrollToTop';
import { useRouter } from 'next/navigation';

export default function AgitCreateForm({ subjects }) {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [asState, setAsState] = useState('alert');
  const { toast, setToast, toastMessage, showToast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const DuplicateCheck = () => {
    if (getValues('title').length === 0) {
      scrollToTop();
      setAsState('alert');
      showToast('아지트 이름을 입력해주세요.');
      return;
    }

    let isUesd = false;

    if (getValues('title') === 'test') {
      console.log('test');
      isUesd = true;
    }

    if (isUesd) {
      scrollToTop();
      setAsState('alert');
      showToast('이미 사용중인 아지트 이름입니다.');
      return;
    } else {
      scrollToTop();
      setAsState('info');
      showToast('사용 가능한 아지트 이름입니다.');
    }
  };

  const onSubmit = async () => {
    console.log(getValues('topic'));
    if (selectedInterests.length < 1) {
      scrollToTop();
      setAsState('alert');
      showToast('관심사를 1개 이상 선택해주세요!');
      return;
    } else if (selectedInterests.length > 4) {
      scrollToTop();
      setAsState('alert');
      showToast('관심사를 3개 이하로 선택해주세요!');
      return;
    }

    router.push('/service/agits/create/done');
  };

  const toggleInterest = (interestId) => {
    setSelectedInterests((prev) => {
      const newSelected = prev.includes(interestId) ? prev.filter((id) => id !== interestId) : [...prev, interestId];
      return newSelected;
    });
  };

  return (
    <div className="page">
      <Header side="center">아지트 생성</Header>
      <Toast as={asState} isActive={toast} onClose={() => setToast(false)}>
        <Text>{toastMessage}</Text>
      </Toast>
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="10px" className="content">
            <Flex direction="column" gap="10px" asChild>
              <section>
                <Box className="row">
                  <Text as="label" htmlFor="title" className="require">
                    아지트 이름
                  </Text>
                  <Box className="input input_btn">
                    <input
                      type="text"
                      id="title"
                      placeholder="아지트 이름을 입력해주세요!"
                      {...register('title', {
                        required: '아지트 이름을 입력해주세요.',
                        maxLength: {
                          value: 20,
                          message: '최대 20자까지만 입력할 수 있습니다.',
                        },
                      })}
                      className={errors.title ? 'error' : ''}
                    />
                    <button type="button" onClick={DuplicateCheck}>
                      중복확인
                    </button>
                  </Box>
                  {errors.title && (
                    <Text as="p" className="error">
                      {errors.title.message}
                    </Text>
                  )}
                </Box>
                <Box className="row">
                  <Text as="label" htmlFor="introduce" className="require">
                    아지트 한 줄 소개
                  </Text>
                  <Box className="input">
                    <input
                      type="text"
                      id="introduce"
                      placeholder="한 줄 소개를 입력해주세요!"
                      {...register('introduce', {
                        required: '한 줄 소개를 입력해주세요.',
                        maxLength: {
                          value: 30,
                          message: '최대 30자까지만 입력할 수 있습니다.',
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
              </section>
            </Flex>
            <Flex direction="column" gap="10px" asChild>
              <section>
                <Text as="label" htmlFor="topic" className="require" weight="bold">
                  아지트 주제
                </Text>
                <Box className="radio_group">
                  <RadioGroup.Root
                    size="5"
                    defaultValue="1"
                    name="topic"
                    {...register('topic', {
                      required: '아지트 주제를 선택해주세요.',
                    })}
                  >
                    <Box className="radio">
                      <RadioGroup.Item value="1">운동</RadioGroup.Item>
                    </Box>
                    <Box className="radio">
                      <RadioGroup.Item value="2">여행</RadioGroup.Item>
                    </Box>
                    <Box className="radio">
                      <RadioGroup.Item value="3">반려동물</RadioGroup.Item>
                    </Box>
                    <Box className="radio">
                      <RadioGroup.Item value="4">게임/오락</RadioGroup.Item>
                    </Box>
                    <Box className="radio">
                      <RadioGroup.Item value="5">식도락</RadioGroup.Item>
                    </Box>
                  </RadioGroup.Root>
                </Box>
              </section>
            </Flex>
            <Flex direction="column" gap="10px" asChild>
              <section>
                <Flex align="center" wrap="wrap">
                  <Box className="row">
                    <Text as="label" className="require">
                      관심사
                    </Text>
                    <Text as="p" size="2" className="gray_t2">
                      {getValues('title')} 모임의 관심사는 무엇인가요? {getValues('title')} 모임의 관심사를 기반으로
                      사람들에게 알려요.
                    </Text>
                  </Box>
                  <Box>
                    {subjects.map(
                      (subject, i) =>
                        i === 0 && (
                          <Flex gap="10px" wrap="wrap" asChild key={subject.subjectId}>
                            <ul>
                              {subject.interests.map((interest) => (
                                <li key={interest.interestId} className={styles.checkboxWrapper}>
                                  <input
                                    type="checkbox"
                                    id={`interest-${interest.interestId}`}
                                    checked={selectedInterests.includes(interest.interestId)}
                                    onChange={() => toggleInterest(interest.interestId)}
                                    className={styles.checkboxInput}
                                  />
                                  <label
                                    htmlFor={`interest-${interest.interestId}`}
                                    className={`${styles.checkboxLabel} ${selectedInterests.includes(interest.interestId)}`}
                                  >
                                    {interest.interestName}
                                  </label>
                                </li>
                              ))}
                            </ul>
                          </Flex>
                        ),
                    )}
                  </Box>
                </Flex>
                <Flex>
                  <Box as="div" className={styles.button} mt="5%">
                    <ButtonL type="submit" style="deep">
                      제출하기
                    </ButtonL>
                  </Box>
                </Flex>
              </section>
            </Flex>
          </Flex>
        </form>
      </div>
    </div>
  );
}
