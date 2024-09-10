import{Y as s,aX as Se,a1 as c,L as e,a6 as be,R as C,P as d,a8 as ke,a2 as u,a7 as ve,N as x,Q as y,a9 as we,V as m,aW as A,ab as Fe}from"./index-2HP0RfjX.js";import{D as Ce}from"./index-lLWskibh.js";import{u as De,C as Ne,S as Te}from"./index-OJLSNTfB.js";import{u as p}from"./useDebount-E1S_7vEd.js";import{t as Ee,h as Ie}from"./index-9TORzD_2.js";import{a as Re,b as ze}from"./index.esm-_UqmgvFM.js";import{e as Ye}from"./data-u-VkVTNg.js";import{D as B}from"./index-nR2a4o1l.js";import{V as Le}from"./VerticalAlignBottomOutlined-hKOWhnA6.js";import"./FileSaver.min-nraNywVD.js";const K=m().startOf("month"),P=m().endOf("month");let Ge=Date.parse(K.$d)/1e3,Me=Date.parse(P.$d)/1e3;const Oe=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(n,r,h)=>e.jsx("div",{className:"text-center",children:h+1})},{title:"Nhóm bán hàng",dataIndex:"sales_team",key:"sales_team",render:(n,r)=>e.jsx("div",{children:r.sales_team})},{title:"Mã nhân viên",dataIndex:"employee_id",key:"employee_id",render:(n,r)=>e.jsx("div",{children:r.employee_id})},{title:"Tên nhân viên",dataIndex:"employee_name",key:"employee_name",render:(n,r)=>e.jsx("div",{children:r.employee_name})},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code",render:(n,r)=>e.jsx("div",{children:r.customer_code})},{title:"Tên khách hàng",dataIndex:"customer_name",key:"customer_name",render:(n,r)=>e.jsx("div",{children:r.customer_name})},{title:"Loại khách hàng",dataIndex:"customer_type",key:"customer_type",render:(n,r)=>e.jsx("div",{children:r.customer_type})},{title:"Nhóm khách hàng",dataIndex:"customer_group",key:"customer_group",render:(n,r)=>e.jsx("div",{children:r.customer_group})},{title:"Người liên hệ",dataIndex:"contact_person",key:"contact_person",render:(n,r)=>e.jsx("div",{className:"!w-[175px] truncate hover:whitespace-normal",children:r.contact_person})},{title:"SDT",dataIndex:"phone",key:"phone",render:(n,r)=>e.jsx("div",{children:r.phone})},{title:"Mã số thuế",dataIndex:"tax_id",key:"tax_id",render:(n,r)=>e.jsx("div",{children:r.tax_id})},{title:"Khu vực",dataIndex:"territory",key:"territory",render:(n,r)=>e.jsx("div",{children:r.territory})},{title:"Địa chỉ",dataIndex:"address",key:"address",render:(n,r)=>e.jsx("div",{className:"!w-[175px] truncate hover:whitespace-normal",children:r.address})},{title:"Ngày viếng thăm",dataIndex:"date_checkin",key:"date_checkin",render:(n,r)=>e.jsx("div",{children:r.date_checkin?.split("-")?.reverse()?.toString()?.replaceAll(",","-")})}];function Ae(){const[n,r]=s.useState([]),[h,V]=s.useState(0),f=20,[_]=Se(),[g,j]=s.useState(1),[Be,H]=s.useState([]),[D,Ke]=s.useState(""),[$,Pe]=s.useState("");let N=p($,500);const[S,T]=s.useState(""),[q,X]=s.useState([]),[W,Ve]=s.useState("");p(W,500);const[b,E]=s.useState(""),[Q,Z]=s.useState([]),[J,U]=s.useState("");let I=p(J,500);const[k,R]=s.useState(""),[v,z]=s.useState(""),[ee,te]=s.useState([]),[se,re]=s.useState("");let Y=p(se,500);const[l,L]=s.useState(Ge),[i,G]=s.useState(Me),[ae,ne]=s.useState([]),[M,oe]=s.useState(),[le,ie]=s.useState("");let O=p(le);const w=s.useRef(null),F=De(),[ce,de]=s.useState(0),[me,he]=s.useState(F?.h*.52),[pe,ue]=s.useState(!1);s.useEffect(()=>{he(F.h*.52)},[F]),s.useEffect(()=>{const t=w.current;if(t){const a=new ResizeObserver(o=>{for(let je of o)de(je.contentRect.height)});return a.observe(t),()=>a.disconnect()}},[w]);const xe=t=>{if(t==null)L("");else if(i&&t&&t.isAfter(m.unix(i),"day"))A.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let a=Date.parse(t.$d)/1e3;L(a)}},ye=t=>{if(t==null)G("");else if(l&&t&&t.isBefore(m.unix(l),"day"))A.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let a=Date.parse(t.$d)/1e3;G(a)}},fe=t=>i?t&&t.isAfter(m.unix(i),"day"):!1,_e=t=>l?t&&t.isBefore(m.unix(l),"day"):!1;s.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:N,doctype:"Department",ignore_user_permissions:0,query:""}}),{message:a}=t;console.log("Customer Group",a),H(a.map(o=>({value:o.value.trim(),label:o.value.trim()})))})()},[N]),s.useEffect(()=>{(async()=>{let t=await c.get("/api/method/mbw_dms.api.router.get_team_sale");ne(Ee({data:t.result.map(a=>({title:a.name,value:a.name,...a})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),s.useEffect(()=>{(async()=>{let t=await c.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:M,key_search:O}}),{message:a}=t;X(a.map(o=>({value:o.employee_code,label:o.employee_name||o.employee_code})))})()},[M,O]),s.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:I,doctype:"Customer Group",ignore_user_permissions:0,query:""}}),{message:a}=t;Z(a.map(o=>({value:o.value.trim(),label:o.value.trim()})))})()},[I]),s.useEffect(()=>{(async()=>{let t=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:Y,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:a}=t;te(a.map(o=>({value:o.value,label:o.value})))})()},[Y]),s.useEffect(()=>{(async()=>{const t=await c.get("/api/method/mbw_dms.api.report.first_checkin_rp.first_checkin_report",{params:{page_size:f,page_number:g,department:D,employee:S,customer_group:b,customer_type:k,territory:v,from_date:l,to_date:i}});let{result:a}=t;console.log("dt",a),r(a),V(a?.totals)})()},[g,D,S,b,k,v,l,i,pe]);const ge=t=>{t.customergroup?E(t.customergroup):E(""),t.customertype?R(t.customertype):R(""),t.territory?z(t.territory):z(""),j(1)};return e.jsx(e.Fragment,{children:e.jsx(Ne,{header:e.jsx(be,{title:"Báo cáo thống kê khách hàng viếng thăm lần đầu",buttons:[{icon:e.jsx(Te,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{ue(t=>!t)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(Le,{className:"text-xl"}),size:"18px",className:"flex items-center",action:Ie.bind(null,{url:"/api/method/mbw_dms.api.exports.export_excel.export_excel",params:{report_type:"Report Customer Checkin",data_filter:{sales_person:S,customer_group:b,customer_type:k,territory:v,from_date:l,to_date:i}},file_name:"Report Customer Checkin.xlsx"})}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(C,{gutter:[16,16],className:"justify-between items-end w-full",children:[e.jsx(d,{className:"ml-4",children:e.jsxs(C,{gutter:[8,8],children:[e.jsx(d,{span:5,children:e.jsx(B,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:xe,defaultValue:K,disabledDate:fe})}),e.jsx(d,{span:5,children:e.jsx(B,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:ye,placeholder:"Đến ngày",defaultValue:P,disabledDate:_e})}),e.jsx(d,{span:7,children:e.jsx(ke,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:ae,onChange:t=>{oe(t)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(d,{span:7,children:e.jsx(u,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{ie(t)},options:q,onSelect:t=>{T(t),j(1)},onClear:()=>{T("")}})})]})}),e.jsx(d,{className:"!ml-4",children:e.jsx("div",{className:"flex flex-wrap items-center",children:e.jsxs("div",{className:"flex justify-center items-center mr-4",children:[e.jsx(ve,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(Ce,{title:"Bộ lọc",children:[e.jsx("div",{className:"",children:e.jsxs(x,{layout:"vertical",form:_,onFinish:ge,children:[e.jsx(x.Item,{name:"customertype",label:"Loại khách hàng",className:"w-[468px] border-none",children:e.jsx(u,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Ye,allowClear:!0,showSearch:!0,placeholder:"Tất cả loại khách hàng"})}),e.jsx(x.Item,{name:"customergroup",label:"Nhóm khách hàng",className:"w-[468px] border-none",children:e.jsx(u,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Q,allowClear:!0,onSearch:t=>{U(t)},showSearch:!0,placeholder:"Tất cả nhóm khách hàng"})}),e.jsx(x.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:e.jsx(u,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:ee,allowClear:!0,onSearch:t=>{re(t)},showSearch:!0,placeholder:"Tất cẩ khu vực"})})]})}),e.jsxs(C,{className:"justify-between pt-6 pb-4",children:[e.jsx("div",{}),e.jsxs("div",{children:[e.jsx(y,{className:"mr-3",onClick:t=>{t.preventDefault(),_.resetFields()},children:"Đặt lại"}),e.jsx(y,{type:"primary",onClick:()=>{_.submit()},children:"Áp dụng"})]})]})]}),children:e.jsx(y,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8",icon:e.jsx(Re,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),e.jsx(y,{className:"border-l-[0.1px] rounded-l-none !h-8",children:e.jsx(ze,{style:{fontSize:"20px"}})})]})})})]}),e.jsx("div",{ref:w,className:"pt-5",children:e.jsx(we,{dataSource:n?.data?.map(t=>({...t,key:t.name})),bordered:!0,scroll:{x:3e3,y:ce<400?void 0:me},pagination:h&&h>f?{pageSize:f,showSizeChanger:!1,total:h,current:g,onChange(t){j(t)}}:!1,columns:Oe})})]})})})}function tt(){return e.jsxs(e.Fragment,{children:[e.jsx(Fe,{children:e.jsx("title",{children:" ReportCheckinFirst"})}),e.jsx(Ae,{})]})}export{tt as default};
