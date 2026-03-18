(()=>{var up=Object.create;var Fs=Object.defineProperty;var cp=Object.getOwnPropertyDescriptor;var dp=Object.getOwnPropertyNames;var fp=Object.getPrototypeOf,pp=Object.prototype.hasOwnProperty;var fn=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var mp=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of dp(t))!pp.call(e,a)&&a!==n&&Fs(e,a,{get:()=>t[a],enumerable:!(r=cp(t,a))||r.enumerable});return e};var fr=(e,t,n)=>(n=e!=null?up(fp(e)):{},mp(t||!e||!e.__esModule?Fs(n,"default",{value:e,enumerable:!0}):n,e));var Ws=fn(z=>{"use strict";var pr=Symbol.for("react.element"),hp=Symbol.for("react.portal"),vp=Symbol.for("react.fragment"),yp=Symbol.for("react.strict_mode"),gp=Symbol.for("react.profiler"),_p=Symbol.for("react.provider"),Np=Symbol.for("react.context"),wp=Symbol.for("react.forward_ref"),Sp=Symbol.for("react.suspense"),Ep=Symbol.for("react.memo"),kp=Symbol.for("react.lazy"),Ls=Symbol.iterator;function $p(e){return e===null||typeof e!="object"?null:(e=Ls&&e[Ls]||e["@@iterator"],typeof e=="function"?e:null)}var As={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Is=Object.assign,Us={};function Dn(e,t,n){this.props=e,this.context=t,this.refs=Us,this.updater=n||As}Dn.prototype.isReactComponent={};Dn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Dn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ms(){}Ms.prototype=Dn.prototype;function qo(e,t,n){this.props=e,this.context=t,this.refs=Us,this.updater=n||As}var Zo=qo.prototype=new Ms;Zo.constructor=qo;Is(Zo,Dn.prototype);Zo.isPureReactComponent=!0;var Os=Array.isArray,zs=Object.prototype.hasOwnProperty,el={current:null},Bs={key:!0,ref:!0,__self:!0,__source:!0};function Vs(e,t,n){var r,a={},o=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(o=""+t.key),t)zs.call(t,r)&&!Bs.hasOwnProperty(r)&&(a[r]=t[r]);var i=arguments.length-2;if(i===1)a.children=n;else if(1<i){for(var s=Array(i),u=0;u<i;u++)s[u]=arguments[u+2];a.children=s}if(e&&e.defaultProps)for(r in i=e.defaultProps,i)a[r]===void 0&&(a[r]=i[r]);return{$$typeof:pr,type:e,key:o,ref:l,props:a,_owner:el.current}}function Rp(e,t){return{$$typeof:pr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function tl(e){return typeof e=="object"&&e!==null&&e.$$typeof===pr}function bp(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var js=/\/+/g;function Xo(e,t){return typeof e=="object"&&e!==null&&e.key!=null?bp(""+e.key):t.toString(36)}function va(e,t,n,r,a){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(o){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case pr:case hp:l=!0}}if(l)return l=e,a=a(l),e=r===""?"."+Xo(l,0):r,Os(a)?(n="",e!=null&&(n=e.replace(js,"$&/")+"/"),va(a,t,n,"",function(u){return u})):a!=null&&(tl(a)&&(a=Rp(a,n+(!a.key||l&&l.key===a.key?"":(""+a.key).replace(js,"$&/")+"/")+e)),t.push(a)),1;if(l=0,r=r===""?".":r+":",Os(e))for(var i=0;i<e.length;i++){o=e[i];var s=r+Xo(o,i);l+=va(o,t,n,s,a)}else if(s=$p(e),typeof s=="function")for(e=s.call(e),i=0;!(o=e.next()).done;)o=o.value,s=r+Xo(o,i++),l+=va(o,t,n,s,a);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function ha(e,t,n){if(e==null)return e;var r=[],a=0;return va(e,r,"","",function(o){return t.call(n,o,a++)}),r}function Cp(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Oe={current:null},ya={transition:null},xp={ReactCurrentDispatcher:Oe,ReactCurrentBatchConfig:ya,ReactCurrentOwner:el};function Hs(){throw Error("act(...) is not supported in production builds of React.")}z.Children={map:ha,forEach:function(e,t,n){ha(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ha(e,function(){t++}),t},toArray:function(e){return ha(e,function(t){return t})||[]},only:function(e){if(!tl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};z.Component=Dn;z.Fragment=vp;z.Profiler=gp;z.PureComponent=qo;z.StrictMode=yp;z.Suspense=Sp;z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=xp;z.act=Hs;z.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Is({},e.props),a=e.key,o=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,l=el.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(s in t)zs.call(t,s)&&!Bs.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&i!==void 0?i[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){i=Array(s);for(var u=0;u<s;u++)i[u]=arguments[u+2];r.children=i}return{$$typeof:pr,type:e.type,key:a,ref:o,props:r,_owner:l}};z.createContext=function(e){return e={$$typeof:Np,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:_p,_context:e},e.Consumer=e};z.createElement=Vs;z.createFactory=function(e){var t=Vs.bind(null,e);return t.type=e,t};z.createRef=function(){return{current:null}};z.forwardRef=function(e){return{$$typeof:wp,render:e}};z.isValidElement=tl;z.lazy=function(e){return{$$typeof:kp,_payload:{_status:-1,_result:e},_init:Cp}};z.memo=function(e,t){return{$$typeof:Ep,type:e,compare:t===void 0?null:t}};z.startTransition=function(e){var t=ya.transition;ya.transition={};try{e()}finally{ya.transition=t}};z.unstable_act=Hs;z.useCallback=function(e,t){return Oe.current.useCallback(e,t)};z.useContext=function(e){return Oe.current.useContext(e)};z.useDebugValue=function(){};z.useDeferredValue=function(e){return Oe.current.useDeferredValue(e)};z.useEffect=function(e,t){return Oe.current.useEffect(e,t)};z.useId=function(){return Oe.current.useId()};z.useImperativeHandle=function(e,t,n){return Oe.current.useImperativeHandle(e,t,n)};z.useInsertionEffect=function(e,t){return Oe.current.useInsertionEffect(e,t)};z.useLayoutEffect=function(e,t){return Oe.current.useLayoutEffect(e,t)};z.useMemo=function(e,t){return Oe.current.useMemo(e,t)};z.useReducer=function(e,t,n){return Oe.current.useReducer(e,t,n)};z.useRef=function(e){return Oe.current.useRef(e)};z.useState=function(e){return Oe.current.useState(e)};z.useSyncExternalStore=function(e,t,n){return Oe.current.useSyncExternalStore(e,t,n)};z.useTransition=function(){return Oe.current.useTransition()};z.version="18.3.1"});var mr=fn((dy,Ks)=>{"use strict";Ks.exports=Ws()});var nu=fn(te=>{"use strict";function ol(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<ga(a,t))e[r]=t,e[n]=a,n=r;else break e}}function it(e){return e.length===0?null:e[0]}function Na(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,a=e.length,o=a>>>1;r<o;){var l=2*(r+1)-1,i=e[l],s=l+1,u=e[s];if(0>ga(i,n))s<a&&0>ga(u,i)?(e[r]=u,e[s]=n,r=s):(e[r]=i,e[l]=n,r=l);else if(s<a&&0>ga(u,n))e[r]=u,e[s]=n,r=s;else break e}}return t}function ga(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Js=performance,te.unstable_now=function(){return Js.now()}):(nl=Date,Qs=nl.now(),te.unstable_now=function(){return nl.now()-Qs});var Js,nl,Qs,_t=[],Ut=[],Pp=1,qe=null,be=3,wa=!1,pn=!1,vr=!1,Xs=typeof setTimeout=="function"?setTimeout:null,qs=typeof clearTimeout=="function"?clearTimeout:null,Ys=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function ll(e){for(var t=it(Ut);t!==null;){if(t.callback===null)Na(Ut);else if(t.startTime<=e)Na(Ut),t.sortIndex=t.expirationTime,ol(_t,t);else break;t=it(Ut)}}function il(e){if(vr=!1,ll(e),!pn)if(it(_t)!==null)pn=!0,ul(sl);else{var t=it(Ut);t!==null&&cl(il,t.startTime-e)}}function sl(e,t){pn=!1,vr&&(vr=!1,qs(yr),yr=-1),wa=!0;var n=be;try{for(ll(t),qe=it(_t);qe!==null&&(!(qe.expirationTime>t)||e&&!tu());){var r=qe.callback;if(typeof r=="function"){qe.callback=null,be=qe.priorityLevel;var a=r(qe.expirationTime<=t);t=te.unstable_now(),typeof a=="function"?qe.callback=a:qe===it(_t)&&Na(_t),ll(t)}else Na(_t);qe=it(_t)}if(qe!==null)var o=!0;else{var l=it(Ut);l!==null&&cl(il,l.startTime-t),o=!1}return o}finally{qe=null,be=n,wa=!1}}var Sa=!1,_a=null,yr=-1,Zs=5,eu=-1;function tu(){return!(te.unstable_now()-eu<Zs)}function rl(){if(_a!==null){var e=te.unstable_now();eu=e;var t=!0;try{t=_a(!0,e)}finally{t?hr():(Sa=!1,_a=null)}}else Sa=!1}var hr;typeof Ys=="function"?hr=function(){Ys(rl)}:typeof MessageChannel<"u"?(al=new MessageChannel,Gs=al.port2,al.port1.onmessage=rl,hr=function(){Gs.postMessage(null)}):hr=function(){Xs(rl,0)};var al,Gs;function ul(e){_a=e,Sa||(Sa=!0,hr())}function cl(e,t){yr=Xs(function(){e(te.unstable_now())},t)}te.unstable_IdlePriority=5;te.unstable_ImmediatePriority=1;te.unstable_LowPriority=4;te.unstable_NormalPriority=3;te.unstable_Profiling=null;te.unstable_UserBlockingPriority=2;te.unstable_cancelCallback=function(e){e.callback=null};te.unstable_continueExecution=function(){pn||wa||(pn=!0,ul(sl))};te.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Zs=0<e?Math.floor(1e3/e):5};te.unstable_getCurrentPriorityLevel=function(){return be};te.unstable_getFirstCallbackNode=function(){return it(_t)};te.unstable_next=function(e){switch(be){case 1:case 2:case 3:var t=3;break;default:t=be}var n=be;be=t;try{return e()}finally{be=n}};te.unstable_pauseExecution=function(){};te.unstable_requestPaint=function(){};te.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=be;be=e;try{return t()}finally{be=n}};te.unstable_scheduleCallback=function(e,t,n){var r=te.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return a=n+a,e={id:Pp++,callback:t,priorityLevel:e,startTime:n,expirationTime:a,sortIndex:-1},n>r?(e.sortIndex=n,ol(Ut,e),it(_t)===null&&e===it(Ut)&&(vr?(qs(yr),yr=-1):vr=!0,cl(il,n-r))):(e.sortIndex=a,ol(_t,e),pn||wa||(pn=!0,ul(sl))),e};te.unstable_shouldYield=tu;te.unstable_wrapCallback=function(e){var t=be;return function(){var n=be;be=t;try{return e.apply(this,arguments)}finally{be=n}}}});var au=fn((py,ru)=>{"use strict";ru.exports=nu()});var uf=fn(Ge=>{"use strict";var Tp=mr(),Qe=au();function R(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var dc=new Set,Ur={};function Rn(e,t){Zn(e,t),Zn(e+"Capture",t)}function Zn(e,t){for(Ur[e]=t,e=0;e<t.length;e++)dc.add(t[e])}var Tt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Fl=Object.prototype.hasOwnProperty,Dp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ou={},lu={};function Fp(e){return Fl.call(lu,e)?!0:Fl.call(ou,e)?!1:Dp.test(e)?lu[e]=!0:(ou[e]=!0,!1)}function Lp(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Op(e,t,n,r){if(t===null||typeof t>"u"||Lp(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ie(e,t,n,r,a,o,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=l}var $e={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){$e[e]=new Ie(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];$e[t]=new Ie(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){$e[e]=new Ie(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){$e[e]=new Ie(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){$e[e]=new Ie(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){$e[e]=new Ie(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){$e[e]=new Ie(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){$e[e]=new Ie(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){$e[e]=new Ie(e,5,!1,e.toLowerCase(),null,!1,!1)});var $i=/[\-:]([a-z])/g;function Ri(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace($i,Ri);$e[t]=new Ie(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace($i,Ri);$e[t]=new Ie(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace($i,Ri);$e[t]=new Ie(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){$e[e]=new Ie(e,1,!1,e.toLowerCase(),null,!1,!1)});$e.xlinkHref=new Ie("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){$e[e]=new Ie(e,1,!1,e.toLowerCase(),null,!0,!0)});function bi(e,t,n,r){var a=$e.hasOwnProperty(t)?$e[t]:null;(a!==null?a.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Op(t,n,a,r)&&(n=null),r||a===null?Fp(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(t=a.attributeName,r=a.attributeNamespace,n===null?e.removeAttribute(t):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Ot=Tp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ea=Symbol.for("react.element"),On=Symbol.for("react.portal"),jn=Symbol.for("react.fragment"),Ci=Symbol.for("react.strict_mode"),Ll=Symbol.for("react.profiler"),fc=Symbol.for("react.provider"),pc=Symbol.for("react.context"),xi=Symbol.for("react.forward_ref"),Ol=Symbol.for("react.suspense"),jl=Symbol.for("react.suspense_list"),Pi=Symbol.for("react.memo"),zt=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var mc=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var iu=Symbol.iterator;function gr(e){return e===null||typeof e!="object"?null:(e=iu&&e[iu]||e["@@iterator"],typeof e=="function"?e:null)}var ce=Object.assign,dl;function Rr(e){if(dl===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);dl=t&&t[1]||""}return`
`+dl+e}var fl=!1;function pl(e,t){if(!e||fl)return"";fl=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var a=u.stack.split(`
`),o=r.stack.split(`
`),l=a.length-1,i=o.length-1;1<=l&&0<=i&&a[l]!==o[i];)i--;for(;1<=l&&0<=i;l--,i--)if(a[l]!==o[i]){if(l!==1||i!==1)do if(l--,i--,0>i||a[l]!==o[i]){var s=`
`+a[l].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=l&&0<=i);break}}}finally{fl=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Rr(e):""}function jp(e){switch(e.tag){case 5:return Rr(e.type);case 16:return Rr("Lazy");case 13:return Rr("Suspense");case 19:return Rr("SuspenseList");case 0:case 2:case 15:return e=pl(e.type,!1),e;case 11:return e=pl(e.type.render,!1),e;case 1:return e=pl(e.type,!0),e;default:return""}}function Al(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case jn:return"Fragment";case On:return"Portal";case Ll:return"Profiler";case Ci:return"StrictMode";case Ol:return"Suspense";case jl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case pc:return(e.displayName||"Context")+".Consumer";case fc:return(e._context.displayName||"Context")+".Provider";case xi:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Pi:return t=e.displayName||null,t!==null?t:Al(e.type)||"Memo";case zt:t=e._payload,e=e._init;try{return Al(e(t))}catch{}}return null}function Ap(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Al(t);case 8:return t===Ci?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function tn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function hc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ip(e){var t=hc(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(l){r=""+l,o.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ka(e){e._valueTracker||(e._valueTracker=Ip(e))}function vc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=hc(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function qa(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Il(e,t){var n=t.checked;return ce({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function su(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=tn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function yc(e,t){t=t.checked,t!=null&&bi(e,"checked",t,!1)}function Ul(e,t){yc(e,t);var n=tn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ml(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ml(e,t.type,tn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function uu(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ml(e,t,n){(t!=="number"||qa(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var br=Array.isArray;function Jn(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+tn(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,r&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function zl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(R(91));return ce({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function cu(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(R(92));if(br(n)){if(1<n.length)throw Error(R(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:tn(n)}}function gc(e,t){var n=tn(t.value),r=tn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function du(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function _c(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Bl(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?_c(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var $a,Nc=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,a)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for($a=$a||document.createElement("div"),$a.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=$a.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Mr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Pr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Up=["Webkit","ms","Moz","O"];Object.keys(Pr).forEach(function(e){Up.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Pr[t]=Pr[e]})});function wc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Pr.hasOwnProperty(e)&&Pr[e]?(""+t).trim():t+"px"}function Sc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,a=wc(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,a):e[n]=a}}var Mp=ce({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Vl(e,t){if(t){if(Mp[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(R(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(R(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(R(61))}if(t.style!=null&&typeof t.style!="object")throw Error(R(62))}}function Hl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Wl=null;function Ti(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Kl=null,Qn=null,Yn=null;function fu(e){if(e=aa(e)){if(typeof Kl!="function")throw Error(R(280));var t=e.stateNode;t&&(t=bo(t),Kl(e.stateNode,e.type,t))}}function Ec(e){Qn?Yn?Yn.push(e):Yn=[e]:Qn=e}function kc(){if(Qn){var e=Qn,t=Yn;if(Yn=Qn=null,fu(e),t)for(e=0;e<t.length;e++)fu(t[e])}}function $c(e,t){return e(t)}function Rc(){}var ml=!1;function bc(e,t,n){if(ml)return e(t,n);ml=!0;try{return $c(e,t,n)}finally{ml=!1,(Qn!==null||Yn!==null)&&(Rc(),kc())}}function zr(e,t){var n=e.stateNode;if(n===null)return null;var r=bo(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(R(231,t,typeof n));return n}var Jl=!1;if(Tt)try{Fn={},Object.defineProperty(Fn,"passive",{get:function(){Jl=!0}}),window.addEventListener("test",Fn,Fn),window.removeEventListener("test",Fn,Fn)}catch{Jl=!1}var Fn;function zp(e,t,n,r,a,o,l,i,s){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(m){this.onError(m)}}var Tr=!1,Za=null,eo=!1,Ql=null,Bp={onError:function(e){Tr=!0,Za=e}};function Vp(e,t,n,r,a,o,l,i,s){Tr=!1,Za=null,zp.apply(Bp,arguments)}function Hp(e,t,n,r,a,o,l,i,s){if(Vp.apply(this,arguments),Tr){if(Tr){var u=Za;Tr=!1,Za=null}else throw Error(R(198));eo||(eo=!0,Ql=u)}}function bn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Cc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function pu(e){if(bn(e)!==e)throw Error(R(188))}function Wp(e){var t=e.alternate;if(!t){if(t=bn(e),t===null)throw Error(R(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var o=a.alternate;if(o===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===n)return pu(a),e;if(o===r)return pu(a),t;o=o.sibling}throw Error(R(188))}if(n.return!==r.return)n=a,r=o;else{for(var l=!1,i=a.child;i;){if(i===n){l=!0,n=a,r=o;break}if(i===r){l=!0,r=a,n=o;break}i=i.sibling}if(!l){for(i=o.child;i;){if(i===n){l=!0,n=o,r=a;break}if(i===r){l=!0,r=o,n=a;break}i=i.sibling}if(!l)throw Error(R(189))}}if(n.alternate!==r)throw Error(R(190))}if(n.tag!==3)throw Error(R(188));return n.stateNode.current===n?e:t}function xc(e){return e=Wp(e),e!==null?Pc(e):null}function Pc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Pc(e);if(t!==null)return t;e=e.sibling}return null}var Tc=Qe.unstable_scheduleCallback,mu=Qe.unstable_cancelCallback,Kp=Qe.unstable_shouldYield,Jp=Qe.unstable_requestPaint,he=Qe.unstable_now,Qp=Qe.unstable_getCurrentPriorityLevel,Di=Qe.unstable_ImmediatePriority,Dc=Qe.unstable_UserBlockingPriority,to=Qe.unstable_NormalPriority,Yp=Qe.unstable_LowPriority,Fc=Qe.unstable_IdlePriority,Eo=null,Et=null;function Gp(e){if(Et&&typeof Et.onCommitFiberRoot=="function")try{Et.onCommitFiberRoot(Eo,e,void 0,(e.current.flags&128)===128)}catch{}}var ft=Math.clz32?Math.clz32:Zp,Xp=Math.log,qp=Math.LN2;function Zp(e){return e>>>=0,e===0?32:31-(Xp(e)/qp|0)|0}var Ra=64,ba=4194304;function Cr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function no(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,a=e.suspendedLanes,o=e.pingedLanes,l=n&268435455;if(l!==0){var i=l&~a;i!==0?r=Cr(i):(o&=l,o!==0&&(r=Cr(o)))}else l=n&~a,l!==0?r=Cr(l):o!==0&&(r=Cr(o));if(r===0)return 0;if(t!==0&&t!==r&&(t&a)===0&&(a=r&-r,o=t&-t,a>=o||a===16&&(o&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-ft(t),a=1<<n,r|=e[n],t&=~a;return r}function em(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function tm(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,o=e.pendingLanes;0<o;){var l=31-ft(o),i=1<<l,s=a[l];s===-1?((i&n)===0||(i&r)!==0)&&(a[l]=em(i,t)):s<=t&&(e.expiredLanes|=i),o&=~i}}function Yl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Lc(){var e=Ra;return Ra<<=1,(Ra&4194240)===0&&(Ra=64),e}function hl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function na(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-ft(t),e[t]=n}function nm(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-ft(n),o=1<<a;t[a]=0,r[a]=-1,e[a]=-1,n&=~o}}function Fi(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ft(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}var q=0;function Oc(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var jc,Li,Ac,Ic,Uc,Gl=!1,Ca=[],Jt=null,Qt=null,Yt=null,Br=new Map,Vr=new Map,Vt=[],rm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function hu(e,t){switch(e){case"focusin":case"focusout":Jt=null;break;case"dragenter":case"dragleave":Qt=null;break;case"mouseover":case"mouseout":Yt=null;break;case"pointerover":case"pointerout":Br.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Vr.delete(t.pointerId)}}function _r(e,t,n,r,a,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[a]},t!==null&&(t=aa(t),t!==null&&Li(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function am(e,t,n,r,a){switch(t){case"focusin":return Jt=_r(Jt,e,t,n,r,a),!0;case"dragenter":return Qt=_r(Qt,e,t,n,r,a),!0;case"mouseover":return Yt=_r(Yt,e,t,n,r,a),!0;case"pointerover":var o=a.pointerId;return Br.set(o,_r(Br.get(o)||null,e,t,n,r,a)),!0;case"gotpointercapture":return o=a.pointerId,Vr.set(o,_r(Vr.get(o)||null,e,t,n,r,a)),!0}return!1}function Mc(e){var t=vn(e.target);if(t!==null){var n=bn(t);if(n!==null){if(t=n.tag,t===13){if(t=Cc(n),t!==null){e.blockedOn=t,Uc(e.priority,function(){Ac(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ba(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Xl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Wl=r,n.target.dispatchEvent(r),Wl=null}else return t=aa(n),t!==null&&Li(t),e.blockedOn=n,!1;t.shift()}return!0}function vu(e,t,n){Ba(e)&&n.delete(t)}function om(){Gl=!1,Jt!==null&&Ba(Jt)&&(Jt=null),Qt!==null&&Ba(Qt)&&(Qt=null),Yt!==null&&Ba(Yt)&&(Yt=null),Br.forEach(vu),Vr.forEach(vu)}function Nr(e,t){e.blockedOn===t&&(e.blockedOn=null,Gl||(Gl=!0,Qe.unstable_scheduleCallback(Qe.unstable_NormalPriority,om)))}function Hr(e){function t(a){return Nr(a,e)}if(0<Ca.length){Nr(Ca[0],e);for(var n=1;n<Ca.length;n++){var r=Ca[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Jt!==null&&Nr(Jt,e),Qt!==null&&Nr(Qt,e),Yt!==null&&Nr(Yt,e),Br.forEach(t),Vr.forEach(t),n=0;n<Vt.length;n++)r=Vt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Vt.length&&(n=Vt[0],n.blockedOn===null);)Mc(n),n.blockedOn===null&&Vt.shift()}var Gn=Ot.ReactCurrentBatchConfig,ro=!0;function lm(e,t,n,r){var a=q,o=Gn.transition;Gn.transition=null;try{q=1,Oi(e,t,n,r)}finally{q=a,Gn.transition=o}}function im(e,t,n,r){var a=q,o=Gn.transition;Gn.transition=null;try{q=4,Oi(e,t,n,r)}finally{q=a,Gn.transition=o}}function Oi(e,t,n,r){if(ro){var a=Xl(e,t,n,r);if(a===null)Sl(e,t,r,ao,n),hu(e,r);else if(am(a,e,t,n,r))r.stopPropagation();else if(hu(e,r),t&4&&-1<rm.indexOf(e)){for(;a!==null;){var o=aa(a);if(o!==null&&jc(o),o=Xl(e,t,n,r),o===null&&Sl(e,t,r,ao,n),o===a)break;a=o}a!==null&&r.stopPropagation()}else Sl(e,t,r,null,n)}}var ao=null;function Xl(e,t,n,r){if(ao=null,e=Ti(r),e=vn(e),e!==null)if(t=bn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Cc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ao=e,null}function zc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Qp()){case Di:return 1;case Dc:return 4;case to:case Yp:return 16;case Fc:return 536870912;default:return 16}default:return 16}}var Wt=null,ji=null,Va=null;function Bc(){if(Va)return Va;var e,t=ji,n=t.length,r,a="value"in Wt?Wt.value:Wt.textContent,o=a.length;for(e=0;e<n&&t[e]===a[e];e++);var l=n-e;for(r=1;r<=l&&t[n-r]===a[o-r];r++);return Va=a.slice(e,1<r?1-r:void 0)}function Ha(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function xa(){return!0}function yu(){return!1}function Ye(e){function t(n,r,a,o,l){this._reactName=n,this._targetInst=a,this.type=r,this.nativeEvent=o,this.target=l,this.currentTarget=null;for(var i in e)e.hasOwnProperty(i)&&(n=e[i],this[i]=n?n(o):o[i]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?xa:yu,this.isPropagationStopped=yu,this}return ce(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=xa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=xa)},persist:function(){},isPersistent:xa}),t}var lr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ai=Ye(lr),ra=ce({},lr,{view:0,detail:0}),sm=Ye(ra),vl,yl,wr,ko=ce({},ra,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ii,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==wr&&(wr&&e.type==="mousemove"?(vl=e.screenX-wr.screenX,yl=e.screenY-wr.screenY):yl=vl=0,wr=e),vl)},movementY:function(e){return"movementY"in e?e.movementY:yl}}),gu=Ye(ko),um=ce({},ko,{dataTransfer:0}),cm=Ye(um),dm=ce({},ra,{relatedTarget:0}),gl=Ye(dm),fm=ce({},lr,{animationName:0,elapsedTime:0,pseudoElement:0}),pm=Ye(fm),mm=ce({},lr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),hm=Ye(mm),vm=ce({},lr,{data:0}),_u=Ye(vm),ym={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},_m={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Nm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=_m[e])?!!t[e]:!1}function Ii(){return Nm}var wm=ce({},ra,{key:function(e){if(e.key){var t=ym[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ha(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?gm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ii,charCode:function(e){return e.type==="keypress"?Ha(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ha(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Sm=Ye(wm),Em=ce({},ko,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Nu=Ye(Em),km=ce({},ra,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ii}),$m=Ye(km),Rm=ce({},lr,{propertyName:0,elapsedTime:0,pseudoElement:0}),bm=Ye(Rm),Cm=ce({},ko,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),xm=Ye(Cm),Pm=[9,13,27,32],Ui=Tt&&"CompositionEvent"in window,Dr=null;Tt&&"documentMode"in document&&(Dr=document.documentMode);var Tm=Tt&&"TextEvent"in window&&!Dr,Vc=Tt&&(!Ui||Dr&&8<Dr&&11>=Dr),wu=" ",Su=!1;function Hc(e,t){switch(e){case"keyup":return Pm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Wc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var An=!1;function Dm(e,t){switch(e){case"compositionend":return Wc(t);case"keypress":return t.which!==32?null:(Su=!0,wu);case"textInput":return e=t.data,e===wu&&Su?null:e;default:return null}}function Fm(e,t){if(An)return e==="compositionend"||!Ui&&Hc(e,t)?(e=Bc(),Va=ji=Wt=null,An=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Vc&&t.locale!=="ko"?null:t.data;default:return null}}var Lm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Eu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Lm[e.type]:t==="textarea"}function Kc(e,t,n,r){Ec(r),t=oo(t,"onChange"),0<t.length&&(n=new Ai("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Fr=null,Wr=null;function Om(e){rd(e,0)}function $o(e){var t=Mn(e);if(vc(t))return e}function jm(e,t){if(e==="change")return t}var Jc=!1;Tt&&(Tt?(Ta="oninput"in document,Ta||(_l=document.createElement("div"),_l.setAttribute("oninput","return;"),Ta=typeof _l.oninput=="function"),Pa=Ta):Pa=!1,Jc=Pa&&(!document.documentMode||9<document.documentMode));var Pa,Ta,_l;function ku(){Fr&&(Fr.detachEvent("onpropertychange",Qc),Wr=Fr=null)}function Qc(e){if(e.propertyName==="value"&&$o(Wr)){var t=[];Kc(t,Wr,e,Ti(e)),bc(Om,t)}}function Am(e,t,n){e==="focusin"?(ku(),Fr=t,Wr=n,Fr.attachEvent("onpropertychange",Qc)):e==="focusout"&&ku()}function Im(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return $o(Wr)}function Um(e,t){if(e==="click")return $o(t)}function Mm(e,t){if(e==="input"||e==="change")return $o(t)}function zm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var mt=typeof Object.is=="function"?Object.is:zm;function Kr(e,t){if(mt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!Fl.call(t,a)||!mt(e[a],t[a]))return!1}return!0}function $u(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ru(e,t){var n=$u(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=$u(n)}}function Yc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Yc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Gc(){for(var e=window,t=qa();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=qa(e.document)}return t}function Mi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Bm(e){var t=Gc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Yc(n.ownerDocument.documentElement,n)){if(r!==null&&Mi(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,o=Math.min(r.start,a);r=r.end===void 0?o:Math.min(r.end,a),!e.extend&&o>r&&(a=r,r=o,o=a),a=Ru(n,o);var l=Ru(n,r);a&&l&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Vm=Tt&&"documentMode"in document&&11>=document.documentMode,In=null,ql=null,Lr=null,Zl=!1;function bu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Zl||In==null||In!==qa(r)||(r=In,"selectionStart"in r&&Mi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Lr&&Kr(Lr,r)||(Lr=r,r=oo(ql,"onSelect"),0<r.length&&(t=new Ai("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=In)))}function Da(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Un={animationend:Da("Animation","AnimationEnd"),animationiteration:Da("Animation","AnimationIteration"),animationstart:Da("Animation","AnimationStart"),transitionend:Da("Transition","TransitionEnd")},Nl={},Xc={};Tt&&(Xc=document.createElement("div").style,"AnimationEvent"in window||(delete Un.animationend.animation,delete Un.animationiteration.animation,delete Un.animationstart.animation),"TransitionEvent"in window||delete Un.transitionend.transition);function Ro(e){if(Nl[e])return Nl[e];if(!Un[e])return e;var t=Un[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Xc)return Nl[e]=t[n];return e}var qc=Ro("animationend"),Zc=Ro("animationiteration"),ed=Ro("animationstart"),td=Ro("transitionend"),nd=new Map,Cu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function rn(e,t){nd.set(e,t),Rn(t,[e])}for(Fa=0;Fa<Cu.length;Fa++)La=Cu[Fa],xu=La.toLowerCase(),Pu=La[0].toUpperCase()+La.slice(1),rn(xu,"on"+Pu);var La,xu,Pu,Fa;rn(qc,"onAnimationEnd");rn(Zc,"onAnimationIteration");rn(ed,"onAnimationStart");rn("dblclick","onDoubleClick");rn("focusin","onFocus");rn("focusout","onBlur");rn(td,"onTransitionEnd");Zn("onMouseEnter",["mouseout","mouseover"]);Zn("onMouseLeave",["mouseout","mouseover"]);Zn("onPointerEnter",["pointerout","pointerover"]);Zn("onPointerLeave",["pointerout","pointerover"]);Rn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Rn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Rn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Rn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Rn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Rn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var xr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Hm=new Set("cancel close invalid load scroll toggle".split(" ").concat(xr));function Tu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Hp(r,t,void 0,e),e.currentTarget=null}function rd(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var l=r.length-1;0<=l;l--){var i=r[l],s=i.instance,u=i.currentTarget;if(i=i.listener,s!==o&&a.isPropagationStopped())break e;Tu(a,i,u),o=s}else for(l=0;l<r.length;l++){if(i=r[l],s=i.instance,u=i.currentTarget,i=i.listener,s!==o&&a.isPropagationStopped())break e;Tu(a,i,u),o=s}}}if(eo)throw e=Ql,eo=!1,Ql=null,e}function ae(e,t){var n=t[ai];n===void 0&&(n=t[ai]=new Set);var r=e+"__bubble";n.has(r)||(ad(t,e,2,!1),n.add(r))}function wl(e,t,n){var r=0;t&&(r|=4),ad(n,e,r,t)}var Oa="_reactListening"+Math.random().toString(36).slice(2);function Jr(e){if(!e[Oa]){e[Oa]=!0,dc.forEach(function(n){n!=="selectionchange"&&(Hm.has(n)||wl(n,!1,e),wl(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Oa]||(t[Oa]=!0,wl("selectionchange",!1,t))}}function ad(e,t,n,r){switch(zc(t)){case 1:var a=lm;break;case 4:a=im;break;default:a=Oi}n=a.bind(null,t,n,e),a=void 0,!Jl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),r?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function Sl(e,t,n,r,a){var o=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var i=r.stateNode.containerInfo;if(i===a||i.nodeType===8&&i.parentNode===a)break;if(l===4)for(l=r.return;l!==null;){var s=l.tag;if((s===3||s===4)&&(s=l.stateNode.containerInfo,s===a||s.nodeType===8&&s.parentNode===a))return;l=l.return}for(;i!==null;){if(l=vn(i),l===null)return;if(s=l.tag,s===5||s===6){r=o=l;continue e}i=i.parentNode}}r=r.return}bc(function(){var u=o,m=Ti(n),v=[];e:{var h=nd.get(e);if(h!==void 0){var E=Ai,S=e;switch(e){case"keypress":if(Ha(n)===0)break e;case"keydown":case"keyup":E=Sm;break;case"focusin":S="focus",E=gl;break;case"focusout":S="blur",E=gl;break;case"beforeblur":case"afterblur":E=gl;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":E=gu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":E=cm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":E=$m;break;case qc:case Zc:case ed:E=pm;break;case td:E=bm;break;case"scroll":E=sm;break;case"wheel":E=xm;break;case"copy":case"cut":case"paste":E=hm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":E=Nu}var w=(t&4)!==0,N=!w&&e==="scroll",d=w?h!==null?h+"Capture":null:h;w=[];for(var c=u,f;c!==null;){f=c;var g=f.stateNode;if(f.tag===5&&g!==null&&(f=g,d!==null&&(g=zr(c,d),g!=null&&w.push(Qr(c,g,f)))),N)break;c=c.return}0<w.length&&(h=new E(h,S,null,n,m),v.push({event:h,listeners:w}))}}if((t&7)===0){e:{if(h=e==="mouseover"||e==="pointerover",E=e==="mouseout"||e==="pointerout",h&&n!==Wl&&(S=n.relatedTarget||n.fromElement)&&(vn(S)||S[Dt]))break e;if((E||h)&&(h=m.window===m?m:(h=m.ownerDocument)?h.defaultView||h.parentWindow:window,E?(S=n.relatedTarget||n.toElement,E=u,S=S?vn(S):null,S!==null&&(N=bn(S),S!==N||S.tag!==5&&S.tag!==6)&&(S=null)):(E=null,S=u),E!==S)){if(w=gu,g="onMouseLeave",d="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(w=Nu,g="onPointerLeave",d="onPointerEnter",c="pointer"),N=E==null?h:Mn(E),f=S==null?h:Mn(S),h=new w(g,c+"leave",E,n,m),h.target=N,h.relatedTarget=f,g=null,vn(m)===u&&(w=new w(d,c+"enter",S,n,m),w.target=f,w.relatedTarget=N,g=w),N=g,E&&S)t:{for(w=E,d=S,c=0,f=w;f;f=Ln(f))c++;for(f=0,g=d;g;g=Ln(g))f++;for(;0<c-f;)w=Ln(w),c--;for(;0<f-c;)d=Ln(d),f--;for(;c--;){if(w===d||d!==null&&w===d.alternate)break t;w=Ln(w),d=Ln(d)}w=null}else w=null;E!==null&&Du(v,h,E,w,!1),S!==null&&N!==null&&Du(v,N,S,w,!0)}}e:{if(h=u?Mn(u):window,E=h.nodeName&&h.nodeName.toLowerCase(),E==="select"||E==="input"&&h.type==="file")var C=jm;else if(Eu(h))if(Jc)C=Mm;else{C=Im;var x=Am}else(E=h.nodeName)&&E.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(C=Um);if(C&&(C=C(e,u))){Kc(v,C,n,m);break e}x&&x(e,h,u),e==="focusout"&&(x=h._wrapperState)&&x.controlled&&h.type==="number"&&Ml(h,"number",h.value)}switch(x=u?Mn(u):window,e){case"focusin":(Eu(x)||x.contentEditable==="true")&&(In=x,ql=u,Lr=null);break;case"focusout":Lr=ql=In=null;break;case"mousedown":Zl=!0;break;case"contextmenu":case"mouseup":case"dragend":Zl=!1,bu(v,n,m);break;case"selectionchange":if(Vm)break;case"keydown":case"keyup":bu(v,n,m)}var L;if(Ui)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else An?Hc(e,n)&&(P="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(Vc&&n.locale!=="ko"&&(An||P!=="onCompositionStart"?P==="onCompositionEnd"&&An&&(L=Bc()):(Wt=m,ji="value"in Wt?Wt.value:Wt.textContent,An=!0)),x=oo(u,P),0<x.length&&(P=new _u(P,e,null,n,m),v.push({event:P,listeners:x}),L?P.data=L:(L=Wc(n),L!==null&&(P.data=L)))),(L=Tm?Dm(e,n):Fm(e,n))&&(u=oo(u,"onBeforeInput"),0<u.length&&(m=new _u("onBeforeInput","beforeinput",null,n,m),v.push({event:m,listeners:u}),m.data=L))}rd(v,t)})}function Qr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function oo(e,t){for(var n=t+"Capture",r=[];e!==null;){var a=e,o=a.stateNode;a.tag===5&&o!==null&&(a=o,o=zr(e,n),o!=null&&r.unshift(Qr(e,o,a)),o=zr(e,t),o!=null&&r.push(Qr(e,o,a))),e=e.return}return r}function Ln(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Du(e,t,n,r,a){for(var o=t._reactName,l=[];n!==null&&n!==r;){var i=n,s=i.alternate,u=i.stateNode;if(s!==null&&s===r)break;i.tag===5&&u!==null&&(i=u,a?(s=zr(n,o),s!=null&&l.unshift(Qr(n,s,i))):a||(s=zr(n,o),s!=null&&l.push(Qr(n,s,i)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var Wm=/\r\n?/g,Km=/\u0000|\uFFFD/g;function Fu(e){return(typeof e=="string"?e:""+e).replace(Wm,`
`).replace(Km,"")}function ja(e,t,n){if(t=Fu(t),Fu(e)!==t&&n)throw Error(R(425))}function lo(){}var ei=null,ti=null;function ni(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ri=typeof setTimeout=="function"?setTimeout:void 0,Jm=typeof clearTimeout=="function"?clearTimeout:void 0,Lu=typeof Promise=="function"?Promise:void 0,Qm=typeof queueMicrotask=="function"?queueMicrotask:typeof Lu<"u"?function(e){return Lu.resolve(null).then(e).catch(Ym)}:ri;function Ym(e){setTimeout(function(){throw e})}function El(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(r===0){e.removeChild(a),Hr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=a}while(n);Hr(t)}function Gt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ou(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var ir=Math.random().toString(36).slice(2),St="__reactFiber$"+ir,Yr="__reactProps$"+ir,Dt="__reactContainer$"+ir,ai="__reactEvents$"+ir,Gm="__reactListeners$"+ir,Xm="__reactHandles$"+ir;function vn(e){var t=e[St];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Dt]||n[St]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ou(e);e!==null;){if(n=e[St])return n;e=Ou(e)}return t}e=n,n=e.parentNode}return null}function aa(e){return e=e[St]||e[Dt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Mn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(R(33))}function bo(e){return e[Yr]||null}var oi=[],zn=-1;function an(e){return{current:e}}function oe(e){0>zn||(e.current=oi[zn],oi[zn]=null,zn--)}function ne(e,t){zn++,oi[zn]=e.current,e.current=t}var nn={},Te=an(nn),Be=an(!1),wn=nn;function er(e,t){var n=e.type.contextTypes;if(!n)return nn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a={},o;for(o in n)a[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function Ve(e){return e=e.childContextTypes,e!=null}function io(){oe(Be),oe(Te)}function ju(e,t,n){if(Te.current!==nn)throw Error(R(168));ne(Te,t),ne(Be,n)}function od(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var a in r)if(!(a in t))throw Error(R(108,Ap(e)||"Unknown",a));return ce({},n,r)}function so(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||nn,wn=Te.current,ne(Te,e),ne(Be,Be.current),!0}function Au(e,t,n){var r=e.stateNode;if(!r)throw Error(R(169));n?(e=od(e,t,wn),r.__reactInternalMemoizedMergedChildContext=e,oe(Be),oe(Te),ne(Te,e)):oe(Be),ne(Be,n)}var bt=null,Co=!1,kl=!1;function ld(e){bt===null?bt=[e]:bt.push(e)}function qm(e){Co=!0,ld(e)}function on(){if(!kl&&bt!==null){kl=!0;var e=0,t=q;try{var n=bt;for(q=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}bt=null,Co=!1}catch(a){throw bt!==null&&(bt=bt.slice(e+1)),Tc(Di,on),a}finally{q=t,kl=!1}}return null}var Bn=[],Vn=0,uo=null,co=0,Ze=[],et=0,Sn=null,Ct=1,xt="";function mn(e,t){Bn[Vn++]=co,Bn[Vn++]=uo,uo=e,co=t}function id(e,t,n){Ze[et++]=Ct,Ze[et++]=xt,Ze[et++]=Sn,Sn=e;var r=Ct;e=xt;var a=32-ft(r)-1;r&=~(1<<a),n+=1;var o=32-ft(t)+a;if(30<o){var l=a-a%5;o=(r&(1<<l)-1).toString(32),r>>=l,a-=l,Ct=1<<32-ft(t)+a|n<<a|r,xt=o+e}else Ct=1<<o|n<<a|r,xt=e}function zi(e){e.return!==null&&(mn(e,1),id(e,1,0))}function Bi(e){for(;e===uo;)uo=Bn[--Vn],Bn[Vn]=null,co=Bn[--Vn],Bn[Vn]=null;for(;e===Sn;)Sn=Ze[--et],Ze[et]=null,xt=Ze[--et],Ze[et]=null,Ct=Ze[--et],Ze[et]=null}var Je=null,Ke=null,ie=!1,dt=null;function sd(e,t){var n=tt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Iu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Je=e,Ke=Gt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Je=e,Ke=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Sn!==null?{id:Ct,overflow:xt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=tt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Je=e,Ke=null,!0):!1;default:return!1}}function li(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ii(e){if(ie){var t=Ke;if(t){var n=t;if(!Iu(e,t)){if(li(e))throw Error(R(418));t=Gt(n.nextSibling);var r=Je;t&&Iu(e,t)?sd(r,n):(e.flags=e.flags&-4097|2,ie=!1,Je=e)}}else{if(li(e))throw Error(R(418));e.flags=e.flags&-4097|2,ie=!1,Je=e}}}function Uu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Je=e}function Aa(e){if(e!==Je)return!1;if(!ie)return Uu(e),ie=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!ni(e.type,e.memoizedProps)),t&&(t=Ke)){if(li(e))throw ud(),Error(R(418));for(;t;)sd(e,t),t=Gt(t.nextSibling)}if(Uu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(R(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ke=Gt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ke=null}}else Ke=Je?Gt(e.stateNode.nextSibling):null;return!0}function ud(){for(var e=Ke;e;)e=Gt(e.nextSibling)}function tr(){Ke=Je=null,ie=!1}function Vi(e){dt===null?dt=[e]:dt.push(e)}var Zm=Ot.ReactCurrentBatchConfig;function Sr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(R(309));var r=n.stateNode}if(!r)throw Error(R(147,e));var a=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(l){var i=a.refs;l===null?delete i[o]:i[o]=l},t._stringRef=o,t)}if(typeof e!="string")throw Error(R(284));if(!n._owner)throw Error(R(290,e))}return e}function Ia(e,t){throw e=Object.prototype.toString.call(t),Error(R(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Mu(e){var t=e._init;return t(e._payload)}function cd(e){function t(d,c){if(e){var f=d.deletions;f===null?(d.deletions=[c],d.flags|=16):f.push(c)}}function n(d,c){if(!e)return null;for(;c!==null;)t(d,c),c=c.sibling;return null}function r(d,c){for(d=new Map;c!==null;)c.key!==null?d.set(c.key,c):d.set(c.index,c),c=c.sibling;return d}function a(d,c){return d=en(d,c),d.index=0,d.sibling=null,d}function o(d,c,f){return d.index=f,e?(f=d.alternate,f!==null?(f=f.index,f<c?(d.flags|=2,c):f):(d.flags|=2,c)):(d.flags|=1048576,c)}function l(d){return e&&d.alternate===null&&(d.flags|=2),d}function i(d,c,f,g){return c===null||c.tag!==6?(c=Tl(f,d.mode,g),c.return=d,c):(c=a(c,f),c.return=d,c)}function s(d,c,f,g){var C=f.type;return C===jn?m(d,c,f.props.children,g,f.key):c!==null&&(c.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===zt&&Mu(C)===c.type)?(g=a(c,f.props),g.ref=Sr(d,c,f),g.return=d,g):(g=Xa(f.type,f.key,f.props,null,d.mode,g),g.ref=Sr(d,c,f),g.return=d,g)}function u(d,c,f,g){return c===null||c.tag!==4||c.stateNode.containerInfo!==f.containerInfo||c.stateNode.implementation!==f.implementation?(c=Dl(f,d.mode,g),c.return=d,c):(c=a(c,f.children||[]),c.return=d,c)}function m(d,c,f,g,C){return c===null||c.tag!==7?(c=Nn(f,d.mode,g,C),c.return=d,c):(c=a(c,f),c.return=d,c)}function v(d,c,f){if(typeof c=="string"&&c!==""||typeof c=="number")return c=Tl(""+c,d.mode,f),c.return=d,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case Ea:return f=Xa(c.type,c.key,c.props,null,d.mode,f),f.ref=Sr(d,null,c),f.return=d,f;case On:return c=Dl(c,d.mode,f),c.return=d,c;case zt:var g=c._init;return v(d,g(c._payload),f)}if(br(c)||gr(c))return c=Nn(c,d.mode,f,null),c.return=d,c;Ia(d,c)}return null}function h(d,c,f,g){var C=c!==null?c.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return C!==null?null:i(d,c,""+f,g);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Ea:return f.key===C?s(d,c,f,g):null;case On:return f.key===C?u(d,c,f,g):null;case zt:return C=f._init,h(d,c,C(f._payload),g)}if(br(f)||gr(f))return C!==null?null:m(d,c,f,g,null);Ia(d,f)}return null}function E(d,c,f,g,C){if(typeof g=="string"&&g!==""||typeof g=="number")return d=d.get(f)||null,i(c,d,""+g,C);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Ea:return d=d.get(g.key===null?f:g.key)||null,s(c,d,g,C);case On:return d=d.get(g.key===null?f:g.key)||null,u(c,d,g,C);case zt:var x=g._init;return E(d,c,f,x(g._payload),C)}if(br(g)||gr(g))return d=d.get(f)||null,m(c,d,g,C,null);Ia(c,g)}return null}function S(d,c,f,g){for(var C=null,x=null,L=c,P=c=0,O=null;L!==null&&P<f.length;P++){L.index>P?(O=L,L=null):O=L.sibling;var I=h(d,L,f[P],g);if(I===null){L===null&&(L=O);break}e&&L&&I.alternate===null&&t(d,L),c=o(I,c,P),x===null?C=I:x.sibling=I,x=I,L=O}if(P===f.length)return n(d,L),ie&&mn(d,P),C;if(L===null){for(;P<f.length;P++)L=v(d,f[P],g),L!==null&&(c=o(L,c,P),x===null?C=L:x.sibling=L,x=L);return ie&&mn(d,P),C}for(L=r(d,L);P<f.length;P++)O=E(L,d,P,f[P],g),O!==null&&(e&&O.alternate!==null&&L.delete(O.key===null?P:O.key),c=o(O,c,P),x===null?C=O:x.sibling=O,x=O);return e&&L.forEach(function(J){return t(d,J)}),ie&&mn(d,P),C}function w(d,c,f,g){var C=gr(f);if(typeof C!="function")throw Error(R(150));if(f=C.call(f),f==null)throw Error(R(151));for(var x=C=null,L=c,P=c=0,O=null,I=f.next();L!==null&&!I.done;P++,I=f.next()){L.index>P?(O=L,L=null):O=L.sibling;var J=h(d,L,I.value,g);if(J===null){L===null&&(L=O);break}e&&L&&J.alternate===null&&t(d,L),c=o(J,c,P),x===null?C=J:x.sibling=J,x=J,L=O}if(I.done)return n(d,L),ie&&mn(d,P),C;if(L===null){for(;!I.done;P++,I=f.next())I=v(d,I.value,g),I!==null&&(c=o(I,c,P),x===null?C=I:x.sibling=I,x=I);return ie&&mn(d,P),C}for(L=r(d,L);!I.done;P++,I=f.next())I=E(L,d,P,I.value,g),I!==null&&(e&&I.alternate!==null&&L.delete(I.key===null?P:I.key),c=o(I,c,P),x===null?C=I:x.sibling=I,x=I);return e&&L.forEach(function(ee){return t(d,ee)}),ie&&mn(d,P),C}function N(d,c,f,g){if(typeof f=="object"&&f!==null&&f.type===jn&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case Ea:e:{for(var C=f.key,x=c;x!==null;){if(x.key===C){if(C=f.type,C===jn){if(x.tag===7){n(d,x.sibling),c=a(x,f.props.children),c.return=d,d=c;break e}}else if(x.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===zt&&Mu(C)===x.type){n(d,x.sibling),c=a(x,f.props),c.ref=Sr(d,x,f),c.return=d,d=c;break e}n(d,x);break}else t(d,x);x=x.sibling}f.type===jn?(c=Nn(f.props.children,d.mode,g,f.key),c.return=d,d=c):(g=Xa(f.type,f.key,f.props,null,d.mode,g),g.ref=Sr(d,c,f),g.return=d,d=g)}return l(d);case On:e:{for(x=f.key;c!==null;){if(c.key===x)if(c.tag===4&&c.stateNode.containerInfo===f.containerInfo&&c.stateNode.implementation===f.implementation){n(d,c.sibling),c=a(c,f.children||[]),c.return=d,d=c;break e}else{n(d,c);break}else t(d,c);c=c.sibling}c=Dl(f,d.mode,g),c.return=d,d=c}return l(d);case zt:return x=f._init,N(d,c,x(f._payload),g)}if(br(f))return S(d,c,f,g);if(gr(f))return w(d,c,f,g);Ia(d,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,c!==null&&c.tag===6?(n(d,c.sibling),c=a(c,f),c.return=d,d=c):(n(d,c),c=Tl(f,d.mode,g),c.return=d,d=c),l(d)):n(d,c)}return N}var nr=cd(!0),dd=cd(!1),fo=an(null),po=null,Hn=null,Hi=null;function Wi(){Hi=Hn=po=null}function Ki(e){var t=fo.current;oe(fo),e._currentValue=t}function si(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Xn(e,t){po=e,Hi=Hn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(ze=!0),e.firstContext=null)}function rt(e){var t=e._currentValue;if(Hi!==e)if(e={context:e,memoizedValue:t,next:null},Hn===null){if(po===null)throw Error(R(308));Hn=e,po.dependencies={lanes:0,firstContext:e}}else Hn=Hn.next=e;return t}var yn=null;function Ji(e){yn===null?yn=[e]:yn.push(e)}function fd(e,t,n,r){var a=t.interleaved;return a===null?(n.next=n,Ji(t)):(n.next=a.next,a.next=n),t.interleaved=n,Ft(e,r)}function Ft(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Bt=!1;function Qi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function pd(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Pt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Xt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(K&2)!==0){var a=r.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),r.pending=t,Ft(e,n)}return a=r.interleaved,a===null?(t.next=t,Ji(r)):(t.next=a.next,a.next=t),r.interleaved=t,Ft(e,n)}function Wa(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Fi(e,n)}}function zu(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var a=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?a=o=l:o=o.next=l,n=n.next}while(n!==null);o===null?a=o=t:o=o.next=t}else a=o=t;n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function mo(e,t,n,r){var a=e.updateQueue;Bt=!1;var o=a.firstBaseUpdate,l=a.lastBaseUpdate,i=a.shared.pending;if(i!==null){a.shared.pending=null;var s=i,u=s.next;s.next=null,l===null?o=u:l.next=u,l=s;var m=e.alternate;m!==null&&(m=m.updateQueue,i=m.lastBaseUpdate,i!==l&&(i===null?m.firstBaseUpdate=u:i.next=u,m.lastBaseUpdate=s))}if(o!==null){var v=a.baseState;l=0,m=u=s=null,i=o;do{var h=i.lane,E=i.eventTime;if((r&h)===h){m!==null&&(m=m.next={eventTime:E,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null});e:{var S=e,w=i;switch(h=t,E=n,w.tag){case 1:if(S=w.payload,typeof S=="function"){v=S.call(E,v,h);break e}v=S;break e;case 3:S.flags=S.flags&-65537|128;case 0:if(S=w.payload,h=typeof S=="function"?S.call(E,v,h):S,h==null)break e;v=ce({},v,h);break e;case 2:Bt=!0}}i.callback!==null&&i.lane!==0&&(e.flags|=64,h=a.effects,h===null?a.effects=[i]:h.push(i))}else E={eventTime:E,lane:h,tag:i.tag,payload:i.payload,callback:i.callback,next:null},m===null?(u=m=E,s=v):m=m.next=E,l|=h;if(i=i.next,i===null){if(i=a.shared.pending,i===null)break;h=i,i=h.next,h.next=null,a.lastBaseUpdate=h,a.shared.pending=null}}while(!0);if(m===null&&(s=v),a.baseState=s,a.firstBaseUpdate=u,a.lastBaseUpdate=m,t=a.shared.interleaved,t!==null){a=t;do l|=a.lane,a=a.next;while(a!==t)}else o===null&&(a.shared.lanes=0);kn|=l,e.lanes=l,e.memoizedState=v}}function Bu(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(a!==null){if(r.callback=null,r=n,typeof a!="function")throw Error(R(191,a));a.call(r)}}}var oa={},kt=an(oa),Gr=an(oa),Xr=an(oa);function gn(e){if(e===oa)throw Error(R(174));return e}function Yi(e,t){switch(ne(Xr,t),ne(Gr,e),ne(kt,oa),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Bl(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Bl(t,e)}oe(kt),ne(kt,t)}function rr(){oe(kt),oe(Gr),oe(Xr)}function md(e){gn(Xr.current);var t=gn(kt.current),n=Bl(t,e.type);t!==n&&(ne(Gr,e),ne(kt,n))}function Gi(e){Gr.current===e&&(oe(kt),oe(Gr))}var se=an(0);function ho(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var $l=[];function Xi(){for(var e=0;e<$l.length;e++)$l[e]._workInProgressVersionPrimary=null;$l.length=0}var Ka=Ot.ReactCurrentDispatcher,Rl=Ot.ReactCurrentBatchConfig,En=0,ue=null,ge=null,Ne=null,vo=!1,Or=!1,qr=0,eh=0;function Ce(){throw Error(R(321))}function qi(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!mt(e[n],t[n]))return!1;return!0}function Zi(e,t,n,r,a,o){if(En=o,ue=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ka.current=e===null||e.memoizedState===null?ah:oh,e=n(r,a),Or){o=0;do{if(Or=!1,qr=0,25<=o)throw Error(R(301));o+=1,Ne=ge=null,t.updateQueue=null,Ka.current=lh,e=n(r,a)}while(Or)}if(Ka.current=yo,t=ge!==null&&ge.next!==null,En=0,Ne=ge=ue=null,vo=!1,t)throw Error(R(300));return e}function es(){var e=qr!==0;return qr=0,e}function wt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ne===null?ue.memoizedState=Ne=e:Ne=Ne.next=e,Ne}function at(){if(ge===null){var e=ue.alternate;e=e!==null?e.memoizedState:null}else e=ge.next;var t=Ne===null?ue.memoizedState:Ne.next;if(t!==null)Ne=t,ge=e;else{if(e===null)throw Error(R(310));ge=e,e={memoizedState:ge.memoizedState,baseState:ge.baseState,baseQueue:ge.baseQueue,queue:ge.queue,next:null},Ne===null?ue.memoizedState=Ne=e:Ne=Ne.next=e}return Ne}function Zr(e,t){return typeof t=="function"?t(e):t}function bl(e){var t=at(),n=t.queue;if(n===null)throw Error(R(311));n.lastRenderedReducer=e;var r=ge,a=r.baseQueue,o=n.pending;if(o!==null){if(a!==null){var l=a.next;a.next=o.next,o.next=l}r.baseQueue=a=o,n.pending=null}if(a!==null){o=a.next,r=r.baseState;var i=l=null,s=null,u=o;do{var m=u.lane;if((En&m)===m)s!==null&&(s=s.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var v={lane:m,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};s===null?(i=s=v,l=r):s=s.next=v,ue.lanes|=m,kn|=m}u=u.next}while(u!==null&&u!==o);s===null?l=r:s.next=i,mt(r,t.memoizedState)||(ze=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){a=e;do o=a.lane,ue.lanes|=o,kn|=o,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Cl(e){var t=at(),n=t.queue;if(n===null)throw Error(R(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var l=a=a.next;do o=e(o,l.action),l=l.next;while(l!==a);mt(o,t.memoizedState)||(ze=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function hd(){}function vd(e,t){var n=ue,r=at(),a=t(),o=!mt(r.memoizedState,a);if(o&&(r.memoizedState=a,ze=!0),r=r.queue,ts(_d.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||Ne!==null&&Ne.memoizedState.tag&1){if(n.flags|=2048,ea(9,gd.bind(null,n,r,a,t),void 0,null),we===null)throw Error(R(349));(En&30)!==0||yd(n,t,a)}return a}function yd(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ue.updateQueue,t===null?(t={lastEffect:null,stores:null},ue.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function gd(e,t,n,r){t.value=n,t.getSnapshot=r,Nd(t)&&wd(e)}function _d(e,t,n){return n(function(){Nd(t)&&wd(e)})}function Nd(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!mt(e,n)}catch{return!0}}function wd(e){var t=Ft(e,1);t!==null&&pt(t,e,1,-1)}function Vu(e){var t=wt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Zr,lastRenderedState:e},t.queue=e,e=e.dispatch=rh.bind(null,ue,e),[t.memoizedState,e]}function ea(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ue.updateQueue,t===null?(t={lastEffect:null,stores:null},ue.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Sd(){return at().memoizedState}function Ja(e,t,n,r){var a=wt();ue.flags|=e,a.memoizedState=ea(1|t,n,void 0,r===void 0?null:r)}function xo(e,t,n,r){var a=at();r=r===void 0?null:r;var o=void 0;if(ge!==null){var l=ge.memoizedState;if(o=l.destroy,r!==null&&qi(r,l.deps)){a.memoizedState=ea(t,n,o,r);return}}ue.flags|=e,a.memoizedState=ea(1|t,n,o,r)}function Hu(e,t){return Ja(8390656,8,e,t)}function ts(e,t){return xo(2048,8,e,t)}function Ed(e,t){return xo(4,2,e,t)}function kd(e,t){return xo(4,4,e,t)}function $d(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Rd(e,t,n){return n=n!=null?n.concat([e]):null,xo(4,4,$d.bind(null,t,e),n)}function ns(){}function bd(e,t){var n=at();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&qi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Cd(e,t){var n=at();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&qi(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function xd(e,t,n){return(En&21)===0?(e.baseState&&(e.baseState=!1,ze=!0),e.memoizedState=n):(mt(n,t)||(n=Lc(),ue.lanes|=n,kn|=n,e.baseState=!0),t)}function th(e,t){var n=q;q=n!==0&&4>n?n:4,e(!0);var r=Rl.transition;Rl.transition={};try{e(!1),t()}finally{q=n,Rl.transition=r}}function Pd(){return at().memoizedState}function nh(e,t,n){var r=Zt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Td(e))Dd(t,n);else if(n=fd(e,t,n,r),n!==null){var a=Ae();pt(n,e,r,a),Fd(n,t,r)}}function rh(e,t,n){var r=Zt(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Td(e))Dd(t,a);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var l=t.lastRenderedState,i=o(l,n);if(a.hasEagerState=!0,a.eagerState=i,mt(i,l)){var s=t.interleaved;s===null?(a.next=a,Ji(t)):(a.next=s.next,s.next=a),t.interleaved=a;return}}catch{}finally{}n=fd(e,t,a,r),n!==null&&(a=Ae(),pt(n,e,r,a),Fd(n,t,r))}}function Td(e){var t=e.alternate;return e===ue||t!==null&&t===ue}function Dd(e,t){Or=vo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Fd(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Fi(e,n)}}var yo={readContext:rt,useCallback:Ce,useContext:Ce,useEffect:Ce,useImperativeHandle:Ce,useInsertionEffect:Ce,useLayoutEffect:Ce,useMemo:Ce,useReducer:Ce,useRef:Ce,useState:Ce,useDebugValue:Ce,useDeferredValue:Ce,useTransition:Ce,useMutableSource:Ce,useSyncExternalStore:Ce,useId:Ce,unstable_isNewReconciler:!1},ah={readContext:rt,useCallback:function(e,t){return wt().memoizedState=[e,t===void 0?null:t],e},useContext:rt,useEffect:Hu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Ja(4194308,4,$d.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ja(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ja(4,2,e,t)},useMemo:function(e,t){var n=wt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=wt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=nh.bind(null,ue,e),[r.memoizedState,e]},useRef:function(e){var t=wt();return e={current:e},t.memoizedState=e},useState:Vu,useDebugValue:ns,useDeferredValue:function(e){return wt().memoizedState=e},useTransition:function(){var e=Vu(!1),t=e[0];return e=th.bind(null,e[1]),wt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ue,a=wt();if(ie){if(n===void 0)throw Error(R(407));n=n()}else{if(n=t(),we===null)throw Error(R(349));(En&30)!==0||yd(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Hu(_d.bind(null,r,o,e),[e]),r.flags|=2048,ea(9,gd.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=wt(),t=we.identifierPrefix;if(ie){var n=xt,r=Ct;n=(r&~(1<<32-ft(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=qr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=eh++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},oh={readContext:rt,useCallback:bd,useContext:rt,useEffect:ts,useImperativeHandle:Rd,useInsertionEffect:Ed,useLayoutEffect:kd,useMemo:Cd,useReducer:bl,useRef:Sd,useState:function(){return bl(Zr)},useDebugValue:ns,useDeferredValue:function(e){var t=at();return xd(t,ge.memoizedState,e)},useTransition:function(){var e=bl(Zr)[0],t=at().memoizedState;return[e,t]},useMutableSource:hd,useSyncExternalStore:vd,useId:Pd,unstable_isNewReconciler:!1},lh={readContext:rt,useCallback:bd,useContext:rt,useEffect:ts,useImperativeHandle:Rd,useInsertionEffect:Ed,useLayoutEffect:kd,useMemo:Cd,useReducer:Cl,useRef:Sd,useState:function(){return Cl(Zr)},useDebugValue:ns,useDeferredValue:function(e){var t=at();return ge===null?t.memoizedState=e:xd(t,ge.memoizedState,e)},useTransition:function(){var e=Cl(Zr)[0],t=at().memoizedState;return[e,t]},useMutableSource:hd,useSyncExternalStore:vd,useId:Pd,unstable_isNewReconciler:!1};function ut(e,t){if(e&&e.defaultProps){t=ce({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ui(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:ce({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Po={isMounted:function(e){return(e=e._reactInternals)?bn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ae(),a=Zt(e),o=Pt(r,a);o.payload=t,n!=null&&(o.callback=n),t=Xt(e,o,a),t!==null&&(pt(t,e,a,r),Wa(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ae(),a=Zt(e),o=Pt(r,a);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Xt(e,o,a),t!==null&&(pt(t,e,a,r),Wa(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ae(),r=Zt(e),a=Pt(n,r);a.tag=2,t!=null&&(a.callback=t),t=Xt(e,a,r),t!==null&&(pt(t,e,r,n),Wa(t,e,r))}};function Wu(e,t,n,r,a,o,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,l):t.prototype&&t.prototype.isPureReactComponent?!Kr(n,r)||!Kr(a,o):!0}function Ld(e,t,n){var r=!1,a=nn,o=t.contextType;return typeof o=="object"&&o!==null?o=rt(o):(a=Ve(t)?wn:Te.current,r=t.contextTypes,o=(r=r!=null)?er(e,a):nn),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Po,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=o),t}function Ku(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Po.enqueueReplaceState(t,t.state,null)}function ci(e,t,n,r){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},Qi(e);var o=t.contextType;typeof o=="object"&&o!==null?a.context=rt(o):(o=Ve(t)?wn:Te.current,a.context=er(e,o)),a.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(ui(e,t,o,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&Po.enqueueReplaceState(a,a.state,null),mo(e,n,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function ar(e,t){try{var n="",r=t;do n+=jp(r),r=r.return;while(r);var a=n}catch(o){a=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:a,digest:null}}function xl(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function di(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var ih=typeof WeakMap=="function"?WeakMap:Map;function Od(e,t,n){n=Pt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){_o||(_o=!0,wi=r),di(e,t)},n}function jd(e,t,n){n=Pt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var a=t.value;n.payload=function(){return r(a)},n.callback=function(){di(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){di(e,t),typeof r!="function"&&(qt===null?qt=new Set([this]):qt.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function Ju(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new ih;var a=new Set;r.set(t,a)}else a=r.get(t),a===void 0&&(a=new Set,r.set(t,a));a.has(n)||(a.add(n),e=wh.bind(null,e,t,n),t.then(e,e))}function Qu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Yu(e,t,n,r,a){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Pt(-1,1),t.tag=2,Xt(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=a,e)}var sh=Ot.ReactCurrentOwner,ze=!1;function je(e,t,n,r){t.child=e===null?dd(t,null,n,r):nr(t,e.child,n,r)}function Gu(e,t,n,r,a){n=n.render;var o=t.ref;return Xn(t,a),r=Zi(e,t,n,r,o,a),n=es(),e!==null&&!ze?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Lt(e,t,a)):(ie&&n&&zi(t),t.flags|=1,je(e,t,r,a),t.child)}function Xu(e,t,n,r,a){if(e===null){var o=n.type;return typeof o=="function"&&!cs(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Ad(e,t,o,r,a)):(e=Xa(n.type,null,r,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,(e.lanes&a)===0){var l=o.memoizedProps;if(n=n.compare,n=n!==null?n:Kr,n(l,r)&&e.ref===t.ref)return Lt(e,t,a)}return t.flags|=1,e=en(o,r),e.ref=t.ref,e.return=t,t.child=e}function Ad(e,t,n,r,a){if(e!==null){var o=e.memoizedProps;if(Kr(o,r)&&e.ref===t.ref)if(ze=!1,t.pendingProps=r=o,(e.lanes&a)!==0)(e.flags&131072)!==0&&(ze=!0);else return t.lanes=e.lanes,Lt(e,t,a)}return fi(e,t,n,r,a)}function Id(e,t,n){var r=t.pendingProps,a=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ne(Kn,We),We|=n;else{if((n&1073741824)===0)return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ne(Kn,We),We|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,ne(Kn,We),We|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,ne(Kn,We),We|=r;return je(e,t,a,n),t.child}function Ud(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function fi(e,t,n,r,a){var o=Ve(n)?wn:Te.current;return o=er(t,o),Xn(t,a),n=Zi(e,t,n,r,o,a),r=es(),e!==null&&!ze?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Lt(e,t,a)):(ie&&r&&zi(t),t.flags|=1,je(e,t,n,a),t.child)}function qu(e,t,n,r,a){if(Ve(n)){var o=!0;so(t)}else o=!1;if(Xn(t,a),t.stateNode===null)Qa(e,t),Ld(t,n,r),ci(t,n,r,a),r=!0;else if(e===null){var l=t.stateNode,i=t.memoizedProps;l.props=i;var s=l.context,u=n.contextType;typeof u=="object"&&u!==null?u=rt(u):(u=Ve(n)?wn:Te.current,u=er(t,u));var m=n.getDerivedStateFromProps,v=typeof m=="function"||typeof l.getSnapshotBeforeUpdate=="function";v||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==r||s!==u)&&Ku(t,l,r,u),Bt=!1;var h=t.memoizedState;l.state=h,mo(t,r,l,a),s=t.memoizedState,i!==r||h!==s||Be.current||Bt?(typeof m=="function"&&(ui(t,n,m,r),s=t.memoizedState),(i=Bt||Wu(t,n,i,r,h,s,u))?(v||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),l.props=r,l.state=s,l.context=u,r=i):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,pd(e,t),i=t.memoizedProps,u=t.type===t.elementType?i:ut(t.type,i),l.props=u,v=t.pendingProps,h=l.context,s=n.contextType,typeof s=="object"&&s!==null?s=rt(s):(s=Ve(n)?wn:Te.current,s=er(t,s));var E=n.getDerivedStateFromProps;(m=typeof E=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==v||h!==s)&&Ku(t,l,r,s),Bt=!1,h=t.memoizedState,l.state=h,mo(t,r,l,a);var S=t.memoizedState;i!==v||h!==S||Be.current||Bt?(typeof E=="function"&&(ui(t,n,E,r),S=t.memoizedState),(u=Bt||Wu(t,n,u,r,h,S,s)||!1)?(m||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,S,s),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,S,s)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||i===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=S),l.props=r,l.state=S,l.context=s,r=u):(typeof l.componentDidUpdate!="function"||i===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),r=!1)}return pi(e,t,n,r,o,a)}function pi(e,t,n,r,a,o){Ud(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return a&&Au(t,n,!1),Lt(e,t,o);r=t.stateNode,sh.current=t;var i=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=nr(t,e.child,null,o),t.child=nr(t,null,i,o)):je(e,t,i,o),t.memoizedState=r.state,a&&Au(t,n,!0),t.child}function Md(e){var t=e.stateNode;t.pendingContext?ju(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ju(e,t.context,!1),Yi(e,t.containerInfo)}function Zu(e,t,n,r,a){return tr(),Vi(a),t.flags|=256,je(e,t,n,r),t.child}var mi={dehydrated:null,treeContext:null,retryLane:0};function hi(e){return{baseLanes:e,cachePool:null,transitions:null}}function zd(e,t,n){var r=t.pendingProps,a=se.current,o=!1,l=(t.flags&128)!==0,i;if((i=l)||(i=e!==null&&e.memoizedState===null?!1:(a&2)!==0),i?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),ne(se,a&1),e===null)return ii(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(l=r.children,e=r.fallback,o?(r=t.mode,o=t.child,l={mode:"hidden",children:l},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=l):o=Fo(l,r,0,null),e=Nn(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=hi(n),t.memoizedState=mi,e):rs(t,l));if(a=e.memoizedState,a!==null&&(i=a.dehydrated,i!==null))return uh(e,t,l,r,i,a,n);if(o){o=r.fallback,l=t.mode,a=e.child,i=a.sibling;var s={mode:"hidden",children:r.children};return(l&1)===0&&t.child!==a?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=en(a,s),r.subtreeFlags=a.subtreeFlags&14680064),i!==null?o=en(i,o):(o=Nn(o,l,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,l=e.child.memoizedState,l=l===null?hi(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},o.memoizedState=l,o.childLanes=e.childLanes&~n,t.memoizedState=mi,r}return o=e.child,e=o.sibling,r=en(o,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function rs(e,t){return t=Fo({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ua(e,t,n,r){return r!==null&&Vi(r),nr(t,e.child,null,n),e=rs(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function uh(e,t,n,r,a,o,l){if(n)return t.flags&256?(t.flags&=-257,r=xl(Error(R(422))),Ua(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,a=t.mode,r=Fo({mode:"visible",children:r.children},a,0,null),o=Nn(o,a,l,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,(t.mode&1)!==0&&nr(t,e.child,null,l),t.child.memoizedState=hi(l),t.memoizedState=mi,o);if((t.mode&1)===0)return Ua(e,t,l,null);if(a.data==="$!"){if(r=a.nextSibling&&a.nextSibling.dataset,r)var i=r.dgst;return r=i,o=Error(R(419)),r=xl(o,r,void 0),Ua(e,t,l,r)}if(i=(l&e.childLanes)!==0,ze||i){if(r=we,r!==null){switch(l&-l){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(r.suspendedLanes|l))!==0?0:a,a!==0&&a!==o.retryLane&&(o.retryLane=a,Ft(e,a),pt(r,e,a,-1))}return us(),r=xl(Error(R(421))),Ua(e,t,l,r)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Sh.bind(null,e),a._reactRetry=t,null):(e=o.treeContext,Ke=Gt(a.nextSibling),Je=t,ie=!0,dt=null,e!==null&&(Ze[et++]=Ct,Ze[et++]=xt,Ze[et++]=Sn,Ct=e.id,xt=e.overflow,Sn=t),t=rs(t,r.children),t.flags|=4096,t)}function ec(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),si(e.return,t,n)}function Pl(e,t,n,r,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=a)}function Bd(e,t,n){var r=t.pendingProps,a=r.revealOrder,o=r.tail;if(je(e,t,r.children,n),r=se.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ec(e,n,t);else if(e.tag===19)ec(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ne(se,r),(t.mode&1)===0)t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&ho(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Pl(t,!1,a,n,o);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&ho(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Pl(t,!0,n,null,o);break;case"together":Pl(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Qa(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Lt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),kn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(R(153));if(t.child!==null){for(e=t.child,n=en(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=en(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ch(e,t,n){switch(t.tag){case 3:Md(t),tr();break;case 5:md(t);break;case 1:Ve(t.type)&&so(t);break;case 4:Yi(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,a=t.memoizedProps.value;ne(fo,r._currentValue),r._currentValue=a;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ne(se,se.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?zd(e,t,n):(ne(se,se.current&1),e=Lt(e,t,n),e!==null?e.sibling:null);ne(se,se.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Bd(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),ne(se,se.current),r)break;return null;case 22:case 23:return t.lanes=0,Id(e,t,n)}return Lt(e,t,n)}var Vd,vi,Hd,Wd;Vd=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};vi=function(){};Hd=function(e,t,n,r){var a=e.memoizedProps;if(a!==r){e=t.stateNode,gn(kt.current);var o=null;switch(n){case"input":a=Il(e,a),r=Il(e,r),o=[];break;case"select":a=ce({},a,{value:void 0}),r=ce({},r,{value:void 0}),o=[];break;case"textarea":a=zl(e,a),r=zl(e,r),o=[];break;default:typeof a.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=lo)}Vl(n,r);var l;n=null;for(u in a)if(!r.hasOwnProperty(u)&&a.hasOwnProperty(u)&&a[u]!=null)if(u==="style"){var i=a[u];for(l in i)i.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Ur.hasOwnProperty(u)?o||(o=[]):(o=o||[]).push(u,null));for(u in r){var s=r[u];if(i=a?.[u],r.hasOwnProperty(u)&&s!==i&&(s!=null||i!=null))if(u==="style")if(i){for(l in i)!i.hasOwnProperty(l)||s&&s.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in s)s.hasOwnProperty(l)&&i[l]!==s[l]&&(n||(n={}),n[l]=s[l])}else n||(o||(o=[]),o.push(u,n)),n=s;else u==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,i=i?i.__html:void 0,s!=null&&i!==s&&(o=o||[]).push(u,s)):u==="children"?typeof s!="string"&&typeof s!="number"||(o=o||[]).push(u,""+s):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Ur.hasOwnProperty(u)?(s!=null&&u==="onScroll"&&ae("scroll",e),o||i===s||(o=[])):(o=o||[]).push(u,s))}n&&(o=o||[]).push("style",n);var u=o;(t.updateQueue=u)&&(t.flags|=4)}};Wd=function(e,t,n,r){n!==r&&(t.flags|=4)};function Er(e,t){if(!ie)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function xe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags&14680064,r|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function dh(e,t,n){var r=t.pendingProps;switch(Bi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return xe(t),null;case 1:return Ve(t.type)&&io(),xe(t),null;case 3:return r=t.stateNode,rr(),oe(Be),oe(Te),Xi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Aa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,dt!==null&&(ki(dt),dt=null))),vi(e,t),xe(t),null;case 5:Gi(t);var a=gn(Xr.current);if(n=t.type,e!==null&&t.stateNode!=null)Hd(e,t,n,r,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(R(166));return xe(t),null}if(e=gn(kt.current),Aa(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[St]=t,r[Yr]=o,e=(t.mode&1)!==0,n){case"dialog":ae("cancel",r),ae("close",r);break;case"iframe":case"object":case"embed":ae("load",r);break;case"video":case"audio":for(a=0;a<xr.length;a++)ae(xr[a],r);break;case"source":ae("error",r);break;case"img":case"image":case"link":ae("error",r),ae("load",r);break;case"details":ae("toggle",r);break;case"input":su(r,o),ae("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},ae("invalid",r);break;case"textarea":cu(r,o),ae("invalid",r)}Vl(n,o),a=null;for(var l in o)if(o.hasOwnProperty(l)){var i=o[l];l==="children"?typeof i=="string"?r.textContent!==i&&(o.suppressHydrationWarning!==!0&&ja(r.textContent,i,e),a=["children",i]):typeof i=="number"&&r.textContent!==""+i&&(o.suppressHydrationWarning!==!0&&ja(r.textContent,i,e),a=["children",""+i]):Ur.hasOwnProperty(l)&&i!=null&&l==="onScroll"&&ae("scroll",r)}switch(n){case"input":ka(r),uu(r,o,!0);break;case"textarea":ka(r),du(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=lo)}r=a,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=_c(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),n==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[St]=t,e[Yr]=r,Vd(e,t,!1,!1),t.stateNode=e;e:{switch(l=Hl(n,r),n){case"dialog":ae("cancel",e),ae("close",e),a=r;break;case"iframe":case"object":case"embed":ae("load",e),a=r;break;case"video":case"audio":for(a=0;a<xr.length;a++)ae(xr[a],e);a=r;break;case"source":ae("error",e),a=r;break;case"img":case"image":case"link":ae("error",e),ae("load",e),a=r;break;case"details":ae("toggle",e),a=r;break;case"input":su(e,r),a=Il(e,r),ae("invalid",e);break;case"option":a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=ce({},r,{value:void 0}),ae("invalid",e);break;case"textarea":cu(e,r),a=zl(e,r),ae("invalid",e);break;default:a=r}Vl(n,a),i=a;for(o in i)if(i.hasOwnProperty(o)){var s=i[o];o==="style"?Sc(e,s):o==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Nc(e,s)):o==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&Mr(e,s):typeof s=="number"&&Mr(e,""+s):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Ur.hasOwnProperty(o)?s!=null&&o==="onScroll"&&ae("scroll",e):s!=null&&bi(e,o,s,l))}switch(n){case"input":ka(e),uu(e,r,!1);break;case"textarea":ka(e),du(e);break;case"option":r.value!=null&&e.setAttribute("value",""+tn(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?Jn(e,!!r.multiple,o,!1):r.defaultValue!=null&&Jn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=lo)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return xe(t),null;case 6:if(e&&t.stateNode!=null)Wd(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(R(166));if(n=gn(Xr.current),gn(kt.current),Aa(t)){if(r=t.stateNode,n=t.memoizedProps,r[St]=t,(o=r.nodeValue!==n)&&(e=Je,e!==null))switch(e.tag){case 3:ja(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ja(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[St]=t,t.stateNode=r}return xe(t),null;case 13:if(oe(se),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ie&&Ke!==null&&(t.mode&1)!==0&&(t.flags&128)===0)ud(),tr(),t.flags|=98560,o=!1;else if(o=Aa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(R(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(R(317));o[St]=t}else tr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;xe(t),o=!1}else dt!==null&&(ki(dt),dt=null),o=!0;if(!o)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(se.current&1)!==0?_e===0&&(_e=3):us())),t.updateQueue!==null&&(t.flags|=4),xe(t),null);case 4:return rr(),vi(e,t),e===null&&Jr(t.stateNode.containerInfo),xe(t),null;case 10:return Ki(t.type._context),xe(t),null;case 17:return Ve(t.type)&&io(),xe(t),null;case 19:if(oe(se),o=t.memoizedState,o===null)return xe(t),null;if(r=(t.flags&128)!==0,l=o.rendering,l===null)if(r)Er(o,!1);else{if(_e!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(l=ho(e),l!==null){for(t.flags|=128,Er(o,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,l=o.alternate,l===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=l.childLanes,o.lanes=l.lanes,o.child=l.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=l.memoizedProps,o.memoizedState=l.memoizedState,o.updateQueue=l.updateQueue,o.type=l.type,e=l.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ne(se,se.current&1|2),t.child}e=e.sibling}o.tail!==null&&he()>or&&(t.flags|=128,r=!0,Er(o,!1),t.lanes=4194304)}else{if(!r)if(e=ho(l),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Er(o,!0),o.tail===null&&o.tailMode==="hidden"&&!l.alternate&&!ie)return xe(t),null}else 2*he()-o.renderingStartTime>or&&n!==1073741824&&(t.flags|=128,r=!0,Er(o,!1),t.lanes=4194304);o.isBackwards?(l.sibling=t.child,t.child=l):(n=o.last,n!==null?n.sibling=l:t.child=l,o.last=l)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=he(),t.sibling=null,n=se.current,ne(se,r?n&1|2:n&1),t):(xe(t),null);case 22:case 23:return ss(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(We&1073741824)!==0&&(xe(t),t.subtreeFlags&6&&(t.flags|=8192)):xe(t),null;case 24:return null;case 25:return null}throw Error(R(156,t.tag))}function fh(e,t){switch(Bi(t),t.tag){case 1:return Ve(t.type)&&io(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return rr(),oe(Be),oe(Te),Xi(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Gi(t),null;case 13:if(oe(se),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(R(340));tr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return oe(se),null;case 4:return rr(),null;case 10:return Ki(t.type._context),null;case 22:case 23:return ss(),null;case 24:return null;default:return null}}var Ma=!1,Pe=!1,ph=typeof WeakSet=="function"?WeakSet:Set,F=null;function Wn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){fe(e,t,r)}else n.current=null}function yi(e,t,n){try{n()}catch(r){fe(e,t,r)}}var tc=!1;function mh(e,t){if(ei=ro,e=Gc(),Mi(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var l=0,i=-1,s=-1,u=0,m=0,v=e,h=null;t:for(;;){for(var E;v!==n||a!==0&&v.nodeType!==3||(i=l+a),v!==o||r!==0&&v.nodeType!==3||(s=l+r),v.nodeType===3&&(l+=v.nodeValue.length),(E=v.firstChild)!==null;)h=v,v=E;for(;;){if(v===e)break t;if(h===n&&++u===a&&(i=l),h===o&&++m===r&&(s=l),(E=v.nextSibling)!==null)break;v=h,h=v.parentNode}v=E}n=i===-1||s===-1?null:{start:i,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(ti={focusedElem:e,selectionRange:n},ro=!1,F=t;F!==null;)if(t=F,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,F=e;else for(;F!==null;){t=F;try{var S=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(S!==null){var w=S.memoizedProps,N=S.memoizedState,d=t.stateNode,c=d.getSnapshotBeforeUpdate(t.elementType===t.type?w:ut(t.type,w),N);d.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(R(163))}}catch(g){fe(t,t.return,g)}if(e=t.sibling,e!==null){e.return=t.return,F=e;break}F=t.return}return S=tc,tc=!1,S}function jr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var o=a.destroy;a.destroy=void 0,o!==void 0&&yi(t,n,o)}a=a.next}while(a!==r)}}function To(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function gi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Kd(e){var t=e.alternate;t!==null&&(e.alternate=null,Kd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[St],delete t[Yr],delete t[ai],delete t[Gm],delete t[Xm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Jd(e){return e.tag===5||e.tag===3||e.tag===4}function nc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Jd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function _i(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=lo));else if(r!==4&&(e=e.child,e!==null))for(_i(e,t,n),e=e.sibling;e!==null;)_i(e,t,n),e=e.sibling}function Ni(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ni(e,t,n),e=e.sibling;e!==null;)Ni(e,t,n),e=e.sibling}var Ee=null,ct=!1;function Mt(e,t,n){for(n=n.child;n!==null;)Qd(e,t,n),n=n.sibling}function Qd(e,t,n){if(Et&&typeof Et.onCommitFiberUnmount=="function")try{Et.onCommitFiberUnmount(Eo,n)}catch{}switch(n.tag){case 5:Pe||Wn(n,t);case 6:var r=Ee,a=ct;Ee=null,Mt(e,t,n),Ee=r,ct=a,Ee!==null&&(ct?(e=Ee,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ee.removeChild(n.stateNode));break;case 18:Ee!==null&&(ct?(e=Ee,n=n.stateNode,e.nodeType===8?El(e.parentNode,n):e.nodeType===1&&El(e,n),Hr(e)):El(Ee,n.stateNode));break;case 4:r=Ee,a=ct,Ee=n.stateNode.containerInfo,ct=!0,Mt(e,t,n),Ee=r,ct=a;break;case 0:case 11:case 14:case 15:if(!Pe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){a=r=r.next;do{var o=a,l=o.destroy;o=o.tag,l!==void 0&&((o&2)!==0||(o&4)!==0)&&yi(n,t,l),a=a.next}while(a!==r)}Mt(e,t,n);break;case 1:if(!Pe&&(Wn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(i){fe(n,t,i)}Mt(e,t,n);break;case 21:Mt(e,t,n);break;case 22:n.mode&1?(Pe=(r=Pe)||n.memoizedState!==null,Mt(e,t,n),Pe=r):Mt(e,t,n);break;default:Mt(e,t,n)}}function rc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new ph),t.forEach(function(r){var a=Eh.bind(null,e,r);n.has(r)||(n.add(r),r.then(a,a))})}}function st(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r];try{var o=e,l=t,i=l;e:for(;i!==null;){switch(i.tag){case 5:Ee=i.stateNode,ct=!1;break e;case 3:Ee=i.stateNode.containerInfo,ct=!0;break e;case 4:Ee=i.stateNode.containerInfo,ct=!0;break e}i=i.return}if(Ee===null)throw Error(R(160));Qd(o,l,a),Ee=null,ct=!1;var s=a.alternate;s!==null&&(s.return=null),a.return=null}catch(u){fe(a,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Yd(t,e),t=t.sibling}function Yd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(st(t,e),Nt(e),r&4){try{jr(3,e,e.return),To(3,e)}catch(w){fe(e,e.return,w)}try{jr(5,e,e.return)}catch(w){fe(e,e.return,w)}}break;case 1:st(t,e),Nt(e),r&512&&n!==null&&Wn(n,n.return);break;case 5:if(st(t,e),Nt(e),r&512&&n!==null&&Wn(n,n.return),e.flags&32){var a=e.stateNode;try{Mr(a,"")}catch(w){fe(e,e.return,w)}}if(r&4&&(a=e.stateNode,a!=null)){var o=e.memoizedProps,l=n!==null?n.memoizedProps:o,i=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{i==="input"&&o.type==="radio"&&o.name!=null&&yc(a,o),Hl(i,l);var u=Hl(i,o);for(l=0;l<s.length;l+=2){var m=s[l],v=s[l+1];m==="style"?Sc(a,v):m==="dangerouslySetInnerHTML"?Nc(a,v):m==="children"?Mr(a,v):bi(a,m,v,u)}switch(i){case"input":Ul(a,o);break;case"textarea":gc(a,o);break;case"select":var h=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!o.multiple;var E=o.value;E!=null?Jn(a,!!o.multiple,E,!1):h!==!!o.multiple&&(o.defaultValue!=null?Jn(a,!!o.multiple,o.defaultValue,!0):Jn(a,!!o.multiple,o.multiple?[]:"",!1))}a[Yr]=o}catch(w){fe(e,e.return,w)}}break;case 6:if(st(t,e),Nt(e),r&4){if(e.stateNode===null)throw Error(R(162));a=e.stateNode,o=e.memoizedProps;try{a.nodeValue=o}catch(w){fe(e,e.return,w)}}break;case 3:if(st(t,e),Nt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Hr(t.containerInfo)}catch(w){fe(e,e.return,w)}break;case 4:st(t,e),Nt(e);break;case 13:st(t,e),Nt(e),a=e.child,a.flags&8192&&(o=a.memoizedState!==null,a.stateNode.isHidden=o,!o||a.alternate!==null&&a.alternate.memoizedState!==null||(ls=he())),r&4&&rc(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(Pe=(u=Pe)||m,st(t,e),Pe=u):st(t,e),Nt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!m&&(e.mode&1)!==0)for(F=e,m=e.child;m!==null;){for(v=F=m;F!==null;){switch(h=F,E=h.child,h.tag){case 0:case 11:case 14:case 15:jr(4,h,h.return);break;case 1:Wn(h,h.return);var S=h.stateNode;if(typeof S.componentWillUnmount=="function"){r=h,n=h.return;try{t=r,S.props=t.memoizedProps,S.state=t.memoizedState,S.componentWillUnmount()}catch(w){fe(r,n,w)}}break;case 5:Wn(h,h.return);break;case 22:if(h.memoizedState!==null){oc(v);continue}}E!==null?(E.return=h,F=E):oc(v)}m=m.sibling}e:for(m=null,v=e;;){if(v.tag===5){if(m===null){m=v;try{a=v.stateNode,u?(o=a.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(i=v.stateNode,s=v.memoizedProps.style,l=s!=null&&s.hasOwnProperty("display")?s.display:null,i.style.display=wc("display",l))}catch(w){fe(e,e.return,w)}}}else if(v.tag===6){if(m===null)try{v.stateNode.nodeValue=u?"":v.memoizedProps}catch(w){fe(e,e.return,w)}}else if((v.tag!==22&&v.tag!==23||v.memoizedState===null||v===e)&&v.child!==null){v.child.return=v,v=v.child;continue}if(v===e)break e;for(;v.sibling===null;){if(v.return===null||v.return===e)break e;m===v&&(m=null),v=v.return}m===v&&(m=null),v.sibling.return=v.return,v=v.sibling}}break;case 19:st(t,e),Nt(e),r&4&&rc(e);break;case 21:break;default:st(t,e),Nt(e)}}function Nt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Jd(n)){var r=n;break e}n=n.return}throw Error(R(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&(Mr(a,""),r.flags&=-33);var o=nc(e);Ni(e,o,a);break;case 3:case 4:var l=r.stateNode.containerInfo,i=nc(e);_i(e,i,l);break;default:throw Error(R(161))}}catch(s){fe(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function hh(e,t,n){F=e,Gd(e,t,n)}function Gd(e,t,n){for(var r=(e.mode&1)!==0;F!==null;){var a=F,o=a.child;if(a.tag===22&&r){var l=a.memoizedState!==null||Ma;if(!l){var i=a.alternate,s=i!==null&&i.memoizedState!==null||Pe;i=Ma;var u=Pe;if(Ma=l,(Pe=s)&&!u)for(F=a;F!==null;)l=F,s=l.child,l.tag===22&&l.memoizedState!==null?lc(a):s!==null?(s.return=l,F=s):lc(a);for(;o!==null;)F=o,Gd(o,t,n),o=o.sibling;F=a,Ma=i,Pe=u}ac(e,t,n)}else(a.subtreeFlags&8772)!==0&&o!==null?(o.return=a,F=o):ac(e,t,n)}}function ac(e){for(;F!==null;){var t=F;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Pe||To(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Pe)if(n===null)r.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:ut(t.type,n.memoizedProps);r.componentDidUpdate(a,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Bu(t,o,r);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Bu(t,l,n)}break;case 5:var i=t.stateNode;if(n===null&&t.flags&4){n=i;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var m=u.memoizedState;if(m!==null){var v=m.dehydrated;v!==null&&Hr(v)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(R(163))}Pe||t.flags&512&&gi(t)}catch(h){fe(t,t.return,h)}}if(t===e){F=null;break}if(n=t.sibling,n!==null){n.return=t.return,F=n;break}F=t.return}}function oc(e){for(;F!==null;){var t=F;if(t===e){F=null;break}var n=t.sibling;if(n!==null){n.return=t.return,F=n;break}F=t.return}}function lc(e){for(;F!==null;){var t=F;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{To(4,t)}catch(s){fe(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var a=t.return;try{r.componentDidMount()}catch(s){fe(t,a,s)}}var o=t.return;try{gi(t)}catch(s){fe(t,o,s)}break;case 5:var l=t.return;try{gi(t)}catch(s){fe(t,l,s)}}}catch(s){fe(t,t.return,s)}if(t===e){F=null;break}var i=t.sibling;if(i!==null){i.return=t.return,F=i;break}F=t.return}}var vh=Math.ceil,go=Ot.ReactCurrentDispatcher,as=Ot.ReactCurrentOwner,nt=Ot.ReactCurrentBatchConfig,K=0,we=null,ye=null,ke=0,We=0,Kn=an(0),_e=0,ta=null,kn=0,Do=0,os=0,Ar=null,Me=null,ls=0,or=1/0,Rt=null,_o=!1,wi=null,qt=null,za=!1,Kt=null,No=0,Ir=0,Si=null,Ya=-1,Ga=0;function Ae(){return(K&6)!==0?he():Ya!==-1?Ya:Ya=he()}function Zt(e){return(e.mode&1)===0?1:(K&2)!==0&&ke!==0?ke&-ke:Zm.transition!==null?(Ga===0&&(Ga=Lc()),Ga):(e=q,e!==0||(e=window.event,e=e===void 0?16:zc(e.type)),e)}function pt(e,t,n,r){if(50<Ir)throw Ir=0,Si=null,Error(R(185));na(e,n,r),((K&2)===0||e!==we)&&(e===we&&((K&2)===0&&(Do|=n),_e===4&&Ht(e,ke)),He(e,r),n===1&&K===0&&(t.mode&1)===0&&(or=he()+500,Co&&on()))}function He(e,t){var n=e.callbackNode;tm(e,t);var r=no(e,e===we?ke:0);if(r===0)n!==null&&mu(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&mu(n),t===1)e.tag===0?qm(ic.bind(null,e)):ld(ic.bind(null,e)),Qm(function(){(K&6)===0&&on()}),n=null;else{switch(Oc(r)){case 1:n=Di;break;case 4:n=Dc;break;case 16:n=to;break;case 536870912:n=Fc;break;default:n=to}n=af(n,Xd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Xd(e,t){if(Ya=-1,Ga=0,(K&6)!==0)throw Error(R(327));var n=e.callbackNode;if(qn()&&e.callbackNode!==n)return null;var r=no(e,e===we?ke:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=wo(e,r);else{t=r;var a=K;K|=2;var o=Zd();(we!==e||ke!==t)&&(Rt=null,or=he()+500,_n(e,t));do try{_h();break}catch(i){qd(e,i)}while(!0);Wi(),go.current=o,K=a,ye!==null?t=0:(we=null,ke=0,t=_e)}if(t!==0){if(t===2&&(a=Yl(e),a!==0&&(r=a,t=Ei(e,a))),t===1)throw n=ta,_n(e,0),Ht(e,r),He(e,he()),n;if(t===6)Ht(e,r);else{if(a=e.current.alternate,(r&30)===0&&!yh(a)&&(t=wo(e,r),t===2&&(o=Yl(e),o!==0&&(r=o,t=Ei(e,o))),t===1))throw n=ta,_n(e,0),Ht(e,r),He(e,he()),n;switch(e.finishedWork=a,e.finishedLanes=r,t){case 0:case 1:throw Error(R(345));case 2:hn(e,Me,Rt);break;case 3:if(Ht(e,r),(r&130023424)===r&&(t=ls+500-he(),10<t)){if(no(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){Ae(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=ri(hn.bind(null,e,Me,Rt),t);break}hn(e,Me,Rt);break;case 4:if(Ht(e,r),(r&4194240)===r)break;for(t=e.eventTimes,a=-1;0<r;){var l=31-ft(r);o=1<<l,l=t[l],l>a&&(a=l),r&=~o}if(r=a,r=he()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*vh(r/1960))-r,10<r){e.timeoutHandle=ri(hn.bind(null,e,Me,Rt),r);break}hn(e,Me,Rt);break;case 5:hn(e,Me,Rt);break;default:throw Error(R(329))}}}return He(e,he()),e.callbackNode===n?Xd.bind(null,e):null}function Ei(e,t){var n=Ar;return e.current.memoizedState.isDehydrated&&(_n(e,t).flags|=256),e=wo(e,t),e!==2&&(t=Me,Me=n,t!==null&&ki(t)),e}function ki(e){Me===null?Me=e:Me.push.apply(Me,e)}function yh(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var a=n[r],o=a.getSnapshot;a=a.value;try{if(!mt(o(),a))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ht(e,t){for(t&=~os,t&=~Do,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-ft(t),r=1<<n;e[n]=-1,t&=~r}}function ic(e){if((K&6)!==0)throw Error(R(327));qn();var t=no(e,0);if((t&1)===0)return He(e,he()),null;var n=wo(e,t);if(e.tag!==0&&n===2){var r=Yl(e);r!==0&&(t=r,n=Ei(e,r))}if(n===1)throw n=ta,_n(e,0),Ht(e,t),He(e,he()),n;if(n===6)throw Error(R(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,hn(e,Me,Rt),He(e,he()),null}function is(e,t){var n=K;K|=1;try{return e(t)}finally{K=n,K===0&&(or=he()+500,Co&&on())}}function $n(e){Kt!==null&&Kt.tag===0&&(K&6)===0&&qn();var t=K;K|=1;var n=nt.transition,r=q;try{if(nt.transition=null,q=1,e)return e()}finally{q=r,nt.transition=n,K=t,(K&6)===0&&on()}}function ss(){We=Kn.current,oe(Kn)}function _n(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Jm(n)),ye!==null)for(n=ye.return;n!==null;){var r=n;switch(Bi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&io();break;case 3:rr(),oe(Be),oe(Te),Xi();break;case 5:Gi(r);break;case 4:rr();break;case 13:oe(se);break;case 19:oe(se);break;case 10:Ki(r.type._context);break;case 22:case 23:ss()}n=n.return}if(we=e,ye=e=en(e.current,null),ke=We=t,_e=0,ta=null,os=Do=kn=0,Me=Ar=null,yn!==null){for(t=0;t<yn.length;t++)if(n=yn[t],r=n.interleaved,r!==null){n.interleaved=null;var a=r.next,o=n.pending;if(o!==null){var l=o.next;o.next=a,r.next=l}n.pending=r}yn=null}return e}function qd(e,t){do{var n=ye;try{if(Wi(),Ka.current=yo,vo){for(var r=ue.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}vo=!1}if(En=0,Ne=ge=ue=null,Or=!1,qr=0,as.current=null,n===null||n.return===null){_e=1,ta=t,ye=null;break}e:{var o=e,l=n.return,i=n,s=t;if(t=ke,i.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var u=s,m=i,v=m.tag;if((m.mode&1)===0&&(v===0||v===11||v===15)){var h=m.alternate;h?(m.updateQueue=h.updateQueue,m.memoizedState=h.memoizedState,m.lanes=h.lanes):(m.updateQueue=null,m.memoizedState=null)}var E=Qu(l);if(E!==null){E.flags&=-257,Yu(E,l,i,o,t),E.mode&1&&Ju(o,u,t),t=E,s=u;var S=t.updateQueue;if(S===null){var w=new Set;w.add(s),t.updateQueue=w}else S.add(s);break e}else{if((t&1)===0){Ju(o,u,t),us();break e}s=Error(R(426))}}else if(ie&&i.mode&1){var N=Qu(l);if(N!==null){(N.flags&65536)===0&&(N.flags|=256),Yu(N,l,i,o,t),Vi(ar(s,i));break e}}o=s=ar(s,i),_e!==4&&(_e=2),Ar===null?Ar=[o]:Ar.push(o),o=l;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var d=Od(o,s,t);zu(o,d);break e;case 1:i=s;var c=o.type,f=o.stateNode;if((o.flags&128)===0&&(typeof c.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(qt===null||!qt.has(f)))){o.flags|=65536,t&=-t,o.lanes|=t;var g=jd(o,i,t);zu(o,g);break e}}o=o.return}while(o!==null)}tf(n)}catch(C){t=C,ye===n&&n!==null&&(ye=n=n.return);continue}break}while(!0)}function Zd(){var e=go.current;return go.current=yo,e===null?yo:e}function us(){(_e===0||_e===3||_e===2)&&(_e=4),we===null||(kn&268435455)===0&&(Do&268435455)===0||Ht(we,ke)}function wo(e,t){var n=K;K|=2;var r=Zd();(we!==e||ke!==t)&&(Rt=null,_n(e,t));do try{gh();break}catch(a){qd(e,a)}while(!0);if(Wi(),K=n,go.current=r,ye!==null)throw Error(R(261));return we=null,ke=0,_e}function gh(){for(;ye!==null;)ef(ye)}function _h(){for(;ye!==null&&!Kp();)ef(ye)}function ef(e){var t=rf(e.alternate,e,We);e.memoizedProps=e.pendingProps,t===null?tf(e):ye=t,as.current=null}function tf(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=dh(n,t,We),n!==null){ye=n;return}}else{if(n=fh(n,t),n!==null){n.flags&=32767,ye=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{_e=6,ye=null;return}}if(t=t.sibling,t!==null){ye=t;return}ye=t=e}while(t!==null);_e===0&&(_e=5)}function hn(e,t,n){var r=q,a=nt.transition;try{nt.transition=null,q=1,Nh(e,t,n,r)}finally{nt.transition=a,q=r}return null}function Nh(e,t,n,r){do qn();while(Kt!==null);if((K&6)!==0)throw Error(R(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(R(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(nm(e,o),e===we&&(ye=we=null,ke=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||za||(za=!0,af(to,function(){return qn(),null})),o=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||o){o=nt.transition,nt.transition=null;var l=q;q=1;var i=K;K|=4,as.current=null,mh(e,n),Yd(n,e),Bm(ti),ro=!!ei,ti=ei=null,e.current=n,hh(n,e,a),Jp(),K=i,q=l,nt.transition=o}else e.current=n;if(za&&(za=!1,Kt=e,No=a),o=e.pendingLanes,o===0&&(qt=null),Gp(n.stateNode,r),He(e,he()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],r(a.value,{componentStack:a.stack,digest:a.digest});if(_o)throw _o=!1,e=wi,wi=null,e;return(No&1)!==0&&e.tag!==0&&qn(),o=e.pendingLanes,(o&1)!==0?e===Si?Ir++:(Ir=0,Si=e):Ir=0,on(),null}function qn(){if(Kt!==null){var e=Oc(No),t=nt.transition,n=q;try{if(nt.transition=null,q=16>e?16:e,Kt===null)var r=!1;else{if(e=Kt,Kt=null,No=0,(K&6)!==0)throw Error(R(331));var a=K;for(K|=4,F=e.current;F!==null;){var o=F,l=o.child;if((F.flags&16)!==0){var i=o.deletions;if(i!==null){for(var s=0;s<i.length;s++){var u=i[s];for(F=u;F!==null;){var m=F;switch(m.tag){case 0:case 11:case 15:jr(8,m,o)}var v=m.child;if(v!==null)v.return=m,F=v;else for(;F!==null;){m=F;var h=m.sibling,E=m.return;if(Kd(m),m===u){F=null;break}if(h!==null){h.return=E,F=h;break}F=E}}}var S=o.alternate;if(S!==null){var w=S.child;if(w!==null){S.child=null;do{var N=w.sibling;w.sibling=null,w=N}while(w!==null)}}F=o}}if((o.subtreeFlags&2064)!==0&&l!==null)l.return=o,F=l;else e:for(;F!==null;){if(o=F,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:jr(9,o,o.return)}var d=o.sibling;if(d!==null){d.return=o.return,F=d;break e}F=o.return}}var c=e.current;for(F=c;F!==null;){l=F;var f=l.child;if((l.subtreeFlags&2064)!==0&&f!==null)f.return=l,F=f;else e:for(l=c;F!==null;){if(i=F,(i.flags&2048)!==0)try{switch(i.tag){case 0:case 11:case 15:To(9,i)}}catch(C){fe(i,i.return,C)}if(i===l){F=null;break e}var g=i.sibling;if(g!==null){g.return=i.return,F=g;break e}F=i.return}}if(K=a,on(),Et&&typeof Et.onPostCommitFiberRoot=="function")try{Et.onPostCommitFiberRoot(Eo,e)}catch{}r=!0}return r}finally{q=n,nt.transition=t}}return!1}function sc(e,t,n){t=ar(n,t),t=Od(e,t,1),e=Xt(e,t,1),t=Ae(),e!==null&&(na(e,1,t),He(e,t))}function fe(e,t,n){if(e.tag===3)sc(e,e,n);else for(;t!==null;){if(t.tag===3){sc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(qt===null||!qt.has(r))){e=ar(n,e),e=jd(t,e,1),t=Xt(t,e,1),e=Ae(),t!==null&&(na(t,1,e),He(t,e));break}}t=t.return}}function wh(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ae(),e.pingedLanes|=e.suspendedLanes&n,we===e&&(ke&n)===n&&(_e===4||_e===3&&(ke&130023424)===ke&&500>he()-ls?_n(e,0):os|=n),He(e,t)}function nf(e,t){t===0&&((e.mode&1)===0?t=1:(t=ba,ba<<=1,(ba&130023424)===0&&(ba=4194304)));var n=Ae();e=Ft(e,t),e!==null&&(na(e,t,n),He(e,n))}function Sh(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),nf(e,n)}function Eh(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(R(314))}r!==null&&r.delete(t),nf(e,n)}var rf;rf=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Be.current)ze=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return ze=!1,ch(e,t,n);ze=(e.flags&131072)!==0}else ze=!1,ie&&(t.flags&1048576)!==0&&id(t,co,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Qa(e,t),e=t.pendingProps;var a=er(t,Te.current);Xn(t,n),a=Zi(null,t,r,e,a,n);var o=es();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ve(r)?(o=!0,so(t)):o=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Qi(t),a.updater=Po,t.stateNode=a,a._reactInternals=t,ci(t,r,e,n),t=pi(null,t,r,!0,o,n)):(t.tag=0,ie&&o&&zi(t),je(null,t,a,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Qa(e,t),e=t.pendingProps,a=r._init,r=a(r._payload),t.type=r,a=t.tag=$h(r),e=ut(r,e),a){case 0:t=fi(null,t,r,e,n);break e;case 1:t=qu(null,t,r,e,n);break e;case 11:t=Gu(null,t,r,e,n);break e;case 14:t=Xu(null,t,r,ut(r.type,e),n);break e}throw Error(R(306,r,""))}return t;case 0:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:ut(r,a),fi(e,t,r,a,n);case 1:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:ut(r,a),qu(e,t,r,a,n);case 3:e:{if(Md(t),e===null)throw Error(R(387));r=t.pendingProps,o=t.memoizedState,a=o.element,pd(e,t),mo(t,r,null,n);var l=t.memoizedState;if(r=l.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){a=ar(Error(R(423)),t),t=Zu(e,t,r,n,a);break e}else if(r!==a){a=ar(Error(R(424)),t),t=Zu(e,t,r,n,a);break e}else for(Ke=Gt(t.stateNode.containerInfo.firstChild),Je=t,ie=!0,dt=null,n=dd(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(tr(),r===a){t=Lt(e,t,n);break e}je(e,t,r,n)}t=t.child}return t;case 5:return md(t),e===null&&ii(t),r=t.type,a=t.pendingProps,o=e!==null?e.memoizedProps:null,l=a.children,ni(r,a)?l=null:o!==null&&ni(r,o)&&(t.flags|=32),Ud(e,t),je(e,t,l,n),t.child;case 6:return e===null&&ii(t),null;case 13:return zd(e,t,n);case 4:return Yi(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=nr(t,null,r,n):je(e,t,r,n),t.child;case 11:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:ut(r,a),Gu(e,t,r,a,n);case 7:return je(e,t,t.pendingProps,n),t.child;case 8:return je(e,t,t.pendingProps.children,n),t.child;case 12:return je(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,a=t.pendingProps,o=t.memoizedProps,l=a.value,ne(fo,r._currentValue),r._currentValue=l,o!==null)if(mt(o.value,l)){if(o.children===a.children&&!Be.current){t=Lt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var i=o.dependencies;if(i!==null){l=o.child;for(var s=i.firstContext;s!==null;){if(s.context===r){if(o.tag===1){s=Pt(-1,n&-n),s.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var m=u.pending;m===null?s.next=s:(s.next=m.next,m.next=s),u.pending=s}}o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),si(o.return,n,t),i.lanes|=n;break}s=s.next}}else if(o.tag===10)l=o.type===t.type?null:o.child;else if(o.tag===18){if(l=o.return,l===null)throw Error(R(341));l.lanes|=n,i=l.alternate,i!==null&&(i.lanes|=n),si(l,n,t),l=o.sibling}else l=o.child;if(l!==null)l.return=o;else for(l=o;l!==null;){if(l===t){l=null;break}if(o=l.sibling,o!==null){o.return=l.return,l=o;break}l=l.return}o=l}je(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,r=t.pendingProps.children,Xn(t,n),a=rt(a),r=r(a),t.flags|=1,je(e,t,r,n),t.child;case 14:return r=t.type,a=ut(r,t.pendingProps),a=ut(r.type,a),Xu(e,t,r,a,n);case 15:return Ad(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:ut(r,a),Qa(e,t),t.tag=1,Ve(r)?(e=!0,so(t)):e=!1,Xn(t,n),Ld(t,r,a),ci(t,r,a,n),pi(null,t,r,!0,e,n);case 19:return Bd(e,t,n);case 22:return Id(e,t,n)}throw Error(R(156,t.tag))};function af(e,t){return Tc(e,t)}function kh(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function tt(e,t,n,r){return new kh(e,t,n,r)}function cs(e){return e=e.prototype,!(!e||!e.isReactComponent)}function $h(e){if(typeof e=="function")return cs(e)?1:0;if(e!=null){if(e=e.$$typeof,e===xi)return 11;if(e===Pi)return 14}return 2}function en(e,t){var n=e.alternate;return n===null?(n=tt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Xa(e,t,n,r,a,o){var l=2;if(r=e,typeof e=="function")cs(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case jn:return Nn(n.children,a,o,t);case Ci:l=8,a|=8;break;case Ll:return e=tt(12,n,t,a|2),e.elementType=Ll,e.lanes=o,e;case Ol:return e=tt(13,n,t,a),e.elementType=Ol,e.lanes=o,e;case jl:return e=tt(19,n,t,a),e.elementType=jl,e.lanes=o,e;case mc:return Fo(n,a,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case fc:l=10;break e;case pc:l=9;break e;case xi:l=11;break e;case Pi:l=14;break e;case zt:l=16,r=null;break e}throw Error(R(130,e==null?e:typeof e,""))}return t=tt(l,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Nn(e,t,n,r){return e=tt(7,e,r,t),e.lanes=n,e}function Fo(e,t,n,r){return e=tt(22,e,r,t),e.elementType=mc,e.lanes=n,e.stateNode={isHidden:!1},e}function Tl(e,t,n){return e=tt(6,e,null,t),e.lanes=n,e}function Dl(e,t,n){return t=tt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Rh(e,t,n,r,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=hl(0),this.expirationTimes=hl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=hl(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function ds(e,t,n,r,a,o,l,i,s){return e=new Rh(e,t,n,i,s),t===1?(t=1,o===!0&&(t|=8)):t=0,o=tt(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Qi(o),e}function bh(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:On,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function of(e){if(!e)return nn;e=e._reactInternals;e:{if(bn(e)!==e||e.tag!==1)throw Error(R(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ve(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(R(171))}if(e.tag===1){var n=e.type;if(Ve(n))return od(e,n,t)}return t}function lf(e,t,n,r,a,o,l,i,s){return e=ds(n,r,!0,e,a,o,l,i,s),e.context=of(null),n=e.current,r=Ae(),a=Zt(n),o=Pt(r,a),o.callback=t??null,Xt(n,o,a),e.current.lanes=a,na(e,a,r),He(e,r),e}function Lo(e,t,n,r){var a=t.current,o=Ae(),l=Zt(a);return n=of(n),t.context===null?t.context=n:t.pendingContext=n,t=Pt(o,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Xt(a,t,l),e!==null&&(pt(e,a,l,o),Wa(e,a,l)),l}function So(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function uc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function fs(e,t){uc(e,t),(e=e.alternate)&&uc(e,t)}function Ch(){return null}var sf=typeof reportError=="function"?reportError:function(e){console.error(e)};function ps(e){this._internalRoot=e}Oo.prototype.render=ps.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(R(409));Lo(e,t,null,null)};Oo.prototype.unmount=ps.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;$n(function(){Lo(null,e,null,null)}),t[Dt]=null}};function Oo(e){this._internalRoot=e}Oo.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ic();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Vt.length&&t!==0&&t<Vt[n].priority;n++);Vt.splice(n,0,e),n===0&&Mc(e)}};function ms(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function jo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function cc(){}function xh(e,t,n,r,a){if(a){if(typeof r=="function"){var o=r;r=function(){var u=So(l);o.call(u)}}var l=lf(t,r,e,0,null,!1,!1,"",cc);return e._reactRootContainer=l,e[Dt]=l.current,Jr(e.nodeType===8?e.parentNode:e),$n(),l}for(;a=e.lastChild;)e.removeChild(a);if(typeof r=="function"){var i=r;r=function(){var u=So(s);i.call(u)}}var s=ds(e,0,!1,null,null,!1,!1,"",cc);return e._reactRootContainer=s,e[Dt]=s.current,Jr(e.nodeType===8?e.parentNode:e),$n(function(){Lo(t,s,n,r)}),s}function Ao(e,t,n,r,a){var o=n._reactRootContainer;if(o){var l=o;if(typeof a=="function"){var i=a;a=function(){var s=So(l);i.call(s)}}Lo(t,l,e,a)}else l=xh(n,t,e,a,r);return So(l)}jc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Cr(t.pendingLanes);n!==0&&(Fi(t,n|1),He(t,he()),(K&6)===0&&(or=he()+500,on()))}break;case 13:$n(function(){var r=Ft(e,1);if(r!==null){var a=Ae();pt(r,e,1,a)}}),fs(e,1)}};Li=function(e){if(e.tag===13){var t=Ft(e,134217728);if(t!==null){var n=Ae();pt(t,e,134217728,n)}fs(e,134217728)}};Ac=function(e){if(e.tag===13){var t=Zt(e),n=Ft(e,t);if(n!==null){var r=Ae();pt(n,e,t,r)}fs(e,t)}};Ic=function(){return q};Uc=function(e,t){var n=q;try{return q=e,t()}finally{q=n}};Kl=function(e,t,n){switch(t){case"input":if(Ul(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=bo(r);if(!a)throw Error(R(90));vc(r),Ul(r,a)}}}break;case"textarea":gc(e,n);break;case"select":t=n.value,t!=null&&Jn(e,!!n.multiple,t,!1)}};$c=is;Rc=$n;var Ph={usingClientEntryPoint:!1,Events:[aa,Mn,bo,Ec,kc,is]},kr={findFiberByHostInstance:vn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Th={bundleType:kr.bundleType,version:kr.version,rendererPackageName:kr.rendererPackageName,rendererConfig:kr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ot.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=xc(e),e===null?null:e.stateNode},findFiberByHostInstance:kr.findFiberByHostInstance||Ch,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&($r=__REACT_DEVTOOLS_GLOBAL_HOOK__,!$r.isDisabled&&$r.supportsFiber))try{Eo=$r.inject(Th),Et=$r}catch{}var $r;Ge.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ph;Ge.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ms(t))throw Error(R(200));return bh(e,t,null,n)};Ge.createRoot=function(e,t){if(!ms(e))throw Error(R(299));var n=!1,r="",a=sf;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=ds(e,1,!1,null,null,n,!1,r,a),e[Dt]=t.current,Jr(e.nodeType===8?e.parentNode:e),new ps(t)};Ge.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(R(188)):(e=Object.keys(e).join(","),Error(R(268,e)));return e=xc(t),e=e===null?null:e.stateNode,e};Ge.flushSync=function(e){return $n(e)};Ge.hydrate=function(e,t,n){if(!jo(t))throw Error(R(200));return Ao(null,e,t,!0,n)};Ge.hydrateRoot=function(e,t,n){if(!ms(e))throw Error(R(405));var r=n!=null&&n.hydratedSources||null,a=!1,o="",l=sf;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=lf(t,null,e,1,n??null,a,!1,o,l),e[Dt]=t.current,Jr(e),r)for(e=0;e<r.length;e++)n=r[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new Oo(t)};Ge.render=function(e,t,n){if(!jo(t))throw Error(R(200));return Ao(null,e,t,!1,n)};Ge.unmountComponentAtNode=function(e){if(!jo(e))throw Error(R(40));return e._reactRootContainer?($n(function(){Ao(null,null,e,!1,function(){e._reactRootContainer=null,e[Dt]=null})}),!0):!1};Ge.unstable_batchedUpdates=is;Ge.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!jo(n))throw Error(R(200));if(e==null||e._reactInternals===void 0)throw Error(R(38));return Ao(e,t,n,!1,r)};Ge.version="18.3.1-next-f1338f8080-20240426"});var hs=fn((hy,df)=>{"use strict";function cf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cf)}catch(e){console.error(e)}}cf(),df.exports=uf()});var pf=fn(vs=>{"use strict";var ff=hs();vs.createRoot=ff.createRoot,vs.hydrateRoot=ff.hydrateRoot;var vy});var $=fr(mr()),Xf=fr(pf());var Y=fr(mr()),wv=fr(hs());var D=fr(mr());function la(){return la=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},la.apply(this,arguments)}var ht;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(ht||(ht={}));var mf="popstate";function _f(e){e===void 0&&(e={});function t(r,a){let{pathname:o,search:l,hash:i}=r.location;return gs("",{pathname:o,search:l,hash:i},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(r,a){return typeof a=="string"?a:Cn(a)}return Fh(t,n,null,e)}function le(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function _s(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Dh(){return Math.random().toString(36).substr(2,8)}function hf(e,t){return{usr:e.state,key:e.key,idx:t}}function gs(e,t,n,r){return n===void 0&&(n=null),la({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?jt(t):t,{state:n,key:t&&t.key||r||Dh()})}function Cn(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function jt(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Fh(e,t,n,r){r===void 0&&(r={});let{window:a=document.defaultView,v5Compat:o=!1}=r,l=a.history,i=ht.Pop,s=null,u=m();u==null&&(u=0,l.replaceState(la({},l.state,{idx:u}),""));function m(){return(l.state||{idx:null}).idx}function v(){i=ht.Pop;let N=m(),d=N==null?null:N-u;u=N,s&&s({action:i,location:w.location,delta:d})}function h(N,d){i=ht.Push;let c=gs(w.location,N,d);n&&n(c,N),u=m()+1;let f=hf(c,u),g=w.createHref(c);try{l.pushState(f,"",g)}catch(C){if(C instanceof DOMException&&C.name==="DataCloneError")throw C;a.location.assign(g)}o&&s&&s({action:i,location:w.location,delta:1})}function E(N,d){i=ht.Replace;let c=gs(w.location,N,d);n&&n(c,N),u=m();let f=hf(c,u),g=w.createHref(c);l.replaceState(f,"",g),o&&s&&s({action:i,location:w.location,delta:0})}function S(N){let d=a.location.origin!=="null"?a.location.origin:a.location.href,c=typeof N=="string"?N:Cn(N);return c=c.replace(/ $/,"%20"),le(d,"No window.location.(origin|href) available to create URL for href: "+c),new URL(c,d)}let w={get action(){return i},get location(){return e(a,l)},listen(N){if(s)throw new Error("A history only accepts one active listener");return a.addEventListener(mf,v),s=N,()=>{a.removeEventListener(mf,v),s=null}},createHref(N){return t(a,N)},createURL:S,encodeLocation(N){let d=S(N);return{pathname:d.pathname,search:d.search,hash:d.hash}},push:h,replace:E,go(N){return l.go(N)}};return w}var vf;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(vf||(vf={}));function Io(e,t,n){return n===void 0&&(n="/"),Lh(e,t,n,!1)}function Lh(e,t,n,r){let a=typeof t=="string"?jt(t):t,o=sn(a.pathname||"/",n);if(o==null)return null;let l=Nf(e);Oh(l);let i=null;for(let s=0;i==null&&s<l.length;++s){let u=Sf(o);i=Hh(l[s],u,r)}return i}function Nf(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let a=(o,l,i)=>{let s={relativePath:i===void 0?o.path||"":i,caseSensitive:o.caseSensitive===!0,childrenIndex:l,route:o};s.relativePath.startsWith("/")&&(le(s.relativePath.startsWith(r),'Absolute route path "'+s.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),s.relativePath=s.relativePath.slice(r.length));let u=$t([r,s.relativePath]),m=n.concat(s);o.children&&o.children.length>0&&(le(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),Nf(o.children,t,m,u)),!(o.path==null&&!o.index)&&t.push({path:u,score:Bh(u,o.index),routesMeta:m})};return e.forEach((o,l)=>{var i;if(o.path===""||!((i=o.path)!=null&&i.includes("?")))a(o,l);else for(let s of wf(o.path))a(o,l,s)}),t}function wf(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,a=n.endsWith("?"),o=n.replace(/\?$/,"");if(r.length===0)return a?[o,""]:[o];let l=wf(r.join("/")),i=[];return i.push(...l.map(s=>s===""?o:[o,s].join("/"))),a&&i.push(...l),i.map(s=>e.startsWith("/")&&s===""?"/":s)}function Oh(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Vh(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var jh=/^:[\w-]+$/,Ah=3,Ih=2,Uh=1,Mh=10,zh=-2,yf=e=>e==="*";function Bh(e,t){let n=e.split("/"),r=n.length;return n.some(yf)&&(r+=zh),t&&(r+=Ih),n.filter(a=>!yf(a)).reduce((a,o)=>a+(jh.test(o)?Ah:o===""?Uh:Mh),r)}function Vh(e,t){return e.length===t.length&&e.slice(0,-1).every((r,a)=>r===t[a])?e[e.length-1]-t[t.length-1]:0}function Hh(e,t,n){n===void 0&&(n=!1);let{routesMeta:r}=e,a={},o="/",l=[];for(let i=0;i<r.length;++i){let s=r[i],u=i===r.length-1,m=o==="/"?t:t.slice(o.length)||"/",v=ln({path:s.relativePath,caseSensitive:s.caseSensitive,end:u},m),h=s.route;if(!v&&u&&n&&!r[r.length-1].route.index&&(v=ln({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},m)),!v)return null;Object.assign(a,v.params),l.push({params:a,pathname:$t([o,v.pathname]),pathnameBase:Yh($t([o,v.pathnameBase])),route:h}),v.pathnameBase!=="/"&&(o=$t([o,v.pathnameBase]))}return l}function ln(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Wh(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let o=a[0],l=o.replace(/(.)\/+$/,"$1"),i=a.slice(1);return{params:r.reduce((u,m,v)=>{let{paramName:h,isOptional:E}=m;if(h==="*"){let w=i[v]||"";l=o.slice(0,o.length-w.length).replace(/(.)\/+$/,"$1")}let S=i[v];return E&&!S?u[h]=void 0:u[h]=(S||"").replace(/%2F/g,"/"),u},{}),pathname:o,pathnameBase:l,pattern:e}}function Wh(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),_s(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(l,i,s)=>(r.push({paramName:i,isOptional:s!=null}),s?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function Sf(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return _s(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function sn(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}var Kh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Jh=e=>Kh.test(e);function Ns(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:a=""}=typeof e=="string"?jt(e):e,o;if(n)if(Jh(n))o=n;else{if(n.includes("//")){let l=n;n=n.replace(/\/\/+/g,"/"),_s(!1,"Pathnames cannot have embedded double slashes - normalizing "+(l+" -> "+n))}n.startsWith("/")?o=gf(n.substring(1),"/"):o=gf(n,t)}else o=t;return{pathname:o,search:Gh(r),hash:Xh(a)}}function gf(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function ys(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Qh(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Uo(e,t){let n=Qh(e);return t?n.map((r,a)=>a===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Mo(e,t,n,r){r===void 0&&(r=!1);let a;typeof e=="string"?a=jt(e):(a=la({},e),le(!a.pathname||!a.pathname.includes("?"),ys("?","pathname","search",a)),le(!a.pathname||!a.pathname.includes("#"),ys("#","pathname","hash",a)),le(!a.search||!a.search.includes("#"),ys("#","search","hash",a)));let o=e===""||a.pathname==="",l=o?"/":a.pathname,i;if(l==null)i=n;else{let v=t.length-1;if(!r&&l.startsWith("..")){let h=l.split("/");for(;h[0]==="..";)h.shift(),v-=1;a.pathname=h.join("/")}i=v>=0?t[v]:"/"}let s=Ns(a,i),u=l&&l!=="/"&&l.endsWith("/"),m=(o||l===".")&&n.endsWith("/");return!s.pathname.endsWith("/")&&(u||m)&&(s.pathname+="/"),s}var $t=e=>e.join("/").replace(/\/\/+/g,"/"),Yh=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Gh=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Xh=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function zo(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var Ef=["post","put","patch","delete"],gy=new Set(Ef),qh=["get",...Ef],_y=new Set(qh);var Ny=Symbol("deferred");function ia(){return ia=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ia.apply(this,arguments)}var ur=D.createContext(null),Vo=D.createContext(null);var vt=D.createContext(null),ua=D.createContext(null),yt=D.createContext({outlet:null,matches:[],isDataRoute:!1}),Rf=D.createContext(null);function Ss(e,t){let{relative:n}=t===void 0?{}:t;xn()||le(!1);let{basename:r,navigator:a}=D.useContext(vt),{hash:o,pathname:l,search:i}=cr(e,{relative:n}),s=l;return r!=="/"&&(s=l==="/"?r:$t([r,l])),a.createHref({pathname:s,search:i,hash:o})}function xn(){return D.useContext(ua)!=null}function un(){return xn()||le(!1),D.useContext(ua).location}function bf(e){D.useContext(vt).static||D.useLayoutEffect(e)}function At(){let{isDataRoute:e}=D.useContext(yt);return e?mv():lv()}function lv(){xn()||le(!1);let e=D.useContext(ur),{basename:t,future:n,navigator:r}=D.useContext(vt),{matches:a}=D.useContext(yt),{pathname:o}=un(),l=JSON.stringify(Uo(a,n.v7_relativeSplatPath)),i=D.useRef(!1);return bf(()=>{i.current=!0}),D.useCallback(function(u,m){if(m===void 0&&(m={}),!i.current)return;if(typeof u=="number"){r.go(u);return}let v=Mo(u,JSON.parse(l),o,m.relative==="path");e==null&&t!=="/"&&(v.pathname=v.pathname==="/"?t:$t([t,v.pathname])),(m.replace?r.replace:r.push)(v,m.state,m)},[t,r,l,o,e])}function Ho(){let{matches:e}=D.useContext(yt),t=e[e.length-1];return t?t.params:{}}function cr(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=D.useContext(vt),{matches:a}=D.useContext(yt),{pathname:o}=un(),l=JSON.stringify(Uo(a,r.v7_relativeSplatPath));return D.useMemo(()=>Mo(e,JSON.parse(l),o,n==="path"),[e,l,o,n])}function Cf(e,t){return xf(e,t)}function xf(e,t,n,r){xn()||le(!1);let{navigator:a}=D.useContext(vt),{matches:o}=D.useContext(yt),l=o[o.length-1],i=l?l.params:{},s=l?l.pathname:"/",u=l?l.pathnameBase:"/",m=l&&l.route,v=un(),h;if(t){var E;let c=typeof t=="string"?jt(t):t;u==="/"||(E=c.pathname)!=null&&E.startsWith(u)||le(!1),h=c}else h=v;let S=h.pathname||"/",w=S;if(u!=="/"){let c=u.replace(/^\//,"").split("/");w="/"+S.replace(/^\//,"").split("/").slice(c.length).join("/")}let N=Io(e,{pathname:w}),d=cv(N&&N.map(c=>Object.assign({},c,{params:Object.assign({},i,c.params),pathname:$t([u,a.encodeLocation?a.encodeLocation(c.pathname).pathname:c.pathname]),pathnameBase:c.pathnameBase==="/"?u:$t([u,a.encodeLocation?a.encodeLocation(c.pathnameBase).pathname:c.pathnameBase])})),o,n,r);return t&&d?D.createElement(ua.Provider,{value:{location:ia({pathname:"/",search:"",hash:"",state:null,key:"default"},h),navigationType:ht.Pop}},d):d}function iv(){let e=Df(),t=zo(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",a={padding:"0.5rem",backgroundColor:r},o={padding:"2px 4px",backgroundColor:r};return D.createElement(D.Fragment,null,D.createElement("h2",null,"Unexpected Application Error!"),D.createElement("h3",{style:{fontStyle:"italic"}},t),n?D.createElement("pre",{style:a},n):null,null)}var sv=D.createElement(iv,null),ws=class extends D.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?D.createElement(yt.Provider,{value:this.props.routeContext},D.createElement(Rf.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function uv(e){let{routeContext:t,match:n,children:r}=e,a=D.useContext(ur);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),D.createElement(yt.Provider,{value:t},r)}function cv(e,t,n,r){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var o;if(!n)return null;if(n.errors)e=n.matches;else if((o=r)!=null&&o.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let l=e,i=(a=n)==null?void 0:a.errors;if(i!=null){let m=l.findIndex(v=>v.route.id&&i?.[v.route.id]!==void 0);m>=0||le(!1),l=l.slice(0,Math.min(l.length,m+1))}let s=!1,u=-1;if(n&&r&&r.v7_partialHydration)for(let m=0;m<l.length;m++){let v=l[m];if((v.route.HydrateFallback||v.route.hydrateFallbackElement)&&(u=m),v.route.id){let{loaderData:h,errors:E}=n,S=v.route.loader&&h[v.route.id]===void 0&&(!E||E[v.route.id]===void 0);if(v.route.lazy||S){s=!0,u>=0?l=l.slice(0,u+1):l=[l[0]];break}}}return l.reduceRight((m,v,h)=>{let E,S=!1,w=null,N=null;n&&(E=i&&v.route.id?i[v.route.id]:void 0,w=v.route.errorElement||sv,s&&(u<0&&h===0?(hv("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),S=!0,N=null):u===h&&(S=!0,N=v.route.hydrateFallbackElement||null)));let d=t.concat(l.slice(0,h+1)),c=()=>{let f;return E?f=w:S?f=N:v.route.Component?f=D.createElement(v.route.Component,null):v.route.element?f=v.route.element:f=m,D.createElement(uv,{match:v,routeContext:{outlet:m,matches:d,isDataRoute:n!=null},children:f})};return n&&(v.route.ErrorBoundary||v.route.errorElement||h===0)?D.createElement(ws,{location:n.location,revalidation:n.revalidation,component:w,error:E,children:c(),routeContext:{outlet:null,matches:d,isDataRoute:!0}}):c()},null)}var Pf=(function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e})(Pf||{}),Bo=(function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e})(Bo||{});function dv(e){let t=D.useContext(ur);return t||le(!1),t}function fv(e){let t=D.useContext(Vo);return t||le(!1),t}function pv(e){let t=D.useContext(yt);return t||le(!1),t}function Tf(e){let t=pv(e),n=t.matches[t.matches.length-1];return n.route.id||le(!1),n.route.id}function Df(){var e;let t=D.useContext(Rf),n=fv(Bo.UseRouteError),r=Tf(Bo.UseRouteError);return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function mv(){let{router:e}=dv(Pf.UseNavigateStable),t=Tf(Bo.UseNavigateStable),n=D.useRef(!1);return bf(()=>{n.current=!0}),D.useCallback(function(a,o){o===void 0&&(o={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,ia({fromRouteId:t},o)))},[e,t])}var kf={};function hv(e,t,n){!t&&!kf[e]&&(kf[e]=!0)}var sr=(e,t,n)=>(""+t+("You can use the `"+e+"` future flag to opt-in early. ")+("For more information, see "+n+"."),void 0);function Ff(e,t){e?.v7_startTransition===void 0&&sr("v7_startTransition","React Router will begin wrapping state updates in `React.startTransition` in v7","https://reactrouter.com/v6/upgrading/future#v7_starttransition"),e?.v7_relativeSplatPath===void 0&&(!t||t.v7_relativeSplatPath===void 0)&&sr("v7_relativeSplatPath","Relative route resolution within Splat routes is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath"),t&&(t.v7_fetcherPersist===void 0&&sr("v7_fetcherPersist","The persistence behavior of fetchers is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist"),t.v7_normalizeFormMethod===void 0&&sr("v7_normalizeFormMethod","Casing of `formMethod` fields is being normalized to uppercase in v7","https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod"),t.v7_partialHydration===void 0&&sr("v7_partialHydration","`RouterProvider` hydration behavior is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_partialhydration"),t.v7_skipActionErrorRevalidation===void 0&&sr("v7_skipActionErrorRevalidation","The revalidation behavior after 4xx/5xx `action` responses is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation"))}var vv="startTransition",by=D[vv];function Es(e){let{to:t,replace:n,state:r,relative:a}=e;xn()||le(!1);let{future:o,static:l}=D.useContext(vt),{matches:i}=D.useContext(yt),{pathname:s}=un(),u=At(),m=Mo(t,Uo(i,o.v7_relativeSplatPath),s,a==="path"),v=JSON.stringify(m);return D.useEffect(()=>u(JSON.parse(v),{replace:n,state:r,relative:a}),[u,v,a,n,r]),null}function gt(e){le(!1)}function ks(e){let{basename:t="/",children:n=null,location:r,navigationType:a=ht.Pop,navigator:o,static:l=!1,future:i}=e;xn()&&le(!1);let s=t.replace(/^\/*/,"/"),u=D.useMemo(()=>({basename:s,navigator:o,static:l,future:ia({v7_relativeSplatPath:!1},i)}),[s,i,o,l]);typeof r=="string"&&(r=jt(r));let{pathname:m="/",search:v="",hash:h="",state:E=null,key:S="default"}=r,w=D.useMemo(()=>{let N=sn(m,s);return N==null?null:{location:{pathname:N,search:v,hash:h,state:E,key:S},navigationType:a}},[s,m,v,h,E,S,a]);return w==null?null:D.createElement(vt.Provider,{value:u},D.createElement(ua.Provider,{children:n,value:w}))}function $s(e){let{children:t,location:n}=e;return Cf(sa(t),n)}var Cy=new Promise(()=>{});function sa(e,t){t===void 0&&(t=[]);let n=[];return D.Children.forEach(e,(r,a)=>{if(!D.isValidElement(r))return;let o=[...t,a];if(r.type===D.Fragment){n.push.apply(n,sa(r.props.children,o));return}r.type!==gt&&le(!1),!r.props.index||!r.props.children||le(!1);let l={id:r.props.id||o.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(l.children=sa(r.props.children,o)),n.push(l)}),n}function Wo(){return Wo=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Wo.apply(this,arguments)}function jf(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,o;for(o=0;o<r.length;o++)a=r[o],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function Sv(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Ev(e,t){return e.button===0&&(!t||t==="_self")&&!Sv(e)}var kv=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],$v=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"];var Rv="6";try{window.__reactRouterVersion=Rv}catch{}var bv=Y.createContext({isTransitioning:!1});var Cv="startTransition",Lf=Y[Cv],xv="flushSync",Zy=wv[xv],Pv="useId",eg=Y[Pv];function Af(e){let{basename:t,children:n,future:r,window:a}=e,o=Y.useRef();o.current==null&&(o.current=_f({window:a,v5Compat:!0}));let l=o.current,[i,s]=Y.useState({action:l.action,location:l.location}),{v7_startTransition:u}=r||{},m=Y.useCallback(v=>{u&&Lf?Lf(()=>s(v)):s(v)},[s,u]);return Y.useLayoutEffect(()=>l.listen(m),[l,m]),Y.useEffect(()=>Ff(r),[r]),Y.createElement(ks,{basename:t,children:n,location:i.location,navigationType:i.action,navigator:l,future:r})}var Tv=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Dv=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Xe=Y.forwardRef(function(t,n){let{onClick:r,relative:a,reloadDocument:o,replace:l,state:i,target:s,to:u,preventScrollReset:m,viewTransition:v}=t,h=jf(t,kv),{basename:E}=Y.useContext(vt),S,w=!1;if(typeof u=="string"&&Dv.test(u)&&(S=u,Tv))try{let f=new URL(window.location.href),g=u.startsWith("//")?new URL(f.protocol+u):new URL(u),C=sn(g.pathname,E);g.origin===f.origin&&C!=null?u=C+g.search+g.hash:w=!0}catch{}let N=Ss(u,{relative:a}),d=Lv(u,{replace:l,state:i,target:s,preventScrollReset:m,relative:a,viewTransition:v});function c(f){r&&r(f),f.defaultPrevented||d(f)}return Y.createElement("a",Wo({},h,{href:S||N,onClick:w||o?r:c,ref:n,target:s}))}),If=Y.forwardRef(function(t,n){let{"aria-current":r="page",caseSensitive:a=!1,className:o="",end:l=!1,style:i,to:s,viewTransition:u,children:m}=t,v=jf(t,$v),h=cr(s,{relative:v.relative}),E=un(),S=Y.useContext(Vo),{navigator:w,basename:N}=Y.useContext(vt),d=S!=null&&Ov(h)&&u===!0,c=w.encodeLocation?w.encodeLocation(h).pathname:h.pathname,f=E.pathname,g=S&&S.navigation&&S.navigation.location?S.navigation.location.pathname:null;a||(f=f.toLowerCase(),g=g?g.toLowerCase():null,c=c.toLowerCase()),g&&N&&(g=sn(g,N)||g);let C=c!=="/"&&c.endsWith("/")?c.length-1:c.length,x=f===c||!l&&f.startsWith(c)&&f.charAt(C)==="/",L=g!=null&&(g===c||!l&&g.startsWith(c)&&g.charAt(c.length)==="/"),P={isActive:x,isPending:L,isTransitioning:d},O=x?r:void 0,I;typeof o=="function"?I=o(P):I=[o,x?"active":null,L?"pending":null,d?"transitioning":null].filter(Boolean).join(" ");let J=typeof i=="function"?i(P):i;return Y.createElement(Xe,Wo({},v,{"aria-current":O,className:I,ref:n,style:J,to:s,viewTransition:u}),typeof m=="function"?m(P):m)});var Rs;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Rs||(Rs={}));var Of;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Of||(Of={}));function Fv(e){let t=Y.useContext(ur);return t||le(!1),t}function Lv(e,t){let{target:n,replace:r,state:a,preventScrollReset:o,relative:l,viewTransition:i}=t===void 0?{}:t,s=At(),u=un(),m=cr(e,{relative:l});return Y.useCallback(v=>{if(Ev(v,n)){v.preventDefault();let h=r!==void 0?r:Cn(u)===Cn(m);s(e,{replace:h,state:a,preventScrollReset:o,relative:l,viewTransition:i})}},[u,s,m,r,a,n,e,o,l,i])}function Ov(e,t){t===void 0&&(t={});let n=Y.useContext(bv);n==null&&le(!1);let{basename:r}=Fv(Rs.useViewTransitionState),a=cr(e,{relative:t.relative});if(!n.isTransitioning)return!1;let o=sn(n.currentLocation.pathname,r)||n.currentLocation.pathname,l=sn(n.nextLocation.pathname,r)||n.nextLocation.pathname;return ln(a.pathname,l)!=null||ln(a.pathname,o)!=null}var Mf=function(e,t,n,r){var a;t[0]=0;for(var o=1;o<t.length;o++){var l=t[o++],i=t[o]?(t[0]|=l?1:2,n[t[o++]]):t[++o];l===3?r[0]=i:l===4?r[1]=Object.assign(r[1]||{},i):l===5?(r[1]=r[1]||{})[t[++o]]=i:l===6?r[1][t[++o]]+=i+"":l?(a=e.apply(i,Mf(e,i,n,["",null])),r.push(a),i[0]?t[0]|=2:(t[o-2]=0,t[o]=a)):r.push(i)}return r},Uf=new Map;function zf(e){var t=Uf.get(this);return t||(t=new Map,Uf.set(this,t)),(t=Mf(this,t.get(e)||(t.set(e,t=(function(n){for(var r,a,o=1,l="",i="",s=[0],u=function(h){o===1&&(h||(l=l.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(0,h,l):o===3&&(h||l)?(s.push(3,h,l),o=2):o===2&&l==="..."&&h?s.push(4,h,0):o===2&&l&&!h?s.push(5,0,!0,l):o>=5&&((l||!h&&o===5)&&(s.push(o,0,l,a),o=6),h&&(s.push(o,h,0,a),o=6)),l=""},m=0;m<n.length;m++){m&&(o===1&&u(),u(m));for(var v=0;v<n[m].length;v++)r=n[m][v],o===1?r==="<"?(u(),s=[s],o=3):l+=r:o===4?l==="--"&&r===">"?(o=1,l=""):l=r+l[0]:i?r===i?i="":l+=r:r==='"'||r==="'"?i=r:r===">"?(u(),o=1):o&&(r==="="?(o=5,a=l,l=""):r==="/"&&(o<5||n[m][v+1]===">")?(u(),o===3&&(s=s[0]),o=s,(s=s[0]).push(2,0,o),o=0):r===" "||r==="	"||r===`
`||r==="\r"?(u(),o=2):l+=r),o===3&&l==="!--"&&(o=4,s=s[0])}return u(),s})(e)),t),arguments,[])).length>1?t:t[0]}var Ko=document.getElementById("boot-fallback"),Bf=document.getElementById("boot-fallback-message");function jv(e){Bf&&(Bf.textContent=e)}function Av(e){e&&jv(e),Ko&&Ko.classList.remove("hidden")}function Iv(){Ko&&Ko.classList.add("hidden")}function da(e,t){t&&console.error(e,t),Av(e)}var y=zf.bind($.default.createElement);function Se(e){return String(e||"unknown").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function qf(e){let t=String(e||"everyday");return t==="occasion"?"Occasion":t==="current_event"?"Current Event":"Everyday"}function Jo(e){let t=String(e?.current_stage||"").trim();return t||String(e?.status||"unknown")}function Uv(e){let t=String(e||"").toLowerCase();return t==="completed"||t==="approved"||t==="final_card_ready"?"success":t==="content_candidates_ready"||t==="text_selected"||t==="image_candidates_ready"||t==="image_selected"?"warning":t.includes("reject")||t.includes("timeout")||t.includes("failed")?"danger":t.includes("pending")||t.includes("progress")||t.includes("queued")?"warning":"neutral"}function De({value:e}){return y`<span className=${`badge ${Uv(e)}`}>${Se(e)}</span>`}function Mv({name:e}){let t={viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true"};return e==="home"?y`
        <svg ...${t}>
          <path d="M3 10.5 12 4l9 6.5" />
          <path d="M5.5 9.5V20h13V9.5" />
          <path d="M9.5 20v-5.5h5V20" />
        </svg>
      `:e==="themes"?y`
        <svg ...${t}>
          <path d="M12 3.5v3" />
          <path d="m5.9 5.9 2.1 2.1" />
          <path d="M3.5 12h3" />
          <path d="m5.9 18.1 2.1-2.1" />
          <path d="M12 20.5v-3" />
          <path d="m18.1 18.1-2.1-2.1" />
          <path d="M20.5 12h-3" />
          <path d="m18.1 5.9-2.1 2.1" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      `:e==="studio"?y`
        <svg ...${t}>
          <rect x="4" y="5" width="16" height="14" rx="3" />
          <path d="M8 15.5 11 12l2.5 2.5L16 11l2 2.5" />
          <circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      `:e==="compare"?y`
        <svg ...${t}>
          <rect x="4" y="5" width="6.5" height="14" rx="2" />
          <rect x="13.5" y="5" width="6.5" height="14" rx="2" />
          <path d="M7.25 9h0" />
          <path d="M16.75 15h0" />
        </svg>
      `:y`
      <svg ...${t}>
        <rect x="4" y="5" width="16" height="14" rx="3" />
        <path d="M8 9h8" />
        <path d="M8 12h8" />
        <path d="M8 15h5" />
      </svg>
    `}function Ue(e){if(!e)return"-";let t=new Date(e);return Number.isNaN(t.getTime())?"-":t.toLocaleString()}function zv(e){let t=Number(e||0);if(t<=0)return"0 B";let n=["B","KB","MB","GB","TB"],r=Math.min(Math.floor(Math.log(t)/Math.log(1024)),n.length-1);return`${(t/1024**r).toFixed(r===0?0:1)} ${n[r]}`}function Vf(e){if(!e||typeof e!="object")return"";let t=["decision","status","winner_model","endpoint","image_preview_url","final_preview_url","notes"],n=[];return t.forEach(a=>{let o=e[a];o!=null&&String(o).trim()!==""&&n.push(`${a}: ${String(o)}`)}),n.length>0?n.slice(0,3).join(" | "):Object.entries(e).slice(0,2).map(([a,o])=>`${a}: ${String(o)}`).join(" | ")}async function U(e,t={}){let n=new Headers(t.headers||{});t.body&&!n.has("Content-Type")&&n.set("Content-Type","application/json");let r=await fetch(e,{...t,headers:n}),a=await r.text(),o=null;if(a)try{o=JSON.parse(a)}catch{o=a}if(!r.ok){let l=o&&typeof o=="object"&&o.detail?o.detail:r.statusText;throw new Error(l||`Request failed (${r.status})`)}return o}function Pn(e,t){let n=String(t?.message||"").trim();return n||`Unable to load ${e}`}function Tn(e){let t=String(e?.message||"").trim().toLowerCase();return t==="not found"||t.includes("404")}function Bv(e){return{theme_name:String(e.theme_name||"Internal Theme").trim(),tone_funny_pct:Number(e.tone_funny_pct||20),tone_emotion_pct:Number(e.tone_emotion_pct||80),tone_style:String(e.tone_style||"conversational"),audience:String(e.audience||"internal reviewer").trim(),cultural_context:String(e.cultural_context||"global").trim(),output_spec:Hv(e.copy_style,e.target_words),avoid_cliches:!0,cards_per_theme:Number(e.cards_per_theme||10),notes:String(e.notes||"").trim()||null,rendering:{theme_style:"minimal",text_alignment:"center",export_size:"1080x1350"}}}function pa(e){let t=String(e||"").trim().toLowerCase();return t==="witty"||t==="playful"||t==="heartfelt"||t==="minimal"?t:t==="short_crisp"?"minimal":t==="warm_note"?"heartfelt":t.includes("play")?"playful":t.includes("witty")||t.includes("humor")||t.includes("fun")?"witty":t.includes("heart")||t.includes("warm")||t.includes("romantic")||t.includes("reflect")||t.includes("uplift")?"heartfelt":"minimal"}function Vv(e){return!e||typeof e!="object"?null:{theme_name:String(e.theme_name||"Internal Theme").trim(),audience:String(e.audience||"internal reviewer").trim(),cultural_context:String(e.cultural_context||"global").trim(),tone_style:String(e.tone_style||"conversational").trim(),tone_funny_pct:Number(e.tone_funny_pct??20),tone_emotion_pct:Number(e.tone_emotion_pct??80),copy_style:pa(e.tone_style),target_words:14}}function Hv(e,t){return{format:pa(e),length:{target_words:Number(t||16)},structure:{no_lists:!0,no_numbering:!0}}}function ca(e=null){return{theme_key:"",cards_per_theme:10,notes:"",copy_style:pa(e?.tone_style||e?.default_tone_style),target_words:14,tone_funny_pct:Number(e?.tone_funny_pct??e?.default_funny_pct??20)}}function Zf(e){return{cards_per_theme:Number(e.cards_per_theme||10),notes:String(e.notes||"").trim()||null,copy_style:pa(e.copy_style),target_words:Number(e.target_words||14),tone_funny_pct:Number(e.tone_funny_pct??20)}}var Wv=[{value:"witty",label:"witty"},{value:"playful",label:"playful"},{value:"heartfelt",label:"heartfelt"},{value:"minimal",label:"minimal"}];function ep(e){let t=pa(e);return t==="heartfelt"?"Heartfelt":t==="playful"?"Playful":t==="witty"?"Witty":"Minimal"}function bs(){return Wv.map(e=>y`<option key=${e.value} value=${e.value}>${e.label}</option>`)}function Kv(e){return e&&typeof e.output_spec=="object"&&e.output_spec!==null?e.output_spec:{}}function Go(e){let t=Kv(e);return t&&typeof t.studio=="object"&&t.studio!==null?t.studio:{}}function Jv(e){return!!Go(e).is_favorite}async function Qv(e){let t=await U(`/api/jobs/${e}/image-assets`);return t&&typeof t=="object"?t:{candidates:[]}}async function Cs(e){await U(`/api/jobs/${e}/approve-content`,{method:"POST"});let t=await U(`/api/jobs/${e}/image-assets/generate`,{method:"POST"}),n=Array.isArray(t?.candidates)?t.candidates[0]:null;if(!n?.candidate_id)throw new Error("ImageForge returned no image candidates");return await U(`/api/jobs/${e}/image-assets/${n.candidate_id}/select`,{method:"POST"}),await U(`/api/jobs/${e}/render-final`,{method:"POST"}),{imageOptionUsed:!0}}function Hf(e){return String(e||"").split(",").map(t=>t.trim()).filter(Boolean)}function Wf(e){if(!e)return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toISOString().slice(0,10)}function Kf(e){if(!e)return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=t.getTimezoneOffset()*60*1e3;return new Date(t.getTime()-n).toISOString().slice(0,16)}function Qo(e,t=140){let n=String(e||"").trim();return n?n.length<=t?n:`${n.slice(0,t-1).trimEnd()}...`:""}function tp(e){return typeof e=="string"?e.trim():""}function Yv(e){let t=tp(e);if(!t)return!1;if(t.startsWith("data:image/"))return!0;try{let n=new URL(t,window.location.origin);return/\.(png|jpe?g|webp|gif|svg)$/i.test(n.pathname)}catch{return!1}}function Yo(e,t=[]){if(!e||typeof e!="object")return[];let n=[],r=new Set,a=(o,l,i)=>{let s=tp(l);!s||r.has(s)||!Yv(s)||(r.add(s),n.push({label:o,url:s,source:i}))};if(a("Final Preview",e.final_preview_url,"final_preview_url"),a("Final PNG",e.final_asset_urls&&typeof e.final_asset_urls=="object"?e.final_asset_urls.png:"","final_asset_urls.png"),a("Image Preview",e.image_preview_url,"image_preview_url"),a("Content Preview",e.content_preview_url,"content_preview_url"),Array.isArray(t)){let o={final_preview:"Final Preview",final_png:"Final PNG",image_preview:"Image Preview",content_preview:"Content Preview"};t.forEach(l=>{let i=String(l?.asset_type||"").toLowerCase(),s=o[i];s&&a(s,l.public_url||l.asset_url,`asset:${i}`)})}return n}function fa(e){let t=(0,$.useMemo)(()=>e.map(i=>`${i.source}:${i.url}`).join("|"),[e]),[n,r]=(0,$.useState)(0);(0,$.useEffect)(()=>{r(0)},[t]);let a=n<e.length?e[n]:null,o=e.length>0&&n>=e.length;function l(){r(i=>i+1)}return{currentCandidate:a,exhausted:o,handleError:l}}function Gv({image:e}){let t=(0,$.useMemo)(()=>!e||!e.url?[]:[{label:e.label||"Preview",url:e.url,source:e.label||"preview"}],[e]),{currentCandidate:n,exhausted:r,handleError:a}=fa(t);return y`
      <article className="image-card">
        ${n?y`
              <a href=${n.url} target="_blank" rel="noreferrer">
                <img src=${n.url} alt=${e.label} loading="lazy" onError=${a} />
              </a>
            `:y`<p className="empty-state">${r?"Preview unavailable.":"No preview available yet."}</p>`}
        <p className="image-caption">${e.label}</p>
      </article>
    `}function Jf({job:e,actionState:t,onArchive:n,onDelete:r}){let a=(0,$.useMemo)(()=>Yo(e),[e]),{currentCandidate:o,exhausted:l,handleError:i}=fa(a),s=Qo(e.content_preview||"Content preview will appear here after generation.",180);return y`
      <article className="ecard-tile">
        <div className="ecard-media">
          ${o?y`
                <img
                  src=${o.url}
                  alt=${e.theme_name||"Generated eCard"}
                  loading="lazy"
                  onError=${i}
                />
              `:l?y`
                  <div className="ecard-placeholder">
                    <p className="ecard-placeholder-kicker">Preview Unavailable</p>
                    <p className="ecard-placeholder-copy">The stored preview URL did not load.</p>
                  </div>
                `:y`
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
              <p className="ecard-meta">${Ue(e.created_at)}</p>
            </div>
            <${De} value=${e.status} />
          </div>
          <div className="ecard-stage-row">
            <span className="ecard-stage">${Se(e.current_stage)}</span>
            <span className="ecard-job-id">${e.job_id}</span>
          </div>
          <div className="ecard-actions">
            <${Xe} to=${`/jobs/${e.job_id}`} className="button-link">View Details<//>
            ${o?y`
                  <a href=${o.url} target="_blank" rel="noreferrer" className="button-link">
                    Open Image
                  </a>
                `:y`<button type="button" className="button" disabled=${!0}>Open Image</button>`}
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
    `}function np(e){return(Array.isArray(e?.candidates)?e.candidates:[]).map((n,r)=>({key:n.candidate_id||n.public_url||`image_candidate_${r}`,candidate_id:String(n.candidate_id||""),provider:String(n.provider||"unknown"),model:String(n.model||"").trim(),candidate_index:Number(n.candidate_index||r+1),url:n.public_url||"",relative_path:n.relative_path||"",width:n.width??null,height:n.height??null,is_selected:!!n.is_selected,created_at:n.created_at||null})).filter(n=>n.url)}function Xv(e,t=[]){if(!(!!e?.final_preview_url||!!(e?.final_asset_urls&&typeof e.final_asset_urls=="object"&&e.final_asset_urls.png)))return[];let r=Array.isArray(t)?t.filter(a=>{let o=String(a?.asset_type||"").toLowerCase();return o==="final_preview"||o==="final_png"}):[];return Yo(e,r).map((a,o)=>({key:`${a.source}:${o}`,label:a.label,url:a.url,source:a.source}))}function qv(e,t){let n=Go(e),r=Number(n.selected_text_candidate_id||0);if(r>0){let a=t.find(o=>Number(o.id)===r);if(a)return a}return t.find(a=>a.is_selected)||null}function Zv(e){let t=np(e),n=String(e?.selected_image_candidate_id||"");if(n){let r=t.find(a=>a.candidate_id===n);if(r)return r}return t.find(r=>r.is_selected)||null}function Qf(e,t){return!e||!t?null:`${e} x ${t}`}function ey(e){let t=String(Jo(e)||"").toLowerCase();return t==="failed"?"failed":t==="final_card_ready"?"final_card_ready":String(e?.status||"").toLowerCase()==="archived"?"archived":t||"in_progress"}function ty(){let e=At(),[t,n]=(0,$.useState)([]),[r,a]=(0,$.useState)(null),[o,l]=(0,$.useState)([]),[i,s]=(0,$.useState)(null),[u,m]=(0,$.useState)(!1),[v,h]=(0,$.useState)(!1),[E,S]=(0,$.useState)(!1),[w,N]=(0,$.useState)(""),[d,c]=(0,$.useState)(""),[f,g]=(0,$.useState)(""),[C,x]=(0,$.useState)(""),[L,P]=(0,$.useState)(""),[O,I]=(0,$.useState)(!1),[J,ee]=(0,$.useState)(!1),[j,de]=(0,$.useState)("today"),[W,ve]=(0,$.useState)([]),[G,b]=(0,$.useState)(!1),[V,pe]=(0,$.useState)(!1),[X,Fe]=(0,$.useState)(""),[T,M]=(0,$.useState)({theme_name:"Internal Launch Sprint",audience:"operations team",cultural_context:"global",tone_style:"conversational",tone_funny_pct:20,tone_emotion_pct:80,copy_style:"minimal",target_words:14,cards_per_theme:10,notes:""}),[Q,Z]=(0,$.useState)(ca()),re=i&&typeof i=="object"&&i.theme||null,ot=(0,$.useMemo)(()=>{let k=0,A=0,B=0;return t.forEach(Re=>{let Le=String(Re.status||"").toLowerCase();if(Le==="completed"){A+=1;return}if(Le.includes("reject")||Le.includes("timeout")||Le.includes("failed")){B+=1;return}Le!=="archived"&&(k+=1)}),{active:k,completed:A,failed:B}},[t]),cn=(0,$.useMemo)(()=>t.filter(k=>k.final_preview_url||k.final_asset_urls&&k.final_asset_urls.png||k.image_preview_url).slice(0,6),[t]),It=(0,$.useMemo)(()=>t.filter(k=>{let A=String(k.status||"").toLowerCase();return A!=="completed"&&!A.includes("failed")&&!A.includes("reject")&&!A.includes("timeout")&&A!=="archived"}).slice(0,8),[t]),dn=(0,$.useMemo)(()=>t.filter(k=>{let A=String(k.status||"").toLowerCase();return A.includes("failed")||A.includes("reject")||A.includes("timeout")}).slice(0,8),[t]),dr=(0,$.useMemo)(()=>t.filter(k=>Jv(k)).slice(0,6),[t]);async function p(){m(!0),h(!0),S(!0),N(""),c(""),g(""),x("");let[k,A,B,Re]=await Promise.allSettled([U("/api/jobs?limit=50"),U("/api/storage/summary"),U("/api/themes/schedule"),U("/api/themes/today")]),Le="";if(k.status==="fulfilled"?n(Array.isArray(k.value)?k.value:[]):(n([]),N(Pn("jobs",k.reason))),A.status==="fulfilled"?a(A.value||null):(a(null),c(Pn("storage summary",A.reason))),B.status==="fulfilled"){let Ds=Array.isArray(B.value)?[]:Array.isArray(B.value?.week_schedule)?B.value.week_schedule:[];l(Ds),Ds.length===0&&(Le="Theme schedule not configured yet")}else l([]),Tn(B.reason)?Le="Theme Factory not configured yet":g(Pn("Theme Factory schedule",B.reason));Re.status==="fulfilled"?(s(Re.value||null),!Le&&Re.value?.resolved===!1?Le=Re.value?.message||"Theme schedule not configured yet":!Le&&!Re.value?.theme&&(Le="Theme schedule not configured yet")):(s(null),Tn(Re.reason)?Le=Le||"Theme schedule not configured yet":g(Pn("today's theme",Re.reason))),x(Le),m(!1),h(!1),S(!1);let lp=B.status!=="fulfilled"&&!Tn(B.reason),ip=Re.status!=="fulfilled"&&!Tn(Re.reason),sp=k.status!=="fulfilled"||A.status!=="fulfilled"||lp||ip;P(sp?`Refresh completed with errors at ${new Date().toLocaleTimeString()}`:`Refreshed ${new Date().toLocaleTimeString()}`)}(0,$.useEffect)(()=>{p()},[]);async function _(k){k.preventDefault(),b(!0),N("");try{let A=Bv(T),B=await U("/api/jobs/start",{method:"POST",body:JSON.stringify(A)});I(!1);try{await Cs(B.job_id),P(`Created ${B.job_id} and built initial card options`)}catch(Re){P(`Created ${B.job_id}. Studio follow-up is needed: ${Re.message||"auto-build failed"}`)}await p(),e(`/studio/${B.job_id}`)}catch(A){N(A.message||"Unable to create new job")}finally{b(!1)}}function H(k,A){M(B=>({...B,[k]:A}))}function me(){let k=Vv(re);k&&M(A=>({...A,...k}))}async function lt(){if(W.length>0)return W;let k=await U("/api/themes"),A=Array.isArray(k)?k:[];return ve(A),A}async function ma(k){if(de(k),g(""),Z(ca(re)),k==="manual"){try{let B=(await lt())[0]||null;Z({...ca(B),theme_key:B?.theme_key||""}),ee(!0)}catch(A){g(A.message||"Unable to load theme catalog")}return}ee(!0)}async function ap(k){k.preventDefault(),pe(!0),g("");try{let A=Zf(Q),B=j==="manual"?await U("/api/jobs/start-from-theme",{method:"POST",body:JSON.stringify({theme_key:Q.theme_key,...A})}):await U("/api/jobs/create-daily-theme-job",{method:"POST",body:JSON.stringify(A)});ee(!1);try{await Cs(B.job_id),P(j==="manual"?`Created ${B.job_id} from ${Q.theme_key} and built initial card options`:`Created ${B.job_id} from today's theme and built initial card options`)}catch(Re){P(j==="manual"?`Created ${B.job_id} from ${Q.theme_key}. Studio follow-up is needed: ${Re.message||"auto-build failed"}`:`Created ${B.job_id} from today's theme. Studio follow-up is needed: ${Re.message||"auto-build failed"}`)}await p(),e(`/studio/${B.job_id}`)}catch(A){g(A.message||(j==="manual"?"Unable to create theme job":"Unable to create today's themed job"))}finally{pe(!1)}}function op(k){let A=W.find(B=>B.theme_key===k);Z(B=>({...B,theme_key:k,tone_funny_pct:Number(A?.default_funny_pct??B.tone_funny_pct??20)}))}async function Ps(k){Fe(`archive:${k.job_id}`),N("");try{await U(`/api/jobs/${k.job_id}/archive`,{method:"POST"}),P(`Archived ${k.job_id}`),await p()}catch(A){N(A.message||"Unable to archive job")}finally{Fe("")}}async function Ts(k){if(window.confirm(`Delete ${k.job_id} and associated files?`)){Fe(`delete:${k.job_id}`),N("");try{await U(`/api/jobs/${k.job_id}`,{method:"DELETE"}),P(`Deleted ${k.job_id}`),await p()}catch(B){N(B.message||"Unable to delete job")}finally{Fe("")}}}return y`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Home</p>
            <h1 className="page-title">eCard Studio Home</h1>
            <p className="page-description">
              Card-first controls for today's theme, manual theme runs, and recent eCard output.
            </p>
          </div>
          <div className="inline-actions">
            <button
              type="button"
              className="button primary"
              onClick=${()=>ma("today")}
              disabled=${V||E||!re}
            >
              Generate Today's Cards
            </button>
            <button type="button" className="button" onClick=${()=>ma("manual")}>Generate From Theme</button>
            <button type="button" className="button" onClick=${()=>I(!0)}>Create New Card Job</button>
            <button
              type="button"
              className="button"
              onClick=${p}
              disabled=${u||v||E}
            >
              Refresh
            </button>
          </div>
        </header>

        ${L?y`<p className="status-line">${L}</p>`:null}

        ${u||v||E||w||d||f?y`
              <div className="status-stack">
                ${u?y`<div className="status-panel warning">Loading jobs from /api/jobs...</div>`:null}
                ${v?y`<div className="status-panel warning">Loading storage summary from /api/storage/summary...</div>`:null}
                ${E?y`<div className="status-panel warning">Loading Theme Factory data from /api/themes/schedule...</div>`:null}
                ${w?y`<div className="status-panel error">Unable to load jobs: ${w}</div>`:null}
                ${d?y`<div className="status-panel error">Unable to load storage summary: ${d}</div>`:null}
                ${f?y`<div className="status-panel error">Theme error: ${f}</div>`:null}
              </div>
            `:null}

        <section className="cards-grid">
          <article className="summary-card">
            <p className="summary-label">Today's Theme</p>
            <p className="summary-value summary-value-small">${re?re.theme_name:"Unavailable"}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">In Progress</p>
            <p className="summary-value">${u?"...":It.length}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Failed Jobs</p>
            <p className="summary-value">${u?"...":dn.length}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Favorite Cards</p>
            <p className="summary-value">${u?"...":dr.length}</p>
          </article>
        </section>

        <section className="section-panel home-hero">
          <div className="section-head">
            <div>
              <h2 className="section-title">Today's Theme</h2>
              <p className="section-copy">
                ${re?`${re.theme_name} | ${ep("minimal")} card flow with ${Se(i?.weekday)} scheduling`:C||"Theme schedule not configured yet."}
              </p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button primary"
                onClick=${()=>ma("today")}
                disabled=${V||E||!re}
              >
                ${V&&j==="today"?"Generating...":"Generate Today's Cards"}
              </button>
              <button type="button" className="button" onClick=${()=>ma("manual")}>Generate From Theme</button>
              <button type="button" className="button" onClick=${()=>I(!0)}>Create New Card Job</button>
            </div>
          </div>
          ${re?y`
                <div className="key-value-grid">
                  <article className="key-card">
                    <p className="key-label">theme_name</p>
                    <p className="key-value">${re.theme_name}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">bucket</p>
                    <p className="key-value">${qf(re.theme_bucket)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">tone_style</p>
                    <p className="key-value">${re.tone_style}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">audience</p>
                    <p className="key-value">${re.audience}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">default run</p>
                    <p className="key-value">10 cards | 8-18 words</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">storage</p>
                    <p className="key-value">${v?"...":r?zv(r.total_bytes):"Unavailable"}</p>
                  </article>
                </div>
              `:y`<p className="empty-state">Theme schedule not configured yet.</p>`}
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Recent eCards</h2>
              <p className="section-copy">The most recent visual card outputs. Open Studio to tweak text, image, or final card direction.</p>
            </div>
            <${Xe} to="/studio" className="button-link">Open Studio<//>
          </div>
          ${u?y`<p className="empty-state">Loading recent eCards...</p>`:cn.length===0?y`<p className="empty-state">No rendered cards yet. Generate today's cards or run a theme manually.</p>`:y`
                  <div className="ecard-grid">
                    ${cn.map(k=>y`
                        <${Jf}
                          key=${k.job_id}
                          job=${k}
                          actionState=${X}
                          onArchive=${Ps}
                          onDelete=${Ts}
                        />
                      `)}
                  </div>
                `}
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Favorite Cards</h2>
              <p className="section-copy">Cards you marked for quick access and reuse.</p>
            </div>
          </div>
          ${dr.length===0?y`<p className="empty-state">No favorite cards yet. Mark a final card from Studio.</p>`:y`
                <div className="ecard-grid">
                  ${dr.map(k=>y`
                      <${Jf}
                        key=${k.job_id}
                        job=${k}
                        actionState=${X}
                        onArchive=${Ps}
                        onDelete=${Ts}
                      />
                    `)}
                </div>
              `}
        </section>

        <section className="two-column">
          <section className="section-panel">
            <div className="section-head">
              <div>
                <h2 className="section-title">In Progress Jobs</h2>
                <p className="section-copy">Jobs still moving through card generation or waiting for operator intervention.</p>
              </div>
              <${Xe} to="/jobs" className="button-link">All Jobs<//>
            </div>
            ${It.length===0?y`<p className="empty-state">No jobs in progress.</p>`:y`
                  <div className="table-wrap">
                    <table className="console-table">
                      <thead>
                        <tr>
                          <th>job_id</th>
                          <th>theme</th>
                          <th>status</th>
                          <th>updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${It.map(k=>y`
                            <tr key=${k.job_id}>
                              <td><${Xe} className="job-link" to=${`/studio/${k.job_id}`}>${k.job_id}<//></td>
                              <td>${k.theme_name}</td>
                              <td><${De} value=${k.status} /></td>
                              <td>${Ue(k.updated_at)}</td>
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
                <h2 className="section-title">Failed Jobs</h2>
                <p className="section-copy">Jobs that need a rerun from text, image, or final card generation.</p>
              </div>
            </div>
            ${dn.length===0?y`<p className="empty-state">No failed jobs.</p>`:y`
                  <div className="table-wrap">
                    <table className="console-table">
                      <thead>
                        <tr>
                          <th>job_id</th>
                          <th>theme</th>
                          <th>status</th>
                          <th>last_error</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${dn.map(k=>y`
                            <tr key=${k.job_id}>
                              <td><${Xe} className="job-link" to=${`/studio/${k.job_id}`}>${k.job_id}<//></td>
                              <td>${k.theme_name}</td>
                              <td><${De} value=${k.status} /></td>
                              <td>${Qo(k.last_error_message||"-",80)}</td>
                            </tr>
                          `)}
                      </tbody>
                    </table>
                  </div>
                `}
          </section>
        </section>

        ${O?y`
              <div className="modal-backdrop" onClick=${()=>I(!1)}>
                <section className="modal" onClick=${k=>k.stopPropagation()}>
                  <h2 className="section-title">Create New Card Job</h2>
                  <p className="section-copy">Starts a new card run with short, crisp copy defaults and opens Studio.</p>
                  <form onSubmit=${_}>
                    <div className="form-grid">
                      <div className="form-field full">
                        <label htmlFor="themeName">Theme Name</label>
                        <input
                          id="themeName"
                          value=${T.theme_name}
                          onInput=${k=>H("theme_name",k.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="audience">Audience</label>
                        <input
                          id="audience"
                          value=${T.audience}
                          onInput=${k=>H("audience",k.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="culturalContext">Cultural Context</label>
                        <input
                          id="culturalContext"
                          value=${T.cultural_context}
                          onInput=${k=>H("cultural_context",k.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="toneStyle">Tone Style</label>
                        <select
                          id="toneStyle"
                          value=${T.tone_style}
                          onChange=${k=>H("tone_style",k.target.value)}
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
                          value=${T.tone_funny_pct}
                          onInput=${k=>H("tone_funny_pct",k.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="emotionPct">Emotion %</label>
                        <input
                          id="emotionPct"
                          type="number"
                          min="0"
                          max="100"
                          value=${T.tone_emotion_pct}
                          onInput=${k=>H("tone_emotion_pct",k.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="copyStyle">Copy Style</label>
                        <select
                          id="copyStyle"
                          value=${T.copy_style}
                          onChange=${k=>H("copy_style",k.target.value)}
                        >
                          ${bs()}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="targetWords">Target Words</label>
                        <input
                          id="targetWords"
                          type="number"
                          min="4"
                          max="60"
                          value=${T.target_words}
                          onInput=${k=>H("target_words",k.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="cardsPerTheme">Cards Per Theme</label>
                        <input
                          id="cardsPerTheme"
                          type="number"
                          min="1"
                          max="50"
                          value=${T.cards_per_theme}
                          onInput=${k=>H("cards_per_theme",k.target.value)}
                        />
                      </div>
                      <div className="form-field full">
                        <p className="form-helper">Defaults target short one-line card copy. Use witty or playful for humor, heartfelt for emotional greetings.</p>
                      </div>
                      <div className="form-field full">
                        <label htmlFor="jobNotes">Notes</label>
                        <textarea
                          id="jobNotes"
                          rows="3"
                          value=${T.notes}
                          onInput=${k=>H("notes",k.target.value)}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button
                        type="button"
                        className="button"
                        onClick=${me}
                        disabled=${!re}
                      >
                        Use Today's Theme
                      </button>
                      <button type="submit" className="button primary" disabled=${G}>
                        ${G?"Creating...":"Create Job"}
                      </button>
                      <button type="button" className="button" onClick=${()=>I(!1)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}

        ${J?y`
              <div className="modal-backdrop" onClick=${()=>ee(!1)}>
                <section className="modal" onClick=${k=>k.stopPropagation()}>
                  <h2 className="section-title">${j==="manual"?"Generate From Theme":"Use Today's Theme"}</h2>
                  <p className="section-copy">
                    ${j==="manual"?"Start a workflow job from any selected Theme Factory record.":re?`Resolved theme: ${re.theme_name}`:"Use today's resolved theme."}
                  </p>
                  <form onSubmit=${ap}>
                    <div className="form-grid">
                      ${j==="manual"?y`
                            <div className="form-field full">
                              <label htmlFor="runThemeKey">Theme</label>
                              <select
                                id="runThemeKey"
                                value=${Q.theme_key}
                                onChange=${k=>op(k.target.value)}
                                required
                              >
                                ${W.map(k=>y`<option key=${k.id} value=${k.theme_key}>${k.theme_name}</option>`)}
                              </select>
                            </div>
                          `:null}
                      <div className="form-field">
                        <label htmlFor="runCopyStyle">Copy Style</label>
                        <select
                          id="runCopyStyle"
                          value=${Q.copy_style}
                          onChange=${k=>Z(A=>({...A,copy_style:k.target.value}))}
                        >
                          ${bs()}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="runTargetWords">Target Words</label>
                        <input
                          id="runTargetWords"
                          type="number"
                          min="4"
                          max="60"
                          value=${Q.target_words}
                          onInput=${k=>Z(A=>({...A,target_words:k.target.value}))}
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
                          value=${Q.tone_funny_pct}
                          onInput=${k=>Z(A=>({...A,tone_funny_pct:k.target.value}))}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="runCardsPerTheme">Cards Per Theme</label>
                        <input
                          id="runCardsPerTheme"
                          type="number"
                          min="1"
                          max="50"
                          value=${Q.cards_per_theme}
                          onInput=${k=>Z(A=>({...A,cards_per_theme:k.target.value}))}
                          required
                        />
                      </div>
                      <div className="form-field full">
                        <p className="form-helper">This starts a real card job from the selected theme and opens Studio for text, image, and final card control.</p>
                      </div>
                      <div className="form-field full">
                        <label htmlFor="runThemeNotes">Notes</label>
                        <textarea
                          id="runThemeNotes"
                          rows="3"
                          value=${Q.notes}
                          onInput=${k=>Z(A=>({...A,notes:k.target.value}))}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${V}>
                        ${V?"Creating...":j==="manual"?"Generate From Theme":"Use Today's Theme"}
                      </button>
                      <button type="button" className="button" onClick=${()=>ee(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}
      </section>
    `}function ny(){let e=At(),{jobId:t}=Ho(),[n,r]=(0,$.useState)(null),[a,o]=(0,$.useState)([]),[l,i]=(0,$.useState)([]),[s,u]=(0,$.useState)([]),[m,v]=(0,$.useState)([]),[h,E]=(0,$.useState)([]),[S,w]=(0,$.useState)(!1),[N,d]=(0,$.useState)(""),[c,f]=(0,$.useState)(""),[g,C]=(0,$.useState)(""),x=(0,$.useCallback)(async(b={})=>{if(!t)return;let V=!!b.quiet;V||w(!0),f("");try{let[pe,X,Fe,T,M]=await Promise.all([U(`/api/jobs/${t}`),U(`/api/jobs/${t}/assets`),U(`/api/jobs/${t}/events`),U(`/api/jobs/${t}/candidates`),U(`/api/jobs/${t}/shortlist`)]);r(pe||null),o(Array.isArray(X)?X:[]),i(Array.isArray(Fe)?Fe:[]);let Q=Array.isArray(T)?T:[],Z=Array.isArray(M)?M:[];u(Q),v(Z);let re=Z.filter(ot=>ot.is_selected).map(ot=>Number(ot.candidate_id)).filter(ot=>Number.isInteger(ot));E(re.length>0?re:Z[0]?[Number(Z[0].candidate_id)]:[])}catch(pe){f(pe.message||"Unable to load job detail")}finally{V||w(!1)}},[t]);(0,$.useEffect)(()=>{x()},[x]),(0,$.useEffect)(()=>{if(!t)return;let b=window.setInterval(()=>{document.visibilityState==="visible"&&x({quiet:!0})},1e4);return()=>window.clearInterval(b)},[t,x]);let L=(0,$.useMemo)(()=>{if(!n)return[];let b=Go(n),V=Array.isArray(n.shortlist)?n.shortlist.length>0:!!n.shortlist_count,pe=!!b.selected_text_candidate_id,X=Array.isArray(n.image_candidates)?n.image_candidates.length>0:!!n.image_candidate_count,Fe=!!(n.selected_image_candidate_id||n.selected_image_public_url),T=!!(n.final_preview_url||n.final_asset_urls&&n.final_asset_urls.png);return[{label:"current_stage",value:Jo(n)},{label:"text_candidates",value:V?"content_candidates_ready":"pending"},{label:"text_selection",value:pe?"text_selected":"pending"},{label:"image_candidates",value:X?"image_candidates_ready":"pending"},{label:"image_selection",value:Fe?"image_selected":"pending"},{label:"final_card",value:T?"final_card_ready":"pending"}]},[n]),P=(0,$.useMemo)(()=>n?Yo(n,a):[],[n,a]),O=fa(P),I=(0,$.useMemo)(()=>n?Yo({image_preview_url:n.image_preview_url,content_preview_url:n.content_preview_url},a.filter(b=>String(b?.asset_type||"").toLowerCase()==="image_preview")):[],[n,a]),J=fa(I),ee=(0,$.useMemo)(()=>a.filter(b=>String(b?.asset_type||"").toLowerCase()==="shortlist_preview").map((b,V)=>({label:`Shortlist Preview ${V+1}`,url:b.public_url||b.asset_url,source:`shortlist_preview:${V}`})).filter(b=>b.url),[a]);async function j(b,V,pe){if(t){d(b),f("");try{let X=await U(V,{method:"POST"});C(pe||`${X.job_id} updated`),await x()}catch(X){f(X.message||"Unable to update stage")}finally{d("")}}}function de(b,V){E(pe=>{let X=new Set(pe);return V?X.add(b):X.delete(b),Array.from(X)})}async function W(){if(t){d("render-shortlist"),f("");try{let b=await U(`/api/jobs/${t}/render-shortlist`,{method:"POST",body:JSON.stringify({candidate_ids:h})});C(`Rendered ${b.rendered_count} shortlist preview card(s)`),await x()}catch(b){f(b.message||"Unable to render shortlist")}finally{d("")}}}async function ve(){if(t){d("archive"),f("");try{let b=await U(`/api/jobs/${t}/archive`,{method:"POST"});C(`Job archived (${Ue(b.updated_at)})`),await x()}catch(b){f(b.message||"Unable to archive job")}finally{d("")}}}async function G(){if(!(!t||!window.confirm(`Delete ${t} and associated files?`))){d("delete"),f("");try{await U(`/api/jobs/${t}`,{method:"DELETE"}),e("/")}catch(V){f(V.message||"Unable to delete job")}finally{d("")}}}return y`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Jobs</p>
            <h1 className="page-title">Job Detail</h1>
            <p className="page-description">${t||"-"}</p>
          </div>
          <div className="inline-actions">
            <button className="button" type="button" onClick=${x} disabled=${S}>Refresh</button>
            <button
              className="button"
              type="button"
              onClick=${ve}
              disabled=${N==="archive"}
            >
              ${N==="archive"?"Archiving...":"Archive Job"}
            </button>
            <button
              className="button danger"
              type="button"
              onClick=${G}
              disabled=${N==="delete"}
            >
              ${N==="delete"?"Deleting...":"Delete Job + Files"}
            </button>
          </div>
        </header>

        ${c?y`<p className="status-line error">${c}</p>`:null}
        ${g?y`<p className="status-line">${g}</p>`:null}
        ${n?.last_error_message?y`<div className="status-panel error">Last stage error: ${n.last_error_message}</div>`:null}

        ${n?y`
              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Card Snapshot</h2>
                    <p className="section-copy">The selected text, selected image, and latest final card preview for this job.</p>
                  </div>
                  <div className="inline-actions">
                    <${Xe} to=${`/studio/${t}`} className="button-link">Open Studio<//>
                    <button
                      type="button"
                      className="button"
                      onClick=${()=>j("rerun-content",`/api/jobs/${t}/rerun/content`,`Text rerun for ${t}`)}
                      disabled=${N==="rerun-content"}
                    >
                      ${N==="rerun-content"?"Working...":"Regenerate Text"}
                    </button>
                    <button
                      type="button"
                      className="button"
                      onClick=${()=>j("rerun-image",`/api/jobs/${t}/rerun/image`,`Image rerun for ${t}`)}
                      disabled=${N==="rerun-image"}
                    >
                      ${N==="rerun-image"?"Working...":"Regenerate Image"}
                    </button>
                    <button
                      type="button"
                      className="button primary"
                      onClick=${()=>j("rerun-card",`/api/jobs/${t}/rerun/final-render`,`Card rerun for ${t}`)}
                      disabled=${N==="rerun-card"}
                    >
                      ${N==="rerun-card"?"Working...":"Regenerate Card"}
                    </button>
                  </div>
                </div>
                <div className="studio-current-grid">
                  <article className="key-card">
                    <p className="key-label">selected text</p>
                    <p className="studio-current-copy">${n.content_preview||"No text selected yet."}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">selected image</p>
                    ${J.currentCandidate?y`<img className="studio-current-image" src=${J.currentCandidate.url} alt="Selected image" loading="lazy" onError=${J.handleError} />`:y`<p className="empty-state compact">No image selected yet.</p>`}
                  </article>
                  <article className="key-card">
                    <p className="key-label">final card preview</p>
                    ${O.currentCandidate?y`<img className="studio-current-image" src=${O.currentCandidate.url} alt="Final card preview" loading="lazy" onError=${O.handleError} />`:y`<p className="empty-state compact">No final card rendered yet.</p>`}
                  </article>
                </div>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Stage and Status Breakdown</h2>
                    <p className="section-copy">Workflow state remains available here, but Studio is the primary operator surface.</p>
                  </div>
                  <${De} value=${n.status} />
                </div>
                <div className="key-value-grid">
                  ${L.map(b=>y`
                      <article className="key-card" key=${b.label}>
                        <p className="key-label">${b.label}</p>
                        <p className="key-value"><${De} value=${b.value} /></p>
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
                    <p className="key-value">${Ue(n.last_stage_started_at)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">last_stage_finished_at</p>
                    <p className="key-value">${Ue(n.last_stage_finished_at)}</p>
                  </article>
                </div>
                ${n.operator_notes?y`
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
                    <p className="section-copy">Approval is secondary here. The primary action is to rerun text if the card copy is not right.</p>
                  </div>
                  <${De} value=${n.content_approval_status||"pending"} />
                </div>
                ${n.content_preview?y`<div className="content-preview-block">${n.content_preview}</div>`:y`<p className="empty-state">No content preview stored yet.</p>`}
                <div className="inline-actions padded-actions">
                  <button
                    type="button"
                    className="button primary"
                    onClick=${()=>j("regenerate-content",`/api/jobs/${t}/regenerate-content`,`Content regenerated for ${t}`)}
                    disabled=${N==="regenerate-content"}
                  >
                    ${N==="regenerate-content"?"Working...":"Regenerate Text"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>j("approve-content",`/api/jobs/${t}/approve-content`,`Content approved for ${t}`)}
                    disabled=${N==="approve-content"||!n.content_preview}
                  >
                    ${N==="approve-content"?"Working...":"Approve Content"}
                  </button>
                  <button
                    type="button"
                    className="button danger"
                    onClick=${()=>j("reject-content",`/api/jobs/${t}/reject-content`,`Content rejected for ${t}`)}
                    disabled=${N==="reject-content"||!n.content_preview}
                  >
                    ${N==="reject-content"?"Working...":"Reject Content"}
                  </button>
                </div>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Image Review</h2>
                    <p className="section-copy">The main control here is to generate or rerun the image. Approval buttons remain available as operator overrides.</p>
                  </div>
                  <${De} value=${n.image_approval_status||"pending"} />
                </div>
                ${J.currentCandidate?y`
                      <div className="image-grid image-grid-single">
                        <article className="image-card">
                          <a href=${J.currentCandidate.url} target="_blank" rel="noreferrer">
                            <img
                              src=${J.currentCandidate.url}
                              alt="Image Preview"
                              loading="lazy"
                              onError=${J.handleError}
                            />
                          </a>
                          <p className="image-caption">Image Preview</p>
                        </article>
                      </div>
                    `:J.exhausted?y`<p className="empty-state">Preview unavailable.</p>`:y`<p className="empty-state">No image preview available yet.</p>`}
                <div className="inline-actions padded-actions">
                  <button
                    type="button"
                    className="button primary"
                    onClick=${()=>j("generate-image",`/api/jobs/${t}/generate-image`,`Image generated for ${t}`)}
                    disabled=${N==="generate-image"||n.content_approval_status!=="approved"}
                  >
                    ${N==="generate-image"?"Working...":"Generate Image"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>j("regenerate-image",`/api/jobs/${t}/regenerate-image`,`Image regenerated for ${t}`)}
                    disabled=${N==="regenerate-image"||n.content_approval_status!=="approved"}
                  >
                    ${N==="regenerate-image"?"Working...":"Regenerate Image"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>j("approve-image",`/api/jobs/${t}/approve-image`,`Image approved for ${t}`)}
                    disabled=${N==="approve-image"||!n.image_preview_url}
                  >
                    ${N==="approve-image"?"Working...":"Approve Image"}
                  </button>
                  <button
                    type="button"
                    className="button danger"
                    onClick=${()=>j("reject-image",`/api/jobs/${t}/reject-image`,`Image rejected for ${t}`)}
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
                    <p className="section-copy">Use rerun when the card layout or polish is off. Approval stays available below as a secondary control.</p>
                  </div>
                  <${De} value=${n.final_approval_status||"pending"} />
                </div>
                ${O.currentCandidate?y`
                      <div className="hero-preview">
                        <a href=${O.currentCandidate.url} target="_blank" rel="noreferrer">
                          <img
                            src=${O.currentCandidate.url}
                            alt=${n.theme_name||"Generated eCard"}
                            loading="lazy"
                            onError=${O.handleError}
                          />
                        </a>
                      </div>
                    `:O.exhausted?y`<p className="empty-state">Preview unavailable.</p>`:y`<p className="empty-state">No final card preview available yet.</p>`}
                <div className="inline-actions padded-actions">
                  <button
                    type="button"
                    className="button primary"
                    onClick=${()=>j("render-final",`/api/jobs/${t}/render-final`,`Final rendered for ${t}`)}
                    disabled=${N==="render-final"||n.image_approval_status!=="approved"}
                  >
                    ${N==="render-final"?"Working...":"Regenerate Card"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>j("approve-final",`/api/jobs/${t}/approve-final`,`Final approved for ${t}`)}
                    disabled=${N==="approve-final"||!n.final_preview_url}
                  >
                    ${N==="approve-final"?"Working...":"Approve Final"}
                  </button>
                  <button
                    type="button"
                    className="button danger"
                    onClick=${()=>j("reject-final",`/api/jobs/${t}/reject-final`,`Final rejected for ${t}`)}
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
                  ${l.length===0?y`<p className="empty-state">No lifecycle events found.</p>`:y`
                        <ul className="list-simple">
                          ${l.slice().reverse().map((b,V)=>y`
                                <li key=${`${b.event_type}_${V}`} className="list-item">
                                  <p className="event-type">${b.event_type}</p>
                                  <p className="event-meta">${Ue(b.created_at)}</p>
                                  ${Vf(b.event_payload_json)?y`<p className="event-meta">${Vf(b.event_payload_json)}</p>`:null}
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
                  ${a.length===0?y`<p className="empty-state">No assets saved for this job yet.</p>`:y`
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
                              ${a.map((b,V)=>y`
                                  <tr key=${`${b.asset_type}_${V}`}>
                                    <td>${b.asset_type}</td>
                                    <td>
                                      ${b.asset_url?y`<a className="job-link" href=${b.asset_url} target="_blank" rel="noreferrer">open</a>`:"-"}
                                    </td>
                                    <td><code>${b.relative_path||"-"}</code></td>
                                    <td><code>${b.absolute_path||"-"}</code></td>
                                    <td><${De} value=${b.approved?"approved":"pending"} /></td>
                                    <td>${Ue(b.created_at)}</td>
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
                  ${s.length===0?y`<p className="empty-state">No candidates stored for this job yet.</p>`:y`
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
                              ${s.map(b=>y`
                                  <tr key=${b.id||`${b.model}_${b.text}`}>
                                    <td>${b.model}</td>
                                    <td>${Number(b.raw_score||0).toFixed(3)}</td>
                                    <td>${Number(b.judged_score??b.judge_score??0).toFixed(3)}</td>
                                    <td><${De} value=${b.is_shortlisted?"shortlisted":"pooled"} /></td>
                                    <td><${De} value=${b.is_selected?"selected":"not_selected"} /></td>
                                    <td>${Qo(b.text||b.content_text,200)}</td>
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
                    <button type="button" className="button primary" onClick=${W} disabled=${N==="render-shortlist"||m.length===0}>
                      ${N==="render-shortlist"?"Rendering...":"Render Shortlist"}
                    </button>
                  </div>
                  ${m.length===0?y`<p className="empty-state">No shortlist available for this job yet.</p>`:y`
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
                              ${m.map(b=>y`
                                  <tr key=${b.candidate_id}>
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked=${h.includes(Number(b.candidate_id))}
                                        onChange=${V=>de(Number(b.candidate_id),V.target.checked)}
                                      />
                                    </td>
                                    <td>${b.rank}</td>
                                    <td>${b.model}</td>
                                    <td>${Number(b.score||0).toFixed(3)}</td>
                                    <td>${Qo(b.text,220)}</td>
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
                  ${P.length===0&&ee.length===0?y`<p className="empty-state">No preview variants available yet.</p>`:y`
                        <div className="image-grid">
                          ${[...P,...ee].map(b=>y`
                              <${Gv} key=${b.url} image=${b} />
                            `)}
                        </div>
                      `}
                </section>
              </details>
            `:y`<p className="empty-state">${S?"Loading job details...":"Job not found."}</p>`}
      </section>
    `}function ry(){let e=At(),[t,n]=(0,$.useState)([]),[r,a]=(0,$.useState)({week_schedule:[],month_schedule:[],active_overrides:[]}),[o,l]=(0,$.useState)(null),[i,s]=(0,$.useState)(!1),[u,m]=(0,$.useState)(""),[v,h]=(0,$.useState)(""),[E,S]=(0,$.useState)(""),[w,N]=(0,$.useState)(""),[d,c]=(0,$.useState)(!1),[f,g]=(0,$.useState)(!1),[C,x]=(0,$.useState)(!1),[L,P]=(0,$.useState)(!1),[O,I]=(0,$.useState)(null),[J,ee]=(0,$.useState)(null),[j,de]=(0,$.useState)({theme_key:"",theme_name:"",description:"",theme_bucket:"everyday",theme_type:"evergreen",cultural_context:"global",tone_style:"conversational",default_funny_pct:20,default_emotion_pct:80,default_audience:"general audience",default_visual_style:"minimal",is_active:!0,priority:0}),[W,ve]=(0,$.useState)({theme_id:"",schedule_type:"weekly_recurring",start_date:"",end_date:"",weekday_mask:"monday",month_mask:"",region:"",country:"",is_active:!0,priority:0,notes:""}),[G,b]=(0,$.useState)({theme_id:"",override_scope:"editorial",start_at:"",end_at:"",reason:"",force_top_priority:!0,created_by:"console_admin"}),[V,pe]=(0,$.useState)(ca()),X=o&&typeof o=="object"&&o.theme||null,Fe=(0,$.useMemo)(()=>t.reduce((p,_)=>{let H=String(_.theme_bucket||"everyday");return p[H]=(p[H]||0)+1,p},{everyday:0,occasion:0,current_event:0}),[t]),T=(0,$.useMemo)(()=>[{key:"everyday",title:"Everyday Themes",description:"Recurring weekday themes that keep the console stocked with steady daily runs.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="everyday")},{key:"occasion",title:"Occasion Themes",description:"Date-range and seasonal campaign themes such as Ramadan, Holi, and Valentine's Week.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="occasion")},{key:"current_event",title:"Current Event Themes",description:"Editorial and trend-driven themes that are intended to be activated through overrides.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="current_event")}],[t]);async function M(){s(!0),m(""),h("");let[p,_,H]=await Promise.allSettled([U("/api/themes"),U("/api/themes/today"),U("/api/themes/schedule")]);if(p.status==="fulfilled"){let me=Array.isArray(p.value)?p.value:[];n(me),me.length>0&&(ve(lt=>({...lt,theme_id:String(lt.theme_id||me[0].id)})),b(lt=>({...lt,theme_id:String(lt.theme_id||me[0].id)}))),me.length===0&&h("Theme schedule not configured yet")}else n([]),Tn(p.reason)?h("Theme schedule not configured yet"):m(Pn("theme catalog",p.reason));if(_.status==="fulfilled"?(l(_.value||null),_.value?.resolved===!1&&h(me=>me||_.value?.message||"No theme resolved yet")):(l(null),Tn(_.reason)?h(me=>me||"No theme resolved yet"):m(me=>me||Pn("today's theme",_.reason))),H.status==="fulfilled"){if(Array.isArray(H.value)){a({week_schedule:[],month_schedule:[],active_overrides:[]}),h(me=>me||"Theme schedule not configured yet"),s(!1);return}a({week_schedule:Array.isArray(H.value?.week_schedule)?H.value.week_schedule:[],month_schedule:Array.isArray(H.value?.month_schedule)?H.value.month_schedule:[],active_overrides:Array.isArray(H.value?.active_overrides)?H.value.active_overrides:[]})}else a({week_schedule:[],month_schedule:[],active_overrides:[]}),Tn(H.reason)?h(me=>me||"Theme schedule not configured yet"):m(me=>me||Pn("theme schedule",H.reason));s(!1)}(0,$.useEffect)(()=>{M()},[]);function Q(p=null){I(p?p.id:null),de({theme_key:p?.theme_key||"",theme_name:p?.theme_name||"",description:p?.description||"",theme_bucket:p?.theme_bucket||"everyday",theme_type:p?.theme_type||"evergreen",cultural_context:p?.cultural_context||"global",tone_style:p?.tone_style||"conversational",default_funny_pct:p?.default_funny_pct??20,default_emotion_pct:p?.default_emotion_pct??80,default_audience:p?.default_audience||"general audience",default_visual_style:p?.default_visual_style||"minimal",is_active:p?.is_active??!0,priority:p?.priority??0}),c(!0)}function Z(p=null){ee(p?p.id:null),ve({theme_id:String(p?.theme_id||t[0]?.id||""),schedule_type:p?.schedule_type||"weekly_recurring",start_date:Wf(p?.start_date),end_date:Wf(p?.end_date),weekday_mask:Array.isArray(p?.weekday_mask)?p.weekday_mask.join(", "):"monday",month_mask:Array.isArray(p?.month_mask)?p.month_mask.join(", "):"",region:p?.region||"",country:p?.country||"",is_active:p?.is_active??!0,priority:p?.priority??0,notes:p?.notes||""}),g(!0)}function re(p=null){let _=new Date,H=new Date(_.getTime()+1440*60*1e3);b({theme_id:String(p||X?.theme_id||t[0]?.id||""),override_scope:"editorial",start_at:Kf(_.toISOString()),end_at:Kf(H.toISOString()),reason:"",force_top_priority:!0,created_by:"console_admin"}),x(!0)}async function ot(p){p.preventDefault(),N("save-theme"),m("");try{let _={theme_key:String(j.theme_key||"").trim(),theme_name:String(j.theme_name||"").trim(),description:String(j.description||"").trim()||null,theme_bucket:j.theme_bucket,theme_type:j.theme_type,cultural_context:String(j.cultural_context||"").trim()||null,tone_style:String(j.tone_style||"").trim(),default_funny_pct:Number(j.default_funny_pct||0),default_emotion_pct:Number(j.default_emotion_pct||0),default_audience:String(j.default_audience||"").trim(),default_visual_style:String(j.default_visual_style||"").trim(),is_active:!!j.is_active,priority:Number(j.priority||0)},H=O?`/api/themes/${O}`:"/api/themes";await U(H,{method:O?"PUT":"POST",body:JSON.stringify(_)}),c(!1),S(O?"Theme updated":"Theme created"),await M()}catch(_){m(_.message||"Unable to save theme")}finally{N("")}}async function cn(p){if(window.confirm(`Deactivate theme ${p.theme_name}?`)){N(`delete-theme:${p.id}`),m("");try{await U(`/api/themes/${p.id}`,{method:"DELETE"}),S(`Theme deactivated: ${p.theme_name}`),await M()}catch(H){m(H.message||"Unable to delete theme")}finally{N("")}}}async function It(p){p.preventDefault(),N("save-schedule"),m("");try{let _={theme_id:Number(W.theme_id),schedule_type:W.schedule_type,start_date:W.start_date||null,end_date:W.end_date||null,weekday_mask:Hf(W.weekday_mask),month_mask:Hf(W.month_mask).map(lt=>Number(lt)).filter(lt=>Number.isInteger(lt)),region:String(W.region||"").trim()||null,country:String(W.country||"").trim()||null,is_active:!!W.is_active,priority:Number(W.priority||0),notes:String(W.notes||"").trim()||null},H=J?`/api/themes/schedule/${J}`:"/api/themes/schedule";await U(H,{method:J?"PUT":"POST",body:JSON.stringify(_)}),g(!1),S(J?"Schedule updated":"Schedule created"),await M()}catch(_){m(_.message||"Unable to save schedule")}finally{N("")}}async function dn(p){p.preventDefault(),N("save-override"),m("");try{let _={theme_id:Number(G.theme_id),override_scope:String(G.override_scope||"").trim(),start_at:new Date(G.start_at).toISOString(),end_at:new Date(G.end_at).toISOString(),reason:String(G.reason||"").trim()||null,force_top_priority:!!G.force_top_priority,created_by:String(G.created_by||"console_admin").trim()};await U("/api/themes/overrides",{method:"POST",body:JSON.stringify(_)}),x(!1),S("Override created"),await M()}catch(_){m(_.message||"Unable to save override")}finally{N("")}}async function dr(p){p&&p.preventDefault(),N("create-today-job"),m("");try{let _=await U("/api/jobs/create-daily-theme-job",{method:"POST",body:JSON.stringify(Zf(V))});P(!1);try{await Cs(_.job_id),S(`Created ${_.job_id} from today's theme and opened Studio`)}catch(H){S(`Created ${_.job_id} from today's theme. Studio follow-up is needed: ${H.message||"auto-build failed"}`)}e(`/studio/${_.job_id}`)}catch(_){m(_.message||"Unable to create today's themed job")}finally{N("")}}return y`
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
              onClick=${()=>{pe(ca(X)),P(!0)}}
              disabled=${w==="create-today-job"||!X}
            >
              ${w==="create-today-job"?"Creating...":"Use Today's Theme"}
            </button>
            <button type="button" className="button" onClick=${M} disabled=${i}>Refresh</button>
            <${Xe} to="/" className="button-link">Home<//>
          </div>
        </header>

        ${u?y`<div className="status-panel error">${u}</div>`:null}
        ${v?y`<div className="status-panel neutral">${v}</div>`:null}
        ${E?y`<p className="status-line">${E}</p>`:null}
        ${i?y`<div className="status-panel warning">Loading Theme Factory data...</div>`:null}

        <section className="cards-grid">
          <article className="summary-card">
            <p className="summary-label">Everyday Themes</p>
            <p className="summary-value">${Fe.everyday}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Occasion Themes</p>
            <p className="summary-value">${Fe.occasion}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Current Event Themes</p>
            <p className="summary-value">${Fe.current_event}</p>
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
          ${X?y`
                <div className="key-value-grid">
                  <article className="key-card">
                    <p className="key-label">Theme</p>
                    <p className="key-value">${X.theme_name}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Bucket</p>
                    <p className="key-value">${qf(X.theme_bucket)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Source</p>
                    <p className="key-value">${Se(o?.source)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Weekday</p>
                    <p className="key-value">${Se(o?.weekday)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Audience</p>
                    <p className="key-value">${X.audience}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Tone</p>
                    <p className="key-value">${X.tone_style}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Priority</p>
                    <p className="key-value">${X.priority}</p>
                  </article>
                </div>
              `:y`<p className="empty-state">No theme resolved yet.</p>`}
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Theme Catalog</h2>
              <p className="section-copy">Source themes are grouped by the three operational buckets used by Theme Factory resolution.</p>
            </div>
            <div className="inline-actions">
              <button type="button" className="button primary" onClick=${()=>Q()}>Add Theme</button>
            </div>
          </div>
          ${t.length===0?y`<p className="empty-state">No theme catalog entries found.</p>`:y`
                ${T.map(p=>y`
                    <section className="section-panel" key=${p.key}>
                      <div className="section-head">
                        <div>
                          <h3 className="section-title">${p.title}</h3>
                          <p className="section-copy">${p.description}</p>
                        </div>
                      </div>
                      ${p.items.length===0?y`<p className="empty-state">No ${p.title.toLowerCase()} configured.</p>`:y`
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
                                  ${p.items.map(_=>y`
                                      <tr key=${_.id}>
                                        <td><code>${_.theme_key}</code></td>
                                        <td>${_.theme_name}</td>
                                        <td>${Se(_.theme_type)}</td>
                                        <td>${_.default_audience}</td>
                                        <td>${_.default_visual_style}</td>
                                        <td>${_.priority}</td>
                                        <td><${De} value=${_.is_active?"active":"inactive"} /></td>
                                        <td>
                                          <div className="inline-actions">
                                            <button type="button" className="button" onClick=${()=>Q(_)}>Edit</button>
                                            <button
                                              type="button"
                                              className="button danger"
                                              onClick=${()=>cn(_)}
                                              disabled=${w===`delete-theme:${_.id}`}
                                            >
                                              ${w===`delete-theme:${_.id}`?"Deleting...":"Delete"}
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
              <button type="button" className="button primary" onClick=${()=>Z()}>Add Schedule</button>
            </div>
            ${r.week_schedule.length===0?y`<p className="empty-state">No week schedule found.</p>`:y`
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
                        ${r.week_schedule.map(p=>y`
                            <tr key=${`${p.plan_date}_${p.weekday}`}>
                              <td>${Ue(p.plan_date)}</td>
                              <td>${Se(p.weekday)}</td>
                              <td>${p.theme?.theme_name||"-"}</td>
                              <td>${Se(p.source)}</td>
                              <td>${Se(p.schedule_type)}</td>
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
              <button type="button" className="button primary" onClick=${()=>re()}>Add Override</button>
            </div>
            ${r.active_overrides.length===0?y`<p className="empty-state">No active overrides right now.</p>`:y`
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
                        ${r.active_overrides.map(p=>y`
                            <tr key=${p.id}>
                              <td>${p.theme_name||"-"}</td>
                              <td>${Se(p.override_scope)}</td>
                              <td>${Ue(p.start_at)} - ${Ue(p.end_at)}</td>
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
          ${r.month_schedule.length===0?y`<p className="empty-state">No monthly schedule rules found.</p>`:y`
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
                      ${r.month_schedule.map(p=>y`
                          <tr key=${p.id}>
                            <td>${p.theme_name||"-"}</td>
                            <td>${Se(p.schedule_type)}</td>
                            <td>${p.start_date?Ue(p.start_date):"-"}</td>
                            <td>${p.end_date?Ue(p.end_date):"-"}</td>
                            <td>${(p.weekday_mask||[]).join(", ")||"-"}</td>
                            <td>${p.priority}</td>
                            <td>
                              <button type="button" className="button" onClick=${()=>Z(p)}>
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

        ${L?y`
              <div className="modal-backdrop" onClick=${()=>P(!1)}>
                <section className="modal" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">Use Today's Theme</h2>
                  <p className="section-copy">
                    ${X?`Resolved theme: ${X.theme_name}`:"No theme resolved yet."}
                  </p>
                  <form onSubmit=${dr}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="todayCopyStyle">Copy Style</label>
                        <select
                          id="todayCopyStyle"
                          value=${V.copy_style}
                          onChange=${p=>pe(_=>({..._,copy_style:p.target.value}))}
                        >
                          ${bs()}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="todayTargetWords">Target Words</label>
                        <input
                          id="todayTargetWords"
                          type="number"
                          min="4"
                          max="60"
                          value=${V.target_words}
                          onInput=${p=>pe(_=>({..._,target_words:p.target.value}))}
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
                          value=${V.tone_funny_pct}
                          onInput=${p=>pe(_=>({..._,tone_funny_pct:p.target.value}))}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="todayCardsPerTheme">Cards Per Theme</label>
                        <input
                          id="todayCardsPerTheme"
                          type="number"
                          min="1"
                          max="50"
                          value=${V.cards_per_theme}
                          onInput=${p=>pe(_=>({..._,cards_per_theme:p.target.value}))}
                          required
                        />
                      </div>
                      <div className="form-field full">
                        <p className="form-helper">This launches a theme run directly into Studio with short card-copy defaults.</p>
                      </div>
                      <div className="form-field full">
                        <label htmlFor="todayThemeNotes">Notes</label>
                        <textarea
                          id="todayThemeNotes"
                          rows="3"
                          value=${V.notes}
                          onInput=${p=>pe(_=>({..._,notes:p.target.value}))}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${w==="create-today-job"||!X}>
                        ${w==="create-today-job"?"Creating...":"Use Today's Theme"}
                      </button>
                      <button type="button" className="button" onClick=${()=>P(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}

        ${d?y`
              <div className="modal-backdrop" onClick=${()=>c(!1)}>
                <section className="modal modal-wide" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">${O?"Edit Theme":"Add Theme"}</h2>
                  <form onSubmit=${ot}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="themeKey">Theme Key</label>
                        <input id="themeKey" value=${j.theme_key} onInput=${p=>de(_=>({..._,theme_key:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeNameFactory">Theme Name</label>
                        <input id="themeNameFactory" value=${j.theme_name} onInput=${p=>de(_=>({..._,theme_name:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeBucket">Theme Bucket</label>
                        <select id="themeBucket" value=${j.theme_bucket} onChange=${p=>de(_=>({..._,theme_bucket:p.target.value}))}>
                          <option value="everyday">everyday</option>
                          <option value="occasion">occasion</option>
                          <option value="current_event">current event</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeType">Theme Type</label>
                        <select id="themeType" value=${j.theme_type} onChange=${p=>de(_=>({..._,theme_type:p.target.value}))}>
                          <option value="evergreen">evergreen</option>
                          <option value="calendar">calendar</option>
                          <option value="campaign">campaign</option>
                          <option value="news">news</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeContext">Cultural Context</label>
                        <input id="themeContext" value=${j.cultural_context} onInput=${p=>de(_=>({..._,cultural_context:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeTone">Tone Style</label>
                        <input id="themeTone" value=${j.tone_style} onInput=${p=>de(_=>({..._,tone_style:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeAudience">Audience</label>
                        <input id="themeAudience" value=${j.default_audience} onInput=${p=>de(_=>({..._,default_audience:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeVisual">Visual Style</label>
                        <input id="themeVisual" value=${j.default_visual_style} onInput=${p=>de(_=>({..._,default_visual_style:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themePriority">Priority</label>
                        <input id="themePriority" type="number" value=${j.priority} onInput=${p=>de(_=>({..._,priority:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeFunny">Funny %</label>
                        <input id="themeFunny" type="number" min="0" max="100" value=${j.default_funny_pct} onInput=${p=>de(_=>({..._,default_funny_pct:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeEmotion">Emotion %</label>
                        <input id="themeEmotion" type="number" min="0" max="100" value=${j.default_emotion_pct} onInput=${p=>de(_=>({..._,default_emotion_pct:p.target.value}))} />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="themeDescription">Description</label>
                        <textarea id="themeDescription" rows="4" value=${j.description} onInput=${p=>de(_=>({..._,description:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${j.is_active} onChange=${p=>de(_=>({..._,is_active:p.target.checked}))} />
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

        ${f?y`
              <div className="modal-backdrop" onClick=${()=>g(!1)}>
                <section className="modal modal-wide" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">${J?"Edit Schedule":"Add Schedule"}</h2>
                  <form onSubmit=${It}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="scheduleTheme">Theme</label>
                        <select id="scheduleTheme" value=${W.theme_id} onChange=${p=>ve(_=>({..._,theme_id:p.target.value}))} required>
                          ${t.map(p=>y`<option key=${p.id} value=${p.id}>${p.theme_name}</option>`)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleType">Schedule Type</label>
                        <select id="scheduleType" value=${W.schedule_type} onChange=${p=>ve(_=>({..._,schedule_type:p.target.value}))}>
                          <option value="single_day">single_day</option>
                          <option value="date_range">date_range</option>
                          <option value="weekly_recurring">weekly_recurring</option>
                          <option value="monthly_recurring">monthly_recurring</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleStart">Start Date</label>
                        <input id="scheduleStart" type="date" value=${W.start_date} onInput=${p=>ve(_=>({..._,start_date:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleEnd">End Date</label>
                        <input id="scheduleEnd" type="date" value=${W.end_date} onInput=${p=>ve(_=>({..._,end_date:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="weekdayMask">Weekday Mask</label>
                        <input id="weekdayMask" value=${W.weekday_mask} onInput=${p=>ve(_=>({..._,weekday_mask:p.target.value}))} placeholder="monday, thursday" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="monthMask">Month Mask</label>
                        <input id="monthMask" value=${W.month_mask} onInput=${p=>ve(_=>({..._,month_mask:p.target.value}))} placeholder="2, 3, 8" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleRegion">Region</label>
                        <input id="scheduleRegion" value=${W.region} onInput=${p=>ve(_=>({..._,region:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleCountry">Country</label>
                        <input id="scheduleCountry" value=${W.country} onInput=${p=>ve(_=>({..._,country:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="schedulePriority">Priority</label>
                        <input id="schedulePriority" type="number" value=${W.priority} onInput=${p=>ve(_=>({..._,priority:p.target.value}))} />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="scheduleNotes">Notes</label>
                        <textarea id="scheduleNotes" rows="4" value=${W.notes} onInput=${p=>ve(_=>({..._,notes:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${W.is_active} onChange=${p=>ve(_=>({..._,is_active:p.target.checked}))} />
                        <span>Active schedule</span>
                      </label>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${w==="save-schedule"}>
                        ${w==="save-schedule"?"Saving...":"Save Schedule"}
                      </button>
                      <button type="button" className="button" onClick=${()=>g(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}

        ${C?y`
              <div className="modal-backdrop" onClick=${()=>x(!1)}>
                <section className="modal" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">Add Override</h2>
                  <form onSubmit=${dn}>
                    <div className="form-grid">
                      <div className="form-field full">
                        <label htmlFor="overrideTheme">Theme</label>
                        <select id="overrideTheme" value=${G.theme_id} onChange=${p=>b(_=>({..._,theme_id:p.target.value}))} required>
                          ${t.map(p=>y`<option key=${p.id} value=${p.id}>${p.theme_name}</option>`)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideScope">Scope</label>
                        <input id="overrideScope" value=${G.override_scope} onInput=${p=>b(_=>({..._,override_scope:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideBy">Created By</label>
                        <input id="overrideBy" value=${G.created_by} onInput=${p=>b(_=>({..._,created_by:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideStart">Start At</label>
                        <input id="overrideStart" type="datetime-local" value=${G.start_at} onInput=${p=>b(_=>({..._,start_at:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideEnd">End At</label>
                        <input id="overrideEnd" type="datetime-local" value=${G.end_at} onInput=${p=>b(_=>({..._,end_at:p.target.value}))} required />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="overrideReason">Reason</label>
                        <textarea id="overrideReason" rows="4" value=${G.reason} onInput=${p=>b(_=>({..._,reason:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${G.force_top_priority} onChange=${p=>b(_=>({..._,force_top_priority:p.target.checked}))} />
                        <span>Force top priority</span>
                      </label>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${w==="save-override"}>
                        ${w==="save-override"?"Saving...":"Save Override"}
                      </button>
                      <button type="button" className="button" onClick=${()=>x(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}
      </section>
    `}function Yf(){let e=At(),{jobId:t}=Ho(),[n,r]=(0,$.useState)([]),[a,o]=(0,$.useState)(null),[l,i]=(0,$.useState)([]),[s,u]=(0,$.useState)([]),[m,v]=(0,$.useState)([]),[h,E]=(0,$.useState)(null),[S,w]=(0,$.useState)(!1),[N,d]=(0,$.useState)(""),[c,f]=(0,$.useState)(""),[g,C]=(0,$.useState)(""),x=(0,$.useCallback)(async(T={})=>{let M=!!T.quiet;M||w(!0),d("");try{let Q=await U("/api/jobs?limit=50"),Z=Array.isArray(Q)?Q:[];if(r(Z),!t){o(null),i([]),u([]),v([]),E(null);return}let[re,ot,cn,It,dn]=await Promise.all([U(`/api/jobs/${t}`),U(`/api/jobs/${t}/assets`),U(`/api/jobs/${t}/candidates`),U(`/api/jobs/${t}/shortlist`),Qv(t)]);o(re||null),i(Array.isArray(ot)?ot:[]),u(Array.isArray(cn)?cn:[]),v(Array.isArray(It)?It:[]),E(dn||null)}catch(Q){d(Q.message||"Unable to load Studio")}finally{M||w(!1)}},[t]);(0,$.useEffect)(()=>{x()},[x]),(0,$.useEffect)(()=>{if(!t)return;let T=window.setInterval(()=>{document.visibilityState==="visible"&&x({quiet:!0})},1e4);return()=>window.clearInterval(T)},[t,x]);let L=(0,$.useMemo)(()=>Go(a||{}),[a]),P=(0,$.useMemo)(()=>Jo(a||{}),[a]),O=(0,$.useMemo)(()=>qv(a||{},s),[a,s]),I=(0,$.useMemo)(()=>Array.isArray(m)?m:[],[m]),J=(0,$.useMemo)(()=>np(h),[h]),ee=(0,$.useMemo)(()=>Zv(h),[h]),j=(0,$.useMemo)(()=>Xv(a||{},l),[a,l]),de=fa(j),W=!!O,ve=!!(O&&ee);async function G(T,M,Q,Z){C(T),d("");try{await M(),Q&&f(Q),await x(),typeof Z=="function"&&Z()}catch(re){d(re.message||"Studio action failed")}finally{C("")}}async function b(){if(!(!t||!window.confirm(`Delete ${t} and associated files?`))){C("delete"),d("");try{await U(`/api/jobs/${t}`,{method:"DELETE"}),e("/studio")}catch(M){d(M.message||"Unable to delete job")}finally{C("")}}}function V(T){if(!T){e("/studio");return}e(`/studio/${T}`)}function pe(){return a?y`
        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Text Options</h2>
              <p className="section-copy">Choose from the filtered shortlist only. Studio removes incomplete and duplicate text before it gets here.</p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button"
                onClick=${()=>G("regenerate-text",()=>U(`/api/jobs/${t}/regenerate-content`,{method:"POST"}),`Regenerated text for ${t}`)}
                disabled=${g==="regenerate-text"}
              >
                ${g==="regenerate-text"?"Working...":"Regenerate Text"}
              </button>
              <button
                type="button"
                className="button primary"
                onClick=${()=>G("more-text",()=>U(`/api/jobs/${t}/generate-more-text`,{method:"POST"}),`Generated 10 more text options for ${t}`)}
                disabled=${g==="more-text"}
              >
                ${g==="more-text"?"Working...":"Generate 10 More"}
              </button>
            </div>
          </div>
          <div className=${O?"status-panel success":"status-panel neutral"}>
            ${O?`Selected text candidate ${O.id}: ${O.text||O.content_text}`:"No text selected yet. Pick one of the shortlisted options below."}
          </div>
          ${I.length===0?y`<p className="empty-state">No usable text shortlist is available for this job yet.</p>`:y`
                <div className="studio-option-grid">
                  ${I.map(T=>{let M=Number(O?.id||0)===Number(T.candidate_id||0);return y`
                      <article key=${T.shortlist_id||T.candidate_id||`${T.model}_${T.text}`} className=${`studio-option-card ${M?"selected":""}`}>
                        <div className="studio-option-head">
                          <${De} value=${M?"text_selected":"content_candidates_ready"} />
                          <span className="score-chip">
                            rank ${T.rank} | score ${Number(T.score??0).toFixed(3)}
                          </span>
                        </div>
                        <p className="studio-option-text">${T.text}</p>
                        <div className="studio-meta-row">
                          <span className="mini-pill">candidate ${T.candidate_id}</span>
                          <span className="mini-pill">${T.model}</span>
                          <span className="mini-pill">${T.backend}</span>
                        </div>
                        <div className="inline-actions">
                          <button
                            type="button"
                            className=${M?"button":"button primary"}
                            onClick=${()=>G(`select-text:${T.candidate_id}`,()=>U(`/api/jobs/${t}/select-text`,{method:"POST",body:JSON.stringify({candidate_id:T.candidate_id})}),`Selected text option ${T.candidate_id} for ${t}`)}
                            disabled=${g===`select-text:${T.candidate_id}`||M}
                          >
                            ${g===`select-text:${T.candidate_id}`?"Working...":M?"Using This Text":"Use This Text"}
                          </button>
                        </div>
                      </article>
                    `})}
                </div>
              `}
        </section>
      `:null}function X(){if(!a)return null;let T=[h?.selected_image_candidate_id?`candidate ${h.selected_image_candidate_id}`:null,h?.selected_image_provider||null,h?.selected_image_model||null].filter(Boolean).join(" | ");return y`
        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Image Options</h2>
              <p className="section-copy">Generate ImageForge candidates, compare them, and choose one asset for final eCard composition.</p>
            </div>
            <div className="inline-actions">
              ${J.length===0?y`
                    <button
                      type="button"
                      className="button primary"
                      onClick=${()=>G("generate-image-assets",()=>U(`/api/jobs/${t}/image-assets/generate`,{method:"POST"}),`Generated image assets for ${t}`)}
                      disabled=${g==="generate-image-assets"||!W}
                    >
                      ${g==="generate-image-assets"?"Working...":"Generate Image Assets"}
                    </button>
                  `:y`
                    <button
                      type="button"
                      className="button primary"
                      onClick=${()=>G("regenerate-image-assets",()=>U(`/api/jobs/${t}/image-assets/regenerate`,{method:"POST"}),`Regenerated image assets for ${t}`)}
                      disabled=${g==="regenerate-image-assets"||!W}
                    >
                      ${g==="regenerate-image-assets"?"Working...":"Regenerate Image"}
                    </button>
                  `}
            </div>
          </div>
          <div className=${O?"status-panel neutral studio-selected-copy":"status-panel warning studio-selected-copy"}>
            ${O?`Selected text: ${O.text||O.content_text}`:"Select text first. Image generation should only run after text_selected is true."}
          </div>
          ${h?y`
                <div className="status-panel neutral studio-selected-copy">
                  Image request: ${Se(h.image_generation_status||"not_requested")}
                  ${h.image_generation_stage?` | provider stage: ${Se(h.image_generation_stage)}`:""}
                </div>
              `:null}
          <div className=${ee?"status-panel success studio-selected-copy":"status-panel neutral studio-selected-copy"}>
            ${ee?`Selected image: ${T||"saved locally"}`:"No image selected yet."}
          </div>
          ${J.length===0?y`<p className="empty-state">${W?"No image candidates yet. Use Generate Image Assets to create ImageForge options.":"No image candidates yet because there is no selected text."}</p>`:y`
                <div className="studio-image-grid">
                  ${J.map(M=>{let Q=ee&&ee.candidate_id===M.candidate_id;return y`
                      <article key=${M.key} className=${`studio-image-card ${Q?"selected":""}`}>
                        <a href=${M.url} target="_blank" rel="noreferrer">
                          <img src=${M.url} alt=${M.provider} loading="lazy" />
                        </a>
                        <div className="studio-image-body">
                          <div className="studio-meta-row">
                            <span className="mini-pill">${Se(M.provider)}</span>
                            <span className="mini-pill">${M.model||"Default Model"}</span>
                          </div>
                          <div className="studio-meta-row">
                            ${Qf(M.width,M.height)?y`<span className="mini-pill">${Qf(M.width,M.height)}</span>`:null}
                            <span className="mini-pill">${Ue(M.created_at)}</span>
                            <span className="mini-pill">${Q?"Selected":`Candidate ${M.candidate_index}`}</span>
                          </div>
                          <div className="studio-meta-row">
                            <span className="mini-pill">${M.relative_path||"No relative path"}</span>
                          </div>
                          <div className="inline-actions">
                            <button
                              type="button"
                              className=${Q?"button":"button primary"}
                              onClick=${()=>G(`select-image-asset:${M.candidate_id}`,()=>U(`/api/jobs/${t}/image-assets/${M.candidate_id}/select`,{method:"POST"}),`Selected image asset for ${t}`)}
                              disabled=${g===`select-image-asset:${M.candidate_id}`||Q}
                            >
                              ${g===`select-image-asset:${M.candidate_id}`?"Working...":Q?"Using This Image":"Use This Image"}
                            </button>
                          </div>
                        </div>
                      </article>
                    `})}
                </div>
              `}
        </section>
      `}function Fe(){if(!a)return null;let T=!!L.is_favorite,M=j.length>0?"Regenerate Final Card":"Render Final Card",Q=j.length>0?`/api/jobs/${t}/rerun/final-render`:`/api/jobs/${t}/render-final`;return y`
        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Final Card</h2>
              <p className="section-copy">Render the actual card preview from the selected text and selected image. Final composition stays inside eCardFactory.</p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button"
                onClick=${()=>G("favorite",()=>U(`/api/jobs/${t}/favorite`,{method:"POST",body:JSON.stringify({favorite:!T})}),T?`Removed ${t} from favorites`:`Marked ${t} as favorite`)}
                disabled=${g==="favorite"}
              >
                ${g==="favorite"?"Working...":T?"Unfavorite":"Mark Favorite"}
              </button>
              <button
                type="button"
                className="button primary"
                onClick=${()=>G("rerun-card",()=>U(Q,{method:"POST"}),`${M} completed for ${t}`)}
                disabled=${g==="rerun-card"||!ve}
              >
                ${g==="rerun-card"?"Working...":M}
              </button>
            </div>
          </div>
          <div className=${O?"status-panel success studio-selected-copy":"status-panel warning studio-selected-copy"}>
            ${O?`Text selected: ${O.text||O.content_text}`:"No selected text yet."}
          </div>
          <div className=${ee?"status-panel success studio-selected-copy":"status-panel warning studio-selected-copy"}>
            ${ee?`Image selected: ${h?.selected_image_candidate_id||ee.candidate_id} | ${h?.selected_image_provider||ee.provider} | ${h?.selected_image_model||ee.model||"Default Model"}`:"No selected image yet."}
          </div>
          ${j.length===0?y`
                <p className="empty-state">
                  ${ve?"No final card preview rendered yet. Render the current text + image selection.":"Select both text and image before rendering the final card preview."}
                </p>
              `:y`
                <div className="studio-final-grid">
                  ${j.map(Z=>y`
                    <article key=${Z.key} className="studio-final-card">
                      <a href=${Z.url} target="_blank" rel="noreferrer">
                        <img src=${Z.url} alt=${Z.label} loading="lazy" />
                      </a>
                      <div className="studio-image-body">
                        <div className="studio-meta-row">
                          <span className="mini-pill">${Z.label}</span>
                          <span className="mini-pill">${T?"Favorite":Se(ey(a))}</span>
                        </div>
                        <div className="ecard-actions">
                          <a href=${Z.url} target="_blank" rel="noreferrer" className="button-link">Open</a>
                          <button
                            type="button"
                            className="button"
                            onClick=${()=>G("favorite",()=>U(`/api/jobs/${t}/favorite`,{method:"POST",body:JSON.stringify({favorite:!T})}),T?`Removed ${t} from favorites`:`Marked ${t} as favorite`)}
                            disabled=${g==="favorite"}
                          >
                            ${T?"Unfavorite":"Mark Favorite"}
                          </button>
                          <button
                            type="button"
                            className="button"
                            onClick=${()=>G("archive",()=>U(`/api/jobs/${t}/archive`,{method:"POST"}),`Archived ${t}`)}
                            disabled=${g==="archive"||a.status==="archived"}
                          >
                            ${g==="archive"?"Archiving...":"Archive"}
                          </button>
                          <button
                            type="button"
                            className="button danger"
                            onClick=${b}
                            disabled=${g==="delete"}
                          >
                            ${g==="delete"?"Deleting...":"Delete"}
                          </button>
                        </div>
                      </div>
                    </article>
                  `)}
                </div>
              `}
        </section>
      `}return y`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Studio</p>
            <h1 className="page-title">eCard Studio</h1>
            <p className="page-description">
              Select text, select image, and rerun only the part of the card you want to change.
            </p>
          </div>
          <div className="inline-actions">
            ${n.length>0?y`
                  <label className="inline-select">
                    <span>Job</span>
                    <select value=${t||""} onChange=${T=>V(T.target.value)}>
                      <option value="">Choose job</option>
                      ${n.map(T=>y`
                        <option key=${T.job_id} value=${T.job_id}>${T.theme_name} | ${T.job_id}</option>
                      `)}
                    </select>
                  </label>
                `:null}
            <button type="button" className="button" onClick=${x} disabled=${S}>Refresh</button>
            ${t?y`<${Xe} to=${`/jobs/${t}`} className="button-link">Job Detail<//>`:null}
          </div>
        </header>

        ${N?y`<div className="status-panel error">${N}</div>`:null}
        ${c?y`<p className="status-line">${c}</p>`:null}
        ${S?y`<div className="status-panel warning">Loading Studio data...</div>`:null}

        ${t?a?y`
                <section className="section-panel">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">${a.theme_name}</h2>
                      <p className="section-copy">${a.job_id} | ${a.cards_per_theme||10} cards | ${ep(a?.output_spec?.format)} | backend status: ${Se(a.status)}</p>
                    </div>
                    <${De} value=${P} />
                  </div>
                  <div className="studio-current-grid">
                    <article className="key-card">
                      <p className="key-label">Current Stage</p>
                      <p className="studio-current-copy">${Se(P)}</p>
                      <p className="section-copy">${O?"Text is selected and locked for downstream steps.":"No text has been selected yet."}</p>
                    </article>
                    <article className="key-card">
                      <p className="key-label">Selected Text</p>
                      <p className="studio-current-copy">${O?.text||O?.content_text||"No text selected yet."}</p>
                      ${O?y`<p className="section-copy">candidate ${O.id} | ${O.model}</p>`:null}
                    </article>
                    <article className="key-card">
                      <p className="key-label">Selected Image</p>
                      ${ee?y`
                            <img className="studio-current-image" src=${ee.url} alt="Selected image" loading="lazy" />
                            <p className="section-copy">
                              ${h?.selected_image_candidate_id||ee.candidate_id}
                              ${h?.selected_image_provider?` | ${h.selected_image_provider}`:""}
                              ${h?.selected_image_model?` | ${h.selected_image_model}`:""}
                            </p>
                          `:y`<p className="empty-state compact">No image selected yet.</p>`}
                    </article>
                    <article className="key-card">
                      <p className="key-label">Final Card Preview</p>
                      ${de.currentCandidate?y`<img className="studio-current-image" src=${de.currentCandidate.url} alt="Final card" loading="lazy" onError=${de.handleError} />`:y`<p className="empty-state compact">No final card rendered yet.</p>`}
                    </article>
                  </div>
                </section>

                ${pe()}
                ${X()}
                ${Fe()}
              `:y`<p className="empty-state">Job not found.</p>`:y`
              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Pick a Job</h2>
                    <p className="section-copy">Open any recent job in Studio to control text, image, and final card generation.</p>
                  </div>
                </div>
                ${n.length===0?y`<p className="empty-state">No jobs available yet. Start from Home or Theme Factory.</p>`:y`
                      <div className="table-wrap">
                        <table className="console-table">
                          <thead>
                            <tr>
                              <th>job_id</th>
                              <th>theme</th>
                              <th>stage</th>
                              <th>updated</th>
                              <th>open</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${n.map(T=>y`
                              <tr key=${T.job_id}>
                                <td>${T.job_id}</td>
                                <td>${T.theme_name}</td>
                                <td><${De} value=${Jo(T)} /></td>
                                <td>${Ue(T.updated_at)}</td>
                                <td><${Xe} className="job-link" to=${`/studio/${T.job_id}`}>Open Studio<//></td>
                              </tr>
                            `)}
                          </tbody>
                        </table>
                      </div>
                    `}
              </section>
            `}
      </section>
    `}function ay(){let[e,t]=(0,$.useState)([]),[n,r]=(0,$.useState)(!1),[a,o]=(0,$.useState)(""),l=(0,$.useCallback)(async()=>{r(!0),o("");try{let i=await U("/api/jobs?limit=100");t(Array.isArray(i)?i:[])}catch(i){o(i.message||"Unable to load jobs")}finally{r(!1)}},[]);return(0,$.useEffect)(()=>{l()},[l]),y`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Jobs</p>
            <h1 className="page-title">All Jobs</h1>
            <p className="page-description">Workflow data is still available, but Studio is the primary place to control card output.</p>
          </div>
          <div className="inline-actions">
            <button type="button" className="button" onClick=${l} disabled=${n}>Refresh</button>
          </div>
        </header>

        ${a?y`<div className="status-panel error">${a}</div>`:null}
        ${n?y`<div className="status-panel warning">Loading jobs...</div>`:null}

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Jobs</h2>
              <p className="section-copy">Open Studio for operator control or Job Detail for audit-heavy troubleshooting.</p>
            </div>
          </div>
          ${e.length===0?y`<p className="empty-state">No jobs found.</p>`:y`
                <div className="table-wrap">
                  <table className="console-table">
                    <thead>
                      <tr>
                        <th>job_id</th>
                        <th>theme</th>
                        <th>status</th>
                        <th>stage</th>
                        <th>updated</th>
                        <th>actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${e.map(i=>y`
                        <tr key=${i.job_id}>
                          <td>${i.job_id}</td>
                          <td>${i.theme_name}</td>
                          <td><${De} value=${i.status} /></td>
                          <td>${Se(i.current_stage)}</td>
                          <td>${Ue(i.updated_at)}</td>
                          <td>
                            <div className="inline-actions">
                              <${Xe} className="button-link" to=${`/studio/${i.job_id}`}>Studio<//>
                              <${Xe} className="button-link" to=${`/jobs/${i.job_id}`}>Detail<//>
                            </div>
                          </td>
                        </tr>
                      `)}
                    </tbody>
                  </table>
                </div>
              `}
        </section>
      </section>
    `}function rp(){return y`
      <aside className="console-sidebar">
        <div className="sidebar-brand">
          <p className="brand-overline">eCardFactory</p>
          <p className="sidebar-brand-mark">ECF</p>
        </div>
        <nav className="sidebar-nav icon-only" aria-label="Primary">
          ${[{to:"/",label:"Home",icon:"home",end:!0},{to:"/themes",label:"Theme Factory",icon:"themes"},{to:"/studio",label:"Studio",icon:"studio"},{to:"/compare",label:"Compare Lab",icon:"compare"},{to:"/jobs",label:"Jobs",icon:"jobs"}].map(t=>y`
            <${If}
              key=${t.to}
              to=${t.to}
              end=${!!t.end}
              title=${t.label}
              data-tooltip=${t.label}
              className=${({isActive:n})=>n?"nav-link icon-link active":"nav-link icon-link"}
            >
              <span className="nav-icon"><${Mv} name=${t.icon} /></span>
              <span className="sr-only">${t.label}</span>
            <//>
          `)}
        </nav>
      </aside>
    `}function oy(){return y`
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
    `}function ly(){return y`
      <div className="console-layout">
        <${rp} />

        <main className="console-main">
          <${$s}>
            <${gt} path="/" element=${y`<${ty} />`} />
            <${gt} path="/themes" element=${y`<${ry} />`} />
            <${gt} path="/studio" element=${y`<${Yf} />`} />
            <${gt} path="/studio/:jobId" element=${y`<${Yf} />`} />
            <${gt} path="/compare" element=${y`<${oy} />`} />
            <${gt} path="/jobs" element=${y`<${ay} />`} />
            <${gt} path="/jobs/:jobId" element=${y`<${ny} />`} />
            <${gt} path="*" element=${y`<${Es} to="/" replace=${!0} />`} />
          <//>
        </main>
      </div>
    `}var xs=class extends $.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}componentDidCatch(t){da(`Frontend render error: ${t?.message||"unknown error"}. See browser console for details.`,t)}render(){return this.state.error?y`
        <div className="console-layout">
          <${rp} />
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
      `:this.props.children}};function iy(){return(0,$.useEffect)(()=>{Iv()},[]),null}function sy(){return y`
      <${Af}>
        <${xs}>
          <${iy} />
          <${ly} />
        <//>
      <//>
    `}window.addEventListener("error",e=>{e.error&&da(`Frontend runtime error: ${e.error.message||"unknown error"}.`,e.error)});window.addEventListener("unhandledrejection",e=>{da(`Unhandled async error: ${e.reason?.message||String(e.reason||"unknown")}`,e.reason)});var Gf=document.getElementById("root");if(!Gf)da("Frontend root element (#root) is missing in index.html.");else try{(0,Xf.createRoot)(Gf).render(y`<${sy} />`)}catch(e){da(`Unable to mount React root: ${e?.message||"unknown mount error"}`,e)}})();
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
