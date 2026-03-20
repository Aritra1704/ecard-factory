(()=>{var yp=Object.create;var As=Object.defineProperty;var gp=Object.getOwnPropertyDescriptor;var _p=Object.getOwnPropertyNames;var Np=Object.getPrototypeOf,wp=Object.prototype.hasOwnProperty;var pn=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Sp=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of _p(t))!wp.call(e,a)&&a!==n&&As(e,a,{get:()=>t[a],enumerable:!(r=gp(t,a))||r.enumerable});return e};var pr=(e,t,n)=>(n=e!=null?yp(Np(e)):{},Sp(t||!e||!e.__esModule?As(n,"default",{value:e,enumerable:!0}):n,e));var Qs=pn(z=>{"use strict";var mr=Symbol.for("react.element"),Ep=Symbol.for("react.portal"),kp=Symbol.for("react.fragment"),$p=Symbol.for("react.strict_mode"),Rp=Symbol.for("react.profiler"),bp=Symbol.for("react.provider"),Cp=Symbol.for("react.context"),xp=Symbol.for("react.forward_ref"),Pp=Symbol.for("react.suspense"),Tp=Symbol.for("react.memo"),Dp=Symbol.for("react.lazy"),Us=Symbol.iterator;function Fp(e){return e===null||typeof e!="object"?null:(e=Us&&e[Us]||e["@@iterator"],typeof e=="function"?e:null)}var Ms={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},zs=Object.assign,Bs={};function Fn(e,t,n){this.props=e,this.context=t,this.refs=Bs,this.updater=n||Ms}Fn.prototype.isReactComponent={};Fn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Fn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Vs(){}Vs.prototype=Fn.prototype;function Zl(e,t,n){this.props=e,this.context=t,this.refs=Bs,this.updater=n||Ms}var eo=Zl.prototype=new Vs;eo.constructor=Zl;zs(eo,Fn.prototype);eo.isPureReactComponent=!0;var Is=Array.isArray,Hs=Object.prototype.hasOwnProperty,to={current:null},Ws={key:!0,ref:!0,__self:!0,__source:!0};function Ks(e,t,n){var r,a={},l=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(l=""+t.key),t)Hs.call(t,r)&&!Ws.hasOwnProperty(r)&&(a[r]=t[r]);var i=arguments.length-2;if(i===1)a.children=n;else if(1<i){for(var s=Array(i),u=0;u<i;u++)s[u]=arguments[u+2];a.children=s}if(e&&e.defaultProps)for(r in i=e.defaultProps,i)a[r]===void 0&&(a[r]=i[r]);return{$$typeof:mr,type:e,key:l,ref:o,props:a,_owner:to.current}}function Lp(e,t){return{$$typeof:mr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function no(e){return typeof e=="object"&&e!==null&&e.$$typeof===mr}function Op(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var js=/\/+/g;function ql(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Op(""+e.key):t.toString(36)}function ya(e,t,n,r,a){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(l){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case mr:case Ep:o=!0}}if(o)return o=e,a=a(o),e=r===""?"."+ql(o,0):r,Is(a)?(n="",e!=null&&(n=e.replace(js,"$&/")+"/"),ya(a,t,n,"",function(u){return u})):a!=null&&(no(a)&&(a=Lp(a,n+(!a.key||o&&o.key===a.key?"":(""+a.key).replace(js,"$&/")+"/")+e)),t.push(a)),1;if(o=0,r=r===""?".":r+":",Is(e))for(var i=0;i<e.length;i++){l=e[i];var s=r+ql(l,i);o+=ya(l,t,n,s,a)}else if(s=Fp(e),typeof s=="function")for(e=s.call(e),i=0;!(l=e.next()).done;)l=l.value,s=r+ql(l,i++),o+=ya(l,t,n,s,a);else if(l==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function va(e,t,n){if(e==null)return e;var r=[],a=0;return ya(e,r,"","",function(l){return t.call(n,l,a++)}),r}function Ap(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Le={current:null},ga={transition:null},Up={ReactCurrentDispatcher:Le,ReactCurrentBatchConfig:ga,ReactCurrentOwner:to};function Js(){throw Error("act(...) is not supported in production builds of React.")}z.Children={map:va,forEach:function(e,t,n){va(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return va(e,function(){t++}),t},toArray:function(e){return va(e,function(t){return t})||[]},only:function(e){if(!no(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};z.Component=Fn;z.Fragment=kp;z.Profiler=Rp;z.PureComponent=Zl;z.StrictMode=$p;z.Suspense=Pp;z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Up;z.act=Js;z.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=zs({},e.props),a=e.key,l=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(l=t.ref,o=to.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(s in t)Hs.call(t,s)&&!Ws.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&i!==void 0?i[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){i=Array(s);for(var u=0;u<s;u++)i[u]=arguments[u+2];r.children=i}return{$$typeof:mr,type:e.type,key:a,ref:l,props:r,_owner:o}};z.createContext=function(e){return e={$$typeof:Cp,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:bp,_context:e},e.Consumer=e};z.createElement=Ks;z.createFactory=function(e){var t=Ks.bind(null,e);return t.type=e,t};z.createRef=function(){return{current:null}};z.forwardRef=function(e){return{$$typeof:xp,render:e}};z.isValidElement=no;z.lazy=function(e){return{$$typeof:Dp,_payload:{_status:-1,_result:e},_init:Ap}};z.memo=function(e,t){return{$$typeof:Tp,type:e,compare:t===void 0?null:t}};z.startTransition=function(e){var t=ga.transition;ga.transition={};try{e()}finally{ga.transition=t}};z.unstable_act=Js;z.useCallback=function(e,t){return Le.current.useCallback(e,t)};z.useContext=function(e){return Le.current.useContext(e)};z.useDebugValue=function(){};z.useDeferredValue=function(e){return Le.current.useDeferredValue(e)};z.useEffect=function(e,t){return Le.current.useEffect(e,t)};z.useId=function(){return Le.current.useId()};z.useImperativeHandle=function(e,t,n){return Le.current.useImperativeHandle(e,t,n)};z.useInsertionEffect=function(e,t){return Le.current.useInsertionEffect(e,t)};z.useLayoutEffect=function(e,t){return Le.current.useLayoutEffect(e,t)};z.useMemo=function(e,t){return Le.current.useMemo(e,t)};z.useReducer=function(e,t,n){return Le.current.useReducer(e,t,n)};z.useRef=function(e){return Le.current.useRef(e)};z.useState=function(e){return Le.current.useState(e)};z.useSyncExternalStore=function(e,t,n){return Le.current.useSyncExternalStore(e,t,n)};z.useTransition=function(){return Le.current.useTransition()};z.version="18.3.1"});var hr=pn((Sy,Ys)=>{"use strict";Ys.exports=Qs()});var lu=pn(te=>{"use strict";function oo(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<_a(a,t))e[r]=t,e[n]=a,n=r;else break e}}function it(e){return e.length===0?null:e[0]}function wa(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,a=e.length,l=a>>>1;r<l;){var o=2*(r+1)-1,i=e[o],s=o+1,u=e[s];if(0>_a(i,n))s<a&&0>_a(u,i)?(e[r]=u,e[s]=n,r=s):(e[r]=i,e[o]=n,r=o);else if(s<a&&0>_a(u,n))e[r]=u,e[s]=n,r=s;else break e}}return t}function _a(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Gs=performance,te.unstable_now=function(){return Gs.now()}):(ro=Date,Xs=ro.now(),te.unstable_now=function(){return ro.now()-Xs});var Gs,ro,Xs,_t=[],Mt=[],Ip=1,Xe=null,Re=3,Sa=!1,mn=!1,yr=!1,eu=typeof setTimeout=="function"?setTimeout:null,tu=typeof clearTimeout=="function"?clearTimeout:null,qs=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function io(e){for(var t=it(Mt);t!==null;){if(t.callback===null)wa(Mt);else if(t.startTime<=e)wa(Mt),t.sortIndex=t.expirationTime,oo(_t,t);else break;t=it(Mt)}}function so(e){if(yr=!1,io(e),!mn)if(it(_t)!==null)mn=!0,co(uo);else{var t=it(Mt);t!==null&&fo(so,t.startTime-e)}}function uo(e,t){mn=!1,yr&&(yr=!1,tu(gr),gr=-1),Sa=!0;var n=Re;try{for(io(t),Xe=it(_t);Xe!==null&&(!(Xe.expirationTime>t)||e&&!au());){var r=Xe.callback;if(typeof r=="function"){Xe.callback=null,Re=Xe.priorityLevel;var a=r(Xe.expirationTime<=t);t=te.unstable_now(),typeof a=="function"?Xe.callback=a:Xe===it(_t)&&wa(_t),io(t)}else wa(_t);Xe=it(_t)}if(Xe!==null)var l=!0;else{var o=it(Mt);o!==null&&fo(so,o.startTime-t),l=!1}return l}finally{Xe=null,Re=n,Sa=!1}}var Ea=!1,Na=null,gr=-1,nu=5,ru=-1;function au(){return!(te.unstable_now()-ru<nu)}function ao(){if(Na!==null){var e=te.unstable_now();ru=e;var t=!0;try{t=Na(!0,e)}finally{t?vr():(Ea=!1,Na=null)}}else Ea=!1}var vr;typeof qs=="function"?vr=function(){qs(ao)}:typeof MessageChannel<"u"?(lo=new MessageChannel,Zs=lo.port2,lo.port1.onmessage=ao,vr=function(){Zs.postMessage(null)}):vr=function(){eu(ao,0)};var lo,Zs;function co(e){Na=e,Ea||(Ea=!0,vr())}function fo(e,t){gr=eu(function(){e(te.unstable_now())},t)}te.unstable_IdlePriority=5;te.unstable_ImmediatePriority=1;te.unstable_LowPriority=4;te.unstable_NormalPriority=3;te.unstable_Profiling=null;te.unstable_UserBlockingPriority=2;te.unstable_cancelCallback=function(e){e.callback=null};te.unstable_continueExecution=function(){mn||Sa||(mn=!0,co(uo))};te.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):nu=0<e?Math.floor(1e3/e):5};te.unstable_getCurrentPriorityLevel=function(){return Re};te.unstable_getFirstCallbackNode=function(){return it(_t)};te.unstable_next=function(e){switch(Re){case 1:case 2:case 3:var t=3;break;default:t=Re}var n=Re;Re=t;try{return e()}finally{Re=n}};te.unstable_pauseExecution=function(){};te.unstable_requestPaint=function(){};te.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=Re;Re=e;try{return t()}finally{Re=n}};te.unstable_scheduleCallback=function(e,t,n){var r=te.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return a=n+a,e={id:Ip++,callback:t,priorityLevel:e,startTime:n,expirationTime:a,sortIndex:-1},n>r?(e.sortIndex=n,oo(Mt,e),it(_t)===null&&e===it(Mt)&&(yr?(tu(gr),gr=-1):yr=!0,fo(so,n-r))):(e.sortIndex=a,oo(_t,e),mn||Sa||(mn=!0,co(uo))),e};te.unstable_shouldYield=au;te.unstable_wrapCallback=function(e){var t=Re;return function(){var n=Re;Re=t;try{return e.apply(this,arguments)}finally{Re=n}}}});var iu=pn((ky,ou)=>{"use strict";ou.exports=lu()});var ff=pn(Ye=>{"use strict";var jp=hr(),Je=iu();function R(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var mc=new Set,Mr={};function bn(e,t){er(e,t),er(e+"Capture",t)}function er(e,t){for(Mr[e]=t,e=0;e<t.length;e++)mc.add(t[e])}var Tt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Oo=Object.prototype.hasOwnProperty,Mp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,su={},uu={};function zp(e){return Oo.call(uu,e)?!0:Oo.call(su,e)?!1:Mp.test(e)?uu[e]=!0:(su[e]=!0,!1)}function Bp(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Vp(e,t,n,r){if(t===null||typeof t>"u"||Bp(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ue(e,t,n,r,a,l,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=o}var $e={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){$e[e]=new Ue(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];$e[t]=new Ue(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){$e[e]=new Ue(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){$e[e]=new Ue(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){$e[e]=new Ue(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){$e[e]=new Ue(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){$e[e]=new Ue(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){$e[e]=new Ue(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){$e[e]=new Ue(e,5,!1,e.toLowerCase(),null,!1,!1)});var bi=/[\-:]([a-z])/g;function Ci(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(bi,Ci);$e[t]=new Ue(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(bi,Ci);$e[t]=new Ue(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(bi,Ci);$e[t]=new Ue(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){$e[e]=new Ue(e,1,!1,e.toLowerCase(),null,!1,!1)});$e.xlinkHref=new Ue("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){$e[e]=new Ue(e,1,!1,e.toLowerCase(),null,!0,!0)});function xi(e,t,n,r){var a=$e.hasOwnProperty(t)?$e[t]:null;(a!==null?a.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Vp(t,n,a,r)&&(n=null),r||a===null?zp(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(t=a.attributeName,r=a.attributeNamespace,n===null?e.removeAttribute(t):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Ot=jp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ka=Symbol.for("react.element"),An=Symbol.for("react.portal"),Un=Symbol.for("react.fragment"),Pi=Symbol.for("react.strict_mode"),Ao=Symbol.for("react.profiler"),hc=Symbol.for("react.provider"),vc=Symbol.for("react.context"),Ti=Symbol.for("react.forward_ref"),Uo=Symbol.for("react.suspense"),Io=Symbol.for("react.suspense_list"),Di=Symbol.for("react.memo"),Bt=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var yc=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var cu=Symbol.iterator;function _r(e){return e===null||typeof e!="object"?null:(e=cu&&e[cu]||e["@@iterator"],typeof e=="function"?e:null)}var ce=Object.assign,po;function br(e){if(po===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);po=t&&t[1]||""}return`
`+po+e}var mo=!1;function ho(e,t){if(!e||mo)return"";mo=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var a=u.stack.split(`
`),l=r.stack.split(`
`),o=a.length-1,i=l.length-1;1<=o&&0<=i&&a[o]!==l[i];)i--;for(;1<=o&&0<=i;o--,i--)if(a[o]!==l[i]){if(o!==1||i!==1)do if(o--,i--,0>i||a[o]!==l[i]){var s=`
`+a[o].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=o&&0<=i);break}}}finally{mo=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?br(e):""}function Hp(e){switch(e.tag){case 5:return br(e.type);case 16:return br("Lazy");case 13:return br("Suspense");case 19:return br("SuspenseList");case 0:case 2:case 15:return e=ho(e.type,!1),e;case 11:return e=ho(e.type.render,!1),e;case 1:return e=ho(e.type,!0),e;default:return""}}function jo(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Un:return"Fragment";case An:return"Portal";case Ao:return"Profiler";case Pi:return"StrictMode";case Uo:return"Suspense";case Io:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case vc:return(e.displayName||"Context")+".Consumer";case hc:return(e._context.displayName||"Context")+".Provider";case Ti:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Di:return t=e.displayName||null,t!==null?t:jo(e.type)||"Memo";case Bt:t=e._payload,e=e._init;try{return jo(e(t))}catch{}}return null}function Wp(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return jo(t);case 8:return t===Pi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function nn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function gc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Kp(e){var t=gc(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,l=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(o){r=""+o,l.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function $a(e){e._valueTracker||(e._valueTracker=Kp(e))}function _c(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=gc(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Za(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Mo(e,t){var n=t.checked;return ce({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function du(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=nn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Nc(e,t){t=t.checked,t!=null&&xi(e,"checked",t,!1)}function zo(e,t){Nc(e,t);var n=nn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Bo(e,t.type,n):t.hasOwnProperty("defaultValue")&&Bo(e,t.type,nn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function fu(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Bo(e,t,n){(t!=="number"||Za(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Cr=Array.isArray;function Qn(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+nn(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,r&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function Vo(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(R(91));return ce({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function pu(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(R(92));if(Cr(n)){if(1<n.length)throw Error(R(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:nn(n)}}function wc(e,t){var n=nn(t.value),r=nn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function mu(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Sc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ho(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Sc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ra,Ec=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,a)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ra=Ra||document.createElement("div"),Ra.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ra.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function zr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Tr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Jp=["Webkit","ms","Moz","O"];Object.keys(Tr).forEach(function(e){Jp.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Tr[t]=Tr[e]})});function kc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Tr.hasOwnProperty(e)&&Tr[e]?(""+t).trim():t+"px"}function $c(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,a=kc(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,a):e[n]=a}}var Qp=ce({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Wo(e,t){if(t){if(Qp[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(R(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(R(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(R(61))}if(t.style!=null&&typeof t.style!="object")throw Error(R(62))}}function Ko(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Jo=null;function Fi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Qo=null,Yn=null,Gn=null;function hu(e){if(e=la(e)){if(typeof Qo!="function")throw Error(R(280));var t=e.stateNode;t&&(t=bl(t),Qo(e.stateNode,e.type,t))}}function Rc(e){Yn?Gn?Gn.push(e):Gn=[e]:Yn=e}function bc(){if(Yn){var e=Yn,t=Gn;if(Gn=Yn=null,hu(e),t)for(e=0;e<t.length;e++)hu(t[e])}}function Cc(e,t){return e(t)}function xc(){}var vo=!1;function Pc(e,t,n){if(vo)return e(t,n);vo=!0;try{return Cc(e,t,n)}finally{vo=!1,(Yn!==null||Gn!==null)&&(xc(),bc())}}function Br(e,t){var n=e.stateNode;if(n===null)return null;var r=bl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(R(231,t,typeof n));return n}var Yo=!1;if(Tt)try{Ln={},Object.defineProperty(Ln,"passive",{get:function(){Yo=!0}}),window.addEventListener("test",Ln,Ln),window.removeEventListener("test",Ln,Ln)}catch{Yo=!1}var Ln;function Yp(e,t,n,r,a,l,o,i,s){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(m){this.onError(m)}}var Dr=!1,el=null,tl=!1,Go=null,Gp={onError:function(e){Dr=!0,el=e}};function Xp(e,t,n,r,a,l,o,i,s){Dr=!1,el=null,Yp.apply(Gp,arguments)}function qp(e,t,n,r,a,l,o,i,s){if(Xp.apply(this,arguments),Dr){if(Dr){var u=el;Dr=!1,el=null}else throw Error(R(198));tl||(tl=!0,Go=u)}}function Cn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Tc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function vu(e){if(Cn(e)!==e)throw Error(R(188))}function Zp(e){var t=e.alternate;if(!t){if(t=Cn(e),t===null)throw Error(R(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var l=a.alternate;if(l===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===l.child){for(l=a.child;l;){if(l===n)return vu(a),e;if(l===r)return vu(a),t;l=l.sibling}throw Error(R(188))}if(n.return!==r.return)n=a,r=l;else{for(var o=!1,i=a.child;i;){if(i===n){o=!0,n=a,r=l;break}if(i===r){o=!0,r=a,n=l;break}i=i.sibling}if(!o){for(i=l.child;i;){if(i===n){o=!0,n=l,r=a;break}if(i===r){o=!0,r=l,n=a;break}i=i.sibling}if(!o)throw Error(R(189))}}if(n.alternate!==r)throw Error(R(190))}if(n.tag!==3)throw Error(R(188));return n.stateNode.current===n?e:t}function Dc(e){return e=Zp(e),e!==null?Fc(e):null}function Fc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Fc(e);if(t!==null)return t;e=e.sibling}return null}var Lc=Je.unstable_scheduleCallback,yu=Je.unstable_cancelCallback,em=Je.unstable_shouldYield,tm=Je.unstable_requestPaint,he=Je.unstable_now,nm=Je.unstable_getCurrentPriorityLevel,Li=Je.unstable_ImmediatePriority,Oc=Je.unstable_UserBlockingPriority,nl=Je.unstable_NormalPriority,rm=Je.unstable_LowPriority,Ac=Je.unstable_IdlePriority,El=null,Et=null;function am(e){if(Et&&typeof Et.onCommitFiberRoot=="function")try{Et.onCommitFiberRoot(El,e,void 0,(e.current.flags&128)===128)}catch{}}var ft=Math.clz32?Math.clz32:im,lm=Math.log,om=Math.LN2;function im(e){return e>>>=0,e===0?32:31-(lm(e)/om|0)|0}var ba=64,Ca=4194304;function xr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function rl(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,a=e.suspendedLanes,l=e.pingedLanes,o=n&268435455;if(o!==0){var i=o&~a;i!==0?r=xr(i):(l&=o,l!==0&&(r=xr(l)))}else o=n&~a,o!==0?r=xr(o):l!==0&&(r=xr(l));if(r===0)return 0;if(t!==0&&t!==r&&(t&a)===0&&(a=r&-r,l=t&-t,a>=l||a===16&&(l&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-ft(t),a=1<<n,r|=e[n],t&=~a;return r}function sm(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function um(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,l=e.pendingLanes;0<l;){var o=31-ft(l),i=1<<o,s=a[o];s===-1?((i&n)===0||(i&r)!==0)&&(a[o]=sm(i,t)):s<=t&&(e.expiredLanes|=i),l&=~i}}function Xo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Uc(){var e=ba;return ba<<=1,(ba&4194240)===0&&(ba=64),e}function yo(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ra(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-ft(t),e[t]=n}function cm(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-ft(n),l=1<<a;t[a]=0,r[a]=-1,e[a]=-1,n&=~l}}function Oi(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ft(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}var X=0;function Ic(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var jc,Ai,Mc,zc,Bc,qo=!1,xa=[],Qt=null,Yt=null,Gt=null,Vr=new Map,Hr=new Map,Ht=[],dm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function gu(e,t){switch(e){case"focusin":case"focusout":Qt=null;break;case"dragenter":case"dragleave":Yt=null;break;case"mouseover":case"mouseout":Gt=null;break;case"pointerover":case"pointerout":Vr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Hr.delete(t.pointerId)}}function Nr(e,t,n,r,a,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:l,targetContainers:[a]},t!==null&&(t=la(t),t!==null&&Ai(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function fm(e,t,n,r,a){switch(t){case"focusin":return Qt=Nr(Qt,e,t,n,r,a),!0;case"dragenter":return Yt=Nr(Yt,e,t,n,r,a),!0;case"mouseover":return Gt=Nr(Gt,e,t,n,r,a),!0;case"pointerover":var l=a.pointerId;return Vr.set(l,Nr(Vr.get(l)||null,e,t,n,r,a)),!0;case"gotpointercapture":return l=a.pointerId,Hr.set(l,Nr(Hr.get(l)||null,e,t,n,r,a)),!0}return!1}function Vc(e){var t=yn(e.target);if(t!==null){var n=Cn(t);if(n!==null){if(t=n.tag,t===13){if(t=Tc(n),t!==null){e.blockedOn=t,Bc(e.priority,function(){Mc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Va(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Zo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Jo=r,n.target.dispatchEvent(r),Jo=null}else return t=la(n),t!==null&&Ai(t),e.blockedOn=n,!1;t.shift()}return!0}function _u(e,t,n){Va(e)&&n.delete(t)}function pm(){qo=!1,Qt!==null&&Va(Qt)&&(Qt=null),Yt!==null&&Va(Yt)&&(Yt=null),Gt!==null&&Va(Gt)&&(Gt=null),Vr.forEach(_u),Hr.forEach(_u)}function wr(e,t){e.blockedOn===t&&(e.blockedOn=null,qo||(qo=!0,Je.unstable_scheduleCallback(Je.unstable_NormalPriority,pm)))}function Wr(e){function t(a){return wr(a,e)}if(0<xa.length){wr(xa[0],e);for(var n=1;n<xa.length;n++){var r=xa[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Qt!==null&&wr(Qt,e),Yt!==null&&wr(Yt,e),Gt!==null&&wr(Gt,e),Vr.forEach(t),Hr.forEach(t),n=0;n<Ht.length;n++)r=Ht[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Ht.length&&(n=Ht[0],n.blockedOn===null);)Vc(n),n.blockedOn===null&&Ht.shift()}var Xn=Ot.ReactCurrentBatchConfig,al=!0;function mm(e,t,n,r){var a=X,l=Xn.transition;Xn.transition=null;try{X=1,Ui(e,t,n,r)}finally{X=a,Xn.transition=l}}function hm(e,t,n,r){var a=X,l=Xn.transition;Xn.transition=null;try{X=4,Ui(e,t,n,r)}finally{X=a,Xn.transition=l}}function Ui(e,t,n,r){if(al){var a=Zo(e,t,n,r);if(a===null)ko(e,t,r,ll,n),gu(e,r);else if(fm(a,e,t,n,r))r.stopPropagation();else if(gu(e,r),t&4&&-1<dm.indexOf(e)){for(;a!==null;){var l=la(a);if(l!==null&&jc(l),l=Zo(e,t,n,r),l===null&&ko(e,t,r,ll,n),l===a)break;a=l}a!==null&&r.stopPropagation()}else ko(e,t,r,null,n)}}var ll=null;function Zo(e,t,n,r){if(ll=null,e=Fi(r),e=yn(e),e!==null)if(t=Cn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Tc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ll=e,null}function Hc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(nm()){case Li:return 1;case Oc:return 4;case nl:case rm:return 16;case Ac:return 536870912;default:return 16}default:return 16}}var Kt=null,Ii=null,Ha=null;function Wc(){if(Ha)return Ha;var e,t=Ii,n=t.length,r,a="value"in Kt?Kt.value:Kt.textContent,l=a.length;for(e=0;e<n&&t[e]===a[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===a[l-r];r++);return Ha=a.slice(e,1<r?1-r:void 0)}function Wa(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Pa(){return!0}function Nu(){return!1}function Qe(e){function t(n,r,a,l,o){this._reactName=n,this._targetInst=a,this.type=r,this.nativeEvent=l,this.target=o,this.currentTarget=null;for(var i in e)e.hasOwnProperty(i)&&(n=e[i],this[i]=n?n(l):l[i]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?Pa:Nu,this.isPropagationStopped=Nu,this}return ce(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Pa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Pa)},persist:function(){},isPersistent:Pa}),t}var ir={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ji=Qe(ir),aa=ce({},ir,{view:0,detail:0}),vm=Qe(aa),go,_o,Sr,kl=ce({},aa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Mi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Sr&&(Sr&&e.type==="mousemove"?(go=e.screenX-Sr.screenX,_o=e.screenY-Sr.screenY):_o=go=0,Sr=e),go)},movementY:function(e){return"movementY"in e?e.movementY:_o}}),wu=Qe(kl),ym=ce({},kl,{dataTransfer:0}),gm=Qe(ym),_m=ce({},aa,{relatedTarget:0}),No=Qe(_m),Nm=ce({},ir,{animationName:0,elapsedTime:0,pseudoElement:0}),wm=Qe(Nm),Sm=ce({},ir,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Em=Qe(Sm),km=ce({},ir,{data:0}),Su=Qe(km),$m={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Rm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},bm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Cm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=bm[e])?!!t[e]:!1}function Mi(){return Cm}var xm=ce({},aa,{key:function(e){if(e.key){var t=$m[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Wa(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Rm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Mi,charCode:function(e){return e.type==="keypress"?Wa(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Wa(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Pm=Qe(xm),Tm=ce({},kl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Eu=Qe(Tm),Dm=ce({},aa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Mi}),Fm=Qe(Dm),Lm=ce({},ir,{propertyName:0,elapsedTime:0,pseudoElement:0}),Om=Qe(Lm),Am=ce({},kl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Um=Qe(Am),Im=[9,13,27,32],zi=Tt&&"CompositionEvent"in window,Fr=null;Tt&&"documentMode"in document&&(Fr=document.documentMode);var jm=Tt&&"TextEvent"in window&&!Fr,Kc=Tt&&(!zi||Fr&&8<Fr&&11>=Fr),ku=" ",$u=!1;function Jc(e,t){switch(e){case"keyup":return Im.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Qc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var In=!1;function Mm(e,t){switch(e){case"compositionend":return Qc(t);case"keypress":return t.which!==32?null:($u=!0,ku);case"textInput":return e=t.data,e===ku&&$u?null:e;default:return null}}function zm(e,t){if(In)return e==="compositionend"||!zi&&Jc(e,t)?(e=Wc(),Ha=Ii=Kt=null,In=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Kc&&t.locale!=="ko"?null:t.data;default:return null}}var Bm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ru(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Bm[e.type]:t==="textarea"}function Yc(e,t,n,r){Rc(r),t=ol(t,"onChange"),0<t.length&&(n=new ji("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Lr=null,Kr=null;function Vm(e){od(e,0)}function $l(e){var t=zn(e);if(_c(t))return e}function Hm(e,t){if(e==="change")return t}var Gc=!1;Tt&&(Tt?(Da="oninput"in document,Da||(wo=document.createElement("div"),wo.setAttribute("oninput","return;"),Da=typeof wo.oninput=="function"),Ta=Da):Ta=!1,Gc=Ta&&(!document.documentMode||9<document.documentMode));var Ta,Da,wo;function bu(){Lr&&(Lr.detachEvent("onpropertychange",Xc),Kr=Lr=null)}function Xc(e){if(e.propertyName==="value"&&$l(Kr)){var t=[];Yc(t,Kr,e,Fi(e)),Pc(Vm,t)}}function Wm(e,t,n){e==="focusin"?(bu(),Lr=t,Kr=n,Lr.attachEvent("onpropertychange",Xc)):e==="focusout"&&bu()}function Km(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return $l(Kr)}function Jm(e,t){if(e==="click")return $l(t)}function Qm(e,t){if(e==="input"||e==="change")return $l(t)}function Ym(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var mt=typeof Object.is=="function"?Object.is:Ym;function Jr(e,t){if(mt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!Oo.call(t,a)||!mt(e[a],t[a]))return!1}return!0}function Cu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function xu(e,t){var n=Cu(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Cu(n)}}function qc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?qc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Zc(){for(var e=window,t=Za();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Za(e.document)}return t}function Bi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Gm(e){var t=Zc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&qc(n.ownerDocument.documentElement,n)){if(r!==null&&Bi(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,l=Math.min(r.start,a);r=r.end===void 0?l:Math.min(r.end,a),!e.extend&&l>r&&(a=r,r=l,l=a),a=xu(n,l);var o=xu(n,r);a&&o&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),l>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Xm=Tt&&"documentMode"in document&&11>=document.documentMode,jn=null,ei=null,Or=null,ti=!1;function Pu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ti||jn==null||jn!==Za(r)||(r=jn,"selectionStart"in r&&Bi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Or&&Jr(Or,r)||(Or=r,r=ol(ei,"onSelect"),0<r.length&&(t=new ji("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=jn)))}function Fa(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Mn={animationend:Fa("Animation","AnimationEnd"),animationiteration:Fa("Animation","AnimationIteration"),animationstart:Fa("Animation","AnimationStart"),transitionend:Fa("Transition","TransitionEnd")},So={},ed={};Tt&&(ed=document.createElement("div").style,"AnimationEvent"in window||(delete Mn.animationend.animation,delete Mn.animationiteration.animation,delete Mn.animationstart.animation),"TransitionEvent"in window||delete Mn.transitionend.transition);function Rl(e){if(So[e])return So[e];if(!Mn[e])return e;var t=Mn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ed)return So[e]=t[n];return e}var td=Rl("animationend"),nd=Rl("animationiteration"),rd=Rl("animationstart"),ad=Rl("transitionend"),ld=new Map,Tu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function an(e,t){ld.set(e,t),bn(t,[e])}for(La=0;La<Tu.length;La++)Oa=Tu[La],Du=Oa.toLowerCase(),Fu=Oa[0].toUpperCase()+Oa.slice(1),an(Du,"on"+Fu);var Oa,Du,Fu,La;an(td,"onAnimationEnd");an(nd,"onAnimationIteration");an(rd,"onAnimationStart");an("dblclick","onDoubleClick");an("focusin","onFocus");an("focusout","onBlur");an(ad,"onTransitionEnd");er("onMouseEnter",["mouseout","mouseover"]);er("onMouseLeave",["mouseout","mouseover"]);er("onPointerEnter",["pointerout","pointerover"]);er("onPointerLeave",["pointerout","pointerover"]);bn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));bn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));bn("onBeforeInput",["compositionend","keypress","textInput","paste"]);bn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));bn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));bn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Pr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),qm=new Set("cancel close invalid load scroll toggle".split(" ").concat(Pr));function Lu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,qp(r,t,void 0,e),e.currentTarget=null}function od(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var l=void 0;if(t)for(var o=r.length-1;0<=o;o--){var i=r[o],s=i.instance,u=i.currentTarget;if(i=i.listener,s!==l&&a.isPropagationStopped())break e;Lu(a,i,u),l=s}else for(o=0;o<r.length;o++){if(i=r[o],s=i.instance,u=i.currentTarget,i=i.listener,s!==l&&a.isPropagationStopped())break e;Lu(a,i,u),l=s}}}if(tl)throw e=Go,tl=!1,Go=null,e}function ae(e,t){var n=t[oi];n===void 0&&(n=t[oi]=new Set);var r=e+"__bubble";n.has(r)||(id(t,e,2,!1),n.add(r))}function Eo(e,t,n){var r=0;t&&(r|=4),id(n,e,r,t)}var Aa="_reactListening"+Math.random().toString(36).slice(2);function Qr(e){if(!e[Aa]){e[Aa]=!0,mc.forEach(function(n){n!=="selectionchange"&&(qm.has(n)||Eo(n,!1,e),Eo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Aa]||(t[Aa]=!0,Eo("selectionchange",!1,t))}}function id(e,t,n,r){switch(Hc(t)){case 1:var a=mm;break;case 4:a=hm;break;default:a=Ui}n=a.bind(null,t,n,e),a=void 0,!Yo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),r?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function ko(e,t,n,r,a){var l=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var i=r.stateNode.containerInfo;if(i===a||i.nodeType===8&&i.parentNode===a)break;if(o===4)for(o=r.return;o!==null;){var s=o.tag;if((s===3||s===4)&&(s=o.stateNode.containerInfo,s===a||s.nodeType===8&&s.parentNode===a))return;o=o.return}for(;i!==null;){if(o=yn(i),o===null)return;if(s=o.tag,s===5||s===6){r=l=o;continue e}i=i.parentNode}}r=r.return}Pc(function(){var u=l,m=Fi(n),v=[];e:{var h=ld.get(e);if(h!==void 0){var S=ji,k=e;switch(e){case"keypress":if(Wa(n)===0)break e;case"keydown":case"keyup":S=Pm;break;case"focusin":k="focus",S=No;break;case"focusout":k="blur",S=No;break;case"beforeblur":case"afterblur":S=No;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":S=wu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":S=gm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":S=Fm;break;case td:case nd:case rd:S=wm;break;case ad:S=Om;break;case"scroll":S=vm;break;case"wheel":S=Um;break;case"copy":case"cut":case"paste":S=Em;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":S=Eu}var w=(t&4)!==0,_=!w&&e==="scroll",d=w?h!==null?h+"Capture":null:h;w=[];for(var c=u,f;c!==null;){f=c;var g=f.stateNode;if(f.tag===5&&g!==null&&(f=g,d!==null&&(g=Br(c,d),g!=null&&w.push(Yr(c,g,f)))),_)break;c=c.return}0<w.length&&(h=new S(h,k,null,n,m),v.push({event:h,listeners:w}))}}if((t&7)===0){e:{if(h=e==="mouseover"||e==="pointerover",S=e==="mouseout"||e==="pointerout",h&&n!==Jo&&(k=n.relatedTarget||n.fromElement)&&(yn(k)||k[Dt]))break e;if((S||h)&&(h=m.window===m?m:(h=m.ownerDocument)?h.defaultView||h.parentWindow:window,S?(k=n.relatedTarget||n.toElement,S=u,k=k?yn(k):null,k!==null&&(_=Cn(k),k!==_||k.tag!==5&&k.tag!==6)&&(k=null)):(S=null,k=u),S!==k)){if(w=wu,g="onMouseLeave",d="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(w=Eu,g="onPointerLeave",d="onPointerEnter",c="pointer"),_=S==null?h:zn(S),f=k==null?h:zn(k),h=new w(g,c+"leave",S,n,m),h.target=_,h.relatedTarget=f,g=null,yn(m)===u&&(w=new w(d,c+"enter",k,n,m),w.target=f,w.relatedTarget=_,g=w),_=g,S&&k)t:{for(w=S,d=k,c=0,f=w;f;f=On(f))c++;for(f=0,g=d;g;g=On(g))f++;for(;0<c-f;)w=On(w),c--;for(;0<f-c;)d=On(d),f--;for(;c--;){if(w===d||d!==null&&w===d.alternate)break t;w=On(w),d=On(d)}w=null}else w=null;S!==null&&Ou(v,h,S,w,!1),k!==null&&_!==null&&Ou(v,_,k,w,!0)}}e:{if(h=u?zn(u):window,S=h.nodeName&&h.nodeName.toLowerCase(),S==="select"||S==="input"&&h.type==="file")var C=Hm;else if(Ru(h))if(Gc)C=Qm;else{C=Km;var x=Wm}else(S=h.nodeName)&&S.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(C=Jm);if(C&&(C=C(e,u))){Yc(v,C,n,m);break e}x&&x(e,h,u),e==="focusout"&&(x=h._wrapperState)&&x.controlled&&h.type==="number"&&Bo(h,"number",h.value)}switch(x=u?zn(u):window,e){case"focusin":(Ru(x)||x.contentEditable==="true")&&(jn=x,ei=u,Or=null);break;case"focusout":Or=ei=jn=null;break;case"mousedown":ti=!0;break;case"contextmenu":case"mouseup":case"dragend":ti=!1,Pu(v,n,m);break;case"selectionchange":if(Xm)break;case"keydown":case"keyup":Pu(v,n,m)}var L;if(zi)e:{switch(e){case"compositionstart":var D="onCompositionStart";break e;case"compositionend":D="onCompositionEnd";break e;case"compositionupdate":D="onCompositionUpdate";break e}D=void 0}else In?Jc(e,n)&&(D="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(D="onCompositionStart");D&&(Kc&&n.locale!=="ko"&&(In||D!=="onCompositionStart"?D==="onCompositionEnd"&&In&&(L=Wc()):(Kt=m,Ii="value"in Kt?Kt.value:Kt.textContent,In=!0)),x=ol(u,D),0<x.length&&(D=new Su(D,e,null,n,m),v.push({event:D,listeners:x}),L?D.data=L:(L=Qc(n),L!==null&&(D.data=L)))),(L=jm?Mm(e,n):zm(e,n))&&(u=ol(u,"onBeforeInput"),0<u.length&&(m=new Su("onBeforeInput","beforeinput",null,n,m),v.push({event:m,listeners:u}),m.data=L))}od(v,t)})}function Yr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function ol(e,t){for(var n=t+"Capture",r=[];e!==null;){var a=e,l=a.stateNode;a.tag===5&&l!==null&&(a=l,l=Br(e,n),l!=null&&r.unshift(Yr(e,l,a)),l=Br(e,t),l!=null&&r.push(Yr(e,l,a))),e=e.return}return r}function On(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ou(e,t,n,r,a){for(var l=t._reactName,o=[];n!==null&&n!==r;){var i=n,s=i.alternate,u=i.stateNode;if(s!==null&&s===r)break;i.tag===5&&u!==null&&(i=u,a?(s=Br(n,l),s!=null&&o.unshift(Yr(n,s,i))):a||(s=Br(n,l),s!=null&&o.push(Yr(n,s,i)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Zm=/\r\n?/g,eh=/\u0000|\uFFFD/g;function Au(e){return(typeof e=="string"?e:""+e).replace(Zm,`
`).replace(eh,"")}function Ua(e,t,n){if(t=Au(t),Au(e)!==t&&n)throw Error(R(425))}function il(){}var ni=null,ri=null;function ai(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var li=typeof setTimeout=="function"?setTimeout:void 0,th=typeof clearTimeout=="function"?clearTimeout:void 0,Uu=typeof Promise=="function"?Promise:void 0,nh=typeof queueMicrotask=="function"?queueMicrotask:typeof Uu<"u"?function(e){return Uu.resolve(null).then(e).catch(rh)}:li;function rh(e){setTimeout(function(){throw e})}function $o(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(r===0){e.removeChild(a),Wr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=a}while(n);Wr(t)}function Xt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Iu(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var sr=Math.random().toString(36).slice(2),St="__reactFiber$"+sr,Gr="__reactProps$"+sr,Dt="__reactContainer$"+sr,oi="__reactEvents$"+sr,ah="__reactListeners$"+sr,lh="__reactHandles$"+sr;function yn(e){var t=e[St];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Dt]||n[St]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Iu(e);e!==null;){if(n=e[St])return n;e=Iu(e)}return t}e=n,n=e.parentNode}return null}function la(e){return e=e[St]||e[Dt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function zn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(R(33))}function bl(e){return e[Gr]||null}var ii=[],Bn=-1;function ln(e){return{current:e}}function le(e){0>Bn||(e.current=ii[Bn],ii[Bn]=null,Bn--)}function ne(e,t){Bn++,ii[Bn]=e.current,e.current=t}var rn={},Pe=ln(rn),ze=ln(!1),Sn=rn;function tr(e,t){var n=e.type.contextTypes;if(!n)return rn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a={},l;for(l in n)a[l]=t[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function Be(e){return e=e.childContextTypes,e!=null}function sl(){le(ze),le(Pe)}function ju(e,t,n){if(Pe.current!==rn)throw Error(R(168));ne(Pe,t),ne(ze,n)}function sd(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var a in r)if(!(a in t))throw Error(R(108,Wp(e)||"Unknown",a));return ce({},n,r)}function ul(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||rn,Sn=Pe.current,ne(Pe,e),ne(ze,ze.current),!0}function Mu(e,t,n){var r=e.stateNode;if(!r)throw Error(R(169));n?(e=sd(e,t,Sn),r.__reactInternalMemoizedMergedChildContext=e,le(ze),le(Pe),ne(Pe,e)):le(ze),ne(ze,n)}var bt=null,Cl=!1,Ro=!1;function ud(e){bt===null?bt=[e]:bt.push(e)}function oh(e){Cl=!0,ud(e)}function on(){if(!Ro&&bt!==null){Ro=!0;var e=0,t=X;try{var n=bt;for(X=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}bt=null,Cl=!1}catch(a){throw bt!==null&&(bt=bt.slice(e+1)),Lc(Li,on),a}finally{X=t,Ro=!1}}return null}var Vn=[],Hn=0,cl=null,dl=0,qe=[],Ze=0,En=null,Ct=1,xt="";function hn(e,t){Vn[Hn++]=dl,Vn[Hn++]=cl,cl=e,dl=t}function cd(e,t,n){qe[Ze++]=Ct,qe[Ze++]=xt,qe[Ze++]=En,En=e;var r=Ct;e=xt;var a=32-ft(r)-1;r&=~(1<<a),n+=1;var l=32-ft(t)+a;if(30<l){var o=a-a%5;l=(r&(1<<o)-1).toString(32),r>>=o,a-=o,Ct=1<<32-ft(t)+a|n<<a|r,xt=l+e}else Ct=1<<l|n<<a|r,xt=e}function Vi(e){e.return!==null&&(hn(e,1),cd(e,1,0))}function Hi(e){for(;e===cl;)cl=Vn[--Hn],Vn[Hn]=null,dl=Vn[--Hn],Vn[Hn]=null;for(;e===En;)En=qe[--Ze],qe[Ze]=null,xt=qe[--Ze],qe[Ze]=null,Ct=qe[--Ze],qe[Ze]=null}var Ke=null,We=null,ie=!1,dt=null;function dd(e,t){var n=et(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function zu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ke=e,We=Xt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ke=e,We=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=En!==null?{id:Ct,overflow:xt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=et(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ke=e,We=null,!0):!1;default:return!1}}function si(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ui(e){if(ie){var t=We;if(t){var n=t;if(!zu(e,t)){if(si(e))throw Error(R(418));t=Xt(n.nextSibling);var r=Ke;t&&zu(e,t)?dd(r,n):(e.flags=e.flags&-4097|2,ie=!1,Ke=e)}}else{if(si(e))throw Error(R(418));e.flags=e.flags&-4097|2,ie=!1,Ke=e}}}function Bu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ke=e}function Ia(e){if(e!==Ke)return!1;if(!ie)return Bu(e),ie=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!ai(e.type,e.memoizedProps)),t&&(t=We)){if(si(e))throw fd(),Error(R(418));for(;t;)dd(e,t),t=Xt(t.nextSibling)}if(Bu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(R(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){We=Xt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}We=null}}else We=Ke?Xt(e.stateNode.nextSibling):null;return!0}function fd(){for(var e=We;e;)e=Xt(e.nextSibling)}function nr(){We=Ke=null,ie=!1}function Wi(e){dt===null?dt=[e]:dt.push(e)}var ih=Ot.ReactCurrentBatchConfig;function Er(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(R(309));var r=n.stateNode}if(!r)throw Error(R(147,e));var a=r,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(o){var i=a.refs;o===null?delete i[l]:i[l]=o},t._stringRef=l,t)}if(typeof e!="string")throw Error(R(284));if(!n._owner)throw Error(R(290,e))}return e}function ja(e,t){throw e=Object.prototype.toString.call(t),Error(R(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Vu(e){var t=e._init;return t(e._payload)}function pd(e){function t(d,c){if(e){var f=d.deletions;f===null?(d.deletions=[c],d.flags|=16):f.push(c)}}function n(d,c){if(!e)return null;for(;c!==null;)t(d,c),c=c.sibling;return null}function r(d,c){for(d=new Map;c!==null;)c.key!==null?d.set(c.key,c):d.set(c.index,c),c=c.sibling;return d}function a(d,c){return d=tn(d,c),d.index=0,d.sibling=null,d}function l(d,c,f){return d.index=f,e?(f=d.alternate,f!==null?(f=f.index,f<c?(d.flags|=2,c):f):(d.flags|=2,c)):(d.flags|=1048576,c)}function o(d){return e&&d.alternate===null&&(d.flags|=2),d}function i(d,c,f,g){return c===null||c.tag!==6?(c=Fo(f,d.mode,g),c.return=d,c):(c=a(c,f),c.return=d,c)}function s(d,c,f,g){var C=f.type;return C===Un?m(d,c,f.props.children,g,f.key):c!==null&&(c.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===Bt&&Vu(C)===c.type)?(g=a(c,f.props),g.ref=Er(d,c,f),g.return=d,g):(g=qa(f.type,f.key,f.props,null,d.mode,g),g.ref=Er(d,c,f),g.return=d,g)}function u(d,c,f,g){return c===null||c.tag!==4||c.stateNode.containerInfo!==f.containerInfo||c.stateNode.implementation!==f.implementation?(c=Lo(f,d.mode,g),c.return=d,c):(c=a(c,f.children||[]),c.return=d,c)}function m(d,c,f,g,C){return c===null||c.tag!==7?(c=wn(f,d.mode,g,C),c.return=d,c):(c=a(c,f),c.return=d,c)}function v(d,c,f){if(typeof c=="string"&&c!==""||typeof c=="number")return c=Fo(""+c,d.mode,f),c.return=d,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case ka:return f=qa(c.type,c.key,c.props,null,d.mode,f),f.ref=Er(d,null,c),f.return=d,f;case An:return c=Lo(c,d.mode,f),c.return=d,c;case Bt:var g=c._init;return v(d,g(c._payload),f)}if(Cr(c)||_r(c))return c=wn(c,d.mode,f,null),c.return=d,c;ja(d,c)}return null}function h(d,c,f,g){var C=c!==null?c.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return C!==null?null:i(d,c,""+f,g);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case ka:return f.key===C?s(d,c,f,g):null;case An:return f.key===C?u(d,c,f,g):null;case Bt:return C=f._init,h(d,c,C(f._payload),g)}if(Cr(f)||_r(f))return C!==null?null:m(d,c,f,g,null);ja(d,f)}return null}function S(d,c,f,g,C){if(typeof g=="string"&&g!==""||typeof g=="number")return d=d.get(f)||null,i(c,d,""+g,C);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case ka:return d=d.get(g.key===null?f:g.key)||null,s(c,d,g,C);case An:return d=d.get(g.key===null?f:g.key)||null,u(c,d,g,C);case Bt:var x=g._init;return S(d,c,f,x(g._payload),C)}if(Cr(g)||_r(g))return d=d.get(f)||null,m(c,d,g,C,null);ja(c,g)}return null}function k(d,c,f,g){for(var C=null,x=null,L=c,D=c=0,O=null;L!==null&&D<f.length;D++){L.index>D?(O=L,L=null):O=L.sibling;var I=h(d,L,f[D],g);if(I===null){L===null&&(L=O);break}e&&L&&I.alternate===null&&t(d,L),c=l(I,c,D),x===null?C=I:x.sibling=I,x=I,L=O}if(D===f.length)return n(d,L),ie&&hn(d,D),C;if(L===null){for(;D<f.length;D++)L=v(d,f[D],g),L!==null&&(c=l(L,c,D),x===null?C=L:x.sibling=L,x=L);return ie&&hn(d,D),C}for(L=r(d,L);D<f.length;D++)O=S(L,d,D,f[D],g),O!==null&&(e&&O.alternate!==null&&L.delete(O.key===null?D:O.key),c=l(O,c,D),x===null?C=O:x.sibling=O,x=O);return e&&L.forEach(function(J){return t(d,J)}),ie&&hn(d,D),C}function w(d,c,f,g){var C=_r(f);if(typeof C!="function")throw Error(R(150));if(f=C.call(f),f==null)throw Error(R(151));for(var x=C=null,L=c,D=c=0,O=null,I=f.next();L!==null&&!I.done;D++,I=f.next()){L.index>D?(O=L,L=null):O=L.sibling;var J=h(d,L,I.value,g);if(J===null){L===null&&(L=O);break}e&&L&&J.alternate===null&&t(d,L),c=l(J,c,D),x===null?C=J:x.sibling=J,x=J,L=O}if(I.done)return n(d,L),ie&&hn(d,D),C;if(L===null){for(;!I.done;D++,I=f.next())I=v(d,I.value,g),I!==null&&(c=l(I,c,D),x===null?C=I:x.sibling=I,x=I);return ie&&hn(d,D),C}for(L=r(d,L);!I.done;D++,I=f.next())I=S(L,d,D,I.value,g),I!==null&&(e&&I.alternate!==null&&L.delete(I.key===null?D:I.key),c=l(I,c,D),x===null?C=I:x.sibling=I,x=I);return e&&L.forEach(function(ee){return t(d,ee)}),ie&&hn(d,D),C}function _(d,c,f,g){if(typeof f=="object"&&f!==null&&f.type===Un&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case ka:e:{for(var C=f.key,x=c;x!==null;){if(x.key===C){if(C=f.type,C===Un){if(x.tag===7){n(d,x.sibling),c=a(x,f.props.children),c.return=d,d=c;break e}}else if(x.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===Bt&&Vu(C)===x.type){n(d,x.sibling),c=a(x,f.props),c.ref=Er(d,x,f),c.return=d,d=c;break e}n(d,x);break}else t(d,x);x=x.sibling}f.type===Un?(c=wn(f.props.children,d.mode,g,f.key),c.return=d,d=c):(g=qa(f.type,f.key,f.props,null,d.mode,g),g.ref=Er(d,c,f),g.return=d,d=g)}return o(d);case An:e:{for(x=f.key;c!==null;){if(c.key===x)if(c.tag===4&&c.stateNode.containerInfo===f.containerInfo&&c.stateNode.implementation===f.implementation){n(d,c.sibling),c=a(c,f.children||[]),c.return=d,d=c;break e}else{n(d,c);break}else t(d,c);c=c.sibling}c=Lo(f,d.mode,g),c.return=d,d=c}return o(d);case Bt:return x=f._init,_(d,c,x(f._payload),g)}if(Cr(f))return k(d,c,f,g);if(_r(f))return w(d,c,f,g);ja(d,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,c!==null&&c.tag===6?(n(d,c.sibling),c=a(c,f),c.return=d,d=c):(n(d,c),c=Fo(f,d.mode,g),c.return=d,d=c),o(d)):n(d,c)}return _}var rr=pd(!0),md=pd(!1),fl=ln(null),pl=null,Wn=null,Ki=null;function Ji(){Ki=Wn=pl=null}function Qi(e){var t=fl.current;le(fl),e._currentValue=t}function ci(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function qn(e,t){pl=e,Ki=Wn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Me=!0),e.firstContext=null)}function nt(e){var t=e._currentValue;if(Ki!==e)if(e={context:e,memoizedValue:t,next:null},Wn===null){if(pl===null)throw Error(R(308));Wn=e,pl.dependencies={lanes:0,firstContext:e}}else Wn=Wn.next=e;return t}var gn=null;function Yi(e){gn===null?gn=[e]:gn.push(e)}function hd(e,t,n,r){var a=t.interleaved;return a===null?(n.next=n,Yi(t)):(n.next=a.next,a.next=n),t.interleaved=n,Ft(e,r)}function Ft(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Vt=!1;function Gi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function vd(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Pt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function qt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(H&2)!==0){var a=r.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),r.pending=t,Ft(e,n)}return a=r.interleaved,a===null?(t.next=t,Yi(r)):(t.next=a.next,a.next=t),r.interleaved=t,Ft(e,n)}function Ka(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Oi(e,n)}}function Hu(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var a=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};l===null?a=l=o:l=l.next=o,n=n.next}while(n!==null);l===null?a=l=t:l=l.next=t}else a=l=t;n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function ml(e,t,n,r){var a=e.updateQueue;Vt=!1;var l=a.firstBaseUpdate,o=a.lastBaseUpdate,i=a.shared.pending;if(i!==null){a.shared.pending=null;var s=i,u=s.next;s.next=null,o===null?l=u:o.next=u,o=s;var m=e.alternate;m!==null&&(m=m.updateQueue,i=m.lastBaseUpdate,i!==o&&(i===null?m.firstBaseUpdate=u:i.next=u,m.lastBaseUpdate=s))}if(l!==null){var v=a.baseState;o=0,m=u=s=null,i=l;do{var h=i.lane,S=i.eventTime;if((r&h)===h){m!==null&&(m=m.next={eventTime:S,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null});e:{var k=e,w=i;switch(h=t,S=n,w.tag){case 1:if(k=w.payload,typeof k=="function"){v=k.call(S,v,h);break e}v=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=w.payload,h=typeof k=="function"?k.call(S,v,h):k,h==null)break e;v=ce({},v,h);break e;case 2:Vt=!0}}i.callback!==null&&i.lane!==0&&(e.flags|=64,h=a.effects,h===null?a.effects=[i]:h.push(i))}else S={eventTime:S,lane:h,tag:i.tag,payload:i.payload,callback:i.callback,next:null},m===null?(u=m=S,s=v):m=m.next=S,o|=h;if(i=i.next,i===null){if(i=a.shared.pending,i===null)break;h=i,i=h.next,h.next=null,a.lastBaseUpdate=h,a.shared.pending=null}}while(!0);if(m===null&&(s=v),a.baseState=s,a.firstBaseUpdate=u,a.lastBaseUpdate=m,t=a.shared.interleaved,t!==null){a=t;do o|=a.lane,a=a.next;while(a!==t)}else l===null&&(a.shared.lanes=0);$n|=o,e.lanes=o,e.memoizedState=v}}function Wu(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(a!==null){if(r.callback=null,r=n,typeof a!="function")throw Error(R(191,a));a.call(r)}}}var oa={},kt=ln(oa),Xr=ln(oa),qr=ln(oa);function _n(e){if(e===oa)throw Error(R(174));return e}function Xi(e,t){switch(ne(qr,t),ne(Xr,e),ne(kt,oa),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ho(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ho(t,e)}le(kt),ne(kt,t)}function ar(){le(kt),le(Xr),le(qr)}function yd(e){_n(qr.current);var t=_n(kt.current),n=Ho(t,e.type);t!==n&&(ne(Xr,e),ne(kt,n))}function qi(e){Xr.current===e&&(le(kt),le(Xr))}var se=ln(0);function hl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var bo=[];function Zi(){for(var e=0;e<bo.length;e++)bo[e]._workInProgressVersionPrimary=null;bo.length=0}var Ja=Ot.ReactCurrentDispatcher,Co=Ot.ReactCurrentBatchConfig,kn=0,ue=null,ge=null,Ne=null,vl=!1,Ar=!1,Zr=0,sh=0;function be(){throw Error(R(321))}function es(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!mt(e[n],t[n]))return!1;return!0}function ts(e,t,n,r,a,l){if(kn=l,ue=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ja.current=e===null||e.memoizedState===null?fh:ph,e=n(r,a),Ar){l=0;do{if(Ar=!1,Zr=0,25<=l)throw Error(R(301));l+=1,Ne=ge=null,t.updateQueue=null,Ja.current=mh,e=n(r,a)}while(Ar)}if(Ja.current=yl,t=ge!==null&&ge.next!==null,kn=0,Ne=ge=ue=null,vl=!1,t)throw Error(R(300));return e}function ns(){var e=Zr!==0;return Zr=0,e}function wt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ne===null?ue.memoizedState=Ne=e:Ne=Ne.next=e,Ne}function rt(){if(ge===null){var e=ue.alternate;e=e!==null?e.memoizedState:null}else e=ge.next;var t=Ne===null?ue.memoizedState:Ne.next;if(t!==null)Ne=t,ge=e;else{if(e===null)throw Error(R(310));ge=e,e={memoizedState:ge.memoizedState,baseState:ge.baseState,baseQueue:ge.baseQueue,queue:ge.queue,next:null},Ne===null?ue.memoizedState=Ne=e:Ne=Ne.next=e}return Ne}function ea(e,t){return typeof t=="function"?t(e):t}function xo(e){var t=rt(),n=t.queue;if(n===null)throw Error(R(311));n.lastRenderedReducer=e;var r=ge,a=r.baseQueue,l=n.pending;if(l!==null){if(a!==null){var o=a.next;a.next=l.next,l.next=o}r.baseQueue=a=l,n.pending=null}if(a!==null){l=a.next,r=r.baseState;var i=o=null,s=null,u=l;do{var m=u.lane;if((kn&m)===m)s!==null&&(s=s.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var v={lane:m,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};s===null?(i=s=v,o=r):s=s.next=v,ue.lanes|=m,$n|=m}u=u.next}while(u!==null&&u!==l);s===null?o=r:s.next=i,mt(r,t.memoizedState)||(Me=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){a=e;do l=a.lane,ue.lanes|=l,$n|=l,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Po(e){var t=rt(),n=t.queue;if(n===null)throw Error(R(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,l=t.memoizedState;if(a!==null){n.pending=null;var o=a=a.next;do l=e(l,o.action),o=o.next;while(o!==a);mt(l,t.memoizedState)||(Me=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),n.lastRenderedState=l}return[l,r]}function gd(){}function _d(e,t){var n=ue,r=rt(),a=t(),l=!mt(r.memoizedState,a);if(l&&(r.memoizedState=a,Me=!0),r=r.queue,rs(Sd.bind(null,n,r,e),[e]),r.getSnapshot!==t||l||Ne!==null&&Ne.memoizedState.tag&1){if(n.flags|=2048,ta(9,wd.bind(null,n,r,a,t),void 0,null),we===null)throw Error(R(349));(kn&30)!==0||Nd(n,t,a)}return a}function Nd(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ue.updateQueue,t===null?(t={lastEffect:null,stores:null},ue.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function wd(e,t,n,r){t.value=n,t.getSnapshot=r,Ed(t)&&kd(e)}function Sd(e,t,n){return n(function(){Ed(t)&&kd(e)})}function Ed(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!mt(e,n)}catch{return!0}}function kd(e){var t=Ft(e,1);t!==null&&pt(t,e,1,-1)}function Ku(e){var t=wt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ea,lastRenderedState:e},t.queue=e,e=e.dispatch=dh.bind(null,ue,e),[t.memoizedState,e]}function ta(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ue.updateQueue,t===null?(t={lastEffect:null,stores:null},ue.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function $d(){return rt().memoizedState}function Qa(e,t,n,r){var a=wt();ue.flags|=e,a.memoizedState=ta(1|t,n,void 0,r===void 0?null:r)}function xl(e,t,n,r){var a=rt();r=r===void 0?null:r;var l=void 0;if(ge!==null){var o=ge.memoizedState;if(l=o.destroy,r!==null&&es(r,o.deps)){a.memoizedState=ta(t,n,l,r);return}}ue.flags|=e,a.memoizedState=ta(1|t,n,l,r)}function Ju(e,t){return Qa(8390656,8,e,t)}function rs(e,t){return xl(2048,8,e,t)}function Rd(e,t){return xl(4,2,e,t)}function bd(e,t){return xl(4,4,e,t)}function Cd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function xd(e,t,n){return n=n!=null?n.concat([e]):null,xl(4,4,Cd.bind(null,t,e),n)}function as(){}function Pd(e,t){var n=rt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&es(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Td(e,t){var n=rt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&es(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Dd(e,t,n){return(kn&21)===0?(e.baseState&&(e.baseState=!1,Me=!0),e.memoizedState=n):(mt(n,t)||(n=Uc(),ue.lanes|=n,$n|=n,e.baseState=!0),t)}function uh(e,t){var n=X;X=n!==0&&4>n?n:4,e(!0);var r=Co.transition;Co.transition={};try{e(!1),t()}finally{X=n,Co.transition=r}}function Fd(){return rt().memoizedState}function ch(e,t,n){var r=en(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Ld(e))Od(t,n);else if(n=hd(e,t,n,r),n!==null){var a=Ae();pt(n,e,r,a),Ad(n,t,r)}}function dh(e,t,n){var r=en(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ld(e))Od(t,a);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var o=t.lastRenderedState,i=l(o,n);if(a.hasEagerState=!0,a.eagerState=i,mt(i,o)){var s=t.interleaved;s===null?(a.next=a,Yi(t)):(a.next=s.next,s.next=a),t.interleaved=a;return}}catch{}finally{}n=hd(e,t,a,r),n!==null&&(a=Ae(),pt(n,e,r,a),Ad(n,t,r))}}function Ld(e){var t=e.alternate;return e===ue||t!==null&&t===ue}function Od(e,t){Ar=vl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ad(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Oi(e,n)}}var yl={readContext:nt,useCallback:be,useContext:be,useEffect:be,useImperativeHandle:be,useInsertionEffect:be,useLayoutEffect:be,useMemo:be,useReducer:be,useRef:be,useState:be,useDebugValue:be,useDeferredValue:be,useTransition:be,useMutableSource:be,useSyncExternalStore:be,useId:be,unstable_isNewReconciler:!1},fh={readContext:nt,useCallback:function(e,t){return wt().memoizedState=[e,t===void 0?null:t],e},useContext:nt,useEffect:Ju,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Qa(4194308,4,Cd.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Qa(4194308,4,e,t)},useInsertionEffect:function(e,t){return Qa(4,2,e,t)},useMemo:function(e,t){var n=wt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=wt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=ch.bind(null,ue,e),[r.memoizedState,e]},useRef:function(e){var t=wt();return e={current:e},t.memoizedState=e},useState:Ku,useDebugValue:as,useDeferredValue:function(e){return wt().memoizedState=e},useTransition:function(){var e=Ku(!1),t=e[0];return e=uh.bind(null,e[1]),wt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ue,a=wt();if(ie){if(n===void 0)throw Error(R(407));n=n()}else{if(n=t(),we===null)throw Error(R(349));(kn&30)!==0||Nd(r,t,n)}a.memoizedState=n;var l={value:n,getSnapshot:t};return a.queue=l,Ju(Sd.bind(null,r,l,e),[e]),r.flags|=2048,ta(9,wd.bind(null,r,l,n,t),void 0,null),n},useId:function(){var e=wt(),t=we.identifierPrefix;if(ie){var n=xt,r=Ct;n=(r&~(1<<32-ft(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Zr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=sh++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},ph={readContext:nt,useCallback:Pd,useContext:nt,useEffect:rs,useImperativeHandle:xd,useInsertionEffect:Rd,useLayoutEffect:bd,useMemo:Td,useReducer:xo,useRef:$d,useState:function(){return xo(ea)},useDebugValue:as,useDeferredValue:function(e){var t=rt();return Dd(t,ge.memoizedState,e)},useTransition:function(){var e=xo(ea)[0],t=rt().memoizedState;return[e,t]},useMutableSource:gd,useSyncExternalStore:_d,useId:Fd,unstable_isNewReconciler:!1},mh={readContext:nt,useCallback:Pd,useContext:nt,useEffect:rs,useImperativeHandle:xd,useInsertionEffect:Rd,useLayoutEffect:bd,useMemo:Td,useReducer:Po,useRef:$d,useState:function(){return Po(ea)},useDebugValue:as,useDeferredValue:function(e){var t=rt();return ge===null?t.memoizedState=e:Dd(t,ge.memoizedState,e)},useTransition:function(){var e=Po(ea)[0],t=rt().memoizedState;return[e,t]},useMutableSource:gd,useSyncExternalStore:_d,useId:Fd,unstable_isNewReconciler:!1};function ut(e,t){if(e&&e.defaultProps){t=ce({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function di(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:ce({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Pl={isMounted:function(e){return(e=e._reactInternals)?Cn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ae(),a=en(e),l=Pt(r,a);l.payload=t,n!=null&&(l.callback=n),t=qt(e,l,a),t!==null&&(pt(t,e,a,r),Ka(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ae(),a=en(e),l=Pt(r,a);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=qt(e,l,a),t!==null&&(pt(t,e,a,r),Ka(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ae(),r=en(e),a=Pt(n,r);a.tag=2,t!=null&&(a.callback=t),t=qt(e,a,r),t!==null&&(pt(t,e,r,n),Ka(t,e,r))}};function Qu(e,t,n,r,a,l,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,o):t.prototype&&t.prototype.isPureReactComponent?!Jr(n,r)||!Jr(a,l):!0}function Ud(e,t,n){var r=!1,a=rn,l=t.contextType;return typeof l=="object"&&l!==null?l=nt(l):(a=Be(t)?Sn:Pe.current,r=t.contextTypes,l=(r=r!=null)?tr(e,a):rn),t=new t(n,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Pl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=l),t}function Yu(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Pl.enqueueReplaceState(t,t.state,null)}function fi(e,t,n,r){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},Gi(e);var l=t.contextType;typeof l=="object"&&l!==null?a.context=nt(l):(l=Be(t)?Sn:Pe.current,a.context=tr(e,l)),a.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(di(e,t,l,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&Pl.enqueueReplaceState(a,a.state,null),ml(e,n,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function lr(e,t){try{var n="",r=t;do n+=Hp(r),r=r.return;while(r);var a=n}catch(l){a=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:a,digest:null}}function To(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function pi(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var hh=typeof WeakMap=="function"?WeakMap:Map;function Id(e,t,n){n=Pt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){_l||(_l=!0,Ei=r),pi(e,t)},n}function jd(e,t,n){n=Pt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var a=t.value;n.payload=function(){return r(a)},n.callback=function(){pi(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(n.callback=function(){pi(e,t),typeof r!="function"&&(Zt===null?Zt=new Set([this]):Zt.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new hh;var a=new Set;r.set(t,a)}else a=r.get(t),a===void 0&&(a=new Set,r.set(t,a));a.has(n)||(a.add(n),e=xh.bind(null,e,t,n),t.then(e,e))}function Xu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function qu(e,t,n,r,a){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Pt(-1,1),t.tag=2,qt(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=a,e)}var vh=Ot.ReactCurrentOwner,Me=!1;function Oe(e,t,n,r){t.child=e===null?md(t,null,n,r):rr(t,e.child,n,r)}function Zu(e,t,n,r,a){n=n.render;var l=t.ref;return qn(t,a),r=ts(e,t,n,r,l,a),n=ns(),e!==null&&!Me?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Lt(e,t,a)):(ie&&n&&Vi(t),t.flags|=1,Oe(e,t,r,a),t.child)}function ec(e,t,n,r,a){if(e===null){var l=n.type;return typeof l=="function"&&!fs(l)&&l.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=l,Md(e,t,l,r,a)):(e=qa(n.type,null,r,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,(e.lanes&a)===0){var o=l.memoizedProps;if(n=n.compare,n=n!==null?n:Jr,n(o,r)&&e.ref===t.ref)return Lt(e,t,a)}return t.flags|=1,e=tn(l,r),e.ref=t.ref,e.return=t,t.child=e}function Md(e,t,n,r,a){if(e!==null){var l=e.memoizedProps;if(Jr(l,r)&&e.ref===t.ref)if(Me=!1,t.pendingProps=r=l,(e.lanes&a)!==0)(e.flags&131072)!==0&&(Me=!0);else return t.lanes=e.lanes,Lt(e,t,a)}return mi(e,t,n,r,a)}function zd(e,t,n){var r=t.pendingProps,a=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ne(Jn,He),He|=n;else{if((n&1073741824)===0)return e=l!==null?l.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ne(Jn,He),He|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:n,ne(Jn,He),He|=r}else l!==null?(r=l.baseLanes|n,t.memoizedState=null):r=n,ne(Jn,He),He|=r;return Oe(e,t,a,n),t.child}function Bd(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function mi(e,t,n,r,a){var l=Be(n)?Sn:Pe.current;return l=tr(t,l),qn(t,a),n=ts(e,t,n,r,l,a),r=ns(),e!==null&&!Me?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Lt(e,t,a)):(ie&&r&&Vi(t),t.flags|=1,Oe(e,t,n,a),t.child)}function tc(e,t,n,r,a){if(Be(n)){var l=!0;ul(t)}else l=!1;if(qn(t,a),t.stateNode===null)Ya(e,t),Ud(t,n,r),fi(t,n,r,a),r=!0;else if(e===null){var o=t.stateNode,i=t.memoizedProps;o.props=i;var s=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=nt(u):(u=Be(n)?Sn:Pe.current,u=tr(t,u));var m=n.getDerivedStateFromProps,v=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function";v||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(i!==r||s!==u)&&Yu(t,o,r,u),Vt=!1;var h=t.memoizedState;o.state=h,ml(t,r,o,a),s=t.memoizedState,i!==r||h!==s||ze.current||Vt?(typeof m=="function"&&(di(t,n,m,r),s=t.memoizedState),(i=Vt||Qu(t,n,i,r,h,s,u))?(v||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),o.props=r,o.state=s,o.context=u,r=i):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,vd(e,t),i=t.memoizedProps,u=t.type===t.elementType?i:ut(t.type,i),o.props=u,v=t.pendingProps,h=o.context,s=n.contextType,typeof s=="object"&&s!==null?s=nt(s):(s=Be(n)?Sn:Pe.current,s=tr(t,s));var S=n.getDerivedStateFromProps;(m=typeof S=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(i!==v||h!==s)&&Yu(t,o,r,s),Vt=!1,h=t.memoizedState,o.state=h,ml(t,r,o,a);var k=t.memoizedState;i!==v||h!==k||ze.current||Vt?(typeof S=="function"&&(di(t,n,S,r),k=t.memoizedState),(u=Vt||Qu(t,n,u,r,h,k,s)||!1)?(m||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,k,s),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,k,s)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||i===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=k),o.props=r,o.state=k,o.context=s,r=u):(typeof o.componentDidUpdate!="function"||i===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),r=!1)}return hi(e,t,n,r,l,a)}function hi(e,t,n,r,a,l){Bd(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return a&&Mu(t,n,!1),Lt(e,t,l);r=t.stateNode,vh.current=t;var i=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=rr(t,e.child,null,l),t.child=rr(t,null,i,l)):Oe(e,t,i,l),t.memoizedState=r.state,a&&Mu(t,n,!0),t.child}function Vd(e){var t=e.stateNode;t.pendingContext?ju(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ju(e,t.context,!1),Xi(e,t.containerInfo)}function nc(e,t,n,r,a){return nr(),Wi(a),t.flags|=256,Oe(e,t,n,r),t.child}var vi={dehydrated:null,treeContext:null,retryLane:0};function yi(e){return{baseLanes:e,cachePool:null,transitions:null}}function Hd(e,t,n){var r=t.pendingProps,a=se.current,l=!1,o=(t.flags&128)!==0,i;if((i=o)||(i=e!==null&&e.memoizedState===null?!1:(a&2)!==0),i?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),ne(se,a&1),e===null)return ui(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(o=r.children,e=r.fallback,l?(r=t.mode,l=t.child,o={mode:"hidden",children:o},(r&1)===0&&l!==null?(l.childLanes=0,l.pendingProps=o):l=Fl(o,r,0,null),e=wn(e,r,n,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=yi(n),t.memoizedState=vi,e):ls(t,o));if(a=e.memoizedState,a!==null&&(i=a.dehydrated,i!==null))return yh(e,t,o,r,i,a,n);if(l){l=r.fallback,o=t.mode,a=e.child,i=a.sibling;var s={mode:"hidden",children:r.children};return(o&1)===0&&t.child!==a?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=tn(a,s),r.subtreeFlags=a.subtreeFlags&14680064),i!==null?l=tn(i,l):(l=wn(l,o,n,null),l.flags|=2),l.return=t,r.return=t,r.sibling=l,t.child=r,r=l,l=t.child,o=e.child.memoizedState,o=o===null?yi(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},l.memoizedState=o,l.childLanes=e.childLanes&~n,t.memoizedState=vi,r}return l=e.child,e=l.sibling,r=tn(l,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function ls(e,t){return t=Fl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ma(e,t,n,r){return r!==null&&Wi(r),rr(t,e.child,null,n),e=ls(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function yh(e,t,n,r,a,l,o){if(n)return t.flags&256?(t.flags&=-257,r=To(Error(R(422))),Ma(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=r.fallback,a=t.mode,r=Fl({mode:"visible",children:r.children},a,0,null),l=wn(l,a,o,null),l.flags|=2,r.return=t,l.return=t,r.sibling=l,t.child=r,(t.mode&1)!==0&&rr(t,e.child,null,o),t.child.memoizedState=yi(o),t.memoizedState=vi,l);if((t.mode&1)===0)return Ma(e,t,o,null);if(a.data==="$!"){if(r=a.nextSibling&&a.nextSibling.dataset,r)var i=r.dgst;return r=i,l=Error(R(419)),r=To(l,r,void 0),Ma(e,t,o,r)}if(i=(o&e.childLanes)!==0,Me||i){if(r=we,r!==null){switch(o&-o){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(r.suspendedLanes|o))!==0?0:a,a!==0&&a!==l.retryLane&&(l.retryLane=a,Ft(e,a),pt(r,e,a,-1))}return ds(),r=To(Error(R(421))),Ma(e,t,o,r)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Ph.bind(null,e),a._reactRetry=t,null):(e=l.treeContext,We=Xt(a.nextSibling),Ke=t,ie=!0,dt=null,e!==null&&(qe[Ze++]=Ct,qe[Ze++]=xt,qe[Ze++]=En,Ct=e.id,xt=e.overflow,En=t),t=ls(t,r.children),t.flags|=4096,t)}function rc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ci(e.return,t,n)}function Do(e,t,n,r,a){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=a)}function Wd(e,t,n){var r=t.pendingProps,a=r.revealOrder,l=r.tail;if(Oe(e,t,r.children,n),r=se.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&rc(e,n,t);else if(e.tag===19)rc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ne(se,r),(t.mode&1)===0)t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&hl(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Do(t,!1,a,n,l);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&hl(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Do(t,!0,n,null,l);break;case"together":Do(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ya(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Lt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),$n|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(R(153));if(t.child!==null){for(e=t.child,n=tn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=tn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function gh(e,t,n){switch(t.tag){case 3:Vd(t),nr();break;case 5:yd(t);break;case 1:Be(t.type)&&ul(t);break;case 4:Xi(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,a=t.memoizedProps.value;ne(fl,r._currentValue),r._currentValue=a;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ne(se,se.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?Hd(e,t,n):(ne(se,se.current&1),e=Lt(e,t,n),e!==null?e.sibling:null);ne(se,se.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Wd(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),ne(se,se.current),r)break;return null;case 22:case 23:return t.lanes=0,zd(e,t,n)}return Lt(e,t,n)}var Kd,gi,Jd,Qd;Kd=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};gi=function(){};Jd=function(e,t,n,r){var a=e.memoizedProps;if(a!==r){e=t.stateNode,_n(kt.current);var l=null;switch(n){case"input":a=Mo(e,a),r=Mo(e,r),l=[];break;case"select":a=ce({},a,{value:void 0}),r=ce({},r,{value:void 0}),l=[];break;case"textarea":a=Vo(e,a),r=Vo(e,r),l=[];break;default:typeof a.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=il)}Wo(n,r);var o;n=null;for(u in a)if(!r.hasOwnProperty(u)&&a.hasOwnProperty(u)&&a[u]!=null)if(u==="style"){var i=a[u];for(o in i)i.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Mr.hasOwnProperty(u)?l||(l=[]):(l=l||[]).push(u,null));for(u in r){var s=r[u];if(i=a?.[u],r.hasOwnProperty(u)&&s!==i&&(s!=null||i!=null))if(u==="style")if(i){for(o in i)!i.hasOwnProperty(o)||s&&s.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in s)s.hasOwnProperty(o)&&i[o]!==s[o]&&(n||(n={}),n[o]=s[o])}else n||(l||(l=[]),l.push(u,n)),n=s;else u==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,i=i?i.__html:void 0,s!=null&&i!==s&&(l=l||[]).push(u,s)):u==="children"?typeof s!="string"&&typeof s!="number"||(l=l||[]).push(u,""+s):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Mr.hasOwnProperty(u)?(s!=null&&u==="onScroll"&&ae("scroll",e),l||i===s||(l=[])):(l=l||[]).push(u,s))}n&&(l=l||[]).push("style",n);var u=l;(t.updateQueue=u)&&(t.flags|=4)}};Qd=function(e,t,n,r){n!==r&&(t.flags|=4)};function kr(e,t){if(!ie)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ce(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags&14680064,r|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function _h(e,t,n){var r=t.pendingProps;switch(Hi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ce(t),null;case 1:return Be(t.type)&&sl(),Ce(t),null;case 3:return r=t.stateNode,ar(),le(ze),le(Pe),Zi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Ia(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,dt!==null&&(Ri(dt),dt=null))),gi(e,t),Ce(t),null;case 5:qi(t);var a=_n(qr.current);if(n=t.type,e!==null&&t.stateNode!=null)Jd(e,t,n,r,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(R(166));return Ce(t),null}if(e=_n(kt.current),Ia(t)){r=t.stateNode,n=t.type;var l=t.memoizedProps;switch(r[St]=t,r[Gr]=l,e=(t.mode&1)!==0,n){case"dialog":ae("cancel",r),ae("close",r);break;case"iframe":case"object":case"embed":ae("load",r);break;case"video":case"audio":for(a=0;a<Pr.length;a++)ae(Pr[a],r);break;case"source":ae("error",r);break;case"img":case"image":case"link":ae("error",r),ae("load",r);break;case"details":ae("toggle",r);break;case"input":du(r,l),ae("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},ae("invalid",r);break;case"textarea":pu(r,l),ae("invalid",r)}Wo(n,l),a=null;for(var o in l)if(l.hasOwnProperty(o)){var i=l[o];o==="children"?typeof i=="string"?r.textContent!==i&&(l.suppressHydrationWarning!==!0&&Ua(r.textContent,i,e),a=["children",i]):typeof i=="number"&&r.textContent!==""+i&&(l.suppressHydrationWarning!==!0&&Ua(r.textContent,i,e),a=["children",""+i]):Mr.hasOwnProperty(o)&&i!=null&&o==="onScroll"&&ae("scroll",r)}switch(n){case"input":$a(r),fu(r,l,!0);break;case"textarea":$a(r),mu(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=il)}r=a,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Sc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[St]=t,e[Gr]=r,Kd(e,t,!1,!1),t.stateNode=e;e:{switch(o=Ko(n,r),n){case"dialog":ae("cancel",e),ae("close",e),a=r;break;case"iframe":case"object":case"embed":ae("load",e),a=r;break;case"video":case"audio":for(a=0;a<Pr.length;a++)ae(Pr[a],e);a=r;break;case"source":ae("error",e),a=r;break;case"img":case"image":case"link":ae("error",e),ae("load",e),a=r;break;case"details":ae("toggle",e),a=r;break;case"input":du(e,r),a=Mo(e,r),ae("invalid",e);break;case"option":a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=ce({},r,{value:void 0}),ae("invalid",e);break;case"textarea":pu(e,r),a=Vo(e,r),ae("invalid",e);break;default:a=r}Wo(n,a),i=a;for(l in i)if(i.hasOwnProperty(l)){var s=i[l];l==="style"?$c(e,s):l==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Ec(e,s)):l==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&zr(e,s):typeof s=="number"&&zr(e,""+s):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(Mr.hasOwnProperty(l)?s!=null&&l==="onScroll"&&ae("scroll",e):s!=null&&xi(e,l,s,o))}switch(n){case"input":$a(e),fu(e,r,!1);break;case"textarea":$a(e),mu(e);break;case"option":r.value!=null&&e.setAttribute("value",""+nn(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?Qn(e,!!r.multiple,l,!1):r.defaultValue!=null&&Qn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=il)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ce(t),null;case 6:if(e&&t.stateNode!=null)Qd(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(R(166));if(n=_n(qr.current),_n(kt.current),Ia(t)){if(r=t.stateNode,n=t.memoizedProps,r[St]=t,(l=r.nodeValue!==n)&&(e=Ke,e!==null))switch(e.tag){case 3:Ua(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ua(r.nodeValue,n,(e.mode&1)!==0)}l&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[St]=t,t.stateNode=r}return Ce(t),null;case 13:if(le(se),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ie&&We!==null&&(t.mode&1)!==0&&(t.flags&128)===0)fd(),nr(),t.flags|=98560,l=!1;else if(l=Ia(t),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(R(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(R(317));l[St]=t}else nr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ce(t),l=!1}else dt!==null&&(Ri(dt),dt=null),l=!0;if(!l)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(se.current&1)!==0?_e===0&&(_e=3):ds())),t.updateQueue!==null&&(t.flags|=4),Ce(t),null);case 4:return ar(),gi(e,t),e===null&&Qr(t.stateNode.containerInfo),Ce(t),null;case 10:return Qi(t.type._context),Ce(t),null;case 17:return Be(t.type)&&sl(),Ce(t),null;case 19:if(le(se),l=t.memoizedState,l===null)return Ce(t),null;if(r=(t.flags&128)!==0,o=l.rendering,o===null)if(r)kr(l,!1);else{if(_e!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(o=hl(e),o!==null){for(t.flags|=128,kr(l,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)l=n,e=r,l.flags&=14680066,o=l.alternate,o===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=o.childLanes,l.lanes=o.lanes,l.child=o.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=o.memoizedProps,l.memoizedState=o.memoizedState,l.updateQueue=o.updateQueue,l.type=o.type,e=o.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ne(se,se.current&1|2),t.child}e=e.sibling}l.tail!==null&&he()>or&&(t.flags|=128,r=!0,kr(l,!1),t.lanes=4194304)}else{if(!r)if(e=hl(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),kr(l,!0),l.tail===null&&l.tailMode==="hidden"&&!o.alternate&&!ie)return Ce(t),null}else 2*he()-l.renderingStartTime>or&&n!==1073741824&&(t.flags|=128,r=!0,kr(l,!1),t.lanes=4194304);l.isBackwards?(o.sibling=t.child,t.child=o):(n=l.last,n!==null?n.sibling=o:t.child=o,l.last=o)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=he(),t.sibling=null,n=se.current,ne(se,r?n&1|2:n&1),t):(Ce(t),null);case 22:case 23:return cs(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(He&1073741824)!==0&&(Ce(t),t.subtreeFlags&6&&(t.flags|=8192)):Ce(t),null;case 24:return null;case 25:return null}throw Error(R(156,t.tag))}function Nh(e,t){switch(Hi(t),t.tag){case 1:return Be(t.type)&&sl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ar(),le(ze),le(Pe),Zi(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return qi(t),null;case 13:if(le(se),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(R(340));nr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return le(se),null;case 4:return ar(),null;case 10:return Qi(t.type._context),null;case 22:case 23:return cs(),null;case 24:return null;default:return null}}var za=!1,xe=!1,wh=typeof WeakSet=="function"?WeakSet:Set,F=null;function Kn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){fe(e,t,r)}else n.current=null}function _i(e,t,n){try{n()}catch(r){fe(e,t,r)}}var ac=!1;function Sh(e,t){if(ni=al,e=Zc(),Bi(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var o=0,i=-1,s=-1,u=0,m=0,v=e,h=null;t:for(;;){for(var S;v!==n||a!==0&&v.nodeType!==3||(i=o+a),v!==l||r!==0&&v.nodeType!==3||(s=o+r),v.nodeType===3&&(o+=v.nodeValue.length),(S=v.firstChild)!==null;)h=v,v=S;for(;;){if(v===e)break t;if(h===n&&++u===a&&(i=o),h===l&&++m===r&&(s=o),(S=v.nextSibling)!==null)break;v=h,h=v.parentNode}v=S}n=i===-1||s===-1?null:{start:i,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(ri={focusedElem:e,selectionRange:n},al=!1,F=t;F!==null;)if(t=F,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,F=e;else for(;F!==null;){t=F;try{var k=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var w=k.memoizedProps,_=k.memoizedState,d=t.stateNode,c=d.getSnapshotBeforeUpdate(t.elementType===t.type?w:ut(t.type,w),_);d.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(R(163))}}catch(g){fe(t,t.return,g)}if(e=t.sibling,e!==null){e.return=t.return,F=e;break}F=t.return}return k=ac,ac=!1,k}function Ur(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var l=a.destroy;a.destroy=void 0,l!==void 0&&_i(t,n,l)}a=a.next}while(a!==r)}}function Tl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Ni(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Yd(e){var t=e.alternate;t!==null&&(e.alternate=null,Yd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[St],delete t[Gr],delete t[oi],delete t[ah],delete t[lh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Gd(e){return e.tag===5||e.tag===3||e.tag===4}function lc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Gd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function wi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=il));else if(r!==4&&(e=e.child,e!==null))for(wi(e,t,n),e=e.sibling;e!==null;)wi(e,t,n),e=e.sibling}function Si(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Si(e,t,n),e=e.sibling;e!==null;)Si(e,t,n),e=e.sibling}var Ee=null,ct=!1;function zt(e,t,n){for(n=n.child;n!==null;)Xd(e,t,n),n=n.sibling}function Xd(e,t,n){if(Et&&typeof Et.onCommitFiberUnmount=="function")try{Et.onCommitFiberUnmount(El,n)}catch{}switch(n.tag){case 5:xe||Kn(n,t);case 6:var r=Ee,a=ct;Ee=null,zt(e,t,n),Ee=r,ct=a,Ee!==null&&(ct?(e=Ee,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ee.removeChild(n.stateNode));break;case 18:Ee!==null&&(ct?(e=Ee,n=n.stateNode,e.nodeType===8?$o(e.parentNode,n):e.nodeType===1&&$o(e,n),Wr(e)):$o(Ee,n.stateNode));break;case 4:r=Ee,a=ct,Ee=n.stateNode.containerInfo,ct=!0,zt(e,t,n),Ee=r,ct=a;break;case 0:case 11:case 14:case 15:if(!xe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){a=r=r.next;do{var l=a,o=l.destroy;l=l.tag,o!==void 0&&((l&2)!==0||(l&4)!==0)&&_i(n,t,o),a=a.next}while(a!==r)}zt(e,t,n);break;case 1:if(!xe&&(Kn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(i){fe(n,t,i)}zt(e,t,n);break;case 21:zt(e,t,n);break;case 22:n.mode&1?(xe=(r=xe)||n.memoizedState!==null,zt(e,t,n),xe=r):zt(e,t,n);break;default:zt(e,t,n)}}function oc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new wh),t.forEach(function(r){var a=Th.bind(null,e,r);n.has(r)||(n.add(r),r.then(a,a))})}}function st(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r];try{var l=e,o=t,i=o;e:for(;i!==null;){switch(i.tag){case 5:Ee=i.stateNode,ct=!1;break e;case 3:Ee=i.stateNode.containerInfo,ct=!0;break e;case 4:Ee=i.stateNode.containerInfo,ct=!0;break e}i=i.return}if(Ee===null)throw Error(R(160));Xd(l,o,a),Ee=null,ct=!1;var s=a.alternate;s!==null&&(s.return=null),a.return=null}catch(u){fe(a,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)qd(t,e),t=t.sibling}function qd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(st(t,e),Nt(e),r&4){try{Ur(3,e,e.return),Tl(3,e)}catch(w){fe(e,e.return,w)}try{Ur(5,e,e.return)}catch(w){fe(e,e.return,w)}}break;case 1:st(t,e),Nt(e),r&512&&n!==null&&Kn(n,n.return);break;case 5:if(st(t,e),Nt(e),r&512&&n!==null&&Kn(n,n.return),e.flags&32){var a=e.stateNode;try{zr(a,"")}catch(w){fe(e,e.return,w)}}if(r&4&&(a=e.stateNode,a!=null)){var l=e.memoizedProps,o=n!==null?n.memoizedProps:l,i=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{i==="input"&&l.type==="radio"&&l.name!=null&&Nc(a,l),Ko(i,o);var u=Ko(i,l);for(o=0;o<s.length;o+=2){var m=s[o],v=s[o+1];m==="style"?$c(a,v):m==="dangerouslySetInnerHTML"?Ec(a,v):m==="children"?zr(a,v):xi(a,m,v,u)}switch(i){case"input":zo(a,l);break;case"textarea":wc(a,l);break;case"select":var h=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!l.multiple;var S=l.value;S!=null?Qn(a,!!l.multiple,S,!1):h!==!!l.multiple&&(l.defaultValue!=null?Qn(a,!!l.multiple,l.defaultValue,!0):Qn(a,!!l.multiple,l.multiple?[]:"",!1))}a[Gr]=l}catch(w){fe(e,e.return,w)}}break;case 6:if(st(t,e),Nt(e),r&4){if(e.stateNode===null)throw Error(R(162));a=e.stateNode,l=e.memoizedProps;try{a.nodeValue=l}catch(w){fe(e,e.return,w)}}break;case 3:if(st(t,e),Nt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Wr(t.containerInfo)}catch(w){fe(e,e.return,w)}break;case 4:st(t,e),Nt(e);break;case 13:st(t,e),Nt(e),a=e.child,a.flags&8192&&(l=a.memoizedState!==null,a.stateNode.isHidden=l,!l||a.alternate!==null&&a.alternate.memoizedState!==null||(ss=he())),r&4&&oc(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(xe=(u=xe)||m,st(t,e),xe=u):st(t,e),Nt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!m&&(e.mode&1)!==0)for(F=e,m=e.child;m!==null;){for(v=F=m;F!==null;){switch(h=F,S=h.child,h.tag){case 0:case 11:case 14:case 15:Ur(4,h,h.return);break;case 1:Kn(h,h.return);var k=h.stateNode;if(typeof k.componentWillUnmount=="function"){r=h,n=h.return;try{t=r,k.props=t.memoizedProps,k.state=t.memoizedState,k.componentWillUnmount()}catch(w){fe(r,n,w)}}break;case 5:Kn(h,h.return);break;case 22:if(h.memoizedState!==null){sc(v);continue}}S!==null?(S.return=h,F=S):sc(v)}m=m.sibling}e:for(m=null,v=e;;){if(v.tag===5){if(m===null){m=v;try{a=v.stateNode,u?(l=a.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(i=v.stateNode,s=v.memoizedProps.style,o=s!=null&&s.hasOwnProperty("display")?s.display:null,i.style.display=kc("display",o))}catch(w){fe(e,e.return,w)}}}else if(v.tag===6){if(m===null)try{v.stateNode.nodeValue=u?"":v.memoizedProps}catch(w){fe(e,e.return,w)}}else if((v.tag!==22&&v.tag!==23||v.memoizedState===null||v===e)&&v.child!==null){v.child.return=v,v=v.child;continue}if(v===e)break e;for(;v.sibling===null;){if(v.return===null||v.return===e)break e;m===v&&(m=null),v=v.return}m===v&&(m=null),v.sibling.return=v.return,v=v.sibling}}break;case 19:st(t,e),Nt(e),r&4&&oc(e);break;case 21:break;default:st(t,e),Nt(e)}}function Nt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Gd(n)){var r=n;break e}n=n.return}throw Error(R(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&(zr(a,""),r.flags&=-33);var l=lc(e);Si(e,l,a);break;case 3:case 4:var o=r.stateNode.containerInfo,i=lc(e);wi(e,i,o);break;default:throw Error(R(161))}}catch(s){fe(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Eh(e,t,n){F=e,Zd(e,t,n)}function Zd(e,t,n){for(var r=(e.mode&1)!==0;F!==null;){var a=F,l=a.child;if(a.tag===22&&r){var o=a.memoizedState!==null||za;if(!o){var i=a.alternate,s=i!==null&&i.memoizedState!==null||xe;i=za;var u=xe;if(za=o,(xe=s)&&!u)for(F=a;F!==null;)o=F,s=o.child,o.tag===22&&o.memoizedState!==null?uc(a):s!==null?(s.return=o,F=s):uc(a);for(;l!==null;)F=l,Zd(l,t,n),l=l.sibling;F=a,za=i,xe=u}ic(e,t,n)}else(a.subtreeFlags&8772)!==0&&l!==null?(l.return=a,F=l):ic(e,t,n)}}function ic(e){for(;F!==null;){var t=F;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:xe||Tl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!xe)if(n===null)r.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:ut(t.type,n.memoizedProps);r.componentDidUpdate(a,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&Wu(t,l,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Wu(t,o,n)}break;case 5:var i=t.stateNode;if(n===null&&t.flags&4){n=i;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var m=u.memoizedState;if(m!==null){var v=m.dehydrated;v!==null&&Wr(v)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(R(163))}xe||t.flags&512&&Ni(t)}catch(h){fe(t,t.return,h)}}if(t===e){F=null;break}if(n=t.sibling,n!==null){n.return=t.return,F=n;break}F=t.return}}function sc(e){for(;F!==null;){var t=F;if(t===e){F=null;break}var n=t.sibling;if(n!==null){n.return=t.return,F=n;break}F=t.return}}function uc(e){for(;F!==null;){var t=F;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Tl(4,t)}catch(s){fe(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var a=t.return;try{r.componentDidMount()}catch(s){fe(t,a,s)}}var l=t.return;try{Ni(t)}catch(s){fe(t,l,s)}break;case 5:var o=t.return;try{Ni(t)}catch(s){fe(t,o,s)}}}catch(s){fe(t,t.return,s)}if(t===e){F=null;break}var i=t.sibling;if(i!==null){i.return=t.return,F=i;break}F=t.return}}var kh=Math.ceil,gl=Ot.ReactCurrentDispatcher,os=Ot.ReactCurrentOwner,tt=Ot.ReactCurrentBatchConfig,H=0,we=null,ye=null,ke=0,He=0,Jn=ln(0),_e=0,na=null,$n=0,Dl=0,is=0,Ir=null,je=null,ss=0,or=1/0,Rt=null,_l=!1,Ei=null,Zt=null,Ba=!1,Jt=null,Nl=0,jr=0,ki=null,Ga=-1,Xa=0;function Ae(){return(H&6)!==0?he():Ga!==-1?Ga:Ga=he()}function en(e){return(e.mode&1)===0?1:(H&2)!==0&&ke!==0?ke&-ke:ih.transition!==null?(Xa===0&&(Xa=Uc()),Xa):(e=X,e!==0||(e=window.event,e=e===void 0?16:Hc(e.type)),e)}function pt(e,t,n,r){if(50<jr)throw jr=0,ki=null,Error(R(185));ra(e,n,r),((H&2)===0||e!==we)&&(e===we&&((H&2)===0&&(Dl|=n),_e===4&&Wt(e,ke)),Ve(e,r),n===1&&H===0&&(t.mode&1)===0&&(or=he()+500,Cl&&on()))}function Ve(e,t){var n=e.callbackNode;um(e,t);var r=rl(e,e===we?ke:0);if(r===0)n!==null&&yu(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&yu(n),t===1)e.tag===0?oh(cc.bind(null,e)):ud(cc.bind(null,e)),nh(function(){(H&6)===0&&on()}),n=null;else{switch(Ic(r)){case 1:n=Li;break;case 4:n=Oc;break;case 16:n=nl;break;case 536870912:n=Ac;break;default:n=nl}n=sf(n,ef.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function ef(e,t){if(Ga=-1,Xa=0,(H&6)!==0)throw Error(R(327));var n=e.callbackNode;if(Zn()&&e.callbackNode!==n)return null;var r=rl(e,e===we?ke:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=wl(e,r);else{t=r;var a=H;H|=2;var l=nf();(we!==e||ke!==t)&&(Rt=null,or=he()+500,Nn(e,t));do try{bh();break}catch(i){tf(e,i)}while(!0);Ji(),gl.current=l,H=a,ye!==null?t=0:(we=null,ke=0,t=_e)}if(t!==0){if(t===2&&(a=Xo(e),a!==0&&(r=a,t=$i(e,a))),t===1)throw n=na,Nn(e,0),Wt(e,r),Ve(e,he()),n;if(t===6)Wt(e,r);else{if(a=e.current.alternate,(r&30)===0&&!$h(a)&&(t=wl(e,r),t===2&&(l=Xo(e),l!==0&&(r=l,t=$i(e,l))),t===1))throw n=na,Nn(e,0),Wt(e,r),Ve(e,he()),n;switch(e.finishedWork=a,e.finishedLanes=r,t){case 0:case 1:throw Error(R(345));case 2:vn(e,je,Rt);break;case 3:if(Wt(e,r),(r&130023424)===r&&(t=ss+500-he(),10<t)){if(rl(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){Ae(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=li(vn.bind(null,e,je,Rt),t);break}vn(e,je,Rt);break;case 4:if(Wt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,a=-1;0<r;){var o=31-ft(r);l=1<<o,o=t[o],o>a&&(a=o),r&=~l}if(r=a,r=he()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*kh(r/1960))-r,10<r){e.timeoutHandle=li(vn.bind(null,e,je,Rt),r);break}vn(e,je,Rt);break;case 5:vn(e,je,Rt);break;default:throw Error(R(329))}}}return Ve(e,he()),e.callbackNode===n?ef.bind(null,e):null}function $i(e,t){var n=Ir;return e.current.memoizedState.isDehydrated&&(Nn(e,t).flags|=256),e=wl(e,t),e!==2&&(t=je,je=n,t!==null&&Ri(t)),e}function Ri(e){je===null?je=e:je.push.apply(je,e)}function $h(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var a=n[r],l=a.getSnapshot;a=a.value;try{if(!mt(l(),a))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Wt(e,t){for(t&=~is,t&=~Dl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-ft(t),r=1<<n;e[n]=-1,t&=~r}}function cc(e){if((H&6)!==0)throw Error(R(327));Zn();var t=rl(e,0);if((t&1)===0)return Ve(e,he()),null;var n=wl(e,t);if(e.tag!==0&&n===2){var r=Xo(e);r!==0&&(t=r,n=$i(e,r))}if(n===1)throw n=na,Nn(e,0),Wt(e,t),Ve(e,he()),n;if(n===6)throw Error(R(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,vn(e,je,Rt),Ve(e,he()),null}function us(e,t){var n=H;H|=1;try{return e(t)}finally{H=n,H===0&&(or=he()+500,Cl&&on())}}function Rn(e){Jt!==null&&Jt.tag===0&&(H&6)===0&&Zn();var t=H;H|=1;var n=tt.transition,r=X;try{if(tt.transition=null,X=1,e)return e()}finally{X=r,tt.transition=n,H=t,(H&6)===0&&on()}}function cs(){He=Jn.current,le(Jn)}function Nn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,th(n)),ye!==null)for(n=ye.return;n!==null;){var r=n;switch(Hi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&sl();break;case 3:ar(),le(ze),le(Pe),Zi();break;case 5:qi(r);break;case 4:ar();break;case 13:le(se);break;case 19:le(se);break;case 10:Qi(r.type._context);break;case 22:case 23:cs()}n=n.return}if(we=e,ye=e=tn(e.current,null),ke=He=t,_e=0,na=null,is=Dl=$n=0,je=Ir=null,gn!==null){for(t=0;t<gn.length;t++)if(n=gn[t],r=n.interleaved,r!==null){n.interleaved=null;var a=r.next,l=n.pending;if(l!==null){var o=l.next;l.next=a,r.next=o}n.pending=r}gn=null}return e}function tf(e,t){do{var n=ye;try{if(Ji(),Ja.current=yl,vl){for(var r=ue.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}vl=!1}if(kn=0,Ne=ge=ue=null,Ar=!1,Zr=0,os.current=null,n===null||n.return===null){_e=1,na=t,ye=null;break}e:{var l=e,o=n.return,i=n,s=t;if(t=ke,i.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var u=s,m=i,v=m.tag;if((m.mode&1)===0&&(v===0||v===11||v===15)){var h=m.alternate;h?(m.updateQueue=h.updateQueue,m.memoizedState=h.memoizedState,m.lanes=h.lanes):(m.updateQueue=null,m.memoizedState=null)}var S=Xu(o);if(S!==null){S.flags&=-257,qu(S,o,i,l,t),S.mode&1&&Gu(l,u,t),t=S,s=u;var k=t.updateQueue;if(k===null){var w=new Set;w.add(s),t.updateQueue=w}else k.add(s);break e}else{if((t&1)===0){Gu(l,u,t),ds();break e}s=Error(R(426))}}else if(ie&&i.mode&1){var _=Xu(o);if(_!==null){(_.flags&65536)===0&&(_.flags|=256),qu(_,o,i,l,t),Wi(lr(s,i));break e}}l=s=lr(s,i),_e!==4&&(_e=2),Ir===null?Ir=[l]:Ir.push(l),l=o;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var d=Id(l,s,t);Hu(l,d);break e;case 1:i=s;var c=l.type,f=l.stateNode;if((l.flags&128)===0&&(typeof c.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Zt===null||!Zt.has(f)))){l.flags|=65536,t&=-t,l.lanes|=t;var g=jd(l,i,t);Hu(l,g);break e}}l=l.return}while(l!==null)}af(n)}catch(C){t=C,ye===n&&n!==null&&(ye=n=n.return);continue}break}while(!0)}function nf(){var e=gl.current;return gl.current=yl,e===null?yl:e}function ds(){(_e===0||_e===3||_e===2)&&(_e=4),we===null||($n&268435455)===0&&(Dl&268435455)===0||Wt(we,ke)}function wl(e,t){var n=H;H|=2;var r=nf();(we!==e||ke!==t)&&(Rt=null,Nn(e,t));do try{Rh();break}catch(a){tf(e,a)}while(!0);if(Ji(),H=n,gl.current=r,ye!==null)throw Error(R(261));return we=null,ke=0,_e}function Rh(){for(;ye!==null;)rf(ye)}function bh(){for(;ye!==null&&!em();)rf(ye)}function rf(e){var t=of(e.alternate,e,He);e.memoizedProps=e.pendingProps,t===null?af(e):ye=t,os.current=null}function af(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=_h(n,t,He),n!==null){ye=n;return}}else{if(n=Nh(n,t),n!==null){n.flags&=32767,ye=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{_e=6,ye=null;return}}if(t=t.sibling,t!==null){ye=t;return}ye=t=e}while(t!==null);_e===0&&(_e=5)}function vn(e,t,n){var r=X,a=tt.transition;try{tt.transition=null,X=1,Ch(e,t,n,r)}finally{tt.transition=a,X=r}return null}function Ch(e,t,n,r){do Zn();while(Jt!==null);if((H&6)!==0)throw Error(R(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(R(177));e.callbackNode=null,e.callbackPriority=0;var l=n.lanes|n.childLanes;if(cm(e,l),e===we&&(ye=we=null,ke=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Ba||(Ba=!0,sf(nl,function(){return Zn(),null})),l=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||l){l=tt.transition,tt.transition=null;var o=X;X=1;var i=H;H|=4,os.current=null,Sh(e,n),qd(n,e),Gm(ri),al=!!ni,ri=ni=null,e.current=n,Eh(n,e,a),tm(),H=i,X=o,tt.transition=l}else e.current=n;if(Ba&&(Ba=!1,Jt=e,Nl=a),l=e.pendingLanes,l===0&&(Zt=null),am(n.stateNode,r),Ve(e,he()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],r(a.value,{componentStack:a.stack,digest:a.digest});if(_l)throw _l=!1,e=Ei,Ei=null,e;return(Nl&1)!==0&&e.tag!==0&&Zn(),l=e.pendingLanes,(l&1)!==0?e===ki?jr++:(jr=0,ki=e):jr=0,on(),null}function Zn(){if(Jt!==null){var e=Ic(Nl),t=tt.transition,n=X;try{if(tt.transition=null,X=16>e?16:e,Jt===null)var r=!1;else{if(e=Jt,Jt=null,Nl=0,(H&6)!==0)throw Error(R(331));var a=H;for(H|=4,F=e.current;F!==null;){var l=F,o=l.child;if((F.flags&16)!==0){var i=l.deletions;if(i!==null){for(var s=0;s<i.length;s++){var u=i[s];for(F=u;F!==null;){var m=F;switch(m.tag){case 0:case 11:case 15:Ur(8,m,l)}var v=m.child;if(v!==null)v.return=m,F=v;else for(;F!==null;){m=F;var h=m.sibling,S=m.return;if(Yd(m),m===u){F=null;break}if(h!==null){h.return=S,F=h;break}F=S}}}var k=l.alternate;if(k!==null){var w=k.child;if(w!==null){k.child=null;do{var _=w.sibling;w.sibling=null,w=_}while(w!==null)}}F=l}}if((l.subtreeFlags&2064)!==0&&o!==null)o.return=l,F=o;else e:for(;F!==null;){if(l=F,(l.flags&2048)!==0)switch(l.tag){case 0:case 11:case 15:Ur(9,l,l.return)}var d=l.sibling;if(d!==null){d.return=l.return,F=d;break e}F=l.return}}var c=e.current;for(F=c;F!==null;){o=F;var f=o.child;if((o.subtreeFlags&2064)!==0&&f!==null)f.return=o,F=f;else e:for(o=c;F!==null;){if(i=F,(i.flags&2048)!==0)try{switch(i.tag){case 0:case 11:case 15:Tl(9,i)}}catch(C){fe(i,i.return,C)}if(i===o){F=null;break e}var g=i.sibling;if(g!==null){g.return=i.return,F=g;break e}F=i.return}}if(H=a,on(),Et&&typeof Et.onPostCommitFiberRoot=="function")try{Et.onPostCommitFiberRoot(El,e)}catch{}r=!0}return r}finally{X=n,tt.transition=t}}return!1}function dc(e,t,n){t=lr(n,t),t=Id(e,t,1),e=qt(e,t,1),t=Ae(),e!==null&&(ra(e,1,t),Ve(e,t))}function fe(e,t,n){if(e.tag===3)dc(e,e,n);else for(;t!==null;){if(t.tag===3){dc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Zt===null||!Zt.has(r))){e=lr(n,e),e=jd(t,e,1),t=qt(t,e,1),e=Ae(),t!==null&&(ra(t,1,e),Ve(t,e));break}}t=t.return}}function xh(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ae(),e.pingedLanes|=e.suspendedLanes&n,we===e&&(ke&n)===n&&(_e===4||_e===3&&(ke&130023424)===ke&&500>he()-ss?Nn(e,0):is|=n),Ve(e,t)}function lf(e,t){t===0&&((e.mode&1)===0?t=1:(t=Ca,Ca<<=1,(Ca&130023424)===0&&(Ca=4194304)));var n=Ae();e=Ft(e,t),e!==null&&(ra(e,t,n),Ve(e,n))}function Ph(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),lf(e,n)}function Th(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(R(314))}r!==null&&r.delete(t),lf(e,n)}var of;of=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ze.current)Me=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return Me=!1,gh(e,t,n);Me=(e.flags&131072)!==0}else Me=!1,ie&&(t.flags&1048576)!==0&&cd(t,dl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ya(e,t),e=t.pendingProps;var a=tr(t,Pe.current);qn(t,n),a=ts(null,t,r,e,a,n);var l=ns();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Be(r)?(l=!0,ul(t)):l=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Gi(t),a.updater=Pl,t.stateNode=a,a._reactInternals=t,fi(t,r,e,n),t=hi(null,t,r,!0,l,n)):(t.tag=0,ie&&l&&Vi(t),Oe(null,t,a,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ya(e,t),e=t.pendingProps,a=r._init,r=a(r._payload),t.type=r,a=t.tag=Fh(r),e=ut(r,e),a){case 0:t=mi(null,t,r,e,n);break e;case 1:t=tc(null,t,r,e,n);break e;case 11:t=Zu(null,t,r,e,n);break e;case 14:t=ec(null,t,r,ut(r.type,e),n);break e}throw Error(R(306,r,""))}return t;case 0:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:ut(r,a),mi(e,t,r,a,n);case 1:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:ut(r,a),tc(e,t,r,a,n);case 3:e:{if(Vd(t),e===null)throw Error(R(387));r=t.pendingProps,l=t.memoizedState,a=l.element,vd(e,t),ml(t,r,null,n);var o=t.memoizedState;if(r=o.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){a=lr(Error(R(423)),t),t=nc(e,t,r,n,a);break e}else if(r!==a){a=lr(Error(R(424)),t),t=nc(e,t,r,n,a);break e}else for(We=Xt(t.stateNode.containerInfo.firstChild),Ke=t,ie=!0,dt=null,n=md(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(nr(),r===a){t=Lt(e,t,n);break e}Oe(e,t,r,n)}t=t.child}return t;case 5:return yd(t),e===null&&ui(t),r=t.type,a=t.pendingProps,l=e!==null?e.memoizedProps:null,o=a.children,ai(r,a)?o=null:l!==null&&ai(r,l)&&(t.flags|=32),Bd(e,t),Oe(e,t,o,n),t.child;case 6:return e===null&&ui(t),null;case 13:return Hd(e,t,n);case 4:return Xi(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=rr(t,null,r,n):Oe(e,t,r,n),t.child;case 11:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:ut(r,a),Zu(e,t,r,a,n);case 7:return Oe(e,t,t.pendingProps,n),t.child;case 8:return Oe(e,t,t.pendingProps.children,n),t.child;case 12:return Oe(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,a=t.pendingProps,l=t.memoizedProps,o=a.value,ne(fl,r._currentValue),r._currentValue=o,l!==null)if(mt(l.value,o)){if(l.children===a.children&&!ze.current){t=Lt(e,t,n);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var i=l.dependencies;if(i!==null){o=l.child;for(var s=i.firstContext;s!==null;){if(s.context===r){if(l.tag===1){s=Pt(-1,n&-n),s.tag=2;var u=l.updateQueue;if(u!==null){u=u.shared;var m=u.pending;m===null?s.next=s:(s.next=m.next,m.next=s),u.pending=s}}l.lanes|=n,s=l.alternate,s!==null&&(s.lanes|=n),ci(l.return,n,t),i.lanes|=n;break}s=s.next}}else if(l.tag===10)o=l.type===t.type?null:l.child;else if(l.tag===18){if(o=l.return,o===null)throw Error(R(341));o.lanes|=n,i=o.alternate,i!==null&&(i.lanes|=n),ci(o,n,t),o=l.sibling}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===t){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}Oe(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,r=t.pendingProps.children,qn(t,n),a=nt(a),r=r(a),t.flags|=1,Oe(e,t,r,n),t.child;case 14:return r=t.type,a=ut(r,t.pendingProps),a=ut(r.type,a),ec(e,t,r,a,n);case 15:return Md(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:ut(r,a),Ya(e,t),t.tag=1,Be(r)?(e=!0,ul(t)):e=!1,qn(t,n),Ud(t,r,a),fi(t,r,a,n),hi(null,t,r,!0,e,n);case 19:return Wd(e,t,n);case 22:return zd(e,t,n)}throw Error(R(156,t.tag))};function sf(e,t){return Lc(e,t)}function Dh(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function et(e,t,n,r){return new Dh(e,t,n,r)}function fs(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Fh(e){if(typeof e=="function")return fs(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ti)return 11;if(e===Di)return 14}return 2}function tn(e,t){var n=e.alternate;return n===null?(n=et(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function qa(e,t,n,r,a,l){var o=2;if(r=e,typeof e=="function")fs(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Un:return wn(n.children,a,l,t);case Pi:o=8,a|=8;break;case Ao:return e=et(12,n,t,a|2),e.elementType=Ao,e.lanes=l,e;case Uo:return e=et(13,n,t,a),e.elementType=Uo,e.lanes=l,e;case Io:return e=et(19,n,t,a),e.elementType=Io,e.lanes=l,e;case yc:return Fl(n,a,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case hc:o=10;break e;case vc:o=9;break e;case Ti:o=11;break e;case Di:o=14;break e;case Bt:o=16,r=null;break e}throw Error(R(130,e==null?e:typeof e,""))}return t=et(o,n,t,a),t.elementType=e,t.type=r,t.lanes=l,t}function wn(e,t,n,r){return e=et(7,e,r,t),e.lanes=n,e}function Fl(e,t,n,r){return e=et(22,e,r,t),e.elementType=yc,e.lanes=n,e.stateNode={isHidden:!1},e}function Fo(e,t,n){return e=et(6,e,null,t),e.lanes=n,e}function Lo(e,t,n){return t=et(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Lh(e,t,n,r,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=yo(0),this.expirationTimes=yo(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=yo(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function ps(e,t,n,r,a,l,o,i,s){return e=new Lh(e,t,n,i,s),t===1?(t=1,l===!0&&(t|=8)):t=0,l=et(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Gi(l),e}function Oh(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:An,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function uf(e){if(!e)return rn;e=e._reactInternals;e:{if(Cn(e)!==e||e.tag!==1)throw Error(R(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Be(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(R(171))}if(e.tag===1){var n=e.type;if(Be(n))return sd(e,n,t)}return t}function cf(e,t,n,r,a,l,o,i,s){return e=ps(n,r,!0,e,a,l,o,i,s),e.context=uf(null),n=e.current,r=Ae(),a=en(n),l=Pt(r,a),l.callback=t??null,qt(n,l,a),e.current.lanes=a,ra(e,a,r),Ve(e,r),e}function Ll(e,t,n,r){var a=t.current,l=Ae(),o=en(a);return n=uf(n),t.context===null?t.context=n:t.pendingContext=n,t=Pt(l,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=qt(a,t,o),e!==null&&(pt(e,a,o,l),Ka(e,a,o)),o}function Sl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function fc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ms(e,t){fc(e,t),(e=e.alternate)&&fc(e,t)}function Ah(){return null}var df=typeof reportError=="function"?reportError:function(e){console.error(e)};function hs(e){this._internalRoot=e}Ol.prototype.render=hs.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(R(409));Ll(e,t,null,null)};Ol.prototype.unmount=hs.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Rn(function(){Ll(null,e,null,null)}),t[Dt]=null}};function Ol(e){this._internalRoot=e}Ol.prototype.unstable_scheduleHydration=function(e){if(e){var t=zc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ht.length&&t!==0&&t<Ht[n].priority;n++);Ht.splice(n,0,e),n===0&&Vc(e)}};function vs(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Al(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function pc(){}function Uh(e,t,n,r,a){if(a){if(typeof r=="function"){var l=r;r=function(){var u=Sl(o);l.call(u)}}var o=cf(t,r,e,0,null,!1,!1,"",pc);return e._reactRootContainer=o,e[Dt]=o.current,Qr(e.nodeType===8?e.parentNode:e),Rn(),o}for(;a=e.lastChild;)e.removeChild(a);if(typeof r=="function"){var i=r;r=function(){var u=Sl(s);i.call(u)}}var s=ps(e,0,!1,null,null,!1,!1,"",pc);return e._reactRootContainer=s,e[Dt]=s.current,Qr(e.nodeType===8?e.parentNode:e),Rn(function(){Ll(t,s,n,r)}),s}function Ul(e,t,n,r,a){var l=n._reactRootContainer;if(l){var o=l;if(typeof a=="function"){var i=a;a=function(){var s=Sl(o);i.call(s)}}Ll(t,o,e,a)}else o=Uh(n,t,e,a,r);return Sl(o)}jc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=xr(t.pendingLanes);n!==0&&(Oi(t,n|1),Ve(t,he()),(H&6)===0&&(or=he()+500,on()))}break;case 13:Rn(function(){var r=Ft(e,1);if(r!==null){var a=Ae();pt(r,e,1,a)}}),ms(e,1)}};Ai=function(e){if(e.tag===13){var t=Ft(e,134217728);if(t!==null){var n=Ae();pt(t,e,134217728,n)}ms(e,134217728)}};Mc=function(e){if(e.tag===13){var t=en(e),n=Ft(e,t);if(n!==null){var r=Ae();pt(n,e,t,r)}ms(e,t)}};zc=function(){return X};Bc=function(e,t){var n=X;try{return X=e,t()}finally{X=n}};Qo=function(e,t,n){switch(t){case"input":if(zo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=bl(r);if(!a)throw Error(R(90));_c(r),zo(r,a)}}}break;case"textarea":wc(e,n);break;case"select":t=n.value,t!=null&&Qn(e,!!n.multiple,t,!1)}};Cc=us;xc=Rn;var Ih={usingClientEntryPoint:!1,Events:[la,zn,bl,Rc,bc,us]},$r={findFiberByHostInstance:yn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},jh={bundleType:$r.bundleType,version:$r.version,rendererPackageName:$r.rendererPackageName,rendererConfig:$r.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ot.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Dc(e),e===null?null:e.stateNode},findFiberByHostInstance:$r.findFiberByHostInstance||Ah,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Rr=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Rr.isDisabled&&Rr.supportsFiber))try{El=Rr.inject(jh),Et=Rr}catch{}var Rr;Ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ih;Ye.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!vs(t))throw Error(R(200));return Oh(e,t,null,n)};Ye.createRoot=function(e,t){if(!vs(e))throw Error(R(299));var n=!1,r="",a=df;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=ps(e,1,!1,null,null,n,!1,r,a),e[Dt]=t.current,Qr(e.nodeType===8?e.parentNode:e),new hs(t)};Ye.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(R(188)):(e=Object.keys(e).join(","),Error(R(268,e)));return e=Dc(t),e=e===null?null:e.stateNode,e};Ye.flushSync=function(e){return Rn(e)};Ye.hydrate=function(e,t,n){if(!Al(t))throw Error(R(200));return Ul(null,e,t,!0,n)};Ye.hydrateRoot=function(e,t,n){if(!vs(e))throw Error(R(405));var r=n!=null&&n.hydratedSources||null,a=!1,l="",o=df;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=cf(t,null,e,1,n??null,a,!1,l,o),e[Dt]=t.current,Qr(e),r)for(e=0;e<r.length;e++)n=r[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new Ol(t)};Ye.render=function(e,t,n){if(!Al(t))throw Error(R(200));return Ul(null,e,t,!1,n)};Ye.unmountComponentAtNode=function(e){if(!Al(e))throw Error(R(40));return e._reactRootContainer?(Rn(function(){Ul(null,null,e,!1,function(){e._reactRootContainer=null,e[Dt]=null})}),!0):!1};Ye.unstable_batchedUpdates=us;Ye.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Al(n))throw Error(R(200));if(e==null||e._reactInternals===void 0)throw Error(R(38));return Ul(e,t,n,!1,r)};Ye.version="18.3.1-next-f1338f8080-20240426"});var ys=pn((Ry,mf)=>{"use strict";function pf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(pf)}catch(e){console.error(e)}}pf(),mf.exports=ff()});var vf=pn(gs=>{"use strict";var hf=ys();gs.createRoot=hf.createRoot,gs.hydrateRoot=hf.hydrateRoot;var by});var $=pr(hr(),1),lp=pr(vf(),1);var Q=pr(hr()),xv=pr(ys());var T=pr(hr());function ia(){return ia=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ia.apply(this,arguments)}var ht;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(ht||(ht={}));var yf="popstate";function Sf(e){e===void 0&&(e={});function t(r,a){let{pathname:l,search:o,hash:i}=r.location;return Ns("",{pathname:l,search:o,hash:i},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(r,a){return typeof a=="string"?a:xn(a)}return zh(t,n,null,e)}function oe(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ws(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Mh(){return Math.random().toString(36).substr(2,8)}function gf(e,t){return{usr:e.state,key:e.key,idx:t}}function Ns(e,t,n,r){return n===void 0&&(n=null),ia({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?At(t):t,{state:n,key:t&&t.key||r||Mh()})}function xn(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function At(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function zh(e,t,n,r){r===void 0&&(r={});let{window:a=document.defaultView,v5Compat:l=!1}=r,o=a.history,i=ht.Pop,s=null,u=m();u==null&&(u=0,o.replaceState(ia({},o.state,{idx:u}),""));function m(){return(o.state||{idx:null}).idx}function v(){i=ht.Pop;let _=m(),d=_==null?null:_-u;u=_,s&&s({action:i,location:w.location,delta:d})}function h(_,d){i=ht.Push;let c=Ns(w.location,_,d);n&&n(c,_),u=m()+1;let f=gf(c,u),g=w.createHref(c);try{o.pushState(f,"",g)}catch(C){if(C instanceof DOMException&&C.name==="DataCloneError")throw C;a.location.assign(g)}l&&s&&s({action:i,location:w.location,delta:1})}function S(_,d){i=ht.Replace;let c=Ns(w.location,_,d);n&&n(c,_),u=m();let f=gf(c,u),g=w.createHref(c);o.replaceState(f,"",g),l&&s&&s({action:i,location:w.location,delta:0})}function k(_){let d=a.location.origin!=="null"?a.location.origin:a.location.href,c=typeof _=="string"?_:xn(_);return c=c.replace(/ $/,"%20"),oe(d,"No window.location.(origin|href) available to create URL for href: "+c),new URL(c,d)}let w={get action(){return i},get location(){return e(a,o)},listen(_){if(s)throw new Error("A history only accepts one active listener");return a.addEventListener(yf,v),s=_,()=>{a.removeEventListener(yf,v),s=null}},createHref(_){return t(a,_)},createURL:k,encodeLocation(_){let d=k(_);return{pathname:d.pathname,search:d.search,hash:d.hash}},push:h,replace:S,go(_){return o.go(_)}};return w}var _f;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(_f||(_f={}));function Il(e,t,n){return n===void 0&&(n="/"),Bh(e,t,n,!1)}function Bh(e,t,n,r){let a=typeof t=="string"?At(t):t,l=un(a.pathname||"/",n);if(l==null)return null;let o=Ef(e);Vh(o);let i=null;for(let s=0;i==null&&s<o.length;++s){let u=$f(l);i=qh(o[s],u,r)}return i}function Ef(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let a=(l,o,i)=>{let s={relativePath:i===void 0?l.path||"":i,caseSensitive:l.caseSensitive===!0,childrenIndex:o,route:l};s.relativePath.startsWith("/")&&(oe(s.relativePath.startsWith(r),'Absolute route path "'+s.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),s.relativePath=s.relativePath.slice(r.length));let u=$t([r,s.relativePath]),m=n.concat(s);l.children&&l.children.length>0&&(oe(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),Ef(l.children,t,m,u)),!(l.path==null&&!l.index)&&t.push({path:u,score:Gh(u,l.index),routesMeta:m})};return e.forEach((l,o)=>{var i;if(l.path===""||!((i=l.path)!=null&&i.includes("?")))a(l,o);else for(let s of kf(l.path))a(l,o,s)}),t}function kf(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,a=n.endsWith("?"),l=n.replace(/\?$/,"");if(r.length===0)return a?[l,""]:[l];let o=kf(r.join("/")),i=[];return i.push(...o.map(s=>s===""?l:[l,s].join("/"))),a&&i.push(...o),i.map(s=>e.startsWith("/")&&s===""?"/":s)}function Vh(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Xh(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var Hh=/^:[\w-]+$/,Wh=3,Kh=2,Jh=1,Qh=10,Yh=-2,Nf=e=>e==="*";function Gh(e,t){let n=e.split("/"),r=n.length;return n.some(Nf)&&(r+=Yh),t&&(r+=Kh),n.filter(a=>!Nf(a)).reduce((a,l)=>a+(Hh.test(l)?Wh:l===""?Jh:Qh),r)}function Xh(e,t){return e.length===t.length&&e.slice(0,-1).every((r,a)=>r===t[a])?e[e.length-1]-t[t.length-1]:0}function qh(e,t,n){n===void 0&&(n=!1);let{routesMeta:r}=e,a={},l="/",o=[];for(let i=0;i<r.length;++i){let s=r[i],u=i===r.length-1,m=l==="/"?t:t.slice(l.length)||"/",v=sn({path:s.relativePath,caseSensitive:s.caseSensitive,end:u},m),h=s.route;if(!v&&u&&n&&!r[r.length-1].route.index&&(v=sn({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},m)),!v)return null;Object.assign(a,v.params),o.push({params:a,pathname:$t([l,v.pathname]),pathnameBase:rv($t([l,v.pathnameBase])),route:h}),v.pathnameBase!=="/"&&(l=$t([l,v.pathnameBase]))}return o}function sn(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Zh(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let l=a[0],o=l.replace(/(.)\/+$/,"$1"),i=a.slice(1);return{params:r.reduce((u,m,v)=>{let{paramName:h,isOptional:S}=m;if(h==="*"){let w=i[v]||"";o=l.slice(0,l.length-w.length).replace(/(.)\/+$/,"$1")}let k=i[v];return S&&!k?u[h]=void 0:u[h]=(k||"").replace(/%2F/g,"/"),u},{}),pathname:l,pathnameBase:o,pattern:e}}function Zh(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),ws(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,i,s)=>(r.push({paramName:i,isOptional:s!=null}),s?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function $f(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ws(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function un(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}var ev=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,tv=e=>ev.test(e);function Ss(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:a=""}=typeof e=="string"?At(e):e,l;if(n)if(tv(n))l=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),ws(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?l=wf(n.substring(1),"/"):l=wf(n,t)}else l=t;return{pathname:l,search:av(r),hash:lv(a)}}function wf(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function _s(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function nv(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function jl(e,t){let n=nv(e);return t?n.map((r,a)=>a===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Ml(e,t,n,r){r===void 0&&(r=!1);let a;typeof e=="string"?a=At(e):(a=ia({},e),oe(!a.pathname||!a.pathname.includes("?"),_s("?","pathname","search",a)),oe(!a.pathname||!a.pathname.includes("#"),_s("#","pathname","hash",a)),oe(!a.search||!a.search.includes("#"),_s("#","search","hash",a)));let l=e===""||a.pathname==="",o=l?"/":a.pathname,i;if(o==null)i=n;else{let v=t.length-1;if(!r&&o.startsWith("..")){let h=o.split("/");for(;h[0]==="..";)h.shift(),v-=1;a.pathname=h.join("/")}i=v>=0?t[v]:"/"}let s=Ss(a,i),u=o&&o!=="/"&&o.endsWith("/"),m=(l||o===".")&&n.endsWith("/");return!s.pathname.endsWith("/")&&(u||m)&&(s.pathname+="/"),s}var $t=e=>e.join("/").replace(/\/\/+/g,"/"),rv=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),av=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,lv=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function zl(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var Rf=["post","put","patch","delete"],xy=new Set(Rf),ov=["get",...Rf],Py=new Set(ov);var Ty=Symbol("deferred");function sa(){return sa=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},sa.apply(this,arguments)}var cr=T.createContext(null),Vl=T.createContext(null);var vt=T.createContext(null),ca=T.createContext(null),yt=T.createContext({outlet:null,matches:[],isDataRoute:!1}),xf=T.createContext(null);function ks(e,t){let{relative:n}=t===void 0?{}:t;Pn()||oe(!1);let{basename:r,navigator:a}=T.useContext(vt),{hash:l,pathname:o,search:i}=dr(e,{relative:n}),s=o;return r!=="/"&&(s=o==="/"?r:$t([r,o])),a.createHref({pathname:s,search:i,hash:l})}function Pn(){return T.useContext(ca)!=null}function cn(){return Pn()||oe(!1),T.useContext(ca).location}function Pf(e){T.useContext(vt).static||T.useLayoutEffect(e)}function Ut(){let{isDataRoute:e}=T.useContext(yt);return e?Sv():mv()}function mv(){Pn()||oe(!1);let e=T.useContext(cr),{basename:t,future:n,navigator:r}=T.useContext(vt),{matches:a}=T.useContext(yt),{pathname:l}=cn(),o=JSON.stringify(jl(a,n.v7_relativeSplatPath)),i=T.useRef(!1);return Pf(()=>{i.current=!0}),T.useCallback(function(u,m){if(m===void 0&&(m={}),!i.current)return;if(typeof u=="number"){r.go(u);return}let v=Ml(u,JSON.parse(o),l,m.relative==="path");e==null&&t!=="/"&&(v.pathname=v.pathname==="/"?t:$t([t,v.pathname])),(m.replace?r.replace:r.push)(v,m.state,m)},[t,r,o,l,e])}function Hl(){let{matches:e}=T.useContext(yt),t=e[e.length-1];return t?t.params:{}}function dr(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=T.useContext(vt),{matches:a}=T.useContext(yt),{pathname:l}=cn(),o=JSON.stringify(jl(a,r.v7_relativeSplatPath));return T.useMemo(()=>Ml(e,JSON.parse(o),l,n==="path"),[e,o,l,n])}function Tf(e,t){return Df(e,t)}function Df(e,t,n,r){Pn()||oe(!1);let{navigator:a}=T.useContext(vt),{matches:l}=T.useContext(yt),o=l[l.length-1],i=o?o.params:{},s=o?o.pathname:"/",u=o?o.pathnameBase:"/",m=o&&o.route,v=cn(),h;if(t){var S;let c=typeof t=="string"?At(t):t;u==="/"||(S=c.pathname)!=null&&S.startsWith(u)||oe(!1),h=c}else h=v;let k=h.pathname||"/",w=k;if(u!=="/"){let c=u.replace(/^\//,"").split("/");w="/"+k.replace(/^\//,"").split("/").slice(c.length).join("/")}let _=Il(e,{pathname:w}),d=gv(_&&_.map(c=>Object.assign({},c,{params:Object.assign({},i,c.params),pathname:$t([u,a.encodeLocation?a.encodeLocation(c.pathname).pathname:c.pathname]),pathnameBase:c.pathnameBase==="/"?u:$t([u,a.encodeLocation?a.encodeLocation(c.pathnameBase).pathname:c.pathnameBase])})),l,n,r);return t&&d?T.createElement(ca.Provider,{value:{location:sa({pathname:"/",search:"",hash:"",state:null,key:"default"},h),navigationType:ht.Pop}},d):d}function hv(){let e=Of(),t=zl(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",a={padding:"0.5rem",backgroundColor:r},l={padding:"2px 4px",backgroundColor:r};return T.createElement(T.Fragment,null,T.createElement("h2",null,"Unexpected Application Error!"),T.createElement("h3",{style:{fontStyle:"italic"}},t),n?T.createElement("pre",{style:a},n):null,null)}var vv=T.createElement(hv,null),Es=class extends T.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?T.createElement(yt.Provider,{value:this.props.routeContext},T.createElement(xf.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function yv(e){let{routeContext:t,match:n,children:r}=e,a=T.useContext(cr);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),T.createElement(yt.Provider,{value:t},r)}function gv(e,t,n,r){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var l;if(!n)return null;if(n.errors)e=n.matches;else if((l=r)!=null&&l.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,i=(a=n)==null?void 0:a.errors;if(i!=null){let m=o.findIndex(v=>v.route.id&&i?.[v.route.id]!==void 0);m>=0||oe(!1),o=o.slice(0,Math.min(o.length,m+1))}let s=!1,u=-1;if(n&&r&&r.v7_partialHydration)for(let m=0;m<o.length;m++){let v=o[m];if((v.route.HydrateFallback||v.route.hydrateFallbackElement)&&(u=m),v.route.id){let{loaderData:h,errors:S}=n,k=v.route.loader&&h[v.route.id]===void 0&&(!S||S[v.route.id]===void 0);if(v.route.lazy||k){s=!0,u>=0?o=o.slice(0,u+1):o=[o[0]];break}}}return o.reduceRight((m,v,h)=>{let S,k=!1,w=null,_=null;n&&(S=i&&v.route.id?i[v.route.id]:void 0,w=v.route.errorElement||vv,s&&(u<0&&h===0?(Ev("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),k=!0,_=null):u===h&&(k=!0,_=v.route.hydrateFallbackElement||null)));let d=t.concat(o.slice(0,h+1)),c=()=>{let f;return S?f=w:k?f=_:v.route.Component?f=T.createElement(v.route.Component,null):v.route.element?f=v.route.element:f=m,T.createElement(yv,{match:v,routeContext:{outlet:m,matches:d,isDataRoute:n!=null},children:f})};return n&&(v.route.ErrorBoundary||v.route.errorElement||h===0)?T.createElement(Es,{location:n.location,revalidation:n.revalidation,component:w,error:S,children:c(),routeContext:{outlet:null,matches:d,isDataRoute:!0}}):c()},null)}var Ff=(function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e})(Ff||{}),Bl=(function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e})(Bl||{});function _v(e){let t=T.useContext(cr);return t||oe(!1),t}function Nv(e){let t=T.useContext(Vl);return t||oe(!1),t}function wv(e){let t=T.useContext(yt);return t||oe(!1),t}function Lf(e){let t=wv(e),n=t.matches[t.matches.length-1];return n.route.id||oe(!1),n.route.id}function Of(){var e;let t=T.useContext(xf),n=Nv(Bl.UseRouteError),r=Lf(Bl.UseRouteError);return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function Sv(){let{router:e}=_v(Ff.UseNavigateStable),t=Lf(Bl.UseNavigateStable),n=T.useRef(!1);return Pf(()=>{n.current=!0}),T.useCallback(function(a,l){l===void 0&&(l={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,sa({fromRouteId:t},l)))},[e,t])}var bf={};function Ev(e,t,n){!t&&!bf[e]&&(bf[e]=!0)}var ur=(e,t,n)=>(""+t+("You can use the `"+e+"` future flag to opt-in early. ")+("For more information, see "+n+"."),void 0);function Af(e,t){e?.v7_startTransition===void 0&&ur("v7_startTransition","React Router will begin wrapping state updates in `React.startTransition` in v7","https://reactrouter.com/v6/upgrading/future#v7_starttransition"),e?.v7_relativeSplatPath===void 0&&(!t||t.v7_relativeSplatPath===void 0)&&ur("v7_relativeSplatPath","Relative route resolution within Splat routes is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath"),t&&(t.v7_fetcherPersist===void 0&&ur("v7_fetcherPersist","The persistence behavior of fetchers is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist"),t.v7_normalizeFormMethod===void 0&&ur("v7_normalizeFormMethod","Casing of `formMethod` fields is being normalized to uppercase in v7","https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod"),t.v7_partialHydration===void 0&&ur("v7_partialHydration","`RouterProvider` hydration behavior is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_partialhydration"),t.v7_skipActionErrorRevalidation===void 0&&ur("v7_skipActionErrorRevalidation","The revalidation behavior after 4xx/5xx `action` responses is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation"))}var kv="startTransition",Iy=T[kv];function $s(e){let{to:t,replace:n,state:r,relative:a}=e;Pn()||oe(!1);let{future:l,static:o}=T.useContext(vt),{matches:i}=T.useContext(yt),{pathname:s}=cn(),u=Ut(),m=Ml(t,jl(i,l.v7_relativeSplatPath),s,a==="path"),v=JSON.stringify(m);return T.useEffect(()=>u(JSON.parse(v),{replace:n,state:r,relative:a}),[u,v,a,n,r]),null}function gt(e){oe(!1)}function Rs(e){let{basename:t="/",children:n=null,location:r,navigationType:a=ht.Pop,navigator:l,static:o=!1,future:i}=e;Pn()&&oe(!1);let s=t.replace(/^\/*/,"/"),u=T.useMemo(()=>({basename:s,navigator:l,static:o,future:sa({v7_relativeSplatPath:!1},i)}),[s,i,l,o]);typeof r=="string"&&(r=At(r));let{pathname:m="/",search:v="",hash:h="",state:S=null,key:k="default"}=r,w=T.useMemo(()=>{let _=un(m,s);return _==null?null:{location:{pathname:_,search:v,hash:h,state:S,key:k},navigationType:a}},[s,m,v,h,S,k,a]);return w==null?null:T.createElement(vt.Provider,{value:u},T.createElement(ca.Provider,{children:n,value:w}))}function bs(e){let{children:t,location:n}=e;return Tf(ua(t),n)}var jy=new Promise(()=>{});function ua(e,t){t===void 0&&(t=[]);let n=[];return T.Children.forEach(e,(r,a)=>{if(!T.isValidElement(r))return;let l=[...t,a];if(r.type===T.Fragment){n.push.apply(n,ua(r.props.children,l));return}r.type!==gt&&oe(!1),!r.props.index||!r.props.children||oe(!1);let o={id:r.props.id||l.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=ua(r.props.children,l)),n.push(o)}),n}function Wl(){return Wl=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Wl.apply(this,arguments)}function jf(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,l;for(l=0;l<r.length;l++)a=r[l],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function Pv(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Tv(e,t){return e.button===0&&(!t||t==="_self")&&!Pv(e)}var Dv=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Fv=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"];var Lv="6";try{window.__reactRouterVersion=Lv}catch{}var Ov=Q.createContext({isTransitioning:!1});var Av="startTransition",Uf=Q[Av],Uv="flushSync",cg=xv[Uv],Iv="useId",dg=Q[Iv];function Mf(e){let{basename:t,children:n,future:r,window:a}=e,l=Q.useRef();l.current==null&&(l.current=Sf({window:a,v5Compat:!0}));let o=l.current,[i,s]=Q.useState({action:o.action,location:o.location}),{v7_startTransition:u}=r||{},m=Q.useCallback(v=>{u&&Uf?Uf(()=>s(v)):s(v)},[s,u]);return Q.useLayoutEffect(()=>o.listen(m),[o,m]),Q.useEffect(()=>Af(r),[r]),Q.createElement(Rs,{basename:t,children:n,location:i.location,navigationType:i.action,navigator:o,future:r})}var jv=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Mv=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ge=Q.forwardRef(function(t,n){let{onClick:r,relative:a,reloadDocument:l,replace:o,state:i,target:s,to:u,preventScrollReset:m,viewTransition:v}=t,h=jf(t,Dv),{basename:S}=Q.useContext(vt),k,w=!1;if(typeof u=="string"&&Mv.test(u)&&(k=u,jv))try{let f=new URL(window.location.href),g=u.startsWith("//")?new URL(f.protocol+u):new URL(u),C=un(g.pathname,S);g.origin===f.origin&&C!=null?u=C+g.search+g.hash:w=!0}catch{}let _=ks(u,{relative:a}),d=Bv(u,{replace:o,state:i,target:s,preventScrollReset:m,relative:a,viewTransition:v});function c(f){r&&r(f),f.defaultPrevented||d(f)}return Q.createElement("a",Wl({},h,{href:k||_,onClick:w||l?r:c,ref:n,target:s}))}),zf=Q.forwardRef(function(t,n){let{"aria-current":r="page",caseSensitive:a=!1,className:l="",end:o=!1,style:i,to:s,viewTransition:u,children:m}=t,v=jf(t,Fv),h=dr(s,{relative:v.relative}),S=cn(),k=Q.useContext(Vl),{navigator:w,basename:_}=Q.useContext(vt),d=k!=null&&Vv(h)&&u===!0,c=w.encodeLocation?w.encodeLocation(h).pathname:h.pathname,f=S.pathname,g=k&&k.navigation&&k.navigation.location?k.navigation.location.pathname:null;a||(f=f.toLowerCase(),g=g?g.toLowerCase():null,c=c.toLowerCase()),g&&_&&(g=un(g,_)||g);let C=c!=="/"&&c.endsWith("/")?c.length-1:c.length,x=f===c||!o&&f.startsWith(c)&&f.charAt(C)==="/",L=g!=null&&(g===c||!o&&g.startsWith(c)&&g.charAt(c.length)==="/"),D={isActive:x,isPending:L,isTransitioning:d},O=x?r:void 0,I;typeof l=="function"?I=l(D):I=[l,x?"active":null,L?"pending":null,d?"transitioning":null].filter(Boolean).join(" ");let J=typeof i=="function"?i(D):i;return Q.createElement(Ge,Wl({},v,{"aria-current":O,className:I,ref:n,style:J,to:s,viewTransition:u}),typeof m=="function"?m(D):m)});var Cs;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Cs||(Cs={}));var If;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(If||(If={}));function zv(e){let t=Q.useContext(cr);return t||oe(!1),t}function Bv(e,t){let{target:n,replace:r,state:a,preventScrollReset:l,relative:o,viewTransition:i}=t===void 0?{}:t,s=Ut(),u=cn(),m=dr(e,{relative:o});return Q.useCallback(v=>{if(Tv(v,n)){v.preventDefault();let h=r!==void 0?r:xn(u)===xn(m);s(e,{replace:h,state:a,preventScrollReset:l,relative:o,viewTransition:i})}},[u,s,m,r,a,n,e,l,o,i])}function Vv(e,t){t===void 0&&(t={});let n=Q.useContext(Ov);n==null&&oe(!1);let{basename:r}=zv(Cs.useViewTransitionState),a=dr(e,{relative:t.relative});if(!n.isTransitioning)return!1;let l=un(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=un(n.nextLocation.pathname,r)||n.nextLocation.pathname;return sn(a.pathname,o)!=null||sn(a.pathname,l)!=null}var Vf=function(e,t,n,r){var a;t[0]=0;for(var l=1;l<t.length;l++){var o=t[l++],i=t[l]?(t[0]|=o?1:2,n[t[l++]]):t[++l];o===3?r[0]=i:o===4?r[1]=Object.assign(r[1]||{},i):o===5?(r[1]=r[1]||{})[t[++l]]=i:o===6?r[1][t[++l]]+=i+"":o?(a=e.apply(i,Vf(e,i,n,["",null])),r.push(a),i[0]?t[0]|=2:(t[l-2]=0,t[l]=a)):r.push(i)}return r},Bf=new Map;function Hf(e){var t=Bf.get(this);return t||(t=new Map,Bf.set(this,t)),(t=Vf(this,t.get(e)||(t.set(e,t=(function(n){for(var r,a,l=1,o="",i="",s=[0],u=function(h){l===1&&(h||(o=o.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(0,h,o):l===3&&(h||o)?(s.push(3,h,o),l=2):l===2&&o==="..."&&h?s.push(4,h,0):l===2&&o&&!h?s.push(5,0,!0,o):l>=5&&((o||!h&&l===5)&&(s.push(l,0,o,a),l=6),h&&(s.push(l,h,0,a),l=6)),o=""},m=0;m<n.length;m++){m&&(l===1&&u(),u(m));for(var v=0;v<n[m].length;v++)r=n[m][v],l===1?r==="<"?(u(),s=[s],l=3):o+=r:l===4?o==="--"&&r===">"?(l=1,o=""):o=r+o[0]:i?r===i?i="":o+=r:r==='"'||r==="'"?i=r:r===">"?(u(),l=1):l&&(r==="="?(l=5,a=o,o=""):r==="/"&&(l<5||n[m][v+1]===">")?(u(),l===3&&(s=s[0]),l=s,(s=s[0]).push(2,0,l),l=0):r===" "||r==="	"||r===`
`||r==="\r"?(u(),l=2):o+=r),l===3&&o==="!--"&&(l=4,s=s[0])}return u(),s})(e)),t),arguments,[])).length>1?t:t[0]}var xs=typeof window<"u"?window.__CONTENT_ENGINE_UI_CONFIG__||{}:{};function Kl(e){return String(e||"").replace(/\/+$/,"")}function Hv(){return typeof window<"u"&&window.location?.origin?window.location.origin:"http://localhost:8080"}function Wf(e,t){let n=String(e||"").trim();if(!n)return Kl(t);try{return Kl(new URL(n,t).toString())}catch{return Kl(t)}}function Wv(e){return e.startsWith("data:")||e.startsWith("blob:")}function Kf(e,t){let n=String(e||"").trim();if(!n)return"";if(Wv(n))return n;try{return new URL(n).toString()}catch{return new URL(n,`${Kl(t)}/`).toString()}}var Jf=Wf(xs.apiBaseUrl,Hv()),Kv=Wf(xs.assetBaseUrl||xs.apiBaseUrl,Jf);function Qf(e){return Kf(e,Jf)}function fr(e){return Kf(e,Kv)}var Jl=document.getElementById("boot-fallback"),Yf=document.getElementById("boot-fallback-message");function Jv(e){Yf&&(Yf.textContent=e)}function Qv(e){e&&Jv(e),Jl&&Jl.classList.remove("hidden")}function Yv(){Jl&&Jl.classList.add("hidden")}function fa(e,t){t&&console.error(e,t),Qv(e)}var y=Hf.bind($.default.createElement),Gf=fr("/static/compare.html");function Se(e){return String(e||"unknown").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function op(e){let t=String(e||"everyday");return t==="occasion"?"Occasion":t==="current_event"?"Current Event":"Everyday"}function Ql(e){let t=String(e?.current_stage||"").trim();return t||String(e?.status||"unknown")}function Gv(e){let t=String(e||"").toLowerCase();return t==="completed"||t==="approved"||t==="final_card_ready"?"success":t==="content_candidates_ready"||t==="text_selected"||t==="image_candidates_ready"||t==="image_selected"?"warning":t.includes("reject")||t.includes("timeout")||t.includes("failed")?"danger":t.includes("pending")||t.includes("progress")||t.includes("queued")?"warning":"neutral"}function Te({value:e}){return y`<span className=${`badge ${Gv(e)}`}>${Se(e)}</span>`}function Xv({name:e}){let t={viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true"};return e==="home"?y`
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
    `}function Ie(e){if(!e)return"-";let t=new Date(e);return Number.isNaN(t.getTime())?"-":t.toLocaleString()}function qv(e){let t=Number(e||0);if(t<=0)return"0 B";let n=["B","KB","MB","GB","TB"],r=Math.min(Math.floor(Math.log(t)/Math.log(1024)),n.length-1);return`${(t/1024**r).toFixed(r===0?0:1)} ${n[r]}`}function Xf(e){if(!e||typeof e!="object")return"";let t=["decision","status","winner_model","endpoint","image_preview_url","final_preview_url","notes"],n=[];return t.forEach(a=>{let l=e[a];l!=null&&String(l).trim()!==""&&n.push(`${a}: ${String(l)}`)}),n.length>0?n.slice(0,3).join(" | "):Object.entries(e).slice(0,2).map(([a,l])=>`${a}: ${String(l)}`).join(" | ")}async function M(e,t={}){let n=new Headers(t.headers||{});t.body&&!n.has("Content-Type")&&n.set("Content-Type","application/json");let r=await fetch(Qf(e),{...t,headers:n}),a=await r.text(),l=null;if(a)try{l=JSON.parse(a)}catch{l=a}if(!r.ok){let o=l&&typeof l=="object"&&l.detail?l.detail:r.statusText;throw new Error(o||`Request failed (${r.status})`)}return l}function Tn(e,t){let n=String(t?.message||"").trim();return n||`Unable to load ${e}`}function Dn(e){let t=String(e?.message||"").trim().toLowerCase();return t==="not found"||t.includes("404")}function Zv(e){return{theme_name:String(e.theme_name||"Internal Theme").trim(),tone_funny_pct:Number(e.tone_funny_pct||20),tone_emotion_pct:Number(e.tone_emotion_pct||80),tone_style:String(e.tone_style||"conversational"),audience:String(e.audience||"internal reviewer").trim(),cultural_context:String(e.cultural_context||"global").trim(),output_spec:ty(e.copy_style,e.target_words),avoid_cliches:!0,cards_per_theme:Number(e.cards_per_theme||10),notes:String(e.notes||"").trim()||null,rendering:{theme_style:"minimal",text_alignment:"center",export_size:"1080x1350"}}}function ma(e){let t=String(e||"").trim().toLowerCase();return t==="witty"||t==="playful"||t==="heartfelt"||t==="minimal"?t:t==="short_crisp"?"minimal":t==="warm_note"?"heartfelt":t.includes("play")?"playful":t.includes("witty")||t.includes("humor")||t.includes("fun")?"witty":t.includes("heart")||t.includes("warm")||t.includes("romantic")||t.includes("reflect")||t.includes("uplift")?"heartfelt":"minimal"}function ey(e){return!e||typeof e!="object"?null:{theme_name:String(e.theme_name||"Internal Theme").trim(),audience:String(e.audience||"internal reviewer").trim(),cultural_context:String(e.cultural_context||"global").trim(),tone_style:String(e.tone_style||"conversational").trim(),tone_funny_pct:Number(e.tone_funny_pct??20),tone_emotion_pct:Number(e.tone_emotion_pct??80),copy_style:ma(e.tone_style),target_words:14}}function ty(e,t){return{format:ma(e),length:{target_words:Number(t||16)},structure:{no_lists:!0,no_numbering:!0}}}function da(e=null){return{theme_key:"",cards_per_theme:10,notes:"",copy_style:ma(e?.tone_style||e?.default_tone_style),target_words:14,tone_funny_pct:Number(e?.tone_funny_pct??e?.default_funny_pct??20)}}function ip(e){return{cards_per_theme:Number(e.cards_per_theme||10),notes:String(e.notes||"").trim()||null,copy_style:ma(e.copy_style),target_words:Number(e.target_words||14),tone_funny_pct:Number(e.tone_funny_pct??20)}}var ny=[{value:"witty",label:"witty"},{value:"playful",label:"playful"},{value:"heartfelt",label:"heartfelt"},{value:"minimal",label:"minimal"}];function sp(e){let t=ma(e);return t==="heartfelt"?"Heartfelt":t==="playful"?"Playful":t==="witty"?"Witty":"Minimal"}function Ps(){return ny.map(e=>y`<option key=${e.value} value=${e.value}>${e.label}</option>`)}function ry(e){return e&&typeof e.output_spec=="object"&&e.output_spec!==null?e.output_spec:{}}function Xl(e){let t=ry(e);return t&&typeof t.studio=="object"&&t.studio!==null?t.studio:{}}function ay(e){return!!Xl(e).is_favorite}async function ly(e){let t=await M(`/api/jobs/${e}/image-assets`);return t&&typeof t=="object"?t:{candidates:[]}}function Ts(e,t){let n=String(e||"").trim();if(!n)throw new Error("Created job response did not include a job_id");return t(`/studio/${n}`),n}function qf(e){return String(e||"").split(",").map(t=>t.trim()).filter(Boolean)}function Zf(e){if(!e)return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toISOString().slice(0,10)}function ep(e){if(!e)return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=t.getTimezoneOffset()*60*1e3;return new Date(t.getTime()-n).toISOString().slice(0,16)}function Yl(e,t=140){let n=String(e||"").trim();return n?n.length<=t?n:`${n.slice(0,t-1).trimEnd()}...`:""}function up(e){return fr(e)}function oy(e){let t=up(e);if(!t)return!1;if(t.startsWith("data:image/"))return!0;try{let n=new URL(t,window.location.origin);return/\.(png|jpe?g|webp|gif|svg)$/i.test(n.pathname)}catch{return!1}}function Gl(e,t=[]){if(!e||typeof e!="object")return[];let n=[],r=new Set,a=(l,o,i)=>{let s=up(o);!s||r.has(s)||!oy(s)||(r.add(s),n.push({label:l,url:s,source:i}))};if(a("Final Preview",e.final_preview_url,"final_preview_url"),a("Final PNG",e.final_asset_urls&&typeof e.final_asset_urls=="object"?e.final_asset_urls.png:"","final_asset_urls.png"),a("Image Preview",e.image_preview_url,"image_preview_url"),a("Content Preview",e.content_preview_url,"content_preview_url"),Array.isArray(t)){let l={final_preview:"Final Preview",final_png:"Final PNG",image_preview:"Image Preview",content_preview:"Content Preview"};t.forEach(o=>{let i=String(o?.asset_type||"").toLowerCase(),s=l[i];s&&a(s,o.public_url||o.asset_url,`asset:${i}`)})}return n}function pa(e){let t=(0,$.useMemo)(()=>e.map(i=>`${i.source}:${i.url}`).join("|"),[e]),[n,r]=(0,$.useState)(0);(0,$.useEffect)(()=>{r(0)},[t]);let a=n<e.length?e[n]:null,l=e.length>0&&n>=e.length;function o(){r(i=>i+1)}return{currentCandidate:a,exhausted:l,handleError:o}}function iy({image:e}){let t=(0,$.useMemo)(()=>!e||!e.url?[]:[{label:e.label||"Preview",url:e.url,source:e.label||"preview"}],[e]),{currentCandidate:n,exhausted:r,handleError:a}=pa(t);return y`
      <article className="image-card">
        ${n?y`
              <a href=${n.url} target="_blank" rel="noreferrer">
                <img src=${n.url} alt=${e.label} loading="lazy" onError=${a} />
              </a>
            `:y`<p className="empty-state">${r?"Preview unavailable.":"No preview available yet."}</p>`}
        <p className="image-caption">${e.label}</p>
      </article>
    `}function tp({job:e,actionState:t,onArchive:n,onDelete:r}){let a=(0,$.useMemo)(()=>Gl(e),[e]),{currentCandidate:l,exhausted:o,handleError:i}=pa(a),s=Yl(e.content_preview||"Content preview will appear here after generation.",180);return y`
      <article className="ecard-tile">
        <div className="ecard-media">
          ${l?y`
                <img
                  src=${l.url}
                  alt=${e.theme_name||"Generated eCard"}
                  loading="lazy"
                  onError=${i}
                />
              `:o?y`
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
              <p className="ecard-meta">${Ie(e.created_at)}</p>
            </div>
            <${Te} value=${e.status} />
          </div>
          <div className="ecard-stage-row">
            <span className="ecard-stage">${Se(e.current_stage)}</span>
            <span className="ecard-job-id">${e.job_id}</span>
          </div>
          <div className="ecard-actions">
            <${Ge} to=${`/jobs/${e.job_id}`} className="button-link">View Details<//>
            ${l?y`
                  <a href=${l.url} target="_blank" rel="noreferrer" className="button-link">
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
    `}function cp(e){return(Array.isArray(e?.candidates)?e.candidates:[]).map((n,r)=>({key:n.candidate_id||n.public_url||`image_candidate_${r}`,candidate_id:String(n.candidate_id||""),provider:String(n.provider||"unknown"),model:String(n.model||"").trim(),candidate_index:Number(n.candidate_index||r+1),url:fr(n.public_url||""),relative_path:n.relative_path||"",width:n.width??null,height:n.height??null,is_selected:!!n.is_selected,created_at:n.created_at||null})).filter(n=>n.url)}function sy(e,t=[]){if(!(!!e?.final_preview_url||!!(e?.final_asset_urls&&typeof e.final_asset_urls=="object"&&e.final_asset_urls.png)))return[];let r=Array.isArray(t)?t.filter(a=>{let l=String(a?.asset_type||"").toLowerCase();return l==="final_preview"||l==="final_png"}):[];return Gl(e,r).map((a,l)=>({key:`${a.source}:${l}`,label:a.label,url:a.url,source:a.source}))}function uy(e,t){let n=Xl(e),r=Number(n.selected_text_candidate_id||0);if(r>0){let a=t.find(l=>Number(l.id)===r);if(a)return a}return t.find(a=>a.is_selected)||null}function cy(e){let t=cp(e),n=String(e?.selected_image_candidate_id||"");if(n){let r=t.find(a=>a.candidate_id===n);if(r)return r}return t.find(r=>r.is_selected)||null}function np(e,t){return!e||!t?null:`${e} x ${t}`}function dy(e){let t=String(Ql(e)||"").toLowerCase();return t==="failed"?"failed":t==="final_card_ready"?"final_card_ready":String(e?.status||"").toLowerCase()==="archived"?"archived":t||"in_progress"}function fy(){let e=Ut(),[t,n]=(0,$.useState)([]),[r,a]=(0,$.useState)(null),[l,o]=(0,$.useState)([]),[i,s]=(0,$.useState)(null),[u,m]=(0,$.useState)(!1),[v,h]=(0,$.useState)(!1),[S,k]=(0,$.useState)(!1),[w,_]=(0,$.useState)(""),[d,c]=(0,$.useState)(""),[f,g]=(0,$.useState)(""),[C,x]=(0,$.useState)(""),[L,D]=(0,$.useState)(""),[O,I]=(0,$.useState)(!1),[J,ee]=(0,$.useState)(!1),[A,de]=(0,$.useState)("today"),[V,ve]=(0,$.useState)([]),[Y,b]=(0,$.useState)(!1),[B,pe]=(0,$.useState)(!1),[G,De]=(0,$.useState)(""),[P,j]=(0,$.useState)({theme_name:"Internal Launch Sprint",audience:"operations team",cultural_context:"global",tone_style:"conversational",tone_funny_pct:20,tone_emotion_pct:80,copy_style:"minimal",target_words:14,cards_per_theme:10,notes:""}),[W,q]=(0,$.useState)(da()),re=i&&typeof i=="object"&&i.theme||null,at=(0,$.useMemo)(()=>{let E=0,U=0,Z=0;return t.forEach(ot=>{let Fe=String(ot.status||"").toLowerCase();if(Fe==="completed"){U+=1;return}if(Fe.includes("reject")||Fe.includes("timeout")||Fe.includes("failed")){Z+=1;return}Fe!=="archived"&&(E+=1)}),{active:E,completed:U,failed:Z}},[t]),dn=(0,$.useMemo)(()=>t.filter(E=>E.final_preview_url||E.final_asset_urls&&E.final_asset_urls.png||E.image_preview_url).slice(0,6),[t]),It=(0,$.useMemo)(()=>t.filter(E=>{let U=String(E.status||"").toLowerCase();return U!=="completed"&&!U.includes("failed")&&!U.includes("reject")&&!U.includes("timeout")&&U!=="archived"}).slice(0,8),[t]),jt=(0,$.useMemo)(()=>t.filter(E=>{let U=String(E.status||"").toLowerCase();return U.includes("failed")||U.includes("reject")||U.includes("timeout")}).slice(0,8),[t]),fn=(0,$.useMemo)(()=>t.filter(E=>ay(E)).slice(0,6),[t]);async function p(){m(!0),h(!0),k(!0),_(""),c(""),g(""),x("");let[E,U,Z,ot]=await Promise.allSettled([M("/api/jobs?limit=50"),M("/api/storage/summary"),M("/api/themes/schedule"),M("/api/themes/today")]),Fe="";if(E.status==="fulfilled"?n(Array.isArray(E.value)?E.value:[]):(n([]),_(Tn("jobs",E.reason))),U.status==="fulfilled"?a(U.value||null):(a(null),c(Tn("storage summary",U.reason))),Z.status==="fulfilled"){let Os=Array.isArray(Z.value)?[]:Array.isArray(Z.value?.week_schedule)?Z.value.week_schedule:[];o(Os),Os.length===0&&(Fe="Theme schedule not configured yet")}else o([]),Dn(Z.reason)?Fe="Theme Factory not configured yet":g(Tn("Theme Factory schedule",Z.reason));ot.status==="fulfilled"?(s(ot.value||null),!Fe&&ot.value?.resolved===!1?Fe=ot.value?.message||"Theme schedule not configured yet":!Fe&&!ot.value?.theme&&(Fe="Theme schedule not configured yet")):(s(null),Dn(ot.reason)?Fe=Fe||"Theme schedule not configured yet":g(Tn("today's theme",ot.reason))),x(Fe),m(!1),h(!1),k(!1);let mp=Z.status!=="fulfilled"&&!Dn(Z.reason),hp=ot.status!=="fulfilled"&&!Dn(ot.reason),vp=E.status!=="fulfilled"||U.status!=="fulfilled"||mp||hp;D(vp?`Refresh completed with errors at ${new Date().toLocaleTimeString()}`:`Refreshed ${new Date().toLocaleTimeString()}`)}(0,$.useEffect)(()=>{p()},[]);async function N(E){E.preventDefault(),b(!0),_("");try{let U=Zv(P),Z=await M("/api/jobs/start",{method:"POST",body:JSON.stringify(U)});I(!1),Ts(Z.job_id,e)}catch(U){_(U.message||"Unable to create new job")}finally{b(!1)}}function K(E,U){j(Z=>({...Z,[E]:U}))}function me(){let E=ey(re);E&&j(U=>({...U,...E}))}async function lt(){if(V.length>0)return V;let E=await M("/api/themes"),U=Array.isArray(E)?E:[];return ve(U),U}async function ha(E){if(de(E),g(""),q(da(re)),E==="manual"){try{let Z=(await lt())[0]||null;q({...da(Z),theme_key:Z?.theme_key||""}),ee(!0)}catch(U){g(U.message||"Unable to load theme catalog")}return}ee(!0)}async function fp(E){E.preventDefault(),pe(!0),g("");try{let U=ip(W),Z=A==="manual"?await M("/api/jobs/start-from-theme",{method:"POST",body:JSON.stringify({theme_key:W.theme_key,...U})}):await M("/api/jobs/create-daily-theme-job",{method:"POST",body:JSON.stringify(U)});ee(!1),Ts(Z.job_id,e)}catch(U){g(U.message||(A==="manual"?"Unable to create theme job":"Unable to create today's themed job"))}finally{pe(!1)}}function pp(E){let U=V.find(Z=>Z.theme_key===E);q(Z=>({...Z,theme_key:E,tone_funny_pct:Number(U?.default_funny_pct??Z.tone_funny_pct??20)}))}async function Fs(E){De(`archive:${E.job_id}`),_("");try{await M(`/api/jobs/${E.job_id}/archive`,{method:"POST"}),D(`Archived ${E.job_id}`),await p()}catch(U){_(U.message||"Unable to archive job")}finally{De("")}}async function Ls(E){if(window.confirm(`Delete ${E.job_id} and associated files?`)){De(`delete:${E.job_id}`),_("");try{await M(`/api/jobs/${E.job_id}`,{method:"DELETE"}),D(`Deleted ${E.job_id}`),await p()}catch(Z){_(Z.message||"Unable to delete job")}finally{De("")}}}return y`
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
              onClick=${()=>ha("today")}
              disabled=${B||S||!re}
            >
              Generate Today's Cards
            </button>
            <button type="button" className="button" onClick=${()=>ha("manual")}>Generate From Theme</button>
            <button type="button" className="button" onClick=${()=>I(!0)}>Create New Card Job</button>
            <button
              type="button"
              className="button"
              onClick=${p}
              disabled=${u||v||S}
            >
              Refresh
            </button>
          </div>
        </header>

        ${L?y`<p className="status-line">${L}</p>`:null}

        ${u||v||S||w||d||f?y`
              <div className="status-stack">
                ${u?y`<div className="status-panel warning">Loading jobs from /api/jobs...</div>`:null}
                ${v?y`<div className="status-panel warning">Loading storage summary from /api/storage/summary...</div>`:null}
                ${S?y`<div className="status-panel warning">Loading Theme Factory data from /api/themes/schedule...</div>`:null}
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
            <p className="summary-value">${u?"...":jt.length}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Favorite Cards</p>
            <p className="summary-value">${u?"...":fn.length}</p>
          </article>
        </section>

        <section className="section-panel home-hero">
          <div className="section-head">
            <div>
              <h2 className="section-title">Today's Theme</h2>
              <p className="section-copy">
                ${re?`${re.theme_name} | ${sp("minimal")} card flow with ${Se(i?.weekday)} scheduling`:C||"Theme schedule not configured yet."}
              </p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button primary"
                onClick=${()=>ha("today")}
                disabled=${B||S||!re}
              >
                ${B&&A==="today"?"Generating...":"Generate Today's Cards"}
              </button>
              <button type="button" className="button" onClick=${()=>ha("manual")}>Generate From Theme</button>
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
                    <p className="key-value">${op(re.theme_bucket)}</p>
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
                    <p className="key-value">${v?"...":r?qv(r.total_bytes):"Unavailable"}</p>
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
            <${Ge} to="/studio" className="button-link">Open Studio<//>
          </div>
          ${u?y`<p className="empty-state">Loading recent eCards...</p>`:dn.length===0?y`<p className="empty-state">No rendered cards yet. Generate today's cards or run a theme manually.</p>`:y`
                  <div className="ecard-grid">
                    ${dn.map(E=>y`
                        <${tp}
                          key=${E.job_id}
                          job=${E}
                          actionState=${G}
                          onArchive=${Fs}
                          onDelete=${Ls}
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
          ${fn.length===0?y`<p className="empty-state">No favorite cards yet. Mark a final card from Studio.</p>`:y`
                <div className="ecard-grid">
                  ${fn.map(E=>y`
                      <${tp}
                        key=${E.job_id}
                        job=${E}
                        actionState=${G}
                        onArchive=${Fs}
                        onDelete=${Ls}
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
              <${Ge} to="/jobs" className="button-link">All Jobs<//>
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
                        ${It.map(E=>y`
                            <tr key=${E.job_id}>
                              <td><${Ge} className="job-link" to=${`/studio/${E.job_id}`}>${E.job_id}<//></td>
                              <td>${E.theme_name}</td>
                              <td><${Te} value=${E.status} /></td>
                              <td>${Ie(E.updated_at)}</td>
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
            ${jt.length===0?y`<p className="empty-state">No failed jobs.</p>`:y`
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
                        ${jt.map(E=>y`
                            <tr key=${E.job_id}>
                              <td><${Ge} className="job-link" to=${`/studio/${E.job_id}`}>${E.job_id}<//></td>
                              <td>${E.theme_name}</td>
                              <td><${Te} value=${E.status} /></td>
                              <td>${Yl(E.last_error_message||"-",80)}</td>
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
                <section className="modal" onClick=${E=>E.stopPropagation()}>
                  <h2 className="section-title">Create New Card Job</h2>
                  <p className="section-copy">Starts a new card run with short, crisp copy defaults and opens Studio.</p>
                  <form onSubmit=${N}>
                    <div className="form-grid">
                      <div className="form-field full">
                        <label htmlFor="themeName">Theme Name</label>
                        <input
                          id="themeName"
                          value=${P.theme_name}
                          onInput=${E=>K("theme_name",E.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="audience">Audience</label>
                        <input
                          id="audience"
                          value=${P.audience}
                          onInput=${E=>K("audience",E.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="culturalContext">Cultural Context</label>
                        <input
                          id="culturalContext"
                          value=${P.cultural_context}
                          onInput=${E=>K("cultural_context",E.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="toneStyle">Tone Style</label>
                        <select
                          id="toneStyle"
                          value=${P.tone_style}
                          onChange=${E=>K("tone_style",E.target.value)}
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
                          value=${P.tone_funny_pct}
                          onInput=${E=>K("tone_funny_pct",E.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="emotionPct">Emotion %</label>
                        <input
                          id="emotionPct"
                          type="number"
                          min="0"
                          max="100"
                          value=${P.tone_emotion_pct}
                          onInput=${E=>K("tone_emotion_pct",E.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="copyStyle">Copy Style</label>
                        <select
                          id="copyStyle"
                          value=${P.copy_style}
                          onChange=${E=>K("copy_style",E.target.value)}
                        >
                          ${Ps()}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="targetWords">Target Words</label>
                        <input
                          id="targetWords"
                          type="number"
                          min="4"
                          max="60"
                          value=${P.target_words}
                          onInput=${E=>K("target_words",E.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="cardsPerTheme">Cards Per Theme</label>
                        <input
                          id="cardsPerTheme"
                          type="number"
                          min="1"
                          max="50"
                          value=${P.cards_per_theme}
                          onInput=${E=>K("cards_per_theme",E.target.value)}
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
                          value=${P.notes}
                          onInput=${E=>K("notes",E.target.value)}
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
                      <button type="submit" className="button primary" disabled=${Y}>
                        ${Y?"Creating...":"Create Job"}
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
                <section className="modal" onClick=${E=>E.stopPropagation()}>
                  <h2 className="section-title">${A==="manual"?"Generate From Theme":"Use Today's Theme"}</h2>
                  <p className="section-copy">
                    ${A==="manual"?"Start a workflow job from any selected Theme Factory record.":re?`Resolved theme: ${re.theme_name}`:"Use today's resolved theme."}
                  </p>
                  <form onSubmit=${fp}>
                    <div className="form-grid">
                      ${A==="manual"?y`
                            <div className="form-field full">
                              <label htmlFor="runThemeKey">Theme</label>
                              <select
                                id="runThemeKey"
                                value=${W.theme_key}
                                onChange=${E=>pp(E.target.value)}
                                required
                              >
                                ${V.map(E=>y`<option key=${E.id} value=${E.theme_key}>${E.theme_name}</option>`)}
                              </select>
                            </div>
                          `:null}
                      <div className="form-field">
                        <label htmlFor="runCopyStyle">Copy Style</label>
                        <select
                          id="runCopyStyle"
                          value=${W.copy_style}
                          onChange=${E=>q(U=>({...U,copy_style:E.target.value}))}
                        >
                          ${Ps()}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="runTargetWords">Target Words</label>
                        <input
                          id="runTargetWords"
                          type="number"
                          min="4"
                          max="60"
                          value=${W.target_words}
                          onInput=${E=>q(U=>({...U,target_words:E.target.value}))}
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
                          value=${W.tone_funny_pct}
                          onInput=${E=>q(U=>({...U,tone_funny_pct:E.target.value}))}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="runCardsPerTheme">Cards Per Theme</label>
                        <input
                          id="runCardsPerTheme"
                          type="number"
                          min="1"
                          max="50"
                          value=${W.cards_per_theme}
                          onInput=${E=>q(U=>({...U,cards_per_theme:E.target.value}))}
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
                          value=${W.notes}
                          onInput=${E=>q(U=>({...U,notes:E.target.value}))}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${B}>
                        ${B?"Creating...":A==="manual"?"Generate From Theme":"Use Today's Theme"}
                      </button>
                      <button type="button" className="button" onClick=${()=>ee(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}
      </section>
    `}function py(){let e=Ut(),{jobId:t}=Hl(),[n,r]=(0,$.useState)(null),[a,l]=(0,$.useState)([]),[o,i]=(0,$.useState)([]),[s,u]=(0,$.useState)([]),[m,v]=(0,$.useState)([]),[h,S]=(0,$.useState)([]),[k,w]=(0,$.useState)(!1),[_,d]=(0,$.useState)(""),[c,f]=(0,$.useState)(""),[g,C]=(0,$.useState)(""),x=(0,$.useCallback)(async(b={})=>{if(!t)return;let B=!!b.quiet;B||w(!0),f("");try{let[pe,G,De,P,j]=await Promise.all([M(`/api/jobs/${t}`),M(`/api/jobs/${t}/assets`),M(`/api/jobs/${t}/events`),M(`/api/jobs/${t}/candidates`),M(`/api/jobs/${t}/shortlist`)]);r(pe||null),l(Array.isArray(G)?G:[]),i(Array.isArray(De)?De:[]);let W=Array.isArray(P)?P:[],q=Array.isArray(j)?j:[];u(W),v(q);let re=q.filter(at=>at.is_selected).map(at=>Number(at.candidate_id)).filter(at=>Number.isInteger(at));S(re.length>0?re:q[0]?[Number(q[0].candidate_id)]:[])}catch(pe){f(pe.message||"Unable to load job detail")}finally{B||w(!1)}},[t]);(0,$.useEffect)(()=>{x()},[x]),(0,$.useEffect)(()=>{if(!t)return;let b=window.setInterval(()=>{document.visibilityState==="visible"&&x({quiet:!0})},1e4);return()=>window.clearInterval(b)},[t,x]);let L=(0,$.useMemo)(()=>{if(!n)return[];let b=Xl(n),B=Array.isArray(n.shortlist)?n.shortlist.length>0:!!n.shortlist_count,pe=!!b.selected_text_candidate_id,G=Array.isArray(n.image_candidates)?n.image_candidates.length>0:!!n.image_candidate_count,De=!!(n.selected_image_candidate_id||n.selected_image_public_url),P=!!(n.final_preview_url||n.final_asset_urls&&n.final_asset_urls.png);return[{label:"current_stage",value:Ql(n)},{label:"text_candidates",value:B?"content_candidates_ready":"pending"},{label:"text_selection",value:pe?"text_selected":"pending"},{label:"image_candidates",value:G?"image_candidates_ready":"pending"},{label:"image_selection",value:De?"image_selected":"pending"},{label:"final_card",value:P?"final_card_ready":"pending"}]},[n]),D=(0,$.useMemo)(()=>n?Gl(n,a):[],[n,a]),O=pa(D),I=(0,$.useMemo)(()=>n?Gl({image_preview_url:n.image_preview_url,content_preview_url:n.content_preview_url},a.filter(b=>String(b?.asset_type||"").toLowerCase()==="image_preview")):[],[n,a]),J=pa(I),ee=(0,$.useMemo)(()=>a.filter(b=>String(b?.asset_type||"").toLowerCase()==="shortlist_preview").map((b,B)=>({label:`Shortlist Preview ${B+1}`,url:fr(b.public_url||b.asset_url),source:`shortlist_preview:${B}`})).filter(b=>b.url),[a]);async function A(b,B,pe){if(t){d(b),f("");try{let G=await M(B,{method:"POST"});C(pe||`${G.job_id} updated`),await x()}catch(G){f(G.message||"Unable to update stage")}finally{d("")}}}function de(b,B){S(pe=>{let G=new Set(pe);return B?G.add(b):G.delete(b),Array.from(G)})}async function V(){if(t){d("render-shortlist"),f("");try{let b=await M(`/api/jobs/${t}/render-shortlist`,{method:"POST",body:JSON.stringify({candidate_ids:h})});C(`Rendered ${b.rendered_count} shortlist preview card(s)`),await x()}catch(b){f(b.message||"Unable to render shortlist")}finally{d("")}}}async function ve(){if(t){d("archive"),f("");try{let b=await M(`/api/jobs/${t}/archive`,{method:"POST"});C(`Job archived (${Ie(b.updated_at)})`),await x()}catch(b){f(b.message||"Unable to archive job")}finally{d("")}}}async function Y(){if(!(!t||!window.confirm(`Delete ${t} and associated files?`))){d("delete"),f("");try{await M(`/api/jobs/${t}`,{method:"DELETE"}),e("/")}catch(B){f(B.message||"Unable to delete job")}finally{d("")}}}return y`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Jobs</p>
            <h1 className="page-title">Job Detail</h1>
            <p className="page-description">${t||"-"}</p>
          </div>
          <div className="inline-actions">
            <button className="button" type="button" onClick=${x} disabled=${k}>Refresh</button>
            <button
              className="button"
              type="button"
              onClick=${ve}
              disabled=${_==="archive"}
            >
              ${_==="archive"?"Archiving...":"Archive Job"}
            </button>
            <button
              className="button danger"
              type="button"
              onClick=${Y}
              disabled=${_==="delete"}
            >
              ${_==="delete"?"Deleting...":"Delete Job + Files"}
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
                    <${Ge} to=${`/studio/${t}`} className="button-link">Open Studio<//>
                    <button
                      type="button"
                      className="button"
                      onClick=${()=>A("rerun-content",`/api/jobs/${t}/rerun/content`,`Text rerun for ${t}`)}
                      disabled=${_==="rerun-content"}
                    >
                      ${_==="rerun-content"?"Working...":"Regenerate Text"}
                    </button>
                    <button
                      type="button"
                      className="button"
                      onClick=${()=>A("rerun-image",`/api/jobs/${t}/rerun/image`,`Image rerun for ${t}`)}
                      disabled=${_==="rerun-image"}
                    >
                      ${_==="rerun-image"?"Working...":"Regenerate Image"}
                    </button>
                    <button
                      type="button"
                      className="button primary"
                      onClick=${()=>A("rerun-card",`/api/jobs/${t}/rerun/final-render`,`Card rerun for ${t}`)}
                      disabled=${_==="rerun-card"}
                    >
                      ${_==="rerun-card"?"Working...":"Regenerate Card"}
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
                  <${Te} value=${n.status} />
                </div>
                <div className="key-value-grid">
                  ${L.map(b=>y`
                      <article className="key-card" key=${b.label}>
                        <p className="key-label">${b.label}</p>
                        <p className="key-value"><${Te} value=${b.value} /></p>
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
                    <p className="key-value">${Ie(n.last_stage_started_at)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">last_stage_finished_at</p>
                    <p className="key-value">${Ie(n.last_stage_finished_at)}</p>
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
                  <${Te} value=${n.content_approval_status||"pending"} />
                </div>
                ${n.content_preview?y`<div className="content-preview-block">${n.content_preview}</div>`:y`<p className="empty-state">No content preview stored yet.</p>`}
                <div className="inline-actions padded-actions">
                  <button
                    type="button"
                    className="button primary"
                    onClick=${()=>A("regenerate-content",`/api/jobs/${t}/regenerate-content`,`Content regenerated for ${t}`)}
                    disabled=${_==="regenerate-content"}
                  >
                    ${_==="regenerate-content"?"Working...":"Regenerate Text"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>A("approve-content",`/api/jobs/${t}/approve-content`,`Content approved for ${t}`)}
                    disabled=${_==="approve-content"||!n.content_preview}
                  >
                    ${_==="approve-content"?"Working...":"Approve Content"}
                  </button>
                  <button
                    type="button"
                    className="button danger"
                    onClick=${()=>A("reject-content",`/api/jobs/${t}/reject-content`,`Content rejected for ${t}`)}
                    disabled=${_==="reject-content"||!n.content_preview}
                  >
                    ${_==="reject-content"?"Working...":"Reject Content"}
                  </button>
                </div>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Image Review</h2>
                    <p className="section-copy">The main control here is to generate or rerun the image. Approval buttons remain available as operator overrides.</p>
                  </div>
                  <${Te} value=${n.image_approval_status||"pending"} />
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
                    onClick=${()=>A("generate-image",`/api/jobs/${t}/generate-image`,`Image generated for ${t}`)}
                    disabled=${_==="generate-image"||n.content_approval_status!=="approved"}
                  >
                    ${_==="generate-image"?"Working...":"Generate Image"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>A("regenerate-image",`/api/jobs/${t}/regenerate-image`,`Image regenerated for ${t}`)}
                    disabled=${_==="regenerate-image"||n.content_approval_status!=="approved"}
                  >
                    ${_==="regenerate-image"?"Working...":"Regenerate Image"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>A("approve-image",`/api/jobs/${t}/approve-image`,`Image approved for ${t}`)}
                    disabled=${_==="approve-image"||!n.image_preview_url}
                  >
                    ${_==="approve-image"?"Working...":"Approve Image"}
                  </button>
                  <button
                    type="button"
                    className="button danger"
                    onClick=${()=>A("reject-image",`/api/jobs/${t}/reject-image`,`Image rejected for ${t}`)}
                    disabled=${_==="reject-image"||!n.image_preview_url}
                  >
                    ${_==="reject-image"?"Working...":"Reject Image"}
                  </button>
                </div>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Final Card Review</h2>
                    <p className="section-copy">Use rerun when the card layout or polish is off. Approval stays available below as a secondary control.</p>
                  </div>
                  <${Te} value=${n.final_approval_status||"pending"} />
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
                    onClick=${()=>A("render-final",`/api/jobs/${t}/render-final`,`Final rendered for ${t}`)}
                    disabled=${_==="render-final"||n.image_approval_status!=="approved"}
                  >
                    ${_==="render-final"?"Working...":"Regenerate Card"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>A("approve-final",`/api/jobs/${t}/approve-final`,`Final approved for ${t}`)}
                    disabled=${_==="approve-final"||!n.final_preview_url}
                  >
                    ${_==="approve-final"?"Working...":"Approve Final"}
                  </button>
                  <button
                    type="button"
                    className="button danger"
                    onClick=${()=>A("reject-final",`/api/jobs/${t}/reject-final`,`Final rejected for ${t}`)}
                    disabled=${_==="reject-final"||!n.final_preview_url}
                  >
                    ${_==="reject-final"?"Working...":"Reject Final"}
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
                  ${o.length===0?y`<p className="empty-state">No lifecycle events found.</p>`:y`
                        <ul className="list-simple">
                          ${o.slice().reverse().map((b,B)=>y`
                                <li key=${`${b.event_type}_${B}`} className="list-item">
                                  <p className="event-type">${b.event_type}</p>
                                  <p className="event-meta">${Ie(b.created_at)}</p>
                                  ${Xf(b.event_payload_json)?y`<p className="event-meta">${Xf(b.event_payload_json)}</p>`:null}
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
                              ${a.map((b,B)=>y`
                                  <tr key=${`${b.asset_type}_${B}`}>
                                    <td>${b.asset_type}</td>
                                    <td>
                                      ${b.asset_url?y`<a className="job-link" href=${fr(b.asset_url||b.public_url)} target="_blank" rel="noreferrer">open</a>`:"-"}
                                    </td>
                                    <td><code>${b.relative_path||"-"}</code></td>
                                    <td><code>${b.absolute_path||"-"}</code></td>
                                    <td><${Te} value=${b.approved?"approved":"pending"} /></td>
                                    <td>${Ie(b.created_at)}</td>
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
                                    <td><${Te} value=${b.is_shortlisted?"shortlisted":"pooled"} /></td>
                                    <td><${Te} value=${b.is_selected?"selected":"not_selected"} /></td>
                                    <td>${Yl(b.text||b.content_text,200)}</td>
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
                    <button type="button" className="button primary" onClick=${V} disabled=${_==="render-shortlist"||m.length===0}>
                      ${_==="render-shortlist"?"Rendering...":"Render Shortlist"}
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
                                        onChange=${B=>de(Number(b.candidate_id),B.target.checked)}
                                      />
                                    </td>
                                    <td>${b.rank}</td>
                                    <td>${b.model}</td>
                                    <td>${Number(b.score||0).toFixed(3)}</td>
                                    <td>${Yl(b.text,220)}</td>
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
                  ${D.length===0&&ee.length===0?y`<p className="empty-state">No preview variants available yet.</p>`:y`
                        <div className="image-grid">
                          ${[...D,...ee].map(b=>y`
                              <${iy} key=${b.url} image=${b} />
                            `)}
                        </div>
                      `}
                </section>
              </details>
            `:y`<p className="empty-state">${k?"Loading job details...":"Job not found."}</p>`}
      </section>
    `}function my(){let e=Ut(),[t,n]=(0,$.useState)([]),[r,a]=(0,$.useState)({week_schedule:[],month_schedule:[],active_overrides:[]}),[l,o]=(0,$.useState)(null),[i,s]=(0,$.useState)(!1),[u,m]=(0,$.useState)(""),[v,h]=(0,$.useState)(""),[S,k]=(0,$.useState)(""),[w,_]=(0,$.useState)(""),[d,c]=(0,$.useState)(!1),[f,g]=(0,$.useState)(!1),[C,x]=(0,$.useState)(!1),[L,D]=(0,$.useState)(!1),[O,I]=(0,$.useState)(null),[J,ee]=(0,$.useState)(null),[A,de]=(0,$.useState)({theme_key:"",theme_name:"",description:"",theme_bucket:"everyday",theme_type:"evergreen",cultural_context:"global",tone_style:"conversational",default_funny_pct:20,default_emotion_pct:80,default_audience:"general audience",default_visual_style:"minimal",is_active:!0,priority:0}),[V,ve]=(0,$.useState)({theme_id:"",schedule_type:"weekly_recurring",start_date:"",end_date:"",weekday_mask:"monday",month_mask:"",region:"",country:"",is_active:!0,priority:0,notes:""}),[Y,b]=(0,$.useState)({theme_id:"",override_scope:"editorial",start_at:"",end_at:"",reason:"",force_top_priority:!0,created_by:"console_admin"}),[B,pe]=(0,$.useState)(da()),G=l&&typeof l=="object"&&l.theme||null,De=(0,$.useMemo)(()=>t.reduce((p,N)=>{let K=String(N.theme_bucket||"everyday");return p[K]=(p[K]||0)+1,p},{everyday:0,occasion:0,current_event:0}),[t]),P=(0,$.useMemo)(()=>[{key:"everyday",title:"Everyday Themes",description:"Recurring weekday themes that keep the console stocked with steady daily runs.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="everyday")},{key:"occasion",title:"Occasion Themes",description:"Date-range and seasonal campaign themes such as Ramadan, Holi, and Valentine's Week.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="occasion")},{key:"current_event",title:"Current Event Themes",description:"Editorial and trend-driven themes that are intended to be activated through overrides.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="current_event")}],[t]);async function j(){s(!0),m(""),h("");let[p,N,K]=await Promise.allSettled([M("/api/themes"),M("/api/themes/today"),M("/api/themes/schedule")]);if(p.status==="fulfilled"){let me=Array.isArray(p.value)?p.value:[];n(me),me.length>0&&(ve(lt=>({...lt,theme_id:String(lt.theme_id||me[0].id)})),b(lt=>({...lt,theme_id:String(lt.theme_id||me[0].id)}))),me.length===0&&h("Theme schedule not configured yet")}else n([]),Dn(p.reason)?h("Theme schedule not configured yet"):m(Tn("theme catalog",p.reason));if(N.status==="fulfilled"?(o(N.value||null),N.value?.resolved===!1&&h(me=>me||N.value?.message||"No theme resolved yet")):(o(null),Dn(N.reason)?h(me=>me||"No theme resolved yet"):m(me=>me||Tn("today's theme",N.reason))),K.status==="fulfilled"){if(Array.isArray(K.value)){a({week_schedule:[],month_schedule:[],active_overrides:[]}),h(me=>me||"Theme schedule not configured yet"),s(!1);return}a({week_schedule:Array.isArray(K.value?.week_schedule)?K.value.week_schedule:[],month_schedule:Array.isArray(K.value?.month_schedule)?K.value.month_schedule:[],active_overrides:Array.isArray(K.value?.active_overrides)?K.value.active_overrides:[]})}else a({week_schedule:[],month_schedule:[],active_overrides:[]}),Dn(K.reason)?h(me=>me||"Theme schedule not configured yet"):m(me=>me||Tn("theme schedule",K.reason));s(!1)}(0,$.useEffect)(()=>{j()},[]);function W(p=null){I(p?p.id:null),de({theme_key:p?.theme_key||"",theme_name:p?.theme_name||"",description:p?.description||"",theme_bucket:p?.theme_bucket||"everyday",theme_type:p?.theme_type||"evergreen",cultural_context:p?.cultural_context||"global",tone_style:p?.tone_style||"conversational",default_funny_pct:p?.default_funny_pct??20,default_emotion_pct:p?.default_emotion_pct??80,default_audience:p?.default_audience||"general audience",default_visual_style:p?.default_visual_style||"minimal",is_active:p?.is_active??!0,priority:p?.priority??0}),c(!0)}function q(p=null){ee(p?p.id:null),ve({theme_id:String(p?.theme_id||t[0]?.id||""),schedule_type:p?.schedule_type||"weekly_recurring",start_date:Zf(p?.start_date),end_date:Zf(p?.end_date),weekday_mask:Array.isArray(p?.weekday_mask)?p.weekday_mask.join(", "):"monday",month_mask:Array.isArray(p?.month_mask)?p.month_mask.join(", "):"",region:p?.region||"",country:p?.country||"",is_active:p?.is_active??!0,priority:p?.priority??0,notes:p?.notes||""}),g(!0)}function re(p=null){let N=new Date,K=new Date(N.getTime()+1440*60*1e3);b({theme_id:String(p||G?.theme_id||t[0]?.id||""),override_scope:"editorial",start_at:ep(N.toISOString()),end_at:ep(K.toISOString()),reason:"",force_top_priority:!0,created_by:"console_admin"}),x(!0)}async function at(p){p.preventDefault(),_("save-theme"),m("");try{let N={theme_key:String(A.theme_key||"").trim(),theme_name:String(A.theme_name||"").trim(),description:String(A.description||"").trim()||null,theme_bucket:A.theme_bucket,theme_type:A.theme_type,cultural_context:String(A.cultural_context||"").trim()||null,tone_style:String(A.tone_style||"").trim(),default_funny_pct:Number(A.default_funny_pct||0),default_emotion_pct:Number(A.default_emotion_pct||0),default_audience:String(A.default_audience||"").trim(),default_visual_style:String(A.default_visual_style||"").trim(),is_active:!!A.is_active,priority:Number(A.priority||0)},K=O?`/api/themes/${O}`:"/api/themes";await M(K,{method:O?"PUT":"POST",body:JSON.stringify(N)}),c(!1),k(O?"Theme updated":"Theme created"),await j()}catch(N){m(N.message||"Unable to save theme")}finally{_("")}}async function dn(p){if(window.confirm(`Deactivate theme ${p.theme_name}?`)){_(`delete-theme:${p.id}`),m("");try{await M(`/api/themes/${p.id}`,{method:"DELETE"}),k(`Theme deactivated: ${p.theme_name}`),await j()}catch(K){m(K.message||"Unable to delete theme")}finally{_("")}}}async function It(p){p.preventDefault(),_("save-schedule"),m("");try{let N={theme_id:Number(V.theme_id),schedule_type:V.schedule_type,start_date:V.start_date||null,end_date:V.end_date||null,weekday_mask:qf(V.weekday_mask),month_mask:qf(V.month_mask).map(lt=>Number(lt)).filter(lt=>Number.isInteger(lt)),region:String(V.region||"").trim()||null,country:String(V.country||"").trim()||null,is_active:!!V.is_active,priority:Number(V.priority||0),notes:String(V.notes||"").trim()||null},K=J?`/api/themes/schedule/${J}`:"/api/themes/schedule";await M(K,{method:J?"PUT":"POST",body:JSON.stringify(N)}),g(!1),k(J?"Schedule updated":"Schedule created"),await j()}catch(N){m(N.message||"Unable to save schedule")}finally{_("")}}async function jt(p){p.preventDefault(),_("save-override"),m("");try{let N={theme_id:Number(Y.theme_id),override_scope:String(Y.override_scope||"").trim(),start_at:new Date(Y.start_at).toISOString(),end_at:new Date(Y.end_at).toISOString(),reason:String(Y.reason||"").trim()||null,force_top_priority:!!Y.force_top_priority,created_by:String(Y.created_by||"console_admin").trim()};await M("/api/themes/overrides",{method:"POST",body:JSON.stringify(N)}),x(!1),k("Override created"),await j()}catch(N){m(N.message||"Unable to save override")}finally{_("")}}async function fn(p){p&&p.preventDefault(),_("create-today-job"),m("");try{let N=await M("/api/jobs/create-daily-theme-job",{method:"POST",body:JSON.stringify(ip(B))});D(!1),Ts(N.job_id,e)}catch(N){m(N.message||"Unable to create today's themed job")}finally{_("")}}return y`
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
              onClick=${()=>{pe(da(G)),D(!0)}}
              disabled=${w==="create-today-job"||!G}
            >
              ${w==="create-today-job"?"Creating...":"Use Today's Theme"}
            </button>
            <button type="button" className="button" onClick=${j} disabled=${i}>Refresh</button>
            <${Ge} to="/" className="button-link">Home<//>
          </div>
        </header>

        ${u?y`<div className="status-panel error">${u}</div>`:null}
        ${v?y`<div className="status-panel neutral">${v}</div>`:null}
        ${S?y`<p className="status-line">${S}</p>`:null}
        ${i?y`<div className="status-panel warning">Loading Theme Factory data...</div>`:null}

        <section className="cards-grid">
          <article className="summary-card">
            <p className="summary-label">Everyday Themes</p>
            <p className="summary-value">${De.everyday}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Occasion Themes</p>
            <p className="summary-value">${De.occasion}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Current Event Themes</p>
            <p className="summary-value">${De.current_event}</p>
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
          ${G?y`
                <div className="key-value-grid">
                  <article className="key-card">
                    <p className="key-label">Theme</p>
                    <p className="key-value">${G.theme_name}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Bucket</p>
                    <p className="key-value">${op(G.theme_bucket)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Source</p>
                    <p className="key-value">${Se(l?.source)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Weekday</p>
                    <p className="key-value">${Se(l?.weekday)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Audience</p>
                    <p className="key-value">${G.audience}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Tone</p>
                    <p className="key-value">${G.tone_style}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Priority</p>
                    <p className="key-value">${G.priority}</p>
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
              <button type="button" className="button primary" onClick=${()=>W()}>Add Theme</button>
            </div>
          </div>
          ${t.length===0?y`<p className="empty-state">No theme catalog entries found.</p>`:y`
                ${P.map(p=>y`
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
                                  ${p.items.map(N=>y`
                                      <tr key=${N.id}>
                                        <td><code>${N.theme_key}</code></td>
                                        <td>${N.theme_name}</td>
                                        <td>${Se(N.theme_type)}</td>
                                        <td>${N.default_audience}</td>
                                        <td>${N.default_visual_style}</td>
                                        <td>${N.priority}</td>
                                        <td><${Te} value=${N.is_active?"active":"inactive"} /></td>
                                        <td>
                                          <div className="inline-actions">
                                            <button type="button" className="button" onClick=${()=>W(N)}>Edit</button>
                                            <button
                                              type="button"
                                              className="button danger"
                                              onClick=${()=>dn(N)}
                                              disabled=${w===`delete-theme:${N.id}`}
                                            >
                                              ${w===`delete-theme:${N.id}`?"Deleting...":"Delete"}
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
              <button type="button" className="button primary" onClick=${()=>q()}>Add Schedule</button>
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
                              <td>${Ie(p.plan_date)}</td>
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
                              <td>${Ie(p.start_at)} - ${Ie(p.end_at)}</td>
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
                            <td>${p.start_date?Ie(p.start_date):"-"}</td>
                            <td>${p.end_date?Ie(p.end_date):"-"}</td>
                            <td>${(p.weekday_mask||[]).join(", ")||"-"}</td>
                            <td>${p.priority}</td>
                            <td>
                              <button type="button" className="button" onClick=${()=>q(p)}>
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
              <div className="modal-backdrop" onClick=${()=>D(!1)}>
                <section className="modal" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">Use Today's Theme</h2>
                  <p className="section-copy">
                    ${G?`Resolved theme: ${G.theme_name}`:"No theme resolved yet."}
                  </p>
                  <form onSubmit=${fn}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="todayCopyStyle">Copy Style</label>
                        <select
                          id="todayCopyStyle"
                          value=${B.copy_style}
                          onChange=${p=>pe(N=>({...N,copy_style:p.target.value}))}
                        >
                          ${Ps()}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="todayTargetWords">Target Words</label>
                        <input
                          id="todayTargetWords"
                          type="number"
                          min="4"
                          max="60"
                          value=${B.target_words}
                          onInput=${p=>pe(N=>({...N,target_words:p.target.value}))}
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
                          value=${B.tone_funny_pct}
                          onInput=${p=>pe(N=>({...N,tone_funny_pct:p.target.value}))}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="todayCardsPerTheme">Cards Per Theme</label>
                        <input
                          id="todayCardsPerTheme"
                          type="number"
                          min="1"
                          max="50"
                          value=${B.cards_per_theme}
                          onInput=${p=>pe(N=>({...N,cards_per_theme:p.target.value}))}
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
                          value=${B.notes}
                          onInput=${p=>pe(N=>({...N,notes:p.target.value}))}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${w==="create-today-job"||!G}>
                        ${w==="create-today-job"?"Creating...":"Use Today's Theme"}
                      </button>
                      <button type="button" className="button" onClick=${()=>D(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}

        ${d?y`
              <div className="modal-backdrop" onClick=${()=>c(!1)}>
                <section className="modal modal-wide" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">${O?"Edit Theme":"Add Theme"}</h2>
                  <form onSubmit=${at}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="themeKey">Theme Key</label>
                        <input id="themeKey" value=${A.theme_key} onInput=${p=>de(N=>({...N,theme_key:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeNameFactory">Theme Name</label>
                        <input id="themeNameFactory" value=${A.theme_name} onInput=${p=>de(N=>({...N,theme_name:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeBucket">Theme Bucket</label>
                        <select id="themeBucket" value=${A.theme_bucket} onChange=${p=>de(N=>({...N,theme_bucket:p.target.value}))}>
                          <option value="everyday">everyday</option>
                          <option value="occasion">occasion</option>
                          <option value="current_event">current event</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeType">Theme Type</label>
                        <select id="themeType" value=${A.theme_type} onChange=${p=>de(N=>({...N,theme_type:p.target.value}))}>
                          <option value="evergreen">evergreen</option>
                          <option value="calendar">calendar</option>
                          <option value="campaign">campaign</option>
                          <option value="news">news</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeContext">Cultural Context</label>
                        <input id="themeContext" value=${A.cultural_context} onInput=${p=>de(N=>({...N,cultural_context:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeTone">Tone Style</label>
                        <input id="themeTone" value=${A.tone_style} onInput=${p=>de(N=>({...N,tone_style:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeAudience">Audience</label>
                        <input id="themeAudience" value=${A.default_audience} onInput=${p=>de(N=>({...N,default_audience:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeVisual">Visual Style</label>
                        <input id="themeVisual" value=${A.default_visual_style} onInput=${p=>de(N=>({...N,default_visual_style:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themePriority">Priority</label>
                        <input id="themePriority" type="number" value=${A.priority} onInput=${p=>de(N=>({...N,priority:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeFunny">Funny %</label>
                        <input id="themeFunny" type="number" min="0" max="100" value=${A.default_funny_pct} onInput=${p=>de(N=>({...N,default_funny_pct:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeEmotion">Emotion %</label>
                        <input id="themeEmotion" type="number" min="0" max="100" value=${A.default_emotion_pct} onInput=${p=>de(N=>({...N,default_emotion_pct:p.target.value}))} />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="themeDescription">Description</label>
                        <textarea id="themeDescription" rows="4" value=${A.description} onInput=${p=>de(N=>({...N,description:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${A.is_active} onChange=${p=>de(N=>({...N,is_active:p.target.checked}))} />
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
                        <select id="scheduleTheme" value=${V.theme_id} onChange=${p=>ve(N=>({...N,theme_id:p.target.value}))} required>
                          ${t.map(p=>y`<option key=${p.id} value=${p.id}>${p.theme_name}</option>`)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleType">Schedule Type</label>
                        <select id="scheduleType" value=${V.schedule_type} onChange=${p=>ve(N=>({...N,schedule_type:p.target.value}))}>
                          <option value="single_day">single_day</option>
                          <option value="date_range">date_range</option>
                          <option value="weekly_recurring">weekly_recurring</option>
                          <option value="monthly_recurring">monthly_recurring</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleStart">Start Date</label>
                        <input id="scheduleStart" type="date" value=${V.start_date} onInput=${p=>ve(N=>({...N,start_date:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleEnd">End Date</label>
                        <input id="scheduleEnd" type="date" value=${V.end_date} onInput=${p=>ve(N=>({...N,end_date:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="weekdayMask">Weekday Mask</label>
                        <input id="weekdayMask" value=${V.weekday_mask} onInput=${p=>ve(N=>({...N,weekday_mask:p.target.value}))} placeholder="monday, thursday" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="monthMask">Month Mask</label>
                        <input id="monthMask" value=${V.month_mask} onInput=${p=>ve(N=>({...N,month_mask:p.target.value}))} placeholder="2, 3, 8" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleRegion">Region</label>
                        <input id="scheduleRegion" value=${V.region} onInput=${p=>ve(N=>({...N,region:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleCountry">Country</label>
                        <input id="scheduleCountry" value=${V.country} onInput=${p=>ve(N=>({...N,country:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="schedulePriority">Priority</label>
                        <input id="schedulePriority" type="number" value=${V.priority} onInput=${p=>ve(N=>({...N,priority:p.target.value}))} />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="scheduleNotes">Notes</label>
                        <textarea id="scheduleNotes" rows="4" value=${V.notes} onInput=${p=>ve(N=>({...N,notes:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${V.is_active} onChange=${p=>ve(N=>({...N,is_active:p.target.checked}))} />
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
                  <form onSubmit=${jt}>
                    <div className="form-grid">
                      <div className="form-field full">
                        <label htmlFor="overrideTheme">Theme</label>
                        <select id="overrideTheme" value=${Y.theme_id} onChange=${p=>b(N=>({...N,theme_id:p.target.value}))} required>
                          ${t.map(p=>y`<option key=${p.id} value=${p.id}>${p.theme_name}</option>`)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideScope">Scope</label>
                        <input id="overrideScope" value=${Y.override_scope} onInput=${p=>b(N=>({...N,override_scope:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideBy">Created By</label>
                        <input id="overrideBy" value=${Y.created_by} onInput=${p=>b(N=>({...N,created_by:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideStart">Start At</label>
                        <input id="overrideStart" type="datetime-local" value=${Y.start_at} onInput=${p=>b(N=>({...N,start_at:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideEnd">End At</label>
                        <input id="overrideEnd" type="datetime-local" value=${Y.end_at} onInput=${p=>b(N=>({...N,end_at:p.target.value}))} required />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="overrideReason">Reason</label>
                        <textarea id="overrideReason" rows="4" value=${Y.reason} onInput=${p=>b(N=>({...N,reason:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${Y.force_top_priority} onChange=${p=>b(N=>({...N,force_top_priority:p.target.checked}))} />
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
    `}function rp(){let e=Ut(),{jobId:t}=Hl(),[n,r]=(0,$.useState)([]),[a,l]=(0,$.useState)(null),[o,i]=(0,$.useState)([]),[s,u]=(0,$.useState)([]),[m,v]=(0,$.useState)([]),[h,S]=(0,$.useState)(null),[k,w]=(0,$.useState)(!1),[_,d]=(0,$.useState)(""),[c,f]=(0,$.useState)(""),[g,C]=(0,$.useState)(""),x=(0,$.useCallback)(async(P={})=>{let j=!!P.quiet;j||w(!0),d("");try{let W=await M("/api/jobs?limit=50"),q=Array.isArray(W)?W:[];if(r(q),!t){l(null),i([]),u([]),v([]),S(null);return}let[re,at,dn,It]=await Promise.all([M(`/api/jobs/${t}`),M(`/api/jobs/${t}/assets`),M(`/api/jobs/${t}/candidates`),M(`/api/jobs/${t}/shortlist`)]),jt={candidates:[]};try{jt=await ly(t)}catch(fn){console.warn(`Unable to load image assets for ${t}`,fn)}l(re||null),i(Array.isArray(at)?at:[]),u(Array.isArray(dn)?dn:[]),v(Array.isArray(It)?It:[]),S(jt||null)}catch(W){d(W.message||"Unable to load Studio")}finally{j||w(!1)}},[t]);(0,$.useEffect)(()=>{x()},[x]),(0,$.useEffect)(()=>{if(!t)return;let P=window.setInterval(()=>{document.visibilityState==="visible"&&x({quiet:!0})},1e4);return()=>window.clearInterval(P)},[t,x]);let L=(0,$.useMemo)(()=>Xl(a||{}),[a]),D=(0,$.useMemo)(()=>Ql(a||{}),[a]),O=(0,$.useMemo)(()=>uy(a||{},s),[a,s]),I=(0,$.useMemo)(()=>Array.isArray(m)?m:[],[m]),J=(0,$.useMemo)(()=>cp(h),[h]),ee=(0,$.useMemo)(()=>cy(h),[h]),A=(0,$.useMemo)(()=>sy(a||{},o),[a,o]),de=pa(A),V=!!O,ve=!!(O&&ee);async function Y(P,j,W,q){C(P),d("");try{await j(),W&&f(W),await x(),typeof q=="function"&&q()}catch(re){d(re.message||"Studio action failed")}finally{C("")}}async function b(){if(!(!t||!window.confirm(`Delete ${t} and associated files?`))){C("delete"),d("");try{await M(`/api/jobs/${t}`,{method:"DELETE"}),e("/studio")}catch(j){d(j.message||"Unable to delete job")}finally{C("")}}}function B(P){if(!P){e("/studio");return}e(`/studio/${P}`)}function pe(){return a?y`
        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Text Options</h2>
              <p className="section-copy">
                ${I.length} shortlisted from ${s.length} persisted candidates. Choose text manually; nothing is auto-selected in the canonical flow.
              </p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button"
                onClick=${()=>Y("regenerate-text",()=>M(`/api/jobs/${t}/regenerate-content`,{method:"POST"}),`Regenerated text for ${t}`)}
                disabled=${g==="regenerate-text"}
              >
                ${g==="regenerate-text"?"Working...":"Regenerate Text"}
              </button>
              <button
                type="button"
                className="button primary"
                onClick=${()=>Y("more-text",()=>M(`/api/jobs/${t}/generate-more-text`,{method:"POST"}),`Generated 10 more text options for ${t}`)}
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
                  ${I.map(P=>{let j=Number(O?.id||0)===Number(P.candidate_id||0);return y`
                      <article key=${P.shortlist_id||P.candidate_id||`${P.model}_${P.text}`} className=${`studio-option-card ${j?"selected":""}`}>
                        <div className="studio-option-head">
                          <${Te} value=${j?"text_selected":"content_candidates_ready"} />
                          <span className="score-chip">
                            rank ${P.rank} | score ${Number(P.score??0).toFixed(3)}
                          </span>
                        </div>
                        <p className="studio-option-text">${P.text}</p>
                        ${P.reason?y`<p className="section-copy">${P.reason}</p>`:null}
                        <div className="studio-meta-row">
                          <span className="mini-pill">candidate ${P.candidate_id}</span>
                          <span className="mini-pill">${P.model}</span>
                          <span className="mini-pill">${P.backend}</span>
                        </div>
                        ${Array.isArray(P.reason_codes)&&P.reason_codes.length>0?y`
                              <div className="studio-meta-row">
                                ${P.reason_codes.map(W=>y`<span key=${W} className="mini-pill">${W}</span>`)}
                              </div>
                            `:null}
                        <div className="inline-actions">
                          <button
                            type="button"
                            className=${j?"button":"button primary"}
                            onClick=${()=>Y(`select-text:${P.candidate_id}`,()=>M(`/api/jobs/${t}/select-text`,{method:"POST",body:JSON.stringify({candidate_id:P.candidate_id})}),`Selected text option ${P.candidate_id} for ${t}`)}
                            disabled=${g===`select-text:${P.candidate_id}`||j}
                          >
                            ${g===`select-text:${P.candidate_id}`?"Working...":j?"Using This Text":"Use This Text"}
                          </button>
                        </div>
                      </article>
                    `})}
                </div>
              `}
        </section>
      `:null}function G(){if(!a)return null;let P=[h?.selected_image_candidate_id?`candidate ${h.selected_image_candidate_id}`:null,h?.selected_image_provider||null,h?.selected_image_model||null].filter(Boolean).join(" | ");return y`
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
                      onClick=${()=>Y("generate-image-assets",()=>M(`/api/jobs/${t}/image-assets/generate`,{method:"POST"}),`Generated image assets for ${t}`)}
                      disabled=${g==="generate-image-assets"||!V}
                    >
                      ${g==="generate-image-assets"?"Working...":"Generate Image Assets"}
                    </button>
                  `:y`
                    <button
                      type="button"
                      className="button primary"
                      onClick=${()=>Y("regenerate-image-assets",()=>M(`/api/jobs/${t}/image-assets/regenerate`,{method:"POST"}),`Regenerated image assets for ${t}`)}
                      disabled=${g==="regenerate-image-assets"||!V}
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
            ${ee?`Selected image: ${P||"saved locally"}`:"No image selected yet."}
          </div>
          ${J.length===0?y`<p className="empty-state">${V?"No image candidates yet. Use Generate Image Assets to create ImageForge options.":"No image candidates yet because there is no selected text."}</p>`:y`
                <div className="studio-image-grid">
                  ${J.map(j=>{let W=ee&&ee.candidate_id===j.candidate_id;return y`
                      <article key=${j.key} className=${`studio-image-card ${W?"selected":""}`}>
                        <a href=${j.url} target="_blank" rel="noreferrer">
                          <img src=${j.url} alt=${j.provider} loading="lazy" />
                        </a>
                        <div className="studio-image-body">
                          <div className="studio-meta-row">
                            <span className="mini-pill">${Se(j.provider)}</span>
                            <span className="mini-pill">${j.model||"Default Model"}</span>
                          </div>
                          <div className="studio-meta-row">
                            ${np(j.width,j.height)?y`<span className="mini-pill">${np(j.width,j.height)}</span>`:null}
                            <span className="mini-pill">${Ie(j.created_at)}</span>
                            <span className="mini-pill">${W?"Selected":`Candidate ${j.candidate_index}`}</span>
                          </div>
                          <div className="studio-meta-row">
                            <span className="mini-pill">${j.relative_path||"No relative path"}</span>
                          </div>
                          <div className="inline-actions">
                            <button
                              type="button"
                              className=${W?"button":"button primary"}
                              onClick=${()=>Y(`select-image-asset:${j.candidate_id}`,()=>M(`/api/jobs/${t}/image-assets/${j.candidate_id}/select`,{method:"POST"}),`Selected image asset for ${t}`)}
                              disabled=${g===`select-image-asset:${j.candidate_id}`||W}
                            >
                              ${g===`select-image-asset:${j.candidate_id}`?"Working...":W?"Using This Image":"Use This Image"}
                            </button>
                          </div>
                        </div>
                      </article>
                    `})}
                </div>
              `}
        </section>
      `}function De(){if(!a)return null;let P=!!L.is_favorite,j=A.length>0?"Regenerate Final Card":"Render Final Card",W=A.length>0?`/api/jobs/${t}/rerun/final-render`:`/api/jobs/${t}/render-final`;return y`
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
                onClick=${()=>Y("favorite",()=>M(`/api/jobs/${t}/favorite`,{method:"POST",body:JSON.stringify({favorite:!P})}),P?`Removed ${t} from favorites`:`Marked ${t} as favorite`)}
                disabled=${g==="favorite"}
              >
                ${g==="favorite"?"Working...":P?"Unfavorite":"Mark Favorite"}
              </button>
              <button
                type="button"
                className="button primary"
                onClick=${()=>Y("rerun-card",()=>M(W,{method:"POST"}),`${j} completed for ${t}`)}
                disabled=${g==="rerun-card"||!ve}
              >
                ${g==="rerun-card"?"Working...":j}
              </button>
            </div>
          </div>
          <div className=${O?"status-panel success studio-selected-copy":"status-panel warning studio-selected-copy"}>
            ${O?`Text selected: ${O.text||O.content_text}`:"No selected text yet."}
          </div>
          <div className=${ee?"status-panel success studio-selected-copy":"status-panel warning studio-selected-copy"}>
            ${ee?`Image selected: ${h?.selected_image_candidate_id||ee.candidate_id} | ${h?.selected_image_provider||ee.provider} | ${h?.selected_image_model||ee.model||"Default Model"}`:"No selected image yet."}
          </div>
          ${A.length===0?y`
                <p className="empty-state">
                  ${ve?"No final card preview rendered yet. Render the current text + image selection.":"Select both text and image before rendering the final card preview."}
                </p>
              `:y`
                <div className="studio-final-grid">
                  ${A.map(q=>y`
                    <article key=${q.key} className="studio-final-card">
                      <a href=${q.url} target="_blank" rel="noreferrer">
                        <img src=${q.url} alt=${q.label} loading="lazy" />
                      </a>
                      <div className="studio-image-body">
                        <div className="studio-meta-row">
                          <span className="mini-pill">${q.label}</span>
                          <span className="mini-pill">${P?"Favorite":Se(dy(a))}</span>
                        </div>
                        <div className="ecard-actions">
                          <a href=${q.url} target="_blank" rel="noreferrer" className="button-link">Open</a>
                          <button
                            type="button"
                            className="button"
                            onClick=${()=>Y("favorite",()=>M(`/api/jobs/${t}/favorite`,{method:"POST",body:JSON.stringify({favorite:!P})}),P?`Removed ${t} from favorites`:`Marked ${t} as favorite`)}
                            disabled=${g==="favorite"}
                          >
                            ${P?"Unfavorite":"Mark Favorite"}
                          </button>
                          <button
                            type="button"
                            className="button"
                            onClick=${()=>Y("archive",()=>M(`/api/jobs/${t}/archive`,{method:"POST"}),`Archived ${t}`)}
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
                    <select value=${t||""} onChange=${P=>B(P.target.value)}>
                      <option value="">Choose job</option>
                      ${n.map(P=>y`
                        <option key=${P.job_id} value=${P.job_id}>${P.theme_name} | ${P.job_id}</option>
                      `)}
                    </select>
                  </label>
                `:null}
            <button type="button" className="button" onClick=${x} disabled=${k}>Refresh</button>
            ${t?y`<${Ge} to=${`/jobs/${t}`} className="button-link">Job Detail<//>`:null}
          </div>
        </header>

        ${_?y`<div className="status-panel error">${_}</div>`:null}
        ${c?y`<p className="status-line">${c}</p>`:null}
        ${k?y`<div className="status-panel warning">Loading Studio data...</div>`:null}

        ${t?a?y`
                <section className="section-panel">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">${a.theme_name}</h2>
                      <p className="section-copy">${a.job_id} | ${a.cards_per_theme||10} cards | ${sp(a?.output_spec?.format)} | backend status: ${Se(a.status)}</p>
                    </div>
                    <${Te} value=${D} />
                  </div>
                  <div className="studio-current-grid">
                    <article className="key-card">
                      <p className="key-label">Current Stage</p>
                      <p className="studio-current-copy">${Se(D)}</p>
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
                ${G()}
                ${De()}
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
                            ${n.map(P=>y`
                              <tr key=${P.job_id}>
                                <td>${P.job_id}</td>
                                <td>${P.theme_name}</td>
                                <td><${Te} value=${Ql(P)} /></td>
                                <td>${Ie(P.updated_at)}</td>
                                <td><${Ge} className="job-link" to=${`/studio/${P.job_id}`}>Open Studio<//></td>
                              </tr>
                            `)}
                          </tbody>
                        </table>
                      </div>
                    `}
              </section>
            `}
      </section>
    `}function hy(){let[e,t]=(0,$.useState)([]),[n,r]=(0,$.useState)(!1),[a,l]=(0,$.useState)(""),o=(0,$.useCallback)(async()=>{r(!0),l("");try{let i=await M("/api/jobs?limit=100");t(Array.isArray(i)?i:[])}catch(i){l(i.message||"Unable to load jobs")}finally{r(!1)}},[]);return(0,$.useEffect)(()=>{o()},[o]),y`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Jobs</p>
            <h1 className="page-title">All Jobs</h1>
            <p className="page-description">Workflow data is still available, but Studio is the primary place to control card output.</p>
          </div>
          <div className="inline-actions">
            <button type="button" className="button" onClick=${o} disabled=${n}>Refresh</button>
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
                          <td><${Te} value=${i.status} /></td>
                          <td>${Se(i.current_stage)}</td>
                          <td>${Ie(i.updated_at)}</td>
                          <td>
                            <div className="inline-actions">
                              <${Ge} className="button-link" to=${`/studio/${i.job_id}`}>Studio<//>
                              <${Ge} className="button-link" to=${`/jobs/${i.job_id}`}>Detail<//>
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
    `}function dp(){return y`
      <aside className="console-sidebar">
        <div className="sidebar-brand">
          <p className="brand-overline">eCardFactory</p>
          <p className="sidebar-brand-mark">ECF</p>
        </div>
        <nav className="sidebar-nav icon-only" aria-label="Primary">
          ${[{to:"/",label:"Home",icon:"home",end:!0},{to:"/themes",label:"Theme Factory",icon:"themes"},{to:"/studio",label:"Studio",icon:"studio"},{to:"/compare",label:"Compare Lab",icon:"compare"},{to:"/jobs",label:"Jobs",icon:"jobs"}].map(t=>y`
            <${zf}
              key=${t.to}
              to=${t.to}
              end=${!!t.end}
              title=${t.label}
              data-tooltip=${t.label}
              className=${({isActive:n})=>n?"nav-link icon-link active":"nav-link icon-link"}
            >
              <span className="nav-icon"><${Xv} name=${t.icon} /></span>
              <span className="sr-only">${t.label}</span>
            <//>
          `)}
        </nav>
      </aside>
    `}function vy(){return y`
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
            <a href=${Gf} target="_blank" rel="noreferrer" className="button-link">Open Standalone Compare</a>
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
            src=${Gf}
            title="eCardFactory Compare Lab"
            loading="lazy"
          ></iframe>
        </section>
      </section>
    `}function yy(){return y`
      <div className="console-layout">
        <${dp} />

        <main className="console-main">
          <${bs}>
            <${gt} path="/" element=${y`<${fy} />`} />
            <${gt} path="/themes" element=${y`<${my} />`} />
            <${gt} path="/studio" element=${y`<${rp} />`} />
            <${gt} path="/studio/:jobId" element=${y`<${rp} />`} />
            <${gt} path="/compare" element=${y`<${vy} />`} />
            <${gt} path="/jobs" element=${y`<${hy} />`} />
            <${gt} path="/jobs/:jobId" element=${y`<${py} />`} />
            <${gt} path="*" element=${y`<${$s} to="/" replace=${!0} />`} />
          <//>
        </main>
      </div>
    `}var Ds=class extends $.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}componentDidCatch(t){fa(`Frontend render error: ${t?.message||"unknown error"}. See browser console for details.`,t)}render(){return this.state.error?y`
        <div className="console-layout">
          <${dp} />
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
      `:this.props.children}};function gy(){return(0,$.useEffect)(()=>{Yv()},[]),null}function _y(){return y`
      <${Mf}>
        <${Ds}>
          <${gy} />
          <${yy} />
        <//>
      <//>
    `}window.addEventListener("error",e=>{e.error&&fa(`Frontend runtime error: ${e.error.message||"unknown error"}.`,e.error)});window.addEventListener("unhandledrejection",e=>{fa(`Unhandled async error: ${e.reason?.message||String(e.reason||"unknown")}`,e.reason)});var ap=document.getElementById("root");if(!ap)fa("Frontend root element (#root) is missing in index.html.");else try{(0,lp.createRoot)(ap).render(y`<${_y} />`)}catch(e){fa(`Unable to mount React root: ${e?.message||"unknown mount error"}`,e)}})();
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
