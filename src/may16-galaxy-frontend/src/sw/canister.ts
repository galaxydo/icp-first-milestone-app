import { AuthClient } from '@dfinity/auth-client';
import { Actor, ActorSubclass, HttpAgent, Identity } from "@dfinity/agent";
import { idlFactory, FileInfo, _SERVICE } from "../../../declarations/may16-galaxy-backend/may16-galaxy-backend.did.js";  const urlParams = new URLSearchParams(location.search);
const { CANISTER_ID_MAY16_GALAXY_BACKEND, DFX_NETWORK } = Object.fromEntries(urlParams);
console.log('DFX_NETWORK', DFX_NETWORK)

const agent = new HttpAgent({
  host: DFX_NETWORK == 'local' ? 'http://127.0.0.1:4943/' : undefined,
  verifyQuerySignatures: false,
  // 'identity': identity,
});

export const backend: ActorSubclass<_SERVICE> = Actor.createActor(idlFactory, {
  agent,
  canisterId: CANISTER_ID_MAY16_GALAXY_BACKEND,
}) as ActorSubclass<_SERVICE>;

console.log(backend)

export const authorize = async () => {
    try {
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
                identityProvider: process.env.DFX_NETWORK === "ic"
                    ? "https://identity.ic0.app/#authorize"
                    : `http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai#authorize`,
                // Maximum authorization expiration is 8 days
                maxTimeToLive: days * hours * nanoseconds,
            },
        };

        const authClient = await AuthClient.create(defaultOptions.createOptions);

        // authClient.login({
        //   ...defaultOptions.loginOptions,
        //   onSuccess: async () => {
        //     handleAuthenticated(authClient);
        //   },
        // });
        console.log('authClient', authClient);

        const identity = authClient.getIdentity() as unknown as Identity;

        if (identity) {
            Actor.agentOf(backend)?.replaceIdentity(identity);
        } else {
            console.error('NOT authorized', identity);
        }
    } catch (e) {
        console.error('authorize', e.toString());
    }
};
