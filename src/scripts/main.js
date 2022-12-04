const loadingContainer = document.getElementById('loading-container');
const authContainer = document.getElementById('auth-container');
const homeContainer = document.getElementById('home-container');

// Submit button
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', authorizeGitHub);

const getKeyFromLocalStorage = async (key) => {
  return await new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get([key], (result) => {
        console.log('DSA Together Token: ' + result.dsa_together_token);
        resolve(result.dsa_together_token);
      });
    } catch (error) {
      console.log(error);
      resolve(null);
    }
  });
};

// Different messages
const handleShowLoading = () => {
  loadingContainer.style.display = 'block';
  authContainer.style.display = 'none';
  homeContainer.style.display = 'none';
};

const handleShowAuthentication = () => {
  loadingContainer.style.display = 'none';
  authContainer.style.display = 'block';
  homeContainer.style.display = 'none';
};

const handleShowHome = () => {
  loadingContainer.style.display = 'none';
  authContainer.style.display = 'none';
  homeContainer.style.display = 'block';
};

// Initialize
const initialize = async () => {
  // Start with loading screen
  handleShowLoading();

  // Get token
  const key = 'dsa_together_token';
  const token = await getKeyFromLocalStorage(key);

  console.log(token);
  if (!token) {
    console.log('Token not found!!');
    handleShowAuthentication();
    return;
  }

  let data = null;
  try {
    const AUTHENTICATION_URL = 'https://api.github.com/user';
    const response = await fetch(AUTHENTICATION_URL, {
      headers: { Authorization: `token ${token}` },
    });

    data = await response.json();
  } catch (error) {
    console.log('Error: ' + error);
  }

  if (!data) {
    console.log('Error in data');
    handleShowAuthentication();
    return;
  }

  // Show the appropriate screen
  handleShowHome();
};

initialize();
