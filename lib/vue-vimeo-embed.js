/*! Vue Vimeo Embed version 0.0.2 under MIT License copyright 2016 Rikcon */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueVimeoEmbed"] = factory();
	else
		root["VueVimeoEmbed"] = factory();
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
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}

var events = {
    0: 'ready',
    1: 'loadProgress',
    2: 'playProgress',
    3: 'play',
    5: 'pause',
    6: 'finish',
    7: 'seek'
};

var pid = 0;

var VimeoPlayer = exports.VimeoPlayer = {
    props: {
        playerHeight: {}, playerWidth: {}, videoId: { required: true }
    },
    template: '<div><iframe :id="elementId" :src="src"  :width="playerWidth" :height="playerHeight" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>',
    watch: {
        videoId: 'update'
    },
    data: function data() {
        pid += 1;
        return {
            elementId: 'vimeo-player-' + pid,
            src: '//player.vimeo.com/video/' + this.videoId + '/?api=1&player_id=' + ('vimeo-player-' + pid),
            mypid: pid
        };
    },

    methods: {
        setSize: function setSize(width, height) {
            this.playerWidth = width;
            this.playerHeight = height;
        },
        update: function update(videoId) {
            this.src = '//player.vimeo.com/video/' + videoId + '/?api=1&player_id=' + ('vimeo-player-' + this.mypid);
        }
    },
    ready: function ready() {
        var _this = this;

        this.player = $f(this.elementId);
        this.player.addEvent('ready', function () {
            _this.$emit('ready', _this.player);

            _this.player.addEvent('pause', function () {
                _this.$emit('pause', _this.player);
            });

            _this.player.addEvent('play', function () {
                _this.$emit('play', _this.player);
            });

            _this.player.addEvent('finish', function () {
                _this.$emit('finish', _this.player);
            });

            _this.player.addEvent('playProgress', function (data) {
                _this.$emit('playprogress', _this.player, data);
            });

            _this.player.addEvent('loadProgress', function (data) {
                _this.$emit('loadprogress', _this.player, data);
            });

            _this.player.addEvent('seek', function (data) {
                _this.$emit('seek', _this.player, data);
            });
        });
    },
    beforeDestroy: function beforeDestroy() {
        if (this.player !== null) {
            this.player.destroy();
        }
        delete this.player;
    }
};

function install(Vue) {
    Vue.component('vimeo', VimeoPlayer);

    /*    const tag = document.createElement('script');
     tag.src = "http://esells.incosm/assets/frooga.js";
     const firstScriptTag = document.getElementsByTagName('script')[0];
     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);*/
}

exports.default = {
    VimeoPlayer: VimeoPlayer, install: install
};

/***/ }
/******/ ])
});
;