import{Y as s,aX as Se,a1 as d,L as e,a6 as be,R as C,P as u,a8 as ke,a2 as x,a7 as Ce,N as p,Q as j,a9 as we,bz as l,V as i,aW as A,ab as Ne}from"./index-uvoHenLo.js";import{D as Fe}from"./index-rH1LmACM.js";import{u as De,C as ve}from"./index-ZCIGePFH.js";import{e as Te,f as Ye}from"./data-u-VkVTNg.js";import{u as f}from"./useDebount-663MyMhE.js";import{t as Ie,a as Ee}from"./index-82WpHrog.js";import{a as Me,b as Re}from"./index.esm-51b3apmV.js";import{D as H}from"./index-6wYPExeo.js";import{S as ze}from"./SyncOutlined-OiOSyHh8.js";import{V as Le}from"./VerticalAlignBottomOutlined-Hc4EnSv2.js";const K=i().startOf("month"),$=i().endOf("month");let Oe=Date.parse(K.$d)/1e3,Ve=Date.parse($.$d)/1e3;const Ge=[{title:"STT",dataIndex:"stt",key:"stt",className:"!text-center",width:60,render:(r,a,h)=>e.jsx("div",{className:"text-center",children:h+1})},{title:"Mã nhân viên",dataIndex:"name",key:"name"},{title:"Tên nhân viên",dataIndex:"employee_name",key:"employee_name"},{title:"Nhóm bán hàng",dataIndex:"sales_team",key:"sales_team",width:200,render:(r,a)=>e.jsx("div",{className:"whitespace-normal",children:a.sales_team})},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code",render:(r,a)=>e.jsx("div",{children:a.customer_code})},{title:"Tên khách hàng",dataIndex:"customer_name",key:"customer_name",render:(r,a)=>e.jsx("div",{children:a.customer_name})},{title:"Loại khách hàng",dataIndex:"customer_type",key:"customer_type",render:(r,a)=>e.jsx("div",{children:a.customer_type})},{title:"Nhóm khách hàng",dataIndex:"customer_group",key:"customer_group",width:170,render:(r,a)=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:a.customer_group})},{title:"Người liên hệ",dataIndex:"contact",key:"contact",render:(r,a)=>e.jsx("div",{children:a.contact})},{title:"SDT",dataIndex:"phone",key:"phone",render:(r,a)=>e.jsx("div",{children:a.phone})},{title:"Mã số thuế",dataIndex:"tax_id",key:"tax_id",render:(r,a)=>e.jsx("div",{children:a.tax_id})},{title:"Khu vưc",dataIndex:"territory",key:"territory",render:(r,a)=>e.jsx("div",{children:a.territory})},{title:"Địa chỉ",dataIndex:"address",key:"address",render:(r,a)=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:a.address})},{title:"Ngày thu thập",dataIndex:"creation",key:"creation",render:(r,a)=>e.jsx("div",{children:i(a.creation*1e3).format("DD/MM/YYYY")})},{title:"Nguồn",dataIndex:"f1",key:"f1",className:"!text-center",render:r=>e.jsx("div",{className:"!text-center",children:r||"-"})},{title:e.jsx("div",{className:"!text-right",children:"Số lần VT"}),dataIndex:"totals_checkin",key:"totals_checkin",render:(r,a)=>e.jsx("div",{className:"!text-right",children:a.totals_checkin})},{title:"VT đầu",dataIndex:"first_checkin",key:"first_checkin",render:r=>r?e.jsx("p",{children:i(r*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:"VT cuối",dataIndex:"last_checkin",key:"last_checkin",render:r=>r?e.jsx("p",{children:i(r*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:e.jsx("div",{className:"!text-right",children:"Số đơn hàng"}),dataIndex:"totals_so",key:"totals_so",render:(r,a)=>e.jsx("div",{className:"!text-right",children:a.totals_so})},{title:"Đơn hàng cuối",dataIndex:"last_sale_order",key:"last_sale_order",render:r=>r?e.jsx("p",{children:i(r*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})}];function Be(){const[r,a]=s.useState([]),[h,q]=s.useState(0),g=20,[w,_]=s.useState(1),[S]=Se(),[N,F]=s.useState(""),[X,W]=s.useState([]),[Pe,Q]=s.useState([]),[D,Ae]=s.useState(""),[U,He]=s.useState(""),[v,T]=s.useState("");let Y=f(U,500);const[c,I]=s.useState(Oe),[m,E]=s.useState(Ve),[M,R]=s.useState(""),[Z,J]=s.useState([]),[ee,te]=s.useState("");let z=f(ee,500);const[L,O]=s.useState(""),[se,re]=s.useState([]),[ae,ne]=s.useState("");let V=f(ae,500);const[G,B]=s.useState(),[le,oe]=s.useState([]),[y,ie]=s.useState(),[ce,me]=s.useState("");let P=f(ce);const b=s.useRef(null),k=De(),[Ke,de]=s.useState(0),[$e,ue]=s.useState(k?.h*.52),[he,xe]=s.useState(!1);s.useEffect(()=>{ue(k.h*.52)},[k]),s.useEffect(()=>{const t=b.current;if(t){const n=new ResizeObserver(o=>{for(let _e of o)de(_e.contentRect.height)});return n.observe(t),()=>n.disconnect()}},[b]);const pe=t=>{if(t==null)I("");else if(m&&t&&t.isAfter(i.unix(m),"day"))A.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let n=Date.parse(t.$d)/1e3;I(n)}},ye=t=>{if(t==null)E("");else if(c&&t&&t.isBefore(i.unix(c),"day"))A.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let n=Date.parse(t.$d)/1e3;E(n)}},je=t=>m?t&&t.isAfter(i.unix(m),"day"):!1,fe=t=>c?t&&t.isBefore(i.unix(c),"day"):!1,ge=t=>{t.customergroup?R(t.customergroup):R(""),t.customertype?T(t.customertype):T(""),t.territory,O(t.territory),t.hasorder?B(t.hasorder):B(void 0),_(1)};return s.useEffect(()=>{(async()=>{let t=await d.get("/api/method/mbw_dms.api.router.get_team_sale");oe(Ie({data:t.result.map(n=>({title:n.name,value:n.name,...n})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),s.useEffect(()=>{(async()=>{let t=await d.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:y,key_search:P}}),{message:n}=t;W(n.map(o=>({value:o.employee_name,label:o.employee_name||o.employee_code})))})()},[y,P]),s.useEffect(()=>{(async()=>{let t=await d.get("/api/method/frappe.desk.search.search_link",{params:{txt:Y,doctype:"Department",ignore_user_permissions:0,query:""}}),{message:n}=t;Q(n.map(o=>({value:o.value.trim(),label:o.value.trim()})))})()},[Y]),s.useEffect(()=>{(async()=>{let t=await d.get("/api/method/frappe.desk.search.search_link",{params:{txt:z,doctype:"Customer Group",ignore_user_permissions:0,query:""}}),{message:n}=t;J(n.map(o=>({value:o.value.trim(),label:o.value.trim()})))})()},[z]),s.useEffect(()=>{(async()=>{let t=await d.get("/api/method/frappe.desk.search.search_link",{params:{txt:V,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:n}=t;re(n.map(o=>({value:o.value,label:o.value})))})()},[V]),s.useEffect(()=>{(async()=>{const t=await d.get("/api/method/mbw_dms.api.report.customer_report.customer_report",{params:{page_size:g,page_number:w,customer_type:v,customer_group:M,territory:L,sales_person:N,sales_team:y,has_sales_order:G,department:D,from_date:c,to_date:m}});let{result:n}=t;console.log({result:n}),a({...n,data:n.data?.map(o=>({...o,key:o.cus_id}))}),q(n?.totals_cus)})()},[w,v,M,L,N,G,D,he,c,m,y]),e.jsx(e.Fragment,{children:e.jsx(ve,{header:e.jsx(be,{title:"Báo cáo khách hàng mới",buttons:[{icon:e.jsx(ze,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{xe(t=>!t)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(Le,{className:"text-xl"}),size:"18px",className:"flex items-center",action:()=>{Ee("/app/data-export/Data%20Export")}}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(C,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(u,{className:"ml-4",children:e.jsxs(C,{gutter:[8,8],children:[e.jsx(u,{span:5,children:e.jsx(H,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:pe,defaultValue:K,disabledDate:je})}),e.jsx(u,{span:5,children:e.jsx(H,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:ye,placeholder:"Đến ngày",defaultValue:$,disabledDate:fe})}),e.jsx(u,{span:7,children:e.jsx(ke,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:le,onChange:t=>{ie(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(u,{span:7,children:e.jsx(x,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{me(t)},options:X,onSelect:t=>{F(t),_(1)},onClear:()=>{F("")}})})]})}),e.jsx(u,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(Ce,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(Fe,{title:"Bộ lọc",children:[e.jsx("div",{className:"",children:e.jsxs(p,{layout:"vertical",form:S,onFinish:ge,children:[e.jsx(p.Item,{name:"customertype",label:"Loại khách hàng",className:"w-[468px] border-none",children:e.jsx(x,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Te,allowClear:!0,showSearch:!0,placeholder:"Tất cả loại khách hàng"})}),e.jsx(p.Item,{name:"customergroup",label:"Nhóm khách hàng",className:"w-[468px] border-none",children:e.jsx(x,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Z,allowClear:!0,onSearch:t=>{te(t)},showSearch:!0,placeholder:"Tất cả nhóm khách hàng"})}),e.jsx(p.Item,{label:"Phát sinh đơn hàng",name:"hasorder",className:"w-[468px] border-none",children:e.jsx(x,{placeholder:"Tất cả",className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Ye,allowClear:!0,showSearch:!0})}),e.jsx(p.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:e.jsx(x,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:se,allowClear:!0,onSearch:t=>{ne(t)},showSearch:!0,placeholder:"Tất cẩ khu vực"})})]})}),e.jsxs(C,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(j,{className:"mr-3",onClick:t=>{t.preventDefault(),S.resetFields()},children:"Đặt lại"}),e.jsx(j,{type:"primary",onClick:()=>{S.submit()},children:"Áp dụng"})]})]})]}),children:e.jsx(j,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8",icon:e.jsx(Me,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(j,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(Re,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:b,className:"pt-5",children:e.jsx(we,{dataSource:r?.data,bordered:!0,columns:Ge,scroll:{x:3e3,y:400},pagination:h&&h>g?{pageSize:g,showSizeChanger:!1,total:h,current:r.page_number,onChange(t){_(t)}}:!1,summary:()=>e.jsxs(l.Summary.Row,{children:[e.jsx(l.Summary.Cell,{index:0}),e.jsx(l.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(l.Summary.Cell,{index:2}),e.jsx(l.Summary.Cell,{index:3}),e.jsx(l.Summary.Cell,{index:4}),e.jsx(l.Summary.Cell,{index:5}),e.jsx(l.Summary.Cell,{index:6}),e.jsx(l.Summary.Cell,{index:7}),e.jsx(l.Summary.Cell,{index:8}),e.jsx(l.Summary.Cell,{index:9}),e.jsx(l.Summary.Cell,{index:10}),e.jsx(l.Summary.Cell,{index:11}),e.jsx(l.Summary.Cell,{index:12}),e.jsx(l.Summary.Cell,{index:13}),e.jsx(l.Summary.Cell,{index:14}),e.jsx(l.Summary.Cell,{index:15,children:e.jsx("div",{className:"text-right",children:r?.sum?.sum_checkin})}),e.jsx(l.Summary.Cell,{index:16}),e.jsx(l.Summary.Cell,{index:17}),e.jsx(l.Summary.Cell,{index:18,children:e.jsx("div",{className:"text-right",children:r?.sum?.sum_so})}),e.jsx(l.Summary.Cell,{index:19})]})})})]})})})}function rt(){return e.jsxs(e.Fragment,{children:[e.jsx(Ne,{children:e.jsx("title",{children:" ReportCustomNew"})}),e.jsx(Be,{})]})}export{rt as default};
