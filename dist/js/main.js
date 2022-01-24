(()=>{"use strict";const e=e=>{const t=e.getAttribute("href").substring(1),s=document.getElementById(t);s&&s.scrollIntoView({behavior:"smooth",block:"start"})};class t{constructor({modalSelector:e,sectionId:t,...s}){this.modalSelector=e,this.modal=document.querySelector(e),t&&(this.section=document.getElementById(t)),this.modal&&this.init(s)}init({bodySelector:e,closeBtnSelector:t,modalLinkSelector:s}){this.body=this.modal.querySelector(e),this.modal.addEventListener("click",(e=>{const{target:s}=e;s.closest(t)&&(this.toggle(!1),this.afterClose())})),document.addEventListener("click",(e=>{const{target:t}=e;t.closest(s)&&(this.toggle(!0),this.afterOpen(t.closest(s))),t.matches(this.modalSelector)&&(this.toggle(!1),this.afterClose())}))}afterOpen(){}afterClose(){}toggle(e){this.modal.style.visibility=e?"visible":"hidden"}}class s{constructor({tabPanelSelector:e,tabPanelItemSelectors:t}){this.tabPanelSelector=e,this.tabPanelItemSelectors=t,this.init()}init(){this.tabPanel=document.querySelector(this.tabPanelSelector),this.navItems=this.tabPanel.querySelectorAll(this.tabPanelItemSelectors.navItemSelector),this.tabItems=this.tabPanel.querySelectorAll(this.tabPanelItemSelectors.tabItemSelector),this.tabItems.forEach(((e,t)=>{t>0&&(e.classList.add("d-none"),e.dataset.tabIndex=t)})),this.navItems.forEach(((e,t)=>{e.dataset.tabIndex=t})),this.setEvents()}setEvents(){this.tabPanel.addEventListener("click",(e=>{const{target:t}=e,s=t.closest(this.tabPanelItemSelectors.navItemSelector);s&&(this.navItems.forEach(((e,t)=>{e===s?(e.classList.add("active"),this.tabItems[t].classList.remove("d-none")):(e.classList.remove("active"),this.tabItems[t].classList.add("d-none"))})),this.afterChoose(t.dataset.tabIndex))}))}afterChoose(){}}class r extends s{constructor(){super({tabPanelSelector:".popup-dialog-repair-types",tabPanelItemSelectors:{navSelector:".nav-list-popup-repair",navItemSelector:".popup-repair-types-nav__item",tabItemSelector:".popup-repair-types-content-table > table"}}),this.tabItems.forEach((e=>{e.querySelector("tbody").innerHTML=""})),this.renderTab(0)}afterChoose(e){this.renderTab(e)}renderTab(e){const t=this.tabPanel.querySelector("#switch-inner"),s=this.navItems[e].textContent;t.textContent=s,repairTypeService.getRepairType().then((t=>{if(t.ok){const r=t.data.filter((e=>e.type===s));this.renderTableRow(r,e)}}))}renderTableRow(e,t){const s=this.tabItems[t].querySelector("tbody");s.innerHTML="",e.forEach((e=>{s.insertAdjacentHTML("beforeend",this.getTableRow(e))}))}getTableRow(e){return`<tr class="mobile-row">\n  <td class="repair-types-name">${e.name}</td>\n  <td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>\n  <td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>\n  <td class="repair-types-value">${"m2"===e.units?"м<sup>2</sup>":e.units}</td>\n  <td class="repair-types-value">${e.cost} руб.</td>\n</tr>`}}class i extends t{constructor(){super({modalSelector:".popup-thank",bodySelector:".feedback-wrap",closeBtnSelector:".close"})}afterOpen(){}}const o=async({url:e,method:t,data:s})=>{try{const r={GET:{method:"GET"},POST:{method:"POST",body:JSON.stringify(s),headers:{"Content-Type":"application/json"}}},i=await fetch(e,{...r[t]});if(!i.ok)throw i;return{ok:!0,data:await i.json()}}catch(e){const t=`status: ${e.status}${e.statusText?`, statusText: ${e.statusText}`:""}`;return console.error(t),{ok:!1}}};class a{constructor({wrapper:e,slider:t,activeClass:s="x-active",slidesPerView:r=1,startOrder:i=null,duration:o="0",navigation:a,counters:l,dots:n,loop:c=!0,slideMinWidth:d=null}){e?(this.activated=!1,this.activeClass=s,this.slidesPerView=r,this.duration=o,this.slideMinWidth=d,this.wrapper={selector:e,el:document.querySelector(e)},t?this.slider={selector:t,el:this.wrapper.el.querySelector(t)}:console.error(`Некорректно указан селектор slider: ${t}`),a?this.navigation={next:{selector:a.next,el:this.wrapper.el.querySelector(a.next)},prev:{selector:a.prev,el:this.wrapper.el.querySelector(a.prev)}}:console.error(`Некорректно указан селектор navigation: ${a}`),l&&(this.counters={current:{selector:l.current,el:this.wrapper.el.querySelector(l.current)},total:{selector:l.total,el:this.wrapper.el.querySelector(l.total)}}),n&&(this.dots={block:{selector:n.blockSelector,el:document.querySelector(n.blockSelector)},class:n.class,activeClass:n.activeClass},this.dots.array=this.dots.block.el.querySelectorAll(":scope > *")),this.loop=c,this.sliderWrapper={class:"xSlider__slider-wrapper",el:null},this.sliderHTML=this.slider.el.innerHTML,this.wrapper.el.addEventListener("click",this.eventListener.bind(this)),this?.dots?.block.el.addEventListener("click",this.dotsEventListener.bind(this))):console.error(`Некорректно указан селектор wrapper: ${e}`)}init(e){return this.activated||(this.activated=!0,this.wrapper.el.classList.add("xSlider"),this.slider.el.classList.add("xSlider__slider"),this.navigation.prev.el.classList.add("xSlider__btn"),this.navigation.next.el.classList.add("xSlider__btn"),this?.dots?.block.el.classList.add("d-flex"),this.slider.el.innerHTML=`<div class='${this.sliderWrapper.class}'>${this.sliderHTML}</div>`,this.sliderWrapper.el=this.wrapper.el.querySelector(`.${this.sliderWrapper.class}`),this.slides=this.sliderWrapper.el.querySelectorAll(":scope > *"),this.props={},this.props.count=this.slides.length,this.props.lastIndex=this.props.count-1,this.props.currentIndex=0,this.props.translateX=this.slideMinWidth||this.wrapper.el.offsetWidth/this.slidesPerView,this.props.startMove=this.slidesPerView>1?this.slidesPerView-1:this.slidesPerView,this.renderSlide(),this.loop?(this.moveSlide(this.props.startMove),this.props.activeSlide=this.slidesPerView):(this.sliderWrapper.el.style.cssText="transition-duration: 0ms; transform: translateX(0px);",this.props.currentTranslateX="0",this.props.activeSlide=0),this.getSlide(this.props.activeSlide).classList.add(this.activeClass),this.counters&&(this.counters.total.el.textContent=this.props.count)),this}renderSlide(){if(this.slides.forEach(((e,t)=>{e.dataset.slideIndex=t,e.style.minWidth=this.slideMinWidth?`${this.slideMinWidth}px`:`${Math.abs(this.props.translateX)}px`})),this.loop)for(let e=0;e<this.slidesPerView;e++)this.sliderWrapper.el.append(this.slides[e].cloneNode(!0)),this.sliderWrapper.el.prepend(this.slides[this.props.lastIndex-e].cloneNode(!0));const e=this.sliderWrapper.el.querySelectorAll(":scope > *"),t=e.length;this.loop&&[...e].forEach(((e,s)=>{s===this.slidesPerView-this.props.startMove&&e.classList.add("slide-prevMove"),s===t-this.props.startMove&&e.classList.add("slide-nextMove")}))}eventListener({target:e}){const t=this.navigation.next.el,s=this.navigation.prev.el;e.closest(this.navigation.next.selector)?(this.loop||this.props.currentIndex+this.slidesPerView!==this.props.lastIndex||(t.classList.add("d-none"),s.classList.remove("d-none"),s.classList.add("d-flex")),this.changeSlide(1)):e.closest(this.navigation.prev.selector)&&(this.loop||this.props.currentTranslateX+this.props.translateX!==0||(s.classList.add("d-none"),t.classList.remove("d-none"),t.classList.add("d-flex")),this.changeSlide(-1))}toggleBtn(e){e.classList.toggle("d-none")}dotsEventListener({target:e}){if(e.classList.contains(this.dots.class)){if(!this.loop&&this.props.lastIndex===this.props.currentIndex)return;this.changeSlide(0,[...this.dots.array].indexOf(e))}}moveSlide(e){const t=-1*this.props.translateX*e;this.sliderWrapper.el.style.cssText=`transition-duration: 0ms; transform: translateX(${t}px);`,this.props.currentTranslateX=t}getSlide(e){return this.sliderWrapper.el.querySelectorAll(":scope > *")[e]}changeSlide(e,t=null){const s=this.getSlide(this.props.activeSlide);if(s.classList.remove(this.activeClass),this?.dots?.array[this.props.currentIndex].classList.remove(this.dots.activeClass),e<0){s.classList.contains("slide-prevMove")&&(this.moveSlide(this.props.count),this.props.activeSlide=this.props.count+(this.props.startMove-1));let e=this.props.currentTranslateX+this.props.translateX;setTimeout((()=>{this.sliderWrapper.el.style.cssText=`transition-duration: ${this.duration}ms; transform: translateX(${e}px);`}),0),this.props.currentTranslateX=e,this.props.currentIndex=this.props.currentIndex-1<0?this.props.lastIndex:this.props.currentIndex-1,(this.loop||0!==this.props.activeSlide)&&(this.props.activeSlide-=1)}if(e>0){s.classList.contains("slide-nextMove")&&(this.moveSlide(this.slidesPerView),this.props.activeSlide=this.slidesPerView>1?this.slidesPerView+1:this.slidesPerView);let e=this.props.currentTranslateX-this.props.translateX;setTimeout((()=>{this.sliderWrapper.el.style.cssText=`transition-duration: ${this.duration}ms; transform: translateX(${e}px);`}),0),this.props.currentTranslateX=e,this.props.currentIndex=this.props.currentIndex+1>this.props.lastIndex?0:this.props.currentIndex+1,(this.loop||this.props.activeSlide!==this.props.lastIndex)&&(this.props.activeSlide+=1)}0===e&&(this.moveSlide(t+1),this.props.currentIndex=t,this.props.activeSlide=t+1),this.getSlide(this.props.activeSlide).classList.add(this.activeClass),this?.dots?.array[this.props.currentIndex].classList.add(this.dots.activeClass),this.counters&&(this.counters.current.el.textContent=this.props.currentIndex+1)}activate(){return this.activated=!0,console.log(this),this}destroy(){return this.activated=!1,this.slider.el.innerHTML=this.sliderHTML,this}}class l extends t{constructor(){super({sectionId:"transparency",modalSelector:".popup-transparency",modalLinkSelector:".transparency-item__img",bodySelector:".popup-dialog-transparency",closeBtnSelector:".close"}),this.slider=new a({wrapper:".popup-transparency-slider-wrap",slider:".popup-transparency-slider",navigation:{prev:".popup-arrow_transparency_left",next:".popup-arrow_transparency_right"},counters:{current:".slider-counter-content__current",total:".slider-counter-content__total"}})}afterOpen(e){this.slider.init();const{slideIndex:t}=e.closest(".transparency-item").dataset;this.slider.changeSlide(0,+t)}afterClose(){this.slider.destroy()}}class n extends t{constructor(){super({modalSelector:".popup-portfolio",modalLinkSelector:".portfolio-slider__slide-frame",bodySelector:".popup-dialog-portfolio",closeBtnSelector:".close"}),this.slider=new a({wrapper:".popup-portfolio-slider-wrap",slider:".popup-portfolio-slider",navigation:{prev:"#popup_portfolio_left",next:"#popup_portfolio_right"},counters:{current:".slider-counter-content__current",total:".slider-counter-content__total"}}),this.portfolioTextArray=document.querySelectorAll(".popup-dialog-portfolio .popup-portfolio-text"),this.slider.wrapper.el.addEventListener("click",(({target:e})=>{if(this.prevPortfolioText=document.querySelector(".popup-dialog-portfolio .popup-portfolio-text.d-block"),e.closest(this.slider.navigation.next.selector)||e.closest(this.slider.navigation.prev.selector)){const{currentIndex:e}=this.slider.props;this.changePortfolioText(e)}}))}changePortfolioText(e){this.prevPortfolioText&&this.prevPortfolioText.classList.remove("d-block"),this.portfolioTextArray[e].classList.add("d-block")}afterOpen(e){this.slider.init();const t=e.closest(".portfolio-slider__slide"),{slideIndex:s}=t.dataset,r=e.closest(".portfolio-slider__slide-frame"),i=2*+s+ +[...t.querySelectorAll(".portfolio-slider__slide-frame")].indexOf(r);this.slider.changeSlide(0,i),this.changePortfolioText(i)}afterClose(){this.slider.destroy()}}window.repairTypeService=new class{constructor(){this.send=o}getRepairType(){return this.send({url:"http://localhost:4545/repairTypes"}).then((e=>e))}},repairTypeService.logger(),new class extends t{constructor(){super({modalSelector:".popup-repair-types",modalLinkSelector:".repair-types-list",bodySelector:".dialog-repair-types",closeBtnSelector:".close"}),new r}afterOpen(){}},new class extends t{constructor(){super({modalSelector:".popup-privacy",modalLinkSelector:".link-privacy",bodySelector:".popup-dialog-privacy",closeBtnSelector:".close"})}},new class extends t{constructor(){super({modalSelector:".popup-consultation",modalLinkSelector:".button_wide",bodySelector:".feedback-wrap",closeBtnSelector:".close"})}afterOpen(){this.modal.addEventListener("submit",(e=>{e.preventDefault();const t=new i,s=e.target.closest("form");if(s.checkValidity()){let e=new FormData(s);const r={};e.forEach(((e,t)=>{r[t]=e})),o({url:"../server.php",method:"POST",data:r}),this.toggle(!1),t.toggle(!0)}}))}},(()=>{const t=document.querySelector("header");(e=>{const t=e.querySelector(".header-contacts__phone-number-wrap"),s=e.querySelector(".header-contacts__phone-number-accord"),r=s.querySelector(".header-contacts__phone-number");e.addEventListener("click",(e=>{const{target:i}=e;if(i.closest(".header-contacts__arrow")){const{height:e}=getComputedStyle(t),o=s.classList.toggle("active"),{top:a,opacity:l,transform:n}=((e,t)=>e?{top:t,opacity:1,transform:"rotate(180deg)"}:{top:0,opacity:0,transform:"none"})(o,e);i.style.transform=n,s.style.top=a,r.style.opacity=l}}))})(t),(t=>{const s=document.querySelector(".popup-menu"),r=s.querySelector(".popup-dialog-menu"),i=(e="close")=>{let t;"toggle"===e?t=s.classList.toggle("active"):"close"===e&&(s.classList.remove("active"),t=!1);const i=window.innerWidth,{width:o}=getComputedStyle(r);i>=576?r.style.right=t?o:0:r.style.top=t?"100vh":0};t.addEventListener("click",(e=>{const{target:t}=e;t.matches(".menu__icon")&&i("toggle")})),s.addEventListener("click",(t=>{t.preventDefault();const{target:s}=t;s.matches(".close-menu")&&i("close"),s.matches(".menu-link")&&(i("close"),s.closest(".popup-menu-nav__item")&&e(s))}))})(t)})(),(()=>{const e=e=>{const t=new RegExp("[^\\d]+","g");return e.replace(t,"").substring(0,11)};document.addEventListener("input",(t=>{const{target:s}=t;if(s.matches('input[name="phone"]')){const{value:t}=s,r=e(t),i=(e,t)=>r.substring(e,t),o=r.length;o<=4?s.value=`+7 (${i(1,4)}`:o>4&&o<=7?s.value=`+7 (${i(1,4)}) ${i(4,7)}`:o>7&&o<=9?s.value=`+7 (${i(1,4)}) ${i(4,7)}-${i(7,9)}`:o>9&&(s.value=`+7 (${i(1,4)}) ${i(4,7)}-${i(7,9)}-${i(9,11)}`)}})),document.addEventListener("focusin",(t=>{const{target:s}=t;s.matches('input[name="phone"]')&&e(s.value).length<=1&&(s.value="+7 (")})),document.addEventListener("focusout",(t=>{const{target:s}=t;s.matches('input[name="phone"]')&&e(s.value).length<=1&&(s.value="")}))})(),(()=>{const e=document.getElementById("formula"),t=e.querySelector(".wrapper_small.tablet-hide"),s=(e.querySelector(".wrapper_small.desktop-hide"),new a({wrapper:"#formula .formula-slider-wrap",sliderClass:"formula-slider-active",activeClass:"formula-slide-active",duration:500,slidesPerView:3,slider:".formula-slider",navigation:{prev:"#formula-arrow_left",next:"#formula-arrow_right"}}));window.innerWidth<1024&&s.init("formula"),window.addEventListener("resize",(()=>{window.innerWidth<1024?s.init("formula"):s.activated&&s.destroy()}));const r=(e,t)=>{const s=e.querySelector(".formula-item-popup"),r=parseFloat(getComputedStyle(s).getPropertyValue("height")),i=parseFloat(getComputedStyle(e).getPropertyValue("height")),{top:o}=s.getBoundingClientRect();let a;o>0?(a="top",s.classList.remove("bottom")):(a="bottom",s.classList.add("bottom"));const{opacity:l,visibility:n,transform:c}=((e,t)=>{let s;if("show"===e){if(s={opacity:"1",visibility:"visible"},"bottom"===t){const e=r+i+15;s={...s,transform:`translate3d(0, ${e}px, 0)`}}}else"hide"===e&&(s={opacity:"0.1",visibility:"hidden",transform:"translate3d(0, -5px, 0)"});return s})(t,a);s.style.opacity=l,s.style.visibility=n,s.style.transform=c};t.addEventListener("mouseover",(e=>{const{target:t}=e,s=t.closest(".formula-item__icon");if(s){s.classList.add("active");const e=s.closest(".formula-item");e.style.zIndex="2",r(e,"show")}})),t.addEventListener("mouseout",(e=>{const{target:t}=e,s=t.closest(".formula-item__icon");if(s){s.classList.remove("active");const e=s.closest(".formula-item");e.style.zIndex="0",r(e,"hide")}}))})(),(()=>{new l,document.querySelectorAll("#transparency .transparency-item").forEach(((e,t)=>{e.dataset.slideIndex=t.toString()}));const e=new a({wrapper:".transparency-slider-wrap",slider:".transparency-slider",sliderClass:"transparency-slider-active",activeClass:"transparency-slide-active",duration:500,slidesPerView:1,navigation:{next:"#transparency-arrow_right",prev:"#transparency-arrow_left"}}),t=()=>{window.innerWidth<1090?e.init():e.activated&&e.destroy()};t(),window.addEventListener("resize",(()=>{t()}))})(),(()=>{document.getElementById("repair-types");const e={wrapper:".repair-types-slider-wrap",slider:".types-repair1",activeClass:"active",slidesPerView:1,navigation:{next:"#repair-types-arrow_right",prev:"#repair-types-arrow_left"},counters:{current:".slider-counter-content__current",total:".slider-counter-content__total"}};let t=new a(e);t.init(),new s({tabPanelSelector:"#repair-types",tabPanelItemSelectors:{navSelector:".nav-list-repair",navItemSelector:".repair-types-nav__item",tabItemSelector:".repair-types-slider > div"}}).afterChoose=s=>{t.destroy(),e.slider=".types-repair"+(+s+1),t=new a(e),t.init()};const r=new a({wrapper:".nav-wrap-repair",slider:".nav-list-repair",duration:500,activeClass:"active",slidesPerView:3,navigation:{next:"#nav-arrow-repair-right_base",prev:"#nav-arrow-repair-left_base"}});window.innerWidth<1024&&r.init("repair-types"),window.addEventListener("resize",(()=>{window.innerWidth<1024?r.init("repair-types"):t.activated&&r.destroy()}))})(),document.getElementById("portfolio"),new n,new a({wrapper:"#portfolio .portfolio-slider-wrap",duration:500,slidesPerView:3,slider:".portfolio-slider",slideMinWidth:352,loop:!1,navigation:{prev:"#portfolio-arrow_left",next:"#portfolio-arrow_right"}}).init(),(()=>{const e=document.getElementById("faq");e.querySelector(".accordion"),e.addEventListener("click",(({target:e})=>{e.matches(".title_block")&&e.classList.toggle("msg-active")}))})(),(()=>{const e={phone:{required:!0,pattern:"\\+7 \\(\\d\\d\\d\\) \\d\\d\\d-\\d\\d-\\d\\d"},privacy:{required:!0}};Object.keys(e).forEach((t=>{document.querySelectorAll(`*[name=${t}]`).forEach((s=>{Object.keys(e[t]).forEach((r=>{s.setAttribute(r,e[t][r])}))}))}))})(),document.querySelector(".footer .button-footer").addEventListener("click",(t=>{t.preventDefault();const{target:s}=t;s.closest(".button-footer")&&e(s)})),document.addEventListener("submit",(e=>{if(e.preventDefault(),!e.target.closest(".popup")){const t=new i;e.target.closest("form").checkValidity()&&t.toggle(!0)}})),new a({wrapper:".reviews-slider-wrap",slider:".reviews-slider",activeClass:"x-active",slidesPerView:1,duration:500,loop:!0,navigation:{next:"#reviews-arrow_right",prev:"#reviews-arrow_left"},dots:{blockSelector:"#reviews .slider-dots-reviews",class:"dot-reviews",activeClass:"dot_active"}}).init()})();
