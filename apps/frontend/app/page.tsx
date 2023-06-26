import styles from './page.module.scss';
import { RefreshHelper } from './refresh-helper';

export default async function IndexPage() {
  return (
    <div className={styles.page}>
      <RefreshHelper />
      <h1>Time Tracking</h1>
    </div>
  );
}
