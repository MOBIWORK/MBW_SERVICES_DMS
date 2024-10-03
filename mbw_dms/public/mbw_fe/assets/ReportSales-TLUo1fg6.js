import{Y as s,a_ as Re,a1 as d,a6 as Ve,L as e,a7 as Ye,bD as Ke,R as I,P as m,aa as Oe,a2 as h,a9 as ze,N as x,Q as f,ab as Me,bE as l,V as c,aZ as B,ad as Le}from"./index-a9Kaz5n6.js";import{D as We}from"./index-p-hUk-I3.js";import{u as Ae,C as Be}from"./index-HIRY1dSd.js";import{u as p}from"./useDebount-OA5qO3Xw.js";import{a as qe,b as Pe}from"./index.esm-WEXRQ1jl.js";import{D as q}from"./index-6ryrl00H.js";import{S as $e}from"./SyncOutlined-QycIEBs_.js";import{V as He}from"./VerticalAlignBottomOutlined-7Pj6qBFA.js";const P=c().startOf("month"),$=c().endOf("month");let Xe=Date.parse(P.$d)/1e3,Ze=Date.parse($.$d)/1e3;function Ge(){const H=[{title:e.jsx("div",{className:"relative",children:e.jsx("span",{className:"absolute -top-[11px] -left-8",children:"STT"})}),dataIndex:"stt",key:"stt",width:60,render:(t,a,r)=>e.jsx("span",{children:we(g,y,r)})},{title:"Đơn đặt",dataIndex:"name",key:"name",width:100,render:(t,a)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/sales-invoice/${a.name}`,target:"_blank",children:a.name})})},{title:"Khách hàng",dataIndex:"customer",key:"customer",width:120,render:(t,a)=>e.jsx("div",{children:a.customer})},{title:"Khu vực",dataIndex:"territory",key:"territory",width:120,render:(t,a)=>e.jsx("div",{children:a.territory})},{title:"Ngày tạo",dataIndex:"posting_date",key:"posting_date",width:120,render:(t,a)=>e.jsx("div",{children:c(a.posting_date*1e3).format("DD/MM/YYYY")})},{title:"Nhân viên",dataIndex:"sales_person",key:"sales_person",width:120,render:(t,a)=>e.jsx("div",{children:a.sales_person})},{title:e.jsx("div",{className:"text-right",children:"Thành tiền (VNĐ)"}),dataIndex:"total",key:"total",width:140,render:(t,a)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(a.total)})},{title:e.jsx("div",{className:"text-right",children:"Tiền VAT (VNĐ)"}),dataIndex:"tax_amount",key:"tax_amount",width:140,render:(t,a)=>e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(a.tax_amount)})},{title:e.jsx("div",{className:"text-right",children:"Chiết khấu (VNĐ)"}),dataIndex:"discount_amount",key:"discount_amount",width:160,render:(t,a)=>e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(a.discount_amount)})},{title:e.jsx("div",{className:"text-right",children:"Tổng tiền (VNĐ)"}),width:160,dataIndex:"grand_total",key:"grand_total",render:(t,a)=>e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(a.grand_total)})}],[u,X]=s.useState([]),[j,Z]=s.useState(0),y=20,[_]=Re(),[g,b]=s.useState(1),[G,Q]=s.useState([]),[S,T]=s.useState(""),[J,U]=s.useState(""),[N,D]=s.useState(""),[ee,te]=s.useState([]),[ae,se]=s.useState(""),[v,E]=s.useState(""),[re,ne]=s.useState([]),[le,oe]=s.useState(""),[o,R]=s.useState(Xe),[i,V]=s.useState(Ze),[w,Y]=s.useState(""),[ie,de]=s.useState([]),[ce,me]=s.useState(""),[F,K]=s.useState(""),[ue,he]=s.useState([]);let O=p(J,500),z=p(ae,500),M=p(le,500),L=p(ce,500);const[xe,pe]=s.useState("");let W=p(xe);const[ye,ge]=s.useState([]),[A,fe]=s.useState(),k=s.useRef(null),C=Ae(),[je,_e]=s.useState(0),[be,Se]=s.useState(C?.h*.52),[Ne,ve]=s.useState(!1),we=(t,a,r)=>(t-1)*a+r+1;s.useEffect(()=>{Se(C.h*.52)},[C]),s.useEffect(()=>{const t=k.current;if(t){const a=new ResizeObserver(r=>{for(let n of r)_e(n.contentRect.height)});return a.observe(t),()=>a.disconnect()}},[k]);const Fe=t=>{const a=[{title:e.jsx("div",{className:"text-center",children:"STT"}),dataIndex:"stt",key:"stt",render:(r,n,Ee)=>e.jsx("div",{className:"text-center",children:Ee+1})},{title:"Mã sản phẩm",dataIndex:"item_code",key:"item_code"},{title:"Tên sản phẩm",dataIndex:"item_name",key:"item_name"},{title:"Nhóm sản phẩm",dataIndex:"item_group",key:"item_group"},{title:"Nhãn hàng",dataIndex:"brand",key:"brand"},{title:"Kho",dataIndex:"warehouse",key:"warehouse"},{title:e.jsx("div",{className:"text-right",children:"Đơn giá"}),dataIndex:"rate",key:"rate",render:(r,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.rate)})},{title:"Đơn vị tính",dataIndex:"uom",key:"uom"},{title:e.jsx("div",{className:"text-right",children:"Số lượng"}),dataIndex:"qty",key:"qty",render:(r,n)=>e.jsx("div",{className:"!text-right",children:n.qty})},{title:e.jsx("div",{className:"text-right",children:"Chiết khấu (%)"}),dataIndex:"discount_percentage",key:"discount_percentage",render:(r,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.discount_percentage)})},{title:e.jsx("div",{className:"text-right",children:"Tiền chiết khấu (VNĐ)"}),dataIndex:"discount_amount",key:"discount_amount",render:(r,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.discount_amount)})},{title:e.jsx("div",{className:"text-right",children:"Tiền VAT (VNĐ)"}),dataIndex:"money_vat",key:"money_vat",render:(r,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.money_vat)})},{title:e.jsx("div",{className:"text-right",children:"Tổng tiền (VNĐ)"}),dataIndex:"amount",key:"amount",render:(r,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.amount)})}];return e.jsx(l,{bordered:!0,columns:a,dataSource:t.items.map(r=>({...r,key:r.item_code})),pagination:!1})};s.useEffect(()=>{(async()=>{let t=await d.get("/api/method/frappe.desk.search.search_link",{params:{txt:O,doctype:"Company",ignore_user_permissions:0,query:""}}),{message:a}=t;Q(a.map(r=>({value:r.value,label:r.value})))})()},[O]),s.useEffect(()=>{(async()=>{let t=await d.get("/api/method/frappe.desk.search.search_link",{params:{txt:M,doctype:"Customer",ignore_user_permissions:0,query:""}}),{message:a}=t;ne(a.map(r=>({value:r.value,label:r.value})))})()},[M]),s.useEffect(()=>{(async()=>{let t=await d.get("/api/method/frappe.desk.search.search_link",{params:{txt:L,doctype:"Warehouse",ignore_user_permissions:0,query:""}}),{message:a}=t;de(a.map(r=>({value:r.value,label:r.value})))})()},[L]),s.useEffect(()=>{(async()=>{let t=await d.get("/api/method/frappe.desk.search.search_link",{params:{txt:z,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:a}=t;te(a.map(r=>({value:r.value,label:r.value})))})()},[z]),s.useEffect(()=>{(async()=>{let t=await d.get("/api/method/mbw_dms.api.router.get_team_sale");ge(Ve({data:t.result.map(a=>({title:a.name,value:a.name,...a})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),s.useEffect(()=>{(async()=>{let t=await d.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:A,key_search:W}}),{message:a}=t;console.log("aaa",a),he(a.map(r=>({value:r.sale_name,label:r.sale_name||r.employee_name||r.employee_code})))})()},[A,W]),s.useEffect(()=>{(async()=>{const t=await d.get("/api/method/mbw_dms.api.report.so_report.si_report",{params:{page_size:y,page_number:g,company:S,territory:N,customer:v,from_date:o,to_date:i,warehouse:w,sales_person:F}});let{result:a}=t;X(a),Z(a?.totals)})()},[g,S,N,v,o,i,w,F,Ne]);const ke=t=>{if(t==null)R("");else if(i&&t&&t.isAfter(c.unix(i),"day"))B.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let a=Date.parse(t.$d)/1e3;R(a)}},Ce=t=>{if(t==null)V("");else if(o&&t&&t.isBefore(c.unix(o),"day"))B.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let a=Date.parse(t.$d)/1e3;V(a)}},Ie=t=>i?t&&t.isAfter(c.unix(i),"day"):!1,Te=t=>o?t&&t.isBefore(c.unix(o),"day"):!1,De=t=>{t.company?T(t.company):T(""),t.customer?E(t.customer):E(""),t.territory?D(t.territory):D(""),t.warehouse?Y(t.warehouse):Y(""),b(1)};return e.jsx(e.Fragment,{children:e.jsx(Be,{header:e.jsx(Ye,{title:"Báo cáo tổng hợp bán hàng",buttons:[{icon:e.jsx($e,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{ve(t=>!t)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(He,{className:"text-xl"}),size:"18px",className:"flex items-center",action:Ke.bind(null,{url:"/api/method/mbw_dms.api.exports.export_excel.export_excel",params:{report_type:"Report Sell",data_filter:{company:S,territory:N,customer:v,from_date:o,to_date:i,warehouse:w,sales_person:F}},file_name:"Report Sell.xlsx"})}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(I,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(m,{className:"ml-4",children:e.jsxs(I,{gutter:[8,8],children:[e.jsx(m,{span:5,children:e.jsx(q,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:ke,defaultValue:P,disabledDate:Ie})}),e.jsx(m,{span:5,children:e.jsx(q,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:Ce,placeholder:"Đến ngày",defaultValue:$,disabledDate:Te})}),e.jsx(m,{span:7,children:e.jsx(Oe,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:ye,onChange:t=>{fe(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(m,{span:7,children:e.jsx(h,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{pe(t)},options:ue,onSelect:t=>{K(t),b(1)},onClear:()=>{K("")}})})]})}),e.jsx(m,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(ze,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(We,{title:"Bộ lọc",children:[e.jsx("div",{className:"",children:e.jsxs(x,{layout:"vertical",form:_,onFinish:De,children:[e.jsx(x.Item,{name:"company",label:"Công ty",className:"w-[468px] border-none",children:e.jsx(h,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:G,allowClear:!0,onSearch:t=>{U(t)},placeholder:"Tất cả công ty"})}),e.jsx(x.Item,{name:"customer",label:"Khách hàng",className:"w-[468px] border-none",children:e.jsx(h,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:re,filterOption:!1,allowClear:!0,onSearch:t=>{oe(t)},placeholder:"Tất cả khách hàng"})}),e.jsx(x.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:e.jsx(h,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:ee,allowClear:!0,onSearch:t=>{se(t)},placeholder:"Tất cẩ khu vực"})}),e.jsx(x.Item,{name:"warehouse",label:"Kho",className:"w-[468px] border-none",children:e.jsx(h,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:ie,allowClear:!0,onSearch:t=>{me(t)},placeholder:"Tất cả kho"})})]})}),e.jsxs(I,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(f,{className:"mr-3",onClick:t=>{t.preventDefault(),_.resetFields()},children:"Đặt lại"}),e.jsx(f,{type:"primary",onClick:()=>{_.submit()},children:"Áp dụng"})]})]})]}),children:e.jsx(f,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8",icon:e.jsx(qe,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(f,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(Pe,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:k,className:"pt-5",children:e.jsx(Me,{dataSource:u?.data?.map(t=>({...t,key:t.name})),expandable:{expandedRowRender:Fe,defaultExpandedRowKeys:["0"]},bordered:!0,$border:!0,columns:H,scroll:{x:!0,y:je<380?void 0:be},pagination:j&&j>y?{pageSize:y,showSizeChanger:!1,total:j,current:g,onChange(t){b(t)}}:!1,summary:()=>e.jsxs(l.Summary.Row,{children:[e.jsx(l.Summary.Cell,{index:0,className:"!border-r-0"}),e.jsx(l.Summary.Cell,{index:1}),e.jsx(l.Summary.Cell,{index:2,children:"Tổng"}),e.jsx(l.Summary.Cell,{index:3}),e.jsx(l.Summary.Cell,{index:5}),e.jsx(l.Summary.Cell,{index:6}),e.jsx(l.Summary.Cell,{index:7}),e.jsx(l.Summary.Cell,{index:8,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(u?.sum?.sum_total)})}),e.jsx(l.Summary.Cell,{index:9,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(u?.sum?.sum_vat)})}),e.jsx(l.Summary.Cell,{index:10,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(u?.sum?.sum_discount_amount)})}),e.jsx(l.Summary.Cell,{index:11,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(u?.sum?.sum_grand_total)})})]})})})]})})})}function nt(){return e.jsxs(e.Fragment,{children:[e.jsx(Le,{children:e.jsx("title",{children:" ReportSales"})}),e.jsx(Ge,{})]})}export{nt as default};
