import { authorize, backendActor } from '@//canister';
import state from '@//state';

export async function GET() {
  await authorize();
  const principal = await backendActor.whoami();
  state.principal = principal.toString();

  return [
    <div className="flex flex-col items-start">
      <input type="hidden" id="principal" value={principal.toString()} />
      <input type="hidden" id="collection" value="personal" />
      <p className="text-sm/none">{principal.toString()}</p>
    </div>,
    { 'HX-Trigger': 'whoamiFetched' }
  ];
}
