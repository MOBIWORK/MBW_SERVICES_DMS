import{V as d,L as s,P as F,a3 as h,bI as le,bJ as ne,Y as t,bK as b,bL as g,b0 as qe,aZ as We,a2 as p,a7 as Re,aa as Ve,N as n,ab as Ge,bA as y,bC as z,bB as J,bD as Z,R as Ae,Q as k,bz as D,bM as U,bN as X,bH as P,bO as ee,bP as se,bQ as ae,bR as te}from"./index-o85vnTJF.js";import{D as Qe}from"./index-3JjCl_zE.js";import"https://cdn.jsdelivr.net/npm/nats.ws@1.29.2/+esm";import{a as He}from"./index.esm-LIvd7GLf.js";import{e as ze,f as Je}from"./data-u-VkVTNg.js";import{c as w,a as S,m as j,d as Ze,u as T}from"./useMediaQuery-q_iAER93.js";import{D as I}from"./index-Nws9UTPm.js";const Ue=(d().month()+1).toString(),Xe=({setPage:o})=>{const m=w(),u=S(`${j}`);return s.jsxs(F,{className:`min-w-[130px] ${u?"w-full":" w-[20%]"}`,children:[s.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Tháng"}),s.jsx(h,{className:"!bg-[#F4F6F8] ",defaultValue:Ue,options:Ze,onChange:c=>{m(le(c)),o&&o(1)}})]})},Pe=()=>{const o=w(),m=c=>{o(ne(c?.$y.toString()))},u=S(`${j}`);return s.jsxs(F,{className:`min-w-[130px] ${u?"w-full":" w-[20%]"}`,children:[s.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Năm"}),s.jsx(I,{className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:m,placeholder:"Chọn năm",picker:"year",allowClear:!1,defaultValue:d().startOf("year")})]})},re=d().startOf("month"),es=()=>{const o=w();T(c=>c.date);const m=S(`${j}`),u=c=>{if(c==null)o(b(c));else{let x=Date.parse(c.$d)/1e3;o(b(x))}};return t.useEffect(()=>{o(b(Date.parse(re.$d)/1e3))},[]),s.jsxs(F,{className:`min-w-[130px]  ${m?"w-full":" w-[20%]"}`,children:[s.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Từ ngày"}),s.jsx(I,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:u,defaultValue:re,allowClear:!1})]})},oe=d().endOf("month"),ss=()=>{const o=w(),{startDate:m,endDate:u}=T(i=>i.date),c=i=>{if(m){const f=d.unix(m).month();return i&&i.month()!==f}},x=i=>{if(i==null)o(g(i));else if(m&&i&&i.isBefore(d.unix(m),"day"))qe.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let f=Date.parse(i.$d)/1e3;o(g(f))}},_=S(`${j}`),C=d(u*1e3);return t.useEffect(()=>{o(g(Date.parse(oe.$d)/1e3))},[]),s.jsxs(F,{className:`min-w-[130px] ${_?"w-full":" w-[20%]"}`,children:[s.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Đến ngày"}),s.jsx(I,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:x,placeholder:"Đến ngày",defaultValue:oe,disabledDate:c,value:C,allowClear:!1})]})},as=d().startOf("month"),ts=d().endOf("month");let rs=Date.parse(as.$d)/1e3,os=Date.parse(ts.$d)/1e3;const ls=({setPage:o,matchMedia:m,inputFromDate:u,inputMonth:c,inputToDate:x,inputYear:_,inputSaleGroup:C,inputEmployee:i,inputCompany:f,inputCustomer:E,inputTerritory:M,inputWarehouse:$,inputCustomerType:ce,inputCustomerGroup:O,inputOrder:ie,inputSupplier:v,inputIndustry:L,inputBrand:K})=>{const[me,he]=t.useState([]),[pe,ue]=t.useState([]),[de,fe]=t.useState([]),[xe,ye]=t.useState([]),[be,ge]=t.useState([]),[we,Fe]=t.useState([]),[Se,je]=t.useState([]),[_e,Ce]=t.useState([]),[Ne,ke]=t.useState([]),[De,Te]=t.useState([]),[Y,Ie]=t.useState(""),[B,Ee]=t.useState(""),[q,Me]=t.useState(""),[W,$e]=t.useState(""),[R,Oe]=t.useState(""),[V,ve]=t.useState(""),[G,Le]=t.useState(""),[A,Ke]=t.useState(""),[Q,Ye]=t.useState(""),[N]=We(),a=w(),{sales_team:H}=T(e=>e.group);L&&t.useEffect(()=>{(async()=>{let e=await p.get("/api/method/frappe.desk.search.search_link",{params:{txt:A,doctype:"DMS Industry",ignore_user_permissions:0,query:""}}),{message:l}=e;je(l.map(r=>({value:r?.value,description:r?.description})))})()},[A]),K&&t.useEffect(()=>{(async()=>{let e=await p.get("/api/method/frappe.desk.search.search_link",{params:{txt:G,doctype:"Brand",ignore_user_permissions:0,query:""}}),{message:l}=e;Fe(l.map(r=>({value:r?.value,description:r?.description})))})()},[G]),E&&t.useEffect(()=>{(async()=>{let e=await p.get("/api/method/frappe.desk.search.search_link",{params:{txt:q,doctype:"Customer",ignore_user_permissions:0,query:""}}),{message:l}=e;he(l.map(r=>({value:r.value,label:r.value})))})()},[q]),M&&t.useEffect(()=>{(async()=>{let e=await p.get("/api/method/frappe.desk.search.search_link",{params:{txt:W,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:l}=e;fe(l.map(r=>({value:r.value,label:r.value})))})()},[W]),O&&t.useEffect(()=>{(async()=>{let e=await p.get("/api/method/frappe.desk.search.search_link",{params:{txt:Q,doctype:"Customer Group",ignore_user_permissions:0,query:""}}),{message:l}=e;ye(l.map(r=>({value:r.value.trim(),label:r.value.trim()})))})()},[Q]),t.useEffect(()=>{(async()=>{let e=await p.get("/api/method/mbw_dms.api.router.get_team_sale");Ce(Re({data:e.result.map(l=>({title:l.name,value:l.name,...l})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),i&&t.useEffect(()=>{(async()=>{let e=await p.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:H,key_search:B}}),{message:l}=e;ke(l.map(r=>({value:r.employee_code,label:r.employee_name||r.employee_code})))})()},[H,B]),f&&t.useEffect(()=>{(async()=>{let e=await p.get("/api/method/frappe.desk.search.search_link",{params:{txt:R,doctype:"Company",ignore_user_permissions:0,query:""}}),{message:l}=e;ge(l.map(r=>({value:r.value,label:r.value})))})()},[R]),$&&t.useEffect(()=>{(async()=>{let e=await p.get("/api/method/frappe.desk.search.search_link",{params:{txt:V,doctype:"Warehouse",ignore_user_permissions:0,query:""}}),{message:l}=e;ue(l.map(r=>({value:r.value,label:r.value})))})()},[V]),v&&t.useEffect(()=>{(async()=>{let e=await p.get("/api/method/frappe.desk.search.search_link",{params:{txt:Y,doctype:"Supplier",ignore_user_permissions:0,query:""}}),{message:l}=e;Te(l.map(r=>({value:r?.value,label:r.description.split(",")[0].trim()})))})()},[Y]);const Be=e=>{e.customergroup?a(U(e.customergroup)):a(U("")),e.customertype?a(X(e.customertype)):a(X("")),e.territory?a(P(e.territory)):a(P("")),e.has_sales_order?a(ee(e.has_sales_order)):a(ee("")),e.filter_month?a(b(Date.parse(e.filter_month.$d)/1e3)):a(b(rs)),e.filter_year?a(g(Date.parse(e.filter_year.$d)/1e3)):a(g(os)),e.company?a(se(e.company)):a(se("")),e.customer?a(ae(e.customer)):a(ae("")),e.warehouse?a(te(e.warehouse)):a(te("")),e.filter_group_sales?a(D(e.filter_group_sales)):a(D("")),e.filter_employee?a(y(e.filter_employee)):a(y("")),o&&o(1)};return s.jsx(Ve,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>s.jsxs(Qe,{title:"Bộ lọc",children:[s.jsxs(n,{layout:"vertical",form:N,onFinish:Be,children:[!m&&s.jsxs(s.Fragment,{children:[u&&s.jsx(n.Item,{className:"w-[468px] border-none",name:"filter_month",children:s.jsx(es,{})}),c&&s.jsx(n.Item,{className:"w-[468px] border-none",name:"filter_month",children:s.jsx(Xe,{setPage:o})}),x&&s.jsx(n.Item,{className:"w-[468px] border-none",name:"filter_year",children:s.jsx(ss,{})}),_&&s.jsx(n.Item,{className:"w-[468px] border-none",name:"filter_year",children:s.jsx(Pe,{})}),C&&s.jsx(n.Item,{className:"w-[468px] border-none",name:"filter_group_sales",label:"Nhóm bán hàng",children:s.jsx(Ge,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:_e,dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),i&&s.jsx(n.Item,{className:"w-[468px] border-none",label:"Nhân viên",name:"filter_employee",children:s.jsx(h,{filterOption:!0,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:e=>{Ee(e)},options:Ne,onClear:()=>{y&&y("")}})})]}),f&&s.jsx(n.Item,{name:"company",label:"Công ty",className:"w-[468px] border-none",children:s.jsx(h,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:be,allowClear:!0,onSearch:e=>{Oe(e)},placeholder:"Tất cả công ty"})}),E&&s.jsx(n.Item,{name:"customer",label:"Khách hàng",className:"w-[468px] border-none",children:s.jsx(h,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:me,filterOption:!1,allowClear:!0,onSearch:e=>{Me(e)},placeholder:"Tất cả khách hàng"})}),$&&s.jsx(n.Item,{name:"warehouse",label:"Kho",className:"w-[468px] border-none",children:s.jsx(h,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:pe,allowClear:!0,onSearch:e=>{ve(e)},placeholder:"Tất cả kho"})}),ce&&s.jsx(n.Item,{name:"customertype",label:"Loại khách hàng",className:"w-[468px] border-none",children:s.jsx(h,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:ze,allowClear:!0,showSearch:!0,placeholder:"Tất cả loại khách hàng"})}),O&&s.jsx(n.Item,{name:"customergroup",label:"Nhóm khách hàng",className:"w-[468px] border-none",children:s.jsx(h,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:xe,allowClear:!0,onSearch:e=>{Ye(e)},showSearch:!0,placeholder:"Tất cả nhóm khách hàng"})}),ie&&s.jsx(n.Item,{label:"Phát sinh đơn hàng",name:"hasorder",className:"w-[468px] border-none",children:s.jsx(h,{placeholder:"Tất cả",className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Je,allowClear:!0,showSearch:!0})}),M&&s.jsx(n.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:s.jsx(h,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:de,allowClear:!0,onSearch:e=>{$e(e)},placeholder:"Tất cả khu vực"})}),K&&s.jsx(n.Item,{name:"territory",label:"Nhãn hiệu",className:"w-[468px] border-none",children:s.jsx(h,{filterOption:!1,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhãn hiệu",onSearch:e=>{Le(e)},options:we,onSelect:e=>{a(z(e)),o&&o(1)},onClear:()=>{a(z(""))}})}),v&&s.jsx(n.Item,{name:"supplier",label:"Nhà cung cấp",className:"w-[468px] border-none",children:s.jsx(h,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhà cung cấp",onSearch:e=>{Ie(e)},options:De,onSelect:e=>{a(J(e)),o&&o(1)},onClear:()=>{a(J(""))}})}),L&&s.jsx(n.Item,{name:"industry",label:"Ngành hàng",className:"w-[468px] border-none",children:s.jsx(h,{filterOption:!1,allowClear:!0,showSearch:!0,placeholder:"Tất cả ngành hàng",onSearch:e=>{Ke(e)},options:Se,onSelect:e=>{a(Z(e)),o&&o(1)},onClear:()=>{a(Z(""))}})})]}),s.jsx(Ae,{className:"justify-between pt-6 pb-4",children:s.jsxs(s.Fragment,{children:[s.jsx(k,{className:"mr-3",onClick:e=>{e.preventDefault(),a(le("")),a(ne("")),a(D("")),a(y("")),N.resetFields()},children:"Đặt lại"}),s.jsx(k,{type:"primary",onClick:()=>{N.submit()},children:"Áp dụng"})]})})]}),children:s.jsx(k,{onClick:e=>e.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px]  h-8 mt-4",icon:s.jsx(He,{style:{fontSize:"20px"}}),children:"Bộ lọc"})})},ds=ls;export{ds as D,es as F,Xe as M,ss as T,Pe as Y};
