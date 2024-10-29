import{Y as s,a_ as Se,a1 as i,a6 as be,L as e,a7 as ke,bD as Ce,R as I,P as c,aa as we,a2 as u,a9 as Ne,N as h,Q as x,ab as Fe,bE as l,V as m,aZ as A,ad as ve}from"./index-vZfgxf7p.js";import{D as De}from"./index-7ZEpIO9-.js";import{u as Te,C as Ye,S as Ie}from"./index-ZouZ_lpj.js";import{e as Ee,f as Me}from"./data-u-VkVTNg.js";import{u as p}from"./useDebount-EI1KB0SQ.js";import{a as Re,b as ze}from"./index.esm-f6CfrWsS.js";import{D as $}from"./index-dL95hn5Q.js";import{V as Le}from"./VerticalAlignBottomOutlined-EJh0_oL6.js";const y=m().startOf("month"),j=m().endOf("month");let Oe=Date.parse(y.$d)/1e3,Ve=Date.parse(j.$d)/1e3;const Ge=[{title:"STT",dataIndex:"stt",key:"stt",className:"!text-center",width:60,render:(r,a,d)=>e.jsx("div",{className:"text-center",children:d+1})},{title:"Mã nhân viên",dataIndex:"name",key:"name"},{title:"Tên nhân viên",dataIndex:"employee_name",key:"employee_name"},{title:"Nhóm bán hàng",dataIndex:"sales_team",key:"sales_team",width:200,render:(r,a)=>e.jsx("div",{children:a.sales_team})},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code",render:(r,a)=>e.jsx("div",{children:a.customer_code})},{title:"Tên khách hàng",dataIndex:"customer_name",key:"customer_name",render:(r,a)=>e.jsx("div",{children:a.customer_name})},{title:"Loại khách hàng",dataIndex:"customer_type",key:"customer_type",render:(r,a)=>e.jsx("div",{children:a.customer_type})},{title:"Nhóm khách hàng",dataIndex:"customer_group",key:"customer_group",width:170,render:(r,a)=>e.jsx("div",{className:"truncate",children:a.customer_group})},{title:"Người liên hệ",dataIndex:"contact",key:"contact",render:(r,a)=>e.jsx("div",{children:a.contact})},{title:"SDT",dataIndex:"phone",key:"phone",render:(r,a)=>e.jsx("div",{children:a.phone})},{title:"Mã số thuế",dataIndex:"tax_id",key:"tax_id",render:(r,a)=>e.jsx("div",{children:a.tax_id})},{title:"Khu vưc",dataIndex:"territory",key:"territory",render:(r,a)=>e.jsx("div",{children:a.territory})},{title:"Địa chỉ",dataIndex:"address",key:"address",render:(r,a)=>e.jsx("div",{className:"truncate",children:a.address})},{title:"Ngày thu thập",dataIndex:"creation",key:"creation",render:(r,a)=>e.jsx("div",{children:m(a.creation*1e3).format("DD/MM/YYYY")})},{title:"Nguồn",dataIndex:"f1",key:"f1",className:"!text-center",render:r=>e.jsx("div",{className:"!text-center",children:r||"-"})},{title:e.jsx("div",{className:"!text-right",children:"Số lần VT"}),dataIndex:"totals_checkin",key:"totals_checkin",render:(r,a)=>e.jsx("div",{className:"!text-right",children:a.totals_checkin})},{title:"VT đầu",dataIndex:"first_checkin",key:"first_checkin",render:r=>r?e.jsx("p",{children:m(r*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:"VT cuối",dataIndex:"last_checkin",key:"last_checkin",render:r=>r?e.jsx("p",{children:m(r*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:e.jsx("div",{className:"!text-right",children:"Số đơn hàng"}),dataIndex:"totals_so",key:"totals_so",render:(r,a)=>e.jsx("div",{className:"!text-right",children:a.totals_so})},{title:"Đơn hàng cuối",dataIndex:"last_sale_order",key:"last_sale_order",render:r=>r?e.jsx("p",{children:m(r*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})}];function Pe(){const[r,a]=s.useState([]),[d,q]=s.useState(0),g=20,[E,f]=s.useState(1),[_]=Se(),[S,M]=s.useState(""),[X,Z]=s.useState([]),[Be,Q]=s.useState([]),[b,He]=s.useState(""),[W,Ke]=s.useState(""),[k,R]=s.useState("");let z=p(W,500);const[C,L]=s.useState(Oe),[w,O]=s.useState(Ve),[N,V]=s.useState(""),[J,U]=s.useState([]),[ee,te]=s.useState("");let G=p(ee,500);const[F,P]=s.useState(""),[se,re]=s.useState([]),[ae,ne]=s.useState("");let B=p(ae,500);const[v,H]=s.useState(),[le,oe]=s.useState([]),[D,ie]=s.useState(),[ce,me]=s.useState("");let K=p(ce);const T=s.useRef(null),Y=Te(),[Ae,de]=s.useState(0),[$e,ue]=s.useState(Y?.h*.52),[he,xe]=s.useState(!1),[pe,ye]=s.useState(!1);s.useEffect(()=>{ue(Y.h*.52)},[Y]),s.useEffect(()=>{const t=T.current;if(t){const n=new ResizeObserver(o=>{for(let _e of o)de(_e.contentRect.height)});return n.observe(t),()=>n.disconnect()}},[T]);const je=t=>{if(t==null)L("");else if(j&&t&&t.isAfter(j,"day"))A.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let n=Date.parse(t.$d)/1e3;L(n)}},ge=t=>{if(t==null)O("");else if(y&&t&&t.isBefore(y,"day"))A.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let n=Date.parse(t.$d)/1e3;O(n)}},fe=t=>{t.customergroup?V(t.customergroup):V(""),t.customertype?R(t.customertype):R(""),t.territory,P(t.territory),t.hasorder?H(t.hasorder):H(void 0),f(1)};return s.useEffect(()=>{(async()=>{let t=await i.get("/api/method/mbw_dms.api.router.get_team_sale");oe(be({data:t.result.map(n=>({title:n.name,value:n.name,...n})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),s.useEffect(()=>{(async()=>{let t=await i.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:D,key_search:K}}),{message:n}=t;Z(n.map(o=>({value:o.employee_name,label:o.employee_name||o.employee_code})))})()},[D,K]),s.useEffect(()=>{(async()=>{let t=await i.get("/api/method/frappe.desk.search.search_link",{params:{txt:z,doctype:"Department",ignore_user_permissions:0,query:""}}),{message:n}=t;Q(n.map(o=>({value:o.value.trim(),label:o.value.trim()})))})()},[z]),s.useEffect(()=>{(async()=>{let t=await i.get("/api/method/frappe.desk.search.search_link",{params:{txt:G,doctype:"Customer Group",ignore_user_permissions:0,query:""}}),{message:n}=t;U(n.map(o=>({value:o.value.trim(),label:o.value.trim()})))})()},[G]),s.useEffect(()=>{(async()=>{let t=await i.get("/api/method/frappe.desk.search.search_link",{params:{txt:B,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:n}=t;re(n.map(o=>({value:o.value,label:o.value})))})()},[B]),s.useEffect(()=>{(async()=>{const t=await i.get("/api/method/mbw_dms.api.report.customer_report.customer_report",{params:{page_size:g,page_number:E,customer_type:k,customer_group:N,territory:F,employee:S,has_sales_order:v,department:b,from_date:C,to_date:w}});let{result:n}=t;console.log({result:n}),a({...n,data:n.data?.map(o=>({...o,key:o.cus_id}))}),q(n?.totals_cus)})()},[E,k,N,F,S,v,b,he,C,w]),console.log(r?.data),e.jsx(e.Fragment,{children:e.jsx(Ye,{header:e.jsx(ke,{title:"Báo cáo khách hàng mới",buttons:[{icon:e.jsx(Ie,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{xe(t=>!t)}},{disabled:pe,label:"Xuất dữ liệu",type:"primary",icon:e.jsx(Le,{className:"text-xl"}),size:"18px",className:"flex items-center",action:Ce.bind(null,{url:"/api/method/mbw_dms.api.exports.export_excel.export_excel",params:{report_type:"Report Customer",data_filter:{customer_type:k,customer_group:N,territory:F,sales_person:S,sales_team:D,has_sales_order:v,department:b,from_date:C,to_date:w}},file_name:"Report Customer.xlsx"},ye)}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(I,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(c,{className:"ml-4",children:e.jsxs(I,{gutter:[8,8],children:[e.jsx(c,{span:5,children:e.jsx($,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:je,defaultValue:y})}),e.jsx(c,{span:5,children:e.jsx($,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:ge,placeholder:"Đến ngày",defaultValue:j})}),e.jsx(c,{span:7,children:e.jsx(we,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:le,onChange:t=>{ie(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(c,{span:7,children:e.jsx(u,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{me(t)},options:X,onSelect:t=>{M(t),f(1)},onClear:()=>{M("")}})})]})}),e.jsx(c,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(Ne,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(De,{title:"Bộ lọc",children:[e.jsx("div",{className:"",children:e.jsxs(h,{layout:"vertical",form:_,onFinish:fe,children:[e.jsx(h.Item,{name:"customertype",label:"Loại khách hàng",className:"w-[468px] border-none",children:e.jsx(u,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Ee,allowClear:!0,showSearch:!0,placeholder:"Tất cả loại khách hàng"})}),e.jsx(h.Item,{name:"customergroup",label:"Nhóm khách hàng",className:"w-[468px] border-none",children:e.jsx(u,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:J,allowClear:!0,onSearch:t=>{te(t)},showSearch:!0,placeholder:"Tất cả nhóm khách hàng"})}),e.jsx(h.Item,{label:"Phát sinh đơn hàng",name:"hasorder",className:"w-[468px] border-none",children:e.jsx(u,{placeholder:"Tất cả",className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Me,allowClear:!0,showSearch:!0})}),e.jsx(h.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:e.jsx(u,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:se,allowClear:!0,onSearch:t=>{ne(t)},showSearch:!0,placeholder:"Tất cẩ khu vực"})})]})}),e.jsxs(I,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(x,{className:"mr-3",onClick:t=>{t.preventDefault(),_.resetFields()},children:"Đặt lại"}),e.jsx(x,{type:"primary",onClick:()=>{_.submit()},children:"Áp dụng"})]})]})]}),children:e.jsx(x,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8",icon:e.jsx(Re,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(x,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(ze,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:T,className:"pt-5",children:e.jsx(Fe,{dataSource:r?.data,bordered:!0,columns:Ge,scroll:{x:3e3,y:400},pagination:d&&d>g?{pageSize:g,showSizeChanger:!1,total:d,current:r.page_number,onChange(t){f(t)}}:!1,summary:()=>e.jsxs(l.Summary.Row,{children:[e.jsx(l.Summary.Cell,{index:0}),e.jsx(l.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(l.Summary.Cell,{index:2}),e.jsx(l.Summary.Cell,{index:3}),e.jsx(l.Summary.Cell,{index:4}),e.jsx(l.Summary.Cell,{index:5}),e.jsx(l.Summary.Cell,{index:6}),e.jsx(l.Summary.Cell,{index:7}),e.jsx(l.Summary.Cell,{index:8}),e.jsx(l.Summary.Cell,{index:9}),e.jsx(l.Summary.Cell,{index:10}),e.jsx(l.Summary.Cell,{index:11}),e.jsx(l.Summary.Cell,{index:12}),e.jsx(l.Summary.Cell,{index:13,children:e.jsx("div",{className:"text-right",children:r?.sum?.sum_checkin})}),e.jsx(l.Summary.Cell,{index:14}),e.jsx(l.Summary.Cell,{index:15}),e.jsx(l.Summary.Cell,{index:16,children:e.jsx("div",{className:"text-right",children:r?.sum?.sum_so})}),e.jsx(l.Summary.Cell,{index:17})]})})})]})})})}function tt(){return e.jsxs(e.Fragment,{children:[e.jsx(ve,{children:e.jsx("title",{children:" ReportCustomNew"})}),e.jsx(Pe,{})]})}export{tt as default};
