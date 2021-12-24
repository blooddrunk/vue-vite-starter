import{a$ as e,b0 as o,ag as a,l as t,d as s,f as n,a5 as l,a6 as r,aY as i,n as c,aa as d,b1 as u,aW as p,b2 as v,F as f,a8 as m,a2 as y,aV as h,b3 as g,aU as w}from"./vendor.e60456f3.js";import{a as b,u as k,P as C}from"./on-popup-reopen.d93741ed.js";import{n as O,t as S,a as x,J as I,K as z,p as B,c as P,e as L,L as j,i as A,M as T,w as E,N,m as D,H,I as M,G as R,A as U,O as F,f as V}from"./index.84f5d824.js";import{c as Y}from"./interceptor.f210eca8.js";import{L as $}from"./index.e74be4f5.js";var G={show:Boolean,zIndex:O,overlay:S,duration:O,teleport:[String,Object],lockScroll:S,lazyRender:S,beforeClose:Function,overlayStyle:Object,overlayClass:x,transitionAppear:Boolean,closeOnClickOverlay:S},J=Object.keys(G),K=0;function W(e){var o=t(!1);return a(e,(e=>{e&&(o.value=e)}),{immediate:!0}),e=>()=>o.value?e():null}var[q,Q]=P("overlay"),X=s({name:q,props:{show:Boolean,zIndex:O,duration:O,className:x,lockScroll:S,customStyle:Object},setup(e,o){var{slots:a}=o,t=W((()=>e.show)),s=e=>{B(e,!0)},c=t((()=>{var o=L(j(e.zIndex),e.customStyle);return A(e.duration)&&(o.animationDuration=e.duration+"s"),r(n("div",{style:o,class:[Q(),e.className],onTouchmove:e.lockScroll?s:T},[null==a.default?void 0:a.default()]),[[i,e.show]])}));return()=>n(l,{name:"van-fade",appear:!0},{default:c})}}),Z=E(X),_=L({},G,{round:Boolean,position:D("center"),closeIcon:D("cross"),closeable:Boolean,transition:String,iconPrefix:String,closeOnPopstate:Boolean,closeIconPosition:D("top-right"),safeAreaInsetBottom:Boolean}),[ee,oe]=P("popup"),ae=2e3,te=s({name:ee,inheritAttrs:!1,props:_,emits:["open","close","opened","closed","update:show","click-overlay","click-close-icon"],setup(s,y){var h,g,w,O,S,x,P,L,j,{emit:T,attrs:E,slots:D}=y,R=t(),U=t(),F=W((()=>s.show||!s.lazyRender)),V=c((()=>{var e={zIndex:R.value};A(s.duration)&&(e["center"===s.position?"animationDuration":"transitionDuration"]=s.duration+"s");return e})),$=()=>{h||(void 0!==s.zIndex&&(ae=+s.zIndex),h=!0,R.value=++ae,T("open"))},G=()=>{h&&Y(s.beforeClose,{done(){h=!1,T("close"),T("update:show",!1)}})},J=e=>{T("click-overlay",e),s.closeOnClickOverlay&&G()},q=()=>{if(s.overlay)return n(Z,{show:s.show,class:s.overlayClass,zIndex:R.value,duration:s.duration,customStyle:s.overlayStyle,onClick:J},{default:D["overlay-content"]})},Q=e=>{T("click-close-icon",e),G()},X=()=>{if(s.closeable)return n(M,{role:"button",tabindex:0,name:s.closeIcon,class:[oe("close-icon",s.closeIconPosition),H],classPrefix:s.iconPrefix,onClick:Q},null)},_=()=>T("opened"),ee=()=>T("closed"),te=F((()=>{var{round:e,position:o,safeAreaInsetBottom:a}=s;return r(n("div",m({ref:U,style:V.value,class:[oe({round:e,[o]:o}),{"van-safe-area-bottom":a}]},E),[null==D.default?void 0:D.default(),X()]),[[i,s.show]])})),se=()=>{var{position:e,transition:o,transitionAppear:a}=s;return n(l,{name:o||("center"===e?"van-fade":"van-popup-slide-"+e),appear:a,onAfterEnter:_,onAfterLeave:ee},{default:te})};return a((()=>s.show),(e=>{e?$():(h=!1,T("close"))})),k({popupRef:U}),w=U,O=()=>s.show&&s.lockScroll,S=b(),x=e=>{S.move(e);var o=S.deltaY.value>0?"10":"01",a=z(e.target,w.value),{scrollHeight:t,offsetHeight:s,scrollTop:n}=a,l="11";0===n?l=s>=t?"00":"01":n+s>=t&&(l="10"),"11"===l||!S.isVertical()||parseInt(l,2)&parseInt(o,2)||B(e,!0)},P=()=>{document.addEventListener("touchstart",S.start),document.addEventListener("touchmove",x,{passive:!1}),K||document.body.classList.add("van-overflow-hidden"),K++},L=()=>{K&&(document.removeEventListener("touchstart",S.start),document.removeEventListener("touchmove",x),--K||document.body.classList.remove("van-overflow-hidden"))},j=()=>O()&&L(),I((()=>O()&&P())),e(j),o(j),a(O,(e=>{e?P():L()})),N("popstate",(()=>{s.closeOnPopstate&&(G(),g=!1)})),d((()=>{s.show&&$()})),u((()=>{g&&(T("update:show",!0),g=!1)})),e((()=>{s.show&&(G(),g=!0)})),p(C,(()=>s.show)),()=>s.teleport?n(v,{to:s.teleport},{default:()=>[q(),se()]}):n(f,null,[q(),se()])}}),se=E(te);function ne(){var e=h({show:!1}),o=o=>{e.show=o},a=a=>{L(e,a,{transitionAppear:!0}),o(!0)},t=()=>o(!1);return k({open:a,close:t,toggle:o}),{open:a,close:t,state:e,toggle:o}}function le(e){var o=y(e),a=document.createElement("div");return document.body.appendChild(a),{instance:o.mount(a),unmount(){o.unmount(),document.body.removeChild(a)}}}var re=0;var[ie,ce]=P("toast"),de=["show","overlay","transition","overlayClass","overlayStyle","closeOnClickOverlay"],ue=s({name:ie,props:{icon:String,show:Boolean,type:D("text"),overlay:Boolean,message:O,iconSize:O,duration:U(2e3),position:D("middle"),className:x,iconPrefix:String,transition:D("van-fade"),loadingType:String,forbidClick:Boolean,overlayClass:x,overlayStyle:Object,closeOnClick:Boolean,closeOnClickOverlay:Boolean},emits:["update:show"],setup(e,o){var t,{emit:s}=o,l=!1,r=()=>{var o=e.show&&e.forbidClick;l!==o&&((l=o)?(re||document.body.classList.add("van-toast--unclickable"),re++):re&&(--re||document.body.classList.remove("van-toast--unclickable")))},i=e=>s("update:show",e),c=()=>{e.closeOnClick&&i(!1)},u=()=>clearTimeout(t),p=()=>{var{icon:o,type:a,iconSize:t,iconPrefix:s,loadingType:l}=e;return o||"success"===a||"fail"===a?n(M,{name:o||a,size:t,class:ce("icon"),classPrefix:s},null):"loading"===a?n($,{class:ce("loading"),size:t,type:l},null):void 0},v=()=>{var{type:o,message:a}=e;if(A(a)&&""!==a)return"html"===o?n("div",{class:ce("text"),innerHTML:String(a)},null):n("div",{class:ce("text")},[a])};return a((()=>[e.show,e.forbidClick]),r),a((()=>[e.show,e.type,e.message,e.duration]),(()=>{u(),e.show&&e.duration>0&&(t=setTimeout((()=>{i(!1)}),e.duration))})),d(r),g(r),()=>n(se,m({class:[ce([e.position,{[e.type]:!e.icon}]),e.className],lockScroll:!1,onClick:c,onClosed:u,"onUpdate:show":i},R(e,de)),{default:()=>[p(),v()]})}}),pe={icon:"",type:"text",message:"",className:"",overlay:!1,onClose:void 0,onOpened:void 0,duration:2e3,teleport:"body",iconSize:void 0,iconPrefix:void 0,position:"middle",transition:"van-fade",forbidClick:!1,loadingType:void 0,overlayClass:"",overlayStyle:void 0,closeOnClick:!1,closeOnClickOverlay:!1},ve=[],fe=!1,me=L({},pe),ye=new Map;function he(e){return V(e)?e:{message:e}}function ge(){if(!ve.length||fe){var e=function(){var{instance:e,unmount:o}=le({setup(){var s=t(""),{open:l,state:r,close:i,toggle:c}=ne(),d=()=>{fe&&(ve=ve.filter((o=>o!==e)),o())};return a(s,(e=>{r.message=e})),w().render=()=>n(ue,m(r,{onClosed:d,"onUpdate:show":c}),null),{open:l,clear:i,message:s}}});return e}();ve.push(e)}return ve[ve.length-1]}function we(e){if(void 0===e&&(e={}),!F)return{};var o=ge(),a=he(e);return o.open(L({},me,ye.get(a.type||me.type),a)),o}var be=e=>o=>we(L({type:e},he(o)));we.loading=be("loading"),we.success=be("success"),we.fail=be("fail"),we.clear=e=>{if(ve.length)if(e)ve.forEach((e=>{e.clear()})),ve=[];else if(fe){var o;null==(o=ve.shift())||o.clear()}else ve[0].clear()},we.setDefaultOptions=function(e,o){"string"==typeof e?ye.set(e,o):L(me,e)},we.resetDefaultOptions=e=>{"string"==typeof e?ye.delete(e):(me=L({},pe),ye.clear())},we.allowMultiple=function(e){void 0===e&&(e=!0),fe=e},we.install=e=>{e.use(E(ue)),e.config.globalProperties.$toast=we};export{se as P,we as T,J as a,le as m,G as p,ne as u};