import{Y as r,a1 as j,L as e,a6 as U,R as W,P as c,a2 as k,V as p,a8 as X,a9 as f,bz as n,ab as Z}from"./index-HCg_4A1w.js";import{u as $,C as q}from"./index-cP-jnA7R.js";import{u as J}from"./useDebount-yyIkMT4l.js";import{t as Q,a as ee}from"./index-4wDfWZHg.js";import{D as te}from"./index-7-Ff0EeN.js";import{S as ae}from"./SyncOutlined-EhLR5VTS.js";import{V as ne}from"./VerticalAlignBottomOutlined-XfEnWVh5.js";const se=[{label:"Tháng 1",value:"1"},{label:"Tháng 2",value:"2"},{label:"Tháng 3",value:"3"},{label:"Tháng 4",value:"4"},{label:"Tháng 5",value:"5"},{label:"Tháng 6",value:"6"},{label:"Tháng 7",value:"7"},{label:"Tháng 8",value:"8"},{label:"Tháng 9",value:"9"},{label:"Tháng 10",value:"10"},{label:"Tháng 11",value:"11"},{label:"Tháng 12",value:"12"}],{Column:s,ColumnGroup:d}=f,le=p().month()+1,F=le.toString(),re=p().format("YYYY");function de(){const[b,C]=r.useState([]),[I,T]=r.useState([]),[h,H]=r.useState(),[E,K]=r.useState(""),[N,S]=r.useState();let w=J(E);const[x,R]=r.useState(1),o=20,[l,L]=r.useState([]),[y,z]=r.useState(F),[m,v]=r.useState(""),[_,D]=r.useState(0),u=r.useRef(null),g=$(),[P,V]=r.useState(0),[Y,O]=r.useState(g?.h*.52),[A,B]=r.useState(!1);r.useEffect(()=>{O(g.h*.52)},[g]),r.useEffect(()=>{const t=u.current;if(t){const a=new ResizeObserver(i=>{for(let M of i)V(M.contentRect.height)});return a.observe(t),()=>a.disconnect()}},[u]);const G=t=>{v(t?.$y.toString())};return r.useEffect(()=>{(async()=>{let t=await j.get("/api/method/mbw_dms.api.router.get_team_sale");T(Q({data:t.result.map(a=>({title:a.name,value:a.name,...a})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),r.useEffect(()=>{(async()=>{let t=await j.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:h,key_search:w}}),{message:a}=t;C(a.map(i=>({value:i.employee_code,label:i.employee_name||i.employee_code})))})()},[h,w]),r.useEffect(()=>{(m===void 0||m==="")&&v(re),(async()=>{const t=await j.get("/api/method/mbw_dms.api.report.kpi.kpi_report",{params:{page_size:o,page_number:x,month:y,year:m,sales_team:h,employee:N}});L(t?.result),D(t?.result?.totals)})()},[y,m,h,N,x,A]),e.jsx(e.Fragment,{children:e.jsx(q,{header:e.jsx(U,{title:"Báo cáo KPI",buttons:[{icon:e.jsx(ae,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{B(t=>!t)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(ne,{className:"text-xl"}),size:"18px",className:"flex items-center",action:()=>{ee("/app/data-export/Data%20Export")}}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(W,{className:"px-4 flex-auto",gutter:[8,8],children:[e.jsx(c,{span:4,children:e.jsx(k,{className:"!bg-[#F4F6F8]",defaultValue:F,options:se,onChange:t=>{z(t)}})}),e.jsx(c,{span:4,children:e.jsx(te,{className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:G,placeholder:"Chọn năm",picker:"year",defaultValue:p().startOf("year")})}),e.jsx(c,{span:4,children:e.jsx(X,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:I,onChange:t=>{H(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(c,{span:4,children:e.jsx(k,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{K(t)},options:b,onSelect:t=>{S(t)},onClear:()=>{S("")}})})]}),e.jsx("div",{ref:u,className:"pt-5",children:e.jsxs(f,{dataSource:l?.data?.map(t=>({key:t.name,...t})),bordered:!0,scroll:{x:"max-content",y:P<400?void 0:Y},pagination:_&&_>o?{pageSize:o,showSizeChanger:!1,total:_,current:x,onChange(t){R(t)}}:!1,summary:()=>e.jsxs(n.Summary.Row,{children:[e.jsx(n.Summary.Cell,{index:0}),e.jsx(n.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(n.Summary.Cell,{index:2}),e.jsx(n.Summary.Cell,{index:3}),e.jsx(n.Summary.Cell,{index:4,className:"text-center",children:l?.sum?.tong_kh_vt}),e.jsx(n.Summary.Cell,{index:5,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_vt}),e.jsx(n.Summary.Cell,{index:6}),e.jsx(n.Summary.Cell,{index:7,className:"text-center",children:l?.sum?.tong_kh_vt_dn}),e.jsx(n.Summary.Cell,{index:8,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_vt_dn}),e.jsx(n.Summary.Cell,{index:9}),e.jsx(n.Summary.Cell,{index:10,className:"text-center",children:l?.sum?.tong_kh_dat_hang}),e.jsx(n.Summary.Cell,{index:11,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_dat_hang}),e.jsx(n.Summary.Cell,{index:12}),e.jsx(n.Summary.Cell,{index:13,className:"text-center",children:l?.sum?.tong_kh_kh_moi}),e.jsx(n.Summary.Cell,{index:14,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_kh_moi}),e.jsx(n.Summary.Cell,{index:15}),e.jsx(n.Summary.Cell,{index:16,className:"text-center",children:l?.sum?.tong_kh_don_hang}),e.jsx(n.Summary.Cell,{index:17,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_don_hang}),e.jsx(n.Summary.Cell,{index:18}),e.jsx(n.Summary.Cell,{index:19,className:"text-center",children:Intl.NumberFormat().format(l?.sum?.tong_kh_doanh_so)}),e.jsx(n.Summary.Cell,{index:20,className:"text-center underline text-[#1877F2]",children:Intl.NumberFormat().format(l?.sum?.tong_th_doanh_so)}),e.jsx(n.Summary.Cell,{index:21}),e.jsx(n.Summary.Cell,{index:22,className:"text-center",children:Intl.NumberFormat().format(l?.sum?.tong_kh_doanh_thu)}),e.jsx(n.Summary.Cell,{index:23,className:"text-center underline text-[#1877F2]",children:Intl.NumberFormat().format(l?.sum?.tong_th_doanh_thu)}),e.jsx(n.Summary.Cell,{index:24}),e.jsx(n.Summary.Cell,{index:25,className:"text-center",children:l?.sum?.tong_kh_san_lg}),e.jsx(n.Summary.Cell,{index:26,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_san_lg}),e.jsx(n.Summary.Cell,{index:27}),e.jsx(n.Summary.Cell,{index:28,className:"text-center",children:l?.sum?.tong_kh_sku}),e.jsx(n.Summary.Cell,{index:29,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_sku}),e.jsx(n.Summary.Cell,{index:30}),e.jsx(n.Summary.Cell,{index:31,className:"text-center",children:l?.sum?.tong_kh_so_gio_lam_viec}),e.jsx(n.Summary.Cell,{index:32,className:"text-center underline text-[#1877F2]",children:l?.sum?.tong_th_so_gio_lam_viec}),e.jsx(n.Summary.Cell,{index:33})]}),children:[e.jsx(s,{title:"STT",dataIndex:"stt",fixed:"left",className:"!text-center",width:60,render:(t,a,i)=>i+1},"stt"),e.jsx(s,{title:"Mã Nhân viên",dataIndex:"nhan_vien_ban_hang",fixed:"left",render:(t,a)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"!min-w-[130px]",children:a.nhan_vien_ban_hang})})},"nhan_vien_ban_hang"),e.jsx(s,{title:"Nhân viên",dataIndex:"ten_nv",fixed:"left",render:(t,a)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"!min-w-[200px]",children:a.ten_nv})})},"ten_nv"),e.jsx(s,{title:"Nhóm bán hàng",dataIndex:"nhom_ban_hang",render:(t,a)=>e.jsx("div",{children:a.nhom_ban_hang})},"nhom_ban_hang"),e.jsxs(d,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng viếng thăm",children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_vt"},"kh_vt"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_vt"},"th_vt"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_vt",render:(t,a)=>e.jsxs(e.Fragment,{children:[a.tl_vt,"%"]})},"tl_vt")]}),e.jsxs(d,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng viếng thăm duy nhất",children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_vt_dn"},"kh_vt_dn"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_vt_dn"},"th_vt_dn"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_vt_dn",render:(t,a)=>e.jsxs(e.Fragment,{children:[a.tl_vt_dn,"%"]})},"tl_vt_dn")]}),e.jsxs(d,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng đặt hàng",children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_dat_hang"},"kh_dat_hang"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_dat_hang"},"th_dat_hang"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_dat_hang",render:(t,a)=>e.jsxs(e.Fragment,{children:[a.tl_dat_hang,"%"]})},"tl_dat_hang")]}),e.jsxs(d,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng thêm mới",children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_kh_moi"},"kh_kh_moi"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_kh_moi"},"th_kh_moi"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_kh_moi",render:(t,a)=>e.jsxs(e.Fragment,{children:[a.tl_kh_moi,"%"]})},"tl_kh_moi")]}),e.jsxs(d,{className:"!whitespace-normal",title:"Số đơn hàng",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_don_hang"},"kh_don_hang"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_don_hang"},"th_don_hang"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_don_hang",render:(t,a)=>e.jsxs(e.Fragment,{children:[a.tl_don_hang,"%"]})},"tl_don_hang")]}),e.jsxs(d,{className:"!whitespace-normal",title:"Doanh số (VNĐ)",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",dataIndex:"kh_doanh_so",render:(t,a)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(a.kh_doanh_so)})},"kh_doanh_so"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_doanh_so",render:(t,a)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(a.th_doanh_so)})},"th_doanh_so"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_don_hang",render:(t,a)=>e.jsxs(e.Fragment,{children:[a.tl_don_hang,"%"]})},"tl_don_hang")]}),e.jsxs(d,{className:"!whitespace-normal",title:"Doanh thu (VNĐ)",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_doanh_thu",render:(t,a)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(a.kh_doanh_thu)})},"kh_doanh_thu"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_doanh_thu",render:(t,a)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(a.th_doanh_thu)})},"th_doanh_thu"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_doanh_thu",render:(t,a)=>e.jsxs(e.Fragment,{children:[a.tl_doanh_thu,"%"]})},"tl_doanh_thu")]}),e.jsxs(d,{className:"!whitespace-normal",title:"Sản lượng",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_san_lg"},"kh_san_lg"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_san_lg"},"th_san_lg"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_san_luong",render:(t,a)=>e.jsxs(e.Fragment,{children:[a.tl_san_luong,"%"]})},"tl_san_luong")]}),e.jsxs(d,{className:"!whitespace-normal",title:"SKU",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_sku"},"kh_sku"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_sku"},"th_sku"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_sku",render:(t,a)=>e.jsxs(e.Fragment,{children:[a.tl_sku,"%"]})},"tl_sku")]}),e.jsxs(d,{className:"!whitespace-normal",title:"Số giờ làm việc",width:210,children:[e.jsx(s,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_so_gio_lam_viec"},"kh_so_gio_lam_viec"),e.jsx(s,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_so_gio_lam_viec"},"th_so_gio_lam_viec"),e.jsx(s,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_so_gio_lam_viec",render:(t,a)=>e.jsxs(e.Fragment,{children:[a.tl_so_gio_lam_viec,"%"]})},"tl_so_gio_lam_viec")]})]})})]})})})}function ue(){return e.jsxs(e.Fragment,{children:[e.jsx(Z,{children:e.jsx("title",{children:" ReportKPI"})}),e.jsx(de,{})]})}export{ue as default};
