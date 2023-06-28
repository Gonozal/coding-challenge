import Link from 'next/link';
import { PropsWithChildren } from 'react';
import styles from './navigation.module.scss';
import { CurrentUser } from './current-user';

export const Navigation = async ({ children }: PropsWithChildren) => {
  return (
    <>
      <nav className={styles.navigation}>
        <div className={styles.navSegment}>
          <Link href="/">Home</Link>
          <Link href="/time-tracking">Time Tracking</Link>
        </div>
        <div className={styles.navSegment}>
          <CurrentUser />
        </div>
      </nav>
      {children}
    </>
  );
};
