System.register(["./vendor-legacy.a2d7269a.js","./index-legacy.e2527bd7.js"],(function(e){"use strict";var t,n,a,s,i,o,r,l,d,u,p,c,m;return{setters:[function(e){t=e.n,n=e.M,a=e.l,s=e.d,i=e.r,o=e.o,r=e.c,l=e.a8,d=e.L,u=e.a,p=e.f},function(e){c=e.n,m=e._}],execute:function(){const y=(e,s)=>{const i="pie"===s?(e=>t((()=>({dataset:{sourceHeader:!1,dimensions:e.dimensions,source:e.data},series:{type:"pie",label:{alignTo:"edge",edgeDistance:"10%"}},tooltip:{confine:!0}}))))(e):(e=>{const n=t((()=>e.dimensions.length-1)),a=t((()=>Array(n.value).fill({type:e.type})));return t((()=>{var t,n;return{dataset:{sourceHeader:!1,dimensions:e.dimensions,source:e.data},xAxis:{type:"category"},yAxis:{},series:null!==(t=null===(n=e.option)||void 0===n?void 0:n.series)&&void 0!==t?t:a.value,tooltip:{trigger:"axis",confine:!0}}}))})(e);return{mergedOption:t((()=>n({},i.value,e.option))),chartRef:a(null)}},h=s({props:{autoResize:{type:Boolean,default:!0},dimensions:null,data:null,loading:{type:Boolean,default:!1},option:null,theme:{default:"primary"},type:null},setup(e){const t=e,{chartRef:n,mergedOption:a}=y(t,t.type);return(t,s)=>{const u=i("ECharts");return o(),r(u,l({ref_key:"chartRef",ref:n,autoresize:e.autoResize,theme:e.theme,option:d(a)},t.$attrs),null,16,["autoresize","theme","option"])}}}),g={class:"tw-aspect-w-3 tw-aspect-h-1"},f=s({setup(e){const t=()=>Math.round(300+700*Math.random())/10,n=a(["Matcha Latte","Milk Tea","Cheese Cocoa","Walnut Brownie"].map((e=>({product:e,2015:t(),"2015Tooltip":`${t()}!`,2016:t(),"2016_Percentage":`${t()}%`,2017:t()})))),s={legend:{},series:{radius:["20%","40%"],encode:{itemName:"product",value:"2015"}}};return(e,t)=>{const a=h;return o(),u("div",g,[p(a,{data:n.value,option:s,type:"pie"},null,8,["data"])])}}}),v={class:"tw-aspect-w-4 tw-aspect-h-1"},w=s({setup(e){const t=()=>Math.round(300+700*Math.random())/10,{dimensions:n,series:s}=c(["product",{name:"2015",displayName:"2015年",displayDimension:"2015Tooltip",seriesConfig:{type:"bar"}},{name:"2016",displayName:"二零一六",isPercentage:!0,seriesConfig:{type:"bar"}},{name:"2017",seriesConfig:{type:"line",yAxisIndex:1}}]),i=a(["Matcha Latte","Milk Tea","Cheese Cocoa","Walnut Brownie"].map((e=>({product:e,2015:t(),"2015Tooltip":`${t()}!`,2016:t(),"2016_Percentage":`${t()}%`,2017:t()})))),r={series:s,legend:{},yAxis:[{},{}]};return(e,t)=>{const a=h;return o(),u("div",v,[p(a,{dimensions:d(n),data:i.value,option:r},null,8,["dimensions","data"])])}}}),M={class:"tw-aspect-w-4 tw-aspect-h-1"},C=s({setup(e){const t=()=>Math.round(300+700*Math.random())/10,{dimensions:n,series:s}=c(["product",{name:"2015",displayName:"2015年",displayDimension:"2015Tooltip"},{name:"2016",displayName:"二零一六",isPercentage:!0},"2017"],"line"),i=a(["Matcha Latte","Milk Tea","Cheese Cocoa","Walnut Brownie"].map((e=>({product:e,2015:t(),"2015Tooltip":`${t()}!`,2016:t(),"2016_Percentage":`${t()}%`,2017:t()})))),r={series:s,legend:{}};return(e,t)=>{const a=h;return o(),u("div",M,[p(a,{dimensions:d(n),data:i.value,option:r,type:"line"},null,8,["dimensions","data"])])}}}),T={class:"tw-aspect-w-4 tw-aspect-h-1"},x=s({setup(e){const t=()=>Math.round(300+700*Math.random())/10,{dimensions:n,series:s}=c(["product",{name:"2015",displayName:"2015年",displayDimension:"2015Tooltip"},{name:"2016",displayName:"二零一六",isPercentage:!0},"2017"],"bar"),i=a(["Matcha Latte","Milk Tea","Cheese Cocoa","Walnut Brownie"].map((e=>({product:e,2015:t(),"2015Tooltip":`${t()}!`,2016:t(),"2016_Percentage":`${t()}%`,2017:t()})))),r={series:s,legend:{}};return(e,t)=>{const a=h;return o(),u("div",T,[p(a,{dimensions:d(n),data:i.value,option:r,type:"bar"},null,8,["dimensions","data"])])}}});var $={};const N={},P={class:"tw-w-full"};"function"==typeof $&&$(N),e("default",m(N,[["render",function(e,t){const n=x,a=C,s=w,i=f;return o(),u("div",P,[p(n),p(a),p(s),p(i)])}]]))}}}));
