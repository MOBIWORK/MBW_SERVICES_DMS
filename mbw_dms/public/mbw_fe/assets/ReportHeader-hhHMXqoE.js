import{Y as n,a2 as u,a7 as j,L as e,P as h,ab as _,bz as b,a3 as x,bA as y,bB as f,bC as w,bD as g,a8 as N,a_ as E}from"./index-o85vnTJF.js";import{M as F,Y as C,F as v,T as k}from"./dropDownFilter-9d-yDTQQ.js";import{c as d,u as B}from"./useMediaQuery-q_iAER93.js";import"https://cdn.jsdelivr.net/npm/nats.ws@1.29.2/+esm";import{S as T}from"./index-3JjCl_zE.js";import{V as I}from"./VerticalAlignBottomOutlined--5Aiz4qV.js";const D=()=>{const a=d(),[i,c]=n.useState([]);return n.useEffect(()=>{(async()=>{let r=await u.get("/api/method/mbw_dms.api.router.get_team_sale");c(j({data:r.result.map(t=>({title:t.name,value:t.name,...t})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),e.jsxs(h,{className:"min-w-[130px]  w-[20%]",children:[e.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Nhóm bán hàng"}),e.jsx(_,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:i,onChange:r=>{a(b(r))},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})]})},L=({setPage:a,matchMedia:i})=>{const[c,r]=n.useState([]),[t,p]=n.useState(""),s=d(),{sales_team:o}=B(l=>l.group);return n.useEffect(()=>{(async()=>{let l=await u.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:o,key_search:t}}),{message:m}=l;r(m.map(S=>({value:S.employee_code,label:S.employee_name||S.employee_code})))})()},[t,o]),e.jsxs(h,{className:`min-w-[130px] ${i?"w-full":"w-[20%]"}`,children:[e.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Nhân viên"}),e.jsx(x,{filterOption:!0,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:l=>{p(l)},options:c,onSelect:l=>{s(y(l)),a(1)},onClear:()=>{s(y(""))}})]})},O=({setPage:a})=>{const[i,c]=n.useState([]),[r,t]=n.useState(""),p=d();return n.useEffect(()=>{(async()=>{let s=await u.get("/api/method/frappe.desk.search.search_link",{params:{txt:r,doctype:"Supplier",ignore_user_permissions:0,query:""}}),{message:o}=s;c(o.map(l=>({value:l?.value,label:l.description.split(",")[0].trim()})))})()},[r]),e.jsxs(h,{className:"min-w-[130px] w-[20%]",children:[e.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Nhà Cung cấp"}),e.jsx(x,{filterOption:!1,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhà cung cấp",onSearch:s=>{t&&t(s)},options:i,onSelect:s=>{p(f(s)),a(1)},onClear:()=>{p(f(""))}})]})},A=({setPage:a,matchMedia:i})=>{const[c,r]=n.useState([]),[t,p]=n.useState(""),s=d();return n.useEffect(()=>{(async()=>{let o=await u.get("/api/method/frappe.desk.search.search_link",{params:{txt:t,doctype:"Brand",ignore_user_permissions:0,query:""}}),{message:l}=o;r(l.map(m=>({value:m?.value,description:m?.description})))})()},[t]),e.jsxs(h,{className:`min-w-[130px] ${i?"w-full":"w-[20%]"}`,children:[e.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Nhãn hiệu"}),e.jsx(x,{filterOption:!1,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhãn hiệu",onSearch:o=>{p(o)},options:c,onSelect:o=>{s(w(o)),a(1)},onClear:()=>{s(w(""))}})]})},H=({setPage:a})=>{const[i,c]=n.useState([]),[r,t]=n.useState(""),p=d();return n.useEffect(()=>{(async()=>{let s=await u.get("/api/method/frappe.desk.search.search_link",{params:{txt:r,doctype:"DMS Industry",ignore_user_permissions:0,query:""}}),{message:o}=s;c(o.map(l=>({value:l?.value,description:l?.description})))})()},[r]),e.jsxs(h,{className:"min-w-[130px] w-[20%]",children:[e.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Ngành hàng"}),e.jsx(x,{filterOption:!1,allowClear:!0,showSearch:!0,placeholder:"Tất cả ngành hàng",onSearch:s=>{t(s)},options:i,onSelect:s=>{p(g(s)),a(1)},onClear:()=>{p(g(""))}})]})},K=({setPage:a,inputMonth:i,inputYear:c,inputFromDate:r,inputToDate:t,inputSaleGroup:p,inputEmployee:s,inputSupplier:o,inputIndustry:l,inpitBrand:m})=>e.jsxs(e.Fragment,{children:[i&&e.jsx(F,{setPage:a}),c&&e.jsx(C,{}),r&&e.jsx(v,{}),t&&e.jsx(k,{}),p&&e.jsx(D,{}),s&&e.jsx(L,{setPage:a}),o&&e.jsx(O,{setPage:a}),l&&e.jsx(H,{setPage:a}),m&&e.jsx(A,{setPage:a})]}),G=K,R=({setRefresh:a,title:i,params:c,file_name:r})=>{const[t,p]=n.useState(!1);return e.jsx(N,{title:i,buttons:[{icon:e.jsx(T,{className:"text-xl size-4 mb-1 mr-[2px]"}),className:"flex mr-2 h-7 mt-6",action:()=>{a(s=>!s)}},{disabled:t,label:"Xuất dữ liệu",type:"primary",icon:e.jsx(I,{className:"text-xl"}),size:"18px",className:"flex items-center h-7 mt-6",action:E.bind(null,{url:"/api/method/mbw_dms.api.exports.export_excel.export_excel",params:c,file_name:r},p)}]})},W=R;export{G as F,W as R};
