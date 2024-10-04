import{Y as r}from"./index-_l7X_f-R.js";function o(e,t=500){let[n,s]=r.useState(e);return r.useEffect(()=>{let a=setTimeout(()=>{s(e)},t);return()=>clearTimeout(a)},[e,t]),n}export{o as u};
