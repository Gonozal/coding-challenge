import styles from './page.module.scss';
import { RefreshHelper } from './components/refresh-helper';

export default async function IndexPage() {
  return (
    <div className={styles.page}>
      <RefreshHelper />
      <main>
        <h1>Fides Coding Challenge</h1>
        <p>
          Welcome to what might become a very basic time-tracking app. You can
          log in, create new users and add time-entries
        </p>
      </main>
    </div>
  );
}
