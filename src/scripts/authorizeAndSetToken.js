// Extract the current page url
const currentPageUrl = window.location.href;

const getCodeFromUrlQuery = (url) => {
  // We are first splitting the url and getting the right side of code=
  // Then we are removing things if present after the code
  // Eg: Steps for getting the code
  // 1. https://suhaan-bhandary.github.io/dsa-together-extension/?code=123456&hi=0
  // 2. 123456&hi=0
  // 3. 123456
  return url.split('code=')[1].split('&')[0];
};

const getAuthToken = async (code) => {
  const ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
  const client_id = '18ffc63913c7075741ff';
  const client_secret = 'f2c2f474cad99a3a18233fef0d6dd2368b423a31';

  try {
    const response = await fetch(ACCESS_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ client_id, client_secret, code }),
    });

    const data = await response.json();
    const access_token = data.access_token;

    return access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const authorizeAndSetToken = async () => {
  // Check if the current page is the Authenticate Page, if not return
  if (
    !currentPageUrl.includes('https://github.com') ||
    !currentPageUrl.includes('code=')
  ) {
    return;
  }

  console.log('We are on Auth Page');

  // Get the code from the url
  const code = getCodeFromUrlQuery(currentPageUrl);
  console.log(
    '🚀 ~ file: authOnGitHub.js:52 ~ authorizeAndSetToken ~ code',
    code
  );

  // Get the token from github using the code
  const token = await getAuthToken(code);
  console.log(
    '🚀 ~ file: authOnGitHub.js:56 ~ authorizeAndSetToken ~ token',
    token
  );

  // Return if token not generated
  if (!token) return;

  // Set the code in the local storage of the extension
  chrome.storage.local.set({ dsa_together_token: token }, () => {
    console.log('Updated dsa_together_token');
  });
};

authorizeAndSetToken();
