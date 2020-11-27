import cn from 'classnames';
import VercelLogo from '@components/icons/icon-platform';
import { guidelinesUrl, codeOfConductUrl, legalUrl } from '@lib/conf';
import styles from './footer.module.css';
import { SITE_NAME, SITE_URL } from '@lib/constants';

export function HostedByVercel() {
  return (
    <a
      href={SITE_URL}
      className={cn(styles['footer-link'], styles['footer-logo'])}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles['secondary-text']}>Created by </div>
      <VercelLogo color="white" />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className={cn(styles.footer)}>
      <div className={styles['footer-legal']}>
        <div className={styles['footer-hostedby']}>
          <HostedByVercel />
          <div className={styles['footer-separator']} />
        </div>
        <div className={styles['footer-copyright']}>
          Copyright © 2020{' '}
          <a
            aria-label={SITE_NAME}
            href={SITE_URL}
            className={cn(styles['footer-link'], styles['footer-logo'])}
            target="_blank"
            rel="noopener noreferrer"
          >
            {SITE_NAME}
          </a>
          . All rights reserved.
        </div>
        <div className={styles['footer-center-group']}>
          <p className={styles['footer-paragraph']}>
            <a
              href={codeOfConductUrl}
              className={styles['footer-link']}
              target="_blank"
              rel="noopener noreferrer"
            >
              Code of Conduct
            </a>
          </p>
          <div className={styles['footer-separator']} />
          <p className={styles['footer-paragraph']}>
            <a
              href={legalUrl}
              className={styles['footer-link']}
              target="_blank"
              rel="noopener noreferrer"
            >
              Legal
            </a>
          </p>
          <div className={styles['footer-separator']} />
          <p className={styles['footer-paragraph']}>
            <a
              href={guidelinesUrl}
              className={styles['footer-link']}
              target="_blank"
              rel="noopener noreferrer"
            >
              FAQ
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
