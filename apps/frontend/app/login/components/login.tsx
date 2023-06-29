import { post } from '@fc/api-types';
import { setUserCookie } from '@fc/cookies/server';
import { SubmitButton } from './submit-button';
import { redirect } from 'next/navigation';
import { zfd } from 'zod-form-data';
import { AuthenticateUserSchema } from '@fc/dto-schemas';

const formDataSchema = zfd.formData(AuthenticateUserSchema);

export const Login = () => {
  async function login(formData: FormData): Promise<void> {
    'use server';

    const body = formDataSchema.parse(formData);

    const user = await post('/api/user/login', {
      body,
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
