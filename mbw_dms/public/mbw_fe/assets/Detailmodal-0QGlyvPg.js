import{Y as s,a1 as g,L as e,ab as h,V as c}from"./index-xC06qkrg.js";import"https://cdn.jsdelivr.net/npm/nats.ws@1.29.2/+esm";const p=[{title:"Thời gian",dataIndex:"creation",key:"creation",render:t=>e.jsxs(e.Fragment,{children:[e.jsx("div",{children:c(t).format("HH:mm:ss")}),e.jsx("div",{children:c(t).format("DD/MM/YYYY")})]})},{title:"Loại ghi chú",dataIndex:"title",key:"title"},{title:"Nội dung",dataIndex:"content",key:"content",render:t=>e.jsx("div",{className:"whitespace-normal",children:t})}];function f(t){const[d,l]=s.useState([]),[n,m]=s.useState(0),i=20,[r,u]=s.useState(1);return s.useEffect(()=>{(async()=>{const a=await g.get("/api/method/mbw_dms.api.note.list_note",{params:{custom_checkin_id:t?.id,page_size:i,page_number:r}});let{result:o}=a;m(o?.totals),l(o)})()},[t,r]),e.jsx(e.Fragment,{children:e.jsx(h,{bordered:!0,$border:!0,dataSource:d?.data?.map(a=>({key:a.name,...a})),pagination:n&&n>i?{pageSize:i,showSizeChanger:!1,total:n,current:r,onChange(a){u(a)}}:!1,columns:p})})}export{f as D};
