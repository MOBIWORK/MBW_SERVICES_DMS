import{W as a,a0 as i,L as e,O as o,a2 as c,a3 as me,by as m,a6 as ie,a7 as ce}from"./index-2e-kCGqP.js";import{H as de}from"./header-page-csWxGeSf.js";import{u as d}from"./useDebount-6JJfoQYm.js";import{D as Y}from"./index-rlzSjqo0.js";import{V as ue}from"./VerticalAlignBottomOutlined-XUlCYQAh.js";const pe=[{title:"STT",dataIndex:"stt",key:"stt",render:(l,s,p)=>p+1},{title:"Đơn đặt",dataIndex:"name",key:"name",render:(l,s)=>e.jsx("div",{className:"!w-[175px]",children:e.jsx("a",{className:"text-[#212B36]",href:`app/sales-order/${s.name}`,target:"_blank",children:s.name})})},{title:"Khách hàng",dataIndex:"customer",key:"customer",render:(l,s)=>e.jsx("div",{className:"!w-[175px]",children:s.customer})},{title:"Khu vực",dataIndex:"territory",key:"territory",render:(l,s)=>e.jsx("div",{className:"!w-[175px]",children:s.territory})},{title:"Kho",dataIndex:"set_warehouse",key:"set_warehouse",render:(l,s)=>e.jsx("div",{className:"!w-[175px]",children:s.set_warehouse})},{title:"Ngày tạo",dataIndex:"transaction_date",key:"transaction_date",render:(l,s)=>e.jsx("div",{className:"!w-[175px]",children:ie(s.transaction_date*1e3).format("DD/MM/YYYY")})},{title:"Nhân viên",dataIndex:"employee",key:"employee",render:(l,s)=>e.jsx("div",{className:"!w-[150px]",children:s.employee})},{title:"Thành tiền",dataIndex:"total",key:"total",render:(l,s)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(s.total)]})},{title:"Tiền VAT",dataIndex:"tax_amount",key:"tax_amount",render:(l,s)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(s.tax_amount)]})},{title:"Chiết khấu",dataIndex:"discount_amount",key:"discount_amount",render:(l,s)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(s.discount_amount)]})},{title:"Tổng tiền",dataIndex:"grand_total",key:"grand_total",render:(l,s)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(s.grand_total)]})}];function xe(){const[l,s]=a.useState([]),[p,O]=a.useState(0),x=20,[h,W]=a.useState(1),[q,M]=a.useState([]),[y,j]=a.useState(""),[R,L]=a.useState(""),[_,g]=a.useState(""),[P,A]=a.useState([]),[z,B]=a.useState(""),[N,S]=a.useState(""),[H,$]=a.useState([]),[G,X]=a.useState(""),[b,f]=a.useState(),[F,k]=a.useState(),[w,C]=a.useState(""),[Z,J]=a.useState([]),[Q,U]=a.useState(""),[v,I]=a.useState(""),[ee,te]=a.useState([]),[ae,se]=a.useState("");let D=d(R,500),T=d(z,500),E=d(G,500),V=d(Q,500),K=d(ae,500);const re=t=>{const n=[{title:"STT",dataIndex:"stt",key:"stt",render:(r,u,oe)=>oe+1},{title:"Mã sản phẩm",dataIndex:"item_code",key:"item_code"},{title:"Tên sản phẩm",dataIndex:"item_name",key:"item_name"},{title:"Nhóm sản phẩm",dataIndex:"item_group",key:"item_group"},{title:"Nhãn hàng",dataIndex:"brand",key:"brand"},{title:"Đơn giá",dataIndex:"rate",key:"rate"},{title:"Số lượng",dataIndex:"qty",key:"qty"},{title:"Chiết khấu (%)",dataIndex:"discount_percentage",key:"discount_percentage"},{title:"Tiền chiết khấu",dataIndex:"discount_amount",key:"discount_amount",render:(r,u)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(u.discount_amount)]})},{title:"Tổng tiền",dataIndex:"amount",key:"amount",render:(r,u)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(u.amount)]})}];return e.jsx(m,{columns:n,dataSource:t.items.map(r=>({...r,key:r.item_code})),pagination:!1})};a.useEffect(()=>{(async()=>{let t=await i.get("/api/method/frappe.desk.search.search_link",{params:{txt:D,doctype:"Company",ignore_user_permissions:0,query:""}}),{message:n}=t;M(n.map(r=>({value:r.value,label:r.value})))})()},[D]),a.useEffect(()=>{(async()=>{let t=await i.get("/api/method/frappe.desk.search.search_link",{params:{txt:E,doctype:"Customer",ignore_user_permissions:0,query:""}}),{message:n}=t;$(n.map(r=>({value:r.value,label:r.value})))})()},[E]),a.useEffect(()=>{(async()=>{let t=await i.get("/api/method/frappe.desk.search.search_link",{params:{txt:V,doctype:"Warehouse",ignore_user_permissions:0,query:""}}),{message:n}=t;J(n.map(r=>({value:r.value,label:r.value})))})()},[V]),a.useEffect(()=>{(async()=>{let t=await i.get("/api/method/frappe.desk.search.search_link",{params:{txt:T,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:n}=t;A(n.map(r=>({value:r.value,label:r.value})))})()},[T]),a.useEffect(()=>{(async()=>{let t=await i.get("/api/method/frappe.desk.search.search_link",{params:{txt:K,doctype:"Employee",ignore_user_permissions:0,query:"mbw_dms.api.report.so_report.employee_query"}}),{message:n}=t;te(n.map(r=>({value:r.description.split(",")[1].trim(),label:r.description.split(",")[0].trim()})))})()},[K]),a.useEffect(()=>{(async()=>{const t=await i.get("/api/method/mbw_dms.api.report.so_report.so_report",{params:{page_size:x,page_number:h,company:y,territory:_,customer:N,from_date:b,to_date:F,warehouse:w,employee:v}});let{result:n}=t;s(n),O(n?.totals)})()},[h,y,_,N,b,F,w,v]);const ne=t=>{if(t==null)f("");else{let n=Date.parse(t.$d)/1e3;f(n)}},le=t=>{if(t==null)k("");else{let n=Date.parse(t.$d)/1e3;k(n)}};return e.jsxs(e.Fragment,{children:[e.jsx(de,{title:"Báo cáo tổng hợp đặt hàng",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(ue,{className:"text-xl"}),size:"20px",className:"flex items-center"}]}),e.jsxs("div",{className:"bg-white rounded-md py-7 px-4 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs("div",{className:"flex justify-start items-center",children:[e.jsx(o,{className:"w-[200px] border-none mr-2",label:"Công ty"}),e.jsx(o,{className:"w-[200px] border-none mr-2",label:"Khách hàng"}),e.jsx(o,{className:"w-[200px] border-none mr-2",label:"Khu vực"}),e.jsx(o,{className:"w-[200px] border-none mr-2",label:"Từ ngày"}),e.jsx(o,{className:"w-[200px] border-none mr-2",label:"Đến ngày"})]}),e.jsxs("div",{className:"flex justify-start items-center",children:[e.jsx(o,{className:"w-[200px] border-none mr-2",children:e.jsx(c,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:q,onSelect:t=>{j(t)},onSearch:t=>{L(t)},onClear:()=>j(""),filterOption:!1,allowClear:!0,showSearch:!0})}),e.jsx(o,{className:"w-[200px] border-none mr-2",children:e.jsx(c,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:H,onSelect:t=>{S(t)},onSearch:t=>{X(t)},onClear:()=>S(""),filterOption:!1,allowClear:!0,showSearch:!0})}),e.jsx(o,{className:"w-[200px] border-none mr-2",children:e.jsx(c,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:P,onSelect:t=>{g(t)},onSearch:t=>{B(t)},onClear:()=>g(""),filterOption:!1,allowClear:!0,showSearch:!0})}),e.jsx(o,{className:"w-[200px] border-none mr-2",children:e.jsx(Y,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:ne})}),e.jsx(o,{className:"w-[200px] border-none mr-2",children:e.jsx(Y,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:le})})]}),e.jsxs("div",{className:"flex justify-start items-center pt-2",children:[e.jsx(o,{className:"w-[200px] border-none mr-2",label:"Kho"}),e.jsx(o,{className:"w-[200px] border-none mr-2",label:"Nhân viên"})]}),e.jsxs("div",{className:"flex justify-start items-center h-8 mt-2 pb-5",children:[e.jsx(o,{className:"w-[200px] border-none mr-2",children:e.jsx(c,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Z,onSelect:t=>{C(t)},onSearch:t=>{U(t)},onClear:()=>C(""),filterOption:!1,allowClear:!0,showSearch:!0})}),e.jsx(o,{className:"w-[200px] border-none mr-2",children:e.jsx(c,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:ee,onSelect:t=>{I(t)},onSearch:t=>{se(t)},onClear:()=>I(""),filterOption:!1,allowClear:!0,showSearch:!0})})]}),e.jsx("div",{className:"pt-5",children:e.jsx(me,{dataSource:l?.data?.map(t=>({...t,key:t.name})),expandable:{expandedRowRender:re,defaultExpandedRowKeys:["0"]},bordered:!0,columns:pe,scroll:{x:!0},pagination:{defaultPageSize:x,total:p,onChange(t){W(t)}},summary:()=>(console.log("sale",l),e.jsxs(m.Summary.Row,{children:[e.jsx(m.Summary.Cell,{index:0}),e.jsx(m.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(m.Summary.Cell,{index:2}),e.jsx(m.Summary.Cell,{index:3}),e.jsx(m.Summary.Cell,{index:4}),e.jsx(m.Summary.Cell,{index:5}),e.jsx(m.Summary.Cell,{index:6}),e.jsx(m.Summary.Cell,{index:7}),e.jsxs(m.Summary.Cell,{index:8,children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(l?.sum?.sum_total)]}),e.jsxs(m.Summary.Cell,{index:9,children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(l?.sum?.sum_vat)]}),e.jsxs(m.Summary.Cell,{index:10,children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(l?.sum?.sum_discount_amount)]}),e.jsxs(m.Summary.Cell,{index:11,children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(l?.sum?.sum_grand_total)]})]}))})})]})]})}function Ne(){return e.jsxs(e.Fragment,{children:[e.jsx(ce,{children:e.jsx("title",{children:" ReportSalesOrder"})}),e.jsx(xe,{})]})}export{Ne as default};