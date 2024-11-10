import { Flex } from '@radix-ui/themes';
import styles from './Button.module.css';

export default function ButtonM({ leftText, rightText }) {
  return (
    <div className={styles.button_m}>
      <Flex asChild gap="10px">
        <ul>
          <li>
            <button className={styles.light}>{leftText}</button>
          </li>
          <li>
            <button className={styles.deep}>{rightText}</button>
          </li>
        </ul>
      </Flex>
    </div>
  );
}
