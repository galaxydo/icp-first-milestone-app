import { backendActor } from '@/canister';
import state from '@/state';
import { h } from 'preact';
import { Progress } from '@/components/daisyui';

export async function GET() {
  const remaining = await backendActor.getCanisterBalance();
  const total = remaining + BigInt(1);

  // Convert cycles to XDR
  const remainingXDR = Number(remaining) / 1e12;
  const totalXDR = Number(total) / 1e12;

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium text-base-content/70">Canister Cycles (Remaining/Deposited)</span>
        <span className="text-sm font-medium text-base-content/70">{remainingXDR.toFixed(2)} XDR/{totalXDR.toFixed(2)} XDR</span>
      </div>
      <Progress max={totalXDR} value={remainingXDR} color={"primary"} className="h-1.5 bg-primary/20" />
    </div>
  );
}
