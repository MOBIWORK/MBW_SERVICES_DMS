/** @format */

import { Helmet } from "react-helmet-async";
import Promotion from "@/sections/Promotion/view";
export default function Page() {
  return (
    <>
      <Helmet>
        <title> Chương trình khuyến mại</title>
      </Helmet>
      <Promotion />
    </>
  );
}
