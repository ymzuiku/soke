var k=Object.defineProperty;var q=Object.getOwnPropertyDescriptor;var b=Object.getOwnPropertyNames;var N=Object.prototype.hasOwnProperty;var S=(t,n)=>{for(var i in n)k(t,i,{get:n[i],enumerable:!0})},A=(t,n,i,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let e of b(n))!N.call(t,e)&&e!==i&&k(t,e,{get:()=>n[e],enumerable:!(r=q(n,e))||r.enumerable});return t};var V=t=>A(k({},"__esModule",{value:!0}),t);var B={};S(B,{soke:()=>$});module.exports=V(B);function f(t,n){let r={__soke:{type:t,errors:{type:n||"Need type is: "+t}},required:e=>(r.__soke.errors.required=e||n||"Need required",r.__soke.requred=!0,r),len:(e,s)=>(r.__soke.errors.len=s||n||"Length no equal: "+e,r.__soke.len=e,r),equal:(e,s)=>(r.__soke.errors.equal=s||n||"Not equal the val",r.__soke.equal=e,r),equalByKey:(e,s)=>(r.__soke.errors.equalByKey=s||n||"Not equal by: "+e,r.__soke.equalByKey=e,r),min:(e,s)=>(r.__soke.errors.min=s||n||"Need min: "+e,r.__soke.min=e,r),max:(e,s)=>(r.__soke.errors.max=s||n||"Need max: "+e,r.__soke.max=e,r),pick:(e,s)=>(r.__soke.errors.pick=s||n||"Need in list: "+e,r.__soke.pick=new Set(e),r),notPick:(e,s)=>(r.__soke.errors.notPick=s||n||"Need not in list: "+e,r.__soke.notPick=new Set(e),r)};return r}function y(t,n){let r={__soke:{type:t,errors:{type:n||"Need type is: "+t}},required:e=>(r.__soke.errors.required=e||n||"Need required",r.__soke.requred=!0,r),equal:(e,s)=>(r.__soke.errors.equal=s||n||"Not equal the val",r.__soke.equal=e,r),equalByKey:(e,s)=>(r.__soke.errors.equalByKey=s||n||"Not equal by: "+e,r.__soke.equalByKey=e,r)};return r}function p(t,n){let r={__soke:{type:t,errors:{type:n||"Need type is: "+t,matches:[]},matches:[]},required:e=>(r.__soke.errors.required=e||n||"Need required",r.__soke.requred=!0,r),matches:(e,s)=>(r.__soke.errors.matches.push(s||n||"Matches error: "+String(e)),r.__soke.matches.push(e),r),len:(e,s)=>(r.__soke.errors.len=s||n||"Length no equal: "+e,r.__soke.len=e,r),equal:(e,s)=>(r.__soke.errors.equal=s||n||"Not equal the val",r.__soke.equal=e,r),equalByKey:(e,s)=>(r.__soke.errors.equalByKey=s||n||"Not equal by: "+e,r.__soke.equalByKey=e,r),min:(e,s)=>(r.__soke.errors.min=s||n||"Need min: "+e,r.__soke.min=e,r),max:(e,s)=>(r.__soke.errors.max=s||n||"Need max: "+e,r.__soke.max=e,r),pick:(e,s)=>(r.__soke.errors.pick=s||n||"Need in list: "+e,r.__soke.pick=new Set(e),r),notPick:(e,s)=>(r.__soke.errors.notPick=s||n||"Need not in list: "+e,r.__soke.notPick=new Set(e),r),password:e=>(r.matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,e),r),passwordStrong:e=>(r.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,e),r),email:e=>(r.matches(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,e),r),chinaPhone:e=>(r.matches(/^(?:(?:\+|00)86)?1\d{10}$/,e),r),chinaId:e=>(r.matches(/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,e),r),url:e=>(r.matches(/^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/,e),r),bank:e=>(r.matches(/^[1-9]\d{9,29}$/,e),r),chinaName:e=>(r.matches(/^(?:[\u4e00-\u9fa5·]{2,16})$/,e),r),chinaCar:e=>(r.matches(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/,e),r),hkId:e=>(r.matches(/^[a-zA-Z]\d{6}\([\dA]\)$/,e),r),number:e=>(r.matches(/^\d+$/,e),r),username:e=>(r.matches(/^[a-zA-Z0-9_-]{4,16}$/,e),r),letterOrNumber:e=>(r.matches(/^[A-Za-z0-9]+$/,e),r),letterAndNumber:e=>(r.matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/,e),r),letter:e=>(r.matches(/^[a-zA-Z]+$/,e),r),uuid:e=>(r.matches(/^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/i,e),r),integer:e=>(r.matches(/^-?[1-9]\d*$/,e),r),date:e=>(r.matches(/^\d{4}([/:-\S])(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,e),r)};return r}var g={type:(t,n,i,r)=>{if(i===void 0)return!0;let e=t[n];if(i==="array"&&Array.isArray(e))return!0;let s=typeof e;if(r&&s!==i)if(i==="number"){let m=Number(e);return isNaN(m)?!1:(t[n]=m,!0)}else{if(i==="string")return i==null?!1:(t[n]=e+"",!0);if(i==="boolean")return t[n]=!!e,!0}return s===i},min:(t,n)=>n===void 0?!0:typeof t=="number"?t>=n:t&&t.length?t.length>=n:!1,max:(t,n)=>n===void 0?!0:typeof t=="number"?t<=n:t&&t.length?t.length<=n:!1,pick:(t,n)=>{if(n===void 0)return!0;if(!t)return!1;if(Array.isArray(t)){let i=!0;for(let r=0;r<t.length;r++){let e=t[r];if(!n.has(e)){i=!1;break}}return i}return!!n.has(t)},notPick:(t,n)=>{if(n===void 0)return!0;if(!t)return!1;if(Array.isArray(t)){let i=!0;for(let r=0;r<t.length;r++){let e=t[r];if(n.has(e)){i=!1;break}}return i}return!n.has(t)}};function d(t,n,{first:i,key:r,typeChange:e}={}){let s="",m="",_={},l=u=>{if(!t[u])return"";let a=n[u],c=t[u];if(c.isSoke)return typeof a!="object"?c.objectError:d(c.schema,a,{first:!0,typeChange:e}).error;let o=t[u].__soke;if(a!==void 0&&!g.type(n,u,o.type,e))return o.errors.type;if(a=n[u],o.requred&&!a&&typeof a!="number")return o.errors.required;if(!g.min(a,o.min))return o.errors.min;if(!g.max(a,o.max))return o.errors.max;if(o.len&&typeof a=="string"&&a.length!==o.len)return o.errors.len;if(o.equal&&a!==o.equal)return o.errors.equal;if(o.equalByKey&&a!==n[o.equalByKey])return o.errors.equalByKey;if(o.matches&&o.matches.length){for(let h=0;h<o.matches.length;h++)if(!o.matches[h].test(a))return o.errors.matches[h]}return g.pick(a,o.pick)?g.notPick(a,o.notPick)?"":o.errors.notPick:o.errors.pick};if(r)_[r]=l(r),s=l(r),m=r;else{let u=Object.keys(t);for(let a=0;a<u.length;a++){let c=u[a],o=l(c);if(_[c]=o,o&&!s&&(s=o,m=c),o&&i)break}}return{errors:_,error:s,path:m}}var $={object:x,string:t=>p("string",t),bool:t=>y("boolean",t),array:t=>f("array",t),number:t=>f("number",t)};function x(t,n){let i={isSoke:!0,schema:t,objectError:n||"Need a object",schemaKeys:Object.keys(t),validate:(r,e)=>d(t,r,e),isValid:(r,e)=>{let s=d(t,r,{first:!0,key:e});if(s.error)throw new Error(s.error);return!0},dto:r=>{let e=d(t,r,{typeChange:!0});if(e.error)throw new Error(e.error);let s={},m=(_,l,u)=>{_.schemaKeys.forEach(a=>{let c=_.schema[a];c.isSoke?(l[a]={},m(c,l[a],u[a])):l[a]=u[a]})};return m(i,s,r),s}};return i}
