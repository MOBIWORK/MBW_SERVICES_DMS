import{Y as s,a2 as T,L as e,ac as F,V as p,R as b,P as C,bv as M,ae as Y}from"./index-E40HVbfZ.js";import"https://cdn.jsdelivr.net/npm/nats.ws@1.29.2/+esm";import{C as z}from"./index-OzPQMM2e.js";import{u as H}from"./index-f3lyoCrI.js";import{M as R}from"./ModalCheckin-SUaX7mJg.js";import{D as G}from"./Detailmodal-aOWdwDHp.js";import{D as $}from"./dropDownFilter-ouKOAKME.js";import{a as A,u as D,P as S,m as B}from"./useMediaQuery-bDDfLuFG.js";import{R as Q,F as Z}from"./ReportHeader-X3w6UjQ0.js";import"./index.esm-kaMGh6ns.js";import"./data-u-VkVTNg.js";import"./index-kmDtfIGN.js";import"./VerticalAlignBottomOutlined-VVHVyquw.js";function L({employee:u,timeCheckin:_,checkin_note_id:l,from_date:w,to_date:j,time_slot:g}){const o=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(i,a,x)=>x+1},{title:"Mã khách hàng",dataIndex:"kh_ma",key:"kh_ma"},{title:"Khách hàng",dataIndex:"kh_ten",key:"kh_ten"},{title:"Địa chỉ",dataIndex:"kh_diachi",key:"kh_diachi",render:i=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:i})},{title:"Ngày viếng thăm",dataIndex:"checkin_giovao",key:"checkin_giovao",render:i=>e.jsx(e.Fragment,{children:e.jsx("div",{children:p(i).format("DD/MM/YYYY")})})},{title:"Thời gian checkin",dataIndex:"checkin_giovao",key:"checkin_giovao",render:i=>e.jsx(e.Fragment,{children:e.jsx("div",{children:p(i).format("HH:mm")})})},{title:e.jsx("div",{className:"text-center",children:"Ghi chú"}),dataIndex:"",key:"",render:i=>e.jsx("div",{className:"text-blue-600 underline underline-offset-4 text-center",onClick:()=>{v({open:!0,id:l})},children:"Xem chi tiết"})}],[r,m]=s.useState(1),d=20,[c,k]=s.useState(0),[y,f]=s.useState([]),[h,v]=s.useState({open:!1,id:null}),N=()=>{v({open:!1,id:null})};return s.useEffect(()=>{(async()=>{const i=await T.get("/api/method/mbw_dms.api.report.kpi.kpi_visit_detail",{params:{time_checkin:_,employee:u,page_size:d,page_number:r,from_date:w,to_date:j,time_slot:g}});let{result:a}=i;f(a),k(a?.totals)})()},[_,u,r,g]),e.jsxs(e.Fragment,{children:[e.jsx(F,{bordered:!0,$border:!0,dataSource:y?.data?.map(i=>({key:i.name,...i})),pagination:c&&c>d?{pageSize:d,showSizeChanger:!1,total:c,current:r,onChange(i){m(i)}}:!1,scroll:{y:300},columns:o}),e.jsx(R,{title:e.jsx("div",{className:"font-bold text-lg leading-7 text-[#212B36] p-4",children:"Ghi chú"}),open:h.open,onCancel:N,footer:!1,width:800,children:e.jsx(G,{id:h.id})})]})}function X(){const[u,_]=s.useState(!1),[l,w]=s.useState(0),[j,g]=s.useState([]),[o,r]=s.useState(1),m=A(`${B}`),{startDate:d,endDate:c}=D(t=>t.date),{sales_team:k,employee:y,customer_type:f,customer_group:h,territory:v}=D(t=>t.group),{curentMonth:N,currentYear:i}=D(t=>t.month),[a,x]=s.useState({open:!1,id:null}),E=s.useRef(null),P=H(),K=()=>{x({open:!1,id:null})},V=[{title:e.jsx("div",{className:"",children:"STT"}),dataIndex:"stt",key:"stt",render:(t,n,I)=>I+1},{title:e.jsx("div",{children:"Nhóm bán hàng"}),dataIndex:"nhom_ban_hang",width:100,key:"nhom_ban_hang",render:(t,n,I)=>e.jsx("div",{className:"min-w-[100px]",children:t})},{title:e.jsx("div",{children:"Mã nhân viên"}),dataIndex:"employee_code",key:"employee_code",width:100,render:(t,n,I)=>e.jsx("div",{className:"min-w-[140px]",children:t})},{title:e.jsx("div",{children:"Tên nhân viên"}),dataIndex:"employee_name",width:100,key:"employee_name"},{title:e.jsx("div",{className:"text-center min-w-[80px]",children:"Ngày"}),dataIndex:"create_time",width:100,key:"create_time",render:t=>e.jsx("div",{children:t?p.unix(t).format("DD/MM/YYYY"):e.jsx("div",{className:"min-w-[40px] text-center",children:"-"})})},{title:e.jsx("div",{className:"text-center",children:"Checkin đầu ngày"}),dataIndex:"checkin_daungay",key:"checkin_daungay",width:100,render:t=>e.jsx("div",{className:"min-w-[120px] text-center",children:t?p(t).format("HH:mm"):e.jsx("div",{children:"-"})})},{title:e.jsx("div",{className:"text-center",children:"Checkin cuối ngày"}),dataIndex:"checkin_cuoingay",key:"checkin_cuoingay",width:100,render:t=>e.jsx("div",{className:"min-w-[120px] text-center",children:t?p(t).format("HH:mm"):e.jsx("div",{children:"-"})})},{title:e.jsx("div",{className:"text-center",children:"Khách hàng VT"}),dataIndex:"customers",key:"customers",width:100,render:t=>e.jsx("div",{className:"!text-center min-w-[120px] ",children:t?t.length:0})},{title:e.jsx("div",{className:"text-center",children:"Khách hàng VT sáng"}),dataIndex:"checkin_sang",key:"checkin_sang",width:100,render:(t,n)=>e.jsx("div",{className:"!text-center underline underline-offset-4 text-blue-600 min-w-[130px] ",onClick:()=>{x({open:!0,id:{checkin_note_id:n?.checkin_note_id,time:"sáng",timeCheckin:n?.create_time,employee:n?.employee_code,name_employee:n?.employee_name,...M({timestamp:n.create_time})}})},children:t||e.jsx("div",{className:"min-w-[40px]",children:"0"})})},{title:e.jsx("div",{className:"text-center",children:"Khách hàng VT chiều"}),dataIndex:"checkin_chieu",key:"checkin_chieu",width:100,render:(t,n)=>e.jsx("div",{className:"!text-center underline underline-offset-4 text-blue-600 min-w-[130px]",onClick:()=>{x({open:!0,id:{time:"chiều",checkin_note_id:n?.checkin_note_id,timeCheckin:n?.create_time,employee:n?.employee_code,name_employee:n?.employee_name,...M({timestamp:n.create_time})}})},children:t||e.jsx("div",{className:"min-w-[40px] underline-none ",children:"0"})})},{title:e.jsx("div",{className:"text-center",children:"Số km VT"}),dataIndex:"total_distance",key:"total_distance",width:100,render:t=>e.jsx("div",{className:"!text-center min-w-[100px]",children:t?t.toFixed(2):e.jsx("div",{className:"min-w-[40px]",children:"-"})})},{title:e.jsx("div",{className:"text-center",children:"Số đơn hàng"}),dataIndex:"total_donhang",key:"total_donhang",width:100,render:t=>e.jsx("div",{className:"!text-center min-w-[100px]",children:t||e.jsx("div",{className:"min-w-[40px]",children:"-"})})},{title:e.jsx("div",{className:"text-center",children:"Ảnh chụp"}),dataIndex:"total_anhchup",key:"total_anhchup",width:100,render:(t,n)=>e.jsx("div",{className:"!text-center min-w-[100px]",children:n&&n?.customers?n?.customers[0]?.total_image:e.jsx("div",{className:"min-w-[40px]",children:"-"})})},{title:e.jsx("div",{className:"text-center",children:"Doanh số"}),dataIndex:"total_doanhso",key:"total_doanhso",width:100,render:t=>e.jsx("div",{className:"!text-center min-w-[100px]",children:t?Intl.NumberFormat().format(t):e.jsx("div",{className:"min-w-[40px]",children:"-"})})},{title:e.jsx("div",{className:"text-center",children:"Doanh thu"}),dataIndex:"total_doanhthu",key:"total_doanhthu",width:100,render:t=>e.jsx("div",{className:"!text-center min-w-[100px]",children:t?Intl.NumberFormat().format(t):e.jsx("div",{className:"min-w-[40px]",children:"-"})})}];return s.useEffect(()=>{(async()=>{const t=await T.get("/api/method/mbw_dms.api.report.visitor_kpi.report_visitor_kpi",{params:{page_size:S,page_number:o,from_date:d,to_date:c,employee:y,sales_team:k,territory:v,customer_group:h,customer_type:f}});let{result:n}=t;g(n),w(n?.totals)})()},[o,d,c,u,k,y,h,f]),e.jsx(e.Fragment,{children:e.jsx(z,{header:e.jsx(Q,{setRefresh:_,title:"Báo cáo tổng hợp Viếng thăm - KPI",params:{params:{report_type:"Report Visitor_KPI",data_filter:{month:N,year:i}}},file_name:"ReportVisitor_KPI.xlsx"}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7  border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsx(b,{gutter:[16,16],className:`flex ${m?"justify-end":"justify-between"} items-center w-full`,children:m?e.jsx(C,{className:"!ml-4",children:e.jsx($,{inputFromDate:!0,inputToDate:!0,inputSaleGroup:!0,inputEmployee:!0,setPage:r,matchMedia:!m})}):e.jsx(C,{className:"ml-4 w-[78%]",children:e.jsx(b,{gutter:[8,8],className:"space-x-4",children:e.jsx(Z,{setPage:r,inputFromDate:!0,inputToDate:!0,inputSaleGroup:!0,inputEmployee:!0})})})}),e.jsx("div",{ref:E,className:"pt-5",children:e.jsx(F,{bordered:!0,$border:!0,dataSource:j?.data?.map(t=>({key:t.create_time.toString(),...t})),pagination:l&&l>S?{pageSize:S,showSizeChanger:!1,total:l,current:o,onChange(t){r(t)}}:!1,scroll:{x:!0,y:j?.data?.length>0?P?.h*.55:void 0},columns:V})}),e.jsx(R,{title:e.jsxs("div",{className:"font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4",children:["Khách hàng viếng thăm ",a.id?.time]}),open:a.open,onCancel:K,footer:!1,width:1120,children:e.jsx(L,{checkin_note_id:a.id?.checkin_note_id,employee:a.id?.employee,timeCheckin:a.id?.timeCheckin,from_date:a.id?.from_date,to_date:a.id?.to_date,time_slot:a.id?.time})})]})})})}function ce(){return e.jsxs(e.Fragment,{children:[e.jsx(Y,{children:e.jsx("title",{children:" ReportVisitorSummary_KPI"})}),e.jsx(X,{})]})}export{ce as default};
