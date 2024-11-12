import { SelectFilter } from '@/components/common';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';
import { Box } from '@radix-ui/themes';

export default function Page({ params }) {
  return (
    <Box p="3">
      <SelectFilter isHeader={true} as="link" selectList={agitsSelectMenuList}></SelectFilter>
    </Box>
  );
}
