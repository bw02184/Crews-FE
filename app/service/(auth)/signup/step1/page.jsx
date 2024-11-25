import Register from '@/components/auth/signup/Register';
import Step from '@/components/auth/signup/Step';
import { Flex } from '@radix-ui/themes';

export default function Page() {
  return (
    <>
      <section>
        <Flex direction="column" gap="20px">
          <Step activeIdx={1} />
          <Register />
        </Flex>
      </section>
    </>
  );
}
