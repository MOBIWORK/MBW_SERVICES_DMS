/** @format */

import { Helmet } from "react-helmet-async";
// sections
import ReportAnalysis_KPI from "@/sections/ReportAnalysisKpi/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> ReportAnalysisKPI</title>
      </Helmet>

      <ReportAnalysis_KPI />
    </>
  );
}
