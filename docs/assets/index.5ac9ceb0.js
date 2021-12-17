import{b1 as e,l as a,b2 as o,b6 as t,ag as s,d as l,f as n,a5 as r,a6 as i,b7 as c,n as u,aa as v,b4 as d,b3 as p,b8 as f,F as m,a8 as h}from"./vendor.a4ef30fa.js";import{g as y,n as b,t as w,u as I,z as x,A as z,p as S,e as k,C as g,i as B,D as C,w as O,r as A,l as P,H as L,I as j}from"./index.30fefea8.js";import{c as X}from"./interceptor.86502246.js";function Y(a){var o=e();o&&y(o.proxy,a)}var E={show:Boolean,zIndex:b,overlay:w,duration:b,teleport:[String,Object],lockScroll:w,lazyRender:w,beforeClose:Function,overlayStyle:Object,overlayClass:I,transitionAppear:Boolean,closeOnClickOverlay:w};function D(){var e=a(0),o=a(0),t=a(0),s=a(0),l=a(0),n=a(0),r=a(""),i=()=>{t.value=0,s.value=0,l.value=0,n.value=0,r.value=""};return{move:a=>{var i,c,u=a.touches[0];t.value=u.clientX<0?0:u.clientX-e.value,s.value=u.clientY-o.value,l.value=Math.abs(t.value),n.value=Math.abs(s.value),r.value||(r.value=(i=l.value,c=n.value,i>c&&i>10?"horizontal":c>i&&c>10?"vertical":""))},start:a=>{i(),e.value=a.touches[0].clientX,o.value=a.touches[0].clientY},reset:i,startX:e,startY:o,deltaX:t,deltaY:s,offsetX:l,offsetY:n,direction:r,isVertical:()=>"vertical"===r.value,isHorizontal:()=>"horizontal"===r.value}}var H=0;function R(e){var o=a(!1);return s(e,(e=>{e&&(o.value=e)}),{immediate:!0}),e=>()=>o.value?e():null}var F=Symbol(),[M,N]=k("overlay"),T=O(l({name:M,props:{show:Boolean,zIndex:b,duration:b,className:I,lockScroll:w,customStyle:Object},setup(e,a){var{slots:o}=a,t=R((()=>e.show)),s=e=>{S(e,!0)},l=t((()=>{var a=y(g(e.zIndex),e.customStyle);return B(e.duration)&&(a.animationDuration=e.duration+"s"),i(n("div",{style:a,class:[N(),e.className],onTouchmove:e.lockScroll?s:C},[null==o.default?void 0:o.default()]),[[c,e.show]])}));return()=>n(r,{name:"van-fade",appear:!0},{default:l})}})),V=y({},E,{round:Boolean,position:P("center"),closeIcon:P("cross"),closeable:Boolean,transition:String,iconPrefix:String,closeOnPopstate:Boolean,closeIconPosition:P("top-right"),safeAreaInsetBottom:Boolean}),[q,G]=k("popup"),J=2e3,K=O(l({name:q,inheritAttrs:!1,props:V,emits:["open","close","opened","closed","update:show","click-overlay","click-close-icon"],setup(e,l){var y,b,w,I,k,g,C,O,P,{emit:E,attrs:M,slots:N}=l,V=a(),q=a(),K=R((()=>e.show||!e.lazyRender)),Q=u((()=>{var a={zIndex:V.value};B(e.duration)&&(a["center"===e.position?"animationDuration":"transitionDuration"]=e.duration+"s");return a})),U=()=>{y||(void 0!==e.zIndex&&(J=+e.zIndex),y=!0,V.value=++J,E("open"))},W=()=>{y&&X(e.beforeClose,{done(){y=!1,E("close"),E("update:show",!1)}})},Z=a=>{E("click-overlay",a),e.closeOnClickOverlay&&W()},$=()=>{if(e.overlay)return n(T,{show:e.show,class:e.overlayClass,zIndex:V.value,duration:e.duration,customStyle:e.overlayStyle,onClick:Z},{default:N["overlay-content"]})},_=e=>{E("click-close-icon",e),W()},ee=()=>{if(e.closeable)return n(j,{role:"button",tabindex:0,name:e.closeIcon,class:[G("close-icon",e.closeIconPosition),L],classPrefix:e.iconPrefix,onClick:_},null)},ae=()=>E("opened"),oe=()=>E("closed"),te=K((()=>{var{round:a,position:o,safeAreaInsetBottom:t}=e;return i(n("div",h({ref:q,style:Q.value,class:[G({round:a,[o]:o}),{"van-safe-area-bottom":t}]},M),[null==N.default?void 0:N.default(),ee()]),[[c,e.show]])})),se=()=>{var{position:a,transition:o,transitionAppear:t}=e;return n(r,{name:o||("center"===a?"van-fade":"van-popup-slide-"+a),appear:t,onAfterEnter:ae,onAfterLeave:oe},{default:te})};return s((()=>e.show),(e=>{e?U():(y=!1,E("close"))})),Y({popupRef:q}),w=q,I=()=>e.show&&e.lockScroll,k=D(),g=e=>{k.move(e);var a=k.deltaY.value>0?"10":"01",o=z(e.target,w.value),{scrollHeight:t,offsetHeight:s,scrollTop:l}=o,n="11";0===l?n=s>=t?"00":"01":l+s>=t&&(n="10"),"11"===n||!k.isVertical()||parseInt(n,2)&parseInt(a,2)||S(e,!0)},C=()=>{document.addEventListener("touchstart",k.start),document.addEventListener("touchmove",g,{passive:!1}),H||document.body.classList.add("van-overflow-hidden"),H++},O=()=>{H&&(document.removeEventListener("touchstart",k.start),document.removeEventListener("touchmove",g),--H||document.body.classList.remove("van-overflow-hidden"))},P=()=>I()&&O(),x((()=>I()&&C())),o(P),t(P),s(I,(e=>{e?C():O()})),A("popstate",(()=>{e.closeOnPopstate&&(W(),b=!1)})),v((()=>{e.show&&U()})),d((()=>{b&&(E("update:show",!0),b=!1)})),o((()=>{e.show&&(W(),b=!0)})),p(F,(()=>e.show)),()=>e.teleport?n(f,{to:e.teleport},{default:()=>[$(),se()]}):n(m,null,[$(),se()])}}));export{K as P,Y as a,D as u};
