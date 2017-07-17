import Vue from 'vue';
import VeeValidate from 'vee-validate';

import template from './home.html';

import CustomizePerson from 'components/CustomizePerson/customizePerson';
import Person from 'components/Person/person';
import Grid from 'components/grid/grid';

import Ogre from 'components/Ogre/ogre';
import Ent from 'components/Ent/ent';

// Import styles
import './home.scss';
import 'components/Person/person.scss';

Vue.use(VeeValidate);

// CONTROLS
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
    CustomizePerson,
    Person,
    Grid,
    Ogre,
    Ent
  },

  data() {
    return {
      //Object for handling main scaling transform
      scalingObject: {
        transform: ''
      },
      scaledViewportWidth: 0,
      scaledViewportHeight: 0,
      paused: false,
      monsters: ['ogre', 'ent'],
      monster: 'none',
      slash: [false, false, false] // Dictates which, if any, slash animations are playing
    };
  },

  // bind event handlers to the `doResize` method (defined below)
  mounted: function() {
    console.log('ready');
    window.addEventListener('resize', this.doResize);
    this.doResize();
      
    // Movement detection
    var self = this;
    window.addEventListener('keydown', function(e){
      keys[e.keyCode || e.which] = true;
      if (e.keyCode === Number(keys.ESC)) {
        self.togglePaused();
      }
    }, true);

    window.addEventListener('keyup', function(e){
      keys[e.keyCode || e.which] = false;
    }, true);
      
    setInterval(this.move, 10);

  },
  
  beforeDestroy: function() {
    window.removeEventListener('resize', this.doResize);
  },

  methods: {

    /* This method scales the main #scaling-container
     * to fill the full height of the viewport
    * and also translates the container to the center
    */
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

      this.scaledViewportWidth = wrapperWidth / scale;
      this.scaledViewportHeight = wrapperHeight / scale;

    },
      
    move(){
      for (var i = 0; i < this.slash.length; i++) {
        if (this.slash[i] && i < (this.slash.length - 1)) {
          this.slash[i] = false;
          this.slash[i + 1] = true;
        } else {
          this.slash[i] = false;
        }
      }
        
      if (this.monster === 'none') {
        this.newMonster();
      }
        
      if (this.$refs.you) {
        this.$refs.you.animate();
      }
      if (this.monster === 'ogre' && this.$refs.homeOgre !== undefined) {
        if (this.$refs.homeOgre) {
          this.$refs.homeOgre.animate();
        }
      } else if (this.monster === 'ent' && this.$refs.homeEnt !== undefined){
        this.$refs.homeEnt.animate();
      }
        
      if (this.paused) {
        this.paused = true;
        return;
      }
      this.paused = false;
        
      if (keys[keys.LEFT]) {
        this.$refs.you.moveLeft();
      }
      if (keys[keys.RIGHT]) {
        this.$refs.you.moveRight();
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

    togglePaused() {
      console.log('togglePaused');
      this.paused = !this.paused;
    },
      
    newMonster() {
      this.monster = 'none';
      var i = Math.floor(Math.random() * this.monsters.length);
      this.monster = this.monsters[i];
    },
    
    hurtMonster() {
      var i = Math.floor(Math.random() * this.slash.length);
      this.slash[i] = true;
        
      if (this.monster === 'ogre') {
        this.$refs.homeOgre.hurt();
      }
      if (this.monster === 'ent') {
        this.$refs.homeEnt.hurt();
      }
    }
  }

});
