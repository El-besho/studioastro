import{c as i,j as e}from"./utils.uq0GLgWE.js";import{C as r,a as l,b as n,c as d}from"./card.CtfqngXb.js";import{S as p,C as m}from"./star.DUps2ClQ.js";import{S as x,C as h}from"./shield.Kwy-JzG_.js";import{P as u}from"./phone.BkCETWC-.js";import"./index.CVf8TyFT.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],y=i("Award",g);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]],j=i("Heart",f);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],_=i("MapPin",N);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]],C=i("Users",k);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],v=i("Zap",b);function P({service:t,city:c}){const s=[{icon:p,title:"جودة عالية",description:"أعلى معايير الجودة والاحترافية",color:"text-yellow-600"},{icon:m,title:"سرعة في التنفيذ",description:`تنفيذ في ${t.service_duration||2} ساعات`,color:"text-blue-600"},{icon:x,title:"ضمان شامل",description:"ضمان على جميع الخدمات المقدمة",color:"text-green-600"},{icon:C,title:"فريق محترف",description:"فنيون معتمدون ومتخصصون",color:"text-purple-600"},{icon:y,title:"معايير عالية",description:"نلتزم بأعلى معايير الصناعة",color:"text-orange-600"},{icon:u,title:"دعم 24/7",description:"خدمة عملاء متاحة على مدار الساعة",color:"text-red-600"}];return t.emergency_available&&s.push({icon:v,title:"خدمة طوارئ",description:"متاحة 24/7 للطوارئ",color:"text-red-600"}),t.islamic_compliance&&s.push({icon:j,title:"متوافق مع الشريعة",description:"نلتزم بالقيم الإسلامية",color:"text-green-600"}),c&&s.push({icon:_,title:`محليون في ${c.ar_name}`,description:`فريق محلي متخصص في ${c.ar_name}`,color:"text-indigo-600"}),e.jsxs(r,{children:[e.jsx(l,{children:e.jsx(n,{className:"font-headline text-2xl",children:"لماذا تختار خدماتنا؟"})}),e.jsxs(d,{children:[e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:s.map((a,o)=>e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:`flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 ${a.color}`,children:e.jsx(a.icon,{className:"h-6 w-6"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-headline text-lg font-semibold mb-1",children:a.title}),e.jsx("p",{className:"text-sm text-foreground/80",children:a.description})]})]},o))}),t.cultural_adaptations&&t.cultural_adaptations.length>0&&e.jsxs("div",{className:"mt-6 p-4 bg-muted/50 rounded-lg",children:[e.jsx("h4",{className:"font-headline text-lg font-semibold mb-3",children:"التكيفات الثقافية"}),e.jsx("ul",{className:"space-y-2",children:t.cultural_adaptations.map((a,o)=>e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx(h,{className:"h-4 w-4 text-primary flex-shrink-0 mt-0.5"}),e.jsx("span",{className:"text-sm text-foreground/80",children:a})]},o))})]})]})]})}export{P as ServiceFeatures};
