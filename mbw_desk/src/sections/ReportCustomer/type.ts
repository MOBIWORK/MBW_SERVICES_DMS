interface DataCustomer {
  key: React.Key;
  stt?: string;
  customer_code: string;
  customer_name: string;
  customer_type: string;
  customer_address: string;
  name: string;
}

interface ExpandedDataType {
  key: React.Key;
  stt: string;
  item_code: string;
  item_name: string;
  exp_time: string;
  item_unit: string;
  quantity: string;
  total: string;
  update_at: string;
  update_byname: string;
  item_price: string;
  update_bycode: string;
}
