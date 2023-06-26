import Link from 'next/link';
import { PropsWithChildren } from 'react';
import styles from './navigation.module.scss';
import { CurrentUser } from './current-user';

export const Navigation = async ({ children }: PropsWithChildren) => {
  return (
    <>
      <nav className={styles.navigation}>
        <div>
          <Link href="/">Time Tracking</Link>
        </div>
        <div>
          <CurrentUser />
        </div>
      </nav>
      {children}
    </>
  );
};
