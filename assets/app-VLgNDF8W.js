function Co(n,s){const a=Object.create(null),e=n.split(",");for(let t=0;t<e.length;t++)a[e[t]]=!0;return s?t=>!!a[t.toLowerCase()]:t=>!!a[t]}const Sn={},Ba=[],Ss=()=>{},Lu=()=>!1,Ou=/^on[^a-z]/,ge=n=>Ou.test(n),xo=n=>n.startsWith("onUpdate:"),Vn=Object.assign,Lo=(n,s)=>{const a=n.indexOf(s);a>-1&&n.splice(a,1)},Iu=Object.prototype.hasOwnProperty,fn=(n,s)=>Iu.call(n,s),nn=Array.isArray,Da=n=>vt(n)==="[object Map]",pl=n=>vt(n)==="[object Set]",tn=n=>typeof n=="function",rn=n=>typeof n=="string",dt=n=>typeof n=="symbol",wn=n=>n!==null&&typeof n=="object",cl=n=>(wn(n)||tn(n))&&tn(n.then)&&tn(n.catch),ll=Object.prototype.toString,vt=n=>ll.call(n),Pu=n=>vt(n).slice(8,-1),il=n=>vt(n)==="[object Object]",Oo=n=>rn(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,te=Co(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),kt=n=>{const s=Object.create(null);return a=>s[a]||(s[a]=n(a))},Vu=/-(\w)/g,rs=kt(n=>n.replace(Vu,(s,a)=>a?a.toUpperCase():"")),Fu=/\B([A-Z])/g,va=kt(n=>n.replace(Fu,"-$1").toLowerCase()),Ee=kt(n=>n.charAt(0).toUpperCase()+n.slice(1)),Ot=kt(n=>n?`on${Ee(n)}`:""),ua=(n,s)=>!Object.is(n,s),Xe=(n,s)=>{for(let a=0;a<n.length;a++)n[a](s)},Qe=(n,s,a)=>{Object.defineProperty(n,s,{configurable:!0,enumerable:!1,value:a})},eo=n=>{const s=parseFloat(n);return isNaN(s)?n:s},Mu=n=>{const s=rn(n)?Number(n):NaN;return isNaN(s)?n:s};let Pp;const to=()=>Pp||(Pp=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Io(n){if(nn(n)){const s={};for(let a=0;a<n.length;a++){const e=n[a],t=rn(e)?$u(e):Io(e);if(t)for(const o in t)s[o]=t[o]}return s}else if(rn(n)||wn(n))return n}const ju=/;(?![^(]*\))/g,Nu=/:([^]+)/,Hu=/\/\*[^]*?\*\//g;function $u(n){const s={};return n.replace(Hu,"").split(ju).forEach(a=>{if(a){const e=a.split(Nu);e.length>1&&(s[e[0].trim()]=e[1].trim())}}),s}function Po(n){let s="";if(rn(n))s=n;else if(nn(n))for(let a=0;a<n.length;a++){const e=Po(n[a]);e&&(s+=e+" ")}else if(wn(n))for(const a in n)n[a]&&(s+=a+" ");return s.trim()}const Ju="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Wu=Co(Ju);function rl(n){return!!n||n===""}const Mb=n=>rn(n)?n:n==null?"":nn(n)||wn(n)&&(n.toString===ll||!tn(n.toString))?JSON.stringify(n,ul,2):String(n),ul=(n,s)=>s&&s.__v_isRef?ul(n,s.value):Da(s)?{[`Map(${s.size})`]:[...s.entries()].reduce((a,[e,t])=>(a[`${e} =>`]=t,a),{})}:pl(s)?{[`Set(${s.size})`]:[...s.values()]}:wn(s)&&!nn(s)&&!il(s)?String(s):s;let ns;class zu{constructor(s=!1){this.detached=s,this._active=!0,this.effects=[],this.cleanups=[],this.parent=ns,!s&&ns&&(this.index=(ns.scopes||(ns.scopes=[])).push(this)-1)}get active(){return this._active}run(s){if(this._active){const a=ns;try{return ns=this,s()}finally{ns=a}}}on(){ns=this}off(){ns=this.parent}stop(s){if(this._active){let a,e;for(a=0,e=this.effects.length;a<e;a++)this.effects[a].stop();for(a=0,e=this.cleanups.length;a<e;a++)this.cleanups[a]();if(this.scopes)for(a=0,e=this.scopes.length;a<e;a++)this.scopes[a].stop(!0);if(!this.detached&&this.parent&&!s){const t=this.parent.scopes.pop();t&&t!==this&&(this.parent.scopes[this.index]=t,t.index=this.index)}this.parent=void 0,this._active=!1}}}function Gu(n,s=ns){s&&s.active&&s.effects.push(n)}function dl(){return ns}function Uu(n){ns&&ns.cleanups.push(n)}const Vo=n=>{const s=new Set(n);return s.w=0,s.n=0,s},vl=n=>(n.w&Ks)>0,kl=n=>(n.n&Ks)>0,qu=({deps:n})=>{if(n.length)for(let s=0;s<n.length;s++)n[s].w|=Ks},Ku=n=>{const{deps:s}=n;if(s.length){let a=0;for(let e=0;e<s.length;e++){const t=s[e];vl(t)&&!kl(t)?t.delete(n):s[a++]=t,t.w&=~Ks,t.n&=~Ks}s.length=a}},nt=new WeakMap;let ae=0,Ks=1;const oo=30;let ms;const la=Symbol(""),po=Symbol("");class Fo{constructor(s,a=null,e){this.fn=s,this.scheduler=a,this.active=!0,this.deps=[],this.parent=void 0,Gu(this,e)}run(){if(!this.active)return this.fn();let s=ms,a=Us;for(;s;){if(s===this)return;s=s.parent}try{return this.parent=ms,ms=this,Us=!0,Ks=1<<++ae,ae<=oo?qu(this):Vp(this),this.fn()}finally{ae<=oo&&Ku(this),Ks=1<<--ae,ms=this.parent,Us=a,this.parent=void 0,this.deferStop&&this.stop()}}stop(){ms===this?this.deferStop=!0:this.active&&(Vp(this),this.onStop&&this.onStop(),this.active=!1)}}function Vp(n){const{deps:s}=n;if(s.length){for(let a=0;a<s.length;a++)s[a].delete(n);s.length=0}}let Us=!0;const ml=[];function za(){ml.push(Us),Us=!1}function Ga(){const n=ml.pop();Us=n===void 0?!0:n}function Yn(n,s,a){if(Us&&ms){let e=nt.get(n);e||nt.set(n,e=new Map);let t=e.get(a);t||e.set(a,t=Vo()),fl(t)}}function fl(n,s){let a=!1;ae<=oo?kl(n)||(n.n|=Ks,a=!vl(n)):a=!n.has(ms),a&&(n.add(ms),ms.deps.push(n))}function Ps(n,s,a,e,t,o){const p=nt.get(n);if(!p)return;let l=[];if(s==="clear")l=[...p.values()];else if(a==="length"&&nn(n)){const r=Number(e);p.forEach((i,d)=>{(d==="length"||!dt(d)&&d>=r)&&l.push(i)})}else switch(a!==void 0&&l.push(p.get(a)),s){case"add":nn(n)?Oo(a)&&l.push(p.get("length")):(l.push(p.get(la)),Da(n)&&l.push(p.get(po)));break;case"delete":nn(n)||(l.push(p.get(la)),Da(n)&&l.push(p.get(po)));break;case"set":Da(n)&&l.push(p.get(la));break}if(l.length===1)l[0]&&co(l[0]);else{const r=[];for(const i of l)i&&r.push(...i);co(Vo(r))}}function co(n,s){const a=nn(n)?n:[...n];for(const e of a)e.computed&&Fp(e);for(const e of a)e.computed||Fp(e)}function Fp(n,s){(n!==ms||n.allowRecurse)&&(n.scheduler?n.scheduler():n.run())}function Xu(n,s){var a;return(a=nt.get(n))==null?void 0:a.get(s)}const Yu=Co("__proto__,__v_isRef,__isVue"),hl=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(dt)),Mp=Zu();function Zu(){const n={};return["includes","indexOf","lastIndexOf"].forEach(s=>{n[s]=function(...a){const e=un(this);for(let o=0,p=this.length;o<p;o++)Yn(e,"get",o+"");const t=e[s](...a);return t===-1||t===!1?e[s](...a.map(un)):t}}),["push","pop","shift","unshift","splice"].forEach(s=>{n[s]=function(...a){za();const e=un(this)[s].apply(this,a);return Ga(),e}}),n}function Qu(n){const s=un(this);return Yn(s,"has",n),s.hasOwnProperty(n)}class bl{constructor(s=!1,a=!1){this._isReadonly=s,this._shallow=a}get(s,a,e){const t=this._isReadonly,o=this._shallow;if(a==="__v_isReactive")return!t;if(a==="__v_isReadonly")return t;if(a==="__v_isShallow")return o;if(a==="__v_raw"&&e===(t?o?dd:_l:o?yl:El).get(s))return s;const p=nn(s);if(!t){if(p&&fn(Mp,a))return Reflect.get(Mp,a,e);if(a==="hasOwnProperty")return Qu}const l=Reflect.get(s,a,e);return(dt(a)?hl.has(a):Yu(a))||(t||Yn(s,"get",a),o)?l:Mn(l)?p&&Oo(a)?l:l.value:wn(l)?t?ka(l):ye(l):l}}class gl extends bl{constructor(s=!1){super(!1,s)}set(s,a,e,t){let o=s[a];if(Va(o)&&Mn(o)&&!Mn(e))return!1;if(!this._shallow&&(!st(e)&&!Va(e)&&(o=un(o),e=un(e)),!nn(s)&&Mn(o)&&!Mn(e)))return o.value=e,!0;const p=nn(s)&&Oo(a)?Number(a)<s.length:fn(s,a),l=Reflect.set(s,a,e,t);return s===un(t)&&(p?ua(e,o)&&Ps(s,"set",a,e):Ps(s,"add",a,e)),l}deleteProperty(s,a){const e=fn(s,a);s[a];const t=Reflect.deleteProperty(s,a);return t&&e&&Ps(s,"delete",a,void 0),t}has(s,a){const e=Reflect.has(s,a);return(!dt(a)||!hl.has(a))&&Yn(s,"has",a),e}ownKeys(s){return Yn(s,"iterate",nn(s)?"length":la),Reflect.ownKeys(s)}}class nd extends bl{constructor(s=!1){super(!0,s)}set(s,a){return!0}deleteProperty(s,a){return!0}}const sd=new gl,ad=new nd,ed=new gl(!0),Mo=n=>n,mt=n=>Reflect.getPrototypeOf(n);function Pe(n,s,a=!1,e=!1){n=n.__v_raw;const t=un(n),o=un(s);a||(ua(s,o)&&Yn(t,"get",s),Yn(t,"get",o));const{has:p}=mt(t),l=e?Mo:a?Ho:ue;if(p.call(t,s))return l(n.get(s));if(p.call(t,o))return l(n.get(o));n!==t&&n.get(s)}function Ve(n,s=!1){const a=this.__v_raw,e=un(a),t=un(n);return s||(ua(n,t)&&Yn(e,"has",n),Yn(e,"has",t)),n===t?a.has(n):a.has(n)||a.has(t)}function Fe(n,s=!1){return n=n.__v_raw,!s&&Yn(un(n),"iterate",la),Reflect.get(n,"size",n)}function jp(n){n=un(n);const s=un(this);return mt(s).has.call(s,n)||(s.add(n),Ps(s,"add",n,n)),this}function Np(n,s){s=un(s);const a=un(this),{has:e,get:t}=mt(a);let o=e.call(a,n);o||(n=un(n),o=e.call(a,n));const p=t.call(a,n);return a.set(n,s),o?ua(s,p)&&Ps(a,"set",n,s):Ps(a,"add",n,s),this}function Hp(n){const s=un(this),{has:a,get:e}=mt(s);let t=a.call(s,n);t||(n=un(n),t=a.call(s,n)),e&&e.call(s,n);const o=s.delete(n);return t&&Ps(s,"delete",n,void 0),o}function $p(){const n=un(this),s=n.size!==0,a=n.clear();return s&&Ps(n,"clear",void 0,void 0),a}function Me(n,s){return function(e,t){const o=this,p=o.__v_raw,l=un(p),r=s?Mo:n?Ho:ue;return!n&&Yn(l,"iterate",la),p.forEach((i,d)=>e.call(t,r(i),r(d),o))}}function je(n,s,a){return function(...e){const t=this.__v_raw,o=un(t),p=Da(o),l=n==="entries"||n===Symbol.iterator&&p,r=n==="keys"&&p,i=t[n](...e),d=a?Mo:s?Ho:ue;return!s&&Yn(o,"iterate",r?po:la),{next(){const{value:v,done:k}=i.next();return k?{value:v,done:k}:{value:l?[d(v[0]),d(v[1])]:d(v),done:k}},[Symbol.iterator](){return this}}}}function js(n){return function(...s){return n==="delete"?!1:n==="clear"?void 0:this}}function td(){const n={get(o){return Pe(this,o)},get size(){return Fe(this)},has:Ve,add:jp,set:Np,delete:Hp,clear:$p,forEach:Me(!1,!1)},s={get(o){return Pe(this,o,!1,!0)},get size(){return Fe(this)},has:Ve,add:jp,set:Np,delete:Hp,clear:$p,forEach:Me(!1,!0)},a={get(o){return Pe(this,o,!0)},get size(){return Fe(this,!0)},has(o){return Ve.call(this,o,!0)},add:js("add"),set:js("set"),delete:js("delete"),clear:js("clear"),forEach:Me(!0,!1)},e={get(o){return Pe(this,o,!0,!0)},get size(){return Fe(this,!0)},has(o){return Ve.call(this,o,!0)},add:js("add"),set:js("set"),delete:js("delete"),clear:js("clear"),forEach:Me(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(o=>{n[o]=je(o,!1,!1),a[o]=je(o,!0,!1),s[o]=je(o,!1,!0),e[o]=je(o,!0,!0)}),[n,a,s,e]}const[od,pd,cd,ld]=td();function jo(n,s){const a=s?n?ld:cd:n?pd:od;return(e,t,o)=>t==="__v_isReactive"?!n:t==="__v_isReadonly"?n:t==="__v_raw"?e:Reflect.get(fn(a,t)&&t in e?a:e,t,o)}const id={get:jo(!1,!1)},rd={get:jo(!1,!0)},ud={get:jo(!0,!1)},El=new WeakMap,yl=new WeakMap,_l=new WeakMap,dd=new WeakMap;function vd(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function kd(n){return n.__v_skip||!Object.isExtensible(n)?0:vd(Pu(n))}function ye(n){return Va(n)?n:No(n,!1,sd,id,El)}function Al(n){return No(n,!1,ed,rd,yl)}function ka(n){return No(n,!0,ad,ud,_l)}function No(n,s,a,e,t){if(!wn(n)||n.__v_raw&&!(s&&n.__v_isReactive))return n;const o=t.get(n);if(o)return o;const p=kd(n);if(p===0)return n;const l=new Proxy(n,p===2?e:a);return t.set(n,l),l}function Ta(n){return Va(n)?Ta(n.__v_raw):!!(n&&n.__v_isReactive)}function Va(n){return!!(n&&n.__v_isReadonly)}function st(n){return!!(n&&n.__v_isShallow)}function wl(n){return Ta(n)||Va(n)}function un(n){const s=n&&n.__v_raw;return s?un(s):n}function Sl(n){return Qe(n,"__v_skip",!0),n}const ue=n=>wn(n)?ye(n):n,Ho=n=>wn(n)?ka(n):n;function $o(n){Us&&ms&&(n=un(n),fl(n.dep||(n.dep=Vo())))}function Jo(n,s){n=un(n);const a=n.dep;a&&co(a)}function Mn(n){return!!(n&&n.__v_isRef===!0)}function U(n){return Rl(n,!1)}function Ln(n){return Rl(n,!0)}function Rl(n,s){return Mn(n)?n:new md(n,s)}class md{constructor(s,a){this.__v_isShallow=a,this.dep=void 0,this.__v_isRef=!0,this._rawValue=a?s:un(s),this._value=a?s:ue(s)}get value(){return $o(this),this._value}set value(s){const a=this.__v_isShallow||st(s)||Va(s);s=a?s:un(s),ua(s,this._rawValue)&&(this._rawValue=s,this._value=a?s:ue(s),Jo(this))}}function ia(n){return Mn(n)?n.value:n}const fd={get:(n,s,a)=>ia(Reflect.get(n,s,a)),set:(n,s,a,e)=>{const t=n[s];return Mn(t)&&!Mn(a)?(t.value=a,!0):Reflect.set(n,s,a,e)}};function Bl(n){return Ta(n)?n:new Proxy(n,fd)}class hd{constructor(s){this.dep=void 0,this.__v_isRef=!0;const{get:a,set:e}=s(()=>$o(this),()=>Jo(this));this._get=a,this._set=e}get value(){return this._get()}set value(s){this._set(s)}}function Dl(n){return new hd(n)}class bd{constructor(s,a,e){this._object=s,this._key=a,this._defaultValue=e,this.__v_isRef=!0}get value(){const s=this._object[this._key];return s===void 0?this._defaultValue:s}set value(s){this._object[this._key]=s}get dep(){return Xu(un(this._object),this._key)}}class gd{constructor(s){this._getter=s,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function Ua(n,s,a){return Mn(n)?n:tn(n)?new gd(n):wn(n)&&arguments.length>1?Ed(n,s,a):U(n)}function Ed(n,s,a){const e=n[s];return Mn(e)?e:new bd(n,s,a)}class yd{constructor(s,a,e,t){this._setter=a,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this._dirty=!0,this.effect=new Fo(s,()=>{this._dirty||(this._dirty=!0,Jo(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!t,this.__v_isReadonly=e}get value(){const s=un(this);return $o(s),(s._dirty||!s._cacheable)&&(s._dirty=!1,s._value=s.effect.run()),s._value}set value(s){this._setter(s)}}function _d(n,s,a=!1){let e,t;const o=tn(n);return o?(e=n,t=Ss):(e=n.get,t=n.set),new yd(e,t,o||!t,a)}function qs(n,s,a,e){let t;try{t=e?n(...e):n()}catch(o){_e(o,s,a)}return t}function ls(n,s,a,e){if(tn(n)){const o=qs(n,s,a,e);return o&&cl(o)&&o.catch(p=>{_e(p,s,a)}),o}const t=[];for(let o=0;o<n.length;o++)t.push(ls(n[o],s,a,e));return t}function _e(n,s,a,e=!0){const t=s?s.vnode:null;if(s){let o=s.parent;const p=s.proxy,l=a;for(;o;){const i=o.ec;if(i){for(let d=0;d<i.length;d++)if(i[d](n,p,l)===!1)return}o=o.parent}const r=s.appContext.config.errorHandler;if(r){qs(r,null,10,[n,p,l]);return}}Ad(n,a,t,e)}function Ad(n,s,a,e=!0){console.error(n)}let de=!1,lo=!1;const Jn=[];let ws=0;const Ca=[];let Is=null,ea=0;const Tl=Promise.resolve();let Wo=null;function ma(n){const s=Wo||Tl;return n?s.then(this?n.bind(this):n):s}function wd(n){let s=ws+1,a=Jn.length;for(;s<a;){const e=s+a>>>1,t=Jn[e],o=ve(t);o<n||o===n&&t.pre?s=e+1:a=e}return s}function ft(n){(!Jn.length||!Jn.includes(n,de&&n.allowRecurse?ws+1:ws))&&(n.id==null?Jn.push(n):Jn.splice(wd(n.id),0,n),Cl())}function Cl(){!de&&!lo&&(lo=!0,Wo=Tl.then(xl))}function Sd(n){const s=Jn.indexOf(n);s>ws&&Jn.splice(s,1)}function Rd(n){nn(n)?Ca.push(...n):(!Is||!Is.includes(n,n.allowRecurse?ea+1:ea))&&Ca.push(n),Cl()}function Jp(n,s=de?ws+1:0){for(;s<Jn.length;s++){const a=Jn[s];a&&a.pre&&(Jn.splice(s,1),s--,a())}}function at(n){if(Ca.length){const s=[...new Set(Ca)];if(Ca.length=0,Is){Is.push(...s);return}for(Is=s,Is.sort((a,e)=>ve(a)-ve(e)),ea=0;ea<Is.length;ea++)Is[ea]();Is=null,ea=0}}const ve=n=>n.id==null?1/0:n.id,Bd=(n,s)=>{const a=ve(n)-ve(s);if(a===0){if(n.pre&&!s.pre)return-1;if(s.pre&&!n.pre)return 1}return a};function xl(n){lo=!1,de=!0,Jn.sort(Bd);try{for(ws=0;ws<Jn.length;ws++){const s=Jn[ws];s&&s.active!==!1&&qs(s,null,14)}}finally{ws=0,Jn.length=0,at(),de=!1,Wo=null,(Jn.length||Ca.length)&&xl()}}function Dd(n,s,...a){if(n.isUnmounted)return;const e=n.vnode.props||Sn;let t=a;const o=s.startsWith("update:"),p=o&&s.slice(7);if(p&&p in e){const d=`${p==="modelValue"?"model":p}Modifiers`,{number:v,trim:k}=e[d]||Sn;k&&(t=a.map(m=>rn(m)?m.trim():m)),v&&(t=a.map(eo))}let l,r=e[l=Ot(s)]||e[l=Ot(rs(s))];!r&&o&&(r=e[l=Ot(va(s))]),r&&ls(r,n,6,t);const i=e[l+"Once"];if(i){if(!n.emitted)n.emitted={};else if(n.emitted[l])return;n.emitted[l]=!0,ls(i,n,6,t)}}function Ll(n,s,a=!1){const e=s.emitsCache,t=e.get(n);if(t!==void 0)return t;const o=n.emits;let p={},l=!1;if(!tn(n)){const r=i=>{const d=Ll(i,s,!0);d&&(l=!0,Vn(p,d))};!a&&s.mixins.length&&s.mixins.forEach(r),n.extends&&r(n.extends),n.mixins&&n.mixins.forEach(r)}return!o&&!l?(wn(n)&&e.set(n,null),null):(nn(o)?o.forEach(r=>p[r]=null):Vn(p,o),wn(n)&&e.set(n,p),p)}function ht(n,s){return!n||!ge(s)?!1:(s=s.slice(2).replace(/Once$/,""),fn(n,s[0].toLowerCase()+s.slice(1))||fn(n,va(s))||fn(n,s))}let Nn=null,bt=null;function et(n){const s=Nn;return Nn=n,bt=n&&n.type.__scopeId||null,s}function jb(n){bt=n}function Nb(){bt=null}function Td(n,s=Nn,a){if(!s||n._n)return n;const e=(...t)=>{e._d&&sc(-1);const o=et(s);let p;try{p=n(...t)}finally{et(o),e._d&&sc(1)}return p};return e._n=!0,e._c=!0,e._d=!0,e}function It(n){const{type:s,vnode:a,proxy:e,withProxy:t,props:o,propsOptions:[p],slots:l,attrs:r,emit:i,render:d,renderCache:v,data:k,setupState:m,ctx:b,inheritAttrs:E}=n;let S,y;const B=et(n);try{if(a.shapeFlag&4){const R=t||e,I=R;S=ks(d.call(I,R,v,o,m,k,b)),y=r}else{const R=s;S=ks(R.length>1?R(o,{attrs:r,slots:l,emit:i}):R(o,null)),y=s.props?r:Cd(r)}}catch(R){ce.length=0,_e(R,n,1),S=xn(es)}let _=S;if(y&&E!==!1){const R=Object.keys(y),{shapeFlag:I}=_;R.length&&I&7&&(p&&R.some(xo)&&(y=xd(y,p)),_=Xs(_,y))}return a.dirs&&(_=Xs(_),_.dirs=_.dirs?_.dirs.concat(a.dirs):a.dirs),a.transition&&(_.transition=a.transition),S=_,et(B),S}const Cd=n=>{let s;for(const a in n)(a==="class"||a==="style"||ge(a))&&((s||(s={}))[a]=n[a]);return s},xd=(n,s)=>{const a={};for(const e in n)(!xo(e)||!(e.slice(9)in s))&&(a[e]=n[e]);return a};function Ld(n,s,a){const{props:e,children:t,component:o}=n,{props:p,children:l,patchFlag:r}=s,i=o.emitsOptions;if(s.dirs||s.transition)return!0;if(a&&r>=0){if(r&1024)return!0;if(r&16)return e?Wp(e,p,i):!!p;if(r&8){const d=s.dynamicProps;for(let v=0;v<d.length;v++){const k=d[v];if(p[k]!==e[k]&&!ht(i,k))return!0}}}else return(t||l)&&(!l||!l.$stable)?!0:e===p?!1:e?p?Wp(e,p,i):!0:!!p;return!1}function Wp(n,s,a){const e=Object.keys(s);if(e.length!==Object.keys(n).length)return!0;for(let t=0;t<e.length;t++){const o=e[t];if(s[o]!==n[o]&&!ht(a,o))return!0}return!1}function Od({vnode:n,parent:s},a){for(;s&&s.subTree===n;)(n=s.vnode).el=a,s=s.parent}const Ol="components";function as(n,s){return Pd(Ol,n,!0,s)||n}const Id=Symbol.for("v-ndc");function Pd(n,s,a=!0,e=!1){const t=Nn||Fn;if(t){const o=t.type;if(n===Ol){const l=wv(o,!1);if(l&&(l===s||l===rs(s)||l===Ee(rs(s))))return o}const p=zp(t[n]||o[n],s)||zp(t.appContext[n],s);return!p&&e?o:p}}function zp(n,s){return n&&(n[s]||n[rs(s)]||n[Ee(rs(s))])}const Vd=n=>n.__isSuspense;function Il(n,s){s&&s.pendingBranch?nn(n)?s.effects.push(...n):s.effects.push(n):Rd(n)}function Pl(n,s){return zo(n,null,s)}const Ne={};function cn(n,s,a){return zo(n,s,a)}function zo(n,s,{immediate:a,deep:e,flush:t,onTrack:o,onTrigger:p}=Sn){var l;const r=dl()===((l=Fn)==null?void 0:l.scope)?Fn:null;let i,d=!1,v=!1;if(Mn(n)?(i=()=>n.value,d=st(n)):Ta(n)?(i=()=>n,e=!0):nn(n)?(v=!0,d=n.some(R=>Ta(R)||st(R)),i=()=>n.map(R=>{if(Mn(R))return R.value;if(Ta(R))return pa(R);if(tn(R))return qs(R,r,2)})):tn(n)?s?i=()=>qs(n,r,2):i=()=>{if(!(r&&r.isUnmounted))return k&&k(),ls(n,r,3,[m])}:i=Ss,s&&e){const R=i;i=()=>pa(R())}let k,m=R=>{k=B.onStop=()=>{qs(R,r,4),k=B.onStop=void 0}},b;if(ja)if(m=Ss,s?a&&ls(s,r,3,[i(),v?[]:void 0,m]):i(),t==="sync"){const R=Bv();b=R.__watcherHandles||(R.__watcherHandles=[])}else return Ss;let E=v?new Array(n.length).fill(Ne):Ne;const S=()=>{if(B.active)if(s){const R=B.run();(e||d||(v?R.some((I,C)=>ua(I,E[C])):ua(R,E)))&&(k&&k(),ls(s,r,3,[R,E===Ne?void 0:v&&E[0]===Ne?[]:E,m]),E=R)}else B.run()};S.allowRecurse=!!s;let y;t==="sync"?y=S:t==="post"?y=()=>Kn(S,r&&r.suspense):(S.pre=!0,r&&(S.id=r.uid),y=()=>ft(S));const B=new Fo(i,y);s?a?S():E=B.run():t==="post"?Kn(B.run.bind(B),r&&r.suspense):B.run();const _=()=>{B.stop(),r&&r.scope&&Lo(r.scope.effects,B)};return b&&b.push(_),_}function Fd(n,s,a){const e=this.proxy,t=rn(n)?n.includes(".")?Vl(e,n):()=>e[n]:n.bind(e,e);let o;tn(s)?o=s:(o=s.handler,a=s);const p=Fn;Ma(this);const l=zo(t,o.bind(e),a);return p?Ma(p):ra(),l}function Vl(n,s){const a=s.split(".");return()=>{let e=n;for(let t=0;t<a.length&&e;t++)e=e[a[t]];return e}}function pa(n,s){if(!wn(n)||n.__v_skip||(s=s||new Set,s.has(n)))return n;if(s.add(n),Mn(n))pa(n.value,s);else if(nn(n))for(let a=0;a<n.length;a++)pa(n[a],s);else if(pl(n)||Da(n))n.forEach(a=>{pa(a,s)});else if(il(n))for(const a in n)pa(n[a],s);return n}function Hb(n,s){const a=Nn;if(a===null)return n;const e=yt(a)||a.proxy,t=n.dirs||(n.dirs=[]);for(let o=0;o<s.length;o++){let[p,l,r,i=Sn]=s[o];p&&(tn(p)&&(p={mounted:p,updated:p}),p.deep&&pa(l),t.push({dir:p,instance:e,value:l,oldValue:void 0,arg:r,modifiers:i}))}return n}function As(n,s,a,e){const t=n.dirs,o=s&&s.dirs;for(let p=0;p<t.length;p++){const l=t[p];o&&(l.oldValue=o[p].value);let r=l.dir[e];r&&(za(),ls(r,a,8,[n.el,l,n,s]),Ga())}}const Ws=Symbol("_leaveCb"),He=Symbol("_enterCb");function Fl(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return bn(()=>{n.isMounted=!0}),Uo(()=>{n.isUnmounting=!0}),n}const os=[Function,Array],Ml={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:os,onEnter:os,onAfterEnter:os,onEnterCancelled:os,onBeforeLeave:os,onLeave:os,onAfterLeave:os,onLeaveCancelled:os,onBeforeAppear:os,onAppear:os,onAfterAppear:os,onAppearCancelled:os},Md={name:"BaseTransition",props:Ml,setup(n,{slots:s}){const a=Zs(),e=Fl();let t;return()=>{const o=s.default&&Go(s.default(),!0);if(!o||!o.length)return;let p=o[0];if(o.length>1){for(const E of o)if(E.type!==es){p=E;break}}const l=un(n),{mode:r}=l;if(e.isLeaving)return Pt(p);const i=Gp(p);if(!i)return Pt(p);const d=ke(i,l,e,a);me(i,d);const v=a.subTree,k=v&&Gp(v);let m=!1;const{getTransitionKey:b}=i.type;if(b){const E=b();t===void 0?t=E:E!==t&&(t=E,m=!0)}if(k&&k.type!==es&&(!ta(i,k)||m)){const E=ke(k,l,e,a);if(me(k,E),r==="out-in")return e.isLeaving=!0,E.afterLeave=()=>{e.isLeaving=!1,a.update.active!==!1&&a.update()},Pt(p);r==="in-out"&&i.type!==es&&(E.delayLeave=(S,y,B)=>{const _=jl(e,k);_[String(k.key)]=k,S[Ws]=()=>{y(),S[Ws]=void 0,delete d.delayedLeave},d.delayedLeave=B})}return p}}},jd=Md;function jl(n,s){const{leavingVNodes:a}=n;let e=a.get(s.type);return e||(e=Object.create(null),a.set(s.type,e)),e}function ke(n,s,a,e){const{appear:t,mode:o,persisted:p=!1,onBeforeEnter:l,onEnter:r,onAfterEnter:i,onEnterCancelled:d,onBeforeLeave:v,onLeave:k,onAfterLeave:m,onLeaveCancelled:b,onBeforeAppear:E,onAppear:S,onAfterAppear:y,onAppearCancelled:B}=s,_=String(n.key),R=jl(a,n),I=(P,V)=>{P&&ls(P,e,9,V)},C=(P,V)=>{const H=V[1];I(P,V),nn(P)?P.every(Y=>Y.length<=1)&&H():P.length<=1&&H()},M={mode:o,persisted:p,beforeEnter(P){let V=l;if(!a.isMounted)if(t)V=E||l;else return;P[Ws]&&P[Ws](!0);const H=R[_];H&&ta(n,H)&&H.el[Ws]&&H.el[Ws](),I(V,[P])},enter(P){let V=r,H=i,Y=d;if(!a.isMounted)if(t)V=S||r,H=y||i,Y=B||d;else return;let J=!1;const sn=P[He]=Tn=>{J||(J=!0,Tn?I(Y,[P]):I(H,[P]),M.delayedLeave&&M.delayedLeave(),P[He]=void 0)};V?C(V,[P,sn]):sn()},leave(P,V){const H=String(n.key);if(P[He]&&P[He](!0),a.isUnmounting)return V();I(v,[P]);let Y=!1;const J=P[Ws]=sn=>{Y||(Y=!0,V(),sn?I(b,[P]):I(m,[P]),P[Ws]=void 0,R[H]===n&&delete R[H])};R[H]=n,k?C(k,[P,J]):J()},clone(P){return ke(P,s,a,e)}};return M}function Pt(n){if(Ae(n))return n=Xs(n),n.children=null,n}function Gp(n){return Ae(n)?n.children?n.children[0]:void 0:n}function me(n,s){n.shapeFlag&6&&n.component?me(n.component.subTree,s):n.shapeFlag&128?(n.ssContent.transition=s.clone(n.ssContent),n.ssFallback.transition=s.clone(n.ssFallback)):n.transition=s}function Go(n,s=!1,a){let e=[],t=0;for(let o=0;o<n.length;o++){let p=n[o];const l=a==null?p.key:String(a)+String(p.key!=null?p.key:o);p.type===zn?(p.patchFlag&128&&t++,e=e.concat(Go(p.children,s,l))):(s||p.type!==es)&&e.push(l!=null?Xs(p,{key:l}):p)}if(t>1)for(let o=0;o<e.length;o++)e[o].patchFlag=-2;return e}/*! #__NO_SIDE_EFFECTS__ */function j(n,s){return tn(n)?Vn({name:n.name},s,{setup:n}):n}const xa=n=>!!n.type.__asyncLoader;/*! #__NO_SIDE_EFFECTS__ */function f(n){tn(n)&&(n={loader:n});const{loader:s,loadingComponent:a,errorComponent:e,delay:t=200,timeout:o,suspensible:p=!0,onError:l}=n;let r=null,i,d=0;const v=()=>(d++,r=null,k()),k=()=>{let m;return r||(m=r=s().catch(b=>{if(b=b instanceof Error?b:new Error(String(b)),l)return new Promise((E,S)=>{l(b,()=>E(v()),()=>S(b),d+1)});throw b}).then(b=>m!==r&&r?r:(b&&(b.__esModule||b[Symbol.toStringTag]==="Module")&&(b=b.default),i=b,b)))};return j({name:"AsyncComponentWrapper",__asyncLoader:k,get __asyncResolved(){return i},setup(){const m=Fn;if(i)return()=>Vt(i,m);const b=B=>{r=null,_e(B,m,13,!e)};if(p&&m.suspense||ja)return k().then(B=>()=>Vt(B,m)).catch(B=>(b(B),()=>e?xn(e,{error:B}):null));const E=U(!1),S=U(),y=U(!!t);return t&&setTimeout(()=>{y.value=!1},t),o!=null&&setTimeout(()=>{if(!E.value&&!S.value){const B=new Error(`Async component timed out after ${o}ms.`);b(B),S.value=B}},o),k().then(()=>{E.value=!0,m.parent&&Ae(m.parent.vnode)&&ft(m.parent.update)}).catch(B=>{b(B),S.value=B}),()=>{if(E.value&&i)return Vt(i,m);if(S.value&&e)return xn(e,{error:S.value});if(a&&!y.value)return xn(a)}}})}function Vt(n,s){const{ref:a,props:e,children:t,ce:o}=s.vnode,p=xn(n,e,t);return p.ref=a,p.ce=o,delete s.vnode.ce,p}const Ae=n=>n.type.__isKeepAlive;function Nd(n,s){Nl(n,"a",s)}function Hd(n,s){Nl(n,"da",s)}function Nl(n,s,a=Fn){const e=n.__wdc||(n.__wdc=()=>{let t=a;for(;t;){if(t.isDeactivated)return;t=t.parent}return n()});if(gt(s,e,a),a){let t=a.parent;for(;t&&t.parent;)Ae(t.parent.vnode)&&$d(e,s,a,t),t=t.parent}}function $d(n,s,a,e){const t=gt(s,n,e,!0);fa(()=>{Lo(e[s],t)},a)}function gt(n,s,a=Fn,e=!1){if(a){const t=a[n]||(a[n]=[]),o=s.__weh||(s.__weh=(...p)=>{if(a.isUnmounted)return;za(),Ma(a);const l=ls(s,a,n,p);return ra(),Ga(),l});return e?t.unshift(o):t.push(o),o}}const Ms=n=>(s,a=Fn)=>(!ja||n==="sp")&&gt(n,(...e)=>s(...e),a),Jd=Ms("bm"),bn=Ms("m"),Wd=Ms("bu"),Hl=Ms("u"),Uo=Ms("bum"),fa=Ms("um"),zd=Ms("sp"),Gd=Ms("rtg"),Ud=Ms("rtc");function qd(n,s=Fn){gt("ec",n,s)}function $b(n,s,a,e){let t;const o=a&&a[e];if(nn(n)||rn(n)){t=new Array(n.length);for(let p=0,l=n.length;p<l;p++)t[p]=s(n[p],p,void 0,o&&o[p])}else if(typeof n=="number"){t=new Array(n);for(let p=0;p<n;p++)t[p]=s(p+1,p,void 0,o&&o[p])}else if(wn(n))if(n[Symbol.iterator])t=Array.from(n,(p,l)=>s(p,l,void 0,o&&o[l]));else{const p=Object.keys(n);t=new Array(p.length);for(let l=0,r=p.length;l<r;l++){const i=p[l];t[l]=s(n[i],i,l,o&&o[l])}}else t=[];return a&&(a[e]=t),t}function Jb(n,s,a={},e,t){if(Nn.isCE||Nn.parent&&xa(Nn.parent)&&Nn.parent.isCE)return s!=="default"&&(a.name=s),xn("slot",a,e&&e());let o=n[s];o&&o._c&&(o._d=!1),Zl();const p=o&&$l(o(a)),l=ni(zn,{key:a.key||p&&p.key||`_${s}`},p||(e?e():[]),p&&n._===1?64:-2);return!t&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),o&&o._c&&(o._d=!0),l}function $l(n){return n.some(s=>ct(s)?!(s.type===es||s.type===zn&&!$l(s.children)):!0)?n:null}const io=n=>n?ti(n)?yt(n)||n.proxy:io(n.parent):null,oe=Vn(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>io(n.parent),$root:n=>io(n.root),$emit:n=>n.emit,$options:n=>qo(n),$forceUpdate:n=>n.f||(n.f=()=>ft(n.update)),$nextTick:n=>n.n||(n.n=ma.bind(n.proxy)),$watch:n=>Fd.bind(n)}),Ft=(n,s)=>n!==Sn&&!n.__isScriptSetup&&fn(n,s),Kd={get({_:n},s){const{ctx:a,setupState:e,data:t,props:o,accessCache:p,type:l,appContext:r}=n;let i;if(s[0]!=="$"){const m=p[s];if(m!==void 0)switch(m){case 1:return e[s];case 2:return t[s];case 4:return a[s];case 3:return o[s]}else{if(Ft(e,s))return p[s]=1,e[s];if(t!==Sn&&fn(t,s))return p[s]=2,t[s];if((i=n.propsOptions[0])&&fn(i,s))return p[s]=3,o[s];if(a!==Sn&&fn(a,s))return p[s]=4,a[s];ro&&(p[s]=0)}}const d=oe[s];let v,k;if(d)return s==="$attrs"&&Yn(n,"get",s),d(n);if((v=l.__cssModules)&&(v=v[s]))return v;if(a!==Sn&&fn(a,s))return p[s]=4,a[s];if(k=r.config.globalProperties,fn(k,s))return k[s]},set({_:n},s,a){const{data:e,setupState:t,ctx:o}=n;return Ft(t,s)?(t[s]=a,!0):e!==Sn&&fn(e,s)?(e[s]=a,!0):fn(n.props,s)||s[0]==="$"&&s.slice(1)in n?!1:(o[s]=a,!0)},has({_:{data:n,setupState:s,accessCache:a,ctx:e,appContext:t,propsOptions:o}},p){let l;return!!a[p]||n!==Sn&&fn(n,p)||Ft(s,p)||(l=o[0])&&fn(l,p)||fn(e,p)||fn(oe,p)||fn(t.config.globalProperties,p)},defineProperty(n,s,a){return a.get!=null?n._.accessCache[s]=0:fn(a,"value")&&this.set(n,s,a.value,null),Reflect.defineProperty(n,s,a)}};function Wb(n,s,a){const e=Zs();if(a&&a.local){const t=U(n[s]);return cn(()=>n[s],o=>t.value=o),cn(t,o=>{o!==n[s]&&e.emit(`update:${s}`,o)}),t}else return{__v_isRef:!0,get value(){return n[s]},set value(t){e.emit(`update:${s}`,t)}}}function Up(n){return nn(n)?n.reduce((s,a)=>(s[a]=null,s),{}):n}let ro=!0;function Xd(n){const s=qo(n),a=n.proxy,e=n.ctx;ro=!1,s.beforeCreate&&qp(s.beforeCreate,n,"bc");const{data:t,computed:o,methods:p,watch:l,provide:r,inject:i,created:d,beforeMount:v,mounted:k,beforeUpdate:m,updated:b,activated:E,deactivated:S,beforeDestroy:y,beforeUnmount:B,destroyed:_,unmounted:R,render:I,renderTracked:C,renderTriggered:M,errorCaptured:P,serverPrefetch:V,expose:H,inheritAttrs:Y,components:J,directives:sn,filters:Tn}=s;if(i&&Yd(i,e,null),p)for(const an in p){const q=p[an];tn(q)&&(e[an]=q.bind(a))}if(t){const an=t.call(a,a);wn(an)&&(n.data=ye(an))}if(ro=!0,o)for(const an in o){const q=o[an],On=tn(q)?q.bind(a,a):tn(q.get)?q.get.bind(a,a):Ss,Es=!tn(q)&&tn(q.set)?q.set.bind(a):Ss,ts=w({get:On,set:Es});Object.defineProperty(e,an,{enumerable:!0,configurable:!0,get:()=>ts.value,set:jn=>ts.value=jn})}if(l)for(const an in l)Jl(l[an],e,a,an);if(r){const an=tn(r)?r.call(a):r;Reflect.ownKeys(an).forEach(q=>{is(q,an[q])})}d&&qp(d,n,"c");function G(an,q){nn(q)?q.forEach(On=>an(On.bind(a))):q&&an(q.bind(a))}if(G(Jd,v),G(bn,k),G(Wd,m),G(Hl,b),G(Nd,E),G(Hd,S),G(qd,P),G(Ud,C),G(Gd,M),G(Uo,B),G(fa,R),G(zd,V),nn(H))if(H.length){const an=n.exposed||(n.exposed={});H.forEach(q=>{Object.defineProperty(an,q,{get:()=>a[q],set:On=>a[q]=On})})}else n.exposed||(n.exposed={});I&&n.render===Ss&&(n.render=I),Y!=null&&(n.inheritAttrs=Y),J&&(n.components=J),sn&&(n.directives=sn)}function Yd(n,s,a=Ss){nn(n)&&(n=uo(n));for(const e in n){const t=n[e];let o;wn(t)?"default"in t?o=dn(t.from||e,t.default,!0):o=dn(t.from||e):o=dn(t),Mn(o)?Object.defineProperty(s,e,{enumerable:!0,configurable:!0,get:()=>o.value,set:p=>o.value=p}):s[e]=o}}function qp(n,s,a){ls(nn(n)?n.map(e=>e.bind(s.proxy)):n.bind(s.proxy),s,a)}function Jl(n,s,a,e){const t=e.includes(".")?Vl(a,e):()=>a[e];if(rn(n)){const o=s[n];tn(o)&&cn(t,o)}else if(tn(n))cn(t,n.bind(a));else if(wn(n))if(nn(n))n.forEach(o=>Jl(o,s,a,e));else{const o=tn(n.handler)?n.handler.bind(a):s[n.handler];tn(o)&&cn(t,o,n)}}function qo(n){const s=n.type,{mixins:a,extends:e}=s,{mixins:t,optionsCache:o,config:{optionMergeStrategies:p}}=n.appContext,l=o.get(s);let r;return l?r=l:!t.length&&!a&&!e?r=s:(r={},t.length&&t.forEach(i=>tt(r,i,p,!0)),tt(r,s,p)),wn(s)&&o.set(s,r),r}function tt(n,s,a,e=!1){const{mixins:t,extends:o}=s;o&&tt(n,o,a,!0),t&&t.forEach(p=>tt(n,p,a,!0));for(const p in s)if(!(e&&p==="expose")){const l=Zd[p]||a&&a[p];n[p]=l?l(n[p],s[p]):s[p]}return n}const Zd={data:Kp,props:Xp,emits:Xp,methods:ee,computed:ee,beforeCreate:Wn,created:Wn,beforeMount:Wn,mounted:Wn,beforeUpdate:Wn,updated:Wn,beforeDestroy:Wn,beforeUnmount:Wn,destroyed:Wn,unmounted:Wn,activated:Wn,deactivated:Wn,errorCaptured:Wn,serverPrefetch:Wn,components:ee,directives:ee,watch:nv,provide:Kp,inject:Qd};function Kp(n,s){return s?n?function(){return Vn(tn(n)?n.call(this,this):n,tn(s)?s.call(this,this):s)}:s:n}function Qd(n,s){return ee(uo(n),uo(s))}function uo(n){if(nn(n)){const s={};for(let a=0;a<n.length;a++)s[n[a]]=n[a];return s}return n}function Wn(n,s){return n?[...new Set([].concat(n,s))]:s}function ee(n,s){return n?Vn(Object.create(null),n,s):s}function Xp(n,s){return n?nn(n)&&nn(s)?[...new Set([...n,...s])]:Vn(Object.create(null),Up(n),Up(s??{})):s}function nv(n,s){if(!n)return s;if(!s)return n;const a=Vn(Object.create(null),n);for(const e in s)a[e]=Wn(n[e],s[e]);return a}function Wl(){return{app:null,config:{isNativeTag:Lu,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let sv=0;function av(n,s){return function(e,t=null){tn(e)||(e=Vn({},e)),t!=null&&!wn(t)&&(t=null);const o=Wl(),p=new WeakSet;let l=!1;const r=o.app={_uid:sv++,_component:e,_props:t,_container:null,_context:o,_instance:null,version:Dv,get config(){return o.config},set config(i){},use(i,...d){return p.has(i)||(i&&tn(i.install)?(p.add(i),i.install(r,...d)):tn(i)&&(p.add(i),i(r,...d))),r},mixin(i){return o.mixins.includes(i)||o.mixins.push(i),r},component(i,d){return d?(o.components[i]=d,r):o.components[i]},directive(i,d){return d?(o.directives[i]=d,r):o.directives[i]},mount(i,d,v){if(!l){const k=xn(e,t);return k.appContext=o,d&&s?s(k,i):n(k,i,v),l=!0,r._container=i,i.__vue_app__=r,yt(k.component)||k.component.proxy}},unmount(){l&&(n(null,r._container),delete r._container.__vue_app__)},provide(i,d){return o.provides[i]=d,r},runWithContext(i){ot=r;try{return i()}finally{ot=null}}};return r}}let ot=null;function is(n,s){if(Fn){let a=Fn.provides;const e=Fn.parent&&Fn.parent.provides;e===a&&(a=Fn.provides=Object.create(e)),a[n]=s}}function dn(n,s,a=!1){const e=Fn||Nn;if(e||ot){const t=e?e.parent==null?e.vnode.appContext&&e.vnode.appContext.provides:e.parent.provides:ot._context.provides;if(t&&n in t)return t[n];if(arguments.length>1)return a&&tn(s)?s.call(e&&e.proxy):s}}function ev(n,s,a,e=!1){const t={},o={};Qe(o,Et,1),n.propsDefaults=Object.create(null),zl(n,s,t,o);for(const p in n.propsOptions[0])p in t||(t[p]=void 0);a?n.props=e?t:Al(t):n.type.props?n.props=t:n.props=o,n.attrs=o}function tv(n,s,a,e){const{props:t,attrs:o,vnode:{patchFlag:p}}=n,l=un(t),[r]=n.propsOptions;let i=!1;if((e||p>0)&&!(p&16)){if(p&8){const d=n.vnode.dynamicProps;for(let v=0;v<d.length;v++){let k=d[v];if(ht(n.emitsOptions,k))continue;const m=s[k];if(r)if(fn(o,k))m!==o[k]&&(o[k]=m,i=!0);else{const b=rs(k);t[b]=vo(r,l,b,m,n,!1)}else m!==o[k]&&(o[k]=m,i=!0)}}}else{zl(n,s,t,o)&&(i=!0);let d;for(const v in l)(!s||!fn(s,v)&&((d=va(v))===v||!fn(s,d)))&&(r?a&&(a[v]!==void 0||a[d]!==void 0)&&(t[v]=vo(r,l,v,void 0,n,!0)):delete t[v]);if(o!==l)for(const v in o)(!s||!fn(s,v))&&(delete o[v],i=!0)}i&&Ps(n,"set","$attrs")}function zl(n,s,a,e){const[t,o]=n.propsOptions;let p=!1,l;if(s)for(let r in s){if(te(r))continue;const i=s[r];let d;t&&fn(t,d=rs(r))?!o||!o.includes(d)?a[d]=i:(l||(l={}))[d]=i:ht(n.emitsOptions,r)||(!(r in e)||i!==e[r])&&(e[r]=i,p=!0)}if(o){const r=un(a),i=l||Sn;for(let d=0;d<o.length;d++){const v=o[d];a[v]=vo(t,r,v,i[v],n,!fn(i,v))}}return p}function vo(n,s,a,e,t,o){const p=n[a];if(p!=null){const l=fn(p,"default");if(l&&e===void 0){const r=p.default;if(p.type!==Function&&!p.skipFactory&&tn(r)){const{propsDefaults:i}=t;a in i?e=i[a]:(Ma(t),e=i[a]=r.call(null,s),ra())}else e=r}p[0]&&(o&&!l?e=!1:p[1]&&(e===""||e===va(a))&&(e=!0))}return e}function Gl(n,s,a=!1){const e=s.propsCache,t=e.get(n);if(t)return t;const o=n.props,p={},l=[];let r=!1;if(!tn(n)){const d=v=>{r=!0;const[k,m]=Gl(v,s,!0);Vn(p,k),m&&l.push(...m)};!a&&s.mixins.length&&s.mixins.forEach(d),n.extends&&d(n.extends),n.mixins&&n.mixins.forEach(d)}if(!o&&!r)return wn(n)&&e.set(n,Ba),Ba;if(nn(o))for(let d=0;d<o.length;d++){const v=rs(o[d]);Yp(v)&&(p[v]=Sn)}else if(o)for(const d in o){const v=rs(d);if(Yp(v)){const k=o[d],m=p[v]=nn(k)||tn(k)?{type:k}:Vn({},k);if(m){const b=nc(Boolean,m.type),E=nc(String,m.type);m[0]=b>-1,m[1]=E<0||b<E,(b>-1||fn(m,"default"))&&l.push(v)}}}const i=[p,l];return wn(n)&&e.set(n,i),i}function Yp(n){return n[0]!=="$"}function Zp(n){const s=n&&n.toString().match(/^\s*(function|class) (\w+)/);return s?s[2]:n===null?"null":""}function Qp(n,s){return Zp(n)===Zp(s)}function nc(n,s){return nn(s)?s.findIndex(a=>Qp(a,n)):tn(s)&&Qp(s,n)?0:-1}const Ul=n=>n[0]==="_"||n==="$stable",Ko=n=>nn(n)?n.map(ks):[ks(n)],ov=(n,s,a)=>{if(s._n)return s;const e=Td((...t)=>Ko(s(...t)),a);return e._c=!1,e},ql=(n,s,a)=>{const e=n._ctx;for(const t in n){if(Ul(t))continue;const o=n[t];if(tn(o))s[t]=ov(t,o,e);else if(o!=null){const p=Ko(o);s[t]=()=>p}}},Kl=(n,s)=>{const a=Ko(s);n.slots.default=()=>a},pv=(n,s)=>{if(n.vnode.shapeFlag&32){const a=s._;a?(n.slots=un(s),Qe(s,"_",a)):ql(s,n.slots={})}else n.slots={},s&&Kl(n,s);Qe(n.slots,Et,1)},cv=(n,s,a)=>{const{vnode:e,slots:t}=n;let o=!0,p=Sn;if(e.shapeFlag&32){const l=s._;l?a&&l===1?o=!1:(Vn(t,s),!a&&l===1&&delete t._):(o=!s.$stable,ql(s,t)),p=s}else s&&(Kl(n,s),p={default:1});if(o)for(const l in t)!Ul(l)&&p[l]==null&&delete t[l]};function pt(n,s,a,e,t=!1){if(nn(n)){n.forEach((k,m)=>pt(k,s&&(nn(s)?s[m]:s),a,e,t));return}if(xa(e)&&!t)return;const o=e.shapeFlag&4?yt(e.component)||e.component.proxy:e.el,p=t?null:o,{i:l,r}=n,i=s&&s.r,d=l.refs===Sn?l.refs={}:l.refs,v=l.setupState;if(i!=null&&i!==r&&(rn(i)?(d[i]=null,fn(v,i)&&(v[i]=null)):Mn(i)&&(i.value=null)),tn(r))qs(r,l,12,[p,d]);else{const k=rn(r),m=Mn(r);if(k||m){const b=()=>{if(n.f){const E=k?fn(v,r)?v[r]:d[r]:r.value;t?nn(E)&&Lo(E,o):nn(E)?E.includes(o)||E.push(o):k?(d[r]=[o],fn(v,r)&&(v[r]=d[r])):(r.value=[o],n.k&&(d[n.k]=r.value))}else k?(d[r]=p,fn(v,r)&&(v[r]=p)):m&&(r.value=p,n.k&&(d[n.k]=p))};p?(b.id=-1,Kn(b,a)):b()}}}let Ns=!1;const $e=n=>/svg/.test(n.namespaceURI)&&n.tagName!=="foreignObject",Je=n=>n.nodeType===8;function lv(n){const{mt:s,p:a,o:{patchProp:e,createText:t,nextSibling:o,parentNode:p,remove:l,insert:r,createComment:i}}=n,d=(_,R)=>{if(!R.hasChildNodes()){a(null,_,R),at(),R._vnode=_;return}Ns=!1,v(R.firstChild,_,null,null,null),at(),R._vnode=_,Ns&&console.error("Hydration completed but contains mismatches.")},v=(_,R,I,C,M,P=!1)=>{const V=Je(_)&&_.data==="[",H=()=>E(_,R,I,C,M,V),{type:Y,ref:J,shapeFlag:sn,patchFlag:Tn}=R;let Bn=_.nodeType;R.el=_,Tn===-2&&(P=!1,R.dynamicChildren=null);let G=null;switch(Y){case Fa:Bn!==3?R.children===""?(r(R.el=t(""),p(_),_),G=_):G=H():(_.data!==R.children&&(Ns=!0,_.data=R.children),G=o(_));break;case es:B(_)?(G=o(_),y(R.el=_.content.firstChild,_,I)):Bn!==8||V?G=H():G=o(_);break;case pe:if(V&&(_=o(_),Bn=_.nodeType),Bn===1||Bn===3){G=_;const an=!R.children.length;for(let q=0;q<R.staticCount;q++)an&&(R.children+=G.nodeType===1?G.outerHTML:G.data),q===R.staticCount-1&&(R.anchor=G),G=o(G);return V?o(G):G}else H();break;case zn:V?G=b(_,R,I,C,M,P):G=H();break;default:if(sn&1)(Bn!==1||R.type.toLowerCase()!==_.tagName.toLowerCase())&&!B(_)?G=H():G=k(_,R,I,C,M,P);else if(sn&6){R.slotScopeIds=M;const an=p(_);if(V?G=S(_):Je(_)&&_.data==="teleport start"?G=S(_,_.data,"teleport end"):G=o(_),s(R,an,null,I,C,$e(an),P),xa(R)){let q;V?(q=xn(zn),q.anchor=G?G.previousSibling:an.lastChild):q=_.nodeType===3?ei(""):xn("div"),q.el=_,R.component.subTree=q}}else sn&64?Bn!==8?G=H():G=R.type.hydrate(_,R,I,C,M,P,n,m):sn&128&&(G=R.type.hydrate(_,R,I,C,$e(p(_)),M,P,n,v))}return J!=null&&pt(J,null,C,R),G},k=(_,R,I,C,M,P)=>{P=P||!!R.dynamicChildren;const{type:V,props:H,patchFlag:Y,shapeFlag:J,dirs:sn,transition:Tn}=R,Bn=V==="input"||V==="option";if(Bn||Y!==-1){if(sn&&As(R,null,I,"created"),H)if(Bn||!P||Y&48)for(const q in H)(Bn&&(q.endsWith("value")||q==="indeterminate")||ge(q)&&!te(q)||q[0]===".")&&e(_,q,null,H[q],!1,void 0,I);else H.onClick&&e(_,"onClick",null,H.onClick,!1,void 0,I);let G;(G=H&&H.onVnodeBeforeMount)&&ps(G,I,R);let an=!1;if(B(_)){an=Xl(C,Tn)&&I&&I.vnode.props&&I.vnode.props.appear;const q=_.content.firstChild;an&&Tn.beforeEnter(q),y(q,_,I),R.el=_=q}if(sn&&As(R,null,I,"beforeMount"),((G=H&&H.onVnodeMounted)||sn||an)&&Il(()=>{G&&ps(G,I,R),an&&Tn.enter(_),sn&&As(R,null,I,"mounted")},C),J&16&&!(H&&(H.innerHTML||H.textContent))){let q=m(_.firstChild,R,_,I,C,M,P);for(;q;){Ns=!0;const On=q;q=q.nextSibling,l(On)}}else J&8&&_.textContent!==R.children&&(Ns=!0,_.textContent=R.children)}return _.nextSibling},m=(_,R,I,C,M,P,V)=>{V=V||!!R.dynamicChildren;const H=R.children,Y=H.length;for(let J=0;J<Y;J++){const sn=V?H[J]:H[J]=ks(H[J]);if(_)_=v(_,sn,C,M,P,V);else{if(sn.type===Fa&&!sn.children)continue;Ns=!0,a(null,sn,I,null,C,M,$e(I),P)}}return _},b=(_,R,I,C,M,P)=>{const{slotScopeIds:V}=R;V&&(M=M?M.concat(V):V);const H=p(_),Y=m(o(_),R,H,I,C,M,P);return Y&&Je(Y)&&Y.data==="]"?o(R.anchor=Y):(Ns=!0,r(R.anchor=i("]"),H,Y),Y)},E=(_,R,I,C,M,P)=>{if(Ns=!0,R.el=null,P){const Y=S(_);for(;;){const J=o(_);if(J&&J!==Y)l(J);else break}}const V=o(_),H=p(_);return l(_),a(null,R,H,V,I,C,$e(H),M),V},S=(_,R="[",I="]")=>{let C=0;for(;_;)if(_=o(_),_&&Je(_)&&(_.data===R&&C++,_.data===I)){if(C===0)return o(_);C--}return _},y=(_,R,I)=>{const C=R.parentNode;C&&C.replaceChild(_,R);let M=I;for(;M;)M.vnode.el===R&&(M.vnode.el=M.subTree.el=_),M=M.parent},B=_=>_.nodeType===1&&_.tagName.toLowerCase()==="template";return[d,v]}const Kn=Il;function iv(n){return rv(n,lv)}function rv(n,s){const a=to();a.__VUE__=!0;const{insert:e,remove:t,patchProp:o,createElement:p,createText:l,createComment:r,setText:i,setElementText:d,parentNode:v,nextSibling:k,setScopeId:m=Ss,insertStaticContent:b}=n,E=(h,g,A,D=null,x=null,L=null,W=!1,F=null,$=!!g.dynamicChildren)=>{if(h===g)return;h&&!ta(h,g)&&(D=T(h),jn(h,x,L,!0),h=null),g.patchFlag===-2&&($=!1,g.dynamicChildren=null);const{type:O,ref:Z,shapeFlag:K}=g;switch(O){case Fa:S(h,g,A,D);break;case es:y(h,g,A,D);break;case pe:h==null&&B(g,A,D,W);break;case zn:J(h,g,A,D,x,L,W,F,$);break;default:K&1?I(h,g,A,D,x,L,W,F,$):K&6?sn(h,g,A,D,x,L,W,F,$):(K&64||K&128)&&O.process(h,g,A,D,x,L,W,F,$,N)}Z!=null&&x&&pt(Z,h&&h.ref,L,g||h,!g)},S=(h,g,A,D)=>{if(h==null)e(g.el=l(g.children),A,D);else{const x=g.el=h.el;g.children!==h.children&&i(x,g.children)}},y=(h,g,A,D)=>{h==null?e(g.el=r(g.children||""),A,D):g.el=h.el},B=(h,g,A,D)=>{[h.el,h.anchor]=b(h.children,g,A,D,h.el,h.anchor)},_=({el:h,anchor:g},A,D)=>{let x;for(;h&&h!==g;)x=k(h),e(h,A,D),h=x;e(g,A,D)},R=({el:h,anchor:g})=>{let A;for(;h&&h!==g;)A=k(h),t(h),h=A;t(g)},I=(h,g,A,D,x,L,W,F,$)=>{W=W||g.type==="svg",h==null?C(g,A,D,x,L,W,F,$):V(h,g,x,L,W,F,$)},C=(h,g,A,D,x,L,W,F)=>{let $,O;const{type:Z,props:K,shapeFlag:Q,transition:en,dirs:pn}=h;if($=h.el=p(h.type,L,K&&K.is,K),Q&8?d($,h.children):Q&16&&P(h.children,$,null,D,x,L&&Z!=="foreignObject",W,F),pn&&As(h,null,D,"created"),M($,h,h.scopeId,W,D),K){for(const En in K)En!=="value"&&!te(En)&&o($,En,null,K[En],L,h.children,D,x,In);"value"in K&&o($,"value",null,K.value),(O=K.onVnodeBeforeMount)&&ps(O,D,h)}pn&&As(h,null,D,"beforeMount");const An=Xl(x,en);An&&en.beforeEnter($),e($,g,A),((O=K&&K.onVnodeMounted)||An||pn)&&Kn(()=>{O&&ps(O,D,h),An&&en.enter($),pn&&As(h,null,D,"mounted")},x)},M=(h,g,A,D,x)=>{if(A&&m(h,A),D)for(let L=0;L<D.length;L++)m(h,D[L]);if(x){let L=x.subTree;if(g===L){const W=x.vnode;M(h,W,W.scopeId,W.slotScopeIds,x.parent)}}},P=(h,g,A,D,x,L,W,F,$=0)=>{for(let O=$;O<h.length;O++){const Z=h[O]=F?zs(h[O]):ks(h[O]);E(null,Z,g,A,D,x,L,W,F)}},V=(h,g,A,D,x,L,W)=>{const F=g.el=h.el;let{patchFlag:$,dynamicChildren:O,dirs:Z}=g;$|=h.patchFlag&16;const K=h.props||Sn,Q=g.props||Sn;let en;A&&sa(A,!1),(en=Q.onVnodeBeforeUpdate)&&ps(en,A,g,h),Z&&As(g,h,A,"beforeUpdate"),A&&sa(A,!0);const pn=x&&g.type!=="foreignObject";if(O?H(h.dynamicChildren,O,F,A,D,pn,L):W||q(h,g,F,null,A,D,pn,L,!1),$>0){if($&16)Y(F,g,K,Q,A,D,x);else if($&2&&K.class!==Q.class&&o(F,"class",null,Q.class,x),$&4&&o(F,"style",K.style,Q.style,x),$&8){const An=g.dynamicProps;for(let En=0;En<An.length;En++){const Pn=An[En],ds=K[Pn],Ea=Q[Pn];(Ea!==ds||Pn==="value")&&o(F,Pn,ds,Ea,x,h.children,A,D,In)}}$&1&&h.children!==g.children&&d(F,g.children)}else!W&&O==null&&Y(F,g,K,Q,A,D,x);((en=Q.onVnodeUpdated)||Z)&&Kn(()=>{en&&ps(en,A,g,h),Z&&As(g,h,A,"updated")},D)},H=(h,g,A,D,x,L,W)=>{for(let F=0;F<g.length;F++){const $=h[F],O=g[F],Z=$.el&&($.type===zn||!ta($,O)||$.shapeFlag&70)?v($.el):A;E($,O,Z,null,D,x,L,W,!0)}},Y=(h,g,A,D,x,L,W)=>{if(A!==D){if(A!==Sn)for(const F in A)!te(F)&&!(F in D)&&o(h,F,A[F],null,W,g.children,x,L,In);for(const F in D){if(te(F))continue;const $=D[F],O=A[F];$!==O&&F!=="value"&&o(h,F,O,$,W,g.children,x,L,In)}"value"in D&&o(h,"value",A.value,D.value)}},J=(h,g,A,D,x,L,W,F,$)=>{const O=g.el=h?h.el:l(""),Z=g.anchor=h?h.anchor:l("");let{patchFlag:K,dynamicChildren:Q,slotScopeIds:en}=g;en&&(F=F?F.concat(en):en),h==null?(e(O,A,D),e(Z,A,D),P(g.children,A,Z,x,L,W,F,$)):K>0&&K&64&&Q&&h.dynamicChildren?(H(h.dynamicChildren,Q,A,x,L,W,F),(g.key!=null||x&&g===x.subTree)&&Yl(h,g,!0)):q(h,g,A,Z,x,L,W,F,$)},sn=(h,g,A,D,x,L,W,F,$)=>{g.slotScopeIds=F,h==null?g.shapeFlag&512?x.ctx.activate(g,A,D,W,$):Tn(g,A,D,x,L,W,$):Bn(h,g,$)},Tn=(h,g,A,D,x,L,W)=>{const F=h.component=gv(h,D,x);if(Ae(h)&&(F.ctx.renderer=N),Ev(F),F.asyncDep){if(x&&x.registerDep(F,G),!h.el){const $=F.subTree=xn(es);y(null,$,g,A)}return}G(F,h,g,A,x,L,W)},Bn=(h,g,A)=>{const D=g.component=h.component;if(Ld(h,g,A))if(D.asyncDep&&!D.asyncResolved){an(D,g,A);return}else D.next=g,Sd(D.update),D.update();else g.el=h.el,D.vnode=g},G=(h,g,A,D,x,L,W)=>{const F=()=>{if(h.isMounted){let{next:Z,bu:K,u:Q,parent:en,vnode:pn}=h,An=Z,En;sa(h,!1),Z?(Z.el=pn.el,an(h,Z,W)):Z=pn,K&&Xe(K),(En=Z.props&&Z.props.onVnodeBeforeUpdate)&&ps(En,en,Z,pn),sa(h,!0);const Pn=It(h),ds=h.subTree;h.subTree=Pn,E(ds,Pn,v(ds.el),T(ds),h,x,L),Z.el=Pn.el,An===null&&Od(h,Pn.el),Q&&Kn(Q,x),(En=Z.props&&Z.props.onVnodeUpdated)&&Kn(()=>ps(En,en,Z,pn),x)}else{let Z;const{el:K,props:Q}=g,{bm:en,m:pn,parent:An}=h,En=xa(g);if(sa(h,!1),en&&Xe(en),!En&&(Z=Q&&Q.onVnodeBeforeMount)&&ps(Z,An,g),sa(h,!0),K&&kn){const Pn=()=>{h.subTree=It(h),kn(K,h.subTree,h,x,null)};En?g.type.__asyncLoader().then(()=>!h.isUnmounted&&Pn()):Pn()}else{const Pn=h.subTree=It(h);E(null,Pn,A,D,h,x,L),g.el=Pn.el}if(pn&&Kn(pn,x),!En&&(Z=Q&&Q.onVnodeMounted)){const Pn=g;Kn(()=>ps(Z,An,Pn),x)}(g.shapeFlag&256||An&&xa(An.vnode)&&An.vnode.shapeFlag&256)&&h.a&&Kn(h.a,x),h.isMounted=!0,g=A=D=null}},$=h.effect=new Fo(F,()=>ft(O),h.scope),O=h.update=()=>$.run();O.id=h.uid,sa(h,!0),O()},an=(h,g,A)=>{g.component=h;const D=h.vnode.props;h.vnode=g,h.next=null,tv(h,g.props,D,A),cv(h,g.children,A),za(),Jp(),Ga()},q=(h,g,A,D,x,L,W,F,$=!1)=>{const O=h&&h.children,Z=h?h.shapeFlag:0,K=g.children,{patchFlag:Q,shapeFlag:en}=g;if(Q>0){if(Q&128){Es(O,K,A,D,x,L,W,F,$);return}else if(Q&256){On(O,K,A,D,x,L,W,F,$);return}}en&8?(Z&16&&In(O,x,L),K!==O&&d(A,K)):Z&16?en&16?Es(O,K,A,D,x,L,W,F,$):In(O,x,L,!0):(Z&8&&d(A,""),en&16&&P(K,A,D,x,L,W,F,$))},On=(h,g,A,D,x,L,W,F,$)=>{h=h||Ba,g=g||Ba;const O=h.length,Z=g.length,K=Math.min(O,Z);let Q;for(Q=0;Q<K;Q++){const en=g[Q]=$?zs(g[Q]):ks(g[Q]);E(h[Q],en,A,null,x,L,W,F,$)}O>Z?In(h,x,L,!0,!1,K):P(g,A,D,x,L,W,F,$,K)},Es=(h,g,A,D,x,L,W,F,$)=>{let O=0;const Z=g.length;let K=h.length-1,Q=Z-1;for(;O<=K&&O<=Q;){const en=h[O],pn=g[O]=$?zs(g[O]):ks(g[O]);if(ta(en,pn))E(en,pn,A,null,x,L,W,F,$);else break;O++}for(;O<=K&&O<=Q;){const en=h[K],pn=g[Q]=$?zs(g[Q]):ks(g[Q]);if(ta(en,pn))E(en,pn,A,null,x,L,W,F,$);else break;K--,Q--}if(O>K){if(O<=Q){const en=Q+1,pn=en<Z?g[en].el:D;for(;O<=Q;)E(null,g[O]=$?zs(g[O]):ks(g[O]),A,pn,x,L,W,F,$),O++}}else if(O>Q)for(;O<=K;)jn(h[O],x,L,!0),O++;else{const en=O,pn=O,An=new Map;for(O=pn;O<=Q;O++){const Qn=g[O]=$?zs(g[O]):ks(g[O]);Qn.key!=null&&An.set(Qn.key,O)}let En,Pn=0;const ds=Q-pn+1;let Ea=!1,Lp=0;const Ya=new Array(ds);for(O=0;O<ds;O++)Ya[O]=0;for(O=en;O<=K;O++){const Qn=h[O];if(Pn>=ds){jn(Qn,x,L,!0);continue}let _s;if(Qn.key!=null)_s=An.get(Qn.key);else for(En=pn;En<=Q;En++)if(Ya[En-pn]===0&&ta(Qn,g[En])){_s=En;break}_s===void 0?jn(Qn,x,L,!0):(Ya[_s-pn]=O+1,_s>=Lp?Lp=_s:Ea=!0,E(Qn,g[_s],A,null,x,L,W,F,$),Pn++)}const Op=Ea?uv(Ya):Ba;for(En=Op.length-1,O=ds-1;O>=0;O--){const Qn=pn+O,_s=g[Qn],Ip=Qn+1<Z?g[Qn+1].el:D;Ya[O]===0?E(null,_s,A,Ip,x,L,W,F,$):Ea&&(En<0||O!==Op[En]?ts(_s,A,Ip,2):En--)}}},ts=(h,g,A,D,x=null)=>{const{el:L,type:W,transition:F,children:$,shapeFlag:O}=h;if(O&6){ts(h.component.subTree,g,A,D);return}if(O&128){h.suspense.move(g,A,D);return}if(O&64){W.move(h,g,A,N);return}if(W===zn){e(L,g,A);for(let K=0;K<$.length;K++)ts($[K],g,A,D);e(h.anchor,g,A);return}if(W===pe){_(h,g,A);return}if(D!==2&&O&1&&F)if(D===0)F.beforeEnter(L),e(L,g,A),Kn(()=>F.enter(L),x);else{const{leave:K,delayLeave:Q,afterLeave:en}=F,pn=()=>e(L,g,A),An=()=>{K(L,()=>{pn(),en&&en()})};Q?Q(L,pn,An):An()}else e(L,g,A)},jn=(h,g,A,D=!1,x=!1)=>{const{type:L,props:W,ref:F,children:$,dynamicChildren:O,shapeFlag:Z,patchFlag:K,dirs:Q}=h;if(F!=null&&pt(F,null,A,h,!0),Z&256){g.ctx.deactivate(h);return}const en=Z&1&&Q,pn=!xa(h);let An;if(pn&&(An=W&&W.onVnodeBeforeUnmount)&&ps(An,g,h),Z&6)ys(h.component,A,D);else{if(Z&128){h.suspense.unmount(A,D);return}en&&As(h,null,g,"beforeUnmount"),Z&64?h.type.remove(h,g,A,x,N,D):O&&(L!==zn||K>0&&K&64)?In(O,g,A,!1,!0):(L===zn&&K&384||!x&&Z&16)&&In($,g,A),D&&Zn(h)}(pn&&(An=W&&W.onVnodeUnmounted)||en)&&Kn(()=>{An&&ps(An,g,h),en&&As(h,null,g,"unmounted")},A)},Zn=h=>{const{type:g,el:A,anchor:D,transition:x}=h;if(g===zn){Ts(A,D);return}if(g===pe){R(h);return}const L=()=>{t(A),x&&!x.persisted&&x.afterLeave&&x.afterLeave()};if(h.shapeFlag&1&&x&&!x.persisted){const{leave:W,delayLeave:F}=x,$=()=>W(A,L);F?F(h.el,L,$):$()}else L()},Ts=(h,g)=>{let A;for(;h!==g;)A=k(h),t(h),h=A;t(g)},ys=(h,g,A)=>{const{bum:D,scope:x,update:L,subTree:W,um:F}=h;D&&Xe(D),x.stop(),L&&(L.active=!1,jn(W,h,g,A)),F&&Kn(F,g),Kn(()=>{h.isUnmounted=!0},g),g&&g.pendingBranch&&!g.isUnmounted&&h.asyncDep&&!h.asyncResolved&&h.suspenseId===g.pendingId&&(g.deps--,g.deps===0&&g.resolve())},In=(h,g,A,D=!1,x=!1,L=0)=>{for(let W=L;W<h.length;W++)jn(h[W],g,A,D,x)},T=h=>h.shapeFlag&6?T(h.component.subTree):h.shapeFlag&128?h.suspense.next():k(h.anchor||h.el),z=(h,g,A)=>{h==null?g._vnode&&jn(g._vnode,null,null,!0):E(g._vnode||null,h,g,null,null,null,A),Jp(),at(),g._vnode=h},N={p:E,um:jn,m:ts,r:Zn,mt:Tn,mc:P,pc:q,pbc:H,n:T,o:n};let X,kn;return s&&([X,kn]=s(N)),{render:z,hydrate:X,createApp:av(z,X)}}function sa({effect:n,update:s},a){n.allowRecurse=s.allowRecurse=a}function Xl(n,s){return(!n||n&&!n.pendingBranch)&&s&&!s.persisted}function Yl(n,s,a=!1){const e=n.children,t=s.children;if(nn(e)&&nn(t))for(let o=0;o<e.length;o++){const p=e[o];let l=t[o];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=t[o]=zs(t[o]),l.el=p.el),a||Yl(p,l)),l.type===Fa&&(l.el=p.el)}}function uv(n){const s=n.slice(),a=[0];let e,t,o,p,l;const r=n.length;for(e=0;e<r;e++){const i=n[e];if(i!==0){if(t=a[a.length-1],n[t]<i){s[e]=t,a.push(e);continue}for(o=0,p=a.length-1;o<p;)l=o+p>>1,n[a[l]]<i?o=l+1:p=l;i<n[a[o]]&&(o>0&&(s[e]=a[o-1]),a[o]=e)}}for(o=a.length,p=a[o-1];o-- >0;)a[o]=p,p=s[p];return a}const dv=n=>n.__isTeleport,zn=Symbol.for("v-fgt"),Fa=Symbol.for("v-txt"),es=Symbol.for("v-cmt"),pe=Symbol.for("v-stc"),ce=[];let fs=null;function Zl(n=!1){ce.push(fs=n?null:[])}function vv(){ce.pop(),fs=ce[ce.length-1]||null}let fe=1;function sc(n){fe+=n}function Ql(n){return n.dynamicChildren=fe>0?fs||Ba:null,vv(),fe>0&&fs&&fs.push(n),n}function zb(n,s,a,e,t,o){return Ql(ai(n,s,a,e,t,o,!0))}function ni(n,s,a,e,t){return Ql(xn(n,s,a,e,t,!0))}function ct(n){return n?n.__v_isVNode===!0:!1}function ta(n,s){return n.type===s.type&&n.key===s.key}const Et="__vInternal",si=({key:n})=>n??null,Ye=({ref:n,ref_key:s,ref_for:a})=>(typeof n=="number"&&(n=""+n),n!=null?rn(n)||Mn(n)||tn(n)?{i:Nn,r:n,k:s,f:!!a}:n:null);function ai(n,s=null,a=null,e=0,t=null,o=n===zn?0:1,p=!1,l=!1){const r={__v_isVNode:!0,__v_skip:!0,type:n,props:s,key:s&&si(s),ref:s&&Ye(s),scopeId:bt,slotScopeIds:null,children:a,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:o,patchFlag:e,dynamicProps:t,dynamicChildren:null,appContext:null,ctx:Nn};return l?(Xo(r,a),o&128&&n.normalize(r)):a&&(r.shapeFlag|=rn(a)?8:16),fe>0&&!p&&fs&&(r.patchFlag>0||o&6)&&r.patchFlag!==32&&fs.push(r),r}const xn=kv;function kv(n,s=null,a=null,e=0,t=null,o=!1){if((!n||n===Id)&&(n=es),ct(n)){const l=Xs(n,s,!0);return a&&Xo(l,a),fe>0&&!o&&fs&&(l.shapeFlag&6?fs[fs.indexOf(n)]=l:fs.push(l)),l.patchFlag|=-2,l}if(Sv(n)&&(n=n.__vccOpts),s){s=mv(s);let{class:l,style:r}=s;l&&!rn(l)&&(s.class=Po(l)),wn(r)&&(wl(r)&&!nn(r)&&(r=Vn({},r)),s.style=Io(r))}const p=rn(n)?1:Vd(n)?128:dv(n)?64:wn(n)?4:tn(n)?2:0;return ai(n,s,a,e,t,p,o,!0)}function mv(n){return n?wl(n)||Et in n?Vn({},n):n:null}function Xs(n,s,a=!1){const{props:e,ref:t,patchFlag:o,children:p}=n,l=s?fv(e||{},s):e;return{__v_isVNode:!0,__v_skip:!0,type:n.type,props:l,key:l&&si(l),ref:s&&s.ref?a&&t?nn(t)?t.concat(Ye(s)):[t,Ye(s)]:Ye(s):t,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:p,target:n.target,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:s&&n.type!==zn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:n.transition,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Xs(n.ssContent),ssFallback:n.ssFallback&&Xs(n.ssFallback),el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce}}function ei(n=" ",s=0){return xn(Fa,null,n,s)}function Gb(n,s){const a=xn(pe,null,n);return a.staticCount=s,a}function Ub(n="",s=!1){return s?(Zl(),ni(es,null,n)):xn(es,null,n)}function ks(n){return n==null||typeof n=="boolean"?xn(es):nn(n)?xn(zn,null,n.slice()):typeof n=="object"?zs(n):xn(Fa,null,String(n))}function zs(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Xs(n)}function Xo(n,s){let a=0;const{shapeFlag:e}=n;if(s==null)s=null;else if(nn(s))a=16;else if(typeof s=="object")if(e&65){const t=s.default;t&&(t._c&&(t._d=!1),Xo(n,t()),t._c&&(t._d=!0));return}else{a=32;const t=s._;!t&&!(Et in s)?s._ctx=Nn:t===3&&Nn&&(Nn.slots._===1?s._=1:(s._=2,n.patchFlag|=1024))}else tn(s)?(s={default:s,_ctx:Nn},a=32):(s=String(s),e&64?(a=16,s=[ei(s)]):a=8);n.children=s,n.shapeFlag|=a}function fv(...n){const s={};for(let a=0;a<n.length;a++){const e=n[a];for(const t in e)if(t==="class")s.class!==e.class&&(s.class=Po([s.class,e.class]));else if(t==="style")s.style=Io([s.style,e.style]);else if(ge(t)){const o=s[t],p=e[t];p&&o!==p&&!(nn(o)&&o.includes(p))&&(s[t]=o?[].concat(o,p):p)}else t!==""&&(s[t]=e[t])}return s}function ps(n,s,a,e=null){ls(n,s,7,[a,e])}const hv=Wl();let bv=0;function gv(n,s,a){const e=n.type,t=(s?s.appContext:n.appContext)||hv,o={uid:bv++,vnode:n,type:e,parent:s,appContext:t,root:null,next:null,subTree:null,effect:null,update:null,scope:new zu(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:s?s.provides:Object.create(t.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Gl(e,t),emitsOptions:Ll(e,t),emit:null,emitted:null,propsDefaults:Sn,inheritAttrs:e.inheritAttrs,ctx:Sn,data:Sn,props:Sn,attrs:Sn,slots:Sn,refs:Sn,setupState:Sn,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:a,suspenseId:a?a.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return o.ctx={_:o},o.root=s?s.root:o,o.emit=Dd.bind(null,o),n.ce&&n.ce(o),o}let Fn=null;const Zs=()=>Fn||Nn;let Yo,ya,ac="__VUE_INSTANCE_SETTERS__";(ya=to()[ac])||(ya=to()[ac]=[]),ya.push(n=>Fn=n),Yo=n=>{ya.length>1?ya.forEach(s=>s(n)):ya[0](n)};const Ma=n=>{Yo(n),n.scope.on()},ra=()=>{Fn&&Fn.scope.off(),Yo(null)};function ti(n){return n.vnode.shapeFlag&4}let ja=!1;function Ev(n,s=!1){ja=s;const{props:a,children:e}=n.vnode,t=ti(n);ev(n,a,t,s),pv(n,e);const o=t?yv(n,s):void 0;return ja=!1,o}function yv(n,s){const a=n.type;n.accessCache=Object.create(null),n.proxy=Sl(new Proxy(n.ctx,Kd));const{setup:e}=a;if(e){const t=n.setupContext=e.length>1?Av(n):null;Ma(n),za();const o=qs(e,n,0,[n.props,t]);if(Ga(),ra(),cl(o)){if(o.then(ra,ra),s)return o.then(p=>{ec(n,p,s)}).catch(p=>{_e(p,n,0)});n.asyncDep=o}else ec(n,o,s)}else oi(n,s)}function ec(n,s,a){tn(s)?n.type.__ssrInlineRender?n.ssrRender=s:n.render=s:wn(s)&&(n.setupState=Bl(s)),oi(n,a)}let tc;function oi(n,s,a){const e=n.type;if(!n.render){if(!s&&tc&&!e.render){const t=e.template||qo(n).template;if(t){const{isCustomElement:o,compilerOptions:p}=n.appContext.config,{delimiters:l,compilerOptions:r}=e,i=Vn(Vn({isCustomElement:o,delimiters:l},p),r);e.render=tc(t,i)}}n.render=e.render||Ss}{Ma(n),za();try{Xd(n)}finally{Ga(),ra()}}}function _v(n){return n.attrsProxy||(n.attrsProxy=new Proxy(n.attrs,{get(s,a){return Yn(n,"get","$attrs"),s[a]}}))}function Av(n){const s=a=>{n.exposed=a||{}};return{get attrs(){return _v(n)},slots:n.slots,emit:n.emit,expose:s}}function yt(n){if(n.exposed)return n.exposeProxy||(n.exposeProxy=new Proxy(Bl(Sl(n.exposed)),{get(s,a){if(a in s)return s[a];if(a in oe)return oe[a](n)},has(s,a){return a in s||a in oe}}))}function wv(n,s=!0){return tn(n)?n.displayName||n.name:n.name||s&&n.__name}function Sv(n){return tn(n)&&"__vccOpts"in n}const w=(n,s)=>_d(n,s,ja);function c(n,s,a){const e=arguments.length;return e===2?wn(s)&&!nn(s)?ct(s)?xn(n,null,[s]):xn(n,s):xn(n,null,s):(e>3?a=Array.prototype.slice.call(arguments,2):e===3&&ct(a)&&(a=[a]),xn(n,s,a))}const Rv=Symbol.for("v-scx"),Bv=()=>dn(Rv),Dv="3.3.9",Tv="http://www.w3.org/2000/svg",oa=typeof document<"u"?document:null,oc=oa&&oa.createElement("template"),Cv={insert:(n,s,a)=>{s.insertBefore(n,a||null)},remove:n=>{const s=n.parentNode;s&&s.removeChild(n)},createElement:(n,s,a,e)=>{const t=s?oa.createElementNS(Tv,n):oa.createElement(n,a?{is:a}:void 0);return n==="select"&&e&&e.multiple!=null&&t.setAttribute("multiple",e.multiple),t},createText:n=>oa.createTextNode(n),createComment:n=>oa.createComment(n),setText:(n,s)=>{n.nodeValue=s},setElementText:(n,s)=>{n.textContent=s},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>oa.querySelector(n),setScopeId(n,s){n.setAttribute(s,"")},insertStaticContent(n,s,a,e,t,o){const p=a?a.previousSibling:s.lastChild;if(t&&(t===o||t.nextSibling))for(;s.insertBefore(t.cloneNode(!0),a),!(t===o||!(t=t.nextSibling)););else{oc.innerHTML=e?`<svg>${n}</svg>`:n;const l=oc.content;if(e){const r=l.firstChild;for(;r.firstChild;)l.appendChild(r.firstChild);l.removeChild(r)}s.insertBefore(l,a)}return[p?p.nextSibling:s.firstChild,a?a.previousSibling:s.lastChild]}},Hs="transition",Za="animation",Na=Symbol("_vtc"),Ys=(n,{slots:s})=>c(jd,ci(n),s);Ys.displayName="Transition";const pi={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},xv=Ys.props=Vn({},Ml,pi),aa=(n,s=[])=>{nn(n)?n.forEach(a=>a(...s)):n&&n(...s)},pc=n=>n?nn(n)?n.some(s=>s.length>1):n.length>1:!1;function ci(n){const s={};for(const J in n)J in pi||(s[J]=n[J]);if(n.css===!1)return s;const{name:a="v",type:e,duration:t,enterFromClass:o=`${a}-enter-from`,enterActiveClass:p=`${a}-enter-active`,enterToClass:l=`${a}-enter-to`,appearFromClass:r=o,appearActiveClass:i=p,appearToClass:d=l,leaveFromClass:v=`${a}-leave-from`,leaveActiveClass:k=`${a}-leave-active`,leaveToClass:m=`${a}-leave-to`}=n,b=Lv(t),E=b&&b[0],S=b&&b[1],{onBeforeEnter:y,onEnter:B,onEnterCancelled:_,onLeave:R,onLeaveCancelled:I,onBeforeAppear:C=y,onAppear:M=B,onAppearCancelled:P=_}=s,V=(J,sn,Tn)=>{Js(J,sn?d:l),Js(J,sn?i:p),Tn&&Tn()},H=(J,sn)=>{J._isLeaving=!1,Js(J,v),Js(J,m),Js(J,k),sn&&sn()},Y=J=>(sn,Tn)=>{const Bn=J?M:B,G=()=>V(sn,J,Tn);aa(Bn,[sn,G]),cc(()=>{Js(sn,J?r:o),xs(sn,J?d:l),pc(Bn)||lc(sn,e,E,G)})};return Vn(s,{onBeforeEnter(J){aa(y,[J]),xs(J,o),xs(J,p)},onBeforeAppear(J){aa(C,[J]),xs(J,r),xs(J,i)},onEnter:Y(!1),onAppear:Y(!0),onLeave(J,sn){J._isLeaving=!0;const Tn=()=>H(J,sn);xs(J,v),ii(),xs(J,k),cc(()=>{J._isLeaving&&(Js(J,v),xs(J,m),pc(R)||lc(J,e,S,Tn))}),aa(R,[J,Tn])},onEnterCancelled(J){V(J,!1),aa(_,[J])},onAppearCancelled(J){V(J,!0),aa(P,[J])},onLeaveCancelled(J){H(J),aa(I,[J])}})}function Lv(n){if(n==null)return null;if(wn(n))return[Mt(n.enter),Mt(n.leave)];{const s=Mt(n);return[s,s]}}function Mt(n){return Mu(n)}function xs(n,s){s.split(/\s+/).forEach(a=>a&&n.classList.add(a)),(n[Na]||(n[Na]=new Set)).add(s)}function Js(n,s){s.split(/\s+/).forEach(e=>e&&n.classList.remove(e));const a=n[Na];a&&(a.delete(s),a.size||(n[Na]=void 0))}function cc(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let Ov=0;function lc(n,s,a,e){const t=n._endId=++Ov,o=()=>{t===n._endId&&e()};if(a)return setTimeout(o,a);const{type:p,timeout:l,propCount:r}=li(n,s);if(!p)return e();const i=p+"end";let d=0;const v=()=>{n.removeEventListener(i,k),o()},k=m=>{m.target===n&&++d>=r&&v()};setTimeout(()=>{d<r&&v()},l+1),n.addEventListener(i,k)}function li(n,s){const a=window.getComputedStyle(n),e=b=>(a[b]||"").split(", "),t=e(`${Hs}Delay`),o=e(`${Hs}Duration`),p=ic(t,o),l=e(`${Za}Delay`),r=e(`${Za}Duration`),i=ic(l,r);let d=null,v=0,k=0;s===Hs?p>0&&(d=Hs,v=p,k=o.length):s===Za?i>0&&(d=Za,v=i,k=r.length):(v=Math.max(p,i),d=v>0?p>i?Hs:Za:null,k=d?d===Hs?o.length:r.length:0);const m=d===Hs&&/\b(transform|all)(,|$)/.test(e(`${Hs}Property`).toString());return{type:d,timeout:v,propCount:k,hasTransform:m}}function ic(n,s){for(;n.length<s.length;)n=n.concat(n);return Math.max(...s.map((a,e)=>rc(a)+rc(n[e])))}function rc(n){return n==="auto"?0:Number(n.slice(0,-1).replace(",","."))*1e3}function ii(){return document.body.offsetHeight}function Iv(n,s,a){const e=n[Na];e&&(s=(s?[s,...e]:[...e]).join(" ")),s==null?n.removeAttribute("class"):a?n.setAttribute("class",s):n.className=s}const Zo=Symbol("_vod"),qb={beforeMount(n,{value:s},{transition:a}){n[Zo]=n.style.display==="none"?"":n.style.display,a&&s?a.beforeEnter(n):Qa(n,s)},mounted(n,{value:s},{transition:a}){a&&s&&a.enter(n)},updated(n,{value:s,oldValue:a},{transition:e}){!s!=!a&&(e?s?(e.beforeEnter(n),Qa(n,!0),e.enter(n)):e.leave(n,()=>{Qa(n,!1)}):Qa(n,s))},beforeUnmount(n,{value:s}){Qa(n,s)}};function Qa(n,s){n.style.display=s?n[Zo]:"none"}function Pv(n,s,a){const e=n.style,t=rn(a);if(a&&!t){if(s&&!rn(s))for(const o in s)a[o]==null&&ko(e,o,"");for(const o in a)ko(e,o,a[o])}else{const o=e.display;t?s!==a&&(e.cssText=a):s&&n.removeAttribute("style"),Zo in n&&(e.display=o)}}const uc=/\s*!important$/;function ko(n,s,a){if(nn(a))a.forEach(e=>ko(n,s,e));else if(a==null&&(a=""),s.startsWith("--"))n.setProperty(s,a);else{const e=Vv(n,s);uc.test(a)?n.setProperty(va(e),a.replace(uc,""),"important"):n[e]=a}}const dc=["Webkit","Moz","ms"],jt={};function Vv(n,s){const a=jt[s];if(a)return a;let e=rs(s);if(e!=="filter"&&e in n)return jt[s]=e;e=Ee(e);for(let t=0;t<dc.length;t++){const o=dc[t]+e;if(o in n)return jt[s]=o}return s}const vc="http://www.w3.org/1999/xlink";function Fv(n,s,a,e,t){if(e&&s.startsWith("xlink:"))a==null?n.removeAttributeNS(vc,s.slice(6,s.length)):n.setAttributeNS(vc,s,a);else{const o=Wu(s);a==null||o&&!rl(a)?n.removeAttribute(s):n.setAttribute(s,o?"":a)}}function Mv(n,s,a,e,t,o,p){if(s==="innerHTML"||s==="textContent"){e&&p(e,t,o),n[s]=a??"";return}const l=n.tagName;if(s==="value"&&l!=="PROGRESS"&&!l.includes("-")){n._value=a;const i=l==="OPTION"?n.getAttribute("value"):n.value,d=a??"";i!==d&&(n.value=d),a==null&&n.removeAttribute(s);return}let r=!1;if(a===""||a==null){const i=typeof n[s];i==="boolean"?a=rl(a):a==null&&i==="string"?(a="",r=!0):i==="number"&&(a=0,r=!0)}try{n[s]=a}catch{}r&&n.removeAttribute(s)}function Aa(n,s,a,e){n.addEventListener(s,a,e)}function jv(n,s,a,e){n.removeEventListener(s,a,e)}const kc=Symbol("_vei");function Nv(n,s,a,e,t=null){const o=n[kc]||(n[kc]={}),p=o[s];if(e&&p)p.value=e;else{const[l,r]=Hv(s);if(e){const i=o[s]=Wv(e,t);Aa(n,l,i,r)}else p&&(jv(n,l,p,r),o[s]=void 0)}}const mc=/(?:Once|Passive|Capture)$/;function Hv(n){let s;if(mc.test(n)){s={};let e;for(;e=n.match(mc);)n=n.slice(0,n.length-e[0].length),s[e[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):va(n.slice(2)),s]}let Nt=0;const $v=Promise.resolve(),Jv=()=>Nt||($v.then(()=>Nt=0),Nt=Date.now());function Wv(n,s){const a=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=a.attached)return;ls(zv(e,a.value),s,5,[e])};return a.value=n,a.attached=Jv(),a}function zv(n,s){if(nn(s)){const a=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{a.call(n),n._stopped=!0},s.map(e=>t=>!t._stopped&&e&&e(t))}else return s}const fc=/^on[a-z]/,Gv=(n,s,a,e,t=!1,o,p,l,r)=>{s==="class"?Iv(n,e,t):s==="style"?Pv(n,a,e):ge(s)?xo(s)||Nv(n,s,a,e,p):(s[0]==="."?(s=s.slice(1),!0):s[0]==="^"?(s=s.slice(1),!1):Uv(n,s,e,t))?Mv(n,s,e,o,p,l,r):(s==="true-value"?n._trueValue=e:s==="false-value"&&(n._falseValue=e),Fv(n,s,e,t))};function Uv(n,s,a,e){return e?!!(s==="innerHTML"||s==="textContent"||s in n&&fc.test(s)&&tn(a)):s==="spellcheck"||s==="draggable"||s==="translate"||s==="form"||s==="list"&&n.tagName==="INPUT"||s==="type"&&n.tagName==="TEXTAREA"||fc.test(s)&&rn(a)?!1:s in n}const ri=new WeakMap,ui=new WeakMap,lt=Symbol("_moveCb"),hc=Symbol("_enterCb"),di={name:"TransitionGroup",props:Vn({},xv,{tag:String,moveClass:String}),setup(n,{slots:s}){const a=Zs(),e=Fl();let t,o;return Hl(()=>{if(!t.length)return;const p=n.moveClass||`${n.name||"v"}-move`;if(!Qv(t[0].el,a.vnode.el,p))return;t.forEach(Xv),t.forEach(Yv);const l=t.filter(Zv);ii(),l.forEach(r=>{const i=r.el,d=i.style;xs(i,p),d.transform=d.webkitTransform=d.transitionDuration="";const v=i[lt]=k=>{k&&k.target!==i||(!k||/transform$/.test(k.propertyName))&&(i.removeEventListener("transitionend",v),i[lt]=null,Js(i,p))};i.addEventListener("transitionend",v)})}),()=>{const p=un(n),l=ci(p);let r=p.tag||zn;t=o,o=s.default?Go(s.default()):[];for(let i=0;i<o.length;i++){const d=o[i];d.key!=null&&me(d,ke(d,l,e,a))}if(t)for(let i=0;i<t.length;i++){const d=t[i];me(d,ke(d,l,e,a)),ri.set(d,d.el.getBoundingClientRect())}return xn(r,null,o)}}},qv=n=>delete n.mode;di.props;const Kv=di;function Xv(n){const s=n.el;s[lt]&&s[lt](),s[hc]&&s[hc]()}function Yv(n){ui.set(n,n.el.getBoundingClientRect())}function Zv(n){const s=ri.get(n),a=ui.get(n),e=s.left-a.left,t=s.top-a.top;if(e||t){const o=n.el.style;return o.transform=o.webkitTransform=`translate(${e}px,${t}px)`,o.transitionDuration="0s",n}}function Qv(n,s,a){const e=n.cloneNode(),t=n[Na];t&&t.forEach(l=>{l.split(/\s+/).forEach(r=>r&&e.classList.remove(r))}),a.split(/\s+/).forEach(l=>l&&e.classList.add(l)),e.style.display="none";const o=s.nodeType===1?s:s.parentNode;o.appendChild(e);const{hasTransform:p}=li(e);return o.removeChild(e),p}const bc=n=>{const s=n.props["onUpdate:modelValue"]||!1;return nn(s)?a=>Xe(s,a):s};function nk(n){n.target.composing=!0}function gc(n){const s=n.target;s.composing&&(s.composing=!1,s.dispatchEvent(new Event("input")))}const Ht=Symbol("_assign"),Kb={created(n,{modifiers:{lazy:s,trim:a,number:e}},t){n[Ht]=bc(t);const o=e||t.props&&t.props.type==="number";Aa(n,s?"change":"input",p=>{if(p.target.composing)return;let l=n.value;a&&(l=l.trim()),o&&(l=eo(l)),n[Ht](l)}),a&&Aa(n,"change",()=>{n.value=n.value.trim()}),s||(Aa(n,"compositionstart",nk),Aa(n,"compositionend",gc),Aa(n,"change",gc))},mounted(n,{value:s}){n.value=s??""},beforeUpdate(n,{value:s,modifiers:{lazy:a,trim:e,number:t}},o){if(n[Ht]=bc(o),n.composing)return;const p=t||n.type==="number"?eo(n.value):n.value,l=s??"";p!==l&&(document.activeElement===n&&n.type!=="range"&&(a||e&&n.value.trim()===l)||(n.value=l))}},sk=["ctrl","shift","alt","meta"],ak={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,s)=>sk.some(a=>n[`${a}Key`]&&!s.includes(a))},Xb=(n,s)=>(a,...e)=>{for(let t=0;t<s.length;t++){const o=ak[s[t]];if(o&&o(a,s))return}return n(a,...e)},ek={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Yb=(n,s)=>a=>{if(!("key"in a))return;const e=va(a.key);if(s.some(t=>t===e||ek[t]===e))return n(a)},tk=Vn({patchProp:Gv},Cv);let $t,Ec=!1;function ok(){return $t=Ec?$t:iv(tk),Ec=!0,$t}const pk=(...n)=>{const s=ok().createApp(...n),{mount:a}=s;return s.mount=e=>{const t=ck(e);if(t)return a(t,!0,t instanceof SVGElement)},s};function ck(n){return rn(n)?document.querySelector(n):n}const lk="modulepreload",ik=function(n){return"/blogs/"+n},yc={},u=function(s,a,e){if(!a||a.length===0)return s();const t=document.getElementsByTagName("link");return Promise.all(a.map(o=>{if(o=ik(o),o in yc)return;yc[o]=!0;const p=o.endsWith(".css"),l=p?'[rel="stylesheet"]':"";if(!!e)for(let d=t.length-1;d>=0;d--){const v=t[d];if(v.href===o&&(!p||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${l}`))return;const i=document.createElement("link");if(i.rel=p?"stylesheet":lk,p||(i.as="script",i.crossOrigin=""),i.href=o,document.head.appendChild(i),p)return new Promise((d,v)=>{i.addEventListener("load",d),i.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>s()).catch(o=>{const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=o,window.dispatchEvent(p),!p.defaultPrevented)throw o})},rk={"v-79fdd481":()=>u(()=>import("./home.html-B4gZh7l7.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-184f4da6":()=>u(()=>import("./intro.html-8k-OAzNI.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-8daa1a0e":()=>u(()=>import("./index.html-aQI5im6B.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-fa355bca":()=>u(()=>import("./书签.html-4Rz8oy6Y.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-c8ef6000":()=>u(()=>import("./BEM.html--1z0m7HA.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-23c53e51":()=>u(()=>import("./index.html-ue4UcLOP.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-2b29f11e":()=>u(()=>import("./index.html-WcSf4EOm.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-43809fe2":()=>u(()=>import("./混合开发.html-xiwVNzRC.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-0886bc3a":()=>u(()=>import("./index.html-j6T7lBxF.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-26f7fea7":()=>u(()=>import("./index.html-IeLYknW3.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-21abf927":()=>u(()=>import("./1px边框问题.html-H5WS3h-V.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-43526187":()=>u(()=>import("./index.html-LDI7Wck2.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-7bd5b2a4":()=>u(()=>import("./图片模糊问题.html-bCZ6911i.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-b3116612":()=>u(()=>import("./移动端基本概念.html-1rqaObkr.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-4391364e":()=>u(()=>import("./移动端常见问题.html-y6-zUUI5.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-62e5be3a":()=>u(()=>import("./移动端适配.html-8pP8VdCI.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-673a6bc7":()=>u(()=>import("./index.html-OU2BYxCy.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-8ea04c9c":()=>u(()=>import("./index.html-IjnzkmNv.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-ba4fd208":()=>u(()=>import("./基础知识.html-B6c8sgR1.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-4caddbf2":()=>u(()=>import("./demo.html-mLVEMzNQ.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-44f61baf":()=>u(()=>import("./index.html-PYJJsFAX.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-257e2e18":()=>u(()=>import("./tsconfig配置.html-mOHcYX_l.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-2e35194d":()=>u(()=>import("./TypeScriptTips.html-WazGlmO0.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-689800b5":()=>u(()=>import("./TypeScript其他类型.html-MDxrkULC.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-7350df02":()=>u(()=>import("./TypeScript基础类型.html-g0mogkfS.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-7c6b1182":()=>u(()=>import("./TypeScript声明文件.html-pk91lebB.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-c89b30e6":()=>u(()=>import("./TypeScript实现Promise.html-lMESadi3.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-69172050":()=>u(()=>import("./TypeScript实现Vuex.html-t-QFy37_.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-1c82787f":()=>u(()=>import("./TypeScript控制反转和依赖注入.html-ed6ejy_X.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-10930fde":()=>u(()=>import("./TypeScript装饰器.html-iuYXGbwA.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-23ce3816":()=>u(()=>import("./H5直播点赞动画.html-x4_Nir-R.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-50268bbe":()=>u(()=>import("./index.html-B1nbfLGq.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-976b51c4":()=>u(()=>import("./git_head.html-dysHoC0m.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-0052c16d":()=>u(()=>import("./git命令.html-a-UEfbm7.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-7a0cb75d":()=>u(()=>import("./git基础.html-_JSGFC3G.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-1b67107a":()=>u(()=>import("./git对象.html-a8AXxDVY.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-1fdad470":()=>u(()=>import("./git忽略提交.html-SRoLEGYV.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-6167e984":()=>u(()=>import("./git技巧.html-RWNVdJ_d.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-bfb62730":()=>u(()=>import("./git相关问题.html-4boh46IG.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-151a966e":()=>u(()=>import("./index.html-odBwZTxW.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-5c93f7ea":()=>u(()=>import("./index.html-5JbOW1RI.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-670514ca":()=>u(()=>import("./加密.html-mIqx-Fq3.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-59cac0a5":()=>u(()=>import("./index.html-QHRCcG1i.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-0871403a":()=>u(()=>import("./VSCode插件.html-2Nr0aoXR.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-2c988428":()=>u(()=>import("./whistle.html-FdCE5mkS.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-41461593":()=>u(()=>import("./基础知识.html--A0pfi3u.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-636aaf48":()=>u(()=>import("./index.html-ZH7KlcA3.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-4e11db22":()=>u(()=>import("./SQL基础.html-ehIGVtew.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-36637eec":()=>u(()=>import("./index.html-n93t-pWr.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-99865ade":()=>u(()=>import("./index.html-e7q-wdT6.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-1c4c4ee8":()=>u(()=>import("./index.html-suow3zEN.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-71a020ac":()=>u(()=>import("./index.html-bfvqiYa0.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-1fa12809":()=>u(()=>import("./Q_A.html-4qk7aWWK.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-3dc6ebba":()=>u(()=>import("./index.html-sXDUmkEH.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-833597ac":()=>u(()=>import("./index.html-9u6fl3a_.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-62424824":()=>u(()=>import("./编程规范.html-h7a1zRAK.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-55612a68":()=>u(()=>import("./index.html-nSMwaOUJ.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-0d70097e":()=>u(()=>import("./基础模块实现.html-0LD7EFwF.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-030d03ee":()=>u(()=>import("./index.html-WriP7tBk.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-65722b2c":()=>u(()=>import("./index.html-O_PTG2kG.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-446036c2":()=>u(()=>import("./基础知识.html-yBGeRvzF.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-68bd4d46":()=>u(()=>import("./index.html-SDWznuRH.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-287f093c":()=>u(()=>import("./index.html-N9yC-E72.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-5886c4c8":()=>u(()=>import("./index.html-UY6_T8Lc.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-7a7e1996":()=>u(()=>import("./BFC.html-CNO6xRpH.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-3006fe90":()=>u(()=>import("./float.html-6BeXFuMi.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-15a85434":()=>u(()=>import("./line-height.html-L6p3rQxC.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-65a77d50":()=>u(()=>import("./vertical-align.html-PIT828k0.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-41b5b0bc":()=>u(()=>import("./x-height.html-EF4RmMjl.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-2ff96c77":()=>u(()=>import("./内联元素.html-Dp1o92G1.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-21eed46d":()=>u(()=>import("./Flex布局.html-b174ux8x.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-720c3b00":()=>u(()=>import("./Grid布局.html-OsIMj2p6.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-4c4838f4":()=>u(()=>import("./StickyFooter.html-x4TPluJb.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-47d8203e":()=>u(()=>import("./全屏布局.html-aXAPtuqV.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-f50e88c6":()=>u(()=>import("./多列布局.html-4LSiqdI4.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-7d830ca2":()=>u(()=>import("./栅格布局.html-7y0WzluN.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-4d050f5a":()=>u(()=>import("./水平垂直居中.html-15VQlri1.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-61734615":()=>u(()=>import("./自适应布局.html-5zi9TJQh.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-57ec9a83":()=>u(()=>import("./页面等比适配.html-Rf01pM5K.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-5eab4c22":()=>u(()=>import("./CSS实现长宽比.html-wPnLDg93.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-7094c4e3":()=>u(()=>import("./CSS常用封装.html-DQFt239O.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-1c65c6c7":()=>u(()=>import("./file.html-DLio3eNW.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-1671a938":()=>u(()=>import("./navigator.html-z1342m4e.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-35eb2514":()=>u(()=>import("./storage.html-7FomSPqM.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-20bf9dc0":()=>u(()=>import("./URL.html-35-GPCs9.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-7bd0135a":()=>u(()=>import("./window.html-Bsdq6gDX.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-ffa7a9c8":()=>u(()=>import("./canvas优化.html-9jY4kwOT.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-29164ffb":()=>u(()=>import("./canvas使用图像.html-dDaMjZa7.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-d93841de":()=>u(()=>import("./canvas像素操作.html-KqpVpAeP.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-dd57719a":()=>u(()=>import("./canvas变形.html-oxnieJ5a.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-45bae330":()=>u(()=>import("./canvas合成与裁剪.html-zDbMKSXL.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-fc72bcde":()=>u(()=>import("./canvas基本动画.html-Vbket26p.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-9f4befce":()=>u(()=>import("./canvas基础.html-KeB2juaR.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-ff8bc21e":()=>u(()=>import("./canvas添加样式.html-WEtP8w97.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-6b104240":()=>u(()=>import("./canvas绘制形状.html-DnQd6Z-O.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-46431f48":()=>u(()=>import("./canvas绘制文本.html-p3epSEDZ.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-1aa3ff6c":()=>u(()=>import("./css.html-754JBLuA.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-5e930d8a":()=>u(()=>import("./document.html-oFFfr3ls.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-bd32a61e":()=>u(()=>import("./element.html-KPJ5gqg8.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-406b4113":()=>u(()=>import("./event.html-07WJLrPK.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-3dad0466":()=>u(()=>import("./MutationObserver.html-9POqMn6q.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-63a47f03":()=>u(()=>import("./node.html-KDhybMYf.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-0a3ae346":()=>u(()=>import("./other.html-dAXfSnzz.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-15506043":()=>u(()=>import("./WebComponents.html-UYCpy8mX.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-7ee4b871":()=>u(()=>import("./svgSMIL动画.html-vWvboKdf.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-30557de4":()=>u(()=>import("./svg动画.html-xgHIVSY5.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-4c6a57cf":()=>u(()=>import("./svg基础.html-CDrVTV5d.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-2088aab7":()=>u(()=>import("./基于anime.js的svg动画.html-_Xkrhu9H.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-7a9286be":()=>u(()=>import("./01.编程语言通识.html-5j-GphdK.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-0018d32b":()=>u(()=>import("./02.JavaScript词法和类型.html-U_pThRGI.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-78ee3839":()=>u(()=>import("./03.表达式和类型转换.html-Dc2-317-.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-3368bed0":()=>u(()=>import("./04.语句和对象.html-ZYJZiNAB.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-cc16ae08":()=>u(()=>import("./API.html-zRZ1K7OW.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-fee2cd06":()=>u(()=>import("./ArrayBuffer.html-1K3xx3CT.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-655a227a":()=>u(()=>import("./async.html-1rNmYlL5.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-1d90551e":()=>u(()=>import("./Class.html-9gBDBXvL.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-15ea3110":()=>u(()=>import("./EventLoop.html-enV19Jr1.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-37215e23":()=>u(()=>import("./Generator.html-mFiwCE9q.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-f914a298":()=>u(()=>import("./JSON.html-4Pycwz7a.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-d6e951ee":()=>u(()=>import("./Math和Date.html-MRnyevfE.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-2e3c4fca":()=>u(()=>import("./Promise.html-6Ech1pVU.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-697eefb9":()=>u(()=>import("./Reflect.html-2OJzVWG8.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-3628e31a":()=>u(()=>import("./RegExp.html-x98ikP7R.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-8d988142":()=>u(()=>import("./Set和Map.html-oHAkvbLh.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-38550274":()=>u(()=>import("./作用域与闭包.html-7CO9vtwo.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-69bed66c":()=>u(()=>import("./函数.html-eaA_l1ke.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-c29ddc06":()=>u(()=>import("./原型与继承.html-pHJLTRAf.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-20a2080e":()=>u(()=>import("./基础类型.html-L1lCkT3b.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-6e901b6a":()=>u(()=>import("./对象.html-Z7Aq5Es4.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-a3e5affa":()=>u(()=>import("./异步.html-tR-1wtBv.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-5d611e5e":()=>u(()=>import("./数组.html-IKADkD_N.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-d59d1c2c":()=>u(()=>import("./类型概述.html-_AYLhigB.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-a3cd6e62":()=>u(()=>import("./网络请求.html-DBkcfn3s.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-34f1796f":()=>u(()=>import("./工具函数.html-B5hdZTv6.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-35e7f165":()=>u(()=>import("./手写代码.html-V77MgsY2.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-c21536aa":()=>u(()=>import("./网页截屏.html-OGg5xbYO.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-46e62e58":()=>u(()=>import("./index.html-s4TSTqDS.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-1e92ab56":()=>u(()=>import("./SOLID.html-_TIN6-s5.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-43efc7e4":()=>u(()=>import("./创建型设计模式.html-lteWo6Q_.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-0e378c3a":()=>u(()=>import("./结构型设计模式.html-874lzavV.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-6be214f8":()=>u(()=>import("./行为型设计模式.html-pWrIJW08.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-378ddb9a":()=>u(()=>import("./其他优化.html-hMv_xvSK.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-74eb89d7":()=>u(()=>import("./处理海量数据.html-r72idC9G.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-1bef6390":()=>u(()=>import("./渲染控制.html-RXSXswvM.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-5c9b76e6":()=>u(()=>import("./渲染调优.html-m3vq9u3n.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-38deb022":()=>u(()=>import("./Context.html-9qeUkdvA.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-612d55f6":()=>u(()=>import("./Fiber.html-aytA841C.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-91bf567e":()=>u(()=>import("./Hooks.html-gfNL9lfx.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-eae5c6c8":()=>u(()=>import("./React位运算.html-8AG95MnZ.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-639279dd":()=>u(()=>import("./Reconciler.html-jkrOAHpL.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-02b4b2d4":()=>u(()=>import("./Scheduler.html-JrO9u1GA.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-2d09c55a":()=>u(()=>import("./事件系统.html-aBtvhUft.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-072550d3":()=>u(()=>import("./Context.html-M6kNHi1w.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-17a5c29a":()=>u(()=>import("./JSX.html-LrCHkihl.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-393169d8":()=>u(()=>import("./LifeCycle.html-Mym2GQS6.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-52e16bf2":()=>u(()=>import("./Props.html-bDYxByPW.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-696c11e4":()=>u(()=>import("./React组件.html-gtuarXfi.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-034a88ef":()=>u(()=>import("./Ref.html-bTiuSrcB.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-65ab3d71":()=>u(()=>import("./State.html-6VHBJxBK.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-0b82ffbb":()=>u(()=>import("./Transition.html-CIg4Nxwf.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-1dca019c":()=>u(()=>import("./useSyncExternalStore.html-H1jQi50p.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-3d99be36":()=>u(()=>import("./基础知识.html-_JeqIO5I.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-2595cd5b":()=>u(()=>import("./模块化CSS.html-zFRIeeyx.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-55437d44":()=>u(()=>import("./自定义Hooks.html-AAFDiFuF.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-5a3976f8":()=>u(()=>import("./高阶组件.html-UaL32sJ8.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-094754f4":()=>u(()=>import("./react-redux.html-nV8bzLm2.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-21191fa2":()=>u(()=>import("./react-router.html-YmVdIbD6.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-426d051c":()=>u(()=>import("./Vue2基础.html-8XmbuND5.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-04f29fb0":()=>u(()=>import("./Vue2实现原理.html-4W7u90ZP.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-55ffc80d":()=>u(()=>import("./Vue2实用技巧.html-y2wbAzKz.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-61469c82":()=>u(()=>import("./Vue2相关组件实现.html-AE2XKMo4.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-511dd236":()=>u(()=>import("./Vue2组件通信方式.html-At1-N6QL.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-6db912e3":()=>u(()=>import("./VueRouter.html-9wQ1KRpQ.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-5db1d7ae":()=>u(()=>import("./Vuex.html-Q-4yER8Q.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-8fe351e0":()=>u(()=>import("./vue-router.html-UaN5pxjY.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-6f01d847":()=>u(()=>import("./vue-vuex.html-T_vsxQLE.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-3a2ef9ba":()=>u(()=>import("./响应式.html-lvlFP2Ps.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-58a23187":()=>u(()=>import("./数据驱动.html-5IA2GMqa.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-371374c0":()=>u(()=>import("./组件化.html-YH9UQ6mo.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-4f490448":()=>u(()=>import("./编译.html-ZQEHaQV0.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-20d07a24":()=>u(()=>import("./Vue3CompositionAPI.html-VPVF9ClG.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-57ee0de7":()=>u(()=>import("./Webpack优化.html-pDwXMaM6.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-55793d7f":()=>u(()=>import("./Webpack原理.html-lV0o3wWl.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-112de4bc":()=>u(()=>import("./babel.html-mgwwlEi0.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-e97b0c7e":()=>u(()=>import("./CSS模块化.html-qTeqKqz3.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-37d71f2e":()=>u(()=>import("./devServer.html-TsaF7VYp.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-f257debe":()=>u(()=>import("./JS模块化.html-p15D74_2.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-a9d76734":()=>u(()=>import("./loaders.html-9tSNUJY0.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-acba98f4":()=>u(()=>import("./plugins.html--3QgwQ3y.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-d15facf0":()=>u(()=>import("./多页面配置.html-9MFqvzWp.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-47ce4e58":()=>u(()=>import("./核心概念.html-Y-SyFB9Y.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-09431e95":()=>u(()=>import("./编写loader.html-Anf0N28e.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-19bb5375":()=>u(()=>import("./编写plugin.html-j_pSVdCR.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-0cb8d7e7":()=>u(()=>import("./EMP.html-fjFWLoQ9.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-e73dad02":()=>u(()=>import("./Garfish.html-KwJyhzba.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-5aadedb4":()=>u(()=>import("./MicroApp.html-FkzHpeIx.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-23baba10":()=>u(()=>import("./qiankun.html-Q5Vt8ICC.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-b1ed33b8":()=>u(()=>import("./single-spa.html-FZViKg_R.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-3880926b":()=>u(()=>import("./index.html-B6wjGuz9.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-4cfafc7b":()=>u(()=>import("./event.html-HAGIrHie.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-64a7aa10":()=>u(()=>import("./keep-alive.html-apzf34pz.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-2f2b981f":()=>u(()=>import("./slot.html-5yJyw1gh.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-3d3ea028":()=>u(()=>import("./transition.html-yZRzxXTt.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-20ad8c03":()=>u(()=>import("./v-model.html-Y_u8AwW_.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-ea97c948":()=>u(()=>import("./词法.html-tpf1X5p0.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-78d4e833":()=>u(()=>import("./语法.html-Uz9VXMrn.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-0da3b39c":()=>u(()=>import("./index.html-nNEQFK8_.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-58af1b76":()=>u(()=>import("./index.html-cGqzlPiM.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-6435cc7a":()=>u(()=>import("./index.html-d28_U72L.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-48f60179":()=>u(()=>import("./事件循环.html-_MeU3Sbc.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-089c79e0":()=>u(()=>import("./函数的执行.html-1Y3u1m44.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-3d17b6aa":()=>u(()=>import("./微任务的执行.html-HGBo08ZH.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-76290d96":()=>u(()=>import("./语句级的执行.html-rDa6R8KS.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-2aedea04":()=>u(()=>import("./index.html-12vKR4fT.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-7cbcdbc6":()=>u(()=>import("./实例.html-Dw51aG3h.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-c2792460":()=>u(()=>import("./类型.html-PcTSFknR.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-3706649a":()=>u(()=>import("./404.html-aQISVs-z.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-330f6aaf":()=>u(()=>import("./index.html-u33ETBGM.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-73197d7b":()=>u(()=>import("./index.html-zeHpZXxF.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-43bb8f9e":()=>u(()=>import("./index.html-kgGsGwLE.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-a25fad8a":()=>u(()=>import("./index.html-9zGmiPKd.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-b19f66be":()=>u(()=>import("./index.html-K0-xMmB4.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-6715190e":()=>u(()=>import("./index.html-IMeOkpjF.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-0a860211":()=>u(()=>import("./index.html-P2F2xM17.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-3b15e67b":()=>u(()=>import("./index.html-6KbBn2NK.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-6ba842a2":()=>u(()=>import("./index.html--Taginuz.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-3a02bfce":()=>u(()=>import("./index.html-ALn3FT7P.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-292062d6":()=>u(()=>import("./index.html-vPFre9TD.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-455de410":()=>u(()=>import("./index.html-9L9AnWGa.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-29214b94":()=>u(()=>import("./index.html-sdLWPA9N.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-292836b2":()=>u(()=>import("./index.html-qs3I44g8.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-12acd912":()=>u(()=>import("./index.html-6kJp2WU_.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-33bce6dd":()=>u(()=>import("./index.html-jSDdT8gx.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-6e1d46a1":()=>u(()=>import("./index.html-kt_jLJw3.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-3534cc28":()=>u(()=>import("./index.html-lZtcdaX2.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-da29e3a8":()=>u(()=>import("./index.html-ZX4EUZBc.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-19ab8f78":()=>u(()=>import("./index.html-Zyt7hGj0.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-803e1cae":()=>u(()=>import("./index.html-vljQSzii.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-a8eb67da":()=>u(()=>import("./index.html-9y5CHoe0.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-5b77e0b9":()=>u(()=>import("./index.html-DE-uuAmo.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-0d5b8139":()=>u(()=>import("./index.html-a8RP2Yqi.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-5b77e0d8":()=>u(()=>import("./index.html-WPMY2E_6.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-3054e360":()=>u(()=>import("./index.html-96cFkO2_.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-6e960f9c":()=>u(()=>import("./index.html-X9frEbnV.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-14cb71cd":()=>u(()=>import("./index.html-_kRP5rWE.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-cd7a58a6":()=>u(()=>import("./index.html-Qzp469nE.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-1cf410b6":()=>u(()=>import("./index.html-BN-dIV9S.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-4c98a8fc":()=>u(()=>import("./index.html-coZvtUh-.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-7a29f77b":()=>u(()=>import("./index.html-I9oyQPTw.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-5bc93818":()=>u(()=>import("./index.html-cXDXxdqB.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-744d024e":()=>u(()=>import("./index.html-XmuM5OwL.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-e52c881c":()=>u(()=>import("./index.html-qr4JD5Rv.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-154dc4c4":()=>u(()=>import("./index.html-SSG7F8E0.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-01560935":()=>u(()=>import("./index.html-CwFhv7d_.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-6e518360":()=>u(()=>import("./index.html-veAYtglH.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-000bed88":()=>u(()=>import("./index.html-D4GIOSys.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-9f8855e8":()=>u(()=>import("./index.html-7OlnPkXB.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-b3142c4c":()=>u(()=>import("./index.html-rBGzmUh_.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-3f51cd40":()=>u(()=>import("./index.html-hmF25bvv.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-286e3dc8":()=>u(()=>import("./index.html-ciKPWS_R.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-c04f9a82":()=>u(()=>import("./index.html-gsUDL9st.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-287f1c1b":()=>u(()=>import("./index.html-akZ60oX9.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-65f57a63":()=>u(()=>import("./index.html-eHExl4aX.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-14dc9fc9":()=>u(()=>import("./index.html-71R5XXdf.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-e2bac56c":()=>u(()=>import("./index.html-PuQ_fWU9.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-b3058cce":()=>u(()=>import("./index.html-NcGKIwKb.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-2925f144":()=>u(()=>import("./index.html-QSHJdEzu.js"),__vite__mapDeps([])).then(({data:n})=>n),"v-59e7d974":()=>u(()=>import("./index.html-Fgg_aYCA.js"),__vite__mapDeps([])).then(({data:n})=>n)},uk=JSON.parse('{"base":"/blogs/","lang":"zh-CN","title":"Mr.LRH 博客","description":"学习笔记，使用 VuePress + vuepress-theme-hope 搭建。","head":[["link",{"rel":"icon","href":"/blogs/favicon.ico"}]],"locales":{}}');var dk=([n,s,a])=>n==="meta"&&s.name?`${n}.${s.name}`:["title","base"].includes(n)?n:n==="template"&&s.id?`${n}.${s.id}`:JSON.stringify([n,s,a]),vk=n=>{const s=new Set,a=[];return n.forEach(e=>{const t=dk(e);s.has(t)||(s.add(t),a.push(e))}),a},kk=n=>n[n.length-1]==="/"||n.endsWith(".html")?n:`${n}/`,ha=n=>/^(https?:)?\/\//.test(n),mk=/.md((\?|#).*)?$/,it=(n,s="/")=>!!(ha(n)||n.startsWith("/")&&!n.startsWith(s)&&!mk.test(n)),vi=n=>/^[a-z][a-z0-9+.-]*:/.test(n),_t=n=>Object.prototype.toString.call(n)==="[object Object]",Qo=n=>n[n.length-1]==="/"?n.slice(0,-1):n,ki=n=>n[0]==="/"?n.slice(1):n,fk=(n,s)=>{const a=Object.keys(n).sort((e,t)=>{const o=t.split("/").length-e.split("/").length;return o!==0?o:t.length-e.length});for(const e of a)if(s.startsWith(e))return e;return"/"};const mi={"v-79fdd481":f(()=>u(()=>import("./home.html-aGGRTL8t.js"),__vite__mapDeps([0,1]))),"v-184f4da6":f(()=>u(()=>import("./intro.html-4HLR2Egp.js"),__vite__mapDeps([2,1]))),"v-8daa1a0e":f(()=>u(()=>import("./index.html-9pHNAL84.js"),__vite__mapDeps([3,1]))),"v-fa355bca":f(()=>u(()=>import("./书签.html-w7lgVqnm.js"),__vite__mapDeps([4,1]))),"v-c8ef6000":f(()=>u(()=>import("./BEM.html-t5odcSEF.js"),__vite__mapDeps([5,1]))),"v-23c53e51":f(()=>u(()=>import("./index.html-FqB4Ax9m.js"),__vite__mapDeps([6,1]))),"v-2b29f11e":f(()=>u(()=>import("./index.html-uyUBArmJ.js"),__vite__mapDeps([7,1]))),"v-43809fe2":f(()=>u(()=>import("./混合开发.html-V_tHvAHM.js"),__vite__mapDeps([8,1]))),"v-0886bc3a":f(()=>u(()=>import("./index.html-A9RoTouE.js"),__vite__mapDeps([9,1]))),"v-26f7fea7":f(()=>u(()=>import("./index.html-2SijOZ1C.js"),__vite__mapDeps([10,1]))),"v-21abf927":f(()=>u(()=>import("./1px边框问题.html-jxsvdXC3.js"),__vite__mapDeps([11,1]))),"v-43526187":f(()=>u(()=>import("./index.html-na2hF1Cn.js"),__vite__mapDeps([12,1]))),"v-7bd5b2a4":f(()=>u(()=>import("./图片模糊问题.html-Pb6WtMc-.js"),__vite__mapDeps([13,1]))),"v-b3116612":f(()=>u(()=>import("./移动端基本概念.html-wUZZ6ZnD.js"),__vite__mapDeps([14,1]))),"v-4391364e":f(()=>u(()=>import("./移动端常见问题.html-ZkxAqkR1.js"),__vite__mapDeps([15,1]))),"v-62e5be3a":f(()=>u(()=>import("./移动端适配.html-hdPQn5x_.js"),__vite__mapDeps([16,1]))),"v-673a6bc7":f(()=>u(()=>import("./index.html-3PKLZLm5.js"),__vite__mapDeps([17,1]))),"v-8ea04c9c":f(()=>u(()=>import("./index.html-McSA9tRD.js"),__vite__mapDeps([18,1]))),"v-ba4fd208":f(()=>u(()=>import("./基础知识.html-yUCSU_5c.js"),__vite__mapDeps([19,1]))),"v-4caddbf2":f(()=>u(()=>import("./demo.html-VEekjPze.js"),__vite__mapDeps([20,1]))),"v-44f61baf":f(()=>u(()=>import("./index.html-Gmapeq0k.js"),__vite__mapDeps([21,1]))),"v-257e2e18":f(()=>u(()=>import("./tsconfig配置.html-H3pcHZBK.js"),__vite__mapDeps([22,1]))),"v-2e35194d":f(()=>u(()=>import("./TypeScriptTips.html-MjkCC9Np.js"),__vite__mapDeps([23,1]))),"v-689800b5":f(()=>u(()=>import("./TypeScript其他类型.html-R7ofsWbR.js"),__vite__mapDeps([24,1]))),"v-7350df02":f(()=>u(()=>import("./TypeScript基础类型.html-jhAYAyV_.js"),__vite__mapDeps([25,1]))),"v-7c6b1182":f(()=>u(()=>import("./TypeScript声明文件.html-OS4kq0an.js"),__vite__mapDeps([26,1]))),"v-c89b30e6":f(()=>u(()=>import("./TypeScript实现Promise.html-keg3Ez5j.js"),__vite__mapDeps([27,1]))),"v-69172050":f(()=>u(()=>import("./TypeScript实现Vuex.html-ZzNgXeAM.js"),__vite__mapDeps([28,1]))),"v-1c82787f":f(()=>u(()=>import("./TypeScript控制反转和依赖注入.html-37pf1Ml1.js"),__vite__mapDeps([29,1]))),"v-10930fde":f(()=>u(()=>import("./TypeScript装饰器.html-cIr8ZlUa.js"),__vite__mapDeps([30,1]))),"v-23ce3816":f(()=>u(()=>import("./H5直播点赞动画.html-qlgueXzb.js"),__vite__mapDeps([31,1]))),"v-50268bbe":f(()=>u(()=>import("./index.html-squZo6Nq.js"),__vite__mapDeps([32,1]))),"v-976b51c4":f(()=>u(()=>import("./git_head.html-mXYmNUHx.js"),__vite__mapDeps([33,1]))),"v-0052c16d":f(()=>u(()=>import("./git命令.html-8VPnlWul.js"),__vite__mapDeps([34,1]))),"v-7a0cb75d":f(()=>u(()=>import("./git基础.html-H7qfKZ7m.js"),__vite__mapDeps([35,1]))),"v-1b67107a":f(()=>u(()=>import("./git对象.html-lxvVEwmp.js"),__vite__mapDeps([36,1]))),"v-1fdad470":f(()=>u(()=>import("./git忽略提交.html-yd9JI0bC.js"),__vite__mapDeps([37,1]))),"v-6167e984":f(()=>u(()=>import("./git技巧.html-Zhy6kPm4.js"),__vite__mapDeps([38,1]))),"v-bfb62730":f(()=>u(()=>import("./git相关问题.html-FxNUTIRH.js"),__vite__mapDeps([39,1]))),"v-151a966e":f(()=>u(()=>import("./index.html-jG89vNY9.js"),__vite__mapDeps([40,1]))),"v-5c93f7ea":f(()=>u(()=>import("./index.html-eg0KCO0o.js"),__vite__mapDeps([41,1]))),"v-670514ca":f(()=>u(()=>import("./加密.html-sT1RpCaA.js"),__vite__mapDeps([42,1]))),"v-59cac0a5":f(()=>u(()=>import("./index.html-AJD4yDj8.js"),__vite__mapDeps([43,1]))),"v-0871403a":f(()=>u(()=>import("./VSCode插件.html-zflu_dc6.js"),__vite__mapDeps([44,1]))),"v-2c988428":f(()=>u(()=>import("./whistle.html-ytGyaKtK.js"),__vite__mapDeps([45,1]))),"v-41461593":f(()=>u(()=>import("./基础知识.html-g0HYbXMw.js"),__vite__mapDeps([46,1]))),"v-636aaf48":f(()=>u(()=>import("./index.html-bXU5l8Ox.js"),__vite__mapDeps([47,1]))),"v-4e11db22":f(()=>u(()=>import("./SQL基础.html-N9k0AqdK.js"),__vite__mapDeps([48,1]))),"v-36637eec":f(()=>u(()=>import("./index.html-WUyCSS-e.js"),__vite__mapDeps([49,1]))),"v-99865ade":f(()=>u(()=>import("./index.html-PKwy8ro5.js"),__vite__mapDeps([50,1]))),"v-1c4c4ee8":f(()=>u(()=>import("./index.html-gsJuoJPQ.js"),__vite__mapDeps([51,1]))),"v-71a020ac":f(()=>u(()=>import("./index.html-hPHxiL5m.js"),__vite__mapDeps([52,1]))),"v-1fa12809":f(()=>u(()=>import("./Q_A.html-72uySmgY.js"),__vite__mapDeps([53,1]))),"v-3dc6ebba":f(()=>u(()=>import("./index.html-rU7UoFDf.js"),__vite__mapDeps([54,1]))),"v-833597ac":f(()=>u(()=>import("./index.html-jQTXGjJF.js"),__vite__mapDeps([55,1]))),"v-62424824":f(()=>u(()=>import("./编程规范.html-pJV520Lg.js"),__vite__mapDeps([56,1]))),"v-55612a68":f(()=>u(()=>import("./index.html-dJ0IETgU.js"),__vite__mapDeps([57,1]))),"v-0d70097e":f(()=>u(()=>import("./基础模块实现.html-fFqBS8_E.js"),__vite__mapDeps([58,1]))),"v-030d03ee":f(()=>u(()=>import("./index.html-GXwKO-QV.js"),__vite__mapDeps([59,1]))),"v-65722b2c":f(()=>u(()=>import("./index.html-cKKY_DNn.js"),__vite__mapDeps([60,1]))),"v-446036c2":f(()=>u(()=>import("./基础知识.html-thKgKbzA.js"),__vite__mapDeps([61,1]))),"v-68bd4d46":f(()=>u(()=>import("./index.html-yE-djTOQ.js"),__vite__mapDeps([62,1]))),"v-287f093c":f(()=>u(()=>import("./index.html-y6TFwhum.js"),__vite__mapDeps([63,1]))),"v-5886c4c8":f(()=>u(()=>import("./index.html-i9e2285q.js"),__vite__mapDeps([64,1]))),"v-7a7e1996":f(()=>u(()=>import("./BFC.html-BbYU_sO8.js"),__vite__mapDeps([65,1]))),"v-3006fe90":f(()=>u(()=>import("./float.html-etP18LH5.js"),__vite__mapDeps([66,1]))),"v-15a85434":f(()=>u(()=>import("./line-height.html-tQWFUbhi.js"),__vite__mapDeps([67,1]))),"v-65a77d50":f(()=>u(()=>import("./vertical-align.html-znURR9II.js"),__vite__mapDeps([68,1]))),"v-41b5b0bc":f(()=>u(()=>import("./x-height.html-EKoCOJqU.js"),__vite__mapDeps([69,1]))),"v-2ff96c77":f(()=>u(()=>import("./内联元素.html-bmnmIbzB.js"),__vite__mapDeps([70,1]))),"v-21eed46d":f(()=>u(()=>import("./Flex布局.html-DoS-es_n.js"),__vite__mapDeps([71,1]))),"v-720c3b00":f(()=>u(()=>import("./Grid布局.html-udUhMAvK.js"),__vite__mapDeps([72,1]))),"v-4c4838f4":f(()=>u(()=>import("./StickyFooter.html-sxVmrqxW.js"),__vite__mapDeps([73,1]))),"v-47d8203e":f(()=>u(()=>import("./全屏布局.html-c_l80G3T.js"),__vite__mapDeps([74,1]))),"v-f50e88c6":f(()=>u(()=>import("./多列布局.html-gwbyMIPi.js"),__vite__mapDeps([75,1]))),"v-7d830ca2":f(()=>u(()=>import("./栅格布局.html-NJ-_2C_e.js"),__vite__mapDeps([76,1]))),"v-4d050f5a":f(()=>u(()=>import("./水平垂直居中.html-kn2eBcnW.js"),__vite__mapDeps([77,1]))),"v-61734615":f(()=>u(()=>import("./自适应布局.html-F1dlX1_j.js"),__vite__mapDeps([78,1]))),"v-57ec9a83":f(()=>u(()=>import("./页面等比适配.html-lzL3lyVU.js"),__vite__mapDeps([79,1]))),"v-5eab4c22":f(()=>u(()=>import("./CSS实现长宽比.html-JlZsYVRv.js"),__vite__mapDeps([80,1]))),"v-7094c4e3":f(()=>u(()=>import("./CSS常用封装.html-OZzi1hfg.js"),__vite__mapDeps([81,1]))),"v-1c65c6c7":f(()=>u(()=>import("./file.html-i4jDzpJe.js"),__vite__mapDeps([82,1]))),"v-1671a938":f(()=>u(()=>import("./navigator.html-N3HwFPbZ.js"),__vite__mapDeps([83,1]))),"v-35eb2514":f(()=>u(()=>import("./storage.html--uJD3etm.js"),__vite__mapDeps([84,1]))),"v-20bf9dc0":f(()=>u(()=>import("./URL.html-eFqFXvkK.js"),__vite__mapDeps([85,1]))),"v-7bd0135a":f(()=>u(()=>import("./window.html-q4tYWeIL.js"),__vite__mapDeps([86,1]))),"v-ffa7a9c8":f(()=>u(()=>import("./canvas优化.html-fDMa7Kfc.js"),__vite__mapDeps([87,1]))),"v-29164ffb":f(()=>u(()=>import("./canvas使用图像.html-gN0PgLWW.js"),__vite__mapDeps([88,1]))),"v-d93841de":f(()=>u(()=>import("./canvas像素操作.html-0UarBmfp.js"),__vite__mapDeps([89,1]))),"v-dd57719a":f(()=>u(()=>import("./canvas变形.html-FjYWR2QI.js"),__vite__mapDeps([90,1]))),"v-45bae330":f(()=>u(()=>import("./canvas合成与裁剪.html-kRcsKBVk.js"),__vite__mapDeps([91,1]))),"v-fc72bcde":f(()=>u(()=>import("./canvas基本动画.html-FpPRwNUB.js"),__vite__mapDeps([92,1]))),"v-9f4befce":f(()=>u(()=>import("./canvas基础.html--4yM1gTI.js"),__vite__mapDeps([93,1]))),"v-ff8bc21e":f(()=>u(()=>import("./canvas添加样式.html-lUr6426H.js"),__vite__mapDeps([94,1]))),"v-6b104240":f(()=>u(()=>import("./canvas绘制形状.html-iiZxXQ0L.js"),__vite__mapDeps([95,1]))),"v-46431f48":f(()=>u(()=>import("./canvas绘制文本.html-sIZ52zvZ.js"),__vite__mapDeps([96,1]))),"v-1aa3ff6c":f(()=>u(()=>import("./css.html-wZi5ExZB.js"),__vite__mapDeps([97,1]))),"v-5e930d8a":f(()=>u(()=>import("./document.html-neAx8Vxd.js"),__vite__mapDeps([98,1]))),"v-bd32a61e":f(()=>u(()=>import("./element.html-rHVsyTO2.js"),__vite__mapDeps([99,1]))),"v-406b4113":f(()=>u(()=>import("./event.html-N6cYoBXm.js"),__vite__mapDeps([100,1]))),"v-3dad0466":f(()=>u(()=>import("./MutationObserver.html-Hs2NkKXr.js"),__vite__mapDeps([101,1]))),"v-63a47f03":f(()=>u(()=>import("./node.html-OI9BRYxe.js"),__vite__mapDeps([102,1]))),"v-0a3ae346":f(()=>u(()=>import("./other.html-Gh-5tPLN.js"),__vite__mapDeps([103,1]))),"v-15506043":f(()=>u(()=>import("./WebComponents.html-CCb70Uch.js"),__vite__mapDeps([104,1]))),"v-7ee4b871":f(()=>u(()=>import("./svgSMIL动画.html-4MvMSqrS.js"),__vite__mapDeps([105,1]))),"v-30557de4":f(()=>u(()=>import("./svg动画.html-QYSpPNLm.js"),__vite__mapDeps([106,1]))),"v-4c6a57cf":f(()=>u(()=>import("./svg基础.html-W-H9CS0m.js"),__vite__mapDeps([107,1]))),"v-2088aab7":f(()=>u(()=>import("./基于anime.js的svg动画.html-1EQzVyPH.js"),__vite__mapDeps([108,1]))),"v-7a9286be":f(()=>u(()=>import("./01.编程语言通识.html-PaSXh9Ph.js"),__vite__mapDeps([109,1]))),"v-0018d32b":f(()=>u(()=>import("./02.JavaScript词法和类型.html-MqI3iqIw.js"),__vite__mapDeps([110,1]))),"v-78ee3839":f(()=>u(()=>import("./03.表达式和类型转换.html-EODN0yBp.js"),__vite__mapDeps([111,1]))),"v-3368bed0":f(()=>u(()=>import("./04.语句和对象.html-BwOB8Z-g.js"),__vite__mapDeps([112,1]))),"v-cc16ae08":f(()=>u(()=>import("./API.html-LIPituPb.js"),__vite__mapDeps([113,1]))),"v-fee2cd06":f(()=>u(()=>import("./ArrayBuffer.html-MxGikmCO.js"),__vite__mapDeps([114,1]))),"v-655a227a":f(()=>u(()=>import("./async.html-gHD_qWBe.js"),__vite__mapDeps([115,1]))),"v-1d90551e":f(()=>u(()=>import("./Class.html-O3uyf3vu.js"),__vite__mapDeps([116,1]))),"v-15ea3110":f(()=>u(()=>import("./EventLoop.html-lGaawRc3.js"),__vite__mapDeps([117,1]))),"v-37215e23":f(()=>u(()=>import("./Generator.html-bROeeHsV.js"),__vite__mapDeps([118,1]))),"v-f914a298":f(()=>u(()=>import("./JSON.html-fAm8onXK.js"),__vite__mapDeps([119,1]))),"v-d6e951ee":f(()=>u(()=>import("./Math和Date.html-lZjGpXY8.js"),__vite__mapDeps([120,1]))),"v-2e3c4fca":f(()=>u(()=>import("./Promise.html-xEi80qZ0.js"),__vite__mapDeps([121,1]))),"v-697eefb9":f(()=>u(()=>import("./Reflect.html-o6ej-9eG.js"),__vite__mapDeps([122,1]))),"v-3628e31a":f(()=>u(()=>import("./RegExp.html-tDdojXfG.js"),__vite__mapDeps([123,1]))),"v-8d988142":f(()=>u(()=>import("./Set和Map.html-pDFljyI7.js"),__vite__mapDeps([124,1]))),"v-38550274":f(()=>u(()=>import("./作用域与闭包.html-v8hiyyF-.js"),__vite__mapDeps([125,1]))),"v-69bed66c":f(()=>u(()=>import("./函数.html-SgY6Sde7.js"),__vite__mapDeps([126,1]))),"v-c29ddc06":f(()=>u(()=>import("./原型与继承.html-Zv1GL0kU.js"),__vite__mapDeps([127,1]))),"v-20a2080e":f(()=>u(()=>import("./基础类型.html-Tjhg5Tlj.js"),__vite__mapDeps([128,1]))),"v-6e901b6a":f(()=>u(()=>import("./对象.html-xKCbuL9G.js"),__vite__mapDeps([129,1]))),"v-a3e5affa":f(()=>u(()=>import("./异步.html-6zuveylv.js"),__vite__mapDeps([130,1]))),"v-5d611e5e":f(()=>u(()=>import("./数组.html-aNML_uAH.js"),__vite__mapDeps([131,1]))),"v-d59d1c2c":f(()=>u(()=>import("./类型概述.html-EBkoZdYR.js"),__vite__mapDeps([132,1]))),"v-a3cd6e62":f(()=>u(()=>import("./网络请求.html-EJYhbdBq.js"),__vite__mapDeps([133,1]))),"v-34f1796f":f(()=>u(()=>import("./工具函数.html-bFOfjZHO.js"),__vite__mapDeps([134,1]))),"v-35e7f165":f(()=>u(()=>import("./手写代码.html-OHGIdXdw.js"),__vite__mapDeps([135,1]))),"v-c21536aa":f(()=>u(()=>import("./网页截屏.html-eKCSukf3.js"),__vite__mapDeps([136,1]))),"v-46e62e58":f(()=>u(()=>import("./index.html-NaySIw3T.js"),__vite__mapDeps([137,1]))),"v-1e92ab56":f(()=>u(()=>import("./SOLID.html-PlKq2muD.js"),__vite__mapDeps([138,1]))),"v-43efc7e4":f(()=>u(()=>import("./创建型设计模式.html-KvxIR6aS.js"),__vite__mapDeps([139,1]))),"v-0e378c3a":f(()=>u(()=>import("./结构型设计模式.html-4wd5dA5Y.js"),__vite__mapDeps([140,1]))),"v-6be214f8":f(()=>u(()=>import("./行为型设计模式.html-YZSpJEeI.js"),__vite__mapDeps([141,1]))),"v-378ddb9a":f(()=>u(()=>import("./其他优化.html-5Mdjb8Ac.js"),__vite__mapDeps([142,1]))),"v-74eb89d7":f(()=>u(()=>import("./处理海量数据.html-4yKkXLM5.js"),__vite__mapDeps([143,1]))),"v-1bef6390":f(()=>u(()=>import("./渲染控制.html-h_ucuEuf.js"),__vite__mapDeps([144,1]))),"v-5c9b76e6":f(()=>u(()=>import("./渲染调优.html-wYYPg1_g.js"),__vite__mapDeps([145,1]))),"v-38deb022":f(()=>u(()=>import("./Context.html-v1ztEhxD.js"),__vite__mapDeps([146,1]))),"v-612d55f6":f(()=>u(()=>import("./Fiber.html-2WvKbrvV.js"),__vite__mapDeps([147,1]))),"v-91bf567e":f(()=>u(()=>import("./Hooks.html-cLkRruAa.js"),__vite__mapDeps([148,1]))),"v-eae5c6c8":f(()=>u(()=>import("./React位运算.html-cBp874qX.js"),__vite__mapDeps([149,1]))),"v-639279dd":f(()=>u(()=>import("./Reconciler.html-emp6ZZmR.js"),__vite__mapDeps([150,1]))),"v-02b4b2d4":f(()=>u(()=>import("./Scheduler.html-lyz1KfDA.js"),__vite__mapDeps([151,1]))),"v-2d09c55a":f(()=>u(()=>import("./事件系统.html-K-R_9hsG.js"),__vite__mapDeps([152,1]))),"v-072550d3":f(()=>u(()=>import("./Context.html-O3CP3-Mz.js"),__vite__mapDeps([153,1]))),"v-17a5c29a":f(()=>u(()=>import("./JSX.html-fEQBsHH4.js"),__vite__mapDeps([154,1]))),"v-393169d8":f(()=>u(()=>import("./LifeCycle.html-mbphEWrr.js"),__vite__mapDeps([155,1]))),"v-52e16bf2":f(()=>u(()=>import("./Props.html-znQWZRbm.js"),__vite__mapDeps([156,1]))),"v-696c11e4":f(()=>u(()=>import("./React组件.html-wd1b_ICx.js"),__vite__mapDeps([157,1]))),"v-034a88ef":f(()=>u(()=>import("./Ref.html-kOa-HnA5.js"),__vite__mapDeps([158,1]))),"v-65ab3d71":f(()=>u(()=>import("./State.html-k2Sdg8o_.js"),__vite__mapDeps([159,1]))),"v-0b82ffbb":f(()=>u(()=>import("./Transition.html-9k6xlzG6.js"),__vite__mapDeps([160,1]))),"v-1dca019c":f(()=>u(()=>import("./useSyncExternalStore.html-SXRD31Eg.js"),__vite__mapDeps([161,1]))),"v-3d99be36":f(()=>u(()=>import("./基础知识.html-CSQy9jOo.js"),__vite__mapDeps([162,1]))),"v-2595cd5b":f(()=>u(()=>import("./模块化CSS.html-Iq8Mr3h5.js"),__vite__mapDeps([163,1]))),"v-55437d44":f(()=>u(()=>import("./自定义Hooks.html-TXUV5Am6.js"),__vite__mapDeps([164,1]))),"v-5a3976f8":f(()=>u(()=>import("./高阶组件.html-nDuuQayL.js"),__vite__mapDeps([165,1]))),"v-094754f4":f(()=>u(()=>import("./react-redux.html-WMNl03Y_.js"),__vite__mapDeps([166,1]))),"v-21191fa2":f(()=>u(()=>import("./react-router.html-IrkjQ7sM.js"),__vite__mapDeps([167,1]))),"v-426d051c":f(()=>u(()=>import("./Vue2基础.html-UHARdTQq.js"),__vite__mapDeps([168,1]))),"v-04f29fb0":f(()=>u(()=>import("./Vue2实现原理.html-TPLyyDQV.js"),__vite__mapDeps([169,170,1]))),"v-55ffc80d":f(()=>u(()=>import("./Vue2实用技巧.html--gB7Y5pd.js"),__vite__mapDeps([171,1]))),"v-61469c82":f(()=>u(()=>import("./Vue2相关组件实现.html-ZMNgE_UU.js"),__vite__mapDeps([172,1]))),"v-511dd236":f(()=>u(()=>import("./Vue2组件通信方式.html-W_YR8Ygw.js"),__vite__mapDeps([173,174,1]))),"v-6db912e3":f(()=>u(()=>import("./VueRouter.html-Q67nt_1i.js"),__vite__mapDeps([175,1]))),"v-5db1d7ae":f(()=>u(()=>import("./Vuex.html-ZeKiFGVA.js"),__vite__mapDeps([176,174,1]))),"v-8fe351e0":f(()=>u(()=>import("./vue-router.html-Qp1tJ2s6.js"),__vite__mapDeps([177,1]))),"v-6f01d847":f(()=>u(()=>import("./vue-vuex.html-DBKjcgz4.js"),__vite__mapDeps([178,1]))),"v-3a2ef9ba":f(()=>u(()=>import("./响应式.html-TYYxcTnQ.js"),__vite__mapDeps([179,170,1]))),"v-58a23187":f(()=>u(()=>import("./数据驱动.html-wagUdQ48.js"),__vite__mapDeps([180,1]))),"v-371374c0":f(()=>u(()=>import("./组件化.html-0H5WNnmx.js"),__vite__mapDeps([181,1]))),"v-4f490448":f(()=>u(()=>import("./编译.html-e6HeSCPs.js"),__vite__mapDeps([182,1]))),"v-20d07a24":f(()=>u(()=>import("./Vue3CompositionAPI.html-lZMYsuGe.js"),__vite__mapDeps([183,1]))),"v-57ee0de7":f(()=>u(()=>import("./Webpack优化.html-idlfl_wk.js"),__vite__mapDeps([184,1]))),"v-55793d7f":f(()=>u(()=>import("./Webpack原理.html-iHj0XLc9.js"),__vite__mapDeps([185,1]))),"v-112de4bc":f(()=>u(()=>import("./babel.html-U9v0LUWT.js"),__vite__mapDeps([186,1]))),"v-e97b0c7e":f(()=>u(()=>import("./CSS模块化.html-60nKKm-H.js"),__vite__mapDeps([187,1]))),"v-37d71f2e":f(()=>u(()=>import("./devServer.html-zGjXH02-.js"),__vite__mapDeps([188,1]))),"v-f257debe":f(()=>u(()=>import("./JS模块化.html-0K8zq8qd.js"),__vite__mapDeps([189,1]))),"v-a9d76734":f(()=>u(()=>import("./loaders.html-h9ardUyL.js"),__vite__mapDeps([190,1]))),"v-acba98f4":f(()=>u(()=>import("./plugins.html-auIQuzvp.js"),__vite__mapDeps([191,1]))),"v-d15facf0":f(()=>u(()=>import("./多页面配置.html-IoCm1Rc4.js"),__vite__mapDeps([192,1]))),"v-47ce4e58":f(()=>u(()=>import("./核心概念.html-XmVjuKhX.js"),__vite__mapDeps([193,1]))),"v-09431e95":f(()=>u(()=>import("./编写loader.html-nw6wESIL.js"),__vite__mapDeps([194,1]))),"v-19bb5375":f(()=>u(()=>import("./编写plugin.html-6tV-1p7Y.js"),__vite__mapDeps([195,1]))),"v-0cb8d7e7":f(()=>u(()=>import("./EMP.html-NaBlWKl7.js"),__vite__mapDeps([196,1]))),"v-e73dad02":f(()=>u(()=>import("./Garfish.html-iStCBquV.js"),__vite__mapDeps([197,1]))),"v-5aadedb4":f(()=>u(()=>import("./MicroApp.html-8999nPTQ.js"),__vite__mapDeps([198,1]))),"v-23baba10":f(()=>u(()=>import("./qiankun.html-HY55m4c6.js"),__vite__mapDeps([199,1]))),"v-b1ed33b8":f(()=>u(()=>import("./single-spa.html-owxMWixc.js"),__vite__mapDeps([200,1]))),"v-3880926b":f(()=>u(()=>import("./index.html-SUjJP7ds.js"),__vite__mapDeps([201,1]))),"v-4cfafc7b":f(()=>u(()=>import("./event.html-IBX9pl7w.js"),__vite__mapDeps([202,1]))),"v-64a7aa10":f(()=>u(()=>import("./keep-alive.html-B263wipu.js"),__vite__mapDeps([203,1]))),"v-2f2b981f":f(()=>u(()=>import("./slot.html-62Gf0uw4.js"),__vite__mapDeps([204,1]))),"v-3d3ea028":f(()=>u(()=>import("./transition.html-tkDstEk0.js"),__vite__mapDeps([205,1]))),"v-20ad8c03":f(()=>u(()=>import("./v-model.html-a-6DHuZy.js"),__vite__mapDeps([206,1]))),"v-ea97c948":f(()=>u(()=>import("./词法.html-QtvC9qD2.js"),__vite__mapDeps([207,1]))),"v-78d4e833":f(()=>u(()=>import("./语法.html-bKDZ5Yg8.js"),__vite__mapDeps([208,1]))),"v-0da3b39c":f(()=>u(()=>import("./index.html-tCQtqPWI.js"),__vite__mapDeps([209,1]))),"v-58af1b76":f(()=>u(()=>import("./index.html-X4LYsbP0.js"),__vite__mapDeps([210,1]))),"v-6435cc7a":f(()=>u(()=>import("./index.html-mmg9VnTt.js"),__vite__mapDeps([211,1]))),"v-48f60179":f(()=>u(()=>import("./事件循环.html-HHTLVNQp.js"),__vite__mapDeps([212,1]))),"v-089c79e0":f(()=>u(()=>import("./函数的执行.html-w-umwwy6.js"),__vite__mapDeps([213,1]))),"v-3d17b6aa":f(()=>u(()=>import("./微任务的执行.html-L5otITiw.js"),__vite__mapDeps([214,1]))),"v-76290d96":f(()=>u(()=>import("./语句级的执行.html-4UWwrhwY.js"),__vite__mapDeps([215,1]))),"v-2aedea04":f(()=>u(()=>import("./index.html-mt2tpO9S.js"),__vite__mapDeps([216,1]))),"v-7cbcdbc6":f(()=>u(()=>import("./实例.html-M80VccHl.js"),__vite__mapDeps([217,1]))),"v-c2792460":f(()=>u(()=>import("./类型.html-RqkFdWM-.js"),__vite__mapDeps([218,1]))),"v-3706649a":f(()=>u(()=>import("./404.html-0UfMJuaP.js"),__vite__mapDeps([219,1]))),"v-330f6aaf":f(()=>u(()=>import("./index.html-zJlfILmE.js"),__vite__mapDeps([220,1]))),"v-73197d7b":f(()=>u(()=>import("./index.html-2HYyxO7Y.js"),__vite__mapDeps([221,1]))),"v-43bb8f9e":f(()=>u(()=>import("./index.html-qHx3CLxu.js"),__vite__mapDeps([222,1]))),"v-a25fad8a":f(()=>u(()=>import("./index.html-DI4dRAXm.js"),__vite__mapDeps([223,1]))),"v-b19f66be":f(()=>u(()=>import("./index.html-2wLxzwuZ.js"),__vite__mapDeps([224,1]))),"v-6715190e":f(()=>u(()=>import("./index.html-AmA4gaZq.js"),__vite__mapDeps([225,1]))),"v-0a860211":f(()=>u(()=>import("./index.html-dlHiWR_0.js"),__vite__mapDeps([226,1]))),"v-3b15e67b":f(()=>u(()=>import("./index.html-DXzn62pM.js"),__vite__mapDeps([227,1]))),"v-6ba842a2":f(()=>u(()=>import("./index.html-oktHL4zd.js"),__vite__mapDeps([228,1]))),"v-3a02bfce":f(()=>u(()=>import("./index.html-SUUykMqg.js"),__vite__mapDeps([229,1]))),"v-292062d6":f(()=>u(()=>import("./index.html-D3ptF2cE.js"),__vite__mapDeps([230,1]))),"v-455de410":f(()=>u(()=>import("./index.html-vx5LCpLh.js"),__vite__mapDeps([231,1]))),"v-29214b94":f(()=>u(()=>import("./index.html-rmf8VYyM.js"),__vite__mapDeps([232,1]))),"v-292836b2":f(()=>u(()=>import("./index.html-Tj1bd8z6.js"),__vite__mapDeps([233,1]))),"v-12acd912":f(()=>u(()=>import("./index.html-6OkSMhAM.js"),__vite__mapDeps([234,1]))),"v-33bce6dd":f(()=>u(()=>import("./index.html-jDjckGD-.js"),__vite__mapDeps([235,1]))),"v-6e1d46a1":f(()=>u(()=>import("./index.html-ROILpGts.js"),__vite__mapDeps([236,1]))),"v-3534cc28":f(()=>u(()=>import("./index.html-g0gR8fle.js"),__vite__mapDeps([237,1]))),"v-da29e3a8":f(()=>u(()=>import("./index.html-KrkDeqnn.js"),__vite__mapDeps([238,1]))),"v-19ab8f78":f(()=>u(()=>import("./index.html-q5StFqLh.js"),__vite__mapDeps([239,1]))),"v-803e1cae":f(()=>u(()=>import("./index.html-X0k8hez2.js"),__vite__mapDeps([240,1]))),"v-a8eb67da":f(()=>u(()=>import("./index.html-V-uvXNJ4.js"),__vite__mapDeps([241,1]))),"v-5b77e0b9":f(()=>u(()=>import("./index.html-QfPj-P_l.js"),__vite__mapDeps([242,1]))),"v-0d5b8139":f(()=>u(()=>import("./index.html-0OOgfHXu.js"),__vite__mapDeps([243,1]))),"v-5b77e0d8":f(()=>u(()=>import("./index.html-mZDhc4nV.js"),__vite__mapDeps([244,1]))),"v-3054e360":f(()=>u(()=>import("./index.html-UH_OuT1R.js"),__vite__mapDeps([245,1]))),"v-6e960f9c":f(()=>u(()=>import("./index.html-ZcGvSr6F.js"),__vite__mapDeps([246,1]))),"v-14cb71cd":f(()=>u(()=>import("./index.html-2Pf1Su1k.js"),__vite__mapDeps([247,1]))),"v-cd7a58a6":f(()=>u(()=>import("./index.html-I9b_zvO1.js"),__vite__mapDeps([248,1]))),"v-1cf410b6":f(()=>u(()=>import("./index.html-PYqVXguy.js"),__vite__mapDeps([249,1]))),"v-4c98a8fc":f(()=>u(()=>import("./index.html-CbU1lGZt.js"),__vite__mapDeps([250,1]))),"v-7a29f77b":f(()=>u(()=>import("./index.html-J-9WEBq_.js"),__vite__mapDeps([251,1]))),"v-5bc93818":f(()=>u(()=>import("./index.html-W1nR1L6G.js"),__vite__mapDeps([252,1]))),"v-744d024e":f(()=>u(()=>import("./index.html-a28iAabz.js"),__vite__mapDeps([253,1]))),"v-e52c881c":f(()=>u(()=>import("./index.html-f2-AEql3.js"),__vite__mapDeps([254,1]))),"v-154dc4c4":f(()=>u(()=>import("./index.html-pIGJreaN.js"),__vite__mapDeps([255,1]))),"v-01560935":f(()=>u(()=>import("./index.html-Exg62mul.js"),__vite__mapDeps([256,1]))),"v-6e518360":f(()=>u(()=>import("./index.html-IWoPJJGh.js"),__vite__mapDeps([257,1]))),"v-000bed88":f(()=>u(()=>import("./index.html-X2GVLjx4.js"),__vite__mapDeps([258,1]))),"v-9f8855e8":f(()=>u(()=>import("./index.html-SFgeJJZq.js"),__vite__mapDeps([259,1]))),"v-b3142c4c":f(()=>u(()=>import("./index.html-StyFpSCk.js"),__vite__mapDeps([260,1]))),"v-3f51cd40":f(()=>u(()=>import("./index.html-fl8Oozs2.js"),__vite__mapDeps([261,1]))),"v-286e3dc8":f(()=>u(()=>import("./index.html-U7uzttJ9.js"),__vite__mapDeps([262,1]))),"v-c04f9a82":f(()=>u(()=>import("./index.html-x-VTPZHU.js"),__vite__mapDeps([263,1]))),"v-287f1c1b":f(()=>u(()=>import("./index.html-i9u3xBVw.js"),__vite__mapDeps([264,1]))),"v-65f57a63":f(()=>u(()=>import("./index.html--tGVH2AZ.js"),__vite__mapDeps([265,1]))),"v-14dc9fc9":f(()=>u(()=>import("./index.html-mWDvkr5T.js"),__vite__mapDeps([266,1]))),"v-e2bac56c":f(()=>u(()=>import("./index.html-T_u4bjUK.js"),__vite__mapDeps([267,1]))),"v-b3058cce":f(()=>u(()=>import("./index.html-mZivvA69.js"),__vite__mapDeps([268,1]))),"v-2925f144":f(()=>u(()=>import("./index.html-cqhkXMIZ.js"),__vite__mapDeps([269,1]))),"v-59e7d974":f(()=>u(()=>import("./index.html-1aoW5Ff9.js"),__vite__mapDeps([270,1])))};var hk=Symbol(""),fi=Symbol(""),bk=ka({key:"",path:"",title:"",lang:"",frontmatter:{},headers:[]}),vn=()=>{const n=dn(fi);if(!n)throw new Error("pageData() is called without provider.");return n},hi=Symbol(""),_n=()=>{const n=dn(hi);if(!n)throw new Error("usePageFrontmatter() is called without provider.");return n},bi=Symbol(""),gk=()=>{const n=dn(bi);if(!n)throw new Error("usePageHead() is called without provider.");return n},Ek=Symbol(""),gi=Symbol(""),Ei=()=>{const n=dn(gi);if(!n)throw new Error("usePageLang() is called without provider.");return n},yi=Symbol(""),yk=()=>{const n=dn(yi);if(!n)throw new Error("usePageLayout() is called without provider.");return n},_k=U(rk),np=Symbol(""),Bs=()=>{const n=dn(np);if(!n)throw new Error("useRouteLocale() is called without provider.");return n},Sa=U(uk),_i=()=>Sa,Ai=Symbol(""),qa=()=>{const n=dn(Ai);if(!n)throw new Error("useSiteLocaleData() is called without provider.");return n},Ak=Symbol(""),wk="Layout",Sk="NotFound",Ls=ye({resolveLayouts:n=>n.reduce((s,a)=>({...s,...a.layouts}),{}),resolvePageData:async n=>{const s=_k.value[n];return await(s==null?void 0:s())??bk},resolvePageFrontmatter:n=>n.frontmatter,resolvePageHead:(n,s,a)=>{const e=rn(s.description)?s.description:a.description,t=[...nn(s.head)?s.head:[],...a.head,["title",{},n],["meta",{name:"description",content:e}]];return vk(t)},resolvePageHeadTitle:(n,s)=>[n.title,s.title].filter(a=>!!a).join(" | "),resolvePageLang:(n,s)=>n.lang||s.lang||"en-US",resolvePageLayout:(n,s)=>{let a;if(n.path){const e=n.frontmatter.layout;rn(e)?a=e:a=wk}else a=Sk;return s[a]},resolveRouteLocale:(n,s)=>fk(n,s),resolveSiteLocaleData:(n,s)=>({...n,...n.locales[s]})}),At=j({name:"ClientOnly",setup(n,s){const a=U(!1);return bn(()=>{a.value=!0}),()=>{var e,t;return a.value?(t=(e=s.slots).default)==null?void 0:t.call(e):null}}}),wi=j({name:"Content",props:{pageKey:{type:String,required:!1,default:""}},setup(n){const s=vn(),a=w(()=>mi[n.pageKey||s.value.key]);return()=>a.value?c(a.value):c("div","404 Not Found")}}),gs=(n={})=>n,Dn=n=>ha(n)?n:`/blogs/${ki(n)}`;const Rk={};/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const wa=typeof window<"u";function Bk(n){return n.__esModule||n[Symbol.toStringTag]==="Module"}const gn=Object.assign;function Jt(n,s){const a={};for(const e in s){const t=s[e];a[e]=bs(t)?t.map(n):n(t)}return a}const le=()=>{},bs=Array.isArray,Dk=/\/$/,Tk=n=>n.replace(Dk,"");function Wt(n,s,a="/"){let e,t={},o="",p="";const l=s.indexOf("#");let r=s.indexOf("?");return l<r&&l>=0&&(r=-1),r>-1&&(e=s.slice(0,r),o=s.slice(r+1,l>-1?l:s.length),t=n(o)),l>-1&&(e=e||s.slice(0,l),p=s.slice(l,s.length)),e=Ok(e??s,a),{fullPath:e+(o&&"?")+o+p,path:e,query:t,hash:p}}function Ck(n,s){const a=s.query?n(s.query):"";return s.path+(a&&"?")+a+(s.hash||"")}function _c(n,s){return!s||!n.toLowerCase().startsWith(s.toLowerCase())?n:n.slice(s.length)||"/"}function xk(n,s,a){const e=s.matched.length-1,t=a.matched.length-1;return e>-1&&e===t&&Ha(s.matched[e],a.matched[t])&&Si(s.params,a.params)&&n(s.query)===n(a.query)&&s.hash===a.hash}function Ha(n,s){return(n.aliasOf||n)===(s.aliasOf||s)}function Si(n,s){if(Object.keys(n).length!==Object.keys(s).length)return!1;for(const a in n)if(!Lk(n[a],s[a]))return!1;return!0}function Lk(n,s){return bs(n)?Ac(n,s):bs(s)?Ac(s,n):n===s}function Ac(n,s){return bs(s)?n.length===s.length&&n.every((a,e)=>a===s[e]):n.length===1&&n[0]===s}function Ok(n,s){if(n.startsWith("/"))return n;if(!n)return s;const a=s.split("/"),e=n.split("/"),t=e[e.length-1];(t===".."||t===".")&&e.push("");let o=a.length-1,p,l;for(p=0;p<e.length;p++)if(l=e[p],l!==".")if(l==="..")o>1&&o--;else break;return a.slice(0,o).join("/")+"/"+e.slice(p-(p===e.length?1:0)).join("/")}var he;(function(n){n.pop="pop",n.push="push"})(he||(he={}));var ie;(function(n){n.back="back",n.forward="forward",n.unknown=""})(ie||(ie={}));function Ik(n){if(!n)if(wa){const s=document.querySelector("base");n=s&&s.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),Tk(n)}const Pk=/^[^#]+#/;function Vk(n,s){return n.replace(Pk,"#")+s}function Fk(n,s){const a=document.documentElement.getBoundingClientRect(),e=n.getBoundingClientRect();return{behavior:s.behavior,left:e.left-a.left-(s.left||0),top:e.top-a.top-(s.top||0)}}const wt=()=>({left:window.pageXOffset,top:window.pageYOffset});function Mk(n){let s;if("el"in n){const a=n.el,e=typeof a=="string"&&a.startsWith("#"),t=typeof a=="string"?e?document.getElementById(a.slice(1)):document.querySelector(a):a;if(!t)return;s=Fk(t,n)}else s=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(s):window.scrollTo(s.left!=null?s.left:window.pageXOffset,s.top!=null?s.top:window.pageYOffset)}function wc(n,s){return(history.state?history.state.position-s:-1)+n}const mo=new Map;function jk(n,s){mo.set(n,s)}function Nk(n){const s=mo.get(n);return mo.delete(n),s}let Hk=()=>location.protocol+"//"+location.host;function Ri(n,s){const{pathname:a,search:e,hash:t}=s,o=n.indexOf("#");if(o>-1){let l=t.includes(n.slice(o))?n.slice(o).length:1,r=t.slice(l);return r[0]!=="/"&&(r="/"+r),_c(r,"")}return _c(a,n)+e+t}function $k(n,s,a,e){let t=[],o=[],p=null;const l=({state:k})=>{const m=Ri(n,location),b=a.value,E=s.value;let S=0;if(k){if(a.value=m,s.value=k,p&&p===b){p=null;return}S=E?k.position-E.position:0}else e(m);t.forEach(y=>{y(a.value,b,{delta:S,type:he.pop,direction:S?S>0?ie.forward:ie.back:ie.unknown})})};function r(){p=a.value}function i(k){t.push(k);const m=()=>{const b=t.indexOf(k);b>-1&&t.splice(b,1)};return o.push(m),m}function d(){const{history:k}=window;k.state&&k.replaceState(gn({},k.state,{scroll:wt()}),"")}function v(){for(const k of o)k();o=[],window.removeEventListener("popstate",l),window.removeEventListener("beforeunload",d)}return window.addEventListener("popstate",l),window.addEventListener("beforeunload",d,{passive:!0}),{pauseListeners:r,listen:i,destroy:v}}function Sc(n,s,a,e=!1,t=!1){return{back:n,current:s,forward:a,replaced:e,position:window.history.length,scroll:t?wt():null}}function Jk(n){const{history:s,location:a}=window,e={value:Ri(n,a)},t={value:s.state};t.value||o(e.value,{back:null,current:e.value,forward:null,position:s.length-1,replaced:!0,scroll:null},!0);function o(r,i,d){const v=n.indexOf("#"),k=v>-1?(a.host&&document.querySelector("base")?n:n.slice(v))+r:Hk()+n+r;try{s[d?"replaceState":"pushState"](i,"",k),t.value=i}catch(m){console.error(m),a[d?"replace":"assign"](k)}}function p(r,i){const d=gn({},s.state,Sc(t.value.back,r,t.value.forward,!0),i,{position:t.value.position});o(r,d,!0),e.value=r}function l(r,i){const d=gn({},t.value,s.state,{forward:r,scroll:wt()});o(d.current,d,!0);const v=gn({},Sc(e.value,r,null),{position:d.position+1},i);o(r,v,!1),e.value=r}return{location:e,state:t,push:l,replace:p}}function Wk(n){n=Ik(n);const s=Jk(n),a=$k(n,s.state,s.location,s.replace);function e(o,p=!0){p||a.pauseListeners(),history.go(o)}const t=gn({location:"",base:n,go:e,createHref:Vk.bind(null,n)},s,a);return Object.defineProperty(t,"location",{enumerable:!0,get:()=>s.location.value}),Object.defineProperty(t,"state",{enumerable:!0,get:()=>s.state.value}),t}function zk(n){return typeof n=="string"||n&&typeof n=="object"}function Bi(n){return typeof n=="string"||typeof n=="symbol"}const Os={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},Di=Symbol("");var Rc;(function(n){n[n.aborted=4]="aborted",n[n.cancelled=8]="cancelled",n[n.duplicated=16]="duplicated"})(Rc||(Rc={}));function $a(n,s){return gn(new Error,{type:n,[Di]:!0},s)}function Cs(n,s){return n instanceof Error&&Di in n&&(s==null||!!(n.type&s))}const Bc="[^/]+?",Gk={sensitive:!1,strict:!1,start:!0,end:!0},Uk=/[.+*?^${}()[\]/\\]/g;function qk(n,s){const a=gn({},Gk,s),e=[];let t=a.start?"^":"";const o=[];for(const i of n){const d=i.length?[]:[90];a.strict&&!i.length&&(t+="/");for(let v=0;v<i.length;v++){const k=i[v];let m=40+(a.sensitive?.25:0);if(k.type===0)v||(t+="/"),t+=k.value.replace(Uk,"\\$&"),m+=40;else if(k.type===1){const{value:b,repeatable:E,optional:S,regexp:y}=k;o.push({name:b,repeatable:E,optional:S});const B=y||Bc;if(B!==Bc){m+=10;try{new RegExp(`(${B})`)}catch(R){throw new Error(`Invalid custom RegExp for param "${b}" (${B}): `+R.message)}}let _=E?`((?:${B})(?:/(?:${B}))*)`:`(${B})`;v||(_=S&&i.length<2?`(?:/${_})`:"/"+_),S&&(_+="?"),t+=_,m+=20,S&&(m+=-8),E&&(m+=-20),B===".*"&&(m+=-50)}d.push(m)}e.push(d)}if(a.strict&&a.end){const i=e.length-1;e[i][e[i].length-1]+=.7000000000000001}a.strict||(t+="/?"),a.end?t+="$":a.strict&&(t+="(?:/|$)");const p=new RegExp(t,a.sensitive?"":"i");function l(i){const d=i.match(p),v={};if(!d)return null;for(let k=1;k<d.length;k++){const m=d[k]||"",b=o[k-1];v[b.name]=m&&b.repeatable?m.split("/"):m}return v}function r(i){let d="",v=!1;for(const k of n){(!v||!d.endsWith("/"))&&(d+="/"),v=!1;for(const m of k)if(m.type===0)d+=m.value;else if(m.type===1){const{value:b,repeatable:E,optional:S}=m,y=b in i?i[b]:"";if(bs(y)&&!E)throw new Error(`Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`);const B=bs(y)?y.join("/"):y;if(!B)if(S)k.length<2&&(d.endsWith("/")?d=d.slice(0,-1):v=!0);else throw new Error(`Missing required param "${b}"`);d+=B}}return d||"/"}return{re:p,score:e,keys:o,parse:l,stringify:r}}function Kk(n,s){let a=0;for(;a<n.length&&a<s.length;){const e=s[a]-n[a];if(e)return e;a++}return n.length<s.length?n.length===1&&n[0]===80?-1:1:n.length>s.length?s.length===1&&s[0]===80?1:-1:0}function Xk(n,s){let a=0;const e=n.score,t=s.score;for(;a<e.length&&a<t.length;){const o=Kk(e[a],t[a]);if(o)return o;a++}if(Math.abs(t.length-e.length)===1){if(Dc(e))return 1;if(Dc(t))return-1}return t.length-e.length}function Dc(n){const s=n[n.length-1];return n.length>0&&s[s.length-1]<0}const Yk={type:0,value:""},Zk=/[a-zA-Z0-9_]/;function Qk(n){if(!n)return[[]];if(n==="/")return[[Yk]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function s(m){throw new Error(`ERR (${a})/"${i}": ${m}`)}let a=0,e=a;const t=[];let o;function p(){o&&t.push(o),o=[]}let l=0,r,i="",d="";function v(){i&&(a===0?o.push({type:0,value:i}):a===1||a===2||a===3?(o.length>1&&(r==="*"||r==="+")&&s(`A repeatable param (${i}) must be alone in its segment. eg: '/:ids+.`),o.push({type:1,value:i,regexp:d,repeatable:r==="*"||r==="+",optional:r==="*"||r==="?"})):s("Invalid state to consume buffer"),i="")}function k(){i+=r}for(;l<n.length;){if(r=n[l++],r==="\\"&&a!==2){e=a,a=4;continue}switch(a){case 0:r==="/"?(i&&v(),p()):r===":"?(v(),a=1):k();break;case 4:k(),a=e;break;case 1:r==="("?a=2:Zk.test(r)?k():(v(),a=0,r!=="*"&&r!=="?"&&r!=="+"&&l--);break;case 2:r===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+r:a=3:d+=r;break;case 3:v(),a=0,r!=="*"&&r!=="?"&&r!=="+"&&l--,d="";break;default:s("Unknown state");break}}return a===2&&s(`Unfinished custom RegExp for param "${i}"`),v(),p(),t}function nm(n,s,a){const e=qk(Qk(n.path),a),t=gn(e,{record:n,parent:s,children:[],alias:[]});return s&&!t.record.aliasOf==!s.record.aliasOf&&s.children.push(t),t}function sm(n,s){const a=[],e=new Map;s=xc({strict:!1,end:!0,sensitive:!1},s);function t(d){return e.get(d)}function o(d,v,k){const m=!k,b=am(d);b.aliasOf=k&&k.record;const E=xc(s,d),S=[b];if("alias"in d){const _=typeof d.alias=="string"?[d.alias]:d.alias;for(const R of _)S.push(gn({},b,{components:k?k.record.components:b.components,path:R,aliasOf:k?k.record:b}))}let y,B;for(const _ of S){const{path:R}=_;if(v&&R[0]!=="/"){const I=v.record.path,C=I[I.length-1]==="/"?"":"/";_.path=v.record.path+(R&&C+R)}if(y=nm(_,v,E),k?k.alias.push(y):(B=B||y,B!==y&&B.alias.push(y),m&&d.name&&!Cc(y)&&p(d.name)),b.children){const I=b.children;for(let C=0;C<I.length;C++)o(I[C],y,k&&k.children[C])}k=k||y,(y.record.components&&Object.keys(y.record.components).length||y.record.name||y.record.redirect)&&r(y)}return B?()=>{p(B)}:le}function p(d){if(Bi(d)){const v=e.get(d);v&&(e.delete(d),a.splice(a.indexOf(v),1),v.children.forEach(p),v.alias.forEach(p))}else{const v=a.indexOf(d);v>-1&&(a.splice(v,1),d.record.name&&e.delete(d.record.name),d.children.forEach(p),d.alias.forEach(p))}}function l(){return a}function r(d){let v=0;for(;v<a.length&&Xk(d,a[v])>=0&&(d.record.path!==a[v].record.path||!Ti(d,a[v]));)v++;a.splice(v,0,d),d.record.name&&!Cc(d)&&e.set(d.record.name,d)}function i(d,v){let k,m={},b,E;if("name"in d&&d.name){if(k=e.get(d.name),!k)throw $a(1,{location:d});E=k.record.name,m=gn(Tc(v.params,k.keys.filter(B=>!B.optional).map(B=>B.name)),d.params&&Tc(d.params,k.keys.map(B=>B.name))),b=k.stringify(m)}else if("path"in d)b=d.path,k=a.find(B=>B.re.test(b)),k&&(m=k.parse(b),E=k.record.name);else{if(k=v.name?e.get(v.name):a.find(B=>B.re.test(v.path)),!k)throw $a(1,{location:d,currentLocation:v});E=k.record.name,m=gn({},v.params,d.params),b=k.stringify(m)}const S=[];let y=k;for(;y;)S.unshift(y.record),y=y.parent;return{name:E,path:b,params:m,matched:S,meta:tm(S)}}return n.forEach(d=>o(d)),{addRoute:o,resolve:i,removeRoute:p,getRoutes:l,getRecordMatcher:t}}function Tc(n,s){const a={};for(const e of s)e in n&&(a[e]=n[e]);return a}function am(n){return{path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:void 0,beforeEnter:n.beforeEnter,props:em(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}}}function em(n){const s={},a=n.props||!1;if("component"in n)s.default=a;else for(const e in n.components)s[e]=typeof a=="object"?a[e]:a;return s}function Cc(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function tm(n){return n.reduce((s,a)=>gn(s,a.meta),{})}function xc(n,s){const a={};for(const e in n)a[e]=e in s?s[e]:n[e];return a}function Ti(n,s){return s.children.some(a=>a===n||Ti(n,a))}const Ci=/#/g,om=/&/g,pm=/\//g,cm=/=/g,lm=/\?/g,xi=/\+/g,im=/%5B/g,rm=/%5D/g,Li=/%5E/g,um=/%60/g,Oi=/%7B/g,dm=/%7C/g,Ii=/%7D/g,vm=/%20/g;function sp(n){return encodeURI(""+n).replace(dm,"|").replace(im,"[").replace(rm,"]")}function km(n){return sp(n).replace(Oi,"{").replace(Ii,"}").replace(Li,"^")}function fo(n){return sp(n).replace(xi,"%2B").replace(vm,"+").replace(Ci,"%23").replace(om,"%26").replace(um,"`").replace(Oi,"{").replace(Ii,"}").replace(Li,"^")}function mm(n){return fo(n).replace(cm,"%3D")}function fm(n){return sp(n).replace(Ci,"%23").replace(lm,"%3F")}function hm(n){return n==null?"":fm(n).replace(pm,"%2F")}function rt(n){try{return decodeURIComponent(""+n)}catch{}return""+n}function bm(n){const s={};if(n===""||n==="?")return s;const e=(n[0]==="?"?n.slice(1):n).split("&");for(let t=0;t<e.length;++t){const o=e[t].replace(xi," "),p=o.indexOf("="),l=rt(p<0?o:o.slice(0,p)),r=p<0?null:rt(o.slice(p+1));if(l in s){let i=s[l];bs(i)||(i=s[l]=[i]),i.push(r)}else s[l]=r}return s}function Lc(n){let s="";for(let a in n){const e=n[a];if(a=mm(a),e==null){e!==void 0&&(s+=(s.length?"&":"")+a);continue}(bs(e)?e.map(o=>o&&fo(o)):[e&&fo(e)]).forEach(o=>{o!==void 0&&(s+=(s.length?"&":"")+a,o!=null&&(s+="="+o))})}return s}function gm(n){const s={};for(const a in n){const e=n[a];e!==void 0&&(s[a]=bs(e)?e.map(t=>t==null?null:""+t):e==null?e:""+e)}return s}const Em=Symbol(""),Oc=Symbol(""),St=Symbol(""),ap=Symbol(""),ho=Symbol("");function ne(){let n=[];function s(e){return n.push(e),()=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)}}function a(){n=[]}return{add:s,list:()=>n.slice(),reset:a}}function Gs(n,s,a,e,t){const o=e&&(e.enterCallbacks[t]=e.enterCallbacks[t]||[]);return()=>new Promise((p,l)=>{const r=v=>{v===!1?l($a(4,{from:a,to:s})):v instanceof Error?l(v):zk(v)?l($a(2,{from:s,to:v})):(o&&e.enterCallbacks[t]===o&&typeof v=="function"&&o.push(v),p())},i=n.call(e&&e.instances[t],s,a,r);let d=Promise.resolve(i);n.length<3&&(d=d.then(r)),d.catch(v=>l(v))})}function zt(n,s,a,e){const t=[];for(const o of n)for(const p in o.components){let l=o.components[p];if(!(s!=="beforeRouteEnter"&&!o.instances[p]))if(ym(l)){const i=(l.__vccOpts||l)[s];i&&t.push(Gs(i,a,e,o,p))}else{let r=l();t.push(()=>r.then(i=>{if(!i)return Promise.reject(new Error(`Couldn't resolve component "${p}" at "${o.path}"`));const d=Bk(i)?i.default:i;o.components[p]=d;const k=(d.__vccOpts||d)[s];return k&&Gs(k,a,e,o,p)()}))}}return t}function ym(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function bo(n){const s=dn(St),a=dn(ap),e=w(()=>s.resolve(ia(n.to))),t=w(()=>{const{matched:r}=e.value,{length:i}=r,d=r[i-1],v=a.matched;if(!d||!v.length)return-1;const k=v.findIndex(Ha.bind(null,d));if(k>-1)return k;const m=Ic(r[i-2]);return i>1&&Ic(d)===m&&v[v.length-1].path!==m?v.findIndex(Ha.bind(null,r[i-2])):k}),o=w(()=>t.value>-1&&Sm(a.params,e.value.params)),p=w(()=>t.value>-1&&t.value===a.matched.length-1&&Si(a.params,e.value.params));function l(r={}){return wm(r)?s[ia(n.replace)?"replace":"push"](ia(n.to)).catch(le):Promise.resolve()}return{route:e,href:w(()=>e.value.href),isActive:o,isExactActive:p,navigate:l}}const _m=j({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:bo,setup(n,{slots:s}){const a=ye(bo(n)),{options:e}=dn(St),t=w(()=>({[Pc(n.activeClass,e.linkActiveClass,"router-link-active")]:a.isActive,[Pc(n.exactActiveClass,e.linkExactActiveClass,"router-link-exact-active")]:a.isExactActive}));return()=>{const o=s.default&&s.default(a);return n.custom?o:c("a",{"aria-current":a.isExactActive?n.ariaCurrentValue:null,href:a.href,onClick:a.navigate,class:t.value},o)}}}),Am=_m;function wm(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const s=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(s))return}return n.preventDefault&&n.preventDefault(),!0}}function Sm(n,s){for(const a in s){const e=s[a],t=n[a];if(typeof e=="string"){if(e!==t)return!1}else if(!bs(t)||t.length!==e.length||e.some((o,p)=>o!==t[p]))return!1}return!0}function Ic(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const Pc=(n,s,a)=>n??s??a,Rm=j({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:s,slots:a}){const e=dn(ho),t=w(()=>n.route||e.value),o=dn(Oc,0),p=w(()=>{let i=ia(o);const{matched:d}=t.value;let v;for(;(v=d[i])&&!v.components;)i++;return i}),l=w(()=>t.value.matched[p.value]);is(Oc,w(()=>p.value+1)),is(Em,l),is(ho,t);const r=U();return cn(()=>[r.value,l.value,n.name],([i,d,v],[k,m,b])=>{d&&(d.instances[v]=i,m&&m!==d&&i&&i===k&&(d.leaveGuards.size||(d.leaveGuards=m.leaveGuards),d.updateGuards.size||(d.updateGuards=m.updateGuards))),i&&d&&(!m||!Ha(d,m)||!k)&&(d.enterCallbacks[v]||[]).forEach(E=>E(i))},{flush:"post"}),()=>{const i=t.value,d=n.name,v=l.value,k=v&&v.components[d];if(!k)return Vc(a.default,{Component:k,route:i});const m=v.props[d],b=m?m===!0?i.params:typeof m=="function"?m(i):m:null,S=c(k,gn({},b,s,{onVnodeUnmounted:y=>{y.component.isUnmounted&&(v.instances[d]=null)},ref:r}));return Vc(a.default,{Component:S,route:i})||S}}});function Vc(n,s){if(!n)return null;const a=n(s);return a.length===1?a[0]:a}const Pi=Rm;function Bm(n){const s=sm(n.routes,n),a=n.parseQuery||bm,e=n.stringifyQuery||Lc,t=n.history,o=ne(),p=ne(),l=ne(),r=Ln(Os);let i=Os;wa&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=Jt.bind(null,T=>""+T),v=Jt.bind(null,hm),k=Jt.bind(null,rt);function m(T,z){let N,X;return Bi(T)?(N=s.getRecordMatcher(T),X=z):X=T,s.addRoute(X,N)}function b(T){const z=s.getRecordMatcher(T);z&&s.removeRoute(z)}function E(){return s.getRoutes().map(T=>T.record)}function S(T){return!!s.getRecordMatcher(T)}function y(T,z){if(z=gn({},z||r.value),typeof T=="string"){const A=Wt(a,T,z.path),D=s.resolve({path:A.path},z),x=t.createHref(A.fullPath);return gn(A,D,{params:k(D.params),hash:rt(A.hash),redirectedFrom:void 0,href:x})}let N;if("path"in T)N=gn({},T,{path:Wt(a,T.path,z.path).path});else{const A=gn({},T.params);for(const D in A)A[D]==null&&delete A[D];N=gn({},T,{params:v(A)}),z.params=v(z.params)}const X=s.resolve(N,z),kn=T.hash||"";X.params=d(k(X.params));const h=Ck(e,gn({},T,{hash:km(kn),path:X.path})),g=t.createHref(h);return gn({fullPath:h,hash:kn,query:e===Lc?gm(T.query):T.query||{}},X,{redirectedFrom:void 0,href:g})}function B(T){return typeof T=="string"?Wt(a,T,r.value.path):gn({},T)}function _(T,z){if(i!==T)return $a(8,{from:z,to:T})}function R(T){return M(T)}function I(T){return R(gn(B(T),{replace:!0}))}function C(T){const z=T.matched[T.matched.length-1];if(z&&z.redirect){const{redirect:N}=z;let X=typeof N=="function"?N(T):N;return typeof X=="string"&&(X=X.includes("?")||X.includes("#")?X=B(X):{path:X},X.params={}),gn({query:T.query,hash:T.hash,params:"path"in X?{}:T.params},X)}}function M(T,z){const N=i=y(T),X=r.value,kn=T.state,h=T.force,g=T.replace===!0,A=C(N);if(A)return M(gn(B(A),{state:typeof A=="object"?gn({},kn,A.state):kn,force:h,replace:g}),z||N);const D=N;D.redirectedFrom=z;let x;return!h&&xk(e,X,N)&&(x=$a(16,{to:D,from:X}),ts(X,X,!0,!1)),(x?Promise.resolve(x):H(D,X)).catch(L=>Cs(L)?Cs(L,2)?L:Es(L):q(L,D,X)).then(L=>{if(L){if(Cs(L,2))return M(gn({replace:g},B(L.to),{state:typeof L.to=="object"?gn({},kn,L.to.state):kn,force:h}),z||D)}else L=J(D,X,!0,g,kn);return Y(D,X,L),L})}function P(T,z){const N=_(T,z);return N?Promise.reject(N):Promise.resolve()}function V(T){const z=Ts.values().next().value;return z&&typeof z.runWithContext=="function"?z.runWithContext(T):T()}function H(T,z){let N;const[X,kn,h]=Dm(T,z);N=zt(X.reverse(),"beforeRouteLeave",T,z);for(const A of X)A.leaveGuards.forEach(D=>{N.push(Gs(D,T,z))});const g=P.bind(null,T,z);return N.push(g),In(N).then(()=>{N=[];for(const A of o.list())N.push(Gs(A,T,z));return N.push(g),In(N)}).then(()=>{N=zt(kn,"beforeRouteUpdate",T,z);for(const A of kn)A.updateGuards.forEach(D=>{N.push(Gs(D,T,z))});return N.push(g),In(N)}).then(()=>{N=[];for(const A of h)if(A.beforeEnter)if(bs(A.beforeEnter))for(const D of A.beforeEnter)N.push(Gs(D,T,z));else N.push(Gs(A.beforeEnter,T,z));return N.push(g),In(N)}).then(()=>(T.matched.forEach(A=>A.enterCallbacks={}),N=zt(h,"beforeRouteEnter",T,z),N.push(g),In(N))).then(()=>{N=[];for(const A of p.list())N.push(Gs(A,T,z));return N.push(g),In(N)}).catch(A=>Cs(A,8)?A:Promise.reject(A))}function Y(T,z,N){l.list().forEach(X=>V(()=>X(T,z,N)))}function J(T,z,N,X,kn){const h=_(T,z);if(h)return h;const g=z===Os,A=wa?history.state:{};N&&(X||g?t.replace(T.fullPath,gn({scroll:g&&A&&A.scroll},kn)):t.push(T.fullPath,kn)),r.value=T,ts(T,z,N,g),Es()}let sn;function Tn(){sn||(sn=t.listen((T,z,N)=>{if(!ys.listening)return;const X=y(T),kn=C(X);if(kn){M(gn(kn,{replace:!0}),X).catch(le);return}i=X;const h=r.value;wa&&jk(wc(h.fullPath,N.delta),wt()),H(X,h).catch(g=>Cs(g,12)?g:Cs(g,2)?(M(g.to,X).then(A=>{Cs(A,20)&&!N.delta&&N.type===he.pop&&t.go(-1,!1)}).catch(le),Promise.reject()):(N.delta&&t.go(-N.delta,!1),q(g,X,h))).then(g=>{g=g||J(X,h,!1),g&&(N.delta&&!Cs(g,8)?t.go(-N.delta,!1):N.type===he.pop&&Cs(g,20)&&t.go(-1,!1)),Y(X,h,g)}).catch(le)}))}let Bn=ne(),G=ne(),an;function q(T,z,N){Es(T);const X=G.list();return X.length?X.forEach(kn=>kn(T,z,N)):console.error(T),Promise.reject(T)}function On(){return an&&r.value!==Os?Promise.resolve():new Promise((T,z)=>{Bn.add([T,z])})}function Es(T){return an||(an=!T,Tn(),Bn.list().forEach(([z,N])=>T?N(T):z()),Bn.reset()),T}function ts(T,z,N,X){const{scrollBehavior:kn}=n;if(!wa||!kn)return Promise.resolve();const h=!N&&Nk(wc(T.fullPath,0))||(X||!N)&&history.state&&history.state.scroll||null;return ma().then(()=>kn(T,z,h)).then(g=>g&&Mk(g)).catch(g=>q(g,T,z))}const jn=T=>t.go(T);let Zn;const Ts=new Set,ys={currentRoute:r,listening:!0,addRoute:m,removeRoute:b,hasRoute:S,getRoutes:E,resolve:y,options:n,push:R,replace:I,go:jn,back:()=>jn(-1),forward:()=>jn(1),beforeEach:o.add,beforeResolve:p.add,afterEach:l.add,onError:G.add,isReady:On,install(T){const z=this;T.component("RouterLink",Am),T.component("RouterView",Pi),T.config.globalProperties.$router=z,Object.defineProperty(T.config.globalProperties,"$route",{enumerable:!0,get:()=>ia(r)}),wa&&!Zn&&r.value===Os&&(Zn=!0,R(t.location).catch(kn=>{}));const N={};for(const kn in Os)Object.defineProperty(N,kn,{get:()=>r.value[kn],enumerable:!0});T.provide(St,z),T.provide(ap,Al(N)),T.provide(ho,r);const X=T.unmount;Ts.add(T),T.unmount=function(){Ts.delete(T),Ts.size<1&&(i=Os,sn&&sn(),sn=null,r.value=Os,Zn=!1,an=!1),X()}}};function In(T){return T.reduce((z,N)=>z.then(()=>V(N)),Promise.resolve())}return ys}function Dm(n,s){const a=[],e=[],t=[],o=Math.max(s.matched.length,n.matched.length);for(let p=0;p<o;p++){const l=s.matched[p];l&&(n.matched.find(i=>Ha(i,l))?e.push(l):a.push(l));const r=n.matched[p];r&&(s.matched.find(i=>Ha(i,r))||t.push(r))}return[a,e,t]}function qn(){return dn(St)}function Ds(){return dn(ap)}var Gn=Uint8Array,Ra=Uint16Array,Tm=Int32Array,Vi=new Gn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Fi=new Gn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Cm=new Gn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Mi=function(n,s){for(var a=new Ra(31),e=0;e<31;++e)a[e]=s+=1<<n[e-1];for(var t=new Tm(a[30]),e=1;e<30;++e)for(var o=a[e];o<a[e+1];++o)t[o]=o-a[e]<<5|e;return{b:a,r:t}},ji=Mi(Vi,2),Ni=ji.b,xm=ji.r;Ni[28]=258,xm[258]=28;var Lm=Mi(Fi,0),Om=Lm.b,go=new Ra(32768);for(var Rn=0;Rn<32768;++Rn){var $s=(Rn&43690)>>1|(Rn&21845)<<1;$s=($s&52428)>>2|($s&13107)<<2,$s=($s&61680)>>4|($s&3855)<<4,go[Rn]=(($s&65280)>>8|($s&255)<<8)>>1}var re=function(n,s,a){for(var e=n.length,t=0,o=new Ra(s);t<e;++t)n[t]&&++o[n[t]-1];var p=new Ra(s);for(t=1;t<s;++t)p[t]=p[t-1]+o[t-1]<<1;var l;if(a){l=new Ra(1<<s);var r=15-s;for(t=0;t<e;++t)if(n[t])for(var i=t<<4|n[t],d=s-n[t],v=p[n[t]-1]++<<d,k=v|(1<<d)-1;v<=k;++v)l[go[v]>>r]=i}else for(l=new Ra(e),t=0;t<e;++t)n[t]&&(l[t]=go[p[n[t]-1]++]>>15-n[t]);return l},we=new Gn(288);for(var Rn=0;Rn<144;++Rn)we[Rn]=8;for(var Rn=144;Rn<256;++Rn)we[Rn]=9;for(var Rn=256;Rn<280;++Rn)we[Rn]=7;for(var Rn=280;Rn<288;++Rn)we[Rn]=8;var Hi=new Gn(32);for(var Rn=0;Rn<32;++Rn)Hi[Rn]=5;var Im=re(we,9,1),Pm=re(Hi,5,1),Gt=function(n){for(var s=n[0],a=1;a<n.length;++a)n[a]>s&&(s=n[a]);return s},vs=function(n,s,a){var e=s/8|0;return(n[e]|n[e+1]<<8)>>(s&7)&a},Ut=function(n,s){var a=s/8|0;return(n[a]|n[a+1]<<8|n[a+2]<<16)>>(s&7)},Vm=function(n){return(n+7)/8|0},ep=function(n,s,a){return(s==null||s<0)&&(s=0),(a==null||a>n.length)&&(a=n.length),new Gn(n.subarray(s,a))},Fm=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],cs=function(n,s,a){var e=new Error(s||Fm[n]);if(e.code=n,Error.captureStackTrace&&Error.captureStackTrace(e,cs),!a)throw e;return e},Mm=function(n,s,a,e){var t=n.length,o=e?e.length:0;if(!t||s.f&&!s.l)return a||new Gn(0);var p=!a,l=p||s.i!=2,r=s.i;p&&(a=new Gn(t*3));var i=function(kn){var h=a.length;if(kn>h){var g=new Gn(Math.max(h*2,kn));g.set(a),a=g}},d=s.f||0,v=s.p||0,k=s.b||0,m=s.l,b=s.d,E=s.m,S=s.n,y=t*8;do{if(!m){d=vs(n,v,1);var B=vs(n,v+1,3);if(v+=3,B)if(B==1)m=Im,b=Pm,E=9,S=5;else if(B==2){var C=vs(n,v,31)+257,M=vs(n,v+10,15)+4,P=C+vs(n,v+5,31)+1;v+=14;for(var V=new Gn(P),H=new Gn(19),Y=0;Y<M;++Y)H[Cm[Y]]=vs(n,v+Y*3,7);v+=M*3;for(var J=Gt(H),sn=(1<<J)-1,Tn=re(H,J,1),Y=0;Y<P;){var Bn=Tn[vs(n,v,sn)];v+=Bn&15;var _=Bn>>4;if(_<16)V[Y++]=_;else{var G=0,an=0;for(_==16?(an=3+vs(n,v,3),v+=2,G=V[Y-1]):_==17?(an=3+vs(n,v,7),v+=3):_==18&&(an=11+vs(n,v,127),v+=7);an--;)V[Y++]=G}}var q=V.subarray(0,C),On=V.subarray(C);E=Gt(q),S=Gt(On),m=re(q,E,1),b=re(On,S,1)}else cs(1);else{var _=Vm(v)+4,R=n[_-4]|n[_-3]<<8,I=_+R;if(I>t){r&&cs(0);break}l&&i(k+R),a.set(n.subarray(_,I),k),s.b=k+=R,s.p=v=I*8,s.f=d;continue}if(v>y){r&&cs(0);break}}l&&i(k+131072);for(var Es=(1<<E)-1,ts=(1<<S)-1,jn=v;;jn=v){var G=m[Ut(n,v)&Es],Zn=G>>4;if(v+=G&15,v>y){r&&cs(0);break}if(G||cs(2),Zn<256)a[k++]=Zn;else if(Zn==256){jn=v,m=null;break}else{var Ts=Zn-254;if(Zn>264){var Y=Zn-257,ys=Vi[Y];Ts=vs(n,v,(1<<ys)-1)+Ni[Y],v+=ys}var In=b[Ut(n,v)&ts],T=In>>4;In||cs(3),v+=In&15;var On=Om[T];if(T>3){var ys=Fi[T];On+=Ut(n,v)&(1<<ys)-1,v+=ys}if(v>y){r&&cs(0);break}l&&i(k+131072);var z=k+Ts;if(k<On){var N=o-On,X=Math.min(On,z);for(N+k<0&&cs(3);k<X;++k)a[k]=e[N+k]}for(;k<z;++k)a[k]=a[k-On]}}s.l=m,s.p=jn,s.b=k,s.f=d,m&&(d=1,s.m=E,s.d=b,s.n=S)}while(!d);return k!=a.length&&p?ep(a,0,k):a.subarray(0,k)},jm=new Gn(0),Nm=function(n,s){return((n[0]&15)!=8||n[0]>>4>7||(n[0]<<8|n[1])%31)&&cs(6,"invalid zlib data"),(n[1]>>5&1)==+!s&&cs(6,"invalid zlib data: "+(n[1]&32?"need":"unexpected")+" dictionary"),(n[1]>>3&4)+2};function Hm(n,s){return Mm(n.subarray(Nm(n,s&&s.dictionary),-4),{i:2},s&&s.out,s&&s.dictionary)}var Fc=typeof TextEncoder<"u"&&new TextEncoder,Eo=typeof TextDecoder<"u"&&new TextDecoder,$m=0;try{Eo.decode(jm,{stream:!0}),$m=1}catch{}var Jm=function(n){for(var s="",a=0;;){var e=n[a++],t=(e>127)+(e>223)+(e>239);if(a+t>n.length)return{s,r:ep(n,a-1)};t?t==3?(e=((e&15)<<18|(n[a++]&63)<<12|(n[a++]&63)<<6|n[a++]&63)-65536,s+=String.fromCharCode(55296|e>>10,56320|e&1023)):t&1?s+=String.fromCharCode((e&31)<<6|n[a++]&63):s+=String.fromCharCode((e&15)<<12|(n[a++]&63)<<6|n[a++]&63):s+=String.fromCharCode(e)}};function Wm(n,s){if(s){for(var a=new Gn(n.length),e=0;e<n.length;++e)a[e]=n.charCodeAt(e);return a}if(Fc)return Fc.encode(n);for(var t=n.length,o=new Gn(n.length+(n.length>>1)),p=0,l=function(d){o[p++]=d},e=0;e<t;++e){if(p+5>o.length){var r=new Gn(p+8+(t-e<<1));r.set(o),o=r}var i=n.charCodeAt(e);i<128||s?l(i):i<2048?(l(192|i>>6),l(128|i&63)):i>55295&&i<57344?(i=65536+(i&1047552)|n.charCodeAt(++e)&1023,l(240|i>>18),l(128|i>>12&63),l(128|i>>6&63),l(128|i&63)):(l(224|i>>12),l(128|i>>6&63),l(128|i&63))}return ep(o,0,p)}function zm(n,s){if(s){for(var a="",e=0;e<n.length;e+=16384)a+=String.fromCharCode.apply(null,n.subarray(e,e+16384));return a}else{if(Eo)return Eo.decode(n);var t=Jm(n),o=t.s,a=t.r;return a.length&&cs(8),o}}const on=({name:n="",color:s="currentColor"},{slots:a})=>{var e;return c("svg",{xmlns:"http://www.w3.org/2000/svg",class:["icon",`${n}-icon`],viewBox:"0 0 1024 1024",fill:s,"aria-label":`${n} icon`},(e=a.default)==null?void 0:e.call(a))};on.displayName="IconBase";const tp=({size:n=48,stroke:s=4,wrapper:a=!0,height:e=2*n})=>{const t=c("svg",{xmlns:"http://www.w3.org/2000/svg",width:n,height:n,preserveAspectRatio:"xMidYMid",viewBox:"25 25 50 50"},[c("animateTransform",{attributeName:"transform",type:"rotate",dur:"2s",keyTimes:"0;1",repeatCount:"indefinite",values:"0;360"}),c("circle",{cx:"50",cy:"50",r:"20",fill:"none",stroke:"currentColor","stroke-width":s,"stroke-linecap":"round"},[c("animate",{attributeName:"stroke-dasharray",dur:"1.5s",keyTimes:"0;0.5;1",repeatCount:"indefinite",values:"1,200;90,200;1,200"}),c("animate",{attributeName:"stroke-dashoffset",dur:"1.5s",keyTimes:"0;0.5;1",repeatCount:"indefinite",values:"0;-35px;-125px"})])]);return a?c("div",{class:"loading-icon-wrapper",style:`display:flex;align-items:center;justify-content:center;height:${e}px`},t):t};tp.displayName="LoadingIcon";const $i=(n,{slots:s})=>{var a;return(a=s.default)==null?void 0:a.call(s)},Gm=n=>[/\((ipad);[-\w),; ]+apple/i,/applecoremedia\/[\w.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i].some(s=>s.test(n)),Um=n=>[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/cfnetwork\/.+darwin/i].some(s=>s.test(n)),qm=n=>[/(mac os x) ?([\w. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i].some(s=>s.test(n)),op=(n="")=>{if(n){if(typeof n=="number")return new Date(n);const s=Date.parse(n.toString());if(!Number.isNaN(s))return new Date(s)}return null},Rt=(n,s)=>{let a=1;for(let e=0;e<n.length;e++)a+=n.charCodeAt(e),a+=a<<10,a^=a>>6;return a+=a<<3,a^=a>>11,a%s},pp=Array.isArray,Km=n=>typeof n=="function",Xm=n=>typeof n=="string";var cp=n=>/^(https?:)?\/\//.test(n),Ym=/.md((\?|#).*)?$/,Zm=(n,s="/")=>!!(cp(n)||n.startsWith("/")&&!n.startsWith(s)&&!Ym.test(n)),Ze=n=>Object.prototype.toString.call(n)==="[object Object]";function Qm(){const n=U(!1);return Zs()&&bn(()=>{n.value=!0}),n}function n1(n){return Qm(),w(()=>!!n())}const Vs=n=>typeof n=="string",da=(n,s)=>Vs(n)&&n.startsWith(s),_a=(n,s)=>Vs(n)&&n.endsWith(s),ba=Object.entries,s1=Object.fromEntries,us=Object.keys,yo=(n,...s)=>{if(s.length===0)return n;const a=s.shift()||null;return a&&ba(a).forEach(([e,t])=>{e==="__proto__"||e==="constructor"||(Ze(n[e])&&Ze(t)?yo(n[e],t):pp(t)?n[e]=[...t]:Ze(t)?n[e]={...t}:n[e]=a[e])}),yo(n,...s)},a1=n=>(n.endsWith(".md")&&(n=`${n.slice(0,-3)}.html`),!n.endsWith("/")&&!n.endsWith(".html")&&(n=`${n}.html`),n=n.replace(/(^|\/)(?:README|index).html$/i,"$1"),n),Ji=n=>{const[s,a=""]=n.split("#");return s?`${a1(s)}${a?`#${a}`:""}`:n},Mc=n=>Ze(n)&&Vs(n.name),be=(n,s=!1)=>n?pp(n)?n.map(a=>Vs(a)?{name:a}:Mc(a)?a:null).filter(a=>a!==null):Vs(n)?[{name:n}]:Mc(n)?[n]:(console.error(`Expect "author" to be \`AuthorInfo[] | AuthorInfo | string[] | string ${s?"":"| false"} | undefined\`, but got`,n),[]):[],Wi=(n,s)=>{if(n){if(pp(n)&&n.every(Vs))return n;if(Vs(n))return[n];console.error(`Expect ${s||"value"} to be \`string[] | string | undefined\`, but got`,n)}return[]},zi=n=>Wi(n,"category"),Gi=n=>Wi(n,"tag"),Se=n=>da(n,"/");let e1=class{constructor(){this.messageElements={};const s="message-container",a=document.getElementById(s);a?this.containerElement=a:(this.containerElement=document.createElement("div"),this.containerElement.id=s,document.body.appendChild(this.containerElement))}pop(s,a=2e3){const e=document.createElement("div"),t=Date.now();return e.className="message move-in",e.innerHTML=s,this.containerElement.appendChild(e),this.messageElements[t]=e,a>0&&setTimeout(()=>{this.close(t)},a),t}close(s){if(s){const a=this.messageElements[s];a.classList.remove("move-in"),a.classList.add("move-out"),a.addEventListener("animationend",()=>{a.remove(),delete this.messageElements[s]})}else us(this.messageElements).forEach(a=>this.close(Number(a)))}destroy(){document.body.removeChild(this.containerElement)}};const Ui=/#.*$/u,t1=n=>{const s=Ui.exec(n);return s?s[0]:""},jc=n=>decodeURI(n).replace(Ui,"").replace(/(index)?\.html$/i,"").replace(/(README|index)?\.md$/i,""),qi=(n,s)=>{if(s===void 0)return!1;const a=jc(n.path),e=jc(s),t=t1(s);return t?t===n.hash&&(!e||a===e):a===e},Nc=n=>{const s=atob(n);return zm(Hm(Wm(s,!0)))},o1=n=>cp(n)?n:`https://github.com/${n}`,Ki=n=>!cp(n)||/github\.com/.test(n)?"GitHub":/bitbucket\.org/.test(n)?"Bitbucket":/gitlab\.com/.test(n)?"GitLab":/gitee\.com/.test(n)?"Gitee":null,Ja=(n,...s)=>{const a=n.resolve(...s),e=a.matched[a.matched.length-1];if(!(e!=null&&e.redirect))return a;const{redirect:t}=e,o=Km(t)?t(a):t,p=Xm(o)?{path:o}:o;return Ja(n,{hash:a.hash,query:a.query,params:a.params,...p})},p1=n=>{var s;if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)&&!(n.currentTarget&&((s=n.currentTarget.getAttribute("target"))!=null&&s.match(/\b_blank\b/i))))return n.preventDefault(),!0},$n=({to:n="",class:s="",...a},{slots:e})=>{var l;const t=qn(),o=Ji(n),p=(r={})=>p1(r)?t.push(n).catch():Promise.resolve();return c("a",{...a,class:["vp-link",s],href:da(o,"/")?Dn(o):o,onClick:p},(l=e.default)==null?void 0:l.call(e))};$n.displayName="VPLink";const Xi=()=>c(on,{name:"github"},()=>c("path",{d:"M511.957 21.333C241.024 21.333 21.333 240.981 21.333 512c0 216.832 140.544 400.725 335.574 465.664 24.49 4.395 32.256-10.07 32.256-23.083 0-11.69.256-44.245 0-85.205-136.448 29.61-164.736-64.64-164.736-64.64-22.315-56.704-54.4-71.765-54.4-71.765-44.587-30.464 3.285-29.824 3.285-29.824 49.195 3.413 75.179 50.517 75.179 50.517 43.776 75.008 114.816 53.333 142.762 40.79 4.523-31.66 17.152-53.377 31.19-65.537-108.971-12.458-223.488-54.485-223.488-242.602 0-53.547 19.114-97.323 50.517-131.67-5.035-12.33-21.93-62.293 4.779-129.834 0 0 41.258-13.184 134.912 50.346a469.803 469.803 0 0 1 122.88-16.554c41.642.213 83.626 5.632 122.88 16.554 93.653-63.488 134.784-50.346 134.784-50.346 26.752 67.541 9.898 117.504 4.864 129.834 31.402 34.347 50.474 78.123 50.474 131.67 0 188.586-114.73 230.016-224.042 242.09 17.578 15.232 33.578 44.672 33.578 90.454v135.85c0 13.142 7.936 27.606 32.854 22.87C862.25 912.597 1002.667 728.747 1002.667 512c0-271.019-219.648-490.667-490.71-490.667z"}));Xi.displayName="GitHubIcon";const Yi=()=>c(on,{name:"gitlab"},()=>c("path",{d:"M229.333 78.688C223.52 62 199.895 62 193.895 78.688L87.958 406.438h247.5c-.188 0-106.125-327.75-106.125-327.75zM33.77 571.438c-4.875 15 .563 31.687 13.313 41.25l464.812 345L87.77 406.438zm301.5-165 176.813 551.25 176.812-551.25zm655.125 165-54-165-424.312 551.25 464.812-345c12.938-9.563 18.188-26.25 13.5-41.25zM830.27 78.688c-5.812-16.688-29.437-16.688-35.437 0l-106.125 327.75h247.5z"}));Yi.displayName="GitLabIcon";const Zi=()=>c(on,{name:"gitee"},()=>c("path",{d:"M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm242.97-533.34H482.39a23.7 23.7 0 0 0-23.7 23.7l-.03 59.28c0 13.08 10.59 23.7 23.7 23.7h165.96a23.7 23.7 0 0 1 23.7 23.7v11.85a71.1 71.1 0 0 1-71.1 71.1H375.71a23.7 23.7 0 0 1-23.7-23.7V423.11a71.1 71.1 0 0 1 71.1-71.1h331.8a23.7 23.7 0 0 0 23.7-23.7l.06-59.25a23.73 23.73 0 0 0-23.7-23.73H423.11a177.78 177.78 0 0 0-177.78 177.75v331.83c0 13.08 10.62 23.7 23.7 23.7h349.62a159.99 159.99 0 0 0 159.99-159.99V482.33a23.7 23.7 0 0 0-23.7-23.7z"}));Zi.displayName="GiteeIcon";const Qi=()=>c(on,{name:"bitbucket"},()=>c("path",{d:"M575.256 490.862c6.29 47.981-52.005 85.723-92.563 61.147-45.714-20.004-45.714-92.562-1.133-113.152 38.29-23.442 93.696 7.424 93.696 52.005zm63.451-11.996c-10.276-81.152-102.29-134.839-177.152-101.156-47.433 21.138-79.433 71.424-77.129 124.562 2.853 69.705 69.157 126.866 138.862 120.576S647.3 548.571 638.708 478.83zm136.558-309.723c-25.161-33.134-67.986-38.839-105.728-45.13-106.862-17.151-216.576-17.7-323.438 1.134-35.438 5.706-75.447 11.996-97.719 43.996 36.572 34.304 88.576 39.424 135.424 45.129 84.553 10.862 171.447 11.447 256 .585 47.433-5.705 99.987-10.276 135.424-45.714zm32.585 591.433c-16.018 55.99-6.839 131.438-66.304 163.986-102.29 56.576-226.304 62.867-338.87 42.862-59.43-10.862-129.135-29.696-161.72-85.723-14.3-54.858-23.442-110.848-32.585-166.84l3.438-9.142 10.276-5.157c170.277 112.567 408.576 112.567 579.438 0 26.844 8.01 6.84 40.558 6.29 60.014zm103.424-549.157c-19.42 125.148-41.728 249.71-63.415 374.272-6.29 36.572-41.728 57.162-71.424 72.558-106.862 53.724-231.424 62.866-348.562 50.286-79.433-8.558-160.585-29.696-225.134-79.433-30.28-23.443-30.28-63.415-35.986-97.134-20.005-117.138-42.862-234.277-57.161-352.585 6.839-51.42 64.585-73.728 107.447-89.71 57.16-21.138 118.272-30.866 178.87-36.571 129.134-12.58 261.157-8.01 386.304 28.562 44.581 13.13 92.563 31.415 122.844 69.705 13.714 17.7 9.143 40.01 6.29 60.014z"}));Qi.displayName="BitbucketIcon";const nr=()=>c(on,{name:"source"},()=>c("path",{d:"M601.92 475.2c0 76.428-8.91 83.754-28.512 99.594-14.652 11.88-43.956 14.058-78.012 16.434-18.81 1.386-40.392 2.97-62.172 6.534-18.612 2.97-36.432 9.306-53.064 17.424V299.772c37.818-21.978 63.36-62.766 63.36-109.692 0-69.894-56.826-126.72-126.72-126.72S190.08 120.186 190.08 190.08c0 46.926 25.542 87.714 63.36 109.692v414.216c-37.818 21.978-63.36 62.766-63.36 109.692 0 69.894 56.826 126.72 126.72 126.72s126.72-56.826 126.72-126.72c0-31.086-11.286-59.598-29.7-81.576 13.266-9.504 27.522-17.226 39.996-19.206 16.038-2.574 32.868-3.762 50.688-5.148 48.312-3.366 103.158-7.326 148.896-44.55 61.182-49.698 74.25-103.158 75.24-187.902V475.2h-126.72zM316.8 126.72c34.848 0 63.36 28.512 63.36 63.36s-28.512 63.36-63.36 63.36-63.36-28.512-63.36-63.36 28.512-63.36 63.36-63.36zm0 760.32c-34.848 0-63.36-28.512-63.36-63.36s28.512-63.36 63.36-63.36 63.36 28.512 63.36 63.36-28.512 63.36-63.36 63.36zM823.68 158.4h-95.04V63.36h-126.72v95.04h-95.04v126.72h95.04v95.04h126.72v-95.04h95.04z"}));nr.displayName="SourceIcon";const hs=(n,s)=>{var e;const a=(e=(s==null?void 0:s._instance)||Zs())==null?void 0:e.appContext.components;return a?n in a||rs(n)in a||Ee(rs(n))in a:!1},c1=()=>n1(()=>typeof window<"u"&&window.navigator&&"userAgent"in window.navigator),sr=()=>{const n=c1();return w(()=>n.value&&/\b(?:Android|iPhone)/i.test(navigator.userAgent))},Qs=n=>{const s=Bs();return w(()=>n[s.value])};function Hc(n,s){var a;const e=Ln();return Pl(()=>{e.value=n()},{...s,flush:(a=s==null?void 0:s.flush)!=null?a:"sync"}),ka(e)}function lp(n,s){let a,e,t;const o=U(!0),p=()=>{o.value=!0,t()};cn(n,p,{flush:"sync"});const l=typeof s=="function"?s:s.get,r=typeof s=="function"?void 0:s.set,i=Dl((d,v)=>(e=d,t=v,{get(){return o.value&&(a=l(),o.value=!1),e(),a},set(k){r==null||r(k)}}));return Object.isExtensible(i)&&(i.trigger=p),i}function Ka(n){return dl()?(Uu(n),!0):!1}function Hn(n){return typeof n=="function"?n():ia(n)}const Re=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const l1=Object.prototype.toString,i1=n=>l1.call(n)==="[object Object]",Fs=()=>{},_o=r1();function r1(){var n;return Re&&((n=window==null?void 0:window.navigator)==null?void 0:n.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent)}function ip(n,s){function a(...e){return new Promise((t,o)=>{Promise.resolve(n(()=>s.apply(this,e),{fn:s,thisArg:this,args:e})).then(t).catch(o)})}return a}const ar=n=>n();function u1(n,s={}){let a,e,t=Fs;const o=l=>{clearTimeout(l),t(),t=Fs};return l=>{const r=Hn(n),i=Hn(s.maxWait);return a&&o(a),r<=0||i!==void 0&&i<=0?(e&&(o(e),e=null),Promise.resolve(l())):new Promise((d,v)=>{t=s.rejectOnCancel?v:d,i&&!e&&(e=setTimeout(()=>{a&&o(a),e=null,d(l())},i)),a=setTimeout(()=>{e&&o(e),e=null,d(l())},r)})}}function d1(n,s=!0,a=!0,e=!1){let t=0,o,p=!0,l=Fs,r;const i=()=>{o&&(clearTimeout(o),o=void 0,l(),l=Fs)};return v=>{const k=Hn(n),m=Date.now()-t,b=()=>r=v();return i(),k<=0?(t=Date.now(),b()):(m>k&&(a||!p)?(t=Date.now(),b()):s&&(r=new Promise((E,S)=>{l=e?S:E,o=setTimeout(()=>{t=Date.now(),p=!0,E(b()),i()},Math.max(0,k-m))})),!a&&!o&&(o=setTimeout(()=>p=!0,k)),p=!1,r)}}function v1(n=ar){const s=U(!0);function a(){s.value=!1}function e(){s.value=!0}const t=(...o)=>{s.value&&n(...o)};return{isActive:ka(s),pause:a,resume:e,eventFilter:t}}function k1(n){let s;function a(){return s||(s=n()),s}return a.reset=async()=>{const e=s;s=void 0,e&&await e},a}function m1(...n){if(n.length!==1)return Ua(...n);const s=n[0];return typeof s=="function"?ka(Dl(()=>({get:s,set:Fs}))):U(s)}function f1(n,s=200,a={}){return ip(u1(s,a),n)}function h1(n,s=200,a=!1,e=!0,t=!1){return ip(d1(s,a,e,t),n)}function b1(n,s,a={}){const{eventFilter:e=ar,...t}=a;return cn(n,ip(e,s),t)}function g1(n,s,a={}){const{eventFilter:e,...t}=a,{eventFilter:o,pause:p,resume:l,isActive:r}=v1(e);return{stop:b1(n,s,{...t,eventFilter:o}),pause:p,resume:l,isActive:r}}function Bt(n,s=!0){Zs()?bn(n):s?n():ma(n)}function E1(n){Zs()&&fa(n)}function y1(n,s,a={}){const{immediate:e=!0}=a,t=U(!1);let o=null;function p(){o&&(clearTimeout(o),o=null)}function l(){t.value=!1,p()}function r(...i){p(),t.value=!0,o=setTimeout(()=>{t.value=!1,o=null,n(...i)},Hn(s))}return e&&(t.value=!0,Re&&r()),Ka(l),{isPending:ka(t),start:r,stop:l}}function ut(n=!1,s={}){const{truthyValue:a=!0,falsyValue:e=!1}=s,t=Mn(n),o=U(n);function p(l){if(arguments.length)return o.value=l,o.value;{const r=Hn(a);return o.value=o.value===r?Hn(e):r,o.value}}return t?p:[o,p]}function ss(n){var s;const a=Hn(n);return(s=a==null?void 0:a.$el)!=null?s:a}const Rs=Re?window:void 0,er=Re?window.document:void 0,tr=Re?window.navigator:void 0;function Cn(...n){let s,a,e,t;if(typeof n[0]=="string"||Array.isArray(n[0])?([a,e,t]=n,s=Rs):[s,a,e,t]=n,!s)return Fs;Array.isArray(a)||(a=[a]),Array.isArray(e)||(e=[e]);const o=[],p=()=>{o.forEach(d=>d()),o.length=0},l=(d,v,k,m)=>(d.addEventListener(v,k,m),()=>d.removeEventListener(v,k,m)),r=cn(()=>[ss(s),Hn(t)],([d,v])=>{if(p(),!d)return;const k=i1(v)?{...v}:v;o.push(...a.flatMap(m=>e.map(b=>l(d,m,b,k))))},{immediate:!0,flush:"post"}),i=()=>{r(),p()};return Ka(i),i}let $c=!1;function _1(n,s,a={}){const{window:e=Rs,ignore:t=[],capture:o=!0,detectIframe:p=!1}=a;if(!e)return;_o&&!$c&&($c=!0,Array.from(e.document.body.children).forEach(k=>k.addEventListener("click",Fs)),e.document.documentElement.addEventListener("click",Fs));let l=!0;const r=k=>t.some(m=>{if(typeof m=="string")return Array.from(e.document.querySelectorAll(m)).some(b=>b===k.target||k.composedPath().includes(b));{const b=ss(m);return b&&(k.target===b||k.composedPath().includes(b))}}),d=[Cn(e,"click",k=>{const m=ss(n);if(!(!m||m===k.target||k.composedPath().includes(m))){if(k.detail===0&&(l=!r(k)),!l){l=!0;return}s(k)}},{passive:!0,capture:o}),Cn(e,"pointerdown",k=>{const m=ss(n);l=!r(k)&&!!(m&&!k.composedPath().includes(m))},{passive:!0}),p&&Cn(e,"blur",k=>{setTimeout(()=>{var m;const b=ss(n);((m=e.document.activeElement)==null?void 0:m.tagName)==="IFRAME"&&!(b!=null&&b.contains(e.document.activeElement))&&s(k)},0)})].filter(Boolean);return()=>d.forEach(k=>k())}function A1(){const n=U(!1);return Zs()&&bn(()=>{n.value=!0}),n}function Be(n){const s=A1();return w(()=>(s.value,!!n()))}function or(n,s={}){const{window:a=Rs}=s,e=Be(()=>a&&"matchMedia"in a&&typeof a.matchMedia=="function");let t;const o=U(!1),p=i=>{o.value=i.matches},l=()=>{t&&("removeEventListener"in t?t.removeEventListener("change",p):t.removeListener(p))},r=Pl(()=>{e.value&&(l(),t=a.matchMedia(Hn(n)),"addEventListener"in t?t.addEventListener("change",p):t.addListener(p),o.value=t.matches)});return Ka(()=>{r(),l(),t=void 0}),o}function Jc(n,s={}){const{controls:a=!1,navigator:e=tr}=s,t=Be(()=>e&&"permissions"in e);let o;const p=typeof n=="string"?{name:n}:n,l=U(),r=()=>{o&&(l.value=o.state)},i=k1(async()=>{if(t.value){if(!o)try{o=await e.permissions.query(p),Cn(o,"change",r),r()}catch{l.value="prompt"}return o}});return i(),a?{state:l,isSupported:t,query:i}:l}function w1(n={}){const{navigator:s=tr,read:a=!1,source:e,copiedDuring:t=1500,legacy:o=!1}=n,p=Be(()=>s&&"clipboard"in s),l=Jc("clipboard-read"),r=Jc("clipboard-write"),i=w(()=>p.value||o),d=U(""),v=U(!1),k=y1(()=>v.value=!1,t);function m(){p.value&&l.value!=="denied"?s.clipboard.readText().then(y=>{d.value=y}):d.value=S()}i.value&&a&&Cn(["copy","cut"],m);async function b(y=Hn(e)){i.value&&y!=null&&(p.value&&r.value!=="denied"?await s.clipboard.writeText(y):E(y),d.value=y,v.value=!0,k.start())}function E(y){const B=document.createElement("textarea");B.value=y??"",B.style.position="absolute",B.style.opacity="0",document.body.appendChild(B),B.select(),document.execCommand("copy"),B.remove()}function S(){var y,B,_;return(_=(B=(y=document==null?void 0:document.getSelection)==null?void 0:y.call(document))==null?void 0:B.toString())!=null?_:""}return{isSupported:i,text:d,copied:v,copy:b}}const We=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ze="__vueuse_ssr_handlers__",S1=R1();function R1(){return ze in We||(We[ze]=We[ze]||{}),We[ze]}function B1(n,s){return S1[n]||s}function D1(n){return n==null?"any":n instanceof Set?"set":n instanceof Map?"map":n instanceof Date?"date":typeof n=="boolean"?"boolean":typeof n=="string"?"string":typeof n=="object"?"object":Number.isNaN(n)?"any":"number"}const T1={boolean:{read:n=>n==="true",write:n=>String(n)},object:{read:n=>JSON.parse(n),write:n=>JSON.stringify(n)},number:{read:n=>Number.parseFloat(n),write:n=>String(n)},any:{read:n=>n,write:n=>String(n)},string:{read:n=>n,write:n=>String(n)},map:{read:n=>new Map(JSON.parse(n)),write:n=>JSON.stringify(Array.from(n.entries()))},set:{read:n=>new Set(JSON.parse(n)),write:n=>JSON.stringify(Array.from(n))},date:{read:n=>new Date(n),write:n=>n.toISOString()}},Wc="vueuse-storage";function Dt(n,s,a,e={}){var t;const{flush:o="pre",deep:p=!0,listenToStorageChanges:l=!0,writeDefaults:r=!0,mergeDefaults:i=!1,shallow:d,window:v=Rs,eventFilter:k,onError:m=V=>{console.error(V)},initOnMounted:b}=e,E=(d?Ln:U)(typeof s=="function"?s():s);if(!a)try{a=B1("getDefaultStorage",()=>{var V;return(V=Rs)==null?void 0:V.localStorage})()}catch(V){m(V)}if(!a)return E;const S=Hn(s),y=D1(S),B=(t=e.serializer)!=null?t:T1[y],{pause:_,resume:R}=g1(E,()=>I(E.value),{flush:o,deep:p,eventFilter:k});return v&&l&&Bt(()=>{Cn(v,"storage",P),Cn(v,Wc,M),b&&P()}),b||P(),E;function I(V){try{if(V==null)a.removeItem(n);else{const H=B.write(V),Y=a.getItem(n);Y!==H&&(a.setItem(n,H),v&&v.dispatchEvent(new CustomEvent(Wc,{detail:{key:n,oldValue:Y,newValue:H,storageArea:a}})))}}catch(H){m(H)}}function C(V){const H=V?V.newValue:a.getItem(n);if(H==null)return r&&S!==null&&a.setItem(n,B.write(S)),S;if(!V&&i){const Y=B.read(H);return typeof i=="function"?i(Y,S):y==="object"&&!Array.isArray(Y)?{...S,...Y}:Y}else return typeof H!="string"?H:B.read(H)}function M(V){P(V.detail)}function P(V){if(!(V&&V.storageArea!==a)){if(V&&V.key==null){E.value=S;return}if(!(V&&V.key!==n)){_();try{(V==null?void 0:V.newValue)!==B.write(E.value)&&(E.value=C(V))}catch(H){m(H)}finally{V?ma(R):R()}}}}}function C1(n){return or("(prefers-color-scheme: dark)",n)}function x1(n,s,a={}){const{window:e=Rs,...t}=a;let o;const p=Be(()=>e&&"ResizeObserver"in e),l=()=>{o&&(o.disconnect(),o=void 0)},r=w(()=>Array.isArray(n)?n.map(v=>ss(v)):[ss(n)]),i=cn(r,v=>{if(l(),p.value&&e){o=new ResizeObserver(s);for(const k of v)k&&o.observe(k,t)}},{immediate:!0,flush:"post",deep:!0}),d=()=>{l(),i()};return Ka(d),{isSupported:p,stop:d}}function L1(n,s={width:0,height:0},a={}){const{window:e=Rs,box:t="content-box"}=a,o=w(()=>{var v,k;return(k=(v=ss(n))==null?void 0:v.namespaceURI)==null?void 0:k.includes("svg")}),p=U(s.width),l=U(s.height),{stop:r}=x1(n,([v])=>{const k=t==="border-box"?v.borderBoxSize:t==="content-box"?v.contentBoxSize:v.devicePixelContentBoxSize;if(e&&o.value){const m=ss(n);if(m){const b=e.getComputedStyle(m);p.value=Number.parseFloat(b.width),l.value=Number.parseFloat(b.height)}}else if(k){const m=Array.isArray(k)?k:[k];p.value=m.reduce((b,{inlineSize:E})=>b+E,0),l.value=m.reduce((b,{blockSize:E})=>b+E,0)}else p.value=v.contentRect.width,l.value=v.contentRect.height},a);Bt(()=>{const v=ss(n);v&&(p.value="offsetWidth"in v?v.offsetWidth:s.width,l.value="offsetHeight"in v?v.offsetHeight:s.height)});const i=cn(()=>ss(n),v=>{p.value=v?s.width:0,l.value=v?s.height:0});function d(){r(),i()}return{width:p,height:l,stop:d}}const zc=["fullscreenchange","webkitfullscreenchange","webkitendfullscreen","mozfullscreenchange","MSFullscreenChange"];function rp(n,s={}){const{document:a=er,autoExit:e=!1}=s,t=w(()=>{var y;return(y=ss(n))!=null?y:a==null?void 0:a.querySelector("html")}),o=U(!1),p=w(()=>["requestFullscreen","webkitRequestFullscreen","webkitEnterFullscreen","webkitEnterFullScreen","webkitRequestFullScreen","mozRequestFullScreen","msRequestFullscreen"].find(y=>a&&y in a||t.value&&y in t.value)),l=w(()=>["exitFullscreen","webkitExitFullscreen","webkitExitFullScreen","webkitCancelFullScreen","mozCancelFullScreen","msExitFullscreen"].find(y=>a&&y in a||t.value&&y in t.value)),r=w(()=>["fullScreen","webkitIsFullScreen","webkitDisplayingFullscreen","mozFullScreen","msFullscreenElement"].find(y=>a&&y in a||t.value&&y in t.value)),i=["fullscreenElement","webkitFullscreenElement","mozFullScreenElement","msFullscreenElement"].find(y=>a&&y in a),d=Be(()=>t.value&&a&&p.value!==void 0&&l.value!==void 0&&r.value!==void 0),v=()=>i?(a==null?void 0:a[i])===t.value:!1,k=()=>{if(r.value){if(a&&a[r.value]!=null)return a[r.value];{const y=t.value;if((y==null?void 0:y[r.value])!=null)return!!y[r.value]}}return!1};async function m(){if(!(!d.value||!o.value)){if(l.value)if((a==null?void 0:a[l.value])!=null)await a[l.value]();else{const y=t.value;(y==null?void 0:y[l.value])!=null&&await y[l.value]()}o.value=!1}}async function b(){if(!d.value||o.value)return;k()&&await m();const y=t.value;p.value&&(y==null?void 0:y[p.value])!=null&&(await y[p.value](),o.value=!0)}async function E(){await(o.value?m():b())}const S=()=>{const y=k();(!y||y&&v())&&(o.value=y)};return Cn(a,zc,S,!1),Cn(()=>ss(t),zc,S,!1),e&&Ka(m),{isSupported:d,isFullscreen:o,enter:b,exit:m,toggle:E}}function qt(n){return typeof Window<"u"&&n instanceof Window?n.document.documentElement:typeof Document<"u"&&n instanceof Document?n.documentElement:n}function Qb(n,s,a={}){const{window:e=Rs}=a;return Dt(n,s,e==null?void 0:e.localStorage,a)}function O1(n,s=Fs,a={}){const{immediate:e=!0,manual:t=!1,type:o="text/javascript",async:p=!0,crossOrigin:l,referrerPolicy:r,noModule:i,defer:d,document:v=er,attrs:k={}}=a,m=U(null);let b=null;const E=B=>new Promise((_,R)=>{const I=P=>(m.value=P,_(P),P);if(!v){_(!1);return}let C=!1,M=v.querySelector(`script[src="${Hn(n)}"]`);M?M.hasAttribute("data-loaded")&&I(M):(M=v.createElement("script"),M.type=o,M.async=p,M.src=Hn(n),d&&(M.defer=d),l&&(M.crossOrigin=l),i&&(M.noModule=i),r&&(M.referrerPolicy=r),Object.entries(k).forEach(([P,V])=>M==null?void 0:M.setAttribute(P,V)),C=!0),M.addEventListener("error",P=>R(P)),M.addEventListener("abort",P=>R(P)),M.addEventListener("load",()=>{M.setAttribute("data-loaded","true"),s(M),I(M)}),C&&(M=v.head.appendChild(M)),B||I(M)}),S=(B=!0)=>(b||(b=E(B)),b),y=()=>{if(!v)return;b=null,m.value&&(m.value=null);const B=v.querySelector(`script[src="${Hn(n)}"]`);B&&v.head.removeChild(B)};return e&&!t&&Bt(S),t||E1(y),{scriptTag:m,load:S,unload:y}}function pr(n){const s=window.getComputedStyle(n);if(s.overflowX==="scroll"||s.overflowY==="scroll"||s.overflowX==="auto"&&n.clientWidth<n.scrollWidth||s.overflowY==="auto"&&n.clientHeight<n.scrollHeight)return!0;{const a=n.parentNode;return!a||a.tagName==="BODY"?!1:pr(a)}}function I1(n){const s=n||window.event,a=s.target;return pr(a)?!1:s.touches.length>1?!0:(s.preventDefault&&s.preventDefault(),!1)}const Ge=new WeakMap;function up(n,s=!1){const a=U(s);let e=null,t;cn(m1(n),l=>{const r=qt(Hn(l));if(r){const i=r;Ge.get(i)||Ge.set(i,t),a.value&&(i.style.overflow="hidden")}},{immediate:!0});const o=()=>{const l=qt(Hn(n));!l||a.value||(_o&&(e=Cn(l,"touchmove",r=>{I1(r)},{passive:!1})),l.style.overflow="hidden",a.value=!0)},p=()=>{var l;const r=qt(Hn(n));!r||!a.value||(_o&&(e==null||e()),r.style.overflow=(l=Ge.get(r))!=null?l:"",Ge.delete(r),a.value=!1)};return Ka(p),w({get(){return a.value},set(l){l?o():p()}})}function P1(n={}){const{window:s=Rs,behavior:a="auto"}=n;if(!s)return{x:U(0),y:U(0)};const e=U(s.scrollX),t=U(s.scrollY),o=w({get(){return e.value},set(l){scrollTo({left:l,behavior:a})}}),p=w({get(){return t.value},set(l){scrollTo({top:l,behavior:a})}});return Cn(s,"scroll",()=>{e.value=s.scrollX,t.value=s.scrollY},{capture:!1,passive:!0}),{x:o,y:p}}function V1(n={}){const{window:s=Rs,initialWidth:a=Number.POSITIVE_INFINITY,initialHeight:e=Number.POSITIVE_INFINITY,listenOrientation:t=!0,includeScrollbar:o=!0}=n,p=U(a),l=U(e),r=()=>{s&&(o?(p.value=s.innerWidth,l.value=s.innerHeight):(p.value=s.document.documentElement.clientWidth,l.value=s.document.documentElement.clientHeight))};if(r(),Bt(r),Cn("resize",r,{passive:!0}),t){const i=or("(orientation: portrait)");cn(i,()=>r())}return{width:p,height:l}}const cr=({type:n="info",text:s="",vertical:a,color:e},{slots:t})=>{var o;return c("span",{class:["vp-badge",n,{diy:e}],style:{verticalAlign:a??!1,backgroundColor:e??!1}},((o=t.default)==null?void 0:o.call(t))||s)};cr.displayName="Badge";var F1=j({name:"FontIcon",props:{icon:{type:String,default:""},color:{type:String,default:""},size:{type:[String,Number],default:""}},setup(n){const s=w(()=>{const e=["font-icon icon"];return`${n.icon}`,e}),a=w(()=>{const e={};return n.color&&(e.color=n.color),n.size&&(e["font-size"]=Number.isNaN(Number(n.size))?n.size:`${n.size}px`),us(e).length?e:null});return()=>n.icon?c("iconify-icon",{key:n.icon,class:s.value,style:a.value,mode:"style",inline:"",icon:`${n.icon}`,width:"1em",height:"1em"}):null}});const lr=()=>c(on,{name:"back-to-top"},()=>[c("path",{d:"M512 843.2c-36.2 0-66.4-13.6-85.8-21.8-10.8-4.6-22.6 3.6-21.8 15.2l7 102c.4 6.2 7.6 9.4 12.6 5.6l29-22c3.6-2.8 9-1.8 11.4 2l41 64.2c3 4.8 10.2 4.8 13.2 0l41-64.2c2.4-3.8 7.8-4.8 11.4-2l29 22c5 3.8 12.2.6 12.6-5.6l7-102c.8-11.6-11-20-21.8-15.2-19.6 8.2-49.6 21.8-85.8 21.8z"}),c("path",{d:"m795.4 586.2-96-98.2C699.4 172 513 32 513 32S324.8 172 324.8 488l-96 98.2c-3.6 3.6-5.2 9-4.4 14.2L261.2 824c1.8 11.4 14.2 17 23.6 10.8L419 744s41.4 40 94.2 40c52.8 0 92.2-40 92.2-40l134.2 90.8c9.2 6.2 21.6.6 23.6-10.8l37-223.8c.4-5.2-1.2-10.4-4.8-14zM513 384c-34 0-61.4-28.6-61.4-64s27.6-64 61.4-64c34 0 61.4 28.6 61.4 64S547 384 513 384z"})]);lr.displayName="BackToTopIcon";var M1={"/":{backToTop:"返回顶部"}},j1=j({name:"BackToTop",props:{threshold:{type:Number,default:100},noProgress:Boolean},setup(n){const s=_n(),a=Qs(M1),e=Ln(),{height:t}=L1(e),{height:o}=V1(),{y:p}=P1(),l=w(()=>s.value.backToTop!==!1&&p.value>n.threshold),r=w(()=>p.value/(t.value-o.value)*100);return bn(()=>{e.value=document.body}),()=>c(Ys,{name:"fade"},()=>l.value?c("button",{type:"button",class:"vp-back-to-top-button","aria-label":a.value.backToTop,"data-balloon-pos":"left",onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})}},[n.noProgress?null:c("span",{class:"vp-scroll-progress",role:"progressbar","aria-labelledby":"loadinglabel","aria-valuenow":r.value},c("svg",c("circle",{cx:"50%",cy:"50%",style:{"stroke-dasharray":`calc(${Math.PI*r.value}% - ${4*Math.PI}px) calc(${Math.PI*100}% - ${4*Math.PI}px)`}}))),c(lr)]):null)}});const N1=gs({enhance:({app:n})=>{hs("Badge")||n.component("Badge",cr),hs("FontIcon")||n.component("FontIcon",F1)},setup:()=>{O1("https://cdn.jsdelivr.net/npm/iconify-icon@1")},rootComponents:[()=>c(j1,{})]});function H1(n,s,a){var e,t,o;s===void 0&&(s=50),a===void 0&&(a={});var p=(e=a.isImmediate)!=null&&e,l=(t=a.callback)!=null&&t,r=a.maxWait,i=Date.now(),d=[];function v(){if(r!==void 0){var m=Date.now()-i;if(m+s>=r)return r-m}return s}var k=function(){var m=[].slice.call(arguments),b=this;return new Promise(function(E,S){var y=p&&o===void 0;if(o!==void 0&&clearTimeout(o),o=setTimeout(function(){if(o=void 0,i=Date.now(),!p){var _=n.apply(b,m);l&&l(_),d.forEach(function(R){return(0,R.resolve)(_)}),d=[]}},v()),y){var B=n.apply(b,m);return l&&l(B),E(B)}d.push({resolve:E,reject:S})})};return k.cancel=function(m){o!==void 0&&clearTimeout(o),d.forEach(function(b){return(0,b.reject)(m)}),d=[]},k}const $1=({headerLinkSelector:n,headerAnchorSelector:s,delay:a,offset:e=5})=>{const t=qn(),p=H1(()=>{var E,S;const l=Math.max(window.scrollY,document.documentElement.scrollTop,document.body.scrollTop);if(Math.abs(l-0)<e){Gc(t,"");return}const i=window.innerHeight+l,d=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),v=Math.abs(d-i)<e,k=Array.from(document.querySelectorAll(n)),b=Array.from(document.querySelectorAll(s)).filter(y=>k.some(B=>B.hash===y.hash));for(let y=0;y<b.length;y++){const B=b[y],_=b[y+1],R=l>=(((E=B.parentElement)==null?void 0:E.offsetTop)??0)-e,I=!_||l<(((S=_.parentElement)==null?void 0:S.offsetTop)??0)-e;if(!(R&&I))continue;const M=decodeURIComponent(t.currentRoute.value.hash),P=decodeURIComponent(B.hash);if(M===P)return;if(v){for(let V=y+1;V<b.length;V++)if(M===decodeURIComponent(b[V].hash))return}Gc(t,P);return}},a);bn(()=>{window.addEventListener("scroll",p)}),Uo(()=>{window.removeEventListener("scroll",p)})},Gc=async(n,s)=>{const{scrollBehavior:a}=n.options;n.options.scrollBehavior=void 0,await n.replace({query:n.currentRoute.value.query,hash:s}).finally(()=>n.options.scrollBehavior=a)},J1=".vp-sidebar-link, .toc-link",W1=".header-anchor",z1=200,G1=5,U1=gs({setup(){$1({headerLinkSelector:J1,headerAnchorSelector:W1,delay:z1,offset:G1})}});let ir=()=>null;const rr=Symbol(""),q1=n=>{ir=n},K1=()=>dn(rr),X1=n=>{n.provide(rr,ir)};var Y1={"/":{title:"目录",empty:"暂无目录"}},Z1=j({name:"AutoCatalog",props:{base:{type:String,default:""},level:{type:Number,default:3},index:Boolean,hideHeading:Boolean},setup(n){const s=K1(),a=Qs(Y1),e=vn(),t=qn(),o=_i(),p=v=>v?c(s,{icon:v}):null,l=({title:v,path:k,icon:m,class:b})=>c($n,{class:b,to:k},()=>[p(m),v||k]),r=v=>{const k=v.I;return typeof k>"u"||k},i=()=>{const v=n.base||e.value.path.replace(/\/[^/]+$/,"/"),k=t.getRoutes(),m=[];return k.filter(({meta:b,path:E})=>{if(!da(E,v)||E===v)return!1;if(v==="/"){const S=us(o.value.locales).filter(y=>y!=="/");if(E==="/404.html"||S.some(y=>da(E,y)))return!1}return(_a(E,".html")&&!_a(E,"/index.html")||_a(E,"/"))&&r(b)}).map(({path:b,meta:E})=>{const S=b.substring(v.length).split("/").length;return{title:E.t||"",icon:E.i||null,base:b.replace(/\/[^/]+\/?$/,"/"),order:E.O||null,level:_a(b,"/")?S-1:S,path:b}}).filter(({title:b,level:E})=>b&&E<=n.level).sort(({title:b,level:E,path:S,order:y},{title:B,level:_,path:R,order:I})=>E-_||(_a(S,"/index.html")?-1:_a(R,"/index.html")?1:y===null?I===null?b.localeCompare(B):I:I===null?y:y>0?I>0?y-I:-1:I<0?y-I:1)).forEach(b=>{var y;const{base:E,level:S}=b;switch(S){case 1:m.push(b);break;case 2:{const B=m.find(_=>_.path===E);B&&(B.children??(B.children=[])).push(b);break}default:{const B=m.find(_=>_.path===E.replace(/\/[^/]+\/$/,"/"));if(B){const _=(y=B.children)==null?void 0:y.find(R=>R.path===E);_&&(_.children??(_.children=[])).push(b)}}}}),m},d=w(()=>i());return()=>{const v=d.value.some(k=>k.children);return c("div",{class:["vp-catalog-wrapper",{index:n.index}]},[n.hideHeading?null:c("h2",{class:"vp-catalog-main-title"},a.value.title),d.value.length?c(n.index?"ol":"ul",{class:["vp-catalogs",{deep:v}]},d.value.map(({children:k=[],icon:m,path:b,title:E})=>{const S=l({title:E,path:b,icon:m,class:"vp-catalog-title"});return c("li",{class:"vp-catalog"},v?[c("h3",{id:E,class:["vp-catalog-child-title",{"has-children":k.length}]},[c("a",{href:`#${E}`,class:"header-anchor","aria-hidden":!0},"#"),S]),k.length?c(n.index?"ol":"ul",{class:"vp-child-catalogs"},k.map(({children:y=[],icon:B,path:_,title:R})=>c("li",{class:"vp-child-catalog"},[c("div",{class:["vp-catalog-sub-title",{"has-children":y.length}]},[c("a",{href:`#${R}`,class:"header-anchor"},"#"),c(l,{title:R,path:_,icon:B,class:"vp-catalog-title"})]),y.length?c(n.index?"ol":"div",{class:n.index?"vp-sub-catalogs":"vp-sub-catalogs-wrapper"},y.map(({icon:I,path:C,title:M})=>{const P=c(l,{title:M,path:C,icon:I,class:""});return n.index?c("li",{class:"vp-sub-catalog"},P):c(l,{title:M,path:C,icon:I,class:"vp-sub-catalog-link"})})):null]))):null]:c("div",{class:"vp-catalog-child-title"},S))})):c("p",{class:"vp-empty-catalog"},a.value.empty)])}}}),Q1=gs({enhance:({app:n})=>{X1(n),hs("AutoCatalog",n)||n.component("AutoCatalog",Z1)}});const n0=c("svg",{class:"external-link-icon",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15"},[c("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),c("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),ur=j({name:"ExternalLinkIcon",props:{locales:{type:Object,required:!1,default:()=>({})}},setup(n){const s=Bs(),a=w(()=>n.locales[s.value]??{openInNewWindow:"open in new window"});return()=>c("span",[n0,c("span",{class:"external-link-icon-sr-only"},a.value.openInNewWindow)])}});var s0={};const a0=s0,e0=gs({enhance({app:n}){n.component("ExternalLinkIcon",c(ur,{locales:a0}))}});/**
 * NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT
 */const mn={settings:{minimum:.08,easing:"ease",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,barSelector:'[role="bar"]',parent:"body",template:'<div class="bar" role="bar"></div>'},status:null,set:n=>{const s=mn.isStarted();n=Kt(n,mn.settings.minimum,1),mn.status=n===1?null:n;const a=mn.render(!s),e=a.querySelector(mn.settings.barSelector),t=mn.settings.speed,o=mn.settings.easing;return a.offsetWidth,t0(p=>{Ue(e,{transform:"translate3d("+Uc(n)+"%,0,0)",transition:"all "+t+"ms "+o}),n===1?(Ue(a,{transition:"none",opacity:"1"}),a.offsetWidth,setTimeout(function(){Ue(a,{transition:"all "+t+"ms linear",opacity:"0"}),setTimeout(function(){mn.remove(),p()},t)},t)):setTimeout(()=>p(),t)}),mn},isStarted:()=>typeof mn.status=="number",start:()=>{mn.status||mn.set(0);const n=()=>{setTimeout(()=>{mn.status&&(mn.trickle(),n())},mn.settings.trickleSpeed)};return mn.settings.trickle&&n(),mn},done:n=>!n&&!mn.status?mn:mn.inc(.3+.5*Math.random()).set(1),inc:n=>{let s=mn.status;return s?(typeof n!="number"&&(n=(1-s)*Kt(Math.random()*s,.1,.95)),s=Kt(s+n,0,.994),mn.set(s)):mn.start()},trickle:()=>mn.inc(Math.random()*mn.settings.trickleRate),render:n=>{if(mn.isRendered())return document.getElementById("nprogress");qc(document.documentElement,"nprogress-busy");const s=document.createElement("div");s.id="nprogress",s.innerHTML=mn.settings.template;const a=s.querySelector(mn.settings.barSelector),e=n?"-100":Uc(mn.status||0),t=document.querySelector(mn.settings.parent);return Ue(a,{transition:"all 0 linear",transform:"translate3d("+e+"%,0,0)"}),t!==document.body&&qc(t,"nprogress-custom-parent"),t==null||t.appendChild(s),s},remove:()=>{Kc(document.documentElement,"nprogress-busy"),Kc(document.querySelector(mn.settings.parent),"nprogress-custom-parent");const n=document.getElementById("nprogress");n&&o0(n)},isRendered:()=>!!document.getElementById("nprogress")},Kt=(n,s,a)=>n<s?s:n>a?a:n,Uc=n=>(-1+n)*100,t0=function(){const n=[];function s(){const a=n.shift();a&&a(s)}return function(a){n.push(a),n.length===1&&s()}}(),Ue=function(){const n=["Webkit","O","Moz","ms"],s={};function a(p){return p.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(l,r){return r.toUpperCase()})}function e(p){const l=document.body.style;if(p in l)return p;let r=n.length;const i=p.charAt(0).toUpperCase()+p.slice(1);let d;for(;r--;)if(d=n[r]+i,d in l)return d;return p}function t(p){return p=a(p),s[p]??(s[p]=e(p))}function o(p,l,r){l=t(l),p.style[l]=r}return function(p,l){for(const r in l){const i=l[r];i!==void 0&&Object.prototype.hasOwnProperty.call(l,r)&&o(p,r,i)}}}(),dr=(n,s)=>(typeof n=="string"?n:dp(n)).indexOf(" "+s+" ")>=0,qc=(n,s)=>{const a=dp(n),e=a+s;dr(a,s)||(n.className=e.substring(1))},Kc=(n,s)=>{const a=dp(n);if(!dr(n,s))return;const e=a.replace(" "+s+" "," ");n.className=e.substring(1,e.length-1)},dp=n=>(" "+(n.className||"")+" ").replace(/\s+/gi," "),o0=n=>{n&&n.parentNode&&n.parentNode.removeChild(n)},p0=()=>{bn(()=>{const n=qn(),s=new Set;s.add(n.currentRoute.value.path),n.beforeEach(a=>{s.has(a.path)||mn.start()}),n.afterEach(a=>{s.add(a.path),mn.done()})})},c0=gs({setup(){p0()}}),l0=JSON.parse('{"encrypt":{},"author":{"name":"Mr.LRH","url":"https://lrh21g.github.io/blogs/"},"darkmode":"switch","themeColor":true,"fullscreen":false,"pure":false,"navbarIcon":true,"logo":"/hero.png","logoDark":"","repo":"https://github.com/lrh21g/blogs","repoDisplay":true,"repoLabel":"GitHub","sidebarIcon":true,"headerDepth":2,"breadcrumb":true,"breadcrumbIcon":true,"prevLink":true,"nextLink":true,"titleIcon":true,"pageInfo":["Author","Original","Date","Category","Tag","ReadingTime"],"lastUpdated":true,"contributors":true,"editLink":false,"docsDir":"docs","footer":"知足且上进，温柔而坚定","displayFooter":true,"blog":{"name":"Mr.LRH","description":"知足且上进，温柔而坚定。","intro":"/intro.html","medias":{},"roundAvatar":true,"sidebarDisplay":"mobile","timeline":"昨日不在","articlePerPage":10,"articleInfo":["Author","Original","Date","PageView","Category","Tag","ReadingTime"]},"locales":{"/":{"lang":"zh-CN","navbarLocales":{"langName":"简体中文","selectLangAriaLabel":"选择语言"},"metaLocales":{"author":"作者","date":"写作日期","origin":"原创","views":"访问量","category":"分类","tag":"标签","readingTime":"阅读时间","words":"字数","toc":"此页内容","prev":"上一页","next":"下一页","lastUpdated":"上次编辑于","contributors":"贡献者","editLink":"编辑此页","print":"打印"},"blogLocales":{"article":"文章","articleList":"文章列表","category":"分类","tag":"标签","timeline":"时间轴","timelineTitle":"昨日不在","all":"全部","intro":"个人介绍","star":"收藏","empty":"$text 为空"},"paginationLocales":{"prev":"上一页","next":"下一页","navigate":"跳转到","action":"前往","errorText":"请输入 1 到 $page 之前的页码！"},"outlookLocales":{"themeColor":"主题色","darkmode":"外观","fullscreen":"全屏"},"routeLocales":{"skipToContent":"跳至主要內容","notFoundTitle":"页面不存在","notFoundMsg":["这里什么也没有","我们是怎么来到这儿的？","这 是 四 零 四 !","看起来你访问了一个失效的链接"],"back":"返回上一页","home":"带我回家","openInNewWindow":"Open in new window"},"navbar":[{"text":"前端","children":[{"text":"CSS","link":"/前端/CSS/"},{"text":"JavaScript","link":"/前端/JavaScript/"},{"text":"H5","link":"/前端/H5/"},{"text":"动画效果","link":"/前端/动画效果/"},{"text":"TypeScript","link":"/前端/TypeScript/"},{"text":"Node","link":"/前端/Node/"}]},{"text":"前端框架","children":[{"text":"项目搭建","link":"/前端框架/项目搭建/"},{"text":"Vue","link":"/前端框架/Vue/"},{"text":"React","link":"/前端框架/React/"},{"text":"Electron","link":"/前端框架/Electron/"},{"text":"Webpack","link":"/前端框架/Webpack/"}]},{"text":"移动端","children":[{"text":"ReactNative","link":"/移动端/ReactNative/"},{"text":"Flutter","link":"/移动端/Flutter/"},{"text":"混合开发","link":"/移动端/混合开发"}]},{"text":"架构","children":[{"text":"微前端","link":"/架构/微前端/"}]},{"text":"服务端","children":[{"text":"Linux","link":"/服务端/Linux/"}]},{"text":"数据库","children":[{"text":"SQL","link":"/数据库/SQL语言/"},{"text":"MongoDB","link":"/数据库/MongoDB/"}]},{"text":"其他","children":[{"text":"代码规范","link":"/代码规范/"},{"text":"Git","link":"/其他/Git/"},{"text":"工具","link":"/其他/工具/"}]},{"text":"书签","link":"/书签"}],"sidebar":{"/前端/CSS/":[{"text":"CSS基础","prefix":"CSS基础/","collapsible":true,"children":["内联元素","BFC","x-height","line-height","vertical-align","float"]},{"text":"CSS布局","prefix":"CSS布局/","collapsible":true,"children":["页面等比适配","水平垂直居中","多列布局","栅格布局","全屏布局","Flex布局","Grid布局","自适应布局","StickyFooter"]},{"text":"CSS相关","prefix":"CSS相关/","collapsible":true,"children":["CSS常用封装","CSS实现长宽比"]}],"/前端/JavaScript/":[{"text":"Javascript","icon":"fluent:javascript-24-regular","prefix":"基础知识/","collapsible":true,"children":[{"text":"类型概述","link":"类型概述","icon":"material-symbols:file-copy-outline-rounded"},{"text":"基础类型","link":"基础类型","icon":"material-symbols:file-copy-outline-rounded"},{"text":"Object","icon":"material-symbols:data-object-rounded","collapsible":true,"children":["对象","原型与继承","Reflect"]},{"text":"Class","link":"Class","icon":"material-symbols:file-copy-outline-rounded"},{"text":"Array","icon":"material-symbols:data-array-rounded","collapsible":true,"children":["数组","ArrayBuffer"]},{"text":"Set和Map","link":"Set和Map","icon":"material-symbols:file-copy-outline-rounded"},{"text":"函数","icon":"material-symbols:function","collapsible":true,"children":["函数","作用域与闭包"]},{"text":"异步编程","icon":"material-symbols:update-rounded","collapsible":true,"children":["异步","EventLoop","Promise","Generator","async"]},{"text":"正则表达式","link":"RegExp","icon":"material-symbols:regular-expression-rounded"},{"text":"Math和Date","link":"Math和Date","icon":"material-symbols:calculate-outline-rounded"},{"text":"JavaScript API","link":"API","icon":"material-symbols:api-rounded"},{"text":"JSON","link":"JSON","icon":"material-symbols:data-object-rounded"},{"text":"网络请求","link":"网络请求","icon":"material-symbols:network-node"}]},{"text":"BOM","icon":"material-symbols:select-window","prefix":"BOM/","collapsible":true,"children":["window","URL","navigator","storage","file"]},{"text":"DOM","icon":"material-symbols:network-node","prefix":"DOM/","collapsible":true,"children":["node","document","element","other","css","MutationObserver","event","WebComponents"]},{"text":"实用技巧","prefix":"实用技巧/","icon":"material-symbols:settings-applications-outline-rounded","collapsible":true,"children":["工具函数","手写代码","网页截屏"]},{"text":"设计模式","icon":"material-symbols:design-services","prefix":"设计模式/","collapsible":true,"children":["SOLID","创建型设计模式","结构型设计模式","行为型设计模式"]},{"text":"Canvas","prefix":"Canvas/","icon":"material-symbols:drive-file-move-outline-rounded","collapsible":true,"children":["canvas基础","canvas绘制形状","canvas添加样式","canvas绘制文本","canvas使用图像","canvas变形","canvas合成与裁剪","canvas基本动画","canvas像素操作","canvas优化"]},{"text":"SVG","prefix":"SVG/","icon":"material-symbols:drive-file-move-outline-rounded","collapsible":true,"children":["svg基础","svg动画","svgSMIL动画","基于anime.js的svg动画"]}],"/前端/H5/":[{"text":"移动端H5","prefix":"","collapsible":true,"children":["移动端基本概念","移动端适配","1px边框问题","图片模糊问题","移动端常见问题"]}],"/前端/动画效果/":[{"text":"动画效果","prefix":"","collapsible":true,"children":["H5直播点赞动画"]}],"/前端/TypeScript/":[{"text":"TypeScript 类型系统","prefix":"","collapsible":true,"children":["TypeScript基础类型","TypeScript其他类型","TypeScript装饰器","TypeScript控制反转和依赖注入"]},{"text":"TypeScript 项目配置","prefix":"","collapsible":true,"children":["TypeScript声明文件","tsconfig配置"]},{"text":"TypeScript 实战","prefix":"","collapsible":true,"children":["TypeScript实现Promise","TypeScript实现Vuex"]}],"/前端/Node/":[{"text":"基础","prefix":"","collapsible":true,"children":["基础知识"]}],"/前端框架/项目搭建/":[{"text":"项目规范","prefix":"","collapsible":true,"children":["编程规范"]}],"/前端框架/Vue/":[{"text":"Vue2.x","prefix":"Vue2/","collapsible":true,"children":["Vue2基础","Vue2组件通信方式","Vue2相关组件实现","Vue2实用技巧","Vue2实现原理","VueRouter","Vuex"]},{"text":"Vue2.x 源码解析","prefix":"Vue2源码解析/","collapsible":true,"children":["数据驱动","组件化","响应式","编译",{"text":"Vue 相关扩展","prefix":"相关扩展/","collapsible":true,"children":["event","v-model","slot","keep-alive","transition"]},"vue-router","vue-vuex"]},{"text":"Vue3.x","prefix":"Vue3/","collapsible":true,"children":["Vue3CompositionAPI"]}],"/前端框架/React/":[{"text":"React 基础","prefix":"React基础/","collapsible":true,"children":["JSX","React组件","State","Props","LifeCycle","Ref","Context","模块化CSS","高阶组件","自定义Hooks","Transition","useSyncExternalStore"]},{"text":"React 优化","prefix":"React优化/","collapsible":true,"children":["渲染控制","渲染调优","处理海量数据","其他优化"]},{"text":"React 原理","prefix":"React原理/","collapsible":true,"children":["Fiber","Scheduler","Reconciler","事件系统","React位运算","Hooks","Context"]},{"text":"React 生态","prefix":"React生态/","collapsible":true,"children":["react-router","react-redux"]}],"/前端框架/Webpack/":[{"text":"Webpack","prefix":"Webpack基础/","collapsible":true,"children":["JS模块化","CSS模块化","核心概念","babel","loaders","plugins","多页面配置","devServer"]},{"text":"Webpack优化","prefix":"Webpack优化/","collapsible":true,"children":["Webpack优化"]},{"text":"Webpack实战","prefix":"Webpack实战/","collapsible":true,"children":["编写loader","编写plugin"]},{"text":"Webpack原理","prefix":"Webpack原理/","collapsible":true,"children":["Webpack原理"]},{"text":"Webpack Q&A","prefix":"","collapsible":true,"children":["Q_A"]}],"/架构/微前端/":[{"text":"微前端简介","link":"/架构/微前端/"},{"text":"实现方式","prefix":"实现方式/","collapsible":true,"children":["qiankun","single-spa","Garfish","EMP"]},{"text":"基础模块实现","link":"/架构/微前端/基础模块实现.md"}],"/服务端/Linux/":[{"text":"Linux基础","prefix":"","collapsible":true,"children":["基础知识"]}],"/数据库/SQL语言/":[{"text":"基础","prefix":"","collapsible":true,"children":["SQL基础"]}],"/数据库/MongoDB/":[{"text":"基础","prefix":"","collapsible":true,"children":["基础知识"]}],"/其他/Git/":[{"text":"Git","collapsible":true,"children":["git基础","git命令","git_head","git技巧","git对象","git忽略提交","git相关问题"]}],"/其他/工具/":[{"text":"工具相关","collapsible":true,"children":["VSCode插件","whistle"]}],"/代码规范/":[{"text":"代码规范","collapsible":true,"children":["BEM"]}]}}}}'),i0=U(l0),vr=()=>i0,kr=Symbol(""),r0=()=>{const n=dn(kr);if(!n)throw new Error("useThemeLocaleData() is called without provider.");return n},u0=(n,s)=>{const{locales:a,...e}=n;return{...e,...a==null?void 0:a[s]}},d0=gs({enhance({app:n}){const s=vr(),a=n._context.provides[np],e=w(()=>u0(s.value,a.value));n.provide(kr,e),Object.defineProperties(n.config.globalProperties,{$theme:{get(){return s.value}},$themeLocale:{get(){return e.value}}})}});var v0={"/":{copy:"复制代码",copied:"已复制",hint:"复制成功"}},k0=['.theme-hope-content div[class*="language-"] pre'];const m0=800,f0=2e3,h0=v0,b0=!1,g0=k0,Xc=!1,Xt=new Map,E0=()=>{const{copy:n}=w1({legacy:!0}),s=Qs(h0),a=vn(),e=sr(),t=l=>{if(!l.hasAttribute("copy-code-registered")){const r=document.createElement("button");r.type="button",r.classList.add("copy-code-button"),r.innerHTML='<div class="copy-icon" />',r.setAttribute("aria-label",s.value.copy),r.setAttribute("data-copied",s.value.copied),l.parentElement&&l.parentElement.insertBefore(r,l),l.setAttribute("copy-code-registered","")}},o=()=>ma().then(()=>new Promise(l=>{setTimeout(()=>{g0.forEach(r=>{document.querySelectorAll(r).forEach(t)}),l()},m0)})),p=(l,r,i)=>{let{innerText:d=""}=r;/language-(shellscript|shell|bash|sh|zsh)/.test(l.classList.toString())&&(d=d.replace(/^ *(\$|>) /gm,"")),n(d).then(()=>{i.classList.add("copied"),clearTimeout(Xt.get(i));const v=setTimeout(()=>{i.classList.remove("copied"),i.blur(),Xt.delete(i)},f0);Xt.set(i,v)})};bn(()=>{(!e.value||Xc)&&o(),Cn("click",l=>{const r=l.target;if(r.matches('div[class*="language-"] > button.copy')){const i=r.parentElement,d=r.nextElementSibling;d&&p(i,d,r)}else if(r.matches('div[class*="language-"] div.copy-icon')){const i=r.parentElement,d=i.parentElement,v=i.nextElementSibling;v&&p(d,v,i)}}),cn(()=>a.value.path,()=>{(!e.value||Xc)&&o()})})};var y0=gs({setup:()=>{E0()}});const qe=Dt("VUEPRESS_CODE_TAB_STORE",{});var _0=j({name:"CodeTabs",props:{active:{type:Number,default:0},data:{type:Array,required:!0},id:{type:String,required:!0},tabId:{type:String,default:""}},slots:Object,setup(n,{slots:s}){const a=U(n.active),e=Ln([]),t=()=>{n.tabId&&(qe.value[n.tabId]=n.data[a.value].id)},o=(i=a.value)=>{a.value=i<e.value.length-1?i+1:0,e.value[a.value].focus()},p=(i=a.value)=>{a.value=i>0?i-1:e.value.length-1,e.value[a.value].focus()},l=(i,d)=>{i.key===" "||i.key==="Enter"?(i.preventDefault(),a.value=d):i.key==="ArrowRight"?(i.preventDefault(),o()):i.key==="ArrowLeft"&&(i.preventDefault(),p()),n.tabId&&(qe.value[n.tabId]=n.data[a.value].id)},r=()=>{if(n.tabId){const i=n.data.findIndex(({id:d})=>qe.value[n.tabId]===d);if(i!==-1)return i}return n.active};return bn(()=>{a.value=r(),cn(()=>qe.value[n.tabId],(i,d)=>{if(n.tabId&&i!==d){const v=n.data.findIndex(({id:k})=>k===i);v!==-1&&(a.value=v)}})}),()=>n.data.length?c("div",{class:"vp-code-tabs"},[c("div",{class:"vp-code-tabs-nav",role:"tablist"},n.data.map(({id:i},d)=>{const v=d===a.value;return c("button",{type:"button",ref:k=>{k&&(e.value[d]=k)},class:["vp-code-tab-nav",{active:v}],role:"tab","aria-controls":`codetab-${n.id}-${d}`,"aria-selected":v,onClick:()=>{a.value=d,t()},onKeydown:k=>l(k,d)},s[`title${d}`]({value:i,isActive:v}))})),n.data.map(({id:i},d)=>{const v=d===a.value;return c("div",{class:["vp-code-tab",{active:v}],id:`codetab-${n.id}-${d}`,role:"tabpanel","aria-expanded":v},[c("div",{class:"vp-code-tab-title"},s[`title${d}`]({value:i,isActive:v})),s[`tab${d}`]({value:i,isActive:v})])})]):null}});const mr=({active:n=!1},{slots:s})=>{var a;return c("div",{class:["code-group-item",{active:n}],"aria-selected":n},(a=s.default)==null?void 0:a.call(s))};mr.displayName="CodeGroupItem";const A0=j({name:"CodeGroup",slots:Object,setup(n,{slots:s}){const a=U(-1),e=Ln([]),t=(l=a.value)=>{a.value=l<e.value.length-1?l+1:0,e.value[a.value].focus()},o=(l=a.value)=>{a.value=l>0?l-1:e.value.length-1,e.value[a.value].focus()},p=(l,r)=>{l.key===" "||l.key==="Enter"?(l.preventDefault(),a.value=r):l.key==="ArrowRight"?(l.preventDefault(),t(r)):l.key==="ArrowLeft"&&(l.preventDefault(),o(r))};return()=>{var r;const l=(((r=s.default)==null?void 0:r.call(s))||[]).filter(i=>i.type.name==="CodeGroupItem").map(i=>(i.props===null&&(i.props={}),i));return l.length===0?null:(a.value<0||a.value>l.length-1?(a.value=l.findIndex(i=>"active"in i.props),a.value===-1&&(a.value=0)):l.forEach((i,d)=>{i.props.active=d===a.value}),c("div",{class:"code-group"},[c("div",{class:"code-group-nav"},l.map((i,d)=>{const v=d===a.value;return c("button",{type:"button",ref:k=>{k&&(e.value[d]=k)},class:["code-group-nav-tab",{active:v}],"aria-pressed":v,"aria-expanded":v,onClick:()=>{a.value=d},onKeydown:k=>p(k,d)},i.props.title)})),l]))}}}),w0=()=>{Cn("beforeprint",()=>{document.querySelectorAll("details").forEach(n=>{n.open=!0})})},S0='<svg class="codepen-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M123.429 668L468 897.714V692.571L277.143 565.143zM88 585.714L198.286 512 88 438.286v147.428zm468 312L900.571 668 746.857 565.143 556 692.57v205.143zM512 616l155.429-104L512 408 356.571 512zM277.143 458.857L468 331.43V126.286L123.429 356zM825.714 512L936 585.714V438.286zm-78.857-53.143L900.571 356 556 126.286v205.143zM1024 356v312q0 23.429-19.429 36.571l-468 312Q524.571 1024 512 1024t-24.571-7.429l-468-312Q0 691.43 0 668V356q0-23.429 19.429-36.571l468-312Q499.429 0 512 0t24.571 7.429l468 312Q1024 332.57 1024 356z"/></svg>',R0='<svg class="jsfiddle-icon" viewBox="0 0 1170 1024" xmlns="http://www.w3.org/2000/svg"><path d="M1028.571 441.143q63.429 26.286 102.572 83.143t39.143 126.571q0 93.714-67.429 160.286T940 877.714q-2.286 0-6.571-.285t-6-.286H232q-97.143-5.714-164.571-71.714T0 645.143q0-62.857 31.429-116t84-84q-6.858-22.286-6.858-46.857 0-65.715 46.858-112T269.143 240q54.286 0 98.286 33.143 42.857-88 127.142-141.714t186.572-53.715q94.857 0 174.857 46t126.571 124.857 46.572 172q0 3.429-.286 10.286t-.286 10.286zm-761.142 152q0 69.714 48 110.286T434.286 744q78.285 0 137.143-56.571-9.143-11.429-27.143-32.286t-24.857-28.857q-38.286 37.143-82.286 37.143-31.429 0-53.429-19.143t-22-50q0-30.286 22-49.715T436 525.143q25.143 0 48.286 12T526 568.57t37.143 42.858 39.428 46.857 44 42.857T702 732.57t69.429 12q69.142 0 116.857-40.857T936 594.857q0-69.143-48-109.714T769.714 444.57Q688 444.571 632 500l53.143 61.714q37.714-36.571 81.143-36.571 29.714 0 52.571 18.857t22.857 48q0 32.571-21.143 52.286T766.857 664q-24.571 0-47.143-12t-41.143-31.429-37.428-42.857-39.714-46.857T557.143 488 502 456.571t-67.714-12q-69.715 0-118.286 40.286t-48.571 108.286z"/></svg>',B0='<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667zm0 810.666C307.2 885.333 138.667 716.8 138.667 512S307.2 138.667 512 138.667 885.333 307.2 885.333 512 716.8 885.333 512 885.333z"/><path d="M708.267 465.067 473.6 330.667c-8.533-4.267-17.067-6.4-25.6-6.4-29.867 0-53.333 23.466-53.333 53.333v268.8c0 8.533 2.133 19.2 6.4 25.6 10.666 17.067 27.733 27.733 46.933 27.733 8.533 0 17.067-2.133 25.6-6.4l234.667-134.4c8.533-4.266 14.933-10.666 19.2-19.2 6.4-12.8 8.533-27.733 4.266-40.533-2.133-14.933-10.666-25.6-23.466-34.133zM458.667 627.2V396.8L661.333 512 458.667 627.2z"/></svg>';var D0={useBabel:!1,jsLib:[],cssLib:[],codepenLayout:"left",codepenEditors:"101",babel:"https://unpkg.com/@babel/standalone/babel.min.js",vue:"https://unpkg.com/vue/dist/vue.global.prod.js",react:"https://unpkg.com/react/umd/react.production.min.js",reactDOM:"https://unpkg.com/react-dom/umd/react-dom.production.min.js",jsfiddle:!1};const Yt=D0,Yc={html:{types:["html","slim","haml","md","markdown","vue"],map:{html:"none",vue:"none",md:"markdown"}},js:{types:["js","javascript","coffee","coffeescript","ts","typescript","ls","livescript"],map:{js:"none",javascript:"none",coffee:"coffeescript",ls:"livescript",ts:"typescript"}},css:{types:["css","less","sass","scss","stylus","styl"],map:{css:"none",styl:"stylus"}}},T0=(n,s,a)=>{const e=document.createElement(n);return _t(s)&&us(s).forEach(t=>{if(t.indexOf("data"))e[t]=s[t];else{const o=t.replace("data","");e.dataset[o]=s[t]}}),a&&a.forEach(t=>{e.appendChild(t)}),e},vp=n=>({...Yt,...n,jsLib:Array.from(new Set([...Yt.jsLib||[],...n.jsLib||[]])),cssLib:Array.from(new Set([...Yt.cssLib||[],...n.cssLib||[]]))}),La=(n,s)=>{if(n[s]!==void 0)return n[s];const a=new Promise(e=>{var o;const t=document.createElement("script");t.src=s,(o=document.querySelector("body"))==null||o.appendChild(t),t.onload=()=>{e()}});return n[s]=a,a},C0=(n,s)=>{if(s.css&&Array.from(n.childNodes).every(a=>a.nodeName!=="STYLE")){const a=T0("style",{innerHTML:s.css});n.appendChild(a)}},x0=(n,s,a)=>{const e=a.getScript();if(e&&Array.from(s.childNodes).every(t=>t.nodeName!=="SCRIPT")){const t=document.createElement("script");t.appendChild(document.createTextNode(`{const document=window.document.querySelector('#${n} .vp-code-demo-display').shadowRoot;
${e}}`)),s.appendChild(t)}},L0=n=>{const s=us(n),a={html:[],js:[],css:[],isLegal:!1};return["html","js","css"].forEach(e=>{const t=s.filter(o=>Yc[e].types.includes(o));if(t.length){const o=t[0];a[e]=[n[o].replace(/^\n|\n$/g,""),Yc[e].map[o]||o]}}),a.isLegal=(!a.html.length||a.html[1]==="none")&&(!a.js.length||a.js[1]==="none")&&(!a.css.length||a.css[1]==="none"),a},fr=n=>n.replace(/<br \/>/g,"<br>").replace(/<((\S+)[^<]*?)\s+\/>/g,"<$1></$2>"),hr=n=>`<div id="app">
${fr(n)}
</div>`,O0=n=>`${n.replace("export default ","const $reactApp = ").replace(/App\.__style__(\s*)=(\s*)`([\s\S]*)?`/,"")};
ReactDOM.createRoot(document.getElementById("app")).render(React.createElement($reactApp))`,I0=n=>n.replace(/export\s+default\s*\{(\n*[\s\S]*)\n*\}\s*;?$/u,"Vue.createApp({$1}).mount('#app')").replace(/export\s+default\s*define(Async)?Component\s*\(\s*\{(\n*[\s\S]*)\n*\}\s*\)\s*;?$/u,"Vue.createApp({$1}).mount('#app')").trim(),br=n=>`(function(exports){var module={};module.exports=exports;${n};return module.exports.__esModule?module.exports.default:module.exports;})({})`,P0=(n,s)=>{const a=vp(s),e=n.js[0]||"";return{...a,html:fr(n.html[0]||""),js:e,css:n.css[0]||"",isLegal:n.isLegal,getScript:()=>{var t;return a.useBabel?((t=window.Babel.transform(e,{presets:["es2015"]}))==null?void 0:t.code)||"":e}}},V0=/<template>([\s\S]+)<\/template>/u,F0=/<script(\s*lang=(['"])(.*?)\2)?>([\s\S]+)<\/script>/u,M0=/<style(\s*lang=(['"])(.*?)\2)?\s*(?:scoped)?>([\s\S]+)<\/style>/u,j0=(n,s)=>{const a=vp(s),e=n.html[0]||"",t=V0.exec(e),o=F0.exec(e),p=M0.exec(e),l=t?t[1].replace(/^\n|\n$/g,""):"",[r="",i=""]=o?[o[4].replace(/^\n|\n$/g,""),o[3]]:[],[d="",v=""]=p?[p[4].replace(/^\n|\n$/g,""),p[3]]:[],k=i===""&&(v===""||v==="css");return{...a,html:hr(l),js:I0(r),css:d,isLegal:k,jsLib:[a.vue,...a.jsLib],getScript:()=>{var b,E;const m=s.useBabel?((E=(b=window.Babel)==null?void 0:b.transform(r,{presets:["es2015"]}))==null?void 0:E.code)||"":r.replace(/export\s+default/u,"return");return`const app=window.document.createElement('div');document.firstElementChild.appendChild(app);const appOptions=${br(m)};appOptions.template=\`${l.replace("`",'\\`"')}\`;window.Vue.createApp(appOptions).mount(app);`}}},N0=(n,s)=>{const a=vp(s);return{...a,html:hr(""),js:O0(n.js[0]||""),css:n.css[0]||(n.js[0]?n.js[0].replace(/App\.__style__(?:\s*)=(?:\s*)`([\s\S]*)?`/,"$1").trim():""),isLegal:n.isLegal,jsLib:[a.react,a.reactDOM,...a.jsLib],jsx:!0,getScript:()=>{var t,o;const e=((o=(t=window.Babel)==null?void 0:t.transform(n.js[0]||"",{presets:["es2015","react"]}))==null?void 0:o.code)||"";return`window.ReactDOM.createRoot(document.firstElementChild).render(window.React.createElement(${br(e)}))`}}},Oa={},H0=n=>Promise.all([La(Oa,n.babel),La(Oa,n.react),La(Oa,n.reactDOM)]),$0=n=>{const s=[La(Oa,n.vue)];return n.useBabel&&s.push(La(Oa,n.babel)),Promise.all(s)},J0=n=>n.useBabel?La(Oa,n.babel):Promise.resolve();var W0=j({name:"CodeDemo",props:{id:{type:String,required:!0},type:{type:String,default:"normal"},title:{type:String,default:""},config:{type:String,default:""},code:{type:String,required:!0}},slots:Object,setup(n,{slots:s}){const[a,e]=ut(!1),t=Ln(),o=Ln(),p=U("0"),l=U(!1),r=w(()=>JSON.parse(n.config?Nc(n.config):"{}")),i=w(()=>{const b=JSON.parse(Nc(n.code));return L0(b)}),d=w(()=>n.type==="react"?N0(i.value,r.value):n.type==="vue"?j0(i.value,r.value):P0(i.value,r.value)),v=w(()=>d.value.isLegal),k=(b=!1)=>{const E=t.value.attachShadow({mode:"open"}),S=document.createElement("div");S.classList.add("code-demo-app"),E.appendChild(S),v.value?(b&&(S.innerHTML=d.value.html),C0(E,d.value),x0(n.id,E,d.value),p.value="0"):p.value="auto",l.value=!0},m=()=>{switch(n.type){case"react":return H0(d.value).then(()=>k());case"vue":return $0(d.value).then(()=>k());default:return J0(d.value).then(()=>k(!0))}};return Cn("beforeprint",()=>{e(!0)}),bn(()=>{setTimeout(()=>{m()},800)}),()=>{var b;return c("div",{class:"vp-code-demo",id:n.id},[c("div",{class:"vp-code-demo-header"},[d.value.isLegal?c("button",{type:"button",title:"toggle","aria-hidden":!0,class:["vp-code-demo-toggle-button",a.value?"down":"end"],onClick:()=>{p.value=a.value?"0":`${o.value.clientHeight+13.8}px`,e()}}):null,n.title?c("span",{class:"vp-code-demo-title"},decodeURIComponent(n.title)):null,d.value.isLegal&&d.value.jsfiddle!==!1?c("form",{class:"code-demo-jsfiddle",target:"_blank",action:"https://jsfiddle.net/api/post/library/pure/",method:"post"},[c("input",{type:"hidden",name:"html",value:d.value.html}),c("input",{type:"hidden",name:"js",value:d.value.js}),c("input",{type:"hidden",name:"css",value:d.value.css}),c("input",{type:"hidden",name:"wrap",value:"1"}),c("input",{type:"hidden",name:"panel_js",value:"3"}),c("input",{type:"hidden",name:"resources",value:[...d.value.cssLib,...d.value.jsLib].join(",")}),c("button",{type:"submit",class:"jsfiddle-button",innerHTML:R0,"aria-label":"JSFiddle","data-balloon-pos":"up"})]):null,!d.value.isLegal||d.value.codepen!==!1?c("form",{class:"code-demo-codepen",target:"_blank",action:"https://codepen.io/pen/define",method:"post"},[c("input",{type:"hidden",name:"data",value:JSON.stringify({html:d.value.html,js:d.value.js,css:d.value.css,js_external:d.value.jsLib.join(";"),css_external:d.value.cssLib.join(";"),layout:d.value.codepenLayout,html_pre_processor:i.value?i.value.html[1]:"none",js_pre_processor:i.value?i.value.js[1]:d.value.jsx?"babel":"none",css_pre_processor:i.value?i.value.css[1]:"none",editors:d.value.codepenEditors})}),c("button",{type:"submit",innerHTML:S0,class:"codepen-button","aria-label":"Codepen","data-balloon-pos":"up"})]):null]),l.value?null:c(tp,{class:"vp-code-demo-loading"}),c("div",{ref:t,class:"vp-code-demo-display",style:{display:v.value&&l.value?"block":"none"}}),c("div",{class:"vp-code-demo-code-wrapper",style:{height:p.value}},c("div",{ref:o,class:"vp-code-demo-codes"},(b=s.default)==null?void 0:b.call(s)))])}}}),z0=j({name:"MdDemo",props:{id:{type:String,required:!0},title:{type:String,default:""}},slots:Object,setup(n,{slots:s}){const[a,e]=ut(!1),t=Ln(),o=U("0");return Cn("beforeprint",()=>{e(!0)}),()=>{var p,l;return c("div",{class:"vp-md-demo",id:n.id},[c("div",{class:"vp-md-demo-header"},[c("button",{type:"button",title:"toggle","aria-hidden":!0,class:["vp-md-demo-toggle-button",a.value?"down":"end"],onClick:()=>{o.value=a.value?"0":`${t.value.clientHeight+13.8}px`,e()}}),n.title?decodeURIComponent(n.title):null]),c("div",{class:"vp-md-demo-display"},(p=s.default)==null?void 0:p.call(s)),c("div",{class:"vp-md-demo-code-wrapper",style:{height:o.value}},c("div",{ref:t,class:"vp-md-demo-codes"},(l=s.code)==null?void 0:l.call(s)))])}}});const gr=({title:n="",link:s})=>c("div",{class:"vp-playground"},[c("div",{class:"vp-playground-header"},[n?c("div",{class:"vp-playground-title"},decodeURIComponent(n)):null,c("div",{class:"vp-playground-actions"},[c("a",{class:"vp-playground-action",href:decodeURIComponent(s),target:"_blank",innerHTML:B0})])]),c("div",{class:"vp-playground-container"},c("iframe",{src:decodeURIComponent(s)}))]);gr.displayName="Playground";const Zt=Dt("VUEPRESS_TAB_STORE",{});var G0=j({name:"Tabs",props:{active:{type:Number,default:0},data:{type:Array,required:!0},id:{type:String,required:!0},tabId:{type:String,default:""}},slots:Object,setup(n,{slots:s}){const a=U(n.active),e=Ln([]),t=()=>{n.tabId&&(Zt.value[n.tabId]=n.data[a.value].id)},o=(i=a.value)=>{a.value=i<e.value.length-1?i+1:0,e.value[a.value].focus()},p=(i=a.value)=>{a.value=i>0?i-1:e.value.length-1,e.value[a.value].focus()},l=(i,d)=>{i.key===" "||i.key==="Enter"?(i.preventDefault(),a.value=d):i.key==="ArrowRight"?(i.preventDefault(),o()):i.key==="ArrowLeft"&&(i.preventDefault(),p()),t()},r=()=>{if(n.tabId){const i=n.data.findIndex(({id:d})=>Zt.value[n.tabId]===d);if(i!==-1)return i}return n.active};return bn(()=>{a.value=r(),cn(()=>Zt.value[n.tabId],(i,d)=>{if(n.tabId&&i!==d){const v=n.data.findIndex(({id:k})=>k===i);v!==-1&&(a.value=v)}})}),()=>n.data.length?c("div",{class:"vp-tabs"},[c("div",{class:"vp-tabs-nav",role:"tablist"},n.data.map(({id:i},d)=>{const v=d===a.value;return c("button",{type:"button",ref:k=>{k&&(e.value[d]=k)},class:["vp-tab-nav",{active:v}],role:"tab","aria-controls":`tab-${n.id}-${d}`,"aria-selected":v,onClick:()=>{a.value=d,t()},onKeydown:k=>l(k,d)},s[`title${d}`]({value:i,isActive:v}))})),n.data.map(({id:i},d)=>{const v=d===a.value;return c("div",{class:["vp-tab",{active:v}],id:`tab-${n.id}-${d}`,role:"tabpanel","aria-expanded":v},[c("div",{class:"vp-tab-title"},s[`title${d}`]({value:i,isActive:v})),s[`tab${d}`]({value:i,isActive:v})])})]):null}});const U0={showCompileOutput:!1,clearConsole:!1,ssr:!1};let q0=U0;const Er=Symbol(""),K0=()=>dn(Er),X0=n=>{n.provide(Er,q0)},Y0=n=>JSON.parse(decodeURIComponent(n));var Z0=j({name:"VuePlayground",props:{title:{type:String,default:""},files:{type:String,required:!0},settings:{type:String,default:"{}"}},setup(n){const s=K0(),a=U(!0),e=Ln(),t=Ln(),o=Ln(),p=w(()=>yo({},s,Y0(n.settings))),l=async()=>{const[{ReplStore:r,Repl:i},{default:d}]=await Promise.all([u(()=>import("./vue-repl-ywo2wjn1.js"),__vite__mapDeps([271,272])),u(()=>import("./codemirror-editor-ecbUQl9o.js"),__vite__mapDeps([273,272]))]);e.value=i,o.value=d,t.value=new r({serializedState:decodeURIComponent(n.files)}),p.value.vueVersion&&await t.value.setVueVersion(p.value.vueVersion)};return bn(async()=>{await l(),a.value=!1}),()=>[c("div",{class:"vue-playground-wrapper"},[n.title?c("div",{class:"header"},decodeURIComponent(n.title)):null,c("div",{class:"repl-container"},[a.value?c(tp,{class:"preview-loading",height:192}):null,e.value?c(e.value,{editor:o.value,store:t.value,autoResize:!0,...p.value,layout:"horizontal"}):null])])]}});const Q0=gs({enhance:({app:n})=>{n.component("CodeTabs",_0),hs("CodeGroup",n)||n.component("CodeGroup",A0),hs("CodeGroupItem",n)||n.component("CodeGroupItem",mr),n.component("CodeDemo",W0),n.component("MdDemo",z0),n.component("Playground",gr),n.component("Tabs",G0),X0(n),n.component("VuePlayground",Z0)},setup:()=>{w0()}});let nf={};const yr=Symbol(""),sf=()=>dn(yr),af=n=>{n.provide(yr,nf)};var ef={"/":{closeTitle:"关闭",downloadTitle:"下载图片",fullscreenTitle:"切换全屏",zoomTitle:"缩放",arrowPrevTitle:"上一个 (左箭头)",arrowNextTitle:"下一个 (右箭头)"}};const tf=".theme-hope-content :not(a) > img:not([no-view])",of=ef,pf=800,cf='<div class="photo-swipe-loading"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" preserveAspectRatio="xMidYMid" viewBox="25 25 50 50"><animateTransform attributeName="transform" type="rotate" dur="2s" keyTimes="0;1" repeatCount="indefinite" values="0;360"></animateTransform><circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><animate attributeName="stroke-dasharray" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1,200;90,200;1,200"></animate><animate attributeName="stroke-dashoffset" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="0;-35px;-125px"></animate></circle></svg></div>',lf=n=>rn(n)?Array.from(document.querySelectorAll(n)):n.map(s=>Array.from(document.querySelectorAll(s))).flat(),_r=n=>new Promise((s,a)=>{n.complete?s({type:"image",element:n,src:n.src,width:n.naturalWidth,height:n.naturalHeight,alt:n.alt,msrc:n.src}):(n.onload=()=>s(_r(n)),n.onerror=e=>a(e))}),rf=()=>{const n=Qs(of),s=_n(),a=vn(),{isSupported:e,toggle:t}=rp(),o=sf();let p;const l=w(()=>s.value.photoSwipe===!1?!1:s.value.photoSwipe||tf),r=d=>{d.on("uiRegister",()=>{e&&d.ui.registerElement({name:"fullscreen",order:7,isButton:!0,html:'<svg class="pswp__icn" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M249.5 270.833H437v-75H212a37.5 37.5 0 0 0-37.5 37.5v225h75v-187.5zm-37.5 600h225v-75H249.5v-187.5h-75v225a37.5 37.5 0 0 0 37.5 37.5zm637.5-37.5v-225h-75v187.5H587v75h225a37.5 37.5 0 0 0 37.5-37.5zM587 270.833h187.5v187.5h75v-225a37.5 37.5 0 0 0-37.5-37.5H587v75z"/></svg>',onClick:()=>{t()}}),d.ui.registerElement({name:"download",order:8,isButton:!0,tagName:"a",html:{isCustomSVG:!0,inner:'<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1-1.5-1.6ZM23 23H9v2h14" id="pswp__icn-download"/>',outlineID:"pswp__icn-download"},onInit:(v,k)=>{v.setAttribute("download",""),v.setAttribute("target","_blank"),v.setAttribute("rel","noopener"),k.on("change",()=>{v.setAttribute("href",k.currSlide.data.src)})}}),d.ui.registerElement({name:"bulletsIndicator",className:"photo-swipe-bullets-indicator",appendTo:"wrapper",onInit:(v,k)=>{const m=[];let b=-1;for(let E=0;E<k.getNumItems();E++){const S=document.createElement("div");S.className="photo-swipe-bullet",S.onclick=y=>{k.goTo(m.indexOf(y.target))},m.push(S),v.appendChild(S)}k.on("change",()=>{b>=0&&m[b].classList.remove("active"),m[k.currIndex].classList.add("active"),b=k.currIndex})}})})},i=async()=>{if(l.value)return Promise.all([u(()=>import("./photoswipe.esm-mC0Qcr12.js"),__vite__mapDeps([])),ma().then(()=>new Promise(d=>setTimeout(d,pf)).then(()=>lf(l.value)))]).then(([{default:d},v])=>{const k=v.map(m=>({html:cf,element:m,msrc:m.src}));v.forEach((m,b)=>{const E=()=>{p=new d({preloaderDelay:0,showHideAnimationType:"zoom",...n.value,...o,dataSource:k,index:b,closeOnVerticalDrag:!0,wheelToZoom:!1}),r(p),p.addFilter("thumbEl",()=>m),p.addFilter("placeholderSrc",()=>m.src),p.init()};m.style.cursor="zoom-in",m.addEventListener("click",()=>{E()}),m.addEventListener("keypress",({key:S})=>{S==="Enter"&&E()})}),v.forEach((m,b)=>{_r(m).then(E=>{k.splice(b,1,E),p==null||p.refreshSlideContent(b)})})})};bn(()=>{Cn("wheel",()=>{p==null||p.close()}),cn(()=>a.value.path,i,{immediate:!0})})};var uf=gs({enhance:({app:n})=>{af(n)},setup:()=>{rf()}}),Zc={"/":{word:"约 $word 字",less1Minute:"小于 1 分钟",time:"大约 $time 分钟"}};const Ar=()=>{const n=vn();return w(()=>n.value.readingTime??null)},Ao=typeof Zc>"u"?null:Zc,wr=(n,s)=>{const{minutes:a,words:e}=n,{less1Minute:t,word:o,time:p}=s;return{time:a<1?t:p.replace("$time",Math.round(a).toString()),words:o.replace("$word",e.toString())}},Qc={words:"",time:""},Sr=()=>Ao?Qs(Ao):w(()=>null),df=()=>{if(typeof Ao>"u")return w(()=>Qc);const n=Ar(),s=Sr();return w(()=>n.value&&s.value?wr(n.value,s.value):Qc)},ga=()=>vr(),ln=()=>r0(),Xa=()=>w(()=>!!ga().value.pure);var Qt=j({name:"EmptyComponent",setup:()=>()=>null});const vf="719px",kf="1440px",mf="false",kp={mobileBreakPoint:vf,pcBreakPoint:kf,enableThemeColor:mf},mp={},Rr=n=>{const{icon:s="",color:a,size:e}=n,t={};return a&&(t.color=a),e&&(t.height=Number.isNaN(Number(e))?e:`${e}px`),ha(s)?c("img",{class:"icon",src:s,"no-view":"",style:t}):Se(s)?c("img",{class:"icon",src:Dn(s),"no-view":"",style:t}):c(as("FontIcon"),n)};Rr.displayName="HopeIcon";var Un=Rr;const De=()=>{const n=qn(),s=Ds();return a=>{if(a)if(Se(a))s.path!==a&&n.push(a);else if(vi(a))window&&window.open(a);else{const e=s.path.slice(0,s.path.lastIndexOf("/"));n.push(`${e}/${encodeURI(a)}`)}}},Br=()=>{const n=ln(),s=_n();return w(()=>{const{author:a}=s.value;return a?be(a):a===!1?[]:be(n.value.author,!1)})},ff=()=>{const n=_n();return w(()=>zi(n.value.category).map(s=>{var a,e;return{name:s,path:((e=(a=dn(Symbol.for("categoryMap")))==null?void 0:a.value.map[s])==null?void 0:e.path)||""}}))},hf=()=>{const n=_n();return w(()=>Gi(n.value.tag).map(s=>{var a,e;return{name:s,path:((e=(a=dn(Symbol.for("tagMap")))==null?void 0:a.value.map[s])==null?void 0:e.path)||""}}))},bf=()=>{const n=_n(),s=vn();return w(()=>{const a=op(n.value.date);if(a)return a;const{createdTime:e}=s.value.git||{};return e?new Date(e):null})},gf=()=>{const n=ln(),s=vn(),a=_n(),e=Br(),t=ff(),o=hf(),p=bf(),l=Ar(),r=df(),i=w(()=>({author:e.value,category:t.value,date:p.value,localizedDate:s.value.localizedDate,tag:o.value,isOriginal:a.value.isOriginal||!1,readingTime:l.value,readingTimeLocale:r.value,pageview:"pageview"in a.value?a.value.pageview:!0})),d=w(()=>"pageInfo"in a.value?a.value.pageInfo:"pageInfo"in n.value?n.value.pageInfo:null);return{info:i,items:d}},{mobileBreakPoint:Ef,pcBreakPoint:yf}=kp,nl=n=>n.endsWith("px")?Number(n.slice(0,-2)):null,Te=()=>{const n=U(!1),s=U(!1),a=()=>{n.value=window.innerWidth<=(nl(Ef)??719),s.value=window.innerWidth>=(nl(yf)??1440)};return bn(()=>{a(),Cn("resize",a,!1),Cn("orientationchange",a,!1)}),{isMobile:n,isPC:s}},Dr=Symbol(""),Ce=()=>{const n=dn(Dr);if(!n)throw new Error("useDarkmode() is called without provider.");return n},_f=n=>{const s=ga(),a=C1(),e=Dt("vuepress-theme-hope-scheme","auto"),t=w(()=>s.value.darkmode||"switch"),o=w(()=>{const l=t.value;return l==="disable"?!1:l==="enable"?!0:l==="auto"?a.value:l==="toggle"?e.value==="dark":e.value==="dark"||e.value==="auto"&&a.value}),p=w(()=>{const l=t.value;return l==="switch"||l==="toggle"});n.provide(Dr,{canToggle:p,config:t,isDarkmode:o,status:e}),Object.defineProperties(n.config.globalProperties,{$isDarkmode:{get:()=>o.value}})},Af=()=>{const{isDarkmode:n}=Ce(),s=(a=n.value)=>document.documentElement.setAttribute("data-theme",a?"dark":"light");bn(()=>{cn(n,s,{immediate:!0})})};var Xn=j({name:"AutoLink",inheritAttrs:!1,props:{config:{type:Object,required:!0},exact:Boolean,noExternalLinkIcon:Boolean},emits:["focusout"],slots:Object,setup(n,{attrs:s,emit:a,slots:e}){const t=Ds(),o=_i(),p=Ua(n,"config"),l=w(()=>ha(p.value.link)),r=w(()=>!l.value&&vi(p.value.link)),i=w(()=>p.value.target||(l.value?"_blank":void 0)),d=w(()=>i.value==="_blank"),v=w(()=>!l.value&&!r.value&&!d.value),k=w(()=>p.value.rel||(d.value?"noopener noreferrer":void 0)),m=w(()=>p.value.ariaLabel||p.value.text),b=w(()=>{if(n.exact)return!1;const S=us(o.value.locales);return S.length?S.every(y=>y!==p.value.link):p.value.link!=="/"}),E=w(()=>v.value?p.value.activeMatch?new RegExp(p.value.activeMatch).test(t.path):b.value?da(t.path,p.value.link):t.path===p.value.link:!1);return()=>{const{before:S,after:y,default:B}=e,{text:_,icon:R,link:I}=p.value;return v.value?c($n,{to:I,"aria-label":m.value,...s,class:["nav-link",{active:E.value},s.class],onFocusout:()=>a("focusout")},()=>B?B():[S?S():c(Un,{icon:R}),_,y==null?void 0:y()]):c("a",{href:I,rel:k.value,target:i.value,"aria-label":m.value,...s,class:["nav-link",s.class],onFocusout:()=>a("focusout")},B?B():[S?S():c(Un,{icon:R}),_,n.noExternalLinkIcon?null:c(ur),y==null?void 0:y()])}}});const Wa=(n,s,a=!1)=>"activeMatch"in s?new RegExp(s.activeMatch).test(n.path):qi(n,s.link)?!0:s.children&&!a?s.children.some(e=>Wa(n,e)):!1,Tr=(n,s)=>s.type==="group"?s.children.some(a=>a.type==="group"?Tr(n,a):a.type==="page"&&Wa(n,a,!0))||"prefix"in s&&qi(n,s.prefix):!1,Cr=(n,s)=>rn(n.link)?c(Xn,{...s,config:n}):c("p",s,[c(Un,{icon:n.icon}),n.text]),xr=n=>{const s=Ds();return n?c("ul",{class:"vp-sidebar-sub-headers"},n.map(a=>c("li",{class:"vp-sidebar-sub-header"},[Cr(a,{class:["vp-sidebar-link","vp-heading",{active:Wa(s,a,!0)}]}),xr(a.children)]))):null};var yn=(n=>(n.type="y",n.title="t",n.shortTitle="s",n.icon="i",n.author="a",n.date="d",n.localizedDate="l",n.category="c",n.tag="g",n.isEncrypted="n",n.isOriginal="o",n.readingTime="r",n.excerpt="e",n.sticky="u",n.cover="v",n.index="I",n.order="O",n))(yn||{}),Lr=(n=>(n.article="a",n.home="h",n.slide="s",n.page="p",n))(Lr||{});const ca=(n="",s="")=>Se(s)?s:`${kk(n)}${s}`,Ia=(n,s,a=!1)=>{let e=Ja(n,Ji(encodeURI(s)));e.name==="404"&&(e=Ja(n,s));const{fullPath:t,meta:o,name:p}=e;return{text:!a&&o[yn.shortTitle]?o[yn.shortTitle]:o[yn.title]||s,link:p==="404"?s:t,...o[yn.icon]?{icon:o[yn.icon]}:{}}},wf=(n,s)=>{const a=vn();return{type:"heading",text:n.title,link:`${a.value.path}#${n.slug}`,children:fp(n.children,s)}},fp=(n,s)=>s>0?n.map(a=>wf(a,s-1)):[],Or=n=>{const s=vn();return fp(s.value.headers,n)},wo=(n,s,a="")=>{const e=qn(),t=vn(),o=(p,l=a)=>{var i;const r=rn(p)?Ia(e,ca(l,p)):p.link?{...p,...it(p.link)?{}:{link:Ia(e,ca(l,p.link)).link}}:p;if("children"in r){const d=ca(l,r.prefix),v=r.children==="structure"?mp[d]:r.children;return{type:"group",...r,prefix:d,children:v.map(k=>o(k,d))}}return{type:"page",...r,children:r.link===t.value.path?fp(((i=t.value.headers[0])==null?void 0:i.level)===1?t.value.headers[0].children:t.value.headers,s):[]}};return n.map(p=>o(p))},Sf=(n,s)=>{const a=vn(),e=us(n).sort((t,o)=>o.length-t.length);for(const t of e)if(da(decodeURI(a.value.path),t)){const o=n[t];return o?wo(o==="structure"?mp[t]:o==="heading"?Or(s):o,s,t):[]}return console.warn(`${a.value.path} is missing sidebar config.`),[]},Rf=(n,s)=>{const a=Bs();return n===!1?[]:n==="heading"?Or(s):n==="structure"?wo(mp[a.value],s,a.value):nn(n)?wo(n,s):_t(n)?Sf(n,s):[]},Ir=Symbol(""),Bf=()=>{const n=_n(),s=ln(),a=vn(),e=w(()=>n.value.home?!1:n.value.sidebar??s.value.sidebar??"structure"),t=w(()=>n.value.headerDepth??s.value.headerDepth??2),o=lp(()=>[e.value,t.value,a.value.path,null],()=>Rf(e.value,t.value));is(Ir,o)},hp=()=>{const n=dn(Ir);if(!n)throw new Error("useSidebarItems() is called without provider.");return n};var Df=j({name:"PageFooter",setup(){const n=_n(),s=ln(),a=Br(),e=w(()=>{const{copyright:p,footer:l}=n.value;return l!==!1&&!!(p||l||s.value.displayFooter)}),t=w(()=>{const{footer:p}=n.value;return p===!1?!1:rn(p)?p:s.value.footer||""}),o=w(()=>"copyright"in n.value?n.value.copyright:"copyright"in s.value?s.value.copyright:a.value.length?`Copyright © ${new Date().getFullYear()} ${a.value[0].name}`:!1);return()=>e.value?c("footer",{class:"vp-footer-wrapper"},[t.value?c("div",{class:"vp-footer",innerHTML:t.value}):null,o.value?c("div",{class:"vp-copyright",innerHTML:o.value}):null]):null}}),Tf=j({name:"NavbarDropdownLink",props:{config:{type:Object,required:!0}},slots:Object,setup(n,{slots:s}){const a=vn(),e=Ua(n,"config"),t=w(()=>e.value.ariaLabel||e.value.text),o=U(!1);cn(()=>a.value.path,()=>{o.value=!1});const p=l=>{l.detail===0&&(o.value=!o.value)};return()=>{var l;return c("div",{class:["dropdown-wrapper",{open:o.value}]},[c("button",{type:"button",class:"dropdown-title","aria-label":t.value,onClick:p},[((l=s.title)==null?void 0:l.call(s))||c("span",{class:"title"},[c(Un,{icon:e.value.icon}),n.config.text]),c("span",{class:"arrow"}),c("ul",{class:"nav-dropdown"},e.value.children.map((r,i)=>{const d=i===e.value.children.length-1;return c("li",{class:"dropdown-item"},"children"in r?[c("h4",{class:"dropdown-subtitle"},r.link?c(Xn,{config:r,onFocusout:()=>{r.children.length===0&&d&&(o.value=!1)}}):c("span",r.text)),c("ul",{class:"dropdown-subitem-wrapper"},r.children.map((v,k)=>c("li",{class:"dropdown-subitem"},c(Xn,{config:v,onFocusout:()=>{k===r.children.length-1&&d&&(o.value=!1)}}))))]:c(Xn,{config:r,onFocusout:()=>{d&&(o.value=!1)}}))}))])])}}});const Pr=(n,s,a="")=>rn(s)?Ia(n,ca(a,s)):"children"in s?{...s,...s.link&&!it(s.link)?Ia(n,ca(a,s.link)):{},children:s.children.map(e=>Pr(n,e,ca(a,s.prefix)))}:{...s,link:it(s.link)?s.link:Ia(n,ca(a,s.link)).link},Vr=()=>{const n=ln(),s=qn(),a=()=>(n.value.navbar||[]).map(e=>Pr(s,e));return lp(()=>n.value.navbar,()=>a())},Cf=()=>{const n=ln(),s=w(()=>n.value.repo||null),a=w(()=>s.value?o1(s.value):null),e=w(()=>s.value?Ki(s.value):null),t=w(()=>a.value?n.value.repoLabel??(e.value===null?"Source":e.value):null);return w(()=>!a.value||!t.value||n.value.repoDisplay===!1?null:{type:e.value||"Source",label:t.value,link:a.value})};var xf=j({name:"NavScreenDropdown",props:{config:{type:Object,required:!0}},setup(n){const s=vn(),a=Ua(n,"config"),e=w(()=>a.value.ariaLabel||a.value.text),t=U(!1);cn(()=>s.value.path,()=>{t.value=!1});const o=(p,l)=>l[l.length-1]===p;return()=>[c("button",{type:"button",class:["nav-screen-dropdown-title",{active:t.value}],"aria-label":e.value,onClick:()=>{t.value=!t.value}},[c("span",{class:"title"},[c(Un,{icon:a.value.icon}),n.config.text]),c("span",{class:["arrow",t.value?"down":"end"]})]),c("ul",{class:["nav-screen-dropdown",{hide:!t.value}]},a.value.children.map(p=>c("li",{class:"dropdown-item"},"children"in p?[c("h4",{class:"dropdown-subtitle"},p.link?c(Xn,{config:p,onFocusout:()=>{o(p,a.value.children)&&p.children.length===0&&(t.value=!1)}}):c("span",p.text)),c("ul",{class:"dropdown-subitem-wrapper"},p.children.map(l=>c("li",{class:"dropdown-subitem"},c(Xn,{config:l,onFocusout:()=>{o(l,p.children)&&o(p,a.value.children)&&(t.value=!1)}}))))]:c(Xn,{config:p,onFocusout:()=>{o(p,a.value.children)&&(t.value=!1)}}))))]}}),Lf=j({name:"NavScreenLinks",setup(){const n=Vr();return()=>n.value.length?c("nav",{class:"nav-screen-links"},n.value.map(s=>c("div",{class:"navbar-links-item"},"children"in s?c(xf,{config:s}):c(Xn,{config:s})))):null}});const Fr=()=>c(on,{name:"dark"},()=>c("path",{d:"M524.8 938.667h-4.267a439.893 439.893 0 0 1-313.173-134.4 446.293 446.293 0 0 1-11.093-597.334A432.213 432.213 0 0 1 366.933 90.027a42.667 42.667 0 0 1 45.227 9.386 42.667 42.667 0 0 1 10.24 42.667 358.4 358.4 0 0 0 82.773 375.893 361.387 361.387 0 0 0 376.747 82.774 42.667 42.667 0 0 1 54.187 55.04 433.493 433.493 0 0 1-99.84 154.88 438.613 438.613 0 0 1-311.467 128z"}));Fr.displayName="DarkIcon";const Mr=()=>c(on,{name:"light"},()=>c("path",{d:"M952 552h-80a40 40 0 0 1 0-80h80a40 40 0 0 1 0 80zM801.88 280.08a41 41 0 0 1-57.96-57.96l57.96-58a41.04 41.04 0 0 1 58 58l-58 57.96zM512 752a240 240 0 1 1 0-480 240 240 0 0 1 0 480zm0-560a40 40 0 0 1-40-40V72a40 40 0 0 1 80 0v80a40 40 0 0 1-40 40zm-289.88 88.08-58-57.96a41.04 41.04 0 0 1 58-58l57.96 58a41 41 0 0 1-57.96 57.96zM192 512a40 40 0 0 1-40 40H72a40 40 0 0 1 0-80h80a40 40 0 0 1 40 40zm30.12 231.92a41 41 0 0 1 57.96 57.96l-57.96 58a41.04 41.04 0 0 1-58-58l58-57.96zM512 832a40 40 0 0 1 40 40v80a40 40 0 0 1-80 0v-80a40 40 0 0 1 40-40zm289.88-88.08 58 57.96a41.04 41.04 0 0 1-58 58l-57.96-58a41 41 0 0 1 57.96-57.96z"}));Mr.displayName="LightIcon";const jr=()=>c(on,{name:"auto"},()=>c("path",{d:"M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm0-840c-198.78 0-360 161.22-360 360 0 198.84 161.22 360 360 360s360-161.16 360-360c0-198.78-161.22-360-360-360zm0 660V212c165.72 0 300 134.34 300 300 0 165.72-134.28 300-300 300z"}));jr.displayName="AutoIcon";const Nr=()=>c(on,{name:"enter-fullscreen"},()=>c("path",{d:"M762.773 90.24h-497.28c-96.106 0-174.4 78.293-174.4 174.4v497.28c0 96.107 78.294 174.4 174.4 174.4h497.28c96.107 0 175.04-78.293 174.4-174.4V264.64c0-96.213-78.186-174.4-174.4-174.4zm-387.2 761.173H215.04c-21.867 0-40.427-17.92-41.067-41.066V649.92c0-22.507 17.92-40.427 40.427-40.427 11.307 0 21.227 4.694 28.48 11.947 7.253 7.253 11.947 17.92 11.947 28.48v62.293l145.28-145.28c15.893-15.893 41.813-15.893 57.706 0 15.894 15.894 15.894 41.814 0 57.707l-145.28 145.28h62.294c22.506 0 40.426 17.92 40.426 40.427s-17.173 41.066-39.68 41.066zM650.24 165.76h160.427c21.866 0 40.426 17.92 41.066 41.067v160.426c0 22.507-17.92 40.427-40.426 40.427-11.307 0-21.227-4.693-28.48-11.947-7.254-7.253-11.947-17.92-11.947-28.48v-62.186L625.6 450.347c-15.893 15.893-41.813 15.893-57.707 0-15.893-15.894-15.893-41.814 0-57.707l145.28-145.28H650.88c-22.507 0-40.427-17.92-40.427-40.427s17.174-41.173 39.787-41.173z"}));Nr.displayName="EnterFullScreenIcon";const Hr=()=>c(on,{name:"cancel-fullscreen"},()=>c("path",{d:"M778.468 78.62H247.922c-102.514 0-186.027 83.513-186.027 186.027V795.08c0 102.514 83.513 186.027 186.027 186.027h530.432c102.514 0 186.71-83.513 186.026-186.027V264.647C964.494 162.02 880.981 78.62 778.468 78.62zM250.88 574.35h171.122c23.324 0 43.122 19.115 43.804 43.805v171.121c0 24.008-19.114 43.122-43.122 43.122-12.06 0-22.641-5.006-30.378-12.743s-12.743-19.115-12.743-30.379V722.83L224.597 877.91c-16.953 16.952-44.6 16.952-61.553 0-16.953-16.954-16.953-44.602 0-61.554L318.009 661.39h-66.446c-24.007 0-43.122-19.114-43.122-43.122 0-24.12 18.432-43.918 42.439-43.918zm521.899-98.873H601.657c-23.325 0-43.122-19.114-43.805-43.804V260.55c0-24.007 19.115-43.122 43.122-43.122 12.06 0 22.642 5.007 30.379 12.743s12.743 19.115 12.743 30.38v66.445l154.965-154.965c16.953-16.953 44.601-16.953 61.554 0 16.953 16.953 16.953 44.6 0 61.554L705.536 388.55h66.446c24.007 0 43.122 19.115 43.122 43.122.114 24.007-18.318 43.804-42.325 43.804z"}));Hr.displayName="CancelFullScreenIcon";const $r=()=>c(on,{name:"outlook"},()=>[c("path",{d:"M224 800c0 9.6 3.2 44.8 6.4 54.4 6.4 48-48 76.8-48 76.8s80 41.6 147.2 0 134.4-134.4 38.4-195.2c-22.4-12.8-41.6-19.2-57.6-19.2C259.2 716.8 227.2 761.6 224 800zM560 675.2l-32 51.2c-51.2 51.2-83.2 32-83.2 32 25.6 67.2 0 112-12.8 128 25.6 6.4 51.2 9.6 80 9.6 54.4 0 102.4-9.6 150.4-32l0 0c3.2 0 3.2-3.2 3.2-3.2 22.4-16 12.8-35.2 6.4-44.8-9.6-12.8-12.8-25.6-12.8-41.6 0-54.4 60.8-99.2 137.6-99.2 6.4 0 12.8 0 22.4 0 12.8 0 38.4 9.6 48-25.6 0-3.2 0-3.2 3.2-6.4 0-3.2 3.2-6.4 3.2-6.4 6.4-16 6.4-16 6.4-19.2 9.6-35.2 16-73.6 16-115.2 0-105.6-41.6-198.4-108.8-268.8C704 396.8 560 675.2 560 675.2zM224 419.2c0-28.8 22.4-51.2 51.2-51.2 28.8 0 51.2 22.4 51.2 51.2 0 28.8-22.4 51.2-51.2 51.2C246.4 470.4 224 448 224 419.2zM320 284.8c0-22.4 19.2-41.6 41.6-41.6 22.4 0 41.6 19.2 41.6 41.6 0 22.4-19.2 41.6-41.6 41.6C339.2 326.4 320 307.2 320 284.8zM457.6 208c0-12.8 12.8-25.6 25.6-25.6 12.8 0 25.6 12.8 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6C470.4 233.6 457.6 220.8 457.6 208zM128 505.6C128 592 153.6 672 201.6 736c28.8-60.8 112-60.8 124.8-60.8-16-51.2 16-99.2 16-99.2l316.8-422.4c-48-19.2-99.2-32-150.4-32C297.6 118.4 128 291.2 128 505.6zM764.8 86.4c-22.4 19.2-390.4 518.4-390.4 518.4-22.4 28.8-12.8 76.8 22.4 99.2l9.6 6.4c35.2 22.4 80 12.8 99.2-25.6 0 0 6.4-12.8 9.6-19.2 54.4-105.6 275.2-524.8 288-553.6 6.4-19.2-3.2-32-19.2-32C777.6 76.8 771.2 80 764.8 86.4z"})]);$r.displayName="OutlookIcon";var Jr=j({name:"AppearanceSwitch",setup(){const{config:n,status:s}=Ce(),a=()=>{n.value==="switch"?s.value={light:"dark",dark:"auto",auto:"light"}[s.value]:s.value=s.value==="light"?"dark":"light"};return()=>c("button",{type:"button",id:"appearance-switch",onClick:()=>a()},[c(jr,{style:{display:s.value==="auto"?"block":"none"}}),c(Fr,{style:{display:s.value==="dark"?"block":"none"}}),c(Mr,{style:{display:s.value==="light"?"block":"none"}})])}}),Of=j({name:"AppearanceMode",setup(){const n=ln(),{canToggle:s}=Ce(),a=w(()=>n.value.outlookLocales.darkmode);return()=>s.value?c("div",{class:"appearance-wrapper"},[c("label",{class:"appearance-title",for:"appearance-switch"},a.value),c(Jr)]):null}});const no="VUEPRESS_THEME_COLOR";var If=j({name:"ThemeColorPicker",props:{themeColor:{type:Object,required:!0}},setup(n){const s=(a="")=>{const e=document.documentElement.classList,t=us(n.themeColor);if(!a){localStorage.removeItem(no),e.remove(...t);return}e.remove(...t.filter(o=>o!==a)),e.add(a),localStorage.setItem(no,a)};return bn(()=>{const a=localStorage.getItem(no);a&&s(a)}),()=>c("ul",{id:"theme-color-picker"},[c("li",c("span",{class:"theme-color",onClick:()=>s()})),ba(n.themeColor).map(([a,e])=>c("li",c("span",{style:{background:e},onClick:()=>s(a)})))])}});const Pa=kp.enableThemeColor==="true",Pf=Pa?s1(ba(kp).filter(([n])=>n.startsWith("theme-"))):{};var Vf=j({name:"ThemeColor",setup(){const n=ln(),s=w(()=>n.value.outlookLocales.themeColor);return()=>Pa?c("div",{class:"theme-color-wrapper"},[c("label",{class:"theme-color-title",for:"theme-color-picker"},s.value),c(If,{themeColor:Pf})]):null}}),Wr=j({name:"ToggleFullScreenButton",setup(){const n=ln(),{isSupported:s,isFullscreen:a,toggle:e}=rp(),t=w(()=>n.value.outlookLocales.fullscreen);return()=>s?c("div",{class:"full-screen-wrapper"},[c("label",{class:"full-screen-title",for:"full-screen-switch"},t.value),c("button",{type:"button",id:"full-screen-switch",class:"full-screen",ariaPressed:a.value,onClick:()=>e()},a.value?c(Hr):c(Nr))]):null}}),zr=j({name:"OutlookSettings",setup(){const n=ga(),s=Xa(),a=w(()=>!s.value&&n.value.fullscreen);return()=>c(At,()=>[Pa?c(Vf):null,c(Of),a.value?c(Wr):null])}}),Ff=j({name:"NavScreen",props:{show:Boolean},emits:["close"],slots:Object,setup(n,{emit:s,slots:a}){const e=vn(),{isMobile:t}=Te(),o=Ln(),p=up(o);return bn(()=>{o.value=document.body,cn(t,l=>{!l&&n.show&&(p.value=!1,s("close"))}),cn(()=>e.value.path,()=>{p.value=!1,s("close")})}),fa(()=>{p.value=!1}),()=>c(Ys,{name:"fade",onEnter:()=>{p.value=!0},onAfterLeave:()=>{p.value=!1}},()=>{var l,r;return n.show?c("div",{id:"nav-screen"},c("div",{class:"vp-nav-screen-container"},[(l=a.before)==null?void 0:l.call(a),c(Lf),c("div",{class:"vp-outlook-wrapper"},c(zr)),(r=a.after)==null?void 0:r.call(a)])):null})}}),Mf=j({name:"NavbarBrand",setup(){const n=Bs(),s=qa(),a=ln(),e=w(()=>a.value.home||n.value),t=w(()=>s.value.title),o=w(()=>a.value.navTitle??t.value),p=w(()=>a.value.logo?Dn(a.value.logo):null),l=w(()=>a.value.logoDark?Dn(a.value.logoDark):null);return()=>c($n,{to:e.value,class:"vp-brand"},()=>[p.value?c("img",{class:["vp-nav-logo",{light:!!l.value}],src:p.value,alt:t.value}):null,l.value?c("img",{class:["vp-nav-logo dark"],src:l.value,alt:t.value}):null,o.value?c("span",{class:["vp-site-name",{"hide-in-pad":p.value&&a.value.hideSiteNameOnMobile!==!1}]},o.value):null])}}),jf=j({name:"NavbarLinks",setup(){const n=Vr();return()=>n.value.length?c("nav",{class:"vp-nav-links"},n.value.map(s=>c("div",{class:"nav-item hide-in-mobile"},"children"in s?c(Tf,{config:s}):c(Xn,{config:s})))):null}}),Nf=j({name:"RepoLink",components:{BitbucketIcon:Qi,GiteeIcon:Zi,GitHubIcon:Xi,GitLabIcon:Yi,SourceIcon:nr},setup(){const n=Cf();return()=>n.value?c("div",{class:"nav-item vp-repo"},c("a",{class:"vp-repo-link",href:n.value.link,target:"_blank",rel:"noopener noreferrer","aria-label":n.value.label},c(as(`${n.value.type}Icon`),{style:{width:"1.25rem",height:"1.25rem",verticalAlign:"middle"}}))):null}});const Gr=({active:n=!1},{emit:s})=>c("button",{type:"button",class:["vp-toggle-navbar-button",{"is-active":n}],"aria-label":"Toggle Navbar","aria-expanded":n,"aria-controls":"nav-screen",onClick:()=>s("toggle")},c("span",[c("span",{class:"vp-top"}),c("span",{class:"vp-middle"}),c("span",{class:"vp-bottom"})]));Gr.displayName="ToggleNavbarButton";var Hf=Gr;const So=(n,{emit:s})=>c("button",{type:"button",class:"vp-toggle-sidebar-button",title:"Toggle Sidebar",onClick:()=>s("toggle")},c("span",{class:"icon"}));So.displayName="ToggleSidebarButton",So.emits=["toggle"];var $f=So,Jf=j({name:"OutlookButton",setup(){const{isSupported:n}=rp(),s=ga(),a=Xa(),e=vn(),{canToggle:t}=Ce(),o=U(!1),p=w(()=>!a.value&&s.value.fullscreen&&n);return cn(()=>e.value.path,()=>{o.value=!1}),()=>t.value||p.value||Pa?c("div",{class:"nav-item hide-in-mobile"},t.value&&!p.value&&!Pa?c(Jr):p.value&&!t.value&&!Pa?c(Wr):c("button",{type:"button",class:["outlook-button",{open:o.value}],tabindex:"-1","aria-hidden":!0},[c($r),c("div",{class:"outlook-dropdown"},c(zr))])):null}}),Wf=j({name:"NavBar",emits:["toggleSidebar"],slots:Object,setup(n,{emit:s,slots:a}){const e=ln(),{isMobile:t}=Te(),o=U(!1),p=w(()=>{const{navbarAutoHide:d="mobile"}=e.value;return d!=="none"&&(d==="always"||t.value)}),l=w(()=>e.value.navbarLayout||{start:["Brand"],center:["Links"],end:["Language","Repo","Outlook","Search"]}),r={Brand:Mf,Language:Qt,Links:jf,Repo:Nf,Outlook:Jf,Search:hs("Docsearch")?as("Docsearch"):hs("SearchBox")?as("SearchBox"):Qt},i=d=>r[d]??(hs(d)?as(d):Qt);return()=>{var d,v,k,m,b,E;return[c("header",{id:"navbar",class:["vp-navbar",{"auto-hide":p.value,"hide-icon":e.value.navbarIcon===!1}]},[c("div",{class:"vp-navbar-start"},[c($f,{onToggle:()=>{o.value&&(o.value=!1),s("toggleSidebar")}}),(d=a.startBefore)==null?void 0:d.call(a),(l.value.start||[]).map(S=>c(i(S))),(v=a.startAfter)==null?void 0:v.call(a)]),c("div",{class:"vp-navbar-center"},[(k=a.centerBefore)==null?void 0:k.call(a),(l.value.center||[]).map(S=>c(i(S))),(m=a.centerAfter)==null?void 0:m.call(a)]),c("div",{class:"vp-navbar-end"},[(b=a.endBefore)==null?void 0:b.call(a),(l.value.end||[]).map(S=>c(i(S))),(E=a.endAfter)==null?void 0:E.call(a),c(Hf,{active:o.value,onToggle:()=>{o.value=!o.value}})])]),c(Ff,{show:o.value,onClose:()=>{o.value=!1}},{before:()=>{var S;return(S=a.screenTop)==null?void 0:S.call(a)},after:()=>{var S;return(S=a.screenBottom)==null?void 0:S.call(a)}})]}}}),zf=j({name:"SidebarChild",props:{config:{type:Object,required:!0}},setup(n){const s=Ds();return()=>[Cr(n.config,{class:["vp-sidebar-link",`vp-sidebar-${n.config.type}`,{active:Wa(s,n.config,!0)}],exact:!0}),xr(n.config.children)]}}),Gf=j({name:"SidebarGroup",props:{config:{type:Object,required:!0},open:{type:Boolean,required:!0}},emits:["toggle"],setup(n,{emit:s}){const a=Ds(),e=w(()=>Wa(a,n.config)),t=w(()=>Wa(a,n.config,!0));return()=>{const{collapsible:o,children:p=[],icon:l,prefix:r,link:i,text:d}=n.config;return c("section",{class:"vp-sidebar-group"},[c(o?"button":"p",{class:["vp-sidebar-heading",{clickable:o||i,exact:t.value,active:e.value}],...o?{type:"button",onClick:()=>s("toggle"),onKeydown:v=>{v.key==="Enter"&&s("toggle")}}:{}},[c(Un,{icon:l}),i?c(Xn,{class:"vp-sidebar-title",config:{text:d,link:i},noExternalLinkIcon:!0}):c("span",{class:"vp-sidebar-title"},d),o?c("span",{class:["vp-arrow",n.open?"down":"end"]}):null]),n.open||!o?c(Ur,{key:r,config:p}):null])}}}),Ur=j({name:"SidebarLinks",props:{config:{type:Array,required:!0}},setup(n){const s=Ds(),a=U(-1),e=t=>{a.value=t===a.value?-1:t};return cn(()=>s.path,()=>{const t=n.config.findIndex(o=>Tr(s,o));a.value=t},{immediate:!0,flush:"post"}),()=>c("ul",{class:"vp-sidebar-links"},n.config.map((t,o)=>c("li",t.type==="group"?c(Gf,{config:t,open:o===a.value,onToggle:()=>e(o)}):c(zf,{config:t}))))}}),Uf=j({name:"SideBar",slots:Object,setup(n,{slots:s}){const a=Ds(),e=ln(),t=hp(),o=Ln();return bn(()=>{cn(()=>a.hash,p=>{const l=document.querySelector(`.vp-sidebar a.vp-sidebar-link[href="${a.path}${p}"]`);if(!l)return;const{top:r,height:i}=o.value.getBoundingClientRect(),{top:d,height:v}=l.getBoundingClientRect();d<r?l.scrollIntoView(!0):d+v>r+i&&l.scrollIntoView(!1)},{immediate:!0})}),()=>{var p,l,r;return c("aside",{ref:o,id:"sidebar",class:["vp-sidebar",{"hide-icon":e.value.sidebarIcon===!1}]},[(p=s.top)==null?void 0:p.call(s),((l=s.default)==null?void 0:l.call(s))||c(Ur,{config:t.value}),(r=s.bottom)==null?void 0:r.call(s)])}}}),bp=j({name:"CommonWrapper",props:{containerClass:{type:String,default:""},noNavbar:Boolean,noSidebar:Boolean,noToc:Boolean},slots:Object,setup(n,{slots:s}){const a=qn(),e=vn(),t=_n(),o=ln(),{isMobile:p,isPC:l}=Te(),[r,i]=ut(!1),[d,v]=ut(!1),k=hp(),m=U(!1),b=w(()=>n.noNavbar||t.value.navbar===!1||o.value.navbar===!1?!1:!!(e.value.title||o.value.logo||o.value.repo||o.value.navbar)),E=w(()=>n.noSidebar?!1:t.value.sidebar!==!1&&k.value.length!==0&&!t.value.home),S=w(()=>n.noToc||t.value.home?!1:t.value.toc||o.value.toc!==!1&&t.value.toc!==!1),y={x:0,y:0},B=C=>{y.x=C.changedTouches[0].clientX,y.y=C.changedTouches[0].clientY},_=C=>{const M=C.changedTouches[0].clientX-y.x,P=C.changedTouches[0].clientY-y.y;Math.abs(M)>Math.abs(P)*1.5&&Math.abs(M)>40&&(M>0&&y.x<=80?i(!0):i(!1))},R=()=>window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;let I=0;return Cn("scroll",h1(()=>{const C=R();C<=58||C<I?m.value=!1:I+200<C&&!r.value&&(m.value=!0),I=C},300,!0)),cn(p,C=>{C||i(!1)}),bn(()=>{const C=up(document.body);cn(r,P=>{C.value=P});const M=a.afterEach(()=>{i(!1)});fa(()=>{C.value=!1,M()})}),()=>c(hs("GlobalEncrypt")?as("GlobalEncrypt"):$i,()=>c("div",{class:["theme-container",{"no-navbar":!b.value,"no-sidebar":!E.value&&!(s.sidebar||s.sidebarTop||s.sidebarBottom),"has-toc":S.value,"hide-navbar":m.value,"sidebar-collapsed":!p.value&&!l.value&&d.value,"sidebar-open":p.value&&r.value},n.containerClass,t.value.containerClass||""],onTouchStart:B,onTouchEnd:_},[b.value?c(Wf,{onToggleSidebar:()=>i()},{startBefore:()=>{var C;return(C=s.navbarStartBefore)==null?void 0:C.call(s)},startAfter:()=>{var C;return(C=s.navbarStartAfter)==null?void 0:C.call(s)},centerBefore:()=>{var C;return(C=s.navbarCenterBefore)==null?void 0:C.call(s)},centerAfter:()=>{var C;return(C=s.navbarCenterAfter)==null?void 0:C.call(s)},endBefore:()=>{var C;return(C=s.navbarEndBefore)==null?void 0:C.call(s)},endAfter:()=>{var C;return(C=s.navbarEndAfter)==null?void 0:C.call(s)},screenTop:()=>{var C;return(C=s.navScreenTop)==null?void 0:C.call(s)},screenBottom:()=>{var C;return(C=s.navScreenBottom)==null?void 0:C.call(s)}}):null,c(Ys,{name:"fade"},()=>r.value?c("div",{class:"vp-sidebar-mask",onClick:()=>i(!1)}):null),c(Ys,{name:"fade"},()=>p.value?null:c("div",{class:"toggle-sidebar-wrapper",onClick:()=>v()},c("span",{class:["arrow",d.value?"end":"start"]}))),c(Uf,{},{...s.sidebar?{default:()=>s.sidebar()}:{},top:()=>{var C;return(C=s.sidebarTop)==null?void 0:C.call(s)},bottom:()=>{var C;return(C=s.sidebarBottom)==null?void 0:C.call(s)}}),s.default(),c(Df)]))}}),hn=j({name:"DropTransition",props:{type:{type:String,default:"single"},delay:{type:Number,default:0},duration:{type:Number,default:.25},appear:Boolean},slots:Object,setup(n,{slots:s}){const a=t=>{t.style.transition=`transform ${n.duration}s ease-in-out ${n.delay}s, opacity ${n.duration}s ease-in-out ${n.delay}s`,t.style.transform="translateY(-20px)",t.style.opacity="0"},e=t=>{t.style.transform="translateY(0)",t.style.opacity="1"};return()=>c(n.type==="single"?Ys:Kv,{name:"drop",appear:n.appear,onAppear:a,onAfterAppear:e,onEnter:a,onAfterEnter:e,onBeforeLeave:a},()=>s.default())}});const Ro=({custom:n})=>c(wi,{class:["theme-hope-content",{custom:n}]});Ro.displayName="MarkdownContent",Ro.props={custom:Boolean};var gp=Ro;const qr=()=>c(on,{name:"author"},()=>c("path",{d:"M649.6 633.6c86.4-48 147.2-144 147.2-249.6 0-160-128-288-288-288s-288 128-288 288c0 108.8 57.6 201.6 147.2 249.6-121.6 48-214.4 153.6-240 288-3.2 9.6 0 19.2 6.4 25.6 3.2 9.6 12.8 12.8 22.4 12.8h704c9.6 0 19.2-3.2 25.6-12.8 6.4-6.4 9.6-16 6.4-25.6-25.6-134.4-121.6-240-243.2-288z"}));qr.displayName="AuthorIcon";const Kr=()=>c(on,{name:"calendar"},()=>c("path",{d:"M716.4 110.137c0-18.753-14.72-33.473-33.472-33.473-18.753 0-33.473 14.72-33.473 33.473v33.473h66.993v-33.473zm-334.87 0c0-18.753-14.72-33.473-33.473-33.473s-33.52 14.72-33.52 33.473v33.473h66.993v-33.473zm468.81 33.52H716.4v100.465c0 18.753-14.72 33.473-33.472 33.473a33.145 33.145 0 01-33.473-33.473V143.657H381.53v100.465c0 18.753-14.72 33.473-33.473 33.473a33.145 33.145 0 01-33.473-33.473V143.657H180.6A134.314 134.314 0 0046.66 277.595v535.756A134.314 134.314 0 00180.6 947.289h669.74a134.36 134.36 0 00133.94-133.938V277.595a134.314 134.314 0 00-133.94-133.938zm33.473 267.877H147.126a33.145 33.145 0 01-33.473-33.473c0-18.752 14.72-33.473 33.473-33.473h736.687c18.752 0 33.472 14.72 33.472 33.473a33.145 33.145 0 01-33.472 33.473z"}));Kr.displayName="CalendarIcon";const Xr=()=>c(on,{name:"category"},()=>c("path",{d:"M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z"}));Xr.displayName="CategoryIcon";const Yr=()=>c(on,{name:"print"},()=>c("path",{d:"M819.2 364.8h-44.8V128c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v236.8h-44.8C145.067 364.8 96 413.867 96 473.6v192c0 59.733 49.067 108.8 108.8 108.8h44.8V896c0 17.067 14.933 32 32 32h460.8c17.067 0 32-14.933 32-32V774.4h44.8c59.733 0 108.8-49.067 108.8-108.8v-192c0-59.733-49.067-108.8-108.8-108.8zM313.6 160h396.8v204.8H313.6V160zm396.8 704H313.6V620.8h396.8V864zM864 665.6c0 25.6-19.2 44.8-44.8 44.8h-44.8V588.8c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v121.6h-44.8c-25.6 0-44.8-19.2-44.8-44.8v-192c0-25.6 19.2-44.8 44.8-44.8h614.4c25.6 0 44.8 19.2 44.8 44.8v192z"}));Yr.displayName="PrintIcon";const Zr=()=>c(on,{name:"tag"},()=>c("path",{d:"M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z"}));Zr.displayName="TagIcon";const Qr=()=>c(on,{name:"timer"},()=>c("path",{d:"M799.387 122.15c4.402-2.978 7.38-7.897 7.38-13.463v-1.165c0-8.933-7.38-16.312-16.312-16.312H256.33c-8.933 0-16.311 7.38-16.311 16.312v1.165c0 5.825 2.977 10.874 7.637 13.592 4.143 194.44 97.22 354.963 220.201 392.763-122.204 37.542-214.893 196.511-220.2 389.397-4.661 5.049-7.638 11.651-7.638 19.03v5.825h566.49v-5.825c0-7.379-2.849-13.981-7.509-18.9-5.049-193.016-97.867-351.985-220.2-389.527 123.24-37.67 216.446-198.453 220.588-392.892zM531.16 450.445v352.632c117.674 1.553 211.787 40.778 211.787 88.676H304.097c0-48.286 95.149-87.382 213.728-88.676V450.445c-93.077-3.107-167.901-81.297-167.901-177.093 0-8.803 6.99-15.793 15.793-15.793 8.803 0 15.794 6.99 15.794 15.793 0 80.261 63.69 145.635 142.01 145.635s142.011-65.374 142.011-145.635c0-8.803 6.99-15.793 15.794-15.793s15.793 6.99 15.793 15.793c0 95.019-73.789 172.82-165.96 177.093z"}));Qr.displayName="TimerIcon";const nu=()=>c(on,{name:"word"},()=>[c("path",{d:"M518.217 432.64V73.143A73.143 73.143 0 01603.43 1.097a512 512 0 01419.474 419.474 73.143 73.143 0 01-72.046 85.212H591.36a73.143 73.143 0 01-73.143-73.143z"}),c("path",{d:"M493.714 566.857h340.297a73.143 73.143 0 0173.143 85.577A457.143 457.143 0 11371.566 117.76a73.143 73.143 0 0185.577 73.143v339.383a36.571 36.571 0 0036.571 36.571z"})]);nu.displayName="WordIcon";const na=()=>{const n=ln();return w(()=>n.value.metaLocales)};var qf=j({name:"AuthorInfo",inheritAttrs:!1,props:{author:{type:Array,required:!0},pure:Boolean},setup(n){const s=na();return()=>n.author.length?c("span",{class:"page-author-info","aria-label":`${s.value.author}${n.pure?"":"🖊"}`,...n.pure?{}:{"data-balloon-pos":"down"}},[c(qr),c("span",n.author.map(a=>a.url?c("a",{class:"page-author-item",href:a.url,target:"_blank",rel:"noopener noreferrer"},a.name):c("span",{class:"page-author-item"},a.name))),c("span",{property:"author",content:n.author.map(a=>a.name).join(", ")})]):null}}),Kf=j({name:"CategoryInfo",inheritAttrs:!1,props:{category:{type:Array,required:!0},pure:Boolean},setup(n){const s=qn(),a=vn(),e=na(),t=(o,p="")=>{p&&a.value.path!==p&&(o.preventDefault(),s.push(p))};return()=>n.category.length?c("span",{class:"page-category-info","aria-label":`${e.value.category}${n.pure?"":"🌈"}`,...n.pure?{}:{"data-balloon-pos":"down"}},[c(Xr),n.category.map(({name:o,path:p})=>c("span",{class:["page-category-item",{[`category${Rt(o,9)}`]:!n.pure,clickable:p}],role:p?"navigation":"",onClick:l=>t(l,p)},o)),c("meta",{property:"articleSection",content:n.category.map(({name:o})=>o).join(",")})]):null}}),Xf=j({name:"DateInfo",inheritAttrs:!1,props:{date:{type:Object,default:null},localizedDate:{type:String,default:""},pure:Boolean},setup(n){const s=Ei(),a=na();return()=>n.date?c("span",{class:"page-date-info","aria-label":`${a.value.date}${n.pure?"":"📅"}`,...n.pure?{}:{"data-balloon-pos":"down"}},[c(Kr),c("span",c(At,()=>n.localizedDate||n.date.toLocaleDateString(s.value))),c("meta",{property:"datePublished",content:n.date.toISOString()||""})]):null}}),Yf=j({name:"OriginalInfo",inheritAttrs:!1,props:{isOriginal:Boolean},setup(n){const s=na();return()=>n.isOriginal?c("span",{class:"page-original-info"},s.value.origin):null}}),Zf=j({name:"ReadingTimeInfo",inheritAttrs:!1,props:{readingTime:{type:Object,default:()=>null},readingTimeLocale:{type:Object,default:()=>null},pure:Boolean},setup(n){const s=na(),a=w(()=>{if(!n.readingTime)return null;const{minutes:e}=n.readingTime;return e<1?"PT1M":`PT${Math.round(e)}M`});return()=>{var e,t;return(e=n.readingTimeLocale)!=null&&e.time?c("span",{class:"page-reading-time-info","aria-label":`${s.value.readingTime}${n.pure?"":"⌛"}`,...n.pure?{}:{"data-balloon-pos":"down"}},[c(Qr),c("span",(t=n.readingTimeLocale)==null?void 0:t.time),c("meta",{property:"timeRequired",content:a.value})]):null}}}),Qf=j({name:"TagInfo",inheritAttrs:!1,props:{tag:{type:Array,default:()=>[]},pure:Boolean},setup(n){const s=qn(),a=vn(),e=na(),t=(o,p="")=>{p&&a.value.path!==p&&(o.preventDefault(),s.push(p))};return()=>n.tag.length?c("span",{class:"page-tag-info","aria-label":`${e.value.tag}${n.pure?"":"🏷"}`,...n.pure?{}:{"data-balloon-pos":"down"}},[c(Zr),n.tag.map(({name:o,path:p})=>c("span",{class:["page-tag-item",{[`tag${Rt(o,9)}`]:!n.pure,clickable:p}],role:p?"navigation":"",onClick:l=>t(l,p)},o)),c("meta",{property:"keywords",content:n.tag.map(({name:o})=>o).join(",")})]):null}}),nh=j({name:"ReadTimeInfo",inheritAttrs:!1,props:{readingTime:{type:Object,default:()=>null},readingTimeLocale:{type:Object,default:()=>null},pure:Boolean},setup(n){const s=na();return()=>{var a,e,t;return(a=n.readingTimeLocale)!=null&&a.words?c("span",{class:"page-word-info","aria-label":`${s.value.words}${n.pure?"":"🔠"}`,...n.pure?{}:{"data-balloon-pos":"down"}},[c(nu),c("span",(e=n.readingTimeLocale)==null?void 0:e.words),c("meta",{property:"wordCount",content:(t=n.readingTime)==null?void 0:t.words})]):null}}}),su=j({name:"PageInfo",components:{AuthorInfo:qf,CategoryInfo:Kf,DateInfo:Xf,OriginalInfo:Yf,PageViewInfo:()=>null,ReadingTimeInfo:Zf,TagInfo:Qf,WordInfo:nh},props:{items:{type:[Array,Boolean],default:()=>["Author","Original","Date","PageView","ReadingTime","Category","Tag"]},info:{type:Object,required:!0}},setup(n){const s=Xa();return()=>n.items?c("div",{class:"page-info"},n.items.map(a=>c(as(`${a}Info`),{...n.info,pure:s.value}))):null}}),sh=j({name:"PrintButton",setup(){const n=ga(),s=ln();return()=>n.value.print===!1?null:c("button",{type:"button",class:"print-button",title:s.value.metaLocales.print,onClick:()=>{window.print()}},c(Yr))}});const ah=({title:n,level:s,slug:a})=>c($n,{to:`#${a}`,class:["toc-link",`level${s}`]},()=>n),Bo=(n,s)=>{const a=Ds();return n.length&&s>0?c("ul",{class:"toc-list"},n.map(e=>{const t=Bo(e.children,s-1);return[c("li",{class:["toc-item",{active:a.hash===`#${e.slug}`}]},ah(e)),t?c("li",t):null]})):null};var au=j({name:"TOC",props:{items:{type:Array,default:()=>[]},headerDepth:{type:Number,default:2}},slots:Object,setup(n,{slots:s}){const a=Ds(),e=vn(),t=na(),o=Ln(),p=U("-1.7rem"),l=i=>{var d;(d=o.value)==null||d.scrollTo({top:i,behavior:"smooth"})},r=()=>{if(o.value){const i=document.querySelector(".toc-item.active");i?p.value=`${i.getBoundingClientRect().top-o.value.getBoundingClientRect().top+o.value.scrollTop}px`:p.value="-1.7rem"}else p.value="-1.7rem"};return bn(()=>{cn(()=>a.hash,i=>{if(o.value){const d=document.querySelector(`#toc a.toc-link[href$="${i}"]`);if(!d)return;const{top:v,height:k}=o.value.getBoundingClientRect(),{top:m,height:b}=d.getBoundingClientRect();m<v?l(o.value.scrollTop+m-v):m+b>v+k&&l(o.value.scrollTop+m+b-v-k)}}),cn(()=>a.fullPath,r,{flush:"post",immediate:!0})}),()=>{var d,v;const i=n.items.length?Bo(n.items,n.headerDepth):e.value.headers?Bo(e.value.headers,n.headerDepth):null;return i?c("div",{class:"toc-place-holder"},[c("aside",{id:"toc"},[(d=s.before)==null?void 0:d.call(s),c("div",{class:"toc-header"},[t.value.toc,c(sh)]),c("div",{class:"toc-wrapper",ref:o},[i,c("div",{class:"toc-marker",style:{top:p.value}})]),(v=s.after)==null?void 0:v.call(s)])]):null}}}),Ep=j({name:"SkipLink",props:{content:{type:String,default:"main-content"}},setup(n){const s=vn(),a=ln(),e=Ln(),t=({target:o})=>{const p=document.querySelector(o.hash);if(p){const l=()=>{p.removeAttribute("tabindex"),p.removeEventListener("blur",l)};p.setAttribute("tabindex","-1"),p.addEventListener("blur",l),p.focus(),window.scrollTo(0,0)}};return bn(()=>{cn(()=>s.value.path,()=>e.value.focus())}),()=>[c("span",{ref:e,tabindex:"-1"}),c("a",{href:`#${n.content}`,class:"vp-skip-link sr-only",onClick:t},a.value.routeLocales.skipToContent)]}});let so=null,se=null;const eh={wait:()=>so,pending:()=>{so=new Promise(n=>se=n)},resolve:()=>{se==null||se(),so=null,se=null}},eu=()=>eh;var th=j({name:"FadeSlideY",slots:Object,setup(n,{slots:s}){const{resolve:a,pending:e}=eu();return()=>c(Ys,{name:"fade-slide-y",mode:"out-in",onBeforeEnter:a,onBeforeLeave:e},()=>{var t;return(t=s.default)==null?void 0:t.call(s)})}});const oh=(n,s)=>{const a=n.replace(s,"/").split("/"),e=[];let t=Qo(s);return a.forEach((o,p)=>{p!==a.length-1?(t+=`${o}/`,e.push({link:t,name:o||"Home"})):o!==""&&(t+=o,e.push({link:t,name:o}))}),e},tu=(n,{slots:s})=>{var v,k;const{bgImage:a,bgImageDark:e,bgImageStyle:t,color:o,description:p,image:l,imageDark:r,header:i,features:d=[]}=n;return c("div",{class:"vp-feature-wrapper"},[a?c("div",{class:["vp-feature-bg",{light:e}],style:[{"background-image":`url(${a})`},t]}):null,e?c("div",{class:"vp-feature-bg dark",style:[{"background-image":`url(${e})`},t]}):null,c("div",{class:"vp-feature",style:o?{color:o}:{}},[((v=s.image)==null?void 0:v.call(s,n))||[l?c("img",{class:["vp-feature-image",{light:r}],src:Dn(l),alt:i}):null,r?c("img",{class:"vp-feature-image dark",src:Dn(r),alt:i}):null],((k=s.info)==null?void 0:k.call(s,n))||[i?c("h2",{class:"vp-feature-header"},i):null,p?c("p",{class:"vp-feature-description",innerHTML:p}):null],d.length?c("div",{class:"vp-features"},d.map(({icon:m,title:b,details:E,link:S})=>{const y=[c("h3",{class:"vp-feature-title"},[c(Un,{icon:m}),c("span",{innerHTML:b})]),c("p",{class:"vp-feature-details",innerHTML:E})];return S?it(S)?c("a",{class:"vp-feature-item link",href:S,"aria-label":b,target:"_blank"},y):c($n,{class:"vp-feature-item link",to:S,"aria-label":b},()=>y):c("div",{class:"vp-feature-item"},y)})):null])])};tu.displayName="FeaturePanel";var sl=tu;const ou=n=>{const{icon:s="",color:a,size:e}=n,t={};return a&&(t.color=a),e&&(t.height=Number.isNaN(Number(e))?e:`${e}px`),ha(s)?c("img",{class:"icon",src:s,"no-view":"",style:t}):Se(s)?c("img",{class:"icon",src:Dn(s),"no-view":"",style:t}):c(as("FontIcon"),n)};ou.displayName="HopeIcon";var ph=ou,ch=j({name:"HeroInfo",slots:Object,setup(n,{slots:s}){const a=_n(),e=qa(),t=w(()=>a.value.heroFullScreen??!1),o=w(()=>{const{heroText:i,tagline:d}=a.value;return{text:i??e.value.title??"Hello",tagline:d??e.value.description??"",isFullScreen:t.value}}),p=w(()=>{const{heroText:i,heroImage:d,heroImageDark:v,heroAlt:k,heroImageStyle:m}=a.value;return{image:d?Dn(d):null,imageDark:v?Dn(v):null,heroStyle:m,alt:k||i||"hero image",isFullScreen:t.value}}),l=w(()=>{const{bgImage:i,bgImageDark:d,bgImageStyle:v}=a.value;return{image:Vs(i)?Dn(i):null,imageDark:Vs(d)?Dn(d):null,bgStyle:v,isFullScreen:t.value}}),r=w(()=>a.value.actions??[]);return()=>{var i,d,v;return c("header",{class:["vp-hero-info-wrapper",{fullscreen:t.value}]},[((i=s.heroBg)==null?void 0:i.call(s,l.value))||[l.value.image?c("div",{class:["vp-hero-mask",{light:l.value.imageDark}],style:[{"background-image":`url(${l.value.image})`},l.value.bgStyle]}):null,l.value.imageDark?c("div",{class:"vp-hero-mask dark",style:[{"background-image":`url(${l.value.imageDark})`},l.value.bgStyle]}):null],c("div",{class:"vp-hero-info"},[((d=s.heroImage)==null?void 0:d.call(s,p.value))||c(hn,{appear:!0,type:"group"},()=>[p.value.image?c("img",{key:"light",class:["vp-hero-image",{light:p.value.imageDark}],style:p.value.heroStyle,src:p.value.image,alt:p.value.alt}):null,p.value.imageDark?c("img",{key:"dark",class:"vp-hero-image dark",style:p.value.heroStyle,src:p.value.imageDark,alt:p.value.alt}):null]),((v=s.heroInfo)==null?void 0:v.call(s,o.value))??c("div",{class:"vp-hero-infos"},[o.value.text?c(hn,{appear:!0,delay:.04},()=>c("h1",{id:"main-title"},o.value.text)):null,o.value.tagline?c(hn,{appear:!0,delay:.08},()=>c("p",{id:"main-description",innerHTML:o.value.tagline})):null,r.value.length?c(hn,{appear:!0,delay:.12},()=>c("p",{class:"vp-hero-actions"},r.value.map(k=>c(Xn,{class:["vp-hero-action",k.type||"default"],config:k,noExternalLinkIcon:!0},k.icon?{before:()=>c(ph,{icon:k.icon})}:{})))):null])])])}}});const pu=(n,{slots:s})=>{var k,m,b;const{bgImage:a,bgImageDark:e,bgImageStyle:t,color:o,description:p,image:l,imageDark:r,header:i,highlights:d=[],type:v="un-order"}=n;return c("div",{class:"vp-highlight-wrapper",style:o?{color:o}:{}},[a?c("div",{class:["vp-highlight-bg",{light:e}],style:[{"background-image":`url(${a})`},t]}):null,e?c("div",{class:"vp-highlight-bg dark",style:[{"background-image":`url(${e})`},t]}):null,c("div",{class:"vp-highlight"},[((k=s.image)==null?void 0:k.call(s,n))||[l?c("img",{class:["vp-highlight-image",{light:r}],src:Dn(l),alt:i}):null,r?c("img",{class:"vp-highlight-image dark",src:Dn(r),alt:i}):null],((m=s.info)==null?void 0:m.call(s,n))||[c("div",{class:"vp-highlight-info-wrapper"},c("div",{class:"vp-highlight-info"},[i?c("h2",{class:"vp-highlight-header",innerHTML:i}):null,p?c("p",{class:"vp-highlight-description",innerHTML:p}):null,((b=s.highlights)==null?void 0:b.call(s,d))||c(v==="order"?"ol":v==="no-order"?"dl":"ul",{class:"vp-highlights"},d.map(({icon:E,title:S,details:y,link:B})=>{const _=[c(v==="no-order"?"dt":"h3",{class:"vp-highlight-title"},[E?c(Un,{class:"vp-highlight-icon",icon:E}):null,c("span",{innerHTML:S})]),y?c(v==="no-order"?"dd":"p",{class:"vp-highlight-details",innerHTML:y}):null];return c(v==="no-order"?"div":"li",{class:["vp-highlight-item-wrapper",{link:B}]},B?Zm(B)?c("a",{class:"vp-highlight-item link",href:B,"aria-label":S,target:"_blank"},_):c($n,{class:"vp-highlight-item link",to:B,"aria-label":S},()=>_):c("div",{class:"vp-highlight-item"},_))}))]))]])])};pu.displayName="HighlightPanel";var lh=pu,ih=j({name:"HomePage",slots:Object,setup(n,{slots:s}){const a=Xa(),e=_n(),t=w(()=>{const{features:p}=e.value;return nn(p)?p:null}),o=w(()=>{const{highlights:p}=e.value;return nn(p)?p:null});return()=>{var p,l,r,i;return c("main",{id:"main-content",class:["vp-project-home ",{pure:a.value}],"aria-labelledby":e.value.heroText===null?"":"main-title"},[(p=s.top)==null?void 0:p.call(s),c(ch),((l=o.value)==null?void 0:l.map(d=>"features"in d?c(sl,d):c(lh,d)))||(t.value?c(hn,{appear:!0,delay:.24},()=>c(sl,{features:t.value})):null),(r=s.center)==null?void 0:r.call(s),c(hn,{appear:!0,delay:.32},()=>c(gp)),(i=s.bottom)==null?void 0:i.call(s)])}}}),rh=j({name:"BreadCrumb",setup(){const n=qn(),s=vn(),a=Bs(),e=_n(),t=ln(),o=Ln([]),p=w(()=>(e.value.breadcrumb||e.value.breadcrumb!==!1&&t.value.breadcrumb!==!1)&&o.value.length>1),l=w(()=>e.value.breadcrumbIcon||e.value.breadcrumbIcon!==!1&&t.value.breadcrumbIcon!==!1),r=()=>{const i=n.getRoutes(),d=oh(s.value.path,a.value).map(({link:v,name:k})=>{const m=i.find(b=>b.path===v);if(m){const{meta:b,path:E}=Ja(n,m.path);return{title:b[yn.shortTitle]||b[yn.title]||k,icon:b[yn.icon],path:E}}return null}).filter(v=>v!==null);d.length>1&&(o.value=d)};return bn(()=>{cn(()=>s.value.path,r,{immediate:!0})}),()=>c("nav",{class:["vp-breadcrumb",{disable:!p.value}]},p.value?c("ol",{vocab:"https://schema.org/",typeof:"BreadcrumbList"},o.value.map((i,d)=>c("li",{class:{"is-active":o.value.length-1===d},property:"itemListElement",typeof:"ListItem"},[c($n,{to:i.path,property:"item",typeof:"WebPage"},()=>[l.value?c(Un,{icon:i.icon}):null,c("span",{property:"name"},i.title||"Unknown")]),c("meta",{property:"position",content:d+1})]))):[])}});const al=n=>{const s=qn();return n===!1?!1:rn(n)?Ia(s,n,!0):_t(n)?n:null},Do=(n,s,a)=>{const e=n.findIndex(t=>t.link===s);if(e!==-1){const t=n[e+a];return t!=null&&t.link?t:null}for(const t of n)if(t.children){const o=Do(t.children,s,a);if(o)return o}return null};var uh=j({name:"PageNav",setup(){const n=ln(),s=_n(),a=hp(),e=vn(),t=De(),o=w(()=>{const l=al(s.value.prev);return l===!1?null:l||(n.value.prevLink===!1?null:Do(a.value,e.value.path,-1))}),p=w(()=>{const l=al(s.value.next);return l===!1?null:l||(n.value.nextLink===!1?null:Do(a.value,e.value.path,1))});return Cn("keydown",l=>{l.altKey&&(l.key==="ArrowRight"?p.value&&(t(p.value.link),l.preventDefault()):l.key==="ArrowLeft"&&o.value&&(t(o.value.link),l.preventDefault()))}),()=>o.value||p.value?c("nav",{class:"vp-page-nav"},[o.value?c(Xn,{class:"prev",config:o.value},()=>{var l,r;return[c("div",{class:"hint"},[c("span",{class:"arrow start"}),n.value.metaLocales.prev]),c("div",{class:"link"},[c(Un,{icon:(l=o.value)==null?void 0:l.icon}),(r=o.value)==null?void 0:r.text])]}):null,p.value?c(Xn,{class:"next",config:p.value},()=>{var l,r;return[c("div",{class:"hint"},[n.value.metaLocales.next,c("span",{class:"arrow end"})]),c("div",{class:"link"},[(l=p.value)==null?void 0:l.text,c(Un,{icon:(r=p.value)==null?void 0:r.icon})])]}):null]):null}});const dh={GitHub:":repo/edit/:branch/:path",GitLab:":repo/-/edit/:branch/:path",Gitee:":repo/edit/:branch/:path",Bitbucket:":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"},vh=({docsRepo:n,docsBranch:s,docsDir:a,filePathRelative:e,editLinkPattern:t})=>{if(!e)return null;const o=Ki(n);let p;return t?p=t:o!==null&&(p=dh[o]),p?p.replace(/:repo/,ha(n)?n:`https://github.com/${n}`).replace(/:branch/,s).replace(/:path/,ki(`${Qo(a)}/${e}`)):null},kh=()=>{const n=ln(),s=vn(),a=_n();return w(()=>{const{repo:e,docsRepo:t=e,docsBranch:o="main",docsDir:p="",editLink:l,editLinkPattern:r=""}=n.value;if(!(a.value.editLink??l??!0)||!t)return null;const i=vh({docsRepo:t,docsBranch:o,docsDir:p,editLinkPattern:r,filePathRelative:s.value.filePathRelative});return i?{text:n.value.metaLocales.editLink,link:i}:null})},mh=()=>{const n=qa(),s=ln(),a=vn(),e=_n();return w(()=>{var t,o;return!(e.value.lastUpdated??s.value.lastUpdated??!0)||!((t=a.value.git)!=null&&t.updatedTime)?null:new Date((o=a.value.git)==null?void 0:o.updatedTime).toLocaleString(n.value.lang)})},fh=()=>{const n=ln(),s=vn(),a=_n();return w(()=>{var e;return a.value.contributors??n.value.contributors??!0?((e=s.value.git)==null?void 0:e.contributors)??null:null})};var hh=j({name:"PageTitle",setup(){const n=vn(),s=_n(),a=ln(),{info:e,items:t}=gf();return()=>c("div",{class:"vp-page-title"},[c("h1",[a.value.titleIcon===!1?null:c(Un,{icon:s.value.icon}),n.value.title]),c(su,{info:e.value,...t.value===null?{}:{items:t.value}}),c("hr")])}});const cu=()=>c(on,{name:"edit"},()=>[c("path",{d:"M430.818 653.65a60.46 60.46 0 0 1-50.96-93.281l71.69-114.012 7.773-10.365L816.038 80.138A60.46 60.46 0 0 1 859.225 62a60.46 60.46 0 0 1 43.186 18.138l43.186 43.186a60.46 60.46 0 0 1 0 86.373L588.879 565.55l-8.637 8.637-117.466 68.234a60.46 60.46 0 0 1-31.958 11.229z"}),c("path",{d:"M728.802 962H252.891A190.883 190.883 0 0 1 62.008 771.98V296.934a190.883 190.883 0 0 1 190.883-192.61h267.754a60.46 60.46 0 0 1 0 120.92H252.891a69.962 69.962 0 0 0-69.098 69.099V771.98a69.962 69.962 0 0 0 69.098 69.098h475.911A69.962 69.962 0 0 0 797.9 771.98V503.363a60.46 60.46 0 1 1 120.922 0V771.98A190.883 190.883 0 0 1 728.802 962z"})]);cu.displayName="EditIcon";var bh=j({name:"PageMeta",setup(){const n=ln(),s=kh(),a=mh(),e=fh();return()=>{const{metaLocales:t}=n.value;return c("footer",{class:"page-meta"},[s.value?c("div",{class:"meta-item edit-link"},c(Xn,{class:"label",config:s.value},{before:()=>c(cu)})):null,c("div",{class:"meta-item git-info"},[a.value?c("div",{class:"update-time"},[c("span",{class:"label"},`${t.lastUpdated}: `),c(At,()=>c("span",{class:"info"},a.value))]):null,e.value&&e.value.length?c("div",{class:"contributors"},[c("span",{class:"label"},`${t.contributors}: `),e.value.map(({email:o,name:p},l)=>[c("span",{class:"contributor",title:`email: ${o}`},p),l!==e.value.length-1?",":""])]):null])])}}}),gh=j({name:"NormalPage",slots:Object,setup(n,{slots:s}){const a=_n(),e=vn(),{isDarkmode:t}=Ce(),o=ln(),p=w(()=>a.value.toc||a.value.toc!==!1&&o.value.toc!==!1);return()=>c("main",{id:"main-content",class:"vp-page"},c(hs("LocalEncrypt")?as("LocalEncrypt"):$i,()=>{var l,r,i,d;return[(l=s.top)==null?void 0:l.call(s),a.value.cover?c("img",{class:"page-cover",src:Dn(a.value.cover),alt:e.value.title,"no-view":""}):null,c(rh),c(hh),p.value?c(au,{headerDepth:a.value.headerDepth??o.value.headerDepth??2},{before:()=>{var v;return(v=s.tocBefore)==null?void 0:v.call(s)},after:()=>{var v;return(v=s.tocAfter)==null?void 0:v.call(s)}}):null,(r=s.contentBefore)==null?void 0:r.call(s),c(gp),(i=s.contentAfter)==null?void 0:i.call(s),c(bh),c(uh),hs("CommentService")?c(as("CommentService"),{darkmode:t.value}):null,(d=s.bottom)==null?void 0:d.call(s)]}))}}),Eh=j({name:"Layout",slots:Object,setup(n,{slots:s}){const a=ga(),e=ln(),t=vn(),o=_n(),{isMobile:p}=Te(),l=w(()=>{var r,i;return((r=e.value.blog)==null?void 0:r.sidebarDisplay)||((i=a.value.blog)==null?void 0:i.sidebarDisplay)||"mobile"});return()=>[c(Ep),c(bp,{},{default:()=>{var r;return((r=s.default)==null?void 0:r.call(s))||(o.value.home?c(ih):c(th,()=>c(gh,{key:t.value.path},{top:()=>{var i;return(i=s.top)==null?void 0:i.call(s)},bottom:()=>{var i;return(i=s.bottom)==null?void 0:i.call(s)},contentBefore:()=>{var i;return(i=s.contentBefore)==null?void 0:i.call(s)},contentAfter:()=>{var i;return(i=s.contentAfter)==null?void 0:i.call(s)},tocBefore:()=>{var i;return(i=s.tocBefore)==null?void 0:i.call(s)},tocAfter:()=>{var i;return(i=s.tocAfter)==null?void 0:i.call(s)}})))},...l.value!=="none"?{navScreenBottom:()=>c(as("BloggerInfo"))}:{},...!p.value&&l.value==="always"?{sidebar:()=>c(as("BloggerInfo"))}:{}})]}}),yh=j({name:"NotFoundHint",setup(){const n=ln(),s=()=>{const a=n.value.routeLocales.notFoundMsg;return a[Math.floor(Math.random()*a.length)]};return()=>c("div",{class:"not-found-hint"},[c("p",{class:"error-code"},"404"),c("h1",{class:"error-title"},n.value.routeLocales.notFoundTitle),c("p",{class:"error-hint"},s())])}}),_h=j({name:"NotFound",slots:Object,setup(n,{slots:s}){const a=Bs(),e=ln(),{navigate:t}=bo({to:e.value.home??a.value});return()=>[c(Ep),c(bp,{noSidebar:!0},()=>{var o;return c("main",{id:"main-content",class:"vp-page not-found"},((o=s.default)==null?void 0:o.call(s))||[c(yh),c("div",{class:"actions"},[c("button",{type:"button",class:"action-button",onClick:()=>{window.history.go(-1)}},e.value.routeLocales.back),c("button",{type:"button",class:"action-button",onClick:()=>t()},e.value.routeLocales.home)])])})]}});const Ah={},wh={category:{"/":{path:"/category/",map:{动效:{path:"/category/%E5%8A%A8%E6%95%88/",keys:["v-23ce3816"]},CSS基础:{path:"/category/css%E5%9F%BA%E7%A1%80/",keys:["v-7a7e1996","v-3006fe90","v-15a85434","v-65a77d50","v-41b5b0bc","v-2ff96c77"]},CSS布局:{path:"/category/css%E5%B8%83%E5%B1%80/",keys:["v-21eed46d","v-720c3b00","v-4c4838f4","v-47d8203e","v-f50e88c6","v-7d830ca2","v-4d050f5a","v-61734615"]},Canvas:{path:"/category/canvas/",keys:["v-ffa7a9c8","v-29164ffb","v-d93841de","v-dd57719a","v-45bae330","v-fc72bcde","v-9f4befce","v-ff8bc21e","v-6b104240","v-46431f48"]},SVG:{path:"/category/svg/",keys:["v-7ee4b871","v-30557de4","v-4c6a57cf","v-2088aab7"]},JavaScript:{path:"/category/javascript/",keys:["v-c21536aa"]}}}},tag:{"/":{path:"/tag/",map:{动画:{path:"/tag/%E5%8A%A8%E7%94%BB/",keys:["v-fc72bcde","v-23ce3816","v-30557de4","v-4c6a57cf"]},CSS:{path:"/tag/css/",keys:["v-7a7e1996","v-3006fe90","v-15a85434","v-65a77d50","v-41b5b0bc","v-2ff96c77","v-21eed46d","v-720c3b00","v-4c4838f4","v-47d8203e","v-f50e88c6","v-7d830ca2","v-4d050f5a","v-61734615"]},Flex:{path:"/tag/flex/",keys:["v-21eed46d"]},Grid:{path:"/tag/grid/",keys:["v-720c3b00"]},Canvas:{path:"/tag/canvas/",keys:["v-ffa7a9c8","v-29164ffb","v-d93841de","v-dd57719a","v-45bae330","v-fc72bcde","v-9f4befce","v-ff8bc21e","v-6b104240","v-46431f48"]},SVG:{path:"/tag/svg/",keys:["v-7ee4b871","v-30557de4","v-4c6a57cf","v-2088aab7"]},SMIL:{path:"/tag/smil/",keys:["v-7ee4b871"]},网页截屏:{path:"/tag/%E7%BD%91%E9%A1%B5%E6%88%AA%E5%B1%8F/",keys:["v-c21536aa"]}}}}},Sh={article:{"/":{path:"/article/",keys:["v-1e92ab56","v-43efc7e4","v-0e378c3a","v-6be214f8","v-a3cd6e62","v-f914a298","v-15506043","v-cc16ae08","v-1671a938","v-7bd0135a","v-ffa7a9c8","v-29164ffb","v-d93841de","v-dd57719a","v-45bae330","v-fc72bcde","v-9f4befce","v-ff8bc21e","v-6b104240","v-46431f48","v-34f1796f","v-35e7f165","v-c21536aa","v-3880926b","v-ea97c948","v-78d4e833","v-0da3b39c","v-58af1b76","v-6435cc7a","v-48f60179","v-089c79e0","v-3d17b6aa","v-76290d96","v-2aedea04","v-7cbcdbc6","v-c2792460","v-406b4113","v-3dad0466","v-1aa3ff6c","v-bd32a61e","v-0a3ae346","v-5e930d8a","v-63a47f03","v-1c65c6c7","v-35eb2514","v-20bf9dc0","v-43809fe2","v-26f7fea7","v-23ce3816","v-50268bbe","v-7a7e1996","v-3006fe90","v-15a85434","v-65a77d50","v-41b5b0bc","v-2ff96c77","v-21eed46d","v-720c3b00","v-4c4838f4","v-47d8203e","v-f50e88c6","v-7d830ca2","v-4d050f5a","v-61734615","v-57ec9a83","v-5eab4c22","v-7094c4e3","v-7ee4b871","v-30557de4","v-4c6a57cf","v-2088aab7","v-d6e951ee","v-3628e31a","v-fee2cd06","v-1d90551e","v-8d988142","v-655a227a","v-15ea3110","v-37215e23","v-2e3c4fca","v-69bed66c","v-697eefb9","v-1fa12809","v-38550274","v-c29ddc06","v-20a2080e","v-6e901b6a","v-a3e5affa","v-5d611e5e","v-d59d1c2c","v-1dca019c","v-0b82ffbb","v-55437d44","v-38deb022","v-094754f4","v-21191fa2","v-91bf567e","v-eae5c6c8","v-02b4b2d4","v-639279dd","v-612d55f6","v-2d09c55a","v-184f4da6","v-fa355bca","v-c8ef6000","v-23c53e51","v-2b29f11e","v-0886bc3a","v-21abf927","v-43526187","v-7bd5b2a4","v-b3116612","v-4391364e","v-62e5be3a","v-673a6bc7","v-8ea04c9c","v-ba4fd208","v-4caddbf2","v-44f61baf","v-257e2e18","v-2e35194d","v-689800b5","v-7350df02","v-7c6b1182","v-c89b30e6","v-69172050","v-1c82787f","v-10930fde","v-976b51c4","v-0052c16d","v-7a0cb75d","v-1b67107a","v-1fdad470","v-6167e984","v-bfb62730","v-151a966e","v-5c93f7ea","v-670514ca","v-59cac0a5","v-0871403a","v-2c988428","v-41461593","v-636aaf48","v-4e11db22","v-36637eec","v-99865ade","v-1c4c4ee8","v-71a020ac","v-3dc6ebba","v-833597ac","v-62424824","v-55612a68","v-0d70097e","v-030d03ee","v-65722b2c","v-446036c2","v-68bd4d46","v-287f093c","v-5886c4c8","v-7a9286be","v-0018d32b","v-78ee3839","v-3368bed0","v-46e62e58","v-378ddb9a","v-74eb89d7","v-1bef6390","v-5c9b76e6","v-072550d3","v-17a5c29a","v-393169d8","v-52e16bf2","v-696c11e4","v-034a88ef","v-65ab3d71","v-3d99be36","v-2595cd5b","v-5a3976f8","v-426d051c","v-04f29fb0","v-55ffc80d","v-61469c82","v-511dd236","v-6db912e3","v-5db1d7ae","v-8fe351e0","v-6f01d847","v-3a2ef9ba","v-58a23187","v-371374c0","v-4f490448","v-20d07a24","v-57ee0de7","v-55793d7f","v-112de4bc","v-e97b0c7e","v-37d71f2e","v-f257debe","v-a9d76734","v-acba98f4","v-d15facf0","v-47ce4e58","v-09431e95","v-19bb5375","v-0cb8d7e7","v-e73dad02","v-5aadedb4","v-23baba10","v-b1ed33b8","v-4cfafc7b","v-64a7aa10","v-2f2b981f","v-3d3ea028","v-20ad8c03"]}},star:{"/":{path:"/star/",keys:[]}},timeline:{"/":{path:"/timeline/",keys:["v-1e92ab56","v-43efc7e4","v-0e378c3a","v-6be214f8","v-a3cd6e62","v-f914a298","v-15506043","v-cc16ae08","v-1671a938","v-7bd0135a","v-ffa7a9c8","v-29164ffb","v-d93841de","v-dd57719a","v-45bae330","v-fc72bcde","v-9f4befce","v-ff8bc21e","v-6b104240","v-46431f48","v-34f1796f","v-35e7f165","v-c21536aa","v-3880926b","v-ea97c948","v-78d4e833","v-0da3b39c","v-58af1b76","v-6435cc7a","v-48f60179","v-089c79e0","v-3d17b6aa","v-76290d96","v-2aedea04","v-7cbcdbc6","v-c2792460","v-406b4113","v-3dad0466","v-1aa3ff6c","v-bd32a61e","v-0a3ae346","v-5e930d8a","v-63a47f03","v-1c65c6c7","v-35eb2514","v-20bf9dc0","v-43809fe2","v-26f7fea7","v-23ce3816","v-50268bbe","v-7a7e1996","v-3006fe90","v-15a85434","v-65a77d50","v-41b5b0bc","v-2ff96c77","v-21eed46d","v-720c3b00","v-4c4838f4","v-47d8203e","v-f50e88c6","v-7d830ca2","v-4d050f5a","v-61734615","v-57ec9a83","v-5eab4c22","v-7094c4e3","v-7ee4b871","v-30557de4","v-4c6a57cf","v-2088aab7","v-d6e951ee","v-3628e31a","v-fee2cd06","v-1d90551e","v-8d988142","v-655a227a","v-15ea3110","v-37215e23","v-2e3c4fca","v-69bed66c","v-697eefb9","v-1fa12809","v-38550274","v-c29ddc06","v-20a2080e","v-6e901b6a","v-a3e5affa","v-5d611e5e","v-d59d1c2c","v-1dca019c","v-0b82ffbb","v-55437d44","v-38deb022","v-094754f4","v-21191fa2","v-91bf567e","v-eae5c6c8","v-02b4b2d4","v-639279dd","v-612d55f6","v-2d09c55a","v-184f4da6","v-fa355bca","v-c8ef6000","v-23c53e51","v-2b29f11e","v-0886bc3a","v-21abf927","v-43526187","v-7bd5b2a4","v-b3116612","v-4391364e","v-62e5be3a","v-673a6bc7","v-8ea04c9c","v-ba4fd208","v-4caddbf2","v-44f61baf","v-257e2e18","v-2e35194d","v-689800b5","v-7350df02","v-7c6b1182","v-c89b30e6","v-69172050","v-1c82787f","v-10930fde","v-976b51c4","v-0052c16d","v-7a0cb75d","v-1b67107a","v-1fdad470","v-6167e984","v-bfb62730","v-151a966e","v-5c93f7ea","v-670514ca","v-59cac0a5","v-0871403a","v-2c988428","v-41461593","v-636aaf48","v-4e11db22","v-36637eec","v-99865ade","v-1c4c4ee8","v-71a020ac","v-3dc6ebba","v-833597ac","v-62424824","v-55612a68","v-0d70097e","v-030d03ee","v-65722b2c","v-446036c2","v-68bd4d46","v-287f093c","v-5886c4c8","v-7a9286be","v-0018d32b","v-78ee3839","v-3368bed0","v-46e62e58","v-378ddb9a","v-74eb89d7","v-1bef6390","v-5c9b76e6","v-072550d3","v-17a5c29a","v-393169d8","v-52e16bf2","v-696c11e4","v-034a88ef","v-65ab3d71","v-3d99be36","v-2595cd5b","v-5a3976f8","v-426d051c","v-04f29fb0","v-55ffc80d","v-61469c82","v-511dd236","v-6db912e3","v-5db1d7ae","v-8fe351e0","v-6f01d847","v-3a2ef9ba","v-58a23187","v-371374c0","v-4f490448","v-20d07a24","v-57ee0de7","v-55793d7f","v-112de4bc","v-e97b0c7e","v-37d71f2e","v-f257debe","v-a9d76734","v-acba98f4","v-d15facf0","v-47ce4e58","v-09431e95","v-19bb5375","v-0cb8d7e7","v-e73dad02","v-5aadedb4","v-23baba10","v-b1ed33b8","v-4cfafc7b","v-64a7aa10","v-2f2b981f","v-3d3ea028","v-20ad8c03"]}}},el=U(wh),lu=(n="")=>{const s=vn(),a=qn(),e=Bs();return w(()=>{var r;const t=n||((r=_n().value.blog)==null?void 0:r.key)||"";if(!t)return console.warn("useBlogCategory: key not found"),{path:"/",map:{}};const o=a.getRoutes();if(!el.value[t])throw new Error(`useBlogCategory: key ${t} is invalid`);const p=el.value[t][e.value],l={path:p.path,map:{}};for(const i in p.map){const d=p.map[i];l.map[i]={path:d.path,items:[]};for(const v of d.keys){const k=o.find(({name:m})=>m===v);if(k){const m=Ja(a,k.path);l.map[i].items.push({path:m.path,info:m.meta})}}s.value.path===d.path&&(l.currentItems=l.map[i].items)}return l})},tl=U(Sh),Tt=(n="")=>{const s=qn(),a=Bs();return w(()=>{var l;const e=n||((l=_n().value.blog)==null?void 0:l.key)||"";if(!e)return console.warn("useBlogType: key not found"),{path:"/",items:[]};if(!tl.value[e])throw new Error(`useBlogType: key ${n} is invalid`);const t=s.getRoutes(),o=tl.value[e][a.value],p={path:o.path,items:[]};for(const r of o.keys){const i=t.find(({name:d})=>d===r);if(i){const d=Ja(s,i.path);p.items.push({path:d.path,info:d.meta})}}return p})};var Rh=[];const iu=Symbol.for("categoryMap"),xe=()=>{const n=dn(iu);if(!n)throw new Error("useCategoryMap() is called without provider.");return n},Bh=()=>{const n=lu("category");is(iu,n)},Le=()=>{const n=ga(),s=ln();return w(()=>({...n.value.blog,...s.value.blog}))},ru=Symbol.for("tagMap"),Oe=()=>{const n=dn(ru);if(!n)throw new Error("useTagMap() is called without provider.");return n},Dh=()=>{const n=lu("tag");is(ru,n)},Th=n=>{const s=ln();return w(()=>{const{[yn.author]:a}=n.value;return a?be(a):a===!1?[]:be(s.value.author,!1)})},Ch=n=>{const s=xe();return w(()=>zi(n.value[yn.category]).map(a=>({name:a,path:s.value.map[a].path})))},xh=n=>{const s=Oe();return w(()=>Gi(n.value[yn.tag]).map(a=>({name:a,path:s.value.map[a].path})))},Lh=n=>w(()=>{const{[yn.date]:s}=n.value;return op(s)}),Oh=n=>{const s=Ua(n,"info"),a=Le(),e=Th(s),t=Ch(s),o=xh(s),p=Lh(s),l=Sr(),r=w(()=>({author:e.value,category:t.value,date:p.value,localizedDate:s.value[yn.localizedDate]||"",tag:o.value,isOriginal:s.value[yn.isOriginal]||!1,readingTime:s.value[yn.readingTime]||null,readingTimeLocale:s.value[yn.readingTime]&&l.value?wr(s.value[yn.readingTime],l.value):null,pageview:n.path})),i=w(()=>a.value.articleInfo);return{info:r,items:i}},uu=Symbol(""),Ie=()=>{const n=dn(uu);if(!n)throw new Error("useArticles() is called without provider.");return n},Ih=()=>{const n=Tt("article");is(uu,n)},du=Symbol(""),yp=()=>{const n=dn(du);if(!n)throw new Error("useStars() is called without provider.");return n},Ph=()=>{const n=Tt("star");is(du,n)},vu=Symbol(""),_p=()=>{const n=dn(vu);if(!n)throw new Error("useTimelines() is called without provider.");return n},Vh=()=>{const n=Tt("timeline"),s=w(()=>{const a=[];return n.value.items.forEach(({info:e,path:t})=>{const o=op(e[yn.date]),p=o==null?void 0:o.getFullYear(),l=o?o.getMonth()+1:null,r=o==null?void 0:o.getDate();p&&l&&r&&((!a[0]||a[0].year!==p)&&a.unshift({year:p,items:[]}),a[0].items.push({date:`${l}/${r}`,info:e,path:t}))}),{...n.value,config:a.reverse()}});is(vu,s)},Fh=()=>{Ih(),Bh(),Ph(),Dh(),Vh()};var Mh=j({name:"SocialMedia",setup(){const n=Le(),s=Xa(),a=w(()=>{const e=n.value.medias;return e?ba(e).map(([t,o])=>({name:t,icon:Ah[t],url:o})):[]});return()=>a.value.length?c("div",{class:"vp-social-medias"},a.value.map(({name:e,icon:t,url:o})=>c("a",{class:"vp-social-media",href:o,rel:"noopener noreferrer",target:"_blank","aria-label":e,...s.value?{}:{"data-balloon-pos":"up"},innerHTML:t}))):null}}),Ap=j({name:"BloggerInfo",setup(){const n=Le(),s=qa(),a=ln(),e=Ie(),t=xe(),o=Oe(),p=_p(),l=De(),r=w(()=>{var k;return n.value.name||((k=be(a.value.author)[0])==null?void 0:k.name)||s.value.title}),i=w(()=>n.value.avatar||a.value.logo),d=w(()=>a.value.blogLocales),v=w(()=>n.value.intro);return()=>{const{article:k,category:m,tag:b,timeline:E}=d.value,S=[[e.value.path,e.value.items.length,k],[t.value.path,us(t.value.map).length,m],[o.value.path,us(o.value.map).length,b],[p.value.path,p.value.items.length,E]];return c("div",{class:"vp-blogger-info",vocab:"https://schema.org/",typeof:"Person"},[c("div",{class:"vp-blogger",...v.value?{style:{cursor:"pointer"},"aria-label":d.value.intro,"data-balloon-pos":"down",role:"link",onClick:()=>l(v.value)}:{}},[i.value?c("img",{class:["vp-blogger-avatar",{round:n.value.roundAvatar}],src:Dn(i.value),property:"image",alt:"Blogger Avatar",loading:"lazy"}):null,r.value?c("div",{class:"vp-blogger-name",property:"name"},r.value):null,n.value.description?c("div",{class:"vp-blogger-description",innerHTML:n.value.description}):null,v.value?c("meta",{property:"url",content:Dn(v.value)}):null]),c("div",{class:"vp-blog-counts"},S.map(([y,B,_])=>c($n,{class:"vp-blog-count",to:y},()=>[c("div",{class:"count"},B),c("div",_)]))),c(Mh)])}}});const wp=()=>c(on,{name:"category"},()=>c("path",{d:"M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z"}));wp.displayName="CategoryIcon";const Sp=()=>c(on,{name:"tag"},()=>c("path",{d:"M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z"}));Sp.displayName="TagIcon";const Rp=()=>c(on,{name:"timeline"},()=>c("path",{d:"M511.997 70.568c-243.797 0-441.429 197.633-441.429 441.435 0 243.797 197.632 441.429 441.43 441.429S953.431 755.8 953.431 512.002c0-243.796-197.637-441.434-441.435-441.434zm150.158 609.093-15.605 15.61c-8.621 8.615-22.596 8.615-31.215 0L472.197 552.126c-4.95-4.944-4.34-14.888-4.34-24.677V247.14c0-12.19 9.882-22.07 22.07-22.07h22.07c12.19 0 22.07 9.882 22.07 22.07v273.218l128.088 128.088c8.62 8.62 8.62 22.595 0 31.215zm0 0"}));Rp.displayName="TimelineIcon";const ku=()=>c(on,{name:"slides"},()=>c("path",{d:"M896 170.667v426.666a85.333 85.333 0 0 1-85.333 85.334h-256v61.184l192.597 115.584-43.861 73.13-148.736-89.173v95.275h-85.334v-95.318l-148.736 89.216-43.861-73.13 192.597-115.627v-61.141h-256A85.333 85.333 0 0 1 128 597.333V170.667H85.333V85.333h853.334v85.334H896zm-682.667 0v426.666h597.334V170.667H213.333zM426.667 512h-85.334V341.333h85.334V512zm128 0h-85.334V256h85.334v256zm128 0h-85.334V384h85.334v128z"}));ku.displayName="SlideIcon";const mu=()=>c(on,{name:"sticky"},()=>[c("path",{d:"m381.3 733.8l-161.9 118c-5.9 4.5-13.2 6.6-20.1 6.6-8.7 0-17.7-3.4-24.3-10-12.2-12.2-13.9-31.3-3.5-45.2l144.5-195.5-113.6-112.9c-11.1-11.1-13.2-28.4-5.5-42 5.5-8.7 52.1-76.4 155.5-51 1.8 0.3 3.5 0.3 5.6 0.7 4.2 0.3 9 0.7 14.2 1.7 21.9 3.5 60.8-13.9 94.5-42.7 32.3-27.5 53.1-59.4 53.1-81.6 0-5.2 0-10.8-0.3-16-0.7-20.8-2.1-52.8 21.5-76.4 28.1-28.1 72.9-30.6 103.9-5.2 0.6 0.3 1 1 1.7 1.7 16.7 16.3 187.5 187.2 189.3 188.9 14.5 14.6 22.9 34.4 22.9 55.3 0 20.8-8 40.2-22.9 54.8-23.7 23.6-56 22.6-77.1 21.6-4.9 0-10.5-0.4-15.7-0.4-20.8 0-45.8 14.6-70.5 41.3-34.3 37.5-55.5 85.8-53.8 107.7 0.7 6.9 2.1 19.1 2.4 20.8 25 101.4-42.7 147.6-50.7 152.8-13.9 8.4-31.6 6.3-42.7-4.8l-112.1-112.2z"})]);mu.displayName="StickyIcon";const Ct=()=>c(on,{name:"article"},()=>c("path",{d:"M853.333 938.667H170.667A42.667 42.667 0 0 1 128 896V128a42.667 42.667 0 0 1 42.667-42.667h682.666A42.667 42.667 0 0 1 896 128v768a42.667 42.667 0 0 1-42.667 42.667zm-42.666-85.334V170.667H213.333v682.666h597.334zM298.667 256h170.666v170.667H298.667V256zm0 256h426.666v85.333H298.667V512zm0 170.667h426.666V768H298.667v-85.333zm256-384h170.666V384H554.667v-85.333z"}));Ct.displayName="ArticleIcon";const fu=()=>c(on,{name:"book"},()=>c("path",{d:"M256 853.333h426.667A85.333 85.333 0 0 0 768 768V256a85.333 85.333 0 0 0-85.333-85.333H469.333a42.667 42.667 0 0 1 0-85.334h213.334A170.667 170.667 0 0 1 853.333 256v512a170.667 170.667 0 0 1-170.666 170.667H213.333A42.667 42.667 0 0 1 170.667 896V128a42.667 42.667 0 0 1 42.666-42.667h128A42.667 42.667 0 0 1 384 128v304.256l61.653-41.088a42.667 42.667 0 0 1 47.36 0l61.654 41.045V256A42.667 42.667 0 0 1 640 256v256a42.667 42.667 0 0 1-66.347 35.499l-104.32-69.547-104.32 69.547A42.667 42.667 0 0 1 298.667 512V170.667H256v682.666z"}));fu.displayName="BookIcon";const hu=()=>c(on,{name:"link"},()=>c("path",{d:"M460.8 584.533c17.067 17.067 17.067 42.667 0 59.734-17.067 17.066-42.667 17.066-59.733 0-85.334-85.334-85.334-217.6 0-302.934L554.667 192C640 110.933 776.533 110.933 857.6 196.267c81.067 81.066 81.067 213.333 0 294.4l-68.267 64c0-34.134-4.266-68.267-17.066-102.4l21.333-21.334c51.2-46.933 55.467-128 4.267-179.2s-128-55.466-179.2-4.266c-4.267 0-4.267 4.266-4.267 4.266L465.067 401.067c-51.2 51.2-51.2 132.266-4.267 183.466m123.733-183.466C601.6 384 627.2 384 644.267 401.067c85.333 85.333 85.333 217.6 0 302.933l-153.6 149.333C405.333 934.4 268.8 934.4 187.733 849.067c-81.066-81.067-81.066-213.334 0-294.4l68.267-64c0 34.133 4.267 72.533 17.067 102.4L251.733 614.4C204.8 665.6 204.8 746.667 256 793.6c51.2 46.933 123.733 46.933 174.933 0l149.334-149.333c51.2-51.2 51.2-128 0-179.2-12.8-17.067-17.067-46.934 4.266-64z"}));hu.displayName="LinkIcon";const bu=()=>c(on,{name:"project"},()=>c("path",{d:"M987.456 425.152H864V295.296a36.48 36.48 0 0 0-36.544-36.544h-360l-134.08-128.256A9.344 9.344 0 0 0 327.04 128H36.48A36.48 36.48 0 0 0 0 164.544v676.608a36.48 36.48 0 0 0 36.544 36.544h797.76a36.672 36.672 0 0 0 33.92-22.848L1021.44 475.52a36.48 36.48 0 0 0-33.92-50.304zM82.304 210.304h215.424l136.64 130.752h347.328v84.096H198.848A36.672 36.672 0 0 0 164.928 448L82.304 652.8V210.304zM808.32 795.456H108.544l118.08-292.608h699.904L808.32 795.52z"}));bu.displayName="ProjectIcon";const gu=()=>c(on,{name:"friend"},()=>c("path",{d:"M860.16 213.333A268.373 268.373 0 0 0 512 186.027a267.52 267.52 0 0 0-348.16 404.48L428.8 855.893a118.613 118.613 0 0 0 166.4 0l264.96-265.386a267.52 267.52 0 0 0 0-377.174zM800 531.627l-264.96 264.96a32.427 32.427 0 0 1-46.08 0L224 530.347a183.04 183.04 0 0 1 0-256 182.187 182.187 0 0 1 256 0 42.667 42.667 0 0 0 60.587 0 182.187 182.187 0 0 1 256 0 183.04 183.04 0 0 1 3.413 256z"}));gu.displayName="FriendIcon";const To=()=>c(on,{name:"slide-down"},()=>c("path",{d:"M108.775 312.23c13.553 0 27.106 3.734 39.153 11.806l375.205 250.338 363.641-252.808c32.587-21.624 76.499-12.83 98.123 19.757 21.685 32.467 12.95 76.56-19.576 98.184l-402.854 278.89c-23.733 15.901-54.694 15.962-78.547.12L69.501 442.097c-32.647-21.685-41.441-65.777-19.817-98.304 13.734-20.54 36.201-31.563 59.09-31.563Z"}));To.displayName="SlideDownIcon";const Eu=()=>c("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",class:"empty-icon",viewBox:"0 0 1024 1024",innerHTML:'<defs><linearGradient id="f" x1="512.342" y1="2266.13" x2="512.342" y2="666.063" gradientUnits="userSpaceOnUse"><stop offset=".919" stop-color="#e6e6e6" stop-opacity="0"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="g" x1="528.912" y1="774" x2="388.088" y2="612" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#e6e6e6" stop-opacity="0"/></linearGradient><linearGradient id="h" x1="213.219" y1="721.704" x2="251.313" y2="683.61" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d7d7d7"/><stop offset=".485" stop-color="#fafafa"/><stop offset="1" stop-color="#fafafa"/></linearGradient><linearGradient id="i" x1="724.813" y1="821.718" x2="768.656" y2="777.876" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fafafa"/></linearGradient><linearGradient id="a" x1="513.493" y1="714.594" x2="471.007" y2="544.188" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#999"/><stop offset="1" stop-color="#ccc"/></linearGradient><linearGradient id="b" x1="440.156" y1="564.031" x2="508.594" y2="495.594" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="l" x1="660.988" y1="754.156" x2="608.637" y2="544.188" xlink:href="#a"/><linearGradient id="m" x1="479.188" y1="774.219" x2="649.782" y2="603.625" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#b3b3b3"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="n" x1="447.121" y1="774.219" x2="394.661" y2="563.813" xlink:href="#a"/><linearGradient id="o" x1="494" y1="597" x2="628" y2="463" xlink:href="#b"/><linearGradient id="d" x1="610.485" y1="604.938" x2="697.298" y2="518.125" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fff"/></linearGradient><linearGradient id="p" x1="457.438" y1="619.25" x2="353.469" y2="619.25" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e6e6e6" stop-opacity="0"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="q" x1="542.734" y1="674.25" x2="615.672" y2="601.313" xlink:href="#b"/><linearGradient id="c" x1="627.933" y1="358.938" x2="685.192" y2="422.531" gradientUnits="userSpaceOnUse"><stop offset=".4" stop-color="#e6e6e6" stop-opacity=".4"/><stop offset=".443" stop-color="#fff"/><stop offset=".6" stop-color="#ccc"/></linearGradient><linearGradient id="r" x1="618.547" y1="422.531" x2="681.547" y2="359.531" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e6e6e6"/><stop offset=".761" stop-color="#fff"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="s" x1="625" y1="441.5" x2="697" y2="369.5" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset=".761" stop-color="#fff"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="t" x1="627.681" y1="361.438" x2="692.257" y2="433.156" xlink:href="#c"/><linearGradient id="u" x1="561.414" y1="735.438" x2="573.149" y2="688.375" xlink:href="#d"/><linearGradient id="v" x1="405" y1="485.875" x2="440" y2="450.875" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fff" stop-opacity=".702"/></linearGradient><linearGradient id="w" x1="404.61" y1="486.906" x2="441.86" y2="449.656" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset=".495" stop-color="#ccc" stop-opacity=".702"/><stop offset=".498" stop-color="#ccc"/><stop offset="1" stop-color="#fff" stop-opacity=".302"/></linearGradient><radialGradient id="e" cx="329.297" cy="647.578" r="8.172" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fafafa"/><stop offset="1.2" stop-color="#e6e6e6"/></radialGradient><radialGradient id="j" cx="802.297" cy="673.578" r="8.172" xlink:href="#e"/><radialGradient id="k" cx="774.844" cy="642.75" r="5.531" xlink:href="#e"/></defs><path d="M512.33 666.07c441.828 0 800 358.18 800 800.03s-358.172 800.02-800 800.02-800-358.18-800-800.02 358.17-800.03 800-800.03z" style="fill:url(#f);fill-rule:evenodd"/><path d="m272 694 242-82 131 119-188 43z" style="fill:url(#g);fill-rule:evenodd"/><path fill="#b3b3b3" fill-rule="evenodd" d="M232.391 723.534a2.4 2.4 0 0 1 2.4 2.4v17.725a2.4 2.4 0 0 1-4.8 0v-17.725a2.4 2.4 0 0 1 2.4-2.4z"/><path d="M232.255 676.559c10.33 0 17.067 15.408 18.7 28.493 1.619 12.942-2.372 23.694-18.7 23.694-16.878 0-20.213-10.733-18.7-23.694 1.633-14.061 8.37-28.493 18.7-28.493z" style="fill:url(#h);fill-rule:evenodd"/><path fill="#b3b3b3" fill-rule="evenodd" d="M745.853 826h.938a2.4 2.4 0 0 1 2.4 2.4v22.238a2.4 2.4 0 0 1-2.4 2.4h-.938a2.4 2.4 0 0 1-2.4-2.4V828.4a2.4 2.4 0 0 1 2.4-2.4z"/><path d="M746.727 830.3c-19.438 0-23.278-9.326-21.541-20.59a34.467 34.467 0 0 1 3.289-10.369 16.628 16.628 0 0 1 0-9.112c2.889-12.327 12.059-20.911 18.356-20.911 6.56 0 15.468 9.1 18.356 20.911a14.589 14.589 0 0 1-.335 9.217 34.36 34.36 0 0 1 3.419 10.264c1.861 11.243-2.735 20.59-21.544 20.59z" style="fill:url(#i);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M328.841 654.562a6.571 6.571 0 0 0-5.2-5.027q-4.107-.952-.034-2.045a6.571 6.571 0 0 0 5.027-5.2q.952-4.109 2.045-.035a6.569 6.569 0 0 0 5.2 5.027q4.109.954.035 2.045a6.569 6.569 0 0 0-5.027 5.2q-.955 4.108-2.046.035z"/><path d="M328.383 653.73a6.567 6.567 0 0 0-5.2-5.027q-4.109-.954-.035-2.045a6.568 6.568 0 0 0 5.027-5.2q.954-4.107 2.046-.034a6.568 6.568 0 0 0 5.2 5.027q4.107.952.035 2.045a6.568 6.568 0 0 0-5.027 5.2q-.954 4.104-2.046.034z" style="fill:url(#e);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M801.841 680.562a6.571 6.571 0 0 0-5.2-5.027q-4.107-.952-.034-2.045a6.571 6.571 0 0 0 5.027-5.2q.952-4.109 2.045-.035a6.569 6.569 0 0 0 5.2 5.027q4.108.954.035 2.045a6.569 6.569 0 0 0-5.027 5.2q-.955 4.108-2.046.035z"/><path d="M801.383 679.73a6.567 6.567 0 0 0-5.2-5.027q-4.108-.954-.035-2.045a6.568 6.568 0 0 0 5.027-5.2q.954-4.107 2.046-.034a6.568 6.568 0 0 0 5.2 5.027q4.107.952.035 2.045a6.568 6.568 0 0 0-5.027 5.2q-.954 4.104-2.046.034z" style="fill:url(#j);fill-rule:evenodd"/><path d="M774.21 646.9a4.446 4.446 0 0 0-3.517-3.4q-2.778-.643-.023-1.383a4.443 4.443 0 0 0 3.4-3.517q.645-2.778 1.383-.023a4.443 4.443 0 0 0 3.517 3.4q2.778.645.023 1.383a4.446 4.446 0 0 0-3.4 3.517q-.645 2.78-1.383.023z" style="fill:url(#k);fill-rule:evenodd"/><path d="m385.6 714.6.158-150.658L598.9 544.174l-.158 150.658z" style="fill:url(#a);fill-rule:evenodd"/><path d="m385.474 564.031 214.763-19.383-36.171-49.067-215.559 17.634z" style="fill:url(#b);fill-rule:evenodd"/><path d="m598.744 694.832.156-150.658 71.975 59.319-.158 150.658z" style="fill:url(#l);fill-rule:evenodd"/><path d="m457.064 774.209.158-150.658 214.691-19.914-.158 150.663z" style="fill:url(#m);fill-rule:evenodd"/><path d="m384.566 714.459.158-150.659 72.5 59.75-.158 150.658z" style="fill:url(#n);fill-rule:evenodd"/><path d="M494 640s75.357-58.4 42-83-38.887 1.663-37 14 53.847 12.465 54-26c.2-49.979 75-125 75-125" style="fill:none;stroke-width:3px;stroke-dasharray:12 6;stroke:url(#o);fill-rule:evenodd"/><path d="m670.275 604.939-72.041-59.9 38.476-26.909 72.86 58.159z" style="fill:url(#d);fill-rule:evenodd"/><path d="m425.5 674.383-72.042-59.9 31.109-50.347 72.86 58.16z" style="fill:url(#p);fill-rule:evenodd"/><path d="m487.918 674.235 214.482-22.57-31.1-50.346-215.309 20.833z" style="fill:url(#q);fill-rule:evenodd"/><path style="fill:#fff;fill-rule:evenodd" d="m697.363 358.927-69.58 62.511-12.035 1.082z"/><path d="m697.363 358.927-69.58 62.511-12.035 1.082z" style="fill:url(#c);fill-rule:evenodd"/><path d="M615.748 422.52 604 413l92.089-53.46" style="fill:url(#r);fill-rule:evenodd"/><path d="m625 432 12 18 60-89" style="fill:url(#s);fill-rule:evenodd"/><path d="m626.98 421.335-2.471 11.828 70.918-71.735" style="fill:#fff;fill-rule:evenodd"/><path d="m626.98 421.335-2.471 11.828 70.918-71.735" style="fill:url(#t);fill-rule:evenodd"/><path d="m494.814 735.44 21.293-2.1v-6.613l-13.4 1.319v-6.965l10.977-1.08v-6.613l-10.977 1.08v-6.084l12.917-1.27v-6.525l-20.808 2.047v32.8zM521 732.863l7.054-.694v-11.241a106.361 106.361 0 0 0-1.014-11.274l.176-.017 2.645 7.586 4.453 11.553 4.32-.425 4.408-12.424 2.733-8.116.177-.018a111.811 111.811 0 0 0-1.014 11.474v11.241l7.185-.707V697l-8.552.841-5.025 14.646c-.618 1.956-1.147 4.08-1.808 6.173l-.22.022c-.617-1.968-1.146-3.987-1.808-5.818l-5.2-13.639-8.508.837v32.8zm37.213-3.661 7.891-.776v-10.889l3.835-.377c6.922-.681 12.961-4.714 12.961-12.517 0-8.111-5.951-10.082-13.181-9.371l-11.504 1.128v32.8zm7.891-17.881v-9.478l3.218-.316c3.792-.373 5.908.565 5.908 3.871 0 3.218-1.852 5.208-5.687 5.585zM594 725.682l7.891-.777v-26.274l8.905-.876v-6.524l-25.657 2.524v6.524l8.861-.871v26.274zm27.991-2.754 7.847-.772v-11.594l9.919-22.18-8.244.811-2.733 7.542c-.925 2.56-1.807 4.939-2.733 7.587l-.176.018c-.926-2.466-1.764-4.676-2.645-7.058l-2.734-7-8.375.824 9.874 20.233v11.594z" style="fill:url(#u);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M408.938 457.309a17.5 17.5 0 0 0 21.374 26.725 17.5 17.5 0 1 1-16.306-30.955 17.442 17.442 0 0 0-5.068 4.23z"/><circle cx="422.5" cy="468.375" r="17.5" style="fill:url(#v)"/><path fill="#ccc" fill-rule="evenodd" d="M391.76 451.5c-2.358 4.419 9.827 15.52 27.215 24.8 15.131 8.071 29.212 12.1 34.166 10.093-4.191 2.772-18.943-1.24-34.86-9.73-17.388-9.275-29.573-20.376-27.215-24.8a2.96 2.96 0 0 1 1.585-1.3 2.606 2.606 0 0 0-.891.937z"/><path d="M418.975 476.29c-17.388-9.275-29.573-20.376-27.215-24.8s18.363-.484 35.751 8.791 29.572 20.376 27.215 24.8-18.364.483-35.751-8.791zm31.634 5.732c1.824-3.42-8.789-12.642-23.7-20.6s-28.486-11.633-30.31-8.213 8.789 12.642 23.7 20.6 28.486 11.633 30.31 8.213zm-36.645-29.008-2.775 1.452.032 1.751 28.637 14.183.266-4.559z" style="fill:url(#w);fill-rule:evenodd"/><g class="people"><path style="fill:#f8cfad;fill-rule:evenodd" d="m612.131 676.5 1.362 3.532 3.255-2.324-1.361-3.532zM629.131 665.5l1.362 3.532 3.255-2.324-1.361-3.532z"/><path style="fill:#141a33;fill-rule:evenodd" d="m617.764 678.184-3.162-.078a11.028 11.028 0 0 0-1.034 3.454c-.258 2.006-1.177 5-.449 5.367 1.5 2.659 4.118-.215 4.118-.215s2.187-2.848 1.925-5.265c-.106-.973-1.181-1.869-1.398-3.263zM633.781 665.855l3.019.945a11.008 11.008 0 0 1-.137 3.6c-.4 1.981-.179 4.166-.986 4.277-2.283 2.03-3.827-1.533-3.827-1.533s-1.473-2.456-.444-4.659c.412-.88 1.718-1.385 2.375-2.63z"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M599.935 592.534s10.293 9.761 11.95 7.564 3.536-3.463-6.758-13.65z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M611.3 596.361c1.674-1.105 11.5 7.048 14.5 11.774s-12.705-4.36-14.632-6.776-1.54-3.893.132-4.998z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M621.815 607.988s1.809 2.549 2.433 1.756 2.475-1.064 2.449-1.138.1-.819 1.288-2.331-3.8-3.632-5.81-.494a2.556 2.556 0 0 0-.36 2.207z"/><path fill="#232c57" fill-rule="evenodd" d="M598 617s14.968-5.618 17 7a150.235 150.235 0 0 1 2 22s12.666 11.836 16 19c0 0-4.753-1.629-4 2 0 0-18.132-14.647-19-19s-9.148-18.716-12-31z"/><path d="M589 622s14.968-5.618 17 7a150.235 150.235 0 0 1 2 22s4.666 17.836 8 25c0 0-4.753-1.629-4 2 0 0-10.132-20.647-11-25s-9.148-18.716-12-31z" style="fill:#292966;fill-rule:evenodd"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M585.626 597.7s-10.292 9.761-11.95 7.563-3.536-3.463 6.758-13.65z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M574.259 601.529c-1.675-1.105-11.5 7.049-14.5 11.774s12.7-4.36 14.631-6.775 1.543-3.894-.131-4.999z"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M591.715 577.752s-.606 1.681 1.48 3.716-3.615 5.307-4.645 2.85-.48-2.716-.48-2.716z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M583.527 574.123c-.839 1.043.491 3.873 1.453 5.449s2.749 2.833 3.364 2.428 4.088-2.657 4-4-.228-3.4-.228-3.4 2.562-1.641 2.154-2.916-2.916-.154-2.916-.154a15.853 15.853 0 0 0-.227-2.224c-.189-.929-6.887-1.445-7.827 2.6s.558 1.805.227 2.217z"/><path fill="#232c57" fill-rule="evenodd" d="M584.227 567.758c2.1-.885 7.2-3.684 10.125.318s.842 4.385.989 5.294-1.894 5.69-1.341 6.63-3.865.8-4.657-1.179-2.844-.539-2.227-1.224-1.3-4.456-2.916-2.154a9.252 9.252 0 0 0 .309-1.38c-.115.192.259-3.257-.673-1.32s-2.1 1.037-3.069.762-1.8-1.118-1.071-1.689c.023-.016 2.436-3.172 4.531-4.058z"/><path d="M589 585c-2.584-.47-10.055.362-13 13 0 0 1.9 3.349 5 4s6 21 6 21 24.016 11.06 27-3c-.07-13.826-8-21-8-21s5.829-3.2 5-6-8.016-10.153-11-10-6 0-6 0-2.416 2.47-5 2z" style="fill:#f6bb07;fill-rule:evenodd"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M563.284 612.581s-.986 2.965-1.814 2.389-2.678-.3-2.675-.374-.333-.755-1.912-1.854 2.577-4.583 5.414-2.167a2.551 2.551 0 0 1 .987 2.006z"/></g>'});Eu.displayName="EmptyIcon";const yu=()=>c(on,{name:"lock"},()=>c("path",{d:"M787.168 952.268H236.832c-30.395 0-55.033-24.638-55.033-55.033V429.45c0-30.395 24.638-55.034 55.033-55.034h82.55V264.35c0-106.38 86.238-192.618 192.618-192.618S704.618 157.97 704.618 264.35v110.066h82.55c30.395 0 55.033 24.639 55.033 55.034v467.785c0 30.395-24.639 55.033-55.033 55.033zM484.483 672.046v115.122h55.034V672.046c31.99-11.373 55.033-41.605 55.033-77.496 0-45.592-36.958-82.55-82.55-82.55s-82.55 36.958-82.55 82.55c0 35.89 23.042 66.123 55.033 77.496zM622.067 264.35c0-60.788-49.28-110.067-110.067-110.067s-110.067 49.28-110.067 110.067v110.066h220.135V264.35z"}));yu.displayName="LockIcon";var jh=j({name:"ArticleItem",props:{info:{type:Object,required:!0},path:{type:String,required:!0}},slots:Object,setup(n,{slots:s}){const a=Ua(n,"info"),{info:e,items:t}=Oh(n);return()=>{var k,m,b;const{[yn.title]:o,[yn.type]:p,[yn.isEncrypted]:l=!1,[yn.cover]:r,[yn.excerpt]:i,[yn.sticky]:d}=a.value,v=e.value;return c("div",{class:"vp-article-wrapper"},c("article",{class:"vp-article-item",vocab:"https://schema.org/",typeof:"Article"},[((k=s.cover)==null?void 0:k.call(s,{cover:r}))||(r?[c("img",{class:"vp-article-cover",src:Dn(r),loading:"lazy"}),c("meta",{property:"image",content:Dn(r)})]:[]),d?c(mu):null,c($n,{to:n.path},()=>{var E;return((E=s.title)==null?void 0:E.call(s,{title:o,isEncrypted:l,type:p}))||c("header",{class:"vp-article-title"},[l?c(yu):null,p===Lr.slide?c(ku):null,c("span",{property:"headline"},o)])}),((m=s.excerpt)==null?void 0:m.call(s,{excerpt:i}))||(i?c("div",{class:"vp-article-excerpt",innerHTML:i}):null),c("hr",{class:"vp-article-hr"}),((b=s.info)==null?void 0:b.call(s,{info:v}))||c(su,{info:v,...t.value?{items:t.value}:{}})]))}}}),Nh=j({name:"Pagination",props:{total:{type:Number,default:10},perPage:{type:Number,default:10},current:{type:Number,default:1}},emits:["updateCurrentPage"],setup(n,{emit:s}){let a;const e=ln(),t=U(""),o=w(()=>e.value.paginationLocales),p=w(()=>Math.ceil(n.total/n.perPage)),l=w(()=>!!p.value&&p.value!==1),r=w(()=>p.value<7?!1:n.current>4),i=w(()=>p.value<7?!1:n.current<p.value-3),d=w(()=>{const{current:m}=n;let b=1,E=p.value;const S=[];p.value>=7&&(m<=4&&m<p.value-3?(b=1,E=5):m>4&&m>=p.value-3?(E=p.value,b=p.value-4):p.value>7&&(b=m-2,E=m+2));for(let y=b;y<=E;y++)S.push(y);return S}),v=m=>s("updateCurrentPage",m),k=m=>{const b=parseInt(m);b<=p.value&&b>0?v(b):a.pop(`<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M64 512a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#FA5151"/><path d="m557.3 512 113.1-113.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L512 466.7 398.9 353.6c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L466.7 512 353.6 625.1c-12.5 12.5-12.5 32.8 0 45.3 6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4L512 557.3l113.1 113.1c6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4c12.5-12.5 12.5-32.8 0-45.3L557.3 512z" fill="#FFF"/></svg>${o.value.errorText.replace(/\$page/g,p.value.toString())}`)};return bn(()=>{a=new e1}),()=>c("div",{class:"vp-pagination"},l.value?c("nav",{class:"vp-pagination-list"},[c("div",{class:"vp-pagination-number "},[n.current>1?c("div",{class:"prev",role:"navigation",unselectable:"on",onClick:()=>v(n.current-1)},o.value.prev):null,r.value?[c("div",{role:"navigation",onClick:()=>v(1)},1),c("div",{class:"ellipsis"},"...")]:null,d.value.map(m=>c("div",{key:m,class:{active:n.current===m},role:"navigation",onClick:()=>v(m)},m)),i.value?[c("div",{class:"ellipsis"},"..."),c("div",{role:"navigation",onClick:()=>v(p.value)},p.value)]:null,n.current<p.value?c("div",{class:"next",role:"navigation",unselectable:"on",onClick:()=>v(n.current+1)},o.value.next):null]),c("div",{class:"vp-pagination-nav"},[c("label",{for:"navigation-text"},`${o.value.navigate}: `),c("input",{id:"navigation-text",value:t.value,onInput:({target:m})=>{t.value=m.value},onKeydown:m=>{m.key==="Enter"&&(m.preventDefault(),k(t.value))}}),c("button",{class:"vp-pagination-button",role:"navigation",title:o.value.action,onClick:()=>k(t.value)},o.value.action)])]):[])}}),Bp=j({name:"ArticleList",props:{items:{type:Array,default:()=>[]}},setup(n){const s=Ds(),a=qn(),e=Le(),t=U(1),o=w(()=>e.value.articlePerPage||10),p=w(()=>n.items.slice((t.value-1)*o.value,t.value*o.value)),l=async r=>{t.value=r;const i={...s.query};!(i.page===r.toString()||r===1&&!i.page)&&(r===1?delete i.page:i.page=r.toString(),await a.push({path:s.path,query:i}))};return bn(()=>{const{page:r}=s.query;console.log("mounted"),l(r?Number(r):1),cn(t,()=>{const i=document.querySelector("#article-list").getBoundingClientRect().top+window.scrollY;setTimeout(()=>{window.scrollTo(0,i)},100)})}),()=>c("div",{id:"article-list",class:"vp-article-list",role:"feed"},p.value.length?[...p.value.map(({info:r,path:i},d)=>c(hn,{appear:!0,delay:d*.04},()=>c(jh,{key:i,info:r,path:i}))),c(Nh,{current:t.value,perPage:o.value,total:n.items.length,onUpdateCurrentPage:l})]:c(Eu))}}),_u=j({name:"CategoryList",setup(){const n=vn(),s=xe();return()=>c("ul",{class:"vp-category-list"},ba(s.value.map).sort(([,a],[,e])=>e.items.length-a.items.length).map(([a,{path:e,items:t}])=>c("li",{class:["vp-category",`vp-category${Rt(a,9)}`,{active:e===n.value.path}]},c($n,{to:e},()=>[a,c("span",{class:"count"},t.length)]))))}}),Au=j({name:"TagList",setup(){const n=_n(),s=Oe(),a=e=>{var t;return e===((t=n.value.blog)==null?void 0:t.name)};return()=>c("ul",{class:"tag-list-wrapper"},ba(s.value.map).sort(([,e],[,t])=>t.items.length-e.items.length).map(([e,{path:t,items:o}])=>c("li",{class:["tag",`tag${Rt(e,9)}`,{active:a(e)}]},c($n,{to:t},()=>[e,c("span",{class:"tag-num"},o.length)]))))}}),Hh=j({name:"TimelineList",setup(){const n=ln(),s=_p(),a=De(),e=w(()=>n.value.blogLocales.timeline);return()=>c("div",{class:"timeline-list-wrapper"},[c("div",{class:"timeline-list-title",onClick:()=>a(s.value.path)},[c(Rp),c("span",{class:"num"},s.value.items.length),e.value]),c("hr"),c("div",{class:"timeline-content"},c("ul",{class:"timeline-list"},s.value.config.map(({year:t,items:o},p)=>c(hn,{appear:!0,delay:.08*(p+1)},()=>c("li",[c("h3",{class:"timeline-year"},t),c("ul",{class:"timeline-year-wrapper"},o.map(({date:l,info:r,path:i})=>c("li",{class:"timeline-item"},[c("span",{class:"timeline-date"},l),c($n,{class:"timeline-title",to:i},()=>r[yn.title])])))])))))])}});const $h={article:Ct,category:wp,tag:Sp,timeline:Rp};var wu=j({name:"InfoList",setup(){const n=ln(),s=Ie(),a=xe(),e=w(()=>us(a.value.map).length),t=yp(),o=Oe(),p=w(()=>us(o.value.map).length),l=De(),r=U("article"),i=w(()=>n.value.blogLocales);return()=>c("div",{class:"vp-blog-infos"},[c("div",{class:"vp-blog-type-switcher"},ba($h).map(([d,v])=>c("button",{type:"button",class:"vp-blog-type-button",onClick:()=>{r.value=d}},c("div",{class:["icon-wrapper",{active:r.value===d}],"aria-label":i.value[d],"data-balloon-pos":"up"},c(v))))),c(hn,()=>r.value==="article"?c("div",{class:"vp-star-article-wrapper"},[c("div",{class:"title",onClick:()=>l(s.value.path)},[c(Ct),c("span",{class:"num"},s.value.items.length),i.value.article]),c("hr"),t.value.items.length?c("ul",{class:"vp-star-articles"},t.value.items.map(({info:d,path:v},k)=>c(hn,{appear:!0,delay:.08*(k+1)},()=>c("li",{class:"vp-star-article"},c($n,{to:v},()=>d[yn.title]))))):c("div",{class:"vp-star-article-empty"},i.value.empty.replace("$text",i.value.star))]):r.value==="category"?c("div",{class:"vp-category-wrapper"},[e.value?[c("div",{class:"title",onClick:()=>l(a.value.path)},[c(wp),c("span",{class:"num"},e.value),i.value.category]),c("hr"),c(hn,{delay:.04},()=>c(_u))]:c("div",{class:"vp-category-empty"},i.value.empty.replace("$text",i.value.category))]):r.value==="tag"?c("div",{class:"vp-tag-wrapper"},[p.value?[c("div",{class:"title",onClick:()=>l(o.value.path)},[c(Sp),c("span",{class:"num"},p.value),i.value.tag]),c("hr"),c(hn,{delay:.04},()=>c(Au))]:c("div",{class:"vp-tag-empty"},i.value.empty.replace("$text",i.value.tag))]):c(hn,()=>c(Hh)))])}}),xt=j({name:"BlogWrapper",slots:Object,setup(n,{slots:s}){const{isMobile:a}=Te();return()=>[c(Ep),c(bp,{noSidebar:!0,noToc:!0},{default:()=>s.default(),navScreenBottom:()=>c(Ap),...a.value?{sidebar:()=>c(wu)}:{}})]}});const Su=()=>c("aside",{class:"vp-blog-info-wrapper"},[c(hn,()=>c(Ap)),c(hn,{delay:.04},()=>c(wu))]);Su.displayName="InfoPanel";var Lt=Su,Jh=j({name:"BlogPage",setup(){const n=vn(),s=_n(),a=xe(),e=Oe();return()=>{const{key:t="",name:o=""}=s.value.blog||{},p=o?t==="category"?a.value.map[o].items:t==="tag"?e.value.map[o].items:[]:[];return c(xt,()=>c("div",{class:"vp-page vp-blog"},c("div",{class:"blog-page-wrapper"},[c("main",{id:"main-content",class:"vp-blog-main"},[c(hn,()=>t==="category"?c(_u):t==="tag"?c(Au):null),o?c(hn,{appear:!0,delay:.24},()=>c(Bp,{key:n.value.path,items:p})):null]),c(hn,{delay:.16},()=>c(Lt,{key:"blog"}))])))}}});const Wh="//theme-hope-assets.vuejs.press/hero/default.jpg";var zh=j({name:"BlogHero",slots:Object,setup(n,{slots:s}){const a=_n(),e=qa(),t=Ln(),o=w(()=>a.value.heroFullScreen??!1),p=w(()=>{const{heroText:r,heroImage:i,heroImageDark:d,heroAlt:v,heroImageStyle:k,tagline:m}=a.value;return{text:r??e.value.title??"Hello",image:i?Dn(i):null,imageDark:d?Dn(d):null,heroStyle:k,alt:v||r||"hero image",tagline:m??"",isFullScreen:o.value}}),l=w(()=>{const{bgImage:r,bgImageDark:i,bgImageStyle:d}=a.value;return{image:rn(r)?Dn(r):r===!1?null:Wh,imageDark:rn(i)?Dn(i):null,bgStyle:d,isFullScreen:o.value}});return()=>{var r,i;return a.value.hero===!1?null:c("div",{ref:t,class:["vp-blog-hero",{fullscreen:o.value,"no-bg":!l.value.image}]},[((r=s.heroBg)==null?void 0:r.call(s,l.value))||[l.value.image?c("div",{class:["vp-blog-mask",{light:l.value.imageDark}],style:[{background:`url(${l.value.image}) center/cover no-repeat`},l.value.bgStyle]}):null,l.value.imageDark?c("div",{class:"vp-blog-mask dark",style:[{background:`url(${l.value.imageDark}) center/cover no-repeat`},l.value.bgStyle]}):null],((i=s.heroInfo)==null?void 0:i.call(s,p.value))||[c(hn,{appear:!0,type:"group",delay:.04},()=>[p.value.image?c("img",{key:"light",class:["vp-blog-hero-image",{light:p.value.imageDark}],style:p.value.heroStyle,src:p.value.image,alt:p.value.alt}):null,p.value.imageDark?c("img",{key:"dark",class:"vp-blog-hero-image dark",style:p.value.heroStyle,src:p.value.imageDark,alt:p.value.alt}):null]),c(hn,{appear:!0,delay:.08},()=>p.value.text?c("h1",{class:"vp-blog-hero-title"},p.value.text):null),c(hn,{appear:!0,delay:.12},()=>p.value.tagline?c("p",{class:"vp-blog-hero-description",innerHTML:p.value.tagline}):null)],p.value.isFullScreen?c("button",{type:"button",class:"slide-down-button",onClick:()=>{window.scrollTo({top:t.value.clientHeight,behavior:"smooth"})}},[c(To),c(To)]):null])}}});const Gh=["link","article","book","project","friend"];var Uh=j({name:"ProjectPanel",components:{ArticleIcon:Ct,BookIcon:fu,FriendIcon:gu,LinkIcon:hu,ProjectIcon:bu},props:{items:{type:Array,required:!0}},setup(n){const s=Xa(),a=De(),e=(t="",o="icon")=>Gh.includes(t)?c(as(`${t}-icon`)):ha(t)?c("img",{class:"vp-project-image",src:t,alt:o}):Se(t)?c("img",{class:"vp-project-image",src:Dn(t),alt:o}):c(Un,{icon:t});return()=>c("div",{class:"vp-project-panel"},n.items.map(({icon:t,link:o,name:p,desc:l},r)=>c("div",{class:["vp-project-card",{[`project${r%9}`]:!s.value}],onClick:()=>a(o)},[e(t,p),c("div",{class:"vp-project-name"},p),c("div",{class:"vp-project-desc"},l)])))}}),qh=j({name:"BlogHome",setup(){const n=Ie(),s=_n(),a=w(()=>s.value.projects??[]);return()=>c("div",{class:"vp-page vp-blog"},[c(zh),c("div",{class:"blog-page-wrapper"},[c("main",{id:"main-content",class:"vp-blog-main"},[a.value.length?c(hn,{appear:!0,delay:.16},()=>c(Uh,{items:a.value})):null,c(hn,{appear:!0,delay:.24},()=>c(Bp,{items:n.value.items}))]),c(hn,{appear:!0,delay:.16},()=>c(Lt,{key:"blog"}))]),c(hn,{appear:!0,delay:.28},()=>c(gp))])}});const Ru=()=>c(xt,()=>c(qh));Ru.displayName="BlogHomeLayout";var Kh=Ru,Xh=j({name:"ArticleType",setup(){const n=vn(),s=Bs(),a=ln(),e=Ie(),t=yp(),o=w(()=>{const p=a.value.blogLocales;return[{text:p.all,path:e.value.path},{text:p.star,path:t.value.path},...Rh.map(({key:l,path:r})=>({text:p[l],path:r.replace(/^\//,s.value)}))]});return()=>c("ul",{class:"vp-article-type-wrapper"},o.value.map(p=>c("li",{class:["vp-article-type",{active:p.path===n.value.path}]},c($n,{to:p.path},()=>p.text))))}}),Yh=j({name:"BlogPage",setup(){const n=Tt(),s=_n(),a=vn(),e=Ie(),t=yp(),o=w(()=>{const{key:p="",type:l}=s.value.blog||{};return p==="star"?t.value.items:l==="type"&&p?n.value.items:e.value.items});return()=>c(xt,()=>c("div",{class:"vp-page vp-blog"},c("div",{class:"blog-page-wrapper"},[c("main",{id:"main-content",class:"vp-blog-main"},[c(hn,()=>c(Xh)),c(hn,{appear:!0,delay:.24},()=>c(Bp,{key:a.value.path,items:o.value}))]),c(hn,{delay:.16},()=>c(Lt,{key:"blog"}))])))}}),Zh=j({name:"TimelineItems",setup(){const n=Le(),s=ln(),a=_p(),e=w(()=>n.value.timeline||s.value.blogLocales.timelineTitle),t=w(()=>a.value.config.map(({year:o})=>({title:o.toString(),level:2,slug:o.toString(),children:[]})));return()=>c("div",{class:"timeline-wrapper"},c("ul",{class:"timeline-content"},[c(hn,()=>c("li",{class:"motto"},e.value)),c(au,{items:t.value}),a.value.config.map(({year:o,items:p},l)=>c(hn,{appear:!0,delay:.08*(l+1),type:"group"},()=>[c("h3",{key:"title",id:o,class:"timeline-year-title"},c("span",o)),c("li",{key:"content",class:"timeline-year-list"},[c("ul",{class:"timeline-year-wrapper"},p.map(({date:r,info:i,path:d})=>c("li",{class:"timeline-item"},[c("span",{class:"timeline-date"},r),c($n,{class:"timeline-title",to:d},()=>i[yn.title])])))])]))]))}});const Bu=()=>c(xt,()=>c("div",{class:"vp-page vp-blog"},c("div",{class:"blog-page-wrapper"},[c("main",{id:"main-content",class:"vp-blog-main"},[c(hn,{appear:!0,delay:.24},()=>c(Zh))]),c(hn,{delay:.16},()=>c(Lt,{key:"blog"}))])));Bu.displayName="Timeline";var Qh=Bu;q1(Un);const nb=gs({enhance:({app:n,router:s})=>{const{scrollBehavior:a}=s.options;s.options.scrollBehavior=async(...e)=>(await eu().wait(),a(...e)),_f(n),n.component("HopeIcon",Un),n.component("VPLink",$n),n.component("BloggerInfo",Ap)},setup:()=>{Af(),Bf(),Fh()},layouts:{Layout:Eh,NotFound:_h,BlogCategory:Jh,BlogHome:Kh,BlogType:Yh,Timeline:Qh}}),sb={enhance:({app:n})=>{n.component("animation-live-praise-bubble-canvas-render",f(()=>u(()=>import("./canvas-render-AJBK7gHF.js"),__vite__mapDeps([274,1])))),n.component("animation-live-praise-bubble-css3-render",f(()=>u(()=>import("./css3-render-aNmIe1Ps.js"),__vite__mapDeps([275,1]))))}},ab=()=>c(on,{name:"heading"},()=>c("path",{d:"M250.4 704.6H64V595.4h202.4l26.2-166.6H94V319.6h214.4L352 64h127.8l-43.6 255.4h211.2L691 64h126.2l-43.6 255.4H960v109.2H756.2l-24.6 166.6H930v109.2H717L672 960H545.8l43.6-255.4H376.6L333 960H206.8l43.6-255.4zm168.4-276L394 595.4h211.2l24.6-166.6h-211z"}));ab.displayName="HeadingIcon";const eb=()=>c(on,{name:"heart"},()=>c("path",{d:"M1024 358.156C1024 195.698 892.3 64 729.844 64c-86.362 0-164.03 37.218-217.844 96.49C458.186 101.218 380.518 64 294.156 64 131.698 64 0 195.698 0 358.156 0 444.518 37.218 522.186 96.49 576H96l320 320c32 32 64 64 96 64s64-32 96-64l320-320h-.49c59.272-53.814 96.49-131.482 96.49-217.844zM841.468 481.232 517.49 805.49a2981.962 2981.962 0 0 1-5.49 5.48c-1.96-1.95-3.814-3.802-5.49-5.48L182.532 481.234C147.366 449.306 128 405.596 128 358.156 128 266.538 202.538 192 294.156 192c47.44 0 91.15 19.366 123.076 54.532L512 350.912l94.768-104.378C638.696 211.366 682.404 192 729.844 192 821.462 192 896 266.538 896 358.156c0 47.44-19.368 91.15-54.532 123.076z"}));eb.displayName="HeartIcon";const tb=()=>c(on,{name:"history"},()=>c("path",{d:"M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zm0-896a384 384 0 1 0 384 384 384 384 0 0 0-384-384zm192 448H512a64 64 0 0 1-64-64V320a64 64 0 0 1 128 0v128h128a64 64 0 0 1 0 128z"}));tb.displayName="HistoryIcon";const ob=()=>c(on,{name:"title"},()=>c("path",{d:"M512 256c70.656 0 134.656 28.672 180.992 75.008A254.933 254.933 0 0 1 768 512c0 83.968-41.024 157.888-103.488 204.48C688.96 748.736 704 788.48 704 832c0 105.984-86.016 192-192 192-106.048 0-192-86.016-192-192h128a64 64 0 1 0 128 0 64 64 0 0 0-64-64 255.19 255.19 0 0 1-181.056-75.008A255.403 255.403 0 0 1 256 512c0-83.968 41.024-157.824 103.488-204.544C335.04 275.264 320 235.584 320 192A192 192 0 0 1 512 0c105.984 0 192 85.952 192 192H576a64.021 64.021 0 0 0-128 0c0 35.328 28.672 64 64 64zM384 512c0 70.656 57.344 128 128 128s128-57.344 128-128-57.344-128-128-128-128 57.344-128 128z"}));ob.displayName="TitleIcon";const Dp=()=>c(on,{name:"search"},()=>c("path",{d:"M192 480a256 256 0 1 1 512 0 256 256 0 0 1-512 0m631.776 362.496-143.2-143.168A318.464 318.464 0 0 0 768 480c0-176.736-143.264-320-320-320S128 303.264 128 480s143.264 320 320 320a318.016 318.016 0 0 0 184.16-58.592l146.336 146.368c12.512 12.48 32.768 12.48 45.28 0 12.48-12.512 12.48-32.768 0-45.28"}));Dp.displayName="SearchIcon";const Du=()=>c("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",preserveAspectRatio:"xMidYMid",viewBox:"0 0 100 100"},[c("circle",{cx:"28",cy:"75",r:"11",fill:"currentColor"},c("animate",{attributeName:"fill-opacity",begin:"0s",dur:"1s",keyTimes:"0;0.2;1",repeatCount:"indefinite",values:"0;1;1"})),c("path",{fill:"none",stroke:"#88baf0","stroke-width":"10",d:"M28 47a28 28 0 0 1 28 28"},c("animate",{attributeName:"stroke-opacity",begin:"0.1s",dur:"1s",keyTimes:"0;0.2;1",repeatCount:"indefinite",values:"0;1;1"})),c("path",{fill:"none",stroke:"#88baf0","stroke-width":"10",d:"M28 25a50 50 0 0 1 50 50"},c("animate",{attributeName:"stroke-opacity",begin:"0.2s",dur:"1s",keyTimes:"0;0.2;1",repeatCount:"indefinite",values:"0;1;1"}))]);Du.displayName="LoadingIcon";const Tu=({hint:n})=>c("div",{class:"search-pro-result-wrapper loading"},[c(Du),n]);Tu.displayName="SearchLoading";const pb='<svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>';var cb={},lb={"/":{cancel:"取消",placeholder:"搜索",search:"搜索",searching:"搜索中",defaultTitle:"文档",select:"选择",navigate:"切换",autocomplete:"自动补全",exit:"关闭",history:"搜索历史",emptyHistory:"无搜索历史",emptyResult:"没有找到结果",loading:"正在加载搜索索引..."}},ib={searchDelay:150,suggestDelay:0,queryHistoryCount:5,resultHistoryCount:5,hotKeys:[{key:"k",ctrl:!0},{key:"/",ctrl:!0}],worker:"search-pro.worker.js"};const Tp=ib,n2=cb,Cu=Tp.hotKeys,Cp=lb;new URL("data:application/javascript;base64,aW1wb3J0e3NlYXJjaCBhcyBDLGdldFN0b3JlZEZpZWxkcyBhcyBSLGF1dG9TdWdnZXN0IGFzIFQsbG9hZEpTT05JbmRleCBhcyB3fWZyb20ic2xpbXNlYXJjaCI7aW1wb3J0ICQgZnJvbSJAdGVtcC9zZWFyY2gtcHJvL2luZGV4IjtpbXBvcnR7ZW50cmllcyBhcyBFfWZyb20idnVlcHJlc3Mtc2hhcmVkL2NsaWVudCI7Y29uc3QgeD0obCxlKT0+e2NvbnN0IG49bC50b0xvd2VyQ2FzZSgpLHM9ZS50b0xvd2VyQ2FzZSgpLG89W107bGV0IHQ9MCxyPTA7Y29uc3QgaT0oYyxnPSExKT0+e2xldCBwPSIiO3I9PT0wP3A9Yy5sZW5ndGg+MjA/YOKApiAke2Muc2xpY2UoLTIwKX1gOmM6Zz9wPWMubGVuZ3RoK3I+MTAwP2Ake2Muc2xpY2UoMCwxMDAtcil94oCmIGA6YzpwPWMubGVuZ3RoPjIwP2Ake2Muc2xpY2UoMCwyMCl9IOKApiAke2Muc2xpY2UoLTIwKX1gOmMscCYmby5wdXNoKHApLHIrPXAubGVuZ3RoLGd8fChvLnB1c2goWyJtYXJrIixlXSkscis9ZS5sZW5ndGgscj49MTAwJiZvLnB1c2goIiDigKYiKSl9O2xldCBoPW4uaW5kZXhPZihzLHQpO2lmKGg9PT0tMSlyZXR1cm4gbnVsbDtmb3IoO2g+PTA7KXtjb25zdCBjPWgrcy5sZW5ndGg7aWYoaShsLnNsaWNlKHQsaCkpLHQ9YyxyPjEwMClicmVhaztoPW4uaW5kZXhPZihzLHQpfXJldHVybiByPDEwMCYmaShsLnNsaWNlKHQpLCEwKSxvfSxTPS9bXHU0ZTAwLVx1OWZhNV0vZyxNPShsPXt9KT0+KHtmdXp6eTouMixwcmVmaXg6ITAscHJvY2Vzc1Rlcm06ZT0+e2NvbnN0IG49ZS5tYXRjaChTKXx8W10scz1lLnJlcGxhY2UoUywiIikudG9Mb3dlckNhc2UoKTtyZXR1cm4gcz9bcywuLi5uXTpbLi4ubl19LC4uLmx9KSxGPShsLGUpPT5lLmNvbnRlbnRzLnJlZHVjZSgobixbLHNdKT0+bitzLDApLWwuY29udGVudHMucmVkdWNlKChuLFssc10pPT5uK3MsMCksXz0obCxlKT0+TWF0aC5tYXgoLi4uZS5jb250ZW50cy5tYXAoKFssbl0pPT5uKSktTWF0aC5tYXgoLi4ubC5jb250ZW50cy5tYXAoKFssbl0pPT5uKSksTz0obCxlLG49e30pPT57Y29uc3Qgcz17fTtyZXR1cm4gQyhlLGwsTSh7Ym9vc3Q6e2g6Mix0OjEsYzo0fSwuLi5ufSkpLmZvckVhY2gobz0+e2NvbnN0e2lkOnQsdGVybXM6cixzY29yZTppfT1vLGg9dC5pbmNsdWRlcygiQCIpLGM9dC5pbmNsdWRlcygiIyIpLFtnLHBdPXQuc3BsaXQoL1sjQF0vKSxtPXIuc29ydCgodSxhKT0+dS5sZW5ndGgtYS5sZW5ndGgpLmZpbHRlcigodSxhKT0+ci5zbGljZShhKzEpLmV2ZXJ5KGY9PiFmLmluY2x1ZGVzKHUpKSkse2NvbnRlbnRzOmR9PXNbZ10/Pz17dGl0bGU6IiIsY29udGVudHM6W119O2lmKGgpZC5wdXNoKFt7dHlwZToiY3VzdG9tRmllbGQiLGtleTpnLGluZGV4OnAsZGlzcGxheTptLm1hcCh1PT5vLmMubWFwKGE9PngoYSx1KSkpLmZsYXQoKS5maWx0ZXIodT0+dSE9PW51bGwpfSxpXSk7ZWxzZXtjb25zdCB1PW0ubWFwKGE9Pngoby5oLGEpKS5maWx0ZXIoYT0+YSE9PW51bGwpO2lmKHUubGVuZ3RoJiZkLnB1c2goW3t0eXBlOmM/ImhlYWRpbmciOiJ0aXRsZSIsa2V5OmcsLi4uYyYme2FuY2hvcjpwfSxkaXNwbGF5OnV9LGldKSwidCJpbiBvKWZvcihjb25zdCBhIG9mIG8udCl7Y29uc3QgZj1tLm1hcCh5PT54KGEseSkpLmZpbHRlcih5PT55IT09bnVsbCk7Zi5sZW5ndGgmJmQucHVzaChbe3R5cGU6InRleHQiLGtleTpnLC4uLmMmJnthbmNob3I6cH0sZGlzcGxheTpmfSxpXSl9fX0pLEUocykuc29ydCgoWyxvXSxbLHRdKT0+U0VBUkNIX1BST19TT1JUX1NUUkFURUdZPT09InRvdGFsIj9GKG8sdCk6XyhvLHQpKS5tYXAoKFtvLHt0aXRsZTp0LGNvbnRlbnRzOnJ9XSk9PntpZighdCl7Y29uc3QgaT1SKGUsbyk7aSYmKHQ9aS5oKX1yZXR1cm57dGl0bGU6dCxjb250ZW50czpyLm1hcCgoW2ldKT0+aSl9fSl9LGs9KGwsZSxuPXt9KT0+VChlLGwsTShuKSkubWFwKCh7c3VnZ2VzdGlvbjpzfSk9PnMpO3NlbGYub25tZXNzYWdlPWFzeW5jKHtkYXRhOnt0eXBlOmw9ImFsbCIscXVlcnk6ZSxsb2NhbGU6bixvcHRpb25zOnN9fSk9Pntjb25zdHtkZWZhdWx0Om99PWF3YWl0ICRbbl0oKSx0PXcobyx7ZmllbGRzOlsiaCIsInQiLCJjIl0sc3RvcmVGaWVsZHM6WyJoIiwidCIsImMiXX0pO2w9PT0ic3VnZ2VzdCI/c2VsZi5wb3N0TWVzc2FnZShrKGUsdCxzKSk6bD09PSJzZWFyY2giP3NlbGYucG9zdE1lc3NhZ2UoTyhlLHQscykpOnNlbGYucG9zdE1lc3NhZ2Uoe3N1Z2dlc3Rpb25zOmsoZSx0LHMpLHJlc3VsdHM6TyhlLHQscyl9KX07Ci8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcAo=",import.meta.url);let rb={};const xu=Symbol(""),ub=()=>dn(xu),db=n=>{n.provide(xu,rb)},vb=()=>{const n=new Worker(`/blogs/${Tp.worker}`,{}),s=[];return n.addEventListener("message",({data:a})=>{const{resolve:e}=s.shift();e(a)}),{search:a=>new Promise((e,t)=>{n.postMessage(a),s.push({resolve:e,reject:t})}),terminate:()=>{n.terminate(),s.forEach(({reject:a})=>a(new Error("Worker has been terminated.")))}}},kb=(n,s=!1)=>{const a=U(0),e=w(()=>n.value[a.value]),t=()=>{a.value=a.value>0?a.value-1:n.value.length-1},o=()=>{a.value=a.value<n.value.length-1?a.value+1:0};return cn(n,()=>{s||(a.value=0)}),{index:a,item:e,prev:t,next:o}},xp=Symbol(""),mb=()=>{const n=U(!1);is(xp,n)},fb=n=>n instanceof Element?document.activeElement===n&&(["TEXTAREA","SELECT","INPUT"].includes(n.tagName)||n.hasAttribute("contenteditable")):!1,hb=n=>Cu.some(s=>{const{key:a,ctrl:e=!1,shift:t=!1,alt:o=!1,meta:p=!1}=s;return a===n.key&&e===n.ctrlKey&&t===n.shiftKey&&o===n.altKey&&p===n.metaKey}),bb='<svg width="15" height="15" aria-label="Enter key" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path></g></svg>',gb='<svg width="15" height="15" aria-label="Arrow down" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path></g></svg>',Eb='<svg width="15" height="15" aria-label="Arrow up" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path></g></svg>',yb='<svg width="15" height="15" aria-label="Escape key" role="img"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2"><path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path></g></svg>',_b=n=>{const s=U([]);{const a=ub(),e=Bs();bn(()=>{const t=f1(l=>{l?o({type:"suggest",query:l,locale:e.value,options:a}).then(r=>{s.value=r.length?da(r[0],l)&&!r[0].slice(l.length).includes(" ")?r:[l,...r]:[]}).catch(r=>{console.error(r)}):s.value=[]},Tp.suggestDelay),{search:o,terminate:p}=vb();cn([n,e],()=>t(n.value),{immediate:!0}),fa(()=>{p()})})}return{suggestions:s}},ao=Cu[0];var Ab=j({name:"SearchBox",setup(){const n=Qs(Cp),s=dn(xp),a=U(!1),e=w(()=>ao?[(a.value?["⌃","⇧","⌥","⌘"]:["Ctrl","Shift","Alt","Win"]).filter((t,o)=>ao[["ctrl","shift","alt","meta"][o]]),ao.key.toUpperCase()]:null);return Cn("keydown",t=>{!s.value&&hb(t)&&!fb(t.target)&&(t.preventDefault(),s.value=!0)}),bn(()=>{const{userAgent:t}=navigator;a.value=qm(t)||Um(t)||Gm(t)}),()=>[c("button",{type:"button",class:"search-pro-button",role:"search","aria-label":n.value.search,onClick:()=>{s.value=!0}},[c(Dp),c("div",{class:"search-pro-placeholder"},n.value.search),e.value?c("div",{class:"search-pro-key-hints"},e.value.map(t=>c("kbd",{class:"search-pro-key"},t))):null])]}});const wb=f({loader:()=>u(()=>import("./SearchResult-2XG2eHDD.js"),__vite__mapDeps([])),loadingComponent:()=>{const n=Qs(Cp);return c(Tu,{hint:n.value.loading})}});var Sb=j({name:"SearchModal",setup(){const n=dn(xp),s=qa(),a=sr(),e=Qs(Cp),t=U(""),{suggestions:o}=_b(t),p=U(!1),{index:l,prev:r,next:i}=kb(o),d=Ln(),v=Ln(),k=(m=l.value)=>{t.value=o.value[m],p.value=!1};return Cn("keydown",m=>{p.value?m.key==="ArrowUp"?r():m.key==="ArrowDown"?i():m.key==="Enter"?k():m.key==="Escape"&&(p.value=!1):m.key==="Escape"&&(n.value=!1)}),bn(()=>{const m=up(document.body);cn(n,async b=>{var E;m.value=b,b&&(await ma(),(E=d.value)==null||E.focus())}),_1(v,()=>{p.value=!1}),fa(()=>{m.value=!1})}),()=>n.value?c("div",{class:"search-pro-modal-wrapper"},[c("div",{class:"search-pro-mask",onClick:()=>{n.value=!1,t.value=""}}),c("div",{class:"search-pro-modal"},[c("div",{class:"search-pro-box"},[c("form",[c("label",{for:"search-pro","aria-label":e.value.search},c(Dp)),c("input",{ref:d,type:"search",class:"search-pro-input",id:"search-pro",placeholder:e.value.placeholder,spellcheck:"false",autocapitalize:"off",autocomplete:"off",autocorrect:"off",name:`${s.value.title}-search`,value:t.value,"aria-controls":"search-pro-results",onKeydown:m=>{const{key:b}=m;o.value.length&&(b==="Tab"?(k(),m.preventDefault()):(b==="ArrowDown"||b==="ArrowUp"||b==="Escape")&&m.preventDefault())},onInput:({target:m})=>{t.value=m.value,p.value=!0,l.value=0}}),t.value?c("button",{type:"reset",class:"search-pro-clear-button",innerHTML:pb,onClick:()=>{t.value=""}}):null,p.value&&o.value.length?c("ul",{class:"search-pro-suggestions",ref:v},o.value.map((m,b)=>c("li",{class:["search-pro-suggestion",{active:b===l.value}],onClick:()=>{k(b)}},[c("kbd",{class:"search-pro-auto-complete",title:`Tab ${e.value.autocomplete}`},"Tab"),m]))):null]),c("button",{type:"button",class:"search-pro-close-button",onClick:()=>{n.value=!1,t.value=""}},e.value.cancel)]),c(wb,{query:t.value,isFocusing:!p.value,onClose:()=>{n.value=!1},onUpdateQuery:m=>{t.value=m}}),a.value?null:c("div",{class:"search-pro-hints"},[c("span",{class:"search-pro-hint"},[c("kbd",{innerHTML:bb}),e.value.select]),c("span",{class:"search-pro-hint"},[c("kbd",{innerHTML:Eb}),c("kbd",{innerHTML:gb}),e.value.navigate]),c("span",{class:"search-pro-hint"},[c("kbd",{innerHTML:yb}),e.value.exit])])])]):null}}),Rb=gs({enhance({app:n}){db(n),n.component("SearchBox",Ab)},setup(){mb()},rootComponents:[Sb]});const Ke=[Rk,N1,U1,Q1,e0,c0,d0,y0,Q0,uf,nb,sb,Rb],Bb=[["v-79fdd481","/home.html",{y:"h",t:"项目主页",i:"home"},[":md"]],["v-184f4da6","/intro.html",{d:1672025329e3,e:`<h1> Mr.LRH</h1>
`,r:{minutes:.01,words:3},y:"a",t:"Mr.LRH",i:"info"},[":md"]],["v-8daa1a0e","/",{y:"h",t:"Mr. LRH blogs",i:"home"},["/README.md"]],["v-fa355bca","/%E4%B9%A6%E7%AD%BE.html",{d:1672025329e3,e:`<h1> 书签</h1>
<h2> 导航网站</h2>
<ul>
<li><a href="https://www.code-nav.cn/" target="_blank" rel="noopener noreferrer">编程导航</a></li>
<li><a href="https://www.thosefree.com/" target="_blank" rel="noopener noreferrer">那些免费的砖</a></li>
<li><a href="https://www.cxy521.com/" target="_blank" rel="noopener noreferrer">cxy521 程序员一站式导航</a></li>
<li><a href="http://www.alloyteam.com/nav/" target="_blank" rel="noopener noreferrer">Web前端导航</a></li>
<li><a href="https://docs.pfan123.com/" target="_blank" rel="noopener noreferrer">前端导航平台</a></li>
<li><a href="https://www.thoughtworks.com/zh-cn" target="_blank" rel="noopener noreferrer">Thoughtworks</a> ： 通过整合战略、设计和软件工程帮助企业开启流畅数字化之路，引航未来征程</li>
</ul>`,r:{minutes:26.59,words:7977},y:"a",t:"书签"},["/书签.html","/书签.md",":md"]],["v-c8ef6000","/%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83/BEM.html",{d:1672025329e3,e:`<h1> CSS命名规范 - BEM</h1>
<h2> BEM</h2>
<p><code>BEM</code>表示<code>block</code>（块）、<code>element</code>（元素）、<code>modifier</code>（修饰符）。</p>
<div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.block</span> <span class="token punctuation">{</span> <span class="token comment">/* styles */</span> <span class="token punctuation">}</span>
<span class="token selector">.block__element</span> <span class="token punctuation">{</span> <span class="token comment">/* styles */</span> <span class="token punctuation">}</span>
<span class="token selector">.block--modifier</span> <span class="token punctuation">{</span> <span class="token comment">/* styles */</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:5.39,words:1616},y:"a",t:"CSS命名规范 - BEM"},["/代码规范/BEM.html","/代码规范/BEM.md",":md"]],["v-23c53e51","/%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83/",{d:1672025329e3,e:`<h1> 代码规范</h1>
<ul>
<li><a href="/blogs/%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83/BEM.html" target="blank">BEM</a></li>
</ul>
`,r:{minutes:.02,words:6},y:"a",t:"代码规范"},["/代码规范/","/代码规范/README.md","/%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83/README.md"]],["v-2b29f11e","/%E6%95%B0%E6%8D%AE%E5%BA%93/",{d:1672025329e3,e:`<h1> 数据库</h1>
<ul>
<li>SQL</li>
<li>MongoDB</li>
</ul>
`,r:{minutes:.02,words:5},y:"a",t:"数据库"},["/数据库/","/数据库/README.md","/%E6%95%B0%E6%8D%AE%E5%BA%93/README.md"]],["v-43809fe2","/%E7%A7%BB%E5%8A%A8%E7%AB%AF/%E6%B7%B7%E5%90%88%E5%BC%80%E5%8F%91.html",{d:1695030229e3,e:`<h1> 混合开发</h1>
<p>Hybrid App：混合了 Native（原生）技术和 web 技术进行开发的移动应用。主要有以三种方式：</p>
<ul>
<li><strong>基于<code>WebView UI(JSBridge)</code></strong>: 通过<code>JSBridge</code>完成<code>Web端</code>和<code>Native端</code>的通讯，从而赋予<code>Web端</code>原生能力</li>
<li><strong>基于<code>Native UI(ReactNative、Weex)</code></strong>: 在赋予<code>Web端</code>原生能力的基础之上，通过<code>JSBridge</code>将 js 解析成虚拟节点树(Virtual Dom)传递到<code>Native端</code>并使用原生渲染</li>
<li><strong>小程序方案(微信、支付宝小程序等)</strong>: 通过更加<code>定制化的JSBridge</code>，并使用<code>双 WebView</code>、<code>双线程</code>的模式隔离了<code>JS逻辑</code>与<code>UI渲染</code>，形成了特殊的开发模式，加强了 Web 端与 Native 端混合程度，提高了页面性能及开发体验。</li>
</ul>`,r:{minutes:15.54,words:4662},y:"a",t:"混合开发"},["/移动端/混合开发.html","/移动端/混合开发.md",":md"]],["v-0886bc3a","/%E7%AE%80%E4%BB%8B/",{d:1672025329e3,e:`<h1> 个人简历</h1>
`,r:{minutes:.01,words:4},y:"a",t:"个人简历"},["/简介/","/简介/README.md","/%E7%AE%80%E4%BB%8B/README.md"]],["v-26f7fea7","/%E5%89%8D%E7%AB%AF/CSS/",{d:1695030229e3,e:`<h1> HTML + CSS</h1>
<ul>
<li>CSS基础</li>
<li>CSS布局</li>
<li>CSS相关</li>
<li>Canvas基础</li>
<li>Canvas实战</li>
<li>SVG</li>
</ul>
`,r:{minutes:.06,words:18},y:"a",t:"HTML + CSS"},["/前端/CSS/","/前端/CSS/README.md","/%E5%89%8D%E7%AB%AF/CSS/README.md"]],["v-21abf927","/%E5%89%8D%E7%AB%AF/H5/1px%E8%BE%B9%E6%A1%86%E9%97%AE%E9%A2%98.html",{d:1672025329e3,e:`<h1> 1px边框问题及解决方案</h1>
<p>CSS 中 <code>1px</code> 为 CSS像素，导致 CSS像素 根据 设备像素比(dpr) 映射到设备上就为 <code>2px</code>, 或者 <code>3px</code>。由于每个设备的屏幕尺寸不一致，导致每个物理像素渲染出来的大小也不用。所以在尺寸比较大的设备，<code>1px</code> 渲染出来会比较粗。</p>
<ul>
<li>在 web 中，浏览器提供了 <code>window.devicePixelRatio</code> 来获取 <code>dpr</code>。</li>
<li>在 css 中，可以使用媒体查询 <code>min-device-pixel-ratio</code>，区分 <code>dpr</code>。</li>
</ul>`,r:{minutes:3.87,words:1160},y:"a",t:"1px边框问题及解决方案"},["/前端/H5/1px边框问题.html","/前端/H5/1px边框问题.md",":md"]],["v-43526187","/%E5%89%8D%E7%AB%AF/H5/",{d:1672025329e3,e:`<h1> 移动端H5</h1>
<ul>
<li><a href="/blogs/%E5%89%8D%E7%AB%AF/H5/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5.html" target="blank">移动端基本概念</a></li>
<li><a href="/blogs/%E5%89%8D%E7%AB%AF/H5/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E9%80%82%E9%85%8D.html" target="blank">移动端适配</a></li>
<li><a href="/blogs/%E5%89%8D%E7%AB%AF/H5/1px%E8%BE%B9%E6%A1%86%E9%97%AE%E9%A2%98.html" target="blank">1px边框问题</a></li>
<li><a href="/blogs/%E5%89%8D%E7%AB%AF/H5/%E5%9B%BE%E7%89%87%E6%A8%A1%E7%B3%8A%E9%97%AE%E9%A2%98.html" target="blank">图片模糊问题</a></li>
<li><a href="/blogs/%E5%89%8D%E7%AB%AF/H5/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98.html" target="blank">移动端常见问题</a></li>
</ul>`,r:{minutes:.23,words:69},y:"a",t:"移动端H5"},["/前端/H5/","/前端/H5/README.md","/%E5%89%8D%E7%AB%AF/H5/README.md"]],["v-7bd5b2a4","/%E5%89%8D%E7%AB%AF/H5/%E5%9B%BE%E7%89%87%E6%A8%A1%E7%B3%8A%E9%97%AE%E9%A2%98.html",{d:1672025329e3,e:`<h1> Retina屏图片模糊问题</h1>
<h2> 原因</h2>
<p>位图的每个像素对应在屏幕上使用一个物理像素来渲染，才能达到最佳的显示效果。</p>
<p>在 <code>dpr &gt; 1</code> 的屏幕上，位图的一个像素可能由多个物理像素来渲染，然而这些物理像素点并不能被准确的分配上对应位图像素的颜色，只能取近似值，所以相同的图片在 <code>dpr  &gt;1</code> 的屏幕上就会模糊。</p>
<p></p>
<p>注：一个位图像素是图片的最小数据单元，每一个单元都包含具体的显示信息（色彩，透明度，位置等等）</p>
<h2> 解决方案</h2>
<p>为了保证图片质量，应尽可能让一个屏幕像素来渲染一个图片像素，所以，针对不同 DPR 的屏幕，展示不同分辨率的图片。</p>`,r:{minutes:1.56,words:468},y:"a",t:"Retina屏图片模糊问题"},["/前端/H5/图片模糊问题.html","/前端/H5/图片模糊问题.md",":md"]],["v-b3116612","/%E5%89%8D%E7%AB%AF/H5/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5.html",{d:1672025329e3,e:`<h1> 移动端基本概念</h1>
<h2> 基本概念</h2>
<h3> 物理像素</h3>
<p>物理像素(physical pixel, 又称设备像素)：组成一幅图像的全部亮度和色度的最小图像单元。(<strong>注意：每个像素的大小是不固定的，是根据设备的分辨率决定的</strong>)</p>
<h3> 屏幕尺寸</h3>
<p>屏幕尺寸以屏幕对角线的长度来计量，计量单位为英寸</p>
<h3> 屏幕密度（PPI）</h3>
<p>屏幕密度：每英寸包含的像素数。可以用于描述屏幕的清晰度以及一张图片的质量。</p>
<ul>
<li>描述图片时，<code>PPI</code> 越高，质量越高。</li>
<li>描述屏幕时，<code>PPI</code> 越高，屏幕越清晰。</li>
</ul>`,r:{minutes:5.57,words:1671},y:"a",t:"移动端基本概念"},["/前端/H5/移动端基本概念.html","/前端/H5/移动端基本概念.md",":md"]],["v-4391364e","/%E5%89%8D%E7%AB%AF/H5/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98.html",{d:1672025329e3,e:`<h1> 移动端常见问题</h1>
<h2> HTML相关</h2>
<h3> 调用系统功能</h3>
<p>使用 <code>&lt;a&gt;</code> 能快速调用移动设备的电话/短信/邮件三大通讯功能，使用 <code>&lt;input&gt;</code> 能快速调用移动设备的的图库/文件。</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!-- 拨打电话 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tel:10086<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>拨打电话给10086<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- 发送短信 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sms:10086<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>发送短信给10086<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- 发送邮件 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mailto:10086@139.com<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>发送邮件给10086<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- 选择照片或拍摄照片 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>file<span class="token punctuation">"</span></span> <span class="token attr-name">accept</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image/*<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- 选择视频或拍摄视频 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>file<span class="token punctuation">"</span></span> <span class="token attr-name">accept</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>video/*<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- 多选文件 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>file<span class="token punctuation">"</span></span> <span class="token attr-name">multiple</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:27.22,words:8166},y:"a",t:"移动端常见问题"},["/前端/H5/移动端常见问题.html","/前端/H5/移动端常见问题.md",":md"]],["v-62e5be3a","/%E5%89%8D%E7%AB%AF/H5/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E9%80%82%E9%85%8D.html",{d:1672025329e3,e:`<h1> 移动端适配</h1>
<h2> 移动端适配流程</h2>
<ul>
<li>在 <code>head</code> 设置 <code>width=device-width</code> 的 <code>viewport</code></li>
<li>在 css 中使用 <code>px</code></li>
<li>在适当的场景使用 <code>flex</code> 布局，或者配合 <code>vw</code> 进行自适应</li>
<li>在跨设备类型的时候（pc &lt;-&gt; 手机 &lt;-&gt; 平板）使用媒体查询</li>
<li>在跨设备类型如果交互差异太大的情况，考虑分开项目开发</li>
</ul>`,r:{minutes:9.83,words:2949},y:"a",t:"移动端适配"},["/前端/H5/移动端适配.html","/前端/H5/移动端适配.md",":md"]],["v-673a6bc7","/%E5%89%8D%E7%AB%AF/JavaScript/",{d:1672025329e3,e:`<h1> JavaScript</h1>
<p>JavaScript 是一门基于原型和头等函数的多范式高级解释型编程语言，它支持面向对象程序设计、指令式编程和函数式编程。</p>
<p>它提供方法来操控文本、数组、日期以及正则表达式等。不支持I/O，比如网络、存储和图形等，但这些都可以由它的宿主环境提供支持。</p>
<p>它由ECMA（欧洲电脑制造商协会）通过ECMAScript实现语言的标准化。目前，它被世界上的绝大多数网站所使用，也被世界主流浏览器（Chrome、IE、Firefox、Safari 和 Opera）所支持。</p>
<p>JavaScript 是一门用来与网页交互的脚本语言，包含以下三个组成部分。</p>`,r:{minutes:.81,words:243},y:"a",t:"JavaScript"},["/前端/JavaScript/","/前端/JavaScript/README.md","/%E5%89%8D%E7%AB%AF/JavaScript/README.md"]],["v-8ea04c9c","/%E5%89%8D%E7%AB%AF/Node/",{d:1672025329e3,e:`<h1> Node</h1>
<ul>
<li><a href="/blogs/%E5%89%8D%E7%AB%AF/Node/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html" target="blank">基础</a></li>
</ul>
`,r:{minutes:.03,words:8},y:"a",t:"Node"},["/前端/Node/","/前端/Node/README.md","/%E5%89%8D%E7%AB%AF/Node/README.md"]],["v-ba4fd208","/%E5%89%8D%E7%AB%AF/Node/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html",{d:1672025329e3,e:`<h1> Node基础</h1>
`,r:{minutes:.01,words:3},y:"a",t:"Node基础"},["/前端/Node/基础知识.html","/前端/Node/基础知识.md",":md"]],["v-4caddbf2","/%E5%89%8D%E7%AB%AF/TypeScript/demo.html",{d:1672025329e3,e:`<h1> 笔记</h1>
<h2> 工具</h2>
<ul>
<li><a href="https://nodemon.io/" target="_blank" rel="noopener noreferrer">nodemon</a> : 自动重启node应用的工具，当监听的文件或监听目录下的文件发生修改时，自动重启应用。</li>
<li>Parcel 打包支持浏览器允许 ts 文件 : <code>npm install parcel-bundler --save-dev</code></li>
</ul>
<h2> 单例设计模式</h2>
<h3> 定义</h3>
<p>一个类对外有且仅有一个实例【只提供一个实例】</p>`,r:{minutes:6.72,words:2016},y:"a",t:"笔记"},["/前端/TypeScript/demo.html","/前端/TypeScript/demo.md",":md"]],["v-44f61baf","/%E5%89%8D%E7%AB%AF/TypeScript/",{d:1672025329e3,e:`<h1> TypeScript</h1>
<ul>
<li>TypeScript 类型系统</li>
<li>TypeScript 项目配置</li>
<li>TypeScript 实战</li>
</ul>
`,r:{minutes:.05,words:14},y:"a",t:"TypeScript"},["/前端/TypeScript/","/前端/TypeScript/README.md","/%E5%89%8D%E7%AB%AF/TypeScript/README.md"]],["v-257e2e18","/%E5%89%8D%E7%AB%AF/TypeScript/tsconfig%E9%85%8D%E7%BD%AE.html",{d:1672025329e3,e:`<h1> tsconfig.json配置</h1>
<h2> 使用 tsc 命令编译项目</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 直接在项目根目录下执行 tsc 命令，会自动根据 tsconfig.json 配置项编译</span>
<span class="token comment"># 如果在当前目录没找到，就会逐级向父文件夹查找。</span>
tsc
<span class="token comment"># 指定要编译的项目，即 tsconfig.json 所在文件目录</span>
tsc <span class="token parameter variable">--project</span> ./dir/project
<span class="token comment"># 指定要编译的文件，忽略 tsconfig.json 文件配置</span>
tsc ./src/main.ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:8.4,words:2520},y:"a",t:"tsconfig.json配置"},["/前端/TypeScript/tsconfig配置.html","/前端/TypeScript/tsconfig配置.md",":md"]],["v-2e35194d","/%E5%89%8D%E7%AB%AF/TypeScript/TypeScriptTips.html",{d:1672025329e3,e:`<h1> TypeScript Tips</h1>
<h2> 可辨识联合类型保证每个 case 都被处理</h2>
<p>把单例类型、联合类型、类型保护和类型别名这几种类型进行合并，来创建一个叫做可辨识联合的高级类型，它也可称作标签联合或代数数据类型。</p>
<p>可辨识联合要求具有两个要素：</p>
<ul>
<li>具有普通的单例类型属性（单例类型，符合单例模式的数据类型，比如枚举成员类型，字面量类型。）</li>
<li>一个类型别名，包含了那些类型的联合（即把几个类型封装为联合类型，并起一个别名）。</li>
</ul>
<h3> 利用 strictNullChecks</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Square</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">"square"</span><span class="token punctuation">;</span>
  size<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Rectangle</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">"rectangle"</span><span class="token punctuation">;</span>
  height<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  width<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Circle</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">"circle"</span><span class="token punctuation">;</span>
  radius<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">Triangle</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">"triangle"</span><span class="token punctuation">;</span>
  bottom<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  height<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">Shape</span> <span class="token operator">=</span> Square <span class="token operator">|</span> Rectangle <span class="token operator">|</span> Circle <span class="token operator">|</span> Triangle<span class="token punctuation">;</span>
<span class="token comment">// Shape 联合有四种接口，但函数的 switch 里只包含三个 case，编译器并没有提示任何错误</span>
<span class="token comment">// 因为当传入函数的是类型是 Triangle 时，没有任何一个 case 符合，则不会有 return 语句执行，那么函数是默认返回 undefined。</span>
<span class="token comment">// 开启 strictNullChecks，然后让函数的返回值类型为 number，那么当返回 undefined 的时候，就会报错</span>
<span class="token keyword">function</span> <span class="token function">getArea</span><span class="token punctuation">(</span>s<span class="token operator">:</span> Shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// error Function lacks ending return statement and return type does not include 'undefined'</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>kind<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">"square"</span><span class="token operator">:</span>
      <span class="token keyword">return</span> s<span class="token punctuation">.</span>size <span class="token operator">*</span> s<span class="token punctuation">.</span>size<span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">"rectangle"</span><span class="token operator">:</span>
      <span class="token keyword">return</span> s<span class="token punctuation">.</span>height <span class="token operator">*</span> s<span class="token punctuation">.</span>width<span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">"circle"</span><span class="token operator">:</span>
      <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> s<span class="token punctuation">.</span>radius <span class="token operator">**</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:13.22,words:3967},y:"a",t:"TypeScript Tips"},["/前端/TypeScript/TypeScriptTips.html","/前端/TypeScript/TypeScriptTips.md",":md"]],["v-689800b5","/%E5%89%8D%E7%AB%AF/TypeScript/TypeScript%E5%85%B6%E4%BB%96%E7%B1%BB%E5%9E%8B.html",{d:1672025329e3,e:`<h1> TypeScript 接口、函数、泛型、类</h1>
<h2> 接口（interface）</h2>
<p>使用 interface 来定义接口。在定义接口的时候，<code>{}</code> 括号包裹的是一个代码块，是声明类型的语句。使用冒号指定类型，每条声明之间使用换行分隔，也可以使用分号或逗号。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">interface</span> <span class="token class-name">Say</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span>words<span class="token operator">:</span> string<span class="token punctuation">)</span> <span class="token operator">:</span> string
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> string
  age<span class="token operator">?</span><span class="token operator">:</span> number <span class="token comment">// 可选属性</span>
  readonly isMale<span class="token operator">:</span> boolean <span class="token comment">// 只读属性</span>
  <span class="token function-variable function">say</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">words</span><span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> string <span class="token comment">// 函数类型描述方法一：在 interface 内部描述函数</span>
  <span class="token comment">// say: Say // 函数类型描述方法二：先用接口直接描述函数类型，然后再 User 内使用</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token function-variable function">getUserName</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">user</span><span class="token operator">:</span> User</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> user<span class="token punctuation">.</span>name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:20.52,words:6157},y:"a",t:"TypeScript 接口、函数、泛型、类"},["/前端/TypeScript/TypeScript其他类型.html","/前端/TypeScript/TypeScript其他类型.md",":md"]],["v-7350df02","/%E5%89%8D%E7%AB%AF/TypeScript/TypeScript%E5%9F%BA%E7%A1%80%E7%B1%BB%E5%9E%8B.html",{d:1672025329e3,e:`<h1> TypeScript 基础类型</h1>
<h2> 类型</h2>
<h3> 基础类型</h3>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// ===== 【Boolean】 - true / false =====</span>
<span class="token keyword">let</span> bool<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

<span class="token comment">// ===== 【Number】 =====</span>
<span class="token comment">// 支持二、八、十、十六进制的数值</span>
<span class="token keyword">let</span> num<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>

<span class="token comment">// ===== 【String】 =====</span>
<span class="token comment">// 单引号/双引号/模板字符串包裹的内容、字符串字面量类型</span>
<span class="token keyword">let</span> str1<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"Bob"</span><span class="token punctuation">;</span>
str1 <span class="token operator">=</span> <span class="token string">'Tom'</span>
<span class="token comment">// 字符串字面量类型，即把一个字符串字面量作为一种类型</span>
<span class="token comment">// 当把一个变量指定为字符串类型的时候，就不能再赋值为其他字符串值</span>
<span class="token keyword">let</span> str2<span class="token operator">:</span><span class="token string">'Bob'</span>
str2 <span class="token operator">=</span> <span class="token string">'Jerry'</span> <span class="token comment">// error 不能将类型 "Jerry"，分配给类型 "Bob"</span>

<span class="token comment">// ===== 【Array】 =====</span>
<span class="token comment">// 格式: type[] 或 Array&lt;type&gt; - type为元素类型</span>
<span class="token comment">// 设置元素类型均为 number 类型的数组类型，如下所示：</span>
<span class="token keyword">let</span> arr1<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// type[] 格式 - 推荐使用格式</span>
<span class="token keyword">let</span> arr2<span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// Array&lt;type&gt; 格式</span>
<span class="token comment">// 指定数组里的元素既可以是数值也是字符串，如下所示：</span>
<span class="token keyword">let</span> arr3<span class="token operator">:</span> <span class="token builtin">number</span><span class="token operator">|</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'str'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// ===== 【Object】 =====</span>
<span class="token comment">// 希望一个变量或者函数的参数的类型是一个对象时，使用此类型</span>
<span class="token keyword">let</span> obj<span class="token operator">:</span> object
obj <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'Tom'</span> <span class="token punctuation">}</span>

<span class="token comment">// 问题一: 访问对象中的某个属性，会报错，提示类型 object 上没有这个属性</span>
obj<span class="token punctuation">.</span>name <span class="token comment">// error: 类型 object 上不存在属性 name</span>
<span class="token comment">// 问题一解决方法：可以使用接口（interface）</span>
<span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> obj<span class="token operator">:</span> User <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">'Tom'</span> <span class="token punctuation">}</span>

<span class="token comment">// 问题二: 当定义一个函数，参数必须为对象，此时需要用到 object 类型，</span>
<span class="token keyword">function</span> <span class="token function">getValue</span><span class="token punctuation">(</span>obj<span class="token operator">:</span> object<span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// error</span>
<span class="token punctuation">}</span>
<span class="token function">getValue</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">)</span>
<span class="token comment">// 问题二解决方法：使用泛型</span>
<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">getValue</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> object<span class="token punctuation">,</span> <span class="token constant">U</span> <span class="token keyword">extends</span> <span class="token keyword">keyof</span> <span class="token constant">T</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>obj<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token constant">U</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// ===== 【null 和 undefined】 =====</span>
<span class="token comment">// 默认情况下， undefined 和 null 可以赋值给任意类型的值</span>
<span class="token comment">// 在 tsconfig.json 的"compilerOptions"里设置了"strictNullChecks": true时，</span>
<span class="token comment">// &gt;&gt;&gt; undefined 和 null 将只能赋值给它们自身和 void 类型</span>
<span class="token keyword">let</span> u<span class="token operator">:</span> <span class="token keyword">undefined</span> <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> n<span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token comment">// ===== 【Symbol】 =====</span>
<span class="token comment">// 表示独一无二的值，通过 Symbol 函数生成</span>
<span class="token comment">// 注意：使用 Symbol 的时候，必须添加 es6 的编译辅助库</span>
<span class="token comment">// tsconfig.json - "lib": ["es6", "dom"]</span>
<span class="token keyword">let</span> sym1 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'key'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//  ===== 【BigInt】 =====</span>
<span class="token comment">// 可以安全地存储和操作大整数。（即超出 Number 能够表示的安全整数范围）</span>
<span class="token comment">// 使用 BigInt(number) 把 Number 转换为 BigInt</span>
<span class="token comment">// 如果类型是 BigInt，那么数字后面需要加 n。</span>
<span class="token comment">// eg: const max1 = max + 1n</span>
<span class="token comment">// 注意：使用 BigInt 的时候，必须添加 ESNext 的编译辅助库</span>
<span class="token comment">// tsconfig.json - "lib": ["es6", "dom", "ESNext"]</span>
<span class="token comment">// declare 定义的类型只会用于编译时的检查，编译结果中会被删除。</span>
<span class="token keyword">declare</span> <span class="token keyword">let</span> foo<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token keyword">declare</span> <span class="token keyword">let</span> bar<span class="token operator">:</span> bigint<span class="token punctuation">;</span>
foo <span class="token operator">=</span> bar<span class="token punctuation">;</span> <span class="token comment">// error: Type 'bigint' is not assignable to type 'number'.</span>
bar <span class="token operator">=</span> foo<span class="token punctuation">;</span> <span class="token comment">// error: Type 'number' is not assignable to type 'bigint'.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:29.72,words:8916},y:"a",t:"TypeScript 基础类型"},["/前端/TypeScript/TypeScript基础类型.html","/前端/TypeScript/TypeScript基础类型.md",":md"]],["v-7c6b1182","/%E5%89%8D%E7%AB%AF/TypeScript/TypeScript%E5%A3%B0%E6%98%8E%E6%96%87%E4%BB%B6.html",{d:1672025329e3,e:`<h1> 声明文件</h1>
<h2> 识别库类型</h2>
<h3> 全局库</h3>
<p>全局库：不需要我们引入什么变量，只需要将库引入即可使用的库。</p>
<p>可以通过看库的源码，来判断它是什么类型，一个全局库，通常会包含下面内容中的一个或多个：</p>
<ul>
<li>顶级的 <code>var</code> 语句或 <code>function</code> 声明: 顶级的 <code>var</code> 或 <code>function</code> 是直接在全局环境声明变量或函数，不使用立即执行函数包裹会影响到全局，所以有这种一般会是全局库</li>
<li>一个或多个赋值给 <code>window.someName</code> 的赋值语句: 当出现给 <code>window</code> 设置某个属性名 <code>someName</code> ，然后给这个属性赋值的语句时，是在给全局对象 <code>window</code> 赋值。引入这个库后直接通过 <code>window.someName</code> 即可在全局任何地方访问到这个属性值</li>
<li>判断 <code>document</code> 或 <code>window</code> 是否存在的判断逻辑: 出现 <code>if</code> 语句或三元操作符这种判断 <code>document</code> 或 <code>window</code> 是否存在的语句，也有可能是要给这两个全局对象添加内容，所以也有可能是全局库。</li>
</ul>`,r:{minutes:7.21,words:2164},y:"a",t:"声明文件"},["/前端/TypeScript/TypeScript声明文件.html","/前端/TypeScript/TypeScript声明文件.md",":md"]],["v-c89b30e6","/%E5%89%8D%E7%AB%AF/TypeScript/TypeScript%E5%AE%9E%E7%8E%B0Promise.html",{d:1672025329e3,e:`<h1> TypeScript 实现 Promise</h1>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">ResolveType</span> <span class="token operator">=</span> <span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">RejectType</span> <span class="token operator">=</span> <span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">Executor</span> <span class="token operator">=</span> <span class="token punctuation">(</span>resolve<span class="token operator">:</span> ResolveType<span class="token punctuation">,</span> reject<span class="token operator">:</span> RejectType<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">isPromise</span><span class="token punctuation">(</span>val<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> val <span class="token keyword">is</span> <span class="token builtin">Promise</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">isObject</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isFunction</span><span class="token punctuation">(</span>val<span class="token punctuation">.</span>then<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">isObject</span><span class="token punctuation">(</span>val<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> val <span class="token keyword">is</span> Record<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> val <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> val <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">isFunction</span><span class="token punctuation">(</span>data<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> data <span class="token keyword">is</span> <span class="token builtin">Function</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">typeof</span> data <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> resolve<span class="token operator">!</span><span class="token operator">:</span> ResolveType<span class="token punctuation">;</span>
  <span class="token keyword">public</span> reject<span class="token operator">!</span><span class="token operator">:</span> RejectType<span class="token punctuation">;</span>
  <span class="token keyword">public</span> status<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// 状态值</span>
  <span class="token keyword">public</span> resolve_executor_value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> reject_executor_value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
  <span class="token comment">// 保存【成功】状态需要执行的函数</span>
  <span class="token keyword">public</span> resolve_then_callbacks<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token comment">// 保存【失败】状态需要执行的函数</span>
  <span class="token keyword">public</span> reject_then_callbacks<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>executor<span class="token operator">:</span> Executor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token string">'pending'</span><span class="token punctuation">;</span> <span class="token comment">// 状态值</span>

    <span class="token comment">// 成功</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token string">'pending'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token string">'success'</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>resolve_executor_value <span class="token operator">=</span> value<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>resolve_then_callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">// 失败</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span>reason<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token string">'pending'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token string">'reject'</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>reject_executor_value <span class="token operator">=</span> reason<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>reject_then_callbacks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token function">executor</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>resolve<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>reject<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 执行函数</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token string">'pending'</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 失败，则直接执行 reject 函数</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">'程序停止!!!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function">then</span><span class="token punctuation">(</span>resolveInthen<span class="token operator">:</span> ResolveType<span class="token punctuation">,</span> rejectInThen<span class="token operator">:</span> RejectType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> result<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token string">'success'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> <span class="token function">resolveInthen</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>resolve_executor_value<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//ok</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token string">'reject'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">=</span> <span class="token function">rejectInThen</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>reject_executor_value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token string">'pending'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">processManyAsyncAndSync</span><span class="token punctuation">(</span>resolveInthen<span class="token punctuation">,</span> rejectInThen<span class="token punctuation">,</span> resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">static</span> <span class="token function">all</span><span class="token punctuation">(</span>promises<span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> allPrmiseResolveSucssValue<span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
      promises<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>promise<span class="token punctuation">,</span> index<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
          <span class="token punctuation">(</span>resolveSuccess<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">ProcessData</span><span class="token punctuation">(</span>resolveSuccess<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">(</span>rejectFail<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">reject</span><span class="token punctuation">(</span>rejectFail<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 只要有一个promise对象的resolve执行失败，执行reject</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token keyword">function</span> <span class="token function">ProcessData</span><span class="token punctuation">(</span>resolveSuccess<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        allPrmiseResolveSucssValue<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> resolveSuccess<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> promises<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 所有的 promise 对象 resolve 函数全部执行完成</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>allPrmiseResolveSucssValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token doc-comment comment">/**
   * 执行多个异步+多级then的处理方法
   * <span class="token keyword">@param</span> <span class="token parameter">resolveInthen</span>
   * <span class="token keyword">@param</span> <span class="token parameter">rejectInThen</span>
   * <span class="token keyword">@param</span> <span class="token parameter">resolve</span>
   * <span class="token keyword">@param</span> <span class="token parameter">reject</span>
   */</span>
  <span class="token function">processManyAsyncAndSync</span><span class="token punctuation">(</span>
    resolveInthen<span class="token operator">:</span> ResolveType<span class="token punctuation">,</span>
    rejectInThen<span class="token operator">:</span> RejectType<span class="token punctuation">,</span>
    resolve<span class="token operator">:</span> ResolveType<span class="token punctuation">,</span>
    reject<span class="token operator">:</span> RejectType
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> result<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>resolve_then_callbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      result <span class="token operator">=</span> <span class="token function">resolveInthen</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>resolve_executor_value<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPromise</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 是异步的 Promise 对象</span>
        result<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
          <span class="token punctuation">(</span>resolveSuccess<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">resolve</span><span class="token punctuation">(</span>resolveSuccess<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">(</span>rejectSucess<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">reject</span><span class="token punctuation">(</span>rejectSucess<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 如果是普通的数据,不是异步的 Promise 对象</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>reject_then_callbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      result <span class="token operator">=</span> <span class="token function">rejectInThen</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>reject_executor_value<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:1.3,words:391},y:"a",t:"TypeScript 实现 Promise"},["/前端/TypeScript/TypeScript实现Promise.html","/前端/TypeScript/TypeScript实现Promise.md",":md"]],["v-69172050","/%E5%89%8D%E7%AB%AF/TypeScript/TypeScript%E5%AE%9E%E7%8E%B0Vuex.html",{d:1672025329e3,e:`<h1> TypeScript 实现 Vuex</h1>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> App<span class="token punctuation">,</span> inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span>

<span class="token comment">// provide / inject</span>
<span class="token comment">// provide 设置一个可以被注入到应用范围内所有组件中的值。组件使用 inject 来接收 provide 的值。</span>
<span class="token keyword">const</span> injectKey <span class="token operator">=</span> <span class="token string">'store'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">useStore</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Store<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">inject</span><span class="token punctuation">(</span>injectKey<span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">createStore</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>options<span class="token operator">:</span> StoreOptions<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Store<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span></span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Store<span class="token operator">&lt;</span><span class="token constant">S</span> <span class="token operator">=</span> <span class="token builtin">any</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  moduleCollection<span class="token operator">:</span> ModuleCollection<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  mutations<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  actions<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  getters<span class="token operator">:</span> GetterTree<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">S</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  commit<span class="token operator">:</span> Commit<span class="token punctuation">;</span>
  dispatch<span class="token operator">:</span> Dispatch<span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>options<span class="token operator">:</span> StoreOptions<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 初始化模块集合：添加子模块到父模块中，并对模块进行包装</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>moduleCollection <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ModuleCollection<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span></span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'this.moduleCollection: '</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>moduleCollection<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> store <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> ref <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> commit <span class="token operator">=</span> ref<span class="token punctuation">.</span>commit_<span class="token punctuation">;</span>
    <span class="token keyword">var</span> dispatch <span class="token operator">=</span> ref<span class="token punctuation">.</span>dispatch_<span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">commit</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">boundCommit</span><span class="token punctuation">(</span>type<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> payload<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">commit</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>store<span class="token punctuation">,</span> type<span class="token punctuation">,</span> payload<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">dispatch</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">boundDispatch</span><span class="token punctuation">(</span>type<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> payload<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">dispatch</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>store<span class="token punctuation">,</span> type<span class="token punctuation">,</span> payload<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token comment">// 获取根 Store 的 state</span>
    <span class="token keyword">var</span> rootState <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>moduleCollection<span class="token punctuation">.</span>root<span class="token punctuation">.</span>state<span class="token punctuation">;</span>
    <span class="token comment">// 注册模块</span>
    <span class="token function">installModule</span><span class="token punctuation">(</span>store<span class="token punctuation">,</span> rootState<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>moduleCollection<span class="token punctuation">.</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">install</span><span class="token punctuation">(</span>app<span class="token operator">:</span> App<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    app<span class="token punctuation">.</span><span class="token function">provide</span><span class="token punctuation">(</span>injectKey<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">commit_</span><span class="token punctuation">(</span>type<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> payload<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>mutations<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'[vuex] unknown mutation type: '</span> <span class="token operator">+</span> type<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>mutations<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">(</span>payload<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">dispatch_</span><span class="token punctuation">(</span>type<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> payload<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>actions<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'[vuex] unknown actions type: '</span> <span class="token operator">+</span> type<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>actions<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">(</span>payload<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token doc-comment comment">/**
 *
 * <span class="token keyword">@param</span> <span class="token parameter">store</span>
 * <span class="token keyword">@param</span> <span class="token parameter">rootState_</span> 根 state
 * <span class="token keyword">@param</span> <span class="token parameter">path</span> 保存模块名【命名空间名】的数组
 * <span class="token keyword">@param</span> <span class="token parameter">module</span> 当前模块
 */</span>
<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">installModule</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">R</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>
  store<span class="token operator">:</span> Store<span class="token operator">&lt;</span><span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  rootState_<span class="token operator">:</span> <span class="token constant">R</span><span class="token punctuation">,</span>
  path<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  module<span class="token operator">:</span> ModuleWrapper<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> isRoot <span class="token operator">=</span> <span class="token operator">!</span>path<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token keyword">let</span> namespace <span class="token operator">=</span> store<span class="token punctuation">.</span>moduleCollection<span class="token punctuation">.</span><span class="token function">getNamespace</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> actionContext<span class="token operator">:</span> ActionContext<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token function">makeLocalContext</span><span class="token punctuation">(</span>store<span class="token punctuation">,</span> namespace<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isRoot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1、如果不是根模块，则获取父级的 state 对象</span>
    <span class="token keyword">var</span> parentState<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token function">getParentState</span><span class="token punctuation">(</span>rootState_<span class="token punctuation">,</span> path<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 2、将当前模块的 state对象 和 当前模块名 合成一个对象，加到父级 state对象 上</span>
    parentState<span class="token punctuation">[</span>path<span class="token punctuation">[</span>path<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> module<span class="token punctuation">.</span>state<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 遍历 父模块 中的 子模块</span>
  module<span class="token punctuation">.</span><span class="token function">forEachChild</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>child<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">installModule</span><span class="token punctuation">(</span>store<span class="token punctuation">,</span> rootState_<span class="token punctuation">,</span> path<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">,</span> child<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 遍历模块中的 getter</span>
  module<span class="token punctuation">.</span><span class="token function">forEachGetter</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>getter<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> namespaceType <span class="token operator">=</span> namespace <span class="token operator">+</span> key<span class="token punctuation">;</span>
    Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span>getters<span class="token punctuation">,</span> namespaceType<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">getter</span><span class="token punctuation">(</span>module<span class="token punctuation">.</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'store.getters: '</span><span class="token punctuation">,</span> store<span class="token punctuation">.</span>getters<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 遍历模块中的 mutation</span>
  module<span class="token punctuation">.</span><span class="token function">forEachMutation</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>mutation<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> namespaceType <span class="token operator">=</span> namespace <span class="token operator">+</span> key<span class="token punctuation">;</span>
    store<span class="token punctuation">.</span>mutations<span class="token punctuation">[</span>namespaceType<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>payload<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">mutation</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>store<span class="token punctuation">,</span> module<span class="token punctuation">.</span>state<span class="token punctuation">,</span> payload<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'store.mutations: '</span><span class="token punctuation">,</span> store<span class="token punctuation">.</span>mutations<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 遍历模块中的 action</span>
  module<span class="token punctuation">.</span><span class="token function">forEachAction</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>action<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> namespaceType <span class="token operator">=</span> namespace <span class="token operator">+</span> key<span class="token punctuation">;</span>
    store<span class="token punctuation">.</span>actions<span class="token punctuation">[</span>namespaceType<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>payload<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">action</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>store<span class="token punctuation">,</span> <span class="token punctuation">{</span> commit<span class="token operator">:</span> actionContext<span class="token punctuation">.</span>commit <span class="token punctuation">}</span><span class="token punctuation">,</span> payload<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'store.actions: '</span><span class="token punctuation">,</span> store<span class="token punctuation">.</span>actions<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">makeLocalContext</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">R</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>store<span class="token operator">:</span> Store<span class="token operator">&lt;</span><span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> namespace<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> noNamespace <span class="token operator">=</span> namespace <span class="token operator">===</span> <span class="token string">''</span><span class="token punctuation">;</span> <span class="token comment">// 根模块没有命名空间</span>
  <span class="token keyword">let</span> actionContext<span class="token operator">:</span> ActionContext<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    commit<span class="token operator">:</span> noNamespace
      <span class="token operator">?</span> store<span class="token punctuation">.</span><span class="token function-variable function">commit</span>
      <span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>type<span class="token punctuation">,</span> payload<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          type <span class="token operator">=</span> namespace <span class="token operator">+</span> type<span class="token punctuation">;</span>
          store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> payload<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> actionContext<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">getParentState</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">R</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>rootState<span class="token operator">:</span> <span class="token constant">R</span><span class="token punctuation">,</span> path<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> path<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>state<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>state <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> rootState<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// path: ["foodSortModule", "foodModule", "foodDetailModule"]</span>
<span class="token comment">// rootState:</span>
<span class="token comment">// {</span>
<span class="token comment">//   "navList": 根state对象数据,</span>
<span class="token comment">//   "foodSortModule": {</span>
<span class="token comment">//     foodSortList: { 美食分类对象数据 },</span>
<span class="token comment">//     "foodModule": {</span>
<span class="token comment">//       "美食state对象数据",</span>
<span class="token comment">//       "foodDetailModule": { 美食详情对象数据 }</span>
<span class="token comment">//     }</span>
<span class="token comment">//   },</span>
<span class="token comment">//   "hotelSortModule": 酒店分类state数据对象 //酒店分类 state</span>
<span class="token comment">// }</span>
<span class="token comment">// rootState对象结束</span>
<span class="token comment">// 处理模块集合</span>
<span class="token keyword">class</span> <span class="token class-name">ModuleCollection<span class="token operator">&lt;</span><span class="token constant">R</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  root<span class="token operator">!</span><span class="token operator">:</span> ModuleWrapper<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>rawRootModule<span class="token operator">:</span> Module<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> rawRootModule<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 注册模块</span>
  <span class="token punctuation">}</span>
  <span class="token function">register</span><span class="token punctuation">(</span>path<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> rawModule<span class="token operator">:</span> Module<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> newModule <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ModuleWrapper<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span></span><span class="token punctuation">(</span>rawModule<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>path<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// path 长度等于 0 为根模块</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>root <span class="token operator">=</span> newModule<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 添加 子模块 到 父模块 中</span>
      <span class="token comment">// 1、获取 父模块 的 ModuleWrapper 对象</span>
      <span class="token keyword">let</span> parentModule <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 2、将 子模块 添加到 父模块 中</span>
      parentModule<span class="token punctuation">.</span><span class="token function">addChild</span><span class="token punctuation">(</span>path<span class="token punctuation">[</span>path<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> newModule<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>rawModule<span class="token punctuation">.</span>modules<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> sonModules <span class="token operator">=</span> rawModule<span class="token punctuation">.</span>modules<span class="token punctuation">;</span> <span class="token comment">// 获取子模块</span>
      <span class="token comment">// 遍历子模块，并进行注册</span>
      Util<span class="token punctuation">.</span><span class="token function">forEachValue</span><span class="token punctuation">(</span>sonModules<span class="token punctuation">,</span> <span class="token punctuation">(</span>modules<span class="token operator">:</span> Module<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">,</span> modules<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function">get</span><span class="token punctuation">(</span>path<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> module <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">;</span>
    <span class="token keyword">return</span> path<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>moduleWrapper<span class="token operator">:</span> ModuleWrapper<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> module<span class="token punctuation">.</span><span class="token function">getChild</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> module<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">getNamespace</span><span class="token punctuation">(</span>path<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> moduleWrapper <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">;</span>
    <span class="token keyword">return</span> path<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span>namespace<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      moduleWrapper <span class="token operator">=</span> moduleWrapper<span class="token punctuation">.</span><span class="token function">getChild</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> namespace <span class="token operator">+</span> <span class="token punctuation">(</span>moduleWrapper<span class="token punctuation">.</span>namespaced <span class="token operator">?</span> key <span class="token operator">+</span> <span class="token string">'/'</span> <span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Util</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token function">forEachValue</span><span class="token punctuation">(</span>obj<span class="token operator">:</span> object<span class="token punctuation">,</span> fn<span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">(</span>obj <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 模块包装</span>
<span class="token keyword">class</span> <span class="token class-name">ModuleWrapper<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  children<span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> ModuleWrapper<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  rawModule<span class="token operator">:</span> Module<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  state<span class="token operator">:</span> <span class="token constant">S</span><span class="token punctuation">;</span>
  namespaced<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>rawModule_<span class="token operator">:</span> Module<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// rawModule 原始模块： namespaced 、 state 、 getter 、 mutations 、 actions</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>rawModule <span class="token operator">=</span> rawModule_<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> rawModule_<span class="token punctuation">.</span>state <span class="token operator">||</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>namespaced <span class="token operator">=</span> rawModule_<span class="token punctuation">.</span>namespaced <span class="token operator">||</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">addChild</span><span class="token punctuation">(</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> moduleWrapper<span class="token operator">:</span> ModuleWrapper<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>children<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> moduleWrapper<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">getChild</span><span class="token punctuation">(</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>children<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">forEachChild</span><span class="token punctuation">(</span>fn<span class="token operator">:</span> ChldMdleWrperToKey<span class="token operator">&lt;</span><span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Util<span class="token punctuation">.</span><span class="token function">forEachValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>children<span class="token punctuation">,</span> fn<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">forEachGetter</span><span class="token punctuation">(</span>fn<span class="token operator">:</span> GetterToKey<span class="token operator">&lt;</span><span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>rawModule<span class="token punctuation">.</span>getters<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      Util<span class="token punctuation">.</span><span class="token function">forEachValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>rawModule<span class="token punctuation">.</span>getters<span class="token punctuation">,</span> fn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">forEachMutation</span><span class="token punctuation">(</span>fn<span class="token operator">:</span> MutationToKey<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>rawModule<span class="token punctuation">.</span>mutations<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      Util<span class="token punctuation">.</span><span class="token function">forEachValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>rawModule<span class="token punctuation">.</span>mutations<span class="token punctuation">,</span> fn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">forEachAction</span><span class="token punctuation">(</span>fn<span class="token operator">:</span> ActionToKey<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>rawModule<span class="token punctuation">.</span>actions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      Util<span class="token punctuation">.</span><span class="token function">forEachValue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>rawModule<span class="token punctuation">.</span>actions<span class="token punctuation">,</span> fn<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">Dispatch</span> <span class="token operator">=</span> <span class="token punctuation">(</span>type<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> payload<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">Commit</span> <span class="token operator">=</span> <span class="token punctuation">(</span>type<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> payload<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token keyword">interface</span> <span class="token class-name">ActionContext<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token comment">//dispatch: Dispatch;</span>
  commit<span class="token operator">:</span> Commit<span class="token punctuation">;</span>
  <span class="token comment">//state: S;</span>
<span class="token punctuation">}</span>

<span class="token comment">// type Getter&lt;S, R&gt; = (state: S, getters: any, rootState: R, rootGetters: any) =&gt; any</span>
<span class="token keyword">type</span> <span class="token class-name">Getter<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span>state<span class="token operator">:</span> <span class="token constant">S</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">Mutation<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span>state<span class="token operator">:</span> <span class="token constant">S</span><span class="token punctuation">,</span> payload<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">Action<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span>context<span class="token operator">:</span> ActionContext<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> payload<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">GetterToKey<span class="token operator">&lt;</span><span class="token constant">R</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span>getter<span class="token operator">:</span> Getter<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">MutationToKey<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span>getter<span class="token operator">:</span> Mutation<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">ActionToKey<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span>action<span class="token operator">:</span> Action<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">ChldMdleWrperToKey<span class="token operator">&lt;</span><span class="token constant">R</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span>moduleWrapper<span class="token operator">:</span> ModuleWrapper<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

<span class="token comment">// 【start】 StoreOptions 接口增加多模块管理属性</span>
<span class="token keyword">interface</span> <span class="token class-name">GetterTree<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> Getter<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">MutationTree<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> Mutation<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">ActionTree<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> Action<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">interface</span> <span class="token class-name">ModuleTree<span class="token operator">&lt;</span><span class="token constant">R</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>key<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> Module<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">StoreOptions<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  state<span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">S</span><span class="token punctuation">;</span>
  getters<span class="token operator">?</span><span class="token operator">:</span> GetterTree<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">S</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  mutations<span class="token operator">?</span><span class="token operator">:</span> MutationTree<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  actions<span class="token operator">?</span><span class="token operator">:</span> ActionTree<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">S</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  modules<span class="token operator">?</span><span class="token operator">:</span> ModuleTree<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Module<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
  namespaced<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  state<span class="token operator">?</span><span class="token operator">:</span> <span class="token constant">S</span><span class="token punctuation">;</span>
  getters<span class="token operator">?</span><span class="token operator">:</span> GetterTree<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  mutations<span class="token operator">?</span><span class="token operator">:</span> MutationTree<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  actions<span class="token operator">?</span><span class="token operator">:</span> ActionTree<span class="token operator">&lt;</span><span class="token constant">S</span><span class="token punctuation">,</span> <span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  modules<span class="token operator">?</span><span class="token operator">:</span> ModuleTree<span class="token operator">&lt;</span><span class="token constant">R</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 【end】 StoreOptions 接口增加多模块管理属性</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:3.62,words:1086},y:"a",t:"TypeScript 实现 Vuex"},["/前端/TypeScript/TypeScript实现Vuex.html","/前端/TypeScript/TypeScript实现Vuex.md",":md"]],["v-1c82787f","/%E5%89%8D%E7%AB%AF/TypeScript/TypeScript%E6%8E%A7%E5%88%B6%E5%8F%8D%E8%BD%AC%E5%92%8C%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5.html",{d:1672025329e3,e:`<h1> TypeScript控制反转和依赖注入</h1>
<h2> IoC 控制反转</h2>
<p>IoC（Inversion of Control），即 “控制反转”。在开发中， IoC 意味着将设计好的对象交给容器控制，⽽不是使⽤传统的⽅式，在对象内部直接控制。</p>
<ul>
<li><strong>IoC 是有专⻔⼀个容器来创建这些对象，即由 IoC 容器控制对象的创建</strong>。而直接在对象内部通过 <code>new</code> 的方式创建对象，是程序主动创建依赖对象。</li>
<li>传统应⽤程序是由我们⾃⼰在程序中主动控制去获取依赖对象，称为<strong>正转</strong>。<strong>反转，则是由容器来帮忙创建及注⼊依赖对象</strong>。因为由容器帮我们查找及注⼊依赖对象，对象只是被动的接受依赖对象，依赖对象的获取被反转。</li>
</ul>`,r:{minutes:1.55,words:465},y:"a",t:"TypeScript控制反转和依赖注入"},["/前端/TypeScript/TypeScript控制反转和依赖注入.html","/前端/TypeScript/TypeScript控制反转和依赖注入.md",":md"]],["v-10930fde","/%E5%89%8D%E7%AB%AF/TypeScript/TypeScript%E8%A3%85%E9%A5%B0%E5%99%A8.html",{d:1672025329e3,e:`<h1> TypeScript 装饰器</h1>
<h2> 基础</h2>
<ul>
<li>
<p>装饰器定义</p>
<p>装饰器能够作用于类声明、方法、访问符、属性和参数上。使用 <code>@</code> 符号加一个名字来定义，如 <code>@decorat</code>， <code>decorat</code> 必须<strong>是一个函数或者求值后是一个函数</strong>。函数在运行的时候被调用，被装饰的声明作为参数会自动传入。</p>
<p>注意：装饰器要紧挨着要修饰的内容的前面，而且所有的装饰器不能用在 <code>.d.ts</code> （声明文件）中，和任何外部上下文中。</p>
</li>
<li>
<p>装饰器工厂</p>
<p>装饰器工厂是一个函数，它的返回值是<strong>一个函数</strong>，返回的函数作为装饰器的调用函数。如果使用装饰器工厂，那么在使用的时候，就要加上函数调用。</p>
</li>
<li>
<p>装饰器组合（对于同一个目标，引用多个装饰器），多个装饰器的执行顺序如下：</p>
<ul>
<li>装饰器工厂从上到下依次执行，但是只是用于返回函数但不调用函数；</li>
<li>装饰器函数从下到上依次执行，也就是执行工厂函数返回的函数。</li>
</ul>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">setName</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'get setName'</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setName'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">setAge</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'get setAge'</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'setAge'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">setName</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">setAge</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// 打印出来的内容如下：</span>
<span class="token comment">// 'get setName -&gt; get setAge -&gt; setAge -&gt; setName</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>装饰器求值</p>
<p>类的定义中,不同声明上的装饰器将按以下规定的顺序引用：</p>
<ul>
<li>参数装饰器，方法装饰器，访问符装饰器或属性装饰器应用到每个实例成员；</li>
<li>参数装饰器，方法装饰器，访问符装饰器或属性装饰器应用到每个静态成员；</li>
<li>参数装饰器应用到构造函数；</li>
<li>类装饰器应用到类。</li>
</ul>
</li>
<li>
<p>装饰器 JavaScript 实现</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">FirstClassDecorator</span><span class="token punctuation">(</span>targetClass<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>targetClass<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">'信息'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>targetClass<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>methodname<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'方法'</span><span class="token punctuation">,</span> methodname<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> dataprop <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>targetClass<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> methodname<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'方法数据属性:'</span><span class="token punctuation">,</span> dataprop<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">FirstClassDecorator</span></span>
<span class="token keyword">class</span> <span class="token class-name">CustomerService</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">'名字'</span><span class="token punctuation">;</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">buy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">'购买'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">placeOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">'下单购买'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// ========== JavaScript 实现 ==========</span>

<span class="token string">'use strict'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> __decorate <span class="token operator">=</span>
  <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>__decorate<span class="token punctuation">)</span> <span class="token operator">||</span>
  <span class="token comment">// decorators : 接收数组，包含多个装饰器函数</span>
  <span class="token comment">// target : 表示被装饰的类</span>
  <span class="token comment">// key</span>
  <span class="token comment">// desc</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span>decorators<span class="token punctuation">,</span> target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> desc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 参数数量</span>
    <span class="token comment">// &gt; argsNum = 2, 装饰器修饰的是【类】或者【构造器参数】, targetInfo = target[类名]</span>
    <span class="token comment">// &gt; argsNum = 3, 装饰器修饰的是【方法参数】或者【属性】, targetInfo = undefined</span>
    <span class="token comment">// &gt; argsNum = 4, 装饰器修饰的是【方法】（第四个参数 desc 等于 null）, targetInfo = 该方法的数据属性 [desc = Object.getOwnPropertyDescriptor(target, key)]</span>
    <span class="token keyword">var</span> argsNum <span class="token operator">=</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token comment">// targetInfo : 被装饰器修饰的目标 - 类、属性、方法、方法参数</span>
    <span class="token keyword">var</span> targetInfo <span class="token operator">=</span>
      argsNum <span class="token operator">&lt;</span> <span class="token number">3</span>
        <span class="token operator">?</span> target
        <span class="token operator">:</span> desc <span class="token operator">===</span> <span class="token keyword">null</span>
        <span class="token operator">?</span> <span class="token punctuation">(</span>desc <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token operator">:</span> desc<span class="token punctuation">;</span>
    <span class="token keyword">var</span> decorator<span class="token punctuation">;</span> <span class="token comment">// 保存装饰器数组元素</span>

    <span class="token comment">// Reflect.decorate : ES6是没有提供 Reflect.decorate 方法，元数据信息,支持 reflect-metadata 元数据</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> Reflect <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> Reflect<span class="token punctuation">.</span>decorate <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span>
      targetInfo <span class="token operator">=</span> Reflect<span class="token punctuation">.</span><span class="token function">decorate</span><span class="token punctuation">(</span>decorators<span class="token punctuation">,</span> target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> desc<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> decorators<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>decorator <span class="token operator">=</span> decorators<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token comment">// argsNum &lt; 3, decorator 为【类装饰器】或者【构造器参数装饰器】，执行 decorator(targetInfo), 直接执行 decorator 装饰器，并传递目标 targetInfo</span>
          <span class="token comment">// argsNum &gt; 3, decorator 为【方法装饰器】，直接执行 decorator(target, key, targetInfo)</span>
          <span class="token comment">// argsNum = 3, decorator 为【方法参数装饰器】或者【属性装饰器】，直接执行 decorator(target, key)</span>
          <span class="token comment">// targetInfo 最终为各个装饰器执行后的返回值,但如果没有返回值</span>
          targetInfo <span class="token operator">=</span>
            <span class="token punctuation">(</span>argsNum <span class="token operator">&lt;</span> <span class="token number">3</span>
              <span class="token operator">?</span> <span class="token function">decorator</span><span class="token punctuation">(</span>targetInfo<span class="token punctuation">)</span>
              <span class="token operator">:</span> argsNum <span class="token operator">&gt;</span> <span class="token number">3</span>
              <span class="token operator">?</span> <span class="token function">decorator</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> targetInfo<span class="token punctuation">)</span>
              <span class="token operator">:</span> <span class="token function">decorator</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span> targetInfo<span class="token punctuation">;</span>
    <span class="token keyword">return</span> argsNum <span class="token operator">&gt;</span> <span class="token number">3</span> <span class="token operator">&amp;&amp;</span> targetInfo <span class="token operator">&amp;&amp;</span> Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> targetInfo<span class="token punctuation">)</span><span class="token punctuation">,</span> targetInfo<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> __metadata <span class="token operator">=</span>
  <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>__metadata<span class="token punctuation">)</span> <span class="token operator">||</span>
  <span class="token keyword">function</span> <span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> Reflect <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> Reflect<span class="token punctuation">.</span>metadata <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">metadata</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">FirstClassDecorator</span><span class="token punctuation">(</span>targetClass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>targetClass<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">'信息'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>targetClass<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span>methodname<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'方法'</span><span class="token punctuation">,</span> methodname<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> dataprop <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>targetClass<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> methodname<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'方法数据属性:'</span><span class="token punctuation">,</span> dataprop<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> CustomerService <span class="token operator">=</span> <span class="token keyword">class</span> <span class="token class-name">CustomerService</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'姓名'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">buy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">'购买'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">placeOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">'下单购买'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
CustomerService <span class="token operator">=</span> <span class="token function">__decorate</span><span class="token punctuation">(</span>
  <span class="token punctuation">[</span>FirstClassDecorator<span class="token punctuation">,</span> <span class="token function">__metadata</span><span class="token punctuation">(</span><span class="token string">'design:paramtypes'</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 【注意】：类装饰器，此处为类的实例</span>
  CustomerService
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>`,r:{minutes:14.59,words:4377},y:"a",t:"TypeScript 装饰器"},["/前端/TypeScript/TypeScript装饰器.html","/前端/TypeScript/TypeScript装饰器.md",":md"]],["v-23ce3816","/%E5%89%8D%E7%AB%AF/%E5%8A%A8%E7%94%BB%E6%95%88%E6%9E%9C/H5%E7%9B%B4%E6%92%AD%E7%82%B9%E8%B5%9E%E5%8A%A8%E7%94%BB.html",{d:1695030229e3,c:"动效",g:["动画"],e:`<h1> H5 直播点赞动画</h1>
<h2> CSS3 方式</h2>
<h3> CSS3 animation</h3>
<p><code>animation: name duration timing-function delay iteration-count direction fill-mode play-state;</code></p>
<ul>
<li><code>name</code> : <strong>animation-name</strong> , 规定需要绑定到选择器的 <code>@keyframe</code> （规定动画） 名称。</li>
<li><code>duration</code> : <strong>animation-duration</strong> , 规定完成动画所花费的时间，以秒或毫秒计。</li>
<li><code>timing-function</code> : <strong>animation-timing-function</strong> , 规定动画的速度曲线。
<ul>
<li><code>linear</code> : 动画从头到尾的速度是相同的。</li>
<li><code>ease</code> : 默认。动画以低速开始，然后加快，在结束前变慢。</li>
<li><code>ease-in</code> : 动画以低速开始。</li>
<li><code>ease-out</code> : 动画以低速结束。</li>
<li><code>ease-in-out</code> : 动画以低速开始和结束。</li>
<li><code>cubic-bezier(n,n,n,n)</code> : 在 <code>cubic-bezier</code> 函数中自己的值。可能的值是从 <code>0</code> 到 <code>1</code> 的数值。</li>
</ul>
</li>
<li><code>delay</code> : <strong>animation-delay</strong> , 规定在动画开始之前的延迟。单位可以是秒（s）或毫秒（ms）。</li>
<li><code>iteration-count</code> : <strong>animation-iteration-count</strong> , 规定动画应该播放的次数。
<ul>
<li><code>n</code> : 一个数字，定义应该播放多少次动画。</li>
<li><code>infinite</code> : 指定动画应该播放无限次（永远）。</li>
</ul>
</li>
<li><code>direction</code> : <strong>animation-direction</strong> , 规定是否应该轮流反向播放动画。
<ul>
<li><code>normal</code> : 默认值。动画按正常播放。</li>
<li><code>reverse</code> : 动画反向播放。</li>
<li><code>alternate</code> : 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。</li>
<li><code>alternate-reverse</code> : 动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放。</li>
<li><code>initial</code> : 设置该属性为它的默认值。</li>
<li><code>inherit</code> : 从父元素继承该属性。</li>
</ul>
</li>
<li><code>fill-mode</code> : <strong>animation-fill-mode</strong> , 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。
<ul>
<li><code>none</code> : 默认值。动画在动画执行之前和之后不会应用任何样式到目标元素。</li>
<li><code>forwards</code> : 在动画结束后（由 <code>animation-iteration-count</code> 决定），动画将应用该属性值。</li>
<li><code>backwards</code> : 动画将应用在 <code>animation-delay</code> 定义期间启动动画的第一次迭代的关键帧中定义的属性值。这些都是 from 关键帧中的值（当 <code>animation-direction</code> 为 <code>normal</code> 或 <code>alternate</code> 时）或 to 关键帧中的值（当 <code>animation-direction</code> 为 <code>reverse</code> 或 <code>alternate-reverse</code> 时）。</li>
<li><code>both</code> : 动画遵循 forwards 和 backwards 的规则。也就是说，动画会在两个方向上扩展动画属性。</li>
<li><code>initial</code> : 设置该属性为它的默认值。请参阅 initial。</li>
<li><code>inherit</code> : 从父元素继承该属性。请参阅 inherit。</li>
</ul>
</li>
<li><code>play-state</code> : <strong>animation-play-state</strong> , 指定动画是否正在运行或已暂停。
<ul>
<li><code>paused</code> : 指定暂停动画</li>
<li><code>running</code> : 指定正在运行的动画</li>
</ul>
</li>
</ul>`,r:{minutes:3.38,words:1014},y:"a",t:"H5 直播点赞动画"},["/前端/动画效果/H5直播点赞动画.html","/前端/动画效果/H5直播点赞动画.md",":md"]],["v-50268bbe","/%E5%89%8D%E7%AB%AF/%E5%8A%A8%E7%94%BB%E6%95%88%E6%9E%9C/",{d:1695030229e3,e:`<h1> 动效</h1>
<ul>
<li><a href="/blogs/%E5%89%8D%E7%AB%AF/%E5%8A%A8%E7%94%BB%E6%95%88%E6%9E%9C/H5%E7%9B%B4%E6%92%AD%E7%82%B9%E8%B5%9E%E5%8A%A8%E7%94%BB.html" target="blank">H5直播点赞动画</a></li>
</ul>
`,r:{minutes:.06,words:17},y:"a",t:"动效"},["/前端/动画效果/","/前端/动画效果/README.md","/%E5%89%8D%E7%AB%AF/%E5%8A%A8%E7%94%BB%E6%95%88%E6%9E%9C/README.md"]],["v-976b51c4","/%E5%85%B6%E4%BB%96/Git/git_head.html",{d:1672025329e3,e:`<h1> Git HEAD</h1>
<h2> HEAD 简介</h2>
<p><code>HEAD</code> 是当前分支引用的指针，它总是指向该分支上的最后一次提交。当做分支切换的时候，<code>HEAD</code> 是会跟着切换的，指针就会指向新的分支，其最终会落脚到某一个 commit 上。</p>
<h2> 相对引用（^n / ~n）</h2>
<ul>
<li><code>(&lt;commit&gt; | HEAD)^n</code>：指 HEAD 的第 n 个父提交（HEAD存在多个父提交的情况下）。如果 HEAD 存在 N 个父提交，那么 n &lt; N</li>
<li><code>(&lt;commit&gt; | HEAD)~n</code>：指的是 HEAD 的第n个祖先提交</li>
<li><code>(&lt;commit&gt; | HEAD)~n = (&lt;commit&gt; | HEAD)^^^...(^的个数为n)</code></li>
</ul>`,r:{minutes:1.52,words:457},y:"a",t:"Git HEAD"},["/其他/Git/git_head.html","/其他/Git/git_head.md",":md"]],["v-0052c16d","/%E5%85%B6%E4%BB%96/Git/git%E5%91%BD%E4%BB%A4.html",{d:1672025329e3,e:`<h1> Git 命令</h1>
<h2> 基础配置</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 缺省等同于 local</span>
$ <span class="token function">git</span> config

<span class="token comment"># local 只对某个仓库有效</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--local</span>

<span class="token comment"># global 对当前用户所有仓库有效</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--global</span>

<span class="token comment"># system 对系统所有登陆的用户有效</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--system</span>

<span class="token comment"># 显示 config 的配置，使用 --list</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--list</span> <span class="token parameter variable">--local</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--list</span> <span class="token parameter variable">--global</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--list</span> <span class="token parameter variable">--system</span>

<span class="token comment"># 对当前用户所有仓库，设置用户名</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">'your_name'</span>

<span class="token comment"># 对当前用户所有仓库，设置电子邮箱地址</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token string">'your_email@domain.com'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:8.55,words:2566},y:"a",t:"Git 命令"},["/其他/Git/git命令.html","/其他/Git/git命令.md",":md"]],["v-7a0cb75d","/%E5%85%B6%E4%BB%96/Git/git%E5%9F%BA%E7%A1%80.html",{d:1672025329e3,e:`<h1> Git 基础</h1>
<h2> Git 的三种状态</h2>
<ul>
<li><strong>已提交</strong>（committed）：表示数据已经安全的保存在本地数据库中</li>
<li><strong>已修改</strong>（modified）：表示修改了文件，但还没保存到数据库中</li>
<li><strong>已暂存</strong>（staged）：表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中</li>
</ul>
<p>由此，引入 Git 项目的三个工作区域的概念：</p>
<ul>
<li><strong>Git仓库</strong>：Git 用来保存项目的元数据和对象数据库的地方。从其它计算机克隆仓库时，拷贝的就是这里的数据</li>
<li><strong>工作目录</strong>：对项目的某个版本独立提取出来的内容。这些从 Git 仓库的压缩数据库中提取出来的文件，放在磁盘上供你使用或修改</li>
<li><strong>暂存区域</strong>：一个文件，保存了下次将提交的文件列表信息，一般在 Git 仓库目录中</li>
</ul>`,r:{minutes:.99,words:296},y:"a",t:"Git 基础"},["/其他/Git/git基础.html","/其他/Git/git基础.md",":md"]],["v-1b67107a","/%E5%85%B6%E4%BB%96/Git/git%E5%AF%B9%E8%B1%A1.html",{d:1672025329e3,e:`<h1> Git 对象</h1>
<p>Git 是一个内容寻址文件系统。Git 的核心部分是一个简单的键值对数据库（key-value data store）。向该数据库插入任意类型的内容，它会返回一个键值，通过该键值可以在任意时刻再次检索（retrieve）该内容。</p>
<h2> .git目录</h2>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>.git/
  | -- description # 仅供 GitWeb 程序使用
  | -- config # 包含项目特有的配置选项
  | -- info/ # 包含一个全局性排除（global exclude）文件，用以放置那些不希望被记录在 .gitignore 文件中的忽略模式（ignored patterns）
  | -- hooks/ # 包含客户端或服务端的钩子脚本（hook scripts）
  | -- HEAD # 指示目前被检出的分支
  | -- index # 保存暂存区信息
  | -- objects/ # 存储所有数据内容
  | -- refs/ # 存储指向数据（分支）的提交对象的指针
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:3.46,words:1039},y:"a",t:"Git 对象"},["/其他/Git/git对象.html","/其他/Git/git对象.md",":md"]],["v-1fdad470","/%E5%85%B6%E4%BB%96/Git/git%E5%BF%BD%E7%95%A5%E6%8F%90%E4%BA%A4.html",{d:1672025329e3,e:`<h1> Git .gitignore</h1>
<h2> Git 忽略规则</h2>
<h3> Git 忽略规则优先级</h3>
<ul>
<li>从命令行中读取可用的忽略规则</li>
<li>当前目录定义的规则</li>
<li>父级目录定义的规则，依次地推</li>
<li><code>$GIT_DIR/info/exclude</code> 文件中定义的规则</li>
<li><code>core.excludesfile</code> 中定义的全局规则</li>
</ul>
<h3> Git 忽略规则匹配语法</h3>
<ul>
<li><code>空格</code> : 不匹配任意文件，可作为分隔符，可用反斜杠转义</li>
<li><code># 开头</code> : 标识注释，可以使用反斜杠进行转义</li>
<li><code>! 开头</code> : 标识否定，该文件将会再次被包含，如果排除了该文件的父级目录，则使用 <code>!</code> 也不会再次被包含。可以使用反斜杠进行转义</li>
<li><code>/ 结束</code> : 只匹配文件夹以及在该文件夹路径下的内容，但是不匹配该文件</li>
<li><code>/ 开始</code> : 的模式匹配项目跟目录</li>
<li>如果一个模式不包含斜杠，则它匹配相对于当前 <code>.gitignore</code> 文件路径的内容，如果该模式不在 <code>.gitignore</code> 文件中，则相对于项目根目录</li>
<li><code>**</code> : 匹配多级目录，可在开始，中间，结束
?通用匹配单个字符</li>
<li><code>[]</code> : 通用匹配单个字符列表</li>
</ul>`,r:{minutes:1.67,words:500},y:"a",t:"Git .gitignore"},["/其他/Git/git忽略提交.html","/其他/Git/git忽略提交.md",":md"]],["v-6167e984","/%E5%85%B6%E4%BB%96/Git/git%E6%8A%80%E5%B7%A7.html",{d:1672025329e3,e:`<h1> Git 技巧</h1>
<h2> Git 修改分支名称</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 老分支名: oldBranchName 新分支名: newBranchName</span>

<span class="token comment"># 1、本地分支重命名（未推送至远程）</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">-m</span> oldBranchName newBranchName

<span class="token comment"># 2、远程分支重命名（推送至远程）</span>
<span class="token comment"># 2.1、删除远程分支</span>
$ <span class="token function">git</span> push <span class="token parameter variable">--delete</span> origin oldBranchName
<span class="token comment"># 2.2、上传新分支名</span>
$ <span class="token function">git</span> push origin newBranchName
<span class="token comment"># 2.3、将修改后的本地分支与远程分支关联</span>
$ <span class="token function">git</span> branch --set-upstream-to origin/newBranchName
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:4.46,words:1339},y:"a",t:"Git 技巧"},["/其他/Git/git技巧.html","/其他/Git/git技巧.md",":md"]],["v-bfb62730","/%E5%85%B6%E4%BB%96/Git/git%E7%9B%B8%E5%85%B3%E9%97%AE%E9%A2%98.html",{d:1672025329e3,e:`<h1> Git 相关问题</h1>
<h2> Please make sure you have the correct access rights and the repository exists</h2>
<p>原因： ssh key 有问题，连接不上服务器</p>
<p>解决方法：重新设置用户名（user.name）和邮箱（user.email），再重新生成 ssh公钥 即可。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1、重新设置用户名（user.name）和邮箱（user.email）</span>
<span class="token comment"># 对当前用户所有仓库，设置用户名</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">'your_name'</span>
<span class="token comment"># 对当前用户所有仓库，设置电子邮箱地址</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token string">'your_email@domain.com'</span>

<span class="token comment"># 2、生成 ssh公钥</span>
$ ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-C</span> <span class="token string">"your_email@domain.com"</span>

<span class="token comment"># 3、设置 github/gitee/gitlab 等 ssh公钥</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:1.42,words:426},y:"a",t:"Git 相关问题"},["/其他/Git/git相关问题.html","/其他/Git/git相关问题.md",":md"]],["v-151a966e","/%E5%85%B6%E4%BB%96/Git/",{d:1672025329e3,e:`<h1> Git</h1>
<p>Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。</p>
<h2> 推荐与参考</h2>
<ul>
<li><a href="https://gitee.com/progit/index.html" target="_blank" rel="noopener noreferrer">Pro Git（中文版）</a></li>
<li><a href="http://gitbook.liuhui998.com/index.html" target="_blank" rel="noopener noreferrer">Git Community Book 中文版</a></li>
<li><a href="http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html" target="_blank" rel="noopener noreferrer">常用 Git 命令清单</a></li>
<li><a href="https://www.cnblogs.com/jasongrass/p/10582449.html" target="_blank" rel="noopener noreferrer">深入理解 Git - 一切皆 commit</a></li>
<li><a href="https://www.cnblogs.com/jasongrass/p/10582465.html" target="_blank" rel="noopener noreferrer">深入理解 Git - Git 底层对象</a></li>
<li><a href="https://learngitbranching.js.org/?locale=zh_CN" target="_blank" rel="noopener noreferrer">Learn Git Branching</a></li>
<li><a href="http://rogerdudler.github.io/git-guide/index.zh.html" target="_blank" rel="noopener noreferrer">git - 简明指南</a></li>
<li><a href="http://marklodato.github.io/visual-git-guide/index-zh-cn.html#reset" target="_blank" rel="noopener noreferrer">图解 Git</a></li>
<li><a href="https://www.jianshu.com/p/74bd0ceb6182" target="_blank" rel="noopener noreferrer">Git 忽略提交 .gitignore</a></li>
</ul>`,r:{minutes:.41,words:122},y:"a",t:"Git"},["/其他/Git/","/其他/Git/README.md","/%E5%85%B6%E4%BB%96/Git/README.md"]],["v-5c93f7ea","/%E5%85%B6%E4%BB%96/%E5%8A%A0%E5%AF%86/",{d:1672025329e3,e:`<h1> 性能优化</h1>
<h2> 性能优化 - 加载</h2>
<ul>
<li>加载瀑布图（waterfall）
F12 --&gt; Network --&gt; Network Setting
Use large request rows : 打开
Show overview : 打开
Capture screenshots : 打开</li>
<li>Lightouse
Performance
First Contentful Paint
Speed Index : 4s 内
Largest Contentful Paint
Time to Interactive
Total Blocking Time
Cumulative Layout Shift</li>
<li>F12 --&gt; Ctrl + Shift + P
show frames pre second (FPS) meter</li>
<li>基于 HAR 存储于重建性能信息
F12 --&gt; Network --&gt; 选中请求 --&gt; 右键 --&gt; Save all as HAR with content</li>
<li>TTFB：从客户端开始和服务端交互到服务端开始向客户端浏览器传输数据的时间（包括DNS、socket连接和请求响应时间）</li>
<li>页面加载时间</li>
<li>首次渲染</li>
</ul>`,r:{minutes:12.65,words:3794},y:"a",t:"性能优化"},["/其他/加密/","/其他/加密/README.md","/%E5%85%B6%E4%BB%96/%E5%8A%A0%E5%AF%86/README.md"]],["v-670514ca","/%E5%85%B6%E4%BB%96/%E5%8A%A0%E5%AF%86/%E5%8A%A0%E5%AF%86.html",{d:1672025329e3,e:`<h1> 密码</h1>
<h2> 加密</h2>
<p>加密是为了提升数据的安全性。</p>
<p>加密三要素：</p>
<ul>
<li>数据：明文/密文</li>
<li>密钥：定长的字符串，根据加密算法确定其长度。</li>
<li>算法：加密算法/解密算法，加解密算法可能相同也可能不同</li>
</ul>
<p>简单加密算法</p>
<ul>
<li>
<p>异或，示例如下：</p>
<ul>
<li>数据：123</li>
<li>密钥: 666</li>
<li>算法: 异或</li>
<li>加密过程: 123 ^ 666 = 737</li>
<li>解密过程: 737 ^ 666 = 123</li>
</ul>
</li>
<li>
<p>凯撒加密。将字母按顺序推后起3位起到加密作用。</p>
</li>
</ul>`,r:{minutes:18.58,words:5573},y:"a",t:"密码"},["/其他/加密/加密.html","/其他/加密/加密.md",":md"]],["v-59cac0a5","/%E5%85%B6%E4%BB%96/%E5%B7%A5%E5%85%B7/",{d:1672025329e3,e:`<h1> 工具</h1>
<ul>
<li><a href="/blogs/%E5%85%B6%E4%BB%96/%E5%B7%A5%E5%85%B7/VSCode%E6%8F%92%E4%BB%B6.html" target="blank">Visual Studio Code</a></li>
</ul>
`,r:{minutes:.03,words:9},y:"a",t:"工具"},["/其他/工具/","/其他/工具/README.md","/%E5%85%B6%E4%BB%96/%E5%B7%A5%E5%85%B7/README.md"]],["v-0871403a","/%E5%85%B6%E4%BB%96/%E5%B7%A5%E5%85%B7/VSCode%E6%8F%92%E4%BB%B6.html",{d:1672025329e3,e:`<h1> Visual Studio Code</h1>
<h2> 快捷键</h2>
<p><kbd>Ctrl</kbd> + <kbd>K</kbd> <kbd>Ctrl</kbd> + <kbd>S</kbd> 打开快捷键列表</p>
<ul>
<li>
<p><kbd>Ctrl</kbd> + <kbd>P</kbd>：转到文件</p>
</li>
<li>
<p><kbd>Ctrl</kbd> + <kbd>\`</kbd>：在 VS Code 中打开 terminal</p>
</li>
<li>
<p><kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd>：代码格式化（推荐使用 Prettier）</p>
</li>
<li>
<p><kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>↑ / ↓</kbd>：向上/下同时编辑</p>
<p>可在属性的单词前添加好同时编辑鼠标点后，可配合 <kbd>Ctrl</kbd> + <kbd>→</kbd> 使用跳转到行末</p>
</li>
<li>
<p><kbd>Shift</kbd> + <kbd>Alt</kbd>：多行选中同时编辑</p>
</li>
<li>
<p><kbd>Alt</kbd> + <kbd>Down</kbd>：下移一行</p>
</li>
<li>
<p><kbd>Alt</kbd> + <kbd>Up</kbd>：上移一行</p>
</li>
<li>
<p><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>Down</kbd>：向下复制行</p>
</li>
<li>
<p><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>Up</kbd>：向上复制行</p>
</li>
<li>
<p><kbd>Ctrl</kbd> + <kbd>D</kbd>：将选定的字符移动到下一个匹配字符串上</p>
</li>
<li>
<p><kbd>Ctrl</kbd> + <kbd>Space</kbd>：触发建议</p>
</li>
<li>
<p><kbd>Ctrl </kbd> + <kbd>Shift</kbd> + <kbd>T</kbd>：重新打开最新关闭的窗口</p>
</li>
</ul>`,r:{minutes:6.33,words:1900},y:"a",t:"Visual Studio Code"},["/其他/工具/VSCode插件.html","/其他/工具/VSCode插件.md",":md"]],["v-2c988428","/%E5%85%B6%E4%BB%96/%E5%B7%A5%E5%85%B7/whistle.html",{d:1672025329e3,e:`<h1> Whistle</h1>
<p><a href="https://wproxy.org/whistle/" target="_blank" rel="noopener noreferrer">whistle</a> 基于 Node 实现的跨平台 Web 调试代理工具</p>
`,r:{minutes:.07,words:20},y:"a",t:"Whistle"},["/其他/工具/whistle.html","/其他/工具/whistle.md",":md"]],["v-41461593","/%E6%95%B0%E6%8D%AE%E5%BA%93/MongoDB/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html",{d:1672025329e3,e:`<h1> MongoDB 基础</h1>
<h2> 1. 优点</h2>
<ul>
<li>高可扩展性</li>
<li>分布式存储</li>
<li>低成本</li>
<li>解构灵活</li>
</ul>
<h2> 2. window 下安装 MongoDB</h2>
<p>参考：<a href="http://www.imooc.com/article/18438" target="_blank" rel="noopener noreferrer">http://www.imooc.com/article/18438</a></p>
<h3> 2.1 <a href="https://www.mongodb.com/download-center/community" target="_blank" rel="noopener noreferrer">下载 MongoDB 安装包</a></h3>`,r:{minutes:18.03,words:5408},y:"a",t:"MongoDB 基础"},["/数据库/MongoDB/基础知识.html","/数据库/MongoDB/基础知识.md",":md"]],["v-636aaf48","/%E6%95%B0%E6%8D%AE%E5%BA%93/SQL%E8%AF%AD%E8%A8%80/",{d:1672025329e3,e:`<h1> SQL</h1>
<h2> SQL 相关知识</h2>
<p>SQL 语言按照功能可划分为：</p>
<ul>
<li><code>DDL</code> （Data Definition Language，数据定义语言）：用于定义数据库对象，包括数据库、数据表和列。可创建、删除和修改数据库和表结构。</li>
<li><code>DML</code> （Data Manipulation Language，数据操作语言）：用于操作和数据库相关的记录，比如增加、删除、修改数据库表中的记录。</li>
<li><code>DCL</code> （Data Control Language，数据控制语言）：用于定义访问权限和安全级别。</li>
<li><code>DQL</code> （Data Query Language，数据查询语言）：用于查询记录。</li>
</ul>`,r:{minutes:3.32,words:997},y:"a",t:"SQL"},["/数据库/SQL语言/","/数据库/SQL语言/README.md","/%E6%95%B0%E6%8D%AE%E5%BA%93/SQL%E8%AF%AD%E8%A8%80/README.md"]],["v-4e11db22","/%E6%95%B0%E6%8D%AE%E5%BA%93/SQL%E8%AF%AD%E8%A8%80/SQL%E5%9F%BA%E7%A1%80.html",{d:1672025329e3,e:`<h1> SQL 基础</h1>
<ul>
<li>创建数据库： <code>CREATE DATABASE &lt;database_name&gt;</code></li>
<li>删除数据库： <code>DROP DATABASE &lt;database_name&gt;</code></li>
<li>创建数据库中的表： <code>CREATE TABLE &lt;table_name&gt;</code></li>
<li>删除数据库中的表： <code>DROP TABLE &lt;table_name&gt;</code></li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 使用 Navicat 设计表。导出 SQL 文件如下：</span>

<span class="token comment">-- 数据表和字段使用反引号，是为了避免它们名称与 MySQL 保留字段相同</span>
<span class="token comment">-- 先删除 player 表（如果数据库中存在该表的话），然后再创建 player 表</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">\`</span>player<span class="token punctuation">\`</span></span><span class="token punctuation">;</span>
<span class="token comment">-- 创建球员表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">\`</span>player<span class="token punctuation">\`</span></span>  <span class="token punctuation">(</span>
  <span class="token comment">-- player_id      球员ID</span>
  <span class="token comment">-- int(11)        整数类型，显示长度为 11 位</span>
  <span class="token comment">-- NOT NULL       表示整个字段不能是空值</span>
  <span class="token comment">-- AUTO_INCREMENT 表示主键自动增长</span>
  <span class="token identifier"><span class="token punctuation">\`</span>player_id<span class="token punctuation">\`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
  <span class="token comment">-- team_id        球队ID</span>
  <span class="token comment">-- int(11)        整数类型，显示长度为 11 位</span>
  <span class="token comment">-- NOT NULL       表示整个字段不能是空值</span>
  <span class="token identifier"><span class="token punctuation">\`</span>team_id<span class="token punctuation">\`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token comment">-- player_name    球员姓名</span>
  <span class="token comment">-- varchar(255)   可变字符串类型，最大长度为 255</span>
  <span class="token comment">-- CHARACTER SET  指定数据库采用的字符集，utf8 不能写为 utf-8</span>
  <span class="token comment">-- COLLATE        指定数据库字符集的排序规则。utf8 的默认排序规则为 utf8_general_ci （表示对大小写不铭感， utf8_bin 表示对大小写敏感）</span>
  <span class="token comment">-- NOT NULL       表示整个字段不能是空值</span>
  <span class="token identifier"><span class="token punctuation">\`</span>player_name<span class="token punctuation">\`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> utf8 <span class="token keyword">COLLATE</span> utf8_general_ci <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token comment">-- height         球员身高</span>
  <span class="token comment">-- float(size, d) 带有浮动小数点的小数字。size 表示规定显示最大位数， d 表示规定小数点右侧的最大位数</span>
  <span class="token comment">-- NULL           如果表中的某个列是可选的，那么可以在不向该列添加值的情况下插入新记录或更新已有的记录</span>
  <span class="token comment">--                意味着该字段将以 NULL 值保存。用作未知的或不适用的值的占位符。</span>
  <span class="token comment">-- DEFAULT        约束用于向列中插入默认值</span>
  <span class="token identifier"><span class="token punctuation">\`</span>height<span class="token punctuation">\`</span></span> <span class="token keyword">float</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token number">0.00</span><span class="token punctuation">,</span>
  <span class="token comment">-- PRIMARY KEY    约束唯一标识数据库表中的每条记录</span>
  <span class="token comment">--                主键必须包含唯一的值。主键列不能包含 NULL 值</span>
  <span class="token comment">--                每个表都应该有一个主键，并且每个表只能有一个主键</span>
  <span class="token comment">-- USING BTREE    索引方法采用 BTREE</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">\`</span>player_id<span class="token punctuation">\`</span></span><span class="token punctuation">)</span> <span class="token keyword">USING</span> <span class="token keyword">BTREE</span><span class="token punctuation">,</span>
  <span class="token comment">-- UNIQUE         约束唯一标识数据库表中的每条记录</span>
  <span class="token comment">--                UNIQUE 和 PRIMARY KEY 约束均为列或列集合提供了唯一性的保证</span>
  <span class="token comment">--                PRIMARY KEY 约束拥有自动定义的 UNIQUE 约束</span>
  <span class="token comment">--                每个表可以有多个 UNIQUE 约束，但是每个表只能有一个 PRIMARY KEY 约束</span>
  <span class="token comment">-- UNIQUE INDEX   唯一索引。可设置其他索引方式 NORMAL INDEX（普通索引）</span>
  <span class="token comment">--                唯一索引和普通索引的区别在于它对字段进行了唯一性的约束</span>
  <span class="token keyword">UNIQUE</span> <span class="token keyword">INDEX</span> <span class="token identifier"><span class="token punctuation">\`</span>player_name<span class="token punctuation">\`</span></span><span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">\`</span>player_name<span class="token punctuation">\`</span></span><span class="token punctuation">)</span> <span class="token keyword">USING</span> <span class="token keyword">BTREE</span>
<span class="token punctuation">)</span> 
<span class="token comment">-- ENGINE = InnoDB  存储规则采用 InnoDB</span>
<span class="token comment">-- ROW_FORMAT       设置行格式。Dynamic 基于compact格式，提高存储容量，支持大索引（large index）3072字节，由innodb_large_prefix参数控制。</span>
<span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> <span class="token operator">=</span> utf8 <span class="token keyword">COLLATE</span> <span class="token operator">=</span> utf8_general_ci ROW_FORMAT <span class="token operator">=</span> Dynamic<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:2.5,words:751},y:"a",t:"SQL 基础"},["/数据库/SQL语言/SQL基础.html","/数据库/SQL语言/SQL基础.md",":md"]],["v-36637eec","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Electron/",{d:1672025329e3,e:`<h1> Electron</h1>
<p>Electron 是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。</p>
<p>嵌入 Chromium 和 Node.js 到二进制的 Electron 允许您保持一个 JavaScript 代码代码库并创建，在 Windows 上运行的跨平台应用 macOS 和 Linux —— 不需要本地开发经验。</p>
`,r:{minutes:.24,words:72},y:"a",t:"Electron"},["/前端框架/Electron/","/前端框架/Electron/README.md","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Electron/README.md"]],["v-99865ade","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/",{d:1672025329e3,e:`<h1> React</h1>
<p>React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。</p>
<ul>
<li>
<p>声明式</p>
<p>React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据变动时 React 能高效更新并渲染合适的组件。</p>
<p>以声明式编写 UI，可以让你的代码更加可靠，且方便调试。</p>
</li>
<li>
<p>组件化</p>
<p>构建管理自身状态的封装组件，然后对其组合以构成复杂的 UI。</p>
<p>由于组件逻辑使用 JavaScript 编写而非模板，因此你可以轻松地在应用中传递数据，并保持状态与 DOM 分离。</p>
</li>
<li>
<p>一次学习，跨平台编写</p>
<p>无论你现在使用什么技术栈，在无需重写现有代码的前提下，通过引入 React 来开发新功能。</p>
<p>React 还可以使用 Node 进行服务器渲染，或使用 React Native 开发原生移动应用。</p>
</li>
</ul>`,r:{minutes:.81,words:243},y:"a",t:"React"},["/前端框架/React/","/前端框架/React/README.md","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/README.md"]],["v-1c4c4ee8","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/uni-app/",{d:1672025329e3,e:`<h1> uni-app</h1>
<h2> 使用特定前缀的方式引用图片路径</h2>
<h3> scss 中使用特定前缀引用图片路径</h3>
<ul>
<li>创建 <code>globalVar.scss</code> 文件，并在 <code>uni.scss</code> 文件中引入</li>
</ul>
<details class="hint-container details"><summary>globalVar.scss</summary>
<div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$src</span></span><span class="token punctuation">:</span> <span class="token string">"https://csxbank.oss-cn-shanghai-finance-1-pub.aliyuncs.com/sxf/"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>`,r:{minutes:1.77,words:530},y:"a",t:"uni-app"},["/前端框架/uni-app/","/前端框架/uni-app/README.md","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/uni-app/README.md"]],["v-71a020ac","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/",{d:1672025329e3,e:`<h1> Vue</h1>
<p>Vue (发音为 /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。</p>
<ul>
<li>
<p>易学易用</p>
<p>基于标准 HTML、CSS 和 JavaScript 构建，提供容易上手的 API 和一流的文档。</p>
</li>
<li>
<p>性能出色</p>
<p>经过编译器优化、完全响应式的渲染系统，几乎不需要手动优化。</p>
</li>
<li>
<p>灵活多变</p>
<p>丰富的、可渐进式集成的生态系统，可以根据应用规模在库和框架间切换自如。</p>
</li>
</ul>`,r:{minutes:.53,words:160},y:"a",t:"Vue"},["/前端框架/Vue/","/前端框架/Vue/README.md","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/README.md"]],["v-1fa12809","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Q_A.html",{d:1681788517e3,e:`<h1> Webpack Q&amp;A</h1>
<h2> css <code>import</code> 使用 alias 相对路径</h2>
<p>在 less, sass, stylus 中，使用 <code>@import "@/style/theme"</code> 的语法引用相对 <code>@</code> 的目录确会报错: 找不到 <code>@</code> 目录。说明 webpack 没有正确识别资源相对路径。</p>
<p>【原因】</p>
<p>css 文件会被用 <code>css-loader</code> 处理，css <code>@import</code> 后的字符串会被 <code>css-loader</code> 视为 <strong>绝对路径</strong> 解析，因为并没有添加 <code>css-loader</code> 的 <code>alias</code>，所以会报找不到 <code>@</code> 目录。</p>`,r:{minutes:.68,words:204},y:"a",t:"Webpack Q&A"},["/前端框架/Webpack/Q_A.html","/前端框架/Webpack/Q_A.md",":md"]],["v-3dc6ebba","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/",{d:1672025329e3,e:`<h1> Webpack</h1>
<p>Webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。</p>
<p>当 Webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。</p>
`,r:{minutes:.32,words:95},y:"a",t:"Webpack"},["/前端框架/Webpack/","/前端框架/Webpack/README.md","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/README.md"]],["v-833597ac","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA/",{d:1672025329e3,e:`<h1> 项目搭建</h1>
<ul>
<li><a href="/blogs/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA/%E7%BC%96%E7%A8%8B%E8%A7%84%E8%8C%83.html" target="blank">编程规范</a></li>
</ul>
`,r:{minutes:.04,words:13},y:"a",t:"项目搭建"},["/前端框架/项目搭建/","/前端框架/项目搭建/README.md","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA/README.md"]],["v-62424824","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA/%E7%BC%96%E7%A8%8B%E8%A7%84%E8%8C%83.html",{d:1672025329e3,e:`<h1> 编程规范</h1>
<h2> EditorConfig</h2>
<p><a href="https://editorconfig.org/" target="_blank" rel="noopener noreferrer">EditorConfig</a> 可以在不同的编辑器和 ide 中，为同一个项目工作的多个开发人员维护一致的编码风格。</p>
<p>如果使用 Visual Studio Code 编辑器，需要安装 EditorConfig for VS Code 插件。</p>
<details class="hint-container details"><summary>.editorconfig</summary>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># .editorconfig</span>
<span class="token comment"># https://editorconfig.org</span>
<span class="token comment"># 表示是最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件</span>
root <span class="token operator">=</span> <span class="token boolean">true</span>

<span class="token comment"># 表示所有文件适用</span>
<span class="token punctuation">[</span>*<span class="token punctuation">]</span>
<span class="token comment"># 设置编码，值为 latin1、utf-8、utf-8-bom、utf-16be和utf-16le，不建议使用 utf-8-bom</span>
charset <span class="token operator">=</span> utf-8
<span class="token comment"># 设置缩进风格(tab是硬缩进，space为软缩进)</span>
indent_style <span class="token operator">=</span> space
<span class="token comment"># 用一个整数定义的列数来设置缩进的宽度</span>
<span class="token comment"># 如果 indent_style 为 tab，则此属性默认为 tab_width</span>
indent_size <span class="token operator">=</span> <span class="token number">2</span>
<span class="token comment"># 设置换行符，值为lf、cr和crlf</span>
end_of_line <span class="token operator">=</span> lf
<span class="token comment"># 设为 true 表示使文件以一个空白行结尾</span>
insert_final_newline <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token comment"># 设为 true 表示会去除换行行首的任意空白字符</span>
trim_trailing_whitespace <span class="token operator">=</span> <span class="token boolean">true</span>

<span class="token comment"># 仅 .md 文件适用以下规则</span>
<span class="token punctuation">[</span>*.md<span class="token punctuation">]</span>
<span class="token comment"># 设为 true 表示使文件以一个空白行结尾</span>
insert_final_newline <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token comment"># 设为 true 表示会去除换行行首的任意空白字符</span>
trim_trailing_whitespace <span class="token operator">=</span> <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,r:{minutes:27.35,words:8206},y:"a",t:"编程规范"},["/前端框架/项目搭建/编程规范.html","/前端框架/项目搭建/编程规范.md",":md"]],["v-55612a68","/%E6%9E%B6%E6%9E%84/%E5%BE%AE%E5%89%8D%E7%AB%AF/",{d:1672025329e3,e:`<h1> 微前端简介</h1>
<blockquote>
<p>Techniques, strategies and recipes for building a modern web app with multiple teams that can ship features independently.  -- <a href="https://micro-frontends.org/" target="_blank" rel="noopener noreferrer">Micro Frontends</a></p>
<p>微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。</p>
<p>构建一个现代web应用所需要的技术、策略和方法，具备多个团队独立开发、部署的特性。</p>
</blockquote>`,r:{minutes:8.17,words:2451},y:"a",t:"微前端简介"},["/架构/微前端/","/架构/微前端/README.md","/%E6%9E%B6%E6%9E%84/%E5%BE%AE%E5%89%8D%E7%AB%AF/README.md"]],["v-0d70097e","/%E6%9E%B6%E6%9E%84/%E5%BE%AE%E5%89%8D%E7%AB%AF/%E5%9F%BA%E7%A1%80%E6%A8%A1%E5%9D%97%E5%AE%9E%E7%8E%B0.html",{d:1672025329e3,e:`<h1> 微前端基础模块实现</h1>
`,r:{minutes:.03,words:9},y:"a",t:"微前端基础模块实现"},["/架构/微前端/基础模块实现.html","/架构/微前端/基础模块实现.md",":md"]],["v-030d03ee","/%E6%9E%B6%E6%9E%84/%E5%9F%BA%E7%A1%80/",{d:1672025329e3,e:`<h1> 软件设计原则与分层</h1>
<h2> 软件设计原则</h2>
<h3> 单一职责原则</h3>
<ul>
<li>永远不应该有多于一个原因来改变某个类。</li>
<li>理解：对于一个类而言，应该仅有一个引起它变化的原因。</li>
<li>应用：如果一个类拥有了两种职责，那就可以将这个类分成两个类。</li>
</ul>
<h3> 开放封闭原则</h3>
<ul>
<li>软件实体扩展应该是开放的，但对于修改应该是封闭的。</li>
<li>理解：对扩展开放，对修改封闭。可以去扩展类，但不要去修改类。</li>
<li>应用：当需求有改动，尽量用继承或组合的方式来扩展类的功能，而不是直接修改类的代码。</li>
</ul>`,r:{minutes:11.16,words:3348},y:"a",t:"软件设计原则与分层"},["/架构/基础/","/架构/基础/README.md","/%E6%9E%B6%E6%9E%84/%E5%9F%BA%E7%A1%80/README.md"]],["v-65722b2c","/%E6%9C%8D%E5%8A%A1%E7%AB%AF/Linux/",{d:1672025329e3,e:`<h1> Linux</h1>
<ul>
<li><a href="/blogs/%E6%9C%8D%E5%8A%A1%E7%AB%AF/Linux/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html" target="blank">Linux基础知识和命令</a></li>
</ul>
`,r:{minutes:.05,words:14},y:"a",t:"Linux"},["/服务端/Linux/","/服务端/Linux/README.md","/%E6%9C%8D%E5%8A%A1%E7%AB%AF/Linux/README.md"]],["v-446036c2","/%E6%9C%8D%E5%8A%A1%E7%AB%AF/Linux/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html",{d:1672025329e3,e:`<h1> Linux基础知识和命令</h1>
<h2> 基础知识</h2>
<h3> 命令行提示符</h3>
<p></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 获取当前的用户名</span>
<span class="token punctuation">[</span>lrh@localhost ~<span class="token punctuation">]</span>$ <span class="token function">whoami</span>

<span class="token comment"># 切换为超级用户（root）</span>
<span class="token comment"># 命令提示符也会随之变化为 [root@localhost ~]#</span>
<span class="token punctuation">[</span>lrh@localhost ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">su</span>

<span class="token comment"># 退出 root 身份，或使用 Ctrl + D</span>
<span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:58.53,words:17559},y:"a",t:"Linux基础知识和命令"},["/服务端/Linux/基础知识.html","/服务端/Linux/基础知识.md",":md"]],["v-68bd4d46","/%E6%9C%8D%E5%8A%A1%E7%AB%AF/Nginx/",{d:1672025329e3,e:`<h1> Nginx</h1>
`,r:{minutes:0,words:1},y:"a",t:"Nginx"},["/服务端/Nginx/","/服务端/Nginx/README.md","/%E6%9C%8D%E5%8A%A1%E7%AB%AF/Nginx/README.md"]],["v-287f093c","/%E7%A7%BB%E5%8A%A8%E7%AB%AF/Flutter/",{d:1672025329e3,e:`<h1> Flutter</h1>
`,r:{minutes:0,words:1},y:"a",t:"Flutter"},["/移动端/Flutter/","/移动端/Flutter/README.md","/%E7%A7%BB%E5%8A%A8%E7%AB%AF/Flutter/README.md"]],["v-5886c4c8","/%E7%A7%BB%E5%8A%A8%E7%AB%AF/ReactNative/",{d:1672025329e3,e:`<h1> ReactNative</h1>
`,r:{minutes:0,words:1},y:"a",t:"ReactNative"},["/移动端/ReactNative/","/移动端/ReactNative/README.md","/%E7%A7%BB%E5%8A%A8%E7%AB%AF/ReactNative/README.md"]],["v-7a7e1996","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%9F%BA%E7%A1%80/BFC.html",{d:1695030229e3,c:"CSS基础",g:["CSS"],e:`<h1> 块级格式化上下文（BFC）</h1>
<p>如果一个元素具有 BFC ，则不会影响到外部元素。</p>
<ul>
<li>BFC 元素不会产生 <code>margin</code> 重叠。</li>
<li>BFC 元素可以用来清除 <code>float</code> 的影响。如果不清楚子元素 <code>float</code> ，则会造成父元素高度塌陷，会影响到后面元素布局和定位。</li>
</ul>
<h2> 触发 BFC 常见情况</h2>
<ul>
<li><code>&lt;html&gt;</code> 根元素</li>
<li><code>float</code> 的值 【<strong>不为</strong>】 <code>none</code></li>
<li><code>overflow</code> 的值 【<strong>为</strong>】 <code>auto</code>、 <code>scroll</code> 或 <code>hidden</code></li>
<li><code>display</code> 的值 【<strong>为</strong>】 <code>table-cell</code>、 <code>table-caption</code> 和 <code>inline-block</code> 中的任何一个</li>
<li><code>position</code> 的值 【<strong>不为</strong>】 <code>relative</code> 和 <code>static</code></li>
</ul>`,r:{minutes:2.71,words:812},y:"a",t:"块级格式化上下文（BFC）"},["/前端/CSS/CSS基础/BFC.html","/前端/CSS/CSS基础/BFC.md",":md"]],["v-3006fe90","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%9F%BA%E7%A1%80/float.html",{d:1695030229e3,c:"CSS基础",g:["CSS"],e:`<h1> float / clear</h1>
<h2> float 的本质与特征</h2>
<p><code>float</code> 的本质是为了<strong>实现文字环绕效果</strong>。主要指文字环绕图片的效果。</p>
<p><code>float</code> 的特征:</p>
<ul>
<li>
<p>包裹性：由 “包裹” 和 “自适应性” 两部分组成</p>
<ul>
<li>
<p>包裹</p>
<p>假设 <code>float</code> 元素的父元素宽度为 200px，<code>float</code> 元素的子元素为 <code>width: 100px</code> 的图片，则此时 <code>float</code> 元素宽度表现为 “包裹”，宽度为 100px 。</p>

</li>
<li>
<p>自适应性</p>
<p>假设 <code>float</code> 元素的父元素宽度为 200px，<code>float</code> 元素的子元素包括图片和文字，则此时 <code>float</code> 元素宽度自适应父元素的宽度 200px 。</p>
<p>如果需要最大宽度自适应 <code>float</code> 元素的父元素宽度，则 <code>float</code> 元素宽度的 “首选最小宽度” 比父元素宽度小的前提下。</p>
<p>【注】首选最小宽度是指元素最合适的最小宽度。CSS 中，图片和文字的权重远大于布局，当 <code>width: 0</code> ，此时所表现的宽度就是 “首选最小宽度” 。具体表现规则如下：</p>
<ul>
<li>东亚文字（如中文）最小宽度为每个汉字的宽度</li>
<li>西方文字最小宽度由特定的连续的英文字符单元决定</li>
<li>类似图片等的替换元素的最小宽度就是该元素内容本身的宽度</li>
</ul>

</li>
</ul>
</li>
<li>
<p>块状化并格式化上下文</p>
<p>元素设置 <code>float</code> 属性值不为 <code>none</code>，则其 <code>display</code> 计算值为 <code>block / table</code> 。则：</p>
<ul>
<li><code>text-align</code> 属性无法控制 <code>float</code> 元素的左右对齐，<code>text-align</code> 对块级元素无效</li>
<li><code>display: block; float: left;</code> 组合中，<code>display: block</code> 是多余的</li>
<li><code>float: left; vertical-align: middle;</code> 组合中，<code>vertical-align: middle;</code> 是多余的。</li>
</ul>
<p>【注】 <code>vertical-align</code> 属性定义<strong>行内元素</strong>的基线相对于该元素所在行的基线的垂直对齐。</p>
</li>
<li>
<p>破坏文档流</p>
</li>
<li>
<p>没有任何 <code>margin</code> 合并</p>
</li>
</ul>`,r:{minutes:8.46,words:2539},y:"a",t:"float / clear"},["/前端/CSS/CSS基础/float.html","/前端/CSS/CSS基础/float.md",":md"]],["v-15a85434","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%9F%BA%E7%A1%80/line-height.html",{d:1695030229e3,c:"CSS基础",g:["CSS"],e:`<h1> line-height</h1>
<h2> line-height 属性值</h2>
<ul>
<li>
<p><code>normal</code> : 默认值。和 <code>font-family</code> 密切关联的变量值。不同系统不同浏览器的默认 <code>line-height</code> 都有差异，需要进行重置。</p>
<table>
<thead>
<tr>
<th style="text-align:center">字体</th>
<th style="text-align:center">Chrome</th>
<th style="text-align:center">Firefox</th>
<th style="text-align:center">IE</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">微软雅黑</td>
<td style="text-align:center">1.32</td>
<td style="text-align:center">1.321</td>
<td style="text-align:center">1.32</td>
</tr>
<tr>
<td style="text-align:center">宋体</td>
<td style="text-align:center">1.141</td>
<td style="text-align:center">1.142</td>
<td style="text-align:center">1.141</td>
</tr>
</tbody>
</table>
</li>
<li>
<p><code>数值</code> : 其最终计算值是和当前 <code>font-size</code> 相乘后的值。比如： <code>line-height: 1.5</code></p>
</li>
<li>
<p><code>百分值</code> : 其最终计算值是和当前 <code>font-size</code> 相乘后的值。比如： <code>line-height: 150%</code></p>
</li>
<li>
<p><code>长度值（带单位的数值）</code> : 如 <code>line-height: 21px</code> 或者 <code>line-height: 1.5em</code> 等</p>
</li>
</ul>`,r:{minutes:7.23,words:2170},y:"a",t:"line-height"},["/前端/CSS/CSS基础/line-height.html","/前端/CSS/CSS基础/line-height.md",":md"]],["v-65a77d50","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%9F%BA%E7%A1%80/vertical-align.html",{d:1695030229e3,c:"CSS基础",g:["CSS"],e:`<h1> vertical-align</h1>
<p><code>vertical-align</code> 起作用的前提条件是：只能应用于 <strong>内联元素</strong> 以及设置 <strong><code>display: inline / inline-block / inine-table / table-cell</code> 的元素上</strong>。</p>
<h2> vertical-align 属性值</h2>
<ul>
<li>线类
<ul>
<li>baseline : 默认值。元素放置在父元素的基线上。</li>
<li>top : 把元素的顶端与行中最高元素的顶端对齐</li>
<li>middle : 把此元素放置在父元素的中部。</li>
<li>bottom : 把元素的顶端与行中最低的元素的顶端对齐。</li>
</ul>
</li>
<li>文本类
<ul>
<li>text-top : 把元素的顶端与父元素字体的顶端对齐</li>
<li>text-bottom : 把元素的底端与父元素字体的底端对齐。</li>
</ul>
</li>
<li>上标下标类
<ul>
<li>sub : 垂直对齐文本的下标。</li>
<li>super : 垂直对齐文本的上标</li>
</ul>
</li>
<li>数值百分比类 : 比如 20px、 2em、 20% 等。根据计算值的不同，相对于基线往上或往下偏移（取决于 <code>vertical-align</code> 计算值的正负）。</li>
</ul>`,r:{minutes:10.4,words:3121},y:"a",t:"vertical-align"},["/前端/CSS/CSS基础/vertical-align.html","/前端/CSS/CSS基础/vertical-align.md",":md"]],["v-41b5b0bc","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%9F%BA%E7%A1%80/x-height.html",{d:1695030229e3,c:"CSS基础",g:["CSS"],e:`<h1> x-height</h1>
<p><a href="https://zh.wikipedia.org/wiki/X%E5%AD%97%E9%AB%98" target="_blank" rel="noopener noreferrer">x 字高</a>： 指字母 x 的高度。即：基线（baseline）和主线（median line）之间的距离。</p>
<p></p>
<p>注：<code>verticalalign: middle</code> 与字母中线（median）不是一个意思，<code>verticalalign: middle</code> 指的是基线（baseline）往上 1/2 <code>x-height</code> 高度。</p>`,r:{minutes:.83,words:250},y:"a",t:"x-height"},["/前端/CSS/CSS基础/x-height.html","/前端/CSS/CSS基础/x-height.md",":md"]],["v-2ff96c77","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%9F%BA%E7%A1%80/%E5%86%85%E8%81%94%E5%85%83%E7%B4%A0.html",{d:1695030229e3,c:"CSS基础",g:["CSS"],e:`<h1> 内联元素</h1>
<p>“内联元素” 的 “内联” 特指 “外在的盒子”，与 <code>display</code> 为 <code>inline</code> 的元素不是一个概念！</p>
<p>“内联元素” 的特征是：<strong>可以和文字在一行显示</strong>。文字、图片、按钮、输入框、下拉框等原生表单控件都是内联元素。</p>
<h2> 内联盒模型</h2>
<p></p>
<h2> 幽灵空白节点</h2>
<p>在 HTML5 文档声明中，内联元素的所有解析和渲染表现就如同每个行框盒子的前面有一个 “空白节点” 一样。这个 “空白节点” 永远透明，不占据任何宽度。</p>`,r:{minutes:1.03,words:309},y:"a",t:"内联元素"},["/前端/CSS/CSS基础/内联元素.html","/前端/CSS/CSS基础/内联元素.md",":md"]],["v-21eed46d","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%B8%83%E5%B1%80/Flex%E5%B8%83%E5%B1%80.html",{d:1695030229e3,c:"CSS布局",g:["CSS","Flex"],e:`<h1> Flex 布局</h1>
<h2> 基本概念</h2>
<p>设置 <code>display: flex</code> 或者 <code>display: inline-flex</code> 的元素称为 Flex 容器，容器中的子元素称为 Flex 项目。</p>
<ul>
<li><code>display: flex</code>：保持元素块状特性，宽度默认 100%，不和内联元素一行显示。</li>
<li><code>display： inline-flex</code>：inline-flex 容器为 inline 特性，因此可以和图片文字一行显示。</li>
</ul>`,r:{minutes:6.79,words:2038},y:"a",t:"Flex 布局"},["/前端/CSS/CSS布局/Flex布局.html","/前端/CSS/CSS布局/Flex布局.md",":md"]],["v-720c3b00","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%B8%83%E5%B1%80/Grid%E5%B8%83%E5%B1%80.html",{d:1695030229e3,c:"CSS布局",g:["CSS","Grid"],e:`<h1> Grid 布局</h1>
<h2> 基本概念</h2>
<p>设置 <code>display: grid</code> 或者 <code>display: inline-grid</code> 的元素称为 Grid 容器，容器内部采用网格定位的子元素称为 Grid 项目。</p>
<ul>
<li><code>display: grid</code>：保持元素块状特性，宽度默认 100%，不和内联元素一行显示。</li>
<li><code>display: inline-grid</code>：inline-grid 容器为 inline 特性，因此可以和图片文字一行显示。</li>
<li><code>display: subgrid</code>：如果网格容器本身就是一个嵌套网格，可以使用该属性来表示从它的父节点取得它的行/列的大小，而不是指定它自己的大小。</li>
</ul>`,r:{minutes:9.58,words:2874},y:"a",t:"Grid 布局"},["/前端/CSS/CSS布局/Grid布局.html","/前端/CSS/CSS布局/Grid布局.md",":md"]],["v-4c4838f4","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%B8%83%E5%B1%80/StickyFooter.html",{d:1695030229e3,c:"CSS布局",g:["CSS"],e:`<h1> Sticky Footer</h1>
<ul>
<li>如果页面内容不足够长时，页脚固定在浏览器窗口的底部。</li>
<li>如果页面内容足够长时，页脚固定在页面的最底部。但如果页面内容不够长，置底的页脚就会保持在浏览器窗口底部。</li>
</ul>
<p></p>
<h2> 将内容部分的底部外边距设为负数</h2>
<p>把内容部分最小高度设为100%，再利用内容部分的负底部外边距值来达到当高度不满时，页脚保持在窗口底部，当高度超出则随之推出的效果。</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wrapper<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
    content
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>push<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>footer</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>footer<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>footer</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">html, body</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.wrapper</span> <span class="token punctuation">{</span>
  <span class="token property">min-height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">margin-bottom</span><span class="token punctuation">:</span> -50px<span class="token punctuation">;</span> <span class="token comment">/* 等于footer的高度 */</span>
<span class="token punctuation">}</span>

<span class="token selector">.footer, .push</span> <span class="token punctuation">{</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:2.47,words:740},y:"a",t:"Sticky Footer"},["/前端/CSS/CSS布局/StickyFooter.html","/前端/CSS/CSS布局/StickyFooter.md",":md"]],["v-47d8203e","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%B8%83%E5%B1%80/%E5%85%A8%E5%B1%8F%E5%B8%83%E5%B1%80.html",{d:1695030229e3,c:"CSS布局",g:["CSS"],e:`<h1> 全屏布局</h1>
<h2> position</h2>

<h2> Flex</h2>

<h2> Grid</h2>

`,r:{minutes:2.04,words:612},y:"a",t:"全屏布局"},["/前端/CSS/CSS布局/全屏布局.html","/前端/CSS/CSS布局/全屏布局.md",":md"]],["v-f50e88c6","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%B8%83%E5%B1%80/%E5%A4%9A%E5%88%97%E5%B8%83%E5%B1%80.html",{d:1695030229e3,c:"CSS布局",g:["CSS"],e:`<h1> 多列布局</h1>
<h2> 两列布局</h2>
<h3> 左列定宽，右列自适应</h3>
<h4> float + margin</h4>

<h4> float + margin(fix)</h4>

<h4> float + overflow</h4>
<ul>
<li>优点：代码简单，容易理解，无需关注定宽的宽度，利用 BFC 达到自适应效果</li>
<li>缺点：浮动脱离文档流，需要手动清除浮动，否则会产生高度塌陷；不支持 IE6</li>
</ul>

<h4> position</h4>

<h4> Flex</h4>

<h4> Grid</h4>

<h4> table</h4>`,r:{minutes:18.33,words:5498},y:"a",t:"多列布局"},["/前端/CSS/CSS布局/多列布局.html","/前端/CSS/CSS布局/多列布局.md",":md"]],["v-7d830ca2","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%B8%83%E5%B1%80/%E6%A0%85%E6%A0%BC%E5%B8%83%E5%B1%80.html",{d:1695030229e3,c:"CSS布局",g:["CSS"],e:`<h1> 栅格布局</h1>
<div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token comment">/*生成栅格系统*/</span>

<span class="token atrule">@media screen and <span class="token punctuation">(</span>max-width<span class="token punctuation">:</span> 768px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token mixin-usage function">.generate-columns</span><span class="token punctuation">(</span>12<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">/*此处设置生成列数*/</span>
  <span class="token selector">.generate-columns(<span class="token variable">@n</span>, <span class="token variable">@i</span>: 1) when (<span class="token variable">@i</span> &lt;= <span class="token variable">@n</span>)</span> <span class="token punctuation">{</span>
    <span class="token selector">.column-xs-@{i}</span> <span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token variable">@i</span> <span class="token operator">*</span> 100% <span class="token operator">/</span> <span class="token variable">@n</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    .<span class="token function">generate-columns</span><span class="token punctuation">(</span><span class="token variable">@n</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token variable">@i</span><span class="token operator">+</span>1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token atrule">@media screen and <span class="token punctuation">(</span>min-width<span class="token punctuation">:</span> 768px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
  <span class="token mixin-usage function">.generate-columns</span><span class="token punctuation">(</span>12<span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">/*此处设置生成列数*/</span>
  <span class="token selector">.generate-columns(<span class="token variable">@n</span>, <span class="token variable">@i</span>: 1) when (<span class="token variable">@i</span> &lt;= <span class="token variable">@n</span>)</span> <span class="token punctuation">{</span>
    <span class="token selector">.column-sm-@{i}</span> <span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token variable">@i</span> <span class="token operator">*</span> 100% <span class="token operator">/</span> <span class="token variable">@n</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    .<span class="token function">generate-columns</span><span class="token punctuation">(</span><span class="token variable">@n</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token variable">@i</span><span class="token operator">+</span>1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">div[class^="column-xs-"]</span> <span class="token punctuation">{</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">div[class^="column-sm-"]</span> <span class="token punctuation">{</span>
  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:.88,words:264},y:"a",t:"栅格布局"},["/前端/CSS/CSS布局/栅格布局.html","/前端/CSS/CSS布局/栅格布局.md",":md"]],["v-4d050f5a","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%B8%83%E5%B1%80/%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD.html",{d:1695030229e3,c:"CSS布局",g:["CSS"],e:`<h1> 水平垂直居中布局</h1>
<h2> 水平居中</h2>
<ul>
<li>对于水平居中，应先考虑，哪些元素有自带的居中效果。 <code>text-align:center</code> 针对行内内容，必须将子元素设置为 <code>display: inline;</code> 或者 <code>display: inline-block;</code></li>
<li>其次就是考虑能不能用 <code>margin: 0 auto;</code></li>
<li>实在不行就是使用绝对定位实现</li>
<li>移动端能用 <code>flex</code> ，简单方便，灵活并且功能强大</li>
</ul>`,r:{minutes:17.78,words:5335},y:"a",t:"水平垂直居中布局"},["/前端/CSS/CSS布局/水平垂直居中.html","/前端/CSS/CSS布局/水平垂直居中.md",":md"]],["v-61734615","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%B8%83%E5%B1%80/%E8%87%AA%E9%80%82%E5%BA%94%E5%B8%83%E5%B1%80.html",{d:1695030229e3,c:"CSS布局",g:["CSS"],e:`<h1> 自适应布局</h1>
<p>注意事项</p>
<ul>
<li>使用 IE 盒模型 <code>box-sizing: broder-box;</code></li>
<li>不固定宽高，使用百分比、 <code>auto</code> 或 <code>calc()</code></li>
<li>使用 <code>@media</code> 查询，针对不同媒体类型定义不同的样式</li>
<li>使用 <code>&lt;meta&gt;</code> 标签对 <code>viewport</code> （可视区域） 进行控制</li>
<li>选择布局方式
<ul>
<li>在浏览器支持的情况下，页面大框架推荐使用 Grid 布局 ，局部布局推荐使用 Flex 布局</li>
<li><code>float</code> 与 <code>inline-block</code> 浏览器支持好，但是各有缺点</li>
</ul>
</li>
</ul>`,r:{minutes:1.39,words:418},y:"a",t:"自适应布局"},["/前端/CSS/CSS布局/自适应布局.html","/前端/CSS/CSS布局/自适应布局.md",":md"]],["v-57ec9a83","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%B8%83%E5%B1%80/%E9%A1%B5%E9%9D%A2%E7%AD%89%E6%AF%94%E9%80%82%E9%85%8D.html",{d:1695030229e3,e:`<h1> 页面等比缩放</h1>
<h2> vueAutoResizeContainer 组件</h2>
<div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>/docs/.vuepress/components/vue2/vueAutoResizeContainer
  | --- index.vue
  | --- autoResize.js
  | --- util
  |      | --- index.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:2.93,words:878},y:"a",t:"页面等比缩放"},["/前端/CSS/CSS布局/页面等比适配.html","/前端/CSS/CSS布局/页面等比适配.md",":md"]],["v-5eab4c22","/%E5%89%8D%E7%AB%AF/CSS/CSS%E7%9B%B8%E5%85%B3/CSS%E5%AE%9E%E7%8E%B0%E9%95%BF%E5%AE%BD%E6%AF%94.html",{d:1695030229e3,e:`<h1> CSS实现长宽比</h1>
<h2> 垂直方向的 padding</h2>
<p>原理：利用 <code>padding-top</code> 或者 <code>padding-bottom</code> 的百分比值。在 CSS 中，<code>padding-top</code> 或者 <code>padding-bottom</code> 的百分比是根据容器的 <code>width</code> 来计算的。</p>
<p>【注意】 需要把容器的 <code>height: 0</code> ，容器内容中所有的元素需要采用 <code>position: absolute</code> ，不然子元素内容会被 <code>padding</code> 挤出容器，造成内容溢出。</p>`,r:{minutes:4.32,words:1295},y:"a",t:"CSS实现长宽比"},["/前端/CSS/CSS相关/CSS实现长宽比.html","/前端/CSS/CSS相关/CSS实现长宽比.md",":md"]],["v-7094c4e3","/%E5%89%8D%E7%AB%AF/CSS/CSS%E7%9B%B8%E5%85%B3/CSS%E5%B8%B8%E7%94%A8%E5%B0%81%E8%A3%85.html",{d:1695030229e3,e:`<h1> CSS 常用封装</h1>
<h2> 文本超出 n行 显示省略号</h2>
<div class="language-less line-numbers-mode" data-ext="less"><pre class="language-less"><code><span class="token comment">// 超过固定宽度显示 ...</span>
<span class="token selector">.ellipsis ()</span> <span class="token punctuation">{</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> nowrap<span class="token punctuation">;</span> <span class="token comment">// 禁止文字折行</span>
  <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span> <span class="token comment">// 当文本溢出时显示省略标记</span>
<span class="token punctuation">}</span>

<span class="token comment">// 超过 @row 显示 ...</span>
<span class="token selector">.ellipsis_line (<span class="token variable">@row</span>: 2)</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> <span class="token operator">-</span>webkit<span class="token operator">-</span>box<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">text-overflow</span><span class="token punctuation">:</span> ellipsis<span class="token punctuation">;</span>
  <span class="token property">word-break</span><span class="token punctuation">:</span> break<span class="token operator">-</span>all<span class="token punctuation">;</span>
  <span class="token property">white-space</span><span class="token punctuation">:</span> pre<span class="token operator">-</span>line<span class="token punctuation">;</span>
  <span class="token comment">/* autoprefixer: off */</span>
  <span class="token property">-webkit-box-orient</span><span class="token punctuation">:</span> vertical<span class="token punctuation">;</span>
  <span class="token comment">/* autoprefixer: on */</span>
  <span class="token property">-webkit-line-clamp</span><span class="token punctuation">:</span> <span class="token variable">@row</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:2.63,words:790},y:"a",t:"CSS 常用封装"},["/前端/CSS/CSS相关/CSS常用封装.html","/前端/CSS/CSS相关/CSS常用封装.md",":md"]],["v-1c65c6c7","/%E5%89%8D%E7%AB%AF/JavaScript/BOM/file.html",{d:1698290835e3,e:`<h1> Blob、File、FileList、FileReader、Base64</h1>
<p></p>
<h2> Blob</h2>
<p><code>Blob</code> 对象（Binary Large Object，二进制大型对象）表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成 <code>ReadableStream</code> 来用于数据操作。</p>
<h3> Blob 构造函数</h3>
<p><code>new Blob(array, options)</code> ： 返回一个新的 <code>Blob</code> 对象。</p>`,r:{minutes:7.75,words:2324},y:"a",t:"Blob、File、FileList、FileReader、Base64"},["/前端/JavaScript/BOM/file.html","/前端/JavaScript/BOM/file.md",":md"]],["v-1671a938","/%E5%89%8D%E7%AB%AF/JavaScript/BOM/navigator.html",{d:1699632281e3,e:`<h1> navigator 对象，screen 对象</h1>
<h2> navigator 对象</h2>
<p>Navigator 接口表示用户代理的状态和标识，包含浏览器和系统信息。它允许脚本查询它和注册自己进行一些活动。</p>
<h3> navigator 属性</h3>
<ul>
<li><code>navigator.permissions</code> ： 只读属性。返回一个权限对象，可用于查询和更新权限 API 所涵盖 API 的权限状态。</li>
<li><code>navigator.userAgent</code> ： 返回浏览器的 User Agent 字符串，表示用户设备信息，包含了浏览器的厂商、版本、操作系统等信息。</li>
<li><code>navigator.cookieEnabled</code> ： 只读属性。返回一个布尔值，来表示当前页面是否启用了 <code>cookie</code> 。</li>
<li><code>navigator.onLine</code> ： 返回浏览器的联机状态的布尔值，<code>true</code> 表示在线，<code>false</code> 表示离线。只要浏览器连接网络的能力发生变化，该属性就会发送更新。</li>
<li><code>navigator.language</code> ： 只读属性。返回一个表示用户偏好语言（通常是浏览器界面语言）的字符串。</li>
<li><code>navigator.languages</code> ： 只读属性。返回代表用户首选语言的字符串数组。</li>
<li><code>navigator.geolocation</code> ： 只读属性。返回一个 <code>Geolocation</code> 对象，通过这个对象可以访问到设备的位置信息。
<ul>
<li><code>navigator.geolocation.getCurrentPosition(success, error, options)</code> ： 确定设备的位置并返回一个携带位置信息的 Position 对象。</li>
<li><code>navigator.geolocation.watchPosition(success, error, options)</code> ： 注册监听器，在设备的地理位置发生改变的时候自动被调用。每当设备位置改变时，返回一个 long 类型的该监听器的 ID 值。</li>
<li><code>navigator.geolocation.clearWatch(id)</code> ： 注销使用 <code>geolocation.watchPosition()</code> 注册的位置监听器或错误监听器。</li>
</ul>
</li>
<li><code>navigator.clipboard</code> ： 返回一个可以读写剪切板内容的 <code>Clipboard</code> 对象。
<ul>
<li><code>navigator.clipboard.read()</code> ： 从剪贴板读取数据（比如图片），返回一个 <code>Promise</code> 对象。在检索到数据后，<code>Promise</code> 将兑现一个 <code>ClipboardItem</code> 对象的数组来提供剪切板数据。</li>
<li><code>navigator.clipboard.readText()</code> ： 从操作系统读取文本，返回一个 <code>Promise</code> 对象。在从剪切板中检索到文本后，<code>Promise</code> 将兑现一个包含剪切板文本数据的 DOMString。</li>
<li><code>navigator.clipboard.write()</code> ： 写入任意数据至操作系统剪贴板。异步操作，在操作完成后，返回的 <code>Promise</code> 的将被兑现。</li>
<li><code>navigator.clipboard.writeText()</code> ： 写入文本至操作系统剪贴板，返回一个 <code>Promise</code> 对象。在文本被完全写入剪切板后，返回的 <code>Promise</code> 将被兑现。</li>
</ul>
</li>
<li>.....</li>
</ul>`,r:{minutes:3.17,words:951},y:"a",t:"navigator 对象，screen 对象"},["/前端/JavaScript/BOM/navigator.html","/前端/JavaScript/BOM/navigator.md",":md"]],["v-35eb2514","/%E5%89%8D%E7%AB%AF/JavaScript/BOM/storage.html",{d:1698162204e3,e:`<h1> Storage</h1>
<h2> sessionStorage 和 localStorage</h2>
<p>Storage 提供了访问特定域名下的会话存储或本地存储的功能，数据存储大小为 5M 。例如，可以添加、修改或删除存储的数据项。</p>
<ul>
<li>
<p><code>window.sessionStorage</code> ： 操作一个域名的会话存储。当会话结束（通常是窗口关闭），数据会被清空。</p>
</li>
<li>
<p><code>window.localStorage</code> ： 操作一个域名的本地存储，数据长期存储。</p>
</li>
</ul>`,r:{minutes:22.04,words:6612},y:"a",t:"Storage"},["/前端/JavaScript/BOM/storage.html","/前端/JavaScript/BOM/storage.md",":md"]],["v-20bf9dc0","/%E5%89%8D%E7%AB%AF/JavaScript/BOM/URL.html",{d:1698046341e3,e:`<h1> location 对象、history 对象与 URL</h1>
<h2> location 对象</h2>
<p><code>location</code> 对象提供 URL 相关的信息和操作方法。可以通过 <code>window.location</code> 和 <code>document.location</code> 属性获取。</p>
<h3> location 对象属性</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href <span class="token operator">=</span> <span class="token string">'https://username:password@developer.mozilla.org/en-US/search?q=URL#search-results-close-container'</span>

<span class="token comment">// 整个 URL</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>href <span class="token comment">// 'https://username:password@developer.mozilla.org/en-US/search?q=URL#search-results-close-container'</span>

<span class="token comment">// URL 的协议、主机名和端口，只读</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>origin <span class="token comment">// 'https://developer.mozilla.org'</span>

<span class="token comment">// URL 对应协议，包含冒号（:）</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>protocol <span class="token comment">// 'https:'</span>

<span class="token comment">// 主机，如果端口不是协议默认的 80 和 433，则还包括冒号（:）和端口</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>host <span class="token comment">// 'developer.mozilla.org'</span>

<span class="token comment">// 主机名，不包括端口</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>hostname <span class="token comment">// 'developer.mozilla.org'</span>

<span class="token comment">// 端口号</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>port <span class="token comment">// ''</span>

<span class="token comment">// URL 的路径部分，从根路径 / 开始</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>pathname <span class="token comment">// '/en-US/search'</span>

<span class="token comment">// URL 参数，从问号 ? 开始。</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>search <span class="token comment">// '?q=javascript'</span>

<span class="token comment">// 块标识符，从 # 开始</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>hash <span class="token comment">// '#search-results-close-container'</span>

<span class="token comment">// URL 中域名前的用户名</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>username <span class="token comment">// 'username'</span>

<span class="token comment">// URL 域名前的密码</span>
document<span class="token punctuation">.</span>location<span class="token punctuation">.</span>password <span class="token comment">// 'password'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:11.87,words:3562},y:"a",t:"location 对象、history 对象与 URL"},["/前端/JavaScript/BOM/URL.html","/前端/JavaScript/BOM/URL.md",":md"]],["v-7bd0135a","/%E5%89%8D%E7%AB%AF/JavaScript/BOM/window.html",{d:1699632281e3,e:`<h1> window 对象</h1>
<h2> window 对象属性</h2>
<h3> window.name</h3>
<p><code>window.name</code> ： 获取/设置窗口的名称（只能保存字符串，如写入不是字符串，会自动转成字符串）。主要用于为超链接和表单设置目标（targets），窗口不需要有名称。</p>
<p>只要浏览器窗口不关闭，这个属性是不会消失的。访问 a.com 时，该页面的脚本设置了 <code>window.name</code> ，在同一个窗口里面载入 b.com，新页面的脚本可以读到上一个网页设置的 <code>window.name</code>。页面刷新也是这种情况。一旦浏览器窗口关闭后，该属性保存的值就会消失，因为这时窗口已经不存在了。</p>`,r:{minutes:15.52,words:4657},y:"a",t:"window 对象"},["/前端/JavaScript/BOM/window.html","/前端/JavaScript/BOM/window.md",":md"]],["v-ffa7a9c8","/%E5%89%8D%E7%AB%AF/JavaScript/Canvas/canvas%E4%BC%98%E5%8C%96.html",{d:1699632281e3,c:"Canvas",g:["Canvas"],e:`<h1> Canvas 优化</h1>
<h2> 在离屏 canvas 上预渲染相似的图形或重复的对象</h2>
<p>如果发现在每个动画帧上重复了一些相同的绘制操作，请考虑将其分流到屏幕外的画布上。 然后，可以根据需要频繁地将屏幕外图像渲染到主画布上，而不必首先重复生成该图像的步骤。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>myEntity<span class="token punctuation">.</span>offscreenCanvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">"canvas"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
myEntity<span class="token punctuation">.</span>offscreenCanvas<span class="token punctuation">.</span>width <span class="token operator">=</span> myEntity<span class="token punctuation">.</span>width<span class="token punctuation">;</span>
myEntity<span class="token punctuation">.</span>offscreenCanvas<span class="token punctuation">.</span>height <span class="token operator">=</span> myEntity<span class="token punctuation">.</span>height<span class="token punctuation">;</span>
myEntity<span class="token punctuation">.</span>offscreenContext <span class="token operator">=</span> myEntity<span class="token punctuation">.</span>offscreenCanvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">"2d"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

myEntity<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>myEntity<span class="token punctuation">.</span>offscreenContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:2.96,words:888},y:"a",t:"Canvas 优化"},["/前端/JavaScript/Canvas/canvas优化.html","/前端/JavaScript/Canvas/canvas优化.md",":md"]],["v-29164ffb","/%E5%89%8D%E7%AB%AF/JavaScript/Canvas/canvas%E4%BD%BF%E7%94%A8%E5%9B%BE%E5%83%8F.html",{d:1699632281e3,c:"Canvas",g:["Canvas"],e:`<h1> Canvas 使用图像</h1>
<p>引入图像到 canvas 中的基本操作：</p>
<ul>
<li>获得一个指向 <code>HTMLImageElement</code> 的对象或者另一个 <code>canvas</code> 元素的引用作为源，也可以通过提供一个 URL 的方式来使用图片</li>
<li>使用 <code>drawImage()</code> 函数将图片绘制到画布上</li>
</ul>
<h2> 获取绘制的图片</h2>
<p>canvas 可以使用作为图片的源的类型：</p>
<ul>
<li><code>HTMLImageElement</code> : 由 <code>Image()</code> 函数构造出来，或者任何的 <code>&lt;img&gt;</code> 元素。</li>
<li><code>HTMLVideoElement</code> : 用一个 HTML 的 <code>&lt;video&gt;</code> 元素作为图片源，可以从视频中抓取当前帧作为一个图像。</li>
<li><code>HTMLCanvasElement</code> : 使用另一个 <code>&lt;canvas&gt;</code> 元素作为图片源。</li>
<li><code>ImageBitmap</code> : 一个高性能的位图，可以低延迟地绘制，它可以从上述的所有源以及其它几种源中生成。</li>
</ul>`,r:{minutes:6.65,words:1996},y:"a",t:"Canvas 使用图像"},["/前端/JavaScript/Canvas/canvas使用图像.html","/前端/JavaScript/Canvas/canvas使用图像.md",":md"]],["v-d93841de","/%E5%89%8D%E7%AB%AF/JavaScript/Canvas/canvas%E5%83%8F%E7%B4%A0%E6%93%8D%E4%BD%9C.html",{d:1699632281e3,c:"Canvas",g:["Canvas"],e:`<h1> Canvas 像素操作</h1>
<h2> ImageData 对象</h2>
<p><code>ImageData</code> 接口描述 <code>&lt;canvas&gt;</code> 元素的一个隐含像素数据的区域。</p>
<h3> 属性</h3>
<ul>
<li><code>ImageData.data</code> : 只读。<code>Uint8ClampedArray</code> 描述了一个一维数组，包含以 <code>RGBA</code> 顺序的数据，数据使用 <code>0</code> 至 <code>255</code>（包含）的整数表示。</li>
<li><code>ImageData.height</code> : 只读。无符号长整型（unsigned long），使用像素描述 <code>ImageData</code> 的实际高度。</li>
<li><code>ImageData.width</code> : 只读。无符号长整型（unsigned long），使用像素描述 <code>ImageData</code> 的实际宽度。</li>
</ul>`,r:{minutes:5.92,words:1775},y:"a",t:"Canvas 像素操作"},["/前端/JavaScript/Canvas/canvas像素操作.html","/前端/JavaScript/Canvas/canvas像素操作.md",":md"]],["v-dd57719a","/%E5%89%8D%E7%AB%AF/JavaScript/Canvas/canvas%E5%8F%98%E5%BD%A2.html",{d:1699632281e3,c:"Canvas",g:["Canvas"],e:`<h1> Canvas 变形</h1>
<h2> 状态的保存和恢复 Saving and restoring state</h2>
<ul>
<li>
<p><code>save()</code> : 通过将当前状态放入栈中，保存 canvas 全部状态的方法。保存到栈中的绘制状态有下面部分组成：</p>
<ul>
<li>当前的变换矩阵。</li>
<li>当前的剪切区域。</li>
<li>当前的虚线列表.</li>
<li>以下属性当前的值： <code>strokeStyle</code>, <code>fillStyle</code>, <code>globalAlpha</code>, <code>lineWidth</code>, <code>lineCap</code>, <code>lineJoin</code>, <code>miterLimit</code>, <code>lineDashOffset</code>, <code>shadowOffsetX</code>, <code>shadowOffsetY</code>, <code>shadowBlur</code>, <code>shadowColor</code>, <code>globalCompositeOperation</code>, <code>font</code>, <code>textAlign</code>, <code>textBaseline</code>, <code>direction</code>, <code>imageSmoothingEnabled</code></li>
</ul>
</li>
<li>
<p><code>restore()</code> : 恢复画布(canvas)状态。在绘图状态栈中弹出顶端的状态，将 canvas 恢复到最近的保存状态的方法。如果没有保存状态，此方法不做任何改变。</p>
</li>
</ul>`,r:{minutes:4.09,words:1226},y:"a",t:"Canvas 变形"},["/前端/JavaScript/Canvas/canvas变形.html","/前端/JavaScript/Canvas/canvas变形.md",":md"]],["v-45bae330","/%E5%89%8D%E7%AB%AF/JavaScript/Canvas/canvas%E5%90%88%E6%88%90%E4%B8%8E%E8%A3%81%E5%89%AA.html",{d:1699632281e3,c:"Canvas",g:["Canvas"],e:`<h1> Canvas 合成与裁剪</h1>
<h2> globalCompositeOperation 设置图像混合模式</h2>
<p><code>globalCompositeOperation = type</code> : 设置 Canvas 图形的混合模式。</p>

<h2> clip() 裁切路径</h2>
<p><code>clip(fillRule)</code> : 路径剪裁。使用的时候，先绘制剪裁路径，执行 <code>clip()</code> 方法，再绘制的内容就在这个剪裁路径中呈现。</p>
<ul>
<li><code>fillRule</code> : 填充规则。
<ul>
<li><code>nonzero</code>: 非零环绕原则，默认的原则。</li>
<li><code>evenodd</code>: 奇偶环绕原则。</li>
</ul>
</li>
</ul>`,r:{minutes:5.65,words:1695},y:"a",t:"Canvas 合成与裁剪"},["/前端/JavaScript/Canvas/canvas合成与裁剪.html","/前端/JavaScript/Canvas/canvas合成与裁剪.md",":md"]],["v-fc72bcde","/%E5%89%8D%E7%AB%AF/JavaScript/Canvas/canvas%E5%9F%BA%E6%9C%AC%E5%8A%A8%E7%94%BB.html",{d:1699632281e3,c:"Canvas",g:["Canvas","动画"],e:`<h1> Canvas 基本动画</h1>
<h2> 动画的基本步骤</h2>
<ul>
<li><strong>清空 canvas</strong> ： 如果存在绘制的内容会完全清空 canvas （例如：背景图），否则需要清空所有。最简单的做法是使用 <code>cleanRect()</code> 方法。</li>
<li><strong>保存 canvas 状态</strong> : 如果一些设置（样式、变形之类的）会改变 canvas 状态，而在画每一帧的时候是原始状态，则需要使用 <code>save()</code> 方法先保存一下。</li>
<li><strong>绘制动画图形（animated shapes）</strong> : 重绘动画帧。</li>
<li><strong>恢复 canvas 状态</strong> : 如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。</li>
</ul>`,r:{minutes:6.47,words:1942},y:"a",t:"Canvas 基本动画"},["/前端/JavaScript/Canvas/canvas基本动画.html","/前端/JavaScript/Canvas/canvas基本动画.md",":md"]],["v-9f4befce","/%E5%89%8D%E7%AB%AF/JavaScript/Canvas/canvas%E5%9F%BA%E7%A1%80.html",{d:1699632281e3,c:"Canvas",g:["Canvas"],e:`<h1> Canvas 基础</h1>
<p>Canvas API 提供了一个通过 JavaScript 和 HTML 的 <code>&lt;canvas&gt;</code> 元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。</p>
<h2> Canvas 与 svg 的区别</h2>
<ul>
<li>Canvas 是基于像素的即时模式图形系统，绘制完对象后不保存对象到内存中，当再次需要这个对象时，需要重新绘制</li>
<li>svg 是基于形状的保留模式图形系统，绘制完对象后会将其保存在内存中，当需要修改这个对象信息时，直接修改就可以了。</li>
</ul>`,r:{minutes:3.4,words:1019},y:"a",t:"Canvas 基础"},["/前端/JavaScript/Canvas/canvas基础.html","/前端/JavaScript/Canvas/canvas基础.md",":md"]],["v-ff8bc21e","/%E5%89%8D%E7%AB%AF/JavaScript/Canvas/canvas%E6%B7%BB%E5%8A%A0%E6%A0%B7%E5%BC%8F.html",{d:1699632281e3,c:"Canvas",g:["Canvas"],e:`<h1> Canvas 添加样式</h1>
<h2> 色彩 Colors</h2>
<ul>
<li><code>fillStyle = color</code> 设置图形填充的颜色</li>
<li><code>strokeStyle = color</code> 设置图形轮廓的颜色</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>ctx<span class="token punctuation">.</span>fillStyle <span class="token operator">=</span> <span class="token string">"orange"</span><span class="token punctuation">;</span>
ctx<span class="token punctuation">.</span>fillStyle <span class="token operator">=</span> <span class="token string">"#FFA500"</span><span class="token punctuation">;</span>
ctx<span class="token punctuation">.</span>fillStyle <span class="token operator">=</span> <span class="token string">"rgb(255,165,0)"</span><span class="token punctuation">;</span>
ctx<span class="token punctuation">.</span>fillStyle <span class="token operator">=</span> <span class="token string">"rgba(255,165,0,1)"</span><span class="token punctuation">;</span>

ctx<span class="token punctuation">.</span>strokeStyle <span class="token operator">=</span> <span class="token string">"orange"</span><span class="token punctuation">;</span>
ctx<span class="token punctuation">.</span>strokeStyle <span class="token operator">=</span> <span class="token string">"#FFA500"</span><span class="token punctuation">;</span>
ctx<span class="token punctuation">.</span>strokeStyle <span class="token operator">=</span> <span class="token string">"rgb(255,165,0)"</span><span class="token punctuation">;</span>
ctx<span class="token punctuation">.</span>strokeStyle <span class="token operator">=</span> <span class="token string">"rgba(255,165,0,1)"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:8.02,words:2405},y:"a",t:"Canvas 添加样式"},["/前端/JavaScript/Canvas/canvas添加样式.html","/前端/JavaScript/Canvas/canvas添加样式.md",":md"]],["v-6b104240","/%E5%89%8D%E7%AB%AF/JavaScript/Canvas/canvas%E7%BB%98%E5%88%B6%E5%BD%A2%E7%8A%B6.html",{d:1699632281e3,c:"Canvas",g:["Canvas"],e:`<h1> Canvas 绘制形状</h1>
<h2> 绘制矩形</h2>
<ul>
<li><code>fillRect(x, y, width, height)</code> : 绘制一个填充的矩形。
<ul>
<li><code>x</code> : 矩形起始点的 x 轴坐标</li>
<li><code>y</code> : 矩形起始点的 y 轴坐标</li>
<li><code>width</code> : 矩形的宽度。正值在右侧，负值在左侧。</li>
<li><code>height</code> : 矩形的高度。正值在下，负值在上。</li>
</ul>
</li>
<li><code>strokeRect(x, y, width, height)</code> : 绘制一个矩形的边框。
<ul>
<li><code>x</code> : 矩形起始点的 x 轴坐标</li>
<li><code>y</code> : 矩形起始点的 y 轴坐标</li>
<li><code>width</code> : 矩形的宽度。正值在右侧，负值在左侧。</li>
<li><code>height</code> : 矩形的高度。正值在下，负值在上。</li>
</ul>
</li>
<li><code>clearRect(x, y, width, height)</code> : 清除指定矩形区域，让清除部分完全透明。
<ul>
<li><code>x</code> : 矩形起始点的 x 轴坐标</li>
<li><code>y</code> : 矩形起始点的 y 轴坐标</li>
<li><code>width</code> : 矩形的宽度</li>
<li><code>height</code> : 矩形的高度</li>
</ul>
</li>
</ul>`,r:{minutes:7.24,words:2171},y:"a",t:"Canvas 绘制形状"},["/前端/JavaScript/Canvas/canvas绘制形状.html","/前端/JavaScript/Canvas/canvas绘制形状.md",":md"]],["v-46431f48","/%E5%89%8D%E7%AB%AF/JavaScript/Canvas/canvas%E7%BB%98%E5%88%B6%E6%96%87%E6%9C%AC.html",{d:1699632281e3,c:"Canvas",g:["Canvas"],e:`<h1> Canvas 绘制文本</h1>
<h2> 绘制文本</h2>
<h2> fillText() 填充指定的文本</h2>
<p><code>fillText(text, x, y, [maxWidth])</code> : 在 <code>(x, y)</code> 位置填充文本 <code>text</code> 。如果提供了最大宽度 <code>maxWidth</code> ，文本会进行缩放以适应最大宽度。</p>
<ul>
<li><code>text</code> : 使用当前的 <code>font</code> （绘制文字时，当前字体样式的属性）, <code>textAlign</code> （绘制文本时，文本的对齐方式的属性）, <code>textBaseline</code> （绘制文本时，当前文本基线的属性） 和 <code>direction</code> （绘制文本时，描述当前文本方向的属性） 值对文本进行渲染。</li>
<li><code>x</code> : 文本起点的 x 轴坐标。</li>
<li><code>y</code> : 文本起点的 y 轴坐标。</li>
<li><code>maxWidth</code> : 绘制的最大宽度。如果指定了值，并且经过计算字符串的值比最大宽度还要宽，字体为了适应会水平缩放（如果通过水平缩放当前字体，可以进行有效的或者合理可读的处理）或者使用小号的字体。</li>
</ul>`,r:{minutes:3.5,words:1050},y:"a",t:"Canvas 绘制文本"},["/前端/JavaScript/Canvas/canvas绘制文本.html","/前端/JavaScript/Canvas/canvas绘制文本.md",":md"]],["v-1aa3ff6c","/%E5%89%8D%E7%AB%AF/JavaScript/DOM/css.html",{d:1699120295e3,e:`<h1> CSS 操作</h1>
<h2> 操作元素节点的 style 属性</h2>
<p>操作 HTML 元素的 <code>style</code> 属性：</p>
<ul>
<li>
<p>使用元素节点的相关方法操作 <code>style</code> 属性</p>
<ul>
<li>
<p><code>element.getAttribute()</code></p>
<p><strong>语法</strong> ： <code>element.getAttribute(attributeName)</code></p>
<p><strong>描述</strong> ： 返回当前元素的 <code>attributeName</code> 属性值。</p>
</li>
<li>
<p><code>element.setAttribute()</code></p>
<p><strong>语法</strong> ： <code>element.setAttribute(attributeName, attributeValue)</code></p>
<p><strong>描述</strong> ： 设置当前元素的 <code>attributeName</code> 属性值为 <code>attributeValue</code>。如果已存在，则更新属性值。</p>
</li>
<li>
<p><code>element.removeAttribute()</code></p>
<p><strong>语法</strong> ： <code>element.removeAttribute(attributeName)</code></p>
<p><strong>描述</strong> ： 移除当前元素的 <code>attributeName</code> 属性。</p>
</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// &lt;div id="divId" style="color: red; font-size: 20px"&gt;div content&lt;/div&gt;</span>

<span class="token keyword">let</span> divDOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'divId'</span><span class="token punctuation">)</span>
divDOM<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'style'</span><span class="token punctuation">)</span> <span class="token comment">// color: red; font-size: 20px</span>
divDOM<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'style'</span><span class="token punctuation">,</span> <span class="token string">'color: blue; font-size: 30px'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code>style</code> 属性不仅可以使用字符串读写，其本身也是一个对象（<code>CSSStyleDeclaration</code> 接口），可以直接读写个别属性</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// &lt;div id="divId" style="color: red; font-size: 20px"&gt;div content&lt;/div&gt;</span>

<span class="token keyword">let</span> divDOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'divId'</span><span class="token punctuation">)</span>
divDOM<span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token comment">// red</span>
divDOM<span class="token punctuation">.</span>style<span class="token punctuation">.</span>fontSize <span class="token comment">// 20px</span>
divDOM<span class="token punctuation">.</span>style<span class="token punctuation">.</span>color <span class="token operator">=</span> <span class="token string">'blue'</span>
divDOM<span class="token punctuation">.</span>style<span class="token punctuation">.</span>fontSize <span class="token operator">=</span> <span class="token string">'30px'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>`,r:{minutes:7.83,words:2350},y:"a",t:"CSS 操作"},["/前端/JavaScript/DOM/css.html","/前端/JavaScript/DOM/css.md",":md"]],["v-5e930d8a","/%E5%89%8D%E7%AB%AF/JavaScript/DOM/document.html",{d:1698775088e3,e:`<h1> Document 类型</h1>
<p><code>Document</code> 接口表示整个文档，并作为网页的入口，即 DOM 树。继承了 <code>Node</code> 接口和 <code>EventTarget</code> 接口。</p>
<p><code>Document</code> 对象可以通过如下方法获取：</p>
<ul>
<li>正常网页，可直接使用 <code>document</code> 或 <code>window.document</code> 。</li>
<li><code>iframe</code> 框架中的网页，可以使用 <code>iframe</code> 节点的 <code>contentDocument</code> 属性。</li>
<li>Ajax 操作返回的文档，可以使用 <code>XMLHttpRequest</code> 对象的 <code>responseXML</code> 属性。</li>
<li>网页内部 <code>Node</code> 节点的 <code>ownerDocument</code> 属性。</li>
</ul>`,r:{minutes:13.64,words:4091},y:"a",t:"Document 类型"},["/前端/JavaScript/DOM/document.html","/前端/JavaScript/DOM/document.md",":md"]],["v-bd32a61e","/%E5%89%8D%E7%AB%AF/JavaScript/DOM/element.html",{d:1698775113e3,e:`<h1> Element 类型</h1>
<p>在 XML 和 HTML 中，<code>Element</code> 用来描述页面的结构，可以是数据项、文本、按钮、复选框、图像等。</p>
<p><code>Element</code> 继承链路： <code>EventTarget &lt;-- Node &lt;-- Element</code> 。。</p>
<p><code>Element</code> 包括开始标签、结束标签、属性以及其他内容。</p>
<p></p>
<h2> Element 类型属性</h2>
<h3> 元素特性属性</h3>
<ul>
<li>
<p><code>element.id</code> ： 获取或者设置当前元素的 <code>id</code> 属性值。</p>
</li>
<li>
<p><code>element.tagName</code> ： 返回当前元素的大写标签名，与 <code>nodeName</code> 属性值一致。</p>
</li>
<li>
<p><code>element.attributes</code> ： 返回一个 <code>NamedNodeMap</code> 对象，包含元素的所有属性。</p>
</li>
<li>
<p><code>element.innerHTML</code> ： 获取或者设置当前元素包含的所有 HTML 代码。用来设置某个节点的内容。</p>
</li>
<li>
<p><code>element.outerHTML</code> ： 获取或者设置当前元素包含的所有 HTML 代码，包含当前元素本身与所有子元素。用来替换当前元素节点。</p>
</li>
<li>
<p><code>element.localName</code> ： 只读属性。返回当前元素的标签名，不包含命名空间前缀。</p>
</li>
<li>
<p><code>element.prefix</code> ： 返回当前元素的命名空间前缀，如果未指定前缀，则返回 null。</p>
</li>
<li>
<p><code>element.namespaceURI</code> ： 只读属性。返回元素的命名空间，若该元素不在命名空间中则返回 <code>null</code> 。</p>
</li>
<li>
<p><code>element.shadowRoot</code> ： 只读属性。返回当前元素的 <code>ShadowRoot</code> 对象，如果没有则返回 <code>null</code>。</p>
</li>
<li>
<p><code>element.slot</code> ： 返回已插入元素所在的 Shadow DOM slot 的名称。</p>
</li>
</ul>`,r:{minutes:12.37,words:3710},y:"a",t:"Element 类型"},["/前端/JavaScript/DOM/element.html","/前端/JavaScript/DOM/element.md",":md"]],["v-406b4113","/%E5%89%8D%E7%AB%AF/JavaScript/DOM/event.html",{d:1699540946e3,e:`<h1> 事件</h1>
<h2> 事件流</h2>
<p>事件流分为三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段。</p>
<ul>
<li><strong>事件捕获阶段</strong>（capture phase）：事件从最外层（<code>window</code> 对象）开始，逐级向下传播到目标节点。</li>
<li><strong>处于目标阶段</strong>（target phase）：事件到达目标节点触发。</li>
<li><strong>事件冒泡阶段</strong>（bubbling phase）：事件从目标节点开始，逐级向上传播到最外层（<code>window</code> 对象）。</li>
</ul>`,r:{minutes:21.8,words:6540},y:"a",t:"事件"},["/前端/JavaScript/DOM/event.html","/前端/JavaScript/DOM/event.md",":md"]],["v-3dad0466","/%E5%89%8D%E7%AB%AF/JavaScript/DOM/MutationObserver.html",{d:1699171298e3,e:`<h1> MutationObserver</h1>
<p><code>MutationObserver</code>  接口异步监视 DOM 的变动，例如节点的增减、属性变动、文本内容变动等。</p>
<ul>
<li>当所有 DOM 的变动都完成后，才会运行（即异步触发）。</li>
<li>DOM 的变化记录会被封装成一个数组（包含多条 DOM 的变动），在 <code>MutationObserver</code> 的回调函数中返回。</li>
<li>可以监听 DOM 的所有变动，也可以指定观察某一类 DOM 的变动。</li>
</ul>
<h2> MutationObserver 构造函数</h2>`,r:{minutes:3.85,words:1154},y:"a",t:"MutationObserver"},["/前端/JavaScript/DOM/MutationObserver.html","/前端/JavaScript/DOM/MutationObserver.md",":md"]],["v-63a47f03","/%E5%89%8D%E7%AB%AF/JavaScript/DOM/node.html",{d:1698775067e3,e:`<h1> Node 类型</h1>
<p>文档对象模型（DOM）是一个网络文档的编程接口，DOM 将文档表示为节点和对象。</p>
<p>在 DOM 的上下文中，节点（Node）是节点树中的单个点，包括文档本身、元素、文本以及注释都属于是节点。</p>
<p>Node 接口是 DOM 树中所有节点类型的基类，定义了所有节点类型的通用属性和方法。</p>
<h2> Node 类型属性</h2>
<ul>
<li>
<p><code>Node.prototype.childNodes</code> ： 返回指定节点的所有子节点集合（<code>NodeList</code> 集合），包含元素节点、文本节点、注释节点等。如果当前节点不包含任何子节点，则返回空的 <code>NodeList</code> 集合。该集合为动态集合，子节点变化时会自动更新。</p>
</li>
<li>
<p><code>Node.prototype.parentNode</code> ： 返回指定节点的父节点，如果没有父节点，则返回 <code>null</code>。父节点只可能是三种类型：元素节点（<code>Element</code>）、文档节点（<code>Document</code>）和文档片段节点（<code>DocumentFragment</code>）。</p>
</li>
<li>
<p><code>Node.prototype.parentElement</code> ： 返回指定节点的父元素节点，如果指定节点没有父节点，或者父节点类型不是元素节点，则返回 <code>null</code>。</p>
</li>
<li>
<p><code>Node.prototype.firstChild</code> ： 返回指定节点的第一个子节点，如果没有子节点，则返回 <code>null</code>。</p>
</li>
<li>
<p><code>Node.prototype.lastChild</code> ： 返回指定节点的最后一个子节点，如果没有子节点，则返回 <code>null</code>。</p>
</li>
<li>
<p><code>Node.prototype.previousSibling</code> ：返回指定节点的上一个兄弟节点，如果没有上一个兄弟节点，则返回 <code>null</code>。</p>
</li>
<li>
<p><code>Node.prototype.nextSibling</code> ： 返回指定节点的下一个兄弟节点，如果没有下一个兄弟节点，则返回 <code>null</code>。</p>
</li>
<li>
<p><code>Node.prototype.isConnected</code> ： 返回布尔值，表示指定节点是否在文档中。</p>
</li>
<li>
<p><code>Node.prototype.nodeName</code> ： 返回指定节点的名称（大写的标签名称，例如：<code>DIV</code>）。不同类型节点的 nodeName 属性值：</p>
<table>
<thead>
<tr>
<th style="text-align:left">节点类型</th>
<th style="text-align:left">nodeName 属性值</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Document （文档节点）</td>
<td style="text-align:left"><code>#document</code></td>
</tr>
<tr>
<td style="text-align:left">Element （元素节点）</td>
<td style="text-align:left">元素的标签名称</td>
</tr>
<tr>
<td style="text-align:left">Attr （属性节点）</td>
<td style="text-align:left">属性的名称，等同于 <code>Attr.name</code> 属性的值</td>
</tr>
<tr>
<td style="text-align:left">Text （文本节点）</td>
<td style="text-align:left"><code>#text</code></td>
</tr>
<tr>
<td style="text-align:left">Comment （注释节点）</td>
<td style="text-align:left"><code>#comment</code></td>
</tr>
<tr>
<td style="text-align:left">DocumentType （文档类型节点）</td>
<td style="text-align:left"><code>#document-type</code></td>
</tr>
<tr>
<td style="text-align:left">DocumentFragment （文档片段节点）</td>
<td style="text-align:left"><code>#document-fragment</code></td>
</tr>
<tr>
<td style="text-align:left">CDATASection （CDATA 节点）</td>
<td style="text-align:left"><code>#cdata-section</code></td>
</tr>
<tr>
<td style="text-align:left">ProcessingInstruction （处理指令节点）</td>
<td style="text-align:left"><code>#processing-instruction</code></td>
</tr>
</tbody>
</table>
</li>
<li>
<p><code>Node.prototype.nodeType</code> ： 返回指定节点的类型。</p>
<table>
<thead>
<tr>
<th style="text-align:left">常量</th>
<th style="text-align:left">值</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>Node.ELEMENT_NODE</code></td>
<td style="text-align:left"><code>1</code></td>
<td style="text-align:left">元素节点。例如：<code>&lt;p&gt;</code>、<code>&lt;div&gt;</code></td>
</tr>
<tr>
<td style="text-align:left"><code>Node.ATTRIBUTE_NODE</code></td>
<td style="text-align:left"><code>2</code></td>
<td style="text-align:left">元素的属性。例如：<code>class="right"</code></td>
</tr>
<tr>
<td style="text-align:left"><code>Node.TEXT_NODE</code></td>
<td style="text-align:left"><code>3</code></td>
<td style="text-align:left">元素之间或者元素包含的文本节点</td>
</tr>
<tr>
<td style="text-align:left"><code>Node.CDATA_SECTION_NO</code>DE</td>
<td style="text-align:left"><code>4</code></td>
<td style="text-align:left">CDATA 片段，例如：<code>&lt;!CDATA[[ … ]]&gt;</code></td>
</tr>
<tr>
<td style="text-align:left"><code>Node.PROCESSING_INSTRUCTION_NODE</code></td>
<td style="text-align:left"><code>7</code></td>
<td style="text-align:left">用于 XML 文档的 <code>ProcessingInstruction</code>。例如 <code>&lt;?xml-stylesheet ... ?&gt;</code> 声明</td>
</tr>
<tr>
<td style="text-align:left"><code>Node.COMMENT_NODE</code></td>
<td style="text-align:left"><code>8</code></td>
<td style="text-align:left">注释，<code>&lt;!--</code> 和 <code>--&gt;</code> 之间的内容</td>
</tr>
<tr>
<td style="text-align:left"><code>Node.DOCUMENT_NODE</code></td>
<td style="text-align:left"><code>9</code></td>
<td style="text-align:left"><code>Document</code> 节点</td>
</tr>
<tr>
<td style="text-align:left"><code>Node.DOCUMENT_TYPE_NODE</code></td>
<td style="text-align:left"><code>10</code></td>
<td style="text-align:left">描述文档类型的 <code>DocumentType</code> 节点。例如 <code>&lt;!DOCTYPE html&gt;</code> 用于 HTML5</td>
</tr>
<tr>
<td style="text-align:left"><code>Node.DOCUMENT_FRAGMENT_NODE</code></td>
<td style="text-align:left"><code>11</code></td>
<td style="text-align:left">文档片段，作为一个轻量版的 <code>Document</code> 使用</td>
</tr>
</tbody>
</table>
<p>以下节点类型常量已被弃用且不再使用：<code>Node.ENTITY_REFERENCE_NODE</code>（值为 <code>5</code>）、<code>Node.ENTITY_NODE</code>（值为 <code>6</code>）和 <code>Node.NOTATION_NODE</code>（值为 <code>12</code>）。</p>
</li>
<li>
<p><code>Node.prototype.nodeValue</code> ： 返回或设置指定节点的文本值。只有文本节点（<code>text</code>）、注释节点（<code>comment</code>）和属性节点（<code>attr</code>）有文本值，其他类型的节点一律返回 <code>null</code>。</p>
</li>
<li>
<p><code>Node.prototype.textContent</code> ： 返回指定节点的文本内容，包括子文本节点的内容，以及后代节点的文本内容。如果指定节点没有后代节点，则返回空字符串。如果指定节点是文本节点，则返回文本节点的文本内容。</p>
</li>
<li>
<p><code>Node.prototype.ownerDocument</code> ： 返回指定节点所在的顶层文档对象（<code>Document</code> 对象）。</p>
</li>
<li>
<p><code>Node.prototype.baseURI</code> ： 只读。返回当前网页的绝对路径。当浏览器获取绝对 URL 时，会使用 baseURI 解析相对 URL。一般情况下，由当前网页的 URL （即 <code>window.location</code> 属性）决定，但可以通过 HTML 的 <code>&lt;base&gt;</code> 标签改变属性值。</p>
</li>
</ul>`,r:{minutes:8.39,words:2518},y:"a",t:"Node 类型"},["/前端/JavaScript/DOM/node.html","/前端/JavaScript/DOM/node.md",":md"]],["v-0a3ae346","/%E5%89%8D%E7%AB%AF/JavaScript/DOM/other.html",{d:1698775113e3,e:`<h1> 其他类型</h1>
<h2> Text 类型</h2>
<p><code>Text</code> 文本节点表示文本内容，代表 <code>Element</code> 元素节点和 <code>Attribute</code> 属性节点的文本内容。如果一个节点只包含一段文本，该节点就有一个文本子节点，表示该文本内容。</p>
<p>空格也会形成文本节点，比如 <code>&lt;p&gt;&lt;/p&gt;</code> 包含一个空格，其子节点就是一个文本节点。</p>
<p>Text 继承链路： <code>EventTarget &lt;-- Node &lt;-- CharacterData &lt;-- Text</code> 。</p>`,r:{minutes:3.95,words:1185},y:"a",t:"其他类型"},["/前端/JavaScript/DOM/other.html","/前端/JavaScript/DOM/other.md",":md"]],["v-15506043","/%E5%89%8D%E7%AB%AF/JavaScript/DOM/WebComponents.html",{d:1700202535e3,e:`<h1> Web Components</h1>
<p>Web Components 由自定义元素（Custom element）、影子 DOM （Shadow DOM）、HTML 模板（HTML template）三个技术组成，它们可以一起使用来创建独立的可重用组件。</p>
<ul>
<li>自定义元素（Custom element）：一组 JavaScript API，允许自定义元素以及其行为，可在用户界面中按需使用。</li>
<li>影子 DOM （Shadow DOM）：一组 JavaScript API，用于将封装的 “影子” DOM 树附加到元素（与主文档 DOM 分开呈现）并控制其关联的功能。可以保持元素功能私有，可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。</li>
<li>HTML 模板（HTML template）：<code>&lt;template&gt;</code> 和 <code>&lt;slot&gt;</code> 元素可以编写不在呈现页面中显示的标记模板，可以作为自定义元素结构的基础被多次重用。</li>
</ul>`,r:{minutes:5.61,words:1682},y:"a",t:"Web Components"},["/前端/JavaScript/DOM/WebComponents.html","/前端/JavaScript/DOM/WebComponents.md",":md"]],["v-7ee4b871","/%E5%89%8D%E7%AB%AF/JavaScript/SVG/svgSMIL%E5%8A%A8%E7%94%BB.html",{d:1695030229e3,c:"SVG",g:["SVG","SMIL"],e:`<h1> SMIL 动画</h1>
<p>SMIL 动画指在 SVG 集成了 Synchronized Multimedia Integration Language (SMIL) 这种动画标准，该语言被 SVG 原生支持，主要是使用标签来描述动画。SMIL 允许你：</p>
<ul>
<li>变动一个元素的数字属性（x、y……）</li>
<li>变动元素的变形属性（ <code>translation</code> 或 <code>rotation</code> ）</li>
<li>变动元素的颜色属性</li>
<li>物件方向与运动路径方向同步</li>
</ul>
<h2> <code>&lt;animate&gt;</code> 元素</h2>`,r:{minutes:1.49,words:448},y:"a",t:"SMIL 动画"},["/前端/JavaScript/SVG/svgSMIL动画.html","/前端/JavaScript/SVG/svgSMIL动画.md",":md"]],["v-30557de4","/%E5%89%8D%E7%AB%AF/JavaScript/SVG/svg%E5%8A%A8%E7%94%BB.html",{d:1695030229e3,c:"SVG",g:["SVG","动画"],e:`<h1> SVG 动画</h1>
<h2> 描边动画</h2>
<h3> 描边动画原理</h3>
<p>SVG 描边动画主要与以下 3 个属性相关。</p>
<ul>
<li><code>stroke="&lt;paint&gt;"</code> : 定义图形元素的外轮廓的颜色。它的默认值是 <code>none</code> 。</li>
<li><code>stroke-dasharray="&lt;dasharray&gt;"</code> : 控制用来描边的点划线的图案范式。
<ul>
<li><code>&lt;dasharray&gt;</code> : 它是一个 <code>&lt;length&gt;</code> 和 <code>&lt;percentage&gt;</code> 数列，数与数之间用逗号或者空白隔开，指定<strong>短划线</strong>和<strong>缺口</strong>的长度。如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值。因此，<code>5,3,2</code> 等同于 <code>5,3,2,5,3,2</code> 。</li>
</ul>
</li>
<li><code>stroke-dashoffset="&lt;percentage&gt; | &lt;length&gt; | inherit"</code> : 指定了 dash 模式到路径开始的距离。如果使用了一个百分比值，那么这个值就代表了当前 viewport(视口) 的一个百分比。</li>
</ul>`,r:{minutes:15.85,words:4755},y:"a",t:"SVG 动画"},["/前端/JavaScript/SVG/svg动画.html","/前端/JavaScript/SVG/svg动画.md",":md"]],["v-4c6a57cf","/%E5%89%8D%E7%AB%AF/JavaScript/SVG/svg%E5%9F%BA%E7%A1%80.html",{d:1695030229e3,c:"SVG",g:["SVG","动画"],e:`<h1> SVG 基础</h1>
<p>可缩放矢量图形（Scalable Vector Graphics，SVG），是一种用于描述二维的矢量图形，基于 XML 的标记语言。作为一个基于文本的开放网络标准，SVG 能够优雅而简洁地渲染不同大小的图形，并和 CSS，DOM，JavaScript 和 SMIL 等其他网络标准无缝衔接。本质上，SVG 相对于图像，就好比 HTML 相对于文本。</p>
<h2> 容器</h2>
<h3> <code>&lt;svg&gt;</code> 元素</h3>
<p><code>svg</code> 元素可以用于在当前文档（比如说，一个 HTML 文档）内嵌套一个独立的 <code>svg</code> 片段。 这个独立片段拥有独立的视口和坐标系统。</p>`,r:{minutes:10.75,words:3225},y:"a",t:"SVG 基础"},["/前端/JavaScript/SVG/svg基础.html","/前端/JavaScript/SVG/svg基础.md",":md"]],["v-2088aab7","/%E5%89%8D%E7%AB%AF/JavaScript/SVG/%E5%9F%BA%E4%BA%8Eanime.js%E7%9A%84svg%E5%8A%A8%E7%94%BB.html",{d:1695030229e3,c:"SVG",g:["SVG"],e:`<h1> 基于 Anime.js 的 SVG 动画</h1>
<p>动画库: <a href="https://www.animejs.cn/" target="_blank" rel="noopener noreferrer">animejs</a></p>
<h2> 描边动画</h2>

<h2> 路径动画</h2>
<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>motionPath<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>motion-path-wrapper<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>motion-path-square<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>500<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>300<span class="token punctuation">"</span></span> <span class="token attr-name">viewBox</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0 0 500 300<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span>
        <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>curpath<span class="token punctuation">"</span></span>
        <span class="token attr-name">fill</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>none<span class="token punctuation">"</span></span>
        <span class="token attr-name">stroke</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>currentColor<span class="token punctuation">"</span></span>
        <span class="token attr-name">stroke-width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1<span class="token punctuation">"</span></span>
        <span class="token attr-name">d</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>M11.6,246.9c0,0,143.1-274.1,267.8-137.9s124.7,136.2,124.7,136.2L11.6,246.9z<span class="token punctuation">"</span></span>
      <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:4.34,words:1301},y:"a",t:"基于 Anime.js 的 SVG 动画"},["/前端/JavaScript/SVG/基于anime.js的svg动画.html","/前端/JavaScript/SVG/基于anime.js的svg动画.md",":md"]],["v-7a9286be","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/01.%E7%BC%96%E7%A8%8B%E8%AF%AD%E8%A8%80%E9%80%9A%E8%AF%86.html",{d:1672025329e3,e:`<h1> 编程语言通识</h1>
<h2> 形式语言（乔姆斯基谱系）</h2>
<ul>
<li>0型 无限制文发</li>
<li>1型 上下文相关文法</li>
<li>2型 上下文无关文法</li>
<li>3型 正则文法</li>
</ul>
<h2> BNF（巴科斯范式）</h2>
<p>一种形式化的语法表示方法，用来描述语法的一种形式体系，是一种典型的元语言。又称巴科斯-诺尔形式(Backus-Naur form)。它不仅能严格地表示语法规则，而且所描述的语法是与上下文无关的。它具有语法简单，表示明确，便于语法分析和编译的特点。</p>
<h3> 语法规则</h3>
<ul>
<li>非终结符用尖括号括起</li>
<li>每条规则的左部是一个非终结符，右部是由非终结符和终结符组成的一个符号串，中间一般以<code>::=</code>分开</li>
<li>具有相同左部的规则可以共用一个左部，各右部之间以直竖“|”隔开</li>
</ul>`,r:{minutes:3.44,words:1032},y:"a",t:"编程语言通识"},["/前端/JavaScript/前端训练营/01.编程语言通识.html","/前端/JavaScript/前端训练营/01.编程语言通识.md",":md"]],["v-0018d32b","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/02.JavaScript%E8%AF%8D%E6%B3%95%E5%92%8C%E7%B1%BB%E5%9E%8B.html",{d:1672025329e3,e:`<h1> JavaScript词法和类型</h1>
<h2> Unicode（字符集）</h2>
<p>中文又称万国码、国际码、统一码、单一码，是计算机科学领域的业界标准。它整理、编码了世界上大部分的文字系统，使得电脑可以用更为简单的方式来呈现和处理文字。</p>
<h3> Blocks（区段）</h3>
<p>在 Unicode 中，Blocks 被定义为一组连续码位的范围。Blocks 会被给予唯一的名称，且区段与区段间不会重叠。</p>
<h3> Categories （类别）</h3>
<h2> Lexical Grammar（词法）</h2>
<p>ECMAScript 源码文本会被从左到右扫描，并被转换为一系列的输入元素，包括 token、控制符、行终止符、注释和空白符。</p>`,r:{minutes:13.8,words:4140},y:"a",t:"JavaScript词法和类型"},["/前端/JavaScript/前端训练营/02.JavaScript词法和类型.html","/前端/JavaScript/前端训练营/02.JavaScript词法和类型.md",":md"]],["v-78ee3839","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/03.%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%92%8C%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2.html",{d:1672025329e3,e:`<h1> 表达式和类型转换</h1>
<h2> 表达式语句</h2>
<p>表达式语句实际上就是一个表达式，它是由运算符连接变量或者直接量构成的。</p>
<h3> PrimaryExpression 主要表达式</h3>
<p>Primary Expression 是表达式的最小单位，它涉及的语法结构也是优先级最高的。</p>
<p>Primary Expression 包含了各种直接量，直接量为直接用某种语法写出来的具有特定类型的值。</p>
<p>任何表达式加上圆括号，都被认为是 Primary Expression。使得圆括号成为改变运算优先顺序的手段。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token string">"abc"</span><span class="token punctuation">;</span>            <span class="token comment">// 字符串</span>
<span class="token number">123</span><span class="token punctuation">;</span>              <span class="token comment">// 数值</span>
<span class="token keyword">null</span><span class="token punctuation">;</span>             <span class="token comment">// null：使用 null 关键字获取 null 值</span>
<span class="token boolean">true</span><span class="token punctuation">;</span>             <span class="token comment">// 布尔值</span>
<span class="token boolean">false</span><span class="token punctuation">;</span>            <span class="token comment">// 布尔值</span>
<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>             <span class="token comment">// 对象</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 函数</span>
<span class="token punctuation">(</span><span class="token keyword">class</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">// 类</span>
<span class="token operator">/</span>abc<span class="token operator">/</span>g<span class="token punctuation">;</span>           <span class="token comment">// 正则表达式</span>
<span class="token keyword">this</span><span class="token punctuation">;</span>             <span class="token comment">// this</span>
myVar<span class="token punctuation">;</span>            <span class="token comment">// 变量：在语法上，把变量称作“标识符引用”</span>
<span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>          <span class="token comment">// 任何表达式加上圆括号，都被认为是 Primary Expression</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:9.12,words:2735},y:"a",t:"表达式和类型转换"},["/前端/JavaScript/前端训练营/03.表达式和类型转换.html","/前端/JavaScript/前端训练营/03.表达式和类型转换.md",":md"]],["v-3368bed0","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/04.%E8%AF%AD%E5%8F%A5%E5%92%8C%E5%AF%B9%E8%B1%A1.html",{d:1672025329e3,e:`<h1> 语句和对象</h1>
<h2> 语句</h2>
<h3> 普通语句</h3>
<h4> 语句块</h4>
<p>语句块可以把多行语句视为同一行语句。需要注意，语句块会产生作用域。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token keyword">var</span> x<span class="token punctuation">,</span> y<span class="token punctuation">;</span>
  x <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
  y <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token punctuation">{</span>
  <span class="token keyword">let</span> x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 报错：let声明，仅仅对语句块作用域生效</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:10.16,words:3048},y:"a",t:"语句和对象"},["/前端/JavaScript/前端训练营/04.语句和对象.html","/前端/JavaScript/前端训练营/04.语句和对象.md",":md"]],["v-cc16ae08","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/API.html",{d:1700065895e3,e:`<h1> JavaScript API</h1>
<h2> postMessage 多窗口通信</h2>
<h3> window.postMessage</h3>
<p><strong>语法</strong> ： <code>otherWindow.postMessage(message, targetOrigin, [transfer])</code></p>
<p><strong>描述</strong> ： 用于安全地实现跨源通信。例如：在 a.com 页面中，向其 <code>iframe</code> 子窗口 b.com 页面发送消息。</p>
<p><strong>参数</strong> ：</p>`,r:{minutes:12.2,words:3661},y:"a",t:"JavaScript API"},["/前端/JavaScript/基础知识/API.html","/前端/JavaScript/基础知识/API.md",":md"]],["v-fee2cd06","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/ArrayBuffer.html",{d:1693730997e3,e:`<h1> ArrayBuffer</h1>
<p>JavaScript 可以通过类型化数组操作原始的二进制数据，JavaScript 类型化数组中的每一个元素都是原始二进制值，而二进制值采用多种支持的格式之一（从 8 位整数到 64 位浮点数）。</p>
<p>JavaScript 类型化数组将实现拆分为缓冲和视图两部分。缓冲（由 <code>ArrayBuffer</code> 对象实现）描述一个数据分块。可通过视图访问缓存对象中包含的内存，视图提供了上下文（即数据类型、起始偏移量和元素数）将数据转换为实际有类型的数组。</p>
<ul>
<li><code>ArrayBuffer</code> 对象：用来表示通用的、固定长度的原始二进制数据缓冲区。</li>
<li><code>TypedArray</code> 视图：从 <code>ArrayBuffer</code> 对象中<strong>读写简单类型</strong>的二进制数据。包含类型的视图如下：
<ul>
<li><code>Int8Array</code> ：8 位有符号整型（补码），长度 1 字节。</li>
<li><code>Uint8Array</code> ：8 位无符号整型，长度 1 字节。</li>
<li><code>Uint8ClampedArray</code> ：8 位无符号整型，长度 1 字节。</li>
<li><code>Int16Array</code> ：16 位有符号整型（补码），长度 2 字节。</li>
<li><code>Uint16Array</code> ：16 位无符号整型，长度 2 字节。</li>
<li><code>Int32Array</code> ：32 位有符号整型（补码），长度 4 字节。</li>
<li><code>Uint32Array</code> ：32 位无符号整型，长度 4 字节。</li>
<li><code>Float32Array</code> ：32 位 IEEE 浮点数（7 位有效数字），长度 4 字节。</li>
<li><code>Float64Array</code> ：64 位 IEEE 浮点数（16 位有效数字），长度 8 字节。</li>
<li><code>BigInt64Array</code> ：64 位有符号整型（补码），长度 8 字节。</li>
<li><code>BigUint64Array</code> ：64 位无符号整型，长度 8 字节。</li>
</ul>
</li>
<li><code>DataView</code> 视图：从 <code>ArrayBuffer</code> 对象中<strong>读写复杂类型</strong>的二进制数据。比如第一个字节是 <code>Uint8Array</code>，第二、三个字节是 <code>Int16Array</code>、第四个字节开始是 <code>Float32Array</code>（32 位浮点数）等，此外还可以自定义字节序。</li>
</ul>`,r:{minutes:24.68,words:7404},y:"a",t:"ArrayBuffer"},["/前端/JavaScript/基础知识/ArrayBuffer.html","/前端/JavaScript/基础知识/ArrayBuffer.md",":md"]],["v-655a227a","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/async.html",{d:1686663349e3,e:`<h1> async</h1>
<h2> async / await 概述</h2>
<p>async 函数是使用 <code>async</code> 关键字声明的函数。async 函数是 <code>AsyncFunction</code> 构造函数的实例，并且其中允许使用 <code>await</code> 关键字。</p>
<ul>
<li><code>AsyncFunction</code> 对象为异步函数提供方法。该对象不是全局对象，是 <code>Function</code> 的子类型。可以通过 <code>const AsyncFunction = async function () {}.constructor;</code> 获取。</li>
<li><code>await</code> 表达式会暂停整个 <code>async</code> 函数的执行进程并出让其控制权，只有当其等待的基于 <code>Promise</code> 的异步操作被兑现或被拒绝之后才会恢复进程。</li>
</ul>`,r:{minutes:7.72,words:2317},y:"a",t:"async"},["/前端/JavaScript/基础知识/async.html","/前端/JavaScript/基础知识/async.md",":md"]],["v-1d90551e","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/Class.html",{d:1693730966e3,e:`<h1> Class</h1>
<p>在面向对象的编程中，<code>Class</code> 是用于创建对象的可扩展的程序代码模版，它为对象提供了状态（成员变量）的初始值和行为（成员函数或方法）的实现。</p>
<h2> Class 的使用</h2>
<p>类（class）的属性和方法，除非显式定义在其本身（即定义在 <code>this</code> 对象上），否则都是定义在原型上（即定义在 <code>class</code> 上）。</p>
<p>类（class）通过 <code>static</code> 关键字定义静态方法。</p>
<ul>
<li>不能在类的实例上调用静态方法，而应该通过类本身调用。</li>
<li>静态方法中，调用同一个类中的其他静态方法，可使用 <code>this</code> 关键字。</li>
<li>非静态方法中，不能直接使用 <code>this</code> 关键字来访问静态方法。而是要用类名或者用构造函数的属性来调用：
<ul>
<li>使用类名调用：<code>CLASSNAME.STATIC_METHOD_NAME()</code></li>
<li>使用构造函数的属性调用：<code>this.constructor.STATIC_METHOD_NAME()</code></li>
</ul>
</li>
</ul>`,r:{minutes:11.33,words:3398},y:"a",t:"Class"},["/前端/JavaScript/基础知识/Class.html","/前端/JavaScript/基础知识/Class.md",":md"]],["v-15ea3110","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/EventLoop.html",{d:1686663349e3,e:`<h1> Event Loop</h1>
<h2> 概述</h2>
<p>事件循环的实现至少应该含有一个用于宏任务的队列和至少一个用于微任务的队列。大部分的实现通常会更多用于不同类型的宏任务和微任务的队列，这使得事件循环能够根据任务类型进行优先处理。例如，优先考虑对性能敏感的任务，如用户输入。</p>
<ul>
<li>
<p>宏任务（macrotask）：创建主文档对象、解析 HTML、执行主线（或全局）JavaScript 代码，更改当前 URL 以及各种事件，如页面加载、输入、网络事件和定时器事件（<code>setTimeout</code> 、<code>setInterval</code> 等）。</p>
</li>
<li>
<p>微任务（microtask）：<code>Promise</code> 回调函数、DOM 发生变化等</p>
<p>所有微任务会在下一次渲染之前执行完成，其目标是在渲染前更新应用程序状态。能够在重新渲染 UI 之前执行指定的行为，避免不必要的 UI 重绘，UI 重绘会使应用程序的状态不连续。</p>
</li>
</ul>`,r:{minutes:5.88,words:1764},y:"a",t:"Event Loop"},["/前端/JavaScript/基础知识/EventLoop.html","/前端/JavaScript/基础知识/EventLoop.md",":md"]],["v-37215e23","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/Generator.html",{d:1686663349e3,e:`<h1> Generator</h1>
<h2> Generator 概述</h2>
<p><code>Generator</code> 对象由生成器函数（<code>function* name([param[, param[, ... param]]]) { statements }</code>）返回并且它符合可迭代协议和迭代器协议。</p>
<ul>
<li><code>Generator</code> 对象是一个<strong>状态机</strong>，封装了多个内部状态。</li>
<li><code>Generator</code> 对象是一个<strong>迭代器对象</strong>，可以依次遍历 <code>Generator</code> 对象内部的每一个状态。</li>
<li><code>Generator</code> 对象是一个<strong>普通函数</strong>，包含特征如下：
<ul>
<li><code>function</code> 关键字后跟一个星号： <code>function* name([param[, param[, ... param]]]) { statements }</code> 。</li>
<li>函数体内部使用 <code>yield</code> 表达式，定义不同的内部状态。</li>
</ul>
</li>
</ul>`,r:{minutes:12.93,words:3879},y:"a",t:"Generator"},["/前端/JavaScript/基础知识/Generator.html","/前端/JavaScript/基础知识/Generator.md",":md"]],["v-f914a298","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/JSON.html",{d:1700495654e3,e:`<h1> JSON</h1>
<h2> 概述</h2>
<p>JSON （JavaScript Object Notation） 是一种语法，用来序列化对象、数组、数值、字符串、布尔值和 <code>null</code> 。</p>
<p>JSON 语法支持 3 种类型的值：</p>
<ul>
<li>简单值：字符串、数值、布尔值和 <code>null</code> ，但是 <code>undefined</code> 不可以。
<ul>
<li>数值：禁止出现前导零（<code>JSON.stringify</code> 方法自动忽略前导零，而在 <code>JSON.parse</code> 方法中将会抛出 <code>SyntaxError</code>）；如果存在小数点，则后面至少跟一位数字。</li>
<li>字符串：必须使用双引号。禁止某些控制字符；Unicode 行分隔符（<code>U+2028</code>）和段分隔符（<code>U+2029</code>）被允许。</li>
</ul>
</li>
<li>对象：表示有序的键/值对。值可以是简单值，也可以是复杂类型。</li>
<li>数组：表示可以通过数值索引访问值的有序列表。数组的值可以是任意类型。</li>
</ul>`,r:{minutes:4.58,words:1374},y:"a",t:"JSON"},["/前端/JavaScript/基础知识/JSON.html","/前端/JavaScript/基础知识/JSON.md",":md"]],["v-d6e951ee","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/Math%E5%92%8CDate.html",{d:1694965948e3,e:`<h1> Math 和 Date</h1>
<h2> Math</h2>
<p><code>Math</code> 是一个内置对象，它拥有一些数学常数属性和数学函数方法。<code>Math</code> 不是一个函数对象。<code>Math</code> 用于 <code>Number</code> 类型。它不支持 <code>BigInt</code>。</p>
<h3> Math 的属性</h3>
<ul>
<li>
<p><code>Math.E</code> ：欧拉常数，也是自然对数的底数，约等于 2.718。</p>
</li>
<li>
<p><code>Math.LN2</code> ：2 的自然对数，约等于 0.693。</p>
</li>
<li>
<p><code>Math.LN10</code> ：10 的自然对数，约等于 2.303。</p>
</li>
<li>
<p><code>Math.LOG2E</code> ：以 2 为底的 E 的对数，约等于 1.443。</p>
</li>
<li>
<p><code>Math.LOG10E</code> ：以 10 为底的 E 的对数，约等于 0.434。</p>
</li>
<li>
<p><code>Math.PI</code> ：圆周率，一个圆的周长和直径之比，约等于 3.14159。</p>
</li>
<li>
<p><code>Math.SQRT1_2</code> ：二分之一的平方根，同时也是 2 的平方根的倒数，约等于 0.707。</p>
</li>
<li>
<p><code>Math.SQRT2</code> ：2 的平方根，约等于 1.414</p>
</li>
</ul>`,r:{minutes:9.55,words:2866},y:"a",t:"Math 和 Date"},["/前端/JavaScript/基础知识/Math和Date.html","/前端/JavaScript/基础知识/Math和Date.md",":md"]],["v-2e3c4fca","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/Promise.html",{d:1686663349e3,e:`<h1> Promise</h1>
<h2> Promise 的状态</h2>
<p><code>Promise</code> 对象表示异步操作最终的完成（或失败）以及其结果值。<code>Promise</code> 是一个有状态的对象，必然处于以下几种状态之一：</p>
<ul>
<li><strong>待定（<code>pending</code>）</strong> ：初始状态，既没有被兑现，也没有被拒绝。</li>
<li><strong>已兑现（<code>fulfilled</code>，也称为“解决”，<code>resolved</code>）</strong> ：意味着操作成功完成。</li>
<li><strong>已拒绝（<code>rejected</code>）</strong> ：意味着操作失败。</li>
</ul>`,r:{minutes:15.74,words:4722},y:"a",t:"Promise"},["/前端/JavaScript/基础知识/Promise.html","/前端/JavaScript/基础知识/Promise.md",":md"]],["v-697eefb9","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/Reflect.html",{d:1686108099e3,e:`<h1> Reflect</h1>
<p><code>Reflect</code> 是一个内置的对象，它提供拦截 JavaScript 操作的方法。</p>
<h2> 概述</h2>
<ul>
<li>将 <code>Object</code> 对象的一些明显属于语言内部的方法（比如 <code>Object.defineProperty</code>），放到 <code>Reflect</code> 对象上。</li>
<li>修改某些 <code>Object</code> 方法的返回结果，让其变得更合理。比如，<code>Object.defineProperty(obj, name, desc)</code> 在无法定义属性时，会抛出错误，而 <code>Reflect.defineProperty(obj, name, desc)</code> 则会返回 <code>false</code> 。</li>
<li>让 <code>Object</code> 操作都变成函数行为。某些 <code>Object</code> 操作是命令式，比如 <code>name in obj</code> 和 <code>delete obj[name]</code> ，而 <code>Reflect.has(obj, name)</code> 和 <code>Reflect.deleteProperty(obj, name)</code> 让它们变成了函数行为。</li>
<li><code>Reflect</code> 对象的方法与 <code>Proxy</code> 对象的方法一一对应。在 <code>Proxy</code> 修改默认行为，都可以在 <code>Reflect</code> 上获取默认行为。</li>
</ul>`,r:{minutes:7.99,words:2397},y:"a",t:"Reflect"},["/前端/JavaScript/基础知识/Reflect.html","/前端/JavaScript/基础知识/Reflect.md",":md"]],["v-3628e31a","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/RegExp.html",{d:1694879378e3,e:`<h1> RegExp</h1>
<p>正则表达式是用于匹配字符串中字符组合的模式。在 JavaScript 中，正则表达式也是对象。</p>
<p>正则表达式可以被用于 <code>RegExp</code> 的 <code>exec</code> 和 <code>test</code> 方法，以及 <code>String</code> 的 <code>match</code>、<code>matchAll</code>、<code>replace</code>、<code>search</code> 和 <code>split</code> 方法。</p>
<h2> 位置匹配</h2>
`,r:{minutes:16.71,words:5012},y:"a",t:"RegExp"},["/前端/JavaScript/基础知识/RegExp.html","/前端/JavaScript/基础知识/RegExp.md",":md"]],["v-8d988142","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/Set%E5%92%8CMap.html",{d:1693073313e3,e:`<h1> Set 和 Map</h1>
<h2> Set</h2>
<h3> Set 的基本含义</h3>
<p><code>Set</code> 对象允许存储任何类型的<strong>唯一值</strong>，无论是原始值或者是对象引用。可以按照插入的顺序迭代它的元素。</p>
<ul>
<li>在 <code>Set</code> 中， <code>+0</code> 和 <code>-0</code> 是同一个的值，在严格相等（<code>===</code>）中也是严格相等。</li>
<li><code>NaN</code> 在 <code>Set</code> 中被认为是同一个值，但在严格相等（<code>===</code>）中 <code>NaN</code> 不等于自身。</li>
<li><code>null</code> 和 <code>undefined</code> 都可以被存储在 <code>Set</code> 中。</li>
</ul>`,r:{minutes:17.66,words:5298},y:"a",t:"Set 和 Map"},["/前端/JavaScript/基础知识/Set和Map.html","/前端/JavaScript/基础知识/Set和Map.md",":md"]],["v-38550274","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E4%BD%9C%E7%94%A8%E5%9F%9F%E4%B8%8E%E9%97%AD%E5%8C%85.html",{d:1681788517e3,e:`<h1> 作用域与闭包</h1>
<h2> 编译原理</h2>
<p>在传统编译语言的流程中，程序中一段源代码在执行之前会经历三个步骤，统称为 <strong>编译</strong> 。</p>
<ul>
<li>
<p><strong><code>分词/词法分析(Tokenizing/Lexing)</code></strong> ：该过程将代码字符串分解成有意义的代码块。被分解成的代码块成为 <strong><code>词法单元(token)</code></strong> 。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token comment">// 词法分析后的结构</span>
<span class="token comment">// 空格是否会被当做词法单元，取决于在语言中是否具有意义。</span>
<span class="token punctuation">[</span>
  <span class="token string-property property">"var"</span><span class="token operator">:</span> <span class="token string">"keyword"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"a"</span>  <span class="token operator">:</span> <span class="token string">"identifier"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"="</span>  <span class="token operator">:</span> <span class="token string">"assignment"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"2"</span>  <span class="token operator">:</span> <span class="token string">"integer"</span><span class="token punctuation">,</span>
  <span class="token string-property property">";"</span>  <span class="token operator">:</span> <span class="token string">"eos"</span><span class="token punctuation">(</span>end <span class="token keyword">of</span> statement<span class="token punctuation">)</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong><code>分词(tokenizing)</code></strong> 和 <strong><code>词法分析(Lexing)</code></strong> 之间的区别在于**词法单元的识别是通过有状态还是无状态的方式进行的。
<ul>
<li>分词：是无状态的</li>
<li>词法分析：是有状态的。</li>
</ul>
</li>
<li>词法单元生成器判断 <code>a</code> 是一个独立的词法单元还是其他词法单元的一部分时，调用的状态的解析规则，则这个过程被称为 <strong><code>词法分析</code></strong> 。</li>
</ul>
</li>
<li>
<p><strong><code>解析/语法分析(Parsing)</code></strong> ：  该过程将词法单元流（数组）转换成一个由元素逐级嵌套所组成的代表了程序语法结构的树。生成的树被称为 <strong><code>抽象语法树(Abstract Syntax Tree, AST)</code></strong>。</p>
<p>如果源码符合语法规则，会生成一个抽象语法树；如果源码存在语法错误，会抛出一个 “语法错误”。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">operation</span><span class="token operator">:</span> <span class="token string">"="</span><span class="token punctuation">,</span>
  <span class="token literal-property property">left</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">keyword</span><span class="token operator">:</span> <span class="token string">"var"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">right</span><span class="token operator">:</span> <span class="token string">"a"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">right</span><span class="token operator">:</span> <span class="token string">"2"</span>
<span class="token punctuation">}</span>
<span class="token comment">// 上面代码中，抽象语法树的一个节点是赋值操作符（=），它两侧的词义单位，分别成左侧子节点和右侧子节点</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong><code>代码生成</code></strong>：将 <code>抽象语法树 AST</code> 转换为可执行代码。</p>
</li>
</ul>`,r:{minutes:28.01,words:8403},y:"a",t:"作用域与闭包"},["/前端/JavaScript/基础知识/作用域与闭包.html","/前端/JavaScript/基础知识/作用域与闭包.md",":md"]],["v-69bed66c","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E5%87%BD%E6%95%B0.html",{d:1686108108e3,e:`<h1> 函数</h1>
<h2> 函数概述</h2>
<p>每个函数都是 <code>Function</code> 类型的实例，而 <code>Function</code> 也有属性和方法，跟其他引用类型一样。因为函数是对象，所以函数名就是指向函数对象的指针，而且不一定与函数本身紧密绑定。</p>
<p>由于函数与其他数据类型地位平等，所以在 JavaScript 语言中又称函数为第一等公民。比如，可以把函数赋值给变量和对象的属性，也可以当作参数传入其他函数，或者作为函数的结果返回。函数只是一个可以执行的值，此外并无特殊之处。</p>
<h2> 函数的声明</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// function 命令</span>
<span class="token keyword">function</span> <span class="token function">namedFunction</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x <span class="token operator">+</span> y <span class="token punctuation">}</span>

<span class="token comment">// 函数表达式</span>
<span class="token comment">// 函数表达式声明函数时，如果 function 命令后不带有函数名</span>
<span class="token keyword">let</span> <span class="token function-variable function">expression</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x <span class="token operator">+</span> y <span class="token punctuation">}</span>
<span class="token comment">// 函数表达式声明函数时，如果 function 命令后带有函数名</span>
<span class="token comment">// &gt; 函数名仅在函数体内部有效，可在函数体内部调用自身</span>
<span class="token comment">// &gt; 方便排查错误。显示函数调用栈时，将显示函数名</span>
<span class="token keyword">let</span> <span class="token function-variable function">expression</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">expression</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> expression<span class="token punctuation">)</span> <span class="token comment">// function</span>
  <span class="token keyword">return</span> x <span class="token operator">+</span> y
<span class="token punctuation">}</span>

<span class="token comment">// Function 构造函数 - 不推荐使用</span>
<span class="token comment">// 使用 Function 构造函数声明函数会被解释两次，会影响性能。</span>
<span class="token comment">// &gt; 第一次，将其当作常规 ECMAScript 代码</span>
<span class="token comment">// &gt; 第二次，解释传给构造函数的字符串</span>
<span class="token keyword">let</span> newFunction <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token punctuation">(</span><span class="token string">'x'</span><span class="token punctuation">,</span> <span class="token string">'y'</span><span class="token punctuation">,</span> <span class="token string">'return x + y'</span><span class="token punctuation">)</span>
<span class="token comment">// 等同于 function newFunction(x, y) { return x + y }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:18.14,words:5442},y:"a",t:"函数"},["/前端/JavaScript/基础知识/函数.html","/前端/JavaScript/基础知识/函数.md",":md"]],["v-c29ddc06","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E5%8E%9F%E5%9E%8B%E4%B8%8E%E7%BB%A7%E6%89%BF.html",{d:1681788517e3,e:`<h1> 原型与继承</h1>
<h2> 原型</h2>
<h3> 原型内容</h3>
<p></p>
<ul>
<li>
<p><strong>每个函数都会创建一个 <code>prototype</code> 属性（指向原型对象），该属性是一个对象，默认只有一个 <code>constructor</code> 属性（指向该函数本身）。其他所有方法都继承自 <code>Object</code> 。</strong></p>
<ul>
<li>
<p>通过 <code>new</code> 运算符生成对象，每次生成的对象都不一样，可使用函数的 <code>prototype</code> 属性在对象之间提供共享的属性和方法。</p>
</li>
<li>
<p>并不是所有函数都具有 <code>prototype</code> 属性，<code>Function.prototype.bind()</code> 没有该属性，因为 <code>bind()</code> 并不是一个构造函数。</p>
</li>
</ul>
</li>
<li>
<p><strong>每个 JavaScript 函数实际上都是一个 <code>Function</code> 对象</strong>，由 <code>Function()</code> 构造函数创建一个新的 <code>Function</code> 对象。</p>
</li>
<li>
<p><strong><code>Function</code> 是一个函数，也是一种特殊类型的对象，也具有 <code>__proto__</code> 属性</strong>。<strong><code>Function</code> 是它自己的构造器</strong>，因 <code>Function.__proto__</code> 指向 <code>Function.prototype</code>，导致 <code>Function.constructor === Function</code>。</p>
</li>
<li>
<p><strong>每个对象都有一个 <code>__proto__</code> 属性，指向创建该对象的函数（即：<code>function Object()</code>）的 <code>prototype</code>。</strong></p>
<ul>
<li>
<p><code>__proto__</code> 是存在于实例与构造函数的原型对象（<code>prototype</code>）之间的连接，而不是存在于实例与构造函数之间。</p>
</li>
<li>
<p><code>__proto__</code> 属性已在 ECMAScript 6 语言规范中标准化，用于确保 Web 浏览器的兼容性。它已被不推荐使用，现在更推荐使用以下 API：</p>
<ul>
<li>
<p><code>Object.getPrototypeOf(object)</code> / <code>Reflect.getPrototypeOf(target)</code> ：返回指定对象的原型（内部 <code>[[Prototype]]</code> 属性的值）。</p>
</li>
<li>
<p><code>Object.setPrototypeOf(obj, prototype)</code> / <code>Reflect.setPrototypeOf(target, prototype)</code> ：设置一个指定的对象的原型（即，内部 <code>[[Prototype]]</code> 属性）到另一个对象或 <code>null</code>。</p>
</li>
<li>
<p><code>Object.create(proto)</code> ：用于创建一个新对象，使用现有的对象来作为新创建对象的原型（<code>prototype</code>）。</p>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong><code>Object.prototype</code> 是原型链的终点，所有对象都是从它继承了方法和属性。<code>Object.prototype</code> 的 <code>__proto__</code> 指向 <code>null</code>。</strong></p>
</li>
<li>
<p>原型的动态性：从原型上搜索值的过程是动态的，所以即使实例在修改原型之前已经存在，任何时候对原型对象所做的修改也会在实例上反映出来。</p>
</li>
<li>
<p>原型的问题：源自它的共享特性，来自于包含引用值的属性。</p>
</li>
</ul>`,r:{minutes:8.07,words:2421},y:"a",t:"原型与继承"},["/前端/JavaScript/基础知识/原型与继承.html","/前端/JavaScript/基础知识/原型与继承.md",":md"]],["v-20a2080e","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E5%9F%BA%E7%A1%80%E7%B1%BB%E5%9E%8B.html",{d:1681788517e3,e:`<h1> 基础类型</h1>
<h2> Undefined</h2>
<p>一个没有被赋值的变量的类型是 <code>undefined</code>。如果方法或者是语句中操作的变量没有被赋值，则会返回 <code>undefined</code>。转为数值时为 <code>NaN</code>。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 变量声明了，但没有赋值</span>
<span class="token keyword">var</span> foo
foo <span class="token comment">// undefined</span>

<span class="token comment">// 对象没有赋值的属性</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
obj<span class="token punctuation">.</span>attr <span class="token comment">// undefined</span>

<span class="token comment">// 调用函数时，应该提供的参数没有提供，该参数等于 undefined</span>
<span class="token keyword">function</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> a<span class="token punctuation">)</span> <span class="token comment">// undefined</span>
  <span class="token keyword">return</span> a
<span class="token punctuation">}</span>
<span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// undefined</span>

<span class="token comment">// 函数没有返回值时，默认返回 undefined</span>
<span class="token keyword">function</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:56.27,words:16880},y:"a",t:"基础类型"},["/前端/JavaScript/基础知识/基础类型.html","/前端/JavaScript/基础知识/基础类型.md",":md"]],["v-6e901b6a","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E5%AF%B9%E8%B1%A1.html",{d:1681788517e3,e:`<h1> Object</h1>
<h2> Object 概述</h2>
<p><code>Object</code> 用于存储各种键值集合和更复杂的实体，所有引用类型都从它继承了基本的行为。创建 <code>Object</code> 有两种方式：</p>
<ul>
<li>使用 <code>new</code> 操作符和 <code>Object</code> 构造函数。</li>
<li>使用对象字面量（object literal）表示法。在使用对象字面量表示法定义对象时，并不会实际调用 <code>Object</code> 构造函数。</li>
</ul>
<p>如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。修改其中一个变量，会影响到其他所有变量。</p>`,r:{minutes:27.58,words:8274},y:"a",t:"Object"},["/前端/JavaScript/基础知识/对象.html","/前端/JavaScript/基础知识/对象.md",":md"]],["v-a3e5affa","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E5%BC%82%E6%AD%A5.html",{d:1681788517e3,e:`<h1> 异步操作</h1>
<h2> 进程与线程</h2>
<ul>
<li>
<p>进程是 CPU 资源分配的最小单位，是能拥有资源和独立运行的最小单位。</p>
</li>
<li>
<p>线程是 CPU 调度的最小单位，是建立在进程的基础上的一次程序运行单位，一个进程中可以有多个线程。</p>
</li>
</ul>
<h2> 单线程模型</h2>
<p>JavaScript 只在一个线程上运行。<strong>JavaScript 同时只能执行一个任务，其他任务都必须在后面排队等待。</strong></p>
<p>注意：JavaScript 只在一个线程上运行，不代表 JavaScript 引擎只有一个线程。事实上，JavaScript 引擎有多个线程，单个脚本只能在一个线程上运行（称为主线程），其他线程都是在后台配合。</p>`,r:{minutes:4.39,words:1316},y:"a",t:"异步操作"},["/前端/JavaScript/基础知识/异步.html","/前端/JavaScript/基础知识/异步.md",":md"]],["v-5d611e5e","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E6%95%B0%E7%BB%84.html",{d:1681788517e3,e:`<h1> Array</h1>
<h2> Array 概述</h2>
<p>数组是一种<strong>类列表对象</strong>，是值的有序集合，它的键名是按次序排列的一组整数（0，1，2...）。</p>
<ul>
<li>
<p>JavaScript 数组使用一个 32 位整数保存数组的元素个数。数组的索引从 <code>0</code> 开始，数组最大能容纳 <code>4294967295</code>（即 <code>2^32-1</code>）个元素。</p>
<p>数组元素是对象属性，JavaScript 语法要求使用方括号表示法（或用引号包裹数组下标）访问以数字开头的属性。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">,</span> <span class="token string">'d'</span><span class="token punctuation">,</span> <span class="token string">'e'</span><span class="token punctuation">,</span> <span class="token string">'f'</span><span class="token punctuation">]</span>

<span class="token comment">// JavaScript 引擎通过隐式的 toString，将 arr[1] 中的 1 强制转换为字符串。</span>
arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token comment">// b</span>
arr<span class="token punctuation">[</span><span class="token number">1.00</span><span class="token punctuation">]</span> <span class="token comment">// b</span>
arr<span class="token punctuation">[</span><span class="token string">'1'</span><span class="token punctuation">]</span> <span class="token comment">// b</span>

<span class="token comment">// '1' 和 '01' 将指向 arr 对象上的两个不同的槽位</span>
arr<span class="token punctuation">[</span><span class="token string">'01'</span><span class="token punctuation">]</span> <span class="token comment">// undefined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 使用 Object.keys 方法返回数组的所有键名</span>
<span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">,</span> <span class="token string">'d'</span><span class="token punctuation">,</span> <span class="token string">'e'</span><span class="token punctuation">,</span> <span class="token string">'f'</span><span class="token punctuation">]</span>
Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token comment">// ['0', '1', '2', '3', '4', '5']</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>每个 JavaScript 数组都有一个 <code>length</code> 属性，该属性是一个动态值。针对非稀疏数组，<code>length</code> 属性就是数组元素的个数；针对稀疏数组，<code>length</code> 比所有元素的索引都要大。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span> <span class="token comment">// arr.length 为 3</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token comment">// 3</span>

<span class="token comment">// 设置数组的 length 属性【小于】当前数组成员个数的值</span>
<span class="token comment">// 该数组的成员数量会自动【减少】到 length 设置的值</span>
arr<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">2</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token comment">// ['a', 'b']</span>

<span class="token comment">// 设置数组的 length 属性【大于】当前数组成员个数的值</span>
<span class="token comment">// 该数组的成员数量会自动【增加】到 length 设置的值，新增的位置都是空位</span>
<span class="token comment">// 读取新增的位置会返回 undefined</span>
arr<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">4</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token comment">// ['a', 'b', empty × 2]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// undefined</span>

<span class="token comment">// 清空数组的一个有效方法，就是设置数组的 length 属性为 0</span>
arr<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">0</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token comment">// []</span>

<span class="token comment">// 设置数组的 length 属性为不合法的值，JavaScript 会报错</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token comment">// Uncaught RangeError: Invalid array length</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span>length <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span> <span class="token comment">// Uncaught RangeError: Invalid array length</span>
<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token string">'abc'</span> <span class="token comment">// Uncaught RangeError: Invalid array length</span>

<span class="token comment">// 数组本质上是一种对象，可以为数组添加属性，但是这影响 length 属性的值</span>
<span class="token comment">// length 属性的值等于最大的数字键加 1，数组如果没有整数键，所以 length 属性保持为 0</span>
<span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
arr<span class="token punctuation">[</span><span class="token string">'abc'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'abc'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token comment">// 0</span>
arr<span class="token punctuation">[</span><span class="token number">2.1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'abc'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token comment">// 0</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token comment">// [abc: 'abc', 2.1: 'abc']</span>

<span class="token comment">// 数组的键名添加超过范围的数值，该键名会自动转为字符串</span>
<span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
arr<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'a'</span>
arr<span class="token punctuation">[</span>Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'b'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token comment">// 0</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token comment">// [-1: 'a', 4294967296: 'b']</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 'a'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">4294967296</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// 'b'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>JavaScript 数组是<strong>动态的</strong>，并且可以包含不同的数据类型。</p>
<ul>
<li>在创建数组时无需声明一个固定的大小或者在数组大小变化时无需重新分配空间。</li>
<li>数组中包含数组称之为多维数组。可以通过将两组方括号链接在一起来访问数组内的另一个数组。</li>
</ul>
</li>
<li>
<p>JavaScript 数组不是关联数组（具有命名索引的数组，可以使用字符串或者其他类型的值作为索引），不能使用任意字符串作为索引访问数组元素，必须使用非负整数（或者非负整数的字符串形式）作为索引访问。</p>
</li>
<li>
<p>JavaScript 数组可能是稀疏数组，<strong>数组元素的索引不一定要连续的</strong>，它们之间可以有空缺。</p>
<ul>
<li>
<p>稀疏数组的特性</p>
<ul>
<li>含有空元素 <code>empty</code> 的数组。索引不连续，数组长度大于元素个数的数组。数组的空位是可读取的，返回 <code>undefined</code> 。</li>
<li>在大多数遍历数组的方法中，遇到 <code>empty</code> 元素的时候，<code>callback</code> 函数是不会执行的。比如  <code>forEach</code> 、 <code>for...in</code> 以及 <code>Object.keys</code> 方法进行遍历，空位都会被跳过。如果某个位置是 <code>undefined</code>，遍历的时候则不会被跳过。</li>
<li>稀疏数组在访问元素的速度上比密集数组慢。</li>
<li>稀疏数组在一些数组方法中与密集数组存在差异。</li>
</ul>
</li>
<li>
<p>生成稀疏数组</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> sparseArr01 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'sparseArr01 : '</span><span class="token punctuation">,</span> sparseArr01<span class="token punctuation">)</span>
<span class="token comment">// sparseArr02 : [empty × 5]</span>

<span class="token keyword">let</span> sparseArr02 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
sparseArr02<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">4</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'sparseArr02 : '</span><span class="token punctuation">,</span> sparseArr02<span class="token punctuation">)</span>
<span class="token comment">// sparseArr02 : [empty × 4, 5]</span>

<span class="token keyword">let</span> sparseArr03 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
sparseArr03<span class="token punctuation">.</span>length <span class="token operator">=</span> <span class="token number">5</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'sparseArr03 : '</span><span class="token punctuation">,</span> sparseArr03<span class="token punctuation">)</span>
<span class="token comment">// sparseArr03 : [empty × 5]</span>

<span class="token keyword">let</span> sparseArr04 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token punctuation">,</span> <span class="token punctuation">,</span> <span class="token punctuation">,</span> <span class="token punctuation">,</span><span class="token punctuation">]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'sparseArr04 : '</span><span class="token punctuation">,</span> sparseArr04<span class="token punctuation">)</span>
<span class="token comment">// sparseArr04 : [0, empty × 4]</span>

<span class="token keyword">let</span> sparseArr05 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>
<span class="token keyword">delete</span> sparseArr05<span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'sparseArr05 : '</span><span class="token punctuation">,</span> sparseArr05<span class="token punctuation">)</span>
<span class="token comment">// sparseArr05 : [0, 1, 2, 3, empty]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code>empty</code> VS <code>undefined</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> sparseArr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sparseArr<span class="token punctuation">)</span> <span class="token comment">// [empty × 3]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sparseArr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// undefined</span>

<span class="token keyword">let</span> undefinedArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>undefinedArr<span class="token punctuation">)</span> <span class="token comment">// [undefined, undefined, undefined]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>undefinedArr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// undefined</span>

sparseArr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// 无 console.log 输出</span>
undefinedArr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// 输出如下：</span>
<span class="token comment">// undefined</span>
<span class="token comment">// undefined</span>
<span class="token comment">// undefined</span>

<span class="token comment">// 使用 in 运算符判断指定属性是否在指定对象或原型链中</span>
<span class="token comment">// sparseArr 的键名都是空的</span>
<span class="token comment">// undefinedArr 的键名是有值的</span>
<span class="token number">0</span> <span class="token keyword">in</span> sparseArr <span class="token comment">// false</span>
<span class="token number">0</span> <span class="token keyword">in</span> undefinedArr <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>稀疏数组转密集数组</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> sparseArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token punctuation">,</span> <span class="token punctuation">,</span> <span class="token punctuation">,</span> <span class="token punctuation">,</span><span class="token punctuation">]</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'sparseArr : '</span><span class="token punctuation">,</span> sparseArr<span class="token punctuation">)</span> <span class="token comment">// sparseArr : [0, empty × 4]</span>

<span class="token function">Array</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> sparseArr<span class="token punctuation">)</span> <span class="token comment">// [0, undefined, undefined, undefined, undefined]</span>
Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>sparseArr<span class="token punctuation">)</span> <span class="token comment">// [0, undefined, undefined, undefined, undefined]</span>
<span class="token punctuation">[</span><span class="token operator">...</span>sparseArr<span class="token punctuation">]</span> <span class="token comment">// // [0, undefined, undefined, undefined, undefined]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>`,r:{minutes:52.55,words:15765},y:"a",t:"Array"},["/前端/JavaScript/基础知识/数组.html","/前端/JavaScript/基础知识/数组.md",":md"]],["v-d59d1c2c","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E7%B1%BB%E5%9E%8B%E6%A6%82%E8%BF%B0.html",{d:1681788517e3,e:`<h1> 类型概述</h1>
<h2> 原始值（primitive value）</h2>
<p>原始值（primitive value）是最简单的数据，也称为原始类型。</p>
<ul>
<li><code>Undefined</code> ：一个声明未定义的变量的初始值，或没有实际参数的形式参数。</li>
<li><code>Null</code> ：表示一个空对象指针。</li>
<li><code>Boolean</code> ：布尔值，取值仅能为 <code>true</code>（真）和 <code>false</code>（假）的数据类型。</li>
<li><code>Number</code> ：64 位双精度浮点型的数字数据类型。</li>
<li><code>Bigint</code> ：表示大于 <code>2^53 - 1</code> 的整数，<code>BigInt</code> 可以表示任意大的整数。</li>
<li><code>String</code> ：字符串，用于表示文本的字符序列。</li>
<li><code>Symbol</code> ：<code>Symbol()</code> 函数会返回 <code>symbol</code> 类型的值，<code>symbol</code> 值都是唯一的。一个 <code>symbol</code> 值能作为对象属性的标识符，这是该数据类型仅有的目的。</li>
</ul>`,r:{minutes:14.6,words:4381},y:"a",t:"类型概述"},["/前端/JavaScript/基础知识/类型概述.html","/前端/JavaScript/基础知识/类型概述.md",":md"]],["v-a3cd6e62","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/%E7%BD%91%E7%BB%9C%E8%AF%B7%E6%B1%82.html",{d:1700736799e3,e:`<h1> 网络请求</h1>
<h2> XMLHttpRequest 对象</h2>
<p><code>XMLHttpRequest</code>（XHR）对象用于与服务器交互。通过 <code>XMLHttpRequest</code> 可以在不刷新页面的情况下请求特定 URL，获取数据。</p>
<h3> XMLHttpRequest 实例属性</h3>
<ul>
<li>
<p><code>XMLHttpRequest.readyState</code> ： 返回一个 <code>XMLHttpRequest</code> 代理当前所处的状态。一个 XHR 代理总是处于下列状态中的一个：</p>
<table>
<thead>
<tr>
<th style="text-align:center">值</th>
<th style="text-align:center">状态</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code>0</code></td>
<td style="text-align:center"><code>UNSENT</code></td>
<td style="text-align:left"><code>XMLHttpRequest</code> 代理已创建，但尚未调用 <code>open()</code> 方法</td>
</tr>
<tr>
<td style="text-align:center"><code>1</code></td>
<td style="text-align:center"><code>OPENED</code></td>
<td style="text-align:left"><code>open()</code> 方法已经被调用，可以使用 <code>XMLHttpRequest</code> 实例的 <code>setRequestHeader()</code> 方法，设定 HTTP 请求的头信息</td>
</tr>
<tr>
<td style="text-align:center"><code>2</code></td>
<td style="text-align:center"><code>HEADERS_RECEIVED</code></td>
<td style="text-align:left"><code>send()</code> 方法已经被调用，并且头部和状态已经可获得</td>
</tr>
<tr>
<td style="text-align:center"><code>3</code></td>
<td style="text-align:center"><code>LOADING</code></td>
<td style="text-align:left">响应体部分正在被接收。<code>responseText</code> 属性已经包含部分数据</td>
</tr>
<tr>
<td style="text-align:center"><code>4</code></td>
<td style="text-align:center"><code>DONE</code></td>
<td style="text-align:left">请求操作已经完成。服务器返回的数据已经完全或失败</td>
</tr>
</tbody>
</table>
</li>
<li>
<p><code>XMLHttpRequest.response</code> ： 只读。返回响应的正文（即 HTTP 回应的 body 部分）。返回的类型为 <code>ArrayBuffer</code>、<code>Blob</code>、<code>Document</code>、<code>JavaScript Object</code> 或字符串中的一个，取决于请求的 <code>responseType</code> 属性。</p>
<ul>
<li>如果请求未成功或尚未发送，则返回 <code>null</code>。</li>
<li>如果 <code>responseType</code> 属性为 <code>"text"</code> 或 <code>""</code> （空字符串），在请求状态为 <code>LOADING</code> 时，<code>response</code> 属性包含到目前为止该请求已经取得的内容。</li>
</ul>
</li>
<li>
<p><code>XMLHttpRequest.responseType</code> ： 枚举字符串。用于指定响应中包含的数据类型。</p>
<ul>
<li>该属性可写。在调用 <code>open()</code> 方法之后、调用 <code>send()</code> 方法之前，可设置该属性的值。</li>
<li>如果 <code>responseType</code> 设为 <code>""</code> （空字符串），等同于默认值 <code>"text"</code>。</li>
<li><code>responseType</code> 属性枚举值
<ul>
<li><code>""</code>（空字符串） ： 等同于 <code>"text"</code> ，表示服务器返回文本数据。</li>
<li><code>"arraybuffer"</code> ： <code>ArrayBuffer</code> 对象，表示服务器返回二进制数组。</li>
<li><code>"blob"</code> ： <code>Blob</code> 对象，表示服务器返回二进制对象。</li>
<li><code>"document"</code> ： <code>Document</code> 对象，表示服务器返回一个文档对象。</li>
<li><code>"json"</code> ： JSON 对象。</li>
<li><code>"text"</code> ： 字符串。</li>
</ul>
</li>
</ul>
</li>
<li>
<p><code>XMLHttpRequest.responseText</code> ： 只读。返回从服务器接收到的字符串。只有 HTTP 请求完成接收以后，该属性才会包含完整的数据。</p>
</li>
<li>
<p><code>XMLHttpRequest.responseXML</code> ： 字符串。表示发送数据的服务器的网址。</p>
<ul>
<li>如果 URL 为空，则返回空字符串。</li>
<li>如果 URL 有锚点，则位于 URL # 后面的内容会被删除。</li>
<li>如果 URL 有重定向，<code>responseURL</code> 的值会是经过多次重定向后的最终 URL。</li>
</ul>
</li>
<li>
<p><code>XMLHttpRequest.responseURL</code> ： 只读。返回从服务器接收到 HTML 或 XML 的 <code>Document</code> 对象。</p>
<ul>
<li>如果请求未成功，尚未发送，或者检索的数据无法正确解析为 XML 或 HTML，则为 <code>null</code>。</li>
<li>该属性生效的前提是 HTTP 回应的 <code>Content-Type</code> 头信息等于 <code>text/xml</code> 或 <code>application/xml</code> 。要求在发送请求前，<code>XMLHttpRequest.responseType</code> 属性要设为 <code>document</code>。</li>
<li>如果 HTTP 回应的 <code>Content-Type</code> 头信息不等于 <code>text/xml</code> 和 <code>application/xml</code> ，从 <code>responseXML</code> 获取数据（即把数据按照 DOM 格式解析），需要手动调用 <code>XMLHttpRequest.overrideMimeType()</code> 方法，强制进行 XML 解析。</li>
</ul>
</li>
<li>
<p><code>XMLHttpRequest.status</code> ： 只读。返回 <code>XMLHttpRequest</code> 响应中的 HTTP 状态码。</p>
<ul>
<li>请求成功状态码为 <code>200</code> ，如果服务器没有返回状态码，该属性默认是 <code>200</code> 。请求发出之前，该属性为 <code>0</code> 。</li>
<li>HTTP 响应状态码分类
<ul>
<li>信息响应 (<code>100</code> – <code>199</code>)</li>
<li>成功响应 (<code>200</code> – <code>299</code>)</li>
<li>重定向消息 (<code>300</code> – <code>399</code>)</li>
<li>客户端错误响应 (<code>400</code> – <code>499</code>)</li>
<li>服务端错误响应 (<code>500</code> – <code>599</code>)</li>
</ul>
</li>
</ul>
</li>
<li>
<p><code>XMLHttpRequest.statusText</code> ： 服务器返回的一个 <code>DOMString</code> 类型的文本信息（包含了响应的 HTTP 状态码）。</p>
</li>
<li>
<p><code>XMLHttpRequest.timeout</code> ： 表示请求的超时时间（毫秒），超过该时长，请求会自动终止。默认值为 <code>0</code> ，表示没有超时限制。</p>
</li>
<li>
<p><code>XMLHttpRequest.upload</code> ： 返回一个 <code>XMLHttpRequestUpload</code> 对象，用来表示文件上传的进度。可以通过对其绑定事件来监听上传进度。</p>
<table>
<thead>
<tr>
<th style="text-align:center">事件</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code>onloadstart</code></td>
<td style="text-align:left">获取开始</td>
</tr>
<tr>
<td style="text-align:center"><code>onprogress</code></td>
<td style="text-align:left">数据传输进行中</td>
</tr>
<tr>
<td style="text-align:center"><code>onabort</code></td>
<td style="text-align:left">获取操作终止</td>
</tr>
<tr>
<td style="text-align:center"><code>onerror</code></td>
<td style="text-align:left">获取失败</td>
</tr>
<tr>
<td style="text-align:center"><code>onload</code></td>
<td style="text-align:left">获取成功</td>
</tr>
<tr>
<td style="text-align:center"><code>ontimeout</code></td>
<td style="text-align:left">获取操作在用户规定的时间内未完成</td>
</tr>
<tr>
<td style="text-align:center"><code>onloadend</code></td>
<td style="text-align:left">获取完成（不论成功与否）</td>
</tr>
</tbody>
</table>
</li>
<li>
<p><code>XMLHttpRequest.withCredentials</code> ： 布尔值，表示跨域请求时，用户信息（比如 <code>Cookie</code> 和认证的 HTTP 头信息）是否会包含在请求之中，默认为 <code>false</code> 。</p>
<ul>
<li>同源请求设置 <code>withCredentials</code> 无效。</li>
<li>为了让这个属性生效，服务器必须显式返回 <code>Access-Control-Allow-Credentials</code> 头信息。</li>
</ul>
</li>
</ul>`,r:{minutes:25.53,words:7658},y:"a",t:"网络请求"},["/前端/JavaScript/基础知识/网络请求.html","/前端/JavaScript/基础知识/网络请求.md",":md"]],["v-34f1796f","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%AE%9E%E7%94%A8%E6%8A%80%E5%B7%A7/%E5%B7%A5%E5%85%B7%E5%87%BD%E6%95%B0.html",{d:1699632281e3,e:`<h1> 工具函数</h1>
<h2> 判断类型</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">typeOf</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> toString <span class="token operator">=</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>toString<span class="token punctuation">;</span>
  <span class="token keyword">const</span> map <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'[object Boolean]'</span><span class="token operator">:</span> <span class="token string">'boolean'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'[object Number]'</span><span class="token operator">:</span> <span class="token string">'number'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'[object String]'</span><span class="token operator">:</span> <span class="token string">'string'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'[object Function]'</span><span class="token operator">:</span> <span class="token string">'function'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'[object Array]'</span><span class="token operator">:</span> <span class="token string">'array'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'[object Date]'</span><span class="token operator">:</span> <span class="token string">'date'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'[object RegExp]'</span><span class="token operator">:</span> <span class="token string">'regExp'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'[object Undefined]'</span><span class="token operator">:</span> <span class="token string">'undefined'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'[object Null]'</span><span class="token operator">:</span> <span class="token string">'null'</span><span class="token punctuation">,</span>
    <span class="token string-property property">'[object Object]'</span><span class="token operator">:</span> <span class="token string">'object'</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> map<span class="token punctuation">[</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:.45,words:135},y:"a",t:"工具函数"},["/前端/JavaScript/实用技巧/工具函数.html","/前端/JavaScript/实用技巧/工具函数.md",":md"]],["v-35e7f165","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%AE%9E%E7%94%A8%E6%8A%80%E5%B7%A7/%E6%89%8B%E5%86%99%E4%BB%A3%E7%A0%81.html",{d:1699632281e3,e:`<h1> 手写代码</h1>
<h2> 深度比较，模拟 lodash.isEqual</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 判断是否是对象或数组</span>
<span class="token keyword">function</span> <span class="token function">isObject</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">typeof</span> obj <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">&amp;&amp;</span> obj <span class="token operator">!==</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">isEqual</span><span class="token punctuation">(</span><span class="token parameter">obj1<span class="token punctuation">,</span> obj2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 值类型（注意，参数 equal 的一般不会是函数）</span>
    <span class="token keyword">return</span> obj1 <span class="token operator">===</span> obj2
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>obj1 <span class="token operator">===</span> obj2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 两个都是对象或数组，而且不相等</span>
  <span class="token comment">// 1. 先取出 obj1 和 obj2 的 keys，比较个数</span>
  <span class="token keyword">const</span> obj1Keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>obj1<span class="token punctuation">)</span>
  <span class="token keyword">const</span> obj2Keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>obj2<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>obj1Keys<span class="token punctuation">.</span>length <span class="token operator">!==</span> obj2Keys<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 2. 以 obj1 为基数，和 obj2 一次递归比较</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">in</span> obj1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 比较当前 key 的 val —— 递归</span>
    <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">isEqual</span><span class="token punctuation">(</span>obj1<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span> obj2<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 全相等</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:4.13,words:1239},y:"a",t:"手写代码"},["/前端/JavaScript/实用技巧/手写代码.html","/前端/JavaScript/实用技巧/手写代码.md",":md"]],["v-c21536aa","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%AE%9E%E7%94%A8%E6%8A%80%E5%B7%A7/%E7%BD%91%E9%A1%B5%E6%88%AA%E5%B1%8F.html",{d:1699632281e3,c:"JavaScript",g:["网页截屏"],e:`<h1> 网页截屏</h1>
<h2> <a href="http://puppeteerjs.com/" target="_blank" rel="noopener noreferrer">Puppeteer</a></h2>
<p>Puppeteer 是一个 Node 库，它提供了一个高级 API 来通过 DevTools 协议控制 Chromium 或 Chrome。Puppeteer 默认以 headless 模式运行。可实现：</p>
<ul>
<li>生成页面 PDF。</li>
<li>抓取 SPA（单页应用）并生成预渲染内容（即“SSR”（服务器端渲染））。</li>
<li>自动提交表单，进行 UI 测试，键盘输入等。</li>
<li>创建一个时时更新的自动化测试环境。 使用最新的 JavaScript 和浏览器功能直接在最新版本的Chrome中执行测试。</li>
<li>捕获网站的 timeline trace，用来帮助分析性能问题。</li>
<li>测试浏览器扩展。</li>
</ul>`,r:{minutes:1.81,words:544},y:"a",t:"网页截屏"},["/前端/JavaScript/实用技巧/网页截屏.html","/前端/JavaScript/实用技巧/网页截屏.md",":md"]],["v-46e62e58","/%E5%89%8D%E7%AB%AF/JavaScript/%E7%AE%97%E6%B3%95/",{d:1672025329e3,y:"a",t:""},["/前端/JavaScript/算法/","/前端/JavaScript/算法/README.md","/%E5%89%8D%E7%AB%AF/JavaScript/%E7%AE%97%E6%B3%95/README.md"]],["v-1e92ab56","/%E5%89%8D%E7%AB%AF/JavaScript/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/SOLID.html",{d:1702365993e3,e:`<h1> 设计原则</h1>
<h2> 面向对象程序设计</h2>
<p>面向对象程序设计（OOP，Object-oriented programming）是种具有对象概念的编程典范，同时也是一种程序开发的抽象方针。</p>
<ul>
<li>它可能包含数据、特性、代码与方法。</li>
<li>对象则指的是类（class）的实例。</li>
<li>它将对象作为程序的基本单元，将程序和数据封装其中，以提高软件的重用性、灵活性和扩展性，对象里的程序可以访问及经常修改对象相关连的数据。</li>
</ul>
<p>面向对象程序设计的基本概念：</p>
<ul>
<li><strong>类与对象</strong>：
<ul>
<li>类：定义事物的抽象特点。类的定义包含了数据的形式以及对数据的操作。</li>
<li>对象：类的实例（Instance），可以调用类中的方法。</li>
</ul>
</li>
<li><strong>封装</strong>：通过限制只有特定类的对象可以访问该特定类的成员，通常利用接口实现消息的传入传出。通常来说，成员的访问权限被分为 3 种：公有成员（public）、私有成员（private）以及保护成员（protected）。</li>
<li><strong>继承</strong>：根据已有类创建新类，子类继承父类。
<ul>
<li>子类比父类要更加具体化。</li>
<li>如果父类实现了某个接口，那么其所有子类都必须实现该接口。</li>
</ul>
</li>
<li><strong>多态</strong>：由继承而产生的相关的不同的类，其对象对同一消息会做出不同的响应。程序能够检测对象所属的实际类，并在当前上下文不知道其真实类型的情况下调用其实现的能力。</li>
</ul>`,r:{minutes:3.99,words:1196},y:"a",t:"设计原则"},["/前端/JavaScript/设计模式/SOLID.html","/前端/JavaScript/设计模式/SOLID.md",":md"]],["v-43efc7e4","/%E5%89%8D%E7%AB%AF/JavaScript/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%88%9B%E5%BB%BA%E5%9E%8B%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F.html",{d:1702365993e3,e:`<h1> 创建型设计模式</h1>
<p>创建型模式提供创建对象的机制，增加已有代码的灵活性和可复用性。</p>
<h2> 工厂模式 （Factory Method）</h2>
<p><strong>在父类中提供一个创建对象的方法，允许子类决定实例化对象的类型。</strong></p>
<p>适合应用场景：</p>
<ul>
<li>如果无法预知对象确切类别及其依赖关系时。可以将创建产品的代码与实际使用产品的代码分离，从而能在不影响其他代码的情况下扩展产品创建部分代码。</li>
<li>希望用户能扩展软件库或框架的内部组件时。在使用子类替代标准组件时，可以将各框架中构造组件的代码集中到单个工厂方法中，并在继承该组件之外允许任何人对该方法进行重写。</li>
<li>希望复用现有对象来节省系统资源，而不是每次都重新创建对象。</li>
</ul>`,r:{minutes:9.96,words:2988},y:"a",t:"创建型设计模式"},["/前端/JavaScript/设计模式/创建型设计模式.html","/前端/JavaScript/设计模式/创建型设计模式.md",":md"]],["v-0e378c3a","/%E5%89%8D%E7%AB%AF/JavaScript/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E7%BB%93%E6%9E%84%E5%9E%8B%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F.html",{d:1702365993e3,e:`<h1> 结构型设计模式</h1>
<p>结构型模式介绍如何将对象和类组装成较大的结构，并同时保持结构的灵活和高效。</p>
<h2> 适配器模式 （Adapter）</h2>
<p><strong>能使接口不兼容的对象能够相互合作。</strong></p>
<p>适合应用场景：</p>
<ul>
<li>希望使用某个类，但是其接口与其他代码不兼容时，可以使用适配器类。适配器模式允许创建一个中间层类，其可作为代码与遗留类、第三方类或提供怪异接口的类之间的转换器。</li>
<li>需要复用这样一些类，他们处于同一个继承体系，并且他们又有了额外的一些共同的方法，但是这些共同的方法不是所有在这一继承体系中的子类所具有的共性。可以将缺少功能的对象封装在适配器中，从而动态地获取所需功能。</li>
</ul>`,r:{minutes:14.1,words:4230},y:"a",t:"结构型设计模式"},["/前端/JavaScript/设计模式/结构型设计模式.html","/前端/JavaScript/设计模式/结构型设计模式.md",":md"]],["v-6be214f8","/%E5%89%8D%E7%AB%AF/JavaScript/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E8%A1%8C%E4%B8%BA%E5%9E%8B%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F.html",{d:1702365993e3,e:`<h1> 行为型设计模式</h1>
<p>行为模式负责对象间的高效沟通和职责委派。</p>
<h2> 职责链模式 （Chain of Responsibility）</h2>
<p><strong>允许将请求沿着处理者链进行发送。收到请求后，每个处理者均可对请求进行处理，或将其传递给链上的下个处理者。</strong></p>
<p>适合应用场景：</p>
<ul>
<li>当程序需要使用不同方式处理不同种类请求，而且请求类型和顺序预先未知时，可以使用责任链模式。该模式能将多个处理者连接成一条链。接收到请求后，它会“询问”每个处理者是否能够对其进行处理。这样所有处理者都有机会来处理请求。</li>
<li>当必须按顺序执行多个处理者时，可以使用责任链模式。无论以何种顺序将处理者连接成一条链，所有请求都会严格按照顺序通过链上的处理者。</li>
<li>如果所需处理者及其顺序必须在运行时进行改变，可以使用责任链模式。如果在处理者类中有对引用成员变量的设定方法，将能动态地插入和移除处理者，或者改变其顺序。</li>
</ul>`,r:{minutes:23.37,words:7010},y:"a",t:"行为型设计模式"},["/前端/JavaScript/设计模式/行为型设计模式.html","/前端/JavaScript/设计模式/行为型设计模式.md",":md"]],["v-378ddb9a","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E4%BC%98%E5%8C%96/%E5%85%B6%E4%BB%96%E4%BC%98%E5%8C%96.html",{d:1672025329e3,e:`<h1> 其他优化</h1>
<ul>
<li>
<p>防抖：一般用于表单搜索，点击事件等场景，为了防止短时间内多次触发事件。</p>
</li>
<li>
<p>节流：一般为了降低函数执行的频率，比如滚动条滚动。</p>
</li>
<li>
<p>按需引入：使用 UI 框架（例如：Ant Design）时，按需引入相关组件。</p>
</li>
<li>
<p>React 动画相关</p>
<ul>
<li>可使用 <code>classnames</code> npm 库动态添加类名，实现动画切换。该方式既不需要频繁 <code>setState</code> ，也不需要改变 DOM 。</li>
<li>操纵原生 DOM 。通过获取原生 DOM ，然后单独操作 DOM 实现动画功能，可以避免了 <code>setState</code> 改变带来 React Fiber 深度调和渲染的影响。</li>
<li>当使用 <code>setState</code> 实时改变 DOM 元素状态的是，尽量采用 CSS3 ， CSS3 开启硬件加速，使 GPU (Graphics Processing Unit) 发挥功能，从而提升性能。</li>
</ul>
</li>
<li>
<p>及时清除定时器/延时器/监听器。在对应的生命周期，进行清除，不然可能会造成内部泄露的情况。</p>
</li>
<li>
<p>合理使用 <code>state</code> 。对于视图更新不依赖于当前 <code>state</code> 时</p>
<ul>
<li>在类组件中，可以挂载到当前实例 <code>this</code>，避免通过 <code>state</code> 管理。</li>
<li>在函数组件中，可以通过 <code>useRef</code> 缓存数据。<code>useRef</code> 可以创建出一个 <code>ref</code> 原始对象，只要组件没有销毁，<code>ref</code> 对象就一直存在，可以把一些不依赖于视图更新的数据储存到 <code>ref</code> 对象中。</li>
</ul>
</li>
<li>
<p>不要在 hooks 的参数中，执行函数或者 new 实例。</p>
<ul>
<li>
<p>函数每次 rerender 都会执行 hooks ，在执行 hooks 函数的同时，也会执行函数的参数（如，代码片段中的 <code>fn()</code> 和 <code>new Fn()</code>），每一次 rerender 都会执行 fn 或者是 new 一个实例。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> hook1 <span class="token operator">=</span> <span class="token function">useRef</span><span class="token punctuation">(</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> hook2 <span class="token operator">=</span> <span class="token function">useRef</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>函数组件在初始化和更新流程中，会使用不同的 hooks 对象。大部分的 hooks 参数都作为初始化的参数，在更新阶段压根没有用到，那么传入的参数也就没有了意义。</p>
</li>
</ul>
</li>
</ul>`,r:{minutes:1.68,words:503},y:"a",t:"其他优化"},["/前端框架/React/React优化/其他优化.html","/前端框架/React/React优化/其他优化.md",":md"]],["v-74eb89d7","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E4%BC%98%E5%8C%96/%E5%A4%84%E7%90%86%E6%B5%B7%E9%87%8F%E6%95%B0%E6%8D%AE.html",{d:1672025329e3,e:`<h1> 处理海量数据</h1>
<p>根据 W3C 性能小组的介绍，超过 50ms 的任务就是长任务。</p>
<ul>
<li><code>0 - 16 ms</code> : 人们特别擅长跟踪运动，如果动画不流畅，他们就会对运动心生反感。用户可以感知每秒渲染 60 帧的平滑动画转场。也就是每帧 16 毫秒(包括浏览器将新帧绘制到屏蒂上所需的时间)，留给应用大约 10 毫秒的时间来生成一帧。</li>
<li><code>0 - 100 ms</code> : 在此时间窗口内响应用户操作，他们会觉得可以立即获得结果。时间再长，操作与反应之间的连接就会中断。</li>
<li><code>100 - 300 ms</code> : 用户会遇到轻微可觉察的延迟。</li>
<li><code>300 - 1000 ms</code> : 在此窗口内，延迟感觉像是任务自然和持续发展的一部分。对于网络上的大多数用户，加载页面或更改视图代表着一个任务。</li>
<li><code>1000+ ms</code> : 超过 1 秒，用户的注意力将离开他们正在执行的任务。</li>
<li><code>10000+ ms</code> : 用户感到失望，可能会放弃任务；之后他们或许不会再回来。</li>
</ul>`,r:{minutes:5.49,words:1648},y:"a",t:"处理海量数据"},["/前端框架/React/React优化/处理海量数据.html","/前端框架/React/React优化/处理海量数据.md",":md"]],["v-1bef6390","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E4%BC%98%E5%8C%96/%E6%B8%B2%E6%9F%93%E6%8E%A7%E5%88%B6.html",{d:1672025329e3,e:`<h1> React 渲染控制</h1>
<p><code>render</code> 的作用是根据一次更新中产生的新状态值，通过 <code>React.createElement</code> 替换成新的状态，得到新的 <code>React Element</code> 对象。在新的 <code>Element</code> 对象上，保存了最新状态值。 <code>createElement</code> 会产生一个全新的 <code>props</code>。</p>
<p>React 会调和由 <code>render</code> 函数产生 <code>chidlren</code>，将子代 <code>Element</code> 变成 <code>Fiber</code>（在该过程中，如果存在 <code>alternate</code>，会复用 <code>alternate</code> 进行克隆，如果没有 <code>alternate</code> ，则会创建一个），将 <code>props</code> 变成 <code>pendingProps</code> ，至此当前组件更新完毕。如果 <code>children</code> 是组件，会继续重复上一步，直到全部 <code>Fiber</code> 调和完毕，完成 <code>render</code> 阶段。</p>`,r:{minutes:11.18,words:3353},y:"a",t:"React 渲染控制"},["/前端框架/React/React优化/渲染控制.html","/前端框架/React/React优化/渲染控制.md",":md"]],["v-5c9b76e6","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E4%BC%98%E5%8C%96/%E6%B8%B2%E6%9F%93%E8%B0%83%E4%BC%98.html",{d:1672025329e3,e:`<h1> React 渲染调优</h1>
<h2> React.Suspense 异步渲染</h2>
<p><code>React.Suspense</code> 使得组件可以“等待”某些操作结束后，再进行渲染。可以通过 <code>fallback</code> 属性指定加载指示器（loading indicator）。</p>
<p>目前，<code>React.Suspense</code> 仅支持的使用场景是：通过 <code>React.lazy</code> 动态加载组件。它将在未来支持其它使用场景，如数据获取等。</p>
<p>最佳实践是将 <code>React.Suspense</code> 置于需要展示加载指示器（loading indicator）的位置，而 <code>React.lazy</code> 则可被放置于任何想要做代码分割的地方。</p>`,r:{minutes:4.7,words:1411},y:"a",t:"React 渲染调优"},["/前端框架/React/React优化/渲染调优.html","/前端框架/React/React优化/渲染调优.md",":md"]],["v-38deb022","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%8E%9F%E7%90%86/Context.html",{d:1677241803e3,e:`<h1> Context 原理</h1>
<ul>
<li>
<p><code>Provider</code> 传递流程：<code>Provider</code> 的更新，会深度遍历子代 <code>Fiber</code>，消费 <code>context</code> 的 <code>Fiber</code> 和父级链都会提升更新优先级。对于类组件的 <code>Fiber</code> ，会 <code>forceUpdate</code> 处理。接下来所有消费的 <code>Fiber</code>，都会 <code>beginWork</code> 。</p>
</li>
<li>
<p><code>context</code> 订阅流程： <code>contextType</code>、<code>useContext</code>、<code>Consumer</code> 会内部调用 <code>readContext</code>。<code>readContext</code> 会把 <code>Fiber</code> 上的 <code>dependencies</code> 属性和 <code>context</code> 对象建立起关联。</p>
</li>
</ul>`,r:{minutes:7.58,words:2274},y:"a",t:"Context 原理"},["/前端框架/React/React原理/Context.html","/前端框架/React/React原理/Context.md",":md"]],["v-612d55f6","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%8E%9F%E7%90%86/Fiber.html",{d:1675418223e3,e:`<h1> Fiber</h1>
<h2> React 理念</h2>
<blockquote>
<p>React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。</p>
</blockquote>
<p>React 关键是实现快速响应。制约快速响应的因素有：</p>
<ul>
<li>
<p>CPU 瓶颈。当遇到大计算量的操作或者设备性能不足使页面掉帧，导致卡顿。</p>
<ul>
<li>
<p>原因</p>
<p>JavaScript 引擎是单线程运行的，负责解析和执行 JavaScript 脚本程序。与 GUI 渲染线程互斥，防止渲染出现不可预期的结果。另外，异步 I/O 操作底层实际上可能是多线程的在驱动。</p>
<p>主流浏览器刷新频率是 60Hz （赫兹，频率的单位），即每 16.67ms （= 1000ms / 60Hz）浏览器刷新一次。每 16.67ms 时间内，需要完成的工作如下：</p>
<ul>
<li>
<p>输入事件（Input events）</p>
<ul>
<li>Blocking input events （阻塞输入事件）：如 <code>touch</code> 或 <code>wheel</code></li>
<li>Non-Blocking input events （非阻塞输入事件）：如 <code>click</code> 或 <code>keypress</code></li>
</ul>
</li>
<li>
<p>JavaScript 引擎解析执行：执行定时器（Timers）事件等回调</p>
</li>
<li>
<p>帧开始（Begin frame）：每一帧事件（Per frame events），如 <code>window resize</code> 、 <code>scroll</code> 、 <code>media query change</code> 、 <code>animation events</code></p>
</li>
<li>
<p>rAF（requestAnimationFrame）：执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。</p>
</li>
<li>
<p>页面布局（Layout） ：计算样式（Recalculate style）、更新布局（Update Layout）和 ResizeObserver（监视 Element 内容盒或边框盒或者 SVGElement 边界尺寸的变化）</p>
</li>
<li>
<p>绘制渲染（Paint）：合成更新（Compositing update）、重绘部分节点（Paint invalidation）和创建绘制记录（Paint Record）</p>
</li>
<li>
<p>执行 RIC （RequestIdleCallback）：插入一个函数，该函数将在浏览器空闲时期被调用</p>
<p>在浏览器繁忙的时候，可能不会有盈余时间，<code>requestIdleCallback</code> 回调可能就不会被执行。 为了避免饿死，可以通过 <code>requestIdleCallback</code> 的第二个参数指定一个超时时间。</p>
<p>同时，不建议在 <code>requestIdleCallback</code> 中进行 DOM 操作，因为这可能导致样式重新计算或重新布局(比如，操作 DOM 后马上调用 <code>getBoundingClientRect</code>)，时间很难预估，很有可能导致回调执行超时，从而掉帧。</p>
</li>
</ul>
<p></p>
<p>注：如果上述任意步骤占用时间过长，总时间超过过 16.67ms ，就会看到明显的卡顿。</p>
</li>
<li>
<p>解决方案</p>
<p>当 JavaScript 长时间执行时（如大量计算等），就会出现阻塞样式计算、绘制等工作，出现页面脱帧现象。</p>
<p>React 通过 Fiber 架构，使 Reconcilation （调和） 过程变成可中断的异步更新。</p>
<p>在浏览器每一帧的时间中，预留了时间给 JavaScript 线程，React 将渲染更新过程拆分为多个子任务。当预留时间不够用时，React 将线程控制权交还给浏览器执行样式布局和样式绘制等任务，进行 UI 渲染，React 则等待下一帧时间继续被中断的工作。</p>
</li>
</ul>
</li>
<li>
<p>I/O 瓶颈。发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应。</p>
<p>React 的解决方案是将人机交互研究的结果整合到真实的 UI 中 (opens new window)。</p>
<p>研究表明，在屏幕之间切换时显示过多的中间加载状态会使切换的速度变慢。从研究得知，悬停和文本输入之类的交互需要在很短的时间内处理，而点击和页面转换可以等待稍长时间而不会感到迟缓。</p>
<p>React 实现了 <code>Suspense</code> (opens new window)功能及配套的 hook —— <code>useDeferredValue</code></p>
</li>
</ul>`,r:{minutes:12.94,words:3882},y:"a",t:"Fiber"},["/前端框架/React/React原理/Fiber.html","/前端框架/React/React原理/Fiber.md",":md"]],["v-91bf567e","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%8E%9F%E7%90%86/Hooks.html",{d:1675989831e3,e:`<h1> Hooks 原理</h1>
<h2> 函数组件触发</h2>
<p>在 React Fiber Reconciler （调和）过程中，对于 <code>FunctionComponent</code> 类型（函数组件）的 <code>Fiber</code> ，会调用 <code>updateFunctionComponent()</code> 更新 <code>Fiber</code> 。</p>
<details class="hint-container details"><summary>updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes) 函数</summary>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">updateFunctionComponent</span><span class="token punctuation">(</span>
  <span class="token parameter">current<span class="token punctuation">,</span>
  workInProgress<span class="token punctuation">,</span>
  Component<span class="token punctuation">,</span>
  <span class="token literal-property property">nextProps</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  renderLanes</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> context
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>disableLegacyContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> unmaskedContext <span class="token operator">=</span> <span class="token function">getUnmaskedContext</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">,</span> Component<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    context <span class="token operator">=</span> <span class="token function">getMaskedContext</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">,</span> unmaskedContext<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> nextChildren
  <span class="token keyword">let</span> hasId
  <span class="token function">prepareToReadContext</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">,</span> renderLanes<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableSchedulingProfiler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">markComponentRenderStarted</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ... 省略 DEV 环境代码</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    nextChildren <span class="token operator">=</span> <span class="token function">renderWithHooks</span><span class="token punctuation">(</span>
      current<span class="token punctuation">,</span>
      workInProgress<span class="token punctuation">,</span>
      Component<span class="token punctuation">,</span>
      nextProps<span class="token punctuation">,</span>
      context<span class="token punctuation">,</span>
      renderLanes
    <span class="token punctuation">)</span>
    hasId <span class="token operator">=</span> <span class="token function">checkDidRenderIdHook</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableSchedulingProfiler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">markComponentRenderStopped</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>current <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>didReceiveUpdate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">bailoutHooks</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> workInProgress<span class="token punctuation">,</span> renderLanes<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token function">bailoutOnAlreadyFinishedWork</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> workInProgress<span class="token punctuation">,</span> renderLanes<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">getIsHydrating</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> hasId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">pushMaterializedTreeId</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// React DevTools reads this flag.</span>
  workInProgress<span class="token punctuation">.</span>flags <span class="token operator">|=</span> PerformedWork
  <span class="token function">reconcileChildren</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> workInProgress<span class="token punctuation">,</span> nextChildren<span class="token punctuation">,</span> renderLanes<span class="token punctuation">)</span>
  <span class="token keyword">return</span> workInProgress<span class="token punctuation">.</span>child
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,r:{minutes:26.62,words:7986},y:"a",t:"Hooks 原理"},["/前端框架/React/React原理/Hooks.html","/前端框架/React/React原理/Hooks.md",":md"]],["v-eae5c6c8","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%8E%9F%E7%90%86/React%E4%BD%8D%E8%BF%90%E7%AE%97.html",{d:1675758893e3,e:`<h1> React 位运算</h1>
<h2> 位运算符</h2>
<h3> 基本概念</h3>
<p>位运算符中的左右操作数转换为有符号 32 位整型二进制串（0 和 1 组成）， 且返回结果也是有符号 32 位整型。</p>
<ul>
<li>所以当操作数是浮点型时，首先会被转换成整型, 再进行位运算。对非 Number 类型使用位运算操作符时，会发生隐式转换。</li>
<li>当操作数过大, 超过了 <code>Int32</code> 范围, 超过的部分会被截取，取低位 <code>32bit</code> 。</li>
</ul>
<p>位运算符：</p>
<ul>
<li>按位与（<code>a &amp; b</code>）：在 a、b 的位表示中，每一个对应的位都为 1 则返回 1，否则返回 0</li>
<li>按位或（<code>a | b</code>）：在 a、b 的位表示中，每一个对应的位，只要有一个为 1 则返回 1，否则返回 0</li>
<li>按位异或（<code>a ^ b</code>）：在 a、b 的位表示中，每一个对应的位，两个不相同则返回 1，相同则返回 0</li>
<li>按位非（<code>~a</code>）：反转被操作数的位</li>
<li>左移（<code>a &lt;&lt; b</code>）：将 a 的二进制串向左移动 b 位，右边移入 0</li>
<li>算术右移（<code>a &gt;&gt; b</code>）：把 a 的二进制表示向右移动 b 位，丢弃被移出的所有位。（注：算术右移左边空出的位是根据最高位是 0 和 1 来进行填充的）</li>
<li>无符号右移 (左边空出位用 0 填充)（<code>a &gt;&gt;&gt; b</code>）：把 a 的二进制表示向右移动 b 位，丢弃被移出的所有位，并把左边空出的位都填充为 0</li>
</ul>`,r:{minutes:7.27,words:2181},y:"a",t:"React 位运算"},["/前端框架/React/React原理/React位运算.html","/前端框架/React/React原理/React位运算.md",":md"]],["v-639279dd","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%8E%9F%E7%90%86/Reconciler.html",{d:1675418244e3,e:`<h1> Reconciler</h1>
<p>在 React v16+ 中， Reconciler 与 Renderer 不再是交替工作。</p>
<ul>
<li>当 Scheduler 将任务交给 Reconciler 后，Reconciler 会为变化的虚拟 DOM 打上代表增/删/更新的标记。</li>
<li>整个 Scheduler 与 Reconciler 的工作都在内存中进行，只有当所有组件都完成 Reconciler 的工作，才会统一交给 Renderer。</li>
</ul>
<h2> Reconciler render 阶段</h2>
<p>Reconciler <code>render</code> 阶段开始于 <code>performSyncWorkOnRoot</code> 或 <code>performConcurrentWorkOnRoot</code> 函数的调用。</p>`,r:{minutes:22.24,words:6671},y:"a",t:"Reconciler"},["/前端框架/React/React原理/Reconciler.html","/前端框架/React/React原理/Reconciler.md",":md"]],["v-02b4b2d4","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%8E%9F%E7%90%86/Scheduler.html",{d:1675418267e3,e:`<h1> Scheduler</h1>
<p>对于 React v15 版本，在 Reconciler 中，<code>mount</code> 的组件会调用 <code>mountComponent</code>，<code>update</code> 的组件会调用 <code>updateComponent</code>，这两个方法都会递归更新子组件。由于递归执行，所以更新一旦开始，中途就无法中断，当层级很深时，递归更新时间超过了 16ms，用户交互就会卡顿。</p>
<p>以浏览器每一帧渲染的时间中是否有剩余时间作为任务中断的标准，可以通过 <code>window.requestIdleCallback()</code> API ，该 API 通过插入一个函数，这个函数将在浏览器空闲时期被调用。部分浏览器已实现该 API （即：<code>requestIdleCallback</code>），但是该 API 以下问题：</p>`,r:{minutes:25.26,words:7579},y:"a",t:"Scheduler"},["/前端框架/React/React原理/Scheduler.html","/前端框架/React/React原理/Scheduler.md",":md"]],["v-2d09c55a","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%8E%9F%E7%90%86/%E4%BA%8B%E4%BB%B6%E7%B3%BB%E7%BB%9F.html",{d:1672477929e3,e:`<h1> 事件系统</h1>
<h2> 原生 DOM 事件</h2>
<h3> 注册事件</h3>
<ul>
<li>
<p>设置事件目标的事件属性。事件处理属性由 <code>on</code> + 事件名组成（比如：<code>onchange</code>、<code>onload</code>、<code>onmouseover</code>等）。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> shippingAddressDOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'shippingAddress'</span><span class="token punctuation">)</span>
  shippingAddressDOM<span class="token punctuation">.</span><span class="token function-variable function">onsubmit</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>设置 HTML 标签元素的事件属性。</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'Hello World!'</span><span class="token punctuation">)</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当指定一串 JavaScript 代码作为 HTML 事件处理程序属性的值时，浏览器会把代码转换为类似如下的函数</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">with</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">with</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>form <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">with</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">/* ... 这里是编码 */</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code>EventTarget.addEventListener()</code>：将指定的监听器注册到 <code>EventTarget</code> 上，当该对象触发指定的事件时，指定的回调函数就会被执行。事件目标可以是一个文档上的元素 <code>Element</code>、<code>Document</code> 和 <code>Window</code>，以及任何支持事件的对象（比如 <code>XMLHttpRequest</code>）。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">addEventListener</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> listener<span class="token punctuation">,</span> useCapture<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code>type</code> : 监听的事件类型（名称），大小写敏感。</li>
<li><code>listener</code> : 监听函数。当所监听的事件类型触发时，会调用该监听函数。</li>
<li><code>useCapture</code> : 可选，布尔值。<code>true</code> 表示监听函数将在捕获阶段（capture）触发，默认值为 <code>false</code>（监听函数只在冒泡阶段被触发）。</li>
</ul>
</li>
</ul>`,r:{minutes:30.18,words:9055},y:"a",t:"事件系统"},["/前端框架/React/React原理/事件系统.html","/前端框架/React/React原理/事件系统.md",":md"]],["v-072550d3","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%9F%BA%E7%A1%80/Context.html",{d:1672025329e3,e:`<h1> Context</h1>
<p>Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。例如：首选语言，UI 主题等。</p>
<h2> React.createContext</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> MyContext <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span>defaultValue<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,r:{minutes:5.38,words:1613},y:"a",t:"Context"},["/前端框架/React/React基础/Context.html","/前端框架/React/React基础/Context.md",":md"]],["v-17a5c29a","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%9F%BA%E7%A1%80/JSX.html",{d:1672025329e3,e:`<h1> JSX</h1>
<p>JSX 是一种嵌入式的类似 XML 的语法。它可以被转换成合法的 JavaScript，尽管转换的语义是依据不同的实现而定的。</p>
<h2> JSX 简介</h2>
<h3> JSX 嵌入表达式</h3>
<p>在 JSX 语法中，可以在大括号（ <code>{ xxx }</code> ）内放置任何有效的 JavaScript 表达式。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">formatName</span><span class="token punctuation">(</span><span class="token parameter">user</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> user<span class="token punctuation">.</span>firstName <span class="token operator">+</span> <span class="token string">' '</span> <span class="token operator">+</span> user<span class="token punctuation">.</span>lastName
<span class="token punctuation">}</span>

<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">firstName</span><span class="token operator">:</span> <span class="token string">'Harper'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">lastName</span><span class="token operator">:</span> <span class="token string">'Perez'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token operator">&lt;</span>h1<span class="token operator">&gt;</span>Hello<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token function">formatName</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">!</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:10.74,words:3221},y:"a",t:"JSX"},["/前端框架/React/React基础/JSX.html","/前端框架/React/React基础/JSX.md",":md"]],["v-393169d8","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%9F%BA%E7%A1%80/LifeCycle.html",{d:1672025329e3,e:`<h1> React 生命周期</h1>
<h2> 类组件生命周期</h2>
<p></p>
<p>React 生命周期图示： <a href="https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram" target="_blank" rel="noopener noreferrer">https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram</a></p>
<h3> constructor</h3>
<p>在 React 组件挂载之前，会调用它的构造函数。在为 <code>React.Component</code> 子类实现构造函数时，应在其他语句之前调用 <code>super(props)</code>。</p>`,r:{minutes:17.74,words:5321},y:"a",t:"React 生命周期"},["/前端框架/React/React基础/LifeCycle.html","/前端框架/React/React基础/LifeCycle.md",":md"]],["v-52e16bf2","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%9F%BA%E7%A1%80/Props.html",{d:1672025329e3,e:`<h1> Props</h1>
<h2> Props 的使用</h2>
<p>React 中的 <code>props</code> 在标签内部的属性和方法会绑定在 <code>props</code> 对象属性上，对于组件的插槽会被绑定在 <code>props</code> 的 <code>children</code> 属性中。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">'react'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span>

<span class="token keyword">const</span> <span class="token function-variable function">Child</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>Child Component<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">Parent</span> <span class="token operator">=</span> <span class="token parameter">props</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Parent props : '</span><span class="token punctuation">,</span> props<span class="token punctuation">)</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> messageProps<span class="token punctuation">,</span> onClickProps<span class="token punctuation">,</span> ComponentProps<span class="token punctuation">,</span> renderFnProps <span class="token punctuation">}</span> <span class="token operator">=</span> props
  <span class="token keyword">const</span> <span class="token punctuation">[</span>
    renderPropsChildrenFn<span class="token punctuation">,</span>
    renderPropsChildrenComponent<span class="token punctuation">,</span>
    renderPropsChildrenDOM<span class="token punctuation">,</span>
  <span class="token punctuation">]</span> <span class="token operator">=</span> props<span class="token punctuation">.</span>children

  <span class="token keyword">function</span> <span class="token function">renderPropsChildren</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> childrenProps <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// 遍历渲染 props.children</span>
    <span class="token keyword">return</span> props<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">childrenItem</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'childrenItem'</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span> childrenItem<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>React<span class="token punctuation">.</span><span class="token function">isValidElement</span><span class="token punctuation">(</span>childrenItem<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> React<span class="token punctuation">.</span><span class="token function">cloneElement</span><span class="token punctuation">(</span>
          childrenItem<span class="token punctuation">,</span>
          <span class="token punctuation">{</span> <span class="token operator">...</span>childrenProps <span class="token punctuation">}</span><span class="token punctuation">,</span>
          childrenItem<span class="token punctuation">.</span>props<span class="token punctuation">.</span>children
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>childrenItem <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">childrenItem</span><span class="token punctuation">(</span>childrenProps<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>childrenItem <span class="token keyword">instanceof</span> <span class="token class-name">HTMLElement</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> childrenItem
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>【props <span class="token operator">-</span> 属性】：<span class="token punctuation">{</span>messageProps<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>【props <span class="token operator">-</span> 渲染函数】：<span class="token punctuation">{</span><span class="token function">renderFnProps</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
        【props <span class="token operator">-</span> 组件】： <span class="token operator">&lt;</span>ComponentProps <span class="token operator">/</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>【props <span class="token operator">-</span> 插槽 <span class="token operator">-</span> 渲染函数】：<span class="token punctuation">{</span><span class="token function">renderPropsChildrenFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>【props <span class="token operator">-</span> 插槽 <span class="token operator">-</span> 渲染组件】：<span class="token punctuation">{</span>renderPropsChildrenComponent<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>【props <span class="token operator">-</span> 插槽 <span class="token operator">-</span> 渲染 <span class="token constant">DOM</span> 节点】：<span class="token punctuation">{</span>renderPropsChildrenDOM<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>【props <span class="token operator">-</span> 插槽 <span class="token operator">-</span> 遍历 props<span class="token punctuation">.</span>children】：<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span><span class="token punctuation">{</span><span class="token function">renderPropsChildren</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">onClickProps</span><span class="token punctuation">(</span><span class="token string">'onClick change content'</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>
        Parent Component <span class="token operator">-</span> button change messageProps
      <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">PropsContainer</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>message<span class="token punctuation">,</span> setMessage<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">'Hello World!'</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">setMessage</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>Parent
        messageProps<span class="token operator">=</span><span class="token punctuation">{</span>message<span class="token punctuation">}</span>
        onClickProps<span class="token operator">=</span><span class="token punctuation">{</span>handleClick<span class="token punctuation">}</span>
        ComponentProps<span class="token operator">=</span><span class="token punctuation">{</span>Child<span class="token punctuation">}</span>
        renderFnProps<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>Render Function<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span><span class="token punctuation">}</span>
      <span class="token operator">&gt;</span>
        <span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>Parent Slot Render Function<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span><span class="token punctuation">}</span>
        <span class="token operator">&lt;</span>Child <span class="token operator">/</span><span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>Parent Slot div Dom<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>Parent<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> PropsContainer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:5.77,words:1731},y:"a",t:"Props"},["/前端框架/React/React基础/Props.html","/前端框架/React/React基础/Props.md",":md"]],["v-696c11e4","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%9F%BA%E7%A1%80/React%E7%BB%84%E4%BB%B6.html",{d:1672025329e3,e:`<h1> React 组件</h1>
<p>React 组件可以定义为 <code>class</code> 组件 或 函数组件 两种形式。</p>
<p>React 组件本质上就是类和函数，与常规的类和函数不同的是，组件承载了渲染视图的 UI 和更新视图的 <code>setState</code> 、 <code>useState</code> 等方法。</p>
<p>React 在底层逻辑上会像正常实例化类和正常执行函数那样处理的组件。因此，函数与类上的特性在 React 组件上同样具有，比如原型链，继承，静态属性等。</p>
<details class="hint-container details"><summary>类组件与函数组件示例</summary>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 类组件</span>
<span class="token keyword">class</span> <span class="token class-name">Welcome</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  state <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Hello World!</span><span class="token template-punctuation string">\`</span></span> <span class="token punctuation">}</span>
  <span class="token function-variable function">sayHelloJs</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'Hello JavaScript!'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">marginTop</span><span class="token operator">:</span> <span class="token string">'20px'</span> <span class="token punctuation">}</span><span class="token punctuation">}</span> onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>sayHelloJs<span class="token punctuation">}</span><span class="token operator">&gt;</span>
        <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>message<span class="token punctuation">}</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 函数组件</span>
<span class="token keyword">function</span> <span class="token function">FunComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>message<span class="token punctuation">,</span> setMessage<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">'Hello World!'</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>div onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setMessage</span><span class="token punctuation">(</span><span class="token string">'Hello JavaScript!'</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token punctuation">{</span>message<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,r:{minutes:21.03,words:6308},y:"a",t:"React 组件"},["/前端框架/React/React基础/React组件.html","/前端框架/React/React基础/React组件.md",":md"]],["v-034a88ef","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%9F%BA%E7%A1%80/Ref.html",{d:1672025329e3,e:`<h1> Ref</h1>
<p>Refs 提供了一种方式，允许访问 DOM 节点或在 render 方法中创建的 React 元素。</p>
<h2> 创建 Ref</h2>
<h3> 类组件 React.createRef</h3>
<p><code>React.createRef</code> 创建一个能够通过 <code>ref</code> 属性附加到 React 元素的 <code>ref</code>。</p>
<p><code>React.createRef</code> 一般用于类组件创建 Ref 对象，可以将 Ref 对象绑定在类组件实例上。</p>
<p>注意：不要在函数组件中使用 <code>React.createRef</code>，否则，会造成 Ref 对象内容丢失等情况。</p>`,r:{minutes:8.68,words:2604},y:"a",t:"Ref"},["/前端框架/React/React基础/Ref.html","/前端框架/React/React基础/Ref.md",":md"]],["v-65ab3d71","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%9F%BA%E7%A1%80/State.html",{d:1672025329e3,e:`<h1> State （Legacy 模式）</h1>
<ul>
<li><code>legacy</code> 模式</li>
<li><code>blocking</code> 模式</li>
<li><code>concurrent</code> 模式</li>
</ul>
<h2> 类组件中的 state</h2>
<h3> setState</h3>
<p><code>setState()</code> 将对组件 <code>state</code> 的更改排入队列，并通知 React 需要使用更新后的 <code>state</code> 重新渲染此组件及其子组件。<code>setState()</code> 并不总是立即更新组件，它会批量推迟更新。</p>`,r:{minutes:10.12,words:3035},y:"a",t:"State （Legacy 模式）"},["/前端框架/React/React基础/State.html","/前端框架/React/React基础/State.md",":md"]],["v-0b82ffbb","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%9F%BA%E7%A1%80/Transition.html",{d:1677241834e3,e:`<h1> Transition （过渡）</h1>
<h2> startTransition</h2>
<h3> startTransition 的使用</h3>
<p><code>startTransition(scope)</code> ：允许在不阻塞 UI 的情况下更新状态</p>
<ul>
<li><code>scope</code> ：通过调用一个或者多个 set 函数来更新某些状态的回调函数。回调函数中的更新任务会被标记为过渡更新任务，在渲染并发的场景下，更新优先级会被降级，中断更新。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> startTransition <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span>

<span class="token keyword">function</span> <span class="token function">TabContainer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>tab<span class="token punctuation">,</span> setTab<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">'about'</span><span class="token punctuation">)</span>

  <span class="token keyword">function</span> <span class="token function">selectTab</span><span class="token punctuation">(</span><span class="token parameter">nextTab</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">startTransition</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">setTab</span><span class="token punctuation">(</span>nextTab<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:3.63,words:1088},y:"a",t:"Transition （过渡）"},["/前端框架/React/React基础/Transition.html","/前端框架/React/React基础/Transition.md",":md"]],["v-1dca019c","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%9F%BA%E7%A1%80/useSyncExternalStore.html",{d:1677244961e3,e:`<h1> useSyncExternalStore 订阅外部数据源</h1>
<h2> useSyncExternalStore 的使用</h2>
<p><code>useSyncExternalStore</code> 能够让 React 组件在 <code>concurrent</code> 模式下安全地有效地读取外接数据源，在组件渲染过程中能够检测到变化，并且在数据源发生变化的时候，能够调度更新。当读取到外部状态发生了变化，会触发一个强制更新，来保证结果的一致性。</p>
<p><code>const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)</code></p>`,r:{minutes:4.41,words:1324},y:"a",t:"useSyncExternalStore 订阅外部数据源"},["/前端框架/React/React基础/useSyncExternalStore.html","/前端框架/React/React基础/useSyncExternalStore.md",":md"]],["v-3d99be36","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%9F%BA%E7%A1%80/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html",{d:1672025329e3,e:`<h1> React 基础</h1>
<h2> 其他</h2>
<ul>
<li>
<p>JSX</p>
<ul>
<li>变量、表达式</li>
<li>calss style</li>
<li>子元素和组件</li>
<li>判断条件</li>
<li>渲染列表</li>
</ul>
</li>
<li>
<p>React 事件为何 bind this</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'React'</span>
<span class="token keyword">class</span> <span class="token class-name">Home</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'zhangsan'</span><span class="token punctuation">,</span>
      <span class="token literal-property property">list</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'id-1'</span><span class="token punctuation">,</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'标题1'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'id-2'</span><span class="token punctuation">,</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'标题2'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'id-3'</span><span class="token punctuation">,</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'标题3'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>clickHandle1 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">clickHandle1</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>p onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>clickHandle1<span class="token punctuation">}</span><span class="token operator">&gt;</span>点击<span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>p onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>clickHandle2<span class="token punctuation">}</span><span class="token operator">&gt;</span>点击<span class="token number">2</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>a href<span class="token operator">=</span><span class="token string">"www.baidu.com"</span> onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>clickHandle3<span class="token punctuation">}</span><span class="token operator">&gt;</span>
          点击<span class="token number">3</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>ul<span class="token operator">&gt;</span>
          <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>list<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span>
            <span class="token punctuation">;</span><span class="token operator">&lt;</span>li
              key<span class="token operator">=</span><span class="token punctuation">{</span>item<span class="token punctuation">.</span>id<span class="token punctuation">}</span>
              onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">clickHandler4</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>id<span class="token punctuation">,</span> item<span class="token punctuation">.</span>title<span class="token punctuation">)</span><span class="token punctuation">}</span>
            <span class="token operator">&gt;</span>
              index <span class="token punctuation">{</span>index<span class="token punctuation">}</span><span class="token punctuation">;</span> title <span class="token punctuation">{</span>item<span class="token punctuation">.</span>title<span class="token punctuation">}</span>
            <span class="token operator">&lt;</span><span class="token operator">/</span>li<span class="token operator">&gt;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>ul<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// this - 使用 bind</span>
  <span class="token function">clickHandle1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'this'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token comment">// this 默认为 undefined</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'测试'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// this - 使用静态方法</span>
  <span class="token function-variable function">clickHandle2</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'测试'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// event</span>
  <span class="token function-variable function">clickHandle3</span> <span class="token operator">=</span> <span class="token parameter">event</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 阻止默认行为</span>
    event<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 阻止冒泡</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'target'</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token comment">// 指向当前元素，即当前元素触发</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'current target'</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span>currentTarget<span class="token punctuation">)</span> <span class="token comment">// 指向当前元素，假象！！！</span>

    <span class="token comment">// 注意，event 其实是 React 封装的。可以看 __proto__.constructor 是 SyntheticEvent 组合事件</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'event'</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span> <span class="token comment">// 不是原生的 Event ，原生的 MouseEvent</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'event.__proto__.constructor'</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span><span class="token class-name">__proto__</span><span class="token punctuation">.</span>constructor<span class="token punctuation">)</span>

    <span class="token comment">// 原生 event 如下。其 __proto__.constructor 是 MouseEvent</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'nativeEvent'</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span>nativeEvent<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'nativeEvent target'</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span>nativeEvent<span class="token punctuation">.</span>target<span class="token punctuation">)</span> <span class="token comment">// 指向当前元素，即当前元素触发</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'nativeEvent current target'</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span>nativeEvent<span class="token punctuation">.</span>currentTarget<span class="token punctuation">)</span> <span class="token comment">// 指向 document ！！！</span>

    <span class="token comment">// 1. event 是 SyntheticEvent ，模拟出来 DOM 事件所有能力</span>
    <span class="token comment">// 2. event.nativeEvent 是原生事件对象</span>
    <span class="token comment">// 3. 所有的事件，都被挂载到 document 上</span>
    <span class="token comment">// 4. 和 DOM 事件不一样，和 Vue 事件也不一样</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 传递参数</span>
  <span class="token function">clickHandler4</span><span class="token punctuation">(</span><span class="token parameter">id<span class="token punctuation">,</span> title<span class="token punctuation">,</span> event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> title<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'event'</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span> <span class="token comment">// 最后追加一个参数，即可接收 event</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>React 表单</p>
<ul>
<li>受控组件：表单的值受到了 this.setState 的控制</li>
<li>input textarea select 用 value</li>
<li>checked radio 用 checked</li>
</ul>
</li>
<li>
<p>React 父子组件通讯</p>
<ul>
<li>props 传递数据</li>
<li>props 传递函数</li>
<li>props 类型检查</li>
</ul>
</li>
<li>
<p>setState</p>
<ul>
<li>
<p>不可变值：不能直接修改 state 的值</p>
<ul>
<li>state 要在构造函数中定义</li>
<li>不要直接修改 state ，使用不可变值（函数式编程，纯函数）
<ul>
<li>不可变值 - 数组。(注意，不能直接对数组进行 push pop splice 等，这样违反不可变值)</li>
<li>不可变值 - 对象。(注意，不能直接对对象进行属性设置，这样违反不可变值)</li>
</ul>
</li>
</ul>
</li>
<li>
<p>setState 可能是异步更新（有可能是同步更新）</p>
<ul>
<li>
<p>单独使用是异步的</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 联想 Vue $nextTick - DOM</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'count by callback'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token punctuation">)</span> <span class="token comment">// 回调函数中可以拿到最新的 state</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'count'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token punctuation">)</span> <span class="token comment">// 异步的，拿不到最新值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>setTimeout 中 setState 是同步的</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'count in setTimeout'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>自己定义的 DOM 事件，setState 是同步的。再 componentDidMount 中</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function-variable function">bodyClickHandler</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'count in body event'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 自己定义的 DOM 事件，setState 是同步的</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>bodyClickHandler<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">componentWillUnmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 及时销毁自定义 DOM 事件</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>bodyClickHandler<span class="token punctuation">)</span>
  <span class="token comment">// clearTimeout</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>state 异步更新的话，更新前会被合并</p>
<ul>
<li>
<p>传入对象，会被合并（类似 Object.assign ）。执行结果只一次 +1</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>传入函数，不会被合并。执行结果是 +3</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prevState<span class="token punctuation">,</span> props</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">count</span><span class="token operator">:</span> prevState<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prevState<span class="token punctuation">,</span> props</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">count</span><span class="token operator">:</span> prevState<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prevState<span class="token punctuation">,</span> props</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">count</span><span class="token operator">:</span> prevState<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
</li>
<li>
<p><a href="https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/" target="_blank" rel="noopener noreferrer">React 生命周期</a></p>
</li>
<li>
<p>React 高级特性</p>
<ul>
<li>
<p>函数组件</p>
<ul>
<li>纯函数，输入 props，输出 JSX</li>
<li>没有实例，没有生命周期，没有 state</li>
</ul>
</li>
<li>
<p>非受控组件：不会随着 state 的改变而改变</p>
<ul>
<li>ref （React.createRef()）</li>
<li>defaultValue defaultChecked</li>
<li>手动操作 DOM 元素</li>
<li>使用场景
<ul>
<li>必须手动操作 DOM 元素，setState 实现不了</li>
<li>文件上传 <code>&lt;input type="file" /&gt;</code></li>
<li>某些富文本编辑器，需要传入 DOM 元素</li>
</ul>
</li>
</ul>
</li>
<li>
<p>Portals 使用场景</p>
<ul>
<li>overflow: hidden</li>
<li>父组件 z-index 值太小</li>
<li>fixed 需要放在 body 第一层级</li>
</ul>
</li>
<li>
<p>context</p>
</li>
<li>
<p>异步组件</p>
<ul>
<li>import()</li>
<li>React.lazy</li>
<li>React.Suspense</li>
</ul>
</li>
<li>
<p>性能优化</p>
<ul>
<li>shouldComponentUpdate
<ul>
<li>默认返回 true，即 React 默认重新渲染所有子组件 （React 默认：父组件有更新，子组件无条件更新）</li>
<li>必须配合 “不可变值” 一起使用</li>
<li>有性能问题时再考虑使用</li>
</ul>
</li>
<li>PureComponent 和 React.memo
<ul>
<li>PureComponent - shouldComponentUpdate 中实现了浅比较</li>
<li>memo，函数组件中的 PureComponent</li>
<li>浅比较已使用大部分情况（尽量不要做深度比较）</li>
</ul>
</li>
<li>不可变值 immutable.js
<ul>
<li>彻底拥抱“不可变值”</li>
<li>基于共享数据（不是深拷贝），速度好</li>
<li>需要一定学习成本</li>
</ul>
</li>
</ul>
</li>
<li>
<p>高阶组件 HOC：不是一种功能，而是一种模式</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">HOCFactory</span> <span class="token operator">=</span> <span class="token parameter">Component</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">class</span> <span class="token class-name">HOC</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
    <span class="token comment">// 在此定义多个组件的公用逻辑</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token operator">&lt;</span>Component <span class="token punctuation">{</span><span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span> <span class="token comment">// 返回拼装的结果</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token constant">HOC</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> EnhancedComponent1 <span class="token operator">=</span> <span class="token function">HOCFactory</span><span class="token punctuation">(</span>WrappedComponent1<span class="token punctuation">)</span>
<span class="token keyword">const</span> EnhancedComponent2 <span class="token operator">=</span> <span class="token function">HOCFactory</span><span class="token punctuation">(</span>WrappedComponent2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>redux connect 是个高阶组件</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> connect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react-redux'</span>
<span class="token comment">// connect 是高阶组件</span>
<span class="token keyword">const</span> VisibleTodoList <span class="token operator">=</span> <span class="token function">connect</span><span class="token punctuation">(</span>
  mapStateToProps<span class="token punctuation">,</span>
  mapDispatchToProps
<span class="token punctuation">)</span><span class="token punctuation">(</span>TodoList<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>Render Props</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Render Props 的核心思想</span>
<span class="token comment">// 通过一个函数将 class 组件的 state 作为 props 传递给纯函数组件</span>
<span class="token keyword">class</span> <span class="token class-name">Factory</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token comment">/* state 即多个组件的公共逻辑的数据 */</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">/* 修改 state */</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">App</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>Factory
    render<span class="token operator">=</span><span class="token punctuation">{</span>
      <span class="token comment">/* render 是一个函数组件 */</span>
      <span class="token parameter">props</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
        <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>
          <span class="token punctuation">{</span>props<span class="token punctuation">.</span>a<span class="token punctuation">}</span> <span class="token punctuation">{</span>props<span class="token punctuation">.</span>b<span class="token punctuation">}</span> <span class="token operator">...</span>
        <span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token operator">/</span><span class="token operator">&gt;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>HOC vs Render Props</p>
<ul>
<li>HOC: 模式简单，但会增加组件层级</li>
<li>Render Props：代码简洁，学习成本较高</li>
<li>按需使用</li>
</ul>
</li>
</ul>
</li>
<li>
<p>Redux 使用</p>
<ul>
<li>基本概念</li>
<li>单项数据流</li>
<li>react-redux</li>
<li>异步 action</li>
<li>中间件</li>
</ul>
</li>
<li>
<p>React 原理</p>
<ul>
<li>
<p>函数式编程</p>
<ul>
<li>一种编程范式，概念比较多</li>
<li>纯函数</li>
<li>不可变值</li>
</ul>
</li>
<li>
<p>vdom 和 diff</p>
<ul>
<li>React.createElement 即 h 函数，返回 vnode</li>
<li>第一个参数，可能是组件，也可能是 html tag</li>
<li>组件名，首字母必须大写（React 规定）</li>
</ul>
</li>
<li>
<p>jsx 本质（jsx 可以在<a href="https://www.babeljs.cn" target="_blank" rel="noopener noreferrer">babel</a>官网查看）</p>
<ul>
<li>jsx 等同于 vue 模板</li>
<li>vue 模板不是 html</li>
<li>jsx 不是 js</li>
</ul>
</li>
<li>
<p>合成事件
</p>
<ul>
<li>所有事件挂载到 document 上</li>
<li>event 不是原生的，是 SyntheticEvent 合成事件对象</li>
<li>和 Vue 事件不同，和 DOM 事件也不同</li>
<li>为何要合成事件机制
<ul>
<li>更好的兼容性和跨平台</li>
<li>挂载到 document，减少内存消耗，避免频繁解绑</li>
<li>方便事件的统一管理（如事务机制）</li>
</ul>
</li>
</ul>
</li>
<li>
<p>setState 和 batchUpdate</p>
<ul>
<li>
<p>有时异步（普通使用），有时同步（setTimeout、DOM 事件）</p>
</li>
<li>
<p>有时合并（对象形式），有时不合并（函数形式）</p>
</li>
<li>
<p>后者比较好理解（像 Object.assign）</p>
</li>
<li>
<p>setState 主流程
</p>
<p></p>
<p></p>
</li>
<li>
<p>batchUpdate 机制</p>
<ul>
<li>能命中 batchUpdate 机制的情况
<ul>
<li>生命周期（和它调用的函数）</li>
<li>React 中注册的事件（和它调用的函数）</li>
<li>React 可以“管理”的入口</li>
</ul>
</li>
<li>不能命中 batchUpdate 机制的情况
<ul>
<li>setTimeout setInterval 等（和它调用的函数）</li>
<li>自定义的 DOM 事件（和它调用的函数）</li>
<li>React “管不到” 的入口</li>
</ul>
</li>
</ul>
</li>
<li>
<p>transaction 事务机制
</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">ListDemo</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token function-variable function">increase</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 开始：处于 batchUpdaste</span>
    <span class="token comment">// isBatchUpdates = true</span>
    <span class="token comment">// 其他任何操作</span>
    <span class="token comment">// 结束</span>
    <span class="token comment">// isBatchingUpdates = false</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>组件渲染过程</p>
<ul>
<li>props state</li>
<li>render() 生成 vnode</li>
<li>patch(elem, vnode)</li>
</ul>
</li>
<li>
<p>组件更新过程</p>
<ul>
<li>setState(newState) --&gt; dirtyComponents(可能有子组件)</li>
<li>render() 生成 newVnode</li>
<li>patch(vnode, newVnode)
<ul>
<li>reconciliation 阶段 - 执行 diff 算法，纯 js 计算</li>
<li>commit 阶段 - 将 diff 结构渲染 DOM</li>
</ul>
</li>
</ul>
</li>
<li>
<p>patch 不拆分阶段，可能会有的性能问题</p>
<ul>
<li>js 是单线程，且和 DOM 渲染共用一个线程</li>
<li>当组件足够复杂，组件更新时计算和渲染都压力大</li>
<li>同时再有 DOM 操作需求（动画，鼠标拖拽等），将卡顿</li>
</ul>
</li>
<li>
<p>解决方案 fiber</p>
<ul>
<li>将 reconciliation 阶段进行任务拆分（commit 无法拆分）</li>
<li>DOM 需要渲染时暂停，空闲时恢复</li>
<li>window.requestIdleCallback</li>
</ul>
</li>
</ul>
</li>
<li>
<p>React 组件如何通讯</p>
<ul>
<li>父子组件 props</li>
<li>自定义事件</li>
<li>redux 和 context</li>
</ul>
</li>
<li>
<p>JSX 本质是什么（可对比 Vue 的模板编译）</p>
<ul>
<li>createElement</li>
<li>执行返回 vnode</li>
</ul>
</li>
<li>
<p>context 是什么，有何用途</p>
<ul>
<li>父组件，向其下所有子组件传递信息</li>
<li>如一些简单的公用信息：主题色、语言等</li>
<li>复杂的公用信息，请用 redux</li>
</ul>
</li>
<li>
<p>shouldComponentUpdate 的用途</p>
<ul>
<li>性能优化</li>
<li>配合“不可变值”一起使用，否则会出错</li>
</ul>
</li>
<li>
<p>描述 redux 单项数据流</p>
</li>
<li>
<p>setState 是同步还是异步
</p>
</li>
</ul>`,r:{minutes:6.41,words:1922},y:"a",t:"React 基础"},["/前端框架/React/React基础/基础知识.html","/前端框架/React/React基础/基础知识.md",":md"]],["v-2595cd5b","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%9F%BA%E7%A1%80/%E6%A8%A1%E5%9D%97%E5%8C%96CSS.html",{d:1672025329e3,e:`<h1> 模块化 CSS</h1>
<p>在样式开发过程中，存在以下问题：</p>
<ul>
<li>
<p>全局污染</p>
<p>CSS 使用全局选择器机制来设置样式，优点是方便重写样式。缺点是所有的样式都是全局生效，样式可能被错误覆盖，为了提高样式权重会应用 <code>!important</code> 、 <code>行内样式</code> 或者 复杂的选择器权重进行处理。Web Components 标准中的 <code>Shadow DOM</code> 能彻底解决这个问题，但它的做法有点极端，样式彻底局部化，造成外部无法重写样式，损失了灵活性。</p>
</li>
<li>
<p>命名混乱</p>
<p>多人协同开发时为了避免样式冲突，选择器越来越复杂，容易形成不同的命名风格，很难统一。样式变多后，命名将更加混乱。</p>
</li>
<li>
<p>依赖管理不彻底</p>
<p>组件应该相互独立，引入一个组件时，应该只引入它所需要的 CSS 样式。Saas/Less 很难实现对每个组件都编译出单独的 CSS，引入所有模块的 CSS 又造成浪费。使用 JS 的模块化来管理 CSS 依赖是很好的解决办法，Webpack 的 <code>css-loader</code> 提供了这种能力。</p>
</li>
<li>
<p>无法共享变量</p>
<p>复杂组件要使用 JS 和 CSS 来共同处理样式，就会造成有些变量在 JS 和 CSS 中冗余，Sass/PostCSS/CSS 等都不提供跨 JS 和 CSS 共享变量这种能力。</p>
</li>
<li>
<p>代码压缩不彻底</p>
</li>
</ul>`,r:{minutes:7.65,words:2294},y:"a",t:"模块化 CSS"},["/前端框架/React/React基础/模块化CSS.html","/前端框架/React/React基础/模块化CSS.md",":md"]],["v-55437d44","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%9F%BA%E7%A1%80/%E8%87%AA%E5%AE%9A%E4%B9%89Hooks.html",{d:1677241814e3,e:`<h1> 自定义 Hooks</h1>
<p>通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。</p>
<h2> Hooks 特性</h2>
<ul>
<li>
<p>驱动条件：自定义 Hooks 驱动本质上就是函数组件的执行</p>
<ul>
<li>
<p><code>props</code> 改变带来的函数组件执行</p>
</li>
<li>
<p><code>useState</code> 、 <code>useReducer</code> 改变 <code>state</code> 引起函数组件的更新</p>
</li>
</ul>
</li>
<li>
<p>顺序原则：不能放在条件语句中，而且要保持执行顺序的一致性</p>
</li>
<li>
<p>条件限定：没有加条件限定，就有可能造成不必要的上下文的执行，或是组件的循环渲染执行</p>
</li>
<li>
<p>考虑可变性：考虑一些状态值发生变化，是否有依赖于当前值变化的执行逻辑或执行副作用</p>
<ul>
<li>
<p>对于依赖于可变性状态的执行逻辑，可以用 <code>useMemo</code> 来处理</p>
</li>
<li>
<p>对于可变性状态的执行副作用，可以用 <code>useEffect</code> 来处理</p>
</li>
<li>
<p>对于依赖可变性状态的函数或者属性，可以用 <code>useCallback</code> 来处理</p>
</li>
</ul>
</li>
<li>
<p>闭包效应</p>
<p>函数组件更新就是函数本身执行，一次更新所有含有状态的 Hooks （<code>useState</code> 和 <code>useReducer</code>）产生的状态 <code>state</code> 是重新声明的</p>
<p>如果 <code>useEffect</code> ， <code>useMemo</code> <code>，useCallback</code> 等 Hooks 内部如果引用了 <code>state</code> 或 <code>props</code> 的值，这些状态最后保存在了函数组件对应的 <code>Fiber</code> 上，此次函数组件执行完毕后，这些状态就不会被垃圾回收机制回收释放</p>
<p>造成的影响是 Hooks 如果没有把内部使用的 <code>state</code> 或 <code>props</code> 作为依赖项，内部就一直无法使用最新的 <code>props</code> 或者 <code>state</code></p>
<p>如何确认依赖关系：</p>
<ul>
<li>
<p>分析 Hooks 内部可能发生变化的状态，这个状态可以是 <code>state</code> 或者 <code>props</code></p>
</li>
<li>
<p>分析 <code>useMemo</code> 或者 <code>useCallback</code> 内部是否使用上述状态，或者是否关联使用 <code>useMemo</code> 或者 <code>useCallback</code> 派生出来的状态。如果有使用，则添加到 <code>deps</code> 依赖项中</p>
</li>
<li>
<p>分析 <code>useEffect</code>、<code>useLayoutEffect</code>、<code>useImperativeHandle</code> 内部是否使用上述两个步骤产生的值，以及依赖这些值进行的一些副作用。如果有使用，则添加到 <code>deps</code> 依赖项中</p>
</li>
</ul>
</li>
</ul>`,r:{minutes:10.49,words:3146},y:"a",t:"自定义 Hooks"},["/前端框架/React/React基础/自定义Hooks.html","/前端框架/React/React基础/自定义Hooks.md",":md"]],["v-5a3976f8","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%9F%BA%E7%A1%80/%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6.html",{d:1672025329e3,e:`<h1> 高阶组件（HOC）</h1>
<p>高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧，它是一种基于 React 的组合特性而形成的设计模式。具体而言，<strong>高阶组件是参数为组件，返回值为新组件的函数</strong>。</p>
<h2> 常见高阶组件</h2>
<h3> 属性代理</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">proxyPropsHOC</span><span class="token punctuation">(</span><span class="token parameter">Component</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">class</span> <span class="token class-name">extends</span> React<span class="token punctuation">.</span>Component <span class="token punctuation">{</span>
    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 过滤掉非此 HOC 额外的 props，且不要进行透传</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> extraProp<span class="token punctuation">,</span> <span class="token operator">...</span>passThroughProps <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props

      <span class="token comment">// 将 props 注入到被包装的组件中，</span>
      <span class="token comment">// 通常为 state 的值或者实例方法。</span>
      <span class="token keyword">const</span> injectedProp <span class="token operator">=</span> someStateOrInstanceMethod

      <span class="token comment">// 将 props 传递给被包装组件</span>
      <span class="token keyword">return</span> <span class="token operator">&lt;</span>Component injectedProp<span class="token operator">=</span><span class="token punctuation">{</span>injectedProp<span class="token punctuation">}</span> <span class="token punctuation">{</span><span class="token operator">...</span>passThroughProps<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:7.39,words:2218},y:"a",t:"高阶组件（HOC）"},["/前端框架/React/React基础/高阶组件.html","/前端框架/React/React基础/高阶组件.md",":md"]],["v-094754f4","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E7%94%9F%E6%80%81/react-redux.html",{d:1676567248e3,e:`<h1> Redux</h1>
<p>Redux 是 JavaScript 应用的状态容器，提供可预测的状态管理。</p>
<p>Redux 可以作为发布订阅模式的一个具体实现。Redux 都会创建一个 <code>store</code> ，里面保存了状态信息，改变 <code>store</code> 的方法 <code>dispatch</code> ，以及订阅 <code>store</code> 变化的方法 <code>subscribe</code> 。</p>
<ul>
<li><a href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">Redux</a></li>
<li><a href="https://cn.redux.js.org/" target="_blank" rel="noopener noreferrer">Redux 中文官网</a></li>
</ul>`,r:{minutes:13.08,words:3923},y:"a",t:"Redux"},["/前端框架/React/React生态/react-redux.html","/前端框架/React/React生态/react-redux.md",":md"]],["v-21191fa2","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E7%94%9F%E6%80%81/react-router.html",{d:1676282742e3,e:`<h1> React-Router v6.x</h1>
<p>React Router 是完整的 React 路由解决方案。</p>
<ul>
<li><a href="https://reactrouter.com/en/main" target="_blank" rel="noopener noreferrer">React Router</a></li>
<li><a href="https://runebook.dev/zh/docs/react_router/-index-" target="_blank" rel="noopener noreferrer">React Router 6.4 [中文]</a></li>
</ul>`,r:{minutes:2.5,words:749},y:"a",t:"React-Router v6.x"},["/前端框架/React/React生态/react-router.html","/前端框架/React/React生态/react-router.md",":md"]],["v-426d051c","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2/Vue2%E5%9F%BA%E7%A1%80.html",{d:1672025329e3,e:`<h1> Vue 2.x 基础</h1>
<h2> MVC 与 MVVM</h2>
<p></p>
<h3> MVC 的组成</h3>
<ul>
<li><strong>模型（Model）</strong> 用于封装与应用程序的业务逻辑相关的数据以及对数据的处理方法。</li>
<li><strong>视图（View）</strong> 能够实现数据有目的的显示。</li>
<li><strong>控制器（Controller）</strong> 起到不同层面间的组织作用，用于控制应用程序的流程。它处理事件并作出响应。事件包括用户的行为和数据 Model 上的改变。</li>
</ul>
<p>MVC 架构通常是使用控制器更新模型，视图从模型中获取数据去渲染。当用户有输入时，会通过控制器去更新模型，并且通知视图进行更新。</p>`,r:{minutes:19.94,words:5981},y:"a",t:"Vue 2.x 基础"},["/前端框架/Vue/Vue2/Vue2基础.html","/前端框架/Vue/Vue2/Vue2基础.md",":md"]],["v-04f29fb0","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2/Vue2%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.html",{d:1672025329e3,e:`<h1> Vue 2.x 实现原理</h1>
<h2> 全局概览</h2>
<p></p>
<p>Vue 2.x 基于 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" target="_blank" rel="noopener noreferrer"><code>Object.defineProperty</code></a> 实现<strong>响应式系统</strong>。</p>
<h2> Object.defineProperty</h2>`,r:{minutes:17.33,words:5199},y:"a",t:"Vue 2.x 实现原理"},["/前端框架/Vue/Vue2/Vue2实现原理.html","/前端框架/Vue/Vue2/Vue2实现原理.md",":md"]],["v-55ffc80d","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2/Vue2%E5%AE%9E%E7%94%A8%E6%8A%80%E5%B7%A7.html",{d:1672025329e3,e:`<h1> Vue 2.x 实用技巧</h1>
<h2> 全局组件注册</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 目录</span>
<span class="token comment">// src</span>
<span class="token comment">//  | --- components</span>
<span class="token comment">//  |      | --- componentsA.vue</span>
<span class="token comment">//  |      | --- componentsB.vue</span>

<span class="token comment">// globalComponent.js</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span> <span class="token comment">// 引入vue</span>

<span class="token comment">// 处理首字母大写： abc =&gt; Abc</span>
<span class="token keyword">function</span> <span class="token function">changeStr</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> str<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// require.context(arg1, arg2, arg3)</span>
<span class="token comment">// &gt;&gt;&gt; arg1 - 读取文件的路径</span>
<span class="token comment">// &gt;&gt;&gt; arg2 - 是否遍历文件的子目录</span>
<span class="token comment">// &gt;&gt;&gt; arg3 - 匹配文件的正则</span>
<span class="token keyword">const</span> requireComponent <span class="token operator">=</span> require<span class="token punctuation">.</span><span class="token function">context</span><span class="token punctuation">(</span><span class="token string">'.'</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.vue$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span>
requireComponent<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fileName</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token function">requireComponent</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>
  <span class="token keyword">const</span> componentName <span class="token operator">=</span> <span class="token function">changeStr</span><span class="token punctuation">(</span>
    <span class="token comment">// ./componentsA.vue =&gt; componentsA</span>
    fileName<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\\.\\/</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.\\w+$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
  <span class="token comment">// 动态注册该目录下的所有.vue文件</span>
  Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span>componentName<span class="token punctuation">,</span> config<span class="token punctuation">.</span>default <span class="token operator">||</span> config<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:.74,words:223},y:"a",t:"Vue 2.x 实用技巧"},["/前端框架/Vue/Vue2/Vue2实用技巧.html","/前端框架/Vue/Vue2/Vue2实用技巧.md",":md"]],["v-61469c82","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2/Vue2%E7%9B%B8%E5%85%B3%E7%BB%84%E4%BB%B6%E5%AE%9E%E7%8E%B0.html",{d:1672025329e3,e:`<h1> Vue 2.x 相关组件实现</h1>
<h2> 具有数据校验功能的表单组件</h2>
<p><code>Form组件</code> 的核心功能是数据校验，一个 <code>Form</code> 中包含了多个 <code>FormItem</code>，当点击提交按钮时，<strong>逐一对每个 <code>FormItem</code> 内的表单组件校验，而校验是由使用者发起，并通过 <code>Form</code> 来调用每一个 <code>FormItem</code> 的验证方法，再将校验结果汇总后，通过 <code>Form</code> 返回出去</strong>。</p>`,r:{minutes:3.51,words:1054},y:"a",t:"Vue 2.x 相关组件实现"},["/前端框架/Vue/Vue2/Vue2相关组件实现.html","/前端框架/Vue/Vue2/Vue2相关组件实现.md",":md"]],["v-511dd236","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2/Vue2%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1%E6%96%B9%E5%BC%8F.html",{d:1672025329e3,e:`<h1> Vue 2.x 组件通信方式</h1>
<h2> <code>props</code> / <code>$emit</code></h2>
<ul>
<li><strong>父组件A</strong> -&gt; <strong>子组件B</strong>: 通过 <code>props</code> 传递参数</li>
<li><strong>子组件B</strong> -&gt; <strong>父组件A</strong>: <strong>子组件B</strong> 中 <code>$emit</code> 触发事件并携带参数, 在 <strong>父组件A</strong> 中使用 <code>v-on</code> 监听</li>
</ul>`,r:{minutes:5.31,words:1593},y:"a",t:"Vue 2.x 组件通信方式"},["/前端框架/Vue/Vue2/Vue2组件通信方式.html","/前端框架/Vue/Vue2/Vue2组件通信方式.md",":md"]],["v-6db912e3","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2/VueRouter.html",{d:1672025329e3,e:`<h1> Vue Router（3.x）</h1>
<h2> 基本使用</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// router/index.js</span>
<span class="token comment">// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> VueRouter <span class="token keyword">from</span> <span class="token string">'vue-router'</span>
Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>VueRouter<span class="token punctuation">)</span>

<span class="token comment">// 1. 定义（路由）组件，可以从其他文件 import 进来</span>
<span class="token keyword">import</span> routerComponentA <span class="token keyword">from</span> <span class="token string">'./routerComponentA.vue'</span>
<span class="token keyword">import</span> routerComponentB <span class="token keyword">from</span> <span class="token string">'./routerComponentB.vue'</span>
<span class="token comment">// 路由懒加载</span>
<span class="token keyword">const</span> <span class="token function-variable function">routerComponentC</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./routerComponentC.vue'</span><span class="token punctuation">)</span>

<span class="token comment">// 2. 定义路由</span>
<span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token comment">// 对应当前路由的路径，总是解析为绝对路径</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
    <span class="token comment">// 路由组件</span>
    component<span class="token operator">?</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>
    <span class="token comment">// 路由懒加载</span>
    <span class="token comment">// component：resolve =&gt; (require(['需要加载的路由的地址'])，resolve)</span>
    <span class="token comment">// 命名路由：通过 &lt;router-link&gt; 的 to 属性 或者 router.push 进行路由导航是，可以传递一个对象 { name: '命令路由的名字', params: {} }</span>
    name<span class="token operator">?</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
    <span class="token comment">// 命名视图组件</span>
    <span class="token comment">// 在界面中可以拥有多个单独命名的视图，而不是只有一个单独的出口。&lt;router-view&gt; 标签未设置名字，默认为 default</span>
    <span class="token comment">// 一个视图使用一个组件渲染，对于同个路由，多个视图就需要多个组件。</span>
    <span class="token comment">// &lt;router-view class="view one"&gt;&lt;/router-view&gt;</span>
    <span class="token comment">// &lt;router-view class="view two" name="a"&gt;&lt;/router-view&gt;</span>
    components<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>name<span class="token operator">:</span> string<span class="token punctuation">]</span><span class="token operator">:</span> Component <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 重定向路由</span>
    <span class="token comment">// 如果是 Function，则接受 目标路由 作为参数，return 重定向的 字符串路径/路径对象</span>
    <span class="token comment">// 注意：导航守卫并没有应用在跳转路由上，而仅仅应用在其目标上。</span>
    redirect<span class="token operator">?</span><span class="token operator">:</span> string <span class="token operator">|</span> Location <span class="token operator">|</span> Function<span class="token punctuation">,</span>
    props<span class="token operator">?</span><span class="token operator">:</span> boolean <span class="token operator">|</span> Object <span class="token operator">|</span> Function<span class="token punctuation">,</span>
    <span class="token comment">// 别名</span>
    <span class="token comment">// /a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。</span>
    alias<span class="token operator">?</span><span class="token operator">:</span> string <span class="token operator">|</span> Array<span class="token operator">&lt;</span>string<span class="token operator">&gt;</span><span class="token punctuation">,</span>
    <span class="token comment">// 嵌套路由</span>
    <span class="token comment">// 注意：以 / 开头的嵌套路径会被当作根路径。</span>
    children<span class="token operator">?</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>RouteConfig<span class="token operator">&gt;</span><span class="token punctuation">,</span>
    <span class="token comment">// 路由独享守卫</span>
    beforeEnter<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">to</span><span class="token operator">:</span> Route<span class="token punctuation">,</span> <span class="token literal-property property">from</span><span class="token operator">:</span> Route<span class="token punctuation">,</span> <span class="token literal-property property">next</span><span class="token operator">:</span> Function</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">,</span>
    <span class="token comment">// 路由元信息</span>
    meta<span class="token operator">?</span><span class="token operator">:</span> any<span class="token punctuation">,</span>

    <span class="token comment">// 2.6.0+</span>
    <span class="token comment">// 匹配规则是否大小写敏感？(默认值：false)</span>
    caseSensitive<span class="token operator">?</span><span class="token operator">:</span> boolean<span class="token punctuation">,</span>
    <span class="token comment">// 编译正则的选项</span>
    pathToRegexpOptions<span class="token operator">?</span><span class="token operator">:</span> Object
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

<span class="token comment">// 3. 创建 router 实例，然后传 \`routes\` 配置</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  routes
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> router

<span class="token comment">// main.js</span>
<span class="token keyword">import</span> router <span class="token keyword">from</span> <span class="token string">'./router'</span>
<span class="token comment">// 4. 创建和挂载根实例</span>
<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  router<span class="token punctuation">,</span>
  <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token parameter">h</span> <span class="token operator">=&gt;</span> <span class="token function">h</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:10.01,words:3002},y:"a",t:"Vue Router（3.x）"},["/前端框架/Vue/Vue2/VueRouter.html","/前端框架/Vue/Vue2/VueRouter.md",":md"]],["v-5db1d7ae","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2/Vuex.html",{d:1672025329e3,e:`<h1> Vuex（3.x）</h1>
<p>Vuex 是一个专为 Vue.js 应用程序开发的<strong>状态管理模式</strong>。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。</p>
<p></p>
<h2> Vuex 基本配置</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// store</span>
<span class="token comment">//   | --- modules</span>
<span class="token comment">//   |        | --- user.js</span>
<span class="token comment">//   | --- actions.js</span>
<span class="token comment">//   | --- getters.js</span>
<span class="token comment">//   | --- index.js</span>

<span class="token comment">// store/modules/user.js</span>
<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// namespaced: true, // 开启命名空间</span>
  <span class="token literal-property property">state</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">userName</span><span class="token operator">:</span> <span class="token string">''</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">mutations</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'SET_USER_NAME'</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> userName</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>userName <span class="token operator">=</span> userName
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">getUserInfo</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>state<span class="token punctuation">,</span> commit<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token function">getUserInfoHttp</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>token<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> data <span class="token operator">=</span> res<span class="token punctuation">.</span>data
            <span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">'SET_USER_NAME'</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span>userName<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> user

<span class="token comment">// store/actions.js</span>
<span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">setUserInfo</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit <span class="token punctuation">}</span><span class="token punctuation">,</span> name</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">'SET_USER_NAME'</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> getters

<span class="token comment">// store/getters.js</span>
<span class="token keyword">const</span> getters <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">userName</span><span class="token operator">:</span> <span class="token parameter">state</span> <span class="token operator">=&gt;</span> state<span class="token punctuation">.</span>user<span class="token punctuation">.</span>userName<span class="token punctuation">,</span>
  <span class="token comment">// 可以接受其他 getter 作为第二个参数</span>
  <span class="token function-variable function">userNameLen</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> getters</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> getters<span class="token punctuation">.</span>userName<span class="token punctuation">.</span>length
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> getters

<span class="token comment">// store/index.js</span>
<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> Vuex <span class="token keyword">from</span> <span class="token string">'vuex'</span>
Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Vuex<span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">new</span> <span class="token class-name">Vuex<span class="token punctuation">.</span>Store</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    user
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  getters<span class="token punctuation">,</span>
  actions
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// main.js</span>
<span class="token keyword">import</span> store <span class="token keyword">from</span> <span class="token string">'./store'</span>
<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">'#app'</span><span class="token punctuation">,</span>
  store<span class="token punctuation">,</span>
  <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token parameter">h</span> <span class="token operator">=&gt;</span> <span class="token function">h</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:6.94,words:2083},y:"a",t:"Vuex（3.x）"},["/前端框架/Vue/Vue2/Vuex.html","/前端框架/Vue/Vue2/Vuex.md",":md"]],["v-8fe351e0","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/vue-router.html",{d:1672025329e3,e:`<h1> Vue Router（3.x）</h1>
<p>Vue.js 的设计是一个渐进式 JavaScript 框架，核心是解决视图渲染的问题，其他能通过插件的方式进行扩展。Vue Router 就是路由插件。</p>
<details class="hint-container details"><summary>使用 Vue Router</summary>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">"app"</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>h1<span class="token operator">&gt;</span>Hello App<span class="token operator">!</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>p<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 使用 router<span class="token operator">-</span>link 组件来导航<span class="token punctuation">.</span> <span class="token operator">--</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 通过传入 <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">to</span><span class="token template-punctuation string">\`</span></span> 属性指定链接<span class="token punctuation">.</span> <span class="token operator">--</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> <span class="token operator">&lt;</span>router<span class="token operator">-</span>link<span class="token operator">&gt;</span> 默认会被渲染成一个 <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;a&gt;</span><span class="token template-punctuation string">\`</span></span> 标签 <span class="token operator">--</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>router<span class="token operator">-</span>link to<span class="token operator">=</span><span class="token string">"/foo"</span><span class="token operator">&gt;</span>Go to Foo<span class="token operator">&lt;</span><span class="token operator">/</span>router<span class="token operator">-</span>link<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>router<span class="token operator">-</span>link to<span class="token operator">=</span><span class="token string">"/bar"</span><span class="token operator">&gt;</span>Go to Bar<span class="token operator">&lt;</span><span class="token operator">/</span>router<span class="token operator">-</span>link<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 路由出口 <span class="token operator">--</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 路由匹配到的组件将渲染在这里 <span class="token operator">--</span><span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span>router<span class="token operator">-</span>view<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>router<span class="token operator">-</span>view<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>

<span class="token comment">// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)</span>

<span class="token comment">// 1. 定义 (路由) 组件。</span>
<span class="token comment">// 可以从其他文件 import 进来</span>
<span class="token keyword">const</span> Foo <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'&lt;div&gt;foo&lt;/div&gt;'</span> <span class="token punctuation">}</span>
<span class="token keyword">const</span> Bar <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">'&lt;div&gt;bar&lt;/div&gt;'</span> <span class="token punctuation">}</span>

<span class="token comment">// 2. 定义路由</span>
<span class="token comment">// 每个路由应该映射一个组件。 其中"component" 可以是</span>
<span class="token comment">// 通过 Vue.extend() 创建的组件构造器，</span>
<span class="token comment">// 或者，只是一个组件配置对象。</span>
<span class="token comment">// 我们晚点再讨论嵌套路由。</span>
<span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/foo'</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> Foo <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">'/bar'</span><span class="token punctuation">,</span> <span class="token literal-property property">component</span><span class="token operator">:</span> Bar <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

<span class="token comment">// 3. 创建 router 实例，然后传 \`routes\` 配置</span>
<span class="token comment">// 你还可以传别的配置参数, 不过先这么简单着吧。</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  routes <span class="token comment">// (缩写) 相当于 routes: routes</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 4. 创建和挂载根实例。</span>
<span class="token comment">// 记得要通过 router 配置参数注入路由，</span>
<span class="token comment">// 从而让整个应用都有路由功能</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  router
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,r:{minutes:33.52,words:10055},y:"a",t:"Vue Router（3.x）"},["/前端框架/Vue/Vue2源码解析/vue-router.html","/前端框架/Vue/Vue2源码解析/vue-router.md",":md"]],["v-6f01d847","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/vue-vuex.html",{d:1672025329e3,e:`<h1> Vuex（3.x）</h1>
<p>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。</p>
<p>Vuex 应用的核心就是 <code>store</code>（仓库）。<code>store</code> 基本上就是一个容器，它包含着应用中大部分的状态 (<code>state</code>)。Vuex 和单纯的全局对象有以下两点不同：</p>
<ul>
<li>Vuex 的状态存储是响应式的。当 Vue 组件从 <code>store</code> 中读取状态的时候，若 <code>store</code> 中的状态发生变化，那么相应的组件也会相应地得到高效更新。</li>
<li>不能直接改变 <code>store</code> 中的状态。改变 <code>store</code> 中的状态的唯一途径就是显式地提交 <code>(commit) mutation</code>。这样可以方便地跟踪每一个状态的变化，从而让能够实现一些工具帮助更好地了解应用。</li>
</ul>`,r:{minutes:27.25,words:8176},y:"a",t:"Vuex（3.x）"},["/前端框架/Vue/Vue2源码解析/vue-vuex.html","/前端框架/Vue/Vue2源码解析/vue-vuex.md",":md"]],["v-3a2ef9ba","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/%E5%93%8D%E5%BA%94%E5%BC%8F.html",{d:1672025329e3,e:`<h1> Vue 响应式</h1>
<h2> 响应式对象</h2>
<h3> Object.defineProperty</h3>
<p><code>Object.defineProperty(obj, prop, descriptor)</code> 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。</p>
<ul>
<li><strong>参数</strong>
<ul>
<li><code>obj</code> : 要定义属性的对象。</li>
<li><code>prop</code> : 需要操作的目标对象的属性名。</li>
<li><code>descriptor</code> : 要定义或修改的属性描述符。
<ul>
<li><code>enumerable</code> : 属性是否可枚举，默认 false 。</li>
<li><code>configurable</code> : 属性是否可以被修改或者删除，默认 false 。</li>
<li><code>writable</code> : 当且仅当该属性为 true 时，属性的值，才能被赋值运算符改变。属性值假如是数组时，将不受 push, splice 等方法的影响。默认为 false。</li>
<li><code>value</code> : 该属性对应的值。</li>
<li><code>get</code> : 属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数，默认为 undefined。</li>
<li><code>set</code> : 属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数，默认为 undefined。</li>
</ul>
</li>
</ul>
</li>
<li><strong>返回值</strong> ：被传递给函数的对象。</li>
<li><strong>API 存在的缺陷</strong>
<ul>
<li>深度监听，需要递归到底，一次性计算量大</li>
<li>对于对象，无法检测到属性的添加或移除。</li>
<li>对于数组，无法检测到利用索引直接设置一个数组项和修改数组的长度。</li>
</ul>
</li>
</ul>`,r:{minutes:59.88,words:17964},y:"a",t:"Vue 响应式"},["/前端框架/Vue/Vue2源码解析/响应式.html","/前端框架/Vue/Vue2源码解析/响应式.md",":md"]],["v-58a23187","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8.html",{d:1672025329e3,e:`<h1> Vue 数据驱动</h1>
<p>数据驱动包括：</p>
<ul>
<li>视图是由数据驱动生成的，对视图的修改，不会直接操作 DOM，而是通过修改数据。</li>
<li>数据更新驱动视图变化</li>
</ul>
<h2> 首次渲染 DOM 概览</h2>
<p></p>
<h2> new Vue() 初始化</h2>
<p>Vue 实际上是一个类，类在 Javascript 中是用 <code>Function</code> 来实现的。</p>
<details class="hint-container details"><summary>Vue(options) ： 实例化 Vue</summary>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// src\\core\\instance\\index.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> initMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./init'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> stateMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./state'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> renderMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./render'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> eventsMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./events'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> lifecycleMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./lifecycle'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> warn <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../util/index'</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> GlobalAPI <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'types/global-api'</span>

<span class="token keyword">function</span> <span class="token function">Vue</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__ <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">Vue</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'Vue is a constructor and should be called with the \`new\` keyword'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_init</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//@ts-expect-error Vue has function type</span>
<span class="token class-name">initMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token comment">//@ts-expect-error Vue has function type</span>
<span class="token class-name">stateMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token comment">//@ts-expect-error Vue has function type</span>
<span class="token class-name">eventsMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token comment">//@ts-expect-error Vue has function type</span>
<span class="token class-name">lifecycleMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token comment">//@ts-expect-error Vue has function type</span>
<span class="token class-name">renderMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Vue <span class="token keyword">as</span> <span class="token builtin">unknown</span> <span class="token keyword">as</span> GlobalAPI
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,r:{minutes:20.39,words:6117},y:"a",t:"Vue 数据驱动"},["/前端框架/Vue/Vue2源码解析/数据驱动.html","/前端框架/Vue/Vue2源码解析/数据驱动.md",":md"]],["v-371374c0","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/%E7%BB%84%E4%BB%B6%E5%8C%96.html",{d:1672025329e3,e:`<h1> Vue 组件化</h1>
<h2> createComponent : 创建组件 VNode</h2>
<p>在 <code>Vue.prototype._render</code> 进行 Virtual DOM 渲染时，执行 <code>vnode = render.call(vm._renderProxy, vm.$createElement)</code>，通过 <code>vm.$createElement</code> 最终调用 <code>createElement</code> （最终调用 <code>_createElement</code>） 创建 Virtual DOM 。</p>`,r:{minutes:41.84,words:12551},y:"a",t:"Vue 组件化"},["/前端框架/Vue/Vue2源码解析/组件化.html","/前端框架/Vue/Vue2源码解析/组件化.md",":md"]],["v-4f490448","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/%E7%BC%96%E8%AF%91.html",{d:1672025329e3,e:`<h1> Vue 编译</h1>
<p>在 Vue 2.x 中，所有 Vue 组件的渲染都需要 <code>render</code> 方法，包括单文件组件（<code>.vue</code>）、<code>el</code> 或者 <code>template</code> 属性，最终都会转换成 <code>render</code> 方法。</p>
<p>在重写 <code>Vue.prototype.$mount</code> 方法中，通过调用 <code>compileToFunctions</code> 方法把模板 <code>template</code> 编译生成 <code>render</code> 以及 <code>staticRenderFns</code>。</p>`,r:{minutes:31.22,words:9366},y:"a",t:"Vue 编译"},["/前端框架/Vue/Vue2源码解析/编译.html","/前端框架/Vue/Vue2源码解析/编译.md",":md"]],["v-20d07a24","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue3/Vue3CompositionAPI.html",{d:1672025329e3,e:`<h1> Vue3 Composition API</h1>
<h2> setup</h2>
<p><code>setup</code> 函数，接受两个参数。</p>
<ul>
<li>
<p><code>props</code> ： 父组件传递的属性。</p>
<p><code>props</code> 是响应式的，<strong>不能使用 ES6 解构</strong>，它会消除 prop 的响应式。</p>
<p>如需要解构 prop，可使用 <code>toRefs</code> 函数。如果传递的参数为 <strong>可选的 prop</strong> ， <code>toRefs</code> 函数不会为该参数创建一个 <code>ref</code> ，可使用 <code>toRef</code> 代替（eg : <code>const title = toRef(props, 'title')</code>）。</p>
</li>
<li>
<p><code>context</code> ： <code>context</code> 是一个普通 JavaScript 对象，包含三个属性</p>
<ul>
<li>
<p><code>attrs</code> ： Attribute</p>
</li>
<li>
<p><code>slots</code> ： 父组件传递过来的插槽</p>
</li>
<li>
<p><code>emit</code> ： 组件内部需要触发的自定义事件</p>
</li>
<li>
<p><code>expose</code> ： 一个将暴露在公共组件实例上的 property 列表。</p>
<p>默认情况下，通过 <code>$refs</code>、<code>$parent</code> 或 <code>$root</code> 访问到的公共实例与模板使用的组件内部实例是一样的。<code>expose</code> 选项将<strong>限制</strong>公共实例可以访问的 property。Vue 自身定义的 property，比如 <code>$el</code> 和 <code>$parent</code>，将始终可以被公共实例访问</p>
</li>
</ul>
<p>注：<code>attrs</code> 和 <code>slots</code> 是有状态的对象，它们总是会随组件本身的更新而更新。这意味着你应该避免对它们进行解构，并始终以 <code>attrs.x</code> 或 <code>slots.x</code> 的方式引用 property。</p>
</li>
</ul>`,r:{minutes:11.99,words:3597},y:"a",t:"Vue3 Composition API"},["/前端框架/Vue/Vue3/Vue3CompositionAPI.html","/前端框架/Vue/Vue3/Vue3CompositionAPI.md",":md"]],["v-57ee0de7","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Webpack%E4%BC%98%E5%8C%96/Webpack%E4%BC%98%E5%8C%96.html",{d:1672025329e3,e:`<h1> Webpack优化</h1>
<h2> 速度优化</h2>
<h3> 减少查找过程</h3>
<h4> 使用 resolve.alias 减少查找过程</h4>
<p><code>resolve.alias</code> 配置项通过别名（alias）来把原导入路径映射成一个新的导入路径。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 使用 alias 把导入 react 的语句换成直接使用单独完整的 react.min.js 文件</span>
    <span class="token comment">// 减少耗时的递归解析操作</span>
    <span class="token comment">// 大多数库发布到 npm 仓库中时，都会包含打包好的完整文件，对于这些库也可以配置 alias</span>
    <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">react</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'./node_modules/react/dist/react.min.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token string-property property">'@lib'</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'./src/lib/'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:10.48,words:3143},y:"a",t:"Webpack优化"},["/前端框架/Webpack/Webpack优化/Webpack优化.html","/前端框架/Webpack/Webpack优化/Webpack优化.md",":md"]],["v-55793d7f","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Webpack%E5%8E%9F%E7%90%86/Webpack%E5%8E%9F%E7%90%86.html",{d:1672025329e3,e:`<h1> Webpack 原理</h1>
<p>Webpack 本质上是一种事件流机制。通过事件流将各种插件串联起来，最终完成 Webpack 的全流程。实现事件流机制的核心是 <code>Tapable</code> 模块。Webpack 负责编译的 <code>Compiler</code> 和创建 Bundle 的 <code>Compilation</code> 都是继承自 <code>Tapable</code> 。</p>
<h2> Tapable</h2>
<p><code>Tapable</code> 和 Node.js 中的 <code>EventEmitter</code> 类似，包括多种类型，通过事件的注册和监听，触发 Webpack 生命周期中的函数方法。</p>`,r:{minutes:11.37,words:3412},y:"a",t:"Webpack 原理"},["/前端框架/Webpack/Webpack原理/Webpack原理.html","/前端框架/Webpack/Webpack原理/Webpack原理.md",":md"]],["v-112de4bc","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Webpack%E5%9F%BA%E7%A1%80/babel.html",{d:1672025329e3,e:`<h1> Babel</h1>
<p>Babel 是一个工具链，主要用于在当前和旧的浏览器或环境中，将 ECMAScript 2015+ 代码转换为 JavaScript 向后兼容版本的代码。主要用于处理一下事情：</p>
<ul>
<li><strong>转换语法</strong>。用来把代码中的 ESNext 的新的语法、TypeScript 和 Flow 的语法转成基于目标环境支持的语法的实现。并且还可以把目标环境不支持的 API 进行 <strong>Polyfill</strong>（垫片，用来为旧浏览器提供它没有原生支持的较新的功能）。</li>
<li><strong>特定用途的代码转换</strong>。通过 Babel 暴露的 API 可以完成代码到 AST 的 解析（Parse），AST 的转换（Transform），以及目标代码的生成（Generate）。可完成一些特定用途的转换，比如：
<ul>
<li>函数插桩（函数中自动插入一些代码，例如埋点代码）</li>
<li>自动国际化</li>
<li>default import 形式 （<code>import A from './A'</code>）转 named import形式（<code>import {A} from './A'</code>）</li>
</ul>
</li>
<li><strong>代码的静态分析</strong>。对代码进行 AST 的 解析（Parse）之后，能够进行转换，是因为通过 AST 的结构能够理解代码。除了进行转换然后生成目标代码之外，同样可以用于分析代码的信息，进行一些检查：
<ul>
<li>linter 工具：分析 AST 的结构，对代码规范进行检查。</li>
<li>api 文档自动生成工具：可以提取源码中的注释，然后生成文档。</li>
<li>type checker ：根据从 AST 中提取的或者推导的类型信息，对 AST 进行类型是否一致的检查，从而减少运行时因类型导致的错误。</li>
<li>压缩混淆工具：分析代码结构，进行删除死代码、变量名混淆、常量折叠等各种编译优化，生成体积更小、性能更优的代码。</li>
<li>js 解释器：除了对 AST 进行各种信息的提取和检查以外，可以直接解释执行 AST。</li>
</ul>
</li>
</ul>`,r:{minutes:7.87,words:2360},y:"a",t:"Babel"},["/前端框架/Webpack/Webpack基础/babel.html","/前端框架/Webpack/Webpack基础/babel.md",":md"]],["v-e97b0c7e","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Webpack%E5%9F%BA%E7%A1%80/CSS%E6%A8%A1%E5%9D%97%E5%8C%96.html",{d:1672025329e3,e:`<h1> CSS模块化</h1>
<h2> OOCSS（面向对象的CSS）</h2>
<p>两大原则：<strong>结构和设计分离，容器和内容分离</strong>。即不要把结构和设计以及内容进行强耦合，而是相互独立，所要达到的目标是更易复用和组合，可以选择使用，选择引用等。</p>
<p>优点：通过复用来减少代码量(DRY原则)</p>
<p>缺点：维护非常困难(复杂)。当你修改某一个具体的元素的样式的时候，大部分情况下，除了修改CSS本身(因为多数的CSS类是通用的)，你还不得不添加更多的标记类(markup)。</p>
<p></p>
<h2> SMACSS（可扩展和模块化结构的 CSS）</h2>`,r:{minutes:3.68,words:1103},y:"a",t:"CSS模块化"},["/前端框架/Webpack/Webpack基础/CSS模块化.html","/前端框架/Webpack/Webpack基础/CSS模块化.md",":md"]],["v-37d71f2e","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Webpack%E5%9F%BA%E7%A1%80/devServer.html",{d:1672025329e3,e:`<h1> Webpack Dev Server 本地开发服务</h1>
<p><code>webpack-dev-server</code> 是一个基于 Express 的本地开发服务器。它使用 <code>webpack-dev-middleware</code> 中间件来为通过 Webpack 打包生成的资源文件提供 Web 服务。它还有一个通过 Socket IO 连接着 <code>webpack-dev-server</code> 服务器的小型运行时程序。<code>webpack-dev-server</code> 发送关于编译状态的消息到客户端，客户端根据消息作出响应。</p>
`,r:{minutes:5.68,words:1705},y:"a",t:"Webpack Dev Server 本地开发服务"},["/前端框架/Webpack/Webpack基础/devServer.html","/前端框架/Webpack/Webpack基础/devServer.md",":md"]],["v-f257debe","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Webpack%E5%9F%BA%E7%A1%80/JS%E6%A8%A1%E5%9D%97%E5%8C%96.html",{d:1672025329e3,e:`<h1> JS模块化</h1>
<p>随着前端项目的逻辑越来越复杂，会导致很多问题，比如：全局变量冲突、依赖关系管理麻烦等。模块化带来的好处如下：</p>
<ul>
<li>解决命名污染，全局污染，变量冲突等问题，减少全局变量污染</li>
<li>内聚私有，变量不能被外面访问到</li>
<li>控制依赖</li>
<li>增强代码的可维护性</li>
<li>增加代码的复用性</li>
<li>分治思想的实践</li>
</ul>
<h2> 原生JS组织</h2>
<ul>
<li>
<p>function 模式：根据功能将代码封装为全局函数。该方案会污染全局命名空间， 容易引起命名冲突和数据不安全，同时，无法看出模块之间的依赖关系。</p>
</li>
<li>
<p>对象模式：通过对象进行封装。该方案减少了全局变量，一定程度上解决了命名冲突的问题，但是还是存在数据安全的问题，从外部可以直接修改模块内部的数据。</p>
</li>
<li>
<p>IIFE（立即调用函数表达式）模式：通过立即调用函数封装。</p>
<ul>
<li>第一部分是包围在 <code>圆括号运算符 ()</code> 里的一个匿名函数。这个匿名函数拥有独立的词法作用域。这不仅避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。</li>
<li>第二部分再一次使用 <code>()</code> 创建了一个立即执行函数表达式，JavaScript 引擎到此将直接执行函数。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> calculator <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span> add <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
calculator<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">window</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//...</span>
  <span class="token comment">// Expose jQuery to the global object</span>
  window<span class="token punctuation">.</span>jQuery <span class="token operator">=</span> window<span class="token punctuation">.</span>$ <span class="token operator">=</span> jQuery<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>window<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>`,r:{minutes:9.35,words:2806},y:"a",t:"JS模块化"},["/前端框架/Webpack/Webpack基础/JS模块化.html","/前端框架/Webpack/Webpack基础/JS模块化.md",":md"]],["v-a9d76734","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Webpack%E5%9F%BA%E7%A1%80/loaders.html",{d:1672025329e3,e:`<h1> Loaders</h1>
<p><strong>loader</strong> 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。</p>
<p>在处理模块时，将符合规则条件的模块，提交给对应的处理器来处理，通常用来配置 loader，其类型是一个数组，数组里每一项都描述了如何去处理部分文件。每一项 rule 大致可以由以下三部分组成：</p>
<ul>
<li>条件匹配：通过 <code>test</code>、<code>include</code>、<code>exclude</code> 等配置来命中可以应用规则的模块文件；</li>
<li>应用规则：对匹配条件通过后的模块，使用 <code>use</code> 配置项来应用 loader，可以应用一个 loader 或者按照<strong>从后往前的顺序</strong>应用一组 loader，还可以分别给对应 loader 传入不同参数；</li>
<li>重置顺序：一组 loader 的执行顺序默认是<strong>从后到前（或者从右到左）<strong>执行，通过 <code>enforce</code> 选项可以让其中一个 loader 的执行顺序放到</strong>最前（pre）<strong>或者是</strong>最后（post）</strong>。</li>
</ul>`,r:{minutes:3.83,words:1150},y:"a",t:"Loaders"},["/前端框架/Webpack/Webpack基础/loaders.html","/前端框架/Webpack/Webpack基础/loaders.md",":md"]],["v-acba98f4","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Webpack%E5%9F%BA%E7%A1%80/plugins.html",{d:1672025329e3,e:`<h1> Plugins</h1>
<p><strong>Plugin（插件）</strong> 目的在于解决 loader 无法实现的其他事。参与打包整个过程、打包优化和压缩、配置编译时的变量、极其灵活。</p>
<ul>
<li>Plugin 是一个独立的模块，模块对外暴露一个 JavaScript 函数</li>
<li>函数的原型 (prototype) 上定义了一个注入 <code>compiler</code> 对象的 <code>apply</code> 方法。 <code>apply</code> 函数中，需要有通过 <code>compiler</code> 对象挂载的 webpack 事件钩子，钩子的回调中，能拿到当前编译的 <code>compilation</code> 对象，如果是异步编译插件的话可以拿到回调 <code>callback</code></li>
<li>完成自定义子编译流程并处理 <code>complition</code> 对象的内部数据</li>
<li>如果异步编译插件的话，数据处理完成后执行 <code>callback</code> 回调</li>
</ul>`,r:{minutes:7.24,words:2172},y:"a",t:"Plugins"},["/前端框架/Webpack/Webpack基础/plugins.html","/前端框架/Webpack/Webpack基础/plugins.md",":md"]],["v-d15facf0","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Webpack%E5%9F%BA%E7%A1%80/%E5%A4%9A%E9%A1%B5%E9%9D%A2%E9%85%8D%E7%BD%AE.html",{d:1672025329e3,e:`<h1> 多页面配置</h1>
<div class="language-txt line-numbers-mode" data-ext="txt"><pre class="language-txt"><code>目录结构

├── config
│   ├── webpack.config.js
│   ├── webpack-help.js
├── src
│   ├── api
│   ├── libs
│   ├── pages
│   ├── pages
│   │   ├── home
│   │   │   ├── home.html
│   │   │   ├── home.js
│   │   │   ├── home.css
│   ├── utils
│── package.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:2.26,words:678},y:"a",t:"多页面配置"},["/前端框架/Webpack/Webpack基础/多页面配置.html","/前端框架/Webpack/Webpack基础/多页面配置.md",":md"]],["v-47ce4e58","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Webpack%E5%9F%BA%E7%A1%80/%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5.html",{d:1672025329e3,e:`<h1> Webpack 核心概念</h1>
<p>webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。</p>
<ul>
<li><code>module</code> ：不同文件类型的模块。Webpack 就是用来对模块进行打包的工具，这些模块各种各样，比如：js 模块、css 模块、sass 模块、vue 模块等等不同文件类型的模块。这些文件都会被 loader 转换为有效的模块，然后被应用所使用并且加入到依赖关系图中。</li>
<li><code>chunk</code> ：数据块。
<ul>
<li>非初始化的数据块。例如在打包时，对于一些动态导入的异步代码，Webpack 分割出共用的代码，可以是写的代码模块，也可以是第三方库，这些被分割的代码文件就可以理解为 <code>chunk</code>。</li>
<li>初始化的的数据块。入口文件处 (entry point) 的各种文件或者说模块依赖，就是 <code>chunk</code> ，它们最终会被捆在一起打包成一个输出文件，输出文件可以理解为 <code>bundle</code>，当然它其实也是 <code>chunk</code>。</li>
</ul>
</li>
<li><code>bundle</code> ：包含一个或多个 <code>chunk</code>，是源码经过 webpack 处理后的最终版本</li>
</ul>`,r:{minutes:9.07,words:2720},y:"a",t:"Webpack 核心概念"},["/前端框架/Webpack/Webpack基础/核心概念.html","/前端框架/Webpack/Webpack基础/核心概念.md",":md"]],["v-09431e95","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Webpack%E5%AE%9E%E6%88%98/%E7%BC%96%E5%86%99loader.html",{d:1672025329e3,e:`<h1> 编写 loader</h1>
<p>loader 是本质上是一个函数，通过接受处理的内容，然后处理后返回结果。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">content</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 对 content 进行处理 ...</span>
  <span class="token comment">// return content // 返回 loader 处理之后的数据。不推荐写法</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> content<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 推荐写法</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,r:{minutes:3.97,words:1190},y:"a",t:"编写 loader"},["/前端框架/Webpack/Webpack实战/编写loader.html","/前端框架/Webpack/Webpack实战/编写loader.md",":md"]],["v-19bb5375","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Webpack%E5%AE%9E%E6%88%98/%E7%BC%96%E5%86%99plugin.html",{d:1672025329e3,e:`<h1> 编写 Plugin</h1>
<p>plugin 通过监听 <code>compiler</code> 的 <code>hook</code> 特定时机，然后处理 <code>stats</code> （主要包含 <code>modules</code>、<code>chunks</code> 和 <code>assets</code> 三个属性值的对象）。</p>
<ul>
<li>Webapck 的插件必须要是一个类</li>
<li>该类必须包含一个 <code>apply</code> 的函数，该函数接收 <code>compiler</code> 对象参数</li>
<li>该类可以使用 Webpack 的 <code>compiler</code> 和 <code>Compilation</code> 对象的钩子</li>
<li>可自定义自己的钩子系统</li>
</ul>`,r:{minutes:4.33,words:1298},y:"a",t:"编写 Plugin"},["/前端框架/Webpack/Webpack实战/编写plugin.html","/前端框架/Webpack/Webpack实战/编写plugin.md",":md"]],["v-0cb8d7e7","/%E6%9E%B6%E6%9E%84/%E5%BE%AE%E5%89%8D%E7%AB%AF/%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F/EMP.html",{d:1672025329e3,e:`<h1> EMP</h1>
`,r:{minutes:0,words:1},y:"a",t:"EMP"},["/架构/微前端/实现方式/EMP.html","/架构/微前端/实现方式/EMP.md",":md"]],["v-e73dad02","/%E6%9E%B6%E6%9E%84/%E5%BE%AE%E5%89%8D%E7%AB%AF/%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F/Garfish.html",{d:1672025329e3,e:`<h1> Garfish</h1>
<p><a href="https://garfish.top/" target="_blank" rel="noopener noreferrer">Garfish</a> 是一套微前端的解决方案，主要用于解决现代 web 应用在前端生态繁荣和 web 应用日益复杂化两大背景下带来的跨团队协作、技术体系多样化、web 应用日益复杂化等问题。</p>
`,r:{minutes:.24,words:73},y:"a",t:"Garfish"},["/架构/微前端/实现方式/Garfish.html","/架构/微前端/实现方式/Garfish.md",":md"]],["v-5aadedb4","/%E6%9E%B6%E6%9E%84/%E5%BE%AE%E5%89%8D%E7%AB%AF/%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F/MicroApp.html",{d:1672025329e3,e:`<h1> MicroApp</h1>
<p><a href="https://zeroing.jd.com/" target="_blank" rel="noopener noreferrer">MicroApp</a> 一款轻量、高效、功能强大的微前端框架。</p>
`,r:{minutes:.07,words:20},y:"a",t:"MicroApp"},["/架构/微前端/实现方式/MicroApp.html","/架构/微前端/实现方式/MicroApp.md",":md"]],["v-23baba10","/%E6%9E%B6%E6%9E%84/%E5%BE%AE%E5%89%8D%E7%AB%AF/%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F/qiankun.html",{d:1672025329e3,e:`<h1> qiankun</h1>
<p><a href="https://qiankun.umijs.org/zh" target="_blank" rel="noopener noreferrer">qiankun</a> 是一个基于 single-spa 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。</p>
`,r:{minutes:.15,words:46},y:"a",t:"qiankun"},["/架构/微前端/实现方式/qiankun.html","/架构/微前端/实现方式/qiankun.md",":md"]],["v-b1ed33b8","/%E6%9E%B6%E6%9E%84/%E5%BE%AE%E5%89%8D%E7%AB%AF/%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F/single-spa.html",{d:1672025329e3,e:`<h1> single-spa</h1>
<p><a href="https://zh-hans.single-spa.js.org/" target="_blank" rel="noopener noreferrer">Single-spa</a> 是一个将多个单页面应用聚合为一个整体应用的 JavaScript 微前端框架</p>
`,r:{minutes:.12,words:35},y:"a",t:"single-spa"},["/架构/微前端/实现方式/single-spa.html","/架构/微前端/实现方式/single-spa.md",":md"]],["v-3880926b","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/",{d:1699632281e3,e:`<h1> JavaScript知识框架</h1>
`,r:{minutes:.02,words:5},y:"a",t:"JavaScript知识框架"},["/前端/JavaScript/前端训练营/知识框架/","/前端/JavaScript/前端训练营/知识框架/README.md","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/README.md"]],["v-4cfafc7b","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/%E7%9B%B8%E5%85%B3%E6%89%A9%E5%B1%95/event.html",{d:1672025329e3,e:`<h1> event 事件</h1>
<h2> 编译阶段</h2>
<p>在编译阶段，对事件进行处理示例如下：</p>
<details class="hint-container details"><summary>示例</summary>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> Child <span class="token operator">=</span> <span class="token punctuation">{</span>
  template<span class="token operator">:</span> <span class="token string">'&lt;button @click="clickHandler($event)"&gt;'</span> <span class="token operator">+</span> <span class="token string">'click me'</span> <span class="token operator">+</span> <span class="token string">'&lt;/button&gt;'</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">clickHandler</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Button clicked!'</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">'select'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> vm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token operator">:</span> <span class="token string">'#app'</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span>
    <span class="token string">'&lt;div&gt;'</span> <span class="token operator">+</span>
    <span class="token string">'&lt;child @select="selectHandler" @click.native.prevent="clickHandler"&gt;&lt;/child&gt;'</span> <span class="token operator">+</span>
    <span class="token string">'&lt;/div&gt;'</span><span class="token punctuation">,</span>
  components<span class="token operator">:</span> <span class="token punctuation">{</span> Child <span class="token punctuation">}</span><span class="token punctuation">,</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">clickHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Child clicked!'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">selectHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Child select!'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// ========================================</span>

<span class="token comment">// 父组件事件生成 data 串</span>
<span class="token punctuation">{</span>
  on<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token string-property property">"select"</span><span class="token operator">:</span> selectHandler<span class="token punctuation">}</span><span class="token punctuation">,</span>
  nativeOn<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token string-property property">"click"</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>$event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      $event<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token function">clickHandler</span><span class="token punctuation">(</span>$event<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 子组件事件生成 data 串</span>
<span class="token punctuation">{</span>
  on<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token string-property property">"click"</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>$event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">clickHandler</span><span class="token punctuation">(</span>$event<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,r:{minutes:11.69,words:3506},y:"a",t:"event 事件"},["/前端框架/Vue/Vue2源码解析/相关扩展/event.html","/前端框架/Vue/Vue2源码解析/相关扩展/event.md",":md"]],["v-64a7aa10","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/%E7%9B%B8%E5%85%B3%E6%89%A9%E5%B1%95/keep-alive.html",{d:1672025329e3,e:`<h1> keep-alive</h1>
<h2> 内置组件</h2>
<details class="hint-container details"><summary>keep-alive 内置组件</summary>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// src\\core\\components\\keep-alive.ts</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">'keep-alive'</span><span class="token punctuation">,</span>
  <span class="token keyword">abstract</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

  props<span class="token operator">:</span> <span class="token punctuation">{</span>
    include<span class="token operator">:</span> patternTypes<span class="token punctuation">,</span>
    exclude<span class="token operator">:</span> patternTypes<span class="token punctuation">,</span>
    max<span class="token operator">:</span> <span class="token punctuation">[</span>String<span class="token punctuation">,</span> Number<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">cacheVNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> cache<span class="token punctuation">,</span> keys<span class="token punctuation">,</span> vnodeToCache<span class="token punctuation">,</span> keyToCache <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>vnodeToCache<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> tag<span class="token punctuation">,</span> componentInstance<span class="token punctuation">,</span> componentOptions <span class="token punctuation">}</span> <span class="token operator">=</span> vnodeToCache
        cache<span class="token punctuation">[</span>keyToCache<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
          name<span class="token operator">:</span> <span class="token function">_getComponentName</span><span class="token punctuation">(</span>componentOptions<span class="token punctuation">)</span><span class="token punctuation">,</span>
          tag<span class="token punctuation">,</span>
          componentInstance<span class="token punctuation">,</span>
        <span class="token punctuation">}</span>
        keys<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>keyToCache<span class="token punctuation">)</span>
        <span class="token comment">// prune oldest entry</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>max <span class="token operator">&amp;&amp;</span> keys<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>max<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">pruneCacheEntry</span><span class="token punctuation">(</span>cache<span class="token punctuation">,</span> keys<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> keys<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_vnode<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>vnodeToCache <span class="token operator">=</span> <span class="token keyword">null</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>cache <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>keys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">destroyed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">pruneCacheEntry</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>cache<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>keys<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cacheVNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$watch</span><span class="token punctuation">(</span><span class="token string">'include'</span><span class="token punctuation">,</span> val <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">pruneCache</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> name <span class="token operator">=&gt;</span> <span class="token function">matches</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$watch</span><span class="token punctuation">(</span><span class="token string">'exclude'</span><span class="token punctuation">,</span> val <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">pruneCache</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> name <span class="token operator">=&gt;</span> <span class="token operator">!</span><span class="token function">matches</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">updated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cacheVNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> slot <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$slots<span class="token punctuation">.</span>default
    <span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token function">getFirstComponentChild</span><span class="token punctuation">(</span>slot<span class="token punctuation">)</span>
    <span class="token keyword">const</span> componentOptions <span class="token operator">=</span> vnode <span class="token operator">&amp;&amp;</span> vnode<span class="token punctuation">.</span>componentOptions
    <span class="token keyword">if</span> <span class="token punctuation">(</span>componentOptions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// check pattern</span>
      <span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token function">_getComponentName</span><span class="token punctuation">(</span>componentOptions<span class="token punctuation">)</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> include<span class="token punctuation">,</span> exclude <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        <span class="token comment">// not included</span>
        <span class="token punctuation">(</span>include <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token operator">!</span>name <span class="token operator">||</span> <span class="token operator">!</span><span class="token function">matches</span><span class="token punctuation">(</span>include<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">||</span>
        <span class="token comment">// excluded</span>
        <span class="token punctuation">(</span>exclude <span class="token operator">&amp;&amp;</span> name <span class="token operator">&amp;&amp;</span> <span class="token function">matches</span><span class="token punctuation">(</span>exclude<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> vnode
      <span class="token punctuation">}</span>

      <span class="token keyword">const</span> <span class="token punctuation">{</span> cache<span class="token punctuation">,</span> keys <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span>
      <span class="token keyword">const</span> key <span class="token operator">=</span>
        vnode<span class="token punctuation">.</span>key <span class="token operator">==</span> <span class="token keyword">null</span>
          <span class="token operator">?</span> <span class="token comment">// same constructor may get registered as different local components</span>
            <span class="token comment">// so cid alone is not enough (#3269)</span>
            componentOptions<span class="token punctuation">.</span>Ctor<span class="token punctuation">.</span>cid <span class="token operator">+</span>
            <span class="token punctuation">(</span>componentOptions<span class="token punctuation">.</span>tag <span class="token operator">?</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">::</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>componentOptions<span class="token punctuation">.</span>tag<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span> <span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">)</span>
          <span class="token operator">:</span> vnode<span class="token punctuation">.</span>key
      <span class="token keyword">if</span> <span class="token punctuation">(</span>cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        vnode<span class="token punctuation">.</span>componentInstance <span class="token operator">=</span> cache<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">.</span>componentInstance
        <span class="token comment">// make current key freshest</span>
        <span class="token function">remove</span><span class="token punctuation">(</span>keys<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
        keys<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// delay setting the cache until update</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>vnodeToCache <span class="token operator">=</span> vnode
        <span class="token keyword">this</span><span class="token punctuation">.</span>keyToCache <span class="token operator">=</span> key
      <span class="token punctuation">}</span>

      <span class="token comment">// @ts-expect-error can vnode.data can be undefined</span>
      vnode<span class="token punctuation">.</span>data<span class="token punctuation">.</span>keepAlive <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> vnode <span class="token operator">||</span> <span class="token punctuation">(</span>slot <span class="token operator">&amp;&amp;</span> slot<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,r:{minutes:11.08,words:3324},y:"a",t:"keep-alive"},["/前端框架/Vue/Vue2源码解析/相关扩展/keep-alive.html","/前端框架/Vue/Vue2源码解析/相关扩展/keep-alive.md",":md"]],["v-2f2b981f","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/%E7%9B%B8%E5%85%B3%E6%89%A9%E5%B1%95/slot.html",{d:1672025329e3,e:`<h1> slot 插槽</h1>
<h2> 普通插槽</h2>
<p>编译发生在调用 <code>vm.$mount</code> 的时候，编译的顺序是先编译父组件再编译子组件。</p>
<p>在 <code>parse</code> 解析 <code>template</code> 模板字符串转换成 AST 树阶段，处理一元标签（例如：<code>&lt;img&gt;</code>、<code>&lt;br/&gt;</code>）和闭合标签时，会调用 <code>closeElement(element)</code> 方法，执行<code>processElement(element, options)</code> 方法，调用 <code>processSlotContent(element)</code> 和 <code>processSlotOutlet(element)</code> 方法处理 <code>slot</code>。</p>`,r:{minutes:9.26,words:2778},y:"a",t:"slot 插槽"},["/前端框架/Vue/Vue2源码解析/相关扩展/slot.html","/前端框架/Vue/Vue2源码解析/相关扩展/slot.md",":md"]],["v-3d3ea028","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/%E7%9B%B8%E5%85%B3%E6%89%A9%E5%B1%95/transition.html",{d:1672025329e3,e:`<h1> transition 与 transition-group</h1>
<h2> transition</h2>
<p>Vue.js 内置 <code>&lt;transition&gt;</code> 组件，可以利用它配合一些 CSS3 样式很方便地实现过渡动画，也可以利用它配合 JavaScript 的钩子函数实现过渡动画，在下列情形中，可以给任何元素和组件添加 <code>entering</code> / <code>leaving</code> 过渡：</p>
<ul>
<li>条件渲染 (使用 <code>v-if</code>)</li>
<li>条件展示 (使用 <code>v-show</code>)</li>
<li>动态组件</li>
<li>组件根节点</li>
</ul>`,r:{minutes:16.48,words:4944},y:"a",t:"transition 与 transition-group"},["/前端框架/Vue/Vue2源码解析/相关扩展/transition.html","/前端框架/Vue/Vue2源码解析/相关扩展/transition.md",":md"]],["v-20ad8c03","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/%E7%9B%B8%E5%85%B3%E6%89%A9%E5%B1%95/v-model.html",{d:1672025329e3,e:`<h1> v-model 双向绑定</h1>
<p><code>v-model</code> 即可以作用在普通表单元素上，又可以作用在组件上，它其实是一个语法糖。</p>
<h2> 表单元素</h2>
<p>在 <code>parse</code> 解析 <code>template</code> 模板字符串转换成 AST 树阶段，处理一元标签（例如：<code>&lt;img&gt;</code>、<code>&lt;br/&gt;</code>）和闭合标签时，会调用 <code>closeElement(element)</code> 方法，执行<code>processElement(element, options)</code> 方法，调用 <code>processAttrs(element)</code> 方法处理标签属性。<code>v-model</code> 会被当做普通的指令解析到 <code>el.directives</code> 中。</p>`,r:{minutes:8.22,words:2466},y:"a",t:"v-model 双向绑定"},["/前端框架/Vue/Vue2源码解析/相关扩展/v-model.html","/前端框架/Vue/Vue2源码解析/相关扩展/v-model.md",":md"]],["v-ea97c948","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E6%96%87%E6%B3%95/%E8%AF%8D%E6%B3%95.html",{d:1699632281e3,e:`<h1> 词法</h1>
`,r:{minutes:.01,words:2},y:"a",t:"词法"},["/前端/JavaScript/前端训练营/知识框架/文法/词法.html","/前端/JavaScript/前端训练营/知识框架/文法/词法.md",":md"]],["v-78d4e833","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E6%96%87%E6%B3%95/%E8%AF%AD%E6%B3%95.html",{d:1699632281e3,e:`<h1> 语法</h1>
`,r:{minutes:.01,words:2},y:"a",t:"语法"},["/前端/JavaScript/前端训练营/知识框架/文法/语法.html","/前端/JavaScript/前端训练营/知识框架/文法/语法.md",":md"]],["v-0da3b39c","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E8%AF%AD%E4%B9%89/",{d:1699632281e3,e:`<h1> 语义</h1>
`,r:{minutes:.01,words:2},y:"a",t:"语义"},["/前端/JavaScript/前端训练营/知识框架/语义/","/前端/JavaScript/前端训练营/知识框架/语义/README.md","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E8%AF%AD%E4%B9%89/README.md"]],["v-58af1b76","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E8%BF%90%E8%A1%8C%E6%97%B6/",{d:1699632281e3,e:`<h1> 运行时</h1>
`,r:{minutes:.01,words:3},y:"a",t:"运行时"},["/前端/JavaScript/前端训练营/知识框架/运行时/","/前端/JavaScript/前端训练营/知识框架/运行时/README.md","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E8%BF%90%E8%A1%8C%E6%97%B6/README.md"]],["v-6435cc7a","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E8%BF%90%E8%A1%8C%E6%97%B6/%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/",{d:1699632281e3,e:`<h1> 执行过程</h1>
`,r:{minutes:.01,words:4},y:"a",t:"执行过程"},["/前端/JavaScript/前端训练营/知识框架/运行时/执行过程/","/前端/JavaScript/前端训练营/知识框架/运行时/执行过程/README.md","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E8%BF%90%E8%A1%8C%E6%97%B6/%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/README.md"]],["v-48f60179","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E8%BF%90%E8%A1%8C%E6%97%B6/%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF.html",{d:1699632281e3,y:"a",t:""},["/前端/JavaScript/前端训练营/知识框架/运行时/执行过程/事件循环.html","/前端/JavaScript/前端训练营/知识框架/运行时/执行过程/事件循环.md",":md"]],["v-089c79e0","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E8%BF%90%E8%A1%8C%E6%97%B6/%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E5%87%BD%E6%95%B0%E7%9A%84%E6%89%A7%E8%A1%8C.html",{d:1699632281e3,y:"a",t:""},["/前端/JavaScript/前端训练营/知识框架/运行时/执行过程/函数的执行.html","/前端/JavaScript/前端训练营/知识框架/运行时/执行过程/函数的执行.md",":md"]],["v-3d17b6aa","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E8%BF%90%E8%A1%8C%E6%97%B6/%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E5%BE%AE%E4%BB%BB%E5%8A%A1%E7%9A%84%E6%89%A7%E8%A1%8C.html",{d:1699632281e3,y:"a",t:""},["/前端/JavaScript/前端训练营/知识框架/运行时/执行过程/微任务的执行.html","/前端/JavaScript/前端训练营/知识框架/运行时/执行过程/微任务的执行.md",":md"]],["v-76290d96","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E8%BF%90%E8%A1%8C%E6%97%B6/%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B/%E8%AF%AD%E5%8F%A5%E7%BA%A7%E7%9A%84%E6%89%A7%E8%A1%8C.html",{d:1699632281e3,y:"a",t:""},["/前端/JavaScript/前端训练营/知识框架/运行时/执行过程/语句级的执行.html","/前端/JavaScript/前端训练营/知识框架/运行时/执行过程/语句级的执行.md",":md"]],["v-2aedea04","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E8%BF%90%E8%A1%8C%E6%97%B6/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/",{d:1699632281e3,e:`<h1> 数据结构</h1>
`,r:{minutes:.01,words:4},y:"a",t:"数据结构"},["/前端/JavaScript/前端训练营/知识框架/运行时/数据结构/","/前端/JavaScript/前端训练营/知识框架/运行时/数据结构/README.md","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E8%BF%90%E8%A1%8C%E6%97%B6/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/README.md"]],["v-7cbcdbc6","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E8%BF%90%E8%A1%8C%E6%97%B6/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/%E5%AE%9E%E4%BE%8B.html",{d:1699632281e3,e:`<h1> 实例</h1>
`,r:{minutes:.01,words:2},y:"a",t:"实例"},["/前端/JavaScript/前端训练营/知识框架/运行时/数据结构/实例.html","/前端/JavaScript/前端训练营/知识框架/运行时/数据结构/实例.md",":md"]],["v-c2792460","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E8%BF%90%E8%A1%8C%E6%97%B6/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/%E7%B1%BB%E5%9E%8B.html",{d:1699632281e3,e:`<h1> 类型</h1>
<p>JavaScript语言的每一个值都属于某一种数据类型。JavaScript语言规定了7种语言类型。语言类型广泛用于变量、函数参数、表达式、函数返回值等场合。</p>
<h2> Undefined</h2>
<h3> Q&amp;A</h3>
<h4> Q：为什么有的编程规范要求用 void 0 代替 undefined</h4>
<p>Undefined 类型表示未定义，它的类型只有一个值，就是 undefined。</p>
<p>任何变量在赋值前是 Undefined 类型，值为 undefined。一般用全局变量 undefined 来表达这个值，或者 void 运算来把任一一个表达式变成 undefined 值。</p>`,r:{minutes:6.19,words:1856},y:"a",t:"类型"},["/前端/JavaScript/前端训练营/知识框架/运行时/数据结构/类型.html","/前端/JavaScript/前端训练营/知识框架/运行时/数据结构/类型.md",":md"]],["v-3706649a","/404.html",{y:"p",t:""},[]],["v-330f6aaf","/%E7%A7%BB%E5%8A%A8%E7%AB%AF/",{y:"p",t:"移动端"},["/移动端/"]],["v-73197d7b","/%E5%89%8D%E7%AB%AF/",{y:"p",t:"前端"},["/前端/"]],["v-43bb8f9e","/%E5%85%B6%E4%BB%96/",{y:"p",t:"其他"},["/其他/"]],["v-a25fad8a","/%E6%95%B0%E6%8D%AE%E5%BA%93/MongoDB/",{y:"p",t:"Mongo D B"},["/数据库/MongoDB/"]],["v-b19f66be","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/",{y:"p",t:"前端框架"},["/前端框架/"]],["v-6715190e","/%E6%9E%B6%E6%9E%84/",{y:"p",t:"架构"},["/架构/"]],["v-0a860211","/%E6%9C%8D%E5%8A%A1%E7%AB%AF/",{y:"p",t:"服务端"},["/服务端/"]],["v-3b15e67b","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%9F%BA%E7%A1%80/",{y:"p",t:"C S S基础"},["/前端/CSS/CSS基础/"]],["v-6ba842a2","/%E5%89%8D%E7%AB%AF/CSS/CSS%E5%B8%83%E5%B1%80/",{y:"p",t:"C S S布局"},["/前端/CSS/CSS布局/"]],["v-3a02bfce","/%E5%89%8D%E7%AB%AF/CSS/CSS%E7%9B%B8%E5%85%B3/",{y:"p",t:"C S S相关"},["/前端/CSS/CSS相关/"]],["v-292062d6","/%E5%89%8D%E7%AB%AF/JavaScript/BOM/",{y:"p",t:"B O M"},["/前端/JavaScript/BOM/"]],["v-455de410","/%E5%89%8D%E7%AB%AF/JavaScript/Canvas/",{y:"p",t:"Canvas"},["/前端/JavaScript/Canvas/"]],["v-29214b94","/%E5%89%8D%E7%AB%AF/JavaScript/DOM/",{y:"p",t:"D O M"},["/前端/JavaScript/DOM/"]],["v-292836b2","/%E5%89%8D%E7%AB%AF/JavaScript/SVG/",{y:"p",t:"S V G"},["/前端/JavaScript/SVG/"]],["v-12acd912","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/",{y:"p",t:"前端训练营"},["/前端/JavaScript/前端训练营/"]],["v-33bce6dd","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/",{y:"p",t:"基础知识"},["/前端/JavaScript/基础知识/"]],["v-6e1d46a1","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%AE%9E%E7%94%A8%E6%8A%80%E5%B7%A7/",{y:"p",t:"实用技巧"},["/前端/JavaScript/实用技巧/"]],["v-3534cc28","/%E5%89%8D%E7%AB%AF/JavaScript/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/",{y:"p",t:"设计模式"},["/前端/JavaScript/设计模式/"]],["v-da29e3a8","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E4%BC%98%E5%8C%96/",{y:"p",t:"React优化"},["/前端框架/React/React优化/"]],["v-19ab8f78","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%8E%9F%E7%90%86/",{y:"p",t:"React原理"},["/前端框架/React/React原理/"]],["v-803e1cae","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E5%9F%BA%E7%A1%80/",{y:"p",t:"React基础"},["/前端框架/React/React基础/"]],["v-a8eb67da","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/React/React%E7%94%9F%E6%80%81/",{y:"p",t:"React生态"},["/前端框架/React/React生态/"]],["v-5b77e0b9","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2/",{y:"p",t:"Vue2"},["/前端框架/Vue/Vue2/"]],["v-0d5b8139","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/",{y:"p",t:"Vue2源码解析"},["/前端框架/Vue/Vue2源码解析/"]],["v-5b77e0d8","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue3/",{y:"p",t:"Vue3"},["/前端框架/Vue/Vue3/"]],["v-3054e360","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Webpack%E4%BC%98%E5%8C%96/",{y:"p",t:"Webpack优化"},["/前端框架/Webpack/Webpack优化/"]],["v-6e960f9c","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Webpack%E5%8E%9F%E7%90%86/",{y:"p",t:"Webpack原理"},["/前端框架/Webpack/Webpack原理/"]],["v-14cb71cd","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Webpack%E5%9F%BA%E7%A1%80/",{y:"p",t:"Webpack基础"},["/前端框架/Webpack/Webpack基础/"]],["v-cd7a58a6","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Webpack/Webpack%E5%AE%9E%E6%88%98/",{y:"p",t:"Webpack实战"},["/前端框架/Webpack/Webpack实战/"]],["v-1cf410b6","/%E6%9E%B6%E6%9E%84/%E5%BE%AE%E5%89%8D%E7%AB%AF/%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F/",{y:"p",t:"实现方式"},["/架构/微前端/实现方式/"]],["v-4c98a8fc","/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/Vue/Vue2%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90/%E7%9B%B8%E5%85%B3%E6%89%A9%E5%B1%95/",{y:"p",t:"相关扩展"},["/前端框架/Vue/Vue2源码解析/相关扩展/"]],["v-7a29f77b","/%E5%89%8D%E7%AB%AF/JavaScript/%E5%89%8D%E7%AB%AF%E8%AE%AD%E7%BB%83%E8%90%A5/%E7%9F%A5%E8%AF%86%E6%A1%86%E6%9E%B6/%E6%96%87%E6%B3%95/",{y:"p",t:"文法"},["/前端/JavaScript/前端训练营/知识框架/文法/"]],["v-5bc93818","/category/",{y:"p",t:"分类",I:0},[]],["v-744d024e","/tag/",{y:"p",t:"标签",I:0},[]],["v-e52c881c","/article/",{y:"p",t:"文章",I:0},[]],["v-154dc4c4","/star/",{y:"p",t:"收藏",I:0},[]],["v-01560935","/timeline/",{y:"p",t:"时间轴",I:0},[]],["v-6e518360","/category/%E5%8A%A8%E6%95%88/",{y:"p",t:"动效 分类",I:0},["/category/动效/"]],["v-000bed88","/tag/%E5%8A%A8%E7%94%BB/",{y:"p",t:"标签: 动画",I:0},["/tag/动画/"]],["v-9f8855e8","/category/css%E5%9F%BA%E7%A1%80/",{y:"p",t:"CSS基础 分类",I:0},["/category/css基础/"]],["v-b3142c4c","/tag/css/",{y:"p",t:"标签: CSS",I:0},[]],["v-3f51cd40","/category/css%E5%B8%83%E5%B1%80/",{y:"p",t:"CSS布局 分类",I:0},["/category/css布局/"]],["v-286e3dc8","/tag/flex/",{y:"p",t:"标签: Flex",I:0},[]],["v-c04f9a82","/category/canvas/",{y:"p",t:"Canvas 分类",I:0},[]],["v-287f1c1b","/tag/grid/",{y:"p",t:"标签: Grid",I:0},[]],["v-65f57a63","/category/svg/",{y:"p",t:"SVG 分类",I:0},[]],["v-14dc9fc9","/tag/canvas/",{y:"p",t:"标签: Canvas",I:0},[]],["v-e2bac56c","/category/javascript/",{y:"p",t:"JavaScript 分类",I:0},[]],["v-b3058cce","/tag/svg/",{y:"p",t:"标签: SVG",I:0},[]],["v-2925f144","/tag/smil/",{y:"p",t:"标签: SMIL",I:0},[]],["v-59e7d974","/tag/%E7%BD%91%E9%A1%B5%E6%88%AA%E5%B1%8F/",{y:"p",t:"标签: 网页截屏",I:0},["/tag/网页截屏/"]]];var ol=j({name:"Vuepress",setup(){const n=yk();return()=>c(n.value)}}),Db=()=>Bb.reduce((n,[s,a,e,t])=>(n.push({name:s,path:a,component:ol,meta:e},{path:a.endsWith("/")?a+"index.html":a.substring(0,a.length-5),redirect:a},...t.map(o=>({path:o===":md"?a.substring(0,a.length-5)+".md":o,redirect:a}))),n),[{name:"404",path:"/:catchAll(.*)",component:ol}]),Tb=Wk,Cb=()=>{const n=Bm({history:Tb(Qo("/blogs/")),routes:Db(),scrollBehavior:(s,a,e)=>e||(s.hash?{el:s.hash}:{top:0})});return n.beforeResolve(async(s,a)=>{var e;(s.path!==a.path||a===Os)&&([s.meta._data]=await Promise.all([Ls.resolvePageData(s.name),(e=mi[s.name])==null?void 0:e.__asyncLoader()]))}),n},xb=n=>{n.component("ClientOnly",At),n.component("Content",wi)},Lb=(n,s,a)=>{const e=Hc(()=>s.currentRoute.value.path),t=Hc(()=>Ls.resolveRouteLocale(Sa.value.locales,e.value)),o=lp(e,()=>s.currentRoute.value.meta._data),p=w(()=>Ls.resolveLayouts(a)),l=w(()=>Ls.resolveSiteLocaleData(Sa.value,t.value)),r=w(()=>Ls.resolvePageFrontmatter(o.value)),i=w(()=>Ls.resolvePageHeadTitle(o.value,l.value)),d=w(()=>Ls.resolvePageHead(i.value,r.value,l.value)),v=w(()=>Ls.resolvePageLang(o.value,l.value)),k=w(()=>Ls.resolvePageLayout(o.value,p.value));return n.provide(hk,p),n.provide(fi,o),n.provide(hi,r),n.provide(Ek,i),n.provide(bi,d),n.provide(gi,v),n.provide(yi,k),n.provide(np,t),n.provide(Ai,l),Object.defineProperties(n.config.globalProperties,{$frontmatter:{get:()=>r.value},$head:{get:()=>d.value},$headTitle:{get:()=>i.value},$lang:{get:()=>v.value},$page:{get:()=>o.value},$routeLocale:{get:()=>t.value},$site:{get:()=>Sa.value},$siteLocale:{get:()=>l.value},$withBase:{get:()=>Dn}}),{layouts:p,pageData:o,pageFrontmatter:r,pageHead:d,pageHeadTitle:i,pageLang:v,pageLayout:k,routeLocale:t,siteData:Sa,siteLocaleData:l}},Ob=()=>{const n=gk(),s=Ei(),a=U([]),e=()=>{n.value.forEach(o=>{const p=Ib(o);p&&a.value.push(p)})},t=()=>{document.documentElement.lang=s.value,a.value.forEach(o=>{o.parentNode===document.head&&document.head.removeChild(o)}),a.value.splice(0,a.value.length),n.value.forEach(o=>{const p=Pb(o);p!==null&&(document.head.appendChild(p),a.value.push(p))})};is(Ak,t),bn(()=>{e(),t(),cn(()=>n.value,t)})},Ib=([n,s,a=""])=>{const e=Object.entries(s).map(([l,r])=>rn(r)?`[${l}=${JSON.stringify(r)}]`:r===!0?`[${l}]`:"").join(""),t=`head > ${n}${e}`;return Array.from(document.querySelectorAll(t)).find(l=>l.innerText===a)||null},Pb=([n,s,a])=>{if(!rn(n))return null;const e=document.createElement(n);return _t(s)&&Object.entries(s).forEach(([t,o])=>{rn(o)?e.setAttribute(t,o):o===!0&&e.setAttribute(t,"")}),rn(a)&&e.appendChild(document.createTextNode(a)),e},Vb=pk,Fb=async()=>{var a;const n=Vb({name:"VuepressApp",setup(){var e;Ob();for(const t of Ke)(e=t.setup)==null||e.call(t);return()=>[c(Pi),...Ke.flatMap(({rootComponents:t=[]})=>t.map(o=>c(o)))]}}),s=Cb();xb(n),Lb(n,s,Ke);for(const e of Ke)await((a=e.enhance)==null?void 0:a.call(e,{app:n,router:s,siteData:Sa}));return n.use(s),{app:n,router:s}};Fb().then(({app:n,router:s})=>{s.isReady().then(()=>{n.mount("#app")})});export{Mb as $,ob as A,ab as B,eb as C,Ln as D,bn as E,zn as F,fa as G,rn as H,n2 as I,Qs as J,_t as K,Tp as L,f1 as M,ye as N,vb as O,Dv as P,Pl as Q,ub as R,dn as S,Hb as T,qb as U,ni as V,is as W,Jb as X,Xb as Y,Io as Z,u as _,ai as a,Ys as a0,ia as a1,Kb as a2,Yb as a3,Wb as a4,jb as a5,Nb as a6,ei as b,zb as c,Fb as createVueApp,xn as d,Gb as e,Ub as f,$b as g,j as h,qn as i,Bs as j,Cp as k,U as l,w as m,Po as n,Zl as o,Cn as p,cn as q,as as r,c as s,Ua as t,Qb as u,tb as v,Td as w,pb as x,$n as y,Tu as z};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/home.html-aGGRTL8t.js","assets/plugin-vue_export-helper-x3n3nnut.js","assets/intro.html-4HLR2Egp.js","assets/index.html-9pHNAL84.js","assets/书签.html-w7lgVqnm.js","assets/BEM.html-t5odcSEF.js","assets/index.html-FqB4Ax9m.js","assets/index.html-uyUBArmJ.js","assets/混合开发.html-V_tHvAHM.js","assets/index.html-A9RoTouE.js","assets/index.html-2SijOZ1C.js","assets/1px边框问题.html-jxsvdXC3.js","assets/index.html-na2hF1Cn.js","assets/图片模糊问题.html-Pb6WtMc-.js","assets/移动端基本概念.html-wUZZ6ZnD.js","assets/移动端常见问题.html-ZkxAqkR1.js","assets/移动端适配.html-hdPQn5x_.js","assets/index.html-3PKLZLm5.js","assets/index.html-McSA9tRD.js","assets/基础知识.html-yUCSU_5c.js","assets/demo.html-VEekjPze.js","assets/index.html-Gmapeq0k.js","assets/tsconfig配置.html-H3pcHZBK.js","assets/TypeScriptTips.html-MjkCC9Np.js","assets/TypeScript其他类型.html-R7ofsWbR.js","assets/TypeScript基础类型.html-jhAYAyV_.js","assets/TypeScript声明文件.html-OS4kq0an.js","assets/TypeScript实现Promise.html-keg3Ez5j.js","assets/TypeScript实现Vuex.html-ZzNgXeAM.js","assets/TypeScript控制反转和依赖注入.html-37pf1Ml1.js","assets/TypeScript装饰器.html-cIr8ZlUa.js","assets/H5直播点赞动画.html-qlgueXzb.js","assets/index.html-squZo6Nq.js","assets/git_head.html-mXYmNUHx.js","assets/git命令.html-8VPnlWul.js","assets/git基础.html-H7qfKZ7m.js","assets/git对象.html-lxvVEwmp.js","assets/git忽略提交.html-yd9JI0bC.js","assets/git技巧.html-Zhy6kPm4.js","assets/git相关问题.html-FxNUTIRH.js","assets/index.html-jG89vNY9.js","assets/index.html-eg0KCO0o.js","assets/加密.html-sT1RpCaA.js","assets/index.html-AJD4yDj8.js","assets/VSCode插件.html-zflu_dc6.js","assets/whistle.html-ytGyaKtK.js","assets/基础知识.html-g0HYbXMw.js","assets/index.html-bXU5l8Ox.js","assets/SQL基础.html-N9k0AqdK.js","assets/index.html-WUyCSS-e.js","assets/index.html-PKwy8ro5.js","assets/index.html-gsJuoJPQ.js","assets/index.html-hPHxiL5m.js","assets/Q_A.html-72uySmgY.js","assets/index.html-rU7UoFDf.js","assets/index.html-jQTXGjJF.js","assets/编程规范.html-pJV520Lg.js","assets/index.html-dJ0IETgU.js","assets/基础模块实现.html-fFqBS8_E.js","assets/index.html-GXwKO-QV.js","assets/index.html-cKKY_DNn.js","assets/基础知识.html-thKgKbzA.js","assets/index.html-yE-djTOQ.js","assets/index.html-y6TFwhum.js","assets/index.html-i9e2285q.js","assets/BFC.html-BbYU_sO8.js","assets/float.html-etP18LH5.js","assets/line-height.html-tQWFUbhi.js","assets/vertical-align.html-znURR9II.js","assets/x-height.html-EKoCOJqU.js","assets/内联元素.html-bmnmIbzB.js","assets/Flex布局.html-DoS-es_n.js","assets/Grid布局.html-udUhMAvK.js","assets/StickyFooter.html-sxVmrqxW.js","assets/全屏布局.html-c_l80G3T.js","assets/多列布局.html-gwbyMIPi.js","assets/栅格布局.html-NJ-_2C_e.js","assets/水平垂直居中.html-kn2eBcnW.js","assets/自适应布局.html-F1dlX1_j.js","assets/页面等比适配.html-lzL3lyVU.js","assets/CSS实现长宽比.html-JlZsYVRv.js","assets/CSS常用封装.html-OZzi1hfg.js","assets/file.html-i4jDzpJe.js","assets/navigator.html-N3HwFPbZ.js","assets/storage.html--uJD3etm.js","assets/URL.html-eFqFXvkK.js","assets/window.html-q4tYWeIL.js","assets/canvas优化.html-fDMa7Kfc.js","assets/canvas使用图像.html-gN0PgLWW.js","assets/canvas像素操作.html-0UarBmfp.js","assets/canvas变形.html-FjYWR2QI.js","assets/canvas合成与裁剪.html-kRcsKBVk.js","assets/canvas基本动画.html-FpPRwNUB.js","assets/canvas基础.html--4yM1gTI.js","assets/canvas添加样式.html-lUr6426H.js","assets/canvas绘制形状.html-iiZxXQ0L.js","assets/canvas绘制文本.html-sIZ52zvZ.js","assets/css.html-wZi5ExZB.js","assets/document.html-neAx8Vxd.js","assets/element.html-rHVsyTO2.js","assets/event.html-N6cYoBXm.js","assets/MutationObserver.html-Hs2NkKXr.js","assets/node.html-OI9BRYxe.js","assets/other.html-Gh-5tPLN.js","assets/WebComponents.html-CCb70Uch.js","assets/svgSMIL动画.html-4MvMSqrS.js","assets/svg动画.html-QYSpPNLm.js","assets/svg基础.html-W-H9CS0m.js","assets/基于anime.js的svg动画.html-1EQzVyPH.js","assets/01.编程语言通识.html-PaSXh9Ph.js","assets/02.JavaScript词法和类型.html-MqI3iqIw.js","assets/03.表达式和类型转换.html-EODN0yBp.js","assets/04.语句和对象.html-BwOB8Z-g.js","assets/API.html-LIPituPb.js","assets/ArrayBuffer.html-MxGikmCO.js","assets/async.html-gHD_qWBe.js","assets/Class.html-O3uyf3vu.js","assets/EventLoop.html-lGaawRc3.js","assets/Generator.html-bROeeHsV.js","assets/JSON.html-fAm8onXK.js","assets/Math和Date.html-lZjGpXY8.js","assets/Promise.html-xEi80qZ0.js","assets/Reflect.html-o6ej-9eG.js","assets/RegExp.html-tDdojXfG.js","assets/Set和Map.html-pDFljyI7.js","assets/作用域与闭包.html-v8hiyyF-.js","assets/函数.html-SgY6Sde7.js","assets/原型与继承.html-Zv1GL0kU.js","assets/基础类型.html-Tjhg5Tlj.js","assets/对象.html-xKCbuL9G.js","assets/异步.html-6zuveylv.js","assets/数组.html-aNML_uAH.js","assets/类型概述.html-EBkoZdYR.js","assets/网络请求.html-EJYhbdBq.js","assets/工具函数.html-bFOfjZHO.js","assets/手写代码.html-OHGIdXdw.js","assets/网页截屏.html-eKCSukf3.js","assets/index.html-NaySIw3T.js","assets/SOLID.html-PlKq2muD.js","assets/创建型设计模式.html-KvxIR6aS.js","assets/结构型设计模式.html-4wd5dA5Y.js","assets/行为型设计模式.html-YZSpJEeI.js","assets/其他优化.html-5Mdjb8Ac.js","assets/处理海量数据.html-4yKkXLM5.js","assets/渲染控制.html-h_ucuEuf.js","assets/渲染调优.html-wYYPg1_g.js","assets/Context.html-v1ztEhxD.js","assets/Fiber.html-2WvKbrvV.js","assets/Hooks.html-cLkRruAa.js","assets/React位运算.html-cBp874qX.js","assets/Reconciler.html-emp6ZZmR.js","assets/Scheduler.html-lyz1KfDA.js","assets/事件系统.html-K-R_9hsG.js","assets/Context.html-O3CP3-Mz.js","assets/JSX.html-fEQBsHH4.js","assets/LifeCycle.html-mbphEWrr.js","assets/Props.html-znQWZRbm.js","assets/React组件.html-wd1b_ICx.js","assets/Ref.html-kOa-HnA5.js","assets/State.html-k2Sdg8o_.js","assets/Transition.html-9k6xlzG6.js","assets/useSyncExternalStore.html-SXRD31Eg.js","assets/基础知识.html-CSQy9jOo.js","assets/模块化CSS.html-Iq8Mr3h5.js","assets/自定义Hooks.html-TXUV5Am6.js","assets/高阶组件.html-nDuuQayL.js","assets/react-redux.html-WMNl03Y_.js","assets/react-router.html-IrkjQ7sM.js","assets/Vue2基础.html-UHARdTQq.js","assets/Vue2实现原理.html-TPLyyDQV.js","assets/vue_updateChildren-lKdmWP50.js","assets/Vue2实用技巧.html--gB7Y5pd.js","assets/Vue2相关组件实现.html-ZMNgE_UU.js","assets/Vue2组件通信方式.html-W_YR8Ygw.js","assets/vuex-cOCoKSRV.js","assets/VueRouter.html-Q67nt_1i.js","assets/Vuex.html-ZeKiFGVA.js","assets/vue-router.html-Qp1tJ2s6.js","assets/vue-vuex.html-DBKjcgz4.js","assets/响应式.html-TYYxcTnQ.js","assets/数据驱动.html-wagUdQ48.js","assets/组件化.html-0H5WNnmx.js","assets/编译.html-e6HeSCPs.js","assets/Vue3CompositionAPI.html-lZMYsuGe.js","assets/Webpack优化.html-idlfl_wk.js","assets/Webpack原理.html-iHj0XLc9.js","assets/babel.html-U9v0LUWT.js","assets/CSS模块化.html-60nKKm-H.js","assets/devServer.html-zGjXH02-.js","assets/JS模块化.html-0K8zq8qd.js","assets/loaders.html-h9ardUyL.js","assets/plugins.html-auIQuzvp.js","assets/多页面配置.html-IoCm1Rc4.js","assets/核心概念.html-XmVjuKhX.js","assets/编写loader.html-nw6wESIL.js","assets/编写plugin.html-6tV-1p7Y.js","assets/EMP.html-NaBlWKl7.js","assets/Garfish.html-iStCBquV.js","assets/MicroApp.html-8999nPTQ.js","assets/qiankun.html-HY55m4c6.js","assets/single-spa.html-owxMWixc.js","assets/index.html-SUjJP7ds.js","assets/event.html-IBX9pl7w.js","assets/keep-alive.html-B263wipu.js","assets/slot.html-62Gf0uw4.js","assets/transition.html-tkDstEk0.js","assets/v-model.html-a-6DHuZy.js","assets/词法.html-QtvC9qD2.js","assets/语法.html-bKDZ5Yg8.js","assets/index.html-tCQtqPWI.js","assets/index.html-X4LYsbP0.js","assets/index.html-mmg9VnTt.js","assets/事件循环.html-HHTLVNQp.js","assets/函数的执行.html-w-umwwy6.js","assets/微任务的执行.html-L5otITiw.js","assets/语句级的执行.html-4UWwrhwY.js","assets/index.html-mt2tpO9S.js","assets/实例.html-M80VccHl.js","assets/类型.html-RqkFdWM-.js","assets/404.html-0UfMJuaP.js","assets/index.html-zJlfILmE.js","assets/index.html-2HYyxO7Y.js","assets/index.html-qHx3CLxu.js","assets/index.html-DI4dRAXm.js","assets/index.html-2wLxzwuZ.js","assets/index.html-AmA4gaZq.js","assets/index.html-dlHiWR_0.js","assets/index.html-DXzn62pM.js","assets/index.html-oktHL4zd.js","assets/index.html-SUUykMqg.js","assets/index.html-D3ptF2cE.js","assets/index.html-vx5LCpLh.js","assets/index.html-rmf8VYyM.js","assets/index.html-Tj1bd8z6.js","assets/index.html-6OkSMhAM.js","assets/index.html-jDjckGD-.js","assets/index.html-ROILpGts.js","assets/index.html-g0gR8fle.js","assets/index.html-KrkDeqnn.js","assets/index.html-q5StFqLh.js","assets/index.html-X0k8hez2.js","assets/index.html-V-uvXNJ4.js","assets/index.html-QfPj-P_l.js","assets/index.html-0OOgfHXu.js","assets/index.html-mZDhc4nV.js","assets/index.html-UH_OuT1R.js","assets/index.html-ZcGvSr6F.js","assets/index.html-2Pf1Su1k.js","assets/index.html-I9b_zvO1.js","assets/index.html-PYqVXguy.js","assets/index.html-CbU1lGZt.js","assets/index.html-J-9WEBq_.js","assets/index.html-W1nR1L6G.js","assets/index.html-a28iAabz.js","assets/index.html-f2-AEql3.js","assets/index.html-pIGJreaN.js","assets/index.html-Exg62mul.js","assets/index.html-IWoPJJGh.js","assets/index.html-X2GVLjx4.js","assets/index.html-SFgeJJZq.js","assets/index.html-StyFpSCk.js","assets/index.html-fl8Oozs2.js","assets/index.html-U7uzttJ9.js","assets/index.html-x-VTPZHU.js","assets/index.html-i9u3xBVw.js","assets/index.html--tGVH2AZ.js","assets/index.html-mWDvkr5T.js","assets/index.html-T_u4bjUK.js","assets/index.html-mZivvA69.js","assets/index.html-cqhkXMIZ.js","assets/index.html-1aoW5Ff9.js","assets/vue-repl-ywo2wjn1.js","assets/utils-5585d0be-XOQqDqQW.js","assets/codemirror-editor-ecbUQl9o.js","assets/canvas-render-AJBK7gHF.js","assets/css3-render-aNmIe1Ps.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}