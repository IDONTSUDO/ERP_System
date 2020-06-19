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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__ = __webpack_require__("styled-jsx/style");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_next_head__ = __webpack_require__("next/head");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_next_head___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_next_head__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper_Icon__ = __webpack_require__("./helper/Icon.jsx");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_SearchBar__ = __webpack_require__("./components/search/SearchBar.js");
var _jsxFileName = "C:\\Users\\user\\Desktop\\job\\erp\\front\\commerce\\components\\Header.js";






/* harmony default export */ __webpack_exports__["a"] = (function () {
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    "ex",
    {
      className: "jsx-2227816027",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 6
      }
    },
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      "header",
      {
        className: "jsx-2227816027",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      },
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        "div",
        {
          className: "jsx-2227816027" + " " + "logo logo_main_b main_logo_c",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 8
          }
        },
        " ",
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          "div",
          {
            className: "jsx-2227816027" + " " + "logo_container",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 8
            }
          },
          " ",
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__helper_Icon__["a" /* default */], { className: "logo_main_b", name: "logo", __source: {
              fileName: _jsxFileName,
              lineNumber: 8
            }
          }),
          " ",
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            "div",
            {
              className: "jsx-2227816027" + " " + "slogan_main",
              __source: {
                fileName: _jsxFileName,
                lineNumber: 8
              }
            },
            "\u041C\u0438\u0440 \u043A\u0440\u0443\u0442\u0438\u0442\u0441\u044F \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u043D\u0430\u043C\u0438"
          ),
          " "
        )
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        "div",
        {
          className: "jsx-2227816027" + " " + "phone_and_search_bar_c",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 9
          }
        },
        " ",
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          "span",
          {
            className: "jsx-2227816027" + " " + "span_mr",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 9
            }
          },
          " ",
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__helper_Icon__["a" /* default */], { name: "phone", __source: {
              fileName: _jsxFileName,
              lineNumber: 9
            }
          }),
          " 8-981-442-09-81 "
        ),
        " ",
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__search_SearchBar__["a" /* default */], { className: "searchBar", __source: {
            fileName: _jsxFileName,
            lineNumber: 9
          }
        }),
        " "
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement("div", {
        className: "jsx-2227816027" + " " + "header_bar",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      })
    ),
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default.a, {
      styleId: "2227816027",
      css: "header.jsx-2227816027{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;background-color:#ff00001f;width:80%;margin:auto;border-radius:5px;height:100%;}.logo.jsx-2227816027{-webkit-box-pack:inherit;-webkit-justify-content:inherit;-ms-flex-pack:inherit;justify-content:inherit;margin-right:auto;}.header_bar.jsx-2227816027{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin:auto;}.header_bar.jsx-2227816027>div.jsx-2227816027{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}.svg-icon.jsx-2227816027{height:2vh;}div.jsx-2227816027>div.jsx-2227816027{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-content:center;-ms-flex-line-pack:center;align-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-top:auto;margin-bottom:auto;}.logo_main_b.jsx-2227816027{width:200px;height:100px;}.slogan_main.jsx-2227816027{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}.logo_container.jsx-2227816027{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-flow:column;-ms-flex-flow:column;flex-flow:column;}.main_logo_c.jsx-2227816027{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;justify-items:center;}.phone_and_search_bar_c.jsx-2227816027{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.searchBar.jsx-2227816027{background-color:#FFFFFF;width:200px;}.span_mr.jsx-2227816027{margin-right:30px;font-family:Open Sans;font-weight:300;font-size:18px;line-height:25px;text-align:center;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXEhlYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFhZ0IsQUFHc0IsQUFTVyxBQUlYLEFBSUEsQUFJRixBQUlFLEFBUUYsQUFJQyxBQUlDLEFBSUEsQUFJQSxBQUlZLEFBSVIsV0FuQ25CLENBWWMsTUF3QlUsT0F2QnhCLEFBbUJhLFlBQ2IsR0FJa0IsZ0JBQ0QsZUFDRSxHQTVETSxBQWFYLEFBSVUsQUFRQyxBQWF6QixBQUdtQixBQUlJLEFBSU4sWUFuQ2pCLEVBK0NvQixPQWZwQixRQXJDZ0IsR0FzRGhCLGVBckRBLGdCQWdDQSxlQXhCQSxlQWdDQSxNQWpENkIsQUF5Qk4sMkJBeEJYLFVBQ0UsWUFDTSxrQkFDTixTQXNCTyxHQXJCckIsMEZBc0JrQixnQkFDRyxtQkFDckIiLCJmaWxlIjoiY29tcG9uZW50c1xcSGVhZGVyLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL3VzZXIvRGVza3RvcC9qb2IvZXJwL2Zyb250L2NvbW1lcmNlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWQgZnJvbSBcIm5leHQvaGVhZFwiO1xyXG5pbXBvcnQgSWNvbiBmcm9tIFwiLi4vaGVscGVyL0ljb25cIjtcclxuaW1wb3J0IFNlYXJjaEJhciBmcm9tIFwiLi9zZWFyY2gvU2VhcmNoQmFyXCJcclxuaW1wb3J0IHsgQmFkZ2UgfSBmcm9tIFwiYW50ZFwiO1xyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiAoXHJcbiAgPGV4PlxyXG4gICAgPGhlYWRlcj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dvIGxvZ29fbWFpbl9iIG1haW5fbG9nb19jXCI+IDxkaXYgY2xhc3NOYW1lPVwibG9nb19jb250YWluZXJcIj4gPEljb24gY2xhc3NOYW1lPVwibG9nb19tYWluX2JcIiBuYW1lPVwibG9nb1wiIC8+IDxkaXYgY2xhc3NOYW1lPVwic2xvZ2FuX21haW5cIj7QnNC40YAg0LrRgNGD0YLQuNGC0YHRjyDQstC80LXRgdGC0LUg0YEg0L3QsNC80Lg8L2Rpdj4gPC9kaXY+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvbmVfYW5kX3NlYXJjaF9iYXJfY1wiPiA8c3BhbiBjbGFzc05hbWU9XCJzcGFuX21yXCI+IDxJY29uIG5hbWU9XCJwaG9uZVwiLz4gOC05ODEtNDQyLTA5LTgxIDwvc3Bhbj4gPFNlYXJjaEJhciBjbGFzc05hbWU9XCJzZWFyY2hCYXJcIi8+IDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJfYmFyXCI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9oZWFkZXI+XHJcbiAgICA8c3R5bGUganN4PntgXHJcbiAgICAgIGhlYWRlciB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYwMDAwMWY7XHJcbiAgICAgICAgd2lkdGg6IDgwJTtcclxuICAgICAgICBtYXJnaW46IGF1dG87XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgfVxyXG4gICAgICAubG9nbyB7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBpbmhlcml0O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xyXG4gICAgICB9XHJcbiAgICAgIC5oZWFkZXJfYmFyIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIG1hcmdpbjogYXV0bztcclxuICAgICAgfVxyXG4gICAgICAuaGVhZGVyX2JhciA+IGRpdiB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICB9XHJcbiAgICAgIC5zdmctaWNvbiB7XHJcbiAgICAgICAgaGVpZ2h0OiAydmg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRpdiA+IGRpdiB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBtYXJnaW4tdG9wOiBhdXRvO1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IGF1dG87XHJcbiAgICAgIH1cclxuICAgICAgLmxvZ29fbWFpbl9ie1xyXG4gICAgICAgIHdpZHRoOjIwMHB4O1xyXG4gICAgICAgIGhlaWdodDoxMDBweDtcclxuICAgICAgfVxyXG4gICAgICAuc2xvZ2FuX21haW57XHJcbiAgICAgICAgZGlzcGxheTpmbGV4O1xyXG5cclxuICAgICAgfVxyXG4gICAgICAubG9nb19jb250YWluZXJ7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWZsb3c6IGNvbHVtbjtcclxuICAgICAgfVxyXG4gICAgICAubWFpbl9sb2dvX2N7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIH1cclxuICAgICAgLnBob25lX2FuZF9zZWFyY2hfYmFyX2N7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIH1cclxuICAgICAgLnNlYXJjaEJhcntcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xyXG4gICAgICAgIHdpZHRoOjIwMHB4O1xyXG4gICAgICB9XHJcbiAgICAgIC5zcGFuX21ye1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDozMHB4O1xyXG4gICAgICAgIGZvbnQtZmFtaWx5OiBPcGVuIFNhbnM7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICAgICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDI1cHg7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG5cclxuICAgICAgfVxyXG4gICAgYH08L3N0eWxlPlxyXG4gIDwvZXg+XHJcbik7XHJcbiJdfQ== */\n/*@ sourceURL=components\\Header.js */"
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

var _jsxFileName = 'C:\\Users\\user\\Desktop\\job\\erp\\front\\commerce\\components\\Layout.js';






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
      css: '\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXExheW91dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZdUIiLCJmaWxlIjoiY29tcG9uZW50c1xcTGF5b3V0LmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL3VzZXIvRGVza3RvcC9qb2IvZXJwL2Zyb250L2NvbW1lcmNlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xyXG5pbXBvcnQgeyBMb2NhbGVQcm92aWRlciB9IGZyb20gJ2FudGQnXHJcbmltcG9ydCBlblVTIGZyb20gJ2FudGQvbGliL2xvY2FsZS1wcm92aWRlci9lbl9VUydcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICh7IHRpdGxlLCBjaGlsZHJlbiB9KSA9PlxyXG4gIDxkaXY+XHJcbiAgICA8SGVhZD5cclxuICAgICAgPHRpdGxlPnsgdGl0bGUgfTwvdGl0bGU+XHJcbiAgICAgIDxtZXRhIG5hbWU9J3ZpZXdwb3J0JyBjb250ZW50PSd3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MScgLz5cclxuICAgICAgPG1ldGEgY2hhclNldD0ndXRmLTgnIC8+XHJcbiAgICAgIDxsaW5rIHJlbD0nc3R5bGVzaGVldCcgaHJlZj0nLy9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvYW50ZC8zLjIuMC9hbnRkLm1pbi5jc3MnIC8+XHJcbiAgICA8L0hlYWQ+XHJcbiAgICA8c3R5bGUganN4IGdsb2JhbD57YFxyXG4gICAgICBib2R5IHtcclxuICAgICAgfVxyXG4gICAgYH08L3N0eWxlPlxyXG4gICAgPExvY2FsZVByb3ZpZGVyIGxvY2FsZT17ZW5VU30+XHJcbiAgICAgIDxkaXY+e2NoaWxkcmVufTwvZGl2PlxyXG4gICAgPC9Mb2NhbGVQcm92aWRlcj5cclxuICA8L2Rpdj4iXX0= */\n/*@ sourceURL=components\\Layout.js */'
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

/***/ "./components/search/SearchBar.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_auto_complete__ = __webpack_require__("antd/lib/auto-complete");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_antd_lib_auto_complete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_antd_lib_auto_complete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_input__ = __webpack_require__("antd/lib/input");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_antd_lib_input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_antd_lib_input__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_styled_jsx_style__ = __webpack_require__("styled-jsx/style");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_styled_jsx_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_styled_jsx_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsxFileName = 'C:\\Users\\user\\Desktop\\job\\erp\\front\\commerce\\components\\search\\SearchBar.js';


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var renderTitle = function renderTitle(title) {
    return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        'span',
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 5
            }
        },
        title
    );
};

var renderItem = function renderItem(title, count) {
    return {
        value: title,
        label: __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
            'div',
            {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between'
                },
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 13
                }
            },
            title
        )
    };
};

var options = [{
    label: renderTitle('Libraries'),
    options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)]
}, {
    label: renderTitle('Solutions'),
    options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)]
}, {
    label: renderTitle('Articles'),
    options: [renderItem('AntDesign design language', 100000)]
}];

var Complete = function Complete() {
    return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_0_antd_lib_auto_complete___default.a,
        {
            dropdownClassName: 'certain-category-search-dropdown',
            dropdownMatchSelectWidth: 500,
            style: {
                width: 250
            },
            options: options,
            __source: {
                fileName: _jsxFileName,
                lineNumber: 40
            }
        },
        __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_antd_lib_input___default.a.Search, { size: 'large', placeholder: '\u041F\u043E\u0438\u0441\u043A', __source: {
                fileName: _jsxFileName,
                lineNumber: 48
            }
        })
    );
};

var SearchBar = function (_Component) {
    _inherits(SearchBar, _Component);

    function SearchBar() {
        _classCallCheck(this, SearchBar);

        return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).apply(this, arguments));
    }

    _createClass(SearchBar, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
                'ex',
                {
                    className: 'jsx-1278899205' + ' ' + 'searchBar',
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 54
                    }
                },
                __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Complete, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 55
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_styled_jsx_style___default.a, {
                    styleId: '1278899205',
                    css: '.certain-category-search-dropdown.jsx-1278899205 .ant-select-dropdown-menu-item-group-title.jsx-1278899205{color:#666;font-weight:bold;}.certain-category-search-dropdown.jsx-1278899205 .ant-select-dropdown-menu-item-group.jsx-1278899205{border-bottom:1px solid #f6f6f6;}.certain-category-search-dropdown.jsx-1278899205 .ant-select-dropdown-menu-item.jsx-1278899205{padding-left:16px;}.certain-category-search-dropdown.jsx-1278899205 .ant-select-dropdown-menu-item.show-all.jsx-1278899205{text-align:center;cursor:default;}.certain-category-search-dropdown.jsx-1278899205 .ant-select-dropdown-menu.jsx-1278899205{max-height:300px;}.anticon-search.jsx-1278899205:before{content:none !important;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHNcXHNlYXJjaFxcU2VhcmNoQmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVENEIsQUFHd0IsQUFLcUIsQUFJZCxBQUlBLEFBS0QsQUFLdEIsV0F0QnNCLE1Ba0JyQixDQVRBLEFBSW1CLE1BU25CLElBckJBLElBSUEsQ0FTQSIsImZpbGUiOiJjb21wb25lbnRzXFxzZWFyY2hcXFNlYXJjaEJhci5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy91c2VyL0Rlc2t0b3Avam9iL2VycC9mcm9udC9jb21tZXJjZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgSW5wdXQsIEF1dG9Db21wbGV0ZSB9IGZyb20gJ2FudGQnO1xyXG5cclxuY29uc3QgcmVuZGVyVGl0bGUgPSB0aXRsZSA9PiAoXHJcbiAgICA8c3Bhbj5cclxuICAgICAgICB7dGl0bGV9XHJcbiAgICA8L3NwYW4+XHJcbik7XHJcblxyXG5jb25zdCByZW5kZXJJdGVtID0gKHRpdGxlLCBjb3VudCkgPT4gKHtcclxuICAgIHZhbHVlOiB0aXRsZSxcclxuICAgIGxhYmVsOiAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICAgIHt0aXRsZX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICksXHJcbn0pO1xyXG5cclxuY29uc3Qgb3B0aW9ucyA9IFtcclxuICAgIHtcclxuICAgICAgICBsYWJlbDogcmVuZGVyVGl0bGUoJ0xpYnJhcmllcycpLFxyXG4gICAgICAgIG9wdGlvbnM6IFtyZW5kZXJJdGVtKCdBbnREZXNpZ24nLCAxMDAwMCksIHJlbmRlckl0ZW0oJ0FudERlc2lnbiBVSScsIDEwNjAwKV0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGxhYmVsOiByZW5kZXJUaXRsZSgnU29sdXRpb25zJyksXHJcbiAgICAgICAgb3B0aW9uczogW3JlbmRlckl0ZW0oJ0FudERlc2lnbiBVSSBGQVEnLCA2MDEwMCksIHJlbmRlckl0ZW0oJ0FudERlc2lnbiBGQVEnLCAzMDAxMCldLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBsYWJlbDogcmVuZGVyVGl0bGUoJ0FydGljbGVzJyksXHJcbiAgICAgICAgb3B0aW9uczogW3JlbmRlckl0ZW0oJ0FudERlc2lnbiBkZXNpZ24gbGFuZ3VhZ2UnLCAxMDAwMDApXSxcclxuICAgIH0sXHJcbl07XHJcblxyXG5jb25zdCBDb21wbGV0ZSA9ICgpID0+IChcclxuICAgIDxBdXRvQ29tcGxldGVcclxuICAgICAgICBkcm9wZG93bkNsYXNzTmFtZT1cImNlcnRhaW4tY2F0ZWdvcnktc2VhcmNoLWRyb3Bkb3duXCJcclxuICAgICAgICBkcm9wZG93bk1hdGNoU2VsZWN0V2lkdGg9ezUwMH1cclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICB3aWR0aDogMjUwLFxyXG4gICAgICAgIH19XHJcbiAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cclxuICAgID5cclxuICAgICAgICA8SW5wdXQuU2VhcmNoIHNpemU9XCJsYXJnZVwiIHBsYWNlaG9sZGVyPVwi0J/QvtC40YHQulwiIC8+XHJcbiAgICA8L0F1dG9Db21wbGV0ZT5cclxuKTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoQmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZXggY2xhc3NOYW1lPVwic2VhcmNoQmFyXCI+XHJcbiAgICAgICAgICAgICAgICA8Q29tcGxldGUgLz5cclxuICAgICAgICAgICAgICAgIDxzdHlsZSBqc3g+e2BcclxuICAgICAgICAuY2VydGFpbi1jYXRlZ29yeS1zZWFyY2gtZHJvcGRvd24gLmFudC1zZWxlY3QtZHJvcGRvd24tbWVudS1pdGVtLWdyb3VwLXRpdGxlIHtcclxuICAgICAgICAgICAgY29sb3I6ICM2NjY7XHJcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmNlcnRhaW4tY2F0ZWdvcnktc2VhcmNoLWRyb3Bkb3duIC5hbnQtc2VsZWN0LWRyb3Bkb3duLW1lbnUtaXRlbS1ncm91cCB7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjZmNmY2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmNlcnRhaW4tY2F0ZWdvcnktc2VhcmNoLWRyb3Bkb3duIC5hbnQtc2VsZWN0LWRyb3Bkb3duLW1lbnUtaXRlbSB7XHJcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMTZweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5jZXJ0YWluLWNhdGVnb3J5LXNlYXJjaC1kcm9wZG93biAuYW50LXNlbGVjdC1kcm9wZG93bi1tZW51LWl0ZW0uc2hvdy1hbGwge1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAgIGN1cnNvcjogZGVmYXVsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5jZXJ0YWluLWNhdGVnb3J5LXNlYXJjaC1kcm9wZG93biAuYW50LXNlbGVjdC1kcm9wZG93bi1tZW51IHtcclxuICAgICAgICAgICAgbWF4LWhlaWdodDogMzAwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdG9kb1xyXG4gICAgICAgIC5hbnRpY29uLXNlYXJjaDpiZWZvcmV7XHJcbiAgICAgICAgY29udGVudDpub25lICFpbXBvcnRhbnRcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBgfTwvc3R5bGU+XHJcblxyXG5cclxuICAgICAgICAgICAgPC9leD5cclxuXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcbiJdfQ== */\n/*@ sourceURL=components\\search\\SearchBar.js */'
                })
            );
        }
    }]);

    return SearchBar;
}(__WEBPACK_IMPORTED_MODULE_3_react__["Component"]);



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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__icon_svarog_logo_js__ = __webpack_require__("./helper/icon/svarog_logo.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = "C:\\Users\\user\\Desktop\\job\\erp\\front\\commerce\\helper\\Icon.jsx";













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
    case "logo":
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__icon_svarog_logo_js__["a" /* default */], _extends({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
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
var _jsxFileName = "C:\\Users\\user\\Desktop\\job\\erp\\front\\commerce\\helper\\icon\\Basket.js";


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
var _jsxFileName = "C:\\Users\\user\\Desktop\\job\\erp\\front\\commerce\\helper\\icon\\Card.js";


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
var _jsxFileName = "C:\\Users\\user\\Desktop\\job\\erp\\front\\commerce\\helper\\icon\\Catalog.js";


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
var _jsxFileName = "C:\\Users\\user\\Desktop\\job\\erp\\front\\commerce\\helper\\icon\\Find.js";


var SVG = function SVG(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? "#000" : _ref$fill,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? "20px" : _ref$width,
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
var _jsxFileName = "C:\\Users\\user\\Desktop\\job\\erp\\front\\commerce\\helper\\icon\\Mail.js";


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
var _jsxFileName = "C:\\Users\\user\\Desktop\\job\\erp\\front\\commerce\\helper\\icon\\Order.js";


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
var _jsxFileName = "C:\\Users\\user\\Desktop\\job\\erp\\front\\commerce\\helper\\icon\\Paper.js";


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
var _jsxFileName = "C:\\Users\\user\\Desktop\\job\\erp\\front\\commerce\\helper\\icon\\Phone.js";


var SVG = function SVG(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? "#000" : _ref$fill,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? "1em" : _ref$width,
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
var _jsxFileName = "C:\\Users\\user\\Desktop\\job\\erp\\front\\commerce\\helper\\icon\\Priced.js";


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
var _jsxFileName = "C:\\Users\\user\\Desktop\\job\\erp\\front\\commerce\\helper\\icon\\Vk.js";


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

/***/ "./helper/icon/svarog_logo.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _jsxFileName = "C:\\Users\\user\\Desktop\\job\\erp\\front\\commerce\\helper\\icon\\svarog_logo.js";


var SVG = function SVG(_ref) {
    var _ref$style = _ref.style,
        style = _ref$style === undefined ? {} : _ref$style,
        _ref$fill = _ref.fill,
        fill = _ref$fill === undefined ? "#000" : _ref$fill,
        _ref$width = _ref.width,
        width = _ref$width === undefined ? "100" : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? "75" : _ref$height,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? "" : _ref$className,
        _ref$viewBox = _ref.viewBox,
        viewBox = _ref$viewBox === undefined ? "0 0 76 46" : _ref$viewBox;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "svg",
        {
            width: width,
            style: style,
            height: height,
            viewBox: viewBox,
            xmlns: "http://www.w3.org/2000/svg",
            className: "svg-icon logo_main_b " + (className || ""),
            xmlnsXlink: "http://www.w3.org/1999/xlink",
            __source: {
                fileName: _jsxFileName,
                lineNumber: 11
            }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M35.6477 0.644085C29.9727 1.35314 24.995 3.71666 21.2344 7.48516C20.1678 8.56187 18.5405 10.6234 17.8021 11.8445C17.1457 12.9344 16.4346 14.3394 16.4346 14.5626C16.4346 14.6939 18.0345 14.7333 23.9831 14.7333H31.5179L31.9829 14.3919C32.7213 13.8535 34.6358 13.0526 35.7298 12.8162C37.0289 12.5405 39.4357 12.5405 40.6801 12.8162C41.8561 13.0788 43.3193 13.6697 44.2492 14.2737L44.974 14.7333H52.5225C56.666 14.7333 60.0574 14.707 60.0574 14.6676C60.0574 14.6282 59.7428 13.998 59.3599 13.2495C55.8865 6.6054 49.8286 2.23289 42.1843 0.880438C40.6801 0.604693 39.969 0.552171 38.2049 0.565301C37.0289 0.578433 35.8802 0.617824 35.6477 0.644085ZM41.5279 3.88736C46.6423 4.76711 50.9636 7.18315 54.0951 10.9516C54.8883 11.9102 56.1737 13.8141 56.2558 14.1818C56.2968 14.3656 55.4079 14.5101 55.1618 14.3525C55.1071 14.3131 54.7652 13.8535 54.4233 13.3546C53.849 12.4879 52.167 10.4002 52.0439 10.4002C52.0166 10.4002 51.8661 10.6365 51.7157 10.9123C51.5653 11.2011 51.2097 11.5951 50.9226 11.792L50.3892 12.1597L51.0867 13.0263C51.4696 13.499 51.8251 13.906 51.8661 13.9454C51.9208 13.9848 51.9892 14.0899 52.0166 14.1949C52.0439 14.3131 51.8798 14.3787 51.4696 14.405C50.9226 14.4313 50.8542 14.3919 50.3072 13.7616C49.5141 12.8425 48.8987 12.2516 48.0919 11.6476C47.7226 11.3587 47.3808 11.0961 47.3397 11.0567C47.162 10.8729 45.8082 10.1113 44.9466 9.70424C42.745 8.66691 40.7758 8.24673 38.1776 8.24673C35.4836 8.24673 33.5692 8.68005 31.2718 9.78302C29.5488 10.6103 28.6462 11.2537 27.0052 12.8425C25.6514 14.1555 25.4053 14.3394 24.913 14.3919C24.5985 14.4313 24.366 14.405 24.366 14.3262C24.366 14.1687 24.913 13.4333 25.5694 12.7243L26.0343 12.2122L25.5967 11.9102C25.3643 11.7395 24.9677 11.3587 24.7352 11.0436L24.3113 10.4921L23.6412 11.188C23.2857 11.5688 22.5883 12.4485 22.1096 13.1445L21.2481 14.4181L20.6601 14.3919C20.3319 14.3787 20.0584 14.3525 20.0721 14.3262C20.1405 14.103 20.8105 12.9475 21.2618 12.3041C24.1609 8.15482 29.0428 4.99033 34.0615 4.03179C36.5503 3.54596 39.2442 3.49344 41.5279 3.88736ZM24.2976 12.5798C24.5438 12.8162 24.4754 13.4071 24.1882 13.5778C23.7369 13.8535 22.9985 13.5515 22.9985 13.0919C22.9985 12.4223 23.8053 12.1071 24.2976 12.5798ZM53.0285 12.4748C53.5618 12.8293 53.2199 13.6828 52.5362 13.6828C51.9482 13.6828 51.6063 12.9212 52.0166 12.5273C52.1943 12.3566 52.796 12.3172 53.0285 12.4748Z", fill: "#01628F", __source: {
                fileName: _jsxFileName,
                lineNumber: 23
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M35.842 4.05906C35.4727 4.15097 35.1309 5.07012 35.1309 5.94987C35.1445 6.58014 35.2266 6.85589 35.5411 7.35485L35.924 7.95886L38.1804 7.91947C40.423 7.89321 40.4367 7.89321 40.7239 7.55181C41.0657 7.17102 41.3256 6.40945 41.3256 5.84483C41.3256 5.1489 40.9153 4.21663 40.5461 4.08532C40.2179 3.96714 36.2795 3.94088 35.842 4.05906ZM36.8949 5.87109C36.8949 7.39424 36.8129 7.52555 36.1975 6.92154C35.6232 6.38318 35.7326 5.1489 36.3889 4.66307C36.8265 4.34793 36.8812 4.47924 36.8949 5.87109Z", fill: "#01628F", __source: {
                fileName: _jsxFileName,
                lineNumber: 24
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M33.4617 5.28057C32.5045 5.51692 30.4943 6.22598 30.1251 6.4492C29.961 6.55424 29.9883 6.64616 30.2755 6.97442C30.4669 7.18451 30.7404 7.64409 30.8635 7.97235C31.0003 8.30062 31.137 8.56323 31.178 8.56323C31.2054 8.56323 31.684 8.40566 32.2173 8.22184C32.7506 8.02488 33.5848 7.77539 34.0771 7.64409C34.7061 7.48652 34.9523 7.36834 34.9113 7.23704C34.8702 7.13199 34.8292 6.59363 34.7882 6.02902C34.7472 5.38561 34.6788 5.01796 34.5694 5.03109C34.4873 5.03109 33.9814 5.14926 33.4617 5.28057ZM33.2566 6.4492C33.4617 6.82999 33.4207 7.13199 33.1609 7.32895C32.8327 7.5653 32.4361 7.55217 32.1353 7.28956C31.643 6.85625 31.9438 6.19972 32.6412 6.19972C32.9694 6.19972 33.1609 6.2785 33.2566 6.4492Z", fill: "#01628F", __source: {
                fileName: _jsxFileName,
                lineNumber: 25
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M41.7073 5.50198C41.7483 5.97469 41.6116 6.77566 41.4065 7.26149C41.3244 7.43219 41.4338 7.48471 41.9398 7.55036C42.6235 7.64228 44.5927 8.25942 44.8115 8.44325C45.044 8.65334 45.1397 8.56142 45.55 7.79985C45.7688 7.37967 46.0423 6.95948 46.1653 6.86757C46.5072 6.59183 46.4388 6.49991 45.7414 6.19791C45.0713 5.90903 42.7876 5.22624 42.0765 5.0818C41.6663 5.00302 41.6526 5.01615 41.7073 5.50198ZM44.2508 6.408C44.7158 6.85444 44.3602 7.51097 43.6355 7.51097C43.1158 7.51097 42.8423 7.02514 43.0748 6.52617C43.2663 6.14538 43.909 6.0666 44.2508 6.408Z", fill: "#01628F", __source: {
                fileName: _jsxFileName,
                lineNumber: 26
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M27.2262 7.092C25.5442 8.16871 24.5049 9.04847 24.5049 9.42926C24.5049 10.2696 25.2707 11.3332 26.1869 11.7796C26.5698 11.9635 26.9527 12.1079 27.0347 12.1079C27.1168 12.1079 27.5134 11.8453 27.8962 11.517C28.2928 11.2019 29.0723 10.6504 29.633 10.309L30.6586 9.67874V8.95655C30.6586 8.37881 30.5765 8.11619 30.2757 7.68288C29.7287 6.89504 28.9629 6.30416 28.4979 6.33042C28.4432 6.34355 27.8689 6.67182 27.2262 7.092ZM26.1595 9.42926C26.3236 9.75752 26.6929 10.204 26.98 10.4272C27.3903 10.7423 27.4723 10.8736 27.3629 11.0181C26.939 11.5039 25.7766 10.8999 25.4758 10.0464C25.3117 9.61309 25.3117 9.42926 25.4348 9.16664C25.6672 8.68081 25.8313 8.74646 26.1595 9.42926Z", fill: "#00638E", __source: {
                fileName: _jsxFileName,
                lineNumber: 27
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M47.1361 6.63121C46.8352 6.78877 46.3839 7.20895 46.1515 7.56348C45.7822 8.07558 45.7002 8.32506 45.7002 8.90281C45.7002 9.57247 45.7139 9.61186 46.2882 9.96639C46.6027 10.1765 47.0403 10.426 47.2455 10.531C47.4506 10.6229 47.9976 11.03 48.4352 11.4239C49.2146 12.0936 49.2693 12.1198 49.7069 11.9885C50.8009 11.634 51.7171 10.4785 51.7171 9.4543C51.7035 8.92907 51.6488 8.85029 50.9513 8.31193C50.0078 7.58974 48.0249 6.3292 47.8335 6.3292C47.7514 6.3292 47.4369 6.46051 47.1361 6.63121ZM48.4352 7.24835C48.5993 7.35339 48.5446 7.47157 48.0659 7.93114C47.7514 8.24628 47.3959 8.71898 47.2865 8.98159C47.0267 9.57247 46.8762 9.66439 46.6574 9.4149C46.3976 9.1129 46.5617 8.07558 46.9446 7.68166C47.4506 7.16956 48.0249 6.99886 48.4352 7.24835Z", fill: "#01628F", __source: {
                fileName: _jsxFileName,
                lineNumber: 28
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M6.45392 16.7573C5.26421 17.0068 3.73263 17.7947 2.93948 18.5562C2.54291 18.937 2.21472 19.2916 2.21472 19.3441C2.21472 19.3966 2.13267 19.5279 2.03694 19.6198C1.43525 20.1976 0.751507 22.9156 0.901931 24.0974C1.33953 27.2225 2.91213 29.0082 5.90693 29.783C7.19236 30.1112 9.68119 30.0718 10.6795 29.7173C11.5273 29.4153 11.6777 29.2577 11.5136 28.8507C11.4589 28.7062 11.3632 28.1679 11.3085 27.6821C11.2128 26.8548 11.1854 26.8023 10.9119 26.8811C10.7615 26.9205 9.94101 26.9861 9.10685 27.0387C7.21971 27.1306 6.45392 26.9336 5.56506 26.0932C4.77192 25.3317 4.48474 24.4388 4.56679 22.955C4.66252 21.1955 5.30523 20.2764 6.85049 19.7117C7.71201 19.4097 9.28462 19.3703 10.2008 19.6461C10.5701 19.7643 10.9393 19.8562 11.035 19.8562C11.2264 19.8562 11.8145 17.3482 11.6504 17.1907C11.5957 17.125 11.0897 16.9674 10.5427 16.823C9.40769 16.5341 7.62996 16.5079 6.45392 16.7573Z", fill: "#EA4E37", __source: {
                fileName: _jsxFileName,
                lineNumber: 29
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M57.0646 16.7808C54.1382 17.5293 52.2374 20.116 52.2237 23.333C52.21 26.9308 54.2613 29.4388 57.6389 29.964C59.9226 30.3054 62.7944 29.1499 63.9567 27.4035C64.9003 25.9854 65.1738 24.9875 65.1601 23.1754C65.1328 20.4968 63.9157 18.304 61.8782 17.3192C60.4013 16.597 58.5688 16.3869 57.0646 16.7808ZM59.991 19.6433C61.044 20.2473 61.7004 21.6654 61.7004 23.3593C61.7004 25.749 60.4833 27.3247 58.6782 27.2591C58.268 27.2459 57.7347 27.1409 57.5022 27.0227C56.8185 26.6945 56.1074 25.7359 55.8475 24.843C55.8202 24.738 55.7928 24.0552 55.7792 23.333C55.7655 21.7836 56.08 20.8382 56.8595 20.0766C57.6526 19.2756 59.0064 19.0918 59.991 19.6433Z", fill: "#EA4E37", __source: {
                fileName: _jsxFileName,
                lineNumber: 30
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M15.2729 16.7825C15.1224 16.8088 14.6438 16.8613 14.2199 16.9007L13.4268 16.9795V23.3347V29.6899L14.2199 29.795C14.6438 29.8475 16.0523 29.9 17.3241 29.9C20.8932 29.9 22.4932 29.5061 23.7239 28.3506C24.2572 27.8385 24.5034 27.484 24.6812 26.9325C24.982 26.0002 24.9683 25.7901 24.6401 24.8841C24.3119 23.9781 23.929 23.571 22.9171 23.0852L22.1513 22.7176L22.5752 22.4681C22.8214 22.3236 23.0402 22.2186 23.0675 22.2186C23.1906 22.2186 23.6966 21.6802 24.0384 21.2075C24.476 20.5773 24.5034 19.343 24.0795 18.6733C23.1633 17.1896 21.5359 16.6906 17.7754 16.7168C16.5446 16.73 15.4233 16.7562 15.2729 16.7825ZM19.5668 19.2773C20.9069 19.5399 21.071 21.0237 19.8129 21.5358C19.6078 21.6277 18.9104 21.6934 18.2813 21.6934H17.119V20.5247C17.119 19.7106 17.1737 19.3298 17.2967 19.2905C17.5429 19.1854 19.0608 19.1854 19.5668 19.2773ZM20.0317 24.4902C20.6197 24.7397 20.9479 25.173 20.9479 25.7376C20.9479 26.8406 20.1001 27.3395 18.2403 27.3395H17.119V25.8558C17.119 25.0286 17.16 24.3195 17.2284 24.267C17.3788 24.1094 19.4847 24.2801 20.0317 24.4902Z", fill: "#EA4E37", __source: {
                fileName: _jsxFileName,
                lineNumber: 31
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M41.6399 16.8353C41.1066 16.8879 40.6006 16.9798 40.5186 17.0192C40.4092 17.0848 40.3682 19.0413 40.3682 23.4007V29.7034L40.6827 29.769C40.8468 29.8084 41.6946 29.8216 42.5561 29.8084L44.1287 29.769L44.1561 27.6287L44.1834 25.5016L45.6603 25.4359C48.2996 25.344 50.1047 24.5168 50.8568 23.0724C52.0191 20.8402 51.2123 18.306 49.038 17.3474C47.6569 16.7434 44.621 16.5333 41.6399 16.8353ZM46.5355 19.4615C47.2193 19.6453 47.6295 20.118 47.7116 20.8139C47.7799 21.3129 47.7252 21.4836 47.4107 21.8906C46.8774 22.5603 46.6039 22.6654 45.3321 22.7441L44.2108 22.8098L44.1698 21.1291C44.1424 20.1968 44.1561 19.409 44.1834 19.3827C44.2928 19.2776 46.0569 19.3302 46.5355 19.4615Z", fill: "#EA4E37", __source: {
                fileName: _jsxFileName,
                lineNumber: 32
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M29.0994 18.3723C28.8122 19.2258 28.4977 20.1581 28.402 20.447C28.3062 20.7359 28.0874 21.3793 27.9233 21.8914C27.4584 23.3751 26.1593 27.3143 25.7354 28.5223C25.2704 29.8617 25.202 29.8091 27.2396 29.8223C29.1541 29.8354 29.2088 29.8091 29.4002 29.0738C29.4959 28.7324 29.6737 28.0496 29.8105 27.5638L30.0566 26.6709H32.0805C33.1882 26.6578 34.118 26.6841 34.1454 26.7103C34.1591 26.7234 34.3779 27.3668 34.624 28.1284C34.8702 28.89 35.13 29.5859 35.212 29.6778C35.3214 29.8091 35.8137 29.8485 37.2086 29.8223C38.2342 29.8091 39.1094 29.7829 39.1504 29.7566C39.1914 29.7304 38.8085 28.5092 38.2889 27.0517C37.7692 25.5811 37.2222 24.0317 37.0855 23.5983C36.9487 23.165 36.3607 21.4712 35.7727 19.8167L34.7061 16.8361H32.1625H29.6053L29.0994 18.3723ZM32.6412 21.0379C32.9147 21.9439 33.2292 22.9024 33.3386 23.1782C33.6941 24.071 33.6941 24.071 32.1352 24.0317C30.7267 23.9923 30.7267 23.9923 30.7404 23.664C30.7814 23.0731 31.9301 19.1864 32.0395 19.2915C32.0942 19.344 32.3677 20.1319 32.6412 21.0379Z", fill: "#EA4E37", __source: {
                fileName: _jsxFileName,
                lineNumber: 33
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M66.4863 23.2697V29.7038L66.8145 29.7826C67.4162 29.927 70.1102 29.7826 70.1238 29.5987C70.1375 29.5199 70.1512 27.2483 70.1649 24.5828L70.1785 19.7245H72.9819H75.7852V18.2801V16.8357H71.1358H66.4863V23.2697Z", fill: "#EA4E37", __source: {
                fileName: _jsxFileName,
                lineNumber: 34
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M16.5742 32.0798C16.5742 32.1586 16.834 32.7101 17.1486 33.2879C19.9793 38.5926 24.7108 42.5712 30.4542 44.4883C33.3533 45.4731 35.4865 45.7751 38.8506 45.6832C42.283 45.6044 44.2932 45.1974 47.4657 43.9237C52.3613 41.9935 56.6826 38.0937 59.1988 33.3798C59.5133 32.7626 59.7868 32.198 59.7868 32.1061C59.7868 31.9748 58.2005 31.9354 52.1699 31.9354H44.5667L43.1855 32.5788C41.312 33.4586 40.1634 33.708 38.1121 33.6949C36.1293 33.6818 34.8712 33.3929 33.0798 32.5263L31.8901 31.9354H24.2321C18.7622 31.9354 16.5742 31.9748 16.5742 32.0798ZM26.3654 32.8414C29.3876 36.321 34.1601 38.3038 38.9326 38.0674C39.7668 38.028 40.8744 37.9099 41.3941 37.7917C44.4573 37.1614 47.6982 35.3888 49.6537 33.2747C50.4742 32.3687 50.5426 32.3293 51.1169 32.3293C51.4451 32.3293 51.7186 32.3818 51.7186 32.4475C51.7186 32.5132 51.4314 32.8939 51.0896 33.2879L50.4742 34.0232L51.1443 34.6535C51.5135 34.9948 51.8827 35.4019 51.9784 35.5463C52.1152 35.7958 52.1699 35.7696 52.7442 35.1524C53.3869 34.4696 54.7271 32.6313 54.7271 32.4475C54.7271 32.3818 55.0416 32.3293 55.4108 32.3293C55.7937 32.3293 56.0946 32.3687 56.0946 32.4212C56.0946 32.8152 54.1801 35.3625 52.963 36.5837C49.9819 39.5643 46.4675 41.4289 42.0778 42.3349C40.2727 42.7025 36.4301 42.7419 34.5567 42.3874C30.2217 41.5864 26.1876 39.4593 23.2475 36.413C22.4271 35.5463 20.2664 32.6707 20.2664 32.4212C20.2664 32.3687 20.5673 32.3293 20.9365 32.3293C21.5929 32.3293 21.6202 32.3425 21.9895 32.9465C22.6048 33.9707 24.0817 35.7433 24.3142 35.7433C24.3826 35.7433 24.574 35.5201 24.7518 35.2443C24.9296 34.9817 25.2851 34.6009 25.5313 34.4171L25.9962 34.0757L25.3125 33.2747C24.9432 32.8414 24.6424 32.4475 24.6424 32.4081C24.6424 32.3162 25.3672 32.2505 25.6817 32.3293C25.8458 32.3687 26.1466 32.5919 26.3654 32.8414ZM24.3005 32.7232C24.615 33.0515 24.4783 33.603 24.027 33.8C23.3159 34.102 22.6595 33.1959 23.2202 32.6707C23.5074 32.3818 23.9997 32.4081 24.3005 32.7232ZM53.1955 32.8808C53.4143 33.3404 53.2228 33.7343 52.7305 33.8525C52.2929 33.9575 51.8554 33.5899 51.8554 33.104C51.8554 32.395 52.8673 32.2374 53.1955 32.8808Z", fill: "#01628F", __source: {
                fileName: _jsxFileName,
                lineNumber: 35
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M26.4741 34.3515C25.4484 34.7848 24.5049 36.0191 24.5049 36.9383C24.5049 37.0564 24.8194 37.4372 25.216 37.7786C26.1048 38.5402 28.3065 39.9452 28.6073 39.9452C28.9492 39.9452 29.9475 39.2099 30.2483 38.724C30.6312 38.1463 30.8363 37.3716 30.7269 36.9514C30.6586 36.6888 30.3304 36.3999 29.5236 35.9009C28.9082 35.5202 28.1287 34.9687 27.8005 34.6929C27.1305 34.1152 27.0894 34.102 26.4741 34.3515ZM29.8107 37.0302C30.0159 37.5817 29.8654 38.0806 29.3321 38.5796C28.9902 38.9079 28.7578 39.026 28.4022 39.026C28.1561 39.026 27.9099 38.9735 27.8689 38.921C27.8279 38.8553 28.0467 38.5796 28.3338 38.3039C28.6347 38.015 28.9766 37.5423 29.0996 37.2271C29.3595 36.5706 29.6193 36.505 29.8107 37.0302Z", fill: "#01628F", __source: {
                fileName: _jsxFileName,
                lineNumber: 36
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M48.23 34.9573C47.7104 35.3906 46.9173 35.929 46.4933 36.1653C45.7275 36.5855 45.7139 36.6118 45.7002 37.1632C45.7002 37.4652 45.7822 37.9117 45.8916 38.1612C46.1515 38.7783 46.9173 39.5661 47.4643 39.7762C47.9018 39.9601 47.9565 39.9469 48.7634 39.4742C49.7343 38.8965 50.9377 38.0299 51.4847 37.5178C52.0727 36.94 51.9359 36.0603 51.0881 35.1017C50.7052 34.6684 49.789 34.1695 49.3924 34.1826C49.283 34.1826 48.7634 34.5371 48.23 34.9573ZM50.418 35.5219C50.9513 36.034 51.1291 36.5461 50.9513 37.0319C50.7599 37.5703 50.5137 37.5178 50.2266 36.9006C50.0898 36.5855 49.748 36.1259 49.4745 35.8896C48.8454 35.2987 48.8454 35.0886 49.4745 35.0886C49.8437 35.0886 50.0761 35.1936 50.418 35.5219Z", fill: "#01628F", __source: {
                fileName: _jsxFileName,
                lineNumber: 37
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M30.9592 38.2125C30.8772 38.4882 30.59 38.9478 30.3302 39.2367L29.8516 39.775L30.9182 40.1952C31.9028 40.5891 34.2138 41.2588 34.5694 41.2588C34.6651 41.2588 34.7608 40.8911 34.8019 40.3003C34.8429 39.7882 34.8976 39.2498 34.9249 39.1054C34.9523 38.9084 34.8019 38.8296 34.0087 38.6195C33.4891 38.4882 32.6412 38.2387 32.1216 38.0549C31.6156 37.858 31.178 37.7135 31.1507 37.7135C31.137 37.7135 31.0413 37.9367 30.9592 38.2125ZM33.2976 39.0397C33.4891 39.3417 33.2976 39.9195 32.9694 40.0114C32.2447 40.2346 31.684 39.6437 32.0259 39.0134C32.1489 38.8034 32.2857 38.764 32.6686 38.7902C32.9421 38.8165 33.2156 38.9215 33.2976 39.0397Z", fill: "#01628F", __source: {
                fileName: _jsxFileName,
                lineNumber: 38
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M43.8555 38.1852C43.1854 38.4216 42.3512 38.6579 42.0367 38.6973C41.5034 38.7892 41.4487 38.8286 41.5308 39.0781C41.5718 39.2226 41.6538 39.7872 41.6949 40.2993C41.7769 41.2447 41.7769 41.2578 42.1324 41.179C43.4589 40.8901 44.2521 40.6538 45.3187 40.2467L46.5358 39.7872L46.1802 39.3407C45.9751 39.0912 45.7016 38.6185 45.5512 38.3034C45.4007 37.9751 45.2366 37.7257 45.1819 37.7257C45.1272 37.7388 44.5392 37.9358 43.8555 38.1852ZM44.1153 38.8024C44.4162 39.0125 44.3751 39.7872 44.0469 39.9841C43.7324 40.168 43.1307 39.9841 43.035 39.669C42.8982 39.2882 43.0623 38.7892 43.3495 38.7236C43.7598 38.6185 43.8692 38.6317 44.1153 38.8024Z", fill: "#01628F", __source: {
                fileName: _jsxFileName,
                lineNumber: 39
            }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M35.8286 38.5514C35.1449 39.0503 34.9534 40.8098 35.4868 41.7158C35.7876 42.2411 35.8013 42.2411 36.8132 42.333C37.7841 42.4118 39.8217 42.3592 40.4644 42.2279C41.1618 42.0966 41.5584 40.3371 41.1208 39.3261C40.6969 38.3675 40.7106 38.3675 38.2628 38.3675C36.6491 38.3807 35.9927 38.42 35.8286 38.5514ZM40.1362 39.2604C40.902 40.0745 40.6695 41.4138 39.6986 41.7158C39.3841 41.8078 39.3704 41.7946 39.4798 41.3088C39.6166 40.626 39.6302 40.1139 39.4935 39.5099C39.3978 39.0766 39.4114 39.0241 39.6439 39.0241C39.7943 39.0241 40.0131 39.1291 40.1362 39.2604Z", fill: "#01628F", __source: {
                fileName: _jsxFileName,
                lineNumber: 40
            }
        })
    );
};
/* harmony default export */ __webpack_exports__["a"] = (SVG);

/***/ }),

/***/ "./pages/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__ = __webpack_require__("styled-jsx/style");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Header__ = __webpack_require__("./components/Header.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Layout_js__ = __webpack_require__("./components/Layout.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_next_head__ = __webpack_require__("next/head");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_next_head___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_next_head__);
var _jsxFileName = 'C:\\Users\\user\\Desktop\\job\\erp\\front\\commerce\\pages\\index.js';







/* harmony default export */ __webpack_exports__["default"] = (function () {
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        {
            className: 'jsx-2352547609',
            __source: {
                fileName: _jsxFileName,
                lineNumber: 6
            }
        },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_next_head___default.a, {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 7
            }
        }),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_Layout_js__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 10
            }
        }),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_Header__["a" /* default */], {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 10
            }
        }),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_styled_jsx_style___default.a, {
            styleId: '2352547609',
            css: 'body{font-family:\'Open Sans Condensed\',sans-serif;src:url(\'fonts/OpenSans-Bold.ttf\');}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFXdUIsQUFHdUQsNkNBQ1AsbUNBQ3ZDIiwiZmlsZSI6InBhZ2VzXFxpbmRleC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy91c2VyL0Rlc2t0b3Avam9iL2VycC9mcm9udC9jb21tZXJjZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYWluIGZyb20gJy4uL2NvbXBvbmVudHMvSGVhZGVyJ1xyXG5pbXBvcnQgTGF5b3V0IGZyb20gJy4uL2NvbXBvbmVudHMvTGF5b3V0LmpzJ1xyXG5cclxuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICgpID0+IDxkaXY+XHJcbiAgICAgIDxIZWFkPlxyXG4gICAgICAgIDwvSGVhZD5cclxuXHJcbiAgICA8TGF5b3V0Lz48TWFpbi8+XHJcblxyXG4gICAgPHN0eWxlIGdsb2JhbCBqc3g+e2BcclxuICAgICAgICAgIGJvZHkge1xyXG4gICAgICAgIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zIENvbmRlbnNlZCcsIHNhbnMtc2VyaWY7XHJcbiAgICAgICAgICAgIHNyYzogdXJsKCdmb250cy9PcGVuU2Fucy1Cb2xkLnR0ZicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBgfTwvc3R5bGU+XHJcbiAgICA8L2Rpdj4iXX0= */\n/*@ sourceURL=pages\\index.js */'
        })
    );
});

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./pages/index.js");


/***/ }),

/***/ "antd/lib/auto-complete":
/***/ (function(module, exports) {

module.exports = require("antd/lib/auto-complete");

/***/ }),

/***/ "antd/lib/input":
/***/ (function(module, exports) {

module.exports = require("antd/lib/input");

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