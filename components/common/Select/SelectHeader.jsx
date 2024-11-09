import { Select } from '@radix-ui/themes';

export default function SelectHeader() {
  return (
    <Select.Root defaultValue="apple">
      <Select.Trigger radius="full" />
      <Select.Content position="popper">
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="orange">Orange</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}
