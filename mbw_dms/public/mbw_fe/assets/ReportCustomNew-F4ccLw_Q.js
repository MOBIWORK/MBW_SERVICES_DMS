import{L as e,bE as s,Y as n,a1 as b,R as k,P as N,ab as M,V as l,ad as R}from"./index-Y-ucsyP6.js";import{u as F,C as E}from"./index-ExY6TDth.js";import{a as z,u as f,P as o,R as P,F as G,D as V,m as $}from"./ReportHeader-H_M1lf5J.js";import"./index.esm-28P13q3d.js";import"./data-u-VkVTNg.js";import"./index-WbcQA3c1.js";import"./VerticalAlignBottomOutlined-bKQSSZ0o.js";const A=({summaryData:i})=>e.jsxs(s.Summary.Row,{children:[e.jsx(s.Summary.Cell,{index:0}),e.jsx(s.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(s.Summary.Cell,{index:2}),e.jsx(s.Summary.Cell,{index:3}),e.jsx(s.Summary.Cell,{index:4}),e.jsx(s.Summary.Cell,{index:5}),e.jsx(s.Summary.Cell,{index:6}),e.jsx(s.Summary.Cell,{index:7}),e.jsx(s.Summary.Cell,{index:8}),e.jsx(s.Summary.Cell,{index:9}),e.jsx(s.Summary.Cell,{index:10}),e.jsx(s.Summary.Cell,{index:11}),e.jsx(s.Summary.Cell,{index:12}),e.jsx(s.Summary.Cell,{index:13}),e.jsx(s.Summary.Cell,{index:14}),e.jsx(s.Summary.Cell,{index:15,children:e.jsx("div",{className:"text-right",children:i?.sum_checkin})}),e.jsx(s.Summary.Cell,{index:16}),e.jsx(s.Summary.Cell,{index:17}),e.jsx(s.Summary.Cell,{index:18,children:e.jsx("div",{className:"text-right",children:i?.sum_so})}),e.jsx(s.Summary.Cell,{index:19})]}),H=A;function L(){const i=[{title:"STT",dataIndex:"stt",key:"stt",className:"!text-center",width:60,render:(t,r,a)=>e.jsx("span",{children:T(c,o,a)})},{title:"Mã nhân viên",dataIndex:"sales_person_id",key:"sales_person_id"},{title:"Tên nhân viên",dataIndex:"sales_person",key:"sales_person",width:200},{title:"Nhóm bán hàng",dataIndex:"sales_team",key:"sales_team",width:200,render:(t,r)=>e.jsx("div",{className:"whitespace-normal",children:r.sales_team})},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code",render:(t,r)=>e.jsx("div",{children:r.customer_code})},{title:"Tên khách hàng",dataIndex:"customer_name",key:"customer_name",render:(t,r)=>e.jsx("div",{children:r.customer_name})},{title:"Loại khách hàng",dataIndex:"customer_type",key:"customer_type",render:(t,r)=>e.jsx("div",{children:r.customer_type})},{title:"Nhóm khách hàng",dataIndex:"customer_group",key:"customer_group",width:170,render:(t,r)=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:r.customer_group})},{title:"Người liên hệ",dataIndex:"contact",key:"contact",render:(t,r)=>e.jsx("div",{children:r.contact})},{title:"SDT",dataIndex:"phone",key:"phone",render:(t,r)=>e.jsx("div",{children:r.phone})},{title:"Mã số thuế",dataIndex:"tax_id",key:"tax_id",render:(t,r)=>e.jsx("div",{children:r.tax_id})},{title:"Khu vưc",dataIndex:"territory",key:"territory",render:(t,r)=>e.jsx("div",{children:r.territory})},{title:"Địa chỉ",dataIndex:"address",key:"address",render:(t,r)=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:r.address})},{title:"Ngày thu thập",dataIndex:"creation",key:"creation",render:(t,r)=>e.jsx("div",{children:l(r.creation*1e3).format("DD/MM/YYYY")})},{title:"Nguồn",dataIndex:"f1",key:"f1",className:"!text-center",render:t=>e.jsx("div",{className:"!text-center",children:t||"-"})},{title:e.jsx("div",{className:"!text-right",children:"Số lần VT"}),dataIndex:"totals_checkin",key:"totals_checkin",render:(t,r)=>e.jsx("div",{className:"!text-right",children:r.totals_checkin})},{title:"VT đầu",dataIndex:"first_checkin",key:"first_checkin",render:t=>t?e.jsx("p",{children:l(t*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:"VT cuối",dataIndex:"last_checkin",key:"last_checkin",render:t=>t?e.jsx("p",{children:l(t*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})},{title:e.jsx("div",{className:"!text-right",children:"Số đơn hàng"}),dataIndex:"totals_so",key:"totals_so",render:(t,r)=>e.jsx("div",{className:"!text-right",children:r.totals_so})},{title:"Đơn hàng cuối",dataIndex:"last_sale_order",key:"last_sale_order",render:t=>t?e.jsx("p",{children:l(t*1e3).format("DD/MM/YYYY")}):e.jsx(e.Fragment,{})}],[d,v]=n.useState([]),[m,w]=n.useState(0),[c,u]=n.useState(1),D=F(),[I,Y]=n.useState(!1),x=z(`${$}`),T=(t,r,a)=>(t-1)*r+a+1,{startDate:h,endDate:p}=f(t=>t.date),{sales_team:_,employee:j,customer_type:y,customer_group:g,territory:S,has_sales_order:C}=f(t=>t.group);return n.useEffect(()=>{(async()=>{const t=await b.get("/api/method/mbw_dms.api.report.customer_report.customer_report",{params:{page_size:o,page_number:c,customer_type:y,customer_group:g,territory:S,sales_person:j,sales_team:_,has_sales_order:C,from_date:h,to_date:p}});let{result:r}=t;v({...r,data:r.data?.map(a=>({...a,key:a.cus_id}))}),w(r?.totals_cus)})()},[c,y,g,S,j,C,I,h,p,_]),e.jsx(e.Fragment,{children:e.jsx(E,{header:e.jsx(P,{setRefresh:Y,title:"Báo cáo khách hàng mới",params:{report_type:"Report Customer",data_filter:{customer_type:y,customer_group:g,territory:S,sales_person:j,sales_team:_,has_sales_order:C,startDate:h,endDate:p}},file_name:"Report Customer.xlsx"}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(k,{gutter:[16,16],className:`flex ${x?"justify-end":"justify-between"} items-center w-full`,children:[!x&&e.jsx(N,{className:"ml-4 w-[78%]",children:e.jsx(k,{gutter:[8,8],className:"space-x-4",children:e.jsx(G,{setPage:u,inputFromDate:!0,inputToDate:!0,inputSaleGroup:!0,inputEmployee:!0})})}),e.jsx(N,{className:"!ml-4",children:e.jsx(V,{inputCustomerType:!0,inputCustomerGroup:!0,inputTerritory:!0,inputFromDate:!0,inputToDate:!0,inputSaleGroup:!0,inputEmployee:!0,inputOrder:!0,setPage:u,matchMedia:!x})})]}),e.jsx("div",{className:"pt-5",children:e.jsx(M,{dataSource:d?.data,bordered:!0,columns:i,scroll:{x:3e3,y:d?.data?.length>0?D?.h*.55:void 0},pagination:m&&m>o?{pageSize:o,showSizeChanger:!1,total:m,current:d?.page_number,onChange(t){u(t)}}:!1,summary:()=>e.jsx(H,{summaryData:d?.sum})})})]})})})}function U(){return e.jsxs(e.Fragment,{children:[e.jsx(R,{children:e.jsx("title",{children:" ReportCustomNew"})}),e.jsx(L,{})]})}export{U as default};
