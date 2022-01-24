(()=>{"use strict";const t=async({url:t,method:e,data:a})=>{try{const s={GET:{method:"GET"},POST:{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json"}},DELETE:{method:"DELETE"},PUT:{method:"PUT",body:JSON.stringify(a),headers:{"Content-Type":"application/json"}}},n=await fetch(t,{...s[e]});if(!n.ok)throw n;return{ok:!0,data:await n.json()}}catch(t){const e=`status: ${t.status}${t.statusText?`, statusText: ${t.statusText}`:""}`;return console.error(e),{ok:!1}}};class e{constructor(){this.send=t}getRepairTypes(){return this.send({url:"http://localhost:4545/repairTypes"}).then((t=>t))}getRepairType(t){return this.send({url:`http://localhost:4545/repairTypes/${t}`}).then((t=>t))}async getSomeRepairTypes(t){let{ok:e,data:a}=await this.getRepairTypes();return a=e?a.filter((e=>e.type===t)):{},{ok:e,data:a}}async addRepairTypes(t){return await this.send({url:"http://localhost:4545/repairTypes",method:"POST",data:t})}async removeRepairTypes(t){return await this.send({url:`http://localhost:4545/repairTypes/${t}`,method:"DELETE"})}async editRepairTypes(t,e){return await this.send({url:`http://localhost:4545/repairTypes/${t}`,method:"PUT",data:e})}}const a=t=>{const e=document.getElementById("tbody");e.innerHTML="",t.forEach((t=>{var a;e.insertAdjacentHTML("beforeend",`<tr class="table__row">\n    <td class="table__id table__cell">${(a=t).id}</td>\n    <td class="table-type table__cell">${a.type}</td>\n    <td class="table-name table__cell">\n        ${a.name}\n    </td>\n    <td class="table-units table__cell">\n        ${a.units}\n        </td>\n        <td class="table-cost table__cell">\n        ${a.cost} руб\n    </td>\n    <td>\n    <div class="table__actions table__cell">\n        <button class="button action-change btn-modal" data-action="change" data-id="${a.id}"><span class="svg_ui"><svg class="action-icon_change"><use xlink:href="./img/sprite.svg#change"></use></svg></span><span>Изменить</span>\n    </button>\n    <button class="button action-remove" data-action="remove" data-id="${a.id}"><span class="svg_ui"><svg class="action-icon_remove"><use xlink:href="./img/sprite.svg#remove"></use></svg></span><span>Удалить</span>\n    </button>\n    </div>\n    </td>\n    </tr>`)}))},s=new e,{pathname:n}=(new class extends class{constructor({modalSelector:t,sectionId:e,...a}){this.modalSelector=t,this.modal=document.querySelector(t),e&&(this.section=document.getElementById(e)),this.modal&&this.init(a)}init({bodySelector:t,closeBtnSelector:e,modalLinkSelector:a}){this.body=this.modal.querySelector(t),this.modal.addEventListener("click",(t=>{const{target:a}=t;a.closest(e)&&(this.toggle(!1),this.afterClose())})),document.addEventListener("click",(t=>{const{target:e}=t;e.closest(a)&&(this.toggle(!0),this.afterOpen(e.closest(a))),e.matches(this.modalSelector)&&(this.toggle(!1),this.afterClose())}))}afterOpen(){}afterClose(){}toggle(t,e=null){this.modal.style.visibility=t?"visible":"hidden",t&&this.afterOpen(e)}}{constructor(){super({modalSelector:"#modal",modalLinkSelector:".btn-modal",bodySelector:".modal",closeBtnSelector:".button__close"}),this.header=this.modal.querySelector(".modal__header"),this.saveBtn=this.modal.querySelector(".button-ui_firm"),this.form=this.modal.querySelector("form"),this.modal.addEventListener("click",this.clickEventListener.bind(this)),this.repairTypeService=new e}clickEventListener(t){t.target.closest(".cancel-button")&&(t.preventDefault(),this.toggle(!1))}async afterOpen(t){if(t){const{action:e,id:a}=t.dataset;if("add"===e)this.header.textContent="Добавление новой услуги",this.form.dataset.action="add",this.form.dataset.id=a;else if("change"===e){this.header.textContent="Редактировать услугу",this.form.dataset.action="change",this.form.dataset.id=a;const{ok:t,data:e}=await this.repairTypeService.getRepairType(a);t&&(console.log(e),Object.keys(e).forEach((t=>{this.form.querySelector(`*[name=${t}]`).value=e[t]})))}}}},window.location),o="true"===document.cookie.split(";").reduce(((t,e)=>{const[a,s]=e.split("=");return{...t,[a]:s}}),{}).isAuthorized;n.includes("html")&&!n.includes("index.html")&&(o||window.location.replace("./index.html")),o&&((()=>{const t=document.querySelector("#modal form");document.getElementById("tbody"),t.addEventListener("submit",(async t=>{t.preventDefault();const s=t.target,{action:n,id:o}=s.dataset;if("change"===n){const t=new e,{ok:n}=await t.editRepairTypes(o,(t=>{let e=new FormData(t);const a={};return e.forEach(((t,e)=>{a[e]=t})),a})(s));if(n){const{ok:e,data:s}=await t.getRepairTypes();e&&a(s)}}}))})(),document.getElementById("tbody").addEventListener("click",(async t=>{t.preventDefault();const s=t.target.closest(".action-remove");if(s){const{id:t,action:n}=s.dataset;if("remove"===n){const s=new e,{ok:n}=await s.removeRepairTypes(t);if(n){const{ok:t,data:e}=await s.getRepairTypes();t&&a(e)}}}})),document.querySelector("#modal form").addEventListener("submit",(async t=>{t.preventDefault();const s=t.target,{action:n,id:o}=s.dataset;if("add"===n){const t=new e,{ok:n}=await t.addRepairTypes((t=>{let e=new FormData(t);const a={};return e.forEach(((t,e)=>{a[e]=t})),a})(s));if(n){s.reset();const{ok:e,data:n}=await t.getRepairTypes();e&&a(n)}}})),(async()=>{const t=await s.getRepairTypes();t.ok&&(a(t.data),await(async t=>{const s=new e;let n=document.getElementById("typeItem");var o;o=t.reduce(((t,e)=>t.add(e.type)),new Set),n.innerHTML='<option value="Все услуги">Все услуги</option>',[...o].forEach((t=>{n.insertAdjacentHTML("beforeend",`<option value="${t}">${t}</option>`)})),a(t),n.addEventListener("change",(({target:t})=>{t.closest("#typeItem")&&(async t=>{const e="Все услуги"===t?await s.getRepairTypes():await s.getSomeRepairTypes(t);e.ok&&a(e.data)})(t.value)}))})(t.data))})())})();