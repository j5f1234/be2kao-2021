// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportIsAdmin from '../../../app/middleware/isAdmin';
import ExportIsOnline from '../../../app/middleware/isOnline';

declare module 'egg' {
  interface IMiddleware {
    isAdmin: typeof ExportIsAdmin;
    isOnline: typeof ExportIsOnline;
  }
}
