import { post } from '@fc/api-types';
import { setUserCookie } from '@fc/cookies/server';
import { SubmitButton } from './submit-button';
import { redirect } from 'next/navigation';

export const Login = () => {
  async function login(formData: FormData): Promise<void> {
    'use server';

    const email = formData.get('email')?.toString() || '';

    const user = await post('/api/user/login', {
      body: { email },
    });

    if (user.data) {
      setUserCookie(user.data?.id);
      redirect('/');
    }
  }

  return (
    <form action={login}>
      <input name="email" />
      <SubmitButton label={'Login'} />
    </form>
  );
};
