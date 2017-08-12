import Vue from 'vue';
import axios from 'axios';

import template from './contact.html';

import './contact.scss';

import { API_BASE } from 'src/config/constants';

export default Vue.extend({
  template,

  components: {
  },

  data() {
    return {
      ticket: {
        subject: '',
        name: '',
        repyTo: '',
        body: '',
      },
    };
  },

  methods: {
    sendMessage() {
      return axios.post(`${API_BASE}/tickets`, this.ticket)
      .then((response) => {
        document.getElementById('contactButton').textContent = 'Message Successfully Sent!';
        console.log('Ticket sent', response.data);
      })
      .catch((error) => {
        // Handle error...
        document.getElementById('contactButton').textContent = 'Message Failed to Send :(';
        console.log('API responded with:', error.response.data);

        throw error;
      });
    }
  },

  mounted: function() {

  }

});
