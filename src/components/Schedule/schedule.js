import Vue from 'vue';

import { eventsResource } from 'src/util/resources';

import template from './schedule.html';

import './schedule.scss';

export default Vue.extend({
  template,

  name: 'schedule',

  data() {
    return {
      all: [],
      days: {
        'Sunday': [],
        'Monday': [],
        'Tuesday': [],
        'Wednesday': [],
        'Thursday': [],
        'Friday': [],
        'Saturday': []
      },
      errMsg: '',
    };
  },

  mounted() {
    this.getEvents();
  },

  methods: {
    getEvents() {
      eventsResource.get('/')
      .then((response) => {
        this.all = response.data.events;
        this.refresh();
      })
      .catch((error) => {
        this.errMsg = 'There was a problem retrieving the schedule';
        console.log('There was a problem retrieving the schedule', error);
      });
    },

    refresh() {
      console.log('refresh called');
      // sort events
      this.all = this.all.sort((a, b) => {
        if (a.start > b.start) return 1;
        if (a.start < b.start) return -1;
        return 0;
      });
      
      // split out by day
      var days = [
        'Sunday', 'Monday',
        'Tuesday', 'Wednesday',
        'Thursday', 'Friday',
        'Saturday'
      ];

      for (var i = 0; i < this.all.length; i++) {
        var day = new Date(this.all[i].start).getDay();

        console.log(i, day);

        if (this.all[i].start === this.all[i].end) {
          this.all[i].singleTime = true; // only display the start time
        }
        if (this.days[days[day]]) {
          this.days[days[day]].push(this.all[i]);
        } else {
          this.days[days[day]] = [this.all[i]];
        }
      }
    },
  },
});
