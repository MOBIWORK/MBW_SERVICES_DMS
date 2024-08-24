import{Y as i,L as e,a6 as p,O as a,aT as s,a9 as d,V as j,ab as F}from"./index-iAClPfSc.js";import{b}from"./index-6KHKS_2G.js";import{D as y}from"./index-WSUgXntH.js";import{V as f}from"./VerticalAlignBottomOutlined-iOL2XJoa.js";import"./FileSaver.min-pbSV2JRj.js";const{Column:t,ColumnGroup:l}=d,{RangePicker:w}=y;function N(){const[c,h]=i.useState([]),[m,x]=i.useState([]),u=n=>{if(h(n),n.length===2){const[r,o]=n,g=b(r,o);x(g)}};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Báo cáo tổng hợp cự ly di chuyển từng nhân viên (km)",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(f,{className:"text-xl"}),size:"20px",className:"flex items-center"}]}),e.jsxs("div",{className:"bg-white rounded-md py-7 px-4 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs("div",{className:"flex justify-start items-center",children:[e.jsx(a,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Phòng/nhóm",value:""}],showSearch:!0,notFoundContent:null})}),e.jsx(a,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Thông tin giám sát",value:""}],showSearch:!0,notFoundContent:null})}),e.jsx(a,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Thứ trong tuần",value:""}],showSearch:!0,notFoundContent:null})}),e.jsx(a,{className:"w-[200px] border-none mr-2",children:e.jsx(s,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",defaultValue:"",options:[{label:"Loại di chuyển",value:""}],showSearch:!0,notFoundContent:null})}),e.jsx(a,{className:"w-[250px] border-none mr-2",children:e.jsx(w,{onChange:u,value:c,placeholder:["Từ ngày","Đến ngày"],className:"!bg-[#F4F6F8] !h-8",format:"DD/MM/YYYY"})})]}),"table",e.jsx("div",{className:"pt-5",children:e.jsxs(d,{bordered:!0,scroll:{x:!0},children:[e.jsx(t,{title:"STT",dataIndex:"stt",width:60,render:(n,r,o)=>o+1},"stt"),e.jsx(t,{title:"Mã thị trường/nhân viên",dataIndex:"employee_code",width:177},"employee_code"),e.jsx(t,{title:"Thị trường /nhân viên",dataIndex:"employee_name",width:177},"employee_name"),m.map(n=>e.jsx(l,{className:"!whitespace-normal",width:180,title:`Ngày ${j(n.date,"DD/MM/YYYY").date()}`,children:e.jsxs(l,{title:n.dayOfWeek,children:[e.jsx(t,{title:"Viếng thăm",dataIndex:"checkin_1"},"checkin_1"),e.jsx(t,{title:"Tự động",dataIndex:"auto_1"},"auto_1")]})},n.date)),e.jsxs(l,{title:"Bình quân/ngày",width:190,children:[e.jsx(t,{title:"Viếng thăm",dataIndex:"checkin_3"},"checkin_2"),e.jsx(t,{title:"Tự động",dataIndex:"auto_3"},"auto_3")]}),e.jsxs(l,{title:"Tổng cộng",width:190,children:[e.jsx(t,{title:"Viếng thăm",dataIndex:"checkin_4"},"checkin_4"),e.jsx(t,{title:"Tự động",dataIndex:"auto_4"},"auto_4")]})]})})]})]})}function C(){return e.jsxs(e.Fragment,{children:[e.jsx(F,{children:e.jsx("title",{children:" ReportDistance"})}),e.jsx(N,{})]})}export{C as default};
