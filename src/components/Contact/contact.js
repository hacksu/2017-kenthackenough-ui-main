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
        replyTo: '',
        body: '',
      },
    };
  },

  methods: {
    check() {
      //console.log('Checked');
      if (this.ticket.subject === '' || this.ticket.name === '' || this.ticket.replyTo === '' || this.ticket.body === '') {
        document.getElementById('contactButton').textContent = 'Ticket Failed to Send :(';
      } else {
        document.getElementById('contactButton').textContent = 'Ticket Successfully Sent!';
      }
    },

    sendMessage() {
      return axios.post(`${API_BASE}/tickets`, this.ticket)
      .then((response) => {
        console.log('Ticket sent', response.data);
      })
      .catch((error) => {
        // Handle error...
        console.log(error);
        console.log('API responded with:', error.response.data);

        throw error;
      });
    }
  },

  mounted: function() {

  }

});
