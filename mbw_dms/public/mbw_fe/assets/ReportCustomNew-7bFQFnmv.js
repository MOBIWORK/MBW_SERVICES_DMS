import{Y as s,aX as ge,a1 as l,L as e,a6 as _e,R as S,P as c,a8 as je,a2 as m,a7 as ke,N as h,Q as u,a9 as Se,V as i,aW as K,ab as be}from"./index-98eEIqus.js";import{D as we}from"./index-q1HT3_iF.js";import{u as Fe,C as Ne}from"./index-IXbDHFLY.js";import{e as De,f as ve}from"./data-u-VkVTNg.js";import{u as p}from"./useDebount-a9Q03ESF.js";import{t as Ce,a as Te}from"./index-njwsvpvm.js";import{a as Ye,b as Ie}from"./index.esm-khrwDoHR.js";import{D as A}from"./index-9eA_9-na.js";import{S as Ee}from"./SyncOutlined-oNsa6WON.js";import{V as Me}from"./VerticalAlignBottomOutlined-3tKe5Shl.js";const x=i().startOf("month"),y=i().endOf("month");let Re=Date.parse(x.$d)/1e3,ze=Date.parse(y.$d)/1e3;const Le=[{title:"STT",dataIndex:"stt",key:"stt",className:"!text-center",width:60,render:(r,a,d)=>e.jsx("div",{className:"text-center",children:d+1})},{title:"Mã nhân viên",dataIndex:"name",key:"name"},{title:"Tên nhân viên",dataIndex:"employee_name",key:"employee_name"},{title:"Nhóm bán hàng",dataIndex:"sales_team",key:"sales_team",width:200,render:(r,a)=>e.jsx("div",{children:a.sales_team})},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code",render:(r,a)=>e.jsx("div",{children:a.customer_code})},{title:"Tên khách hàng",dataIndex:"customer_name",key:"customer_name",render:(r,a)=>e.jsx("div",{children:a.customer_name})},{title:"Loại khách hàng",dataIndex:"customer_type",key:"customer_type",render:(r,a)=>e.jsx("div",{children:a.customer_type})},{title:"Nhóm khách hàng",dataIndex:"customer_group",key:"customer_group",width:170,render:(r,a)=>e.jsx("div",{className:"truncate",children:a.customer_group})},{title:"Người liên hệ",dataIndex:"contact",key:"contact",render:(r,a)=>e.jsx("div",{children:a.contact})},{title:"SDT",dataIndex:"phone",key:"phone",render:(r,a)=>e.jsx("div",{children:a.phone})},{title:"Mã số thuế",dataIndex:"tax_id",key:"tax_id",render:(r,a)=>e.jsx("div",{children:a.tax_id})},{title:"Khu vưc",dataIndex:"territory",key:"territory",render:(r,a)=>e.jsx("div",{children:a.territory})},{title:"Địa chỉ",dataIndex:"address",key:"address",render:(r,a)=>e.jsx("div",{className:"truncate",children:a.address})},{title:"Ngày thu thập",dataIndex:"creation",key:"creation",render:(r,a)=>e.jsx("div",{children:i(a.creation*1e3).format("DD/MM/YYYY")})},{title:"Nguồn",dataIndex:"f1",key:"f1",className:"!text-center",render:r=>e.jsx("div",{className:"!text-center",children:r||"-"})},{title:e.jsx("div",{className:"!text-right",children:"Số lần VT"}),dataIndex:"totals_checkin",key:"totals_checkin",render:(r,a)=>e.jsx("div",{className:"!text-right",children:a.totals_checkin})},{title:"VT đầu",dataIndex:"first_checkin",key:"first_checkin",render:r=>r?e.jsx("p",{children:i(r*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:"VT cuối",dataIndex:"last_checkin",key:"last_checkin",render:r=>r?e.jsx("p",{children:i(r*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:e.jsx("div",{className:"!text-right",children:"Số đơn hàng"}),dataIndex:"totals_so",key:"totals_so",render:(r,a)=>e.jsx("div",{className:"!text-right",children:a.totals_so})},{title:"Đơn hàng cuối",dataIndex:"last_sale_order",key:"last_sale_order",render:r=>r?e.jsx("p",{children:i(r*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})}];function Oe(){const[r,a]=s.useState([]),[d,$]=s.useState(0),f=20,[b,g]=s.useState(1),[_]=ge(),[w,F]=s.useState(""),[q,X]=s.useState([]),[Ve,W]=s.useState([]),[N,Ge]=s.useState(""),[Q,Pe]=s.useState(""),[D,v]=s.useState("");let C=p(Q,500);const[T,Y]=s.useState(Re),[I,E]=s.useState(ze),[M,R]=s.useState(""),[U,Z]=s.useState([]),[J,ee]=s.useState("");let z=p(J,500);const[L,O]=s.useState(""),[te,se]=s.useState([]),[re,ae]=s.useState("");let V=p(re,500);const[G,P]=s.useState(),[ne,oe]=s.useState([]),[B,le]=s.useState(),[ce,ie]=s.useState("");let H=p(ce);const j=s.useRef(null),k=Fe(),[Be,de]=s.useState(0),[He,me]=s.useState(k?.h*.52),[he,ue]=s.useState(!1);s.useEffect(()=>{me(k.h*.52)},[k]),s.useEffect(()=>{const t=j.current;if(t){const n=new ResizeObserver(o=>{for(let fe of o)de(fe.contentRect.height)});return n.observe(t),()=>n.disconnect()}},[j]);const pe=t=>{if(t==null)Y("");else if(y&&t&&t.isAfter(y,"day"))K.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let n=Date.parse(t.$d)/1e3;Y(n)}},xe=t=>{if(t==null)E("");else if(x&&t&&t.isBefore(x,"day"))K.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let n=Date.parse(t.$d)/1e3;E(n)}},ye=t=>{t.customergroup?R(t.customergroup):R(""),t.customertype?v(t.customertype):v(""),t.territory,O(t.territory),t.hasorder?P(t.hasorder):P(void 0),g(1)};return s.useEffect(()=>{(async()=>{let t=await l.get("/api/method/mbw_dms.api.router.get_team_sale");oe(Ce({data:t.result.map(n=>({title:n.name,value:n.name,...n})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),s.useEffect(()=>{(async()=>{let t=await l.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:B,key_search:H}}),{message:n}=t;X(n.map(o=>({value:o.employee_name,label:o.employee_name||o.employee_code})))})()},[B,H]),s.useEffect(()=>{(async()=>{let t=await l.get("/api/method/frappe.desk.search.search_link",{params:{txt:C,doctype:"Department",ignore_user_permissions:0,query:""}}),{message:n}=t;W(n.map(o=>({value:o.value.trim(),label:o.value.trim()})))})()},[C]),s.useEffect(()=>{(async()=>{let t=await l.get("/api/method/frappe.desk.search.search_link",{params:{txt:z,doctype:"Customer Group",ignore_user_permissions:0,query:""}}),{message:n}=t;Z(n.map(o=>({value:o.value.trim(),label:o.value.trim()})))})()},[z]),s.useEffect(()=>{(async()=>{let t=await l.get("/api/method/frappe.desk.search.search_link",{params:{txt:V,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:n}=t;se(n.map(o=>({value:o.value,label:o.value})))})()},[V]),s.useEffect(()=>{(async()=>{const t=await l.get("/api/method/mbw_dms.api.report.customer_report.customer_report",{params:{page_size:f,page_number:b,customer_type:D,customer_group:M,territory:L,employee:w,has_sales_order:G,department:N,from_date:T,to_date:I}});let{result:n}=t;console.log({result:n}),a({...n,data:n.data?.map(o=>({...o,key:o.cus_id}))}),$(n?.totals_cus)})()},[b,D,M,L,w,G,N,he,T,I]),console.log(r?.data),e.jsx(e.Fragment,{children:e.jsx(Ne,{header:e.jsx(_e,{title:"Báo cáo khách hàng mới",buttons:[{icon:e.jsx(Ee,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{ue(t=>!t)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(Me,{className:"text-xl"}),size:"18px",className:"flex items-center",action:()=>{Te("/app/data-export/Data%20Export")}}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(S,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(c,{className:"ml-4",children:e.jsxs(S,{gutter:[8,8],children:[e.jsx(c,{span:5,children:e.jsx(A,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:pe,defaultValue:x})}),e.jsx(c,{span:5,children:e.jsx(A,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:xe,placeholder:"Đến ngày",defaultValue:y})}),e.jsx(c,{span:7,children:e.jsx(je,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:ne,onChange:t=>{le(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(c,{span:7,children:e.jsx(m,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{ie(t)},options:q,onSelect:t=>{F(t),g(1)},onClear:()=>{F("")}})})]})}),e.jsx(c,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(ke,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(we,{title:"Bộ lọc",children:[e.jsx("div",{className:"",children:e.jsxs(h,{layout:"vertical",form:_,onFinish:ye,children:[e.jsx(h.Item,{name:"customertype",label:"Loại khách hàng",className:"w-[468px] border-none",children:e.jsx(m,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:De,allowClear:!0,showSearch:!0,placeholder:"Tất cả loại khách hàng"})}),e.jsx(h.Item,{name:"customergroup",label:"Nhóm khách hàng",className:"w-[468px] border-none",children:e.jsx(m,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:U,allowClear:!0,onSearch:t=>{ee(t)},showSearch:!0,placeholder:"Tất cả nhóm khách hàng"})}),e.jsx(h.Item,{label:"Phát sinh đơn hàng",name:"hasorder",className:"w-[468px] border-none",children:e.jsx(m,{placeholder:"Tất cả",className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:ve,allowClear:!0,showSearch:!0})}),e.jsx(h.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:e.jsx(m,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:te,allowClear:!0,onSearch:t=>{ae(t)},showSearch:!0,placeholder:"Tất cẩ khu vực"})})]})}),e.jsxs(S,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(u,{className:"mr-3",onClick:t=>{t.preventDefault(),_.resetFields()},children:"Đặt lại"}),e.jsx(u,{type:"primary",onClick:()=>{_.submit()},children:"Áp dụng"})]})]})]}),children:e.jsx(u,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8",icon:e.jsx(Ye,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(u,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(Ie,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:j,className:"pt-5",children:e.jsx(Se,{dataSource:r?.data,bordered:!0,columns:Le,scroll:{x:3e3,y:400},pagination:d&&d>f?{pageSize:f,showSizeChanger:!1,total:d,current:r.page_number,onChange(t){g(t)}}:!1})})]})})})}function et(){return e.jsxs(e.Fragment,{children:[e.jsx(be,{children:e.jsx("title",{children:" ReportCustomNew"})}),e.jsx(Oe,{})]})}export{et as default};
