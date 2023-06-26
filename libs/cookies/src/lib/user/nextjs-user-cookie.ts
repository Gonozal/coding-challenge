import { cookies } from 'next/headers';
import { userCookieKey } from './key';

export const getUserCookie = () => {
  return cookies().get(userCookieKey)?.value;
};

export const setUserCookie = (userId: string | number) => {
  return cookies().set(userCookieKey, userId.toString());
};
