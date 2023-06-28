import { post } from '@fc/api-types';
import { getUserCookie } from '@fc/cookies/server';

import { add, endOfDay, format, startOfWeek, sub } from 'date-fns';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import styles from './page.module.scss';

const TimeEntry = zfd.formData({
  startedAt: zfd.text(z.string().datetime()),
  finishedAt: zfd.text(z.string().datetime()),
});

export default function Modal({
  params: { dayOfTheWeek },
  errors,
}: {
  params: { dayOfTheWeek: string };
  errors: any;
}) {
  async function addTimeEntry(formData: FormData): Promise<void> {
    'use server';
    const userId = getUserCookie() || '';
    const body = TimeEntry.parse(formData);

    const timeEntry = await post('/api/time-entry', {
      body,
      headers: { 'x-user-id': userId },
    });

    if (timeEntry.data) {
      redirect('/time-tracking');
    }
  }

  console.log(errors);

  const now = new Date();

  const minDate = sub(now, { weeks: 4 });
  const maxDate = endOfDay(now);

  const selectedDay = add(startOfWeek(now), {
    days: parseInt(dayOfTheWeek, 10),
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <form className={styles.form} action={addTimeEntry}>
          <div>
            <label htmlFor="start" className={styles.formLabel}>
              Start date
            </label>
            <input
              type="datetime-local"
              id="start"
              name="startedAt"
              step="1"
              defaultValue={format(selectedDay, "yyyy-MM-dd'T00:00:00'")}
              min={format(minDate, "yyyy-MM-dd'T'HH:mm:ss")}
              max={format(maxDate, "yyyy-MM-dd'T'HH:mm:ss")}
            />
          </div>
          <div>
            <label htmlFor="end" className={styles.formLabel}>
              End date
            </label>
            <input
              type="datetime-local"
              id="end"
              name="finishedAt"
              step="1"
              defaultValue={format(selectedDay, "yyyy-MM-dd'T00:00:00'")}
              min={format(minDate, "yyyy-MM-dd'T'HH:mm:ss")}
              max={format(maxDate, "yyyy-MM-dd'T'HH:mm:ss")}
            />
          </div>
          <div className={styles.actions}>
            <Link href="/time-tracking" className={styles.cancel}>
              Cancel
            </Link>
            <button type="submit" className={styles.submit}>
              Add time entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
