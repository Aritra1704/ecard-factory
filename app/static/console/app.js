(()=>{var sp=Object.create;var Fs=Object.defineProperty;var up=Object.getOwnPropertyDescriptor;var cp=Object.getOwnPropertyNames;var dp=Object.getPrototypeOf,fp=Object.prototype.hasOwnProperty;var un=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var pp=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of cp(t))!fp.call(e,a)&&a!==n&&Fs(e,a,{get:()=>t[a],enumerable:!(r=up(t,a))||r.enumerable});return e};var dr=(e,t,n)=>(n=e!=null?sp(dp(e)):{},pp(t||!e||!e.__esModule?Fs(n,"default",{value:e,enumerable:!0}):n,e));var Ws=un(B=>{"use strict";var fr=Symbol.for("react.element"),mp=Symbol.for("react.portal"),hp=Symbol.for("react.fragment"),vp=Symbol.for("react.strict_mode"),yp=Symbol.for("react.profiler"),gp=Symbol.for("react.provider"),_p=Symbol.for("react.context"),wp=Symbol.for("react.forward_ref"),Np=Symbol.for("react.suspense"),Sp=Symbol.for("react.memo"),Ep=Symbol.for("react.lazy"),Ls=Symbol.iterator;function kp(e){return e===null||typeof e!="object"?null:(e=Ls&&e[Ls]||e["@@iterator"],typeof e=="function"?e:null)}var As={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Is=Object.assign,Us={};function xn(e,t,n){this.props=e,this.context=t,this.refs=Us,this.updater=n||As}xn.prototype.isReactComponent={};xn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};xn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ms(){}Ms.prototype=xn.prototype;function Go(e,t,n){this.props=e,this.context=t,this.refs=Us,this.updater=n||As}var Xo=Go.prototype=new Ms;Xo.constructor=Go;Is(Xo,xn.prototype);Xo.isPureReactComponent=!0;var Os=Array.isArray,zs=Object.prototype.hasOwnProperty,qo={current:null},Bs={key:!0,ref:!0,__self:!0,__source:!0};function Vs(e,t,n){var r,a={},o=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(o=""+t.key),t)zs.call(t,r)&&!Bs.hasOwnProperty(r)&&(a[r]=t[r]);var i=arguments.length-2;if(i===1)a.children=n;else if(1<i){for(var s=Array(i),c=0;c<i;c++)s[c]=arguments[c+2];a.children=s}if(e&&e.defaultProps)for(r in i=e.defaultProps,i)a[r]===void 0&&(a[r]=i[r]);return{$$typeof:fr,type:e,key:o,ref:l,props:a,_owner:qo.current}}function $p(e,t){return{$$typeof:fr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Zo(e){return typeof e=="object"&&e!==null&&e.$$typeof===fr}function Rp(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var js=/\/+/g;function Yo(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Rp(""+e.key):t.toString(36)}function va(e,t,n,r,a){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(o){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case fr:case mp:l=!0}}if(l)return l=e,a=a(l),e=r===""?"."+Yo(l,0):r,Os(a)?(n="",e!=null&&(n=e.replace(js,"$&/")+"/"),va(a,t,n,"",function(c){return c})):a!=null&&(Zo(a)&&(a=$p(a,n+(!a.key||l&&l.key===a.key?"":(""+a.key).replace(js,"$&/")+"/")+e)),t.push(a)),1;if(l=0,r=r===""?".":r+":",Os(e))for(var i=0;i<e.length;i++){o=e[i];var s=r+Yo(o,i);l+=va(o,t,n,s,a)}else if(s=kp(e),typeof s=="function")for(e=s.call(e),i=0;!(o=e.next()).done;)o=o.value,s=r+Yo(o,i++),l+=va(o,t,n,s,a);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function ha(e,t,n){if(e==null)return e;var r=[],a=0;return va(e,r,"","",function(o){return t.call(n,o,a++)}),r}function bp(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Oe={current:null},ya={transition:null},Cp={ReactCurrentDispatcher:Oe,ReactCurrentBatchConfig:ya,ReactCurrentOwner:qo};function Hs(){throw Error("act(...) is not supported in production builds of React.")}B.Children={map:ha,forEach:function(e,t,n){ha(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ha(e,function(){t++}),t},toArray:function(e){return ha(e,function(t){return t})||[]},only:function(e){if(!Zo(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};B.Component=xn;B.Fragment=hp;B.Profiler=yp;B.PureComponent=Go;B.StrictMode=vp;B.Suspense=Np;B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Cp;B.act=Hs;B.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Is({},e.props),a=e.key,o=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,l=qo.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var i=e.type.defaultProps;for(s in t)zs.call(t,s)&&!Bs.hasOwnProperty(s)&&(r[s]=t[s]===void 0&&i!==void 0?i[s]:t[s])}var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){i=Array(s);for(var c=0;c<s;c++)i[c]=arguments[c+2];r.children=i}return{$$typeof:fr,type:e.type,key:a,ref:o,props:r,_owner:l}};B.createContext=function(e){return e={$$typeof:_p,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:gp,_context:e},e.Consumer=e};B.createElement=Vs;B.createFactory=function(e){var t=Vs.bind(null,e);return t.type=e,t};B.createRef=function(){return{current:null}};B.forwardRef=function(e){return{$$typeof:wp,render:e}};B.isValidElement=Zo;B.lazy=function(e){return{$$typeof:Ep,_payload:{_status:-1,_result:e},_init:bp}};B.memo=function(e,t){return{$$typeof:Sp,type:e,compare:t===void 0?null:t}};B.startTransition=function(e){var t=ya.transition;ya.transition={};try{e()}finally{ya.transition=t}};B.unstable_act=Hs;B.useCallback=function(e,t){return Oe.current.useCallback(e,t)};B.useContext=function(e){return Oe.current.useContext(e)};B.useDebugValue=function(){};B.useDeferredValue=function(e){return Oe.current.useDeferredValue(e)};B.useEffect=function(e,t){return Oe.current.useEffect(e,t)};B.useId=function(){return Oe.current.useId()};B.useImperativeHandle=function(e,t,n){return Oe.current.useImperativeHandle(e,t,n)};B.useInsertionEffect=function(e,t){return Oe.current.useInsertionEffect(e,t)};B.useLayoutEffect=function(e,t){return Oe.current.useLayoutEffect(e,t)};B.useMemo=function(e,t){return Oe.current.useMemo(e,t)};B.useReducer=function(e,t,n){return Oe.current.useReducer(e,t,n)};B.useRef=function(e){return Oe.current.useRef(e)};B.useState=function(e){return Oe.current.useState(e)};B.useSyncExternalStore=function(e,t,n){return Oe.current.useSyncExternalStore(e,t,n)};B.useTransition=function(){return Oe.current.useTransition()};B.version="18.3.1"});var pr=un((cy,Ks)=>{"use strict";Ks.exports=Ws()});var nu=un(G=>{"use strict";function rl(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<ga(a,t))e[r]=t,e[n]=a,n=r;else break e}}function lt(e){return e.length===0?null:e[0]}function wa(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,a=e.length,o=a>>>1;r<o;){var l=2*(r+1)-1,i=e[l],s=l+1,c=e[s];if(0>ga(i,n))s<a&&0>ga(c,i)?(e[r]=c,e[s]=n,r=s):(e[r]=i,e[l]=n,r=l);else if(s<a&&0>ga(c,n))e[r]=c,e[s]=n,r=s;else break e}}return t}function ga(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Js=performance,G.unstable_now=function(){return Js.now()}):(el=Date,Qs=el.now(),G.unstable_now=function(){return el.now()-Qs});var Js,el,Qs,gt=[],It=[],xp=1,qe=null,Re=3,Na=!1,cn=!1,hr=!1,Xs=typeof setTimeout=="function"?setTimeout:null,qs=typeof clearTimeout=="function"?clearTimeout:null,Ys=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function al(e){for(var t=lt(It);t!==null;){if(t.callback===null)wa(It);else if(t.startTime<=e)wa(It),t.sortIndex=t.expirationTime,rl(gt,t);else break;t=lt(It)}}function ol(e){if(hr=!1,al(e),!cn)if(lt(gt)!==null)cn=!0,il(ll);else{var t=lt(It);t!==null&&sl(ol,t.startTime-e)}}function ll(e,t){cn=!1,hr&&(hr=!1,qs(vr),vr=-1),Na=!0;var n=Re;try{for(al(t),qe=lt(gt);qe!==null&&(!(qe.expirationTime>t)||e&&!tu());){var r=qe.callback;if(typeof r=="function"){qe.callback=null,Re=qe.priorityLevel;var a=r(qe.expirationTime<=t);t=G.unstable_now(),typeof a=="function"?qe.callback=a:qe===lt(gt)&&wa(gt),al(t)}else wa(gt);qe=lt(gt)}if(qe!==null)var o=!0;else{var l=lt(It);l!==null&&sl(ol,l.startTime-t),o=!1}return o}finally{qe=null,Re=n,Na=!1}}var Sa=!1,_a=null,vr=-1,Zs=5,eu=-1;function tu(){return!(G.unstable_now()-eu<Zs)}function tl(){if(_a!==null){var e=G.unstable_now();eu=e;var t=!0;try{t=_a(!0,e)}finally{t?mr():(Sa=!1,_a=null)}}else Sa=!1}var mr;typeof Ys=="function"?mr=function(){Ys(tl)}:typeof MessageChannel<"u"?(nl=new MessageChannel,Gs=nl.port2,nl.port1.onmessage=tl,mr=function(){Gs.postMessage(null)}):mr=function(){Xs(tl,0)};var nl,Gs;function il(e){_a=e,Sa||(Sa=!0,mr())}function sl(e,t){vr=Xs(function(){e(G.unstable_now())},t)}G.unstable_IdlePriority=5;G.unstable_ImmediatePriority=1;G.unstable_LowPriority=4;G.unstable_NormalPriority=3;G.unstable_Profiling=null;G.unstable_UserBlockingPriority=2;G.unstable_cancelCallback=function(e){e.callback=null};G.unstable_continueExecution=function(){cn||Na||(cn=!0,il(ll))};G.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Zs=0<e?Math.floor(1e3/e):5};G.unstable_getCurrentPriorityLevel=function(){return Re};G.unstable_getFirstCallbackNode=function(){return lt(gt)};G.unstable_next=function(e){switch(Re){case 1:case 2:case 3:var t=3;break;default:t=Re}var n=Re;Re=t;try{return e()}finally{Re=n}};G.unstable_pauseExecution=function(){};G.unstable_requestPaint=function(){};G.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=Re;Re=e;try{return t()}finally{Re=n}};G.unstable_scheduleCallback=function(e,t,n){var r=G.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var a=-1;break;case 2:a=250;break;case 5:a=1073741823;break;case 4:a=1e4;break;default:a=5e3}return a=n+a,e={id:xp++,callback:t,priorityLevel:e,startTime:n,expirationTime:a,sortIndex:-1},n>r?(e.sortIndex=n,rl(It,e),lt(gt)===null&&e===lt(It)&&(hr?(qs(vr),vr=-1):hr=!0,sl(ol,n-r))):(e.sortIndex=a,rl(gt,e),cn||Na||(cn=!0,il(ll))),e};G.unstable_shouldYield=tu;G.unstable_wrapCallback=function(e){var t=Re;return function(){var n=Re;Re=t;try{return e.apply(this,arguments)}finally{Re=n}}}});var au=un((fy,ru)=>{"use strict";ru.exports=nu()});var uf=un(Ge=>{"use strict";var Pp=pr(),Qe=au();function b(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var dc=new Set,Ir={};function En(e,t){Gn(e,t),Gn(e+"Capture",t)}function Gn(e,t){for(Ir[e]=t,e=0;e<t.length;e++)dc.add(t[e])}var Pt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Tl=Object.prototype.hasOwnProperty,Tp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ou={},lu={};function Dp(e){return Tl.call(lu,e)?!0:Tl.call(ou,e)?!1:Tp.test(e)?lu[e]=!0:(ou[e]=!0,!1)}function Fp(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Lp(e,t,n,r){if(t===null||typeof t>"u"||Fp(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ie(e,t,n,r,a,o,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=l}var Ee={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Ee[e]=new Ie(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Ee[t]=new Ie(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Ee[e]=new Ie(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Ee[e]=new Ie(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Ee[e]=new Ie(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Ee[e]=new Ie(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Ee[e]=new Ie(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Ee[e]=new Ie(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Ee[e]=new Ie(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ei=/[\-:]([a-z])/g;function ki(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Ei,ki);Ee[t]=new Ie(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Ei,ki);Ee[t]=new Ie(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Ei,ki);Ee[t]=new Ie(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Ee[e]=new Ie(e,1,!1,e.toLowerCase(),null,!1,!1)});Ee.xlinkHref=new Ie("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Ee[e]=new Ie(e,1,!1,e.toLowerCase(),null,!0,!0)});function $i(e,t,n,r){var a=Ee.hasOwnProperty(t)?Ee[t]:null;(a!==null?a.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Lp(t,n,a,r)&&(n=null),r||a===null?Dp(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(t=a.attributeName,r=a.attributeNamespace,n===null?e.removeAttribute(t):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Lt=Pp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ea=Symbol.for("react.element"),Dn=Symbol.for("react.portal"),Fn=Symbol.for("react.fragment"),Ri=Symbol.for("react.strict_mode"),Dl=Symbol.for("react.profiler"),fc=Symbol.for("react.provider"),pc=Symbol.for("react.context"),bi=Symbol.for("react.forward_ref"),Fl=Symbol.for("react.suspense"),Ll=Symbol.for("react.suspense_list"),Ci=Symbol.for("react.memo"),Mt=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var mc=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var iu=Symbol.iterator;function yr(e){return e===null||typeof e!="object"?null:(e=iu&&e[iu]||e["@@iterator"],typeof e=="function"?e:null)}var oe=Object.assign,ul;function $r(e){if(ul===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);ul=t&&t[1]||""}return`
`+ul+e}var cl=!1;function dl(e,t){if(!e||cl)return"";cl=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var a=c.stack.split(`
`),o=r.stack.split(`
`),l=a.length-1,i=o.length-1;1<=l&&0<=i&&a[l]!==o[i];)i--;for(;1<=l&&0<=i;l--,i--)if(a[l]!==o[i]){if(l!==1||i!==1)do if(l--,i--,0>i||a[l]!==o[i]){var s=`
`+a[l].replace(" at new "," at ");return e.displayName&&s.includes("<anonymous>")&&(s=s.replace("<anonymous>",e.displayName)),s}while(1<=l&&0<=i);break}}}finally{cl=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?$r(e):""}function Op(e){switch(e.tag){case 5:return $r(e.type);case 16:return $r("Lazy");case 13:return $r("Suspense");case 19:return $r("SuspenseList");case 0:case 2:case 15:return e=dl(e.type,!1),e;case 11:return e=dl(e.type.render,!1),e;case 1:return e=dl(e.type,!0),e;default:return""}}function Ol(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Fn:return"Fragment";case Dn:return"Portal";case Dl:return"Profiler";case Ri:return"StrictMode";case Fl:return"Suspense";case Ll:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case pc:return(e.displayName||"Context")+".Consumer";case fc:return(e._context.displayName||"Context")+".Provider";case bi:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ci:return t=e.displayName||null,t!==null?t:Ol(e.type)||"Memo";case Mt:t=e._payload,e=e._init;try{return Ol(e(t))}catch{}}return null}function jp(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ol(t);case 8:return t===Ri?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function en(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function hc(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ap(e){var t=hc(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(l){r=""+l,o.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ka(e){e._valueTracker||(e._valueTracker=Ap(e))}function vc(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=hc(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function qa(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function jl(e,t){var n=t.checked;return oe({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function su(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=en(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function yc(e,t){t=t.checked,t!=null&&$i(e,"checked",t,!1)}function Al(e,t){yc(e,t);var n=en(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Il(e,t.type,n):t.hasOwnProperty("defaultValue")&&Il(e,t.type,en(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function uu(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Il(e,t,n){(t!=="number"||qa(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Rr=Array.isArray;function Hn(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+en(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,r&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function Ul(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(b(91));return oe({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function cu(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(b(92));if(Rr(n)){if(1<n.length)throw Error(b(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:en(n)}}function gc(e,t){var n=en(t.value),r=en(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function du(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function _c(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ml(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?_c(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var $a,wc=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,a)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for($a=$a||document.createElement("div"),$a.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=$a.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Ur(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var xr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ip=["Webkit","ms","Moz","O"];Object.keys(xr).forEach(function(e){Ip.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),xr[t]=xr[e]})});function Nc(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||xr.hasOwnProperty(e)&&xr[e]?(""+t).trim():t+"px"}function Sc(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,a=Nc(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,a):e[n]=a}}var Up=oe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function zl(e,t){if(t){if(Up[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(b(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(b(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(b(61))}if(t.style!=null&&typeof t.style!="object")throw Error(b(62))}}function Bl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Vl=null;function xi(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Hl=null,Wn=null,Kn=null;function fu(e){if(e=ra(e)){if(typeof Hl!="function")throw Error(b(280));var t=e.stateNode;t&&(t=bo(t),Hl(e.stateNode,e.type,t))}}function Ec(e){Wn?Kn?Kn.push(e):Kn=[e]:Wn=e}function kc(){if(Wn){var e=Wn,t=Kn;if(Kn=Wn=null,fu(e),t)for(e=0;e<t.length;e++)fu(t[e])}}function $c(e,t){return e(t)}function Rc(){}var fl=!1;function bc(e,t,n){if(fl)return e(t,n);fl=!0;try{return $c(e,t,n)}finally{fl=!1,(Wn!==null||Kn!==null)&&(Rc(),kc())}}function Mr(e,t){var n=e.stateNode;if(n===null)return null;var r=bo(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(b(231,t,typeof n));return n}var Wl=!1;if(Pt)try{Pn={},Object.defineProperty(Pn,"passive",{get:function(){Wl=!0}}),window.addEventListener("test",Pn,Pn),window.removeEventListener("test",Pn,Pn)}catch{Wl=!1}var Pn;function Mp(e,t,n,r,a,o,l,i,s){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(m){this.onError(m)}}var Pr=!1,Za=null,eo=!1,Kl=null,zp={onError:function(e){Pr=!0,Za=e}};function Bp(e,t,n,r,a,o,l,i,s){Pr=!1,Za=null,Mp.apply(zp,arguments)}function Vp(e,t,n,r,a,o,l,i,s){if(Bp.apply(this,arguments),Pr){if(Pr){var c=Za;Pr=!1,Za=null}else throw Error(b(198));eo||(eo=!0,Kl=c)}}function kn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Cc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function pu(e){if(kn(e)!==e)throw Error(b(188))}function Hp(e){var t=e.alternate;if(!t){if(t=kn(e),t===null)throw Error(b(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var o=a.alternate;if(o===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===o.child){for(o=a.child;o;){if(o===n)return pu(a),e;if(o===r)return pu(a),t;o=o.sibling}throw Error(b(188))}if(n.return!==r.return)n=a,r=o;else{for(var l=!1,i=a.child;i;){if(i===n){l=!0,n=a,r=o;break}if(i===r){l=!0,r=a,n=o;break}i=i.sibling}if(!l){for(i=o.child;i;){if(i===n){l=!0,n=o,r=a;break}if(i===r){l=!0,r=o,n=a;break}i=i.sibling}if(!l)throw Error(b(189))}}if(n.alternate!==r)throw Error(b(190))}if(n.tag!==3)throw Error(b(188));return n.stateNode.current===n?e:t}function xc(e){return e=Hp(e),e!==null?Pc(e):null}function Pc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Pc(e);if(t!==null)return t;e=e.sibling}return null}var Tc=Qe.unstable_scheduleCallback,mu=Qe.unstable_cancelCallback,Wp=Qe.unstable_shouldYield,Kp=Qe.unstable_requestPaint,ce=Qe.unstable_now,Jp=Qe.unstable_getCurrentPriorityLevel,Pi=Qe.unstable_ImmediatePriority,Dc=Qe.unstable_UserBlockingPriority,to=Qe.unstable_NormalPriority,Qp=Qe.unstable_LowPriority,Fc=Qe.unstable_IdlePriority,Eo=null,St=null;function Yp(e){if(St&&typeof St.onCommitFiberRoot=="function")try{St.onCommitFiberRoot(Eo,e,void 0,(e.current.flags&128)===128)}catch{}}var dt=Math.clz32?Math.clz32:qp,Gp=Math.log,Xp=Math.LN2;function qp(e){return e>>>=0,e===0?32:31-(Gp(e)/Xp|0)|0}var Ra=64,ba=4194304;function br(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function no(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,a=e.suspendedLanes,o=e.pingedLanes,l=n&268435455;if(l!==0){var i=l&~a;i!==0?r=br(i):(o&=l,o!==0&&(r=br(o)))}else l=n&~a,l!==0?r=br(l):o!==0&&(r=br(o));if(r===0)return 0;if(t!==0&&t!==r&&(t&a)===0&&(a=r&-r,o=t&-t,a>=o||a===16&&(o&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-dt(t),a=1<<n,r|=e[n],t&=~a;return r}function Zp(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function em(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,o=e.pendingLanes;0<o;){var l=31-dt(o),i=1<<l,s=a[l];s===-1?((i&n)===0||(i&r)!==0)&&(a[l]=Zp(i,t)):s<=t&&(e.expiredLanes|=i),o&=~i}}function Jl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Lc(){var e=Ra;return Ra<<=1,(Ra&4194240)===0&&(Ra=64),e}function pl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ta(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-dt(t),e[t]=n}function tm(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-dt(n),o=1<<a;t[a]=0,r[a]=-1,e[a]=-1,n&=~o}}function Ti(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-dt(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}var Y=0;function Oc(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var jc,Di,Ac,Ic,Uc,Ql=!1,Ca=[],Kt=null,Jt=null,Qt=null,zr=new Map,Br=new Map,Bt=[],nm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function hu(e,t){switch(e){case"focusin":case"focusout":Kt=null;break;case"dragenter":case"dragleave":Jt=null;break;case"mouseover":case"mouseout":Qt=null;break;case"pointerover":case"pointerout":zr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Br.delete(t.pointerId)}}function gr(e,t,n,r,a,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[a]},t!==null&&(t=ra(t),t!==null&&Di(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function rm(e,t,n,r,a){switch(t){case"focusin":return Kt=gr(Kt,e,t,n,r,a),!0;case"dragenter":return Jt=gr(Jt,e,t,n,r,a),!0;case"mouseover":return Qt=gr(Qt,e,t,n,r,a),!0;case"pointerover":var o=a.pointerId;return zr.set(o,gr(zr.get(o)||null,e,t,n,r,a)),!0;case"gotpointercapture":return o=a.pointerId,Br.set(o,gr(Br.get(o)||null,e,t,n,r,a)),!0}return!1}function Mc(e){var t=pn(e.target);if(t!==null){var n=kn(t);if(n!==null){if(t=n.tag,t===13){if(t=Cc(n),t!==null){e.blockedOn=t,Uc(e.priority,function(){Ac(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ba(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Yl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Vl=r,n.target.dispatchEvent(r),Vl=null}else return t=ra(n),t!==null&&Di(t),e.blockedOn=n,!1;t.shift()}return!0}function vu(e,t,n){Ba(e)&&n.delete(t)}function am(){Ql=!1,Kt!==null&&Ba(Kt)&&(Kt=null),Jt!==null&&Ba(Jt)&&(Jt=null),Qt!==null&&Ba(Qt)&&(Qt=null),zr.forEach(vu),Br.forEach(vu)}function _r(e,t){e.blockedOn===t&&(e.blockedOn=null,Ql||(Ql=!0,Qe.unstable_scheduleCallback(Qe.unstable_NormalPriority,am)))}function Vr(e){function t(a){return _r(a,e)}if(0<Ca.length){_r(Ca[0],e);for(var n=1;n<Ca.length;n++){var r=Ca[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Kt!==null&&_r(Kt,e),Jt!==null&&_r(Jt,e),Qt!==null&&_r(Qt,e),zr.forEach(t),Br.forEach(t),n=0;n<Bt.length;n++)r=Bt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Bt.length&&(n=Bt[0],n.blockedOn===null);)Mc(n),n.blockedOn===null&&Bt.shift()}var Jn=Lt.ReactCurrentBatchConfig,ro=!0;function om(e,t,n,r){var a=Y,o=Jn.transition;Jn.transition=null;try{Y=1,Fi(e,t,n,r)}finally{Y=a,Jn.transition=o}}function lm(e,t,n,r){var a=Y,o=Jn.transition;Jn.transition=null;try{Y=4,Fi(e,t,n,r)}finally{Y=a,Jn.transition=o}}function Fi(e,t,n,r){if(ro){var a=Yl(e,t,n,r);if(a===null)wl(e,t,r,ao,n),hu(e,r);else if(rm(a,e,t,n,r))r.stopPropagation();else if(hu(e,r),t&4&&-1<nm.indexOf(e)){for(;a!==null;){var o=ra(a);if(o!==null&&jc(o),o=Yl(e,t,n,r),o===null&&wl(e,t,r,ao,n),o===a)break;a=o}a!==null&&r.stopPropagation()}else wl(e,t,r,null,n)}}var ao=null;function Yl(e,t,n,r){if(ao=null,e=xi(r),e=pn(e),e!==null)if(t=kn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Cc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return ao=e,null}function zc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Jp()){case Pi:return 1;case Dc:return 4;case to:case Qp:return 16;case Fc:return 536870912;default:return 16}default:return 16}}var Ht=null,Li=null,Va=null;function Bc(){if(Va)return Va;var e,t=Li,n=t.length,r,a="value"in Ht?Ht.value:Ht.textContent,o=a.length;for(e=0;e<n&&t[e]===a[e];e++);var l=n-e;for(r=1;r<=l&&t[n-r]===a[o-r];r++);return Va=a.slice(e,1<r?1-r:void 0)}function Ha(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function xa(){return!0}function yu(){return!1}function Ye(e){function t(n,r,a,o,l){this._reactName=n,this._targetInst=a,this.type=r,this.nativeEvent=o,this.target=l,this.currentTarget=null;for(var i in e)e.hasOwnProperty(i)&&(n=e[i],this[i]=n?n(o):o[i]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?xa:yu,this.isPropagationStopped=yu,this}return oe(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=xa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=xa)},persist:function(){},isPersistent:xa}),t}var rr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Oi=Ye(rr),na=oe({},rr,{view:0,detail:0}),im=Ye(na),ml,hl,wr,ko=oe({},na,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ji,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==wr&&(wr&&e.type==="mousemove"?(ml=e.screenX-wr.screenX,hl=e.screenY-wr.screenY):hl=ml=0,wr=e),ml)},movementY:function(e){return"movementY"in e?e.movementY:hl}}),gu=Ye(ko),sm=oe({},ko,{dataTransfer:0}),um=Ye(sm),cm=oe({},na,{relatedTarget:0}),vl=Ye(cm),dm=oe({},rr,{animationName:0,elapsedTime:0,pseudoElement:0}),fm=Ye(dm),pm=oe({},rr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),mm=Ye(pm),hm=oe({},rr,{data:0}),_u=Ye(hm),vm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ym={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},gm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function _m(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=gm[e])?!!t[e]:!1}function ji(){return _m}var wm=oe({},na,{key:function(e){if(e.key){var t=vm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ha(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ym[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ji,charCode:function(e){return e.type==="keypress"?Ha(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ha(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Nm=Ye(wm),Sm=oe({},ko,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),wu=Ye(Sm),Em=oe({},na,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ji}),km=Ye(Em),$m=oe({},rr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Rm=Ye($m),bm=oe({},ko,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Cm=Ye(bm),xm=[9,13,27,32],Ai=Pt&&"CompositionEvent"in window,Tr=null;Pt&&"documentMode"in document&&(Tr=document.documentMode);var Pm=Pt&&"TextEvent"in window&&!Tr,Vc=Pt&&(!Ai||Tr&&8<Tr&&11>=Tr),Nu=" ",Su=!1;function Hc(e,t){switch(e){case"keyup":return xm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Wc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ln=!1;function Tm(e,t){switch(e){case"compositionend":return Wc(t);case"keypress":return t.which!==32?null:(Su=!0,Nu);case"textInput":return e=t.data,e===Nu&&Su?null:e;default:return null}}function Dm(e,t){if(Ln)return e==="compositionend"||!Ai&&Hc(e,t)?(e=Bc(),Va=Li=Ht=null,Ln=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Vc&&t.locale!=="ko"?null:t.data;default:return null}}var Fm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Eu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Fm[e.type]:t==="textarea"}function Kc(e,t,n,r){Ec(r),t=oo(t,"onChange"),0<t.length&&(n=new Oi("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Dr=null,Hr=null;function Lm(e){rd(e,0)}function $o(e){var t=An(e);if(vc(t))return e}function Om(e,t){if(e==="change")return t}var Jc=!1;Pt&&(Pt?(Ta="oninput"in document,Ta||(yl=document.createElement("div"),yl.setAttribute("oninput","return;"),Ta=typeof yl.oninput=="function"),Pa=Ta):Pa=!1,Jc=Pa&&(!document.documentMode||9<document.documentMode));var Pa,Ta,yl;function ku(){Dr&&(Dr.detachEvent("onpropertychange",Qc),Hr=Dr=null)}function Qc(e){if(e.propertyName==="value"&&$o(Hr)){var t=[];Kc(t,Hr,e,xi(e)),bc(Lm,t)}}function jm(e,t,n){e==="focusin"?(ku(),Dr=t,Hr=n,Dr.attachEvent("onpropertychange",Qc)):e==="focusout"&&ku()}function Am(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return $o(Hr)}function Im(e,t){if(e==="click")return $o(t)}function Um(e,t){if(e==="input"||e==="change")return $o(t)}function Mm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var pt=typeof Object.is=="function"?Object.is:Mm;function Wr(e,t){if(pt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!Tl.call(t,a)||!pt(e[a],t[a]))return!1}return!0}function $u(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ru(e,t){var n=$u(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=$u(n)}}function Yc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Yc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Gc(){for(var e=window,t=qa();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=qa(e.document)}return t}function Ii(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function zm(e){var t=Gc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Yc(n.ownerDocument.documentElement,n)){if(r!==null&&Ii(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,o=Math.min(r.start,a);r=r.end===void 0?o:Math.min(r.end,a),!e.extend&&o>r&&(a=r,r=o,o=a),a=Ru(n,o);var l=Ru(n,r);a&&l&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Bm=Pt&&"documentMode"in document&&11>=document.documentMode,On=null,Gl=null,Fr=null,Xl=!1;function bu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Xl||On==null||On!==qa(r)||(r=On,"selectionStart"in r&&Ii(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Fr&&Wr(Fr,r)||(Fr=r,r=oo(Gl,"onSelect"),0<r.length&&(t=new Oi("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=On)))}function Da(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var jn={animationend:Da("Animation","AnimationEnd"),animationiteration:Da("Animation","AnimationIteration"),animationstart:Da("Animation","AnimationStart"),transitionend:Da("Transition","TransitionEnd")},gl={},Xc={};Pt&&(Xc=document.createElement("div").style,"AnimationEvent"in window||(delete jn.animationend.animation,delete jn.animationiteration.animation,delete jn.animationstart.animation),"TransitionEvent"in window||delete jn.transitionend.transition);function Ro(e){if(gl[e])return gl[e];if(!jn[e])return e;var t=jn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Xc)return gl[e]=t[n];return e}var qc=Ro("animationend"),Zc=Ro("animationiteration"),ed=Ro("animationstart"),td=Ro("transitionend"),nd=new Map,Cu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function nn(e,t){nd.set(e,t),En(t,[e])}for(Fa=0;Fa<Cu.length;Fa++)La=Cu[Fa],xu=La.toLowerCase(),Pu=La[0].toUpperCase()+La.slice(1),nn(xu,"on"+Pu);var La,xu,Pu,Fa;nn(qc,"onAnimationEnd");nn(Zc,"onAnimationIteration");nn(ed,"onAnimationStart");nn("dblclick","onDoubleClick");nn("focusin","onFocus");nn("focusout","onBlur");nn(td,"onTransitionEnd");Gn("onMouseEnter",["mouseout","mouseover"]);Gn("onMouseLeave",["mouseout","mouseover"]);Gn("onPointerEnter",["pointerout","pointerover"]);Gn("onPointerLeave",["pointerout","pointerover"]);En("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));En("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));En("onBeforeInput",["compositionend","keypress","textInput","paste"]);En("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));En("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));En("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Cr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Vm=new Set("cancel close invalid load scroll toggle".split(" ").concat(Cr));function Tu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Vp(r,t,void 0,e),e.currentTarget=null}function rd(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var l=r.length-1;0<=l;l--){var i=r[l],s=i.instance,c=i.currentTarget;if(i=i.listener,s!==o&&a.isPropagationStopped())break e;Tu(a,i,c),o=s}else for(l=0;l<r.length;l++){if(i=r[l],s=i.instance,c=i.currentTarget,i=i.listener,s!==o&&a.isPropagationStopped())break e;Tu(a,i,c),o=s}}}if(eo)throw e=Kl,eo=!1,Kl=null,e}function q(e,t){var n=t[ni];n===void 0&&(n=t[ni]=new Set);var r=e+"__bubble";n.has(r)||(ad(t,e,2,!1),n.add(r))}function _l(e,t,n){var r=0;t&&(r|=4),ad(n,e,r,t)}var Oa="_reactListening"+Math.random().toString(36).slice(2);function Kr(e){if(!e[Oa]){e[Oa]=!0,dc.forEach(function(n){n!=="selectionchange"&&(Vm.has(n)||_l(n,!1,e),_l(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Oa]||(t[Oa]=!0,_l("selectionchange",!1,t))}}function ad(e,t,n,r){switch(zc(t)){case 1:var a=om;break;case 4:a=lm;break;default:a=Fi}n=a.bind(null,t,n,e),a=void 0,!Wl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),r?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function wl(e,t,n,r,a){var o=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var i=r.stateNode.containerInfo;if(i===a||i.nodeType===8&&i.parentNode===a)break;if(l===4)for(l=r.return;l!==null;){var s=l.tag;if((s===3||s===4)&&(s=l.stateNode.containerInfo,s===a||s.nodeType===8&&s.parentNode===a))return;l=l.return}for(;i!==null;){if(l=pn(i),l===null)return;if(s=l.tag,s===5||s===6){r=o=l;continue e}i=i.parentNode}}r=r.return}bc(function(){var c=o,m=xi(n),h=[];e:{var v=nd.get(e);if(v!==void 0){var E=Oi,S=e;switch(e){case"keypress":if(Ha(n)===0)break e;case"keydown":case"keyup":E=Nm;break;case"focusin":S="focus",E=vl;break;case"focusout":S="blur",E=vl;break;case"beforeblur":case"afterblur":E=vl;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":E=gu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":E=um;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":E=km;break;case qc:case Zc:case ed:E=fm;break;case td:E=Rm;break;case"scroll":E=im;break;case"wheel":E=Cm;break;case"copy":case"cut":case"paste":E=mm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":E=wu}var w=(t&4)!==0,N=!w&&e==="scroll",d=w?v!==null?v+"Capture":null:v;w=[];for(var u=c,f;u!==null;){f=u;var g=f.stateNode;if(f.tag===5&&g!==null&&(f=g,d!==null&&(g=Mr(u,d),g!=null&&w.push(Jr(u,g,f)))),N)break;u=u.return}0<w.length&&(v=new E(v,S,null,n,m),h.push({event:v,listeners:w}))}}if((t&7)===0){e:{if(v=e==="mouseover"||e==="pointerover",E=e==="mouseout"||e==="pointerout",v&&n!==Vl&&(S=n.relatedTarget||n.fromElement)&&(pn(S)||S[Tt]))break e;if((E||v)&&(v=m.window===m?m:(v=m.ownerDocument)?v.defaultView||v.parentWindow:window,E?(S=n.relatedTarget||n.toElement,E=c,S=S?pn(S):null,S!==null&&(N=kn(S),S!==N||S.tag!==5&&S.tag!==6)&&(S=null)):(E=null,S=c),E!==S)){if(w=gu,g="onMouseLeave",d="onMouseEnter",u="mouse",(e==="pointerout"||e==="pointerover")&&(w=wu,g="onPointerLeave",d="onPointerEnter",u="pointer"),N=E==null?v:An(E),f=S==null?v:An(S),v=new w(g,u+"leave",E,n,m),v.target=N,v.relatedTarget=f,g=null,pn(m)===c&&(w=new w(d,u+"enter",S,n,m),w.target=f,w.relatedTarget=N,g=w),N=g,E&&S)t:{for(w=E,d=S,u=0,f=w;f;f=Tn(f))u++;for(f=0,g=d;g;g=Tn(g))f++;for(;0<u-f;)w=Tn(w),u--;for(;0<f-u;)d=Tn(d),f--;for(;u--;){if(w===d||d!==null&&w===d.alternate)break t;w=Tn(w),d=Tn(d)}w=null}else w=null;E!==null&&Du(h,v,E,w,!1),S!==null&&N!==null&&Du(h,N,S,w,!0)}}e:{if(v=c?An(c):window,E=v.nodeName&&v.nodeName.toLowerCase(),E==="select"||E==="input"&&v.type==="file")var x=Om;else if(Eu(v))if(Jc)x=Um;else{x=Am;var P=jm}else(E=v.nodeName)&&E.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(x=Im);if(x&&(x=x(e,c))){Kc(h,x,n,m);break e}P&&P(e,v,c),e==="focusout"&&(P=v._wrapperState)&&P.controlled&&v.type==="number"&&Il(v,"number",v.value)}switch(P=c?An(c):window,e){case"focusin":(Eu(P)||P.contentEditable==="true")&&(On=P,Gl=c,Fr=null);break;case"focusout":Fr=Gl=On=null;break;case"mousedown":Xl=!0;break;case"contextmenu":case"mouseup":case"dragend":Xl=!1,bu(h,n,m);break;case"selectionchange":if(Bm)break;case"keydown":case"keyup":bu(h,n,m)}var L;if(Ai)e:{switch(e){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else Ln?Hc(e,n)&&(T="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(T="onCompositionStart");T&&(Vc&&n.locale!=="ko"&&(Ln||T!=="onCompositionStart"?T==="onCompositionEnd"&&Ln&&(L=Bc()):(Ht=m,Li="value"in Ht?Ht.value:Ht.textContent,Ln=!0)),P=oo(c,T),0<P.length&&(T=new _u(T,e,null,n,m),h.push({event:T,listeners:P}),L?T.data=L:(L=Wc(n),L!==null&&(T.data=L)))),(L=Pm?Tm(e,n):Dm(e,n))&&(c=oo(c,"onBeforeInput"),0<c.length&&(m=new _u("onBeforeInput","beforeinput",null,n,m),h.push({event:m,listeners:c}),m.data=L))}rd(h,t)})}function Jr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function oo(e,t){for(var n=t+"Capture",r=[];e!==null;){var a=e,o=a.stateNode;a.tag===5&&o!==null&&(a=o,o=Mr(e,n),o!=null&&r.unshift(Jr(e,o,a)),o=Mr(e,t),o!=null&&r.push(Jr(e,o,a))),e=e.return}return r}function Tn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Du(e,t,n,r,a){for(var o=t._reactName,l=[];n!==null&&n!==r;){var i=n,s=i.alternate,c=i.stateNode;if(s!==null&&s===r)break;i.tag===5&&c!==null&&(i=c,a?(s=Mr(n,o),s!=null&&l.unshift(Jr(n,s,i))):a||(s=Mr(n,o),s!=null&&l.push(Jr(n,s,i)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var Hm=/\r\n?/g,Wm=/\u0000|\uFFFD/g;function Fu(e){return(typeof e=="string"?e:""+e).replace(Hm,`
`).replace(Wm,"")}function ja(e,t,n){if(t=Fu(t),Fu(e)!==t&&n)throw Error(b(425))}function lo(){}var ql=null,Zl=null;function ei(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ti=typeof setTimeout=="function"?setTimeout:void 0,Km=typeof clearTimeout=="function"?clearTimeout:void 0,Lu=typeof Promise=="function"?Promise:void 0,Jm=typeof queueMicrotask=="function"?queueMicrotask:typeof Lu<"u"?function(e){return Lu.resolve(null).then(e).catch(Qm)}:ti;function Qm(e){setTimeout(function(){throw e})}function Nl(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(r===0){e.removeChild(a),Vr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=a}while(n);Vr(t)}function Yt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ou(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var ar=Math.random().toString(36).slice(2),Nt="__reactFiber$"+ar,Qr="__reactProps$"+ar,Tt="__reactContainer$"+ar,ni="__reactEvents$"+ar,Ym="__reactListeners$"+ar,Gm="__reactHandles$"+ar;function pn(e){var t=e[Nt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Tt]||n[Nt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ou(e);e!==null;){if(n=e[Nt])return n;e=Ou(e)}return t}e=n,n=e.parentNode}return null}function ra(e){return e=e[Nt]||e[Tt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function An(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(b(33))}function bo(e){return e[Qr]||null}var ri=[],In=-1;function rn(e){return{current:e}}function Z(e){0>In||(e.current=ri[In],ri[In]=null,In--)}function X(e,t){In++,ri[In]=e.current,e.current=t}var tn={},Pe=rn(tn),Be=rn(!1),gn=tn;function Xn(e,t){var n=e.type.contextTypes;if(!n)return tn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a={},o;for(o in n)a[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function Ve(e){return e=e.childContextTypes,e!=null}function io(){Z(Be),Z(Pe)}function ju(e,t,n){if(Pe.current!==tn)throw Error(b(168));X(Pe,t),X(Be,n)}function od(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var a in r)if(!(a in t))throw Error(b(108,jp(e)||"Unknown",a));return oe({},n,r)}function so(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||tn,gn=Pe.current,X(Pe,e),X(Be,Be.current),!0}function Au(e,t,n){var r=e.stateNode;if(!r)throw Error(b(169));n?(e=od(e,t,gn),r.__reactInternalMemoizedMergedChildContext=e,Z(Be),Z(Pe),X(Pe,e)):Z(Be),X(Be,n)}var Rt=null,Co=!1,Sl=!1;function ld(e){Rt===null?Rt=[e]:Rt.push(e)}function Xm(e){Co=!0,ld(e)}function an(){if(!Sl&&Rt!==null){Sl=!0;var e=0,t=Y;try{var n=Rt;for(Y=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Rt=null,Co=!1}catch(a){throw Rt!==null&&(Rt=Rt.slice(e+1)),Tc(Pi,an),a}finally{Y=t,Sl=!1}}return null}var Un=[],Mn=0,uo=null,co=0,Ze=[],et=0,_n=null,bt=1,Ct="";function dn(e,t){Un[Mn++]=co,Un[Mn++]=uo,uo=e,co=t}function id(e,t,n){Ze[et++]=bt,Ze[et++]=Ct,Ze[et++]=_n,_n=e;var r=bt;e=Ct;var a=32-dt(r)-1;r&=~(1<<a),n+=1;var o=32-dt(t)+a;if(30<o){var l=a-a%5;o=(r&(1<<l)-1).toString(32),r>>=l,a-=l,bt=1<<32-dt(t)+a|n<<a|r,Ct=o+e}else bt=1<<o|n<<a|r,Ct=e}function Ui(e){e.return!==null&&(dn(e,1),id(e,1,0))}function Mi(e){for(;e===uo;)uo=Un[--Mn],Un[Mn]=null,co=Un[--Mn],Un[Mn]=null;for(;e===_n;)_n=Ze[--et],Ze[et]=null,Ct=Ze[--et],Ze[et]=null,bt=Ze[--et],Ze[et]=null}var Je=null,Ke=null,te=!1,ct=null;function sd(e,t){var n=tt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Iu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Je=e,Ke=Yt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Je=e,Ke=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=_n!==null?{id:bt,overflow:Ct}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=tt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Je=e,Ke=null,!0):!1;default:return!1}}function ai(e){return(e.mode&1)!==0&&(e.flags&128)===0}function oi(e){if(te){var t=Ke;if(t){var n=t;if(!Iu(e,t)){if(ai(e))throw Error(b(418));t=Yt(n.nextSibling);var r=Je;t&&Iu(e,t)?sd(r,n):(e.flags=e.flags&-4097|2,te=!1,Je=e)}}else{if(ai(e))throw Error(b(418));e.flags=e.flags&-4097|2,te=!1,Je=e}}}function Uu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Je=e}function Aa(e){if(e!==Je)return!1;if(!te)return Uu(e),te=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!ei(e.type,e.memoizedProps)),t&&(t=Ke)){if(ai(e))throw ud(),Error(b(418));for(;t;)sd(e,t),t=Yt(t.nextSibling)}if(Uu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(b(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ke=Yt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ke=null}}else Ke=Je?Yt(e.stateNode.nextSibling):null;return!0}function ud(){for(var e=Ke;e;)e=Yt(e.nextSibling)}function qn(){Ke=Je=null,te=!1}function zi(e){ct===null?ct=[e]:ct.push(e)}var qm=Lt.ReactCurrentBatchConfig;function Nr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(b(309));var r=n.stateNode}if(!r)throw Error(b(147,e));var a=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(l){var i=a.refs;l===null?delete i[o]:i[o]=l},t._stringRef=o,t)}if(typeof e!="string")throw Error(b(284));if(!n._owner)throw Error(b(290,e))}return e}function Ia(e,t){throw e=Object.prototype.toString.call(t),Error(b(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Mu(e){var t=e._init;return t(e._payload)}function cd(e){function t(d,u){if(e){var f=d.deletions;f===null?(d.deletions=[u],d.flags|=16):f.push(u)}}function n(d,u){if(!e)return null;for(;u!==null;)t(d,u),u=u.sibling;return null}function r(d,u){for(d=new Map;u!==null;)u.key!==null?d.set(u.key,u):d.set(u.index,u),u=u.sibling;return d}function a(d,u){return d=Zt(d,u),d.index=0,d.sibling=null,d}function o(d,u,f){return d.index=f,e?(f=d.alternate,f!==null?(f=f.index,f<u?(d.flags|=2,u):f):(d.flags|=2,u)):(d.flags|=1048576,u)}function l(d){return e&&d.alternate===null&&(d.flags|=2),d}function i(d,u,f,g){return u===null||u.tag!==6?(u=xl(f,d.mode,g),u.return=d,u):(u=a(u,f),u.return=d,u)}function s(d,u,f,g){var x=f.type;return x===Fn?m(d,u,f.props.children,g,f.key):u!==null&&(u.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===Mt&&Mu(x)===u.type)?(g=a(u,f.props),g.ref=Nr(d,u,f),g.return=d,g):(g=Xa(f.type,f.key,f.props,null,d.mode,g),g.ref=Nr(d,u,f),g.return=d,g)}function c(d,u,f,g){return u===null||u.tag!==4||u.stateNode.containerInfo!==f.containerInfo||u.stateNode.implementation!==f.implementation?(u=Pl(f,d.mode,g),u.return=d,u):(u=a(u,f.children||[]),u.return=d,u)}function m(d,u,f,g,x){return u===null||u.tag!==7?(u=yn(f,d.mode,g,x),u.return=d,u):(u=a(u,f),u.return=d,u)}function h(d,u,f){if(typeof u=="string"&&u!==""||typeof u=="number")return u=xl(""+u,d.mode,f),u.return=d,u;if(typeof u=="object"&&u!==null){switch(u.$$typeof){case Ea:return f=Xa(u.type,u.key,u.props,null,d.mode,f),f.ref=Nr(d,null,u),f.return=d,f;case Dn:return u=Pl(u,d.mode,f),u.return=d,u;case Mt:var g=u._init;return h(d,g(u._payload),f)}if(Rr(u)||yr(u))return u=yn(u,d.mode,f,null),u.return=d,u;Ia(d,u)}return null}function v(d,u,f,g){var x=u!==null?u.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return x!==null?null:i(d,u,""+f,g);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Ea:return f.key===x?s(d,u,f,g):null;case Dn:return f.key===x?c(d,u,f,g):null;case Mt:return x=f._init,v(d,u,x(f._payload),g)}if(Rr(f)||yr(f))return x!==null?null:m(d,u,f,g,null);Ia(d,f)}return null}function E(d,u,f,g,x){if(typeof g=="string"&&g!==""||typeof g=="number")return d=d.get(f)||null,i(u,d,""+g,x);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Ea:return d=d.get(g.key===null?f:g.key)||null,s(u,d,g,x);case Dn:return d=d.get(g.key===null?f:g.key)||null,c(u,d,g,x);case Mt:var P=g._init;return E(d,u,f,P(g._payload),x)}if(Rr(g)||yr(g))return d=d.get(f)||null,m(u,d,g,x,null);Ia(u,g)}return null}function S(d,u,f,g){for(var x=null,P=null,L=u,T=u=0,M=null;L!==null&&T<f.length;T++){L.index>T?(M=L,L=null):M=L.sibling;var j=v(d,L,f[T],g);if(j===null){L===null&&(L=M);break}e&&L&&j.alternate===null&&t(d,L),u=o(j,u,T),P===null?x=j:P.sibling=j,P=j,L=M}if(T===f.length)return n(d,L),te&&dn(d,T),x;if(L===null){for(;T<f.length;T++)L=h(d,f[T],g),L!==null&&(u=o(L,u,T),P===null?x=L:P.sibling=L,P=L);return te&&dn(d,T),x}for(L=r(d,L);T<f.length;T++)M=E(L,d,T,f[T],g),M!==null&&(e&&M.alternate!==null&&L.delete(M.key===null?T:M.key),u=o(M,u,T),P===null?x=M:P.sibling=M,P=M);return e&&L.forEach(function(W){return t(d,W)}),te&&dn(d,T),x}function w(d,u,f,g){var x=yr(f);if(typeof x!="function")throw Error(b(150));if(f=x.call(f),f==null)throw Error(b(151));for(var P=x=null,L=u,T=u=0,M=null,j=f.next();L!==null&&!j.done;T++,j=f.next()){L.index>T?(M=L,L=null):M=L.sibling;var W=v(d,L,j.value,g);if(W===null){L===null&&(L=M);break}e&&L&&W.alternate===null&&t(d,L),u=o(W,u,T),P===null?x=W:P.sibling=W,P=W,L=M}if(j.done)return n(d,L),te&&dn(d,T),x;if(L===null){for(;!j.done;T++,j=f.next())j=h(d,j.value,g),j!==null&&(u=o(j,u,T),P===null?x=j:P.sibling=j,P=j);return te&&dn(d,T),x}for(L=r(d,L);!j.done;T++,j=f.next())j=E(L,d,T,j.value,g),j!==null&&(e&&j.alternate!==null&&L.delete(j.key===null?T:j.key),u=o(j,u,T),P===null?x=j:P.sibling=j,P=j);return e&&L.forEach(function(ke){return t(d,ke)}),te&&dn(d,T),x}function N(d,u,f,g){if(typeof f=="object"&&f!==null&&f.type===Fn&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case Ea:e:{for(var x=f.key,P=u;P!==null;){if(P.key===x){if(x=f.type,x===Fn){if(P.tag===7){n(d,P.sibling),u=a(P,f.props.children),u.return=d,d=u;break e}}else if(P.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===Mt&&Mu(x)===P.type){n(d,P.sibling),u=a(P,f.props),u.ref=Nr(d,P,f),u.return=d,d=u;break e}n(d,P);break}else t(d,P);P=P.sibling}f.type===Fn?(u=yn(f.props.children,d.mode,g,f.key),u.return=d,d=u):(g=Xa(f.type,f.key,f.props,null,d.mode,g),g.ref=Nr(d,u,f),g.return=d,d=g)}return l(d);case Dn:e:{for(P=f.key;u!==null;){if(u.key===P)if(u.tag===4&&u.stateNode.containerInfo===f.containerInfo&&u.stateNode.implementation===f.implementation){n(d,u.sibling),u=a(u,f.children||[]),u.return=d,d=u;break e}else{n(d,u);break}else t(d,u);u=u.sibling}u=Pl(f,d.mode,g),u.return=d,d=u}return l(d);case Mt:return P=f._init,N(d,u,P(f._payload),g)}if(Rr(f))return S(d,u,f,g);if(yr(f))return w(d,u,f,g);Ia(d,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,u!==null&&u.tag===6?(n(d,u.sibling),u=a(u,f),u.return=d,d=u):(n(d,u),u=xl(f,d.mode,g),u.return=d,d=u),l(d)):n(d,u)}return N}var Zn=cd(!0),dd=cd(!1),fo=rn(null),po=null,zn=null,Bi=null;function Vi(){Bi=zn=po=null}function Hi(e){var t=fo.current;Z(fo),e._currentValue=t}function li(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Qn(e,t){po=e,Bi=zn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(ze=!0),e.firstContext=null)}function rt(e){var t=e._currentValue;if(Bi!==e)if(e={context:e,memoizedValue:t,next:null},zn===null){if(po===null)throw Error(b(308));zn=e,po.dependencies={lanes:0,firstContext:e}}else zn=zn.next=e;return t}var mn=null;function Wi(e){mn===null?mn=[e]:mn.push(e)}function fd(e,t,n,r){var a=t.interleaved;return a===null?(n.next=n,Wi(t)):(n.next=a.next,a.next=n),t.interleaved=n,Dt(e,r)}function Dt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var zt=!1;function Ki(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function pd(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function xt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Gt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(K&2)!==0){var a=r.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),r.pending=t,Dt(e,n)}return a=r.interleaved,a===null?(t.next=t,Wi(r)):(t.next=a.next,a.next=t),r.interleaved=t,Dt(e,n)}function Wa(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ti(e,n)}}function zu(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var a=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?a=o=l:o=o.next=l,n=n.next}while(n!==null);o===null?a=o=t:o=o.next=t}else a=o=t;n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function mo(e,t,n,r){var a=e.updateQueue;zt=!1;var o=a.firstBaseUpdate,l=a.lastBaseUpdate,i=a.shared.pending;if(i!==null){a.shared.pending=null;var s=i,c=s.next;s.next=null,l===null?o=c:l.next=c,l=s;var m=e.alternate;m!==null&&(m=m.updateQueue,i=m.lastBaseUpdate,i!==l&&(i===null?m.firstBaseUpdate=c:i.next=c,m.lastBaseUpdate=s))}if(o!==null){var h=a.baseState;l=0,m=c=s=null,i=o;do{var v=i.lane,E=i.eventTime;if((r&v)===v){m!==null&&(m=m.next={eventTime:E,lane:0,tag:i.tag,payload:i.payload,callback:i.callback,next:null});e:{var S=e,w=i;switch(v=t,E=n,w.tag){case 1:if(S=w.payload,typeof S=="function"){h=S.call(E,h,v);break e}h=S;break e;case 3:S.flags=S.flags&-65537|128;case 0:if(S=w.payload,v=typeof S=="function"?S.call(E,h,v):S,v==null)break e;h=oe({},h,v);break e;case 2:zt=!0}}i.callback!==null&&i.lane!==0&&(e.flags|=64,v=a.effects,v===null?a.effects=[i]:v.push(i))}else E={eventTime:E,lane:v,tag:i.tag,payload:i.payload,callback:i.callback,next:null},m===null?(c=m=E,s=h):m=m.next=E,l|=v;if(i=i.next,i===null){if(i=a.shared.pending,i===null)break;v=i,i=v.next,v.next=null,a.lastBaseUpdate=v,a.shared.pending=null}}while(!0);if(m===null&&(s=h),a.baseState=s,a.firstBaseUpdate=c,a.lastBaseUpdate=m,t=a.shared.interleaved,t!==null){a=t;do l|=a.lane,a=a.next;while(a!==t)}else o===null&&(a.shared.lanes=0);Nn|=l,e.lanes=l,e.memoizedState=h}}function Bu(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(a!==null){if(r.callback=null,r=n,typeof a!="function")throw Error(b(191,a));a.call(r)}}}var aa={},Et=rn(aa),Yr=rn(aa),Gr=rn(aa);function hn(e){if(e===aa)throw Error(b(174));return e}function Ji(e,t){switch(X(Gr,t),X(Yr,e),X(Et,aa),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ml(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ml(t,e)}Z(Et),X(Et,t)}function er(){Z(Et),Z(Yr),Z(Gr)}function md(e){hn(Gr.current);var t=hn(Et.current),n=Ml(t,e.type);t!==n&&(X(Yr,e),X(Et,n))}function Qi(e){Yr.current===e&&(Z(Et),Z(Yr))}var re=rn(0);function ho(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var El=[];function Yi(){for(var e=0;e<El.length;e++)El[e]._workInProgressVersionPrimary=null;El.length=0}var Ka=Lt.ReactCurrentDispatcher,kl=Lt.ReactCurrentBatchConfig,wn=0,ae=null,he=null,_e=null,vo=!1,Lr=!1,Xr=0,Zm=0;function be(){throw Error(b(321))}function Gi(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!pt(e[n],t[n]))return!1;return!0}function Xi(e,t,n,r,a,o){if(wn=o,ae=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ka.current=e===null||e.memoizedState===null?rh:ah,e=n(r,a),Lr){o=0;do{if(Lr=!1,Xr=0,25<=o)throw Error(b(301));o+=1,_e=he=null,t.updateQueue=null,Ka.current=oh,e=n(r,a)}while(Lr)}if(Ka.current=yo,t=he!==null&&he.next!==null,wn=0,_e=he=ae=null,vo=!1,t)throw Error(b(300));return e}function qi(){var e=Xr!==0;return Xr=0,e}function wt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _e===null?ae.memoizedState=_e=e:_e=_e.next=e,_e}function at(){if(he===null){var e=ae.alternate;e=e!==null?e.memoizedState:null}else e=he.next;var t=_e===null?ae.memoizedState:_e.next;if(t!==null)_e=t,he=e;else{if(e===null)throw Error(b(310));he=e,e={memoizedState:he.memoizedState,baseState:he.baseState,baseQueue:he.baseQueue,queue:he.queue,next:null},_e===null?ae.memoizedState=_e=e:_e=_e.next=e}return _e}function qr(e,t){return typeof t=="function"?t(e):t}function $l(e){var t=at(),n=t.queue;if(n===null)throw Error(b(311));n.lastRenderedReducer=e;var r=he,a=r.baseQueue,o=n.pending;if(o!==null){if(a!==null){var l=a.next;a.next=o.next,o.next=l}r.baseQueue=a=o,n.pending=null}if(a!==null){o=a.next,r=r.baseState;var i=l=null,s=null,c=o;do{var m=c.lane;if((wn&m)===m)s!==null&&(s=s.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var h={lane:m,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};s===null?(i=s=h,l=r):s=s.next=h,ae.lanes|=m,Nn|=m}c=c.next}while(c!==null&&c!==o);s===null?l=r:s.next=i,pt(r,t.memoizedState)||(ze=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=s,n.lastRenderedState=r}if(e=n.interleaved,e!==null){a=e;do o=a.lane,ae.lanes|=o,Nn|=o,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Rl(e){var t=at(),n=t.queue;if(n===null)throw Error(b(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var l=a=a.next;do o=e(o,l.action),l=l.next;while(l!==a);pt(o,t.memoizedState)||(ze=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function hd(){}function vd(e,t){var n=ae,r=at(),a=t(),o=!pt(r.memoizedState,a);if(o&&(r.memoizedState=a,ze=!0),r=r.queue,Zi(_d.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||_e!==null&&_e.memoizedState.tag&1){if(n.flags|=2048,Zr(9,gd.bind(null,n,r,a,t),void 0,null),we===null)throw Error(b(349));(wn&30)!==0||yd(n,t,a)}return a}function yd(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ae.updateQueue,t===null?(t={lastEffect:null,stores:null},ae.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function gd(e,t,n,r){t.value=n,t.getSnapshot=r,wd(t)&&Nd(e)}function _d(e,t,n){return n(function(){wd(t)&&Nd(e)})}function wd(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!pt(e,n)}catch{return!0}}function Nd(e){var t=Dt(e,1);t!==null&&ft(t,e,1,-1)}function Vu(e){var t=wt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:qr,lastRenderedState:e},t.queue=e,e=e.dispatch=nh.bind(null,ae,e),[t.memoizedState,e]}function Zr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ae.updateQueue,t===null?(t={lastEffect:null,stores:null},ae.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Sd(){return at().memoizedState}function Ja(e,t,n,r){var a=wt();ae.flags|=e,a.memoizedState=Zr(1|t,n,void 0,r===void 0?null:r)}function xo(e,t,n,r){var a=at();r=r===void 0?null:r;var o=void 0;if(he!==null){var l=he.memoizedState;if(o=l.destroy,r!==null&&Gi(r,l.deps)){a.memoizedState=Zr(t,n,o,r);return}}ae.flags|=e,a.memoizedState=Zr(1|t,n,o,r)}function Hu(e,t){return Ja(8390656,8,e,t)}function Zi(e,t){return xo(2048,8,e,t)}function Ed(e,t){return xo(4,2,e,t)}function kd(e,t){return xo(4,4,e,t)}function $d(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Rd(e,t,n){return n=n!=null?n.concat([e]):null,xo(4,4,$d.bind(null,t,e),n)}function es(){}function bd(e,t){var n=at();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Gi(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Cd(e,t){var n=at();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Gi(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function xd(e,t,n){return(wn&21)===0?(e.baseState&&(e.baseState=!1,ze=!0),e.memoizedState=n):(pt(n,t)||(n=Lc(),ae.lanes|=n,Nn|=n,e.baseState=!0),t)}function eh(e,t){var n=Y;Y=n!==0&&4>n?n:4,e(!0);var r=kl.transition;kl.transition={};try{e(!1),t()}finally{Y=n,kl.transition=r}}function Pd(){return at().memoizedState}function th(e,t,n){var r=qt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Td(e))Dd(t,n);else if(n=fd(e,t,n,r),n!==null){var a=Ae();ft(n,e,r,a),Fd(n,t,r)}}function nh(e,t,n){var r=qt(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Td(e))Dd(t,a);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var l=t.lastRenderedState,i=o(l,n);if(a.hasEagerState=!0,a.eagerState=i,pt(i,l)){var s=t.interleaved;s===null?(a.next=a,Wi(t)):(a.next=s.next,s.next=a),t.interleaved=a;return}}catch{}finally{}n=fd(e,t,a,r),n!==null&&(a=Ae(),ft(n,e,r,a),Fd(n,t,r))}}function Td(e){var t=e.alternate;return e===ae||t!==null&&t===ae}function Dd(e,t){Lr=vo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Fd(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ti(e,n)}}var yo={readContext:rt,useCallback:be,useContext:be,useEffect:be,useImperativeHandle:be,useInsertionEffect:be,useLayoutEffect:be,useMemo:be,useReducer:be,useRef:be,useState:be,useDebugValue:be,useDeferredValue:be,useTransition:be,useMutableSource:be,useSyncExternalStore:be,useId:be,unstable_isNewReconciler:!1},rh={readContext:rt,useCallback:function(e,t){return wt().memoizedState=[e,t===void 0?null:t],e},useContext:rt,useEffect:Hu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Ja(4194308,4,$d.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ja(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ja(4,2,e,t)},useMemo:function(e,t){var n=wt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=wt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=th.bind(null,ae,e),[r.memoizedState,e]},useRef:function(e){var t=wt();return e={current:e},t.memoizedState=e},useState:Vu,useDebugValue:es,useDeferredValue:function(e){return wt().memoizedState=e},useTransition:function(){var e=Vu(!1),t=e[0];return e=eh.bind(null,e[1]),wt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ae,a=wt();if(te){if(n===void 0)throw Error(b(407));n=n()}else{if(n=t(),we===null)throw Error(b(349));(wn&30)!==0||yd(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Hu(_d.bind(null,r,o,e),[e]),r.flags|=2048,Zr(9,gd.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=wt(),t=we.identifierPrefix;if(te){var n=Ct,r=bt;n=(r&~(1<<32-dt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Xr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Zm++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},ah={readContext:rt,useCallback:bd,useContext:rt,useEffect:Zi,useImperativeHandle:Rd,useInsertionEffect:Ed,useLayoutEffect:kd,useMemo:Cd,useReducer:$l,useRef:Sd,useState:function(){return $l(qr)},useDebugValue:es,useDeferredValue:function(e){var t=at();return xd(t,he.memoizedState,e)},useTransition:function(){var e=$l(qr)[0],t=at().memoizedState;return[e,t]},useMutableSource:hd,useSyncExternalStore:vd,useId:Pd,unstable_isNewReconciler:!1},oh={readContext:rt,useCallback:bd,useContext:rt,useEffect:Zi,useImperativeHandle:Rd,useInsertionEffect:Ed,useLayoutEffect:kd,useMemo:Cd,useReducer:Rl,useRef:Sd,useState:function(){return Rl(qr)},useDebugValue:es,useDeferredValue:function(e){var t=at();return he===null?t.memoizedState=e:xd(t,he.memoizedState,e)},useTransition:function(){var e=Rl(qr)[0],t=at().memoizedState;return[e,t]},useMutableSource:hd,useSyncExternalStore:vd,useId:Pd,unstable_isNewReconciler:!1};function st(e,t){if(e&&e.defaultProps){t=oe({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ii(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:oe({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Po={isMounted:function(e){return(e=e._reactInternals)?kn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ae(),a=qt(e),o=xt(r,a);o.payload=t,n!=null&&(o.callback=n),t=Gt(e,o,a),t!==null&&(ft(t,e,a,r),Wa(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ae(),a=qt(e),o=xt(r,a);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=Gt(e,o,a),t!==null&&(ft(t,e,a,r),Wa(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ae(),r=qt(e),a=xt(n,r);a.tag=2,t!=null&&(a.callback=t),t=Gt(e,a,r),t!==null&&(ft(t,e,r,n),Wa(t,e,r))}};function Wu(e,t,n,r,a,o,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,l):t.prototype&&t.prototype.isPureReactComponent?!Wr(n,r)||!Wr(a,o):!0}function Ld(e,t,n){var r=!1,a=tn,o=t.contextType;return typeof o=="object"&&o!==null?o=rt(o):(a=Ve(t)?gn:Pe.current,r=t.contextTypes,o=(r=r!=null)?Xn(e,a):tn),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Po,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=o),t}function Ku(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Po.enqueueReplaceState(t,t.state,null)}function si(e,t,n,r){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},Ki(e);var o=t.contextType;typeof o=="object"&&o!==null?a.context=rt(o):(o=Ve(t)?gn:Pe.current,a.context=Xn(e,o)),a.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(ii(e,t,o,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&Po.enqueueReplaceState(a,a.state,null),mo(e,n,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function tr(e,t){try{var n="",r=t;do n+=Op(r),r=r.return;while(r);var a=n}catch(o){a=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:a,digest:null}}function bl(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ui(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var lh=typeof WeakMap=="function"?WeakMap:Map;function Od(e,t,n){n=xt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){_o||(_o=!0,_i=r),ui(e,t)},n}function jd(e,t,n){n=xt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var a=t.value;n.payload=function(){return r(a)},n.callback=function(){ui(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){ui(e,t),typeof r!="function"&&(Xt===null?Xt=new Set([this]):Xt.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function Ju(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new lh;var a=new Set;r.set(t,a)}else a=r.get(t),a===void 0&&(a=new Set,r.set(t,a));a.has(n)||(a.add(n),e=wh.bind(null,e,t,n),t.then(e,e))}function Qu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Yu(e,t,n,r,a){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=xt(-1,1),t.tag=2,Gt(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=a,e)}var ih=Lt.ReactCurrentOwner,ze=!1;function je(e,t,n,r){t.child=e===null?dd(t,null,n,r):Zn(t,e.child,n,r)}function Gu(e,t,n,r,a){n=n.render;var o=t.ref;return Qn(t,a),r=Xi(e,t,n,r,o,a),n=qi(),e!==null&&!ze?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Ft(e,t,a)):(te&&n&&Ui(t),t.flags|=1,je(e,t,r,a),t.child)}function Xu(e,t,n,r,a){if(e===null){var o=n.type;return typeof o=="function"&&!ss(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Ad(e,t,o,r,a)):(e=Xa(n.type,null,r,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,(e.lanes&a)===0){var l=o.memoizedProps;if(n=n.compare,n=n!==null?n:Wr,n(l,r)&&e.ref===t.ref)return Ft(e,t,a)}return t.flags|=1,e=Zt(o,r),e.ref=t.ref,e.return=t,t.child=e}function Ad(e,t,n,r,a){if(e!==null){var o=e.memoizedProps;if(Wr(o,r)&&e.ref===t.ref)if(ze=!1,t.pendingProps=r=o,(e.lanes&a)!==0)(e.flags&131072)!==0&&(ze=!0);else return t.lanes=e.lanes,Ft(e,t,a)}return ci(e,t,n,r,a)}function Id(e,t,n){var r=t.pendingProps,a=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},X(Vn,We),We|=n;else{if((n&1073741824)===0)return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,X(Vn,We),We|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,X(Vn,We),We|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,X(Vn,We),We|=r;return je(e,t,a,n),t.child}function Ud(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ci(e,t,n,r,a){var o=Ve(n)?gn:Pe.current;return o=Xn(t,o),Qn(t,a),n=Xi(e,t,n,r,o,a),r=qi(),e!==null&&!ze?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Ft(e,t,a)):(te&&r&&Ui(t),t.flags|=1,je(e,t,n,a),t.child)}function qu(e,t,n,r,a){if(Ve(n)){var o=!0;so(t)}else o=!1;if(Qn(t,a),t.stateNode===null)Qa(e,t),Ld(t,n,r),si(t,n,r,a),r=!0;else if(e===null){var l=t.stateNode,i=t.memoizedProps;l.props=i;var s=l.context,c=n.contextType;typeof c=="object"&&c!==null?c=rt(c):(c=Ve(n)?gn:Pe.current,c=Xn(t,c));var m=n.getDerivedStateFromProps,h=typeof m=="function"||typeof l.getSnapshotBeforeUpdate=="function";h||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==r||s!==c)&&Ku(t,l,r,c),zt=!1;var v=t.memoizedState;l.state=v,mo(t,r,l,a),s=t.memoizedState,i!==r||v!==s||Be.current||zt?(typeof m=="function"&&(ii(t,n,m,r),s=t.memoizedState),(i=zt||Wu(t,n,i,r,v,s,c))?(h||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=s),l.props=r,l.state=s,l.context=c,r=i):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,pd(e,t),i=t.memoizedProps,c=t.type===t.elementType?i:st(t.type,i),l.props=c,h=t.pendingProps,v=l.context,s=n.contextType,typeof s=="object"&&s!==null?s=rt(s):(s=Ve(n)?gn:Pe.current,s=Xn(t,s));var E=n.getDerivedStateFromProps;(m=typeof E=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(i!==h||v!==s)&&Ku(t,l,r,s),zt=!1,v=t.memoizedState,l.state=v,mo(t,r,l,a);var S=t.memoizedState;i!==h||v!==S||Be.current||zt?(typeof E=="function"&&(ii(t,n,E,r),S=t.memoizedState),(c=zt||Wu(t,n,c,r,v,S,s)||!1)?(m||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,S,s),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,S,s)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=S),l.props=r,l.state=S,l.context=s,r=c):(typeof l.componentDidUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||i===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),r=!1)}return di(e,t,n,r,o,a)}function di(e,t,n,r,a,o){Ud(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return a&&Au(t,n,!1),Ft(e,t,o);r=t.stateNode,ih.current=t;var i=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=Zn(t,e.child,null,o),t.child=Zn(t,null,i,o)):je(e,t,i,o),t.memoizedState=r.state,a&&Au(t,n,!0),t.child}function Md(e){var t=e.stateNode;t.pendingContext?ju(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ju(e,t.context,!1),Ji(e,t.containerInfo)}function Zu(e,t,n,r,a){return qn(),zi(a),t.flags|=256,je(e,t,n,r),t.child}var fi={dehydrated:null,treeContext:null,retryLane:0};function pi(e){return{baseLanes:e,cachePool:null,transitions:null}}function zd(e,t,n){var r=t.pendingProps,a=re.current,o=!1,l=(t.flags&128)!==0,i;if((i=l)||(i=e!==null&&e.memoizedState===null?!1:(a&2)!==0),i?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),X(re,a&1),e===null)return oi(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(l=r.children,e=r.fallback,o?(r=t.mode,o=t.child,l={mode:"hidden",children:l},(r&1)===0&&o!==null?(o.childLanes=0,o.pendingProps=l):o=Fo(l,r,0,null),e=yn(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=pi(n),t.memoizedState=fi,e):ts(t,l));if(a=e.memoizedState,a!==null&&(i=a.dehydrated,i!==null))return sh(e,t,l,r,i,a,n);if(o){o=r.fallback,l=t.mode,a=e.child,i=a.sibling;var s={mode:"hidden",children:r.children};return(l&1)===0&&t.child!==a?(r=t.child,r.childLanes=0,r.pendingProps=s,t.deletions=null):(r=Zt(a,s),r.subtreeFlags=a.subtreeFlags&14680064),i!==null?o=Zt(i,o):(o=yn(o,l,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,l=e.child.memoizedState,l=l===null?pi(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},o.memoizedState=l,o.childLanes=e.childLanes&~n,t.memoizedState=fi,r}return o=e.child,e=o.sibling,r=Zt(o,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function ts(e,t){return t=Fo({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ua(e,t,n,r){return r!==null&&zi(r),Zn(t,e.child,null,n),e=ts(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function sh(e,t,n,r,a,o,l){if(n)return t.flags&256?(t.flags&=-257,r=bl(Error(b(422))),Ua(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,a=t.mode,r=Fo({mode:"visible",children:r.children},a,0,null),o=yn(o,a,l,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,(t.mode&1)!==0&&Zn(t,e.child,null,l),t.child.memoizedState=pi(l),t.memoizedState=fi,o);if((t.mode&1)===0)return Ua(e,t,l,null);if(a.data==="$!"){if(r=a.nextSibling&&a.nextSibling.dataset,r)var i=r.dgst;return r=i,o=Error(b(419)),r=bl(o,r,void 0),Ua(e,t,l,r)}if(i=(l&e.childLanes)!==0,ze||i){if(r=we,r!==null){switch(l&-l){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(r.suspendedLanes|l))!==0?0:a,a!==0&&a!==o.retryLane&&(o.retryLane=a,Dt(e,a),ft(r,e,a,-1))}return is(),r=bl(Error(b(421))),Ua(e,t,l,r)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Nh.bind(null,e),a._reactRetry=t,null):(e=o.treeContext,Ke=Yt(a.nextSibling),Je=t,te=!0,ct=null,e!==null&&(Ze[et++]=bt,Ze[et++]=Ct,Ze[et++]=_n,bt=e.id,Ct=e.overflow,_n=t),t=ts(t,r.children),t.flags|=4096,t)}function ec(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),li(e.return,t,n)}function Cl(e,t,n,r,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=a)}function Bd(e,t,n){var r=t.pendingProps,a=r.revealOrder,o=r.tail;if(je(e,t,r.children,n),r=re.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ec(e,n,t);else if(e.tag===19)ec(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(X(re,r),(t.mode&1)===0)t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&ho(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Cl(t,!1,a,n,o);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&ho(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Cl(t,!0,n,null,o);break;case"together":Cl(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Qa(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Ft(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Nn|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(b(153));if(t.child!==null){for(e=t.child,n=Zt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Zt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function uh(e,t,n){switch(t.tag){case 3:Md(t),qn();break;case 5:md(t);break;case 1:Ve(t.type)&&so(t);break;case 4:Ji(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,a=t.memoizedProps.value;X(fo,r._currentValue),r._currentValue=a;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(X(re,re.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?zd(e,t,n):(X(re,re.current&1),e=Ft(e,t,n),e!==null?e.sibling:null);X(re,re.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Bd(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),X(re,re.current),r)break;return null;case 22:case 23:return t.lanes=0,Id(e,t,n)}return Ft(e,t,n)}var Vd,mi,Hd,Wd;Vd=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};mi=function(){};Hd=function(e,t,n,r){var a=e.memoizedProps;if(a!==r){e=t.stateNode,hn(Et.current);var o=null;switch(n){case"input":a=jl(e,a),r=jl(e,r),o=[];break;case"select":a=oe({},a,{value:void 0}),r=oe({},r,{value:void 0}),o=[];break;case"textarea":a=Ul(e,a),r=Ul(e,r),o=[];break;default:typeof a.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=lo)}zl(n,r);var l;n=null;for(c in a)if(!r.hasOwnProperty(c)&&a.hasOwnProperty(c)&&a[c]!=null)if(c==="style"){var i=a[c];for(l in i)i.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ir.hasOwnProperty(c)?o||(o=[]):(o=o||[]).push(c,null));for(c in r){var s=r[c];if(i=a?.[c],r.hasOwnProperty(c)&&s!==i&&(s!=null||i!=null))if(c==="style")if(i){for(l in i)!i.hasOwnProperty(l)||s&&s.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in s)s.hasOwnProperty(l)&&i[l]!==s[l]&&(n||(n={}),n[l]=s[l])}else n||(o||(o=[]),o.push(c,n)),n=s;else c==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,i=i?i.__html:void 0,s!=null&&i!==s&&(o=o||[]).push(c,s)):c==="children"?typeof s!="string"&&typeof s!="number"||(o=o||[]).push(c,""+s):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ir.hasOwnProperty(c)?(s!=null&&c==="onScroll"&&q("scroll",e),o||i===s||(o=[])):(o=o||[]).push(c,s))}n&&(o=o||[]).push("style",n);var c=o;(t.updateQueue=c)&&(t.flags|=4)}};Wd=function(e,t,n,r){n!==r&&(t.flags|=4)};function Sr(e,t){if(!te)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ce(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags&14680064,r|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function ch(e,t,n){var r=t.pendingProps;switch(Mi(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ce(t),null;case 1:return Ve(t.type)&&io(),Ce(t),null;case 3:return r=t.stateNode,er(),Z(Be),Z(Pe),Yi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Aa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,ct!==null&&(Si(ct),ct=null))),mi(e,t),Ce(t),null;case 5:Qi(t);var a=hn(Gr.current);if(n=t.type,e!==null&&t.stateNode!=null)Hd(e,t,n,r,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(b(166));return Ce(t),null}if(e=hn(Et.current),Aa(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[Nt]=t,r[Qr]=o,e=(t.mode&1)!==0,n){case"dialog":q("cancel",r),q("close",r);break;case"iframe":case"object":case"embed":q("load",r);break;case"video":case"audio":for(a=0;a<Cr.length;a++)q(Cr[a],r);break;case"source":q("error",r);break;case"img":case"image":case"link":q("error",r),q("load",r);break;case"details":q("toggle",r);break;case"input":su(r,o),q("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},q("invalid",r);break;case"textarea":cu(r,o),q("invalid",r)}zl(n,o),a=null;for(var l in o)if(o.hasOwnProperty(l)){var i=o[l];l==="children"?typeof i=="string"?r.textContent!==i&&(o.suppressHydrationWarning!==!0&&ja(r.textContent,i,e),a=["children",i]):typeof i=="number"&&r.textContent!==""+i&&(o.suppressHydrationWarning!==!0&&ja(r.textContent,i,e),a=["children",""+i]):Ir.hasOwnProperty(l)&&i!=null&&l==="onScroll"&&q("scroll",r)}switch(n){case"input":ka(r),uu(r,o,!0);break;case"textarea":ka(r),du(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=lo)}r=a,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=_c(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),n==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[Nt]=t,e[Qr]=r,Vd(e,t,!1,!1),t.stateNode=e;e:{switch(l=Bl(n,r),n){case"dialog":q("cancel",e),q("close",e),a=r;break;case"iframe":case"object":case"embed":q("load",e),a=r;break;case"video":case"audio":for(a=0;a<Cr.length;a++)q(Cr[a],e);a=r;break;case"source":q("error",e),a=r;break;case"img":case"image":case"link":q("error",e),q("load",e),a=r;break;case"details":q("toggle",e),a=r;break;case"input":su(e,r),a=jl(e,r),q("invalid",e);break;case"option":a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=oe({},r,{value:void 0}),q("invalid",e);break;case"textarea":cu(e,r),a=Ul(e,r),q("invalid",e);break;default:a=r}zl(n,a),i=a;for(o in i)if(i.hasOwnProperty(o)){var s=i[o];o==="style"?Sc(e,s):o==="dangerouslySetInnerHTML"?(s=s?s.__html:void 0,s!=null&&wc(e,s)):o==="children"?typeof s=="string"?(n!=="textarea"||s!=="")&&Ur(e,s):typeof s=="number"&&Ur(e,""+s):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Ir.hasOwnProperty(o)?s!=null&&o==="onScroll"&&q("scroll",e):s!=null&&$i(e,o,s,l))}switch(n){case"input":ka(e),uu(e,r,!1);break;case"textarea":ka(e),du(e);break;case"option":r.value!=null&&e.setAttribute("value",""+en(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?Hn(e,!!r.multiple,o,!1):r.defaultValue!=null&&Hn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=lo)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ce(t),null;case 6:if(e&&t.stateNode!=null)Wd(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(b(166));if(n=hn(Gr.current),hn(Et.current),Aa(t)){if(r=t.stateNode,n=t.memoizedProps,r[Nt]=t,(o=r.nodeValue!==n)&&(e=Je,e!==null))switch(e.tag){case 3:ja(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ja(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Nt]=t,t.stateNode=r}return Ce(t),null;case 13:if(Z(re),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(te&&Ke!==null&&(t.mode&1)!==0&&(t.flags&128)===0)ud(),qn(),t.flags|=98560,o=!1;else if(o=Aa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(b(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(b(317));o[Nt]=t}else qn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Ce(t),o=!1}else ct!==null&&(Si(ct),ct=null),o=!0;if(!o)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(re.current&1)!==0?ve===0&&(ve=3):is())),t.updateQueue!==null&&(t.flags|=4),Ce(t),null);case 4:return er(),mi(e,t),e===null&&Kr(t.stateNode.containerInfo),Ce(t),null;case 10:return Hi(t.type._context),Ce(t),null;case 17:return Ve(t.type)&&io(),Ce(t),null;case 19:if(Z(re),o=t.memoizedState,o===null)return Ce(t),null;if(r=(t.flags&128)!==0,l=o.rendering,l===null)if(r)Sr(o,!1);else{if(ve!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(l=ho(e),l!==null){for(t.flags|=128,Sr(o,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,l=o.alternate,l===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=l.childLanes,o.lanes=l.lanes,o.child=l.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=l.memoizedProps,o.memoizedState=l.memoizedState,o.updateQueue=l.updateQueue,o.type=l.type,e=l.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return X(re,re.current&1|2),t.child}e=e.sibling}o.tail!==null&&ce()>nr&&(t.flags|=128,r=!0,Sr(o,!1),t.lanes=4194304)}else{if(!r)if(e=ho(l),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Sr(o,!0),o.tail===null&&o.tailMode==="hidden"&&!l.alternate&&!te)return Ce(t),null}else 2*ce()-o.renderingStartTime>nr&&n!==1073741824&&(t.flags|=128,r=!0,Sr(o,!1),t.lanes=4194304);o.isBackwards?(l.sibling=t.child,t.child=l):(n=o.last,n!==null?n.sibling=l:t.child=l,o.last=l)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=ce(),t.sibling=null,n=re.current,X(re,r?n&1|2:n&1),t):(Ce(t),null);case 22:case 23:return ls(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(We&1073741824)!==0&&(Ce(t),t.subtreeFlags&6&&(t.flags|=8192)):Ce(t),null;case 24:return null;case 25:return null}throw Error(b(156,t.tag))}function dh(e,t){switch(Mi(t),t.tag){case 1:return Ve(t.type)&&io(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return er(),Z(Be),Z(Pe),Yi(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Qi(t),null;case 13:if(Z(re),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(b(340));qn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Z(re),null;case 4:return er(),null;case 10:return Hi(t.type._context),null;case 22:case 23:return ls(),null;case 24:return null;default:return null}}var Ma=!1,xe=!1,fh=typeof WeakSet=="function"?WeakSet:Set,F=null;function Bn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){le(e,t,r)}else n.current=null}function hi(e,t,n){try{n()}catch(r){le(e,t,r)}}var tc=!1;function ph(e,t){if(ql=ro,e=Gc(),Ii(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var l=0,i=-1,s=-1,c=0,m=0,h=e,v=null;t:for(;;){for(var E;h!==n||a!==0&&h.nodeType!==3||(i=l+a),h!==o||r!==0&&h.nodeType!==3||(s=l+r),h.nodeType===3&&(l+=h.nodeValue.length),(E=h.firstChild)!==null;)v=h,h=E;for(;;){if(h===e)break t;if(v===n&&++c===a&&(i=l),v===o&&++m===r&&(s=l),(E=h.nextSibling)!==null)break;h=v,v=h.parentNode}h=E}n=i===-1||s===-1?null:{start:i,end:s}}else n=null}n=n||{start:0,end:0}}else n=null;for(Zl={focusedElem:e,selectionRange:n},ro=!1,F=t;F!==null;)if(t=F,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,F=e;else for(;F!==null;){t=F;try{var S=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(S!==null){var w=S.memoizedProps,N=S.memoizedState,d=t.stateNode,u=d.getSnapshotBeforeUpdate(t.elementType===t.type?w:st(t.type,w),N);d.__reactInternalSnapshotBeforeUpdate=u}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(b(163))}}catch(g){le(t,t.return,g)}if(e=t.sibling,e!==null){e.return=t.return,F=e;break}F=t.return}return S=tc,tc=!1,S}function Or(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var o=a.destroy;a.destroy=void 0,o!==void 0&&hi(t,n,o)}a=a.next}while(a!==r)}}function To(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function vi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Kd(e){var t=e.alternate;t!==null&&(e.alternate=null,Kd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Nt],delete t[Qr],delete t[ni],delete t[Ym],delete t[Gm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Jd(e){return e.tag===5||e.tag===3||e.tag===4}function nc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Jd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function yi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=lo));else if(r!==4&&(e=e.child,e!==null))for(yi(e,t,n),e=e.sibling;e!==null;)yi(e,t,n),e=e.sibling}function gi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(gi(e,t,n),e=e.sibling;e!==null;)gi(e,t,n),e=e.sibling}var Ne=null,ut=!1;function Ut(e,t,n){for(n=n.child;n!==null;)Qd(e,t,n),n=n.sibling}function Qd(e,t,n){if(St&&typeof St.onCommitFiberUnmount=="function")try{St.onCommitFiberUnmount(Eo,n)}catch{}switch(n.tag){case 5:xe||Bn(n,t);case 6:var r=Ne,a=ut;Ne=null,Ut(e,t,n),Ne=r,ut=a,Ne!==null&&(ut?(e=Ne,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Ne.removeChild(n.stateNode));break;case 18:Ne!==null&&(ut?(e=Ne,n=n.stateNode,e.nodeType===8?Nl(e.parentNode,n):e.nodeType===1&&Nl(e,n),Vr(e)):Nl(Ne,n.stateNode));break;case 4:r=Ne,a=ut,Ne=n.stateNode.containerInfo,ut=!0,Ut(e,t,n),Ne=r,ut=a;break;case 0:case 11:case 14:case 15:if(!xe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){a=r=r.next;do{var o=a,l=o.destroy;o=o.tag,l!==void 0&&((o&2)!==0||(o&4)!==0)&&hi(n,t,l),a=a.next}while(a!==r)}Ut(e,t,n);break;case 1:if(!xe&&(Bn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(i){le(n,t,i)}Ut(e,t,n);break;case 21:Ut(e,t,n);break;case 22:n.mode&1?(xe=(r=xe)||n.memoizedState!==null,Ut(e,t,n),xe=r):Ut(e,t,n);break;default:Ut(e,t,n)}}function rc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new fh),t.forEach(function(r){var a=Sh.bind(null,e,r);n.has(r)||(n.add(r),r.then(a,a))})}}function it(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r];try{var o=e,l=t,i=l;e:for(;i!==null;){switch(i.tag){case 5:Ne=i.stateNode,ut=!1;break e;case 3:Ne=i.stateNode.containerInfo,ut=!0;break e;case 4:Ne=i.stateNode.containerInfo,ut=!0;break e}i=i.return}if(Ne===null)throw Error(b(160));Qd(o,l,a),Ne=null,ut=!1;var s=a.alternate;s!==null&&(s.return=null),a.return=null}catch(c){le(a,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Yd(t,e),t=t.sibling}function Yd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(it(t,e),_t(e),r&4){try{Or(3,e,e.return),To(3,e)}catch(w){le(e,e.return,w)}try{Or(5,e,e.return)}catch(w){le(e,e.return,w)}}break;case 1:it(t,e),_t(e),r&512&&n!==null&&Bn(n,n.return);break;case 5:if(it(t,e),_t(e),r&512&&n!==null&&Bn(n,n.return),e.flags&32){var a=e.stateNode;try{Ur(a,"")}catch(w){le(e,e.return,w)}}if(r&4&&(a=e.stateNode,a!=null)){var o=e.memoizedProps,l=n!==null?n.memoizedProps:o,i=e.type,s=e.updateQueue;if(e.updateQueue=null,s!==null)try{i==="input"&&o.type==="radio"&&o.name!=null&&yc(a,o),Bl(i,l);var c=Bl(i,o);for(l=0;l<s.length;l+=2){var m=s[l],h=s[l+1];m==="style"?Sc(a,h):m==="dangerouslySetInnerHTML"?wc(a,h):m==="children"?Ur(a,h):$i(a,m,h,c)}switch(i){case"input":Al(a,o);break;case"textarea":gc(a,o);break;case"select":var v=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!o.multiple;var E=o.value;E!=null?Hn(a,!!o.multiple,E,!1):v!==!!o.multiple&&(o.defaultValue!=null?Hn(a,!!o.multiple,o.defaultValue,!0):Hn(a,!!o.multiple,o.multiple?[]:"",!1))}a[Qr]=o}catch(w){le(e,e.return,w)}}break;case 6:if(it(t,e),_t(e),r&4){if(e.stateNode===null)throw Error(b(162));a=e.stateNode,o=e.memoizedProps;try{a.nodeValue=o}catch(w){le(e,e.return,w)}}break;case 3:if(it(t,e),_t(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Vr(t.containerInfo)}catch(w){le(e,e.return,w)}break;case 4:it(t,e),_t(e);break;case 13:it(t,e),_t(e),a=e.child,a.flags&8192&&(o=a.memoizedState!==null,a.stateNode.isHidden=o,!o||a.alternate!==null&&a.alternate.memoizedState!==null||(as=ce())),r&4&&rc(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(xe=(c=xe)||m,it(t,e),xe=c):it(t,e),_t(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!m&&(e.mode&1)!==0)for(F=e,m=e.child;m!==null;){for(h=F=m;F!==null;){switch(v=F,E=v.child,v.tag){case 0:case 11:case 14:case 15:Or(4,v,v.return);break;case 1:Bn(v,v.return);var S=v.stateNode;if(typeof S.componentWillUnmount=="function"){r=v,n=v.return;try{t=r,S.props=t.memoizedProps,S.state=t.memoizedState,S.componentWillUnmount()}catch(w){le(r,n,w)}}break;case 5:Bn(v,v.return);break;case 22:if(v.memoizedState!==null){oc(h);continue}}E!==null?(E.return=v,F=E):oc(h)}m=m.sibling}e:for(m=null,h=e;;){if(h.tag===5){if(m===null){m=h;try{a=h.stateNode,c?(o=a.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(i=h.stateNode,s=h.memoizedProps.style,l=s!=null&&s.hasOwnProperty("display")?s.display:null,i.style.display=Nc("display",l))}catch(w){le(e,e.return,w)}}}else if(h.tag===6){if(m===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(w){le(e,e.return,w)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;m===h&&(m=null),h=h.return}m===h&&(m=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:it(t,e),_t(e),r&4&&rc(e);break;case 21:break;default:it(t,e),_t(e)}}function _t(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Jd(n)){var r=n;break e}n=n.return}throw Error(b(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&(Ur(a,""),r.flags&=-33);var o=nc(e);gi(e,o,a);break;case 3:case 4:var l=r.stateNode.containerInfo,i=nc(e);yi(e,i,l);break;default:throw Error(b(161))}}catch(s){le(e,e.return,s)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function mh(e,t,n){F=e,Gd(e,t,n)}function Gd(e,t,n){for(var r=(e.mode&1)!==0;F!==null;){var a=F,o=a.child;if(a.tag===22&&r){var l=a.memoizedState!==null||Ma;if(!l){var i=a.alternate,s=i!==null&&i.memoizedState!==null||xe;i=Ma;var c=xe;if(Ma=l,(xe=s)&&!c)for(F=a;F!==null;)l=F,s=l.child,l.tag===22&&l.memoizedState!==null?lc(a):s!==null?(s.return=l,F=s):lc(a);for(;o!==null;)F=o,Gd(o,t,n),o=o.sibling;F=a,Ma=i,xe=c}ac(e,t,n)}else(a.subtreeFlags&8772)!==0&&o!==null?(o.return=a,F=o):ac(e,t,n)}}function ac(e){for(;F!==null;){var t=F;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:xe||To(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!xe)if(n===null)r.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:st(t.type,n.memoizedProps);r.componentDidUpdate(a,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&Bu(t,o,r);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Bu(t,l,n)}break;case 5:var i=t.stateNode;if(n===null&&t.flags&4){n=i;var s=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":s.autoFocus&&n.focus();break;case"img":s.src&&(n.src=s.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var m=c.memoizedState;if(m!==null){var h=m.dehydrated;h!==null&&Vr(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(b(163))}xe||t.flags&512&&vi(t)}catch(v){le(t,t.return,v)}}if(t===e){F=null;break}if(n=t.sibling,n!==null){n.return=t.return,F=n;break}F=t.return}}function oc(e){for(;F!==null;){var t=F;if(t===e){F=null;break}var n=t.sibling;if(n!==null){n.return=t.return,F=n;break}F=t.return}}function lc(e){for(;F!==null;){var t=F;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{To(4,t)}catch(s){le(t,n,s)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var a=t.return;try{r.componentDidMount()}catch(s){le(t,a,s)}}var o=t.return;try{vi(t)}catch(s){le(t,o,s)}break;case 5:var l=t.return;try{vi(t)}catch(s){le(t,l,s)}}}catch(s){le(t,t.return,s)}if(t===e){F=null;break}var i=t.sibling;if(i!==null){i.return=t.return,F=i;break}F=t.return}}var hh=Math.ceil,go=Lt.ReactCurrentDispatcher,ns=Lt.ReactCurrentOwner,nt=Lt.ReactCurrentBatchConfig,K=0,we=null,pe=null,Se=0,We=0,Vn=rn(0),ve=0,ea=null,Nn=0,Do=0,rs=0,jr=null,Me=null,as=0,nr=1/0,$t=null,_o=!1,_i=null,Xt=null,za=!1,Wt=null,wo=0,Ar=0,wi=null,Ya=-1,Ga=0;function Ae(){return(K&6)!==0?ce():Ya!==-1?Ya:Ya=ce()}function qt(e){return(e.mode&1)===0?1:(K&2)!==0&&Se!==0?Se&-Se:qm.transition!==null?(Ga===0&&(Ga=Lc()),Ga):(e=Y,e!==0||(e=window.event,e=e===void 0?16:zc(e.type)),e)}function ft(e,t,n,r){if(50<Ar)throw Ar=0,wi=null,Error(b(185));ta(e,n,r),((K&2)===0||e!==we)&&(e===we&&((K&2)===0&&(Do|=n),ve===4&&Vt(e,Se)),He(e,r),n===1&&K===0&&(t.mode&1)===0&&(nr=ce()+500,Co&&an()))}function He(e,t){var n=e.callbackNode;em(e,t);var r=no(e,e===we?Se:0);if(r===0)n!==null&&mu(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&mu(n),t===1)e.tag===0?Xm(ic.bind(null,e)):ld(ic.bind(null,e)),Jm(function(){(K&6)===0&&an()}),n=null;else{switch(Oc(r)){case 1:n=Pi;break;case 4:n=Dc;break;case 16:n=to;break;case 536870912:n=Fc;break;default:n=to}n=af(n,Xd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Xd(e,t){if(Ya=-1,Ga=0,(K&6)!==0)throw Error(b(327));var n=e.callbackNode;if(Yn()&&e.callbackNode!==n)return null;var r=no(e,e===we?Se:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=No(e,r);else{t=r;var a=K;K|=2;var o=Zd();(we!==e||Se!==t)&&($t=null,nr=ce()+500,vn(e,t));do try{gh();break}catch(i){qd(e,i)}while(!0);Vi(),go.current=o,K=a,pe!==null?t=0:(we=null,Se=0,t=ve)}if(t!==0){if(t===2&&(a=Jl(e),a!==0&&(r=a,t=Ni(e,a))),t===1)throw n=ea,vn(e,0),Vt(e,r),He(e,ce()),n;if(t===6)Vt(e,r);else{if(a=e.current.alternate,(r&30)===0&&!vh(a)&&(t=No(e,r),t===2&&(o=Jl(e),o!==0&&(r=o,t=Ni(e,o))),t===1))throw n=ea,vn(e,0),Vt(e,r),He(e,ce()),n;switch(e.finishedWork=a,e.finishedLanes=r,t){case 0:case 1:throw Error(b(345));case 2:fn(e,Me,$t);break;case 3:if(Vt(e,r),(r&130023424)===r&&(t=as+500-ce(),10<t)){if(no(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){Ae(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=ti(fn.bind(null,e,Me,$t),t);break}fn(e,Me,$t);break;case 4:if(Vt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,a=-1;0<r;){var l=31-dt(r);o=1<<l,l=t[l],l>a&&(a=l),r&=~o}if(r=a,r=ce()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*hh(r/1960))-r,10<r){e.timeoutHandle=ti(fn.bind(null,e,Me,$t),r);break}fn(e,Me,$t);break;case 5:fn(e,Me,$t);break;default:throw Error(b(329))}}}return He(e,ce()),e.callbackNode===n?Xd.bind(null,e):null}function Ni(e,t){var n=jr;return e.current.memoizedState.isDehydrated&&(vn(e,t).flags|=256),e=No(e,t),e!==2&&(t=Me,Me=n,t!==null&&Si(t)),e}function Si(e){Me===null?Me=e:Me.push.apply(Me,e)}function vh(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var a=n[r],o=a.getSnapshot;a=a.value;try{if(!pt(o(),a))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Vt(e,t){for(t&=~rs,t&=~Do,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-dt(t),r=1<<n;e[n]=-1,t&=~r}}function ic(e){if((K&6)!==0)throw Error(b(327));Yn();var t=no(e,0);if((t&1)===0)return He(e,ce()),null;var n=No(e,t);if(e.tag!==0&&n===2){var r=Jl(e);r!==0&&(t=r,n=Ni(e,r))}if(n===1)throw n=ea,vn(e,0),Vt(e,t),He(e,ce()),n;if(n===6)throw Error(b(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,fn(e,Me,$t),He(e,ce()),null}function os(e,t){var n=K;K|=1;try{return e(t)}finally{K=n,K===0&&(nr=ce()+500,Co&&an())}}function Sn(e){Wt!==null&&Wt.tag===0&&(K&6)===0&&Yn();var t=K;K|=1;var n=nt.transition,r=Y;try{if(nt.transition=null,Y=1,e)return e()}finally{Y=r,nt.transition=n,K=t,(K&6)===0&&an()}}function ls(){We=Vn.current,Z(Vn)}function vn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Km(n)),pe!==null)for(n=pe.return;n!==null;){var r=n;switch(Mi(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&io();break;case 3:er(),Z(Be),Z(Pe),Yi();break;case 5:Qi(r);break;case 4:er();break;case 13:Z(re);break;case 19:Z(re);break;case 10:Hi(r.type._context);break;case 22:case 23:ls()}n=n.return}if(we=e,pe=e=Zt(e.current,null),Se=We=t,ve=0,ea=null,rs=Do=Nn=0,Me=jr=null,mn!==null){for(t=0;t<mn.length;t++)if(n=mn[t],r=n.interleaved,r!==null){n.interleaved=null;var a=r.next,o=n.pending;if(o!==null){var l=o.next;o.next=a,r.next=l}n.pending=r}mn=null}return e}function qd(e,t){do{var n=pe;try{if(Vi(),Ka.current=yo,vo){for(var r=ae.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}vo=!1}if(wn=0,_e=he=ae=null,Lr=!1,Xr=0,ns.current=null,n===null||n.return===null){ve=1,ea=t,pe=null;break}e:{var o=e,l=n.return,i=n,s=t;if(t=Se,i.flags|=32768,s!==null&&typeof s=="object"&&typeof s.then=="function"){var c=s,m=i,h=m.tag;if((m.mode&1)===0&&(h===0||h===11||h===15)){var v=m.alternate;v?(m.updateQueue=v.updateQueue,m.memoizedState=v.memoizedState,m.lanes=v.lanes):(m.updateQueue=null,m.memoizedState=null)}var E=Qu(l);if(E!==null){E.flags&=-257,Yu(E,l,i,o,t),E.mode&1&&Ju(o,c,t),t=E,s=c;var S=t.updateQueue;if(S===null){var w=new Set;w.add(s),t.updateQueue=w}else S.add(s);break e}else{if((t&1)===0){Ju(o,c,t),is();break e}s=Error(b(426))}}else if(te&&i.mode&1){var N=Qu(l);if(N!==null){(N.flags&65536)===0&&(N.flags|=256),Yu(N,l,i,o,t),zi(tr(s,i));break e}}o=s=tr(s,i),ve!==4&&(ve=2),jr===null?jr=[o]:jr.push(o),o=l;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var d=Od(o,s,t);zu(o,d);break e;case 1:i=s;var u=o.type,f=o.stateNode;if((o.flags&128)===0&&(typeof u.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Xt===null||!Xt.has(f)))){o.flags|=65536,t&=-t,o.lanes|=t;var g=jd(o,i,t);zu(o,g);break e}}o=o.return}while(o!==null)}tf(n)}catch(x){t=x,pe===n&&n!==null&&(pe=n=n.return);continue}break}while(!0)}function Zd(){var e=go.current;return go.current=yo,e===null?yo:e}function is(){(ve===0||ve===3||ve===2)&&(ve=4),we===null||(Nn&268435455)===0&&(Do&268435455)===0||Vt(we,Se)}function No(e,t){var n=K;K|=2;var r=Zd();(we!==e||Se!==t)&&($t=null,vn(e,t));do try{yh();break}catch(a){qd(e,a)}while(!0);if(Vi(),K=n,go.current=r,pe!==null)throw Error(b(261));return we=null,Se=0,ve}function yh(){for(;pe!==null;)ef(pe)}function gh(){for(;pe!==null&&!Wp();)ef(pe)}function ef(e){var t=rf(e.alternate,e,We);e.memoizedProps=e.pendingProps,t===null?tf(e):pe=t,ns.current=null}function tf(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=ch(n,t,We),n!==null){pe=n;return}}else{if(n=dh(n,t),n!==null){n.flags&=32767,pe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ve=6,pe=null;return}}if(t=t.sibling,t!==null){pe=t;return}pe=t=e}while(t!==null);ve===0&&(ve=5)}function fn(e,t,n){var r=Y,a=nt.transition;try{nt.transition=null,Y=1,_h(e,t,n,r)}finally{nt.transition=a,Y=r}return null}function _h(e,t,n,r){do Yn();while(Wt!==null);if((K&6)!==0)throw Error(b(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(b(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(tm(e,o),e===we&&(pe=we=null,Se=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||za||(za=!0,af(to,function(){return Yn(),null})),o=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||o){o=nt.transition,nt.transition=null;var l=Y;Y=1;var i=K;K|=4,ns.current=null,ph(e,n),Yd(n,e),zm(Zl),ro=!!ql,Zl=ql=null,e.current=n,mh(n,e,a),Kp(),K=i,Y=l,nt.transition=o}else e.current=n;if(za&&(za=!1,Wt=e,wo=a),o=e.pendingLanes,o===0&&(Xt=null),Yp(n.stateNode,r),He(e,ce()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],r(a.value,{componentStack:a.stack,digest:a.digest});if(_o)throw _o=!1,e=_i,_i=null,e;return(wo&1)!==0&&e.tag!==0&&Yn(),o=e.pendingLanes,(o&1)!==0?e===wi?Ar++:(Ar=0,wi=e):Ar=0,an(),null}function Yn(){if(Wt!==null){var e=Oc(wo),t=nt.transition,n=Y;try{if(nt.transition=null,Y=16>e?16:e,Wt===null)var r=!1;else{if(e=Wt,Wt=null,wo=0,(K&6)!==0)throw Error(b(331));var a=K;for(K|=4,F=e.current;F!==null;){var o=F,l=o.child;if((F.flags&16)!==0){var i=o.deletions;if(i!==null){for(var s=0;s<i.length;s++){var c=i[s];for(F=c;F!==null;){var m=F;switch(m.tag){case 0:case 11:case 15:Or(8,m,o)}var h=m.child;if(h!==null)h.return=m,F=h;else for(;F!==null;){m=F;var v=m.sibling,E=m.return;if(Kd(m),m===c){F=null;break}if(v!==null){v.return=E,F=v;break}F=E}}}var S=o.alternate;if(S!==null){var w=S.child;if(w!==null){S.child=null;do{var N=w.sibling;w.sibling=null,w=N}while(w!==null)}}F=o}}if((o.subtreeFlags&2064)!==0&&l!==null)l.return=o,F=l;else e:for(;F!==null;){if(o=F,(o.flags&2048)!==0)switch(o.tag){case 0:case 11:case 15:Or(9,o,o.return)}var d=o.sibling;if(d!==null){d.return=o.return,F=d;break e}F=o.return}}var u=e.current;for(F=u;F!==null;){l=F;var f=l.child;if((l.subtreeFlags&2064)!==0&&f!==null)f.return=l,F=f;else e:for(l=u;F!==null;){if(i=F,(i.flags&2048)!==0)try{switch(i.tag){case 0:case 11:case 15:To(9,i)}}catch(x){le(i,i.return,x)}if(i===l){F=null;break e}var g=i.sibling;if(g!==null){g.return=i.return,F=g;break e}F=i.return}}if(K=a,an(),St&&typeof St.onPostCommitFiberRoot=="function")try{St.onPostCommitFiberRoot(Eo,e)}catch{}r=!0}return r}finally{Y=n,nt.transition=t}}return!1}function sc(e,t,n){t=tr(n,t),t=Od(e,t,1),e=Gt(e,t,1),t=Ae(),e!==null&&(ta(e,1,t),He(e,t))}function le(e,t,n){if(e.tag===3)sc(e,e,n);else for(;t!==null;){if(t.tag===3){sc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Xt===null||!Xt.has(r))){e=tr(n,e),e=jd(t,e,1),t=Gt(t,e,1),e=Ae(),t!==null&&(ta(t,1,e),He(t,e));break}}t=t.return}}function wh(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ae(),e.pingedLanes|=e.suspendedLanes&n,we===e&&(Se&n)===n&&(ve===4||ve===3&&(Se&130023424)===Se&&500>ce()-as?vn(e,0):rs|=n),He(e,t)}function nf(e,t){t===0&&((e.mode&1)===0?t=1:(t=ba,ba<<=1,(ba&130023424)===0&&(ba=4194304)));var n=Ae();e=Dt(e,t),e!==null&&(ta(e,t,n),He(e,n))}function Nh(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),nf(e,n)}function Sh(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(b(314))}r!==null&&r.delete(t),nf(e,n)}var rf;rf=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Be.current)ze=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return ze=!1,uh(e,t,n);ze=(e.flags&131072)!==0}else ze=!1,te&&(t.flags&1048576)!==0&&id(t,co,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Qa(e,t),e=t.pendingProps;var a=Xn(t,Pe.current);Qn(t,n),a=Xi(null,t,r,e,a,n);var o=qi();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ve(r)?(o=!0,so(t)):o=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Ki(t),a.updater=Po,t.stateNode=a,a._reactInternals=t,si(t,r,e,n),t=di(null,t,r,!0,o,n)):(t.tag=0,te&&o&&Ui(t),je(null,t,a,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Qa(e,t),e=t.pendingProps,a=r._init,r=a(r._payload),t.type=r,a=t.tag=kh(r),e=st(r,e),a){case 0:t=ci(null,t,r,e,n);break e;case 1:t=qu(null,t,r,e,n);break e;case 11:t=Gu(null,t,r,e,n);break e;case 14:t=Xu(null,t,r,st(r.type,e),n);break e}throw Error(b(306,r,""))}return t;case 0:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:st(r,a),ci(e,t,r,a,n);case 1:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:st(r,a),qu(e,t,r,a,n);case 3:e:{if(Md(t),e===null)throw Error(b(387));r=t.pendingProps,o=t.memoizedState,a=o.element,pd(e,t),mo(t,r,null,n);var l=t.memoizedState;if(r=l.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){a=tr(Error(b(423)),t),t=Zu(e,t,r,n,a);break e}else if(r!==a){a=tr(Error(b(424)),t),t=Zu(e,t,r,n,a);break e}else for(Ke=Yt(t.stateNode.containerInfo.firstChild),Je=t,te=!0,ct=null,n=dd(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(qn(),r===a){t=Ft(e,t,n);break e}je(e,t,r,n)}t=t.child}return t;case 5:return md(t),e===null&&oi(t),r=t.type,a=t.pendingProps,o=e!==null?e.memoizedProps:null,l=a.children,ei(r,a)?l=null:o!==null&&ei(r,o)&&(t.flags|=32),Ud(e,t),je(e,t,l,n),t.child;case 6:return e===null&&oi(t),null;case 13:return zd(e,t,n);case 4:return Ji(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Zn(t,null,r,n):je(e,t,r,n),t.child;case 11:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:st(r,a),Gu(e,t,r,a,n);case 7:return je(e,t,t.pendingProps,n),t.child;case 8:return je(e,t,t.pendingProps.children,n),t.child;case 12:return je(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,a=t.pendingProps,o=t.memoizedProps,l=a.value,X(fo,r._currentValue),r._currentValue=l,o!==null)if(pt(o.value,l)){if(o.children===a.children&&!Be.current){t=Ft(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var i=o.dependencies;if(i!==null){l=o.child;for(var s=i.firstContext;s!==null;){if(s.context===r){if(o.tag===1){s=xt(-1,n&-n),s.tag=2;var c=o.updateQueue;if(c!==null){c=c.shared;var m=c.pending;m===null?s.next=s:(s.next=m.next,m.next=s),c.pending=s}}o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),li(o.return,n,t),i.lanes|=n;break}s=s.next}}else if(o.tag===10)l=o.type===t.type?null:o.child;else if(o.tag===18){if(l=o.return,l===null)throw Error(b(341));l.lanes|=n,i=l.alternate,i!==null&&(i.lanes|=n),li(l,n,t),l=o.sibling}else l=o.child;if(l!==null)l.return=o;else for(l=o;l!==null;){if(l===t){l=null;break}if(o=l.sibling,o!==null){o.return=l.return,l=o;break}l=l.return}o=l}je(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,r=t.pendingProps.children,Qn(t,n),a=rt(a),r=r(a),t.flags|=1,je(e,t,r,n),t.child;case 14:return r=t.type,a=st(r,t.pendingProps),a=st(r.type,a),Xu(e,t,r,a,n);case 15:return Ad(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:st(r,a),Qa(e,t),t.tag=1,Ve(r)?(e=!0,so(t)):e=!1,Qn(t,n),Ld(t,r,a),si(t,r,a,n),di(null,t,r,!0,e,n);case 19:return Bd(e,t,n);case 22:return Id(e,t,n)}throw Error(b(156,t.tag))};function af(e,t){return Tc(e,t)}function Eh(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function tt(e,t,n,r){return new Eh(e,t,n,r)}function ss(e){return e=e.prototype,!(!e||!e.isReactComponent)}function kh(e){if(typeof e=="function")return ss(e)?1:0;if(e!=null){if(e=e.$$typeof,e===bi)return 11;if(e===Ci)return 14}return 2}function Zt(e,t){var n=e.alternate;return n===null?(n=tt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Xa(e,t,n,r,a,o){var l=2;if(r=e,typeof e=="function")ss(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case Fn:return yn(n.children,a,o,t);case Ri:l=8,a|=8;break;case Dl:return e=tt(12,n,t,a|2),e.elementType=Dl,e.lanes=o,e;case Fl:return e=tt(13,n,t,a),e.elementType=Fl,e.lanes=o,e;case Ll:return e=tt(19,n,t,a),e.elementType=Ll,e.lanes=o,e;case mc:return Fo(n,a,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case fc:l=10;break e;case pc:l=9;break e;case bi:l=11;break e;case Ci:l=14;break e;case Mt:l=16,r=null;break e}throw Error(b(130,e==null?e:typeof e,""))}return t=tt(l,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function yn(e,t,n,r){return e=tt(7,e,r,t),e.lanes=n,e}function Fo(e,t,n,r){return e=tt(22,e,r,t),e.elementType=mc,e.lanes=n,e.stateNode={isHidden:!1},e}function xl(e,t,n){return e=tt(6,e,null,t),e.lanes=n,e}function Pl(e,t,n){return t=tt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function $h(e,t,n,r,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=pl(0),this.expirationTimes=pl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=pl(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function us(e,t,n,r,a,o,l,i,s){return e=new $h(e,t,n,i,s),t===1?(t=1,o===!0&&(t|=8)):t=0,o=tt(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ki(o),e}function Rh(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Dn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function of(e){if(!e)return tn;e=e._reactInternals;e:{if(kn(e)!==e||e.tag!==1)throw Error(b(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ve(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(b(171))}if(e.tag===1){var n=e.type;if(Ve(n))return od(e,n,t)}return t}function lf(e,t,n,r,a,o,l,i,s){return e=us(n,r,!0,e,a,o,l,i,s),e.context=of(null),n=e.current,r=Ae(),a=qt(n),o=xt(r,a),o.callback=t??null,Gt(n,o,a),e.current.lanes=a,ta(e,a,r),He(e,r),e}function Lo(e,t,n,r){var a=t.current,o=Ae(),l=qt(a);return n=of(n),t.context===null?t.context=n:t.pendingContext=n,t=xt(o,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Gt(a,t,l),e!==null&&(ft(e,a,l,o),Wa(e,a,l)),l}function So(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function uc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function cs(e,t){uc(e,t),(e=e.alternate)&&uc(e,t)}function bh(){return null}var sf=typeof reportError=="function"?reportError:function(e){console.error(e)};function ds(e){this._internalRoot=e}Oo.prototype.render=ds.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(b(409));Lo(e,t,null,null)};Oo.prototype.unmount=ds.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Sn(function(){Lo(null,e,null,null)}),t[Tt]=null}};function Oo(e){this._internalRoot=e}Oo.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ic();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Bt.length&&t!==0&&t<Bt[n].priority;n++);Bt.splice(n,0,e),n===0&&Mc(e)}};function fs(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function jo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function cc(){}function Ch(e,t,n,r,a){if(a){if(typeof r=="function"){var o=r;r=function(){var c=So(l);o.call(c)}}var l=lf(t,r,e,0,null,!1,!1,"",cc);return e._reactRootContainer=l,e[Tt]=l.current,Kr(e.nodeType===8?e.parentNode:e),Sn(),l}for(;a=e.lastChild;)e.removeChild(a);if(typeof r=="function"){var i=r;r=function(){var c=So(s);i.call(c)}}var s=us(e,0,!1,null,null,!1,!1,"",cc);return e._reactRootContainer=s,e[Tt]=s.current,Kr(e.nodeType===8?e.parentNode:e),Sn(function(){Lo(t,s,n,r)}),s}function Ao(e,t,n,r,a){var o=n._reactRootContainer;if(o){var l=o;if(typeof a=="function"){var i=a;a=function(){var s=So(l);i.call(s)}}Lo(t,l,e,a)}else l=Ch(n,t,e,a,r);return So(l)}jc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=br(t.pendingLanes);n!==0&&(Ti(t,n|1),He(t,ce()),(K&6)===0&&(nr=ce()+500,an()))}break;case 13:Sn(function(){var r=Dt(e,1);if(r!==null){var a=Ae();ft(r,e,1,a)}}),cs(e,1)}};Di=function(e){if(e.tag===13){var t=Dt(e,134217728);if(t!==null){var n=Ae();ft(t,e,134217728,n)}cs(e,134217728)}};Ac=function(e){if(e.tag===13){var t=qt(e),n=Dt(e,t);if(n!==null){var r=Ae();ft(n,e,t,r)}cs(e,t)}};Ic=function(){return Y};Uc=function(e,t){var n=Y;try{return Y=e,t()}finally{Y=n}};Hl=function(e,t,n){switch(t){case"input":if(Al(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=bo(r);if(!a)throw Error(b(90));vc(r),Al(r,a)}}}break;case"textarea":gc(e,n);break;case"select":t=n.value,t!=null&&Hn(e,!!n.multiple,t,!1)}};$c=os;Rc=Sn;var xh={usingClientEntryPoint:!1,Events:[ra,An,bo,Ec,kc,os]},Er={findFiberByHostInstance:pn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Ph={bundleType:Er.bundleType,version:Er.version,rendererPackageName:Er.rendererPackageName,rendererConfig:Er.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Lt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=xc(e),e===null?null:e.stateNode},findFiberByHostInstance:Er.findFiberByHostInstance||bh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(kr=__REACT_DEVTOOLS_GLOBAL_HOOK__,!kr.isDisabled&&kr.supportsFiber))try{Eo=kr.inject(Ph),St=kr}catch{}var kr;Ge.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=xh;Ge.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!fs(t))throw Error(b(200));return Rh(e,t,null,n)};Ge.createRoot=function(e,t){if(!fs(e))throw Error(b(299));var n=!1,r="",a=sf;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=us(e,1,!1,null,null,n,!1,r,a),e[Tt]=t.current,Kr(e.nodeType===8?e.parentNode:e),new ds(t)};Ge.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(b(188)):(e=Object.keys(e).join(","),Error(b(268,e)));return e=xc(t),e=e===null?null:e.stateNode,e};Ge.flushSync=function(e){return Sn(e)};Ge.hydrate=function(e,t,n){if(!jo(t))throw Error(b(200));return Ao(null,e,t,!0,n)};Ge.hydrateRoot=function(e,t,n){if(!fs(e))throw Error(b(405));var r=n!=null&&n.hydratedSources||null,a=!1,o="",l=sf;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=lf(t,null,e,1,n??null,a,!1,o,l),e[Tt]=t.current,Kr(e),r)for(e=0;e<r.length;e++)n=r[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new Oo(t)};Ge.render=function(e,t,n){if(!jo(t))throw Error(b(200));return Ao(null,e,t,!1,n)};Ge.unmountComponentAtNode=function(e){if(!jo(e))throw Error(b(40));return e._reactRootContainer?(Sn(function(){Ao(null,null,e,!1,function(){e._reactRootContainer=null,e[Tt]=null})}),!0):!1};Ge.unstable_batchedUpdates=os;Ge.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!jo(n))throw Error(b(200));if(e==null||e._reactInternals===void 0)throw Error(b(38));return Ao(e,t,n,!1,r)};Ge.version="18.3.1-next-f1338f8080-20240426"});var ps=un((my,df)=>{"use strict";function cf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cf)}catch(e){console.error(e)}}cf(),df.exports=uf()});var pf=un(ms=>{"use strict";var ff=ps();ms.createRoot=ff.createRoot,ms.hydrateRoot=ff.hydrateRoot;var hy});var R=dr(pr()),Xf=dr(pf());var Q=dr(pr()),wv=dr(ps());var D=dr(pr());function oa(){return oa=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},oa.apply(this,arguments)}var mt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(mt||(mt={}));var mf="popstate";function _f(e){e===void 0&&(e={});function t(r,a){let{pathname:o,search:l,hash:i}=r.location;return vs("",{pathname:o,search:l,hash:i},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(r,a){return typeof a=="string"?a:$n(a)}return Dh(t,n,null,e)}function ee(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ys(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Th(){return Math.random().toString(36).substr(2,8)}function hf(e,t){return{usr:e.state,key:e.key,idx:t}}function vs(e,t,n,r){return n===void 0&&(n=null),oa({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Ot(t):t,{state:n,key:t&&t.key||r||Th()})}function $n(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Ot(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Dh(e,t,n,r){r===void 0&&(r={});let{window:a=document.defaultView,v5Compat:o=!1}=r,l=a.history,i=mt.Pop,s=null,c=m();c==null&&(c=0,l.replaceState(oa({},l.state,{idx:c}),""));function m(){return(l.state||{idx:null}).idx}function h(){i=mt.Pop;let N=m(),d=N==null?null:N-c;c=N,s&&s({action:i,location:w.location,delta:d})}function v(N,d){i=mt.Push;let u=vs(w.location,N,d);n&&n(u,N),c=m()+1;let f=hf(u,c),g=w.createHref(u);try{l.pushState(f,"",g)}catch(x){if(x instanceof DOMException&&x.name==="DataCloneError")throw x;a.location.assign(g)}o&&s&&s({action:i,location:w.location,delta:1})}function E(N,d){i=mt.Replace;let u=vs(w.location,N,d);n&&n(u,N),c=m();let f=hf(u,c),g=w.createHref(u);l.replaceState(f,"",g),o&&s&&s({action:i,location:w.location,delta:0})}function S(N){let d=a.location.origin!=="null"?a.location.origin:a.location.href,u=typeof N=="string"?N:$n(N);return u=u.replace(/ $/,"%20"),ee(d,"No window.location.(origin|href) available to create URL for href: "+u),new URL(u,d)}let w={get action(){return i},get location(){return e(a,l)},listen(N){if(s)throw new Error("A history only accepts one active listener");return a.addEventListener(mf,h),s=N,()=>{a.removeEventListener(mf,h),s=null}},createHref(N){return t(a,N)},createURL:S,encodeLocation(N){let d=S(N);return{pathname:d.pathname,search:d.search,hash:d.hash}},push:v,replace:E,go(N){return l.go(N)}};return w}var vf;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(vf||(vf={}));function Io(e,t,n){return n===void 0&&(n="/"),Fh(e,t,n,!1)}function Fh(e,t,n,r){let a=typeof t=="string"?Ot(t):t,o=ln(a.pathname||"/",n);if(o==null)return null;let l=wf(e);Lh(l);let i=null;for(let s=0;i==null&&s<l.length;++s){let c=Sf(o);i=Vh(l[s],c,r)}return i}function wf(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let a=(o,l,i)=>{let s={relativePath:i===void 0?o.path||"":i,caseSensitive:o.caseSensitive===!0,childrenIndex:l,route:o};s.relativePath.startsWith("/")&&(ee(s.relativePath.startsWith(r),'Absolute route path "'+s.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),s.relativePath=s.relativePath.slice(r.length));let c=kt([r,s.relativePath]),m=n.concat(s);o.children&&o.children.length>0&&(ee(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),wf(o.children,t,m,c)),!(o.path==null&&!o.index)&&t.push({path:c,score:zh(c,o.index),routesMeta:m})};return e.forEach((o,l)=>{var i;if(o.path===""||!((i=o.path)!=null&&i.includes("?")))a(o,l);else for(let s of Nf(o.path))a(o,l,s)}),t}function Nf(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,a=n.endsWith("?"),o=n.replace(/\?$/,"");if(r.length===0)return a?[o,""]:[o];let l=Nf(r.join("/")),i=[];return i.push(...l.map(s=>s===""?o:[o,s].join("/"))),a&&i.push(...l),i.map(s=>e.startsWith("/")&&s===""?"/":s)}function Lh(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Bh(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var Oh=/^:[\w-]+$/,jh=3,Ah=2,Ih=1,Uh=10,Mh=-2,yf=e=>e==="*";function zh(e,t){let n=e.split("/"),r=n.length;return n.some(yf)&&(r+=Mh),t&&(r+=Ah),n.filter(a=>!yf(a)).reduce((a,o)=>a+(Oh.test(o)?jh:o===""?Ih:Uh),r)}function Bh(e,t){return e.length===t.length&&e.slice(0,-1).every((r,a)=>r===t[a])?e[e.length-1]-t[t.length-1]:0}function Vh(e,t,n){n===void 0&&(n=!1);let{routesMeta:r}=e,a={},o="/",l=[];for(let i=0;i<r.length;++i){let s=r[i],c=i===r.length-1,m=o==="/"?t:t.slice(o.length)||"/",h=on({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},m),v=s.route;if(!h&&c&&n&&!r[r.length-1].route.index&&(h=on({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},m)),!h)return null;Object.assign(a,h.params),l.push({params:a,pathname:kt([o,h.pathname]),pathnameBase:Qh(kt([o,h.pathnameBase])),route:v}),h.pathnameBase!=="/"&&(o=kt([o,h.pathnameBase]))}return l}function on(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Hh(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let o=a[0],l=o.replace(/(.)\/+$/,"$1"),i=a.slice(1);return{params:r.reduce((c,m,h)=>{let{paramName:v,isOptional:E}=m;if(v==="*"){let w=i[h]||"";l=o.slice(0,o.length-w.length).replace(/(.)\/+$/,"$1")}let S=i[h];return E&&!S?c[v]=void 0:c[v]=(S||"").replace(/%2F/g,"/"),c},{}),pathname:o,pathnameBase:l,pattern:e}}function Hh(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),ys(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(l,i,s)=>(r.push({paramName:i,isOptional:s!=null}),s?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function Sf(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ys(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function ln(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}var Wh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Kh=e=>Wh.test(e);function gs(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:a=""}=typeof e=="string"?Ot(e):e,o;if(n)if(Kh(n))o=n;else{if(n.includes("//")){let l=n;n=n.replace(/\/\/+/g,"/"),ys(!1,"Pathnames cannot have embedded double slashes - normalizing "+(l+" -> "+n))}n.startsWith("/")?o=gf(n.substring(1),"/"):o=gf(n,t)}else o=t;return{pathname:o,search:Yh(r),hash:Gh(a)}}function gf(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function hs(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Jh(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Uo(e,t){let n=Jh(e);return t?n.map((r,a)=>a===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Mo(e,t,n,r){r===void 0&&(r=!1);let a;typeof e=="string"?a=Ot(e):(a=oa({},e),ee(!a.pathname||!a.pathname.includes("?"),hs("?","pathname","search",a)),ee(!a.pathname||!a.pathname.includes("#"),hs("#","pathname","hash",a)),ee(!a.search||!a.search.includes("#"),hs("#","search","hash",a)));let o=e===""||a.pathname==="",l=o?"/":a.pathname,i;if(l==null)i=n;else{let h=t.length-1;if(!r&&l.startsWith("..")){let v=l.split("/");for(;v[0]==="..";)v.shift(),h-=1;a.pathname=v.join("/")}i=h>=0?t[h]:"/"}let s=gs(a,i),c=l&&l!=="/"&&l.endsWith("/"),m=(o||l===".")&&n.endsWith("/");return!s.pathname.endsWith("/")&&(c||m)&&(s.pathname+="/"),s}var kt=e=>e.join("/").replace(/\/\/+/g,"/"),Qh=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Yh=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Gh=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function zo(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}var Ef=["post","put","patch","delete"],yy=new Set(Ef),Xh=["get",...Ef],gy=new Set(Xh);var _y=Symbol("deferred");function la(){return la=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},la.apply(this,arguments)}var lr=D.createContext(null),Vo=D.createContext(null);var ht=D.createContext(null),sa=D.createContext(null),vt=D.createContext({outlet:null,matches:[],isDataRoute:!1}),Rf=D.createContext(null);function ws(e,t){let{relative:n}=t===void 0?{}:t;Rn()||ee(!1);let{basename:r,navigator:a}=D.useContext(ht),{hash:o,pathname:l,search:i}=ir(e,{relative:n}),s=l;return r!=="/"&&(s=l==="/"?r:kt([r,l])),a.createHref({pathname:s,search:i,hash:o})}function Rn(){return D.useContext(sa)!=null}function sn(){return Rn()||ee(!1),D.useContext(sa).location}function bf(e){D.useContext(ht).static||D.useLayoutEffect(e)}function jt(){let{isDataRoute:e}=D.useContext(vt);return e?pv():ov()}function ov(){Rn()||ee(!1);let e=D.useContext(lr),{basename:t,future:n,navigator:r}=D.useContext(ht),{matches:a}=D.useContext(vt),{pathname:o}=sn(),l=JSON.stringify(Uo(a,n.v7_relativeSplatPath)),i=D.useRef(!1);return bf(()=>{i.current=!0}),D.useCallback(function(c,m){if(m===void 0&&(m={}),!i.current)return;if(typeof c=="number"){r.go(c);return}let h=Mo(c,JSON.parse(l),o,m.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:kt([t,h.pathname])),(m.replace?r.replace:r.push)(h,m.state,m)},[t,r,l,o,e])}function Ho(){let{matches:e}=D.useContext(vt),t=e[e.length-1];return t?t.params:{}}function ir(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=D.useContext(ht),{matches:a}=D.useContext(vt),{pathname:o}=sn(),l=JSON.stringify(Uo(a,r.v7_relativeSplatPath));return D.useMemo(()=>Mo(e,JSON.parse(l),o,n==="path"),[e,l,o,n])}function Cf(e,t){return xf(e,t)}function xf(e,t,n,r){Rn()||ee(!1);let{navigator:a}=D.useContext(ht),{matches:o}=D.useContext(vt),l=o[o.length-1],i=l?l.params:{},s=l?l.pathname:"/",c=l?l.pathnameBase:"/",m=l&&l.route,h=sn(),v;if(t){var E;let u=typeof t=="string"?Ot(t):t;c==="/"||(E=u.pathname)!=null&&E.startsWith(c)||ee(!1),v=u}else v=h;let S=v.pathname||"/",w=S;if(c!=="/"){let u=c.replace(/^\//,"").split("/");w="/"+S.replace(/^\//,"").split("/").slice(u.length).join("/")}let N=Io(e,{pathname:w}),d=uv(N&&N.map(u=>Object.assign({},u,{params:Object.assign({},i,u.params),pathname:kt([c,a.encodeLocation?a.encodeLocation(u.pathname).pathname:u.pathname]),pathnameBase:u.pathnameBase==="/"?c:kt([c,a.encodeLocation?a.encodeLocation(u.pathnameBase).pathname:u.pathnameBase])})),o,n,r);return t&&d?D.createElement(sa.Provider,{value:{location:la({pathname:"/",search:"",hash:"",state:null,key:"default"},v),navigationType:mt.Pop}},d):d}function lv(){let e=Df(),t=zo(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",a={padding:"0.5rem",backgroundColor:r},o={padding:"2px 4px",backgroundColor:r};return D.createElement(D.Fragment,null,D.createElement("h2",null,"Unexpected Application Error!"),D.createElement("h3",{style:{fontStyle:"italic"}},t),n?D.createElement("pre",{style:a},n):null,null)}var iv=D.createElement(lv,null),_s=class extends D.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?D.createElement(vt.Provider,{value:this.props.routeContext},D.createElement(Rf.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function sv(e){let{routeContext:t,match:n,children:r}=e,a=D.useContext(lr);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),D.createElement(vt.Provider,{value:t},r)}function uv(e,t,n,r){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var o;if(!n)return null;if(n.errors)e=n.matches;else if((o=r)!=null&&o.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let l=e,i=(a=n)==null?void 0:a.errors;if(i!=null){let m=l.findIndex(h=>h.route.id&&i?.[h.route.id]!==void 0);m>=0||ee(!1),l=l.slice(0,Math.min(l.length,m+1))}let s=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let m=0;m<l.length;m++){let h=l[m];if((h.route.HydrateFallback||h.route.hydrateFallbackElement)&&(c=m),h.route.id){let{loaderData:v,errors:E}=n,S=h.route.loader&&v[h.route.id]===void 0&&(!E||E[h.route.id]===void 0);if(h.route.lazy||S){s=!0,c>=0?l=l.slice(0,c+1):l=[l[0]];break}}}return l.reduceRight((m,h,v)=>{let E,S=!1,w=null,N=null;n&&(E=i&&h.route.id?i[h.route.id]:void 0,w=h.route.errorElement||iv,s&&(c<0&&v===0?(mv("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),S=!0,N=null):c===v&&(S=!0,N=h.route.hydrateFallbackElement||null)));let d=t.concat(l.slice(0,v+1)),u=()=>{let f;return E?f=w:S?f=N:h.route.Component?f=D.createElement(h.route.Component,null):h.route.element?f=h.route.element:f=m,D.createElement(sv,{match:h,routeContext:{outlet:m,matches:d,isDataRoute:n!=null},children:f})};return n&&(h.route.ErrorBoundary||h.route.errorElement||v===0)?D.createElement(_s,{location:n.location,revalidation:n.revalidation,component:w,error:E,children:u(),routeContext:{outlet:null,matches:d,isDataRoute:!0}}):u()},null)}var Pf=(function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e})(Pf||{}),Bo=(function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e})(Bo||{});function cv(e){let t=D.useContext(lr);return t||ee(!1),t}function dv(e){let t=D.useContext(Vo);return t||ee(!1),t}function fv(e){let t=D.useContext(vt);return t||ee(!1),t}function Tf(e){let t=fv(e),n=t.matches[t.matches.length-1];return n.route.id||ee(!1),n.route.id}function Df(){var e;let t=D.useContext(Rf),n=dv(Bo.UseRouteError),r=Tf(Bo.UseRouteError);return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function pv(){let{router:e}=cv(Pf.UseNavigateStable),t=Tf(Bo.UseNavigateStable),n=D.useRef(!1);return bf(()=>{n.current=!0}),D.useCallback(function(a,o){o===void 0&&(o={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,la({fromRouteId:t},o)))},[e,t])}var kf={};function mv(e,t,n){!t&&!kf[e]&&(kf[e]=!0)}var or=(e,t,n)=>(""+t+("You can use the `"+e+"` future flag to opt-in early. ")+("For more information, see "+n+"."),void 0);function Ff(e,t){e?.v7_startTransition===void 0&&or("v7_startTransition","React Router will begin wrapping state updates in `React.startTransition` in v7","https://reactrouter.com/v6/upgrading/future#v7_starttransition"),e?.v7_relativeSplatPath===void 0&&(!t||t.v7_relativeSplatPath===void 0)&&or("v7_relativeSplatPath","Relative route resolution within Splat routes is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath"),t&&(t.v7_fetcherPersist===void 0&&or("v7_fetcherPersist","The persistence behavior of fetchers is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist"),t.v7_normalizeFormMethod===void 0&&or("v7_normalizeFormMethod","Casing of `formMethod` fields is being normalized to uppercase in v7","https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod"),t.v7_partialHydration===void 0&&or("v7_partialHydration","`RouterProvider` hydration behavior is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_partialhydration"),t.v7_skipActionErrorRevalidation===void 0&&or("v7_skipActionErrorRevalidation","The revalidation behavior after 4xx/5xx `action` responses is changing in v7","https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation"))}var hv="startTransition",Ry=D[hv];function Ns(e){let{to:t,replace:n,state:r,relative:a}=e;Rn()||ee(!1);let{future:o,static:l}=D.useContext(ht),{matches:i}=D.useContext(vt),{pathname:s}=sn(),c=jt(),m=Mo(t,Uo(i,o.v7_relativeSplatPath),s,a==="path"),h=JSON.stringify(m);return D.useEffect(()=>c(JSON.parse(h),{replace:n,state:r,relative:a}),[c,h,a,n,r]),null}function yt(e){ee(!1)}function Ss(e){let{basename:t="/",children:n=null,location:r,navigationType:a=mt.Pop,navigator:o,static:l=!1,future:i}=e;Rn()&&ee(!1);let s=t.replace(/^\/*/,"/"),c=D.useMemo(()=>({basename:s,navigator:o,static:l,future:la({v7_relativeSplatPath:!1},i)}),[s,i,o,l]);typeof r=="string"&&(r=Ot(r));let{pathname:m="/",search:h="",hash:v="",state:E=null,key:S="default"}=r,w=D.useMemo(()=>{let N=ln(m,s);return N==null?null:{location:{pathname:N,search:h,hash:v,state:E,key:S},navigationType:a}},[s,m,h,v,E,S,a]);return w==null?null:D.createElement(ht.Provider,{value:c},D.createElement(sa.Provider,{children:n,value:w}))}function Es(e){let{children:t,location:n}=e;return Cf(ia(t),n)}var by=new Promise(()=>{});function ia(e,t){t===void 0&&(t=[]);let n=[];return D.Children.forEach(e,(r,a)=>{if(!D.isValidElement(r))return;let o=[...t,a];if(r.type===D.Fragment){n.push.apply(n,ia(r.props.children,o));return}r.type!==yt&&ee(!1),!r.props.index||!r.props.children||ee(!1);let l={id:r.props.id||o.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(l.children=ia(r.props.children,o)),n.push(l)}),n}function Wo(){return Wo=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Wo.apply(this,arguments)}function jf(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,o;for(o=0;o<r.length;o++)a=r[o],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function Nv(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Sv(e,t){return e.button===0&&(!t||t==="_self")&&!Nv(e)}var Ev=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],kv=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"];var $v="6";try{window.__reactRouterVersion=$v}catch{}var Rv=Q.createContext({isTransitioning:!1});var bv="startTransition",Lf=Q[bv],Cv="flushSync",qy=wv[Cv],xv="useId",Zy=Q[xv];function Af(e){let{basename:t,children:n,future:r,window:a}=e,o=Q.useRef();o.current==null&&(o.current=_f({window:a,v5Compat:!0}));let l=o.current,[i,s]=Q.useState({action:l.action,location:l.location}),{v7_startTransition:c}=r||{},m=Q.useCallback(h=>{c&&Lf?Lf(()=>s(h)):s(h)},[s,c]);return Q.useLayoutEffect(()=>l.listen(m),[l,m]),Q.useEffect(()=>Ff(r),[r]),Q.createElement(Ss,{basename:t,children:n,location:i.location,navigationType:i.action,navigator:l,future:r})}var Pv=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Tv=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Xe=Q.forwardRef(function(t,n){let{onClick:r,relative:a,reloadDocument:o,replace:l,state:i,target:s,to:c,preventScrollReset:m,viewTransition:h}=t,v=jf(t,Ev),{basename:E}=Q.useContext(ht),S,w=!1;if(typeof c=="string"&&Tv.test(c)&&(S=c,Pv))try{let f=new URL(window.location.href),g=c.startsWith("//")?new URL(f.protocol+c):new URL(c),x=ln(g.pathname,E);g.origin===f.origin&&x!=null?c=x+g.search+g.hash:w=!0}catch{}let N=ws(c,{relative:a}),d=Fv(c,{replace:l,state:i,target:s,preventScrollReset:m,relative:a,viewTransition:h});function u(f){r&&r(f),f.defaultPrevented||d(f)}return Q.createElement("a",Wo({},v,{href:S||N,onClick:w||o?r:u,ref:n,target:s}))}),If=Q.forwardRef(function(t,n){let{"aria-current":r="page",caseSensitive:a=!1,className:o="",end:l=!1,style:i,to:s,viewTransition:c,children:m}=t,h=jf(t,kv),v=ir(s,{relative:h.relative}),E=sn(),S=Q.useContext(Vo),{navigator:w,basename:N}=Q.useContext(ht),d=S!=null&&Lv(v)&&c===!0,u=w.encodeLocation?w.encodeLocation(v).pathname:v.pathname,f=E.pathname,g=S&&S.navigation&&S.navigation.location?S.navigation.location.pathname:null;a||(f=f.toLowerCase(),g=g?g.toLowerCase():null,u=u.toLowerCase()),g&&N&&(g=ln(g,N)||g);let x=u!=="/"&&u.endsWith("/")?u.length-1:u.length,P=f===u||!l&&f.startsWith(u)&&f.charAt(x)==="/",L=g!=null&&(g===u||!l&&g.startsWith(u)&&g.charAt(u.length)==="/"),T={isActive:P,isPending:L,isTransitioning:d},M=P?r:void 0,j;typeof o=="function"?j=o(T):j=[o,P?"active":null,L?"pending":null,d?"transitioning":null].filter(Boolean).join(" ");let W=typeof i=="function"?i(T):i;return Q.createElement(Xe,Wo({},h,{"aria-current":M,className:j,ref:n,style:W,to:s,viewTransition:c}),typeof m=="function"?m(T):m)});var ks;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(ks||(ks={}));var Of;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Of||(Of={}));function Dv(e){let t=Q.useContext(lr);return t||ee(!1),t}function Fv(e,t){let{target:n,replace:r,state:a,preventScrollReset:o,relative:l,viewTransition:i}=t===void 0?{}:t,s=jt(),c=sn(),m=ir(e,{relative:l});return Q.useCallback(h=>{if(Sv(h,n)){h.preventDefault();let v=r!==void 0?r:$n(c)===$n(m);s(e,{replace:v,state:a,preventScrollReset:o,relative:l,viewTransition:i})}},[c,s,m,r,a,n,e,o,l,i])}function Lv(e,t){t===void 0&&(t={});let n=Q.useContext(Rv);n==null&&ee(!1);let{basename:r}=Dv(ks.useViewTransitionState),a=ir(e,{relative:t.relative});if(!n.isTransitioning)return!1;let o=ln(n.currentLocation.pathname,r)||n.currentLocation.pathname,l=ln(n.nextLocation.pathname,r)||n.nextLocation.pathname;return on(a.pathname,l)!=null||on(a.pathname,o)!=null}var Mf=function(e,t,n,r){var a;t[0]=0;for(var o=1;o<t.length;o++){var l=t[o++],i=t[o]?(t[0]|=l?1:2,n[t[o++]]):t[++o];l===3?r[0]=i:l===4?r[1]=Object.assign(r[1]||{},i):l===5?(r[1]=r[1]||{})[t[++o]]=i:l===6?r[1][t[++o]]+=i+"":l?(a=e.apply(i,Mf(e,i,n,["",null])),r.push(a),i[0]?t[0]|=2:(t[o-2]=0,t[o]=a)):r.push(i)}return r},Uf=new Map;function zf(e){var t=Uf.get(this);return t||(t=new Map,Uf.set(this,t)),(t=Mf(this,t.get(e)||(t.set(e,t=(function(n){for(var r,a,o=1,l="",i="",s=[0],c=function(v){o===1&&(v||(l=l.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(0,v,l):o===3&&(v||l)?(s.push(3,v,l),o=2):o===2&&l==="..."&&v?s.push(4,v,0):o===2&&l&&!v?s.push(5,0,!0,l):o>=5&&((l||!v&&o===5)&&(s.push(o,0,l,a),o=6),v&&(s.push(o,v,0,a),o=6)),l=""},m=0;m<n.length;m++){m&&(o===1&&c(),c(m));for(var h=0;h<n[m].length;h++)r=n[m][h],o===1?r==="<"?(c(),s=[s],o=3):l+=r:o===4?l==="--"&&r===">"?(o=1,l=""):l=r+l[0]:i?r===i?i="":l+=r:r==='"'||r==="'"?i=r:r===">"?(c(),o=1):o&&(r==="="?(o=5,a=l,l=""):r==="/"&&(o<5||n[m][h+1]===">")?(c(),o===3&&(s=s[0]),o=s,(s=s[0]).push(2,0,o),o=0):r===" "||r==="	"||r===`
`||r==="\r"?(c(),o=2):l+=r),o===3&&l==="!--"&&(o=4,s=s[0])}return c(),s})(e)),t),arguments,[])).length>1?t:t[0]}var Ko=document.getElementById("boot-fallback"),Bf=document.getElementById("boot-fallback-message");function Ov(e){Bf&&(Bf.textContent=e)}function jv(e){e&&Ov(e),Ko&&Ko.classList.remove("hidden")}function Av(){Ko&&Ko.classList.add("hidden")}function ca(e,t){t&&console.error(e,t),jv(e)}var y=zf.bind(R.default.createElement);function Te(e){return String(e||"unknown").replace(/_/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function qf(e){let t=String(e||"everyday");return t==="occasion"?"Occasion":t==="current_event"?"Current Event":"Everyday"}function Iv(e){let t=String(e||"").toLowerCase();return t==="completed"||t==="approved"?"success":t.includes("reject")||t.includes("timeout")||t.includes("failed")?"danger":t.includes("pending")||t.includes("progress")||t.includes("queued")?"warning":"neutral"}function De({value:e}){return y`<span className=${`badge ${Iv(e)}`}>${Te(e)}</span>`}function Uv({name:e}){let t={viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true"};return e==="home"?y`
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
    `}function Ue(e){if(!e)return"-";let t=new Date(e);return Number.isNaN(t.getTime())?"-":t.toLocaleString()}function Mv(e){let t=Number(e||0);if(t<=0)return"0 B";let n=["B","KB","MB","GB","TB"],r=Math.min(Math.floor(Math.log(t)/Math.log(1024)),n.length-1);return`${(t/1024**r).toFixed(r===0?0:1)} ${n[r]}`}function Vf(e){if(!e||typeof e!="object")return"";let t=["decision","status","winner_model","endpoint","image_preview_url","final_preview_url","notes"],n=[];return t.forEach(a=>{let o=e[a];o!=null&&String(o).trim()!==""&&n.push(`${a}: ${String(o)}`)}),n.length>0?n.slice(0,3).join(" | "):Object.entries(e).slice(0,2).map(([a,o])=>`${a}: ${String(o)}`).join(" | ")}async function I(e,t={}){let n=new Headers(t.headers||{});t.body&&!n.has("Content-Type")&&n.set("Content-Type","application/json");let r=await fetch(e,{...t,headers:n}),a=await r.text(),o=null;if(a)try{o=JSON.parse(a)}catch{o=a}if(!r.ok){let l=o&&typeof o=="object"&&o.detail?o.detail:r.statusText;throw new Error(l||`Request failed (${r.status})`)}return o}function bn(e,t){let n=String(t?.message||"").trim();return n||`Unable to load ${e}`}function Cn(e){let t=String(e?.message||"").trim().toLowerCase();return t==="not found"||t.includes("404")}function zv(e){return{theme_name:String(e.theme_name||"Internal Theme").trim(),tone_funny_pct:Number(e.tone_funny_pct||20),tone_emotion_pct:Number(e.tone_emotion_pct||80),tone_style:String(e.tone_style||"conversational"),audience:String(e.audience||"internal reviewer").trim(),cultural_context:String(e.cultural_context||"global").trim(),output_spec:Vv(e.copy_style,e.target_words),avoid_cliches:!0,cards_per_theme:Number(e.cards_per_theme||10),notes:String(e.notes||"").trim()||null,rendering:{theme_style:"minimal",text_alignment:"center",export_size:"1080x1350"}}}function fa(e){let t=String(e||"").trim().toLowerCase();return t==="witty"||t==="playful"||t==="heartfelt"||t==="minimal"?t:t==="short_crisp"?"minimal":t==="warm_note"?"heartfelt":t.includes("play")?"playful":t.includes("witty")||t.includes("humor")||t.includes("fun")?"witty":t.includes("heart")||t.includes("warm")||t.includes("romantic")||t.includes("reflect")||t.includes("uplift")?"heartfelt":"minimal"}function Bv(e){return!e||typeof e!="object"?null:{theme_name:String(e.theme_name||"Internal Theme").trim(),audience:String(e.audience||"internal reviewer").trim(),cultural_context:String(e.cultural_context||"global").trim(),tone_style:String(e.tone_style||"conversational").trim(),tone_funny_pct:Number(e.tone_funny_pct??20),tone_emotion_pct:Number(e.tone_emotion_pct??80),copy_style:fa(e.tone_style),target_words:14}}function Vv(e,t){return{format:fa(e),length:{target_words:Number(t||16)},structure:{no_lists:!0,no_numbering:!0}}}function ua(e=null){return{theme_key:"",cards_per_theme:10,notes:"",copy_style:fa(e?.tone_style||e?.default_tone_style),target_words:14,tone_funny_pct:Number(e?.tone_funny_pct??e?.default_funny_pct??20)}}function Zf(e){return{cards_per_theme:Number(e.cards_per_theme||10),notes:String(e.notes||"").trim()||null,copy_style:fa(e.copy_style),target_words:Number(e.target_words||14),tone_funny_pct:Number(e.tone_funny_pct??20)}}var Hv=[{value:"witty",label:"witty"},{value:"playful",label:"playful"},{value:"heartfelt",label:"heartfelt"},{value:"minimal",label:"minimal"}];function $s(e){let t=fa(e);return t==="heartfelt"?"Heartfelt":t==="playful"?"Playful":t==="witty"?"Witty":"Minimal"}function Rs(){return Hv.map(e=>y`<option key=${e.value} value=${e.value}>${e.label}</option>`)}function Wv(e){return e&&typeof e.output_spec=="object"&&e.output_spec!==null?e.output_spec:{}}function xs(e){let t=Wv(e);return t&&typeof t.studio=="object"&&t.studio!==null?t.studio:{}}function Kv(e){return!!xs(e).is_favorite}async function Jv(e){let t=await I(`/api/jobs/${e}/image-assets`);return t&&typeof t=="object"?t:{candidates:[]}}async function bs(e){await I(`/api/jobs/${e}/approve-content`,{method:"POST"});let t=await I(`/api/jobs/${e}/image-assets/generate`,{method:"POST"}),n=Array.isArray(t?.candidates)?t.candidates[0]:null;if(!n?.candidate_id)throw new Error("ImageForge returned no image candidates");return await I(`/api/jobs/${e}/image-assets/${n.candidate_id}/select`,{method:"POST"}),await I(`/api/jobs/${e}/render-final`,{method:"POST"}),{imageOptionUsed:!0}}function Hf(e){return String(e||"").split(",").map(t=>t.trim()).filter(Boolean)}function Wf(e){if(!e)return"";let t=new Date(e);return Number.isNaN(t.getTime())?"":t.toISOString().slice(0,10)}function Kf(e){if(!e)return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=t.getTimezoneOffset()*60*1e3;return new Date(t.getTime()-n).toISOString().slice(0,16)}function Jo(e,t=140){let n=String(e||"").trim();return n?n.length<=t?n:`${n.slice(0,t-1).trimEnd()}...`:""}function ep(e){return typeof e=="string"?e.trim():""}function Qv(e){let t=ep(e);if(!t)return!1;if(t.startsWith("data:image/"))return!0;try{let n=new URL(t,window.location.origin);return/\.(png|jpe?g|webp|gif|svg)$/i.test(n.pathname)}catch{return!1}}function Qo(e,t=[]){if(!e||typeof e!="object")return[];let n=[],r=new Set,a=(o,l,i)=>{let s=ep(l);!s||r.has(s)||!Qv(s)||(r.add(s),n.push({label:o,url:s,source:i}))};if(a("Final Preview",e.final_preview_url,"final_preview_url"),a("Final PNG",e.final_asset_urls&&typeof e.final_asset_urls=="object"?e.final_asset_urls.png:"","final_asset_urls.png"),a("Image Preview",e.image_preview_url,"image_preview_url"),a("Content Preview",e.content_preview_url,"content_preview_url"),Array.isArray(t)){let o={final_preview:"Final Preview",final_png:"Final PNG",image_preview:"Image Preview",content_preview:"Content Preview"};t.forEach(l=>{let i=String(l?.asset_type||"").toLowerCase(),s=o[i];s&&a(s,l.public_url||l.asset_url,`asset:${i}`)})}return n}function da(e){let t=(0,R.useMemo)(()=>e.map(i=>`${i.source}:${i.url}`).join("|"),[e]),[n,r]=(0,R.useState)(0);(0,R.useEffect)(()=>{r(0)},[t]);let a=n<e.length?e[n]:null,o=e.length>0&&n>=e.length;function l(){r(i=>i+1)}return{currentCandidate:a,exhausted:o,handleError:l}}function Yv({image:e}){let t=(0,R.useMemo)(()=>!e||!e.url?[]:[{label:e.label||"Preview",url:e.url,source:e.label||"preview"}],[e]),{currentCandidate:n,exhausted:r,handleError:a}=da(t);return y`
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
              <p className="ecard-meta">${Ue(e.created_at)}</p>
            </div>
            <${De} value=${e.status} />
          </div>
          <div className="ecard-stage-row">
            <span className="ecard-stage">${Te(e.current_stage)}</span>
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
    `}function tp(e){return(Array.isArray(e?.candidates)?e.candidates:[]).map((n,r)=>({key:n.candidate_id||n.public_url||`image_candidate_${r}`,candidate_id:String(n.candidate_id||""),provider:String(n.provider||"unknown"),model:String(n.model||"").trim(),candidate_index:Number(n.candidate_index||r+1),url:n.public_url||"",relative_path:n.relative_path||"",width:n.width??null,height:n.height??null,is_selected:!!n.is_selected,created_at:n.created_at||null})).filter(n=>n.url)}function Gv(e,t=[]){let n=Array.isArray(t)?t.filter(r=>{let a=String(r?.asset_type||"").toLowerCase();return a==="final_preview"||a==="final_png"}):[];return Qo(e,n).map((r,a)=>({key:`${r.source}:${a}`,label:r.label,url:r.url,source:r.source}))}function Xv(e,t){let n=xs(e),r=Number(n.selected_text_candidate_id||0);if(r>0){let a=t.find(o=>Number(o.id)===r);if(a)return a}return t.find(a=>a.is_selected)||t[0]||null}function qv(e){let t=tp(e),n=String(e?.selected_image_candidate_id||"");if(n){let r=t.find(a=>a.candidate_id===n);if(r)return r}return t.find(r=>r.is_selected)||t[0]||null}function Qf(e,t){return!e||!t?null:`${e} x ${t}`}function Zv(e){let t=String(e?.status||"").toLowerCase();return t==="completed"?"completed":t.includes("reject")||t.includes("timeout")||t.includes("failed")?"failed":t==="archived"?"archived":"in_progress"}function ey(){let e=jt(),[t,n]=(0,R.useState)([]),[r,a]=(0,R.useState)(null),[o,l]=(0,R.useState)([]),[i,s]=(0,R.useState)(null),[c,m]=(0,R.useState)(!1),[h,v]=(0,R.useState)(!1),[E,S]=(0,R.useState)(!1),[w,N]=(0,R.useState)(""),[d,u]=(0,R.useState)(""),[f,g]=(0,R.useState)(""),[x,P]=(0,R.useState)(""),[L,T]=(0,R.useState)(""),[M,j]=(0,R.useState)(!1),[W,ke]=(0,R.useState)(!1),[O,de]=(0,R.useState)("today"),[J,me]=(0,R.useState)([]),[ie,C]=(0,R.useState)(!1),[$,U]=(0,R.useState)(!1),[z,ne]=(0,R.useState)(""),[fe,Fe]=(0,R.useState)({theme_name:"Internal Launch Sprint",audience:"operations team",cultural_context:"global",tone_style:"conversational",tone_funny_pct:20,tone_emotion_pct:80,copy_style:"minimal",target_words:14,cards_per_theme:10,notes:""}),[ye,ge]=(0,R.useState)(ua()),se=i&&typeof i=="object"&&i.theme||null,At=(0,R.useMemo)(()=>{let k=0,A=0,V=0;return t.forEach($e=>{let Le=String($e.status||"").toLowerCase();if(Le==="completed"){A+=1;return}if(Le.includes("reject")||Le.includes("timeout")||Le.includes("failed")){V+=1;return}Le!=="archived"&&(k+=1)}),{active:k,completed:A,failed:V}},[t]),pa=(0,R.useMemo)(()=>t.filter(k=>k.final_preview_url||k.final_asset_urls&&k.final_asset_urls.png||k.image_preview_url).slice(0,6),[t]),sr=(0,R.useMemo)(()=>t.filter(k=>{let A=String(k.status||"").toLowerCase();return A!=="completed"&&!A.includes("failed")&&!A.includes("reject")&&!A.includes("timeout")&&A!=="archived"}).slice(0,8),[t]),ur=(0,R.useMemo)(()=>t.filter(k=>{let A=String(k.status||"").toLowerCase();return A.includes("failed")||A.includes("reject")||A.includes("timeout")}).slice(0,8),[t]),cr=(0,R.useMemo)(()=>t.filter(k=>Kv(k)).slice(0,6),[t]);async function p(){m(!0),v(!0),S(!0),N(""),u(""),g(""),P("");let[k,A,V,$e]=await Promise.allSettled([I("/api/jobs?limit=50"),I("/api/storage/summary"),I("/api/themes/schedule"),I("/api/themes/today")]),Le="";if(k.status==="fulfilled"?n(Array.isArray(k.value)?k.value:[]):(n([]),N(bn("jobs",k.reason))),A.status==="fulfilled"?a(A.value||null):(a(null),u(bn("storage summary",A.reason))),V.status==="fulfilled"){let Ds=Array.isArray(V.value)?[]:Array.isArray(V.value?.week_schedule)?V.value.week_schedule:[];l(Ds),Ds.length===0&&(Le="Theme schedule not configured yet")}else l([]),Cn(V.reason)?Le="Theme Factory not configured yet":g(bn("Theme Factory schedule",V.reason));$e.status==="fulfilled"?(s($e.value||null),!Le&&$e.value?.resolved===!1?Le=$e.value?.message||"Theme schedule not configured yet":!Le&&!$e.value?.theme&&(Le="Theme schedule not configured yet")):(s(null),Cn($e.reason)?Le=Le||"Theme schedule not configured yet":g(bn("today's theme",$e.reason))),P(Le),m(!1),v(!1),S(!1);let op=V.status!=="fulfilled"&&!Cn(V.reason),lp=$e.status!=="fulfilled"&&!Cn($e.reason),ip=k.status!=="fulfilled"||A.status!=="fulfilled"||op||lp;T(ip?`Refresh completed with errors at ${new Date().toLocaleTimeString()}`:`Refreshed ${new Date().toLocaleTimeString()}`)}(0,R.useEffect)(()=>{p()},[]);async function _(k){k.preventDefault(),C(!0),N("");try{let A=zv(fe),V=await I("/api/jobs/start",{method:"POST",body:JSON.stringify(A)});j(!1);try{await bs(V.job_id),T(`Created ${V.job_id} and built initial card options`)}catch($e){T(`Created ${V.job_id}. Studio follow-up is needed: ${$e.message||"auto-build failed"}`)}await p(),e(`/studio/${V.job_id}`)}catch(A){N(A.message||"Unable to create new job")}finally{C(!1)}}function H(k,A){Fe(V=>({...V,[k]:A}))}function ue(){let k=Bv(se);k&&Fe(A=>({...A,...k}))}async function ot(){if(J.length>0)return J;let k=await I("/api/themes"),A=Array.isArray(k)?k:[];return me(A),A}async function ma(k){if(de(k),g(""),ge(ua(se)),k==="manual"){try{let V=(await ot())[0]||null;ge({...ua(V),theme_key:V?.theme_key||""}),ke(!0)}catch(A){g(A.message||"Unable to load theme catalog")}return}ke(!0)}async function rp(k){k.preventDefault(),U(!0),g("");try{let A=Zf(ye),V=O==="manual"?await I("/api/jobs/start-from-theme",{method:"POST",body:JSON.stringify({theme_key:ye.theme_key,...A})}):await I("/api/jobs/create-daily-theme-job",{method:"POST",body:JSON.stringify(A)});ke(!1);try{await bs(V.job_id),T(O==="manual"?`Created ${V.job_id} from ${ye.theme_key} and built initial card options`:`Created ${V.job_id} from today's theme and built initial card options`)}catch($e){T(O==="manual"?`Created ${V.job_id} from ${ye.theme_key}. Studio follow-up is needed: ${$e.message||"auto-build failed"}`:`Created ${V.job_id} from today's theme. Studio follow-up is needed: ${$e.message||"auto-build failed"}`)}await p(),e(`/studio/${V.job_id}`)}catch(A){g(A.message||(O==="manual"?"Unable to create theme job":"Unable to create today's themed job"))}finally{U(!1)}}function ap(k){let A=J.find(V=>V.theme_key===k);ge(V=>({...V,theme_key:k,tone_funny_pct:Number(A?.default_funny_pct??V.tone_funny_pct??20)}))}async function Ps(k){ne(`archive:${k.job_id}`),N("");try{await I(`/api/jobs/${k.job_id}/archive`,{method:"POST"}),T(`Archived ${k.job_id}`),await p()}catch(A){N(A.message||"Unable to archive job")}finally{ne("")}}async function Ts(k){if(window.confirm(`Delete ${k.job_id} and associated files?`)){ne(`delete:${k.job_id}`),N("");try{await I(`/api/jobs/${k.job_id}`,{method:"DELETE"}),T(`Deleted ${k.job_id}`),await p()}catch(V){N(V.message||"Unable to delete job")}finally{ne("")}}}return y`
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
              disabled=${$||E||!se}
            >
              Generate Today's Cards
            </button>
            <button type="button" className="button" onClick=${()=>ma("manual")}>Generate From Theme</button>
            <button type="button" className="button" onClick=${()=>j(!0)}>Create New Card Job</button>
            <button
              type="button"
              className="button"
              onClick=${p}
              disabled=${c||h||E}
            >
              Refresh
            </button>
          </div>
        </header>

        ${L?y`<p className="status-line">${L}</p>`:null}

        ${c||h||E||w||d||f?y`
              <div className="status-stack">
                ${c?y`<div className="status-panel warning">Loading jobs from /api/jobs...</div>`:null}
                ${h?y`<div className="status-panel warning">Loading storage summary from /api/storage/summary...</div>`:null}
                ${E?y`<div className="status-panel warning">Loading Theme Factory data from /api/themes/schedule...</div>`:null}
                ${w?y`<div className="status-panel error">Unable to load jobs: ${w}</div>`:null}
                ${d?y`<div className="status-panel error">Unable to load storage summary: ${d}</div>`:null}
                ${f?y`<div className="status-panel error">Theme error: ${f}</div>`:null}
              </div>
            `:null}

        <section className="cards-grid">
          <article className="summary-card">
            <p className="summary-label">Today's Theme</p>
            <p className="summary-value summary-value-small">${se?se.theme_name:"Unavailable"}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">In Progress</p>
            <p className="summary-value">${c?"...":sr.length}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Failed Jobs</p>
            <p className="summary-value">${c?"...":ur.length}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Favorite Cards</p>
            <p className="summary-value">${c?"...":cr.length}</p>
          </article>
        </section>

        <section className="section-panel home-hero">
          <div className="section-head">
            <div>
              <h2 className="section-title">Today's Theme</h2>
              <p className="section-copy">
                ${se?`${se.theme_name} | ${$s("minimal")} card flow with ${Te(i?.weekday)} scheduling`:x||"Theme schedule not configured yet."}
              </p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button primary"
                onClick=${()=>ma("today")}
                disabled=${$||E||!se}
              >
                ${$&&O==="today"?"Generating...":"Generate Today's Cards"}
              </button>
              <button type="button" className="button" onClick=${()=>ma("manual")}>Generate From Theme</button>
              <button type="button" className="button" onClick=${()=>j(!0)}>Create New Card Job</button>
            </div>
          </div>
          ${se?y`
                <div className="key-value-grid">
                  <article className="key-card">
                    <p className="key-label">theme_name</p>
                    <p className="key-value">${se.theme_name}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">bucket</p>
                    <p className="key-value">${qf(se.theme_bucket)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">tone_style</p>
                    <p className="key-value">${se.tone_style}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">audience</p>
                    <p className="key-value">${se.audience}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">default run</p>
                    <p className="key-value">10 cards | 8-18 words</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">storage</p>
                    <p className="key-value">${h?"...":r?Mv(r.total_bytes):"Unavailable"}</p>
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
          ${c?y`<p className="empty-state">Loading recent eCards...</p>`:pa.length===0?y`<p className="empty-state">No rendered cards yet. Generate today's cards or run a theme manually.</p>`:y`
                  <div className="ecard-grid">
                    ${pa.map(k=>y`
                        <${Jf}
                          key=${k.job_id}
                          job=${k}
                          actionState=${z}
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
          ${cr.length===0?y`<p className="empty-state">No favorite cards yet. Mark a final card from Studio.</p>`:y`
                <div className="ecard-grid">
                  ${cr.map(k=>y`
                      <${Jf}
                        key=${k.job_id}
                        job=${k}
                        actionState=${z}
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
                        ${sr.map(k=>y`
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
                        ${ur.map(k=>y`
                            <tr key=${k.job_id}>
                              <td><${Xe} className="job-link" to=${`/studio/${k.job_id}`}>${k.job_id}<//></td>
                              <td>${k.theme_name}</td>
                              <td><${De} value=${k.status} /></td>
                              <td>${Jo(k.last_error_message||"-",80)}</td>
                            </tr>
                          `)}
                      </tbody>
                    </table>
                  </div>
                `}
          </section>
        </section>

        ${M?y`
              <div className="modal-backdrop" onClick=${()=>j(!1)}>
                <section className="modal" onClick=${k=>k.stopPropagation()}>
                  <h2 className="section-title">Create New Card Job</h2>
                  <p className="section-copy">Starts a new card run with short, crisp copy defaults and opens Studio.</p>
                  <form onSubmit=${_}>
                    <div className="form-grid">
                      <div className="form-field full">
                        <label htmlFor="themeName">Theme Name</label>
                        <input
                          id="themeName"
                          value=${fe.theme_name}
                          onInput=${k=>H("theme_name",k.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="audience">Audience</label>
                        <input
                          id="audience"
                          value=${fe.audience}
                          onInput=${k=>H("audience",k.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="culturalContext">Cultural Context</label>
                        <input
                          id="culturalContext"
                          value=${fe.cultural_context}
                          onInput=${k=>H("cultural_context",k.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="toneStyle">Tone Style</label>
                        <select
                          id="toneStyle"
                          value=${fe.tone_style}
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
                          value=${fe.tone_funny_pct}
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
                          value=${fe.tone_emotion_pct}
                          onInput=${k=>H("tone_emotion_pct",k.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="copyStyle">Copy Style</label>
                        <select
                          id="copyStyle"
                          value=${fe.copy_style}
                          onChange=${k=>H("copy_style",k.target.value)}
                        >
                          ${Rs()}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="targetWords">Target Words</label>
                        <input
                          id="targetWords"
                          type="number"
                          min="4"
                          max="60"
                          value=${fe.target_words}
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
                          value=${fe.cards_per_theme}
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
                          value=${fe.notes}
                          onInput=${k=>H("notes",k.target.value)}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button
                        type="button"
                        className="button"
                        onClick=${ue}
                        disabled=${!se}
                      >
                        Use Today's Theme
                      </button>
                      <button type="submit" className="button primary" disabled=${ie}>
                        ${ie?"Creating...":"Create Job"}
                      </button>
                      <button type="button" className="button" onClick=${()=>j(!1)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}

        ${W?y`
              <div className="modal-backdrop" onClick=${()=>ke(!1)}>
                <section className="modal" onClick=${k=>k.stopPropagation()}>
                  <h2 className="section-title">${O==="manual"?"Generate From Theme":"Use Today's Theme"}</h2>
                  <p className="section-copy">
                    ${O==="manual"?"Start a workflow job from any selected Theme Factory record.":se?`Resolved theme: ${se.theme_name}`:"Use today's resolved theme."}
                  </p>
                  <form onSubmit=${rp}>
                    <div className="form-grid">
                      ${O==="manual"?y`
                            <div className="form-field full">
                              <label htmlFor="runThemeKey">Theme</label>
                              <select
                                id="runThemeKey"
                                value=${ye.theme_key}
                                onChange=${k=>ap(k.target.value)}
                                required
                              >
                                ${J.map(k=>y`<option key=${k.id} value=${k.theme_key}>${k.theme_name}</option>`)}
                              </select>
                            </div>
                          `:null}
                      <div className="form-field">
                        <label htmlFor="runCopyStyle">Copy Style</label>
                        <select
                          id="runCopyStyle"
                          value=${ye.copy_style}
                          onChange=${k=>ge(A=>({...A,copy_style:k.target.value}))}
                        >
                          ${Rs()}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="runTargetWords">Target Words</label>
                        <input
                          id="runTargetWords"
                          type="number"
                          min="4"
                          max="60"
                          value=${ye.target_words}
                          onInput=${k=>ge(A=>({...A,target_words:k.target.value}))}
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
                          value=${ye.tone_funny_pct}
                          onInput=${k=>ge(A=>({...A,tone_funny_pct:k.target.value}))}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="runCardsPerTheme">Cards Per Theme</label>
                        <input
                          id="runCardsPerTheme"
                          type="number"
                          min="1"
                          max="50"
                          value=${ye.cards_per_theme}
                          onInput=${k=>ge(A=>({...A,cards_per_theme:k.target.value}))}
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
                          value=${ye.notes}
                          onInput=${k=>ge(A=>({...A,notes:k.target.value}))}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${$}>
                        ${$?"Creating...":O==="manual"?"Generate From Theme":"Use Today's Theme"}
                      </button>
                      <button type="button" className="button" onClick=${()=>ke(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}
      </section>
    `}function ty(){let e=jt(),{jobId:t}=Ho(),[n,r]=(0,R.useState)(null),[a,o]=(0,R.useState)([]),[l,i]=(0,R.useState)([]),[s,c]=(0,R.useState)([]),[m,h]=(0,R.useState)([]),[v,E]=(0,R.useState)([]),[S,w]=(0,R.useState)(!1),[N,d]=(0,R.useState)(""),[u,f]=(0,R.useState)(""),[g,x]=(0,R.useState)(""),P=(0,R.useCallback)(async(C={})=>{if(!t)return;let $=!!C.quiet;$||w(!0),f("");try{let[U,z,ne,fe,Fe]=await Promise.all([I(`/api/jobs/${t}`),I(`/api/jobs/${t}/assets`),I(`/api/jobs/${t}/events`),I(`/api/jobs/${t}/candidates`),I(`/api/jobs/${t}/shortlist`)]);r(U||null),o(Array.isArray(z)?z:[]),i(Array.isArray(ne)?ne:[]);let ye=Array.isArray(fe)?fe:[],ge=Array.isArray(Fe)?Fe:[];c(ye),h(ge);let se=ge.filter(At=>At.is_selected).map(At=>Number(At.candidate_id)).filter(At=>Number.isInteger(At));E(se.length>0?se:ge[0]?[Number(ge[0].candidate_id)]:[])}catch(U){f(U.message||"Unable to load job detail")}finally{$||w(!1)}},[t]);(0,R.useEffect)(()=>{P()},[P]),(0,R.useEffect)(()=>{if(!t)return;let C=window.setInterval(()=>{document.visibilityState==="visible"&&P({quiet:!0})},1e4);return()=>window.clearInterval(C)},[t,P]);let L=(0,R.useMemo)(()=>{if(!n)return[];let C=String(n.status||"").toLowerCase(),$=n.content_preview?"completed":C.startsWith("content")?"in_progress":"pending",U=n.image_preview_url||C.startsWith("final")||C==="completed"?"completed":C.startsWith("image")?"in_progress":"pending",z=n.final_asset_urls&&(n.final_asset_urls.png||n.final_asset_urls.pdf)?"completed":C.startsWith("final")?"in_progress":C==="completed"?"completed":"pending";return[{label:"content_generation_status",value:$},{label:"content_approval_status",value:n.content_approval_status||"pending"},{label:"image_generation_status",value:U},{label:"image_approval_status",value:n.image_approval_status||"pending"},{label:"final_render_status",value:z},{label:"final_approval_status",value:n.final_approval_status||"pending"}]},[n]),T=(0,R.useMemo)(()=>n?Qo(n,a):[],[n,a]),M=da(T),j=(0,R.useMemo)(()=>n?Qo({image_preview_url:n.image_preview_url,content_preview_url:n.content_preview_url},a.filter(C=>String(C?.asset_type||"").toLowerCase()==="image_preview")):[],[n,a]),W=da(j),ke=(0,R.useMemo)(()=>a.filter(C=>String(C?.asset_type||"").toLowerCase()==="shortlist_preview").map((C,$)=>({label:`Shortlist Preview ${$+1}`,url:C.public_url||C.asset_url,source:`shortlist_preview:${$}`})).filter(C=>C.url),[a]);async function O(C,$,U){if(t){d(C),f("");try{let z=await I($,{method:"POST"});x(U||`${z.job_id} updated`),await P()}catch(z){f(z.message||"Unable to update stage")}finally{d("")}}}function de(C,$){E(U=>{let z=new Set(U);return $?z.add(C):z.delete(C),Array.from(z)})}async function J(){if(t){d("render-shortlist"),f("");try{let C=await I(`/api/jobs/${t}/render-shortlist`,{method:"POST",body:JSON.stringify({candidate_ids:v})});x(`Rendered ${C.rendered_count} shortlist preview card(s)`),await P()}catch(C){f(C.message||"Unable to render shortlist")}finally{d("")}}}async function me(){if(t){d("archive"),f("");try{let C=await I(`/api/jobs/${t}/archive`,{method:"POST"});x(`Job archived (${Ue(C.updated_at)})`),await P()}catch(C){f(C.message||"Unable to archive job")}finally{d("")}}}async function ie(){if(!(!t||!window.confirm(`Delete ${t} and associated files?`))){d("delete"),f("");try{await I(`/api/jobs/${t}`,{method:"DELETE"}),e("/")}catch($){f($.message||"Unable to delete job")}finally{d("")}}}return y`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Jobs</p>
            <h1 className="page-title">Job Detail</h1>
            <p className="page-description">${t||"-"}</p>
          </div>
          <div className="inline-actions">
            <button className="button" type="button" onClick=${P} disabled=${S}>Refresh</button>
            <button
              className="button"
              type="button"
              onClick=${me}
              disabled=${N==="archive"}
            >
              ${N==="archive"?"Archiving...":"Archive Job"}
            </button>
            <button
              className="button danger"
              type="button"
              onClick=${ie}
              disabled=${N==="delete"}
            >
              ${N==="delete"?"Deleting...":"Delete Job + Files"}
            </button>
          </div>
        </header>

        ${u?y`<p className="status-line error">${u}</p>`:null}
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
                      onClick=${()=>O("rerun-content",`/api/jobs/${t}/rerun/content`,`Text rerun for ${t}`)}
                      disabled=${N==="rerun-content"}
                    >
                      ${N==="rerun-content"?"Working...":"Regenerate Text"}
                    </button>
                    <button
                      type="button"
                      className="button"
                      onClick=${()=>O("rerun-image",`/api/jobs/${t}/rerun/image`,`Image rerun for ${t}`)}
                      disabled=${N==="rerun-image"}
                    >
                      ${N==="rerun-image"?"Working...":"Regenerate Image"}
                    </button>
                    <button
                      type="button"
                      className="button primary"
                      onClick=${()=>O("rerun-card",`/api/jobs/${t}/rerun/final-render`,`Card rerun for ${t}`)}
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
                    ${W.currentCandidate?y`<img className="studio-current-image" src=${W.currentCandidate.url} alt="Selected image" loading="lazy" onError=${W.handleError} />`:y`<p className="empty-state compact">No image selected yet.</p>`}
                  </article>
                  <article className="key-card">
                    <p className="key-label">final card preview</p>
                    ${M.currentCandidate?y`<img className="studio-current-image" src=${M.currentCandidate.url} alt="Final card preview" loading="lazy" onError=${M.handleError} />`:y`<p className="empty-state compact">No final card rendered yet.</p>`}
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
                  ${L.map(C=>y`
                      <article className="key-card" key=${C.label}>
                        <p className="key-label">${C.label}</p>
                        <p className="key-value"><${De} value=${C.value} /></p>
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
                    onClick=${()=>O("regenerate-content",`/api/jobs/${t}/regenerate-content`,`Content regenerated for ${t}`)}
                    disabled=${N==="regenerate-content"}
                  >
                    ${N==="regenerate-content"?"Working...":"Regenerate Text"}
                  </button>
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
                ${W.currentCandidate?y`
                      <div className="image-grid image-grid-single">
                        <article className="image-card">
                          <a href=${W.currentCandidate.url} target="_blank" rel="noreferrer">
                            <img
                              src=${W.currentCandidate.url}
                              alt="Image Preview"
                              loading="lazy"
                              onError=${W.handleError}
                            />
                          </a>
                          <p className="image-caption">Image Preview</p>
                        </article>
                      </div>
                    `:W.exhausted?y`<p className="empty-state">Preview unavailable.</p>`:y`<p className="empty-state">No image preview available yet.</p>`}
                <div className="inline-actions padded-actions">
                  <button
                    type="button"
                    className="button primary"
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
                    <p className="section-copy">Use rerun when the card layout or polish is off. Approval stays available below as a secondary control.</p>
                  </div>
                  <${De} value=${n.final_approval_status||"pending"} />
                </div>
                ${M.currentCandidate?y`
                      <div className="hero-preview">
                        <a href=${M.currentCandidate.url} target="_blank" rel="noreferrer">
                          <img
                            src=${M.currentCandidate.url}
                            alt=${n.theme_name||"Generated eCard"}
                            loading="lazy"
                            onError=${M.handleError}
                          />
                        </a>
                      </div>
                    `:M.exhausted?y`<p className="empty-state">Preview unavailable.</p>`:y`<p className="empty-state">No final card preview available yet.</p>`}
                <div className="inline-actions padded-actions">
                  <button
                    type="button"
                    className="button primary"
                    onClick=${()=>O("render-final",`/api/jobs/${t}/render-final`,`Final rendered for ${t}`)}
                    disabled=${N==="render-final"||n.image_approval_status!=="approved"}
                  >
                    ${N==="render-final"?"Working...":"Regenerate Card"}
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
                  ${l.length===0?y`<p className="empty-state">No lifecycle events found.</p>`:y`
                        <ul className="list-simple">
                          ${l.slice().reverse().map((C,$)=>y`
                                <li key=${`${C.event_type}_${$}`} className="list-item">
                                  <p className="event-type">${C.event_type}</p>
                                  <p className="event-meta">${Ue(C.created_at)}</p>
                                  ${Vf(C.event_payload_json)?y`<p className="event-meta">${Vf(C.event_payload_json)}</p>`:null}
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
                              ${a.map((C,$)=>y`
                                  <tr key=${`${C.asset_type}_${$}`}>
                                    <td>${C.asset_type}</td>
                                    <td>
                                      ${C.asset_url?y`<a className="job-link" href=${C.asset_url} target="_blank" rel="noreferrer">open</a>`:"-"}
                                    </td>
                                    <td><code>${C.relative_path||"-"}</code></td>
                                    <td><code>${C.absolute_path||"-"}</code></td>
                                    <td><${De} value=${C.approved?"approved":"pending"} /></td>
                                    <td>${Ue(C.created_at)}</td>
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
                              ${s.map(C=>y`
                                  <tr key=${C.id||`${C.model}_${C.text}`}>
                                    <td>${C.model}</td>
                                    <td>${Number(C.raw_score||0).toFixed(3)}</td>
                                    <td>${Number(C.judged_score??C.judge_score??0).toFixed(3)}</td>
                                    <td><${De} value=${C.is_shortlisted?"shortlisted":"pooled"} /></td>
                                    <td><${De} value=${C.is_selected?"selected":"not_selected"} /></td>
                                    <td>${Jo(C.text||C.content_text,200)}</td>
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
                    <button type="button" className="button primary" onClick=${J} disabled=${N==="render-shortlist"||m.length===0}>
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
                              ${m.map(C=>y`
                                  <tr key=${C.candidate_id}>
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked=${v.includes(Number(C.candidate_id))}
                                        onChange=${$=>de(Number(C.candidate_id),$.target.checked)}
                                      />
                                    </td>
                                    <td>${C.rank}</td>
                                    <td>${C.model}</td>
                                    <td>${Number(C.score||0).toFixed(3)}</td>
                                    <td>${Jo(C.text,220)}</td>
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
                  ${T.length===0&&ke.length===0?y`<p className="empty-state">No preview variants available yet.</p>`:y`
                        <div className="image-grid">
                          ${[...T,...ke].map(C=>y`
                              <${Yv} key=${C.url} image=${C} />
                            `)}
                        </div>
                      `}
                </section>
              </details>
            `:y`<p className="empty-state">${S?"Loading job details...":"Job not found."}</p>`}
      </section>
    `}function ny(){let e=jt(),[t,n]=(0,R.useState)([]),[r,a]=(0,R.useState)({week_schedule:[],month_schedule:[],active_overrides:[]}),[o,l]=(0,R.useState)(null),[i,s]=(0,R.useState)(!1),[c,m]=(0,R.useState)(""),[h,v]=(0,R.useState)(""),[E,S]=(0,R.useState)(""),[w,N]=(0,R.useState)(""),[d,u]=(0,R.useState)(!1),[f,g]=(0,R.useState)(!1),[x,P]=(0,R.useState)(!1),[L,T]=(0,R.useState)(!1),[M,j]=(0,R.useState)(null),[W,ke]=(0,R.useState)(null),[O,de]=(0,R.useState)({theme_key:"",theme_name:"",description:"",theme_bucket:"everyday",theme_type:"evergreen",cultural_context:"global",tone_style:"conversational",default_funny_pct:20,default_emotion_pct:80,default_audience:"general audience",default_visual_style:"minimal",is_active:!0,priority:0}),[J,me]=(0,R.useState)({theme_id:"",schedule_type:"weekly_recurring",start_date:"",end_date:"",weekday_mask:"monday",month_mask:"",region:"",country:"",is_active:!0,priority:0,notes:""}),[ie,C]=(0,R.useState)({theme_id:"",override_scope:"editorial",start_at:"",end_at:"",reason:"",force_top_priority:!0,created_by:"console_admin"}),[$,U]=(0,R.useState)(ua()),z=o&&typeof o=="object"&&o.theme||null,ne=(0,R.useMemo)(()=>t.reduce((p,_)=>{let H=String(_.theme_bucket||"everyday");return p[H]=(p[H]||0)+1,p},{everyday:0,occasion:0,current_event:0}),[t]),fe=(0,R.useMemo)(()=>[{key:"everyday",title:"Everyday Themes",description:"Recurring weekday themes that keep the console stocked with steady daily runs.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="everyday")},{key:"occasion",title:"Occasion Themes",description:"Date-range and seasonal campaign themes such as Ramadan, Holi, and Valentine's Week.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="occasion")},{key:"current_event",title:"Current Event Themes",description:"Editorial and trend-driven themes that are intended to be activated through overrides.",items:t.filter(p=>String(p.theme_bucket||"everyday")==="current_event")}],[t]);async function Fe(){s(!0),m(""),v("");let[p,_,H]=await Promise.allSettled([I("/api/themes"),I("/api/themes/today"),I("/api/themes/schedule")]);if(p.status==="fulfilled"){let ue=Array.isArray(p.value)?p.value:[];n(ue),ue.length>0&&(me(ot=>({...ot,theme_id:String(ot.theme_id||ue[0].id)})),C(ot=>({...ot,theme_id:String(ot.theme_id||ue[0].id)}))),ue.length===0&&v("Theme schedule not configured yet")}else n([]),Cn(p.reason)?v("Theme schedule not configured yet"):m(bn("theme catalog",p.reason));if(_.status==="fulfilled"?(l(_.value||null),_.value?.resolved===!1&&v(ue=>ue||_.value?.message||"No theme resolved yet")):(l(null),Cn(_.reason)?v(ue=>ue||"No theme resolved yet"):m(ue=>ue||bn("today's theme",_.reason))),H.status==="fulfilled"){if(Array.isArray(H.value)){a({week_schedule:[],month_schedule:[],active_overrides:[]}),v(ue=>ue||"Theme schedule not configured yet"),s(!1);return}a({week_schedule:Array.isArray(H.value?.week_schedule)?H.value.week_schedule:[],month_schedule:Array.isArray(H.value?.month_schedule)?H.value.month_schedule:[],active_overrides:Array.isArray(H.value?.active_overrides)?H.value.active_overrides:[]})}else a({week_schedule:[],month_schedule:[],active_overrides:[]}),Cn(H.reason)?v(ue=>ue||"Theme schedule not configured yet"):m(ue=>ue||bn("theme schedule",H.reason));s(!1)}(0,R.useEffect)(()=>{Fe()},[]);function ye(p=null){j(p?p.id:null),de({theme_key:p?.theme_key||"",theme_name:p?.theme_name||"",description:p?.description||"",theme_bucket:p?.theme_bucket||"everyday",theme_type:p?.theme_type||"evergreen",cultural_context:p?.cultural_context||"global",tone_style:p?.tone_style||"conversational",default_funny_pct:p?.default_funny_pct??20,default_emotion_pct:p?.default_emotion_pct??80,default_audience:p?.default_audience||"general audience",default_visual_style:p?.default_visual_style||"minimal",is_active:p?.is_active??!0,priority:p?.priority??0}),u(!0)}function ge(p=null){ke(p?p.id:null),me({theme_id:String(p?.theme_id||t[0]?.id||""),schedule_type:p?.schedule_type||"weekly_recurring",start_date:Wf(p?.start_date),end_date:Wf(p?.end_date),weekday_mask:Array.isArray(p?.weekday_mask)?p.weekday_mask.join(", "):"monday",month_mask:Array.isArray(p?.month_mask)?p.month_mask.join(", "):"",region:p?.region||"",country:p?.country||"",is_active:p?.is_active??!0,priority:p?.priority??0,notes:p?.notes||""}),g(!0)}function se(p=null){let _=new Date,H=new Date(_.getTime()+1440*60*1e3);C({theme_id:String(p||z?.theme_id||t[0]?.id||""),override_scope:"editorial",start_at:Kf(_.toISOString()),end_at:Kf(H.toISOString()),reason:"",force_top_priority:!0,created_by:"console_admin"}),P(!0)}async function At(p){p.preventDefault(),N("save-theme"),m("");try{let _={theme_key:String(O.theme_key||"").trim(),theme_name:String(O.theme_name||"").trim(),description:String(O.description||"").trim()||null,theme_bucket:O.theme_bucket,theme_type:O.theme_type,cultural_context:String(O.cultural_context||"").trim()||null,tone_style:String(O.tone_style||"").trim(),default_funny_pct:Number(O.default_funny_pct||0),default_emotion_pct:Number(O.default_emotion_pct||0),default_audience:String(O.default_audience||"").trim(),default_visual_style:String(O.default_visual_style||"").trim(),is_active:!!O.is_active,priority:Number(O.priority||0)},H=M?`/api/themes/${M}`:"/api/themes";await I(H,{method:M?"PUT":"POST",body:JSON.stringify(_)}),u(!1),S(M?"Theme updated":"Theme created"),await Fe()}catch(_){m(_.message||"Unable to save theme")}finally{N("")}}async function pa(p){if(window.confirm(`Deactivate theme ${p.theme_name}?`)){N(`delete-theme:${p.id}`),m("");try{await I(`/api/themes/${p.id}`,{method:"DELETE"}),S(`Theme deactivated: ${p.theme_name}`),await Fe()}catch(H){m(H.message||"Unable to delete theme")}finally{N("")}}}async function sr(p){p.preventDefault(),N("save-schedule"),m("");try{let _={theme_id:Number(J.theme_id),schedule_type:J.schedule_type,start_date:J.start_date||null,end_date:J.end_date||null,weekday_mask:Hf(J.weekday_mask),month_mask:Hf(J.month_mask).map(ot=>Number(ot)).filter(ot=>Number.isInteger(ot)),region:String(J.region||"").trim()||null,country:String(J.country||"").trim()||null,is_active:!!J.is_active,priority:Number(J.priority||0),notes:String(J.notes||"").trim()||null},H=W?`/api/themes/schedule/${W}`:"/api/themes/schedule";await I(H,{method:W?"PUT":"POST",body:JSON.stringify(_)}),g(!1),S(W?"Schedule updated":"Schedule created"),await Fe()}catch(_){m(_.message||"Unable to save schedule")}finally{N("")}}async function ur(p){p.preventDefault(),N("save-override"),m("");try{let _={theme_id:Number(ie.theme_id),override_scope:String(ie.override_scope||"").trim(),start_at:new Date(ie.start_at).toISOString(),end_at:new Date(ie.end_at).toISOString(),reason:String(ie.reason||"").trim()||null,force_top_priority:!!ie.force_top_priority,created_by:String(ie.created_by||"console_admin").trim()};await I("/api/themes/overrides",{method:"POST",body:JSON.stringify(_)}),P(!1),S("Override created"),await Fe()}catch(_){m(_.message||"Unable to save override")}finally{N("")}}async function cr(p){p&&p.preventDefault(),N("create-today-job"),m("");try{let _=await I("/api/jobs/create-daily-theme-job",{method:"POST",body:JSON.stringify(Zf($))});T(!1);try{await bs(_.job_id),S(`Created ${_.job_id} from today's theme and opened Studio`)}catch(H){S(`Created ${_.job_id} from today's theme. Studio follow-up is needed: ${H.message||"auto-build failed"}`)}e(`/studio/${_.job_id}`)}catch(_){m(_.message||"Unable to create today's themed job")}finally{N("")}}return y`
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
              onClick=${()=>{U(ua(z)),T(!0)}}
              disabled=${w==="create-today-job"||!z}
            >
              ${w==="create-today-job"?"Creating...":"Use Today's Theme"}
            </button>
            <button type="button" className="button" onClick=${Fe} disabled=${i}>Refresh</button>
            <${Xe} to="/" className="button-link">Home<//>
          </div>
        </header>

        ${c?y`<div className="status-panel error">${c}</div>`:null}
        ${h?y`<div className="status-panel neutral">${h}</div>`:null}
        ${E?y`<p className="status-line">${E}</p>`:null}
        ${i?y`<div className="status-panel warning">Loading Theme Factory data...</div>`:null}

        <section className="cards-grid">
          <article className="summary-card">
            <p className="summary-label">Everyday Themes</p>
            <p className="summary-value">${ne.everyday}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Occasion Themes</p>
            <p className="summary-value">${ne.occasion}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Current Event Themes</p>
            <p className="summary-value">${ne.current_event}</p>
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
          ${z?y`
                <div className="key-value-grid">
                  <article className="key-card">
                    <p className="key-label">Theme</p>
                    <p className="key-value">${z.theme_name}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Bucket</p>
                    <p className="key-value">${qf(z.theme_bucket)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Source</p>
                    <p className="key-value">${Te(o?.source)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Weekday</p>
                    <p className="key-value">${Te(o?.weekday)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Audience</p>
                    <p className="key-value">${z.audience}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Tone</p>
                    <p className="key-value">${z.tone_style}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Priority</p>
                    <p className="key-value">${z.priority}</p>
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
              <button type="button" className="button primary" onClick=${()=>ye()}>Add Theme</button>
            </div>
          </div>
          ${t.length===0?y`<p className="empty-state">No theme catalog entries found.</p>`:y`
                ${fe.map(p=>y`
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
                                        <td>${Te(_.theme_type)}</td>
                                        <td>${_.default_audience}</td>
                                        <td>${_.default_visual_style}</td>
                                        <td>${_.priority}</td>
                                        <td><${De} value=${_.is_active?"active":"inactive"} /></td>
                                        <td>
                                          <div className="inline-actions">
                                            <button type="button" className="button" onClick=${()=>ye(_)}>Edit</button>
                                            <button
                                              type="button"
                                              className="button danger"
                                              onClick=${()=>pa(_)}
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
              <button type="button" className="button primary" onClick=${()=>ge()}>Add Schedule</button>
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
                              <td>${Te(p.weekday)}</td>
                              <td>${p.theme?.theme_name||"-"}</td>
                              <td>${Te(p.source)}</td>
                              <td>${Te(p.schedule_type)}</td>
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
              <button type="button" className="button primary" onClick=${()=>se()}>Add Override</button>
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
                              <td>${Te(p.override_scope)}</td>
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
                            <td>${Te(p.schedule_type)}</td>
                            <td>${p.start_date?Ue(p.start_date):"-"}</td>
                            <td>${p.end_date?Ue(p.end_date):"-"}</td>
                            <td>${(p.weekday_mask||[]).join(", ")||"-"}</td>
                            <td>${p.priority}</td>
                            <td>
                              <button type="button" className="button" onClick=${()=>ge(p)}>
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
              <div className="modal-backdrop" onClick=${()=>T(!1)}>
                <section className="modal" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">Use Today's Theme</h2>
                  <p className="section-copy">
                    ${z?`Resolved theme: ${z.theme_name}`:"No theme resolved yet."}
                  </p>
                  <form onSubmit=${cr}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="todayCopyStyle">Copy Style</label>
                        <select
                          id="todayCopyStyle"
                          value=${$.copy_style}
                          onChange=${p=>U(_=>({..._,copy_style:p.target.value}))}
                        >
                          ${Rs()}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="todayTargetWords">Target Words</label>
                        <input
                          id="todayTargetWords"
                          type="number"
                          min="4"
                          max="60"
                          value=${$.target_words}
                          onInput=${p=>U(_=>({..._,target_words:p.target.value}))}
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
                          value=${$.tone_funny_pct}
                          onInput=${p=>U(_=>({..._,tone_funny_pct:p.target.value}))}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="todayCardsPerTheme">Cards Per Theme</label>
                        <input
                          id="todayCardsPerTheme"
                          type="number"
                          min="1"
                          max="50"
                          value=${$.cards_per_theme}
                          onInput=${p=>U(_=>({..._,cards_per_theme:p.target.value}))}
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
                          value=${$.notes}
                          onInput=${p=>U(_=>({..._,notes:p.target.value}))}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${w==="create-today-job"||!z}>
                        ${w==="create-today-job"?"Creating...":"Use Today's Theme"}
                      </button>
                      <button type="button" className="button" onClick=${()=>T(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}

        ${d?y`
              <div className="modal-backdrop" onClick=${()=>u(!1)}>
                <section className="modal modal-wide" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">${M?"Edit Theme":"Add Theme"}</h2>
                  <form onSubmit=${At}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="themeKey">Theme Key</label>
                        <input id="themeKey" value=${O.theme_key} onInput=${p=>de(_=>({..._,theme_key:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeNameFactory">Theme Name</label>
                        <input id="themeNameFactory" value=${O.theme_name} onInput=${p=>de(_=>({..._,theme_name:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeBucket">Theme Bucket</label>
                        <select id="themeBucket" value=${O.theme_bucket} onChange=${p=>de(_=>({..._,theme_bucket:p.target.value}))}>
                          <option value="everyday">everyday</option>
                          <option value="occasion">occasion</option>
                          <option value="current_event">current event</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeType">Theme Type</label>
                        <select id="themeType" value=${O.theme_type} onChange=${p=>de(_=>({..._,theme_type:p.target.value}))}>
                          <option value="evergreen">evergreen</option>
                          <option value="calendar">calendar</option>
                          <option value="campaign">campaign</option>
                          <option value="news">news</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeContext">Cultural Context</label>
                        <input id="themeContext" value=${O.cultural_context} onInput=${p=>de(_=>({..._,cultural_context:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeTone">Tone Style</label>
                        <input id="themeTone" value=${O.tone_style} onInput=${p=>de(_=>({..._,tone_style:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeAudience">Audience</label>
                        <input id="themeAudience" value=${O.default_audience} onInput=${p=>de(_=>({..._,default_audience:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeVisual">Visual Style</label>
                        <input id="themeVisual" value=${O.default_visual_style} onInput=${p=>de(_=>({..._,default_visual_style:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themePriority">Priority</label>
                        <input id="themePriority" type="number" value=${O.priority} onInput=${p=>de(_=>({..._,priority:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeFunny">Funny %</label>
                        <input id="themeFunny" type="number" min="0" max="100" value=${O.default_funny_pct} onInput=${p=>de(_=>({..._,default_funny_pct:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeEmotion">Emotion %</label>
                        <input id="themeEmotion" type="number" min="0" max="100" value=${O.default_emotion_pct} onInput=${p=>de(_=>({..._,default_emotion_pct:p.target.value}))} />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="themeDescription">Description</label>
                        <textarea id="themeDescription" rows="4" value=${O.description} onInput=${p=>de(_=>({..._,description:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${O.is_active} onChange=${p=>de(_=>({..._,is_active:p.target.checked}))} />
                        <span>Active theme</span>
                      </label>
                    </div>
                    <div className="inline-actions" style=${{marginTop:"12px"}}>
                      <button type="submit" className="button primary" disabled=${w==="save-theme"}>
                        ${w==="save-theme"?"Saving...":"Save Theme"}
                      </button>
                      <button type="button" className="button" onClick=${()=>u(!1)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `:null}

        ${f?y`
              <div className="modal-backdrop" onClick=${()=>g(!1)}>
                <section className="modal modal-wide" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">${W?"Edit Schedule":"Add Schedule"}</h2>
                  <form onSubmit=${sr}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="scheduleTheme">Theme</label>
                        <select id="scheduleTheme" value=${J.theme_id} onChange=${p=>me(_=>({..._,theme_id:p.target.value}))} required>
                          ${t.map(p=>y`<option key=${p.id} value=${p.id}>${p.theme_name}</option>`)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleType">Schedule Type</label>
                        <select id="scheduleType" value=${J.schedule_type} onChange=${p=>me(_=>({..._,schedule_type:p.target.value}))}>
                          <option value="single_day">single_day</option>
                          <option value="date_range">date_range</option>
                          <option value="weekly_recurring">weekly_recurring</option>
                          <option value="monthly_recurring">monthly_recurring</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleStart">Start Date</label>
                        <input id="scheduleStart" type="date" value=${J.start_date} onInput=${p=>me(_=>({..._,start_date:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleEnd">End Date</label>
                        <input id="scheduleEnd" type="date" value=${J.end_date} onInput=${p=>me(_=>({..._,end_date:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="weekdayMask">Weekday Mask</label>
                        <input id="weekdayMask" value=${J.weekday_mask} onInput=${p=>me(_=>({..._,weekday_mask:p.target.value}))} placeholder="monday, thursday" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="monthMask">Month Mask</label>
                        <input id="monthMask" value=${J.month_mask} onInput=${p=>me(_=>({..._,month_mask:p.target.value}))} placeholder="2, 3, 8" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleRegion">Region</label>
                        <input id="scheduleRegion" value=${J.region} onInput=${p=>me(_=>({..._,region:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleCountry">Country</label>
                        <input id="scheduleCountry" value=${J.country} onInput=${p=>me(_=>({..._,country:p.target.value}))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="schedulePriority">Priority</label>
                        <input id="schedulePriority" type="number" value=${J.priority} onInput=${p=>me(_=>({..._,priority:p.target.value}))} />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="scheduleNotes">Notes</label>
                        <textarea id="scheduleNotes" rows="4" value=${J.notes} onInput=${p=>me(_=>({..._,notes:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${J.is_active} onChange=${p=>me(_=>({..._,is_active:p.target.checked}))} />
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

        ${x?y`
              <div className="modal-backdrop" onClick=${()=>P(!1)}>
                <section className="modal" onClick=${p=>p.stopPropagation()}>
                  <h2 className="section-title">Add Override</h2>
                  <form onSubmit=${ur}>
                    <div className="form-grid">
                      <div className="form-field full">
                        <label htmlFor="overrideTheme">Theme</label>
                        <select id="overrideTheme" value=${ie.theme_id} onChange=${p=>C(_=>({..._,theme_id:p.target.value}))} required>
                          ${t.map(p=>y`<option key=${p.id} value=${p.id}>${p.theme_name}</option>`)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideScope">Scope</label>
                        <input id="overrideScope" value=${ie.override_scope} onInput=${p=>C(_=>({..._,override_scope:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideBy">Created By</label>
                        <input id="overrideBy" value=${ie.created_by} onInput=${p=>C(_=>({..._,created_by:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideStart">Start At</label>
                        <input id="overrideStart" type="datetime-local" value=${ie.start_at} onInput=${p=>C(_=>({..._,start_at:p.target.value}))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideEnd">End At</label>
                        <input id="overrideEnd" type="datetime-local" value=${ie.end_at} onInput=${p=>C(_=>({..._,end_at:p.target.value}))} required />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="overrideReason">Reason</label>
                        <textarea id="overrideReason" rows="4" value=${ie.reason} onInput=${p=>C(_=>({..._,reason:p.target.value}))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${ie.force_top_priority} onChange=${p=>C(_=>({..._,force_top_priority:p.target.checked}))} />
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
    `}function Yf(){let e=jt(),{jobId:t}=Ho(),[n,r]=(0,R.useState)([]),[a,o]=(0,R.useState)(null),[l,i]=(0,R.useState)([]),[s,c]=(0,R.useState)([]),[m,h]=(0,R.useState)(null),[v,E]=(0,R.useState)(!1),[S,w]=(0,R.useState)(""),[N,d]=(0,R.useState)(""),[u,f]=(0,R.useState)(""),[g,x]=(0,R.useState)("text"),P=(0,R.useCallback)(async($={})=>{let U=!!$.quiet;U||E(!0),w("");try{let z=await I("/api/jobs?limit=50"),ne=Array.isArray(z)?z:[];if(r(ne),!t){o(null),i([]),c([]),h(null);return}let[fe,Fe,ye,ge]=await Promise.all([I(`/api/jobs/${t}`),I(`/api/jobs/${t}/assets`),I(`/api/jobs/${t}/candidates`),Jv(t)]);o(fe||null),i(Array.isArray(Fe)?Fe:[]),c(Array.isArray(ye)?ye:[]),h(ge||null)}catch(z){w(z.message||"Unable to load Studio")}finally{U||E(!1)}},[t]);(0,R.useEffect)(()=>{P()},[P]),(0,R.useEffect)(()=>{if(!t)return;let $=window.setInterval(()=>{document.visibilityState==="visible"&&P({quiet:!0})},1e4);return()=>window.clearInterval($)},[t,P]);let L=(0,R.useMemo)(()=>xs(a||{}),[a]),T=(0,R.useMemo)(()=>Xv(a||{},s),[a,s]),M=(0,R.useMemo)(()=>tp(m),[m]),j=(0,R.useMemo)(()=>qv(m),[m]),W=(0,R.useMemo)(()=>Gv(a||{},l),[a,l]),ke=da(W);async function O($,U,z,ne){f($),w("");try{await U(),z&&d(z),await P(),typeof ne=="function"&&ne()}catch(fe){w(fe.message||"Studio action failed")}finally{f("")}}async function de(){if(!(!t||!window.confirm(`Delete ${t} and associated files?`))){f("delete"),w("");try{await I(`/api/jobs/${t}`,{method:"DELETE"}),e("/studio")}catch(U){w(U.message||"Unable to delete job")}finally{f("")}}}function J($){if(!$){e("/studio");return}e(`/studio/${$}`)}function me(){return a?y`
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
                onClick=${()=>O("regenerate-text",()=>I(`/api/jobs/${t}/regenerate-content`,{method:"POST"}),`Regenerated text for ${t}`)}
                disabled=${u==="regenerate-text"}
              >
                ${u==="regenerate-text"?"Working...":"Regenerate Text"}
              </button>
              <button
                type="button"
                className="button primary"
                onClick=${()=>O("more-text",()=>I(`/api/jobs/${t}/generate-more-text`,{method:"POST"}),`Generated 10 more text options for ${t}`)}
                disabled=${u==="more-text"}
              >
                ${u==="more-text"?"Working...":"Generate 10 More"}
              </button>
            </div>
          </div>
          ${s.length===0?y`<p className="empty-state">No text options stored for this job yet.</p>`:y`
                <div className="studio-option-grid">
                  ${s.map($=>{let U=Number(T?.id||0)===Number($.id||0);return y`
                      <article key=${$.id||`${$.model}_${$.text}`} className=${`studio-option-card ${U?"selected":""}`}>
                        <div className="studio-option-head">
                          <${De} value=${U?"selected":"option"} />
                          <span className="score-chip">
                            score ${Number($.judged_score??$.judge_score??0).toFixed(3)}
                          </span>
                        </div>
                        <p className="studio-option-text">${$.text||$.content_text}</p>
                        <div className="studio-meta-row">
                          <span className="mini-pill">${$s(a?.output_spec?.format)}</span>
                          <span className="mini-pill">${$.model}</span>
                        </div>
                        <div className="inline-actions">
                          <button
                            type="button"
                            className=${U?"button":"button primary"}
                            onClick=${()=>O(`select-text:${$.id}`,()=>I(`/api/jobs/${t}/select-text`,{method:"POST",body:JSON.stringify({candidate_id:$.id})}),`Selected text option ${$.id} for ${t}`,()=>x("image"))}
                            disabled=${u===`select-text:${$.id}`||U}
                          >
                            ${u===`select-text:${$.id}`?"Working...":U?"Using This Text":"Use This Text"}
                          </button>
                        </div>
                      </article>
                    `})}
                </div>
              `}
        </section>
      `:null}function ie(){return a?y`
        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Image Options</h2>
              <p className="section-copy">Generate ImageForge candidates, compare them, and choose one asset for final eCard composition.</p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button"
                onClick=${()=>O("generate-image-assets",()=>I(`/api/jobs/${t}/image-assets/generate`,{method:"POST"}),`Generated image assets for ${t}`)}
                disabled=${u==="generate-image-assets"||!a.content_preview}
              >
                ${u==="generate-image-assets"?"Working...":"Generate Assets"}
              </button>
              <button
                type="button"
                className="button primary"
                onClick=${()=>O("regenerate-image-assets",()=>I(`/api/jobs/${t}/image-assets/regenerate`,{method:"POST"}),`Regenerated image assets for ${t}`)}
                disabled=${u==="regenerate-image-assets"||!a.content_preview}
              >
                ${u==="regenerate-image-assets"?"Working...":"Regenerate Assets"}
              </button>
            </div>
          </div>
          ${m?y`
                <div className="status-panel neutral studio-selected-copy">
                  Image status: ${Te(m.image_generation_status||"not_requested")}
                  ${m.image_generation_stage?` | Stage: ${Te(m.image_generation_stage)}`:""}
                </div>
              `:null}
          ${T?y`
                <div className="status-panel neutral studio-selected-copy">
                  Selected text: ${T.text||T.content_text}
                </div>
              `:null}
          ${M.length===0?y`<p className="empty-state">No image candidates yet. Use Generate Assets to create ImageForge options.</p>`:y`
                <div className="studio-image-grid">
                  ${M.map($=>{let U=j&&j.candidate_id===$.candidate_id;return y`
                      <article key=${$.key} className=${`studio-image-card ${U?"selected":""}`}>
                        <a href=${$.url} target="_blank" rel="noreferrer">
                          <img src=${$.url} alt=${$.provider} loading="lazy" />
                        </a>
                        <div className="studio-image-body">
                          <div className="studio-meta-row">
                            <span className="mini-pill">${Te($.provider)}</span>
                            <span className="mini-pill">${$.model||"Default Model"}</span>
                          </div>
                          <div className="studio-meta-row">
                            ${Qf($.width,$.height)?y`<span className="mini-pill">${Qf($.width,$.height)}</span>`:null}
                            <span className="mini-pill">${Ue($.created_at)}</span>
                            <span className="mini-pill">${U?"Selected":`Candidate ${$.candidate_index}`}</span>
                          </div>
                          <div className="inline-actions">
                            <button
                              type="button"
                              className=${U?"button":"button primary"}
                              onClick=${()=>O(`select-image-asset:${$.candidate_id}`,()=>I(`/api/jobs/${t}/image-assets/${$.candidate_id}/select`,{method:"POST"}),`Selected image asset for ${t}`,()=>x("final"))}
                              disabled=${u===`select-image-asset:${$.candidate_id}`||U}
                            >
                              ${u===`select-image-asset:${$.candidate_id}`?"Working...":U?"Using This Image":"Use This Image"}
                            </button>
                          </div>
                        </div>
                      </article>
                    `})}
                </div>
              `}
        </section>
      `:null}function C(){if(!a)return null;let $=!!L.is_favorite,U=W.length>0?"Regenerate Card":"Render Card",z=W.length>0?`/api/jobs/${t}/rerun/final-render`:`/api/jobs/${t}/render-final`;return y`
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
                onClick=${()=>O("favorite",()=>I(`/api/jobs/${t}/favorite`,{method:"POST",body:JSON.stringify({favorite:!$})}),$?`Removed ${t} from favorites`:`Marked ${t} as favorite`)}
                disabled=${u==="favorite"}
              >
                ${u==="favorite"?"Working...":$?"Unfavorite":"Mark Favorite"}
              </button>
              <button
                type="button"
                className="button primary"
                onClick=${()=>O("rerun-card",()=>I(z,{method:"POST"}),`${U} completed for ${t}`)}
                disabled=${u==="rerun-card"||!a.image_preview_url}
              >
                ${u==="rerun-card"?"Working...":U}
              </button>
            </div>
          </div>
          ${W.length===0?y`<p className="empty-state">No final cards rendered yet. Pick an image option and render the card.</p>`:y`
                <div className="studio-final-grid">
                  ${W.map(ne=>y`
                    <article key=${ne.key} className="studio-final-card">
                      <a href=${ne.url} target="_blank" rel="noreferrer">
                        <img src=${ne.url} alt=${ne.label} loading="lazy" />
                      </a>
                      <div className="studio-image-body">
                        <div className="studio-meta-row">
                          <span className="mini-pill">${ne.label}</span>
                          <span className="mini-pill">${$?"Favorite":Te(Zv(a))}</span>
                        </div>
                        <div className="ecard-actions">
                          <a href=${ne.url} target="_blank" rel="noreferrer" className="button-link">Open</a>
                          <button
                            type="button"
                            className="button"
                            onClick=${()=>O("favorite",()=>I(`/api/jobs/${t}/favorite`,{method:"POST",body:JSON.stringify({favorite:!$})}),$?`Removed ${t} from favorites`:`Marked ${t} as favorite`)}
                            disabled=${u==="favorite"}
                          >
                            ${$?"Unfavorite":"Mark Favorite"}
                          </button>
                          <button
                            type="button"
                            className="button"
                            onClick=${()=>O("archive",()=>I(`/api/jobs/${t}/archive`,{method:"POST"}),`Archived ${t}`)}
                            disabled=${u==="archive"||a.status==="archived"}
                          >
                            ${u==="archive"?"Archiving...":"Archive"}
                          </button>
                          <button
                            type="button"
                            className="button danger"
                            onClick=${de}
                            disabled=${u==="delete"}
                          >
                            ${u==="delete"?"Deleting...":"Delete"}
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
                    <select value=${t||""} onChange=${$=>J($.target.value)}>
                      <option value="">Choose job</option>
                      ${n.map($=>y`
                        <option key=${$.job_id} value=${$.job_id}>${$.theme_name} | ${$.job_id}</option>
                      `)}
                    </select>
                  </label>
                `:null}
            <button type="button" className="button" onClick=${P} disabled=${v}>Refresh</button>
            ${t?y`<${Xe} to=${`/jobs/${t}`} className="button-link">Job Detail<//>`:null}
          </div>
        </header>

        ${S?y`<div className="status-panel error">${S}</div>`:null}
        ${N?y`<p className="status-line">${N}</p>`:null}
        ${v?y`<div className="status-panel warning">Loading Studio data...</div>`:null}

        ${t?a?y`
                <section className="section-panel">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">${a.theme_name}</h2>
                      <p className="section-copy">${a.job_id} | ${a.cards_per_theme||10} cards | ${$s(a?.output_spec?.format)}</p>
                    </div>
                    <${De} value=${a.status} />
                  </div>
                  <div className="studio-current-grid">
                    <article className="key-card">
                      <p className="key-label">Selected Text</p>
                      <p className="studio-current-copy">${T?.text||T?.content_text||a.content_preview||"No text selected yet."}</p>
                    </article>
                    <article className="key-card">
                      <p className="key-label">Selected Image</p>
                      ${j?y`<img className="studio-current-image" src=${j.url} alt="Selected image" loading="lazy" />`:y`<p className="empty-state compact">No image selected yet.</p>`}
                    </article>
                    <article className="key-card">
                      <p className="key-label">Final Card</p>
                      ${ke.currentCandidate?y`<img className="studio-current-image" src=${ke.currentCandidate.url} alt="Final card" loading="lazy" onError=${ke.handleError} />`:y`<p className="empty-state compact">No final card rendered yet.</p>`}
                    </article>
                  </div>
                </section>

                <div className="studio-tabbar" role="tablist" aria-label="Studio tabs">
                  ${[["text","Text Options"],["image","Image Options"],["final","Final Cards"]].map(([$,U])=>y`
                    <button
                      key=${$}
                      type="button"
                      className=${g===$?"studio-tab active":"studio-tab"}
                      onClick=${()=>x($)}
                    >
                      ${U}
                    </button>
                  `)}
                </div>

                ${g==="text"?me():null}
                ${g==="image"?ie():null}
                ${g==="final"?C():null}
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
                            ${n.map($=>y`
                              <tr key=${$.job_id}>
                                <td>${$.job_id}</td>
                                <td>${$.theme_name}</td>
                                <td><${De} value=${$.status} /></td>
                                <td>${Ue($.updated_at)}</td>
                                <td><${Xe} className="job-link" to=${`/studio/${$.job_id}`}>Open Studio<//></td>
                              </tr>
                            `)}
                          </tbody>
                        </table>
                      </div>
                    `}
              </section>
            `}
      </section>
    `}function ry(){let[e,t]=(0,R.useState)([]),[n,r]=(0,R.useState)(!1),[a,o]=(0,R.useState)(""),l=(0,R.useCallback)(async()=>{r(!0),o("");try{let i=await I("/api/jobs?limit=100");t(Array.isArray(i)?i:[])}catch(i){o(i.message||"Unable to load jobs")}finally{r(!1)}},[]);return(0,R.useEffect)(()=>{l()},[l]),y`
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
                          <td>${Te(i.current_stage)}</td>
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
    `}function np(){return y`
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
              <span className="nav-icon"><${Uv} name=${t.icon} /></span>
              <span className="sr-only">${t.label}</span>
            <//>
          `)}
        </nav>
      </aside>
    `}function ay(){return y`
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
    `}function oy(){return y`
      <div className="console-layout">
        <${np} />

        <main className="console-main">
          <${Es}>
            <${yt} path="/" element=${y`<${ey} />`} />
            <${yt} path="/themes" element=${y`<${ny} />`} />
            <${yt} path="/studio" element=${y`<${Yf} />`} />
            <${yt} path="/studio/:jobId" element=${y`<${Yf} />`} />
            <${yt} path="/compare" element=${y`<${ay} />`} />
            <${yt} path="/jobs" element=${y`<${ry} />`} />
            <${yt} path="/jobs/:jobId" element=${y`<${ty} />`} />
            <${yt} path="*" element=${y`<${Ns} to="/" replace=${!0} />`} />
          <//>
        </main>
      </div>
    `}var Cs=class extends R.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}componentDidCatch(t){ca(`Frontend render error: ${t?.message||"unknown error"}. See browser console for details.`,t)}render(){return this.state.error?y`
        <div className="console-layout">
          <${np} />
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
      `:this.props.children}};function ly(){return(0,R.useEffect)(()=>{Av()},[]),null}function iy(){return y`
      <${Af}>
        <${Cs}>
          <${ly} />
          <${oy} />
        <//>
      <//>
    `}window.addEventListener("error",e=>{e.error&&ca(`Frontend runtime error: ${e.error.message||"unknown error"}.`,e.error)});window.addEventListener("unhandledrejection",e=>{ca(`Unhandled async error: ${e.reason?.message||String(e.reason||"unknown")}`,e.reason)});var Gf=document.getElementById("root");if(!Gf)ca("Frontend root element (#root) is missing in index.html.");else try{(0,Xf.createRoot)(Gf).render(y`<${iy} />`)}catch(e){ca(`Unable to mount React root: ${e?.message||"unknown mount error"}`,e)}})();
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
