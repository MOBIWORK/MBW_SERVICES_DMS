import { Navigate, useRoutes } from 'react-router-dom';
import {dashboardRoutes} from './dashboard'
import { BASE_URL, paths } from '../path';
import path from 'path';
import RouterControl from '../../sections/RouterControl/view';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={paths.dashboard.root} replace />,
    },
    //dashboard router
    ...dashboardRoutes
])
}