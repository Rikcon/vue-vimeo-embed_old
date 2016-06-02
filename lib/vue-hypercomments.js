/*! Vue Hypercomments version 1.0.0 under MIT License copyright 2016 Rikcon */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueHypercomments"] = factory();
	else
		root["VueHypercomments"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.install = install;
if (!String.prototype.includes) {
    String.prototype.includes = function () {
        'use strict';

        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}

var pid = 0;

var container = exports.container = {
    scripts: [],

    run: function run() {
        var _this = this;

        this.scripts.forEach(function (callback) {
            callback(_this.HC_API);
        });
        this.scripts = [];
    },
    register: function register(callback) {
        var _this2 = this;

        if (this.HC_API) {
            this.Vue.nextTick(function () {
                callback(_this2.HC_API);
            });
        } else {
            this.scripts.push(callback);
        }
    }
};

var hypercomments = exports.hypercomments = {
    props: {
        xid: {
            default: ''
        },
        widget_id: {
            required: true
        },
        append: {
            default: ''
        },
        settings: {},
        language: ''

    },
    template: '<div :id="widget_dom_id"></div>',
    /*    watch: {
            'xid': 'changeXid'
        },*/
    data: function data() {
        pid += 1;
        return {
            widget_dom_id: 'hypercomments_widget_' + pid,
            mypid: pid,
            HC_API: {},
            test2: null
        };
    },

    methods: {
        changeXid: function changeXid(newXid, oldXid) {
            // let comment_div = vm.$el;

        }
    },
    created: function created() {
        var vm = this;
        if ("HC_LOAD_INIT" in window) return;
        window.HC_LOAD_INIT = true;

        var lang = 'ar';
        if (vm.language.length) {
            lang = vm.language;
        } else {
            lang = (navigator.language || navigator.systemLanguage || navigator.userLanguage || "en").substr(0, 2).toLowerCase();
        }

        var hcc = document.createElement("script");
        hcc.type = "text/javascript";
        hcc.async = true;
        hcc.src = ("https:" == document.location.protocol ? "https" : "http") + "://w.hypercomments.com/widget/hc/" + vm.widget_id + "/" + lang + "/widget.js";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hcc, s.nextSibling);

        hcc.onload = function () {
            console.log('script loaded');
            container.HC_API = window.HC;
            vm.HC_API = window.HC;
            vm.$nextTick(function () {
                container.run();
            });
        };
    },
    ready: function ready() {
        var _this3 = this;

        var vm = this;
        container.register(function (HC) {
            window._hcwp = window._hcwp || [];
            _hcwp.push(Object.assign({
                widget: "Stream",
                append: vm.append.length ? vm.append : '#' + _this3.widget_dom_id,
                widget_id: vm.widget_id,
                callback: function callback(app, init) {
                    vm.HC_API = window.HC;
                    vm.$emit('ready', app, init, comment_div);
                }
            }, _this3.settings));

            vm.$watch('xid', function (newVal, oldVal) {

                console.log(newVal, oldVal);
                vm.$el.innerHTML = '';
                var _hcp = Object.assign({
                    widget_id: vm.widget_id,
                    xid: newVal,
                    append: '#' + vm.widget_dom_id
                }, vm.settings);

                window.HC.widget("Stream", _hcp);
            });
        });
    },
    beforeDestroy: function beforeDestroy() {}
};

function install(Vue) {
    Vue.component('hypercomments', hypercomments);
}

exports.default = {
    hypercomments: hypercomments, install: install
};

/***/ }
/******/ ])
});
;