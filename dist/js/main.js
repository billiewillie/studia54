!function(){"use strict";var e,t={379:function(e,t,n){var o=n(6),r=n(371),i=n(369),l=n(357);r.p8.registerPlugin(l.i);const c=document.querySelectorAll(".main-pic"),a=document.querySelector(".main-text");var s;s=document.querySelector(".main-slider"),r.p8.timeline({scrollTrigger:{trigger:s,toggleActions:"play none none reset"}}).from(s,1,{xPercent:10,autoAlpha:0,delay:-1,ease:i.Lp.out}),function(e){r.p8.timeline({scrollTrigger:{trigger:e,toggleActions:"play none none reset"}}).from(e,1,{xPercent:-10,autoAlpha:0,delay:-1,ease:i.Lp.out})}(a),c.forEach((e=>{let t=e.querySelector("img"),n=r.p8.timeline({scrollTrigger:{trigger:e,toggleActions:"play none none reset"}});n.set(e,{autoAlpha:1}),n.from(e,1.5,{xPercent:-100,ease:i.Lp.out}),n.from(t,1.5,{xPercent:150,scale:1.3,delay:-1.5,ease:i.Lp.out})})),document.querySelector(".button").addEventListener("click",(function(){const e=document.querySelector(".swiper-slide-active"),t=u.find((t=>t.id===e.dataset.id));alert(`Вы выбрали стол ${t.title}, материал ${t.description}`)}));const u=[{id:"table1",color:"#7B4634",title:"Эбен 5",description:"Натуральный шпон"},{id:"table2",color:"#333",title:"KOTO",description:"Натуральный шпон"}],d=window.matchMedia("(min-width: 768px)");let p,f;function g(){return!1===d.matches?(void 0!==p&&p.destroy(!0,!0),void(f=new o.ZP(".main-slider",{modules:[o.W_,o.tl],slidesPerView:1,speed:500,pagination:{el:".swiper-pagination",type:"progressbar"}}))):!0===d.matches?(void 0!==f&&f.destroy(!0,!0),void(p=new o.ZP(".main-slider",{modules:[o.W_,o.tl],slidesPerView:1,speed:700,pagination:{el:".main-options__list",clickable:!0,renderBullet:function(e,t){return`<li class="option ${t}">\n                  <div class="option-pic" style="background-color: ${u[e]?.color}"></div>\n                  <div class="option-about">\n                    <p class="option-about__title">${u[e]?.title}</p>\n                    <p class="option-about__description">${u[e]?.description}</p>\n                  </div>\n                </li>`}}}))):void 0}d.addEventListener("change",g),g()}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.m=t,e=[],o.O=function(t,n,r,i){if(!n){var l=1/0;for(u=0;u<e.length;u++){n=e[u][0],r=e[u][1],i=e[u][2];for(var c=!0,a=0;a<n.length;a++)(!1&i||l>=i)&&Object.keys(o.O).every((function(e){return o.O[e](n[a])}))?n.splice(a--,1):(c=!1,i<l&&(l=i));if(c){e.splice(u--,1);var s=r();void 0!==s&&(t=s)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[n,r,i]},o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={179:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,i,l=n[0],c=n[1],a=n[2],s=0;if(l.some((function(t){return 0!==e[t]}))){for(r in c)o.o(c,r)&&(o.m[r]=c[r]);if(a)var u=a(o)}for(t&&t(n);s<l.length;s++)i=l[s],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(u)},n=self.webpackChunk=self.webpackChunk||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var r=o.O(void 0,[997],(function(){return o(379)}));r=o.O(r)}();