import{d as a,f as e,h as t,j as o,c as n,t as l,n as r,k as s,l as i,o as u,w as d,b as c,p as m,q as v,s as p,e as b,r as f,I as h}from"./index.aed4f604.js";import{l as g,aa as x,bh as y,f as C,d as w,b1 as V,n as k,af as B,ax as j,bi as I,bj as S,bb as z,ag as A,o as N,c as P,w as _,a as F,b as $,av as q,a4 as L,e as U,t as D,L as E,F as G,r as H}from"./vendor.64cb168e.js";import{_ as J}from"./index.1a71aba3.js";function K(a,e){var o=(a=>{var e=g();return x((()=>y((()=>{e.value=t(a).height})))),e})(a);return a=>C("div",{class:e("placeholder"),style:{height:o.value?o.value+"px":void 0}},[a()])}var[M,O]=n("tabbar"),Q={route:Boolean,fixed:l,border:l,zIndex:r,placeholder:Boolean,activeColor:String,beforeChange:Function,inactiveColor:String,modelValue:s(0),safeAreaInsetBottom:{type:Boolean,default:null}},R=Symbol(M),T=d(w({name:M,props:Q,emits:["change","update:modelValue"],setup(t,n){var{emit:l,slots:r}=n,s=g(),{linkChildren:d}=o(R),c=K(s,O),m=()=>{var a,{fixed:e,zIndex:o,border:n}=t;return C("div",{ref:s,role:"tablist",style:i(o),class:[O({fixed:e}),{[u]:n,"van-safe-area-bottom":null!=(a=t.safeAreaInsetBottom)?a:t.fixed}]},[null==r.default?void 0:r.default()])};return d({props:t,setActive:(o,n)=>{!function(t,o){var{args:n=[],done:l,canceled:r}=o;if(t){var s=t.apply(null,n);a(s)?s.then((a=>{a?l():r&&r()})).catch(e):s?l():r&&r()}else l()}(t.beforeChange,{args:[o],done(){l("update:modelValue",o),l("change",o),n()}})}}),()=>t.fixed&&t.placeholder?c(m):m()}})),[W,X]=n("tabbar-item"),Y=d(w({name:W,props:b({},f,{dot:Boolean,icon:String,name:r,badge:r,iconPrefix:String}),emits:["click"],setup(a,e){var{emit:t,slots:o}=e,n=c(),l=V().proxy,{parent:r,index:s}=m(R);if(r){var i=k((()=>{var e,{route:t,modelValue:o}=r.props;if(t&&"$route"in l){var{$route:n}=l,{to:i}=a,u=v(i)?i:{path:i};return!!n.matched.find((a=>{var e="path"in u&&u.path===a.path,t="name"in u&&u.name===a.name;return e||t}))}return(null!=(e=a.name)?e:s.value)===o})),u=e=>{var o;i.value||r.setActive(null!=(o=a.name)?o:s.value,n);t("click",e)},d=()=>o.icon?o.icon({active:i.value}):a.icon?C(h,{name:a.icon,classPrefix:a.iconPrefix},null):void 0;return()=>{var{dot:e,badge:t}=a,{activeColor:n,inactiveColor:l}=r.props,s=i.value?n:l;return C("div",{role:"tab",class:X({active:i.value}),style:{color:s},tabindex:0,"aria-selected":i.value,onClick:u},[C(p,{dot:e,content:t,class:X("icon")},{default:d}),C("div",{class:X("text")},[null==o.default?void 0:o.default({active:i.value})])])}}}}));const Z=w({setup(a){const e=B(),t=j([{name:"分类",path:"/mobile/category",routeName:"mobile-category",icon:I,dot:!1,badge:""},{name:"定制",path:"/mobile/customization",routeName:"mobile-customization",icon:S,dot:!1,badge:""},{name:"我的",path:"/mobile/user",routeName:"mobile-user",icon:z,dot:!1,badge:""}]),o=g(e.name);return A((()=>e.name),(a=>{o.value=a})),(a,e)=>{const n=Y,l=T;return N(),P(l,{modelValue:o.value,"onUpdate:modelValue":e[0]||(e[0]=a=>o.value=a)},{default:_((()=>[(N(!0),F(G,null,$(E(t),(a=>(N(),P(n,{key:a.name,name:a.routeName,to:a.path,dot:a.dot,badge:a.badge},{icon:_((({active:e})=>[(N(),P(q(a.icon),{class:L(e&&"tw-text-primary")},null,8,["class"]))])),default:_((()=>[U("span",null,D(a.name),1)])),_:2},1032,["name","to","dot","badge"])))),128))])),_:1},8,["modelValue"])}}}),aa={class:"tw-min-h-screen tw-bg-light"};var ea=J({},[["render",function(a,e){const t=H("router-view"),o=Z;return N(),F("main",aa,[C(t,{class:"tw-pb-[50px]"}),C(o)])}]]);export{ea as default};
