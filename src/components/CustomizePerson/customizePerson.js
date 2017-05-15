import Vue from 'vue';
import template from './customizePerson.html';

import './customizePerson.scss';

import Person from 'components/Person/person';

// var skinSrc = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standSkin.png';
// var eyeSrc = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standEyes.png';
// var shirtSrc = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt1.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt2.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt3.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt4.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt5.png'];
// var hairSrc = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standHair1.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standHair2.png'];
// var pantsSrc = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standPants1.png'];
// var shoesSrc = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShoes1.png'];

export default Vue.extend({
  template,

  components: {
    Person
  },

  data() {
    return {
      skinTone: 0, // 0.0 - 1.0
      skinIndex: 0,
      shirtIndex: 0,
      pantsIndex: 0,
      eyeColor: 0 // 0 - 255
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
