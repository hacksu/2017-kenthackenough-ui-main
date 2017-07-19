import Vue from 'vue';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';

import { LoadingState } from 'src/config/loading-state';
import Navigation from 'components/Navigation/navigation';
import Loader from 'components/Loader/loader';
import Person from 'components/Person/person';

Vue.use(VueRouter);
Vue.use(VeeValidate);

import 'src/config/http';
import routes from 'src/routes';
import 'src/style.scss';

export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active',
    
  scrollBehavior: function() {
    return { x: 0, y: 0 };
  }
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
        
      mobile: false,
      viewH: 0,
      navH: 0
    };
  },

  created() {
    LoadingState.$on('toggle', (isLoading) => {
      this.isLoading = isLoading;
    });
    window.addEventListener('scroll', this.handleScroll); // Bind croll listener
    this.initStyles(); // Set our default styles for the navigation and main content.
    console.log('created');
  },

  mounted: function() {
    var scale = 270 / 480;          // Height/width
    var width = window.innerWidth;
      
    this.viewH = scale * width;
    this.navH = window.innerHeight - this.viewH;
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    // Handle scroll for showing navigation
    handleScroll() {
      if (this.mobile) {
        return;
      }
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
    testtest() {
      console.log('test success!');
    }
  }

});
app1.$mount('#app');
