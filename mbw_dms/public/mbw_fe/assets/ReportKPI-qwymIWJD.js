import{L as r,a5 as c,P as e,a6 as R,Q as V,R as x,a8 as w,Y as o,a9 as v,bw as n,ab as Y}from"./index-JEQ7519Z.js";import{C as A}from"./index-sWzJpW9Y.js";import{u as z}from"./useDebount-bMapAt9W.js";import{t as O,a as B}from"./index-eKTHIBPm.js";import{D as G}from"./index-ubqCdk63.js";import{T as M}from"./index-AY0H84sh.js";import{V as U}from"./VerticalAlignBottomOutlined-t6sY1Ojb.js";const Q=[{label:"Tháng 1",value:"1"},{label:"Tháng 2",value:"2"},{label:"Tháng 3",value:"3"},{label:"Tháng 4",value:"4"},{label:"Tháng 5",value:"5"},{label:"Tháng 6",value:"6"},{label:"Tháng 7",value:"7"},{label:"Tháng 8",value:"8"},{label:"Tháng 9",value:"9"},{label:"Tháng 10",value:"10"},{label:"Tháng 11",value:"11"},{label:"Tháng 12",value:"12"}],{Column:s,ColumnGroup:d}=v,W=o().month()+1,y=W.toString(),X=o().format("YYYY");function Z(){const[k,F]=r.useState([]),[b,C]=r.useState([]),[i,I]=r.useState(),[T,f]=r.useState(""),[_,u]=r.useState();let g=z(T);const[j,H]=r.useState(1),N=20,[l,K]=r.useState([]),[p,E]=r.useState(y),[h,S]=r.useState(""),[L,D]=r.useState(0),P=a=>{S(a?.$y.toString())};return r.useEffect(()=>{(async()=>{let a=await c.get("/api/method/mbw_dms.api.router.get_team_sale");C(O({data:a.result.map(t=>({title:t.name,value:t.name,...t})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),r.useEffect(()=>{(async()=>{let a=await c.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:i,key_search:g}}),{message:t}=a;F(t.map(m=>({value:m.employee_code,label:m.employee_name||m.employee_code})))})()},[i,g]),r.useEffect(()=>{(h===void 0||h==="")&&S(X),(async()=>{const a=await c.get("/api/method/mbw_dms.api.report.kpi.kpi_report",{params:{page_size:N,page_number:j,month:p,year:h,sales_team:i,employee:_}});K(a?.result),D(a?.result?.totals)})()},[p,h,i,_,j]),e.jsx(e.Fragment,{children:e.jsx(A,{header:e.jsx(R,{title:"Báo cáo KPI",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(U,{className:"text-xl"}),size:"20px",className:"flex items-center",action:()=>{B("/app/data-export/Data%20Export")}}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(V,{layout:"vertical",className:"flex justify-start items-center px-4",children:[e.jsx(x,{label:"Tháng",className:"border-none mr-2 w-[200px]",children:e.jsx(w,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8] !h-7 rounded-lg mt-[-2px]",defaultValue:y,options:Q,onChange:a=>{E(a)},showSearch:!0})}),e.jsx(x,{label:"Năm",className:"border-none mr-2 w-[200px]",children:e.jsx(G,{className:"!bg-[#F4F6F8] !h-7 rounded-lg mt-[-2px]",onChange:P,placeholder:"Tất cả ",picker:"year",defaultValue:o().startOf("year")})}),e.jsx(x,{label:"Nhóm bán hàng",className:"border-none mr-2 w-[200px]",children:e.jsx(M,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,treeData:b,onChange:a=>{I(a)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:400}})}),e.jsx(x,{label:"Nhân viên",className:"border-none mr-2 w-[200px]",name:"employee",children:e.jsx(w,{filterOption:!1,notFoundContent:null,allowClear:!0,placeholder:"Tất cả nhân viên",onSearch:a=>{f(a)},options:k,onSelect:a=>{u(a)},onClear:()=>{u("")}})})]}),e.jsx("div",{className:"pt-5",children:e.jsxs(v,{dataSource:l?.data?.map(a=>({key:a.name,...a})),bordered:!0,scroll:{x:!0},pagination:{defaultPageSize:N,total:L,showSizeChanger:!1,onChange(a){H(a)}},summary:()=>e.jsxs(n.Summary.Row,{children:[e.jsx(n.Summary.Cell,{index:0}),e.jsx(n.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(n.Summary.Cell,{index:2}),e.jsx(n.Summary.Cell,{index:3}),e.jsx(n.Summary.Cell,{index:4,className:"text-center",children:l?.sum?.tong_kh_vt}),e.jsx(n.Summary.Cell,{index:5,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_vt}),e.jsx(n.Summary.Cell,{index:6}),e.jsx(n.Summary.Cell,{index:7,className:"text-center",children:l?.sum?.tong_kh_vt_dn}),e.jsx(n.Summary.Cell,{index:8,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_vt_dn}),e.jsx(n.Summary.Cell,{index:9}),e.jsx(n.Summary.Cell,{index:10,className:"text-center",children:l?.sum?.tong_kh_dat_hang}),e.jsx(n.Summary.Cell,{index:11,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_dat_hang}),e.jsx(n.Summary.Cell,{index:12}),e.jsx(n.Summary.Cell,{index:13,className:"text-center",children:l?.sum?.tong_kh_kh_moi}),e.jsx(n.Summary.Cell,{index:14,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_kh_moi}),e.jsx(n.Summary.Cell,{index:15}),e.jsx(n.Summary.Cell,{index:16,className:"text-center",children:l?.sum?.tong_kh_don_hang}),e.jsx(n.Summary.Cell,{index:17,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_don_hang}),e.jsx(n.Summary.Cell,{index:18}),e.jsx(n.Summary.Cell,{index:19,className:"text-center",children:Intl.NumberFormat().format(l?.sum?.tong_kh_doanh_so)}),e.jsx(n.Summary.Cell,{index:20,className:"text-center underline text-[#1877F2]",children:Intl.NumberFormat().format(l?.sum?.tong_th_doanh_so)}),e.jsx(n.Summary.Cell,{index:21}),e.jsx(n.Summary.Cell,{index:22,className:"text-center",children:Intl.NumberFormat().format(l?.sum?.tong_kh_doanh_thu)}),e.jsx(n.Summary.Cell,{index:23,className:"text-center underline text-[#1877F2]",children:Intl.NumberFormat().format(l?.sum?.tong_th_doanh_thu)}),e.jsx(n.Summary.Cell,{index:24}),e.jsx(n.Summary.Cell,{index:25,className:"text-center",children:l?.sum?.tong_kh_san_lg}),e.jsx(n.Summary.Cell,{index:26,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_san_lg}),e.jsx(n.Summary.Cell,{index:27}),e.jsx(n.Summary.Cell,{index:28,className:"text-center",children:l?.sum?.tong_kh_sku}),e.jsx(n.Summary.Cell,{index:29,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_sku}),e.jsx(n.Summary.Cell,{index:30}),e.jsx(n.Summary.Cell,{index:31,className:"text-center",children:l?.sum?.tong_kh_so_gio_lam_viec}),e.jsx(n.Summary.Cell,{index:32,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_so_gio_lam_viec}),e.jsx(n.Summary.Cell,{index:33})]}),children:[e.jsx(s,{title:"STT",dataIndex:"stt",fixed:"left",className:"!text-center",render:(a,t,m)=>m+1},"stt"),e.jsx(s,{title:"Mã Nhân viên",dataIndex:"nhan_vien_ban_hang",fixed:"left",render:(a,t)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"!min-w-[130px]",children:t.nhan_vien_ban_hang})})},"nhan_vien_ban_hang"),e.jsx(s,{title:"Nhân viên",dataIndex:"ten_nv",fixed:"left",render:(a,t)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"!min-w-[200px]",children:t.ten_nv})})},"ten_nv"),e.jsx(s,{title:"Nhóm bán hàng",dataIndex:"nhom_ban_hang",render:(a,t)=>e.jsx("div",{children:t.nhom_ban_hang})},"nhom_ban_hang"),e.jsxs(d,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng viếng thăm",children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_vt"},"kh_vt"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_vt"},"th_vt"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_vt",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_vt,"%"]})},"tl_vt")]}),e.jsxs(d,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng viếng thăm duy nhất",children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_vt_dn"},"kh_vt_dn"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_vt_dn"},"th_vt_dn"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_vt_dn",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_vt_dn,"%"]})},"tl_vt_dn")]}),e.jsxs(d,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng đặt hàng",children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_dat_hang"},"kh_dat_hang"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_dat_hang"},"th_dat_hang"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_dat_hang",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_dat_hang,"%"]})},"tl_dat_hang")]}),e.jsxs(d,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng thêm mới",children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_kh_moi"},"kh_kh_moi"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_kh_moi"},"th_kh_moi"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_kh_moi",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_kh_moi,"%"]})},"tl_kh_moi")]}),e.jsxs(d,{className:"!whitespace-normal",title:"Số đơn hàng",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_don_hang"},"kh_don_hang"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_don_hang"},"th_don_hang"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_don_hang",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_don_hang,"%"]})},"tl_don_hang")]}),e.jsxs(d,{className:"!whitespace-normal",title:"Doanh số (VNĐ)",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",dataIndex:"kh_doanh_so",render:(a,t)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(t.kh_doanh_so)})},"kh_doanh_so"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_doanh_so",render:(a,t)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(t.th_doanh_so)})},"th_doanh_so"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_don_hang",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_don_hang,"%"]})},"tl_don_hang")]}),e.jsxs(d,{className:"!whitespace-normal",title:"Doanh thu (VNĐ)",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_doanh_thu",render:(a,t)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(t.kh_doanh_thu)})},"kh_doanh_thu"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_doanh_thu",render:(a,t)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(t.th_doanh_thu)})},"th_doanh_thu"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_doanh_thu",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_doanh_thu,"%"]})},"tl_doanh_thu")]}),e.jsxs(d,{className:"!whitespace-normal",title:"Sản lượng",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_san_lg"},"kh_san_lg"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_san_lg"},"th_san_lg"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_san_luong",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_san_luong,"%"]})},"tl_san_luong")]}),e.jsxs(d,{className:"!whitespace-normal",title:"SKU",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_sku"},"kh_sku"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_sku"},"th_sku"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_sku",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_sku,"%"]})},"tl_sku")]}),e.jsxs(d,{className:"!whitespace-normal",title:"Số giờ làm việc",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_so_gio_lam_viec"},"kh_so_gio_lam_viec"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_so_gio_lam_viec"},"th_so_gio_lam_viec"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_so_gio_lam_viec",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_so_gio_lam_viec,"%"]})},"tl_so_gio_lam_viec")]})]})})]})})})}function se(){return e.jsxs(e.Fragment,{children:[e.jsx(Y,{children:e.jsx("title",{children:" ReportKPI"})}),e.jsx(Z,{})]})}export{se as default};
