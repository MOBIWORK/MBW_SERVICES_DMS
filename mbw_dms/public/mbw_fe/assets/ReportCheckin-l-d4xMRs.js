import{X as r,a1 as _,L as e,P as i,a3 as l,a4 as S,br as f,a7 as I}from"./index--5O9XPFT.js";import{H as T}from"./header-page-N1Cww3eX.js";import{u as k}from"./useDebount-BIq65q3u.js";import{h as H,f as K,j as C}from"./data-W8eMcttJ.js";import{D as y}from"./index-y_SbXLAw.js";import{V as E}from"./VerticalAlignBottomOutlined-X7VANu5X.js";import"./dayjs.min-WKSUTDN5.js";const L=[{title:"STT",dataIndex:"stt",key:"stt",render:(n,s,m)=>m+1},{title:"Mã nhân viên",dataIndex:"employee_code",key:"employee_code",render:(n,s)=>e.jsx("div",{className:"!w-[160px]",children:s.employee_code})},{title:"Tên nhân viên",dataIndex:"employee_name",key:"employee_name",render:(n,s)=>e.jsx("div",{className:"!w-[160px]",children:s.employee_name})},{title:"Nhóm bán hàng",dataIndex:"saleperson",key:"saleperson",render:(n,s)=>e.jsx("div",{className:"!w-[160px]",children:s.saleperson})},{title:"Ngày",dataIndex:"days",key:"days",render:(n,s)=>e.jsx("div",{className:"!w-[160px]",children:s.days})},{title:"Thứ",dataIndex:"date",key:"date",render:(n,s)=>e.jsx("div",{className:"!w-[160px]",children:s.date})},{title:"Giờ làm",dataIndex:"startwork",key:"startwork",render:(n,s)=>e.jsx("div",{className:"!w-[160px]",children:s.startwork})},{title:"Giờ viếng thăm",dataIndex:"checkin",key:"checkin",render:(n,s)=>e.jsx("div",{className:"!w-[160px]",children:s.checkin})},{title:"Số km tự động (km)",dataIndex:"kmauto",key:"kmauto",render:(n,s)=>e.jsx("div",{className:"!w-[160px]",children:s.kmauto})},{title:"Số km di chuyển (km)",dataIndex:"kmmove",key:"kmmove",render:(n,s)=>e.jsx("div",{className:"!w-[160px]",children:s.kmmove})},{title:"Vận tốc (km/h)",dataIndex:"speed",key:"kmmove",render:(n,s)=>e.jsx("div",{className:"!w-[160px]",children:s.kmmove})},{title:"Ghi chú",key:"note",render:()=>e.jsx("div",{className:"!w-[160px]",children:e.jsx("a",{children:"Xem ghi chú"})})}],D=[{key:"KDA",name:"7382jsd",employee_code:"HHH-1",employee_name:"Thiên Khuyển",saleperson:"KV MB",days:"20/1/2024",date:"Thứ 4",startwork:"08:00",checkin:"12:30",kmauto:5,kmmove:15,speed:56},{key:"HUDS",name:"7382jsd",employee_code:"HHH-1",employee_name:"Tần Sương",saleperson:"KV MN",days:"20/2/2024",date:"Thứ 3",startwork:"08:00",checkin:"12:30",kmauto:19,kmmove:20,speed:23}];function V(){const[n,s]=r.useState([]),[m,Y]=r.useState([]),[x,j]=r.useState(),[g,v]=r.useState(""),[M,N]=r.useState();let u=k(g);const[b,w]=r.useState("");k(b,300);const p=t=>{console.log(t)},F=t=>{const h=[{title:"Khách hàng",dataIndex:"customer",key:"customer",render:(c,a,d)=>e.jsxs("div",{className:"!w-[200]",children:[e.jsx("div",{children:a.customer}),e.jsx("div",{className:"text-[#637381]",children:a.customer_code})]})},{title:"Địa chỉ",dataIndex:"address",key:"address",render:(c,a,d)=>e.jsx("div",{className:"!w-[160]",children:e.jsx("div",{children:a.address})})},{title:"Loại khách",dataIndex:"typecustomer",key:"typecustomer",render:(c,a,d)=>e.jsx("div",{className:"!w-[160]",children:e.jsx("div",{children:a.typecustomer})})},{title:"Nhóm khách",dataIndex:"groupcustomer",key:"groupcustomer",render:(c,a,d)=>e.jsx("div",{className:"!w-[160]",children:e.jsx("div",{children:a.groupcustomer})})},{title:"Số điện thoại",dataIndex:"phonenumber",key:"phonenumber",render:(c,a,d)=>e.jsx("div",{className:"!w-[160]",children:e.jsx("div",{children:a.phonenumber})})},{title:"Liên hệ",dataIndex:"contact",key:"contact",render:(c,a,d)=>e.jsx("div",{className:"!w-[160]",children:e.jsx("div",{children:a.contact})})},{title:"Checkin",dataIndex:"checkin",key:"checkin",render:(c,a,d)=>e.jsx("div",{className:"!w-[160]",children:e.jsx("div",{children:a.checkin})})},{title:"Checkout",dataIndex:"checkout",key:"checkout",render:(c,a,d)=>e.jsx("div",{className:"!w-[160]",children:e.jsx("div",{children:a.checkout})})},{title:"Số giờ viếng thăm",dataIndex:"timecheckin",key:"timecheckin",render:(c,a,d)=>e.jsx("div",{className:"!w-[160]",children:e.jsx("div",{children:a.timecheckin})})},{title:"Địa chỉ checkin",dataIndex:"addresscheckin",key:"addresscheckin",render:(c,a,d)=>e.jsx("div",{className:"!w-[160]",children:e.jsx("div",{children:a.addresscheckin})})},{title:"Khoảng cách checkin(km)",dataIndex:"distance",key:"distance",render:(c,a,d)=>e.jsx("div",{className:"!w-[160]",children:e.jsx("div",{children:a.distance})})}],o=[{customer:"Khách hàng 1",customer_code:"KH1",address:"Hà Nội",typecustomer:"Loại khách hàng",groupcustomer:"Nhóm khác hàng",phonenumber:"012312393",contact:"88 Tây Hồ",checkin:"07:00",checkout:"07:15",timecheckin:"15 phút",addresscheckin:"Hòang Thành Thăng Long",distance:"0.2"},{customer:"Khách hàng 2",customer_code:"KH2",address:"Hà Nội",typecustomer:"Loại khách hàng",groupcustomer:"Nhóm khác hàng",phonenumber:"0928167294",contact:"892 Lạc Long Quân",checkin:"07:00",checkout:"07:15",timecheckin:"15 phút",addresscheckin:"Phong Nha Kẻ Bàng",distance:"0.2"}];return e.jsx(f,{columns:h,dataSource:o,pagination:!1})};return r.useEffect(()=>{(async()=>{let t=await _.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:x,key_search:u}});console.log("rsemp",t);let{message:h}=t;s(h.map(o=>({value:o.employee_code,label:o.employee_name||o.employee_code})))})()},[x,u]),e.jsxs(e.Fragment,{children:[e.jsx(T,{title:"Báo cáo viếng thăm",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(E,{className:"text-xl"}),size:"20px",className:"flex items-center"}]}),e.jsxs("div",{className:"bg-white rounded-md py-7 px-4 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs("div",{className:"flex justify-start items-center",children:[e.jsx(i,{className:"w-[200px] border-none mr-2",children:e.jsx(y,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",placeholder:"Từ ngày",onChange:p})}),e.jsx(i,{className:"w-[200px] border-none mr-2",children:e.jsx(y,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",placeholder:"Đến ngày",onChange:p})}),e.jsx(i,{className:"w-[200px] border-none mr-2",children:e.jsx(l,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Tất cả nhóm bán hàng",value:""},...m],showSearch:!0,notFoundContent:null,onSearch:t=>w(t),onChange:t=>{j(t)}})}),e.jsx(i,{className:"w-[200px] border-none mr-2",children:e.jsx(l,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:[{label:"Tất cả nhân viên",value:""},...n],showSearch:!0,defaultValue:"",notFoundContent:null,onSearch:v,onChange:t=>{N(t)},allowClear:!0})}),e.jsx(i,{className:"w-[200px] border-none mr-2",children:e.jsx(l,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Loại khách hàng",value:""},...H],showSearch:!0})})]}),e.jsxs("div",{className:"flex justify-start items-center h-8 pt-9",children:[e.jsx(i,{className:"w-[200px] border-none mr-2",children:e.jsx(l,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Nhóm khách hàng",value:""},...K],showSearch:!0})}),e.jsx(i,{className:"w-[200px] border-none mr-2",children:e.jsx(l,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Khu vực",value:""},...C],showSearch:!0})})]}),e.jsx("div",{className:"pt-10",children:e.jsx(S,{bordered:!0,scroll:{x:!0},columns:L,expandable:{expandedRowRender:F,defaultExpandedRowKeys:["0"]},dataSource:D})})]})]})}function O(){return e.jsxs(e.Fragment,{children:[e.jsx(I,{children:e.jsx("title",{children:" ReportCheckin"})}),e.jsx(V,{})]})}export{O as default};