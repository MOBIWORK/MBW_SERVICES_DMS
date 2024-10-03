import{Y as s,a as de,cm as ge,at as T,_ as ee,an as fe,af as pe,ao as H,cn as Q,aE as me,ay as ve,az as he,aB as ye,h as te,K as Ce,aD as be,bb as Se,co as $e,b1 as ke,cp as Ee,c8 as xe}from"./index-S4dKpla8.js";var Pe={percent:0,prefixCls:"rc-progress",strokeColor:"#2db7f5",strokeLinecap:"round",strokeWidth:1,trailColor:"#D9D9D9",trailWidth:1,gapPosition:"bottom"},we=function(){var t=s.useRef([]),r=s.useRef(null);return s.useEffect(function(){var o=Date.now(),n=!1;t.current.forEach(function(a){if(a){n=!0;var i=a.style;i.transitionDuration=".3s, .3s, .3s, .06s",r.current&&o-r.current<100&&(i.transitionDuration="0s, 0s")}}),n&&(r.current=Date.now())}),t.current},re=0,Oe=ge();function Ie(){var e;return Oe?(e=re,re+=1):e="TEST_OR_SSR",e}const je=function(e){var t=s.useState(),r=de(t,2),o=r[0],n=r[1];return s.useEffect(function(){n("rc_progress_".concat(Ie()))},[]),e||o};var oe=function(t){var r=t.bg,o=t.children;return s.createElement("div",{style:{width:"100%",height:"100%",background:r}},o)};function ne(e,t){return Object.keys(e).map(function(r){var o=parseFloat(r),n="".concat(Math.floor(o*t),"%");return"".concat(e[r]," ").concat(n)})}var De=s.forwardRef(function(e,t){var r=e.prefixCls,o=e.color,n=e.gradientId,a=e.radius,i=e.style,c=e.ptg,l=e.strokeLinecap,d=e.strokeWidth,u=e.size,f=e.gapDegree,v=o&&T(o)==="object",y=v?"#FFF":void 0,h=u/2,m=s.createElement("circle",{className:"".concat(r,"-circle-path"),r:a,cx:h,cy:h,stroke:y,strokeLinecap:l,strokeWidth:d,opacity:c===0?0:1,style:i,ref:t});if(!v)return m;var g="".concat(n,"-conic"),$=f?"".concat(180+f/2,"deg"):"0deg",C=ne(o,(360-f)/360),b=ne(o,1),p="conic-gradient(from ".concat($,", ").concat(C.join(", "),")"),x="linear-gradient(to ".concat(f?"bottom":"top",", ").concat(b.join(", "),")");return s.createElement(s.Fragment,null,s.createElement("mask",{id:g},m),s.createElement("foreignObject",{x:0,y:0,width:u,height:u,mask:"url(#".concat(g,")")},s.createElement(oe,{bg:x},s.createElement(oe,{bg:p}))))}),F=100,Y=function(t,r,o,n,a,i,c,l,d,u){var f=arguments.length>10&&arguments[10]!==void 0?arguments[10]:0,v=o/100*360*((360-i)/360),y=i===0?0:{bottom:0,top:180,left:90,right:-90}[c],h=(100-n)/100*r;d==="round"&&n!==100&&(h+=u/2,h>=r&&(h=r-.01));var m=F/2;return{stroke:typeof l=="string"?l:void 0,strokeDasharray:"".concat(r,"px ").concat(t),strokeDashoffset:h+f,transform:"rotate(".concat(a+v+y,"deg)"),transformOrigin:"".concat(m,"px ").concat(m,"px"),transition:"stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s",fillOpacity:0}},_e=["id","prefixCls","steps","strokeWidth","trailWidth","gapDegree","gapPosition","trailColor","strokeLinecap","style","className","strokeColor","percent"];function se(e){var t=e??[];return Array.isArray(t)?t:[t]}var Ne=function(t){var r=ee(ee({},Pe),t),o=r.id,n=r.prefixCls,a=r.steps,i=r.strokeWidth,c=r.trailWidth,l=r.gapDegree,d=l===void 0?0:l,u=r.gapPosition,f=r.trailColor,v=r.strokeLinecap,y=r.style,h=r.className,m=r.strokeColor,g=r.percent,$=fe(r,_e),C=F/2,b=je(o),p="".concat(b,"-gradient"),x=C-i/2,j=Math.PI*2*x,N=d>0?90+d/2:-90,E=j*((360-d)/360),W=T(a)==="object"?a:{count:a,space:2},O=W.count,D=W.space,R=se(g),k=se(m),S=k.find(function(M){return M&&T(M)==="object"}),P=S&&T(S)==="object",I=P?"butt":v,V=Y(j,E,0,100,N,d,u,f,I,i),Z=we(),ae=function(){var B=0;return R.map(function(L,_){var U=k[_]||k[k.length-1],A=Y(j,E,B,L,N,d,u,U,I,i);return B+=L,s.createElement(De,{key:_,color:U,ptg:L,radius:x,prefixCls:n,gradientId:p,style:A,strokeLinecap:I,strokeWidth:i,gapDegree:d,ref:function(q){Z[_]=q},size:F})}).reverse()},le=function(){var B=Math.round(O*(R[0]/100)),L=100/O,_=0;return new Array(O).fill(null).map(function(U,A){var X=A<=B-1?k[0]:f,q=X&&T(X)==="object"?"url(#".concat(p,")"):void 0,J=Y(j,E,_,L,N,d,u,X,"butt",i,D);return _+=(E-J.strokeDashoffset+D)*100/E,s.createElement("circle",{key:A,className:"".concat(n,"-circle-path"),r:x,cx:C,cy:C,stroke:q,strokeWidth:i,opacity:1,style:J,ref:function(ue){Z[A]=ue}})})};return s.createElement("svg",pe({className:H("".concat(n,"-circle"),h),viewBox:"0 0 ".concat(F," ").concat(F),style:y,id:o,role:"presentation"},$),!O&&s.createElement("circle",{className:"".concat(n,"-circle-trail"),r:x,cx:C,cy:C,stroke:f,strokeLinecap:I,strokeWidth:c||i,style:V}),O?le():ae())};function w(e){return!e||e<0?0:e>100?100:e}function z(e){let{success:t,successPercent:r}=e,o=r;return t&&"progress"in t&&(o=t.progress),t&&"percent"in t&&(o=t.percent),o}const We=e=>{let{percent:t,success:r,successPercent:o}=e;const n=w(z({success:r,successPercent:o}));return[n,w(w(t)-n)]},Le=e=>{let{success:t={},strokeColor:r}=e;const{strokeColor:o}=t;return[o||Q.green,r||null]},K=(e,t,r)=>{var o,n,a,i;let c=-1,l=-1;if(t==="step"){const d=r.steps,u=r.strokeWidth;typeof e=="string"||typeof e>"u"?(c=e==="small"?2:14,l=u??8):typeof e=="number"?[c,l]=[e,e]:[c=14,l=8]=e,c*=d}else if(t==="line"){const d=r?.strokeWidth;typeof e=="string"||typeof e>"u"?l=d||(e==="small"?6:8):typeof e=="number"?[c,l]=[e,e]:[c=-1,l=8]=e}else(t==="circle"||t==="dashboard")&&(typeof e=="string"||typeof e>"u"?[c,l]=e==="small"?[60,60]:[120,120]:typeof e=="number"?[c,l]=[e,e]:(c=(n=(o=e[0])!==null&&o!==void 0?o:e[1])!==null&&n!==void 0?n:120,l=(i=(a=e[0])!==null&&a!==void 0?a:e[1])!==null&&i!==void 0?i:120));return[c,l]},Ae=3,Te=e=>Ae/e*100,Fe=e=>{const{prefixCls:t,trailColor:r=null,strokeLinecap:o="round",gapPosition:n,gapDegree:a,width:i=120,type:c,children:l,success:d,size:u=i}=e,[f,v]=K(u,"circle");let{strokeWidth:y}=e;y===void 0&&(y=Math.max(Te(f),6));const h={width:f,height:v,fontSize:f*.15+6},m=s.useMemo(()=>{if(a||a===0)return a;if(c==="dashboard")return 75},[a,c]),g=n||c==="dashboard"&&"bottom"||void 0,$=Object.prototype.toString.call(e.strokeColor)==="[object Object]",C=Le({success:d,strokeColor:e.strokeColor}),b=H(`${t}-inner`,{[`${t}-circle-gradient`]:$}),p=s.createElement(Ne,{percent:We(e),strokeWidth:y,trailWidth:y,strokeColor:C,strokeLinecap:o,trailColor:r,prefixCls:t,gapDegree:m,gapPosition:g});return s.createElement("div",{className:b,style:h},f<=20?s.createElement(me,{title:l},s.createElement("span",null,p)):s.createElement(s.Fragment,null,p,l))},Re=Fe,G="--progress-line-stroke-color",ce="--progress-percent",ie=e=>{const t=e?"100%":"-100%";return new Ce(`antProgress${e?"RTL":"LTR"}Active`,{"0%":{transform:`translateX(${t}) scaleX(0)`,opacity:.1},"20%":{transform:`translateX(${t}) scaleX(0)`,opacity:.5},to:{transform:"translateX(0) scaleX(1)",opacity:0}})},Me=e=>{const{componentCls:t,iconCls:r}=e;return{[t]:Object.assign(Object.assign({},ye(e)),{display:"inline-block","&-rtl":{direction:"rtl"},"&-line":{position:"relative",width:"100%",fontSize:e.fontSize,marginInlineEnd:e.marginXS,marginBottom:e.marginXS},[`${t}-outer`]:{display:"inline-block",width:"100%"},[`&${t}-show-info`]:{[`${t}-outer`]:{marginInlineEnd:`calc(-2em - ${te(e.marginXS)})`,paddingInlineEnd:`calc(2em + ${te(e.paddingXS)})`}},[`${t}-inner`]:{position:"relative",display:"inline-block",width:"100%",overflow:"hidden",verticalAlign:"middle",backgroundColor:e.remainingColor,borderRadius:e.lineBorderRadius},[`${t}-inner:not(${t}-circle-gradient)`]:{[`${t}-circle-path`]:{stroke:e.defaultColor}},[`${t}-success-bg, ${t}-bg`]:{position:"relative",background:e.defaultColor,borderRadius:e.lineBorderRadius,transition:`all ${e.motionDurationSlow} ${e.motionEaseInOutCirc}`},[`${t}-bg`]:{overflow:"hidden","&::after":{content:'""',background:{_multi_value_:!0,value:["inherit",`var(${G})`]},height:"100%",width:`calc(1 / var(${ce}) * 100%)`,display:"block"}},[`${t}-success-bg`]:{position:"absolute",insetBlockStart:0,insetInlineStart:0,backgroundColor:e.colorSuccess},[`${t}-text`]:{display:"inline-block",width:"2em",marginInlineStart:e.marginXS,color:e.colorText,lineHeight:1,whiteSpace:"nowrap",textAlign:"start",verticalAlign:"middle",wordBreak:"normal",[r]:{fontSize:e.fontSize}},[`&${t}-status-active`]:{[`${t}-bg::before`]:{position:"absolute",inset:0,backgroundColor:e.colorBgContainer,borderRadius:e.lineBorderRadius,opacity:0,animationName:ie(),animationDuration:e.progressActiveMotionDuration,animationTimingFunction:e.motionEaseOutQuint,animationIterationCount:"infinite",content:'""'}},[`&${t}-rtl${t}-status-active`]:{[`${t}-bg::before`]:{animationName:ie(!0)}},[`&${t}-status-exception`]:{[`${t}-bg`]:{backgroundColor:e.colorError},[`${t}-text`]:{color:e.colorError}},[`&${t}-status-exception ${t}-inner:not(${t}-circle-gradient)`]:{[`${t}-circle-path`]:{stroke:e.colorError}},[`&${t}-status-success`]:{[`${t}-bg`]:{backgroundColor:e.colorSuccess},[`${t}-text`]:{color:e.colorSuccess}},[`&${t}-status-success ${t}-inner:not(${t}-circle-gradient)`]:{[`${t}-circle-path`]:{stroke:e.colorSuccess}}})}},Be=e=>{const{componentCls:t,iconCls:r}=e;return{[t]:{[`${t}-circle-trail`]:{stroke:e.remainingColor},[`&${t}-circle ${t}-inner`]:{position:"relative",lineHeight:1,backgroundColor:"transparent"},[`&${t}-circle ${t}-text`]:{position:"absolute",insetBlockStart:"50%",insetInlineStart:0,width:"100%",margin:0,padding:0,color:e.circleTextColor,fontSize:e.circleTextFontSize,lineHeight:1,whiteSpace:"normal",textAlign:"center",transform:"translateY(-50%)",[r]:{fontSize:e.circleIconFontSize}},[`${t}-circle&-status-exception`]:{[`${t}-text`]:{color:e.colorError}},[`${t}-circle&-status-success`]:{[`${t}-text`]:{color:e.colorSuccess}}},[`${t}-inline-circle`]:{lineHeight:1,[`${t}-inner`]:{verticalAlign:"bottom"}}}},Xe=e=>{const{componentCls:t}=e;return{[t]:{[`${t}-steps`]:{display:"inline-block","&-outer":{display:"flex",flexDirection:"row",alignItems:"center"},"&-item":{flexShrink:0,minWidth:e.progressStepMinWidth,marginInlineEnd:e.progressStepMarginInlineEnd,backgroundColor:e.remainingColor,transition:`all ${e.motionDurationSlow}`,"&-active":{backgroundColor:e.defaultColor}}}}}},ze=e=>{const{componentCls:t,iconCls:r}=e;return{[t]:{[`${t}-small&-line, ${t}-small&-line ${t}-text ${r}`]:{fontSize:e.fontSizeSM}}}},Ge=e=>({circleTextColor:e.colorText,defaultColor:e.colorInfo,remainingColor:e.colorFillSecondary,lineBorderRadius:100,circleTextFontSize:"1em",circleIconFontSize:`${e.fontSize/e.fontSizeSM}em`}),He=ve("Progress",e=>{const t=e.calc(e.marginXXS).div(2).equal(),r=he(e,{progressStepMarginInlineEnd:t,progressStepMinWidth:t,progressActiveMotionDuration:"2.4s"});return[Me(r),Be(r),Xe(r),ze(r)]},Ge);var Ke=function(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(r[o[n]]=e[o[n]]);return r};const Ve=e=>{let t=[];return Object.keys(e).forEach(r=>{const o=parseFloat(r.replace(/%/g,""));isNaN(o)||t.push({key:o,value:e[r]})}),t=t.sort((r,o)=>r.key-o.key),t.map(r=>{let{key:o,value:n}=r;return`${n} ${o}%`}).join(", ")},Ue=(e,t)=>{const{from:r=Q.blue,to:o=Q.blue,direction:n=t==="rtl"?"to left":"to right"}=e,a=Ke(e,["from","to","direction"]);if(Object.keys(a).length!==0){const c=Ve(a),l=`linear-gradient(${n}, ${c})`;return{background:l,[G]:l}}const i=`linear-gradient(${n}, ${r}, ${o})`;return{background:i,[G]:i}},qe=e=>{const{prefixCls:t,direction:r,percent:o,size:n,strokeWidth:a,strokeColor:i,strokeLinecap:c="round",children:l,trailColor:d=null,success:u}=e,f=i&&typeof i!="string"?Ue(i,r):{[G]:i,background:i},v=c==="square"||c==="butt"?0:void 0,y=n??[-1,a||(n==="small"?6:8)],[h,m]=K(y,"line",{strokeWidth:a}),g={backgroundColor:d||void 0,borderRadius:v},$=Object.assign(Object.assign({width:`${w(o)}%`,height:m,borderRadius:v},f),{[ce]:w(o)/100}),C=z(e),b={width:`${w(C)}%`,height:m,borderRadius:v,backgroundColor:u?.strokeColor},p={width:h<0?"100%":h,height:m};return s.createElement(s.Fragment,null,s.createElement("div",{className:`${t}-outer`,style:p},s.createElement("div",{className:`${t}-inner`,style:g},s.createElement("div",{className:`${t}-bg`,style:$}),C!==void 0?s.createElement("div",{className:`${t}-success-bg`,style:b}):null)),l)},Ye=qe,Qe=e=>{const{size:t,steps:r,percent:o=0,strokeWidth:n=8,strokeColor:a,trailColor:i=null,prefixCls:c,children:l}=e,d=Math.round(r*(o/100)),f=t??[t==="small"?2:14,n],[v,y]=K(f,"step",{steps:r,strokeWidth:n}),h=v/r,m=new Array(r);for(let g=0;g<r;g++){const $=Array.isArray(a)?a[g]:a;m[g]=s.createElement("div",{key:g,className:H(`${c}-steps-item`,{[`${c}-steps-item-active`]:g<=d-1}),style:{backgroundColor:g<=d-1?$:i,width:h,height:y}})}return s.createElement("div",{className:`${c}-steps-outer`},m,l)},Ze=Qe;var Je=function(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(r[o[n]]=e[o[n]]);return r};const et=["normal","exception","active","success"],tt=s.forwardRef((e,t)=>{const{prefixCls:r,className:o,rootClassName:n,steps:a,strokeColor:i,percent:c=0,size:l="default",showInfo:d=!0,type:u="line",status:f,format:v,style:y}=e,h=Je(e,["prefixCls","className","rootClassName","steps","strokeColor","percent","size","showInfo","type","status","format","style"]),m=s.useMemo(()=>{var k,S;const P=z(e);return parseInt(P!==void 0?(k=P??0)===null||k===void 0?void 0:k.toString():(S=c??0)===null||S===void 0?void 0:S.toString(),10)},[c,e.success,e.successPercent]),g=s.useMemo(()=>!et.includes(f)&&m>=100?"success":f||"normal",[f,m]),{getPrefixCls:$,direction:C,progress:b}=s.useContext(be),p=$("progress",r),[x,j,N]=He(p),E=s.useMemo(()=>{if(!d)return null;const k=z(e);let S;const P=v||(V=>`${V}%`),I=u==="line";return v||g!=="exception"&&g!=="success"?S=P(w(c),w(k)):g==="exception"?S=I?s.createElement($e,null):s.createElement(ke,null):g==="success"&&(S=I?s.createElement(Ee,null):s.createElement(xe,null)),s.createElement("span",{className:`${p}-text`,title:typeof S=="string"?S:void 0},S)},[d,c,m,g,u,p,v]),W=Array.isArray(i)?i[0]:i,O=typeof i=="string"||Array.isArray(i)?i:void 0;let D;u==="line"?D=a?s.createElement(Ze,Object.assign({},e,{strokeColor:O,prefixCls:p,steps:a}),E):s.createElement(Ye,Object.assign({},e,{strokeColor:W,prefixCls:p,direction:C}),E):(u==="circle"||u==="dashboard")&&(D=s.createElement(Re,Object.assign({},e,{strokeColor:W,prefixCls:p,progressStatus:g}),E));const R=H(p,`${p}-status-${g}`,`${p}-${u==="dashboard"&&"circle"||a&&"steps"||u}`,{[`${p}-inline-circle`]:u==="circle"&&K(l,"circle")[0]<=20,[`${p}-show-info`]:d,[`${p}-${l}`]:typeof l=="string",[`${p}-rtl`]:C==="rtl"},b?.className,o,n,j,N);return x(s.createElement("div",Object.assign({ref:t,style:Object.assign(Object.assign({},b?.style),y),className:R,role:"progressbar","aria-valuenow":m},Se(h,["trailColor","strokeWidth","width","gapDegree","gapPosition","strokeLinecap","success","successPercent"])),D))}),nt=tt;export{nt as P};
