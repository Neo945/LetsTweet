(this["webpackJsonptweet-web"]=this["webpackJsonptweet-web"]||[]).push([[0],{12:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),i=n(7),o=n.n(i),r=(n(12),n(4)),s=n(2),u=n(0);function b(e){var t,n=(t=e.action).charAt(0).toUpperCase()+t.slice(1),a=Object(c.useState)(e.tweet.likes),i=Object(s.a)(a,2),o=i[0],r=i[1],b=Object(c.useState)(0!==e.tweet.likes),j=Object(s.a)(b,2),l=j[0],d=j[1];return n="like"===e.action?0===o?n:o+" "+n:n,Object(u.jsx)("button",{className:"btn btn-outline-primary btn-sm",onClick:function(e){l?(r(o-1),d(!1)):(r(o+1),d(!0))},children:n})}function j(e){return Object(u.jsx)("div",{className:"col-12 border py-3 mb-4 tweet",id:"t-".concat(e.tweet.id),children:Object(u.jsxs)("p",{children:[e.tweet.id,". ",e.tweet.content]})})}function l(e){var t=Object(c.useState)([]),n=Object(s.a)(t,2),a=n[0],i=n[1],o=Object(c.useState)([]),l=Object(s.a)(o,2),d=l[0],O=l[1];return Object(c.useEffect)((function(){Object(r.a)(e.newTweet).concat(a).length!==d.length&&O(Object(r.a)(e.newTweet).concat(a))}),[e.newTweet,d,a]),Object(c.useEffect)((function(){!function(e){fetch("http://localhost:8000/tweets").then((function(e){return e.json()})).then((function(t){console.log(t),e(t,200)}))}((function(e,t){200===t&&i(e)}))}),[]),Object(u.jsx)("div",{className:"root",children:d.map((function(e){return Object(u.jsxs)("div",{children:[Object(u.jsx)(j,{tweet:e}),Object(u.jsx)(b,{tweet:e,action:"like"}),Object(u.jsx)(b,{tweet:e,action:"retweet"})]},"buttonSet-".concat(e.id))}))})}function d(e){var t=a.a.useState([]),n=Object(s.a)(t,2),c=n[0],i=n[1],o=a.a.createRef();return Object(u.jsxs)("div",{className:"row mb-3",children:[Object(u.jsx)("div",{className:"col-md-4 mx-auto col-10",children:Object(u.jsxs)("form",{method:"POST",onSubmit:function(e){e.preventDefault();var t=Object(r.a)(c);t.unshift({content:o.current.value,likes:0,id:1234}),i(t),o.current.value=null},className:"form",id:"tweet-form",children:[Object(u.jsx)("input",{type:"hidden",value:"/",name:"next"}),Object(u.jsx)("textarea",{ref:o,required:!0,className:"form-control",name:"content",id:"clear",placeholder:"Your Tweet"}),Object(u.jsx)("button",{className:"btn btn-primary",type:"submit",children:"Submit"})]})}),Object(u.jsx)(l,{newTweet:c})]})}var O=function(e){return Object(u.jsx)(d,{})},f=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,15)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),i(e),o(e)}))};o.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(O,{})}),document.getElementById("root")),f()}},[[14,1,2]]]);
//# sourceMappingURL=main.20a0a0e9.chunk.js.map