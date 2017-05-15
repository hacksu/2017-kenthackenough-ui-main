import Vue from 'vue';
import VueRouter from 'vue-router';

import { LoadingState } from 'src/config/loading-state';
import Navigation from 'components/Navigation/navigation';
import Loader from 'components/Loader/loader';
import Person from 'components/Person/person';

Vue.use(VueRouter);

import 'src/config/http';
import routes from 'src/routes';
import 'src/style.scss';

export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
});

new Vue({
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
      navigationStyle: {}
    };
  },

  created() {
    LoadingState.$on('toggle', (isLoading) => {
      this.isLoading = isLoading;
    });
    window.addEventListener('scroll', this.handleScroll); // Bind croll listener
    this.initStyles(); // Set our default styles for the navigation and main content.
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
    }
  }

}).$mount('#app');
