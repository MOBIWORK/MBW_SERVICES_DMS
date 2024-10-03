import{Y as a,V as m,a1 as I,L as e,ab as N,ap as be,a6 as we,a7 as Ie,bD as Ne,R as Te,P as M,a2 as ne,aa as Ce,bE as x,ad as De}from"./index-wv8ryCmi.js";import{u as Me,C as Fe}from"./index-u6Mc66Ki.js";import{u as Oe}from"./useDebount-n73lmgZW.js";import{M as T}from"./ModalCheckin-sNw5NHXb.js";import{D as Ee}from"./index-jaTlOoOD.js";import{S as $e}from"./SyncOutlined-fMekjTKy.js";import{V as Ye}from"./VerticalAlignBottomOutlined-TnVdJ6F4.js";const ze=[{label:"Tháng 1",value:"1"},{label:"Tháng 2",value:"2"},{label:"Tháng 3",value:"3"},{label:"Tháng 4",value:"4"},{label:"Tháng 5",value:"5"},{label:"Tháng 6",value:"6"},{label:"Tháng 7",value:"7"},{label:"Tháng 8",value:"8"},{label:"Tháng 9",value:"9"},{label:"Tháng 10",value:"10"},{label:"Tháng 11",value:"11"},{label:"Tháng 12",value:"12"}];function He({employee:c,month:p,year:g}){const b=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,s,l)=>e.jsx("span",{children:w(r,d,l)})},{title:"Mã khách hàng",dataIndex:"kh_ma",key:"kh_ma"},{title:"Khách hàng",dataIndex:"kh_ten",key:"kh_ten",render:(t,s)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/sales-invoice/${s.kh_ten}`,target:"_blank",children:s.kh_ten})})},{title:"Địa chỉ",dataIndex:"kh_diachi",key:"kh_diachi",render:t=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:t})},{title:"Ngày viếng thăm",dataIndex:"checkin_giovao",key:"checkin_giovao",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:m(t).format("DD/MM/YYYY")})})},{title:"Thời gian checkin",dataIndex:"checkin_giovao",key:"checkin_giovao",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:m(t).format("HH:mm")})})},{title:"Khoảng cách",dataIndex:"checkin_khoangcach",key:"checkin_khoangcach",render:t=>e.jsx("div",{children:parseFloat((t/60).toFixed(2))})}],[r,f]=a.useState(1),d=20,[h,S]=a.useState(0),[y,v]=a.useState([]),k=m(`${g}-${p}-01`).startOf("month"),j=m(`${g}-${p}-01`).add(1,"month").startOf("month").subtract(1,"second"),_=k.unix(),o=j.unix(),w=(t,s,l)=>(t-1)*s+l+1;return a.useEffect(()=>()=>{f(1)},[c]),a.useEffect(()=>{(async()=>{const t=await I.get("/api/method/mbw_dms.api.report.kpi.kpi_visit_detail",{params:{from_date:_,to_date:o,employee:c,page_size:d,page_number:r}});let{result:s}=t;v(s),S(s?.totals)})()},[_,o,c,r]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:y?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){f(t)}}:!1,scroll:{y:500},columns:b})})}function Ke({employee:c,month:p,year:g}){const b=[{title:"STT",dataIndex:"groupIndex",key:"index",width:60,render:(t,s)=>t},{title:"Mã khách hàng",dataIndex:"kh_ma",key:"kh_ma"},{title:"Khách hàng",dataIndex:"kh_ten",key:"kh_ten",width:200,render:(t,s)=>e.jsx("div",{children:e.jsx("a",{className:"text-[#212B36]",href:`/app/sales-invoice/${s.kh_ten}`,target:"_blank",children:s.kh_ten})})},{title:"Địa chỉ",dataIndex:"kh_diachi",key:"kh_diachi",render:t=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:t})},{title:"Ngày viếng thăm",dataIndex:"checkin_giovao",key:"checkin_giovao",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:m(t).format("DD/MM/YYYY")})})},{title:"Thời gian checkin",dataIndex:"checkin_giovao",key:"checkin_giovao",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:m(t).format("HH:mm")})})},{title:"Khoảng cách",dataIndex:"checkin_khoangcach",key:"checkin_khoangcach",render:t=>e.jsx("div",{children:parseFloat((t/60).toFixed(2))})}],[r,f]=a.useState(1),d=20,[h,S]=a.useState(0),[y,v]=a.useState([]),k=m(`${g}-${p}-01`).startOf("month"),j=m(`${g}-${p}-01`).add(1,"month").startOf("month").subtract(1,"second"),_=k.unix(),o=j.unix();a.useEffect(()=>()=>{f(1)},[c]),a.useEffect(()=>{(async()=>{const t=await I.get("/api/method/mbw_dms.api.report.kpi.kpi_only_visit_detail",{params:{from_date:_,to_date:o,employee:c,page_size:d,page_number:r}}),{result:s}=t;S(s?.totals),v(l=>r===1?s.data:[...l,...s.data])})()},[_,o,c,r]);const w=be.useMemo(()=>{let t=null,s=0;return y.map(l=>l.kh_ma!==t?(t=l.kh_ma,s++,{...l,groupIndex:s}):{...l,groupIndex:null})},[y]);return e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:w,pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){f(t)}}:!1,scroll:{y:500},columns:b})})}function Pe({employee:c,month:p,year:g}){const b=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,s,l)=>e.jsx("span",{children:w(r,d,l)})},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code"},{title:"Khách hàng",dataIndex:"customer",key:"customer"},{title:"Địa chỉ",dataIndex:"customer_address",key:"customer_address",render:t=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:t})},{title:"Mã đơn hàng",dataIndex:"so_name",key:"so_name"},{title:"Ngày đặt",dataIndex:"trans_date",key:"trans_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:m.unix(t).format("DD/MM/YYYY")})})},{title:"Tông tiền",dataIndex:"grand_total",key:"grand_total",render:t=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(t)})}],[r,f]=a.useState(1),d=20,[h,S]=a.useState(0),[y,v]=a.useState([]),k=m(`${g}-${p}-01`).startOf("month"),j=m(`${g}-${p}-01`).add(1,"month").startOf("month").subtract(1,"second"),_=k.unix(),o=j.unix(),w=(t,s,l)=>(t-1)*s+l+1;return a.useEffect(()=>{(async()=>{const t=await I.get("/api/method/mbw_dms.api.report.kpi.kpi_cus_so_detail",{params:{from_date:_,to_date:o,employee:c,page_size:d,page_number:r}});let{result:s}=t;v(s),S(s?.totals)})()},[_,o,c,r]),a.useEffect(()=>()=>{f(1)},[c]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:y?.data?.map(t=>({key:t.so_name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){f(t)}}:!1,scroll:{y:500},columns:b})})}function Re({employee:c,month:p,year:g}){const b=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,s,l)=>e.jsx("span",{children:w(r,d,l)})},{title:"Mã khách hàng",dataIndex:"customer_code",key:"customer_code"},{title:"Khách hàng",dataIndex:"customer_name",key:"customer_name"},{title:"Địa chỉ",dataIndex:"customer_primary_address",key:"customer_primary_address",render:t=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:t})},{title:"Số điện thoại",dataIndex:"mobile_no",key:"mobile_no"},{title:"Ngày thu thập",dataIndex:"collection_date",key:"collection_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:m.unix(t).format("DD/MM/YYYY")})})},{title:"Nguồn",dataIndex:"nguon",key:"nguon",render:t=>e.jsx("div",{children:t||"-"})}],[r,f]=a.useState(1),d=20,[h,S]=a.useState(0),[y,v]=a.useState([]),k=m(`${g}-${p}-01`).startOf("month"),j=m(`${g}-${p}-01`).add(1,"month").startOf("month").subtract(1,"second"),_=k.unix(),o=j.unix(),w=(t,s,l)=>(t-1)*s+l+1;return a.useEffect(()=>{(async()=>{const t=await I.get("/api/method/mbw_dms.api.report.kpi.kpi_new_cus_detail",{params:{from_date:_,to_date:o,employee:c,page_size:d,page_number:r}});let{result:s}=t;v(s),S(s?.totals)})()},[_,o,c,r]),a.useEffect(()=>()=>{f(1)},[c]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:y?.data?.map(t=>({key:t.customer_name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){f(t)}}:!1,scroll:{y:500},columns:b})})}function Ae({employee:c,month:p,year:g}){const b=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,s,l)=>e.jsx("span",{children:w(r,d,l)})},{title:"Mã đơn hàng",dataIndex:"name",key:"name"},{title:"Khách hàng",dataIndex:"customer",key:"customer"},{title:"Trạng thái",dataIndex:"status",key:"status",render:t=>t==="To Deliver and Bill"?e.jsx("div",{className:"whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#FFAB0014] text-[#FFAB00]",children:"• Chờ vận chuyển và chờ thanh toán"}):t==="To Bill"?e.jsx("div",{className:"whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#8E33FF14] text-[#8E33FF]",children:"• Chờ thanh toán"}):t==="To Deliver"?e.jsx("div",{className:"whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#00B8D914] text-[#00B8D9]",children:"• Chờ vận chuyển"}):t==="Completed"?e.jsx("div",{className:"whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#22C55E14] text-[#22C55E]",children:"• Hoàn thành"}):e.jsx("div",{className:"whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#FF563014] text-[#FF5630]",children:"• Đã hủy"})},{title:"Ngày đặt",dataIndex:"collec_date",key:"collec_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:m.unix(t).format("DD/MM/YYYY")})})}],[r,f]=a.useState(1),d=20,[h,S]=a.useState(0),[y,v]=a.useState([]),k=m(`${g}-${p}-01`).startOf("month"),j=m(`${g}-${p}-01`).add(1,"month").startOf("month").subtract(1,"second"),_=k.unix(),o=j.unix(),w=(t,s,l)=>(t-1)*s+l+1;return a.useEffect(()=>{(async()=>{const t=await I.get("/api/method/mbw_dms.api.report.kpi.kpi_total_so_detail",{params:{from_date:_,to_date:o,employee:c,page_size:d,page_number:r}});let{result:s}=t;v(s),S(s?.totals)})()},[_,o,c,r]),a.useEffect(()=>()=>{f(1)},[c]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:y?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){f(t)}}:!1,scroll:{y:500},columns:b})})}function Le({employee:c,month:p,year:g}){const b=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,s,l)=>e.jsx("span",{children:w(r,d,l)})},{title:"Mã khách hàng",dataIndex:"kh_ma",key:"kh_ma"},{title:"Khách hàng",dataIndex:"kh_ten",key:"kh_ten"},{title:"Địa chỉ",dataIndex:"kh_diachi",key:"kh_diachi",render:t=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:t})},{title:"Ngày viếng thăm",dataIndex:"create_date",key:"create_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:m.unix(t).format("DD/MM/YYYY")})})},{title:"Thời gian checkin",dataIndex:"checkin_giovao",key:"checkin_giovao",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:m(t).format("HH:mm")})})},{title:"Thời gian checkout",dataIndex:"checkin_giora",key:"checkin_giora",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:m(t).format("HH:mm")})})},{title:"Số giờ",dataIndex:"so_gio_lam",key:"so_gio_lam",render:t=>{const[s,l,F]=t?.split(":").map(Number);return e.jsx("div",{children:(s+l/60+F/3600).toFixed(2)})}}],[r,f]=a.useState(1),d=20,[h,S]=a.useState(0),[y,v]=a.useState([]),k=m(`${g}-${p}-01`).startOf("month"),j=m(`${g}-${p}-01`).add(1,"month").startOf("month").subtract(1,"second"),_=k.unix(),o=j.unix(),w=(t,s,l)=>(t-1)*s+l+1;return a.useEffect(()=>{(async()=>{const t=await I.get("/api/method/mbw_dms.api.report.kpi.kpi_time_work_detail",{params:{from_date:_,to_date:o,employee:c,page_size:d,page_number:r}});let{result:s}=t;v(s),S(s?.totals)})()},[_,o,c,r]),a.useEffect(()=>()=>{f(1)},[c]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:y?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){f(t)}}:!1,scroll:{y:500},columns:b})})}function Ge({employee:c,month:p,year:g}){const b=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,s,l)=>e.jsx("span",{children:w(r,d,l)})},{title:"Mã đơn đặt",dataIndex:"name",key:"name"},{title:"Khách hàng",dataIndex:"customer",key:"customer"},{title:"Ngày đặt",dataIndex:"create_date",key:"create_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:m.unix(t).format("DD/MM/YYYY")})})},{title:"Số lượng",dataIndex:"totak_sku",key:"totak_sku",render:t=>e.jsx("div",{className:"!text-right",children:t})}],[r,f]=a.useState(1),d=20,[h,S]=a.useState(0),[y,v]=a.useState([]),k=m(`${g}-${p}-01`).startOf("month"),j=m(`${g}-${p}-01`).add(1,"month").startOf("month").subtract(1,"second"),_=k.unix(),o=j.unix(),w=(t,s,l)=>(t-1)*s+l+1;return a.useEffect(()=>{(async()=>{const t=await I.get("/api/method/mbw_dms.api.report.kpi.kpi_so_sku_detail",{params:{from_date:_,to_date:o,employee:c,page_size:d,page_number:r}});let{result:s}=t;v(s),S(s?.totals)})()},[_,o,c,r]),a.useEffect(()=>()=>{f(1)},[c]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:y?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){f(t)}}:!1,scroll:{y:500},columns:b})})}function Ze({employee:c,month:p,year:g}){const b=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,s,l)=>e.jsx("span",{children:w(r,d,l)})},{title:"Mã đơn đặt",dataIndex:"name",key:"name"},{title:"Khách hàng",dataIndex:"customer",key:"customer"},{title:"Ngày đặt",dataIndex:"create_date",key:"create_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:m.unix(t).format("DD/MM/YYYY")})})},{title:"Số lượng",dataIndex:"total_qty",key:"total_qty",render:t=>e.jsx("div",{className:"!text-right",children:t})}],[r,f]=a.useState(1),d=20,[h,S]=a.useState(0),[y,v]=a.useState([]),k=m(`${g}-${p}-01`).startOf("month"),j=m(`${g}-${p}-01`).add(1,"month").startOf("month").subtract(1,"second"),_=k.unix(),o=j.unix(),w=(t,s,l)=>(t-1)*s+l+1;return a.useEffect(()=>{(async()=>{const t=await I.get("/api/method/mbw_dms.api.report.kpi.kpi_so_qty_detail",{params:{from_date:_,to_date:o,employee:c,page_size:d,page_number:r}});let{result:s}=t;v(s),S(s?.totals)})()},[_,o,c,r]),a.useEffect(()=>()=>{f(1)},[c]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:y?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){f(t)}}:!1,scroll:{y:500},columns:b})})}function Be({employee:c,month:p,year:g}){const b=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,s,l)=>e.jsx("span",{children:w(r,d,l)})},{title:"Mã đơn hàng",dataIndex:"name",key:"name"},{title:"Khách hàng",dataIndex:"customer",key:"customer"},{title:"Ngày đặt",dataIndex:"collec_date",key:"collec_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:m.unix(t).format("DD/MM/YYYY")})})},{title:"Tông tiền",dataIndex:"grand_total",key:"grand_total",render:t=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(t)})}],[r,f]=a.useState(1),d=20,[h,S]=a.useState(0),[y,v]=a.useState([]),k=m(`${g}-${p}-01`).startOf("month"),j=m(`${g}-${p}-01`).add(1,"month").startOf("month").subtract(1,"second"),_=k.unix(),o=j.unix(),w=(t,s,l)=>(t-1)*s+l+1;return a.useEffect(()=>{(async()=>{const t=await I.get("/api/method/mbw_dms.api.report.kpi.kpi_si_amount_detail",{params:{from_date:_,to_date:o,employee:c,page_size:d,page_number:r}});let{result:s}=t;v(s),S(s?.totals)})()},[_,o,c,r]),a.useEffect(()=>()=>{f(1)},[c]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:y?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){f(t)}}:!1,scroll:{y:500},columns:b})})}function Ve({employee:c,month:p,year:g}){const b=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(t,s,l)=>e.jsx("span",{children:w(r,d,l)})},{title:"Mã đơn hàng",dataIndex:"name",key:"name"},{title:"Khách hàng",dataIndex:"customer",key:"customer"},{title:"Ngày đặt",dataIndex:"collec_date",key:"collec_date",render:t=>e.jsx(e.Fragment,{children:e.jsx("div",{children:m.unix(t).format("DD/MM/YYYY")})})},{title:"Tông tiền",dataIndex:"grand_total",key:"grand_total",render:t=>e.jsx("div",{className:"!text-right",children:Intl.NumberFormat().format(t)})}],[r,f]=a.useState(1),d=20,[h,S]=a.useState(0),[y,v]=a.useState([]),k=m(`${g}-${p}-01`).startOf("month"),j=m(`${g}-${p}-01`).add(1,"month").startOf("month").subtract(1,"second"),_=k.unix(),o=j.unix(),w=(t,s,l)=>(t-1)*s+l+1;return a.useEffect(()=>{(async()=>{const t=await I.get("/api/method/mbw_dms.api.report.kpi.kpi_so_amount_detail",{params:{from_date:_,to_date:o,employee:c,page_size:d,page_number:r}});let{result:s}=t;v(s),S(s?.totals)})()},[_,o,c,r]),a.useEffect(()=>()=>{f(1)},[c]),e.jsx(e.Fragment,{children:e.jsx(N,{bordered:!0,$border:!0,dataSource:y?.data?.map(t=>({key:t.name,...t})),pagination:h&&h>d?{pageSize:d,showSizeChanger:!1,total:h,current:r,onChange(t){f(t)}}:!1,scroll:{y:500},columns:b})})}const{Column:u,ColumnGroup:C}=N,We=m().month()+1,ae=We.toString(),Qe=m().format("YYYY");function qe(){const[c,p]=a.useState([]),[g,b]=a.useState([]),[r,f]=a.useState(),[d,h]=a.useState(""),[S,y]=a.useState();let v=Oe(d);const[k,j]=a.useState(1),_=20,[o,w]=a.useState([]),[t,s]=a.useState(ae),[l,F]=a.useState(Qe),[O,se]=a.useState(0),E=a.useRef(null),$=Me(),[le,re]=a.useState(0),[ie,oe]=a.useState($?.h*.52),[de,ce]=a.useState(!1),he=(i,n,D)=>(i-1)*n+D+1,[Y,B]=a.useState({open:!1,id:null}),[z,V]=a.useState({open:!1,id:null}),[H,W]=a.useState({open:!1,id:null}),[K,Q]=a.useState({open:!1,id:null}),[P,q]=a.useState({open:!1,id:null}),[R,U]=a.useState({open:!1,id:null}),[A,X]=a.useState({open:!1,id:null}),[L,J]=a.useState({open:!1,id:null}),[G,ee]=a.useState({open:!1,id:null}),[Z,te]=a.useState({open:!1,id:null}),me=()=>{B({open:!1,id:null})},xe=()=>{V({open:!1,id:null})},_e=()=>{W({open:!1,id:null})},ue=()=>{Q({open:!1,id:null})},pe=()=>{q({open:!1,id:null})},ge=()=>{U({open:!1,id:null})},fe=()=>{X({open:!1,id:null})},ke=()=>{te({open:!1,id:null})},je=()=>{J({open:!1,id:null})},ye=()=>{ee({open:!1,id:null})};a.useEffect(()=>{oe($.h*.52)},[$]),a.useEffect(()=>{const i=E.current;if(i){const n=new ResizeObserver(D=>{for(let ve of D)re(ve.contentRect.height)});return n.observe(i),()=>n.disconnect()}},[E]);const Se=i=>{F(i?.$y.toString())};return a.useEffect(()=>{(async()=>{let i=await I.get("/api/method/mbw_dms.api.router.get_team_sale");b(we({data:i.result.map(n=>({title:n.name,value:n.name,...n})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),a.useEffect(()=>{(async()=>{let i=await I.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:r,key_search:v}}),{message:n}=i;p(n.map(D=>({value:D.employee_code,label:D.employee_name||D.employee_code})))})()},[r,v]),a.useEffect(()=>{(async()=>{const i=await I.get("/api/method/mbw_dms.api.report.kpi.kpi_report",{params:{page_size:_,page_number:k,month:t,year:l,sales_team:r,employee:S}});w(i?.result),se(i?.result?.totals)})()},[t,l,r,S,k,de]),e.jsx(e.Fragment,{children:e.jsx(Fe,{header:e.jsx(Ie,{title:"Báo cáo KPI",buttons:[{icon:e.jsx($e,{className:"text-xl"}),size:"18px",className:"flex mr-2 ",action:()=>{ce(i=>!i)}},{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(Ye,{className:"text-xl"}),size:"18px",className:"flex items-center",action:Ne.bind(null,{url:"/api/method/mbw_dms.api.exports.export_excel.export_excel",params:{report_type:"Report KPI",data_filter:{month:t,year:l}},file_name:"Report KPI.xlsx"})}]}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(Te,{className:"px-4 flex-auto",gutter:[8,8],children:[e.jsx(M,{span:4,children:e.jsx(ne,{className:"!bg-[#F4F6F8]",defaultValue:ae,options:ze,onChange:i=>{s(i),j(1)}})}),e.jsx(M,{span:4,children:e.jsx(Ee,{className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:Se,placeholder:"Chọn năm",picker:"year",allowClear:!1,defaultValue:m().startOf("year")})}),e.jsx(M,{span:4,children:e.jsx(Ce,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:g,onChange:i=>{f(i),j(1)},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),e.jsx(M,{span:4,children:e.jsx(ne,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:i=>{h(i)},options:c,onSelect:i=>{y(i),j(1)},onClear:()=>{y("")}})})]}),e.jsx("div",{ref:E,className:"pt-5",children:e.jsxs(N,{dataSource:o?.data?.map(i=>({key:i.name,...i})),bordered:!0,scroll:{x:"max-content",y:le<400?void 0:ie},pagination:O&&O>_?{pageSize:_,showSizeChanger:!1,total:O,current:k,onChange(i){j(i)}}:!1,summary:()=>e.jsxs(x.Summary.Row,{children:[e.jsx(x.Summary.Cell,{index:0}),e.jsx(x.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(x.Summary.Cell,{index:2}),e.jsx(x.Summary.Cell,{index:3}),e.jsx(x.Summary.Cell,{index:4,className:"text-center",children:o?.sum?.tong_kh_vt}),e.jsx(x.Summary.Cell,{index:5,className:"text-center",children:o?.sum?.tong_th_vt}),e.jsx(x.Summary.Cell,{index:6}),e.jsx(x.Summary.Cell,{index:7,className:"text-center",children:o?.sum?.tong_kh_vt_dn}),e.jsx(x.Summary.Cell,{index:8,className:"text-center",children:o?.sum?.tong_th_vt_dn}),e.jsx(x.Summary.Cell,{index:9}),e.jsx(x.Summary.Cell,{index:10,className:"text-center",children:o?.sum?.tong_kh_dat_hang}),e.jsx(x.Summary.Cell,{index:11,className:"text-center",children:o?.sum?.tong_th_dat_hang}),e.jsx(x.Summary.Cell,{index:12}),e.jsx(x.Summary.Cell,{index:13,className:"text-center",children:o?.sum?.tong_kh_kh_moi}),e.jsx(x.Summary.Cell,{index:14,className:"text-center",children:o?.sum?.tong_th_kh_moi}),e.jsx(x.Summary.Cell,{index:15}),e.jsx(x.Summary.Cell,{index:16,className:"text-center",children:o?.sum?.tong_kh_don_hang}),e.jsx(x.Summary.Cell,{index:17,className:"text-center",children:o?.sum?.tong_th_don_hang}),e.jsx(x.Summary.Cell,{index:18}),e.jsx(x.Summary.Cell,{index:19,className:"text-center",children:Intl.NumberFormat().format(o?.sum?.tong_kh_doanh_so)}),e.jsx(x.Summary.Cell,{index:20,className:"text-center",children:Intl.NumberFormat().format(o?.sum?.tong_th_doanh_so)}),e.jsx(x.Summary.Cell,{index:21}),e.jsx(x.Summary.Cell,{index:22,className:"text-center",children:Intl.NumberFormat().format(o?.sum?.tong_kh_doanh_thu)}),e.jsx(x.Summary.Cell,{index:23,className:"text-center",children:Intl.NumberFormat().format(o?.sum?.tong_th_doanh_thu)}),e.jsx(x.Summary.Cell,{index:24}),e.jsx(x.Summary.Cell,{index:25,className:"text-center",children:o?.sum?.tong_kh_san_lg}),e.jsx(x.Summary.Cell,{index:26,className:"text-center",children:o?.sum?.tong_th_san_lg}),e.jsx(x.Summary.Cell,{index:27}),e.jsx(x.Summary.Cell,{index:28,className:"text-center",children:o?.sum?.tong_kh_sku}),e.jsx(x.Summary.Cell,{index:29,className:"text-center",children:o?.sum?.tong_th_sku}),e.jsx(x.Summary.Cell,{index:30}),e.jsx(x.Summary.Cell,{index:31,className:"text-center",children:o?.sum?.tong_kh_so_gio_lam_viec}),e.jsx(x.Summary.Cell,{index:32,className:"text-center",children:(Number(o?.sum?.tong_th_so_gio_lam_viec)||0).toFixed(2)}),e.jsx(x.Summary.Cell,{index:33})]}),children:[e.jsx(u,{title:"STT",dataIndex:"stt",fixed:"left",className:"!text-center",width:60,render:(i,n,D)=>e.jsx("span",{children:he(k,_,D)})},"stt"),e.jsx(u,{title:"Mã Nhân viên",dataIndex:"nhan_vien_ban_hang",fixed:"left",render:(i,n)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"!min-w-[130px]",children:n.nhan_vien_ban_hang})})},"nhan_vien_ban_hang"),e.jsx(u,{title:"Nhân viên",dataIndex:"ten_nv",fixed:"left",render:(i,n)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"!min-w-[200px]",children:n.ten_nv})})},"ten_nv"),e.jsx(u,{title:"Nhóm bán hàng",dataIndex:"nhom_ban_hang",render:(i,n)=>e.jsx("div",{children:n.nhom_ban_hang})},"nhom_ban_hang"),e.jsxs(C,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số lượt viếng thăm",children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_vt"},"kh_vt"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_vt",render:(i,n)=>e.jsx("div",{onClick:()=>{B({open:!0,id:{employee:n?.nhan_vien_ban_hang,name_employee:n?.ten_nv}})},children:n?.kpi_month?n?.kpi_month?.th_vt:0})},"th_vt"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_vt",render:(i,n)=>e.jsxs(e.Fragment,{children:[n.tl_vt,"%"]})},"tl_vt")]}),e.jsxs(C,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng viếng thăm",children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_vt_dn"},"kh_vt_dn"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_vt_dn",render:(i,n)=>e.jsx("div",{onClick:()=>{V({open:!0,id:{employee:n?.nhan_vien_ban_hang,name_employee:n?.ten_nv}})},children:n?.kpi_month?n?.kpi_month?.th_vt_dn:0})},"th_vt_dn"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_vt_dn",render:(i,n)=>e.jsxs(e.Fragment,{children:[n.tl_vt_dn,"%"]})},"tl_vt_dn")]}),e.jsxs(C,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng đặt hàng",children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_dat_hang"},"kh_dat_hang"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_dat_hang",render:(i,n)=>e.jsx("div",{onClick:()=>{W({open:!0,id:{employee:n?.nhan_vien_ban_hang,name_employee:n?.ten_nv}})},children:n?.kpi_month?n?.kpi_month?.th_dat_hang:0})},"th_dat_hang"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_dat_hang",render:(i,n)=>e.jsxs(e.Fragment,{children:[n.tl_dat_hang,"%"]})},"tl_dat_hang")]}),e.jsxs(C,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng thêm mới",children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_kh_moi"},"kh_kh_moi"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_kh_moi",render:(i,n)=>e.jsx("div",{onClick:()=>{Q({open:!0,id:{employee:n?.nhan_vien_ban_hang,name_employee:n?.ten_nv}})},children:n?.kpi_month?n?.kpi_month?.th_kh_moi:0})},"th_kh_moi"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_kh_moi",render:(i,n)=>e.jsxs(e.Fragment,{children:[n.tl_kh_moi,"%"]})},"tl_kh_moi")]}),e.jsxs(C,{className:"!whitespace-normal",title:"Số đơn hàng",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_don_hang"},"kh_don_hang"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_don_hang",render:(i,n)=>e.jsx("div",{onClick:()=>{q({open:!0,id:{employee:n?.nhan_vien_ban_hang,name_employee:n?.ten_nv}})},children:n?.kpi_month?n?.kpi_month?.th_don_hang:0})},"th_don_hang"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_don_hang",render:(i,n)=>e.jsxs(e.Fragment,{children:[n.tl_don_hang,"%"]})},"tl_don_hang")]}),e.jsxs(C,{className:"!whitespace-normal",title:"Doanh số (VNĐ)",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",dataIndex:"kh_doanh_so",render:(i,n)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(n.kh_doanh_so)})},"kh_doanh_so"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_doanh_so",render:(i,n)=>e.jsx("div",{onClick:()=>{U({open:!0,id:{employee:n?.nhan_vien_ban_hang,name_employee:n?.ten_nv}})},children:n?.kpi_month?Intl.NumberFormat().format(n?.kpi_month?.th_doanh_so):0})},"th_doanh_so"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_don_hang",render:(i,n)=>e.jsxs(e.Fragment,{children:[n.tl_don_hang,"%"]})},"tl_don_hang")]}),e.jsxs(C,{className:"!whitespace-normal",title:"Doanh thu (VNĐ)",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_doanh_thu",render:(i,n)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(n.kh_doanh_thu)})},"kh_doanh_thu"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_doanh_thu",render:(i,n)=>e.jsx("div",{onClick:()=>{X({open:!0,id:{employee:n?.nhan_vien_ban_hang,name_employee:n?.ten_nv}})},children:n?.kpi_month?Intl.NumberFormat().format(n?.kpi_month?.th_doanh_thu):0})},"th_doanh_thu"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_doanh_thu",render:(i,n)=>e.jsxs(e.Fragment,{children:[n.tl_doanh_thu,"%"]})},"tl_doanh_thu")]}),e.jsxs(C,{className:"!whitespace-normal",title:"Sản lượng",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_san_lg"},"kh_san_lg"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_san_lg",render:(i,n)=>e.jsx("div",{onClick:()=>{J({open:!0,id:{employee:n?.nhan_vien_ban_hang,name_employee:n?.ten_nv}})},children:n?.kpi_month?n?.kpi_month?.th_san_lg:0})},"th_san_lg"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_san_luong",render:(i,n)=>e.jsxs(e.Fragment,{children:[n.tl_san_luong,"%"]})},"tl_san_luong")]}),e.jsxs(C,{className:"!whitespace-normal",title:"SKU",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_sku"},"kh_sku"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_sku",render:(i,n)=>e.jsx("div",{onClick:()=>{ee({open:!0,id:{employee:n?.nhan_vien_ban_hang,name_employee:n?.ten_nv}})},children:n?.kpi_month?n?.kpi_month?.th_sku:0})},"th_sku"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_sku",render:(i,n)=>e.jsxs(e.Fragment,{children:[n.tl_sku,"%"]})},"tl_sku")]}),e.jsxs(C,{className:"!whitespace-normal",title:"Số giờ làm việc",width:210,children:[e.jsx(u,{className:"!text-center",title:"KH",width:70,dataIndex:"kh_so_gio_lam_viec"},"kh_so_gio_lam_viec"),e.jsx(u,{className:"!text-center underline text-[#1877F2]",title:"TH",width:70,dataIndex:"th_so_gio_lam_viec",render:(i,n)=>e.jsx("div",{onClick:()=>{te({open:!0,id:{employee:n?.nhan_vien_ban_hang,name_employee:n?.ten_nv}})},children:n?.kpi_month?.th_so_gio_lam_viec?(n?.kpi_month?.th_so_gio_lam_viec).toFixed(2):0})},"th_so_gio_lam_viec"),e.jsx(u,{className:"!text-center",title:"TL",width:70,dataIndex:"tl_so_gio_lam_viec",render:(i,n)=>e.jsxs(e.Fragment,{children:[n.tl_so_gio_lam_viec,"%"]})},"tl_so_gio_lam_viec")]})]})}),e.jsx(T,{title:e.jsxs("div",{className:"font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4",children:["Số khách hàng viếng thăm - ",Y.id?.name_employee]}),open:Y.open,onCancel:me,footer:!1,width:1120,children:e.jsx(He,{employee:Y.id?.employee,month:t,year:l})}),e.jsx(T,{title:e.jsxs("div",{className:"font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4",children:["Số khách hàng viếng thăm -"," ",z.id?.name_employee]}),open:z.open,onCancel:xe,footer:!1,width:1120,children:e.jsx(Ke,{employee:z.id?.employee,month:t,year:l})}),e.jsx(T,{title:e.jsxs("div",{className:"font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4",children:["Số khách hàng đặt hàng - ",H.id?.name_employee]}),open:H.open,onCancel:_e,footer:!1,width:1120,children:e.jsx(Pe,{employee:H.id?.employee,month:t,year:l})}),e.jsx(T,{title:e.jsxs("div",{className:"font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4",children:["Số khách hàng thêm mới - ",K.id?.name_employee]}),open:K.open,onCancel:ue,footer:!1,width:1120,children:e.jsx(Re,{employee:K.id?.employee,month:t,year:l})}),e.jsx(T,{title:e.jsxs("div",{className:"font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4",children:["Số đơn hàng - ",P.id?.name_employee]}),open:P.open,onCancel:pe,footer:!1,width:1120,children:e.jsx(Ae,{employee:P.id?.employee,month:t,year:l})}),e.jsx(T,{title:e.jsxs("div",{className:"font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4",children:["Doanh số - ",R.id?.name_employee]}),open:R.open,onCancel:ge,footer:!1,width:1120,children:e.jsx(Ve,{employee:R.id?.employee,month:t,year:l})}),e.jsx(T,{title:e.jsxs("div",{className:"font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4",children:["Doanh thu - ",A.id?.name_employee]}),open:A.open,onCancel:fe,footer:!1,width:1120,children:e.jsx(Be,{employee:A.id?.employee,month:t,year:l})}),e.jsx(T,{title:e.jsxs("div",{className:"font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4",children:["Sản lượng - ",L.id?.name_employee]}),open:L.open,onCancel:je,footer:!1,width:1120,children:e.jsx(Ze,{employee:L.id?.employee,month:t,year:l})}),e.jsx(T,{title:e.jsxs("div",{className:"font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4",children:["SKU - ",G.id?.name_employee]}),open:G.open,onCancel:ye,footer:!1,width:1120,children:e.jsx(Ge,{employee:G.id?.employee,month:t,year:l})}),e.jsx(T,{title:e.jsxs("div",{className:"font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4",children:["Số giờ làm việc - ",Z.id?.name_employee]}),open:Z.open,onCancel:ke,footer:!1,width:1120,children:e.jsx(Le,{employee:Z.id?.employee,month:t,year:l})})]})})})}function st(){return e.jsxs(e.Fragment,{children:[e.jsx(De,{children:e.jsx("title",{children:" ReportKPI"})}),e.jsx(qe,{})]})}export{st as default};