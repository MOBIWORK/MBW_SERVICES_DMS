import{Y as s,aX as De,a1 as m,L as e,a6 as Ee,R as T,P as h,a8 as Re,a2 as p,a7 as Oe,N as y,Q as g,a9 as Ye,bz as o,V as u,aW as A,ab as ze}from"./index-2HP0RfjX.js";import{D as Ke}from"./index-lLWskibh.js";import{u as Ve,C as We,S as Le}from"./index-OJLSNTfB.js";import{u as f}from"./useDebount-E1S_7vEd.js";import{t as Me,h as Be}from"./index-9TORzD_2.js";import{a as qe,b as Ae}from"./index.esm-_UqmgvFM.js";import{D as P}from"./index-nR2a4o1l.js";import{V as Pe}from"./VerticalAlignBottomOutlined-hKOWhnA6.js";import"./FileSaver.min-nraNywVD.js";const $=u().startOf("month"),H=u().endOf("month");let $e=Date.parse($.$d)/1e3,He=Date.parse(H.$d)/1e3;const Xe=[{title:e.jsx("div",{className:"relative",children:e.jsx("span",{className:"absolute -top-[11px] -left-8",children:"STT"})}),dataIndex:"stt",key:"stt",render:(l,n,x)=>x+1},{title:"Đơn đặt",dataIndex:"name",key:"name",render:(l,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/sales-order/${n.name}`,target:"_blank",children:n.name})})},{title:"Khách hàng",dataIndex:"customer",key:"customer",render:(l,n)=>e.jsx("div",{children:n.customer})},{title:"Khu vực",dataIndex:"territory",key:"territory",render:(l,n)=>e.jsx("div",{children:n.territory})},{title:"Kho",dataIndex:"set_warehouse",key:"set_warehouse"},{title:"Ngày tạo",dataIndex:"transaction_date",key:"transaction_date",render:l=>l?e.jsx("p",{children:u(l*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:"Nhân viên",dataIndex:"employee",key:"employee",render:(l,n)=>e.jsx("div",{className:"!w-[150px]",children:n.employee})},{title:e.jsx("div",{className:"text-right",children:"Thành tiền (VNĐ)"}),dataIndex:"total",key:"total",width:160,render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.total)})},{title:e.jsx("div",{className:"text-right",children:"Tiền VAT (VNĐ)"}),dataIndex:"tax_amount",key:"tax_amount",width:160,render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.tax_amount)})},{title:e.jsx("div",{className:"text-right",children:"Chiết khấu (VNĐ)"}),dataIndex:"discount_amount",key:"discount_amount",width:160,render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.discount_amount)})},{title:e.jsx("div",{className:"text-right",children:"Tổng tiền (VNĐ)"}),dataIndex:"grand_total",key:"grand_total",width:160,render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.grand_total)})}];function Ge(){const[l,n]=s.useState([]),[x,X]=s.useState(0),j=20,[_,b]=s.useState(1),[G,Q]=s.useState([]),[S,D]=s.useState(""),[Z,J]=s.useState(""),[N,E]=s.useState(""),[U,ee]=s.useState([]),[te,se]=s.useState(""),[v,R]=s.useState(""),[ae,re]=s.useState([]),[ne,le]=s.useState(""),[c,O]=s.useState($e),[d,Y]=s.useState(He),[w,z]=s.useState(""),[F]=De(),[oe,ie]=s.useState([]),[ce,de]=s.useState(""),[k,K]=s.useState(""),[me,ue]=s.useState([]),[he,xe]=s.useState([]),[V,pe]=s.useState();let W=f(Z,500),L=f(te,500),M=f(ne,500),B=f(ce,500);const[ye,fe]=s.useState("");let q=f(ye);const C=s.useRef(null),I=Ve(),[ge,je]=s.useState(0),[_e,be]=s.useState(!1),[Se,Ne]=s.useState(I?.h*.52);s.useEffect(()=>{Ne(I.h*.52)},[I]),s.useEffect(()=>{const t=C.current;if(t){const r=new ResizeObserver(a=>{for(let i of a)je(i.contentRect.height)});return r.observe(t),()=>r.disconnect()}},[C]);const ve=t=>{const r=[{title:"STT",dataIndex:"stt",key:"stt",render:(a,i,Te)=>e.jsx("div",{className:"text-center",children:Te+1})},{title:"Mã sản phẩm",dataIndex:"item_code",key:"item_code"},{title:"Tên sản phẩm",dataIndex:"item_name",key:"item_name"},{title:"Nhóm sản phẩm",dataIndex:"item_group",key:"item_group"},{title:"Nhãn hàng",dataIndex:"brand",key:"brand"},{title:e.jsx("div",{className:"text-right",children:"Đơn giá"}),dataIndex:"rate",key:"rate",render:(a,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.rate)})},{title:e.jsx("div",{className:"text-right",children:"Số lượng"}),dataIndex:"qty",key:"qty",render:(a,i)=>e.jsx("div",{className:"!text-right",children:i.qty})},{title:e.jsx("div",{className:"text-right",children:"Chiết khấu (%)"}),dataIndex:"discount_percentage",key:"discount_percentage",render:(a,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.discount_percentage)})},{title:e.jsx("div",{className:"text-right",children:"Tiền chiết khấu"}),dataIndex:"discount_amount",key:"discount_amount",render:(a,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.discount_amount)})},{title:e.jsx("div",{className:"text-right",children:"Tổng tiền (VNĐ)"}),dataIndex:"amount",key:"amount",render:(a,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.amount)})}];return e.jsx(o,{bordered:!0,columns:r,dataSource:t.items.map(a=>({...a,key:a.item_code})),pagination:!1})};s.useEffect(()=>{(async()=>{let t=await m.get("/api/method/frappe.desk.search.search_link",{params:{txt:W,doctype:"Company",ignore_user_permissions:0,query:""}}),{message:r}=t;Q(r.map(a=>({value:a.value,label:a.value})))})()},[W]),s.useEffect(()=>{(async()=>{let t=await m.get("/api/method/frappe.desk.search.search_link",{params:{txt:M,doctype:"Customer",ignore_user_permissions:0,query:""}}),{message:r}=t;re(r.map(a=>({value:a.value,label:a.value})))})()},[M]),s.useEffect(()=>{(async()=>{let t=await m.get("/api/method/frappe.desk.search.search_link",{params:{txt:B,doctype:"Warehouse",ignore_user_permissions:0,query:""}}),{message:r}=t;ie(r.map(a=>({value:a.value,label:a.value})))})()},[B]),s.useEffect(()=>{(async()=>{let t=await m.get("/api/method/frappe.desk.search.search_link",{params:{txt:L,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:r}=t;ee(r.map(a=>({value:a.value,label:a.value})))})()},[L]),s.useEffect(()=>{(async()=>{let t=await m.get("/api/method/mbw_dms.api.router.get_team_sale");xe(Me({data:t.result.map(r=>({title:r.name,value:r.name,...r})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),s.useEffect(()=>{(async()=>{let t=await m.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:V,key_search:q}}),{message:r}=t;ue(r.map(a=>({value:a.employee_code,label:a.employee_name||a.employee_code})))})()},[V,q]),s.useEffect(()=>{(async()=>{const t=await m.get("/api/method/mbw_dms.api.report.so_report.so_report",{params:{page_size:j,page_number:_,company:S,territory:N,customer:v,from_date:c,to_date:d,warehouse:w,employee:k}});let{result:r}=t;n(r),X(r?.totals)})()},[_,S,N,v,c,d,w,k,_e]);const we=t=>{if(t==null)O("");else if(d&&t&&t.isAfter(u.unix(d),"day"))A.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let r=Date.parse(t.$d)/1e3;O(r)}},Fe=t=>{if(t==null)Y("");else if(c&&t&&t.isBefore(u.unix(c),"day"))A.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let r=Date.parse(t.$d)/1e3;Y(r)}},ke=t=>d?t&&t.isAfter(u.unix(d),"day"):!1,Ce=t=>c?t&&t.isBefore(u.unix(c),"day"):!1,Ie=t=>{t.company?D(t.company):D(""),t.customer?R(t.customer):R(""),t.territory?E(t.territory):E(""),t.warehouse?z(t.warehouse):z(""),b(1)};return e.jsx(e.Fragment,{children:e.jsx(We,{header:e.jsx(Ee,{title:"Báo cáo tổng hợp đặt hàng",buttons:[{icon:e.jsx(Le,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{be(t=>!t)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(Pe,{className:"text-xl"}),size:"20px",className:"flex items-center",action:Be.bind(null,{url:"/api/method/mbw_dms.api.exports.export_excel.export_excel",params:{report_type:"Report Order",data_filter:{company:S,territory:N,customer:v,from_date:c,to_date:d,warehouse:w,sales_person:k}},file_name:"Report Order.xlsx"})}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(T,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(h,{className:"ml-4",children:e.jsxs(T,{gutter:[8,8],children:[e.jsx(h,{span:5,children:e.jsx(P,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:we,defaultValue:$,disabledDate:ke})}),e.jsx(h,{span:5,children:e.jsx(P,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:Fe,placeholder:"Đến ngày",defaultValue:H,disabledDate:Ce})}),e.jsx(h,{span:7,children:e.jsx(Re,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:he,onChange:t=>{pe(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(h,{span:7,children:e.jsx(p,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{fe(t)},options:me,onSelect:t=>{K(t),b(1)},onClear:()=>{K("")}})})]})}),e.jsx(h,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(Oe,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(Ke,{title:"Bộ lọc",children:[e.jsx("div",{className:"",children:e.jsxs(y,{layout:"vertical",form:F,onFinish:Ie,children:[e.jsx(y.Item,{name:"company",label:"Công ty",className:"w-[468px] border-none",children:e.jsx(p,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:G,allowClear:!0,onSearch:t=>{J(t)},placeholder:"Tất cả công ty"})}),e.jsx(y.Item,{name:"customer",label:"Khách hàng",className:"w-[468px] border-none",children:e.jsx(p,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:ae,filterOption:!1,allowClear:!0,onSearch:t=>{le(t)},placeholder:"Tất cả khách hàng"})}),e.jsx(y.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:e.jsx(p,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:U,allowClear:!0,onSearch:t=>{se(t)},placeholder:"Tất cẩ khu vực"})}),e.jsx(y.Item,{name:"warehouse",label:"Kho",className:"w-[468px] border-none",children:e.jsx(p,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:oe,allowClear:!0,onSearch:t=>{de(t)},placeholder:"Tất cả kho"})})]})}),e.jsxs(T,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(g,{className:"mr-3",onClick:t=>{t.preventDefault(),F.resetFields()},children:"Đặt lại"}),e.jsx(g,{type:"primary",onClick:()=>{F.submit()},children:"Áp dụng"})]})]})]}),children:e.jsx(g,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8",icon:e.jsx(qe,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(g,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(Ae,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:C,className:"pt-5",children:e.jsx(Ye,{dataSource:l?.data?.map(t=>({...t,key:t.name})),expandable:{expandedRowRender:ve,defaultExpandedRowKeys:["0"]},bordered:!0,$border:!0,columns:Xe,scroll:{x:!0,y:ge<380?void 0:Se},pagination:x&&x>j?{pageSize:j,showSizeChanger:!1,total:x,current:_,onChange(t){b(t)}}:!1,summary:()=>e.jsxs(o.Summary.Row,{children:[e.jsx(o.Summary.Cell,{index:0,className:"!border-r-0"}),e.jsx(o.Summary.Cell,{index:1}),e.jsx(o.Summary.Cell,{index:2,children:"Tổng"}),e.jsx(o.Summary.Cell,{index:3}),e.jsx(o.Summary.Cell,{index:4}),e.jsx(o.Summary.Cell,{index:5}),e.jsx(o.Summary.Cell,{index:6}),e.jsx(o.Summary.Cell,{index:7}),e.jsx(o.Summary.Cell,{index:8,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_total)})}),e.jsx(o.Summary.Cell,{index:9,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_vat)})}),e.jsx(o.Summary.Cell,{index:10,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_discount_amount)})}),e.jsx(o.Summary.Cell,{index:11,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_grand_total)})})]})})})]})})})}function nt(){return e.jsxs(e.Fragment,{children:[e.jsx(ze,{children:e.jsx("title",{children:" ReportSalesOrder"})}),e.jsx(Ge,{})]})}export{nt as default};
