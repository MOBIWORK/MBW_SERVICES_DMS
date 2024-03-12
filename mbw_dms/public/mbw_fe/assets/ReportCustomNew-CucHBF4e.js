import{L as e,P as n,a3 as s,br as r,a7 as o}from"./index-zTlTLygC.js";import{H as d}from"./header-page-yMhqeaLe.js";import{T as l}from"./tableCustom-qRYZa6JK.js";import{d as m,h as c,f as x,j as h,o as u}from"./data-W8eMcttJ.js";import{V as p}from"./VerticalAlignBottomOutlined-9TmBNge5.js";const j=[{title:"STT",dataIndex:"stt",key:"stt",render:(a,t,i)=>i+1},{title:"Phòng/nhóm",dataIndex:"saleorder",key:"saleorder",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.saleorder})},{title:"Mã nhân viên",dataIndex:"customer",key:"customer",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.customer})},{title:"Mã khách hàng",dataIndex:"territory",key:"territory",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.territory})},{title:"Tên khách hàng",dataIndex:"warehouse",key:"warehouse",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.warehouse})},{title:"Loại khách hàng",dataIndex:"postingdate",key:"postingdate",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.postingdate})},{title:"Nhóm khách hàng",dataIndex:"itemcode",key:"itemcode",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.itemcode})},{title:"Người liên hệ",dataIndex:"itemgroup",key:"itemgroup",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.itemgroup})},{title:"SDT",dataIndex:"brand",key:"brand",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.brand})},{title:"Mã số Thuế",dataIndex:"qty",key:"qty",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.qty})},{title:"Khu vực",dataIndex:"amount",key:"amount",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.amount})},{title:"Địa chỉ",dataIndex:"saleperson",key:"saleperson",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.saleperson})},{title:"Ngày thu thập",dataIndex:"contribution",key:"contribution",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.contribution})},{title:"Nguồn",dataIndex:"contributionamount",key:"contributionamount",render:(a,t)=>e.jsx("div",{className:"!w-[175px]",children:t.contributionamount})},{title:"Số lần VT",dataIndex:"f1",key:"f1"},{title:"VT đầu",dataIndex:"f2",key:"f2"},{title:"VT cuối",dataIndex:"f3",key:"f3"},{title:"Số đơn hàng",dataIndex:"f4",key:"f4"},{title:"Đơn hàng cuối",dataIndex:"f5",key:"f5"}],y=[{key:"KDA",name:"7382jsd",saleorder:"Phòng sale",customer:"NV-1243",territory:"Chu Quỳnh Anh",warehouse:"KH-1234",postingdate:"Winmart",itemcode:"Cá nhân",itemgroup:"Thân thiết",brand:"Chú Cá",qty:1239237235,amount:449003,saleperson:"Hà Nội",contribution:1e5,contributionamount:3e7,f1:"1",f2:"16/08/2013",f3:"16/08/2013",f4:"2",f5:"07/05/2016"},{key:"KDSD",name:"7382112",saleorder:"Phòng sale 1",customer:"NV-34321",territory:"Ba La Đôn",warehouse:"KH-12342",postingdate:"Winmart",itemcode:"Cá nhân",itemgroup:"Thân thiết",brand:"Chú Mèo",qty:1239237235,amount:449003,saleperson:"Hà Nội",contribution:1e5,contributionamount:3e7,f1:"1",f2:"16/08/2013",f3:"16/08/2013",f4:"2",f5:"07/05/2016"}];function b(){return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Báo cáo khách hàng mới",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(p,{className:"text-xl"}),size:"20px",className:"flex items-center"}]}),e.jsxs("div",{className:"bg-white rounded-md py-7 px-4 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs("div",{className:"flex justify-start items-center",children:[e.jsx(n,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Phòng ban/ nhân viên",value:""},...m],showSearch:!0})}),e.jsx(n,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Loại khách hàng",value:""},...c],showSearch:!0})}),e.jsx(n,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Nhóm khách hàng",value:""},...x],showSearch:!0})}),e.jsx(n,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Khu vực",value:""},...h],showSearch:!0})}),e.jsx(n,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Phát sinh đơn hàng",value:""},...u],showSearch:!0})})]}),e.jsx("div",{className:"pt-5",children:e.jsx(l,{dataSource:y,bordered:!0,columns:j,scroll:{x:!0},summary:a=>(a.forEach(t=>{}),e.jsxs(r.Summary.Row,{children:[e.jsx(r.Summary.Cell,{index:0}),e.jsx(r.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(r.Summary.Cell,{index:2}),e.jsx(r.Summary.Cell,{index:3}),e.jsx(r.Summary.Cell,{index:4}),e.jsx(r.Summary.Cell,{index:5}),e.jsx(r.Summary.Cell,{index:6}),e.jsx(r.Summary.Cell,{index:7})]}))})})]})]})}function k(){return e.jsxs(e.Fragment,{children:[e.jsx(o,{children:e.jsx("title",{children:" ReportCustomNew"})}),e.jsx(b,{})]})}export{k as default};
