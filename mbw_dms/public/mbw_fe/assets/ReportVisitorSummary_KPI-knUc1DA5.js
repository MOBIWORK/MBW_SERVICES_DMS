import{Y as i,a1 as b,L as e,ab as C,V as u,R as D,P as S,ad as V}from"./index-_fSRyvbm.js";import{u as Y,C as z}from"./index-UmN6nabM.js";import{M as T}from"./ModalCheckin-Y_4t6VY1.js";import{D as H}from"./Detailmodal-ZE_OGq-S.js";import{a as G,u as w,P as I,R as $,F as A,D as B,m as Q}from"./ReportHeader-JHA31996.js";import"./index-k4yDlx99.js";import"./index.esm-7GjupZsE.js";import"./data-u-VkVTNg.js";import"./VerticalAlignBottomOutlined-rSEbghYe.js";function Z({employee:p,timeCheckin:_,checkin_note_id:d}){const y=[{title:"STT",dataIndex:"stt",key:"stt",width:60,render:(n,m,f)=>f+1},{title:"Mã khách hàng",dataIndex:"kh_ma",key:"kh_ma"},{title:"Khách hàng",dataIndex:"kh_ten",key:"kh_ten"},{title:"Địa chỉ",dataIndex:"kh_diachi",key:"kh_diachi",render:n=>e.jsx("div",{className:"truncate hover:whitespace-normal",children:n})},{title:"Ngày viếng thăm",dataIndex:"checkin_giovao",key:"checkin_giovao",render:n=>e.jsx(e.Fragment,{children:e.jsx("div",{children:u(n).format("DD/MM/YYYY")})})},{title:"Thời gian checkin",dataIndex:"checkin_giovao",key:"checkin_giovao",render:n=>e.jsx(e.Fragment,{children:e.jsx("div",{children:u(n).format("HH:mm")})})},{title:e.jsx("div",{className:"text-center",children:"Ghi chú"}),dataIndex:"",key:"",render:n=>e.jsx("div",{className:"text-blue-600 underline underline-offset-4 text-center",onClick:()=>{h({open:!0,id:d})},children:"Xem chi tiết"})}],[c,v]=i.useState(1),s=20,[r,l]=i.useState(0),[j,g]=i.useState([]),[o,h]=i.useState({open:!1,id:null}),k=()=>{h({open:!1,id:null})};return i.useEffect(()=>{(async()=>{const n=await b.get("/api/method/mbw_dms.api.report.kpi.kpi_visit_detail",{params:{time_checkin:_,employee:p,page_size:s,page_number:c}});let{result:m}=n;g(m),l(m?.totals)})()},[_,p,c]),e.jsxs(e.Fragment,{children:[e.jsx(C,{bordered:!0,$border:!0,dataSource:j?.data?.map(n=>({key:n.name,...n})),pagination:r&&r>s?{pageSize:s,showSizeChanger:!1,total:r,current:c,onChange(n){v(n)}}:!1,scroll:{y:300},columns:y}),e.jsx(T,{title:e.jsx("div",{className:"font-bold text-lg leading-7 text-[#212B36] p-4",children:"Ghi chú"}),open:o.open,onCancel:k,footer:!1,width:800,children:e.jsx(H,{id:o.id})})]})}function L(){const[p,_]=i.useState(!1),[d,y]=i.useState(0),[c,v]=i.useState([]),[s,r]=i.useState(1),l=G(`${Q}`),{startDate:j,endDate:g}=w(t=>t.date),{sales_team:o,employee:h,customer_type:k,customer_group:n,territory:m}=w(t=>t.group),{curentMonth:f,currentYear:M}=w(t=>t.month),[x,N]=i.useState({open:!1,id:null}),R=i.useRef(null),E=Y(),F=()=>{N({open:!1,id:null})},P=[{title:e.jsx("div",{className:"",children:"STT"}),dataIndex:"stt",key:"stt",render:(t,a,K)=>K+1},{title:e.jsx("div",{className:"text-center",children:"Nhóm bán hàng"}),dataIndex:"nhom_ban_hang",width:100,key:"nhom_ban_hang"},{title:e.jsx("div",{className:"text-center",children:"Mã nhân viên"}),dataIndex:"employee_code",key:"employee_code",width:100},{title:e.jsx("div",{className:"text-center",children:"Tên nhân viên"}),dataIndex:"employee_name",width:100,key:"employee_name"},{title:e.jsx("div",{className:"text-center min-w-[80px]",children:"Ngày"}),dataIndex:"create_time",width:100,key:"create_time",render:t=>e.jsx("div",{children:t?u.unix(t).format("DD/MM/YYYY"):e.jsx("div",{className:"min-w-[40px] text-center",children:"-"})})},{title:e.jsx("div",{className:"text-center",children:"Checkin đầu ngày"}),dataIndex:"checkin_daungay",key:"checkin_daungay",width:100,render:t=>e.jsx("div",{children:t?u(t).format("HH:mm"):e.jsx("div",{className:"min-w-[40px] text-center",children:"-"})})},{title:e.jsx("div",{className:"text-center",children:"Checkin cuối ngày"}),dataIndex:"checkin_cuoingay",key:"checkin_cuoingay",width:100,render:t=>e.jsx("div",{children:t?u(t).format("HH:mm"):e.jsx("div",{className:"min-w-[40px] text-center",children:"-"})})},{title:e.jsx("div",{className:"text-center",children:"Khách hàng VT"}),dataIndex:"customers",key:"customers",width:100,render:t=>e.jsx("div",{className:"!text-center",children:t?t.length:0})},{title:e.jsx("div",{className:"text-center",children:"Khách hàng VT sáng"}),dataIndex:"checkin_sang",key:"checkin_sang",width:100,render:(t,a)=>e.jsx("div",{className:"!text-center underline underline-offset-4 text-blue-600",onClick:()=>{N({open:!0,id:{checkin_note_id:a?.checkin_note_id,time:"sáng",timeCheckin:a?.create_time,employee:a?.employee_code,name_employee:a?.employee_name}})},children:t||e.jsx("div",{className:"min-w-[40px]",children:"0"})})},{title:e.jsx("div",{className:"text-center",children:"Khách hàng VT chiều"}),dataIndex:"checkin_chieu",key:"checkin_chieu",width:100,render:(t,a)=>e.jsx("div",{className:"!text-center underline underline-offset-4 text-blue-600",onClick:()=>{N({open:!0,id:{time:"chiều",checkin_note_id:a?.checkin_note_id,timeCheckin:a?.create_time,employee:a?.employee_code,name_employee:a?.employee_name}})},children:t||e.jsx("div",{className:"min-w-[40px] underline-none ",children:"0"})})},{title:e.jsx("div",{className:"text-center",children:"Số km VT"}),dataIndex:"total_distance",key:"total_distance",width:100,render:t=>e.jsx("div",{className:"!text-center",children:t||e.jsx("div",{className:"min-w-[40px]",children:"-"})})},{title:e.jsx("div",{className:"text-center",children:"Số đơn hàng"}),dataIndex:"total_donhang",key:"total_donhang",width:100,render:t=>e.jsx("div",{className:"!text-center",children:t||e.jsx("div",{className:"min-w-[40px]",children:"-"})})},{title:e.jsx("div",{className:"text-center",children:"Ảnh chụp"}),dataIndex:"total_anhchup",key:"total_anhchup",width:100,render:(t,a)=>e.jsx("div",{className:"!text-center",children:a&&a?.customers?a?.customers[0]?.total_image:e.jsx("div",{className:"min-w-[40px]",children:"-"})})},{title:e.jsx("div",{className:"text-center",children:"Doanh số"}),dataIndex:"total_doanhso",key:"total_doanhso",width:100,render:t=>e.jsx("div",{className:"!text-center",children:t||e.jsx("div",{className:"min-w-[40px]",children:"-"})})},{title:e.jsx("div",{className:"text-center",children:"Doanh thu"}),dataIndex:"total_doanhthu",key:"total_doanhthu",width:100,render:t=>e.jsx("div",{className:"!text-center",children:t||e.jsx("div",{className:"min-w-[40px]",children:"-"})})}];return i.useEffect(()=>{(async()=>{const t=await b.get("/api/method/mbw_dms.api.report.visitor_kpi.report_visitor_kpi",{params:{page_size:I,page_number:s,startDate:j,endDate:g,employee:h,sales_team:o,territory:m,customer_group:n,customer_type:k}});let{result:a}=t;v(a),y(a?.totals)})()},[s,j,g,p,o,h,n,k]),e.jsx(e.Fragment,{children:e.jsx(z,{header:e.jsx($,{setRefresh:_,title:"Báo cáo tổng hợp Viếng thăm - KPI",params:{params:{report_type:"Report Visitor_KPI",data_filter:{month:f,year:M}}},file_name:"ReportVisitor_KPI.xlsx"}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7  border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs(D,{gutter:[16,16],className:`flex ${l?"justify-end":"justify-between"} items-center w-full`,children:[!l&&e.jsx(S,{className:"ml-4 w-[78%]",children:e.jsx(D,{gutter:[8,8],className:"space-x-4",children:e.jsx(A,{setPage:r,inputFromDate:!0,inputToDate:!0,inputSaleGroup:!0,inputEmployee:!0})})}),e.jsx(S,{className:"!ml-4",children:e.jsx(B,{inputCustomerType:!0,inputCustomerGroup:!0,inputTerritory:!0,inputFromDate:!0,inputToDate:!0,inputSaleGroup:!0,inputEmployee:!0,setPage:r,matchMedia:!l})})]}),e.jsx("div",{ref:R,className:"pt-5",children:e.jsx(C,{bordered:!0,$border:!0,dataSource:c?.data?.map(t=>({key:t.name,...t})),pagination:d&&d>I?{pageSize:I,showSizeChanger:!1,total:d,current:s,onChange(t){r(t)}}:!1,scroll:{x:!0,y:c?.data?.length>0?E?.h*.55:void 0},columns:P})}),e.jsx(T,{title:e.jsxs("div",{className:"font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4",children:["Khách hàng viếng thăm ",x.id?.time]}),open:x.open,onCancel:F,footer:!1,width:1120,children:e.jsx(Z,{checkin_note_id:x.id?.checkin_note_id,employee:x.id?.employee,timeCheckin:x.id?.timeCheckin})})]})})})}function ae(){return e.jsxs(e.Fragment,{children:[e.jsx(V,{children:e.jsx("title",{children:" ReportVisitorSummary_KPI"})}),e.jsx(L,{})]})}export{ae as default};
