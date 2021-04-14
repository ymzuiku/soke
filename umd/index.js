!function(r,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((r=r||self).soke={})}(this,function(r){"use strict";var h={zh:{bodyIsNotObject:function(){return"参数对象不能为空"},paramsIsEmpty:function(r){return"参数 "+r+" 未传递"},paramsIsError:function(r){return"参数 "+r+" 格式不正确"},ignoreNeedParams:function(r){return"缺少必要参数 "+r},typeError:function(r,n){return"参数 "+r+" 的类型应该为 "+n},minLengthError:function(r,n){return"参数 "+r+" 长度应不小于 "+n+" 位"},maxLengthError:function(r,n){return"参数 "+r+" 长度应不大于 "+n+" 位"},minNumError:function(r,n){return"参数 "+r+" 应不小于 "+n},maxNumError:function(r,n){return"参数 "+r+" 应不大于 "+n},pickError:function(r,n){return"参数 "+r+" 的值不属于 "+n.join(", ")+" 中的一位"}},en:{bodyIsNotObject:function(){return"Body is not a object"},paramsIsEmpty:function(r){return"Param "+r+" is empty"},paramsIsError:function(r){return"Param "+r+" is error"},ignoreNeedParams:function(r){return"Ignore param: "+r},typeError:function(r,n){return"Param "+r+" typeof need is "+n},minLengthError:function(r,n){return"Param "+r+" length need not less than "+n},maxLengthError:function(r,n){return"Param "+r+" length need not longer than "+n},minNumError:function(r,n){return"Param "+r+" length need not less than "+n},maxNumError:function(r,n){return"Param "+r+" length need not more than "+n},pickError:function(r,n){return"Param "+r+" is value need to be included in "+n.join(", ")+" 中的一位"}}},y=Object.freeze({__proto__:null,pick:function(t){return function(r){if(-1===t.indexOf(r))return function(r,n){return h[n].pickError(r,t)}}},minNum:function(t){return function(r){return"number"!=typeof r?function(r,n){return h[n].typeError(r,"string")}:r<t?function(r,n){return h[n].minNumError(r,t)}:void 0}},maxNum:function(t){return function(r){return"number"!=typeof r?function(r,n){return h[n].typeError(r,"string")}:t<r?function(r,n){return h[n].maxNumError(r,t)}:void 0}},minLength:function(t){return function(r){return"string"!=typeof r?function(r,n){return h[n].typeError(r,"string")}:r.length<t?function(r,n){return h[n].minLengthError(r,t)}:void 0}},maxLength:function(t){return function(r){return"string"!=typeof r?function(r,n){return h[n].typeError(r,"string")}:r.length>t?function(r,n){return h[n].maxLengthError(r,t)}:void 0}},time:function(){return/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/},date:function(){return/^\d{4}(-)(1[0-2]|0?\d)\1([0-2]\d|\d|30|31)$/},hexColor:function(){return/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/},base64:function(){return/^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i},email:function(){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},htmlTag:function(){return/<(\w+)[^>]*>(.*?<\/\1>)?/},md5:function(){return/^([a-f\d]{32}|[A-F\d]{32})$/},qq:function(){return/^[1-9][0-9]{4,10}$/},noLetter:function(){return/^[^A-Za-z]*$/},letter:function(){return/^[a-zA-Z]+$/},string:function(r){var n=r[0],t=void 0===n?6:n,e=r[1];return new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[,.!@#$%0-9A-Za-z]{"+t+","+(void 0===e?30:e)+"}$")},labels:function(r){var n=r[0],t=void 0===n?6:n,e=r[1];return new RegExp("^[,.!@#$%a-zA-Z0-9_-]{"+t+","+(void 0===e?30:e)+"}$")},cnTelPhone:function(){return/^(?:\d{3}-)?\d{8}$|^(?:\d{4}-)?\d{7,8}$/},cnPhone:function(){return/^(?:(?:\+|00)86)?1\d{10}$/},wechat:function(){return/^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/},azAZ09:function(){return/^[A-Za-z0-9]+$/},cnIdCard:function(){return function(r){var n=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],t=r.substring(17);if(/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(r)){for(var e=0,o=0;o<17;o++)e+=r[o]*n[o];if([1,0,"X",9,8,7,6,5,4,3,2][e%11]==t.toUpperCase())return!0}return function(r,n){throw h[n].paramsIsError(r)}}},cnCompany:function(){return/^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/},url:function(){return/^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/},version:function(){return/^\d+(?:\.\d+){2}$/},subIp:function(){return/^(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/},number:function(){return/^\d{1,}$/},cnPostalCode:function(){return/^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/},cnPassport:function(){return/(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/},bankCard:function(){return/^[1-9]\d{9,29}$/}});function l(r,t,e,o){var u,n=Object.prototype.toString.call(r);return"[object Array]"===n?r.forEach(function(r){var n=l(r,t,e,o);n&&(u=n)}):"[object RegExp]"===n?u="string"!=typeof t?h[o].typeError(e,"string"):r.test(t):"function"==typeof r&&!1===(u=r(t))&&(u=h[o].paramsIsError(e)),"function"==typeof u&&(u=u(e,o)),"string"==typeof u?u:!1===u?h[o].paramsIsError(e):void 0}var E={optional:1,checks:1,pass:1,oneOf:1};function b(r,n,t,e,o){for(var u,i,a=n[e],f=!1,c="",s=0;s<t.length;s++){var d=t[s];if("string"==typeof d){if(r[d]&&e!==d)try{v(((u={})[d]=r[d],u))(((i={})[d]=n[d],i)),f=!0;break}catch(p){c=p}}else{var p=l(d,a,e,o);if(!p){f=!0;break}c=p}}return[f,c]}function v(g){return function(r,n){void 0===n&&(n=v.baseLangaue);var t=h[n];if(!r)throw t.bodyIsNotObject();if("object"!=typeof r)try{r=JSON.parse(r)}catch(r){throw t.bodyIsNotObject()}for(var e=Object.keys(g),o=0;o<e.length;o++){var u=e[o],i=r[u],a=g[u];if(!a.pass){if(a.checkOf)if(!b(g,r,a.checkOf,u,n)[0]){if(a.message)throw a.message(u,i,n);throw t.paramsIsError(u)}if(a.passOf)if(b(g,r,a.passOf,u,n)[0])continue;if(null==i||""===i){if(a.optional)continue;if(a.message)throw a.message(u,i,n);throw t.ignoreNeedParams(u)}if(a.type)if(-1===a.type.indexOf("Array")){if(typeof i!==a.type){if(a.message)throw a.message(u,i,n);throw t.typeError(u,a.type)}}else{var f=a.type.replace("Array","");if("[object Array]"!==Object.prototype.toString.call(i)){if(a.message)throw a.message(u,i,n);throw t.typeError(u,a.type)}if(i[0]&&typeof i[0]!==f){if(a.message)throw a.message(u,i[0],n);throw t.typeError(u,a.type)}}if(a.check)if(p=l(a.check,i,u,n)){if(a.message)throw a.message(u,i,n);throw p}for(var c=Object.keys(a),s=0;s<c.length;s++){var d=c[s];if(!E[d]){var p,m=y[d];if(m)if(p=l(m(a[d]),i,u,n)){if(a.message)throw a.message(u,i,n);throw p}}}}}return r}}v.baseLangaue="en",v.createSchema=function(r){return r},r.default=v,r.message=h,r.regExps=y,Object.defineProperty(r,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map
