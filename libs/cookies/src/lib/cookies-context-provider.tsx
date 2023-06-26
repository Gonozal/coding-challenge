'use client';

import { CookiesProvider } from 'react-cookie';
import { PropsWithChildren } from 'react';

export const CookiesContextProvider = ({ children }: PropsWithChildren) => {
  return <CookiesProvider>{children}</CookiesProvider>;
};
