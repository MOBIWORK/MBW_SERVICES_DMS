import{W as d,a6 as o,a0 as x,L as e,O as m,a2 as y,bs as t,a7 as V}from"./index-cTJtuiJn.js";import{H as A}from"./header-page-RvQWcVz2.js";import{T as k}from"./tableCustom-3wkW3_Nh.js";import{u as Y}from"./useDebount-m4srezRo.js";import{t as O}from"./index-iNuXJClV.js";import{D as z}from"./index-v7XQvUDD.js";import{T as M}from"./index-z_P9czy5.js";import{V as B}from"./VerticalAlignBottomOutlined-B1XC1Btp.js";import"./index-FbNdrnil.js";const G=[{label:"Tháng 1",value:"1"},{label:"Tháng 2",value:"2"},{label:"Tháng 3",value:"3"},{label:"Tháng 4",value:"4"},{label:"Tháng 5",value:"5"},{label:"Tháng 6",value:"6"},{label:"Tháng 7",value:"7"},{label:"Tháng 8",value:"8"},{label:"Tháng 9",value:"9"},{label:"Tháng 10",value:"10"},{label:"Tháng 11",value:"11"},{label:"Tháng 12",value:"12"}],{Column:a,ColumnGroup:h}=k;function U(){const[v,b]=d.useState([]),[C,T]=d.useState([]),[r,I]=d.useState(),[f,F]=d.useState(""),[c,u]=d.useState();let g=Y(f);const[j,N]=d.useState(1),p=20,[s,H]=d.useState([]),[S,K]=d.useState(""),[_,w]=d.useState(""),[E,L]=d.useState(0),P=n=>{w(n?.$y.toString())},D=(o().month()+1).toString(),R=o().format("YYYY");return d.useEffect(()=>{(async()=>{let n=await x.get("/api/method/mbw_dms.api.router.get_team_sale");T(O({data:n.result.map(l=>({title:l.name,value:l.name,...l})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),d.useEffect(()=>{(async()=>{let n=await x.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:r,key_search:g}}),{message:l}=n;b(l.map(i=>({value:i.employee_code,label:i.employee_name||i.employee_code})))})()},[r,g]),d.useEffect(()=>{(_===void 0||_==="")&&w(R),(async()=>{const n=await x.get("/api/method/mbw_dms.api.report.kpi.kpi_report",{params:{page_size:p,page_number:j,month:S,year:_,sales_team:r,employee:c}});H(n?.result),L(n?.result?.totals)})()},[S,_,r,c,j]),e.jsxs(e.Fragment,{children:[e.jsx(A,{title:"Báo cáo KPI",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(B,{className:"text-xl"}),size:"20px",className:"flex items-center"}]}),e.jsxs("div",{className:"bg-white rounded-md py-7 px-4 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs("div",{className:"flex justify-start items-center",children:[e.jsx(m,{className:"w-[200px] border-none mr-2",children:e.jsx(y,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:D,options:G,onChange:n=>{K(n)},showSearch:!0})}),e.jsx(m,{className:"w-[200px] border-none mr-2",children:e.jsx(z,{className:"!bg-[#F4F6F8]",onChange:P,picker:"year",defaultValue:o().startOf("year")})}),e.jsx(m,{className:"w-[200px] border-none mr-2",children:e.jsx(M,{showSearch:!0,defaultValue:"",treeData:[{label:"Tất cả nhóm bán hàng",value:""},...C],onChange:n=>{I(n)}})}),e.jsx(m,{name:"employee",className:"w-[200px] border-none mr-2",children:e.jsx(y,{showSearch:!0,filterOption:!1,notFoundContent:null,defaultValue:"",allowClear:!0,onSearch:n=>{F(n)},options:[{label:"Tất cả nhân viên",value:""},...v],onSelect:n=>{u(n)},onClear:()=>{u("")}})})]}),e.jsx("div",{className:"pt-5",children:e.jsxs(k,{dataSource:s?.data?.map(n=>({key:n.name,...n})),bordered:!0,scroll:{x:!0},pagination:{defaultPageSize:p,total:E,onChange(n){N(n)}},summary:()=>e.jsxs(t.Summary.Row,{children:[e.jsx(t.Summary.Cell,{index:0}),e.jsx(t.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(t.Summary.Cell,{index:2}),e.jsx(t.Summary.Cell,{index:3}),e.jsx(t.Summary.Cell,{index:4,children:s?.sum?.tong_kh_vt}),e.jsx(t.Summary.Cell,{index:5,children:s?.sum?.tong_th_vt}),e.jsx(t.Summary.Cell,{index:6}),e.jsx(t.Summary.Cell,{index:7,children:s?.sum?.tong_kh_vt_dn}),e.jsx(t.Summary.Cell,{index:8,children:s?.sum?.tong_th_vt_dn}),e.jsx(t.Summary.Cell,{index:9}),e.jsx(t.Summary.Cell,{index:10,children:s?.sum?.tong_kh_dat_hang}),e.jsx(t.Summary.Cell,{index:11,children:s?.sum?.tong_th_dat_hang}),e.jsx(t.Summary.Cell,{index:12}),e.jsx(t.Summary.Cell,{index:13,children:s?.sum?.tong_kh_kh_moi}),e.jsx(t.Summary.Cell,{index:14,children:s?.sum?.tong_th_kh_moi}),e.jsx(t.Summary.Cell,{index:15}),e.jsx(t.Summary.Cell,{index:16,children:s?.sum?.tong_kh_don_hang}),e.jsx(t.Summary.Cell,{index:17,children:s?.sum?.tong_th_don_hang}),e.jsx(t.Summary.Cell,{index:18}),e.jsx(t.Summary.Cell,{index:19,children:s?.sum?.tong_kh_doanh_so}),e.jsx(t.Summary.Cell,{index:20,children:s?.sum?.tong_th_doanh_so}),e.jsx(t.Summary.Cell,{index:21}),e.jsx(t.Summary.Cell,{index:22,children:s?.sum?.tong_kh_doanh_thu}),e.jsx(t.Summary.Cell,{index:23,children:s?.sum?.tong_th_doanh_thu}),e.jsx(t.Summary.Cell,{index:24}),e.jsx(t.Summary.Cell,{index:25,children:s?.sum?.tong_kh_san_lg}),e.jsx(t.Summary.Cell,{index:26,children:s?.sum?.tong_th_san_lg}),e.jsx(t.Summary.Cell,{index:27}),e.jsx(t.Summary.Cell,{index:28,children:s?.sum?.tong_kh_sku}),e.jsx(t.Summary.Cell,{index:29,children:s?.sum?.tong_th_sku}),e.jsx(t.Summary.Cell,{index:30}),e.jsx(t.Summary.Cell,{index:31,children:s?.sum?.tong_kh_so_gio_lam_viec}),e.jsx(t.Summary.Cell,{index:32,children:s?.sum?.tong_th_so_gio_lam_viec}),e.jsx(t.Summary.Cell,{index:33})]}),children:[e.jsx(a,{title:"STT",dataIndex:"stt",fixed:"left",width:60,render:(n,l,i)=>i+1},"stt"),e.jsx(a,{title:"Mã Nhân viên",dataIndex:"nhan_vien_ban_hang",fixed:"left",width:130},"nhan_vien_ban_hang"),e.jsx(a,{title:"Nhân viên",dataIndex:"ten_nv",fixed:"left",width:200},"ten_nv"),e.jsx(a,{title:"Phòng/nhóm",dataIndex:"nhom_ban_hang",render:(n,l)=>e.jsx("div",{className:"!w-[180px]",children:l.nhom_ban_hang})},"nhom_ban_hang"),e.jsxs(h,{className:"!whitespace-normal",title:"Số khách hàng viếng thăm",width:210,children:[e.jsx(a,{title:"KH",width:70,dataIndex:"kh_vt"},"kh_vt"),e.jsx(a,{title:"TH",width:70,dataIndex:"th_vt"},"th_vt"),e.jsx(a,{title:"TL",width:70,dataIndex:"tl_vt",render:(n,l)=>e.jsxs(e.Fragment,{children:[l.tl_vt,"%"]})},"tl_vt")]}),e.jsxs(h,{className:"!whitespace-normal",title:"Số khách hàng viếng thăm duy nhất",width:210,children:[e.jsx(a,{title:"KH",width:70,dataIndex:"kh_vt_dn"},"kh_vt_dn"),e.jsx(a,{title:"TH",width:70,dataIndex:"th_vt_dn"},"th_vt_dn"),e.jsx(a,{title:"TL",width:70,dataIndex:"tl_vt_dn",render:(n,l)=>e.jsxs(e.Fragment,{children:[l.tl_vt_dn,"%"]})},"tl_vt_dn")]}),e.jsxs(h,{className:"!whitespace-normal",title:"Số khách hàng đặt hàng",width:210,children:[e.jsx(a,{title:"KH",width:70,dataIndex:"kh_dat_hang"},"kh_dat_hang"),e.jsx(a,{title:"TH",width:70,dataIndex:"th_dat_hang"},"th_dat_hang"),e.jsx(a,{title:"TL",width:70,dataIndex:"tl_dat_hang",render:(n,l)=>e.jsxs(e.Fragment,{children:[l.tl_dat_hang,"%"]})},"tl_dat_hang")]}),e.jsxs(h,{className:"!whitespace-normal",title:"Số khách hàng thêm mới",width:210,children:[e.jsx(a,{title:"KH",width:70,dataIndex:"kh_kh_moi"},"kh_kh_moi"),e.jsx(a,{title:"TH",width:70,dataIndex:"th_kh_moi"},"th_kh_moi"),e.jsx(a,{title:"TL",width:70,dataIndex:"tl_kh_moi",render:(n,l)=>e.jsxs(e.Fragment,{children:[l.tl_kh_moi,"%"]})},"tl_kh_moi")]}),e.jsxs(h,{className:"!whitespace-normal",title:"Số đơn hàng",width:210,children:[e.jsx(a,{title:"KH",width:70,dataIndex:"kh_don_hang"},"kh_don_hang"),e.jsx(a,{title:"TH",width:70,dataIndex:"th_don_hang"},"th_don_hang"),e.jsx(a,{title:"TL",width:70,dataIndex:"tl_don_hang",render:(n,l)=>e.jsxs(e.Fragment,{children:[l.tl_don_hang,"%"]})},"tl_don_hang")]}),e.jsxs(h,{className:"!whitespace-normal",title:"Doanh số",width:210,children:[e.jsx(a,{title:"KH",width:70,dataIndex:"kh_doanh_so"},"kh_doanh_so"),e.jsx(a,{title:"TH",width:70,dataIndex:"th_doanh_so"},"th_doanh_so"),e.jsx(a,{title:"TL",width:70,dataIndex:"tl_don_hang",render:(n,l)=>e.jsxs(e.Fragment,{children:[l.tl_don_hang,"%"]})},"tl_don_hang")]}),e.jsxs(h,{className:"!whitespace-normal",title:"Doanh thu",width:210,children:[e.jsx(a,{title:"KH",width:70,dataIndex:"kh_doanh_thu"},"kh_doanh_thu"),e.jsx(a,{title:"TH",width:70,dataIndex:"th_doanh_thu"},"th_doanh_thu"),e.jsx(a,{title:"TL",width:70,dataIndex:"tl_doanh_thu",render:(n,l)=>e.jsxs(e.Fragment,{children:[l.tl_doanh_thu,"%"]})},"tl_doanh_thu")]}),e.jsxs(h,{className:"!whitespace-normal",title:"Sản lượng",width:210,children:[e.jsx(a,{title:"KH",width:70,dataIndex:"kh_san_lg"},"kh_san_lg"),e.jsx(a,{title:"TH",width:70,dataIndex:"th_san_lg"},"th_san_lg"),e.jsx(a,{title:"TL",width:70,dataIndex:"tl_san_luong",render:(n,l)=>e.jsxs(e.Fragment,{children:[l.tl_san_luong,"%"]})},"tl_san_luong")]}),e.jsxs(h,{className:"!whitespace-normal",title:"SKU",width:210,children:[e.jsx(a,{title:"KH",width:70,dataIndex:"kh_sku"},"kh_sku"),e.jsx(a,{title:"TH",width:70,dataIndex:"th_sku"},"th_sku"),e.jsx(a,{title:"TL",width:70,dataIndex:"tl_sku",render:(n,l)=>e.jsxs(e.Fragment,{children:[l.tl_sku,"%"]})},"tl_sku")]}),e.jsxs(h,{className:"!whitespace-normal",title:"Số giờ làm việc",width:210,children:[e.jsx(a,{title:"KH",width:70,dataIndex:"kh_so_gio_lam_viec"},"kh_so_gio_lam_viec"),e.jsx(a,{title:"TH",width:70,dataIndex:"th_so_gio_lam_viec"},"th_so_gio_lam_viec"),e.jsx(a,{title:"TL",width:70,dataIndex:"tl_so_gio_lam_viec",render:(n,l)=>e.jsxs(e.Fragment,{children:[l.tl_so_gio_lam_viec,"%"]})},"tl_so_gio_lam_viec")]})]})})]})]})}function ne(){return e.jsxs(e.Fragment,{children:[e.jsx(V,{children:e.jsx("title",{children:" ReportKPI"})}),e.jsx(U,{})]})}export{ne as default};
