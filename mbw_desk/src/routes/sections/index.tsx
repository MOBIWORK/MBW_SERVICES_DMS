import { Navigate, useRoutes } from 'react-router-dom';
import {dashboardRoutes} from './dashboard'

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/#login',
      handle: window.location.reload()
    },
    //dashboard router
    ...dashboardRoutes
])
}
