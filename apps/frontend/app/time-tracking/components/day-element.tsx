import { format, getDay } from 'date-fns';

import styles from './day-element.module.scss';
import Link from 'next/link';

export const DayElement = ({ date }: { date: Date }) => {
  return (
    <details className={styles.dayRow}>
      <DaySummary date={date} />
      <DayDetails date={date} />
    </details>
  );
};

const DaySummary = ({ date }: { date: Date }) => {
  return (
    <summary className={styles.daySummary}>
      <Link href={`/time-tracking/new/${getDay(date)}`}>+</Link>
      <div className={styles.dateDisplay}>{format(date, 'PPPP')}</div>
    </summary>
  );
};

const DayDetails = ({ date }: { date: Date }) => {
  return (
    <ul>
      <li>So awesome!</li>
    </ul>
  );
};
