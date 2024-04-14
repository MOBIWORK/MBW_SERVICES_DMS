import{W as r}from"./index-U-ZTVs3o.js";function a(e,t=500){let[s,u]=r.useState(e);return r.useEffect(()=>{let n=setTimeout(()=>{u(e)},t);return()=>clearTimeout(n)},[e,t]),s}export{a as u};
