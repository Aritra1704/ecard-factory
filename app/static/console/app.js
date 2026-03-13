(()=>{var Ff=Object.create;var ms=Object.defineProperty;var Of=Object.getOwnPropertyDescriptor;var Uf=Object.getOwnPropertyNames;var Af=Object.getPrototypeOf,If=Object.prototype.hasOwnProperty;var qt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Mf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Uf(t))!If.call(e,a)&&a!==n&&ms(e,a,{get:()=>t[a],enumerable:!(r=Of(t,a))||r.enumerable});return e};var tr=(e,t,n)=>(n=e!=null?Ff(Af(e)):{},Mf(t||!e||!e.__esModule?ms(n,"default",{value:e,enumerable:!0}):n,e));var xs=qt(U=>{"use strict";var nr=Symbol.for("react.element"),jf=Symbol.for("react.portal"),zf=Symbol.for("react.fragment"),Vf=Symbol.for("react.strict_mode"),Bf=Symbol.for("react.profiler"),Hf=Symbol.for("react.provider"),Wf=Symbol.for("react.context"),Kf=Symbol.for("react.forward_ref"),Qf=Symbol.for("react.suspense"),Yf=Symbol.for("react.memo"),Jf=Symbol.for("react.lazy"),vs=Symbol.iterator;function Gf(e){return e===null||typeof e!="object"?null:(e=vs&&e[vs]||e["@@iterator"],typeof e=="function"?e:null)}var ws={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_s=Object.assign,Ns={};function Sn(e,t,n){this.props=e,this.context=t,this.refs=Ns,this.updater=n||ws}Sn.prototype.isReactComponent={};Sn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Sn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ss(){}Ss.prototype=Sn.prototype;function Fl(e,t,n){this.props=e,this.context=t,this.refs=Ns,this.updater=n||ws}var Ol=Fl.prototype=new Ss;Ol.constructor=Fl;_s(Ol,Sn.prototype);Ol.isPureReactComponent=!0;var ys=Array.isArray,Es=Object.prototype.hasOwnProperty,Ul={current:null},ks={key:!0,ref:!0,__self:!0,__source:!0};function Rs(e,t,n){var r,a={},l=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(l=""+t.key),t)Es.call(t,r)&&!ks.hasOwnProperty(r)&&(a[r]=t[r]);var i=arguments.length-2;if(i===1)a.children=n;else if(1<i){for(var s=Array(i),u=0;u<i;u++)s[u]=arguments[u+2];a.children=s}if(e&&e.defaultProps)for(r in i=e.defaultProps,i)a[r]===void 0&&(a[r]=i[r]);return{$$typeof:nr,type:e,key:l,ref:o,props:a,_owner:Ul.current}}function Xf(e,t){return{$$typeof:nr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Al(e){return typeof e=="object"&&e!==null&&e.$$typeof===nr}function Zf(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var gs=/\/+/g;function bl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Zf(""+e.key):t.toString(36)}function ta(e,t,n,r,a){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(l){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case nr:case jf:o=!0}}if(o)return o=e,a=a(o),e=r===""?"."+bl(o,0):r,ys(a)?(n="",e!=null&&(n=e.replace(gs,"$&/")+"/"),ta(a,t,n,"",function(u){return u})):a!=null&&(Al(a)&&(a=Xf(a,n+(!a.key||o&&o.key===a.key?"":(""+a.key).replace(gs,"$&/")+"/")+e)),t.push(a)),1;if(o=0,r=r===""?".":r+":",ys(e))for(var i=0;i<e.length;i++){l=e[i];var s=r+bl(l,i);o+=ta(l,t,n,s,a)}else if(s=Gf(e),typeof s=="function")for(e=s.call(e),i=0;!(l=e.next()).done;)l=l.value,s=r+bl(l,i++),o+=ta(l,t,n,s,a);else if(l==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function ea(e,t,n){if(e==null)return e;var r=[],a=0;return ta(e,r,"","",function(l){return t.call(n,l,a++)}),r}function qf(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ke={current:null},na={transition:null},ep={ReactCurrentDispatcher:ke,ReactCurrentBatchConfig:na,ReactCurrentOwner:Ul};function Cs(){throw Error("act(...) is not supported in production builds of React.")}U.Children={map:ea,forEach:function(e,t,n){ea(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ea(e,function(){t++}),t},toArray:function(e){return ea(e,function(t){return t})||[]},only:function(e){if(!Al(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};U.Component=Sn;U.Fragment=zf;U.Profiler=Bf;U.PureComponent=Fl;U.StrictMode=Vf;U.Suspense=Qf;U.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ep;U.act=Cs;U.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=_s({},e.props),a=e.key,l=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(l=t.ref,o=Ul.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(s in t)Es.call(t,s)&&!ks.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&i!==void 0?i[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){i=Array(s);for(var u=0;u<s;u++)i[u]=arguments[u+2];r.children=i}return{$$typeof:nr,type:e.type,key:a,ref:l,props:r,_owner:o}};U.createContext=function(e){return e={$$typeof:Wf,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Hf,_context:e},e.Consumer=e};U.createElement=Rs;U.createFactory=function(e){var t=Rs.bind(null,e);return t.type=e,t};U.createRef=function(){return{current:null}};U.forwardRef=function(e){return{$$typeof:Kf,render:e}};U.isValidElement=Al;U.lazy=function(e){return{$$typeof:Jf,_payload:{_status:-1,_result:e},_init:qf}};U.memo=function(e,t){return{$$typeof:Yf,type:e,compare:t===void 0?null:t}};U.startTransition=function(e){var t=na.transition;na.transition={};try{e()}finally{na.transition=t}};U.unstable_act=Cs;U.useCallback=function(e,t){return ke.current.useCallback(e,t)};U.useContext=function(e){return ke.current.useContext(e)};U.useDebugValue=function(){};U.useDeferredValue=function(e){return ke.current.useDeferredValue(e)};U.useEffect=function(e,t){return ke.current.useEffect(e,t)};U.useId=function(){return ke.current.useId()};U.useImperativeHandle=function(e,t,n){return ke.current.useImperativeHandle(e,t,n)};U.useInsertionEffect=function(e,t){return ke.current.useInsertionEffect(e,t)};U.useLayoutEffect=function(e,t){return ke.current.useLayoutEffect(e,t)};U.useMemo=function(e,t){return ke.current.useMemo(e,t)};U.useReducer=function(e,t,n){return ke.current.useReducer(e,t,n)};U.useRef=function(e){return ke.current.useRef(e)};U.useState=function(e){return ke.current.useState(e)};U.useSyncExternalStore=function(e,t,n){return ke.current.useSyncExternalStore(e,t,n)};U.useTransition=function(){return ke.current.useTransition()};U.version="18.3.1"});var rr=qt((Cv,Ps)=>{"use strict";Ps.exports=xs()});var Is=qt(H=>{"use strict";function zl(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<ra(a,t))e[r]=t,e[n]=a,n=r;else break e}}function Qe(e){return e.length===0?null:e[0]}function la(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,a=e.length,l=a>>>1;r<l;){var o=2*(r+1)-1,i=e[o],s=o+1,u=e[s];if(0>ra(i,n))s<a&&0>ra(u,i)?(e[r]=u,e[s]=n,r=s):(e[r]=i,e[o]=n,r=o);else if(s<a&&0>ra(u,n))e[r]=u,e[s]=n,r=s;else break e}}return t}function ra(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?($s=performance,H.unstable_now=function(){return $s.now()}):(Il=Date,Ts=Il.now(),H.unstable_now=function(){return Il.now()-Ts});var $s,Il,Ts,lt=[],Rt=[],tp=1,je=null,ge=3,oa=!1,en=!1,lr=!1,bs=typeof setTimeout=="function"?setTimeout:null,Fs=typeof clearTimeout=="function"?clearTimeout:null,Ds=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Vl(e){for(var t=Qe(Rt);t!==null;){if(t.callback===null)la(Rt);else if(t.startTime<=e)la(Rt),t.sortIndex=t.expirationTime,zl(lt,t);else break;t=Qe(Rt)}}function Bl(e){if(lr=!1,Vl(e),!en)if(Qe(lt)!==null)en=!0,Wl(Hl);else{var t=Qe(Rt);t!==null&&Kl(Bl,t.startTime-e)}}function Hl(e,t){en=!1,lr&&(lr=!1,Fs(or),or=-1),oa=!0;var n=ge;try{for(Vl(t),je=Qe(lt);je!==null&&(!(je.expirationTime>t)||e&&!As());){var r=je.callback;if(typeof r=="function"){je.callback=null,ge=je.priorityLevel;var a=r(je.expirationTime<=t);t=H.unstable_now(),typeof a=="function"?je.callback=a:je===Qe(lt)&&la(lt),Vl(t)}else la(lt);je=Qe(lt)}if(je!==null)var l=!0;else{var o=Qe(Rt);o!==null&&Kl(Bl,o.startTime-t),l=!1}return l}finally{je=null,ge=n,oa=!1}}var ia=!1,aa=null,or=-1,Os=5,Us=-1;function As(){return!(H.unstable_now()-Us<Os)}function Ml(){if(aa!==null){var e=H.unstable_now();Us=e;var t=!0;try{t=aa(!0,e)}finally{t?ar():(ia=!1,aa=null)}}else ia=!1}var ar;typeof Ds=="function"?ar=function(){Ds(Ml)}:typeof MessageChannel<"u"?(jl=new MessageChannel,Ls=jl.port2,jl.port1.onmessage=Ml,ar=function(){Ls.postMessage(null)}):ar=function(){bs(Ml,0)};var jl,Ls;function Wl(e){aa=e,ia||(ia=!0,ar())}function Kl(e,t){or=bs(function(){e(H.unstable_now())},t)}H.unstable_IdlePriority=5;H.unstable_ImmediatePriority=1;H.unstable_LowPriority=4;H.unstable_NormalPriority=3;H.unstable_Profiling=null;H.unstable_UserBlockingPriority=2;H.unstable_cancelCallback=function(e){e.callback=null};H.unstable_continueExecution=function(){en||oa||(en=!0,Wl(Hl))};H.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Os=0<e?Math.floor(1e3/e):5};H.unstable_getCurrentPriorityLevel=function(){return ge};H.unstable_getFirstCallbackNode=function(){return Qe(lt)};H.unstable_next=function(e){switch(ge){case 1:case 2:case 3:var t=3;break;default:t=ge}var n=ge;ge=t;try{return e()}finally{ge=n}};H.unstable_pauseExecution=function(){};H.unstable_requestPaint=function(){};H.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=ge;ge=e;try{return t()}finally{ge=n}};H.unstable_scheduleCallback=function(e,t,n){var r=H.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return a=n+a,e={id:tp++,callback:t,priorityLevel:e,startTime:n,expirationTime:a,sortIndex:-1},n>r?(e.sortIndex=n,zl(Rt,e),Qe(lt)===null&&e===Qe(Rt)&&(lr?(Fs(or),or=-1):lr=!0,Kl(Bl,n-r))):(e.sortIndex=a,zl(lt,e),en||oa||(en=!0,Wl(Hl))),e};H.unstable_shouldYield=As;H.unstable_wrapCallback=function(e){var t=ge;return function(){var n=ge;ge=t;try{return e.apply(this,arguments)}finally{ge=n}}}});var js=qt((Pv,Ms)=>{"use strict";Ms.exports=Is()});var Hd=qt(Me=>{"use strict";var np=rr(),Ae=js();function k(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Qu=new Set,Pr={};function hn(e,t){Bn(e,t),Bn(e+"Capture",t)}function Bn(e,t){for(Pr[e]=t,e=0;e<t.length;e++)Qu.add(t[e])}var gt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),vo=Object.prototype.hasOwnProperty,rp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,zs={},Vs={};function ap(e){return vo.call(Vs,e)?!0:vo.call(zs,e)?!1:rp.test(e)?Vs[e]=!0:(zs[e]=!0,!1)}function lp(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function op(e,t,n,r){if(t===null||typeof t>"u"||lp(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function xe(e,t,n,r,a,l,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=o}var ve={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ve[e]=new xe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ve[t]=new xe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ve[e]=new xe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ve[e]=new xe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ve[e]=new xe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ve[e]=new xe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ve[e]=new xe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ve[e]=new xe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ve[e]=new xe(e,5,!1,e.toLowerCase(),null,!1,!1)});var si=/[\-:]([a-z])/g;function ui(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(si,ui);ve[t]=new xe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(si,ui);ve[t]=new xe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(si,ui);ve[t]=new xe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ve[e]=new xe(e,1,!1,e.toLowerCase(),null,!1,!1)});ve.xlinkHref=new xe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ve[e]=new xe(e,1,!1,e.toLowerCase(),null,!0,!0)});function ci(e,t,n,r){var a=ve.hasOwnProperty(t)?ve[t]:null;(a!==null?a.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(op(t,n,a,r)&&(n=null),r||a===null?ap(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(t=a.attributeName,r=a.attributeNamespace,n===null?e.removeAttribute(t):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var St=np.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sa=Symbol.for("react.element"),Rn=Symbol.for("react.portal"),Cn=Symbol.for("react.fragment"),di=Symbol.for("react.strict_mode"),yo=Symbol.for("react.profiler"),Yu=Symbol.for("react.provider"),Ju=Symbol.for("react.context"),fi=Symbol.for("react.forward_ref"),go=Symbol.for("react.suspense"),wo=Symbol.for("react.suspense_list"),pi=Symbol.for("react.memo"),xt=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var Gu=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var Bs=Symbol.iterator;function ir(e){return e===null||typeof e!="object"?null:(e=Bs&&e[Bs]||e["@@iterator"],typeof e=="function"?e:null)}var te=Object.assign,Ql;function mr(e){if(Ql===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ql=t&&t[1]||""}return`
`+Ql+e}var Yl=!1;function Jl(e,t){if(!e||Yl)return"";Yl=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var a=u.stack.split(`
`),l=r.stack.split(`
`),o=a.length-1,i=l.length-1;1<=o&&0<=i&&a[o]!==l[i];)i--;for(;1<=o&&0<=i;o--,i--)if(a[o]!==l[i]){if(o!==1||i!==1)do if(o--,i--,0>i||a[o]!==l[i]){var s=`
`+a[o].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=o&&0<=i);break}}}finally{Yl=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?mr(e):""}function ip(e){switch(e.tag){case 5:return mr(e.type);case 16:return mr("Lazy");case 13:return mr("Suspense");case 19:return mr("SuspenseList");case 0:case 2:case 15:return e=Jl(e.type,!1),e;case 11:return e=Jl(e.type.render,!1),e;case 1:return e=Jl(e.type,!0),e;default:return""}}function _o(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Cn:return"Fragment";case Rn:return"Portal";case yo:return"Profiler";case di:return"StrictMode";case go:return"Suspense";case wo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ju:return(e.displayName||"Context")+".Consumer";case Yu:return(e._context.displayName||"Context")+".Provider";case fi:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case pi:return t=e.displayName||null,t!==null?t:_o(e.type)||"Memo";case xt:t=e._payload,e=e._init;try{return _o(e(t))}catch{}}return null}function sp(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return _o(t);case 8:return t===di?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function zt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Xu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function up(e){var t=Xu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,l=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(o){r=""+o,l.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ua(e){e._valueTracker||(e._valueTracker=up(e))}function Zu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Xu(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Aa(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function No(e,t){var n=t.checked;return te({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Hs(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=zt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function qu(e,t){t=t.checked,t!=null&&ci(e,"checked",t,!1)}function So(e,t){qu(e,t);var n=zt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Eo(e,t.type,n):t.hasOwnProperty("defaultValue")&&Eo(e,t.type,zt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ws(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Eo(e,t,n){(t!=="number"||Aa(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var vr=Array.isArray;function An(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+zt(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,r&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function ko(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(k(91));return te({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ks(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(k(92));if(vr(n)){if(1<n.length)throw Error(k(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:zt(n)}}function ec(e,t){var n=zt(t.value),r=zt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Qs(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function tc(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ro(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?tc(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ca,nc=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,a)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ca=ca||document.createElement("div"),ca.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ca.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function $r(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var wr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},cp=["Webkit","ms","Moz","O"];Object.keys(wr).forEach(function(e){cp.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),wr[t]=wr[e]})});function rc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||wr.hasOwnProperty(e)&&wr[e]?(""+t).trim():t+"px"}function ac(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,a=rc(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,a):e[n]=a}}var dp=te({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Co(e,t){if(t){if(dp[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(k(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(k(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(k(61))}if(t.style!=null&&typeof t.style!="object")throw Error(k(62))}}function xo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Po=null;function hi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var $o=null,In=null,Mn=null;function Ys(e){if(e=Qr(e)){if(typeof $o!="function")throw Error(k(280));var t=e.stateNode;t&&(t=dl(t),$o(e.stateNode,e.type,t))}}function lc(e){In?Mn?Mn.push(e):Mn=[e]:In=e}function oc(){if(In){var e=In,t=Mn;if(Mn=In=null,Ys(e),t)for(e=0;e<t.length;e++)Ys(t[e])}}function ic(e,t){return e(t)}function sc(){}var Gl=!1;function uc(e,t,n){if(Gl)return e(t,n);Gl=!0;try{return ic(e,t,n)}finally{Gl=!1,(In!==null||Mn!==null)&&(sc(),oc())}}function Tr(e,t){var n=e.stateNode;if(n===null)return null;var r=dl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(k(231,t,typeof n));return n}var To=!1;if(gt)try{En={},Object.defineProperty(En,"passive",{get:function(){To=!0}}),window.addEventListener("test",En,En),window.removeEventListener("test",En,En)}catch{To=!1}var En;function fp(e,t,n,r,a,l,o,i,s){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(h){this.onError(h)}}var _r=!1,Ia=null,Ma=!1,Do=null,pp={onError:function(e){_r=!0,Ia=e}};function hp(e,t,n,r,a,l,o,i,s){_r=!1,Ia=null,fp.apply(pp,arguments)}function mp(e,t,n,r,a,l,o,i,s){if(hp.apply(this,arguments),_r){if(_r){var u=Ia;_r=!1,Ia=null}else throw Error(k(198));Ma||(Ma=!0,Do=u)}}function mn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function cc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Js(e){if(mn(e)!==e)throw Error(k(188))}function vp(e){var t=e.alternate;if(!t){if(t=mn(e),t===null)throw Error(k(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var l=a.alternate;if(l===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===l.child){for(l=a.child;l;){if(l===n)return Js(a),e;if(l===r)return Js(a),t;l=l.sibling}throw Error(k(188))}if(n.return!==r.return)n=a,r=l;else{for(var o=!1,i=a.child;i;){if(i===n){o=!0,n=a,r=l;break}if(i===r){o=!0,r=a,n=l;break}i=i.sibling}if(!o){for(i=l.child;i;){if(i===n){o=!0,n=l,r=a;break}if(i===r){o=!0,r=l,n=a;break}i=i.sibling}if(!o)throw Error(k(189))}}if(n.alternate!==r)throw Error(k(190))}if(n.tag!==3)throw Error(k(188));return n.stateNode.current===n?e:t}function dc(e){return e=vp(e),e!==null?fc(e):null}function fc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=fc(e);if(t!==null)return t;e=e.sibling}return null}var pc=Ae.unstable_scheduleCallback,Gs=Ae.unstable_cancelCallback,yp=Ae.unstable_shouldYield,gp=Ae.unstable_requestPaint,ae=Ae.unstable_now,wp=Ae.unstable_getCurrentPriorityLevel,mi=Ae.unstable_ImmediatePriority,hc=Ae.unstable_UserBlockingPriority,ja=Ae.unstable_NormalPriority,_p=Ae.unstable_LowPriority,mc=Ae.unstable_IdlePriority,il=null,ut=null;function Np(e){if(ut&&typeof ut.onCommitFiberRoot=="function")try{ut.onCommitFiberRoot(il,e,void 0,(e.current.flags&128)===128)}catch{}}var Ze=Math.clz32?Math.clz32:kp,Sp=Math.log,Ep=Math.LN2;function kp(e){return e>>>=0,e===0?32:31-(Sp(e)/Ep|0)|0}var da=64,fa=4194304;function yr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function za(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,a=e.suspendedLanes,l=e.pingedLanes,o=n&268435455;if(o!==0){var i=o&~a;i!==0?r=yr(i):(l&=o,l!==0&&(r=yr(l)))}else o=n&~a,o!==0?r=yr(o):l!==0&&(r=yr(l));if(r===0)return 0;if(t!==0&&t!==r&&(t&a)===0&&(a=r&-r,l=t&-t,a>=l||a===16&&(l&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ze(t),a=1<<n,r|=e[n],t&=~a;return r}function Rp(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Cp(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,l=e.pendingLanes;0<l;){var o=31-Ze(l),i=1<<o,s=a[o];s===-1?((i&n)===0||(i&r)!==0)&&(a[o]=Rp(i,t)):s<=t&&(e.expiredLanes|=i),l&=~i}}function Lo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function vc(){var e=da;return da<<=1,(da&4194240)===0&&(da=64),e}function Xl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Wr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ze(t),e[t]=n}function xp(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-Ze(n),l=1<<a;t[a]=0,r[a]=-1,e[a]=-1,n&=~l}}function vi(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ze(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}var B=0;function yc(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var gc,yi,wc,_c,Nc,bo=!1,pa=[],bt=null,Ft=null,Ot=null,Dr=new Map,Lr=new Map,$t=[],Pp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Xs(e,t){switch(e){case"focusin":case"focusout":bt=null;break;case"dragenter":case"dragleave":Ft=null;break;case"mouseover":case"mouseout":Ot=null;break;case"pointerover":case"pointerout":Dr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Lr.delete(t.pointerId)}}function sr(e,t,n,r,a,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:l,targetContainers:[a]},t!==null&&(t=Qr(t),t!==null&&yi(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function $p(e,t,n,r,a){switch(t){case"focusin":return bt=sr(bt,e,t,n,r,a),!0;case"dragenter":return Ft=sr(Ft,e,t,n,r,a),!0;case"mouseover":return Ot=sr(Ot,e,t,n,r,a),!0;case"pointerover":var l=a.pointerId;return Dr.set(l,sr(Dr.get(l)||null,e,t,n,r,a)),!0;case"gotpointercapture":return l=a.pointerId,Lr.set(l,sr(Lr.get(l)||null,e,t,n,r,a)),!0}return!1}function Sc(e){var t=rn(e.target);if(t!==null){var n=mn(t);if(n!==null){if(t=n.tag,t===13){if(t=cc(n),t!==null){e.blockedOn=t,Nc(e.priority,function(){wc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function xa(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Fo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Po=r,n.target.dispatchEvent(r),Po=null}else return t=Qr(n),t!==null&&yi(t),e.blockedOn=n,!1;t.shift()}return!0}function Zs(e,t,n){xa(e)&&n.delete(t)}function Tp(){bo=!1,bt!==null&&xa(bt)&&(bt=null),Ft!==null&&xa(Ft)&&(Ft=null),Ot!==null&&xa(Ot)&&(Ot=null),Dr.forEach(Zs),Lr.forEach(Zs)}function ur(e,t){e.blockedOn===t&&(e.blockedOn=null,bo||(bo=!0,Ae.unstable_scheduleCallback(Ae.unstable_NormalPriority,Tp)))}function br(e){function t(a){return ur(a,e)}if(0<pa.length){ur(pa[0],e);for(var n=1;n<pa.length;n++){var r=pa[n];r.blockedOn===e&&(r.blockedOn=null)}}for(bt!==null&&ur(bt,e),Ft!==null&&ur(Ft,e),Ot!==null&&ur(Ot,e),Dr.forEach(t),Lr.forEach(t),n=0;n<$t.length;n++)r=$t[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<$t.length&&(n=$t[0],n.blockedOn===null);)Sc(n),n.blockedOn===null&&$t.shift()}var jn=St.ReactCurrentBatchConfig,Va=!0;function Dp(e,t,n,r){var a=B,l=jn.transition;jn.transition=null;try{B=1,gi(e,t,n,r)}finally{B=a,jn.transition=l}}function Lp(e,t,n,r){var a=B,l=jn.transition;jn.transition=null;try{B=4,gi(e,t,n,r)}finally{B=a,jn.transition=l}}function gi(e,t,n,r){if(Va){var a=Fo(e,t,n,r);if(a===null)ao(e,t,r,Ba,n),Xs(e,r);else if($p(a,e,t,n,r))r.stopPropagation();else if(Xs(e,r),t&4&&-1<Pp.indexOf(e)){for(;a!==null;){var l=Qr(a);if(l!==null&&gc(l),l=Fo(e,t,n,r),l===null&&ao(e,t,r,Ba,n),l===a)break;a=l}a!==null&&r.stopPropagation()}else ao(e,t,r,null,n)}}var Ba=null;function Fo(e,t,n,r){if(Ba=null,e=hi(r),e=rn(e),e!==null)if(t=mn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=cc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ba=e,null}function Ec(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(wp()){case mi:return 1;case hc:return 4;case ja:case _p:return 16;case mc:return 536870912;default:return 16}default:return 16}}var Dt=null,wi=null,Pa=null;function kc(){if(Pa)return Pa;var e,t=wi,n=t.length,r,a="value"in Dt?Dt.value:Dt.textContent,l=a.length;for(e=0;e<n&&t[e]===a[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===a[l-r];r++);return Pa=a.slice(e,1<r?1-r:void 0)}function $a(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ha(){return!0}function qs(){return!1}function Ie(e){function t(n,r,a,l,o){this._reactName=n,this._targetInst=a,this.type=r,this.nativeEvent=l,this.target=o,this.currentTarget=null;for(var i in e)e.hasOwnProperty(i)&&(n=e[i],this[i]=n?n(l):l[i]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?ha:qs,this.isPropagationStopped=qs,this}return te(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ha)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ha)},persist:function(){},isPersistent:ha}),t}var Gn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},_i=Ie(Gn),Kr=te({},Gn,{view:0,detail:0}),bp=Ie(Kr),Zl,ql,cr,sl=te({},Kr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ni,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==cr&&(cr&&e.type==="mousemove"?(Zl=e.screenX-cr.screenX,ql=e.screenY-cr.screenY):ql=Zl=0,cr=e),Zl)},movementY:function(e){return"movementY"in e?e.movementY:ql}}),eu=Ie(sl),Fp=te({},sl,{dataTransfer:0}),Op=Ie(Fp),Up=te({},Kr,{relatedTarget:0}),eo=Ie(Up),Ap=te({},Gn,{animationName:0,elapsedTime:0,pseudoElement:0}),Ip=Ie(Ap),Mp=te({},Gn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),jp=Ie(Mp),zp=te({},Gn,{data:0}),tu=Ie(zp),Vp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Bp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Hp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Wp(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Hp[e])?!!t[e]:!1}function Ni(){return Wp}var Kp=te({},Kr,{key:function(e){if(e.key){var t=Vp[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=$a(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Bp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ni,charCode:function(e){return e.type==="keypress"?$a(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?$a(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Qp=Ie(Kp),Yp=te({},sl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),nu=Ie(Yp),Jp=te({},Kr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ni}),Gp=Ie(Jp),Xp=te({},Gn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Zp=Ie(Xp),qp=te({},sl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),eh=Ie(qp),th=[9,13,27,32],Si=gt&&"CompositionEvent"in window,Nr=null;gt&&"documentMode"in document&&(Nr=document.documentMode);var nh=gt&&"TextEvent"in window&&!Nr,Rc=gt&&(!Si||Nr&&8<Nr&&11>=Nr),ru=" ",au=!1;function Cc(e,t){switch(e){case"keyup":return th.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function xc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var xn=!1;function rh(e,t){switch(e){case"compositionend":return xc(t);case"keypress":return t.which!==32?null:(au=!0,ru);case"textInput":return e=t.data,e===ru&&au?null:e;default:return null}}function ah(e,t){if(xn)return e==="compositionend"||!Si&&Cc(e,t)?(e=kc(),Pa=wi=Dt=null,xn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Rc&&t.locale!=="ko"?null:t.data;default:return null}}var lh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function lu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!lh[e.type]:t==="textarea"}function Pc(e,t,n,r){lc(r),t=Ha(t,"onChange"),0<t.length&&(n=new _i("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Sr=null,Fr=null;function oh(e){Mc(e,0)}function ul(e){var t=Tn(e);if(Zu(t))return e}function ih(e,t){if(e==="change")return t}var $c=!1;gt&&(gt?(va="oninput"in document,va||(to=document.createElement("div"),to.setAttribute("oninput","return;"),va=typeof to.oninput=="function"),ma=va):ma=!1,$c=ma&&(!document.documentMode||9<document.documentMode));var ma,va,to;function ou(){Sr&&(Sr.detachEvent("onpropertychange",Tc),Fr=Sr=null)}function Tc(e){if(e.propertyName==="value"&&ul(Fr)){var t=[];Pc(t,Fr,e,hi(e)),uc(oh,t)}}function sh(e,t,n){e==="focusin"?(ou(),Sr=t,Fr=n,Sr.attachEvent("onpropertychange",Tc)):e==="focusout"&&ou()}function uh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ul(Fr)}function ch(e,t){if(e==="click")return ul(t)}function dh(e,t){if(e==="input"||e==="change")return ul(t)}function fh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var et=typeof Object.is=="function"?Object.is:fh;function Or(e,t){if(et(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!vo.call(t,a)||!et(e[a],t[a]))return!1}return!0}function iu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function su(e,t){var n=iu(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=iu(n)}}function Dc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Dc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Lc(){for(var e=window,t=Aa();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Aa(e.document)}return t}function Ei(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function ph(e){var t=Lc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Dc(n.ownerDocument.documentElement,n)){if(r!==null&&Ei(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,l=Math.min(r.start,a);r=r.end===void 0?l:Math.min(r.end,a),!e.extend&&l>r&&(a=r,r=l,l=a),a=su(n,l);var o=su(n,r);a&&o&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),l>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var hh=gt&&"documentMode"in document&&11>=document.documentMode,Pn=null,Oo=null,Er=null,Uo=!1;function uu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Uo||Pn==null||Pn!==Aa(r)||(r=Pn,"selectionStart"in r&&Ei(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Er&&Or(Er,r)||(Er=r,r=Ha(Oo,"onSelect"),0<r.length&&(t=new _i("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Pn)))}function ya(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var $n={animationend:ya("Animation","AnimationEnd"),animationiteration:ya("Animation","AnimationIteration"),animationstart:ya("Animation","AnimationStart"),transitionend:ya("Transition","TransitionEnd")},no={},bc={};gt&&(bc=document.createElement("div").style,"AnimationEvent"in window||(delete $n.animationend.animation,delete $n.animationiteration.animation,delete $n.animationstart.animation),"TransitionEvent"in window||delete $n.transitionend.transition);function cl(e){if(no[e])return no[e];if(!$n[e])return e;var t=$n[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in bc)return no[e]=t[n];return e}var Fc=cl("animationend"),Oc=cl("animationiteration"),Uc=cl("animationstart"),Ac=cl("transitionend"),Ic=new Map,cu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Bt(e,t){Ic.set(e,t),hn(t,[e])}for(ga=0;ga<cu.length;ga++)wa=cu[ga],du=wa.toLowerCase(),fu=wa[0].toUpperCase()+wa.slice(1),Bt(du,"on"+fu);var wa,du,fu,ga;Bt(Fc,"onAnimationEnd");Bt(Oc,"onAnimationIteration");Bt(Uc,"onAnimationStart");Bt("dblclick","onDoubleClick");Bt("focusin","onFocus");Bt("focusout","onBlur");Bt(Ac,"onTransitionEnd");Bn("onMouseEnter",["mouseout","mouseover"]);Bn("onMouseLeave",["mouseout","mouseover"]);Bn("onPointerEnter",["pointerout","pointerover"]);Bn("onPointerLeave",["pointerout","pointerover"]);hn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));hn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));hn("onBeforeInput",["compositionend","keypress","textInput","paste"]);hn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));hn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));hn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var gr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mh=new Set("cancel close invalid load scroll toggle".split(" ").concat(gr));function pu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,mp(r,t,void 0,e),e.currentTarget=null}function Mc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var l=void 0;if(t)for(var o=r.length-1;0<=o;o--){var i=r[o],s=i.instance,u=i.currentTarget;if(i=i.listener,s!==l&&a.isPropagationStopped())break e;pu(a,i,u),l=s}else for(o=0;o<r.length;o++){if(i=r[o],s=i.instance,u=i.currentTarget,i=i.listener,s!==l&&a.isPropagationStopped())break e;pu(a,i,u),l=s}}}if(Ma)throw e=Do,Ma=!1,Do=null,e}function Q(e,t){var n=t[zo];n===void 0&&(n=t[zo]=new Set);var r=e+"__bubble";n.has(r)||(jc(t,e,2,!1),n.add(r))}function ro(e,t,n){var r=0;t&&(r|=4),jc(n,e,r,t)}var _a="_reactListening"+Math.random().toString(36).slice(2);function Ur(e){if(!e[_a]){e[_a]=!0,Qu.forEach(function(n){n!=="selectionchange"&&(mh.has(n)||ro(n,!1,e),ro(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[_a]||(t[_a]=!0,ro("selectionchange",!1,t))}}function jc(e,t,n,r){switch(Ec(t)){case 1:var a=Dp;break;case 4:a=Lp;break;default:a=gi}n=a.bind(null,t,n,e),a=void 0,!To||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),r?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function ao(e,t,n,r,a){var l=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var i=r.stateNode.containerInfo;if(i===a||i.nodeType===8&&i.parentNode===a)break;if(o===4)for(o=r.return;o!==null;){var s=o.tag;if((s===3||s===4)&&(s=o.stateNode.containerInfo,s===a||s.nodeType===8&&s.parentNode===a))return;o=o.return}for(;i!==null;){if(o=rn(i),o===null)return;if(s=o.tag,s===5||s===6){r=l=o;continue e}i=i.parentNode}}r=r.return}uc(function(){var u=l,h=hi(n),m=[];e:{var v=Ic.get(e);if(v!==void 0){var _=_i,N=e;switch(e){case"keypress":if($a(n)===0)break e;case"keydown":case"keyup":_=Qp;break;case"focusin":N="focus",_=eo;break;case"focusout":N="blur",_=eo;break;case"beforeblur":case"afterblur":_=eo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":_=eu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":_=Op;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":_=Gp;break;case Fc:case Oc:case Uc:_=Ip;break;case Ac:_=Zp;break;case"scroll":_=bp;break;case"wheel":_=eh;break;case"copy":case"cut":case"paste":_=jp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":_=nu}var g=(t&4)!==0,E=!g&&e==="scroll",f=g?v!==null?v+"Capture":null:v;g=[];for(var c=u,p;c!==null;){p=c;var y=p.stateNode;if(p.tag===5&&y!==null&&(p=y,f!==null&&(y=Tr(c,f),y!=null&&g.push(Ar(c,y,p)))),E)break;c=c.return}0<g.length&&(v=new _(v,N,null,n,h),m.push({event:v,listeners:g}))}}if((t&7)===0){e:{if(v=e==="mouseover"||e==="pointerover",_=e==="mouseout"||e==="pointerout",v&&n!==Po&&(N=n.relatedTarget||n.fromElement)&&(rn(N)||N[wt]))break e;if((_||v)&&(v=h.window===h?h:(v=h.ownerDocument)?v.defaultView||v.parentWindow:window,_?(N=n.relatedTarget||n.toElement,_=u,N=N?rn(N):null,N!==null&&(E=mn(N),N!==E||N.tag!==5&&N.tag!==6)&&(N=null)):(_=null,N=u),_!==N)){if(g=eu,y="onMouseLeave",f="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(g=nu,y="onPointerLeave",f="onPointerEnter",c="pointer"),E=_==null?v:Tn(_),p=N==null?v:Tn(N),v=new g(y,c+"leave",_,n,h),v.target=E,v.relatedTarget=p,y=null,rn(h)===u&&(g=new g(f,c+"enter",N,n,h),g.target=p,g.relatedTarget=E,y=g),E=y,_&&N)t:{for(g=_,f=N,c=0,p=g;p;p=kn(p))c++;for(p=0,y=f;y;y=kn(y))p++;for(;0<c-p;)g=kn(g),c--;for(;0<p-c;)f=kn(f),p--;for(;c--;){if(g===f||f!==null&&g===f.alternate)break t;g=kn(g),f=kn(f)}g=null}else g=null;_!==null&&hu(m,v,_,g,!1),N!==null&&E!==null&&hu(m,E,N,g,!0)}}e:{if(v=u?Tn(u):window,_=v.nodeName&&v.nodeName.toLowerCase(),_==="select"||_==="input"&&v.type==="file")var C=ih;else if(lu(v))if($c)C=dh;else{C=uh;var x=sh}else(_=v.nodeName)&&_.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(C=ch);if(C&&(C=C(e,u))){Pc(m,C,n,h);break e}x&&x(e,v,u),e==="focusout"&&(x=v._wrapperState)&&x.controlled&&v.type==="number"&&Eo(v,"number",v.value)}switch(x=u?Tn(u):window,e){case"focusin":(lu(x)||x.contentEditable==="true")&&(Pn=x,Oo=u,Er=null);break;case"focusout":Er=Oo=Pn=null;break;case"mousedown":Uo=!0;break;case"contextmenu":case"mouseup":case"dragend":Uo=!1,uu(m,n,h);break;case"selectionchange":if(hh)break;case"keydown":case"keyup":uu(m,n,h)}var $;if(Si)e:{switch(e){case"compositionstart":var L="onCompositionStart";break e;case"compositionend":L="onCompositionEnd";break e;case"compositionupdate":L="onCompositionUpdate";break e}L=void 0}else xn?Cc(e,n)&&(L="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(L="onCompositionStart");L&&(Rc&&n.locale!=="ko"&&(xn||L!=="onCompositionStart"?L==="onCompositionEnd"&&xn&&($=kc()):(Dt=h,wi="value"in Dt?Dt.value:Dt.textContent,xn=!0)),x=Ha(u,L),0<x.length&&(L=new tu(L,e,null,n,h),m.push({event:L,listeners:x}),$?L.data=$:($=xc(n),$!==null&&(L.data=$)))),($=nh?rh(e,n):ah(e,n))&&(u=Ha(u,"onBeforeInput"),0<u.length&&(h=new tu("onBeforeInput","beforeinput",null,n,h),m.push({event:h,listeners:u}),h.data=$))}Mc(m,t)})}function Ar(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ha(e,t){for(var n=t+"Capture",r=[];e!==null;){var a=e,l=a.stateNode;a.tag===5&&l!==null&&(a=l,l=Tr(e,n),l!=null&&r.unshift(Ar(e,l,a)),l=Tr(e,t),l!=null&&r.push(Ar(e,l,a))),e=e.return}return r}function kn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function hu(e,t,n,r,a){for(var l=t._reactName,o=[];n!==null&&n!==r;){var i=n,s=i.alternate,u=i.stateNode;if(s!==null&&s===r)break;i.tag===5&&u!==null&&(i=u,a?(s=Tr(n,l),s!=null&&o.unshift(Ar(n,s,i))):a||(s=Tr(n,l),s!=null&&o.push(Ar(n,s,i)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var vh=/\r\n?/g,yh=/\u0000|\uFFFD/g;function mu(e){return(typeof e=="string"?e:""+e).replace(vh,`
`).replace(yh,"")}function Na(e,t,n){if(t=mu(t),mu(e)!==t&&n)throw Error(k(425))}function Wa(){}var Ao=null,Io=null;function Mo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var jo=typeof setTimeout=="function"?setTimeout:void 0,gh=typeof clearTimeout=="function"?clearTimeout:void 0,vu=typeof Promise=="function"?Promise:void 0,wh=typeof queueMicrotask=="function"?queueMicrotask:typeof vu<"u"?function(e){return vu.resolve(null).then(e).catch(_h)}:jo;function _h(e){setTimeout(function(){throw e})}function lo(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(r===0){e.removeChild(a),br(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=a}while(n);br(t)}function Ut(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function yu(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Xn=Math.random().toString(36).slice(2),st="__reactFiber$"+Xn,Ir="__reactProps$"+Xn,wt="__reactContainer$"+Xn,zo="__reactEvents$"+Xn,Nh="__reactListeners$"+Xn,Sh="__reactHandles$"+Xn;function rn(e){var t=e[st];if(t)return t;for(var n=e.parentNode;n;){if(t=n[wt]||n[st]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=yu(e);e!==null;){if(n=e[st])return n;e=yu(e)}return t}e=n,n=e.parentNode}return null}function Qr(e){return e=e[st]||e[wt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Tn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(k(33))}function dl(e){return e[Ir]||null}var Vo=[],Dn=-1;function Ht(e){return{current:e}}function Y(e){0>Dn||(e.current=Vo[Dn],Vo[Dn]=null,Dn--)}function W(e,t){Dn++,Vo[Dn]=e.current,e.current=t}var Vt={},Se=Ht(Vt),Te=Ht(!1),un=Vt;function Hn(e,t){var n=e.type.contextTypes;if(!n)return Vt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a={},l;for(l in n)a[l]=t[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function De(e){return e=e.childContextTypes,e!=null}function Ka(){Y(Te),Y(Se)}function gu(e,t,n){if(Se.current!==Vt)throw Error(k(168));W(Se,t),W(Te,n)}function zc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var a in r)if(!(a in t))throw Error(k(108,sp(e)||"Unknown",a));return te({},n,r)}function Qa(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Vt,un=Se.current,W(Se,e),W(Te,Te.current),!0}function wu(e,t,n){var r=e.stateNode;if(!r)throw Error(k(169));n?(e=zc(e,t,un),r.__reactInternalMemoizedMergedChildContext=e,Y(Te),Y(Se),W(Se,e)):Y(Te),W(Te,n)}var ht=null,fl=!1,oo=!1;function Vc(e){ht===null?ht=[e]:ht.push(e)}function Eh(e){fl=!0,Vc(e)}function Wt(){if(!oo&&ht!==null){oo=!0;var e=0,t=B;try{var n=ht;for(B=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}ht=null,fl=!1}catch(a){throw ht!==null&&(ht=ht.slice(e+1)),pc(mi,Wt),a}finally{B=t,oo=!1}}return null}var Ln=[],bn=0,Ya=null,Ja=0,ze=[],Ve=0,cn=null,mt=1,vt="";function tn(e,t){Ln[bn++]=Ja,Ln[bn++]=Ya,Ya=e,Ja=t}function Bc(e,t,n){ze[Ve++]=mt,ze[Ve++]=vt,ze[Ve++]=cn,cn=e;var r=mt;e=vt;var a=32-Ze(r)-1;r&=~(1<<a),n+=1;var l=32-Ze(t)+a;if(30<l){var o=a-a%5;l=(r&(1<<o)-1).toString(32),r>>=o,a-=o,mt=1<<32-Ze(t)+a|n<<a|r,vt=l+e}else mt=1<<l|n<<a|r,vt=e}function ki(e){e.return!==null&&(tn(e,1),Bc(e,1,0))}function Ri(e){for(;e===Ya;)Ya=Ln[--bn],Ln[bn]=null,Ja=Ln[--bn],Ln[bn]=null;for(;e===cn;)cn=ze[--Ve],ze[Ve]=null,vt=ze[--Ve],ze[Ve]=null,mt=ze[--Ve],ze[Ve]=null}var Ue=null,Oe=null,X=!1,Xe=null;function Hc(e,t){var n=Be(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function _u(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ue=e,Oe=Ut(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ue=e,Oe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=cn!==null?{id:mt,overflow:vt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Be(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ue=e,Oe=null,!0):!1;default:return!1}}function Bo(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ho(e){if(X){var t=Oe;if(t){var n=t;if(!_u(e,t)){if(Bo(e))throw Error(k(418));t=Ut(n.nextSibling);var r=Ue;t&&_u(e,t)?Hc(r,n):(e.flags=e.flags&-4097|2,X=!1,Ue=e)}}else{if(Bo(e))throw Error(k(418));e.flags=e.flags&-4097|2,X=!1,Ue=e}}}function Nu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ue=e}function Sa(e){if(e!==Ue)return!1;if(!X)return Nu(e),X=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Mo(e.type,e.memoizedProps)),t&&(t=Oe)){if(Bo(e))throw Wc(),Error(k(418));for(;t;)Hc(e,t),t=Ut(t.nextSibling)}if(Nu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Oe=Ut(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Oe=null}}else Oe=Ue?Ut(e.stateNode.nextSibling):null;return!0}function Wc(){for(var e=Oe;e;)e=Ut(e.nextSibling)}function Wn(){Oe=Ue=null,X=!1}function Ci(e){Xe===null?Xe=[e]:Xe.push(e)}var kh=St.ReactCurrentBatchConfig;function dr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(k(309));var r=n.stateNode}if(!r)throw Error(k(147,e));var a=r,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(o){var i=a.refs;o===null?delete i[l]:i[l]=o},t._stringRef=l,t)}if(typeof e!="string")throw Error(k(284));if(!n._owner)throw Error(k(290,e))}return e}function Ea(e,t){throw e=Object.prototype.toString.call(t),Error(k(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Su(e){var t=e._init;return t(e._payload)}function Kc(e){function t(f,c){if(e){var p=f.deletions;p===null?(f.deletions=[c],f.flags|=16):p.push(c)}}function n(f,c){if(!e)return null;for(;c!==null;)t(f,c),c=c.sibling;return null}function r(f,c){for(f=new Map;c!==null;)c.key!==null?f.set(c.key,c):f.set(c.index,c),c=c.sibling;return f}function a(f,c){return f=jt(f,c),f.index=0,f.sibling=null,f}function l(f,c,p){return f.index=p,e?(p=f.alternate,p!==null?(p=p.index,p<c?(f.flags|=2,c):p):(f.flags|=2,c)):(f.flags|=1048576,c)}function o(f){return e&&f.alternate===null&&(f.flags|=2),f}function i(f,c,p,y){return c===null||c.tag!==6?(c=ho(p,f.mode,y),c.return=f,c):(c=a(c,p),c.return=f,c)}function s(f,c,p,y){var C=p.type;return C===Cn?h(f,c,p.props.children,y,p.key):c!==null&&(c.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===xt&&Su(C)===c.type)?(y=a(c,p.props),y.ref=dr(f,c,p),y.return=f,y):(y=Ua(p.type,p.key,p.props,null,f.mode,y),y.ref=dr(f,c,p),y.return=f,y)}function u(f,c,p,y){return c===null||c.tag!==4||c.stateNode.containerInfo!==p.containerInfo||c.stateNode.implementation!==p.implementation?(c=mo(p,f.mode,y),c.return=f,c):(c=a(c,p.children||[]),c.return=f,c)}function h(f,c,p,y,C){return c===null||c.tag!==7?(c=sn(p,f.mode,y,C),c.return=f,c):(c=a(c,p),c.return=f,c)}function m(f,c,p){if(typeof c=="string"&&c!==""||typeof c=="number")return c=ho(""+c,f.mode,p),c.return=f,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case sa:return p=Ua(c.type,c.key,c.props,null,f.mode,p),p.ref=dr(f,null,c),p.return=f,p;case Rn:return c=mo(c,f.mode,p),c.return=f,c;case xt:var y=c._init;return m(f,y(c._payload),p)}if(vr(c)||ir(c))return c=sn(c,f.mode,p,null),c.return=f,c;Ea(f,c)}return null}function v(f,c,p,y){var C=c!==null?c.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return C!==null?null:i(f,c,""+p,y);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case sa:return p.key===C?s(f,c,p,y):null;case Rn:return p.key===C?u(f,c,p,y):null;case xt:return C=p._init,v(f,c,C(p._payload),y)}if(vr(p)||ir(p))return C!==null?null:h(f,c,p,y,null);Ea(f,p)}return null}function _(f,c,p,y,C){if(typeof y=="string"&&y!==""||typeof y=="number")return f=f.get(p)||null,i(c,f,""+y,C);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case sa:return f=f.get(y.key===null?p:y.key)||null,s(c,f,y,C);case Rn:return f=f.get(y.key===null?p:y.key)||null,u(c,f,y,C);case xt:var x=y._init;return _(f,c,p,x(y._payload),C)}if(vr(y)||ir(y))return f=f.get(p)||null,h(c,f,y,C,null);Ea(c,y)}return null}function N(f,c,p,y){for(var C=null,x=null,$=c,L=c=0,A=null;$!==null&&L<p.length;L++){$.index>L?(A=$,$=null):A=$.sibling;var b=v(f,$,p[L],y);if(b===null){$===null&&($=A);break}e&&$&&b.alternate===null&&t(f,$),c=l(b,c,L),x===null?C=b:x.sibling=b,x=b,$=A}if(L===p.length)return n(f,$),X&&tn(f,L),C;if($===null){for(;L<p.length;L++)$=m(f,p[L],y),$!==null&&(c=l($,c,L),x===null?C=$:x.sibling=$,x=$);return X&&tn(f,L),C}for($=r(f,$);L<p.length;L++)A=_($,f,L,p[L],y),A!==null&&(e&&A.alternate!==null&&$.delete(A.key===null?L:A.key),c=l(A,c,L),x===null?C=A:x.sibling=A,x=A);return e&&$.forEach(function(F){return t(f,F)}),X&&tn(f,L),C}function g(f,c,p,y){var C=ir(p);if(typeof C!="function")throw Error(k(150));if(p=C.call(p),p==null)throw Error(k(151));for(var x=C=null,$=c,L=c=0,A=null,b=p.next();$!==null&&!b.done;L++,b=p.next()){$.index>L?(A=$,$=null):A=$.sibling;var F=v(f,$,b.value,y);if(F===null){$===null&&($=A);break}e&&$&&F.alternate===null&&t(f,$),c=l(F,c,L),x===null?C=F:x.sibling=F,x=F,$=A}if(b.done)return n(f,$),X&&tn(f,L),C;if($===null){for(;!b.done;L++,b=p.next())b=m(f,b.value,y),b!==null&&(c=l(b,c,L),x===null?C=b:x.sibling=b,x=b);return X&&tn(f,L),C}for($=r(f,$);!b.done;L++,b=p.next())b=_($,f,L,b.value,y),b!==null&&(e&&b.alternate!==null&&$.delete(b.key===null?L:b.key),c=l(b,c,L),x===null?C=b:x.sibling=b,x=b);return e&&$.forEach(function(ne){return t(f,ne)}),X&&tn(f,L),C}function E(f,c,p,y){if(typeof p=="object"&&p!==null&&p.type===Cn&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case sa:e:{for(var C=p.key,x=c;x!==null;){if(x.key===C){if(C=p.type,C===Cn){if(x.tag===7){n(f,x.sibling),c=a(x,p.props.children),c.return=f,f=c;break e}}else if(x.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===xt&&Su(C)===x.type){n(f,x.sibling),c=a(x,p.props),c.ref=dr(f,x,p),c.return=f,f=c;break e}n(f,x);break}else t(f,x);x=x.sibling}p.type===Cn?(c=sn(p.props.children,f.mode,y,p.key),c.return=f,f=c):(y=Ua(p.type,p.key,p.props,null,f.mode,y),y.ref=dr(f,c,p),y.return=f,f=y)}return o(f);case Rn:e:{for(x=p.key;c!==null;){if(c.key===x)if(c.tag===4&&c.stateNode.containerInfo===p.containerInfo&&c.stateNode.implementation===p.implementation){n(f,c.sibling),c=a(c,p.children||[]),c.return=f,f=c;break e}else{n(f,c);break}else t(f,c);c=c.sibling}c=mo(p,f.mode,y),c.return=f,f=c}return o(f);case xt:return x=p._init,E(f,c,x(p._payload),y)}if(vr(p))return N(f,c,p,y);if(ir(p))return g(f,c,p,y);Ea(f,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,c!==null&&c.tag===6?(n(f,c.sibling),c=a(c,p),c.return=f,f=c):(n(f,c),c=ho(p,f.mode,y),c.return=f,f=c),o(f)):n(f,c)}return E}var Kn=Kc(!0),Qc=Kc(!1),Ga=Ht(null),Xa=null,Fn=null,xi=null;function Pi(){xi=Fn=Xa=null}function $i(e){var t=Ga.current;Y(Ga),e._currentValue=t}function Wo(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function zn(e,t){Xa=e,xi=Fn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&($e=!0),e.firstContext=null)}function We(e){var t=e._currentValue;if(xi!==e)if(e={context:e,memoizedValue:t,next:null},Fn===null){if(Xa===null)throw Error(k(308));Fn=e,Xa.dependencies={lanes:0,firstContext:e}}else Fn=Fn.next=e;return t}var an=null;function Ti(e){an===null?an=[e]:an.push(e)}function Yc(e,t,n,r){var a=t.interleaved;return a===null?(n.next=n,Ti(t)):(n.next=a.next,a.next=n),t.interleaved=n,_t(e,r)}function _t(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Pt=!1;function Di(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Jc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function yt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function At(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(I&2)!==0){var a=r.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),r.pending=t,_t(e,n)}return a=r.interleaved,a===null?(t.next=t,Ti(r)):(t.next=a.next,a.next=t),r.interleaved=t,_t(e,n)}function Ta(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,vi(e,n)}}function Eu(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var a=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};l===null?a=l=o:l=l.next=o,n=n.next}while(n!==null);l===null?a=l=t:l=l.next=t}else a=l=t;n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Za(e,t,n,r){var a=e.updateQueue;Pt=!1;var l=a.firstBaseUpdate,o=a.lastBaseUpdate,i=a.shared.pending;if(i!==null){a.shared.pending=null;var s=i,u=s.next;s.next=null,o===null?l=u:o.next=u,o=s;var h=e.alternate;h!==null&&(h=h.updateQueue,i=h.lastBaseUpdate,i!==o&&(i===null?h.firstBaseUpdate=u:i.next=u,h.lastBaseUpdate=s))}if(l!==null){var m=a.baseState;o=0,h=u=s=null,i=l;do{var v=i.lane,_=i.eventTime;if((r&v)===v){h!==null&&(h=h.next={eventTime:_,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null});e:{var N=e,g=i;switch(v=t,_=n,g.tag){case 1:if(N=g.payload,typeof N=="function"){m=N.call(_,m,v);break e}m=N;break e;case 3:N.flags=N.flags&-65537|128;case 0:if(N=g.payload,v=typeof N=="function"?N.call(_,m,v):N,v==null)break e;m=te({},m,v);break e;case 2:Pt=!0}}i.callback!==null&&i.lane!==0&&(e.flags|=64,v=a.effects,v===null?a.effects=[i]:v.push(i))}else _={eventTime:_,lane:v,tag:i.tag,payload:i.payload,callback:i.callback,next:null},h===null?(u=h=_,s=m):h=h.next=_,o|=v;if(i=i.next,i===null){if(i=a.shared.pending,i===null)break;v=i,i=v.next,v.next=null,a.lastBaseUpdate=v,a.shared.pending=null}}while(!0);if(h===null&&(s=m),a.baseState=s,a.firstBaseUpdate=u,a.lastBaseUpdate=h,t=a.shared.interleaved,t!==null){a=t;do o|=a.lane,a=a.next;while(a!==t)}else l===null&&(a.shared.lanes=0);fn|=o,e.lanes=o,e.memoizedState=m}}function ku(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(a!==null){if(r.callback=null,r=n,typeof a!="function")throw Error(k(191,a));a.call(r)}}}var Yr={},ct=Ht(Yr),Mr=Ht(Yr),jr=Ht(Yr);function ln(e){if(e===Yr)throw Error(k(174));return e}function Li(e,t){switch(W(jr,t),W(Mr,e),W(ct,Yr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ro(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ro(t,e)}Y(ct),W(ct,t)}function Qn(){Y(ct),Y(Mr),Y(jr)}function Gc(e){ln(jr.current);var t=ln(ct.current),n=Ro(t,e.type);t!==n&&(W(Mr,e),W(ct,n))}function bi(e){Mr.current===e&&(Y(ct),Y(Mr))}var q=Ht(0);function qa(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var io=[];function Fi(){for(var e=0;e<io.length;e++)io[e]._workInProgressVersionPrimary=null;io.length=0}var Da=St.ReactCurrentDispatcher,so=St.ReactCurrentBatchConfig,dn=0,ee=null,oe=null,de=null,el=!1,kr=!1,zr=0,Rh=0;function we(){throw Error(k(321))}function Oi(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!et(e[n],t[n]))return!1;return!0}function Ui(e,t,n,r,a,l){if(dn=l,ee=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Da.current=e===null||e.memoizedState===null?$h:Th,e=n(r,a),kr){l=0;do{if(kr=!1,zr=0,25<=l)throw Error(k(301));l+=1,de=oe=null,t.updateQueue=null,Da.current=Dh,e=n(r,a)}while(kr)}if(Da.current=tl,t=oe!==null&&oe.next!==null,dn=0,de=oe=ee=null,el=!1,t)throw Error(k(300));return e}function Ai(){var e=zr!==0;return zr=0,e}function it(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return de===null?ee.memoizedState=de=e:de=de.next=e,de}function Ke(){if(oe===null){var e=ee.alternate;e=e!==null?e.memoizedState:null}else e=oe.next;var t=de===null?ee.memoizedState:de.next;if(t!==null)de=t,oe=e;else{if(e===null)throw Error(k(310));oe=e,e={memoizedState:oe.memoizedState,baseState:oe.baseState,baseQueue:oe.baseQueue,queue:oe.queue,next:null},de===null?ee.memoizedState=de=e:de=de.next=e}return de}function Vr(e,t){return typeof t=="function"?t(e):t}function uo(e){var t=Ke(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var r=oe,a=r.baseQueue,l=n.pending;if(l!==null){if(a!==null){var o=a.next;a.next=l.next,l.next=o}r.baseQueue=a=l,n.pending=null}if(a!==null){l=a.next,r=r.baseState;var i=o=null,s=null,u=l;do{var h=u.lane;if((dn&h)===h)s!==null&&(s=s.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var m={lane:h,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};s===null?(i=s=m,o=r):s=s.next=m,ee.lanes|=h,fn|=h}u=u.next}while(u!==null&&u!==l);s===null?o=r:s.next=i,et(r,t.memoizedState)||($e=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){a=e;do l=a.lane,ee.lanes|=l,fn|=l,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function co(e){var t=Ke(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,l=t.memoizedState;if(a!==null){n.pending=null;var o=a=a.next;do l=e(l,o.action),o=o.next;while(o!==a);et(l,t.memoizedState)||($e=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),n.lastRenderedState=l}return[l,r]}function Xc(){}function Zc(e,t){var n=ee,r=Ke(),a=t(),l=!et(r.memoizedState,a);if(l&&(r.memoizedState=a,$e=!0),r=r.queue,Ii(td.bind(null,n,r,e),[e]),r.getSnapshot!==t||l||de!==null&&de.memoizedState.tag&1){if(n.flags|=2048,Br(9,ed.bind(null,n,r,a,t),void 0,null),fe===null)throw Error(k(349));(dn&30)!==0||qc(n,t,a)}return a}function qc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ee.updateQueue,t===null?(t={lastEffect:null,stores:null},ee.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function ed(e,t,n,r){t.value=n,t.getSnapshot=r,nd(t)&&rd(e)}function td(e,t,n){return n(function(){nd(t)&&rd(e)})}function nd(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!et(e,n)}catch{return!0}}function rd(e){var t=_t(e,1);t!==null&&qe(t,e,1,-1)}function Ru(e){var t=it();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Vr,lastRenderedState:e},t.queue=e,e=e.dispatch=Ph.bind(null,ee,e),[t.memoizedState,e]}function Br(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ee.updateQueue,t===null?(t={lastEffect:null,stores:null},ee.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function ad(){return Ke().memoizedState}function La(e,t,n,r){var a=it();ee.flags|=e,a.memoizedState=Br(1|t,n,void 0,r===void 0?null:r)}function pl(e,t,n,r){var a=Ke();r=r===void 0?null:r;var l=void 0;if(oe!==null){var o=oe.memoizedState;if(l=o.destroy,r!==null&&Oi(r,o.deps)){a.memoizedState=Br(t,n,l,r);return}}ee.flags|=e,a.memoizedState=Br(1|t,n,l,r)}function Cu(e,t){return La(8390656,8,e,t)}function Ii(e,t){return pl(2048,8,e,t)}function ld(e,t){return pl(4,2,e,t)}function od(e,t){return pl(4,4,e,t)}function id(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function sd(e,t,n){return n=n!=null?n.concat([e]):null,pl(4,4,id.bind(null,t,e),n)}function Mi(){}function ud(e,t){var n=Ke();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Oi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function cd(e,t){var n=Ke();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Oi(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function dd(e,t,n){return(dn&21)===0?(e.baseState&&(e.baseState=!1,$e=!0),e.memoizedState=n):(et(n,t)||(n=vc(),ee.lanes|=n,fn|=n,e.baseState=!0),t)}function Ch(e,t){var n=B;B=n!==0&&4>n?n:4,e(!0);var r=so.transition;so.transition={};try{e(!1),t()}finally{B=n,so.transition=r}}function fd(){return Ke().memoizedState}function xh(e,t,n){var r=Mt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},pd(e))hd(t,n);else if(n=Yc(e,t,n,r),n!==null){var a=Ce();qe(n,e,r,a),md(n,t,r)}}function Ph(e,t,n){var r=Mt(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(pd(e))hd(t,a);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var o=t.lastRenderedState,i=l(o,n);if(a.hasEagerState=!0,a.eagerState=i,et(i,o)){var s=t.interleaved;s===null?(a.next=a,Ti(t)):(a.next=s.next,s.next=a),t.interleaved=a;return}}catch{}finally{}n=Yc(e,t,a,r),n!==null&&(a=Ce(),qe(n,e,r,a),md(n,t,r))}}function pd(e){var t=e.alternate;return e===ee||t!==null&&t===ee}function hd(e,t){kr=el=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function md(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,vi(e,n)}}var tl={readContext:We,useCallback:we,useContext:we,useEffect:we,useImperativeHandle:we,useInsertionEffect:we,useLayoutEffect:we,useMemo:we,useReducer:we,useRef:we,useState:we,useDebugValue:we,useDeferredValue:we,useTransition:we,useMutableSource:we,useSyncExternalStore:we,useId:we,unstable_isNewReconciler:!1},$h={readContext:We,useCallback:function(e,t){return it().memoizedState=[e,t===void 0?null:t],e},useContext:We,useEffect:Cu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,La(4194308,4,id.bind(null,t,e),n)},useLayoutEffect:function(e,t){return La(4194308,4,e,t)},useInsertionEffect:function(e,t){return La(4,2,e,t)},useMemo:function(e,t){var n=it();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=it();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=xh.bind(null,ee,e),[r.memoizedState,e]},useRef:function(e){var t=it();return e={current:e},t.memoizedState=e},useState:Ru,useDebugValue:Mi,useDeferredValue:function(e){return it().memoizedState=e},useTransition:function(){var e=Ru(!1),t=e[0];return e=Ch.bind(null,e[1]),it().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ee,a=it();if(X){if(n===void 0)throw Error(k(407));n=n()}else{if(n=t(),fe===null)throw Error(k(349));(dn&30)!==0||qc(r,t,n)}a.memoizedState=n;var l={value:n,getSnapshot:t};return a.queue=l,Cu(td.bind(null,r,l,e),[e]),r.flags|=2048,Br(9,ed.bind(null,r,l,n,t),void 0,null),n},useId:function(){var e=it(),t=fe.identifierPrefix;if(X){var n=vt,r=mt;n=(r&~(1<<32-Ze(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=zr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Rh++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Th={readContext:We,useCallback:ud,useContext:We,useEffect:Ii,useImperativeHandle:sd,useInsertionEffect:ld,useLayoutEffect:od,useMemo:cd,useReducer:uo,useRef:ad,useState:function(){return uo(Vr)},useDebugValue:Mi,useDeferredValue:function(e){var t=Ke();return dd(t,oe.memoizedState,e)},useTransition:function(){var e=uo(Vr)[0],t=Ke().memoizedState;return[e,t]},useMutableSource:Xc,useSyncExternalStore:Zc,useId:fd,unstable_isNewReconciler:!1},Dh={readContext:We,useCallback:ud,useContext:We,useEffect:Ii,useImperativeHandle:sd,useInsertionEffect:ld,useLayoutEffect:od,useMemo:cd,useReducer:co,useRef:ad,useState:function(){return co(Vr)},useDebugValue:Mi,useDeferredValue:function(e){var t=Ke();return oe===null?t.memoizedState=e:dd(t,oe.memoizedState,e)},useTransition:function(){var e=co(Vr)[0],t=Ke().memoizedState;return[e,t]},useMutableSource:Xc,useSyncExternalStore:Zc,useId:fd,unstable_isNewReconciler:!1};function Je(e,t){if(e&&e.defaultProps){t=te({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ko(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:te({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var hl={isMounted:function(e){return(e=e._reactInternals)?mn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ce(),a=Mt(e),l=yt(r,a);l.payload=t,n!=null&&(l.callback=n),t=At(e,l,a),t!==null&&(qe(t,e,a,r),Ta(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ce(),a=Mt(e),l=yt(r,a);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=At(e,l,a),t!==null&&(qe(t,e,a,r),Ta(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ce(),r=Mt(e),a=yt(n,r);a.tag=2,t!=null&&(a.callback=t),t=At(e,a,r),t!==null&&(qe(t,e,r,n),Ta(t,e,r))}};function xu(e,t,n,r,a,l,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,o):t.prototype&&t.prototype.isPureReactComponent?!Or(n,r)||!Or(a,l):!0}function vd(e,t,n){var r=!1,a=Vt,l=t.contextType;return typeof l=="object"&&l!==null?l=We(l):(a=De(t)?un:Se.current,r=t.contextTypes,l=(r=r!=null)?Hn(e,a):Vt),t=new t(n,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=hl,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=l),t}function Pu(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&hl.enqueueReplaceState(t,t.state,null)}function Qo(e,t,n,r){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},Di(e);var l=t.contextType;typeof l=="object"&&l!==null?a.context=We(l):(l=De(t)?un:Se.current,a.context=Hn(e,l)),a.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(Ko(e,t,l,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&hl.enqueueReplaceState(a,a.state,null),Za(e,n,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function Yn(e,t){try{var n="",r=t;do n+=ip(r),r=r.return;while(r);var a=n}catch(l){a=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:a,digest:null}}function fo(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Yo(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Lh=typeof WeakMap=="function"?WeakMap:Map;function yd(e,t,n){n=yt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){rl||(rl=!0,ai=r),Yo(e,t)},n}function gd(e,t,n){n=yt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var a=t.value;n.payload=function(){return r(a)},n.callback=function(){Yo(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(n.callback=function(){Yo(e,t),typeof r!="function"&&(It===null?It=new Set([this]):It.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function $u(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Lh;var a=new Set;r.set(t,a)}else a=r.get(t),a===void 0&&(a=new Set,r.set(t,a));a.has(n)||(a.add(n),e=Kh.bind(null,e,t,n),t.then(e,e))}function Tu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Du(e,t,n,r,a){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=yt(-1,1),t.tag=2,At(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=a,e)}var bh=St.ReactCurrentOwner,$e=!1;function Re(e,t,n,r){t.child=e===null?Qc(t,null,n,r):Kn(t,e.child,n,r)}function Lu(e,t,n,r,a){n=n.render;var l=t.ref;return zn(t,a),r=Ui(e,t,n,r,l,a),n=Ai(),e!==null&&!$e?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Nt(e,t,a)):(X&&n&&ki(t),t.flags|=1,Re(e,t,r,a),t.child)}function bu(e,t,n,r,a){if(e===null){var l=n.type;return typeof l=="function"&&!Qi(l)&&l.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=l,wd(e,t,l,r,a)):(e=Ua(n.type,null,r,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,(e.lanes&a)===0){var o=l.memoizedProps;if(n=n.compare,n=n!==null?n:Or,n(o,r)&&e.ref===t.ref)return Nt(e,t,a)}return t.flags|=1,e=jt(l,r),e.ref=t.ref,e.return=t,t.child=e}function wd(e,t,n,r,a){if(e!==null){var l=e.memoizedProps;if(Or(l,r)&&e.ref===t.ref)if($e=!1,t.pendingProps=r=l,(e.lanes&a)!==0)(e.flags&131072)!==0&&($e=!0);else return t.lanes=e.lanes,Nt(e,t,a)}return Jo(e,t,n,r,a)}function _d(e,t,n){var r=t.pendingProps,a=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},W(Un,Fe),Fe|=n;else{if((n&1073741824)===0)return e=l!==null?l.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,W(Un,Fe),Fe|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:n,W(Un,Fe),Fe|=r}else l!==null?(r=l.baseLanes|n,t.memoizedState=null):r=n,W(Un,Fe),Fe|=r;return Re(e,t,a,n),t.child}function Nd(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Jo(e,t,n,r,a){var l=De(n)?un:Se.current;return l=Hn(t,l),zn(t,a),n=Ui(e,t,n,r,l,a),r=Ai(),e!==null&&!$e?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Nt(e,t,a)):(X&&r&&ki(t),t.flags|=1,Re(e,t,n,a),t.child)}function Fu(e,t,n,r,a){if(De(n)){var l=!0;Qa(t)}else l=!1;if(zn(t,a),t.stateNode===null)ba(e,t),vd(t,n,r),Qo(t,n,r,a),r=!0;else if(e===null){var o=t.stateNode,i=t.memoizedProps;o.props=i;var s=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=We(u):(u=De(n)?un:Se.current,u=Hn(t,u));var h=n.getDerivedStateFromProps,m=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(i!==r||s!==u)&&Pu(t,o,r,u),Pt=!1;var v=t.memoizedState;o.state=v,Za(t,r,o,a),s=t.memoizedState,i!==r||v!==s||Te.current||Pt?(typeof h=="function"&&(Ko(t,n,h,r),s=t.memoizedState),(i=Pt||xu(t,n,i,r,v,s,u))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),o.props=r,o.state=s,o.context=u,r=i):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,Jc(e,t),i=t.memoizedProps,u=t.type===t.elementType?i:Je(t.type,i),o.props=u,m=t.pendingProps,v=o.context,s=n.contextType,typeof s=="object"&&s!==null?s=We(s):(s=De(n)?un:Se.current,s=Hn(t,s));var _=n.getDerivedStateFromProps;(h=typeof _=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(i!==m||v!==s)&&Pu(t,o,r,s),Pt=!1,v=t.memoizedState,o.state=v,Za(t,r,o,a);var N=t.memoizedState;i!==m||v!==N||Te.current||Pt?(typeof _=="function"&&(Ko(t,n,_,r),N=t.memoizedState),(u=Pt||xu(t,n,u,r,v,N,s)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,N,s),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,N,s)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=N),o.props=r,o.state=N,o.context=s,r=u):(typeof o.componentDidUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),r=!1)}return Go(e,t,n,r,l,a)}function Go(e,t,n,r,a,l){Nd(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return a&&wu(t,n,!1),Nt(e,t,l);r=t.stateNode,bh.current=t;var i=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=Kn(t,e.child,null,l),t.child=Kn(t,null,i,l)):Re(e,t,i,l),t.memoizedState=r.state,a&&wu(t,n,!0),t.child}function Sd(e){var t=e.stateNode;t.pendingContext?gu(e,t.pendingContext,t.pendingContext!==t.context):t.context&&gu(e,t.context,!1),Li(e,t.containerInfo)}function Ou(e,t,n,r,a){return Wn(),Ci(a),t.flags|=256,Re(e,t,n,r),t.child}var Xo={dehydrated:null,treeContext:null,retryLane:0};function Zo(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ed(e,t,n){var r=t.pendingProps,a=q.current,l=!1,o=(t.flags&128)!==0,i;if((i=o)||(i=e!==null&&e.memoizedState===null?!1:(a&2)!==0),i?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),W(q,a&1),e===null)return Ho(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(o=r.children,e=r.fallback,l?(r=t.mode,l=t.child,o={mode:"hidden",children:o},(r&1)===0&&l!==null?(l.childLanes=0,l.pendingProps=o):l=yl(o,r,0,null),e=sn(e,r,n,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=Zo(n),t.memoizedState=Xo,e):ji(t,o));if(a=e.memoizedState,a!==null&&(i=a.dehydrated,i!==null))return Fh(e,t,o,r,i,a,n);if(l){l=r.fallback,o=t.mode,a=e.child,i=a.sibling;var s={mode:"hidden",children:r.children};return(o&1)===0&&t.child!==a?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=jt(a,s),r.subtreeFlags=a.subtreeFlags&14680064),i!==null?l=jt(i,l):(l=sn(l,o,n,null),l.flags|=2),l.return=t,r.return=t,r.sibling=l,t.child=r,r=l,l=t.child,o=e.child.memoizedState,o=o===null?Zo(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},l.memoizedState=o,l.childLanes=e.childLanes&~n,t.memoizedState=Xo,r}return l=e.child,e=l.sibling,r=jt(l,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function ji(e,t){return t=yl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function ka(e,t,n,r){return r!==null&&Ci(r),Kn(t,e.child,null,n),e=ji(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Fh(e,t,n,r,a,l,o){if(n)return t.flags&256?(t.flags&=-257,r=fo(Error(k(422))),ka(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=r.fallback,a=t.mode,r=yl({mode:"visible",children:r.children},a,0,null),l=sn(l,a,o,null),l.flags|=2,r.return=t,l.return=t,r.sibling=l,t.child=r,(t.mode&1)!==0&&Kn(t,e.child,null,o),t.child.memoizedState=Zo(o),t.memoizedState=Xo,l);if((t.mode&1)===0)return ka(e,t,o,null);if(a.data==="$!"){if(r=a.nextSibling&&a.nextSibling.dataset,r)var i=r.dgst;return r=i,l=Error(k(419)),r=fo(l,r,void 0),ka(e,t,o,r)}if(i=(o&e.childLanes)!==0,$e||i){if(r=fe,r!==null){switch(o&-o){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(r.suspendedLanes|o))!==0?0:a,a!==0&&a!==l.retryLane&&(l.retryLane=a,_t(e,a),qe(r,e,a,-1))}return Ki(),r=fo(Error(k(421))),ka(e,t,o,r)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Qh.bind(null,e),a._reactRetry=t,null):(e=l.treeContext,Oe=Ut(a.nextSibling),Ue=t,X=!0,Xe=null,e!==null&&(ze[Ve++]=mt,ze[Ve++]=vt,ze[Ve++]=cn,mt=e.id,vt=e.overflow,cn=t),t=ji(t,r.children),t.flags|=4096,t)}function Uu(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Wo(e.return,t,n)}function po(e,t,n,r,a){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=a)}function kd(e,t,n){var r=t.pendingProps,a=r.revealOrder,l=r.tail;if(Re(e,t,r.children,n),r=q.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Uu(e,n,t);else if(e.tag===19)Uu(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(W(q,r),(t.mode&1)===0)t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&qa(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),po(t,!1,a,n,l);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&qa(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}po(t,!0,n,null,l);break;case"together":po(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ba(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Nt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),fn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(k(153));if(t.child!==null){for(e=t.child,n=jt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=jt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Oh(e,t,n){switch(t.tag){case 3:Sd(t),Wn();break;case 5:Gc(t);break;case 1:De(t.type)&&Qa(t);break;case 4:Li(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,a=t.memoizedProps.value;W(Ga,r._currentValue),r._currentValue=a;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(W(q,q.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?Ed(e,t,n):(W(q,q.current&1),e=Nt(e,t,n),e!==null?e.sibling:null);W(q,q.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return kd(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),W(q,q.current),r)break;return null;case 22:case 23:return t.lanes=0,_d(e,t,n)}return Nt(e,t,n)}var Rd,qo,Cd,xd;Rd=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};qo=function(){};Cd=function(e,t,n,r){var a=e.memoizedProps;if(a!==r){e=t.stateNode,ln(ct.current);var l=null;switch(n){case"input":a=No(e,a),r=No(e,r),l=[];break;case"select":a=te({},a,{value:void 0}),r=te({},r,{value:void 0}),l=[];break;case"textarea":a=ko(e,a),r=ko(e,r),l=[];break;default:typeof a.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Wa)}Co(n,r);var o;n=null;for(u in a)if(!r.hasOwnProperty(u)&&a.hasOwnProperty(u)&&a[u]!=null)if(u==="style"){var i=a[u];for(o in i)i.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Pr.hasOwnProperty(u)?l||(l=[]):(l=l||[]).push(u,null));for(u in r){var s=r[u];if(i=a?.[u],r.hasOwnProperty(u)&&s!==i&&(s!=null||i!=null))if(u==="style")if(i){for(o in i)!i.hasOwnProperty(o)||s&&s.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in s)s.hasOwnProperty(o)&&i[o]!==s[o]&&(n||(n={}),n[o]=s[o])}else n||(l||(l=[]),l.push(u,n)),n=s;else u==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,i=i?i.__html:void 0,s!=null&&i!==s&&(l=l||[]).push(u,s)):u==="children"?typeof s!="string"&&typeof s!="number"||(l=l||[]).push(u,""+s):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Pr.hasOwnProperty(u)?(s!=null&&u==="onScroll"&&Q("scroll",e),l||i===s||(l=[])):(l=l||[]).push(u,s))}n&&(l=l||[]).push("style",n);var u=l;(t.updateQueue=u)&&(t.flags|=4)}};xd=function(e,t,n,r){n!==r&&(t.flags|=4)};function fr(e,t){if(!X)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function _e(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags&14680064,r|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Uh(e,t,n){var r=t.pendingProps;switch(Ri(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return _e(t),null;case 1:return De(t.type)&&Ka(),_e(t),null;case 3:return r=t.stateNode,Qn(),Y(Te),Y(Se),Fi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Sa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Xe!==null&&(ii(Xe),Xe=null))),qo(e,t),_e(t),null;case 5:bi(t);var a=ln(jr.current);if(n=t.type,e!==null&&t.stateNode!=null)Cd(e,t,n,r,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(k(166));return _e(t),null}if(e=ln(ct.current),Sa(t)){r=t.stateNode,n=t.type;var l=t.memoizedProps;switch(r[st]=t,r[Ir]=l,e=(t.mode&1)!==0,n){case"dialog":Q("cancel",r),Q("close",r);break;case"iframe":case"object":case"embed":Q("load",r);break;case"video":case"audio":for(a=0;a<gr.length;a++)Q(gr[a],r);break;case"source":Q("error",r);break;case"img":case"image":case"link":Q("error",r),Q("load",r);break;case"details":Q("toggle",r);break;case"input":Hs(r,l),Q("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},Q("invalid",r);break;case"textarea":Ks(r,l),Q("invalid",r)}Co(n,l),a=null;for(var o in l)if(l.hasOwnProperty(o)){var i=l[o];o==="children"?typeof i=="string"?r.textContent!==i&&(l.suppressHydrationWarning!==!0&&Na(r.textContent,i,e),a=["children",i]):typeof i=="number"&&r.textContent!==""+i&&(l.suppressHydrationWarning!==!0&&Na(r.textContent,i,e),a=["children",""+i]):Pr.hasOwnProperty(o)&&i!=null&&o==="onScroll"&&Q("scroll",r)}switch(n){case"input":ua(r),Ws(r,l,!0);break;case"textarea":ua(r),Qs(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=Wa)}r=a,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=tc(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[st]=t,e[Ir]=r,Rd(e,t,!1,!1),t.stateNode=e;e:{switch(o=xo(n,r),n){case"dialog":Q("cancel",e),Q("close",e),a=r;break;case"iframe":case"object":case"embed":Q("load",e),a=r;break;case"video":case"audio":for(a=0;a<gr.length;a++)Q(gr[a],e);a=r;break;case"source":Q("error",e),a=r;break;case"img":case"image":case"link":Q("error",e),Q("load",e),a=r;break;case"details":Q("toggle",e),a=r;break;case"input":Hs(e,r),a=No(e,r),Q("invalid",e);break;case"option":a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=te({},r,{value:void 0}),Q("invalid",e);break;case"textarea":Ks(e,r),a=ko(e,r),Q("invalid",e);break;default:a=r}Co(n,a),i=a;for(l in i)if(i.hasOwnProperty(l)){var s=i[l];l==="style"?ac(e,s):l==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&nc(e,s)):l==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&$r(e,s):typeof s=="number"&&$r(e,""+s):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(Pr.hasOwnProperty(l)?s!=null&&l==="onScroll"&&Q("scroll",e):s!=null&&ci(e,l,s,o))}switch(n){case"input":ua(e),Ws(e,r,!1);break;case"textarea":ua(e),Qs(e);break;case"option":r.value!=null&&e.setAttribute("value",""+zt(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?An(e,!!r.multiple,l,!1):r.defaultValue!=null&&An(e,!!r.multiple,r.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=Wa)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return _e(t),null;case 6:if(e&&t.stateNode!=null)xd(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(k(166));if(n=ln(jr.current),ln(ct.current),Sa(t)){if(r=t.stateNode,n=t.memoizedProps,r[st]=t,(l=r.nodeValue!==n)&&(e=Ue,e!==null))switch(e.tag){case 3:Na(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Na(r.nodeValue,n,(e.mode&1)!==0)}l&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[st]=t,t.stateNode=r}return _e(t),null;case 13:if(Y(q),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(X&&Oe!==null&&(t.mode&1)!==0&&(t.flags&128)===0)Wc(),Wn(),t.flags|=98560,l=!1;else if(l=Sa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(k(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(k(317));l[st]=t}else Wn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;_e(t),l=!1}else Xe!==null&&(ii(Xe),Xe=null),l=!0;if(!l)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(q.current&1)!==0?ie===0&&(ie=3):Ki())),t.updateQueue!==null&&(t.flags|=4),_e(t),null);case 4:return Qn(),qo(e,t),e===null&&Ur(t.stateNode.containerInfo),_e(t),null;case 10:return $i(t.type._context),_e(t),null;case 17:return De(t.type)&&Ka(),_e(t),null;case 19:if(Y(q),l=t.memoizedState,l===null)return _e(t),null;if(r=(t.flags&128)!==0,o=l.rendering,o===null)if(r)fr(l,!1);else{if(ie!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(o=qa(e),o!==null){for(t.flags|=128,fr(l,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)l=n,e=r,l.flags&=14680066,o=l.alternate,o===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=o.childLanes,l.lanes=o.lanes,l.child=o.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=o.memoizedProps,l.memoizedState=o.memoizedState,l.updateQueue=o.updateQueue,l.type=o.type,e=o.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return W(q,q.current&1|2),t.child}e=e.sibling}l.tail!==null&&ae()>Jn&&(t.flags|=128,r=!0,fr(l,!1),t.lanes=4194304)}else{if(!r)if(e=qa(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),fr(l,!0),l.tail===null&&l.tailMode==="hidden"&&!o.alternate&&!X)return _e(t),null}else 2*ae()-l.renderingStartTime>Jn&&n!==1073741824&&(t.flags|=128,r=!0,fr(l,!1),t.lanes=4194304);l.isBackwards?(o.sibling=t.child,t.child=o):(n=l.last,n!==null?n.sibling=o:t.child=o,l.last=o)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=ae(),t.sibling=null,n=q.current,W(q,r?n&1|2:n&1),t):(_e(t),null);case 22:case 23:return Wi(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(Fe&1073741824)!==0&&(_e(t),t.subtreeFlags&6&&(t.flags|=8192)):_e(t),null;case 24:return null;case 25:return null}throw Error(k(156,t.tag))}function Ah(e,t){switch(Ri(t),t.tag){case 1:return De(t.type)&&Ka(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Qn(),Y(Te),Y(Se),Fi(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return bi(t),null;case 13:if(Y(q),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(k(340));Wn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Y(q),null;case 4:return Qn(),null;case 10:return $i(t.type._context),null;case 22:case 23:return Wi(),null;case 24:return null;default:return null}}var Ra=!1,Ne=!1,Ih=typeof WeakSet=="function"?WeakSet:Set,T=null;function On(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){re(e,t,r)}else n.current=null}function ei(e,t,n){try{n()}catch(r){re(e,t,r)}}var Au=!1;function Mh(e,t){if(Ao=Va,e=Lc(),Ei(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var o=0,i=-1,s=-1,u=0,h=0,m=e,v=null;t:for(;;){for(var _;m!==n||a!==0&&m.nodeType!==3||(i=o+a),m!==l||r!==0&&m.nodeType!==3||(s=o+r),m.nodeType===3&&(o+=m.nodeValue.length),(_=m.firstChild)!==null;)v=m,m=_;for(;;){if(m===e)break t;if(v===n&&++u===a&&(i=o),v===l&&++h===r&&(s=o),(_=m.nextSibling)!==null)break;m=v,v=m.parentNode}m=_}n=i===-1||s===-1?null:{start:i,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(Io={focusedElem:e,selectionRange:n},Va=!1,T=t;T!==null;)if(t=T,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,T=e;else for(;T!==null;){t=T;try{var N=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(N!==null){var g=N.memoizedProps,E=N.memoizedState,f=t.stateNode,c=f.getSnapshotBeforeUpdate(t.elementType===t.type?g:Je(t.type,g),E);f.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(k(163))}}catch(y){re(t,t.return,y)}if(e=t.sibling,e!==null){e.return=t.return,T=e;break}T=t.return}return N=Au,Au=!1,N}function Rr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var l=a.destroy;a.destroy=void 0,l!==void 0&&ei(t,n,l)}a=a.next}while(a!==r)}}function ml(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function ti(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Pd(e){var t=e.alternate;t!==null&&(e.alternate=null,Pd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[st],delete t[Ir],delete t[zo],delete t[Nh],delete t[Sh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function $d(e){return e.tag===5||e.tag===3||e.tag===4}function Iu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||$d(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ni(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Wa));else if(r!==4&&(e=e.child,e!==null))for(ni(e,t,n),e=e.sibling;e!==null;)ni(e,t,n),e=e.sibling}function ri(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(ri(e,t,n),e=e.sibling;e!==null;)ri(e,t,n),e=e.sibling}var he=null,Ge=!1;function Ct(e,t,n){for(n=n.child;n!==null;)Td(e,t,n),n=n.sibling}function Td(e,t,n){if(ut&&typeof ut.onCommitFiberUnmount=="function")try{ut.onCommitFiberUnmount(il,n)}catch{}switch(n.tag){case 5:Ne||On(n,t);case 6:var r=he,a=Ge;he=null,Ct(e,t,n),he=r,Ge=a,he!==null&&(Ge?(e=he,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):he.removeChild(n.stateNode));break;case 18:he!==null&&(Ge?(e=he,n=n.stateNode,e.nodeType===8?lo(e.parentNode,n):e.nodeType===1&&lo(e,n),br(e)):lo(he,n.stateNode));break;case 4:r=he,a=Ge,he=n.stateNode.containerInfo,Ge=!0,Ct(e,t,n),he=r,Ge=a;break;case 0:case 11:case 14:case 15:if(!Ne&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){a=r=r.next;do{var l=a,o=l.destroy;l=l.tag,o!==void 0&&((l&2)!==0||(l&4)!==0)&&ei(n,t,o),a=a.next}while(a!==r)}Ct(e,t,n);break;case 1:if(!Ne&&(On(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(i){re(n,t,i)}Ct(e,t,n);break;case 21:Ct(e,t,n);break;case 22:n.mode&1?(Ne=(r=Ne)||n.memoizedState!==null,Ct(e,t,n),Ne=r):Ct(e,t,n);break;default:Ct(e,t,n)}}function Mu(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Ih),t.forEach(function(r){var a=Yh.bind(null,e,r);n.has(r)||(n.add(r),r.then(a,a))})}}function Ye(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r];try{var l=e,o=t,i=o;e:for(;i!==null;){switch(i.tag){case 5:he=i.stateNode,Ge=!1;break e;case 3:he=i.stateNode.containerInfo,Ge=!0;break e;case 4:he=i.stateNode.containerInfo,Ge=!0;break e}i=i.return}if(he===null)throw Error(k(160));Td(l,o,a),he=null,Ge=!1;var s=a.alternate;s!==null&&(s.return=null),a.return=null}catch(u){re(a,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Dd(t,e),t=t.sibling}function Dd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ye(t,e),ot(e),r&4){try{Rr(3,e,e.return),ml(3,e)}catch(g){re(e,e.return,g)}try{Rr(5,e,e.return)}catch(g){re(e,e.return,g)}}break;case 1:Ye(t,e),ot(e),r&512&&n!==null&&On(n,n.return);break;case 5:if(Ye(t,e),ot(e),r&512&&n!==null&&On(n,n.return),e.flags&32){var a=e.stateNode;try{$r(a,"")}catch(g){re(e,e.return,g)}}if(r&4&&(a=e.stateNode,a!=null)){var l=e.memoizedProps,o=n!==null?n.memoizedProps:l,i=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{i==="input"&&l.type==="radio"&&l.name!=null&&qu(a,l),xo(i,o);var u=xo(i,l);for(o=0;o<s.length;o+=2){var h=s[o],m=s[o+1];h==="style"?ac(a,m):h==="dangerouslySetInnerHTML"?nc(a,m):h==="children"?$r(a,m):ci(a,h,m,u)}switch(i){case"input":So(a,l);break;case"textarea":ec(a,l);break;case"select":var v=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!l.multiple;var _=l.value;_!=null?An(a,!!l.multiple,_,!1):v!==!!l.multiple&&(l.defaultValue!=null?An(a,!!l.multiple,l.defaultValue,!0):An(a,!!l.multiple,l.multiple?[]:"",!1))}a[Ir]=l}catch(g){re(e,e.return,g)}}break;case 6:if(Ye(t,e),ot(e),r&4){if(e.stateNode===null)throw Error(k(162));a=e.stateNode,l=e.memoizedProps;try{a.nodeValue=l}catch(g){re(e,e.return,g)}}break;case 3:if(Ye(t,e),ot(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{br(t.containerInfo)}catch(g){re(e,e.return,g)}break;case 4:Ye(t,e),ot(e);break;case 13:Ye(t,e),ot(e),a=e.child,a.flags&8192&&(l=a.memoizedState!==null,a.stateNode.isHidden=l,!l||a.alternate!==null&&a.alternate.memoizedState!==null||(Bi=ae())),r&4&&Mu(e);break;case 22:if(h=n!==null&&n.memoizedState!==null,e.mode&1?(Ne=(u=Ne)||h,Ye(t,e),Ne=u):Ye(t,e),ot(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!h&&(e.mode&1)!==0)for(T=e,h=e.child;h!==null;){for(m=T=h;T!==null;){switch(v=T,_=v.child,v.tag){case 0:case 11:case 14:case 15:Rr(4,v,v.return);break;case 1:On(v,v.return);var N=v.stateNode;if(typeof N.componentWillUnmount=="function"){r=v,n=v.return;try{t=r,N.props=t.memoizedProps,N.state=t.memoizedState,N.componentWillUnmount()}catch(g){re(r,n,g)}}break;case 5:On(v,v.return);break;case 22:if(v.memoizedState!==null){zu(m);continue}}_!==null?(_.return=v,T=_):zu(m)}h=h.sibling}e:for(h=null,m=e;;){if(m.tag===5){if(h===null){h=m;try{a=m.stateNode,u?(l=a.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(i=m.stateNode,s=m.memoizedProps.style,o=s!=null&&s.hasOwnProperty("display")?s.display:null,i.style.display=rc("display",o))}catch(g){re(e,e.return,g)}}}else if(m.tag===6){if(h===null)try{m.stateNode.nodeValue=u?"":m.memoizedProps}catch(g){re(e,e.return,g)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;h===m&&(h=null),m=m.return}h===m&&(h=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Ye(t,e),ot(e),r&4&&Mu(e);break;case 21:break;default:Ye(t,e),ot(e)}}function ot(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if($d(n)){var r=n;break e}n=n.return}throw Error(k(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&($r(a,""),r.flags&=-33);var l=Iu(e);ri(e,l,a);break;case 3:case 4:var o=r.stateNode.containerInfo,i=Iu(e);ni(e,i,o);break;default:throw Error(k(161))}}catch(s){re(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function jh(e,t,n){T=e,Ld(e,t,n)}function Ld(e,t,n){for(var r=(e.mode&1)!==0;T!==null;){var a=T,l=a.child;if(a.tag===22&&r){var o=a.memoizedState!==null||Ra;if(!o){var i=a.alternate,s=i!==null&&i.memoizedState!==null||Ne;i=Ra;var u=Ne;if(Ra=o,(Ne=s)&&!u)for(T=a;T!==null;)o=T,s=o.child,o.tag===22&&o.memoizedState!==null?Vu(a):s!==null?(s.return=o,T=s):Vu(a);for(;l!==null;)T=l,Ld(l,t,n),l=l.sibling;T=a,Ra=i,Ne=u}ju(e,t,n)}else(a.subtreeFlags&8772)!==0&&l!==null?(l.return=a,T=l):ju(e,t,n)}}function ju(e){for(;T!==null;){var t=T;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Ne||ml(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Ne)if(n===null)r.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:Je(t.type,n.memoizedProps);r.componentDidUpdate(a,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&ku(t,l,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}ku(t,o,n)}break;case 5:var i=t.stateNode;if(n===null&&t.flags&4){n=i;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var h=u.memoizedState;if(h!==null){var m=h.dehydrated;m!==null&&br(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(k(163))}Ne||t.flags&512&&ti(t)}catch(v){re(t,t.return,v)}}if(t===e){T=null;break}if(n=t.sibling,n!==null){n.return=t.return,T=n;break}T=t.return}}function zu(e){for(;T!==null;){var t=T;if(t===e){T=null;break}var n=t.sibling;if(n!==null){n.return=t.return,T=n;break}T=t.return}}function Vu(e){for(;T!==null;){var t=T;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ml(4,t)}catch(s){re(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var a=t.return;try{r.componentDidMount()}catch(s){re(t,a,s)}}var l=t.return;try{ti(t)}catch(s){re(t,l,s)}break;case 5:var o=t.return;try{ti(t)}catch(s){re(t,o,s)}}}catch(s){re(t,t.return,s)}if(t===e){T=null;break}var i=t.sibling;if(i!==null){i.return=t.return,T=i;break}T=t.return}}var zh=Math.ceil,nl=St.ReactCurrentDispatcher,zi=St.ReactCurrentOwner,He=St.ReactCurrentBatchConfig,I=0,fe=null,le=null,me=0,Fe=0,Un=Ht(0),ie=0,Hr=null,fn=0,vl=0,Vi=0,Cr=null,Pe=null,Bi=0,Jn=1/0,pt=null,rl=!1,ai=null,It=null,Ca=!1,Lt=null,al=0,xr=0,li=null,Fa=-1,Oa=0;function Ce(){return(I&6)!==0?ae():Fa!==-1?Fa:Fa=ae()}function Mt(e){return(e.mode&1)===0?1:(I&2)!==0&&me!==0?me&-me:kh.transition!==null?(Oa===0&&(Oa=vc()),Oa):(e=B,e!==0||(e=window.event,e=e===void 0?16:Ec(e.type)),e)}function qe(e,t,n,r){if(50<xr)throw xr=0,li=null,Error(k(185));Wr(e,n,r),((I&2)===0||e!==fe)&&(e===fe&&((I&2)===0&&(vl|=n),ie===4&&Tt(e,me)),Le(e,r),n===1&&I===0&&(t.mode&1)===0&&(Jn=ae()+500,fl&&Wt()))}function Le(e,t){var n=e.callbackNode;Cp(e,t);var r=za(e,e===fe?me:0);if(r===0)n!==null&&Gs(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Gs(n),t===1)e.tag===0?Eh(Bu.bind(null,e)):Vc(Bu.bind(null,e)),wh(function(){(I&6)===0&&Wt()}),n=null;else{switch(yc(r)){case 1:n=mi;break;case 4:n=hc;break;case 16:n=ja;break;case 536870912:n=mc;break;default:n=ja}n=jd(n,bd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function bd(e,t){if(Fa=-1,Oa=0,(I&6)!==0)throw Error(k(327));var n=e.callbackNode;if(Vn()&&e.callbackNode!==n)return null;var r=za(e,e===fe?me:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=ll(e,r);else{t=r;var a=I;I|=2;var l=Od();(fe!==e||me!==t)&&(pt=null,Jn=ae()+500,on(e,t));do try{Hh();break}catch(i){Fd(e,i)}while(!0);Pi(),nl.current=l,I=a,le!==null?t=0:(fe=null,me=0,t=ie)}if(t!==0){if(t===2&&(a=Lo(e),a!==0&&(r=a,t=oi(e,a))),t===1)throw n=Hr,on(e,0),Tt(e,r),Le(e,ae()),n;if(t===6)Tt(e,r);else{if(a=e.current.alternate,(r&30)===0&&!Vh(a)&&(t=ll(e,r),t===2&&(l=Lo(e),l!==0&&(r=l,t=oi(e,l))),t===1))throw n=Hr,on(e,0),Tt(e,r),Le(e,ae()),n;switch(e.finishedWork=a,e.finishedLanes=r,t){case 0:case 1:throw Error(k(345));case 2:nn(e,Pe,pt);break;case 3:if(Tt(e,r),(r&130023424)===r&&(t=Bi+500-ae(),10<t)){if(za(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){Ce(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=jo(nn.bind(null,e,Pe,pt),t);break}nn(e,Pe,pt);break;case 4:if(Tt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,a=-1;0<r;){var o=31-Ze(r);l=1<<o,o=t[o],o>a&&(a=o),r&=~l}if(r=a,r=ae()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*zh(r/1960))-r,10<r){e.timeoutHandle=jo(nn.bind(null,e,Pe,pt),r);break}nn(e,Pe,pt);break;case 5:nn(e,Pe,pt);break;default:throw Error(k(329))}}}return Le(e,ae()),e.callbackNode===n?bd.bind(null,e):null}function oi(e,t){var n=Cr;return e.current.memoizedState.isDehydrated&&(on(e,t).flags|=256),e=ll(e,t),e!==2&&(t=Pe,Pe=n,t!==null&&ii(t)),e}function ii(e){Pe===null?Pe=e:Pe.push.apply(Pe,e)}function Vh(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var a=n[r],l=a.getSnapshot;a=a.value;try{if(!et(l(),a))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Tt(e,t){for(t&=~Vi,t&=~vl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ze(t),r=1<<n;e[n]=-1,t&=~r}}function Bu(e){if((I&6)!==0)throw Error(k(327));Vn();var t=za(e,0);if((t&1)===0)return Le(e,ae()),null;var n=ll(e,t);if(e.tag!==0&&n===2){var r=Lo(e);r!==0&&(t=r,n=oi(e,r))}if(n===1)throw n=Hr,on(e,0),Tt(e,t),Le(e,ae()),n;if(n===6)throw Error(k(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,nn(e,Pe,pt),Le(e,ae()),null}function Hi(e,t){var n=I;I|=1;try{return e(t)}finally{I=n,I===0&&(Jn=ae()+500,fl&&Wt())}}function pn(e){Lt!==null&&Lt.tag===0&&(I&6)===0&&Vn();var t=I;I|=1;var n=He.transition,r=B;try{if(He.transition=null,B=1,e)return e()}finally{B=r,He.transition=n,I=t,(I&6)===0&&Wt()}}function Wi(){Fe=Un.current,Y(Un)}function on(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,gh(n)),le!==null)for(n=le.return;n!==null;){var r=n;switch(Ri(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ka();break;case 3:Qn(),Y(Te),Y(Se),Fi();break;case 5:bi(r);break;case 4:Qn();break;case 13:Y(q);break;case 19:Y(q);break;case 10:$i(r.type._context);break;case 22:case 23:Wi()}n=n.return}if(fe=e,le=e=jt(e.current,null),me=Fe=t,ie=0,Hr=null,Vi=vl=fn=0,Pe=Cr=null,an!==null){for(t=0;t<an.length;t++)if(n=an[t],r=n.interleaved,r!==null){n.interleaved=null;var a=r.next,l=n.pending;if(l!==null){var o=l.next;l.next=a,r.next=o}n.pending=r}an=null}return e}function Fd(e,t){do{var n=le;try{if(Pi(),Da.current=tl,el){for(var r=ee.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}el=!1}if(dn=0,de=oe=ee=null,kr=!1,zr=0,zi.current=null,n===null||n.return===null){ie=1,Hr=t,le=null;break}e:{var l=e,o=n.return,i=n,s=t;if(t=me,i.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var u=s,h=i,m=h.tag;if((h.mode&1)===0&&(m===0||m===11||m===15)){var v=h.alternate;v?(h.updateQueue=v.updateQueue,h.memoizedState=v.memoizedState,h.lanes=v.lanes):(h.updateQueue=null,h.memoizedState=null)}var _=Tu(o);if(_!==null){_.flags&=-257,Du(_,o,i,l,t),_.mode&1&&$u(l,u,t),t=_,s=u;var N=t.updateQueue;if(N===null){var g=new Set;g.add(s),t.updateQueue=g}else N.add(s);break e}else{if((t&1)===0){$u(l,u,t),Ki();break e}s=Error(k(426))}}else if(X&&i.mode&1){var E=Tu(o);if(E!==null){(E.flags&65536)===0&&(E.flags|=256),Du(E,o,i,l,t),Ci(Yn(s,i));break e}}l=s=Yn(s,i),ie!==4&&(ie=2),Cr===null?Cr=[l]:Cr.push(l),l=o;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var f=yd(l,s,t);Eu(l,f);break e;case 1:i=s;var c=l.type,p=l.stateNode;if((l.flags&128)===0&&(typeof c.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(It===null||!It.has(p)))){l.flags|=65536,t&=-t,l.lanes|=t;var y=gd(l,i,t);Eu(l,y);break e}}l=l.return}while(l!==null)}Ad(n)}catch(C){t=C,le===n&&n!==null&&(le=n=n.return);continue}break}while(!0)}function Od(){var e=nl.current;return nl.current=tl,e===null?tl:e}function Ki(){(ie===0||ie===3||ie===2)&&(ie=4),fe===null||(fn&268435455)===0&&(vl&268435455)===0||Tt(fe,me)}function ll(e,t){var n=I;I|=2;var r=Od();(fe!==e||me!==t)&&(pt=null,on(e,t));do try{Bh();break}catch(a){Fd(e,a)}while(!0);if(Pi(),I=n,nl.current=r,le!==null)throw Error(k(261));return fe=null,me=0,ie}function Bh(){for(;le!==null;)Ud(le)}function Hh(){for(;le!==null&&!yp();)Ud(le)}function Ud(e){var t=Md(e.alternate,e,Fe);e.memoizedProps=e.pendingProps,t===null?Ad(e):le=t,zi.current=null}function Ad(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Uh(n,t,Fe),n!==null){le=n;return}}else{if(n=Ah(n,t),n!==null){n.flags&=32767,le=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ie=6,le=null;return}}if(t=t.sibling,t!==null){le=t;return}le=t=e}while(t!==null);ie===0&&(ie=5)}function nn(e,t,n){var r=B,a=He.transition;try{He.transition=null,B=1,Wh(e,t,n,r)}finally{He.transition=a,B=r}return null}function Wh(e,t,n,r){do Vn();while(Lt!==null);if((I&6)!==0)throw Error(k(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(k(177));e.callbackNode=null,e.callbackPriority=0;var l=n.lanes|n.childLanes;if(xp(e,l),e===fe&&(le=fe=null,me=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Ca||(Ca=!0,jd(ja,function(){return Vn(),null})),l=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||l){l=He.transition,He.transition=null;var o=B;B=1;var i=I;I|=4,zi.current=null,Mh(e,n),Dd(n,e),ph(Io),Va=!!Ao,Io=Ao=null,e.current=n,jh(n,e,a),gp(),I=i,B=o,He.transition=l}else e.current=n;if(Ca&&(Ca=!1,Lt=e,al=a),l=e.pendingLanes,l===0&&(It=null),Np(n.stateNode,r),Le(e,ae()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],r(a.value,{componentStack:a.stack,digest:a.digest});if(rl)throw rl=!1,e=ai,ai=null,e;return(al&1)!==0&&e.tag!==0&&Vn(),l=e.pendingLanes,(l&1)!==0?e===li?xr++:(xr=0,li=e):xr=0,Wt(),null}function Vn(){if(Lt!==null){var e=yc(al),t=He.transition,n=B;try{if(He.transition=null,B=16>e?16:e,Lt===null)var r=!1;else{if(e=Lt,Lt=null,al=0,(I&6)!==0)throw Error(k(331));var a=I;for(I|=4,T=e.current;T!==null;){var l=T,o=l.child;if((T.flags&16)!==0){var i=l.deletions;if(i!==null){for(var s=0;s<i.length;s++){var u=i[s];for(T=u;T!==null;){var h=T;switch(h.tag){case 0:case 11:case 15:Rr(8,h,l)}var m=h.child;if(m!==null)m.return=h,T=m;else for(;T!==null;){h=T;var v=h.sibling,_=h.return;if(Pd(h),h===u){T=null;break}if(v!==null){v.return=_,T=v;break}T=_}}}var N=l.alternate;if(N!==null){var g=N.child;if(g!==null){N.child=null;do{var E=g.sibling;g.sibling=null,g=E}while(g!==null)}}T=l}}if((l.subtreeFlags&2064)!==0&&o!==null)o.return=l,T=o;else e:for(;T!==null;){if(l=T,(l.flags&2048)!==0)switch(l.tag){case 0:case 11:case 15:Rr(9,l,l.return)}var f=l.sibling;if(f!==null){f.return=l.return,T=f;break e}T=l.return}}var c=e.current;for(T=c;T!==null;){o=T;var p=o.child;if((o.subtreeFlags&2064)!==0&&p!==null)p.return=o,T=p;else e:for(o=c;T!==null;){if(i=T,(i.flags&2048)!==0)try{switch(i.tag){case 0:case 11:case 15:ml(9,i)}}catch(C){re(i,i.return,C)}if(i===o){T=null;break e}var y=i.sibling;if(y!==null){y.return=i.return,T=y;break e}T=i.return}}if(I=a,Wt(),ut&&typeof ut.onPostCommitFiberRoot=="function")try{ut.onPostCommitFiberRoot(il,e)}catch{}r=!0}return r}finally{B=n,He.transition=t}}return!1}function Hu(e,t,n){t=Yn(n,t),t=yd(e,t,1),e=At(e,t,1),t=Ce(),e!==null&&(Wr(e,1,t),Le(e,t))}function re(e,t,n){if(e.tag===3)Hu(e,e,n);else for(;t!==null;){if(t.tag===3){Hu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(It===null||!It.has(r))){e=Yn(n,e),e=gd(t,e,1),t=At(t,e,1),e=Ce(),t!==null&&(Wr(t,1,e),Le(t,e));break}}t=t.return}}function Kh(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ce(),e.pingedLanes|=e.suspendedLanes&n,fe===e&&(me&n)===n&&(ie===4||ie===3&&(me&130023424)===me&&500>ae()-Bi?on(e,0):Vi|=n),Le(e,t)}function Id(e,t){t===0&&((e.mode&1)===0?t=1:(t=fa,fa<<=1,(fa&130023424)===0&&(fa=4194304)));var n=Ce();e=_t(e,t),e!==null&&(Wr(e,t,n),Le(e,n))}function Qh(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Id(e,n)}function Yh(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(k(314))}r!==null&&r.delete(t),Id(e,n)}var Md;Md=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Te.current)$e=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return $e=!1,Oh(e,t,n);$e=(e.flags&131072)!==0}else $e=!1,X&&(t.flags&1048576)!==0&&Bc(t,Ja,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;ba(e,t),e=t.pendingProps;var a=Hn(t,Se.current);zn(t,n),a=Ui(null,t,r,e,a,n);var l=Ai();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,De(r)?(l=!0,Qa(t)):l=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Di(t),a.updater=hl,t.stateNode=a,a._reactInternals=t,Qo(t,r,e,n),t=Go(null,t,r,!0,l,n)):(t.tag=0,X&&l&&ki(t),Re(null,t,a,n),t=t.child),t;case 16:r=t.elementType;e:{switch(ba(e,t),e=t.pendingProps,a=r._init,r=a(r._payload),t.type=r,a=t.tag=Gh(r),e=Je(r,e),a){case 0:t=Jo(null,t,r,e,n);break e;case 1:t=Fu(null,t,r,e,n);break e;case 11:t=Lu(null,t,r,e,n);break e;case 14:t=bu(null,t,r,Je(r.type,e),n);break e}throw Error(k(306,r,""))}return t;case 0:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Je(r,a),Jo(e,t,r,a,n);case 1:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Je(r,a),Fu(e,t,r,a,n);case 3:e:{if(Sd(t),e===null)throw Error(k(387));r=t.pendingProps,l=t.memoizedState,a=l.element,Jc(e,t),Za(t,r,null,n);var o=t.memoizedState;if(r=o.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){a=Yn(Error(k(423)),t),t=Ou(e,t,r,n,a);break e}else if(r!==a){a=Yn(Error(k(424)),t),t=Ou(e,t,r,n,a);break e}else for(Oe=Ut(t.stateNode.containerInfo.firstChild),Ue=t,X=!0,Xe=null,n=Qc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Wn(),r===a){t=Nt(e,t,n);break e}Re(e,t,r,n)}t=t.child}return t;case 5:return Gc(t),e===null&&Ho(t),r=t.type,a=t.pendingProps,l=e!==null?e.memoizedProps:null,o=a.children,Mo(r,a)?o=null:l!==null&&Mo(r,l)&&(t.flags|=32),Nd(e,t),Re(e,t,o,n),t.child;case 6:return e===null&&Ho(t),null;case 13:return Ed(e,t,n);case 4:return Li(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Kn(t,null,r,n):Re(e,t,r,n),t.child;case 11:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Je(r,a),Lu(e,t,r,a,n);case 7:return Re(e,t,t.pendingProps,n),t.child;case 8:return Re(e,t,t.pendingProps.children,n),t.child;case 12:return Re(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,a=t.pendingProps,l=t.memoizedProps,o=a.value,W(Ga,r._currentValue),r._currentValue=o,l!==null)if(et(l.value,o)){if(l.children===a.children&&!Te.current){t=Nt(e,t,n);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var i=l.dependencies;if(i!==null){o=l.child;for(var s=i.firstContext;s!==null;){if(s.context===r){if(l.tag===1){s=yt(-1,n&-n),s.tag=2;var u=l.updateQueue;if(u!==null){u=u.shared;var h=u.pending;h===null?s.next=s:(s.next=h.next,h.next=s),u.pending=s}}l.lanes|=n,s=l.alternate,s!==null&&(s.lanes|=n),Wo(l.return,n,t),i.lanes|=n;break}s=s.next}}else if(l.tag===10)o=l.type===t.type?null:l.child;else if(l.tag===18){if(o=l.return,o===null)throw Error(k(341));o.lanes|=n,i=o.alternate,i!==null&&(i.lanes|=n),Wo(o,n,t),o=l.sibling}else o=l.child;if(o!==null)o.return=l;else for(o=l;o!==null;){if(o===t){o=null;break}if(l=o.sibling,l!==null){l.return=o.return,o=l;break}o=o.return}l=o}Re(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,r=t.pendingProps.children,zn(t,n),a=We(a),r=r(a),t.flags|=1,Re(e,t,r,n),t.child;case 14:return r=t.type,a=Je(r,t.pendingProps),a=Je(r.type,a),bu(e,t,r,a,n);case 15:return wd(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:Je(r,a),ba(e,t),t.tag=1,De(r)?(e=!0,Qa(t)):e=!1,zn(t,n),vd(t,r,a),Qo(t,r,a,n),Go(null,t,r,!0,e,n);case 19:return kd(e,t,n);case 22:return _d(e,t,n)}throw Error(k(156,t.tag))};function jd(e,t){return pc(e,t)}function Jh(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Be(e,t,n,r){return new Jh(e,t,n,r)}function Qi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Gh(e){if(typeof e=="function")return Qi(e)?1:0;if(e!=null){if(e=e.$$typeof,e===fi)return 11;if(e===pi)return 14}return 2}function jt(e,t){var n=e.alternate;return n===null?(n=Be(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ua(e,t,n,r,a,l){var o=2;if(r=e,typeof e=="function")Qi(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Cn:return sn(n.children,a,l,t);case di:o=8,a|=8;break;case yo:return e=Be(12,n,t,a|2),e.elementType=yo,e.lanes=l,e;case go:return e=Be(13,n,t,a),e.elementType=go,e.lanes=l,e;case wo:return e=Be(19,n,t,a),e.elementType=wo,e.lanes=l,e;case Gu:return yl(n,a,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Yu:o=10;break e;case Ju:o=9;break e;case fi:o=11;break e;case pi:o=14;break e;case xt:o=16,r=null;break e}throw Error(k(130,e==null?e:typeof e,""))}return t=Be(o,n,t,a),t.elementType=e,t.type=r,t.lanes=l,t}function sn(e,t,n,r){return e=Be(7,e,r,t),e.lanes=n,e}function yl(e,t,n,r){return e=Be(22,e,r,t),e.elementType=Gu,e.lanes=n,e.stateNode={isHidden:!1},e}function ho(e,t,n){return e=Be(6,e,null,t),e.lanes=n,e}function mo(e,t,n){return t=Be(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Xh(e,t,n,r,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Xl(0),this.expirationTimes=Xl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Xl(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Yi(e,t,n,r,a,l,o,i,s){return e=new Xh(e,t,n,i,s),t===1?(t=1,l===!0&&(t|=8)):t=0,l=Be(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Di(l),e}function Zh(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Rn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function zd(e){if(!e)return Vt;e=e._reactInternals;e:{if(mn(e)!==e||e.tag!==1)throw Error(k(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(De(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(k(171))}if(e.tag===1){var n=e.type;if(De(n))return zc(e,n,t)}return t}function Vd(e,t,n,r,a,l,o,i,s){return e=Yi(n,r,!0,e,a,l,o,i,s),e.context=zd(null),n=e.current,r=Ce(),a=Mt(n),l=yt(r,a),l.callback=t??null,At(n,l,a),e.current.lanes=a,Wr(e,a,r),Le(e,r),e}function gl(e,t,n,r){var a=t.current,l=Ce(),o=Mt(a);return n=zd(n),t.context===null?t.context=n:t.pendingContext=n,t=yt(l,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=At(a,t,o),e!==null&&(qe(e,a,o,l),Ta(e,a,o)),o}function ol(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Wu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ji(e,t){Wu(e,t),(e=e.alternate)&&Wu(e,t)}function qh(){return null}var Bd=typeof reportError=="function"?reportError:function(e){console.error(e)};function Gi(e){this._internalRoot=e}wl.prototype.render=Gi.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(k(409));gl(e,t,null,null)};wl.prototype.unmount=Gi.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;pn(function(){gl(null,e,null,null)}),t[wt]=null}};function wl(e){this._internalRoot=e}wl.prototype.unstable_scheduleHydration=function(e){if(e){var t=_c();e={blockedOn:null,target:e,priority:t};for(var n=0;n<$t.length&&t!==0&&t<$t[n].priority;n++);$t.splice(n,0,e),n===0&&Sc(e)}};function Xi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function _l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Ku(){}function em(e,t,n,r,a){if(a){if(typeof r=="function"){var l=r;r=function(){var u=ol(o);l.call(u)}}var o=Vd(t,r,e,0,null,!1,!1,"",Ku);return e._reactRootContainer=o,e[wt]=o.current,Ur(e.nodeType===8?e.parentNode:e),pn(),o}for(;a=e.lastChild;)e.removeChild(a);if(typeof r=="function"){var i=r;r=function(){var u=ol(s);i.call(u)}}var s=Yi(e,0,!1,null,null,!1,!1,"",Ku);return e._reactRootContainer=s,e[wt]=s.current,Ur(e.nodeType===8?e.parentNode:e),pn(function(){gl(t,s,n,r)}),s}function Nl(e,t,n,r,a){var l=n._reactRootContainer;if(l){var o=l;if(typeof a=="function"){var i=a;a=function(){var s=ol(o);i.call(s)}}gl(t,o,e,a)}else o=em(n,t,e,a,r);return ol(o)}gc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=yr(t.pendingLanes);n!==0&&(vi(t,n|1),Le(t,ae()),(I&6)===0&&(Jn=ae()+500,Wt()))}break;case 13:pn(function(){var r=_t(e,1);if(r!==null){var a=Ce();qe(r,e,1,a)}}),Ji(e,1)}};yi=function(e){if(e.tag===13){var t=_t(e,134217728);if(t!==null){var n=Ce();qe(t,e,134217728,n)}Ji(e,134217728)}};wc=function(e){if(e.tag===13){var t=Mt(e),n=_t(e,t);if(n!==null){var r=Ce();qe(n,e,t,r)}Ji(e,t)}};_c=function(){return B};Nc=function(e,t){var n=B;try{return B=e,t()}finally{B=n}};$o=function(e,t,n){switch(t){case"input":if(So(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=dl(r);if(!a)throw Error(k(90));Zu(r),So(r,a)}}}break;case"textarea":ec(e,n);break;case"select":t=n.value,t!=null&&An(e,!!n.multiple,t,!1)}};ic=Hi;sc=pn;var tm={usingClientEntryPoint:!1,Events:[Qr,Tn,dl,lc,oc,Hi]},pr={findFiberByHostInstance:rn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},nm={bundleType:pr.bundleType,version:pr.version,rendererPackageName:pr.rendererPackageName,rendererConfig:pr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:St.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=dc(e),e===null?null:e.stateNode},findFiberByHostInstance:pr.findFiberByHostInstance||qh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(hr=__REACT_DEVTOOLS_GLOBAL_HOOK__,!hr.isDisabled&&hr.supportsFiber))try{il=hr.inject(nm),ut=hr}catch{}var hr;Me.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=tm;Me.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Xi(t))throw Error(k(200));return Zh(e,t,null,n)};Me.createRoot=function(e,t){if(!Xi(e))throw Error(k(299));var n=!1,r="",a=Bd;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=Yi(e,1,!1,null,null,n,!1,r,a),e[wt]=t.current,Ur(e.nodeType===8?e.parentNode:e),new Gi(t)};Me.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(k(188)):(e=Object.keys(e).join(","),Error(k(268,e)));return e=dc(t),e=e===null?null:e.stateNode,e};Me.flushSync=function(e){return pn(e)};Me.hydrate=function(e,t,n){if(!_l(t))throw Error(k(200));return Nl(null,e,t,!0,n)};Me.hydrateRoot=function(e,t,n){if(!Xi(e))throw Error(k(405));var r=n!=null&&n.hydratedSources||null,a=!1,l="",o=Bd;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=Vd(t,null,e,1,n??null,a,!1,l,o),e[wt]=t.current,Ur(e),r)for(e=0;e<r.length;e++)n=r[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new wl(t)};Me.render=function(e,t,n){if(!_l(t))throw Error(k(200));return Nl(null,e,t,!1,n)};Me.unmountComponentAtNode=function(e){if(!_l(e))throw Error(k(40));return e._reactRootContainer?(pn(function(){Nl(null,null,e,!1,function(){e._reactRootContainer=null,e[wt]=null})}),!0):!1};Me.unstable_batchedUpdates=Hi;Me.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!_l(n))throw Error(k(200));if(e==null||e._reactInternals===void 0)throw Error(k(38));return Nl(e,t,n,!1,r)};Me.version="18.3.1-next-f1338f8080-20240426"});var Zi=qt((Tv,Kd)=>{"use strict";function Wd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Wd)}catch(e){console.error(e)}}Wd(),Kd.exports=Hd()});var Yd=qt(qi=>{"use strict";var Qd=Zi();qi.createRoot=Qd.createRoot,qi.hydrateRoot=Qd.hydrateRoot;var Dv});var D=tr(rr()),$f=tr(Yd());var z=tr(rr()),Km=tr(Zi());var P=tr(rr());function Jr(){return Jr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Jr.apply(this,arguments)}var tt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(tt||(tt={}));var Jd="popstate";function ef(e){e===void 0&&(e={});function t(r,a){let{pathname:l,search:o,hash:i}=r.location;return ts("",{pathname:l,search:o,hash:i},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(r,a){return typeof a=="string"?a:vn(a)}return am(t,n,null,e)}function J(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ns(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function rm(){return Math.random().toString(36).substr(2,8)}function Gd(e,t){return{usr:e.state,key:e.key,idx:t}}function ts(e,t,n,r){return n===void 0&&(n=null),Jr({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Et(t):t,{state:n,key:t&&t.key||r||rm()})}function vn(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Et(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function am(e,t,n,r){r===void 0&&(r={});let{window:a=document.defaultView,v5Compat:l=!1}=r,o=a.history,i=tt.Pop,s=null,u=h();u==null&&(u=0,o.replaceState(Jr({},o.state,{idx:u}),""));function h(){return(o.state||{idx:null}).idx}function m(){i=tt.Pop;let E=h(),f=E==null?null:E-u;u=E,s&&s({action:i,location:g.location,delta:f})}function v(E,f){i=tt.Push;let c=ts(g.location,E,f);n&&n(c,E),u=h()+1;let p=Gd(c,u),y=g.createHref(c);try{o.pushState(p,"",y)}catch(C){if(C instanceof DOMException&&C.name==="DataCloneError")throw C;a.location.assign(y)}l&&s&&s({action:i,location:g.location,delta:1})}function _(E,f){i=tt.Replace;let c=ts(g.location,E,f);n&&n(c,E),u=h();let p=Gd(c,u),y=g.createHref(c);o.replaceState(p,"",y),l&&s&&s({action:i,location:g.location,delta:0})}function N(E){let f=a.location.origin!=="null"?a.location.origin:a.location.href,c=typeof E=="string"?E:vn(E);return c=c.replace(/ $/,"%20"),J(f,"No window.location.(origin|href) available to create URL for href: "+c),new URL(c,f)}let g={get action(){return i},get location(){return e(a,o)},listen(E){if(s)throw new Error("A history only accepts one active listener");return a.addEventListener(Jd,m),s=E,()=>{a.removeEventListener(Jd,m),s=null}},createHref(E){return t(a,E)},createURL:N,encodeLocation(E){let f=N(E);return{pathname:f.pathname,search:f.search,hash:f.hash}},push:v,replace:_,go(E){return o.go(E)}};return g}var Xd;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Xd||(Xd={}));function Sl(e,t,n){return n===void 0&&(n="/"),lm(e,t,n,!1)}function lm(e,t,n,r){let a=typeof t=="string"?Et(t):t,l=Qt(a.pathname||"/",n);if(l==null)return null;let o=tf(e);om(o);let i=null;for(let s=0;i==null&&s<o.length;++s){let u=rf(l);i=mm(o[s],u,r)}return i}function tf(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let a=(l,o,i)=>{let s={relativePath:i===void 0?l.path||"":i,caseSensitive:l.caseSensitive===!0,childrenIndex:o,route:l};s.relativePath.startsWith("/")&&(J(s.relativePath.startsWith(r),'Absolute route path "'+s.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),s.relativePath=s.relativePath.slice(r.length));let u=dt([r,s.relativePath]),h=n.concat(s);l.children&&l.children.length>0&&(J(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),tf(l.children,t,h,u)),!(l.path==null&&!l.index)&&t.push({path:u,score:pm(u,l.index),routesMeta:h})};return e.forEach((l,o)=>{var i;if(l.path===""||!((i=l.path)!=null&&i.includes("?")))a(l,o);else for(let s of nf(l.path))a(l,o,s)}),t}function nf(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,a=n.endsWith("?"),l=n.replace(/\?$/,"");if(r.length===0)return a?[l,""]:[l];let o=nf(r.join("/")),i=[];return i.push(...o.map(s=>s===""?l:[l,s].join("/"))),a&&i.push(...o),i.map(s=>e.startsWith("/")&&s===""?"/":s)}function om(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:hm(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var im=/^:[\w-]+$/,sm=3,um=2,cm=1,dm=10,fm=-2,Zd=e=>e==="*";function pm(e,t){let n=e.split("/"),r=n.length;return n.some(Zd)&&(r+=fm),t&&(r+=um),n.filter(a=>!Zd(a)).reduce((a,l)=>a+(im.test(l)?sm:l===""?cm:dm),r)}function hm(e,t){return e.length===t.length&&e.slice(0,-1).every((r,a)=>r===t[a])?e[e.length-1]-t[t.length-1]:0}function mm(e,t,n){n===void 0&&(n=!1);let{routesMeta:r}=e,a={},l="/",o=[];for(let i=0;i<r.length;++i){let s=r[i],u=i===r.length-1,h=l==="/"?t:t.slice(l.length)||"/",m=Kt({path:s.relativePath,caseSensitive:s.caseSensitive,end:u},h),v=s.route;if(!m&&u&&n&&!r[r.length-1].route.index&&(m=Kt({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},h)),!m)return null;Object.assign(a,m.params),o.push({params:a,pathname:dt([l,m.pathname]),pathnameBase:_m(dt([l,m.pathnameBase])),route:v}),m.pathnameBase!=="/"&&(l=dt([l,m.pathnameBase]))}return o}function Kt(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=vm(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let l=a[0],o=l.replace(/(.)\/+$/,"$1"),i=a.slice(1);return{params:r.reduce((u,h,m)=>{let{paramName:v,isOptional:_}=h;if(v==="*"){let g=i[m]||"";o=l.slice(0,l.length-g.length).replace(/(.)\/+$/,"$1")}let N=i[m];return _&&!N?u[v]=void 0:u[v]=(N||"").replace(/%2F/g,"/"),u},{}),pathname:l,pathnameBase:o,pattern:e}}function vm(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),ns(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,i,s)=>(r.push({paramName:i,isOptional:s!=null}),s?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function rf(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ns(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Qt(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}var ym=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,gm=e=>ym.test(e);function rs(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:a=""}=typeof e=="string"?Et(e):e,l;if(n)if(gm(n))l=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),ns(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?l=qd(n.substring(1),"/"):l=qd(n,t)}else l=t;return{pathname:l,search:Nm(r),hash:Sm(a)}}function qd(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function es(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function wm(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function El(e,t){let n=wm(e);return t?n.map((r,a)=>a===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function kl(e,t,n,r){r===void 0&&(r=!1);let a;typeof e=="string"?a=Et(e):(a=Jr({},e),J(!a.pathname||!a.pathname.includes("?"),es("?","pathname","search",a)),J(!a.pathname||!a.pathname.includes("#"),es("#","pathname","hash",a)),J(!a.search||!a.search.includes("#"),es("#","search","hash",a)));let l=e===""||a.pathname==="",o=l?"/":a.pathname,i;if(o==null)i=n;else{let m=t.length-1;if(!r&&o.startsWith("..")){let v=o.split("/");for(;v[0]==="..";)v.shift(),m-=1;a.pathname=v.join("/")}i=m>=0?t[m]:"/"}let s=rs(a,i),u=o&&o!=="/"&&o.endsWith("/"),h=(l||o===".")&&n.endsWith("/");return!s.pathname.endsWith("/")&&(u||h)&&(s.pathname+="/"),s}var dt=e=>e.join("/").replace(/\/\/+/g,"/"),_m=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Nm=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Sm=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Rl(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var af=["post","put","patch","delete"],bv=new Set(af),Em=["get",...af],Fv=new Set(Em);var Ov=Symbol("deferred");function Gr(){return Gr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Gr.apply(this,arguments)}var qn=P.createContext(null),xl=P.createContext(null);var nt=P.createContext(null),Zr=P.createContext(null),rt=P.createContext({outlet:null,matches:[],isDataRoute:!1}),sf=P.createContext(null);function ls(e,t){let{relative:n}=t===void 0?{}:t;yn()||J(!1);let{basename:r,navigator:a}=P.useContext(nt),{hash:l,pathname:o,search:i}=er(e,{relative:n}),s=o;return r!=="/"&&(s=o==="/"?r:dt([r,o])),a.createHref({pathname:s,search:i,hash:l})}function yn(){return P.useContext(Zr)!=null}function Yt(){return yn()||J(!1),P.useContext(Zr).location}function uf(e){P.useContext(nt).static||P.useLayoutEffect(e)}function Jt(){let{isDataRoute:e}=P.useContext(rt);return e?Mm():Dm()}function Dm(){yn()||J(!1);let e=P.useContext(qn),{basename:t,future:n,navigator:r}=P.useContext(nt),{matches:a}=P.useContext(rt),{pathname:l}=Yt(),o=JSON.stringify(El(a,n.v7_relativeSplatPath)),i=P.useRef(!1);return uf(()=>{i.current=!0}),P.useCallback(function(u,h){if(h===void 0&&(h={}),!i.current)return;if(typeof u=="number"){r.go(u);return}let m=kl(u,JSON.parse(o),l,h.relative==="path");e==null&&t!=="/"&&(m.pathname=m.pathname==="/"?t:dt([t,m.pathname])),(h.replace?r.replace:r.push)(m,h.state,h)},[t,r,o,l,e])}function os(){let{matches:e}=P.useContext(rt),t=e[e.length-1];return t?t.params:{}}function er(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=P.useContext(nt),{matches:a}=P.useContext(rt),{pathname:l}=Yt(),o=JSON.stringify(El(a,r.v7_relativeSplatPath));return P.useMemo(()=>kl(e,JSON.parse(o),l,n==="path"),[e,o,l,n])}function cf(e,t){return df(e,t)}function df(e,t,n,r){yn()||J(!1);let{navigator:a}=P.useContext(nt),{matches:l}=P.useContext(rt),o=l[l.length-1],i=o?o.params:{},s=o?o.pathname:"/",u=o?o.pathnameBase:"/",h=o&&o.route,m=Yt(),v;if(t){var _;let c=typeof t=="string"?Et(t):t;u==="/"||(_=c.pathname)!=null&&_.startsWith(u)||J(!1),v=c}else v=m;let N=v.pathname||"/",g=N;if(u!=="/"){let c=u.replace(/^\//,"").split("/");g="/"+N.replace(/^\//,"").split("/").slice(c.length).join("/")}let E=Sl(e,{pathname:g}),f=Om(E&&E.map(c=>Object.assign({},c,{params:Object.assign({},i,c.params),pathname:dt([u,a.encodeLocation?a.encodeLocation(c.pathname).pathname:c.pathname]),pathnameBase:c.pathnameBase==="/"?u:dt([u,a.encodeLocation?a.encodeLocation(c.pathnameBase).pathname:c.pathnameBase])})),l,n,r);return t&&f?P.createElement(Zr.Provider,{value:{location:Gr({pathname:"/",search:"",hash:"",state:null,key:"default"},v),navigationType:tt.Pop}},f):f}function Lm(){let e=hf(),t=Rl(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",a={padding:"0.5rem",backgroundColor:r},l={padding:"2px 4px",backgroundColor:r};return P.createElement(P.Fragment,null,P.createElement("h2",null,"Unexpected Application Error!"),P.createElement("h3",{style:{fontStyle:"italic"}},t),n?P.createElement("pre",{style:a},n):null,null)}var bm=P.createElement(Lm,null),as=class extends P.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?P.createElement(rt.Provider,{value:this.props.routeContext},P.createElement(sf.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function Fm(e){let{routeContext:t,match:n,children:r}=e,a=P.useContext(qn);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),P.createElement(rt.Provider,{value:t},r)}function Om(e,t,n,r){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var l;if(!n)return null;if(n.errors)e=n.matches;else if((l=r)!=null&&l.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,i=(a=n)==null?void 0:a.errors;if(i!=null){let h=o.findIndex(m=>m.route.id&&i?.[m.route.id]!==void 0);h>=0||J(!1),o=o.slice(0,Math.min(o.length,h+1))}let s=!1,u=-1;if(n&&r&&r.v7_partialHydration)for(let h=0;h<o.length;h++){let m=o[h];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(u=h),m.route.id){let{loaderData:v,errors:_}=n,N=m.route.loader&&v[m.route.id]===void 0&&(!_||_[m.route.id]===void 0);if(m.route.lazy||N){s=!0,u>=0?o=o.slice(0,u+1):o=[o[0]];break}}}return o.reduceRight((h,m,v)=>{let _,N=!1,g=null,E=null;n&&(_=i&&m.route.id?i[m.route.id]:void 0,g=m.route.errorElement||bm,s&&(u<0&&v===0?(jm("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),N=!0,E=null):u===v&&(N=!0,E=m.route.hydrateFallbackElement||null)));let f=t.concat(o.slice(0,v+1)),c=()=>{let p;return _?p=g:N?p=E:m.route.Component?p=P.createElement(m.route.Component,null):m.route.element?p=m.route.element:p=h,P.createElement(Fm,{match:m,routeContext:{outlet:h,matches:f,isDataRoute:n!=null},children:p})};return n&&(m.route.ErrorBoundary||m.route.errorElement||v===0)?P.createElement(as,{location:n.location,revalidation:n.revalidation,component:g,error:_,children:c(),routeContext:{outlet:null,matches:f,isDataRoute:!0}}):c()},null)}var ff=(function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e})(ff||{}),Cl=(function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e})(Cl||{});function Um(e){let t=P.useContext(qn);return t||J(!1),t}function Am(e){let t=P.useContext(xl);return t||J(!1),t}function Im(e){let t=P.useContext(rt);return t||J(!1),t}function pf(e){let t=Im(e),n=t.matches[t.matches.length-1];return n.route.id||J(!1),n.route.id}function hf(){var e;let t=P.useContext(sf),n=Am(Cl.UseRouteError),r=pf(Cl.UseRouteError);return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function Mm(){let{router:e}=Um(ff.UseNavigateStable),t=pf(Cl.UseNavigateStable),n=P.useRef(!1);return uf(()=>{n.current=!0}),P.useCallback(function(a,l){l===void 0&&(l={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,Gr({fromRouteId:t},l)))},[e,t])}var lf={};function jm(e,t,n){!t&&!lf[e]&&(lf[e]=!0)}var Zn=(e,t,n)=>(""+t+("You can use the `"+e+"` future flag to opt-in early. ")+("For more information, see "+n+"."),void 0);function mf(e,t){e?.v7_startTransition===void 0&&Zn("v7_startTransition","React Router will begin wrapping state updates in `React.startTransition` in v7","https://reactrouter.com/v6/upgrading/future#v7_starttransition"),e?.v7_relativeSplatPath===void 0&&(!t||t.v7_relativeSplatPath===void 0)&&Zn("v7_relativeSplatPath","Relative route resolution within Splat routes is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath"),t&&(t.v7_fetcherPersist===void 0&&Zn("v7_fetcherPersist","The persistence behavior of fetchers is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist"),t.v7_normalizeFormMethod===void 0&&Zn("v7_normalizeFormMethod","Casing of `formMethod` fields is being normalized to uppercase in v7","https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod"),t.v7_partialHydration===void 0&&Zn("v7_partialHydration","`RouterProvider` hydration behavior is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_partialhydration"),t.v7_skipActionErrorRevalidation===void 0&&Zn("v7_skipActionErrorRevalidation","The revalidation behavior after 4xx/5xx `action` responses is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation"))}var zm="startTransition",Vv=P[zm];function is(e){let{to:t,replace:n,state:r,relative:a}=e;yn()||J(!1);let{future:l,static:o}=P.useContext(nt),{matches:i}=P.useContext(rt),{pathname:s}=Yt(),u=Jt(),h=kl(t,El(i,l.v7_relativeSplatPath),s,a==="path"),m=JSON.stringify(h);return P.useEffect(()=>u(JSON.parse(m),{replace:n,state:r,relative:a}),[u,m,a,n,r]),null}function Gt(e){J(!1)}function ss(e){let{basename:t="/",children:n=null,location:r,navigationType:a=tt.Pop,navigator:l,static:o=!1,future:i}=e;yn()&&J(!1);let s=t.replace(/^\/*/,"/"),u=P.useMemo(()=>({basename:s,navigator:l,static:o,future:Gr({v7_relativeSplatPath:!1},i)}),[s,i,l,o]);typeof r=="string"&&(r=Et(r));let{pathname:h="/",search:m="",hash:v="",state:_=null,key:N="default"}=r,g=P.useMemo(()=>{let E=Qt(h,s);return E==null?null:{location:{pathname:E,search:m,hash:v,state:_,key:N},navigationType:a}},[s,h,m,v,_,N,a]);return g==null?null:P.createElement(nt.Provider,{value:u},P.createElement(Zr.Provider,{children:n,value:g}))}function us(e){let{children:t,location:n}=e;return cf(Xr(t),n)}var Bv=new Promise(()=>{});function Xr(e,t){t===void 0&&(t=[]);let n=[];return P.Children.forEach(e,(r,a)=>{if(!P.isValidElement(r))return;let l=[...t,a];if(r.type===P.Fragment){n.push.apply(n,Xr(r.props.children,l));return}r.type!==Gt&&J(!1),!r.props.index||!r.props.children||J(!1);let o={id:r.props.id||l.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=Xr(r.props.children,l)),n.push(o)}),n}function Pl(){return Pl=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Pl.apply(this,arguments)}function gf(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,l;for(l=0;l<r.length;l++)a=r[l],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function Qm(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Ym(e,t){return e.button===0&&(!t||t==="_self")&&!Qm(e)}var Jm=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Gm=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"];var Xm="6";try{window.__reactRouterVersion=Xm}catch{}var Zm=z.createContext({isTransitioning:!1});var qm="startTransition",vf=z[qm],ev="flushSync",hy=Km[ev],tv="useId",my=z[tv];function wf(e){let{basename:t,children:n,future:r,window:a}=e,l=z.useRef();l.current==null&&(l.current=ef({window:a,v5Compat:!0}));let o=l.current,[i,s]=z.useState({action:o.action,location:o.location}),{v7_startTransition:u}=r||{},h=z.useCallback(m=>{u&&vf?vf(()=>s(m)):s(m)},[s,u]);return z.useLayoutEffect(()=>o.listen(h),[o,h]),z.useEffect(()=>mf(r),[r]),z.createElement(ss,{basename:t,children:n,location:i.location,navigationType:i.action,navigator:o,future:r})}var nv=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",rv=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Xt=z.forwardRef(function(t,n){let{onClick:r,relative:a,reloadDocument:l,replace:o,state:i,target:s,to:u,preventScrollReset:h,viewTransition:m}=t,v=gf(t,Jm),{basename:_}=z.useContext(nt),N,g=!1;if(typeof u=="string"&&rv.test(u)&&(N=u,nv))try{let p=new URL(window.location.href),y=u.startsWith("//")?new URL(p.protocol+u):new URL(u),C=Qt(y.pathname,_);y.origin===p.origin&&C!=null?u=C+y.search+y.hash:g=!0}catch{}let E=ls(u,{relative:a}),f=lv(u,{replace:o,state:i,target:s,preventScrollReset:h,relative:a,viewTransition:m});function c(p){r&&r(p),p.defaultPrevented||f(p)}return z.createElement("a",Pl({},v,{href:N||E,onClick:g||l?r:c,ref:n,target:s}))}),$l=z.forwardRef(function(t,n){let{"aria-current":r="page",caseSensitive:a=!1,className:l="",end:o=!1,style:i,to:s,viewTransition:u,children:h}=t,m=gf(t,Gm),v=er(s,{relative:m.relative}),_=Yt(),N=z.useContext(xl),{navigator:g,basename:E}=z.useContext(nt),f=N!=null&&ov(v)&&u===!0,c=g.encodeLocation?g.encodeLocation(v).pathname:v.pathname,p=_.pathname,y=N&&N.navigation&&N.navigation.location?N.navigation.location.pathname:null;a||(p=p.toLowerCase(),y=y?y.toLowerCase():null,c=c.toLowerCase()),y&&E&&(y=Qt(y,E)||y);let C=c!=="/"&&c.endsWith("/")?c.length-1:c.length,x=p===c||!o&&p.startsWith(c)&&p.charAt(C)==="/",$=y!=null&&(y===c||!o&&y.startsWith(c)&&y.charAt(c.length)==="/"),L={isActive:x,isPending:$,isTransitioning:f},A=x?r:void 0,b;typeof l=="function"?b=l(L):b=[l,x?"active":null,$?"pending":null,f?"transitioning":null].filter(Boolean).join(" ");let F=typeof i=="function"?i(L):i;return z.createElement(Xt,Pl({},m,{"aria-current":A,className:b,ref:n,style:F,to:s,viewTransition:u}),typeof h=="function"?h(L):h)});var cs;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(cs||(cs={}));var yf;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(yf||(yf={}));function av(e){let t=z.useContext(qn);return t||J(!1),t}function lv(e,t){let{target:n,replace:r,state:a,preventScrollReset:l,relative:o,viewTransition:i}=t===void 0?{}:t,s=Jt(),u=Yt(),h=er(e,{relative:o});return z.useCallback(m=>{if(Ym(m,n)){m.preventDefault();let v=r!==void 0?r:vn(u)===vn(h);s(e,{replace:v,state:a,preventScrollReset:l,relative:o,viewTransition:i})}},[u,s,h,r,a,n,e,l,o,i])}function ov(e,t){t===void 0&&(t={});let n=z.useContext(Zm);n==null&&J(!1);let{basename:r}=av(cs.useViewTransitionState),a=er(e,{relative:t.relative});if(!n.isTransitioning)return!1;let l=Qt(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=Qt(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Kt(a.pathname,o)!=null||Kt(a.pathname,l)!=null}var Nf=function(e,t,n,r){var a;t[0]=0;for(var l=1;l<t.length;l++){var o=t[l++],i=t[l]?(t[0]|=o?1:2,n[t[l++]]):t[++l];o===3?r[0]=i:o===4?r[1]=Object.assign(r[1]||{},i):o===5?(r[1]=r[1]||{})[t[++l]]=i:o===6?r[1][t[++l]]+=i+"":o?(a=e.apply(i,Nf(e,i,n,["",null])),r.push(a),i[0]?t[0]|=2:(t[l-2]=0,t[l]=a)):r.push(i)}return r},_f=new Map;function Sf(e){var t=_f.get(this);return t||(t=new Map,_f.set(this,t)),(t=Nf(this,t.get(e)||(t.set(e,t=(function(n){for(var r,a,l=1,o="",i="",s=[0],u=function(v){l===1&&(v||(o=o.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(0,v,o):l===3&&(v||o)?(s.push(3,v,o),l=2):l===2&&o==="..."&&v?s.push(4,v,0):l===2&&o&&!v?s.push(5,0,!0,o):l>=5&&((o||!v&&l===5)&&(s.push(l,0,o,a),l=6),v&&(s.push(l,v,0,a),l=6)),o=""},h=0;h<n.length;h++){h&&(l===1&&u(),u(h));for(var m=0;m<n[h].length;m++)r=n[h][m],l===1?r==="<"?(u(),s=[s],l=3):o+=r:l===4?o==="--"&&r===">"?(l=1,o=""):o=r+o[0]:i?r===i?i="":o+=r:r==='"'||r==="'"?i=r:r===">"?(u(),l=1):l&&(r==="="?(l=5,a=o,o=""):r==="/"&&(l<5||n[h][m+1]===">")?(u(),l===3&&(s=s[0]),l=s,(s=s[0]).push(2,0,l),l=0):r===" "||r==="	"||r===`
`||r==="\r"?(u(),l=2):o+=r),l===3&&o==="!--"&&(l=4,s=s[0])}return u(),s})(e)),t),arguments,[])).length>1?t:t[0]}var Tl=document.getElementById("boot-fallback"),Ef=document.getElementById("boot-fallback-message");function iv(e){Ef&&(Ef.textContent=e)}function sv(e){e&&iv(e),Tl&&Tl.classList.remove("hidden")}function uv(){Tl&&Tl.classList.add("hidden")}function qr(e,t){t&&console.error(e,t),sv(e)}var S=Sf.bind(D.default.createElement);function pe(e){return String(e||"unknown").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function cv(e){let t=String(e||"").toLowerCase();return t==="completed"||t==="approved"?"success":t.includes("reject")||t.includes("timeout")||t.includes("failed")?"danger":t.includes("pending")||t.includes("progress")||t.includes("queued")?"warning":"neutral"}function Zt({value:e}){return S`<span className=${`badge ${cv(e)}`}>${pe(e)}</span>`}function be(e){if(!e)return"-";let t=new Date(e);return Number.isNaN(t.getTime())?"-":t.toLocaleString()}function dv(e){let t=Number(e||0);if(t<=0)return"0 B";let n=["B","KB","MB","GB","TB"],r=Math.min(Math.floor(Math.log(t)/Math.log(1024)),n.length-1);return`${(t/1024**r).toFixed(r===0?0:1)} ${n[r]}`}function kf(e){if(!e||typeof e!="object")return"";let t=["decision","status","winner_model","endpoint","image_preview_url","final_preview_url","notes"],n=[];return t.forEach(a=>{let l=e[a];l!=null&&String(l).trim()!==""&&n.push(`${a}: ${String(l)}`)}),n.length>0?n.slice(0,3).join(" | "):Object.entries(e).slice(0,2).map(([a,l])=>`${a}: ${String(l)}`).join(" | ")}async function G(e,t={}){let n=new Headers(t.headers||{});t.body&&!n.has("Content-Type")&&n.set("Content-Type","application/json");let r=await fetch(e,{...t,headers:n}),a=await r.text(),l=null;if(a)try{l=JSON.parse(a)}catch{l=a}if(!r.ok){let o=l&&typeof l=="object"&&l.detail?l.detail:r.statusText;throw new Error(o||`Request failed (${r.status})`)}return l}function gn(e,t){let n=String(t?.message||"").trim();return n||`Unable to load ${e}`}function wn(e){let t=String(e?.message||"").trim().toLowerCase();return t==="not found"||t.includes("404")}function fv(e){return{theme_name:String(e.theme_name||"Internal Theme").trim(),tone_funny_pct:Number(e.tone_funny_pct||20),tone_emotion_pct:Number(e.tone_emotion_pct||80),tone_style:String(e.tone_style||"conversational"),audience:String(e.audience||"internal reviewer").trim(),cultural_context:String(e.cultural_context||"global").trim(),output_spec:{format:"paragraph",length:{target_words:80},structure:{no_lists:!0,no_numbering:!0}},avoid_cliches:!0,rendering:{theme_style:"minimal",text_alignment:"center",export_size:"1080x1350"}}}function pv(e){return!e||typeof e!="object"?null:{theme_name:String(e.theme_name||"Internal Theme").trim(),audience:String(e.audience||"internal reviewer").trim(),cultural_context:String(e.cultural_context||"global").trim(),tone_style:String(e.tone_style||"conversational").trim(),tone_funny_pct:Number(e.tone_funny_pct??20),tone_emotion_pct:Number(e.tone_emotion_pct??80)}}function Rf(e){return String(e||"").split(",").map(t=>t.trim()).filter(Boolean)}function Cf(e){if(!e)return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toISOString().slice(0,10)}function xf(e){if(!e)return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=t.getTimezoneOffset()*60*1e3;return new Date(t.getTime()-n).toISOString().slice(0,16)}function ds(e,t=140){let n=String(e||"").trim();return n?n.length<=t?n:`${n.slice(0,t-1).trimEnd()}...`:""}function Tf(e){return typeof e=="string"?e.trim():""}function hv(e){let t=Tf(e);if(!t)return!1;if(t.startsWith("data:image/"))return!0;try{let n=new URL(t,window.location.origin);return/\.(png|jpe?g|webp|gif|svg)$/i.test(n.pathname)}catch{return!1}}function fs(e,t=[]){if(!e||typeof e!="object")return[];let n=[],r=new Set,a=(l,o,i)=>{let s=Tf(o);!s||r.has(s)||!hv(s)||(r.add(s),n.push({label:l,url:s,source:i}))};if(a("Final Preview",e.final_preview_url,"final_preview_url"),a("Final PNG",e.final_asset_urls&&typeof e.final_asset_urls=="object"?e.final_asset_urls.png:"","final_asset_urls.png"),a("Image Preview",e.image_preview_url,"image_preview_url"),a("Content Preview",e.content_preview_url,"content_preview_url"),Array.isArray(t)){let l={final_preview:"Final Preview",final_png:"Final PNG",image_preview:"Image Preview",content_preview:"Content Preview"};t.forEach(o=>{let i=String(o?.asset_type||"").toLowerCase(),s=l[i];s&&a(s,o.public_url||o.asset_url,`asset:${i}`)})}return n}function Dl(e){let t=(0,D.useMemo)(()=>e.map(i=>`${i.source}:${i.url}`).join("|"),[e]),[n,r]=(0,D.useState)(0);(0,D.useEffect)(()=>{r(0)},[t]);let a=n<e.length?e[n]:null,l=e.length>0&&n>=e.length;function o(){r(i=>i+1)}return{currentCandidate:a,exhausted:l,handleError:o}}function mv({image:e}){let t=(0,D.useMemo)(()=>!e||!e.url?[]:[{label:e.label||"Preview",url:e.url,source:e.label||"preview"}],[e]),{currentCandidate:n,exhausted:r,handleError:a}=Dl(t);return S`
      <article className="image-card">
        ${n?S`
              <a href=${n.url} target="_blank" rel="noreferrer">
                <img src=${n.url} alt=${e.label} loading="lazy" onError=${a} />
              </a>
            `:S`<p className="empty-state">${r?"Preview unavailable.":"No preview available yet."}</p>`}
        <p className="image-caption">${e.label}</p>
      </article>
    `}function vv({job:e,actionState:t,onArchive:n,onDelete:r}){let a=(0,D.useMemo)(()=>fs(e),[e]),{currentCandidate:l,exhausted:o,handleError:i}=Dl(a),s=ds(e.content_preview||"Content preview will appear here after generation.",180);return S`
      <article className="ecard-tile">
        <div className="ecard-media">
          ${l?S`
                <img
                  src=${l.url}
                  alt=${e.theme_name||"Generated eCard"}
                  loading="lazy"
                  onError=${i}
                />
              `:o?S`
                  <div className="ecard-placeholder">
                    <p className="ecard-placeholder-kicker">Preview Unavailable</p>
                    <p className="ecard-placeholder-copy">The stored preview URL did not load.</p>
                  </div>
                `:S`
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
            <${Zt} value=${e.status} />
          </div>
          <div className="ecard-stage-row">
            <span className="ecard-stage">${pe(e.current_stage)}</span>
            <span className="ecard-job-id">${e.job_id}</span>
          </div>
          <div className="ecard-actions">
            <${Xt} to=${`/jobs/${e.job_id}`} className="button-link">View Details<//>
            ${l?S`
                  <a href=${l.url} target="_blank" rel="noreferrer" className="button-link">
                    Open Image
                  </a>
                `:S`<button type="button" className="button" disabled=${!0}>Open Image</button>`}
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
    `}function yv(){let e=Jt(),[t,n]=(0,D.useState)([]),[r,a]=(0,D.useState)(null),[l,o]=(0,D.useState)([]),[i,s]=(0,D.useState)(null),[u,h]=(0,D.useState)(!1),[m,v]=(0,D.useState)(!1),[_,N]=(0,D.useState)(!1),[g,E]=(0,D.useState)(""),[f,c]=(0,D.useState)(""),[p,y]=(0,D.useState)(""),[C,x]=(0,D.useState)(""),[$,L]=(0,D.useState)(""),[A,b]=(0,D.useState)(!1),[F,ne]=(0,D.useState)(!1),[V,se]=(0,D.useState)(!1),[ue,ye]=(0,D.useState)(""),[ce,R]=(0,D.useState)({theme_name:"Internal Launch Sprint",audience:"operations team",cultural_context:"global",tone_style:"conversational",tone_funny_pct:20,tone_emotion_pct:80}),M=i&&typeof i=="object"&&i.theme||null,Ee=(0,D.useMemo)(()=>{let d=0,w=0,O=0;return t.forEach(j=>{let K=String(j.status||"").toLowerCase();if(K==="completed"){w+=1;return}if(K.includes("reject")||K.includes("timeout")||K.includes("failed")){O+=1;return}K!=="archived"&&(d+=1)}),{active:d,completed:w,failed:O}},[t]);async function Z(){h(!0),v(!0),N(!0),E(""),c(""),y(""),x("");let[d,w,O,j]=await Promise.allSettled([G("/api/jobs?limit=50"),G("/api/storage/summary"),G("/api/themes/schedule"),G("/api/themes/today")]),K="";if(d.status==="fulfilled"?n(Array.isArray(d.value)?d.value:[]):(n([]),E(gn("jobs",d.reason))),w.status==="fulfilled"?a(w.value||null):(a(null),c(gn("storage summary",w.reason))),O.status==="fulfilled"){let hs=Array.isArray(O.value)?[]:Array.isArray(O.value?.week_schedule)?O.value.week_schedule:[];o(hs),hs.length===0&&(K="Theme schedule not configured yet")}else o([]),wn(O.reason)?K="Theme Factory not configured yet":y(gn("Theme Factory schedule",O.reason));j.status==="fulfilled"?(s(j.value||null),!K&&j.value?.resolved===!1?K=j.value?.message||"Theme schedule not configured yet":!K&&!j.value?.theme&&(K="Theme schedule not configured yet")):(s(null),wn(j.reason)?K=K||"Theme schedule not configured yet":y(gn("today's theme",j.reason))),x(K),h(!1),v(!1),N(!1);let Df=O.status!=="fulfilled"&&!wn(O.reason),Lf=j.status!=="fulfilled"&&!wn(j.reason),bf=d.status!=="fulfilled"||w.status!=="fulfilled"||Df||Lf;L(bf?`Refresh completed with errors at ${new Date().toLocaleTimeString()}`:`Refreshed ${new Date().toLocaleTimeString()}`)}(0,D.useEffect)(()=>{Z()},[]);async function _n(d){d.preventDefault(),ne(!0),E("");try{let w=fv(ce),O=await G("/api/jobs/start",{method:"POST",body:JSON.stringify(w)});b(!1),L(`Created ${O.job_id}`),await Z(),e(`/jobs/${O.job_id}`)}catch(w){E(w.message||"Unable to create new job")}finally{ne(!1)}}function at(d,w){R(O=>({...O,[d]:w}))}function kt(){let d=pv(M);d&&R(w=>({...w,...d}))}async function Nn(){se(!0),y("");try{let d=await G("/api/jobs/create-daily-theme-job",{method:"POST"});L(`Created ${d.job_id} from today's theme`),await Z(),e(`/jobs/${d.job_id}`)}catch(d){y(d.message||"Unable to create today's themed job")}finally{se(!1)}}async function ft(d){ye(`archive:${d.job_id}`),E("");try{await G(`/api/jobs/${d.job_id}/archive`,{method:"POST"}),L(`Archived ${d.job_id}`),await Z()}catch(w){E(w.message||"Unable to archive job")}finally{ye("")}}async function Ll(d){if(window.confirm(`Delete ${d.job_id} and associated files?`)){ye(`delete:${d.job_id}`),E("");try{await G(`/api/jobs/${d.job_id}`,{method:"DELETE"}),L(`Deleted ${d.job_id}`),await Z()}catch(O){E(O.message||"Unable to delete job")}finally{ye("")}}}return S`
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
            <button type="button" className="button primary" onClick=${()=>b(!0)}>Create New Card Job</button>
            <button
              type="button"
              className="button"
              onClick=${Z}
              disabled=${u||m||_}
            >
              Refresh
            </button>
            <${Xt} to="/themes" className="button-link">Open Theme Factory<//>
            <${Xt} to="/compare" className="button-link">Open Compare Lab<//>
          </div>
        </header>

        ${$?S`<p className="status-line">${$}</p>`:null}

        ${u||m||_||g||f||p?S`
              <div className="status-stack">
                ${u?S`<div className="status-panel warning">Loading jobs from /api/jobs...</div>`:null}
                ${m?S`<div className="status-panel warning">Loading storage summary from /api/storage/summary...</div>`:null}
                ${_?S`<div className="status-panel warning">Loading Theme Factory data from /api/themes/schedule...</div>`:null}
                ${g?S`<div className="status-panel error">Unable to load jobs: ${g}</div>`:null}
                ${f?S`<div className="status-panel error">Unable to load storage summary: ${f}</div>`:null}
                ${p?S`<div className="status-panel error">Theme error: ${p}</div>`:null}
              </div>
            `:null}

        <section className="cards-grid">
          <article className="summary-card">
            <p className="summary-label">Active Jobs</p>
            <p className="summary-value">${u?"...":Ee.active}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Completed Jobs</p>
            <p className="summary-value">${u?"...":Ee.completed}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Failed Jobs</p>
            <p className="summary-value">${u?"...":Ee.failed}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Storage Usage</p>
            <p className="summary-value">${m?"...":r?dv(r.total_bytes):"Unavailable"}</p>
          </article>
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Generated eCards</h2>
              <p className="section-copy">Final previews, generated image previews, and content-first placeholders for each job.</p>
            </div>
          </div>
          ${u?S`<p className="empty-state">Loading generated eCards...</p>`:g?S`<p className="empty-state">Unable to load generated eCards. Check API availability and refresh.</p>`:t.length===0?S`
                    <div className="empty-state">
                      <p className="empty-state-title">No generated eCards yet</p>
                      <p className="empty-state-copy">Start a workflow job to generate the first card for this console.</p>
                      <button type="button" className="button primary" onClick=${()=>b(!0)}>
                        Create New Card Job
                      </button>
                    </div>
                  `:S`
                    <div className="ecard-grid">
                      ${t.map(d=>S`
                          <${vv}
                            key=${d.job_id}
                            job=${d}
                            actionState=${ue}
                            onArchive=${ft}
                            onDelete=${Ll}
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
                ${M?`Today's Theme: ${M.theme_name} (${pe(i?.weekday)})`:C||"Today's Theme: Unavailable"}
              </p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button primary"
                onClick=${Nn}
                disabled=${V||_||!M}
              >
                ${V?"Generating...":"Generate Today's Card"}
              </button>
              <${Xt} to="/themes" className="button-link">Manage Themes<//>
            </div>
          </div>
          ${C?S`<div className="status-panel neutral">${C}</div>`:null}
          ${_?S`<p className="empty-state">Loading weekly schedule...</p>`:l.length===0?S`<p className="empty-state">Theme schedule not configured yet.</p>`:S`
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
                        ${l.map(d=>S`
                            <tr key=${`${d.plan_date}_${d.weekday}`}>
                              <td>${be(d.plan_date)}</td>
                              <td>${pe(d.weekday)}</td>
                              <td>${d.theme?.theme_name||"-"}</td>
                              <td>${pe(d.source)}</td>
                              <td>${d.theme?.tone_style||"-"}</td>
                              <td>${d.theme?.audience||"-"}</td>
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
          ${u?S`<p className="empty-state">Loading jobs...</p>`:g?S`<p className="empty-state">Unable to load jobs. Check API availability and refresh.</p>`:t.length===0?S`<p className="empty-state">No jobs found yet.</p>`:S`
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
                          ${t.map(d=>S`
                              <tr key=${d.job_id}>
                                <td><${Xt} className="job-link" to=${`/jobs/${d.job_id}`}>${d.job_id}<//></td>
                                <td>${d.theme_name||"-"}</td>
                                <td>${pe(d.current_stage)}</td>
                                <td><${Zt} value=${d.status} /></td>
                                <td>${be(d.created_at)}</td>
                                <td>${be(d.updated_at)}</td>
                              </tr>
                            `)}
                        </tbody>
                      </table>
                    </div>
                  `}
        </section>

        ${A?S`
              <div className="modal-backdrop" onClick=${()=>b(!1)}>
                <section className="modal" onClick=${d=>d.stopPropagation()}>
                  <h2 className="section-title">Create New Workflow Job</h2>
                  <p className="section-copy">Starts generation and opens approval flow.</p>
                  <form onSubmit=${_n}>
                    <div className="form-grid">
                      <div className="form-field full">
                        <label htmlFor="themeName">Theme Name</label>
                        <input
                          id="themeName"
                          value=${ce.theme_name}
                          onInput=${d=>at("theme_name",d.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="audience">Audience</label>
                        <input
                          id="audience"
                          value=${ce.audience}
                          onInput=${d=>at("audience",d.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="culturalContext">Cultural Context</label>
                        <input
                          id="culturalContext"
                          value=${ce.cultural_context}
                          onInput=${d=>at("cultural_context",d.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="toneStyle">Tone Style</label>
                        <select
                          id="toneStyle"
                          value=${ce.tone_style}
                          onChange=${d=>at("tone_style",d.target.value)}
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
                          value=${ce.tone_funny_pct}
                          onInput=${d=>at("tone_funny_pct",d.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="emotionPct">Emotion %</label>
                        <input
                          id="emotionPct"
                          type="number"
                          min="0"
                          max="100"
                          value=${ce.tone_emotion_pct}
                          onInput=${d=>at("tone_emotion_pct",d.target.value)}
                        />
                      </div>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button
                        type="button"
                        className="button"
                        onClick=${kt}
                        disabled=${!M}
                      >
                        Use Today's Theme
                      </button>
                      <button type="submit" className="button primary" disabled=${F}>
                        ${F?"Creating...":"Create Job"}
                      </button>
                      <button type="button" className="button" onClick=${()=>b(!1)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}
      </section>
    `}function gv(){let e=Jt(),{jobId:t}=os(),[n,r]=(0,D.useState)(null),[a,l]=(0,D.useState)([]),[o,i]=(0,D.useState)([]),[s,u]=(0,D.useState)([]),[h,m]=(0,D.useState)([]),[v,_]=(0,D.useState)([]),[N,g]=(0,D.useState)(!1),[E,f]=(0,D.useState)(""),[c,p]=(0,D.useState)(""),[y,C]=(0,D.useState)("");async function x(){if(t){g(!0),p("");try{let[R,M,Ee,Z,_n]=await Promise.all([G(`/api/jobs/${t}`),G(`/api/jobs/${t}/assets`),G(`/api/jobs/${t}/events`),G(`/api/jobs/${t}/candidates`),G(`/api/jobs/${t}/shortlist`)]);r(R||null),l(Array.isArray(M)?M:[]),i(Array.isArray(Ee)?Ee:[]);let at=Array.isArray(Z)?Z:[],kt=Array.isArray(_n)?_n:[];u(at),m(kt);let Nn=kt.filter(ft=>ft.is_selected).map(ft=>Number(ft.candidate_id)).filter(ft=>Number.isInteger(ft));_(Nn.length>0?Nn:kt[0]?[Number(kt[0].candidate_id)]:[])}catch(R){p(R.message||"Unable to load job detail")}finally{g(!1)}}}(0,D.useEffect)(()=>{x()},[t]);let $=(0,D.useMemo)(()=>{if(!n)return[];let R=String(n.status||"").toLowerCase(),M=n.content_preview?"completed":R.startsWith("content")?"in_progress":"pending",Ee=n.image_preview_url||R.startsWith("final")||R==="completed"?"completed":R.startsWith("image")?"in_progress":"pending",Z=n.final_asset_urls&&(n.final_asset_urls.png||n.final_asset_urls.pdf)?"completed":R.startsWith("final")?"in_progress":R==="completed"?"completed":"pending";return[{label:"content_generation_status",value:M},{label:"content_approval_status",value:n.content_approval_status||"pending"},{label:"image_generation_status",value:Ee},{label:"image_approval_status",value:n.image_approval_status||"pending"},{label:"final_render_status",value:Z},{label:"final_approval_status",value:n.final_approval_status||"pending"}]},[n]),L=(0,D.useMemo)(()=>n?fs(n,a):[],[n,a]),A=Dl(L),b=(0,D.useMemo)(()=>n?fs({image_preview_url:n.image_preview_url,content_preview_url:n.content_preview_url},a.filter(R=>String(R?.asset_type||"").toLowerCase()==="image_preview")):[],[n,a]),F=Dl(b),ne=(0,D.useMemo)(()=>a.filter(R=>String(R?.asset_type||"").toLowerCase()==="shortlist_preview").map((R,M)=>({label:`Shortlist Preview ${M+1}`,url:R.public_url||R.asset_url,source:`shortlist_preview:${M}`})).filter(R=>R.url),[a]);async function V(R){if(!t)return;let M={content:`/api/jobs/${t}/rerun/content`,image:`/api/jobs/${t}/rerun/image`,final_render:`/api/jobs/${t}/rerun/final-render`,full:`/api/jobs/${t}/rerun/full`},Ee=`rerun:${R}`;f(Ee),p("");try{let Z=await G(M[R],{method:"POST"});C(`Reran ${pe(R)} for ${Z.job_id} (retry ${Z.retry_count})`),await x()}catch(Z){p(Z.message||`Unable to rerun ${pe(R)}`)}finally{f("")}}function se(R,M){_(Ee=>{let Z=new Set(Ee);return M?Z.add(R):Z.delete(R),Array.from(Z)})}async function ue(){if(t){f("render-shortlist"),p("");try{let R=await G(`/api/jobs/${t}/render-shortlist`,{method:"POST",body:JSON.stringify({candidate_ids:v})});C(`Rendered ${R.rendered_count} shortlist preview card(s)`),await x()}catch(R){p(R.message||"Unable to render shortlist")}finally{f("")}}}async function ye(){if(t){f("archive"),p("");try{let R=await G(`/api/jobs/${t}/archive`,{method:"POST"});C(`Job archived (${be(R.updated_at)})`),await x()}catch(R){p(R.message||"Unable to archive job")}finally{f("")}}}async function ce(){if(!(!t||!window.confirm(`Delete ${t} and associated files?`))){f("delete"),p("");try{await G(`/api/jobs/${t}`,{method:"DELETE"}),e("/")}catch(M){p(M.message||"Unable to delete job")}finally{f("")}}}return S`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Jobs</p>
            <h1 className="page-title">Job Detail</h1>
            <p className="page-description">${t||"-"}</p>
          </div>
          <div className="inline-actions">
            <button className="button" type="button" onClick=${x} disabled=${N}>Refresh</button>
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
              onClick=${ce}
              disabled=${E==="delete"}
            >
              ${E==="delete"?"Deleting...":"Delete Job + Files"}
            </button>
          </div>
        </header>

        ${c?S`<p className="status-line error">${c}</p>`:null}
        ${y?S`<p className="status-line">${y}</p>`:null}
        ${n?.last_error_message?S`<div className="status-panel error">Last stage error: ${n.last_error_message}</div>`:null}

        ${n?S`
              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Stage and Status Breakdown</h2>
                    <p className="section-copy">Lifecycle status across generation and approval gates.</p>
                  </div>
                  <${Zt} value=${n.status} />
                </div>
                <div className="key-value-grid">
                  ${$.map(R=>S`
                      <article className="key-card" key=${R.label}>
                        <p className="key-label">${R.label}</p>
                        <p className="key-value"><${Zt} value=${R.value} /></p>
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
                  ${o.length===0?S`<p className="empty-state">No lifecycle events found.</p>`:S`
                        <ul className="list-simple">
                          ${o.slice().reverse().map((R,M)=>S`
                                <li key=${`${R.event_type}_${M}`} className="list-item">
                                  <p className="event-type">${R.event_type}</p>
                                  <p className="event-meta">${be(R.created_at)}</p>
                                  ${kf(R.event_payload_json)?S`<p className="event-meta">${kf(R.event_payload_json)}</p>`:null}
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
                  ${a.length===0?S`<p className="empty-state">No assets saved for this job yet.</p>`:S`
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
                              ${a.map((R,M)=>S`
                                  <tr key=${`${R.asset_type}_${M}`}>
                                    <td>${R.asset_type}</td>
                                    <td>
                                      ${R.asset_url?S`<a className="job-link" href=${R.asset_url} target="_blank" rel="noreferrer">open</a>`:"-"}
                                    </td>
                                    <td><code>${R.relative_path||"-"}</code></td>
                                    <td><code>${R.absolute_path||"-"}</code></td>
                                    <td><${Zt} value=${R.approved?"approved":"pending"} /></td>
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
                ${s.length===0?S`<p className="empty-state">No candidates stored for this job yet.</p>`:S`
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
                            ${s.map(R=>S`
                                <tr key=${R.id||`${R.model}_${R.text}`}>
                                  <td>${R.model}</td>
                                  <td>${Number(R.raw_score||0).toFixed(3)}</td>
                                  <td>${Number(R.judged_score??R.judge_score??0).toFixed(3)}</td>
                                  <td><${Zt} value=${R.is_shortlisted?"shortlisted":"pooled"} /></td>
                                  <td><${Zt} value=${R.is_selected?"selected":"not_selected"} /></td>
                                  <td>${ds(R.text||R.content_text,200)}</td>
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
                  <button type="button" className="button primary" onClick=${ue} disabled=${E==="render-shortlist"||h.length===0}>
                    ${E==="render-shortlist"?"Rendering...":"Render Shortlist"}
                  </button>
                </div>
                ${h.length===0?S`<p className="empty-state">No shortlist available for this job yet.</p>`:S`
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
                            ${h.map(R=>S`
                                <tr key=${R.candidate_id}>
                                  <td>
                                    <input
                                      type="checkbox"
                                      checked=${v.includes(Number(R.candidate_id))}
                                      onChange=${M=>se(Number(R.candidate_id),M.target.checked)}
                                    />
                                  </td>
                                  <td>${R.rank}</td>
                                  <td>${R.model}</td>
                                  <td>${Number(R.score||0).toFixed(3)}</td>
                                  <td>${ds(R.text,220)}</td>
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
                ${A.currentCandidate?S`
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
                    `:A.exhausted?S`<p className="empty-state">Preview unavailable.</p>`:S`<p className="empty-state">No preview or final image available yet.</p>`}
              </section>

              <section className="two-column">
                <section className="section-panel">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">Image Preview</h2>
                      <p className="section-copy">Intermediate generated image if available.</p>
                    </div>
                  </div>
                  ${F.currentCandidate?S`
                        <div className="image-grid image-grid-single">
                          <article className="image-card">
                            <a href=${F.currentCandidate.url} target="_blank" rel="noreferrer">
                              <img
                                src=${F.currentCandidate.url}
                                alt="Image Preview"
                                loading="lazy"
                                onError=${F.handleError}
                              />
                            </a>
                            <p className="image-caption">Image Preview</p>
                          </article>
                        </div>
                      `:F.exhausted?S`<p className="empty-state">Preview unavailable.</p>`:S`<p className="empty-state">No image preview available yet.</p>`}
                </section>

                <section className="section-panel">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">Content Preview</h2>
                      <p className="section-copy">Approved or generated message copy stored on the job.</p>
                    </div>
                  </div>
                  ${n.content_preview?S`<div className="content-preview-block">${n.content_preview}</div>`:S`<p className="empty-state">No content preview stored yet.</p>`}
                </section>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Additional Previews</h2>
                    <p className="section-copy">All preview variants, shortlist renders, and exported images discovered on this job.</p>
                  </div>
                </div>
                ${L.length===0&&ne.length===0?S`<p className="empty-state">No preview variants available yet.</p>`:S`
                      <div className="image-grid">
                        ${[...L,...ne].map(R=>S`
                            <${mv} key=${R.url} image=${R} />
                          `)}
                      </div>
                    `}
              </section>
            `:S`<p className="empty-state">${N?"Loading job details...":"Job not found."}</p>`}
      </section>
    `}function wv(){let e=Jt(),[t,n]=(0,D.useState)([]),[r,a]=(0,D.useState)({week_schedule:[],month_schedule:[],active_overrides:[]}),[l,o]=(0,D.useState)(null),[i,s]=(0,D.useState)(!1),[u,h]=(0,D.useState)(""),[m,v]=(0,D.useState)(""),[_,N]=(0,D.useState)(""),[g,E]=(0,D.useState)(""),[f,c]=(0,D.useState)(!1),[p,y]=(0,D.useState)(!1),[C,x]=(0,D.useState)(!1),[$,L]=(0,D.useState)(null),[A,b]=(0,D.useState)(null),[F,ne]=(0,D.useState)({theme_key:"",theme_name:"",description:"",theme_bucket:"everyday",theme_type:"evergreen",cultural_context:"global",tone_style:"conversational",default_funny_pct:20,default_emotion_pct:80,default_audience:"general audience",default_visual_style:"minimal",is_active:!0,priority:0}),[V,se]=(0,D.useState)({theme_id:"",schedule_type:"weekly_recurring",start_date:"",end_date:"",weekday_mask:"monday",month_mask:"",region:"",country:"",is_active:!0,priority:0,notes:""}),[ue,ye]=(0,D.useState)({theme_id:"",override_scope:"editorial",start_at:"",end_at:"",reason:"",force_top_priority:!0,created_by:"console_admin"}),ce=l&&typeof l=="object"&&l.theme||null,R=(0,D.useMemo)(()=>t.reduce((d,w)=>{let O=String(w.theme_bucket||"everyday");return d[O]=(d[O]||0)+1,d},{everyday:0,special:0,current_event:0}),[t]);async function M(){s(!0),h(""),v("");let[d,w,O]=await Promise.allSettled([G("/api/themes"),G("/api/themes/today"),G("/api/themes/schedule")]);if(d.status==="fulfilled"){let j=Array.isArray(d.value)?d.value:[];n(j),j.length>0&&(se(K=>({...K,theme_id:String(K.theme_id||j[0].id)})),ye(K=>({...K,theme_id:String(K.theme_id||j[0].id)}))),j.length===0&&v("Theme schedule not configured yet")}else n([]),wn(d.reason)?v("Theme schedule not configured yet"):h(gn("theme catalog",d.reason));if(w.status==="fulfilled"?(o(w.value||null),w.value?.resolved===!1&&v(j=>j||w.value?.message||"No theme resolved yet")):(o(null),wn(w.reason)?v(j=>j||"No theme resolved yet"):h(j=>j||gn("today's theme",w.reason))),O.status==="fulfilled"){if(Array.isArray(O.value)){a({week_schedule:[],month_schedule:[],active_overrides:[]}),v(j=>j||"Theme schedule not configured yet"),s(!1);return}a({week_schedule:Array.isArray(O.value?.week_schedule)?O.value.week_schedule:[],month_schedule:Array.isArray(O.value?.month_schedule)?O.value.month_schedule:[],active_overrides:Array.isArray(O.value?.active_overrides)?O.value.active_overrides:[]})}else a({week_schedule:[],month_schedule:[],active_overrides:[]}),wn(O.reason)?v(j=>j||"Theme schedule not configured yet"):h(j=>j||gn("theme schedule",O.reason));s(!1)}(0,D.useEffect)(()=>{M()},[]);function Ee(d=null){L(d?d.id:null),ne({theme_key:d?.theme_key||"",theme_name:d?.theme_name||"",description:d?.description||"",theme_bucket:d?.theme_bucket||"everyday",theme_type:d?.theme_type||"evergreen",cultural_context:d?.cultural_context||"global",tone_style:d?.tone_style||"conversational",default_funny_pct:d?.default_funny_pct??20,default_emotion_pct:d?.default_emotion_pct??80,default_audience:d?.default_audience||"general audience",default_visual_style:d?.default_visual_style||"minimal",is_active:d?.is_active??!0,priority:d?.priority??0}),c(!0)}function Z(d=null){b(d?d.id:null),se({theme_id:String(d?.theme_id||t[0]?.id||""),schedule_type:d?.schedule_type||"weekly_recurring",start_date:Cf(d?.start_date),end_date:Cf(d?.end_date),weekday_mask:Array.isArray(d?.weekday_mask)?d.weekday_mask.join(", "):"monday",month_mask:Array.isArray(d?.month_mask)?d.month_mask.join(", "):"",region:d?.region||"",country:d?.country||"",is_active:d?.is_active??!0,priority:d?.priority??0,notes:d?.notes||""}),y(!0)}function _n(d=null){let w=new Date,O=new Date(w.getTime()+1440*60*1e3);ye({theme_id:String(d||ce?.theme_id||t[0]?.id||""),override_scope:"editorial",start_at:xf(w.toISOString()),end_at:xf(O.toISOString()),reason:"",force_top_priority:!0,created_by:"console_admin"}),x(!0)}async function at(d){d.preventDefault(),E("save-theme"),h("");try{let w={theme_key:String(F.theme_key||"").trim(),theme_name:String(F.theme_name||"").trim(),description:String(F.description||"").trim()||null,theme_bucket:F.theme_bucket,theme_type:F.theme_type,cultural_context:String(F.cultural_context||"").trim()||null,tone_style:String(F.tone_style||"").trim(),default_funny_pct:Number(F.default_funny_pct||0),default_emotion_pct:Number(F.default_emotion_pct||0),default_audience:String(F.default_audience||"").trim(),default_visual_style:String(F.default_visual_style||"").trim(),is_active:!!F.is_active,priority:Number(F.priority||0)},O=$?`/api/themes/${$}`:"/api/themes";await G(O,{method:$?"PUT":"POST",body:JSON.stringify(w)}),c(!1),N($?"Theme updated":"Theme created"),await M()}catch(w){h(w.message||"Unable to save theme")}finally{E("")}}async function kt(d){if(window.confirm(`Deactivate theme ${d.theme_name}?`)){E(`delete-theme:${d.id}`),h("");try{await G(`/api/themes/${d.id}`,{method:"DELETE"}),N(`Theme deactivated: ${d.theme_name}`),await M()}catch(O){h(O.message||"Unable to delete theme")}finally{E("")}}}async function Nn(d){d.preventDefault(),E("save-schedule"),h("");try{let w={theme_id:Number(V.theme_id),schedule_type:V.schedule_type,start_date:V.start_date||null,end_date:V.end_date||null,weekday_mask:Rf(V.weekday_mask),month_mask:Rf(V.month_mask).map(K=>Number(K)).filter(K=>Number.isInteger(K)),region:String(V.region||"").trim()||null,country:String(V.country||"").trim()||null,is_active:!!V.is_active,priority:Number(V.priority||0),notes:String(V.notes||"").trim()||null},O=A?`/api/themes/schedule/${A}`:"/api/themes/schedule";await G(O,{method:A?"PUT":"POST",body:JSON.stringify(w)}),y(!1),N(A?"Schedule updated":"Schedule created"),await M()}catch(w){h(w.message||"Unable to save schedule")}finally{E("")}}async function ft(d){d.preventDefault(),E("save-override"),h("");try{let w={theme_id:Number(ue.theme_id),override_scope:String(ue.override_scope||"").trim(),start_at:new Date(ue.start_at).toISOString(),end_at:new Date(ue.end_at).toISOString(),reason:String(ue.reason||"").trim()||null,force_top_priority:!!ue.force_top_priority,created_by:String(ue.created_by||"console_admin").trim()};await G("/api/themes/overrides",{method:"POST",body:JSON.stringify(w)}),x(!1),N("Override created"),await M()}catch(w){h(w.message||"Unable to save override")}finally{E("")}}async function Ll(){E("create-today-job"),h("");try{let d=await G("/api/jobs/create-daily-theme-job",{method:"POST"});N(`Created ${d.job_id} from today's theme`),e(`/jobs/${d.job_id}`)}catch(d){h(d.message||"Unable to create today's themed job")}finally{E("")}}return S`
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
              onClick=${Ll}
              disabled=${g==="create-today-job"||!ce}
            >
              ${g==="create-today-job"?"Creating...":"Use Today's Theme"}
            </button>
            <button type="button" className="button" onClick=${M} disabled=${i}>Refresh</button>
            <${Xt} to="/" className="button-link">Workflow Console<//>
          </div>
        </header>

        ${u?S`<div className="status-panel error">${u}</div>`:null}
        ${m?S`<div className="status-panel neutral">${m}</div>`:null}
        ${_?S`<p className="status-line">${_}</p>`:null}
        ${i?S`<div className="status-panel warning">Loading Theme Factory data...</div>`:null}

        <section className="cards-grid">
          <article className="summary-card">
            <p className="summary-label">Everyday Themes</p>
            <p className="summary-value">${R.everyday}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Special Themes</p>
            <p className="summary-value">${R.special}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Current Events</p>
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
          ${ce?S`
                <div className="key-value-grid">
                  <article className="key-card">
                    <p className="key-label">Theme</p>
                    <p className="key-value">${ce.theme_name}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Bucket</p>
                    <p className="key-value">${pe(ce.theme_bucket)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Source</p>
                    <p className="key-value">${pe(l?.source)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Weekday</p>
                    <p className="key-value">${pe(l?.weekday)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Audience</p>
                    <p className="key-value">${ce.audience}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Tone</p>
                    <p className="key-value">${ce.tone_style}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Priority</p>
                    <p className="key-value">${ce.priority}</p>
                  </article>
                </div>
              `:S`<p className="empty-state">No theme resolved yet.</p>`}
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Theme Catalog</h2>
              <p className="section-copy">Source themes available for schedules, overrides, and direct daily resolution.</p>
            </div>
            <div className="inline-actions">
              <button type="button" className="button primary" onClick=${()=>Ee()}>Add Theme</button>
            </div>
          </div>
          ${t.length===0?S`<p className="empty-state">No theme catalog entries found.</p>`:S`
                <div className="table-wrap">
                  <table className="console-table">
                    <thead>
                      <tr>
                        <th>theme_key</th>
                        <th>theme_name</th>
                        <th>theme_bucket</th>
                        <th>theme_type</th>
                        <th>audience</th>
                        <th>visual_style</th>
                        <th>priority</th>
                        <th>status</th>
                        <th>actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${t.map(d=>S`
                          <tr key=${d.id}>
                            <td><code>${d.theme_key}</code></td>
                            <td>${d.theme_name}</td>
                            <td>${pe(d.theme_bucket)}</td>
                            <td>${pe(d.theme_type)}</td>
                            <td>${d.default_audience}</td>
                            <td>${d.default_visual_style}</td>
                            <td>${d.priority}</td>
                            <td><${Zt} value=${d.is_active?"active":"inactive"} /></td>
                            <td>
                              <div className="inline-actions">
                                <button type="button" className="button" onClick=${()=>Ee(d)}>Edit</button>
                                <button
                                  type="button"
                                  className="button danger"
                                  onClick=${()=>kt(d)}
                                  disabled=${g===`delete-theme:${d.id}`}
                                >
                                  ${g===`delete-theme:${d.id}`?"Deleting...":"Delete"}
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

        <section className="two-column">
          <section className="section-panel">
            <div className="section-head">
              <div>
                <h2 className="section-title">This Week's Schedule</h2>
                <p className="section-copy">Resolved day-by-day schedule for the current week.</p>
              </div>
              <button type="button" className="button primary" onClick=${()=>Z()}>Add Schedule</button>
            </div>
            ${r.week_schedule.length===0?S`<p className="empty-state">No week schedule found.</p>`:S`
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
                        ${r.week_schedule.map(d=>S`
                            <tr key=${`${d.plan_date}_${d.weekday}`}>
                              <td>${be(d.plan_date)}</td>
                              <td>${pe(d.weekday)}</td>
                              <td>${d.theme?.theme_name||"-"}</td>
                              <td>${pe(d.source)}</td>
                              <td>${pe(d.schedule_type)}</td>
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
              <button type="button" className="button primary" onClick=${()=>_n()}>Add Override</button>
            </div>
            ${r.active_overrides.length===0?S`<p className="empty-state">No active overrides right now.</p>`:S`
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
                        ${r.active_overrides.map(d=>S`
                            <tr key=${d.id}>
                              <td>${d.theme_name||"-"}</td>
                              <td>${pe(d.override_scope)}</td>
                              <td>${be(d.start_at)} - ${be(d.end_at)}</td>
                              <td>${d.reason||"-"}</td>
                              <td>${d.force_top_priority?"top":"normal"}</td>
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
          ${r.month_schedule.length===0?S`<p className="empty-state">No monthly schedule rules found.</p>`:S`
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
                      ${r.month_schedule.map(d=>S`
                          <tr key=${d.id}>
                            <td>${d.theme_name||"-"}</td>
                            <td>${pe(d.schedule_type)}</td>
                            <td>${d.start_date?be(d.start_date):"-"}</td>
                            <td>${d.end_date?be(d.end_date):"-"}</td>
                            <td>${(d.weekday_mask||[]).join(", ")||"-"}</td>
                            <td>${(d.month_mask||[]).join(", ")||"-"}</td>
                            <td>${d.priority}</td>
                            <td>
                              <button type="button" className="button" onClick=${()=>Z(d)}>
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

        ${f?S`
              <div className="modal-backdrop" onClick=${()=>c(!1)}>
                <section className="modal modal-wide" onClick=${d=>d.stopPropagation()}>
                  <h2 className="section-title">${$?"Edit Theme":"Add Theme"}</h2>
                  <form onSubmit=${at}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="themeKey">Theme Key</label>
                        <input id="themeKey" value=${F.theme_key} onInput=${d=>ne(w=>({...w,theme_key:d.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeNameFactory">Theme Name</label>
                        <input id="themeNameFactory" value=${F.theme_name} onInput=${d=>ne(w=>({...w,theme_name:d.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeBucket">Theme Bucket</label>
                        <select id="themeBucket" value=${F.theme_bucket} onChange=${d=>ne(w=>({...w,theme_bucket:d.target.value}))}>
                          <option value="everyday">everyday</option>
                          <option value="special">special</option>
                          <option value="current_event">current_event</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeType">Theme Type</label>
                        <select id="themeType" value=${F.theme_type} onChange=${d=>ne(w=>({...w,theme_type:d.target.value}))}>
                          <option value="evergreen">evergreen</option>
                          <option value="calendar">calendar</option>
                          <option value="campaign">campaign</option>
                          <option value="news">news</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeContext">Cultural Context</label>
                        <input id="themeContext" value=${F.cultural_context} onInput=${d=>ne(w=>({...w,cultural_context:d.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeTone">Tone Style</label>
                        <input id="themeTone" value=${F.tone_style} onInput=${d=>ne(w=>({...w,tone_style:d.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeAudience">Audience</label>
                        <input id="themeAudience" value=${F.default_audience} onInput=${d=>ne(w=>({...w,default_audience:d.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeVisual">Visual Style</label>
                        <input id="themeVisual" value=${F.default_visual_style} onInput=${d=>ne(w=>({...w,default_visual_style:d.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themePriority">Priority</label>
                        <input id="themePriority" type="number" value=${F.priority} onInput=${d=>ne(w=>({...w,priority:d.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeFunny">Funny %</label>
                        <input id="themeFunny" type="number" min="0" max="100" value=${F.default_funny_pct} onInput=${d=>ne(w=>({...w,default_funny_pct:d.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeEmotion">Emotion %</label>
                        <input id="themeEmotion" type="number" min="0" max="100" value=${F.default_emotion_pct} onInput=${d=>ne(w=>({...w,default_emotion_pct:d.target.value}))} />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="themeDescription">Description</label>
                        <textarea id="themeDescription" rows="4" value=${F.description} onInput=${d=>ne(w=>({...w,description:d.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${F.is_active} onChange=${d=>ne(w=>({...w,is_active:d.target.checked}))} />
                        <span>Active theme</span>
                      </label>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${g==="save-theme"}>
                        ${g==="save-theme"?"Saving...":"Save Theme"}
                      </button>
                      <button type="button" className="button" onClick=${()=>c(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}

        ${p?S`
              <div className="modal-backdrop" onClick=${()=>y(!1)}>
                <section className="modal modal-wide" onClick=${d=>d.stopPropagation()}>
                  <h2 className="section-title">${A?"Edit Schedule":"Add Schedule"}</h2>
                  <form onSubmit=${Nn}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="scheduleTheme">Theme</label>
                        <select id="scheduleTheme" value=${V.theme_id} onChange=${d=>se(w=>({...w,theme_id:d.target.value}))} required>
                          ${t.map(d=>S`<option key=${d.id} value=${d.id}>${d.theme_name}</option>`)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleType">Schedule Type</label>
                        <select id="scheduleType" value=${V.schedule_type} onChange=${d=>se(w=>({...w,schedule_type:d.target.value}))}>
                          <option value="single_day">single_day</option>
                          <option value="date_range">date_range</option>
                          <option value="weekly_recurring">weekly_recurring</option>
                          <option value="monthly_recurring">monthly_recurring</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleStart">Start Date</label>
                        <input id="scheduleStart" type="date" value=${V.start_date} onInput=${d=>se(w=>({...w,start_date:d.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleEnd">End Date</label>
                        <input id="scheduleEnd" type="date" value=${V.end_date} onInput=${d=>se(w=>({...w,end_date:d.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="weekdayMask">Weekday Mask</label>
                        <input id="weekdayMask" value=${V.weekday_mask} onInput=${d=>se(w=>({...w,weekday_mask:d.target.value}))} placeholder="monday, thursday" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="monthMask">Month Mask</label>
                        <input id="monthMask" value=${V.month_mask} onInput=${d=>se(w=>({...w,month_mask:d.target.value}))} placeholder="2, 3, 8" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleRegion">Region</label>
                        <input id="scheduleRegion" value=${V.region} onInput=${d=>se(w=>({...w,region:d.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleCountry">Country</label>
                        <input id="scheduleCountry" value=${V.country} onInput=${d=>se(w=>({...w,country:d.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="schedulePriority">Priority</label>
                        <input id="schedulePriority" type="number" value=${V.priority} onInput=${d=>se(w=>({...w,priority:d.target.value}))} />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="scheduleNotes">Notes</label>
                        <textarea id="scheduleNotes" rows="4" value=${V.notes} onInput=${d=>se(w=>({...w,notes:d.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${V.is_active} onChange=${d=>se(w=>({...w,is_active:d.target.checked}))} />
                        <span>Active schedule</span>
                      </label>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${g==="save-schedule"}>
                        ${g==="save-schedule"?"Saving...":"Save Schedule"}
                      </button>
                      <button type="button" className="button" onClick=${()=>y(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}

        ${C?S`
              <div className="modal-backdrop" onClick=${()=>x(!1)}>
                <section className="modal" onClick=${d=>d.stopPropagation()}>
                  <h2 className="section-title">Add Override</h2>
                  <form onSubmit=${ft}>
                    <div className="form-grid">
                      <div className="form-field full">
                        <label htmlFor="overrideTheme">Theme</label>
                        <select id="overrideTheme" value=${ue.theme_id} onChange=${d=>ye(w=>({...w,theme_id:d.target.value}))} required>
                          ${t.map(d=>S`<option key=${d.id} value=${d.id}>${d.theme_name}</option>`)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideScope">Scope</label>
                        <input id="overrideScope" value=${ue.override_scope} onInput=${d=>ye(w=>({...w,override_scope:d.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideBy">Created By</label>
                        <input id="overrideBy" value=${ue.created_by} onInput=${d=>ye(w=>({...w,created_by:d.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideStart">Start At</label>
                        <input id="overrideStart" type="datetime-local" value=${ue.start_at} onInput=${d=>ye(w=>({...w,start_at:d.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideEnd">End At</label>
                        <input id="overrideEnd" type="datetime-local" value=${ue.end_at} onInput=${d=>ye(w=>({...w,end_at:d.target.value}))} required />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="overrideReason">Reason</label>
                        <textarea id="overrideReason" rows="4" value=${ue.reason} onInput=${d=>ye(w=>({...w,reason:d.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${ue.force_top_priority} onChange=${d=>ye(w=>({...w,force_top_priority:d.target.checked}))} />
                        <span>Force top priority</span>
                      </label>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${g==="save-override"}>
                        ${g==="save-override"?"Saving...":"Save Override"}
                      </button>
                      <button type="button" className="button" onClick=${()=>x(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}
      </section>
    `}function _v(){return S`
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
    `}function Nv(){return S`
      <div className="console-layout">
        <aside className="console-sidebar">
          <p className="brand-overline">eCardFactory</p>
          <h1 className="brand-title">Internal Console</h1>
          <p className="brand-subtitle">Workflow-first operations panel</p>
          <nav className="sidebar-nav" aria-label="Primary">
            <${$l}
              to="/"
              end
              className=${({isActive:e})=>e?"nav-link active":"nav-link"}
            >
              Workflow Console
            <//>
            <${$l}
              to="/themes"
              className=${({isActive:e})=>e?"nav-link active":"nav-link"}
            >
              Theme Factory
            <//>
            <${$l}
              to="/compare"
              className=${({isActive:e})=>e?"nav-link active":"nav-link"}
            >
              Compare Lab
            <//>
          </nav>
        </aside>

        <main className="console-main">
          <${us}>
            <${Gt} path="/" element=${S`<${yv} />`} />
            <${Gt} path="/themes" element=${S`<${wv} />`} />
            <${Gt} path="/compare" element=${S`<${_v} />`} />
            <${Gt} path="/jobs/:jobId" element=${S`<${gv} />`} />
            <${Gt} path="*" element=${S`<${is} to="/" replace=${!0} />`} />
          <//>
        </main>
      </div>
    `}var ps=class extends D.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}componentDidCatch(t){qr(`Frontend render error: ${t?.message||"unknown error"}. See browser console for details.`,t)}render(){return this.state.error?S`
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
      `:this.props.children}};function Sv(){return(0,D.useEffect)(()=>{uv()},[]),null}function Ev(){return S`
      <${wf}>
        <${ps}>
          <${Sv} />
          <${Nv} />
        <//>
      <//>
    `}window.addEventListener("error",e=>{e.error&&qr(`Frontend runtime error: ${e.error.message||"unknown error"}.`,e.error)});window.addEventListener("unhandledrejection",e=>{qr(`Unhandled async error: ${e.reason?.message||String(e.reason||"unknown")}`,e.reason)});var Pf=document.getElementById("root");if(!Pf)qr("Frontend root element (#root) is missing in index.html.");else try{(0,$f.createRoot)(Pf).render(S`<${Ev} />`)}catch(e){qr(`Unable to mount React root: ${e?.message||"unknown mount error"}`,e)}})();
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
