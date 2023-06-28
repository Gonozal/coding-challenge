import {
  eachDayOfInterval,
  endOfWeek,
  getDay,
  getWeek,
  startOfWeek,
} from 'date-fns';

import styles from './page.module.scss';
import { DayElement } from './components/day-element';

export default async function IndexPage() {
  // This is a server component and not updated after the initial render
  // unless navigation happens, `refresh()` is called or similar.
  // As such, it's safe to call "volatile" functions like date outside of useEffect
  const today = new Date();
  const daysInWeek = eachDayOfInterval({
    start: startOfWeek(today),
    end: endOfWeek(today),
  });
  const weekNumber = getWeek(today);

  return (
    <div className={styles.page}>
      <main>
        <h1>Time Tracking</h1>
        <h2>Week {weekNumber}</h2>
        {daysInWeek.map((date) => {
          return <DayElement key={getDay(date)} date={date} />;
        })}
      </main>
    </div>
  );
}
