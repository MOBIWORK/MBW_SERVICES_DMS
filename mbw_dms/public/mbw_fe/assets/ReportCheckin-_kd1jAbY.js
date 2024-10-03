import{L as e,Y as a,a_ as Ne,a1 as h,a6 as be,a7 as we,bD as Se,R as S,P as d,aa as Fe,a2 as p,a9 as De,N as y,Q as f,ab as Ie,V as l,aZ as A,bE as Te,ad as Ee}from"./index-a9Kaz5n6.js";import{D as Le}from"./index-p-hUk-I3.js";import{u as Me,C as Re}from"./index-HIRY1dSd.js";import{u as F}from"./useDebount-OA5qO3Xw.js";import{e as Ye}from"./data-u-VkVTNg.js";import{a as Ge,b as Be}from"./index.esm-WEXRQ1jl.js";import{M as ze}from"./ModalCheckin-v5RPXPIg.js";import{D as Oe}from"./Detailmodal-oA8LbAj9.js";import{D as P}from"./index-6ryrl00H.js";import{S as Ve}from"./SyncOutlined-QycIEBs_.js";import{V as Ke}from"./VerticalAlignBottomOutlined-7Pj6qBFA.js";const D=({size:c=20,fill:j="#1877F2"})=>e.jsx("svg",{width:c,height:c,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M2 12C2 6.47715 6.47715 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.73 15.61L16.3 9.61V9.58C16.5179 9.29419 16.5668 8.91382 16.4283 8.58218C16.2897 8.25054 15.9848 8.01801 15.6283 7.97218C15.2718 7.92635 14.9179 8.07419 14.7 8.36L10.92 13.36L9.29 11.28C9.07028 10.9978 8.71668 10.8542 8.36239 10.9033C8.00811 10.9525 7.70696 11.1869 7.57239 11.5183C7.43783 11.8497 7.49028 12.2278 7.71 12.51L10.15 15.62C10.3408 15.8615 10.6322 16.0017 10.94 16C11.2495 15.9993 11.5412 15.8552 11.73 15.61Z",fill:"#22C55E"})}),I=({size:c=20,fill:j="#1877F2"})=>e.jsx("svg",{width:c,height:c,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12ZM8.97 8.97C9.11063 8.82955 9.30125 8.75066 9.5 8.75066C9.69875 8.75066 9.88937 8.82955 10.03 8.97L12 10.94L13.97 8.97C14.1122 8.83752 14.3002 8.7654 14.4945 8.76882C14.6888 8.77225 14.8742 8.85097 15.0116 8.98838C15.149 9.12579 15.2277 9.31118 15.2312 9.50548C15.2346 9.69978 15.1625 9.88783 15.03 10.03L13.06 12L15.03 13.97C15.1625 14.1122 15.2346 14.3002 15.2312 14.4945C15.2277 14.6888 15.149 14.8742 15.0116 15.0116C14.8742 15.149 14.6888 15.2277 14.4945 15.2312C14.3002 15.2346 14.1122 15.1625 13.97 15.03L12 13.06L10.03 15.03C9.88783 15.1625 9.69978 15.2346 9.50548 15.2312C9.31118 15.2277 9.12579 15.149 8.98838 15.0116C8.85097 14.8742 8.77225 14.6888 8.76882 14.4945C8.7654 14.3002 8.83752 14.1122 8.97 13.97L10.94 12L8.97 10.03C8.82955 9.88937 8.75066 9.69875 8.75066 9.5C8.75066 9.30125 8.82955 9.11063 8.97 8.97Z",fill:"#FF5630"})}),Z=l().startOf("month"),H=l().endOf("month");let Ae=Date.parse(Z.$d)/1e3,Pe=Date.parse(H.$d)/1e3;function Ze(){const c=[{title:e.jsx("div",{className:"relative",children:e.jsx("span",{className:"absolute -top-[11px] -left-8",children:"STT"})}),dataIndex:"stt",key:"stt",width:60,render:(t,n,s)=>e.jsx("span",{children:ye(u,x,s)})},{title:"Mã nhân viên",dataIndex:"employee_code",key:"employee_code"},{title:"Tên nhân viên",dataIndex:"employee_name",key:"employee_name"},{title:"Nhóm bán hàng",dataIndex:"sale_group",key:"sale_group",width:200},{title:"Ngày",dataIndex:"create_time",key:"create_time",render:t=>e.jsx("div",{children:l.unix(t).format("DD/MM/YYYY")})},{title:"Thứ",dataIndex:"create_time",key:"create_time",render:t=>e.jsx("div",{children:l.unix(t).format("dddd")})},{title:"Giờ làm",className:"!text-center",dataIndex:"total_work",key:"total_work",render:t=>e.jsx("div",{className:"!text-center",children:parseFloat((t/60).toFixed(2))})},{title:"Giờ viếng thăm",dataIndex:"total_time",className:"!text-center",key:"total_time",render:t=>e.jsx("div",{className:"!text-center",children:parseFloat((t/60).toFixed(2))})},{title:"Số km tự động (km)",dataIndex:"kmauto",className:"!text-center",key:"kmauto",render:t=>e.jsx("div",{className:"!text-center",children:t||e.jsx("div",{className:"min-w-[50px]",children:"-"})})},{title:"Số km di chuyển (km)",className:"!text-center",dataIndex:"kmmove",key:"kmmove",render:t=>e.jsx("div",{className:"!text-center",children:t||e.jsx("div",{className:"min-w-[50px]",children:"-"})})},{title:"Vận tốc (km/h)",dataIndex:"speed",className:"!text-center",key:"kmmove",render:t=>e.jsx("div",{className:"!text-center",children:t||e.jsx("div",{className:"min-w-[50px]",children:"-"})})}],[j,$]=a.useState([]),[_,X]=a.useState(0),x=20,[u,k]=a.useState(1),[q,Q]=a.useState([]),[W,J]=a.useState([]),[m,U]=a.useState(),[g]=Ne(),[ee,te]=a.useState(""),[C,T]=a.useState(),[o,E]=a.useState(Ae),[i,L]=a.useState(Pe);let M=F(ee);const[se,ae]=a.useState(!1),[v,R]=a.useState(""),[re,ne]=a.useState([]),[N,Y]=a.useState(""),[le,ce]=a.useState("");let G=F(le,500);const[B,z]=a.useState(""),[oe,ie]=a.useState([]),[de,me]=a.useState("");let O=F(de,500);const b=a.useRef(null),w=Me(),[he,xe]=a.useState(0),[ue,pe]=a.useState(w?.h*.52),ye=(t,n,s)=>(t-1)*n+s+1,[V,K]=a.useState({open:!1,id:null}),fe=()=>{K({open:!1,id:null})};a.useEffect(()=>{pe(w.h*.52)},[w]),a.useEffect(()=>{const t=b.current;if(t){const n=new ResizeObserver(s=>{for(let r of s)xe(r.contentRect.height)});return n.observe(t),()=>n.disconnect()}},[b]);const je=t=>{if(t==null)E("");else if(i&&t&&t.isAfter(l.unix(i),"day"))A.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let n=Date.parse(t.$d)/1e3;E(n)}},_e=t=>{if(t==null)L("");else if(o&&t&&t.isBefore(l.unix(o),"day"))A.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let n=Date.parse(t.$d)/1e3;L(n)}},ke=t=>i?t&&t.isAfter(l.unix(i),"day"):!1,ge=t=>o?t&&t.isBefore(l.unix(o),"day"):!1,Ce=t=>{t.customergroup?Y(t.customergroup):Y(""),t.customertype?R(t.customertype):R(""),t.territory?z(t.territory):z(""),k(1)};a.useEffect(()=>{(async()=>{let t=await h.get("/api/method/mbw_dms.api.router.get_team_sale");J(be({data:t.result.map(n=>({title:n.name,value:n.name,...n})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),a.useEffect(()=>{(async()=>{let t=await h.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:m,key_search:M}}),{message:n}=t;Q(n.map(s=>({value:s.employee_code,label:s.employee_name||s.employee_code})))})()},[m,M]),a.useEffect(()=>{(async()=>{let t=await h.get("/api/method/frappe.desk.search.search_link",{params:{txt:G,doctype:"Customer Group",ignore_user_permissions:0,query:""}}),{message:n}=t;ne(n.map(s=>({value:s.value.trim(),label:s.value.trim()})))})()},[G]),a.useEffect(()=>{(async()=>{let t=await h.get("/api/method/frappe.desk.search.search_link",{params:{txt:O,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:n}=t;ie(n.map(s=>({value:s.value,label:s.value})))})()},[O]);const ve=t=>{const n=[{title:"Khách hàng",dataIndex:"customer",key:"customer",render:(s,r)=>e.jsxs("div",{children:[e.jsx("div",{children:r.customer_name}),e.jsx("div",{className:"text-[#637381]",children:r.customer_code})]})},{title:"Địa chỉ",dataIndex:"customer_address",key:"customer_address",width:200,render:(s,r)=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:r.customer_address})},{title:"Loại hình khách hàng",dataIndex:"customer_type",key:"customer_type",width:200,render:(s,r)=>e.jsx("div",{children:r.customer_type})},{title:"Nhóm khách",dataIndex:"customer_group",key:"customer_group",render:(s,r)=>e.jsx("div",{children:r.customer_group})},{title:"Số điện thoại",dataIndex:"customer_sdt",key:"customer_sdt",render:(s,r)=>e.jsx("div",{children:r.customer_sdt})},{title:"Liên hệ",dataIndex:"customer_contact",key:"customer_contact",render:(s,r)=>e.jsx("div",{children:r.customer_contact})},{title:"Checkin",dataIndex:"checkin",className:"!text-center",key:"checkin",render:(s,r)=>e.jsx("div",{className:"!text-center",children:r.checkin})},{title:"Checkout",dataIndex:"checkout",className:"!text-center",key:"checkout",render:(s,r)=>e.jsx("div",{className:"!text-center",children:r.checkout})},{title:"Số giờ viếng thăm",dataIndex:"time_check",key:"time_check",render:s=>e.jsx("div",{className:"!text-center",children:parseFloat((s/60).toFixed(2))})},{title:"Địa chỉ checkin",dataIndex:"checkin_address",key:"checkin_address",render:(s,r)=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:r.checkin_address})},{title:"Khoảng cách",dataIndex:"distance",className:"!text-center",key:"distance",render:(s,r)=>e.jsx("div",{className:"!text-center",children:parseFloat(r.distance).toFixed(2)})},{title:"Thiết bị",dataIndex:"device",key:"device",className:"!text-center",render:s=>e.jsx("div",{className:"!text-center",children:s||"-"})},{title:"Số ảnh chụp",dataIndex:"total_image",className:"!text-center",key:"total_image",render:(s,r)=>e.jsx("div",{className:"!text-center",children:r.total_image})},{title:"Đúng tuyến",dataIndex:"is_router",className:"!text-center",key:"is_router",render:s=>e.jsx("div",{className:"!text-center",children:s==="1"?e.jsx(D,{}):e.jsx(I,{})})},{title:"Đơn hàng",dataIndex:"is_order",className:"!text-center",key:"is_order",render:s=>e.jsx("div",{className:"!text-center",children:s==="1"?e.jsx(D,{}):e.jsx(I,{})})},{title:"Ghi tồn",dataIndex:"is_check_inventory",className:"!text-center",key:"is_check_inventory",render:s=>e.jsx("div",{className:"!text-center",children:s==="1"?e.jsx(D,{}):e.jsx(I,{})})},{title:"Ghi chú",dataIndex:"checkin_id",key:"checkin_id",render:s=>e.jsx("div",{className:"!text-left",children:s?e.jsx("div",{onClick:()=>{K({open:!0,id:s})},className:"text-[#1877F2] text-sm font-medium- !text-left cursor-pointer underline",children:"Xem ghi chú"}):"-"})}];return e.jsx(Te,{bordered:!0,dataSource:t?.customers?.map(s=>{let r=Math.random();return{...s,key:r}}),scroll:{x:2700,y:280},columns:n,pagination:!1})};return a.useEffect(()=>{(async()=>{const t=await h.get("/api/method/mbw_dms.api.report.checkin_report.checkin_report_info",{params:{page_size:x,page_number:u,from_date:o,to_date:i,employee:C,sales_team:m,territory:B,customer_group:N,customer_type:v}});let{result:n}=t;$(n),X(n?.totals)})()},[u,o,i,se,m,C,N,v]),e.jsx(e.Fragment,{children:e.jsxs(Re,{header:e.jsx(we,{title:"Báo cáo viếng thăm",buttons:[{icon:e.jsx(Ve,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{ae(t=>!t)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(Ke,{className:"text-xl"}),size:"18px",className:"flex items-center",action:Se.bind(null,{url:"/api/method/mbw_dms.api.exports.export_excel.export_excel",params:{report_type:"Report Checkin",data_filter:{from_date:o,to_date:i,employee:C,sales_team:m,territory:B,customer_group:N,customer_type:v}},file_name:"checkin-report.xlsx"})}]}),children:[e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7  border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(S,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(d,{className:"ml-4",children:e.jsxs(S,{gutter:[8,8],children:[e.jsx(d,{span:5,children:e.jsx(P,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:je,defaultValue:Z,disabledDate:ke})}),e.jsx(d,{span:5,children:e.jsx(P,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:_e,placeholder:"Đến ngày",defaultValue:H,disabledDate:ge})}),e.jsx(d,{span:7,children:e.jsx(Fe,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:W,onChange:t=>{U(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(d,{span:7,children:e.jsx(p,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{te(t)},options:q,onSelect:t=>{T(t),k(1)},onClear:()=>{T("")}})})]})}),e.jsx(d,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(De,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(Le,{title:"Bộ lọc",children:[e.jsx("div",{className:"",children:e.jsxs(y,{layout:"vertical",form:g,onFinish:Ce,children:[e.jsx(y.Item,{name:"customertype",label:"Loại hình khách hàng",className:"w-[468px] border-none",children:e.jsx(p,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Ye,allowClear:!0,showSearch:!0,placeholder:"Tất cả loại hình khách hàng"})}),e.jsx(y.Item,{name:"customergroup",label:"Nhóm khách hàng",className:"w-[468px] border-none",children:e.jsx(p,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:re,allowClear:!0,onSearch:t=>{ce(t)},showSearch:!0,placeholder:"Tất cả nhóm khách hàng"})}),e.jsx(y.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:e.jsx(p,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:oe,allowClear:!0,onSearch:t=>{me(t)},showSearch:!0,placeholder:"Tất cẩ khu vực"})})]})}),e.jsxs(S,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(f,{className:"mr-3",onClick:t=>{t.preventDefault(),g.resetFields()},children:"Đặt lại"}),e.jsx(f,{type:"primary",onClick:()=>{g.submit()},children:"Áp dụng"})]})]})]}),children:e.jsx(f,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8",icon:e.jsx(Ge,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(f,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(Be,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:b,className:"pt-5",children:e.jsx(Ie,{bordered:!0,$border:!0,dataSource:j?.data?.map(t=>({key:t.name,...t})),pagination:_&&_>x?{pageSize:x,showSizeChanger:!1,total:_,current:u,onChange(t){k(t)}}:!1,scroll:{x:!0,y:he<300?void 0:ue},columns:c,expandable:{expandedRowRender:ve,defaultExpandedRowKeys:["0"]}})})]}),e.jsx(ze,{title:e.jsx("div",{className:"font-bold text-lg leading-7 text-[#212B36] p-4",children:"Ghi chú"}),open:V.open,onCancel:fe,footer:!1,width:800,children:e.jsx(Oe,{id:V.id})})]})})}function at(){return e.jsxs(e.Fragment,{children:[e.jsx(Ee,{children:e.jsx("title",{children:" ReportCheckin"})}),e.jsx(Ze,{})]})}export{at as default};
