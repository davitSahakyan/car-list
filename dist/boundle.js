!function(e){var r={};function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)n.d(t,o,function(r){return e[r]}.bind(null,o));return t},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="",n(n.s=4)}([function(e,r,n){"use strict";e.exports=function(e){var r=[];return r.toString=function(){return this.map((function(r){var n=function(e,r){var n=e[1]||"",t=e[3];if(!t)return n;if(r&&"function"==typeof btoa){var o=(i=t,s=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(l," */")),a=t.sources.map((function(e){return"/*# sourceURL=".concat(t.sourceRoot||"").concat(e," */")}));return[n].concat(a).concat([o]).join("\n")}var i,s,l;return[n].join("\n")}(r,e);return r[2]?"@media ".concat(r[2]," {").concat(n,"}"):n})).join("")},r.i=function(e,n,t){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(t)for(var a=0;a<this.length;a++){var i=this[a][0];null!=i&&(o[i]=!0)}for(var s=0;s<e.length;s++){var l=[].concat(e[s]);t&&o[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),r.push(l))}},r}},function(e,r,n){var t=n(2),o=n(3);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var a={insert:"head",singleton:!1};t(o,a);e.exports=o.locals||{}},function(e,r,n){"use strict";var t,o=function(){return void 0===t&&(t=Boolean(window&&document&&document.all&&!window.atob)),t},a=function(){var e={};return function(r){if(void 0===e[r]){var n=document.querySelector(r);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[r]=n}return e[r]}}(),i=[];function s(e){for(var r=-1,n=0;n<i.length;n++)if(i[n].identifier===e){r=n;break}return r}function l(e,r){for(var n={},t=[],o=0;o<e.length;o++){var a=e[o],l=r.base?a[0]+r.base:a[0],d=n[l]||0,c="".concat(l," ").concat(d);n[l]=d+1;var u=s(c),p={css:a[1],media:a[2],sourceMap:a[3]};-1!==u?(i[u].references++,i[u].updater(p)):i.push({identifier:c,updater:C(p,r),references:1}),t.push(c)}return t}function d(e){var r=document.createElement("style"),t=e.attributes||{};if(void 0===t.nonce){var o=n.nc;o&&(t.nonce=o)}if(Object.keys(t).forEach((function(e){r.setAttribute(e,t[e])})),"function"==typeof e.insert)e.insert(r);else{var i=a(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(r)}return r}var c,u=(c=[],function(e,r){return c[e]=r,c.filter(Boolean).join("\n")});function p(e,r,n,t){var o=n?"":t.media?"@media ".concat(t.media," {").concat(t.css,"}"):t.css;if(e.styleSheet)e.styleSheet.cssText=u(r,o);else{var a=document.createTextNode(o),i=e.childNodes;i[r]&&e.removeChild(i[r]),i.length?e.insertBefore(a,i[r]):e.appendChild(a)}}function m(e,r,n){var t=n.css,o=n.media,a=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),a&&btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}var f=null,g=0;function C(e,r){var n,t,o;if(r.singleton){var a=g++;n=f||(f=d(r)),t=p.bind(null,n,a,!1),o=p.bind(null,n,a,!0)}else n=d(r),t=m.bind(null,n,r),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else o()}}e.exports=function(e,r){(r=r||{}).singleton||"boolean"==typeof r.singleton||(r.singleton=o());var n=l(e=e||[],r);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var t=0;t<n.length;t++){var o=s(n[t]);i[o].references--}for(var a=l(e,r),d=0;d<n.length;d++){var c=s(n[d]);0===i[c].references&&(i[c].updater(),i.splice(c,1))}n=a}}}},function(e,r,n){"use strict";n.r(r);var t=n(0),o=n.n(t)()(!1);o.push([e.i,"body {\r\n  margin: 0;\r\n  padding: 0;\r\n  font-family: sans-serif;\r\n}\r\n.wrapper {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n#header {\r\n  display: grid;\r\n  grid-template-columns: 5fr 3fr 1fr 1fr 1fr 1fr;\r\n  border: 1px solid lightgrey;\r\n  width: 90%;\r\n  margin-bottom: 20px;\r\n}\r\n#header span{\r\n text-align: center;\r\n padding: 4px 2px;\r\n}\r\n.grid {\r\n  display: grid;\r\n  grid-template-rows: repeat(10 , 1fr);\r\n  border: 1px solid lightgrey;\r\n  width: 90%;\r\n}\r\n.grid div{\r\n  display: grid;\r\n  grid-template-columns: 5fr 3fr 1fr 1fr 1fr 1fr;\r\n  border: 1px solid lightgrey;\r\n  padding: 8px 4px;\r\n}\r\n.grid div span{\r\n  border-left: 1px solid lightgrey;\r\n  padding: 4px 2px;\r\n}\r\n/* .carList {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  flex-wrap: wrap;\r\n  width: 90%;\r\n} */\r\n/* .listElement {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: left;\r\n  justify-content: center;\r\n  width: 30%;\r\n  padding: 0.3em;\r\n  border : 1px solid grey;\r\n  margin : 0.3rem;\r\n  min-height: 300px;\r\n} */\r\n.paginationContainer {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n.pagination {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  flex-wrap: wrap;\r\n}\r\n.paginationContainer button {\r\n  width : 30px;\r\n  height: 30px;\r\n  border: none;\r\n  outline: none;\r\n  cursor: pointer;\r\n  background-color: lightblue;\r\n  margin : 0.2em;\r\n  color: white;\r\n  font-size: 16px;\r\n  transition: 0.3s;\r\n}\r\n.paginationContainer button:hover {\r\n  background-color:#3399ff;\r\n}\r\n.pagination button.active {\r\n  background-color: #3399ff;\r\n}\r\n\r\n/* colors */\r\n.color1 {\r\n  background-color: lightsalmon;\r\n}\r\n.color2 {\r\n  background-color: lightseagreen;\r\n}\r\n.color3 {\r\n  background-color: lightyellow;\r\n}\r\n.color4 {\r\n  background-color: lightgrey;\r\n}\r\n.color5 {\r\n  background-color: lightpink;\r\n}\r\n.color6 {\r\n  background-color: lightcoral;\r\n}",""]),r.default=o},function(e,r,n){"use strict";n.r(r);localStorage.setItem("data",JSON.stringify([{Model:"4Â½-Litre Supercharged 'Blower' Bentley Single-Seater",Brand:"Bentley",Date:"1929",Horsepower:"225",Transmission:"Automatic",Class:"Sedan"},{Model:"Alfa Romeo 6C 1750 Supercharged Gran Sport Spider",Brand:"Alfa Romeo",Date:"1931",Horsepower:"225",Transmission:"Automatic",Class:"Sedan"},{Model:"Alfa Romeo 6C 2500 Competizione",Brand:"Alfa Romeo",Date:"1948",Horsepower:"265",Transmission:"Automatic",Class:"SUV"},{Model:"Alfa Romeo 8C 2300 'Le Mans' Tourer",Brand:"Alfa Romeo",Date:"1934",Horsepower:"290",Transmission:"Automatic",Class:"Sports"},{Model:"Alfa Romeo 8C 2300 Castagna Drop Head Coupe",Brand:"Alfa Romeo",Date:"1933",Horsepower:"200",Transmission:"Automatic",Class:"Sedan"},{Model:"Alfa Romeo 8C 2300 Monza",Brand:"Alfa Romeo",Date:"1933",Horsepower:"270",Transmission:"Automatic",Class:"Sedan"},{Model:"Alfa Romeo 8C 2900B Pinin Farina Cabriolet",Brand:"Alfa Romeo",Date:"1937",Horsepower:"200",Transmission:"Automatic",Class:"Sedan"},{Model:"Alfa Romeo Tipo 256 Cabriolet Sportivo",Brand:"Alfa Romeo",Date:"1939",Horsepower:"170",Transmission:"Automatic",Class:"Sedan"},{Model:"Aston Martin DB3S",Brand:"Aston Martin",Date:"1955",Horsepower:"170",Transmission:"Automatic",Class:"Sedan"},{Model:"Aston Martin DB3S",Brand:"Aston Martin",Date:"1956",Horsepower:"220",Transmission:"Automatic",Class:"Sedan"},{Model:"Aston Martin DB5",Brand:"Aston Martin",Date:"1964",Horsepower:"220",Transmission:"Automatic",Class:"Sedan"},{Model:'Bentley 4 Litre "The Green Hornet"',Brand:"Bentley",Date:"1931",Horsepower:"220",Transmission:"Automatic",Class:"Sedan"},{Model:"Bentley 4Â½ Litre Le Mans Sports 'Bobtail'",Brand:"Bentley",Date:"1928",Horsepower:"220",Transmission:"Automatic",Class:"Sedan"},{Model:"Bentley 4Â½ Litre Supercharged Le Mans",Brand:"Bentley",Date:"1931",Horsepower:"220",Transmission:"Automatic",Class:"Sedan"},{Model:"Bentley 8 Litre Sports Coupe Cabriolet",Brand:"Bentley",Date:"1931",Horsepower:"250",Transmission:"Automatic",Class:"Sedan"},{Model:"Bentley Speed Six Tourer",Brand:"Bentley",Date:"1930",Horsepower:"220",Transmission:"Automatic",Class:"Sedan"},{Model:"Bugatti Royale Berline de Voyager",Brand:"Bugatti",Date:"1931",Horsepower:"220",Transmission:"Automatic",Class:"Wagon"},{Model:"Bugatti Royale Kellner Coupe",Brand:"Bugatti",Date:"1931",Horsepower:"220",Transmission:"Automatic",Class:"Sedan"},{Model:"Bugatti Type 18 5-litre Sports Two-seater",Brand:"Bugatti",Date:"1913",Horsepower:"300",Transmission:"Automatic",Class:"Sedan"},{Model:"Bugatti Type 57S Atalante",Brand:"Bugatti",Date:"1937",Horsepower:"330",Transmission:"Automatic",Class:"Sedan"},{Model:"Bugatti Type 57SC Atalante",Brand:"Bugatti",Date:"1937",Horsepower:"340",Transmission:"Automatic",Class:"Wagon"},{Model:"Bugatti Type 57SC Atalante Coupe",Brand:"Bugatti",Date:"1937",Horsepower:"340",Transmission:"Automatic",Class:"Sedan"},{Model:"Bugatti Veyron 16.4 Grand Sport",Brand:"Bugatti",Date:"2009",Horsepower:"450",Transmission:"Automatic",Class:"Sports"},{Model:"Chevrolet Corvette L88",Brand:"Chevrolet",Date:"1967",Horsepower:"180",Transmission:"Automatic",Class:"Sports"},{Model:"Chevrolet Corvette L88 Convertible",Brand:"Chevrolet",Date:"1967",Horsepower:"225",Transmission:"Automatic",Class:"Sports"},{Model:'De Dion, Bouton et TrÃ©pardoux Dos-Ã -Dos Steam Runabout "La Marquise"',Brand:"De Dion, Bouton et TrÃ©pardoux Dos-Ã -Dos Steam Runabout",Date:"1884",Horsepower:"250",Transmission:"Automatic",Class:"Sports"},{Model:'De Dion, Bouton et TrÃ©pardoux Dos-Ã -Dos Steam Runabout "La Marquise"',Brand:"De Dion, Bouton et TrÃ©pardoux Dos-Ã -Dos Steam Runabout",Date:"1884",Horsepower:"184",Transmission:"Automatic",Class:"Sedan"},{Model:"Delahaye 135 Competition Court Torpedo Roadster",Brand:"Delahaye",Date:"1939",Horsepower:"184",Transmission:"Automatic",Class:"Sedan"},{Model:"Delahaye Type 175S Roadster",Brand:"Delahaye",Date:"1949",Horsepower:"184",Transmission:"Automatic",Class:"Sedan"},{Model:"Duesenberg Model J Long-Wheelbase Coupe",Brand:"Duesenberg",Date:"1931",Horsepower:"184",Transmission:"Automatic",Class:"Sedan"},{Model:"Duesenberg Model SJ Convertible Coupe",Brand:"Duesenberg",Date:"1935",Horsepower:"184",Transmission:"Automatic",Class:"Wagon"},{Model:"Duesenberg SJ Roadster",Brand:"Duesenberg",Date:"1935",Horsepower:"225",Transmission:"Automatic",Class:"Sedan"},{Model:'Duesenberg SJ Speedster "Mormon Meteor"',Brand:"Duesenberg",Date:"1935",Horsepower:"225",Transmission:"Automatic",Class:"Sedan"},{Model:"Ferrari 166 MM Barchetta",Brand:"Ferrari",Date:"1950",Horsepower:"225",Transmission:"Automatic",Class:"Sedan"},{Model:"Ferrari 212 Export Berlinetta",Brand:"Ferrari",Date:"1951",Horsepower:"225",Transmission:"Automatic",Class:"Sedan"},{Model:"Ferrari 250 GT",Brand:"Ferrari",Date:"1957",Horsepower:"184",Transmission:"Automatic",Class:"Sedan"},{Model:"Ferrari 250 GT Berlinetta Competizione",Brand:"Ferrari",Date:"1955",Horsepower:"225",Transmission:"Automatic",Class:"Sedan"},{Model:"Ferrari 250 GT Cabriolet",Brand:"Ferrari",Date:"1959",Horsepower:"325",Transmission:"Automatic",Class:"Sedan"},{Model:"Ferrari 250 GT Cabriolet",Brand:"Ferrari",Date:"1959",Horsepower:"325",Transmission:"Automatic",Class:"Sedan"},{Model:"Ferrari 250 GT Cabriolet",Brand:"Ferrari",Date:"1959",Horsepower:"325",Transmission:"Automatic",Class:"Sedan"}]));var t=JSON.parse(localStorage.getItem("data")),o=document.getElementById("carList"),a=document.getElementById("pagination"),i=document.getElementById("header"),s=Array.from(document.getElementsByClassName("pageChange")),l=["color1","color2","color3","color4","color5","color6"],d=1,c=Math.ceil(t.length/10),u=function(e,r,n,a,i){r.innerHTML="",i.innerHTML="",a--;var s=0,d=n*a,c=d+n,u=e.slice(d,c);Object.keys(t[0]).forEach((function(e){var r=document.createElement("span");r.textContent="".concat(e),r.classList.add(l[s]),i.appendChild(r),s+=1}));for(var p=function(e){var r=u[e],n=document.createElement("div");n.classList="listElement",Object.keys(r).forEach((function(e){var t=document.createElement("span");t.textContent="".concat(r[e]),n.appendChild(t)})),o.appendChild(n)},m=0;m<u.length;m++)p(m)},p=function(e){var r=document.createElement("button");return r.textContent=e,r.classList.add("btn"),e===d&&r.classList.add("active"),r.addEventListener("click",(function(){u(t,o,10,d=e,i),document.getElementsByClassName("active")[0].classList.remove("active"),r.classList.add("active")})),r};s.forEach((function(e){e.addEventListener("click",(function(e){console.log(e.currentTarget),"INCREMENT"===e.currentTarget.id&&d<c?u(t,o,10,d+=1,i):"DECREMENT"===e.currentTarget.id&&d>1&&u(t,o,10,d-=1,i);var r=Array.from(document.getElementsByClassName("btn")).find((function(e){return e.textContent==d}));document.getElementsByClassName("active")[0].classList.remove("active"),r.classList.add("active")}))})),u(t,o,10,d,i),function(e){e.innerHTML="";for(var r=1;r<c+1;r++){var n=p(r);a.appendChild(n)}}(t);n(1)}]);