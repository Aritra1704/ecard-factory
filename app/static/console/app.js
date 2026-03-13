(()=>{var Ff=Object.create;var vs=Object.defineProperty;var Of=Object.getOwnPropertyDescriptor;var Uf=Object.getOwnPropertyNames;var Af=Object.getPrototypeOf,If=Object.prototype.hasOwnProperty;var tn=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Mf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Uf(t))!If.call(e,a)&&a!==n&&vs(e,a,{get:()=>t[a],enumerable:!(r=Of(t,a))||r.enumerable});return e};var nr=(e,t,n)=>(n=e!=null?Ff(Af(e)):{},Mf(t||!e||!e.__esModule?vs(n,"default",{value:e,enumerable:!0}):n,e));var Ps=tn(U=>{"use strict";var rr=Symbol.for("react.element"),jf=Symbol.for("react.portal"),zf=Symbol.for("react.fragment"),Vf=Symbol.for("react.strict_mode"),Bf=Symbol.for("react.profiler"),Hf=Symbol.for("react.provider"),Wf=Symbol.for("react.context"),Kf=Symbol.for("react.forward_ref"),Qf=Symbol.for("react.suspense"),Yf=Symbol.for("react.memo"),Jf=Symbol.for("react.lazy"),ys=Symbol.iterator;function Gf(e){return e===null||typeof e!="object"?null:(e=ys&&e[ys]||e["@@iterator"],typeof e=="function"?e:null)}var _s={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ns=Object.assign,Ss={};function En(e,t,n){this.props=e,this.context=t,this.refs=Ss,this.updater=n||_s}En.prototype.isReactComponent={};En.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};En.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Es(){}Es.prototype=En.prototype;function Ol(e,t,n){this.props=e,this.context=t,this.refs=Ss,this.updater=n||_s}var Ul=Ol.prototype=new Es;Ul.constructor=Ol;Ns(Ul,En.prototype);Ul.isPureReactComponent=!0;var gs=Array.isArray,ks=Object.prototype.hasOwnProperty,Al={current:null},Rs={key:!0,ref:!0,__self:!0,__source:!0};function Cs(e,t,n){var r,a={},l=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(l=""+t.key),t)ks.call(t,r)&&!Rs.hasOwnProperty(r)&&(a[r]=t[r]);var i=arguments.length-2;if(i===1)a.children=n;else if(1<i){for(var s=Array(i),u=0;u<i;u++)s[u]=arguments[u+2];a.children=s}if(e&&e.defaultProps)for(r in i=e.defaultProps,i)a[r]===void 0&&(a[r]=i[r]);return{$$typeof:rr,type:e,key:l,ref:o,props:a,_owner:Al.current}}function Xf(e,t){return{$$typeof:rr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Il(e){return typeof e=="object"&&e!==null&&e.$$typeof===rr}function Zf(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var ws=/\/+/g;function Fl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Zf(""+e.key):t.toString(36)}function na(e,t,n,r,a){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(l){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case rr:case jf:o=!0}}if(o)return o=e,a=a(o),e=r===""?"."+Fl(o,0):r,gs(a)?(n="",e!=null&&(n=e.replace(ws,"$&/")+"/"),na(a,t,n,"",function(u){return u})):a!=null&&(Il(a)&&(a=Xf(a,n+(!a.key||o&&o.key===a.key?"":(""+a.key).replace(ws,"$&/")+"/")+e)),t.push(a)),1;if(o=0,r=r===""?".":r+":",gs(e))for(var i=0;i<e.length;i++){l=e[i];var s=r+Fl(l,i);o+=na(l,t,n,s,a)}else if(s=Gf(e),typeof s=="function")for(e=s.call(e),i=0;!(l=e.next()).done;)l=l.value,s=r+Fl(l,i++),o+=na(l,t,n,s,a);else if(l==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function ta(e,t,n){if(e==null)return e;var r=[],a=0;return na(e,r,"","",function(l){return t.call(n,l,a++)}),r}function qf(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ke={current:null},ra={transition:null},ep={ReactCurrentDispatcher:ke,ReactCurrentBatchConfig:ra,ReactCurrentOwner:Al};function xs(){throw Error("act(...) is not supported in production builds of React.")}U.Children={map:ta,forEach:function(e,t,n){ta(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ta(e,function(){t++}),t},toArray:function(e){return ta(e,function(t){return t})||[]},only:function(e){if(!Il(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};U.Component=En;U.Fragment=zf;U.Profiler=Bf;U.PureComponent=Ol;U.StrictMode=Vf;U.Suspense=Qf;U.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ep;U.act=xs;U.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Ns({},e.props),a=e.key,l=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(l=t.ref,o=Al.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(s in t)ks.call(t,s)&&!Rs.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&i!==void 0?i[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){i=Array(s);for(var u=0;u<s;u++)i[u]=arguments[u+2];r.children=i}return{$$typeof:rr,type:e.type,key:a,ref:l,props:r,_owner:o}};U.createContext=function(e){return e={$$typeof:Wf,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Hf,_context:e},e.Consumer=e};U.createElement=Cs;U.createFactory=function(e){var t=Cs.bind(null,e);return t.type=e,t};U.createRef=function(){return{current:null}};U.forwardRef=function(e){return{$$typeof:Kf,render:e}};U.isValidElement=Il;U.lazy=function(e){return{$$typeof:Jf,_payload:{_status:-1,_result:e},_init:qf}};U.memo=function(e,t){return{$$typeof:Yf,type:e,compare:t===void 0?null:t}};U.startTransition=function(e){var t=ra.transition;ra.transition={};try{e()}finally{ra.transition=t}};U.unstable_act=xs;U.useCallback=function(e,t){return ke.current.useCallback(e,t)};U.useContext=function(e){return ke.current.useContext(e)};U.useDebugValue=function(){};U.useDeferredValue=function(e){return ke.current.useDeferredValue(e)};U.useEffect=function(e,t){return ke.current.useEffect(e,t)};U.useId=function(){return ke.current.useId()};U.useImperativeHandle=function(e,t,n){return ke.current.useImperativeHandle(e,t,n)};U.useInsertionEffect=function(e,t){return ke.current.useInsertionEffect(e,t)};U.useLayoutEffect=function(e,t){return ke.current.useLayoutEffect(e,t)};U.useMemo=function(e,t){return ke.current.useMemo(e,t)};U.useReducer=function(e,t,n){return ke.current.useReducer(e,t,n)};U.useRef=function(e){return ke.current.useRef(e)};U.useState=function(e){return ke.current.useState(e)};U.useSyncExternalStore=function(e,t,n){return ke.current.useSyncExternalStore(e,t,n)};U.useTransition=function(){return ke.current.useTransition()};U.version="18.3.1"});var ar=tn((xv,$s)=>{"use strict";$s.exports=Ps()});var Ms=tn(W=>{"use strict";function Vl(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<aa(a,t))e[r]=t,e[n]=a,n=r;else break e}}function Ye(e){return e.length===0?null:e[0]}function oa(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,a=e.length,l=a>>>1;r<l;){var o=2*(r+1)-1,i=e[o],s=o+1,u=e[s];if(0>aa(i,n))s<a&&0>aa(u,i)?(e[r]=u,e[s]=n,r=s):(e[r]=i,e[o]=n,r=o);else if(s<a&&0>aa(u,n))e[r]=u,e[s]=n,r=s;else break e}}return t}function aa(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Ts=performance,W.unstable_now=function(){return Ts.now()}):(Ml=Date,Ds=Ml.now(),W.unstable_now=function(){return Ml.now()-Ds});var Ts,Ml,Ds,ot=[],Ct=[],tp=1,je=null,ge=3,ia=!1,nn=!1,or=!1,Fs=typeof setTimeout=="function"?setTimeout:null,Os=typeof clearTimeout=="function"?clearTimeout:null,Ls=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Bl(e){for(var t=Ye(Ct);t!==null;){if(t.callback===null)oa(Ct);else if(t.startTime<=e)oa(Ct),t.sortIndex=t.expirationTime,Vl(ot,t);else break;t=Ye(Ct)}}function Hl(e){if(or=!1,Bl(e),!nn)if(Ye(ot)!==null)nn=!0,Kl(Wl);else{var t=Ye(Ct);t!==null&&Ql(Hl,t.startTime-e)}}function Wl(e,t){nn=!1,or&&(or=!1,Os(ir),ir=-1),ia=!0;var n=ge;try{for(Bl(t),je=Ye(ot);je!==null&&(!(je.expirationTime>t)||e&&!Is());){var r=je.callback;if(typeof r=="function"){je.callback=null,ge=je.priorityLevel;var a=r(je.expirationTime<=t);t=W.unstable_now(),typeof a=="function"?je.callback=a:je===Ye(ot)&&oa(ot),Bl(t)}else oa(ot);je=Ye(ot)}if(je!==null)var l=!0;else{var o=Ye(Ct);o!==null&&Ql(Hl,o.startTime-t),l=!1}return l}finally{je=null,ge=n,ia=!1}}var sa=!1,la=null,ir=-1,Us=5,As=-1;function Is(){return!(W.unstable_now()-As<Us)}function jl(){if(la!==null){var e=W.unstable_now();As=e;var t=!0;try{t=la(!0,e)}finally{t?lr():(sa=!1,la=null)}}else sa=!1}var lr;typeof Ls=="function"?lr=function(){Ls(jl)}:typeof MessageChannel<"u"?(zl=new MessageChannel,bs=zl.port2,zl.port1.onmessage=jl,lr=function(){bs.postMessage(null)}):lr=function(){Fs(jl,0)};var zl,bs;function Kl(e){la=e,sa||(sa=!0,lr())}function Ql(e,t){ir=Fs(function(){e(W.unstable_now())},t)}W.unstable_IdlePriority=5;W.unstable_ImmediatePriority=1;W.unstable_LowPriority=4;W.unstable_NormalPriority=3;W.unstable_Profiling=null;W.unstable_UserBlockingPriority=2;W.unstable_cancelCallback=function(e){e.callback=null};W.unstable_continueExecution=function(){nn||ia||(nn=!0,Kl(Wl))};W.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Us=0<e?Math.floor(1e3/e):5};W.unstable_getCurrentPriorityLevel=function(){return ge};W.unstable_getFirstCallbackNode=function(){return Ye(ot)};W.unstable_next=function(e){switch(ge){case 1:case 2:case 3:var t=3;break;default:t=ge}var n=ge;ge=t;try{return e()}finally{ge=n}};W.unstable_pauseExecution=function(){};W.unstable_requestPaint=function(){};W.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=ge;ge=e;try{return t()}finally{ge=n}};W.unstable_scheduleCallback=function(e,t,n){var r=W.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return a=n+a,e={id:tp++,callback:t,priorityLevel:e,startTime:n,expirationTime:a,sortIndex:-1},n>r?(e.sortIndex=n,Vl(Ct,e),Ye(ot)===null&&e===Ye(Ct)&&(or?(Os(ir),ir=-1):or=!0,Ql(Hl,n-r))):(e.sortIndex=a,Vl(ot,e),nn||ia||(nn=!0,Kl(Wl))),e};W.unstable_shouldYield=Is;W.unstable_wrapCallback=function(e){var t=ge;return function(){var n=ge;ge=t;try{return e.apply(this,arguments)}finally{ge=n}}}});var zs=tn(($v,js)=>{"use strict";js.exports=Ms()});var Wd=tn(Me=>{"use strict";var np=ar(),Ae=zs();function k(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Yu=new Set,$r={};function vn(e,t){Hn(e,t),Hn(e+"Capture",t)}function Hn(e,t){for($r[e]=t,e=0;e<t.length;e++)Yu.add(t[e])}var wt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),yo=Object.prototype.hasOwnProperty,rp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Vs={},Bs={};function ap(e){return yo.call(Bs,e)?!0:yo.call(Vs,e)?!1:rp.test(e)?Bs[e]=!0:(Vs[e]=!0,!1)}function lp(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function op(e,t,n,r){if(t===null||typeof t>"u"||lp(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function xe(e,t,n,r,a,l,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=o}var ve={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ve[e]=new xe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ve[t]=new xe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ve[e]=new xe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ve[e]=new xe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ve[e]=new xe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ve[e]=new xe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ve[e]=new xe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ve[e]=new xe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ve[e]=new xe(e,5,!1,e.toLowerCase(),null,!1,!1)});var ui=/[\-:]([a-z])/g;function ci(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ui,ci);ve[t]=new xe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ui,ci);ve[t]=new xe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ui,ci);ve[t]=new xe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ve[e]=new xe(e,1,!1,e.toLowerCase(),null,!1,!1)});ve.xlinkHref=new xe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ve[e]=new xe(e,1,!1,e.toLowerCase(),null,!0,!0)});function di(e,t,n,r){var a=ve.hasOwnProperty(t)?ve[t]:null;(a!==null?a.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(op(t,n,a,r)&&(n=null),r||a===null?ap(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(t=a.attributeName,r=a.attributeNamespace,n===null?e.removeAttribute(t):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Et=np.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ua=Symbol.for("react.element"),Cn=Symbol.for("react.portal"),xn=Symbol.for("react.fragment"),fi=Symbol.for("react.strict_mode"),go=Symbol.for("react.profiler"),Ju=Symbol.for("react.provider"),Gu=Symbol.for("react.context"),pi=Symbol.for("react.forward_ref"),wo=Symbol.for("react.suspense"),_o=Symbol.for("react.suspense_list"),hi=Symbol.for("react.memo"),Pt=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var Xu=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var Hs=Symbol.iterator;function sr(e){return e===null||typeof e!="object"?null:(e=Hs&&e[Hs]||e["@@iterator"],typeof e=="function"?e:null)}var te=Object.assign,Yl;function vr(e){if(Yl===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Yl=t&&t[1]||""}return`
`+Yl+e}var Jl=!1;function Gl(e,t){if(!e||Jl)return"";Jl=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var a=u.stack.split(`
`),l=r.stack.split(`
`),o=a.length-1,i=l.length-1;1<=o&&0<=i&&a[o]!==l[i];)i--;for(;1<=o&&0<=i;o--,i--)if(a[o]!==l[i]){if(o!==1||i!==1)do if(o--,i--,0>i||a[o]!==l[i]){var s=`
`+a[o].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=o&&0<=i);break}}}finally{Jl=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?vr(e):""}function ip(e){switch(e.tag){case 5:return vr(e.type);case 16:return vr("Lazy");case 13:return vr("Suspense");case 19:return vr("SuspenseList");case 0:case 2:case 15:return e=Gl(e.type,!1),e;case 11:return e=Gl(e.type.render,!1),e;case 1:return e=Gl(e.type,!0),e;default:return""}}function No(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case xn:return"Fragment";case Cn:return"Portal";case go:return"Profiler";case fi:return"StrictMode";case wo:return"Suspense";case _o:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Gu:return(e.displayName||"Context")+".Consumer";case Ju:return(e._context.displayName||"Context")+".Provider";case pi:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case hi:return t=e.displayName||null,t!==null?t:No(e.type)||"Memo";case Pt:t=e._payload,e=e._init;try{return No(e(t))}catch{}}return null}function sp(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return No(t);case 8:return t===fi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Vt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Zu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function up(e){var t=Zu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,l=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(o){r=""+o,l.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ca(e){e._valueTracker||(e._valueTracker=up(e))}function qu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Zu(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Ia(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function So(e,t){var n=t.checked;return te({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Ws(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Vt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function ec(e,t){t=t.checked,t!=null&&di(e,"checked",t,!1)}function Eo(e,t){ec(e,t);var n=Vt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ko(e,t.type,n):t.hasOwnProperty("defaultValue")&&ko(e,t.type,Vt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ks(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ko(e,t,n){(t!=="number"||Ia(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var yr=Array.isArray;function In(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Vt(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,r&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function Ro(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(k(91));return te({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Qs(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(k(92));if(yr(n)){if(1<n.length)throw Error(k(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Vt(n)}}function tc(e,t){var n=Vt(t.value),r=Vt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Ys(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function nc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Co(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?nc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var da,rc=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,a)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(da=da||document.createElement("div"),da.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=da.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Tr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var _r={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},cp=["Webkit","ms","Moz","O"];Object.keys(_r).forEach(function(e){cp.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),_r[t]=_r[e]})});function ac(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||_r.hasOwnProperty(e)&&_r[e]?(""+t).trim():t+"px"}function lc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,a=ac(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,a):e[n]=a}}var dp=te({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function xo(e,t){if(t){if(dp[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(k(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(k(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(k(61))}if(t.style!=null&&typeof t.style!="object")throw Error(k(62))}}function Po(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var $o=null;function mi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var To=null,Mn=null,jn=null;function Js(e){if(e=Yr(e)){if(typeof To!="function")throw Error(k(280));var t=e.stateNode;t&&(t=fl(t),To(e.stateNode,e.type,t))}}function oc(e){Mn?jn?jn.push(e):jn=[e]:Mn=e}function ic(){if(Mn){var e=Mn,t=jn;if(jn=Mn=null,Js(e),t)for(e=0;e<t.length;e++)Js(t[e])}}function sc(e,t){return e(t)}function uc(){}var Xl=!1;function cc(e,t,n){if(Xl)return e(t,n);Xl=!0;try{return sc(e,t,n)}finally{Xl=!1,(Mn!==null||jn!==null)&&(uc(),ic())}}function Dr(e,t){var n=e.stateNode;if(n===null)return null;var r=fl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(k(231,t,typeof n));return n}var Do=!1;if(wt)try{kn={},Object.defineProperty(kn,"passive",{get:function(){Do=!0}}),window.addEventListener("test",kn,kn),window.removeEventListener("test",kn,kn)}catch{Do=!1}var kn;function fp(e,t,n,r,a,l,o,i,s){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(h){this.onError(h)}}var Nr=!1,Ma=null,ja=!1,Lo=null,pp={onError:function(e){Nr=!0,Ma=e}};function hp(e,t,n,r,a,l,o,i,s){Nr=!1,Ma=null,fp.apply(pp,arguments)}function mp(e,t,n,r,a,l,o,i,s){if(hp.apply(this,arguments),Nr){if(Nr){var u=Ma;Nr=!1,Ma=null}else throw Error(k(198));ja||(ja=!0,Lo=u)}}function yn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function dc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Gs(e){if(yn(e)!==e)throw Error(k(188))}function vp(e){var t=e.alternate;if(!t){if(t=yn(e),t===null)throw Error(k(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var l=a.alternate;if(l===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===l.child){for(l=a.child;l;){if(l===n)return Gs(a),e;if(l===r)return Gs(a),t;l=l.sibling}throw Error(k(188))}if(n.return!==r.return)n=a,r=l;else{for(var o=!1,i=a.child;i;){if(i===n){o=!0,n=a,r=l;break}if(i===r){o=!0,r=a,n=l;break}i=i.sibling}if(!o){for(i=l.child;i;){if(i===n){o=!0,n=l,r=a;break}if(i===r){o=!0,r=l,n=a;break}i=i.sibling}if(!o)throw Error(k(189))}}if(n.alternate!==r)throw Error(k(190))}if(n.tag!==3)throw Error(k(188));return n.stateNode.current===n?e:t}function fc(e){return e=vp(e),e!==null?pc(e):null}function pc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=pc(e);if(t!==null)return t;e=e.sibling}return null}var hc=Ae.unstable_scheduleCallback,Xs=Ae.unstable_cancelCallback,yp=Ae.unstable_shouldYield,gp=Ae.unstable_requestPaint,ae=Ae.unstable_now,wp=Ae.unstable_getCurrentPriorityLevel,vi=Ae.unstable_ImmediatePriority,mc=Ae.unstable_UserBlockingPriority,za=Ae.unstable_NormalPriority,_p=Ae.unstable_LowPriority,vc=Ae.unstable_IdlePriority,sl=null,ct=null;function Np(e){if(ct&&typeof ct.onCommitFiberRoot=="function")try{ct.onCommitFiberRoot(sl,e,void 0,(e.current.flags&128)===128)}catch{}}var qe=Math.clz32?Math.clz32:kp,Sp=Math.log,Ep=Math.LN2;function kp(e){return e>>>=0,e===0?32:31-(Sp(e)/Ep|0)|0}var fa=64,pa=4194304;function gr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Va(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,a=e.suspendedLanes,l=e.pingedLanes,o=n&268435455;if(o!==0){var i=o&~a;i!==0?r=gr(i):(l&=o,l!==0&&(r=gr(l)))}else o=n&~a,o!==0?r=gr(o):l!==0&&(r=gr(l));if(r===0)return 0;if(t!==0&&t!==r&&(t&a)===0&&(a=r&-r,l=t&-t,a>=l||a===16&&(l&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-qe(t),a=1<<n,r|=e[n],t&=~a;return r}function Rp(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Cp(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,l=e.pendingLanes;0<l;){var o=31-qe(l),i=1<<o,s=a[o];s===-1?((i&n)===0||(i&r)!==0)&&(a[o]=Rp(i,t)):s<=t&&(e.expiredLanes|=i),l&=~i}}function bo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function yc(){var e=fa;return fa<<=1,(fa&4194240)===0&&(fa=64),e}function Zl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Kr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-qe(t),e[t]=n}function xp(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-qe(n),l=1<<a;t[a]=0,r[a]=-1,e[a]=-1,n&=~l}}function yi(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-qe(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}var B=0;function gc(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var wc,gi,_c,Nc,Sc,Fo=!1,ha=[],Ft=null,Ot=null,Ut=null,Lr=new Map,br=new Map,Tt=[],Pp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Zs(e,t){switch(e){case"focusin":case"focusout":Ft=null;break;case"dragenter":case"dragleave":Ot=null;break;case"mouseover":case"mouseout":Ut=null;break;case"pointerover":case"pointerout":Lr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":br.delete(t.pointerId)}}function ur(e,t,n,r,a,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:l,targetContainers:[a]},t!==null&&(t=Yr(t),t!==null&&gi(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function $p(e,t,n,r,a){switch(t){case"focusin":return Ft=ur(Ft,e,t,n,r,a),!0;case"dragenter":return Ot=ur(Ot,e,t,n,r,a),!0;case"mouseover":return Ut=ur(Ut,e,t,n,r,a),!0;case"pointerover":var l=a.pointerId;return Lr.set(l,ur(Lr.get(l)||null,e,t,n,r,a)),!0;case"gotpointercapture":return l=a.pointerId,br.set(l,ur(br.get(l)||null,e,t,n,r,a)),!0}return!1}function Ec(e){var t=ln(e.target);if(t!==null){var n=yn(t);if(n!==null){if(t=n.tag,t===13){if(t=dc(n),t!==null){e.blockedOn=t,Sc(e.priority,function(){_c(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Pa(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Oo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);$o=r,n.target.dispatchEvent(r),$o=null}else return t=Yr(n),t!==null&&gi(t),e.blockedOn=n,!1;t.shift()}return!0}function qs(e,t,n){Pa(e)&&n.delete(t)}function Tp(){Fo=!1,Ft!==null&&Pa(Ft)&&(Ft=null),Ot!==null&&Pa(Ot)&&(Ot=null),Ut!==null&&Pa(Ut)&&(Ut=null),Lr.forEach(qs),br.forEach(qs)}function cr(e,t){e.blockedOn===t&&(e.blockedOn=null,Fo||(Fo=!0,Ae.unstable_scheduleCallback(Ae.unstable_NormalPriority,Tp)))}function Fr(e){function t(a){return cr(a,e)}if(0<ha.length){cr(ha[0],e);for(var n=1;n<ha.length;n++){var r=ha[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Ft!==null&&cr(Ft,e),Ot!==null&&cr(Ot,e),Ut!==null&&cr(Ut,e),Lr.forEach(t),br.forEach(t),n=0;n<Tt.length;n++)r=Tt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Tt.length&&(n=Tt[0],n.blockedOn===null);)Ec(n),n.blockedOn===null&&Tt.shift()}var zn=Et.ReactCurrentBatchConfig,Ba=!0;function Dp(e,t,n,r){var a=B,l=zn.transition;zn.transition=null;try{B=1,wi(e,t,n,r)}finally{B=a,zn.transition=l}}function Lp(e,t,n,r){var a=B,l=zn.transition;zn.transition=null;try{B=4,wi(e,t,n,r)}finally{B=a,zn.transition=l}}function wi(e,t,n,r){if(Ba){var a=Oo(e,t,n,r);if(a===null)lo(e,t,r,Ha,n),Zs(e,r);else if($p(a,e,t,n,r))r.stopPropagation();else if(Zs(e,r),t&4&&-1<Pp.indexOf(e)){for(;a!==null;){var l=Yr(a);if(l!==null&&wc(l),l=Oo(e,t,n,r),l===null&&lo(e,t,r,Ha,n),l===a)break;a=l}a!==null&&r.stopPropagation()}else lo(e,t,r,null,n)}}var Ha=null;function Oo(e,t,n,r){if(Ha=null,e=mi(r),e=ln(e),e!==null)if(t=yn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=dc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ha=e,null}function kc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(wp()){case vi:return 1;case mc:return 4;case za:case _p:return 16;case vc:return 536870912;default:return 16}default:return 16}}var Lt=null,_i=null,$a=null;function Rc(){if($a)return $a;var e,t=_i,n=t.length,r,a="value"in Lt?Lt.value:Lt.textContent,l=a.length;for(e=0;e<n&&t[e]===a[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===a[l-r];r++);return $a=a.slice(e,1<r?1-r:void 0)}function Ta(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ma(){return!0}function eu(){return!1}function Ie(e){function t(n,r,a,l,o){this._reactName=n,this._targetInst=a,this.type=r,this.nativeEvent=l,this.target=o,this.currentTarget=null;for(var i in e)e.hasOwnProperty(i)&&(n=e[i],this[i]=n?n(l):l[i]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?ma:eu,this.isPropagationStopped=eu,this}return te(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ma)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ma)},persist:function(){},isPersistent:ma}),t}var Xn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ni=Ie(Xn),Qr=te({},Xn,{view:0,detail:0}),bp=Ie(Qr),ql,eo,dr,ul=te({},Qr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Si,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==dr&&(dr&&e.type==="mousemove"?(ql=e.screenX-dr.screenX,eo=e.screenY-dr.screenY):eo=ql=0,dr=e),ql)},movementY:function(e){return"movementY"in e?e.movementY:eo}}),tu=Ie(ul),Fp=te({},ul,{dataTransfer:0}),Op=Ie(Fp),Up=te({},Qr,{relatedTarget:0}),to=Ie(Up),Ap=te({},Xn,{animationName:0,elapsedTime:0,pseudoElement:0}),Ip=Ie(Ap),Mp=te({},Xn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),jp=Ie(Mp),zp=te({},Xn,{data:0}),nu=Ie(zp),Vp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Bp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Hp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Wp(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Hp[e])?!!t[e]:!1}function Si(){return Wp}var Kp=te({},Qr,{key:function(e){if(e.key){var t=Vp[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ta(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Bp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Si,charCode:function(e){return e.type==="keypress"?Ta(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ta(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Qp=Ie(Kp),Yp=te({},ul,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ru=Ie(Yp),Jp=te({},Qr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Si}),Gp=Ie(Jp),Xp=te({},Xn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Zp=Ie(Xp),qp=te({},ul,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),eh=Ie(qp),th=[9,13,27,32],Ei=wt&&"CompositionEvent"in window,Sr=null;wt&&"documentMode"in document&&(Sr=document.documentMode);var nh=wt&&"TextEvent"in window&&!Sr,Cc=wt&&(!Ei||Sr&&8<Sr&&11>=Sr),au=" ",lu=!1;function xc(e,t){switch(e){case"keyup":return th.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Pc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Pn=!1;function rh(e,t){switch(e){case"compositionend":return Pc(t);case"keypress":return t.which!==32?null:(lu=!0,au);case"textInput":return e=t.data,e===au&&lu?null:e;default:return null}}function ah(e,t){if(Pn)return e==="compositionend"||!Ei&&xc(e,t)?(e=Rc(),$a=_i=Lt=null,Pn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Cc&&t.locale!=="ko"?null:t.data;default:return null}}var lh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ou(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!lh[e.type]:t==="textarea"}function $c(e,t,n,r){oc(r),t=Wa(t,"onChange"),0<t.length&&(n=new Ni("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Er=null,Or=null;function oh(e){jc(e,0)}function cl(e){var t=Dn(e);if(qu(t))return e}function ih(e,t){if(e==="change")return t}var Tc=!1;wt&&(wt?(ya="oninput"in document,ya||(no=document.createElement("div"),no.setAttribute("oninput","return;"),ya=typeof no.oninput=="function"),va=ya):va=!1,Tc=va&&(!document.documentMode||9<document.documentMode));var va,ya,no;function iu(){Er&&(Er.detachEvent("onpropertychange",Dc),Or=Er=null)}function Dc(e){if(e.propertyName==="value"&&cl(Or)){var t=[];$c(t,Or,e,mi(e)),cc(oh,t)}}function sh(e,t,n){e==="focusin"?(iu(),Er=t,Or=n,Er.attachEvent("onpropertychange",Dc)):e==="focusout"&&iu()}function uh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return cl(Or)}function ch(e,t){if(e==="click")return cl(t)}function dh(e,t){if(e==="input"||e==="change")return cl(t)}function fh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var tt=typeof Object.is=="function"?Object.is:fh;function Ur(e,t){if(tt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!yo.call(t,a)||!tt(e[a],t[a]))return!1}return!0}function su(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function uu(e,t){var n=su(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=su(n)}}function Lc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Lc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function bc(){for(var e=window,t=Ia();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ia(e.document)}return t}function ki(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function ph(e){var t=bc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Lc(n.ownerDocument.documentElement,n)){if(r!==null&&ki(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,l=Math.min(r.start,a);r=r.end===void 0?l:Math.min(r.end,a),!e.extend&&l>r&&(a=r,r=l,l=a),a=uu(n,l);var o=uu(n,r);a&&o&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),l>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var hh=wt&&"documentMode"in document&&11>=document.documentMode,$n=null,Uo=null,kr=null,Ao=!1;function cu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ao||$n==null||$n!==Ia(r)||(r=$n,"selectionStart"in r&&ki(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),kr&&Ur(kr,r)||(kr=r,r=Wa(Uo,"onSelect"),0<r.length&&(t=new Ni("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=$n)))}function ga(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Tn={animationend:ga("Animation","AnimationEnd"),animationiteration:ga("Animation","AnimationIteration"),animationstart:ga("Animation","AnimationStart"),transitionend:ga("Transition","TransitionEnd")},ro={},Fc={};wt&&(Fc=document.createElement("div").style,"AnimationEvent"in window||(delete Tn.animationend.animation,delete Tn.animationiteration.animation,delete Tn.animationstart.animation),"TransitionEvent"in window||delete Tn.transitionend.transition);function dl(e){if(ro[e])return ro[e];if(!Tn[e])return e;var t=Tn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Fc)return ro[e]=t[n];return e}var Oc=dl("animationend"),Uc=dl("animationiteration"),Ac=dl("animationstart"),Ic=dl("transitionend"),Mc=new Map,du="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ht(e,t){Mc.set(e,t),vn(t,[e])}for(wa=0;wa<du.length;wa++)_a=du[wa],fu=_a.toLowerCase(),pu=_a[0].toUpperCase()+_a.slice(1),Ht(fu,"on"+pu);var _a,fu,pu,wa;Ht(Oc,"onAnimationEnd");Ht(Uc,"onAnimationIteration");Ht(Ac,"onAnimationStart");Ht("dblclick","onDoubleClick");Ht("focusin","onFocus");Ht("focusout","onBlur");Ht(Ic,"onTransitionEnd");Hn("onMouseEnter",["mouseout","mouseover"]);Hn("onMouseLeave",["mouseout","mouseover"]);Hn("onPointerEnter",["pointerout","pointerover"]);Hn("onPointerLeave",["pointerout","pointerover"]);vn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));vn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));vn("onBeforeInput",["compositionend","keypress","textInput","paste"]);vn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));vn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));vn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var wr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mh=new Set("cancel close invalid load scroll toggle".split(" ").concat(wr));function hu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,mp(r,t,void 0,e),e.currentTarget=null}function jc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var l=void 0;if(t)for(var o=r.length-1;0<=o;o--){var i=r[o],s=i.instance,u=i.currentTarget;if(i=i.listener,s!==l&&a.isPropagationStopped())break e;hu(a,i,u),l=s}else for(o=0;o<r.length;o++){if(i=r[o],s=i.instance,u=i.currentTarget,i=i.listener,s!==l&&a.isPropagationStopped())break e;hu(a,i,u),l=s}}}if(ja)throw e=Lo,ja=!1,Lo=null,e}function Q(e,t){var n=t[Vo];n===void 0&&(n=t[Vo]=new Set);var r=e+"__bubble";n.has(r)||(zc(t,e,2,!1),n.add(r))}function ao(e,t,n){var r=0;t&&(r|=4),zc(n,e,r,t)}var Na="_reactListening"+Math.random().toString(36).slice(2);function Ar(e){if(!e[Na]){e[Na]=!0,Yu.forEach(function(n){n!=="selectionchange"&&(mh.has(n)||ao(n,!1,e),ao(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Na]||(t[Na]=!0,ao("selectionchange",!1,t))}}function zc(e,t,n,r){switch(kc(t)){case 1:var a=Dp;break;case 4:a=Lp;break;default:a=wi}n=a.bind(null,t,n,e),a=void 0,!Do||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),r?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function lo(e,t,n,r,a){var l=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var i=r.stateNode.containerInfo;if(i===a||i.nodeType===8&&i.parentNode===a)break;if(o===4)for(o=r.return;o!==null;){var s=o.tag;if((s===3||s===4)&&(s=o.stateNode.containerInfo,s===a||s.nodeType===8&&s.parentNode===a))return;o=o.return}for(;i!==null;){if(o=ln(i),o===null)return;if(s=o.tag,s===5||s===6){r=l=o;continue e}i=i.parentNode}}r=r.return}cc(function(){var u=l,h=mi(n),m=[];e:{var v=Mc.get(e);if(v!==void 0){var N=Ni,S=e;switch(e){case"keypress":if(Ta(n)===0)break e;case"keydown":case"keyup":N=Qp;break;case"focusin":S="focus",N=to;break;case"focusout":S="blur",N=to;break;case"beforeblur":case"afterblur":N=to;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":N=tu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":N=Op;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":N=Gp;break;case Oc:case Uc:case Ac:N=Ip;break;case Ic:N=Zp;break;case"scroll":N=bp;break;case"wheel":N=eh;break;case"copy":case"cut":case"paste":N=jp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":N=ru}var w=(t&4)!==0,E=!w&&e==="scroll",d=w?v!==null?v+"Capture":null:v;w=[];for(var c=u,f;c!==null;){f=c;var y=f.stateNode;if(f.tag===5&&y!==null&&(f=y,d!==null&&(y=Dr(c,d),y!=null&&w.push(Ir(c,y,f)))),E)break;c=c.return}0<w.length&&(v=new N(v,S,null,n,h),m.push({event:v,listeners:w}))}}if((t&7)===0){e:{if(v=e==="mouseover"||e==="pointerover",N=e==="mouseout"||e==="pointerout",v&&n!==$o&&(S=n.relatedTarget||n.fromElement)&&(ln(S)||S[_t]))break e;if((N||v)&&(v=h.window===h?h:(v=h.ownerDocument)?v.defaultView||v.parentWindow:window,N?(S=n.relatedTarget||n.toElement,N=u,S=S?ln(S):null,S!==null&&(E=yn(S),S!==E||S.tag!==5&&S.tag!==6)&&(S=null)):(N=null,S=u),N!==S)){if(w=tu,y="onMouseLeave",d="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(w=ru,y="onPointerLeave",d="onPointerEnter",c="pointer"),E=N==null?v:Dn(N),f=S==null?v:Dn(S),v=new w(y,c+"leave",N,n,h),v.target=E,v.relatedTarget=f,y=null,ln(h)===u&&(w=new w(d,c+"enter",S,n,h),w.target=f,w.relatedTarget=E,y=w),E=y,N&&S)t:{for(w=N,d=S,c=0,f=w;f;f=Rn(f))c++;for(f=0,y=d;y;y=Rn(y))f++;for(;0<c-f;)w=Rn(w),c--;for(;0<f-c;)d=Rn(d),f--;for(;c--;){if(w===d||d!==null&&w===d.alternate)break t;w=Rn(w),d=Rn(d)}w=null}else w=null;N!==null&&mu(m,v,N,w,!1),S!==null&&E!==null&&mu(m,E,S,w,!0)}}e:{if(v=u?Dn(u):window,N=v.nodeName&&v.nodeName.toLowerCase(),N==="select"||N==="input"&&v.type==="file")var C=ih;else if(ou(v))if(Tc)C=dh;else{C=uh;var x=sh}else(N=v.nodeName)&&N.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(C=ch);if(C&&(C=C(e,u))){$c(m,C,n,h);break e}x&&x(e,v,u),e==="focusout"&&(x=v._wrapperState)&&x.controlled&&v.type==="number"&&ko(v,"number",v.value)}switch(x=u?Dn(u):window,e){case"focusin":(ou(x)||x.contentEditable==="true")&&($n=x,Uo=u,kr=null);break;case"focusout":kr=Uo=$n=null;break;case"mousedown":Ao=!0;break;case"contextmenu":case"mouseup":case"dragend":Ao=!1,cu(m,n,h);break;case"selectionchange":if(hh)break;case"keydown":case"keyup":cu(m,n,h)}var $;if(Ei)e:{switch(e){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else Pn?xc(e,n)&&(b="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(b="onCompositionStart");b&&(Cc&&n.locale!=="ko"&&(Pn||b!=="onCompositionStart"?b==="onCompositionEnd"&&Pn&&($=Rc()):(Lt=h,_i="value"in Lt?Lt.value:Lt.textContent,Pn=!0)),x=Wa(u,b),0<x.length&&(b=new nu(b,e,null,n,h),m.push({event:b,listeners:x}),$?b.data=$:($=Pc(n),$!==null&&(b.data=$)))),($=nh?rh(e,n):ah(e,n))&&(u=Wa(u,"onBeforeInput"),0<u.length&&(h=new nu("onBeforeInput","beforeinput",null,n,h),m.push({event:h,listeners:u}),h.data=$))}jc(m,t)})}function Ir(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Wa(e,t){for(var n=t+"Capture",r=[];e!==null;){var a=e,l=a.stateNode;a.tag===5&&l!==null&&(a=l,l=Dr(e,n),l!=null&&r.unshift(Ir(e,l,a)),l=Dr(e,t),l!=null&&r.push(Ir(e,l,a))),e=e.return}return r}function Rn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function mu(e,t,n,r,a){for(var l=t._reactName,o=[];n!==null&&n!==r;){var i=n,s=i.alternate,u=i.stateNode;if(s!==null&&s===r)break;i.tag===5&&u!==null&&(i=u,a?(s=Dr(n,l),s!=null&&o.unshift(Ir(n,s,i))):a||(s=Dr(n,l),s!=null&&o.push(Ir(n,s,i)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var vh=/\r\n?/g,yh=/\u0000|\uFFFD/g;function vu(e){return(typeof e=="string"?e:""+e).replace(vh,`
`).replace(yh,"")}function Sa(e,t,n){if(t=vu(t),vu(e)!==t&&n)throw Error(k(425))}function Ka(){}var Io=null,Mo=null;function jo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var zo=typeof setTimeout=="function"?setTimeout:void 0,gh=typeof clearTimeout=="function"?clearTimeout:void 0,yu=typeof Promise=="function"?Promise:void 0,wh=typeof queueMicrotask=="function"?queueMicrotask:typeof yu<"u"?function(e){return yu.resolve(null).then(e).catch(_h)}:zo;function _h(e){setTimeout(function(){throw e})}function oo(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(r===0){e.removeChild(a),Fr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=a}while(n);Fr(t)}function At(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function gu(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Zn=Math.random().toString(36).slice(2),ut="__reactFiber$"+Zn,Mr="__reactProps$"+Zn,_t="__reactContainer$"+Zn,Vo="__reactEvents$"+Zn,Nh="__reactListeners$"+Zn,Sh="__reactHandles$"+Zn;function ln(e){var t=e[ut];if(t)return t;for(var n=e.parentNode;n;){if(t=n[_t]||n[ut]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=gu(e);e!==null;){if(n=e[ut])return n;e=gu(e)}return t}e=n,n=e.parentNode}return null}function Yr(e){return e=e[ut]||e[_t],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Dn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(k(33))}function fl(e){return e[Mr]||null}var Bo=[],Ln=-1;function Wt(e){return{current:e}}function Y(e){0>Ln||(e.current=Bo[Ln],Bo[Ln]=null,Ln--)}function K(e,t){Ln++,Bo[Ln]=e.current,e.current=t}var Bt={},Se=Wt(Bt),Te=Wt(!1),dn=Bt;function Wn(e,t){var n=e.type.contextTypes;if(!n)return Bt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a={},l;for(l in n)a[l]=t[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function De(e){return e=e.childContextTypes,e!=null}function Qa(){Y(Te),Y(Se)}function wu(e,t,n){if(Se.current!==Bt)throw Error(k(168));K(Se,t),K(Te,n)}function Vc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var a in r)if(!(a in t))throw Error(k(108,sp(e)||"Unknown",a));return te({},n,r)}function Ya(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Bt,dn=Se.current,K(Se,e),K(Te,Te.current),!0}function _u(e,t,n){var r=e.stateNode;if(!r)throw Error(k(169));n?(e=Vc(e,t,dn),r.__reactInternalMemoizedMergedChildContext=e,Y(Te),Y(Se),K(Se,e)):Y(Te),K(Te,n)}var mt=null,pl=!1,io=!1;function Bc(e){mt===null?mt=[e]:mt.push(e)}function Eh(e){pl=!0,Bc(e)}function Kt(){if(!io&&mt!==null){io=!0;var e=0,t=B;try{var n=mt;for(B=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}mt=null,pl=!1}catch(a){throw mt!==null&&(mt=mt.slice(e+1)),hc(vi,Kt),a}finally{B=t,io=!1}}return null}var bn=[],Fn=0,Ja=null,Ga=0,ze=[],Ve=0,fn=null,vt=1,yt="";function rn(e,t){bn[Fn++]=Ga,bn[Fn++]=Ja,Ja=e,Ga=t}function Hc(e,t,n){ze[Ve++]=vt,ze[Ve++]=yt,ze[Ve++]=fn,fn=e;var r=vt;e=yt;var a=32-qe(r)-1;r&=~(1<<a),n+=1;var l=32-qe(t)+a;if(30<l){var o=a-a%5;l=(r&(1<<o)-1).toString(32),r>>=o,a-=o,vt=1<<32-qe(t)+a|n<<a|r,yt=l+e}else vt=1<<l|n<<a|r,yt=e}function Ri(e){e.return!==null&&(rn(e,1),Hc(e,1,0))}function Ci(e){for(;e===Ja;)Ja=bn[--Fn],bn[Fn]=null,Ga=bn[--Fn],bn[Fn]=null;for(;e===fn;)fn=ze[--Ve],ze[Ve]=null,yt=ze[--Ve],ze[Ve]=null,vt=ze[--Ve],ze[Ve]=null}var Ue=null,Oe=null,X=!1,Ze=null;function Wc(e,t){var n=Be(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Nu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ue=e,Oe=At(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ue=e,Oe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=fn!==null?{id:vt,overflow:yt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Be(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ue=e,Oe=null,!0):!1;default:return!1}}function Ho(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Wo(e){if(X){var t=Oe;if(t){var n=t;if(!Nu(e,t)){if(Ho(e))throw Error(k(418));t=At(n.nextSibling);var r=Ue;t&&Nu(e,t)?Wc(r,n):(e.flags=e.flags&-4097|2,X=!1,Ue=e)}}else{if(Ho(e))throw Error(k(418));e.flags=e.flags&-4097|2,X=!1,Ue=e}}}function Su(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ue=e}function Ea(e){if(e!==Ue)return!1;if(!X)return Su(e),X=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!jo(e.type,e.memoizedProps)),t&&(t=Oe)){if(Ho(e))throw Kc(),Error(k(418));for(;t;)Wc(e,t),t=At(t.nextSibling)}if(Su(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Oe=At(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Oe=null}}else Oe=Ue?At(e.stateNode.nextSibling):null;return!0}function Kc(){for(var e=Oe;e;)e=At(e.nextSibling)}function Kn(){Oe=Ue=null,X=!1}function xi(e){Ze===null?Ze=[e]:Ze.push(e)}var kh=Et.ReactCurrentBatchConfig;function fr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(k(309));var r=n.stateNode}if(!r)throw Error(k(147,e));var a=r,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(o){var i=a.refs;o===null?delete i[l]:i[l]=o},t._stringRef=l,t)}if(typeof e!="string")throw Error(k(284));if(!n._owner)throw Error(k(290,e))}return e}function ka(e,t){throw e=Object.prototype.toString.call(t),Error(k(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Eu(e){var t=e._init;return t(e._payload)}function Qc(e){function t(d,c){if(e){var f=d.deletions;f===null?(d.deletions=[c],d.flags|=16):f.push(c)}}function n(d,c){if(!e)return null;for(;c!==null;)t(d,c),c=c.sibling;return null}function r(d,c){for(d=new Map;c!==null;)c.key!==null?d.set(c.key,c):d.set(c.index,c),c=c.sibling;return d}function a(d,c){return d=zt(d,c),d.index=0,d.sibling=null,d}function l(d,c,f){return d.index=f,e?(f=d.alternate,f!==null?(f=f.index,f<c?(d.flags|=2,c):f):(d.flags|=2,c)):(d.flags|=1048576,c)}function o(d){return e&&d.alternate===null&&(d.flags|=2),d}function i(d,c,f,y){return c===null||c.tag!==6?(c=mo(f,d.mode,y),c.return=d,c):(c=a(c,f),c.return=d,c)}function s(d,c,f,y){var C=f.type;return C===xn?h(d,c,f.props.children,y,f.key):c!==null&&(c.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===Pt&&Eu(C)===c.type)?(y=a(c,f.props),y.ref=fr(d,c,f),y.return=d,y):(y=Aa(f.type,f.key,f.props,null,d.mode,y),y.ref=fr(d,c,f),y.return=d,y)}function u(d,c,f,y){return c===null||c.tag!==4||c.stateNode.containerInfo!==f.containerInfo||c.stateNode.implementation!==f.implementation?(c=vo(f,d.mode,y),c.return=d,c):(c=a(c,f.children||[]),c.return=d,c)}function h(d,c,f,y,C){return c===null||c.tag!==7?(c=cn(f,d.mode,y,C),c.return=d,c):(c=a(c,f),c.return=d,c)}function m(d,c,f){if(typeof c=="string"&&c!==""||typeof c=="number")return c=mo(""+c,d.mode,f),c.return=d,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case ua:return f=Aa(c.type,c.key,c.props,null,d.mode,f),f.ref=fr(d,null,c),f.return=d,f;case Cn:return c=vo(c,d.mode,f),c.return=d,c;case Pt:var y=c._init;return m(d,y(c._payload),f)}if(yr(c)||sr(c))return c=cn(c,d.mode,f,null),c.return=d,c;ka(d,c)}return null}function v(d,c,f,y){var C=c!==null?c.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return C!==null?null:i(d,c,""+f,y);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case ua:return f.key===C?s(d,c,f,y):null;case Cn:return f.key===C?u(d,c,f,y):null;case Pt:return C=f._init,v(d,c,C(f._payload),y)}if(yr(f)||sr(f))return C!==null?null:h(d,c,f,y,null);ka(d,f)}return null}function N(d,c,f,y,C){if(typeof y=="string"&&y!==""||typeof y=="number")return d=d.get(f)||null,i(c,d,""+y,C);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case ua:return d=d.get(y.key===null?f:y.key)||null,s(c,d,y,C);case Cn:return d=d.get(y.key===null?f:y.key)||null,u(c,d,y,C);case Pt:var x=y._init;return N(d,c,f,x(y._payload),C)}if(yr(y)||sr(y))return d=d.get(f)||null,h(c,d,y,C,null);ka(c,y)}return null}function S(d,c,f,y){for(var C=null,x=null,$=c,b=c=0,I=null;$!==null&&b<f.length;b++){$.index>b?(I=$,$=null):I=$.sibling;var F=v(d,$,f[b],y);if(F===null){$===null&&($=I);break}e&&$&&F.alternate===null&&t(d,$),c=l(F,c,b),x===null?C=F:x.sibling=F,x=F,$=I}if(b===f.length)return n(d,$),X&&rn(d,b),C;if($===null){for(;b<f.length;b++)$=m(d,f[b],y),$!==null&&(c=l($,c,b),x===null?C=$:x.sibling=$,x=$);return X&&rn(d,b),C}for($=r(d,$);b<f.length;b++)I=N($,d,b,f[b],y),I!==null&&(e&&I.alternate!==null&&$.delete(I.key===null?b:I.key),c=l(I,c,b),x===null?C=I:x.sibling=I,x=I);return e&&$.forEach(function(O){return t(d,O)}),X&&rn(d,b),C}function w(d,c,f,y){var C=sr(f);if(typeof C!="function")throw Error(k(150));if(f=C.call(f),f==null)throw Error(k(151));for(var x=C=null,$=c,b=c=0,I=null,F=f.next();$!==null&&!F.done;b++,F=f.next()){$.index>b?(I=$,$=null):I=$.sibling;var O=v(d,$,F.value,y);if(O===null){$===null&&($=I);break}e&&$&&O.alternate===null&&t(d,$),c=l(O,c,b),x===null?C=O:x.sibling=O,x=O,$=I}if(F.done)return n(d,$),X&&rn(d,b),C;if($===null){for(;!F.done;b++,F=f.next())F=m(d,F.value,y),F!==null&&(c=l(F,c,b),x===null?C=F:x.sibling=F,x=F);return X&&rn(d,b),C}for($=r(d,$);!F.done;b++,F=f.next())F=N($,d,b,F.value,y),F!==null&&(e&&F.alternate!==null&&$.delete(F.key===null?b:F.key),c=l(F,c,b),x===null?C=F:x.sibling=F,x=F);return e&&$.forEach(function(ne){return t(d,ne)}),X&&rn(d,b),C}function E(d,c,f,y){if(typeof f=="object"&&f!==null&&f.type===xn&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case ua:e:{for(var C=f.key,x=c;x!==null;){if(x.key===C){if(C=f.type,C===xn){if(x.tag===7){n(d,x.sibling),c=a(x,f.props.children),c.return=d,d=c;break e}}else if(x.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===Pt&&Eu(C)===x.type){n(d,x.sibling),c=a(x,f.props),c.ref=fr(d,x,f),c.return=d,d=c;break e}n(d,x);break}else t(d,x);x=x.sibling}f.type===xn?(c=cn(f.props.children,d.mode,y,f.key),c.return=d,d=c):(y=Aa(f.type,f.key,f.props,null,d.mode,y),y.ref=fr(d,c,f),y.return=d,d=y)}return o(d);case Cn:e:{for(x=f.key;c!==null;){if(c.key===x)if(c.tag===4&&c.stateNode.containerInfo===f.containerInfo&&c.stateNode.implementation===f.implementation){n(d,c.sibling),c=a(c,f.children||[]),c.return=d,d=c;break e}else{n(d,c);break}else t(d,c);c=c.sibling}c=vo(f,d.mode,y),c.return=d,d=c}return o(d);case Pt:return x=f._init,E(d,c,x(f._payload),y)}if(yr(f))return S(d,c,f,y);if(sr(f))return w(d,c,f,y);ka(d,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,c!==null&&c.tag===6?(n(d,c.sibling),c=a(c,f),c.return=d,d=c):(n(d,c),c=mo(f,d.mode,y),c.return=d,d=c),o(d)):n(d,c)}return E}var Qn=Qc(!0),Yc=Qc(!1),Xa=Wt(null),Za=null,On=null,Pi=null;function $i(){Pi=On=Za=null}function Ti(e){var t=Xa.current;Y(Xa),e._currentValue=t}function Ko(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Vn(e,t){Za=e,Pi=On=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&($e=!0),e.firstContext=null)}function We(e){var t=e._currentValue;if(Pi!==e)if(e={context:e,memoizedValue:t,next:null},On===null){if(Za===null)throw Error(k(308));On=e,Za.dependencies={lanes:0,firstContext:e}}else On=On.next=e;return t}var on=null;function Di(e){on===null?on=[e]:on.push(e)}function Jc(e,t,n,r){var a=t.interleaved;return a===null?(n.next=n,Di(t)):(n.next=a.next,a.next=n),t.interleaved=n,Nt(e,r)}function Nt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var $t=!1;function Li(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Gc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function gt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function It(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(j&2)!==0){var a=r.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),r.pending=t,Nt(e,n)}return a=r.interleaved,a===null?(t.next=t,Di(r)):(t.next=a.next,a.next=t),r.interleaved=t,Nt(e,n)}function Da(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,yi(e,n)}}function ku(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var a=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};l===null?a=l=o:l=l.next=o,n=n.next}while(n!==null);l===null?a=l=t:l=l.next=t}else a=l=t;n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function qa(e,t,n,r){var a=e.updateQueue;$t=!1;var l=a.firstBaseUpdate,o=a.lastBaseUpdate,i=a.shared.pending;if(i!==null){a.shared.pending=null;var s=i,u=s.next;s.next=null,o===null?l=u:o.next=u,o=s;var h=e.alternate;h!==null&&(h=h.updateQueue,i=h.lastBaseUpdate,i!==o&&(i===null?h.firstBaseUpdate=u:i.next=u,h.lastBaseUpdate=s))}if(l!==null){var m=a.baseState;o=0,h=u=s=null,i=l;do{var v=i.lane,N=i.eventTime;if((r&v)===v){h!==null&&(h=h.next={eventTime:N,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null});e:{var S=e,w=i;switch(v=t,N=n,w.tag){case 1:if(S=w.payload,typeof S=="function"){m=S.call(N,m,v);break e}m=S;break e;case 3:S.flags=S.flags&-65537|128;case 0:if(S=w.payload,v=typeof S=="function"?S.call(N,m,v):S,v==null)break e;m=te({},m,v);break e;case 2:$t=!0}}i.callback!==null&&i.lane!==0&&(e.flags|=64,v=a.effects,v===null?a.effects=[i]:v.push(i))}else N={eventTime:N,lane:v,tag:i.tag,payload:i.payload,callback:i.callback,next:null},h===null?(u=h=N,s=m):h=h.next=N,o|=v;if(i=i.next,i===null){if(i=a.shared.pending,i===null)break;v=i,i=v.next,v.next=null,a.lastBaseUpdate=v,a.shared.pending=null}}while(!0);if(h===null&&(s=m),a.baseState=s,a.firstBaseUpdate=u,a.lastBaseUpdate=h,t=a.shared.interleaved,t!==null){a=t;do o|=a.lane,a=a.next;while(a!==t)}else l===null&&(a.shared.lanes=0);hn|=o,e.lanes=o,e.memoizedState=m}}function Ru(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(a!==null){if(r.callback=null,r=n,typeof a!="function")throw Error(k(191,a));a.call(r)}}}var Jr={},dt=Wt(Jr),jr=Wt(Jr),zr=Wt(Jr);function sn(e){if(e===Jr)throw Error(k(174));return e}function bi(e,t){switch(K(zr,t),K(jr,e),K(dt,Jr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Co(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Co(t,e)}Y(dt),K(dt,t)}function Yn(){Y(dt),Y(jr),Y(zr)}function Xc(e){sn(zr.current);var t=sn(dt.current),n=Co(t,e.type);t!==n&&(K(jr,e),K(dt,n))}function Fi(e){jr.current===e&&(Y(dt),Y(jr))}var q=Wt(0);function el(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var so=[];function Oi(){for(var e=0;e<so.length;e++)so[e]._workInProgressVersionPrimary=null;so.length=0}var La=Et.ReactCurrentDispatcher,uo=Et.ReactCurrentBatchConfig,pn=0,ee=null,ie=null,fe=null,tl=!1,Rr=!1,Vr=0,Rh=0;function we(){throw Error(k(321))}function Ui(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!tt(e[n],t[n]))return!1;return!0}function Ai(e,t,n,r,a,l){if(pn=l,ee=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,La.current=e===null||e.memoizedState===null?$h:Th,e=n(r,a),Rr){l=0;do{if(Rr=!1,Vr=0,25<=l)throw Error(k(301));l+=1,fe=ie=null,t.updateQueue=null,La.current=Dh,e=n(r,a)}while(Rr)}if(La.current=nl,t=ie!==null&&ie.next!==null,pn=0,fe=ie=ee=null,tl=!1,t)throw Error(k(300));return e}function Ii(){var e=Vr!==0;return Vr=0,e}function st(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return fe===null?ee.memoizedState=fe=e:fe=fe.next=e,fe}function Ke(){if(ie===null){var e=ee.alternate;e=e!==null?e.memoizedState:null}else e=ie.next;var t=fe===null?ee.memoizedState:fe.next;if(t!==null)fe=t,ie=e;else{if(e===null)throw Error(k(310));ie=e,e={memoizedState:ie.memoizedState,baseState:ie.baseState,baseQueue:ie.baseQueue,queue:ie.queue,next:null},fe===null?ee.memoizedState=fe=e:fe=fe.next=e}return fe}function Br(e,t){return typeof t=="function"?t(e):t}function co(e){var t=Ke(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var r=ie,a=r.baseQueue,l=n.pending;if(l!==null){if(a!==null){var o=a.next;a.next=l.next,l.next=o}r.baseQueue=a=l,n.pending=null}if(a!==null){l=a.next,r=r.baseState;var i=o=null,s=null,u=l;do{var h=u.lane;if((pn&h)===h)s!==null&&(s=s.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var m={lane:h,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};s===null?(i=s=m,o=r):s=s.next=m,ee.lanes|=h,hn|=h}u=u.next}while(u!==null&&u!==l);s===null?o=r:s.next=i,tt(r,t.memoizedState)||($e=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){a=e;do l=a.lane,ee.lanes|=l,hn|=l,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function fo(e){var t=Ke(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,l=t.memoizedState;if(a!==null){n.pending=null;var o=a=a.next;do l=e(l,o.action),o=o.next;while(o!==a);tt(l,t.memoizedState)||($e=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),n.lastRenderedState=l}return[l,r]}function Zc(){}function qc(e,t){var n=ee,r=Ke(),a=t(),l=!tt(r.memoizedState,a);if(l&&(r.memoizedState=a,$e=!0),r=r.queue,Mi(nd.bind(null,n,r,e),[e]),r.getSnapshot!==t||l||fe!==null&&fe.memoizedState.tag&1){if(n.flags|=2048,Hr(9,td.bind(null,n,r,a,t),void 0,null),pe===null)throw Error(k(349));(pn&30)!==0||ed(n,t,a)}return a}function ed(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ee.updateQueue,t===null?(t={lastEffect:null,stores:null},ee.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function td(e,t,n,r){t.value=n,t.getSnapshot=r,rd(t)&&ad(e)}function nd(e,t,n){return n(function(){rd(t)&&ad(e)})}function rd(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!tt(e,n)}catch{return!0}}function ad(e){var t=Nt(e,1);t!==null&&et(t,e,1,-1)}function Cu(e){var t=st();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Br,lastRenderedState:e},t.queue=e,e=e.dispatch=Ph.bind(null,ee,e),[t.memoizedState,e]}function Hr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ee.updateQueue,t===null?(t={lastEffect:null,stores:null},ee.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function ld(){return Ke().memoizedState}function ba(e,t,n,r){var a=st();ee.flags|=e,a.memoizedState=Hr(1|t,n,void 0,r===void 0?null:r)}function hl(e,t,n,r){var a=Ke();r=r===void 0?null:r;var l=void 0;if(ie!==null){var o=ie.memoizedState;if(l=o.destroy,r!==null&&Ui(r,o.deps)){a.memoizedState=Hr(t,n,l,r);return}}ee.flags|=e,a.memoizedState=Hr(1|t,n,l,r)}function xu(e,t){return ba(8390656,8,e,t)}function Mi(e,t){return hl(2048,8,e,t)}function od(e,t){return hl(4,2,e,t)}function id(e,t){return hl(4,4,e,t)}function sd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ud(e,t,n){return n=n!=null?n.concat([e]):null,hl(4,4,sd.bind(null,t,e),n)}function ji(){}function cd(e,t){var n=Ke();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ui(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function dd(e,t){var n=Ke();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ui(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function fd(e,t,n){return(pn&21)===0?(e.baseState&&(e.baseState=!1,$e=!0),e.memoizedState=n):(tt(n,t)||(n=yc(),ee.lanes|=n,hn|=n,e.baseState=!0),t)}function Ch(e,t){var n=B;B=n!==0&&4>n?n:4,e(!0);var r=uo.transition;uo.transition={};try{e(!1),t()}finally{B=n,uo.transition=r}}function pd(){return Ke().memoizedState}function xh(e,t,n){var r=jt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},hd(e))md(t,n);else if(n=Jc(e,t,n,r),n!==null){var a=Ce();et(n,e,r,a),vd(n,t,r)}}function Ph(e,t,n){var r=jt(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(hd(e))md(t,a);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var o=t.lastRenderedState,i=l(o,n);if(a.hasEagerState=!0,a.eagerState=i,tt(i,o)){var s=t.interleaved;s===null?(a.next=a,Di(t)):(a.next=s.next,s.next=a),t.interleaved=a;return}}catch{}finally{}n=Jc(e,t,a,r),n!==null&&(a=Ce(),et(n,e,r,a),vd(n,t,r))}}function hd(e){var t=e.alternate;return e===ee||t!==null&&t===ee}function md(e,t){Rr=tl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function vd(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,yi(e,n)}}var nl={readContext:We,useCallback:we,useContext:we,useEffect:we,useImperativeHandle:we,useInsertionEffect:we,useLayoutEffect:we,useMemo:we,useReducer:we,useRef:we,useState:we,useDebugValue:we,useDeferredValue:we,useTransition:we,useMutableSource:we,useSyncExternalStore:we,useId:we,unstable_isNewReconciler:!1},$h={readContext:We,useCallback:function(e,t){return st().memoizedState=[e,t===void 0?null:t],e},useContext:We,useEffect:xu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,ba(4194308,4,sd.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ba(4194308,4,e,t)},useInsertionEffect:function(e,t){return ba(4,2,e,t)},useMemo:function(e,t){var n=st();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=st();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=xh.bind(null,ee,e),[r.memoizedState,e]},useRef:function(e){var t=st();return e={current:e},t.memoizedState=e},useState:Cu,useDebugValue:ji,useDeferredValue:function(e){return st().memoizedState=e},useTransition:function(){var e=Cu(!1),t=e[0];return e=Ch.bind(null,e[1]),st().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ee,a=st();if(X){if(n===void 0)throw Error(k(407));n=n()}else{if(n=t(),pe===null)throw Error(k(349));(pn&30)!==0||ed(r,t,n)}a.memoizedState=n;var l={value:n,getSnapshot:t};return a.queue=l,xu(nd.bind(null,r,l,e),[e]),r.flags|=2048,Hr(9,td.bind(null,r,l,n,t),void 0,null),n},useId:function(){var e=st(),t=pe.identifierPrefix;if(X){var n=yt,r=vt;n=(r&~(1<<32-qe(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Vr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Rh++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Th={readContext:We,useCallback:cd,useContext:We,useEffect:Mi,useImperativeHandle:ud,useInsertionEffect:od,useLayoutEffect:id,useMemo:dd,useReducer:co,useRef:ld,useState:function(){return co(Br)},useDebugValue:ji,useDeferredValue:function(e){var t=Ke();return fd(t,ie.memoizedState,e)},useTransition:function(){var e=co(Br)[0],t=Ke().memoizedState;return[e,t]},useMutableSource:Zc,useSyncExternalStore:qc,useId:pd,unstable_isNewReconciler:!1},Dh={readContext:We,useCallback:cd,useContext:We,useEffect:Mi,useImperativeHandle:ud,useInsertionEffect:od,useLayoutEffect:id,useMemo:dd,useReducer:fo,useRef:ld,useState:function(){return fo(Br)},useDebugValue:ji,useDeferredValue:function(e){var t=Ke();return ie===null?t.memoizedState=e:fd(t,ie.memoizedState,e)},useTransition:function(){var e=fo(Br)[0],t=Ke().memoizedState;return[e,t]},useMutableSource:Zc,useSyncExternalStore:qc,useId:pd,unstable_isNewReconciler:!1};function Ge(e,t){if(e&&e.defaultProps){t=te({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Qo(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:te({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ml={isMounted:function(e){return(e=e._reactInternals)?yn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ce(),a=jt(e),l=gt(r,a);l.payload=t,n!=null&&(l.callback=n),t=It(e,l,a),t!==null&&(et(t,e,a,r),Da(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ce(),a=jt(e),l=gt(r,a);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=It(e,l,a),t!==null&&(et(t,e,a,r),Da(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ce(),r=jt(e),a=gt(n,r);a.tag=2,t!=null&&(a.callback=t),t=It(e,a,r),t!==null&&(et(t,e,r,n),Da(t,e,r))}};function Pu(e,t,n,r,a,l,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,o):t.prototype&&t.prototype.isPureReactComponent?!Ur(n,r)||!Ur(a,l):!0}function yd(e,t,n){var r=!1,a=Bt,l=t.contextType;return typeof l=="object"&&l!==null?l=We(l):(a=De(t)?dn:Se.current,r=t.contextTypes,l=(r=r!=null)?Wn(e,a):Bt),t=new t(n,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ml,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=l),t}function $u(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ml.enqueueReplaceState(t,t.state,null)}function Yo(e,t,n,r){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},Li(e);var l=t.contextType;typeof l=="object"&&l!==null?a.context=We(l):(l=De(t)?dn:Se.current,a.context=Wn(e,l)),a.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(Qo(e,t,l,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&ml.enqueueReplaceState(a,a.state,null),qa(e,n,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function Jn(e,t){try{var n="",r=t;do n+=ip(r),r=r.return;while(r);var a=n}catch(l){a=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:a,digest:null}}function po(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Jo(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Lh=typeof WeakMap=="function"?WeakMap:Map;function gd(e,t,n){n=gt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){al||(al=!0,li=r),Jo(e,t)},n}function wd(e,t,n){n=gt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var a=t.value;n.payload=function(){return r(a)},n.callback=function(){Jo(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(n.callback=function(){Jo(e,t),typeof r!="function"&&(Mt===null?Mt=new Set([this]):Mt.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Tu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Lh;var a=new Set;r.set(t,a)}else a=r.get(t),a===void 0&&(a=new Set,r.set(t,a));a.has(n)||(a.add(n),e=Kh.bind(null,e,t,n),t.then(e,e))}function Du(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Lu(e,t,n,r,a){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=gt(-1,1),t.tag=2,It(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=a,e)}var bh=Et.ReactCurrentOwner,$e=!1;function Re(e,t,n,r){t.child=e===null?Yc(t,null,n,r):Qn(t,e.child,n,r)}function bu(e,t,n,r,a){n=n.render;var l=t.ref;return Vn(t,a),r=Ai(e,t,n,r,l,a),n=Ii(),e!==null&&!$e?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,St(e,t,a)):(X&&n&&Ri(t),t.flags|=1,Re(e,t,r,a),t.child)}function Fu(e,t,n,r,a){if(e===null){var l=n.type;return typeof l=="function"&&!Yi(l)&&l.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=l,_d(e,t,l,r,a)):(e=Aa(n.type,null,r,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,(e.lanes&a)===0){var o=l.memoizedProps;if(n=n.compare,n=n!==null?n:Ur,n(o,r)&&e.ref===t.ref)return St(e,t,a)}return t.flags|=1,e=zt(l,r),e.ref=t.ref,e.return=t,t.child=e}function _d(e,t,n,r,a){if(e!==null){var l=e.memoizedProps;if(Ur(l,r)&&e.ref===t.ref)if($e=!1,t.pendingProps=r=l,(e.lanes&a)!==0)(e.flags&131072)!==0&&($e=!0);else return t.lanes=e.lanes,St(e,t,a)}return Go(e,t,n,r,a)}function Nd(e,t,n){var r=t.pendingProps,a=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},K(An,Fe),Fe|=n;else{if((n&1073741824)===0)return e=l!==null?l.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,K(An,Fe),Fe|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:n,K(An,Fe),Fe|=r}else l!==null?(r=l.baseLanes|n,t.memoizedState=null):r=n,K(An,Fe),Fe|=r;return Re(e,t,a,n),t.child}function Sd(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Go(e,t,n,r,a){var l=De(n)?dn:Se.current;return l=Wn(t,l),Vn(t,a),n=Ai(e,t,n,r,l,a),r=Ii(),e!==null&&!$e?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,St(e,t,a)):(X&&r&&Ri(t),t.flags|=1,Re(e,t,n,a),t.child)}function Ou(e,t,n,r,a){if(De(n)){var l=!0;Ya(t)}else l=!1;if(Vn(t,a),t.stateNode===null)Fa(e,t),yd(t,n,r),Yo(t,n,r,a),r=!0;else if(e===null){var o=t.stateNode,i=t.memoizedProps;o.props=i;var s=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=We(u):(u=De(n)?dn:Se.current,u=Wn(t,u));var h=n.getDerivedStateFromProps,m=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(i!==r||s!==u)&&$u(t,o,r,u),$t=!1;var v=t.memoizedState;o.state=v,qa(t,r,o,a),s=t.memoizedState,i!==r||v!==s||Te.current||$t?(typeof h=="function"&&(Qo(t,n,h,r),s=t.memoizedState),(i=$t||Pu(t,n,i,r,v,s,u))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),o.props=r,o.state=s,o.context=u,r=i):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,Gc(e,t),i=t.memoizedProps,u=t.type===t.elementType?i:Ge(t.type,i),o.props=u,m=t.pendingProps,v=o.context,s=n.contextType,typeof s=="object"&&s!==null?s=We(s):(s=De(n)?dn:Se.current,s=Wn(t,s));var N=n.getDerivedStateFromProps;(h=typeof N=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(i!==m||v!==s)&&$u(t,o,r,s),$t=!1,v=t.memoizedState,o.state=v,qa(t,r,o,a);var S=t.memoizedState;i!==m||v!==S||Te.current||$t?(typeof N=="function"&&(Qo(t,n,N,r),S=t.memoizedState),(u=$t||Pu(t,n,u,r,v,S,s)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,S,s),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,S,s)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=S),o.props=r,o.state=S,o.context=s,r=u):(typeof o.componentDidUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),r=!1)}return Xo(e,t,n,r,l,a)}function Xo(e,t,n,r,a,l){Sd(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return a&&_u(t,n,!1),St(e,t,l);r=t.stateNode,bh.current=t;var i=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=Qn(t,e.child,null,l),t.child=Qn(t,null,i,l)):Re(e,t,i,l),t.memoizedState=r.state,a&&_u(t,n,!0),t.child}function Ed(e){var t=e.stateNode;t.pendingContext?wu(e,t.pendingContext,t.pendingContext!==t.context):t.context&&wu(e,t.context,!1),bi(e,t.containerInfo)}function Uu(e,t,n,r,a){return Kn(),xi(a),t.flags|=256,Re(e,t,n,r),t.child}var Zo={dehydrated:null,treeContext:null,retryLane:0};function qo(e){return{baseLanes:e,cachePool:null,transitions:null}}function kd(e,t,n){var r=t.pendingProps,a=q.current,l=!1,o=(t.flags&128)!==0,i;if((i=o)||(i=e!==null&&e.memoizedState===null?!1:(a&2)!==0),i?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),K(q,a&1),e===null)return Wo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(o=r.children,e=r.fallback,l?(r=t.mode,l=t.child,o={mode:"hidden",children:o},(r&1)===0&&l!==null?(l.childLanes=0,l.pendingProps=o):l=gl(o,r,0,null),e=cn(e,r,n,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=qo(n),t.memoizedState=Zo,e):zi(t,o));if(a=e.memoizedState,a!==null&&(i=a.dehydrated,i!==null))return Fh(e,t,o,r,i,a,n);if(l){l=r.fallback,o=t.mode,a=e.child,i=a.sibling;var s={mode:"hidden",children:r.children};return(o&1)===0&&t.child!==a?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=zt(a,s),r.subtreeFlags=a.subtreeFlags&14680064),i!==null?l=zt(i,l):(l=cn(l,o,n,null),l.flags|=2),l.return=t,r.return=t,r.sibling=l,t.child=r,r=l,l=t.child,o=e.child.memoizedState,o=o===null?qo(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},l.memoizedState=o,l.childLanes=e.childLanes&~n,t.memoizedState=Zo,r}return l=e.child,e=l.sibling,r=zt(l,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function zi(e,t){return t=gl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ra(e,t,n,r){return r!==null&&xi(r),Qn(t,e.child,null,n),e=zi(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Fh(e,t,n,r,a,l,o){if(n)return t.flags&256?(t.flags&=-257,r=po(Error(k(422))),Ra(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=r.fallback,a=t.mode,r=gl({mode:"visible",children:r.children},a,0,null),l=cn(l,a,o,null),l.flags|=2,r.return=t,l.return=t,r.sibling=l,t.child=r,(t.mode&1)!==0&&Qn(t,e.child,null,o),t.child.memoizedState=qo(o),t.memoizedState=Zo,l);if((t.mode&1)===0)return Ra(e,t,o,null);if(a.data==="$!"){if(r=a.nextSibling&&a.nextSibling.dataset,r)var i=r.dgst;return r=i,l=Error(k(419)),r=po(l,r,void 0),Ra(e,t,o,r)}if(i=(o&e.childLanes)!==0,$e||i){if(r=pe,r!==null){switch(o&-o){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(r.suspendedLanes|o))!==0?0:a,a!==0&&a!==l.retryLane&&(l.retryLane=a,Nt(e,a),et(r,e,a,-1))}return Qi(),r=po(Error(k(421))),Ra(e,t,o,r)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Qh.bind(null,e),a._reactRetry=t,null):(e=l.treeContext,Oe=At(a.nextSibling),Ue=t,X=!0,Ze=null,e!==null&&(ze[Ve++]=vt,ze[Ve++]=yt,ze[Ve++]=fn,vt=e.id,yt=e.overflow,fn=t),t=zi(t,r.children),t.flags|=4096,t)}function Au(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ko(e.return,t,n)}function ho(e,t,n,r,a){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=a)}function Rd(e,t,n){var r=t.pendingProps,a=r.revealOrder,l=r.tail;if(Re(e,t,r.children,n),r=q.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Au(e,n,t);else if(e.tag===19)Au(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(K(q,r),(t.mode&1)===0)t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&el(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),ho(t,!1,a,n,l);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&el(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}ho(t,!0,n,null,l);break;case"together":ho(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Fa(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function St(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),hn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(k(153));if(t.child!==null){for(e=t.child,n=zt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=zt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Oh(e,t,n){switch(t.tag){case 3:Ed(t),Kn();break;case 5:Xc(t);break;case 1:De(t.type)&&Ya(t);break;case 4:bi(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,a=t.memoizedProps.value;K(Xa,r._currentValue),r._currentValue=a;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(K(q,q.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?kd(e,t,n):(K(q,q.current&1),e=St(e,t,n),e!==null?e.sibling:null);K(q,q.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Rd(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),K(q,q.current),r)break;return null;case 22:case 23:return t.lanes=0,Nd(e,t,n)}return St(e,t,n)}var Cd,ei,xd,Pd;Cd=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};ei=function(){};xd=function(e,t,n,r){var a=e.memoizedProps;if(a!==r){e=t.stateNode,sn(dt.current);var l=null;switch(n){case"input":a=So(e,a),r=So(e,r),l=[];break;case"select":a=te({},a,{value:void 0}),r=te({},r,{value:void 0}),l=[];break;case"textarea":a=Ro(e,a),r=Ro(e,r),l=[];break;default:typeof a.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Ka)}xo(n,r);var o;n=null;for(u in a)if(!r.hasOwnProperty(u)&&a.hasOwnProperty(u)&&a[u]!=null)if(u==="style"){var i=a[u];for(o in i)i.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&($r.hasOwnProperty(u)?l||(l=[]):(l=l||[]).push(u,null));for(u in r){var s=r[u];if(i=a?.[u],r.hasOwnProperty(u)&&s!==i&&(s!=null||i!=null))if(u==="style")if(i){for(o in i)!i.hasOwnProperty(o)||s&&s.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in s)s.hasOwnProperty(o)&&i[o]!==s[o]&&(n||(n={}),n[o]=s[o])}else n||(l||(l=[]),l.push(u,n)),n=s;else u==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,i=i?i.__html:void 0,s!=null&&i!==s&&(l=l||[]).push(u,s)):u==="children"?typeof s!="string"&&typeof s!="number"||(l=l||[]).push(u,""+s):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&($r.hasOwnProperty(u)?(s!=null&&u==="onScroll"&&Q("scroll",e),l||i===s||(l=[])):(l=l||[]).push(u,s))}n&&(l=l||[]).push("style",n);var u=l;(t.updateQueue=u)&&(t.flags|=4)}};Pd=function(e,t,n,r){n!==r&&(t.flags|=4)};function pr(e,t){if(!X)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function _e(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags&14680064,r|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Uh(e,t,n){var r=t.pendingProps;switch(Ci(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return _e(t),null;case 1:return De(t.type)&&Qa(),_e(t),null;case 3:return r=t.stateNode,Yn(),Y(Te),Y(Se),Oi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Ea(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Ze!==null&&(si(Ze),Ze=null))),ei(e,t),_e(t),null;case 5:Fi(t);var a=sn(zr.current);if(n=t.type,e!==null&&t.stateNode!=null)xd(e,t,n,r,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(k(166));return _e(t),null}if(e=sn(dt.current),Ea(t)){r=t.stateNode,n=t.type;var l=t.memoizedProps;switch(r[ut]=t,r[Mr]=l,e=(t.mode&1)!==0,n){case"dialog":Q("cancel",r),Q("close",r);break;case"iframe":case"object":case"embed":Q("load",r);break;case"video":case"audio":for(a=0;a<wr.length;a++)Q(wr[a],r);break;case"source":Q("error",r);break;case"img":case"image":case"link":Q("error",r),Q("load",r);break;case"details":Q("toggle",r);break;case"input":Ws(r,l),Q("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},Q("invalid",r);break;case"textarea":Qs(r,l),Q("invalid",r)}xo(n,l),a=null;for(var o in l)if(l.hasOwnProperty(o)){var i=l[o];o==="children"?typeof i=="string"?r.textContent!==i&&(l.suppressHydrationWarning!==!0&&Sa(r.textContent,i,e),a=["children",i]):typeof i=="number"&&r.textContent!==""+i&&(l.suppressHydrationWarning!==!0&&Sa(r.textContent,i,e),a=["children",""+i]):$r.hasOwnProperty(o)&&i!=null&&o==="onScroll"&&Q("scroll",r)}switch(n){case"input":ca(r),Ks(r,l,!0);break;case"textarea":ca(r),Ys(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=Ka)}r=a,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=nc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[ut]=t,e[Mr]=r,Cd(e,t,!1,!1),t.stateNode=e;e:{switch(o=Po(n,r),n){case"dialog":Q("cancel",e),Q("close",e),a=r;break;case"iframe":case"object":case"embed":Q("load",e),a=r;break;case"video":case"audio":for(a=0;a<wr.length;a++)Q(wr[a],e);a=r;break;case"source":Q("error",e),a=r;break;case"img":case"image":case"link":Q("error",e),Q("load",e),a=r;break;case"details":Q("toggle",e),a=r;break;case"input":Ws(e,r),a=So(e,r),Q("invalid",e);break;case"option":a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=te({},r,{value:void 0}),Q("invalid",e);break;case"textarea":Qs(e,r),a=Ro(e,r),Q("invalid",e);break;default:a=r}xo(n,a),i=a;for(l in i)if(i.hasOwnProperty(l)){var s=i[l];l==="style"?lc(e,s):l==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&rc(e,s)):l==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&Tr(e,s):typeof s=="number"&&Tr(e,""+s):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&($r.hasOwnProperty(l)?s!=null&&l==="onScroll"&&Q("scroll",e):s!=null&&di(e,l,s,o))}switch(n){case"input":ca(e),Ks(e,r,!1);break;case"textarea":ca(e),Ys(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Vt(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?In(e,!!r.multiple,l,!1):r.defaultValue!=null&&In(e,!!r.multiple,r.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=Ka)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return _e(t),null;case 6:if(e&&t.stateNode!=null)Pd(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(k(166));if(n=sn(zr.current),sn(dt.current),Ea(t)){if(r=t.stateNode,n=t.memoizedProps,r[ut]=t,(l=r.nodeValue!==n)&&(e=Ue,e!==null))switch(e.tag){case 3:Sa(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Sa(r.nodeValue,n,(e.mode&1)!==0)}l&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[ut]=t,t.stateNode=r}return _e(t),null;case 13:if(Y(q),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(X&&Oe!==null&&(t.mode&1)!==0&&(t.flags&128)===0)Kc(),Kn(),t.flags|=98560,l=!1;else if(l=Ea(t),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(k(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(k(317));l[ut]=t}else Kn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;_e(t),l=!1}else Ze!==null&&(si(Ze),Ze=null),l=!0;if(!l)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(q.current&1)!==0?se===0&&(se=3):Qi())),t.updateQueue!==null&&(t.flags|=4),_e(t),null);case 4:return Yn(),ei(e,t),e===null&&Ar(t.stateNode.containerInfo),_e(t),null;case 10:return Ti(t.type._context),_e(t),null;case 17:return De(t.type)&&Qa(),_e(t),null;case 19:if(Y(q),l=t.memoizedState,l===null)return _e(t),null;if(r=(t.flags&128)!==0,o=l.rendering,o===null)if(r)pr(l,!1);else{if(se!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(o=el(e),o!==null){for(t.flags|=128,pr(l,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)l=n,e=r,l.flags&=14680066,o=l.alternate,o===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=o.childLanes,l.lanes=o.lanes,l.child=o.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=o.memoizedProps,l.memoizedState=o.memoizedState,l.updateQueue=o.updateQueue,l.type=o.type,e=o.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return K(q,q.current&1|2),t.child}e=e.sibling}l.tail!==null&&ae()>Gn&&(t.flags|=128,r=!0,pr(l,!1),t.lanes=4194304)}else{if(!r)if(e=el(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),pr(l,!0),l.tail===null&&l.tailMode==="hidden"&&!o.alternate&&!X)return _e(t),null}else 2*ae()-l.renderingStartTime>Gn&&n!==1073741824&&(t.flags|=128,r=!0,pr(l,!1),t.lanes=4194304);l.isBackwards?(o.sibling=t.child,t.child=o):(n=l.last,n!==null?n.sibling=o:t.child=o,l.last=o)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=ae(),t.sibling=null,n=q.current,K(q,r?n&1|2:n&1),t):(_e(t),null);case 22:case 23:return Ki(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(Fe&1073741824)!==0&&(_e(t),t.subtreeFlags&6&&(t.flags|=8192)):_e(t),null;case 24:return null;case 25:return null}throw Error(k(156,t.tag))}function Ah(e,t){switch(Ci(t),t.tag){case 1:return De(t.type)&&Qa(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Yn(),Y(Te),Y(Se),Oi(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Fi(t),null;case 13:if(Y(q),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(k(340));Kn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Y(q),null;case 4:return Yn(),null;case 10:return Ti(t.type._context),null;case 22:case 23:return Ki(),null;case 24:return null;default:return null}}var Ca=!1,Ne=!1,Ih=typeof WeakSet=="function"?WeakSet:Set,D=null;function Un(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){re(e,t,r)}else n.current=null}function ti(e,t,n){try{n()}catch(r){re(e,t,r)}}var Iu=!1;function Mh(e,t){if(Io=Ba,e=bc(),ki(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var o=0,i=-1,s=-1,u=0,h=0,m=e,v=null;t:for(;;){for(var N;m!==n||a!==0&&m.nodeType!==3||(i=o+a),m!==l||r!==0&&m.nodeType!==3||(s=o+r),m.nodeType===3&&(o+=m.nodeValue.length),(N=m.firstChild)!==null;)v=m,m=N;for(;;){if(m===e)break t;if(v===n&&++u===a&&(i=o),v===l&&++h===r&&(s=o),(N=m.nextSibling)!==null)break;m=v,v=m.parentNode}m=N}n=i===-1||s===-1?null:{start:i,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(Mo={focusedElem:e,selectionRange:n},Ba=!1,D=t;D!==null;)if(t=D,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,D=e;else for(;D!==null;){t=D;try{var S=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(S!==null){var w=S.memoizedProps,E=S.memoizedState,d=t.stateNode,c=d.getSnapshotBeforeUpdate(t.elementType===t.type?w:Ge(t.type,w),E);d.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(k(163))}}catch(y){re(t,t.return,y)}if(e=t.sibling,e!==null){e.return=t.return,D=e;break}D=t.return}return S=Iu,Iu=!1,S}function Cr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var l=a.destroy;a.destroy=void 0,l!==void 0&&ti(t,n,l)}a=a.next}while(a!==r)}}function vl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ni(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function $d(e){var t=e.alternate;t!==null&&(e.alternate=null,$d(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[ut],delete t[Mr],delete t[Vo],delete t[Nh],delete t[Sh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Td(e){return e.tag===5||e.tag===3||e.tag===4}function Mu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Td(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ri(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Ka));else if(r!==4&&(e=e.child,e!==null))for(ri(e,t,n),e=e.sibling;e!==null;)ri(e,t,n),e=e.sibling}function ai(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(ai(e,t,n),e=e.sibling;e!==null;)ai(e,t,n),e=e.sibling}var he=null,Xe=!1;function xt(e,t,n){for(n=n.child;n!==null;)Dd(e,t,n),n=n.sibling}function Dd(e,t,n){if(ct&&typeof ct.onCommitFiberUnmount=="function")try{ct.onCommitFiberUnmount(sl,n)}catch{}switch(n.tag){case 5:Ne||Un(n,t);case 6:var r=he,a=Xe;he=null,xt(e,t,n),he=r,Xe=a,he!==null&&(Xe?(e=he,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):he.removeChild(n.stateNode));break;case 18:he!==null&&(Xe?(e=he,n=n.stateNode,e.nodeType===8?oo(e.parentNode,n):e.nodeType===1&&oo(e,n),Fr(e)):oo(he,n.stateNode));break;case 4:r=he,a=Xe,he=n.stateNode.containerInfo,Xe=!0,xt(e,t,n),he=r,Xe=a;break;case 0:case 11:case 14:case 15:if(!Ne&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){a=r=r.next;do{var l=a,o=l.destroy;l=l.tag,o!==void 0&&((l&2)!==0||(l&4)!==0)&&ti(n,t,o),a=a.next}while(a!==r)}xt(e,t,n);break;case 1:if(!Ne&&(Un(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(i){re(n,t,i)}xt(e,t,n);break;case 21:xt(e,t,n);break;case 22:n.mode&1?(Ne=(r=Ne)||n.memoizedState!==null,xt(e,t,n),Ne=r):xt(e,t,n);break;default:xt(e,t,n)}}function ju(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Ih),t.forEach(function(r){var a=Yh.bind(null,e,r);n.has(r)||(n.add(r),r.then(a,a))})}}function Je(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r];try{var l=e,o=t,i=o;e:for(;i!==null;){switch(i.tag){case 5:he=i.stateNode,Xe=!1;break e;case 3:he=i.stateNode.containerInfo,Xe=!0;break e;case 4:he=i.stateNode.containerInfo,Xe=!0;break e}i=i.return}if(he===null)throw Error(k(160));Dd(l,o,a),he=null,Xe=!1;var s=a.alternate;s!==null&&(s.return=null),a.return=null}catch(u){re(a,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Ld(t,e),t=t.sibling}function Ld(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Je(t,e),it(e),r&4){try{Cr(3,e,e.return),vl(3,e)}catch(w){re(e,e.return,w)}try{Cr(5,e,e.return)}catch(w){re(e,e.return,w)}}break;case 1:Je(t,e),it(e),r&512&&n!==null&&Un(n,n.return);break;case 5:if(Je(t,e),it(e),r&512&&n!==null&&Un(n,n.return),e.flags&32){var a=e.stateNode;try{Tr(a,"")}catch(w){re(e,e.return,w)}}if(r&4&&(a=e.stateNode,a!=null)){var l=e.memoizedProps,o=n!==null?n.memoizedProps:l,i=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{i==="input"&&l.type==="radio"&&l.name!=null&&ec(a,l),Po(i,o);var u=Po(i,l);for(o=0;o<s.length;o+=2){var h=s[o],m=s[o+1];h==="style"?lc(a,m):h==="dangerouslySetInnerHTML"?rc(a,m):h==="children"?Tr(a,m):di(a,h,m,u)}switch(i){case"input":Eo(a,l);break;case"textarea":tc(a,l);break;case"select":var v=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!l.multiple;var N=l.value;N!=null?In(a,!!l.multiple,N,!1):v!==!!l.multiple&&(l.defaultValue!=null?In(a,!!l.multiple,l.defaultValue,!0):In(a,!!l.multiple,l.multiple?[]:"",!1))}a[Mr]=l}catch(w){re(e,e.return,w)}}break;case 6:if(Je(t,e),it(e),r&4){if(e.stateNode===null)throw Error(k(162));a=e.stateNode,l=e.memoizedProps;try{a.nodeValue=l}catch(w){re(e,e.return,w)}}break;case 3:if(Je(t,e),it(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Fr(t.containerInfo)}catch(w){re(e,e.return,w)}break;case 4:Je(t,e),it(e);break;case 13:Je(t,e),it(e),a=e.child,a.flags&8192&&(l=a.memoizedState!==null,a.stateNode.isHidden=l,!l||a.alternate!==null&&a.alternate.memoizedState!==null||(Hi=ae())),r&4&&ju(e);break;case 22:if(h=n!==null&&n.memoizedState!==null,e.mode&1?(Ne=(u=Ne)||h,Je(t,e),Ne=u):Je(t,e),it(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!h&&(e.mode&1)!==0)for(D=e,h=e.child;h!==null;){for(m=D=h;D!==null;){switch(v=D,N=v.child,v.tag){case 0:case 11:case 14:case 15:Cr(4,v,v.return);break;case 1:Un(v,v.return);var S=v.stateNode;if(typeof S.componentWillUnmount=="function"){r=v,n=v.return;try{t=r,S.props=t.memoizedProps,S.state=t.memoizedState,S.componentWillUnmount()}catch(w){re(r,n,w)}}break;case 5:Un(v,v.return);break;case 22:if(v.memoizedState!==null){Vu(m);continue}}N!==null?(N.return=v,D=N):Vu(m)}h=h.sibling}e:for(h=null,m=e;;){if(m.tag===5){if(h===null){h=m;try{a=m.stateNode,u?(l=a.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(i=m.stateNode,s=m.memoizedProps.style,o=s!=null&&s.hasOwnProperty("display")?s.display:null,i.style.display=ac("display",o))}catch(w){re(e,e.return,w)}}}else if(m.tag===6){if(h===null)try{m.stateNode.nodeValue=u?"":m.memoizedProps}catch(w){re(e,e.return,w)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;h===m&&(h=null),m=m.return}h===m&&(h=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Je(t,e),it(e),r&4&&ju(e);break;case 21:break;default:Je(t,e),it(e)}}function it(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Td(n)){var r=n;break e}n=n.return}throw Error(k(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&(Tr(a,""),r.flags&=-33);var l=Mu(e);ai(e,l,a);break;case 3:case 4:var o=r.stateNode.containerInfo,i=Mu(e);ri(e,i,o);break;default:throw Error(k(161))}}catch(s){re(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function jh(e,t,n){D=e,bd(e,t,n)}function bd(e,t,n){for(var r=(e.mode&1)!==0;D!==null;){var a=D,l=a.child;if(a.tag===22&&r){var o=a.memoizedState!==null||Ca;if(!o){var i=a.alternate,s=i!==null&&i.memoizedState!==null||Ne;i=Ca;var u=Ne;if(Ca=o,(Ne=s)&&!u)for(D=a;D!==null;)o=D,s=o.child,o.tag===22&&o.memoizedState!==null?Bu(a):s!==null?(s.return=o,D=s):Bu(a);for(;l!==null;)D=l,bd(l,t,n),l=l.sibling;D=a,Ca=i,Ne=u}zu(e,t,n)}else(a.subtreeFlags&8772)!==0&&l!==null?(l.return=a,D=l):zu(e,t,n)}}function zu(e){for(;D!==null;){var t=D;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Ne||vl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Ne)if(n===null)r.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:Ge(t.type,n.memoizedProps);r.componentDidUpdate(a,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&Ru(t,l,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ru(t,o,n)}break;case 5:var i=t.stateNode;if(n===null&&t.flags&4){n=i;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var h=u.memoizedState;if(h!==null){var m=h.dehydrated;m!==null&&Fr(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(k(163))}Ne||t.flags&512&&ni(t)}catch(v){re(t,t.return,v)}}if(t===e){D=null;break}if(n=t.sibling,n!==null){n.return=t.return,D=n;break}D=t.return}}function Vu(e){for(;D!==null;){var t=D;if(t===e){D=null;break}var n=t.sibling;if(n!==null){n.return=t.return,D=n;break}D=t.return}}function Bu(e){for(;D!==null;){var t=D;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{vl(4,t)}catch(s){re(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var a=t.return;try{r.componentDidMount()}catch(s){re(t,a,s)}}var l=t.return;try{ni(t)}catch(s){re(t,l,s)}break;case 5:var o=t.return;try{ni(t)}catch(s){re(t,o,s)}}}catch(s){re(t,t.return,s)}if(t===e){D=null;break}var i=t.sibling;if(i!==null){i.return=t.return,D=i;break}D=t.return}}var zh=Math.ceil,rl=Et.ReactCurrentDispatcher,Vi=Et.ReactCurrentOwner,He=Et.ReactCurrentBatchConfig,j=0,pe=null,le=null,me=0,Fe=0,An=Wt(0),se=0,Wr=null,hn=0,yl=0,Bi=0,xr=null,Pe=null,Hi=0,Gn=1/0,ht=null,al=!1,li=null,Mt=null,xa=!1,bt=null,ll=0,Pr=0,oi=null,Oa=-1,Ua=0;function Ce(){return(j&6)!==0?ae():Oa!==-1?Oa:Oa=ae()}function jt(e){return(e.mode&1)===0?1:(j&2)!==0&&me!==0?me&-me:kh.transition!==null?(Ua===0&&(Ua=yc()),Ua):(e=B,e!==0||(e=window.event,e=e===void 0?16:kc(e.type)),e)}function et(e,t,n,r){if(50<Pr)throw Pr=0,oi=null,Error(k(185));Kr(e,n,r),((j&2)===0||e!==pe)&&(e===pe&&((j&2)===0&&(yl|=n),se===4&&Dt(e,me)),Le(e,r),n===1&&j===0&&(t.mode&1)===0&&(Gn=ae()+500,pl&&Kt()))}function Le(e,t){var n=e.callbackNode;Cp(e,t);var r=Va(e,e===pe?me:0);if(r===0)n!==null&&Xs(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Xs(n),t===1)e.tag===0?Eh(Hu.bind(null,e)):Bc(Hu.bind(null,e)),wh(function(){(j&6)===0&&Kt()}),n=null;else{switch(gc(r)){case 1:n=vi;break;case 4:n=mc;break;case 16:n=za;break;case 536870912:n=vc;break;default:n=za}n=zd(n,Fd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Fd(e,t){if(Oa=-1,Ua=0,(j&6)!==0)throw Error(k(327));var n=e.callbackNode;if(Bn()&&e.callbackNode!==n)return null;var r=Va(e,e===pe?me:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=ol(e,r);else{t=r;var a=j;j|=2;var l=Ud();(pe!==e||me!==t)&&(ht=null,Gn=ae()+500,un(e,t));do try{Hh();break}catch(i){Od(e,i)}while(!0);$i(),rl.current=l,j=a,le!==null?t=0:(pe=null,me=0,t=se)}if(t!==0){if(t===2&&(a=bo(e),a!==0&&(r=a,t=ii(e,a))),t===1)throw n=Wr,un(e,0),Dt(e,r),Le(e,ae()),n;if(t===6)Dt(e,r);else{if(a=e.current.alternate,(r&30)===0&&!Vh(a)&&(t=ol(e,r),t===2&&(l=bo(e),l!==0&&(r=l,t=ii(e,l))),t===1))throw n=Wr,un(e,0),Dt(e,r),Le(e,ae()),n;switch(e.finishedWork=a,e.finishedLanes=r,t){case 0:case 1:throw Error(k(345));case 2:an(e,Pe,ht);break;case 3:if(Dt(e,r),(r&130023424)===r&&(t=Hi+500-ae(),10<t)){if(Va(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){Ce(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=zo(an.bind(null,e,Pe,ht),t);break}an(e,Pe,ht);break;case 4:if(Dt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,a=-1;0<r;){var o=31-qe(r);l=1<<o,o=t[o],o>a&&(a=o),r&=~l}if(r=a,r=ae()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*zh(r/1960))-r,10<r){e.timeoutHandle=zo(an.bind(null,e,Pe,ht),r);break}an(e,Pe,ht);break;case 5:an(e,Pe,ht);break;default:throw Error(k(329))}}}return Le(e,ae()),e.callbackNode===n?Fd.bind(null,e):null}function ii(e,t){var n=xr;return e.current.memoizedState.isDehydrated&&(un(e,t).flags|=256),e=ol(e,t),e!==2&&(t=Pe,Pe=n,t!==null&&si(t)),e}function si(e){Pe===null?Pe=e:Pe.push.apply(Pe,e)}function Vh(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var a=n[r],l=a.getSnapshot;a=a.value;try{if(!tt(l(),a))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Dt(e,t){for(t&=~Bi,t&=~yl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-qe(t),r=1<<n;e[n]=-1,t&=~r}}function Hu(e){if((j&6)!==0)throw Error(k(327));Bn();var t=Va(e,0);if((t&1)===0)return Le(e,ae()),null;var n=ol(e,t);if(e.tag!==0&&n===2){var r=bo(e);r!==0&&(t=r,n=ii(e,r))}if(n===1)throw n=Wr,un(e,0),Dt(e,t),Le(e,ae()),n;if(n===6)throw Error(k(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,an(e,Pe,ht),Le(e,ae()),null}function Wi(e,t){var n=j;j|=1;try{return e(t)}finally{j=n,j===0&&(Gn=ae()+500,pl&&Kt())}}function mn(e){bt!==null&&bt.tag===0&&(j&6)===0&&Bn();var t=j;j|=1;var n=He.transition,r=B;try{if(He.transition=null,B=1,e)return e()}finally{B=r,He.transition=n,j=t,(j&6)===0&&Kt()}}function Ki(){Fe=An.current,Y(An)}function un(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,gh(n)),le!==null)for(n=le.return;n!==null;){var r=n;switch(Ci(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Qa();break;case 3:Yn(),Y(Te),Y(Se),Oi();break;case 5:Fi(r);break;case 4:Yn();break;case 13:Y(q);break;case 19:Y(q);break;case 10:Ti(r.type._context);break;case 22:case 23:Ki()}n=n.return}if(pe=e,le=e=zt(e.current,null),me=Fe=t,se=0,Wr=null,Bi=yl=hn=0,Pe=xr=null,on!==null){for(t=0;t<on.length;t++)if(n=on[t],r=n.interleaved,r!==null){n.interleaved=null;var a=r.next,l=n.pending;if(l!==null){var o=l.next;l.next=a,r.next=o}n.pending=r}on=null}return e}function Od(e,t){do{var n=le;try{if($i(),La.current=nl,tl){for(var r=ee.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}tl=!1}if(pn=0,fe=ie=ee=null,Rr=!1,Vr=0,Vi.current=null,n===null||n.return===null){se=1,Wr=t,le=null;break}e:{var l=e,o=n.return,i=n,s=t;if(t=me,i.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var u=s,h=i,m=h.tag;if((h.mode&1)===0&&(m===0||m===11||m===15)){var v=h.alternate;v?(h.updateQueue=v.updateQueue,h.memoizedState=v.memoizedState,h.lanes=v.lanes):(h.updateQueue=null,h.memoizedState=null)}var N=Du(o);if(N!==null){N.flags&=-257,Lu(N,o,i,l,t),N.mode&1&&Tu(l,u,t),t=N,s=u;var S=t.updateQueue;if(S===null){var w=new Set;w.add(s),t.updateQueue=w}else S.add(s);break e}else{if((t&1)===0){Tu(l,u,t),Qi();break e}s=Error(k(426))}}else if(X&&i.mode&1){var E=Du(o);if(E!==null){(E.flags&65536)===0&&(E.flags|=256),Lu(E,o,i,l,t),xi(Jn(s,i));break e}}l=s=Jn(s,i),se!==4&&(se=2),xr===null?xr=[l]:xr.push(l),l=o;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var d=gd(l,s,t);ku(l,d);break e;case 1:i=s;var c=l.type,f=l.stateNode;if((l.flags&128)===0&&(typeof c.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Mt===null||!Mt.has(f)))){l.flags|=65536,t&=-t,l.lanes|=t;var y=wd(l,i,t);ku(l,y);break e}}l=l.return}while(l!==null)}Id(n)}catch(C){t=C,le===n&&n!==null&&(le=n=n.return);continue}break}while(!0)}function Ud(){var e=rl.current;return rl.current=nl,e===null?nl:e}function Qi(){(se===0||se===3||se===2)&&(se=4),pe===null||(hn&268435455)===0&&(yl&268435455)===0||Dt(pe,me)}function ol(e,t){var n=j;j|=2;var r=Ud();(pe!==e||me!==t)&&(ht=null,un(e,t));do try{Bh();break}catch(a){Od(e,a)}while(!0);if($i(),j=n,rl.current=r,le!==null)throw Error(k(261));return pe=null,me=0,se}function Bh(){for(;le!==null;)Ad(le)}function Hh(){for(;le!==null&&!yp();)Ad(le)}function Ad(e){var t=jd(e.alternate,e,Fe);e.memoizedProps=e.pendingProps,t===null?Id(e):le=t,Vi.current=null}function Id(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Uh(n,t,Fe),n!==null){le=n;return}}else{if(n=Ah(n,t),n!==null){n.flags&=32767,le=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{se=6,le=null;return}}if(t=t.sibling,t!==null){le=t;return}le=t=e}while(t!==null);se===0&&(se=5)}function an(e,t,n){var r=B,a=He.transition;try{He.transition=null,B=1,Wh(e,t,n,r)}finally{He.transition=a,B=r}return null}function Wh(e,t,n,r){do Bn();while(bt!==null);if((j&6)!==0)throw Error(k(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(k(177));e.callbackNode=null,e.callbackPriority=0;var l=n.lanes|n.childLanes;if(xp(e,l),e===pe&&(le=pe=null,me=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||xa||(xa=!0,zd(za,function(){return Bn(),null})),l=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||l){l=He.transition,He.transition=null;var o=B;B=1;var i=j;j|=4,Vi.current=null,Mh(e,n),Ld(n,e),ph(Mo),Ba=!!Io,Mo=Io=null,e.current=n,jh(n,e,a),gp(),j=i,B=o,He.transition=l}else e.current=n;if(xa&&(xa=!1,bt=e,ll=a),l=e.pendingLanes,l===0&&(Mt=null),Np(n.stateNode,r),Le(e,ae()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],r(a.value,{componentStack:a.stack,digest:a.digest});if(al)throw al=!1,e=li,li=null,e;return(ll&1)!==0&&e.tag!==0&&Bn(),l=e.pendingLanes,(l&1)!==0?e===oi?Pr++:(Pr=0,oi=e):Pr=0,Kt(),null}function Bn(){if(bt!==null){var e=gc(ll),t=He.transition,n=B;try{if(He.transition=null,B=16>e?16:e,bt===null)var r=!1;else{if(e=bt,bt=null,ll=0,(j&6)!==0)throw Error(k(331));var a=j;for(j|=4,D=e.current;D!==null;){var l=D,o=l.child;if((D.flags&16)!==0){var i=l.deletions;if(i!==null){for(var s=0;s<i.length;s++){var u=i[s];for(D=u;D!==null;){var h=D;switch(h.tag){case 0:case 11:case 15:Cr(8,h,l)}var m=h.child;if(m!==null)m.return=h,D=m;else for(;D!==null;){h=D;var v=h.sibling,N=h.return;if($d(h),h===u){D=null;break}if(v!==null){v.return=N,D=v;break}D=N}}}var S=l.alternate;if(S!==null){var w=S.child;if(w!==null){S.child=null;do{var E=w.sibling;w.sibling=null,w=E}while(w!==null)}}D=l}}if((l.subtreeFlags&2064)!==0&&o!==null)o.return=l,D=o;else e:for(;D!==null;){if(l=D,(l.flags&2048)!==0)switch(l.tag){case 0:case 11:case 15:Cr(9,l,l.return)}var d=l.sibling;if(d!==null){d.return=l.return,D=d;break e}D=l.return}}var c=e.current;for(D=c;D!==null;){o=D;var f=o.child;if((o.subtreeFlags&2064)!==0&&f!==null)f.return=o,D=f;else e:for(o=c;D!==null;){if(i=D,(i.flags&2048)!==0)try{switch(i.tag){case 0:case 11:case 15:vl(9,i)}}catch(C){re(i,i.return,C)}if(i===o){D=null;break e}var y=i.sibling;if(y!==null){y.return=i.return,D=y;break e}D=i.return}}if(j=a,Kt(),ct&&typeof ct.onPostCommitFiberRoot=="function")try{ct.onPostCommitFiberRoot(sl,e)}catch{}r=!0}return r}finally{B=n,He.transition=t}}return!1}function Wu(e,t,n){t=Jn(n,t),t=gd(e,t,1),e=It(e,t,1),t=Ce(),e!==null&&(Kr(e,1,t),Le(e,t))}function re(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Mt===null||!Mt.has(r))){e=Jn(n,e),e=wd(t,e,1),t=It(t,e,1),e=Ce(),t!==null&&(Kr(t,1,e),Le(t,e));break}}t=t.return}}function Kh(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ce(),e.pingedLanes|=e.suspendedLanes&n,pe===e&&(me&n)===n&&(se===4||se===3&&(me&130023424)===me&&500>ae()-Hi?un(e,0):Bi|=n),Le(e,t)}function Md(e,t){t===0&&((e.mode&1)===0?t=1:(t=pa,pa<<=1,(pa&130023424)===0&&(pa=4194304)));var n=Ce();e=Nt(e,t),e!==null&&(Kr(e,t,n),Le(e,n))}function Qh(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Md(e,n)}function Yh(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(k(314))}r!==null&&r.delete(t),Md(e,n)}var jd;jd=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Te.current)$e=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return $e=!1,Oh(e,t,n);$e=(e.flags&131072)!==0}else $e=!1,X&&(t.flags&1048576)!==0&&Hc(t,Ga,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Fa(e,t),e=t.pendingProps;var a=Wn(t,Se.current);Vn(t,n),a=Ai(null,t,r,e,a,n);var l=Ii();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,De(r)?(l=!0,Ya(t)):l=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Li(t),a.updater=ml,t.stateNode=a,a._reactInternals=t,Yo(t,r,e,n),t=Xo(null,t,r,!0,l,n)):(t.tag=0,X&&l&&Ri(t),Re(null,t,a,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Fa(e,t),e=t.pendingProps,a=r._init,r=a(r._payload),t.type=r,a=t.tag=Gh(r),e=Ge(r,e),a){case 0:t=Go(null,t,r,e,n);break e;case 1:t=Ou(null,t,r,e,n);break e;case 11:t=bu(null,t,r,e,n);break e;case 14:t=Fu(null,t,r,Ge(r.type,e),n);break e}throw Error(k(306,r,""))}return t;case 0:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Ge(r,a),Go(e,t,r,a,n);case 1:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Ge(r,a),Ou(e,t,r,a,n);case 3:e:{if(Ed(t),e===null)throw Error(k(387));r=t.pendingProps,l=t.memoizedState,a=l.element,Gc(e,t),qa(t,r,null,n);var o=t.memoizedState;if(r=o.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){a=Jn(Error(k(423)),t),t=Uu(e,t,r,n,a);break e}else if(r!==a){a=Jn(Error(k(424)),t),t=Uu(e,t,r,n,a);break e}else for(Oe=At(t.stateNode.containerInfo.firstChild),Ue=t,X=!0,Ze=null,n=Yc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Kn(),r===a){t=St(e,t,n);break e}Re(e,t,r,n)}t=t.child}return t;case 5:return Xc(t),e===null&&Wo(t),r=t.type,a=t.pendingProps,l=e!==null?e.memoizedProps:null,o=a.children,jo(r,a)?o=null:l!==null&&jo(r,l)&&(t.flags|=32),Sd(e,t),Re(e,t,o,n),t.child;case 6:return e===null&&Wo(t),null;case 13:return kd(e,t,n);case 4:return bi(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Qn(t,null,r,n):Re(e,t,r,n),t.child;case 11:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Ge(r,a),bu(e,t,r,a,n);case 7:return Re(e,t,t.pendingProps,n),t.child;case 8:return Re(e,t,t.pendingProps.children,n),t.child;case 12:return Re(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,a=t.pendingProps,l=t.memoizedProps,o=a.value,K(Xa,r._currentValue),r._currentValue=o,l!==null)if(tt(l.value,o)){if(l.children===a.children&&!Te.current){t=St(e,t,n);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var i=l.dependencies;if(i!==null){o=l.child;for(var s=i.firstContext;s!==null;){if(s.context===r){if(l.tag===1){s=gt(-1,n&-n),s.tag=2;var u=l.updateQueue;if(u!==null){u=u.shared;var h=u.pending;h===null?s.next=s:(s.next=h.next,h.next=s),u.pending=s}}l.lanes|=n,s=l.alternate,s!==null&&(s.lanes|=n),Ko(l.return,n,t),i.lanes|=n;break}s=s.next}}else if(l.tag===10)o=l.type===t.type?null:l.child;else if(l.tag===18){if(o=l.return,o===null)throw Error(k(341));o.lanes|=n,i=o.alternate,i!==null&&(i.lanes|=n),Ko(o,n,t),o=l.sibling}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===t){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}Re(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,r=t.pendingProps.children,Vn(t,n),a=We(a),r=r(a),t.flags|=1,Re(e,t,r,n),t.child;case 14:return r=t.type,a=Ge(r,t.pendingProps),a=Ge(r.type,a),Fu(e,t,r,a,n);case 15:return _d(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Ge(r,a),Fa(e,t),t.tag=1,De(r)?(e=!0,Ya(t)):e=!1,Vn(t,n),yd(t,r,a),Yo(t,r,a,n),Xo(null,t,r,!0,e,n);case 19:return Rd(e,t,n);case 22:return Nd(e,t,n)}throw Error(k(156,t.tag))};function zd(e,t){return hc(e,t)}function Jh(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Be(e,t,n,r){return new Jh(e,t,n,r)}function Yi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Gh(e){if(typeof e=="function")return Yi(e)?1:0;if(e!=null){if(e=e.$$typeof,e===pi)return 11;if(e===hi)return 14}return 2}function zt(e,t){var n=e.alternate;return n===null?(n=Be(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Aa(e,t,n,r,a,l){var o=2;if(r=e,typeof e=="function")Yi(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case xn:return cn(n.children,a,l,t);case fi:o=8,a|=8;break;case go:return e=Be(12,n,t,a|2),e.elementType=go,e.lanes=l,e;case wo:return e=Be(13,n,t,a),e.elementType=wo,e.lanes=l,e;case _o:return e=Be(19,n,t,a),e.elementType=_o,e.lanes=l,e;case Xu:return gl(n,a,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ju:o=10;break e;case Gu:o=9;break e;case pi:o=11;break e;case hi:o=14;break e;case Pt:o=16,r=null;break e}throw Error(k(130,e==null?e:typeof e,""))}return t=Be(o,n,t,a),t.elementType=e,t.type=r,t.lanes=l,t}function cn(e,t,n,r){return e=Be(7,e,r,t),e.lanes=n,e}function gl(e,t,n,r){return e=Be(22,e,r,t),e.elementType=Xu,e.lanes=n,e.stateNode={isHidden:!1},e}function mo(e,t,n){return e=Be(6,e,null,t),e.lanes=n,e}function vo(e,t,n){return t=Be(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Xh(e,t,n,r,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Zl(0),this.expirationTimes=Zl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Zl(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Ji(e,t,n,r,a,l,o,i,s){return e=new Xh(e,t,n,i,s),t===1?(t=1,l===!0&&(t|=8)):t=0,l=Be(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Li(l),e}function Zh(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Cn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Vd(e){if(!e)return Bt;e=e._reactInternals;e:{if(yn(e)!==e||e.tag!==1)throw Error(k(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(De(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(k(171))}if(e.tag===1){var n=e.type;if(De(n))return Vc(e,n,t)}return t}function Bd(e,t,n,r,a,l,o,i,s){return e=Ji(n,r,!0,e,a,l,o,i,s),e.context=Vd(null),n=e.current,r=Ce(),a=jt(n),l=gt(r,a),l.callback=t??null,It(n,l,a),e.current.lanes=a,Kr(e,a,r),Le(e,r),e}function wl(e,t,n,r){var a=t.current,l=Ce(),o=jt(a);return n=Vd(n),t.context===null?t.context=n:t.pendingContext=n,t=gt(l,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=It(a,t,o),e!==null&&(et(e,a,o,l),Da(e,a,o)),o}function il(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Ku(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Gi(e,t){Ku(e,t),(e=e.alternate)&&Ku(e,t)}function qh(){return null}var Hd=typeof reportError=="function"?reportError:function(e){console.error(e)};function Xi(e){this._internalRoot=e}_l.prototype.render=Xi.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(k(409));wl(e,t,null,null)};_l.prototype.unmount=Xi.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;mn(function(){wl(null,e,null,null)}),t[_t]=null}};function _l(e){this._internalRoot=e}_l.prototype.unstable_scheduleHydration=function(e){if(e){var t=Nc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Tt.length&&t!==0&&t<Tt[n].priority;n++);Tt.splice(n,0,e),n===0&&Ec(e)}};function Zi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Nl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Qu(){}function em(e,t,n,r,a){if(a){if(typeof r=="function"){var l=r;r=function(){var u=il(o);l.call(u)}}var o=Bd(t,r,e,0,null,!1,!1,"",Qu);return e._reactRootContainer=o,e[_t]=o.current,Ar(e.nodeType===8?e.parentNode:e),mn(),o}for(;a=e.lastChild;)e.removeChild(a);if(typeof r=="function"){var i=r;r=function(){var u=il(s);i.call(u)}}var s=Ji(e,0,!1,null,null,!1,!1,"",Qu);return e._reactRootContainer=s,e[_t]=s.current,Ar(e.nodeType===8?e.parentNode:e),mn(function(){wl(t,s,n,r)}),s}function Sl(e,t,n,r,a){var l=n._reactRootContainer;if(l){var o=l;if(typeof a=="function"){var i=a;a=function(){var s=il(o);i.call(s)}}wl(t,o,e,a)}else o=em(n,t,e,a,r);return il(o)}wc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=gr(t.pendingLanes);n!==0&&(yi(t,n|1),Le(t,ae()),(j&6)===0&&(Gn=ae()+500,Kt()))}break;case 13:mn(function(){var r=Nt(e,1);if(r!==null){var a=Ce();et(r,e,1,a)}}),Gi(e,1)}};gi=function(e){if(e.tag===13){var t=Nt(e,134217728);if(t!==null){var n=Ce();et(t,e,134217728,n)}Gi(e,134217728)}};_c=function(e){if(e.tag===13){var t=jt(e),n=Nt(e,t);if(n!==null){var r=Ce();et(n,e,t,r)}Gi(e,t)}};Nc=function(){return B};Sc=function(e,t){var n=B;try{return B=e,t()}finally{B=n}};To=function(e,t,n){switch(t){case"input":if(Eo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=fl(r);if(!a)throw Error(k(90));qu(r),Eo(r,a)}}}break;case"textarea":tc(e,n);break;case"select":t=n.value,t!=null&&In(e,!!n.multiple,t,!1)}};sc=Wi;uc=mn;var tm={usingClientEntryPoint:!1,Events:[Yr,Dn,fl,oc,ic,Wi]},hr={findFiberByHostInstance:ln,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},nm={bundleType:hr.bundleType,version:hr.version,rendererPackageName:hr.rendererPackageName,rendererConfig:hr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Et.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=fc(e),e===null?null:e.stateNode},findFiberByHostInstance:hr.findFiberByHostInstance||qh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(mr=__REACT_DEVTOOLS_GLOBAL_HOOK__,!mr.isDisabled&&mr.supportsFiber))try{sl=mr.inject(nm),ct=mr}catch{}var mr;Me.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=tm;Me.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Zi(t))throw Error(k(200));return Zh(e,t,null,n)};Me.createRoot=function(e,t){if(!Zi(e))throw Error(k(299));var n=!1,r="",a=Hd;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=Ji(e,1,!1,null,null,n,!1,r,a),e[_t]=t.current,Ar(e.nodeType===8?e.parentNode:e),new Xi(t)};Me.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(k(188)):(e=Object.keys(e).join(","),Error(k(268,e)));return e=fc(t),e=e===null?null:e.stateNode,e};Me.flushSync=function(e){return mn(e)};Me.hydrate=function(e,t,n){if(!Nl(t))throw Error(k(200));return Sl(null,e,t,!0,n)};Me.hydrateRoot=function(e,t,n){if(!Zi(e))throw Error(k(405));var r=n!=null&&n.hydratedSources||null,a=!1,l="",o=Hd;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=Bd(t,null,e,1,n??null,a,!1,l,o),e[_t]=t.current,Ar(e),r)for(e=0;e<r.length;e++)n=r[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new _l(t)};Me.render=function(e,t,n){if(!Nl(t))throw Error(k(200));return Sl(null,e,t,!1,n)};Me.unmountComponentAtNode=function(e){if(!Nl(e))throw Error(k(40));return e._reactRootContainer?(mn(function(){Sl(null,null,e,!1,function(){e._reactRootContainer=null,e[_t]=null})}),!0):!1};Me.unstable_batchedUpdates=Wi;Me.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Nl(n))throw Error(k(200));if(e==null||e._reactInternals===void 0)throw Error(k(38));return Sl(e,t,n,!1,r)};Me.version="18.3.1-next-f1338f8080-20240426"});var qi=tn((Dv,Qd)=>{"use strict";function Kd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Kd)}catch(e){console.error(e)}}Kd(),Qd.exports=Wd()});var Jd=tn(es=>{"use strict";var Yd=qi();es.createRoot=Yd.createRoot,es.hydrateRoot=Yd.hydrateRoot;var Lv});var L=nr(ar()),Tf=nr(Jd());var z=nr(ar()),Km=nr(qi());var P=nr(ar());function Gr(){return Gr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Gr.apply(this,arguments)}var nt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(nt||(nt={}));var Gd="popstate";function tf(e){e===void 0&&(e={});function t(r,a){let{pathname:l,search:o,hash:i}=r.location;return ns("",{pathname:l,search:o,hash:i},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(r,a){return typeof a=="string"?a:gn(a)}return am(t,n,null,e)}function J(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function rs(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function rm(){return Math.random().toString(36).substr(2,8)}function Xd(e,t){return{usr:e.state,key:e.key,idx:t}}function ns(e,t,n,r){return n===void 0&&(n=null),Gr({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?kt(t):t,{state:n,key:t&&t.key||r||rm()})}function gn(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function kt(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function am(e,t,n,r){r===void 0&&(r={});let{window:a=document.defaultView,v5Compat:l=!1}=r,o=a.history,i=nt.Pop,s=null,u=h();u==null&&(u=0,o.replaceState(Gr({},o.state,{idx:u}),""));function h(){return(o.state||{idx:null}).idx}function m(){i=nt.Pop;let E=h(),d=E==null?null:E-u;u=E,s&&s({action:i,location:w.location,delta:d})}function v(E,d){i=nt.Push;let c=ns(w.location,E,d);n&&n(c,E),u=h()+1;let f=Xd(c,u),y=w.createHref(c);try{o.pushState(f,"",y)}catch(C){if(C instanceof DOMException&&C.name==="DataCloneError")throw C;a.location.assign(y)}l&&s&&s({action:i,location:w.location,delta:1})}function N(E,d){i=nt.Replace;let c=ns(w.location,E,d);n&&n(c,E),u=h();let f=Xd(c,u),y=w.createHref(c);o.replaceState(f,"",y),l&&s&&s({action:i,location:w.location,delta:0})}function S(E){let d=a.location.origin!=="null"?a.location.origin:a.location.href,c=typeof E=="string"?E:gn(E);return c=c.replace(/ $/,"%20"),J(d,"No window.location.(origin|href) available to create URL for href: "+c),new URL(c,d)}let w={get action(){return i},get location(){return e(a,o)},listen(E){if(s)throw new Error("A history only accepts one active listener");return a.addEventListener(Gd,m),s=E,()=>{a.removeEventListener(Gd,m),s=null}},createHref(E){return t(a,E)},createURL:S,encodeLocation(E){let d=S(E);return{pathname:d.pathname,search:d.search,hash:d.hash}},push:v,replace:N,go(E){return o.go(E)}};return w}var Zd;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Zd||(Zd={}));function El(e,t,n){return n===void 0&&(n="/"),lm(e,t,n,!1)}function lm(e,t,n,r){let a=typeof t=="string"?kt(t):t,l=Yt(a.pathname||"/",n);if(l==null)return null;let o=nf(e);om(o);let i=null;for(let s=0;i==null&&s<o.length;++s){let u=af(l);i=mm(o[s],u,r)}return i}function nf(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let a=(l,o,i)=>{let s={relativePath:i===void 0?l.path||"":i,caseSensitive:l.caseSensitive===!0,childrenIndex:o,route:l};s.relativePath.startsWith("/")&&(J(s.relativePath.startsWith(r),'Absolute route path "'+s.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),s.relativePath=s.relativePath.slice(r.length));let u=ft([r,s.relativePath]),h=n.concat(s);l.children&&l.children.length>0&&(J(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),nf(l.children,t,h,u)),!(l.path==null&&!l.index)&&t.push({path:u,score:pm(u,l.index),routesMeta:h})};return e.forEach((l,o)=>{var i;if(l.path===""||!((i=l.path)!=null&&i.includes("?")))a(l,o);else for(let s of rf(l.path))a(l,o,s)}),t}function rf(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,a=n.endsWith("?"),l=n.replace(/\?$/,"");if(r.length===0)return a?[l,""]:[l];let o=rf(r.join("/")),i=[];return i.push(...o.map(s=>s===""?l:[l,s].join("/"))),a&&i.push(...o),i.map(s=>e.startsWith("/")&&s===""?"/":s)}function om(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:hm(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var im=/^:[\w-]+$/,sm=3,um=2,cm=1,dm=10,fm=-2,qd=e=>e==="*";function pm(e,t){let n=e.split("/"),r=n.length;return n.some(qd)&&(r+=fm),t&&(r+=um),n.filter(a=>!qd(a)).reduce((a,l)=>a+(im.test(l)?sm:l===""?cm:dm),r)}function hm(e,t){return e.length===t.length&&e.slice(0,-1).every((r,a)=>r===t[a])?e[e.length-1]-t[t.length-1]:0}function mm(e,t,n){n===void 0&&(n=!1);let{routesMeta:r}=e,a={},l="/",o=[];for(let i=0;i<r.length;++i){let s=r[i],u=i===r.length-1,h=l==="/"?t:t.slice(l.length)||"/",m=Qt({path:s.relativePath,caseSensitive:s.caseSensitive,end:u},h),v=s.route;if(!m&&u&&n&&!r[r.length-1].route.index&&(m=Qt({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},h)),!m)return null;Object.assign(a,m.params),o.push({params:a,pathname:ft([l,m.pathname]),pathnameBase:_m(ft([l,m.pathnameBase])),route:v}),m.pathnameBase!=="/"&&(l=ft([l,m.pathnameBase]))}return o}function Qt(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=vm(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let l=a[0],o=l.replace(/(.)\/+$/,"$1"),i=a.slice(1);return{params:r.reduce((u,h,m)=>{let{paramName:v,isOptional:N}=h;if(v==="*"){let w=i[m]||"";o=l.slice(0,l.length-w.length).replace(/(.)\/+$/,"$1")}let S=i[m];return N&&!S?u[v]=void 0:u[v]=(S||"").replace(/%2F/g,"/"),u},{}),pathname:l,pathnameBase:o,pattern:e}}function vm(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),rs(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,i,s)=>(r.push({paramName:i,isOptional:s!=null}),s?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function af(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return rs(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Yt(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}var ym=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,gm=e=>ym.test(e);function as(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:a=""}=typeof e=="string"?kt(e):e,l;if(n)if(gm(n))l=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),rs(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?l=ef(n.substring(1),"/"):l=ef(n,t)}else l=t;return{pathname:l,search:Nm(r),hash:Sm(a)}}function ef(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function ts(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function wm(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function kl(e,t){let n=wm(e);return t?n.map((r,a)=>a===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Rl(e,t,n,r){r===void 0&&(r=!1);let a;typeof e=="string"?a=kt(e):(a=Gr({},e),J(!a.pathname||!a.pathname.includes("?"),ts("?","pathname","search",a)),J(!a.pathname||!a.pathname.includes("#"),ts("#","pathname","hash",a)),J(!a.search||!a.search.includes("#"),ts("#","search","hash",a)));let l=e===""||a.pathname==="",o=l?"/":a.pathname,i;if(o==null)i=n;else{let m=t.length-1;if(!r&&o.startsWith("..")){let v=o.split("/");for(;v[0]==="..";)v.shift(),m-=1;a.pathname=v.join("/")}i=m>=0?t[m]:"/"}let s=as(a,i),u=o&&o!=="/"&&o.endsWith("/"),h=(l||o===".")&&n.endsWith("/");return!s.pathname.endsWith("/")&&(u||h)&&(s.pathname+="/"),s}var ft=e=>e.join("/").replace(/\/\/+/g,"/"),_m=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Nm=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Sm=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Cl(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var lf=["post","put","patch","delete"],Fv=new Set(lf),Em=["get",...lf],Ov=new Set(Em);var Uv=Symbol("deferred");function Xr(){return Xr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Xr.apply(this,arguments)}var er=P.createContext(null),Pl=P.createContext(null);var rt=P.createContext(null),qr=P.createContext(null),at=P.createContext({outlet:null,matches:[],isDataRoute:!1}),uf=P.createContext(null);function os(e,t){let{relative:n}=t===void 0?{}:t;wn()||J(!1);let{basename:r,navigator:a}=P.useContext(rt),{hash:l,pathname:o,search:i}=tr(e,{relative:n}),s=o;return r!=="/"&&(s=o==="/"?r:ft([r,o])),a.createHref({pathname:s,search:i,hash:l})}function wn(){return P.useContext(qr)!=null}function Jt(){return wn()||J(!1),P.useContext(qr).location}function cf(e){P.useContext(rt).static||P.useLayoutEffect(e)}function Gt(){let{isDataRoute:e}=P.useContext(at);return e?Mm():Dm()}function Dm(){wn()||J(!1);let e=P.useContext(er),{basename:t,future:n,navigator:r}=P.useContext(rt),{matches:a}=P.useContext(at),{pathname:l}=Jt(),o=JSON.stringify(kl(a,n.v7_relativeSplatPath)),i=P.useRef(!1);return cf(()=>{i.current=!0}),P.useCallback(function(u,h){if(h===void 0&&(h={}),!i.current)return;if(typeof u=="number"){r.go(u);return}let m=Rl(u,JSON.parse(o),l,h.relative==="path");e==null&&t!=="/"&&(m.pathname=m.pathname==="/"?t:ft([t,m.pathname])),(h.replace?r.replace:r.push)(m,h.state,h)},[t,r,o,l,e])}function is(){let{matches:e}=P.useContext(at),t=e[e.length-1];return t?t.params:{}}function tr(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=P.useContext(rt),{matches:a}=P.useContext(at),{pathname:l}=Jt(),o=JSON.stringify(kl(a,r.v7_relativeSplatPath));return P.useMemo(()=>Rl(e,JSON.parse(o),l,n==="path"),[e,o,l,n])}function df(e,t){return ff(e,t)}function ff(e,t,n,r){wn()||J(!1);let{navigator:a}=P.useContext(rt),{matches:l}=P.useContext(at),o=l[l.length-1],i=o?o.params:{},s=o?o.pathname:"/",u=o?o.pathnameBase:"/",h=o&&o.route,m=Jt(),v;if(t){var N;let c=typeof t=="string"?kt(t):t;u==="/"||(N=c.pathname)!=null&&N.startsWith(u)||J(!1),v=c}else v=m;let S=v.pathname||"/",w=S;if(u!=="/"){let c=u.replace(/^\//,"").split("/");w="/"+S.replace(/^\//,"").split("/").slice(c.length).join("/")}let E=El(e,{pathname:w}),d=Om(E&&E.map(c=>Object.assign({},c,{params:Object.assign({},i,c.params),pathname:ft([u,a.encodeLocation?a.encodeLocation(c.pathname).pathname:c.pathname]),pathnameBase:c.pathnameBase==="/"?u:ft([u,a.encodeLocation?a.encodeLocation(c.pathnameBase).pathname:c.pathnameBase])})),l,n,r);return t&&d?P.createElement(qr.Provider,{value:{location:Xr({pathname:"/",search:"",hash:"",state:null,key:"default"},v),navigationType:nt.Pop}},d):d}function Lm(){let e=mf(),t=Cl(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",a={padding:"0.5rem",backgroundColor:r},l={padding:"2px 4px",backgroundColor:r};return P.createElement(P.Fragment,null,P.createElement("h2",null,"Unexpected Application Error!"),P.createElement("h3",{style:{fontStyle:"italic"}},t),n?P.createElement("pre",{style:a},n):null,null)}var bm=P.createElement(Lm,null),ls=class extends P.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?P.createElement(at.Provider,{value:this.props.routeContext},P.createElement(uf.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Fm(e){let{routeContext:t,match:n,children:r}=e,a=P.useContext(er);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),P.createElement(at.Provider,{value:t},r)}function Om(e,t,n,r){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var l;if(!n)return null;if(n.errors)e=n.matches;else if((l=r)!=null&&l.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,i=(a=n)==null?void 0:a.errors;if(i!=null){let h=o.findIndex(m=>m.route.id&&i?.[m.route.id]!==void 0);h>=0||J(!1),o=o.slice(0,Math.min(o.length,h+1))}let s=!1,u=-1;if(n&&r&&r.v7_partialHydration)for(let h=0;h<o.length;h++){let m=o[h];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(u=h),m.route.id){let{loaderData:v,errors:N}=n,S=m.route.loader&&v[m.route.id]===void 0&&(!N||N[m.route.id]===void 0);if(m.route.lazy||S){s=!0,u>=0?o=o.slice(0,u+1):o=[o[0]];break}}}return o.reduceRight((h,m,v)=>{let N,S=!1,w=null,E=null;n&&(N=i&&m.route.id?i[m.route.id]:void 0,w=m.route.errorElement||bm,s&&(u<0&&v===0?(jm("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),S=!0,E=null):u===v&&(S=!0,E=m.route.hydrateFallbackElement||null)));let d=t.concat(o.slice(0,v+1)),c=()=>{let f;return N?f=w:S?f=E:m.route.Component?f=P.createElement(m.route.Component,null):m.route.element?f=m.route.element:f=h,P.createElement(Fm,{match:m,routeContext:{outlet:h,matches:d,isDataRoute:n!=null},children:f})};return n&&(m.route.ErrorBoundary||m.route.errorElement||v===0)?P.createElement(ls,{location:n.location,revalidation:n.revalidation,component:w,error:N,children:c(),routeContext:{outlet:null,matches:d,isDataRoute:!0}}):c()},null)}var pf=(function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e})(pf||{}),xl=(function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e})(xl||{});function Um(e){let t=P.useContext(er);return t||J(!1),t}function Am(e){let t=P.useContext(Pl);return t||J(!1),t}function Im(e){let t=P.useContext(at);return t||J(!1),t}function hf(e){let t=Im(e),n=t.matches[t.matches.length-1];return n.route.id||J(!1),n.route.id}function mf(){var e;let t=P.useContext(uf),n=Am(xl.UseRouteError),r=hf(xl.UseRouteError);return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function Mm(){let{router:e}=Um(pf.UseNavigateStable),t=hf(xl.UseNavigateStable),n=P.useRef(!1);return cf(()=>{n.current=!0}),P.useCallback(function(a,l){l===void 0&&(l={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,Xr({fromRouteId:t},l)))},[e,t])}var of={};function jm(e,t,n){!t&&!of[e]&&(of[e]=!0)}var qn=(e,t,n)=>(""+t+("You can use the `"+e+"` future flag to opt-in early. ")+("For more information, see "+n+"."),void 0);function vf(e,t){e?.v7_startTransition===void 0&&qn("v7_startTransition","React Router will begin wrapping state updates in `React.startTransition` in v7","https://reactrouter.com/v6/upgrading/future#v7_starttransition"),e?.v7_relativeSplatPath===void 0&&(!t||t.v7_relativeSplatPath===void 0)&&qn("v7_relativeSplatPath","Relative route resolution within Splat routes is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath"),t&&(t.v7_fetcherPersist===void 0&&qn("v7_fetcherPersist","The persistence behavior of fetchers is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist"),t.v7_normalizeFormMethod===void 0&&qn("v7_normalizeFormMethod","Casing of `formMethod` fields is being normalized to uppercase in v7","https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod"),t.v7_partialHydration===void 0&&qn("v7_partialHydration","`RouterProvider` hydration behavior is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_partialhydration"),t.v7_skipActionErrorRevalidation===void 0&&qn("v7_skipActionErrorRevalidation","The revalidation behavior after 4xx/5xx `action` responses is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation"))}var zm="startTransition",Bv=P[zm];function ss(e){let{to:t,replace:n,state:r,relative:a}=e;wn()||J(!1);let{future:l,static:o}=P.useContext(rt),{matches:i}=P.useContext(at),{pathname:s}=Jt(),u=Gt(),h=Rl(t,kl(i,l.v7_relativeSplatPath),s,a==="path"),m=JSON.stringify(h);return P.useEffect(()=>u(JSON.parse(m),{replace:n,state:r,relative:a}),[u,m,a,n,r]),null}function Xt(e){J(!1)}function us(e){let{basename:t="/",children:n=null,location:r,navigationType:a=nt.Pop,navigator:l,static:o=!1,future:i}=e;wn()&&J(!1);let s=t.replace(/^\/*/,"/"),u=P.useMemo(()=>({basename:s,navigator:l,static:o,future:Xr({v7_relativeSplatPath:!1},i)}),[s,i,l,o]);typeof r=="string"&&(r=kt(r));let{pathname:h="/",search:m="",hash:v="",state:N=null,key:S="default"}=r,w=P.useMemo(()=>{let E=Yt(h,s);return E==null?null:{location:{pathname:E,search:m,hash:v,state:N,key:S},navigationType:a}},[s,h,m,v,N,S,a]);return w==null?null:P.createElement(rt.Provider,{value:u},P.createElement(qr.Provider,{children:n,value:w}))}function cs(e){let{children:t,location:n}=e;return df(Zr(t),n)}var Hv=new Promise(()=>{});function Zr(e,t){t===void 0&&(t=[]);let n=[];return P.Children.forEach(e,(r,a)=>{if(!P.isValidElement(r))return;let l=[...t,a];if(r.type===P.Fragment){n.push.apply(n,Zr(r.props.children,l));return}r.type!==Xt&&J(!1),!r.props.index||!r.props.children||J(!1);let o={id:r.props.id||l.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=Zr(r.props.children,l)),n.push(o)}),n}function $l(){return $l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},$l.apply(this,arguments)}function wf(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,l;for(l=0;l<r.length;l++)a=r[l],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function Qm(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Ym(e,t){return e.button===0&&(!t||t==="_self")&&!Qm(e)}var Jm=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Gm=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"];var Xm="6";try{window.__reactRouterVersion=Xm}catch{}var Zm=z.createContext({isTransitioning:!1});var qm="startTransition",yf=z[qm],ev="flushSync",my=Km[ev],tv="useId",vy=z[tv];function _f(e){let{basename:t,children:n,future:r,window:a}=e,l=z.useRef();l.current==null&&(l.current=tf({window:a,v5Compat:!0}));let o=l.current,[i,s]=z.useState({action:o.action,location:o.location}),{v7_startTransition:u}=r||{},h=z.useCallback(m=>{u&&yf?yf(()=>s(m)):s(m)},[s,u]);return z.useLayoutEffect(()=>o.listen(h),[o,h]),z.useEffect(()=>vf(r),[r]),z.createElement(us,{basename:t,children:n,location:i.location,navigationType:i.action,navigator:o,future:r})}var nv=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",rv=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Zt=z.forwardRef(function(t,n){let{onClick:r,relative:a,reloadDocument:l,replace:o,state:i,target:s,to:u,preventScrollReset:h,viewTransition:m}=t,v=wf(t,Jm),{basename:N}=z.useContext(rt),S,w=!1;if(typeof u=="string"&&rv.test(u)&&(S=u,nv))try{let f=new URL(window.location.href),y=u.startsWith("//")?new URL(f.protocol+u):new URL(u),C=Yt(y.pathname,N);y.origin===f.origin&&C!=null?u=C+y.search+y.hash:w=!0}catch{}let E=os(u,{relative:a}),d=lv(u,{replace:o,state:i,target:s,preventScrollReset:h,relative:a,viewTransition:m});function c(f){r&&r(f),f.defaultPrevented||d(f)}return z.createElement("a",$l({},v,{href:S||E,onClick:w||l?r:c,ref:n,target:s}))}),Tl=z.forwardRef(function(t,n){let{"aria-current":r="page",caseSensitive:a=!1,className:l="",end:o=!1,style:i,to:s,viewTransition:u,children:h}=t,m=wf(t,Gm),v=tr(s,{relative:m.relative}),N=Jt(),S=z.useContext(Pl),{navigator:w,basename:E}=z.useContext(rt),d=S!=null&&ov(v)&&u===!0,c=w.encodeLocation?w.encodeLocation(v).pathname:v.pathname,f=N.pathname,y=S&&S.navigation&&S.navigation.location?S.navigation.location.pathname:null;a||(f=f.toLowerCase(),y=y?y.toLowerCase():null,c=c.toLowerCase()),y&&E&&(y=Yt(y,E)||y);let C=c!=="/"&&c.endsWith("/")?c.length-1:c.length,x=f===c||!o&&f.startsWith(c)&&f.charAt(C)==="/",$=y!=null&&(y===c||!o&&y.startsWith(c)&&y.charAt(c.length)==="/"),b={isActive:x,isPending:$,isTransitioning:d},I=x?r:void 0,F;typeof l=="function"?F=l(b):F=[l,x?"active":null,$?"pending":null,d?"transitioning":null].filter(Boolean).join(" ");let O=typeof i=="function"?i(b):i;return z.createElement(Zt,$l({},m,{"aria-current":I,className:F,ref:n,style:O,to:s,viewTransition:u}),typeof h=="function"?h(b):h)});var ds;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(ds||(ds={}));var gf;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(gf||(gf={}));function av(e){let t=z.useContext(er);return t||J(!1),t}function lv(e,t){let{target:n,replace:r,state:a,preventScrollReset:l,relative:o,viewTransition:i}=t===void 0?{}:t,s=Gt(),u=Jt(),h=tr(e,{relative:o});return z.useCallback(m=>{if(Ym(m,n)){m.preventDefault();let v=r!==void 0?r:gn(u)===gn(h);s(e,{replace:v,state:a,preventScrollReset:l,relative:o,viewTransition:i})}},[u,s,h,r,a,n,e,l,o,i])}function ov(e,t){t===void 0&&(t={});let n=z.useContext(Zm);n==null&&J(!1);let{basename:r}=av(ds.useViewTransitionState),a=tr(e,{relative:t.relative});if(!n.isTransitioning)return!1;let l=Yt(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=Yt(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Qt(a.pathname,o)!=null||Qt(a.pathname,l)!=null}var Sf=function(e,t,n,r){var a;t[0]=0;for(var l=1;l<t.length;l++){var o=t[l++],i=t[l]?(t[0]|=o?1:2,n[t[l++]]):t[++l];o===3?r[0]=i:o===4?r[1]=Object.assign(r[1]||{},i):o===5?(r[1]=r[1]||{})[t[++l]]=i:o===6?r[1][t[++l]]+=i+"":o?(a=e.apply(i,Sf(e,i,n,["",null])),r.push(a),i[0]?t[0]|=2:(t[l-2]=0,t[l]=a)):r.push(i)}return r},Nf=new Map;function Ef(e){var t=Nf.get(this);return t||(t=new Map,Nf.set(this,t)),(t=Sf(this,t.get(e)||(t.set(e,t=(function(n){for(var r,a,l=1,o="",i="",s=[0],u=function(v){l===1&&(v||(o=o.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(0,v,o):l===3&&(v||o)?(s.push(3,v,o),l=2):l===2&&o==="..."&&v?s.push(4,v,0):l===2&&o&&!v?s.push(5,0,!0,o):l>=5&&((o||!v&&l===5)&&(s.push(l,0,o,a),l=6),v&&(s.push(l,v,0,a),l=6)),o=""},h=0;h<n.length;h++){h&&(l===1&&u(),u(h));for(var m=0;m<n[h].length;m++)r=n[h][m],l===1?r==="<"?(u(),s=[s],l=3):o+=r:l===4?o==="--"&&r===">"?(l=1,o=""):o=r+o[0]:i?r===i?i="":o+=r:r==='"'||r==="'"?i=r:r===">"?(u(),l=1):l&&(r==="="?(l=5,a=o,o=""):r==="/"&&(l<5||n[h][m+1]===">")?(u(),l===3&&(s=s[0]),l=s,(s=s[0]).push(2,0,l),l=0):r===" "||r==="	"||r===`
`||r==="\r"?(u(),l=2):o+=r),l===3&&o==="!--"&&(l=4,s=s[0])}return u(),s})(e)),t),arguments,[])).length>1?t:t[0]}var Dl=document.getElementById("boot-fallback"),kf=document.getElementById("boot-fallback-message");function iv(e){kf&&(kf.textContent=e)}function sv(e){e&&iv(e),Dl&&Dl.classList.remove("hidden")}function uv(){Dl&&Dl.classList.add("hidden")}function ea(e,t){t&&console.error(e,t),sv(e)}var _=Ef.bind(L.default.createElement);function Ee(e){return String(e||"unknown").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function cv(e){let t=String(e||"everyday");return t==="special"?"Occasion":t==="current_event"?"Current Event":"Everyday"}function dv(e){let t=String(e||"").toLowerCase();return t==="completed"||t==="approved"?"success":t.includes("reject")||t.includes("timeout")||t.includes("failed")?"danger":t.includes("pending")||t.includes("progress")||t.includes("queued")?"warning":"neutral"}function qt({value:e}){return _`<span className=${`badge ${dv(e)}`}>${Ee(e)}</span>`}function be(e){if(!e)return"-";let t=new Date(e);return Number.isNaN(t.getTime())?"-":t.toLocaleString()}function fv(e){let t=Number(e||0);if(t<=0)return"0 B";let n=["B","KB","MB","GB","TB"],r=Math.min(Math.floor(Math.log(t)/Math.log(1024)),n.length-1);return`${(t/1024**r).toFixed(r===0?0:1)} ${n[r]}`}function Rf(e){if(!e||typeof e!="object")return"";let t=["decision","status","winner_model","endpoint","image_preview_url","final_preview_url","notes"],n=[];return t.forEach(a=>{let l=e[a];l!=null&&String(l).trim()!==""&&n.push(`${a}: ${String(l)}`)}),n.length>0?n.slice(0,3).join(" | "):Object.entries(e).slice(0,2).map(([a,l])=>`${a}: ${String(l)}`).join(" | ")}async function G(e,t={}){let n=new Headers(t.headers||{});t.body&&!n.has("Content-Type")&&n.set("Content-Type","application/json");let r=await fetch(e,{...t,headers:n}),a=await r.text(),l=null;if(a)try{l=JSON.parse(a)}catch{l=a}if(!r.ok){let o=l&&typeof l=="object"&&l.detail?l.detail:r.statusText;throw new Error(o||`Request failed (${r.status})`)}return l}function _n(e,t){let n=String(t?.message||"").trim();return n||`Unable to load ${e}`}function Nn(e){let t=String(e?.message||"").trim().toLowerCase();return t==="not found"||t.includes("404")}function pv(e){return{theme_name:String(e.theme_name||"Internal Theme").trim(),tone_funny_pct:Number(e.tone_funny_pct||20),tone_emotion_pct:Number(e.tone_emotion_pct||80),tone_style:String(e.tone_style||"conversational"),audience:String(e.audience||"internal reviewer").trim(),cultural_context:String(e.cultural_context||"global").trim(),output_spec:{format:"paragraph",length:{target_words:80},structure:{no_lists:!0,no_numbering:!0}},avoid_cliches:!0,rendering:{theme_style:"minimal",text_alignment:"center",export_size:"1080x1350"}}}function hv(e){return!e||typeof e!="object"?null:{theme_name:String(e.theme_name||"Internal Theme").trim(),audience:String(e.audience||"internal reviewer").trim(),cultural_context:String(e.cultural_context||"global").trim(),tone_style:String(e.tone_style||"conversational").trim(),tone_funny_pct:Number(e.tone_funny_pct??20),tone_emotion_pct:Number(e.tone_emotion_pct??80)}}function Cf(e){return String(e||"").split(",").map(t=>t.trim()).filter(Boolean)}function xf(e){if(!e)return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toISOString().slice(0,10)}function Pf(e){if(!e)return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=t.getTimezoneOffset()*60*1e3;return new Date(t.getTime()-n).toISOString().slice(0,16)}function fs(e,t=140){let n=String(e||"").trim();return n?n.length<=t?n:`${n.slice(0,t-1).trimEnd()}...`:""}function Df(e){return typeof e=="string"?e.trim():""}function mv(e){let t=Df(e);if(!t)return!1;if(t.startsWith("data:image/"))return!0;try{let n=new URL(t,window.location.origin);return/\.(png|jpe?g|webp|gif|svg)$/i.test(n.pathname)}catch{return!1}}function ps(e,t=[]){if(!e||typeof e!="object")return[];let n=[],r=new Set,a=(l,o,i)=>{let s=Df(o);!s||r.has(s)||!mv(s)||(r.add(s),n.push({label:l,url:s,source:i}))};if(a("Final Preview",e.final_preview_url,"final_preview_url"),a("Final PNG",e.final_asset_urls&&typeof e.final_asset_urls=="object"?e.final_asset_urls.png:"","final_asset_urls.png"),a("Image Preview",e.image_preview_url,"image_preview_url"),a("Content Preview",e.content_preview_url,"content_preview_url"),Array.isArray(t)){let l={final_preview:"Final Preview",final_png:"Final PNG",image_preview:"Image Preview",content_preview:"Content Preview"};t.forEach(o=>{let i=String(o?.asset_type||"").toLowerCase(),s=l[i];s&&a(s,o.public_url||o.asset_url,`asset:${i}`)})}return n}function Ll(e){let t=(0,L.useMemo)(()=>e.map(i=>`${i.source}:${i.url}`).join("|"),[e]),[n,r]=(0,L.useState)(0);(0,L.useEffect)(()=>{r(0)},[t]);let a=n<e.length?e[n]:null,l=e.length>0&&n>=e.length;function o(){r(i=>i+1)}return{currentCandidate:a,exhausted:l,handleError:o}}function vv({image:e}){let t=(0,L.useMemo)(()=>!e||!e.url?[]:[{label:e.label||"Preview",url:e.url,source:e.label||"preview"}],[e]),{currentCandidate:n,exhausted:r,handleError:a}=Ll(t);return _`
      <article className="image-card">
        ${n?_`
              <a href=${n.url} target="_blank" rel="noreferrer">
                <img src=${n.url} alt=${e.label} loading="lazy" onError=${a} />
              </a>
            `:_`<p className="empty-state">${r?"Preview unavailable.":"No preview available yet."}</p>`}
        <p className="image-caption">${e.label}</p>
      </article>
    `}function yv({job:e,actionState:t,onArchive:n,onDelete:r}){let a=(0,L.useMemo)(()=>ps(e),[e]),{currentCandidate:l,exhausted:o,handleError:i}=Ll(a),s=fs(e.content_preview||"Content preview will appear here after generation.",180);return _`
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
              <p className="ecard-meta">${be(e.created_at)}</p>
            </div>
            <${qt} value=${e.status} />
          </div>
          <div className="ecard-stage-row">
            <span className="ecard-stage">${Ee(e.current_stage)}</span>
            <span className="ecard-job-id">${e.job_id}</span>
          </div>
          <div className="ecard-actions">
            <${Zt} to=${`/jobs/${e.job_id}`} className="button-link">View Details<//>
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
    `}function gv(){let e=Gt(),[t,n]=(0,L.useState)([]),[r,a]=(0,L.useState)(null),[l,o]=(0,L.useState)([]),[i,s]=(0,L.useState)(null),[u,h]=(0,L.useState)(!1),[m,v]=(0,L.useState)(!1),[N,S]=(0,L.useState)(!1),[w,E]=(0,L.useState)(""),[d,c]=(0,L.useState)(""),[f,y]=(0,L.useState)(""),[C,x]=(0,L.useState)(""),[$,b]=(0,L.useState)(""),[I,F]=(0,L.useState)(!1),[O,ne]=(0,L.useState)(!1),[V,ue]=(0,L.useState)(!1),[ce,ye]=(0,L.useState)(""),[de,R]=(0,L.useState)({theme_name:"Internal Launch Sprint",audience:"operations team",cultural_context:"global",tone_style:"conversational",tone_funny_pct:20,tone_emotion_pct:80}),H=i&&typeof i=="object"&&i.theme||null,oe=(0,L.useMemo)(()=>{let T=0,p=0,g=0;return t.forEach(M=>{let A=String(M.status||"").toLowerCase();if(A==="completed"){p+=1;return}if(A.includes("reject")||A.includes("timeout")||A.includes("failed")){g+=1;return}A!=="archived"&&(T+=1)}),{active:T,completed:p,failed:g}},[t]);async function Z(){h(!0),v(!0),S(!0),E(""),c(""),y(""),x("");let[T,p,g,M]=await Promise.allSettled([G("/api/jobs?limit=50"),G("/api/storage/summary"),G("/api/themes/schedule"),G("/api/themes/today")]),A="";if(T.status==="fulfilled"?n(Array.isArray(T.value)?T.value:[]):(n([]),E(_n("jobs",T.reason))),p.status==="fulfilled"?a(p.value||null):(a(null),c(_n("storage summary",p.reason))),g.status==="fulfilled"){let ms=Array.isArray(g.value)?[]:Array.isArray(g.value?.week_schedule)?g.value.week_schedule:[];o(ms),ms.length===0&&(A="Theme schedule not configured yet")}else o([]),Nn(g.reason)?A="Theme Factory not configured yet":y(_n("Theme Factory schedule",g.reason));M.status==="fulfilled"?(s(M.value||null),!A&&M.value?.resolved===!1?A=M.value?.message||"Theme schedule not configured yet":!A&&!M.value?.theme&&(A="Theme schedule not configured yet")):(s(null),Nn(M.reason)?A=A||"Theme schedule not configured yet":y(_n("today's theme",M.reason))),x(A),h(!1),v(!1),S(!1);let Qe=g.status!=="fulfilled"&&!Nn(g.reason),Lf=M.status!=="fulfilled"&&!Nn(M.reason),bf=T.status!=="fulfilled"||p.status!=="fulfilled"||Qe||Lf;b(bf?`Refresh completed with errors at ${new Date().toLocaleTimeString()}`:`Refreshed ${new Date().toLocaleTimeString()}`)}(0,L.useEffect)(()=>{Z()},[]);async function en(T){T.preventDefault(),ne(!0),E("");try{let p=pv(de),g=await G("/api/jobs/start",{method:"POST",body:JSON.stringify(p)});F(!1),b(`Created ${g.job_id}`),await Z(),e(`/jobs/${g.job_id}`)}catch(p){E(p.message||"Unable to create new job")}finally{ne(!1)}}function lt(T,p){R(g=>({...g,[T]:p}))}function Rt(){let T=hv(H);T&&R(p=>({...p,...T}))}async function Sn(){ue(!0),y("");try{let T=await G("/api/jobs/create-daily-theme-job",{method:"POST"});b(`Created ${T.job_id} from today's theme`),await Z(),e(`/jobs/${T.job_id}`)}catch(T){y(T.message||"Unable to create today's themed job")}finally{ue(!1)}}async function pt(T){ye(`archive:${T.job_id}`),E("");try{await G(`/api/jobs/${T.job_id}/archive`,{method:"POST"}),b(`Archived ${T.job_id}`),await Z()}catch(p){E(p.message||"Unable to archive job")}finally{ye("")}}async function bl(T){if(window.confirm(`Delete ${T.job_id} and associated files?`)){ye(`delete:${T.job_id}`),E("");try{await G(`/api/jobs/${T.job_id}`,{method:"DELETE"}),b(`Deleted ${T.job_id}`),await Z()}catch(g){E(g.message||"Unable to delete job")}finally{ye("")}}}return _`
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
            <button type="button" className="button primary" onClick=${()=>F(!0)}>Create New Card Job</button>
            <button
              type="button"
              className="button"
              onClick=${Z}
              disabled=${u||m||N}
            >
              Refresh
            </button>
            <${Zt} to="/themes" className="button-link">Open Theme Factory<//>
            <${Zt} to="/compare" className="button-link">Open Compare Lab<//>
          </div>
        </header>

        ${$?_`<p className="status-line">${$}</p>`:null}

        ${u||m||N||w||d||f?_`
              <div className="status-stack">
                ${u?_`<div className="status-panel warning">Loading jobs from /api/jobs...</div>`:null}
                ${m?_`<div className="status-panel warning">Loading storage summary from /api/storage/summary...</div>`:null}
                ${N?_`<div className="status-panel warning">Loading Theme Factory data from /api/themes/schedule...</div>`:null}
                ${w?_`<div className="status-panel error">Unable to load jobs: ${w}</div>`:null}
                ${d?_`<div className="status-panel error">Unable to load storage summary: ${d}</div>`:null}
                ${f?_`<div className="status-panel error">Theme error: ${f}</div>`:null}
              </div>
            `:null}

        <section className="cards-grid">
          <article className="summary-card">
            <p className="summary-label">Active Jobs</p>
            <p className="summary-value">${u?"...":oe.active}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Completed Jobs</p>
            <p className="summary-value">${u?"...":oe.completed}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Failed Jobs</p>
            <p className="summary-value">${u?"...":oe.failed}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Storage Usage</p>
            <p className="summary-value">${m?"...":r?fv(r.total_bytes):"Unavailable"}</p>
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
                      <button type="button" className="button primary" onClick=${()=>F(!0)}>
                        Create New Card Job
                      </button>
                    </div>
                  `:_`
                    <div className="ecard-grid">
                      ${t.map(T=>_`
                          <${yv}
                            key=${T.job_id}
                            job=${T}
                            actionState=${ce}
                            onArchive=${pt}
                            onDelete=${bl}
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
                ${H?`Today's Theme: ${H.theme_name} (${Ee(i?.weekday)})`:C||"Today's Theme: Unavailable"}
              </p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button primary"
                onClick=${Sn}
                disabled=${V||N||!H}
              >
                ${V?"Generating...":"Generate Today's Card"}
              </button>
              <${Zt} to="/themes" className="button-link">Manage Themes<//>
            </div>
          </div>
          ${C?_`<div className="status-panel neutral">${C}</div>`:null}
          ${N?_`<p className="empty-state">Loading weekly schedule...</p>`:l.length===0?_`<p className="empty-state">Theme schedule not configured yet.</p>`:_`
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
                        ${l.map(T=>_`
                            <tr key=${`${T.plan_date}_${T.weekday}`}>
                              <td>${be(T.plan_date)}</td>
                              <td>${Ee(T.weekday)}</td>
                              <td>${T.theme?.theme_name||"-"}</td>
                              <td>${Ee(T.source)}</td>
                              <td>${T.theme?.tone_style||"-"}</td>
                              <td>${T.theme?.audience||"-"}</td>
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
                          ${t.map(T=>_`
                              <tr key=${T.job_id}>
                                <td><${Zt} className="job-link" to=${`/jobs/${T.job_id}`}>${T.job_id}<//></td>
                                <td>${T.theme_name||"-"}</td>
                                <td>${Ee(T.current_stage)}</td>
                                <td><${qt} value=${T.status} /></td>
                                <td>${be(T.created_at)}</td>
                                <td>${be(T.updated_at)}</td>
                              </tr>
                            `)}
                        </tbody>
                      </table>
                    </div>
                  `}
        </section>

        ${I?_`
              <div className="modal-backdrop" onClick=${()=>F(!1)}>
                <section className="modal" onClick=${T=>T.stopPropagation()}>
                  <h2 className="section-title">Create New Workflow Job</h2>
                  <p className="section-copy">Starts generation and opens approval flow.</p>
                  <form onSubmit=${en}>
                    <div className="form-grid">
                      <div className="form-field full">
                        <label htmlFor="themeName">Theme Name</label>
                        <input
                          id="themeName"
                          value=${de.theme_name}
                          onInput=${T=>lt("theme_name",T.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="audience">Audience</label>
                        <input
                          id="audience"
                          value=${de.audience}
                          onInput=${T=>lt("audience",T.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="culturalContext">Cultural Context</label>
                        <input
                          id="culturalContext"
                          value=${de.cultural_context}
                          onInput=${T=>lt("cultural_context",T.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="toneStyle">Tone Style</label>
                        <select
                          id="toneStyle"
                          value=${de.tone_style}
                          onChange=${T=>lt("tone_style",T.target.value)}
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
                          value=${de.tone_funny_pct}
                          onInput=${T=>lt("tone_funny_pct",T.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="emotionPct">Emotion %</label>
                        <input
                          id="emotionPct"
                          type="number"
                          min="0"
                          max="100"
                          value=${de.tone_emotion_pct}
                          onInput=${T=>lt("tone_emotion_pct",T.target.value)}
                        />
                      </div>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button
                        type="button"
                        className="button"
                        onClick=${Rt}
                        disabled=${!H}
                      >
                        Use Today's Theme
                      </button>
                      <button type="submit" className="button primary" disabled=${O}>
                        ${O?"Creating...":"Create Job"}
                      </button>
                      <button type="button" className="button" onClick=${()=>F(!1)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}
      </section>
    `}function wv(){let e=Gt(),{jobId:t}=is(),[n,r]=(0,L.useState)(null),[a,l]=(0,L.useState)([]),[o,i]=(0,L.useState)([]),[s,u]=(0,L.useState)([]),[h,m]=(0,L.useState)([]),[v,N]=(0,L.useState)([]),[S,w]=(0,L.useState)(!1),[E,d]=(0,L.useState)(""),[c,f]=(0,L.useState)(""),[y,C]=(0,L.useState)("");async function x(){if(t){w(!0),f("");try{let[R,H,oe,Z,en]=await Promise.all([G(`/api/jobs/${t}`),G(`/api/jobs/${t}/assets`),G(`/api/jobs/${t}/events`),G(`/api/jobs/${t}/candidates`),G(`/api/jobs/${t}/shortlist`)]);r(R||null),l(Array.isArray(H)?H:[]),i(Array.isArray(oe)?oe:[]);let lt=Array.isArray(Z)?Z:[],Rt=Array.isArray(en)?en:[];u(lt),m(Rt);let Sn=Rt.filter(pt=>pt.is_selected).map(pt=>Number(pt.candidate_id)).filter(pt=>Number.isInteger(pt));N(Sn.length>0?Sn:Rt[0]?[Number(Rt[0].candidate_id)]:[])}catch(R){f(R.message||"Unable to load job detail")}finally{w(!1)}}}(0,L.useEffect)(()=>{x()},[t]);let $=(0,L.useMemo)(()=>{if(!n)return[];let R=String(n.status||"").toLowerCase(),H=n.content_preview?"completed":R.startsWith("content")?"in_progress":"pending",oe=n.image_preview_url||R.startsWith("final")||R==="completed"?"completed":R.startsWith("image")?"in_progress":"pending",Z=n.final_asset_urls&&(n.final_asset_urls.png||n.final_asset_urls.pdf)?"completed":R.startsWith("final")?"in_progress":R==="completed"?"completed":"pending";return[{label:"content_generation_status",value:H},{label:"content_approval_status",value:n.content_approval_status||"pending"},{label:"image_generation_status",value:oe},{label:"image_approval_status",value:n.image_approval_status||"pending"},{label:"final_render_status",value:Z},{label:"final_approval_status",value:n.final_approval_status||"pending"}]},[n]),b=(0,L.useMemo)(()=>n?ps(n,a):[],[n,a]),I=Ll(b),F=(0,L.useMemo)(()=>n?ps({image_preview_url:n.image_preview_url,content_preview_url:n.content_preview_url},a.filter(R=>String(R?.asset_type||"").toLowerCase()==="image_preview")):[],[n,a]),O=Ll(F),ne=(0,L.useMemo)(()=>a.filter(R=>String(R?.asset_type||"").toLowerCase()==="shortlist_preview").map((R,H)=>({label:`Shortlist Preview ${H+1}`,url:R.public_url||R.asset_url,source:`shortlist_preview:${H}`})).filter(R=>R.url),[a]);async function V(R){if(!t)return;let H={content:`/api/jobs/${t}/rerun/content`,image:`/api/jobs/${t}/rerun/image`,final_render:`/api/jobs/${t}/rerun/final-render`,full:`/api/jobs/${t}/rerun/full`},oe=`rerun:${R}`;d(oe),f("");try{let Z=await G(H[R],{method:"POST"});C(`Reran ${Ee(R)} for ${Z.job_id} (retry ${Z.retry_count})`),await x()}catch(Z){f(Z.message||`Unable to rerun ${Ee(R)}`)}finally{d("")}}function ue(R,H){N(oe=>{let Z=new Set(oe);return H?Z.add(R):Z.delete(R),Array.from(Z)})}async function ce(){if(t){d("render-shortlist"),f("");try{let R=await G(`/api/jobs/${t}/render-shortlist`,{method:"POST",body:JSON.stringify({candidate_ids:v})});C(`Rendered ${R.rendered_count} shortlist preview card(s)`),await x()}catch(R){f(R.message||"Unable to render shortlist")}finally{d("")}}}async function ye(){if(t){d("archive"),f("");try{let R=await G(`/api/jobs/${t}/archive`,{method:"POST"});C(`Job archived (${be(R.updated_at)})`),await x()}catch(R){f(R.message||"Unable to archive job")}finally{d("")}}}async function de(){if(!(!t||!window.confirm(`Delete ${t} and associated files?`))){d("delete"),f("");try{await G(`/api/jobs/${t}`,{method:"DELETE"}),e("/")}catch(H){f(H.message||"Unable to delete job")}finally{d("")}}}return _`
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
              onClick=${ye}
              disabled=${E==="archive"}
            >
              ${E==="archive"?"Archiving...":"Archive Job"}
            </button>
            <button
              className="button danger"
              type="button"
              onClick=${de}
              disabled=${E==="delete"}
            >
              ${E==="delete"?"Deleting...":"Delete Job + Files"}
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
                  <${qt} value=${n.status} />
                </div>
                <div className="key-value-grid">
                  ${$.map(R=>_`
                      <article className="key-card" key=${R.label}>
                        <p className="key-label">${R.label}</p>
                        <p className="key-value"><${qt} value=${R.value} /></p>
                      </article>
                    `)}
                </div>
                <div className="key-value-grid job-meta-grid">
                  <article className="key-card">
                    <p className="key-label">retry_count</p>
                    <p className="key-value">${n.retry_count||0}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">last_stage_started_at</p>
                    <p className="key-value">${be(n.last_stage_started_at)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">last_stage_finished_at</p>
                    <p className="key-value">${be(n.last_stage_finished_at)}</p>
                  </article>
                </div>
                <div className="section-head section-subhead">
                  <div>
                    <h2 className="section-title">Stage Reruns</h2>
                    <p className="section-copy">Operational rerun controls for each major workflow stage.</p>
                  </div>
                </div>
                <div className="inline-actions padded-actions">
                  <button type="button" className="button" onClick=${()=>V("content")} disabled=${E==="rerun:content"}>
                    ${E==="rerun:content"?"Rerunning...":"Rerun Content"}
                  </button>
                  <button type="button" className="button" onClick=${()=>V("image")} disabled=${E==="rerun:image"}>
                    ${E==="rerun:image"?"Rerunning...":"Rerun Image"}
                  </button>
                  <button type="button" className="button" onClick=${()=>V("final_render")} disabled=${E==="rerun:final_render"}>
                    ${E==="rerun:final_render"?"Rerunning...":"Rerun Final Render"}
                  </button>
                  <button type="button" className="button primary" onClick=${()=>V("full")} disabled=${E==="rerun:full"}>
                    ${E==="rerun:full"?"Rerunning...":"Rerun Full Workflow"}
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
                          ${o.slice().reverse().map((R,H)=>_`
                                <li key=${`${R.event_type}_${H}`} className="list-item">
                                  <p className="event-type">${R.event_type}</p>
                                  <p className="event-meta">${be(R.created_at)}</p>
                                  ${Rf(R.event_payload_json)?_`<p className="event-meta">${Rf(R.event_payload_json)}</p>`:null}
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
                              ${a.map((R,H)=>_`
                                  <tr key=${`${R.asset_type}_${H}`}>
                                    <td>${R.asset_type}</td>
                                    <td>
                                      ${R.asset_url?_`<a className="job-link" href=${R.asset_url} target="_blank" rel="noreferrer">open</a>`:"-"}
                                    </td>
                                    <td><code>${R.relative_path||"-"}</code></td>
                                    <td><code>${R.absolute_path||"-"}</code></td>
                                    <td><${qt} value=${R.approved?"approved":"pending"} /></td>
                                    <td>${be(R.created_at)}</td>
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
                    <h2 className="section-title">Candidate Pool</h2>
                    <p className="section-copy">All generated candidates across models before shortlist selection.</p>
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
                            ${s.map(R=>_`
                                <tr key=${R.id||`${R.model}_${R.text}`}>
                                  <td>${R.model}</td>
                                  <td>${Number(R.raw_score||0).toFixed(3)}</td>
                                  <td>${Number(R.judged_score??R.judge_score??0).toFixed(3)}</td>
                                  <td><${qt} value=${R.is_shortlisted?"shortlisted":"pooled"} /></td>
                                  <td><${qt} value=${R.is_selected?"selected":"not_selected"} /></td>
                                  <td>${fs(R.text||R.content_text,200)}</td>
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
                    <h2 className="section-title">Top 10 Shortlist</h2>
                    <p className="section-copy">Select shortlisted phrases and render internal card previews from them.</p>
                  </div>
                  <button type="button" className="button primary" onClick=${ce} disabled=${E==="render-shortlist"||h.length===0}>
                    ${E==="render-shortlist"?"Rendering...":"Render Shortlist"}
                  </button>
                </div>
                ${h.length===0?_`<p className="empty-state">No shortlist available for this job yet.</p>`:_`
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
                            ${h.map(R=>_`
                                <tr key=${R.candidate_id}>
                                  <td>
                                    <input
                                      type="checkbox"
                                      checked=${v.includes(Number(R.candidate_id))}
                                      onChange=${H=>ue(Number(R.candidate_id),H.target.checked)}
                                    />
                                  </td>
                                  <td>${R.rank}</td>
                                  <td>${R.model}</td>
                                  <td>${Number(R.score||0).toFixed(3)}</td>
                                  <td>${fs(R.text,220)}</td>
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
                    <h2 className="section-title">Generated Card Preview</h2>
                    <p className="section-copy">Best available final or preview image for this job.</p>
                  </div>
                </div>
                ${I.currentCandidate?_`
                      <div className="hero-preview">
                        <a href=${I.currentCandidate.url} target="_blank" rel="noreferrer">
                          <img
                            src=${I.currentCandidate.url}
                            alt=${n.theme_name||"Generated eCard"}
                            loading="lazy"
                            onError=${I.handleError}
                          />
                        </a>
                      </div>
                    `:I.exhausted?_`<p className="empty-state">Preview unavailable.</p>`:_`<p className="empty-state">No preview or final image available yet.</p>`}
              </section>

              <section className="two-column">
                <section className="section-panel">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">Image Preview</h2>
                      <p className="section-copy">Intermediate generated image if available.</p>
                    </div>
                  </div>
                  ${O.currentCandidate?_`
                        <div className="image-grid image-grid-single">
                          <article className="image-card">
                            <a href=${O.currentCandidate.url} target="_blank" rel="noreferrer">
                              <img
                                src=${O.currentCandidate.url}
                                alt="Image Preview"
                                loading="lazy"
                                onError=${O.handleError}
                              />
                            </a>
                            <p className="image-caption">Image Preview</p>
                          </article>
                        </div>
                      `:O.exhausted?_`<p className="empty-state">Preview unavailable.</p>`:_`<p className="empty-state">No image preview available yet.</p>`}
                </section>

                <section className="section-panel">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">Content Preview</h2>
                      <p className="section-copy">Approved or generated message copy stored on the job.</p>
                    </div>
                  </div>
                  ${n.content_preview?_`<div className="content-preview-block">${n.content_preview}</div>`:_`<p className="empty-state">No content preview stored yet.</p>`}
                </section>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Additional Previews</h2>
                    <p className="section-copy">All preview variants, shortlist renders, and exported images discovered on this job.</p>
                  </div>
                </div>
                ${b.length===0&&ne.length===0?_`<p className="empty-state">No preview variants available yet.</p>`:_`
                      <div className="image-grid">
                        ${[...b,...ne].map(R=>_`
                            <${vv} key=${R.url} image=${R} />
                          `)}
                      </div>
                    `}
              </section>
            `:_`<p className="empty-state">${S?"Loading job details...":"Job not found."}</p>`}
      </section>
    `}function _v(){let e=Gt(),[t,n]=(0,L.useState)([]),[r,a]=(0,L.useState)({week_schedule:[],month_schedule:[],active_overrides:[]}),[l,o]=(0,L.useState)(null),[i,s]=(0,L.useState)(!1),[u,h]=(0,L.useState)(""),[m,v]=(0,L.useState)(""),[N,S]=(0,L.useState)(""),[w,E]=(0,L.useState)(""),[d,c]=(0,L.useState)(!1),[f,y]=(0,L.useState)(!1),[C,x]=(0,L.useState)(!1),[$,b]=(0,L.useState)(null),[I,F]=(0,L.useState)(null),[O,ne]=(0,L.useState)({theme_key:"",theme_name:"",description:"",theme_bucket:"everyday",theme_type:"evergreen",cultural_context:"global",tone_style:"conversational",default_funny_pct:20,default_emotion_pct:80,default_audience:"general audience",default_visual_style:"minimal",is_active:!0,priority:0}),[V,ue]=(0,L.useState)({theme_id:"",schedule_type:"weekly_recurring",start_date:"",end_date:"",weekday_mask:"monday",month_mask:"",region:"",country:"",is_active:!0,priority:0,notes:""}),[ce,ye]=(0,L.useState)({theme_id:"",override_scope:"editorial",start_at:"",end_at:"",reason:"",force_top_priority:!0,created_by:"console_admin"}),de=l&&typeof l=="object"&&l.theme||null,R=(0,L.useMemo)(()=>t.reduce((p,g)=>{let M=String(g.theme_bucket||"everyday");return p[M]=(p[M]||0)+1,p},{everyday:0,special:0,current_event:0}),[t]),H=(0,L.useMemo)(()=>[{key:"everyday",title:"Everyday Themes",description:"Recurring weekday themes that keep the console stocked with steady daily runs.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="everyday")},{key:"special",title:"Occasion Themes",description:"Date-range and seasonal campaign themes such as Ramadan, Holi, and Valentine's Week.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="special")},{key:"current_event",title:"Current Event Themes",description:"Editorial and trend-driven themes that are intended to be activated through overrides.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="current_event")}],[t]);async function oe(){s(!0),h(""),v("");let[p,g,M]=await Promise.allSettled([G("/api/themes"),G("/api/themes/today"),G("/api/themes/schedule")]);if(p.status==="fulfilled"){let A=Array.isArray(p.value)?p.value:[];n(A),A.length>0&&(ue(Qe=>({...Qe,theme_id:String(Qe.theme_id||A[0].id)})),ye(Qe=>({...Qe,theme_id:String(Qe.theme_id||A[0].id)}))),A.length===0&&v("Theme schedule not configured yet")}else n([]),Nn(p.reason)?v("Theme schedule not configured yet"):h(_n("theme catalog",p.reason));if(g.status==="fulfilled"?(o(g.value||null),g.value?.resolved===!1&&v(A=>A||g.value?.message||"No theme resolved yet")):(o(null),Nn(g.reason)?v(A=>A||"No theme resolved yet"):h(A=>A||_n("today's theme",g.reason))),M.status==="fulfilled"){if(Array.isArray(M.value)){a({week_schedule:[],month_schedule:[],active_overrides:[]}),v(A=>A||"Theme schedule not configured yet"),s(!1);return}a({week_schedule:Array.isArray(M.value?.week_schedule)?M.value.week_schedule:[],month_schedule:Array.isArray(M.value?.month_schedule)?M.value.month_schedule:[],active_overrides:Array.isArray(M.value?.active_overrides)?M.value.active_overrides:[]})}else a({week_schedule:[],month_schedule:[],active_overrides:[]}),Nn(M.reason)?v(A=>A||"Theme schedule not configured yet"):h(A=>A||_n("theme schedule",M.reason));s(!1)}(0,L.useEffect)(()=>{oe()},[]);function Z(p=null){b(p?p.id:null),ne({theme_key:p?.theme_key||"",theme_name:p?.theme_name||"",description:p?.description||"",theme_bucket:p?.theme_bucket||"everyday",theme_type:p?.theme_type||"evergreen",cultural_context:p?.cultural_context||"global",tone_style:p?.tone_style||"conversational",default_funny_pct:p?.default_funny_pct??20,default_emotion_pct:p?.default_emotion_pct??80,default_audience:p?.default_audience||"general audience",default_visual_style:p?.default_visual_style||"minimal",is_active:p?.is_active??!0,priority:p?.priority??0}),c(!0)}function en(p=null){F(p?p.id:null),ue({theme_id:String(p?.theme_id||t[0]?.id||""),schedule_type:p?.schedule_type||"weekly_recurring",start_date:xf(p?.start_date),end_date:xf(p?.end_date),weekday_mask:Array.isArray(p?.weekday_mask)?p.weekday_mask.join(", "):"monday",month_mask:Array.isArray(p?.month_mask)?p.month_mask.join(", "):"",region:p?.region||"",country:p?.country||"",is_active:p?.is_active??!0,priority:p?.priority??0,notes:p?.notes||""}),y(!0)}function lt(p=null){let g=new Date,M=new Date(g.getTime()+1440*60*1e3);ye({theme_id:String(p||de?.theme_id||t[0]?.id||""),override_scope:"editorial",start_at:Pf(g.toISOString()),end_at:Pf(M.toISOString()),reason:"",force_top_priority:!0,created_by:"console_admin"}),x(!0)}async function Rt(p){p.preventDefault(),E("save-theme"),h("");try{let g={theme_key:String(O.theme_key||"").trim(),theme_name:String(O.theme_name||"").trim(),description:String(O.description||"").trim()||null,theme_bucket:O.theme_bucket,theme_type:O.theme_type,cultural_context:String(O.cultural_context||"").trim()||null,tone_style:String(O.tone_style||"").trim(),default_funny_pct:Number(O.default_funny_pct||0),default_emotion_pct:Number(O.default_emotion_pct||0),default_audience:String(O.default_audience||"").trim(),default_visual_style:String(O.default_visual_style||"").trim(),is_active:!!O.is_active,priority:Number(O.priority||0)},M=$?`/api/themes/${$}`:"/api/themes";await G(M,{method:$?"PUT":"POST",body:JSON.stringify(g)}),c(!1),S($?"Theme updated":"Theme created"),await oe()}catch(g){h(g.message||"Unable to save theme")}finally{E("")}}async function Sn(p){if(window.confirm(`Deactivate theme ${p.theme_name}?`)){E(`delete-theme:${p.id}`),h("");try{await G(`/api/themes/${p.id}`,{method:"DELETE"}),S(`Theme deactivated: ${p.theme_name}`),await oe()}catch(M){h(M.message||"Unable to delete theme")}finally{E("")}}}async function pt(p){p.preventDefault(),E("save-schedule"),h("");try{let g={theme_id:Number(V.theme_id),schedule_type:V.schedule_type,start_date:V.start_date||null,end_date:V.end_date||null,weekday_mask:Cf(V.weekday_mask),month_mask:Cf(V.month_mask).map(Qe=>Number(Qe)).filter(Qe=>Number.isInteger(Qe)),region:String(V.region||"").trim()||null,country:String(V.country||"").trim()||null,is_active:!!V.is_active,priority:Number(V.priority||0),notes:String(V.notes||"").trim()||null},M=I?`/api/themes/schedule/${I}`:"/api/themes/schedule";await G(M,{method:I?"PUT":"POST",body:JSON.stringify(g)}),y(!1),S(I?"Schedule updated":"Schedule created"),await oe()}catch(g){h(g.message||"Unable to save schedule")}finally{E("")}}async function bl(p){p.preventDefault(),E("save-override"),h("");try{let g={theme_id:Number(ce.theme_id),override_scope:String(ce.override_scope||"").trim(),start_at:new Date(ce.start_at).toISOString(),end_at:new Date(ce.end_at).toISOString(),reason:String(ce.reason||"").trim()||null,force_top_priority:!!ce.force_top_priority,created_by:String(ce.created_by||"console_admin").trim()};await G("/api/themes/overrides",{method:"POST",body:JSON.stringify(g)}),x(!1),S("Override created"),await oe()}catch(g){h(g.message||"Unable to save override")}finally{E("")}}async function T(){E("create-today-job"),h("");try{let p=await G("/api/jobs/create-daily-theme-job",{method:"POST"});S(`Created ${p.job_id} from today's theme`),e(`/jobs/${p.job_id}`)}catch(p){h(p.message||"Unable to create today's themed job")}finally{E("")}}return _`
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
              onClick=${T}
              disabled=${w==="create-today-job"||!de}
            >
              ${w==="create-today-job"?"Creating...":"Use Today's Theme"}
            </button>
            <button type="button" className="button" onClick=${oe} disabled=${i}>Refresh</button>
            <${Zt} to="/" className="button-link">Workflow Console<//>
          </div>
        </header>

        ${u?_`<div className="status-panel error">${u}</div>`:null}
        ${m?_`<div className="status-panel neutral">${m}</div>`:null}
        ${N?_`<p className="status-line">${N}</p>`:null}
        ${i?_`<div className="status-panel warning">Loading Theme Factory data...</div>`:null}

        <section className="cards-grid">
          <article className="summary-card">
            <p className="summary-label">Everyday Themes</p>
            <p className="summary-value">${R.everyday}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Occasion Themes</p>
            <p className="summary-value">${R.special}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Current Event Themes</p>
            <p className="summary-value">${R.current_event}</p>
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
          ${de?_`
                <div className="key-value-grid">
                  <article className="key-card">
                    <p className="key-label">Theme</p>
                    <p className="key-value">${de.theme_name}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Bucket</p>
                    <p className="key-value">${cv(de.theme_bucket)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Source</p>
                    <p className="key-value">${Ee(l?.source)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Weekday</p>
                    <p className="key-value">${Ee(l?.weekday)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Audience</p>
                    <p className="key-value">${de.audience}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Tone</p>
                    <p className="key-value">${de.tone_style}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Priority</p>
                    <p className="key-value">${de.priority}</p>
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
              <button type="button" className="button primary" onClick=${()=>Z()}>Add Theme</button>
            </div>
          </div>
          ${t.length===0?_`<p className="empty-state">No theme catalog entries found.</p>`:_`
                ${H.map(p=>_`
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
                                        <td>${Ee(g.theme_type)}</td>
                                        <td>${g.default_audience}</td>
                                        <td>${g.default_visual_style}</td>
                                        <td>${g.priority}</td>
                                        <td><${qt} value=${g.is_active?"active":"inactive"} /></td>
                                        <td>
                                          <div className="inline-actions">
                                            <button type="button" className="button" onClick=${()=>Z(g)}>Edit</button>
                                            <button
                                              type="button"
                                              className="button danger"
                                              onClick=${()=>Sn(g)}
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
              <button type="button" className="button primary" onClick=${()=>en()}>Add Schedule</button>
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
                              <td>${be(p.plan_date)}</td>
                              <td>${Ee(p.weekday)}</td>
                              <td>${p.theme?.theme_name||"-"}</td>
                              <td>${Ee(p.source)}</td>
                              <td>${Ee(p.schedule_type)}</td>
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
              <button type="button" className="button primary" onClick=${()=>lt()}>Add Override</button>
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
                              <td>${Ee(p.override_scope)}</td>
                              <td>${be(p.start_at)} - ${be(p.end_at)}</td>
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
                        <th>month_mask</th>
                        <th>priority</th>
                        <th>actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${r.month_schedule.map(p=>_`
                          <tr key=${p.id}>
                            <td>${p.theme_name||"-"}</td>
                            <td>${Ee(p.schedule_type)}</td>
                            <td>${p.start_date?be(p.start_date):"-"}</td>
                            <td>${p.end_date?be(p.end_date):"-"}</td>
                            <td>${(p.weekday_mask||[]).join(", ")||"-"}</td>
                            <td>${(p.month_mask||[]).join(", ")||"-"}</td>
                            <td>${p.priority}</td>
                            <td>
                              <button type="button" className="button" onClick=${()=>en(p)}>
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

        ${d?_`
              <div className="modal-backdrop" onClick=${()=>c(!1)}>
                <section className="modal modal-wide" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">${$?"Edit Theme":"Add Theme"}</h2>
                  <form onSubmit=${Rt}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="themeKey">Theme Key</label>
                        <input id="themeKey" value=${O.theme_key} onInput=${p=>ne(g=>({...g,theme_key:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeNameFactory">Theme Name</label>
                        <input id="themeNameFactory" value=${O.theme_name} onInput=${p=>ne(g=>({...g,theme_name:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeBucket">Theme Bucket</label>
                        <select id="themeBucket" value=${O.theme_bucket} onChange=${p=>ne(g=>({...g,theme_bucket:p.target.value}))}>
                          <option value="everyday">everyday</option>
                          <option value="special">occasion</option>
                          <option value="current_event">current event</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeType">Theme Type</label>
                        <select id="themeType" value=${O.theme_type} onChange=${p=>ne(g=>({...g,theme_type:p.target.value}))}>
                          <option value="evergreen">evergreen</option>
                          <option value="calendar">calendar</option>
                          <option value="campaign">campaign</option>
                          <option value="news">news</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeContext">Cultural Context</label>
                        <input id="themeContext" value=${O.cultural_context} onInput=${p=>ne(g=>({...g,cultural_context:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeTone">Tone Style</label>
                        <input id="themeTone" value=${O.tone_style} onInput=${p=>ne(g=>({...g,tone_style:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeAudience">Audience</label>
                        <input id="themeAudience" value=${O.default_audience} onInput=${p=>ne(g=>({...g,default_audience:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeVisual">Visual Style</label>
                        <input id="themeVisual" value=${O.default_visual_style} onInput=${p=>ne(g=>({...g,default_visual_style:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themePriority">Priority</label>
                        <input id="themePriority" type="number" value=${O.priority} onInput=${p=>ne(g=>({...g,priority:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeFunny">Funny %</label>
                        <input id="themeFunny" type="number" min="0" max="100" value=${O.default_funny_pct} onInput=${p=>ne(g=>({...g,default_funny_pct:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeEmotion">Emotion %</label>
                        <input id="themeEmotion" type="number" min="0" max="100" value=${O.default_emotion_pct} onInput=${p=>ne(g=>({...g,default_emotion_pct:p.target.value}))} />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="themeDescription">Description</label>
                        <textarea id="themeDescription" rows="4" value=${O.description} onInput=${p=>ne(g=>({...g,description:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${O.is_active} onChange=${p=>ne(g=>({...g,is_active:p.target.checked}))} />
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
                  <h2 className="section-title">${I?"Edit Schedule":"Add Schedule"}</h2>
                  <form onSubmit=${pt}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="scheduleTheme">Theme</label>
                        <select id="scheduleTheme" value=${V.theme_id} onChange=${p=>ue(g=>({...g,theme_id:p.target.value}))} required>
                          ${t.map(p=>_`<option key=${p.id} value=${p.id}>${p.theme_name}</option>`)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleType">Schedule Type</label>
                        <select id="scheduleType" value=${V.schedule_type} onChange=${p=>ue(g=>({...g,schedule_type:p.target.value}))}>
                          <option value="single_day">single_day</option>
                          <option value="date_range">date_range</option>
                          <option value="weekly_recurring">weekly_recurring</option>
                          <option value="monthly_recurring">monthly_recurring</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleStart">Start Date</label>
                        <input id="scheduleStart" type="date" value=${V.start_date} onInput=${p=>ue(g=>({...g,start_date:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleEnd">End Date</label>
                        <input id="scheduleEnd" type="date" value=${V.end_date} onInput=${p=>ue(g=>({...g,end_date:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="weekdayMask">Weekday Mask</label>
                        <input id="weekdayMask" value=${V.weekday_mask} onInput=${p=>ue(g=>({...g,weekday_mask:p.target.value}))} placeholder="monday, thursday" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="monthMask">Month Mask</label>
                        <input id="monthMask" value=${V.month_mask} onInput=${p=>ue(g=>({...g,month_mask:p.target.value}))} placeholder="2, 3, 8" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleRegion">Region</label>
                        <input id="scheduleRegion" value=${V.region} onInput=${p=>ue(g=>({...g,region:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleCountry">Country</label>
                        <input id="scheduleCountry" value=${V.country} onInput=${p=>ue(g=>({...g,country:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="schedulePriority">Priority</label>
                        <input id="schedulePriority" type="number" value=${V.priority} onInput=${p=>ue(g=>({...g,priority:p.target.value}))} />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="scheduleNotes">Notes</label>
                        <textarea id="scheduleNotes" rows="4" value=${V.notes} onInput=${p=>ue(g=>({...g,notes:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${V.is_active} onChange=${p=>ue(g=>({...g,is_active:p.target.checked}))} />
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

        ${C?_`
              <div className="modal-backdrop" onClick=${()=>x(!1)}>
                <section className="modal" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">Add Override</h2>
                  <form onSubmit=${bl}>
                    <div className="form-grid">
                      <div className="form-field full">
                        <label htmlFor="overrideTheme">Theme</label>
                        <select id="overrideTheme" value=${ce.theme_id} onChange=${p=>ye(g=>({...g,theme_id:p.target.value}))} required>
                          ${t.map(p=>_`<option key=${p.id} value=${p.id}>${p.theme_name}</option>`)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideScope">Scope</label>
                        <input id="overrideScope" value=${ce.override_scope} onInput=${p=>ye(g=>({...g,override_scope:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideBy">Created By</label>
                        <input id="overrideBy" value=${ce.created_by} onInput=${p=>ye(g=>({...g,created_by:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideStart">Start At</label>
                        <input id="overrideStart" type="datetime-local" value=${ce.start_at} onInput=${p=>ye(g=>({...g,start_at:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideEnd">End At</label>
                        <input id="overrideEnd" type="datetime-local" value=${ce.end_at} onInput=${p=>ye(g=>({...g,end_at:p.target.value}))} required />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="overrideReason">Reason</label>
                        <textarea id="overrideReason" rows="4" value=${ce.reason} onInput=${p=>ye(g=>({...g,reason:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${ce.force_top_priority} onChange=${p=>ye(g=>({...g,force_top_priority:p.target.checked}))} />
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
    `}function Nv(){return _`
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
    `}function Sv(){return _`
      <div className="console-layout">
        <aside className="console-sidebar">
          <p className="brand-overline">eCardFactory</p>
          <h1 className="brand-title">Internal Console</h1>
          <p className="brand-subtitle">Workflow-first operations panel</p>
          <nav className="sidebar-nav" aria-label="Primary">
            <${Tl}
              to="/"
              end
              className=${({isActive:e})=>e?"nav-link active":"nav-link"}
            >
              Workflow Console
            <//>
            <${Tl}
              to="/themes"
              className=${({isActive:e})=>e?"nav-link active":"nav-link"}
            >
              Theme Factory
            <//>
            <${Tl}
              to="/compare"
              className=${({isActive:e})=>e?"nav-link active":"nav-link"}
            >
              Compare Lab
            <//>
          </nav>
        </aside>

        <main className="console-main">
          <${cs}>
            <${Xt} path="/" element=${_`<${gv} />`} />
            <${Xt} path="/themes" element=${_`<${_v} />`} />
            <${Xt} path="/compare" element=${_`<${Nv} />`} />
            <${Xt} path="/jobs/:jobId" element=${_`<${wv} />`} />
            <${Xt} path="*" element=${_`<${ss} to="/" replace=${!0} />`} />
          <//>
        </main>
      </div>
    `}var hs=class extends L.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}componentDidCatch(t){ea(`Frontend render error: ${t?.message||"unknown error"}. See browser console for details.`,t)}render(){return this.state.error?_`
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
      `:this.props.children}};function Ev(){return(0,L.useEffect)(()=>{uv()},[]),null}function kv(){return _`
      <${_f}>
        <${hs}>
          <${Ev} />
          <${Sv} />
        <//>
      <//>
    `}window.addEventListener("error",e=>{e.error&&ea(`Frontend runtime error: ${e.error.message||"unknown error"}.`,e.error)});window.addEventListener("unhandledrejection",e=>{ea(`Unhandled async error: ${e.reason?.message||String(e.reason||"unknown")}`,e.reason)});var $f=document.getElementById("root");if(!$f)ea("Frontend root element (#root) is missing in index.html.");else try{(0,Tf.createRoot)($f).render(_`<${kv} />`)}catch(e){ea(`Unable to mount React root: ${e?.message||"unknown mount error"}`,e)}})();
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
