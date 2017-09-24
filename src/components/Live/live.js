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
      events: [{
        _id: 'String',
        title: 'String',
        description: 'String',
        start: 'Date',
        end: 'Date',
        type: 'String',
        icon: 'String',
        location: 'String',
        group: 'String',
        notify: false,
        hide: true
      },
      {
        _id: 'String',
        title: 'String',
        description: 'String',
        start: 'Date',
        end: 'Date',
        type: 'String',
        icon: 'String',
        location: 'String',
        group: 'String',
        notify: false,
        hide: false
      }],
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
    // var eventData = this.$root.getEvents();
    this.$root.getUpdates()
    .then((messages) => {
      console.log(messages);
      this.updates = messages;
    });
  }
});
