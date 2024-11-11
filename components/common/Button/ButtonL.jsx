import styles from './Button.module.css';

export default function ButtonL({ children, style, onClick, type = 'button' }) {
  return (
    <div className={styles.button_l}>
      <button type={type} className={style} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
