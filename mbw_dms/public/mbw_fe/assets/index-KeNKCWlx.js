import{ak as ze,ag as We,ah as y,Y as i,w as dt,a as ee,bH as ft,bu as mt,b9 as ue,am as F,ad as le,al as Ge,bI as pt,bJ as He,ar as gt,bn as ve,bK as bt,aw as vt,ax as ht,bL as St,bM as Nt,az as he,bN as Le,bO as Ue,h as W,bP as yt,bQ as It,bR as Et,bS as wt,bT as $t,aB as xt,bj as Ct,bU as Rt,bV as Dt,b5 as Ot,aI as _t,bW as Se,bX as ke,bY as Ve,bZ as Mt,b_ as Bt,b$ as At,c0 as kt}from"./index-DWSVeQA5.js";function Ne(){return typeof BigInt=="function"}function qe(e){return!e&&e!==0&&!Number.isNaN(e)||!String(e).trim()}function H(e){var t=e.trim(),n=t.startsWith("-");n&&(t=t.slice(1)),t=t.replace(/(\.\d*[^0])0*$/,"$1").replace(/\.0*$/,"").replace(/^0+/,""),t.startsWith(".")&&(t="0".concat(t));var r=t||"0",a=r.split("."),s=a[0]||"0",b=a[1]||"0";s==="0"&&b==="0"&&(n=!1);var c=n?"-":"";return{negative:n,negativeStr:c,trimStr:r,integerStr:s,decimalStr:b,fullStr:"".concat(c).concat(r)}}function ye(e){var t=String(e);return!Number.isNaN(Number(t))&&t.includes("e")}function G(e){var t=String(e);if(ye(e)){var n=Number(t.slice(t.indexOf("e-")+2)),r=t.match(/\.(\d+)/);return r!=null&&r[1]&&(n+=r[1].length),n}return t.includes(".")&&Ie(t)?t.length-t.indexOf(".")-1:0}function ce(e){var t=String(e);if(ye(e)){if(e>Number.MAX_SAFE_INTEGER)return String(Ne()?BigInt(e).toString():Number.MAX_SAFE_INTEGER);if(e<Number.MIN_SAFE_INTEGER)return String(Ne()?BigInt(e).toString():Number.MIN_SAFE_INTEGER);t=e.toFixed(G(t))}return H(t).fullStr}function Ie(e){return typeof e=="number"?!Number.isNaN(e):e?/^\s*-?\d+(\.\d+)?\s*$/.test(e)||/^\s*-?\d+\.\s*$/.test(e)||/^\s*-?\.\d+\s*$/.test(e):!1}var Vt=function(){function e(t){if(We(this,e),y(this,"origin",""),y(this,"negative",void 0),y(this,"integer",void 0),y(this,"decimal",void 0),y(this,"decimalLen",void 0),y(this,"empty",void 0),y(this,"nan",void 0),qe(t)){this.empty=!0;return}if(this.origin=String(t),t==="-"||Number.isNaN(t)){this.nan=!0;return}var n=t;if(ye(n)&&(n=Number(n)),n=typeof n=="string"?n:ce(n),Ie(n)){var r=H(n);this.negative=r.negative;var a=r.trimStr.split(".");this.integer=BigInt(a[0]);var s=a[1]||"0";this.decimal=BigInt(s),this.decimalLen=s.length}else this.nan=!0}return ze(e,[{key:"getMark",value:function(){return this.negative?"-":""}},{key:"getIntegerStr",value:function(){return this.integer.toString()}},{key:"getDecimalStr",value:function(){return this.decimal.toString().padStart(this.decimalLen,"0")}},{key:"alignDecimal",value:function(n){var r="".concat(this.getMark()).concat(this.getIntegerStr()).concat(this.getDecimalStr().padEnd(n,"0"));return BigInt(r)}},{key:"negate",value:function(){var n=new e(this.toString());return n.negative=!n.negative,n}},{key:"cal",value:function(n,r,a){var s=Math.max(this.getDecimalStr().length,n.getDecimalStr().length),b=this.alignDecimal(s),c=n.alignDecimal(s),v=r(b,c).toString(),g=a(s),f=H(v),N=f.negativeStr,p=f.trimStr,h="".concat(N).concat(p.padStart(g+1,"0"));return new e("".concat(h.slice(0,-g),".").concat(h.slice(-g)))}},{key:"add",value:function(n){if(this.isInvalidate())return new e(n);var r=new e(n);return r.isInvalidate()?this:this.cal(r,function(a,s){return a+s},function(a){return a})}},{key:"multi",value:function(n){var r=new e(n);return this.isInvalidate()||r.isInvalidate()?new e(NaN):this.cal(r,function(a,s){return a*s},function(a){return a*2})}},{key:"isEmpty",value:function(){return this.empty}},{key:"isNaN",value:function(){return this.nan}},{key:"isInvalidate",value:function(){return this.isEmpty()||this.isNaN()}},{key:"equals",value:function(n){return this.toString()===n?.toString()}},{key:"lessEquals",value:function(n){return this.add(n.negate().toString()).toNumber()<=0}},{key:"toNumber",value:function(){return this.isNaN()?NaN:Number(this.toString())}},{key:"toString",value:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;return n?this.isInvalidate()?"":H("".concat(this.getMark()).concat(this.getIntegerStr(),".").concat(this.getDecimalStr())).fullStr:this.origin}}]),e}(),jt=function(){function e(t){if(We(this,e),y(this,"origin",""),y(this,"number",void 0),y(this,"empty",void 0),qe(t)){this.empty=!0;return}this.origin=String(t),this.number=Number(t)}return ze(e,[{key:"negate",value:function(){return new e(-this.toNumber())}},{key:"add",value:function(n){if(this.isInvalidate())return new e(n);var r=Number(n);if(Number.isNaN(r))return this;var a=this.number+r;if(a>Number.MAX_SAFE_INTEGER)return new e(Number.MAX_SAFE_INTEGER);if(a<Number.MIN_SAFE_INTEGER)return new e(Number.MIN_SAFE_INTEGER);var s=Math.max(G(this.number),G(r));return new e(a.toFixed(s))}},{key:"multi",value:function(n){var r=Number(n);if(this.isInvalidate()||Number.isNaN(r))return new e(NaN);var a=this.number*r;if(a>Number.MAX_SAFE_INTEGER)return new e(Number.MAX_SAFE_INTEGER);if(a<Number.MIN_SAFE_INTEGER)return new e(Number.MIN_SAFE_INTEGER);var s=Math.max(G(this.number),G(r));return new e(a.toFixed(s))}},{key:"isEmpty",value:function(){return this.empty}},{key:"isNaN",value:function(){return Number.isNaN(this.number)}},{key:"isInvalidate",value:function(){return this.isEmpty()||this.isNaN()}},{key:"equals",value:function(n){return this.toNumber()===n?.toNumber()}},{key:"lessEquals",value:function(n){return this.add(n.negate().toString()).toNumber()<=0}},{key:"toNumber",value:function(){return this.number}},{key:"toString",value:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;return n?this.isInvalidate()?"":ce(this.number):this.origin}}]),e}();function D(e){return Ne()?new Vt(e):new jt(e)}function oe(e,t,n){var r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1;if(e==="")return"";var a=H(e),s=a.negativeStr,b=a.integerStr,c=a.decimalStr,v="".concat(t).concat(c),g="".concat(s).concat(b);if(n>=0){var f=Number(c[n]);if(f>=5&&!r){var N=D(e).add("".concat(s,"0.").concat("0".repeat(n)).concat(10-f));return oe(N.toString(),t,n,r)}return n===0?g:"".concat(g).concat(t).concat(c.padEnd(n,"0").slice(0,n))}return v===".0"?g:"".concat(g).concat(v)}function Ft(e,t){var n=i.useRef(null);function r(){try{var s=e.selectionStart,b=e.selectionEnd,c=e.value,v=c.substring(0,s),g=c.substring(b);n.current={start:s,end:b,value:c,beforeTxt:v,afterTxt:g}}catch{}}function a(){if(e&&n.current&&t)try{var s=e.value,b=n.current,c=b.beforeTxt,v=b.afterTxt,g=b.start,f=s.length;if(s.endsWith(v))f=s.length-n.current.afterTxt.length;else if(s.startsWith(c))f=c.length;else{var N=c[g-1],p=s.indexOf(N,g-1);p!==-1&&(f=p+1)}e.setSelectionRange(f,f)}catch(h){dt(!1,"Something warning of cursor restore. Please fire issue about this: ".concat(h.message))}}return[r,a]}var Tt=function(){var t=i.useState(!1),n=ee(t,2),r=n[0],a=n[1];return ft(function(){a(mt())},[]),r},Pt=200,zt=600;function Wt(e){var t=e.prefixCls,n=e.upNode,r=e.downNode,a=e.upDisabled,s=e.downDisabled,b=e.onStep,c=i.useRef(),v=i.useRef([]),g=i.useRef();g.current=b;var f=function(){clearTimeout(c.current)},N=function(w,C){w.preventDefault(),f(),g.current(C);function x(){g.current(C),c.current=setTimeout(x,Pt)}c.current=setTimeout(x,zt)};i.useEffect(function(){return function(){f(),v.current.forEach(function(u){return ue.cancel(u)})}},[]);var p=Tt();if(p)return null;var h="".concat(t,"-handler"),E=F(h,"".concat(h,"-up"),y({},"".concat(h,"-up-disabled"),a)),A=F(h,"".concat(h,"-down"),y({},"".concat(h,"-down-disabled"),s)),I=function(){return v.current.push(ue(f))},O={unselectable:"on",role:"button",onMouseUp:I,onMouseLeave:I};return i.createElement("div",{className:"".concat(h,"-wrap")},i.createElement("span",le({},O,{onMouseDown:function(w){N(w,!0)},"aria-label":"Increase Value","aria-disabled":a,className:E}),n||i.createElement("span",{unselectable:"on",className:"".concat(t,"-handler-up-inner")})),i.createElement("span",le({},O,{onMouseDown:function(w){N(w,!1)},"aria-label":"Decrease Value","aria-disabled":s,className:A}),r||i.createElement("span",{unselectable:"on",className:"".concat(t,"-handler-down-inner")})))}function je(e){var t=typeof e=="number"?ce(e):H(e).fullStr,n=t.includes(".");return n?H(t.replace(/(\d)\.(\d)/g,"$1$2.")).fullStr:e+"0"}const Gt=function(){var e=i.useRef(0),t=function(){ue.cancel(e.current)};return i.useEffect(function(){return t},[]),function(n){t(),e.current=ue(function(){n()})}};var Ht=["prefixCls","className","style","min","max","step","defaultValue","value","disabled","readOnly","upHandler","downHandler","keyboard","controls","classNames","stringMode","parser","formatter","precision","decimalSeparator","onChange","onInput","onPressEnter","onStep","changeOnBlur"],Lt=["disabled","style","prefixCls","value","prefix","suffix","addonBefore","addonAfter","classes","className","classNames"],Fe=function(t,n){return t||n.isEmpty()?n.toString():n.toNumber()},Te=function(t){var n=D(t);return n.isInvalidate()?null:n},Ut=i.forwardRef(function(e,t){var n,r=e.prefixCls,a=r===void 0?"rc-input-number":r,s=e.className,b=e.style,c=e.min,v=e.max,g=e.step,f=g===void 0?1:g,N=e.defaultValue,p=e.value,h=e.disabled,E=e.readOnly,A=e.upHandler,I=e.downHandler,O=e.keyboard,u=e.controls,w=u===void 0?!0:u,C=e.classNames,x=e.stringMode,V=e.parser,R=e.formatter,$=e.precision,_=e.decimalSeparator,T=e.onChange,K=e.onInput,P=e.onPressEnter,X=e.onStep,te=e.changeOnBlur,de=te===void 0?!0:te,Y=Ge(e,Ht),k="".concat(a,"-input"),L=i.useRef(null),ne=i.useState(!1),re=ee(ne,2),ae=re[0],ie=re[1],M=i.useRef(!1),z=i.useRef(!1),j=i.useRef(!1),Je=i.useState(function(){return D(p??N)}),Ee=ee(Je,2),S=Ee[0],we=Ee[1];function Qe(l){p===void 0&&we(l)}var fe=i.useCallback(function(l,o){if(!o)return $>=0?$:Math.max(G(l),G(f))},[$,f]),me=i.useCallback(function(l){var o=String(l);if(V)return V(o);var m=o;return _&&(m=m.replace(_,".")),m.replace(/[^\w.-]+/g,"")},[V,_]),pe=i.useRef(""),$e=i.useCallback(function(l,o){if(R)return R(l,{userTyping:o,input:String(pe.current)});var m=typeof l=="number"?ce(l):l;if(!o){var d=fe(m,o);if(Ie(m)&&(_||d>=0)){var B=_||".";m=oe(m,B,d)}}return m},[R,fe,_]),Ze=i.useState(function(){var l=N??p;return S.isInvalidate()&&["string","number"].includes(gt(l))?Number.isNaN(l)?"":l:$e(S.toString(),!1)}),xe=ee(Ze,2),J=xe[0],Ce=xe[1];pe.current=J;function Q(l,o){Ce($e(l.isInvalidate()?l.toString(!1):l.toString(!o),o))}var U=i.useMemo(function(){return Te(v)},[v,$]),q=i.useMemo(function(){return Te(c)},[c,$]),Re=i.useMemo(function(){return!U||!S||S.isInvalidate()?!1:U.lessEquals(S)},[U,S]),De=i.useMemo(function(){return!q||!S||S.isInvalidate()?!1:S.lessEquals(q)},[q,S]),et=Ft(L.current,ae),Oe=ee(et,2),tt=Oe[0],nt=Oe[1],_e=function(o){return U&&!o.lessEquals(U)?U:q&&!q.lessEquals(o)?q:null},ge=function(o){return!_e(o)},se=function(o,m){var d=o,B=ge(d)||d.isEmpty();if(!d.isEmpty()&&!m&&(d=_e(d)||d,B=!0),!E&&!h&&B){var Z=d.toString(),be=fe(Z,m);return be>=0&&(d=D(oe(Z,".",be)),ge(d)||(d=D(oe(Z,".",be,!0)))),d.equals(S)||(Qe(d),T?.(d.isEmpty()?null:Fe(x,d)),p===void 0&&Q(d,m)),d}return S},rt=Gt(),Me=function l(o){if(tt(),pe.current=o,Ce(o),!z.current){var m=me(o),d=D(m);d.isNaN()||se(d,!0)}K?.(o),rt(function(){var B=o;V||(B=o.replace(/。/g,".")),B!==o&&l(B)})},at=function(){z.current=!0},it=function(){z.current=!1,Me(L.current.value)},st=function(o){Me(o.target.value)},Be=function(o){var m;if(!(o&&Re||!o&&De)){M.current=!1;var d=D(j.current?je(f):f);o||(d=d.negate());var B=(S||D(0)).add(d.toString()),Z=se(B,!1);X?.(Fe(x,Z),{offset:j.current?je(f):f,type:o?"up":"down"}),(m=L.current)===null||m===void 0||m.focus()}},Ae=function(o){var m=D(me(J)),d=m;m.isNaN()?d=se(S,o):d=se(m,o),p!==void 0?Q(S,!1):d.isNaN()||Q(d,!1)},ot=function(){M.current=!0},ut=function(o){var m=o.key,d=o.shiftKey;M.current=!0,j.current=d,m==="Enter"&&(z.current||(M.current=!1),Ae(!1),P?.(o)),O!==!1&&!z.current&&["Up","ArrowUp","Down","ArrowDown"].includes(m)&&(Be(m==="Up"||m==="ArrowUp"),o.preventDefault())},lt=function(){M.current=!1,j.current=!1},ct=function(){de&&Ae(!1),ie(!1),M.current=!1};return ve(function(){S.isInvalidate()||Q(S,!1)},[$,R]),ve(function(){var l=D(p);we(l);var o=D(me(J));(!l.equals(o)||!M.current||R)&&Q(l,M.current)},[p]),ve(function(){R&&nt()},[J]),i.createElement("div",{className:F(a,C?.input,s,(n={},y(n,"".concat(a,"-focused"),ae),y(n,"".concat(a,"-disabled"),h),y(n,"".concat(a,"-readonly"),E),y(n,"".concat(a,"-not-a-number"),S.isNaN()),y(n,"".concat(a,"-out-of-range"),!S.isInvalidate()&&!ge(S)),n)),style:b,onFocus:function(){ie(!0)},onBlur:ct,onKeyDown:ut,onKeyUp:lt,onCompositionStart:at,onCompositionEnd:it,onBeforeInput:ot},w&&i.createElement(Wt,{prefixCls:a,upNode:A,downNode:I,upDisabled:Re,downDisabled:De,onStep:Be}),i.createElement("div",{className:"".concat(k,"-wrap")},i.createElement("input",le({autoComplete:"off",role:"spinbutton","aria-valuemin":c,"aria-valuemax":v,"aria-valuenow":S.isInvalidate()?null:S.toString(),step:f},Y,{ref:He(L,t),className:k,value:J,onChange:st,disabled:h,readOnly:E}))))}),Ke=i.forwardRef(function(e,t){var n=e.disabled,r=e.style,a=e.prefixCls,s=e.value,b=e.prefix,c=e.suffix,v=e.addonBefore,g=e.addonAfter,f=e.classes,N=e.className,p=e.classNames,h=Ge(e,Lt),E=i.useRef(null),A=function(O){E.current&&bt(E.current,O)};return i.createElement(pt,{inputElement:i.createElement(Ut,le({prefixCls:a,disabled:n,classNames:p,ref:He(E,t)},h)),className:N,triggerFocus:A,prefixCls:a,value:s,disabled:n,style:r,prefix:b,suffix:c,addonAfter:g,addonBefore:v,classes:f,classNames:p,components:{affixWrapper:"div",groupWrapper:"div",wrapper:"div",groupAddon:"div"}})});Ke.displayName="InputNumber";const Pe=(e,t)=>{let{componentCls:n,borderRadiusSM:r,borderRadiusLG:a}=e;const s=t==="lg"?a:r;return{[`&-${t}`]:{[`${n}-handler-wrap`]:{borderStartEndRadius:s,borderEndEndRadius:s},[`${n}-handler-up`]:{borderStartEndRadius:s},[`${n}-handler-down`]:{borderEndEndRadius:s}}}},qt=e=>{const{componentCls:t,lineWidth:n,lineType:r,colorBorder:a,borderRadius:s,fontSizeLG:b,controlHeightLG:c,controlHeightSM:v,colorError:g,paddingInlineSM:f,colorTextDescription:N,motionDurationMid:p,handleHoverColor:h,paddingInline:E,paddingBlock:A,handleBg:I,handleActiveBg:O,colorTextDisabled:u,borderRadiusSM:w,borderRadiusLG:C,controlWidth:x,handleOpacity:V,handleBorderColor:R,calc:$}=e;return[{[t]:Object.assign(Object.assign(Object.assign(Object.assign({},he(e)),Le(e)),Ue(e,t)),{display:"inline-block",width:x,margin:0,padding:0,border:`${W(n)} ${r} ${a}`,borderRadius:s,"&-rtl":{direction:"rtl",[`${t}-input`]:{direction:"rtl"}},"&-lg":{padding:0,fontSize:b,borderRadius:C,[`input${t}-input`]:{height:$(c).sub($(n).mul(2)).equal()}},"&-sm":{padding:0,borderRadius:w,[`input${t}-input`]:{height:$(v).sub($(n).mul(2)).equal(),padding:`0 ${W(f)}`}},"&-out-of-range":{[`${t}-input-wrap`]:{input:{color:g}}},"&-group":Object.assign(Object.assign(Object.assign({},he(e)),yt(e)),{"&-wrapper":{display:"inline-block",textAlign:"start",verticalAlign:"top",[`${t}-affix-wrapper`]:{width:"100%"},"&-lg":{[`${t}-group-addon`]:{borderRadius:C,fontSize:e.fontSizeLG}},"&-sm":{[`${t}-group-addon`]:{borderRadius:w}},[`${t}-wrapper-disabled > ${t}-group-addon`]:Object.assign({},It(e)),[`&:not(${t}-compact-first-item):not(${t}-compact-last-item)${t}-compact-item`]:{[`${t}, ${t}-group-addon`]:{borderRadius:0}},[`&:not(${t}-compact-last-item)${t}-compact-first-item`]:{[`${t}, ${t}-group-addon`]:{borderStartEndRadius:0,borderEndEndRadius:0}},[`&:not(${t}-compact-first-item)${t}-compact-last-item`]:{[`${t}, ${t}-group-addon`]:{borderStartStartRadius:0,borderEndStartRadius:0}}}}),[`&-disabled ${t}-input`]:{cursor:"not-allowed"},[t]:{"&-input":Object.assign(Object.assign(Object.assign(Object.assign({},he(e)),{width:"100%",padding:`${W(A)} ${W(E)}`,textAlign:"start",backgroundColor:"transparent",border:0,borderRadius:s,outline:0,transition:`all ${p} linear`,appearance:"textfield",fontSize:"inherit"}),Et(e.colorTextPlaceholder)),{'&[type="number"]::-webkit-inner-spin-button, &[type="number"]::-webkit-outer-spin-button':{margin:0,webkitAppearance:"none",appearance:"none"}})}})},{[t]:Object.assign(Object.assign(Object.assign({[`&:hover ${t}-handler-wrap, &-focused ${t}-handler-wrap`]:{opacity:1},[`${t}-handler-wrap`]:{position:"absolute",insetBlockStart:0,insetInlineEnd:0,width:e.handleWidth,height:"100%",background:I,borderStartStartRadius:0,borderStartEndRadius:s,borderEndEndRadius:s,borderEndStartRadius:0,opacity:V,display:"flex",flexDirection:"column",alignItems:"stretch",transition:`opacity ${p} linear ${p}`,[`${t}-handler`]:{display:"flex",alignItems:"center",justifyContent:"center",flex:"auto",height:"40%",[`
              ${t}-handler-up-inner,
              ${t}-handler-down-inner
            `]:{marginInlineEnd:0,fontSize:e.handleFontSize}}},[`${t}-handler`]:{height:"50%",overflow:"hidden",color:N,fontWeight:"bold",lineHeight:0,textAlign:"center",cursor:"pointer",borderInlineStart:`${W(n)} ${r} ${R}`,transition:`all ${p} linear`,"&:active":{background:O},"&:hover":{height:"60%",[`
              ${t}-handler-up-inner,
              ${t}-handler-down-inner
            `]:{color:h}},"&-up-inner, &-down-inner":Object.assign(Object.assign({},wt()),{color:N,transition:`all ${p} linear`,userSelect:"none"})},[`${t}-handler-up`]:{borderStartEndRadius:s},[`${t}-handler-down`]:{borderBlockStart:`${W(n)} ${r} ${R}`,borderEndEndRadius:s}},Pe(e,"lg")),Pe(e,"sm")),{"&-disabled, &-readonly":{[`${t}-handler-wrap`]:{display:"none"},[`${t}-input`]:{color:"inherit"}},[`
          ${t}-handler-up-disabled,
          ${t}-handler-down-disabled
        `]:{cursor:"not-allowed"},[`
          ${t}-handler-up-disabled:hover &-handler-up-inner,
          ${t}-handler-down-disabled:hover &-handler-down-inner
        `]:{color:u}})},{[`${t}-borderless`]:{borderColor:"transparent",boxShadow:"none",[`${t}-handler-down`]:{borderBlockStartWidth:0}}}]},Kt=e=>{const{componentCls:t,paddingBlock:n,paddingInline:r,inputAffixPadding:a,controlWidth:s,borderRadiusLG:b,borderRadiusSM:c}=e;return{[`${t}-affix-wrapper`]:Object.assign(Object.assign(Object.assign({},Le(e)),Ue(e,`${t}-affix-wrapper`)),{position:"relative",display:"inline-flex",width:s,padding:0,paddingInlineStart:r,"&-lg":{borderRadius:b},"&-sm":{borderRadius:c},[`&:not(${t}-affix-wrapper-disabled):hover`]:{zIndex:1},"&-focused, &:focus":{zIndex:1},[`&-disabled > ${t}-disabled`]:{background:"transparent"},[`> div${t}`]:{width:"100%",border:"none",outline:"none",[`&${t}-focused`]:{boxShadow:"none !important"}},[`input${t}-input`]:{padding:`${W(n)} 0`},"&::before":{display:"inline-block",width:0,visibility:"hidden",content:'"\\a0"'},[`${t}-handler-wrap`]:{zIndex:2},[t]:{"&-prefix, &-suffix":{display:"flex",flex:"none",alignItems:"center",pointerEvents:"none"},"&-prefix":{marginInlineEnd:a},"&-suffix":{position:"absolute",insetBlockStart:0,insetInlineEnd:0,zIndex:1,height:"100%",marginInlineEnd:r,marginInlineStart:a}}})}},Xt=e=>Object.assign(Object.assign({},$t(e)),{controlWidth:90,handleWidth:e.controlHeightSM-e.lineWidth*2,handleFontSize:e.fontSize/2,handleVisible:"auto",handleActiveBg:e.colorFillAlter,handleBg:e.colorBgContainer,handleHoverColor:e.colorPrimary,handleBorderColor:e.colorBorder,handleOpacity:0}),Yt=e=>Object.assign(Object.assign({},e),{handleOpacity:e.handleVisible===!0?1:0}),Jt=vt("InputNumber",e=>{const t=ht(e,St(e));return[qt(t),Kt(t),Nt(t)]},Xt,{format:Yt,unitless:{handleOpacity:!0}});var Qt=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n};const Xe=i.forwardRef((e,t)=>{const{getPrefixCls:n,direction:r}=i.useContext(xt),a=i.useRef(null);i.useImperativeHandle(t,()=>a.current);const{className:s,rootClassName:b,size:c,disabled:v,prefixCls:g,addonBefore:f,addonAfter:N,prefix:p,bordered:h=!0,readOnly:E,status:A,controls:I}=e,O=Qt(e,["className","rootClassName","size","disabled","prefixCls","addonBefore","addonAfter","prefix","bordered","readOnly","status","controls"]),u=n("input-number",g),w=Ct(u),[C,x,V]=Jt(u,w),{compactSize:R,compactItemClassnames:$}=Rt(u,r);let _=i.createElement(Bt,{className:`${u}-handler-up-inner`}),T=i.createElement(At,{className:`${u}-handler-down-inner`});const K=typeof I=="boolean"?I:void 0;typeof I=="object"&&(_=typeof I.upIcon>"u"?_:i.createElement("span",{className:`${u}-handler-up-inner`},I.upIcon),T=typeof I.downIcon>"u"?T:i.createElement("span",{className:`${u}-handler-down-inner`},I.downIcon));const{hasFeedback:P,status:X,isFormItemInput:te,feedbackIcon:de}=i.useContext(Dt),Y=kt(X,A),k=Ot(z=>{var j;return(j=c??R)!==null&&j!==void 0?j:z}),L=i.useContext(_t),ne=v??L,re=F({[`${u}-lg`]:k==="large",[`${u}-sm`]:k==="small",[`${u}-rtl`]:r==="rtl",[`${u}-borderless`]:!h,[`${u}-in-form-item`]:te},Se(u,Y),x),ae=`${u}-group`,ie=P&&i.createElement(i.Fragment,null,de),M=i.createElement(Ke,Object.assign({ref:a,disabled:ne,className:F(V,w,s,b,$),upHandler:_,downHandler:T,prefixCls:u,readOnly:E,controls:K,prefix:p,suffix:ie,addonAfter:N&&i.createElement(ke,null,i.createElement(Ve,{override:!0,status:!0},N)),addonBefore:f&&i.createElement(ke,null,i.createElement(Ve,{override:!0,status:!0},f)),classNames:{input:re},classes:{affixWrapper:F(Se(`${u}-affix-wrapper`,Y,P),{[`${u}-affix-wrapper-sm`]:k==="small",[`${u}-affix-wrapper-lg`]:k==="large",[`${u}-affix-wrapper-rtl`]:r==="rtl",[`${u}-affix-wrapper-borderless`]:!h},x),wrapper:F({[`${ae}-rtl`]:r==="rtl",[`${u}-wrapper-disabled`]:ne},x),group:F({[`${u}-group-wrapper-sm`]:k==="small",[`${u}-group-wrapper-lg`]:k==="large",[`${u}-group-wrapper-rtl`]:r==="rtl"},Se(`${u}-group-wrapper`,Y,P),x)}},O));return C(M)}),Ye=Xe,Zt=e=>i.createElement(Mt,{theme:{components:{InputNumber:{handleVisible:!0}}}},i.createElement(Xe,Object.assign({},e)));Ye._InternalPanelDoNotUseOrYouWillBeFired=Zt;const tn=Ye;export{tn as I};
