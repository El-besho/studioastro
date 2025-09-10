import{c as a,j as e}from"./utils.uq0GLgWE.js";import{C as d,a as i,b as m,c as h}from"./card.CtfqngXb.js";import{r as p}from"./index.CVf8TyFT.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],u=a("ChevronDown",x);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],f=a("CircleHelp",j);function C({faqs:r,title:o="الأسئلة الشائعة"}){const[n,c]=p.useState(new Set),l=t=>{const s=new Set(n);s.has(t)?s.delete(t):s.add(t),c(s)};return!r||r.length===0?null:e.jsxs(d,{children:[e.jsx(i,{children:e.jsxs(m,{className:"font-headline text-2xl flex items-center gap-2",children:[e.jsx(f,{className:"h-6 w-6 text-primary"}),o]})}),e.jsx(h,{children:e.jsx("div",{className:"space-y-4",children:r.map((t,s)=>e.jsxs("div",{className:"border rounded-lg overflow-hidden hover:shadow-md transition-shadow",children:[e.jsxs("button",{onClick:()=>l(s),className:"w-full px-6 py-4 text-right flex items-center justify-between hover:bg-muted/50 transition-colors",children:[e.jsx(u,{className:`h-5 w-5 text-muted-foreground transition-transform ${n.has(s)?"rotate-180":""}`}),e.jsx("span",{className:"font-medium text-foreground pr-2",children:t.question})]}),n.has(s)&&e.jsx("div",{className:"px-6 pb-4",children:e.jsx("div",{className:"border-t pt-4",children:e.jsx("p",{className:"text-foreground/80 leading-relaxed",children:t.answer})})})]},s))})})]})}export{C as FAQ};
