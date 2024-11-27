'use client';
import { ButtonL, ButtonS, SelectFilter, TabMenu, Title } from '@/components/common';
import { agitsSelectMenuList } from '@/constants/selectMenuList/sample';
import { tabMenuList } from '@/constants/tabMenuList/agits';
import { Flex, Text } from '@radix-ui/themes';

import { useState } from 'react';
import ProfileCardList from '@/components/agits/ProfileCardList';
export default function Page({ params }) {
  const [agits] = agitsSelectMenuList.filter((select) => select.id == params.agitId);
  const [buttonState, setButtonState] = useState({
    text: '모임원',
    isClicked: false,
  });
  const handleClick = () => {
    setButtonState((prevState) => ({
      text: prevState.text === '모임원' ? '모임장' : '모임원', // abc <-> def 전환
      isClicked: !prevState.isClicked, // 상태 토글
    }));
  };
  return (
    <div className="page">
      <header>
        <Flex align="center">
          <SelectFilter isHeader={true} as="link" pathname="/service/agits" selectList={agitsSelectMenuList}>
            {agits?.text}
          </SelectFilter>
          <ButtonS style="deep" onClick={handleClick}>
            {buttonState.text}
          </ButtonS>
        </Flex>
        <TabMenu tabMenuList={tabMenuList} baseUrl={`/service/agits/${params.agitId}`} />
      </header>
      <Flex direction="column" gap="10px" className="content">
        {buttonState.text === '모임원' || buttonState.text === '모임장' ? (
          <section>
            <Flex direction="column" gap="20px">
              <Flex justify="between" align="center" wrap="wrap">
                <Title>멤버</Title>
                <Text as="p" size="2" weight="medium" className="gray_t1">
                  {`${agits.id}`}명
                </Text>
              </Flex>
              <Flex>
                <ul>
                  <ProfileCardList status="account" />
                  <ProfileCardList status="account" />
                  <ProfileCardList status="account" />
                </ul>
              </Flex>
              <Flex direction="column" gap="20px">
                <ButtonL as="link" href="/service/agits/1/setting/details" style="deep" size="3">
                  더보기
                </ButtonL>
                {buttonState.text !== '모임장' && (
                  <Text align="center" size="2" className="gray_t2">
                    아지트 탈퇴
                  </Text>
                )}
              </Flex>
            </Flex>
          </section>
        ) : null}
        {buttonState.text === '모임장' && (
          <section>
            <Flex direction="column" gap="20px">
              <Flex justify="between" align="center" wrap="wrap">
                <Title>가입신청</Title>
                <Text as="p" size="2" weight="medium" className="gray_t1">
                  {`${agits.id}`}명
                </Text>
              </Flex>
              <Flex>
                <ul>
                  {/* flex 쳐내고 padding 줘서 안쪽 여백 주고 border-top 써서 구분선 만들기 */}
                  <ProfileCardList status="member" />
                  <ProfileCardList status="member" />
                  <ProfileCardList status="member" />
                </ul>
              </Flex>
              <Flex direction="column" gap="20px">
                <ButtonL as="link" href="/service/agits/1/setting/approve" style="deep" size="3">
                  더보기
                </ButtonL>
                <Text align="center" size="2" className="gray_t2">
                  아지트 해체
                </Text>
              </Flex>
            </Flex>
          </section>
        )}
      </Flex>
    </div>
  );
}
