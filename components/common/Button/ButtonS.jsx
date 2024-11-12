import Link from 'next/link';
import styles from './Button.module.css';
import Image from 'next/image';

export default function ButtonS({ as = 'button', href, type = 'button', style, children, icon, ...props }) {
  return (
    <div className={styles.button_s}>
      {as == 'link' && href ? (
        <Link href={href} className={style} {...props}>
          <span>{children}</span>
          <Image src={icon.src} width={icon.width} height={icon.height} alt={icon.alt} />
        </Link>
      ) : (
        <button type={type} className={style} {...props}>
          <span>{children}</span>
          <Image src={icon.src} width={icon.width} height={icon.height} alt={icon.alt} />
        </button>
      )}
    </div>
  );
}
