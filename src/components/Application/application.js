import Vue from 'vue';

import template from './application.html';
import Grid from 'components/grid/grid';
import Dropzone from 'vue2-dropzone';

import Person from 'components/Person/person';

import Ogre from 'components/Ogre/ogre';
import Ent from 'components/Ent/ent';

import './application.scss';
import { API_BASE } from 'src/config/constants';

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var keys = {
  UP: 38,
  LEFT: 37,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,
  P: 80,
  ESC: 27,
  ENTER: 13,
    
  H: 72 // HURTS ENEMY
};

export default Vue.extend({
  template,

  components: {
    Grid,
    Person,
    Ogre,
    Ent,
    Dropzone
  },

  data() {
    return {
      monsters: ['ogre', 'ent'],
      monster: 'none',
      slash: false,
      slashTime: 10,
      slashCount: 0,
      
      schools: [],
      genders: ['Male', 'Female', 'Other'],
      resumeUrl: '',

      scalingObject: {
        transform: ''
      },

      other: {
        year: false,
      },

      currentFieldIndex: -1,
    };
  },
    
  computed: {
    phoneErr: function() {
      if (this.$root.$data.user.application.phone.length > 14) {
        return true;
      }
      return false;
    }
  },

  methods: {
    move(){
      if (this.slash) {
        this.slashCount++;
        if (this.slashCount >= this.slashTime) {
          this.slash = false;
          console.log(this.slash);
        }
      } else {
        this.slashCount = 0;
      }
        
      if (this.monster === 'none') {
        this.newMonster();
        console.log('Monster type:' + this.monster);
      }
      
      if (typeof this.$refs.you !== 'undefined') {
        this.$refs.you.animate();
      }

      if (this.monster === 'ogre' && this.$refs.appOgre !== undefined) {
        this.$refs.appOgre.animate();
      } else if (this.monster === 'ent' && this.$refs.appEnt !== undefined){
        this.$refs.appEnt.animate();
      }
        
      if (this.paused) {
        this.paused = true;
        return;
      }
      this.paused = false;
        
      if (typeof this.$refs.you !== 'undefined' && this.$refs.you.xLHS > 275) {
        this.$refs.you.moveLeft();
      }
      if (keys[keys.UP]) {
        this.$refs.you.jumpUp();
      }
      if (keys[keys.DOWN]) {
        return;
      }
      if (keys[keys.H]) {
        this.hurtMonster();
      }
    },
      
    newMonster() {
      if (this.$refs.you.win) {
        return;
      }
      this.monster = 'none';
      var i = Math.floor(Math.random() * this.monsters.length);
      this.monster = this.monsters[i];
    },
      
    hurtMonster(amount) {
      if (this.monster === 'ogre' && this.$refs.appOgre !== undefined) {
        this.$refs.appOgre.hurt(amount);
      }
      if (this.monster === 'ent' && this.$refs.appEnt !== undefined) {
        this.$refs.appEnt.hurt(amount);
      }
    },
      
    doResize() {
      console.log('doREsize called');
      var scale;

      var wrapperWidth = document.documentElement.clientWidth;
      var wrapperHeight = document.documentElement.clientHeight;

      // Use Math.min if you want to scale so that the width fills the screen.
      // Math.max fills the height
      scale = wrapperHeight / this.$refs.scalingContainer.clientHeight;
      // scale = Math.max(
      //   wrapperWidth / this.$el.clientWidth,
      //   wrapperHeight / this.$el.clientHeight
      // );
      console.log('scale:' + scale, 'elWidth', this.$refs.scalingContainer.clientWidth, '$wrapper.width()' + wrapperWidth);
      this.scalingObject = {
        //Keeps container centered
        transform: 'translateX(' + (-(scale * this.$refs.scalingContainer.clientWidth) / 2 + (wrapperWidth / 2)) + 'px) ' + 'scale(' + scale + ')'
      };

    },

    sourceChanged() {
      // console.log('source = ' + this.$root.$data.user.application.school + ' new value = ' + e.target.value);
      // var newSource = e.target.value;

      // only action if value is different from current deepSource
      // if (newSource!= this.deepSchool) {
      //   for (var i=0; i<this.schools.length; i++) {
      //     if (this.schools[i] == newSource) {
      //       this.deepSchool = this.schools[i];
      //       this.school = this.deepSchool;
      //     }
      //   }
      // }
    },

    goToNextField() {
      this.currentFieldIndex += 1;
      console.log('index: ' + this.currentFieldIndex);
      if (this.currentFieldIndex === 15) {
        this.$refs.you.win = true;
        console.log('win status: ' + this.$refs.you.win);
          /*
        var canvas = document.getElementById('sharable');
        var context = canvas.getContext('2d');

        // load image from data url
        var imageObj = document.createElement('img');
        imageObj.crossOrigin = 'anonymous';
          
        var imgLink;
        imageObj.onload = function() {
          context.drawImage(this, 100, 0);
            
          imgLink = canvas.toDataURL('image/png');
          console.log('img: ' + imgLink);
          document.write('<img id="newImageYo" src="' + imgLink + '"/>');
        };
        imageObj.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/mockups.png';
        */
      }

      this.hurtMonster(2000);
      router.push({ name: 'apply', params: { pageId: this.currentFieldIndex }})
    },

    handleKeypress(e) {
      if (e.keyCode === keys.ENTER) {
        this.goToNextField();
      } else if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode < 57)) { // Letter keys
        this.hurtMonster();
        // Shake screen todo
      }
    },

    submitApplication() {
      this.$root.createApplication()
      .then((response) => {
        console.log('response', response.data);
        this.goToNextField();
      })
      .catch((error) => {
        this.goToNextField();
        console.log('Error', error);
      });
    },

    updateApplication() {
      this.$root.updateApplication()
      .then((response) => {
        this.goToNextField();
        console.log('response', response.data);
      })
      .catch((error) => {
        console.log('Error', error);
      });
    },

    resumeSuccess(response) {
      console.log('Successfully uploaded', response);
      this.$root.$data.user.application.resume = response.name;
    },

    resumeError(error) {
      console.log('Error uploading resume', error);
    },

    resumeSending(file, xhr, formData) {
      console.log('Resume Sending:');
      console.log(file, formData);
      // formData.append('resume');
      // formData.append('filename', 'filenameLol');
      // console.log(file, formData);
    },
  },

  mounted: function() {
    
    if (!this.$root.isLoggedIn()) {
      console.log('Attempted to access application page without being logged in. Going to home');
      this.$root.$router.push('/');
    }

    if (!this.$root.user.application.name) {
      console.log('Attempted to access application page without supplying a name. Going to home');
      this.$root.$router.push('/');
    }

    this.$refs.you.xLHS = 600;
    window.addEventListener('resize', this.doResize);
    this.doResize();
      
    this.newMonster();
      
    // Movement detection
    //var self = this;
    window.addEventListener('keydown', function(e){
      keys[e.keyCode || e.which] = true;
      if (e.keyCode === Number(keys.ESC)) {
        return;
      }
    }, true);

    window.addEventListener('keyup', function(e){
      keys[e.keyCode || e.which] = false;
    }, true);
      
    setInterval(this.move, 10);

    var self = this;
    setTimeout(() => {
      self.currentFieldIndex = 0;
    }, 100);

    setTimeout(() => {
      if (this.$root.$data.user.application.school !== '') { // Go to summary page if application filled out already
        this.currentFieldIndex = 14;
      } else {
        self.currentFieldIndex += 1;
      }
    }, 3000);

    this.resumeUrl = `${API_BASE}/users/application/resume`;
  }

});
