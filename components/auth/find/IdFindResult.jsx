import { ButtonM } from '@/components/common';
import styles from './IdPwFind.module.css';
import { Card, Flex, Text } from '@radix-ui/themes';

export default function IdFindResult() {
  return (
    <Flex direction="column" gap="20px">
      <Card className={`${styles.card} ${styles.id_result}`}>
        <div className={styles.txt_box}>
          <Text as="p">가나다 회원님의 아이디는</Text>
          <Text as="p">
            <em className="underline">abcedf@naver.com</em> 입니다
          </Text>
        </div>
      </Card>
      <ButtonM
        leftButton={{ as: 'link', href: '/service/login', text: '확인' }}
        rightButton={{ as: 'link', href: '/sample/pwfind', text: '비밀번호 찾기' }}
      />
    </Flex>
  );
}
