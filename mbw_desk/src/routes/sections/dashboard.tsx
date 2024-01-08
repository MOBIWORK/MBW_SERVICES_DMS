import { lazy } from "react";
import { ROOTS } from "../path";
import React from "react";
import { Outlet } from "react-router-dom";


const RouterControl = lazy(()=> import('../../pages/RouterControl'))

export const dashboardRoutes = [
    {
        path: '/',
        element: (
            <>
            Layout
            <Outlet/>
            </>
        ),
        children: [
            {
                index: true,element: <RouterControl/>
            },
            {
                path: 'router-control',element: <RouterControl/>
            }
        ]
    }
]