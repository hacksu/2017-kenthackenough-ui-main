import Vue from 'vue';
import template from './customizePerson.html';

import './customizePerson.scss';

import Person from 'components/Person/person';

//var skinSrc = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standSkin.png';
//var eyeSrc = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standEyes.png';
//var shirtSrc = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt1.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt2.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt3.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt4.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt5.png'];
//var hairSrc = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standHair1.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standHair2.png'];
//var pantsSrc = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standPants1.png'];
//var shoesSrc = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShoes1.png'];

export default Vue.extend({
  template,

  components: {
    Person
  },

  props: ['scaledViewportWidth', 'scaledViewportHeight'],

  data() {
    return {
      imgURL: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/',
        
      shirts: [{
        url: 'standShirt1.png',
        name: 'Classic'
      },
      {
        url: 'standShirt2.png',
        name: 'hoodie'
      },
      {
        url: 'standShirt3.png',
        name: 'sweater'
      },
      {
        url: 'standShirt4.png',
        name: 'suit'
      },
      {
        url: 'standShirt5.png',
        name: 'tank'
      }],
        
      hair: [{
        url: 'standHair1.png',
        name: 'Classic Short'
      },
      {
        url: 'standHair2.png',
        name: 'Classic Long'
      }
      ],
        
      pantsIndex: 0,
      hairIndex: 0,
    
      menu: 'apply',
    };
  },

  // bind event handlers to the `doResize` method (defined below)
  mounted: function() {

  },

  beforeDestroy: function() {

  },

  methods: {
    /**
    * Store the user locally
    * @param me An object representing the logged-in user
    *           {key: String, token: String, role: String, refresh: String, expires: Date}
    */
    setMe() {
      console.log(this.$refs.you);
      localStorage.setItem('me', this.$refs.you);
    },

    updateShirt(shirtURL) {
      this.$parent.$refs.you.shirt = shirtURL;
    }
  }

});
