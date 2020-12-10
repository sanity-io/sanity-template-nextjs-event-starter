export async function register(email: string) {
  return await fetch(`${process.env.API_URL || ''}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });
}

export async function auth(email: string) {
  return await fetch(`${process.env.API_URL || ''}/api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });
}

export async function githubOAuth({ id, token }: { id?: string; token: string }) {
  return await fetch('/api/github-oauth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      token
    })
  });
}
