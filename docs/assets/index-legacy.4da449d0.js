!function(){var e=document.createElement("style");e.innerHTML=".van-checkbox-group--horizontal{display:flex;flex-wrap:wrap}:root{--van-checkbox-size:20px;--van-checkbox-border-color:var(--van-gray-5);--van-checkbox-transition-duration:var(--van-animation-duration-fast);--van-checkbox-label-margin:var(--van-padding-xs);--van-checkbox-label-color:var(--van-text-color);--van-checkbox-checked-icon-color:var(--van-primary-color);--van-checkbox-disabled-icon-color:var(--van-gray-5);--van-checkbox-disabled-label-color:var(--van-text-color-3);--van-checkbox-disabled-background-color:var(--van-border-color)}.van-checkbox{align-items:center;cursor:pointer;display:flex;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.van-checkbox--disabled{cursor:not-allowed}.van-checkbox--label-disabled{cursor:default}.van-checkbox--horizontal{margin-right:var(--van-padding-sm)}.van-checkbox__icon{cursor:pointer;flex:none;font-size:var(--van-checkbox-size);height:1em;line-height:1em}.van-checkbox__icon .van-icon{border:1px solid var(--van-checkbox-border-color);box-sizing:border-box;color:transparent;display:block;font-size:.8em;height:1.25em;line-height:1.25;text-align:center;transition-duration:var(--van-checkbox-transition-duration);transition-property:color,border-color,background-color;width:1.25em}.van-checkbox__icon--round .van-icon{border-radius:100%}.van-checkbox__icon--checked .van-icon{background-color:var(--van-checkbox-checked-icon-color);border-color:var(--van-checkbox-checked-icon-color);color:var(--van-white)}.van-checkbox__icon--disabled{cursor:not-allowed}.van-checkbox__icon--disabled .van-icon{background-color:var(--van-checkbox-disabled-background-color);border-color:var(--van-checkbox-disabled-icon-color)}.van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon{color:var(--van-checkbox-disabled-icon-color)}.van-checkbox__label{color:var(--van-checkbox-label-color);line-height:var(--van-checkbox-size);margin-left:var(--van-checkbox-label-margin)}.van-checkbox__label--left{margin:0 var(--van-checkbox-label-margin) 0 0}.van-checkbox__label--disabled{color:var(--van-checkbox-disabled-label-color)}\n",document.head.appendChild(e),System.register(["./index-legacy.6bf7f23d.js","./function-call-legacy.9bcdf916.js","./vendor-legacy.df9808f5.js"],(function(e){"use strict";var o,a,c,n,l,r,i,d,t,b,s,v,u,h,k,p,x,m,g,f,_,y;return{setters:[function(e){o=e.e,a=e.b,c=e.t,n=e.I,l=e.a,r=e.d,i=e.m,d=e.n,t=e.c,b=e.f,s=e.h,v=e.i,u=e.j,h=e.k,k=e.w},function(e){p=e.u},function(e){x=e.d,m=e.l,g=e.n,f=e.f,_=e.ag,y=e.a8}],execute:function(){var V={name:r,shape:i("round"),disabled:Boolean,iconSize:d,modelValue:r,checkedColor:String,labelPosition:String,labelDisabled:Boolean},z=x({props:o({},V,{bem:a(Function),role:String,parent:Object,checked:Boolean,bindGroup:c}),emits:["click","toggle"],setup(e,o){var{emit:a,slots:c}=o,r=m(),i=o=>{if(e.parent&&e.bindGroup)return e.parent.props[o]},d=g((()=>i("disabled")||e.disabled)),t=g((()=>i("direction"))),b=g((()=>{var o=e.checkedColor||i("checkedColor");if(o&&e.checked&&!d.value)return{borderColor:o,backgroundColor:o}})),s=o=>{var{target:c}=o,n=r.value,l=n===c||(null==n?void 0:n.contains(c));d.value||!l&&e.labelDisabled||a("toggle"),a("click",o)},v=()=>{var{bem:o,shape:a,checked:t}=e,s=e.iconSize||i("iconSize");return f("div",{ref:r,class:o("icon",[a,{disabled:d.value,checked:t}]),style:{fontSize:l(s)}},[c.icon?c.icon({checked:t,disabled:d.value}):f(n,{name:"success",style:b.value},null)])},u=()=>{if(c.default)return f("span",{class:e.bem("label",[e.labelPosition,{disabled:d.value}])},[c.default()])};return()=>{var o="left"===e.labelPosition?[u(),v()]:[v(),u()];return f("div",{role:e.role,class:e.bem([{disabled:d.value,"label-disabled":e.labelDisabled},t.value]),tabindex:d.value?void 0:0,"aria-checked":e.checked,onClick:s},[o])}}}),[S,C]=t("checkbox-group"),w={max:d,disabled:Boolean,iconSize:d,direction:String,modelValue:v(),checkedColor:String},G=Symbol(S);x({name:S,props:w,emits:["change","update:modelValue"],setup(e,o){var{emit:a,slots:c}=o,{children:n,linkChildren:l}=b(G),r=e=>a("update:modelValue",e);return _((()=>e.modelValue),(e=>a("change",e))),p({toggleAll:function(e){void 0===e&&(e={}),"boolean"==typeof e&&(e={checked:e});var{checked:o,skipDisabled:a}=e,c=n.filter((e=>!!e.props.bindGroup&&(e.props.disabled&&a?e.checked.value:null!=o?o:!e.checked.value))).map((e=>e.name));r(c)}}),s((()=>e.modelValue)),l({props:e,updateValue:r}),()=>f("div",{class:C([e.direction])},[null==c.default?void 0:c.default()])}});var[j,B]=t("checkbox"),D=o({},V,{bindGroup:c}),O=x({name:j,props:D,emits:["change","update:modelValue"],setup(e,o){var{emit:a,slots:c}=o,{parent:n}=u(G),l=g((()=>n&&e.bindGroup?-1!==n.props.modelValue.indexOf(e.name):!!e.modelValue)),r=function(o){void 0===o&&(o=!l.value),n&&e.bindGroup?(o=>{var{name:a}=e,{max:c,modelValue:l}=n.props,r=l.slice();if(o)c&&r.length>=c||r.includes(a)||(r.push(a),e.bindGroup&&n.updateValue(r));else{var i=r.indexOf(a);-1!==i&&(r.splice(i,1),e.bindGroup&&n.updateValue(r))}})(o):a("update:modelValue",o)};return _((()=>e.modelValue),(e=>a("change",e))),p({toggle:r,props:e,checked:l}),s((()=>e.modelValue)),()=>f(z,y({bem:B,role:"checkbox",parent:n,checked:l.value,onToggle:r},e),h(c,["default","icon"]))}});e("C",k(O))}}}))}();
