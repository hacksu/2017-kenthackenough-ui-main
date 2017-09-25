import Vue from 'vue';

import template from './live.html';

import './live.scss';

export default Vue.extend({
  template,

  components: {

  },

  data() {
    return {
      test: 'asohgfa;sdhg',
      events: [],
      updates: [],
    };
  },

  methods: {
    toggleVisibility(e) {
      e.hide = !e.hide;
    }
  },

  mounted() {
    console.log('mounted');
    this.$root.getEvents()
    .then((events) => {
      console.log(events);
      this.events = events;
      for (var e in this.events){
        Vue.set(this.events[e], 'hide', true);
      }
    });
    this.$root.getUpdates()
    .then((messages) => {
      console.log(messages);
      this.updates = messages;
    });
  }
});
