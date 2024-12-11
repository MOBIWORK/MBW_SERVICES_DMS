/** @format */

import { Helmet } from "react-helmet-async";
import ReportVisitorSummary_KPI from "@/sections/ReportVisitorSummary_KPI/view";

export default function Page() {
  return (
    <>
      <Helmet>
        <title> ReportVisitorSummary_KPI</title>
      </Helmet>

      <ReportVisitorSummary_KPI />
    </>
  );
}
