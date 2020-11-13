import { useState, useRef } from 'react';
import { scrollTo } from '@lib/smooth-scroll';
import cn from 'classnames';
import GithubIcon from '@components/icons/icon-github';
import CheckIcon from '@components/icons/icon-check';
import { CONF_OAUTH_CALLBACK_URL, API_URL } from '@lib/constants';
import useConfData from '@lib/hooks/use-conf-data';
import { TicketGenerationState, isMobileOrTablet } from '@lib/conf';
import LoadingDots from './loading-dots';
import formStyles from './form.module.css';
import ticketFormStyles from './ticket-form.module.css';

type FormState = 'default' | 'loading' | 'error';

type Props = {
  defaultUsername?: string;
  setTicketGenerationState: React.Dispatch<React.SetStateAction<TicketGenerationState>>;
};

export default function Form({ defaultUsername = '', setTicketGenerationState }: Props) {
  const [username, setUsername] = useState(defaultUsername);
  const [formState, setFormState] = useState<FormState>('default');
  const [errorMsg, setErrorMsg] = useState('');
  const { userData, setUserData } = useConfData();
  const formRef = useRef<HTMLFormElement>(null);

  return formState === 'error' ? (
    <div>
      <div className={cn(formStyles['form-row'], ticketFormStyles['form-row'])}>
        <div className={cn(formStyles['input-label'], formStyles.error)}>
          <div className={cn(formStyles.input, formStyles['input-text'])}>{errorMsg}</div>
          <button
            type="button"
            className={cn(formStyles.submit, formStyles.error)}
            onClick={() => {
              setFormState('default');
              setTicketGenerationState('default');
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  ) : (
    <form
      ref={formRef}
      onSubmit={e => {
        e.preventDefault();

        if (formState !== 'default') {
          setTicketGenerationState('default');
          setFormState('default');
          return;
        }

        setFormState('loading');
        setTicketGenerationState('loading');

        if (!process.env.NEXT_PUBLIC_CONF_GITHUB_OAUTH_CLIENT_ID) {
          setFormState('error');
          // Message for OS contributors
          setErrorMsg('Only enabled for production deployments.');
          return;
        }

        const windowWidth = 600;
        const windowHeight = 700;
        // https://stackoverflow.com/a/32261263/114157
        const windowTop = window.top.outerHeight / 2 + window.top.screenY - 700 / 2;
        const windowLeft = window.top.outerWidth / 2 + window.top.screenX - 600 / 2;

        const openedWindow = window.open(
          `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(
            process.env.NEXT_PUBLIC_CONF_GITHUB_OAUTH_CLIENT_ID
          )}`,
          'githubOAuth',
          `resizable,scrollbars,status,width=${windowWidth},height=${windowHeight},top=${windowTop},left=${windowLeft}`
        );

        new Promise<{ token: string } | undefined>(resolve => {
          const interval = setInterval(() => {
            if (!openedWindow || openedWindow.closed) {
              clearInterval(interval);
              resolve();
            }
          }, 250);

          window.addEventListener('message', function onMessage(msgEvent) {
            // When devtools is opened the message may be received multiple times
            if (CONF_OAUTH_CALLBACK_URL !== msgEvent.origin || !msgEvent.data.token) {
              return;
            }
            clearInterval(interval);
            if (openedWindow) {
              openedWindow.close();
            }
            resolve(msgEvent.data);
          });
        })
          .then(async data => {
            if (!data) {
              setFormState('default');
              setTicketGenerationState('default');
              return;
            }

            const res = await fetch(`${API_URL}/conf-github`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: userData.id,
                token: data.token
              })
            });

            if (!res.ok) {
              throw new Error('Failed to store oauth result');
            }

            const { username: usernameFromResponse, name } = await res.json();

            document.body.classList.add('ticket-generated');
            setUserData({ ...userData, username: usernameFromResponse, name });
            setUsername(usernameFromResponse);
            setFormState('default');
            setTicketGenerationState('default');

            // Prefetch GitHub avatar
            new Image().src = `https://github.com/${usernameFromResponse}.png`;

            // Prefetch the twitter share URL to eagerly generate the page
            fetch(`/tickets/${usernameFromResponse}`).catch(_ => {});
          })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.error(err);
            setFormState('error');
            setErrorMsg('Error! Please try again.');
            setTicketGenerationState('default');
          });
      }}
    >
      <div className={cn(formStyles['form-row'], ticketFormStyles['form-row'])}>
        <button
          type="submit"
          className={cn(
            formStyles.submit,
            formStyles['generate-with-github'],
            formStyles[formState]
          )}
          disabled={formState === 'loading' || Boolean(username)}
          onClick={() => {
            if (formRef && formRef.current && isMobileOrTablet()) {
              scrollTo(formRef.current, formRef.current.offsetHeight);
            }
          }}
        >
          <div className={ticketFormStyles.generateWithGithub}>
            <span className={ticketFormStyles.githubIcon}>
              <GithubIcon color="#000" size={24} />
            </span>
            {formState === 'loading' ? (
              <LoadingDots size={4} />
            ) : (
              username || 'Generate with GitHub'
            )}
          </div>
          {username ? (
            <span className={ticketFormStyles.checkIcon}>
              <CheckIcon color="#000" size={24} />
            </span>
          ) : null}
        </button>
        <p className={ticketFormStyles.description}>Only public info will be used.</p>
      </div>
    </form>
  );
}
