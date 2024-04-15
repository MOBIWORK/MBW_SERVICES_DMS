import{W as r}from"./index-DIT_EWQU.js";function a(e,t=500){let[s,u]=r.useState(e);return r.useEffect(()=>{let n=setTimeout(()=>{u(e)},t);return()=>clearTimeout(n)},[e,t]),s}export{a as u};
