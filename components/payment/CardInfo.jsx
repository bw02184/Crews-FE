import React from 'react';
import { Card, Text } from '@radix-ui/themes';

export default function CardInfo({ cardName, cardCode }) {
  return (
    <Card>
      {cardName !== '' ? (
        <>
          <Text as="p" weight="bold">
            {cardName}
          </Text>
          <Text as="p" size="2" weight="medium" className="gray_t1">
            {cardCode}
          </Text>
        </>
      ) : (
        <>
          <Text as="p" weight="medium" className="gray_t2">
            아직 연결된 카드가 없습니다.
          </Text>
          <Text as="p" weight="medium" className="gray_t2">
            카드를 연결해주세요.
          </Text>
        </>
      )}
    </Card>
  );
}
