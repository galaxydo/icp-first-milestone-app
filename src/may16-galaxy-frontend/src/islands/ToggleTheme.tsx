import state from '@/sw/state';

export async function GET() {
  state.isDarkTheme = !state.isDarkTheme;
  return <span>{state.isDarkTheme === true ? 'dark' : 'light'}</span>;
};
