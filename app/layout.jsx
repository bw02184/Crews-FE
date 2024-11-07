// local font
import localFont from 'next/font/local';

// style
import '@radix-ui/themes/styles.css';
import '@/styles/reset.css';
import '@/styles/layout.css';

import { Theme } from '@radix-ui/themes';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '100 300 400 500 700 900',
});

export const metadata = {
  title: '크루즈',
  description: '소모임 통합 서비스',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable}`}>
        <Theme>
          <div className="wrapper">{children}</div>
        </Theme>
      </body>
    </html>
  );
}
