import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const isOnline = app.middleware.isOnline

  router.post('/api/register', controller.user.register);
  router.post('/api/login', controller.user.login);

  router.delete('/api/logout', isOnline, controller.user.logout);
};
