import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseISO, format } from 'date-fns';
import { Stage } from '@lib/types';
import styles from './schedule-sidebar.module.css';
import Select from './select';
import TalkCard from './talk-card';

type Props = {
  allStages: Stage[];
};

export default function ScheduleSidebar({ allStages }: Props) {
  const router = useRouter();
  const [currentStageSlug, setCurrentStageSlug] = useState(router.query.slug);
  const currentStage = allStages.find((s: Stage) => s.slug === currentStageSlug);

  useEffect(() => {
    setCurrentStageSlug(router.query.slug);
  }, [router.query.slug]);

  const formatDate = (date: string) => {
    // https://github.com/date-fns/date-fns/issues/946
    return format(parseISO(date), "h:mmaaaaa'm'");
  };

  return (
    <div className={styles.schedule}>
      <h3 className={styles.header}>Schedule</h3>
      <p>
        Oct 27 - {formatDate('2020-10-27T09:00:00-07:00')}{' '}
        {new Date().toLocaleTimeString([], { timeZoneName: 'short' }).split(' ').pop()}
      </p>
      <Select
        aria-label="Select a stage"
        value={currentStageSlug}
        onChange={e => {
          const slug = e.target.value;
          setCurrentStageSlug(slug);
          router.push(`/stage/${slug}`);
        }}
      >
        {allStages.map(stage => (
          <option key={stage.slug} value={stage.slug}>
            {stage.name}
          </option>
        ))}
      </Select>
      <div className={styles.talks}>
        {currentStage?.schedule.map(talk => (
          <TalkCard key={talk.title} talk={talk} showTime />
        ))}
      </div>
    </div>
  );
}
