import{d as e,l as a,n as t,aa as r,aX as n,ag as u,f as l,a8 as o,ae as s,o as i,a as m,w as v,L as p}from"./vendor.e60456f3.js";import{p as d,P as c,a as f}from"./index.13efafc2.js";import"./index.0eef1764.js";import{F as g}from"./index.b20c409a.js";import{A as y}from"./index.ab7f139d.js";import"./index.9bc79dd0.js";import{m as h}from"./customization.51d1af06.js";import{f as x}from"./index.e660712d.js";import{T as D,P as M}from"./function-call.7be5e6a9.js";import{u as j}from"./on-popup-reopen.d93741ed.js";import{e as b,l as w,G as H,c as V,R as k,B as C,m as O,S as P,w as F}from"./index.84f5d824.js";import"./index.e74be4f5.js";import"./useAxios.d5dc9735.js";import"./interceptor.f210eca8.js";var Y=b({},d,{filter:Function,columnsOrder:Array,formatter:{type:Function,default:(e,a)=>a}}),$=Object.keys(d);function I(e,a){for(var t=-1,r=Array(e);++t<e;)r[t]=a(t);return r}var A=(e,a)=>32-new Date(e,a-1,32).getDate(),S=(e,a)=>{var t=["setValues","setIndexes","setColumnIndex","setColumnValue"];return new Proxy(e,{get:(e,r)=>t.includes(r)?function(){e[r](...arguments),a()}:e[r]})},[T]=V("time-picker"),N=e({name:T,props:b({},Y,{minHour:w(0),maxHour:w(23),minMinute:w(0),maxMinute:w(59),modelValue:String}),emits:["confirm","cancel","change","update:modelValue"],setup(e,s){var{emit:i,slots:m}=s,v=a=>{var{minHour:t,maxHour:r,maxMinute:n,minMinute:u}=e;a||(a=k(t)+":"+k(u));var[l,o]=a.split(":");return(l=k(C(+l,+t,+r)))+":"+(o=k(C(+o,+u,+n)))},p=a(),d=a(v(e.modelValue)),f=t((()=>[{type:"hour",range:[+e.minHour,+e.maxHour]},{type:"minute",range:[+e.minMinute,+e.maxMinute]}])),g=t((()=>f.value.map((a=>{var{type:t,range:r}=a,n=I(r[1]-r[0]+1,(e=>k(r[0]+e)));return e.filter&&(n=e.filter(t,n)),{type:t,values:n}})))),y=t((()=>g.value.map((a=>({values:a.values.map((t=>e.formatter(a.type,t)))}))))),h=()=>{var a=d.value.split(":"),t=[e.formatter("hour",a[0]),e.formatter("minute",a[1])];n((()=>{var e;null==(e=p.value)||e.setValues(t)}))},x=()=>{var[e,a]=p.value.getIndexes(),[t,r]=g.value,n=t.values[e]||t.values[0],u=r.values[a]||r.values[0];d.value=v(n+":"+u),h()},D=()=>i("confirm",d.value),M=()=>i("cancel"),b=()=>{x(),n((()=>{n((()=>i("change",d.value)))}))};return r((()=>{h(),n(x)})),u(y,h),u((()=>[e.filter,e.maxHour,e.minMinute,e.maxMinute]),x),u((()=>e.minHour),(()=>{n(x)})),u(d,(e=>i("update:modelValue",e))),u((()=>e.modelValue),(e=>{(e=v(e))!==d.value&&(d.value=e,h())})),j({getPicker:()=>p.value&&S(p.value,x)}),()=>l(c,o({ref:p,columns:y.value,onChange:b,onCancel:M,onConfirm:D},H(e,$)),m)}}),q=(new Date).getFullYear(),[_]=V("date-picker"),z=e({name:_,props:b({},Y,{type:O("datetime"),modelValue:Date,minDate:{type:Date,default:()=>new Date(q-10,0,1),validator:P},maxDate:{type:Date,default:()=>new Date(q+10,11,31),validator:P}}),emits:["confirm","cancel","change","update:modelValue"],setup(e,s){var{emit:i,slots:m}=s,v=a=>{if(P(a)){var t=C(a.getTime(),e.minDate.getTime(),e.maxDate.getTime());return new Date(t)}},p=a(),d=a(v(e.modelValue)),f=(a,t)=>{var r=e[a+"Date"],n=r.getFullYear(),u=1,l=1,o=0,s=0;return"max"===a&&(u=12,l=A(t.getFullYear(),t.getMonth()+1),o=23,s=59),t.getFullYear()===n&&(u=r.getMonth()+1,t.getMonth()+1===u&&(l=r.getDate(),t.getDate()===l&&(o=r.getHours(),t.getHours()===o&&(s=r.getMinutes())))),{[a+"Year"]:n,[a+"Month"]:u,[a+"Date"]:l,[a+"Hour"]:o,[a+"Minute"]:s}},g=t((()=>{var{maxYear:a,maxDate:t,maxMonth:r,maxHour:n,maxMinute:u}=f("max",d.value||e.minDate),{minYear:l,minDate:o,minMonth:s,minHour:i,minMinute:m}=f("min",d.value||e.minDate),v=[{type:"year",range:[l,a]},{type:"month",range:[s,r]},{type:"day",range:[o,t]},{type:"hour",range:[i,n]},{type:"minute",range:[m,u]}];switch(e.type){case"date":v=v.slice(0,3);break;case"year-month":v=v.slice(0,2);break;case"month-day":v=v.slice(1,3);break;case"datehour":v=v.slice(0,4)}if(e.columnsOrder){var p=e.columnsOrder.concat(v.map((e=>e.type)));v.sort(((e,a)=>p.indexOf(e.type)-p.indexOf(a.type)))}return v})),y=t((()=>g.value.map((a=>{var{type:t,range:r}=a,n=I(r[1]-r[0]+1,(e=>k(r[0]+e)));return e.filter&&(n=e.filter(t,n)),{type:t,values:n}})))),h=t((()=>y.value.map((a=>({values:a.values.map((t=>e.formatter(a.type,t)))}))))),x=()=>{var a=d.value||e.minDate,{formatter:t}=e,r=y.value.map((e=>{switch(e.type){case"year":return t("year",""+a.getFullYear());case"month":return t("month",k(a.getMonth()+1));case"day":return t("day",k(a.getDate()));case"hour":return t("hour",k(a.getHours()));case"minute":return t("minute",k(a.getMinutes()));default:return""}}));n((()=>{var e;null==(e=p.value)||e.setValues(r)}))},D=()=>{var a,t,r,{type:n}=e,u=p.value.getIndexes(),l=e=>{var a=0;y.value.forEach(((t,r)=>{e===t.type&&(a=r)}));var{values:t}=y.value[a];return function(e){if(!e)return 0;for(;Number.isNaN(parseInt(e,10));){if(!(e.length>1))return 0;e=e.slice(1)}return parseInt(e,10)}(t[u[a]])};"month-day"===n?(a=(d.value||e.minDate).getFullYear(),t=l("month"),r=l("day")):(a=l("year"),t=l("month"),r="year-month"===n?1:l("day"));var o=A(a,t);r=r>o?o:r;var s=0,i=0;"datehour"===n&&(s=l("hour")),"datetime"===n&&(s=l("hour"),i=l("minute"));var m=new Date(a,t-1,r,s,i);d.value=v(m)},M=()=>{i("update:modelValue",d.value),i("confirm",d.value)},b=()=>i("cancel"),w=()=>{D(),n((()=>{n((()=>i("change",d.value)))}))};return r((()=>{x(),n(D)})),u(h,x),u(d,((e,a)=>i("update:modelValue",a?e:null))),u((()=>[e.filter,e.maxDate]),D),u((()=>e.minDate),(()=>{n(D)})),u((()=>e.modelValue),(e=>{var a;(e=v(e))&&e.valueOf()!==(null==(a=d.value)?void 0:a.valueOf())&&(d.value=e)})),j({getPicker:()=>p.value&&S(p.value,D)}),()=>l(c,o({ref:p,columns:h.value,onChange:w,onCancel:b,onConfirm:M},H(e,$)),m)}}),[B,E]=V("datetime-picker"),G=Object.keys(N.props),L=Object.keys(z.props),R=F(e({name:B,props:b({},N.props,z.props,{modelValue:[String,Date]}),setup(e,t){var{attrs:r,slots:n}=t,u=a();return j({getPicker:()=>{var e;return null==(e=u.value)?void 0:e.getPicker()}}),()=>{var a="time"===e.type,t=a?N:z,s=H(e,a?G:L);return l(t,o({ref:u,class:E()},s,r),n)}}})),U={};const X={class:"tw-article"},J=e({setup(e){const r=s(),n=(e,a)=>"name"===e&&a&&a.length>10?"姓名不能超过10个字符":"",u=a(),d=t((()=>u.value?x(u.value,"yyyy-MM-dd HH:mm:ss"):"")),c=[{required:!0,message:"请选择上门时间"}],j=a(!1),b={minDate:new Date,formatter:(e,a)=>"year"===e?`${a}年`:"month"===e?`${a}月`:"day"===e?`${a}日`:"hour"===e?`${a}时`:a},w=e=>{u.value=e,j.value=!1},{isPending:H,request:V}=h((()=>{D.success({message:"预约成功!",onClose:()=>{r.push("/mobile/user")}})}),(e=>{D(e.message)})),k=e=>{const a={contactPerson:e.name,servicePhone:e.tel,address:`${e.province} ${e.country} ${e.county} ${e.addressDetail}`};V(a)};return(e,a)=>{const t=g,r=y,u=R,s=M;return i(),m("div",X,[l(r,{"area-list":p(f),"area-columns-placeholder":["请选择","请选择","请选择"],"save-button-text":"确认提交","detail-maxlength":"50",validator:n,"is-saving":p(H),onSave:k},{default:v((()=>[l(t,{"model-value":p(d),readonly:"","is-link":"",placeholder:"上门时间",label:"上门时间",rules:c,onClick:a[0]||(a[0]=e=>j.value=!0)},null,8,["model-value"])])),_:1},8,["area-list","is-saving"]),l(s,{show:j.value,"onUpdate:show":a[2]||(a[2]=e=>j.value=e),position:"bottom","close-on-popstate":""},{default:v((()=>[l(u,o({type:"datehour"},b,{onConfirm:w,onCancel:a[1]||(a[1]=e=>j.value=!1)}),null,16)])),_:1},8,["show"])])}}});"function"==typeof U&&U(J);export{J as default};