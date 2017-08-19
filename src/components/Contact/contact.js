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
      infoMessage: '',
      canSend: true,
    };
  },

  methods: {
    check() {
      if (!this.canSend) { return; } // Ensure there's no double sending

      this.infoMessage = '';
      //console.log('Checked');
      if (this.ticket.subject === '') {
        this.infoMessage += 'Please add a subject to your message. ';
      } if (this.ticket.name === '') {
        this.infoMessage += 'Please fill out your name. ';
      } if (this.ticket.replyTo === '') {
        this.infoMessage += 'Please fill out your email. ';
      } if (this.ticket.body === '') {
        this.infoMessage += 'Your message can\'t be blank. ';
      } else {
        this.sendMessage();
      }
    },

    sendMessage() {
      this.canSend = false;
      
      return axios.post(`${API_BASE}/tickets`, this.ticket)
      .then((response) => {
        console.log('Ticket sent', response);
        this.infoMessage = 'Thanks! Your message was received.';

        this.ticket.subject = '';
        this.ticket.name = '';
        this.ticket.repyTo = '';
        this.ticket.body = '';

        this.canSend = true;
      })
      .catch((error) => {
        // Handle error...
        console.log(error);
        this.infoMessage = 'Message Failed to Send. Try again in a bit.';
        this.canSend = true;
        
        console.log('API responded with:', error.response.data);
        throw error;
      });
    }
  },

  mounted: function() {
    // Auto populate form if logged in.
    if (this.$root.isLoggedIn()) {
      if (this.$root.$data.user.email) {
        this.ticket.replyTo = this.$root.$data.user.email;
      }

      if (this.$root.$data.user.application.name) {
        this.ticket.name = this.$root.$data.user.application.name;
      }
    }
  }

});
