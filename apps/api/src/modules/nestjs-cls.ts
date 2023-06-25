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
      if (!req.headers['x-user-id']) return;

      cls.set('userId', parseInt(req.headers['x-user-id']));
    },
  },
});

export interface MyClsStore extends ClsStore {
  userId?: number;
}
