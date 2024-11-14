import { SelectFilter } from '@/components/common';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';

export default function Page({ params }) {
  const [agits] = agitsSelectMenuList.filter((select) => select.id == params.id);

  return (
    <div className="page">
      <header>
        <SelectFilter isHeader={true} as="link" pathname="/service/agits" selectList={agitsSelectMenuList}>
          {agits.text}
        </SelectFilter>
      </header>
      <div className="content">
        <section>내용물</section>
      </div>
    </div>
  );
}
