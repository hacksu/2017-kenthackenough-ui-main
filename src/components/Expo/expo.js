import Vue from 'vue';
import template from './expo.html';

export default Vue.extend({
  template,
  mounted: function() {
    window.location = 'https://hacksu.github.io/khe-table/';
  }
    
});
