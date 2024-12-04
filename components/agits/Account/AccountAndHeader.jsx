'use client';
import { useCallAgitInfo } from '@/hooks';
import { useAgitInfoStore } from '@/stores/authStore';
import { useEffect, useState } from 'react';
import AgitHeader from '@/components/agits/AgitHeader';
import { Callout, Flex } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import NoAccount from './NoAccount';
import Account from './Account';
import { ButtonM, Title } from '@/components/common';

export default function AccountAndHeader({ agitId, dues, data }) {
  const { agitInfoList } = useAgitInfoStore();
  const [agit, setAgit] = useState(null);
  useCallAgitInfo();
  useEffect(() => {
    if (agitInfoList?.length > 0) {
      const [filtered] = agitInfoList.filter((select) => select.id == agitId);
      setAgit(filtered);
    }
  }, [agitInfoList]);
  return (
    <>
      <AgitHeader currentId={agitId} />
      <Flex direction="column" gap="10px" className="content">
        <section>
          <Flex direction="column" gap="20px">
            {agit?.memberRole === 'MEMBER' && dues.dueAmount != null && (
              <>
                {dues.dueAmount !== 0.0 ? (
                  <Callout.Root color="red">
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>{`회비 납부일이 지났어요! 빨리 ${dues.dueAmount.toLocaleString('ko-KR')}원을 납부해주세요.`}</Callout.Text>
                  </Callout.Root>
                ) : (
                  ''
                )}

                <Callout.Root color="green">
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>{`매월 ${dues.dueDay}일은 모임 회비를 납부하는 날입니다.`}</Callout.Text>
                </Callout.Root>
              </>
            )}
          </Flex>
          {agit?.memberRole === 'LEADER' && (
            <Flex direction="column" gap="20px">
              <Title>모임통장</Title>
              {data.ci == null ? <NoAccount></NoAccount> : <Account data={data} hide={true} />}
              {data.ci == null ? (
                <ButtonM
                  leftButton={{ text: '연결하기' }}
                  rightButton={{ text: '생성하기', as: 'link', href: `/service/agits/${agitId}/accounts/create` }}
                />
              ) : (
                <ButtonM
                  leftButton={{ text: '권한 요청하기' }}
                  rightButton={{ text: '상세 내역보기', as: 'link', href: `/service/agits/${agitId}/accounts` }}
                />
              )}
            </Flex>
          )}
        </section>
      </Flex>
    </>
  );
}
