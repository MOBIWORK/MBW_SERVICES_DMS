import{L as e,Y as a,V as o,a1 as l,aW as g,R as Y,bG as y,b1 as w,ab as D}from"./index-DWSVeQA5.js";import{D as b}from"./date-picker-RWQW_VHX.js";import"./index-C4Boijk6.js";const C=({size:t=16})=>e.jsx("svg",{width:t,height:t+12,viewBox:"0 0 16 28",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M14 27.3438C13.8125 27.3438 13.6406 27.3073 13.4844 27.2344C13.3281 27.1615 13.1875 27.0729 13.0625 26.9688L1.0625 14.9375C0.9375 14.8333 0.838542 14.6979 0.765625 14.5312C0.692708 14.3646 0.65625 14.1875 0.65625 14C0.65625 13.8125 0.692708 13.6406 0.765625 13.4844C0.838542 13.3281 0.9375 13.1875 1.0625 13.0625L13.0625 1.0625C13.1875 0.9375 13.3281 0.838541 13.4844 0.765625C13.6406 0.692709 13.8229 0.65625 14.0312 0.65625C14.3854 0.65625 14.6927 0.786459 14.9531 1.04688C15.2135 1.30729 15.3438 1.625 15.3438 2C15.3438 2.1875 15.3073 2.36458 15.2344 2.53125C15.1615 2.69792 15.0625 2.83333 14.9375 2.9375L3.875 14L14.9375 25.0625C15.0625 25.1875 15.1615 25.3333 15.2344 25.5C15.3073 25.6667 15.3438 25.8333 15.3438 26C15.3438 26.375 15.2135 26.6927 14.9531 26.9531C14.6927 27.2135 14.375 27.3438 14 27.3438Z",fill:"#ABABAB"})}),c=t=>({date:o(t.$d).format("YYYY-MM-DD"),from_time:o(t.$d).startOf("day").format("YYYY-MM-DDTHH:mm:ss"),to_time:o(t.$d).endOf("day").format("YYYY-MM-DDTHH:mm:ss")});function M({employee:t}){const[d,p]=a.useState(""),[f,x]=a.useState({date:o().format("YYYY-MM-DD"),from_time:o().startOf("day").format("YYYY-MM-DDTHH:mm:ss"),to_time:o().endOf("day").format("YYYY-MM-DDTHH:mm:ss")}),[i,n]=a.useState({apiKey:"w1Dlh2wRon7mE6sL196TgvLS45fw02uon74pJ0rc",projectId:"",objectId:"",...f}),h=s=>{x(c(s)),n(r=>({...r,...c(s)}))};return a.useEffect(()=>{(async()=>{try{const s=l.get("/api/method/mbw_dms.api.user.get_projectID"),r=t?l.get("/api/method/mbw_dms.api.user.get_employee_info_by_objid",{params:{object_id:t??""}}):{},[j,m]=await Promise.all([s,r]);n(u=>({...u,projectId:j.result["Project ID"],objectId:t??""})),t&&p(`${m.result.employee_name}-${m.result.name}`)}catch(s){g.error(s?.message||"Something was wrong!!!")}})()},[t]),a.useEffect(()=>{var s="";return i.projectId&&(s=document.createElement("script"),s.src="https://files.ekgis.vn/sdks/tracking/v2/ekmapplf-history-map.min.js",s.async=!0,document.body.appendChild(s),s.onload=async()=>{try{console.log("loading...");let r=await new window.ekmapplf_Tracking.HistoryMap().init("map_history_1sss",i);console.log("results...",r)}catch(r){console.log("error......",r)}}),()=>{s&&document.body.removeChild(s)}},[i]),e.jsxs(e.Fragment,{children:[e.jsxs(Y,{className:"flex flex-wrap justify-between items-center px-[30px] bg-[#fff]",children:[e.jsxs("div",{className:"flex justify-center items-center",children:[e.jsxs(y,{to:"/employee-monitor",children:[" ",e.jsx(C,{})]}),e.jsx("span",{className:"text-2xl font-semibold leading-[21px] mx-5",children:d})]}),e.jsx("div",{className:"flex",children:e.jsx("div",{className:"p-4 border border-solid border-transparent border-b-[#F5F5F5]",children:e.jsx(b,{defaultValue:o(),format:"DD-MM-YYYY",onChange:h})})})]}),e.jsx("div",{id:"map_history_1sss",className:" h-full px-[30px]"})]})}function _(){a.useState("list");const{employee_id:t}=w();return e.jsx(e.Fragment,{children:e.jsx(M,{employee:t})})}function I(){return e.jsxs(e.Fragment,{children:[e.jsx(D,{children:e.jsx("title",{children:" EmployeeMonitor Detail"})}),e.jsx(_,{})]})}export{I as default};
