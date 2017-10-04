import Vue from 'vue';
import VeeValidate from 'vee-validate';

import template from './notFound.html';

import CustomizePerson from 'components/CustomizePerson/customizePerson';
import Person from 'components/Person/person';
import Grid from 'components/grid/grid';

import Ogre from 'components/Ogre/ogre';
import Ent from 'components/Ent/ent';

// Import styles

import './notFound.scss';
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
  Z: 90,
    
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
      slash: [false, false, false], // Dictates which, if any, slash animations are playing
        
      actionMsg: ''
    };
  },
  // bind event handlers to the `doResize` method (defined below)
    
  mounted: function() {
    console.log('ready');
    window.addEventListener('resize', this.doResize);
    this.doResize();
      
    // Movement detection
    window.addEventListener('keydown', this.handleKeyDown, true);

    window.addEventListener('keyup', function(e){
      keys[e.keyCode || e.which] = false;
    }, true);
      
    setInterval(this.move, 10);

  },
  
  beforeDestroy: function() {
    window.removeEventListener('resize', this.doResize);
    window.removeEventListener('keydown', this.handleKeyDown);
  },

  methods: {
      
    handleKeyDown(e) {
      keys[e.keyCode || e.which] = true;
      if (e.keyCode === Number(keys.ESC)) {
        this.togglePaused();
      }
    },

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
      
      if (this.$refs.you) {
        this.$refs.you.animate();
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
      if (keys[keys.Z] || keys[keys.ENTER]) {
        this.$refs.you.action();
      }
    },

    togglePaused() {
      console.log('togglePaused');
      this.paused = !this.paused;
      if (this.$refs.youMenu !== undefined) {
        console.log(this.$refs.youMenu.menu);
      }
    
    },

  }

});
