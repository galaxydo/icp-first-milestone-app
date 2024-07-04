import { authorize, backendActor } from '@/sw/canister';
import state from '@/sw/state';

export async function GET() {
  await authorize();
  const principal = await backendActor.whoami();
  // state.principal = principal.toString();
  return <span>{principal.toString()}</span>;
}
