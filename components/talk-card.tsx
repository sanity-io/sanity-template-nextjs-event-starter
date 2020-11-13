import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { parseISO, format, isBefore, isAfter } from 'date-fns';
import { Talk } from '@lib/types';
import styles from './talk-card.module.css';

type Props = {
  key: string;
  talk: Talk;
  showTime: boolean;
};

export default function TalkCard({ talk: { title, speaker, start, end }, showTime }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formatDate = (date: string) => {
    // https://github.com/date-fns/date-fns/issues/946
    return format(parseISO(date), "h:mmaaaaa'm'");
  };

  const now = Date.now();
  const isTalkLive = isAfter(now, parseISO(start)) && isBefore(now, parseISO(end));

  const firstSpeakerLink = `/speakers/${speaker[0].slug}`;

  return (
    <div key={title} className={styles.talk}>
      {showTime && (
        <p className={styles.time}>
          {!isMounted ? '–' : `${formatDate(start)} – ${formatDate(end)}`}
        </p>
      )}
      <Link href={firstSpeakerLink}>
        <a
          className={cn(styles.card, {
            [styles['is-live']]: isTalkLive
          })}
        >
          <div className={styles['card-body']}>
            <h4 title={title} className={styles.title}>
              {title}
            </h4>
            <div className={styles.speaker}>
              <div className={styles['avatar-group']}>
                {speaker.map(s => (
                  <div key={s.name} className={styles['avatar-wrapper']}>
                    <Image
                      loading="lazy"
                      alt={s.name}
                      className={styles.avatar}
                      src={s.image.url}
                      title={s.name}
                      width={24}
                      height={24}
                    />
                  </div>
                ))}
              </div>
              <h5 className={styles.name}>
                {speaker.length === 1 ? speaker[0].name : `${speaker.length} speakers`}
              </h5>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
