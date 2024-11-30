'use client';

import { Box, Flex, RadioGroup, Text } from '@radix-ui/themes';
import {
  ButtonL,
  ButtonM,
  ButtonS,
  CheckBox,
  Dropdown,
  Header,
  ImageCard,
  Label,
  Modal,
  PinNumber,
  PinNumberText,
  SelectFilter,
  TabMenu,
  Title,
  Toast,
} from '@/components/common';
import { tabMenuList } from '@/constants/tabMenuList/service';
import { locationSelectMenuList, sortSelectMenuList } from '@/constants/selectMenuList/sample';
import { Controller, useForm } from 'react-hook-form';
import { agits, events } from '@/constants/dummy';
import { Suspense, useState } from 'react';
import { useModal, useToast } from '@/hooks';

export default function Service() {
  const { toast, setToast, toastMessage, showToast } = useToast();
  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: pinIsOpen, openModal: pinOpenModal, closeModal: pinCloseModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [radio, setRadio] = useState('1');

  const {
    control: controlRadio,
    register: registerRadio,
    handleSubmit: handleSubmitRadio,
    formState: { errors: errorsRadio },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const onSubmitRadio = ({ radio }) => {
    setRadio(radio);
  };

  return (
    <div className="page">
      <Toast
        as="alert"
        isActive={toast}
        onClose={() => {
          setToast(false);
        }}
      >
        {toastMessage}
      </Toast>
      <Flex direction="column" gap="10px" className="content">
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/Toast</Title>
            <Box>
              <Text as="p" weight="medium" mb="1">
                버튼을 눌러보세요!
              </Text>
              <ButtonL
                style="deep"
                onClick={() => {
                  showToast('토스트 버튼1');
                }}
              >
                토스트 버튼1
              </ButtonL>
              <ButtonL
                style="light"
                onClick={() => {
                  showToast('토스트 버튼2');
                }}
              >
                토스트 버튼2
              </ButtonL>
            </Box>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>PIN번호 인증 모달</Title>
            <Box>
              <Text as="p" weight="medium" mb="1">
                이체는 defaultStatus=transfer 결제는 payment
              </Text>
              <ButtonL style="deep" onClick={pinOpenModal}>
                모달 열기
              </ButtonL>
              <Modal
                isOpen={pinIsOpen}
                closeModal={pinCloseModal}
                header={{
                  title: (
                    <>
                      <span className="underline">PIN번호를 인증</span>해 주세요.
                    </>
                  ),
                  text: '정확히 일치해야 합니다.',
                }}
              >
                <Suspense>
                  <PinNumber defaultStage={'auth'} defaultStatus={'transfer'} data={'함께 보내야 하는 데이터'} />
                </Suspense>
              </Modal>
            </Box>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/Modal</Title>
            <Flex direction="column" gap="20px">
              <Box>
                <Text as="p" weight="medium" mb="1">
                  버튼을 눌러보세요!
                </Text>
                <ButtonL style="deep" onClick={openModal}>
                  모달 열기
                </ButtonL>
                <Modal
                  isOpen={isOpen}
                  closeModal={closeModal}
                  header={{ title: '모달 타이틀', text: '소제목이 있을 경우에 여기에 넣습니다.' }}
                >
                  내용물
                </Modal>
              </Box>
            </Flex>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/Dropdown</Title>
            <Flex direction="column" gap="20px">
              <Box>
                <Text as="p" weight="medium" mb="1">
                  버튼
                </Text>
                <Dropdown
                  menuList={[
                    { text: '사진 수정하기', onClick: () => alert('사진 수정하기') },
                    { text: '이미지 크게보기', onClick: () => alert('이미지 크게보기') },
                    { text: '사진 삭제하기', onClick: () => alert('사진 삭제하기') },
                  ]}
                >
                  <ButtonS
                    style="light"
                    icon={{ src: '/icons/ico_setting.svg', width: '14', height: '14', alt: '설정' }}
                  >
                    정보수정
                  </ButtonS>
                </Dropdown>
              </Box>
              <Box>
                <Text as="p" weight="medium" mb="1">
                  링크
                </Text>
                <Dropdown
                  as="link"
                  side="right"
                  menuList={[
                    { text: '닉네임 수정', href: '' },
                    { text: '관심사 수정', href: '' },
                    { text: '활동지역 수정', href: '' },
                    { text: '비밀번호 수정', href: '' },
                  ]}
                >
                  <ButtonS
                    style="light"
                    icon={{ src: '/icons/ico_setting.svg', width: '14', height: '14', alt: '설정' }}
                  >
                    정보수정
                  </ButtonS>
                </Dropdown>
              </Box>
            </Flex>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/Label</Title>
            <Flex direction="column" gap="20px">
              <Box>
                <Text as="p" weight="medium" mb="1">
                  라벨...
                </Text>
                <Label style="deep">라벨...</Label>
              </Box>
              <Box>
                <Text as="p" weight="medium" mb="1">
                  라벨...
                </Text>
                <Label style="lime">라벨...</Label>
              </Box>
            </Flex>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>React-hook-form</Title>
            <Flex direction="column" gap="20px">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="row">
                  <Text as="label" htmlFor="user_pw" className="require">
                    비밀번호
                  </Text>
                  <Box className="input">
                    <input
                      type="password"
                      id="user_pw"
                      placeholder="비밀번호를 입력해주세요!"
                      {...register('user_pw', {
                        required: '비밀번호를 입력해주세요!',
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                          message: '특수문자(!@#$%^&*) 포함 영문, 숫자 8자리 이상',
                        },
                      })}
                      className={errors.user_pw ? 'error' : ''}
                    />
                  </Box>
                  {errors.user_pw && (
                    <Text as="p" className="error">
                      {errors.user_pw.message}
                    </Text>
                  )}
                </Box>
                <ButtonL type="submit" style="deep">
                  제출
                </ButtonL>
              </form>
            </Flex>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/Select</Title>
            <Flex direction="column" gap="20px">
              <Box>
                <ButtonL as="link" href="/service/agits/1" style="deep">
                  헤더 셀렉트 보러가기
                </ButtonL>
              </Box>
              <Box>
                <Text as="p" weight="medium" mb="2">
                  필터 셀렉트
                </Text>
                <SelectFilter filter="location" selectList={locationSelectMenuList}>
                  장소
                </SelectFilter>
              </Box>
              <Box>
                <Text as="p" weight="medium" mb="2">
                  필터 셀렉트
                </Text>
                <SelectFilter filter="sort" selectList={sortSelectMenuList}>
                  오름차순
                </SelectFilter>
              </Box>
            </Flex>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/ImageCard</Title>
            <Flex direction="column" gap="20px">
              <Box>
                <Text as="p" weight="medium" mb="1">
                  아지트 카드
                </Text>
                <Flex direction="column" gap="10px">
                  {agits.map((agit, i) => {
                    return <ImageCard data={agit} key={`agit${i}`}></ImageCard>;
                  })}
                </Flex>
              </Box>
              <Box>
                <Text as="p" weight="medium" mb="1">
                  정모 카드
                </Text>
                <Flex direction="column" gap="10px">
                  {events.map((event, i) => {
                    return <ImageCard type="event" data={event} key={`event${i}`}></ImageCard>;
                  })}
                </Flex>
              </Box>
            </Flex>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/Button</Title>
            <Flex direction="column" gap="20px">
              <Box>
                <Text as="p" weight="medium" mb="2">
                  버튼L
                </Text>
                <ButtonL style="deep">버튼1</ButtonL>
                <ButtonL style="light">버튼2</ButtonL>
              </Box>
              <Box>
                <Text as="p" weight="medium" mb="2">
                  버튼M
                </Text>
                <ButtonM leftButton={{ text: 'm1' }} rightButton={{ text: 'm2' }} />
              </Box>
              <Box>
                <Text as="p" weight="medium" mb="2">
                  버튼S
                </Text>
                <ButtonS style="deep" icon={{ src: '/icons/ico_delete.svg', width: '9', height: '9', alt: '삭제' }}>
                  s1
                </ButtonS>
                <ButtonS style="light" icon={{ src: '/icons/ico_setting.svg', width: '14', height: '14', alt: '설정' }}>
                  정보수정
                </ButtonS>
              </Box>
            </Flex>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/TabMenu</Title>
            <Suspense>
              <TabMenu as="button" tabMenuList={tabMenuList} />
            </Suspense>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>
              <a href="https://www.radix-ui.com/themes/docs/components/checkbox" target="_blank">
                Radix Checkbox
              </a>
            </Title>
            <Flex direction="column" gap="2">
              <CheckBox value="1">테스트</CheckBox>
              <CheckBox value="2" defaultChecked={true}>
                테스트
              </CheckBox>
              <CheckBox value="3" disabled={true}>
                테스트
              </CheckBox>
              <CheckBox value="4" defaultChecked={true} disabled={true}>
                테스트
              </CheckBox>
            </Flex>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>
              <a href="https://www.radix-ui.com/themes/docs/components/radio-group" target="_blank">
                Radix Radio-group
              </a>
            </Title>
            <form onSubmit={handleSubmitRadio(onSubmitRadio)}>
              <Flex direction="column" gap="20px">
                <Controller
                  name="radio"
                  control={controlRadio}
                  render={({ field: { onChange, name, ref, value, onBlur } }) => (
                    <div className="radio_group">
                      <RadioGroup.Root
                        name={name}
                        ref={ref}
                        value={value}
                        defaultValue="1"
                        onBlur={onBlur}
                        onValueChange={onChange}
                      >
                        <div className="radio">
                          <RadioGroup.Item value="1" defaultChecked>
                            Cat
                          </RadioGroup.Item>
                        </div>
                        <div className="radio">
                          <RadioGroup.Item value="2">Dog</RadioGroup.Item>
                        </div>
                        <div className="radio">
                          <RadioGroup.Item value="3">Rabbit</RadioGroup.Item>
                        </div>
                      </RadioGroup.Root>
                    </div>
                  )}
                />
                <ButtonL type="submit" style="deep">
                  제출
                </ButtonL>
              </Flex>
            </form>
            <Text as="p">select Radio: {radio}</Text>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/Header</Title>
            <Flex direction="column" gap="20px">
              <Box>
                <Text as="p" weight="medium" mb="1">
                  side left
                </Text>
                <Header side="left">마이페이지</Header>
              </Box>
              <Box>
                <Text as="p" weight="medium" mb="1">
                  side center
                </Text>
                <Header side="center">아지트 생성</Header>
              </Box>
            </Flex>
          </section>
        </Flex>
      </Flex>
    </div>
  );
}
