import{av as i}from"./index-7clSpfXv.js";var f={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},d=i.createContext&&i.createContext(f),o=function(){return o=Object.assign||function(t){for(var r,e=1,n=arguments.length;e<n;e++){r=arguments[e];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(t[a]=r[a])}return t},o.apply(this,arguments)},h=function(t,r){var e={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&r.indexOf(n)<0&&(e[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)r.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(e[n[a]]=t[n[a]]);return e};function g(t){return t&&t.map(function(r,e){return i.createElement(r.tag,o({key:e},r.attr),g(r.child))})}function u(t){return function(r){return i.createElement(v,o({attr:o({},t.attr)},r),g(t.child))}}function v(t){var r=function(e){var n=t.attr,a=t.size,c=t.title,m=h(t,["attr","size","title"]),s=a||e.size||"1em",l;return e.className&&(l=e.className),t.className&&(l=(l?l+" ":"")+t.className),i.createElement("svg",o({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},e.attr,n,m,{className:l,style:o(o({color:t.color||e.color},e.style),t.style),height:s,width:s,xmlns:"http://www.w3.org/2000/svg"}),c&&i.createElement("title",null,c),t.children)};return d!==void 0?i.createElement(d.Consumer,null,function(e){return r(e)}):r(f)}function k(t){return u({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055"}},{tag:"path",attr:{d:"m22 3-5 5"}},{tag:"path",attr:{d:"m17 3 5 5"}}]})(t)}function p(t){return u({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"}}]})(t)}function w(t){return u({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}},{tag:"path",attr:{d:"M12 12v9"}},{tag:"path",attr:{d:"m16 16-4-4-4 4"}}]})(t)}export{u as G,w as L,p as a,k as b};
