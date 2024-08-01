import{Y as s,aX as De,a1 as c,L as e,a6 as Ee,R as w,P as h,a8 as Re,a2 as p,a7 as Ye,N as y,Q as f,a9 as Ve,bz as o,V as d,aW as A,ab as ze}from"./index-98eEIqus.js";import{D as Ke}from"./index-q1HT3_iF.js";import{u as Oe,C as We}from"./index-IXbDHFLY.js";import{u as g}from"./useDebount-a9Q03ESF.js";import{t as Le,a as Me}from"./index-njwsvpvm.js";import{a as Be,b as qe}from"./index.esm-khrwDoHR.js";import{D as P}from"./index-9eA_9-na.js";import{S as Ae}from"./SyncOutlined-oNsa6WON.js";import{V as Pe}from"./VerticalAlignBottomOutlined-3tKe5Shl.js";const $=d().startOf("month"),H=d().endOf("month");let $e=Date.parse($.$d)/1e3,He=Date.parse(H.$d)/1e3;const Xe=[{title:e.jsx("div",{className:"relative",children:e.jsx("span",{className:"absolute -top-[11px] -left-8",children:"STT"})}),dataIndex:"stt",key:"stt",render:(l,n,x)=>x+1},{title:"Đơn đặt",dataIndex:"name",key:"name",width:100,render:(l,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/sales-invoice/${n.name}`,target:"_blank",children:n.name})})},{title:"Khách hàng",dataIndex:"customer",key:"customer",width:120,render:(l,n)=>e.jsx("div",{children:n.customer})},{title:"Khu vực",dataIndex:"territory",key:"territory",width:120,render:(l,n)=>e.jsx("div",{children:n.territory})},{title:"Kho",dataIndex:"set_warehouse",key:"set_warehouse",width:80,render:(l,n)=>e.jsx("div",{children:n.set_warehouse})},{title:"Ngày tạo",dataIndex:"posting_date",key:"posting_date",width:120,render:(l,n)=>e.jsx("div",{children:d(n.posting_date*1e3).format("DD/MM/YYYY")})},{title:"Nhân viên",dataIndex:"employee",key:"employee",width:120,render:(l,n)=>e.jsx("div",{children:n.employee})},{title:e.jsx("div",{className:"text-right",children:"Thành tiền (VNĐ)"}),dataIndex:"total",key:"total",width:140,render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.total)})},{title:e.jsx("div",{className:"text-right",children:"Tiền VAT (VNĐ)"}),dataIndex:"tax_amount",key:"tax_amount",width:140,render:(l,n)=>e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(n.tax_amount)})},{title:e.jsx("div",{className:"text-right",children:"Chiết khấu (VNĐ)"}),dataIndex:"discount_amount",key:"discount_amount",width:160,render:(l,n)=>e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(n.discount_amount)})},{title:e.jsx("div",{className:"text-right",children:"Tổng tiền (VNĐ)"}),width:160,dataIndex:"grand_total",key:"grand_total",render:(l,n)=>e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(n.grand_total)})}];function Ge(){const[l,n]=s.useState([]),[x,X]=s.useState(0),j=20,[b]=De(),[S,_]=s.useState(1),[G,Q]=s.useState([]),[F,k]=s.useState(""),[U,Z]=s.useState(""),[C,I]=s.useState(""),[J,ee]=s.useState([]),[te,se]=s.useState(""),[T,D]=s.useState(""),[ae,re]=s.useState([]),[ne,le]=s.useState(""),[m,E]=s.useState($e),[u,R]=s.useState(He),[Y,V]=s.useState(""),[oe,ie]=s.useState([]),[ce,de]=s.useState(""),[z,K]=s.useState(""),[me,ue]=s.useState([]);let O=g(U,500),W=g(te,500),L=g(ne,500),M=g(ce,500);const[he,xe]=s.useState("");let B=g(he);const[pe,ye]=s.useState([]),[q,ge]=s.useState(),N=s.useRef(null),v=Oe(),[fe,je]=s.useState(0),[be,Se]=s.useState(v?.h*.52),[_e,Ne]=s.useState(!1);s.useEffect(()=>{Se(v.h*.52)},[v]),s.useEffect(()=>{const t=N.current;if(t){const r=new ResizeObserver(a=>{for(let i of a)je(i.contentRect.height)});return r.observe(t),()=>r.disconnect()}},[N]);const ve=t=>{const r=[{title:e.jsx("div",{className:"text-center",children:"STT"}),dataIndex:"stt",key:"stt",render:(a,i,Te)=>e.jsx("div",{className:"text-center",children:Te+1})},{title:"Mã sản phẩm",dataIndex:"item_code",key:"item_code"},{title:"Tên sản phẩm",dataIndex:"item_name",key:"item_name"},{title:"Nhóm sản phẩm",dataIndex:"item_group",key:"item_group"},{title:"Nhãn hàng",dataIndex:"brand",key:"brand"},{title:e.jsx("div",{className:"text-right",children:"Đơn giá"}),dataIndex:"rate",key:"rate",render:(a,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.rate)})},{title:e.jsx("div",{className:"text-right",children:"Số lượng"}),dataIndex:"qty",key:"qty",render:(a,i)=>e.jsx("div",{className:"!text-right",children:i.qty})},{title:e.jsx("div",{className:"text-right",children:"Chiết khấu (%)"}),dataIndex:"discount_percentage",key:"discount_percentage",render:(a,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.discount_percentage)})},{title:e.jsx("div",{className:"text-right",children:"Tiền chiết khấu (VNĐ)"}),dataIndex:"discount_amount",key:"discount_amount",render:(a,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.discount_amount)})},{title:e.jsx("div",{className:"text-right",children:"Tổng tiền (VNĐ)"}),dataIndex:"amount",key:"amount",render:(a,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.amount)})}];return e.jsx(o,{bordered:!0,columns:r,dataSource:t.items.map(a=>({...a,key:a.item_code})),pagination:!1})};s.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:O,doctype:"Company",ignore_user_permissions:0,query:""}}),{message:r}=t;Q(r.map(a=>({value:a.value,label:a.value})))})()},[O]),s.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:L,doctype:"Customer",ignore_user_permissions:0,query:""}}),{message:r}=t;re(r.map(a=>({value:a.value,label:a.value})))})()},[L]),s.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:M,doctype:"Warehouse",ignore_user_permissions:0,query:""}}),{message:r}=t;ie(r.map(a=>({value:a.value,label:a.value})))})()},[M]),s.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:W,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:r}=t;ee(r.map(a=>({value:a.value,label:a.value})))})()},[W]),s.useEffect(()=>{(async()=>{let t=await c.get("/api/method/mbw_dms.api.router.get_team_sale");ye(Le({data:t.result.map(r=>({title:r.name,value:r.name,...r})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),s.useEffect(()=>{(async()=>{let t=await c.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:q,key_search:B}}),{message:r}=t;ue(r.map(a=>({value:a.employee_code,label:a.employee_name||a.employee_code})))})()},[q,B]),s.useEffect(()=>{(async()=>{const t=await c.get("/api/method/mbw_dms.api.report.so_report.si_report",{params:{page_size:j,page_number:S,company:F,territory:C,customer:T,from_date:m,to_date:u,warehouse:Y,employee:z}});let{result:r}=t;n(r),X(r?.totals)})()},[S,F,C,T,m,u,Y,z,_e]);const we=t=>{if(t==null)E("");else if(u&&t&&t.isAfter(d.unix(u),"day"))A.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let r=Date.parse(t.$d)/1e3;E(r)}},Fe=t=>{if(t==null)R("");else if(m&&t&&t.isBefore(d.unix(m),"day"))A.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let r=Date.parse(t.$d)/1e3;R(r)}},ke=t=>u?t&&t.isAfter(d.unix(u),"day"):!1,Ce=t=>m?t&&t.isBefore(d.unix(m),"day"):!1,Ie=t=>{t.company?k(t.company):k(""),t.customer?D(t.customer):D(""),t.territory?I(t.territory):I(""),t.warehouse?V(t.warehouse):V(""),_(1)};return e.jsx(e.Fragment,{children:e.jsx(We,{header:e.jsx(Ee,{title:"Báo cáo tổng hợp bán hàng",buttons:[{icon:e.jsx(Ae,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{Ne(t=>!t)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(Pe,{className:"text-xl"}),size:"18px",className:"flex items-center",action:()=>{Me("/app/data-export/Data%20Export")}}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(w,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(h,{className:"ml-4",children:e.jsxs(w,{gutter:[8,8],children:[e.jsx(h,{span:5,children:e.jsx(P,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:we,defaultValue:$,disabledDate:ke})}),e.jsx(h,{span:5,children:e.jsx(P,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:Fe,placeholder:"Đến ngày",defaultValue:H,disabledDate:Ce})}),e.jsx(h,{span:7,children:e.jsx(Re,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:pe,onChange:t=>{ge(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(h,{span:7,children:e.jsx(p,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{xe(t)},options:me,onSelect:t=>{K(t),_(1)},onClear:()=>{K("")}})})]})}),e.jsx(h,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(Ye,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(Ke,{title:"Bộ lọc",children:[e.jsx("div",{className:"",children:e.jsxs(y,{layout:"vertical",form:b,onFinish:Ie,children:[e.jsx(y.Item,{name:"company",label:"Công ty",className:"w-[468px] border-none",children:e.jsx(p,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:G,allowClear:!0,onSearch:t=>{Z(t)},placeholder:"Tất cả công ty"})}),e.jsx(y.Item,{name:"customer",label:"Khách hàng",className:"w-[468px] border-none",children:e.jsx(p,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:ae,filterOption:!1,allowClear:!0,onSearch:t=>{le(t)},placeholder:"Tất cả khách hàng"})}),e.jsx(y.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:e.jsx(p,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:J,allowClear:!0,onSearch:t=>{se(t)},placeholder:"Tất cẩ khu vực"})}),e.jsx(y.Item,{name:"warehouse",label:"Kho",className:"w-[468px] border-none",children:e.jsx(p,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:oe,allowClear:!0,onSearch:t=>{de(t)},placeholder:"Tất cả kho"})})]})}),e.jsxs(w,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(f,{className:"mr-3",onClick:t=>{t.preventDefault(),b.resetFields()},children:"Đặt lại"}),e.jsx(f,{type:"primary",onClick:()=>{b.submit()},children:"Áp dụng"})]})]})]}),children:e.jsx(f,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8",icon:e.jsx(Be,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(f,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(qe,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:N,className:"pt-5",children:e.jsx(Ve,{dataSource:l?.data?.map(t=>({...t,key:t.name})),expandable:{expandedRowRender:ve,defaultExpandedRowKeys:["0"]},bordered:!0,$border:!0,columns:Xe,scroll:{x:!0,y:fe<380?void 0:be},pagination:x&&x>j?{pageSize:j,showSizeChanger:!1,total:x,current:S,onChange(t){_(t)}}:!1,summary:()=>e.jsxs(o.Summary.Row,{children:[e.jsx(o.Summary.Cell,{index:0,className:"!border-r-0"}),e.jsx(o.Summary.Cell,{index:1}),e.jsx(o.Summary.Cell,{index:2,children:"Tổng"}),e.jsx(o.Summary.Cell,{index:3}),e.jsx(o.Summary.Cell,{index:4}),e.jsx(o.Summary.Cell,{index:5}),e.jsx(o.Summary.Cell,{index:6}),e.jsx(o.Summary.Cell,{index:7}),e.jsx(o.Summary.Cell,{index:8,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_total)})}),e.jsx(o.Summary.Cell,{index:9,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_vat)})}),e.jsx(o.Summary.Cell,{index:10,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_discount_amount)})}),e.jsx(o.Summary.Cell,{index:11,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_grand_total)})})]})})})]})})})}function nt(){return e.jsxs(e.Fragment,{children:[e.jsx(ze,{children:e.jsx("title",{children:" ReportSales"})}),e.jsx(Ge,{})]})}export{nt as default};
