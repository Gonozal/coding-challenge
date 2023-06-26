'use-client';

import { useCookies } from 'react-cookie';
import { userCookieKey } from './key';

export const useUserCookies = () => {
  return useCookies([userCookieKey]);
};
