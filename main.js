(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){if("Escape"===e.key){var n=document.querySelector(".popup_is-opened");n&&t(n)}}function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e,t,n){return(t=function(e){var t=function(e){if("object"!=r(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var n=t.call(e,"string");if("object"!=r(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==r(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c={baseUrl:"https://nomoreparties.co/v1/wff-cohort-29",headers:{authorization:"a9b5db3b-41f0-4fef-b387-3b41719cf55a","Content-Type":"application/json"}};function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return fetch("".concat(c.baseUrl).concat(e),function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({headers:c.headers},t)).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))}))}function a(e,t){var n=t.onImageClick,r=t.onDeleteClick,o=t.onLikeClick,i=t.userId,c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),u=c.querySelector(".card__image"),a=c.querySelector(".card__title"),l=c.querySelector(".card__delete-button"),s=c.querySelector(".card__like-button"),d=c.querySelector(".card__like-count");return u.src=e.link,u.alt=e.name,a.textContent=e.name,d.textContent=e.likes?e.likes.length:0,e.likes.some((function(e){return e._id===i}))&&s.classList.add("card__like-button_is-active"),e.owner._id!==i&&(l.style.display="none"),u.addEventListener("click",(function(){return n(e.name,e.link)})),l.addEventListener("click",(function(){return r(e,c)})),s.addEventListener("click",(function(){return o(e,s,d)})),c}function l(e,t,n){var r;t.classList.contains("card__like-button_is-active")?function(e){return u("/cards/likes/".concat(e),{method:"DELETE"})}(e._id).then((function(r){t.classList.remove("card__like-button_is-active"),n.textContent=r.likes.length,e.likes=r.likes})).catch((function(e){return console.log("Ошибка при удалении лайка:",e)})):(r=e._id,u("/cards/likes/".concat(r),{method:"PUT"})).then((function(r){t.classList.add("card__like-button_is-active"),n.textContent=r.likes.length,e.likes=r.likes})).catch((function(e){return console.log("Ошибка при постановке лайка:",e)}))}var s=function(e,t){return e.querySelector(".".concat(t.id,"-error"))},d=function(e,t,n){var r=s(e,t);t.classList.remove(n.inputErrorClass),r.textContent=""},p=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)},f=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){d(e,n,t)})),p(n,r,t)};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var y,v={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},_=document.querySelector(".places__list"),b=document.querySelector(".popup_type_edit"),S=document.querySelector(".popup_type_new-card"),h=document.querySelector(".popup_type_image"),g=document.querySelector(".popup_type_delete-card"),k=h.querySelector(".popup__image"),C=h.querySelector(".popup__caption"),E=document.querySelector(".profile__edit-button"),q=document.querySelector(".profile__title"),L=document.querySelector(".profile__description"),O=document.querySelector(".profile__image"),j=document.querySelector(".profile__add-button"),x=document.forms["edit-profile"],w=document.forms["edit-profile"].name,P=document.forms["edit-profile"].description,A=document.forms["delete-card"],D=document.querySelector(".popup_type_avatar"),T=document.forms["edit-avatar"],I=T.querySelector(".popup__input_type_url"),B=S.querySelector(".popup__form"),M=B.querySelector(".popup__input_type_card-name"),N=B.querySelector(".popup__input_type_url"),U=null,J=null;function H(t,n){k.src=n,k.alt=t,C.textContent=t,e(h)}function V(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...",r=e.querySelector(".popup__button");r&&(t?(r.dataset.originalButtonText||(r.dataset.originalButtonText=r.textContent),r.textContent=n):r.textContent=r.dataset.originalButtonText||"Сохранить")}function z(t,n){U=t._id,J=n,e(g)}x.addEventListener("submit",(function(e){e.preventDefault(),V(x,!0);var n,r,o,i=w.value,c=P.value;(n={name:i,about:c},r=n.name,o=n.about,u("/users/me",{method:"PATCH",body:JSON.stringify({name:r,about:o})})).then((function(e){q.textContent=i,L.textContent=c,O.style.backgroundImage="url(".concat(e.avatar,")"),t(b)})).catch((function(e){return console.log("Не удалось обновить информацию о пользователе",e)})).finally((function(){V(x,!1)}))})),B.addEventListener("submit",(function(e){var n,r,o;e.preventDefault(),V(B,!0),(n={name:M.value,link:N.value},r=n.name,o=n.link,u("/cards",{method:"POST",body:JSON.stringify({name:r,link:o})})).then((function(e){var n=a(e,{onImageClick:H,onDeleteClick:z,onLikeClick:l,userId:y});_.prepend(n),B.reset(),t(S)})).catch((function(e){console.error("Ошибка при добавлении карточки:",e)})).finally((function(){V(B,!1)}))})),T.addEventListener("submit",(function(e){var n;e.preventDefault(),V(T,!0),(n=I.value,u("/users/me/avatar",{method:"PATCH",body:JSON.stringify({avatar:n})})).then((function(e){O.style.backgroundImage="url(".concat(e.avatar,")"),t(D),T.reset()})).catch((function(e){console.error("Ошибка при обновлении аватара:",e)})).finally((function(){V(T,!1)}))})),A.addEventListener("submit",(function(e){var n;e.preventDefault(),U&&(n=U,u("/cards/".concat(n),{method:"DELETE"})).then((function(){J.remove(),U=null,J=null,t(g)})).catch((function(e){return console.log("Ошибка при удалении карточки:",e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);p(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){(function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage||"Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"):t.setCustomValidity(""),t.validity.valid?d(e,t,n):function(e,t,n){var r=s(e,t);t.classList.add(n.inputErrorClass),r.textContent=t.validationMessage}(e,t,n)})(e,o,t),p(n,r,t)}))}))}(t,e)}))}(v),document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated"),e.querySelector(".popup__close").addEventListener("click",(function(){return t(e)})),e.addEventListener("mousedown",(function(n){n.target===n.currentTarget&&t(e)}))})),E.addEventListener("click",(function(){w.value=q.textContent,P.value=L.textContent,f(x,v),e(b)})),j.addEventListener("click",(function(){f(B,v),B.reset(),e(S)})),document.querySelector(".profile__image-edit-icon").addEventListener("click",(function(){f(T,v),T.reset(),e(D)})),Promise.all([u("/users/me"),u("/cards")]).then((function(e){var t,n,r,o,i,c,u=(c=2,function(e){if(Array.isArray(e))return e}(i=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,c,u=[],a=!0,l=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=i.call(n)).done)&&(u.push(r.value),u.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return u}}(i,c)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(i,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),s=u[0],d=u[1];y=s._id,n=(t=s).name,r=t.about,o=t.avatar,q.textContent=n,L.textContent=r,O.style.backgroundImage="url(".concat(o,")"),function(e){e.forEach((function(e){var t=a(e,{onImageClick:H,onDeleteClick:z,onLikeClick:l,userId:y});_.append(t)}))}(d)})).catch((function(e){console.log("Ошибка:",e)}))})();