import{X as r,a1 as b,L as i,P as h,a3 as d,br as l,a7 as I}from"./index-JYs2rUZH.js";import{H as F}from"./header-page-jczZ7QVL.js";import{T as m}from"./tableCustom-szs0qvyF.js";import{u as v}from"./useDebount-BDFljpww.js";import{D as f}from"./index-EpngHjxR.js";import{V as H}from"./VerticalAlignBottomOutlined-qqSlzP1H.js";const K=[{label:"Tháng 1",value:"Tháng 1"},{label:"Tháng 2",value:"Tháng 2"},{label:"Tháng 3",value:"Tháng 3"},{label:"Tháng 4",value:"Tháng 4"},{label:"Tháng 5",value:"Tháng 5"},{label:"Tháng 6",value:"Tháng 6"},{label:"Tháng 7",value:"Tháng 7"},{label:"Tháng 8",value:"Tháng 8"},{label:"Tháng 9",value:"Tháng 9"},{label:"Tháng 10",value:"Tháng 10"},{label:"Tháng 11",value:"Tháng 11"},{label:"Tháng 12",value:"Tháng 12"}],{Column:t,ColumnGroup:n}=m,N=[{key:"KDA",name:"7382jsd",employee_code:"HHHH01",employee_name:"Tần Hạo",department:"Phòng 1",khvisiting:5,thvisiting:1,tlvisiting:25,khvisitingfirst:4,thvisitingfirst:1,tlvisitingfirst:60,khvisitingcustomerorder:1,thvisitingcustomerorder:2,tlvisitingcustomerorder:59,khvisitingnew:1,thvisitingnew:1,tlvisitingnew:24,khvisitingorder:1,thvisitingorder:12,tlvisitingorder:56,khvisitingsale:1,thvisitingsale:2,tlvisitingsale:35,khvisitingRevenue:2,thvisitingRevenue:9,tlvisitingRevenue:87,khvisitingQuantity:0,thvisitingQuantity:0,tlvisitingQuantity:89,khvisitingSKU:2,thvisitingSKU:10,tlvisitingSKU:67,khvisitingwork:10,thvisitingwork:14,tlvisitingwork:45},{key:"KDSD",name:"7382112",employee_code:"HHHH02",employee_name:"Hạo Thần",department:"Phòng 2",khvisiting:5,thvisiting:1,tlvisiting:25,khvisitingfirst:4,thvisitingfirst:1,tlvisitingfirst:60,khvisitingcustomerorder:1,thvisitingcustomerorder:2,tlvisitingcustomerorder:59,khvisitingnew:1,thvisitingnew:1,tlvisitingnew:24,khvisitingorder:1,thvisitingorder:12,tlvisitingorder:56,khvisitingsale:1,thvisitingsale:2,tlvisitingsale:35,khvisitingRevenue:2,thvisitingRevenue:9,tlvisitingRevenue:87,khvisitingQuantity:0,thvisitingQuantity:0,tlvisitingQuantity:89,khvisitingSKU:2,thvisitingSKU:10,tlvisitingSKU:67,khvisitingwork:10,thvisitingwork:14,tlvisitingwork:45}];function _(){const[x,c]=r.useState([]),[u,R]=r.useState([]),[g,w]=r.useState(),[j,k]=r.useState(""),[C,p]=r.useState();let o=v(j);const[T,y]=r.useState("");v(T,300);const S=s=>{console.log(s)};return r.useEffect(()=>{(async()=>{let s=await b.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:g,key_search:o}});console.log("rsemp",s);let{message:e}=s;c(e.map(a=>({value:a.employee_code,label:a.employee_name||a.employee_code})))})()},[g,o]),i.jsxs(i.Fragment,{children:[i.jsx(F,{title:"Báo cáo KPI",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:i.jsx(H,{className:"text-xl"}),size:"20px",className:"flex items-center"}]}),i.jsxs("div",{className:"bg-white rounded-md py-7 px-4 border-[#DFE3E8] border-[0.2px] border-solid",children:[i.jsxs("div",{className:"flex justify-start items-center",children:[i.jsx(h,{className:"w-[200px] border-none mr-2",children:i.jsx(d,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:K,showSearch:!0})}),i.jsx(h,{className:"w-[200px] border-none mr-2",children:i.jsx(f,{className:"!bg-[#F4F6F8]",onChange:S,picker:"year"})}),i.jsx(h,{className:"w-[200px] border-none mr-2",children:i.jsx(d,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Tất cả nhóm bán hàng",value:""},...u],showSearch:!0,notFoundContent:null,onSearch:s=>y(s),onChange:s=>{w(s)}})}),i.jsx(h,{className:"w-[200px] border-none mr-2",children:i.jsx(d,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:[{label:"Tất cả nhân viên",value:""},...x],showSearch:!0,defaultValue:"",notFoundContent:null,onSearch:k,onChange:s=>{p(s)},allowClear:!0})})]}),i.jsx("div",{className:"pt-5",children:i.jsxs(m,{dataSource:N,bordered:!0,scroll:{x:!0},summary:s=>{let e=0;return s.forEach(a=>{e+=a.khvisiting}),i.jsxs(l.Summary.Row,{children:[i.jsx(l.Summary.Cell,{index:0}),i.jsx(l.Summary.Cell,{index:1,children:"Tổng"}),i.jsx(l.Summary.Cell,{index:2}),i.jsx(l.Summary.Cell,{index:3}),i.jsx(l.Summary.Cell,{index:4,children:e}),i.jsx(l.Summary.Cell,{index:5}),i.jsx(l.Summary.Cell,{index:6}),i.jsx(l.Summary.Cell,{index:7})]})},children:[i.jsx(t,{title:"STT",dataIndex:"stt",fixed:"left",width:60,render:(s,e,a)=>a+1},"stt"),i.jsx(t,{title:"Mã Nhân viên",dataIndex:"employee_code",fixed:"left",width:130},"employee_code"),i.jsx(t,{title:"Nhân viên",dataIndex:"employee_name",fixed:"left",width:200},"employee_name"),i.jsx(t,{title:"Phòng/nhóm",dataIndex:"department",width:210},"department"),i.jsxs(n,{className:"!whitespace-normal",title:"Số khách hàng viếng thăm",width:210,children:[i.jsx(t,{title:"KH",width:70,dataIndex:"khvisiting"},"khvisiting"),i.jsx(t,{title:"TH",width:70,dataIndex:"thvisiting"},"thvisiting"),i.jsx(t,{title:"TL",width:70,dataIndex:"tlvisiting",render:(s,e)=>i.jsxs(i.Fragment,{children:[e.tlvisiting,"%"]})},"tlvisiting")]}),i.jsxs(n,{className:"!whitespace-normal",title:"Số khách hàng viếng thăm duy nhất",width:210,children:[i.jsx(t,{title:"KH",width:70,dataIndex:"khvisitingfirst"},"khvisitingfirst"),i.jsx(t,{title:"TH",width:70,dataIndex:"thvisitingfirst"},"thvisitingfirst"),i.jsx(t,{title:"TL",width:70,dataIndex:"tlvisitingfirst",render:(s,e)=>i.jsxs(i.Fragment,{children:[e.tlvisitingfirst,"%"]})},"tlvisitingfirst")]}),i.jsxs(n,{className:"!whitespace-normal",title:"Số khách hàng đặt hàng",width:210,children:[i.jsx(t,{title:"KH",width:70,dataIndex:"khvisitingcustomerorder"},"khvisitingcustomerorder"),i.jsx(t,{title:"TH",width:70,dataIndex:"thvisitingcustomerorder"},"thvisitingcustomerorder"),i.jsx(t,{title:"TL",width:70,dataIndex:"tlvisitingcustomerorder",render:(s,e)=>i.jsxs(i.Fragment,{children:[e.tlvisitingcustomerorder,"%"]})},"tlvisitingcustomerorder")]}),i.jsxs(n,{className:"!whitespace-normal",title:"Số khách hàng thêm mới",width:210,children:[i.jsx(t,{title:"KH",width:70,dataIndex:"khvisitingnew"},"khvisitingnew"),i.jsx(t,{title:"TH",width:70,dataIndex:"thvisitingnew"},"thvisitingnew"),i.jsx(t,{title:"TL",width:70,dataIndex:"tlvisitingnew",render:(s,e)=>i.jsxs(i.Fragment,{children:[e.tlvisitingnew,"%"]})},"tlvisitingnew")]}),i.jsxs(n,{className:"!whitespace-normal",title:"Số đơn hàng",width:210,children:[i.jsx(t,{title:"KH",width:70,dataIndex:"khvisitingorder"},"khvisitingorder"),i.jsx(t,{title:"TH",width:70,dataIndex:"thvisitingorder"},"thvisitingorder"),i.jsx(t,{title:"TL",width:70,dataIndex:"tlvisitingorder",render:(s,e)=>i.jsxs(i.Fragment,{children:[e.tlvisitingorder,"%"]})},"tlvisitingorder")]}),i.jsxs(n,{className:"!whitespace-normal",title:"Doanh số",width:210,children:[i.jsx(t,{title:"KH",width:70,dataIndex:"khvisitingsale"},"khvisitingsale"),i.jsx(t,{title:"TH",width:70,dataIndex:"thvisitingsale"},"thvisitingsale"),i.jsx(t,{title:"TL",width:70,dataIndex:"tlvisitingsale",render:(s,e)=>i.jsxs(i.Fragment,{children:[e.tlvisitingsale,"%"]})},"tlvisitingsale")]}),i.jsxs(n,{className:"!whitespace-normal",title:"Doanh thu",width:210,children:[i.jsx(t,{title:"KH",width:70,dataIndex:"khvisitingRevenue"},"khvisitingRevenue"),i.jsx(t,{title:"TH",width:70,dataIndex:"thvisitingRevenue"},"thvisitingRevenue"),i.jsx(t,{title:"TL",width:70,dataIndex:"tlvisitingRevenue",render:(s,e)=>i.jsxs(i.Fragment,{children:[e.tlvisitingRevenue,"%"]})},"tlvisitingRevenue")]}),i.jsxs(n,{className:"!whitespace-normal",title:"Sản lượng",width:210,children:[i.jsx(t,{title:"KH",width:70,dataIndex:"khvisitingQuantity"},"khvisitingQuantity"),i.jsx(t,{title:"TH",width:70,dataIndex:"thvisitingQuantity"},"thvisitingQuantity"),i.jsx(t,{title:"TL",width:70,dataIndex:"tlvisitingQuantity",render:(s,e)=>i.jsxs(i.Fragment,{children:[e.tlvisitingQuantity,"%"]})},"tlvisitingQuantity")]}),i.jsxs(n,{className:"!whitespace-normal",title:"SKU",width:210,children:[i.jsx(t,{title:"KH",width:70,dataIndex:"khvisitingSKU"},"khvisitingSKU"),i.jsx(t,{title:"TH",width:70,dataIndex:"thvisitingSKU"},"thvisitingSKU"),i.jsx(t,{title:"TL",width:70,dataIndex:"tlvisitingSKU",render:(s,e)=>i.jsxs(i.Fragment,{children:[e.tlvisitingSKU,"%"]})},"tlvisitingSKU")]}),i.jsxs(n,{className:"!whitespace-normal",title:"Số giờ làm việc",width:210,children:[i.jsx(t,{title:"KH",width:70,dataIndex:"khvisitingwork"},"khvisitingwork"),i.jsx(t,{title:"TH",width:70,dataIndex:"thvisitingwork"},"thvisitingwork"),i.jsx(t,{title:"TL",width:70,dataIndex:"tlvisitingwork",render:(s,e)=>i.jsxs(i.Fragment,{children:[e.tlvisitingwork,"%"]})},"tlvisitingwork")]})]})})]})]})}function V(){return i.jsxs(i.Fragment,{children:[i.jsx(I,{children:i.jsx("title",{children:" ReportKPI"})}),i.jsx(_,{})]})}export{V as default};
