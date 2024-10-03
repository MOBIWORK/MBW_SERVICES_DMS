import{Y as r,a_ as _e,a1 as c,a6 as ge,L as t,a7 as je,bD as be,R as v,P as l,aa as ke,a2 as m,a9 as Se,N as u,Q as p,ab as ve,V as i,aZ as M,ad as we}from"./index-S4dKpla8.js";import{D as Fe}from"./index-ryqYx8Xn.js";import{u as Ce,C as Ne}from"./index-HqUyU1Gq.js";import{u as w}from"./useDebount-RDU6oqXW.js";import{a as De,b as Te}from"./index.esm-ndB1PoYR.js";import{e as Ee}from"./data-u-VkVTNg.js";import{D as L}from"./index-H3g8xWlR.js";import{S as Ie}from"./SyncOutlined-giRReh2o.js";import{V as Re}from"./VerticalAlignBottomOutlined-Zk3bdNqz.js";const O=i().startOf("month"),G=i().endOf("month");let ze=Date.parse(O.$d)/1e3,Ye=Date.parse(G.$d)/1e3;function Me(){const A=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(e,s,a)=>t.jsx("span",{children:he(h,d,a)})},{title:"Nhóm bán hàng",dataIndex:"sales_team",key:"sales_team",render:(e,s)=>t.jsx("div",{children:s.sales_team})},{title:"Mã nhân viên",dataIndex:"employee_id",key:"employee_id",render:(e,s)=>t.jsx("div",{children:s.employee_id})},{title:"Tên nhân viên",dataIndex:"sales_person",key:"sales_person",render:(e,s)=>t.jsx("div",{children:s.sales_person})},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code",render:(e,s)=>t.jsx("div",{children:s.customer_code})},{title:"Tên khách hàng",dataIndex:"customer_name",key:"customer_name",render:(e,s)=>t.jsx("div",{children:s.customer_name})},{title:"Loại hình khách hàng",dataIndex:"customer_type",key:"customer_type",render:(e,s)=>t.jsx("div",{children:s.customer_type})},{title:"Nhóm khách hàng",dataIndex:"customer_group",key:"customer_group",render:(e,s)=>t.jsx("div",{children:s.customer_group})},{title:"Người liên hệ",dataIndex:"contact_person",key:"contact_person",render:(e,s)=>t.jsx("div",{className:"!w-[175px] truncate hover:whitespace-normal",children:s.contact_person})},{title:"SDT",dataIndex:"phone",key:"phone",render:(e,s)=>t.jsx("div",{children:s.phone})},{title:"Mã số thuế",dataIndex:"tax_id",key:"tax_id",render:(e,s)=>t.jsx("div",{children:s.tax_id})},{title:"Khu vực",dataIndex:"territory",key:"territory",render:(e,s)=>t.jsx("div",{children:s.territory})},{title:"Địa chỉ",dataIndex:"address",key:"address",render:(e,s)=>t.jsx("div",{className:"!w-[175px] truncate hover:whitespace-normal",children:s.address})},{title:"Ngày viếng thăm",dataIndex:"date_checkin",key:"date_checkin",render:(e,s)=>t.jsx("div",{children:s.date_checkin?.split("-")?.reverse()?.toString()?.replaceAll(",","-")})}],[B,P]=r.useState([]),[x,V]=r.useState(0),d=20,[y]=_e(),[h,f]=r.useState(1),[_,F]=r.useState(""),[H,K]=r.useState([]),[g,C]=r.useState(""),[$,q]=r.useState([]),[X,Z]=r.useState("");let N=w(X,500);const[j,D]=r.useState(""),[b,T]=r.useState(""),[Q,W]=r.useState([]),[J,U]=r.useState("");let E=w(J,500);const[n,I]=r.useState(ze),[o,R]=r.useState(Ye),[ee,te]=r.useState([]),[z,se]=r.useState(),[re,ae]=r.useState("");let Y=w(re);const k=r.useRef(null),S=Ce(),[ne,oe]=r.useState(0),[le,ie]=r.useState(S?.h*.52),[ce,de]=r.useState(!1),he=(e,s,a)=>(e-1)*s+a+1;r.useEffect(()=>{ie(S.h*.52)},[S]),r.useEffect(()=>{const e=k.current;if(e){const s=new ResizeObserver(a=>{for(let fe of a)oe(fe.contentRect.height)});return s.observe(e),()=>s.disconnect()}},[k]);const me=e=>{if(e==null)I("");else if(o&&e&&e.isAfter(i.unix(o),"day"))M.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");else{let s=Date.parse(e.$d)/1e3;I(s)}},ue=e=>{if(e==null)R("");else if(n&&e&&e.isBefore(i.unix(n),"day"))M.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let s=Date.parse(e.$d)/1e3;R(s)}},pe=e=>o?e&&e.isAfter(i.unix(o),"day"):!1,xe=e=>n?e&&e.isBefore(i.unix(n),"day"):!1;r.useEffect(()=>{(async()=>{let e=await c.get("/api/method/mbw_dms.api.router.get_team_sale");te(ge({data:e.result.map(s=>({title:s.name,value:s.name,...s})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),r.useEffect(()=>{(async()=>{let e=await c.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:z,key_search:Y}}),{message:s}=e;K(s.map(a=>({value:a.sale_name,label:a.sale_name||a.employee_name||a.employee_code})))})()},[z,Y]),r.useEffect(()=>{(async()=>{let e=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:N,doctype:"Customer Group",ignore_user_permissions:0,query:""}}),{message:s}=e;q(s.map(a=>({value:a.value.trim(),label:a.value.trim()})))})()},[N]),r.useEffect(()=>{(async()=>{let e=await c.get("/api/method/frappe.desk.search.search_link",{params:{txt:E,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:s}=e;W(s.map(a=>({value:a.value,label:a.value})))})()},[E]),r.useEffect(()=>{(async()=>{const e=await c.get("/api/method/mbw_dms.api.report.first_checkin_rp.first_checkin_report",{params:{page_size:d,page_number:h,sales_person:_,customer_group:g,customer_type:j,territory:b,from_date:n,to_date:o}});let{result:s}=e;P(s),V(s?.totals)})()},[h,_,g,j,b,n,o,ce]);const ye=e=>{e.customergroup?C(e.customergroup):C(""),e.customertype?D(e.customertype):D(""),e.territory?T(e.territory):T(""),f(1)};return t.jsx(t.Fragment,{children:t.jsx(Ne,{header:t.jsx(je,{title:"Báo cáo thống kê khách hàng viếng thăm lần đầu",buttons:[{icon:t.jsx(Ie,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{de(e=>!e)}},{label:"Xuất dữ liệu",type:"primary",icon:t.jsx(Re,{className:"text-xl"}),size:"18px",className:"flex items-center",action:be.bind(null,{url:"/api/method/mbw_dms.api.exports.export_excel.export_excel",params:{report_type:"Report Customer Checkin",data_filter:{sales_person:_,customer_group:g,customer_type:j,territory:b,from_date:n,to_date:o}},file_name:"Report Customer Checkin.xlsx"})}]}),children:t.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[t.jsxs(v,{gutter:[16,16],className:"justify-between items-end w-full",children:[t.jsx(l,{className:"ml-4",children:t.jsxs(v,{gutter:[8,8],children:[t.jsx(l,{span:5,children:t.jsx(L,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:me,defaultValue:O,disabledDate:pe})}),t.jsx(l,{span:5,children:t.jsx(L,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:ue,placeholder:"Đến ngày",defaultValue:G,disabledDate:xe})}),t.jsx(l,{span:7,children:t.jsx(ke,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:ee,onChange:e=>{se(e)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),t.jsx(l,{span:7,children:t.jsx(m,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:e=>{ae(e)},options:H,onSelect:e=>{F(e),f(1)},onClear:()=>{F("")}})})]})}),t.jsx(l,{className:"!ml-4",children:t.jsx("div",{className:"flex flex-wrap items-center",children:t.jsxs("div",{className:"flex justify-center items-center mr-4",children:[t.jsx(Se,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>t.jsxs(Fe,{title:"Bộ lọc",children:[t.jsx("div",{className:"",children:t.jsxs(u,{layout:"vertical",form:y,onFinish:ye,children:[t.jsx(u.Item,{name:"customertype",label:"Loại hình khách hàng",className:"w-[468px] border-none",children:t.jsx(m,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Ee,allowClear:!0,showSearch:!0,placeholder:"Tất cả loại hình khách hàng"})}),t.jsx(u.Item,{name:"customergroup",label:"Nhóm khách hàng",className:"w-[468px] border-none",children:t.jsx(m,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:$,allowClear:!0,onSearch:e=>{Z(e)},showSearch:!0,placeholder:"Tất cả nhóm khách hàng"})}),t.jsx(u.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:t.jsx(m,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Q,allowClear:!0,onSearch:e=>{U(e)},showSearch:!0,placeholder:"Tất cẩ khu vực"})})]})}),t.jsxs(v,{className:"justify-between pt-6 pb-4",children:[t.jsx("div",{}),t.jsxs("div",{children:[t.jsx(p,{className:"mr-3",onClick:e=>{e.preventDefault(),y.resetFields()},children:"Đặt lại"}),t.jsx(p,{type:"primary",onClick:()=>{y.submit()},children:"Áp dụng"})]})]})]}),children:t.jsx(p,{onClick:e=>e.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8",icon:t.jsx(De,{style:{fontSize:"20px"}}),children:"Bộ lọc"})}),t.jsx(p,{className:"border-l-[0.1px] rounded-l-none !h-8",children:t.jsx(Te,{style:{fontSize:"20px"}})})]})})})]}),t.jsx("div",{ref:k,className:"pt-5",children:t.jsx(ve,{dataSource:B?.data?.map(e=>({...e,key:e.name})),bordered:!0,scroll:{x:3e3,y:ne<400?void 0:le},pagination:x&&x>d?{pageSize:d,showSizeChanger:!1,total:x,current:h,onChange(e){f(e)}}:!1,columns:A})})]})})})}function $e(){return t.jsxs(t.Fragment,{children:[t.jsx(we,{children:t.jsx("title",{children:" ReportCheckinFirst"})}),t.jsx(Me,{})]})}export{$e as default};
