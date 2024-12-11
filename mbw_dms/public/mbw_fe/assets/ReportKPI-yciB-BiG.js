import{Y as l,V as g,a2 as M,ag as O,L as e,ac as N,a$ as x,R as B,P as G,ae as te}from"./index-Nr-aOhNl.js";import{C as ne}from"./index-wGim9TZp.js";import{R as ae,F as se}from"./ReportHeader-HnfgwXnF.js";import{u as re}from"./index-bewdzdiQ.js";import{u as A,a as le,P as D,m as ie}from"./useMediaQuery-iwLaZ1FU.js";import{D as de}from"./dropDownFilter-5GaKSbuj.js";import{M as oe}from"./ModalCheckin--bu6XfYn.js";import"./VerticalAlignBottomOutlined-gvY3yypE.js";import"./index.esm-xzfmr6j7.js";import"./data-u-VkVTNg.js";import"./index-tK5S8JnW.js";function ce({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"groupIndex",key:"index",width:60,render:(t,n)=>t},{title:"Mã khách hàng",dataIndex:"kh_ma",key:"kh_ma"},{title:"Khách hàng",dataIndex:"kh_ten",key:"kh_ten",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.kh_ten}`,target:"_blank",children:n.kh_ten})})},{title:"Địa chỉ",dataIndex:"kh_diachi",key:"kh_diachi",render:t=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:t})},{title:"Ngày viếng thăm",dataIndex:"checkin_giovao",key:"checkin_giovao",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g(t).format("DD/MM/YYYY")})})},{title:"Thời gian checkin",dataIndex:"checkin_giovao",key:"checkin_giovao",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g(t).format("HH:mm")})})},{title:"Khoảng cách",dataIndex:"checkin_khoangcach",key:"checkin_khoangcach",render:t=>e.jsx("div",{children:parseFloat((t/60).toFixed(2))})}],[r,p]=l.useState(1),d=20,[h,k]=l.useState(0),[_,S]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix();l.useEffect(()=>()=>{p(1)},[s]),l.useEffect(()=>{(async()=>{const t=await M.get("/api/method/mbw_dms.api.report.kpi.kpi_visit_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;k(n?.totals),S(i=>r===1?n.data:[...i,...n.data])})()},[j,f,s,r]);const w=O.useMemo(()=>{let t=null,n=null,i=0;return _.map(C=>{const F=new Date(C.checkin_giovao).toLocaleDateString("vi-VN");return C.kh_ma!==t||F!==n?(t=C.kh_ma,n=F,i++,{...C,groupIndex:i}):{...C,groupIndex:null}})},[_]);return console.log(w),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:w,pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function he({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"groupIndex",key:"index",width:60,render:(t,n)=>t},{title:"Mã khách hàng",dataIndex:"kh_ma",key:"kh_ma"},{title:"Khách hàng",dataIndex:"kh_ten",key:"kh_ten",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.kh_ten}`,target:"_blank",children:n.kh_ten})})},{title:"Địa chỉ",dataIndex:"kh_diachi",key:"kh_diachi",render:t=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:t})},{title:"Ngày viếng thăm",dataIndex:"checkin_giovao",key:"checkin_giovao",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g(t).format("DD/MM/YYYY")})})},{title:"Thời gian checkin",dataIndex:"checkin_giovao",key:"checkin_giovao",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g(t).format("HH:mm")})})},{title:"Khoảng cách",dataIndex:"checkin_khoangcach",key:"checkin_khoangcach",render:t=>e.jsx("div",{children:parseFloat((t/60).toFixed(2))})}],[r,p]=l.useState(1),d=20,[h,k]=l.useState(0),[_,S]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix();l.useEffect(()=>()=>{p(1)},[s]),l.useEffect(()=>{(async()=>{const t=await M.get("/api/method/mbw_dms.api.report.kpi.kpi_only_visit_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}}),{result:n}=t;k(n?.totals),S(i=>r===1?n.data:[...i,...n.data])})()},[j,f,s,r]);const w=O.useMemo(()=>{let t=null,n=0;return _.map(i=>i.kh_ma!==t?(t=i.kh_ma,n++,{...i,groupIndex:n}):{...i,groupIndex:null})},[_]);return e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:w,pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function me({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"groupIndex",key:"index",width:60,render:(t,n)=>t},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code"},{title:"Khách hàng",dataIndex:"customer",key:"customer",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.customer}`,target:"_blank",children:n.customer})})},{title:"Địa chỉ",dataIndex:"customer_address",key:"customer_address",render:t=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:t})},{title:"Mã đơn hàng",dataIndex:"so_name",key:"so_name"},{title:"Ngày đặt",dataIndex:"trans_date",key:"trans_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g.unix(t).format("DD/MM/YYYY")})})},{title:"Tông tiền",dataIndex:"grand_total",key:"grand_total",render:t=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(t)})}],[r,p]=l.useState(1),d=20,[h,k]=l.useState(0),[_,S]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix();l.useEffect(()=>{(async()=>{const t=await M.get("/api/method/mbw_dms.api.report.kpi.kpi_cus_so_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;k(n?.totals),S(i=>r===1?n.data:[...i,...n.data])})()},[j,f,s,r]);const w=O.useMemo(()=>{let t=null,n=0;return _.map(i=>i.customer_code!==t?(t=i.customer_code,n++,{...i,groupIndex:n}):{...i,groupIndex:null})},[_]);return l.useEffect(()=>()=>{p(1)},[s]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:w,pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function _e({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,n,i)=>e.jsx("span",{children:w(r,d,i)})},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code"},{title:"Khách hàng",dataIndex:"customer_name",key:"customer_name",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.customer_name}`,target:"_blank",children:n.customer_name})})},{title:"Địa chỉ",dataIndex:"customer_primary_address",key:"customer_primary_address",render:t=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:t})},{title:"Số điện thoại",dataIndex:"mobile_no",key:"mobile_no"},{title:"Ngày thu thập",dataIndex:"collection_date",key:"collection_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g.unix(t).format("DD/MM/YYYY")})})},{title:"Nguồn",dataIndex:"nguon",key:"nguon",render:t=>e.jsx("div",{children:t||"-"})}],[r,p]=l.useState(1),d=20,[h,k]=l.useState(0),[_,S]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix(),w=(t,n,i)=>(t-1)*n+i+1;return l.useEffect(()=>{(async()=>{const t=await M.get("/api/method/mbw_dms.api.report.kpi.kpi_new_cus_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;S(n),k(n?.totals)})()},[j,f,s,r]),l.useEffect(()=>()=>{p(1)},[s]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:_?.data?.map(t=>({key:t.customer_name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function xe({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,n,i)=>e.jsx("span",{children:w(r,d,i)})},{title:"Mã đơn hàng",dataIndex:"name",key:"name"},{title:"Khách hàng",dataIndex:"customer",key:"customer",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.customer}`,target:"_blank",children:n.customer})})},{title:"Trạng thái",dataIndex:"status",key:"status",render:t=>t==="To Deliver and Bill"?e.jsx("div",{className:"whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#FFAB0014] text-[#FFAB00]",children:"• Chờ vận chuyển và chờ thanh toán"}):t==="To Bill"?e.jsx("div",{className:"whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#8E33FF14] text-[#8E33FF]",children:"• Chờ thanh toán"}):t==="To Deliver"?e.jsx("div",{className:"whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#00B8D914] text-[#00B8D9]",children:"• Chờ vận chuyển"}):t==="Completed"?e.jsx("div",{className:"whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#22C55E14] text-[#22C55E]",children:"• Hoàn thành"}):e.jsx("div",{className:"whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#FF563014] text-[#FF5630]",children:"• Đã hủy"})},{title:"Ngày đặt",dataIndex:"collec_date",key:"collec_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g.unix(t).format("DD/MM/YYYY")})})}],[r,p]=l.useState(1),d=20,[h,k]=l.useState(0),[_,S]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix(),w=(t,n,i)=>(t-1)*n+i+1;return l.useEffect(()=>{(async()=>{const t=await M.get("/api/method/mbw_dms.api.report.kpi.kpi_total_so_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;S(n),k(n?.totals)})()},[j,f,s,r]),l.useEffect(()=>()=>{p(1)},[s]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:_?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function L({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,n,i)=>e.jsx("span",{children:w(r,d,i)})},{title:"Mã đơn hàng",dataIndex:"name",key:"name"},{title:"Khách hàng",dataIndex:"customer",key:"customer",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.customer}`,target:"_blank",children:n.customer})})},{title:"Ngày đặt",dataIndex:"collec_date",key:"collec_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g.unix(t).format("DD/MM/YYYY")})})},{title:"Tông tiền",dataIndex:"grand_total",key:"grand_total",render:t=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(t)})}],[r,p]=l.useState(1),d=20,[h,k]=l.useState(0),[_,S]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix(),w=(t,n,i)=>(t-1)*n+i+1;return l.useEffect(()=>{(async()=>{const t=await M.get("/api/method/mbw_dms.api.report.kpi.kpi_so_amount_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;S(n),k(n?.totals)})()},[j,f,s,r]),l.useEffect(()=>()=>{p(1)},[s]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:_?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function ue({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,n,i)=>e.jsx("span",{children:w(r,d,i)})},{title:"Mã đơn hàng",dataIndex:"name",key:"name"},{title:"Khách hàng",dataIndex:"customer",key:"customer",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.customer}`,target:"_blank",children:n.customer})})},{title:"Ngày đặt",dataIndex:"collec_date",key:"collec_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g.unix(t).format("DD/MM/YYYY")})})},{title:"Tông tiền",dataIndex:"grand_total",key:"grand_total",render:t=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(t)})}],[r,p]=l.useState(1),d=20,[h,k]=l.useState(0),[_,S]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix(),w=(t,n,i)=>(t-1)*n+i+1;return l.useEffect(()=>{(async()=>{const t=await M.get("/api/method/mbw_dms.api.report.kpi.kpi_si_amount_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;S(n),k(n?.totals)})()},[j,f,s,r]),l.useEffect(()=>()=>{p(1)},[s]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:_?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function ge({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,n,i)=>e.jsx("span",{children:w(r,d,i)})},{title:"Mã đơn đặt",dataIndex:"name",key:"name"},{title:"Khách hàng",dataIndex:"customer",key:"customer",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.customer}`,target:"_blank",children:n.customer})})},{title:"Ngày đặt",dataIndex:"create_date",key:"create_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g.unix(t).format("DD/MM/YYYY")})})},{title:"Số lượng",dataIndex:"total_qty",key:"total_qty",render:t=>e.jsx("div",{className:"!text-right",children:t})}],[r,p]=l.useState(1),d=20,[h,k]=l.useState(0),[_,S]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix(),w=(t,n,i)=>(t-1)*n+i+1;return l.useEffect(()=>{(async()=>{const t=await M.get("/api/method/mbw_dms.api.report.kpi.kpi_so_qty_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;S(n),k(n?.totals)})()},[j,f,s,r]),l.useEffect(()=>()=>{p(1)},[s]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:_?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function pe({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,n,i)=>e.jsx("span",{children:w(r,d,i)})},{title:"Mã đơn đặt",dataIndex:"name",key:"name"},{title:"Khách hàng",dataIndex:"customer",key:"customer",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.customer}`,target:"_blank",children:n.customer})})},{title:"Ngày đặt",dataIndex:"create_date",key:"create_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g.unix(t).format("DD/MM/YYYY")})})},{title:"Số lượng",dataIndex:"totak_sku",key:"totak_sku",render:t=>e.jsx("div",{className:"!text-right",children:t})}],[r,p]=l.useState(1),d=20,[h,k]=l.useState(0),[_,S]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix(),w=(t,n,i)=>(t-1)*n+i+1;return l.useEffect(()=>{(async()=>{const t=await M.get("/api/method/mbw_dms.api.report.kpi.kpi_so_sku_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;S(n),k(n?.totals)})()},[j,f,s,r]),l.useEffect(()=>()=>{p(1)},[s]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:_?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function ke({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,n,i)=>e.jsx("span",{children:w(r,d,i)})},{title:"Mã khách hàng",dataIndex:"kh_ma",key:"kh_ma"},{title:"Khách hàng",dataIndex:"kh_ten",key:"kh_ten",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.kh_ten}`,target:"_blank",children:n.kh_ten})})},{title:"Địa chỉ",dataIndex:"kh_diachi",key:"kh_diachi",render:t=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:t})},{title:"Ngày viếng thăm",dataIndex:"create_date",key:"create_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g.unix(t).format("DD/MM/YYYY")})})},{title:"Thời gian checkin",dataIndex:"checkin_giovao",key:"checkin_giovao",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g(t).format("HH:mm")})})},{title:"Thời gian checkout",dataIndex:"checkin_giora",key:"checkin_giora",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g(t).format("HH:mm")})})},{title:"Số giờ",dataIndex:"so_gio_lam",key:"so_gio_lam",render:t=>{const[n,i,C]=t?.split(":").map(Number);return e.jsx("div",{children:(n+i/60+C/3600).toFixed(2)})}}],[r,p]=l.useState(1),d=20,[h,k]=l.useState(0),[_,S]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix(),w=(t,n,i)=>(t-1)*n+i+1;return l.useEffect(()=>{(async()=>{const t=await M.get("/api/method/mbw_dms.api.report.kpi.kpi_time_work_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;S(n),k(n?.totals)})()},[j,f,s,r]),l.useEffect(()=>()=>{p(1)},[s]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:_?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}const je=({type:s,month:o,year:c,setModal:y,modal:r,title:p})=>{const d=()=>{y({open:!1,id:null})},h=()=>{if(s=="modalSale")return e.jsx(L,{employee:r.id?.employee,month:o,year:c});if(s==="modal")return e.jsx(ce,{employee:r.id?.employee,month:o,year:c});if(s=="modalCheckF")return e.jsx(he,{employee:r.id?.employee,month:o,year:c});if(s=="modalOder")return e.jsx(me,{employee:r.id?.employee,month:o,year:c});if(s=="modalCustomer")return e.jsx(_e,{employee:r.id?.employee,month:o,year:c});if(s=="modalTotal")return e.jsx(xe,{employee:r.id?.employee,month:o,year:c});if(s=="modalTotal")return e.jsx(L,{employee:r.id?.employee,month:o,year:c});if(s=="modalReven")return e.jsx(ue,{employee:r.id?.employee,month:o,year:c});if(s=="modalQty")return e.jsx(ge,{employee:r.id?.employee,month:o,year:c});if(s=="modalSku")return e.jsx(pe,{employee:r.id?.employee,month:o,year:c});if(s=="modalWork")return e.jsx(ke,{employee:r.id?.employee,month:o,year:c})};return e.jsx(oe,{title:e.jsxs("div",{className:"font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4",children:[p," - ",r.id?.name_employee]}),open:r.open,onCancel:d,footer:!1,width:1120,children:e.jsx(h,{})})},b=je,fe=({summaryData:s})=>e.jsxs(x.Summary.Row,{children:[e.jsx(x.Summary.Cell,{index:0}),e.jsx(x.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(x.Summary.Cell,{index:2}),e.jsx(x.Summary.Cell,{index:3}),e.jsx(x.Summary.Cell,{index:4,className:"text-center",children:s?.tong_kh_vt}),e.jsx(x.Summary.Cell,{index:5,className:"text-center",children:s?.tong_th_vt}),e.jsx(x.Summary.Cell,{index:6}),e.jsx(x.Summary.Cell,{index:7,className:"text-center",children:s?.tong_kh_vt_dn}),e.jsx(x.Summary.Cell,{index:8,className:"text-center",children:s?.tong_th_vt_dn}),e.jsx(x.Summary.Cell,{index:9}),e.jsx(x.Summary.Cell,{index:10,className:"text-center",children:s?.tong_kh_dat_hang}),e.jsx(x.Summary.Cell,{index:11,className:"text-center",children:s?.tong_th_dat_hang}),e.jsx(x.Summary.Cell,{index:12}),e.jsx(x.Summary.Cell,{index:13,className:"text-center",children:s?.tong_kh_kh_moi}),e.jsx(x.Summary.Cell,{index:14,className:"text-center",children:s?.tong_th_kh_moi}),e.jsx(x.Summary.Cell,{index:15}),e.jsx(x.Summary.Cell,{index:16,className:"text-center",children:s?.tong_kh_don_hang}),e.jsx(x.Summary.Cell,{index:17,className:"text-center",children:s?.tong_th_don_hang}),e.jsx(x.Summary.Cell,{index:18}),e.jsx(x.Summary.Cell,{index:19,className:"text-center",children:Intl.NumberFormat().format(s?.tong_kh_doanh_so)}),e.jsx(x.Summary.Cell,{index:20,className:"text-center",children:Intl.NumberFormat().format(s?.tong_th_doanh_so)}),e.jsx(x.Summary.Cell,{index:21}),e.jsx(x.Summary.Cell,{index:22,className:"text-center",children:Intl.NumberFormat().format(s?.tong_kh_doanh_thu)}),e.jsx(x.Summary.Cell,{index:23,className:"text-center",children:Intl.NumberFormat().format(s?.tong_th_doanh_thu)}),e.jsx(x.Summary.Cell,{index:24}),e.jsx(x.Summary.Cell,{index:25,className:"text-center",children:s?.tong_kh_san_lg}),e.jsx(x.Summary.Cell,{index:26,className:"text-center",children:s?.tong_th_san_lg}),e.jsx(x.Summary.Cell,{index:27}),e.jsx(x.Summary.Cell,{index:28,className:"text-center",children:s?.tong_kh_sku}),e.jsx(x.Summary.Cell,{index:29,className:"text-center",children:s?.tong_th_sku}),e.jsx(x.Summary.Cell,{index:30}),e.jsx(x.Summary.Cell,{index:31,className:"text-center",children:s?.tong_kh_so_gio_lam_viec}),e.jsx(x.Summary.Cell,{index:32,className:"text-center",children:Number(s?.tong_th_so_gio_lam_viec).toFixed(2)}),e.jsx(x.Summary.Cell,{index:33})]}),ye=fe,{Column:u,ColumnGroup:T}=N;function Se(){const[s,o]=l.useState(1),[c,y]=l.useState([]),[r,p]=l.useState(0),[d,h]=l.useState(!1),{currentMonth:k,currentYear:_}=A(m=>m.month),{sales_team:S,employee:v,customer_type:I,customer_group:j,territory:f}=A(m=>m.group),w=re(),t=le(`${ie}`),[n,i]=l.useState({open:!1,id:null}),[C,F]=l.useState({open:!1,id:null}),[Z,$]=l.useState({open:!1,id:null}),[Q,E]=l.useState({open:!1,id:null}),[W,Y]=l.useState({open:!1,id:null}),[V,z]=l.useState({open:!1,id:null}),[q,K]=l.useState({open:!1,id:null}),[U,H]=l.useState({open:!1,id:null}),[J,P]=l.useState({open:!1,id:null}),[X,R]=l.useState({open:!1,id:null});return l.useEffect(()=>{(async()=>{const m=await M.get("/api/method/mbw_dms.api.report.kpi.kpi_report",{params:{page_size:D,page_number:s,month:k,year:_,sales_team:S,employee:v,customer_group:j,customer_type:I,territory:f}});y(m?.result),p(m?.result?.totals)})()},[k,_,S,v,s,d,j,I,f]),e.jsx(e.Fragment,{children:e.jsx(ne,{header:e.jsx(ae,{setRefresh:h,title:"Báo cáo KPI",params:{report_type:"Report KPI",data_filter:{month:k,year:_}},file_name:"Report KPI.xlsx"}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(B,{gutter:[16,16],className:`flex ${t?"justify-end":"justify-between"} items-center w-full`,children:[!t&&e.jsx(G,{className:"ml-4 w-[78%]",children:e.jsx(B,{className:"space-x-4",children:e.jsx(se,{setPage:o,inputMonth:!0,inputYear:!0,inputSaleGroup:!0,inputEmployee:!0})})}),e.jsx(G,{className:"!ml-4",children:e.jsx(de,{setPage:o,inputCustomerType:!0,inputCustomerGroup:!0,inputTerritory:!0,inputMonth:!0,inputYear:!0,inputSaleGroup:!0,inputEmployee:!0,matchMedia:!t})})]}),e.jsx("div",{className:"pt-5",children:e.jsxs(N,{dataSource:c?.data?.map(m=>({key:m.name,...m})),bordered:!0,scroll:{x:"max-content",y:c?.data?.length>0?w?.h*.55:void 0},pagination:r&&r>D?{pageSize:D,showSizeChanger:!1,total:r,current:s,onChange(m){o(m)}}:!1,summary:()=>e.jsx(ye,{summaryData:c?.sum}),children:[e.jsx(u,{title:"STT",dataIndex:"stt",fixed:"left",className:"!text-center",width:60,render:(m,a,ee)=>ee+1},"stt"),e.jsx(u,{title:"Mã Nhân viên",dataIndex:"nhan_vien_ban_hang",fixed:"left",render:(m,a)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"!min-w-[130px]",children:a.nhan_vien_ban_hang})})},"nhan_vien_ban_hang"),e.jsx(u,{title:"Nhân viên",dataIndex:"ten_nv",fixed:"left",render:(m,a)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"!min-w-[200px]",children:a.ten_nv})})},"ten_nv"),e.jsx(u,{title:"Nhóm bán hàng",dataIndex:"nhom_ban_hang",render:(m,a)=>e.jsx("div",{children:a.nhom_ban_hang})},"nhom_ban_hang"),e.jsxs(T,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số lượt viếng thăm",children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_vt"},"kh_vt"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_vt",render:(m,a)=>e.jsx("div",{onClick:()=>{i({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:a?.kpi_month?.th_vt})},"th_vt"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_vt",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_vt,"%"]})},"tl_vt")]}),e.jsxs(T,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng viếng thăm",children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_vt_dn"},"kh_vt_dn"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_vt_dn",render:(m,a)=>e.jsx("div",{onClick:()=>{F({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:a?.kpi_month?.th_vt_dn})},"th_vt_dn"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_vt_dn",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_vt_dn,"%"]})},"tl_vt_dn")]}),e.jsxs(T,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng đặt hàng",children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_dat_hang"},"kh_dat_hang"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_dat_hang",render:(m,a)=>e.jsx("div",{onClick:()=>{$({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:a?.kpi_month?.th_dat_hang})},"th_dat_hang"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_dat_hang",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_dat_hang,"%"]})},"tl_dat_hang")]}),e.jsxs(T,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng thêm mới",children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_kh_moi"},"kh_kh_moi"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_kh_moi",render:(m,a)=>e.jsx("div",{onClick:()=>{E({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:a?.kpi_month?.th_kh_moi})},"th_kh_moi"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_kh_moi",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_kh_moi,"%"]})},"tl_kh_moi")]}),e.jsxs(T,{className:"!whitespace-normal",title:"Số đơn hàng",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_don_hang"},"kh_don_hang"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_don_hang",render:(m,a)=>e.jsx("div",{onClick:()=>{Y({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:a?.kpi_month?.th_don_hang})},"th_don_hang"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_don_hang",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_don_hang,"%"]})},"tl_don_hang")]}),e.jsxs(T,{className:"!whitespace-normal",title:"Doanh số (VNĐ)",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",dataIndex:"kh_doanh_so",render:(m,a)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(a.kh_doanh_so)})},"kh_doanh_so"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_doanh_so",render:(m,a)=>e.jsx("div",{onClick:()=>{z({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:Intl.NumberFormat().format(a?.kpi_month?.th_doanh_so)})},"th_doanh_so"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_don_hang",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_don_hang,"%"]})},"tl_don_hang")]}),e.jsxs(T,{className:"!whitespace-normal",title:"Doanh thu (VNĐ)",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_doanh_thu",render:(m,a)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(a.kh_doanh_thu)})},"kh_doanh_thu"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_doanh_thu",render:(m,a)=>e.jsx("div",{onClick:()=>{K({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:Intl.NumberFormat().format(a?.kpi_month?.th_doanh_thu)})},"th_doanh_thu"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_doanh_thu",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_doanh_thu,"%"]})},"tl_doanh_thu")]}),e.jsxs(T,{className:"!whitespace-normal",title:"Sản lượng",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_san_lg"},"kh_san_lg"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_san_lg",render:(m,a)=>e.jsx("div",{onClick:()=>{H({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:a?.kpi_month?.th_san_lg})},"th_san_lg"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_san_luong",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_san_luong,"%"]})},"tl_san_luong")]}),e.jsxs(T,{className:"!whitespace-normal",title:"SKU",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_sku"},"kh_sku"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_sku",render:(m,a)=>e.jsx("div",{onClick:()=>{P({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:a?.kpi_month?.th_sku})},"th_sku"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_sku",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_sku,"%"]})},"tl_sku")]}),e.jsxs(T,{className:"!whitespace-normal",title:"Số giờ làm việc",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_so_gio_lam_viec"},"kh_so_gio_lam_viec"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_so_gio_lam_viec",render:(m,a)=>e.jsx("div",{onClick:()=>{R({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month?.th_so_gio_lam_viec?(a?.kpi_month?.th_so_gio_lam_viec).toFixed(2):0})},"th_so_gio_lam_viec"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_so_gio_lam_viec",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_so_gio_lam_viec,"%"]})},"tl_so_gio_lam_viec")]})]})}),e.jsx(b,{type:"modal",title:"Số khách hàng viếng thăm",modal:n,month:k,year:_,setModal:i}),e.jsx(b,{type:"modalCheckF",title:"Số khách hàng viếng thăm duy nhất",modal:C,month:k,year:_,setModal:F}),e.jsx(b,{type:"modalOder",title:"Số khách hàng đặt hàng",modal:Z,month:k,year:_,setModal:$}),e.jsx(b,{type:"modalCustomer",title:"Số khách hàng thêm mới",modal:Q,month:k,year:_,setModal:E}),e.jsx(b,{type:"modalTotal",title:"Số đơn hàng",modal:W,month:k,year:_,setModal:Y}),e.jsx(b,{type:"modalSale",title:"Doanh số",modal:V,month:k,year:_,setModal:z}),e.jsx(b,{type:"modalReven",title:"Doanh thu",modal:q,month:k,year:_,setModal:K}),e.jsx(b,{type:"modalQty",title:"Sản lượng",modal:U,month:k,year:_,setModal:H}),e.jsx(b,{type:"modalSku",title:"SKU",modal:J,month:k,year:_,setModal:P}),e.jsx(b,{type:"modalWork",title:"Số giờ làm việc",modal:X,month:k,year:_,setModal:R})]})})})}function $e(){return e.jsxs(e.Fragment,{children:[e.jsx(te,{children:e.jsx("title",{children:" ReportKPI"})}),e.jsx(Se,{})]})}export{$e as default};
