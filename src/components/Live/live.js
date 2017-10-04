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
      leaderboard: [],
    };
  },

  methods: {
    toggleVisibility(e) {
      e.hide = !e.hide;
    },
    now(e) {
      var start = new Date(e.start);
      var end = new Date(e.end);
      var now = new Date();
      return start < now && now < end;
    }
  },

  mounted() {
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
      this.updates = messages;
    });
    this.$root.getLeaderboard()
    .then((scores) => {
      this.leaderboard = scores;
    });
  }
});
