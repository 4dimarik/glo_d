(()=>{"use strict";const e=e=>{const t=e.getAttribute("href").substring(1),r=document.getElementById(t);r&&r.scrollIntoView({behavior:"smooth",block:"start"})};class t{constructor({modalSelector:e,sectionId:t,...r}){this.modal=document.querySelector(e),t&&(this.section=document.getElementById(t)),this.modal&&this.init(r)}init({bodySelector:e,closeBtnSelector:t,modalLinkSelector:r,sectionId:o=null}){this.body=this.modal.querySelector(e),this.modal.addEventListener("click",(e=>{e.preventDefault();const{target:r}=e;r.closest(t)&&this.toggle(!1)})),document.addEventListener("click",(e=>{e.preventDefault();const{target:t}=e;t.closest(r)&&(this.toggle(!0),this.afterOpen(t.closest(r)))}))}afterOpen(){}toggle(e){this.modal.style.visibility=e?"visible":"hidden"}}const r=({body:e,counter:t,activeSlideClass:r,...o})=>{const s={};Object.keys(o).forEach((t=>{s[t]=e.querySelector(o[t])}));const n=s.slider.querySelectorAll(o.slide),l=n.length,{prevSlide:c,currentSlide:a}=s.slider.dataset;c||(s.slider.dataset.prevSlide=null),a||(s.slider.dataset.currentSlide="1"),s.slider.dataset.totalSlide=l.toString();let i={};const d=()=>{const{prevSlide:e,currentSlide:t,totalSlide:r}=s.slider.dataset;i={prev:e?+e:null,current:t?+t:null,total:+r}};d(),n[i.current-1].classList.add(r);const p=()=>{t&&(s.counterTotal.textContent=i.total,s.counterCurrent.textContent=i.current)};p(),s.wrapper.addEventListener("click",(({target:e})=>{if(e.closest(o.nextBtn)){const e=i.current+1;e>i.total?s.slider.dataset.currentSlide="1":s.slider.dataset.currentSlide=e.toString(),s.slider.dataset.prevSlide=i.current.toString()}if(e.closest(o.prevBtn)){const e=i.current-1;s.slider.dataset.currentSlide=e<1?i.total.toString():e.toString(),s.slider.dataset.prevSlide=i.current.toString()}d(),(()=>{const e=i.current-1;if(n[e].classList.add(r),i.prev){const e=i.prev-1;n[e].classList.remove(r)}t&&p()})()}))};class o extends t{constructor(){super({sectionId:"transparency",modalSelector:".popup-transparency",modalLinkSelector:".transparency-item",bodySelector:".popup-dialog-transparency",closeBtnSelector:".close"}),this.initSlider()}afterOpen(e){const t=this.section.querySelectorAll(".transparency-item");this.activatedItemIndex=[...t].findIndex((t=>t===e));const r=document.querySelector(".popup-transparency-slider"),o=document.querySelectorAll(".popup-transparency-slider__slide");r.dataset.prevSlide=r.dataset.currentSlide,r.dataset.currentSlide=`${this.activatedItemIndex+1}`,o[+r.dataset.prevSlide-1].classList.remove("active-slide"),o[+r.dataset.currentSlide-1].classList.add("active-slide")}initSlider(){r({body:this.body,counter:!0,activeSlideClass:"active-slide",wrapper:".popup-transparency-slider-wrap",slider:".popup-transparency-slider",slide:".popup-transparency-slider__slide",prevBtn:".popup-arrow_transparency_left",nextBtn:".popup-arrow_transparency_right",counterCurrent:".slider-counter-content__current",counterTotal:".slider-counter-content__total"})}}new class extends t{constructor(){super({modalSelector:".popup-repair-types",modalLinkSelector:".repair-types-list",bodySelector:".dialog-repair-types",closeBtnSelector:".close"})}},new class extends t{constructor(){super({modalSelector:".popup-privacy",modalLinkSelector:".link-privacy",bodySelector:".popup-dialog-privacy",closeBtnSelector:".close"})}},new class extends t{constructor(){super({modalSelector:".popup-consultation",modalLinkSelector:".button_wide",bodySelector:".feedback-wrap",closeBtnSelector:".close"})}},(()=>{const t=document.querySelector("header");(e=>{const t=e.querySelector(".header-contacts__phone-number-wrap"),r=e.querySelector(".header-contacts__phone-number-accord"),o=r.querySelector(".header-contacts__phone-number");e.addEventListener("click",(e=>{const{target:s}=e;if(s.closest(".header-contacts__arrow")){const{height:e}=getComputedStyle(t),n=r.classList.toggle("active"),{top:l,opacity:c,transform:a}=((e,t)=>e?{top:t,opacity:1,transform:"rotate(180deg)"}:{top:0,opacity:0,transform:"none"})(n,e);s.style.transform=a,r.style.top=l,o.style.opacity=c}}))})(t),(t=>{const r=document.querySelector(".popup-menu"),o=r.querySelector(".popup-dialog-menu"),s=(e="close")=>{let t;"toggle"===e?t=r.classList.toggle("active"):"close"===e&&(r.classList.remove("active"),t=!1);const s=window.outerWidth,{width:n}=getComputedStyle(o);s>=576?o.style.right=t?n:0:o.style.top=t?"100vh":0};t.addEventListener("click",(e=>{const{target:t}=e;t.matches(".menu__icon")&&s("toggle")})),r.addEventListener("click",(t=>{t.preventDefault();const{target:r}=t;r.matches(".close-menu")&&s("close"),r.matches(".menu-link")&&(s("close"),r.closest(".popup-menu-nav__item")&&e(r))}))})(t)})(),(()=>{const e=e=>{const t=new RegExp("[^\\d]+","g");return e.replace(t,"").substring(0,11)};document.addEventListener("input",(t=>{const{target:r}=t;if(r.matches('input[name="phone"]')){const{value:t}=r,o=e(t),s=(e,t)=>o.substring(e,t),n=o.length;n<=4?r.value=`+7 (${s(1,4)}`:n>4&&n<=7?r.value=`+7 (${s(1,4)}) ${s(4,7)}`:n>7&&n<=9?r.value=`+7 (${s(1,4)}) ${s(4,7)}-${s(7,9)}`:n>9&&(r.value=`+7 (${s(1,4)}) ${s(4,7)}-${s(7,9)}-${s(9,11)}`)}})),document.addEventListener("focusin",(t=>{const{target:r}=t;r.matches('input[name="phone"]')&&e(r.value).length<=1&&(r.value="+7 (")})),document.addEventListener("focusout",(t=>{const{target:r}=t;r.matches('input[name="phone"]')&&e(r.value).length<=1&&(r.value="")}))})(),(()=>{const e=document.getElementById("formula"),t=window.outerWidth>1024?e.querySelector(".wrapper_small.tablet-hide"):e.querySelector(".wrapper_small.desktop-hide"),r=(e,t)=>{const r=e.querySelector(".formula-item-popup"),o=parseFloat(getComputedStyle(r).getPropertyValue("height")),s=parseFloat(getComputedStyle(e).getPropertyValue("height")),{top:n}=r.getBoundingClientRect();let l;n>0?(l="top",r.classList.remove("bottom")):(l="bottom",r.classList.add("bottom"));const{opacity:c,visibility:a,transform:i}=((e,t)=>{let r;if("show"===e){if(r={opacity:"1",visibility:"visible"},"bottom"===t){const e=o+s+15;r={...r,transform:`translate3d(0, ${e}px, 0)`}}}else"hide"===e&&(r={opacity:"0.1",visibility:"hidden",transform:"translate3d(0, -5px, 0)"});return r})(t,l);r.style.opacity=c,r.style.visibility=a,r.style.transform=i};t.addEventListener("mouseover",(e=>{const{target:t}=e,o=t.closest(".formula-item__icon");if(o){const e=o.closest(".formula-item");e.style.zIndex="2",r(e,"show")}})),t.addEventListener("mouseout",(e=>{const{target:t}=e,o=t.closest(".formula-item__icon");if(o){const e=o.closest(".formula-item");e.style.zIndex="0",r(e,"hide")}}))})(),(()=>{new o;const e=document.getElementById("transparency");window.innerWidth<1090&&r({body:e,counter:!1,wrapper:".transparency-slider-wrap",slider:".transparency-slider",slide:".transparency-item",prevBtn:"#transparency-arrow_left",nextBtn:"#transparency-arrow_right",activeSlideClass:"transparency-item__active"})})(),document.querySelector(".footer .button-footer").addEventListener("click",(t=>{t.preventDefault();const{target:r}=t;r.closest(".button-footer")&&e(r)}))})();