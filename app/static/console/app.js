(()=>{var ip=Object.create;var Fs=Object.defineProperty;var sp=Object.getOwnPropertyDescriptor;var up=Object.getOwnPropertyNames;var cp=Object.getPrototypeOf,dp=Object.prototype.hasOwnProperty;var un=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var fp=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of up(t))!dp.call(e,a)&&a!==n&&Fs(e,a,{get:()=>t[a],enumerable:!(r=sp(t,a))||r.enumerable});return e};var dr=(e,t,n)=>(n=e!=null?ip(cp(e)):{},fp(t||!e||!e.__esModule?Fs(n,"default",{value:e,enumerable:!0}):n,e));var Ws=un(B=>{"use strict";var fr=Symbol.for("react.element"),pp=Symbol.for("react.portal"),mp=Symbol.for("react.fragment"),hp=Symbol.for("react.strict_mode"),vp=Symbol.for("react.profiler"),yp=Symbol.for("react.provider"),gp=Symbol.for("react.context"),_p=Symbol.for("react.forward_ref"),Np=Symbol.for("react.suspense"),wp=Symbol.for("react.memo"),Sp=Symbol.for("react.lazy"),Ls=Symbol.iterator;function Ep(e){return e===null||typeof e!="object"?null:(e=Ls&&e[Ls]||e["@@iterator"],typeof e=="function"?e:null)}var Us={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},As=Object.assign,Is={};function xn(e,t,n){this.props=e,this.context=t,this.refs=Is,this.updater=n||Us}xn.prototype.isReactComponent={};xn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};xn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ms(){}Ms.prototype=xn.prototype;function Xo(e,t,n){this.props=e,this.context=t,this.refs=Is,this.updater=n||Us}var qo=Xo.prototype=new Ms;qo.constructor=Xo;As(qo,xn.prototype);qo.isPureReactComponent=!0;var Os=Array.isArray,zs=Object.prototype.hasOwnProperty,Zo={current:null},Bs={key:!0,ref:!0,__self:!0,__source:!0};function Vs(e,t,n){var r,a={},o=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(o=""+t.key),t)zs.call(t,r)&&!Bs.hasOwnProperty(r)&&(a[r]=t[r]);var i=arguments.length-2;if(i===1)a.children=n;else if(1<i){for(var s=Array(i),u=0;u<i;u++)s[u]=arguments[u+2];a.children=s}if(e&&e.defaultProps)for(r in i=e.defaultProps,i)a[r]===void 0&&(a[r]=i[r]);return{$$typeof:fr,type:e,key:o,ref:l,props:a,_owner:Zo.current}}function kp(e,t){return{$$typeof:fr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function el(e){return typeof e=="object"&&e!==null&&e.$$typeof===fr}function $p(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var js=/\/+/g;function Go(e,t){return typeof e=="object"&&e!==null&&e.key!=null?$p(""+e.key):t.toString(36)}function va(e,t,n,r,a){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(o){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case fr:case pp:l=!0}}if(l)return l=e,a=a(l),e=r===""?"."+Go(l,0):r,Os(a)?(n="",e!=null&&(n=e.replace(js,"$&/")+"/"),va(a,t,n,"",function(u){return u})):a!=null&&(el(a)&&(a=kp(a,n+(!a.key||l&&l.key===a.key?"":(""+a.key).replace(js,"$&/")+"/")+e)),t.push(a)),1;if(l=0,r=r===""?".":r+":",Os(e))for(var i=0;i<e.length;i++){o=e[i];var s=r+Go(o,i);l+=va(o,t,n,s,a)}else if(s=Ep(e),typeof s=="function")for(e=s.call(e),i=0;!(o=e.next()).done;)o=o.value,s=r+Go(o,i++),l+=va(o,t,n,s,a);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function ha(e,t,n){if(e==null)return e;var r=[],a=0;return va(e,r,"","",function(o){return t.call(n,o,a++)}),r}function Rp(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Pe={current:null},ya={transition:null},bp={ReactCurrentDispatcher:Pe,ReactCurrentBatchConfig:ya,ReactCurrentOwner:Zo};function Hs(){throw Error("act(...) is not supported in production builds of React.")}B.Children={map:ha,forEach:function(e,t,n){ha(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ha(e,function(){t++}),t},toArray:function(e){return ha(e,function(t){return t})||[]},only:function(e){if(!el(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};B.Component=xn;B.Fragment=mp;B.Profiler=vp;B.PureComponent=Xo;B.StrictMode=hp;B.Suspense=Np;B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=bp;B.act=Hs;B.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=As({},e.props),a=e.key,o=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,l=Zo.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(s in t)zs.call(t,s)&&!Bs.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&i!==void 0?i[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){i=Array(s);for(var u=0;u<s;u++)i[u]=arguments[u+2];r.children=i}return{$$typeof:fr,type:e.type,key:a,ref:o,props:r,_owner:l}};B.createContext=function(e){return e={$$typeof:gp,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:yp,_context:e},e.Consumer=e};B.createElement=Vs;B.createFactory=function(e){var t=Vs.bind(null,e);return t.type=e,t};B.createRef=function(){return{current:null}};B.forwardRef=function(e){return{$$typeof:_p,render:e}};B.isValidElement=el;B.lazy=function(e){return{$$typeof:Sp,_payload:{_status:-1,_result:e},_init:Rp}};B.memo=function(e,t){return{$$typeof:wp,type:e,compare:t===void 0?null:t}};B.startTransition=function(e){var t=ya.transition;ya.transition={};try{e()}finally{ya.transition=t}};B.unstable_act=Hs;B.useCallback=function(e,t){return Pe.current.useCallback(e,t)};B.useContext=function(e){return Pe.current.useContext(e)};B.useDebugValue=function(){};B.useDeferredValue=function(e){return Pe.current.useDeferredValue(e)};B.useEffect=function(e,t){return Pe.current.useEffect(e,t)};B.useId=function(){return Pe.current.useId()};B.useImperativeHandle=function(e,t,n){return Pe.current.useImperativeHandle(e,t,n)};B.useInsertionEffect=function(e,t){return Pe.current.useInsertionEffect(e,t)};B.useLayoutEffect=function(e,t){return Pe.current.useLayoutEffect(e,t)};B.useMemo=function(e,t){return Pe.current.useMemo(e,t)};B.useReducer=function(e,t,n){return Pe.current.useReducer(e,t,n)};B.useRef=function(e){return Pe.current.useRef(e)};B.useState=function(e){return Pe.current.useState(e)};B.useSyncExternalStore=function(e,t,n){return Pe.current.useSyncExternalStore(e,t,n)};B.useTransition=function(){return Pe.current.useTransition()};B.version="18.3.1"});var pr=un((sy,Ks)=>{"use strict";Ks.exports=Ws()});var nu=un(X=>{"use strict";function al(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<ga(a,t))e[r]=t,e[n]=a,n=r;else break e}}function lt(e){return e.length===0?null:e[0]}function Na(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,a=e.length,o=a>>>1;r<o;){var l=2*(r+1)-1,i=e[l],s=l+1,u=e[s];if(0>ga(i,n))s<a&&0>ga(u,i)?(e[r]=u,e[s]=n,r=s):(e[r]=i,e[l]=n,r=l);else if(s<a&&0>ga(u,n))e[r]=u,e[s]=n,r=s;else break e}}return t}function ga(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Js=performance,X.unstable_now=function(){return Js.now()}):(tl=Date,Qs=tl.now(),X.unstable_now=function(){return tl.now()-Qs});var Js,tl,Qs,gt=[],At=[],Cp=1,qe=null,Ee=3,wa=!1,cn=!1,hr=!1,Xs=typeof setTimeout=="function"?setTimeout:null,qs=typeof clearTimeout=="function"?clearTimeout:null,Ys=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function ol(e){for(var t=lt(At);t!==null;){if(t.callback===null)Na(At);else if(t.startTime<=e)Na(At),t.sortIndex=t.expirationTime,al(gt,t);else break;t=lt(At)}}function ll(e){if(hr=!1,ol(e),!cn)if(lt(gt)!==null)cn=!0,sl(il);else{var t=lt(At);t!==null&&ul(ll,t.startTime-e)}}function il(e,t){cn=!1,hr&&(hr=!1,qs(vr),vr=-1),wa=!0;var n=Ee;try{for(ol(t),qe=lt(gt);qe!==null&&(!(qe.expirationTime>t)||e&&!tu());){var r=qe.callback;if(typeof r=="function"){qe.callback=null,Ee=qe.priorityLevel;var a=r(qe.expirationTime<=t);t=X.unstable_now(),typeof a=="function"?qe.callback=a:qe===lt(gt)&&Na(gt),ol(t)}else Na(gt);qe=lt(gt)}if(qe!==null)var o=!0;else{var l=lt(At);l!==null&&ul(ll,l.startTime-t),o=!1}return o}finally{qe=null,Ee=n,wa=!1}}var Sa=!1,_a=null,vr=-1,Zs=5,eu=-1;function tu(){return!(X.unstable_now()-eu<Zs)}function nl(){if(_a!==null){var e=X.unstable_now();eu=e;var t=!0;try{t=_a(!0,e)}finally{t?mr():(Sa=!1,_a=null)}}else Sa=!1}var mr;typeof Ys=="function"?mr=function(){Ys(nl)}:typeof MessageChannel<"u"?(rl=new MessageChannel,Gs=rl.port2,rl.port1.onmessage=nl,mr=function(){Gs.postMessage(null)}):mr=function(){Xs(nl,0)};var rl,Gs;function sl(e){_a=e,Sa||(Sa=!0,mr())}function ul(e,t){vr=Xs(function(){e(X.unstable_now())},t)}X.unstable_IdlePriority=5;X.unstable_ImmediatePriority=1;X.unstable_LowPriority=4;X.unstable_NormalPriority=3;X.unstable_Profiling=null;X.unstable_UserBlockingPriority=2;X.unstable_cancelCallback=function(e){e.callback=null};X.unstable_continueExecution=function(){cn||wa||(cn=!0,sl(il))};X.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Zs=0<e?Math.floor(1e3/e):5};X.unstable_getCurrentPriorityLevel=function(){return Ee};X.unstable_getFirstCallbackNode=function(){return lt(gt)};X.unstable_next=function(e){switch(Ee){case 1:case 2:case 3:var t=3;break;default:t=Ee}var n=Ee;Ee=t;try{return e()}finally{Ee=n}};X.unstable_pauseExecution=function(){};X.unstable_requestPaint=function(){};X.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=Ee;Ee=e;try{return t()}finally{Ee=n}};X.unstable_scheduleCallback=function(e,t,n){var r=X.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return a=n+a,e={id:Cp++,callback:t,priorityLevel:e,startTime:n,expirationTime:a,sortIndex:-1},n>r?(e.sortIndex=n,al(At,e),lt(gt)===null&&e===lt(At)&&(hr?(qs(vr),vr=-1):hr=!0,ul(ll,n-r))):(e.sortIndex=a,al(gt,e),cn||wa||(cn=!0,sl(il))),e};X.unstable_shouldYield=tu;X.unstable_wrapCallback=function(e){var t=Ee;return function(){var n=Ee;Ee=t;try{return e.apply(this,arguments)}finally{Ee=n}}}});var au=un((cy,ru)=>{"use strict";ru.exports=nu()});var uf=un(Ye=>{"use strict";var xp=pr(),Je=au();function b(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var dc=new Set,Ar={};function En(e,t){Gn(e,t),Gn(e+"Capture",t)}function Gn(e,t){for(Ar[e]=t,e=0;e<t.length;e++)dc.add(t[e])}var Tt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Dl=Object.prototype.hasOwnProperty,Tp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ou={},lu={};function Pp(e){return Dl.call(lu,e)?!0:Dl.call(ou,e)?!1:Tp.test(e)?lu[e]=!0:(ou[e]=!0,!1)}function Dp(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Fp(e,t,n,r){if(t===null||typeof t>"u"||Dp(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Le(e,t,n,r,a,o,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=l}var Ne={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Ne[e]=new Le(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Ne[t]=new Le(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Ne[e]=new Le(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Ne[e]=new Le(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Ne[e]=new Le(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Ne[e]=new Le(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Ne[e]=new Le(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Ne[e]=new Le(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Ne[e]=new Le(e,5,!1,e.toLowerCase(),null,!1,!1)});var ki=/[\-:]([a-z])/g;function $i(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(ki,$i);Ne[t]=new Le(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(ki,$i);Ne[t]=new Le(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(ki,$i);Ne[t]=new Le(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Ne[e]=new Le(e,1,!1,e.toLowerCase(),null,!1,!1)});Ne.xlinkHref=new Le("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Ne[e]=new Le(e,1,!1,e.toLowerCase(),null,!0,!0)});function Ri(e,t,n,r){var a=Ne.hasOwnProperty(t)?Ne[t]:null;(a!==null?a.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Fp(t,n,a,r)&&(n=null),r||a===null?Pp(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(t=a.attributeName,r=a.attributeNamespace,n===null?e.removeAttribute(t):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Lt=xp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ea=Symbol.for("react.element"),Dn=Symbol.for("react.portal"),Fn=Symbol.for("react.fragment"),bi=Symbol.for("react.strict_mode"),Fl=Symbol.for("react.profiler"),fc=Symbol.for("react.provider"),pc=Symbol.for("react.context"),Ci=Symbol.for("react.forward_ref"),Ll=Symbol.for("react.suspense"),Ol=Symbol.for("react.suspense_list"),xi=Symbol.for("react.memo"),Mt=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var mc=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var iu=Symbol.iterator;function yr(e){return e===null||typeof e!="object"?null:(e=iu&&e[iu]||e["@@iterator"],typeof e=="function"?e:null)}var oe=Object.assign,cl;function $r(e){if(cl===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);cl=t&&t[1]||""}return`
`+cl+e}var dl=!1;function fl(e,t){if(!e||dl)return"";dl=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var a=u.stack.split(`
`),o=r.stack.split(`
`),l=a.length-1,i=o.length-1;1<=l&&0<=i&&a[l]!==o[i];)i--;for(;1<=l&&0<=i;l--,i--)if(a[l]!==o[i]){if(l!==1||i!==1)do if(l--,i--,0>i||a[l]!==o[i]){var s=`
`+a[l].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=l&&0<=i);break}}}finally{dl=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?$r(e):""}function Lp(e){switch(e.tag){case 5:return $r(e.type);case 16:return $r("Lazy");case 13:return $r("Suspense");case 19:return $r("SuspenseList");case 0:case 2:case 15:return e=fl(e.type,!1),e;case 11:return e=fl(e.type.render,!1),e;case 1:return e=fl(e.type,!0),e;default:return""}}function jl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Fn:return"Fragment";case Dn:return"Portal";case Fl:return"Profiler";case bi:return"StrictMode";case Ll:return"Suspense";case Ol:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case pc:return(e.displayName||"Context")+".Consumer";case fc:return(e._context.displayName||"Context")+".Provider";case Ci:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case xi:return t=e.displayName||null,t!==null?t:jl(e.type)||"Memo";case Mt:t=e._payload,e=e._init;try{return jl(e(t))}catch{}}return null}function Op(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return jl(t);case 8:return t===bi?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function en(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function hc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function jp(e){var t=hc(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(l){r=""+l,o.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ka(e){e._valueTracker||(e._valueTracker=jp(e))}function vc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=hc(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function qa(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ul(e,t){var n=t.checked;return oe({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function su(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=en(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function yc(e,t){t=t.checked,t!=null&&Ri(e,"checked",t,!1)}function Al(e,t){yc(e,t);var n=en(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Il(e,t.type,n):t.hasOwnProperty("defaultValue")&&Il(e,t.type,en(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function uu(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Il(e,t,n){(t!=="number"||qa(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Rr=Array.isArray;function Hn(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+en(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,r&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function Ml(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(b(91));return oe({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function cu(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(b(92));if(Rr(n)){if(1<n.length)throw Error(b(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:en(n)}}function gc(e,t){var n=en(t.value),r=en(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function du(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function _c(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function zl(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?_c(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var $a,Nc=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,a)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for($a=$a||document.createElement("div"),$a.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=$a.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Ir(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var xr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Up=["Webkit","ms","Moz","O"];Object.keys(xr).forEach(function(e){Up.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),xr[t]=xr[e]})});function wc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||xr.hasOwnProperty(e)&&xr[e]?(""+t).trim():t+"px"}function Sc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,a=wc(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,a):e[n]=a}}var Ap=oe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Bl(e,t){if(t){if(Ap[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(b(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(b(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(b(61))}if(t.style!=null&&typeof t.style!="object")throw Error(b(62))}}function Vl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Hl=null;function Ti(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Wl=null,Wn=null,Kn=null;function fu(e){if(e=ra(e)){if(typeof Wl!="function")throw Error(b(280));var t=e.stateNode;t&&(t=bo(t),Wl(e.stateNode,e.type,t))}}function Ec(e){Wn?Kn?Kn.push(e):Kn=[e]:Wn=e}function kc(){if(Wn){var e=Wn,t=Kn;if(Kn=Wn=null,fu(e),t)for(e=0;e<t.length;e++)fu(t[e])}}function $c(e,t){return e(t)}function Rc(){}var pl=!1;function bc(e,t,n){if(pl)return e(t,n);pl=!0;try{return $c(e,t,n)}finally{pl=!1,(Wn!==null||Kn!==null)&&(Rc(),kc())}}function Mr(e,t){var n=e.stateNode;if(n===null)return null;var r=bo(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(b(231,t,typeof n));return n}var Kl=!1;if(Tt)try{Tn={},Object.defineProperty(Tn,"passive",{get:function(){Kl=!0}}),window.addEventListener("test",Tn,Tn),window.removeEventListener("test",Tn,Tn)}catch{Kl=!1}var Tn;function Ip(e,t,n,r,a,o,l,i,s){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(m){this.onError(m)}}var Tr=!1,Za=null,eo=!1,Jl=null,Mp={onError:function(e){Tr=!0,Za=e}};function zp(e,t,n,r,a,o,l,i,s){Tr=!1,Za=null,Ip.apply(Mp,arguments)}function Bp(e,t,n,r,a,o,l,i,s){if(zp.apply(this,arguments),Tr){if(Tr){var u=Za;Tr=!1,Za=null}else throw Error(b(198));eo||(eo=!0,Jl=u)}}function kn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Cc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function pu(e){if(kn(e)!==e)throw Error(b(188))}function Vp(e){var t=e.alternate;if(!t){if(t=kn(e),t===null)throw Error(b(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var o=a.alternate;if(o===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===n)return pu(a),e;if(o===r)return pu(a),t;o=o.sibling}throw Error(b(188))}if(n.return!==r.return)n=a,r=o;else{for(var l=!1,i=a.child;i;){if(i===n){l=!0,n=a,r=o;break}if(i===r){l=!0,r=a,n=o;break}i=i.sibling}if(!l){for(i=o.child;i;){if(i===n){l=!0,n=o,r=a;break}if(i===r){l=!0,r=o,n=a;break}i=i.sibling}if(!l)throw Error(b(189))}}if(n.alternate!==r)throw Error(b(190))}if(n.tag!==3)throw Error(b(188));return n.stateNode.current===n?e:t}function xc(e){return e=Vp(e),e!==null?Tc(e):null}function Tc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Tc(e);if(t!==null)return t;e=e.sibling}return null}var Pc=Je.unstable_scheduleCallback,mu=Je.unstable_cancelCallback,Hp=Je.unstable_shouldYield,Wp=Je.unstable_requestPaint,ue=Je.unstable_now,Kp=Je.unstable_getCurrentPriorityLevel,Pi=Je.unstable_ImmediatePriority,Dc=Je.unstable_UserBlockingPriority,to=Je.unstable_NormalPriority,Jp=Je.unstable_LowPriority,Fc=Je.unstable_IdlePriority,Eo=null,St=null;function Qp(e){if(St&&typeof St.onCommitFiberRoot=="function")try{St.onCommitFiberRoot(Eo,e,void 0,(e.current.flags&128)===128)}catch{}}var dt=Math.clz32?Math.clz32:Xp,Yp=Math.log,Gp=Math.LN2;function Xp(e){return e>>>=0,e===0?32:31-(Yp(e)/Gp|0)|0}var Ra=64,ba=4194304;function br(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function no(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,a=e.suspendedLanes,o=e.pingedLanes,l=n&268435455;if(l!==0){var i=l&~a;i!==0?r=br(i):(o&=l,o!==0&&(r=br(o)))}else l=n&~a,l!==0?r=br(l):o!==0&&(r=br(o));if(r===0)return 0;if(t!==0&&t!==r&&(t&a)===0&&(a=r&-r,o=t&-t,a>=o||a===16&&(o&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-dt(t),a=1<<n,r|=e[n],t&=~a;return r}function qp(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Zp(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,o=e.pendingLanes;0<o;){var l=31-dt(o),i=1<<l,s=a[l];s===-1?((i&n)===0||(i&r)!==0)&&(a[l]=qp(i,t)):s<=t&&(e.expiredLanes|=i),o&=~i}}function Ql(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Lc(){var e=Ra;return Ra<<=1,(Ra&4194240)===0&&(Ra=64),e}function ml(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ta(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-dt(t),e[t]=n}function em(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-dt(n),o=1<<a;t[a]=0,r[a]=-1,e[a]=-1,n&=~o}}function Di(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-dt(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}var G=0;function Oc(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var jc,Fi,Uc,Ac,Ic,Yl=!1,Ca=[],Kt=null,Jt=null,Qt=null,zr=new Map,Br=new Map,Bt=[],tm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function hu(e,t){switch(e){case"focusin":case"focusout":Kt=null;break;case"dragenter":case"dragleave":Jt=null;break;case"mouseover":case"mouseout":Qt=null;break;case"pointerover":case"pointerout":zr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Br.delete(t.pointerId)}}function gr(e,t,n,r,a,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[a]},t!==null&&(t=ra(t),t!==null&&Fi(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function nm(e,t,n,r,a){switch(t){case"focusin":return Kt=gr(Kt,e,t,n,r,a),!0;case"dragenter":return Jt=gr(Jt,e,t,n,r,a),!0;case"mouseover":return Qt=gr(Qt,e,t,n,r,a),!0;case"pointerover":var o=a.pointerId;return zr.set(o,gr(zr.get(o)||null,e,t,n,r,a)),!0;case"gotpointercapture":return o=a.pointerId,Br.set(o,gr(Br.get(o)||null,e,t,n,r,a)),!0}return!1}function Mc(e){var t=pn(e.target);if(t!==null){var n=kn(t);if(n!==null){if(t=n.tag,t===13){if(t=Cc(n),t!==null){e.blockedOn=t,Ic(e.priority,function(){Uc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ba(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Gl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Hl=r,n.target.dispatchEvent(r),Hl=null}else return t=ra(n),t!==null&&Fi(t),e.blockedOn=n,!1;t.shift()}return!0}function vu(e,t,n){Ba(e)&&n.delete(t)}function rm(){Yl=!1,Kt!==null&&Ba(Kt)&&(Kt=null),Jt!==null&&Ba(Jt)&&(Jt=null),Qt!==null&&Ba(Qt)&&(Qt=null),zr.forEach(vu),Br.forEach(vu)}function _r(e,t){e.blockedOn===t&&(e.blockedOn=null,Yl||(Yl=!0,Je.unstable_scheduleCallback(Je.unstable_NormalPriority,rm)))}function Vr(e){function t(a){return _r(a,e)}if(0<Ca.length){_r(Ca[0],e);for(var n=1;n<Ca.length;n++){var r=Ca[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Kt!==null&&_r(Kt,e),Jt!==null&&_r(Jt,e),Qt!==null&&_r(Qt,e),zr.forEach(t),Br.forEach(t),n=0;n<Bt.length;n++)r=Bt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Bt.length&&(n=Bt[0],n.blockedOn===null);)Mc(n),n.blockedOn===null&&Bt.shift()}var Jn=Lt.ReactCurrentBatchConfig,ro=!0;function am(e,t,n,r){var a=G,o=Jn.transition;Jn.transition=null;try{G=1,Li(e,t,n,r)}finally{G=a,Jn.transition=o}}function om(e,t,n,r){var a=G,o=Jn.transition;Jn.transition=null;try{G=4,Li(e,t,n,r)}finally{G=a,Jn.transition=o}}function Li(e,t,n,r){if(ro){var a=Gl(e,t,n,r);if(a===null)wl(e,t,r,ao,n),hu(e,r);else if(nm(a,e,t,n,r))r.stopPropagation();else if(hu(e,r),t&4&&-1<tm.indexOf(e)){for(;a!==null;){var o=ra(a);if(o!==null&&jc(o),o=Gl(e,t,n,r),o===null&&wl(e,t,r,ao,n),o===a)break;a=o}a!==null&&r.stopPropagation()}else wl(e,t,r,null,n)}}var ao=null;function Gl(e,t,n,r){if(ao=null,e=Ti(r),e=pn(e),e!==null)if(t=kn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Cc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ao=e,null}function zc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Kp()){case Pi:return 1;case Dc:return 4;case to:case Jp:return 16;case Fc:return 536870912;default:return 16}default:return 16}}var Ht=null,Oi=null,Va=null;function Bc(){if(Va)return Va;var e,t=Oi,n=t.length,r,a="value"in Ht?Ht.value:Ht.textContent,o=a.length;for(e=0;e<n&&t[e]===a[e];e++);var l=n-e;for(r=1;r<=l&&t[n-r]===a[o-r];r++);return Va=a.slice(e,1<r?1-r:void 0)}function Ha(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function xa(){return!0}function yu(){return!1}function Qe(e){function t(n,r,a,o,l){this._reactName=n,this._targetInst=a,this.type=r,this.nativeEvent=o,this.target=l,this.currentTarget=null;for(var i in e)e.hasOwnProperty(i)&&(n=e[i],this[i]=n?n(o):o[i]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?xa:yu,this.isPropagationStopped=yu,this}return oe(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=xa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=xa)},persist:function(){},isPersistent:xa}),t}var rr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ji=Qe(rr),na=oe({},rr,{view:0,detail:0}),lm=Qe(na),hl,vl,Nr,ko=oe({},na,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ui,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Nr&&(Nr&&e.type==="mousemove"?(hl=e.screenX-Nr.screenX,vl=e.screenY-Nr.screenY):vl=hl=0,Nr=e),hl)},movementY:function(e){return"movementY"in e?e.movementY:vl}}),gu=Qe(ko),im=oe({},ko,{dataTransfer:0}),sm=Qe(im),um=oe({},na,{relatedTarget:0}),yl=Qe(um),cm=oe({},rr,{animationName:0,elapsedTime:0,pseudoElement:0}),dm=Qe(cm),fm=oe({},rr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),pm=Qe(fm),mm=oe({},rr,{data:0}),_u=Qe(mm),hm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},vm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ym={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=ym[e])?!!t[e]:!1}function Ui(){return gm}var _m=oe({},na,{key:function(e){if(e.key){var t=hm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ha(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?vm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ui,charCode:function(e){return e.type==="keypress"?Ha(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ha(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Nm=Qe(_m),wm=oe({},ko,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Nu=Qe(wm),Sm=oe({},na,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ui}),Em=Qe(Sm),km=oe({},rr,{propertyName:0,elapsedTime:0,pseudoElement:0}),$m=Qe(km),Rm=oe({},ko,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),bm=Qe(Rm),Cm=[9,13,27,32],Ai=Tt&&"CompositionEvent"in window,Pr=null;Tt&&"documentMode"in document&&(Pr=document.documentMode);var xm=Tt&&"TextEvent"in window&&!Pr,Vc=Tt&&(!Ai||Pr&&8<Pr&&11>=Pr),wu=" ",Su=!1;function Hc(e,t){switch(e){case"keyup":return Cm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Wc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ln=!1;function Tm(e,t){switch(e){case"compositionend":return Wc(t);case"keypress":return t.which!==32?null:(Su=!0,wu);case"textInput":return e=t.data,e===wu&&Su?null:e;default:return null}}function Pm(e,t){if(Ln)return e==="compositionend"||!Ai&&Hc(e,t)?(e=Bc(),Va=Oi=Ht=null,Ln=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Vc&&t.locale!=="ko"?null:t.data;default:return null}}var Dm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Eu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Dm[e.type]:t==="textarea"}function Kc(e,t,n,r){Ec(r),t=oo(t,"onChange"),0<t.length&&(n=new ji("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Dr=null,Hr=null;function Fm(e){rd(e,0)}function $o(e){var t=Un(e);if(vc(t))return e}function Lm(e,t){if(e==="change")return t}var Jc=!1;Tt&&(Tt?(Pa="oninput"in document,Pa||(gl=document.createElement("div"),gl.setAttribute("oninput","return;"),Pa=typeof gl.oninput=="function"),Ta=Pa):Ta=!1,Jc=Ta&&(!document.documentMode||9<document.documentMode));var Ta,Pa,gl;function ku(){Dr&&(Dr.detachEvent("onpropertychange",Qc),Hr=Dr=null)}function Qc(e){if(e.propertyName==="value"&&$o(Hr)){var t=[];Kc(t,Hr,e,Ti(e)),bc(Fm,t)}}function Om(e,t,n){e==="focusin"?(ku(),Dr=t,Hr=n,Dr.attachEvent("onpropertychange",Qc)):e==="focusout"&&ku()}function jm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return $o(Hr)}function Um(e,t){if(e==="click")return $o(t)}function Am(e,t){if(e==="input"||e==="change")return $o(t)}function Im(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var pt=typeof Object.is=="function"?Object.is:Im;function Wr(e,t){if(pt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!Dl.call(t,a)||!pt(e[a],t[a]))return!1}return!0}function $u(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ru(e,t){var n=$u(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=$u(n)}}function Yc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Yc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Gc(){for(var e=window,t=qa();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=qa(e.document)}return t}function Ii(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Mm(e){var t=Gc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Yc(n.ownerDocument.documentElement,n)){if(r!==null&&Ii(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,o=Math.min(r.start,a);r=r.end===void 0?o:Math.min(r.end,a),!e.extend&&o>r&&(a=r,r=o,o=a),a=Ru(n,o);var l=Ru(n,r);a&&l&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var zm=Tt&&"documentMode"in document&&11>=document.documentMode,On=null,Xl=null,Fr=null,ql=!1;function bu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ql||On==null||On!==qa(r)||(r=On,"selectionStart"in r&&Ii(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Fr&&Wr(Fr,r)||(Fr=r,r=oo(Xl,"onSelect"),0<r.length&&(t=new ji("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=On)))}function Da(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var jn={animationend:Da("Animation","AnimationEnd"),animationiteration:Da("Animation","AnimationIteration"),animationstart:Da("Animation","AnimationStart"),transitionend:Da("Transition","TransitionEnd")},_l={},Xc={};Tt&&(Xc=document.createElement("div").style,"AnimationEvent"in window||(delete jn.animationend.animation,delete jn.animationiteration.animation,delete jn.animationstart.animation),"TransitionEvent"in window||delete jn.transitionend.transition);function Ro(e){if(_l[e])return _l[e];if(!jn[e])return e;var t=jn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Xc)return _l[e]=t[n];return e}var qc=Ro("animationend"),Zc=Ro("animationiteration"),ed=Ro("animationstart"),td=Ro("transitionend"),nd=new Map,Cu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function nn(e,t){nd.set(e,t),En(t,[e])}for(Fa=0;Fa<Cu.length;Fa++)La=Cu[Fa],xu=La.toLowerCase(),Tu=La[0].toUpperCase()+La.slice(1),nn(xu,"on"+Tu);var La,xu,Tu,Fa;nn(qc,"onAnimationEnd");nn(Zc,"onAnimationIteration");nn(ed,"onAnimationStart");nn("dblclick","onDoubleClick");nn("focusin","onFocus");nn("focusout","onBlur");nn(td,"onTransitionEnd");Gn("onMouseEnter",["mouseout","mouseover"]);Gn("onMouseLeave",["mouseout","mouseover"]);Gn("onPointerEnter",["pointerout","pointerover"]);Gn("onPointerLeave",["pointerout","pointerover"]);En("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));En("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));En("onBeforeInput",["compositionend","keypress","textInput","paste"]);En("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));En("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));En("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Cr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Bm=new Set("cancel close invalid load scroll toggle".split(" ").concat(Cr));function Pu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Bp(r,t,void 0,e),e.currentTarget=null}function rd(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var l=r.length-1;0<=l;l--){var i=r[l],s=i.instance,u=i.currentTarget;if(i=i.listener,s!==o&&a.isPropagationStopped())break e;Pu(a,i,u),o=s}else for(l=0;l<r.length;l++){if(i=r[l],s=i.instance,u=i.currentTarget,i=i.listener,s!==o&&a.isPropagationStopped())break e;Pu(a,i,u),o=s}}}if(eo)throw e=Jl,eo=!1,Jl=null,e}function Z(e,t){var n=t[ri];n===void 0&&(n=t[ri]=new Set);var r=e+"__bubble";n.has(r)||(ad(t,e,2,!1),n.add(r))}function Nl(e,t,n){var r=0;t&&(r|=4),ad(n,e,r,t)}var Oa="_reactListening"+Math.random().toString(36).slice(2);function Kr(e){if(!e[Oa]){e[Oa]=!0,dc.forEach(function(n){n!=="selectionchange"&&(Bm.has(n)||Nl(n,!1,e),Nl(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Oa]||(t[Oa]=!0,Nl("selectionchange",!1,t))}}function ad(e,t,n,r){switch(zc(t)){case 1:var a=am;break;case 4:a=om;break;default:a=Li}n=a.bind(null,t,n,e),a=void 0,!Kl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),r?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function wl(e,t,n,r,a){var o=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var i=r.stateNode.containerInfo;if(i===a||i.nodeType===8&&i.parentNode===a)break;if(l===4)for(l=r.return;l!==null;){var s=l.tag;if((s===3||s===4)&&(s=l.stateNode.containerInfo,s===a||s.nodeType===8&&s.parentNode===a))return;l=l.return}for(;i!==null;){if(l=pn(i),l===null)return;if(s=l.tag,s===5||s===6){r=o=l;continue e}i=i.parentNode}}r=r.return}bc(function(){var u=o,m=Ti(n),h=[];e:{var v=nd.get(e);if(v!==void 0){var E=ji,k=e;switch(e){case"keypress":if(Ha(n)===0)break e;case"keydown":case"keyup":E=Nm;break;case"focusin":k="focus",E=yl;break;case"focusout":k="blur",E=yl;break;case"beforeblur":case"afterblur":E=yl;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":E=gu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":E=sm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":E=Em;break;case qc:case Zc:case ed:E=dm;break;case td:E=$m;break;case"scroll":E=lm;break;case"wheel":E=bm;break;case"copy":case"cut":case"paste":E=pm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":E=Nu}var w=(t&4)!==0,g=!w&&e==="scroll",d=w?v!==null?v+"Capture":null:v;w=[];for(var c=u,f;c!==null;){f=c;var _=f.stateNode;if(f.tag===5&&_!==null&&(f=_,d!==null&&(_=Mr(c,d),_!=null&&w.push(Jr(c,_,f)))),g)break;c=c.return}0<w.length&&(v=new E(v,k,null,n,m),h.push({event:v,listeners:w}))}}if((t&7)===0){e:{if(v=e==="mouseover"||e==="pointerover",E=e==="mouseout"||e==="pointerout",v&&n!==Hl&&(k=n.relatedTarget||n.fromElement)&&(pn(k)||k[Pt]))break e;if((E||v)&&(v=m.window===m?m:(v=m.ownerDocument)?v.defaultView||v.parentWindow:window,E?(k=n.relatedTarget||n.toElement,E=u,k=k?pn(k):null,k!==null&&(g=kn(k),k!==g||k.tag!==5&&k.tag!==6)&&(k=null)):(E=null,k=u),E!==k)){if(w=gu,_="onMouseLeave",d="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(w=Nu,_="onPointerLeave",d="onPointerEnter",c="pointer"),g=E==null?v:Un(E),f=k==null?v:Un(k),v=new w(_,c+"leave",E,n,m),v.target=g,v.relatedTarget=f,_=null,pn(m)===u&&(w=new w(d,c+"enter",k,n,m),w.target=f,w.relatedTarget=g,_=w),g=_,E&&k)t:{for(w=E,d=k,c=0,f=w;f;f=Pn(f))c++;for(f=0,_=d;_;_=Pn(_))f++;for(;0<c-f;)w=Pn(w),c--;for(;0<f-c;)d=Pn(d),f--;for(;c--;){if(w===d||d!==null&&w===d.alternate)break t;w=Pn(w),d=Pn(d)}w=null}else w=null;E!==null&&Du(h,v,E,w,!1),k!==null&&g!==null&&Du(h,g,k,w,!0)}}e:{if(v=u?Un(u):window,E=v.nodeName&&v.nodeName.toLowerCase(),E==="select"||E==="input"&&v.type==="file")var T=Lm;else if(Eu(v))if(Jc)T=Am;else{T=jm;var x=Om}else(E=v.nodeName)&&E.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(T=Um);if(T&&(T=T(e,u))){Kc(h,T,n,m);break e}x&&x(e,v,u),e==="focusout"&&(x=v._wrapperState)&&x.controlled&&v.type==="number"&&Il(v,"number",v.value)}switch(x=u?Un(u):window,e){case"focusin":(Eu(x)||x.contentEditable==="true")&&(On=x,Xl=u,Fr=null);break;case"focusout":Fr=Xl=On=null;break;case"mousedown":ql=!0;break;case"contextmenu":case"mouseup":case"dragend":ql=!1,bu(h,n,m);break;case"selectionchange":if(zm)break;case"keydown":case"keyup":bu(h,n,m)}var L;if(Ai)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else Ln?Hc(e,n)&&(P="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(Vc&&n.locale!=="ko"&&(Ln||P!=="onCompositionStart"?P==="onCompositionEnd"&&Ln&&(L=Bc()):(Ht=m,Oi="value"in Ht?Ht.value:Ht.textContent,Ln=!0)),x=oo(u,P),0<x.length&&(P=new _u(P,e,null,n,m),h.push({event:P,listeners:x}),L?P.data=L:(L=Wc(n),L!==null&&(P.data=L)))),(L=xm?Tm(e,n):Pm(e,n))&&(u=oo(u,"onBeforeInput"),0<u.length&&(m=new _u("onBeforeInput","beforeinput",null,n,m),h.push({event:m,listeners:u}),m.data=L))}rd(h,t)})}function Jr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function oo(e,t){for(var n=t+"Capture",r=[];e!==null;){var a=e,o=a.stateNode;a.tag===5&&o!==null&&(a=o,o=Mr(e,n),o!=null&&r.unshift(Jr(e,o,a)),o=Mr(e,t),o!=null&&r.push(Jr(e,o,a))),e=e.return}return r}function Pn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Du(e,t,n,r,a){for(var o=t._reactName,l=[];n!==null&&n!==r;){var i=n,s=i.alternate,u=i.stateNode;if(s!==null&&s===r)break;i.tag===5&&u!==null&&(i=u,a?(s=Mr(n,o),s!=null&&l.unshift(Jr(n,s,i))):a||(s=Mr(n,o),s!=null&&l.push(Jr(n,s,i)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var Vm=/\r\n?/g,Hm=/\u0000|\uFFFD/g;function Fu(e){return(typeof e=="string"?e:""+e).replace(Vm,`
`).replace(Hm,"")}function ja(e,t,n){if(t=Fu(t),Fu(e)!==t&&n)throw Error(b(425))}function lo(){}var Zl=null,ei=null;function ti(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ni=typeof setTimeout=="function"?setTimeout:void 0,Wm=typeof clearTimeout=="function"?clearTimeout:void 0,Lu=typeof Promise=="function"?Promise:void 0,Km=typeof queueMicrotask=="function"?queueMicrotask:typeof Lu<"u"?function(e){return Lu.resolve(null).then(e).catch(Jm)}:ni;function Jm(e){setTimeout(function(){throw e})}function Sl(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(r===0){e.removeChild(a),Vr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=a}while(n);Vr(t)}function Yt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ou(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var ar=Math.random().toString(36).slice(2),wt="__reactFiber$"+ar,Qr="__reactProps$"+ar,Pt="__reactContainer$"+ar,ri="__reactEvents$"+ar,Qm="__reactListeners$"+ar,Ym="__reactHandles$"+ar;function pn(e){var t=e[wt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Pt]||n[wt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ou(e);e!==null;){if(n=e[wt])return n;e=Ou(e)}return t}e=n,n=e.parentNode}return null}function ra(e){return e=e[wt]||e[Pt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Un(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(b(33))}function bo(e){return e[Qr]||null}var ai=[],An=-1;function rn(e){return{current:e}}function ee(e){0>An||(e.current=ai[An],ai[An]=null,An--)}function q(e,t){An++,ai[An]=e.current,e.current=t}var tn={},be=rn(tn),Me=rn(!1),gn=tn;function Xn(e,t){var n=e.type.contextTypes;if(!n)return tn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a={},o;for(o in n)a[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function ze(e){return e=e.childContextTypes,e!=null}function io(){ee(Me),ee(be)}function ju(e,t,n){if(be.current!==tn)throw Error(b(168));q(be,t),q(Me,n)}function od(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var a in r)if(!(a in t))throw Error(b(108,Op(e)||"Unknown",a));return oe({},n,r)}function so(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||tn,gn=be.current,q(be,e),q(Me,Me.current),!0}function Uu(e,t,n){var r=e.stateNode;if(!r)throw Error(b(169));n?(e=od(e,t,gn),r.__reactInternalMemoizedMergedChildContext=e,ee(Me),ee(be),q(be,e)):ee(Me),q(Me,n)}var Rt=null,Co=!1,El=!1;function ld(e){Rt===null?Rt=[e]:Rt.push(e)}function Gm(e){Co=!0,ld(e)}function an(){if(!El&&Rt!==null){El=!0;var e=0,t=G;try{var n=Rt;for(G=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Rt=null,Co=!1}catch(a){throw Rt!==null&&(Rt=Rt.slice(e+1)),Pc(Pi,an),a}finally{G=t,El=!1}}return null}var In=[],Mn=0,uo=null,co=0,Ze=[],et=0,_n=null,bt=1,Ct="";function dn(e,t){In[Mn++]=co,In[Mn++]=uo,uo=e,co=t}function id(e,t,n){Ze[et++]=bt,Ze[et++]=Ct,Ze[et++]=_n,_n=e;var r=bt;e=Ct;var a=32-dt(r)-1;r&=~(1<<a),n+=1;var o=32-dt(t)+a;if(30<o){var l=a-a%5;o=(r&(1<<l)-1).toString(32),r>>=l,a-=l,bt=1<<32-dt(t)+a|n<<a|r,Ct=o+e}else bt=1<<o|n<<a|r,Ct=e}function Mi(e){e.return!==null&&(dn(e,1),id(e,1,0))}function zi(e){for(;e===uo;)uo=In[--Mn],In[Mn]=null,co=In[--Mn],In[Mn]=null;for(;e===_n;)_n=Ze[--et],Ze[et]=null,Ct=Ze[--et],Ze[et]=null,bt=Ze[--et],Ze[et]=null}var Ke=null,We=null,ne=!1,ct=null;function sd(e,t){var n=tt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Au(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ke=e,We=Yt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ke=e,We=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=_n!==null?{id:bt,overflow:Ct}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=tt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ke=e,We=null,!0):!1;default:return!1}}function oi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function li(e){if(ne){var t=We;if(t){var n=t;if(!Au(e,t)){if(oi(e))throw Error(b(418));t=Yt(n.nextSibling);var r=Ke;t&&Au(e,t)?sd(r,n):(e.flags=e.flags&-4097|2,ne=!1,Ke=e)}}else{if(oi(e))throw Error(b(418));e.flags=e.flags&-4097|2,ne=!1,Ke=e}}}function Iu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ke=e}function Ua(e){if(e!==Ke)return!1;if(!ne)return Iu(e),ne=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!ti(e.type,e.memoizedProps)),t&&(t=We)){if(oi(e))throw ud(),Error(b(418));for(;t;)sd(e,t),t=Yt(t.nextSibling)}if(Iu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(b(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){We=Yt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}We=null}}else We=Ke?Yt(e.stateNode.nextSibling):null;return!0}function ud(){for(var e=We;e;)e=Yt(e.nextSibling)}function qn(){We=Ke=null,ne=!1}function Bi(e){ct===null?ct=[e]:ct.push(e)}var Xm=Lt.ReactCurrentBatchConfig;function wr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(b(309));var r=n.stateNode}if(!r)throw Error(b(147,e));var a=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(l){var i=a.refs;l===null?delete i[o]:i[o]=l},t._stringRef=o,t)}if(typeof e!="string")throw Error(b(284));if(!n._owner)throw Error(b(290,e))}return e}function Aa(e,t){throw e=Object.prototype.toString.call(t),Error(b(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Mu(e){var t=e._init;return t(e._payload)}function cd(e){function t(d,c){if(e){var f=d.deletions;f===null?(d.deletions=[c],d.flags|=16):f.push(c)}}function n(d,c){if(!e)return null;for(;c!==null;)t(d,c),c=c.sibling;return null}function r(d,c){for(d=new Map;c!==null;)c.key!==null?d.set(c.key,c):d.set(c.index,c),c=c.sibling;return d}function a(d,c){return d=Zt(d,c),d.index=0,d.sibling=null,d}function o(d,c,f){return d.index=f,e?(f=d.alternate,f!==null?(f=f.index,f<c?(d.flags|=2,c):f):(d.flags|=2,c)):(d.flags|=1048576,c)}function l(d){return e&&d.alternate===null&&(d.flags|=2),d}function i(d,c,f,_){return c===null||c.tag!==6?(c=Tl(f,d.mode,_),c.return=d,c):(c=a(c,f),c.return=d,c)}function s(d,c,f,_){var T=f.type;return T===Fn?m(d,c,f.props.children,_,f.key):c!==null&&(c.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Mt&&Mu(T)===c.type)?(_=a(c,f.props),_.ref=wr(d,c,f),_.return=d,_):(_=Xa(f.type,f.key,f.props,null,d.mode,_),_.ref=wr(d,c,f),_.return=d,_)}function u(d,c,f,_){return c===null||c.tag!==4||c.stateNode.containerInfo!==f.containerInfo||c.stateNode.implementation!==f.implementation?(c=Pl(f,d.mode,_),c.return=d,c):(c=a(c,f.children||[]),c.return=d,c)}function m(d,c,f,_,T){return c===null||c.tag!==7?(c=yn(f,d.mode,_,T),c.return=d,c):(c=a(c,f),c.return=d,c)}function h(d,c,f){if(typeof c=="string"&&c!==""||typeof c=="number")return c=Tl(""+c,d.mode,f),c.return=d,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case Ea:return f=Xa(c.type,c.key,c.props,null,d.mode,f),f.ref=wr(d,null,c),f.return=d,f;case Dn:return c=Pl(c,d.mode,f),c.return=d,c;case Mt:var _=c._init;return h(d,_(c._payload),f)}if(Rr(c)||yr(c))return c=yn(c,d.mode,f,null),c.return=d,c;Aa(d,c)}return null}function v(d,c,f,_){var T=c!==null?c.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return T!==null?null:i(d,c,""+f,_);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Ea:return f.key===T?s(d,c,f,_):null;case Dn:return f.key===T?u(d,c,f,_):null;case Mt:return T=f._init,v(d,c,T(f._payload),_)}if(Rr(f)||yr(f))return T!==null?null:m(d,c,f,_,null);Aa(d,f)}return null}function E(d,c,f,_,T){if(typeof _=="string"&&_!==""||typeof _=="number")return d=d.get(f)||null,i(c,d,""+_,T);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Ea:return d=d.get(_.key===null?f:_.key)||null,s(c,d,_,T);case Dn:return d=d.get(_.key===null?f:_.key)||null,u(c,d,_,T);case Mt:var x=_._init;return E(d,c,f,x(_._payload),T)}if(Rr(_)||yr(_))return d=d.get(f)||null,m(c,d,_,T,null);Aa(c,_)}return null}function k(d,c,f,_){for(var T=null,x=null,L=c,P=c=0,I=null;L!==null&&P<f.length;P++){L.index>P?(I=L,L=null):I=L.sibling;var A=v(d,L,f[P],_);if(A===null){L===null&&(L=I);break}e&&L&&A.alternate===null&&t(d,L),c=o(A,c,P),x===null?T=A:x.sibling=A,x=A,L=I}if(P===f.length)return n(d,L),ne&&dn(d,P),T;if(L===null){for(;P<f.length;P++)L=h(d,f[P],_),L!==null&&(c=o(L,c,P),x===null?T=L:x.sibling=L,x=L);return ne&&dn(d,P),T}for(L=r(d,L);P<f.length;P++)I=E(L,d,P,f[P],_),I!==null&&(e&&I.alternate!==null&&L.delete(I.key===null?P:I.key),c=o(I,c,P),x===null?T=I:x.sibling=I,x=I);return e&&L.forEach(function(z){return t(d,z)}),ne&&dn(d,P),T}function w(d,c,f,_){var T=yr(f);if(typeof T!="function")throw Error(b(150));if(f=T.call(f),f==null)throw Error(b(151));for(var x=T=null,L=c,P=c=0,I=null,A=f.next();L!==null&&!A.done;P++,A=f.next()){L.index>P?(I=L,L=null):I=L.sibling;var z=v(d,L,A.value,_);if(z===null){L===null&&(L=I);break}e&&L&&z.alternate===null&&t(d,L),c=o(z,c,P),x===null?T=z:x.sibling=z,x=z,L=I}if(A.done)return n(d,L),ne&&dn(d,P),T;if(L===null){for(;!A.done;P++,A=f.next())A=h(d,A.value,_),A!==null&&(c=o(A,c,P),x===null?T=A:x.sibling=A,x=A);return ne&&dn(d,P),T}for(L=r(d,L);!A.done;P++,A=f.next())A=E(L,d,P,A.value,_),A!==null&&(e&&A.alternate!==null&&L.delete(A.key===null?P:A.key),c=o(A,c,P),x===null?T=A:x.sibling=A,x=A);return e&&L.forEach(function(je){return t(d,je)}),ne&&dn(d,P),T}function g(d,c,f,_){if(typeof f=="object"&&f!==null&&f.type===Fn&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case Ea:e:{for(var T=f.key,x=c;x!==null;){if(x.key===T){if(T=f.type,T===Fn){if(x.tag===7){n(d,x.sibling),c=a(x,f.props.children),c.return=d,d=c;break e}}else if(x.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===Mt&&Mu(T)===x.type){n(d,x.sibling),c=a(x,f.props),c.ref=wr(d,x,f),c.return=d,d=c;break e}n(d,x);break}else t(d,x);x=x.sibling}f.type===Fn?(c=yn(f.props.children,d.mode,_,f.key),c.return=d,d=c):(_=Xa(f.type,f.key,f.props,null,d.mode,_),_.ref=wr(d,c,f),_.return=d,d=_)}return l(d);case Dn:e:{for(x=f.key;c!==null;){if(c.key===x)if(c.tag===4&&c.stateNode.containerInfo===f.containerInfo&&c.stateNode.implementation===f.implementation){n(d,c.sibling),c=a(c,f.children||[]),c.return=d,d=c;break e}else{n(d,c);break}else t(d,c);c=c.sibling}c=Pl(f,d.mode,_),c.return=d,d=c}return l(d);case Mt:return x=f._init,g(d,c,x(f._payload),_)}if(Rr(f))return k(d,c,f,_);if(yr(f))return w(d,c,f,_);Aa(d,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,c!==null&&c.tag===6?(n(d,c.sibling),c=a(c,f),c.return=d,d=c):(n(d,c),c=Tl(f,d.mode,_),c.return=d,d=c),l(d)):n(d,c)}return g}var Zn=cd(!0),dd=cd(!1),fo=rn(null),po=null,zn=null,Vi=null;function Hi(){Vi=zn=po=null}function Wi(e){var t=fo.current;ee(fo),e._currentValue=t}function ii(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Qn(e,t){po=e,Vi=zn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Ie=!0),e.firstContext=null)}function rt(e){var t=e._currentValue;if(Vi!==e)if(e={context:e,memoizedValue:t,next:null},zn===null){if(po===null)throw Error(b(308));zn=e,po.dependencies={lanes:0,firstContext:e}}else zn=zn.next=e;return t}var mn=null;function Ki(e){mn===null?mn=[e]:mn.push(e)}function fd(e,t,n,r){var a=t.interleaved;return a===null?(n.next=n,Ki(t)):(n.next=a.next,a.next=n),t.interleaved=n,Dt(e,r)}function Dt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var zt=!1;function Ji(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function pd(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function xt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Gt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(W&2)!==0){var a=r.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),r.pending=t,Dt(e,n)}return a=r.interleaved,a===null?(t.next=t,Ki(r)):(t.next=a.next,a.next=t),r.interleaved=t,Dt(e,n)}function Wa(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Di(e,n)}}function zu(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var a=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?a=o=l:o=o.next=l,n=n.next}while(n!==null);o===null?a=o=t:o=o.next=t}else a=o=t;n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function mo(e,t,n,r){var a=e.updateQueue;zt=!1;var o=a.firstBaseUpdate,l=a.lastBaseUpdate,i=a.shared.pending;if(i!==null){a.shared.pending=null;var s=i,u=s.next;s.next=null,l===null?o=u:l.next=u,l=s;var m=e.alternate;m!==null&&(m=m.updateQueue,i=m.lastBaseUpdate,i!==l&&(i===null?m.firstBaseUpdate=u:i.next=u,m.lastBaseUpdate=s))}if(o!==null){var h=a.baseState;l=0,m=u=s=null,i=o;do{var v=i.lane,E=i.eventTime;if((r&v)===v){m!==null&&(m=m.next={eventTime:E,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null});e:{var k=e,w=i;switch(v=t,E=n,w.tag){case 1:if(k=w.payload,typeof k=="function"){h=k.call(E,h,v);break e}h=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=w.payload,v=typeof k=="function"?k.call(E,h,v):k,v==null)break e;h=oe({},h,v);break e;case 2:zt=!0}}i.callback!==null&&i.lane!==0&&(e.flags|=64,v=a.effects,v===null?a.effects=[i]:v.push(i))}else E={eventTime:E,lane:v,tag:i.tag,payload:i.payload,callback:i.callback,next:null},m===null?(u=m=E,s=h):m=m.next=E,l|=v;if(i=i.next,i===null){if(i=a.shared.pending,i===null)break;v=i,i=v.next,v.next=null,a.lastBaseUpdate=v,a.shared.pending=null}}while(!0);if(m===null&&(s=h),a.baseState=s,a.firstBaseUpdate=u,a.lastBaseUpdate=m,t=a.shared.interleaved,t!==null){a=t;do l|=a.lane,a=a.next;while(a!==t)}else o===null&&(a.shared.lanes=0);wn|=l,e.lanes=l,e.memoizedState=h}}function Bu(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(a!==null){if(r.callback=null,r=n,typeof a!="function")throw Error(b(191,a));a.call(r)}}}var aa={},Et=rn(aa),Yr=rn(aa),Gr=rn(aa);function hn(e){if(e===aa)throw Error(b(174));return e}function Qi(e,t){switch(q(Gr,t),q(Yr,e),q(Et,aa),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:zl(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=zl(t,e)}ee(Et),q(Et,t)}function er(){ee(Et),ee(Yr),ee(Gr)}function md(e){hn(Gr.current);var t=hn(Et.current),n=zl(t,e.type);t!==n&&(q(Yr,e),q(Et,n))}function Yi(e){Yr.current===e&&(ee(Et),ee(Yr))}var re=rn(0);function ho(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var kl=[];function Gi(){for(var e=0;e<kl.length;e++)kl[e]._workInProgressVersionPrimary=null;kl.length=0}var Ka=Lt.ReactCurrentDispatcher,$l=Lt.ReactCurrentBatchConfig,Nn=0,ae=null,me=null,ve=null,vo=!1,Lr=!1,Xr=0,qm=0;function ke(){throw Error(b(321))}function Xi(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!pt(e[n],t[n]))return!1;return!0}function qi(e,t,n,r,a,o){if(Nn=o,ae=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ka.current=e===null||e.memoizedState===null?nh:rh,e=n(r,a),Lr){o=0;do{if(Lr=!1,Xr=0,25<=o)throw Error(b(301));o+=1,ve=me=null,t.updateQueue=null,Ka.current=ah,e=n(r,a)}while(Lr)}if(Ka.current=yo,t=me!==null&&me.next!==null,Nn=0,ve=me=ae=null,vo=!1,t)throw Error(b(300));return e}function Zi(){var e=Xr!==0;return Xr=0,e}function Nt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ve===null?ae.memoizedState=ve=e:ve=ve.next=e,ve}function at(){if(me===null){var e=ae.alternate;e=e!==null?e.memoizedState:null}else e=me.next;var t=ve===null?ae.memoizedState:ve.next;if(t!==null)ve=t,me=e;else{if(e===null)throw Error(b(310));me=e,e={memoizedState:me.memoizedState,baseState:me.baseState,baseQueue:me.baseQueue,queue:me.queue,next:null},ve===null?ae.memoizedState=ve=e:ve=ve.next=e}return ve}function qr(e,t){return typeof t=="function"?t(e):t}function Rl(e){var t=at(),n=t.queue;if(n===null)throw Error(b(311));n.lastRenderedReducer=e;var r=me,a=r.baseQueue,o=n.pending;if(o!==null){if(a!==null){var l=a.next;a.next=o.next,o.next=l}r.baseQueue=a=o,n.pending=null}if(a!==null){o=a.next,r=r.baseState;var i=l=null,s=null,u=o;do{var m=u.lane;if((Nn&m)===m)s!==null&&(s=s.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var h={lane:m,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};s===null?(i=s=h,l=r):s=s.next=h,ae.lanes|=m,wn|=m}u=u.next}while(u!==null&&u!==o);s===null?l=r:s.next=i,pt(r,t.memoizedState)||(Ie=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){a=e;do o=a.lane,ae.lanes|=o,wn|=o,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function bl(e){var t=at(),n=t.queue;if(n===null)throw Error(b(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var l=a=a.next;do o=e(o,l.action),l=l.next;while(l!==a);pt(o,t.memoizedState)||(Ie=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function hd(){}function vd(e,t){var n=ae,r=at(),a=t(),o=!pt(r.memoizedState,a);if(o&&(r.memoizedState=a,Ie=!0),r=r.queue,es(_d.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||ve!==null&&ve.memoizedState.tag&1){if(n.flags|=2048,Zr(9,gd.bind(null,n,r,a,t),void 0,null),ye===null)throw Error(b(349));(Nn&30)!==0||yd(n,t,a)}return a}function yd(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ae.updateQueue,t===null?(t={lastEffect:null,stores:null},ae.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function gd(e,t,n,r){t.value=n,t.getSnapshot=r,Nd(t)&&wd(e)}function _d(e,t,n){return n(function(){Nd(t)&&wd(e)})}function Nd(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!pt(e,n)}catch{return!0}}function wd(e){var t=Dt(e,1);t!==null&&ft(t,e,1,-1)}function Vu(e){var t=Nt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:qr,lastRenderedState:e},t.queue=e,e=e.dispatch=th.bind(null,ae,e),[t.memoizedState,e]}function Zr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ae.updateQueue,t===null?(t={lastEffect:null,stores:null},ae.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Sd(){return at().memoizedState}function Ja(e,t,n,r){var a=Nt();ae.flags|=e,a.memoizedState=Zr(1|t,n,void 0,r===void 0?null:r)}function xo(e,t,n,r){var a=at();r=r===void 0?null:r;var o=void 0;if(me!==null){var l=me.memoizedState;if(o=l.destroy,r!==null&&Xi(r,l.deps)){a.memoizedState=Zr(t,n,o,r);return}}ae.flags|=e,a.memoizedState=Zr(1|t,n,o,r)}function Hu(e,t){return Ja(8390656,8,e,t)}function es(e,t){return xo(2048,8,e,t)}function Ed(e,t){return xo(4,2,e,t)}function kd(e,t){return xo(4,4,e,t)}function $d(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Rd(e,t,n){return n=n!=null?n.concat([e]):null,xo(4,4,$d.bind(null,t,e),n)}function ts(){}function bd(e,t){var n=at();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Xi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Cd(e,t){var n=at();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Xi(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function xd(e,t,n){return(Nn&21)===0?(e.baseState&&(e.baseState=!1,Ie=!0),e.memoizedState=n):(pt(n,t)||(n=Lc(),ae.lanes|=n,wn|=n,e.baseState=!0),t)}function Zm(e,t){var n=G;G=n!==0&&4>n?n:4,e(!0);var r=$l.transition;$l.transition={};try{e(!1),t()}finally{G=n,$l.transition=r}}function Td(){return at().memoizedState}function eh(e,t,n){var r=qt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Pd(e))Dd(t,n);else if(n=fd(e,t,n,r),n!==null){var a=Fe();ft(n,e,r,a),Fd(n,t,r)}}function th(e,t,n){var r=qt(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Pd(e))Dd(t,a);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var l=t.lastRenderedState,i=o(l,n);if(a.hasEagerState=!0,a.eagerState=i,pt(i,l)){var s=t.interleaved;s===null?(a.next=a,Ki(t)):(a.next=s.next,s.next=a),t.interleaved=a;return}}catch{}finally{}n=fd(e,t,a,r),n!==null&&(a=Fe(),ft(n,e,r,a),Fd(n,t,r))}}function Pd(e){var t=e.alternate;return e===ae||t!==null&&t===ae}function Dd(e,t){Lr=vo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Fd(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Di(e,n)}}var yo={readContext:rt,useCallback:ke,useContext:ke,useEffect:ke,useImperativeHandle:ke,useInsertionEffect:ke,useLayoutEffect:ke,useMemo:ke,useReducer:ke,useRef:ke,useState:ke,useDebugValue:ke,useDeferredValue:ke,useTransition:ke,useMutableSource:ke,useSyncExternalStore:ke,useId:ke,unstable_isNewReconciler:!1},nh={readContext:rt,useCallback:function(e,t){return Nt().memoizedState=[e,t===void 0?null:t],e},useContext:rt,useEffect:Hu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Ja(4194308,4,$d.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ja(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ja(4,2,e,t)},useMemo:function(e,t){var n=Nt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Nt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=eh.bind(null,ae,e),[r.memoizedState,e]},useRef:function(e){var t=Nt();return e={current:e},t.memoizedState=e},useState:Vu,useDebugValue:ts,useDeferredValue:function(e){return Nt().memoizedState=e},useTransition:function(){var e=Vu(!1),t=e[0];return e=Zm.bind(null,e[1]),Nt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ae,a=Nt();if(ne){if(n===void 0)throw Error(b(407));n=n()}else{if(n=t(),ye===null)throw Error(b(349));(Nn&30)!==0||yd(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Hu(_d.bind(null,r,o,e),[e]),r.flags|=2048,Zr(9,gd.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=Nt(),t=ye.identifierPrefix;if(ne){var n=Ct,r=bt;n=(r&~(1<<32-dt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Xr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=qm++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},rh={readContext:rt,useCallback:bd,useContext:rt,useEffect:es,useImperativeHandle:Rd,useInsertionEffect:Ed,useLayoutEffect:kd,useMemo:Cd,useReducer:Rl,useRef:Sd,useState:function(){return Rl(qr)},useDebugValue:ts,useDeferredValue:function(e){var t=at();return xd(t,me.memoizedState,e)},useTransition:function(){var e=Rl(qr)[0],t=at().memoizedState;return[e,t]},useMutableSource:hd,useSyncExternalStore:vd,useId:Td,unstable_isNewReconciler:!1},ah={readContext:rt,useCallback:bd,useContext:rt,useEffect:es,useImperativeHandle:Rd,useInsertionEffect:Ed,useLayoutEffect:kd,useMemo:Cd,useReducer:bl,useRef:Sd,useState:function(){return bl(qr)},useDebugValue:ts,useDeferredValue:function(e){var t=at();return me===null?t.memoizedState=e:xd(t,me.memoizedState,e)},useTransition:function(){var e=bl(qr)[0],t=at().memoizedState;return[e,t]},useMutableSource:hd,useSyncExternalStore:vd,useId:Td,unstable_isNewReconciler:!1};function st(e,t){if(e&&e.defaultProps){t=oe({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function si(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:oe({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var To={isMounted:function(e){return(e=e._reactInternals)?kn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Fe(),a=qt(e),o=xt(r,a);o.payload=t,n!=null&&(o.callback=n),t=Gt(e,o,a),t!==null&&(ft(t,e,a,r),Wa(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Fe(),a=qt(e),o=xt(r,a);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Gt(e,o,a),t!==null&&(ft(t,e,a,r),Wa(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Fe(),r=qt(e),a=xt(n,r);a.tag=2,t!=null&&(a.callback=t),t=Gt(e,a,r),t!==null&&(ft(t,e,r,n),Wa(t,e,r))}};function Wu(e,t,n,r,a,o,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,l):t.prototype&&t.prototype.isPureReactComponent?!Wr(n,r)||!Wr(a,o):!0}function Ld(e,t,n){var r=!1,a=tn,o=t.contextType;return typeof o=="object"&&o!==null?o=rt(o):(a=ze(t)?gn:be.current,r=t.contextTypes,o=(r=r!=null)?Xn(e,a):tn),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=To,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=o),t}function Ku(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&To.enqueueReplaceState(t,t.state,null)}function ui(e,t,n,r){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},Ji(e);var o=t.contextType;typeof o=="object"&&o!==null?a.context=rt(o):(o=ze(t)?gn:be.current,a.context=Xn(e,o)),a.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(si(e,t,o,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&To.enqueueReplaceState(a,a.state,null),mo(e,n,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function tr(e,t){try{var n="",r=t;do n+=Lp(r),r=r.return;while(r);var a=n}catch(o){a=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:a,digest:null}}function Cl(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ci(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var oh=typeof WeakMap=="function"?WeakMap:Map;function Od(e,t,n){n=xt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){_o||(_o=!0,Ni=r),ci(e,t)},n}function jd(e,t,n){n=xt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var a=t.value;n.payload=function(){return r(a)},n.callback=function(){ci(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){ci(e,t),typeof r!="function"&&(Xt===null?Xt=new Set([this]):Xt.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function Ju(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new oh;var a=new Set;r.set(t,a)}else a=r.get(t),a===void 0&&(a=new Set,r.set(t,a));a.has(n)||(a.add(n),e=_h.bind(null,e,t,n),t.then(e,e))}function Qu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Yu(e,t,n,r,a){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=xt(-1,1),t.tag=2,Gt(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=a,e)}var lh=Lt.ReactCurrentOwner,Ie=!1;function De(e,t,n,r){t.child=e===null?dd(t,null,n,r):Zn(t,e.child,n,r)}function Gu(e,t,n,r,a){n=n.render;var o=t.ref;return Qn(t,a),r=qi(e,t,n,r,o,a),n=Zi(),e!==null&&!Ie?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Ft(e,t,a)):(ne&&n&&Mi(t),t.flags|=1,De(e,t,r,a),t.child)}function Xu(e,t,n,r,a){if(e===null){var o=n.type;return typeof o=="function"&&!us(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Ud(e,t,o,r,a)):(e=Xa(n.type,null,r,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,(e.lanes&a)===0){var l=o.memoizedProps;if(n=n.compare,n=n!==null?n:Wr,n(l,r)&&e.ref===t.ref)return Ft(e,t,a)}return t.flags|=1,e=Zt(o,r),e.ref=t.ref,e.return=t,t.child=e}function Ud(e,t,n,r,a){if(e!==null){var o=e.memoizedProps;if(Wr(o,r)&&e.ref===t.ref)if(Ie=!1,t.pendingProps=r=o,(e.lanes&a)!==0)(e.flags&131072)!==0&&(Ie=!0);else return t.lanes=e.lanes,Ft(e,t,a)}return di(e,t,n,r,a)}function Ad(e,t,n){var r=t.pendingProps,a=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},q(Vn,He),He|=n;else{if((n&1073741824)===0)return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,q(Vn,He),He|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,q(Vn,He),He|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,q(Vn,He),He|=r;return De(e,t,a,n),t.child}function Id(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function di(e,t,n,r,a){var o=ze(n)?gn:be.current;return o=Xn(t,o),Qn(t,a),n=qi(e,t,n,r,o,a),r=Zi(),e!==null&&!Ie?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Ft(e,t,a)):(ne&&r&&Mi(t),t.flags|=1,De(e,t,n,a),t.child)}function qu(e,t,n,r,a){if(ze(n)){var o=!0;so(t)}else o=!1;if(Qn(t,a),t.stateNode===null)Qa(e,t),Ld(t,n,r),ui(t,n,r,a),r=!0;else if(e===null){var l=t.stateNode,i=t.memoizedProps;l.props=i;var s=l.context,u=n.contextType;typeof u=="object"&&u!==null?u=rt(u):(u=ze(n)?gn:be.current,u=Xn(t,u));var m=n.getDerivedStateFromProps,h=typeof m=="function"||typeof l.getSnapshotBeforeUpdate=="function";h||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==r||s!==u)&&Ku(t,l,r,u),zt=!1;var v=t.memoizedState;l.state=v,mo(t,r,l,a),s=t.memoizedState,i!==r||v!==s||Me.current||zt?(typeof m=="function"&&(si(t,n,m,r),s=t.memoizedState),(i=zt||Wu(t,n,i,r,v,s,u))?(h||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),l.props=r,l.state=s,l.context=u,r=i):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,pd(e,t),i=t.memoizedProps,u=t.type===t.elementType?i:st(t.type,i),l.props=u,h=t.pendingProps,v=l.context,s=n.contextType,typeof s=="object"&&s!==null?s=rt(s):(s=ze(n)?gn:be.current,s=Xn(t,s));var E=n.getDerivedStateFromProps;(m=typeof E=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==h||v!==s)&&Ku(t,l,r,s),zt=!1,v=t.memoizedState,l.state=v,mo(t,r,l,a);var k=t.memoizedState;i!==h||v!==k||Me.current||zt?(typeof E=="function"&&(si(t,n,E,r),k=t.memoizedState),(u=zt||Wu(t,n,u,r,v,k,s)||!1)?(m||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,k,s),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,k,s)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=k),l.props=r,l.state=k,l.context=s,r=u):(typeof l.componentDidUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),r=!1)}return fi(e,t,n,r,o,a)}function fi(e,t,n,r,a,o){Id(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return a&&Uu(t,n,!1),Ft(e,t,o);r=t.stateNode,lh.current=t;var i=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=Zn(t,e.child,null,o),t.child=Zn(t,null,i,o)):De(e,t,i,o),t.memoizedState=r.state,a&&Uu(t,n,!0),t.child}function Md(e){var t=e.stateNode;t.pendingContext?ju(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ju(e,t.context,!1),Qi(e,t.containerInfo)}function Zu(e,t,n,r,a){return qn(),Bi(a),t.flags|=256,De(e,t,n,r),t.child}var pi={dehydrated:null,treeContext:null,retryLane:0};function mi(e){return{baseLanes:e,cachePool:null,transitions:null}}function zd(e,t,n){var r=t.pendingProps,a=re.current,o=!1,l=(t.flags&128)!==0,i;if((i=l)||(i=e!==null&&e.memoizedState===null?!1:(a&2)!==0),i?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),q(re,a&1),e===null)return li(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(l=r.children,e=r.fallback,o?(r=t.mode,o=t.child,l={mode:"hidden",children:l},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=l):o=Fo(l,r,0,null),e=yn(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=mi(n),t.memoizedState=pi,e):ns(t,l));if(a=e.memoizedState,a!==null&&(i=a.dehydrated,i!==null))return ih(e,t,l,r,i,a,n);if(o){o=r.fallback,l=t.mode,a=e.child,i=a.sibling;var s={mode:"hidden",children:r.children};return(l&1)===0&&t.child!==a?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=Zt(a,s),r.subtreeFlags=a.subtreeFlags&14680064),i!==null?o=Zt(i,o):(o=yn(o,l,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,l=e.child.memoizedState,l=l===null?mi(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},o.memoizedState=l,o.childLanes=e.childLanes&~n,t.memoizedState=pi,r}return o=e.child,e=o.sibling,r=Zt(o,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function ns(e,t){return t=Fo({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ia(e,t,n,r){return r!==null&&Bi(r),Zn(t,e.child,null,n),e=ns(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function ih(e,t,n,r,a,o,l){if(n)return t.flags&256?(t.flags&=-257,r=Cl(Error(b(422))),Ia(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,a=t.mode,r=Fo({mode:"visible",children:r.children},a,0,null),o=yn(o,a,l,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,(t.mode&1)!==0&&Zn(t,e.child,null,l),t.child.memoizedState=mi(l),t.memoizedState=pi,o);if((t.mode&1)===0)return Ia(e,t,l,null);if(a.data==="$!"){if(r=a.nextSibling&&a.nextSibling.dataset,r)var i=r.dgst;return r=i,o=Error(b(419)),r=Cl(o,r,void 0),Ia(e,t,l,r)}if(i=(l&e.childLanes)!==0,Ie||i){if(r=ye,r!==null){switch(l&-l){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(r.suspendedLanes|l))!==0?0:a,a!==0&&a!==o.retryLane&&(o.retryLane=a,Dt(e,a),ft(r,e,a,-1))}return ss(),r=Cl(Error(b(421))),Ia(e,t,l,r)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Nh.bind(null,e),a._reactRetry=t,null):(e=o.treeContext,We=Yt(a.nextSibling),Ke=t,ne=!0,ct=null,e!==null&&(Ze[et++]=bt,Ze[et++]=Ct,Ze[et++]=_n,bt=e.id,Ct=e.overflow,_n=t),t=ns(t,r.children),t.flags|=4096,t)}function ec(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ii(e.return,t,n)}function xl(e,t,n,r,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=a)}function Bd(e,t,n){var r=t.pendingProps,a=r.revealOrder,o=r.tail;if(De(e,t,r.children,n),r=re.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ec(e,n,t);else if(e.tag===19)ec(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(q(re,r),(t.mode&1)===0)t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&ho(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),xl(t,!1,a,n,o);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&ho(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}xl(t,!0,n,null,o);break;case"together":xl(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Qa(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Ft(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),wn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(b(153));if(t.child!==null){for(e=t.child,n=Zt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Zt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function sh(e,t,n){switch(t.tag){case 3:Md(t),qn();break;case 5:md(t);break;case 1:ze(t.type)&&so(t);break;case 4:Qi(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,a=t.memoizedProps.value;q(fo,r._currentValue),r._currentValue=a;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(q(re,re.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?zd(e,t,n):(q(re,re.current&1),e=Ft(e,t,n),e!==null?e.sibling:null);q(re,re.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Bd(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),q(re,re.current),r)break;return null;case 22:case 23:return t.lanes=0,Ad(e,t,n)}return Ft(e,t,n)}var Vd,hi,Hd,Wd;Vd=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};hi=function(){};Hd=function(e,t,n,r){var a=e.memoizedProps;if(a!==r){e=t.stateNode,hn(Et.current);var o=null;switch(n){case"input":a=Ul(e,a),r=Ul(e,r),o=[];break;case"select":a=oe({},a,{value:void 0}),r=oe({},r,{value:void 0}),o=[];break;case"textarea":a=Ml(e,a),r=Ml(e,r),o=[];break;default:typeof a.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=lo)}Bl(n,r);var l;n=null;for(u in a)if(!r.hasOwnProperty(u)&&a.hasOwnProperty(u)&&a[u]!=null)if(u==="style"){var i=a[u];for(l in i)i.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Ar.hasOwnProperty(u)?o||(o=[]):(o=o||[]).push(u,null));for(u in r){var s=r[u];if(i=a?.[u],r.hasOwnProperty(u)&&s!==i&&(s!=null||i!=null))if(u==="style")if(i){for(l in i)!i.hasOwnProperty(l)||s&&s.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in s)s.hasOwnProperty(l)&&i[l]!==s[l]&&(n||(n={}),n[l]=s[l])}else n||(o||(o=[]),o.push(u,n)),n=s;else u==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,i=i?i.__html:void 0,s!=null&&i!==s&&(o=o||[]).push(u,s)):u==="children"?typeof s!="string"&&typeof s!="number"||(o=o||[]).push(u,""+s):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Ar.hasOwnProperty(u)?(s!=null&&u==="onScroll"&&Z("scroll",e),o||i===s||(o=[])):(o=o||[]).push(u,s))}n&&(o=o||[]).push("style",n);var u=o;(t.updateQueue=u)&&(t.flags|=4)}};Wd=function(e,t,n,r){n!==r&&(t.flags|=4)};function Sr(e,t){if(!ne)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function $e(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags&14680064,r|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function uh(e,t,n){var r=t.pendingProps;switch(zi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return $e(t),null;case 1:return ze(t.type)&&io(),$e(t),null;case 3:return r=t.stateNode,er(),ee(Me),ee(be),Gi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Ua(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,ct!==null&&(Ei(ct),ct=null))),hi(e,t),$e(t),null;case 5:Yi(t);var a=hn(Gr.current);if(n=t.type,e!==null&&t.stateNode!=null)Hd(e,t,n,r,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(b(166));return $e(t),null}if(e=hn(Et.current),Ua(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[wt]=t,r[Qr]=o,e=(t.mode&1)!==0,n){case"dialog":Z("cancel",r),Z("close",r);break;case"iframe":case"object":case"embed":Z("load",r);break;case"video":case"audio":for(a=0;a<Cr.length;a++)Z(Cr[a],r);break;case"source":Z("error",r);break;case"img":case"image":case"link":Z("error",r),Z("load",r);break;case"details":Z("toggle",r);break;case"input":su(r,o),Z("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},Z("invalid",r);break;case"textarea":cu(r,o),Z("invalid",r)}Bl(n,o),a=null;for(var l in o)if(o.hasOwnProperty(l)){var i=o[l];l==="children"?typeof i=="string"?r.textContent!==i&&(o.suppressHydrationWarning!==!0&&ja(r.textContent,i,e),a=["children",i]):typeof i=="number"&&r.textContent!==""+i&&(o.suppressHydrationWarning!==!0&&ja(r.textContent,i,e),a=["children",""+i]):Ar.hasOwnProperty(l)&&i!=null&&l==="onScroll"&&Z("scroll",r)}switch(n){case"input":ka(r),uu(r,o,!0);break;case"textarea":ka(r),du(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=lo)}r=a,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=_c(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),n==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[wt]=t,e[Qr]=r,Vd(e,t,!1,!1),t.stateNode=e;e:{switch(l=Vl(n,r),n){case"dialog":Z("cancel",e),Z("close",e),a=r;break;case"iframe":case"object":case"embed":Z("load",e),a=r;break;case"video":case"audio":for(a=0;a<Cr.length;a++)Z(Cr[a],e);a=r;break;case"source":Z("error",e),a=r;break;case"img":case"image":case"link":Z("error",e),Z("load",e),a=r;break;case"details":Z("toggle",e),a=r;break;case"input":su(e,r),a=Ul(e,r),Z("invalid",e);break;case"option":a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=oe({},r,{value:void 0}),Z("invalid",e);break;case"textarea":cu(e,r),a=Ml(e,r),Z("invalid",e);break;default:a=r}Bl(n,a),i=a;for(o in i)if(i.hasOwnProperty(o)){var s=i[o];o==="style"?Sc(e,s):o==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&Nc(e,s)):o==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&Ir(e,s):typeof s=="number"&&Ir(e,""+s):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Ar.hasOwnProperty(o)?s!=null&&o==="onScroll"&&Z("scroll",e):s!=null&&Ri(e,o,s,l))}switch(n){case"input":ka(e),uu(e,r,!1);break;case"textarea":ka(e),du(e);break;case"option":r.value!=null&&e.setAttribute("value",""+en(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?Hn(e,!!r.multiple,o,!1):r.defaultValue!=null&&Hn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=lo)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return $e(t),null;case 6:if(e&&t.stateNode!=null)Wd(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(b(166));if(n=hn(Gr.current),hn(Et.current),Ua(t)){if(r=t.stateNode,n=t.memoizedProps,r[wt]=t,(o=r.nodeValue!==n)&&(e=Ke,e!==null))switch(e.tag){case 3:ja(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ja(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[wt]=t,t.stateNode=r}return $e(t),null;case 13:if(ee(re),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ne&&We!==null&&(t.mode&1)!==0&&(t.flags&128)===0)ud(),qn(),t.flags|=98560,o=!1;else if(o=Ua(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(b(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(b(317));o[wt]=t}else qn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;$e(t),o=!1}else ct!==null&&(Ei(ct),ct=null),o=!0;if(!o)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(re.current&1)!==0?he===0&&(he=3):ss())),t.updateQueue!==null&&(t.flags|=4),$e(t),null);case 4:return er(),hi(e,t),e===null&&Kr(t.stateNode.containerInfo),$e(t),null;case 10:return Wi(t.type._context),$e(t),null;case 17:return ze(t.type)&&io(),$e(t),null;case 19:if(ee(re),o=t.memoizedState,o===null)return $e(t),null;if(r=(t.flags&128)!==0,l=o.rendering,l===null)if(r)Sr(o,!1);else{if(he!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(l=ho(e),l!==null){for(t.flags|=128,Sr(o,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,l=o.alternate,l===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=l.childLanes,o.lanes=l.lanes,o.child=l.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=l.memoizedProps,o.memoizedState=l.memoizedState,o.updateQueue=l.updateQueue,o.type=l.type,e=l.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return q(re,re.current&1|2),t.child}e=e.sibling}o.tail!==null&&ue()>nr&&(t.flags|=128,r=!0,Sr(o,!1),t.lanes=4194304)}else{if(!r)if(e=ho(l),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Sr(o,!0),o.tail===null&&o.tailMode==="hidden"&&!l.alternate&&!ne)return $e(t),null}else 2*ue()-o.renderingStartTime>nr&&n!==1073741824&&(t.flags|=128,r=!0,Sr(o,!1),t.lanes=4194304);o.isBackwards?(l.sibling=t.child,t.child=l):(n=o.last,n!==null?n.sibling=l:t.child=l,o.last=l)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=ue(),t.sibling=null,n=re.current,q(re,r?n&1|2:n&1),t):($e(t),null);case 22:case 23:return is(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(He&1073741824)!==0&&($e(t),t.subtreeFlags&6&&(t.flags|=8192)):$e(t),null;case 24:return null;case 25:return null}throw Error(b(156,t.tag))}function ch(e,t){switch(zi(t),t.tag){case 1:return ze(t.type)&&io(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return er(),ee(Me),ee(be),Gi(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Yi(t),null;case 13:if(ee(re),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(b(340));qn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ee(re),null;case 4:return er(),null;case 10:return Wi(t.type._context),null;case 22:case 23:return is(),null;case 24:return null;default:return null}}var Ma=!1,Re=!1,dh=typeof WeakSet=="function"?WeakSet:Set,F=null;function Bn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){le(e,t,r)}else n.current=null}function vi(e,t,n){try{n()}catch(r){le(e,t,r)}}var tc=!1;function fh(e,t){if(Zl=ro,e=Gc(),Ii(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var l=0,i=-1,s=-1,u=0,m=0,h=e,v=null;t:for(;;){for(var E;h!==n||a!==0&&h.nodeType!==3||(i=l+a),h!==o||r!==0&&h.nodeType!==3||(s=l+r),h.nodeType===3&&(l+=h.nodeValue.length),(E=h.firstChild)!==null;)v=h,h=E;for(;;){if(h===e)break t;if(v===n&&++u===a&&(i=l),v===o&&++m===r&&(s=l),(E=h.nextSibling)!==null)break;h=v,v=h.parentNode}h=E}n=i===-1||s===-1?null:{start:i,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(ei={focusedElem:e,selectionRange:n},ro=!1,F=t;F!==null;)if(t=F,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,F=e;else for(;F!==null;){t=F;try{var k=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var w=k.memoizedProps,g=k.memoizedState,d=t.stateNode,c=d.getSnapshotBeforeUpdate(t.elementType===t.type?w:st(t.type,w),g);d.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(b(163))}}catch(_){le(t,t.return,_)}if(e=t.sibling,e!==null){e.return=t.return,F=e;break}F=t.return}return k=tc,tc=!1,k}function Or(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var o=a.destroy;a.destroy=void 0,o!==void 0&&vi(t,n,o)}a=a.next}while(a!==r)}}function Po(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function yi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Kd(e){var t=e.alternate;t!==null&&(e.alternate=null,Kd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[wt],delete t[Qr],delete t[ri],delete t[Qm],delete t[Ym])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Jd(e){return e.tag===5||e.tag===3||e.tag===4}function nc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Jd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function gi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=lo));else if(r!==4&&(e=e.child,e!==null))for(gi(e,t,n),e=e.sibling;e!==null;)gi(e,t,n),e=e.sibling}function _i(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(_i(e,t,n),e=e.sibling;e!==null;)_i(e,t,n),e=e.sibling}var ge=null,ut=!1;function It(e,t,n){for(n=n.child;n!==null;)Qd(e,t,n),n=n.sibling}function Qd(e,t,n){if(St&&typeof St.onCommitFiberUnmount=="function")try{St.onCommitFiberUnmount(Eo,n)}catch{}switch(n.tag){case 5:Re||Bn(n,t);case 6:var r=ge,a=ut;ge=null,It(e,t,n),ge=r,ut=a,ge!==null&&(ut?(e=ge,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ge.removeChild(n.stateNode));break;case 18:ge!==null&&(ut?(e=ge,n=n.stateNode,e.nodeType===8?Sl(e.parentNode,n):e.nodeType===1&&Sl(e,n),Vr(e)):Sl(ge,n.stateNode));break;case 4:r=ge,a=ut,ge=n.stateNode.containerInfo,ut=!0,It(e,t,n),ge=r,ut=a;break;case 0:case 11:case 14:case 15:if(!Re&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){a=r=r.next;do{var o=a,l=o.destroy;o=o.tag,l!==void 0&&((o&2)!==0||(o&4)!==0)&&vi(n,t,l),a=a.next}while(a!==r)}It(e,t,n);break;case 1:if(!Re&&(Bn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(i){le(n,t,i)}It(e,t,n);break;case 21:It(e,t,n);break;case 22:n.mode&1?(Re=(r=Re)||n.memoizedState!==null,It(e,t,n),Re=r):It(e,t,n);break;default:It(e,t,n)}}function rc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new dh),t.forEach(function(r){var a=wh.bind(null,e,r);n.has(r)||(n.add(r),r.then(a,a))})}}function it(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r];try{var o=e,l=t,i=l;e:for(;i!==null;){switch(i.tag){case 5:ge=i.stateNode,ut=!1;break e;case 3:ge=i.stateNode.containerInfo,ut=!0;break e;case 4:ge=i.stateNode.containerInfo,ut=!0;break e}i=i.return}if(ge===null)throw Error(b(160));Qd(o,l,a),ge=null,ut=!1;var s=a.alternate;s!==null&&(s.return=null),a.return=null}catch(u){le(a,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Yd(t,e),t=t.sibling}function Yd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(it(t,e),_t(e),r&4){try{Or(3,e,e.return),Po(3,e)}catch(w){le(e,e.return,w)}try{Or(5,e,e.return)}catch(w){le(e,e.return,w)}}break;case 1:it(t,e),_t(e),r&512&&n!==null&&Bn(n,n.return);break;case 5:if(it(t,e),_t(e),r&512&&n!==null&&Bn(n,n.return),e.flags&32){var a=e.stateNode;try{Ir(a,"")}catch(w){le(e,e.return,w)}}if(r&4&&(a=e.stateNode,a!=null)){var o=e.memoizedProps,l=n!==null?n.memoizedProps:o,i=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{i==="input"&&o.type==="radio"&&o.name!=null&&yc(a,o),Vl(i,l);var u=Vl(i,o);for(l=0;l<s.length;l+=2){var m=s[l],h=s[l+1];m==="style"?Sc(a,h):m==="dangerouslySetInnerHTML"?Nc(a,h):m==="children"?Ir(a,h):Ri(a,m,h,u)}switch(i){case"input":Al(a,o);break;case"textarea":gc(a,o);break;case"select":var v=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!o.multiple;var E=o.value;E!=null?Hn(a,!!o.multiple,E,!1):v!==!!o.multiple&&(o.defaultValue!=null?Hn(a,!!o.multiple,o.defaultValue,!0):Hn(a,!!o.multiple,o.multiple?[]:"",!1))}a[Qr]=o}catch(w){le(e,e.return,w)}}break;case 6:if(it(t,e),_t(e),r&4){if(e.stateNode===null)throw Error(b(162));a=e.stateNode,o=e.memoizedProps;try{a.nodeValue=o}catch(w){le(e,e.return,w)}}break;case 3:if(it(t,e),_t(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Vr(t.containerInfo)}catch(w){le(e,e.return,w)}break;case 4:it(t,e),_t(e);break;case 13:it(t,e),_t(e),a=e.child,a.flags&8192&&(o=a.memoizedState!==null,a.stateNode.isHidden=o,!o||a.alternate!==null&&a.alternate.memoizedState!==null||(os=ue())),r&4&&rc(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(Re=(u=Re)||m,it(t,e),Re=u):it(t,e),_t(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!m&&(e.mode&1)!==0)for(F=e,m=e.child;m!==null;){for(h=F=m;F!==null;){switch(v=F,E=v.child,v.tag){case 0:case 11:case 14:case 15:Or(4,v,v.return);break;case 1:Bn(v,v.return);var k=v.stateNode;if(typeof k.componentWillUnmount=="function"){r=v,n=v.return;try{t=r,k.props=t.memoizedProps,k.state=t.memoizedState,k.componentWillUnmount()}catch(w){le(r,n,w)}}break;case 5:Bn(v,v.return);break;case 22:if(v.memoizedState!==null){oc(h);continue}}E!==null?(E.return=v,F=E):oc(h)}m=m.sibling}e:for(m=null,h=e;;){if(h.tag===5){if(m===null){m=h;try{a=h.stateNode,u?(o=a.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(i=h.stateNode,s=h.memoizedProps.style,l=s!=null&&s.hasOwnProperty("display")?s.display:null,i.style.display=wc("display",l))}catch(w){le(e,e.return,w)}}}else if(h.tag===6){if(m===null)try{h.stateNode.nodeValue=u?"":h.memoizedProps}catch(w){le(e,e.return,w)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;m===h&&(m=null),h=h.return}m===h&&(m=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:it(t,e),_t(e),r&4&&rc(e);break;case 21:break;default:it(t,e),_t(e)}}function _t(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Jd(n)){var r=n;break e}n=n.return}throw Error(b(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&(Ir(a,""),r.flags&=-33);var o=nc(e);_i(e,o,a);break;case 3:case 4:var l=r.stateNode.containerInfo,i=nc(e);gi(e,i,l);break;default:throw Error(b(161))}}catch(s){le(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ph(e,t,n){F=e,Gd(e,t,n)}function Gd(e,t,n){for(var r=(e.mode&1)!==0;F!==null;){var a=F,o=a.child;if(a.tag===22&&r){var l=a.memoizedState!==null||Ma;if(!l){var i=a.alternate,s=i!==null&&i.memoizedState!==null||Re;i=Ma;var u=Re;if(Ma=l,(Re=s)&&!u)for(F=a;F!==null;)l=F,s=l.child,l.tag===22&&l.memoizedState!==null?lc(a):s!==null?(s.return=l,F=s):lc(a);for(;o!==null;)F=o,Gd(o,t,n),o=o.sibling;F=a,Ma=i,Re=u}ac(e,t,n)}else(a.subtreeFlags&8772)!==0&&o!==null?(o.return=a,F=o):ac(e,t,n)}}function ac(e){for(;F!==null;){var t=F;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Re||Po(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Re)if(n===null)r.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:st(t.type,n.memoizedProps);r.componentDidUpdate(a,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Bu(t,o,r);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Bu(t,l,n)}break;case 5:var i=t.stateNode;if(n===null&&t.flags&4){n=i;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var m=u.memoizedState;if(m!==null){var h=m.dehydrated;h!==null&&Vr(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(b(163))}Re||t.flags&512&&yi(t)}catch(v){le(t,t.return,v)}}if(t===e){F=null;break}if(n=t.sibling,n!==null){n.return=t.return,F=n;break}F=t.return}}function oc(e){for(;F!==null;){var t=F;if(t===e){F=null;break}var n=t.sibling;if(n!==null){n.return=t.return,F=n;break}F=t.return}}function lc(e){for(;F!==null;){var t=F;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Po(4,t)}catch(s){le(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var a=t.return;try{r.componentDidMount()}catch(s){le(t,a,s)}}var o=t.return;try{yi(t)}catch(s){le(t,o,s)}break;case 5:var l=t.return;try{yi(t)}catch(s){le(t,l,s)}}}catch(s){le(t,t.return,s)}if(t===e){F=null;break}var i=t.sibling;if(i!==null){i.return=t.return,F=i;break}F=t.return}}var mh=Math.ceil,go=Lt.ReactCurrentDispatcher,rs=Lt.ReactCurrentOwner,nt=Lt.ReactCurrentBatchConfig,W=0,ye=null,de=null,_e=0,He=0,Vn=rn(0),he=0,ea=null,wn=0,Do=0,as=0,jr=null,Ae=null,os=0,nr=1/0,$t=null,_o=!1,Ni=null,Xt=null,za=!1,Wt=null,No=0,Ur=0,wi=null,Ya=-1,Ga=0;function Fe(){return(W&6)!==0?ue():Ya!==-1?Ya:Ya=ue()}function qt(e){return(e.mode&1)===0?1:(W&2)!==0&&_e!==0?_e&-_e:Xm.transition!==null?(Ga===0&&(Ga=Lc()),Ga):(e=G,e!==0||(e=window.event,e=e===void 0?16:zc(e.type)),e)}function ft(e,t,n,r){if(50<Ur)throw Ur=0,wi=null,Error(b(185));ta(e,n,r),((W&2)===0||e!==ye)&&(e===ye&&((W&2)===0&&(Do|=n),he===4&&Vt(e,_e)),Be(e,r),n===1&&W===0&&(t.mode&1)===0&&(nr=ue()+500,Co&&an()))}function Be(e,t){var n=e.callbackNode;Zp(e,t);var r=no(e,e===ye?_e:0);if(r===0)n!==null&&mu(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&mu(n),t===1)e.tag===0?Gm(ic.bind(null,e)):ld(ic.bind(null,e)),Km(function(){(W&6)===0&&an()}),n=null;else{switch(Oc(r)){case 1:n=Pi;break;case 4:n=Dc;break;case 16:n=to;break;case 536870912:n=Fc;break;default:n=to}n=af(n,Xd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Xd(e,t){if(Ya=-1,Ga=0,(W&6)!==0)throw Error(b(327));var n=e.callbackNode;if(Yn()&&e.callbackNode!==n)return null;var r=no(e,e===ye?_e:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=wo(e,r);else{t=r;var a=W;W|=2;var o=Zd();(ye!==e||_e!==t)&&($t=null,nr=ue()+500,vn(e,t));do try{yh();break}catch(i){qd(e,i)}while(!0);Hi(),go.current=o,W=a,de!==null?t=0:(ye=null,_e=0,t=he)}if(t!==0){if(t===2&&(a=Ql(e),a!==0&&(r=a,t=Si(e,a))),t===1)throw n=ea,vn(e,0),Vt(e,r),Be(e,ue()),n;if(t===6)Vt(e,r);else{if(a=e.current.alternate,(r&30)===0&&!hh(a)&&(t=wo(e,r),t===2&&(o=Ql(e),o!==0&&(r=o,t=Si(e,o))),t===1))throw n=ea,vn(e,0),Vt(e,r),Be(e,ue()),n;switch(e.finishedWork=a,e.finishedLanes=r,t){case 0:case 1:throw Error(b(345));case 2:fn(e,Ae,$t);break;case 3:if(Vt(e,r),(r&130023424)===r&&(t=os+500-ue(),10<t)){if(no(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){Fe(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=ni(fn.bind(null,e,Ae,$t),t);break}fn(e,Ae,$t);break;case 4:if(Vt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,a=-1;0<r;){var l=31-dt(r);o=1<<l,l=t[l],l>a&&(a=l),r&=~o}if(r=a,r=ue()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*mh(r/1960))-r,10<r){e.timeoutHandle=ni(fn.bind(null,e,Ae,$t),r);break}fn(e,Ae,$t);break;case 5:fn(e,Ae,$t);break;default:throw Error(b(329))}}}return Be(e,ue()),e.callbackNode===n?Xd.bind(null,e):null}function Si(e,t){var n=jr;return e.current.memoizedState.isDehydrated&&(vn(e,t).flags|=256),e=wo(e,t),e!==2&&(t=Ae,Ae=n,t!==null&&Ei(t)),e}function Ei(e){Ae===null?Ae=e:Ae.push.apply(Ae,e)}function hh(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var a=n[r],o=a.getSnapshot;a=a.value;try{if(!pt(o(),a))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Vt(e,t){for(t&=~as,t&=~Do,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-dt(t),r=1<<n;e[n]=-1,t&=~r}}function ic(e){if((W&6)!==0)throw Error(b(327));Yn();var t=no(e,0);if((t&1)===0)return Be(e,ue()),null;var n=wo(e,t);if(e.tag!==0&&n===2){var r=Ql(e);r!==0&&(t=r,n=Si(e,r))}if(n===1)throw n=ea,vn(e,0),Vt(e,t),Be(e,ue()),n;if(n===6)throw Error(b(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,fn(e,Ae,$t),Be(e,ue()),null}function ls(e,t){var n=W;W|=1;try{return e(t)}finally{W=n,W===0&&(nr=ue()+500,Co&&an())}}function Sn(e){Wt!==null&&Wt.tag===0&&(W&6)===0&&Yn();var t=W;W|=1;var n=nt.transition,r=G;try{if(nt.transition=null,G=1,e)return e()}finally{G=r,nt.transition=n,W=t,(W&6)===0&&an()}}function is(){He=Vn.current,ee(Vn)}function vn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Wm(n)),de!==null)for(n=de.return;n!==null;){var r=n;switch(zi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&io();break;case 3:er(),ee(Me),ee(be),Gi();break;case 5:Yi(r);break;case 4:er();break;case 13:ee(re);break;case 19:ee(re);break;case 10:Wi(r.type._context);break;case 22:case 23:is()}n=n.return}if(ye=e,de=e=Zt(e.current,null),_e=He=t,he=0,ea=null,as=Do=wn=0,Ae=jr=null,mn!==null){for(t=0;t<mn.length;t++)if(n=mn[t],r=n.interleaved,r!==null){n.interleaved=null;var a=r.next,o=n.pending;if(o!==null){var l=o.next;o.next=a,r.next=l}n.pending=r}mn=null}return e}function qd(e,t){do{var n=de;try{if(Hi(),Ka.current=yo,vo){for(var r=ae.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}vo=!1}if(Nn=0,ve=me=ae=null,Lr=!1,Xr=0,rs.current=null,n===null||n.return===null){he=1,ea=t,de=null;break}e:{var o=e,l=n.return,i=n,s=t;if(t=_e,i.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var u=s,m=i,h=m.tag;if((m.mode&1)===0&&(h===0||h===11||h===15)){var v=m.alternate;v?(m.updateQueue=v.updateQueue,m.memoizedState=v.memoizedState,m.lanes=v.lanes):(m.updateQueue=null,m.memoizedState=null)}var E=Qu(l);if(E!==null){E.flags&=-257,Yu(E,l,i,o,t),E.mode&1&&Ju(o,u,t),t=E,s=u;var k=t.updateQueue;if(k===null){var w=new Set;w.add(s),t.updateQueue=w}else k.add(s);break e}else{if((t&1)===0){Ju(o,u,t),ss();break e}s=Error(b(426))}}else if(ne&&i.mode&1){var g=Qu(l);if(g!==null){(g.flags&65536)===0&&(g.flags|=256),Yu(g,l,i,o,t),Bi(tr(s,i));break e}}o=s=tr(s,i),he!==4&&(he=2),jr===null?jr=[o]:jr.push(o),o=l;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var d=Od(o,s,t);zu(o,d);break e;case 1:i=s;var c=o.type,f=o.stateNode;if((o.flags&128)===0&&(typeof c.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Xt===null||!Xt.has(f)))){o.flags|=65536,t&=-t,o.lanes|=t;var _=jd(o,i,t);zu(o,_);break e}}o=o.return}while(o!==null)}tf(n)}catch(T){t=T,de===n&&n!==null&&(de=n=n.return);continue}break}while(!0)}function Zd(){var e=go.current;return go.current=yo,e===null?yo:e}function ss(){(he===0||he===3||he===2)&&(he=4),ye===null||(wn&268435455)===0&&(Do&268435455)===0||Vt(ye,_e)}function wo(e,t){var n=W;W|=2;var r=Zd();(ye!==e||_e!==t)&&($t=null,vn(e,t));do try{vh();break}catch(a){qd(e,a)}while(!0);if(Hi(),W=n,go.current=r,de!==null)throw Error(b(261));return ye=null,_e=0,he}function vh(){for(;de!==null;)ef(de)}function yh(){for(;de!==null&&!Hp();)ef(de)}function ef(e){var t=rf(e.alternate,e,He);e.memoizedProps=e.pendingProps,t===null?tf(e):de=t,rs.current=null}function tf(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=uh(n,t,He),n!==null){de=n;return}}else{if(n=ch(n,t),n!==null){n.flags&=32767,de=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{he=6,de=null;return}}if(t=t.sibling,t!==null){de=t;return}de=t=e}while(t!==null);he===0&&(he=5)}function fn(e,t,n){var r=G,a=nt.transition;try{nt.transition=null,G=1,gh(e,t,n,r)}finally{nt.transition=a,G=r}return null}function gh(e,t,n,r){do Yn();while(Wt!==null);if((W&6)!==0)throw Error(b(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(b(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(em(e,o),e===ye&&(de=ye=null,_e=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||za||(za=!0,af(to,function(){return Yn(),null})),o=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||o){o=nt.transition,nt.transition=null;var l=G;G=1;var i=W;W|=4,rs.current=null,fh(e,n),Yd(n,e),Mm(ei),ro=!!Zl,ei=Zl=null,e.current=n,ph(n,e,a),Wp(),W=i,G=l,nt.transition=o}else e.current=n;if(za&&(za=!1,Wt=e,No=a),o=e.pendingLanes,o===0&&(Xt=null),Qp(n.stateNode,r),Be(e,ue()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],r(a.value,{componentStack:a.stack,digest:a.digest});if(_o)throw _o=!1,e=Ni,Ni=null,e;return(No&1)!==0&&e.tag!==0&&Yn(),o=e.pendingLanes,(o&1)!==0?e===wi?Ur++:(Ur=0,wi=e):Ur=0,an(),null}function Yn(){if(Wt!==null){var e=Oc(No),t=nt.transition,n=G;try{if(nt.transition=null,G=16>e?16:e,Wt===null)var r=!1;else{if(e=Wt,Wt=null,No=0,(W&6)!==0)throw Error(b(331));var a=W;for(W|=4,F=e.current;F!==null;){var o=F,l=o.child;if((F.flags&16)!==0){var i=o.deletions;if(i!==null){for(var s=0;s<i.length;s++){var u=i[s];for(F=u;F!==null;){var m=F;switch(m.tag){case 0:case 11:case 15:Or(8,m,o)}var h=m.child;if(h!==null)h.return=m,F=h;else for(;F!==null;){m=F;var v=m.sibling,E=m.return;if(Kd(m),m===u){F=null;break}if(v!==null){v.return=E,F=v;break}F=E}}}var k=o.alternate;if(k!==null){var w=k.child;if(w!==null){k.child=null;do{var g=w.sibling;w.sibling=null,w=g}while(w!==null)}}F=o}}if((o.subtreeFlags&2064)!==0&&l!==null)l.return=o,F=l;else e:for(;F!==null;){if(o=F,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:Or(9,o,o.return)}var d=o.sibling;if(d!==null){d.return=o.return,F=d;break e}F=o.return}}var c=e.current;for(F=c;F!==null;){l=F;var f=l.child;if((l.subtreeFlags&2064)!==0&&f!==null)f.return=l,F=f;else e:for(l=c;F!==null;){if(i=F,(i.flags&2048)!==0)try{switch(i.tag){case 0:case 11:case 15:Po(9,i)}}catch(T){le(i,i.return,T)}if(i===l){F=null;break e}var _=i.sibling;if(_!==null){_.return=i.return,F=_;break e}F=i.return}}if(W=a,an(),St&&typeof St.onPostCommitFiberRoot=="function")try{St.onPostCommitFiberRoot(Eo,e)}catch{}r=!0}return r}finally{G=n,nt.transition=t}}return!1}function sc(e,t,n){t=tr(n,t),t=Od(e,t,1),e=Gt(e,t,1),t=Fe(),e!==null&&(ta(e,1,t),Be(e,t))}function le(e,t,n){if(e.tag===3)sc(e,e,n);else for(;t!==null;){if(t.tag===3){sc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Xt===null||!Xt.has(r))){e=tr(n,e),e=jd(t,e,1),t=Gt(t,e,1),e=Fe(),t!==null&&(ta(t,1,e),Be(t,e));break}}t=t.return}}function _h(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Fe(),e.pingedLanes|=e.suspendedLanes&n,ye===e&&(_e&n)===n&&(he===4||he===3&&(_e&130023424)===_e&&500>ue()-os?vn(e,0):as|=n),Be(e,t)}function nf(e,t){t===0&&((e.mode&1)===0?t=1:(t=ba,ba<<=1,(ba&130023424)===0&&(ba=4194304)));var n=Fe();e=Dt(e,t),e!==null&&(ta(e,t,n),Be(e,n))}function Nh(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),nf(e,n)}function wh(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(b(314))}r!==null&&r.delete(t),nf(e,n)}var rf;rf=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Me.current)Ie=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return Ie=!1,sh(e,t,n);Ie=(e.flags&131072)!==0}else Ie=!1,ne&&(t.flags&1048576)!==0&&id(t,co,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Qa(e,t),e=t.pendingProps;var a=Xn(t,be.current);Qn(t,n),a=qi(null,t,r,e,a,n);var o=Zi();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ze(r)?(o=!0,so(t)):o=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Ji(t),a.updater=To,t.stateNode=a,a._reactInternals=t,ui(t,r,e,n),t=fi(null,t,r,!0,o,n)):(t.tag=0,ne&&o&&Mi(t),De(null,t,a,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Qa(e,t),e=t.pendingProps,a=r._init,r=a(r._payload),t.type=r,a=t.tag=Eh(r),e=st(r,e),a){case 0:t=di(null,t,r,e,n);break e;case 1:t=qu(null,t,r,e,n);break e;case 11:t=Gu(null,t,r,e,n);break e;case 14:t=Xu(null,t,r,st(r.type,e),n);break e}throw Error(b(306,r,""))}return t;case 0:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:st(r,a),di(e,t,r,a,n);case 1:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:st(r,a),qu(e,t,r,a,n);case 3:e:{if(Md(t),e===null)throw Error(b(387));r=t.pendingProps,o=t.memoizedState,a=o.element,pd(e,t),mo(t,r,null,n);var l=t.memoizedState;if(r=l.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){a=tr(Error(b(423)),t),t=Zu(e,t,r,n,a);break e}else if(r!==a){a=tr(Error(b(424)),t),t=Zu(e,t,r,n,a);break e}else for(We=Yt(t.stateNode.containerInfo.firstChild),Ke=t,ne=!0,ct=null,n=dd(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(qn(),r===a){t=Ft(e,t,n);break e}De(e,t,r,n)}t=t.child}return t;case 5:return md(t),e===null&&li(t),r=t.type,a=t.pendingProps,o=e!==null?e.memoizedProps:null,l=a.children,ti(r,a)?l=null:o!==null&&ti(r,o)&&(t.flags|=32),Id(e,t),De(e,t,l,n),t.child;case 6:return e===null&&li(t),null;case 13:return zd(e,t,n);case 4:return Qi(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Zn(t,null,r,n):De(e,t,r,n),t.child;case 11:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:st(r,a),Gu(e,t,r,a,n);case 7:return De(e,t,t.pendingProps,n),t.child;case 8:return De(e,t,t.pendingProps.children,n),t.child;case 12:return De(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,a=t.pendingProps,o=t.memoizedProps,l=a.value,q(fo,r._currentValue),r._currentValue=l,o!==null)if(pt(o.value,l)){if(o.children===a.children&&!Me.current){t=Ft(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var i=o.dependencies;if(i!==null){l=o.child;for(var s=i.firstContext;s!==null;){if(s.context===r){if(o.tag===1){s=xt(-1,n&-n),s.tag=2;var u=o.updateQueue;if(u!==null){u=u.shared;var m=u.pending;m===null?s.next=s:(s.next=m.next,m.next=s),u.pending=s}}o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),ii(o.return,n,t),i.lanes|=n;break}s=s.next}}else if(o.tag===10)l=o.type===t.type?null:o.child;else if(o.tag===18){if(l=o.return,l===null)throw Error(b(341));l.lanes|=n,i=l.alternate,i!==null&&(i.lanes|=n),ii(l,n,t),l=o.sibling}else l=o.child;if(l!==null)l.return=o;else for(l=o;l!==null;){if(l===t){l=null;break}if(o=l.sibling,o!==null){o.return=l.return,l=o;break}l=l.return}o=l}De(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,r=t.pendingProps.children,Qn(t,n),a=rt(a),r=r(a),t.flags|=1,De(e,t,r,n),t.child;case 14:return r=t.type,a=st(r,t.pendingProps),a=st(r.type,a),Xu(e,t,r,a,n);case 15:return Ud(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:st(r,a),Qa(e,t),t.tag=1,ze(r)?(e=!0,so(t)):e=!1,Qn(t,n),Ld(t,r,a),ui(t,r,a,n),fi(null,t,r,!0,e,n);case 19:return Bd(e,t,n);case 22:return Ad(e,t,n)}throw Error(b(156,t.tag))};function af(e,t){return Pc(e,t)}function Sh(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function tt(e,t,n,r){return new Sh(e,t,n,r)}function us(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Eh(e){if(typeof e=="function")return us(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ci)return 11;if(e===xi)return 14}return 2}function Zt(e,t){var n=e.alternate;return n===null?(n=tt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Xa(e,t,n,r,a,o){var l=2;if(r=e,typeof e=="function")us(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case Fn:return yn(n.children,a,o,t);case bi:l=8,a|=8;break;case Fl:return e=tt(12,n,t,a|2),e.elementType=Fl,e.lanes=o,e;case Ll:return e=tt(13,n,t,a),e.elementType=Ll,e.lanes=o,e;case Ol:return e=tt(19,n,t,a),e.elementType=Ol,e.lanes=o,e;case mc:return Fo(n,a,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case fc:l=10;break e;case pc:l=9;break e;case Ci:l=11;break e;case xi:l=14;break e;case Mt:l=16,r=null;break e}throw Error(b(130,e==null?e:typeof e,""))}return t=tt(l,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function yn(e,t,n,r){return e=tt(7,e,r,t),e.lanes=n,e}function Fo(e,t,n,r){return e=tt(22,e,r,t),e.elementType=mc,e.lanes=n,e.stateNode={isHidden:!1},e}function Tl(e,t,n){return e=tt(6,e,null,t),e.lanes=n,e}function Pl(e,t,n){return t=tt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function kh(e,t,n,r,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ml(0),this.expirationTimes=ml(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ml(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function cs(e,t,n,r,a,o,l,i,s){return e=new kh(e,t,n,i,s),t===1?(t=1,o===!0&&(t|=8)):t=0,o=tt(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ji(o),e}function $h(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Dn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function of(e){if(!e)return tn;e=e._reactInternals;e:{if(kn(e)!==e||e.tag!==1)throw Error(b(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ze(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(b(171))}if(e.tag===1){var n=e.type;if(ze(n))return od(e,n,t)}return t}function lf(e,t,n,r,a,o,l,i,s){return e=cs(n,r,!0,e,a,o,l,i,s),e.context=of(null),n=e.current,r=Fe(),a=qt(n),o=xt(r,a),o.callback=t??null,Gt(n,o,a),e.current.lanes=a,ta(e,a,r),Be(e,r),e}function Lo(e,t,n,r){var a=t.current,o=Fe(),l=qt(a);return n=of(n),t.context===null?t.context=n:t.pendingContext=n,t=xt(o,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Gt(a,t,l),e!==null&&(ft(e,a,l,o),Wa(e,a,l)),l}function So(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function uc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ds(e,t){uc(e,t),(e=e.alternate)&&uc(e,t)}function Rh(){return null}var sf=typeof reportError=="function"?reportError:function(e){console.error(e)};function fs(e){this._internalRoot=e}Oo.prototype.render=fs.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(b(409));Lo(e,t,null,null)};Oo.prototype.unmount=fs.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Sn(function(){Lo(null,e,null,null)}),t[Pt]=null}};function Oo(e){this._internalRoot=e}Oo.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ac();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Bt.length&&t!==0&&t<Bt[n].priority;n++);Bt.splice(n,0,e),n===0&&Mc(e)}};function ps(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function jo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function cc(){}function bh(e,t,n,r,a){if(a){if(typeof r=="function"){var o=r;r=function(){var u=So(l);o.call(u)}}var l=lf(t,r,e,0,null,!1,!1,"",cc);return e._reactRootContainer=l,e[Pt]=l.current,Kr(e.nodeType===8?e.parentNode:e),Sn(),l}for(;a=e.lastChild;)e.removeChild(a);if(typeof r=="function"){var i=r;r=function(){var u=So(s);i.call(u)}}var s=cs(e,0,!1,null,null,!1,!1,"",cc);return e._reactRootContainer=s,e[Pt]=s.current,Kr(e.nodeType===8?e.parentNode:e),Sn(function(){Lo(t,s,n,r)}),s}function Uo(e,t,n,r,a){var o=n._reactRootContainer;if(o){var l=o;if(typeof a=="function"){var i=a;a=function(){var s=So(l);i.call(s)}}Lo(t,l,e,a)}else l=bh(n,t,e,a,r);return So(l)}jc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=br(t.pendingLanes);n!==0&&(Di(t,n|1),Be(t,ue()),(W&6)===0&&(nr=ue()+500,an()))}break;case 13:Sn(function(){var r=Dt(e,1);if(r!==null){var a=Fe();ft(r,e,1,a)}}),ds(e,1)}};Fi=function(e){if(e.tag===13){var t=Dt(e,134217728);if(t!==null){var n=Fe();ft(t,e,134217728,n)}ds(e,134217728)}};Uc=function(e){if(e.tag===13){var t=qt(e),n=Dt(e,t);if(n!==null){var r=Fe();ft(n,e,t,r)}ds(e,t)}};Ac=function(){return G};Ic=function(e,t){var n=G;try{return G=e,t()}finally{G=n}};Wl=function(e,t,n){switch(t){case"input":if(Al(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=bo(r);if(!a)throw Error(b(90));vc(r),Al(r,a)}}}break;case"textarea":gc(e,n);break;case"select":t=n.value,t!=null&&Hn(e,!!n.multiple,t,!1)}};$c=ls;Rc=Sn;var Ch={usingClientEntryPoint:!1,Events:[ra,Un,bo,Ec,kc,ls]},Er={findFiberByHostInstance:pn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},xh={bundleType:Er.bundleType,version:Er.version,rendererPackageName:Er.rendererPackageName,rendererConfig:Er.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Lt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=xc(e),e===null?null:e.stateNode},findFiberByHostInstance:Er.findFiberByHostInstance||Rh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(kr=__REACT_DEVTOOLS_GLOBAL_HOOK__,!kr.isDisabled&&kr.supportsFiber))try{Eo=kr.inject(xh),St=kr}catch{}var kr;Ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ch;Ye.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ps(t))throw Error(b(200));return $h(e,t,null,n)};Ye.createRoot=function(e,t){if(!ps(e))throw Error(b(299));var n=!1,r="",a=sf;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=cs(e,1,!1,null,null,n,!1,r,a),e[Pt]=t.current,Kr(e.nodeType===8?e.parentNode:e),new fs(t)};Ye.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(b(188)):(e=Object.keys(e).join(","),Error(b(268,e)));return e=xc(t),e=e===null?null:e.stateNode,e};Ye.flushSync=function(e){return Sn(e)};Ye.hydrate=function(e,t,n){if(!jo(t))throw Error(b(200));return Uo(null,e,t,!0,n)};Ye.hydrateRoot=function(e,t,n){if(!ps(e))throw Error(b(405));var r=n!=null&&n.hydratedSources||null,a=!1,o="",l=sf;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=lf(t,null,e,1,n??null,a,!1,o,l),e[Pt]=t.current,Kr(e),r)for(e=0;e<r.length;e++)n=r[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new Oo(t)};Ye.render=function(e,t,n){if(!jo(t))throw Error(b(200));return Uo(null,e,t,!1,n)};Ye.unmountComponentAtNode=function(e){if(!jo(e))throw Error(b(40));return e._reactRootContainer?(Sn(function(){Uo(null,null,e,!1,function(){e._reactRootContainer=null,e[Pt]=null})}),!0):!1};Ye.unstable_batchedUpdates=ls;Ye.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!jo(n))throw Error(b(200));if(e==null||e._reactInternals===void 0)throw Error(b(38));return Uo(e,t,n,!1,r)};Ye.version="18.3.1-next-f1338f8080-20240426"});var ms=un((fy,df)=>{"use strict";function cf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cf)}catch(e){console.error(e)}}cf(),df.exports=uf()});var pf=un(hs=>{"use strict";var ff=ms();hs.createRoot=ff.createRoot,hs.hydrateRoot=ff.hydrateRoot;var py});var R=dr(pr()),Gf=dr(pf());var Y=dr(pr()),_v=dr(ms());var D=dr(pr());function oa(){return oa=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},oa.apply(this,arguments)}var mt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(mt||(mt={}));var mf="popstate";function _f(e){e===void 0&&(e={});function t(r,a){let{pathname:o,search:l,hash:i}=r.location;return ys("",{pathname:o,search:l,hash:i},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(r,a){return typeof a=="string"?a:$n(a)}return Ph(t,n,null,e)}function te(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function gs(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Th(){return Math.random().toString(36).substr(2,8)}function hf(e,t){return{usr:e.state,key:e.key,idx:t}}function ys(e,t,n,r){return n===void 0&&(n=null),oa({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Ot(t):t,{state:n,key:t&&t.key||r||Th()})}function $n(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Ot(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Ph(e,t,n,r){r===void 0&&(r={});let{window:a=document.defaultView,v5Compat:o=!1}=r,l=a.history,i=mt.Pop,s=null,u=m();u==null&&(u=0,l.replaceState(oa({},l.state,{idx:u}),""));function m(){return(l.state||{idx:null}).idx}function h(){i=mt.Pop;let g=m(),d=g==null?null:g-u;u=g,s&&s({action:i,location:w.location,delta:d})}function v(g,d){i=mt.Push;let c=ys(w.location,g,d);n&&n(c,g),u=m()+1;let f=hf(c,u),_=w.createHref(c);try{l.pushState(f,"",_)}catch(T){if(T instanceof DOMException&&T.name==="DataCloneError")throw T;a.location.assign(_)}o&&s&&s({action:i,location:w.location,delta:1})}function E(g,d){i=mt.Replace;let c=ys(w.location,g,d);n&&n(c,g),u=m();let f=hf(c,u),_=w.createHref(c);l.replaceState(f,"",_),o&&s&&s({action:i,location:w.location,delta:0})}function k(g){let d=a.location.origin!=="null"?a.location.origin:a.location.href,c=typeof g=="string"?g:$n(g);return c=c.replace(/ $/,"%20"),te(d,"No window.location.(origin|href) available to create URL for href: "+c),new URL(c,d)}let w={get action(){return i},get location(){return e(a,l)},listen(g){if(s)throw new Error("A history only accepts one active listener");return a.addEventListener(mf,h),s=g,()=>{a.removeEventListener(mf,h),s=null}},createHref(g){return t(a,g)},createURL:k,encodeLocation(g){let d=k(g);return{pathname:d.pathname,search:d.search,hash:d.hash}},push:v,replace:E,go(g){return l.go(g)}};return w}var vf;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(vf||(vf={}));function Ao(e,t,n){return n===void 0&&(n="/"),Dh(e,t,n,!1)}function Dh(e,t,n,r){let a=typeof t=="string"?Ot(t):t,o=ln(a.pathname||"/",n);if(o==null)return null;let l=Nf(e);Fh(l);let i=null;for(let s=0;i==null&&s<l.length;++s){let u=Sf(o);i=Bh(l[s],u,r)}return i}function Nf(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let a=(o,l,i)=>{let s={relativePath:i===void 0?o.path||"":i,caseSensitive:o.caseSensitive===!0,childrenIndex:l,route:o};s.relativePath.startsWith("/")&&(te(s.relativePath.startsWith(r),'Absolute route path "'+s.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),s.relativePath=s.relativePath.slice(r.length));let u=kt([r,s.relativePath]),m=n.concat(s);o.children&&o.children.length>0&&(te(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),Nf(o.children,t,m,u)),!(o.path==null&&!o.index)&&t.push({path:u,score:Mh(u,o.index),routesMeta:m})};return e.forEach((o,l)=>{var i;if(o.path===""||!((i=o.path)!=null&&i.includes("?")))a(o,l);else for(let s of wf(o.path))a(o,l,s)}),t}function wf(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,a=n.endsWith("?"),o=n.replace(/\?$/,"");if(r.length===0)return a?[o,""]:[o];let l=wf(r.join("/")),i=[];return i.push(...l.map(s=>s===""?o:[o,s].join("/"))),a&&i.push(...l),i.map(s=>e.startsWith("/")&&s===""?"/":s)}function Fh(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:zh(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var Lh=/^:[\w-]+$/,Oh=3,jh=2,Uh=1,Ah=10,Ih=-2,yf=e=>e==="*";function Mh(e,t){let n=e.split("/"),r=n.length;return n.some(yf)&&(r+=Ih),t&&(r+=jh),n.filter(a=>!yf(a)).reduce((a,o)=>a+(Lh.test(o)?Oh:o===""?Uh:Ah),r)}function zh(e,t){return e.length===t.length&&e.slice(0,-1).every((r,a)=>r===t[a])?e[e.length-1]-t[t.length-1]:0}function Bh(e,t,n){n===void 0&&(n=!1);let{routesMeta:r}=e,a={},o="/",l=[];for(let i=0;i<r.length;++i){let s=r[i],u=i===r.length-1,m=o==="/"?t:t.slice(o.length)||"/",h=on({path:s.relativePath,caseSensitive:s.caseSensitive,end:u},m),v=s.route;if(!h&&u&&n&&!r[r.length-1].route.index&&(h=on({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},m)),!h)return null;Object.assign(a,h.params),l.push({params:a,pathname:kt([o,h.pathname]),pathnameBase:Jh(kt([o,h.pathnameBase])),route:v}),h.pathnameBase!=="/"&&(o=kt([o,h.pathnameBase]))}return l}function on(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Vh(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let o=a[0],l=o.replace(/(.)\/+$/,"$1"),i=a.slice(1);return{params:r.reduce((u,m,h)=>{let{paramName:v,isOptional:E}=m;if(v==="*"){let w=i[h]||"";l=o.slice(0,o.length-w.length).replace(/(.)\/+$/,"$1")}let k=i[h];return E&&!k?u[v]=void 0:u[v]=(k||"").replace(/%2F/g,"/"),u},{}),pathname:o,pathnameBase:l,pattern:e}}function Vh(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),gs(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(l,i,s)=>(r.push({paramName:i,isOptional:s!=null}),s?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function Sf(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return gs(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function ln(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}var Hh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Wh=e=>Hh.test(e);function _s(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:a=""}=typeof e=="string"?Ot(e):e,o;if(n)if(Wh(n))o=n;else{if(n.includes("//")){let l=n;n=n.replace(/\/\/+/g,"/"),gs(!1,"Pathnames cannot have embedded double slashes - normalizing "+(l+" -> "+n))}n.startsWith("/")?o=gf(n.substring(1),"/"):o=gf(n,t)}else o=t;return{pathname:o,search:Qh(r),hash:Yh(a)}}function gf(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function vs(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Kh(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Io(e,t){let n=Kh(e);return t?n.map((r,a)=>a===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Mo(e,t,n,r){r===void 0&&(r=!1);let a;typeof e=="string"?a=Ot(e):(a=oa({},e),te(!a.pathname||!a.pathname.includes("?"),vs("?","pathname","search",a)),te(!a.pathname||!a.pathname.includes("#"),vs("#","pathname","hash",a)),te(!a.search||!a.search.includes("#"),vs("#","search","hash",a)));let o=e===""||a.pathname==="",l=o?"/":a.pathname,i;if(l==null)i=n;else{let h=t.length-1;if(!r&&l.startsWith("..")){let v=l.split("/");for(;v[0]==="..";)v.shift(),h-=1;a.pathname=v.join("/")}i=h>=0?t[h]:"/"}let s=_s(a,i),u=l&&l!=="/"&&l.endsWith("/"),m=(o||l===".")&&n.endsWith("/");return!s.pathname.endsWith("/")&&(u||m)&&(s.pathname+="/"),s}var kt=e=>e.join("/").replace(/\/\/+/g,"/"),Jh=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Qh=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Yh=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function zo(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var Ef=["post","put","patch","delete"],hy=new Set(Ef),Gh=["get",...Ef],vy=new Set(Gh);var yy=Symbol("deferred");function la(){return la=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},la.apply(this,arguments)}var lr=D.createContext(null),Vo=D.createContext(null);var ht=D.createContext(null),sa=D.createContext(null),vt=D.createContext({outlet:null,matches:[],isDataRoute:!1}),Rf=D.createContext(null);function ws(e,t){let{relative:n}=t===void 0?{}:t;Rn()||te(!1);let{basename:r,navigator:a}=D.useContext(ht),{hash:o,pathname:l,search:i}=ir(e,{relative:n}),s=l;return r!=="/"&&(s=l==="/"?r:kt([r,l])),a.createHref({pathname:s,search:i,hash:o})}function Rn(){return D.useContext(sa)!=null}function sn(){return Rn()||te(!1),D.useContext(sa).location}function bf(e){D.useContext(ht).static||D.useLayoutEffect(e)}function jt(){let{isDataRoute:e}=D.useContext(vt);return e?fv():av()}function av(){Rn()||te(!1);let e=D.useContext(lr),{basename:t,future:n,navigator:r}=D.useContext(ht),{matches:a}=D.useContext(vt),{pathname:o}=sn(),l=JSON.stringify(Io(a,n.v7_relativeSplatPath)),i=D.useRef(!1);return bf(()=>{i.current=!0}),D.useCallback(function(u,m){if(m===void 0&&(m={}),!i.current)return;if(typeof u=="number"){r.go(u);return}let h=Mo(u,JSON.parse(l),o,m.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:kt([t,h.pathname])),(m.replace?r.replace:r.push)(h,m.state,m)},[t,r,l,o,e])}function Ho(){let{matches:e}=D.useContext(vt),t=e[e.length-1];return t?t.params:{}}function ir(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=D.useContext(ht),{matches:a}=D.useContext(vt),{pathname:o}=sn(),l=JSON.stringify(Io(a,r.v7_relativeSplatPath));return D.useMemo(()=>Mo(e,JSON.parse(l),o,n==="path"),[e,l,o,n])}function Cf(e,t){return xf(e,t)}function xf(e,t,n,r){Rn()||te(!1);let{navigator:a}=D.useContext(ht),{matches:o}=D.useContext(vt),l=o[o.length-1],i=l?l.params:{},s=l?l.pathname:"/",u=l?l.pathnameBase:"/",m=l&&l.route,h=sn(),v;if(t){var E;let c=typeof t=="string"?Ot(t):t;u==="/"||(E=c.pathname)!=null&&E.startsWith(u)||te(!1),v=c}else v=h;let k=v.pathname||"/",w=k;if(u!=="/"){let c=u.replace(/^\//,"").split("/");w="/"+k.replace(/^\//,"").split("/").slice(c.length).join("/")}let g=Ao(e,{pathname:w}),d=sv(g&&g.map(c=>Object.assign({},c,{params:Object.assign({},i,c.params),pathname:kt([u,a.encodeLocation?a.encodeLocation(c.pathname).pathname:c.pathname]),pathnameBase:c.pathnameBase==="/"?u:kt([u,a.encodeLocation?a.encodeLocation(c.pathnameBase).pathname:c.pathnameBase])})),o,n,r);return t&&d?D.createElement(sa.Provider,{value:{location:la({pathname:"/",search:"",hash:"",state:null,key:"default"},v),navigationType:mt.Pop}},d):d}function ov(){let e=Df(),t=zo(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",a={padding:"0.5rem",backgroundColor:r},o={padding:"2px 4px",backgroundColor:r};return D.createElement(D.Fragment,null,D.createElement("h2",null,"Unexpected Application Error!"),D.createElement("h3",{style:{fontStyle:"italic"}},t),n?D.createElement("pre",{style:a},n):null,null)}var lv=D.createElement(ov,null),Ns=class extends D.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?D.createElement(vt.Provider,{value:this.props.routeContext},D.createElement(Rf.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function iv(e){let{routeContext:t,match:n,children:r}=e,a=D.useContext(lr);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),D.createElement(vt.Provider,{value:t},r)}function sv(e,t,n,r){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var o;if(!n)return null;if(n.errors)e=n.matches;else if((o=r)!=null&&o.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let l=e,i=(a=n)==null?void 0:a.errors;if(i!=null){let m=l.findIndex(h=>h.route.id&&i?.[h.route.id]!==void 0);m>=0||te(!1),l=l.slice(0,Math.min(l.length,m+1))}let s=!1,u=-1;if(n&&r&&r.v7_partialHydration)for(let m=0;m<l.length;m++){let h=l[m];if((h.route.HydrateFallback||h.route.hydrateFallbackElement)&&(u=m),h.route.id){let{loaderData:v,errors:E}=n,k=h.route.loader&&v[h.route.id]===void 0&&(!E||E[h.route.id]===void 0);if(h.route.lazy||k){s=!0,u>=0?l=l.slice(0,u+1):l=[l[0]];break}}}return l.reduceRight((m,h,v)=>{let E,k=!1,w=null,g=null;n&&(E=i&&h.route.id?i[h.route.id]:void 0,w=h.route.errorElement||lv,s&&(u<0&&v===0?(pv("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),k=!0,g=null):u===v&&(k=!0,g=h.route.hydrateFallbackElement||null)));let d=t.concat(l.slice(0,v+1)),c=()=>{let f;return E?f=w:k?f=g:h.route.Component?f=D.createElement(h.route.Component,null):h.route.element?f=h.route.element:f=m,D.createElement(iv,{match:h,routeContext:{outlet:m,matches:d,isDataRoute:n!=null},children:f})};return n&&(h.route.ErrorBoundary||h.route.errorElement||v===0)?D.createElement(Ns,{location:n.location,revalidation:n.revalidation,component:w,error:E,children:c(),routeContext:{outlet:null,matches:d,isDataRoute:!0}}):c()},null)}var Tf=(function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e})(Tf||{}),Bo=(function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e})(Bo||{});function uv(e){let t=D.useContext(lr);return t||te(!1),t}function cv(e){let t=D.useContext(Vo);return t||te(!1),t}function dv(e){let t=D.useContext(vt);return t||te(!1),t}function Pf(e){let t=dv(e),n=t.matches[t.matches.length-1];return n.route.id||te(!1),n.route.id}function Df(){var e;let t=D.useContext(Rf),n=cv(Bo.UseRouteError),r=Pf(Bo.UseRouteError);return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function fv(){let{router:e}=uv(Tf.UseNavigateStable),t=Pf(Bo.UseNavigateStable),n=D.useRef(!1);return bf(()=>{n.current=!0}),D.useCallback(function(a,o){o===void 0&&(o={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,la({fromRouteId:t},o)))},[e,t])}var kf={};function pv(e,t,n){!t&&!kf[e]&&(kf[e]=!0)}var or=(e,t,n)=>(""+t+("You can use the `"+e+"` future flag to opt-in early. ")+("For more information, see "+n+"."),void 0);function Ff(e,t){e?.v7_startTransition===void 0&&or("v7_startTransition","React Router will begin wrapping state updates in `React.startTransition` in v7","https://reactrouter.com/v6/upgrading/future#v7_starttransition"),e?.v7_relativeSplatPath===void 0&&(!t||t.v7_relativeSplatPath===void 0)&&or("v7_relativeSplatPath","Relative route resolution within Splat routes is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath"),t&&(t.v7_fetcherPersist===void 0&&or("v7_fetcherPersist","The persistence behavior of fetchers is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist"),t.v7_normalizeFormMethod===void 0&&or("v7_normalizeFormMethod","Casing of `formMethod` fields is being normalized to uppercase in v7","https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod"),t.v7_partialHydration===void 0&&or("v7_partialHydration","`RouterProvider` hydration behavior is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_partialhydration"),t.v7_skipActionErrorRevalidation===void 0&&or("v7_skipActionErrorRevalidation","The revalidation behavior after 4xx/5xx `action` responses is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation"))}var mv="startTransition",ky=D[mv];function Ss(e){let{to:t,replace:n,state:r,relative:a}=e;Rn()||te(!1);let{future:o,static:l}=D.useContext(ht),{matches:i}=D.useContext(vt),{pathname:s}=sn(),u=jt(),m=Mo(t,Io(i,o.v7_relativeSplatPath),s,a==="path"),h=JSON.stringify(m);return D.useEffect(()=>u(JSON.parse(h),{replace:n,state:r,relative:a}),[u,h,a,n,r]),null}function yt(e){te(!1)}function Es(e){let{basename:t="/",children:n=null,location:r,navigationType:a=mt.Pop,navigator:o,static:l=!1,future:i}=e;Rn()&&te(!1);let s=t.replace(/^\/*/,"/"),u=D.useMemo(()=>({basename:s,navigator:o,static:l,future:la({v7_relativeSplatPath:!1},i)}),[s,i,o,l]);typeof r=="string"&&(r=Ot(r));let{pathname:m="/",search:h="",hash:v="",state:E=null,key:k="default"}=r,w=D.useMemo(()=>{let g=ln(m,s);return g==null?null:{location:{pathname:g,search:h,hash:v,state:E,key:k},navigationType:a}},[s,m,h,v,E,k,a]);return w==null?null:D.createElement(ht.Provider,{value:u},D.createElement(sa.Provider,{children:n,value:w}))}function ks(e){let{children:t,location:n}=e;return Cf(ia(t),n)}var $y=new Promise(()=>{});function ia(e,t){t===void 0&&(t=[]);let n=[];return D.Children.forEach(e,(r,a)=>{if(!D.isValidElement(r))return;let o=[...t,a];if(r.type===D.Fragment){n.push.apply(n,ia(r.props.children,o));return}r.type!==yt&&te(!1),!r.props.index||!r.props.children||te(!1);let l={id:r.props.id||o.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(l.children=ia(r.props.children,o)),n.push(l)}),n}function Wo(){return Wo=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Wo.apply(this,arguments)}function jf(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,o;for(o=0;o<r.length;o++)a=r[o],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function Nv(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function wv(e,t){return e.button===0&&(!t||t==="_self")&&!Nv(e)}var Sv=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Ev=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"];var kv="6";try{window.__reactRouterVersion=kv}catch{}var $v=Y.createContext({isTransitioning:!1});var Rv="startTransition",Lf=Y[Rv],bv="flushSync",Gy=_v[bv],Cv="useId",Xy=Y[Cv];function Uf(e){let{basename:t,children:n,future:r,window:a}=e,o=Y.useRef();o.current==null&&(o.current=_f({window:a,v5Compat:!0}));let l=o.current,[i,s]=Y.useState({action:l.action,location:l.location}),{v7_startTransition:u}=r||{},m=Y.useCallback(h=>{u&&Lf?Lf(()=>s(h)):s(h)},[s,u]);return Y.useLayoutEffect(()=>l.listen(m),[l,m]),Y.useEffect(()=>Ff(r),[r]),Y.createElement(Es,{basename:t,children:n,location:i.location,navigationType:i.action,navigator:l,future:r})}var xv=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Tv=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ge=Y.forwardRef(function(t,n){let{onClick:r,relative:a,reloadDocument:o,replace:l,state:i,target:s,to:u,preventScrollReset:m,viewTransition:h}=t,v=jf(t,Sv),{basename:E}=Y.useContext(ht),k,w=!1;if(typeof u=="string"&&Tv.test(u)&&(k=u,xv))try{let f=new URL(window.location.href),_=u.startsWith("//")?new URL(f.protocol+u):new URL(u),T=ln(_.pathname,E);_.origin===f.origin&&T!=null?u=T+_.search+_.hash:w=!0}catch{}let g=ws(u,{relative:a}),d=Dv(u,{replace:l,state:i,target:s,preventScrollReset:m,relative:a,viewTransition:h});function c(f){r&&r(f),f.defaultPrevented||d(f)}return Y.createElement("a",Wo({},v,{href:k||g,onClick:w||o?r:c,ref:n,target:s}))}),Af=Y.forwardRef(function(t,n){let{"aria-current":r="page",caseSensitive:a=!1,className:o="",end:l=!1,style:i,to:s,viewTransition:u,children:m}=t,h=jf(t,Ev),v=ir(s,{relative:h.relative}),E=sn(),k=Y.useContext(Vo),{navigator:w,basename:g}=Y.useContext(ht),d=k!=null&&Fv(v)&&u===!0,c=w.encodeLocation?w.encodeLocation(v).pathname:v.pathname,f=E.pathname,_=k&&k.navigation&&k.navigation.location?k.navigation.location.pathname:null;a||(f=f.toLowerCase(),_=_?_.toLowerCase():null,c=c.toLowerCase()),_&&g&&(_=ln(_,g)||_);let T=c!=="/"&&c.endsWith("/")?c.length-1:c.length,x=f===c||!l&&f.startsWith(c)&&f.charAt(T)==="/",L=_!=null&&(_===c||!l&&_.startsWith(c)&&_.charAt(c.length)==="/"),P={isActive:x,isPending:L,isTransitioning:d},I=x?r:void 0,A;typeof o=="function"?A=o(P):A=[o,x?"active":null,L?"pending":null,d?"transitioning":null].filter(Boolean).join(" ");let z=typeof i=="function"?i(P):i;return Y.createElement(Ge,Wo({},h,{"aria-current":I,className:A,ref:n,style:z,to:s,viewTransition:u}),typeof m=="function"?m(P):m)});var $s;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})($s||($s={}));var Of;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Of||(Of={}));function Pv(e){let t=Y.useContext(lr);return t||te(!1),t}function Dv(e,t){let{target:n,replace:r,state:a,preventScrollReset:o,relative:l,viewTransition:i}=t===void 0?{}:t,s=jt(),u=sn(),m=ir(e,{relative:l});return Y.useCallback(h=>{if(wv(h,n)){h.preventDefault();let v=r!==void 0?r:$n(u)===$n(m);s(e,{replace:v,state:a,preventScrollReset:o,relative:l,viewTransition:i})}},[u,s,m,r,a,n,e,o,l,i])}function Fv(e,t){t===void 0&&(t={});let n=Y.useContext($v);n==null&&te(!1);let{basename:r}=Pv($s.useViewTransitionState),a=ir(e,{relative:t.relative});if(!n.isTransitioning)return!1;let o=ln(n.currentLocation.pathname,r)||n.currentLocation.pathname,l=ln(n.nextLocation.pathname,r)||n.nextLocation.pathname;return on(a.pathname,l)!=null||on(a.pathname,o)!=null}var Mf=function(e,t,n,r){var a;t[0]=0;for(var o=1;o<t.length;o++){var l=t[o++],i=t[o]?(t[0]|=l?1:2,n[t[o++]]):t[++o];l===3?r[0]=i:l===4?r[1]=Object.assign(r[1]||{},i):l===5?(r[1]=r[1]||{})[t[++o]]=i:l===6?r[1][t[++o]]+=i+"":l?(a=e.apply(i,Mf(e,i,n,["",null])),r.push(a),i[0]?t[0]|=2:(t[o-2]=0,t[o]=a)):r.push(i)}return r},If=new Map;function zf(e){var t=If.get(this);return t||(t=new Map,If.set(this,t)),(t=Mf(this,t.get(e)||(t.set(e,t=(function(n){for(var r,a,o=1,l="",i="",s=[0],u=function(v){o===1&&(v||(l=l.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(0,v,l):o===3&&(v||l)?(s.push(3,v,l),o=2):o===2&&l==="..."&&v?s.push(4,v,0):o===2&&l&&!v?s.push(5,0,!0,l):o>=5&&((l||!v&&o===5)&&(s.push(o,0,l,a),o=6),v&&(s.push(o,v,0,a),o=6)),l=""},m=0;m<n.length;m++){m&&(o===1&&u(),u(m));for(var h=0;h<n[m].length;h++)r=n[m][h],o===1?r==="<"?(u(),s=[s],o=3):l+=r:o===4?l==="--"&&r===">"?(o=1,l=""):l=r+l[0]:i?r===i?i="":l+=r:r==='"'||r==="'"?i=r:r===">"?(u(),o=1):o&&(r==="="?(o=5,a=l,l=""):r==="/"&&(o<5||n[m][h+1]===">")?(u(),o===3&&(s=s[0]),o=s,(s=s[0]).push(2,0,o),o=0):r===" "||r==="	"||r===`
`||r==="\r"?(u(),o=2):l+=r),o===3&&l==="!--"&&(o=4,s=s[0])}return u(),s})(e)),t),arguments,[])).length>1?t:t[0]}var Ko=document.getElementById("boot-fallback"),Bf=document.getElementById("boot-fallback-message");function Lv(e){Bf&&(Bf.textContent=e)}function Ov(e){e&&Lv(e),Ko&&Ko.classList.remove("hidden")}function jv(){Ko&&Ko.classList.add("hidden")}function ca(e,t){t&&console.error(e,t),Ov(e)}var y=zf.bind(R.default.createElement);function Oe(e){return String(e||"unknown").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function Xf(e){let t=String(e||"everyday");return t==="occasion"?"Occasion":t==="current_event"?"Current Event":"Everyday"}function Uv(e){let t=String(e||"").toLowerCase();return t==="completed"||t==="approved"?"success":t.includes("reject")||t.includes("timeout")||t.includes("failed")?"danger":t.includes("pending")||t.includes("progress")||t.includes("queued")?"warning":"neutral"}function Ce({value:e}){return y`<span className=${`badge ${Uv(e)}`}>${Oe(e)}</span>`}function Ve(e){if(!e)return"-";let t=new Date(e);return Number.isNaN(t.getTime())?"-":t.toLocaleString()}function Av(e){let t=Number(e||0);if(t<=0)return"0 B";let n=["B","KB","MB","GB","TB"],r=Math.min(Math.floor(Math.log(t)/Math.log(1024)),n.length-1);return`${(t/1024**r).toFixed(r===0?0:1)} ${n[r]}`}function Vf(e){if(!e||typeof e!="object")return"";let t=["decision","status","winner_model","endpoint","image_preview_url","final_preview_url","notes"],n=[];return t.forEach(a=>{let o=e[a];o!=null&&String(o).trim()!==""&&n.push(`${a}: ${String(o)}`)}),n.length>0?n.slice(0,3).join(" | "):Object.entries(e).slice(0,2).map(([a,o])=>`${a}: ${String(o)}`).join(" | ")}async function U(e,t={}){let n=new Headers(t.headers||{});t.body&&!n.has("Content-Type")&&n.set("Content-Type","application/json");let r=await fetch(e,{...t,headers:n}),a=await r.text(),o=null;if(a)try{o=JSON.parse(a)}catch{o=a}if(!r.ok){let l=o&&typeof o=="object"&&o.detail?o.detail:r.statusText;throw new Error(l||`Request failed (${r.status})`)}return o}function bn(e,t){let n=String(t?.message||"").trim();return n||`Unable to load ${e}`}function Cn(e){let t=String(e?.message||"").trim().toLowerCase();return t==="not found"||t.includes("404")}function Iv(e){return{theme_name:String(e.theme_name||"Internal Theme").trim(),tone_funny_pct:Number(e.tone_funny_pct||20),tone_emotion_pct:Number(e.tone_emotion_pct||80),tone_style:String(e.tone_style||"conversational"),audience:String(e.audience||"internal reviewer").trim(),cultural_context:String(e.cultural_context||"global").trim(),output_spec:zv(e.copy_style,e.target_words),avoid_cliches:!0,cards_per_theme:Number(e.cards_per_theme||10),notes:String(e.notes||"").trim()||null,rendering:{theme_style:"minimal",text_alignment:"center",export_size:"1080x1350"}}}function fa(e){let t=String(e||"").trim().toLowerCase();return t==="witty"||t==="playful"||t==="heartfelt"||t==="minimal"?t:t==="short_crisp"?"minimal":t==="warm_note"?"heartfelt":t.includes("play")?"playful":t.includes("witty")||t.includes("humor")||t.includes("fun")?"witty":t.includes("heart")||t.includes("warm")||t.includes("romantic")||t.includes("reflect")||t.includes("uplift")?"heartfelt":"minimal"}function Mv(e){return!e||typeof e!="object"?null:{theme_name:String(e.theme_name||"Internal Theme").trim(),audience:String(e.audience||"internal reviewer").trim(),cultural_context:String(e.cultural_context||"global").trim(),tone_style:String(e.tone_style||"conversational").trim(),tone_funny_pct:Number(e.tone_funny_pct??20),tone_emotion_pct:Number(e.tone_emotion_pct??80),copy_style:fa(e.tone_style),target_words:14}}function zv(e,t){return{format:fa(e),length:{target_words:Number(t||16)},structure:{no_lists:!0,no_numbering:!0}}}function ua(e=null){return{theme_key:"",cards_per_theme:10,notes:"",copy_style:fa(e?.tone_style||e?.default_tone_style),target_words:14,tone_funny_pct:Number(e?.tone_funny_pct??e?.default_funny_pct??20)}}function qf(e){return{cards_per_theme:Number(e.cards_per_theme||10),notes:String(e.notes||"").trim()||null,copy_style:fa(e.copy_style),target_words:Number(e.target_words||14),tone_funny_pct:Number(e.tone_funny_pct??20)}}var Bv=[{value:"witty",label:"witty"},{value:"playful",label:"playful"},{value:"heartfelt",label:"heartfelt"},{value:"minimal",label:"minimal"}];function Rs(e){let t=fa(e);return t==="heartfelt"?"Heartfelt":t==="playful"?"Playful":t==="witty"?"Witty":"Minimal"}function bs(){return Bv.map(e=>y`<option key=${e.value} value=${e.value}>${e.label}</option>`)}function Vv(e){return e&&typeof e.output_spec=="object"&&e.output_spec!==null?e.output_spec:{}}function Yo(e){let t=Vv(e);return t&&typeof t.studio=="object"&&t.studio!==null?t.studio:{}}function Hv(e){return!!Yo(e).is_favorite}async function Wv(e){let t=await U(`/api/jobs/${e}/assets`);return Array.isArray(t)?t:[]}async function Cs(e){await U(`/api/jobs/${e}/approve-content`,{method:"POST"}),await U(`/api/jobs/${e}/generate-more-images`,{method:"POST"});let n=(await Wv(e)).find(r=>String(r.asset_type||"")==="image_option"&&r.relative_path);return n?(await U(`/api/jobs/${e}/select-image`,{method:"POST",body:JSON.stringify({relative_path:n.relative_path})}),await U(`/api/jobs/${e}/render-final`,{method:"POST"}),{imageOptionUsed:!0}):(await U(`/api/jobs/${e}/generate-image`,{method:"POST"}),await U(`/api/jobs/${e}/approve-image`,{method:"POST"}),await U(`/api/jobs/${e}/render-final`,{method:"POST"}),{imageOptionUsed:!1})}function Hf(e){return String(e||"").split(",").map(t=>t.trim()).filter(Boolean)}function Wf(e){if(!e)return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toISOString().slice(0,10)}function Kf(e){if(!e)return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=t.getTimezoneOffset()*60*1e3;return new Date(t.getTime()-n).toISOString().slice(0,16)}function Jo(e,t=140){let n=String(e||"").trim();return n?n.length<=t?n:`${n.slice(0,t-1).trimEnd()}...`:""}function Zf(e){return typeof e=="string"?e.trim():""}function Kv(e){let t=Zf(e);if(!t)return!1;if(t.startsWith("data:image/"))return!0;try{let n=new URL(t,window.location.origin);return/\.(png|jpe?g|webp|gif|svg)$/i.test(n.pathname)}catch{return!1}}function Qo(e,t=[]){if(!e||typeof e!="object")return[];let n=[],r=new Set,a=(o,l,i)=>{let s=Zf(l);!s||r.has(s)||!Kv(s)||(r.add(s),n.push({label:o,url:s,source:i}))};if(a("Final Preview",e.final_preview_url,"final_preview_url"),a("Final PNG",e.final_asset_urls&&typeof e.final_asset_urls=="object"?e.final_asset_urls.png:"","final_asset_urls.png"),a("Image Preview",e.image_preview_url,"image_preview_url"),a("Content Preview",e.content_preview_url,"content_preview_url"),Array.isArray(t)){let o={final_preview:"Final Preview",final_png:"Final PNG",image_preview:"Image Preview",content_preview:"Content Preview"};t.forEach(l=>{let i=String(l?.asset_type||"").toLowerCase(),s=o[i];s&&a(s,l.public_url||l.asset_url,`asset:${i}`)})}return n}function da(e){let t=(0,R.useMemo)(()=>e.map(i=>`${i.source}:${i.url}`).join("|"),[e]),[n,r]=(0,R.useState)(0);(0,R.useEffect)(()=>{r(0)},[t]);let a=n<e.length?e[n]:null,o=e.length>0&&n>=e.length;function l(){r(i=>i+1)}return{currentCandidate:a,exhausted:o,handleError:l}}function Jv({image:e}){let t=(0,R.useMemo)(()=>!e||!e.url?[]:[{label:e.label||"Preview",url:e.url,source:e.label||"preview"}],[e]),{currentCandidate:n,exhausted:r,handleError:a}=da(t);return y`
      <article className="image-card">
        ${n?y`
              <a href=${n.url} target="_blank" rel="noreferrer">
                <img src=${n.url} alt=${e.label} loading="lazy" onError=${a} />
              </a>
            `:y`<p className="empty-state">${r?"Preview unavailable.":"No preview available yet."}</p>`}
        <p className="image-caption">${e.label}</p>
      </article>
    `}function Jf({job:e,actionState:t,onArchive:n,onDelete:r}){let a=(0,R.useMemo)(()=>Qo(e),[e]),{currentCandidate:o,exhausted:l,handleError:i}=da(a),s=Jo(e.content_preview||"Content preview will appear here after generation.",180);return y`
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
              <p className="ecard-meta">${Ve(e.created_at)}</p>
            </div>
            <${Ce} value=${e.status} />
          </div>
          <div className="ecard-stage-row">
            <span className="ecard-stage">${Oe(e.current_stage)}</span>
            <span className="ecard-job-id">${e.job_id}</span>
          </div>
          <div className="ecard-actions">
            <${Ge} to=${`/jobs/${e.job_id}`} className="button-link">View Details<//>
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
    `}function ep(e=[]){return e.filter(t=>{let n=String(t?.asset_type||"").toLowerCase();return n==="image_option"||n==="image_preview"}).map((t,n)=>{let r=String(t.version||""),[,a="",o=""]=r.split(":");return{key:t.relative_path||t.public_url||`${t.asset_type}_${n}`,asset_type:t.asset_type,relative_path:t.relative_path||"",url:t.public_url||t.asset_url||"",theme_style:a||"minimal",text_alignment:o||"center",approved:!!t.approved,created_at:t.created_at}}).filter(t=>t.url)}function Qv(e,t=[]){let n=Array.isArray(t)?t.filter(r=>{let a=String(r?.asset_type||"").toLowerCase();return a==="final_preview"||a==="final_png"}):[];return Qo(e,n).map((r,a)=>({key:`${r.source}:${a}`,label:r.label,url:r.url,source:r.source}))}function Yv(e,t){let n=Yo(e),r=Number(n.selected_text_candidate_id||0);if(r>0){let a=t.find(o=>Number(o.id)===r);if(a)return a}return t.find(a=>a.is_selected)||t[0]||null}function Gv(e,t){let n=Yo(e),r=String(n.selected_image_relative_path||""),a=ep(t);if(r){let l=a.find(i=>i.relative_path===r);if(l)return l}let o=a.find(l=>l.approved);return o||a.find(l=>l.asset_type==="image_preview")||a[0]||null}function Xv(e){let t=String(e?.status||"").toLowerCase();return t==="completed"?"completed":t.includes("reject")||t.includes("timeout")||t.includes("failed")?"failed":t==="archived"?"archived":"in_progress"}function qv(){let e=jt(),[t,n]=(0,R.useState)([]),[r,a]=(0,R.useState)(null),[o,l]=(0,R.useState)([]),[i,s]=(0,R.useState)(null),[u,m]=(0,R.useState)(!1),[h,v]=(0,R.useState)(!1),[E,k]=(0,R.useState)(!1),[w,g]=(0,R.useState)(""),[d,c]=(0,R.useState)(""),[f,_]=(0,R.useState)(""),[T,x]=(0,R.useState)(""),[L,P]=(0,R.useState)(""),[I,A]=(0,R.useState)(!1),[z,je]=(0,R.useState)(!1),[O,ce]=(0,R.useState)("today"),[J,fe]=(0,R.useState)([]),[C,S]=(0,R.useState)(!1),[M,Q]=(0,R.useState)(!1),[K,Ue]=(0,R.useState)(""),[pe,Xe]=(0,R.useState)({theme_name:"Internal Launch Sprint",audience:"operations team",cultural_context:"global",tone_style:"conversational",tone_funny_pct:20,tone_emotion_pct:80,copy_style:"minimal",target_words:14,cards_per_theme:10,notes:""}),[xe,we]=(0,R.useState)(ua()),ie=i&&typeof i=="object"&&i.theme||null,Ut=(0,R.useMemo)(()=>{let $=0,j=0,V=0;return t.forEach(Se=>{let Te=String(Se.status||"").toLowerCase();if(Te==="completed"){j+=1;return}if(Te.includes("reject")||Te.includes("timeout")||Te.includes("failed")){V+=1;return}Te!=="archived"&&($+=1)}),{active:$,completed:j,failed:V}},[t]),pa=(0,R.useMemo)(()=>t.filter($=>$.final_preview_url||$.final_asset_urls&&$.final_asset_urls.png||$.image_preview_url).slice(0,6),[t]),sr=(0,R.useMemo)(()=>t.filter($=>{let j=String($.status||"").toLowerCase();return j!=="completed"&&!j.includes("failed")&&!j.includes("reject")&&!j.includes("timeout")&&j!=="archived"}).slice(0,8),[t]),ur=(0,R.useMemo)(()=>t.filter($=>{let j=String($.status||"").toLowerCase();return j.includes("failed")||j.includes("reject")||j.includes("timeout")}).slice(0,8),[t]),cr=(0,R.useMemo)(()=>t.filter($=>Hv($)).slice(0,6),[t]);async function p(){m(!0),v(!0),k(!0),g(""),c(""),_(""),x("");let[$,j,V,Se]=await Promise.allSettled([U("/api/jobs?limit=50"),U("/api/storage/summary"),U("/api/themes/schedule"),U("/api/themes/today")]),Te="";if($.status==="fulfilled"?n(Array.isArray($.value)?$.value:[]):(n([]),g(bn("jobs",$.reason))),j.status==="fulfilled"?a(j.value||null):(a(null),c(bn("storage summary",j.reason))),V.status==="fulfilled"){let Ds=Array.isArray(V.value)?[]:Array.isArray(V.value?.week_schedule)?V.value.week_schedule:[];l(Ds),Ds.length===0&&(Te="Theme schedule not configured yet")}else l([]),Cn(V.reason)?Te="Theme Factory not configured yet":_(bn("Theme Factory schedule",V.reason));Se.status==="fulfilled"?(s(Se.value||null),!Te&&Se.value?.resolved===!1?Te=Se.value?.message||"Theme schedule not configured yet":!Te&&!Se.value?.theme&&(Te="Theme schedule not configured yet")):(s(null),Cn(Se.reason)?Te=Te||"Theme schedule not configured yet":_(bn("today's theme",Se.reason))),x(Te),m(!1),v(!1),k(!1);let ap=V.status!=="fulfilled"&&!Cn(V.reason),op=Se.status!=="fulfilled"&&!Cn(Se.reason),lp=$.status!=="fulfilled"||j.status!=="fulfilled"||ap||op;P(lp?`Refresh completed with errors at ${new Date().toLocaleTimeString()}`:`Refreshed ${new Date().toLocaleTimeString()}`)}(0,R.useEffect)(()=>{p()},[]);async function N($){$.preventDefault(),S(!0),g("");try{let j=Iv(pe),V=await U("/api/jobs/start",{method:"POST",body:JSON.stringify(j)});A(!1);try{await Cs(V.job_id),P(`Created ${V.job_id} and built initial card options`)}catch(Se){P(`Created ${V.job_id}. Studio follow-up is needed: ${Se.message||"auto-build failed"}`)}await p(),e(`/studio/${V.job_id}`)}catch(j){g(j.message||"Unable to create new job")}finally{S(!1)}}function H($,j){Xe(V=>({...V,[$]:j}))}function se(){let $=Mv(ie);$&&Xe(j=>({...j,...$}))}async function ot(){if(J.length>0)return J;let $=await U("/api/themes"),j=Array.isArray($)?$:[];return fe(j),j}async function ma($){if(ce($),_(""),we(ua(ie)),$==="manual"){try{let V=(await ot())[0]||null;we({...ua(V),theme_key:V?.theme_key||""}),je(!0)}catch(j){_(j.message||"Unable to load theme catalog")}return}je(!0)}async function np($){$.preventDefault(),Q(!0),_("");try{let j=qf(xe),V=O==="manual"?await U("/api/jobs/start-from-theme",{method:"POST",body:JSON.stringify({theme_key:xe.theme_key,...j})}):await U("/api/jobs/create-daily-theme-job",{method:"POST",body:JSON.stringify(j)});je(!1);try{await Cs(V.job_id),P(O==="manual"?`Created ${V.job_id} from ${xe.theme_key} and built initial card options`:`Created ${V.job_id} from today's theme and built initial card options`)}catch(Se){P(O==="manual"?`Created ${V.job_id} from ${xe.theme_key}. Studio follow-up is needed: ${Se.message||"auto-build failed"}`:`Created ${V.job_id} from today's theme. Studio follow-up is needed: ${Se.message||"auto-build failed"}`)}await p(),e(`/studio/${V.job_id}`)}catch(j){_(j.message||(O==="manual"?"Unable to create theme job":"Unable to create today's themed job"))}finally{Q(!1)}}function rp($){let j=J.find(V=>V.theme_key===$);we(V=>({...V,theme_key:$,tone_funny_pct:Number(j?.default_funny_pct??V.tone_funny_pct??20)}))}async function Ts($){Ue(`archive:${$.job_id}`),g("");try{await U(`/api/jobs/${$.job_id}/archive`,{method:"POST"}),P(`Archived ${$.job_id}`),await p()}catch(j){g(j.message||"Unable to archive job")}finally{Ue("")}}async function Ps($){if(window.confirm(`Delete ${$.job_id} and associated files?`)){Ue(`delete:${$.job_id}`),g("");try{await U(`/api/jobs/${$.job_id}`,{method:"DELETE"}),P(`Deleted ${$.job_id}`),await p()}catch(V){g(V.message||"Unable to delete job")}finally{Ue("")}}}return y`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Home</p>
            <h1 className="page-title">eCard Studio Home</h1>
            <p className="page-description">
              Card-first controls for today&apos;s theme, manual theme runs, and recent eCard output.
            </p>
          </div>
          <div className="inline-actions">
            <button
              type="button"
              className="button primary"
              onClick=${()=>ma("today")}
              disabled=${M||E||!ie}
            >
              Generate Today&apos;s Cards
            </button>
            <button type="button" className="button" onClick=${()=>ma("manual")}>Generate From Theme</button>
            <button type="button" className="button" onClick=${()=>A(!0)}>Create New Card Job</button>
            <button
              type="button"
              className="button"
              onClick=${p}
              disabled=${u||h||E}
            >
              Refresh
            </button>
          </div>
        </header>

        ${L?y`<p className="status-line">${L}</p>`:null}

        ${u||h||E||w||d||f?y`
              <div className="status-stack">
                ${u?y`<div className="status-panel warning">Loading jobs from /api/jobs...</div>`:null}
                ${h?y`<div className="status-panel warning">Loading storage summary from /api/storage/summary...</div>`:null}
                ${E?y`<div className="status-panel warning">Loading Theme Factory data from /api/themes/schedule...</div>`:null}
                ${w?y`<div className="status-panel error">Unable to load jobs: ${w}</div>`:null}
                ${d?y`<div className="status-panel error">Unable to load storage summary: ${d}</div>`:null}
                ${f?y`<div className="status-panel error">Theme error: ${f}</div>`:null}
              </div>
            `:null}

        <section className="cards-grid">
          <article className="summary-card">
            <p className="summary-label">Today&apos;s Theme</p>
            <p className="summary-value summary-value-small">${ie?ie.theme_name:"Unavailable"}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">In Progress</p>
            <p className="summary-value">${u?"...":sr.length}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Failed Jobs</p>
            <p className="summary-value">${u?"...":ur.length}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Favorite Cards</p>
            <p className="summary-value">${u?"...":cr.length}</p>
          </article>
        </section>

        <section className="section-panel home-hero">
          <div className="section-head">
            <div>
              <h2 className="section-title">Today&apos;s Theme</h2>
              <p className="section-copy">
                ${ie?`${ie.theme_name} | ${Rs("minimal")} card flow with ${Oe(i?.weekday)} scheduling`:T||"Theme schedule not configured yet."}
              </p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button primary"
                onClick=${()=>ma("today")}
                disabled=${M||E||!ie}
              >
                ${M&&O==="today"?"Generating...":"Generate Today&apos;s Cards"}
              </button>
              <button type="button" className="button" onClick=${()=>ma("manual")}>Generate From Theme</button>
              <button type="button" className="button" onClick=${()=>A(!0)}>Create New Card Job</button>
            </div>
          </div>
          ${ie?y`
                <div className="key-value-grid">
                  <article className="key-card">
                    <p className="key-label">theme_name</p>
                    <p className="key-value">${ie.theme_name}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">bucket</p>
                    <p className="key-value">${Xf(ie.theme_bucket)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">tone_style</p>
                    <p className="key-value">${ie.tone_style}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">audience</p>
                    <p className="key-value">${ie.audience}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">default run</p>
                    <p className="key-value">10 cards | 8-18 words</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">storage</p>
                    <p className="key-value">${h?"...":r?Av(r.total_bytes):"Unavailable"}</p>
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
          ${u?y`<p className="empty-state">Loading recent eCards...</p>`:pa.length===0?y`<p className="empty-state">No rendered cards yet. Generate today&apos;s cards or run a theme manually.</p>`:y`
                  <div className="ecard-grid">
                    ${pa.map($=>y`
                        <${Jf}
                          key=${$.job_id}
                          job=${$}
                          actionState=${K}
                          onArchive=${Ts}
                          onDelete=${Ps}
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
          ${cr.length===0?y`<p className="empty-state">No favorite cards yet. Mark a final card from Studio.</p>`:y`
                <div className="ecard-grid">
                  ${cr.map($=>y`
                      <${Jf}
                        key=${$.job_id}
                        job=${$}
                        actionState=${K}
                        onArchive=${Ts}
                        onDelete=${Ps}
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
            ${sr.length===0?y`<p className="empty-state">No jobs in progress.</p>`:y`
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
                        ${sr.map($=>y`
                            <tr key=${$.job_id}>
                              <td><${Ge} className="job-link" to=${`/studio/${$.job_id}`}>${$.job_id}<//></td>
                              <td>${$.theme_name}</td>
                              <td><${Ce} value=${$.status} /></td>
                              <td>${Ve($.updated_at)}</td>
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
            ${ur.length===0?y`<p className="empty-state">No failed jobs.</p>`:y`
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
                        ${ur.map($=>y`
                            <tr key=${$.job_id}>
                              <td><${Ge} className="job-link" to=${`/studio/${$.job_id}`}>${$.job_id}<//></td>
                              <td>${$.theme_name}</td>
                              <td><${Ce} value=${$.status} /></td>
                              <td>${Jo($.last_error_message||"-",80)}</td>
                            </tr>
                          `)}
                      </tbody>
                    </table>
                  </div>
                `}
          </section>
        </section>

        ${I?y`
              <div className="modal-backdrop" onClick=${()=>A(!1)}>
                <section className="modal" onClick=${$=>$.stopPropagation()}>
                  <h2 className="section-title">Create New Card Job</h2>
                  <p className="section-copy">Starts a new card run with short, crisp copy defaults and opens Studio.</p>
                  <form onSubmit=${N}>
                    <div className="form-grid">
                      <div className="form-field full">
                        <label htmlFor="themeName">Theme Name</label>
                        <input
                          id="themeName"
                          value=${pe.theme_name}
                          onInput=${$=>H("theme_name",$.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="audience">Audience</label>
                        <input
                          id="audience"
                          value=${pe.audience}
                          onInput=${$=>H("audience",$.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="culturalContext">Cultural Context</label>
                        <input
                          id="culturalContext"
                          value=${pe.cultural_context}
                          onInput=${$=>H("cultural_context",$.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="toneStyle">Tone Style</label>
                        <select
                          id="toneStyle"
                          value=${pe.tone_style}
                          onChange=${$=>H("tone_style",$.target.value)}
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
                          value=${pe.tone_funny_pct}
                          onInput=${$=>H("tone_funny_pct",$.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="emotionPct">Emotion %</label>
                        <input
                          id="emotionPct"
                          type="number"
                          min="0"
                          max="100"
                          value=${pe.tone_emotion_pct}
                          onInput=${$=>H("tone_emotion_pct",$.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="copyStyle">Copy Style</label>
                        <select
                          id="copyStyle"
                          value=${pe.copy_style}
                          onChange=${$=>H("copy_style",$.target.value)}
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
                          value=${pe.target_words}
                          onInput=${$=>H("target_words",$.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="cardsPerTheme">Cards Per Theme</label>
                        <input
                          id="cardsPerTheme"
                          type="number"
                          min="1"
                          max="50"
                          value=${pe.cards_per_theme}
                          onInput=${$=>H("cards_per_theme",$.target.value)}
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
                          value=${pe.notes}
                          onInput=${$=>H("notes",$.target.value)}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button
                        type="button"
                        className="button"
                        onClick=${se}
                        disabled=${!ie}
                      >
                        Use Today's Theme
                      </button>
                      <button type="submit" className="button primary" disabled=${C}>
                        ${C?"Creating...":"Create Job"}
                      </button>
                      <button type="button" className="button" onClick=${()=>A(!1)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}

        ${z?y`
              <div className="modal-backdrop" onClick=${()=>je(!1)}>
                <section className="modal" onClick=${$=>$.stopPropagation()}>
                  <h2 className="section-title">${O==="manual"?"Generate From Theme":"Use Today's Theme"}</h2>
                  <p className="section-copy">
                    ${O==="manual"?"Start a workflow job from any selected Theme Factory record.":ie?`Resolved theme: ${ie.theme_name}`:"Use today's resolved theme."}
                  </p>
                  <form onSubmit=${np}>
                    <div className="form-grid">
                      ${O==="manual"?y`
                            <div className="form-field full">
                              <label htmlFor="runThemeKey">Theme</label>
                              <select
                                id="runThemeKey"
                                value=${xe.theme_key}
                                onChange=${$=>rp($.target.value)}
                                required
                              >
                                ${J.map($=>y`<option key=${$.id} value=${$.theme_key}>${$.theme_name}</option>`)}
                              </select>
                            </div>
                          `:null}
                      <div className="form-field">
                        <label htmlFor="runCopyStyle">Copy Style</label>
                        <select
                          id="runCopyStyle"
                          value=${xe.copy_style}
                          onChange=${$=>we(j=>({...j,copy_style:$.target.value}))}
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
                          value=${xe.target_words}
                          onInput=${$=>we(j=>({...j,target_words:$.target.value}))}
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
                          value=${xe.tone_funny_pct}
                          onInput=${$=>we(j=>({...j,tone_funny_pct:$.target.value}))}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="runCardsPerTheme">Cards Per Theme</label>
                        <input
                          id="runCardsPerTheme"
                          type="number"
                          min="1"
                          max="50"
                          value=${xe.cards_per_theme}
                          onInput=${$=>we(j=>({...j,cards_per_theme:$.target.value}))}
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
                          value=${xe.notes}
                          onInput=${$=>we(j=>({...j,notes:$.target.value}))}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${M}>
                        ${M?"Creating...":O==="manual"?"Generate From Theme":"Use Today's Theme"}
                      </button>
                      <button type="button" className="button" onClick=${()=>je(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}
      </section>
    `}function Zv(){let e=jt(),{jobId:t}=Ho(),[n,r]=(0,R.useState)(null),[a,o]=(0,R.useState)([]),[l,i]=(0,R.useState)([]),[s,u]=(0,R.useState)([]),[m,h]=(0,R.useState)([]),[v,E]=(0,R.useState)([]),[k,w]=(0,R.useState)(!1),[g,d]=(0,R.useState)(""),[c,f]=(0,R.useState)(""),[_,T]=(0,R.useState)(""),x=(0,R.useCallback)(async(S={})=>{if(!t)return;let M=!!S.quiet;M||w(!0),f("");try{let[Q,K,Ue,pe,Xe]=await Promise.all([U(`/api/jobs/${t}`),U(`/api/jobs/${t}/assets`),U(`/api/jobs/${t}/events`),U(`/api/jobs/${t}/candidates`),U(`/api/jobs/${t}/shortlist`)]);r(Q||null),o(Array.isArray(K)?K:[]),i(Array.isArray(Ue)?Ue:[]);let xe=Array.isArray(pe)?pe:[],we=Array.isArray(Xe)?Xe:[];u(xe),h(we);let ie=we.filter(Ut=>Ut.is_selected).map(Ut=>Number(Ut.candidate_id)).filter(Ut=>Number.isInteger(Ut));E(ie.length>0?ie:we[0]?[Number(we[0].candidate_id)]:[])}catch(Q){f(Q.message||"Unable to load job detail")}finally{M||w(!1)}},[t]);(0,R.useEffect)(()=>{x()},[x]),(0,R.useEffect)(()=>{if(!t)return;let S=window.setInterval(()=>{document.visibilityState==="visible"&&x({quiet:!0})},1e4);return()=>window.clearInterval(S)},[t,x]);let L=(0,R.useMemo)(()=>{if(!n)return[];let S=String(n.status||"").toLowerCase(),M=n.content_preview?"completed":S.startsWith("content")?"in_progress":"pending",Q=n.image_preview_url||S.startsWith("final")||S==="completed"?"completed":S.startsWith("image")?"in_progress":"pending",K=n.final_asset_urls&&(n.final_asset_urls.png||n.final_asset_urls.pdf)?"completed":S.startsWith("final")?"in_progress":S==="completed"?"completed":"pending";return[{label:"content_generation_status",value:M},{label:"content_approval_status",value:n.content_approval_status||"pending"},{label:"image_generation_status",value:Q},{label:"image_approval_status",value:n.image_approval_status||"pending"},{label:"final_render_status",value:K},{label:"final_approval_status",value:n.final_approval_status||"pending"}]},[n]),P=(0,R.useMemo)(()=>n?Qo(n,a):[],[n,a]),I=da(P),A=(0,R.useMemo)(()=>n?Qo({image_preview_url:n.image_preview_url,content_preview_url:n.content_preview_url},a.filter(S=>String(S?.asset_type||"").toLowerCase()==="image_preview")):[],[n,a]),z=da(A),je=(0,R.useMemo)(()=>a.filter(S=>String(S?.asset_type||"").toLowerCase()==="shortlist_preview").map((S,M)=>({label:`Shortlist Preview ${M+1}`,url:S.public_url||S.asset_url,source:`shortlist_preview:${M}`})).filter(S=>S.url),[a]);async function O(S,M,Q){if(t){d(S),f("");try{let K=await U(M,{method:"POST"});T(Q||`${K.job_id} updated`),await x()}catch(K){f(K.message||"Unable to update stage")}finally{d("")}}}function ce(S,M){E(Q=>{let K=new Set(Q);return M?K.add(S):K.delete(S),Array.from(K)})}async function J(){if(t){d("render-shortlist"),f("");try{let S=await U(`/api/jobs/${t}/render-shortlist`,{method:"POST",body:JSON.stringify({candidate_ids:v})});T(`Rendered ${S.rendered_count} shortlist preview card(s)`),await x()}catch(S){f(S.message||"Unable to render shortlist")}finally{d("")}}}async function fe(){if(t){d("archive"),f("");try{let S=await U(`/api/jobs/${t}/archive`,{method:"POST"});T(`Job archived (${Ve(S.updated_at)})`),await x()}catch(S){f(S.message||"Unable to archive job")}finally{d("")}}}async function C(){if(!(!t||!window.confirm(`Delete ${t} and associated files?`))){d("delete"),f("");try{await U(`/api/jobs/${t}`,{method:"DELETE"}),e("/")}catch(M){f(M.message||"Unable to delete job")}finally{d("")}}}return y`
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
              onClick=${fe}
              disabled=${g==="archive"}
            >
              ${g==="archive"?"Archiving...":"Archive Job"}
            </button>
            <button
              className="button danger"
              type="button"
              onClick=${C}
              disabled=${g==="delete"}
            >
              ${g==="delete"?"Deleting...":"Delete Job + Files"}
            </button>
          </div>
        </header>

        ${c?y`<p className="status-line error">${c}</p>`:null}
        ${_?y`<p className="status-line">${_}</p>`:null}
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
                      onClick=${()=>O("rerun-content",`/api/jobs/${t}/rerun/content`,`Text rerun for ${t}`)}
                      disabled=${g==="rerun-content"}
                    >
                      ${g==="rerun-content"?"Working...":"Regenerate Text"}
                    </button>
                    <button
                      type="button"
                      className="button"
                      onClick=${()=>O("rerun-image",`/api/jobs/${t}/rerun/image`,`Image rerun for ${t}`)}
                      disabled=${g==="rerun-image"}
                    >
                      ${g==="rerun-image"?"Working...":"Regenerate Image"}
                    </button>
                    <button
                      type="button"
                      className="button primary"
                      onClick=${()=>O("rerun-card",`/api/jobs/${t}/rerun/final-render`,`Card rerun for ${t}`)}
                      disabled=${g==="rerun-card"}
                    >
                      ${g==="rerun-card"?"Working...":"Regenerate Card"}
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
                    ${z.currentCandidate?y`<img className="studio-current-image" src=${z.currentCandidate.url} alt="Selected image" loading="lazy" onError=${z.handleError} />`:y`<p className="empty-state compact">No image selected yet.</p>`}
                  </article>
                  <article className="key-card">
                    <p className="key-label">final card preview</p>
                    ${I.currentCandidate?y`<img className="studio-current-image" src=${I.currentCandidate.url} alt="Final card preview" loading="lazy" onError=${I.handleError} />`:y`<p className="empty-state compact">No final card rendered yet.</p>`}
                  </article>
                </div>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Stage and Status Breakdown</h2>
                    <p className="section-copy">Workflow state remains available here, but Studio is the primary operator surface.</p>
                  </div>
                  <${Ce} value=${n.status} />
                </div>
                <div className="key-value-grid">
                  ${L.map(S=>y`
                      <article className="key-card" key=${S.label}>
                        <p className="key-label">${S.label}</p>
                        <p className="key-value"><${Ce} value=${S.value} /></p>
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
                    <p className="key-value">${Ve(n.last_stage_started_at)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">last_stage_finished_at</p>
                    <p className="key-value">${Ve(n.last_stage_finished_at)}</p>
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
                  <${Ce} value=${n.content_approval_status||"pending"} />
                </div>
                ${n.content_preview?y`<div className="content-preview-block">${n.content_preview}</div>`:y`<p className="empty-state">No content preview stored yet.</p>`}
                <div className="inline-actions padded-actions">
                  <button
                    type="button"
                    className="button primary"
                    onClick=${()=>O("regenerate-content",`/api/jobs/${t}/regenerate-content`,`Content regenerated for ${t}`)}
                    disabled=${g==="regenerate-content"}
                  >
                    ${g==="regenerate-content"?"Working...":"Regenerate Text"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>O("approve-content",`/api/jobs/${t}/approve-content`,`Content approved for ${t}`)}
                    disabled=${g==="approve-content"||!n.content_preview}
                  >
                    ${g==="approve-content"?"Working...":"Approve Content"}
                  </button>
                  <button
                    type="button"
                    className="button danger"
                    onClick=${()=>O("reject-content",`/api/jobs/${t}/reject-content`,`Content rejected for ${t}`)}
                    disabled=${g==="reject-content"||!n.content_preview}
                  >
                    ${g==="reject-content"?"Working...":"Reject Content"}
                  </button>
                </div>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Image Review</h2>
                    <p className="section-copy">The main control here is to generate or rerun the image. Approval buttons remain available as operator overrides.</p>
                  </div>
                  <${Ce} value=${n.image_approval_status||"pending"} />
                </div>
                ${z.currentCandidate?y`
                      <div className="image-grid image-grid-single">
                        <article className="image-card">
                          <a href=${z.currentCandidate.url} target="_blank" rel="noreferrer">
                            <img
                              src=${z.currentCandidate.url}
                              alt="Image Preview"
                              loading="lazy"
                              onError=${z.handleError}
                            />
                          </a>
                          <p className="image-caption">Image Preview</p>
                        </article>
                      </div>
                    `:z.exhausted?y`<p className="empty-state">Preview unavailable.</p>`:y`<p className="empty-state">No image preview available yet.</p>`}
                <div className="inline-actions padded-actions">
                  <button
                    type="button"
                    className="button primary"
                    onClick=${()=>O("generate-image",`/api/jobs/${t}/generate-image`,`Image generated for ${t}`)}
                    disabled=${g==="generate-image"||n.content_approval_status!=="approved"}
                  >
                    ${g==="generate-image"?"Working...":"Generate Image"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>O("regenerate-image",`/api/jobs/${t}/regenerate-image`,`Image regenerated for ${t}`)}
                    disabled=${g==="regenerate-image"||n.content_approval_status!=="approved"}
                  >
                    ${g==="regenerate-image"?"Working...":"Regenerate Image"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>O("approve-image",`/api/jobs/${t}/approve-image`,`Image approved for ${t}`)}
                    disabled=${g==="approve-image"||!n.image_preview_url}
                  >
                    ${g==="approve-image"?"Working...":"Approve Image"}
                  </button>
                  <button
                    type="button"
                    className="button danger"
                    onClick=${()=>O("reject-image",`/api/jobs/${t}/reject-image`,`Image rejected for ${t}`)}
                    disabled=${g==="reject-image"||!n.image_preview_url}
                  >
                    ${g==="reject-image"?"Working...":"Reject Image"}
                  </button>
                </div>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Final Card Review</h2>
                    <p className="section-copy">Use rerun when the card layout or polish is off. Approval stays available below as a secondary control.</p>
                  </div>
                  <${Ce} value=${n.final_approval_status||"pending"} />
                </div>
                ${I.currentCandidate?y`
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
                    `:I.exhausted?y`<p className="empty-state">Preview unavailable.</p>`:y`<p className="empty-state">No final card preview available yet.</p>`}
                <div className="inline-actions padded-actions">
                  <button
                    type="button"
                    className="button primary"
                    onClick=${()=>O("render-final",`/api/jobs/${t}/render-final`,`Final rendered for ${t}`)}
                    disabled=${g==="render-final"||n.image_approval_status!=="approved"}
                  >
                    ${g==="render-final"?"Working...":"Regenerate Card"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${()=>O("approve-final",`/api/jobs/${t}/approve-final`,`Final approved for ${t}`)}
                    disabled=${g==="approve-final"||!n.final_preview_url}
                  >
                    ${g==="approve-final"?"Working...":"Approve Final"}
                  </button>
                  <button
                    type="button"
                    className="button danger"
                    onClick=${()=>O("reject-final",`/api/jobs/${t}/reject-final`,`Final rejected for ${t}`)}
                    disabled=${g==="reject-final"||!n.final_preview_url}
                  >
                    ${g==="reject-final"?"Working...":"Reject Final"}
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
                          ${l.slice().reverse().map((S,M)=>y`
                                <li key=${`${S.event_type}_${M}`} className="list-item">
                                  <p className="event-type">${S.event_type}</p>
                                  <p className="event-meta">${Ve(S.created_at)}</p>
                                  ${Vf(S.event_payload_json)?y`<p className="event-meta">${Vf(S.event_payload_json)}</p>`:null}
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
                              ${a.map((S,M)=>y`
                                  <tr key=${`${S.asset_type}_${M}`}>
                                    <td>${S.asset_type}</td>
                                    <td>
                                      ${S.asset_url?y`<a className="job-link" href=${S.asset_url} target="_blank" rel="noreferrer">open</a>`:"-"}
                                    </td>
                                    <td><code>${S.relative_path||"-"}</code></td>
                                    <td><code>${S.absolute_path||"-"}</code></td>
                                    <td><${Ce} value=${S.approved?"approved":"pending"} /></td>
                                    <td>${Ve(S.created_at)}</td>
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
                              ${s.map(S=>y`
                                  <tr key=${S.id||`${S.model}_${S.text}`}>
                                    <td>${S.model}</td>
                                    <td>${Number(S.raw_score||0).toFixed(3)}</td>
                                    <td>${Number(S.judged_score??S.judge_score??0).toFixed(3)}</td>
                                    <td><${Ce} value=${S.is_shortlisted?"shortlisted":"pooled"} /></td>
                                    <td><${Ce} value=${S.is_selected?"selected":"not_selected"} /></td>
                                    <td>${Jo(S.text||S.content_text,200)}</td>
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
                    <button type="button" className="button primary" onClick=${J} disabled=${g==="render-shortlist"||m.length===0}>
                      ${g==="render-shortlist"?"Rendering...":"Render Shortlist"}
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
                              ${m.map(S=>y`
                                  <tr key=${S.candidate_id}>
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked=${v.includes(Number(S.candidate_id))}
                                        onChange=${M=>ce(Number(S.candidate_id),M.target.checked)}
                                      />
                                    </td>
                                    <td>${S.rank}</td>
                                    <td>${S.model}</td>
                                    <td>${Number(S.score||0).toFixed(3)}</td>
                                    <td>${Jo(S.text,220)}</td>
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
                  ${P.length===0&&je.length===0?y`<p className="empty-state">No preview variants available yet.</p>`:y`
                        <div className="image-grid">
                          ${[...P,...je].map(S=>y`
                              <${Jv} key=${S.url} image=${S} />
                            `)}
                        </div>
                      `}
                </section>
              </details>
            `:y`<p className="empty-state">${k?"Loading job details...":"Job not found."}</p>`}
      </section>
    `}function ey(){let e=jt(),[t,n]=(0,R.useState)([]),[r,a]=(0,R.useState)({week_schedule:[],month_schedule:[],active_overrides:[]}),[o,l]=(0,R.useState)(null),[i,s]=(0,R.useState)(!1),[u,m]=(0,R.useState)(""),[h,v]=(0,R.useState)(""),[E,k]=(0,R.useState)(""),[w,g]=(0,R.useState)(""),[d,c]=(0,R.useState)(!1),[f,_]=(0,R.useState)(!1),[T,x]=(0,R.useState)(!1),[L,P]=(0,R.useState)(!1),[I,A]=(0,R.useState)(null),[z,je]=(0,R.useState)(null),[O,ce]=(0,R.useState)({theme_key:"",theme_name:"",description:"",theme_bucket:"everyday",theme_type:"evergreen",cultural_context:"global",tone_style:"conversational",default_funny_pct:20,default_emotion_pct:80,default_audience:"general audience",default_visual_style:"minimal",is_active:!0,priority:0}),[J,fe]=(0,R.useState)({theme_id:"",schedule_type:"weekly_recurring",start_date:"",end_date:"",weekday_mask:"monday",month_mask:"",region:"",country:"",is_active:!0,priority:0,notes:""}),[C,S]=(0,R.useState)({theme_id:"",override_scope:"editorial",start_at:"",end_at:"",reason:"",force_top_priority:!0,created_by:"console_admin"}),[M,Q]=(0,R.useState)(ua()),K=o&&typeof o=="object"&&o.theme||null,Ue=(0,R.useMemo)(()=>t.reduce((p,N)=>{let H=String(N.theme_bucket||"everyday");return p[H]=(p[H]||0)+1,p},{everyday:0,occasion:0,current_event:0}),[t]),pe=(0,R.useMemo)(()=>[{key:"everyday",title:"Everyday Themes",description:"Recurring weekday themes that keep the console stocked with steady daily runs.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="everyday")},{key:"occasion",title:"Occasion Themes",description:"Date-range and seasonal campaign themes such as Ramadan, Holi, and Valentine's Week.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="occasion")},{key:"current_event",title:"Current Event Themes",description:"Editorial and trend-driven themes that are intended to be activated through overrides.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="current_event")}],[t]);async function Xe(){s(!0),m(""),v("");let[p,N,H]=await Promise.allSettled([U("/api/themes"),U("/api/themes/today"),U("/api/themes/schedule")]);if(p.status==="fulfilled"){let se=Array.isArray(p.value)?p.value:[];n(se),se.length>0&&(fe(ot=>({...ot,theme_id:String(ot.theme_id||se[0].id)})),S(ot=>({...ot,theme_id:String(ot.theme_id||se[0].id)}))),se.length===0&&v("Theme schedule not configured yet")}else n([]),Cn(p.reason)?v("Theme schedule not configured yet"):m(bn("theme catalog",p.reason));if(N.status==="fulfilled"?(l(N.value||null),N.value?.resolved===!1&&v(se=>se||N.value?.message||"No theme resolved yet")):(l(null),Cn(N.reason)?v(se=>se||"No theme resolved yet"):m(se=>se||bn("today's theme",N.reason))),H.status==="fulfilled"){if(Array.isArray(H.value)){a({week_schedule:[],month_schedule:[],active_overrides:[]}),v(se=>se||"Theme schedule not configured yet"),s(!1);return}a({week_schedule:Array.isArray(H.value?.week_schedule)?H.value.week_schedule:[],month_schedule:Array.isArray(H.value?.month_schedule)?H.value.month_schedule:[],active_overrides:Array.isArray(H.value?.active_overrides)?H.value.active_overrides:[]})}else a({week_schedule:[],month_schedule:[],active_overrides:[]}),Cn(H.reason)?v(se=>se||"Theme schedule not configured yet"):m(se=>se||bn("theme schedule",H.reason));s(!1)}(0,R.useEffect)(()=>{Xe()},[]);function xe(p=null){A(p?p.id:null),ce({theme_key:p?.theme_key||"",theme_name:p?.theme_name||"",description:p?.description||"",theme_bucket:p?.theme_bucket||"everyday",theme_type:p?.theme_type||"evergreen",cultural_context:p?.cultural_context||"global",tone_style:p?.tone_style||"conversational",default_funny_pct:p?.default_funny_pct??20,default_emotion_pct:p?.default_emotion_pct??80,default_audience:p?.default_audience||"general audience",default_visual_style:p?.default_visual_style||"minimal",is_active:p?.is_active??!0,priority:p?.priority??0}),c(!0)}function we(p=null){je(p?p.id:null),fe({theme_id:String(p?.theme_id||t[0]?.id||""),schedule_type:p?.schedule_type||"weekly_recurring",start_date:Wf(p?.start_date),end_date:Wf(p?.end_date),weekday_mask:Array.isArray(p?.weekday_mask)?p.weekday_mask.join(", "):"monday",month_mask:Array.isArray(p?.month_mask)?p.month_mask.join(", "):"",region:p?.region||"",country:p?.country||"",is_active:p?.is_active??!0,priority:p?.priority??0,notes:p?.notes||""}),_(!0)}function ie(p=null){let N=new Date,H=new Date(N.getTime()+1440*60*1e3);S({theme_id:String(p||K?.theme_id||t[0]?.id||""),override_scope:"editorial",start_at:Kf(N.toISOString()),end_at:Kf(H.toISOString()),reason:"",force_top_priority:!0,created_by:"console_admin"}),x(!0)}async function Ut(p){p.preventDefault(),g("save-theme"),m("");try{let N={theme_key:String(O.theme_key||"").trim(),theme_name:String(O.theme_name||"").trim(),description:String(O.description||"").trim()||null,theme_bucket:O.theme_bucket,theme_type:O.theme_type,cultural_context:String(O.cultural_context||"").trim()||null,tone_style:String(O.tone_style||"").trim(),default_funny_pct:Number(O.default_funny_pct||0),default_emotion_pct:Number(O.default_emotion_pct||0),default_audience:String(O.default_audience||"").trim(),default_visual_style:String(O.default_visual_style||"").trim(),is_active:!!O.is_active,priority:Number(O.priority||0)},H=I?`/api/themes/${I}`:"/api/themes";await U(H,{method:I?"PUT":"POST",body:JSON.stringify(N)}),c(!1),k(I?"Theme updated":"Theme created"),await Xe()}catch(N){m(N.message||"Unable to save theme")}finally{g("")}}async function pa(p){if(window.confirm(`Deactivate theme ${p.theme_name}?`)){g(`delete-theme:${p.id}`),m("");try{await U(`/api/themes/${p.id}`,{method:"DELETE"}),k(`Theme deactivated: ${p.theme_name}`),await Xe()}catch(H){m(H.message||"Unable to delete theme")}finally{g("")}}}async function sr(p){p.preventDefault(),g("save-schedule"),m("");try{let N={theme_id:Number(J.theme_id),schedule_type:J.schedule_type,start_date:J.start_date||null,end_date:J.end_date||null,weekday_mask:Hf(J.weekday_mask),month_mask:Hf(J.month_mask).map(ot=>Number(ot)).filter(ot=>Number.isInteger(ot)),region:String(J.region||"").trim()||null,country:String(J.country||"").trim()||null,is_active:!!J.is_active,priority:Number(J.priority||0),notes:String(J.notes||"").trim()||null},H=z?`/api/themes/schedule/${z}`:"/api/themes/schedule";await U(H,{method:z?"PUT":"POST",body:JSON.stringify(N)}),_(!1),k(z?"Schedule updated":"Schedule created"),await Xe()}catch(N){m(N.message||"Unable to save schedule")}finally{g("")}}async function ur(p){p.preventDefault(),g("save-override"),m("");try{let N={theme_id:Number(C.theme_id),override_scope:String(C.override_scope||"").trim(),start_at:new Date(C.start_at).toISOString(),end_at:new Date(C.end_at).toISOString(),reason:String(C.reason||"").trim()||null,force_top_priority:!!C.force_top_priority,created_by:String(C.created_by||"console_admin").trim()};await U("/api/themes/overrides",{method:"POST",body:JSON.stringify(N)}),x(!1),k("Override created"),await Xe()}catch(N){m(N.message||"Unable to save override")}finally{g("")}}async function cr(p){p&&p.preventDefault(),g("create-today-job"),m("");try{let N=await U("/api/jobs/create-daily-theme-job",{method:"POST",body:JSON.stringify(qf(M))});P(!1);try{await Cs(N.job_id),k(`Created ${N.job_id} from today's theme and opened Studio`)}catch(H){k(`Created ${N.job_id} from today's theme. Studio follow-up is needed: ${H.message||"auto-build failed"}`)}e(`/studio/${N.job_id}`)}catch(N){m(N.message||"Unable to create today's themed job")}finally{g("")}}return y`
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
              onClick=${()=>{Q(ua(K)),P(!0)}}
              disabled=${w==="create-today-job"||!K}
            >
              ${w==="create-today-job"?"Creating...":"Use Today's Theme"}
            </button>
            <button type="button" className="button" onClick=${Xe} disabled=${i}>Refresh</button>
            <${Ge} to="/" className="button-link">Home<//>
          </div>
        </header>

        ${u?y`<div className="status-panel error">${u}</div>`:null}
        ${h?y`<div className="status-panel neutral">${h}</div>`:null}
        ${E?y`<p className="status-line">${E}</p>`:null}
        ${i?y`<div className="status-panel warning">Loading Theme Factory data...</div>`:null}

        <section className="cards-grid">
          <article className="summary-card">
            <p className="summary-label">Everyday Themes</p>
            <p className="summary-value">${Ue.everyday}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Occasion Themes</p>
            <p className="summary-value">${Ue.occasion}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Current Event Themes</p>
            <p className="summary-value">${Ue.current_event}</p>
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
          ${K?y`
                <div className="key-value-grid">
                  <article className="key-card">
                    <p className="key-label">Theme</p>
                    <p className="key-value">${K.theme_name}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Bucket</p>
                    <p className="key-value">${Xf(K.theme_bucket)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Source</p>
                    <p className="key-value">${Oe(o?.source)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Weekday</p>
                    <p className="key-value">${Oe(o?.weekday)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Audience</p>
                    <p className="key-value">${K.audience}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Tone</p>
                    <p className="key-value">${K.tone_style}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Priority</p>
                    <p className="key-value">${K.priority}</p>
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
              <button type="button" className="button primary" onClick=${()=>xe()}>Add Theme</button>
            </div>
          </div>
          ${t.length===0?y`<p className="empty-state">No theme catalog entries found.</p>`:y`
                ${pe.map(p=>y`
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
                                        <td>${Oe(N.theme_type)}</td>
                                        <td>${N.default_audience}</td>
                                        <td>${N.default_visual_style}</td>
                                        <td>${N.priority}</td>
                                        <td><${Ce} value=${N.is_active?"active":"inactive"} /></td>
                                        <td>
                                          <div className="inline-actions">
                                            <button type="button" className="button" onClick=${()=>xe(N)}>Edit</button>
                                            <button
                                              type="button"
                                              className="button danger"
                                              onClick=${()=>pa(N)}
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
              <button type="button" className="button primary" onClick=${()=>we()}>Add Schedule</button>
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
                              <td>${Ve(p.plan_date)}</td>
                              <td>${Oe(p.weekday)}</td>
                              <td>${p.theme?.theme_name||"-"}</td>
                              <td>${Oe(p.source)}</td>
                              <td>${Oe(p.schedule_type)}</td>
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
              <button type="button" className="button primary" onClick=${()=>ie()}>Add Override</button>
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
                              <td>${Oe(p.override_scope)}</td>
                              <td>${Ve(p.start_at)} - ${Ve(p.end_at)}</td>
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
                            <td>${Oe(p.schedule_type)}</td>
                            <td>${p.start_date?Ve(p.start_date):"-"}</td>
                            <td>${p.end_date?Ve(p.end_date):"-"}</td>
                            <td>${(p.weekday_mask||[]).join(", ")||"-"}</td>
                            <td>${p.priority}</td>
                            <td>
                              <button type="button" className="button" onClick=${()=>we(p)}>
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
                    ${K?`Resolved theme: ${K.theme_name}`:"No theme resolved yet."}
                  </p>
                  <form onSubmit=${cr}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="todayCopyStyle">Copy Style</label>
                        <select
                          id="todayCopyStyle"
                          value=${M.copy_style}
                          onChange=${p=>Q(N=>({...N,copy_style:p.target.value}))}
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
                          value=${M.target_words}
                          onInput=${p=>Q(N=>({...N,target_words:p.target.value}))}
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
                          onInput=${p=>Q(N=>({...N,tone_funny_pct:p.target.value}))}
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
                          onInput=${p=>Q(N=>({...N,cards_per_theme:p.target.value}))}
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
                          value=${M.notes}
                          onInput=${p=>Q(N=>({...N,notes:p.target.value}))}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${w==="create-today-job"||!K}>
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
                  <h2 className="section-title">${I?"Edit Theme":"Add Theme"}</h2>
                  <form onSubmit=${Ut}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="themeKey">Theme Key</label>
                        <input id="themeKey" value=${O.theme_key} onInput=${p=>ce(N=>({...N,theme_key:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeNameFactory">Theme Name</label>
                        <input id="themeNameFactory" value=${O.theme_name} onInput=${p=>ce(N=>({...N,theme_name:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeBucket">Theme Bucket</label>
                        <select id="themeBucket" value=${O.theme_bucket} onChange=${p=>ce(N=>({...N,theme_bucket:p.target.value}))}>
                          <option value="everyday">everyday</option>
                          <option value="occasion">occasion</option>
                          <option value="current_event">current event</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeType">Theme Type</label>
                        <select id="themeType" value=${O.theme_type} onChange=${p=>ce(N=>({...N,theme_type:p.target.value}))}>
                          <option value="evergreen">evergreen</option>
                          <option value="calendar">calendar</option>
                          <option value="campaign">campaign</option>
                          <option value="news">news</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeContext">Cultural Context</label>
                        <input id="themeContext" value=${O.cultural_context} onInput=${p=>ce(N=>({...N,cultural_context:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeTone">Tone Style</label>
                        <input id="themeTone" value=${O.tone_style} onInput=${p=>ce(N=>({...N,tone_style:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeAudience">Audience</label>
                        <input id="themeAudience" value=${O.default_audience} onInput=${p=>ce(N=>({...N,default_audience:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeVisual">Visual Style</label>
                        <input id="themeVisual" value=${O.default_visual_style} onInput=${p=>ce(N=>({...N,default_visual_style:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themePriority">Priority</label>
                        <input id="themePriority" type="number" value=${O.priority} onInput=${p=>ce(N=>({...N,priority:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeFunny">Funny %</label>
                        <input id="themeFunny" type="number" min="0" max="100" value=${O.default_funny_pct} onInput=${p=>ce(N=>({...N,default_funny_pct:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeEmotion">Emotion %</label>
                        <input id="themeEmotion" type="number" min="0" max="100" value=${O.default_emotion_pct} onInput=${p=>ce(N=>({...N,default_emotion_pct:p.target.value}))} />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="themeDescription">Description</label>
                        <textarea id="themeDescription" rows="4" value=${O.description} onInput=${p=>ce(N=>({...N,description:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${O.is_active} onChange=${p=>ce(N=>({...N,is_active:p.target.checked}))} />
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
              <div className="modal-backdrop" onClick=${()=>_(!1)}>
                <section className="modal modal-wide" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">${z?"Edit Schedule":"Add Schedule"}</h2>
                  <form onSubmit=${sr}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="scheduleTheme">Theme</label>
                        <select id="scheduleTheme" value=${J.theme_id} onChange=${p=>fe(N=>({...N,theme_id:p.target.value}))} required>
                          ${t.map(p=>y`<option key=${p.id} value=${p.id}>${p.theme_name}</option>`)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleType">Schedule Type</label>
                        <select id="scheduleType" value=${J.schedule_type} onChange=${p=>fe(N=>({...N,schedule_type:p.target.value}))}>
                          <option value="single_day">single_day</option>
                          <option value="date_range">date_range</option>
                          <option value="weekly_recurring">weekly_recurring</option>
                          <option value="monthly_recurring">monthly_recurring</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleStart">Start Date</label>
                        <input id="scheduleStart" type="date" value=${J.start_date} onInput=${p=>fe(N=>({...N,start_date:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleEnd">End Date</label>
                        <input id="scheduleEnd" type="date" value=${J.end_date} onInput=${p=>fe(N=>({...N,end_date:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="weekdayMask">Weekday Mask</label>
                        <input id="weekdayMask" value=${J.weekday_mask} onInput=${p=>fe(N=>({...N,weekday_mask:p.target.value}))} placeholder="monday, thursday" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="monthMask">Month Mask</label>
                        <input id="monthMask" value=${J.month_mask} onInput=${p=>fe(N=>({...N,month_mask:p.target.value}))} placeholder="2, 3, 8" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleRegion">Region</label>
                        <input id="scheduleRegion" value=${J.region} onInput=${p=>fe(N=>({...N,region:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleCountry">Country</label>
                        <input id="scheduleCountry" value=${J.country} onInput=${p=>fe(N=>({...N,country:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="schedulePriority">Priority</label>
                        <input id="schedulePriority" type="number" value=${J.priority} onInput=${p=>fe(N=>({...N,priority:p.target.value}))} />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="scheduleNotes">Notes</label>
                        <textarea id="scheduleNotes" rows="4" value=${J.notes} onInput=${p=>fe(N=>({...N,notes:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${J.is_active} onChange=${p=>fe(N=>({...N,is_active:p.target.checked}))} />
                        <span>Active schedule</span>
                      </label>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${w==="save-schedule"}>
                        ${w==="save-schedule"?"Saving...":"Save Schedule"}
                      </button>
                      <button type="button" className="button" onClick=${()=>_(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}

        ${T?y`
              <div className="modal-backdrop" onClick=${()=>x(!1)}>
                <section className="modal" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">Add Override</h2>
                  <form onSubmit=${ur}>
                    <div className="form-grid">
                      <div className="form-field full">
                        <label htmlFor="overrideTheme">Theme</label>
                        <select id="overrideTheme" value=${C.theme_id} onChange=${p=>S(N=>({...N,theme_id:p.target.value}))} required>
                          ${t.map(p=>y`<option key=${p.id} value=${p.id}>${p.theme_name}</option>`)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideScope">Scope</label>
                        <input id="overrideScope" value=${C.override_scope} onInput=${p=>S(N=>({...N,override_scope:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideBy">Created By</label>
                        <input id="overrideBy" value=${C.created_by} onInput=${p=>S(N=>({...N,created_by:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideStart">Start At</label>
                        <input id="overrideStart" type="datetime-local" value=${C.start_at} onInput=${p=>S(N=>({...N,start_at:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideEnd">End At</label>
                        <input id="overrideEnd" type="datetime-local" value=${C.end_at} onInput=${p=>S(N=>({...N,end_at:p.target.value}))} required />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="overrideReason">Reason</label>
                        <textarea id="overrideReason" rows="4" value=${C.reason} onInput=${p=>S(N=>({...N,reason:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${C.force_top_priority} onChange=${p=>S(N=>({...N,force_top_priority:p.target.checked}))} />
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
    `}function Qf(){let e=jt(),{jobId:t}=Ho(),[n,r]=(0,R.useState)([]),[a,o]=(0,R.useState)(null),[l,i]=(0,R.useState)([]),[s,u]=(0,R.useState)([]),[m,h]=(0,R.useState)(!1),[v,E]=(0,R.useState)(""),[k,w]=(0,R.useState)(""),[g,d]=(0,R.useState)(""),[c,f]=(0,R.useState)("text"),_=(0,R.useCallback)(async(C={})=>{let S=!!C.quiet;S||h(!0),E("");try{let M=await U("/api/jobs?limit=50"),Q=Array.isArray(M)?M:[];if(r(Q),!t){o(null),i([]),u([]);return}let[K,Ue,pe]=await Promise.all([U(`/api/jobs/${t}`),U(`/api/jobs/${t}/assets`),U(`/api/jobs/${t}/candidates`)]);o(K||null),i(Array.isArray(Ue)?Ue:[]),u(Array.isArray(pe)?pe:[])}catch(M){E(M.message||"Unable to load Studio")}finally{S||h(!1)}},[t]);(0,R.useEffect)(()=>{_()},[_]),(0,R.useEffect)(()=>{if(!t)return;let C=window.setInterval(()=>{document.visibilityState==="visible"&&_({quiet:!0})},1e4);return()=>window.clearInterval(C)},[t,_]);let T=(0,R.useMemo)(()=>Yo(a||{}),[a]),x=(0,R.useMemo)(()=>Yv(a||{},s),[a,s]),L=(0,R.useMemo)(()=>ep(l),[l]),P=(0,R.useMemo)(()=>Gv(a||{},l),[a,l]),I=(0,R.useMemo)(()=>Qv(a||{},l),[a,l]),A=da(I);async function z(C,S,M,Q){d(C),E("");try{await S(),M&&w(M),await _(),typeof Q=="function"&&Q()}catch(K){E(K.message||"Studio action failed")}finally{d("")}}async function je(){if(!(!t||!window.confirm(`Delete ${t} and associated files?`))){d("delete"),E("");try{await U(`/api/jobs/${t}`,{method:"DELETE"}),e("/studio")}catch(S){E(S.message||"Unable to delete job")}finally{d("")}}}function O(C){if(!C){e("/studio");return}e(`/studio/${C}`)}function ce(){return a?y`
        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Text Options</h2>
              <p className="section-copy">Choose the line that feels most like a card. If nothing lands, rerun only text.</p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button"
                onClick=${()=>z("regenerate-text",()=>U(`/api/jobs/${t}/regenerate-content`,{method:"POST"}),`Regenerated text for ${t}`)}
                disabled=${g==="regenerate-text"}
              >
                ${g==="regenerate-text"?"Working...":"Regenerate Text"}
              </button>
              <button
                type="button"
                className="button primary"
                onClick=${()=>z("more-text",()=>U(`/api/jobs/${t}/generate-more-text`,{method:"POST"}),`Generated 10 more text options for ${t}`)}
                disabled=${g==="more-text"}
              >
                ${g==="more-text"?"Working...":"Generate 10 More"}
              </button>
            </div>
          </div>
          ${s.length===0?y`<p className="empty-state">No text options stored for this job yet.</p>`:y`
                <div className="studio-option-grid">
                  ${s.map(C=>{let S=Number(x?.id||0)===Number(C.id||0);return y`
                      <article key=${C.id||`${C.model}_${C.text}`} className=${`studio-option-card ${S?"selected":""}`}>
                        <div className="studio-option-head">
                          <${Ce} value=${S?"selected":"option"} />
                          <span className="score-chip">
                            score ${Number(C.judged_score??C.judge_score??0).toFixed(3)}
                          </span>
                        </div>
                        <p className="studio-option-text">${C.text||C.content_text}</p>
                        <div className="studio-meta-row">
                          <span className="mini-pill">${Rs(a?.output_spec?.format)}</span>
                          <span className="mini-pill">${C.model}</span>
                        </div>
                        <div className="inline-actions">
                          <button
                            type="button"
                            className=${S?"button":"button primary"}
                            onClick=${()=>z(`select-text:${C.id}`,()=>U(`/api/jobs/${t}/select-text`,{method:"POST",body:JSON.stringify({candidate_id:C.id})}),`Selected text option ${C.id} for ${t}`,()=>f("image"))}
                            disabled=${g===`select-text:${C.id}`||S}
                          >
                            ${g===`select-text:${C.id}`?"Working...":S?"Using This Text":"Use This Text"}
                          </button>
                        </div>
                      </article>
                    `})}
                </div>
              `}
        </section>
      `:null}function J(){return a?y`
        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Image Options</h2>
              <p className="section-copy">Select a visual direction, or generate more without disturbing the chosen text.</p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button"
                onClick=${()=>z("regenerate-image",()=>U(`/api/jobs/${t}/regenerate-image`,{method:"POST"}),`Regenerated image preview for ${t}`)}
                disabled=${g==="regenerate-image"||!a.content_preview}
              >
                ${g==="regenerate-image"?"Working...":"Regenerate Image"}
              </button>
              <button
                type="button"
                className="button primary"
                onClick=${()=>z("more-images",()=>U(`/api/jobs/${t}/generate-more-images`,{method:"POST"}),`Generated 3 more image options for ${t}`)}
                disabled=${g==="more-images"||!a.content_preview}
              >
                ${g==="more-images"?"Working...":"Generate 3 More"}
              </button>
            </div>
          </div>
          ${x?y`
                <div className="status-panel neutral studio-selected-copy">
                  Selected text: ${x.text||x.content_text}
                </div>
              `:null}
          ${L.length===0?y`<p className="empty-state">No image candidates yet. Generate 3 More to create visual directions.</p>`:y`
                <div className="studio-image-grid">
                  ${L.map(C=>{let S=P&&P.relative_path===C.relative_path;return y`
                      <article key=${C.key} className=${`studio-image-card ${S?"selected":""}`}>
                        <a href=${C.url} target="_blank" rel="noreferrer">
                          <img src=${C.url} alt=${C.theme_style} loading="lazy" />
                        </a>
                        <div className="studio-image-body">
                          <div className="studio-meta-row">
                            <span className="mini-pill">${Oe(C.theme_style)}</span>
                            <span className="mini-pill">${Oe(C.text_alignment)}</span>
                          </div>
                          <div className="inline-actions">
                            <button
                              type="button"
                              className=${S?"button":"button primary"}
                              onClick=${()=>z(`select-image:${C.relative_path}`,()=>U(`/api/jobs/${t}/select-image`,{method:"POST",body:JSON.stringify({relative_path:C.relative_path,public_url:C.url})}),`Selected image option for ${t}`,()=>f("final"))}
                              disabled=${g===`select-image:${C.relative_path}`||S}
                            >
                              ${g===`select-image:${C.relative_path}`?"Working...":S?"Using This Image":"Use This Image"}
                            </button>
                          </div>
                        </div>
                      </article>
                    `})}
                </div>
              `}
        </section>
      `:null}function fe(){if(!a)return null;let C=!!T.is_favorite,S=I.length>0?"Regenerate Card":"Render Card",M=I.length>0?`/api/jobs/${t}/rerun/final-render`:`/api/jobs/${t}/render-final`;return y`
        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Final Cards</h2>
              <p className="section-copy">Rendered card outputs. Keep the one you like, mark it favorite, or rerun only the card render.</p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button"
                onClick=${()=>z("favorite",()=>U(`/api/jobs/${t}/favorite`,{method:"POST",body:JSON.stringify({favorite:!C})}),C?`Removed ${t} from favorites`:`Marked ${t} as favorite`)}
                disabled=${g==="favorite"}
              >
                ${g==="favorite"?"Working...":C?"Unfavorite":"Mark Favorite"}
              </button>
              <button
                type="button"
                className="button primary"
                onClick=${()=>z("rerun-card",()=>U(M,{method:"POST"}),`${S} completed for ${t}`)}
                disabled=${g==="rerun-card"||!a.image_preview_url}
              >
                ${g==="rerun-card"?"Working...":S}
              </button>
            </div>
          </div>
          ${I.length===0?y`<p className="empty-state">No final cards rendered yet. Pick an image option and render the card.</p>`:y`
                <div className="studio-final-grid">
                  ${I.map(Q=>y`
                    <article key=${Q.key} className="studio-final-card">
                      <a href=${Q.url} target="_blank" rel="noreferrer">
                        <img src=${Q.url} alt=${Q.label} loading="lazy" />
                      </a>
                      <div className="studio-image-body">
                        <div className="studio-meta-row">
                          <span className="mini-pill">${Q.label}</span>
                          <span className="mini-pill">${C?"Favorite":Oe(Xv(a))}</span>
                        </div>
                        <div className="ecard-actions">
                          <a href=${Q.url} target="_blank" rel="noreferrer" className="button-link">Open</a>
                          <button
                            type="button"
                            className="button"
                            onClick=${()=>z("favorite",()=>U(`/api/jobs/${t}/favorite`,{method:"POST",body:JSON.stringify({favorite:!C})}),C?`Removed ${t} from favorites`:`Marked ${t} as favorite`)}
                            disabled=${g==="favorite"}
                          >
                            ${C?"Unfavorite":"Mark Favorite"}
                          </button>
                          <button
                            type="button"
                            className="button"
                            onClick=${()=>z("archive",()=>U(`/api/jobs/${t}/archive`,{method:"POST"}),`Archived ${t}`)}
                            disabled=${g==="archive"||a.status==="archived"}
                          >
                            ${g==="archive"?"Archiving...":"Archive"}
                          </button>
                          <button
                            type="button"
                            className="button danger"
                            onClick=${je}
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
                    <select value=${t||""} onChange=${C=>O(C.target.value)}>
                      <option value="">Choose job</option>
                      ${n.map(C=>y`
                        <option key=${C.job_id} value=${C.job_id}>${C.theme_name} | ${C.job_id}</option>
                      `)}
                    </select>
                  </label>
                `:null}
            <button type="button" className="button" onClick=${_} disabled=${m}>Refresh</button>
            ${t?y`<${Ge} to=${`/jobs/${t}`} className="button-link">Job Detail<//>`:null}
          </div>
        </header>

        ${v?y`<div className="status-panel error">${v}</div>`:null}
        ${k?y`<p className="status-line">${k}</p>`:null}
        ${m?y`<div className="status-panel warning">Loading Studio data...</div>`:null}

        ${t?a?y`
                <section className="section-panel">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">${a.theme_name}</h2>
                      <p className="section-copy">${a.job_id} | ${a.cards_per_theme||10} cards | ${Rs(a?.output_spec?.format)}</p>
                    </div>
                    <${Ce} value=${a.status} />
                  </div>
                  <div className="studio-current-grid">
                    <article className="key-card">
                      <p className="key-label">Selected Text</p>
                      <p className="studio-current-copy">${x?.text||x?.content_text||a.content_preview||"No text selected yet."}</p>
                    </article>
                    <article className="key-card">
                      <p className="key-label">Selected Image</p>
                      ${P?y`<img className="studio-current-image" src=${P.url} alt="Selected image" loading="lazy" />`:y`<p className="empty-state compact">No image selected yet.</p>`}
                    </article>
                    <article className="key-card">
                      <p className="key-label">Final Card</p>
                      ${A.currentCandidate?y`<img className="studio-current-image" src=${A.currentCandidate.url} alt="Final card" loading="lazy" onError=${A.handleError} />`:y`<p className="empty-state compact">No final card rendered yet.</p>`}
                    </article>
                  </div>
                </section>

                <div className="studio-tabbar" role="tablist" aria-label="Studio tabs">
                  ${[["text","Text Options"],["image","Image Options"],["final","Final Cards"]].map(([C,S])=>y`
                    <button
                      key=${C}
                      type="button"
                      className=${c===C?"studio-tab active":"studio-tab"}
                      onClick=${()=>f(C)}
                    >
                      ${S}
                    </button>
                  `)}
                </div>

                ${c==="text"?ce():null}
                ${c==="image"?J():null}
                ${c==="final"?fe():null}
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
                              <th>status</th>
                              <th>updated</th>
                              <th>open</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${n.map(C=>y`
                              <tr key=${C.job_id}>
                                <td>${C.job_id}</td>
                                <td>${C.theme_name}</td>
                                <td><${Ce} value=${C.status} /></td>
                                <td>${Ve(C.updated_at)}</td>
                                <td><${Ge} className="job-link" to=${`/studio/${C.job_id}`}>Open Studio<//></td>
                              </tr>
                            `)}
                          </tbody>
                        </table>
                      </div>
                    `}
              </section>
            `}
      </section>
    `}function ty(){let[e,t]=(0,R.useState)([]),[n,r]=(0,R.useState)(!1),[a,o]=(0,R.useState)(""),l=(0,R.useCallback)(async()=>{r(!0),o("");try{let i=await U("/api/jobs?limit=100");t(Array.isArray(i)?i:[])}catch(i){o(i.message||"Unable to load jobs")}finally{r(!1)}},[]);return(0,R.useEffect)(()=>{l()},[l]),y`
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
                          <td><${Ce} value=${i.status} /></td>
                          <td>${Oe(i.current_stage)}</td>
                          <td>${Ve(i.updated_at)}</td>
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
    `}function tp(){return y`
      <aside className="console-sidebar">
        <div className="sidebar-brand">
          <p className="brand-overline">eCardFactory</p>
          <p className="sidebar-brand-mark">ECF</p>
        </div>
        <nav className="sidebar-nav icon-only" aria-label="Primary">
          ${[{to:"/",label:"Home",icon:"H",end:!0},{to:"/themes",label:"Theme Factory",icon:"T"},{to:"/studio",label:"Studio",icon:"S"},{to:"/compare",label:"Compare Lab",icon:"C"},{to:"/jobs",label:"Jobs",icon:"J"}].map(t=>y`
            <${Af}
              key=${t.to}
              to=${t.to}
              end=${!!t.end}
              title=${t.label}
              data-tooltip=${t.label}
              className=${({isActive:n})=>n?"nav-link icon-link active":"nav-link icon-link"}
            >
              <span className="nav-icon">${t.icon}</span>
              <span className="sr-only">${t.label}</span>
            <//>
          `)}
        </nav>
      </aside>
    `}function ny(){return y`
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
    `}function ry(){return y`
      <div className="console-layout">
        <${tp} />

        <main className="console-main">
          <${ks}>
            <${yt} path="/" element=${y`<${qv} />`} />
            <${yt} path="/themes" element=${y`<${ey} />`} />
            <${yt} path="/studio" element=${y`<${Qf} />`} />
            <${yt} path="/studio/:jobId" element=${y`<${Qf} />`} />
            <${yt} path="/compare" element=${y`<${ny} />`} />
            <${yt} path="/jobs" element=${y`<${ty} />`} />
            <${yt} path="/jobs/:jobId" element=${y`<${Zv} />`} />
            <${yt} path="*" element=${y`<${Ss} to="/" replace=${!0} />`} />
          <//>
        </main>
      </div>
    `}var xs=class extends R.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}componentDidCatch(t){ca(`Frontend render error: ${t?.message||"unknown error"}. See browser console for details.`,t)}render(){return this.state.error?y`
        <div className="console-layout">
          <${tp} />
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
      `:this.props.children}};function ay(){return(0,R.useEffect)(()=>{jv()},[]),null}function oy(){return y`
      <${Uf}>
        <${xs}>
          <${ay} />
          <${ry} />
        <//>
      <//>
    `}window.addEventListener("error",e=>{e.error&&ca(`Frontend runtime error: ${e.error.message||"unknown error"}.`,e.error)});window.addEventListener("unhandledrejection",e=>{ca(`Unhandled async error: ${e.reason?.message||String(e.reason||"unknown")}`,e.reason)});var Yf=document.getElementById("root");if(!Yf)ca("Frontend root element (#root) is missing in index.html.");else try{(0,Gf.createRoot)(Yf).render(y`<${oy} />`)}catch(e){ca(`Unable to mount React root: ${e?.message||"unknown mount error"}`,e)}})();
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
