import{Y as a,a_ as De,a1 as m,a6 as Ee,L as e,a7 as Re,bD as Ve,R as T,P as h,aa as Ye,a2 as p,a9 as Ke,N as y,Q as f,ab as Oe,bE as i,V as u,aZ as q,ad as ze}from"./index-ZBy2Xvb0.js";import{D as Me}from"./index-NDseWN94.js";import{u as Le,C as We}from"./index-xutGbN8q.js";import{u as g}from"./useDebount-TXP-00L0.js";import{a as Ae,b as Be}from"./index.esm-bForjfuy.js";import{D as P}from"./index-ubeYvJuh.js";import{S as qe}from"./SyncOutlined-kM1MMeD3.js";import{V as Pe}from"./VerticalAlignBottomOutlined-XrO6TjDb.js";const $=u().startOf("month"),H=u().endOf("month");let $e=Date.parse($.$d)/1e3,He=Date.parse(H.$d)/1e3;const Xe=[{title:e.jsx("div",{className:"relative",children:e.jsx("span",{className:"absolute -top-[11px] -left-8",children:"STT"})}),dataIndex:"stt",key:"stt",width:60,render:(l,n,x)=>x+1},{title:"Đơn đặt",dataIndex:"name",key:"name",width:100,render:(l,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/sales-invoice/${n.name}`,target:"_blank",children:n.name})})},{title:"Khách hàng",dataIndex:"customer",key:"customer",width:120,render:(l,n)=>e.jsx("div",{children:n.customer})},{title:"Khu vực",dataIndex:"territory",key:"territory",width:120,render:(l,n)=>e.jsx("div",{children:n.territory})},{title:"Ngày tạo",dataIndex:"posting_date",key:"posting_date",width:120,render:(l,n)=>e.jsx("div",{children:u(n.posting_date*1e3).format("DD/MM/YYYY")})},{title:"Nhân viên",dataIndex:"sales_person",key:"sales_person",width:120,render:(l,n)=>e.jsx("div",{children:n.sales_person})},{title:e.jsx("div",{className:"text-right",children:"Thành tiền (VNĐ)"}),dataIndex:"total",key:"total",width:140,render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.total)})},{title:e.jsx("div",{className:"text-right",children:"Tiền VAT (VNĐ)"}),dataIndex:"tax_amount",key:"tax_amount",width:140,render:(l,n)=>e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(n.tax_amount)})},{title:e.jsx("div",{className:"text-right",children:"Chiết khấu (VNĐ)"}),dataIndex:"discount_amount",key:"discount_amount",width:160,render:(l,n)=>e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(n.discount_amount)})},{title:e.jsx("div",{className:"text-right",children:"Tổng tiền (VNĐ)"}),width:160,dataIndex:"grand_total",key:"grand_total",render:(l,n)=>e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(n.grand_total)})}];function Ze(){const[l,n]=a.useState([]),[x,X]=a.useState(0),j=20,[_]=De(),[b,S]=a.useState(1),[Z,G]=a.useState([]),[N,D]=a.useState(""),[Q,J]=a.useState(""),[v,E]=a.useState(""),[U,ee]=a.useState([]),[te,ae]=a.useState(""),[w,R]=a.useState(""),[se,re]=a.useState([]),[ne,le]=a.useState(""),[d,V]=a.useState($e),[c,Y]=a.useState(He),[F,K]=a.useState(""),[oe,ie]=a.useState([]),[de,ce]=a.useState(""),[k,O]=a.useState(""),[me,ue]=a.useState([]);let z=g(Q,500),M=g(te,500),L=g(ne,500),W=g(de,500);const[he,xe]=a.useState("");let A=g(he);const[pe,ye]=a.useState([]),[B,ge]=a.useState(),C=a.useRef(null),I=Le(),[fe,je]=a.useState(0),[_e,be]=a.useState(I?.h*.52),[Se,Ne]=a.useState(!1);a.useEffect(()=>{be(I.h*.52)},[I]),a.useEffect(()=>{const t=C.current;if(t){const r=new ResizeObserver(s=>{for(let o of s)je(o.contentRect.height)});return r.observe(t),()=>r.disconnect()}},[C]);const ve=t=>{const r=[{title:e.jsx("div",{className:"text-center",children:"STT"}),dataIndex:"stt",key:"stt",render:(s,o,Te)=>e.jsx("div",{className:"text-center",children:Te+1})},{title:"Mã sản phẩm",dataIndex:"item_code",key:"item_code"},{title:"Tên sản phẩm",dataIndex:"item_name",key:"item_name"},{title:"Nhóm sản phẩm",dataIndex:"item_group",key:"item_group"},{title:"Nhãn hàng",dataIndex:"brand",key:"brand"},{title:"Kho",dataIndex:"warehouse",key:"warehouse"},{title:e.jsx("div",{className:"text-right",children:"Đơn giá"}),dataIndex:"rate",key:"rate",render:(s,o)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(o.rate)})},{title:"Đơn vị tính",dataIndex:"uom",key:"uom"},{title:e.jsx("div",{className:"text-right",children:"Số lượng"}),dataIndex:"qty",key:"qty",render:(s,o)=>e.jsx("div",{className:"!text-right",children:o.qty})},{title:e.jsx("div",{className:"text-right",children:"Chiết khấu (%)"}),dataIndex:"discount_percentage",key:"discount_percentage",render:(s,o)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(o.discount_percentage)})},{title:e.jsx("div",{className:"text-right",children:"Tiền chiết khấu (VNĐ)"}),dataIndex:"discount_amount",key:"discount_amount",render:(s,o)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(o.discount_amount)})},{title:e.jsx("div",{className:"text-right",children:"Tiền VAT (VNĐ)"}),dataIndex:"money_vat",key:"money_vat",render:(s,o)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(o.money_vat)})},{title:e.jsx("div",{className:"text-right",children:"Tổng tiền (VNĐ)"}),dataIndex:"amount",key:"amount",render:(s,o)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(o.amount)})}];return e.jsx(i,{bordered:!0,columns:r,dataSource:t.items.map(s=>({...s,key:s.item_code})),pagination:!1})};a.useEffect(()=>{(async()=>{let t=await m.get("/api/method/frappe.desk.search.search_link",{params:{txt:z,doctype:"Company",ignore_user_permissions:0,query:""}}),{message:r}=t;G(r.map(s=>({value:s.value,label:s.value})))})()},[z]),a.useEffect(()=>{(async()=>{let t=await m.get("/api/method/frappe.desk.search.search_link",{params:{txt:L,doctype:"Customer",ignore_user_permissions:0,query:""}}),{message:r}=t;re(r.map(s=>({value:s.value,label:s.value})))})()},[L]),a.useEffect(()=>{(async()=>{let t=await m.get("/api/method/frappe.desk.search.search_link",{params:{txt:W,doctype:"Warehouse",ignore_user_permissions:0,query:""}}),{message:r}=t;ie(r.map(s=>({value:s.value,label:s.value})))})()},[W]),a.useEffect(()=>{(async()=>{let t=await m.get("/api/method/frappe.desk.search.search_link",{params:{txt:M,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:r}=t;ee(r.map(s=>({value:s.value,label:s.value})))})()},[M]),a.useEffect(()=>{(async()=>{let t=await m.get("/api/method/mbw_dms.api.router.get_team_sale");ye(Ee({data:t.result.map(r=>({title:r.name,value:r.name,...r})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),a.useEffect(()=>{(async()=>{let t=await m.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:B,key_search:A}}),{message:r}=t;console.log("aaa",r),ue(r.map(s=>({value:s.sale_name,label:s.sale_name||s.employee_name||s.employee_code})))})()},[B,A]),a.useEffect(()=>{(async()=>{const t=await m.get("/api/method/mbw_dms.api.report.so_report.si_report",{params:{page_size:j,page_number:b,company:N,territory:v,customer:w,from_date:d,to_date:c,warehouse:F,sales_person:k}});let{result:r}=t;n(r),X(r?.totals)})()},[b,N,v,w,d,c,F,k,Se]);const we=t=>{if(t==null)V("");else if(c&&t&&t.isAfter(u.unix(c),"day"))q.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let r=Date.parse(t.$d)/1e3;V(r)}},Fe=t=>{if(t==null)Y("");else if(d&&t&&t.isBefore(u.unix(d),"day"))q.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let r=Date.parse(t.$d)/1e3;Y(r)}},ke=t=>c?t&&t.isAfter(u.unix(c),"day"):!1,Ce=t=>d?t&&t.isBefore(u.unix(d),"day"):!1,Ie=t=>{t.company?D(t.company):D(""),t.customer?R(t.customer):R(""),t.territory?E(t.territory):E(""),t.warehouse?K(t.warehouse):K(""),S(1)};return e.jsx(e.Fragment,{children:e.jsx(We,{header:e.jsx(Re,{title:"Báo cáo tổng hợp bán hàng",buttons:[{icon:e.jsx(qe,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{Ne(t=>!t)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(Pe,{className:"text-xl"}),size:"18px",className:"flex items-center",action:Ve.bind(null,{url:"/api/method/mbw_dms.api.exports.export_excel.export_excel",params:{report_type:"Report Sell",data_filter:{company:N,territory:v,customer:w,from_date:d,to_date:c,warehouse:F,sales_person:k}},file_name:"Report Sell.xlsx"})}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(T,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(h,{className:"ml-4",children:e.jsxs(T,{gutter:[8,8],children:[e.jsx(h,{span:5,children:e.jsx(P,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:we,defaultValue:$,disabledDate:ke})}),e.jsx(h,{span:5,children:e.jsx(P,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:Fe,placeholder:"Đến ngày",defaultValue:H,disabledDate:Ce})}),e.jsx(h,{span:7,children:e.jsx(Ye,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:pe,onChange:t=>{ge(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(h,{span:7,children:e.jsx(p,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{xe(t)},options:me,onSelect:t=>{O(t),S(1)},onClear:()=>{O("")}})})]})}),e.jsx(h,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(Ke,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(Me,{title:"Bộ lọc",children:[e.jsx("div",{className:"",children:e.jsxs(y,{layout:"vertical",form:_,onFinish:Ie,children:[e.jsx(y.Item,{name:"company",label:"Công ty",className:"w-[468px] border-none",children:e.jsx(p,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Z,allowClear:!0,onSearch:t=>{J(t)},placeholder:"Tất cả công ty"})}),e.jsx(y.Item,{name:"customer",label:"Khách hàng",className:"w-[468px] border-none",children:e.jsx(p,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:se,filterOption:!1,allowClear:!0,onSearch:t=>{le(t)},placeholder:"Tất cả khách hàng"})}),e.jsx(y.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:e.jsx(p,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:U,allowClear:!0,onSearch:t=>{ae(t)},placeholder:"Tất cẩ khu vực"})}),e.jsx(y.Item,{name:"warehouse",label:"Kho",className:"w-[468px] border-none",children:e.jsx(p,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:oe,allowClear:!0,onSearch:t=>{ce(t)},placeholder:"Tất cả kho"})})]})}),e.jsxs(T,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(f,{className:"mr-3",onClick:t=>{t.preventDefault(),_.resetFields()},children:"Đặt lại"}),e.jsx(f,{type:"primary",onClick:()=>{_.submit()},children:"Áp dụng"})]})]})]}),children:e.jsx(f,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8",icon:e.jsx(Ae,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(f,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(Be,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:C,className:"pt-5",children:e.jsx(Oe,{dataSource:l?.data?.map(t=>({...t,key:t.name})),expandable:{expandedRowRender:ve,defaultExpandedRowKeys:["0"]},bordered:!0,$border:!0,columns:Xe,scroll:{x:!0,y:fe<380?void 0:_e},pagination:x&&x>j?{pageSize:j,showSizeChanger:!1,total:x,current:b,onChange(t){S(t)}}:!1,summary:()=>e.jsxs(i.Summary.Row,{children:[e.jsx(i.Summary.Cell,{index:0,className:"!border-r-0"}),e.jsx(i.Summary.Cell,{index:1}),e.jsx(i.Summary.Cell,{index:2,children:"Tổng"}),e.jsx(i.Summary.Cell,{index:3}),e.jsx(i.Summary.Cell,{index:5}),e.jsx(i.Summary.Cell,{index:6}),e.jsx(i.Summary.Cell,{index:7}),e.jsx(i.Summary.Cell,{index:8,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_total)})}),e.jsx(i.Summary.Cell,{index:9,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_vat)})}),e.jsx(i.Summary.Cell,{index:10,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_discount_amount)})}),e.jsx(i.Summary.Cell,{index:11,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_grand_total)})})]})})})]})})})}function rt(){return e.jsxs(e.Fragment,{children:[e.jsx(ze,{children:e.jsx("title",{children:" ReportSales"})}),e.jsx(Ze,{})]})}export{rt as default};
