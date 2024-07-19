import { backendActor } from '@/canister';
import state from '@/state';

export async function GET() {
  const size = await backendActor.getMemorySize(); // minus max canister size

  const sizeInKb = (size / BigInt(1000)).toString();

  return <span className="text-base font-medium text-primary">Used Memory <span className="font-bold">{Number(sizeInKb)}</span> Kb</span>
};

