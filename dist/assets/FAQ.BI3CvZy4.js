import{c as t,j as e}from"./utils.uq0GLgWE.js";import{C as o,a as i,b as c,c as l}from"./card.CtfqngXb.js";import"./index.CVf8TyFT.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],m=t("ChevronDown",d);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],p=t("CircleHelp",x);function f({faqs:r,title:n="الأسئلة الشائعة"}){return!r||r.length===0?null:e.jsxs(o,{children:[e.jsx(i,{children:e.jsxs(c,{className:"font-headline text-2xl flex items-center gap-2",children:[e.jsx(p,{className:"h-6 w-6 text-primary"}),n]})}),e.jsx(l,{children:e.jsx("div",{className:"space-y-4",children:r.map((s,a)=>e.jsxs("details",{className:"border rounded-lg overflow-hidden hover:shadow-md transition-shadow group",children:[e.jsxs("summary",{className:"w-full px-6 py-4 text-right flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer list-none",children:[e.jsx(m,{className:"h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180"}),e.jsx("span",{className:"font-medium text-foreground pr-2",children:s.question})]}),e.jsx("div",{className:"px-6 pb-4",children:e.jsx("div",{className:"border-t pt-4",children:e.jsx("p",{className:"text-foreground/80 leading-relaxed",children:s.answer})})})]},a))})})]})}export{f as FAQ};
