import{Y as s,aS as ne,a3 as u,L as e,R as i,P as r,O as l,a5 as O,a4 as re,N as le,Q as c,a6 as oe,bv as ie,V as A,a8 as me}from"./index-fuXJw3lN.js";import{H as de}from"./header-page-K-LJgKp9.js";import{D as ce}from"./index-p3UdPJ3G.js";import{a as xe,b as pe}from"./index.esm-1J0d_GGI.js";import{u as H}from"./useDebount-r3obulMP.js";import{V as ue}from"./VerticalAlignBottomOutlined-VgOadJOh.js";import{D as x}from"./index-X-oLqas2.js";import{I as p}from"./index-NkuBk9kx.js";const he=[{title:"STT",dataIndex:"stt",key:"stt",render:(h,f,m)=>m+1},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code"},{title:"Tên khách hàng",dataIndex:"customer_name",key:"customer_name"},{title:"Loại khách hàng",dataIndex:"customer_type",key:"customer_type"},{title:"Địa chỉ",dataIndex:"customer_address",key:"customer_address"}];function fe(){const[h,f]=s.useState([]),[m]=ne(),[j,_]=s.useState(),[g,N]=s.useState(),[y,b]=s.useState(),[F,S]=s.useState(),[k,D]=s.useState(),[v,w]=s.useState(),[I,Y]=s.useState(),[T,C]=s.useState(),[K,L]=s.useState([]),[M,q]=s.useState(""),d=t=>{console.log(t)},E=20,[R,V]=s.useState(1),[$,G]=s.useState(0),[X,Q]=s.useState(""),[U,B]=s.useState(""),[Z,J]=s.useState([]),[W,ee]=s.useState("");let P=H(X,500),z=H(W,500);const te=t=>{const n=[{title:"STT",dataIndex:"stt",key:"stt",render:(a,o,ae)=>ae+1},{title:"Mã sản phẩm",dataIndex:"item_code",key:"item_code"},{title:"Tên sản phẩm",dataIndex:"item_name",key:"item_name"},{title:"Hạn sử dụng",dataIndex:"exp_time",key:"exp_time",render:(a,o)=>e.jsx("p",{children:A(o.exp_time*1e3).format("DD/MM/YYYY")})},{title:"Đơn vị tính",dataIndex:"item_unit",key:"item_unit"},{title:"Tồn",dataIndex:"quantity",key:"quantity"},{title:"Giá sản phẩm",dataIndex:"item_price",key:"item_price",render:(a,o)=>e.jsx("p",{children:Intl.NumberFormat().format(o.item_price)})},{title:"Tổng giá trị",dataIndex:"total",key:"total",render:(a,o)=>e.jsx("p",{children:Intl.NumberFormat().format(o.quantity*o.item_price)})},{title:"Ngày cập nhật",dataIndex:"update_at",key:"update_at",render:(a,o)=>{a?A(a*1e3).format("DD/MM/YYYY"):e.Fragment}},{title:"Người cập nhật",dataIndex:"update_byname",key:"update_byname",render:(a,o)=>e.jsxs(e.Fragment,{children:[e.jsx("div",{children:o.update_byname}),e.jsx("div",{className:"font-normal text-sm leading-[21px] text-[#637381]",children:o.update_bycode})]})}];return e.jsx(ie,{columns:n,dataSource:t.items.map(a=>({...a,key:a.item_code})),pagination:!1})},se=t=>{if(t.expire_from){let n=Date.parse(t.expire_from.$d)/1e3;_(n)}else _(void 0);if(t.expire_to){let n=Date.parse(t.expire_to.$d)/1e3;N(n)}else N(void 0);if(t.qty_inven_from?D(t.qty_inven_from):D(void 0),t.qty_inven_to?w(t.qty_inven_to):w(void 0),t.total_from?Y(t.total_from):Y(void 0),t.total_to?C(t.total_to):C(void 0),t.update_at_from){let n=Date.parse(t.update_at_from.$d)/1e3;b(n)}else b(void 0);if(t.update_at_to){let n=Date.parse(t.update_at_to.$d)/1e3;S(n)}else S(void 0)};return s.useEffect(()=>{(async()=>{let t=await u.get("/api/method/frappe.desk.search.search_link",{params:{txt:P,doctype:"Item",ignore_user_permissions:0,query:""}}),{message:n}=t;L(n.map(a=>({value:a.value,label:a.description.split(",")[0].trim(),des:a.value})))})()},[P]),s.useEffect(()=>{(async()=>{let t=await u.get("/api/method/frappe.desk.search.search_link",{params:{txt:z,doctype:"UOM",ignore_user_permissions:0,query:""}}),{message:n}=t;J(n.map(a=>({value:a.value,label:a.value})))})()},[z]),s.useEffect(()=>{(async()=>{const t=await u.get("/api/method/mbw_dms.api.report.inventory.get_customer_inventory",{params:{expire_from:j,expire_to:g,update_at_from:y,update_at_to:F,qty_inven_from:k,qty_inven_to:v,total_from:I,total_to:T,item_code:M,page_size:E,page_number:R,unit_product:U}});console.log("ddd",t),f(t.result),G(t?.result?.total)})()},[j,g,k,v,I,T,M,y,F,R,U]),e.jsxs(e.Fragment,{children:[e.jsx(de,{title:"Báo cáo tồn kho khách hàng",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(ue,{className:"text-xl"}),size:"20px",className:"flex items-center"}]}),e.jsxs("div",{className:"bg-white rounded-xl border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(i,{className:"justify-between items-end w-full p-4",children:[e.jsx(r,{span:14,children:e.jsxs(i,{gutter:8,children:[e.jsx(r,{className:"mx-4 w-full",span:24,children:e.jsxs("div",{className:"flex justify-start items-center ",children:[e.jsx(l,{className:"!w-[200px] border-none mr-2",label:"Sản phẩm"}),e.jsx(l,{className:"w-[200px] border-none mr-2",label:"Đơn vị tính"})]})}),e.jsx(r,{className:"mx-4 w-full",span:24,children:e.jsxs("div",{className:"flex justify-start items-center",children:[e.jsx(l,{className:"!w-[200px] border-none mr-2",children:e.jsx(O,{filterOption:!1,showSearch:!0,notFoundContent:null,onSearch:t=>Q(t),options:K,onSelect:t=>{q(t)},allowClear:!0,onClear:()=>q(""),optionRender:t=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"text-sm",children:[e.jsx("p",{role:"img","aria-label":t.data.label,className:"my-1",children:t.data.label}),e.jsx("span",{className:"text-xs !font-semibold",children:t.data.des})]})})})}),e.jsx(l,{className:"!w-[200px] border-none mr-2",children:e.jsx(O,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Z,onSelect:t=>{B(t)},onSearch:t=>{ee(t)},onClear:()=>B(""),filterOption:!1,allowClear:!0,showSearch:!0})})]})})]})}),e.jsx(r,{className:"mr-5",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(re,{className:"!h-8",placement:"bottomRight",dropdownRender:()=>e.jsx(ce,{title:"Bộ lọc",children:e.jsx("div",{className:"pt-6",children:e.jsxs(le,{form:m,onFinish:se,children:[e.jsx("div",{className:"font-semibold text-sm leading-5 text-[#212B36]",children:"Hạn sử dụng"}),e.jsxs(i,{className:"pt-1",gutter:16,children:[e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Ngày bắt đầu"}),e.jsx(l,{className:"pt-2",name:"expire_from",children:e.jsx(x,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:d})})]}),e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Kết thúc"}),e.jsx(l,{className:"pt-2",name:"expire_to",children:e.jsx(x,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:d})})]})]}),e.jsx("div",{className:"pt-5 font-semibold text-sm leading-5 text-[#212B36]",children:"Ngày cập nhật"}),e.jsxs(i,{className:"pt-1",gutter:16,children:[e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Ngày bắt đầu"}),e.jsx(l,{name:"update_at_from",className:"pt-2",children:e.jsx(x,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:d})})]}),e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Kết thúc"}),e.jsx(l,{name:"update_at_to",className:"pt-2",children:e.jsx(x,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:d})})]})]}),e.jsx("div",{className:"pt-5 font-semibold text-sm leading-5 text-[#212B36]",children:"Số lượng tồn kho"}),e.jsxs(i,{className:"pt-1",gutter:16,children:[e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Từ"}),e.jsx(l,{className:"pt-2",name:"qty_inven_from",children:e.jsx(p,{controls:!1,className:"w-full",placeholder:"0"})})]}),e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Đến"}),e.jsx(l,{className:"pt-2",name:"qty_inven_to",children:e.jsx(p,{controls:!1,className:"w-full",placeholder:"0"})})]})]}),e.jsx("div",{className:"pt-5 font-semibold text-sm leading-5 text-[#212B36]",children:"Tổng giá trị"}),e.jsxs(i,{className:"pt-1",gutter:16,children:[e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Từ"}),e.jsx(l,{className:"pt-2",name:"total_from",children:e.jsx(p,{controls:!1,className:"!bg-[#F5F7FA] w-full",placeholder:"0",suffix:"VND"})})]}),e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Đến"}),e.jsx(l,{className:"pt-2",name:"total_to",children:e.jsx(p,{controls:!1,className:"!bg-[#F5F7FA] w-full",placeholder:"0",suffix:"VND"})})]})]}),e.jsxs(i,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(c,{className:"mr-3",onClick:t=>{t.preventDefault(),m.resetFields()},children:"Đặt lại"}),e.jsx(c,{type:"primary",onClick:()=>{m.submit()},children:"Áp dụng"})]})]})]})})}),children:e.jsx(c,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-9",icon:e.jsx(xe,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(c,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(pe,{style:{fontSize:"20px"}})})]})})})]}),e.jsx(oe,{columns:he,expandable:{expandedRowRender:te,defaultExpandedRowKeys:["0"]},dataSource:h?.data?.map(t=>({...t,key:t.name})),pagination:{defaultPageSize:E,total:$,showSizeChanger:!1,onChange(t){V(t)}}}),e.jsx("div",{className:""})]})]})}function ke(){return e.jsxs(e.Fragment,{children:[e.jsx(me,{children:e.jsx("title",{children:" ReportCustomer"})}),e.jsx(fe,{})]})}export{ke as default};
