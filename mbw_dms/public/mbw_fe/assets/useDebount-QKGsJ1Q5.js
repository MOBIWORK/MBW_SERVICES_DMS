import{X as r}from"./index-ltiP0un4.js";function a(e,t=500){let[s,u]=r.useState(e);return r.useEffect(()=>{let n=setTimeout(()=>{u(e)},t);return()=>clearTimeout(n)},[e,t]),s}export{a as u};
