import{Y as r,aX as ye,a1 as h,L as e,a6 as fe,R as S,P as c,a8 as ge,a2 as u,a7 as _e,N as p,Q as x,a9 as je,V as d,aW as O,ab as be}from"./index-s0pNClOa.js";import{D as Se}from"./index-5A9SyJDc.js";import{u as ke,C as ve}from"./index--IfPf6eQ.js";import{u as k}from"./useDebount-KMTWHxic.js";import{t as we,a as Fe}from"./index-7mJsYqX6.js";import{a as Ne,b as Ce}from"./index.esm-3AjkmLe1.js";import{e as De}from"./data-u-VkVTNg.js";import{D as G}from"./index-Tncp5s9L.js";import{S as Te}from"./SyncOutlined-LcrCRh3R.js";import{V as Ee}from"./VerticalAlignBottomOutlined-m4O9UFeM.js";const A=d().startOf("month"),B=d().endOf("month");let Ie=Date.parse(A.$d)/1e3,Re=Date.parse(B.$d)/1e3;const ze=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(n,s,m)=>e.jsx("div",{className:"text-center",children:m+1})},{title:"Nhóm bán hàng",dataIndex:"sales_team",key:"sales_team",render:(n,s)=>e.jsx("div",{children:s.sales_team})},{title:"Mã nhân viên",dataIndex:"employee_id",key:"employee_id",render:(n,s)=>e.jsx("div",{children:s.employee_id})},{title:"Tên nhân viên",dataIndex:"sales_person",key:"sales_person",render:(n,s)=>e.jsx("div",{children:s.sales_person})},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code",render:(n,s)=>e.jsx("div",{children:s.customer_code})},{title:"Tên khách hàng",dataIndex:"customer_name",key:"customer_name",render:(n,s)=>e.jsx("div",{children:s.customer_name})},{title:"Loại khách hàng",dataIndex:"customer_type",key:"customer_type",render:(n,s)=>e.jsx("div",{children:s.customer_type})},{title:"Nhóm khách hàng",dataIndex:"customer_group",key:"customer_group",render:(n,s)=>e.jsx("div",{children:s.customer_group})},{title:"Người liên hệ",dataIndex:"contact_person",key:"contact_person",render:(n,s)=>e.jsx("div",{className:"!w-[175px] truncate hover:whitespace-normal",children:s.contact_person})},{title:"SDT",dataIndex:"phone",key:"phone",render:(n,s)=>e.jsx("div",{children:s.phone})},{title:"Mã số thuế",dataIndex:"tax_id",key:"tax_id",render:(n,s)=>e.jsx("div",{children:s.tax_id})},{title:"Khu vực",dataIndex:"territory",key:"territory",render:(n,s)=>e.jsx("div",{children:s.territory})},{title:"Địa chỉ",dataIndex:"address",key:"address",render:(n,s)=>e.jsx("div",{className:"!w-[175px] truncate hover:whitespace-normal",children:s.address})},{title:"Ngày viếng thăm",dataIndex:"date_checkin",key:"date_checkin",render:(n,s)=>e.jsx("div",{children:s.date_checkin?.split("-")?.reverse()?.toString()?.replaceAll(",","-")})}];function Ye(){const[n,s]=r.useState([]),[m,P]=r.useState(0),y=20,[f]=ye(),[g,_]=r.useState(1),[v,w]=r.useState(""),[V,H]=r.useState([]),[F,N]=r.useState(""),[K,$]=r.useState([]),[X,q]=r.useState("");let C=k(X,500);const[D,T]=r.useState(""),[E,I]=r.useState(""),[W,Q]=r.useState([]),[U,Z]=r.useState("");let R=k(U,500);const[l,z]=r.useState(Ie),[i,Y]=r.useState(Re),[J,ee]=r.useState([]),[L,te]=r.useState(),[se,re]=r.useState("");let M=k(se);const j=r.useRef(null),b=ke(),[ae,ne]=r.useState(0),[oe,le]=r.useState(b?.h*.52),[ie,ce]=r.useState(!1);r.useEffect(()=>{le(b.h*.52)},[b]),r.useEffect(()=>{const t=j.current;if(t){const a=new ResizeObserver(o=>{for(let xe of o)ne(xe.contentRect.height)});return a.observe(t),()=>a.disconnect()}},[j]);const de=t=>{if(t==null)z("");else if(i&&t&&t.isAfter(d.unix(i),"day"))O.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let a=Date.parse(t.$d)/1e3;z(a)}},me=t=>{if(t==null)Y("");else if(l&&t&&t.isBefore(d.unix(l),"day"))O.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let a=Date.parse(t.$d)/1e3;Y(a)}},he=t=>i?t&&t.isAfter(d.unix(i),"day"):!1,ue=t=>l?t&&t.isBefore(d.unix(l),"day"):!1;r.useEffect(()=>{(async()=>{let t=await h.get("/api/method/mbw_dms.api.router.get_team_sale");ee(we({data:t.result.map(a=>({title:a.name,value:a.name,...a})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),r.useEffect(()=>{(async()=>{let t=await h.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:L,key_search:M}}),{message:a}=t;H(a.map(o=>({value:o.sale_name,label:o.sale_name||o.employee_name||o.employee_code})))})()},[L,M]),r.useEffect(()=>{(async()=>{let t=await h.get("/api/method/frappe.desk.search.search_link",{params:{txt:C,doctype:"Customer Group",ignore_user_permissions:0,query:""}}),{message:a}=t;$(a.map(o=>({value:o.value.trim(),label:o.value.trim()})))})()},[C]),r.useEffect(()=>{(async()=>{let t=await h.get("/api/method/frappe.desk.search.search_link",{params:{txt:R,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:a}=t;Q(a.map(o=>({value:o.value,label:o.value})))})()},[R]),r.useEffect(()=>{(async()=>{const t=await h.get("/api/method/mbw_dms.api.report.first_checkin_rp.first_checkin_report",{params:{page_size:y,page_number:g,sales_person:v,customer_group:F,customer_type:D,territory:E,from_date:l,to_date:i}});let{result:a}=t;s(a),P(a?.totals)})()},[g,v,F,D,E,l,i,ie]);const pe=t=>{t.customergroup?N(t.customergroup):N(""),t.customertype?T(t.customertype):T(""),t.territory?I(t.territory):I(""),_(1)};return e.jsx(e.Fragment,{children:e.jsx(ve,{header:e.jsx(fe,{title:"Báo cáo thống kê khách hàng viếng thăm lần đầu",buttons:[{icon:e.jsx(Te,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{ce(t=>!t)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(Ee,{className:"text-xl"}),size:"18px",className:"flex items-center",action:()=>{Fe("/app/data-export/Data%20Export")}}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(S,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(c,{className:"ml-4",children:e.jsxs(S,{gutter:[8,8],children:[e.jsx(c,{span:5,children:e.jsx(G,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:de,defaultValue:A,disabledDate:he})}),e.jsx(c,{span:5,children:e.jsx(G,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:me,placeholder:"Đến ngày",defaultValue:B,disabledDate:ue})}),e.jsx(c,{span:7,children:e.jsx(ge,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:J,onChange:t=>{te(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(c,{span:7,children:e.jsx(u,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{re(t)},options:V,onSelect:t=>{w(t),_(1)},onClear:()=>{w("")}})})]})}),e.jsx(c,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(_e,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(Se,{title:"Bộ lọc",children:[e.jsx("div",{className:"",children:e.jsxs(p,{layout:"vertical",form:f,onFinish:pe,children:[e.jsx(p.Item,{name:"customertype",label:"Loại khách hàng",className:"w-[468px] border-none",children:e.jsx(u,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:De,allowClear:!0,showSearch:!0,placeholder:"Tất cả loại khách hàng"})}),e.jsx(p.Item,{name:"customergroup",label:"Nhóm khách hàng",className:"w-[468px] border-none",children:e.jsx(u,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:K,allowClear:!0,onSearch:t=>{q(t)},showSearch:!0,placeholder:"Tất cả nhóm khách hàng"})}),e.jsx(p.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:e.jsx(u,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:W,allowClear:!0,onSearch:t=>{Z(t)},showSearch:!0,placeholder:"Tất cẩ khu vực"})})]})}),e.jsxs(S,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(x,{className:"mr-3",onClick:t=>{t.preventDefault(),f.resetFields()},children:"Đặt lại"}),e.jsx(x,{type:"primary",onClick:()=>{f.submit()},children:"Áp dụng"})]})]})]}),children:e.jsx(x,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8",icon:e.jsx(Ne,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(x,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(Ce,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:j,className:"pt-5",children:e.jsx(je,{dataSource:n?.data?.map(t=>({...t,key:t.name})),bordered:!0,scroll:{x:3e3,y:ae<400?void 0:oe},pagination:m&&m>y?{pageSize:y,showSizeChanger:!1,total:m,current:g,onChange(t){_(t)}}:!1,columns:ze})})]})})})}function $e(){return e.jsxs(e.Fragment,{children:[e.jsx(be,{children:e.jsx("title",{children:" ReportCheckinFirst"})}),e.jsx(Ye,{})]})}export{$e as default};
