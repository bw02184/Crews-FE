import { Box, Flex, Text } from '@radix-ui/themes';
import { Title } from '@/components/common';

export default function PinNumberText({ stage, status, defaultParams }) {
  return (
    <Flex direction="column" gap="10px" className="txt_box">
      <Title>
        {(stage == 'create' || defaultParams == 'create') && status == undefined && (
          <>
            크루즈 내에서 사용할 <span className="underline">PIN번호를 생성</span>해주세요.
          </>
        )}
        {((stage == 'create' && status == 'confirm') || (stage == 'create' && status == 'error')) && (
          <>
            생성한 PIN번호를 <span className="underline">다시 한 번 입력</span>해주세요.
          </>
        )}
        {(stage == 'auth' || defaultParams == 'auth') && (
          <>
            <span className="underline">PIN번호를 인증</span>해주세요.
          </>
        )}
        {(stage == 'update' || defaultParams == 'update') && (
          <>
            <span className="underline">PIN번호를 변경</span>합니다.
          </>
        )}
      </Title>
      <Box className="txt_con">
        <Text as="p" size="2" weight="medium">
          {(stage == 'create' || defaultParams == 'create') && status == undefined && (
            <>
              모임 카드로 결제를 하거나 모임 통장에 이체를 할 때 사용할 <i className="dpb"></i>
              PIN번호를 생성합니다. 연속된 숫자나 의미있는 조합은 피해주세요.
            </>
          )}
          {((stage == 'create' && status == 'confirm') ||
            (stage == 'create' && status == 'error') ||
            stage == 'auth' ||
            defaultParams == 'auth') && <>정확히 일치해야 합니다.</>}
          {(stage == 'update' || defaultParams == 'update') && status == undefined && (
            <>기존에 사용하던 PIN 번호를 입력해주세요.</>
          )}
        </Text>
      </Box>
    </Flex>
  );
}
