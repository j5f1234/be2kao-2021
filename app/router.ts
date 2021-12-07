import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const isOnline = app.middleware.isOnline
  const isAdmin = app.middleware.isAdmin 

  //user
  router.post('/api/register', controller.user.register);
  router.post('/api/login', controller.user.login);
  router.post('/api/course/select',isOnline, controller.course.courseChoose)

  router.get('/api/course', isOnline,controller.user.courseInfo)
  router.get('/api/schedule', isOnline,controller.course.scheduldInfo)

  router.delete('/api/logout', isOnline, controller.user.logout);
  router.delete('/api/course/delete/:id',isOnline, controller.course.courseDropOut)
  //admin
  router.post('/api/admin/addcourse',isOnline,isAdmin, controller.admin.addCourse)
  router.post('/api/admin/changeinfo',isOnline,isAdmin,controller.admin.changeCourseInfo)

  router.get('/api/admin/userlist',isOnline,isAdmin,controller.admin.userList)

  router.delete('/api/admin/delete/course/:id',isOnline,isAdmin, controller.admin.deleteCourse)

};
