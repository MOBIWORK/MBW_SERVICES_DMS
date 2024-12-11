
  export interface ResultType {
    doanh_so: number
    tang_vs_hqua: number
    so_san_pham: number
    bieu_do_doanh_so: BieuDoDoanhSo[]
    so_nguoi_mua: number
    ds_sp_doanh_so_cao: DsSpDoanhSoCao[]
    don_hang: number
    luot_vt: number
    ti_le_chuyen_doi: number
    so_nv_online: number
  }
  
  export interface BieuDoDoanhSo {
    doanh_so: number
    thoi_gian: string
  }
  
  export interface DsSpDoanhSoCao {
    ten_sp: string
    doanh_so: number,
    image?:string
  }
  

  export type functionType = (...args: any[]) => any;