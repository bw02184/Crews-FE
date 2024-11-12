import { Box, Card, Flex, Text } from '@radix-ui/themes';
import styles from './ImageCard.module.css';
import Image from 'next/image';

export default function ImageCard({ type }) {
  return (
    <Card className={styles.card}>
      <Flex gap="15px">
        <Box className={styles.img_box}>
          <Box className="back_img" style={{ backgroundImage: 'url(https://picsum.photos/250/250)' }}>
            <Image src="/imgs/img_bg_card.jpg" width={65} height={65} alt={`ㅇㅇㅇ 아지트 소개 이미지`} />
          </Box>
        </Box>
        <Box className={styles.txt_box}>
          <Box className={styles.txt}>
            <Box className={styles.title}>
              <Flex align="center" gap="17px">
                <em className="txt_line">모임이름정모이름모임이름정모이름</em>
                <Text as="p" size="2" weight="medium">
                  31/50
                </Text>
              </Flex>
            </Box>
            <Box className={styles.intro}>
              <Text as="p" size="2" weight="medium" className="txt_line">
                로렘 입숨 lorem ipsum; 줄여서 립숨, lipsum 은 출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피,
                레이아웃 같은 그래픽 요소나 시각적 연출을 보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에
                들어가는 실제적인 문장 내용이 채워지기 전에 시각 디자인 프로젝트 모형의 채움 글로도 이용된다.
              </Text>
            </Box>
          </Box>

          <Box className={styles.hashtag}>
            <Flex gap="5px" wrap="wrap" asChild>
              <ul>
                {type == 'agits' && (
                  // agitInterests.map()
                  <>
                    <li>
                      <Flex gap="5px" align="center">
                        <Text as="span" size="1" weight="medium">
                          #스케이트
                        </Text>
                      </Flex>
                    </li>
                    <li>
                      <Flex gap="5px" align="center">
                        <Text as="span" size="1" weight="medium">
                          #붕어빵
                        </Text>
                      </Flex>
                    </li>
                    <li>
                      <Flex gap="5px" align="center">
                        <Text as="span" size="1" weight="medium">
                          #해양스포츠
                        </Text>
                      </Flex>
                    </li>
                  </>
                )}
                {type == 'meeting' && (
                  <>
                    <li>
                      <Flex gap="5px" align="center">
                        <Image src="/icons/ico_location.svg" width={9} height={12} alt="정모위치" />
                        <Text as="span" size="1" weight="medium">
                          상암동
                        </Text>
                      </Flex>
                    </li>
                    <li>
                      <Flex gap="5px" align="center">
                        <Image src="/icons/ico_date.svg" width={10} height={10} alt="정모날짜" />
                        <Text as="span" size="1" weight="medium">
                          24.11.09
                        </Text>
                      </Flex>
                    </li>
                  </>
                )}
              </ul>
            </Flex>
          </Box>
        </Box>
      </Flex>
      {type == 'agits' && (
        <Text as="p" className={styles.category}>
          <i>반려동물</i>
        </Text>
      )}
    </Card>
  );
}
