import { Login } from './components/login';
import { Register } from './components/register';

export const metadata = {
  title: 'Coding Challenge | Login',
};

export default async function LoginPage() {
  return (
    <>
      <Login />
      <Register />
    </>
  );
}
