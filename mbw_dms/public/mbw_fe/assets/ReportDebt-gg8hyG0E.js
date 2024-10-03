import{L as e,a7 as c,O as s,aV as l,bE as t,ad as x}from"./index-qRJYtv71.js";import{T as u}from"./tableCustom-1a2PXAnC.js";import{c as p,p as h,a as j,b as F,t as N,s as g,d as y}from"./data-u-VkVTNg.js";import{D as d}from"./index-ZUUs4P3W.js";import{I as o}from"./index-mAqIvw2m.js";import{V as b}from"./VerticalAlignBottomOutlined-VhSq1Drc.js";const f=[{title:"STT",dataIndex:"stt",key:"stt",render:(r,a,n)=>n+1},{title:"Party type",dataIndex:"partytype",key:"partytype",render:(r,a)=>e.jsx("div",{className:"!w-[173px]",children:a.partytype})},{title:"Party",dataIndex:"party",key:"party",render:(r,a)=>e.jsx("div",{className:"!w-[173px]",children:a.party})},{title:"Advance amount",dataIndex:"advanceamount",key:"advanceamount",render:(r,a)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(a.advanceamount)]})},{title:"Invoice amount",dataIndex:"invoiceamount",key:"invoiceamount",render:(r,a)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(a.invoiceamount)]})},{title:"Paid amount",dataIndex:"paidamount",key:"paidamount",render:(r,a)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(a.paidamount)]})},{title:"Credit note",dataIndex:"creditnote",key:"creditnote",render:(r,a)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(a.creditnote)]})},{title:"Oustanding amount",dataIndex:"oustandingamount",key:"oustandingamount",render:(r,a)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(a.oustandingamount)]})},{title:"0-30",dataIndex:"field1",key:"field1",render:(r,a)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(a.field1)]})},{title:"31-60",dataIndex:"field2",key:"field2",render:(r,a)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(a.field2)]})},{title:"61-90",dataIndex:"field3",key:"field3",render:(r,a)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(a.field3)]})},{title:"91-120",dataIndex:"field4",key:"field4",render:(r,a)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(a.field4)]})},{title:"121-Above",dataIndex:"field5",key:"field5",render:(r,a)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(a.field5)]})},{title:"Total amount",dataIndex:"totalamount",key:"totalamount",render:(r,a)=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"mr-2",children:"VND"}),Intl.NumberFormat().format(a.totalamount)]})},{title:"Territory",dataIndex:"territory",key:"territory",render:(r,a)=>e.jsx("div",{className:"!w-[173px]",children:a.territory})},{title:"Customer group",dataIndex:"customergroup",key:"customergroup",render:(r,a)=>e.jsx("div",{className:"!w-[173px]",children:a.customergroup})},{title:"Currency",dataIndex:"currency",key:"currency",render:(r,a)=>e.jsx("div",{className:"!w-[173px]",children:a.currency})}];function I(){const r=n=>{console.log(n)},a=n=>{console.log(n)};return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"Báo cáo công nợ khách hàng",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(b,{className:"text-xl"}),size:"20px",className:"flex items-center"}]}),e.jsxs("div",{className:"bg-white rounded-md py-7 px-4 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs("div",{className:"flex justify-start items-center",children:[e.jsx(s,{className:"w-[200px] border-none mr-2",children:e.jsx(l,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Company",value:""},...p],showSearch:!0})}),e.jsx(s,{className:"w-[200px] border-none mr-2",children:e.jsx(d,{format:"DD-MM-YYYY",placeholder:"Posting date",className:"!bg-[#F4F6F8]",onChange:r})}),e.jsx(s,{className:"w-[200px] border-none mr-2",children:e.jsx(d,{format:"DD-MM-YYYY",placeholder:"Due Date",className:"!bg-[#F4F6F8]",onChange:a})}),e.jsx(s,{className:"w-[200px] border-none mr-2",children:e.jsx(o,{className:"w-[200px]",controls:!1,max:30,min:0,placeholder:"Ageing range 1"})}),e.jsx(s,{className:"w-[200px] border-none mr-2",children:e.jsx(o,{className:"w-[200px]",controls:!1,max:31,min:60,placeholder:"Ageing range 2"})})]}),e.jsxs("div",{className:"pt-4 flex justify-start items-center",children:[e.jsx(s,{className:"w-[200px] border-none mr-2",children:e.jsx(o,{className:"w-[200px]",controls:!1,max:61,min:90,placeholder:"Ageing range 3"})}),e.jsx(s,{className:"w-[200px] border-none mr-2",children:e.jsx(o,{className:"w-[200px]",controls:!1,max:120,min:91,placeholder:"Ageing range 4"})}),e.jsx(s,{className:"w-[200px] border-none mr-2",children:e.jsx(l,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Party type",value:""},...h],showSearch:!0})}),e.jsx(s,{className:"w-[200px] border-none mr-2",children:e.jsx(l,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Party",value:""},...j],showSearch:!0})}),e.jsx(s,{className:"w-[200px] border-none mr-2",children:e.jsx(l,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Customer group",value:""},...F],showSearch:!0})})]}),e.jsxs("div",{className:"pt-4 flex justify-start items-center",children:[e.jsx(s,{className:"w-[200px] border-none mr-2",children:e.jsx(l,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Territory",value:""},...N],showSearch:!0})}),e.jsx(s,{className:"w-[200px] border-none mr-2",children:e.jsx(l,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Sales partner",value:""},...g],showSearch:!0})}),e.jsx(s,{className:"w-[200px] border-none mr-2",children:e.jsx(l,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Sales person",value:""},...y],showSearch:!0})})]}),e.jsx("div",{className:"pt-5",children:e.jsx(u,{columns:f,bordered:!0,scroll:{x:!0},summary:n=>{let m=0;return n.forEach(i=>{m+=i.khvisiting}),e.jsxs(t.Summary.Row,{children:[e.jsx(t.Summary.Cell,{index:0}),e.jsx(t.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(t.Summary.Cell,{index:2}),e.jsx(t.Summary.Cell,{index:3}),e.jsx(t.Summary.Cell,{index:4,children:m}),e.jsx(t.Summary.Cell,{index:5}),e.jsx(t.Summary.Cell,{index:6}),e.jsx(t.Summary.Cell,{index:7})]})}})})]})]})}function C(){return e.jsxs(e.Fragment,{children:[e.jsx(x,{children:e.jsx("title",{children:" ReportDebt"})}),e.jsx(I,{})]})}export{C as default};
