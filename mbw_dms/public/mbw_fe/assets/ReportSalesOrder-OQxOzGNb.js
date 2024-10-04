import{L as e,bE as r,Y as l,a1 as T,R as f,P as I,ab as R,V as E,ad as D}from"./index-pVRgQlSI.js";import{u as V,C as M}from"./index-yNyCumgV.js";import{a as Y,u as b,P as N,R as z,F as P,D as A,m as K}from"./ReportHeader-Ylj3y_v2.js";import"./index.esm-U9mZVXec.js";import"./data-u-VkVTNg.js";import"./index-qv0_LQhA.js";import"./VerticalAlignBottomOutlined-iHMVvG4d.js";const O=({SummaryData:a})=>e.jsxs(r.Summary.Row,{children:[e.jsx(r.Summary.Cell,{index:0,className:"!border-r-0"}),e.jsx(r.Summary.Cell,{index:1}),e.jsx(r.Summary.Cell,{index:2,children:"Tổng"}),e.jsx(r.Summary.Cell,{index:3}),e.jsx(r.Summary.Cell,{index:5}),e.jsx(r.Summary.Cell,{index:6}),e.jsx(r.Summary.Cell,{index:7}),e.jsx(r.Summary.Cell,{index:8,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(a?.sum_total||0)})}),e.jsx(r.Summary.Cell,{index:9,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(a?.sum_vat||0)})}),e.jsx(r.Summary.Cell,{index:10,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(a?.sum_discount_amount||0)})}),e.jsx(r.Summary.Cell,{index:11,children:e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(a?.sum_grand_total||0)})})]}),$=O,q=[{title:e.jsx("div",{className:"relative",children:e.jsx("span",{className:"absolute -top-[11px] -left-8",children:"STT"})}),dataIndex:"stt",key:"stt",width:60,render:(a,t,d)=>d+1},{title:"Đơn đặt",dataIndex:"name",key:"name",width:100,render:(a,t)=>e.jsx("a",{className:"text-[#212B36]",href:`/app/sales-invoice/${t.name}`,target:"_blank",children:t.name})},{title:"Khách hàng",dataIndex:"customer",key:"customer",width:120,render:(a,t)=>e.jsx("div",{children:t.customer})},{title:"Khu vực",dataIndex:"territory",key:"territory",width:120,render:(a,t)=>e.jsx("div",{children:t.territory})},{title:"Ngày tạo",dataIndex:"posting_date",key:"posting_date",width:120,render:(a,t)=>e.jsx("div",{children:E(t.posting_date*1e3).format("DD/MM/YYYY")})},{title:"Nhân viên",dataIndex:"sales_person",key:"sales_person",width:120,render:(a,t)=>e.jsx("div",{children:t.sales_person})},{title:e.jsx("div",{className:"text-right",children:"Thành tiền (VNĐ)"}),dataIndex:"total",key:"total",width:140,render:(a,t)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(t.total)})},{title:e.jsx("div",{className:"text-right",children:"Tiền VAT (VNĐ)"}),dataIndex:"tax_amount",key:"tax_amount",width:140,render:(a,t)=>e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(t.tax_amount)})},{title:e.jsx("div",{className:"text-right",children:"Chiết khấu (VNĐ)"}),dataIndex:"discount_amount",key:"discount_amount",width:160,render:(a,t)=>e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(t.discount_amount)})},{title:e.jsx("div",{className:"text-right",children:"Tổng tiền (VNĐ)"}),width:160,dataIndex:"grand_total",key:"grand_total",render:(a,t)=>e.jsx("div",{className:"text-right",children:Intl.NumberFormat().format(t.grand_total)})}];function G(){const[a,t]=l.useState([]),[d,S]=l.useState(0),[o,c]=l.useState(1),v=V(),[k,w]=l.useState(!1),x=Y(`${K}`),C=s=>{const m=[{title:e.jsx("div",{className:"text-center",children:"STT"}),dataIndex:"stt",key:"stt",render:(i,n,F)=>e.jsx("div",{className:"text-center",children:F+1})},{title:"Mã sản phẩm",dataIndex:"item_code",key:"item_code"},{title:"Tên sản phẩm",dataIndex:"item_name",key:"item_name"},{title:"Nhóm sản phẩm",dataIndex:"item_group",key:"item_group"},{title:"Nhãn hàng",dataIndex:"brand",key:"brand"},{title:"Kho",dataIndex:"warehouse",key:"warehouse"},{title:e.jsx("div",{className:"text-right",children:"Đơn giá"}),dataIndex:"rate",key:"rate",render:(i,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.rate)})},{title:"Đơn vị tính",dataIndex:"uom",key:"uom"},{title:e.jsx("div",{className:"text-right",children:"Số lượng"}),dataIndex:"qty",key:"qty",render:(i,n)=>e.jsx("div",{className:"!text-right",children:n.qty})},{title:e.jsx("div",{className:"text-right",children:"Chiết khấu (%)"}),dataIndex:"discount_percentage",key:"discount_percentage",render:(i,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.discount_percentage)})},{title:e.jsx("div",{className:"text-right",children:"Tiền chiết khấu (VNĐ)"}),dataIndex:"discount_amount",key:"discount_amount",render:(i,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.discount_amount)})},{title:e.jsx("div",{className:"text-right",children:"Tiền VAT (VNĐ)"}),dataIndex:"money_vat",key:"money_vat",render:(i,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.money_vat)})},{title:e.jsx("div",{className:"text-right",children:"Tổng tiền (VNĐ)"}),dataIndex:"amount",key:"amount",render:(i,n)=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(n.amount)})}];return e.jsx(r,{bordered:!0,columns:m,dataSource:s.items.map(i=>({...i,key:i.item_code})),pagination:!1})},{startDate:u,endDate:h}=b(s=>s.date),{employee:p,territory:_,company:j,customer:g,warehouse:y}=b(s=>s.group);return l.useEffect(()=>{(async()=>{const s=await T.get("/api/method/mbw_dms.api.report.so_report.si_report",{params:{page_size:N,page_number:o,company:j,territory:_,customer:g,from_date:u,to_date:h,warehouse:y,sales_person:p}});let{result:m}=s;t(m),S(m?.totals)})()},[o,j,_,g,u,h,y,p,k]),e.jsx(e.Fragment,{children:e.jsx(M,{header:e.jsx(z,{setRefresh:w,title:"Báo cáo tổng hợp bán hàng",params:{report_type:"Report Sell",data_filter:{company:j,territory:_,customer:g,from_date:u,to_date:h,warehouse:y,sales_person:p}},file_name:"Report Sell.xlsx"}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(f,{gutter:[16,16],className:`flex ${x?"justify-end":"justify-between"} items-center w-full`,children:[!x&&e.jsx(I,{className:"ml-4 w-[78%]",children:e.jsx(f,{className:"space-x-4",children:e.jsx(P,{setPage:c,inputMonth:!0,inputYear:!0,inputSaleGroup:!0,inputEmployee:!0})})}),e.jsx(I,{className:"!ml-4 ",children:e.jsx(A,{setPage:c,inputMonth:!0,inputYear:!0,inputSaleGroup:!0,inputEmployee:!0,inputCompany:!0,inputCustomer:!0,inputTerritory:!0,inputWarehouse:!0,matchMedia:!x})})]}),e.jsx("div",{className:"pt-5",children:e.jsx(R,{dataSource:a?.data?.map(s=>({...s,key:s.name})),expandable:{expandedRowRender:C,defaultExpandedRowKeys:["0"]},bordered:!0,$border:!0,columns:q,scroll:{x:a?.data?.length>0||v?.w<1400?!0:void 0,y:a?.data?.length>0?v?.h*.55:void 0},pagination:d&&d>N?{pageSize:N,showSizeChanger:!1,total:d,current:o,onChange(s){c(s)}}:!1,summary:()=>e.jsx($,{summaryData:a?.sum})})})]})})})}function U(){return e.jsxs(e.Fragment,{children:[e.jsx(D,{children:e.jsx("title",{children:" ReportSalesOrder"})}),e.jsx(G,{})]})}export{U as default};
