import Vue from 'vue';

import template from './application.html';
import Grid from 'components/grid/grid';

import Person from 'components/Person/person';

import Ogre from 'components/Ogre/ogre';
import Ent from 'components/Ent/ent';

import './application.scss';

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
    Ent
  },

  data() {
    return {
      monsters: ['ogre', 'ent'],
      monster: 'none',
      slash: false,
      slashTime: 10,
      slashCount: 0,
        
      scalingObject: {
        transform: ''
      },
        
      appData: {
        name: 'Nick Crawfprd',
        email: 'ncrawfo7@kent.edu',
        school: 'Kent State University',
        shirt: 'shirt-large', // Could also be 'hoodie-small' etc.
        age: 20,
        year: 'Senior', // High School, Freshman, Soph, Jun, Senior, Grad Student, Mentor
        travel: {
          required: true,
          fromWhere: 'Garrettsville, OH'
        },
        dietary: 'Vegetarian',
        major: 'Comp Sci',
        gender: 'Male',
        resume: null,
        link: 'github.com/NickCrawford',
        rsvp: 'going',
        status: 'rejected'
      }
    };
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
        
      this.$refs.you.animate();
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
        
      if (this.$refs.you.xLHS > 275) {
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
      this.monster = 'none';
      var i = Math.floor(Math.random() * this.monsters.length);
      this.monster = this.monsters[i];
    },
      
    hurtMonster() {
      if (this.monster === 'ogre' && this.$refs.appOgre !== undefined) {
        this.$refs.appOgre.hurt();
      }
      if (this.monster === 'ent' && this.$refs.appEnt !== undefined) {
        this.$refs.appEnt.hurt();
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

  },

  mounted: function() {
      
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
  }

});
