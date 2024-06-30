import { AuthClient } from '@dfinity/auth-client';
import { Actor, ActorSubclass, HttpAgent, Identity } from "@dfinity/agent";
import { idlFactory, FileInfo, _SERVICE } from "../../../declarations/may16-galaxy-backend/may16-galaxy-backend.did.js"; const urlParams = new URLSearchParams(location.search);
const { CANISTER_ID_MAY16_GALAXY_BACKEND, DFX_NETWORK, REGISTER_TIMESTAMP } = Object.fromEntries(urlParams);
console.log('DFX_NETWORK', DFX_NETWORK)

console.log('self.location.hostname', self.location.hostname)
const isLocalhost = !!self.location.hostname.includes('localhost');

console.log('canister', REGISTER_TIMESTAMP); 

const agent = new HttpAgent({
  host: isLocalhost ? 'http://127.0.0.1:4943/' : undefined,
  verifyQuerySignatures: false,
});

export const backendActor: ActorSubclass<_SERVICE> = Actor.createActor(idlFactory, {
  agent,
  canisterId: CANISTER_ID_MAY16_GALAXY_BACKEND,
}) as ActorSubclass<_SERVICE>;

export const authorize = async () => {
  try {
    console.log('authorize', REGISTER_TIMESTAMP); 

    const authClient = await AuthClient.create({
      'idleOptions': {
        disableIdle: true,
      }
    });

    console.log('authClient', authClient);

    const identity = await authClient.getIdentity() as unknown as Identity;

    if (identity) {
      const actor = Actor.agentOf(backendActor);
      if (actor) {
       actor.replaceIdentity(identity) 
      }
    } else {
      console.error('NOT authorized', identity);
    }
  } catch (e) {
    console.error('authorize', e.toString());
  }
};
