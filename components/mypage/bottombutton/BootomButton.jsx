'use client';
import { Box, Flex } from '@radix-ui/themes';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function BottomButton() {
  return (
    <Box className="btm_util">
      <Flex justify="center" align="center" gap="20px" asChild>
        <ul>
          <li>
            <Link href="/service/leave">회원탈퇴</Link>
          </li>
          <li>
            <button
              onClick={async () => {
                await signOut();
                alert('로그아웃 되었습니다!');
              }}
            >
              로그아웃
            </button>
          </li>
        </ul>
      </Flex>
    </Box>
  );
}
