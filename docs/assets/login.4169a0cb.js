var e=Object.defineProperty,a=Object.defineProperties,l=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,n=(a,l,t)=>l in a?e(a,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[l]=t;import{i as s,u as i,e as c,g as u,c as d,n as p,m as v,a as m,w as b,b as f,B as y,r as w,I as x}from"./index.d5c17d61.js";import{d as g,n as h,f as _,l as S,aT as k,ab as B,o as C,a as P,e as j,L as z,a4 as $,aU as A,aq as O,a7 as T,a6 as V,aV as q,aW as E,t as F,g as L,p as D,aX as I,ac as M,aY as U,r as W,w as X}from"./vendor.69be2e31.js";import{u as Y}from"./useFormField.813591f3.js";import{_ as G}from"./index.28ecbabf.js";s();i();var[H,J]=d("loading"),K=Array(12).fill(null).map(((e,a)=>_("i",{class:J("line",String(a+1))},null))),N=_("svg",{class:J("circular"),viewBox:"25 25 50 50"},[_("circle",{cx:"50",cy:"50",r:"20",fill:"none"},null)]),Q=b(g({name:H,props:{size:p,type:v("circular"),color:String,vertical:Boolean,textSize:p,textColor:String},setup(e,a){var{slots:l}=a,t=h((()=>c({color:e.color},u(e.size)))),o=()=>{var a;if(l.default)return _("span",{class:J("text"),style:{fontSize:m(e.textSize),color:null!=(a=e.textColor)?a:e.color}},[l.default()])};return()=>{var{type:a,vertical:l}=e;return _("div",{class:J([a,{vertical:l}])},[_("span",{class:J("spinner",a),style:t.value},["spinner"===a?K:N]),o()])}}})),[R,Z]=d("button"),ee=b(g({name:R,props:c({},w,{tag:v("button"),text:String,icon:String,type:v("default"),size:v("normal"),color:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,hairline:Boolean,disabled:Boolean,iconPrefix:String,nativeType:v("button"),loadingSize:p,loadingText:String,loadingType:String,iconPosition:v("left")}),emits:["click"],setup(e,a){var{emit:l,slots:t}=a,o=f(),r=()=>e.loading?t.loading?t.loading():_(Q,{size:e.loadingSize,type:e.loadingType,class:Z("loading")},null):t.icon?_("div",{class:Z("icon")},[t.icon()]):e.icon?_(x,{name:e.icon,class:Z("icon"),classPrefix:e.iconPrefix},null):void 0,n=()=>{var a;if(a=e.loading?e.loadingText:t.default?t.default():e.text)return _("span",{class:Z("text")},[a])},s=()=>{var{color:a,plain:l}=e;if(a){var t={color:l?a:"white"};return l||(t.background=a),a.includes("gradient")?t.border=0:t.borderColor=a,t}},i=a=>{e.loading?function(e,a){("boolean"!=typeof e.cancelable||e.cancelable)&&e.preventDefault(),a&&(e=>{e.stopPropagation()})(e)}(a):e.disabled||(l("click",a),o())};return()=>{var{tag:a,type:l,size:t,block:o,round:c,plain:u,square:d,loading:p,disabled:v,hairline:m,nativeType:b,iconPosition:f}=e,w=[Z([l,t,{plain:u,block:o,round:c,square:d,loading:p,disabled:v,hairline:m}]),{[y]:m}];return _(a,{type:b,class:w,style:s(),disabled:v,onClick:i},{default:()=>[_("div",{class:Z("content")},["left"===f&&r(),n(),"right"===f&&r()])]})}}}));var ae={input:"_input_rxpxd_2",control:"_control_rxpxd_5",controlActive:"_controlActive_rxpxd_29",labelActive:"_labelActive_rxpxd_42"};const le=["for"],te=["id","type","placeholder"],oe={key:1,class:"tw-ml-auto tw-pl-1 tw-flex-shrink-0"},re={key:0,class:"tw-absolute tw-top-full tw-left-0"},ne={class:"tw-px-2 tw-text-xs tw-text-red-500 tw-font-medium tw-leading-none"},se=g({inheritAttrs:!1}),ie=g((ce=((e,a)=>{for(var l in a||(a={}))o.call(a,l)&&n(e,l,a[l]);if(t)for(var l of t(a))r.call(a,l)&&n(e,l,a[l]);return e})({},se),ue={props:{name:null,label:{default:""},showLabel:{type:Boolean,default:!1},type:{default:"text"},inputmode:{default:"text"},modelValue:{default:""},placeholder:{default:""},showValidationError:{type:Boolean,default:!0}},emits:["focus","blur","change","update:modelValue"],setup(e,{emit:a}){const l=e,t=S(null),o=k(),r=h((()=>!(!o.label&&!l.label))),{listeners:n,errorMessage:s,value:i,meta:c}=Y({name:l.name,label:l.label}),u=S(!1),d=()=>{u.value=!0,a("focus")},p=e=>{n.value.onBlur(e),u.value=!1,a("blur")};B((()=>{a("change",i.value)}));const v=h((()=>u.value||c.dirty&&i.value||l.placeholder));return(a,l)=>(C(),P("div",{class:$([a.$style.input,e.showValidationError&&"tw-relative tw-mb-4"])},[j("div",{class:$({[a.$style.control]:!0,[a.$style.controlActive]:u.value})},[e.showLabel&&z(r)?(C(),P("label",{key:0,class:$({[a.$style.labelActive]:z(v)}),for:e.name,onClick:l[0]||(l[0]=e=>t.value.focus()),onTouchstart:l[1]||(l[1]=A((e=>t.value.focus()),["stop"]))},[O(a.$slots,"label",{},(()=>[j("span",null,F(e.label),1)]))],42,le)):T("",!0),V(j("input",{id:e.name,ref_key:"input",ref:t,"onUpdate:modelValue":l[2]||(l[2]=e=>E(i)?i.value=e:null),type:e.type,placeholder:e.placeholder,onFocus:d,onBlur:p},null,40,te),[[q,z(i)]]),a.$slots.append?(C(),P("div",oe,[O(a.$slots,"append")])):T("",!0)],2),e.showValidationError&&z(s)?(C(),P("p",re,[j("span",ne,[O(a.$slots,"error",{error:z(s)},(()=>[L(F(z(s)),1)]))])])):T("",!0)],2))}},a(ce,l(ue))));var ce,ue;const de={};de.$style=ae;var pe=G(ie,[["__cssModules",de]]);var ve={};const me={class:"tw-flex tw-flex-col tw-h-screen tw-pt-[15vh] tw-px-8"},be=j("header",null,[j("h3",{class:"tw-py-3 tw-text-2xl tw-font-bold"},"手机快捷登录"),j("p",{class:"tw-text-sm tw-text-light"},"未注册过的手机号将自动创建账号")],-1),fe=["onClick"],ye={class:"tw-mt-16 tw-text-center"},we=L("登录"),xe={class:"tw-text-center"},ge=L(" 登录即代表同意 "),he=L("《用户协议》"),_e=L(" 和 "),Se=L("《隐私政策》"),ke=g({setup(e){const{values:a,validateField:l,meta:t,isSubmitting:o,handleSubmit:r}=M({validationSchema:{mobile:"required|mobile",authCode:"required|numeric|max:6"},initialValues:{mobile:"",authCode:""}}),n=S(10),{isActive:s,pause:i,resume:c}=U((()=>{n.value--,n.value<=0&&i()}),1e3,{immediate:!1,immediateCallback:!0}),u=h((()=>s.value?`${n.value}s后重新获取`:"获取验证码")),d=async()=>{const{valid:e}=await l("mobile");e&&(s.value||(n.value=10,await(async e=>(console.log(e),await D(1e3),I(1e3)))(a.mobile),c()))};return h((()=>!t.value.valid&&t.value.dirty)),(e,a)=>{const l=pe,t=ee,o=W("router-link");return C(),P("article",me,[be,j("form",{class:"tw-mt-12",onSubmit:a[0]||(a[0]=A((()=>{}),["prevent"]))},[_(l,{name:"mobile",label:"手机号",inputmode:"text",placeholder:"请输入手机号"}),_(l,{name:"authCode",label:"验证码",inputmode:"text",placeholder:"请输入验证码"},{append:X((()=>[j("a",{class:$(z(s)?"tw-text-slate-400/75":"tw-text-primary"),onClick:A(d,["prevent"])},F(z(u)),11,fe)])),_:1}),j("div",ye,[_(t,{class:"tw-w-11/12",type:"primary",round:""},{default:X((()=>[we])),_:1})])],32),j("footer",xe,[j("p",null,[ge,_(o,{to:"/mobile/user-agreement"},{default:X((()=>[he])),_:1}),_e,_(o,{to:"/mobile/privacy-policy"},{default:X((()=>[Se])),_:1})])])])}}});"function"==typeof ve&&ve(ke);export{ke as default};
