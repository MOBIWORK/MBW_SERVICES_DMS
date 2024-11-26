import{Y as u,du as _,dv as f,dw as M}from"./index-o85vnTJF.js";function b(){var e=u.useContext(_);return e}function E(e){e===void 0&&(e=_);var t=e===_?b:function(){return u.useContext(e)};return function(){var a=t(),r=a.store;return r}}var p=E();function N(e){e===void 0&&(e=_);var t=e===_?p:E(e);return function(){var a=t();return a.dispatch}}var R=N(),d=function(t,n){return t===n};function C(e,t,n,a){var r=u.useReducer(function(S){return S+1},0),c=r[1],i=u.useMemo(function(){return f(n,a)},[n,a]),s=u.useRef(),T=u.useRef(),o=u.useRef(),l=u.useRef(),v=n.getState(),h;try{if(e!==T.current||v!==o.current||s.current){var I=e(v);l.current===void 0||!t(I,l.current)?h=I:h=l.current}else h=l.current}catch(S){throw s.current&&(S.message+=`
The error may be correlated with this previous error:
`+s.current.stack+`

`),S}return M(function(){T.current=e,o.current=v,l.current=h,s.current=void 0}),M(function(){function S(){try{var P=n.getState();if(P===o.current)return;var g=T.current(P);if(t(g,l.current))return;l.current=g,o.current=P}catch(m){s.current=m}c()}return i.onStateChange=S,i.trySubscribe(),S(),function(){return i.tryUnsubscribe()}},[n,i]),h}function U(e){e===void 0&&(e=_);var t=e===_?b:function(){return u.useContext(e)};return function(a,r){r===void 0&&(r=d);var c=t(),i=c.store,s=c.subscription,T=C(a,r,i,s);return u.useDebugValue(T),T}}var K=U();const y="(max-width: 1062px)",O="(min-width: 1200px)",k=[{label:"Tháng 1",value:"1"},{label:"Tháng 2",value:"2"},{label:"Tháng 3",value:"3"},{label:"Tháng 4",value:"4"},{label:"Tháng 5",value:"5"},{label:"Tháng 6",value:"6"},{label:"Tháng 7",value:"7"},{label:"Tháng 8",value:"8"},{label:"Tháng 9",value:"9"},{label:"Tháng 10",value:"10"},{label:"Tháng 11",value:"11"},{label:"Tháng 12",value:"12"}],x=20,D=[{label:"Mua một sản phẩm",value:"0"},{label:"Mua nhiều sản phẩm",value:"1"}],H=[{value:"SP_SL_CKSP",label:"Mua sản phẩm - đạt số lượng - chiết khấu SP (%)"},{value:"SP_SL_SP",label:"Mua sản phẩm - đạt số lượng - tặng sản phẩm"},{value:"SP_SL_TIEN",label:"Mua sản phẩm - đạt số lượng - tặng tiền"},{value:"SP_ST_CKSP",label:"Mua sản phẩm - đạt số tiền - chiết khấu SP (%)"},{value:"SP_ST_SP",label:"Mua sản phẩm - đạt số tiền - tặng sản phẩm"},{value:"SP_ST_TIEN",label:"Mua sản phẩm - đạt số tiền - tặng tiền"},{value:"TIEN_CKDH",label:"Tổng tiền hàng - chiết khấu đơn hàng (%)"},{value:"TIEN_SP",label:"Tổng tiền hàng - tặng sản phẩm"},{value:"TIEN_TIEN",label:"Tổng tiền hàng - tặng tiền"}],w=[{value:"MUTI_SP_ST_SP",label:"Mua nhiều sản phẩm - đạt số tiền - tặng một hoặc nhiều sản phẩm"},{value:"MUTI_SP_ST_CKSP",label:"Mua nhiều sản phẩm - đạt số tiền - chiết khấu SP (%)"},{value:"MUTI_SP_ST_TIEN",label:"Mua nhiều sản phẩm - đạt số tiền - tặng tiền"},{value:"MUTI_SP_SL_SP",label:"Mua nhiều sản phẩm - đạt số lượng - tặng một hoặc nhiều sản phẩm"},{value:"MUTI_SP_SL_CKSP",label:"Mua nhiều sản phẩm - đạt số lượng - chiết khấu SP (%)"},{value:"MUTI_SP_SL_TIEN",label:"Mua nhiều sản phẩm - đạt số lượng - tặng tiền"},{value:"MUTI_TIEN_SP",label:"Tổng tiền hàng - tặng một hoặc nhiều sản phẩm"},{value:"MUTI_TIEN_CKDH",label:"Tổng tiền hàng - chiết khấu đơn hàng (%)(Loại mua nhiều sản phẩm)"},{value:"MUTI_TIEN_TIEN",label:"Tổng tiền hàng - tặng tiền(Loại mua nhiều sản phẩm)"}],A=["SP_SL_SP","SP_SL_TIEN","SP_ST_SP","SP_ST_TIEN","TIEN_SP","TIEN_TIEN","MUTI_SP_ST_SP","MUTI_SP_ST_TIEN","MUTI_SP_SL_SP","MUTI_SP_SL_TIEN","MUTI_TIEN_SP","MUTI_TIEN_TIEN"],Q=[{label:"Hoạt động",value:"Hoạt động"},{label:"Chờ duyệt",value:"Chờ duyệt"},{label:"Chạy thử",value:"Chạy thử"},{label:"Khóa",value:"Khóa"}],$=["MUTI_SP_ST_SP","MUTI_SP_ST_CKSP","MUTI_SP_ST_TIEN","MUTI_SP_SL_SP","MUTI_SP_SL_CKSP","MUTI_SP_SL_TIEN","MUTI_TIEN_SP","MUTI_TIEN_CKDH","MUTI_TIEN_TIEN"],z=["SP_SL_CKSP","SP_SL_SP","SP_SL_TIEN","SP_ST_CKSP","SP_ST_SP","SP_ST_TIEN","TIEN_CKDH","TIEN_SP","TIEN_TIEN"],G=e=>{const[t,n]=u.useState(!1);return u.useEffect(()=>{const a=window.matchMedia(e);a.matches!==t&&n(a.matches);const r=()=>n(a.matches);return window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[t,e]),t};export{$ as C,x as P,A as S,G as a,O as b,R as c,k as d,w as e,z as f,H as g,Q as h,D as i,y as m,K as u};
