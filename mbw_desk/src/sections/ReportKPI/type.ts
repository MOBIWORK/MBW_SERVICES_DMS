interface DataTypeKPI {
  key: React.Key;
  name: string;
  stt: number;
  employee_code: string;
  employee_name: string;
  department: string;
  khvisiting: number;
  thvisiting: number;
  tlvisiting: number;
  khvisitingfirst: number;
  thvisitingfirst: number;
  tlvisitingfirst: number;
  khvisitingcustomerorder: number;
  thvisitingcustomerorder: number;
  tlvisitingcustomerorder: number;
  khvisitingnew: number;
  thvisitingnew: number;
  tlvisitingnew: number;
  khvisitingorder: number;
  thvisitingorder: number;
  tlvisitingorder: number;
  khvisitingsale: number;
  thvisitingsale: number;
  tlvisitingsale: number;
  khvisitingRevenue: number;
  thvisitingRevenue: number;
  tlvisitingRevenue: number;
  khvisitingQuantity: number;
  thvisitingQuantity: number;
  tlvisitingQuantity: number;
  khvisitingSKU: number;
  thvisitingSKU: number;
  tlvisitingSKU: number;
  khvisitingwork: number;
  thvisitingwork: number;
  tlvisitingwork: number;
}

interface DataItem {
  name: string;
  kh_ma: string;
  kh_ten: string;
  kh_diachi: string;
  checkin_giovao: string;
  checkin_khoangcach: number;
  rowSpan?: number; // Optional vì chỉ thêm trong quá trình xử lý
  groupIndex?: number; // Optional vì chỉ thêm trong quá trình xử lý
}
