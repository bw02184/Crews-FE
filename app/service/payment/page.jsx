import { Header } from '@/components/common';
import Test from '@/components/payment/PaymentMain';
import { Box } from '@radix-ui/themes';

export default function Payment() {
  return (
    <div className="page">
      <Header side="center"> 결제</Header>
      <Box>
        <Test></Test>
      </Box>
    </div>
  );
}
