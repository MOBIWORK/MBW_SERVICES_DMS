import{Y as a,aX as ke,a1 as c,L as e,a6 as Ce,R as N,P as m,a8 as Ie,a2 as u,a7 as Te,N as h,Q as p,a9 as De,bz as o,V as v,aW as P,ab as Ee}from"./index-HCg_4A1w.js";import{D as Re}from"./index-nXwj_iCi.js";import{u as Ye,C as Oe}from"./index-cP-jnA7R.js";import{u as x}from"./useDebount-yyIkMT4l.js";import{t as Ke,a as Ve}from"./index-4wDfWZHg.js";import{a as ze,b as We}from"./index.esm-PYO9UVXY.js";import{D as $}from"./index-7-Ff0EeN.js";import{V as Le}from"./VerticalAlignBottomOutlined-XfEnWVh5.js";const y=v().startOf("month"),g=v().endOf("month");let Me=Date.parse(y.$d)/1e3,qe=Date.parse(g.$d)/1e3;const Be=[{title:e.jsx("div",{className:"relative",children:e.jsx("span",{className:"absolute -top-[11px] -left-8",children:"STT"})}),dataIndex:"stt",key:"stt",render:(l,n,d)=>d+1},{title:"Đơn đặt",dataIndex:"name",key:"name",render:(l,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/sales-order/${n.name}`,target:"_blank",children:n.name})})},{title:"Khách hàng",dataIndex:"customer",key:"customer",render:(l,n)=>e.jsx("div",{children:n.customer})},{title:"Khu vực",dataIndex:"territory",key:"territory",render:(l,n)=>e.jsx("div",{children:n.territory})},{title:"Kho",dataIndex:"set_warehouse",key:"set_warehouse"},{title:"Ngày tạo",dataIndex:"transaction_date",key:"transaction_date",render:l=>l?e.jsx("p",{children:v(l*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:"Nhân viên",dataIndex:"employee",key:"employee",render:(l,n)=>e.jsx("div",{className:"!w-[150px]",children:n.employee})},{title:e.jsx("div",{className:"text-right",children:"Thành tiền (VNĐ)"}),dataIndex:"total",key:"total",width:160,render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.total)})},{title:e.jsx("div",{className:"text-right",children:"Tiền VAT (VNĐ)"}),dataIndex:"tax_amount",key:"tax_amount",width:160,render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.tax_amount)})},{title:e.jsx("div",{className:"text-right",children:"Chiết khấu (VNĐ)"}),dataIndex:"discount_amount",key:"discount_amount",width:160,render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.discount_amount)})},{title:e.jsx("div",{className:"text-right",children:"Tổng tiền (VNĐ)"}),dataIndex:"grand_total",key:"grand_total",width:160,render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.grand_total)})}];function Ae(){const[l,n]=a.useState([]),[d,H]=a.useState(0),f=20,[j,X]=a.useState(1),[G,Q]=a.useState([]),[F,w]=a.useState(""),[U,Z]=a.useState(""),[k,C]=a.useState(""),[J,ee]=a.useState([]),[te,ae]=a.useState(""),[I,T]=a.useState(""),[se,re]=a.useState([]),[ne,le]=a.useState(""),[D,E]=a.useState(Me),[R,Y]=a.useState(qe),[O,K]=a.useState(""),[S]=ke(),[oe,ie]=a.useState([]),[ce,me]=a.useState(""),[V,z]=a.useState(""),[de,ue]=a.useState([]),[he,xe]=a.useState([]),[W,pe]=a.useState();let L=x(U,500),M=x(te,500),q=x(ne,500),B=x(ce,500);const[ye,ge]=a.useState("");let A=x(ye);const _=a.useRef(null),b=Ye(),[fe,je]=a.useState(0),[Se,_e]=a.useState(b?.h*.52);a.useEffect(()=>{_e(b.h*.52)},[b]),a.useEffect(()=>{const t=_.current;if(t){const r=new ResizeObserver(s=>{for(let i of s)je(i.contentRect.height)});return r.observe(t),()=>r.disconnect()}},[_]);const be=t=>{const r=[{title:"STT",dataIndex:"stt",key:"stt",render:(s,i,we)=>e.jsx("div",{className:"text-center",children:we+1})},{title:"Mã sản phẩm",dataIndex:"item_code",key:"item_code"},{title:"Tên sản phẩm",dataIndex:"item_name",key:"item_name"},{title:"Nhóm sản phẩm",dataIndex:"item_group",key:"item_group"},{title:"Nhãn hàng",dataIndex:"brand",key:"brand"},{title:e.jsx("div",{className:"text-right",children:"Đơn giá"}),dataIndex:"rate",key:"rate",render:(s,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.rate)})},{title:e.jsx("div",{className:"text-right",children:"Số lượng"}),dataIndex:"qty",key:"qty",render:(s,i)=>e.jsx("div",{className:"!text-right",children:i.qty})},{title:e.jsx("div",{className:"text-right",children:"Chiết khấu (%)"}),dataIndex:"discount_percentage",key:"discount_percentage",render:(s,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.discount_percentage)})},{title:e.jsx("div",{className:"text-right",children:"Tiền chiết khấu"}),dataIndex:"discount_amount",key:"discount_amount",render:(s,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.discount_amount)})},{title:e.jsx("div",{className:"text-right",children:"Tổng tiền (VNĐ)"}),dataIndex:"amount",key:"amount",render:(s,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.amount)})}];return e.jsx(o,{bordered:!0,columns:r,dataSource:t.items.map(s=>({...s,key:s.item_code})),pagination:!1})};a.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:L,doctype:"Company",ignore_user_permissions:0,query:""}}),{message:r}=t;Q(r.map(s=>({value:s.value,label:s.value})))})()},[L]),a.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:q,doctype:"Customer",ignore_user_permissions:0,query:""}}),{message:r}=t;re(r.map(s=>({value:s.value,label:s.value})))})()},[q]),a.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:B,doctype:"Warehouse",ignore_user_permissions:0,query:""}}),{message:r}=t;ie(r.map(s=>({value:s.value,label:s.value})))})()},[B]),a.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:M,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:r}=t;ee(r.map(s=>({value:s.value,label:s.value})))})()},[M]),a.useEffect(()=>{(async()=>{let t=await c.get("/api/method/mbw_dms.api.router.get_team_sale");xe(Ke({data:t.result.map(r=>({title:r.name,value:r.name,...r})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),a.useEffect(()=>{(async()=>{let t=await c.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:W,key_search:A}}),{message:r}=t;ue(r.map(s=>({value:s.employee_code,label:s.employee_name||s.employee_code})))})()},[W,A]),a.useEffect(()=>{(async()=>{const t=await c.get("/api/method/mbw_dms.api.report.so_report.so_report",{params:{page_size:f,page_number:j,company:F,territory:k,customer:I,from_date:D,to_date:R,warehouse:O,employee:V}});let{result:r}=t;n(r),H(r?.totals)})()},[j,F,k,I,D,R,O,V]);const Ne=t=>{if(t==null)E("");else if(g&&t&&t.isAfter(g,"day"))P.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let r=Date.parse(t.$d)/1e3;E(r)}},ve=t=>{if(t==null)Y("");else if(y&&t&&t.isBefore(y,"day"))P.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let r=Date.parse(t.$d)/1e3;Y(r)}},Fe=t=>{t.company?w(t.company):w(""),t.customer?T(t.customer):T(""),t.territory?C(t.territory):C(""),t.warehouse?K(t.warehouse):K("")};return e.jsx(e.Fragment,{children:e.jsx(Oe,{header:e.jsx(Ce,{title:"Báo cáo tổng hợp đặt hàng",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(Le,{className:"text-xl"}),size:"20px",className:"flex items-center",action:()=>{Ve("/app/data-export/Data%20Export")}}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(N,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(m,{className:"ml-4",children:e.jsxs(N,{gutter:[8,8],children:[e.jsx(m,{span:5,children:e.jsx($,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:Ne,defaultValue:y})}),e.jsx(m,{span:5,children:e.jsx($,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:ve,placeholder:"Đến ngày",defaultValue:g})}),e.jsx(m,{span:7,children:e.jsx(Ie,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:he,onChange:t=>{pe(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(m,{span:7,children:e.jsx(u,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{ge(t)},options:de,onSelect:t=>{z(t)},onClear:()=>{z("")}})})]})}),e.jsx(m,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(Te,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(Re,{title:"Bộ lọc",children:[e.jsx("div",{className:"",children:e.jsxs(h,{layout:"vertical",form:S,onFinish:Fe,children:[e.jsx(h.Item,{name:"company",label:"Công ty",className:"w-[468px] border-none",children:e.jsx(u,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:G,allowClear:!0,onSearch:t=>{Z(t)},placeholder:"Tất cả công ty"})}),e.jsx(h.Item,{name:"customer",label:"Khách hàng",className:"w-[468px] border-none",children:e.jsx(u,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:se,filterOption:!1,allowClear:!0,onSearch:t=>{le(t)},placeholder:"Tất cả khách hàng"})}),e.jsx(h.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:e.jsx(u,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:J,allowClear:!0,onSearch:t=>{ae(t)},placeholder:"Tất cẩ khu vực"})}),e.jsx(h.Item,{name:"warehouse",label:"Kho",className:"w-[468px] border-none",children:e.jsx(u,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:oe,allowClear:!0,onSearch:t=>{me(t)},placeholder:"Tất cả kho"})})]})}),e.jsxs(N,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(p,{className:"mr-3",onClick:t=>{t.preventDefault(),S.resetFields()},children:"Đặt lại"}),e.jsx(p,{type:"primary",onClick:()=>{S.submit()},children:"Áp dụng"})]})]})]}),children:e.jsx(p,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8",icon:e.jsx(ze,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(p,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(We,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:_,className:"pt-5",children:e.jsx(De,{dataSource:l?.data?.map(t=>({...t,key:t.name})),expandable:{expandedRowRender:be,defaultExpandedRowKeys:["0"]},bordered:!0,$border:!0,columns:Be,scroll:{x:!0,y:fe<380?void 0:Se},pagination:d&&d>f?{pageSize:f,showSizeChanger:!1,total:d,current:j,onChange(t){X(t)}}:!1,summary:()=>e.jsxs(o.Summary.Row,{children:[e.jsx(o.Summary.Cell,{index:0,className:"!border-r-0"}),e.jsx(o.Summary.Cell,{index:1}),e.jsx(o.Summary.Cell,{index:2,children:"Tổng"}),e.jsx(o.Summary.Cell,{index:3}),e.jsx(o.Summary.Cell,{index:4}),e.jsx(o.Summary.Cell,{index:5}),e.jsx(o.Summary.Cell,{index:6}),e.jsx(o.Summary.Cell,{index:7}),e.jsx(o.Summary.Cell,{index:8,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_total)})}),e.jsx(o.Summary.Cell,{index:9,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_vat)})}),e.jsx(o.Summary.Cell,{index:10,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_discount_amount)})}),e.jsx(o.Summary.Cell,{index:11,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_grand_total)})})]})})})]})})})}function Je(){return e.jsxs(e.Fragment,{children:[e.jsx(Ee,{children:e.jsx("title",{children:" ReportSalesOrder"})}),e.jsx(Ae,{})]})}export{Je as default};
