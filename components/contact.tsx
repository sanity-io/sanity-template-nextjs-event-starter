import cn from 'classnames';
import styleUtils from './utils.module.css';
import styles from './contact.module.css';
import { EMAIL } from '@lib/constants';

export default function Contact() {
  return (
    <div className={cn(styleUtils.appear, styleUtils['appear-fifth'], styles.contact)}>
      Questions? <br className={styleUtils['show-on-mobile']} />
      <a href={`mailto:${EMAIL}`} className={styles['contact-email']}>
        {EMAIL}
      </a>
    </div>
  );
}
