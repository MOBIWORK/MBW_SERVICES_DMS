import{Y as a,ct as v,cu as Qe,cv as ee,V as j,L as e,P as F,a2 as f,cw as ce,a1 as y,a6 as ie,aa as ue,cx as E,cy as pe,cz as C,cA as I,cB as $,aZ as Ue,cC as R,cD as L,cE as O,a_ as Ze,a9 as Je,N as x,R as Xe,Q as H,cF as te,cG as se,cH as ae,cI as re,cJ as ne,cK as le,cL as oe,a7 as Pe,bD as et}from"./index-xiF43Tr7.js";import{D as tt}from"./index-D5MaW2V_.js";import{a as st}from"./index.esm-UAyDd-KR.js";import{e as at,f as rt}from"./data-u-VkVTNg.js";import{D as W}from"./index-FXPKXxzr.js";import{S as nt}from"./SyncOutlined-AMS7O7BM.js";import{V as lt}from"./VerticalAlignBottomOutlined--OaF5QOG.js";function he(){var s=a.useContext(v);return s}function me(s){s===void 0&&(s=v);var n=s===v?he:function(){return a.useContext(s)};return function(){var r=n(),c=r.store;return c}}var ot=me();function ct(s){s===void 0&&(s=v);var n=s===v?ot:me(s);return function(){var r=n();return r.dispatch}}var w=ct(),it=function(n,l){return n===l};function ut(s,n,l,r){var c=a.useReducer(function(b){return b+1},0),m=c[1],i=a.useMemo(function(){return Qe(l,r)},[l,r]),o=a.useRef(),p=a.useRef(),S=a.useRef(),g=a.useRef(),N=l.getState(),_;try{if(s!==p.current||N!==S.current||o.current){var D=s(N);g.current===void 0||!n(D,g.current)?_=D:_=g.current}else _=g.current}catch(b){throw o.current&&(b.message+=`
The error may be correlated with this previous error:
`+o.current.stack+`

`),b}return ee(function(){p.current=s,S.current=N,g.current=_,o.current=void 0}),ee(function(){function b(){try{var k=l.getState();if(k===S.current)return;var T=p.current(k);if(n(T,g.current))return;g.current=T,S.current=k}catch(V){o.current=V}m()}return i.onStateChange=b,i.trySubscribe(),b(),function(){return i.tryUnsubscribe()}},[l,i]),_}function pt(s){s===void 0&&(s=v);var n=s===v?he:function(){return a.useContext(s)};return function(r,c){c===void 0&&(c=it);var m=n(),i=m.store,o=m.subscription,p=ut(r,c,i,o);return a.useDebugValue(p),p}}var M=pt();const B=s=>{const[n,l]=a.useState(!1);return a.useEffect(()=>{const r=window.matchMedia(s);r.matches!==n&&l(r.matches);const c=()=>l(r.matches);return window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)},[n,s]),n},K="(max-width: 1062px)",Lt="(min-width: 1200px)",ht=[{label:"Tháng 1",value:"1"},{label:"Tháng 2",value:"2"},{label:"Tháng 3",value:"3"},{label:"Tháng 4",value:"4"},{label:"Tháng 5",value:"5"},{label:"Tháng 6",value:"6"},{label:"Tháng 7",value:"7"},{label:"Tháng 8",value:"8"},{label:"Tháng 9",value:"9"},{label:"Tháng 10",value:"10"},{label:"Tháng 11",value:"11"},{label:"Tháng 12",value:"12"}],Ot=20,mt=(j().month()+1).toString(),de=({setPage:s})=>{const n=w(),l=B(`${K}`);return e.jsxs(F,{className:`min-w-[130px] ${l?"w-full":" w-[20%]"}`,children:[e.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Tháng"}),e.jsx(f,{className:"!bg-[#F4F6F8] ",defaultValue:mt,options:ht,onChange:r=>{n(ce(r)),s&&s(1)}})]})},dt=()=>{const s=w(),[n,l]=a.useState([]);return a.useEffect(()=>{(async()=>{let r=await y.get("/api/method/mbw_sfa.api.router.get_team_sale");l(ie({data:r.result.map(c=>({title:c.name,value:c.name,...c})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),e.jsxs(F,{className:"min-w-[130px]  w-[20%]",children:[e.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Nhóm bán hàng"}),e.jsx(ue,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:n,onChange:r=>{s(E(r))},dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})]})},xe=()=>{const s=w(),n=r=>{s(pe(r?.$y.toString()))},l=B(`${K}`);return e.jsxs(F,{className:`min-w-[130px] ${l?"w-full":" w-[20%]"}`,children:[e.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Năm"}),e.jsx(W,{className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:n,placeholder:"Chọn năm",picker:"year",allowClear:!1,defaultValue:j().startOf("year")})]})},xt=({setPage:s,matchMedia:n})=>{const[l,r]=a.useState([]),[c,m]=a.useState(""),i=w(),{sales_team:o}=M(p=>p.group);return a.useEffect(()=>{(async()=>{let p=await y.get("/api/method/mbw_sfa.api.router.get_sale_person",{params:{team_sale:o,key_search:c}}),{message:S}=p;r(S.map(g=>({value:g.employee_code,label:g.employee_name||g.employee_code})))})()},[c,o]),e.jsxs(F,{className:`min-w-[130px] ${n?"w-full":"w-[20%]"}`,children:[e.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Nhân viên"}),e.jsx(f,{filterOption:!0,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:p=>{m(p)},options:l,onSelect:p=>{i(C(p)),s(1)},onClear:()=>{i(C(""))}})]})},ft=j().startOf("month"),fe=()=>{const s=w();M(r=>r.date);const n=B(`${K}`),l=r=>{if(r==null)s(I(r));else{let c=Date.parse(r.$d)/1e3;s(I(c))}};return e.jsxs(F,{className:`min-w-[130px]  ${n?"w-full":" w-[20%]"}`,children:[e.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Từ ngày"}),e.jsx(W,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",placeholder:"Từ ngày",onChange:l,defaultValue:ft,allowClear:!1})]})},yt=j().endOf("month"),ye=()=>{const s=w(),{startDate:n,endDate:l}=M(o=>o.date),r=o=>{if(n){const p=j.unix(n).month();return o&&o.month()!==p}},c=o=>{if(o==null)s($(o));else if(n&&o&&o.isBefore(j.unix(n),"day"))Ue.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");else{let p=Date.parse(o.$d)/1e3;s($(p))}},m=B(`${K}`),i=j(l*1e3);return e.jsxs(F,{className:`min-w-[130px] ${m?"w-full":" w-[20%]"}`,children:[e.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Đến ngày"}),e.jsx(W,{format:"DD-MM-YYYY",className:"!bg-[#F4F6F8] w-full rounded-lg h-7",onChange:c,placeholder:"Đến ngày",defaultValue:yt,disabledDate:r,value:i,allowClear:!1})]})},St=({setPage:s})=>{const[n,l]=a.useState([]),[r,c]=a.useState(""),m=w();return a.useEffect(()=>{(async()=>{let i=await y.get("/api/method/frappe.desk.search.search_link",{params:{txt:r,doctype:"Supplier",ignore_user_permissions:0,query:""}}),{message:o}=i;l(o.map(p=>({value:p?.value,label:p.description.split(",")[0].trim()})))})()},[r]),e.jsxs(F,{className:"min-w-[130px] w-[20%]",children:[e.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Nhà Cung cấp"}),e.jsx(f,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhà cung cấp",onSearch:i=>{c&&c(i)},options:n,onSelect:i=>{m(R(i)),s(1)},onClear:()=>{m(R(""))}})]})},gt=({setPage:s,matchMedia:n})=>{const[l,r]=a.useState([]),[c,m]=a.useState(""),i=w();return a.useEffect(()=>{(async()=>{let o=await y.get("/api/method/frappe.desk.search.search_link",{params:{txt:c,doctype:"Brand",ignore_user_permissions:0,query:""}}),{message:p}=o;r(p.map(S=>({value:S?.value,description:S?.description})))})()},[c]),e.jsxs(F,{className:`min-w-[130px] ${n?"w-full":"w-[20%]"}`,children:[e.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Nhãn hiệu"}),e.jsx(f,{filterOption:!1,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhãn hiệu",onSearch:o=>{m(o)},options:l,onSelect:o=>{i(L(o)),s(1)},onClear:()=>{i(L(""))}})]})},wt=({setPage:s})=>{const[n,l]=a.useState([]),[r,c]=a.useState(""),m=w();return a.useEffect(()=>{(async()=>{let i=await y.get("/api/method/frappe.desk.search.search_link",{params:{txt:r,doctype:"SFA Industry",ignore_user_permissions:0,query:""}}),{message:o}=i;l(o.map(p=>({value:p?.value,description:p?.description})))})()},[r]),e.jsxs(F,{className:"min-w-[130px] w-[20%]",children:[e.jsx("label",{className:"text-xs font-normal leading-[21px] pl-1 ",children:"Ngành hàng"}),e.jsx(f,{filterOption:!1,allowClear:!0,showSearch:!0,placeholder:"Tất cả ngành hàng",onSearch:i=>{c(i)},options:n,onSelect:i=>{m(O(i)),s(1)},onClear:()=>{m(O(""))}})]})},bt=j().startOf("month"),jt=j().endOf("month");let Ft=Date.parse(bt.$d)/1e3,_t=Date.parse(jt.$d)/1e3;const Ct=({setPage:s,matchMedia:n,inputFromDate:l,inputMonth:r,inputToDate:c,inputYear:m,inputSaleGroup:i,inputEmployee:o,inputCompany:p,inputCustomer:S,inputTerritory:g,inputWarehouse:N,inputCustomerType:_,inputCustomerGroup:D,inputOrder:b,inputSupplier:k,inputIndustry:T,inputBrand:V})=>{const[Se,ge]=a.useState([]),[we,be]=a.useState([]),[je,Fe]=a.useState([]),[_e,Ce]=a.useState([]),[ve,Ne]=a.useState([]),[ke,De]=a.useState([]),[Te,Ee]=a.useState([]),[Ie,$e]=a.useState([]),[Re,Le]=a.useState([]),[Oe,Me]=a.useState([]),[q,Be]=a.useState(""),[A,Ke]=a.useState(""),[G,Ve]=a.useState(""),[z,Ye]=a.useState(""),[Q,He]=a.useState(""),[U,We]=a.useState(""),[Z,qe]=a.useState(""),[J,Ae]=a.useState(""),[X,Ge]=a.useState(""),[Y]=Ze(),u=w(),{sales_team:P}=M(t=>t.group);a.useEffect(()=>{(async()=>{let t=await y.get("/api/method/frappe.desk.search.search_link",{params:{txt:J,doctype:"SFA Industry",ignore_user_permissions:0,query:""}}),{message:d}=t;Ee(d.map(h=>({value:h?.value,description:h?.description})))})()},[J]),a.useEffect(()=>{(async()=>{let t=await y.get("/api/method/frappe.desk.search.search_link",{params:{txt:Z,doctype:"Brand",ignore_user_permissions:0,query:""}}),{message:d}=t;De(d.map(h=>({value:h?.value,description:h?.description})))})()},[Z]),a.useEffect(()=>{(async()=>{let t=await y.get("/api/method/frappe.desk.search.search_link",{params:{txt:G,doctype:"Customer",ignore_user_permissions:0,query:""}}),{message:d}=t;ge(d.map(h=>({value:h.value,label:h.value})))})()},[G]),a.useEffect(()=>{(async()=>{let t=await y.get("/api/method/frappe.desk.search.search_link",{params:{txt:z,doctype:"Territory",ignore_user_permissions:0,query:""}}),{message:d}=t;Fe(d.map(h=>({value:h.value,label:h.value})))})()},[z]),a.useEffect(()=>{(async()=>{let t=await y.get("/api/method/frappe.desk.search.search_link",{params:{txt:X,doctype:"Customer Group",ignore_user_permissions:0,query:""}}),{message:d}=t;Ce(d.map(h=>({value:h.value.trim(),label:h.value.trim()})))})()},[X]),a.useEffect(()=>{(async()=>{let t=await y.get("/api/method/mbw_sfa.api.router.get_team_sale");$e(ie({data:t.result.map(d=>({title:d.name,value:d.name,...d})),keyValue:"value",parentField:"parent_sales_person"}))})()},[]),a.useEffect(()=>{(async()=>{let t=await y.get("/api/method/mbw_sfa.api.router.get_sale_person",{params:{team_sale:P,key_search:A}}),{message:d}=t;Le(d.map(h=>({value:h.employee_code,label:h.employee_name||h.employee_code})))})()},[P,A]),a.useEffect(()=>{(async()=>{let t=await y.get("/api/method/frappe.desk.search.search_link",{params:{txt:Q,doctype:"Company",ignore_user_permissions:0,query:""}}),{message:d}=t;Ne(d.map(h=>({value:h.value,label:h.value})))})()},[Q]),a.useEffect(()=>{(async()=>{let t=await y.get("/api/method/frappe.desk.search.search_link",{params:{txt:U,doctype:"Warehouse",ignore_user_permissions:0,query:""}}),{message:d}=t;be(d.map(h=>({value:h.value,label:h.value})))})()},[U]),a.useEffect(()=>{(async()=>{let t=await y.get("/api/method/frappe.desk.search.search_link",{params:{txt:q,doctype:"Supplier",ignore_user_permissions:0,query:""}}),{message:d}=t;Me(d.map(h=>({value:h?.value,label:h.description.split(",")[0].trim()})))})()},[q]);const ze=t=>{t.customergroup?u(te(t.customergroup)):u(te("")),t.customertype?u(se(t.customertype)):u(se("")),t.territory?u(ae(t.territory)):u(ae("")),t.has_sales_order?u(re(t.has_sales_order)):u(re("")),t.filter_month?u(I(Date.parse(t.filter_month.$d)/1e3)):u(I(Ft)),t.filter_year?u($(Date.parse(t.filter_year.$d)/1e3)):u($(_t)),t.company?u(ne(t.company)):u(ne("")),t.customer?u(le(t.customer)):u(le("")),t.warehouse?u(oe(t.warehouse)):u(oe("")),t.filter_group_sales?u(E(t.filter_group_sales)):u(E("")),t.filter_employee?u(C(t.filter_employee)):u(C("")),s&&s(1)};return e.jsx(Je,{className:"!h-8",placement:"bottomRight",trigger:["click"],dropdownRender:()=>e.jsxs(tt,{title:"Bộ lọc",children:[e.jsxs(x,{layout:"vertical",form:Y,onFinish:ze,children:[!n&&e.jsxs(e.Fragment,{children:[l&&e.jsx(x.Item,{className:"w-[468px] border-none",name:"filter_month",children:e.jsx(fe,{})}),r&&e.jsx(x.Item,{className:"w-[468px] border-none",name:"filter_month",children:e.jsx(de,{setPage:s})}),c&&e.jsx(x.Item,{className:"w-[468px] border-none",name:"filter_year",children:e.jsx(ye,{})}),m&&e.jsx(x.Item,{className:"w-[468px] border-none",name:"filter_year",children:e.jsx(xe,{})}),i&&e.jsx(x.Item,{className:"w-[468px] border-none",name:"filter_group_sales",label:"Nhóm bán hàng",children:e.jsx(ue,{placeholder:"Tất cả nhóm bán hàng",allowClear:!0,showSearch:!0,treeData:Ie,dropdownStyle:{maxHeight:400,overflow:"auto",minWidth:350}})}),o&&e.jsx(x.Item,{className:"w-[468px] border-none",label:"Nhân viên",name:"filter_employee",children:e.jsx(f,{filterOption:!0,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhân viên",onSearch:t=>{Ke(t)},options:Re,onClear:()=>{C&&C("")}})})]}),p&&e.jsx(x.Item,{name:"company",label:"Công ty",className:"w-[468px] border-none",children:e.jsx(f,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:ve,allowClear:!0,onSearch:t=>{He(t)},placeholder:"Tất cả công ty"})}),S&&e.jsx(x.Item,{name:"customer",label:"Khách hàng",className:"w-[468px] border-none",children:e.jsx(f,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:Se,filterOption:!1,allowClear:!0,onSearch:t=>{Ve(t)},placeholder:"Tất cả khách hàng"})}),N&&e.jsx(x.Item,{name:"warehouse",label:"Kho",className:"w-[468px] border-none",children:e.jsx(f,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:we,allowClear:!0,onSearch:t=>{We(t)},placeholder:"Tất cả kho"})}),_&&e.jsx(x.Item,{name:"customertype",label:"Loại khách hàng",className:"w-[468px] border-none",children:e.jsx(f,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:at,allowClear:!0,showSearch:!0,placeholder:"Tất cả loại khách hàng"})}),D&&e.jsx(x.Item,{name:"customergroup",label:"Nhóm khách hàng",className:"w-[468px] border-none",children:e.jsx(f,{className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:_e,allowClear:!0,onSearch:t=>{Ge(t)},showSearch:!0,placeholder:"Tất cả nhóm khách hàng"})}),b&&e.jsx(x.Item,{label:"Phát sinh đơn hàng",name:"hasorder",className:"w-[468px] border-none",children:e.jsx(f,{placeholder:"Tất cả",className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:rt,allowClear:!0,showSearch:!0})}),g&&e.jsx(x.Item,{name:"territory",label:"Khu vực",className:"w-[468px] border-none",children:e.jsx(f,{showSearch:!0,className:"!bg-[#F4F6F8] options:bg-[#F4F6F8]",options:je,allowClear:!0,onSearch:t=>{Ye(t)},placeholder:"Tất cả khu vực"})}),V&&e.jsx(x.Item,{name:"territory",label:"Nhãn hiệu",className:"w-[468px] border-none",children:e.jsx(f,{filterOption:!1,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhãn hiệu",onSearch:t=>{qe(t)},options:ke,onSelect:t=>{u(L(t)),s&&s(1)},onClear:()=>{u(L(""))}})}),k&&e.jsx(x.Item,{name:"supplier",label:"Nhà cung cấp",className:"w-[468px] border-none",children:e.jsx(f,{filterOption:!1,notFoundContent:null,allowClear:!0,showSearch:!0,placeholder:"Tất cả nhà cung cấp",onSearch:t=>{Be(t)},options:Oe,onSelect:t=>{u(R(t)),s&&s(1)},onClear:()=>{u(R(""))}})}),T&&e.jsx(x.Item,{name:"industry",label:"Ngành hàng",className:"w-[468px] border-none",children:e.jsx(f,{filterOption:!1,allowClear:!0,showSearch:!0,placeholder:"Tất cả ngành hàng",onSearch:t=>{Ae(t)},options:Te,onSelect:t=>{u(O(t)),s&&s(1)},onClear:()=>{u(O(""))}})})]}),e.jsx(Xe,{className:"justify-between pt-6 pb-4",children:e.jsxs(e.Fragment,{children:[e.jsx(H,{className:"mr-3",onClick:t=>{t.preventDefault(),u(ce("")),u(pe("")),u(E("")),u(C("")),Y.resetFields()},children:"Đặt lại"}),e.jsx(H,{type:"primary",onClick:()=>{Y.submit()},children:"Áp dụng"})]})})]}),children:e.jsx(H,{onClick:t=>t.preventDefault(),className:"flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px]  h-8 mt-4",icon:e.jsx(st,{style:{fontSize:"20px"}}),children:"Bộ lọc"})})},Mt=Ct,vt=({setPage:s,inputMonth:n,inputYear:l,inputFromDate:r,inputToDate:c,inputSaleGroup:m,inputEmployee:i,inputSupplier:o,inputIndustry:p,inpitBrand:S})=>e.jsxs(e.Fragment,{children:[n&&e.jsx(de,{setPage:s}),l&&e.jsx(xe,{}),r&&e.jsx(fe,{}),c&&e.jsx(ye,{}),m&&e.jsx(dt,{}),i&&e.jsx(xt,{setPage:s}),o&&e.jsx(St,{setPage:s}),p&&e.jsx(wt,{setPage:s}),S&&e.jsx(gt,{setPage:s})]}),Bt=vt,Nt=({setRefresh:s,title:n,params:l,file_name:r})=>{const[c,m]=a.useState(!1);return e.jsx(Pe,{title:n,buttons:[{icon:e.jsx(nt,{className:"text-xl size-4 mb-1 mr-[2px]"}),className:"flex mr-2 h-7 mt-6",action:()=>{s(i=>!i)}},{disabled:c,label:"Xuất dữ liệu",type:"primary",icon:e.jsx(lt,{className:"text-xl"}),size:"18px",className:"flex items-center h-7 mt-6",action:et.bind(null,{url:"/api/method/mbw_sfa.api.exports.export_excel.export_excel",params:l,file_name:r},m)}]})},Kt=Nt;export{Mt as D,Bt as F,Ot as P,Kt as R,M as a,Lt as b,K as m,B as u};
