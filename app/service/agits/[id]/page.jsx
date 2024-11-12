import { SelectFilter } from '@/components/common';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';
import { Box } from '@radix-ui/themes';

export default function Page({ params }) {
  const [agits] = agitsSelectMenuList.filter((select) => select.id == params.id);

  return (
    <Box p="3">
      <SelectFilter isHeader={true} as="link" pathname="/service/agits" selectList={agitsSelectMenuList}>
        {agits.text}
      </SelectFilter>
    </Box>
  );
}
