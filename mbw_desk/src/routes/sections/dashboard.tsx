/** @format */

import { Suspense, lazy } from "react";
import { ROOTS } from "../path";
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "@/layouts/dashboard";
import { LoadingScreen } from "@/components";
import MonitorLayout from "../../layouts/monitor/layout";

const RouterControl = lazy(() => import("@/pages/RouterControl"));
const RouterCreate = lazy(() => import("@/pages/RouterCreate"));
const RouterDashboard = lazy(() => import("@/pages/RouterDashboard"));
const RouterDetail = lazy(() => import("@/pages/RouterDetail"));
const RouterEmployee = lazy(() => import("@/pages/RouterEmployee"));
const SettingDMS = lazy(() => import("@/pages/SettingDMS"));
const MonitorAlbum = lazy(() => import("@/pages/MonitorAlbum"));
const Progress = lazy(() => import("@/pages/Progress"));
const ReportCustomer = lazy(() => import("@/pages/ReportCustomer"));
const EmployeeMonitor = lazy(() => import("@/pages/EmployeeMonitor"));
const EmployeeMonitorDetailPage = lazy(
  () => import("@/pages/EmployeeMonitorDetail")
);
const ReportKPI = lazy(() => import("@/pages/ReportKPI"));
const ReportSales = lazy(() => import("@/pages/ReportSales"));
const ReportSalesOrder = lazy(() => import("@/pages/ReportSalesOrder"));
const ReportDebt = lazy(() => import("@/pages/ReportDebt"));
const ReportCheckin = lazy(() => import("@/pages/ReportCheckin"));
const ReportCustomNew = lazy(() => import("@/pages/ReportCustomNew"));
const ReportCheckinFirst = lazy(() => import("@/pages/ReportCheckinFirst"));
const EmployeeMonitorKPI = lazy(() => import("@/pages/EmployeeMonitorKPI"));
const ReportDistance = lazy(() => import("@/pages/ReportDistance"));
const CustomersMap = lazy(() => import("@/pages/CustomersMap"));

const ReportAnalysis_KPI = lazy(() => import("@/pages/ReportAnalysis_KPI"));
const ReportVisitorSummary_KPI = lazy(
  () => import("@/pages/ReportVisitorSummary_KPI")
);
const ReportProductionDayByDay = lazy(
  () => import("@/pages/ReportProductionDayByDay")
);
const Promotion = lazy(() => import("@/pages/Promotion"));
const PromotionCreate = lazy(() => import("@/pages/PromotionCreate"));
export const dashboardRoutes = [
  {
    path: "/",
    element: (
      <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <RouterDashboard />,
      },
      {
        path: "promotion",
        element: <Promotion />,
      },
      {
        path: "promotion/:type",
        element: <PromotionCreate />,
      },
      {
        path: "router-control",
        element: <RouterControl />,
      },
      {
        path: "router-employee",
        element: <RouterEmployee />,
      },
      {
        path: "dms-router/:type",
        element: <RouterCreate />,
      },
      {
        path: "router-detail/:id",
        element: <Progress />,
      },
      {
        path: "setting-dms",
        element: <SettingDMS />,
      },
      {
        path: "monitor-album",
        element: <MonitorAlbum />,
      },
      {
        path: "report-customer",
        element: <ReportCustomer />,
      },
      {
        path: "employee-monitor",
        element: <EmployeeMonitor />,
      },
      {
        path: "report-kpi",
        element: <ReportKPI />,
      },
      {
        path: "report-sales",
        element: <ReportSales />,
      },
      {
        path: "report-sales",
        element: <ReportSales />,
      },
      {
        path: "report-saleorder",
        element: <ReportSalesOrder />,
      },
      {
        path: "report-debt",
        element: <ReportDebt />,
      },
      {
        path: "report-checkin",
        element: <ReportCheckin />,
      },
      {
        path: "report-custom-new",
        element: <ReportCustomNew />,
      },
      {
        path: "report-checkin-first",
        element: <ReportCheckinFirst />,
      },
      {
        path: "employee-monitor-kpi",
        element: <EmployeeMonitorKPI />,
      },
      {
        path: "report-distance",
        element: <ReportDistance />,
      },
      {
        path: "customers-map",
        element: <CustomersMap />,
      },
      {
        path: "employee-monitor-detail/:employee_id",
        element: <EmployeeMonitorDetailPage />,
      },
      {
        path: "employee-monitor-detail",
        element: <EmployeeMonitorDetailPage />,
      },
      {
        path: "report-visitor_kpi",
        element: <ReportVisitorSummary_KPI />,
      },
      {
        path: "report-analysis-kpi",
        element: <ReportAnalysis_KPI />,
      },
      {
        path: "report-prod-daybyday",
        element: <ReportProductionDayByDay />,
      },
    ],
  },
];
