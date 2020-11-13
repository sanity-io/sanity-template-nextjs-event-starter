export async function logEvent(email, action) {
  if (!email) {
    return;
  }

  // await fetch(`/analytics`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     email,
  //     action
  //   })
  // });
}
