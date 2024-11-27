import React from 'react';
import { Card, Text } from '@radix-ui/themes';

export default function CardInfo({ cardName, cardCode }) {
  return (
    <Card>
      {cardName !== '' ? (
        <Text as="span" size="3" weight="bold">
          {cardName}
        </Text>
      ) : (
        <Text as="span" size="3" weight="medium" className="gray_t1">
          아직 연결된 카드가 없습니다.
        </Text>
      )}

      {cardCode !== '' ? (
        <Text as="p" size="3" weight="medium" className="gray_t1">
          {cardCode}
        </Text>
      ) : (
        <Text as="p" size="3" weight="medium" className="gray_t1">
          카드를 연결해주세요.
        </Text>
      )}
    </Card>
  );
}
