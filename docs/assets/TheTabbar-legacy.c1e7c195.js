!function(){var a=document.createElement("style");a.innerHTML=":root{--van-tabbar-height:50px;--van-tabbar-z-index:1;--van-tabbar-background-color:var(--van-background-color-light)}.van-tabbar{background:var(--van-tabbar-background-color);box-sizing:content-box;display:flex;height:var(--van-tabbar-height);width:100%;z-index:var(--van-tabbar-z-index)}.van-tabbar--fixed{bottom:0;left:0;position:fixed}:root{--van-tabbar-item-font-size:var(--van-font-size-sm);--van-tabbar-item-text-color:var(--van-gray-7);--van-tabbar-item-active-color:var(--van-primary-color);--van-tabbar-item-active-background-color:var(--van-background-color-light);--van-tabbar-item-line-height:1;--van-tabbar-item-icon-size:22px;--van-tabbar-item-icon-margin-bottom:var(--van-padding-base)}.van-tabbar-item{align-items:center;color:var(--van-tabbar-item-text-color);cursor:pointer;display:flex;flex:1;flex-direction:column;font-size:var(--van-tabbar-item-font-size);justify-content:center;line-height:var(--van-tabbar-item-line-height)}.van-tabbar-item__icon{font-size:var(--van-tabbar-item-icon-size);margin-bottom:var(--van-tabbar-item-icon-margin-bottom)}.van-tabbar-item__icon .van-icon{display:block}.van-tabbar-item__icon .van-badge{margin-top:var(--van-padding-base)}.van-tabbar-item__icon img{display:block;height:20px}.van-tabbar-item--active{background-color:var(--van-tabbar-item-active-background-color);color:var(--van-tabbar-item-active-color)}\n",document.head.appendChild(a),System.register(["./vendor-legacy.a2d7269a.js","./index-legacy.38433af3.js","./interceptor-legacy.247dd095.js"],(function(a){"use strict";var e,t,n,o,r,i,l,c,b,v,d,u,m,s,g,f,p,h,x,y,k,z,_,C,V,B,S,w,I,N,j,A,L,P,$,F,U,q,E,H,M,T;return{setters:[function(a){e=a.l,t=a.aa,n=a.aX,o=a.f,r=a.d,i=a.aU,l=a.n,c=a.af,b=a.ax,v=a.bm,d=a.bn,u=a.bb,m=a.bo,s=a.ag,g=a.o,f=a.c,p=a.w,h=a.a,x=a.b,y=a.av,k=a.a4,z=a.e,_=a.t,C=a.L,V=a.F},function(a){B=a.W,S=a.q,w=a.c,I=a.t,N=a.n,j=a.l,A=a.L,L=a.a4,P=a.w,$=a.u,F=a.h,U=a.$,q=a.e,E=a.r,H=a.f,M=a.I},function(a){T=a.c}],execute:function(){a("u",W);function W(a,r){var i=(a=>{var o=e();return t((()=>n((()=>{o.value=B(a).height})))),o})(a);return a=>o("div",{class:r("placeholder"),style:{height:i.value?i.value+"px":void 0}},[a()])}var[X,D]=w("tabbar"),G={route:Boolean,fixed:I,border:I,zIndex:N,placeholder:Boolean,activeColor:String,beforeChange:Function,inactiveColor:String,modelValue:j(0),safeAreaInsetBottom:{type:Boolean,default:null}},J=Symbol(X),K=r({name:X,props:G,emits:["change","update:modelValue"],setup(a,t){var{emit:n,slots:r}=t,i=e(),{linkChildren:l}=S(J),c=W(i,D),b=()=>{var e,{fixed:t,zIndex:n,border:l}=a;return o("div",{ref:i,role:"tablist",style:A(n),class:[D({fixed:t}),{[L]:l,"van-safe-area-bottom":null!=(e=a.safeAreaInsetBottom)?e:a.fixed}]},[null==r.default?void 0:r.default()])};return l({props:a,setActive:(e,t)=>{T(a.beforeChange,{args:[e],done(){n("update:modelValue",e),n("change",e),t()}})}}),()=>a.fixed&&a.placeholder?c(b):b()}}),O=P(K),[Q,R]=w("tabbar-item"),Y=q({},E,{dot:Boolean,icon:String,name:N,badge:N,iconPrefix:String}),Z=r({name:Q,props:Y,emits:["click"],setup(a,e){var{emit:t,slots:n}=e,r=$(),c=i().proxy,{parent:b,index:v}=F(J);if(b){var d=l((()=>{var e,{route:t,modelValue:n}=b.props;if(t&&"$route"in c){var{$route:o}=c,{to:r}=a,i=H(r)?r:{path:r};return!!o.matched.find((a=>{var e="path"in i&&i.path===a.path,t="name"in i&&i.name===a.name;return e||t}))}return(null!=(e=a.name)?e:v.value)===n})),u=e=>{var n;d.value||b.setActive(null!=(n=a.name)?n:v.value,r);t("click",e)},m=()=>n.icon?n.icon({active:d.value}):a.icon?o(M,{name:a.icon,classPrefix:a.iconPrefix},null):void 0;return()=>{var{dot:e,badge:t}=a,{activeColor:r,inactiveColor:i}=b.props,l=d.value?r:i;return o("div",{role:"tab",class:R({active:d.value}),style:{color:l},tabindex:0,"aria-selected":d.value,onClick:u},[o(U,{dot:e,content:t,class:R("icon")},{default:m}),o("div",{class:R("text")},[null==n.default?void 0:n.default({active:d.value})])])}}}}),aa=P(Z);a("_",r({setup(a){const t=c(),n=b([{name:"分类",path:"/mobile/category",routeName:"mobile-category",icon:v,dot:!1,badge:""},{name:"定制",path:"/mobile/customization",routeName:"mobile-customization",icon:d,dot:!1,badge:""},{name:"购物车",path:"/mobile/cart",routeName:"mobile-cart",icon:u,dot:!1,badge:""},{name:"我的",path:"/mobile/user",routeName:"mobile-user",icon:m,dot:!1,badge:""}]),o=e(t.name);return s((()=>t.name),(a=>{o.value=a})),(a,e)=>{const t=aa,r=O;return g(),f(r,{modelValue:o.value,"onUpdate:modelValue":e[0]||(e[0]=a=>o.value=a),class:"!tw-fixed"},{default:p((()=>[(g(!0),h(V,null,x(C(n),(a=>(g(),f(t,{key:a.name,name:a.routeName,to:a.path,dot:a.dot,badge:a.badge},{icon:p((({active:e})=>[(g(),f(y(a.icon),{class:k(e&&"tw-text-primary")},null,8,["class"]))])),default:p((()=>[z("span",null,_(a.name),1)])),_:2},1032,["name","to","dot","badge"])))),128))])),_:1},8,["modelValue"])}}}))}}}))}();