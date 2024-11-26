/** @format */

export const mediaQuery = "(max-width: 1062px)";
export const mediaQueryReportDayByDay = "(min-width: 1200px)";

export const monthAll = [
  {
    label: "Tháng 1",
    value: "1",
  },
  {
    label: "Tháng 2",
    value: "2",
  },
  {
    label: "Tháng 3",
    value: "3",
  },
  {
    label: "Tháng 4",
    value: "4",
  },
  {
    label: "Tháng 5",
    value: "5",
  },
  {
    label: "Tháng 6",
    value: "6",
  },
  {
    label: "Tháng 7",
    value: "7",
  },
  {
    label: "Tháng 8",
    value: "8",
  },
  {
    label: "Tháng 9",
    value: "9",
  },
  {
    label: "Tháng 10",
    value: "10",
  },
  {
    label: "Tháng 11",
    value: "11",
  },
  {
    label: "Tháng 12",
    value: "12",
  },
];

export const PAGE_SIZE = 20;

export const APPEN_TO_APP = [
  { label: "MBW.DMS", value: "mbw_dms" },
  { label: "MBW.Retail", value: "mbw_retail" },
];

export const PROMOTION_TYPE = [
  { label: "Mua một sản phẩm", value: "0" },
  { label: "Mua nhiều sản phẩm", value: "1" },
  // { label: "Mua nhóm sản phẩm", value: "2" },
];

export const PROMOTION_ONE = [
  {
    value: "SP_SL_CKSP",
    label: "Mua sản phẩm - đạt số lượng - chiết khấu SP (%)",
  },
  { value: "SP_SL_SP", label: "Mua sản phẩm - đạt số lượng - tặng sản phẩm" },
  { value: "SP_SL_TIEN", label: "Mua sản phẩm - đạt số lượng - tặng tiền" },
  {
    value: "SP_ST_CKSP",
    label: "Mua sản phẩm - đạt số tiền - chiết khấu SP (%)",
  },
  { value: "SP_ST_SP", label: "Mua sản phẩm - đạt số tiền - tặng sản phẩm" },
  { value: "SP_ST_TIEN", label: "Mua sản phẩm - đạt số tiền - tặng tiền" },
  { value: "TIEN_CKDH", label: "Tổng tiền hàng - chiết khấu đơn hàng (%)" },
  { value: "TIEN_SP", label: "Tổng tiền hàng - tặng sản phẩm" },
  { value: "TIEN_TIEN", label: "Tổng tiền hàng - tặng tiền" },
];
export const PROMOTION_MULTI = [
  {
    value: "MUTI_SP_ST_SP",
    label: "Mua nhiều sản phẩm - đạt số tiền - tặng một hoặc nhiều sản phẩm",
  },
  {
    value: "MUTI_SP_ST_CKSP",
    label: "Mua nhiều sản phẩm - đạt số tiền - chiết khấu SP (%)",
  },
  {
    value: "MUTI_SP_ST_TIEN",
    label: "Mua nhiều sản phẩm - đạt số tiền - tặng tiền",
  },
  {
    value: "MUTI_SP_SL_SP",
    label: "Mua nhiều sản phẩm - đạt số lượng - tặng một hoặc nhiều sản phẩm",
  },
  {
    value: "MUTI_SP_SL_CKSP",
    label: "Mua nhiều sản phẩm - đạt số lượng - chiết khấu SP (%)",
  },
  {
    value: "MUTI_SP_SL_TIEN",
    label: "Mua nhiều sản phẩm - đạt số lượng - tặng tiền",
  },
  {
    value: "MUTI_TIEN_SP",
    label: "Tổng tiền hàng - tặng một hoặc nhiều sản phẩm",
  },
  {
    value: "MUTI_TIEN_CKDH",
    label: "Tổng tiền hàng - chiết khấu đơn hàng (%)(Loại mua nhiều sản phẩm)",
  },
  {
    value: "MUTI_TIEN_TIEN",
    label: "Tổng tiền hàng - tặng tiền(Loại mua nhiều sản phẩm)",
  },
];

export const SHOWMUTIPLE = [
  "SP_SL_SP",
  "SP_SL_TIEN",
  "SP_ST_SP",
  "SP_ST_TIEN",
  "TIEN_SP",
  "TIEN_TIEN",
  "MUTI_SP_ST_SP",
  "MUTI_SP_ST_TIEN",
  "MUTI_SP_SL_SP",
  "MUTI_SP_SL_TIEN",
  "MUTI_TIEN_SP",
  "MUTI_TIEN_TIEN",
];

export const PROMOTION_PRIORITY = [
  { label: "Cao", value: "0" },
  { label: "Bình thường", value: "1" },
  { label: "Thấp", value: "2" },
];

export const PROMOTION_STATUS = [
  { label: "Hoạt động", value: "Hoạt động" },
  { label: "Chờ duyệt", value: "Chờ duyệt" },
  { label: "Chạy thử", value: "Chạy thử" },
  { label: "Khóa", value: "Khóa" },
];

export const CTKM_MULTI = [
  "MUTI_SP_ST_SP",
  "MUTI_SP_ST_CKSP",
  "MUTI_SP_ST_TIEN",
  "MUTI_SP_SL_SP",
  "MUTI_SP_SL_CKSP",
  "MUTI_SP_SL_TIEN",
  "MUTI_TIEN_SP",
  "MUTI_TIEN_CKDH",
  "MUTI_TIEN_TIEN",
];
export const CTKM_SINGLE = [
  "SP_SL_CKSP",
  "SP_SL_SP",
  "SP_SL_TIEN",
  "SP_ST_CKSP",
  "SP_ST_SP",
  "SP_ST_TIEN",
  "TIEN_CKDH",
  "TIEN_SP",
  "TIEN_TIEN",
];
