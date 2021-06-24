const t=document.querySelector("#task-input"),e=document.querySelector("#add-task"),n=document.querySelector("#filters"),o=[...n.childNodes].filter((t=>!t.nodeName.includes("#"))),c=document.querySelector("#tasks"),i=document.querySelector("#unfinished-task-num"),l=document.querySelector("#clear-finished-tasks");let r=(s="vite-todo",JSON.parse(localStorage.getItem(s))||[{task:"把冰箱發霉的檸檬拿去丟",completed:!1},{task:"打電話叫媽媽匯款給我",completed:!0},{task:"整理電腦資料夾",completed:!1},{task:"繳電費水費瓦斯費",completed:!0},{task:"刪訊息",completed:!1},{task:"約 Vicky 禮拜三泡溫泉",completed:!1},{task:"約 Ada 禮拜四吃晚餐",completed:!1}]);var s;function a(){let t=p();("待完成"===t&&!g()||"已完成"===t&&g()===r.length)&&(t="全部"),d(t)}function d(t="全部"){m(t),u(t),k()}function u(t="全部"){let e="";for(const n in r)"全部"===t&&(e+=f(n)),"待完成"===t&&(r[n].completed||(e+=f(n))),"已完成"===t&&r[n].completed&&(e+=f(n));c.innerHTML=e}function f(t){return`\n    <li id="${t}" class="flex items-center group">\n      <label class="px-3 py-4 cursor-pointer">\n        <input id="check" class="-mt-1" type="checkbox"\n        ${r[t].completed?" checked":""}>\n      </label>\n      <div class="ml-1 flex-grow cursor-text\n        border-b-2 border-gray-100 focus:outline-none\n        ${r[t].completed?" text-gray-300 line-through":""}\n        ${r[t].task.includes(" ")?"":" break-all"}"\n        style="padding: 18px 0;"\n      >\n        ${r[t].task}\n      </div>\n      <button id="delete" class="ml-2 px-3 py-4 text-2xl text-gray-400\n        lg:text-transparent lg:group-hover:text-gray-400\n        focus:outline-none transition duration-75"\n      >\n        ✕\n      </button>\n    </li>\n  `}function m(t="全部"){o.forEach((e=>{e.textContent===t?(e.classList.remove("filter-inactive"),e.classList.add("filter-active")):(e.classList.remove("filter-active"),e.classList.add("filter-inactive"))}))}function p(){return o.filter((t=>t.classList.contains("filter-active")))[0].textContent}function k(){i.textContent=g()}function g(){return r.filter((t=>!t.completed)).length}function v(){const e=t.value.trim();if(!e)return t.value="";r=[...r,{task:e,completed:!1}],t.value=""}function y(t,e){localStorage.setItem(t,JSON.stringify(e))}function x(t){localStorage.removeItem(t)}u(),k(),t.onkeydown=t=>{if("Enter"===t.key){let t=p();"已完成"===t&&(t="全部"),v(),d(t),y("vite-todo",r)}},e.onclick=()=>{let t=p();"已完成"===t&&(t="全部"),v(),d(t),y("vite-todo",r)},n.onclick=t=>{if(t.target.classList.contains("filter-inactive")){d(t.target.textContent)}},c.onclick=t=>{if("check"===t.target.id&&(!function(t){const e=t.target.closest("li").id;r[e].completed=!r[e].completed}(t),a(),y("vite-todo",r)),"delete"===t.target.id){if(confirm("確定刪除？")&&function(t){const e=t.target.closest("li").id;r.splice(e,1)}(t),a(),r.length)return y("vite-todo",r);x("vite-todo")}},l.onclick=()=>{if(confirm("確定移除完成的任務？")){if(r=r.filter((t=>!t.completed)),"已完成"===p()&&m(),u(),r.length)return y("vite-todo",r);x("vite-todo")}};
