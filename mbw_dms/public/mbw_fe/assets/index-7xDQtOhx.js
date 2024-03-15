import{X as n,_ as V,bX as et,at as ue,bY as Vt,bw as $t,aa as St,w as Je,ar as Ht,bZ as At,b_ as Rt,a as se,aZ as Ke,b$ as Wt,ab as yt,c0 as Ft,aK as dt,c1 as jt,a9 as zt,ae as Bt,af as bt,h as ft,c2 as Ut,c3 as Xt,c4 as Yt,c5 as Zt,ah as Gt,c6 as Jt,a$ as vt,c7 as qt,N as ht,c8 as Qt,c9 as er,b9 as tr,ai as rr,b5 as nr,aJ as ar,ca as lr,bn as or,cb as ir,bo as pt,cc as cr,cd as ur,ce as sr}from"./index-xZLuHMBW.js";const dr=function(e){var t=n.useRef({valueLabels:new Map});return n.useMemo(function(){var a=t.current.valueLabels,l=new Map,r=e.map(function(c){var o,u=c.value,i=(o=c.label)!==null&&o!==void 0?o:a.get(u);return l.set(u,i),V(V({},c),{},{label:i})});return t.current.valueLabels=l,[r]},[e])},fr=function(e,t,a,l){return n.useMemo(function(){var r=e.map(function(i){var d=i.value;return d}),c=t.map(function(i){var d=i.value;return d}),o=r.filter(function(i){return!l[i]});if(a){var u=et(r,!0,l);r=u.checkedKeys,c=u.halfCheckedKeys}return[Array.from(new Set([].concat(ue(o),ue(r)))),c]},[e,t,a,l])};function vr(e){return Array.isArray(e)?e:e!==void 0?[e]:[]}function hr(e){var t=e||{},a=t.label,l=t.value,r=t.children,c=l||"value";return{_title:a?[a]:["title","label"],value:c,key:c,children:r||"children"}}function tt(e){return!e||e.disabled||e.disableCheckbox||e.checkable===!1}function pr(e,t){var a=[];function l(r){r.forEach(function(c){var o=c[t.children];o&&(a.push(c[t.value]),l(o))})}return l(e),a}function mt(e){return e==null}const mr=function(e,t){return n.useMemo(function(){var a=Vt(e,{fieldNames:t,initWrapper:function(r){return V(V({},r),{},{valueEntities:new Map})},processEntity:function(r,c){var o=r.node[t.value];c.valueEntities.set(o,r)}});return a},[e,t])};var nt=function(){return null},gr=["children","value"];function xt(e){return $t(e).map(function(t){if(!n.isValidElement(t)||!t.type)return null;var a=t,l=a.key,r=a.props,c=r.children,o=r.value,u=St(r,gr),i=V({key:l,value:o},u),d=xt(c);return d.length&&(i.children=d),i}).filter(function(t){return t})}function rt(e){if(!e)return e;var t=V({},e);return"props"in t||Object.defineProperty(t,"props",{get:function(){return Je(!1,"New `rc-tree-select` not support return node instance as argument anymore. Please consider to remove `props` access."),t}}),t}function Cr(e,t,a,l,r,c){var o=null,u=null;function i(){function d(s){var N=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"0",I=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1;return s.map(function(y,L){var E="".concat(N,"-").concat(L),P=y[c.value],$=a.includes(P),X=d(y[c.children]||[],E,$),F=n.createElement(nt,y,X.map(function(D){return D.node}));if(t===P&&(o=F),$){var m={pos:E,node:F,children:X};return I||u.push(m),m}return null}).filter(function(y){return y})}u||(u=[],d(l),u.sort(function(s,N){var I=s.node.props.value,y=N.node.props.value,L=a.indexOf(I),E=a.indexOf(y);return L-E}))}Object.defineProperty(e,"triggerNode",{get:function(){return Je(!1,"`triggerNode` is deprecated. Please consider decoupling data with node."),i(),o}}),Object.defineProperty(e,"allCheckedNodes",{get:function(){return Je(!1,"`allCheckedNodes` is deprecated. Please consider decoupling data with node."),i(),r?u:u.map(function(s){var N=s.node;return N})}})}const Sr=function(e,t,a){var l=a.treeNodeFilterProp,r=a.filterTreeNode,c=a.fieldNames,o=c.children;return n.useMemo(function(){if(!t||r===!1)return e;var u;if(typeof r=="function")u=r;else{var i=t.toUpperCase();u=function(N,I){var y=I[l];return String(y).toUpperCase().includes(i)}}function d(s){var N=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;return s.reduce(function(I,y){var L=y[o],E=N||u(t,rt(y)),P=d(L||[],E);return(E||P.length)&&I.push(V(V({},y),{},Ht({isLeaf:void 0},o,P))),I},[])}return d(e)},[e,t,o,l,r])};function gt(e){var t=n.useRef();t.current=e;var a=n.useCallback(function(){return t.current.apply(t,arguments)},[]);return a}function yr(e,t){var a=t.id,l=t.pId,r=t.rootPId,c={},o=[],u=e.map(function(i){var d=V({},i),s=d[a];return c[s]=d,d.key=d.key||s,d});return u.forEach(function(i){var d=i[l],s=c[d];s&&(s.children=s.children||[],s.children.push(i)),(d===r||!s&&r===null)&&o.push(i)}),o}function br(e,t,a){return n.useMemo(function(){return e?a?yr(e,V({id:"id",pId:"pId",rootPId:null},a!==!0?a:{})):e:xt(t)},[t,a,e])}var wt=n.createContext(null),It=n.createContext(null),xr={width:0,height:0,display:"flex",overflow:"hidden",opacity:0,border:0,padding:0,margin:0},wr=function(t,a){var l=At(),r=l.prefixCls,c=l.multiple,o=l.searchValue,u=l.toggleOpen,i=l.open,d=l.notFoundContent,s=n.useContext(It),N=s.virtual,I=s.listHeight,y=s.listItemHeight,L=s.listItemScrollOffset,E=s.treeData,P=s.fieldNames,$=s.onSelect,X=s.dropdownMatchSelectWidth,F=s.treeExpandAction,m=n.useContext(wt),D=m.checkable,k=m.checkedKeys,xe=m.halfCheckedKeys,Q=m.treeExpandedKeys,Ve=m.treeDefaultExpandAll,$e=m.treeDefaultExpandedKeys,we=m.onTreeExpand,ee=m.treeIcon,de=m.showTreeIcon,H=m.switcherIcon,Ie=m.treeLine,Y=m.treeNodeFilterProp,te=m.loadData,A=m.treeLoadedKeys,Ee=m.treeMotion,ke=m.onTreeLoad,Ne=m.keyEntities,j=n.useRef(),x=Rt(function(){return E},[i,E],function(b,f){return f[0]&&b[1]!==f[1]}),fe=n.useState(null),R=se(fe,2),re=R[0],ne=R[1],_=Ne[re],Z=n.useMemo(function(){return D?{checked:k,halfChecked:xe}:null},[D,k,xe]);n.useEffect(function(){if(i&&!c&&k.length){var b;(b=j.current)===null||b===void 0||b.scrollTo({key:k[0]}),ne(k[0])}},[i]);var ve=String(o).toLowerCase(),he=function(f){return ve?String(f[Y]).toLowerCase().includes(ve):!1},pe=n.useState($e),me=se(pe,2),ge=me[0],De=me[1],He=n.useState(null),G=se(He,2),J=G[0],ae=G[1],O=n.useMemo(function(){return Q?ue(Q):o?J:ge},[ge,J,Q,o]);n.useEffect(function(){o&&ae(pr(E,P))},[o]);var Ae=function(f){De(f),ae(f),we&&we(f)},Ce=function(f){f.preventDefault()},z=function(f,B){var K=B.node;D&&tt(K)||($(K.key,{selected:!k.includes(K.key)}),c||u(!1))};if(n.useImperativeHandle(a,function(){var b;return{scrollTo:(b=j.current)===null||b===void 0?void 0:b.scrollTo,onKeyDown:function(B){var K,Te=B.which;switch(Te){case Ke.UP:case Ke.DOWN:case Ke.LEFT:case Ke.RIGHT:(K=j.current)===null||K===void 0||K.onKeyDown(B);break;case Ke.ENTER:{if(_){var le=_?.node||{},Re=le.selectable,oe=le.value;Re!==!1&&z(null,{node:{key:re},selected:!k.includes(oe)})}break}case Ke.ESC:u(!1)}},onKeyUp:function(){}}}),x.length===0)return n.createElement("div",{role:"listbox",className:"".concat(r,"-empty"),onMouseDown:Ce},d);var Se={fieldNames:P};return A&&(Se.loadedKeys=A),O&&(Se.expandedKeys=O),n.createElement("div",{onMouseDown:Ce},_&&i&&n.createElement("span",{style:xr,"aria-live":"assertive"},_.node.value),n.createElement(Wt,yt({ref:j,focusable:!1,prefixCls:"".concat(r,"-tree"),treeData:x,height:I,itemHeight:y,itemScrollOffset:L,virtual:N!==!1&&X!==!1,multiple:c,icon:ee,showIcon:de,switcherIcon:H,showLine:Ie,loadData:o?null:te,motion:Ee,activeKey:re,checkable:D,checkStrictly:!0,checkedKeys:Z,selectedKeys:D?[]:k,defaultExpandAll:Ve},Se,{onActiveChange:ne,onSelect:z,onCheck:z,onExpand:Ae,onLoad:ke,filterTreeNode:he,expandAction:F})))},Et=n.forwardRef(wr);Et.displayName="OptionList";var at="SHOW_ALL",lt="SHOW_PARENT",qe="SHOW_CHILD";function Ct(e,t,a,l){var r=new Set(e);return t===qe?e.filter(function(c){var o=a[c];return!(o&&o.children&&o.children.some(function(u){var i=u.node;return r.has(i[l.value])})&&o.children.every(function(u){var i=u.node;return tt(i)||r.has(i[l.value])}))}):t===lt?e.filter(function(c){var o=a[c],u=o?o.parent:null;return!(u&&!tt(u.node)&&r.has(u.key))}):e}var Ir=["id","prefixCls","value","defaultValue","onChange","onSelect","onDeselect","searchValue","inputValue","onSearch","autoClearSearchValue","filterTreeNode","treeNodeFilterProp","showCheckedStrategy","treeNodeLabelProp","multiple","treeCheckable","treeCheckStrictly","labelInValue","fieldNames","treeDataSimpleMode","treeData","children","loadData","treeLoadedKeys","onTreeLoad","treeDefaultExpandAll","treeExpandedKeys","treeDefaultExpandedKeys","onTreeExpand","treeExpandAction","virtual","listHeight","listItemHeight","listItemScrollOffset","onDropdownVisibleChange","dropdownMatchSelectWidth","treeLine","treeIcon","showTreeIcon","switcherIcon","treeMotion"];function Er(e){return!e||zt(e)!=="object"}var kr=n.forwardRef(function(e,t){var a=e.id,l=e.prefixCls,r=l===void 0?"rc-tree-select":l,c=e.value,o=e.defaultValue,u=e.onChange,i=e.onSelect,d=e.onDeselect,s=e.searchValue,N=e.inputValue,I=e.onSearch,y=e.autoClearSearchValue,L=y===void 0?!0:y,E=e.filterTreeNode,P=e.treeNodeFilterProp,$=P===void 0?"value":P,X=e.showCheckedStrategy,F=e.treeNodeLabelProp,m=e.multiple,D=e.treeCheckable,k=e.treeCheckStrictly,xe=e.labelInValue,Q=e.fieldNames,Ve=e.treeDataSimpleMode,$e=e.treeData,we=e.children,ee=e.loadData,de=e.treeLoadedKeys,H=e.onTreeLoad,Ie=e.treeDefaultExpandAll,Y=e.treeExpandedKeys,te=e.treeDefaultExpandedKeys,A=e.onTreeExpand,Ee=e.treeExpandAction,ke=e.virtual,Ne=e.listHeight,j=Ne===void 0?200:Ne,x=e.listItemHeight,fe=x===void 0?20:x,R=e.listItemScrollOffset,re=R===void 0?0:R,ne=e.onDropdownVisibleChange,_=e.dropdownMatchSelectWidth,Z=_===void 0?!0:_,ve=e.treeLine,he=e.treeIcon,pe=e.showTreeIcon,me=e.switcherIcon,ge=e.treeMotion,De=St(e,Ir),He=Ft(a),G=D&&!k,J=D||k,ae=k||xe,O=J||m,Ae=dt(o,{value:c}),Ce=se(Ae,2),z=Ce[0],Se=Ce[1],b=n.useMemo(function(){return D?X||qe:at},[X,D]),f=n.useMemo(function(){return hr(Q)},[JSON.stringify(Q)]),B=dt("",{value:s!==void 0?s:N,postState:function(v){return v||""}}),K=se(B,2),Te=K[0],le=K[1],Re=function(v){le(v),I?.(v)},oe=br($e,we,Ve),Be=mr(oe,f),T=Be.keyEntities,q=Be.valueEntities,Ue=n.useCallback(function(h){var v=[],p=[];return h.forEach(function(g){q.has(g)?p.push(g):v.push(g)}),{missingRawValues:v,existRawValues:p}},[q]),Le=Sr(oe,Te,{fieldNames:f,treeNodeFilterProp:$,filterTreeNode:E}),Pe=n.useCallback(function(h){if(h){if(F)return h[F];for(var v=f._title,p=0;p<v.length;p+=1){var g=h[v[p]];if(g!==void 0)return g}}},[f,F]),We=n.useCallback(function(h){var v=vr(h);return v.map(function(p){return Er(p)?{value:p}:p})},[]),Xe=n.useCallback(function(h){var v=We(h);return v.map(function(p){var g=p.label,M=p.value,w=p.halfChecked,C,S=q.get(M);if(S){var W;g=(W=g)!==null&&W!==void 0?W:Pe(S.node),C=S.node.disabled}else if(g===void 0){var ie=We(z).find(function(Fe){return Fe.value===M});g=ie.label}return{label:g,value:M,halfChecked:w,disabled:C}})},[q,Pe,We,z]),ot=n.useMemo(function(){return We(z)},[We,z]),kt=n.useMemo(function(){var h=[],v=[];return ot.forEach(function(p){p.halfChecked?v.push(p):h.push(p)}),[h,v]},[ot]),it=se(kt,2),_e=it[0],ct=it[1],ut=n.useMemo(function(){return _e.map(function(h){return h.value})},[_e]),Nt=fr(_e,ct,G,T),st=se(Nt,2),Me=st[0],Ye=st[1],Dt=n.useMemo(function(){var h=Ct(Me,b,T,f),v=h.map(function(w){var C,S;return(C=(S=T[w])===null||S===void 0||(S=S.node)===null||S===void 0?void 0:S[f.value])!==null&&C!==void 0?C:w}),p=v.map(function(w){var C=_e.find(function(S){return S.value===w});return{value:w,label:C?.label}}),g=Xe(p),M=g[0];return!O&&M&&mt(M.value)&&mt(M.label)?[]:g.map(function(w){var C;return V(V({},w),{},{label:(C=w.label)!==null&&C!==void 0?C:w.value})})},[f,O,Me,_e,Xe,b,T]),Tt=dr(Dt),Lt=se(Tt,1),Pt=Lt[0],Ze=gt(function(h,v,p){var g=Xe(h);if(Se(g),L&&le(""),u){var M=h;if(G){var w=Ct(h,b,T,f);M=w.map(function(U){var ce=q.get(U);return ce?ce.node[f.value]:U})}var C=v||{triggerValue:void 0,selected:void 0},S=C.triggerValue,W=C.selected,ie=M;if(k){var Fe=ct.filter(function(U){return!M.includes(U.value)});ie=[].concat(ue(ie),ue(Fe))}var je=Xe(ie),ye={preValue:_e,triggerValue:S},Oe=!0;(k||p==="selection"&&!W)&&(Oe=!1),Cr(ye,S,h,oe,Oe,f),J?ye.checked=W:ye.selected=W;var Ge=ae?je:je.map(function(U){return U.value});u(O?Ge:Ge[0],ae?null:je.map(function(U){return U.label}),ye)}}),Qe=n.useCallback(function(h,v){var p,g=v.selected,M=v.source,w=T[h],C=w?.node,S=(p=C?.[f.value])!==null&&p!==void 0?p:h;if(!O)Ze([S],{selected:!0,triggerValue:S},"option");else{var W=g?[].concat(ue(ut),[S]):Me.filter(function(ce){return ce!==S});if(G){var ie=Ue(W),Fe=ie.missingRawValues,je=ie.existRawValues,ye=je.map(function(ce){return q.get(ce).key}),Oe;if(g){var Ge=et(ye,!0,T);Oe=Ge.checkedKeys}else{var U=et(ye,{checked:!1,halfCheckedKeys:Ye},T);Oe=U.checkedKeys}W=[].concat(ue(Fe),ue(Oe.map(function(ce){return T[ce].node[f.value]})))}Ze(W,{selected:g,triggerValue:S},M||"option")}g||!O?i?.(S,rt(C)):d?.(S,rt(C))},[Ue,q,T,f,O,ut,Ze,G,i,d,Me,Ye]),_t=n.useCallback(function(h){if(ne){var v={};Object.defineProperty(v,"documentClickClose",{get:function(){return Je(!1,"Second param of `onDropdownVisibleChange` has been removed."),!1}}),ne(h,v)}},[ne]),Mt=gt(function(h,v){var p=h.map(function(g){return g.value});if(v.type==="clear"){Ze(p,{},"selection");return}v.values.length&&Qe(v.values[0].value,{selected:!1,source:"selection"})}),Ot=n.useMemo(function(){return{virtual:ke,dropdownMatchSelectWidth:Z,listHeight:j,listItemHeight:fe,listItemScrollOffset:re,treeData:Le,fieldNames:f,onSelect:Qe,treeExpandAction:Ee}},[ke,Z,j,fe,re,Le,f,Qe,Ee]),Kt=n.useMemo(function(){return{checkable:J,loadData:ee,treeLoadedKeys:de,onTreeLoad:H,checkedKeys:Me,halfCheckedKeys:Ye,treeDefaultExpandAll:Ie,treeExpandedKeys:Y,treeDefaultExpandedKeys:te,onTreeExpand:A,treeIcon:he,treeMotion:ge,showTreeIcon:pe,switcherIcon:me,treeLine:ve,treeNodeFilterProp:$,keyEntities:T}},[J,ee,de,H,Me,Ye,Ie,Y,te,A,he,ge,pe,me,ve,$,T]);return n.createElement(It.Provider,{value:Ot},n.createElement(wt.Provider,{value:Kt},n.createElement(jt,yt({ref:t},De,{id:He,prefixCls:r,mode:O?"multiple":void 0,displayValues:Pt,onDisplayValuesChange:Mt,searchValue:Te,onSearch:Re,OptionList:Et,emptyOptions:!oe.length,onDropdownVisibleChange:_t,dropdownMatchSelectWidth:Z}))))}),ze=kr;ze.TreeNode=nt;ze.SHOW_ALL=at;ze.SHOW_PARENT=lt;ze.SHOW_CHILD=qe;const Nr=e=>{const{componentCls:t,treePrefixCls:a,colorBgElevated:l}=e,r=`.${a}`;return[{[`${t}-dropdown`]:[{padding:`${ft(e.paddingXS)} ${ft(e.calc(e.paddingXS).div(2).equal())}`},Ut(a,bt(e,{colorBgContainer:l})),{[r]:{borderRadius:0,[`${r}-list-holder-inner`]:{alignItems:"stretch",[`${r}-treenode`]:{[`${r}-node-content-wrapper`]:{flex:"auto"}}}}},Xt(`${a}-checkbox`,e),{"&-rtl":{direction:"rtl",[`${r}-switcher${r}-switcher_close`]:{[`${r}-switcher-icon svg`]:{transform:"rotate(90deg)"}}}}]}]};function Dr(e,t,a){return Bt("TreeSelect",l=>{const r=bt(l,{treePrefixCls:t});return[Nr(r)]},Yt)(e,a)}var Tr=function(e,t){var a={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&t.indexOf(l)<0&&(a[l]=e[l]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,l=Object.getOwnPropertySymbols(e);r<l.length;r++)t.indexOf(l[r])<0&&Object.prototype.propertyIsEnumerable.call(e,l[r])&&(a[l[r]]=e[l[r]]);return a};const Lr=(e,t)=>{var a,l,{prefixCls:r,size:c,disabled:o,bordered:u=!0,className:i,rootClassName:d,treeCheckable:s,multiple:N,listHeight:I=256,listItemHeight:y=26,placement:L,notFoundContent:E,switcherIcon:P,treeLine:$,getPopupContainer:X,popupClassName:F,dropdownClassName:m,treeIcon:D=!1,transitionName:k,choiceTransitionName:xe="",status:Q,treeExpandAction:Ve,builtinPlacements:$e,dropdownMatchSelectWidth:we,popupMatchSelectWidth:ee,allowClear:de}=e,H=Tr(e,["prefixCls","size","disabled","bordered","className","rootClassName","treeCheckable","multiple","listHeight","listItemHeight","placement","notFoundContent","switcherIcon","treeLine","getPopupContainer","popupClassName","dropdownClassName","treeIcon","transitionName","choiceTransitionName","status","treeExpandAction","builtinPlacements","dropdownMatchSelectWidth","popupMatchSelectWidth","allowClear"]);const{getPopupContainer:Ie,getPrefixCls:Y,renderEmpty:te,direction:A,virtual:Ee,popupMatchSelectWidth:ke,popupOverflow:Ne}=n.useContext(Gt),j=Y(),x=Y("select",r),fe=Y("select-tree",r),R=Y("tree-select",r),{compactSize:re,compactItemClassnames:ne}=Jt(x,A),_=vt(x),Z=vt(R),[ve,he,pe]=qt(x,_),[me]=Dr(R,fe,Z),ge=ht(F||m,`${R}-dropdown`,{[`${R}-dropdown-rtl`]:A==="rtl"},d,pe,_,Z,he),De=!!(s||N),He=cr(H.suffixIcon,H.showArrow),G=(a=ee??we)!==null&&a!==void 0?a:ke,{status:J,hasFeedback:ae,isFormItemInput:O,feedbackIcon:Ae}=n.useContext(Qt),Ce=ur(J,Q),{suffixIcon:z,removeIcon:Se,clearIcon:b}=er(Object.assign(Object.assign({},H),{multiple:De,showSuffixIcon:He,hasFeedback:ae,feedbackIcon:Ae,prefixCls:x,componentName:"TreeSelect"})),f=de===!0?{clearIcon:b}:de;let B;E!==void 0?B=E:B=te?.("Select")||n.createElement(tr,{componentName:"Select"});const K=rr(H,["suffixIcon","itemIcon","removeIcon","clearIcon","switcherIcon"]),Te=n.useMemo(()=>L!==void 0?L:A==="rtl"?"bottomRight":"bottomLeft",[L,A]),le=nr(Le=>{var Pe;return(Pe=c??re)!==null&&Pe!==void 0?Pe:Le}),Re=n.useContext(ar),oe=o??Re,Be=ht(!r&&R,{[`${x}-lg`]:le==="large",[`${x}-sm`]:le==="small",[`${x}-rtl`]:A==="rtl",[`${x}-borderless`]:!u,[`${x}-in-form-item`]:O},lr(x,Ce,ae),ne,i,d,pe,_,Z,he),T=Le=>n.createElement(sr,{prefixCls:fe,switcherIcon:P,treeNodeProps:Le,showLine:$}),[q]=or("SelectLike",(l=H.dropdownStyle)===null||l===void 0?void 0:l.zIndex),Ue=n.createElement(ze,Object.assign({virtual:Ee,disabled:oe},K,{dropdownMatchSelectWidth:G,builtinPlacements:ir($e,Ne),ref:t,prefixCls:x,className:Be,listHeight:I,listItemHeight:y,treeCheckable:s&&n.createElement("span",{className:`${x}-tree-checkbox-inner`}),treeLine:!!$,suffixIcon:z,multiple:De,placement:Te,removeIcon:Se,allowClear:f,switcherIcon:T,showTreeIcon:D,notFoundContent:B,getPopupContainer:X||Ie,treeMotion:null,dropdownClassName:ge,dropdownStyle:Object.assign(Object.assign({},H.dropdownStyle),{zIndex:q}),choiceTransitionName:pt(j,"",xe),transitionName:pt(j,"slide-up",k),treeExpandAction:Ve}));return ve(me(Ue))},Pr=n.forwardRef(Lr),be=Pr,_r=Zt(be);be.TreeNode=nt;be.SHOW_ALL=at;be.SHOW_PARENT=lt;be.SHOW_CHILD=qe;be._InternalPanelDoNotUseOrYouWillBeFired=_r;const Or=be;export{Or as T};
