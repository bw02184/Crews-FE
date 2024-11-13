import { Box, Card, Flex, Text } from '@radix-ui/themes';
import styles from './ImageCard.module.css';
import Image from 'next/image';

export default function ImageCard({ type = 'agits', data }) {
  const isAgit = type == 'agits';

  return (
    <Card className={styles.card}>
      <Flex gap="15px">
        <Box className={styles.img_box}>
          <Box className="back_img" style={{ backgroundImage: `url(${data.image})` }}>
            <Image
              src="/imgs/img_bg_card.jpg"
              width={65}
              height={65}
              alt={`${isAgit ? data.agitName : data.eventName} 소개 이미지`}
            />
          </Box>
        </Box>
        <Box className={styles.txt_box}>
          <Box className={styles.txt}>
            <Box className={styles.title}>
              <Flex align="center" gap="17px">
                <em className="txt_line">{isAgit ? data.agitName : data.eventName}</em>
                <Text as="p" size="2" weight="medium">
                  {data.currentPersonNumber || data.currentPerson}/{data.totalPersonNumber || data.totalPerson}
                </Text>
              </Flex>
            </Box>
            <Box className={styles.intro}>
              <Text as="p" size="2" weight="medium" className="txt_line">
                {data.introduction}
              </Text>
            </Box>
          </Box>

          <Box className={styles.hashtag}>
            <Flex gap="5px" wrap="wrap" asChild>
              <ul>
                {isAgit ? (
                  data.agitInterests.map((interest, i) => (
                    <li key={`interest${i}`}>
                      <Flex gap="5px" align="center">
                        <Text as="span" size="1" weight="medium">
                          #{interest}
                        </Text>
                      </Flex>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <Flex gap="5px" align="center">
                        <Image src="/icons/ico_location.svg" width={9} height={12} alt="정모위치" />
                        <Text as="span" size="1" weight="medium">
                          {data.eventPlace}
                        </Text>
                      </Flex>
                    </li>
                    <li>
                      <Flex gap="5px" align="center">
                        <Image src="/icons/ico_date.svg" width={10} height={10} alt="정모날짜" />
                        <Text as="span" size="1" weight="medium">
                          {data.eventDate}
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
      {isAgit && (
        <Text as="p" className={styles.category}>
          <i>{data.agitSubject}</i>
        </Text>
      )}
    </Card>
  );
}
