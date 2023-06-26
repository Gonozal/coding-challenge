import { getUserId } from '@fc/cookies/server';

import { ClsModule, ClsStore } from 'nestjs-cls';

export const NestClsConfig = ClsModule.forRoot({
  global: true,
  middleware: {
    // automatically mount the
    // ClsMiddleware for all routes
    mount: true,
    // and use the setup method to
    // provide default store values.
    setup: (cls, req) => {
      const userId = getUserId(req);

      if (!userId) return;

      cls.set('userId', parseInt(userId, 10));
    },
  },
});

export interface MyClsStore extends ClsStore {
  userId?: number;
}
