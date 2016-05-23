
if (!String.prototype.includes) {
    String.prototype.includes = function () {
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
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
    props: {
        playerHeight:{} , playerWidth:{} , videoId: { required: true }
    },
    template: '<div><iframe :id="elementId" :src="src"  :width="playerWidth" :height="playerHeight" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>',
    watch: {
        videoId: 'update'
    },
    data() {
        pid += 1;
        return {
            elementId: `vimeo-player-${pid}`,
            src: '//player.vimeo.com/video/' + this.videoId + '/?api=1&player_id=' + `vimeo-player-${pid}`,
            mypid: pid
        };
    },
    methods: {
        setSize(width, height) {
            this.playerWidth = width;
            this.playerHeight = height;
        },
        update(videoId) {
            this.src = '//player.vimeo.com/video/' + videoId + '/?api=1&player_id=' + `vimeo-player-${this.mypid}`;
        },
    },
    ready() {
        this.player = $f(this.elementId);
        this.player.addEvent('ready', () => {
            this.$emit('ready', this.player);

            this.player.addEvent('pause', () => {
                this.$emit('pause', this.player)
            });

            this.player.addEvent('play', () => {
                this.$emit('play', this.player)
            });

            this.player.addEvent('finish', () => {
                this.$emit('finish', this.player)
            });

            this.player.addEvent('playProgress', (data) => {
                this.$emit('playprogress', this.player, data)
            });

            this.player.addEvent('loadProgress', (data) => {
                this.$emit('loadprogress', this.player, data)
            });

            this.player.addEvent('seek', (data) => {
                this.$emit('seek', this.player, data)
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

    /*    const tag = document.createElement('script');
     tag.src = "http://esells.incosm/assets/frooga.js";
     const firstScriptTag = document.getElementsByTagName('script')[0];
     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);*/
}

export default {
    VimeoPlayer, install
}
