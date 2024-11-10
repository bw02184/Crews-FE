import styles from './Modal.module.css';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Box, Dialog, Flex, Heading, Text } from '@radix-ui/themes';
import { ButtonM } from '../Button';

export default function Modal({ isOpen, closeModal, children }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={closeModal}>
      <Dialog.Content maxWidth="390px" aria-describedby={undefined} className={styles.dialog}>
        <Flex direction="column" gap="20px" className="modal_content">
          <Box className={styles.modal_header}>
            <Dialog.Title>
              <Heading as="h3" size="5" align="center">
                모임명
              </Heading>
              <Text as="p" size="2" weight="medium" align="center">
                아지트에 가입하시려면 아래 사항을 확인해주세요.
              </Text>
            </Dialog.Title>
            <Dialog.Close>
              <button className={styles.btn_close}>
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Box>
          <Box className={`${styles.modal_body}`}>{children}</Box>
          <Box className={styles.modal_footer}>
            <ButtonM leftText="취소" rightText="확인" leftOnClick={closeModal} rightOnClick={closeModal} />
          </Box>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
