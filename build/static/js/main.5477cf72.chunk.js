(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{168:function(e,t,a){},169:function(e,t,a){},170:function(e,t,a){},171:function(e,t,a){},172:function(e,t,a){"use strict";a.r(t);var n=a(2),c=a(0),r=a.n(c),s=a(17),l=a.n(s),o=a(16),i=a(120),j=(a(144),i.a.initializeApp({apiKey:"AIzaSyDkoj4f8yBGgo90QyKUn6vj-IBYmcXyS5s",authDomain:"react-auth-dev-57b4d.firebaseapp.com",databaseURL:"https://react-auth-dev-57b4d.firebaseio.com",projectId:"react-auth-dev-57b4d",storageBucket:"react-auth-dev-57b4d.appspot.com",messagingSenderId:"1035815722991",appId:"1:1035815722991:web:abaefa6a42e2b29e6c201a"})),d=j.auth(),b=a(48),u=a.n(b),O=r.a.createContext();function m(){return Object(c.useContext)(O)}function h(e){var t=e.children,a=Object(c.useState)(null),r=Object(o.a)(a,2),s=r[0],l=r[1],i=Object(c.useState)(!0),j=Object(o.a)(i,2),b=j[0],m=j[1];Object(c.useEffect)((function(){return d.onAuthStateChanged((function(e){e!==s&&u.a.post("".concat("https://bookingcalendar-m.herokuapp.com/a","/login/signup"),{email:e.email,uid:e.uid}).then((function(e){return console.log(e.data)})),l(e),m(!1)}))}),[]);var h={currentUser:s,login:function(e,t){return d.signInWithEmailAndPassword(e,t)},signup:function(e,t){return d.createUserWithEmailAndPassword(e,t)},logout:function(){return d.signOut()},resetPassword:function(e){return d.sendPasswordResetEmail(e)},updateEmail:function(e){return s.updateEmail(e)},updatePassword:function(e){return s.updatePassword(e)}};return Object(n.jsx)(O.Provider,{value:h,children:!b&&t})}var p=a(19),x=a(21),v=a(62),f=a(125);function g(e){var t=e.children,a=Object(c.useState)(!0),r=Object(o.a)(a,2),s=r[0],l=r[1],i=m().currentUser;return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)("nav",{className:"navbar navbar-expand-lg navbar-dark bg-primary",style:{zIndex:"99"},children:[Object(n.jsx)(p.b,{className:"navbar-brand",to:"/",children:"Booking"}),Object(n.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarColor01","aria-controls":"navbarColor01","aria-expanded":!s,"aria-label":"Toggle navigation",onClick:function(){return l(!s)},children:Object(n.jsx)("span",{className:"navbar-toggler-icon"})}),Object(n.jsxs)("div",{className:s?"collapse navbar-collapse":"navbar-collapse",id:"navbarColor01",children:[Object(n.jsxs)("ul",{className:"navbar-nav mr-auto",children:[Object(n.jsx)("li",{className:"nav-item",children:Object(n.jsx)(p.b,{className:"nav-link",to:"/",children:"Home"})}),Object(n.jsx)("li",{className:"nav-item",children:Object(n.jsx)(p.b,{className:"nav-link",to:"/",children:"Features"})}),Object(n.jsx)("li",{className:"nav-item",children:Object(n.jsx)(p.b,{className:"nav-link",to:"/",children:"Pricing"})}),Object(n.jsx)("li",{className:"nav-item",children:Object(n.jsx)(p.b,{className:"nav-link",to:"/",children:"About"})})]}),Object(n.jsx)("form",{className:"form-inline my-2 my-lg-0",children:null==i?Object(n.jsx)(p.b,{to:"/l/login",className:"btn btn-info my-2 my-sm-0",children:"Login"}):Object(n.jsx)(p.b,{to:"/l/calendar",className:"btn btn-info my-2 my-sm-0",children:"Admin Page"})})]})]}),t]})}var N=a(35),y=a.n(N),k=a(49);function w(e){var t=e.children,a=Object(c.useState)(""),r=Object(o.a)(a,2),s=(r[0],r[1]),l=Object(c.useState)(!0),i=Object(o.a)(l,2),j=i[0],d=i[1],b=m(),u=(b.currentUser,b.logout),O=Object(x.g)();function h(){return(h=Object(k.a)(y.a.mark((function e(){return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(""),e.prev=1,e.next=4,u();case 4:O.push("/login"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),s("Failed to logout");case 10:case"end":return e.stop()}}),e,null,[[1,7]])})))).apply(this,arguments)}return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)("nav",{className:"navbar navbar-expand-lg navbar-dark bg-primary",style:{zIndex:"99"},children:[Object(n.jsx)(p.b,{className:"navbar-brand",to:"/",children:"Admin Page"}),Object(n.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarColor01","aria-controls":"navbarColor01","aria-expanded":!j,"aria-label":"Toggle navigation",onClick:function(){return d(!j)},children:Object(n.jsx)("span",{className:"navbar-toggler-icon"})}),Object(n.jsxs)("div",{className:j?"collapse navbar-collapse":"navbar-collapse",id:"navbarColor01",children:[Object(n.jsxs)("ul",{className:"navbar-nav mr-auto",children:[Object(n.jsx)("li",{className:"nav-item",children:Object(n.jsx)(p.b,{className:"nav-link",to:"/calendar",children:"Calendar"})}),Object(n.jsx)("li",{className:"nav-item",children:Object(n.jsx)(p.b,{className:"nav-link",to:"/setup",children:"Setup"})}),Object(n.jsx)("li",{className:"nav-item",children:Object(n.jsx)(p.b,{className:"nav-link",to:"/profile",children:"Profile"})})]}),Object(n.jsx)("form",{className:"form-inline my-2 my-lg-0",children:Object(n.jsx)("button",{className:"btn btn-info my-2 my-sm-0",onClick:function(){return h.apply(this,arguments)},children:"Sign Out"})})]})]}),t]})}function S(e){var t=e.component,a=e.layout,c=e.secure,r=Object(f.a)(e,["component","layout","secure"]),s=m().currentUser,l=c?Object(n.jsx)(x.b,Object(v.a)(Object(v.a)({},r),{},{layout:!0,render:function(e){return s?Object(n.jsx)(t,Object(v.a)({},e)):Object(n.jsx)(x.a,{to:"/login"})}})):Object(n.jsx)(x.b,Object(v.a)(Object(v.a)({},r),{},{layout:!0,render:function(e){return Object(n.jsx)(t,Object(v.a)({},e))}}));switch(a){case"SITE":return Object(n.jsx)(g,{children:l});case"PROFILE":return Object(n.jsx)(w,{children:l});default:return Object(n.jsx)(n.Fragment,{children:l})}}function P(){return Object(n.jsx)("div",{children:Object(n.jsx)("h1",{children:"Hello"})})}a(71);function C(){var e=Object(c.useRef)(),t=Object(c.useRef)(),a=m().login,r=Object(c.useState)(""),s=Object(o.a)(r,2),l=s[0],i=s[1],j=Object(c.useState)(!1),d=Object(o.a)(j,2),b=d[0],u=d[1],O=Object(x.g)();function h(){return(h=Object(k.a)(y.a.mark((function n(c){return y.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return c.preventDefault(),n.prev=1,i(""),u(!0),n.next=6,a(e.current.value,t.current.value);case 6:O.push("/calendar"),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(1),i("Failed to sign in");case 12:u(!1);case 13:case"end":return n.stop()}}),n,null,[[1,9]])})))).apply(this,arguments)}return Object(n.jsx)("div",{className:"backdrop",children:Object(n.jsxs)("form",{className:"login-form center",onSubmit:function(e){return h.apply(this,arguments)},children:[Object(n.jsx)("h1",{children:"Login"}),l&&Object(n.jsx)("div",{className:"alert alert-danger",children:Object(n.jsx)("strong",{children:l})}),Object(n.jsxs)("div",{className:"form-group",children:[Object(n.jsx)("label",{children:"Email address"}),Object(n.jsx)("input",{type:"email",className:"form-control",ref:e,placeholder:"Enter email"})]}),Object(n.jsxs)("div",{className:"form-group",children:[Object(n.jsx)("label",{children:"Password"}),Object(n.jsx)("input",{type:"password",className:"form-control",ref:t,placeholder:"Password"}),Object(n.jsx)("p",{className:"form-link",children:Object(n.jsx)(p.b,{to:"/login/forgot-password",children:"Forgot Password?"})})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("button",{className:"btn btn-primary btn-lg btn-block",type:"submit",disabled:b,children:"Login"}),Object(n.jsxs)("p",{className:"form-link",children:["Need an account? ",Object(n.jsx)(p.b,{to:"/login/signup",children:"Sign Up"})]})]})]})})}function E(){var e=Object(c.useRef)(),t=Object(c.useRef)(),a=Object(c.useRef)(),r=m().signup,s=Object(c.useState)(""),l=Object(o.a)(s,2),i=l[0],j=l[1],d=Object(c.useState)(!1),b=Object(o.a)(d,2),u=b[0],O=b[1],h=Object(x.g)();function v(){return(v=Object(k.a)(y.a.mark((function n(c){return y.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(c.preventDefault(),t.current.value===a.current.value){n.next=3;break}return n.abrupt("return",j("Passwords do not match"));case 3:return n.prev=3,j(""),O(!0),n.next=8,r(e.current.value,t.current.value);case 8:h.push("/"),n.next=14;break;case 11:n.prev=11,n.t0=n.catch(3),j(n.t0);case 14:O(!1);case 15:case"end":return n.stop()}}),n,null,[[3,11]])})))).apply(this,arguments)}return Object(n.jsx)("div",{className:"backdrop",children:Object(n.jsxs)("form",{className:"login-form center",onSubmit:function(e){return v.apply(this,arguments)},children:[Object(n.jsx)("h1",{children:"Sign Up"}),i&&Object(n.jsx)("div",{className:"alert alert-danger",children:Object(n.jsx)("strong",{children:i})}),Object(n.jsxs)("div",{className:"form-group",children:[Object(n.jsx)("label",{children:"Email address"}),Object(n.jsx)("input",{type:"email",className:"form-control",ref:e,placeholder:"Enter email"})]}),Object(n.jsxs)("div",{className:"form-group",children:[Object(n.jsx)("label",{children:"Password"}),Object(n.jsx)("input",{type:"password",className:"form-control",ref:t,placeholder:"Password"})]}),Object(n.jsxs)("div",{className:"form-group",children:[Object(n.jsx)("label",{children:"Password Confirmation"}),Object(n.jsx)("input",{type:"password",className:"form-control",ref:a,placeholder:"Password"})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("button",{className:"btn btn-primary btn-lg btn-block",type:"submit",disabled:u,children:"Signup"}),Object(n.jsxs)("p",{className:"form-link",children:["Already have an account? ",Object(n.jsx)(p.b,{to:"/login",children:"Login"})]})]})]})})}function I(){var e=Object(c.useRef)(),t=m().resetPassword,a=Object(c.useState)(""),r=Object(o.a)(a,2),s=r[0],l=r[1],i=Object(c.useState)(""),j=Object(o.a)(i,2),d=j[0],b=j[1],u=Object(c.useState)(!1),O=Object(o.a)(u,2),h=O[0],x=O[1];function v(){return(v=Object(k.a)(y.a.mark((function a(n){return y.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n.preventDefault(),a.prev=1,l(""),x(!0),a.next=6,t(e.current.value);case 6:b("Check your inbox for further instructions"),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(1),l("Failed to reset password");case 12:x(!1);case 13:case"end":return a.stop()}}),a,null,[[1,9]])})))).apply(this,arguments)}return Object(n.jsx)("div",{className:"backdrop",children:Object(n.jsxs)("form",{className:"login-form center",onSubmit:function(e){return v.apply(this,arguments)},children:[Object(n.jsx)("h1",{children:"Password Reset"}),s&&Object(n.jsx)("div",{className:"alert alert-danger",children:Object(n.jsx)("strong",{children:s})}),d&&Object(n.jsx)("div",{className:"alert alert-success",children:Object(n.jsx)("strong",{children:d})}),Object(n.jsxs)("div",{className:"form-group",children:[Object(n.jsx)("label",{children:"Email address"}),Object(n.jsx)("input",{type:"email",className:"form-control",ref:e,placeholder:"Enter email"})]}),Object(n.jsx)("div",{children:Object(n.jsx)("button",{className:"btn btn-primary btn-lg btn-block",type:"submit",disabled:h,children:"Reset Password"})}),Object(n.jsxs)("p",{className:"form-link",children:[Object(n.jsx)(p.b,{to:"/login/signup",children:"Sign Up"})," | ",Object(n.jsx)(p.b,{to:"/login",children:"Login"})]})]})})}var D=a(124),R=a(101),F=a(98),U=a(99),L=a(100),M=a(102),A=a(122),B=a(121),T=a(59),_=a(205),z=a(56),K=a(123),H=a(22),J=a(198),W=a(207);a(168);function X(e){var t=e.open,a=e.children,c=e.onClose;return t?l.a.createPortal(Object(n.jsx)("div",{className:"modal-background",onContextMenu:function(e){e.stopPropagation()},children:Object(n.jsxs)("div",{className:"modal-content animate",onClick:function(e){e.stopPropagation()},children:[Object(n.jsx)("button",{type:"button",className:"btn btn-outline-primary modal-close-btn",onClick:c,children:"X"}),a]})}),document.getElementById("modalPortal")):null}function G(e){var t=e.eventData,a=m().currentUser,r=Object(c.useState)(!1),s=Object(o.a)(r,2),l=s[0],i=s[1],j=function(){i(!l)};return Object(n.jsxs)("li",{onClick:j,children:[Object(n.jsx)(z.b,{id:t._id,children:Object(n.jsx)("div",{className:"calendar-event",children:t.eventName})}),Object(n.jsx)(z.a,{hideOnLeave:!0,id:t._id,children:Object(n.jsx)(z.c,{date:{foo:"bar"},onClick:function(e){e.stopPropagation(),u.a.delete("".concat("https://bookingcalendar-m.herokuapp.com/a","/calendar/events/").concat(a.uid,"/").concat(t._id)).then((function(e){return console.log(e.data)})),window.location.reload()},children:"Remove Session"})}),Object(n.jsx)(X,{open:l,onClose:j,children:Object(n.jsx)("div",{children:t.eventName})})]},t._id)}a(169);function Q(e){var t=e.classInfo,a=e.formattedDate,r=e.day,s=e.events,l=m().currentUser,i=Object(c.useState)(!1),j=Object(o.a)(i,2),d=j[0],b=j[1],O=Object(c.useState)(new Date(r)),h=Object(o.a)(O,2),p=h[0],x=h[1],v=Object(c.useRef)(""),f=function(){b(!d)},g=function(e){x(e)};return Object(n.jsxs)("div",{className:t,children:[Object(n.jsx)("span",{className:"calendar-number",children:a}),Object(n.jsx)(z.b,{id:""+r.getDate()+r.getMonth(),className:"",children:Object(n.jsx)("ul",{className:"calendar-event-list",children:function(e){if(!(s.length<=0))return console.log(s),s.map((function(t){return Object(n.jsx)(n.Fragment,{children:Object(B.a)(Date.parse(t.eventDate),e)&&Object(n.jsx)(G,{eventData:t})})}))}(r)})}),Object(n.jsx)(z.a,{hideOnLeave:!0,id:""+r.getDate()+r.getMonth(),children:Object(n.jsx)(z.c,{data:{foo:"bar"},onClick:f,children:"New Session"})}),Object(n.jsx)(X,{open:d,onClose:f,children:Object(n.jsxs)("div",{children:[Object(n.jsx)("h1",{children:"New Session"}),Object(n.jsxs)("form",{className:"modal-form",onSubmit:function(e){if(!(v.current.value.length<=0)){var t={eventName:v.current.value,eventDate:p};u.a.post("".concat("https://bookingcalendar-m.herokuapp.com/a","/calendar/events/").concat(l.uid,"/add"),t).then((function(e){return console.log(e.data)}))}},children:[Object(n.jsx)("label",{children:"Session Name"}),Object(n.jsx)("br",{}),Object(n.jsx)("input",{type:"text",ref:v}),Object(n.jsx)("div",{children:Object(n.jsxs)(H.a,{utils:K.a,children:[Object(n.jsx)(J.a,{margin:"normal",id:"date-picker-dialog",label:"Date",format:"MM/dd/yyyy",value:p,onChange:g,KeyboardButtonProps:{"aria-label":"change date"}}),Object(n.jsx)("br",{}),Object(n.jsx)(W.a,{margin:"normal",id:"time-picker",label:"Time",value:p,onChange:g,KeyboardButtonProps:{"aria-label":"change time"}})]})}),Object(n.jsx)("button",{className:"btn btn-info",type:"submit",children:"Create Session"})]})]})})]},r.getDate())}a(170);function Y(){var e=m().currentUser,t=Object(c.useState)(new Date),a=Object(o.a)(t,2),r=a[0],s=a[1],l=Object(c.useState)([]),i=Object(o.a)(l,2),j=i[0],d=i[1];Object(c.useEffect)((function(){u.a.get("".concat("https://bookingcalendar-m.herokuapp.com/a","/calendar/events/")+e.uid).then((function(e){console.log(e.data),d(e.data)})).catch((function(e){console.log(e)}))}),[]);var b=function(){s(Object(T.a)(r,1))},O=function(){s(Object(_.a)(r,1))};return Object(n.jsxs)("div",{className:"calendar",children:[Object(n.jsxs)("div",{className:"calendar-header calendar-grid-row flex-middle",children:[Object(n.jsx)("div",{className:"calendar-grid-col calendar-grid-col-start",children:Object(n.jsx)("div",{className:"calendar-icon",onClick:O,children:"chevron_left"})}),Object(n.jsx)("div",{className:"calendar-col calendar-col-center",children:Object(n.jsx)("span",{children:Object(D.a)(r,"MMMM yyyy")})}),Object(n.jsx)("div",{className:"calendar-grid-col calendar-grid-col-end",children:Object(n.jsx)("div",{className:"calendar-icon",onClick:b,children:"chevron_right"})})]}),function(){for(var e=[],t=Object(R.a)(r),a=0;a<7;a++)e.push(Object(n.jsx)("div",{className:"calendar-grid-col calendar-grid-col-center",children:Object(D.a)(Object(F.a)(t,a),"EEEE")},a));return Object(n.jsx)("div",{className:"calendar-days calendar-grid-row",children:e})}(),function(){for(var e=Object(U.a)(r),t=Object(L.a)(e),a=Object(R.a)(e),c=Object(M.a)(t),s=[],l=[],o=a,i="";o<=c;){for(var d=0;d<7;d++)i=Object(D.a)(o,"d"),l.push(Object(n.jsx)(Q,{classInfo:"calendar-grid-col calendar-cell ".concat(Object(A.a)(o,e)?"":"disabled"," ").concat(Object(B.a)(o,new Date)?"selected":""),formattedDate:i,day:o,events:j})),o=Object(F.a)(o,1);s.push(Object(n.jsx)("div",{className:"calendar-grid-row",children:l},o)),l=[]}return Object(n.jsx)("div",{className:"calendar-body",children:s})}()]})}function q(){return Object(n.jsx)("div",{children:"Setup"})}function V(){return Object(n.jsx)("div",{children:"Profile"})}a(171);var Z=function(){return Object(n.jsx)(h,{children:Object(n.jsx)(p.a,{children:Object(n.jsxs)(x.d,{children:[Object(n.jsx)(S,{exact:!0,path:"/",layout:"SITE",component:P}),Object(n.jsx)(S,{path:"/l/login/signup",layout:"SITE",component:E}),Object(n.jsx)(S,{path:"/l/login/forgot-password",layout:"SITE",component:I}),Object(n.jsx)(S,{path:"/l/login",layout:"SITE",component:C}),Object(n.jsx)(S,{path:"/l/calendar",layout:"PROFILE",secure:!0,component:Y}),Object(n.jsx)(S,{path:"/l/setup",layout:"PROFILE",secure:!0,component:q}),Object(n.jsx)(S,{path:"/l/profile",layout:"PROFILE",secure:!0,component:V})]})})})};l.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(Z,{})}),document.getElementById("root"))},71:function(e,t,a){}},[[172,1,2]]]);
//# sourceMappingURL=main.5477cf72.chunk.js.map