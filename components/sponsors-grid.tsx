import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { Sponsor } from '@lib/types';
import styles from './sponsors-grid.module.css';

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <Link key={sponsor.name} href={`/expo/${sponsor.slug}`}>
      <a
        role="button"
        tabIndex={0}
        className={cn(styles.card, {
          [styles.diamond]: sponsor.tier === 'diamond',
          [styles.gold]: sponsor.tier === 'gold'
        })}
      >
        <div className={styles.imageWrapper}>
          <Image
            alt={sponsor.name}
            src={sponsor.cardImage.url}
            className={cn(styles.image, {
              [styles.silver]: sponsor.tier === 'silver'
            })}
            loading="lazy"
            title={sponsor.name}
            width={900}
            height={500}
          />
        </div>
        {sponsor.tier !== 'silver' && (
          <div className={styles.cardBody}>
            <div>
              <h2 className={styles.name}>{sponsor.name}</h2>
              <p className={styles.description}>{sponsor.description}</p>
            </div>
          </div>
        )}
      </a>
    </Link>
  );
}

type Props = {
  sponsors: Sponsor[];
};

export default function SponsorsGrid({ sponsors }: Props) {
  const silverSponsors = sponsors.filter(s => s.tier === 'silver');
  const otherSponsors = sponsors.filter(s => s.tier !== 'silver');

  return (
    <>
      <div className={styles.grid}>
        {otherSponsors.map(sponsor => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
      <div className={styles.grid}>
        {silverSponsors.map(sponsor => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </>
  );
}
