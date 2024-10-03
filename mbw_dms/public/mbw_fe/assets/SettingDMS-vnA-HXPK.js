import{Y as m,an as A,aL as H,a as K,ao as P,aj as z,af as R,b7 as D,ay as X,az as V,h as S,aB as _,b8 as G,l as Q,aD as Y,aK as J,b9 as U,ba as Z,aI as ee,L as a,a7 as ne,aW as y,ad as ae}from"./index-S4dKpla8.js";var ie=["prefixCls","className","checked","defaultChecked","disabled","loadingIcon","checkedChildren","unCheckedChildren","onClick","onChange","onKeyDown"],q=m.forwardRef(function(e,n){var c,t=e.prefixCls,s=t===void 0?"rc-switch":t,r=e.className,h=e.checked,l=e.defaultChecked,i=e.disabled,d=e.loadingIcon,o=e.checkedChildren,u=e.unCheckedChildren,w=e.onClick,C=e.onChange,v=e.onKeyDown,N=A(e,ie),M=H(!1,{value:h,defaultValue:l}),k=K(M,2),$=k[0],p=k[1];function I(g,j){var f=$;return i||(f=g,p(f),C?.(f,j)),f}function E(g){g.which===D.LEFT?I(!1,g):g.which===D.RIGHT&&I(!0,g),v?.(g)}function x(g){var j=I(!$,g);w?.(j,g)}var O=P(s,r,(c={},z(c,"".concat(s,"-checked"),$),z(c,"".concat(s,"-disabled"),i),c));return m.createElement("button",R({},N,{type:"button",role:"switch","aria-checked":$,disabled:i,className:O,ref:n,onKeyDown:E,onClick:x}),d,m.createElement("span",{className:"".concat(s,"-inner")},m.createElement("span",{className:"".concat(s,"-inner-checked")},o),m.createElement("span",{className:"".concat(s,"-inner-unchecked")},u)))});q.displayName="Switch";const te=e=>{const{componentCls:n,trackHeightSM:c,trackPadding:t,trackMinWidthSM:s,innerMinMarginSM:r,innerMaxMarginSM:h,handleSizeSM:l,calc:i}=e,d=`${n}-inner`,o=S(i(l).add(i(t).mul(2)).equal()),u=S(i(h).mul(2).equal());return{[n]:{[`&${n}-small`]:{minWidth:s,height:c,lineHeight:S(c),[`${n}-inner`]:{paddingInlineStart:h,paddingInlineEnd:r,[`${d}-checked`]:{marginInlineStart:`calc(-100% + ${o} - ${u})`,marginInlineEnd:`calc(100% - ${o} + ${u})`},[`${d}-unchecked`]:{marginTop:i(c).mul(-1).equal(),marginInlineStart:0,marginInlineEnd:0}},[`${n}-handle`]:{width:l,height:l},[`${n}-loading-icon`]:{top:i(i(l).sub(e.switchLoadingIconSize)).div(2).equal(),fontSize:e.switchLoadingIconSize},[`&${n}-checked`]:{[`${n}-inner`]:{paddingInlineStart:r,paddingInlineEnd:h,[`${d}-checked`]:{marginInlineStart:0,marginInlineEnd:0},[`${d}-unchecked`]:{marginInlineStart:`calc(100% - ${o} + ${u})`,marginInlineEnd:`calc(-100% + ${o} - ${u})`}},[`${n}-handle`]:{insetInlineStart:`calc(100% - ${S(i(l).add(t).equal())})`}},[`&:not(${n}-disabled):active`]:{[`&:not(${n}-checked) ${d}`]:{[`${d}-unchecked`]:{marginInlineStart:i(e.marginXXS).div(2).equal(),marginInlineEnd:i(e.marginXXS).mul(-1).div(2).equal()}},[`&${n}-checked ${d}`]:{[`${d}-checked`]:{marginInlineStart:i(e.marginXXS).mul(-1).div(2).equal(),marginInlineEnd:i(e.marginXXS).div(2).equal()}}}}}}},le=e=>{const{componentCls:n,handleSize:c,calc:t}=e;return{[n]:{[`${n}-loading-icon${e.iconCls}`]:{position:"relative",top:t(t(c).sub(e.fontSize)).div(2).equal(),color:e.switchLoadingIconColor,verticalAlign:"top"},[`&${n}-checked ${n}-loading-icon`]:{color:e.switchColor}}}},ce=e=>{const{componentCls:n,trackPadding:c,handleBg:t,handleShadow:s,handleSize:r,calc:h}=e,l=`${n}-handle`;return{[n]:{[l]:{position:"absolute",top:c,insetInlineStart:c,width:r,height:r,transition:`all ${e.switchDuration} ease-in-out`,"&::before":{position:"absolute",top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0,backgroundColor:t,borderRadius:h(r).div(2).equal(),boxShadow:s,transition:`all ${e.switchDuration} ease-in-out`,content:'""'}},[`&${n}-checked ${l}`]:{insetInlineStart:`calc(100% - ${S(h(r).add(c).equal())})`},[`&:not(${n}-disabled):active`]:{[`${l}::before`]:{insetInlineEnd:e.switchHandleActiveInset,insetInlineStart:0},[`&${n}-checked ${l}::before`]:{insetInlineEnd:0,insetInlineStart:e.switchHandleActiveInset}}}}},se=e=>{const{componentCls:n,trackHeight:c,trackPadding:t,innerMinMargin:s,innerMaxMargin:r,handleSize:h,calc:l}=e,i=`${n}-inner`,d=S(l(h).add(l(t).mul(2)).equal()),o=S(l(r).mul(2).equal());return{[n]:{[i]:{display:"block",overflow:"hidden",borderRadius:100,height:"100%",paddingInlineStart:r,paddingInlineEnd:s,transition:`padding-inline-start ${e.switchDuration} ease-in-out, padding-inline-end ${e.switchDuration} ease-in-out`,[`${i}-checked, ${i}-unchecked`]:{display:"block",color:e.colorTextLightSolid,fontSize:e.fontSizeSM,transition:`margin-inline-start ${e.switchDuration} ease-in-out, margin-inline-end ${e.switchDuration} ease-in-out`,pointerEvents:"none"},[`${i}-checked`]:{marginInlineStart:`calc(-100% + ${d} - ${o})`,marginInlineEnd:`calc(100% - ${d} + ${o})`},[`${i}-unchecked`]:{marginTop:l(c).mul(-1).equal(),marginInlineStart:0,marginInlineEnd:0}},[`&${n}-checked ${i}`]:{paddingInlineStart:s,paddingInlineEnd:r,[`${i}-checked`]:{marginInlineStart:0,marginInlineEnd:0},[`${i}-unchecked`]:{marginInlineStart:`calc(100% - ${d} + ${o})`,marginInlineEnd:`calc(-100% + ${d} - ${o})`}},[`&:not(${n}-disabled):active`]:{[`&:not(${n}-checked) ${i}`]:{[`${i}-unchecked`]:{marginInlineStart:l(t).mul(2).equal(),marginInlineEnd:l(t).mul(-1).mul(2).equal()}},[`&${n}-checked ${i}`]:{[`${i}-checked`]:{marginInlineStart:l(t).mul(-1).mul(2).equal(),marginInlineEnd:l(t).mul(2).equal()}}}}}},de=e=>{const{componentCls:n,trackHeight:c,trackMinWidth:t}=e;return{[n]:Object.assign(Object.assign(Object.assign(Object.assign({},_(e)),{position:"relative",display:"inline-block",boxSizing:"border-box",minWidth:t,height:c,lineHeight:`${S(c)}`,verticalAlign:"middle",background:e.colorTextQuaternary,border:"0",borderRadius:100,cursor:"pointer",transition:`all ${e.motionDurationMid}`,userSelect:"none",[`&:hover:not(${n}-disabled)`]:{background:e.colorTextTertiary}}),G(e)),{[`&${n}-checked`]:{background:e.switchColor,[`&:hover:not(${n}-disabled)`]:{background:e.colorPrimaryHover}},[`&${n}-loading, &${n}-disabled`]:{cursor:"not-allowed",opacity:e.switchDisabledOpacity,"*":{boxShadow:"none",cursor:"not-allowed"}},[`&${n}-rtl`]:{direction:"rtl"}})}},re=e=>{const{fontSize:n,lineHeight:c,controlHeight:t,colorWhite:s}=e,r=n*c,h=t/2,l=2,i=r-l*2,d=h-l*2;return{trackHeight:r,trackHeightSM:h,trackMinWidth:i*2+l*4,trackMinWidthSM:d*2+l*2,trackPadding:l,handleBg:s,handleSize:i,handleSizeSM:d,handleShadow:`0 2px 4px 0 ${new Q("#00230b").setAlpha(.2).toRgbString()}`,innerMinMargin:i/2,innerMaxMargin:i+l+l*2,innerMinMarginSM:d/2,innerMaxMarginSM:d+l+l*2}},oe=X("Switch",e=>{const n=V(e,{switchDuration:e.motionDurationMid,switchColor:e.colorPrimary,switchDisabledOpacity:e.opacityLoading,switchLoadingIconSize:e.calc(e.fontSizeIcon).mul(.75).equal(),switchLoadingIconColor:`rgba(0, 0, 0, ${e.opacityLoading})`,switchHandleActiveInset:"-30%"});return[de(n),se(n),ce(n),le(n),te(n)]},re);var he=function(e,n){var c={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(c[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,t=Object.getOwnPropertySymbols(e);s<t.length;s++)n.indexOf(t[s])<0&&Object.prototype.propertyIsEnumerable.call(e,t[s])&&(c[t[s]]=e[t[s]]);return c};const F=m.forwardRef((e,n)=>{const{prefixCls:c,size:t,disabled:s,loading:r,className:h,rootClassName:l,style:i,checked:d,value:o,defaultChecked:u,defaultValue:w,onChange:C}=e,v=he(e,["prefixCls","size","disabled","loading","className","rootClassName","style","checked","value","defaultChecked","defaultValue","onChange"]),[N,M]=H(!1,{value:d??o,defaultValue:u??w}),{getPrefixCls:k,direction:$,switch:p}=m.useContext(Y),I=m.useContext(J),E=(s??I)||r,x=k("switch",c),O=m.createElement("div",{className:`${x}-handle`},r&&m.createElement(ee,{className:`${x}-loading-icon`})),[g,j,f]=oe(x),B=U(t),T=P(p?.className,{[`${x}-small`]:B==="small",[`${x}-loading`]:r,[`${x}-rtl`]:$==="rtl"},h,l,j,f),L=Object.assign(Object.assign({},p?.style),i),W=function(){M(arguments.length<=0?void 0:arguments[0]),C?.apply(void 0,arguments)};return g(m.createElement(Z,{component:"Switch"},m.createElement(q,Object.assign({},v,{checked:N,onChange:W,prefixCls:x,className:T,style:L,disabled:E,ref:n,loadingIcon:O}))))});F.__ANT_SWITCH=!0;const b=F;function me(){const[e,n]=m.useState(!0),[c,t]=m.useState(!0),[s,r]=m.useState(!0),h=o=>{n(o)},l=o=>{t(o)},i=o=>{r(o)},d=o=>{console.log(`switch to ${o}`)};return a.jsxs(a.Fragment,{children:[a.jsx(ne,{title:"Cấu hình hệ thống mobile"}),a.jsxs("div",{className:"bg-white rounded-md px-5 pt-5",children:[a.jsx("h3",{className:"text-[#212B36] font-semibold text-xl leading-[21px]",children:"Cấu hình company"}),a.jsxs("div",{className:"pt-10 flex items-center",children:[a.jsx(b,{defaultChecked:!0,onChange:d}),a.jsx("p",{className:"ml-2 font-medium text-base leading-[21px] text-[#212B36]",children:"Viếng thăm ngoại tuyến"})]}),a.jsxs("div",{className:"pt-5 flex items-center",children:[a.jsx(b,{defaultChecked:e,onChange:h}),a.jsx("p",{className:"ml-2 font-medium text-base leading-[21px] text-[#212B36]",children:"Khai báo ví trị ngoài sai số"})]}),e&&a.jsx(a.Fragment,{children:a.jsxs("div",{className:"flex items-center py-5 pl-12 ",children:[a.jsx("p",{className:"w-[8%] text-sm leading-[21px] font-normal",children:"Sai số cho phép"})," ",a.jsx(y,{className:"w-28 mx-2 bg-[#F4F6F8] placeholder:text-[#212B36]",placeholder:"0"}),"Mét"]})}),a.jsxs("div",{className:"pt-5 flex items-center",children:[a.jsx(b,{defaultChecked:c,onChange:l}),a.jsx("p",{className:"ml-2 font-medium text-base leading-[21px] text-[#212B36]",children:"Checkout ngoài sai số"})]}),c&&a.jsx(a.Fragment,{children:a.jsxs("div",{className:"flex items-center py-5 pl-12 ",children:[a.jsx("p",{className:"w-[8%] text-sm leading-[21px] font-normal",children:"Sai số cho phép"})," ",a.jsx(y,{className:"w-28 mx-2 bg-[#F4F6F8] placeholder:text-[#212B36]",placeholder:"0"}),"Mét"]})}),a.jsxs("div",{className:"py-5 flex items-center",children:[a.jsx(b,{defaultChecked:!1,onChange:d}),a.jsx("p",{className:"ml-2 font-medium text-base leading-[21px] text-[#212B36]",children:"Thời gian checkin tối thiểu"})]}),a.jsxs("div",{className:"flex items-center",children:[a.jsx(b,{defaultChecked:!1,onChange:d}),a.jsx("p",{className:"ml-2 font-medium text-base leading-[21px] text-[#212B36]",children:"Bắt buộc kiểm tồn"})]}),a.jsxs("div",{className:"pt-5 flex items-center",children:[a.jsx(b,{defaultChecked:s,onChange:i}),a.jsx("p",{className:"ml-2 font-medium text-base leading-[21px] text-[#212B36]",children:"Bắt buộc chụp ảnh"})]}),s&&a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"flex items-center py-5 pl-12 ",children:[a.jsx("p",{className:"w-[8%] text-sm leading-[21px] font-normal",children:"Số lượng album"})," ",a.jsx(y,{className:"w-28 mx-2 bg-[#F4F6F8] placeholder:text-[#212B36]",placeholder:"0"})]}),a.jsxs("div",{className:"flex items-center pb-5 pl-12 ",children:[a.jsx("p",{className:"w-[8%] text-sm leading-[21px] font-normal",children:"Số lượng ảnh"})," ",a.jsx(y,{className:"w-28 mx-2 bg-[#F4F6F8] placeholder:text-[#212B36]",placeholder:"0"})]})]}),a.jsxs("div",{className:"py-5 flex items-center",children:[a.jsx(b,{defaultChecked:!0,onChange:d}),a.jsx("p",{className:"ml-2 font-medium text-base leading-[21px] text-[#212B36]",children:"Bắt buộc ghi chú"})]})]})]})}function ue(){return a.jsxs(a.Fragment,{children:[a.jsx(ae,{children:a.jsx("title",{children:" SettingDMS"})}),a.jsx(me,{})]})}export{ue as default};
