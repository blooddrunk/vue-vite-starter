var e=Object.defineProperty,a=Object.defineProperties,r=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,i=(a,r,t)=>r in a?e(a,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[r]=t;import{a as n,q as l,A as d,c as u,n as c,t as g,m,I as v,w as p,l as h,g as f}from"./index.b05a476a.js";import{d as y,l as w,aZ as P,n as I,ag as q,a_ as S,f as b,a6 as M,a3 as j,a8 as _,a$ as x,k as z}from"./vendor.cae3e354.js";import"./index.4a907a91.js";import{u as E}from"./useAxios.7bef570f.js";var[O,A]=u("image"),L=p(y({name:O,props:{src:String,alt:String,fit:String,round:Boolean,width:c,height:c,radius:c,lazyLoad:Boolean,iconSize:c,showError:g,errorIcon:m("photo-fail"),iconPrefix:String,showLoading:g,loadingIcon:m("photo")},emits:["load","error"],setup(e,a){var{emit:r,slots:t}=a,s=w(!1),o=w(!0),i=w(),{$Lazyload:u}=P().proxy,c=I((()=>{var a={width:n(e.width),height:n(e.height)};return l(e.radius)&&(a.overflow="hidden",a.borderRadius=n(e.radius)),a}));q((()=>e.src),(()=>{s.value=!1,o.value=!0}));var g=e=>{o.value=!1,r("load",e)},m=e=>{s.value=!0,o.value=!1,r("error",e)},p=(a,r,t)=>t?t():b(v,{name:a,size:e.iconSize,class:r,classPrefix:e.iconPrefix},null),h=()=>{if(!s.value&&e.src){var a={alt:e.alt,class:A("img"),style:{objectFit:e.fit}};return e.lazyLoad?M(b("img",_({ref:i},a),null),[[j("lazy"),e.src]]):b("img",_({src:e.src,onLoad:g,onError:m},a),null)}},f=e=>{var{el:a}=e;a===i.value&&o.value&&g()},y=e=>{var{el:a}=e;a!==i.value||s.value||m()};return u&&d&&(u.$on("loaded",f),u.$on("error",y),S((()=>{u.$off("loaded",f),u.$off("error",y)}))),()=>b("div",{class:A({round:e.round}),style:c.value},[h(),o.value&&e.showLoading?b("div",{class:A("loading")},[p(e.loadingIcon,A("loading-icon"),t.loading)]):s.value&&e.showError?b("div",{class:A("error")},[p(e.errorIcon,A("error-icon"),t.error)]):void 0,null==t.default?void 0:t.default()])}})),[$,k]=u("skeleton"),B=p(y({name:$,props:{row:h(0),title:Boolean,round:Boolean,avatar:Boolean,loading:g,animate:g,avatarSize:c,titleWidth:c,avatarShape:m("round"),rowWidth:{type:[Number,String,Array],default:"100%"}},setup(e,a){var{slots:r}=a,t=()=>{if(e.avatar)return b("div",{class:k("avatar",e.avatarShape),style:f(e.avatarSize)},null)},s=()=>{if(e.title)return b("h3",{class:k("title"),style:{width:n(e.titleWidth)}},null)},o=a=>{var{rowWidth:r}=e;return"100%"===r&&a===+e.row-1?"60%":Array.isArray(r)?r[a]:r};return()=>e.loading?b("div",{class:k({animate:e.animate,round:e.round})},[t(),b("div",{class:k("content")},[s(),Array(e.row).fill("").map(((e,a)=>b("div",{class:k("row"),style:{width:n(o(a))}},null)))])]):null==r.default?void 0:r.default()}}));const V=(e,a=2)=>{const r=Math.pow(10,a);return Math.round(Number.parseFloat(String(e))*r)/r},W=(e,a=2)=>V(e,a).toFixed(a),F=()=>E([],{url:"https://jsonplaceholder.typicode.com/posts",__needValidation:!1,__transformData:e=>(e||[]).map((e=>{return n=((e,a)=>{for(var r in a||(a={}))s.call(a,r)&&i(e,r,a[r]);if(t)for(var r of t(a))o.call(a,r)&&i(e,r,a[r]);return e})({},e),l={price:V(x(1,500,!0)),thumbnail:"http://via.placeholder.com/240x240",quantity:x(1,10)},a(n,r(l));var n,l})).slice(0,10)}),R=z("cart",(()=>{const{data:e,isPending:a,errorMessage:r,request:t}=F(),{data:s,isPending:o,isSuccessful:i,errorMessage:n,request:l}=(()=>{const{data:e,isPending:a,isSuccessful:r,errorMessage:t,request:s}=E({},{url:"https://jsonplaceholder.typicode.com/posts",method:"post",__needValidation:!1});return{data:e,isPending:a,isSuccessful:r,errorMessage:t,request:e=>s({data:e})}})();q(i,(a=>{a&&(e.value=[...e.value,s.value])}));const{data:d,isPending:u,errorMessage:c,request:g}=(()=>{const{data:e,isPending:a,errorMessage:r,request:t}=E({},{method:"patch",__needValidation:!1});return{data:e,isPending:a,errorMessage:r,request:e=>t({url:`https://jsonplaceholder.typicode.com/posts/${e.id}`,data:{quantity:e.quantity}})}})(),{data:m,isPending:v,errorMessage:p,request:h}=(()=>{const{data:e,isPending:a,isSuccessful:r,errorMessage:t,request:s}=E({},{method:"delete",__needValidation:!1});return{data:e,isPending:a,isSuccessful:r,errorMessage:t,request:e=>s({url:`https://jsonplaceholder.typicode.com/posts/${e.id}`})}})(),f=I((()=>e.value.reduce(((e,a)=>a.quantity+e),0))),y=I((()=>W(e.value.reduce(((e,a)=>a.quantity*a.price+e),0)))),w=I((()=>e.value.filter((e=>e.checked)))),P=I((()=>!!w.value.length)),S=I((()=>w.value.reduce(((e,a)=>a.quantity+e),0))),b=I((()=>W(w.value.reduce(((e,a)=>a.quantity*a.price+e),0))));return{items:e,isItemsLoading:a,itemsLoadingErrorMessage:r,isItemsEmpty:I((()=>!e.value.length)),getItems:t,addedItem:s,isItemAdding:o,itemAddingErrorMessage:n,addItem:l,patchedItem:d,isItemPatching:u,itemPatchingErrorMessage:c,patchItem:g,removedItem:m,isItemRemoving:v,itemRemovingErrorMessage:p,removeItem:h,quantity:f,totalPrice:y,checkedItems:w,hasCheckedItems:P,checkedQuantity:S,checkedTotalPrice:b}}));export{L as I,B as S,R as u};
