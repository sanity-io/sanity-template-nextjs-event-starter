import cn from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { API_URL } from '@lib/constants';
import { useConfUser } from '@lib/hooks/use-conf-user';
import styleUtils from './utils.module.css';
import styles from './conf-entry.module.css';
import LoadingDots from './loading-dots';

type FormState = 'default' | 'loading' | 'error';

const DEFAULT_ERROR_MSG = 'Error! Please try again.';

function getErrorMsg(code: string) {
  switch (code) {
    case 'bad_email':
      return 'Please enter a valid email';
    default:
      return DEFAULT_ERROR_MSG;
  }
}

function setCookie(email: string) {
  Cookies.set('conf-email', email, { expires: 7 });
}

export default function ConfEntry() {
  const [emailInput, setEmailInput] = useState('');
  const [focused, setFocused] = useState(false);
  const [formState, setFormState] = useState<FormState>('default');
  const [errorMsg, setErrorMsg] = useState('');
  const { revalidate: revalidateConfUser } = useConfUser();
  const router = useRouter();

  const onSubmit = useCallback(
    async e => {
      try {
        e.preventDefault();
        setFormState('loading');

        const res = await fetch(`${API_URL}/conf-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: emailInput })
        });

        if (!res.ok) {
          const json = await res.json();
          setErrorMsg(getErrorMsg(json.error.code));
          setFormState('error');
          return;
        }

        fetch(`${API_URL}/conf-webhook`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: emailInput,
            referrer: document.referrer,
            queryParams: window.location.search
          })
        }).catch(err => {
          // No need to handle the errors for conf-webhook
          console.error(err);
        });

        setCookie(emailInput);
        revalidateConfUser();
      } catch (err) {
        console.error(err);
        setErrorMsg(DEFAULT_ERROR_MSG);
        setFormState('error');
      }
    },
    [emailInput, revalidateConfUser]
  );

  useEffect(() => {
    if ('URLSearchParams' in window) {
      const { search, pathname } = window.location;
      const params = new URLSearchParams(search);
      const email = params.get('login');
      if (email) {
        setEmailInput(email);
        params.delete('login');
        const newSearch = params.toString();
        const newAsPath = pathname + (newSearch ? `?${newSearch}` : '');
        const newPathname = router.pathname + (newSearch ? `?${newSearch}` : '');
        history.replaceState(
          { url: newPathname, as: newAsPath, options: { shallow: true } },
          '',
          newAsPath
        );
      }
    }
  }, [router]);

  const onTryAgainClick = useCallback(e => {
    e.preventDefault();
    setErrorMsg('');
    setFormState('default');
  }, []);

  return (
    <div className={cn(styles.container, styleUtils.appear, styleUtils['appear-first'])}>
      <h1 className={cn(styles.hero)}>Join the conference.</h1>
      <h2 className={cn(styles.description)}>
        An interactive online experience by the community, free for everyone.
      </h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles['form-row']}>
          <label
            htmlFor="email-input-field"
            className={cn(styles['input-label'], {
              [styles.focused]: focused,
              [styles.error]: formState === 'error'
            })}
          >
            {formState === 'error' ? (
              <div className={cn(styles.input, styles['input-text'])}>{errorMsg}</div>
            ) : (
              <input
                className={styles.input}
                autoComplete="off"
                type="email"
                id="email-input-field"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter email to join the event"
                aria-label="Your email address"
                required
              />
            )}
          </label>
          <button
            type="submit"
            className={cn(styles.submit, styles.register, styles[formState])}
            disabled={formState === 'loading'}
            onClick={formState === 'error' ? onTryAgainClick : undefined}
          >
            {formState === 'loading' ? (
              <LoadingDots size={4} />
            ) : (
              <>{formState === 'error' ? 'Try Again' : 'Join'}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
