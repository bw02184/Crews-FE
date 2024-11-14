import { ButtonL } from '@/components/common';
import styles from './IdPwFind.module.css';
import { Card, Flex, Text } from '@radix-ui/themes';

export default function PwFindResult() {
  return (
    <Flex direction="column" gap="20px">
      <Card className={`${styles.card} ${styles.pw_result}`}>
        <div className={styles.txt_box}>
          <Text as="p">
            <b>임시 비밀번호</b>가 입력하신 <b>이메일</b>로 <i className="dpb"></i> 전송되었습니다!
          </Text>
          <Text as="p">
            <i>로그인 후 비밀번호를 반드시 변경해주세요.</i>
          </Text>
        </div>
      </Card>
      <ButtonL as="link" href="/service/login" style="deep">
        확인
      </ButtonL>
    </Flex>
  );
}
