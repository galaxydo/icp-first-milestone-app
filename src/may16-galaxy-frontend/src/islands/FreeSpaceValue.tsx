import { backendActor } from '@/sw/canister';
import state from '@/sw/state';

export async function GET() {
  const size = await backendActor.getMemorySize(); // minus max canister size

  // state.sizeInKb = (size / BigInt(1000)).toString();
  return <span>{Number(size)}</span>;
};

