'use client';

import Link from 'next/link';
import styles from './Button.module.css';

export default function ButtonL({ as = 'button', href, type = 'button', style, children, ...props }) {
  return (
    <div className={styles.button_l}>
      {as == 'link' && href ? (
        <Link href={href} className={style} {...props}>
          {children}
        </Link>
      ) : (
        <button type={type} className={style} {...props}>
          {children}
        </button>
      )}
    </div>
  );
}
