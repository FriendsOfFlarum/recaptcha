(()=>{var t={195:(t,e,r)=>{t.exports=r(236)},236:t=>{var e=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof v?e:v,a=Object.create(o.prototype),i=new O(n||[]);return a._invoke=function(t,e,r){var n=h;return function(o,a){if(n===l)throw new Error("Generator is already running");if(n===d){if("throw"===o)throw a;return I()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=k(i,r);if(c){if(c===y)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=l;var u=p(t,e,r);if("normal"===u.type){if(n=r.done?d:f,u.arg===y)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=d,r.method="throw",r.arg=u.arg)}}}(t,r,i),a}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var h="suspendedStart",f="suspendedYield",l="executing",d="completed",y={};function v(){}function m(){}function g(){}var w={};w[a]=function(){return this};var b=Object.getPrototypeOf,x=b&&b(b(P([])));x&&x!==r&&n.call(x,a)&&(w=x);var L=g.prototype=v.prototype=Object.create(w);function E(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function r(o,a,i,c){var u=p(t[o],t,a);if("throw"!==u.type){var s=u.arg,h=s.value;return h&&"object"==typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(h).then((function(t){s.value=t,i(s)}),(function(t){return r("throw",t,i,c)}))}c(u.arg)}var o;this._invoke=function(t,n){function a(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(a,a):a()}}function k(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,k(t,r),"throw"===r.method))return y;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var o=p(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,y;var a=o.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,y):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function P(t){if(t){var r=t[a];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:I}}function I(){return{value:e,done:!0}}return m.prototype=L.constructor=g,g.constructor=m,m.displayName=u(g,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,u(t,c,"GeneratorFunction")),t.prototype=Object.create(L),t},t.awrap=function(t){return{__await:t}},E(_.prototype),_.prototype[i]=function(){return this},t.AsyncIterator=_,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new _(s(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},E(L),u(L,c,"Generator"),L[a]=function(){return this},L.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=P,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),s=n.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,y):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),j(r),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;j(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:P(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),y}},t}(t.exports);try{regeneratorRuntime=e}catch(t){Function("r","regeneratorRuntime = r")(e)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var a=e[n]={exports:{}};return t[n](a,a.exports,r),a.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};(()=>{"use strict";r.r(n);const t=flarum.core.compat["forum/app"];var e=r.n(t);const o=flarum.core.compat["forum/components/DiscussionComposer"];var a=r.n(o);const i=flarum.core.compat["forum/components/ReplyComposer"];var c=r.n(i);const u=flarum.core.compat["common/extend"],s=flarum.core.compat["forum/components/SignUpModal"];var p=r.n(s);function h(t,e){return h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},h(t,e)}function f(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}var l=r(195),d=r.n(l);const y=flarum.core.compat["common/Component"];var v=r.n(y);const g=function(){function t(t){return function(e){return new Promise((function(r,n){var o=document.createElement(t),a="body",i="src";switch(o.onload=function(){r(e)},o.onerror=function(){n(e)},t){case"script":o.async=!0;break;case"link":o.type="text/css",o.rel="stylesheet",i="href",a="head"}o[i]=e,document[a].appendChild(o)}))}}return{css:t("link"),js:t("script"),img:t("img")}}();var w=function(){var t,r=(t=d().mark((function t(){return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e().recaptchaLoaded){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,g.js("https://www.recaptcha.net/recaptcha/api.js?hl="+e().translator.locale+"&render=explicit");case 4:e().recaptchaLoaded=!0;case 5:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){f(a,n,o,i,c,"next",t)}function c(t){f(a,n,o,i,c,"throw",t)}i(void 0)}))});return function(){return r.apply(this,arguments)}}(),b=function(t){var r,n;function o(){return t.apply(this,arguments)||this}n=t,(r=o).prototype=Object.create(n.prototype),r.prototype.constructor=r,h(r,n);var a=o.prototype;return a.oninit=function(e){t.prototype.oninit.call(this,e)},a.view=function(){return m("div",{className:"Form-group"},m("div",{className:"g-recaptcha"}))},a.oncreate=function(r){var n=this;if(t.prototype.oncreate.call(this,r),w().then((function(){var t=setInterval((function(){window.recaptcha&&(clearInterval(t),n.attrs.state.render(r.dom.querySelector(".g-recaptcha")))}),250)})),"invisible"===e().data["fof-recaptcha.type"]){var o=r.dom.querySelector("iframe");o&&(o.tabIndex=-1)}},o}(v()),x=function(){function t(t,r){void 0===r&&(r=null),this.callback=t,this.errorCallback=r||function(t){e().alerts.show(t)},this.widgetId=null}var r=t.prototype;return r.render=function(t){var r=this;this.widgetId=grecaptcha.render(t,{sitekey:e().data["fof-recaptcha.credentials.site"],theme:e().forum.attribute("darkMode")?"dark":"light",type:e().data["fof-recaptcha.type"],size:"invisible"===e().data["fof-recaptcha.type"]?"invisible":"normal",callback:this.callback,"error-callback":function(){var t={type:"error",content:e().translator.trans("fof-recaptcha.forum.error")};r.errorCallback(t)}})},r.getResponse=function(){return grecaptcha.getResponse(this.widgetId)},r.execute=function(){return grecaptcha.execute(this.widgetId)},r.reset=function(){return grecaptcha.reset(this.widgetId)},t}();function L(t){var r="invisible"===e().data["fof-recaptcha.type"];(0,u.extend)(t.prototype,"oninit",(function(){var t=this;e().forum.attribute("postWithoutCaptcha")||(this.recaptcha=new x((function(){r&&t.onsubmit("recaptchaSecondStep")})))})),(0,u.extend)(t.prototype,"data",(function(t){e().forum.attribute("postWithoutCaptcha")||(t["g-recaptcha-response"]=this.recaptcha.getResponse())})),(0,u.extend)(t.prototype,"headerItems",(function(t){e().forum.attribute("postWithoutCaptcha")||t.add("recaptcha",b.component({state:this.recaptcha}),-5)})),(0,u.extend)(t.prototype,"loaded",(function(){e().forum.attribute("postWithoutCaptcha")||this.recaptcha.reset()})),(0,u.override)(t.prototype,"onsubmit",(function(t,n){return!e().forum.attribute("postWithoutCaptcha")&&r&&"recaptchaSecondStep"!==n?(this.loading=!0,void this.recaptcha.execute()):t()}))}e().initializers.add("fof/recaptcha",(function(){var t;e().recaptchaLoaded=!1,t="invisible"===app.data["fof-recaptcha.type"],(0,u.extend)(p().prototype,"oninit",(function(){var e=this;this.recaptcha=new x((function(){if(t){var r=new Event("submit");r.isRecaptchaSecondStep=!0,e.onsubmit(r)}}),(function(t){e.loaded(),e.alertAttrs=t}))})),(0,u.extend)(p().prototype,"submitData",(function(t){t["g-recaptcha-response"]=this.recaptcha.getResponse()})),(0,u.extend)(p().prototype,"fields",(function(t){t.add("recaptcha",b.component({state:this.recaptcha}),-5)})),(0,u.extend)(p().prototype,"onerror",(function(){this.recaptcha.reset()})),(0,u.override)(p().prototype,"onsubmit",(function(e,r){return t&&!r.isRecaptchaSecondStep?(r.preventDefault(),this.loading=!0,void this.recaptcha.execute()):e(r)})),L(a()),L(c())}))})(),module.exports=n})();
//# sourceMappingURL=forum.js.map