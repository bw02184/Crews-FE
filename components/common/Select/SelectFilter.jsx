import { Select } from '@radix-ui/themes';

export default function SelectFilter() {
  return (
    <Select.Root defaultValue="apple">
      <Select.Trigger radius="full" />
      <Select.Content position="popper">
        <Select.Group>
          <Select.Label>Vegetables</Select.Label>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="orange">Orange</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
