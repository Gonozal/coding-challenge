import { Suspense } from 'react';
import { get } from '@fc/api-types';
import Link from 'next/link';
import { getUserCookie } from '@fc/cookies/server';

export const CurrentUser = () => {
  return (
    <Suspense fallback={<AccountFallback />}>
      <AccountImplementation />
    </Suspense>
  );
};

const AccountFallback = () => {
  return <span>Loading...</span>;
};

const AccountImplementation = async () => {
  const userId = getUserCookie();
  if (!userId) return <Link href="/login">Log in</Link>;

  const user = await get('/api/user/me', {
    headers: { 'x-user-id': userId },
    next: { tags: ['currentUser'], revalidate: 0 },
  });

  if (user.data) {
    return <div>Hello, {user.data.email}</div>;
  }

  return <Link href="/login">Log in</Link>;
};
