import{d as t,f as e,a8 as s,F as i}from"./vendor.e60456f3.js";import{a4 as a,c as r,t as l,w as n}from"./index.84f5d824.js";var[o,d]=r("cell-group"),f=n(t({name:o,inheritAttrs:!1,props:{title:String,inset:Boolean,border:l},setup(t,r){var{slots:l,attrs:n}=r,o=()=>e("div",s({class:[d({inset:t.inset}),{[a]:t.border&&!t.inset}]},n),[null==l.default?void 0:l.default()]);return()=>t.title||l.title?e(i,null,[e("div",{class:d("title",{inset:t.inset})},[l.title?l.title():t.title]),o()]):o()}}));export{f as C};