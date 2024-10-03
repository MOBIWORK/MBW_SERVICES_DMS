/** @format */

import ReportProductionDayByDay from "@/sections/ReportProductionDayByDay/view";
import { Helmet } from "react-helmet-async";
// sections

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> ReportProductionDayByDay</title>
      </Helmet>

      <ReportProductionDayByDay />
    </>
  );
}
