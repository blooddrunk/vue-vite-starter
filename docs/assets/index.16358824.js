var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,n=(t,r,a)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[r]=a,i=(e,t)=>{for(var r in t||(t={}))o.call(t,r)&&n(e,r,t[r]);if(a)for(var r of a(t))s.call(t,r)&&n(e,r,t[r]);return e},m=(e,a)=>t(e,r(a));export function __vite_legacy_guard(){import("data:text/javascript,")}import{d as c,u as l,I as u,D as p,r as d,c as _,o as b,a as f,F as h,b as y,e as v,f as g,w as E,g as w,t as O,h as A,i as P,E as L,_ as j,j as I,k as D,l as x,m as V,n as T,p as R,q as k,s as q,N as S,v as z,x as N,y as C,z as $,A as M,B as H,C as B,G as F,H as U,J as W,K,L as G,M as J,O as Q,P as X,U as Y,Q as Z,R as ee,S as te,T as re,V as ae,W as oe,X as se,Y as ne,Z as ie,$ as me,a0 as ce,a1 as le,a2 as ue}from"./vendor.a4ef30fa.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var pe=(e,t)=>{const r=e.__vccOpts||e;for(const[a,o]of t)r[a]=o;return r};var de=pe(c({setup(){l({title:"Vue 3 starter template using Vite",meta:[{name:"description",content:"Opinionated Vite/Vue 3 Starter Template"}]}),u(m(i({},p),{size:"1em"}))}}),[["render",function(e,t,r,a,o,s){const n=d("router-view");return b(),_(n)}]]);const _e={},be=function(e,t){return t&&0!==t.length?Promise.all(t.map((e=>{if((e=`/vue-vite-starter/${e}`)in _e)return;_e[e]=!0;const t=e.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${r}`))return;const a=document.createElement("link");return a.rel=t?"stylesheet":"modulepreload",t||(a.as="script",a.crossOrigin=""),a.href=e,document.head.appendChild(a),t?new Promise(((e,t)=>{a.addEventListener("load",e),a.addEventListener("error",t)})):void 0}))).then((()=>e())):e()};var fe={};const he={class:"tw-list-none md:tw-w-1/2 tw-w-2/3 tw-m-auto tw-text-lg"},ye=c({setup(e){const t=[{text:"Simple list",to:"/simple-list"},{text:"Simple Form",to:"/simple-form"},{text:"ECharts",to:"/echarts"},{text:"Directive(Intersection Observer)",to:"/directive-intersection-observer"},{text:"Lazy Image",to:"/lazy-image"},{text:"Biz Admin",to:"/admin/account"},{text:"Mobile layout with vant",to:"/mobile"}];return(e,r)=>{const a=d("router-link");return b(),f("ul",he,[(b(),f(h,null,y(t,(e=>v("li",{key:e.text,class:"tw-px-2 tw-py-3 tw-border-b"},[g(a,{class:"tw-flex tw-items-center tw-justify-between tw-cursor-pointer",to:e.to},{default:E((()=>[w(O(e.text),1)])),_:2},1032,["to"])]))),64))])}}});"function"==typeof fe&&fe(ye);const ve=[{path:"/admin",component:()=>be((()=>import("./admin.96c88736.js")),["assets/admin.96c88736.js","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css"]),children:[{name:"admin-account",path:"account",component:()=>be((()=>import("./account.a69b8893.js")),["assets/account.a69b8893.js","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css"]),props:!0,meta:{layout:"sidebar",breadcrumb:{text:"Account"}}},{name:"admin-role",path:"role",component:()=>be((()=>import("./role.215ac2f5.js")),["assets/role.215ac2f5.js","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css"]),props:!0,meta:{layout:"sidebar",breadcrumb:[{text:"Custom",to:{name:"admin-account"}},{text:"Breadcrumb"}]}}],props:!0,meta:{layout:"sidebar",breadcrumb:{text:"Admin"}}},{name:"directive-intersection-observer",path:"/directive-intersection-observer",component:()=>be((()=>import("./directive-intersection-observer.a31a4793.js")),["assets/directive-intersection-observer.a31a4793.js","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css"]),props:!0,meta:{requiresAuth:!1}},{name:"echarts",path:"/echarts",component:()=>be((()=>import("./echarts.39752c83.js")),["assets/echarts.39752c83.js","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css"]),props:!0,meta:{requiresAuth:!1}},{name:"index",path:"/",component:ye,props:!0,meta:{requiresAuth:!1,breadcrumb:{text:"fsd"}}},{name:"lazy-image",path:"/lazy-image",component:()=>be((()=>import("./lazy-image.b6c84d54.js")),["assets/lazy-image.b6c84d54.js","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css"]),props:!0,meta:{requiresAuth:!1}},{name:"sign-in",path:"/sign-in",component:()=>be((()=>import("./sign-in.468ba853.js")),["assets/sign-in.468ba853.js","assets/sign-in.26898853.css","assets/BaseInput.30f4362e.js","assets/useFormField.7634f690.js","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css","assets/AppLogo.66d369f9.js"]),props:!0,meta:{layout:"empty",requiresAuth:!1}},{name:"simple-form",path:"/simple-form",component:()=>be((()=>import("./simple-form.a1d41165.js")),["assets/simple-form.a1d41165.js","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css","assets/BaseInput.30f4362e.js","assets/useFormField.7634f690.js","assets/useAxios.8bd7f2aa.js","assets/index.ab5ea04f.js"]),props:!0,meta:{requiresAuth:!1}},{name:"simple-list",path:"/simple-list",component:()=>be((()=>import("./simple-list.660d56d3.js")),["assets/simple-list.660d56d3.js","assets/simple-list.1de091d3.css","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css","assets/BaseInput.30f4362e.js","assets/useFormField.7634f690.js","assets/usePaginatedList.61d4b844.js","assets/index.ab5ea04f.js","assets/useAxios.8bd7f2aa.js"]),props:!0,meta:{requiresAuth:!1}},{name:"mobile-category",path:"/mobile/category",component:()=>be((()=>import("./category.7dcd24d1.js")),["assets/category.7dcd24d1.js","assets/category.d8764b64.css","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css","assets/usePaginatedList.61d4b844.js","assets/index.ab5ea04f.js","assets/useAxios.8bd7f2aa.js","assets/use-route.1f47bd5d.js","assets/index.30fefea8.js","assets/index.5ac9ceb0.js","assets/interceptor.86502246.js","assets/index.68852432.js"]),props:!0,meta:{layout:"tabbar-navbar",requiresAuth:!1,title:"商品分类"}},{name:"mobile-customization",path:"/mobile/customization",component:()=>be((()=>import("./customization.06ff7a9f.js")),["assets/customization.06ff7a9f.js","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css"]),props:!0,meta:{layout:"tabbar"}},{name:"mobile",path:"/mobile",component:()=>be((()=>import("./index.b739215d.js")),[]),props:!0,redirect:{name:"mobile-category"},meta:{layout:"tabbar",requiresAuth:!1}},{name:"mobile-login",path:"/mobile/login",component:()=>be((()=>import("./login.d10cd8f5.js")),["assets/login.d10cd8f5.js","assets/login.c0a9c863.css","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css","assets/index.418b80cd.js","assets/index.d943078a.css","assets/use-route.1f47bd5d.js","assets/index.30fefea8.js","assets/index.68852432.js","assets/useFormField.7634f690.js","assets/index.ab5ea04f.js","assets/index.5ac9ceb0.js","assets/interceptor.86502246.js"]),props:!0,meta:{layout:"empty",requiresAuth:!1}},{name:"mobile-privacy-policy",path:"/mobile/privacy-policy",component:()=>be((()=>import("./privacy-policy.1cabed96.js")),["assets/privacy-policy.1cabed96.js","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css","assets/index.418b80cd.js","assets/index.d943078a.css","assets/use-route.1f47bd5d.js","assets/index.30fefea8.js","assets/index.68852432.js"]),props:!0,meta:{layout:"navbar",requiresAuth:!1,title:"HSOP隐私政策"}},{name:"mobile-user",path:"/mobile/user",component:()=>be((()=>import("./user.81dfa23f.js")),["assets/user.81dfa23f.js","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css"]),props:!0,meta:{layout:"tabbar"}},{name:"mobile-user-agreement",path:"/mobile/user-agreement",component:()=>be((()=>import("./user-agreement.b589e5b0.js")),["assets/user-agreement.b589e5b0.js","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css","assets/index.418b80cd.js","assets/index.d943078a.css","assets/use-route.1f47bd5d.js","assets/index.30fefea8.js","assets/index.68852432.js"]),props:!0,meta:{layout:"navbar",requiresAuth:!1,title:"HSOP用户协议"}},{name:"all",path:"/:all(.*)*",component:()=>be((()=>import("./_.1dc3b793.js")),["assets/_.1dc3b793.js","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css"]),props:!0,meta:{layout:"error"}}],ge=c({setup(){const e=A({valueDark:"tw-dark"}),t=P(e);return{isDark:e,toggleIsDark:()=>{t()}}}}),Ee={class:"tw-h-screen tw-p-6 tw-overflow-y-auto dark:tw-bg-gray-800 dark:tw-text-white"},we={class:"tw-flex tw-flex-col tw-items-center tw-pt-20"},Oe={class:"tw-flex tw-items-center tw-py-5 tw-text-3xl tw-font-bold tw-text-primary"},Ae=v("span",null,"Vue 3",-1),Pe={class:"tw-container"};const Le={default:pe(ge,[["render",function(e,t,r,a,o,s){const n=j,i=I,m=L,c=d("router-link"),l=d("router-view");return b(),f("main",Ee,[v("section",we,[g(c,{to:"/"},{default:E((()=>[v("h2",Oe,[Ae,g(m,{class:"!tw-ml-3",type:"text",onClick:e.toggleIsDark},{default:E((()=>[e.isDark?(b(),_(n,{key:0,size:20})):(b(),_(i,{key:1,size:20}))])),_:1},8,["onClick"])])])),_:1}),v("div",Pe,[g(l)])])])}]]),empty:()=>be((()=>import("./empty.c9264c7b.js")),["assets/empty.c9264c7b.js","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css"]),error:()=>be((()=>import("./error.57ff4360.js")),["assets/error.57ff4360.js","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css"]),navbar:()=>be((()=>import("./navbar.47a286c3.js")),["assets/navbar.47a286c3.js","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css","assets/index.204b3e07.js","assets/index.69860d2f.css","assets/use-placeholder.bdb1b7e5.js","assets/index.30fefea8.js"]),sidebar:()=>be((()=>import("./sidebar.a651eaac.js")),["assets/sidebar.a651eaac.js","assets/sidebar.91c5cf27.css","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css","assets/AppLogo.66d369f9.js"]),"tabbar-navbar":()=>be((()=>import("./tabbar-navbar.3b90456f.js")),["assets/tabbar-navbar.3b90456f.js","assets/TheTabbar.ecbe387a.js","assets/TheTabbar.2a7c3a99.css","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css","assets/index.30fefea8.js","assets/use-placeholder.bdb1b7e5.js","assets/interceptor.86502246.js","assets/use-route.1f47bd5d.js","assets/index.204b3e07.js","assets/index.69860d2f.css"]),tabbar:()=>be((()=>import("./tabbar.ed641d86.js")),["assets/tabbar.ed641d86.js","assets/TheTabbar.ecbe387a.js","assets/TheTabbar.2a7c3a99.css","assets/vendor.a4ef30fa.js","assets/vendor.c5a59ef5.css","assets/index.30fefea8.js","assets/use-placeholder.bdb1b7e5.js","assets/interceptor.86502246.js","assets/use-route.1f47bd5d.js"])};const je=D("auth",(()=>{const e=x({user:V("hsop_user",{userName:"mockedLoginUser",mobile:"13312331233"})}),t=T((()=>e.value.user)),r=T((()=>t.value.userName)),a=T((()=>!!r.value)),o=x(!1),s=x(""),n=T((()=>!!s.value)),i=x(!1);return{user:t,userName:r,isLoggedIn:a,loginError:s,hasLoginError:n,isLoginPending:o,login:async t=>{o.value=!0;try{if(await R(1e3),"admin"!==t.password)throw new Error("wrong auth info");e.value.user={userName:t.username}}catch(r){console.error(r),s.value=r.message||"发生未知错误"}finally{o.value=!1}},logout:()=>{e.value.user={},s.value=""},isForcedOut:i}}));const Ie=[{id:"dashboard",title:"首页",icon:"dashboard"},{id:"admin",title:"系统管理",icon:"config",children:[{id:"admin-account",title:"账号管理",to:{name:"admin-account"}},{id:"admin-role",title:"角色管理",to:{name:"admin-role"}}]}],De=(e=>{const t={},r=e=>e.forEach((e=>{if(!e.id)throw new Error(`Menu item must have a 'id' field: ${e}`);t[e.id]=i({},e),e.children&&e.children.length&&r(e.children)}),{});return r(e),t})(Ie),xe=D("ui",(()=>{const e=x([]),t=x(!1);return{breadcrumbList:e,isSidebarCollapsed:t,toggleIsSidebarCollapsed:P(t),sidebarData:x(Ie)}}));var Ve=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",auth:e=>{e.beforeEach((e=>{if(e.name&&String(e.name).startsWith("mobile"))return;const t=je(),r=t.isLoggedIn,a="sign-in"===e.name,o=!(r||void 0!==e.meta.requiresAuth&&!e.meta.requiresAuth);if(a&&r)t.logout();else if(o&&!r)return{name:"sign-in",query:i({from:e.name||"index"},e.query)}}))},breadcrumb:e=>{e.beforeEach((e=>{const t=xe(),{matched:r}=e;let a=[];const{meta:o}=r[r.length-1];Array.isArray(o.breadcrumb)?a=o.breadcrumb:o.breadcrumb&&(a=r.reduce(((e,t)=>{var r,a,o;if(!0===(null==(r=t.meta)?void 0:r.breadcrumb)){const r=De[t.name];r?e.push({to:r.to,text:r.title}):console.warn(`failed to find a matched menu item for route '${t.name}'`)}else(null==(a=t.meta)?void 0:a.breadcrumb)&&(e=e.concat(null==(o=t.meta)?void 0:o.breadcrumb));return e}),[])),t.breadcrumbList=a}))}});const Te=q({history:k("/vue-vite-starter/"),routes:ve.map((e=>{var t;return{path:e.path,component:Le[(null==(t=e.meta)?void 0:t.layout)||"default"],children:[m(i({},e),{path:""})]}}))});let Re;for(Re in Te.beforeEach(((e,t,r)=>{e.name&&S.start(),r()})),Te.afterEach((()=>{S.done()})),Ve){(0,Ve[Re])(Te)}const ke=e=>{e._observe&&(e._observe.observer.unobserve(e),delete e._observe)},qe={mounted:(e,t)=>{const r=t.modifiers||{},a=t.value,{handler:o,options:s}="object"==typeof a?a:{handler:a,options:{}},n=new IntersectionObserver(((t=[],a)=>{if(e._observe){if(o&&(!r.quiet||e._observe.init)){const e=t.some((e=>e.isIntersecting));o(t,a,e)}e._observe.init&&r.once?ke(e):e._observe.init=!0}}),s);e._observe={init:!1,observer:n},n.observe(e)},unmounted:ke};var Se=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",intersect:qe});const ze=["primary"],Ne=(e,t,{hasCategoryDimension:r=!0}={})=>{const a=[],o=[];return G(e).forEach(((e,s)=>{if(r&&0===s)return void a.push(e);const n="string"==typeof e?{name:e}:e,{name:i,displayName:m,displayDimension:c,isPercentage:l,seriesConfig:u}=n;a.push({name:i,displayName:m});let p=c;l&&!c&&(p=`${i}_Percentage`);const d=u||{};if(d.type=d.type||t,!d.type)throw new Error(`series type of [${i}] is missing`);const _=J({encode:{x:[0],y:i,seriesName:i,tooltip:i}},d);p&&(a.push(p),_.encode.tooltip=p),o.push(_)})),{dimensions:a,series:o}};var Ce=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",clientInit:e=>{e.config.globalProperties.$appName="HSOP"},pinia:e=>{const t=z();e.use(t)},elementUI:e=>{e.use(N)},veeValidate:async()=>{const e=await be((()=>import("./zh_CN.a78ee0a0.js")),[]);C({zh_CN:e}),$({generateMessage:C(e.code,{messages:{required:"{field}不能为空"}})}),M("required",H),M("min",B),M("max",F),M("numeric",U),M("min_value",W),M("max_value",K),M("mobile",(e=>!e||!e.length||(!!/^1\d{10}$/.test(e)||"请输入有效的手机号码")))},echarts:async e=>{Q([Z,ee,te,re,ae,oe,se,ne,ie]);(await Promise.all(ze.map((e=>function(e){switch(e){case"./theme/primary.ts":return be((()=>import("./primary.5e55ba60.js")),[]);case"./theme/secondary.ts":return be((()=>import("./secondary.fd5395dc.js")),[]);default:return new Promise((function(t,r){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(r.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}(`./theme/${e}.ts`).then((e=>e.default)))))).forEach(((e,t)=>{const r=ze[t];X(r,e)})),e.component("ECharts",Y)},head:e=>{const t=me();e.use(t)},iconPark:e=>{((...t)=>{t.forEach((t=>{e.component(t.name,t)}))})(le,ce)}});const $e=ue(de);(async()=>{await(async e=>{let t,r;for(t in Se){const r=Se[t];e.directive(t,r)}for(r in Ce){const t=Ce[r];await t(e)}})($e),$e.use(Te),Te.isReady().then((()=>$e.mount("#app")))})();export{pe as _,xe as a,Ne as n,je as u};
