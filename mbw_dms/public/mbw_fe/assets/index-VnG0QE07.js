import{Y as f,aa as i}from"./index-IqvFt--c.js";var l={VITE_BASE_PATH:"/mbw_desk",VITE_KEY_MAP:"wtpM0U1ZmE2s87LEZNSHf63Osc1a2sboaozCQNsy",VITE_API_KEY:"w1Dlh2wRon7mE6sL196TgvLS45fw02uon74pJ0rc",BASE_URL:"/assets/mbw_dms/mbw_fe/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const _=(s="",t="")=>{const[r]=i.useModal(),o=r.info({title:s,content:t});setTimeout(()=>{o.destroy()},1e3)},E=(s,t,r={})=>{let o=[];return s.forEach(n=>{let a={};for(let e in n)t.includes(e)&&(a[e]=n[e]);r.isNull?o.push(a):Object.keys(a).find(c=>!a[c])||o.push(a)}),o},d=({data:s=[],parentField:t="",parentValue:r=null,keyValue:o=""})=>s.length==0?s:s.filter(a=>a[t]==r||!r&&!s.find(e=>e[o]==a[t])).map(a=>({...a,children:d({data:s.filter(e=>e[t]!==r&&(r||s.find(c=>c[o]==e[t]))),parentField:t,parentValue:a[o],keyValue:o})}));f.locale("vi");const u=(s,t)=>{const r=[];let o=f(s);for(;o.isBefore(t)||o.isSame(t,"day");)r.push({date:o.format("DD/MM/YYYY"),dayOfWeek:o.format("dddd")}),o=o.add(1,"day");return console.log("dateObjects",r),r},w=s=>{const t=new URLSearchParams(s);window.location.href=(l.VITE_BASE_URL||"")+`/api/method/frappe.core.doctype.data_import.data_import.download_template?${t.toString()}`},h=s=>{window.location.href=s};export{w as E,h as a,u as b,E as g,_ as m,d as t};