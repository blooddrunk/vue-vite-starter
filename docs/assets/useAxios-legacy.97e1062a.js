System.register(["./index-legacy.fa22f2bf.js","./vendor-legacy.a2d7269a.js"],(function(e){"use strict";var a,n,l,u,t,r,s;return{setters:[function(e){a=e.a},function(e){n=e.ax,l=e.l,u=e.n,t=e.L,r=e.aL,s=e.M}],execute:function(){e("u",(function(e,...c){let o={},v={};0===c.length?o={}:1===c.length?["immediate","resetOnRequest","onError"].some((e=>Object.prototype.hasOwnProperty.call(c[0],e)))?v=c[0]:o=c[0]:c.length>1&&(o=c[0],v=c[1]);const{immediate:i=!1,resetOnRequest:d=!1,onSuccess:f,onError:g}=v,m=n(e),y=l(!1),h=l(!1),p=l(!1),q=l(null),O=l(),j=u((()=>h.value&&!q.value)),k=u((()=>{const e=t(q);return r(e)?e:null==e?void 0:e.message}));let x;const S=async n=>{const l=n?s({},t(o),t(n)):t(o);d&&(m.value=e,O.value=void 0),x=a.CancelToken.source(),y.value=!0,h.value=!1,q.value=null;const u=a.request({cancelToken:x.token,...l});try{return O.value=await u,m.value=O.value.data,x=null,y.value=!1,h.value=!0,f&&f(m.value,O.value),m.value}catch(r){console.error(r),q.value=r,y.value=!1,h.value=!0,a.isCancel(r)||(x=null,g&&g(r))}};return i&&S(),{isPending:y,isFinished:h,isSuccessful:j,error:q,errorMessage:k,data:m,response:O,request:S,cancel:e=>{h.value||x&&(x.cancel(e),p.value=!0,y.value=!1,h.value=!1)}}}))}}}));