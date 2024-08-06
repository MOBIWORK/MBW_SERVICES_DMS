import{L as e,Y as r,a1 as y,a9 as X,V as c,aX as ve,a6 as Ne,R as F,P as p,a8 as be,a2 as _,a7 as Se,N as C,Q as v,aW as Z,bz as we,ab as Fe}from"./index-Mo0-XoyY.js";import{D as De}from"./index-nLn5O6nh.js";import{u as Ie,C as Te}from"./index-Y-x6fokS.js";import{u as D}from"./useDebount-iu3rZbcr.js";import{t as Ee}from"./index-sLGmbo2F.js";import{e as Le}from"./data-u-VkVTNg.js";import{a as Me,b as Ye}from"./index.esm-7WjAX-Yf.js";import{M as Re}from"./ModalCheckin-ZAgDc1MI.js";import{D as $}from"./index-tLJk46mW.js";import{S as Ge}from"./SyncOutlined-swtqQf5a.js";import{V as ze}from"./VerticalAlignBottomOutlined-firTDsiC.js";const I=({size:a=20,fill:h="#1877F2"})=>e.jsx("svg",{width:a,height:a,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M2 12C2 6.47715 6.47715 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.73 15.61L16.3 9.61V9.58C16.5179 9.29419 16.5668 8.91382 16.4283 8.58218C16.2897 8.25054 15.9848 8.01801 15.6283 7.97218C15.2718 7.92635 14.9179 8.07419 14.7 8.36L10.92 13.36L9.29 11.28C9.07028 10.9978 8.71668 10.8542 8.36239 10.9033C8.00811 10.9525 7.70696 11.1869 7.57239 11.5183C7.43783 11.8497 7.49028 12.2278 7.71 12.51L10.15 15.62C10.3408 15.8615 10.6322 16.0017 10.94 16C11.2495 15.9993 11.5412 15.8552 11.73 15.61Z",fill:"#22C55E"})}),T=({size:a=20,fill:h="#1877F2"})=>e.jsx("svg",{width:a,height:a,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12ZM8.97 8.97C9.11063 8.82955 9.30125 8.75066 9.5 8.75066C9.69875 8.75066 9.88937 8.82955 10.03 8.97L12 10.94L13.97 8.97C14.1122 8.83752 14.3002 8.7654 14.4945 8.76882C14.6888 8.77225 14.8742 8.85097 15.0116 8.98838C15.149 9.12579 15.2277 9.31118 15.2312 9.50548C15.2346 9.69978 15.1625 9.88783 15.03 10.03L13.06 12L15.03 13.97C15.1625 14.1122 15.2346 14.3002 15.2312 14.4945C15.2277 14.6888 15.149 14.8742 15.0116 15.0116C14.8742 15.149 14.6888 15.2277 14.4945 15.2312C14.3002 15.2346 14.1122 15.1625 13.97 15.03L12 13.06L10.03 15.03C9.88783 15.1625 9.69978 15.2346 9.50548 15.2312C9.31118 15.2277 9.12579 15.149 8.98838 15.0116C8.85097 14.8742 8.77225 14.6888 8.76882 14.4945C8.7654 14.3002 8.83752 14.1122 8.97 13.97L10.94 12L8.97 10.03C8.82955 9.88937 8.75066 9.69875 8.75066 9.5C8.75066 9.30125 8.82955 9.11063 8.97 8.97Z",fill:"#FF5630"})}),Be=[{title:"Thời gian",dataIndex:"creation",key:"creation",render:a=>e.jsxs(e.Fragment,{children:[e.jsx("div",{children:c(a).format("HH:mm:ss")}),e.jsx("div",{children:c(a).format("DD/MM/YYYY")})]})},{title:"Loại ghi chú",dataIndex:"title",key:"title"},{title:"Nội dung",dataIndex:"content",key:"content",render:a=>e.jsx("div",{className:"whitespace-normal",children:a})}];function Oe(a){const[h,i]=r.useState([]),[f,g]=r.useState(0),d=20,[m,N]=r.useState(1);return r.useEffect(()=>{(async()=>{const o=await y.get("/api/method/mbw_dms.api.note.list_note",{params:{custom_checkin_id:a?.id,page_size:d,page_number:m}});let{result:j}=o;g(j?.totals),i(j)})()},[a,m]),e.jsx(e.Fragment,{children:e.jsx(X,{bordered:!0,$border:!0,dataSource:h?.data?.map(o=>({key:o.name,...o})),pagination:f&&f>d?{pageSize:d,showSizeChanger:!1,total:f,current:m,onChange(o){N(o)}}:!1,columns:Be})})}const q=c().startOf("month"),W=c().endOf("month");let Pe=Date.parse(q.$d)/1e3,Ve=Date.parse(W.$d)/1e3;const Ae=[{title:e.jsx("div",{className:"relative",children:e.jsx("span",{className:"absolute -top-[11px] -left-8",children:"STT"})}),dataIndex:"stt",key:"stt",render:(a,h,i)=>i+1},{title:"Mã nhân viên",dataIndex:"employee_code",key:"employee_code"},{title:"Tên nhân viên",dataIndex:"employee_name",key:"employee_name"},{title:"Nhóm bán hàng",dataIndex:"sale_group",key:"sale_group"},{title:"Ngày",dataIndex:"create_time",key:"create_time",render:a=>e.jsx("div",{children:c.unix(a).format("DD/MM/YYYY")})},{title:"Thứ",dataIndex:"create_time",key:"create_time",render:a=>e.jsx("div",{children:c.unix(a).format("dddd")})},{title:"Giờ làm",className:"!text-center",dataIndex:"total_time",key:"total_time",render:a=>e.jsx("div",{className:"!text-center",children:parseFloat((a/60).toFixed(2))})},{title:"Giờ viếng thăm",dataIndex:"total_work",className:"!text-center",key:"total_work",render:a=>e.jsx("div",{className:"!text-center",children:parseFloat((a/60).toFixed(2))})},{title:"Số km tự động (km)",dataIndex:"kmauto",className:"!text-center",key:"kmauto",render:a=>e.jsx("div",{className:"!text-center",children:a||e.jsx("div",{className:"min-w-[30px]",children:"-"})})},{title:"Số km di chuyển (km)",className:"!text-center",dataIndex:"kmmove",key:"kmmove",render:a=>e.jsx("div",{className:"!text-center",children:a||e.jsx("div",{className:"min-w-[40px]",children:"-"})})},{title:"Vận tốc (km/h)",dataIndex:"speed",className:"!text-center",key:"kmmove",render:a=>e.jsx("div",{className:"!text-center",children:a||e.jsx("div",{className:"min-w-[20px]",children:"-"})})}];function He(){const[a,h]=r.useState([]),[i,f]=r.useState(0),g=20,[d,m]=r.useState(1),[N,o]=r.useState([]),[j,Q]=r.useState([]),[k,J]=r.useState(),[b]=ve(),[U,ee]=r.useState(""),[E,L]=r.useState(),[u,M]=r.useState(Pe),[x,Y]=r.useState(Ve);let R=D(U);const[te,se]=r.useState(!1),[G,z]=r.useState(""),[ae,re]=r.useState([]),[B,O]=r.useState(""),[ne,le]=r.useState("");let P=D(ne,500);const[ce,V]=r.useState(""),[oe,ie]=r.useState([]),[de,me]=r.useState("");let A=D(de,500);const S=r.useRef(null),w=Ie(),[he,ue]=r.useState(0),[xe,pe]=r.useState(w?.h*.52),[H,K]=r.useState({open:!1,id:null}),ye=()=>{K({open:!1,id:null})};r.useEffect(()=>{pe(w.h*.52)},[w]),r.useEffect(()=>{const t=S.current;if(t){const l=new ResizeObserver(s=>{for(let n of s)ue(n.contentRect.height)});return l.observe(t),()=>l.disconnect()}},[S]);const fe=t=>{if(t==null)M("");else if(x&&t&&t.isAfter(c.unix(x),"day"))Z.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let l=Date.parse(t.$d)/1e3;M(l)}},ge=t=>{if(t==null)Y("");else if(u&&t&&t.isBefore(c.unix(u),"day"))Z.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let l=Date.parse(t.$d)/1e3;Y(l)}},je=t=>x?t&&t.isAfter(c.unix(x),"day"):!1,ke=t=>u?t&&t.isBefore(c.unix(u),"day"):!1,_e=t=>{t.customergroup?O(t.customergroup):O(""),t.customertype?z(t.customertype):z(""),t.territory?V(t.territory):V(""),m(1)};r.useEffect(()=>{(async()=>{let t=await y.get("/api/method/mbw_dms.api.router.get_team_sale");Q(Ee({data:t.result.map(l=>({title:l.name,value:l.name,...l})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),r.useEffect(()=>{(async()=>{let t=await y.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:k,key_search:R}}),{message:l}=t;o(l.map(s=>({value:s.employee_code,label:s.employee_name||s.employee_code})))})()},[k,R]),r.useEffect(()=>{(async()=>{let t=await y.get("/api/method/frappe.desk.search.search_link",{params:{txt:P,doctype:"Customer Group",ignore_user_permissions:0,query:""}}),{message:l}=t;re(l.map(s=>({value:s.value.trim(),label:s.value.trim()})))})()},[P]),r.useEffect(()=>{(async()=>{let t=await y.get("/api/method/frappe.desk.search.search_link",{params:{txt:A,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:l}=t;ie(l.map(s=>({value:s.value,label:s.value})))})()},[A]);const Ce=t=>{const l=[{title:"Khách hàng",dataIndex:"customer",key:"customer",render:(s,n)=>e.jsxs("div",{children:[e.jsx("div",{children:n.customer_name}),e.jsx("div",{className:"text-[#637381]",children:n.customer_code})]})},{title:"Địa chỉ",dataIndex:"customer_address",key:"customer_address",width:200,render:(s,n)=>e.jsx("div",{className:"truncate",children:n.customer_address})},{title:"Loại khách",dataIndex:"customer_type",key:"customer_type",render:(s,n)=>e.jsx("div",{children:n.customer_type})},{title:"Nhóm khách",dataIndex:"customer_group",key:"customer_group",render:(s,n)=>e.jsx("div",{children:n.customer_group})},{title:"Số điện thoại",dataIndex:"customer_sdt",key:"customer_sdt",render:(s,n)=>e.jsx("div",{children:n.customer_sdt})},{title:"Liên hệ",dataIndex:"customer_contact",key:"customer_contact",render:(s,n)=>e.jsx("div",{children:n.customer_contact})},{title:"Checkin",dataIndex:"checkin",className:"!text-center",key:"checkin",render:(s,n)=>e.jsx("div",{className:"!text-center",children:n.checkin})},{title:"Checkout",dataIndex:"checkout",className:"!text-center",key:"checkout",render:(s,n)=>e.jsx("div",{className:"!text-center",children:n.checkout})},{title:"Số giờ viếng thăm",dataIndex:"time_check",key:"time_check",render:s=>e.jsx("div",{className:"!text-center",children:parseFloat((s/60).toFixed(2))})},{title:"Địa chỉ checkin",dataIndex:"checkin_address",key:"checkin_address",render:(s,n)=>e.jsx("div",{children:n.checkin_address})},{title:"Khoảng cách",dataIndex:"distance",className:"!text-center",key:"distance",render:(s,n)=>e.jsx("div",{className:"!text-center",children:parseFloat(n.distance).toFixed(2)})},{title:"Thiết bị",dataIndex:"device",key:"device",className:"!text-center",render:s=>e.jsx("div",{className:"!text-center",children:s||"-"})},{title:"Số ảnh chụp",dataIndex:"total_image",className:"!text-center",key:"total_image",render:(s,n)=>e.jsx("div",{className:"!text-center",children:n.total_image})},{title:"Đúng tuyến",dataIndex:"is_router",className:"!text-center",key:"is_router",render:s=>e.jsx("div",{className:"!text-center",children:s==="1"?e.jsx(I,{}):e.jsx(T,{})})},{title:"Đơn hàng",dataIndex:"is_order",className:"!text-center",key:"is_order",render:s=>e.jsx("div",{className:"!text-center",children:s==="1"?e.jsx(I,{}):e.jsx(T,{})})},{title:"Ghi tồn",dataIndex:"is_check_inventory",className:"!text-center",key:"is_check_inventory",render:s=>e.jsx("div",{className:"!text-center",children:s==="1"?e.jsx(I,{}):e.jsx(T,{})})},{title:"Ghi chú",dataIndex:"checkin_id",key:"checkin_id",render:s=>e.jsx("div",{className:"!text-left",children:s?e.jsx("div",{onClick:()=>{K({open:!0,id:s})},className:"text-[#1877F2] text-sm font-medium- !text-left cursor-pointer underline",children:"Xem ghi chú"}):"-"})}];return e.jsx(we,{bordered:!0,dataSource:t?.customers?.map(s=>{let n=Math.random();return{...s,key:n}}),scroll:{x:2700,y:280},columns:l,pagination:!1})};return r.useEffect(()=>{(async()=>{const t=await y.get("/api/method/mbw_dms.api.report.checkin_report.checkin_report_info",{params:{page_size:g,page_number:d,from_date:u,to_date:x,employee:E,sale_group:k,territory:ce,customer_group:B,customer_type:G}});let{result:l}=t;h(l),f(l?.totals)})()},[d,u,x,te,k,E,B,G]),e.jsx(e.Fragment,{children:e.jsxs(Te,{header:e.jsx(Ne,{title:"Báo cáo viếng thăm",buttons:[{icon:e.jsx(Ge,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{se(t=>!t)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(ze,{className:"text-xl"}),size:"18px",className:"flex items-center"}]}),children:[e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7  border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(F,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(p,{className:"ml-4",children:e.jsxs(F,{gutter:[8,8],children:[e.jsx(p,{span:5,children:e.jsx($,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:fe,defaultValue:q,disabledDate:je})}),e.jsx(p,{span:5,children:e.jsx($,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:ge,placeholder:"Đến ngày",defaultValue:W,disabledDate:ke})}),e.jsx(p,{span:7,children:e.jsx(be,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:j,onChange:t=>{J(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(p,{span:7,children:e.jsx(_,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{ee(t)},options:N,onSelect:t=>{L(t),m(1)},onClear:()=>{L("")}})})]})}),e.jsx(p,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(Se,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(De,{title:"Bộ lọc",children:[e.jsx("div",{className:"",children:e.jsxs(C,{layout:"vertical",form:b,onFinish:_e,children:[e.jsx(C.Item,{name:"customertype",label:"Loại khách hàng",className:"w-[468px] border-none",children:e.jsx(_,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Le,allowClear:!0,showSearch:!0,placeholder:"Tất cả loại khách hàng"})}),e.jsx(C.Item,{name:"customergroup",label:"Nhóm khách hàng",className:"w-[468px] border-none",children:e.jsx(_,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:ae,allowClear:!0,onSearch:t=>{le(t)},showSearch:!0,placeholder:"Tất cả nhóm khách hàng"})}),e.jsx(C.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:e.jsx(_,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:oe,allowClear:!0,onSearch:t=>{me(t)},showSearch:!0,placeholder:"Tất cẩ khu vực"})})]})}),e.jsxs(F,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(v,{className:"mr-3",onClick:t=>{t.preventDefault(),b.resetFields()},children:"Đặt lại"}),e.jsx(v,{type:"primary",onClick:()=>{b.submit()},children:"Áp dụng"})]})]})]}),children:e.jsx(v,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8",icon:e.jsx(Me,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(v,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(Ye,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:S,className:"pt-5",children:e.jsx(X,{bordered:!0,$border:!0,dataSource:a?.data?.map(t=>({key:t.name,...t})),pagination:i&&i>g?{pageSize:g,showSizeChanger:!1,total:i,current:d,onChange(t){m(t)}}:!1,scroll:{x:!0,y:he<300?void 0:xe},columns:Ae,expandable:{expandedRowRender:Ce,defaultExpandedRowKeys:["0"]}})})]}),e.jsx(Re,{title:e.jsx("div",{className:"font-bold text-lg leading-7 text-[#212B36] p-4",children:"Ghi chú"}),open:H.open,onCancel:ye,footer:!1,width:800,children:e.jsx(Oe,{id:H.id})})]})})}function st(){return e.jsxs(e.Fragment,{children:[e.jsx(Fe,{children:e.jsx("title",{children:" ReportCheckin"})}),e.jsx(He,{})]})}export{st as default};
