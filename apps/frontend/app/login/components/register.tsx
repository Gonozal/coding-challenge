import { post } from '@fc/api-types';
import { setUserCookie } from '@fc/cookies/server';
import { SubmitButton } from './submit-button';
import { redirect } from 'next/navigation';
import { zfd } from 'zod-form-data';
import { CreateUserSchema } from '@fc/dto-schemas';

const formDataSchema = zfd.formData(CreateUserSchema);

export const Register = () => {
  async function register(formData: FormData): Promise<void> {
    'use server';

    const body = formDataSchema.parse(formData);

    const user = await post('/api/user', { body });

    if (user.data) {
      setUserCookie(user.data?.id);
      redirect('/');
    }
  }

  return (
    <form action={register}>
      <input name="email" />
      <SubmitButton label={'Register'} />
    </form>
  );
};
