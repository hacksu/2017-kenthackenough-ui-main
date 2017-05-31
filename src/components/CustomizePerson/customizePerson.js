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
    
      menu: 'none'
      
    };
  },

  // bind event handlers to the `doResize` method (defined below)
  mounted: function() {
    setInterval(this.updateClone, 100);
    
  },

  beforeDestroy: function() {

  },

  methods: {
    updateClone() {
      this.$refs.youClone.skinTone = this.$parent.$refs.you.skinTone;
      this.$refs.youClone.eyesTone = this.$parent.$refs.you.eyesTone;
      this.$refs.youClone.hairTone = this.$parent.$refs.you.hairTone;
      this.$refs.youClone.shirt = this.$parent.$refs.you.shirt;
      this.$refs.youClone.shirtHue = this.$parent.$refs.you.shirtHue;
      this.$refs.youClone.hair = this.$parent.$refs.you.hair;
    },
    
    updateShirt(shirtURL) {
      this.$parent.$refs.you.shirt = shirtURL;
    }
  }

});
