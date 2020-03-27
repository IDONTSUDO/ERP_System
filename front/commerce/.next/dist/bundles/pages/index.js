module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Header.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_badge__ = __webpack_require__("antd/lib/badge");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_badge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_badge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_jsx_style__ = __webpack_require__("styled-jsx/style");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_jsx_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_styled_jsx_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_next_head__ = __webpack_require__("next/head");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_next_head___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_next_head__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helper_Icon__ = __webpack_require__("./helper/Icon.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper_img_logo_png__ = __webpack_require__("./helper/img/logo.png");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helper_img_logo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__helper_img_logo_png__);

var _jsxFileName = "C:\\Users\\idontsudo\\Desktop\\job\\ERP_System\\front\\commerce\\components\\Header.js";






/* harmony default export */ __webpack_exports__["a"] = (function () {
  return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
    "ex",
    {
      className: "jsx-577173962",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 6
      }
    },
    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
      "header",
      {
        className: "jsx-577173962",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      },
      __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        "div",
        {
          className: "jsx-577173962" + " " + "logo",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 8
          }
        },
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_5__helper_img_logo_png__["default"], className: "jsx-577173962",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 8
          }
        })
      ),
      __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        "div",
        {
          className: "jsx-577173962" + " " + "header_bar",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 10
          }
        },
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          "div",
          {
            className: "jsx-577173962",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 11
            }
          },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            "div",
            {
              className: "jsx-577173962",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 12
              }
            },
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__helper_Icon__["a" /* default */], { className: "icon", name: "price", width: 35, __source: {
                fileName: _jsxFileName,
                lineNumber: 13
              }
            }),
            " \u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435"
          ),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            "div",
            {
              className: "jsx-577173962",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 15
              }
            },
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__helper_Icon__["a" /* default */], { className: "icon", name: "find", width: 35, __source: {
                fileName: _jsxFileName,
                lineNumber: 16
              }
            }),
            "\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435"
          )
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          "div",
          {
            className: "jsx-577173962",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 19
            }
          },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            "div",
            {
              className: "jsx-577173962",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 20
              }
            },
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__helper_Icon__["a" /* default */], { className: "icon", name: "find", width: 35, __source: {
                fileName: _jsxFileName,
                lineNumber: 22
              }
            }),
            "\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435"
          ),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            "div",
            {
              className: "jsx-577173962",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 24
              }
            },
            "2685 \u20BD ",
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_antd_lib_badge___default.a, { count: 25, __source: {
                fileName: _jsxFileName,
                lineNumber: 25
              }
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          "div",
          {
            className: "jsx-577173962",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 28
            }
          },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            "div",
            {
              className: "jsx-577173962",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 29
              }
            },
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__helper_Icon__["a" /* default */], { className: "icon", name: "price", width: 35, __source: {
                fileName: _jsxFileName,
                lineNumber: 30
              }
            }),
            " \u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435"
          ),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            "div",
            {
              className: "jsx-577173962",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 32
              }
            },
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__helper_Icon__["a" /* default */], { className: "icon", name: "find", width: 35, __source: {
                fileName: _jsxFileName,
                lineNumber: 33
              }
            }),
            "\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435"
          )
        )
      )
    ),
    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_styled_jsx_style___default.a, {
      styleId: "577173962",
      css: "header.jsx-577173962{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;background-color:red;width:50%;margin:auto;border-radius:5px;height:100%;}.logo.jsx-577173962{-webkit-box-pack:inherit;-webkit-justify-content:inherit;-ms-flex-pack:inherit;justify-content:inherit;margin-right:auto;}.header_bar.jsx-577173962{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin:auto;}.header_bar.jsx-577173962>div.jsx-577173962{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}.svg-icon.jsx-577173962{height:2vh;}div.jsx-577173962>div.jsx-577173962{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-content:center;-ms-flex-line-pack:center;align-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-top:auto;margin-bottom:auto;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXEhlYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxQ2dCLEFBR3NCLEFBU1csQUFJWCxBQUlBLEFBSUYsQUFJRSxXQUhmLCtEQXJCeUIsQUFhWCxBQUlVLEFBUUMsWUFYekIsaUJBTGdCLGtCQUNoQiwrQkFRQSxxQkFqQnVCLEFBeUJBLHFCQXhCWCxVQUNFLFlBQ00sa0JBQ04sWUFDZCxHQXFCcUIsNkZBQ0gsZ0JBQ0csbUJBQ3JCIiwiZmlsZSI6ImNvbXBvbmVudHNcXEhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9pZG9udHN1ZG8vRGVza3RvcC9qb2IvRVJQX1N5c3RlbS9mcm9udC9jb21tZXJjZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIZWFkIGZyb20gXCJuZXh0L2hlYWRcIjtcclxuaW1wb3J0IEljb24gZnJvbSBcIi4uL2hlbHBlci9JY29uXCI7XHJcbmltcG9ydCB7IEJhZGdlIH0gZnJvbSBcImFudGRcIjtcclxuaW1wb3J0IExvZ28gZnJvbSBcIi4uL2hlbHBlci9pbWcvbG9nby5wbmdcIlxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiAoXHJcbiAgPGV4PlxyXG4gICAgPGhlYWRlcj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dvXCI+PGltZyBzcmM9e0xvZ299Lz48L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyX2JhclwiPlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8SWNvbiBjbGFzc05hbWU9XCJpY29uXCIgbmFtZT1cInByaWNlXCIgd2lkdGg9ezM1fSAvPiDQkiDQutC+0YDQt9C40L3QtVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8SWNvbiBjbGFzc05hbWU9XCJpY29uXCIgbmFtZT1cImZpbmRcIiB3aWR0aD17MzV9IC8+0JIg0LrQvtGA0LfQuNC90LVcclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICB7LyogPEljb24gY2xhc3NOYW1lPVwiaWNvblwiICBuYW1lPVwicHJpY2VcIiAgLz4g0JIg0LrQvtGA0LfQuNC90LUgKi99XHJcbiAgICAgICAgICAgIDxJY29uIGNsYXNzTmFtZT1cImljb25cIiBuYW1lPVwiZmluZFwiIHdpZHRoPXszNX0gLz7QkiDQutC+0YDQt9C40L3QtVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAyNjg1IOKCvSA8QmFkZ2UgY291bnQ9ezI1fSAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxJY29uIGNsYXNzTmFtZT1cImljb25cIiBuYW1lPVwicHJpY2VcIiB3aWR0aD17MzV9IC8+INCSINC60L7RgNC30LjQvdC1XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxJY29uIGNsYXNzTmFtZT1cImljb25cIiBuYW1lPVwiZmluZFwiIHdpZHRoPXszNX0gLz7QkiDQutC+0YDQt9C40L3QtVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9oZWFkZXI+XHJcbiAgICA8c3R5bGUganN4PntgXHJcbiAgICAgIGhlYWRlciB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XHJcbiAgICAgICAgd2lkdGg6IDUwJTtcclxuICAgICAgICBtYXJnaW46IGF1dG87XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgfVxyXG4gICAgICAubG9nbyB7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBpbmhlcml0O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xyXG4gICAgICB9XHJcbiAgICAgIC5oZWFkZXJfYmFyIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIG1hcmdpbjogYXV0bztcclxuICAgICAgfVxyXG4gICAgICAuaGVhZGVyX2JhciA+IGRpdiB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICB9XHJcbiAgICAgIC5zdmctaWNvbiB7XHJcbiAgICAgICAgaGVpZ2h0OiAydmg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRpdiA+IGRpdiB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBtYXJnaW4tdG9wOiBhdXRvO1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IGF1dG87XHJcbiAgICAgIH1cclxuICAgIGB9PC9zdHlsZT5cclxuICA8L2V4PlxyXG4pO1xyXG4iXX0= */\n/*@ sourceURL=components\\Header.js */"
    })
  );
});

/***/ }),

/***/ "./components/Layout.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_locale_provider__ = __webpack_require__("antd/lib/locale-provider");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_locale_provider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_locale_provider__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_jsx_style__ = __webpack_require__("styled-jsx/style");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_jsx_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_styled_jsx_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_next_head__ = __webpack_require__("next/head");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_next_head___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_next_head__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_locale_provider_en_US__ = __webpack_require__("antd/lib/locale-provider/en_US");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_antd_lib_locale_provider_en_US___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_antd_lib_locale_provider_en_US__);

var _jsxFileName = 'C:\\Users\\idontsudo\\Desktop\\job\\ERP_System\\front\\commerce\\components\\Layout.js';






/* harmony default export */ __webpack_exports__["a"] = (function (_ref) {
  var title = _ref.title,
      children = _ref.children;
  return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
    'div',
    {
      className: 'jsx-3261881544',
      __source: {
        fileName: _jsxFileName,
        lineNumber: 6
      }
    },
    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_3_next_head___default.a,
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      },
      __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'title',
        {
          className: 'jsx-3261881544',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 8
          }
        },
        title
      ),
      __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1', className: 'jsx-3261881544',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      }),
      __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('meta', { charSet: 'utf-8', className: 'jsx-3261881544',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      }),
      __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('link', { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/antd/3.2.0/antd.min.css', className: 'jsx-3261881544',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      })
    ),
    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_styled_jsx_style___default.a, {
      styleId: '3261881544',
      css: '\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXExheW91dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZdUIiLCJmaWxlIjoiY29tcG9uZW50c1xcTGF5b3V0LmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2lkb250c3Vkby9EZXNrdG9wL2pvYi9FUlBfU3lzdGVtL2Zyb250L2NvbW1lcmNlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xyXG5pbXBvcnQgeyBMb2NhbGVQcm92aWRlciB9IGZyb20gJ2FudGQnXHJcbmltcG9ydCBlblVTIGZyb20gJ2FudGQvbGliL2xvY2FsZS1wcm92aWRlci9lbl9VUydcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICh7IHRpdGxlLCBjaGlsZHJlbiB9KSA9PlxyXG4gIDxkaXY+XHJcbiAgICA8SGVhZD5cclxuICAgICAgPHRpdGxlPnsgdGl0bGUgfTwvdGl0bGU+XHJcbiAgICAgIDxtZXRhIG5hbWU9J3ZpZXdwb3J0JyBjb250ZW50PSd3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MScgLz5cclxuICAgICAgPG1ldGEgY2hhclNldD0ndXRmLTgnIC8+XHJcbiAgICAgIDxsaW5rIHJlbD0nc3R5bGVzaGVldCcgaHJlZj0nLy9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvYW50ZC8zLjIuMC9hbnRkLm1pbi5jc3MnIC8+XHJcbiAgICA8L0hlYWQ+XHJcbiAgICA8c3R5bGUganN4IGdsb2JhbD57YFxyXG4gICAgICBib2R5IHtcclxuICAgICAgfVxyXG4gICAgYH08L3N0eWxlPlxyXG4gICAgPExvY2FsZVByb3ZpZGVyIGxvY2FsZT17ZW5VU30+XHJcbiAgICAgIDxkaXY+e2NoaWxkcmVufTwvZGl2PlxyXG4gICAgPC9Mb2NhbGVQcm92aWRlcj5cclxuICA8L2Rpdj4iXX0= */\n/*@ sourceURL=components\\Layout.js */'
    }),
    __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_0_antd_lib_locale_provider___default.a,
      { locale: __WEBPACK_IMPORTED_MODULE_4_antd_lib_locale_provider_en_US___default.a, __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      },
      __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'div',
        {
          className: 'jsx-3261881544',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 18
          }
        },
        children
      )
    )
  );
});

/***/ }),

/***/ "./helper/Icon.jsx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_Priced_js__ = __webpack_require__("./helper/icon/Priced.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icon_Find_js__ = __webpack_require__("./helper/icon/Find.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__icon_Catalog_js__ = __webpack_require__("./helper/icon/Catalog.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__icon_Basket_js__ = __webpack_require__("./helper/icon/Basket.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__icon_Order_js__ = __webpack_require__("./helper/icon/Order.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__icon_Card_js__ = __webpack_require__("./helper/icon/Card.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__icon_Mail_js__ = __webpack_require__("./helper/icon/Mail.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__icon_Phone_js__ = __webpack_require__("./helper/icon/Phone.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__icon_Paper_js__ = __webpack_require__("./helper/icon/Paper.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__icon_Vk_js__ = __webpack_require__("./helper/icon/Vk.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = "C:\\Users\\idontsudo\\Desktop\\job\\ERP_System\\front\\commerce\\helper\\Icon.jsx";













/* 
@Desctiption: Icon component
@props: {width} ширина
@props: {fill} цвет
@props: {name} имя иконки
*/

var Icon = function Icon(props) {
  switch (props.name) {
    case "price":
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__icon_Priced_js__["a" /* default */], _extends({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }));
    case "find":
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__icon_Find_js__["a" /* default */], _extends({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      }));
    case "catalog":
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__icon_Catalog_js__["a" /* default */], _extends({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }));
    case "basket":
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__icon_Basket_js__["a" /* default */], _extends({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }));
    case "order":
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__icon_Order_js__["a" /* default */], _extends({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }));
    case "mail":
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__icon_Mail_js__["a" /* default */], _extends({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      }));
    case "card":
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__icon_Card_js__["a" /* default */], _extends({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        }
      }));
    case "phone":
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__icon_Phone_js__["a" /* default */], _extends({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        }
      }));
    case "paper":
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__icon_Paper_js__["a" /* default */], _extends({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        }
      }));
    case "vk":
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__icon_Vk_js__["a" /* default */], _extends({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        }
      }));
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Icon);

/***/ }),

/***/ "./helper/icon/Basket.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "C:\\Users\\idontsudo\\Desktop\\job\\ERP_System\\front\\commerce\\helper\\icon\\Basket.js";


var SVG = function SVG(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? "#000" : _ref$fill,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? "100px" : _ref$width,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      _ref$viewBox = _ref.viewBox,
      viewBox = _ref$viewBox === undefined ? "0 0 512 512" : _ref$viewBox;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "svg",
    {
      width: width,
      style: style,
      height: width,
      viewBox: viewBox,
      xmlns: "http://www.w3.org/2000/svg",
      className: "svg-icon " + (className || ""),
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "g",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "g",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 20
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
          d: "M501.333,213.331h-90.388L296.792,47.289c-3.333-4.854-9.969-6.073-14.833-2.75c-4.854,3.344-6.083,9.979-2.75,14.833\r l105.846,153.958H126.945L232.792,59.373c3.333-4.854,2.104-11.49-2.75-14.833c-4.833-3.323-11.479-2.104-14.833,2.75\r L101.055,213.331H10.667C4.771,213.331,0,218.102,0,223.998c0,5.896,4.771,10.667,10.667,10.667h13.533l65.207,204.938\r c5.667,17.781,22,29.729,40.656,29.729h251.875c18.656,0,34.99-11.948,40.656-29.74l65.206-204.927h13.534\r c5.896,0,10.667-4.771,10.667-10.667C512,218.102,507.229,213.331,501.333,213.331z M402.26,433.123\r c-2.833,8.896-11,14.875-20.323,14.875H130.063c-9.323,0-17.49-5.979-20.323-14.865L46.589,234.664h418.823L402.26,433.123z",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          }
        })
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 44
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      }
    })
  );
};
/* harmony default export */ __webpack_exports__["a"] = (SVG);

/***/ }),

/***/ "./helper/icon/Card.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "C:\\Users\\idontsudo\\Desktop\\job\\ERP_System\\front\\commerce\\helper\\icon\\Card.js";


var SVG = function SVG(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? "#000" : _ref$fill,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? "100px" : _ref$width,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      _ref$viewBox = _ref.viewBox,
      viewBox = _ref$viewBox === undefined ? "0 0 512 512" : _ref$viewBox;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "svg",
    {
      width: width,
      style: style,
      height: width,
      viewBox: viewBox,
      xmlns: "http://www.w3.org/2000/svg",
      className: "svg-icon " + (className || ""),
      xmlnsXlink: "http://www.w3.org/1999/xlink",

      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "g",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m472 452c0 11.046-8.954 20-20 20h-20v20c0 11.046-8.954 20-20 20s-20-8.954-20-20v-20h-20c-11.046 0-20-8.954-20-20s8.954-20 20-20h20v-20c0-11.046 8.954-20 20-20s20 8.954 20 20v20h20c11.046 0 20 8.954 20 20zm0-312v192c0 11.046-8.954 20-20 20s-20-8.954-20-20v-172h-40v60c0 11.046-8.954 20-20 20s-20-8.954-20-20v-60h-192v60c0 11.046-8.954 20-20 20s-20-8.954-20-20v-60h-40v312h212c11.046 0 20 8.954 20 20s-8.954 20-20 20h-232c-11.046 0-20-8.954-20-20v-352c0-11.046 8.954-20 20-20h60.946c7.945-67.477 65.477-120 135.054-120s127.109 52.523 135.054 120h60.946c11.046 0 20 8.954 20 20zm-121.341-20c-7.64-45.345-47.176-80-94.659-80s-87.019 34.655-94.659 80z", __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      })
    )
  );
};
/* harmony default export */ __webpack_exports__["a"] = (SVG);

/***/ }),

/***/ "./helper/icon/Catalog.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "C:\\Users\\idontsudo\\Desktop\\job\\ERP_System\\front\\commerce\\helper\\icon\\Catalog.js";


var SVG = function SVG(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? "#000" : _ref$fill,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? "100px" : _ref$width,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      _ref$viewBox = _ref.viewBox,
      viewBox = _ref$viewBox === undefined ? "0 0 290 290" : _ref$viewBox;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "svg",
    {
      width: width,
      style: style,
      height: width,
      viewBox: viewBox,
      xmlns: "http://www.w3.org/2000/svg",
      className: "svg-icon " + (className || ""),
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "g",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
        id: "rect22499",
        d: "M94.902,0.002c-0.667,0.013-1.324,0.159-1.934,0.43l-90,40C1.164,41.234,0,43.024,0,45v240\r c0.001,2.762,2.24,5,5.002,4.999c0.699,0,1.391-0.147,2.03-0.431l88.07-39.143l98.041,39.217c1.253,0.501,2.656,0.474,3.889-0.074\r l90-40c1.805-0.803,2.968-2.593,2.969-4.568V5c-0.001-2.762-2.24-5-5.002-4.999c-0.699,0-1.391,0.147-2.03,0.431l-88.07,39.143\r L96.857,0.357C96.236,0.109,95.571-0.012,94.902,0.002z M97.5,11.384l95,38v109.23l-95-38V11.384z M92.5,11.582V120.64L10,157.306\r V48.248L92.5,11.582z M280,12.693v109.059l-82.5,36.666V49.359L280,12.693z M104.951,22.5c-1.362,0.027-2.451,1.138-2.451,2.5v45\r c-0.02,1.381,1.084,2.516,2.465,2.535c1.381,0.02,2.516-1.084,2.535-2.465c0-0.024,0-0.047,0-0.071V28.691l21.572,8.629\r c1.265,0.554,2.739-0.021,3.294-1.286c0.554-1.265-0.021-2.739-1.286-3.294c-0.05-0.022-0.101-0.042-0.152-0.061l-25-10\r C105.617,22.555,105.285,22.494,104.951,22.5z M50.012,37.484c-0.393,0.003-0.78,0.099-1.129,0.279l-30,15\r C18.035,53.187,17.5,54.052,17.5,55v40c-0.02,1.381,1.084,2.516,2.465,2.535c1.381,0.02,2.516-1.084,2.535-2.465\r c0-0.024,0-0.047,0-0.071V56.545l28.617-14.309c1.244-0.6,1.765-2.095,1.165-3.338C51.862,38.027,50.978,37.477,50.012,37.484z\r M235.012,37.484c-0.393,0.003-0.78,0.099-1.129,0.279l-30,15c-0.847,0.423-1.383,1.289-1.383,2.236v40\r c-0.02,1.381,1.084,2.516,2.465,2.535c1.381,0.02,2.516-1.084,2.535-2.465c0-0.024,0-0.047,0-0.071V56.545l28.617-14.309\r c1.244-0.6,1.765-2.095,1.165-3.338C236.862,38.027,235.978,37.477,235.012,37.484z M97.5,131.384l95,38v109.23l-95-38V131.384z\r M92.5,131.582V240.64L10,277.306V168.248L92.5,131.582z M280,132.693V241.75l-82.5,36.668V169.359L280,132.693z M84.963,192.465\r c-1.38,0.02-2.482,1.155-2.463,2.535v38.455l-28.617,14.309c-1.246,0.595-1.774,2.088-1.179,3.334\r c0.595,1.246,2.088,1.774,3.334,1.179c0.027-0.013,0.053-0.026,0.08-0.04l30-15c0.847-0.423,1.383-1.289,1.383-2.236v-40\r c0.019-1.381-1.084-2.516-2.465-2.535C85.011,192.464,84.987,192.464,84.963,192.465z M269.963,192.465\r c-1.38,0.02-2.482,1.155-2.463,2.535v38.455l-28.617,14.309c-1.246,0.595-1.774,2.088-1.179,3.334\r c0.595,1.246,2.088,1.774,3.334,1.179c0.027-0.013,0.053-0.026,0.08-0.04l30-15c0.847-0.423,1.383-1.289,1.383-2.236v-40\r c0.019-1.381-1.084-2.516-2.465-2.535C270.011,192.464,269.987,192.464,269.963,192.465z M184.963,217.465\r c-1.38,0.02-2.482,1.155-2.463,2.535v41.307l-21.572-8.629c-1.272-0.536-2.739,0.06-3.275,1.333s0.06,2.739,1.333,3.275\r c0.029,0.012,0.058,0.024,0.087,0.035l25,10c1.282,0.512,2.737-0.112,3.249-1.394c0.118-0.295,0.178-0.609,0.178-0.926v-45\r c0.019-1.381-1.084-2.516-2.465-2.535C185.011,217.464,184.987,217.464,184.963,217.465z",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61
      }
    })
  );
};
/* harmony default export */ __webpack_exports__["a"] = (SVG);

/***/ }),

/***/ "./helper/icon/Find.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "C:\\Users\\idontsudo\\Desktop\\job\\ERP_System\\front\\commerce\\helper\\icon\\Find.js";


var SVG = function SVG(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? "#000" : _ref$fill,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? "100px" : _ref$width,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      _ref$viewBox = _ref.viewBox,
      viewBox = _ref$viewBox === undefined ? "0 0 512 512" : _ref$viewBox;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "svg",
    {
      width: width,
      style: style,
      height: width,
      viewBox: viewBox,
      xmlns: "http://www.w3.org/2000/svg",
      className: "svg-icon " + (className || ""),
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "g",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "g",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 20
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
          d: "M509.007,448.319L353.309,292.62c-0.05-0.051-0.101-0.102-0.152-0.152l-32.153-32.154c-3.99-3.99-10.459-3.99-14.448,0\r l-15.896,15.896l-19.103-19.103c53.349-60.825,51.03-153.761-6.979-211.78l-0.001-0.001\r C204.129-15.11,105.775-15.108,45.327,45.328c-60.436,60.447-60.436,158.801,0.001,219.249\r c30.224,30.217,69.923,45.327,109.624,45.327c36.511,0,73.016-12.79,102.156-38.348l19.102,19.102l-15.896,15.896\r c-3.99,3.99-3.99,10.457-0.001,14.447l32.223,32.233c0.093,0.093,0.188,0.184,0.283,0.274l155.5,155.5\r c1.916,1.916,4.515,2.992,7.224,2.992c2.709,0,5.309-1.077,7.224-2.992l46.24-46.24c1.916-1.916,2.992-4.515,2.992-7.224\r S510.923,450.234,509.007,448.319z M250.133,250.123c-0.001,0.001-0.003,0.002-0.004,0.004c-0.001,0.001-0.002,0.003-0.004,0.004\r c-52.481,52.467-137.87,52.465-190.349-0.003c-52.47-52.48-52.47-137.873-0.001-190.353c26.24-26.236,60.709-39.354,95.177-39.354\r c34.468,0,68.936,13.118,95.175,39.352C302.598,112.253,302.599,197.643,250.133,250.123z M281.986,313.778l31.793-31.793\r l17.785,17.785l-31.796,31.796L281.986,313.778z M455.543,487.335L314.22,346.011l31.792-31.792l141.323,141.323L455.543,487.335z\r ",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          }
        })
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "g",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "g",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 37
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
          d: "M232.364,77.53c-42.683-42.683-112.14-42.684-154.835,0c-42.683,42.693-42.682,112.15,0,154.833\r c20.681,20.682,48.176,32.072,77.421,32.072s56.738-11.389,77.412-32.07c20.682-20.677,32.073-48.17,32.073-77.415\r C264.435,125.705,253.046,98.21,232.364,77.53z M217.915,217.915c-16.817,16.823-39.178,26.087-62.965,26.087\r c-23.786,0-46.15-9.264-62.973-26.087c-34.717-34.716-34.716-91.211,0-125.936c17.365-17.361,40.165-26.038,62.973-26.038\r c22.801,0,45.609,8.681,62.965,26.037c16.823,16.822,26.087,39.186,26.087,62.972\r C244.002,178.735,234.739,201.095,217.915,217.915z",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 38
          }
        })
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "g",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "g",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 49
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
          d: "M219.78,146.023c-0.766-5.591-5.92-9.504-11.51-8.734c-5.591,0.766-9.5,5.919-8.734,11.51\r c1.932,14.091-2.721,27.931-12.764,37.972c-3.991,3.99-3.991,10.459-0.002,14.449c1.995,1.995,4.61,2.993,7.225,2.993\r c2.614,0,5.229-0.997,7.223-2.991C215.823,186.621,222.588,166.503,219.78,146.023z",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 50
          }
        })
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "g",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "g",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 58
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M198.423,109.538c-13.148,0-13.169,20.433,0,20.433C211.571,129.972,211.592,109.538,198.423,109.538z", __source: {
            fileName: _jsxFileName,
            lineNumber: 59
          }
        })
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 63
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 65
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 68
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 69
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 70
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 71
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 74
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 75
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 76
      }
    })
  );
};
/* harmony default export */ __webpack_exports__["a"] = (SVG);

/***/ }),

/***/ "./helper/icon/Mail.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "C:\\Users\\idontsudo\\Desktop\\job\\ERP_System\\front\\commerce\\helper\\icon\\Mail.js";


var SVG = function SVG(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? "#000" : _ref$fill,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? "100px" : _ref$width,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      _ref$viewBox = _ref.viewBox,
      viewBox = _ref$viewBox === undefined ? "0 0 512 512" : _ref$viewBox;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "svg",
    {
      width: width,
      style: style,
      height: width,
      viewBox: viewBox,
      xmlns: "http://www.w3.org/2000/svg",
      className: "svg-icon " + (className || ""),
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "g",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "g",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 20
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M469.333,64H42.667C19.135,64,0,83.135,0,106.667v298.667C0,428.865,19.135,448,42.667,448h426.667\r C492.865,448,512,428.865,512,405.333V106.667C512,83.135,492.865,64,469.333,64z M42.667,85.333h426.667\r c1.572,0,2.957,0.573,4.432,0.897c-36.939,33.807-159.423,145.859-202.286,184.478c-3.354,3.021-8.76,6.625-15.479,6.625\r s-12.125-3.604-15.49-6.635C197.652,232.085,75.161,120.027,38.228,86.232C39.706,85.908,41.094,85.333,42.667,85.333z\r M21.333,405.333V106.667c0-2.09,0.63-3.986,1.194-5.896c28.272,25.876,113.736,104.06,169.152,154.453\r C136.443,302.671,50.957,383.719,22.46,410.893C21.957,409.079,21.333,407.305,21.333,405.333z M469.333,426.667H42.667\r c-1.704,0-3.219-0.594-4.81-0.974c29.447-28.072,115.477-109.586,169.742-156.009c7.074,6.417,13.536,12.268,18.63,16.858\r c8.792,7.938,19.083,12.125,29.771,12.125s20.979-4.188,29.76-12.115c5.096-4.592,11.563-10.448,18.641-16.868\r c54.268,46.418,140.286,127.926,169.742,156.009C472.552,426.073,471.039,426.667,469.333,426.667z M490.667,405.333\r c0,1.971-0.624,3.746-1.126,5.56c-28.508-27.188-113.984-108.227-169.219-155.668c55.418-50.393,140.869-128.57,169.151-154.456\r c0.564,1.91,1.194,3.807,1.194,5.897V405.333z", __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          }
        })
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 44
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62
      }
    })
  );
};
/* harmony default export */ __webpack_exports__["a"] = (SVG);

/***/ }),

/***/ "./helper/icon/Order.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "C:\\Users\\idontsudo\\Desktop\\job\\ERP_System\\front\\commerce\\helper\\icon\\Order.js";


var SVG = function SVG(_ref) {
	var _ref$style = _ref.style,
	    style = _ref$style === undefined ? {} : _ref$style,
	    _ref$fill = _ref.fill,
	    fill = _ref$fill === undefined ? "#000" : _ref$fill,
	    _ref$width = _ref.width,
	    width = _ref$width === undefined ? "100px" : _ref$width,
	    _ref$className = _ref.className,
	    className = _ref$className === undefined ? "" : _ref$className,
	    _ref$viewBox = _ref.viewBox,
	    viewBox = _ref$viewBox === undefined ? "0 0 472.029 472.029" : _ref$viewBox;
	return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
		"svg",
		{
			width: width,
			style: style,
			height: width,
			viewBox: viewBox,
			xmlns: "http://www.w3.org/2000/svg",
			className: "svg-icon " + (className || ""),
			xmlnsXlink: "http://www.w3.org/1999/xlink",
			__source: {
				fileName: _jsxFileName,
				lineNumber: 10
			}
		},
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"g",
			{
				__source: {
					fileName: _jsxFileName,
					lineNumber: 19
				}
			},
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"g",
				{
					__source: {
						fileName: _jsxFileName,
						lineNumber: 20
					}
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M64.004,264.002c-4.418,0-8,3.582-8,8v32c0,4.418,3.582,8,8,8s8-3.582,8-8v-32\r C72.004,267.584,68.422,264.002,64.004,264.002z", __source: {
						fileName: _jsxFileName,
						lineNumber: 21
					}
				})
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"g",
			{
				__source: {
					fileName: _jsxFileName,
					lineNumber: 25
				}
			},
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"g",
				{
					__source: {
						fileName: _jsxFileName,
						lineNumber: 26
					}
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M96.004,280.002c-4.418,0-8,3.582-8,8v32c0,4.418,3.582,8,8,8s8-3.582,8-8v-32\r C104.004,283.584,100.422,280.002,96.004,280.002z", __source: {
						fileName: _jsxFileName,
						lineNumber: 27
					}
				})
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"g",
			{
				__source: {
					fileName: _jsxFileName,
					lineNumber: 31
				}
			},
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"g",
				{
					__source: {
						fileName: _jsxFileName,
						lineNumber: 32
					}
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M387.796,322.938c-3.729-2.37-8.673-1.267-11.043,2.462c-2.274,3.579-1.361,8.311,2.083,10.786\r c21.99,14.806,27.813,44.635,13.008,66.624c-14.806,21.99-44.635,27.814-66.624,13.008c-21.99-14.806-27.814-44.635-13.008-66.624\r c8.915-13.241,23.83-21.184,39.792-21.192c4.418,0,8-3.582,8-8s-3.582-8-8-8c-35.346,0.007-63.995,28.666-63.988,64.012\r c0.007,35.346,28.666,63.995,64.012,63.988c35.346-0.007,63.995-28.666,63.988-64.012\r C416.012,354.715,405.436,334.832,387.796,322.938z", __source: {
						fileName: _jsxFileName,
						lineNumber: 33
					}
				})
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"g",
			{
				__source: {
					fileName: _jsxFileName,
					lineNumber: 40
				}
			},
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"g",
				{
					__source: {
						fileName: _jsxFileName,
						lineNumber: 41
					}
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M444.235,349.43c-7.751-26.851-26.823-48.989-52.231-60.628v-176.8c0.001-2.829-1.493-5.448-3.928-6.888l-176-104\r c-2.512-1.485-5.633-1.485-8.144,0l-176,104c-0.168,0.096-0.288,0.24-0.448,0.352c-0.16,0.112-0.312,0.24-0.472,0.368\r c-0.695,0.547-1.292,1.207-1.768,1.952c0,0.056-0.096,0.088-0.128,0.144v0.056c-0.451,0.813-0.757,1.698-0.904,2.616\r c0,0.24-0.072,0.464-0.096,0.704s-0.112,0.456-0.112,0.696v208c-0.001,2.829,1.493,5.448,3.928,6.888l176,104\r c0.211,0.102,0.427,0.193,0.648,0.272c0.218,0.109,0.443,0.205,0.672,0.288c1.761,0.736,3.743,0.736,5.504,0\r c0.232-0.083,0.459-0.179,0.68-0.288c0.208-0.096,0.432-0.152,0.64-0.272l47.768-28.232c14.699,50.918,67.891,80.28,118.81,65.581\r C429.572,453.541,458.934,400.348,444.235,349.43z M208.004,17.29l41.6,24.584l-61.68,36.448\r c-3.806,2.249-5.069,7.158-2.82,10.964s7.158,5.069,10.964,2.82l69.272-40.904l41.6,24.584l-160.272,94.68l-41.6-24.584\r l67.016-39.6c3.806-2.249,5.069-7.158,2.82-10.964c-2.249-3.806-7.158-5.069-10.964-2.82l-74.6,44.088l-41.608-24.584\r L208.004,17.29z M138.668,184.33v53.416L97.34,213.322v-53.416L138.668,184.33z M259.165,351.272\r c-2.128,8.07-3.191,16.384-3.161,24.73c0.002,3.348,0.178,6.694,0.528,10.024l-40.528,23.96v-25.984c0-4.418-3.582-8-8-8\r s-8,3.582-8,8v25.984l-160-94.544V126.026L81.34,150.45v67.432c-0.003,2.832,1.49,5.455,3.928,6.896l57.328,33.88\r c1.234,0.726,2.64,1.11,4.072,1.112c4.418,0,8-3.582,8-8v-57.992l45.336,26.792v131.432c0,4.418,3.582,8,8,8s8-3.582,8-8V220.57\r l144.992-85.68c3.804-2.249,5.065-7.156,2.816-10.96c-2.249-3.804-7.156-5.065-10.96-2.816l-144.848,85.6l-45.6-26.952\r L322.676,85.05l53.328,31.512v166.64C324.943,269.735,272.632,300.21,259.165,351.272z M352.004,456.002\r c-44.183,0-80-35.817-80-80c0-44.183,35.817-80,80-80c44.183,0,80,35.817,80,80C431.956,420.165,396.167,455.953,352.004,456.002z\r ", __source: {
						fileName: _jsxFileName,
						lineNumber: 42
					}
				})
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
			"g",
			{
				__source: {
					fileName: _jsxFileName,
					lineNumber: 61
				}
			},
			__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
				"g",
				{
					__source: {
						fileName: _jsxFileName,
						lineNumber: 62
					}
				},
				__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M381.464,354.346c-3.1-2.995-8.016-2.995-11.116,0l-30.344,30.344l-6.344-6.344c-3.178-3.07-8.242-2.982-11.312,0.196\r c-2.995,3.1-2.995,8.016,0,11.116l12,12c3.124,3.123,8.188,3.123,11.312,0l36-36C384.73,362.48,384.642,357.415,381.464,354.346z",
					__source: {
						fileName: _jsxFileName,
						lineNumber: 63
					}
				})
			)
		),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
			__source: {
				fileName: _jsxFileName,
				lineNumber: 68
			}
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
			__source: {
				fileName: _jsxFileName,
				lineNumber: 70
			}
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
			__source: {
				fileName: _jsxFileName,
				lineNumber: 72
			}
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
			__source: {
				fileName: _jsxFileName,
				lineNumber: 74
			}
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
			__source: {
				fileName: _jsxFileName,
				lineNumber: 76
			}
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
			__source: {
				fileName: _jsxFileName,
				lineNumber: 78
			}
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
			__source: {
				fileName: _jsxFileName,
				lineNumber: 80
			}
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
			__source: {
				fileName: _jsxFileName,
				lineNumber: 82
			}
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
			__source: {
				fileName: _jsxFileName,
				lineNumber: 84
			}
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
			__source: {
				fileName: _jsxFileName,
				lineNumber: 86
			}
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
			__source: {
				fileName: _jsxFileName,
				lineNumber: 88
			}
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
			__source: {
				fileName: _jsxFileName,
				lineNumber: 90
			}
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
			__source: {
				fileName: _jsxFileName,
				lineNumber: 92
			}
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
			__source: {
				fileName: _jsxFileName,
				lineNumber: 94
			}
		}),
		__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
			__source: {
				fileName: _jsxFileName,
				lineNumber: 96
			}
		})
	);
};
/* harmony default export */ __webpack_exports__["a"] = (SVG);

/***/ }),

/***/ "./helper/icon/Paper.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "C:\\Users\\idontsudo\\Desktop\\job\\ERP_System\\front\\commerce\\helper\\icon\\Paper.js";


var SVG = function SVG(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? "#000" : _ref$fill,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? "100px" : _ref$width,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      _ref$viewBox = _ref.viewBox,
      viewBox = _ref$viewBox === undefined ? "0 0 477.867 477.867" : _ref$viewBox;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "svg",
    {
      width: width,
      style: style,
      height: width,
      viewBox: viewBox,
      xmlns: "http://www.w3.org/2000/svg",
      className: "svg-icon " + (className || ""),
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "g",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "g",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 20
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
          d: "M341.333,85.333H51.2c-28.277,0-51.2,22.923-51.2,51.2v290.133c0,28.277,22.923,51.2,51.2,51.2h290.133\r c28.277,0,51.2-22.923,51.2-51.2V136.533C392.533,108.256,369.61,85.333,341.333,85.333z M358.4,426.667\r c0,9.426-7.641,17.067-17.067,17.067H51.2c-9.426,0-17.067-7.641-17.067-17.067V136.533c0-9.426,7.641-17.067,17.067-17.067\r h290.133c9.426,0,17.067,7.641,17.067,17.067V426.667z",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          }
        })
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "g",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "g",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 30
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
          d: "M426.667,0h-307.2c-28.277,0-51.2,22.923-51.2,51.2c0,9.426,7.641,17.067,17.067,17.067S102.4,60.626,102.4,51.2\r s7.641-17.067,17.067-17.067h307.2c9.426,0,17.067,7.641,17.067,17.067v307.2c0,9.426-7.641,17.067-17.067,17.067\r s-17.067,7.641-17.067,17.067s7.641,17.067,17.067,17.067c28.277,0,51.2-22.923,51.2-51.2V51.2\r C477.867,22.923,454.944,0,426.667,0z",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 31
          }
        })
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 44
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      }
    })
  );
};
/* harmony default export */ __webpack_exports__["a"] = (SVG);

/***/ }),

/***/ "./helper/icon/Phone.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "C:\\Users\\idontsudo\\Desktop\\job\\ERP_System\\front\\commerce\\helper\\icon\\Phone.js";


var SVG = function SVG(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? "#000" : _ref$fill,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? "100px" : _ref$width,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      _ref$viewBox = _ref.viewBox,
      viewBox = _ref$viewBox === undefined ? "0 0 384 384" : _ref$viewBox;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "svg",
    {
      width: width,
      style: style,
      height: width,
      viewBox: viewBox,
      xmlns: "http://www.w3.org/2000/svg",
      className: "svg-icon " + (className || ""),
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "g",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "g",
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 20
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
          d: "M353.188,252.052c-23.51,0-46.594-3.677-68.469-10.906c-10.906-3.719-23.323-0.833-30.438,6.417l-43.177,32.594\r c-50.073-26.729-80.917-57.563-107.281-107.26l31.635-42.052c8.219-8.208,11.167-20.198,7.635-31.448\r c-7.26-21.99-10.948-45.063-10.948-68.583C132.146,13.823,118.323,0,101.333,0H30.812C13.823,0,0,13.823,0,30.812\r C0,225.563,158.438,384,353.188,384c16.99,0,30.813-13.823,30.813-30.813v-70.323C384,265.875,370.177,252.052,353.188,252.052z\r M362.667,353.188c0,5.229-4.25,9.479-9.479,9.479c-182.99,0-331.854-148.865-331.854-331.854c0-5.229,4.25-9.479,9.479-9.479\r h70.521c5.229,0,9.479,4.25,9.479,9.479c0,25.802,4.052,51.125,11.979,75.115c1.104,3.542,0.208,7.208-3.375,10.938L82.75,165.427\r c-2.458,3.26-2.844,7.625-1,11.26c29.927,58.823,66.292,95.188,125.531,125.542c3.604,1.885,8.021,1.49,11.292-0.979\r l49.677-37.635c2.51-2.51,6.271-3.406,9.667-2.25c24.156,7.979,49.479,12.021,75.271,12.021c5.229,0,9.479,4.25,9.479,9.479\r V353.188z",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          }
        })
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 44
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48
      }
    })
  );
};
/* harmony default export */ __webpack_exports__["a"] = (SVG);

/***/ }),

/***/ "./helper/icon/Priced.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "C:\\Users\\idontsudo\\Desktop\\job\\ERP_System\\front\\commerce\\helper\\icon\\Priced.js";


var SVG = function SVG(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? "#000" : _ref$fill,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? "100px" : _ref$width,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      _ref$viewBox = _ref.viewBox,
      viewBox = _ref$viewBox === undefined ? "0 0 290 290" : _ref$viewBox;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "svg",
    {
      width: width,
      style: style,
      height: width,
      viewBox: viewBox,
      xmlns: "http://www.w3.org/2000/svg",
      className: "svg-icon " + (className || ""),
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "g",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
        id: "rect22499",
        d: "M94.902,0.002c-0.667,0.013-1.324,0.159-1.934,0.43l-90,40C1.164,41.234,0,43.024,0,45v240\r c0.001,2.762,2.24,5,5.002,4.999c0.699,0,1.391-0.147,2.03-0.431l88.07-39.143l98.041,39.217c1.253,0.501,2.656,0.474,3.889-0.074\r l90-40c1.805-0.803,2.968-2.593,2.969-4.568V5c-0.001-2.762-2.24-5-5.002-4.999c-0.699,0-1.391,0.147-2.03,0.431l-88.07,39.143\r L96.857,0.357C96.236,0.109,95.571-0.012,94.902,0.002z M97.5,11.384l95,38v109.23l-95-38V11.384z M92.5,11.582V120.64L10,157.306\r V48.248L92.5,11.582z M280,12.693v109.059l-82.5,36.666V49.359L280,12.693z M104.951,22.5c-1.362,0.027-2.451,1.138-2.451,2.5v45\r c-0.02,1.381,1.084,2.516,2.465,2.535c1.381,0.02,2.516-1.084,2.535-2.465c0-0.024,0-0.047,0-0.071V28.691l21.572,8.629\r c1.265,0.554,2.739-0.021,3.294-1.286c0.554-1.265-0.021-2.739-1.286-3.294c-0.05-0.022-0.101-0.042-0.152-0.061l-25-10\r C105.617,22.555,105.285,22.494,104.951,22.5z M50.012,37.484c-0.393,0.003-0.78,0.099-1.129,0.279l-30,15\r C18.035,53.187,17.5,54.052,17.5,55v40c-0.02,1.381,1.084,2.516,2.465,2.535c1.381,0.02,2.516-1.084,2.535-2.465\r c0-0.024,0-0.047,0-0.071V56.545l28.617-14.309c1.244-0.6,1.765-2.095,1.165-3.338C51.862,38.027,50.978,37.477,50.012,37.484z\r M235.012,37.484c-0.393,0.003-0.78,0.099-1.129,0.279l-30,15c-0.847,0.423-1.383,1.289-1.383,2.236v40\r c-0.02,1.381,1.084,2.516,2.465,2.535c1.381,0.02,2.516-1.084,2.535-2.465c0-0.024,0-0.047,0-0.071V56.545l28.617-14.309\r c1.244-0.6,1.765-2.095,1.165-3.338C236.862,38.027,235.978,37.477,235.012,37.484z M97.5,131.384l95,38v109.23l-95-38V131.384z\r M92.5,131.582V240.64L10,277.306V168.248L92.5,131.582z M280,132.693V241.75l-82.5,36.668V169.359L280,132.693z M84.963,192.465\r c-1.38,0.02-2.482,1.155-2.463,2.535v38.455l-28.617,14.309c-1.246,0.595-1.774,2.088-1.179,3.334\r c0.595,1.246,2.088,1.774,3.334,1.179c0.027-0.013,0.053-0.026,0.08-0.04l30-15c0.847-0.423,1.383-1.289,1.383-2.236v-40\r c0.019-1.381-1.084-2.516-2.465-2.535C85.011,192.464,84.987,192.464,84.963,192.465z M269.963,192.465\r c-1.38,0.02-2.482,1.155-2.463,2.535v38.455l-28.617,14.309c-1.246,0.595-1.774,2.088-1.179,3.334\r c0.595,1.246,2.088,1.774,3.334,1.179c0.027-0.013,0.053-0.026,0.08-0.04l30-15c0.847-0.423,1.383-1.289,1.383-2.236v-40\r c0.019-1.381-1.084-2.516-2.465-2.535C270.011,192.464,269.987,192.464,269.963,192.465z M184.963,217.465\r c-1.38,0.02-2.482,1.155-2.463,2.535v41.307l-21.572-8.629c-1.272-0.536-2.739,0.06-3.275,1.333s0.06,2.739,1.333,3.275\r c0.029,0.012,0.058,0.024,0.087,0.035l25,10c1.282,0.512,2.737-0.112,3.249-1.394c0.118-0.295,0.178-0.609,0.178-0.926v-45\r c0.019-1.381-1.084-2.516-2.465-2.535C185.011,217.464,184.987,217.464,184.963,217.465z",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("g", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61
      }
    })
  );
};
/* harmony default export */ __webpack_exports__["a"] = (SVG);

/***/ }),

/***/ "./helper/icon/Vk.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "C:\\Users\\idontsudo\\Desktop\\job\\ERP_System\\front\\commerce\\helper\\icon\\Vk.js";


var SVG = function SVG(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? "#000" : _ref$fill,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? "100px" : _ref$width,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      _ref$viewBox = _ref.viewBox,
      viewBox = _ref$viewBox === undefined ? "0 0 24 24" : _ref$viewBox;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "svg",
    {
      width: width,
      style: style,
      height: width,
      viewBox: viewBox,
      xmlns: "http://www.w3.org/2000/svg",
      className: "svg-icon " + (className || ""),
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m12.145 19.5c3.472 0 2.234-2.198 2.502-2.83-.004-.472-.008-.926.008-1.202.22.062.739.325 1.811 1.367 1.655 1.67 2.078 2.665 3.415 2.665h2.461c.78 0 1.186-.323 1.389-.594.196-.262.388-.722.178-1.438-.549-1.724-3.751-4.701-3.95-5.015.03-.058.078-.135.103-.175h-.002c.632-.835 3.044-4.449 3.399-5.895.001-.002.002-.005.002-.008.192-.66.016-1.088-.166-1.33-.274-.362-.71-.545-1.299-.545h-2.461c-.824 0-1.449.415-1.765 1.172-.529 1.345-2.015 4.111-3.129 5.09-.034-1.387-.011-2.446.007-3.233.036-1.535.152-3.029-1.441-3.029h-3.868c-.998 0-1.953 1.09-.919 2.384.904 1.134.325 1.766.52 4.912-.76-.815-2.112-3.016-3.068-5.829-.268-.761-.674-1.466-1.817-1.466h-2.461c-.998 0-1.594.544-1.594 1.455 0 2.046 4.529 13.544 12.145 13.544zm-8.09-13.499c.217 0 .239 0 .4.457.979 2.883 3.175 7.149 4.779 7.149 1.205 0 1.205-1.235 1.205-1.7l-.001-3.702c-.066-1.225-.512-1.835-.805-2.205l3.508.004c.002.017-.02 4.095.01 5.083 0 1.403 1.114 2.207 2.853.447 1.835-2.071 3.104-5.167 3.155-5.293.075-.18.14-.241.376-.241h2.461.01c-.001.003-.001.006-.002.009-.225 1.05-2.446 4.396-3.189 5.435-.012.016-.023.033-.034.05-.327.534-.593 1.124.045 1.954h.001c.058.07.209.234.429.462.684.706 3.03 3.12 3.238 4.08-.138.022-.288.006-2.613.011-.495 0-.882-.74-2.359-2.23-1.328-1.292-2.19-1.82-2.975-1.82-1.524 0-1.413 1.237-1.399 2.733.005 1.622-.005 1.109.006 1.211-.089.035-.344.105-1.009.105-6.345 0-10.477-10.071-10.636-11.996.055-.005.812-.002 2.546-.003z", __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      }
    })
  );
};
/* harmony default export */ __webpack_exports__["a"] = (SVG);

/***/ }),

/***/ "./helper/img/logo.png":
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected character '�' (1:0)\nYou may need an appropriate loader to handle this file type.\n(Source code omitted for this binary file)");

/***/ }),

/***/ "./pages/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Header__ = __webpack_require__("./components/Header.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Layout_js__ = __webpack_require__("./components/Layout.js");
var _jsxFileName = 'C:\\Users\\idontsudo\\Desktop\\job\\ERP_System\\front\\commerce\\pages\\index.js';



/* harmony default export */ __webpack_exports__["default"] = (function () {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 3
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_Layout_js__["a" /* default */], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 3
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_Header__["a" /* default */], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 3
      }
    })
  );
});

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/index.js");


/***/ }),

/***/ "antd/lib/badge":
/***/ (function(module, exports) {

module.exports = require("antd/lib/badge");

/***/ }),

/***/ "antd/lib/locale-provider":
/***/ (function(module, exports) {

module.exports = require("antd/lib/locale-provider");

/***/ }),

/***/ "antd/lib/locale-provider/en_US":
/***/ (function(module, exports) {

module.exports = require("antd/lib/locale-provider/en_US");

/***/ }),

/***/ "next/head":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "styled-jsx/style":
/***/ (function(module, exports) {

module.exports = require("styled-jsx/style");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map