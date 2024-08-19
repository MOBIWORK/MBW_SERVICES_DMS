import{Y as s,aX as Ue,a1 as p,L as e,a6 as Ae,R as i,P as r,a2 as u,a8 as He,a7 as Le,N as Ke,O as o,Q as f,a9 as Pe,bz as Ve,aW as ae,V as ne,ab as $e}from"./index-ojPgMUzw.js";import{D as Xe}from"./index-OtmQdOAw.js";import{u as Ge,C as We}from"./index-zUB8UHt_.js";import{a as Qe,b as Ze}from"./index.esm-btssWkV_.js";import{u as g}from"./useDebount-4oSSywQj.js";import{t as Je,a as et}from"./index-fF92xUvD.js";import{V as tt}from"./VerticalAlignBottomOutlined-BJlcPuuA.js";import{D as j}from"./index-Q50qKtlq.js";import{I as _}from"./index-ELPxCcwY.js";import{S as st}from"./SyncOutlined--uFR5u9w.js";const at=[{title:e.jsx("div",{className:"relative",children:e.jsx("span",{className:"absolute -top-[11px] -left-8",children:"STT"})}),dataIndex:"stt",key:"stt",render:(F,v,x)=>x+1},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code"},{title:"Tên khách hàng",dataIndex:"customer_name",key:"customer_name"},{title:"Loại khách hàng",dataIndex:"customer_type",key:"customer_type",width:175},{title:"Địa chỉ",dataIndex:"customer_address",key:"customer_address"}];function nt(){const[F,v]=s.useState([]),[x]=Ue(),[k,C]=s.useState(),[D,w]=s.useState(),[T,I]=s.useState(),[Y,E]=s.useState(),[R,M]=s.useState(),[q,B]=s.useState(),[z,O]=s.useState(),[U,A]=s.useState(),[re,le]=s.useState([]),[H,L]=s.useState(""),h=20,[y,c]=s.useState(1),[S,oe]=s.useState(0),[ie,ce]=s.useState(""),[K,P]=s.useState(""),[de,me]=s.useState([]),[pe,xe]=s.useState("");let V=g(ie,500),$=g(pe,500);const[he,ue]=s.useState([]),[fe,ge]=s.useState([]),[X,je]=s.useState(),[_e,ye]=s.useState(""),[G,W]=s.useState();let Q=g(_e);const[Z,J]=s.useState(""),[Se,Ne]=s.useState([]),[be,Fe]=s.useState("");let ee=g(be,500);const N=s.useRef(null),b=Ge(),[ve,ke]=s.useState(0),[Ce,De]=s.useState(b?.h*.52),[d,we]=s.useState(null),[m,Te]=s.useState(null),[Ie,Ye]=s.useState(!1);s.useEffect(()=>{De(b.h*.52)},[b]),s.useEffect(()=>{const t=N.current;if(t){const n=new ResizeObserver(a=>{for(let l of a)ke(l.contentRect.height)});return n.observe(t),()=>n.disconnect()}},[N]);const Ee=t=>{const n=[{title:e.jsx("div",{className:"text-center",children:"STT"}),dataIndex:"stt",key:"stt",width:60,render:(a,l,Oe)=>e.jsx("div",{className:"text-center",children:Oe+1})},{title:"Mã sản phẩm",dataIndex:"item_code",key:"item_code",className:"truncate"},{title:"Tên sản phẩm",dataIndex:"item_name",key:"item_name",width:250,className:"truncate"},{title:"Hạn sử dụng",dataIndex:"exp_time",key:"exp_time",render:(a,l)=>a?e.jsx("p",{children:ne(a*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:"Đơn vị tính",dataIndex:"item_unit",key:"item_unit"},{title:e.jsx("div",{className:"text-right",children:"Tồn"}),dataIndex:"quantity",key:"quantity",render:(a,l)=>e.jsx("div",{className:"!text-right",children:l.quantity})},{title:e.jsx("div",{className:"text-right",children:"Giá sản phẩm"}),dataIndex:"item_price",key:"item_price",render:(a,l)=>e.jsx("p",{className:"text-right",children:Intl.NumberFormat().format(l.item_price)})},{title:e.jsx("div",{className:"text-right",children:"Tổng giá trị"}),dataIndex:"total",key:"total",render:(a,l)=>e.jsx("p",{className:"text-right",children:Intl.NumberFormat().format(l.quantity*l.item_price)})},{title:"Ngày cập nhật",dataIndex:"update_at",key:"update_at",render:(a,l)=>a?e.jsx("p",{children:ne(a*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:"Người kiểm tồn",dataIndex:"update_byname",key:"update_byname",render:(a,l)=>e.jsxs(e.Fragment,{children:[e.jsx("div",{children:l.update_byname}),e.jsx("div",{className:"font-normal text-sm leading-[21px] text-[#637381]",children:l.update_bycode})]})}];return e.jsx("div",{children:e.jsx(Ve,{bordered:!0,columns:n,dataSource:t.items.map(a=>({...a,key:a.item_code})),scroll:{y:280},pagination:!1})})},te=t=>{m&&t&&t.isAfter(m)?ae.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày"):we(t)},se=t=>{d&&t&&t.isBefore(d)?ae.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày"):Te(t)},Re=t=>m?t&&t.isAfter(m,"day"):!1,Me=t=>d?t&&t.isBefore(d,"day"):!1,qe=t=>m?t&&t.isAfter(m,"day"):!1,Be=t=>d?t&&t.isBefore(d,"day"):!1,ze=t=>{if(t.expire_from){let n=Date.parse(t.expire_from.$d)/1e3;C(n)}else C(void 0);if(t.expire_to){let n=Date.parse(t.expire_to.$d)/1e3;w(n)}else w(void 0);if(t.qty_inven_from?M(t.qty_inven_from):M(void 0),t.qty_inven_to?B(t.qty_inven_to):B(void 0),t.total_from?O(t.total_from):O(void 0),t.total_to?A(t.total_to):A(void 0),t.update_at_from){let n=Date.parse(t.update_at_from.$d)/1e3;I(n)}else I(void 0);if(t.update_at_to){let n=Date.parse(t.update_at_to.$d)/1e3;E(n)}else E(void 0);c(1)};return s.useEffect(()=>{(async()=>{let t=await p.get("/api/method/mbw_dms.api.router.get_team_sale");ge(Je({data:t.result.map(n=>({title:n.name,value:n.name,...n})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),s.useEffect(()=>{(async()=>{let t=await p.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:X,key_search:Q}}),{message:n}=t;ue(n.map(a=>({value:a.employee_code,label:a.employee_name||a.employee_code})))})()},[X,Q]),s.useEffect(()=>{(async()=>{let t=await p.get("/api/method/frappe.desk.search.search_link",{params:{txt:ee,doctype:"Customer",ignore_user_permissions:0,query:""}}),{message:n}=t;Ne(n.map(a=>({value:a.value,label:a.value})))})()},[ee]),s.useEffect(()=>{(async()=>{let t=await p.get("/api/method/frappe.desk.search.search_link",{params:{txt:V,doctype:"Item",ignore_user_permissions:0,query:""}}),{message:n}=t;le(n.map(a=>({value:a.value,label:a.description.split(",")[0].trim(),des:a.value})))})()},[V]),s.useEffect(()=>{(async()=>{let t=await p.get("/api/method/frappe.desk.search.search_link",{params:{txt:$,doctype:"UOM",ignore_user_permissions:0,query:""}}),{message:n}=t;me(n.map(a=>({value:a.value,label:a.value})))})()},[$]),s.useEffect(()=>{(async()=>{const t=await p.get("/api/method/mbw_dms.api.report.inventory.get_customer_inventory",{params:{expire_from:k,expire_to:D,update_at_from:T,update_at_to:Y,qty_inven_from:R,qty_inven_to:q,total_from:z,total_to:U,item_code:H,page_size:h,page_number:y,unit_product:K,employee:G,customer:Z}});v(t.result),oe(t?.result?.total)})()},[k,D,R,q,z,U,H,T,Y,y,K,G,Z,Ie,h]),e.jsx(e.Fragment,{children:e.jsx(We,{header:e.jsx(Ae,{title:"Báo cáo tồn kho khách hàng",buttons:[{icon:e.jsx(st,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{Ye(t=>!t)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(tt,{className:"text-xl"}),size:"18px",className:"flex items-center",action:()=>{et("/app/data-export/Data%20Export")}}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(i,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(r,{className:"ml-4",children:e.jsxs(i,{gutter:[8,8],children:[e.jsx(r,{span:6,children:e.jsx(u,{optionFilterProp:"children",filterOption:!1,className:"custom-select",showSearch:!0,onSearch:t=>ce(t),onSelect:t=>{L(t),c(1)},placeholder:e.jsx(e.Fragment,{children:"Tất cả sản phẩm"}),notFoundContent:null,options:re,allowClear:!0,onClear:()=>L(""),optionRender:t=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"text-sm",children:[e.jsx("p",{role:"img","aria-label":t.data.label,className:"my-1",children:t.data.label}),e.jsx("span",{className:"text-xs !font-semibold",children:t.data.des})]})})})}),e.jsx(r,{span:6,children:e.jsx(u,{placeholder:"Tất cả đơn vị tính",options:de,showSearch:!0,onSelect:t=>{P(t),c(1)},onSearch:t=>{xe(t)},onClear:()=>P(""),filterOption:!1,allowClear:!0})}),e.jsx(r,{span:6,children:e.jsx(He,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:fe,onChange:t=>{je(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(r,{span:6,children:e.jsx(u,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả người kiểm tồn",onSearch:t=>{ye(t)},options:he,onSelect:t=>{W(t),c(1)},onClear:()=>{W("")}})}),e.jsx(r,{span:6,children:e.jsx(u,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Se,onSelect:t=>{J(t),c(1)},onSearch:t=>{Fe(t)},showSearch:!0,onClear:()=>J(""),filterOption:!1,allowClear:!0,placeholder:"Tất cả khách hàng"})})]})}),e.jsx(r,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(Le,{className:"!h-8",trigger:["click"],placement:"bottomRight",dropdownRender:()=>e.jsx(Xe,{title:"Bộ lọc",children:e.jsx("div",{className:"pt-6",children:e.jsxs(Ke,{form:x,onFinish:ze,children:[e.jsx("div",{className:"font-semibold text-sm leading-5 text-[#212B36]",children:"Hạn sử dụng"}),e.jsxs(i,{className:"pt-1",gutter:16,children:[e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Ngày bắt đầu"}),e.jsx(o,{className:"pt-2",name:"expire_from",children:e.jsx(j,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:te,placeholder:"Chọn ngày",disabledDate:Re})})]}),e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Kết thúc"}),e.jsx(o,{className:"pt-2",name:"expire_to",children:e.jsx(j,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:se,placeholder:"Chọn ngày",disabledDate:Me})})]})]}),e.jsx("div",{className:"pt-5 font-semibold text-sm leading-5 text-[#212B36]",children:"Ngày cập nhật"}),e.jsxs(i,{className:"pt-1",gutter:16,children:[e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Ngày bắt đầu"}),e.jsx(o,{name:"update_at_from",className:"pt-2",children:e.jsx(j,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:te,placeholder:"Chọn ngày",disabledDate:qe})})]}),e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Kết thúc"}),e.jsx(o,{name:"update_at_to",className:"pt-2",children:e.jsx(j,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:se,placeholder:"Chọn ngày",disabledDate:Be})})]})]}),e.jsx("div",{className:"pt-5 font-semibold text-sm leading-5 text-[#212B36]",children:"Số lượng tồn kho"}),e.jsxs(i,{className:"pt-1",gutter:16,children:[e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Từ"}),e.jsx(o,{className:"pt-2",name:"qty_inven_from",children:e.jsx(_,{controls:!1,className:"w-full",placeholder:"0"})})]}),e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Đến"}),e.jsx(o,{className:"pt-2",name:"qty_inven_to",children:e.jsx(_,{controls:!1,className:"w-full",placeholder:"0"})})]})]}),e.jsx("div",{className:"pt-5 font-semibold text-sm leading-5 text-[#212B36]",children:"Tổng giá trị"}),e.jsxs(i,{className:"pt-1",gutter:16,children:[e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Từ"}),e.jsx(o,{className:"pt-2",name:"total_from",children:e.jsx(_,{controls:!1,className:"!bg-[#F5F7FA] w-full",placeholder:"0",formatter:t=>t?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),suffix:"VND"})})]}),e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Đến"}),e.jsx(o,{className:"pt-2",name:"total_to",children:e.jsx(_,{controls:!1,className:"!bg-[#F5F7FA] w-full",placeholder:"0",formatter:t=>t?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),suffix:"VND"})})]})]}),e.jsxs(i,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(f,{className:"mr-3",onClick:t=>{t.preventDefault(),x.resetFields()},children:"Đặt lại"}),e.jsx(f,{type:"primary",onClick:()=>{x.submit()},children:"Áp dụng"})]})]})]})})}),children:e.jsx(f,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none !h-8",icon:e.jsx(Qe,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(f,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(Ze,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:N,className:"pt-5",children:e.jsx(Pe,{columns:at,scroll:{x:!0,y:ve<300?void 0:Ce},bordered:!0,$border:!0,expandable:{expandedRowRender:Ee,defaultExpandedRowKeys:["0"]},dataSource:F?.data?.map(t=>({...t,key:t.name})),pagination:S&&S>h?{pageSize:h,showSizeChanger:!1,total:S,current:y,onChange(t){c(t)}}:!1,rowHoverable:!1})})]})})})}function ut(){return e.jsxs(e.Fragment,{children:[e.jsx($e,{children:e.jsx("title",{children:" ReportCustomer"})}),e.jsx(nt,{})]})}export{ut as default};
