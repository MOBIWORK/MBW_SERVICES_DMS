interface DataTypeCustomNew {
  key: React.Key;
  name: string;
  stt?: number;
  department: string;
  employee_id: string;
  employee_name: string;
  customer_code: string;
  customer_name: string;
  customer_type: string; //loại khách hàng
  customer_group: string; //nhóm khách hàng
  contact: string;
  phone: string;
  tax_id: string;
  territory: string;
  address: string;
  creation: string;
  totals_checkin: number; //số lần vt
  first_checkin: string;
  last_checkin: string;
  totals_so: number;
  last_sale_order: string; // đơn hàng cuối
  data: any;
}
