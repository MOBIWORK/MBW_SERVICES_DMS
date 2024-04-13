import{W as d,a6 as o,a0 as x,L as e,O as _,a2 as y,a3 as v,by as n,a7 as R}from"./index-2e-kCGqP.js";import{H as A}from"./header-page-csWxGeSf.js";import{u as Y}from"./useDebount-6JJfoQYm.js";import{t as O}from"./index-JataI81A.js";import{D as z}from"./index-rlzSjqo0.js";import{T as M}from"./index-1ZwJd_x9.js";import{V as B}from"./VerticalAlignBottomOutlined-XUlCYQAh.js";const G=[{label:"Tháng 1",value:"1"},{label:"Tháng 2",value:"2"},{label:"Tháng 3",value:"3"},{label:"Tháng 4",value:"4"},{label:"Tháng 5",value:"5"},{label:"Tháng 6",value:"6"},{label:"Tháng 7",value:"7"},{label:"Tháng 8",value:"8"},{label:"Tháng 9",value:"9"},{label:"Tháng 10",value:"10"},{label:"Tháng 11",value:"11"},{label:"Tháng 12",value:"12"}],{Column:l,ColumnGroup:h}=v;function U(){const[k,b]=d.useState([]),[I,C]=d.useState([]),[i,f]=d.useState(),[T,F]=d.useState(""),[c,u]=d.useState();let g=Y(T);const[j,N]=d.useState(1),p=20,[s,H]=d.useState([]),[S,K]=d.useState(""),[m,w]=d.useState(""),[E,L]=d.useState(0),P=a=>{w(a?.$y.toString())},D=(o().month()+1).toString(),V=o().format("YYYY");return d.useEffect(()=>{(async()=>{let a=await x.get("/api/method/mbw_dms.api.router.get_team_sale");C(O({data:a.result.map(t=>({title:t.name,value:t.name,...t})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),d.useEffect(()=>{(async()=>{let a=await x.get("/api/method/mbw_dms.api.router.get_sale_person",{params:{team_sale:i,key_search:g}}),{message:t}=a;b(t.map(r=>({value:r.employee_code,label:r.employee_name||r.employee_code})))})()},[i,g]),d.useEffect(()=>{(m===void 0||m==="")&&w(V),(async()=>{const a=await x.get("/api/method/mbw_dms.api.report.kpi.kpi_report",{params:{page_size:p,page_number:j,month:S,year:m,sales_team:i,employee:c}});H(a?.result),L(a?.result?.totals)})()},[S,m,i,c,j]),e.jsxs(e.Fragment,{children:[e.jsx(A,{title:"Báo cáo KPI",buttons:[{label:"Xuất dữ liệu",type:"primary",icon:e.jsx(B,{className:"text-xl"}),size:"20px",className:"flex items-center"}]}),e.jsxs("div",{className:"bg-white rounded-md py-7 border-[#DFE3E8] border-[0.2px] border-solid",children:[e.jsxs("div",{className:"flex justify-start items-center px-4",children:[e.jsx(_,{className:"w-[200px] border-none mr-2",children:e.jsx(y,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8] !h-8",defaultValue:D,options:G,onChange:a=>{K(a)},showSearch:!0})}),e.jsx(_,{className:"w-[200px] border-none mr-2",children:e.jsx(z,{className:"!bg-[#F4F6F8] !h-8",onChange:P,picker:"year",defaultValue:o().startOf("year")})}),e.jsx(_,{className:"w-[200px] border-none mr-2",children:e.jsx(M,{showSearch:!0,defaultValue:"",treeData:[{label:"Tất cả nhóm bán hàng",value:""},...I],onChange:a=>{f(a)}})}),e.jsx(_,{name:"employee",className:"w-[200px] border-none mr-2",children:e.jsx(y,{showSearch:!0,filterOption:!1,notFoundContent:null,defaultValue:"",allowClear:!0,onSearch:a=>{F(a)},options:[{label:"Tất cả nhân viên",value:""},...k],onSelect:a=>{u(a)},onClear:()=>{u("")}})})]}),e.jsx("div",{className:"pt-5",children:e.jsxs(v,{dataSource:s?.data?.map(a=>({key:a.name,...a})),bordered:!0,scroll:{x:!0},pagination:{defaultPageSize:p,total:E,onChange(a){N(a)}},summary:()=>e.jsxs(n.Summary.Row,{children:[e.jsx(n.Summary.Cell,{index:0}),e.jsx(n.Summary.Cell,{index:1,children:"Tổng"}),e.jsx(n.Summary.Cell,{index:2}),e.jsx(n.Summary.Cell,{index:3}),e.jsx(n.Summary.Cell,{index:4,children:s?.sum?.tong_kh_vt}),e.jsx(n.Summary.Cell,{index:5,children:s?.sum?.tong_th_vt}),e.jsx(n.Summary.Cell,{index:6}),e.jsx(n.Summary.Cell,{index:7,children:s?.sum?.tong_kh_vt_dn}),e.jsx(n.Summary.Cell,{index:8,children:s?.sum?.tong_th_vt_dn}),e.jsx(n.Summary.Cell,{index:9}),e.jsx(n.Summary.Cell,{index:10,children:s?.sum?.tong_kh_dat_hang}),e.jsx(n.Summary.Cell,{index:11,children:s?.sum?.tong_th_dat_hang}),e.jsx(n.Summary.Cell,{index:12}),e.jsx(n.Summary.Cell,{index:13,children:s?.sum?.tong_kh_kh_moi}),e.jsx(n.Summary.Cell,{index:14,children:s?.sum?.tong_th_kh_moi}),e.jsx(n.Summary.Cell,{index:15}),e.jsx(n.Summary.Cell,{index:16,children:s?.sum?.tong_kh_don_hang}),e.jsx(n.Summary.Cell,{index:17,children:s?.sum?.tong_th_don_hang}),e.jsx(n.Summary.Cell,{index:18}),e.jsx(n.Summary.Cell,{index:19,children:Intl.NumberFormat().format(s?.sum?.tong_kh_doanh_so)}),e.jsx(n.Summary.Cell,{index:20,children:Intl.NumberFormat().format(s?.sum?.tong_th_doanh_so)}),e.jsx(n.Summary.Cell,{index:21}),e.jsx(n.Summary.Cell,{index:22,children:Intl.NumberFormat().format(s?.sum?.tong_kh_doanh_thu)}),e.jsx(n.Summary.Cell,{index:23,children:Intl.NumberFormat().format(s?.sum?.tong_th_doanh_thu)}),e.jsx(n.Summary.Cell,{index:24}),e.jsx(n.Summary.Cell,{index:25,children:s?.sum?.tong_kh_san_lg}),e.jsx(n.Summary.Cell,{index:26,children:s?.sum?.tong_th_san_lg}),e.jsx(n.Summary.Cell,{index:27}),e.jsx(n.Summary.Cell,{index:28,children:s?.sum?.tong_kh_sku}),e.jsx(n.Summary.Cell,{index:29,children:s?.sum?.tong_th_sku}),e.jsx(n.Summary.Cell,{index:30}),e.jsx(n.Summary.Cell,{index:31,children:s?.sum?.tong_kh_so_gio_lam_viec}),e.jsx(n.Summary.Cell,{index:32,children:s?.sum?.tong_th_so_gio_lam_viec}),e.jsx(n.Summary.Cell,{index:33})]}),children:[e.jsx(l,{title:"STT",dataIndex:"stt",fixed:"left",className:"!text-center",render:(a,t,r)=>r+1},"stt"),e.jsx(l,{title:"Mã Nhân viên",dataIndex:"nhan_vien_ban_hang",fixed:"left",render:(a,t)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"!min-w-[130px]",children:t.nhan_vien_ban_hang})})},"nhan_vien_ban_hang"),e.jsx(l,{title:"Nhân viên",dataIndex:"ten_nv",fixed:"left",render:(a,t)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"!min-w-[200px]",children:t.ten_nv})})},"ten_nv"),e.jsx(l,{title:"Phòng/nhóm",dataIndex:"nhom_ban_hang",render:(a,t)=>e.jsx("div",{className:"!w-[180px]",children:t.nhom_ban_hang})},"nhom_ban_hang"),e.jsxs(h,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng viếng thăm",children:[e.jsx(l,{title:"KH",width:70,dataIndex:"kh_vt"},"kh_vt"),e.jsx(l,{title:"TH",width:70,dataIndex:"th_vt"},"th_vt"),e.jsx(l,{title:"TL",width:70,dataIndex:"tl_vt",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_vt,"%"]})},"tl_vt")]}),e.jsxs(h,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng viếng thăm duy nhất",children:[e.jsx(l,{title:"KH",width:70,dataIndex:"kh_vt_dn"},"kh_vt_dn"),e.jsx(l,{title:"TH",width:70,dataIndex:"th_vt_dn"},"th_vt_dn"),e.jsx(l,{title:"TL",width:70,dataIndex:"tl_vt_dn",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_vt_dn,"%"]})},"tl_vt_dn")]}),e.jsxs(h,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng đặt hàng",children:[e.jsx(l,{title:"KH",width:70,dataIndex:"kh_dat_hang"},"kh_dat_hang"),e.jsx(l,{title:"TH",width:70,dataIndex:"th_dat_hang"},"th_dat_hang"),e.jsx(l,{title:"TL",width:70,dataIndex:"tl_dat_hang",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_dat_hang,"%"]})},"tl_dat_hang")]}),e.jsxs(h,{className:"!whitespace-normal !min-w-[210px] !text-center",title:"Số khách hàng thêm mới",children:[e.jsx(l,{title:"KH",width:70,dataIndex:"kh_kh_moi"},"kh_kh_moi"),e.jsx(l,{title:"TH",width:70,dataIndex:"th_kh_moi"},"th_kh_moi"),e.jsx(l,{title:"TL",width:70,dataIndex:"tl_kh_moi",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_kh_moi,"%"]})},"tl_kh_moi")]}),e.jsxs(h,{className:"!whitespace-normal",title:"Số đơn hàng",width:210,children:[e.jsx(l,{title:"KH",width:70,dataIndex:"kh_don_hang"},"kh_don_hang"),e.jsx(l,{title:"TH",width:70,dataIndex:"th_don_hang"},"th_don_hang"),e.jsx(l,{title:"TL",width:70,dataIndex:"tl_don_hang",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_don_hang,"%"]})},"tl_don_hang")]}),e.jsxs(h,{className:"!whitespace-normal",title:"Doanh số (VNĐ)",width:210,children:[e.jsx(l,{title:"KH",dataIndex:"kh_doanh_so",render:(a,t)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(t.kh_doanh_so)})},"kh_doanh_so"),e.jsx(l,{title:"TH",width:70,dataIndex:"th_doanh_so",render:(a,t)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(t.th_doanh_so)})},"th_doanh_so"),e.jsx(l,{title:"TL",width:70,dataIndex:"tl_don_hang",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_don_hang,"%"]})},"tl_don_hang")]}),e.jsxs(h,{className:"!whitespace-normal",title:"Doanh thu (VNĐ)",width:210,children:[e.jsx(l,{title:"KH",width:70,dataIndex:"kh_doanh_thu",render:(a,t)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(t.kh_doanh_thu)})},"kh_doanh_thu"),e.jsx(l,{title:"TH",width:70,dataIndex:"th_doanh_thu",render:(a,t)=>e.jsx(e.Fragment,{children:Intl.NumberFormat().format(t.th_doanh_thu)})},"th_doanh_thu"),e.jsx(l,{title:"TL",width:70,dataIndex:"tl_doanh_thu",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_doanh_thu,"%"]})},"tl_doanh_thu")]}),e.jsxs(h,{className:"!whitespace-normal",title:"Sản lượng",width:210,children:[e.jsx(l,{title:"KH",width:70,dataIndex:"kh_san_lg"},"kh_san_lg"),e.jsx(l,{title:"TH",width:70,dataIndex:"th_san_lg"},"th_san_lg"),e.jsx(l,{title:"TL",width:70,dataIndex:"tl_san_luong",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_san_luong,"%"]})},"tl_san_luong")]}),e.jsxs(h,{className:"!whitespace-normal",title:"SKU",width:210,children:[e.jsx(l,{title:"KH",width:70,dataIndex:"kh_sku"},"kh_sku"),e.jsx(l,{title:"TH",width:70,dataIndex:"th_sku"},"th_sku"),e.jsx(l,{title:"TL",width:70,dataIndex:"tl_sku",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_sku,"%"]})},"tl_sku")]}),e.jsxs(h,{className:"!whitespace-normal",title:"Số giờ làm việc",width:210,children:[e.jsx(l,{title:"KH",width:70,dataIndex:"kh_so_gio_lam_viec"},"kh_so_gio_lam_viec"),e.jsx(l,{title:"TH",width:70,dataIndex:"th_so_gio_lam_viec"},"th_so_gio_lam_viec"),e.jsx(l,{title:"TL",width:70,dataIndex:"tl_so_gio_lam_viec",render:(a,t)=>e.jsxs(e.Fragment,{children:[t.tl_so_gio_lam_viec,"%"]})},"tl_so_gio_lam_viec")]})]})})]})]})}function te(){return e.jsxs(e.Fragment,{children:[e.jsx(R,{children:e.jsx("title",{children:" ReportKPI"})}),e.jsx(U,{})]})}export{te as default};
