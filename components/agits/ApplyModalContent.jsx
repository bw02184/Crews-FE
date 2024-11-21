import { Label } from '@/components/common';
import styles from './ApplyModalContent.module.css';
import { Callout, Flex, Text } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';

export default function ApplyModalContent() {
  return (
    <Flex direction="column" gap="20px">
      <div className={styles.img_box}>
        <div className="img">
          <img src="/imgs/dev/img_apply.jpg" />
        </div>
        <Label style="lime">반려동물</Label>
      </div>
      <Flex direction="column" gap="20px" className={styles.txt_box}>
        <div className={styles.info_list}>
          <Flex direction="column" gap="10px" asChild>
            <ul>
              <li>
                <em>한줄소개</em>
                <Text as="p" size="2" weight="medium" className="gray_t1">
                  한줄소개 한줄소개 한줄소개
                </Text>
              </li>
              <li>
                <em>모임특징</em>
                <Text as="p" size="2" weight="medium" className="gray_t1">
                  우리는 이런것도 하고 저런것도 하고 이래저래 어쩌고저쩌고 빙글빙글 얼렁뚱땅
                </Text>
              </li>
              <li>
                <em>모임회비</em>
                <Text as="p" size="2" weight="medium" className="gray_t1">
                  매월 1일, 30,000원씩
                </Text>
              </li>
            </ul>
          </Flex>
        </div>
        <div className={styles.interest_list}>
          <Flex wrap="wrap" gap="10px" asChild>
            <ul>
              <li>
                <Label style="deep">#등산</Label>
              </li>
              <li>
                <Label style="deep">#로드 트립</Label>
              </li>
              <li>
                <Label style="deep">#미식탐방</Label>
              </li>
            </ul>
          </Flex>
        </div>
        <Callout.Root color="green">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            최근 한달동안 정기모임이 <span className="underline">3회</span> 진행되었어요!
          </Callout.Text>
        </Callout.Root>
      </Flex>
    </Flex>
  );
}
