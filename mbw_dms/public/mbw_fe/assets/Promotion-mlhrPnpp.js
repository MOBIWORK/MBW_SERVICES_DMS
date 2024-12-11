import{Y as n,ay as T,al as P,L as e,U as c,ba as L,V as b,a5 as G,b0 as B,bC as Z,a1 as q,a2 as J,bD as D,bE as Q,bF as W,a8 as X,a_ as ee,R as te,P as k,aw as ae,ac as se,ae as ne}from"./index-Nr-aOhNl.js";import{C as oe}from"./index-wGim9TZp.js";import{c as re,u as l,P as u}from"./useMediaQuery-iwLaZ1FU.js";import{u as ie,S as ce}from"./index-bewdzdiQ.js";import{D as le}from"./dropDownFilter-5GaKSbuj.js";import{V as de}from"./index.esm-8XhnsUtC.js";import"./index.esm-xzfmr6j7.js";import"./data-u-VkVTNg.js";import"./index-tK5S8JnW.js";var me={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M624 706.3h-74.1V464c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v242.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.7a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9z"}},{tag:"path",attrs:{d:"M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7-23.5-24.2-36-56.8-34.9-90.6.9-26.4 9.9-51.2 26.2-72.1 16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9 13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0152.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9 15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5 37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7a123.07 123.07 0 01-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3z"}}]},name:"cloud-download",theme:"outlined"};const ue=me;var he=function(s,t){return n.createElement(T,P({},s,{ref:t,icon:ue}))};const pe=n.forwardRef(he);var xe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M518.3 459a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V856c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V613.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 459z"}},{tag:"path",attrs:{d:"M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7-23.5-24.2-36-56.8-34.9-90.6.9-26.4 9.9-51.2 26.2-72.1 16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9 13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0152.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9 15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5 37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7a123.07 123.07 0 01-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3z"}}]},name:"cloud-upload",theme:"outlined"};const ge=xe;var ye=function(s,t){return n.createElement(T,P({},s,{ref:t,icon:ge}))};const we=n.forwardRef(ye),_e=o=>[{title:e.jsx("div",{className:"text-start",children:"Trạng thái"}),dataIndex:"status",width:100,key:"status",render:(s,t)=>t.status==="Hoạt động"?e.jsx(c,{children:"Hoạt động",type:"Success"}):t.status==="Khóa"?e.jsx(c,{children:"Khóa",type:"Khóa"}):t.status==="Chạy thử"?e.jsx(c,{children:"Chạy thử",type:"Chạy thử"}):e.jsx(c,{children:"Chờ duyệt",type:"Chờ duyệt"})},{title:e.jsx("div",{className:"text-start min-w-[100px]",children:"Mã chương trình"}),dataIndex:"code",key:"code",width:150,render:(s,t)=>e.jsx(L,{to:`/promotion/${t.name}`,className:"underline-offset-2 underline",children:e.jsx("div",{className:" w-[150px] truncate hover:whitespace-normal",children:s})})},{title:e.jsx("div",{className:"text-start",children:"Tên chương trình"}),dataIndex:"name_promotion",width:120,key:"name_promotion",render:(s,t)=>e.jsx("div",{className:"min-w-[220px] text-wrap",children:s})},{title:e.jsx("div",{className:"text-start",children:"Hình thức khuyến mại"}),dataIndex:"ptype_name",width:120,key:"ptype_name",render:(s,t)=>e.jsx("div",{className:"min-w-[220px] text-wrap",children:t.ptype_name})},{title:e.jsx("div",{className:"text-start",children:"Nhóm khách hàng"}),dataIndex:"customer_group",width:180,key:"customer_group",render:(s,t)=>e.jsx("div",{className:"truncate hover:whitespace-normal min-w-[180px] max-w-[170px]",children:t?.customer_group.length>0?t?.customer_group.join(", "):"Tất cả nhóm khách hàng"})},{title:e.jsx("div",{className:"text-start",children:"Loại khách hàng"}),dataIndex:"customer_type",width:150,key:"customer_type",render:(s,t)=>e.jsx("div",{className:"truncate hover:whitespace-normal  min-w-[180px] max-w-[170px]",children:t?.customer_type.length>0?t?.customer_type.join(", "):"Tất cả loại khách hàng"})},{title:e.jsx("div",{className:"text-start",children:"Từ ngày"}),dataIndex:"start_date",width:80,key:"start_date",render:(s,t)=>t?.start_date?b(t?.start_date*1e3).format("DD/MM/YYYY"):""},{title:e.jsx("div",{className:"text-start",children:"Đến ngày"}),dataIndex:"end_date",width:80,key:"end_date",render:(s,t)=>t?.end_date?b(t?.end_date*1e3).format("DD/MM/YYYY"):""}],fe=()=>{const o=G(),s=re(),[t,h]=n.useState(1),[d,E]=n.useState(0),[M,p]=n.useState(!1),[x,z]=n.useState(void 0),[g,H]=n.useState([]),I=ie(),[r,y]=n.useState([]),[O,R]=n.useState(!1),[Y,F]=B.useMessage(),{message:i,type:$}=l(a=>a.message);n.useEffect(()=>{i&&i.message!==""&&A(i,$)},[i]);const A=(a,m)=>{Y.open({type:m,content:a}),s(Z({message:"",type:""}))},{startDate:w,endDate:_}=l(a=>a.date),{customer_group:f,territory:v,status:j,type_promotion:C}=l(a=>a.group),{promotionData:{customer_type:N}}=l(a=>a.promotion),U={selectedRowKeys:r,onChange:a=>{y(a)}},S=q(x);n.useEffect(()=>{(async()=>{const a=await J.get("/api/method/mbw_dms.api.promotion.promotion.get_list_promotion",{params:{search_text:S,page_size:u,page_number:t,start_time:w,end_time:_,ctype_name:N[0]?.value,gtype_name:f,territory:v,status:j,ptype_value:C}});H(a?.result),E(a?.result?.totals)})()},[t,M,w,_,N[0]?.value,f,v,j,C,S]);const V=a=>{const m=a.target.value;z(m)},K=()=>{o("/promotion/promotion-create"),s(D(""))};return n.useEffect(()=>{s(D("")),s(Q(void 0)),s(W(void 0))},[]),e.jsxs(e.Fragment,{children:[F,e.jsx(oe,{header:e.jsx(X,{title:"Chương trình khuyến mại",buttons:[{icon:e.jsx(ce,{className:"text-xl leading-5"}),size:"18px",className:"flex mr-2 ",action:()=>{p(a=>!a)}},{disabled:O,icon:e.jsx(pe,{className:"text-xl leading-5"}),size:"20px",className:"flex items-center mr-2",action:ee.bind(null,{url:"/api/method/mbw_dms.api.promotion.export_promotion",params:{promotion_ids:r.join("; ")},file_name:"promotion.xlsx"},R)},{icon:e.jsx(we,{className:"text-xl leading-5"}),size:"20px",className:"flex items-center mr-2",action:()=>{}},{label:"Thêm mới",type:"primary",icon:e.jsx(de,{className:"text-xl leading-5"}),size:"20px",className:"flex items-center",action:K}],actions:r.length>0,listPromotion:r,setSelectedRowKeys:y,setRefresh:p}),children:e.jsxs("div",{className:"bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid overflow-hidden",children:[e.jsxs(te,{gutter:[16,16],className:"pr-4 items-center justify-between mt-4 ",children:[e.jsx(k,{className:"ml-4 w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[20%]",children:e.jsx(ae,{value:x,onChange:V,className:"w-full",placeholder:"Tìm kiếm theo tên hoặc mã khách hàng"})}),e.jsx(k,{className:"!ml-4",children:e.jsx(le,{inputFromDate:!0,inputToDate:!0,inputCustomerGroup:!0,inputStatus:!0,inputPromotionType:!0,inputCustomerTypePromotion:!0,inputTerritory:!0,setPage:h,promotionType:!0})})]}),e.jsx("div",{className:"mt-5 ",children:e.jsx(se,{columns:_e(),bordered:!0,$border:!0,rowSelection:{type:"checkbox",...U},dataSource:g?.data?.map(a=>({key:a.name,...a})),pagination:d&&d>u?{pageSize:u,showSizeChanger:!1,total:d,current:t,onChange(a){h(a)}}:!1,scroll:{x:!0,y:g?.data?.length>0?I?.h*.6:void 0}})})]})})]})},ve=fe;function Ee(){return e.jsxs(e.Fragment,{children:[e.jsx(ne,{children:e.jsx("title",{children:" Chương trình khuyến mại"})}),e.jsx(ve,{})]})}export{Ee as default};
