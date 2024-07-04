import{L as e,Y as r,aX as ye,a1 as i,a6 as fe,R as v,P as o,a8 as ge,a2 as h,a7 as ke,N as u,Q as x,a9 as je,V as f,bz as _e,ab as Ce}from"./index-amIoYoEJ.js";import{D as ve}from"./index-LyvhNVLA.js";import{u as be,C as Ne}from"./index-OqD8TjCR.js";import{u as b}from"./useDebount-DWyCeajl.js";import{t as Se}from"./index-8jwsCspI.js";import{e as we}from"./data-u-VkVTNg.js";import{a as Fe,b as Ie}from"./index.esm-PwtNALKc.js";import{D as V}from"./index-WliiPz_o.js";import{S as Te}from"./SyncOutlined-lekVOEIz.js";import{V as De}from"./VerticalAlignBottomOutlined-Ln-uhiaP.js";const N=({size:n=20,fill:d="#1877F2"})=>e.jsx("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M2 12C2 6.47715 6.47715 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.73 15.61L16.3 9.61V9.58C16.5179 9.29419 16.5668 8.91382 16.4283 8.58218C16.2897 8.25054 15.9848 8.01801 15.6283 7.97218C15.2718 7.92635 14.9179 8.07419 14.7 8.36L10.92 13.36L9.29 11.28C9.07028 10.9978 8.71668 10.8542 8.36239 10.9033C8.00811 10.9525 7.70696 11.1869 7.57239 11.5183C7.43783 11.8497 7.49028 12.2278 7.71 12.51L10.15 15.62C10.3408 15.8615 10.6322 16.0017 10.94 16C11.2495 15.9993 11.5412 15.8552 11.73 15.61Z",fill:"#22C55E"})}),S=({size:n=20,fill:d="#1877F2"})=>e.jsx("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12ZM8.97 8.97C9.11063 8.82955 9.30125 8.75066 9.5 8.75066C9.69875 8.75066 9.88937 8.82955 10.03 8.97L12 10.94L13.97 8.97C14.1122 8.83752 14.3002 8.7654 14.4945 8.76882C14.6888 8.77225 14.8742 8.85097 15.0116 8.98838C15.149 9.12579 15.2277 9.31118 15.2312 9.50548C15.2346 9.69978 15.1625 9.88783 15.03 10.03L13.06 12L15.03 13.97C15.1625 14.1122 15.2346 14.3002 15.2312 14.4945C15.2277 14.6888 15.149 14.8742 15.0116 15.0116C14.8742 15.149 14.6888 15.2277 14.4945 15.2312C14.3002 15.2346 14.1122 15.1625 13.97 15.03L12 13.06L10.03 15.03C9.88783 15.1625 9.69978 15.2346 9.50548 15.2312C9.31118 15.2277 9.12579 15.149 8.98838 15.0116C8.85097 14.8742 8.77225 14.6888 8.76882 14.4945C8.7654 14.3002 8.83752 14.1122 8.97 13.97L10.94 12L8.97 10.03C8.82955 9.88937 8.75066 9.69875 8.75066 9.5C8.75066 9.30125 8.82955 9.11063 8.97 8.97Z",fill:"#FF5630"})}),p=f().startOf("month"),y=f().endOf("month");let Le=Date.parse(p.$d)/1e3,Ee=Date.parse(y.$d)/1e3;const Re=[{title:e.jsx("div",{className:"relative",children:e.jsx("span",{className:"absolute -top-[11px] -left-8",children:"STT"})}),dataIndex:"stt",key:"stt",render:(n,d,c)=>c+1},{title:"Mã nhân viên",dataIndex:"employee_code",key:"employee_code"},{title:"Tên nhân viên",dataIndex:"employee_name",key:"employee_name"},{title:"Nhóm bán hàng",dataIndex:"sale_group",key:"sale_group"},{title:"Ngày",dataIndex:"create_time",key:"create_time",render:n=>e.jsx("div",{children:f.unix(n).format("DD/MM/YYYY")})},{title:"Thứ",dataIndex:"create_time",key:"create_time",render:n=>e.jsx("div",{children:f.unix(n).format("dddd")})},{title:"Giờ làm",className:"!text-center",dataIndex:"total_time",key:"total_time",render:n=>e.jsx("div",{className:"!text-center",children:parseFloat((n/60).toFixed(2))})},{title:"Giờ viếng thăm",dataIndex:"total_work",className:"!text-center",key:"total_work",render:n=>e.jsx("div",{className:"!text-center",children:parseFloat((n/60).toFixed(2))})},{title:"Số km tự động (km)",dataIndex:"kmauto",className:"!text-center",key:"kmauto",render:n=>e.jsx("div",{className:"!text-center",children:n||"-"})},{title:"Số km di chuyển (km)",className:"!text-center",dataIndex:"kmmove",key:"kmmove",render:n=>e.jsx("div",{className:"!text-center",children:n||"-"})},{title:"Vận tốc (km/h)",dataIndex:"speed",className:"!text-center",key:"kmmove",render:n=>e.jsx("div",{className:"!text-center",children:n||"-"})}];function Ye(){const[n,d]=r.useState([]),[c,K]=r.useState(0),g=20,[k,P]=r.useState(1),[A,H]=r.useState([]),[Z,$]=r.useState([]),[m,X]=r.useState(),[j]=ye(),[q,Q]=r.useState(""),[w,F]=r.useState(),[I,T]=r.useState(Le),[D,L]=r.useState(Ee);let E=b(q);const[W,J]=r.useState(!1),[R,Y]=r.useState(""),[U,ee]=r.useState([]),[M,G]=r.useState(""),[te,se]=r.useState("");let z=b(te,500);const[re,O]=r.useState(""),[ae,ne]=r.useState([]),[le,oe]=r.useState("");let B=b(le,500);const _=r.useRef(null),C=be(),[ce,ie]=r.useState(0),[de,me]=r.useState(C?.h*.52);r.useEffect(()=>{me(C.h*.52)},[C]),r.useEffect(()=>{const t=_.current;if(t){const l=new ResizeObserver(s=>{for(let a of s)ie(a.contentRect.height)});return l.observe(t),()=>l.disconnect()}},[_]);const he=t=>{if(t==null)T("");else if(y&&t&&t.isAfter(y,"day"))message.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let l=Date.parse(t.$d)/1e3;T(l)}},ue=t=>{if(t==null)L("");else if(p&&t&&t.isBefore(p,"day"))message.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let l=Date.parse(t.$d)/1e3;L(l)}},xe=t=>{t.customergroup?G(t.customergroup):G(""),t.customertype?Y(t.customertype):Y(""),t.territory?O(t.territory):O("")};r.useEffect(()=>{(async()=>{let t=await i.get("/api/method/mbw_dms.api.router.get_team_sale");$(Se({data:t.result.map(l=>({title:l.name,value:l.name,...l})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),r.useEffect(()=>{(async()=>{let t=await i.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:m,key_search:E}}),{message:l}=t;H(l.map(s=>({value:s.employee_code,label:s.employee_name||s.employee_code})))})()},[m,E]),r.useEffect(()=>{(async()=>{let t=await i.get("/api/method/frappe.desk.search.search_link",{params:{txt:z,doctype:"Customer Group",ignore_user_permissions:0,query:""}}),{message:l}=t;ee(l.map(s=>({value:s.value.trim(),label:s.value.trim()})))})()},[z]),r.useEffect(()=>{(async()=>{let t=await i.get("/api/method/frappe.desk.search.search_link",{params:{txt:B,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:l}=t;ne(l.map(s=>({value:s.value,label:s.value})))})()},[B]);const pe=t=>{const l=[{title:"Khách hàng",dataIndex:"customer",key:"customer",render:(s,a)=>e.jsxs("div",{children:[e.jsx("div",{children:a.customer_name}),e.jsx("div",{className:"text-[#637381]",children:a.customer_code})]})},{title:"Địa chỉ",dataIndex:"customer_address",key:"customer_address",render:(s,a)=>e.jsx("div",{className:"truncate",children:a.customer_address})},{title:"Loại khách",dataIndex:"customer_type",key:"customer_type",render:(s,a)=>e.jsx("div",{children:a.customer_type})},{title:"Nhóm khách",dataIndex:"customer_group",key:"customer_group",render:(s,a)=>e.jsx("div",{children:a.customer_group})},{title:"Số điện thoại",dataIndex:"customer_sdt",key:"customer_sdt",render:(s,a)=>e.jsx("div",{children:a.customer_sdt})},{title:"Liên hệ",dataIndex:"customer_contact",key:"customer_contact",render:(s,a)=>e.jsx("div",{children:a.customer_contact})},{title:"Checkin",dataIndex:"checkin",key:"checkin",render:(s,a)=>e.jsx("div",{className:"!text-center",children:a.checkin})},{title:"Checkout",dataIndex:"checkout",key:"checkout",render:(s,a)=>e.jsx("div",{className:"!text-center",children:a.checkout})},{title:"Số giờ viếng thăm",dataIndex:"time_check",key:"time_check",render:s=>e.jsx("div",{className:"!text-center",children:parseFloat((s/60).toFixed(2))})},{title:"Địa chỉ checkin",dataIndex:"checkin_address",key:"checkin_address",render:(s,a)=>e.jsx("div",{children:a.checkin_address})},{title:"Khoảng cách",dataIndex:"distance",key:"distance",render:(s,a)=>e.jsx("div",{className:"!text-center",children:parseFloat(a.distance).toFixed(2)})},{title:"Thiết bị",dataIndex:"device",key:"device",render:s=>e.jsx("div",{className:"!text-center",children:s||"-"})},{title:"Số ảnh chụp",dataIndex:"total_image",key:"total_image",render:(s,a)=>e.jsx("div",{className:"!text-center",children:a.total_image})},{title:"Đúng tuyến",dataIndex:"is_router",key:"is_router",render:s=>e.jsx("div",{className:"!text-center",children:s==="1"?e.jsx(N,{}):e.jsx(S,{})})},{title:"Đơn hàng",dataIndex:"is_order",key:"is_order",render:s=>e.jsx("div",{className:"!text-center",children:s==="1"?e.jsx(N,{}):e.jsx(S,{})})},{title:"Ghi tồn",dataIndex:"is_check_inventory",key:"is_check_inventory",render:s=>e.jsx("div",{className:"!text-center",children:s==="1"?e.jsx(N,{}):e.jsx(S,{})})},{title:"Ghi chú",dataIndex:"note",key:"note",render:s=>e.jsx("div",{className:"!text-center",children:s||"-"})}];return e.jsx(_e,{dataSource:t?.customers?.map(s=>{let a=Math.random();return{...s,key:a}}),columns:l,pagination:!1})};return r.useEffect(()=>{(async()=>{const t=await i.get("/api/method/mbw_dms.api.report.checkin_report.checkin_report_info",{params:{page_size:g,page_number:k,from_date:I,to_date:D,employee:w,sale_group:m,territory:re,customer_group:M,customer_type:R}});let{result:l}=t;d(l),K(l?.totals)})()},[k,I,D,W,m,w,M,R]),e.jsx(e.Fragment,{children:e.jsx(Ne,{header:e.jsx(fe,{title:"Báo cáo viếng thăm",buttons:[{icon:e.jsx(Te,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{J(t=>!t)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(De,{className:"text-xl"}),size:"18px",className:"flex items-center"}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7  border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(v,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(o,{className:"ml-4",children:e.jsxs(v,{gutter:[8,8],children:[e.jsx(o,{span:5,children:e.jsx(V,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:he,defaultValue:p})}),e.jsx(o,{span:5,children:e.jsx(V,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:ue,placeholder:"Đến ngày",defaultValue:y})}),e.jsx(o,{span:7,children:e.jsx(ge,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:Z,onChange:t=>{X(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(o,{span:7,children:e.jsx(h,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{Q(t)},options:A,onSelect:t=>{F(t)},onClear:()=>{F("")}})})]})}),e.jsx(o,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(ke,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(ve,{title:"Bộ lọc",children:[e.jsx("div",{className:"",children:e.jsxs(u,{layout:"vertical",form:j,onFinish:xe,children:[e.jsx(u.Item,{name:"customertype",label:"Loại khách hàng",className:"w-[468px] border-none",children:e.jsx(h,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:we,allowClear:!0,showSearch:!0,placeholder:"Tất cả loại khách hàng"})}),e.jsx(u.Item,{name:"customergroup",label:"Nhóm khách hàng",className:"w-[468px] border-none",children:e.jsx(h,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:U,allowClear:!0,onSearch:t=>{se(t)},showSearch:!0,placeholder:"Tất cả nhóm khách hàng"})}),e.jsx(u.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:e.jsx(h,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:ae,allowClear:!0,onSearch:t=>{oe(t)},showSearch:!0,placeholder:"Tất cẩ khu vực"})})]})}),e.jsxs(v,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(x,{className:"mr-3",onClick:t=>{t.preventDefault(),j.resetFields()},children:"Đặt lại"}),e.jsx(x,{type:"primary",onClick:()=>{j.submit()},children:"Áp dụng"})]})]})]}),children:e.jsx(x,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8",icon:e.jsx(Fe,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(x,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(Ie,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:_,className:"pt-5",children:e.jsx(je,{bordered:!0,dataSource:n?.data?.map(t=>({key:t.name,...t})),pagination:c&&c>g?{pageSize:g,showSizeChanger:!1,total:c,current:k,onChange(t){P(t)}}:!1,scroll:{x:!0,y:ce<300?void 0:de},columns:Re,expandable:{expandedRowRender:pe,defaultExpandedRowKeys:["0"]}})})]})})})}function Ze(){return e.jsxs(e.Fragment,{children:[e.jsx(Ce,{children:e.jsx("title",{children:" ReportCheckin"})}),e.jsx(Ye,{})]})}export{Ze as default};
