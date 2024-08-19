import{Y as a,aX as Ie,a1 as c,L as e,a6 as Te,R as F,P as h,a8 as De,a2 as p,a7 as Ee,N as y,Q as f,a9 as Re,bz as o,V as d,aW as A,ab as Ye}from"./index-DWSVeQA5.js";import{D as Oe}from"./index-P7EFBpAB.js";import{u as Ke,C as Ve}from"./index-7T7p6lgP.js";import{u as g}from"./useDebount-H5dfgupc.js";import{t as ze,a as Me}from"./index-Bk40vfLy.js";import{a as We,b as Le}from"./index.esm-HCEjJh0S.js";import{D as P}from"./index-C4Boijk6.js";import{V as Be}from"./VerticalAlignBottomOutlined-qzNwLOaS.js";const $=d().startOf("month"),H=d().endOf("month");let qe=Date.parse($.$d)/1e3,Ae=Date.parse(H.$d)/1e3;const Pe=[{title:e.jsx("div",{className:"relative",children:e.jsx("span",{className:"absolute -top-[11px] -left-8",children:"STT"})}),dataIndex:"stt",key:"stt",render:(l,n,x)=>x+1},{title:"Đơn đặt",dataIndex:"name",key:"name",render:(l,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/sales-order/${n.name}`,target:"_blank",children:n.name})})},{title:"Khách hàng",dataIndex:"customer",key:"customer",render:(l,n)=>e.jsx("div",{children:n.customer})},{title:"Khu vực",dataIndex:"territory",key:"territory",render:(l,n)=>e.jsx("div",{children:n.territory})},{title:"Kho",dataIndex:"set_warehouse",key:"set_warehouse"},{title:"Ngày tạo",dataIndex:"transaction_date",key:"transaction_date",render:l=>l?e.jsx("p",{children:d(l*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:"Nhân viên",dataIndex:"sales_person",key:"sales_person",render:(l,n)=>e.jsx("div",{className:"!w-[150px]",children:n.sales_person})},{title:e.jsx("div",{className:"text-right",children:"Thành tiền (VNĐ)"}),dataIndex:"total",key:"total",width:160,render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.total)})},{title:e.jsx("div",{className:"text-right",children:"Tiền VAT (VNĐ)"}),dataIndex:"tax_amount",key:"tax_amount",width:160,render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.tax_amount)})},{title:e.jsx("div",{className:"text-right",children:"Chiết khấu (VNĐ)"}),dataIndex:"discount_amount",key:"discount_amount",width:160,render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.discount_amount)})},{title:e.jsx("div",{className:"text-right",children:"Tổng tiền (VNĐ)"}),dataIndex:"grand_total",key:"grand_total",width:160,render:(l,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.grand_total)})}];function $e(){const[l,n]=a.useState([]),[x,X]=a.useState(0),j=20,[_,b]=a.useState(1),[G,Q]=a.useState([]),[w,k]=a.useState(""),[U,Z]=a.useState(""),[C,I]=a.useState(""),[J,ee]=a.useState([]),[te,ae]=a.useState(""),[T,D]=a.useState(""),[se,re]=a.useState([]),[ne,le]=a.useState(""),[m,E]=a.useState(qe),[u,R]=a.useState(Ae),[Y,O]=a.useState(""),[S]=Ie(),[oe,ie]=a.useState([]),[ce,de]=a.useState(""),[K,V]=a.useState(""),[me,ue]=a.useState([]),[he,xe]=a.useState([]),[z,pe]=a.useState();let M=g(U,500),W=g(te,500),L=g(ne,500),B=g(ce,500);const[ye,ge]=a.useState("");let q=g(ye);const N=a.useRef(null),v=Ke(),[fe,je]=a.useState(0),[_e,be]=a.useState(v?.h*.52);a.useEffect(()=>{be(v.h*.52)},[v]),a.useEffect(()=>{const t=N.current;if(t){const r=new ResizeObserver(s=>{for(let i of s)je(i.contentRect.height)});return r.observe(t),()=>r.disconnect()}},[N]);const Se=t=>{const r=[{title:"STT",dataIndex:"stt",key:"stt",render:(s,i,Ce)=>e.jsx("div",{className:"text-center",children:Ce+1})},{title:"Mã sản phẩm",dataIndex:"item_code",key:"item_code"},{title:"Tên sản phẩm",dataIndex:"item_name",key:"item_name"},{title:"Nhóm sản phẩm",dataIndex:"item_group",key:"item_group"},{title:"Nhãn hàng",dataIndex:"brand",key:"brand"},{title:e.jsx("div",{className:"text-right",children:"Đơn giá"}),dataIndex:"rate",key:"rate",render:(s,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.rate)})},{title:e.jsx("div",{className:"text-right",children:"Số lượng"}),dataIndex:"qty",key:"qty",render:(s,i)=>e.jsx("div",{className:"!text-right",children:i.qty})},{title:e.jsx("div",{className:"text-right",children:"Chiết khấu (%)"}),dataIndex:"discount_percentage",key:"discount_percentage",render:(s,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.discount_percentage)})},{title:e.jsx("div",{className:"text-right",children:"Tiền chiết khấu"}),dataIndex:"discount_amount",key:"discount_amount",render:(s,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.discount_amount)})},{title:e.jsx("div",{className:"text-right",children:"Tổng tiền (VNĐ)"}),dataIndex:"amount",key:"amount",render:(s,i)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(i.amount)})}];return e.jsx(o,{bordered:!0,columns:r,dataSource:t.items.map(s=>({...s,key:s.item_code})),pagination:!1})};a.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:M,doctype:"Company",ignore_user_permissions:0,query:""}}),{message:r}=t;Q(r.map(s=>({value:s.value,label:s.value})))})()},[M]),a.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:L,doctype:"Customer",ignore_user_permissions:0,query:""}}),{message:r}=t;re(r.map(s=>({value:s.value,label:s.value})))})()},[L]),a.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:B,doctype:"Warehouse",ignore_user_permissions:0,query:""}}),{message:r}=t;ie(r.map(s=>({value:s.value,label:s.value})))})()},[B]),a.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:W,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:r}=t;ee(r.map(s=>({value:s.value,label:s.value})))})()},[W]),a.useEffect(()=>{(async()=>{let t=await c.get("/api/method/mbw_dms.api.router.get_team_sale");xe(ze({data:t.result.map(r=>({title:r.name,value:r.name,...r})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),a.useEffect(()=>{(async()=>{let t=await c.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:z,key_search:q}}),{message:r}=t;ue(r.map(s=>({value:s.sale_name,label:s.sale_name||s.employee_name||s.employee_code})))})()},[z,q]),a.useEffect(()=>{(async()=>{const t=await c.get("/api/method/mbw_dms.api.report.so_report.so_report",{params:{page_size:j,page_number:_,company:w,territory:C,customer:T,from_date:m,to_date:u,warehouse:Y,sales_person:K}});let{result:r}=t;n(r),X(r?.totals)})()},[_,w,C,T,m,u,Y,K]);const Ne=t=>{if(t==null)E("");else if(u&&t&&t.isAfter(d.unix(u),"day"))A.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let r=Date.parse(t.$d)/1e3;E(r)}},ve=t=>{if(t==null)R("");else if(m&&t&&t.isBefore(d.unix(m),"day"))A.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let r=Date.parse(t.$d)/1e3;R(r)}},Fe=t=>u?t&&t.isAfter(d.unix(u),"day"):!1,we=t=>m?t&&t.isBefore(d.unix(m),"day"):!1,ke=t=>{t.company?k(t.company):k(""),t.customer?D(t.customer):D(""),t.territory?I(t.territory):I(""),t.warehouse?O(t.warehouse):O(""),b(1)};return e.jsx(e.Fragment,{children:e.jsx(Ve,{header:e.jsx(Te,{title:"Báo cáo tổng hợp đặt hàng",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(Be,{className:"text-xl"}),size:"20px",className:"flex items-center",action:()=>{Me("/app/data-export/Data%20Export")}}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(F,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(h,{className:"ml-4",children:e.jsxs(F,{gutter:[8,8],children:[e.jsx(h,{span:5,children:e.jsx(P,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:Ne,defaultValue:$,disabledDate:Fe})}),e.jsx(h,{span:5,children:e.jsx(P,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:ve,placeholder:"Đến ngày",defaultValue:H,disabledDate:we})}),e.jsx(h,{span:7,children:e.jsx(De,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:he,onChange:t=>{pe(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(h,{span:7,children:e.jsx(p,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{ge(t)},options:me,onSelect:t=>{V(t),b(1)},onClear:()=>{V("")}})})]})}),e.jsx(h,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(Ee,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(Oe,{title:"Bộ lọc",children:[e.jsx("div",{className:"",children:e.jsxs(y,{layout:"vertical",form:S,onFinish:ke,children:[e.jsx(y.Item,{name:"company",label:"Công ty",className:"w-[468px] border-none",children:e.jsx(p,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:G,allowClear:!0,onSearch:t=>{Z(t)},placeholder:"Tất cả công ty"})}),e.jsx(y.Item,{name:"customer",label:"Khách hàng",className:"w-[468px] border-none",children:e.jsx(p,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:se,filterOption:!1,allowClear:!0,onSearch:t=>{le(t)},placeholder:"Tất cả khách hàng"})}),e.jsx(y.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:e.jsx(p,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:J,allowClear:!0,onSearch:t=>{ae(t)},placeholder:"Tất cẩ khu vực"})}),e.jsx(y.Item,{name:"warehouse",label:"Kho",className:"w-[468px] border-none",children:e.jsx(p,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:oe,allowClear:!0,onSearch:t=>{de(t)},placeholder:"Tất cả kho"})})]})}),e.jsxs(F,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(f,{className:"mr-3",onClick:t=>{t.preventDefault(),S.resetFields()},children:"Đặt lại"}),e.jsx(f,{type:"primary",onClick:()=>{S.submit()},children:"Áp dụng"})]})]})]}),children:e.jsx(f,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8",icon:e.jsx(We,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(f,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(Le,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:N,className:"pt-5",children:e.jsx(Re,{dataSource:l?.data?.map(t=>({...t,key:t.name})),expandable:{expandedRowRender:Se,defaultExpandedRowKeys:["0"]},bordered:!0,$border:!0,columns:Pe,scroll:{x:!0,y:fe<380?void 0:_e},pagination:x&&x>j?{pageSize:j,showSizeChanger:!1,total:x,current:_,onChange(t){b(t)}}:!1,summary:()=>e.jsxs(o.Summary.Row,{children:[e.jsx(o.Summary.Cell,{index:0,className:"!border-r-0"}),e.jsx(o.Summary.Cell,{index:1}),e.jsx(o.Summary.Cell,{index:2,children:"Tổng"}),e.jsx(o.Summary.Cell,{index:3}),e.jsx(o.Summary.Cell,{index:4}),e.jsx(o.Summary.Cell,{index:5}),e.jsx(o.Summary.Cell,{index:6}),e.jsx(o.Summary.Cell,{index:7}),e.jsx(o.Summary.Cell,{index:8,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_total)})}),e.jsx(o.Summary.Cell,{index:9,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_vat)})}),e.jsx(o.Summary.Cell,{index:10,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_discount_amount)})}),e.jsx(o.Summary.Cell,{index:11,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(l?.sum?.sum_grand_total)})})]})})})]})})})}function tt(){return e.jsxs(e.Fragment,{children:[e.jsx(Ye,{children:e.jsx("title",{children:" ReportSalesOrder"})}),e.jsx($e,{})]})}export{tt as default};