import{Y as l,V as g,a1 as b,ap as O,L as e,ab as N,bE as x,R as A,P as L,ad as ne}from"./index-VRbTILev.js";import{u as ae,C as se}from"./index-NExoC4fX.js";import{u as Z,a as re,P as D,R as le,F as de,D as ie,m as oe}from"./ReportHeader-9Effew6o.js";import{M as ce}from"./ModalCheckin-S18PrxAS.js";import"./index-PqEXY_Cp.js";import"./index.esm-zKaVIIIZ.js";import"./data-u-VkVTNg.js";import"./VerticalAlignBottomOutlined-ZCtqWCMJ.js";function he({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"groupIndex",key:"index",width:60,render:(t,n)=>t},{title:"Mã khách hàng",dataIndex:"kh_ma",key:"kh_ma"},{title:"Khách hàng",dataIndex:"kh_ten",key:"kh_ten",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.kh_ten}`,target:"_blank",children:n.kh_ten})})},{title:"Địa chỉ",dataIndex:"kh_diachi",key:"kh_diachi",render:t=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:t})},{title:"Ngày viếng thăm",dataIndex:"checkin_giovao",key:"checkin_giovao",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g(t).format("DD/MM/YYYY")})})},{title:"Thời gian checkin",dataIndex:"checkin_giovao",key:"checkin_giovao",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g(t).format("HH:mm")})})},{title:"Khoảng cách",dataIndex:"checkin_khoangcach",key:"checkin_khoangcach",render:t=>e.jsx("div",{children:t})}],[r,p]=l.useState(1),d=20,[h,w]=l.useState(0),[_,k]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix();l.useEffect(()=>()=>{p(1)},[s]),l.useEffect(()=>{(async()=>{const t=await b.get("/api/method/mbw_dms.api.report.kpi.kpi_visit_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;w(n?.totals),k(i=>r===1?n.data:[...i,...n.data])})()},[j,f,s,r]);const S=O.useMemo(()=>{let t=null,n=null,i=0;return _.map(M=>{const F=new Date(M.checkin_giovao).toLocaleDateString("vi-VN");return M.kh_ma!==t||F!==n?(t=M.kh_ma,n=F,i++,{...M,groupIndex:i}):{...M,groupIndex:null}})},[_]);return console.log(S),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:S,pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function me({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"groupIndex",key:"index",width:60,render:(t,n)=>t},{title:"Mã khách hàng",dataIndex:"kh_ma",key:"kh_ma"},{title:"Khách hàng",dataIndex:"kh_ten",key:"kh_ten",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.kh_ten}`,target:"_blank",children:n.kh_ten})})},{title:"Địa chỉ",dataIndex:"kh_diachi",key:"kh_diachi",render:t=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:t})},{title:"Ngày viếng thăm",dataIndex:"checkin_giovao",key:"checkin_giovao",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g(t).format("DD/MM/YYYY")})})},{title:"Thời gian checkin",dataIndex:"checkin_giovao",key:"checkin_giovao",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g(t).format("HH:mm")})})},{title:"Khoảng cách",dataIndex:"checkin_khoangcach",key:"checkin_khoangcach",render:t=>e.jsx("div",{children:parseFloat((t/60).toFixed(2))})}],[r,p]=l.useState(1),d=20,[h,w]=l.useState(0),[_,k]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix();l.useEffect(()=>()=>{p(1)},[s]),l.useEffect(()=>{(async()=>{const t=await b.get("/api/method/mbw_dms.api.report.kpi.kpi_only_visit_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}}),{result:n}=t;w(n?.totals),k(i=>r===1?n.data:[...i,...n.data])})()},[j,f,s,r]);const S=O.useMemo(()=>{let t=null,n=0;return _.map(i=>i.kh_ma!==t?(t=i.kh_ma,n++,{...i,groupIndex:n}):{...i,groupIndex:null})},[_]);return e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:S,pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function _e({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"groupIndex",key:"index",width:60,render:(t,n)=>t},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code"},{title:"Khách hàng",dataIndex:"customer",key:"customer",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.customer}`,target:"_blank",children:n.customer})})},{title:"Địa chỉ",dataIndex:"customer_address",key:"customer_address",render:t=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:t})},{title:"Mã đơn hàng",dataIndex:"so_name",key:"so_name",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/sales-order/${n.so_name}`,target:"_blank",children:n.so_name})})},{title:"Ngày đặt",dataIndex:"trans_date",key:"trans_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g.unix(t).format("DD/MM/YYYY")})})},{title:"Tông tiền",dataIndex:"grand_total",key:"grand_total",render:t=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(t)})}],[r,p]=l.useState(1),d=20,[h,w]=l.useState(0),[_,k]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix();l.useEffect(()=>{(async()=>{const t=await b.get("/api/method/mbw_dms.api.report.kpi.kpi_cus_so_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;w(n?.totals),k(i=>r===1?n.data:[...i,...n.data])})()},[j,f,s,r]);const S=O.useMemo(()=>{let t=null,n=0;return _.map(i=>i.customer_code!==t?(t=i.customer_code,n++,{...i,groupIndex:n}):{...i,groupIndex:null})},[_]);return l.useEffect(()=>()=>{p(1)},[s]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:S,pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function xe({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,n,i)=>e.jsx("span",{children:S(r,d,i)})},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code"},{title:"Khách hàng",dataIndex:"customer_name",key:"customer_name",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.customer_name}`,target:"_blank",children:n.customer_name})})},{title:"Địa chỉ",dataIndex:"customer_primary_address",key:"customer_primary_address",render:t=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:t})},{title:"Số điện thoại",dataIndex:"mobile_no",key:"mobile_no"},{title:"Ngày thu thập",dataIndex:"collection_date",key:"collection_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g.unix(t).format("DD/MM/YYYY")})})},{title:"Nguồn",dataIndex:"nguon",key:"nguon",render:t=>e.jsx("div",{children:t||"-"})}],[r,p]=l.useState(1),d=20,[h,w]=l.useState(0),[_,k]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix(),S=(t,n,i)=>(t-1)*n+i+1;return l.useEffect(()=>{(async()=>{const t=await b.get("/api/method/mbw_dms.api.report.kpi.kpi_new_cus_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;k(n),w(n?.totals)})()},[j,f,s,r]),l.useEffect(()=>()=>{p(1)},[s]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:_?.data?.map(t=>({key:t.customer_name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function ue({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,n,i)=>e.jsx("span",{children:S(r,d,i)})},{title:"Mã đơn hàng",dataIndex:"name",key:"name",render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/sales-order/${n.name}`,target:"_blank",children:n.name})})},{title:"Khách hàng",dataIndex:"customer",key:"customer",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.customer}`,target:"_blank",children:n.customer})})},{title:"Trạng thái",dataIndex:"status",key:"status",render:t=>t==="To Deliver and Bill"?e.jsx("div",{className:"whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#FFAB0014] text-[#FFAB00]",children:"• Chờ vận chuyển và chờ thanh toán"}):t==="To Bill"?e.jsx("div",{className:"whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#8E33FF14] text-[#8E33FF]",children:"• Chờ thanh toán"}):t==="To Deliver"?e.jsx("div",{className:"whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#00B8D914] text-[#00B8D9]",children:"• Chờ vận chuyển"}):t==="Completed"?e.jsx("div",{className:"whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#22C55E14] text-[#22C55E]",children:"• Hoàn thành"}):e.jsx("div",{className:"whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#FF563014] text-[#FF5630]",children:"• Đã hủy"})},{title:"Ngày đặt",dataIndex:"collec_date",key:"collec_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g.unix(t).format("DD/MM/YYYY")})})}],[r,p]=l.useState(1),d=20,[h,w]=l.useState(0),[_,k]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix(),S=(t,n,i)=>(t-1)*n+i+1;return l.useEffect(()=>{(async()=>{const t=await b.get("/api/method/mbw_dms.api.report.kpi.kpi_total_so_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;k(n),w(n?.totals)})()},[j,f,s,r]),l.useEffect(()=>()=>{p(1)},[s]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:_?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function Q({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,n,i)=>e.jsx("span",{children:S(r,d,i)})},{title:"Mã đơn hàng",dataIndex:"name",key:"name",render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/sales-order/${n.name}`,target:"_blank",children:n.name})})},{title:"Khách hàng",dataIndex:"customer",key:"customer",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.customer}`,target:"_blank",children:n.customer})})},{title:"Ngày đặt",dataIndex:"collec_date",key:"collec_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g.unix(t).format("DD/MM/YYYY")})})},{title:"Tông tiền",dataIndex:"grand_total",key:"grand_total",render:t=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(t)})}],[r,p]=l.useState(1),d=20,[h,w]=l.useState(0),[_,k]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix(),S=(t,n,i)=>(t-1)*n+i+1;return l.useEffect(()=>{(async()=>{const t=await b.get("/api/method/mbw_dms.api.report.kpi.kpi_so_amount_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;k(n),w(n?.totals)})()},[j,f,s,r]),l.useEffect(()=>()=>{p(1)},[s]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:_?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function ge({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,n,i)=>e.jsx("span",{children:S(r,d,i)})},{title:"Mã đơn hàng",dataIndex:"name",key:"name",render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/sales-invoice/${n.name}`,target:"_blank",children:n.name})})},{title:"Khách hàng",dataIndex:"customer",key:"customer",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.customer}`,target:"_blank",children:n.customer})})},{title:"Ngày đặt",dataIndex:"collec_date",key:"collec_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g.unix(t).format("DD/MM/YYYY")})})},{title:"Tông tiền",dataIndex:"grand_total",key:"grand_total",render:t=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(t)})}],[r,p]=l.useState(1),d=20,[h,w]=l.useState(0),[_,k]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix(),S=(t,n,i)=>(t-1)*n+i+1;return l.useEffect(()=>{(async()=>{const t=await b.get("/api/method/mbw_dms.api.report.kpi.kpi_si_amount_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;k(n),w(n?.totals)})()},[j,f,s,r]),l.useEffect(()=>()=>{p(1)},[s]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:_?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function pe({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,n,i)=>e.jsx("span",{children:S(r,d,i)})},{title:"Mã đơn đặt",dataIndex:"name",key:"name",render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/sales-order/${n.name}`,target:"_blank",children:n.name})})},{title:"Khách hàng",dataIndex:"customer",key:"customer",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.customer}`,target:"_blank",children:n.customer})})},{title:"Ngày đặt",dataIndex:"create_date",key:"create_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g.unix(t).format("DD/MM/YYYY")})})},{title:"Số lượng",dataIndex:"total_qty",key:"total_qty",render:t=>e.jsx("div",{className:"!text-right",children:t})}],[r,p]=l.useState(1),d=20,[h,w]=l.useState(0),[_,k]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix(),S=(t,n,i)=>(t-1)*n+i+1;return l.useEffect(()=>{(async()=>{const t=await b.get("/api/method/mbw_dms.api.report.kpi.kpi_so_qty_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;k(n),w(n?.totals)})()},[j,f,s,r]),l.useEffect(()=>()=>{p(1)},[s]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:_?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function ke({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,n,i)=>e.jsx("span",{children:S(r,d,i)})},{title:"Mã đơn đặt",dataIndex:"name",key:"name",render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/sales-order/${n.name}`,target:"_blank",children:n.name})})},{title:"Khách hàng",dataIndex:"customer",key:"customer",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.customer}`,target:"_blank",children:n.customer})})},{title:"Ngày đặt",dataIndex:"create_date",key:"create_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g.unix(t).format("DD/MM/YYYY")})})},{title:"SKU",className:"!text-right",dataIndex:"totak_sku",key:"totak_sku",render:t=>e.jsx("div",{className:"!text-right",children:t})}],[r,p]=l.useState(1),d=20,[h,w]=l.useState(0),[_,k]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix(),S=(t,n,i)=>(t-1)*n+i+1;return l.useEffect(()=>{(async()=>{const t=await b.get("/api/method/mbw_dms.api.report.kpi.kpi_so_sku_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;k(n),w(n?.totals)})()},[j,f,s,r]),l.useEffect(()=>()=>{p(1)},[s]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:_?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}function je({employee:s,month:o,year:c}){const y=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,n,i)=>e.jsx("span",{children:S(r,d,i)})},{title:"Mã khách hàng",dataIndex:"kh_ma",key:"kh_ma"},{title:"Khách hàng",dataIndex:"kh_ten",key:"kh_ten",width:200,render:(t,n)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/customer/${n.kh_ten}`,target:"_blank",children:n.kh_ten})})},{title:"Địa chỉ",dataIndex:"kh_diachi",key:"kh_diachi",render:t=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:t})},{title:"Ngày viếng thăm",dataIndex:"create_date",key:"create_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g.unix(t).format("DD/MM/YYYY")})})},{title:"Thời gian checkin",dataIndex:"checkin_giovao",key:"checkin_giovao",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g(t).format("HH:mm")})})},{title:"Thời gian checkout",dataIndex:"checkin_giora",key:"checkin_giora",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:g(t).format("HH:mm")})})},{title:"Số giờ",dataIndex:"so_gio_lam",key:"so_gio_lam",render:t=>{const[n,i,M]=t?.split(":").map(Number);return e.jsx("div",{children:(n+i/60+M/3600).toFixed(2)})}}],[r,p]=l.useState(1),d=20,[h,w]=l.useState(0),[_,k]=l.useState([]),v=g(`${c}-${o}-01`).startOf("month"),I=g(`${c}-${o}-01`).add(1,"month").startOf("month").subtract(1,"second"),j=v.unix(),f=I.unix(),S=(t,n,i)=>(t-1)*n+i+1;return l.useEffect(()=>{(async()=>{const t=await b.get("/api/method/mbw_dms.api.report.kpi.kpi_time_work_detail",{params:{from_date:j,to_date:f,employee:s,page_size:d,page_number:r}});let{result:n}=t;k(n),w(n?.totals)})()},[j,f,s,r]),l.useEffect(()=>()=>{p(1)},[s]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:_?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){p(t)}}:!1,scroll:{y:500},columns:y})})}const fe=({type:s,month:o,year:c,setModal:y,modal:r,title:p})=>{const d=()=>{y({open:!1,id:null})},h=()=>{if(s=="modalSale")return e.jsx(Q,{employee:r.id?.employee,month:o,year:c});if(s==="modal")return e.jsx(he,{employee:r.id?.employee,month:o,year:c});if(s=="modalCheckF")return e.jsx(me,{employee:r.id?.employee,month:o,year:c});if(s=="modalOder")return e.jsx(_e,{employee:r.id?.employee,month:o,year:c});if(s=="modalCustomer")return e.jsx(xe,{employee:r.id?.employee,month:o,year:c});if(s=="modalTotal")return e.jsx(ue,{employee:r.id?.employee,month:o,year:c});if(s=="modalTotal")return e.jsx(Q,{employee:r.id?.employee,month:o,year:c});if(s=="modalReven")return e.jsx(ge,{employee:r.id?.employee,month:o,year:c});if(s=="modalQty")return e.jsx(pe,{employee:r.id?.employee,month:o,year:c});if(s=="modalSku")return e.jsx(ke,{employee:r.id?.employee,month:o,year:c});if(s=="modalWork")return e.jsx(je,{employee:r.id?.employee,month:o,year:c})};return e.jsx(ce,{title:e.jsxs("div",{className:"font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4",children:[p," - ",r.id?.name_employee]}),open:r.open,onCancel:d,footer:!1,width:1120,children:e.jsx(h,{})})},T=fe,ye=({summaryData:s})=>e.jsxs(x.Summary.Row,{children:[e.jsx(x.Summary.Cell,{index:0}),e.jsx(x.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(x.Summary.Cell,{index:2}),e.jsx(x.Summary.Cell,{index:3}),e.jsx(x.Summary.Cell,{index:4,className:"text-center",children:s?.tong_kh_vt}),e.jsx(x.Summary.Cell,{index:5,className:"text-center",children:s?.tong_th_vt}),e.jsx(x.Summary.Cell,{index:6}),e.jsx(x.Summary.Cell,{index:7,className:"text-center",children:s?.tong_kh_vt_dn}),e.jsx(x.Summary.Cell,{index:8,className:"text-center",children:s?.tong_th_vt_dn}),e.jsx(x.Summary.Cell,{index:9}),e.jsx(x.Summary.Cell,{index:10,className:"text-center",children:s?.tong_kh_dat_hang}),e.jsx(x.Summary.Cell,{index:11,className:"text-center",children:s?.tong_th_dat_hang}),e.jsx(x.Summary.Cell,{index:12}),e.jsx(x.Summary.Cell,{index:13,className:"text-center",children:s?.tong_kh_kh_moi}),e.jsx(x.Summary.Cell,{index:14,className:"text-center",children:s?.tong_th_kh_moi}),e.jsx(x.Summary.Cell,{index:15}),e.jsx(x.Summary.Cell,{index:16,className:"text-center",children:s?.tong_kh_don_hang}),e.jsx(x.Summary.Cell,{index:17,className:"text-center",children:s?.tong_th_don_hang}),e.jsx(x.Summary.Cell,{index:18}),e.jsx(x.Summary.Cell,{index:19,className:"text-center",children:Intl.NumberFormat().format(s?.tong_kh_doanh_so)}),e.jsx(x.Summary.Cell,{index:20,className:"text-center",children:Intl.NumberFormat().format(s?.tong_th_doanh_so)}),e.jsx(x.Summary.Cell,{index:21}),e.jsx(x.Summary.Cell,{index:22,className:"text-center",children:Intl.NumberFormat().format(s?.tong_kh_doanh_thu)}),e.jsx(x.Summary.Cell,{index:23,className:"text-center",children:Intl.NumberFormat().format(s?.tong_th_doanh_thu)}),e.jsx(x.Summary.Cell,{index:24}),e.jsx(x.Summary.Cell,{index:25,className:"text-center",children:s?.tong_kh_san_lg}),e.jsx(x.Summary.Cell,{index:26,className:"text-center",children:s?.tong_th_san_lg}),e.jsx(x.Summary.Cell,{index:27}),e.jsx(x.Summary.Cell,{index:28,className:"text-center",children:s?.tong_kh_sku}),e.jsx(x.Summary.Cell,{index:29,className:"text-center",children:s?.tong_th_sku}),e.jsx(x.Summary.Cell,{index:30}),e.jsx(x.Summary.Cell,{index:31,className:"text-center",children:s?.tong_kh_so_gio_lam_viec}),e.jsx(x.Summary.Cell,{index:32,className:"text-center",children:Number(s?.tong_th_so_gio_lam_viec).toFixed(2)}),e.jsx(x.Summary.Cell,{index:33})]}),Se=ye,{Column:u,ColumnGroup:C}=N;function ve(){const[s,o]=l.useState(1),[c,y]=l.useState([]),[r,p]=l.useState(0),[d,h]=l.useState(!1),w=(m,a,$)=>(m-1)*a+$+1,{currentMonth:_,currentYear:k}=Z(m=>m.month),{sales_team:v,employee:I,customer_type:j,customer_group:f,territory:S}=Z(m=>m.group),t=ae(),n=re(`${oe}`),[i,M]=l.useState({open:!1,id:null}),[F,E]=l.useState({open:!1,id:null}),[W,Y]=l.useState({open:!1,id:null}),[V,z]=l.useState({open:!1,id:null}),[q,K]=l.useState({open:!1,id:null}),[U,H]=l.useState({open:!1,id:null}),[J,P]=l.useState({open:!1,id:null}),[X,B]=l.useState({open:!1,id:null}),[ee,R]=l.useState({open:!1,id:null}),[te,G]=l.useState({open:!1,id:null});return l.useEffect(()=>{(async()=>{const m=await b.get("/api/method/mbw_dms.api.report.kpi.kpi_report",{params:{page_size:D,page_number:s,month:_,year:k,sales_team:v,employee:I,customer_group:f,customer_type:j,territory:S}});y(m?.result),p(m?.result?.totals)})()},[_,k,v,I,s,d,f,j,S]),e.jsx(e.Fragment,{children:e.jsx(se,{header:e.jsx(le,{setRefresh:h,title:"Báo cáo KPI",params:{report_type:"Report KPI",data_filter:{month:_,year:k}},file_name:"Report KPI.xlsx"}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(A,{gutter:[16,16],className:`flex ${n?"justify-end":"justify-between"} items-center w-full`,children:[!n&&e.jsx(L,{className:"ml-4 w-[78%]",children:e.jsx(A,{className:"space-x-4",children:e.jsx(de,{setPage:o,inputMonth:!0,inputYear:!0,inputSaleGroup:!0,inputEmployee:!0})})}),e.jsx(L,{className:"!ml-4",children:e.jsx(ie,{setPage:o,inputCustomerType:!0,inputCustomerGroup:!0,inputTerritory:!0,inputMonth:!0,inputYear:!0,inputSaleGroup:!0,inputEmployee:!0,matchMedia:!n})})]}),e.jsx("div",{className:"pt-5",children:e.jsxs(N,{dataSource:c?.data?.map(m=>({key:m.name,...m})),bordered:!0,scroll:{x:"max-content",y:c?.data?.length>0?t?.h*.55:void 0},pagination:r&&r>D?{pageSize:D,showSizeChanger:!1,total:r,current:s,onChange(m){o(m)}}:!1,summary:()=>e.jsx(Se,{summaryData:c?.sum}),children:[e.jsx(u,{title:"STT",dataIndex:"stt",fixed:"left",className:"!text-center",width:60,render:(m,a,$)=>e.jsx("span",{children:w(s,D,$)})},"stt"),e.jsx(u,{title:"Mã Nhân viên",dataIndex:"nhan_vien_ban_hang",fixed:"left",render:(m,a)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"!min-w-[130px]",children:a.nhan_vien_ban_hang})})},"nhan_vien_ban_hang"),e.jsx(u,{title:"Nhân viên",dataIndex:"ten_nv",fixed:"left",render:(m,a)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"!min-w-[200px]",children:a.ten_nv})})},"ten_nv"),e.jsx(u,{title:"Nhóm bán hàng",dataIndex:"nhom_ban_hang",render:(m,a)=>e.jsx("div",{children:a.nhom_ban_hang})},"nhom_ban_hang"),e.jsxs(C,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số lượt viếng thăm",children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_vt"},"kh_vt"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_vt",render:(m,a)=>e.jsx("div",{onClick:()=>{M({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:a?.kpi_month?.th_vt})},"th_vt"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_vt",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_vt,"%"]})},"tl_vt")]}),e.jsxs(C,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng viếng thăm",children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_vt_dn"},"kh_vt_dn"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_vt_dn",render:(m,a)=>e.jsx("div",{onClick:()=>{E({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:a?.kpi_month?.th_vt_dn})},"th_vt_dn"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_vt_dn",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_vt_dn,"%"]})},"tl_vt_dn")]}),e.jsxs(C,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng đặt hàng",children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_dat_hang"},"kh_dat_hang"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_dat_hang",render:(m,a)=>e.jsx("div",{onClick:()=>{Y({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:a?.kpi_month?.th_dat_hang})},"th_dat_hang"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_dat_hang",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_dat_hang,"%"]})},"tl_dat_hang")]}),e.jsxs(C,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng thêm mới",children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_kh_moi"},"kh_kh_moi"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_kh_moi",render:(m,a)=>e.jsx("div",{onClick:()=>{z({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:a?.kpi_month?.th_kh_moi})},"th_kh_moi"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_kh_moi",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_kh_moi,"%"]})},"tl_kh_moi")]}),e.jsxs(C,{className:"!whitespace-normal",title:"Số đơn hàng",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_don_hang"},"kh_don_hang"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_don_hang",render:(m,a)=>e.jsx("div",{onClick:()=>{K({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:a?.kpi_month?.th_don_hang})},"th_don_hang"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_don_hang",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_don_hang,"%"]})},"tl_don_hang")]}),e.jsxs(C,{className:"!whitespace-normal",title:"Doanh số (VNĐ)",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",dataIndex:"kh_doanh_so",render:(m,a)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(a.kh_doanh_so)})},"kh_doanh_so"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_doanh_so",render:(m,a)=>e.jsx("div",{onClick:()=>{H({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:Intl.NumberFormat().format(a?.kpi_month?.th_doanh_so)})},"th_doanh_so"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_don_hang",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_don_hang,"%"]})},"tl_don_hang")]}),e.jsxs(C,{className:"!whitespace-normal",title:"Doanh thu (VNĐ)",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_doanh_thu",render:(m,a)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(a.kh_doanh_thu)})},"kh_doanh_thu"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_doanh_thu",render:(m,a)=>e.jsx("div",{onClick:()=>{P({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:Intl.NumberFormat().format(a?.kpi_month?.th_doanh_thu)})},"th_doanh_thu"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_doanh_thu",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_doanh_thu,"%"]})},"tl_doanh_thu")]}),e.jsxs(C,{className:"!whitespace-normal",title:"Sản lượng",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_san_lg"},"kh_san_lg"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_san_lg",render:(m,a)=>e.jsx("div",{onClick:()=>{B({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:a?.kpi_month?.th_san_lg})},"th_san_lg"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_san_luong",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_san_luong,"%"]})},"tl_san_luong")]}),e.jsxs(C,{className:"!whitespace-normal",title:"SKU",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_sku"},"kh_sku"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_sku",render:(m,a)=>e.jsx("div",{onClick:()=>{R({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month.length==0?0:a?.kpi_month?.th_sku})},"th_sku"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_sku",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_sku,"%"]})},"tl_sku")]}),e.jsxs(C,{className:"!whitespace-normal",title:"Số giờ làm việc",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_so_gio_lam_viec"},"kh_so_gio_lam_viec"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_so_gio_lam_viec",render:(m,a)=>e.jsx("div",{onClick:()=>{G({open:!0,id:{employee:a?.nhan_vien_ban_hang,name_employee:a?.ten_nv}})},children:a?.kpi_month?.th_so_gio_lam_viec?(a?.kpi_month?.th_so_gio_lam_viec).toFixed(2):0})},"th_so_gio_lam_viec"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_so_gio_lam_viec",render:(m,a)=>e.jsxs(e.Fragment,{children:[a.tl_so_gio_lam_viec,"%"]})},"tl_so_gio_lam_viec")]})]})}),e.jsx(T,{type:"modal",title:"Số khách hàng viếng thăm",modal:i,month:_,year:k,setModal:M}),e.jsx(T,{type:"modalCheckF",title:"Số khách hàng viếng thăm duy nhất",modal:F,month:_,year:k,setModal:E}),e.jsx(T,{type:"modalOder",title:"Số khách hàng đặt hàng",modal:W,month:_,year:k,setModal:Y}),e.jsx(T,{type:"modalCustomer",title:"Số khách hàng thêm mới",modal:V,month:_,year:k,setModal:z}),e.jsx(T,{type:"modalTotal",title:"Số đơn hàng",modal:q,month:_,year:k,setModal:K}),e.jsx(T,{type:"modalSale",title:"Doanh số",modal:U,month:_,year:k,setModal:H}),e.jsx(T,{type:"modalReven",title:"Doanh thu",modal:J,month:_,year:k,setModal:P}),e.jsx(T,{type:"modalQty",title:"Sản lượng",modal:X,month:_,year:k,setModal:B}),e.jsx(T,{type:"modalSku",title:"SKU",modal:ee,month:_,year:k,setModal:R}),e.jsx(T,{type:"modalWork",title:"Số giờ làm việc",modal:te,month:_,year:k,setModal:G})]})})})}function De(){return e.jsxs(e.Fragment,{children:[e.jsx(ne,{children:e.jsx("title",{children:" ReportKPI"})}),e.jsx(ve,{})]})}export{De as default};
