import{r as s,u as D,j as e,R as N,C as o,F as p,S as x,B as c,T as M,H as O}from"./index-7ICWPAi-.js";import{L as X,V as $,P as G}from"./index.esm-tmf-1mcq.js";import{L as Q,a as U,b as Z}from"./index.esm-yT0h0kwg.js";import{H as J}from"./header-page-Cbk_KqJE.js";import{A as h}from"./server-jr2Y0juD.js";function _(l,r=500){let[d,u]=s.useState(l);return s.useEffect(()=>{let m=setTimeout(()=>{u(l)},r);return()=>clearTimeout(m)},[l,r]),d}const W=[{title:"Mã tuyến",dataIndex:"channel_code",key:"channel_code"},{title:"Tên tuyến",dataIndex:"channel_name",key:"channel_name"},{title:"NVBH",dataIndex:"employee",key:"employee"},{title:"Trạng thái",dataIndex:"status",key:"status"},{title:"Ngày tạo",dataIndex:"modified",key:"modified"},{title:"Người tạo",dataIndex:"modified_by",key:"modified_by"},{title:"Ngày cập nhật",dataIndex:"modified",key:"modified"},{title:"Người cập nhật",dataIndex:"modified_by",key:"modified_by"}];function Y(){const l=D(),[r,d]=s.useState([]),[u,m]=s.useState(""),[v,w]=s.useState("");let y=_(u,300),f=_(v,500);const[k,C]=s.useState([]),[R,F]=s.useState([]),[i,E]=s.useState(),[g,T]=s.useState(),[j,L]=s.useState(),[S,I]=s.useState(1),b=20,[z,q]=s.useState([]),[A,P]=s.useState(0),H={selectedRowKeys:r,onChange:t=>{console.log("selectedRowKeys changed: ",t),d(t)}},K=t=>{L(t)},V=t=>{console.log("search:",t)},B=(t,a)=>(a?.label??"").toLowerCase().includes(t.toLowerCase());return s.useEffect(()=>{(async()=>{let t=await h.get("/api/method/frappe.desk.search.search_link",{params:{txt:y,doctype:"Employee",ignore_user_permissions:0,reference_doctype:"Attendance",query:"erpnext.controllers.queries.employee_query"}}),{results:a}=t;C(a.map(n=>({value:n.value,label:n.description})))})()},[y]),s.useEffect(()=>{(async()=>{let t=await h.get("/api/method/frappe.desk.search.search_link",{params:{txt:f,doctype:"DMS Router",ignore_user_permissions:0,reference_doctype:"Attendance",query:"mbw_dms.api.controller.queries.router_query"}}),{results:a}=t;console.log(a),F(a.map(n=>({value:n.value,label:n.description.split(",")[0],desc:n.description.split(",")[1]})))})()},[f]),s.useEffect(()=>{(async()=>{const t=await h.get("/api/method/mbw_dms.api.router.get_list_router",{params:{page_size:b,page_number:S,status:j,router:i&&i.reduce((a,n)=>`${a};${n}`),employee:g}});q(t?.result?.data),P(t?.result?.total)})()},[i,g,j,S]),e.jsxs(e.Fragment,{children:[e.jsx(J,{title:"Quản lý tuyến",buttons:[{label:"Xuất excel",icon:e.jsx(X,{className:"text-xl"}),size:"20px",className:"flex items-center mr-2"},{label:"Nhập excel",icon:e.jsx(Q,{className:"text-xl"}),size:"20px",className:"flex items-center mr-2"},{label:"Thêm mới",type:"primary",icon:e.jsx($,{className:"text-xl"}),size:"20px",className:"flex items-center",action:()=>l("/router-create")}]}),e.jsx("div",{className:"bg-[#f9fafa]",children:e.jsx("div",{className:"mx-2 pt-5 pb-10",children:e.jsx("div",{className:"pt-5",children:e.jsxs("div",{className:"h-auto bg-white py-7 px-4 rounded-lg",children:[e.jsxs(N,{className:"justify-between w-full",children:[e.jsx(o,{span:14,children:e.jsxs(N,{gutter:8,children:[e.jsx(o,{span:8,children:e.jsx(p,{name:"employee",required:!0,children:e.jsx(x,{mode:"multiple",filterOption:!1,onChange:t=>{console.log("router",i),E(t)},showSearch:!0,placeholder:"Tuyến",notFoundContent:null,onSearch:t=>w(t),options:R,optionRender:t=>e.jsxs("div",{className:"text-sm",children:[e.jsx("p",{role:"img","aria-label":t.data.label,className:"my-1",children:t.data.label}),e.jsx("span",{className:"text-xs !font-semibold",children:t.data.desc})]})})})}),e.jsx(o,{span:8,children:e.jsx(p,{name:"employee",required:!0,children:e.jsx(x,{placeholder:"Nhân viên bán hàng",showSearch:!0,notFoundContent:null,onSearch:t=>m(t),options:k,onChange:t=>{T(t)}})})}),e.jsx(o,{span:8,children:e.jsx(p,{className:"w-[150px] border-none",children:e.jsx(x,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",optionFilterProp:"children",onChange:K,onSearch:V,filterOption:B,defaultValue:"",options:[{value:"",label:"Trạng thái"},{value:"Active",label:"Hoạt động"},{value:"Lock",label:"Khóa"}]})})})]})}),e.jsx(o,{children:e.jsxs("div",{className:"flex flex-wrap items-center",children:[e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(c,{className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-[32px]",icon:e.jsx(U,{style:{fontSize:"20px"}}),children:"Filter"}),e.jsx(c,{className:"border-l-[0.1px] rounded-l-none h-[32px]",children:e.jsx(Z,{style:{fontSize:"20px"}})})]}),e.jsxs("div",{className:"flex justify-center items-center rounded-md",children:[e.jsx(c,{className:"border-r-[0.1px] rounded-r-none",children:e.jsx(G,{style:{fontSize:"20px"}})}),e.jsx(c,{className:"border-l-[0.1px] rounded-l-none",children:"Last update on"})]})]})})]}),e.jsx("div",{className:"pt-5",children:e.jsx("div",{children:e.jsx(M,{rowSelection:H,columns:W,dataSource:z?.map(t=>({key:t.channel_code,...t})),pagination:{defaultPageSize:b,total:A,onChange(t,a){I(t)}}})})})]})})})})]})}function oe(){return e.jsxs(e.Fragment,{children:[e.jsx(O,{children:e.jsx("title",{children:" RouterControll"})}),e.jsx(Y,{})]})}export{oe as default};
