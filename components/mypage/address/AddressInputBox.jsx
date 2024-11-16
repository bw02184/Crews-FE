import { Flex } from '@radix-ui/themes';
import AddressInput from './input/AddressInput';
export default function AddressInputBox() {
  return (
    <Flex className="row" direction="column" gap="10px">
      <AddressInput />
    </Flex>
  );
}
