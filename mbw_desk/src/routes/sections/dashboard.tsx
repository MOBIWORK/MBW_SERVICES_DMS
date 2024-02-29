import { Suspense, lazy } from "react";
import { ROOTS } from "../path";
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from '@/layouts/dashboard'
import {LoadingScreen} from '@/components'


const RouterControl = lazy(()=> import('@/pages/RouterControl'))
const RouterCreate = lazy(()=> import('@/pages/RouterCreate'))
const RouterDashboard = lazy(()=> import('@/pages/RouterDashboard'))
const RouterDetail = lazy(()=> import('@/pages/RouterDetail'))
const RouterEmployee = lazy(()=> import('@/pages/RouterEmployee'))
const SettingDMS = lazy(()=> import('@/pages/SettingDMS'))
const MonitorAlbum = lazy(()=> import('@/pages/MonitorAlbum'))
const Progress = lazy(()=> import('@/pages/Progress'))
const ReportCustomer = lazy(()=> import('@/pages/ReportCustomer'))
export const dashboardRoutes = [
    {
        path: '/',
        element: (
            <DashboardLayout>            
                <Suspense fallback={<LoadingScreen/>}>
                    <Outlet/>
                </Suspense>
            </DashboardLayout>
        ),
        children: [
            {
                index: true,element: <Progress/>
            },
            {
                path: 'router-control',element: <RouterControl/>
            },
            {
                path: 'router-employee ',element: <Progress/>
            },
            {
                path: 'dms-router/:type',element: <RouterCreate/>
            },
            {
                path: 'router-detail/:id',element: <Progress/>
            },
            {
                path: 'setting-dms',element: <SettingDMS/>
            },
            {
                path: 'monitor-album',element: <MonitorAlbum/>
            },
            {
                path: 'report-customer',element: <ReportCustomer/>
            },
        ]
    }
]