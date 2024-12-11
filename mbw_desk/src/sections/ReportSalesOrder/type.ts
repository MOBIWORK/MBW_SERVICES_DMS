interface DataSaleOrder {
  key: React.Key;
  name: string;
  stt?: number;
  transaction_date: string;
  customer: string;
  territory: string;
  set_warehouse: string;
  employee: string;
  total: number; // thành tiền
  tax_amount: number; // tiền vat
  discount_amount: number; // chiết khấu
  grand_total: number; // tổng tiền
}

interface DataItem {
  item_name: string;
  item_code: string;
  brand: string;
  item_group: string;
  rate: number; // đơn giá
  qty: number;
  discount_percentage: number; // chiết khấu phần trăm
  discount_amount: number; // tiền triết khấu
  amount: number; // tổng tiền
}
