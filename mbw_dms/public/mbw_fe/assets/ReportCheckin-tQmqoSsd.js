import{L as e,Y as d,a1 as G,R as w,P as I,ab as P,V as F,bE as Y,ad as Z}from"./index-Y-ucsyP6.js";import{u as B,C as z}from"./index-ExY6TDth.js";import{M as K}from"./ModalCheckin-r7xRSNqO.js";import{D as V}from"./Detailmodal-AsS8nYqB.js";import{a as $,u as S,P as l,R as A,F as H,D as Q,m as X}from"./ReportHeader-H_M1lf5J.js";import"./index.esm-28P13q3d.js";import"./data-u-VkVTNg.js";import"./index-WbcQA3c1.js";import"./VerticalAlignBottomOutlined-bKQSSZ0o.js";const y=({size:r=20,fill:i="#1877F2"})=>e.jsx("svg",{width:r,height:r,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M2 12C2 6.47715 6.47715 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.73 15.61L16.3 9.61V9.58C16.5179 9.29419 16.5668 8.91382 16.4283 8.58218C16.2897 8.25054 15.9848 8.01801 15.6283 7.97218C15.2718 7.92635 14.9179 8.07419 14.7 8.36L10.92 13.36L9.29 11.28C9.07028 10.9978 8.71668 10.8542 8.36239 10.9033C8.00811 10.9525 7.70696 11.1869 7.57239 11.5183C7.43783 11.8497 7.49028 12.2278 7.71 12.51L10.15 15.62C10.3408 15.8615 10.6322 16.0017 10.94 16C11.2495 15.9993 11.5412 15.8552 11.73 15.61Z",fill:"#22C55E"})}),g=({size:r=20,fill:i="#1877F2"})=>e.jsx("svg",{width:r,height:r,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12ZM8.97 8.97C9.11063 8.82955 9.30125 8.75066 9.5 8.75066C9.69875 8.75066 9.88937 8.82955 10.03 8.97L12 10.94L13.97 8.97C14.1122 8.83752 14.3002 8.7654 14.4945 8.76882C14.6888 8.77225 14.8742 8.85097 15.0116 8.98838C15.149 9.12579 15.2277 9.31118 15.2312 9.50548C15.2346 9.69978 15.1625 9.88783 15.03 10.03L13.06 12L15.03 13.97C15.1625 14.1122 15.2346 14.3002 15.2312 14.4945C15.2277 14.6888 15.149 14.8742 15.0116 15.0116C14.8742 15.149 14.6888 15.2277 14.4945 15.2312C14.3002 15.2346 14.1122 15.1625 13.97 15.03L12 13.06L10.03 15.03C9.88783 15.1625 9.69978 15.2346 9.50548 15.2312C9.31118 15.2277 9.12579 15.149 8.98838 15.0116C8.85097 14.8742 8.77225 14.6888 8.76882 14.4945C8.7654 14.3002 8.83752 14.1122 8.97 13.97L10.94 12L8.97 10.03C8.82955 9.88937 8.75066 9.69875 8.75066 9.5C8.75066 9.30125 8.82955 9.11063 8.97 8.97Z",fill:"#FF5630"})});function q(){const r=[{title:e.jsx("div",{className:"relative",children:e.jsx("span",{className:"absolute -top-[11px] -left-8",children:"STT"})}),dataIndex:"stt",key:"stt",width:60,render:(t,n,a)=>e.jsx("span",{children:R(c,l,a)})},{title:e.jsx("div",{className:"!min-w-[100px]",children:"Mã Nhân viên"}),dataIndex:"employee_code",key:"employee_code"},{title:"Tên nhân viên",dataIndex:"employee_name",key:"employee_name"},{title:"Nhóm bán hàng",dataIndex:"sale_group",key:"sale_group",width:200},{title:"Ngày",dataIndex:"create_time",key:"create_time",render:t=>e.jsx("div",{children:F.unix(t).format("DD/MM/YYYY")})},{title:"Thứ",dataIndex:"create_time",key:"create_time",render:t=>e.jsx("div",{children:F.unix(t).format("dddd")})},{title:"Giờ làm",className:"!text-center",dataIndex:"total_work",key:"total_work",render:t=>e.jsx("div",{className:"!text-center",children:parseFloat((t/60).toFixed(2))})},{title:"Giờ viếng thăm",dataIndex:"total_time",className:"!text-center",width:130,key:"total_time",render:t=>e.jsx("div",{className:"!text-center",children:parseFloat((t/60).toFixed(2))})},{title:"Số km tự động (km)",dataIndex:"kmauto",className:"!text-center",key:"kmauto",width:130,render:t=>e.jsx("div",{className:"!text-center",children:t||e.jsx("div",{className:"min-w-[50px]",children:"-"})})},{title:"Số km di chuyển (km)",className:"!text-center",dataIndex:"kmmove",key:"kmmove",width:160,render:t=>e.jsx("div",{className:"!text-center",children:t||e.jsx("div",{className:"min-w-[50px]",children:"-"})})},{title:"Vận tốc (km/h)",dataIndex:"speed",className:"!text-center",key:"kmmove",width:130,render:t=>e.jsx("div",{className:"!text-center",children:t||e.jsx("div",{className:"min-w-[50px]",children:"-"})})}],[i,b]=d.useState([]),[o,D]=d.useState(0),[c,m]=d.useState(1),[L,M]=d.useState(!1),C=B(),x=$(`${X}`),{startDate:h,endDate:u}=S(t=>t.date),{sales_team:p,employee:_,customer_type:k,customer_group:j,territory:v}=S(t=>t.group),R=(t,n,a)=>(t-1)*n+a+1,[N,f]=d.useState({open:!1,id:null}),T=()=>{f({open:!1,id:null})},E=t=>{const n=[{title:"Khách hàng",dataIndex:"customer",key:"customer",render:(a,s)=>e.jsxs(e.Fragment,{children:[e.jsx(e.Fragment,{children:s.customer_name}),e.jsx("div",{className:"text-[#637381]",children:s.customer_code})]})},{title:"Địa chỉ",dataIndex:"customer_address",key:"customer_address",width:200,render:(a,s)=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:s.customer_address})},{title:"Loại hình khách hàng",dataIndex:"customer_type",key:"customer_type",width:200,render:(a,s)=>e.jsx(e.Fragment,{children:s.customer_type})},{title:"Nhóm khách",dataIndex:"customer_group",key:"customer_group",render:(a,s)=>e.jsx(e.Fragment,{children:s.customer_group})},{title:"Số điện thoại",dataIndex:"customer_sdt",key:"customer_sdt",render:(a,s)=>e.jsx(e.Fragment,{children:s.customer_sdt})},{title:"Liên hệ",dataIndex:"customer_contact",key:"customer_contact",render:(a,s)=>e.jsx(e.Fragment,{children:s.customer_contact})},{title:"Checkin",dataIndex:"checkin",className:"!text-center",key:"checkin",render:(a,s)=>e.jsx("div",{className:"!text-center",children:s.checkin})},{title:"Checkout",dataIndex:"checkout",className:"!text-center",key:"checkout",render:(a,s)=>e.jsx("div",{className:"!text-center",children:s.checkout})},{title:"Số giờ viếng thăm",dataIndex:"time_check",key:"time_check",render:a=>e.jsx("div",{className:"!text-center",children:parseFloat((a/60).toFixed(3))})},{title:"Địa chỉ checkin",dataIndex:"checkin_address",key:"checkin_address",render:(a,s)=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:s.checkin_address})},{title:"Khoảng cách",dataIndex:"distance",className:"!text-center",key:"distance",render:(a,s)=>e.jsx("div",{className:"!text-center",children:parseFloat(s.distance).toFixed(2)})},{title:"Thiết bị",dataIndex:"device",key:"device",className:"!text-center",render:a=>e.jsx("div",{className:"!text-center",children:a||"-"})},{title:"Số ảnh chụp",dataIndex:"total_image",className:"!text-center",key:"total_image",render:(a,s)=>e.jsx("div",{className:"!text-center",children:s.total_image})},{title:"Đúng tuyến",dataIndex:"is_router",className:"!text-center",key:"is_router",render:a=>e.jsx("div",{className:"!text-center",children:a==="1"?e.jsx(y,{}):e.jsx(g,{})})},{title:"Đơn hàng",dataIndex:"is_order",className:"!text-center",key:"is_order",render:a=>e.jsx("div",{className:"!text-center",children:a==="1"?e.jsx(y,{}):e.jsx(g,{})})},{title:"Ghi tồn",dataIndex:"is_check_inventory",className:"!text-center",key:"is_check_inventory",render:a=>e.jsx("div",{className:"!text-center",children:a==="1"?e.jsx(y,{}):e.jsx(g,{})})},{title:"Ghi chú",dataIndex:"checkin_id",key:"checkin_id",render:a=>e.jsx("div",{className:"!text-left",children:a?e.jsx("div",{onClick:()=>{f({open:!0,id:a})},className:"text-[#1877F2] text-sm font-medium- !text-left cursor-pointer underline",children:"Xem ghi chú"}):"-"})}];return e.jsx(Y,{bordered:!0,dataSource:t?.customers?.map(a=>{let s=Math.random();return{...a,key:s}}),scroll:{x:2700,y:280},columns:n,pagination:!1})};return d.useEffect(()=>{(async()=>{const t=await G.get("/api/method/mbw_dms.api.report.checkin_report.checkin_report_info",{params:{page_size:l,page_number:c,startDate:h,endDate:u,employee:_,sales_team:p,territory:v,customer_group:j,customer_type:k}});let{result:n}=t;b(n),D(n?.totals)})()},[c,h,u,L,p,_,j,k]),e.jsx(e.Fragment,{children:e.jsxs(z,{header:e.jsx(A,{setRefresh:M,title:"Báo cáo viếng thăm",params:{report_type:"Report Customer",data_filter:{customer_type:k,customer_group:j,territory:v,sales_person:_,sales_team:p,startDate:h,endDate:u}},file_name:"Report Sell.xlsx"}),children:[e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7  border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(w,{gutter:[16,16],className:`flex ${x?"justify-end":"justify-between"} items-center w-full`,children:[!x&&e.jsx(I,{className:"ml-4 w-[78%]",children:e.jsx(w,{gutter:[8,8],className:"space-x-4",children:e.jsx(H,{setPage:m,inputFromDate:!0,inputToDate:!0,inputSaleGroup:!0,inputEmployee:!0})})}),e.jsx(I,{className:"!ml-4",children:e.jsx(Q,{inputCustomerType:!0,inputCustomerGroup:!0,inputTerritory:!0,inputFromDate:!0,inputToDate:!0,inputSaleGroup:!0,inputEmployee:!0,setPage:m,matchMedia:!x})})]}),e.jsx("div",{className:"pt-5",children:e.jsx(P,{bordered:!0,$border:!0,dataSource:i?.data?.map(t=>({key:t.name,...t})),pagination:o&&o>l?{pageSize:l,showSizeChanger:!1,total:o,current:c,onChange(t){m(t)}}:!1,scroll:{x:i?.data?.length>0||C?.w<1567?!0:void 0,y:i?.data?.length>0?C?.h*.55:void 0},columns:r,expandable:{expandedRowRender:E,defaultExpandedRowKeys:["0"]}})})]}),e.jsx(K,{title:e.jsx("div",{className:"font-bold text-lg leading-7 text-[#212B36] p-4",children:"Ghi chú"}),open:N.open,onCancel:T,footer:!1,width:800,children:e.jsx(V,{id:N.id})})]})})}function ne(){return e.jsxs(e.Fragment,{children:[e.jsx(Z,{children:e.jsx("title",{children:" ReportCheckin"})}),e.jsx(q,{})]})}export{ne as default};
