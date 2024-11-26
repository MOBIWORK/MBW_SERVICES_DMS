/** @format */

interface Product {
  id: string;
  name: string;
  code_name: string;
  quantity: number;
  unit: string;
}

// interface RowData {
//   id: string;
//   productCode: string;
//   productName: string;
//   unit: string;
//   quantity: number;
//   promotions: Product[];
// }

export interface RowData {
  name: string;
  item_code: string;
  item_name: string;
  item_group: string;
  stock_uom: string;
  min_order_qty: number;
  description: string;
  brand: string;
  country_of_origin: any;
  image: any;
  custom_industry: any;
  end_of_life: string;
  custom_images_item: any[];
  barcodes: string;
  barcode_type: string;
  total_projected_qty: number;
  details: Detail[];
  unit: Unit[];
  stock: any[];
  item_tax_template: ItemTaxTemplate[];
  rate_tax_item: number;
  so_luong: number;
  yeu_cau?: number;
  qty_min: number;
  khuyen_mai: Promotion[];
  san_pham_mua?: [];
  san_pham_khuyen_mai?: [];
}

export interface Detail {
  price_list_rate: number;
}

export interface Unit {
  uom: string;
  conversion_factor: number;
}

export interface ItemTaxTemplate {
  item_tax_template: string;
}

export interface Promotion {
  name: string;
  item_name: string;
  item_code: string;
  so_luong: number;
  unit: Unit2[];
  stock_uom: string | undefined;
}

export interface Unit2 {
  uom: string;
  conversion_factor: number;
}
