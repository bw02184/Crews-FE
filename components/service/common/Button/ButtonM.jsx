import { Flex } from '@radix-ui/themes';
import styles from './Button.module.css';

export default function ButtonM({ leftText, rightText }) {
  return (
    <div className={styles.button_m}>
      <Flex asChild gap="10px">
        <ul>
          <li>
            <button className={styles.deepYellow}>{leftText}</button>
          </li>
          <li>
            <button className={styles.lightYellow}>{rightText}</button>
          </li>
        </ul>
      </Flex>
    </div>
  );
}
