import ArrowButton from '@/components/agits/Account/ArrowButton';
import { Header } from '@/components/common';
import { date } from '@/constants/dummy';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Callout, Flex } from '@radix-ui/themes';

export default async function Page({ params }) {
  return (
    <div className="page">
      <header>
        <Header side="center">회비 납부</Header>
      </header>
      <Flex direction="column" gap="10px" className="content">
        <section>
          <ArrowButton data={date}></ArrowButton>
          <Callout.Root color="red" mt="1">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              회비 납부일이 지났어요! 빨리 {date.dueDay.toLocaleString('ko-KR')}원을 납부해주세요.
            </Callout.Text>
          </Callout.Root>
        </section>
        <section></section>
      </Flex>
    </div>
  );
}
