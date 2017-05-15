import Vue from 'vue';
import template from './person.html';

import './person.scss';

export default Vue.extend({
  template,

  data() {
    return {
      skinTone: 0,
      skinImage: 'skin',
      shirtImage: 'shirt',
      pantsImage: 'pants',
      hairImage: 'hair',
      shoesImage: 'shoes',
      eyesImage: 'eyes'
    };
  },

  // bind event handlers to the `doResize` method (defined below)
  mounted: function() {

  },

  beforeDestroy: function() {

  },

  methods: {

  }

});
