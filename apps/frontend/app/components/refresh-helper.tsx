'use client';

import { useUserCookies } from '@fc/cookies';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// NextJS does not appear to automatically refresh server-component content changed by a mutation
// e.g. when a user logs in and the session is updated. Or I couldn't figure it out...
// In any case, this is a small client-side component that watches for changes in the user-id and
// triggers a refresh when it changes
export const RefreshHelper = () => {
  const { refresh } = useRouter();

  const [userId] = useUserCookies();

  useEffect(() => {
    refresh();
  }, [refresh, userId]);

  return null;
};
