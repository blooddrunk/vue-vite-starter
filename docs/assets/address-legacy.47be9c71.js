System.register(["./vendor-legacy.a2d7269a.js","./index-legacy.1a48ac8b.js","./index-legacy.4d6ca972.js","./index-legacy.02a830c6.js","./index-legacy.6da3e057.js","./index-legacy.fa22f2bf.js","./order-legacy.710fdc71.js","./function-call-legacy.6b407d2e.js","./index-legacy.38433af3.js","./on-popup-reopen-legacy.ce7ff038.js","./index-legacy.a9020a9c.js","./useAxios-legacy.97e1062a.js","./math-legacy.0b21c3d7.js","./interceptor-legacy.247dd095.js"],(function(e){"use strict";var n,a,c,t,s,o,i,u,r,l,d;return{setters:[function(e){n=e.d,a=e.ae,c=e.o,t=e.a,s=e.f,o=e.L},function(){},function(){},function(e){i=e.A},function(e){u=e.a},function(){},function(e){r=e.u,l=e.p},function(e){d=e.T},function(){},function(){},function(){},function(){},function(){},function(){}],execute:function(){var f={};const g={class:"tw-article"},y=e("default",n({setup(e){const n=a(),f=r(),y=(e,n)=>"name"===e&&n&&n.length>10?"姓名不能超过10个字符":"",{isPending:j,request:p}=l((()=>{d.success({message:"下单成功!",onClose:()=>{n.push("/mobile/user")}})}),(e=>{d(e.message)})),v=e=>{f.updateOrderInfo({contactPerson:e.name,servicePhone:e.tel,address:`${e.province} ${e.country} ${e.county} ${e.addressDetail}`}),p(f.orderInfo)};return(e,n)=>{const a=i;return c(),t("div",g,[s(a,{"area-list":o(u),"area-columns-placeholder":["请选择","请选择","请选择"],"save-button-text":"确认提交","detail-maxlength":"50","detail-rows":"2",validator:y,"is-saving":o(j),onSave:v},null,8,["area-list","is-saving"])])}}}));"function"==typeof f&&f(y)}}}));