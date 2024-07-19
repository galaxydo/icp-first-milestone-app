import { AuthClient } from "@dfinity/auth-client";

async function loginWithInternetIdentity() {
  const days = BigInt(1);
  const hours = BigInt(24);
  const nanoseconds = BigInt(3600000000000);

  const defaultOptions = {
    createOptions: {
      idleOptions: {
        disableIdle: true,
      },
    },
    loginOptions: {
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app/#authorize"
          : `http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai#authorize`,
      // Maximum authorization expiration is 8 days
      maxTimeToLive: days * hours * nanoseconds,
    },
  };

  let loginAsAnonymous = !!window.location.href.startsWith('http://localhost'); // process.env.DFX_NETWORK === "ic" ? false : true;
	// loginAsAnonymous = false;

  if (!loginAsAnonymous) {
    await new Promise(async (resolve) => {
      const authClient = await AuthClient.create(defaultOptions.createOptions);

      authClient.login({
        ...defaultOptions.loginOptions,
        onSuccess: async () => {
          resolve(true);
        },
      });
    });
  }

  try {
    const urlParams = new URLSearchParams({
      DFX_NETWORK: process.env.DFX_NETWORK!,
      CANISTER_ID_GALAXY_FRONTEND: process.env.CANISTER_ID_GALAXY_FRONTEND!,
      CANISTER_ID_GALAXY_BACKEND: process.env.CANISTER_ID_GALAXY_BACKEND!,
      CANISTER_ID_INTERNET_IDENTITY: process.env.CANISTER_ID_INTERNET_IDENTITY!,
      REGISTER_TIMESTAMP: Math.ceil(Date.now() / 1000),
    }).toString();
    // Register the new service worker

    await navigator.serviceWorker.getRegistrations().then(async (registrations) => {
      for (let registration of registrations) {
        console.log('unregister', registration);
        await registration.unregister();
      }
      await navigator.serviceWorker.register(`/galaxy-service-worker.js?${urlParams}`, { scope: '/', type: 'module' })
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);

          // Check if there's an existing service worker
          if (registration.waiting) {
            // If there's a waiting service worker, immediately activate it
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          }

          // Listen for the new service worker to take control
          // navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('New service worker activated and controlling the page');
          // });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });

    });
  } catch (err) {
    alert('An error occurred during the login process. Please try again.');
    console.error(err);
    document.body.classList.add('error');
    document.body.textContent = err.toString();
  }
}

function setLoadingState(isLoading) {
  const loginButton = document.getElementById('loginButton');
  const spinner = document.getElementById('spinner');

  if (isLoading) {
    loginButton.disabled = true;
    spinner.classList.remove('hidden');
  } else {
    loginButton.disabled = false;
    spinner.classList.add('hidden');
  }
}

document.getElementById('loginButton').addEventListener('click', async () => {
  setLoadingState(true);

  try {
    await loginWithInternetIdentity();
		await new Promise(resolve => setTimeout(resolve, 500));
		window.location = '/';
  } catch (error) {
    console.error('Login failed:', error);
  } finally {
    setLoadingState(false);
  }
});

window.loginWithInternetIdentity = loginWithInternetIdentity;
