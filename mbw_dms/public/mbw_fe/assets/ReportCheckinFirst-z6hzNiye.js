<<<<<<<< HEAD:mbw_dms/public/mbw_fe/assets/ReportCheckinFirst-CA3fGGZu.js
import{L as e,O as n,a2 as s,by as r,a7 as d}from"./index-1V10OnT5.js";import{H as o}from"./header-page-GoctC0yb.js";import{T as l}from"./tableCustom-MChwWW0Q.js";import{h as c,e as m,b as h,f as x,o as u}from"./data-71ee2cBp.js";import{V as p}from"./VerticalAlignBottomOutlined-wzNnRS_t.js";const y=[{title:"STT",dataIndex:"stt",key:"stt",render:(a,t,i)=>i+1},{title:"Phòng/nhóm",dataIndex:"saleorder",key:"saleorder",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.saleorder})},{title:"Mã nhân viên",dataIndex:"customer",key:"customer",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.customer})},{title:"Mã khách hàng",dataIndex:"territory",key:"territory",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.territory})},{title:"Tên khách hàng",dataIndex:"warehouse",key:"warehouse",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.warehouse})},{title:"Loại khách hàng",dataIndex:"postingdate",key:"postingdate",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.postingdate})},{title:"Nhóm khách hàng",dataIndex:"itemcode",key:"itemcode",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.itemcode})},{title:"Người liên hệ",dataIndex:"itemgroup",key:"itemgroup",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.itemgroup})},{title:"SDT",dataIndex:"brand",key:"brand",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.brand})},{title:"Mã số Thuế",dataIndex:"qty",key:"qty",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.qty})},{title:"Khu vực",dataIndex:"amount",key:"amount",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.amount})},{title:"Địa chỉ",dataIndex:"saleperson",key:"saleperson",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.saleperson})},{title:"Ngày thu thập",dataIndex:"contribution",key:"contribution",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.contribution})},{title:"Nguồn",dataIndex:"contributionamount",key:"contributionamount",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.contributionamount})},{title:"Số lần VT",dataIndex:"f1",key:"f1"},{title:"VT đầu",dataIndex:"f2",key:"f2"},{title:"VT cuối",dataIndex:"f3",key:"f3"},{title:"Số đơn hàng",dataIndex:"f4",key:"f4"},{title:"Đơn hàng cuối",dataIndex:"f5",key:"f5"}],b=[{key:"KDA",name:"7382jsd",saleorder:"Phòng sale",customer:"NV-1243",territory:"Chu Quỳnh Anh",warehouse:"KH-1234",postingdate:"Winmart",itemcode:"Cá nhân",itemgroup:"Thân thiết",brand:"Chú Cá",qty:1239237235,amount:449003,saleperson:"Hà Nội",contribution:1e5,contributionamount:3e7,f1:"1",f2:"16/08/2013",f3:"16/08/2013",f4:"2",f5:"07/05/2016"},{key:"KDSD",name:"7382112",saleorder:"Phòng sale 1",customer:"NV-34321",territory:"Ba La Đôn",warehouse:"KH-12342",postingdate:"Winmart",itemcode:"Cá nhân",itemgroup:"Thân thiết",brand:"Chú Mèo",qty:1239237235,amount:449003,saleperson:"Hà Nội",contribution:1e5,contributionamount:3e7,f1:"1",f2:"16/08/2013",f3:"16/08/2013",f4:"2",f5:"07/05/2016"}];function g(){return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Báo cáo thống kê khách hàng viếng thăm lần đầu",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(p,{className:"text-xl"}),size:"20px",className:"flex items-center"}]}),e.jsxs("div",{className:"bg-white rounded-md py-7 px-4 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs("div",{className:"flex justify-start items-center",children:[e.jsx(n,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Phòng ban/ nhân viên",value:""},...c],showSearch:!0})}),e.jsx(n,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Loại khách hàng",value:""},...m],showSearch:!0})}),e.jsx(n,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Nhóm khách hàng",value:""},...h],showSearch:!0})}),e.jsx(n,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Khu vực",value:""},...x],showSearch:!0})}),e.jsx(n,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Phát sinh đơn hàng",value:""},...u],showSearch:!0})})]}),e.jsx("div",{className:"pt-5",children:e.jsx(l,{dataSource:b,bordered:!0,columns:y,scroll:{x:!0},summary:a=>(a.forEach(t=>{}),e.jsxs(r.Summary.Row,{children:[e.jsx(r.Summary.Cell,{index:0}),e.jsx(r.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(r.Summary.Cell,{index:2}),e.jsx(r.Summary.Cell,{index:3}),e.jsx(r.Summary.Cell,{index:4}),e.jsx(r.Summary.Cell,{index:5}),e.jsx(r.Summary.Cell,{index:6}),e.jsx(r.Summary.Cell,{index:7})]}))})})]})]})}function w(){return e.jsxs(e.Fragment,{children:[e.jsx(d,{children:e.jsx("title",{children:" ReportCheckinFirst"})}),e.jsx(g,{})]})}export{w as default};
========
import{L as e,O as n,a2 as s,by as r,a7 as d}from"./index-5lGd2kZH.js";import{H as o}from"./header-page-Zg4h1Imq.js";import{T as l}from"./tableCustom-XC82UqB7.js";import{h as c,e as m,b as h,f as x,o as u}from"./data-71ee2cBp.js";import{V as p}from"./VerticalAlignBottomOutlined-bSkVEqW7.js";const y=[{title:"STT",dataIndex:"stt",key:"stt",render:(a,t,i)=>i+1},{title:"Phòng/nhóm",dataIndex:"saleorder",key:"saleorder",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.saleorder})},{title:"Mã nhân viên",dataIndex:"customer",key:"customer",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.customer})},{title:"Mã khách hàng",dataIndex:"territory",key:"territory",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.territory})},{title:"Tên khách hàng",dataIndex:"warehouse",key:"warehouse",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.warehouse})},{title:"Loại khách hàng",dataIndex:"postingdate",key:"postingdate",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.postingdate})},{title:"Nhóm khách hàng",dataIndex:"itemcode",key:"itemcode",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.itemcode})},{title:"Người liên hệ",dataIndex:"itemgroup",key:"itemgroup",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.itemgroup})},{title:"SDT",dataIndex:"brand",key:"brand",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.brand})},{title:"Mã số Thuế",dataIndex:"qty",key:"qty",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.qty})},{title:"Khu vực",dataIndex:"amount",key:"amount",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.amount})},{title:"Địa chỉ",dataIndex:"saleperson",key:"saleperson",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.saleperson})},{title:"Ngày thu thập",dataIndex:"contribution",key:"contribution",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.contribution})},{title:"Nguồn",dataIndex:"contributionamount",key:"contributionamount",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.contributionamount})},{title:"Số lần VT",dataIndex:"f1",key:"f1"},{title:"VT đầu",dataIndex:"f2",key:"f2"},{title:"VT cuối",dataIndex:"f3",key:"f3"},{title:"Số đơn hàng",dataIndex:"f4",key:"f4"},{title:"Đơn hàng cuối",dataIndex:"f5",key:"f5"}],b=[{key:"KDA",name:"7382jsd",saleorder:"Phòng sale",customer:"NV-1243",territory:"Chu Quỳnh Anh",warehouse:"KH-1234",postingdate:"Winmart",itemcode:"Cá nhân",itemgroup:"Thân thiết",brand:"Chú Cá",qty:1239237235,amount:449003,saleperson:"Hà Nội",contribution:1e5,contributionamount:3e7,f1:"1",f2:"16/08/2013",f3:"16/08/2013",f4:"2",f5:"07/05/2016"},{key:"KDSD",name:"7382112",saleorder:"Phòng sale 1",customer:"NV-34321",territory:"Ba La Đôn",warehouse:"KH-12342",postingdate:"Winmart",itemcode:"Cá nhân",itemgroup:"Thân thiết",brand:"Chú Mèo",qty:1239237235,amount:449003,saleperson:"Hà Nội",contribution:1e5,contributionamount:3e7,f1:"1",f2:"16/08/2013",f3:"16/08/2013",f4:"2",f5:"07/05/2016"}];function g(){return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Báo cáo thống kê khách hàng viếng thăm lần đầu",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(p,{className:"text-xl"}),size:"20px",className:"flex items-center"}]}),e.jsxs("div",{className:"bg-white rounded-md py-7 px-4 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs("div",{className:"flex justify-start items-center",children:[e.jsx(n,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Phòng ban/ nhân viên",value:""},...c],showSearch:!0})}),e.jsx(n,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Loại khách hàng",value:""},...m],showSearch:!0})}),e.jsx(n,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Nhóm khách hàng",value:""},...h],showSearch:!0})}),e.jsx(n,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Khu vực",value:""},...x],showSearch:!0})}),e.jsx(n,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Phát sinh đơn hàng",value:""},...u],showSearch:!0})})]}),e.jsx("div",{className:"pt-5",children:e.jsx(l,{dataSource:b,bordered:!0,columns:y,scroll:{x:!0},summary:a=>(a.forEach(t=>{}),e.jsxs(r.Summary.Row,{children:[e.jsx(r.Summary.Cell,{index:0}),e.jsx(r.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(r.Summary.Cell,{index:2}),e.jsx(r.Summary.Cell,{index:3}),e.jsx(r.Summary.Cell,{index:4}),e.jsx(r.Summary.Cell,{index:5}),e.jsx(r.Summary.Cell,{index:6}),e.jsx(r.Summary.Cell,{index:7})]}))})})]})]})}function w(){return e.jsxs(e.Fragment,{children:[e.jsx(d,{children:e.jsx("title",{children:" ReportCheckinFirst"})}),e.jsx(g,{})]})}export{w as default};
>>>>>>>> 85a7bb0c (fix map history and build app):mbw_dms/public/mbw_fe/assets/ReportCheckinFirst-z6hzNiye.js
