import Vue from 'vue';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth';
import AuthBearer from '@websanova/vue-auth';

import { LoadingState } from 'src/config/loading-state';
import { CLIENT_ID } from 'src/config/constants';
import { usersResource } from 'src/util/resources';
import Navigation from 'components/Navigation/navigation';
import Loader from 'components/Loader/loader';
import Person from 'components/Person/person';

Vue.use(VueRouter);
Vue.use(VeeValidate);

Vue.use(VueAxios, axios);

import 'src/config/http';
import routes from 'src/routes';
import 'src/style.scss';

export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
});

Vue.router = router;

Vue.axios.defaults.baseURL = 'https://api.khe.io/v1.0';

Vue.use(VueAuth, {
  auth: AuthBearer,
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
});

var app1 = new Vue({
  router,
  components: {
    Navigation,
    Loader,
    Person
  },

  data() {
    return {
      isLoading: false,
      navigationScroll: null,
      mainContentStyle: {},
      navigationStyle: {},
      token: '',
      user: {
        client: CLIENT_ID,
        email: '',
        password: ''
      },
      application: {
        'name': 'John Smith',           // full name
        'school': 'Kent State',         // name of school
        'phone': '1234567890',          // phone number
        'shirt': 'Small',          // t-shirt size
        'demographic': true,   // allowed to use demographic info?
        'first': false,         // is this your first hackathon?
        'dietary': '',        // food restrictions seperated by |
        'year': 'Senior',           // the year in school
        'age': 18,            // person's age
        'gender': 'male',         // gender
        'major': 'Comp Sci',          // degree
        'conduct': true,       // agree to MLH code of conduct?
        'travel': false,        // need travel reimbursement?
        'waiver': false,        // agreed to waiver?
        'resume': '',         // the filename of their resume
        'link': '',            // a github/linkedin link
      },
    };
  },

  created() {
    LoadingState.$on('toggle', (isLoading) => {
      this.isLoading = isLoading;
    });
    window.addEventListener('scroll', this.handleScroll); // Bind croll listener
    this.initStyles(); // Set our default styles for the navigation and main content.

    this.token = this.getMe().token;
    this.authorize();
    this.loadUserApplication();
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    // Handle scroll for showing navigation
    handleScroll() {
      this.navigationScroll = window.scrollY;

      var percentage = this.navigationScroll / this.$refs.navContainer.clientHeight;

      this.mainContentStyle = {
        opacity: 1.0 - percentage / 2,
        transform: 'scale(' + (1 - percentage / 8) + ')'
      };

    },

    initStyles() {
      this.mainContentStyle = {
        opacity: 1.0,
        transform: 'scale(1)'
      };
    },

    getMe() {
      var me = JSON.parse(localStorage.getItem('me'));

      if (me) {
        return me;
      } else {
        console.log('No user saved in local storage');
        return {
          token: '',
        };
      }
    },

    setMe(me) {
      localStorage.setItem('me', JSON.stringify(me));
    },

    /**
    * Adds authorization headers to a request object
    * @param req A request object to authorize
    * @return The request object with auth headers attached
    */
    authorize() {
      // refreshToken();
      var me = this.getMe();
      if (me) {
        var encoded = this.base64Encode(`${me.key}:${me.token}`);
        /* eslint-disable dot-notation */
        axios.defaults.headers.common['Authorization'] = `Basic ${encoded}`;
      }
    },

    loginUser() {
      return usersResource.post('/token', {
        client: CLIENT_ID,
        email: this.user.email,
        password: this.user.password
      })
      .then((response) => {
        console.log('Login successfull', response.data);
        
        this.setMe(response.data);
      })
      .catch((error) => {
        // Handle error...
        console.log('API responded with:', error.response.data);

        throw error;
      });
    },

    registerUser() {
      return usersResource.post('/', {
        client: CLIENT_ID,
        email: this.user.email,
        password: this.user.password
      })
      .then((response) => {
        console.log('Login successfull', response.data);
        
        this.setMe(response.data);
      })
      .catch((error) => {
        // Handle error...
        console.log('API responded with:', error.response.data);

        throw error;
      });
    },

    logoutUser() {
      localStorage.removeItem('me');
      return usersResource.delete('/token', {
        client: CLIENT_ID,
      });
    },

    isLoggedIn() {
      if (this.token !== '') {
        return true;
      } else {
        return false;
      }
    },

    recoverPassword() {
      return usersResource.post('/reset', {
        email: this.user.email,
      })
      .then((response) => {
        console.log('Reset successfull', response.data);
      })
      .catch((error) => {
        // Handle error...
        console.log('API responded with:', error.response.data);

        throw error;
      });
    },

    loadUserApplication() {
      return usersResource.get('/me/application')
      .then((response) => {
        console.log('user application loaded!', response.data);

        if (typeof response.data.application === 'undefined') {
          console.log('No application created yet.');

          this.createApplication();
        }

        this.user = response.data;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log('user not logged in yet');
        }
        // Handle error...
        console.log('API responded with:', error.response.data);

        this.user = {
          client: CLIENT_ID,
          email: '',
          password: ''
        };
      });
    },

    createApplication() {
      return usersResource.post('/application', this.application)
      .then((response) => {
        console.log('user application loaded!', response.data);

        this.user = response.data;
      })
      .catch((error) => {
        throw error;
      });
    },

    base64Encode(data) {
      //  discuss at: http://phpjs.org/functions/base64_encode/
      // original by: Tyler Akins (http://rumkin.com)
      // improved by: Bayron Guevara
      // improved by: Thunder.m
      // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // improved by: Rafał Kukawski (http://kukawski.pl)
      // bugfixed by: Pellentesque Malesuada
      var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = '',
        tmp_arr = [];
      if (!data) {
        return data;
      }
      data = unescape(encodeURIComponent(data));
      do {
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
      } while (i < data.length);

      enc = tmp_arr.join('');
      var r = data.length % 3;
      return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    },
  }

});
app1.$mount('#app');
