import{Y as a,a3 as m,L as e,R as me,O as i,a5 as c,a6 as ce,bv as l,V as u,a8 as de}from"./index-pVymrpwA.js";import{H as ue}from"./header-page-58W9c4sj.js";import{u as d}from"./useDebount-AN0aWWHJ.js";import{a as pe}from"./index-DkZZcBjD.js";import{D as K}from"./index-67doyZ_O.js";import{V as he}from"./VerticalAlignBottomOutlined-reyJfqy6.js";const xe=u().month()+1;xe.toString();const ye=u().format("YYYY"),ge=u().startOf("month"),_e=u().endOf("month"),fe=[{title:e.jsx("div",{className:"relative",children:e.jsx("span",{className:"absolute -top-[11px] -left-8",children:"STT"})}),dataIndex:"stt",key:"stt",render:(o,s,h)=>h+1},{title:"Đơn đặt",dataIndex:"name",key:"name",render:(o,s)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`app/sales-invoice/${s.name}`,target:"_blank",children:s.name})})},{title:"Khách hàng",dataIndex:"customer",key:"customer",render:(o,s)=>e.jsx("div",{children:s.customer})},{title:"Khu vực",dataIndex:"territory",key:"territory",render:(o,s)=>e.jsx("div",{children:s.territory})},{title:"Kho",dataIndex:"set_warehouse",key:"set_warehouse",render:(o,s)=>e.jsx("div",{children:s.set_warehouse})},{title:"Ngày tạo",dataIndex:"posting_date",key:"posting_date",render:(o,s)=>e.jsx("div",{children:u(s.posting_date*1e3).format("DD/MM/YYYY")})},{title:"Nhân viên",dataIndex:"employee",key:"employee",render:(o,s)=>e.jsx("div",{children:s.employee})},{title:"Thành tiền (VNĐ)",dataIndex:"total",key:"total",render:(o,s)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(s.total)})},{title:"Tiền VAT (VNĐ)",dataIndex:"tax_amount",key:"tax_amount",render:(o,s)=>e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(s.tax_amount)})},{title:"Chiết khấu (VNĐ)",dataIndex:"discount_amount",key:"discount_amount",render:(o,s)=>e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(s.discount_amount)})},{title:"Tổng tiền (VNĐ)",dataIndex:"grand_total",key:"grand_total",render:(o,s)=>e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(s.grand_total)})}];function Se(){const[o,s]=a.useState([]),[h,V]=a.useState(0),y=20,[g,M]=a.useState(1),[R,q]=a.useState([]),[_,f]=a.useState(""),[W,L]=a.useState(""),[S,j]=a.useState(""),[P,z]=a.useState([]),[A,B]=a.useState(""),[b,F]=a.useState(""),[H,$]=a.useState([]),[G,U]=a.useState(""),[N,k]=a.useState(),[C,v]=a.useState(),[I,w]=a.useState(""),[X,Z]=a.useState([]),[J,Q]=a.useState(""),[T,E]=a.useState(""),[ee,te]=a.useState([]),[ae,se]=a.useState("");let D=d(W,500),x=d(A,500),Y=d(G,500),O=d(J,500),re=d(ae,500);const ne=t=>{const n=[{title:"STT",dataIndex:"stt",key:"stt",render:(r,p,ie)=>ie+1},{title:"Mã sản phẩm",dataIndex:"item_code",key:"item_code"},{title:"Tên sản phẩm",dataIndex:"item_name",key:"item_name"},{title:"Nhóm sản phẩm",dataIndex:"item_group",key:"item_group"},{title:"Nhãn hàng",dataIndex:"brand",key:"brand"},{title:"Đơn giá",dataIndex:"rate",key:"rate"},{title:"Số lượng",dataIndex:"qty",key:"qty"},{title:"Chiết khấu (%)",dataIndex:"discount_percentage",key:"discount_percentage"},{title:"Tiền chiết khấu",dataIndex:"discount_amount",key:"discount_amount",render:(r,p)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(p.discount_amount)]})},{title:"Tổng tiền",dataIndex:"amount",key:"amount",render:(r,p)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(p.amount)]})}];return e.jsx(l,{columns:n,dataSource:t.items.map(r=>({...r,key:r.item_code})),pagination:!1})};a.useEffect(()=>{(async()=>{let t=await m.get("/api/method/frappe.desk.search.search_link",{params:{txt:D,doctype:"Company",ignore_user_permissions:0,query:""}}),{message:n}=t;q(n.map(r=>({value:r.value,label:r.value})))})()},[D]),a.useEffect(()=>{(async()=>{let t=await m.get("/api/method/frappe.desk.search.search_link",{params:{txt:Y,doctype:"Customer",ignore_user_permissions:0,query:""}}),{message:n}=t;$(n.map(r=>({value:r.value,label:r.value})))})()},[Y]),a.useEffect(()=>{(async()=>{let t=await m.get("/api/method/frappe.desk.search.search_link",{params:{txt:O,doctype:"Warehouse",ignore_user_permissions:0,query:""}}),{message:n}=t;Z(n.map(r=>({value:r.value,label:r.value})))})()},[O]),a.useEffect(()=>{(async()=>{let t=await m.get("/api/method/frappe.desk.search.search_link",{params:{txt:x,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:n}=t;z(n.map(r=>({value:r.value,label:r.value})))})()},[x]),a.useEffect(()=>{(async()=>{let t=await m.get("/api/method/frappe.desk.search.search_link",{params:{txt:x,doctype:"Employee",ignore_user_permissions:0,query:"mbw_dms.api.report.so_report.employee_query"}}),{message:n}=t;te(n.map(r=>({value:r.description.split(",")[1].trim(),label:r.description.split(",")[0].trim()})))})()},[re]),a.useEffect(()=>{(async()=>{const t=await m.get("/api/method/mbw_dms.api.report.so_report.si_report",{params:{page_size:y,page_number:g,company:_,territory:S,customer:b,from_date:N,to_date:C,warehouse:I,employee:T}});let{result:n}=t;s(n),V(n?.totals)})()},[g,_,S,b,N,C,I,T]);const oe=t=>{if(t==null)k("");else{let n=Date.parse(t.$d)/1e3;k(n)}},le=t=>{if(t==null)v("");else{let n=Date.parse(t.$d)/1e3;v(n)}};return console.log("YYYY",ye),console.log("Fist",ge),console.log("End",_e),e.jsxs(e.Fragment,{children:[e.jsx(ue,{title:"Báo cáo tổng hợp bán hàng",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(he,{className:"text-xl"}),size:"20px",className:"flex items-center",action:()=>{pe("/app/data-export/Data%20Export")}}]}),e.jsxs("div",{className:"bg-white rounded-md py-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsx("div",{className:"flex flex-wrap justify-start items-center px-4",children:e.jsxs(me,{className:"",gutter:[8,8],children:[e.jsx(i,{label:"Công ty",className:"w-[175px] border-none mr-2",children:e.jsx(c,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:R,onSelect:t=>{f(t)},onSearch:t=>{L(t)},onClear:()=>f(""),filterOption:!1,allowClear:!0,placeholder:"Tất cả công ty"})}),e.jsx(i,{label:"Khác hàng",className:"w-[175px] border-none mr-2",children:e.jsx(c,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:H,onSelect:t=>{F(t)},onSearch:t=>{U(t)},onClear:()=>F(""),filterOption:!1,allowClear:!0,placeholder:"Tất cả khách hàng"})}),e.jsx(i,{label:"Khu vực",className:"w-[175px] border-none mr-2",children:e.jsx(c,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:P,onSelect:t=>{j(t)},onSearch:t=>{B(t)},onClear:()=>j(""),filterOption:!1,allowClear:!0,placeholder:"Tất cẩ khu vực"})}),e.jsx(i,{label:"Từ ngày",className:"w-[175px] border-none mr-2",children:e.jsx(K,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",placeholder:"Từ ngày",onChange:oe})}),e.jsx(i,{label:"Đến ngày",className:"w-[175px] border-none mr-2",children:e.jsx(K,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:le,placeholder:"Đến ngày"})}),e.jsx(i,{label:"Kho",className:"w-[175px] border-none mr-2",children:e.jsx(c,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:X,onSelect:t=>{w(t)},onSearch:t=>{Q(t)},onClear:()=>w(""),filterOption:!1,allowClear:!0,placeholder:"Tất cả kho"})}),e.jsx(i,{label:"Nhân viên",className:"w-[175px] border-none mr-2",children:e.jsx(c,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:ee,onSelect:t=>{E(t)},onSearch:t=>{se(t)},onClear:()=>E(""),filterOption:!1,allowClear:!0,placeholder:"Tất cả nhân viên"})})]})}),e.jsx("div",{className:"pt-5",children:e.jsx(ce,{dataSource:o?.data?.map(t=>({...t,key:t.name})),expandable:{expandedRowRender:ne,defaultExpandedRowKeys:["0"]},bordered:!0,columns:fe,scroll:{x:!0},pagination:{defaultPageSize:y,total:h,showSizeChanger:!1,onChange(t){M(t)}},summary:()=>e.jsxs(l.Summary.Row,{children:[e.jsx(l.Summary.Cell,{index:0}),e.jsx(l.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(l.Summary.Cell,{index:2}),e.jsx(l.Summary.Cell,{index:3}),e.jsx(l.Summary.Cell,{index:4}),e.jsx(l.Summary.Cell,{index:5}),e.jsx(l.Summary.Cell,{index:6}),e.jsx(l.Summary.Cell,{index:7}),e.jsx(l.Summary.Cell,{index:8,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(o?.sum?.sum_total)})}),e.jsx(l.Summary.Cell,{index:9,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(o?.sum?.sum_vat)})}),e.jsx(l.Summary.Cell,{index:10,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(o?.sum?.sum_discount_amount)})}),e.jsx(l.Summary.Cell,{index:11,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(o?.sum?.sum_grand_total)})})]})})})]})]})}function ve(){return e.jsxs(e.Fragment,{children:[e.jsx(de,{children:e.jsx("title",{children:" ReportSales"})}),e.jsx(Se,{})]})}export{ve as default};
