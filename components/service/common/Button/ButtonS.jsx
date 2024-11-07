import styles from './Button.module.css';

export default function ButtonS({ children, style }) {
  return (
    <div className={styles.button_s}>
      <button className={styles[style]}>{children}</button>
    </div>
  );
}
