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
    'use strict';

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
  props: ['playerHeight', 'playerWidth', 'videoId'],
  template: '<div><iframe :id="elementId" :src="src"  :width="playerWidth" height="playerHeight" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>',
  watch: {
    playerWidth: 'setSize',
    playerHeight: 'setSize',
    videoId: 'update'
  },
  data: function data() {
    pid += 1;
    return {
      elementId: 'vimeo-player-' + pid,
      src: '//player.vimeo.com/video/' + this.videoId + '/?api=1&player_id=' + this.elementId
    };
  },

  methods: {
    setSize: function setSize() {
      this.player.setSize(this.playerWidth || '640', this.playerHeight || '390');
    },
    update: function update(videoId) {
      this.player.api('loadVideo', videoId);
      // this.src = '//player.vimeo.com/video/' + this.videoId + '/?api=1&player_id=' + this.elementId;
    }
  },
  created: function created() {
    var _this = this;

    this.player = $f(this.elementId);
    this.player.addEvent('ready', function () {
      _this.$emit('ready', _this.player);

      _this.player.addEvent('pause', function () {
        _this.$emit('pause', _this.player);
      });
      _this.player.addEvent('finish', function () {
        _this.$emit('finish', _this.player);
      });
      _this.player.addEvent('playProgress', function () {
        _this.$emit('playProgress', _this.player);
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

  var tag = document.createElement('script');
  tag.src = "//f.vimeocdn.com/js/froogaloop2.min.js";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = function () {};
}

exports.default = {
  VimeoPlayer: VimeoPlayer, install: install
};

/***/ }
/******/ ])
});
;