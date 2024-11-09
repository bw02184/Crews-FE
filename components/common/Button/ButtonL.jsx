import styles from './Button.module.css';

export default function ButtonL({ children, style, onClick }) {
  return (
    <div className={styles.button_l}>
      <button className={styles[style]} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
