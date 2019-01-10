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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./admin.js":
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./node_modules/@fof/components/admin/settings/items/SettingItem.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@fof/components/admin/settings/items/SettingItem.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SettingItem; });
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_0__);


class SettingItem extends flarum_Component__WEBPACK_IMPORTED_MODULE_0___default.a {
    init() {
        this.key = this.props.key;
        this.cast = this.props.cast || (a => a);
    }

    setting() {
        return app.modal.component.setting(this.key);
    }

    getValue() {
        return this.cast(this.setting()());
    }
}


/***/ }),

/***/ "./node_modules/@fof/components/admin/settings/items/StringItem.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@fof/components/admin/settings/items/StringItem.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StringItem; });
/* harmony import */ var _SettingItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SettingItem */ "./node_modules/@fof/components/admin/settings/items/SettingItem.js");


class StringItem extends _SettingItem__WEBPACK_IMPORTED_MODULE_0__["default"] {
    view() {
        const attrs = Object.assign({}, this.props);
        const label = this.props.label || this.props.children;

        attrs.className = 'FormControl ' + (attrs.className || '');
        attrs.value = this.getValue();
        attrs.onchange = attrs.onchange || m.withAttr('value', this.setting());

        return attrs.simple
            ? m('input', attrs)
            : m('div.Form-group', [m('label', label), m('input', attrs)]);
    }
}


/***/ }),

/***/ "./src/admin/components/RecaptchaSettingsModal.js":
/*!********************************************************!*\
  !*** ./src/admin/components/RecaptchaSettingsModal.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RecaptchaSettingsModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/SettingsModal */ "flarum/components/SettingsModal");
/* harmony import */ var flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Select */ "flarum/components/Select");
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Select__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fof_components_admin_settings_items_StringItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fof/components/admin/settings/items/StringItem */ "./node_modules/@fof/components/admin/settings/items/StringItem.js");





var RecaptchaSettingsModal =
/*#__PURE__*/
function (_SettingsModal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RecaptchaSettingsModal, _SettingsModal);

  function RecaptchaSettingsModal() {
    return _SettingsModal.apply(this, arguments) || this;
  }

  var _proto = RecaptchaSettingsModal.prototype;

  _proto.className = function className() {
    return 'FofRecaptchaSettingsModal Modal--medium';
  };

  _proto.title = function title() {
    return 'FriendsOfFlarum reCAPTCHA';
  };

  _proto.form = function form() {
    return [m("p", null, app.translator.trans('fof-recaptcha.admin.settings.help_text', {
      a: m("a", {
        href: "http://www.google.com/recaptcha/admin",
        target: "_blank"
      })
    })), m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('fof-recaptcha.admin.settings.type_label')), flarum_components_Select__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      options: {
        checkbox: 'Checkbox',
        invisible: 'Invisible'
      },
      value: this.setting('fof-recaptcha.type')() || 'checkbox',
      onchange: this.setting('fof-recaptcha.type')
    })), m(_fof_components_admin_settings_items_StringItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
      key: "fof-recaptcha.credentials.site",
      required: true
    }, app.translator.trans('fof-recaptcha.admin.settings.site_key_label')), m(_fof_components_admin_settings_items_StringItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
      key: "fof-recaptcha.credentials.secret",
      required: true
    }, app.translator.trans('fof-recaptcha.admin.settings.secret_key_label'))];
  };

  return RecaptchaSettingsModal;
}(flarum_components_SettingsModal__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_RecaptchaSettingsModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/RecaptchaSettingsModal */ "./src/admin/components/RecaptchaSettingsModal.js");

app.initializers.add('fof/recaptcha', function () {
  app.extensionSettings['fof-recaptcha'] = function () {
    return app.modal.show(new _components_RecaptchaSettingsModal__WEBPACK_IMPORTED_MODULE_0__["default"]());
  };
});

/***/ }),

/***/ "flarum/Component":
/*!**************************************************!*\
  !*** external "flarum.core.compat['Component']" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Component'];

/***/ }),

/***/ "flarum/components/Select":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Select']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Select'];

/***/ }),

/***/ "flarum/components/SettingsModal":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['components/SettingsModal']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/SettingsModal'];

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map