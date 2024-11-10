import { Flex } from '@radix-ui/themes';
import styles from './Button.module.css';

export default function ButtonM({ leftText, rightText, leftOnClick, rightOnClick }) {
  return (
    <div className={styles.button_m}>
      <Flex asChild gap="10px">
        <ul>
          <li>
            <button className={styles.light} onClick={leftOnClick}>
              {leftText}
            </button>
          </li>
          <li>
            <button className={styles.deep} onClick={rightOnClick}>
              {rightText}
            </button>
          </li>
        </ul>
      </Flex>
    </div>
  );
}
