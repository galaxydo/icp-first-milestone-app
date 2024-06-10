import { AuthClient } from "@dfinity/auth-client";

async function authenticate() {
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

	const authClient =
		await AuthClient.create(defaultOptions.createOptions);

	authClient.login({
		...defaultOptions.loginOptions,
		onSuccess: async () => {
			alert("Authorized!")
				window.location = "/";
		},
	});
}

window.authenticate = authenticate;

window.AuthClient = AuthClient;
