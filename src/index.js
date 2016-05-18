'use strict'

if (!String.prototype.includes) {
  String.prototype.includes = function() {
    'use strict'
    return String.prototype.indexOf.apply(this, arguments) !== -1
  }
}

const events = {
  0: 'ready',
  1: 'loadProgress',
  2: 'playProgress',
  3: 'play',
  5: 'pause',
  6: 'finish',
  7: 'seek'
};

let pid = 0;

export const VimeoPlayer = {
  props: ['playerHeight', 'playerWidth', 'videoId'],
  template: '<div><iframe :id="elementId" :src="src"  :width="playerWidth" height="playerHeight" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>',
  watch: {
    playerWidth: 'setSize',
    playerHeight: 'setSize',
    videoId: 'update'
  },
  data() {
    pid += 1;
    return {
      elementId: `vimeo-player-${pid}`,
      src: '//player.vimeo.com/video/' + this.videoId + '/?api=1&player_id=' + this.elementId
    }
  },
  methods: {
    setSize() {
      this.player.setSize(this.playerWidth || '640', this.playerHeight || '390')
    },
    update(videoId) {
      this.player.api('loadVideo', videoId);
      // this.src = '//player.vimeo.com/video/' + this.videoId + '/?api=1&player_id=' + this.elementId;
    }
  },
  created() {
        this.player = $f(this.elementId);
        this.player.addEvent('ready', () => {
        this.$emit('ready', this.player);

        this.player.addEvent('pause',  () => {
          this.$emit('pause', this.player)
        });
        this.player.addEvent('finish', () => {
          this.$emit('finish', this.player)
        });
        this.player.addEvent('playProgress', () => {
          this.$emit('playProgress', this.player)
        });
      });
  },
  beforeDestroy() {
    if (this.player !== null) {
      this.player.destroy()
    }
    delete this.player
  }
};

export function install(Vue) {
  Vue.component('vimeo', VimeoPlayer);

  const tag = document.createElement('script');
  tag.src = "//f.vimeocdn.com/js/froogaloop2.min.js";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = function() {

  }
}

export default {
   VimeoPlayer, install
}
