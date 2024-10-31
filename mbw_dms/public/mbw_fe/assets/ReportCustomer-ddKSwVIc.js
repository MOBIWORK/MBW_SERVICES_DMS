import{Y as s,a_ as He,a1 as p,a6 as Le,L as e,a7 as Ke,bD as Pe,R as i,P as r,a2 as u,aa as Ve,a9 as $e,N as Ge,O as o,Q as f,ab as Xe,bE as Ze,aZ as te,V as se,ad as Qe}from"./index-xC06qkrg.js";import{u as We,C as Je,S as et,D as tt}from"./index-QGQ4cXM7.js";import"https://cdn.jsdelivr.net/npm/nats.ws@1.29.2/+esm";import{a as st,b as at}from"./index.esm-F7nwsC82.js";import{u as _}from"./useDebount-v60FM5hP.js";import{V as nt}from"./VerticalAlignBottomOutlined-bv2z068I.js";import{D as g}from"./index-nhZxtOqB.js";import{I as j}from"./index-vUY-e3kz.js";function rt(){const ae=[{title:e.jsx("div",{className:"relative",children:e.jsx("span",{className:"absolute -top-[11px] -left-8",children:"STT"})}),dataIndex:"stt",key:"stt",render:(t,n,a)=>e.jsx("span",{children:Re(h,x,a)})},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code"},{title:"Tên khách hàng",dataIndex:"customer_name",key:"customer_name"},{title:"Loại hình khách hàng",dataIndex:"customer_type",key:"customer_type",width:175},{title:"Địa chỉ",dataIndex:"customer_address",key:"customer_address"}],[ne,re]=s.useState([]),[y]=He(),[b,q]=s.useState(),[S,B]=s.useState(),[N,z]=s.useState(),[F,O]=s.useState(),[v,U]=s.useState(),[D,A]=s.useState(),[k,H]=s.useState(),[C,L]=s.useState(),[le,oe]=s.useState([]),[w,K]=s.useState(""),x=20,[h,c]=s.useState(1),[I,ie]=s.useState(0),[ce,de]=s.useState(""),[T,P]=s.useState(""),[me,pe]=s.useState([]),[xe,he]=s.useState("");let V=_(ce,500),$=_(xe,500);const[ue,fe]=s.useState([]),[_e,ge]=s.useState([]),[G,je]=s.useState(),[ye,be]=s.useState(""),[Y,X]=s.useState();let Z=_(ye);const[E,Q]=s.useState(""),[Se,Ne]=s.useState([]),[Fe,ve]=s.useState("");let W=_(Fe,500);const R=s.useRef(null),M=We(),[De,ke]=s.useState(0),[Ce,we]=s.useState(M?.h*.52),[d,Ie]=s.useState(null),[m,Te]=s.useState(null),[Ye,Ee]=s.useState(!1),Re=(t,n,a)=>(t-1)*n+a+1;s.useEffect(()=>{we(M.h*.52)},[M]),s.useEffect(()=>{const t=R.current;if(t){const n=new ResizeObserver(a=>{for(let l of a)ke(l.contentRect.height)});return n.observe(t),()=>n.disconnect()}},[R]);const Me=t=>{const n=[{title:e.jsx("div",{className:"text-center",children:"STT"}),dataIndex:"stt",key:"stt",width:60,render:(a,l,Ae)=>e.jsx("div",{className:"text-center",children:Ae+1})},{title:"Mã sản phẩm",dataIndex:"item_code",key:"item_code",className:"truncate"},{title:"Tên sản phẩm",dataIndex:"item_name",key:"item_name",width:250,className:"truncate"},{title:"Hạn sử dụng",dataIndex:"exp_time",key:"exp_time",render:(a,l)=>a?e.jsx("p",{children:se(a*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:"Đơn vị tính",dataIndex:"item_unit",key:"item_unit"},{title:e.jsx("div",{className:"text-right",children:"Tồn"}),dataIndex:"quantity",key:"quantity",render:(a,l)=>e.jsx("div",{className:"!text-right",children:l.quantity})},{title:e.jsx("div",{className:"text-right",children:"Giá sản phẩm"}),dataIndex:"item_price",key:"item_price",render:(a,l)=>e.jsx("p",{className:"text-right",children:Intl.NumberFormat().format(l.item_price)})},{title:e.jsx("div",{className:"text-right",children:"Tổng giá trị"}),dataIndex:"total",key:"total",render:(a,l)=>e.jsx("p",{className:"text-right",children:Intl.NumberFormat().format(l.quantity*l.item_price)})},{title:"Ngày cập nhật",dataIndex:"update_at",key:"update_at",render:(a,l)=>a?e.jsx("p",{children:se(a*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:"Người kiểm tồn",dataIndex:"update_byname",key:"update_byname",render:(a,l)=>e.jsxs(e.Fragment,{children:[e.jsx("div",{children:l.update_byname}),e.jsx("div",{className:"font-normal text-sm leading-[21px] text-[#637381]",children:l.update_bycode})]})}];return e.jsx("div",{children:e.jsx(Ze,{bordered:!0,columns:n,dataSource:t.items.map(a=>({...a,key:a.item_code})),scroll:{y:280},pagination:!1})})},J=t=>{m&&t&&t.isAfter(m)?te.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày"):Ie(t)},ee=t=>{d&&t&&t.isBefore(d)?te.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày"):Te(t)},qe=t=>m?t&&t.isAfter(m,"day"):!1,Be=t=>d?t&&t.isBefore(d,"day"):!1,ze=t=>m?t&&t.isAfter(m,"day"):!1,Oe=t=>d?t&&t.isBefore(d,"day"):!1,Ue=t=>{if(t.expire_from){let n=Date.parse(t.expire_from.$d)/1e3;q(n)}else q(void 0);if(t.expire_to){let n=Date.parse(t.expire_to.$d)/1e3;B(n)}else B(void 0);if(t.qty_inven_from?U(t.qty_inven_from):U(void 0),t.qty_inven_to?A(t.qty_inven_to):A(void 0),t.total_from?H(t.total_from):H(void 0),t.total_to?L(t.total_to):L(void 0),t.update_at_from){let n=Date.parse(t.update_at_from.$d)/1e3;z(n)}else z(void 0);if(t.update_at_to){let n=Date.parse(t.update_at_to.$d)/1e3;O(n)}else O(void 0);c(1)};return s.useEffect(()=>{(async()=>{let t=await p.get("/api/method/mbw_dms.api.router.get_team_sale");ge(Le({data:t.result.map(n=>({title:n.name,value:n.name,...n})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),s.useEffect(()=>{(async()=>{let t=await p.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:G,key_search:Z}}),{message:n}=t;fe(n.map(a=>({value:a.employee_code,label:a.employee_name||a.employee_code})))})()},[G,Z]),s.useEffect(()=>{(async()=>{let t=await p.get("/api/method/frappe.desk.search.search_link",{params:{txt:W,doctype:"Customer",ignore_user_permissions:0,query:""}}),{message:n}=t;Ne(n.map(a=>({value:a.value,label:a.value})))})()},[W]),s.useEffect(()=>{(async()=>{let t=await p.get("/api/method/frappe.desk.search.search_link",{params:{txt:V,doctype:"Item",ignore_user_permissions:0,query:""}}),{message:n}=t;oe(n.map(a=>({value:a.value,label:a.description.split(",")[0].trim(),des:a.value})))})()},[V]),s.useEffect(()=>{(async()=>{let t=await p.get("/api/method/frappe.desk.search.search_link",{params:{txt:$,doctype:"UOM",ignore_user_permissions:0,query:""}}),{message:n}=t;pe(n.map(a=>({value:a.value,label:a.value})))})()},[$]),s.useEffect(()=>{(async()=>{const t=await p.get("/api/method/mbw_dms.api.report.inventory.get_customer_inventory",{params:{expire_from:b,expire_to:S,update_at_from:N,update_at_to:F,qty_inven_from:v,qty_inven_to:D,total_from:k,total_to:C,item_code:w,page_size:x,page_number:h,unit_product:T,employee:Y,customer:E}});re(t.result),ie(t?.result?.total)})()},[b,S,v,D,k,C,w,N,F,h,T,Y,E,Ye,x]),e.jsx(e.Fragment,{children:e.jsx(Je,{header:e.jsx(Ke,{title:"Báo cáo tồn kho khách hàng",buttons:[{icon:e.jsx(et,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{Ee(t=>!t)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(nt,{className:"text-xl"}),size:"18px",className:"flex items-center",action:Pe.bind(null,{url:"/api/method/mbw_dms.api.exports.export_excel.export_excel",params:{report_type:"Report Inventory",data_filter:{expire_from:b,expire_to:S,update_at_from:N,update_at_to:F,qty_inven_from:v,qty_inven_to:D,total_from:k,total_to:C,item_code:w,unit_product:T,employee:Y,customer:E}},file_name:"Report Inventory.xlsx"})}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(i,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(r,{className:"ml-4",children:e.jsxs(i,{gutter:[8,8],children:[e.jsx(r,{span:6,children:e.jsx(u,{optionFilterProp:"children",filterOption:!1,className:"custom-select",showSearch:!0,onSearch:t=>de(t),onSelect:t=>{K(t),c(1)},placeholder:e.jsx(e.Fragment,{children:"Tất cả sản phẩm"}),notFoundContent:null,options:le,allowClear:!0,onClear:()=>K(""),optionRender:t=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"text-sm",children:[e.jsx("p",{role:"img","aria-label":t.data.label,className:"my-1",children:t.data.label}),e.jsx("span",{className:"text-xs !font-semibold",children:t.data.des})]})})})}),e.jsx(r,{span:6,children:e.jsx(u,{placeholder:"Tất cả đơn vị tính",options:me,showSearch:!0,onSelect:t=>{P(t),c(1)},onSearch:t=>{he(t)},onClear:()=>P(""),filterOption:!1,allowClear:!0})}),e.jsx(r,{span:6,children:e.jsx(Ve,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:_e,onChange:t=>{je(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(r,{span:6,children:e.jsx(u,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả người kiểm tồn",onSearch:t=>{be(t)},options:ue,onSelect:t=>{X(t),c(1)},onClear:()=>{X("")}})}),e.jsx(r,{span:6,children:e.jsx(u,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Se,onSelect:t=>{Q(t),c(1)},onSearch:t=>{ve(t)},showSearch:!0,onClear:()=>Q(""),filterOption:!1,allowClear:!0,placeholder:"Tất cả khách hàng"})})]})}),e.jsx(r,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx($e,{className:"!h-8",trigger:["click"],placement:"bottomRight",dropdownRender:()=>e.jsx(tt,{title:"Bộ lọc",children:e.jsx("div",{className:"pt-6",children:e.jsxs(Ge,{form:y,onFinish:Ue,children:[e.jsx("div",{className:"font-semibold text-sm leading-5 text-[#212B36]",children:"Hạn sử dụng"}),e.jsxs(i,{className:"pt-1",gutter:16,children:[e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Ngày bắt đầu"}),e.jsx(o,{className:"pt-2",name:"expire_from",children:e.jsx(g,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:J,placeholder:"Chọn ngày",disabledDate:qe})})]}),e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Kết thúc"}),e.jsx(o,{className:"pt-2",name:"expire_to",children:e.jsx(g,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:ee,placeholder:"Chọn ngày",disabledDate:Be})})]})]}),e.jsx("div",{className:"pt-5 font-semibold text-sm leading-5 text-[#212B36]",children:"Ngày cập nhật"}),e.jsxs(i,{className:"pt-1",gutter:16,children:[e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Ngày bắt đầu"}),e.jsx(o,{name:"update_at_from",className:"pt-2",children:e.jsx(g,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:J,placeholder:"Chọn ngày",disabledDate:ze})})]}),e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Kết thúc"}),e.jsx(o,{name:"update_at_to",className:"pt-2",children:e.jsx(g,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8]",onChange:ee,placeholder:"Chọn ngày",disabledDate:Oe})})]})]}),e.jsx("div",{className:"pt-5 font-semibold text-sm leading-5 text-[#212B36]",children:"Số lượng tồn kho"}),e.jsxs(i,{className:"pt-1",gutter:16,children:[e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Từ"}),e.jsx(o,{className:"pt-2",name:"qty_inven_from",children:e.jsx(j,{controls:!1,className:"w-full",placeholder:"0"})})]}),e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Đến"}),e.jsx(o,{className:"pt-2",name:"qty_inven_to",children:e.jsx(j,{controls:!1,className:"w-full",placeholder:"0"})})]})]}),e.jsx("div",{className:"pt-5 font-semibold text-sm leading-5 text-[#212B36]",children:"Tổng giá trị"}),e.jsxs(i,{className:"pt-1",gutter:16,children:[e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Từ"}),e.jsx(o,{className:"pt-2",name:"total_from",children:e.jsx(j,{controls:!1,className:"!bg-[#F5F7FA] w-full",placeholder:"0",formatter:t=>t?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),suffix:"VND"})})]}),e.jsxs(r,{span:12,children:[e.jsx("span",{className:"font-normal text-sm leading-5 text-[#637381]",children:"Đến"}),e.jsx(o,{className:"pt-2",name:"total_to",children:e.jsx(j,{controls:!1,className:"!bg-[#F5F7FA] w-full",placeholder:"0",formatter:t=>t?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),suffix:"VND"})})]})]}),e.jsxs(i,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(f,{className:"mr-3",onClick:t=>{t.preventDefault(),y.resetFields()},children:"Đặt lại"}),e.jsx(f,{type:"primary",onClick:()=>{y.submit()},children:"Áp dụng"})]})]})]})})}),children:e.jsx(f,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none !h-8",icon:e.jsx(st,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(f,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(at,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:R,className:"pt-5",children:e.jsx(Xe,{columns:ae,scroll:{x:!0,y:De<300?void 0:Ce},bordered:!0,$border:!0,expandable:{expandedRowRender:Me,defaultExpandedRowKeys:["0"]},dataSource:ne?.data?.map(t=>({...t,key:t.name})),pagination:I&&I>x?{pageSize:x,showSizeChanger:!1,total:I,current:h,onChange(t){c(t)}}:!1,rowHoverable:!1})})]})})})}function ht(){return e.jsxs(e.Fragment,{children:[e.jsx(Qe,{children:e.jsx("title",{children:" ReportCustomer"})}),e.jsx(rt,{})]})}export{ht as default};
