/** @format */

import { Helmet } from "react-helmet-async";
// sections
import PromotionCreate from "@/sections/Promotion/PromotionCreate/PromotionCreate";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Chương trình khuyến mại</title>
      </Helmet>

      <PromotionCreate />
    </>
  );
}
