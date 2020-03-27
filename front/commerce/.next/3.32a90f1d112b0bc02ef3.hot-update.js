webpackHotUpdate(3,{

/***/ "./node_modules/antd/dist/antd.css":
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (15:5)\nYou may need an appropriate loader to handle this file type.\n| /* stylelint-disable at-rule-no-unknown */\n| html,\n| body {\n|   width: 100%;\n|   height: 100%;");

/***/ }),

/***/ "./pages/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/cjs/react.development.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Header__ = __webpack_require__("./components/Header.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_dist_antd_css__ = __webpack_require__("./node_modules/antd/dist/antd.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_antd_dist_antd_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_antd_dist_antd_css__);
var _jsxFileName = 'C:\\Users\\idontsudo\\Desktop\\job\\ERP_System\\front\\commerce\\pages\\index.js';


(function () {
  var enterModule = __webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;

  enterModule && enterModule(module);
})();


 // or 'antd/dist/antd.less'

var _default = function _default() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 4
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_Header__["a" /* default */], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 4
      }
    })
  );
};

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__("./node_modules/react-hot-loader/index.js").default;

  var leaveModule = __webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, 'default', 'C:/Users/idontsudo/Desktop/job/ERP_System/front/commerce/pages/index.js');
  leaveModule(module);
})();

;
    (function (Component, route) {
      if(!Component) return
      if (false) return
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=3.32a90f1d112b0bc02ef3.hot-update.js.map