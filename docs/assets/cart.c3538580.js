import{_ as e}from"./PageFooter.c2f40ea0.js";import{d as a,a9 as s,n as t,l as o,ag as i,r,o as d,a as m,L as l,f as c,c as n,w as p,e as u,t as f,g as j}from"./vendor.e60456f3.js";import{C as v}from"./index.7e4216b6.js";import{_ as b}from"./CartList.a332858b.js";import{E as g}from"./index.ad89b4c6.js";import{u as x}from"./index.aa52fcaa.js";import{B as k}from"./index.e74be4f5.js";import"./index.a9a156c1.js";import"./index.84f5d824.js";import"./on-popup-reopen.d93741ed.js";import"./CartItem.6d9b22ca.js";import"./index.aa76e96d.js";import"./function-call.7be5e6a9.js";import"./interceptor.f210eca8.js";import"./index.9bc79dd0.js";import"./useAxios.d5dc9735.js";import"./math.c4a34419.js";var h={};const w={class:"tw-article tw-article_has-footer"},y={key:0},_={key:1},C=j(" 全选 "),I={class:"tw-ml-3"},E=j(" 合计： ￥ "),L={class:"tw-font-semibold"},V=a({setup(a){const h=x(),{items:V,isItemsLoading:P,isItemsEmpty:z,itemsLoadingErrorMessage:A}=s(h),B=t((()=>!!A.value)),F=t((()=>z.value&&P.value)),M=t((()=>z.value&&!P.value));h.getItems();const Q=o(!1);return i(Q,(()=>{h.$patch((e=>{e.items.forEach((e=>e.checked=Q.value))}))})),(a,s)=>{const t=g,o=b,i=v,x=k,P=r("router-link"),z=e;return d(),m("article",w,[l(B)?(d(),m("div",y,[c(t,{image:"error",description:"出错了"})])):l(M)?(d(),m("div",_,[c(t,{description:"购物车为空"})])):(d(),n(o,{key:2,items:l(V),loading:l(F)},null,8,["items","loading"])),c(z,{class:"tw-bottom-[50px]"},{default:p((()=>[c(i,{modelValue:Q.value,"onUpdate:modelValue":s[0]||(s[0]=e=>Q.value=e),"icon-size":"18px"},{default:p((()=>[C])),_:1},8,["modelValue"]),u("span",I,[E,u("strong",L,f(l(h).checkedTotalPrice),1)]),c(P,{custom:"",to:"/mobile/order"},{default:p((({navigate:e})=>[c(x,{class:"!tw-ml-auto tw-min-w-28",type:"primary",round:"",disabled:!l(h).hasCheckedItems,onClick:e},{default:p((()=>[j(" 去结算("+f(l(h).checkedQuantity)+") ",1)])),_:2},1032,["disabled","onClick"])])),_:1})])),_:1})])}}});"function"==typeof h&&h(V);export{V as default};