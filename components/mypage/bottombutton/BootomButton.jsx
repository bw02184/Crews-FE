'use client';
import { Box } from '@radix-ui/themes';
import Link from 'next/link';

export default function BottomButton() {
  const handleLogout = () => {
    alert('로그아웃 버튼이 클릭되었습니다.');
  };
  return (
    <Box className="btm_util">
      <ul>
        <li>
          <Link href="/service/leave">회원탈퇴</Link>
        </li>
        <li>
          <button onClick={handleLogout}>로그아웃</button>
        </li>
      </ul>
    </Box>
  );
}
