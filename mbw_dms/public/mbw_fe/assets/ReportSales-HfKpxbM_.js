import{L as e,P as a,aO as l,aT as i,a3 as s,br as r,a7 as d}from"./index-xZLuHMBW.js";import{H as m}from"./header-page-8jsTDab7.js";import{T as u}from"./tableCustom-OkxpN2Qk.js";import{c,t as x,w as p,a as b,i as h,b as F,s as j}from"./data-W8eMcttJ.js";import{V as y}from"./VerticalAlignBottomOutlined-Gf1Pg3Qp.js";const g=[{title:"STT",dataIndex:"stt",key:"stt",render:(o,t,n)=>n+1},{title:"Sales order",dataIndex:"saleorder",key:"saleorder",render:(o,t)=>e.jsx("div",{className:"!w-[175px]",children:t.saleorder})},{title:"Customer",dataIndex:"customer",key:"customer"},{title:"Territory",dataIndex:"territory",key:"territory"},{title:"Warehouse",dataIndex:"warehouse",key:"warehouse"},{title:"Posting date",dataIndex:"postingdate",key:"postingdate"},{title:"Item code",dataIndex:"itemcode",key:"itemcode"},{title:"Item group",dataIndex:"itemgroup",key:"itemgroup"},{title:"Brand",dataIndex:"brand",key:"brand"},{title:"Qty",dataIndex:"qty",key:"qty"},{title:"Amount",dataIndex:"amount",key:"amount",render:(o,t)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),t.amount]})},{title:"Sale person",dataIndex:"saleperson",key:"saleperson"},{title:"Contribution",dataIndex:"contribution",key:"contribution"},{title:"Contribution Amount",dataIndex:"contributionamount",key:"contributionamount",render:(o,t)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),t.contributionamount]})}],N=[{key:"KDA",name:"7382jsd",saleorder:"SADD-123123",customer:"Đặng Hào",territory:"Hà Nội",warehouse:"Kho Hà Nội",postingdate:"16/04/2024",itemcode:"OU-11",itemgroup:"Nhóm sp KM",brand:"ABB",qty:25,amount:45666666,saleperson:"Trần Bảo",contribution:1e5,contributionamount:3e7},{key:"KDSD",name:"7382112",saleorder:"ƯEERR-2222",customer:"Đặng Phí",territory:"Hà Nội",warehouse:"Kho Hà Nội",postingdate:"15/04/2024",itemcode:"UI-11",itemgroup:"Nhóm sp KM",brand:"ABB",qty:78,amount:45666666,saleperson:"Hạ Trang",contribution:1e5,contributionamount:3e7}];function S(){return e.jsxs(e.Fragment,{children:[e.jsx(m,{title:"Báo cáo tổng hợp bán hàng",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(y,{className:"text-xl"}),size:"20px",className:"flex items-center"}]}),e.jsxs("div",{className:"bg-white rounded-md py-7 px-4 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs("div",{className:"flex justify-start items-center",children:[e.jsx(a,{className:"w-[320px] border-none pr-2",children:e.jsx(l,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8] !h-8",placeholder:"Sale order",prefix:e.jsx(i,{})})}),e.jsx(a,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Customer",value:""},...c],showSearch:!0})}),e.jsx(a,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Territory",value:""},...x],showSearch:!0})}),e.jsx(a,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Warehouse",value:""},...p],showSearch:!0})})]}),e.jsxs("div",{className:"flex justify-start items-center h-8 pt-9",children:[e.jsx(a,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Company",value:""},...b],showSearch:!0})}),e.jsx(a,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Item group",value:""},...h],showSearch:!0})}),e.jsx(a,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Brand",value:""},...F],showSearch:!0})}),e.jsx(a,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Sale person",value:""},...j],showSearch:!0})})]}),e.jsx("div",{className:"pt-5",children:e.jsx(u,{dataSource:N,bordered:!0,columns:g,scroll:{x:!0},summary:o=>(o.forEach(t=>{}),e.jsxs(r.Summary.Row,{children:[e.jsx(r.Summary.Cell,{index:0}),e.jsx(r.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(r.Summary.Cell,{index:2}),e.jsx(r.Summary.Cell,{index:3}),e.jsx(r.Summary.Cell,{index:4}),e.jsx(r.Summary.Cell,{index:5}),e.jsx(r.Summary.Cell,{index:6}),e.jsx(r.Summary.Cell,{index:7})]}))})})]})]})}function v(){return e.jsxs(e.Fragment,{children:[e.jsx(d,{children:e.jsx("title",{children:" ReportSales"})}),e.jsx(S,{})]})}export{v as default};
