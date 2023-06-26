import { userCookieKey } from './key';

export interface Request {
  headers?: Record<string, string> | null;
  cookies?: Record<string, string> | null;
}

export const getUserId = (request: Request): string | undefined => {
  const userIdFromHeader = request.headers?.[userCookieKey];
  const userIdFromCookies = request.cookies?.[userCookieKey];

  return userIdFromHeader ?? userIdFromCookies;
};
