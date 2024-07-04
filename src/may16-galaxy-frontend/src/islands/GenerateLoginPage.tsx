
import LoginPage from '@/pages/Login';
import { h } from 'preact';
import { render } from 'preact-render-to-string';

export async function GET() {
  const loginPage = render(<LoginPage />);
  return loginPage;
}
