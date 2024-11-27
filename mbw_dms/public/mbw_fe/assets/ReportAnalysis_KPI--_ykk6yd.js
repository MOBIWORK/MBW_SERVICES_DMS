import{Y as s,a2 as H,L as t,R as k,P as w,ac as I,ae as K}from"./index-o85vnTJF.js";import"https://cdn.jsdelivr.net/npm/nats.ws@1.29.2/+esm";import{C as L}from"./index-JgNcZNsL.js";import{u as b}from"./index-3JjCl_zE.js";import{a as R,m as U,u as N,P as c}from"./useMediaQuery-q_iAER93.js";import{D as P}from"./dropDownFilter-9d-yDTQQ.js";import{R as C,F as E}from"./ReportHeader-hhHMXqoE.js";import"./index.esm-LIvd7GLf.js";import"./data-u-VkVTNg.js";import"./index-Nws9UTPm.js";import"./VerticalAlignBottomOutlined--5Aiz4qV.js";const{Column:a,ColumnGroup:l}=I,D=()=>{const[h,r]=s.useState(1),[x,S]=s.useState([]),[i,v]=s.useState(0),F=b(),[T,f]=s.useState(!1),d=R(`${U}`),{currentMonth:o,currentYear:_}=N(e=>e.month),{sales_team:m,employee:u,customer_type:g,customer_group:p,territory:j}=N(e=>e.group);return s.useEffect(()=>{(async()=>{const e=await H.get("/api/method/mbw_dms.api.report.kpi.analisis_kpi",{params:{page_size:c,page_number:h,month:o,year:_,sales_team:m,employee:u,customer_group:p,customer_type:g,territory:j}});S(e?.result),v(e?.result?.totals)})()},[o,_,m,u,h,T,p,g,j]),t.jsx(t.Fragment,{children:t.jsx(L,{header:t.jsx(C,{setRefresh:f,title:"Báo cáo tổng hợp phân tích KPI",params:{report_type:"Report Analysis KPI",data_filter:{month:o,year:_}},file_name:"Report Analysis KPI.xlsx"}),children:t.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[t.jsxs(k,{gutter:[16,16],className:`pr-4 items-center ${d?"justify-end":"justify-between"} `,children:[!d&&t.jsx(w,{className:"ml-4 w-[78%] ",children:t.jsx(k,{className:"space-x-4",children:t.jsx(E,{setPage:r,inputMonth:!0,inputYear:!0,inputSaleGroup:!0,inputEmployee:!0})})}),t.jsx(w,{className:"!ml-4",children:t.jsx(P,{inputCustomerType:!0,inputCustomerGroup:!0,inputTerritory:!0,inputMonth:!0,inputYear:!0,inputSaleGroup:!0,inputEmployee:!0,setPage:r,matchMedia:!d})})]}),t.jsx("div",{className:"mt-5 ",children:t.jsxs(I,{dataSource:x?.data?.map(e=>({key:e.nhom_ban_hang,...e})),bordered:!0,scroll:{x:"max-content",y:x?.data?.length>0?F?.h*.55:void 0},pagination:i&&i>c?{pageSize:c,showSizeChanger:!1,total:i,current:h,onChange(e){r(e)}}:!1,children:[t.jsx(a,{title:"STT",dataIndex:"stt",fixed:"left",width:60,render:(e,n,y)=>n.ten_nv==null?y+1:""},"stt"),t.jsx(a,{title:()=>t.jsx("p",{className:"whitespace-pre-line text-clip text-center",children:"Nhóm bán hàng/ Nhân viên"}),dataIndex:"nhom_ban_hang",fixed:"left",width:140,render:(e,n)=>t.jsx(t.Fragment,{children:e??n.ten_nv})},"nhom_ban_hang"),t.jsxs(l,{title:"Số lượt viếng thăm",children:[t.jsx(a,{className:"!text-center",title:"KH",width:70,dataIndex:"total_kh_vt",render:(e,n)=>t.jsx(t.Fragment,{children:e??n.kh_vt})},"total_kh_vt"),t.jsx(a,{className:"!text-center ",title:"TH",width:70,dataIndex:"total_th_vt",render:(e,n)=>t.jsx(t.Fragment,{children:e??(n.kpi_month.length==0?0:n.kpi_month.th_vt)})},"total_th_vt"),t.jsx(a,{className:"!text-center",title:"TL",width:70,dataIndex:"total_tl_vt",render:(e,n)=>t.jsxs(t.Fragment,{children:[e??n.tl_vt,"%"]})},"total_tl_vt")]}),t.jsxs(l,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng viếng thăm duy nhất",children:[t.jsx(a,{className:"!text-center",title:"KH",width:120,dataIndex:"total_kh_vt_dn",render:(e,n)=>t.jsx(t.Fragment,{children:e??n.kh_vt_dn})},"total_kh_vt_dn"),t.jsx(a,{className:"!text-center ",title:"TH",width:70,dataIndex:"total_th_vt_dn",render:(e,n)=>t.jsx(t.Fragment,{children:e??(n.kpi_month.length==0?0:n.kpi_month.th_vt_dn)})},"total_th_vt_dn"),t.jsx(a,{className:"!text-center",title:"TL",width:70,dataIndex:"total_tl_vt_dn",render:(e,n)=>t.jsxs(t.Fragment,{children:[e??n.tl_vt_dn,"%"]})},"total_tl_vt_dn")]}),t.jsxs(l,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số đơn hàng",children:[t.jsx(a,{className:"!text-center",title:"KH",width:70,dataIndex:"total_kh_don_hang",render:(e,n)=>t.jsx(t.Fragment,{children:e??n.kh_don_hang})},"total_kh_don_hang"),t.jsx(a,{className:"!text-center ",title:"TH",width:70,dataIndex:"total_th_don_hang",render:(e,n)=>t.jsx(t.Fragment,{children:e??(n.kpi_month.length==0?0:n.kpi_month.th_don_hang)})},"total_th_don_hang"),t.jsx(a,{className:"!text-center",title:"TL",width:70,dataIndex:"total_tl_don_hang",render:(e,n)=>t.jsxs(t.Fragment,{children:[e??n.tl_don_hang,"%"]})},"total_tl_don_hang")]}),t.jsxs(l,{className:"!whitespace-normal",title:"Doanh số (VNĐ)",width:210,children:[t.jsx(a,{className:"!text-center",title:"KH",dataIndex:"total_kh_doanh_so",render:(e,n)=>t.jsx(t.Fragment,{children:e!=null?e.toLocaleString("en-US"):n.kh_doanh_so.toLocaleString("en-US")})},"total_kh_doanh_so"),t.jsx(a,{className:"!text-center",title:"TH",width:70,dataIndex:"total_th_doanh_so",render:(e,n)=>t.jsx(t.Fragment,{children:e??(n.kpi_month.length==0?0:n.kpi_month.th_doanh_so)})},"total_th_doanh_so"),t.jsx(a,{className:"!text-center",title:"TL",width:70,dataIndex:"total_tl_doanh_so",render:(e,n)=>t.jsxs(t.Fragment,{children:[e??n.tl_doanh_so,"%"]})},"total_tl_doanh_so")]}),t.jsxs(l,{className:"!whitespace-normal",title:"Doanh thu (VNĐ)",width:210,children:[t.jsx(a,{className:"!text-center",title:"KH",width:70,dataIndex:"total_kh_doanh_thu",render:(e,n)=>t.jsx(t.Fragment,{children:e!=null?e.toLocaleString("en-US"):n.kh_doanh_thu.toLocaleString("en-US")})},"total_kh_doanh_thu"),t.jsx(a,{className:"!text-center ",title:"TH",width:70,dataIndex:"total_th_doanh_thu",render:(e,n)=>t.jsx(t.Fragment,{children:e??(n.kpi_month.length==0?0:n.kpi_month.th_doanh_thu)})},"total_th_doanh_thu"),t.jsx(a,{className:"!text-center",title:"TL",width:70,dataIndex:"total_tl_doanh_thu",render:(e,n)=>t.jsxs(t.Fragment,{children:[e??n.tl_doanh_thu,"%"]})},"total_tl_doanh_thu")]}),t.jsxs(l,{className:"!whitespace-normal",title:"Sản lượng",width:210,children:[t.jsx(a,{className:"!text-center",title:"KH",width:70,dataIndex:"total_kh_san_lg",render:(e,n)=>t.jsx(t.Fragment,{children:e!=null?e.toLocaleString("en-US"):n.kh_san_lg.toLocaleString("en-US")})},"total_kh_san_lg"),t.jsx(a,{className:"!text-center ",title:"TH",width:70,dataIndex:"total_th_san_lg",render:(e,n)=>t.jsx(t.Fragment,{children:e??(n.kpi_month.length==0?0:n.kpi_month.th_san_lg)})},"total_th_san_lg"),t.jsx(a,{className:"!text-center",title:"TL",width:70,dataIndex:"total_tl_san_lg",render:(e,n)=>t.jsxs(t.Fragment,{children:[e??n.tl_san_luong,"%"]})},"total_tl_san_lg")]}),t.jsxs(l,{className:"!whitespace-normal",title:"SKU",width:210,children:[t.jsx(a,{className:"!text-center",title:"KH",width:70,dataIndex:"total_kh_sku",render:(e,n)=>t.jsx(t.Fragment,{children:e!=null?e.toLocaleString("en-US"):n.kh_sku.toLocaleString("en-US")})},"total_kh_sku"),t.jsx(a,{className:"!text-center ",title:"TH",width:70,dataIndex:"total_th_sku",render:(e,n)=>t.jsx(t.Fragment,{children:e??(n.kpi_month.length==0?0:n.kpi_month.th_sku)})},"total_th_sku"),t.jsx(a,{className:"!text-center",title:"TL",width:70,dataIndex:"total_tl_sku",render:(e,n)=>t.jsxs(t.Fragment,{children:[e??n.tl_sku,"%"]})},"total_tl_sku")]}),t.jsx(a,{title:()=>t.jsx("div",{className:"whitespace-pre-line text-clip text-center",children:"Tỷ lệ đơn hàng thành công/số lần viếng thăm (%)"}),dataIndex:"total_tl_donhang_thanhcong",width:120,className:"!text-center",render:(e,n)=>t.jsxs("div",{className:"!min-w-[100px] ",children:[e??n.tl_donhang_thanhcong,"%"]})},"total_tl_donhang_thanhcong"),t.jsx(a,{title:()=>t.jsx("div",{className:"whitespace-pre-line text-clip text-center",children:"Tỷ lệ SKU thành công so tổng SKU (%)"}),className:"!text-center !whitespace-normal",width:120,dataIndex:"total_tl_sku_thanhcong",render:(e,n)=>t.jsxs(t.Fragment,{children:[e??n.tl_sku_thanhcong,"%"]})},"total_tl_sku_thanhcong"),t.jsx(a,{title:()=>t.jsx("div",{className:"whitespace-pre-line text-clip text-center",children:"Tổng khách hàng (MCP)"}),width:100,className:"!text-center !whitespace-normal",dataIndex:"total_tong_khach_hang",render:(e,n)=>t.jsx("div",{className:"!min-w-[100px] ",children:e??n.tong_khach_hang})},"total_tong_khach_hang"),t.jsx(a,{title:()=>t.jsx("p",{className:"whitespace-pre-line text-clip text-center",children:"Số KH viếng thăm"}),className:"text-center",width:120,dataIndex:"total_khach_hang_vt",render:(e,n)=>t.jsx(t.Fragment,{children:e??n.khach_hang_vt})},"total_khach_hang_vt"),t.jsxs(l,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng đặt hàng",children:[t.jsx(a,{className:"!text-center",title:"KH",dataIndex:"total_kh_dat_hang",render:(e,n)=>t.jsx(t.Fragment,{children:e??n.kh_dat_hang})},"total_kh_dat_hang"),t.jsx(a,{className:"!text-center ",title:"TH",width:70,dataIndex:"total_th_dat_hang",render:(e,n)=>t.jsx(t.Fragment,{children:e??(n.kpi_month.length==0?0:n.kpi_month.th_dat_hang)})},"total_th_dat_hang"),t.jsx(a,{className:"!text-center",title:"TL",width:70,dataIndex:"total_tl_dat_hang",render:(e,n)=>t.jsxs(t.Fragment,{children:[e??n.tl_dat_hang,"%"]})},"total_tl_dat_hang")]}),t.jsx(a,{title:()=>t.jsx("div",{className:"whitespace-pre-line text-clip text-center",children:"Bình quân SKU/KH"}),dataIndex:"total_sku_kh",render:(e,n)=>t.jsx("p",{className:"!min-w-[100px] text-center",children:e??n.sku_kh})},"total_sku_kh"),t.jsx(a,{title:()=>t.jsx("p",{className:"whitespace-pre-line text-clip text-center",children:"Bình quân SKU/đơn"}),dataIndex:"total_sku_dh",render:(e,n)=>t.jsx("p",{className:"!min-w-[100px] text-center",children:e??n.sku_dh})},"total_sku_dh"),t.jsxs(l,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng thêm mới",children:[t.jsx(a,{className:"!text-center",title:"KH",width:70,dataIndex:"total_kh_kh_moi",render:(e,n)=>t.jsx(t.Fragment,{children:e??n.kh_kh_moi})},"total_kh_kh_moi"),t.jsx(a,{className:"!text-center ",title:"TH",width:70,dataIndex:"total_th_kh_moi",render:(e,n)=>t.jsx(t.Fragment,{children:e??(n.kpi_month.length==0?0:n.kpi_month.th_kh_moi)})},"total_th_kh_moi"),t.jsx(a,{className:"!text-center",title:"TL",width:70,dataIndex:"total_th_kh_moi",render:(e,n)=>t.jsxs(t.Fragment,{children:[e??n.tl_kh_moi,"%"]})},"total_th_kh_moi")]})]})})]})})})},A=D;function O(){return t.jsxs(t.Fragment,{children:[t.jsx(K,{children:t.jsx("title",{children:" ReportAnalysisKPI"})}),t.jsx(A,{})]})}export{O as default};
