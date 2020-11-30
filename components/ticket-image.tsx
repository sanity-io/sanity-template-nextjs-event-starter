import { useRouter } from 'next/router';
import Head from 'next/head';
import TicketVisual from './ticket-visual';
import styles from './ticket-image.module.css';

export default function TicketImage() {
  const { query } = useRouter();
  if (query.username && query.ticketNumber) {
    return (
      <div className={styles.background}>
        <div className={styles.page}>
          <Head>
            <link
              href="https://fonts.googleapis.com/css2?family=Noto+Sans+HK:wght@700&family=Noto+Sans+JP:wght@700&family=Noto+Sans+KR:wght@700&family=Noto+Sans+SC:wght@700&family=Noto+Sans+TC:wght@700&family=Noto+Sans:wght@700&display=swap"
              rel="stylesheet"
            />
          </Head>
          <TicketVisual
            size={1700 / 650}
            username={query.username.toString()}
            ticketNumber={parseInt(query.ticketNumber.toString(), 10)}
            name={query.name ? query.name?.toString() : query.username.toString()}
          />
        </div>
      </div>
    );
  }
  return <></>;
}
