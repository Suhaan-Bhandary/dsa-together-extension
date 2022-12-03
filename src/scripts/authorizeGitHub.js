const authorizeGitHub = async () => {
  const AUTHORIZATION_URL = 'https://github.com/login/oauth/authorize';
  const CLIENT_ID = '18ffc63913c7075741ff';
  const REDIRECT_URL = 'https://github.com';

  let url = `${AUTHORIZATION_URL}?client_id=${CLIENT_ID}&redirect_uri${REDIRECT_URL}&scope=repo`;

  chrome.tabs.create({ url, active: true }, () => {
    console.log('HI this is the new window');
  });
};
