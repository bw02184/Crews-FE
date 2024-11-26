import React from 'react';
import { Card, Text } from '@radix-ui/themes';
import styles from './CardInfo.module.css';

export default function CardInfo({ cardName, cardCode }) {
  return (
    <Card className={`${styles.card}`}>
      {cardName !== '' ? (
        <Text as="span" size="2" weight="bold">
          {cardName}
        </Text>
      ) : (
        <Text as="span" size="2" weight="medium">
          아직 연결된 카드가 없습니다.
        </Text>
      )}

      {cardCode !== '' ? (
        <Text as="p" size="2" weight="medium" className="gray_t1">
          {cardCode}
        </Text>
      ) : (
        <Text as="p" size="2" weight="medium">
          카드를 연결해주세요.
        </Text>
      )}
    </Card>
  );
}
