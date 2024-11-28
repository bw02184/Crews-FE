import { Header } from '@/components/common';
import PaymentMain from '@/components/payment/PaymentMain';

export default function Payment() {
  return (
    <div className="page">
      <Header side="center"> 결제</Header>
      <PaymentMain></PaymentMain>
    </div>
  );
}
