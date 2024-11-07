import styles from './Button.module.css';

export default function ButtonL({ children, style }) {
  return (
    <div className={styles.button_l}>
      <button className={styles[style]}>{children}</button>
    </div>
  );
}
