import { getAddresses } from '@/apis/mypageAPI';
import { AddressInput, Header } from '@/components/common';
import { Flex } from '@radix-ui/themes';

export default async function page() {
  const addressData = await getAddresses();
  if (addressData?.error) {
    throw new Error(addressData.error);
  }
  return (
    <div className="page">
      <Header side="center">활동지역 수정</Header>
      <div className="content">
        <section>
          <Flex direction="column" gap="10px">
            <AddressInput initialAddresses={addressData.addresses || []} />
          </Flex>
        </section>
      </div>
    </div>
  );
}
