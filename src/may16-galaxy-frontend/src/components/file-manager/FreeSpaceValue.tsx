import { backendActor } from '@/sw/canister';
import state from '@/sw/state';

export default async function({ size }) {
  return <span>{Number(size)}</span>;
};
