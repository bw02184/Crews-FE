'use client';

import styles from './page.module.css';
import { Box, Flex, RadioGroup, Strong, Text } from '@radix-ui/themes';
import {
  ButtonL,
  ButtonM,
  ButtonS,
  CheckBox,
  Header,
  ImageCard,
  SelectFilter,
  TabMenu,
  Toast,
} from '@/components/common';
import useToast from '@/hooks/useToast';
import { tabMenuList } from '@/constants/tabMenuList/service';
import { locationSelectMenuList, sortSelectMenuList } from '@/constants/selectMenuList/location';
import Modal from '@/components/common/Modal/Modal';
import useModal from '@/hooks/useModal';

export default function Service() {
  const { toast, setToast, toastMessage, showToast } = useToast();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <Flex direction="column" gap="10px" className={styles.container}>
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
            <div className={styles.title}>
              <Strong>/components/common/Toast</Strong>
            </div>
            <div className={styles.content}>
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
            <div className={styles.title}>
              <Strong>/components/common/Modal</Strong>
            </div>
            <div className={styles.content}>
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
            <div className={styles.title}>
              <Strong>/components/common/Select</Strong>
            </div>
            <div className={styles.content}>
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
            <div className={styles.title}>
              <Strong>/components/common/Button</Strong>
            </div>
            <div className={styles.content}>
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
            <div className={styles.title}>
              <Strong>/components/common/Button</Strong>
            </div>
            <div className={styles.content}>
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
                  <ButtonM leftText="M1" rightText="M2" />
                </Box>
                <Box>
                  <Text as="p" weight="medium" mb="2">
                    버튼S
                  </Text>
                  <ButtonS style="deep">s1</ButtonS>
                  <ButtonS style="light">s2</ButtonS>
                </Box>
              </Flex>
            </div>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <div className={styles.title}>
              <Strong>/components/common/TabMenu</Strong>
            </div>
            <div className={styles.content}>
              <TabMenu tabMenuList={tabMenuList} />
            </div>
          </section>
        </Flex>
        <Flex direction="column" gap="10px" asChild>
          <section>
            <div className={styles.title}>
              <Strong>
                <a href="https://www.radix-ui.com/themes/docs/components/checkbox" target="_blank">
                  Radix Checkbox
                </a>
              </Strong>
            </div>
            <div className={styles.content}>
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
            <div className={styles.title}>
              <Strong>
                <a href="https://www.radix-ui.com/themes/docs/components/radio-group" target="_blank">
                  Radix Radio-group
                </a>
              </Strong>
            </div>
            <div className={styles.content}>
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
            <div className={styles.title}>
              <Strong>/components/common/Header</Strong>
            </div>
            <div className={styles.content}>
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
