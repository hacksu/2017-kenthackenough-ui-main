import Vue from 'vue';
import template from './customizePerson.html';

import './customizePerson.scss';

import Person from 'components/Person/person';

import { usersResource } from 'src/util/resources';

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

      emailValidationRule: 'email',
      errorMessage: '',
      rememberMe: false,
    };
  },

  // bind event handlers to the `doResize` method (defined below)
  mounted: function() {
    if (this.$root.isLoggedIn()) {
      this.changeMenu('character');
    } else {
      this.changeMenu('apply');
    }
  },

  beforeDestroy: function() {
    this.$parent.$refs.you.customize = 'none';
  },

  methods: {
    handleSubmit(){
      console.log('Apply clicked');

      this.$validator.validateAll().then((success) => {
        if (success) {
          console.log('Email Valid');

          return this.$root.registerUser();
        }

        return this;
      });
    },
      
    changeMenu(menuOpt) {
      this.menu = menuOpt;
      this.$parent.$refs.you.customize = menuOpt;
      
    },

    registerUser(){
      return usersResource.post('', this.user)
        .then((response) => {
          console.log('Register successfull', response);

          // We need to reset the fields after successfull request
          //this.fields.reset();

          // Go to next menu
          this.changeMenu('character');
        })
        .catch((error) => {
          // Handle error...
          this.errorMessage = error.response.data.errors[0];
          console.log('API responded with:', error.response.data);
        });
    },

    handleLogin(){
      this.$root.loginUser()
      .then((response) => {
        console.log('Successfully logged in', response);
        this.changeMenu('character');

      })
      .catch((error) => {
        this.errorMessage = error.response.data.errors[0];
      });
    },

    handleLogout() {
      this.$root.logoutUser()
      .then(() => {
        console.log('Successfully logged out');
        this.changeMenu('apply');
      })
      .catch((error) => {
        console.log(error);
      });
    },

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
    },
      
    changeColor(itemHue, hueVal, itemTone, toneVal) {
      this.$parent.$refs.you[itemHue] = hueVal;
      this.$parent.$refs.you[itemTone] = toneVal;
    }
  }

});
