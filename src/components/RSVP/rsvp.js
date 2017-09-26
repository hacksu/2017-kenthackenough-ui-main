import Vue from 'vue';

import template from './RSVP.html';

import './rsvp.scss';

import CustomizePerson from '../CustomizePerson/customizePerson.js';
import Person from '../Person/person.js';

export default Vue.extend({
  template,

  name: 'rsvp',

  components: {
    CustomizePerson,
    Person
  },

  data() {
    return {
      rsvpInProgress: true,
      isVisible: false,
      message: '',

    };
  },

  mounted: function() {
    setTimeout(() => {
      if (this.$root.isLoggedIn()) {
        this.checkRSVP();
      } else {
        console.log('not logged in. Log in to rsvp');
      }
    }, 500);
  },

  methods: {
    changeRSVP(newValue) {
      if (this.$root.user.application) {
        this.$root.user.application.going = newValue;

        this.$root.updateApplication()
        .then(() => {
          this.message = 'Thanks for RSVPing to Kent Hack Enough!';
        })
        .catch((err) => {
          console.log(err);
          this.$root.user.application.going = !newValue;
          this.message = 'There was an error updating your RSVP status. Please try again later.';
        });
      }
    },

    checkRSVP() {
      if (this.$route.query.going) {
        this.rsvpInProgress = true;

        if (this.$route.query.going === 'true') {
          this.changeRSVP(true);
          console.log('Going to KHE');
        } else {
          this.changeRSVP(false);
          console.log('Not Going to KHE');
        }
      } else {
        console.log('RSVP Not Given');
      }
    }
  }

});
