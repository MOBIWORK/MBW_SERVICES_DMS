import{Y as a,a3 as d,L as e,N as J,R as Q,O as i,a5 as c,a6 as W,bv as n,V as E,a8 as $}from"./index-E0O7XQer.js";import{H as ee}from"./header-page-_jBNoOFe.js";import{C as te}from"./index-bAZBBsIL.js";import{e as re,f as se}from"./data-u-VkVTNg.js";import{u as m}from"./useDebount-28SXHhcf.js";import{a as ae}from"./index-Cd0TkIiC.js";import{V as ne}from"./VerticalAlignBottomOutlined-8R8rOFKn.js";const le=[{title:"STT",dataIndex:"stt",key:"stt",render:(s,t,u)=>e.jsx("div",{className:"text-center",children:u+1})},{title:"Phòng ban",dataIndex:"department",key:"department",render:(s,t)=>e.jsx("div",{children:t.department})},{title:"Mã nhân viên",dataIndex:"employee_id",key:"employee_id",render:(s,t)=>e.jsx("div",{children:t.employee_id})},{title:"Tên nhân viên",dataIndex:"employee_name",key:"employee_name",render:(s,t)=>e.jsx("div",{children:t.employee_name})},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code",render:(s,t)=>e.jsx("div",{children:t.customer_code})},{title:"Tên khách hàng",dataIndex:"customer_name",key:"customer_name",render:(s,t)=>e.jsx("div",{children:t.customer_name})},{title:"Loại khách hàng",dataIndex:"customer_type",key:"customer_type",render:(s,t)=>e.jsx("div",{children:t.customer_type})},{title:"Nhóm khách hàng",dataIndex:"customer_group",key:"customer_group",render:(s,t)=>e.jsx("div",{children:t.customer_group})},{title:"Người liên hệ",dataIndex:"contact",key:"contact",render:(s,t)=>e.jsx("div",{children:t.contact})},{title:"SDT",dataIndex:"phone",key:"phone",render:(s,t)=>e.jsx("div",{children:t.phone})},{title:"Mã số thuế",dataIndex:"tax_id",key:"tax_id",render:(s,t)=>e.jsx("div",{children:t.tax_id})},{title:"Khu vưc",dataIndex:"territory",key:"territory",render:(s,t)=>e.jsx("div",{children:t.territory})},{title:"Địa chỉ",dataIndex:"address",key:"address",render:(s,t)=>e.jsx("div",{children:t.contribution})},{title:"Ngày thu thập",dataIndex:"creation",key:"creation",render:(s,t)=>e.jsx("div",{children:E(t.creation*1e3).format("DD/MM/YYYY")})},{title:"Nguồn",dataIndex:"f1",key:"f1"},{title:e.jsx("div",{className:"!text-right",children:"Số lần VT"}),dataIndex:"totals_checkin",key:"totals_checkin",render:(s,t)=>e.jsx("div",{className:"!text-right",children:t.totals_checkin})},{title:"VT đầu",dataIndex:"first_checkin",key:"first_checkin",render:(s,t)=>e.jsx("div",{children:t.first_checkin})},{title:"VT cuối",dataIndex:"last_checkin",key:"last_checkin",render:(s,t)=>e.jsx("div",{children:t.last_checkin})},{title:e.jsx("div",{className:"!text-right",children:"Số đơn hàng"}),dataIndex:"totals_so",key:"totals_so",render:(s,t)=>e.jsx("div",{className:"!text-right",children:t.totals_so})},{title:"Đơn hàng cuối",dataIndex:"last_sale_order",key:"last_sale_order",render:s=>s?e.jsx("p",{children:E(s*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})}];function oe(){const[s,t]=a.useState([]),[u,D]=a.useState(0),h=20,[p,O]=a.useState(1),[x,y]=a.useState(""),[Y,G]=a.useState([]),[P,K]=a.useState("");let _=m(P,500);const[M,L]=a.useState([]),[g,j]=a.useState(""),[R,V]=a.useState(""),[S,k]=a.useState("");let f=m(R,500);const[C,b]=a.useState(""),[q,z]=a.useState([]),[H,A]=a.useState("");let v=m(H,500);const[F,N]=a.useState(""),[B,U]=a.useState([]),[X,Z]=a.useState("");let w=m(X,500);const[T,I]=a.useState();return a.useEffect(()=>{(async()=>{let r=await d.get("/api/method/frappe.desk.search.search_link",{params:{txt:_,doctype:"Employee",ignore_user_permissions:0,query:""}}),{message:l}=r;console.log("rsEmployee",l),G(l.map(o=>({value:o.description.trim(),label:o.description.trim()})))})()},[_]),a.useEffect(()=>{(async()=>{let r=await d.get("/api/method/frappe.desk.search.search_link",{params:{txt:f,doctype:"Department",ignore_user_permissions:0,query:""}}),{message:l}=r;L(l.map(o=>({value:o.value.trim(),label:o.value.trim()})))})()},[f]),a.useEffect(()=>{(async()=>{let r=await d.get("/api/method/frappe.desk.search.search_link",{params:{txt:v,doctype:"Customer Group",ignore_user_permissions:0,query:""}}),{message:l}=r;z(l.map(o=>({value:o.value.trim(),label:o.value.trim()})))})()},[v]),a.useEffect(()=>{(async()=>{let r=await d.get("/api/method/frappe.desk.search.search_link",{params:{txt:w,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:l}=r;U(l.map(o=>({value:o.value,label:o.value})))})()},[w]),a.useEffect(()=>{(async()=>{const r=await d.get("/api/method/mbw_dms.api.report.customer_report.customer_report",{params:{page_size:h,page_number:p,customer_type:S,customer_group:C,territory:F,employee:x,has_sales_order:T,department:g}});let{result:l}=r;console.log("result",l),t(l),D(l?.totals_cus)})()},[p,S,C,F,x,T,g]),e.jsx(e.Fragment,{children:e.jsx(te,{header:e.jsx(ee,{title:"Báo cáo khách hàng mới",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(ne,{className:"text-xl"}),size:"20px",className:"flex items-center",action:()=>{ae("/app/data-export/Data%20Export")}}]}),children:e.jsxs("div",{className:"bg-white rounded-md pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsx(J,{layout:"vertical",className:"flex flex-wrap justify-start items-center px-4",children:e.jsxs(Q,{className:"",gutter:[8,8],children:[e.jsx(i,{label:"Phòng ban",className:"w-[175px] border-none mr-2",children:e.jsx(c,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:M,onSelect:r=>{j(r)},onSearch:r=>{V(r)},onClear:()=>j(""),filterOption:!1,allowClear:!0,placeholder:"Tất cả phòng ban"})}),e.jsx(i,{label:"Nhân viên",className:"w-[175px] border-none mr-2",children:e.jsx(c,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Y,onSelect:r=>{y(r)},onSearch:r=>{K(r)},onClear:()=>y(""),filterOption:!1,allowClear:!0,placeholder:"Tất cả nhân viên"})}),e.jsx(i,{label:"Khách hàng",className:"w-[175px] border-none mr-2",children:e.jsx(c,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:re,filterOption:!1,allowClear:!0,placeholder:"Tất cả loại khách hàng",onSelect:r=>{k(r)},onClear:()=>k("")})}),e.jsx(i,{label:"Nhóm khách hàng",className:"w-[175px] border-none mr-2",children:e.jsx(c,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:q,onSelect:r=>{b(r)},onSearch:r=>{A(r)},onClear:()=>b(""),filterOption:!1,allowClear:!0,placeholder:"Tất cả nhóm khách hàng"})}),e.jsx(i,{label:"Khu vực",className:"w-[175px] border-none mr-2",children:e.jsx(c,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:B,onSelect:r=>{N(r)},onSearch:r=>{Z(r)},onClear:()=>N(""),filterOption:!1,allowClear:!0,placeholder:"Tất cả khu vực"})}),e.jsx(i,{label:"Phát sinh đơn hàng",className:"w-[175px] border-none mr-2",children:e.jsx(c,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:se,filterOption:!1,allowClear:!0,showSearch:!0,onSelect:r=>{I(r)},onClear:()=>I(void 0)})})]})}),e.jsx("div",{className:"pt-5",children:e.jsx(W,{dataSource:s?.data?.map(r=>({...r,key:r.name})),bordered:!0,columns:le,pagination:{defaultPageSize:h,total:u,showSizeChanger:!1,onChange(r){O(r)}},scroll:{x:!0},summary:()=>e.jsxs(n.Summary.Row,{children:[e.jsx(n.Summary.Cell,{index:0}),e.jsx(n.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(n.Summary.Cell,{index:2}),e.jsx(n.Summary.Cell,{index:3}),e.jsx(n.Summary.Cell,{index:4}),e.jsx(n.Summary.Cell,{index:5}),e.jsx(n.Summary.Cell,{index:6}),e.jsx(n.Summary.Cell,{index:7}),e.jsx(n.Summary.Cell,{index:8}),e.jsx(n.Summary.Cell,{index:9}),e.jsx(n.Summary.Cell,{index:10}),e.jsx(n.Summary.Cell,{index:11}),e.jsx(n.Summary.Cell,{index:12}),e.jsx(n.Summary.Cell,{index:13}),e.jsx(n.Summary.Cell,{index:14}),e.jsx(n.Summary.Cell,{index:15,children:e.jsx("div",{className:"text-right",children:s?.sum?.sum_checkin})}),e.jsx(n.Summary.Cell,{index:16}),e.jsx(n.Summary.Cell,{index:17}),e.jsx(n.Summary.Cell,{index:18,children:e.jsx("div",{className:"text-right",children:s?.sum?.sum_so})})]})})})]})})})}function xe(){return e.jsxs(e.Fragment,{children:[e.jsx($,{children:e.jsx("title",{children:" ReportCustomNew"})}),e.jsx(oe,{})]})}export{xe as default};
