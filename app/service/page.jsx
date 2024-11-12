'use client';

import { Box, Flex, RadioGroup, Text } from '@radix-ui/themes';
import {
  ButtonL,
  ButtonM,
  ButtonS,
  CheckBox,
  Header,
  ImageCard,
  Label,
  Modal,
  SelectFilter,
  TabMenu,
  Title,
  Toast,
} from '@/components/common';
import useToast from '@/hooks/useToast';
import useModal from '@/hooks/useModal';
import { tabMenuList } from '@/constants/tabMenuList/service';
import { locationSelectMenuList, sortSelectMenuList } from '@/constants/selectMenuList/location';
import { useForm } from 'react-hook-form';

export default function Service() {
  const { toast, setToast, toastMessage, showToast } = useToast();
  const { isOpen, openModal, closeModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Flex direction="column" gap="10px" className="container">
        <Toast
          as="alert"
          isActive={toast}
          onClose={() => {
            setToast(false);
          }}
        >
          {toastMessage}
        </Toast>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/Toast</Title>
            <div className="content">
              <Box>
                <Text as="p" weight="medium" mb="2">
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
            </div>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/Modal</Title>
            <div className="content">
              <Flex direction="column" gap="20px">
                <Box>
                  <Text as="p" weight="medium" mb="2">
                    버튼을 눌러보세요!
                  </Text>
                  <ButtonL style="deep" onClick={openModal}>
                    모달 열기
                  </ButtonL>
                  <Modal isOpen={isOpen} closeModal={closeModal}>
                    내용물
                  </Modal>
                </Box>
              </Flex>
            </div>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/Label</Title>
            <div className="content">
              <Flex direction="column" gap="20px">
                <Box>
                  <Text as="p" weight="medium" mb="2">
                    라벨...
                  </Text>
                  <Label style="deep">라벨...</Label>
                </Box>
                <Box>
                  <Text as="p" weight="medium" mb="2">
                    라벨...
                  </Text>
                  <Label style="lime">라벨...</Label>
                </Box>
              </Flex>
            </div>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>React-hook-form</Title>
            <div className="content">
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
            </div>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/Select</Title>
            <div className="content">
              <Flex direction="column" gap="20px">
                <Box>
                  <Text as="p" weight="medium" mb="2">
                    헤더 셀렉트
                  </Text>
                  <SelectFilter
                    isHeader={true}
                    selectList={locationSelectMenuList}
                    filter="location"
                    defaultParams="sangam"
                  ></SelectFilter>
                </Box>
                <Box>
                  <Text as="p" weight="medium" mb="2">
                    필터 셀렉트
                  </Text>
                  <SelectFilter filter="sort" selectList={sortSelectMenuList} defaultParams="asc"></SelectFilter>
                </Box>
              </Flex>
            </div>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/ImageCard</Title>
            <div className="content">
              <Flex direction="column" gap="20px">
                <Box>
                  <Text as="p" weight="medium" mb="2">
                    아지트 카드
                  </Text>
                  <ImageCard type="agits"></ImageCard>
                </Box>
                <Box>
                  <Text as="p" weight="medium" mb="2">
                    정모 카드
                  </Text>
                  <ImageCard type="meeting"></ImageCard>
                </Box>
              </Flex>
            </div>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/Button</Title>
            <div className="content">
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
                  <ButtonS
                    style="light"
                    icon={{ src: '/icons/ico_setting.svg', width: '14', height: '14', alt: '설정' }}
                  >
                    정보수정
                  </ButtonS>
                </Box>
              </Flex>
            </div>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/TabMenu</Title>
            <div className="content">
              <TabMenu tabMenuList={tabMenuList} />
            </div>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>
              <a href="https://www.radix-ui.com/themes/docs/components/checkbox" target="_blank">
                Radix Checkbox
              </a>
            </Title>
            <div className="content">
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
            </div>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>
              <a href="https://www.radix-ui.com/themes/docs/components/radio-group" target="_blank">
                Radix Radio-group
              </a>
            </Title>
            <div className="content">
              <Box className="radio_group">
                <RadioGroup.Root size="3" defaultValue="1" name="sample">
                  <Box className="radio">
                    <RadioGroup.Item value="1">Default</RadioGroup.Item>
                  </Box>
                  <Box className="radio">
                    <RadioGroup.Item value="2">Comfortable</RadioGroup.Item>
                  </Box>
                  <Box className="radio">
                    <RadioGroup.Item value="3">Compact</RadioGroup.Item>
                  </Box>
                </RadioGroup.Root>
              </Box>
            </div>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <Title>/components/common/Header</Title>
            <div className="content">
              <Flex direction="column" gap="20px">
                <Box>
                  <Text as="p" weight="medium" mb="2">
                    side left
                  </Text>
                  <Header side="left">마이페이지</Header>
                </Box>
                <Box>
                  <Text as="p" weight="medium" mb="2">
                    side center
                  </Text>
                  <Header side="center">아지트 생성</Header>
                </Box>
              </Flex>
            </div>
          </section>
        </Flex>
      </Flex>
    </div>
  );
}
