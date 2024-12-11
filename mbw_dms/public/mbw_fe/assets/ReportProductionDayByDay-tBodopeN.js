import{Y as n,bw as y,a2 as v,L as e,R as I,P as w,ac as P,bx as s,by as T,ae as z}from"./index-E40HVbfZ.js";import"https://cdn.jsdelivr.net/npm/nats.ws@1.29.2/+esm";import{C as O}from"./index-OzPQMM2e.js";import{R as G,F as $}from"./ReportHeader-X3w6UjQ0.js";import{a as A,b as H,u as D,P as _}from"./useMediaQuery-bDDfLuFG.js";import{D as M}from"./dropDownFilter-ouKOAKME.js";import{u as Q}from"./index-f3lyoCrI.js";import"./VerticalAlignBottomOutlined-VVHVyquw.js";import"./index.esm-kaMGh6ns.js";import"./data-u-VkVTNg.js";import"./index-kmDtfIGN.js";const L=()=>{const[p,N]=n.useState(0),[S,E]=n.useState(0),[x,m]=n.useState(1),[C,B]=n.useState(!1),[f,R]=n.useState({data:[]}),h=A(`${H}`),W=Q(),{startDate:l,endDate:i}=D(t=>t.date),{sales_team:g,brand:j,industry:b,supplier:F}=D(t=>t.group),[u,k]=n.useState(y(l,i));return n.useEffect(()=>{k(y(l,i)),(()=>{let t=0;u.forEach(a=>{a.dayOfWeek==="Chủ nhật"&&t++}),E(t)})()},[l,i]),n.useEffect(()=>{(async()=>{const t=await v.get("/api/method/mbw_dms.api.report.prod_dbd.report_prod_dbd",{params:{page_size:_,page_number:x,sales_team:g,industry:b,brand:j,supplier:F,from_date:l,to_date:i}});let{result:a}=t;const r=y(l,i);R({...a,data:a.data.map(d=>(r.forEach(o=>{let c=d.total_qty_by_day[o.date]||0;d[o.date]={dateW:c,...o}}),delete d.total_qty_by_day,d.children.map(o=>{r.forEach(c=>{let q=o.total_qty_by_day[c.date]||0;o[c.date]={dateW:q,...c}})}),d))}),N(a?.totals)})()},[x,C,g,b,j,F,l,i]),e.jsx(e.Fragment,{children:e.jsxs(O,{header:e.jsx(G,{setRefresh:B,title:"Báo cáo theo dõi sản lượng trong ngày từng thị trường ",params:{},file_name:"Report Sell.xlsx"}),children:[e.jsx("div",{className:"bg-white rounded-2xl pt-4 pb-7  border-[#DFE3E8] border-[0.2px] border-solid",children:e.jsx(I,{gutter:[16,16],className:`flex ${h?"justify-start":"justify-between"} items-center w-full`,children:h?e.jsx(w,{className:"ml-4 w-[78%]",children:e.jsx("div",{className:"flex ",children:e.jsx($,{setPage:m,inputFromDate:!0,inputToDate:!0,inputSaleGroup:!0,inputSupplier:!0,inputIndustry:!0,inpitBrand:!0})})}):e.jsx(w,{className:"!ml-4",children:e.jsx(M,{inputSupplier:!0,inputIndustry:!0,inputBrand:!0,inputFromDate:!0,inputToDate:!0,inputSaleGroup:!0,setPage:m,matchMedia:h})})})}),e.jsx("div",{className:"pt-5",children:e.jsxs(P,{dataSource:f?.data?.map(t=>({...t,key:t.group_name})),bordered:!0,$border:!0,scroll:{x:!0,y:f?.data?.length>0?W?.h*.55:void 0},pagination:p&&p>_?{pageSize:_,showSizeChanger:!1,total:p,current:x,onChange(t){m(t)}}:!1,children:[e.jsx(s,{title:"STT",dataIndex:"stt",fixed:"left",width:60,render:(t,a,r)=>a.group_name!==void 0?r+1:""},"stt"),e.jsx(s,{title:()=>e.jsx("p",{className:"min-w-[120px]",children:"Thị trường /nhân viên"}),className:"min-w-[180px]",dataIndex:"group_name",fixed:"left",render:(t,a)=>t??a.sales_person},"group_name"),u.length>0&&u.map(t=>e.jsx(T,{title:t.date,className:"!w-full !text-center !p-2 ",children:e.jsx(s,{className:"!text-center !whitespace-nowrap !min-w-[100px] !p-2 ",title:t.dayOfWeek,dataIndex:t.date,render:(a,r)=>a?.dayOfWeek==="Chủ nhật"?e.jsx("div",{className:" !h-14 !text-center flex justify-center items-center",children:"OFF"}):a?.dateW?e.jsx("div",{className:" !h-14 !text-center flex justify-center items-center",children:a?.dateW}):r?.dateW?e.jsx("div",{className:" !h-14 !text-center flex justify-center items-center",children:r?.dateW}):e.jsx("div",{className:" !h-14 !text-center flex justify-center items-center text-gray-400/80",children:"-"})},t.dayOfWeek)},t.date)),e.jsx(s,{title:"Tổng cộng",className:"min-w-[100px]  text-center !bg-[#FFF8EB]",dataIndex:"total_qty_by_month_all",fixed:"right",render:(t,a)=>e.jsx(e.Fragment,{children:t??a.total_qty_by_month})},"total_qty_by_month_all"),e.jsx(s,{title:()=>e.jsx("p",{className:"whitespace-pre-line text-clip text-center",children:"Bình quân/ngày"}),className:"min-w-[110px]  text-center text-wrap !bg-[#FFF8EB]",dataIndex:"total_qty_by_month_all",fixed:"right",render:(t,a)=>{const r=u.length-S;return e.jsx(e.Fragment,{children:t!=null?(t/r).toFixed(2):(a.total_qty_by_month/r).toFixed(2)})}},"total_qty_by_month_all"),e.jsx(s,{title:()=>e.jsx("p",{className:"whitespace-pre-line text-clip text-center",children:"Chỉ tiêu tháng"}),className:"min-w-[90px] text-center !bg-[#FFF8EB]",dataIndex:"total_kpi_month",fixed:"right",render:(t,a)=>e.jsx(e.Fragment,{children:t??a.kpi_san_luong})},"total_kpi_month"),e.jsx(s,{title:()=>e.jsx("p",{className:"whitespace-pre-line text-clip text-center",children:"Còn lại trong tháng"}),className:"min-w-[100px] text-center !bg-[#FFF8EB]",dataIndex:"total_rest_all",fixed:"right",render:(t,a)=>e.jsx(e.Fragment,{children:t??a.the_rest})},"total_rest_all")]})})]})})},Y=L;function se(){return e.jsxs(e.Fragment,{children:[e.jsx(z,{children:e.jsx("title",{children:" ReportProductionDayByDay"})}),e.jsx(Y,{})]})}export{se as default};
