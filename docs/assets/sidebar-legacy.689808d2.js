!function(){var e=document.createElement("style");e.innerHTML="._sidebar_10iu9_2{--tw-border-opacity:1;border-color:rgb(229 231 235/var(--tw-border-opacity));border-right-width:1px;height:var(--app-content-height);overflow-y:auto}._sidebar_10iu9_2 span.i-icon{height:auto!important;visibility:visible!important;width:auto!important}._sidebar_10iu9_2 .el-menu{border-style:none!important;min-height:20rem}._sidebar_10iu9_2 .el-menu:not(.el-menu--collapse){width:14rem}._heading_125dr_2{align-items:center;background-color:var(--color-primary);display:flex;flex-shrink:0;height:var(--app-header-height);justify-content:space-between;padding:1rem}\n",document.head.appendChild(e),System.register(["./index-legacy.32c4d29f.js","./vendor-legacy.0ffd2f3d.js","./AppLogo-legacy.39cf9538.js"],(function(e){"use strict";var t,n,i,a,l,s,o,r,d,c,u,m,p,w,f,b,h,g,_,y,v,x,k,C,I,j,$,N,S,z,L,M,T,E,q,A,D,F,H;return{setters:[function(e){t=e.a,n=e._,i=e.u},function(e){a=e.d,l=e.n,s=e.L,o=e.o,r=e.a,d=e.f,c=e.w,u=e.F,m=e.b,p=e.c,w=e.g,f=e.t,b=e.a7,h=e.bb,g=e.bc,_=e.ae,y=e.r,v=e.av,x=e.e,k=e.bd,C=e.be,I=e.a9,j=e.af,$=e.a4,N=e.bf,S=e.bg,z=e.E,L=e.bh,M=e.bi,T=e.bj,E=e.bk,q=e.bl,A=e.bm,D=e.bn,F=e.bo},function(e){H=e._}],execute:function(){const O={key:0,class:"tw-py-3"},V=a({setup(e){const n=t(),i=l((()=>n.breadcrumbList.filter((e=>!1!==e.isVisible)))),a=l((()=>i.value.length>0));return(e,t)=>{const n=h,l=g;return s(a)?(o(),r("nav",O,[d(l,null,{default:c((()=>[(o(!0),r(u,null,m(s(i),(e=>(o(),p(n,{key:e.text,to:e.to},{default:c((()=>[w(f(e.text),1)])),_:2},1032,["to"])))),128))])),_:1})])):b("",!0)}}}),B=a({name:"TheSidebarItem",props:{item:{type:Object,required:!0}},setup(e){const t=l((()=>{var t;return!(null===(t=e.item.children)||void 0===t||!t.length)})),n=_();return{hasChildren:t,handleItemClick:e=>{e.to?n.push(e.to):console.warn(`No route config found for '${e.id}'`)},getIconComponentName:e=>`icon-${e}`}}}),G={class:"tw-ml-1.5"},J={class:"tw-ml-1.5"};var K=n(B,[["render",function(e,t,n,i,a,l){const s=y("TheSidebarItem",!0),d=k,w=C;return e.hasChildren?(o(),p(d,{key:0,index:"item.id"},{title:c((()=>[e.item.icon?(o(),p(v(e.getIconComponentName(e.item.icon)),{key:0,size:18})):b("",!0),x("span",G,f(e.item.title),1)])),default:c((()=>[(o(!0),r(u,null,m(e.item.children,(e=>(o(),p(s,{key:e.id,item:e},null,8,["item"])))),128))])),_:1})):(o(),p(w,{key:1,index:e.item.id,onClick:t[0]||(t[0]=t=>e.handleItemClick(e.item))},{default:c((()=>[e.item.icon?(o(),p(v(e.getIconComponentName(e.item.icon)),{key:0,size:18})):b("",!0),x("span",J,f(e.item.title),1)])),_:1},8,["index"]))}]]);var P={sidebar:"_sidebar_10iu9_2"};const Q={class:"tw-border-b tw-border-gray-100"},R=a({setup(e){const n=t(),{isSidebarCollapsed:i,sidebarData:a}=I(n),w=()=>n.toggleIsSidebarCollapsed(),f=j(),b=l((()=>f.name||""));return(e,t)=>{const n=N,l=S,f=z,h=L,g=K,_=M;return o(),r("aside",{class:$(e.$style.sidebar)},[x("div",Q,[d(h,{content:s(i)?"展开":"折叠",placement:"right"},{default:c((()=>[d(f,{class:"tw-w-full",type:"text",onClick:w},{default:c((()=>[s(i)?(o(),p(n,{key:0})):(o(),p(l,{key:1}))])),_:1})])),_:1},8,["content"])]),d(_,{"default-active":s(b),collapse:s(i)},{default:c((()=>[(o(!0),r(u,null,m(s(a),(e=>(o(),p(g,{key:e.id,item:e},null,8,["item"])))),128))])),_:1},8,["default-active","collapse"])],2)}}}),U={};U.$style=P;var W=n(R,[["__cssModules",U]]);var X={heading:"_heading_125dr_2"};const Y={class:"tw-flex tw-items-center tw-text-white"},Z={class:"tw-ml-1"},ee=w(" 修改密码 "),te=w(" 退出登录 "),ne=a({setup(e){const t=_(),n=i(),a=n.userName,l=async e=>{if("logout"===e)await n.logout(),t.push({name:"sign-in"})};return(e,t)=>{const n=H,i=T,u=E,m=q,p=A,w=D,b=F;return o(),r("nav",{class:$(e.$style.heading)},[d(n,{"is-link":""}),d(b,{size:"medium",onCommand:l},{dropdown:c((()=>[d(w,null,{default:c((()=>[d(m,{command:"password"},{default:c((()=>[ee,d(u,{class:"tw-ml-1"})])),_:1}),d(m,{command:"logout"},{default:c((()=>[te,d(p,{class:"tw-ml-1"})])),_:1})])),_:1})])),default:c((()=>[x("div",Y,[d(i,{size:18}),x("span",Z,f(s(a)),1)])])),_:1})],2)}}}),ie={};ie.$style=X;var ae=n(ne,[["__cssModules",ie]]);const le={class:"tw-flex"},se={class:"tw-min-h-screen tw-w-full tw-flex tw-flex-col"},oe={class:"tw-flex-grow tw-flex tw-overflow-x-hidden"},re={class:"tw-flex-grow tw-p-4 xl:tw-p-8 2xl:tw-p-12 tw-bg-main"},de={class:"tw-p-3 xl:tw-p-6 2xl:tw-p-9 tw-bg-white tw-shadow-xl"};e("default",n({},[["render",function(e,t){const n=ae,i=W,a=V,l=y("router-view");return o(),r("div",le,[x("div",se,[d(n),x("div",oe,[d(i),x("main",re,[d(a),x("section",de,[d(l)])])])])])}]]))}}}))}();
