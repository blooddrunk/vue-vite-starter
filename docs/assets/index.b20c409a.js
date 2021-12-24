import{b as e,d as a,g as r,s as l,f as t,h as i,F as o,j as n,C as s,c as u,e as d,n as c,m as v,a as g,i as p,k as f,I as m,l as h,p as b,o as y,w as x}from"./index.84f5d824.js";import{C as k,c as w}from"./index.0eef1764.js";import{aU as C,d as M,aV as V,l as F,n as S,aW as B,ag as I,aX as A,aa as T,f as j,a8 as P,g as z}from"./vendor.e60456f3.js";import{u as W}from"./on-popup-reopen.d93741ed.js";function E(e,a){return(!a.required||!function(e){return Array.isArray(e)?!e.length:0!==e&&!e}(e))&&!(a.pattern&&!a.pattern.test(String(e)))}function L(e,r){var{message:l}=r;return a(l)?l(e,r):l||""}function q(e){var{target:a}=e;a.composing=!0}function H(e){var{target:a}=e;a.composing&&(a.composing=!1,a.dispatchEvent(new Event("input")))}function D(e){return[...e].length}var O=0;var[K,U]=u("field"),X=x(M({name:K,props:d({},w,{id:String,name:String,leftIcon:String,rightIcon:String,autofocus:Boolean,clearable:Boolean,maxlength:c,formatter:Function,clearIcon:v("clear"),modelValue:h(""),inputAlign:String,placeholder:String,autocomplete:String,errorMessage:String,clearTrigger:v("focus"),formatTrigger:v("onChange"),error:{type:Boolean,default:null},disabled:{type:Boolean,default:null},readonly:{type:Boolean,default:null}},{rows:c,type:v("text"),rules:Array,autosize:[Boolean,Object],labelWidth:c,labelClass:g,labelAlign:String,showWordLimit:Boolean,errorMessageAlign:String,colon:{type:Boolean,default:null}}),emits:["blur","focus","clear","keypress","click-input","click-left-icon","click-right-icon","update:modelValue"],setup(a,u){var{emit:d,slots:c}=u,v=function(){var e=C(),{name:a="unknown"}=(null==e?void 0:e.type)||{};return a+"-"+ ++O}(),g=V({focused:!1,validateFailed:!1,validateMessage:""}),h=F(),x=F(),{parent:w}=i(o),M=()=>{var e;return String(null!=(e=a.modelValue)?e:"")},K=e=>p(a[e])?a[e]:w&&p(w.props[e])?w.props[e]:void 0,X=S((()=>{var e=K("readonly");if(a.clearable&&!e){var r=""!==M(),l="always"===a.clearTrigger||"focus"===a.clearTrigger&&g.focused;return r&&l}return!1})),G=S((()=>x.value&&c.input?x.value():a.modelValue)),J=a=>a.reduce(((a,r)=>a.then((()=>{if(!g.validateFailed){var{value:a}=G;return r.formatter&&(a=r.formatter(a,r)),E(a,r)?r.validator?function(a,r){return new Promise((l=>{var t=r.validator(a,r);if(e(t))return t.then(l);l(t)}))}(a,r).then((e=>{e&&"string"==typeof e?(g.validateFailed=!0,g.validateMessage=e):!1===e&&(g.validateFailed=!0,g.validateMessage=L(a,r))})):void 0:(g.validateFailed=!0,void(g.validateMessage=L(a,r)))}}))),Promise.resolve()),N=()=>{g.validateFailed&&(g.validateFailed=!1,g.validateMessage="")},Q=function(e){return void 0===e&&(e=a.rules),new Promise((r=>{N(),e?J(e).then((()=>{g.validateFailed?r({name:a.name,message:g.validateMessage}):r()})):r()}))},R=e=>{if(w&&a.rules){var r=w.props.validateTrigger===e,l=a.rules.filter((a=>a.trigger?a.trigger===e:r));l.length&&Q(l)}},Y=function(e,r){if(void 0===r&&(r="onChange"),e=(e=>{var{maxlength:r}=a;if(p(r)&&D(e)>r){var l=M();return l&&D(l)===+r?l:function(e,a){return[...e].slice(0,a).join("")}(e,+r)}return e})(e),"number"===a.type||"digit"===a.type){var l="number"===a.type;e=f(e,l,l)}a.formatter&&r===a.formatTrigger&&(e=a.formatter(e)),h.value&&h.value.value!==e&&(h.value.value=e),e!==a.modelValue&&d("update:modelValue",e)},Z=e=>{e.target.composing||Y(e.target.value)},$=()=>{var e;return null==(e=h.value)?void 0:e.blur()},_=()=>{var e=h.value;"textarea"===a.type&&a.autosize&&e&&function(e,a){var i=r();e.style.height="auto";var o=e.scrollHeight;if(t(a)){var{maxHeight:n,minHeight:s}=a;void 0!==n&&(o=Math.min(o,n)),void 0!==s&&(o=Math.max(o,s))}o&&(e.style.height=o+"px",l(i))}(e,a.autosize)},ee=e=>{g.focused=!0,d("focus",e),A(_),K("readonly")&&$()},ae=e=>{K("readonly")||(g.focused=!1,Y(M(),"onBlur"),d("blur",e),R("onBlur"),A(_),y())},re=e=>d("click-input",e),le=e=>d("click-left-icon",e),te=e=>d("click-right-icon",e),ie=e=>{b(e),d("update:modelValue",""),d("clear",e)},oe=S((()=>"boolean"==typeof a.error?a.error:!!(w&&w.props.showError&&g.validateFailed)||void 0)),ne=S((()=>{var e=K("labelWidth");if(e)return{width:n(e)}})),se=e=>{13===e.keyCode&&(w&&w.props.submitOnEnter||"textarea"===a.type||b(e),"search"===a.type&&$());d("keypress",e)},ue=()=>a.id||v+"-input",de=()=>{var e=U("control",[K("inputAlign"),{error:oe.value,custom:!!c.input,"min-height":"textarea"===a.type&&!a.autosize}]);if(c.input)return j("div",{class:e,onClick:re},[c.input()]);var r,l={id:ue(),ref:h,name:a.name,rows:void 0!==a.rows?+a.rows:void 0,class:e,value:a.modelValue,disabled:K("disabled"),readonly:K("readonly"),autofocus:a.autofocus,placeholder:a.placeholder,autocomplete:a.autocomplete,"aria-labelledby":a.label?v+"-label":void 0,onBlur:ae,onFocus:ee,onInput:Z,onClick:re,onChange:H,onKeypress:se,onCompositionend:H,onCompositionstart:q};return"textarea"===a.type?j("textarea",l,null):j("input",P("number"===(r=a.type)?{type:"text",inputmode:"decimal"}:"digit"===r?{type:"tel",inputmode:"numeric"}:{type:r},l),null)},ce=()=>{var e=c["right-icon"];if(a.rightIcon||e)return j("div",{class:U("right-icon"),onClick:te},[e?e():j(m,{name:a.rightIcon,classPrefix:a.iconPrefix},null)])},ve=()=>{if(a.showWordLimit&&a.maxlength){var e=D(M());return j("div",{class:U("word-limit")},[j("span",{class:U("word-num")},[e]),z("/"),a.maxlength])}},ge=()=>{if(!w||!1!==w.props.showErrorMessage){var e=a.errorMessage||g.validateMessage;if(e){var r=c["error-message"],l=K("errorMessageAlign");return j("div",{class:U("error-message",l)},[r?r({message:e}):e])}}},pe=()=>[j("div",{class:U("body")},[de(),X.value&&j(m,{name:a.clearIcon,class:U("clear"),onTouchstart:ie},null),ce(),c.button&&j("div",{class:U("button")},[c.button()])]),ve(),ge()];return W({blur:$,focus:()=>{var e;return null==(e=h.value)?void 0:e.focus()},validate:Q,formValue:G,resetValidation:N}),B(s,{customValue:x,resetValidation:N,validateWithTrigger:R}),I((()=>a.modelValue),(()=>{Y(M()),N(),R("onChange"),A(_)})),T((()=>{Y(M(),a.formatTrigger),A(_)})),()=>{var e,r=K("disabled"),l=K("labelAlign"),t=(e=K("colon")?":":"",c.label?[c.label(),e]:a.label?j("label",{id:v+"-label",for:ue()},[a.label+e]):void 0),i=(()=>{var e=c["left-icon"];if(a.leftIcon||e)return j("div",{class:U("left-icon"),onClick:le},[e?e():j(m,{name:a.leftIcon,classPrefix:a.iconPrefix},null)])})();return j(k,{size:a.size,icon:a.leftIcon,class:U({error:oe.value,disabled:r,["label-"+l]:l}),center:a.center,border:a.border,isLink:a.isLink,clickable:a.clickable,titleStyle:ne.value,valueClass:U("value"),titleClass:[U("label",[l,{required:a.required}]),a.labelClass],arrowDirection:a.arrowDirection},{icon:i?()=>i:null,title:t?()=>t:null,value:pe,extra:c.extra})}}}));export{X as F};