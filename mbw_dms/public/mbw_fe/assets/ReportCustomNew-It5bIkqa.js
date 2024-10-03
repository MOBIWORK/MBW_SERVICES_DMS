import{Y as r,a_ as ke,a1 as c,a6 as Ce,L as e,a7 as we,bD as Ne,R as T,P as d,aa as Fe,a2 as h,a9 as De,N as u,Q as y,ab as ve,bE as n,V as l,aZ as P,ad as Te}from"./index-S4dKpla8.js";import{D as Ye}from"./index-ryqYx8Xn.js";import{u as Ie,C as Ee}from"./index-HqUyU1Gq.js";import{e as Me,f as Re}from"./data-u-VkVTNg.js";import{u as _}from"./useDebount-RDU6oqXW.js";import{a as ze,b as Le}from"./index.esm-ndB1PoYR.js";import{D as A}from"./index-H3g8xWlR.js";import{S as Oe}from"./SyncOutlined-giRReh2o.js";import{V as Ve}from"./VerticalAlignBottomOutlined-Zk3bdNqz.js";const H=l().startOf("month"),K=l().endOf("month");let Ge=Date.parse(H.$d)/1e3,Be=Date.parse(K.$d)/1e3;function Pe(){const $=[{title:"STT",dataIndex:"stt",key:"stt",className:"!text-center",width:60,render:(t,s,a)=>e.jsx("span",{children:ye(f,p,a)})},{title:"Mã nhân viên",dataIndex:"sales_person_id",key:"sales_person_id"},{title:"Tên nhân viên",dataIndex:"sales_person",key:"sales_person",width:200},{title:"Nhóm bán hàng",dataIndex:"sales_team",key:"sales_team",width:200,render:(t,s)=>e.jsx("div",{className:"whitespace-normal",children:s.sales_team})},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code",render:(t,s)=>e.jsx("div",{children:s.customer_code})},{title:"Tên khách hàng",dataIndex:"customer_name",key:"customer_name",render:(t,s)=>e.jsx("div",{children:s.customer_name})},{title:"Loại hình khách hàng",dataIndex:"customer_type",key:"customer_type",width:200,render:(t,s)=>e.jsx("div",{children:s.customer_type})},{title:"Nhóm khách hàng",dataIndex:"customer_group",key:"customer_group",width:170,render:(t,s)=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:s.customer_group})},{title:"Người liên hệ",dataIndex:"contact",key:"contact",render:(t,s)=>e.jsx("div",{children:s.contact})},{title:"SDT",dataIndex:"phone",key:"phone",render:(t,s)=>e.jsx("div",{children:s.phone})},{title:"Mã số thuế",dataIndex:"tax_id",key:"tax_id",render:(t,s)=>e.jsx("div",{children:s.tax_id})},{title:"Khu vưc",dataIndex:"territory",key:"territory",render:(t,s)=>e.jsx("div",{children:s.territory})},{title:"Địa chỉ",dataIndex:"address",key:"address",render:(t,s)=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:s.address})},{title:"Ngày thu thập",dataIndex:"creation",key:"creation",render:(t,s)=>e.jsx("div",{children:l(s.creation*1e3).format("DD/MM/YYYY")})},{title:"Nguồn",dataIndex:"f1",key:"f1",className:"!text-center",render:t=>e.jsx("div",{className:"!text-center",children:t||"-"})},{title:e.jsx("div",{className:"!text-right",children:"Số lần VT"}),dataIndex:"totals_checkin",key:"totals_checkin",render:(t,s)=>e.jsx("div",{className:"!text-right",children:s.totals_checkin})},{title:"VT đầu",dataIndex:"first_checkin",key:"first_checkin",render:t=>t?e.jsx("p",{children:l(t*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:"VT cuối",dataIndex:"last_checkin",key:"last_checkin",render:t=>t?e.jsx("p",{children:l(t*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:e.jsx("div",{className:"!text-right",children:"Số đơn hàng"}),dataIndex:"totals_so",key:"totals_so",render:(t,s)=>e.jsx("div",{className:"!text-right",children:s.totals_so})},{title:"Đơn hàng cuối",dataIndex:"last_sale_order",key:"last_sale_order",render:t=>t?e.jsx("p",{children:l(t*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})}],[x,q]=r.useState([]),[j,X]=r.useState(0),p=20,[f,g]=r.useState(1),[S]=ke(),[b,Y]=r.useState(""),[Z,Q]=r.useState([]),[Ae,W]=r.useState([]),[k,He]=r.useState(""),[J,Ke]=r.useState(""),[C,I]=r.useState("");let E=_(J,500);const[o,M]=r.useState(Ge),[i,R]=r.useState(Be),[w,z]=r.useState(""),[U,ee]=r.useState([]),[te,se]=r.useState("");let L=_(te,500);const[N,O]=r.useState(""),[re,ae]=r.useState([]),[ne,le]=r.useState("");let V=_(ne,500);const[F,G]=r.useState(),[oe,ie]=r.useState([]),[m,ce]=r.useState(),[de,me]=r.useState("");let B=_(de);const D=r.useRef(null),v=Ie(),[$e,he]=r.useState(0),[qe,ue]=r.useState(v?.h*.52),[xe,pe]=r.useState(!1),ye=(t,s,a)=>(t-1)*s+a+1;r.useEffect(()=>{ue(v.h*.52)},[v]),r.useEffect(()=>{const t=D.current;if(t){const s=new ResizeObserver(a=>{for(let be of a)he(be.contentRect.height)});return s.observe(t),()=>s.disconnect()}},[D]);const _e=t=>{if(t==null)M("");else if(i&&t&&t.isAfter(l.unix(i),"day"))P.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let s=Date.parse(t.$d)/1e3;M(s)}},je=t=>{if(t==null)R("");else if(o&&t&&t.isBefore(l.unix(o),"day"))P.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let s=Date.parse(t.$d)/1e3;R(s)}},fe=t=>i?t&&t.isAfter(l.unix(i),"day"):!1,ge=t=>o?t&&t.isBefore(l.unix(o),"day"):!1,Se=t=>{t.customergroup?z(t.customergroup):z(""),t.customertype?I(t.customertype):I(""),t.territory,O(t.territory),t.hasorder?G(t.hasorder):G(void 0),g(1)};return r.useEffect(()=>{(async()=>{let t=await c.get("/api/method/mbw_dms.api.router.get_team_sale");ie(Ce({data:t.result.map(s=>({title:s.name,value:s.name,...s})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),r.useEffect(()=>{(async()=>{let t=await c.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:m,key_search:B}}),{message:s}=t;Q(s.map(a=>({value:a.sale_name,label:a.sale_name||a.employee_name||a.employee_code})))})()},[m,B]),r.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:E,doctype:"Department",ignore_user_permissions:0,query:""}}),{message:s}=t;W(s.map(a=>({value:a.value.trim(),label:a.value.trim()})))})()},[E]),r.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:L,doctype:"Customer Group",ignore_user_permissions:0,query:""}}),{message:s}=t;ee(s.map(a=>({value:a.value.trim(),label:a.value.trim()})))})()},[L]),r.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:V,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:s}=t;ae(s.map(a=>({value:a.value,label:a.value})))})()},[V]),r.useEffect(()=>{(async()=>{const t=await c.get("/api/method/mbw_dms.api.report.customer_report.customer_report",{params:{page_size:p,page_number:f,customer_type:C,customer_group:w,territory:N,sales_person:b,sales_team:m,has_sales_order:F,department:k,from_date:o,to_date:i}});let{result:s}=t;q({...s,data:s.data?.map(a=>({...a,key:a.cus_id}))}),X(s?.totals_cus)})()},[f,C,w,N,b,F,k,xe,o,i,m]),e.jsx(e.Fragment,{children:e.jsx(Ee,{header:e.jsx(we,{title:"Báo cáo khách hàng mới",buttons:[{icon:e.jsx(Oe,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{pe(t=>!t)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(Ve,{className:"text-xl"}),size:"18px",className:"flex items-center",action:Ne.bind(null,{url:"/api/method/mbw_dms.api.exports.export_excel.export_excel",params:{report_type:"Report Customer",data_filter:{customer_type:C,customer_group:w,territory:N,sales_person:b,sales_team:m,has_sales_order:F,department:k,from_date:o,to_date:i}},file_name:"Report Customer.xlsx"})}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(T,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(d,{className:"ml-4",children:e.jsxs(T,{gutter:[8,8],children:[e.jsx(d,{span:5,children:e.jsx(A,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:_e,defaultValue:H,disabledDate:fe})}),e.jsx(d,{span:5,children:e.jsx(A,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:je,placeholder:"Đến ngày",defaultValue:K,disabledDate:ge})}),e.jsx(d,{span:7,children:e.jsx(Fe,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:oe,onChange:t=>{ce(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(d,{span:7,children:e.jsx(h,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{me(t)},options:Z,onSelect:t=>{Y(t),g(1)},onClear:()=>{Y("")}})})]})}),e.jsx(d,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(De,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(Ye,{title:"Bộ lọc",children:[e.jsx("div",{className:"",children:e.jsxs(u,{layout:"vertical",form:S,onFinish:Se,children:[e.jsx(u.Item,{name:"customertype",label:"Loại hình khách hàng",className:"w-[468px] border-none",children:e.jsx(h,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Me,allowClear:!0,showSearch:!0,placeholder:"Tất cả loại hình khách hàng"})}),e.jsx(u.Item,{name:"customergroup",label:"Nhóm khách hàng",className:"w-[468px] border-none",children:e.jsx(h,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:U,allowClear:!0,onSearch:t=>{se(t)},showSearch:!0,placeholder:"Tất cả nhóm khách hàng"})}),e.jsx(u.Item,{label:"Phát sinh đơn hàng",name:"hasorder",className:"w-[468px] border-none",children:e.jsx(h,{placeholder:"Tất cả",className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Re,allowClear:!0,showSearch:!0})}),e.jsx(u.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:e.jsx(h,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:re,allowClear:!0,onSearch:t=>{le(t)},showSearch:!0,placeholder:"Tất cẩ khu vực"})})]})}),e.jsxs(T,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(y,{className:"mr-3",onClick:t=>{t.preventDefault(),S.resetFields()},children:"Đặt lại"}),e.jsx(y,{type:"primary",onClick:()=>{S.submit()},children:"Áp dụng"})]})]})]}),children:e.jsx(y,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8",icon:e.jsx(ze,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(y,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(Le,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:D,className:"pt-5",children:e.jsx(ve,{dataSource:x?.data,bordered:!0,columns:$,scroll:{x:3e3,y:400},pagination:j&&j>p?{pageSize:p,showSizeChanger:!1,total:j,current:x.page_number,onChange(t){g(t)}}:!1,summary:()=>e.jsxs(n.Summary.Row,{children:[e.jsx(n.Summary.Cell,{index:0}),e.jsx(n.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(n.Summary.Cell,{index:2}),e.jsx(n.Summary.Cell,{index:3}),e.jsx(n.Summary.Cell,{index:4}),e.jsx(n.Summary.Cell,{index:5}),e.jsx(n.Summary.Cell,{index:6}),e.jsx(n.Summary.Cell,{index:7}),e.jsx(n.Summary.Cell,{index:8}),e.jsx(n.Summary.Cell,{index:9}),e.jsx(n.Summary.Cell,{index:10}),e.jsx(n.Summary.Cell,{index:11}),e.jsx(n.Summary.Cell,{index:12}),e.jsx(n.Summary.Cell,{index:13}),e.jsx(n.Summary.Cell,{index:14}),e.jsx(n.Summary.Cell,{index:15,children:e.jsx("div",{className:"text-right",children:x?.sum?.sum_checkin})}),e.jsx(n.Summary.Cell,{index:16}),e.jsx(n.Summary.Cell,{index:17}),e.jsx(n.Summary.Cell,{index:18,children:e.jsx("div",{className:"text-right",children:x?.sum?.sum_so})}),e.jsx(n.Summary.Cell,{index:19})]})})})]})})})}function rt(){return e.jsxs(e.Fragment,{children:[e.jsx(Te,{children:e.jsx("title",{children:" ReportCustomNew"})}),e.jsx(Pe,{})]})}export{rt as default};
