import{a7 as l,a5 as i}from"./index-jwzFZY06.js";const f=(e="",o="")=>{const[r]=i.useModal(),t=r.info({title:e,content:o});setTimeout(()=>{t.destroy()},1e3)},m=(e,o,r={})=>{let t=[];return e.forEach(n=>{let s={};for(let a in n)o.includes(a)&&(s[a]=n[a]);console.log("obj",s),r.isNull?t.push(s):Object.keys(s).find(c=>!s[c])||t.push(s)}),t},u=({data:e=[],parentField:o="",parentValue:r=null,keyValue:t=""})=>e.length==0?e:e.filter(s=>s[o]==r).map(s=>({...s,children:u({data:e.filter(a=>a[o]!==r),parentField:o,parentValue:s[t],keyValue:t})}));l.locale("vi");const y=(e,o)=>{const r=[];let t=l(e);for(;t.isBefore(o)||t.isSame(o,"day");)r.push({date:t.format("DD/MM/YYYY"),dayOfWeek:t.format("dddd")}),t=t.add(1,"day");return console.log("dateObjects",r),r},g=e=>l.unix(Number.parseFloat(e)/1e3).format("YYYY-MM-DDTHH:mm:ss"),h=e=>{const o=new Date(e).setHours(0,0,0).toString(),r=new Date(e).setHours(24,0,0).toString();return console.log({today:o,nextday:r}),{today:o,nextday:r}};export{h as T,g as a,y as b,m as g,f as m,u as t};
