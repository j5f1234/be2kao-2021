import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const isOnline = app.middleware.isOnline
  const isAdmin = app.middleware.isAdmin 

  //user
  router.post('/api/register', controller.user.register);
  router.post('/api/login', controller.user.login);

  router.delete('/api/logout', isOnline, controller.user.logout);
  
  //admin
  router.post('/api/admin/addcourse',isOnline,isAdmin, controller.admin.addcourse)

  router.delete('/api/admin/delete/course/:id',isOnline,isAdmin, controller.admin.deletecourse)

};
