import { format, getDay, getWeek, parseISO } from 'date-fns';

import styles from './day-element.module.scss';
import Link from 'next/link';
import { Suspense } from 'react';
import { components, get } from '@fc/api-types';

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
    <Suspense fallback={<DayDetailsFallback />}>
      <DayDetailsImplementation date={date} />
    </Suspense>
  );
};

const DayDetailsFallback = () => {
  return <div>Loading Time Entries...</div>;
};

const DayDetailsImplementation = async ({ date }: { date: Date }) => {
  const week = getWeek(date);
  const today = getDay(date);

  const entries = await get('/api/time-entry', { params: { query: { week } } });

  if (!entries.data) return <NoTimeEntries />;

  const dayEntries = entries.data.filter((entry) => {
    if (!entry.finishedAt) return false;

    const dayOfEntry = getDay(new Date(entry.startedAt));
    return dayOfEntry === today;
  }) as Required<components['schemas']['TimeEntry']>[];

  if (dayEntries.length === 0) return <NoTimeEntries />;

  return (
    <ul>
      {dayEntries.map((entry) => {
        return (
          <li key={entry.id}>
            {format(parseISO(entry.startedAt), 'pp')} -{' '}
            {format(parseISO(entry.finishedAt), 'pp')}
          </li>
        );
      })}
    </ul>
  );
};

const NoTimeEntries = () => {
  return (
    <div>There don&apos;t seem to be any time entries logged for this day</div>
  );
};
