"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 4758:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_Lists)
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
;// CONCATENATED MODULE: ./components/ListItem.tsx


function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }







const ListItemBlock = /*#__PURE__*/base_default()("li",  true ? {
  target: "e1dmg81v0"
} : 0)( true ? {
  name: "1y6r3hj",
  styles: "text-align:center;width:20%;padding:20px;a{display:block;img{vertical-align:top;width:100%;}.img{position:relative;overflow:hidden;display:block;width:100%;border-radius:10%;border:1px solid transparent;transition:all 0.2s;img{border-radius:10%;transition:all 0.3s;}.over-box{position:absolute;left:0;top:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;background-color:rgba(0, 0, 0, 0.6);border-radius:10%;opacity:0;transition:opacity 0.2s;.icon{display:inline-block;padding:10px;background-color:rgba(255, 255, 255, 0.6);border-radius:50%;}}}.title{display:inline-block;padding:10px 0 0;font-size:13px;color:#ddd;transition:color 0.2s;}}&.add{a{position:relative;padding:100% 0 0 0;.img{position:absolute;left:0;top:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;border:1px solid #ddd;.add{width:2rem;height:2rem;color:#ddd;transition:all 0.2s;}}}}@media (hover: hover){&{a:hover{.img{border:1px solid #fff;img{scale:1.1;}.over-box{opacity:1;}}.title{color:#fff;}}}&.add{a:hover{.img{border:1px solid #fff;}.add{width:3rem;height:3rem;color:#fff;}}}}@media (max-width: 700px){&{width:25%;}}@media (max-width: 550px){&{width:33.3%;}}@media (max-width: 400px){&{width:50%;}}"
} : 0);

const ListItem = ({
  icon,
  name,
  title
}) => {
  const href = name ? `/review/${name}/7/12345` : '/admin/add';
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: name ? /*#__PURE__*/jsx_runtime_.jsx(ListItemBlock, {
      children: /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
        href: href,
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
          children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
            className: "img",
            children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
              src: icon,
              alt: name
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
            children: title
          })]
        })
      })
    }) : /*#__PURE__*/jsx_runtime_.jsx(ListItemBlock, {
      className: "add",
      children: /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
        href: href,
        children: /*#__PURE__*/jsx_runtime_.jsx("a", {
          children: /*#__PURE__*/jsx_runtime_.jsx("span", {
            className: "img",
            children: /*#__PURE__*/jsx_runtime_.jsx(md_.MdAdd, {
              className: "add"
            })
          })
        })
      })
    })
  });
};

/* harmony default export */ const components_ListItem = (ListItem);
;// CONCATENATED MODULE: ./components/Lists.tsx


function Lists_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }





const ListsBlock = /*#__PURE__*/base_default()("div",  true ? {
  target: "e1cpdwub0"
} : 0)( true ? {
  name: "nr8e3w",
  styles: "padding:20px;ul{display:flex;flex-wrap:wrap;max-width:750px;margin:0 auto;}"
} : 0);

const Lists = ({
  lists
}) => {
  return /*#__PURE__*/jsx_runtime_.jsx(ListsBlock, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
      children: [lists.map(list => {
        const {
          name,
          appStore
        } = list;
        const {
          icon,
          title
        } = appStore;
        return /*#__PURE__*/jsx_runtime_.jsx(components_ListItem, {
          icon: icon,
          name: name,
          title: title
        }, name);
      }), /*#__PURE__*/jsx_runtime_.jsx(components_ListItem, {})]
    })
  });
};

/* harmony default export */ const components_Lists = (Lists);

/***/ }),

/***/ 1074:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "s": () => (/* binding */ findList),
  "r": () => (/* binding */ findReview)
});

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2167);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
;// CONCATENATED MODULE: ./lib/api/client.ts

const client = external_axios_default().create();
client.defaults.withCredentials = true;
client.defaults.baseURL =  true ? 'https://review.stlee.kr' : 0;
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

/***/ 2119:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var _components_Lists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4758);
/* harmony import */ var _lib_api_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1074);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9825);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store__WEBPACK_IMPORTED_MODULE_2__]);
_store__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const Home = ({
  lists
}) => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_components_Lists__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z, {
    lists: lists
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);
const getServerSideProps = _store__WEBPACK_IMPORTED_MODULE_2__/* ["default"].getServerSideProps */ .Z.getServerSideProps(store => async context => {
  // store.dispatch();
  // store.dispatch(END);
  // await store.sagaTasks.toPromise();
  const {
    data: lists
  } = await (0,_lib_api_index__WEBPACK_IMPORTED_MODULE_1__/* .findList */ .s)();
  return {
    props: {
      lists
    }
  };
});
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 777:
/***/ ((module) => {

module.exports = require("@emotion/styled/base");

/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 5648:
/***/ ((module) => {

module.exports = require("next-redux-wrapper");

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

/***/ }),

/***/ 6695:
/***/ ((module) => {

module.exports = require("redux");

/***/ }),

/***/ 6477:
/***/ ((module) => {

module.exports = require("redux-saga/effects");

/***/ }),

/***/ 5998:
/***/ ((module) => {

module.exports = import("redux-saga");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [383,664,825], () => (__webpack_exec__(2119)));
module.exports = __webpack_exports__;

})();