'use client';

import styles from './AccountCreate.module.css';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import Image from 'next/image';
import { ButtonS } from '@/components/common';
import { generateAccount } from '@/apis/agitsAPI';

export default function DepositProduct({ agitId, product }) {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleGenerateAccount = async () => {
    const response = await generateAccount(agitId, product.id);
    if (response?.errorCode) {
      throw new Error(response.message);
    }
  };

  return (
    <li>
      <Card>
        <Flex gap="10px" direction="row">
          <Box className={styles.img_box}>
            <div className={`${styles.img} img`}>
              <Image src={product.bankImage} width={30} height={30} alt={`${product.bankName} 이미지`} />
            </div>
          </Box>
          <Flex direction="column" gap="10px" className={styles.txt_box}>
            <Box className={styles.top}>
              <em>{product.productName}</em>
              <Text as="p" size="1" weight="medium">
                {product.bankName}
              </Text>
            </Box>
            <Box className={styles.rate}>
              <Flex gap="10px" asChild>
                <ul>
                  <li>
                    <Text as="p" size="1" weight="bold">
                      최고
                    </Text>
                    <Text as="label" size="3" weight="bold" className="light">
                      {`연 ${formatter.format(product.highestRate)}%`}
                    </Text>
                  </li>
                  <li>
                    <Text as="p" size="1" weight="bold">
                      최저
                    </Text>
                    <Text as="label" size="3" weight="bold" className="light">
                      {`연 ${formatter.format(product.lowestRate)}%`}
                    </Text>
                  </li>
                </ul>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Flex justify="end" gap="10px" pt="3">
          <ButtonS style="deep" onClick={handleGenerateAccount}>
            상품선택
          </ButtonS>
        </Flex>
      </Card>
    </li>
  );
}
