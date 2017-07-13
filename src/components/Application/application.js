import Vue from 'vue';

import template from './application.html';

import './application.scss';

export default Vue.extend({
  template,

  components: {},

  data() {
    return {
      appData: {
        name: 'Nick Crawfprd',
        email: 'ncrawfo7@kent.edu',
        school: 'Kent State University',
        shirt: 'shirt-large', // Could also be 'hoodie-small' etc.
        age: 20,
        year: 'Senior', // High School, Freshman, Soph, Jun, Senior, Grad Student, Mentor
        travel: {
          required: true,
          fromWhere: 'Garrettsville, OH'
        },
        dietary: 'Vegetarian',
        major: 'Comp Sci',
        gender: 'Male',
        resume: null,
        link: 'github.com/NickCrawford',
        rsvp: 'going',
        status: 'rejected'
      }
    };
  },

  methods: {

  },

  mounted: function() {

  }

});
