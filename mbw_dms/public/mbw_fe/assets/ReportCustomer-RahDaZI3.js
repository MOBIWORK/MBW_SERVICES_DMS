import{L as s,aT as Ie,a5 as c,P as e,a6 as Ye,U as i,V as o,Q as J,R as l,a8 as p,a7 as Ee,W as x,a9 as Re,bw as Me,Y as ee,ab as qe}from"./index-IqvFt--c.js";import{D as Ue}from"./index-O54nnICH.js";import{C as ze}from"./index-xcOzDvzO.js";import{a as Be,b as Oe}from"./index.esm-Lsuyg22e.js";import{u}from"./useDebount-Dp5J6eIr.js";import{t as He,a as Ke}from"./index-VnG0QE07.js";import{u as te}from"./index-_rvtupQx.js";import{V as Le}from"./VerticalAlignBottomOutlined-AKLR3UPm.js";import{T as Pe}from"./index-pGjc9ShV.js";import{D as h}from"./index-qBMWitqd.js";import{I as f}from"./index-jCBdSIhY.js";const Ae=[{title:e.jsx("div",{className:"relative",children:e.jsx("span",{className:"absolute -top-[11px] -left-8",children:"STT"})}),dataIndex:"stt",key:"stt",render:(b,S,m)=>m+1},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code"},{title:"Tên khách hàng",dataIndex:"customer_name",key:"customer_name"},{title:"Loại khách hàng",dataIndex:"customer_type",key:"customer_type",width:175},{title:"Địa chỉ",dataIndex:"customer_address",key:"customer_address"}];function Ve(){const[b,S]=s.useState([]),[m]=Ie(),[F,v]=s.useState(),[k,w]=s.useState(),[C,D]=s.useState(),[T,I]=s.useState(),[Y,E]=s.useState(),[R,M]=s.useState(),[q,U]=s.useState(),[z,B]=s.useState(),[se,ae]=s.useState([]),[O,H]=s.useState(""),d=t=>{console.log(t)},j=20,[_,ne]=s.useState(1),[g,re]=s.useState(0),[le,oe]=s.useState(""),[K,L]=s.useState(""),[ie,ce]=s.useState([]),[me,de]=s.useState("");let P=u(le,500),A=u(me,500);const[pe,xe]=s.useState([]),[ue,he]=s.useState([]),[V,fe]=s.useState(),[je,_e]=s.useState(""),[$,G]=s.useState();let W=u(je);const[X,Q]=s.useState(""),[ge,ye]=s.useState([]),[Ne,be]=s.useState("");let Z=u(Ne,500);const y=s.useRef(null),N=te(),[Se,Fe]=s.useState(0),[ve,ke]=s.useState(N?.h*.52);s.useRef(null);const we=te();s.useState(0),s.useState(we?.h*.28),s.useEffect(()=>{ke(N.h*.52)},[N]),s.useEffect(()=>{const t=y.current;if(t){const n=new ResizeObserver(a=>{for(let r of a)Fe(r.contentRect.height)});return n.observe(t),()=>n.disconnect()}},[y]);const Ce=t=>{const n=[{title:e.jsx("div",{className:"text-center",children:"STT"}),dataIndex:"stt",key:"stt",render:(a,r,Te)=>e.jsx("div",{className:"text-center",children:Te+1})},{title:"Mã sản phẩm",dataIndex:"item_code",key:"item_code"},{title:"Tên sản phẩm",dataIndex:"item_name",key:"item_name"},{title:"Hạn sử dụng",dataIndex:"exp_time",key:"exp_time",render:(a,r)=>a?e.jsx("p",{children:ee(a*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:"Đơn vị tính",dataIndex:"item_unit",key:"item_unit"},{title:e.jsx("div",{className:"text-right",children:"Tồn"}),dataIndex:"quantity",key:"quantity",render:(a,r)=>e.jsx("div",{className:"!text-right",children:r.quantity})},{title:e.jsx("div",{className:"text-right",children:"Giá sản phẩm"}),dataIndex:"item_price",key:"item_price",render:(a,r)=>e.jsx("p",{className:"text-right",children:Intl.NumberFormat().format(r.item_price)})},{title:e.jsx("div",{className:"text-right",children:"Tổng giá trị"}),dataIndex:"total",key:"total",render:(a,r)=>e.jsx("p",{className:"text-right",children:Intl.NumberFormat().format(r.quantity*r.item_price)})},{title:"Ngày cập nhật",dataIndex:"update_at",key:"update_at",render:(a,r)=>a?e.jsx("p",{children:ee(a*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:"Người kiểm tồn",dataIndex:"update_byname",key:"update_byname",render:(a,r)=>e.jsxs(e.Fragment,{children:[e.jsx("div",{children:r.update_byname}),e.jsx("div",{className:"font-normal text-sm leading-[21px] text-[#637381]",children:r.update_bycode})]})}];return e.jsx("div",{children:e.jsx(Me,{bordered:!0,columns:n,dataSource:t.items.map(a=>({...a,key:a.item_code})),scroll:{y:280},pagination:!1})})},De=t=>{if(t.expire_from){let n=Date.parse(t.expire_from.$d)/1e3;v(n)}else v(void 0);if(t.expire_to){let n=Date.parse(t.expire_to.$d)/1e3;w(n)}else w(void 0);if(t.qty_inven_from?E(t.qty_inven_from):E(void 0),t.qty_inven_to?M(t.qty_inven_to):M(void 0),t.total_from?U(t.total_from):U(void 0),t.total_to?B(t.total_to):B(void 0),t.update_at_from){let n=Date.parse(t.update_at_from.$d)/1e3;D(n)}else D(void 0);if(t.update_at_to){let n=Date.parse(t.update_at_to.$d)/1e3;I(n)}else I(void 0)};return s.useEffect(()=>{(async()=>{let t=await c.get("/api/method/mbw_dms.api.router.get_team_sale");he(He({data:t.result.map(n=>({title:n.name,value:n.name,...n})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),s.useEffect(()=>{(async()=>{let t=await c.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:V,key_search:W}}),{message:n}=t;xe(n.map(a=>({value:a.employee_code,label:a.employee_name||a.employee_code})))})()},[V,W]),s.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:Z,doctype:"Customer",ignore_user_permissions:0,query:""}}),{message:n}=t;ye(n.map(a=>({value:a.value,label:a.value})))})()},[Z]),s.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:P,doctype:"Item",ignore_user_permissions:0,query:""}}),{message:n}=t;ae(n.map(a=>({value:a.value,label:a.description.split(",")[0].trim(),des:a.value})))})()},[P]),s.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:A,doctype:"UOM",ignore_user_permissions:0,query:""}}),{message:n}=t;ce(n.map(a=>({value:a.value,label:a.value})))})()},[A]),s.useEffect(()=>{(async()=>{const t=await c.get("/api/method/mbw_dms.api.report.inventory.get_customer_inventory",{params:{expire_from:F,expire_to:k,update_at_from:C,update_at_to:T,qty_inven_from:Y,qty_inven_to:R,total_from:q,total_to:z,item_code:O,page_size:j,page_number:_,unit_product:K,employee:$,customer:X}});S(t.result),re(t?.result?.total)})()},[F,k,Y,R,q,z,O,C,T,_,K,$,X]),e.jsx(e.Fragment,{children:e.jsx(ze,{header:e.jsx(Ye,{title:"Báo cáo tồn kho khách hàng",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(Le,{className:"text-xl"}),size:"20px",className:"flex items-center",action:()=>{Ke("/app/data-export/Data%20Export")}}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(i,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(o,{children:e.jsx(i,{gutter:[8,8],children:e.jsx(o,{className:"mx-4 w-full",span:24,children:e.jsxs(J,{layout:"vertical",className:"flex flex-wrap justify-start items-center ",children:[e.jsx(l,{label:"Sản phẩm",className:"w-[200px] border-none mr-2",children:e.jsx(p,{optionFilterProp:"children",filterOption:!1,onSearch:t=>oe(t),onSelect:t=>{H(t)},placeholder:e.jsx(e.Fragment,{children:"Tất cả sản phẩm"}),notFoundContent:null,options:se,allowClear:!0,onClear:()=>H(""),optionRender:t=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"text-sm",children:[e.jsx("p",{role:"img","aria-label":t.data.label,className:"my-1",children:t.data.label}),e.jsx("span",{className:"text-xs !font-semibold",children:t.data.des})]})})})}),e.jsx(l,{label:"Đơn vị tính",className:"w-[200px] border-none mr-2",children:e.jsx(p,{placeholder:"Tất cả đơn vị tính",options:ie,onSelect:t=>{L(t)},onSearch:t=>{de(t)},onClear:()=>L(""),filterOption:!1,allowClear:!0})}),e.jsx(l,{label:"Nhóm bán hàng",className:"w-[200px] border-none mr-2",children:e.jsx(Pe,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,treeData:ue,onChange:t=>{fe(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(l,{label:"Người kiểm tồn",name:"employee",className:"w-[200px] border-none mr-2",children:e.jsx(p,{filterOption:!1,notFoundContent:null,allowClear:!0,placeholder:"Tất cả người kiểm tồn",onSearch:t=>{_e(t)},options:pe,onSelect:t=>{G(t)},onClear:()=>{G("")}})}),e.jsx(l,{label:"Khách hàng",className:"w-[200px] border-none mr-2",children:e.jsx(p,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:ge,onSelect:t=>{Q(t)},onSearch:t=>{be(t)},onClear:()=>Q(""),filterOption:!1,allowClear:!0,placeholder:"Tất cả khách hàng"})})]})})})}),e.jsx(o,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(Ee,{className:"!h-9",trigger:["click"],placement:"bottomRight",dropdownRender:()=>e.jsx(Ue,{title:"Bộ lọc",children:e.jsx("div",{className:"pt-6",children:e.jsxs(J,{form:m,onFinish:De,children:[e.jsx("div",{className:"font-semibold text-sm leading-5 text-[#212B36]",children:"Hạn sử dụng"}),e.jsxs(i,{className:"pt-1",gutter:16,children:[e.jsxs(o,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Ngày bắt đầu"}),e.jsx(l,{className:"pt-2",name:"expire_from",children:e.jsx(h,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:d})})]}),e.jsxs(o,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Kết thúc"}),e.jsx(l,{className:"pt-2",name:"expire_to",children:e.jsx(h,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:d})})]})]}),e.jsx("div",{className:"pt-5 font-semibold text-sm leading-5 text-[#212B36]",children:"Ngày cập nhật"}),e.jsxs(i,{className:"pt-1",gutter:16,children:[e.jsxs(o,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Ngày bắt đầu"}),e.jsx(l,{name:"update_at_from",className:"pt-2",children:e.jsx(h,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:d})})]}),e.jsxs(o,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Kết thúc"}),e.jsx(l,{name:"update_at_to",className:"pt-2",children:e.jsx(h,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:d})})]})]}),e.jsx("div",{className:"pt-5 font-semibold text-sm leading-5 text-[#212B36]",children:"Số lượng tồn kho"}),e.jsxs(i,{className:"pt-1",gutter:16,children:[e.jsxs(o,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Từ"}),e.jsx(l,{className:"pt-2",name:"qty_inven_from",children:e.jsx(f,{controls:!1,className:"w-full",placeholder:"0"})})]}),e.jsxs(o,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Đến"}),e.jsx(l,{className:"pt-2",name:"qty_inven_to",children:e.jsx(f,{controls:!1,className:"w-full",placeholder:"0"})})]})]}),e.jsx("div",{className:"pt-5 font-semibold text-sm leading-5 text-[#212B36]",children:"Tổng giá trị"}),e.jsxs(i,{className:"pt-1",gutter:16,children:[e.jsxs(o,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Từ"}),e.jsx(l,{className:"pt-2",name:"total_from",children:e.jsx(f,{controls:!1,className:"!bg-[#F5F7FA] w-full",placeholder:"0",suffix:"VND"})})]}),e.jsxs(o,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Đến"}),e.jsx(l,{className:"pt-2",name:"total_to",children:e.jsx(f,{controls:!1,className:"!bg-[#F5F7FA] w-full",placeholder:"0",suffix:"VND"})})]})]}),e.jsxs(i,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(x,{className:"mr-3",onClick:t=>{t.preventDefault(),m.resetFields()},children:"Đặt lại"}),e.jsx(x,{type:"primary",onClick:()=>{m.submit()},children:"Áp dụng"})]})]})]})})}),children:e.jsx(x,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-9",icon:e.jsx(Be,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(x,{className:"border-l-[0.1px] rounded-l-none !h-9",children:e.jsx(Oe,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:y,className:"pt-5",children:e.jsx(Re,{columns:Ae,scroll:{x:!0,y:Se<300?void 0:ve},bordered:!0,$border:!0,expandable:{expandedRowRender:Ce,defaultExpandedRowKeys:["0"]},dataSource:b?.data?.map(t=>({...t,key:t.name})),pagination:g&&g>j?{pageSize:j,showSizeChanger:!1,total:g,current:_,onChange(t){ne(t)}}:!1,rowHoverable:!1})}),e.jsx("div",{className:""})]})})})}function nt(){return e.jsxs(e.Fragment,{children:[e.jsx(qe,{children:e.jsx("title",{children:" ReportCustomer"})}),e.jsx(Ve,{})]})}export{nt as default};