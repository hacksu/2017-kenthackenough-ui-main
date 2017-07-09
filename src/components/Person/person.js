import Vue from 'vue';
import template from './person.html';

import './person.scss';

// temporary:
var skinSrc = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standSkin.png';
var eyeSrc = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standEyes.png';
var shirtSrc = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt1.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt2.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt3.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt4.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt5.png'];
var hairSrc = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standHair1.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standHair2.png'];
var pantsSrc = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standPants1.png'];
var shoesSrc = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShoes1.png'];

export default Vue.extend({
  template,

  data() {
    return {
      name: 'Larry',
      showName: false,
        
        // Physics variables
      weight: 0.1,
      friction: 0.1,
      jump: 5,
      speed: 2,
        // Image rendering
      skin: skinSrc,
      shirt: shirtSrc[0],
      pants: pantsSrc[0],
      hair: hairSrc[0],
      shoes: shoesSrc[0],
      eyes: eyeSrc,
        
        // Image stats
      skinTone: 0,  // 0 - 8
      shirtHue: 0,  // 0 - 360
      pantsHue: 0,
      hairTone: 0,  // 0 - 12
      eyesHue: 0,
      eyesTone: 0,  // 1 - 5
    
      facing: 'scale(1,1)',
        // Coordinates
      yTop: 0,
      xLHS: 100,
      yBottom: 30,
      xRHS: 22,
        // Velocity
      yVel: 0,
      xVel: 0,
        
      status: 'idle', // 'idle', 'walk', 'jump'
        
      // Sprite Animation variables
      shift: 0, // Used to log shift in pixels thru anim frames
      frameWidth: 21, // CONST
      frameHeight: 50, // CONST
      delay: 5, // CONST
      delayI: 0, // Delay iterator, starts at 0
      totalFrames: 4,
      currentFrame: 0, // Frame iterator, starts at 0
      context: {}, // Will hold different canvas locations
        
      // Stores all current sprites
      myImage: document.createElement('img')
    };
  },

  // bind event handlers to the `doResize` method (defined below)
  mounted: function() {
    this.randomize();
    var canvas = document.getElementById('skin');
    this.context.skin = canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;
    
    this.myImage.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/skin.png';
    this.myImage.addEventListener('load', this.animLoop, false);
  },

  beforeDestroy: function() {
      
  },

  methods: {
    randomize: function() {
      this.skinTone = Math.floor(Math.random() * 8);
      this.hairTone = Math.floor(Math.random() * 13);
      this.eyesTone = Math.floor(Math.random() * 5);
      this.shirt = shirtSrc[Math.floor(Math.random() * shirtSrc.length)];
    },
      
    animate: function() {
      this.move();
        
      this.fall();
      this.slow(); //Causes friction
        
      if (this.yVel !== 0) {
        this.status = 'jump';
      } else if (this.xVel !== 0) {
        this.status = 'walk';
          
      } else {
        this.status = 'idle';
      }
        
      return;
    },
      
    animLoop: function() {
      this.delayI++;
      if (this.delayI === this.delay) {
        this.context.skin.clearRect(0, 0, 300, 300);
 
        //draw each frame + place them in the middle
        this.context.skin.drawImage(this.myImage, this.shift, 0, this.frameWidth, this.frameHeight, 0, 0, this.frameWidth, this.frameHeight);
 
        this.shift += this.frameWidth + 1;
 
        /*
        Start at the beginning once you've reached the
        end of your sprite!
        */
        if (this.currentFrame === this.totalFrames) {
          this.shift = 0;
          this.currentFrame = 0;
            
        }
 
        this.currentFrame++;
        this.delayI = 0;
        
      }
      window.requestAnimationFrame(this.animLoop);
    },
      
    move: function() {
      this.yTop += Math.floor(this.yVel);
      this.xLHS += Math.floor(this.xVel);
      this.yBottom = this.yTop + 30;
      this.xRHS = this.xLHS + 22;
    },
    
    fall: function() {
      if (!this.isGrounded()) {
        this.yVel += this.weight;
      } else {
        this.yVel = 0;
      }
    },
      
    slow: function() {
      if (this.xVel > 0.3) {
        this.xVel -= this.friction;
      } else if (this.xVel < -0.3) {
        this.xVel += this.friction;
      } else {
        this.xVel = 0;
      }
    },
      
    isGrounded: function() {
        // TEMPORARY until grid goes up
      if (this.yBottom < 220) {
        return false;
      } else {
        return true;
      }
    },
      // Actions
    jumpUp: function() {
      this.yVel = -this.jump;
    },
    
    moveRight: function() {
      this.xVel = this.speed;
      this.facing = 'scale(1,1)';
    },
      
    moveLeft: function() {
      this.xVel = -this.speed;
      this.facing = 'scale(-1,1)';
    }
  }

});
