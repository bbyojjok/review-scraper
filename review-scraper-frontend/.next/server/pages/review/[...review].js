"use strict";
(() => {
var exports = {};
exports.id = 451;
exports.ids = [451];
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

/***/ 3595:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _review_),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@emotion/styled/base"
var base_ = __webpack_require__(777);
var base_default = /*#__PURE__*/__webpack_require__.n(base_);
// EXTERNAL MODULE: external "react-icons/md"
var md_ = __webpack_require__(4041);
;// CONCATENATED MODULE: external "react-icons/si"
const si_namespaceObject = require("react-icons/si");
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./components/ReviewTitle.tsx


function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }







const ReviewTitleBlick = /*#__PURE__*/base_default()("div",  true ? {
  target: "e3tklkn0"
} : 0)( true ? {
  name: "lk8mgt",
  styles: "display:flex;justify-content:space-between;height:50px;font-size:12px;line-height:1.4;&>div:nth-of-type(1){span{vertical-align:middle;}svg{vertical-align:middle;}.os{svg{margin-right:4px;}}}&>div:nth-of-type(2){text-align:right;}"
} : 0);

const ReviewTitle = ({
  os,
  score,
  version,
  length
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(ReviewTitleBlick, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
        className: "os",
        children: os === 'GooglePlay' ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
          children: [/*#__PURE__*/jsx_runtime_.jsx(si_namespaceObject.SiGoogleplay, {}), /*#__PURE__*/jsx_runtime_.jsx("span", {
            children: os
          })]
        }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
          children: [/*#__PURE__*/jsx_runtime_.jsx(si_namespaceObject.SiApple, {}), /*#__PURE__*/jsx_runtime_.jsx("span", {
            children: os
          })]
        })
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
        className: "score",
        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
          children: score
        }), /*#__PURE__*/jsx_runtime_.jsx(md_.MdStar, {})]
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
        children: ["\uBC84\uC804: ", version]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
        children: ["\uC870\uD68C\uB41C \uB9AC\uBDF0 \uC218: ", length]
      })]
    })]
  });
};

/* harmony default export */ const components_ReviewTitle = (ReviewTitle);
;// CONCATENATED MODULE: ./components/Reviews.tsx


function Reviews_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }






const ReviewsBlock = /*#__PURE__*/base_default()("div",  true ? {
  target: "e1f9pyf00"
} : 0)( true ? {
  name: "zythag",
  styles: "display:flex;flex-wrap:wrap;padding:0 20px;position:absolute;left:0;right:0;top:190px;bottom:0;.review-wrap{width:50%;height:100%;padding-bottom:20px;&:nth-of-type(1){padding-right:10px;}&:nth-of-type(2){padding-left:10px;}}.list-wrap{overflow-y:auto;height:calc(100% - 50px);}.review-list{li{margin-top:15px;padding:10px;font-size:12px;background-color:#333;border-radius:5px;&:first-child{margin-top:0;}&.center{padding-top:20px;padding-bottom:20px;text-align:center;}.info{display:flex;flex-wrap:wrap;padding-bottom:10px;.title{width:calc(100% - 100px);}.date{text-align:right;width:100px;}.rate{width:90px;}.author{text-align:right;width:calc(100% - 90px);}}.text{line-height:1.4;}.reply-text{margin-top:15px;padding:10px;background-color:#444;border-radius:5px;p{display:flex;justify-content:space-between;padding-bottom:5px;}}}}"
} : 0);

const Reviews = ({
  detail,
  reviews
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(ReviewsBlock, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "review-wrap",
      children: [/*#__PURE__*/jsx_runtime_.jsx(components_ReviewTitle, {
        os: "GooglePlay",
        score: detail.googlePlay.score.toFixed(1),
        version: detail.googlePlay.version,
        length: reviews.googlePlay.length
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "list-wrap",
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
          className: "review-list",
          children: [reviews.googlePlay.length === 0 && /*#__PURE__*/jsx_runtime_.jsx("li", {
            className: "center",
            children: "googlePlay \uB9AC\uBDF0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
          }), reviews.googlePlay.map(({
            _id,
            name,
            os,
            review
          }) => {
            const {
              userName,
              text,
              scoreText,
              date,
              replyText,
              replyDate
            } = review;
            return /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
              children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                className: "info",
                children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
                  className: "title"
                }), /*#__PURE__*/jsx_runtime_.jsx("p", {
                  className: "date",
                  children: date
                })]
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                className: "info",
                children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
                  className: "rate",
                  children: Array(parseInt(scoreText, 10)).fill(0).map((val, idx) => /*#__PURE__*/jsx_runtime_.jsx(md_.MdStar, {}, scoreText + idx))
                }), /*#__PURE__*/jsx_runtime_.jsx("p", {
                  className: "author",
                  children: userName
                })]
              }), /*#__PURE__*/jsx_runtime_.jsx("div", {
                className: "text",
                children: text
              }), replyText && /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                className: "reply-text",
                children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
                  children: [/*#__PURE__*/jsx_runtime_.jsx(md_.MdSubdirectoryArrowRight, {}), replyDate]
                }), replyText]
              })]
            }, _id);
          })]
        })
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "review-wrap",
      children: [/*#__PURE__*/jsx_runtime_.jsx(components_ReviewTitle, {
        os: "AppStore",
        score: detail.appStore.score.toFixed(1),
        version: detail.appStore.version,
        length: reviews.appStore.length
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "list-wrap",
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
          className: "review-list",
          children: [reviews.appStore.length === 0 && /*#__PURE__*/jsx_runtime_.jsx("li", {
            className: "center",
            children: "appStore \uB9AC\uBDF0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."
          }), reviews.appStore.map(({
            _id,
            name,
            os,
            review
          }) => {
            const {
              author,
              title,
              comment,
              rate,
              date
            } = review;
            return /*#__PURE__*/(0,jsx_runtime_.jsxs)("li", {
              children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                className: "info",
                children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
                  className: "title",
                  children: title
                }), /*#__PURE__*/jsx_runtime_.jsx("p", {
                  className: "date",
                  children: date
                })]
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
                className: "info",
                children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
                  className: "rate",
                  children: Array(parseInt(rate, 10)).fill(0).map((val, idx) => /*#__PURE__*/jsx_runtime_.jsx(md_.MdStar, {}, rate + idx))
                }), /*#__PURE__*/jsx_runtime_.jsx("p", {
                  className: "author",
                  children: author
                })]
              }), /*#__PURE__*/jsx_runtime_.jsx("div", {
                className: "text",
                children: comment
              })]
            }, _id);
          })]
        })
      })]
    })]
  });
};

/* harmony default export */ const components_Reviews = (Reviews);
;// CONCATENATED MODULE: ./components/Sort.tsx


function Sort_EMOTION_STRINGIFIED_CSS_ERROR_() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }




const SortBlock = /*#__PURE__*/base_default()("div",  true ? {
  target: "e1dmyr2i0"
} : 0)( true ? {
  name: "1updkzr",
  styles: "position:sticky;top:50px;display:flex;flex-wrap:wrap;justify-content:center;padding:20px;background-color:#222;.info{text-align:center;width:100px;img{vertical-align:top;width:100%;border-radius:10%;box-shadow:0 1px 1px rgba(0, 0, 0, 0.05),0 1px 1px rgba(0, 0, 0, 0.1);}span{display:inline-block;padding:10px 0 0;font-size:13px;}}.btns{padding-left:8px;}.score-box{display:flex;padding-bottom:4px;}.days-box{display:flex;padding-top:4px;}label{display:block;position:relative;cursor:pointer;input{position:absolute;z-index:-1;opacity:0;}span{display:flex;justify-content:center;align-items:center;width:50px;height:46px;font-size:12px;color:#666;border:1px solid #666;transition:all 0.2s;}input:focus-visible+span{outline:1px solid;}&:first-of-type span{border-radius:10% 0 0 10%;}&:last-child span{border-radius:0 10% 10% 0;}&:not(:last-child) span{border-right:none;}input:checked+span{color:#fff;background-color:#000;}}@media (hover: hover){label:hover{span{color:#fff;border:1px solid #fff;}&:not(:last-child) span{border-right:none;}}label:hover+label span{border-left:1px solid #fff;}}"
} : 0);

const scores = ['1', '2', '3', '4', '5'];
const days = ['7', '15', '30', '90', '180'];

const Sort = ({
  detail,
  selectedScore,
  selectedDay,
  changeScore,
  changeDays
}) => {
  const {
    icon,
    title
  } = detail.appStore;
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(SortBlock, {
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "info",
      children: /*#__PURE__*/jsx_runtime_.jsx("img", {
        src: icon,
        alt: title
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "btns",
      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "score-box",
        children: scores.map(score => {
          const findScore = selectedScore.find(selectScore => score === selectScore);
          return /*#__PURE__*/(0,jsx_runtime_.jsxs)("label", {
            title: `별점${score}`,
            children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
              type: "checkbox",
              name: "score",
              value: score,
              onChange: changeScore,
              checked: findScore === score
            }), /*#__PURE__*/jsx_runtime_.jsx("span", {
              children: `별점${score}`
            })]
          }, score);
        })
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "days-box",
        children: days.map(day => /*#__PURE__*/(0,jsx_runtime_.jsxs)("label", {
          title: `${day}일`,
          children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
            type: "radio",
            name: "days",
            value: day,
            onChange: changeDays,
            checked: day === selectedDay
          }), /*#__PURE__*/jsx_runtime_.jsx("span", {
            children: `${day}일`
          })]
        }, day))
      })]
    })]
  });
};

/* harmony default export */ const components_Sort = (Sort);
// EXTERNAL MODULE: ./lib/api/index.ts + 2 modules
var api = __webpack_require__(5533);
;// CONCATENATED MODULE: ./pages/review/[...review].tsx









const Review = ({
  detail,
  reviews,
  name: selectedName,
  day: selectedDay,
  score: selectedScore
}) => {
  const router = (0,router_.useRouter)();
  const [name, day, score] = router.query.review;
  (0,external_react_.useEffect)(() => {
    if (!day || !score) {
      router.replace(`/review/${name}/${selectedDay}/${selectedScore.join('')}`);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  const changeScore = e => {
    const val = e.target.value;

    if (selectedScore.join('') === val) {
      return;
    }

    let url = `/review/${name}/${day}/`;
    const findScore = selectedScore.find(score => score === val);

    if (findScore) {
      url += selectedScore.filter(score => score !== findScore).sort().join('');
    } else {
      url += selectedScore.concat(val).sort().join('');
    }

    router.push(url);
  };

  const changeDays = e => {
    router.push(`/review/${name}/${e.target.value}/${score}`);
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(components_Sort, {
      detail: detail,
      selectedScore: selectedScore,
      selectedDay: selectedDay,
      changeScore: changeScore,
      changeDays: changeDays
    }), /*#__PURE__*/jsx_runtime_.jsx(components_Reviews, {
      detail: detail,
      reviews: reviews
    })]
  });
};

/* harmony default export */ const _review_ = (Review);
const getServerSideProps = async ({
  params
}) => {
  const [name, day = '7', score = '12345'] = params?.review;
  const url = `/${name}/${day}/${score}`;
  const {
    data: googlePlay
  } = await (0,api/* findReview */.r)(`${url}/googlePlay`);
  const {
    data: appStore
  } = await (0,api/* findReview */.r)(`${url}/appStore`);
  const {
    data: detail
  } = await (0,api/* findList */.s)(name);
  return {
    props: {
      reviews: {
        googlePlay,
        appStore
      },
      detail,
      name,
      day,
      score: score.split('')
    }
  };
};

/***/ }),

/***/ 777:
/***/ ((module) => {

module.exports = require("@emotion/styled/base");

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(3595));
module.exports = __webpack_exports__;

})();