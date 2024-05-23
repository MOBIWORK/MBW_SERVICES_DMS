import{Y as a,aS as je,a3 as d,L as e,R as j,P as f,N as P,O as m,a5 as c,a4 as fe,Q as h,a6 as Ne,bv as o,V as N,aR as z,a8 as be}from"./index-3DFh7Nef.js";import{H as _e}from"./header-page-8MCBYvke.js";import{D as Se}from"./index-HNKpXLK0.js";import{C as Fe}from"./index-GcYRjbdc.js";import{u}from"./useDebount-CNVqMEwV.js";import{t as ve,a as ke}from"./index-_89DXT5f.js";import{a as Ce,b as we}from"./index.esm-MaP8vEVf.js";import{D as A}from"./index-WIcwIoO4.js";import{T as Te}from"./index-pwzslDWY.js";import{V as Ie}from"./VerticalAlignBottomOutlined-Ta1qYFvF.js";const x=N().startOf("month"),p=N().endOf("month");let De=Date.parse(x.$d)/1e3,Ee=Date.parse(p.$d)/1e3;const Ye=[{title:e.jsx("div",{className:"relative",children:e.jsx("span",{className:"absolute -top-[11px] -left-8",children:"STT"})}),dataIndex:"stt",key:"stt",render:(l,n,y)=>y+1},{title:"Đơn đặt",dataIndex:"name",key:"name",render:(l,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/sales-order/${n.name}`,target:"_blank",children:n.name})})},{title:"Khách hàng",dataIndex:"customer",key:"customer",render:(l,n)=>e.jsx("div",{children:n.customer})},{title:"Khu vực",dataIndex:"territory",key:"territory",render:(l,n)=>e.jsx("div",{children:n.territory})},{title:"Kho",dataIndex:"set_warehouse",key:"set_warehouse"},{title:"Ngày tạo",dataIndex:"transaction_date",key:"transaction_date",render:l=>l?e.jsx("p",{children:N(l*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:"Nhân viên",dataIndex:"employee",key:"employee",render:(l,n)=>e.jsx("div",{className:"!w-[150px]",children:n.employee})},{title:e.jsx("div",{className:"text-right",children:"Thành tiền (VNĐ)"}),dataIndex:"total",key:"total",render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.total)})},{title:e.jsx("div",{className:"text-right",children:"Tiền VAT (VNĐ)"}),dataIndex:"tax_amount",key:"tax_amount",render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.tax_amount)})},{title:e.jsx("div",{className:"text-right",children:"Chiết khấu (VNĐ)"}),dataIndex:"discount_amount",key:"discount_amount",render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.discount_amount)})},{title:e.jsx("div",{className:"text-right",children:"Tổng tiền (VNĐ)"}),dataIndex:"grand_total",key:"grand_total",render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.grand_total)})}];function Ke(){const[l,n]=a.useState([]),[y,$]=a.useState(0),b=20,[_,H]=a.useState(1),[X,G]=a.useState([]),[S,F]=a.useState(""),[Q,Re]=a.useState(""),[v,k]=a.useState(""),[U,Z]=a.useState([]),[J,Ve]=a.useState(""),[C,w]=a.useState(""),[ee,te]=a.useState([]),[ae,Oe]=a.useState(""),[T,I]=a.useState(De),[D,E]=a.useState(Ee),[Y,K]=a.useState(""),[g]=je(),[se,re]=a.useState([]),[ne,Le]=a.useState(""),[R,V]=a.useState(""),[le,oe]=a.useState([]),[ie,me]=a.useState([]),[O,de]=a.useState();let L=u(Q,500),M=u(J,500),W=u(ae,500),q=u(ne,500);const[ce,ue]=a.useState("");let B=u(ce);const he=t=>{const r=[{title:"STT",dataIndex:"stt",key:"stt",render:(s,i,ge)=>ge+1},{title:"Mã sản phẩm",dataIndex:"item_code",key:"item_code"},{title:"Tên sản phẩm",dataIndex:"item_name",key:"item_name"},{title:"Nhóm sản phẩm",dataIndex:"item_group",key:"item_group"},{title:"Nhãn hàng",dataIndex:"brand",key:"brand"},{title:e.jsx("div",{className:"text-right",children:"Đơn giá"}),dataIndex:"rate",key:"rate",render:(s,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.rate)})},{title:e.jsx("div",{className:"text-right",children:"Số lượng"}),dataIndex:"qty",key:"qty",render:(s,i)=>e.jsx("div",{className:"!text-right",children:i.qty})},{title:e.jsx("div",{className:"text-right",children:"Chiết khấu (%)"}),dataIndex:"discount_percentage",key:"discount_percentage",render:(s,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.discount_percentage)})},{title:e.jsx("div",{className:"text-right",children:"Tiền chiết khấu"}),dataIndex:"discount_amount",key:"discount_amount",render:(s,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.discount_amount)})},{title:e.jsx("div",{className:"text-right",children:"Tổng tiền (VNĐ)"}),dataIndex:"amount",key:"amount",render:(s,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.amount)})}];return e.jsx(o,{columns:r,dataSource:t.items.map(s=>({...s,key:s.item_code})),pagination:!1})};a.useEffect(()=>{(async()=>{let t=await d.get("/api/method/frappe.desk.search.search_link",{params:{txt:L,doctype:"Company",ignore_user_permissions:0,query:""}}),{message:r}=t;G(r.map(s=>({value:s.value,label:s.value})))})()},[L]),a.useEffect(()=>{(async()=>{let t=await d.get("/api/method/frappe.desk.search.search_link",{params:{txt:W,doctype:"Customer",ignore_user_permissions:0,query:""}}),{message:r}=t;te(r.map(s=>({value:s.value,label:s.value})))})()},[W]),a.useEffect(()=>{(async()=>{let t=await d.get("/api/method/frappe.desk.search.search_link",{params:{txt:q,doctype:"Warehouse",ignore_user_permissions:0,query:""}}),{message:r}=t;re(r.map(s=>({value:s.value,label:s.value})))})()},[q]),a.useEffect(()=>{(async()=>{let t=await d.get("/api/method/frappe.desk.search.search_link",{params:{txt:M,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:r}=t;Z(r.map(s=>({value:s.value,label:s.value})))})()},[M]),a.useEffect(()=>{(async()=>{let t=await d.get("/api/method/mbw_dms.api.router.get_team_sale");me(ve({data:t.result.map(r=>({title:r.name,value:r.name,...r})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),a.useEffect(()=>{(async()=>{let t=await d.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:O,key_search:B}}),{message:r}=t;oe(r.map(s=>({value:s.employee_code,label:s.employee_name||s.employee_code})))})()},[O,B]),a.useEffect(()=>{(async()=>{const t=await d.get("/api/method/mbw_dms.api.report.so_report.so_report",{params:{page_size:b,page_number:_,company:S,territory:v,customer:C,from_date:T,to_date:D,warehouse:Y,employee:R}});let{result:r}=t;n(r),$(r?.totals)})()},[_,S,v,C,T,D,Y,R]);const xe=t=>{if(t==null)I("");else if(p&&t&&t.isAfter(p,"day"))z.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let r=Date.parse(t.$d)/1e3;I(r)}},pe=t=>{if(t==null)E("");else if(x&&t&&t.isBefore(x,"day"))z.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let r=Date.parse(t.$d)/1e3;E(r)}},ye=t=>{t.company?F(t.company):F(""),t.customer?w(t.customer):w(""),t.territory?k(t.territory):k(""),t.warehouse?K(t.warehouse):K("")};return e.jsx(e.Fragment,{children:e.jsx(Fe,{header:e.jsx(_e,{title:"Báo cáo tổng hợp đặt hàng",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(Ie,{className:"text-xl"}),size:"20px",className:"flex items-center",action:()=>{ke("/app/data-export/Data%20Export")}}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(j,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(f,{children:e.jsx(j,{gutter:[8,8],children:e.jsx(f,{className:"mx-4 w-full",span:24,children:e.jsxs(P,{layout:"vertical",className:"flex flex-wrap justify-start items-center ",children:[e.jsx(m,{label:"Từ ngày",className:"w-[175px] border-none mr-2",children:e.jsx(A,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] !h-7 rounded-lg mt-[-2px]",placeholder:"Từ ngày",onChange:xe,defaultValue:x})}),e.jsx(m,{label:"Đến ngày",className:"w-[175px] border-none mr-2",children:e.jsx(A,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] !h-7 rounded-lg mt-[-2px]",onChange:pe,placeholder:"Đến ngày",defaultValue:p})}),e.jsx(m,{label:"Nhóm bán hàng",className:"border-none mr-2 w-[200px]",children:e.jsx(Te,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,treeData:ie,onChange:t=>{de(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:400}})}),e.jsx(m,{label:"Nhân viên",className:"border-none mr-2 w-[200px]",name:"employee",children:e.jsx(c,{filterOption:!1,notFoundContent:null,allowClear:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{ue(t)},options:le,onSelect:t=>{V(t)},onClear:()=>{V("")}})})]})})})}),e.jsx(f,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(fe,{className:"!h-9",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(Se,{title:"Bộ lọc",children:[e.jsx("div",{className:"",children:e.jsxs(P,{layout:"vertical",form:g,onFinish:ye,children:[e.jsx(m,{name:"company",label:"Công ty",className:"w-[468px] border-none",children:e.jsx(c,{allowClear:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:X,placeholder:"Tất cả công ty"})}),e.jsx(m,{name:"customer",label:"Khách hàng",className:"w-[468px] border-none pt-2",children:e.jsx(c,{allowClear:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:ee,placeholder:"Tất cả khách hàng"})}),e.jsx(m,{name:"territory",label:"Khu vực",className:"w-[468px] border-none pt-2",children:e.jsx(c,{allowClear:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:U,placeholder:"Tất cẩ khu vực"})}),e.jsx(m,{name:"warehouse",label:"Kho",className:"w-[468px] border-none pt-2",children:e.jsx(c,{allowClear:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:se,placeholder:"Tất cả kho"})})]})}),e.jsxs(j,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(h,{className:"mr-3",onClick:t=>{t.preventDefault(),g.resetFields()},children:"Đặt lại"}),e.jsx(h,{type:"primary",onClick:()=>{g.submit()},children:"Áp dụng"})]})]})]}),children:e.jsx(h,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-9",icon:e.jsx(Ce,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(h,{className:"border-l-[0.1px] rounded-l-none !h-9",children:e.jsx(we,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{className:"pt-5",children:e.jsx(Ne,{dataSource:l?.data?.map(t=>({...t,key:t.name})),expandable:{expandedRowRender:he,defaultExpandedRowKeys:["0"]},bordered:!0,columns:Ye,scroll:{x:!0},pagination:{defaultPageSize:b,total:y,showSizeChanger:!1,onChange(t){H(t)}},summary:()=>(console.log("sale",l),e.jsxs(o.Summary.Row,{children:[e.jsx(o.Summary.Cell,{index:0,className:"!border-r-0"}),e.jsx(o.Summary.Cell,{index:1}),e.jsx(o.Summary.Cell,{index:2,children:"Tổng"}),e.jsx(o.Summary.Cell,{index:3}),e.jsx(o.Summary.Cell,{index:4}),e.jsx(o.Summary.Cell,{index:5}),e.jsx(o.Summary.Cell,{index:6}),e.jsx(o.Summary.Cell,{index:7}),e.jsx(o.Summary.Cell,{index:8,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_total)})}),e.jsx(o.Summary.Cell,{index:9,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_vat)})}),e.jsx(o.Summary.Cell,{index:10,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_discount_amount)})}),e.jsx(o.Summary.Cell,{index:11,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_grand_total)})})]}))})})]})})})}function Ge(){return e.jsxs(e.Fragment,{children:[e.jsx(be,{children:e.jsx("title",{children:" ReportSalesOrder"})}),e.jsx(Ke,{})]})}export{Ge as default};