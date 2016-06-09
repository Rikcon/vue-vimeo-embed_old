# Vue Vimeo Embed
This is a component for Vue.js to utilize Vimeo iframe API easily.
This is based on [Vue YouTube Embed](https://github.com/kaorun343/vue-youtube-embed)

## License
MIT License

## install

```html
<script src="vue-vimeo-embed.js"></script>
<script>
    Vue.use(VueYouTubeEmbed)
</script>
```

or

```bash
npm install --save vue-vimeo-embed
```

```js
'use strict'
import Vue from 'vue'
import VueVimeoEmbed from 'vue-vimeo-embed'
Vue.use(VueVimeoEmbed)
```

## Requirement
* Vue.js

## Usage
Please pass the ID of the video that you'd like to show.

```html
<vimeo :video-id="videoId"></vimeo>
```

### Props

These are available props.
* `player-width`: `String`, default value is `640`
* `player-height`: `String`, default value is `390`
* `video-id`: `String`, `required`

### Events
These are the events that will be emitted by the component.
* `ready`
* `loadProgress`
* `playProgress`
* `play`
* `pause`
* `finish`
* `seek`

The first argument is an instance of Froogaloops ( Vimeo official API wrapper).

## Example

```html
<div id="#app">
  <section>
    <h2>listening events</h2>
    <vimeo :video-id="videoId" v-on:ready="ready" v-on:playing="playProgress"></vimeo>
  </section>
  <section>
    <h2>add options</h2>
    <vimeo :video-id="videoId" player-width="1280" player-height="750" :loop="1" :autoplay="1"></vimeo>
  </section>
</div>
```

```js
'use strict'
import Vue from 'vue'
import VueVimeoEmbed from 'vue-youtube-embed'

Vue.use(VueVimeoEmbed)

const app = new Vue({
  el: '#app',
  data: {
    videoId: 'videoId',
    playerApi: {}
  },
  methods: {
    ready(player) {
      this.playerApi = player;
    },
    playing(player) {
      // The player is playing a video.
    },
    pause(player) {
      player.api.('pause');
    }
  }
})
```


## Contribution
* contribution welcome!
