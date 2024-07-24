import{Y as r,a1 as p,L as e,a6 as U,R as W,P as x,a2 as F,V as N,a8 as X,a9 as b,bz as a,ab as Z}from"./index-UfgTcFoq.js";import{u as $,C as q}from"./index-XQQzR4Sn.js";import{u as J}from"./useDebount-SusU58bt.js";import{t as Q,a as ee}from"./index-8rI-F1kh.js";import{D as te}from"./index-OfLBED-9.js";import{S as ne}from"./SyncOutlined-ScbHu8Uc.js";import{V as ae}from"./VerticalAlignBottomOutlined-TYSmVyzJ.js";const se=[{label:"Tháng 1",value:"1"},{label:"Tháng 2",value:"2"},{label:"Tháng 3",value:"3"},{label:"Tháng 4",value:"4"},{label:"Tháng 5",value:"5"},{label:"Tháng 6",value:"6"},{label:"Tháng 7",value:"7"},{label:"Tháng 8",value:"8"},{label:"Tháng 9",value:"9"},{label:"Tháng 10",value:"10"},{label:"Tháng 11",value:"11"},{label:"Tháng 12",value:"12"}],{Column:s,ColumnGroup:d}=b,le=N().month()+1,f=le.toString(),re=N().format("YYYY");function de(){const[C,I]=r.useState([]),[T,H]=r.useState([]),[h,E]=r.useState(),[K,R]=r.useState(""),[S,v]=r.useState();let k=J(K);const[_,m]=r.useState(1),o=20,[l,L]=r.useState([]),[w,z]=r.useState(f),[c,y]=r.useState(""),[u,D]=r.useState(0),g=r.useRef(null),j=$(),[P,V]=r.useState(0),[Y,O]=r.useState(j?.h*.52),[A,B]=r.useState(!1);r.useEffect(()=>{O(j.h*.52)},[j]),r.useEffect(()=>{const n=g.current;if(n){const t=new ResizeObserver(i=>{for(let M of i)V(M.contentRect.height)});return t.observe(n),()=>t.disconnect()}},[g]);const G=n=>{y(n?.$y.toString())};return r.useEffect(()=>{(async()=>{let n=await p.get("/api/method/mbw_dms.api.router.get_team_sale");H(Q({data:n.result.map(t=>({title:t.name,value:t.name,...t})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),r.useEffect(()=>{(async()=>{let n=await p.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:h,key_search:k}}),{message:t}=n;I(t.map(i=>({value:i.employee_code,label:i.employee_name||i.employee_code})))})()},[h,k]),r.useEffect(()=>{(c===void 0||c==="")&&y(re),(async()=>{const n=await p.get("/api/method/mbw_dms.api.report.kpi.kpi_report",{params:{page_size:o,page_number:_,month:w,year:c,sales_team:h,employee:S}});L(n?.result),D(n?.result?.totals)})()},[w,c,h,S,_,A]),e.jsx(e.Fragment,{children:e.jsx(q,{header:e.jsx(U,{title:"Báo cáo KPI",buttons:[{icon:e.jsx(ne,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{B(n=>!n)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(ae,{className:"text-xl"}),size:"18px",className:"flex items-center",action:()=>{ee("/app/data-export/Data%20Export")}}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(W,{className:"px-4 flex-auto",gutter:[8,8],children:[e.jsx(x,{span:4,children:e.jsx(F,{className:"!bg-[#F4F6F8]",defaultValue:f,options:se,onChange:n=>{z(n),m(1)}})}),e.jsx(x,{span:4,children:e.jsx(te,{className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:G,placeholder:"Chọn năm",picker:"year",defaultValue:N().startOf("year")})}),e.jsx(x,{span:4,children:e.jsx(X,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:T,onChange:n=>{E(n),m(1)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(x,{span:4,children:e.jsx(F,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:n=>{R(n)},options:C,onSelect:n=>{v(n),m(1)},onClear:()=>{v("")}})})]}),e.jsx("div",{ref:g,className:"pt-5",children:e.jsxs(b,{dataSource:l?.data?.map(n=>({key:n.name,...n})),bordered:!0,scroll:{x:"max-content",y:P<400?void 0:Y},pagination:u&&u>o?{pageSize:o,showSizeChanger:!1,total:u,current:_,onChange(n){m(n)}}:!1,summary:()=>e.jsxs(a.Summary.Row,{children:[e.jsx(a.Summary.Cell,{index:0}),e.jsx(a.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(a.Summary.Cell,{index:2}),e.jsx(a.Summary.Cell,{index:3}),e.jsx(a.Summary.Cell,{index:4,className:"text-center",children:l?.sum?.tong_kh_vt}),e.jsx(a.Summary.Cell,{index:5,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_vt}),e.jsx(a.Summary.Cell,{index:6}),e.jsx(a.Summary.Cell,{index:7,className:"text-center",children:l?.sum?.tong_kh_vt_dn}),e.jsx(a.Summary.Cell,{index:8,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_vt_dn}),e.jsx(a.Summary.Cell,{index:9}),e.jsx(a.Summary.Cell,{index:10,className:"text-center",children:l?.sum?.tong_kh_dat_hang}),e.jsx(a.Summary.Cell,{index:11,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_dat_hang}),e.jsx(a.Summary.Cell,{index:12}),e.jsx(a.Summary.Cell,{index:13,className:"text-center",children:l?.sum?.tong_kh_kh_moi}),e.jsx(a.Summary.Cell,{index:14,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_kh_moi}),e.jsx(a.Summary.Cell,{index:15}),e.jsx(a.Summary.Cell,{index:16,className:"text-center",children:l?.sum?.tong_kh_don_hang}),e.jsx(a.Summary.Cell,{index:17,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_don_hang}),e.jsx(a.Summary.Cell,{index:18}),e.jsx(a.Summary.Cell,{index:19,className:"text-center",children:Intl.NumberFormat().format(l?.sum?.tong_kh_doanh_so)}),e.jsx(a.Summary.Cell,{index:20,className:"text-center underline text-[#1877F2]",children:Intl.NumberFormat().format(l?.sum?.tong_th_doanh_so)}),e.jsx(a.Summary.Cell,{index:21}),e.jsx(a.Summary.Cell,{index:22,className:"text-center",children:Intl.NumberFormat().format(l?.sum?.tong_kh_doanh_thu)}),e.jsx(a.Summary.Cell,{index:23,className:"text-center underline text-[#1877F2]",children:Intl.NumberFormat().format(l?.sum?.tong_th_doanh_thu)}),e.jsx(a.Summary.Cell,{index:24}),e.jsx(a.Summary.Cell,{index:25,className:"text-center",children:l?.sum?.tong_kh_san_lg}),e.jsx(a.Summary.Cell,{index:26,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_san_lg}),e.jsx(a.Summary.Cell,{index:27}),e.jsx(a.Summary.Cell,{index:28,className:"text-center",children:l?.sum?.tong_kh_sku}),e.jsx(a.Summary.Cell,{index:29,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_sku}),e.jsx(a.Summary.Cell,{index:30}),e.jsx(a.Summary.Cell,{index:31,className:"text-center",children:l?.sum?.tong_kh_so_gio_lam_viec}),e.jsx(a.Summary.Cell,{index:32,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_so_gio_lam_viec}),e.jsx(a.Summary.Cell,{index:33})]}),children:[e.jsx(s,{title:"STT",dataIndex:"stt",fixed:"left",className:"!text-center",width:60,render:(n,t,i)=>i+1},"stt"),e.jsx(s,{title:"Mã Nhân viên",dataIndex:"nhan_vien_ban_hang",fixed:"left",render:(n,t)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"!min-w-[130px]",children:t.nhan_vien_ban_hang})})},"nhan_vien_ban_hang"),e.jsx(s,{title:"Nhân viên",dataIndex:"ten_nv",fixed:"left",render:(n,t)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"!min-w-[200px]",children:t.ten_nv})})},"ten_nv"),e.jsx(s,{title:"Nhóm bán hàng",dataIndex:"nhom_ban_hang",render:(n,t)=>e.jsx("div",{children:t.nhom_ban_hang})},"nhom_ban_hang"),e.jsxs(d,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng viếng thăm",children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_vt"},"kh_vt"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_vt",render:(n,t)=>e.jsx("div",{children:t?.kpi_month[0].th_vt})},"th_vt"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_vt",render:(n,t)=>e.jsxs(e.Fragment,{children:[t.tl_vt,"%"]})},"tl_vt")]}),e.jsxs(d,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng viếng thăm duy nhất",children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_vt_dn"},"kh_vt_dn"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_vt_dn",render:(n,t)=>e.jsx("div",{children:t?.kpi_month[0].th_vt_dn})},"th_vt_dn"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_vt_dn",render:(n,t)=>e.jsxs(e.Fragment,{children:[t.tl_vt_dn,"%"]})},"tl_vt_dn")]}),e.jsxs(d,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng đặt hàng",children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_dat_hang"},"kh_dat_hang"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_dat_hang",render:(n,t)=>e.jsx("div",{children:t?.kpi_month[0].th_dat_hang})},"th_dat_hang"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_dat_hang",render:(n,t)=>e.jsxs(e.Fragment,{children:[t.tl_dat_hang,"%"]})},"tl_dat_hang")]}),e.jsxs(d,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng thêm mới",children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_kh_moi"},"kh_kh_moi"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_kh_moi",render:(n,t)=>e.jsx("div",{children:t?.kpi_month[0].th_kh_moi})},"th_kh_moi"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_kh_moi",render:(n,t)=>e.jsxs(e.Fragment,{children:[t.tl_kh_moi,"%"]})},"tl_kh_moi")]}),e.jsxs(d,{className:"!whitespace-normal",title:"Số đơn hàng",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_don_hang"},"kh_don_hang"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_don_hang",render:(n,t)=>e.jsx("div",{children:t?.kpi_month[0].th_don_hang})},"th_don_hang"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_don_hang",render:(n,t)=>e.jsxs(e.Fragment,{children:[t.tl_don_hang,"%"]})},"tl_don_hang")]}),e.jsxs(d,{className:"!whitespace-normal",title:"Doanh số (VNĐ)",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",dataIndex:"kh_doanh_so",render:(n,t)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(t.kh_doanh_so)})},"kh_doanh_so"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_doanh_so",render:(n,t)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(t?.kpi_month[0].th_doanh_so)})},"th_doanh_so"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_don_hang",render:(n,t)=>e.jsxs(e.Fragment,{children:[t.tl_don_hang,"%"]})},"tl_don_hang")]}),e.jsxs(d,{className:"!whitespace-normal",title:"Doanh thu (VNĐ)",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_doanh_thu",render:(n,t)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(t.kh_doanh_thu)})},"kh_doanh_thu"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_doanh_thu",render:(n,t)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(t?.kpi_month[0].th_doanh_thu)})},"th_doanh_thu"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_doanh_thu",render:(n,t)=>e.jsxs(e.Fragment,{children:[t.tl_doanh_thu,"%"]})},"tl_doanh_thu")]}),e.jsxs(d,{className:"!whitespace-normal",title:"Sản lượng",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_san_lg"},"kh_san_lg"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_san_lg",render:(n,t)=>e.jsx("div",{children:t?.kpi_month[0].th_san_lg})},"th_san_lg"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_san_luong",render:(n,t)=>e.jsxs(e.Fragment,{children:[t.tl_san_luong,"%"]})},"tl_san_luong")]}),e.jsxs(d,{className:"!whitespace-normal",title:"SKU",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_sku"},"kh_sku"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_sku",render:(n,t)=>e.jsx("div",{children:t?.kpi_month[0].th_sku})},"th_sku"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_sku",render:(n,t)=>e.jsxs(e.Fragment,{children:[t.tl_sku,"%"]})},"tl_sku")]}),e.jsxs(d,{className:"!whitespace-normal",title:"Số giờ làm việc",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_so_gio_lam_viec"},"kh_so_gio_lam_viec"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_so_gio_lam_viec",render:(n,t)=>e.jsx("div",{children:t?.kpi_month[0].th_so_gio_lam_viec})},"th_so_gio_lam_viec"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_so_gio_lam_viec",render:(n,t)=>e.jsxs(e.Fragment,{children:[t.tl_so_gio_lam_viec,"%"]})},"tl_so_gio_lam_viec")]})]})})]})})})}function ue(){return e.jsxs(e.Fragment,{children:[e.jsx(Z,{children:e.jsx("title",{children:" ReportKPI"})}),e.jsx(de,{})]})}export{ue as default};
