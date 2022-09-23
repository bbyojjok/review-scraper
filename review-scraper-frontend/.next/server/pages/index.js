"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 5533:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "s": () => (/* binding */ findList),
  "r": () => (/* binding */ findReview)
});

;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: ./lib/api/client.ts

const client = external_axios_default().create();
client.defaults.baseURL = 'http://127.0.0.1:8083';
/* harmony default export */ const api_client = (client);
;// CONCATENATED MODULE: ./lib/api/index.ts

const findList = name => {
  let url = '/api/list';

  if (name) {
    url += `/${name}`;
  }

  return api_client.get(url);
};
const findReview = url => api_client.get(`/api/review/day${url}`);

/***/ }),

/***/ 879:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "@emotion/styled/base"
var base_ = __webpack_require__(777);
var base_default = /*#__PURE__*/__webpack_require__.n(base_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "react-icons/md"
var md_ = __webpack_require__(4041);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/Lists.tsx


function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }






const ListsBlock = /*#__PURE__*/base_default()("div",  true ? {
  target: "e1cpdwub0"
} : 0)( true ? {
  name: "ku4xx8",
  styles: "padding:20px;ul{display:flex;flex-wrap:wrap;max-width:750px;margin:0 auto;li{text-align:center;width:20%;padding:20px;a{display:block;img{vertical-align:top;width:100%;}.img{position:relative;overflow:hidden;display:block;width:100%;border-radius:10%;border:1px solid transparent;transition:all 0.2s;img{border-radius:10%;transition:all 0.3s;}.over-box{position:absolute;left:0;top:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;background-color:rgba(0, 0, 0, 0.6);border-radius:10%;opacity:0;transition:opacity 0.2s;.icon{display:inline-block;padding:10px;background-color:rgba(255, 255, 255, 0.6);border-radius:50%;}}}.title{display:inline-block;padding:10px 0 0;font-size:13px;color:#ddd;transition:color 0.2s;}}&.add{a{position:relative;padding:100% 0 0 0;.img{position:absolute;left:0;top:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;border:1px solid #ddd;.add{width:2rem;height:2rem;color:#ddd;transition:all 0.2s;}}}}}}@media (hover: hover){ul li{a:hover{.img{border:1px solid #fff;img{scale:1.1;}.over-box{opacity:1;}}.title{color:#fff;}}&.add{a:hover{.img{border:1px solid #fff;}.add{width:3rem;height:3rem;color:#fff;}}}}}@media (max-width: 700px){ul li{width:25%;}}@media (max-width: 550px){ul li{width:33.3%;}}@media (max-width: 400px){ul li{width:50%;}}"
} : 0);

const Lists = ({
  lists
}) => {
  return /*#__PURE__*/jsx_runtime_.jsx(ListsBlock, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
      children: [lists.map(list => /*#__PURE__*/jsx_runtime_.jsx("li", {
        children: /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
          href: `/review/${list.name}/7/12345`,
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
            children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
              className: "img",
              children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
                src: list.appStore?.icon,
                alt: list.name
              }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                className: "over-box",
                children: /*#__PURE__*/jsx_runtime_.jsx("span", {
                  className: "icon",
                  children: /*#__PURE__*/jsx_runtime_.jsx(md_.MdOutlineArrowForward, {
                    color: "#000"
                  })
                })
              })]
            }), /*#__PURE__*/jsx_runtime_.jsx("span", {
              className: "title",
              children: list.appStore?.title
            })]
          })
        })
      }, list.name)), /*#__PURE__*/jsx_runtime_.jsx("li", {
        className: "add",
        children: /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
          href: "/admin/add",
          children: /*#__PURE__*/jsx_runtime_.jsx("a", {
            children: /*#__PURE__*/jsx_runtime_.jsx("span", {
              className: "img",
              children: /*#__PURE__*/jsx_runtime_.jsx(md_.MdAdd, {
                className: "add"
              })
            })
          })
        })
      })]
    })
  });
};

/* harmony default export */ const components_Lists = (Lists);
// EXTERNAL MODULE: ./lib/api/index.ts + 2 modules
var api = __webpack_require__(5533);
;// CONCATENATED MODULE: ./pages/index.tsx




const Home = ({
  lists
}) => {
  return /*#__PURE__*/jsx_runtime_.jsx(components_Lists, {
    lists: lists
  });
};

/* harmony default export */ const pages = (Home);
const getServerSideProps = async () => {
  const {
    data: lists
  } = await (0,api/* findList */.s)();
  return {
    props: {
      lists
    }
  };
};

/***/ }),

/***/ 777:
/***/ ((module) => {

module.exports = require("@emotion/styled/base");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 4041:
/***/ ((module) => {

module.exports = require("react-icons/md");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [383,664], () => (__webpack_exec__(879)));
module.exports = __webpack_exports__;

})();