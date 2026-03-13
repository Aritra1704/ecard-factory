(()=>{var Qf=Object.create;var Cs=Object.defineProperty;var Jf=Object.getOwnPropertyDescriptor;var Yf=Object.getOwnPropertyNames;var Gf=Object.getPrototypeOf,Xf=Object.prototype.hasOwnProperty;var dn=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Zf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Yf(t))!Xf.call(e,a)&&a!==n&&Cs(e,a,{get:()=>t[a],enumerable:!(r=Jf(t,a))||r.enumerable});return e};var cr=(e,t,n)=>(n=e!=null?Qf(Gf(e)):{},Zf(t||!e||!e.__esModule?Cs(n,"default",{value:e,enumerable:!0}):n,e));var As=dn(I=>{"use strict";var dr=Symbol.for("react.element"),qf=Symbol.for("react.portal"),ep=Symbol.for("react.fragment"),tp=Symbol.for("react.strict_mode"),np=Symbol.for("react.profiler"),rp=Symbol.for("react.provider"),ap=Symbol.for("react.context"),lp=Symbol.for("react.forward_ref"),op=Symbol.for("react.suspense"),ip=Symbol.for("react.memo"),sp=Symbol.for("react.lazy"),xs=Symbol.iterator;function up(e){return e===null||typeof e!="object"?null:(e=xs&&e[xs]||e["@@iterator"],typeof e=="function"?e:null)}var bs={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ts=Object.assign,Ds={};function Tn(e,t,n){this.props=e,this.context=t,this.refs=Ds,this.updater=n||bs}Tn.prototype.isReactComponent={};Tn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Tn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Fs(){}Fs.prototype=Tn.prototype;function Wl(e,t,n){this.props=e,this.context=t,this.refs=Ds,this.updater=n||bs}var Kl=Wl.prototype=new Fs;Kl.constructor=Wl;Ts(Kl,Tn.prototype);Kl.isPureReactComponent=!0;var $s=Array.isArray,Ls=Object.prototype.hasOwnProperty,Ql={current:null},Os={key:!0,ref:!0,__self:!0,__source:!0};function Us(e,t,n){var r,a={},l=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(l=""+t.key),t)Ls.call(t,r)&&!Os.hasOwnProperty(r)&&(a[r]=t[r]);var i=arguments.length-2;if(i===1)a.children=n;else if(1<i){for(var s=Array(i),u=0;u<i;u++)s[u]=arguments[u+2];a.children=s}if(e&&e.defaultProps)for(r in i=e.defaultProps,i)a[r]===void 0&&(a[r]=i[r]);return{$$typeof:dr,type:e,key:l,ref:o,props:a,_owner:Ql.current}}function cp(e,t){return{$$typeof:dr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Jl(e){return typeof e=="object"&&e!==null&&e.$$typeof===dr}function dp(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Ps=/\/+/g;function Hl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?dp(""+e.key):t.toString(36)}function da(e,t,n,r,a){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(l){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case dr:case qf:o=!0}}if(o)return o=e,a=a(o),e=r===""?"."+Hl(o,0):r,$s(a)?(n="",e!=null&&(n=e.replace(Ps,"$&/")+"/"),da(a,t,n,"",function(u){return u})):a!=null&&(Jl(a)&&(a=cp(a,n+(!a.key||o&&o.key===a.key?"":(""+a.key).replace(Ps,"$&/")+"/")+e)),t.push(a)),1;if(o=0,r=r===""?".":r+":",$s(e))for(var i=0;i<e.length;i++){l=e[i];var s=r+Hl(l,i);o+=da(l,t,n,s,a)}else if(s=up(e),typeof s=="function")for(e=s.call(e),i=0;!(l=e.next()).done;)l=l.value,s=r+Hl(l,i++),o+=da(l,t,n,s,a);else if(l==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function ca(e,t,n){if(e==null)return e;var r=[],a=0;return da(e,r,"","",function(l){return t.call(n,l,a++)}),r}function fp(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var xe={current:null},fa={transition:null},pp={ReactCurrentDispatcher:xe,ReactCurrentBatchConfig:fa,ReactCurrentOwner:Ql};function Is(){throw Error("act(...) is not supported in production builds of React.")}I.Children={map:ca,forEach:function(e,t,n){ca(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ca(e,function(){t++}),t},toArray:function(e){return ca(e,function(t){return t})||[]},only:function(e){if(!Jl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};I.Component=Tn;I.Fragment=ep;I.Profiler=np;I.PureComponent=Wl;I.StrictMode=tp;I.Suspense=op;I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=pp;I.act=Is;I.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Ts({},e.props),a=e.key,l=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(l=t.ref,o=Ql.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(s in t)Ls.call(t,s)&&!Os.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&i!==void 0?i[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){i=Array(s);for(var u=0;u<s;u++)i[u]=arguments[u+2];r.children=i}return{$$typeof:dr,type:e.type,key:a,ref:l,props:r,_owner:o}};I.createContext=function(e){return e={$$typeof:ap,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:rp,_context:e},e.Consumer=e};I.createElement=Us;I.createFactory=function(e){var t=Us.bind(null,e);return t.type=e,t};I.createRef=function(){return{current:null}};I.forwardRef=function(e){return{$$typeof:lp,render:e}};I.isValidElement=Jl;I.lazy=function(e){return{$$typeof:sp,_payload:{_status:-1,_result:e},_init:fp}};I.memo=function(e,t){return{$$typeof:ip,type:e,compare:t===void 0?null:t}};I.startTransition=function(e){var t=fa.transition;fa.transition={};try{e()}finally{fa.transition=t}};I.unstable_act=Is;I.useCallback=function(e,t){return xe.current.useCallback(e,t)};I.useContext=function(e){return xe.current.useContext(e)};I.useDebugValue=function(){};I.useDeferredValue=function(e){return xe.current.useDeferredValue(e)};I.useEffect=function(e,t){return xe.current.useEffect(e,t)};I.useId=function(){return xe.current.useId()};I.useImperativeHandle=function(e,t,n){return xe.current.useImperativeHandle(e,t,n)};I.useInsertionEffect=function(e,t){return xe.current.useInsertionEffect(e,t)};I.useLayoutEffect=function(e,t){return xe.current.useLayoutEffect(e,t)};I.useMemo=function(e,t){return xe.current.useMemo(e,t)};I.useReducer=function(e,t,n){return xe.current.useReducer(e,t,n)};I.useRef=function(e){return xe.current.useRef(e)};I.useState=function(e){return xe.current.useState(e)};I.useSyncExternalStore=function(e,t,n){return xe.current.useSyncExternalStore(e,t,n)};I.useTransition=function(){return xe.current.useTransition()};I.version="18.3.1"});var fr=dn((zv,js)=>{"use strict";js.exports=As()});var Ys=dn(Q=>{"use strict";function Zl(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<pa(a,t))e[r]=t,e[n]=a,n=r;else break e}}function ot(e){return e.length===0?null:e[0]}function ha(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,a=e.length,l=a>>>1;r<l;){var o=2*(r+1)-1,i=e[o],s=o+1,u=e[s];if(0>pa(i,n))s<a&&0>pa(u,i)?(e[r]=u,e[s]=n,r=s):(e[r]=i,e[o]=n,r=o);else if(s<a&&0>pa(u,n))e[r]=u,e[s]=n,r=s;else break e}}return t}function pa(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Ms=performance,Q.unstable_now=function(){return Ms.now()}):(Yl=Date,zs=Yl.now(),Q.unstable_now=function(){return Yl.now()-zs});var Ms,Yl,zs,gt=[],It=[],mp=1,Ye=null,Ne=3,va=!1,fn=!1,mr=!1,Hs=typeof setTimeout=="function"?setTimeout:null,Ws=typeof clearTimeout=="function"?clearTimeout:null,Vs=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function ql(e){for(var t=ot(It);t!==null;){if(t.callback===null)ha(It);else if(t.startTime<=e)ha(It),t.sortIndex=t.expirationTime,Zl(gt,t);else break;t=ot(It)}}function eo(e){if(mr=!1,ql(e),!fn)if(ot(gt)!==null)fn=!0,no(to);else{var t=ot(It);t!==null&&ro(eo,t.startTime-e)}}function to(e,t){fn=!1,mr&&(mr=!1,Ws(hr),hr=-1),va=!0;var n=Ne;try{for(ql(t),Ye=ot(gt);Ye!==null&&(!(Ye.expirationTime>t)||e&&!Js());){var r=Ye.callback;if(typeof r=="function"){Ye.callback=null,Ne=Ye.priorityLevel;var a=r(Ye.expirationTime<=t);t=Q.unstable_now(),typeof a=="function"?Ye.callback=a:Ye===ot(gt)&&ha(gt),ql(t)}else ha(gt);Ye=ot(gt)}if(Ye!==null)var l=!0;else{var o=ot(It);o!==null&&ro(eo,o.startTime-t),l=!1}return l}finally{Ye=null,Ne=n,va=!1}}var ya=!1,ma=null,hr=-1,Ks=5,Qs=-1;function Js(){return!(Q.unstable_now()-Qs<Ks)}function Gl(){if(ma!==null){var e=Q.unstable_now();Qs=e;var t=!0;try{t=ma(!0,e)}finally{t?pr():(ya=!1,ma=null)}}else ya=!1}var pr;typeof Vs=="function"?pr=function(){Vs(Gl)}:typeof MessageChannel<"u"?(Xl=new MessageChannel,Bs=Xl.port2,Xl.port1.onmessage=Gl,pr=function(){Bs.postMessage(null)}):pr=function(){Hs(Gl,0)};var Xl,Bs;function no(e){ma=e,ya||(ya=!0,pr())}function ro(e,t){hr=Hs(function(){e(Q.unstable_now())},t)}Q.unstable_IdlePriority=5;Q.unstable_ImmediatePriority=1;Q.unstable_LowPriority=4;Q.unstable_NormalPriority=3;Q.unstable_Profiling=null;Q.unstable_UserBlockingPriority=2;Q.unstable_cancelCallback=function(e){e.callback=null};Q.unstable_continueExecution=function(){fn||va||(fn=!0,no(to))};Q.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ks=0<e?Math.floor(1e3/e):5};Q.unstable_getCurrentPriorityLevel=function(){return Ne};Q.unstable_getFirstCallbackNode=function(){return ot(gt)};Q.unstable_next=function(e){switch(Ne){case 1:case 2:case 3:var t=3;break;default:t=Ne}var n=Ne;Ne=t;try{return e()}finally{Ne=n}};Q.unstable_pauseExecution=function(){};Q.unstable_requestPaint=function(){};Q.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=Ne;Ne=e;try{return t()}finally{Ne=n}};Q.unstable_scheduleCallback=function(e,t,n){var r=Q.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return a=n+a,e={id:mp++,callback:t,priorityLevel:e,startTime:n,expirationTime:a,sortIndex:-1},n>r?(e.sortIndex=n,Zl(It,e),ot(gt)===null&&e===ot(It)&&(mr?(Ws(hr),hr=-1):mr=!0,ro(eo,n-r))):(e.sortIndex=a,Zl(gt,e),fn||va||(fn=!0,no(to))),e};Q.unstable_shouldYield=Js;Q.unstable_wrapCallback=function(e){var t=Ne;return function(){var n=Ne;Ne=t;try{return e.apply(this,arguments)}finally{Ne=n}}}});var Xs=dn((Bv,Gs)=>{"use strict";Gs.exports=Ys()});var tf=dn(We=>{"use strict";var hp=fr(),Be=Xs();function R(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ac=new Set,Ir={};function Rn(e,t){Zn(e,t),Zn(e+"Capture",t)}function Zn(e,t){for(Ir[e]=t,e=0;e<t.length;e++)ac.add(t[e])}var bt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),xo=Object.prototype.hasOwnProperty,vp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Zs={},qs={};function yp(e){return xo.call(qs,e)?!0:xo.call(Zs,e)?!1:vp.test(e)?qs[e]=!0:(Zs[e]=!0,!1)}function gp(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function wp(e,t,n,r){if(t===null||typeof t>"u"||gp(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function be(e,t,n,r,a,l,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=o}var ge={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ge[e]=new be(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ge[t]=new be(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ge[e]=new be(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ge[e]=new be(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ge[e]=new be(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ge[e]=new be(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ge[e]=new be(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ge[e]=new be(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ge[e]=new be(e,5,!1,e.toLowerCase(),null,!1,!1)});var wi=/[\-:]([a-z])/g;function _i(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(wi,_i);ge[t]=new be(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(wi,_i);ge[t]=new be(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(wi,_i);ge[t]=new be(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ge[e]=new be(e,1,!1,e.toLowerCase(),null,!1,!1)});ge.xlinkHref=new be("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ge[e]=new be(e,1,!1,e.toLowerCase(),null,!0,!0)});function Ni(e,t,n,r){var a=ge.hasOwnProperty(t)?ge[t]:null;(a!==null?a.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(wp(t,n,a,r)&&(n=null),r||a===null?yp(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(t=a.attributeName,r=a.attributeNamespace,n===null?e.removeAttribute(t):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Lt=hp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ga=Symbol.for("react.element"),Ln=Symbol.for("react.portal"),On=Symbol.for("react.fragment"),Si=Symbol.for("react.strict_mode"),$o=Symbol.for("react.profiler"),lc=Symbol.for("react.provider"),oc=Symbol.for("react.context"),Ei=Symbol.for("react.forward_ref"),Po=Symbol.for("react.suspense"),bo=Symbol.for("react.suspense_list"),ki=Symbol.for("react.memo"),jt=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var ic=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var eu=Symbol.iterator;function vr(e){return e===null||typeof e!="object"?null:(e=eu&&e[eu]||e["@@iterator"],typeof e=="function"?e:null)}var re=Object.assign,ao;function kr(e){if(ao===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);ao=t&&t[1]||""}return`
`+ao+e}var lo=!1;function oo(e,t){if(!e||lo)return"";lo=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var a=u.stack.split(`
`),l=r.stack.split(`
`),o=a.length-1,i=l.length-1;1<=o&&0<=i&&a[o]!==l[i];)i--;for(;1<=o&&0<=i;o--,i--)if(a[o]!==l[i]){if(o!==1||i!==1)do if(o--,i--,0>i||a[o]!==l[i]){var s=`
`+a[o].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=o&&0<=i);break}}}finally{lo=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?kr(e):""}function _p(e){switch(e.tag){case 5:return kr(e.type);case 16:return kr("Lazy");case 13:return kr("Suspense");case 19:return kr("SuspenseList");case 0:case 2:case 15:return e=oo(e.type,!1),e;case 11:return e=oo(e.type.render,!1),e;case 1:return e=oo(e.type,!0),e;default:return""}}function To(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case On:return"Fragment";case Ln:return"Portal";case $o:return"Profiler";case Si:return"StrictMode";case Po:return"Suspense";case bo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case oc:return(e.displayName||"Context")+".Consumer";case lc:return(e._context.displayName||"Context")+".Provider";case Ei:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ki:return t=e.displayName||null,t!==null?t:To(e.type)||"Memo";case jt:t=e._payload,e=e._init;try{return To(e(t))}catch{}}return null}function Np(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return To(t);case 8:return t===Si?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function qt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function sc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Sp(e){var t=sc(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,l=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(o){r=""+o,l.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function wa(e){e._valueTracker||(e._valueTracker=Sp(e))}function uc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=sc(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Qa(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Do(e,t){var n=t.checked;return re({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function tu(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=qt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function cc(e,t){t=t.checked,t!=null&&Ni(e,"checked",t,!1)}function Fo(e,t){cc(e,t);var n=qt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Lo(e,t.type,n):t.hasOwnProperty("defaultValue")&&Lo(e,t.type,qt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function nu(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Lo(e,t,n){(t!=="number"||Qa(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Rr=Array.isArray;function Kn(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+qt(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,r&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function Oo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(R(91));return re({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ru(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(R(92));if(Rr(n)){if(1<n.length)throw Error(R(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:qt(n)}}function dc(e,t){var n=qt(t.value),r=qt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function au(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function fc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Uo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?fc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var _a,pc=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,a)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(_a=_a||document.createElement("div"),_a.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=_a.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Ar(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var $r={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ep=["Webkit","ms","Moz","O"];Object.keys($r).forEach(function(e){Ep.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),$r[t]=$r[e]})});function mc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||$r.hasOwnProperty(e)&&$r[e]?(""+t).trim():t+"px"}function hc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,a=mc(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,a):e[n]=a}}var kp=re({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Io(e,t){if(t){if(kp[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(R(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(R(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(R(61))}if(t.style!=null&&typeof t.style!="object")throw Error(R(62))}}function Ao(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var jo=null;function Ri(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Mo=null,Qn=null,Jn=null;function lu(e){if(e=na(e)){if(typeof Mo!="function")throw Error(R(280));var t=e.stateNode;t&&(t=Nl(t),Mo(e.stateNode,e.type,t))}}function vc(e){Qn?Jn?Jn.push(e):Jn=[e]:Qn=e}function yc(){if(Qn){var e=Qn,t=Jn;if(Jn=Qn=null,lu(e),t)for(e=0;e<t.length;e++)lu(t[e])}}function gc(e,t){return e(t)}function wc(){}var io=!1;function _c(e,t,n){if(io)return e(t,n);io=!0;try{return gc(e,t,n)}finally{io=!1,(Qn!==null||Jn!==null)&&(wc(),yc())}}function jr(e,t){var n=e.stateNode;if(n===null)return null;var r=Nl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(R(231,t,typeof n));return n}var zo=!1;if(bt)try{Dn={},Object.defineProperty(Dn,"passive",{get:function(){zo=!0}}),window.addEventListener("test",Dn,Dn),window.removeEventListener("test",Dn,Dn)}catch{zo=!1}var Dn;function Rp(e,t,n,r,a,l,o,i,s){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(m){this.onError(m)}}var Pr=!1,Ja=null,Ya=!1,Vo=null,Cp={onError:function(e){Pr=!0,Ja=e}};function xp(e,t,n,r,a,l,o,i,s){Pr=!1,Ja=null,Rp.apply(Cp,arguments)}function $p(e,t,n,r,a,l,o,i,s){if(xp.apply(this,arguments),Pr){if(Pr){var u=Ja;Pr=!1,Ja=null}else throw Error(R(198));Ya||(Ya=!0,Vo=u)}}function Cn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Nc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ou(e){if(Cn(e)!==e)throw Error(R(188))}function Pp(e){var t=e.alternate;if(!t){if(t=Cn(e),t===null)throw Error(R(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var l=a.alternate;if(l===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===l.child){for(l=a.child;l;){if(l===n)return ou(a),e;if(l===r)return ou(a),t;l=l.sibling}throw Error(R(188))}if(n.return!==r.return)n=a,r=l;else{for(var o=!1,i=a.child;i;){if(i===n){o=!0,n=a,r=l;break}if(i===r){o=!0,r=a,n=l;break}i=i.sibling}if(!o){for(i=l.child;i;){if(i===n){o=!0,n=l,r=a;break}if(i===r){o=!0,r=l,n=a;break}i=i.sibling}if(!o)throw Error(R(189))}}if(n.alternate!==r)throw Error(R(190))}if(n.tag!==3)throw Error(R(188));return n.stateNode.current===n?e:t}function Sc(e){return e=Pp(e),e!==null?Ec(e):null}function Ec(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Ec(e);if(t!==null)return t;e=e.sibling}return null}var kc=Be.unstable_scheduleCallback,iu=Be.unstable_cancelCallback,bp=Be.unstable_shouldYield,Tp=Be.unstable_requestPaint,oe=Be.unstable_now,Dp=Be.unstable_getCurrentPriorityLevel,Ci=Be.unstable_ImmediatePriority,Rc=Be.unstable_UserBlockingPriority,Ga=Be.unstable_NormalPriority,Fp=Be.unstable_LowPriority,Cc=Be.unstable_IdlePriority,yl=null,St=null;function Lp(e){if(St&&typeof St.onCommitFiberRoot=="function")try{St.onCommitFiberRoot(yl,e,void 0,(e.current.flags&128)===128)}catch{}}var dt=Math.clz32?Math.clz32:Ip,Op=Math.log,Up=Math.LN2;function Ip(e){return e>>>=0,e===0?32:31-(Op(e)/Up|0)|0}var Na=64,Sa=4194304;function Cr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Xa(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,a=e.suspendedLanes,l=e.pingedLanes,o=n&268435455;if(o!==0){var i=o&~a;i!==0?r=Cr(i):(l&=o,l!==0&&(r=Cr(l)))}else o=n&~a,o!==0?r=Cr(o):l!==0&&(r=Cr(l));if(r===0)return 0;if(t!==0&&t!==r&&(t&a)===0&&(a=r&-r,l=t&-t,a>=l||a===16&&(l&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-dt(t),a=1<<n,r|=e[n],t&=~a;return r}function Ap(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function jp(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,l=e.pendingLanes;0<l;){var o=31-dt(l),i=1<<o,s=a[o];s===-1?((i&n)===0||(i&r)!==0)&&(a[o]=Ap(i,t)):s<=t&&(e.expiredLanes|=i),l&=~i}}function Bo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function xc(){var e=Na;return Na<<=1,(Na&4194240)===0&&(Na=64),e}function so(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ea(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-dt(t),e[t]=n}function Mp(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-dt(n),l=1<<a;t[a]=0,r[a]=-1,e[a]=-1,n&=~l}}function xi(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-dt(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}var H=0;function $c(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Pc,$i,bc,Tc,Dc,Ho=!1,Ea=[],Wt=null,Kt=null,Qt=null,Mr=new Map,zr=new Map,zt=[],zp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function su(e,t){switch(e){case"focusin":case"focusout":Wt=null;break;case"dragenter":case"dragleave":Kt=null;break;case"mouseover":case"mouseout":Qt=null;break;case"pointerover":case"pointerout":Mr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":zr.delete(t.pointerId)}}function yr(e,t,n,r,a,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:l,targetContainers:[a]},t!==null&&(t=na(t),t!==null&&$i(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function Vp(e,t,n,r,a){switch(t){case"focusin":return Wt=yr(Wt,e,t,n,r,a),!0;case"dragenter":return Kt=yr(Kt,e,t,n,r,a),!0;case"mouseover":return Qt=yr(Qt,e,t,n,r,a),!0;case"pointerover":var l=a.pointerId;return Mr.set(l,yr(Mr.get(l)||null,e,t,n,r,a)),!0;case"gotpointercapture":return l=a.pointerId,zr.set(l,yr(zr.get(l)||null,e,t,n,r,a)),!0}return!1}function Fc(e){var t=hn(e.target);if(t!==null){var n=Cn(t);if(n!==null){if(t=n.tag,t===13){if(t=Nc(n),t!==null){e.blockedOn=t,Dc(e.priority,function(){bc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ia(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Wo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);jo=r,n.target.dispatchEvent(r),jo=null}else return t=na(n),t!==null&&$i(t),e.blockedOn=n,!1;t.shift()}return!0}function uu(e,t,n){Ia(e)&&n.delete(t)}function Bp(){Ho=!1,Wt!==null&&Ia(Wt)&&(Wt=null),Kt!==null&&Ia(Kt)&&(Kt=null),Qt!==null&&Ia(Qt)&&(Qt=null),Mr.forEach(uu),zr.forEach(uu)}function gr(e,t){e.blockedOn===t&&(e.blockedOn=null,Ho||(Ho=!0,Be.unstable_scheduleCallback(Be.unstable_NormalPriority,Bp)))}function Vr(e){function t(a){return gr(a,e)}if(0<Ea.length){gr(Ea[0],e);for(var n=1;n<Ea.length;n++){var r=Ea[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Wt!==null&&gr(Wt,e),Kt!==null&&gr(Kt,e),Qt!==null&&gr(Qt,e),Mr.forEach(t),zr.forEach(t),n=0;n<zt.length;n++)r=zt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<zt.length&&(n=zt[0],n.blockedOn===null);)Fc(n),n.blockedOn===null&&zt.shift()}var Yn=Lt.ReactCurrentBatchConfig,Za=!0;function Hp(e,t,n,r){var a=H,l=Yn.transition;Yn.transition=null;try{H=1,Pi(e,t,n,r)}finally{H=a,Yn.transition=l}}function Wp(e,t,n,r){var a=H,l=Yn.transition;Yn.transition=null;try{H=4,Pi(e,t,n,r)}finally{H=a,Yn.transition=l}}function Pi(e,t,n,r){if(Za){var a=Wo(e,t,n,r);if(a===null)vo(e,t,r,qa,n),su(e,r);else if(Vp(a,e,t,n,r))r.stopPropagation();else if(su(e,r),t&4&&-1<zp.indexOf(e)){for(;a!==null;){var l=na(a);if(l!==null&&Pc(l),l=Wo(e,t,n,r),l===null&&vo(e,t,r,qa,n),l===a)break;a=l}a!==null&&r.stopPropagation()}else vo(e,t,r,null,n)}}var qa=null;function Wo(e,t,n,r){if(qa=null,e=Ri(r),e=hn(e),e!==null)if(t=Cn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Nc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return qa=e,null}function Lc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Dp()){case Ci:return 1;case Rc:return 4;case Ga:case Fp:return 16;case Cc:return 536870912;default:return 16}default:return 16}}var Bt=null,bi=null,Aa=null;function Oc(){if(Aa)return Aa;var e,t=bi,n=t.length,r,a="value"in Bt?Bt.value:Bt.textContent,l=a.length;for(e=0;e<n&&t[e]===a[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===a[l-r];r++);return Aa=a.slice(e,1<r?1-r:void 0)}function ja(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ka(){return!0}function cu(){return!1}function He(e){function t(n,r,a,l,o){this._reactName=n,this._targetInst=a,this.type=r,this.nativeEvent=l,this.target=o,this.currentTarget=null;for(var i in e)e.hasOwnProperty(i)&&(n=e[i],this[i]=n?n(l):l[i]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?ka:cu,this.isPropagationStopped=cu,this}return re(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ka)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ka)},persist:function(){},isPersistent:ka}),t}var lr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ti=He(lr),ta=re({},lr,{view:0,detail:0}),Kp=He(ta),uo,co,wr,gl=re({},ta,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Di,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==wr&&(wr&&e.type==="mousemove"?(uo=e.screenX-wr.screenX,co=e.screenY-wr.screenY):co=uo=0,wr=e),uo)},movementY:function(e){return"movementY"in e?e.movementY:co}}),du=He(gl),Qp=re({},gl,{dataTransfer:0}),Jp=He(Qp),Yp=re({},ta,{relatedTarget:0}),fo=He(Yp),Gp=re({},lr,{animationName:0,elapsedTime:0,pseudoElement:0}),Xp=He(Gp),Zp=re({},lr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),qp=He(Zp),em=re({},lr,{data:0}),fu=He(em),tm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},nm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},rm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function am(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=rm[e])?!!t[e]:!1}function Di(){return am}var lm=re({},ta,{key:function(e){if(e.key){var t=tm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ja(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?nm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Di,charCode:function(e){return e.type==="keypress"?ja(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ja(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),om=He(lm),im=re({},gl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),pu=He(im),sm=re({},ta,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Di}),um=He(sm),cm=re({},lr,{propertyName:0,elapsedTime:0,pseudoElement:0}),dm=He(cm),fm=re({},gl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),pm=He(fm),mm=[9,13,27,32],Fi=bt&&"CompositionEvent"in window,br=null;bt&&"documentMode"in document&&(br=document.documentMode);var hm=bt&&"TextEvent"in window&&!br,Uc=bt&&(!Fi||br&&8<br&&11>=br),mu=" ",hu=!1;function Ic(e,t){switch(e){case"keyup":return mm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ac(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Un=!1;function vm(e,t){switch(e){case"compositionend":return Ac(t);case"keypress":return t.which!==32?null:(hu=!0,mu);case"textInput":return e=t.data,e===mu&&hu?null:e;default:return null}}function ym(e,t){if(Un)return e==="compositionend"||!Fi&&Ic(e,t)?(e=Oc(),Aa=bi=Bt=null,Un=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Uc&&t.locale!=="ko"?null:t.data;default:return null}}var gm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function vu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!gm[e.type]:t==="textarea"}function jc(e,t,n,r){vc(r),t=el(t,"onChange"),0<t.length&&(n=new Ti("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Tr=null,Br=null;function wm(e){Gc(e,0)}function wl(e){var t=jn(e);if(uc(t))return e}function _m(e,t){if(e==="change")return t}var Mc=!1;bt&&(bt?(Ca="oninput"in document,Ca||(po=document.createElement("div"),po.setAttribute("oninput","return;"),Ca=typeof po.oninput=="function"),Ra=Ca):Ra=!1,Mc=Ra&&(!document.documentMode||9<document.documentMode));var Ra,Ca,po;function yu(){Tr&&(Tr.detachEvent("onpropertychange",zc),Br=Tr=null)}function zc(e){if(e.propertyName==="value"&&wl(Br)){var t=[];jc(t,Br,e,Ri(e)),_c(wm,t)}}function Nm(e,t,n){e==="focusin"?(yu(),Tr=t,Br=n,Tr.attachEvent("onpropertychange",zc)):e==="focusout"&&yu()}function Sm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return wl(Br)}function Em(e,t){if(e==="click")return wl(t)}function km(e,t){if(e==="input"||e==="change")return wl(t)}function Rm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var pt=typeof Object.is=="function"?Object.is:Rm;function Hr(e,t){if(pt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!xo.call(t,a)||!pt(e[a],t[a]))return!1}return!0}function gu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function wu(e,t){var n=gu(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=gu(n)}}function Vc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Vc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Bc(){for(var e=window,t=Qa();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Qa(e.document)}return t}function Li(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Cm(e){var t=Bc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Vc(n.ownerDocument.documentElement,n)){if(r!==null&&Li(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,l=Math.min(r.start,a);r=r.end===void 0?l:Math.min(r.end,a),!e.extend&&l>r&&(a=r,r=l,l=a),a=wu(n,l);var o=wu(n,r);a&&o&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),l>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var xm=bt&&"documentMode"in document&&11>=document.documentMode,In=null,Ko=null,Dr=null,Qo=!1;function _u(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Qo||In==null||In!==Qa(r)||(r=In,"selectionStart"in r&&Li(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Dr&&Hr(Dr,r)||(Dr=r,r=el(Ko,"onSelect"),0<r.length&&(t=new Ti("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=In)))}function xa(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var An={animationend:xa("Animation","AnimationEnd"),animationiteration:xa("Animation","AnimationIteration"),animationstart:xa("Animation","AnimationStart"),transitionend:xa("Transition","TransitionEnd")},mo={},Hc={};bt&&(Hc=document.createElement("div").style,"AnimationEvent"in window||(delete An.animationend.animation,delete An.animationiteration.animation,delete An.animationstart.animation),"TransitionEvent"in window||delete An.transitionend.transition);function _l(e){if(mo[e])return mo[e];if(!An[e])return e;var t=An[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Hc)return mo[e]=t[n];return e}var Wc=_l("animationend"),Kc=_l("animationiteration"),Qc=_l("animationstart"),Jc=_l("transitionend"),Yc=new Map,Nu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function tn(e,t){Yc.set(e,t),Rn(t,[e])}for($a=0;$a<Nu.length;$a++)Pa=Nu[$a],Su=Pa.toLowerCase(),Eu=Pa[0].toUpperCase()+Pa.slice(1),tn(Su,"on"+Eu);var Pa,Su,Eu,$a;tn(Wc,"onAnimationEnd");tn(Kc,"onAnimationIteration");tn(Qc,"onAnimationStart");tn("dblclick","onDoubleClick");tn("focusin","onFocus");tn("focusout","onBlur");tn(Jc,"onTransitionEnd");Zn("onMouseEnter",["mouseout","mouseover"]);Zn("onMouseLeave",["mouseout","mouseover"]);Zn("onPointerEnter",["pointerout","pointerover"]);Zn("onPointerLeave",["pointerout","pointerover"]);Rn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Rn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Rn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Rn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Rn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Rn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var xr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),$m=new Set("cancel close invalid load scroll toggle".split(" ").concat(xr));function ku(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,$p(r,t,void 0,e),e.currentTarget=null}function Gc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var l=void 0;if(t)for(var o=r.length-1;0<=o;o--){var i=r[o],s=i.instance,u=i.currentTarget;if(i=i.listener,s!==l&&a.isPropagationStopped())break e;ku(a,i,u),l=s}else for(o=0;o<r.length;o++){if(i=r[o],s=i.instance,u=i.currentTarget,i=i.listener,s!==l&&a.isPropagationStopped())break e;ku(a,i,u),l=s}}}if(Ya)throw e=Vo,Ya=!1,Vo=null,e}function Y(e,t){var n=t[Zo];n===void 0&&(n=t[Zo]=new Set);var r=e+"__bubble";n.has(r)||(Xc(t,e,2,!1),n.add(r))}function ho(e,t,n){var r=0;t&&(r|=4),Xc(n,e,r,t)}var ba="_reactListening"+Math.random().toString(36).slice(2);function Wr(e){if(!e[ba]){e[ba]=!0,ac.forEach(function(n){n!=="selectionchange"&&($m.has(n)||ho(n,!1,e),ho(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ba]||(t[ba]=!0,ho("selectionchange",!1,t))}}function Xc(e,t,n,r){switch(Lc(t)){case 1:var a=Hp;break;case 4:a=Wp;break;default:a=Pi}n=a.bind(null,t,n,e),a=void 0,!zo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),r?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function vo(e,t,n,r,a){var l=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var i=r.stateNode.containerInfo;if(i===a||i.nodeType===8&&i.parentNode===a)break;if(o===4)for(o=r.return;o!==null;){var s=o.tag;if((s===3||s===4)&&(s=o.stateNode.containerInfo,s===a||s.nodeType===8&&s.parentNode===a))return;o=o.return}for(;i!==null;){if(o=hn(i),o===null)return;if(s=o.tag,s===5||s===6){r=l=o;continue e}i=i.parentNode}}r=r.return}_c(function(){var u=l,m=Ri(n),h=[];e:{var v=Yc.get(e);if(v!==void 0){var S=Ti,E=e;switch(e){case"keypress":if(ja(n)===0)break e;case"keydown":case"keyup":S=om;break;case"focusin":E="focus",S=fo;break;case"focusout":E="blur",S=fo;break;case"beforeblur":case"afterblur":S=fo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":S=du;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":S=Jp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":S=um;break;case Wc:case Kc:case Qc:S=Xp;break;case Jc:S=dm;break;case"scroll":S=Kp;break;case"wheel":S=pm;break;case"copy":case"cut":case"paste":S=qp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":S=pu}var w=(t&4)!==0,N=!w&&e==="scroll",d=w?v!==null?v+"Capture":null:v;w=[];for(var c=u,f;c!==null;){f=c;var y=f.stateNode;if(f.tag===5&&y!==null&&(f=y,d!==null&&(y=jr(c,d),y!=null&&w.push(Kr(c,y,f)))),N)break;c=c.return}0<w.length&&(v=new S(v,E,null,n,m),h.push({event:v,listeners:w}))}}if((t&7)===0){e:{if(v=e==="mouseover"||e==="pointerover",S=e==="mouseout"||e==="pointerout",v&&n!==jo&&(E=n.relatedTarget||n.fromElement)&&(hn(E)||E[Tt]))break e;if((S||v)&&(v=m.window===m?m:(v=m.ownerDocument)?v.defaultView||v.parentWindow:window,S?(E=n.relatedTarget||n.toElement,S=u,E=E?hn(E):null,E!==null&&(N=Cn(E),E!==N||E.tag!==5&&E.tag!==6)&&(E=null)):(S=null,E=u),S!==E)){if(w=du,y="onMouseLeave",d="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(w=pu,y="onPointerLeave",d="onPointerEnter",c="pointer"),N=S==null?v:jn(S),f=E==null?v:jn(E),v=new w(y,c+"leave",S,n,m),v.target=N,v.relatedTarget=f,y=null,hn(m)===u&&(w=new w(d,c+"enter",E,n,m),w.target=f,w.relatedTarget=N,y=w),N=y,S&&E)t:{for(w=S,d=E,c=0,f=w;f;f=Fn(f))c++;for(f=0,y=d;y;y=Fn(y))f++;for(;0<c-f;)w=Fn(w),c--;for(;0<f-c;)d=Fn(d),f--;for(;c--;){if(w===d||d!==null&&w===d.alternate)break t;w=Fn(w),d=Fn(d)}w=null}else w=null;S!==null&&Ru(h,v,S,w,!1),E!==null&&N!==null&&Ru(h,N,E,w,!0)}}e:{if(v=u?jn(u):window,S=v.nodeName&&v.nodeName.toLowerCase(),S==="select"||S==="input"&&v.type==="file")var x=_m;else if(vu(v))if(Mc)x=km;else{x=Sm;var P=Nm}else(S=v.nodeName)&&S.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(x=Em);if(x&&(x=x(e,u))){jc(h,x,n,m);break e}P&&P(e,v,u),e==="focusout"&&(P=v._wrapperState)&&P.controlled&&v.type==="number"&&Lo(v,"number",v.value)}switch(P=u?jn(u):window,e){case"focusin":(vu(P)||P.contentEditable==="true")&&(In=P,Ko=u,Dr=null);break;case"focusout":Dr=Ko=In=null;break;case"mousedown":Qo=!0;break;case"contextmenu":case"mouseup":case"dragend":Qo=!1,_u(h,n,m);break;case"selectionchange":if(xm)break;case"keydown":case"keyup":_u(h,n,m)}var F;if(Fi)e:{switch(e){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else Un?Ic(e,n)&&(T="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(T="onCompositionStart");T&&(Uc&&n.locale!=="ko"&&(Un||T!=="onCompositionStart"?T==="onCompositionEnd"&&Un&&(F=Oc()):(Bt=m,bi="value"in Bt?Bt.value:Bt.textContent,Un=!0)),P=el(u,T),0<P.length&&(T=new fu(T,e,null,n,m),h.push({event:T,listeners:P}),F?T.data=F:(F=Ac(n),F!==null&&(T.data=F)))),(F=hm?vm(e,n):ym(e,n))&&(u=el(u,"onBeforeInput"),0<u.length&&(m=new fu("onBeforeInput","beforeinput",null,n,m),h.push({event:m,listeners:u}),m.data=F))}Gc(h,t)})}function Kr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function el(e,t){for(var n=t+"Capture",r=[];e!==null;){var a=e,l=a.stateNode;a.tag===5&&l!==null&&(a=l,l=jr(e,n),l!=null&&r.unshift(Kr(e,l,a)),l=jr(e,t),l!=null&&r.push(Kr(e,l,a))),e=e.return}return r}function Fn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ru(e,t,n,r,a){for(var l=t._reactName,o=[];n!==null&&n!==r;){var i=n,s=i.alternate,u=i.stateNode;if(s!==null&&s===r)break;i.tag===5&&u!==null&&(i=u,a?(s=jr(n,l),s!=null&&o.unshift(Kr(n,s,i))):a||(s=jr(n,l),s!=null&&o.push(Kr(n,s,i)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Pm=/\r\n?/g,bm=/\u0000|\uFFFD/g;function Cu(e){return(typeof e=="string"?e:""+e).replace(Pm,`
`).replace(bm,"")}function Ta(e,t,n){if(t=Cu(t),Cu(e)!==t&&n)throw Error(R(425))}function tl(){}var Jo=null,Yo=null;function Go(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Xo=typeof setTimeout=="function"?setTimeout:void 0,Tm=typeof clearTimeout=="function"?clearTimeout:void 0,xu=typeof Promise=="function"?Promise:void 0,Dm=typeof queueMicrotask=="function"?queueMicrotask:typeof xu<"u"?function(e){return xu.resolve(null).then(e).catch(Fm)}:Xo;function Fm(e){setTimeout(function(){throw e})}function yo(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(r===0){e.removeChild(a),Vr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=a}while(n);Vr(t)}function Jt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function $u(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var or=Math.random().toString(36).slice(2),Nt="__reactFiber$"+or,Qr="__reactProps$"+or,Tt="__reactContainer$"+or,Zo="__reactEvents$"+or,Lm="__reactListeners$"+or,Om="__reactHandles$"+or;function hn(e){var t=e[Nt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Tt]||n[Nt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=$u(e);e!==null;){if(n=e[Nt])return n;e=$u(e)}return t}e=n,n=e.parentNode}return null}function na(e){return e=e[Nt]||e[Tt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function jn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(R(33))}function Nl(e){return e[Qr]||null}var qo=[],Mn=-1;function nn(e){return{current:e}}function G(e){0>Mn||(e.current=qo[Mn],qo[Mn]=null,Mn--)}function J(e,t){Mn++,qo[Mn]=e.current,e.current=t}var en={},Re=nn(en),Le=nn(!1),_n=en;function qn(e,t){var n=e.type.contextTypes;if(!n)return en;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a={},l;for(l in n)a[l]=t[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function Oe(e){return e=e.childContextTypes,e!=null}function nl(){G(Le),G(Re)}function Pu(e,t,n){if(Re.current!==en)throw Error(R(168));J(Re,t),J(Le,n)}function Zc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var a in r)if(!(a in t))throw Error(R(108,Np(e)||"Unknown",a));return re({},n,r)}function rl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||en,_n=Re.current,J(Re,e),J(Le,Le.current),!0}function bu(e,t,n){var r=e.stateNode;if(!r)throw Error(R(169));n?(e=Zc(e,t,_n),r.__reactInternalMemoizedMergedChildContext=e,G(Le),G(Re),J(Re,e)):G(Le),J(Le,n)}var Ct=null,Sl=!1,go=!1;function qc(e){Ct===null?Ct=[e]:Ct.push(e)}function Um(e){Sl=!0,qc(e)}function rn(){if(!go&&Ct!==null){go=!0;var e=0,t=H;try{var n=Ct;for(H=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Ct=null,Sl=!1}catch(a){throw Ct!==null&&(Ct=Ct.slice(e+1)),kc(Ci,rn),a}finally{H=t,go=!1}}return null}var zn=[],Vn=0,al=null,ll=0,Ge=[],Xe=0,Nn=null,xt=1,$t="";function pn(e,t){zn[Vn++]=ll,zn[Vn++]=al,al=e,ll=t}function ed(e,t,n){Ge[Xe++]=xt,Ge[Xe++]=$t,Ge[Xe++]=Nn,Nn=e;var r=xt;e=$t;var a=32-dt(r)-1;r&=~(1<<a),n+=1;var l=32-dt(t)+a;if(30<l){var o=a-a%5;l=(r&(1<<o)-1).toString(32),r>>=o,a-=o,xt=1<<32-dt(t)+a|n<<a|r,$t=l+e}else xt=1<<l|n<<a|r,$t=e}function Oi(e){e.return!==null&&(pn(e,1),ed(e,1,0))}function Ui(e){for(;e===al;)al=zn[--Vn],zn[Vn]=null,ll=zn[--Vn],zn[Vn]=null;for(;e===Nn;)Nn=Ge[--Xe],Ge[Xe]=null,$t=Ge[--Xe],Ge[Xe]=null,xt=Ge[--Xe],Ge[Xe]=null}var Ve=null,ze=null,q=!1,ct=null;function td(e,t){var n=Ze(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Tu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ve=e,ze=Jt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ve=e,ze=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Nn!==null?{id:xt,overflow:$t}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ze(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ve=e,ze=null,!0):!1;default:return!1}}function ei(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ti(e){if(q){var t=ze;if(t){var n=t;if(!Tu(e,t)){if(ei(e))throw Error(R(418));t=Jt(n.nextSibling);var r=Ve;t&&Tu(e,t)?td(r,n):(e.flags=e.flags&-4097|2,q=!1,Ve=e)}}else{if(ei(e))throw Error(R(418));e.flags=e.flags&-4097|2,q=!1,Ve=e}}}function Du(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ve=e}function Da(e){if(e!==Ve)return!1;if(!q)return Du(e),q=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Go(e.type,e.memoizedProps)),t&&(t=ze)){if(ei(e))throw nd(),Error(R(418));for(;t;)td(e,t),t=Jt(t.nextSibling)}if(Du(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(R(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){ze=Jt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}ze=null}}else ze=Ve?Jt(e.stateNode.nextSibling):null;return!0}function nd(){for(var e=ze;e;)e=Jt(e.nextSibling)}function er(){ze=Ve=null,q=!1}function Ii(e){ct===null?ct=[e]:ct.push(e)}var Im=Lt.ReactCurrentBatchConfig;function _r(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(R(309));var r=n.stateNode}if(!r)throw Error(R(147,e));var a=r,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(o){var i=a.refs;o===null?delete i[l]:i[l]=o},t._stringRef=l,t)}if(typeof e!="string")throw Error(R(284));if(!n._owner)throw Error(R(290,e))}return e}function Fa(e,t){throw e=Object.prototype.toString.call(t),Error(R(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Fu(e){var t=e._init;return t(e._payload)}function rd(e){function t(d,c){if(e){var f=d.deletions;f===null?(d.deletions=[c],d.flags|=16):f.push(c)}}function n(d,c){if(!e)return null;for(;c!==null;)t(d,c),c=c.sibling;return null}function r(d,c){for(d=new Map;c!==null;)c.key!==null?d.set(c.key,c):d.set(c.index,c),c=c.sibling;return d}function a(d,c){return d=Zt(d,c),d.index=0,d.sibling=null,d}function l(d,c,f){return d.index=f,e?(f=d.alternate,f!==null?(f=f.index,f<c?(d.flags|=2,c):f):(d.flags|=2,c)):(d.flags|=1048576,c)}function o(d){return e&&d.alternate===null&&(d.flags|=2),d}function i(d,c,f,y){return c===null||c.tag!==6?(c=Ro(f,d.mode,y),c.return=d,c):(c=a(c,f),c.return=d,c)}function s(d,c,f,y){var x=f.type;return x===On?m(d,c,f.props.children,y,f.key):c!==null&&(c.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===jt&&Fu(x)===c.type)?(y=a(c,f.props),y.ref=_r(d,c,f),y.return=d,y):(y=Ka(f.type,f.key,f.props,null,d.mode,y),y.ref=_r(d,c,f),y.return=d,y)}function u(d,c,f,y){return c===null||c.tag!==4||c.stateNode.containerInfo!==f.containerInfo||c.stateNode.implementation!==f.implementation?(c=Co(f,d.mode,y),c.return=d,c):(c=a(c,f.children||[]),c.return=d,c)}function m(d,c,f,y,x){return c===null||c.tag!==7?(c=wn(f,d.mode,y,x),c.return=d,c):(c=a(c,f),c.return=d,c)}function h(d,c,f){if(typeof c=="string"&&c!==""||typeof c=="number")return c=Ro(""+c,d.mode,f),c.return=d,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case ga:return f=Ka(c.type,c.key,c.props,null,d.mode,f),f.ref=_r(d,null,c),f.return=d,f;case Ln:return c=Co(c,d.mode,f),c.return=d,c;case jt:var y=c._init;return h(d,y(c._payload),f)}if(Rr(c)||vr(c))return c=wn(c,d.mode,f,null),c.return=d,c;Fa(d,c)}return null}function v(d,c,f,y){var x=c!==null?c.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return x!==null?null:i(d,c,""+f,y);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case ga:return f.key===x?s(d,c,f,y):null;case Ln:return f.key===x?u(d,c,f,y):null;case jt:return x=f._init,v(d,c,x(f._payload),y)}if(Rr(f)||vr(f))return x!==null?null:m(d,c,f,y,null);Fa(d,f)}return null}function S(d,c,f,y,x){if(typeof y=="string"&&y!==""||typeof y=="number")return d=d.get(f)||null,i(c,d,""+y,x);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case ga:return d=d.get(y.key===null?f:y.key)||null,s(c,d,y,x);case Ln:return d=d.get(y.key===null?f:y.key)||null,u(c,d,y,x);case jt:var P=y._init;return S(d,c,f,P(y._payload),x)}if(Rr(y)||vr(y))return d=d.get(f)||null,m(c,d,y,x,null);Fa(c,y)}return null}function E(d,c,f,y){for(var x=null,P=null,F=c,T=c=0,A=null;F!==null&&T<f.length;T++){F.index>T?(A=F,F=null):A=F.sibling;var L=v(d,F,f[T],y);if(L===null){F===null&&(F=A);break}e&&F&&L.alternate===null&&t(d,F),c=l(L,c,T),P===null?x=L:P.sibling=L,P=L,F=A}if(T===f.length)return n(d,F),q&&pn(d,T),x;if(F===null){for(;T<f.length;T++)F=h(d,f[T],y),F!==null&&(c=l(F,c,T),P===null?x=F:P.sibling=F,P=F);return q&&pn(d,T),x}for(F=r(d,F);T<f.length;T++)A=S(F,d,T,f[T],y),A!==null&&(e&&A.alternate!==null&&F.delete(A.key===null?T:A.key),c=l(A,c,T),P===null?x=A:P.sibling=A,P=A);return e&&F.forEach(function(Z){return t(d,Z)}),q&&pn(d,T),x}function w(d,c,f,y){var x=vr(f);if(typeof x!="function")throw Error(R(150));if(f=x.call(f),f==null)throw Error(R(151));for(var P=x=null,F=c,T=c=0,A=null,L=f.next();F!==null&&!L.done;T++,L=f.next()){F.index>T?(A=F,F=null):A=F.sibling;var Z=v(d,F,L.value,y);if(Z===null){F===null&&(F=A);break}e&&F&&Z.alternate===null&&t(d,F),c=l(Z,c,T),P===null?x=Z:P.sibling=Z,P=Z,F=A}if(L.done)return n(d,F),q&&pn(d,T),x;if(F===null){for(;!L.done;T++,L=f.next())L=h(d,L.value,y),L!==null&&(c=l(L,c,T),P===null?x=L:P.sibling=L,P=L);return q&&pn(d,T),x}for(F=r(d,F);!L.done;T++,L=f.next())L=S(F,d,T,L.value,y),L!==null&&(e&&L.alternate!==null&&F.delete(L.key===null?T:L.key),c=l(L,c,T),P===null?x=L:P.sibling=L,P=L);return e&&F.forEach(function(Ke){return t(d,Ke)}),q&&pn(d,T),x}function N(d,c,f,y){if(typeof f=="object"&&f!==null&&f.type===On&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case ga:e:{for(var x=f.key,P=c;P!==null;){if(P.key===x){if(x=f.type,x===On){if(P.tag===7){n(d,P.sibling),c=a(P,f.props.children),c.return=d,d=c;break e}}else if(P.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===jt&&Fu(x)===P.type){n(d,P.sibling),c=a(P,f.props),c.ref=_r(d,P,f),c.return=d,d=c;break e}n(d,P);break}else t(d,P);P=P.sibling}f.type===On?(c=wn(f.props.children,d.mode,y,f.key),c.return=d,d=c):(y=Ka(f.type,f.key,f.props,null,d.mode,y),y.ref=_r(d,c,f),y.return=d,d=y)}return o(d);case Ln:e:{for(P=f.key;c!==null;){if(c.key===P)if(c.tag===4&&c.stateNode.containerInfo===f.containerInfo&&c.stateNode.implementation===f.implementation){n(d,c.sibling),c=a(c,f.children||[]),c.return=d,d=c;break e}else{n(d,c);break}else t(d,c);c=c.sibling}c=Co(f,d.mode,y),c.return=d,d=c}return o(d);case jt:return P=f._init,N(d,c,P(f._payload),y)}if(Rr(f))return E(d,c,f,y);if(vr(f))return w(d,c,f,y);Fa(d,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,c!==null&&c.tag===6?(n(d,c.sibling),c=a(c,f),c.return=d,d=c):(n(d,c),c=Ro(f,d.mode,y),c.return=d,d=c),o(d)):n(d,c)}return N}var tr=rd(!0),ad=rd(!1),ol=nn(null),il=null,Bn=null,Ai=null;function ji(){Ai=Bn=il=null}function Mi(e){var t=ol.current;G(ol),e._currentValue=t}function ni(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Gn(e,t){il=e,Ai=Bn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Fe=!0),e.firstContext=null)}function et(e){var t=e._currentValue;if(Ai!==e)if(e={context:e,memoizedValue:t,next:null},Bn===null){if(il===null)throw Error(R(308));Bn=e,il.dependencies={lanes:0,firstContext:e}}else Bn=Bn.next=e;return t}var vn=null;function zi(e){vn===null?vn=[e]:vn.push(e)}function ld(e,t,n,r){var a=t.interleaved;return a===null?(n.next=n,zi(t)):(n.next=a.next,a.next=n),t.interleaved=n,Dt(e,r)}function Dt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Mt=!1;function Vi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function od(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Pt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Yt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(j&2)!==0){var a=r.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),r.pending=t,Dt(e,n)}return a=r.interleaved,a===null?(t.next=t,zi(r)):(t.next=a.next,a.next=t),r.interleaved=t,Dt(e,n)}function Ma(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,xi(e,n)}}function Lu(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var a=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};l===null?a=l=o:l=l.next=o,n=n.next}while(n!==null);l===null?a=l=t:l=l.next=t}else a=l=t;n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function sl(e,t,n,r){var a=e.updateQueue;Mt=!1;var l=a.firstBaseUpdate,o=a.lastBaseUpdate,i=a.shared.pending;if(i!==null){a.shared.pending=null;var s=i,u=s.next;s.next=null,o===null?l=u:o.next=u,o=s;var m=e.alternate;m!==null&&(m=m.updateQueue,i=m.lastBaseUpdate,i!==o&&(i===null?m.firstBaseUpdate=u:i.next=u,m.lastBaseUpdate=s))}if(l!==null){var h=a.baseState;o=0,m=u=s=null,i=l;do{var v=i.lane,S=i.eventTime;if((r&v)===v){m!==null&&(m=m.next={eventTime:S,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null});e:{var E=e,w=i;switch(v=t,S=n,w.tag){case 1:if(E=w.payload,typeof E=="function"){h=E.call(S,h,v);break e}h=E;break e;case 3:E.flags=E.flags&-65537|128;case 0:if(E=w.payload,v=typeof E=="function"?E.call(S,h,v):E,v==null)break e;h=re({},h,v);break e;case 2:Mt=!0}}i.callback!==null&&i.lane!==0&&(e.flags|=64,v=a.effects,v===null?a.effects=[i]:v.push(i))}else S={eventTime:S,lane:v,tag:i.tag,payload:i.payload,callback:i.callback,next:null},m===null?(u=m=S,s=h):m=m.next=S,o|=v;if(i=i.next,i===null){if(i=a.shared.pending,i===null)break;v=i,i=v.next,v.next=null,a.lastBaseUpdate=v,a.shared.pending=null}}while(!0);if(m===null&&(s=h),a.baseState=s,a.firstBaseUpdate=u,a.lastBaseUpdate=m,t=a.shared.interleaved,t!==null){a=t;do o|=a.lane,a=a.next;while(a!==t)}else l===null&&(a.shared.lanes=0);En|=o,e.lanes=o,e.memoizedState=h}}function Ou(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(a!==null){if(r.callback=null,r=n,typeof a!="function")throw Error(R(191,a));a.call(r)}}}var ra={},Et=nn(ra),Jr=nn(ra),Yr=nn(ra);function yn(e){if(e===ra)throw Error(R(174));return e}function Bi(e,t){switch(J(Yr,t),J(Jr,e),J(Et,ra),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Uo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Uo(t,e)}G(Et),J(Et,t)}function nr(){G(Et),G(Jr),G(Yr)}function id(e){yn(Yr.current);var t=yn(Et.current),n=Uo(t,e.type);t!==n&&(J(Jr,e),J(Et,n))}function Hi(e){Jr.current===e&&(G(Et),G(Jr))}var te=nn(0);function ul(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var wo=[];function Wi(){for(var e=0;e<wo.length;e++)wo[e]._workInProgressVersionPrimary=null;wo.length=0}var za=Lt.ReactCurrentDispatcher,_o=Lt.ReactCurrentBatchConfig,Sn=0,ne=null,ce=null,pe=null,cl=!1,Fr=!1,Gr=0,Am=0;function Se(){throw Error(R(321))}function Ki(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!pt(e[n],t[n]))return!1;return!0}function Qi(e,t,n,r,a,l){if(Sn=l,ne=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,za.current=e===null||e.memoizedState===null?Vm:Bm,e=n(r,a),Fr){l=0;do{if(Fr=!1,Gr=0,25<=l)throw Error(R(301));l+=1,pe=ce=null,t.updateQueue=null,za.current=Hm,e=n(r,a)}while(Fr)}if(za.current=dl,t=ce!==null&&ce.next!==null,Sn=0,pe=ce=ne=null,cl=!1,t)throw Error(R(300));return e}function Ji(){var e=Gr!==0;return Gr=0,e}function _t(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return pe===null?ne.memoizedState=pe=e:pe=pe.next=e,pe}function tt(){if(ce===null){var e=ne.alternate;e=e!==null?e.memoizedState:null}else e=ce.next;var t=pe===null?ne.memoizedState:pe.next;if(t!==null)pe=t,ce=e;else{if(e===null)throw Error(R(310));ce=e,e={memoizedState:ce.memoizedState,baseState:ce.baseState,baseQueue:ce.baseQueue,queue:ce.queue,next:null},pe===null?ne.memoizedState=pe=e:pe=pe.next=e}return pe}function Xr(e,t){return typeof t=="function"?t(e):t}function No(e){var t=tt(),n=t.queue;if(n===null)throw Error(R(311));n.lastRenderedReducer=e;var r=ce,a=r.baseQueue,l=n.pending;if(l!==null){if(a!==null){var o=a.next;a.next=l.next,l.next=o}r.baseQueue=a=l,n.pending=null}if(a!==null){l=a.next,r=r.baseState;var i=o=null,s=null,u=l;do{var m=u.lane;if((Sn&m)===m)s!==null&&(s=s.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var h={lane:m,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};s===null?(i=s=h,o=r):s=s.next=h,ne.lanes|=m,En|=m}u=u.next}while(u!==null&&u!==l);s===null?o=r:s.next=i,pt(r,t.memoizedState)||(Fe=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){a=e;do l=a.lane,ne.lanes|=l,En|=l,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function So(e){var t=tt(),n=t.queue;if(n===null)throw Error(R(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,l=t.memoizedState;if(a!==null){n.pending=null;var o=a=a.next;do l=e(l,o.action),o=o.next;while(o!==a);pt(l,t.memoizedState)||(Fe=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),n.lastRenderedState=l}return[l,r]}function sd(){}function ud(e,t){var n=ne,r=tt(),a=t(),l=!pt(r.memoizedState,a);if(l&&(r.memoizedState=a,Fe=!0),r=r.queue,Yi(fd.bind(null,n,r,e),[e]),r.getSnapshot!==t||l||pe!==null&&pe.memoizedState.tag&1){if(n.flags|=2048,Zr(9,dd.bind(null,n,r,a,t),void 0,null),me===null)throw Error(R(349));(Sn&30)!==0||cd(n,t,a)}return a}function cd(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ne.updateQueue,t===null?(t={lastEffect:null,stores:null},ne.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function dd(e,t,n,r){t.value=n,t.getSnapshot=r,pd(t)&&md(e)}function fd(e,t,n){return n(function(){pd(t)&&md(e)})}function pd(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!pt(e,n)}catch{return!0}}function md(e){var t=Dt(e,1);t!==null&&ft(t,e,1,-1)}function Uu(e){var t=_t();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Xr,lastRenderedState:e},t.queue=e,e=e.dispatch=zm.bind(null,ne,e),[t.memoizedState,e]}function Zr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ne.updateQueue,t===null?(t={lastEffect:null,stores:null},ne.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function hd(){return tt().memoizedState}function Va(e,t,n,r){var a=_t();ne.flags|=e,a.memoizedState=Zr(1|t,n,void 0,r===void 0?null:r)}function El(e,t,n,r){var a=tt();r=r===void 0?null:r;var l=void 0;if(ce!==null){var o=ce.memoizedState;if(l=o.destroy,r!==null&&Ki(r,o.deps)){a.memoizedState=Zr(t,n,l,r);return}}ne.flags|=e,a.memoizedState=Zr(1|t,n,l,r)}function Iu(e,t){return Va(8390656,8,e,t)}function Yi(e,t){return El(2048,8,e,t)}function vd(e,t){return El(4,2,e,t)}function yd(e,t){return El(4,4,e,t)}function gd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function wd(e,t,n){return n=n!=null?n.concat([e]):null,El(4,4,gd.bind(null,t,e),n)}function Gi(){}function _d(e,t){var n=tt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ki(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Nd(e,t){var n=tt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ki(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Sd(e,t,n){return(Sn&21)===0?(e.baseState&&(e.baseState=!1,Fe=!0),e.memoizedState=n):(pt(n,t)||(n=xc(),ne.lanes|=n,En|=n,e.baseState=!0),t)}function jm(e,t){var n=H;H=n!==0&&4>n?n:4,e(!0);var r=_o.transition;_o.transition={};try{e(!1),t()}finally{H=n,_o.transition=r}}function Ed(){return tt().memoizedState}function Mm(e,t,n){var r=Xt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},kd(e))Rd(t,n);else if(n=ld(e,t,n,r),n!==null){var a=Pe();ft(n,e,r,a),Cd(n,t,r)}}function zm(e,t,n){var r=Xt(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(kd(e))Rd(t,a);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var o=t.lastRenderedState,i=l(o,n);if(a.hasEagerState=!0,a.eagerState=i,pt(i,o)){var s=t.interleaved;s===null?(a.next=a,zi(t)):(a.next=s.next,s.next=a),t.interleaved=a;return}}catch{}finally{}n=ld(e,t,a,r),n!==null&&(a=Pe(),ft(n,e,r,a),Cd(n,t,r))}}function kd(e){var t=e.alternate;return e===ne||t!==null&&t===ne}function Rd(e,t){Fr=cl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Cd(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,xi(e,n)}}var dl={readContext:et,useCallback:Se,useContext:Se,useEffect:Se,useImperativeHandle:Se,useInsertionEffect:Se,useLayoutEffect:Se,useMemo:Se,useReducer:Se,useRef:Se,useState:Se,useDebugValue:Se,useDeferredValue:Se,useTransition:Se,useMutableSource:Se,useSyncExternalStore:Se,useId:Se,unstable_isNewReconciler:!1},Vm={readContext:et,useCallback:function(e,t){return _t().memoizedState=[e,t===void 0?null:t],e},useContext:et,useEffect:Iu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Va(4194308,4,gd.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Va(4194308,4,e,t)},useInsertionEffect:function(e,t){return Va(4,2,e,t)},useMemo:function(e,t){var n=_t();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=_t();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Mm.bind(null,ne,e),[r.memoizedState,e]},useRef:function(e){var t=_t();return e={current:e},t.memoizedState=e},useState:Uu,useDebugValue:Gi,useDeferredValue:function(e){return _t().memoizedState=e},useTransition:function(){var e=Uu(!1),t=e[0];return e=jm.bind(null,e[1]),_t().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ne,a=_t();if(q){if(n===void 0)throw Error(R(407));n=n()}else{if(n=t(),me===null)throw Error(R(349));(Sn&30)!==0||cd(r,t,n)}a.memoizedState=n;var l={value:n,getSnapshot:t};return a.queue=l,Iu(fd.bind(null,r,l,e),[e]),r.flags|=2048,Zr(9,dd.bind(null,r,l,n,t),void 0,null),n},useId:function(){var e=_t(),t=me.identifierPrefix;if(q){var n=$t,r=xt;n=(r&~(1<<32-dt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Gr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Am++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Bm={readContext:et,useCallback:_d,useContext:et,useEffect:Yi,useImperativeHandle:wd,useInsertionEffect:vd,useLayoutEffect:yd,useMemo:Nd,useReducer:No,useRef:hd,useState:function(){return No(Xr)},useDebugValue:Gi,useDeferredValue:function(e){var t=tt();return Sd(t,ce.memoizedState,e)},useTransition:function(){var e=No(Xr)[0],t=tt().memoizedState;return[e,t]},useMutableSource:sd,useSyncExternalStore:ud,useId:Ed,unstable_isNewReconciler:!1},Hm={readContext:et,useCallback:_d,useContext:et,useEffect:Yi,useImperativeHandle:wd,useInsertionEffect:vd,useLayoutEffect:yd,useMemo:Nd,useReducer:So,useRef:hd,useState:function(){return So(Xr)},useDebugValue:Gi,useDeferredValue:function(e){var t=tt();return ce===null?t.memoizedState=e:Sd(t,ce.memoizedState,e)},useTransition:function(){var e=So(Xr)[0],t=tt().memoizedState;return[e,t]},useMutableSource:sd,useSyncExternalStore:ud,useId:Ed,unstable_isNewReconciler:!1};function st(e,t){if(e&&e.defaultProps){t=re({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ri(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:re({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var kl={isMounted:function(e){return(e=e._reactInternals)?Cn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Pe(),a=Xt(e),l=Pt(r,a);l.payload=t,n!=null&&(l.callback=n),t=Yt(e,l,a),t!==null&&(ft(t,e,a,r),Ma(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Pe(),a=Xt(e),l=Pt(r,a);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=Yt(e,l,a),t!==null&&(ft(t,e,a,r),Ma(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Pe(),r=Xt(e),a=Pt(n,r);a.tag=2,t!=null&&(a.callback=t),t=Yt(e,a,r),t!==null&&(ft(t,e,r,n),Ma(t,e,r))}};function Au(e,t,n,r,a,l,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,o):t.prototype&&t.prototype.isPureReactComponent?!Hr(n,r)||!Hr(a,l):!0}function xd(e,t,n){var r=!1,a=en,l=t.contextType;return typeof l=="object"&&l!==null?l=et(l):(a=Oe(t)?_n:Re.current,r=t.contextTypes,l=(r=r!=null)?qn(e,a):en),t=new t(n,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=kl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=l),t}function ju(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&kl.enqueueReplaceState(t,t.state,null)}function ai(e,t,n,r){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},Vi(e);var l=t.contextType;typeof l=="object"&&l!==null?a.context=et(l):(l=Oe(t)?_n:Re.current,a.context=qn(e,l)),a.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(ri(e,t,l,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&kl.enqueueReplaceState(a,a.state,null),sl(e,n,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function rr(e,t){try{var n="",r=t;do n+=_p(r),r=r.return;while(r);var a=n}catch(l){a=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:a,digest:null}}function Eo(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function li(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Wm=typeof WeakMap=="function"?WeakMap:Map;function $d(e,t,n){n=Pt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){pl||(pl=!0,hi=r),li(e,t)},n}function Pd(e,t,n){n=Pt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var a=t.value;n.payload=function(){return r(a)},n.callback=function(){li(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(n.callback=function(){li(e,t),typeof r!="function"&&(Gt===null?Gt=new Set([this]):Gt.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Mu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Wm;var a=new Set;r.set(t,a)}else a=r.get(t),a===void 0&&(a=new Set,r.set(t,a));a.has(n)||(a.add(n),e=lh.bind(null,e,t,n),t.then(e,e))}function zu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Vu(e,t,n,r,a){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Pt(-1,1),t.tag=2,Yt(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=a,e)}var Km=Lt.ReactCurrentOwner,Fe=!1;function $e(e,t,n,r){t.child=e===null?ad(t,null,n,r):tr(t,e.child,n,r)}function Bu(e,t,n,r,a){n=n.render;var l=t.ref;return Gn(t,a),r=Qi(e,t,n,r,l,a),n=Ji(),e!==null&&!Fe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Ft(e,t,a)):(q&&n&&Oi(t),t.flags|=1,$e(e,t,r,a),t.child)}function Hu(e,t,n,r,a){if(e===null){var l=n.type;return typeof l=="function"&&!as(l)&&l.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=l,bd(e,t,l,r,a)):(e=Ka(n.type,null,r,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,(e.lanes&a)===0){var o=l.memoizedProps;if(n=n.compare,n=n!==null?n:Hr,n(o,r)&&e.ref===t.ref)return Ft(e,t,a)}return t.flags|=1,e=Zt(l,r),e.ref=t.ref,e.return=t,t.child=e}function bd(e,t,n,r,a){if(e!==null){var l=e.memoizedProps;if(Hr(l,r)&&e.ref===t.ref)if(Fe=!1,t.pendingProps=r=l,(e.lanes&a)!==0)(e.flags&131072)!==0&&(Fe=!0);else return t.lanes=e.lanes,Ft(e,t,a)}return oi(e,t,n,r,a)}function Td(e,t,n){var r=t.pendingProps,a=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},J(Wn,Me),Me|=n;else{if((n&1073741824)===0)return e=l!==null?l.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,J(Wn,Me),Me|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:n,J(Wn,Me),Me|=r}else l!==null?(r=l.baseLanes|n,t.memoizedState=null):r=n,J(Wn,Me),Me|=r;return $e(e,t,a,n),t.child}function Dd(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function oi(e,t,n,r,a){var l=Oe(n)?_n:Re.current;return l=qn(t,l),Gn(t,a),n=Qi(e,t,n,r,l,a),r=Ji(),e!==null&&!Fe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Ft(e,t,a)):(q&&r&&Oi(t),t.flags|=1,$e(e,t,n,a),t.child)}function Wu(e,t,n,r,a){if(Oe(n)){var l=!0;rl(t)}else l=!1;if(Gn(t,a),t.stateNode===null)Ba(e,t),xd(t,n,r),ai(t,n,r,a),r=!0;else if(e===null){var o=t.stateNode,i=t.memoizedProps;o.props=i;var s=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=et(u):(u=Oe(n)?_n:Re.current,u=qn(t,u));var m=n.getDerivedStateFromProps,h=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(i!==r||s!==u)&&ju(t,o,r,u),Mt=!1;var v=t.memoizedState;o.state=v,sl(t,r,o,a),s=t.memoizedState,i!==r||v!==s||Le.current||Mt?(typeof m=="function"&&(ri(t,n,m,r),s=t.memoizedState),(i=Mt||Au(t,n,i,r,v,s,u))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),o.props=r,o.state=s,o.context=u,r=i):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,od(e,t),i=t.memoizedProps,u=t.type===t.elementType?i:st(t.type,i),o.props=u,h=t.pendingProps,v=o.context,s=n.contextType,typeof s=="object"&&s!==null?s=et(s):(s=Oe(n)?_n:Re.current,s=qn(t,s));var S=n.getDerivedStateFromProps;(m=typeof S=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(i!==h||v!==s)&&ju(t,o,r,s),Mt=!1,v=t.memoizedState,o.state=v,sl(t,r,o,a);var E=t.memoizedState;i!==h||v!==E||Le.current||Mt?(typeof S=="function"&&(ri(t,n,S,r),E=t.memoizedState),(u=Mt||Au(t,n,u,r,v,E,s)||!1)?(m||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,E,s),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,E,s)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=E),o.props=r,o.state=E,o.context=s,r=u):(typeof o.componentDidUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),r=!1)}return ii(e,t,n,r,l,a)}function ii(e,t,n,r,a,l){Dd(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return a&&bu(t,n,!1),Ft(e,t,l);r=t.stateNode,Km.current=t;var i=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=tr(t,e.child,null,l),t.child=tr(t,null,i,l)):$e(e,t,i,l),t.memoizedState=r.state,a&&bu(t,n,!0),t.child}function Fd(e){var t=e.stateNode;t.pendingContext?Pu(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Pu(e,t.context,!1),Bi(e,t.containerInfo)}function Ku(e,t,n,r,a){return er(),Ii(a),t.flags|=256,$e(e,t,n,r),t.child}var si={dehydrated:null,treeContext:null,retryLane:0};function ui(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ld(e,t,n){var r=t.pendingProps,a=te.current,l=!1,o=(t.flags&128)!==0,i;if((i=o)||(i=e!==null&&e.memoizedState===null?!1:(a&2)!==0),i?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),J(te,a&1),e===null)return ti(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(o=r.children,e=r.fallback,l?(r=t.mode,l=t.child,o={mode:"hidden",children:o},(r&1)===0&&l!==null?(l.childLanes=0,l.pendingProps=o):l=xl(o,r,0,null),e=wn(e,r,n,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=ui(n),t.memoizedState=si,e):Xi(t,o));if(a=e.memoizedState,a!==null&&(i=a.dehydrated,i!==null))return Qm(e,t,o,r,i,a,n);if(l){l=r.fallback,o=t.mode,a=e.child,i=a.sibling;var s={mode:"hidden",children:r.children};return(o&1)===0&&t.child!==a?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=Zt(a,s),r.subtreeFlags=a.subtreeFlags&14680064),i!==null?l=Zt(i,l):(l=wn(l,o,n,null),l.flags|=2),l.return=t,r.return=t,r.sibling=l,t.child=r,r=l,l=t.child,o=e.child.memoizedState,o=o===null?ui(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},l.memoizedState=o,l.childLanes=e.childLanes&~n,t.memoizedState=si,r}return l=e.child,e=l.sibling,r=Zt(l,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Xi(e,t){return t=xl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function La(e,t,n,r){return r!==null&&Ii(r),tr(t,e.child,null,n),e=Xi(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Qm(e,t,n,r,a,l,o){if(n)return t.flags&256?(t.flags&=-257,r=Eo(Error(R(422))),La(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=r.fallback,a=t.mode,r=xl({mode:"visible",children:r.children},a,0,null),l=wn(l,a,o,null),l.flags|=2,r.return=t,l.return=t,r.sibling=l,t.child=r,(t.mode&1)!==0&&tr(t,e.child,null,o),t.child.memoizedState=ui(o),t.memoizedState=si,l);if((t.mode&1)===0)return La(e,t,o,null);if(a.data==="$!"){if(r=a.nextSibling&&a.nextSibling.dataset,r)var i=r.dgst;return r=i,l=Error(R(419)),r=Eo(l,r,void 0),La(e,t,o,r)}if(i=(o&e.childLanes)!==0,Fe||i){if(r=me,r!==null){switch(o&-o){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(r.suspendedLanes|o))!==0?0:a,a!==0&&a!==l.retryLane&&(l.retryLane=a,Dt(e,a),ft(r,e,a,-1))}return rs(),r=Eo(Error(R(421))),La(e,t,o,r)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=oh.bind(null,e),a._reactRetry=t,null):(e=l.treeContext,ze=Jt(a.nextSibling),Ve=t,q=!0,ct=null,e!==null&&(Ge[Xe++]=xt,Ge[Xe++]=$t,Ge[Xe++]=Nn,xt=e.id,$t=e.overflow,Nn=t),t=Xi(t,r.children),t.flags|=4096,t)}function Qu(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ni(e.return,t,n)}function ko(e,t,n,r,a){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=a)}function Od(e,t,n){var r=t.pendingProps,a=r.revealOrder,l=r.tail;if($e(e,t,r.children,n),r=te.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Qu(e,n,t);else if(e.tag===19)Qu(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(J(te,r),(t.mode&1)===0)t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&ul(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),ko(t,!1,a,n,l);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&ul(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}ko(t,!0,n,null,l);break;case"together":ko(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ba(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Ft(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),En|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(R(153));if(t.child!==null){for(e=t.child,n=Zt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Zt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Jm(e,t,n){switch(t.tag){case 3:Fd(t),er();break;case 5:id(t);break;case 1:Oe(t.type)&&rl(t);break;case 4:Bi(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,a=t.memoizedProps.value;J(ol,r._currentValue),r._currentValue=a;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(J(te,te.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?Ld(e,t,n):(J(te,te.current&1),e=Ft(e,t,n),e!==null?e.sibling:null);J(te,te.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Od(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),J(te,te.current),r)break;return null;case 22:case 23:return t.lanes=0,Td(e,t,n)}return Ft(e,t,n)}var Ud,ci,Id,Ad;Ud=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};ci=function(){};Id=function(e,t,n,r){var a=e.memoizedProps;if(a!==r){e=t.stateNode,yn(Et.current);var l=null;switch(n){case"input":a=Do(e,a),r=Do(e,r),l=[];break;case"select":a=re({},a,{value:void 0}),r=re({},r,{value:void 0}),l=[];break;case"textarea":a=Oo(e,a),r=Oo(e,r),l=[];break;default:typeof a.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=tl)}Io(n,r);var o;n=null;for(u in a)if(!r.hasOwnProperty(u)&&a.hasOwnProperty(u)&&a[u]!=null)if(u==="style"){var i=a[u];for(o in i)i.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Ir.hasOwnProperty(u)?l||(l=[]):(l=l||[]).push(u,null));for(u in r){var s=r[u];if(i=a?.[u],r.hasOwnProperty(u)&&s!==i&&(s!=null||i!=null))if(u==="style")if(i){for(o in i)!i.hasOwnProperty(o)||s&&s.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in s)s.hasOwnProperty(o)&&i[o]!==s[o]&&(n||(n={}),n[o]=s[o])}else n||(l||(l=[]),l.push(u,n)),n=s;else u==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,i=i?i.__html:void 0,s!=null&&i!==s&&(l=l||[]).push(u,s)):u==="children"?typeof s!="string"&&typeof s!="number"||(l=l||[]).push(u,""+s):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Ir.hasOwnProperty(u)?(s!=null&&u==="onScroll"&&Y("scroll",e),l||i===s||(l=[])):(l=l||[]).push(u,s))}n&&(l=l||[]).push("style",n);var u=l;(t.updateQueue=u)&&(t.flags|=4)}};Ad=function(e,t,n,r){n!==r&&(t.flags|=4)};function Nr(e,t){if(!q)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ee(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags&14680064,r|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Ym(e,t,n){var r=t.pendingProps;switch(Ui(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ee(t),null;case 1:return Oe(t.type)&&nl(),Ee(t),null;case 3:return r=t.stateNode,nr(),G(Le),G(Re),Wi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Da(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,ct!==null&&(gi(ct),ct=null))),ci(e,t),Ee(t),null;case 5:Hi(t);var a=yn(Yr.current);if(n=t.type,e!==null&&t.stateNode!=null)Id(e,t,n,r,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(R(166));return Ee(t),null}if(e=yn(Et.current),Da(t)){r=t.stateNode,n=t.type;var l=t.memoizedProps;switch(r[Nt]=t,r[Qr]=l,e=(t.mode&1)!==0,n){case"dialog":Y("cancel",r),Y("close",r);break;case"iframe":case"object":case"embed":Y("load",r);break;case"video":case"audio":for(a=0;a<xr.length;a++)Y(xr[a],r);break;case"source":Y("error",r);break;case"img":case"image":case"link":Y("error",r),Y("load",r);break;case"details":Y("toggle",r);break;case"input":tu(r,l),Y("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},Y("invalid",r);break;case"textarea":ru(r,l),Y("invalid",r)}Io(n,l),a=null;for(var o in l)if(l.hasOwnProperty(o)){var i=l[o];o==="children"?typeof i=="string"?r.textContent!==i&&(l.suppressHydrationWarning!==!0&&Ta(r.textContent,i,e),a=["children",i]):typeof i=="number"&&r.textContent!==""+i&&(l.suppressHydrationWarning!==!0&&Ta(r.textContent,i,e),a=["children",""+i]):Ir.hasOwnProperty(o)&&i!=null&&o==="onScroll"&&Y("scroll",r)}switch(n){case"input":wa(r),nu(r,l,!0);break;case"textarea":wa(r),au(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=tl)}r=a,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=fc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[Nt]=t,e[Qr]=r,Ud(e,t,!1,!1),t.stateNode=e;e:{switch(o=Ao(n,r),n){case"dialog":Y("cancel",e),Y("close",e),a=r;break;case"iframe":case"object":case"embed":Y("load",e),a=r;break;case"video":case"audio":for(a=0;a<xr.length;a++)Y(xr[a],e);a=r;break;case"source":Y("error",e),a=r;break;case"img":case"image":case"link":Y("error",e),Y("load",e),a=r;break;case"details":Y("toggle",e),a=r;break;case"input":tu(e,r),a=Do(e,r),Y("invalid",e);break;case"option":a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=re({},r,{value:void 0}),Y("invalid",e);break;case"textarea":ru(e,r),a=Oo(e,r),Y("invalid",e);break;default:a=r}Io(n,a),i=a;for(l in i)if(i.hasOwnProperty(l)){var s=i[l];l==="style"?hc(e,s):l==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&pc(e,s)):l==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&Ar(e,s):typeof s=="number"&&Ar(e,""+s):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(Ir.hasOwnProperty(l)?s!=null&&l==="onScroll"&&Y("scroll",e):s!=null&&Ni(e,l,s,o))}switch(n){case"input":wa(e),nu(e,r,!1);break;case"textarea":wa(e),au(e);break;case"option":r.value!=null&&e.setAttribute("value",""+qt(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?Kn(e,!!r.multiple,l,!1):r.defaultValue!=null&&Kn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=tl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ee(t),null;case 6:if(e&&t.stateNode!=null)Ad(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(R(166));if(n=yn(Yr.current),yn(Et.current),Da(t)){if(r=t.stateNode,n=t.memoizedProps,r[Nt]=t,(l=r.nodeValue!==n)&&(e=Ve,e!==null))switch(e.tag){case 3:Ta(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ta(r.nodeValue,n,(e.mode&1)!==0)}l&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Nt]=t,t.stateNode=r}return Ee(t),null;case 13:if(G(te),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(q&&ze!==null&&(t.mode&1)!==0&&(t.flags&128)===0)nd(),er(),t.flags|=98560,l=!1;else if(l=Da(t),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(R(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(R(317));l[Nt]=t}else er(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ee(t),l=!1}else ct!==null&&(gi(ct),ct=null),l=!0;if(!l)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(te.current&1)!==0?de===0&&(de=3):rs())),t.updateQueue!==null&&(t.flags|=4),Ee(t),null);case 4:return nr(),ci(e,t),e===null&&Wr(t.stateNode.containerInfo),Ee(t),null;case 10:return Mi(t.type._context),Ee(t),null;case 17:return Oe(t.type)&&nl(),Ee(t),null;case 19:if(G(te),l=t.memoizedState,l===null)return Ee(t),null;if(r=(t.flags&128)!==0,o=l.rendering,o===null)if(r)Nr(l,!1);else{if(de!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(o=ul(e),o!==null){for(t.flags|=128,Nr(l,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)l=n,e=r,l.flags&=14680066,o=l.alternate,o===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=o.childLanes,l.lanes=o.lanes,l.child=o.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=o.memoizedProps,l.memoizedState=o.memoizedState,l.updateQueue=o.updateQueue,l.type=o.type,e=o.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return J(te,te.current&1|2),t.child}e=e.sibling}l.tail!==null&&oe()>ar&&(t.flags|=128,r=!0,Nr(l,!1),t.lanes=4194304)}else{if(!r)if(e=ul(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Nr(l,!0),l.tail===null&&l.tailMode==="hidden"&&!o.alternate&&!q)return Ee(t),null}else 2*oe()-l.renderingStartTime>ar&&n!==1073741824&&(t.flags|=128,r=!0,Nr(l,!1),t.lanes=4194304);l.isBackwards?(o.sibling=t.child,t.child=o):(n=l.last,n!==null?n.sibling=o:t.child=o,l.last=o)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=oe(),t.sibling=null,n=te.current,J(te,r?n&1|2:n&1),t):(Ee(t),null);case 22:case 23:return ns(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(Me&1073741824)!==0&&(Ee(t),t.subtreeFlags&6&&(t.flags|=8192)):Ee(t),null;case 24:return null;case 25:return null}throw Error(R(156,t.tag))}function Gm(e,t){switch(Ui(t),t.tag){case 1:return Oe(t.type)&&nl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return nr(),G(Le),G(Re),Wi(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Hi(t),null;case 13:if(G(te),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(R(340));er()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return G(te),null;case 4:return nr(),null;case 10:return Mi(t.type._context),null;case 22:case 23:return ns(),null;case 24:return null;default:return null}}var Oa=!1,ke=!1,Xm=typeof WeakSet=="function"?WeakSet:Set,D=null;function Hn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ae(e,t,r)}else n.current=null}function di(e,t,n){try{n()}catch(r){ae(e,t,r)}}var Ju=!1;function Zm(e,t){if(Jo=Za,e=Bc(),Li(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var o=0,i=-1,s=-1,u=0,m=0,h=e,v=null;t:for(;;){for(var S;h!==n||a!==0&&h.nodeType!==3||(i=o+a),h!==l||r!==0&&h.nodeType!==3||(s=o+r),h.nodeType===3&&(o+=h.nodeValue.length),(S=h.firstChild)!==null;)v=h,h=S;for(;;){if(h===e)break t;if(v===n&&++u===a&&(i=o),v===l&&++m===r&&(s=o),(S=h.nextSibling)!==null)break;h=v,v=h.parentNode}h=S}n=i===-1||s===-1?null:{start:i,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(Yo={focusedElem:e,selectionRange:n},Za=!1,D=t;D!==null;)if(t=D,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,D=e;else for(;D!==null;){t=D;try{var E=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(E!==null){var w=E.memoizedProps,N=E.memoizedState,d=t.stateNode,c=d.getSnapshotBeforeUpdate(t.elementType===t.type?w:st(t.type,w),N);d.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(R(163))}}catch(y){ae(t,t.return,y)}if(e=t.sibling,e!==null){e.return=t.return,D=e;break}D=t.return}return E=Ju,Ju=!1,E}function Lr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var l=a.destroy;a.destroy=void 0,l!==void 0&&di(t,n,l)}a=a.next}while(a!==r)}}function Rl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function fi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function jd(e){var t=e.alternate;t!==null&&(e.alternate=null,jd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Nt],delete t[Qr],delete t[Zo],delete t[Lm],delete t[Om])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Md(e){return e.tag===5||e.tag===3||e.tag===4}function Yu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Md(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function pi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=tl));else if(r!==4&&(e=e.child,e!==null))for(pi(e,t,n),e=e.sibling;e!==null;)pi(e,t,n),e=e.sibling}function mi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(mi(e,t,n),e=e.sibling;e!==null;)mi(e,t,n),e=e.sibling}var ve=null,ut=!1;function At(e,t,n){for(n=n.child;n!==null;)zd(e,t,n),n=n.sibling}function zd(e,t,n){if(St&&typeof St.onCommitFiberUnmount=="function")try{St.onCommitFiberUnmount(yl,n)}catch{}switch(n.tag){case 5:ke||Hn(n,t);case 6:var r=ve,a=ut;ve=null,At(e,t,n),ve=r,ut=a,ve!==null&&(ut?(e=ve,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ve.removeChild(n.stateNode));break;case 18:ve!==null&&(ut?(e=ve,n=n.stateNode,e.nodeType===8?yo(e.parentNode,n):e.nodeType===1&&yo(e,n),Vr(e)):yo(ve,n.stateNode));break;case 4:r=ve,a=ut,ve=n.stateNode.containerInfo,ut=!0,At(e,t,n),ve=r,ut=a;break;case 0:case 11:case 14:case 15:if(!ke&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){a=r=r.next;do{var l=a,o=l.destroy;l=l.tag,o!==void 0&&((l&2)!==0||(l&4)!==0)&&di(n,t,o),a=a.next}while(a!==r)}At(e,t,n);break;case 1:if(!ke&&(Hn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(i){ae(n,t,i)}At(e,t,n);break;case 21:At(e,t,n);break;case 22:n.mode&1?(ke=(r=ke)||n.memoizedState!==null,At(e,t,n),ke=r):At(e,t,n);break;default:At(e,t,n)}}function Gu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Xm),t.forEach(function(r){var a=ih.bind(null,e,r);n.has(r)||(n.add(r),r.then(a,a))})}}function it(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r];try{var l=e,o=t,i=o;e:for(;i!==null;){switch(i.tag){case 5:ve=i.stateNode,ut=!1;break e;case 3:ve=i.stateNode.containerInfo,ut=!0;break e;case 4:ve=i.stateNode.containerInfo,ut=!0;break e}i=i.return}if(ve===null)throw Error(R(160));zd(l,o,a),ve=null,ut=!1;var s=a.alternate;s!==null&&(s.return=null),a.return=null}catch(u){ae(a,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Vd(t,e),t=t.sibling}function Vd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(it(t,e),wt(e),r&4){try{Lr(3,e,e.return),Rl(3,e)}catch(w){ae(e,e.return,w)}try{Lr(5,e,e.return)}catch(w){ae(e,e.return,w)}}break;case 1:it(t,e),wt(e),r&512&&n!==null&&Hn(n,n.return);break;case 5:if(it(t,e),wt(e),r&512&&n!==null&&Hn(n,n.return),e.flags&32){var a=e.stateNode;try{Ar(a,"")}catch(w){ae(e,e.return,w)}}if(r&4&&(a=e.stateNode,a!=null)){var l=e.memoizedProps,o=n!==null?n.memoizedProps:l,i=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{i==="input"&&l.type==="radio"&&l.name!=null&&cc(a,l),Ao(i,o);var u=Ao(i,l);for(o=0;o<s.length;o+=2){var m=s[o],h=s[o+1];m==="style"?hc(a,h):m==="dangerouslySetInnerHTML"?pc(a,h):m==="children"?Ar(a,h):Ni(a,m,h,u)}switch(i){case"input":Fo(a,l);break;case"textarea":dc(a,l);break;case"select":var v=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!l.multiple;var S=l.value;S!=null?Kn(a,!!l.multiple,S,!1):v!==!!l.multiple&&(l.defaultValue!=null?Kn(a,!!l.multiple,l.defaultValue,!0):Kn(a,!!l.multiple,l.multiple?[]:"",!1))}a[Qr]=l}catch(w){ae(e,e.return,w)}}break;case 6:if(it(t,e),wt(e),r&4){if(e.stateNode===null)throw Error(R(162));a=e.stateNode,l=e.memoizedProps;try{a.nodeValue=l}catch(w){ae(e,e.return,w)}}break;case 3:if(it(t,e),wt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Vr(t.containerInfo)}catch(w){ae(e,e.return,w)}break;case 4:it(t,e),wt(e);break;case 13:it(t,e),wt(e),a=e.child,a.flags&8192&&(l=a.memoizedState!==null,a.stateNode.isHidden=l,!l||a.alternate!==null&&a.alternate.memoizedState!==null||(es=oe())),r&4&&Gu(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(ke=(u=ke)||m,it(t,e),ke=u):it(t,e),wt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!m&&(e.mode&1)!==0)for(D=e,m=e.child;m!==null;){for(h=D=m;D!==null;){switch(v=D,S=v.child,v.tag){case 0:case 11:case 14:case 15:Lr(4,v,v.return);break;case 1:Hn(v,v.return);var E=v.stateNode;if(typeof E.componentWillUnmount=="function"){r=v,n=v.return;try{t=r,E.props=t.memoizedProps,E.state=t.memoizedState,E.componentWillUnmount()}catch(w){ae(r,n,w)}}break;case 5:Hn(v,v.return);break;case 22:if(v.memoizedState!==null){Zu(h);continue}}S!==null?(S.return=v,D=S):Zu(h)}m=m.sibling}e:for(m=null,h=e;;){if(h.tag===5){if(m===null){m=h;try{a=h.stateNode,u?(l=a.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(i=h.stateNode,s=h.memoizedProps.style,o=s!=null&&s.hasOwnProperty("display")?s.display:null,i.style.display=mc("display",o))}catch(w){ae(e,e.return,w)}}}else if(h.tag===6){if(m===null)try{h.stateNode.nodeValue=u?"":h.memoizedProps}catch(w){ae(e,e.return,w)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;m===h&&(m=null),h=h.return}m===h&&(m=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:it(t,e),wt(e),r&4&&Gu(e);break;case 21:break;default:it(t,e),wt(e)}}function wt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Md(n)){var r=n;break e}n=n.return}throw Error(R(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&(Ar(a,""),r.flags&=-33);var l=Yu(e);mi(e,l,a);break;case 3:case 4:var o=r.stateNode.containerInfo,i=Yu(e);pi(e,i,o);break;default:throw Error(R(161))}}catch(s){ae(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function qm(e,t,n){D=e,Bd(e,t,n)}function Bd(e,t,n){for(var r=(e.mode&1)!==0;D!==null;){var a=D,l=a.child;if(a.tag===22&&r){var o=a.memoizedState!==null||Oa;if(!o){var i=a.alternate,s=i!==null&&i.memoizedState!==null||ke;i=Oa;var u=ke;if(Oa=o,(ke=s)&&!u)for(D=a;D!==null;)o=D,s=o.child,o.tag===22&&o.memoizedState!==null?qu(a):s!==null?(s.return=o,D=s):qu(a);for(;l!==null;)D=l,Bd(l,t,n),l=l.sibling;D=a,Oa=i,ke=u}Xu(e,t,n)}else(a.subtreeFlags&8772)!==0&&l!==null?(l.return=a,D=l):Xu(e,t,n)}}function Xu(e){for(;D!==null;){var t=D;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:ke||Rl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ke)if(n===null)r.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:st(t.type,n.memoizedProps);r.componentDidUpdate(a,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&Ou(t,l,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ou(t,o,n)}break;case 5:var i=t.stateNode;if(n===null&&t.flags&4){n=i;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var m=u.memoizedState;if(m!==null){var h=m.dehydrated;h!==null&&Vr(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(R(163))}ke||t.flags&512&&fi(t)}catch(v){ae(t,t.return,v)}}if(t===e){D=null;break}if(n=t.sibling,n!==null){n.return=t.return,D=n;break}D=t.return}}function Zu(e){for(;D!==null;){var t=D;if(t===e){D=null;break}var n=t.sibling;if(n!==null){n.return=t.return,D=n;break}D=t.return}}function qu(e){for(;D!==null;){var t=D;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Rl(4,t)}catch(s){ae(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var a=t.return;try{r.componentDidMount()}catch(s){ae(t,a,s)}}var l=t.return;try{fi(t)}catch(s){ae(t,l,s)}break;case 5:var o=t.return;try{fi(t)}catch(s){ae(t,o,s)}}}catch(s){ae(t,t.return,s)}if(t===e){D=null;break}var i=t.sibling;if(i!==null){i.return=t.return,D=i;break}D=t.return}}var eh=Math.ceil,fl=Lt.ReactCurrentDispatcher,Zi=Lt.ReactCurrentOwner,qe=Lt.ReactCurrentBatchConfig,j=0,me=null,ie=null,ye=0,Me=0,Wn=nn(0),de=0,qr=null,En=0,Cl=0,qi=0,Or=null,De=null,es=0,ar=1/0,Rt=null,pl=!1,hi=null,Gt=null,Ua=!1,Ht=null,ml=0,Ur=0,vi=null,Ha=-1,Wa=0;function Pe(){return(j&6)!==0?oe():Ha!==-1?Ha:Ha=oe()}function Xt(e){return(e.mode&1)===0?1:(j&2)!==0&&ye!==0?ye&-ye:Im.transition!==null?(Wa===0&&(Wa=xc()),Wa):(e=H,e!==0||(e=window.event,e=e===void 0?16:Lc(e.type)),e)}function ft(e,t,n,r){if(50<Ur)throw Ur=0,vi=null,Error(R(185));ea(e,n,r),((j&2)===0||e!==me)&&(e===me&&((j&2)===0&&(Cl|=n),de===4&&Vt(e,ye)),Ue(e,r),n===1&&j===0&&(t.mode&1)===0&&(ar=oe()+500,Sl&&rn()))}function Ue(e,t){var n=e.callbackNode;jp(e,t);var r=Xa(e,e===me?ye:0);if(r===0)n!==null&&iu(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&iu(n),t===1)e.tag===0?Um(ec.bind(null,e)):qc(ec.bind(null,e)),Dm(function(){(j&6)===0&&rn()}),n=null;else{switch($c(r)){case 1:n=Ci;break;case 4:n=Rc;break;case 16:n=Ga;break;case 536870912:n=Cc;break;default:n=Ga}n=Xd(n,Hd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Hd(e,t){if(Ha=-1,Wa=0,(j&6)!==0)throw Error(R(327));var n=e.callbackNode;if(Xn()&&e.callbackNode!==n)return null;var r=Xa(e,e===me?ye:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=hl(e,r);else{t=r;var a=j;j|=2;var l=Kd();(me!==e||ye!==t)&&(Rt=null,ar=oe()+500,gn(e,t));do try{rh();break}catch(i){Wd(e,i)}while(!0);ji(),fl.current=l,j=a,ie!==null?t=0:(me=null,ye=0,t=de)}if(t!==0){if(t===2&&(a=Bo(e),a!==0&&(r=a,t=yi(e,a))),t===1)throw n=qr,gn(e,0),Vt(e,r),Ue(e,oe()),n;if(t===6)Vt(e,r);else{if(a=e.current.alternate,(r&30)===0&&!th(a)&&(t=hl(e,r),t===2&&(l=Bo(e),l!==0&&(r=l,t=yi(e,l))),t===1))throw n=qr,gn(e,0),Vt(e,r),Ue(e,oe()),n;switch(e.finishedWork=a,e.finishedLanes=r,t){case 0:case 1:throw Error(R(345));case 2:mn(e,De,Rt);break;case 3:if(Vt(e,r),(r&130023424)===r&&(t=es+500-oe(),10<t)){if(Xa(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){Pe(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=Xo(mn.bind(null,e,De,Rt),t);break}mn(e,De,Rt);break;case 4:if(Vt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,a=-1;0<r;){var o=31-dt(r);l=1<<o,o=t[o],o>a&&(a=o),r&=~l}if(r=a,r=oe()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*eh(r/1960))-r,10<r){e.timeoutHandle=Xo(mn.bind(null,e,De,Rt),r);break}mn(e,De,Rt);break;case 5:mn(e,De,Rt);break;default:throw Error(R(329))}}}return Ue(e,oe()),e.callbackNode===n?Hd.bind(null,e):null}function yi(e,t){var n=Or;return e.current.memoizedState.isDehydrated&&(gn(e,t).flags|=256),e=hl(e,t),e!==2&&(t=De,De=n,t!==null&&gi(t)),e}function gi(e){De===null?De=e:De.push.apply(De,e)}function th(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var a=n[r],l=a.getSnapshot;a=a.value;try{if(!pt(l(),a))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Vt(e,t){for(t&=~qi,t&=~Cl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-dt(t),r=1<<n;e[n]=-1,t&=~r}}function ec(e){if((j&6)!==0)throw Error(R(327));Xn();var t=Xa(e,0);if((t&1)===0)return Ue(e,oe()),null;var n=hl(e,t);if(e.tag!==0&&n===2){var r=Bo(e);r!==0&&(t=r,n=yi(e,r))}if(n===1)throw n=qr,gn(e,0),Vt(e,t),Ue(e,oe()),n;if(n===6)throw Error(R(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,mn(e,De,Rt),Ue(e,oe()),null}function ts(e,t){var n=j;j|=1;try{return e(t)}finally{j=n,j===0&&(ar=oe()+500,Sl&&rn())}}function kn(e){Ht!==null&&Ht.tag===0&&(j&6)===0&&Xn();var t=j;j|=1;var n=qe.transition,r=H;try{if(qe.transition=null,H=1,e)return e()}finally{H=r,qe.transition=n,j=t,(j&6)===0&&rn()}}function ns(){Me=Wn.current,G(Wn)}function gn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Tm(n)),ie!==null)for(n=ie.return;n!==null;){var r=n;switch(Ui(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&nl();break;case 3:nr(),G(Le),G(Re),Wi();break;case 5:Hi(r);break;case 4:nr();break;case 13:G(te);break;case 19:G(te);break;case 10:Mi(r.type._context);break;case 22:case 23:ns()}n=n.return}if(me=e,ie=e=Zt(e.current,null),ye=Me=t,de=0,qr=null,qi=Cl=En=0,De=Or=null,vn!==null){for(t=0;t<vn.length;t++)if(n=vn[t],r=n.interleaved,r!==null){n.interleaved=null;var a=r.next,l=n.pending;if(l!==null){var o=l.next;l.next=a,r.next=o}n.pending=r}vn=null}return e}function Wd(e,t){do{var n=ie;try{if(ji(),za.current=dl,cl){for(var r=ne.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}cl=!1}if(Sn=0,pe=ce=ne=null,Fr=!1,Gr=0,Zi.current=null,n===null||n.return===null){de=1,qr=t,ie=null;break}e:{var l=e,o=n.return,i=n,s=t;if(t=ye,i.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var u=s,m=i,h=m.tag;if((m.mode&1)===0&&(h===0||h===11||h===15)){var v=m.alternate;v?(m.updateQueue=v.updateQueue,m.memoizedState=v.memoizedState,m.lanes=v.lanes):(m.updateQueue=null,m.memoizedState=null)}var S=zu(o);if(S!==null){S.flags&=-257,Vu(S,o,i,l,t),S.mode&1&&Mu(l,u,t),t=S,s=u;var E=t.updateQueue;if(E===null){var w=new Set;w.add(s),t.updateQueue=w}else E.add(s);break e}else{if((t&1)===0){Mu(l,u,t),rs();break e}s=Error(R(426))}}else if(q&&i.mode&1){var N=zu(o);if(N!==null){(N.flags&65536)===0&&(N.flags|=256),Vu(N,o,i,l,t),Ii(rr(s,i));break e}}l=s=rr(s,i),de!==4&&(de=2),Or===null?Or=[l]:Or.push(l),l=o;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var d=$d(l,s,t);Lu(l,d);break e;case 1:i=s;var c=l.type,f=l.stateNode;if((l.flags&128)===0&&(typeof c.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Gt===null||!Gt.has(f)))){l.flags|=65536,t&=-t,l.lanes|=t;var y=Pd(l,i,t);Lu(l,y);break e}}l=l.return}while(l!==null)}Jd(n)}catch(x){t=x,ie===n&&n!==null&&(ie=n=n.return);continue}break}while(!0)}function Kd(){var e=fl.current;return fl.current=dl,e===null?dl:e}function rs(){(de===0||de===3||de===2)&&(de=4),me===null||(En&268435455)===0&&(Cl&268435455)===0||Vt(me,ye)}function hl(e,t){var n=j;j|=2;var r=Kd();(me!==e||ye!==t)&&(Rt=null,gn(e,t));do try{nh();break}catch(a){Wd(e,a)}while(!0);if(ji(),j=n,fl.current=r,ie!==null)throw Error(R(261));return me=null,ye=0,de}function nh(){for(;ie!==null;)Qd(ie)}function rh(){for(;ie!==null&&!bp();)Qd(ie)}function Qd(e){var t=Gd(e.alternate,e,Me);e.memoizedProps=e.pendingProps,t===null?Jd(e):ie=t,Zi.current=null}function Jd(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Ym(n,t,Me),n!==null){ie=n;return}}else{if(n=Gm(n,t),n!==null){n.flags&=32767,ie=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{de=6,ie=null;return}}if(t=t.sibling,t!==null){ie=t;return}ie=t=e}while(t!==null);de===0&&(de=5)}function mn(e,t,n){var r=H,a=qe.transition;try{qe.transition=null,H=1,ah(e,t,n,r)}finally{qe.transition=a,H=r}return null}function ah(e,t,n,r){do Xn();while(Ht!==null);if((j&6)!==0)throw Error(R(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(R(177));e.callbackNode=null,e.callbackPriority=0;var l=n.lanes|n.childLanes;if(Mp(e,l),e===me&&(ie=me=null,ye=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Ua||(Ua=!0,Xd(Ga,function(){return Xn(),null})),l=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||l){l=qe.transition,qe.transition=null;var o=H;H=1;var i=j;j|=4,Zi.current=null,Zm(e,n),Vd(n,e),Cm(Yo),Za=!!Jo,Yo=Jo=null,e.current=n,qm(n,e,a),Tp(),j=i,H=o,qe.transition=l}else e.current=n;if(Ua&&(Ua=!1,Ht=e,ml=a),l=e.pendingLanes,l===0&&(Gt=null),Lp(n.stateNode,r),Ue(e,oe()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],r(a.value,{componentStack:a.stack,digest:a.digest});if(pl)throw pl=!1,e=hi,hi=null,e;return(ml&1)!==0&&e.tag!==0&&Xn(),l=e.pendingLanes,(l&1)!==0?e===vi?Ur++:(Ur=0,vi=e):Ur=0,rn(),null}function Xn(){if(Ht!==null){var e=$c(ml),t=qe.transition,n=H;try{if(qe.transition=null,H=16>e?16:e,Ht===null)var r=!1;else{if(e=Ht,Ht=null,ml=0,(j&6)!==0)throw Error(R(331));var a=j;for(j|=4,D=e.current;D!==null;){var l=D,o=l.child;if((D.flags&16)!==0){var i=l.deletions;if(i!==null){for(var s=0;s<i.length;s++){var u=i[s];for(D=u;D!==null;){var m=D;switch(m.tag){case 0:case 11:case 15:Lr(8,m,l)}var h=m.child;if(h!==null)h.return=m,D=h;else for(;D!==null;){m=D;var v=m.sibling,S=m.return;if(jd(m),m===u){D=null;break}if(v!==null){v.return=S,D=v;break}D=S}}}var E=l.alternate;if(E!==null){var w=E.child;if(w!==null){E.child=null;do{var N=w.sibling;w.sibling=null,w=N}while(w!==null)}}D=l}}if((l.subtreeFlags&2064)!==0&&o!==null)o.return=l,D=o;else e:for(;D!==null;){if(l=D,(l.flags&2048)!==0)switch(l.tag){case 0:case 11:case 15:Lr(9,l,l.return)}var d=l.sibling;if(d!==null){d.return=l.return,D=d;break e}D=l.return}}var c=e.current;for(D=c;D!==null;){o=D;var f=o.child;if((o.subtreeFlags&2064)!==0&&f!==null)f.return=o,D=f;else e:for(o=c;D!==null;){if(i=D,(i.flags&2048)!==0)try{switch(i.tag){case 0:case 11:case 15:Rl(9,i)}}catch(x){ae(i,i.return,x)}if(i===o){D=null;break e}var y=i.sibling;if(y!==null){y.return=i.return,D=y;break e}D=i.return}}if(j=a,rn(),St&&typeof St.onPostCommitFiberRoot=="function")try{St.onPostCommitFiberRoot(yl,e)}catch{}r=!0}return r}finally{H=n,qe.transition=t}}return!1}function tc(e,t,n){t=rr(n,t),t=$d(e,t,1),e=Yt(e,t,1),t=Pe(),e!==null&&(ea(e,1,t),Ue(e,t))}function ae(e,t,n){if(e.tag===3)tc(e,e,n);else for(;t!==null;){if(t.tag===3){tc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Gt===null||!Gt.has(r))){e=rr(n,e),e=Pd(t,e,1),t=Yt(t,e,1),e=Pe(),t!==null&&(ea(t,1,e),Ue(t,e));break}}t=t.return}}function lh(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Pe(),e.pingedLanes|=e.suspendedLanes&n,me===e&&(ye&n)===n&&(de===4||de===3&&(ye&130023424)===ye&&500>oe()-es?gn(e,0):qi|=n),Ue(e,t)}function Yd(e,t){t===0&&((e.mode&1)===0?t=1:(t=Sa,Sa<<=1,(Sa&130023424)===0&&(Sa=4194304)));var n=Pe();e=Dt(e,t),e!==null&&(ea(e,t,n),Ue(e,n))}function oh(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Yd(e,n)}function ih(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(R(314))}r!==null&&r.delete(t),Yd(e,n)}var Gd;Gd=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Le.current)Fe=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return Fe=!1,Jm(e,t,n);Fe=(e.flags&131072)!==0}else Fe=!1,q&&(t.flags&1048576)!==0&&ed(t,ll,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ba(e,t),e=t.pendingProps;var a=qn(t,Re.current);Gn(t,n),a=Qi(null,t,r,e,a,n);var l=Ji();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Oe(r)?(l=!0,rl(t)):l=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Vi(t),a.updater=kl,t.stateNode=a,a._reactInternals=t,ai(t,r,e,n),t=ii(null,t,r,!0,l,n)):(t.tag=0,q&&l&&Oi(t),$e(null,t,a,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ba(e,t),e=t.pendingProps,a=r._init,r=a(r._payload),t.type=r,a=t.tag=uh(r),e=st(r,e),a){case 0:t=oi(null,t,r,e,n);break e;case 1:t=Wu(null,t,r,e,n);break e;case 11:t=Bu(null,t,r,e,n);break e;case 14:t=Hu(null,t,r,st(r.type,e),n);break e}throw Error(R(306,r,""))}return t;case 0:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:st(r,a),oi(e,t,r,a,n);case 1:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:st(r,a),Wu(e,t,r,a,n);case 3:e:{if(Fd(t),e===null)throw Error(R(387));r=t.pendingProps,l=t.memoizedState,a=l.element,od(e,t),sl(t,r,null,n);var o=t.memoizedState;if(r=o.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){a=rr(Error(R(423)),t),t=Ku(e,t,r,n,a);break e}else if(r!==a){a=rr(Error(R(424)),t),t=Ku(e,t,r,n,a);break e}else for(ze=Jt(t.stateNode.containerInfo.firstChild),Ve=t,q=!0,ct=null,n=ad(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(er(),r===a){t=Ft(e,t,n);break e}$e(e,t,r,n)}t=t.child}return t;case 5:return id(t),e===null&&ti(t),r=t.type,a=t.pendingProps,l=e!==null?e.memoizedProps:null,o=a.children,Go(r,a)?o=null:l!==null&&Go(r,l)&&(t.flags|=32),Dd(e,t),$e(e,t,o,n),t.child;case 6:return e===null&&ti(t),null;case 13:return Ld(e,t,n);case 4:return Bi(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=tr(t,null,r,n):$e(e,t,r,n),t.child;case 11:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:st(r,a),Bu(e,t,r,a,n);case 7:return $e(e,t,t.pendingProps,n),t.child;case 8:return $e(e,t,t.pendingProps.children,n),t.child;case 12:return $e(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,a=t.pendingProps,l=t.memoizedProps,o=a.value,J(ol,r._currentValue),r._currentValue=o,l!==null)if(pt(l.value,o)){if(l.children===a.children&&!Le.current){t=Ft(e,t,n);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var i=l.dependencies;if(i!==null){o=l.child;for(var s=i.firstContext;s!==null;){if(s.context===r){if(l.tag===1){s=Pt(-1,n&-n),s.tag=2;var u=l.updateQueue;if(u!==null){u=u.shared;var m=u.pending;m===null?s.next=s:(s.next=m.next,m.next=s),u.pending=s}}l.lanes|=n,s=l.alternate,s!==null&&(s.lanes|=n),ni(l.return,n,t),i.lanes|=n;break}s=s.next}}else if(l.tag===10)o=l.type===t.type?null:l.child;else if(l.tag===18){if(o=l.return,o===null)throw Error(R(341));o.lanes|=n,i=o.alternate,i!==null&&(i.lanes|=n),ni(o,n,t),o=l.sibling}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===t){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}$e(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,r=t.pendingProps.children,Gn(t,n),a=et(a),r=r(a),t.flags|=1,$e(e,t,r,n),t.child;case 14:return r=t.type,a=st(r,t.pendingProps),a=st(r.type,a),Hu(e,t,r,a,n);case 15:return bd(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:st(r,a),Ba(e,t),t.tag=1,Oe(r)?(e=!0,rl(t)):e=!1,Gn(t,n),xd(t,r,a),ai(t,r,a,n),ii(null,t,r,!0,e,n);case 19:return Od(e,t,n);case 22:return Td(e,t,n)}throw Error(R(156,t.tag))};function Xd(e,t){return kc(e,t)}function sh(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ze(e,t,n,r){return new sh(e,t,n,r)}function as(e){return e=e.prototype,!(!e||!e.isReactComponent)}function uh(e){if(typeof e=="function")return as(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ei)return 11;if(e===ki)return 14}return 2}function Zt(e,t){var n=e.alternate;return n===null?(n=Ze(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ka(e,t,n,r,a,l){var o=2;if(r=e,typeof e=="function")as(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case On:return wn(n.children,a,l,t);case Si:o=8,a|=8;break;case $o:return e=Ze(12,n,t,a|2),e.elementType=$o,e.lanes=l,e;case Po:return e=Ze(13,n,t,a),e.elementType=Po,e.lanes=l,e;case bo:return e=Ze(19,n,t,a),e.elementType=bo,e.lanes=l,e;case ic:return xl(n,a,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case lc:o=10;break e;case oc:o=9;break e;case Ei:o=11;break e;case ki:o=14;break e;case jt:o=16,r=null;break e}throw Error(R(130,e==null?e:typeof e,""))}return t=Ze(o,n,t,a),t.elementType=e,t.type=r,t.lanes=l,t}function wn(e,t,n,r){return e=Ze(7,e,r,t),e.lanes=n,e}function xl(e,t,n,r){return e=Ze(22,e,r,t),e.elementType=ic,e.lanes=n,e.stateNode={isHidden:!1},e}function Ro(e,t,n){return e=Ze(6,e,null,t),e.lanes=n,e}function Co(e,t,n){return t=Ze(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function ch(e,t,n,r,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=so(0),this.expirationTimes=so(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=so(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function ls(e,t,n,r,a,l,o,i,s){return e=new ch(e,t,n,i,s),t===1?(t=1,l===!0&&(t|=8)):t=0,l=Ze(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Vi(l),e}function dh(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ln,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Zd(e){if(!e)return en;e=e._reactInternals;e:{if(Cn(e)!==e||e.tag!==1)throw Error(R(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Oe(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(R(171))}if(e.tag===1){var n=e.type;if(Oe(n))return Zc(e,n,t)}return t}function qd(e,t,n,r,a,l,o,i,s){return e=ls(n,r,!0,e,a,l,o,i,s),e.context=Zd(null),n=e.current,r=Pe(),a=Xt(n),l=Pt(r,a),l.callback=t??null,Yt(n,l,a),e.current.lanes=a,ea(e,a,r),Ue(e,r),e}function $l(e,t,n,r){var a=t.current,l=Pe(),o=Xt(a);return n=Zd(n),t.context===null?t.context=n:t.pendingContext=n,t=Pt(l,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Yt(a,t,o),e!==null&&(ft(e,a,o,l),Ma(e,a,o)),o}function vl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function nc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function os(e,t){nc(e,t),(e=e.alternate)&&nc(e,t)}function fh(){return null}var ef=typeof reportError=="function"?reportError:function(e){console.error(e)};function is(e){this._internalRoot=e}Pl.prototype.render=is.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(R(409));$l(e,t,null,null)};Pl.prototype.unmount=is.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;kn(function(){$l(null,e,null,null)}),t[Tt]=null}};function Pl(e){this._internalRoot=e}Pl.prototype.unstable_scheduleHydration=function(e){if(e){var t=Tc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<zt.length&&t!==0&&t<zt[n].priority;n++);zt.splice(n,0,e),n===0&&Fc(e)}};function ss(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function bl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function rc(){}function ph(e,t,n,r,a){if(a){if(typeof r=="function"){var l=r;r=function(){var u=vl(o);l.call(u)}}var o=qd(t,r,e,0,null,!1,!1,"",rc);return e._reactRootContainer=o,e[Tt]=o.current,Wr(e.nodeType===8?e.parentNode:e),kn(),o}for(;a=e.lastChild;)e.removeChild(a);if(typeof r=="function"){var i=r;r=function(){var u=vl(s);i.call(u)}}var s=ls(e,0,!1,null,null,!1,!1,"",rc);return e._reactRootContainer=s,e[Tt]=s.current,Wr(e.nodeType===8?e.parentNode:e),kn(function(){$l(t,s,n,r)}),s}function Tl(e,t,n,r,a){var l=n._reactRootContainer;if(l){var o=l;if(typeof a=="function"){var i=a;a=function(){var s=vl(o);i.call(s)}}$l(t,o,e,a)}else o=ph(n,t,e,a,r);return vl(o)}Pc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Cr(t.pendingLanes);n!==0&&(xi(t,n|1),Ue(t,oe()),(j&6)===0&&(ar=oe()+500,rn()))}break;case 13:kn(function(){var r=Dt(e,1);if(r!==null){var a=Pe();ft(r,e,1,a)}}),os(e,1)}};$i=function(e){if(e.tag===13){var t=Dt(e,134217728);if(t!==null){var n=Pe();ft(t,e,134217728,n)}os(e,134217728)}};bc=function(e){if(e.tag===13){var t=Xt(e),n=Dt(e,t);if(n!==null){var r=Pe();ft(n,e,t,r)}os(e,t)}};Tc=function(){return H};Dc=function(e,t){var n=H;try{return H=e,t()}finally{H=n}};Mo=function(e,t,n){switch(t){case"input":if(Fo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=Nl(r);if(!a)throw Error(R(90));uc(r),Fo(r,a)}}}break;case"textarea":dc(e,n);break;case"select":t=n.value,t!=null&&Kn(e,!!n.multiple,t,!1)}};gc=ts;wc=kn;var mh={usingClientEntryPoint:!1,Events:[na,jn,Nl,vc,yc,ts]},Sr={findFiberByHostInstance:hn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},hh={bundleType:Sr.bundleType,version:Sr.version,rendererPackageName:Sr.rendererPackageName,rendererConfig:Sr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Lt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Sc(e),e===null?null:e.stateNode},findFiberByHostInstance:Sr.findFiberByHostInstance||fh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Er=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Er.isDisabled&&Er.supportsFiber))try{yl=Er.inject(hh),St=Er}catch{}var Er;We.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=mh;We.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ss(t))throw Error(R(200));return dh(e,t,null,n)};We.createRoot=function(e,t){if(!ss(e))throw Error(R(299));var n=!1,r="",a=ef;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=ls(e,1,!1,null,null,n,!1,r,a),e[Tt]=t.current,Wr(e.nodeType===8?e.parentNode:e),new is(t)};We.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(R(188)):(e=Object.keys(e).join(","),Error(R(268,e)));return e=Sc(t),e=e===null?null:e.stateNode,e};We.flushSync=function(e){return kn(e)};We.hydrate=function(e,t,n){if(!bl(t))throw Error(R(200));return Tl(null,e,t,!0,n)};We.hydrateRoot=function(e,t,n){if(!ss(e))throw Error(R(405));var r=n!=null&&n.hydratedSources||null,a=!1,l="",o=ef;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=qd(t,null,e,1,n??null,a,!1,l,o),e[Tt]=t.current,Wr(e),r)for(e=0;e<r.length;e++)n=r[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new Pl(t)};We.render=function(e,t,n){if(!bl(t))throw Error(R(200));return Tl(null,e,t,!1,n)};We.unmountComponentAtNode=function(e){if(!bl(e))throw Error(R(40));return e._reactRootContainer?(kn(function(){Tl(null,null,e,!1,function(){e._reactRootContainer=null,e[Tt]=null})}),!0):!1};We.unstable_batchedUpdates=ts;We.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!bl(n))throw Error(R(200));if(e==null||e._reactInternals===void 0)throw Error(R(38));return Tl(e,t,n,!1,r)};We.version="18.3.1-next-f1338f8080-20240426"});var us=dn((Wv,rf)=>{"use strict";function nf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(nf)}catch(e){console.error(e)}}nf(),rf.exports=tf()});var lf=dn(cs=>{"use strict";var af=us();cs.createRoot=af.createRoot,cs.hydrateRoot=af.hydrateRoot;var Kv});var $=cr(fr()),Mf=cr(lf());var z=cr(fr()),lv=cr(us());var b=cr(fr());function aa(){return aa=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},aa.apply(this,arguments)}var mt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(mt||(mt={}));var of="popstate";function ff(e){e===void 0&&(e={});function t(r,a){let{pathname:l,search:o,hash:i}=r.location;return fs("",{pathname:l,search:o,hash:i},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(r,a){return typeof a=="string"?a:xn(a)}return yh(t,n,null,e)}function X(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ps(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function vh(){return Math.random().toString(36).substr(2,8)}function sf(e,t){return{usr:e.state,key:e.key,idx:t}}function fs(e,t,n,r){return n===void 0&&(n=null),aa({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Ot(t):t,{state:n,key:t&&t.key||r||vh()})}function xn(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Ot(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function yh(e,t,n,r){r===void 0&&(r={});let{window:a=document.defaultView,v5Compat:l=!1}=r,o=a.history,i=mt.Pop,s=null,u=m();u==null&&(u=0,o.replaceState(aa({},o.state,{idx:u}),""));function m(){return(o.state||{idx:null}).idx}function h(){i=mt.Pop;let N=m(),d=N==null?null:N-u;u=N,s&&s({action:i,location:w.location,delta:d})}function v(N,d){i=mt.Push;let c=fs(w.location,N,d);n&&n(c,N),u=m()+1;let f=sf(c,u),y=w.createHref(c);try{o.pushState(f,"",y)}catch(x){if(x instanceof DOMException&&x.name==="DataCloneError")throw x;a.location.assign(y)}l&&s&&s({action:i,location:w.location,delta:1})}function S(N,d){i=mt.Replace;let c=fs(w.location,N,d);n&&n(c,N),u=m();let f=sf(c,u),y=w.createHref(c);o.replaceState(f,"",y),l&&s&&s({action:i,location:w.location,delta:0})}function E(N){let d=a.location.origin!=="null"?a.location.origin:a.location.href,c=typeof N=="string"?N:xn(N);return c=c.replace(/ $/,"%20"),X(d,"No window.location.(origin|href) available to create URL for href: "+c),new URL(c,d)}let w={get action(){return i},get location(){return e(a,o)},listen(N){if(s)throw new Error("A history only accepts one active listener");return a.addEventListener(of,h),s=N,()=>{a.removeEventListener(of,h),s=null}},createHref(N){return t(a,N)},createURL:E,encodeLocation(N){let d=E(N);return{pathname:d.pathname,search:d.search,hash:d.hash}},push:v,replace:S,go(N){return o.go(N)}};return w}var uf;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(uf||(uf={}));function Dl(e,t,n){return n===void 0&&(n="/"),gh(e,t,n,!1)}function gh(e,t,n,r){let a=typeof t=="string"?Ot(t):t,l=ln(a.pathname||"/",n);if(l==null)return null;let o=pf(e);wh(o);let i=null;for(let s=0;i==null&&s<o.length;++s){let u=hf(l);i=$h(o[s],u,r)}return i}function pf(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let a=(l,o,i)=>{let s={relativePath:i===void 0?l.path||"":i,caseSensitive:l.caseSensitive===!0,childrenIndex:o,route:l};s.relativePath.startsWith("/")&&(X(s.relativePath.startsWith(r),'Absolute route path "'+s.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),s.relativePath=s.relativePath.slice(r.length));let u=kt([r,s.relativePath]),m=n.concat(s);l.children&&l.children.length>0&&(X(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),pf(l.children,t,m,u)),!(l.path==null&&!l.index)&&t.push({path:u,score:Ch(u,l.index),routesMeta:m})};return e.forEach((l,o)=>{var i;if(l.path===""||!((i=l.path)!=null&&i.includes("?")))a(l,o);else for(let s of mf(l.path))a(l,o,s)}),t}function mf(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,a=n.endsWith("?"),l=n.replace(/\?$/,"");if(r.length===0)return a?[l,""]:[l];let o=mf(r.join("/")),i=[];return i.push(...o.map(s=>s===""?l:[l,s].join("/"))),a&&i.push(...o),i.map(s=>e.startsWith("/")&&s===""?"/":s)}function wh(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:xh(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var _h=/^:[\w-]+$/,Nh=3,Sh=2,Eh=1,kh=10,Rh=-2,cf=e=>e==="*";function Ch(e,t){let n=e.split("/"),r=n.length;return n.some(cf)&&(r+=Rh),t&&(r+=Sh),n.filter(a=>!cf(a)).reduce((a,l)=>a+(_h.test(l)?Nh:l===""?Eh:kh),r)}function xh(e,t){return e.length===t.length&&e.slice(0,-1).every((r,a)=>r===t[a])?e[e.length-1]-t[t.length-1]:0}function $h(e,t,n){n===void 0&&(n=!1);let{routesMeta:r}=e,a={},l="/",o=[];for(let i=0;i<r.length;++i){let s=r[i],u=i===r.length-1,m=l==="/"?t:t.slice(l.length)||"/",h=an({path:s.relativePath,caseSensitive:s.caseSensitive,end:u},m),v=s.route;if(!h&&u&&n&&!r[r.length-1].route.index&&(h=an({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},m)),!h)return null;Object.assign(a,h.params),o.push({params:a,pathname:kt([l,h.pathname]),pathnameBase:Fh(kt([l,h.pathnameBase])),route:v}),h.pathnameBase!=="/"&&(l=kt([l,h.pathnameBase]))}return o}function an(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Ph(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let l=a[0],o=l.replace(/(.)\/+$/,"$1"),i=a.slice(1);return{params:r.reduce((u,m,h)=>{let{paramName:v,isOptional:S}=m;if(v==="*"){let w=i[h]||"";o=l.slice(0,l.length-w.length).replace(/(.)\/+$/,"$1")}let E=i[h];return S&&!E?u[v]=void 0:u[v]=(E||"").replace(/%2F/g,"/"),u},{}),pathname:l,pathnameBase:o,pattern:e}}function Ph(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),ps(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,i,s)=>(r.push({paramName:i,isOptional:s!=null}),s?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function hf(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ps(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function ln(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}var bh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Th=e=>bh.test(e);function ms(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:a=""}=typeof e=="string"?Ot(e):e,l;if(n)if(Th(n))l=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),ps(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?l=df(n.substring(1),"/"):l=df(n,t)}else l=t;return{pathname:l,search:Lh(r),hash:Oh(a)}}function df(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function ds(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Dh(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Fl(e,t){let n=Dh(e);return t?n.map((r,a)=>a===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Ll(e,t,n,r){r===void 0&&(r=!1);let a;typeof e=="string"?a=Ot(e):(a=aa({},e),X(!a.pathname||!a.pathname.includes("?"),ds("?","pathname","search",a)),X(!a.pathname||!a.pathname.includes("#"),ds("#","pathname","hash",a)),X(!a.search||!a.search.includes("#"),ds("#","search","hash",a)));let l=e===""||a.pathname==="",o=l?"/":a.pathname,i;if(o==null)i=n;else{let h=t.length-1;if(!r&&o.startsWith("..")){let v=o.split("/");for(;v[0]==="..";)v.shift(),h-=1;a.pathname=v.join("/")}i=h>=0?t[h]:"/"}let s=ms(a,i),u=o&&o!=="/"&&o.endsWith("/"),m=(l||o===".")&&n.endsWith("/");return!s.pathname.endsWith("/")&&(u||m)&&(s.pathname+="/"),s}var kt=e=>e.join("/").replace(/\/\/+/g,"/"),Fh=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Lh=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Oh=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Ol(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var vf=["post","put","patch","delete"],Jv=new Set(vf),Uh=["get",...vf],Yv=new Set(Uh);var Gv=Symbol("deferred");function la(){return la=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},la.apply(this,arguments)}var sr=b.createContext(null),Il=b.createContext(null);var ht=b.createContext(null),ia=b.createContext(null),vt=b.createContext({outlet:null,matches:[],isDataRoute:!1}),wf=b.createContext(null);function vs(e,t){let{relative:n}=t===void 0?{}:t;$n()||X(!1);let{basename:r,navigator:a}=b.useContext(ht),{hash:l,pathname:o,search:i}=ur(e,{relative:n}),s=o;return r!=="/"&&(s=o==="/"?r:kt([r,o])),a.createHref({pathname:s,search:i,hash:l})}function $n(){return b.useContext(ia)!=null}function on(){return $n()||X(!1),b.useContext(ia).location}function _f(e){b.useContext(ht).static||b.useLayoutEffect(e)}function sn(){let{isDataRoute:e}=b.useContext(vt);return e?Zh():Hh()}function Hh(){$n()||X(!1);let e=b.useContext(sr),{basename:t,future:n,navigator:r}=b.useContext(ht),{matches:a}=b.useContext(vt),{pathname:l}=on(),o=JSON.stringify(Fl(a,n.v7_relativeSplatPath)),i=b.useRef(!1);return _f(()=>{i.current=!0}),b.useCallback(function(u,m){if(m===void 0&&(m={}),!i.current)return;if(typeof u=="number"){r.go(u);return}let h=Ll(u,JSON.parse(o),l,m.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:kt([t,h.pathname])),(m.replace?r.replace:r.push)(h,m.state,m)},[t,r,o,l,e])}function ys(){let{matches:e}=b.useContext(vt),t=e[e.length-1];return t?t.params:{}}function ur(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=b.useContext(ht),{matches:a}=b.useContext(vt),{pathname:l}=on(),o=JSON.stringify(Fl(a,r.v7_relativeSplatPath));return b.useMemo(()=>Ll(e,JSON.parse(o),l,n==="path"),[e,o,l,n])}function Nf(e,t){return Sf(e,t)}function Sf(e,t,n,r){$n()||X(!1);let{navigator:a}=b.useContext(ht),{matches:l}=b.useContext(vt),o=l[l.length-1],i=o?o.params:{},s=o?o.pathname:"/",u=o?o.pathnameBase:"/",m=o&&o.route,h=on(),v;if(t){var S;let c=typeof t=="string"?Ot(t):t;u==="/"||(S=c.pathname)!=null&&S.startsWith(u)||X(!1),v=c}else v=h;let E=v.pathname||"/",w=E;if(u!=="/"){let c=u.replace(/^\//,"").split("/");w="/"+E.replace(/^\//,"").split("/").slice(c.length).join("/")}let N=Dl(e,{pathname:w}),d=Jh(N&&N.map(c=>Object.assign({},c,{params:Object.assign({},i,c.params),pathname:kt([u,a.encodeLocation?a.encodeLocation(c.pathname).pathname:c.pathname]),pathnameBase:c.pathnameBase==="/"?u:kt([u,a.encodeLocation?a.encodeLocation(c.pathnameBase).pathname:c.pathnameBase])})),l,n,r);return t&&d?b.createElement(ia.Provider,{value:{location:la({pathname:"/",search:"",hash:"",state:null,key:"default"},v),navigationType:mt.Pop}},d):d}function Wh(){let e=Rf(),t=Ol(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",a={padding:"0.5rem",backgroundColor:r},l={padding:"2px 4px",backgroundColor:r};return b.createElement(b.Fragment,null,b.createElement("h2",null,"Unexpected Application Error!"),b.createElement("h3",{style:{fontStyle:"italic"}},t),n?b.createElement("pre",{style:a},n):null,null)}var Kh=b.createElement(Wh,null),hs=class extends b.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?b.createElement(vt.Provider,{value:this.props.routeContext},b.createElement(wf.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Qh(e){let{routeContext:t,match:n,children:r}=e,a=b.useContext(sr);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),b.createElement(vt.Provider,{value:t},r)}function Jh(e,t,n,r){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var l;if(!n)return null;if(n.errors)e=n.matches;else if((l=r)!=null&&l.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,i=(a=n)==null?void 0:a.errors;if(i!=null){let m=o.findIndex(h=>h.route.id&&i?.[h.route.id]!==void 0);m>=0||X(!1),o=o.slice(0,Math.min(o.length,m+1))}let s=!1,u=-1;if(n&&r&&r.v7_partialHydration)for(let m=0;m<o.length;m++){let h=o[m];if((h.route.HydrateFallback||h.route.hydrateFallbackElement)&&(u=m),h.route.id){let{loaderData:v,errors:S}=n,E=h.route.loader&&v[h.route.id]===void 0&&(!S||S[h.route.id]===void 0);if(h.route.lazy||E){s=!0,u>=0?o=o.slice(0,u+1):o=[o[0]];break}}}return o.reduceRight((m,h,v)=>{let S,E=!1,w=null,N=null;n&&(S=i&&h.route.id?i[h.route.id]:void 0,w=h.route.errorElement||Kh,s&&(u<0&&v===0?(qh("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),E=!0,N=null):u===v&&(E=!0,N=h.route.hydrateFallbackElement||null)));let d=t.concat(o.slice(0,v+1)),c=()=>{let f;return S?f=w:E?f=N:h.route.Component?f=b.createElement(h.route.Component,null):h.route.element?f=h.route.element:f=m,b.createElement(Qh,{match:h,routeContext:{outlet:m,matches:d,isDataRoute:n!=null},children:f})};return n&&(h.route.ErrorBoundary||h.route.errorElement||v===0)?b.createElement(hs,{location:n.location,revalidation:n.revalidation,component:w,error:S,children:c(),routeContext:{outlet:null,matches:d,isDataRoute:!0}}):c()},null)}var Ef=(function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e})(Ef||{}),Ul=(function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e})(Ul||{});function Yh(e){let t=b.useContext(sr);return t||X(!1),t}function Gh(e){let t=b.useContext(Il);return t||X(!1),t}function Xh(e){let t=b.useContext(vt);return t||X(!1),t}function kf(e){let t=Xh(e),n=t.matches[t.matches.length-1];return n.route.id||X(!1),n.route.id}function Rf(){var e;let t=b.useContext(wf),n=Gh(Ul.UseRouteError),r=kf(Ul.UseRouteError);return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function Zh(){let{router:e}=Yh(Ef.UseNavigateStable),t=kf(Ul.UseNavigateStable),n=b.useRef(!1);return _f(()=>{n.current=!0}),b.useCallback(function(a,l){l===void 0&&(l={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,la({fromRouteId:t},l)))},[e,t])}var yf={};function qh(e,t,n){!t&&!yf[e]&&(yf[e]=!0)}var ir=(e,t,n)=>(""+t+("You can use the `"+e+"` future flag to opt-in early. ")+("For more information, see "+n+"."),void 0);function Cf(e,t){e?.v7_startTransition===void 0&&ir("v7_startTransition","React Router will begin wrapping state updates in `React.startTransition` in v7","https://reactrouter.com/v6/upgrading/future#v7_starttransition"),e?.v7_relativeSplatPath===void 0&&(!t||t.v7_relativeSplatPath===void 0)&&ir("v7_relativeSplatPath","Relative route resolution within Splat routes is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath"),t&&(t.v7_fetcherPersist===void 0&&ir("v7_fetcherPersist","The persistence behavior of fetchers is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist"),t.v7_normalizeFormMethod===void 0&&ir("v7_normalizeFormMethod","Casing of `formMethod` fields is being normalized to uppercase in v7","https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod"),t.v7_partialHydration===void 0&&ir("v7_partialHydration","`RouterProvider` hydration behavior is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_partialhydration"),t.v7_skipActionErrorRevalidation===void 0&&ir("v7_skipActionErrorRevalidation","The revalidation behavior after 4xx/5xx `action` responses is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation"))}var ev="startTransition",ry=b[ev];function gs(e){let{to:t,replace:n,state:r,relative:a}=e;$n()||X(!1);let{future:l,static:o}=b.useContext(ht),{matches:i}=b.useContext(vt),{pathname:s}=on(),u=sn(),m=Ll(t,Fl(i,l.v7_relativeSplatPath),s,a==="path"),h=JSON.stringify(m);return b.useEffect(()=>u(JSON.parse(h),{replace:n,state:r,relative:a}),[u,h,a,n,r]),null}function un(e){X(!1)}function ws(e){let{basename:t="/",children:n=null,location:r,navigationType:a=mt.Pop,navigator:l,static:o=!1,future:i}=e;$n()&&X(!1);let s=t.replace(/^\/*/,"/"),u=b.useMemo(()=>({basename:s,navigator:l,static:o,future:la({v7_relativeSplatPath:!1},i)}),[s,i,l,o]);typeof r=="string"&&(r=Ot(r));let{pathname:m="/",search:h="",hash:v="",state:S=null,key:E="default"}=r,w=b.useMemo(()=>{let N=ln(m,s);return N==null?null:{location:{pathname:N,search:h,hash:v,state:S,key:E},navigationType:a}},[s,m,h,v,S,E,a]);return w==null?null:b.createElement(ht.Provider,{value:u},b.createElement(ia.Provider,{children:n,value:w}))}function _s(e){let{children:t,location:n}=e;return Nf(oa(t),n)}var ay=new Promise(()=>{});function oa(e,t){t===void 0&&(t=[]);let n=[];return b.Children.forEach(e,(r,a)=>{if(!b.isValidElement(r))return;let l=[...t,a];if(r.type===b.Fragment){n.push.apply(n,oa(r.props.children,l));return}r.type!==un&&X(!1),!r.props.index||!r.props.children||X(!1);let o={id:r.props.id||l.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=oa(r.props.children,l)),n.push(o)}),n}function Al(){return Al=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Al.apply(this,arguments)}function Pf(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,l;for(l=0;l<r.length;l++)a=r[l],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function ov(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function iv(e,t){return e.button===0&&(!t||t==="_self")&&!ov(e)}var sv=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],uv=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"];var cv="6";try{window.__reactRouterVersion=cv}catch{}var dv=z.createContext({isTransitioning:!1});var fv="startTransition",xf=z[fv],pv="flushSync",Py=lv[pv],mv="useId",by=z[mv];function bf(e){let{basename:t,children:n,future:r,window:a}=e,l=z.useRef();l.current==null&&(l.current=ff({window:a,v5Compat:!0}));let o=l.current,[i,s]=z.useState({action:o.action,location:o.location}),{v7_startTransition:u}=r||{},m=z.useCallback(h=>{u&&xf?xf(()=>s(h)):s(h)},[s,u]);return z.useLayoutEffect(()=>o.listen(m),[o,m]),z.useEffect(()=>Cf(r),[r]),z.createElement(ws,{basename:t,children:n,location:i.location,navigationType:i.action,navigator:o,future:r})}var hv=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",vv=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,cn=z.forwardRef(function(t,n){let{onClick:r,relative:a,reloadDocument:l,replace:o,state:i,target:s,to:u,preventScrollReset:m,viewTransition:h}=t,v=Pf(t,sv),{basename:S}=z.useContext(ht),E,w=!1;if(typeof u=="string"&&vv.test(u)&&(E=u,hv))try{let f=new URL(window.location.href),y=u.startsWith("//")?new URL(f.protocol+u):new URL(u),x=ln(y.pathname,S);y.origin===f.origin&&x!=null?u=x+y.search+y.hash:w=!0}catch{}let N=vs(u,{relative:a}),d=gv(u,{replace:o,state:i,target:s,preventScrollReset:m,relative:a,viewTransition:h});function c(f){r&&r(f),f.defaultPrevented||d(f)}return z.createElement("a",Al({},v,{href:E||N,onClick:w||l?r:c,ref:n,target:s}))}),jl=z.forwardRef(function(t,n){let{"aria-current":r="page",caseSensitive:a=!1,className:l="",end:o=!1,style:i,to:s,viewTransition:u,children:m}=t,h=Pf(t,uv),v=ur(s,{relative:h.relative}),S=on(),E=z.useContext(Il),{navigator:w,basename:N}=z.useContext(ht),d=E!=null&&wv(v)&&u===!0,c=w.encodeLocation?w.encodeLocation(v).pathname:v.pathname,f=S.pathname,y=E&&E.navigation&&E.navigation.location?E.navigation.location.pathname:null;a||(f=f.toLowerCase(),y=y?y.toLowerCase():null,c=c.toLowerCase()),y&&N&&(y=ln(y,N)||y);let x=c!=="/"&&c.endsWith("/")?c.length-1:c.length,P=f===c||!o&&f.startsWith(c)&&f.charAt(x)==="/",F=y!=null&&(y===c||!o&&y.startsWith(c)&&y.charAt(c.length)==="/"),T={isActive:P,isPending:F,isTransitioning:d},A=P?r:void 0,L;typeof l=="function"?L=l(T):L=[l,P?"active":null,F?"pending":null,d?"transitioning":null].filter(Boolean).join(" ");let Z=typeof i=="function"?i(T):i;return z.createElement(cn,Al({},h,{"aria-current":A,className:L,ref:n,style:Z,to:s,viewTransition:u}),typeof m=="function"?m(T):m)});var Ns;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Ns||(Ns={}));var $f;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})($f||($f={}));function yv(e){let t=z.useContext(sr);return t||X(!1),t}function gv(e,t){let{target:n,replace:r,state:a,preventScrollReset:l,relative:o,viewTransition:i}=t===void 0?{}:t,s=sn(),u=on(),m=ur(e,{relative:o});return z.useCallback(h=>{if(iv(h,n)){h.preventDefault();let v=r!==void 0?r:xn(u)===xn(m);s(e,{replace:v,state:a,preventScrollReset:l,relative:o,viewTransition:i})}},[u,s,m,r,a,n,e,l,o,i])}function wv(e,t){t===void 0&&(t={});let n=z.useContext(dv);n==null&&X(!1);let{basename:r}=yv(Ns.useViewTransitionState),a=ur(e,{relative:t.relative});if(!n.isTransitioning)return!1;let l=ln(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=ln(n.nextLocation.pathname,r)||n.nextLocation.pathname;return an(a.pathname,o)!=null||an(a.pathname,l)!=null}var Df=function(e,t,n,r){var a;t[0]=0;for(var l=1;l<t.length;l++){var o=t[l++],i=t[l]?(t[0]|=o?1:2,n[t[l++]]):t[++l];o===3?r[0]=i:o===4?r[1]=Object.assign(r[1]||{},i):o===5?(r[1]=r[1]||{})[t[++l]]=i:o===6?r[1][t[++l]]+=i+"":o?(a=e.apply(i,Df(e,i,n,["",null])),r.push(a),i[0]?t[0]|=2:(t[l-2]=0,t[l]=a)):r.push(i)}return r},Tf=new Map;function Ff(e){var t=Tf.get(this);return t||(t=new Map,Tf.set(this,t)),(t=Df(this,t.get(e)||(t.set(e,t=(function(n){for(var r,a,l=1,o="",i="",s=[0],u=function(v){l===1&&(v||(o=o.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(0,v,o):l===3&&(v||o)?(s.push(3,v,o),l=2):l===2&&o==="..."&&v?s.push(4,v,0):l===2&&o&&!v?s.push(5,0,!0,o):l>=5&&((o||!v&&l===5)&&(s.push(l,0,o,a),l=6),v&&(s.push(l,v,0,a),l=6)),o=""},m=0;m<n.length;m++){m&&(l===1&&u(),u(m));for(var h=0;h<n[m].length;h++)r=n[m][h],l===1?r==="<"?(u(),s=[s],l=3):o+=r:l===4?o==="--"&&r===">"?(l=1,o=""):o=r+o[0]:i?r===i?i="":o+=r:r==='"'||r==="'"?i=r:r===">"?(u(),l=1):l&&(r==="="?(l=5,a=o,o=""):r==="/"&&(l<5||n[m][h+1]===">")?(u(),l===3&&(s=s[0]),l=s,(s=s[0]).push(2,0,l),l=0):r===" "||r==="	"||r===`
`||r==="\r"?(u(),l=2):o+=r),l===3&&o==="!--"&&(l=4,s=s[0])}return u(),s})(e)),t),arguments,[])).length>1?t:t[0]}var Ml=document.getElementById("boot-fallback"),Lf=document.getElementById("boot-fallback-message");function _v(e){Lf&&(Lf.textContent=e)}function Nv(e){e&&_v(e),Ml&&Ml.classList.remove("hidden")}function Sv(){Ml&&Ml.classList.add("hidden")}function ua(e,t){t&&console.error(e,t),Nv(e)}var _=Ff.bind($.default.createElement);function Ie(e){return String(e||"unknown").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Ev(e){let t=String(e||"everyday");return t==="occasion"?"Occasion":t==="current_event"?"Current Event":"Everyday"}function kv(e){let t=String(e||"").toLowerCase();return t==="completed"||t==="approved"?"success":t.includes("reject")||t.includes("timeout")||t.includes("failed")?"danger":t.includes("pending")||t.includes("progress")||t.includes("queued")?"warning":"neutral"}function yt({value:e}){return _`<span className=${`badge ${kv(e)}`}>${Ie(e)}</span>`}function Ae(e){if(!e)return"-";let t=new Date(e);return Number.isNaN(t.getTime())?"-":t.toLocaleString()}function Rv(e){let t=Number(e||0);if(t<=0)return"0 B";let n=["B","KB","MB","GB","TB"],r=Math.min(Math.floor(Math.log(t)/Math.log(1024)),n.length-1);return`${(t/1024**r).toFixed(r===0?0:1)} ${n[r]}`}function Of(e){if(!e||typeof e!="object")return"";let t=["decision","status","winner_model","endpoint","image_preview_url","final_preview_url","notes"],n=[];return t.forEach(a=>{let l=e[a];l!=null&&String(l).trim()!==""&&n.push(`${a}: ${String(l)}`)}),n.length>0?n.slice(0,3).join(" | "):Object.entries(e).slice(0,2).map(([a,l])=>`${a}: ${String(l)}`).join(" | ")}async function K(e,t={}){let n=new Headers(t.headers||{});t.body&&!n.has("Content-Type")&&n.set("Content-Type","application/json");let r=await fetch(e,{...t,headers:n}),a=await r.text(),l=null;if(a)try{l=JSON.parse(a)}catch{l=a}if(!r.ok){let o=l&&typeof l=="object"&&l.detail?l.detail:r.statusText;throw new Error(o||`Request failed (${r.status})`)}return l}function Pn(e,t){let n=String(t?.message||"").trim();return n||`Unable to load ${e}`}function bn(e){let t=String(e?.message||"").trim().toLowerCase();return t==="not found"||t.includes("404")}function Cv(e){return{theme_name:String(e.theme_name||"Internal Theme").trim(),tone_funny_pct:Number(e.tone_funny_pct||20),tone_emotion_pct:Number(e.tone_emotion_pct||80),tone_style:String(e.tone_style||"conversational"),audience:String(e.audience||"internal reviewer").trim(),cultural_context:String(e.cultural_context||"global").trim(),output_spec:$v(e.copy_style,e.target_words),avoid_cliches:!0,cards_per_theme:Number(e.cards_per_theme||10),notes:String(e.notes||"").trim()||null,rendering:{theme_style:"minimal",text_alignment:"center",export_size:"1080x1350"}}}function xv(e){return!e||typeof e!="object"?null:{theme_name:String(e.theme_name||"Internal Theme").trim(),audience:String(e.audience||"internal reviewer").trim(),cultural_context:String(e.cultural_context||"global").trim(),tone_style:String(e.tone_style||"conversational").trim(),tone_funny_pct:Number(e.tone_funny_pct??20),tone_emotion_pct:Number(e.tone_emotion_pct??80),copy_style:"short_crisp",target_words:16}}function $v(e,t){return{format:String(e||"short_crisp"),length:{target_words:Number(t||16)},structure:{no_lists:!0,no_numbering:!0}}}function sa(e=null){return{theme_key:"",cards_per_theme:10,notes:"",copy_style:"short_crisp",target_words:16,tone_funny_pct:Number(e?.tone_funny_pct??e?.default_funny_pct??20)}}function zf(e){return{cards_per_theme:Number(e.cards_per_theme||10),notes:String(e.notes||"").trim()||null,copy_style:String(e.copy_style||"short_crisp"),target_words:Number(e.target_words||16),tone_funny_pct:Number(e.tone_funny_pct??20)}}function Uf(e){return String(e||"").split(",").map(t=>t.trim()).filter(Boolean)}function If(e){if(!e)return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toISOString().slice(0,10)}function Af(e){if(!e)return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=t.getTimezoneOffset()*60*1e3;return new Date(t.getTime()-n).toISOString().slice(0,16)}function Ss(e,t=140){let n=String(e||"").trim();return n?n.length<=t?n:`${n.slice(0,t-1).trimEnd()}...`:""}function Vf(e){return typeof e=="string"?e.trim():""}function Pv(e){let t=Vf(e);if(!t)return!1;if(t.startsWith("data:image/"))return!0;try{let n=new URL(t,window.location.origin);return/\.(png|jpe?g|webp|gif|svg)$/i.test(n.pathname)}catch{return!1}}function Es(e,t=[]){if(!e||typeof e!="object")return[];let n=[],r=new Set,a=(l,o,i)=>{let s=Vf(o);!s||r.has(s)||!Pv(s)||(r.add(s),n.push({label:l,url:s,source:i}))};if(a("Final Preview",e.final_preview_url,"final_preview_url"),a("Final PNG",e.final_asset_urls&&typeof e.final_asset_urls=="object"?e.final_asset_urls.png:"","final_asset_urls.png"),a("Image Preview",e.image_preview_url,"image_preview_url"),a("Content Preview",e.content_preview_url,"content_preview_url"),Array.isArray(t)){let l={final_preview:"Final Preview",final_png:"Final PNG",image_preview:"Image Preview",content_preview:"Content Preview"};t.forEach(o=>{let i=String(o?.asset_type||"").toLowerCase(),s=l[i];s&&a(s,o.public_url||o.asset_url,`asset:${i}`)})}return n}function zl(e){let t=(0,$.useMemo)(()=>e.map(i=>`${i.source}:${i.url}`).join("|"),[e]),[n,r]=(0,$.useState)(0);(0,$.useEffect)(()=>{r(0)},[t]);let a=n<e.length?e[n]:null,l=e.length>0&&n>=e.length;function o(){r(i=>i+1)}return{currentCandidate:a,exhausted:l,handleError:o}}function bv({image:e}){let t=(0,$.useMemo)(()=>!e||!e.url?[]:[{label:e.label||"Preview",url:e.url,source:e.label||"preview"}],[e]),{currentCandidate:n,exhausted:r,handleError:a}=zl(t);return _`
      <article className="image-card">
        ${n?_`
              <a href=${n.url} target="_blank" rel="noreferrer">
                <img src=${n.url} alt=${e.label} loading="lazy" onError=${a} />
              </a>
            `:_`<p className="empty-state">${r?"Preview unavailable.":"No preview available yet."}</p>`}
        <p className="image-caption">${e.label}</p>
      </article>
    `}function Tv({job:e,actionState:t,onArchive:n,onDelete:r}){let a=(0,$.useMemo)(()=>Es(e),[e]),{currentCandidate:l,exhausted:o,handleError:i}=zl(a),s=Ss(e.content_preview||"Content preview will appear here after generation.",180);return _`
      <article className="ecard-tile">
        <div className="ecard-media">
          ${l?_`
                <img
                  src=${l.url}
                  alt=${e.theme_name||"Generated eCard"}
                  loading="lazy"
                  onError=${i}
                />
              `:o?_`
                  <div className="ecard-placeholder">
                    <p className="ecard-placeholder-kicker">Preview Unavailable</p>
                    <p className="ecard-placeholder-copy">The stored preview URL did not load.</p>
                  </div>
                `:_`
                <div className="ecard-placeholder">
                  <p className="ecard-placeholder-kicker">Content Preview</p>
                  <p className="ecard-placeholder-copy">${s}</p>
                </div>
              `}
        </div>
        <div className="ecard-body">
          <div className="ecard-head">
            <div>
              <p className="ecard-theme">${e.theme_name||"Untitled Theme"}</p>
              <p className="ecard-meta">${Ae(e.created_at)}</p>
            </div>
            <${yt} value=${e.status} />
          </div>
          <div className="ecard-stage-row">
            <span className="ecard-stage">${Ie(e.current_stage)}</span>
            <span className="ecard-job-id">${e.job_id}</span>
          </div>
          <div className="ecard-actions">
            <${cn} to=${`/jobs/${e.job_id}`} className="button-link">View Details<//>
            ${l?_`
                  <a href=${l.url} target="_blank" rel="noreferrer" className="button-link">
                    Open Image
                  </a>
                `:_`<button type="button" className="button" disabled=${!0}>Open Image</button>`}
            <button
              type="button"
              className="button"
              onClick=${()=>n(e)}
              disabled=${t===`archive:${e.job_id}`||e.status==="archived"}
            >
              ${t===`archive:${e.job_id}`?"Archiving...":"Archive"}
            </button>
            <button
              type="button"
              className="button danger"
              onClick=${()=>r(e)}
              disabled=${t===`delete:${e.job_id}`}
            >
              ${t===`delete:${e.job_id}`?"Deleting...":"Delete"}
            </button>
          </div>
        </div>
      </article>
    `}function Dv(){let e=sn(),[t,n]=(0,$.useState)([]),[r,a]=(0,$.useState)(null),[l,o]=(0,$.useState)([]),[i,s]=(0,$.useState)(null),[u,m]=(0,$.useState)(!1),[h,v]=(0,$.useState)(!1),[S,E]=(0,$.useState)(!1),[w,N]=(0,$.useState)(""),[d,c]=(0,$.useState)(""),[f,y]=(0,$.useState)(""),[x,P]=(0,$.useState)(""),[F,T]=(0,$.useState)(""),[A,L]=(0,$.useState)(!1),[Z,Ke]=(0,$.useState)(!1),[O,fe]=(0,$.useState)("today"),[B,he]=(0,$.useState)([]),[se,C]=(0,$.useState)(!1),[M,ue]=(0,$.useState)(!1),[W,nt]=(0,$.useState)(""),[we,Qe]=(0,$.useState)({theme_name:"Internal Launch Sprint",audience:"operations team",cultural_context:"global",tone_style:"conversational",tone_funny_pct:20,tone_emotion_pct:80,copy_style:"short_crisp",target_words:16,cards_per_theme:10,notes:""}),[Te,_e]=(0,$.useState)(sa()),je=i&&typeof i=="object"&&i.theme||null,rt=(0,$.useMemo)(()=>{let k=0,U=0,V=0;return t.forEach(lt=>{let Ce=String(lt.status||"").toLowerCase();if(Ce==="completed"){U+=1;return}if(Ce.includes("reject")||Ce.includes("timeout")||Ce.includes("failed")){V+=1;return}Ce!=="archived"&&(k+=1)}),{active:k,completed:U,failed:V}},[t]);async function Ut(){m(!0),v(!0),E(!0),N(""),c(""),y(""),P("");let[k,U,V,lt]=await Promise.allSettled([K("/api/jobs?limit=50"),K("/api/storage/summary"),K("/api/themes/schedule"),K("/api/themes/today")]),Ce="";if(k.status==="fulfilled"?n(Array.isArray(k.value)?k.value:[]):(n([]),N(Pn("jobs",k.reason))),U.status==="fulfilled"?a(U.value||null):(a(null),c(Pn("storage summary",U.reason))),V.status==="fulfilled"){let Rs=Array.isArray(V.value)?[]:Array.isArray(V.value?.week_schedule)?V.value.week_schedule:[];o(Rs),Rs.length===0&&(Ce="Theme schedule not configured yet")}else o([]),bn(V.reason)?Ce="Theme Factory not configured yet":y(Pn("Theme Factory schedule",V.reason));lt.status==="fulfilled"?(s(lt.value||null),!Ce&&lt.value?.resolved===!1?Ce=lt.value?.message||"Theme schedule not configured yet":!Ce&&!lt.value?.theme&&(Ce="Theme schedule not configured yet")):(s(null),bn(lt.reason)?Ce=Ce||"Theme schedule not configured yet":y(Pn("today's theme",lt.reason))),P(Ce),m(!1),v(!1),E(!1);let Hf=V.status!=="fulfilled"&&!bn(V.reason),Wf=lt.status!=="fulfilled"&&!bn(lt.reason),Kf=k.status!=="fulfilled"||U.status!=="fulfilled"||Hf||Wf;T(Kf?`Refresh completed with errors at ${new Date().toLocaleTimeString()}`:`Refreshed ${new Date().toLocaleTimeString()}`)}(0,$.useEffect)(()=>{Ut()},[]);async function Vl(k){k.preventDefault(),C(!0),N("");try{let U=Cv(we),V=await K("/api/jobs/start",{method:"POST",body:JSON.stringify(U)});L(!1),T(`Created ${V.job_id}`),await Ut(),e(`/jobs/${V.job_id}`)}catch(U){N(U.message||"Unable to create new job")}finally{C(!1)}}function Je(k,U){Qe(V=>({...V,[k]:U}))}function Bl(){let k=xv(je);k&&Qe(U=>({...U,...k}))}async function p(){if(B.length>0)return B;let k=await K("/api/themes"),U=Array.isArray(k)?k:[];return he(U),U}async function g(k){if(fe(k),y(""),_e(sa(je)),k==="manual"){try{let V=(await p())[0]||null;_e({...sa(V),theme_key:V?.theme_key||""}),Ke(!0)}catch(U){y(U.message||"Unable to load theme catalog")}return}Ke(!0)}async function ee(k){k.preventDefault(),ue(!0),y("");try{let U=zf(Te),V=O==="manual"?await K("/api/jobs/start-from-theme",{method:"POST",body:JSON.stringify({theme_key:Te.theme_key,...U})}):await K("/api/jobs/create-daily-theme-job",{method:"POST",body:JSON.stringify(U)});Ke(!1),T(O==="manual"?`Created ${V.job_id} from ${Te.theme_key}`:`Created ${V.job_id} from today's theme`),await Ut(),e(`/jobs/${V.job_id}`)}catch(U){y(U.message||(O==="manual"?"Unable to create theme job":"Unable to create today's themed job"))}finally{ue(!1)}}function le(k){let U=B.find(V=>V.theme_key===k);_e(V=>({...V,theme_key:k,tone_funny_pct:Number(U?.default_funny_pct??V.tone_funny_pct??20)}))}async function at(k){nt(`archive:${k.job_id}`),N("");try{await K(`/api/jobs/${k.job_id}/archive`,{method:"POST"}),T(`Archived ${k.job_id}`),await Ut()}catch(U){N(U.message||"Unable to archive job")}finally{nt("")}}async function Bf(k){if(window.confirm(`Delete ${k.job_id} and associated files?`)){nt(`delete:${k.job_id}`),N("");try{await K(`/api/jobs/${k.job_id}`,{method:"DELETE"}),T(`Deleted ${k.job_id}`),await Ut()}catch(V){N(V.message||"Unable to delete job")}finally{nt("")}}}return _`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Workflow</p>
            <h1 className="page-title">Workflow Console</h1>
            <p className="page-description">
              Generated eCards, workflow state, and intervention controls in one internal console.
            </p>
          </div>
          <div className="inline-actions">
            <button type="button" className="button primary" onClick=${()=>L(!0)}>Create New Card Job</button>
            <button type="button" className="button" onClick=${()=>g("manual")}>Generate From Theme</button>
            <button
              type="button"
              className="button"
              onClick=${Ut}
              disabled=${u||h||S}
            >
              Refresh
            </button>
            <${cn} to="/themes" className="button-link">Open Theme Factory<//>
            <${cn} to="/compare" className="button-link">Open Compare Lab<//>
          </div>
        </header>

        ${F?_`<p className="status-line">${F}</p>`:null}

        ${u||h||S||w||d||f?_`
              <div className="status-stack">
                ${u?_`<div className="status-panel warning">Loading jobs from /api/jobs...</div>`:null}
                ${h?_`<div className="status-panel warning">Loading storage summary from /api/storage/summary...</div>`:null}
                ${S?_`<div className="status-panel warning">Loading Theme Factory data from /api/themes/schedule...</div>`:null}
                ${w?_`<div className="status-panel error">Unable to load jobs: ${w}</div>`:null}
                ${d?_`<div className="status-panel error">Unable to load storage summary: ${d}</div>`:null}
                ${f?_`<div className="status-panel error">Theme error: ${f}</div>`:null}
              </div>
            `:null}

        <section className="cards-grid">
          <article className="summary-card">
            <p className="summary-label">Active Jobs</p>
            <p className="summary-value">${u?"...":rt.active}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Completed Jobs</p>
            <p className="summary-value">${u?"...":rt.completed}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Failed Jobs</p>
            <p className="summary-value">${u?"...":rt.failed}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Storage Usage</p>
            <p className="summary-value">${h?"...":r?Rv(r.total_bytes):"Unavailable"}</p>
          </article>
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Generated eCards</h2>
              <p className="section-copy">Final previews, generated image previews, and content-first placeholders for each job.</p>
            </div>
          </div>
          ${u?_`<p className="empty-state">Loading generated eCards...</p>`:w?_`<p className="empty-state">Unable to load generated eCards. Check API availability and refresh.</p>`:t.length===0?_`
                    <div className="empty-state">
                      <p className="empty-state-title">No generated eCards yet</p>
                      <p className="empty-state-copy">Start a workflow job to generate the first card for this console.</p>
                      <button type="button" className="button primary" onClick=${()=>L(!0)}>
                        Create New Card Job
                      </button>
                    </div>
                  `:_`
                    <div className="ecard-grid">
                      ${t.map(k=>_`
                          <${Tv}
                            key=${k.job_id}
                            job=${k}
                            actionState=${W}
                            onArchive=${at}
                            onDelete=${Bf}
                          />
                        `)}
                    </div>
                  `}
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Weekly Theme Schedule</h2>
              <p className="section-copy">
                ${je?`Today's Theme: ${je.theme_name} (${Ie(i?.weekday)})`:x||"Today's Theme: Unavailable"}
              </p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button primary"
                onClick=${()=>g("today")}
                disabled=${M||S||!je}
              >
                ${M&&O==="today"?"Generating...":"Generate Today's Card"}
              </button>
              <${cn} to="/themes" className="button-link">Manage Themes<//>
            </div>
          </div>
          ${x?_`<div className="status-panel neutral">${x}</div>`:null}
          ${S?_`<p className="empty-state">Loading weekly schedule...</p>`:l.length===0?_`<p className="empty-state">Theme schedule not configured yet.</p>`:_`
                  <div className="table-wrap">
                    <table className="console-table">
                      <thead>
                        <tr>
                          <th>date</th>
                          <th>weekday</th>
                          <th>theme_name</th>
                          <th>source</th>
                          <th>tone_style</th>
                          <th>audience</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${l.map(k=>_`
                            <tr key=${`${k.plan_date}_${k.weekday}`}>
                              <td>${Ae(k.plan_date)}</td>
                              <td>${Ie(k.weekday)}</td>
                              <td>${k.theme?.theme_name||"-"}</td>
                              <td>${Ie(k.source)}</td>
                              <td>${k.theme?.tone_style||"-"}</td>
                              <td>${k.theme?.audience||"-"}</td>
                            </tr>
                          `)}
                      </tbody>
                    </table>
                  </div>
                `}
        </section>

        <section className="section-panel section-subdued">
          <div className="section-head">
            <div>
              <h2 className="section-title">Recent Jobs</h2>
              <p className="section-copy">Newest 50 jobs from workflow backend.</p>
            </div>
          </div>
          ${u?_`<p className="empty-state">Loading jobs...</p>`:w?_`<p className="empty-state">Unable to load jobs. Check API availability and refresh.</p>`:t.length===0?_`<p className="empty-state">No jobs found yet.</p>`:_`
                    <div className="table-wrap">
                      <table className="console-table">
                        <thead>
                          <tr>
                            <th>job_id</th>
                            <th>theme_name</th>
                            <th>current_stage</th>
                            <th>status</th>
                            <th>created_at</th>
                            <th>updated_at</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${t.map(k=>_`
                              <tr key=${k.job_id}>
                                <td><${cn} className="job-link" to=${`/jobs/${k.job_id}`}>${k.job_id}<//></td>
                                <td>${k.theme_name||"-"}</td>
                                <td>${Ie(k.current_stage)}</td>
                                <td><${yt} value=${k.status} /></td>
                                <td>${Ae(k.created_at)}</td>
                                <td>${Ae(k.updated_at)}</td>
                              </tr>
                            `)}
                        </tbody>
                      </table>
                    </div>
                  `}
        </section>

        ${A?_`
              <div className="modal-backdrop" onClick=${()=>L(!1)}>
                <section className="modal" onClick=${k=>k.stopPropagation()}>
                  <h2 className="section-title">Create New Card Job</h2>
                  <p className="section-copy">Starts generation and opens approval flow.</p>
                  <form onSubmit=${Vl}>
                    <div className="form-grid">
                      <div className="form-field full">
                        <label htmlFor="themeName">Theme Name</label>
                        <input
                          id="themeName"
                          value=${we.theme_name}
                          onInput=${k=>Je("theme_name",k.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="audience">Audience</label>
                        <input
                          id="audience"
                          value=${we.audience}
                          onInput=${k=>Je("audience",k.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="culturalContext">Cultural Context</label>
                        <input
                          id="culturalContext"
                          value=${we.cultural_context}
                          onInput=${k=>Je("cultural_context",k.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="toneStyle">Tone Style</label>
                        <select
                          id="toneStyle"
                          value=${we.tone_style}
                          onChange=${k=>Je("tone_style",k.target.value)}
                        >
                          <option value="conversational">conversational</option>
                          <option value="minimal">minimal</option>
                          <option value="poetic">poetic</option>
                          <option value="witty">witty</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="funnyPct">Funny %</label>
                        <input
                          id="funnyPct"
                          type="number"
                          min="0"
                          max="100"
                          value=${we.tone_funny_pct}
                          onInput=${k=>Je("tone_funny_pct",k.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="emotionPct">Emotion %</label>
                        <input
                          id="emotionPct"
                          type="number"
                          min="0"
                          max="100"
                          value=${we.tone_emotion_pct}
                          onInput=${k=>Je("tone_emotion_pct",k.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="copyStyle">Copy Style</label>
                        <select
                          id="copyStyle"
                          value=${we.copy_style}
                          onChange=${k=>Je("copy_style",k.target.value)}
                        >
                          <option value="short_crisp">short and crisp</option>
                          <option value="warm_note">warm note</option>
                          <option value="playful">playful</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="targetWords">Target Words</label>
                        <input
                          id="targetWords"
                          type="number"
                          min="4"
                          max="60"
                          value=${we.target_words}
                          onInput=${k=>Je("target_words",k.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="cardsPerTheme">Cards Per Theme</label>
                        <input
                          id="cardsPerTheme"
                          type="number"
                          min="1"
                          max="50"
                          value=${we.cards_per_theme}
                          onInput=${k=>Je("cards_per_theme",k.target.value)}
                        />
                      </div>
                      <div className="form-field full">
                        <p className="form-helper">For actual eCards, use short and crisp with 12-20 words. Raise Funny % if you want lighter copy.</p>
                      </div>
                      <div className="form-field full">
                        <label htmlFor="jobNotes">Notes</label>
                        <textarea
                          id="jobNotes"
                          rows="3"
                          value=${we.notes}
                          onInput=${k=>Je("notes",k.target.value)}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button
                        type="button"
                        className="button"
                        onClick=${Bl}
                        disabled=${!je}
                      >
                        Use Today's Theme
                      </button>
                      <button type="submit" className="button primary" disabled=${se}>
                        ${se?"Creating...":"Create Job"}
                      </button>
                      <button type="button" className="button" onClick=${()=>L(!1)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}

        ${Z?_`
              <div className="modal-backdrop" onClick=${()=>Ke(!1)}>
                <section className="modal" onClick=${k=>k.stopPropagation()}>
                  <h2 className="section-title">${O==="manual"?"Generate From Theme":"Use Today's Theme"}</h2>
                  <p className="section-copy">
                    ${O==="manual"?"Start a workflow job from any selected Theme Factory record.":je?`Resolved theme: ${je.theme_name}`:"Use today's resolved theme."}
                  </p>
                  <form onSubmit=${ee}>
                    <div className="form-grid">
                      ${O==="manual"?_`
                            <div className="form-field full">
                              <label htmlFor="runThemeKey">Theme</label>
                              <select
                                id="runThemeKey"
                                value=${Te.theme_key}
                                onChange=${k=>le(k.target.value)}
                                required
                              >
                                ${B.map(k=>_`<option key=${k.id} value=${k.theme_key}>${k.theme_name}</option>`)}
                              </select>
                            </div>
                          `:null}
                      <div className="form-field">
                        <label htmlFor="runCopyStyle">Copy Style</label>
                        <select
                          id="runCopyStyle"
                          value=${Te.copy_style}
                          onChange=${k=>_e(U=>({...U,copy_style:k.target.value}))}
                        >
                          <option value="short_crisp">short and crisp</option>
                          <option value="warm_note">warm note</option>
                          <option value="playful">playful</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="runTargetWords">Target Words</label>
                        <input
                          id="runTargetWords"
                          type="number"
                          min="4"
                          max="60"
                          value=${Te.target_words}
                          onInput=${k=>_e(U=>({...U,target_words:k.target.value}))}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="runFunnyPct">Funny %</label>
                        <input
                          id="runFunnyPct"
                          type="number"
                          min="0"
                          max="100"
                          value=${Te.tone_funny_pct}
                          onInput=${k=>_e(U=>({...U,tone_funny_pct:k.target.value}))}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="runCardsPerTheme">Cards Per Theme</label>
                        <input
                          id="runCardsPerTheme"
                          type="number"
                          min="1"
                          max="50"
                          value=${Te.cards_per_theme}
                          onInput=${k=>_e(U=>({...U,cards_per_theme:k.target.value}))}
                          required
                        />
                      </div>
                      <div className="form-field full">
                        <p className="form-helper">This starts a real card job from the selected theme. Keep target words low if you want greeting-card copy instead of long paragraphs.</p>
                      </div>
                      <div className="form-field full">
                        <label htmlFor="runThemeNotes">Notes</label>
                        <textarea
                          id="runThemeNotes"
                          rows="3"
                          value=${Te.notes}
                          onInput=${k=>_e(U=>({...U,notes:k.target.value}))}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${M}>
                        ${M?"Creating...":O==="manual"?"Generate From Theme":"Use Today's Theme"}
                      </button>
                      <button type="button" className="button" onClick=${()=>Ke(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}
      </section>
    `}function Fv(){let e=sn(),{jobId:t}=ys(),[n,r]=(0,$.useState)(null),[a,l]=(0,$.useState)([]),[o,i]=(0,$.useState)([]),[s,u]=(0,$.useState)([]),[m,h]=(0,$.useState)([]),[v,S]=(0,$.useState)([]),[E,w]=(0,$.useState)(!1),[N,d]=(0,$.useState)(""),[c,f]=(0,$.useState)(""),[y,x]=(0,$.useState)(""),P=(0,$.useCallback)(async(C={})=>{if(!t)return;let M=!!C.quiet;M||w(!0),f("");try{let[ue,W,nt,we,Qe]=await Promise.all([K(`/api/jobs/${t}`),K(`/api/jobs/${t}/assets`),K(`/api/jobs/${t}/events`),K(`/api/jobs/${t}/candidates`),K(`/api/jobs/${t}/shortlist`)]);r(ue||null),l(Array.isArray(W)?W:[]),i(Array.isArray(nt)?nt:[]);let Te=Array.isArray(we)?we:[],_e=Array.isArray(Qe)?Qe:[];u(Te),h(_e);let je=_e.filter(rt=>rt.is_selected).map(rt=>Number(rt.candidate_id)).filter(rt=>Number.isInteger(rt));S(je.length>0?je:_e[0]?[Number(_e[0].candidate_id)]:[])}catch(ue){f(ue.message||"Unable to load job detail")}finally{M||w(!1)}},[t]);(0,$.useEffect)(()=>{P()},[P]),(0,$.useEffect)(()=>{if(!t)return;let C=window.setInterval(()=>{document.visibilityState==="visible"&&P({quiet:!0})},1e4);return()=>window.clearInterval(C)},[t,P]);let F=(0,$.useMemo)(()=>{if(!n)return[];let C=String(n.status||"").toLowerCase(),M=n.content_preview?"completed":C.startsWith("content")?"in_progress":"pending",ue=n.image_preview_url||C.startsWith("final")||C==="completed"?"completed":C.startsWith("image")?"in_progress":"pending",W=n.final_asset_urls&&(n.final_asset_urls.png||n.final_asset_urls.pdf)?"completed":C.startsWith("final")?"in_progress":C==="completed"?"completed":"pending";return[{label:"content_generation_status",value:M},{label:"content_approval_status",value:n.content_approval_status||"pending"},{label:"image_generation_status",value:ue},{label:"image_approval_status",value:n.image_approval_status||"pending"},{label:"final_render_status",value:W},{label:"final_approval_status",value:n.final_approval_status||"pending"}]},[n]),T=(0,$.useMemo)(()=>n?Es(n,a):[],[n,a]),A=zl(T),L=(0,$.useMemo)(()=>n?Es({image_preview_url:n.image_preview_url,content_preview_url:n.content_preview_url},a.filter(C=>String(C?.asset_type||"").toLowerCase()==="image_preview")):[],[n,a]),Z=zl(L),Ke=(0,$.useMemo)(()=>a.filter(C=>String(C?.asset_type||"").toLowerCase()==="shortlist_preview").map((C,M)=>({label:`Shortlist Preview ${M+1}`,url:C.public_url||C.asset_url,source:`shortlist_preview:${M}`})).filter(C=>C.url),[a]);async function O(C,M,ue){if(t){d(C),f("");try{let W=await K(M,{method:"POST"});x(ue||`${W.job_id} updated`),await P()}catch(W){f(W.message||"Unable to update stage")}finally{d("")}}}function fe(C,M){S(ue=>{let W=new Set(ue);return M?W.add(C):W.delete(C),Array.from(W)})}async function B(){if(t){d("render-shortlist"),f("");try{let C=await K(`/api/jobs/${t}/render-shortlist`,{method:"POST",body:JSON.stringify({candidate_ids:v})});x(`Rendered ${C.rendered_count} shortlist preview card(s)`),await P()}catch(C){f(C.message||"Unable to render shortlist")}finally{d("")}}}async function he(){if(t){d("archive"),f("");try{let C=await K(`/api/jobs/${t}/archive`,{method:"POST"});x(`Job archived (${Ae(C.updated_at)})`),await P()}catch(C){f(C.message||"Unable to archive job")}finally{d("")}}}async function se(){if(!(!t||!window.confirm(`Delete ${t} and associated files?`))){d("delete"),f("");try{await K(`/api/jobs/${t}`,{method:"DELETE"}),e("/")}catch(M){f(M.message||"Unable to delete job")}finally{d("")}}}return _`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Jobs</p>
            <h1 className="page-title">Job Detail</h1>
            <p className="page-description">${t||"-"}</p>
          </div>
          <div className="inline-actions">
            <button className="button" type="button" onClick=${P} disabled=${E}>Refresh</button>
            <button
              className="button"
              type="button"
              onClick=${he}
              disabled=${N==="archive"}
            >
              ${N==="archive"?"Archiving...":"Archive Job"}
            </button>
            <button
              className="button danger"
              type="button"
              onClick=${se}
              disabled=${N==="delete"}
            >
              ${N==="delete"?"Deleting...":"Delete Job + Files"}
            </button>
          </div>
        </header>

        ${c?_`<p className="status-line error">${c}</p>`:null}
        ${y?_`<p className="status-line">${y}</p>`:null}
        ${n?.last_error_message?_`<div className="status-panel error">Last stage error: ${n.last_error_message}</div>`:null}

        ${n?_`
              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Stage and Status Breakdown</h2>
                    <p className="section-copy">Lifecycle status across generation and approval gates.</p>
                  </div>
                  <${yt} value=${n.status} />
                </div>
                <div className="key-value-grid">
                  ${F.map(C=>_`
                      <article className="key-card" key=${C.label}>
                        <p className="key-label">${C.label}</p>
                        <p className="key-value"><${yt} value=${C.value} /></p>
                      </article>
                    `)}
                </div>
                <div className="key-value-grid job-meta-grid">
                  <article className="key-card">
                    <p className="key-label">cards_per_theme</p>
                    <p className="key-value">${n.cards_per_theme||10}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">retry_count</p>
                    <p className="key-value">${n.retry_count||0}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">last_stage_started_at</p>
                    <p className="key-value">${Ae(n.last_stage_started_at)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">last_stage_finished_at</p>
                    <p className="key-value">${Ae(n.last_stage_finished_at)}</p>
                  </article>
                </div>
                ${n.operator_notes?_`
                      <div className="status-panel neutral">Operator notes: ${n.operator_notes}</div>
                    `:null}
                <div className="status-stack padded-status-stack">
                  <div className="status-panel neutral">
                    Review order: approve the exact message text first, then generate and approve the image, then render and approve the final card.
                  </div>
                  <div className="status-panel neutral">
                    This page refreshes automatically every 10 seconds while it stays open.
                  </div>
                </div>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Content Review</h2>
                    <p className="section-copy">Approve or reject the exact message text shown below. Regenerate if the wording is wrong.</p>
                  </div>
                  <${yt} value=${n.content_approval_status||"pending"} />
                </div>
                ${n.content_preview?_`<div className="content-preview-block">${n.content_preview}</div>`:_`<p className="empty-state">No content preview stored yet.</p>`}
                <div className="inline-actions padded-actions">
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>O("approve-content",`/api/jobs/${t}/approve-content`,`Content approved for ${t}`)}
                    disabled=${N==="approve-content"||!n.content_preview}
                  >
                    ${N==="approve-content"?"Working...":"Approve Content"}
                  </button>
                  <button
                    type="button"
                    className="button danger"
                    onClick=${()=>O("reject-content",`/api/jobs/${t}/reject-content`,`Content rejected for ${t}`)}
                    disabled=${N==="reject-content"||!n.content_preview}
                  >
                    ${N==="reject-content"?"Working...":"Reject Content"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>O("regenerate-content",`/api/jobs/${t}/regenerate-content`,`Content regenerated for ${t}`)}
                    disabled=${N==="regenerate-content"}
                  >
                    ${N==="regenerate-content"?"Working...":"Regenerate Content"}
                  </button>
                </div>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Image Review</h2>
                    <p className="section-copy">These buttons apply to the exact image preview shown below. Generate it after content approval, then approve or reject it.</p>
                  </div>
                  <${yt} value=${n.image_approval_status||"pending"} />
                </div>
                ${Z.currentCandidate?_`
                      <div className="image-grid image-grid-single">
                        <article className="image-card">
                          <a href=${Z.currentCandidate.url} target="_blank" rel="noreferrer">
                            <img
                              src=${Z.currentCandidate.url}
                              alt="Image Preview"
                              loading="lazy"
                              onError=${Z.handleError}
                            />
                          </a>
                          <p className="image-caption">Image Preview</p>
                        </article>
                      </div>
                    `:Z.exhausted?_`<p className="empty-state">Preview unavailable.</p>`:_`<p className="empty-state">No image preview available yet.</p>`}
                <div className="inline-actions padded-actions">
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>O("generate-image",`/api/jobs/${t}/generate-image`,`Image generated for ${t}`)}
                    disabled=${N==="generate-image"||n.content_approval_status!=="approved"}
                  >
                    ${N==="generate-image"?"Working...":"Generate Image"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>O("regenerate-image",`/api/jobs/${t}/regenerate-image`,`Image regenerated for ${t}`)}
                    disabled=${N==="regenerate-image"||n.content_approval_status!=="approved"}
                  >
                    ${N==="regenerate-image"?"Working...":"Regenerate Image"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>O("approve-image",`/api/jobs/${t}/approve-image`,`Image approved for ${t}`)}
                    disabled=${N==="approve-image"||!n.image_preview_url}
                  >
                    ${N==="approve-image"?"Working...":"Approve Image"}
                  </button>
                  <button
                    type="button"
                    className="button danger"
                    onClick=${()=>O("reject-image",`/api/jobs/${t}/reject-image`,`Image rejected for ${t}`)}
                    disabled=${N==="reject-image"||!n.image_preview_url}
                  >
                    ${N==="reject-image"?"Working...":"Reject Image"}
                  </button>
                </div>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Final Card Review</h2>
                    <p className="section-copy">Render the final card, then approve or reject the exact final preview shown here.</p>
                  </div>
                  <${yt} value=${n.final_approval_status||"pending"} />
                </div>
                ${A.currentCandidate?_`
                      <div className="hero-preview">
                        <a href=${A.currentCandidate.url} target="_blank" rel="noreferrer">
                          <img
                            src=${A.currentCandidate.url}
                            alt=${n.theme_name||"Generated eCard"}
                            loading="lazy"
                            onError=${A.handleError}
                          />
                        </a>
                      </div>
                    `:A.exhausted?_`<p className="empty-state">Preview unavailable.</p>`:_`<p className="empty-state">No final card preview available yet.</p>`}
                <div className="inline-actions padded-actions">
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>O("render-final",`/api/jobs/${t}/render-final`,`Final rendered for ${t}`)}
                    disabled=${N==="render-final"||n.image_approval_status!=="approved"}
                  >
                    ${N==="render-final"?"Working...":"Render Final"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>O("approve-final",`/api/jobs/${t}/approve-final`,`Final approved for ${t}`)}
                    disabled=${N==="approve-final"||!n.final_preview_url}
                  >
                    ${N==="approve-final"?"Working...":"Approve Final"}
                  </button>
                  <button
                    type="button"
                    className="button danger"
                    onClick=${()=>O("reject-final",`/api/jobs/${t}/reject-final`,`Final rejected for ${t}`)}
                    disabled=${N==="reject-final"||!n.final_preview_url}
                  >
                    ${N==="reject-final"?"Working...":"Reject Final"}
                  </button>
                </div>
              </section>

              <section className="two-column">
                <section className="section-panel">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">Lifecycle Events</h2>
                      <p className="section-copy">Audit timeline from /api/jobs/${t}/events.</p>
                    </div>
                  </div>
                  ${o.length===0?_`<p className="empty-state">No lifecycle events found.</p>`:_`
                        <ul className="list-simple">
                          ${o.slice().reverse().map((C,M)=>_`
                                <li key=${`${C.event_type}_${M}`} className="list-item">
                                  <p className="event-type">${C.event_type}</p>
                                  <p className="event-meta">${Ae(C.created_at)}</p>
                                  ${Of(C.event_payload_json)?_`<p className="event-meta">${Of(C.event_payload_json)}</p>`:null}
                                </li>
                              `)}
                        </ul>
                      `}
                </section>

                <section className="section-panel">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">Saved Assets</h2>
                      <p className="section-copy">Persisted file paths, URLs, and metadata references.</p>
                    </div>
                  </div>
                  ${a.length===0?_`<p className="empty-state">No assets saved for this job yet.</p>`:_`
                        <div className="table-wrap">
                          <table className="console-table">
                            <thead>
                              <tr>
                                <th>asset_type</th>
                                <th>public_url</th>
                                <th>relative_path</th>
                                <th>absolute_path</th>
                                <th>approved</th>
                                <th>created_at</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${a.map((C,M)=>_`
                                  <tr key=${`${C.asset_type}_${M}`}>
                                    <td>${C.asset_type}</td>
                                    <td>
                                      ${C.asset_url?_`<a className="job-link" href=${C.asset_url} target="_blank" rel="noreferrer">open</a>`:"-"}
                                    </td>
                                    <td><code>${C.relative_path||"-"}</code></td>
                                    <td><code>${C.absolute_path||"-"}</code></td>
                                    <td><${yt} value=${C.approved?"approved":"pending"} /></td>
                                    <td>${Ae(C.created_at)}</td>
                                  </tr>
                                `)}
                            </tbody>
                          </table>
                        </div>
                      `}
                </section>
              </section>

              <details className="section-panel debug-panel">
                <summary className="debug-summary">
                  <span>Internal Debug</span>
                  <span className="section-copy">Candidate pool, shortlist ranking, and alternate preview renders.</span>
                </summary>

                <section className="section-panel section-embedded">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">Candidate Pool</h2>
                      <p className="section-copy">All stored text variants for this job. Useful for debugging, not for normal approval.</p>
                    </div>
                    <p className="section-copy">${s.length} total candidates</p>
                  </div>
                  ${s.length===0?_`<p className="empty-state">No candidates stored for this job yet.</p>`:_`
                        <div className="table-wrap">
                          <table className="console-table">
                            <thead>
                              <tr>
                                <th>model</th>
                                <th>raw_score</th>
                                <th>judged_score</th>
                                <th>shortlist</th>
                                <th>selected</th>
                                <th>text</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${s.map(C=>_`
                                  <tr key=${C.id||`${C.model}_${C.text}`}>
                                    <td>${C.model}</td>
                                    <td>${Number(C.raw_score||0).toFixed(3)}</td>
                                    <td>${Number(C.judged_score??C.judge_score??0).toFixed(3)}</td>
                                    <td><${yt} value=${C.is_shortlisted?"shortlisted":"pooled"} /></td>
                                    <td><${yt} value=${C.is_selected?"selected":"not_selected"} /></td>
                                    <td>${Ss(C.text||C.content_text,200)}</td>
                                  </tr>
                                `)}
                            </tbody>
                          </table>
                        </div>
                      `}
                </section>

                <section className="section-panel section-embedded">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">Top 10 Shortlist</h2>
                      <p className="section-copy">Internal ranking output. Only use this if you want to inspect or render alternate internal previews.</p>
                    </div>
                    <button type="button" className="button primary" onClick=${B} disabled=${N==="render-shortlist"||m.length===0}>
                      ${N==="render-shortlist"?"Rendering...":"Render Shortlist"}
                    </button>
                  </div>
                  ${m.length===0?_`<p className="empty-state">No shortlist available for this job yet.</p>`:_`
                        <div className="table-wrap">
                          <table className="console-table">
                            <thead>
                              <tr>
                                <th>use</th>
                                <th>rank</th>
                                <th>model</th>
                                <th>score</th>
                                <th>text</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${m.map(C=>_`
                                  <tr key=${C.candidate_id}>
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked=${v.includes(Number(C.candidate_id))}
                                        onChange=${M=>fe(Number(C.candidate_id),M.target.checked)}
                                      />
                                    </td>
                                    <td>${C.rank}</td>
                                    <td>${C.model}</td>
                                    <td>${Number(C.score||0).toFixed(3)}</td>
                                    <td>${Ss(C.text,220)}</td>
                                  </tr>
                                `)}
                            </tbody>
                          </table>
                        </div>
                      `}
                </section>

                <section className="section-panel section-embedded">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">Additional Previews</h2>
                      <p className="section-copy">Alternate preview variants, shortlist renders, and exported images discovered on this job.</p>
                    </div>
                  </div>
                  ${T.length===0&&Ke.length===0?_`<p className="empty-state">No preview variants available yet.</p>`:_`
                        <div className="image-grid">
                          ${[...T,...Ke].map(C=>_`
                              <${bv} key=${C.url} image=${C} />
                            `)}
                        </div>
                      `}
                </section>
              </details>
            `:_`<p className="empty-state">${E?"Loading job details...":"Job not found."}</p>`}
      </section>
    `}function Lv(){let e=sn(),[t,n]=(0,$.useState)([]),[r,a]=(0,$.useState)({week_schedule:[],month_schedule:[],active_overrides:[]}),[l,o]=(0,$.useState)(null),[i,s]=(0,$.useState)(!1),[u,m]=(0,$.useState)(""),[h,v]=(0,$.useState)(""),[S,E]=(0,$.useState)(""),[w,N]=(0,$.useState)(""),[d,c]=(0,$.useState)(!1),[f,y]=(0,$.useState)(!1),[x,P]=(0,$.useState)(!1),[F,T]=(0,$.useState)(!1),[A,L]=(0,$.useState)(null),[Z,Ke]=(0,$.useState)(null),[O,fe]=(0,$.useState)({theme_key:"",theme_name:"",description:"",theme_bucket:"everyday",theme_type:"evergreen",cultural_context:"global",tone_style:"conversational",default_funny_pct:20,default_emotion_pct:80,default_audience:"general audience",default_visual_style:"minimal",is_active:!0,priority:0}),[B,he]=(0,$.useState)({theme_id:"",schedule_type:"weekly_recurring",start_date:"",end_date:"",weekday_mask:"monday",month_mask:"",region:"",country:"",is_active:!0,priority:0,notes:""}),[se,C]=(0,$.useState)({theme_id:"",override_scope:"editorial",start_at:"",end_at:"",reason:"",force_top_priority:!0,created_by:"console_admin"}),[M,ue]=(0,$.useState)(sa()),W=l&&typeof l=="object"&&l.theme||null,nt=(0,$.useMemo)(()=>t.reduce((p,g)=>{let ee=String(g.theme_bucket||"everyday");return p[ee]=(p[ee]||0)+1,p},{everyday:0,occasion:0,current_event:0}),[t]),we=(0,$.useMemo)(()=>[{key:"everyday",title:"Everyday Themes",description:"Recurring weekday themes that keep the console stocked with steady daily runs.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="everyday")},{key:"occasion",title:"Occasion Themes",description:"Date-range and seasonal campaign themes such as Ramadan, Holi, and Valentine's Week.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="occasion")},{key:"current_event",title:"Current Event Themes",description:"Editorial and trend-driven themes that are intended to be activated through overrides.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="current_event")}],[t]);async function Qe(){s(!0),m(""),v("");let[p,g,ee]=await Promise.allSettled([K("/api/themes"),K("/api/themes/today"),K("/api/themes/schedule")]);if(p.status==="fulfilled"){let le=Array.isArray(p.value)?p.value:[];n(le),le.length>0&&(he(at=>({...at,theme_id:String(at.theme_id||le[0].id)})),C(at=>({...at,theme_id:String(at.theme_id||le[0].id)}))),le.length===0&&v("Theme schedule not configured yet")}else n([]),bn(p.reason)?v("Theme schedule not configured yet"):m(Pn("theme catalog",p.reason));if(g.status==="fulfilled"?(o(g.value||null),g.value?.resolved===!1&&v(le=>le||g.value?.message||"No theme resolved yet")):(o(null),bn(g.reason)?v(le=>le||"No theme resolved yet"):m(le=>le||Pn("today's theme",g.reason))),ee.status==="fulfilled"){if(Array.isArray(ee.value)){a({week_schedule:[],month_schedule:[],active_overrides:[]}),v(le=>le||"Theme schedule not configured yet"),s(!1);return}a({week_schedule:Array.isArray(ee.value?.week_schedule)?ee.value.week_schedule:[],month_schedule:Array.isArray(ee.value?.month_schedule)?ee.value.month_schedule:[],active_overrides:Array.isArray(ee.value?.active_overrides)?ee.value.active_overrides:[]})}else a({week_schedule:[],month_schedule:[],active_overrides:[]}),bn(ee.reason)?v(le=>le||"Theme schedule not configured yet"):m(le=>le||Pn("theme schedule",ee.reason));s(!1)}(0,$.useEffect)(()=>{Qe()},[]);function Te(p=null){L(p?p.id:null),fe({theme_key:p?.theme_key||"",theme_name:p?.theme_name||"",description:p?.description||"",theme_bucket:p?.theme_bucket||"everyday",theme_type:p?.theme_type||"evergreen",cultural_context:p?.cultural_context||"global",tone_style:p?.tone_style||"conversational",default_funny_pct:p?.default_funny_pct??20,default_emotion_pct:p?.default_emotion_pct??80,default_audience:p?.default_audience||"general audience",default_visual_style:p?.default_visual_style||"minimal",is_active:p?.is_active??!0,priority:p?.priority??0}),c(!0)}function _e(p=null){Ke(p?p.id:null),he({theme_id:String(p?.theme_id||t[0]?.id||""),schedule_type:p?.schedule_type||"weekly_recurring",start_date:If(p?.start_date),end_date:If(p?.end_date),weekday_mask:Array.isArray(p?.weekday_mask)?p.weekday_mask.join(", "):"monday",month_mask:Array.isArray(p?.month_mask)?p.month_mask.join(", "):"",region:p?.region||"",country:p?.country||"",is_active:p?.is_active??!0,priority:p?.priority??0,notes:p?.notes||""}),y(!0)}function je(p=null){let g=new Date,ee=new Date(g.getTime()+1440*60*1e3);C({theme_id:String(p||W?.theme_id||t[0]?.id||""),override_scope:"editorial",start_at:Af(g.toISOString()),end_at:Af(ee.toISOString()),reason:"",force_top_priority:!0,created_by:"console_admin"}),P(!0)}async function rt(p){p.preventDefault(),N("save-theme"),m("");try{let g={theme_key:String(O.theme_key||"").trim(),theme_name:String(O.theme_name||"").trim(),description:String(O.description||"").trim()||null,theme_bucket:O.theme_bucket,theme_type:O.theme_type,cultural_context:String(O.cultural_context||"").trim()||null,tone_style:String(O.tone_style||"").trim(),default_funny_pct:Number(O.default_funny_pct||0),default_emotion_pct:Number(O.default_emotion_pct||0),default_audience:String(O.default_audience||"").trim(),default_visual_style:String(O.default_visual_style||"").trim(),is_active:!!O.is_active,priority:Number(O.priority||0)},ee=A?`/api/themes/${A}`:"/api/themes";await K(ee,{method:A?"PUT":"POST",body:JSON.stringify(g)}),c(!1),E(A?"Theme updated":"Theme created"),await Qe()}catch(g){m(g.message||"Unable to save theme")}finally{N("")}}async function Ut(p){if(window.confirm(`Deactivate theme ${p.theme_name}?`)){N(`delete-theme:${p.id}`),m("");try{await K(`/api/themes/${p.id}`,{method:"DELETE"}),E(`Theme deactivated: ${p.theme_name}`),await Qe()}catch(ee){m(ee.message||"Unable to delete theme")}finally{N("")}}}async function Vl(p){p.preventDefault(),N("save-schedule"),m("");try{let g={theme_id:Number(B.theme_id),schedule_type:B.schedule_type,start_date:B.start_date||null,end_date:B.end_date||null,weekday_mask:Uf(B.weekday_mask),month_mask:Uf(B.month_mask).map(at=>Number(at)).filter(at=>Number.isInteger(at)),region:String(B.region||"").trim()||null,country:String(B.country||"").trim()||null,is_active:!!B.is_active,priority:Number(B.priority||0),notes:String(B.notes||"").trim()||null},ee=Z?`/api/themes/schedule/${Z}`:"/api/themes/schedule";await K(ee,{method:Z?"PUT":"POST",body:JSON.stringify(g)}),y(!1),E(Z?"Schedule updated":"Schedule created"),await Qe()}catch(g){m(g.message||"Unable to save schedule")}finally{N("")}}async function Je(p){p.preventDefault(),N("save-override"),m("");try{let g={theme_id:Number(se.theme_id),override_scope:String(se.override_scope||"").trim(),start_at:new Date(se.start_at).toISOString(),end_at:new Date(se.end_at).toISOString(),reason:String(se.reason||"").trim()||null,force_top_priority:!!se.force_top_priority,created_by:String(se.created_by||"console_admin").trim()};await K("/api/themes/overrides",{method:"POST",body:JSON.stringify(g)}),P(!1),E("Override created"),await Qe()}catch(g){m(g.message||"Unable to save override")}finally{N("")}}async function Bl(p){p&&p.preventDefault(),N("create-today-job"),m("");try{let g=await K("/api/jobs/create-daily-theme-job",{method:"POST",body:JSON.stringify(zf(M))});T(!1),E(`Created ${g.job_id} from today's theme`),e(`/jobs/${g.job_id}`)}catch(g){m(g.message||"Unable to create today's themed job")}finally{N("")}}return _`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Admin</p>
            <h1 className="page-title">Theme Factory</h1>
            <p className="page-description">
              Database-backed theme catalog, schedules, overrides, and daily resolution controls.
            </p>
          </div>
          <div className="inline-actions">
            <button
              type="button"
              className="button primary"
              onClick=${()=>{ue(sa(W)),T(!0)}}
              disabled=${w==="create-today-job"||!W}
            >
              ${w==="create-today-job"?"Creating...":"Use Today's Theme"}
            </button>
            <button type="button" className="button" onClick=${Qe} disabled=${i}>Refresh</button>
            <${cn} to="/" className="button-link">Workflow Console<//>
          </div>
        </header>

        ${u?_`<div className="status-panel error">${u}</div>`:null}
        ${h?_`<div className="status-panel neutral">${h}</div>`:null}
        ${S?_`<p className="status-line">${S}</p>`:null}
        ${i?_`<div className="status-panel warning">Loading Theme Factory data...</div>`:null}

        <section className="cards-grid">
          <article className="summary-card">
            <p className="summary-label">Everyday Themes</p>
            <p className="summary-value">${nt.everyday}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Occasion Themes</p>
            <p className="summary-value">${nt.occasion}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Current Event Themes</p>
            <p className="summary-value">${nt.current_event}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Active Overrides</p>
            <p className="summary-value">${r.active_overrides.length}</p>
          </article>
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Today's Theme</h2>
              <p className="section-copy">Resolved using overrides, schedules, and evergreen fallback logic.</p>
            </div>
          </div>
          ${W?_`
                <div className="key-value-grid">
                  <article className="key-card">
                    <p className="key-label">Theme</p>
                    <p className="key-value">${W.theme_name}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Bucket</p>
                    <p className="key-value">${Ev(W.theme_bucket)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Source</p>
                    <p className="key-value">${Ie(l?.source)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Weekday</p>
                    <p className="key-value">${Ie(l?.weekday)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Audience</p>
                    <p className="key-value">${W.audience}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Tone</p>
                    <p className="key-value">${W.tone_style}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Priority</p>
                    <p className="key-value">${W.priority}</p>
                  </article>
                </div>
              `:_`<p className="empty-state">No theme resolved yet.</p>`}
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Theme Catalog</h2>
              <p className="section-copy">Source themes are grouped by the three operational buckets used by Theme Factory resolution.</p>
            </div>
            <div className="inline-actions">
              <button type="button" className="button primary" onClick=${()=>Te()}>Add Theme</button>
            </div>
          </div>
          ${t.length===0?_`<p className="empty-state">No theme catalog entries found.</p>`:_`
                ${we.map(p=>_`
                    <section className="section-panel" key=${p.key}>
                      <div className="section-head">
                        <div>
                          <h3 className="section-title">${p.title}</h3>
                          <p className="section-copy">${p.description}</p>
                        </div>
                      </div>
                      ${p.items.length===0?_`<p className="empty-state">No ${p.title.toLowerCase()} configured.</p>`:_`
                            <div className="table-wrap">
                              <table className="console-table">
                                <thead>
                                  <tr>
                                    <th>theme_key</th>
                                    <th>theme_name</th>
                                    <th>theme_type</th>
                                    <th>audience</th>
                                    <th>visual_style</th>
                                    <th>priority</th>
                                    <th>status</th>
                                    <th>actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  ${p.items.map(g=>_`
                                      <tr key=${g.id}>
                                        <td><code>${g.theme_key}</code></td>
                                        <td>${g.theme_name}</td>
                                        <td>${Ie(g.theme_type)}</td>
                                        <td>${g.default_audience}</td>
                                        <td>${g.default_visual_style}</td>
                                        <td>${g.priority}</td>
                                        <td><${yt} value=${g.is_active?"active":"inactive"} /></td>
                                        <td>
                                          <div className="inline-actions">
                                            <button type="button" className="button" onClick=${()=>Te(g)}>Edit</button>
                                            <button
                                              type="button"
                                              className="button danger"
                                              onClick=${()=>Ut(g)}
                                              disabled=${w===`delete-theme:${g.id}`}
                                            >
                                              ${w===`delete-theme:${g.id}`?"Deleting...":"Delete"}
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    `)}
                                </tbody>
                              </table>
                            </div>
                          `}
                    </section>
                  `)}
              `}
        </section>

        <section className="two-column">
          <section className="section-panel">
            <div className="section-head">
              <div>
                <h2 className="section-title">This Week's Schedule</h2>
                <p className="section-copy">Resolved day-by-day schedule for the current week.</p>
              </div>
              <button type="button" className="button primary" onClick=${()=>_e()}>Add Schedule</button>
            </div>
            ${r.week_schedule.length===0?_`<p className="empty-state">No week schedule found.</p>`:_`
                  <div className="table-wrap">
                    <table className="console-table">
                      <thead>
                        <tr>
                          <th>date</th>
                          <th>weekday</th>
                          <th>theme</th>
                          <th>source</th>
                          <th>schedule_type</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${r.week_schedule.map(p=>_`
                            <tr key=${`${p.plan_date}_${p.weekday}`}>
                              <td>${Ae(p.plan_date)}</td>
                              <td>${Ie(p.weekday)}</td>
                              <td>${p.theme?.theme_name||"-"}</td>
                              <td>${Ie(p.source)}</td>
                              <td>${Ie(p.schedule_type)}</td>
                            </tr>
                          `)}
                      </tbody>
                    </table>
                  </div>
                `}
          </section>

          <section className="section-panel">
            <div className="section-head">
              <div>
                <h2 className="section-title">Active Overrides</h2>
                <p className="section-copy">Urgent editorial or manual overrides currently taking precedence.</p>
              </div>
              <button type="button" className="button primary" onClick=${()=>je()}>Add Override</button>
            </div>
            ${r.active_overrides.length===0?_`<p className="empty-state">No active overrides right now.</p>`:_`
                  <div className="table-wrap">
                    <table className="console-table">
                      <thead>
                        <tr>
                          <th>theme</th>
                          <th>scope</th>
                          <th>window</th>
                          <th>reason</th>
                          <th>priority</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${r.active_overrides.map(p=>_`
                            <tr key=${p.id}>
                              <td>${p.theme_name||"-"}</td>
                              <td>${Ie(p.override_scope)}</td>
                              <td>${Ae(p.start_at)} - ${Ae(p.end_at)}</td>
                              <td>${p.reason||"-"}</td>
                              <td>${p.force_top_priority?"top":"normal"}</td>
                            </tr>
                          `)}
                      </tbody>
                    </table>
                  </div>
                `}
          </section>
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">This Month's Schedule</h2>
              <p className="section-copy">Schedule rules intersecting the current month.</p>
            </div>
          </div>
          ${r.month_schedule.length===0?_`<p className="empty-state">No monthly schedule rules found.</p>`:_`
                <div className="table-wrap">
                  <table className="console-table">
                    <thead>
                      <tr>
                        <th>theme</th>
                        <th>schedule_type</th>
                        <th>start_date</th>
                        <th>end_date</th>
                        <th>weekday_mask</th>
                        <th>priority</th>
                        <th>actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${r.month_schedule.map(p=>_`
                          <tr key=${p.id}>
                            <td>${p.theme_name||"-"}</td>
                            <td>${Ie(p.schedule_type)}</td>
                            <td>${p.start_date?Ae(p.start_date):"-"}</td>
                            <td>${p.end_date?Ae(p.end_date):"-"}</td>
                            <td>${(p.weekday_mask||[]).join(", ")||"-"}</td>
                            <td>${p.priority}</td>
                            <td>
                              <button type="button" className="button" onClick=${()=>_e(p)}>
                                Edit
                              </button>
                            </td>
                          </tr>
                        `)}
                    </tbody>
                  </table>
                </div>
              `}
        </section>

        ${F?_`
              <div className="modal-backdrop" onClick=${()=>T(!1)}>
                <section className="modal" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">Use Today's Theme</h2>
                  <p className="section-copy">
                    ${W?`Resolved theme: ${W.theme_name}`:"No theme resolved yet."}
                  </p>
                  <form onSubmit=${Bl}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="todayCopyStyle">Copy Style</label>
                        <select
                          id="todayCopyStyle"
                          value=${M.copy_style}
                          onChange=${p=>ue(g=>({...g,copy_style:p.target.value}))}
                        >
                          <option value="short_crisp">short and crisp</option>
                          <option value="warm_note">warm note</option>
                          <option value="playful">playful</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="todayTargetWords">Target Words</label>
                        <input
                          id="todayTargetWords"
                          type="number"
                          min="4"
                          max="60"
                          value=${M.target_words}
                          onInput=${p=>ue(g=>({...g,target_words:p.target.value}))}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="todayFunnyPct">Funny %</label>
                        <input
                          id="todayFunnyPct"
                          type="number"
                          min="0"
                          max="100"
                          value=${M.tone_funny_pct}
                          onInput=${p=>ue(g=>({...g,tone_funny_pct:p.target.value}))}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="todayCardsPerTheme">Cards Per Theme</label>
                        <input
                          id="todayCardsPerTheme"
                          type="number"
                          min="1"
                          max="50"
                          value=${M.cards_per_theme}
                          onInput=${p=>ue(g=>({...g,cards_per_theme:p.target.value}))}
                          required
                        />
                      </div>
                      <div className="form-field full">
                        <p className="form-helper">Use short and crisp if you want greeting-card style output. Raise Funny % only when the theme can support it.</p>
                      </div>
                      <div className="form-field full">
                        <label htmlFor="todayThemeNotes">Notes</label>
                        <textarea
                          id="todayThemeNotes"
                          rows="3"
                          value=${M.notes}
                          onInput=${p=>ue(g=>({...g,notes:p.target.value}))}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${w==="create-today-job"||!W}>
                        ${w==="create-today-job"?"Creating...":"Use Today's Theme"}
                      </button>
                      <button type="button" className="button" onClick=${()=>T(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}

        ${d?_`
              <div className="modal-backdrop" onClick=${()=>c(!1)}>
                <section className="modal modal-wide" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">${A?"Edit Theme":"Add Theme"}</h2>
                  <form onSubmit=${rt}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="themeKey">Theme Key</label>
                        <input id="themeKey" value=${O.theme_key} onInput=${p=>fe(g=>({...g,theme_key:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeNameFactory">Theme Name</label>
                        <input id="themeNameFactory" value=${O.theme_name} onInput=${p=>fe(g=>({...g,theme_name:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeBucket">Theme Bucket</label>
                        <select id="themeBucket" value=${O.theme_bucket} onChange=${p=>fe(g=>({...g,theme_bucket:p.target.value}))}>
                          <option value="everyday">everyday</option>
                          <option value="occasion">occasion</option>
                          <option value="current_event">current event</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeType">Theme Type</label>
                        <select id="themeType" value=${O.theme_type} onChange=${p=>fe(g=>({...g,theme_type:p.target.value}))}>
                          <option value="evergreen">evergreen</option>
                          <option value="calendar">calendar</option>
                          <option value="campaign">campaign</option>
                          <option value="news">news</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeContext">Cultural Context</label>
                        <input id="themeContext" value=${O.cultural_context} onInput=${p=>fe(g=>({...g,cultural_context:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeTone">Tone Style</label>
                        <input id="themeTone" value=${O.tone_style} onInput=${p=>fe(g=>({...g,tone_style:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeAudience">Audience</label>
                        <input id="themeAudience" value=${O.default_audience} onInput=${p=>fe(g=>({...g,default_audience:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeVisual">Visual Style</label>
                        <input id="themeVisual" value=${O.default_visual_style} onInput=${p=>fe(g=>({...g,default_visual_style:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themePriority">Priority</label>
                        <input id="themePriority" type="number" value=${O.priority} onInput=${p=>fe(g=>({...g,priority:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeFunny">Funny %</label>
                        <input id="themeFunny" type="number" min="0" max="100" value=${O.default_funny_pct} onInput=${p=>fe(g=>({...g,default_funny_pct:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeEmotion">Emotion %</label>
                        <input id="themeEmotion" type="number" min="0" max="100" value=${O.default_emotion_pct} onInput=${p=>fe(g=>({...g,default_emotion_pct:p.target.value}))} />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="themeDescription">Description</label>
                        <textarea id="themeDescription" rows="4" value=${O.description} onInput=${p=>fe(g=>({...g,description:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${O.is_active} onChange=${p=>fe(g=>({...g,is_active:p.target.checked}))} />
                        <span>Active theme</span>
                      </label>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${w==="save-theme"}>
                        ${w==="save-theme"?"Saving...":"Save Theme"}
                      </button>
                      <button type="button" className="button" onClick=${()=>c(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}

        ${f?_`
              <div className="modal-backdrop" onClick=${()=>y(!1)}>
                <section className="modal modal-wide" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">${Z?"Edit Schedule":"Add Schedule"}</h2>
                  <form onSubmit=${Vl}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="scheduleTheme">Theme</label>
                        <select id="scheduleTheme" value=${B.theme_id} onChange=${p=>he(g=>({...g,theme_id:p.target.value}))} required>
                          ${t.map(p=>_`<option key=${p.id} value=${p.id}>${p.theme_name}</option>`)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleType">Schedule Type</label>
                        <select id="scheduleType" value=${B.schedule_type} onChange=${p=>he(g=>({...g,schedule_type:p.target.value}))}>
                          <option value="single_day">single_day</option>
                          <option value="date_range">date_range</option>
                          <option value="weekly_recurring">weekly_recurring</option>
                          <option value="monthly_recurring">monthly_recurring</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleStart">Start Date</label>
                        <input id="scheduleStart" type="date" value=${B.start_date} onInput=${p=>he(g=>({...g,start_date:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleEnd">End Date</label>
                        <input id="scheduleEnd" type="date" value=${B.end_date} onInput=${p=>he(g=>({...g,end_date:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="weekdayMask">Weekday Mask</label>
                        <input id="weekdayMask" value=${B.weekday_mask} onInput=${p=>he(g=>({...g,weekday_mask:p.target.value}))} placeholder="monday, thursday" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="monthMask">Month Mask</label>
                        <input id="monthMask" value=${B.month_mask} onInput=${p=>he(g=>({...g,month_mask:p.target.value}))} placeholder="2, 3, 8" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleRegion">Region</label>
                        <input id="scheduleRegion" value=${B.region} onInput=${p=>he(g=>({...g,region:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleCountry">Country</label>
                        <input id="scheduleCountry" value=${B.country} onInput=${p=>he(g=>({...g,country:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="schedulePriority">Priority</label>
                        <input id="schedulePriority" type="number" value=${B.priority} onInput=${p=>he(g=>({...g,priority:p.target.value}))} />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="scheduleNotes">Notes</label>
                        <textarea id="scheduleNotes" rows="4" value=${B.notes} onInput=${p=>he(g=>({...g,notes:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${B.is_active} onChange=${p=>he(g=>({...g,is_active:p.target.checked}))} />
                        <span>Active schedule</span>
                      </label>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${w==="save-schedule"}>
                        ${w==="save-schedule"?"Saving...":"Save Schedule"}
                      </button>
                      <button type="button" className="button" onClick=${()=>y(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}

        ${x?_`
              <div className="modal-backdrop" onClick=${()=>P(!1)}>
                <section className="modal" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">Add Override</h2>
                  <form onSubmit=${Je}>
                    <div className="form-grid">
                      <div className="form-field full">
                        <label htmlFor="overrideTheme">Theme</label>
                        <select id="overrideTheme" value=${se.theme_id} onChange=${p=>C(g=>({...g,theme_id:p.target.value}))} required>
                          ${t.map(p=>_`<option key=${p.id} value=${p.id}>${p.theme_name}</option>`)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideScope">Scope</label>
                        <input id="overrideScope" value=${se.override_scope} onInput=${p=>C(g=>({...g,override_scope:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideBy">Created By</label>
                        <input id="overrideBy" value=${se.created_by} onInput=${p=>C(g=>({...g,created_by:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideStart">Start At</label>
                        <input id="overrideStart" type="datetime-local" value=${se.start_at} onInput=${p=>C(g=>({...g,start_at:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideEnd">End At</label>
                        <input id="overrideEnd" type="datetime-local" value=${se.end_at} onInput=${p=>C(g=>({...g,end_at:p.target.value}))} required />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="overrideReason">Reason</label>
                        <textarea id="overrideReason" rows="4" value=${se.reason} onInput=${p=>C(g=>({...g,reason:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${se.force_top_priority} onChange=${p=>C(g=>({...g,force_top_priority:p.target.checked}))} />
                        <span>Force top priority</span>
                      </label>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${w==="save-override"}>
                        ${w==="save-override"?"Saving...":"Save Override"}
                      </button>
                      <button type="button" className="button" onClick=${()=>P(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}
      </section>
    `}function Ov(){return _`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Tools</p>
            <h1 className="page-title">Compare Lab</h1>
            <p className="page-description">
              Secondary lab surface for model target selection, prompt/theme tuning, judge mode, sweep mode, and winner analysis.
            </p>
          </div>
          <div className="inline-actions">
            <a href="/static/compare.html" target="_blank" rel="noreferrer" className="button-link">Open Standalone Compare</a>
          </div>
        </header>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Embedded Legacy Compare Interface</h2>
              <p className="section-copy">All existing compare workflow features are preserved without functional changes.</p>
            </div>
          </div>
          <iframe
            className="compare-frame"
            src="/static/compare.html"
            title="eCardFactory Compare Lab"
            loading="lazy"
          ></iframe>
        </section>
      </section>
    `}function Uv(){return _`
      <div className="console-layout">
        <aside className="console-sidebar">
          <p className="brand-overline">eCardFactory</p>
          <h1 className="brand-title">Internal Console</h1>
          <p className="brand-subtitle">Workflow-first operations panel</p>
          <nav className="sidebar-nav" aria-label="Primary">
            <${jl}
              to="/"
              end
              className=${({isActive:e})=>e?"nav-link active":"nav-link"}
            >
              Workflow Console
            <//>
            <${jl}
              to="/themes"
              className=${({isActive:e})=>e?"nav-link active":"nav-link"}
            >
              Theme Factory
            <//>
            <${jl}
              to="/compare"
              className=${({isActive:e})=>e?"nav-link active":"nav-link"}
            >
              Compare Lab
            <//>
          </nav>
        </aside>

        <main className="console-main">
          <${_s}>
            <${un} path="/" element=${_`<${Dv} />`} />
            <${un} path="/themes" element=${_`<${Lv} />`} />
            <${un} path="/compare" element=${_`<${Ov} />`} />
            <${un} path="/jobs/:jobId" element=${_`<${Fv} />`} />
            <${un} path="*" element=${_`<${gs} to="/" replace=${!0} />`} />
          <//>
        </main>
      </div>
    `}var ks=class extends $.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}componentDidCatch(t){ua(`Frontend render error: ${t?.message||"unknown error"}. See browser console for details.`,t)}render(){return this.state.error?_`
        <div className="console-layout">
          <aside className="console-sidebar">
            <p className="brand-overline">eCardFactory</p>
            <h1 className="brand-title">Internal Console</h1>
            <p className="brand-subtitle">Workflow-first operations panel</p>
            <nav className="sidebar-nav" aria-label="Primary">
              <a className="nav-link active" href="/">Workflow Console</a>
              <a className="nav-link" href="/themes">Theme Factory</a>
              <a className="nav-link" href="/compare">Compare Lab</a>
            </nav>
          </aside>
          <main className="console-main">
            <header className="page-head">
              <div>
                <p className="page-kicker">Frontend</p>
                <h1 className="page-title">eCardFactory</h1>
                <p className="page-description">Unable to render the dashboard due to a frontend runtime error.</p>
              </div>
            </header>
            <section className="section-panel">
              <div className="section-head">
                <div>
                  <h2 className="section-title">Render Error</h2>
                  <p className="section-copy">Check browser console for stack trace.</p>
                </div>
              </div>
              <div className="empty-state">
                ${this.state.error?.message||"Unknown frontend error"}
              </div>
            </section>
          </main>
        </div>
      `:this.props.children}};function Iv(){return(0,$.useEffect)(()=>{Sv()},[]),null}function Av(){return _`
      <${bf}>
        <${ks}>
          <${Iv} />
          <${Uv} />
        <//>
      <//>
    `}window.addEventListener("error",e=>{e.error&&ua(`Frontend runtime error: ${e.error.message||"unknown error"}.`,e.error)});window.addEventListener("unhandledrejection",e=>{ua(`Unhandled async error: ${e.reason?.message||String(e.reason||"unknown")}`,e.reason)});var jf=document.getElementById("root");if(!jf)ua("Frontend root element (#root) is missing in index.html.");else try{(0,Mf.createRoot)(jf).render(_`<${Av} />`)}catch(e){ua(`Unable to mount React root: ${e?.message||"unknown mount error"}`,e)}})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@remix-run/router/dist/router.js:
  (**
   * @remix-run/router v1.23.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router/dist/index.js:
  (**
   * React Router v6.30.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/index.js:
  (**
   * React Router DOM v6.30.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
