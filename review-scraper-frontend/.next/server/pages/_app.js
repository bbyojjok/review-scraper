"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 2929:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

;// CONCATENATED MODULE: external "@emotion/react"
const react_namespaceObject = require("@emotion/react");
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./styles/GlobalStyle.tsx
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }



const globals =  true ? {
  name: "8uigpu",
  styles: "html,body{padding:0;margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;background:#222;color:#eee;}a{color:inherit;text-decoration:none;}*{box-sizing:border-box;}/*\n  @media (prefers-color-scheme: dark) {\n    html {\n      color-scheme: dark;\n    }\n    body {\n      color: white;\n      background: black;\n    }\n  }\n  */body,h1,h2,h3,h4,h5,h6,ul,ol,li,dl,dt,dd,p,form,fieldset,input,table,tr,th,td{margin:0;padding:0;}h1,h2,h3,h4,h5,h6{font-weight:normal;font-size:1rem;}ol,ul{list-style:none;}fieldset,img{border:none;}table{border-collapse:collapse;border-spacing:0;}"
} : 0;

const GlobalStyle = () => {
  return /*#__PURE__*/jsx_runtime_.jsx(react_namespaceObject.Global, {
    styles: globals
  });
};

/* harmony default export */ const styles_GlobalStyle = (GlobalStyle);
// EXTERNAL MODULE: external "@emotion/styled/base"
var base_ = __webpack_require__(777);
var base_default = /*#__PURE__*/__webpack_require__.n(base_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react-icons/md"
var md_ = __webpack_require__(4041);
;// CONCATENATED MODULE: ./components/Header.tsx


function Header_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }







const HeaderBlock = /*#__PURE__*/base_default()("header",  true ? {
  target: "eqgbuan0"
} : 0)( true ? {
  name: "35cc2m",
  styles: "position:sticky;z-index:10;top:0;display:flex;justify-content:center;align-items:center;padding:0 50px;height:50px;background-color:#000;h1 a{font-size:16px;font-weight:600;color:#fff;}.btn-back{position:absolute;left:0;top:50%;transform:translateY(-50%);padding:15px;border:0;background:0;cursor:pointer;.icon{vertical-align:middle;color:#fff;width:1.2rem;height:1.2rem;}}.btn-admin{position:absolute;right:10px;top:50%;transform:translateY(-50%);color:#888;transition:color 0.2s;&:hover{color:#fff;}}"
} : 0);

const Header = () => {
  const router = (0,router_.useRouter)();
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(HeaderBlock, {
    children: [router.pathname !== '/' && /*#__PURE__*/jsx_runtime_.jsx("button", {
      className: "btn-back",
      onClick: () => router.push('/'),
      children: /*#__PURE__*/jsx_runtime_.jsx(md_.MdOutlineArrowBackIos, {
        className: "icon"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("h1", {
      children: /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
        href: "/",
        children: /*#__PURE__*/jsx_runtime_.jsx("a", {
          children: "REVIEW-SCRAPER"
        })
      })
    }), /*#__PURE__*/jsx_runtime_.jsx((link_default()), {
      href: "/admin",
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        className: "btn-admin",
        children: "Admin"
      })
    })]
  });
};

/* harmony default export */ const components_Header = (Header);
// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(5184);
;// CONCATENATED MODULE: external "next-redux-wrapper"
const external_next_redux_wrapper_namespaceObject = require("next-redux-wrapper");
;// CONCATENATED MODULE: external "redux"
const external_redux_namespaceObject = require("redux");
// EXTERNAL MODULE: ./store/modules/user.ts
var user = __webpack_require__(4287);
;// CONCATENATED MODULE: ./store/modules/index.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



 // 루트 리듀서

const rootReducer = (state, action) => {
  switch (action.type) {
    case external_next_redux_wrapper_namespaceObject.HYDRATE:
      return _objectSpread(_objectSpread({}, state), action.payload);

    default:
      return (0,external_redux_namespaceObject.combineReducers)({
        user: user/* default */.ZP
      })(state, action);
  }
};

/* harmony default export */ const modules = (rootReducer); // 루트 리듀서의 반환값을 유추해줍니다.
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내기
;// CONCATENATED MODULE: ./store/index.ts



const isDevelopment = false;

const store = () => {
  const store = (0,toolkit_.configureStore)({
    reducer: modules,
    devTools: isDevelopment
  });
  return store;
};

const wrapper = (0,external_next_redux_wrapper_namespaceObject.createWrapper)(store, {
  debug: isDevelopment
});
/* harmony default export */ const store_0 = (wrapper);
;// CONCATENATED MODULE: ./pages/_app.tsx
function _app_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _app_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _app_ownKeys(Object(source), !0).forEach(function (key) { _app_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : _app_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _app_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








function MyApp({
  Component,
  pageProps
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(styles_GlobalStyle, {}), /*#__PURE__*/jsx_runtime_.jsx(components_Header, {}), /*#__PURE__*/jsx_runtime_.jsx(Component, _app_objectSpread({}, pageProps))]
  });
}

/* harmony default export */ const _app = (store_0.withRedux(MyApp));

/***/ }),

/***/ 4287:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cd": () => (/* binding */ logoutAction),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "y": () => (/* binding */ loginAction)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
 // 초기 상태 타입

// 초기 상태
const initialState = {
  isLoggedin: false,
  userData: null
}; // 리듀서 슬라이스

const userSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
  name: 'user',
  initialState,
  reducers: {
    loginAction(state, action) {
      state.isLoggedin = true;
      state.userData = action.payload;
    },

    logoutAction(state) {
      state.isLoggedin = false;
      state.userData = null;
    }

  }
}); // 리듀서, 액션 리턴

const {
  reducer,
  actions
} = userSlice;
const {
  loginAction,
  logoutAction
} = actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reducer);

/***/ }),

/***/ 777:
/***/ ((module) => {

module.exports = require("@emotion/styled/base");

/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

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

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

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
var __webpack_exports__ = __webpack_require__.X(0, [383,664], () => (__webpack_exec__(2929)));
module.exports = __webpack_exports__;

})();