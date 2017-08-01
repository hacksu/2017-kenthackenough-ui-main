import Vue from 'vue';
import template from './person.html';

import './person.scss';

// temporary:
//var skinSrc = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standSkin.png';
//var eyeSrc = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standEyes.png';
//var shirtSrc = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt1.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt2.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt3.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt4.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShirt5.png'];
var hairSrc = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/hair1.png', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/hair2.png'];
//var pantsSrc = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standPants1.png'];
//var shoesSrc = ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/standShoes1.png'];

export default Vue.extend({
  template,

  data() {
    return {
      showName: false,
      
        // Physics variables
      weight: 0.1,
      friction: 0.1,
      jump: 4,
      speed: 1.2,
        // Sprite sheets loaded
      skin: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/skin.png',
      shirt: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/shirt1.png',
        // SUIT LINK:   https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/suit.png
        // TANK TOP LINK: https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/tank_top.png
      pants: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/pants1.png',
      hair: 0,
      shoes: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/shoes1.png',
      eyes: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/eyes1.png',
        
      customize: 'none', // Indicates which customize menu is loaded
      inFront: false,
        
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
      xLHS: 200,
      yBottom: 30,
      xRHS: 22,
        // Velocity
      yVel: 0,
      xVel: 0,
        
      status: 'idle', // 'idle', 'run', 'jump'
        
      // Sprite Animation variables
      shift: 0,         // Used to log shift in pixels thru anim frames
      shiftStart: 0,    // 0 for Run, 88 for Idle, 110 for jump
      frameWidth: 21,   // CONST
      frameHeight: 50,  // CONST
      delay: 5,         // CONST
      delayI: 0,        // Delay iterator, starts at 0
      totalFrames: 4,   // 4 for run, 1 for idle or jump
      currentFrame: 0,  // Frame iterator, starts at 0
      context: {},      // Will hold different canvas locations
        
      // Stores all current sprites
      sprite: {
        skin: document.createElement('img'),
        shirt: document.createElement('img'),
        hair: document.createElement('img'),
        pants: document.createElement('img'),
        shoes: document.createElement('img'),
        eyes: document.createElement('img')
      }
          
    };
  },
    
  computed: {
    topCoord: function() {
      if (this.customize === 'character') {
        this.inFront = true;
        return '140px';
      } else if (this.customize === 'face') {
        this.inFront = true;
        return '190px';
      } else {
        this.inFront = false;
        return (this.yTop + 1) + 'px';
      }
    },
    leftCoord: function() {
      if (this.customize === 'character') {
        return '230px';
      } else if (this.customize === 'face') {
        return '230px';
      } else {
        return (this.xLHS - 25) + 'px';
      }
    }
  },

  // bind event handlers to the `doResize` method (defined below)
  mounted: function() {
//    this.randomize();  // Randomizing character
      
    // Setting up canvas vars for animation
    var canvas = document.getElementById('skin');
    this.context.skin = canvas.getContext('2d');
      
    canvas = document.getElementById('shirt');
    this.context.shirt = canvas.getContext('2d');
        
    canvas = document.getElementById('hair');
    this.context.hair = canvas.getContext('2d');
        
    canvas = document.getElementById('pants');
    this.context.pants = canvas.getContext('2d');
      
    canvas = document.getElementById('shoes');
    this.context.shoes = canvas.getContext('2d');
      
    canvas = document.getElementById('eyes');
    this.context.eyes = canvas.getContext('2d');
      
    this.loadSprites();
    this.animLoop();
  },

  beforeDestroy: function() {
      
  },

  methods: {
    loadSprites() {
      this.sprite.skin.src = this.skin;
      this.sprite.shirt.src = this.shirt;
      this.sprite.hair.src = hairSrc[this.hair];
      this.sprite.pants.src = this.pants;
      this.sprite.shoes.src = this.shoes;
      this.sprite.eyes.src = this.eyes;
    },
      
    randomize: function() {
      this.skinTone = Math.floor(Math.random() * 8);
      this.hairTone = Math.floor(Math.random() * 13);
      this.eyesTone = Math.floor(Math.random() * 5);
//      this.shirt = shirtSrc[Math.floor(Math.random() * shirtSrc.length)];
      this.hair = Math.floor(Math.random() * hairSrc.length);
      this.sprite.hair.src = hairSrc[this.hair];
    },
      
    changeHair(dir) {
      this.hair += dir;
      if (this.hair > (hairSrc.length - 1)) {
        this.hair = 0;
      }
      if (this.hair < 0) {
        this.hair = (hairSrc.length - 1);
      }
      this.sprite.hair.src = hairSrc[this.hair];
    },
      
    animate: function() {
      this.move();
        
      this.fall();
      this.slow(); //Causes friction
        
      if (this.yVel !== 0) {
        if (this.status !== 'jump') {
          this.status = 'jump';
          this.totalFrames = 1;
          this.shiftStart = 110;
//          this.shift = 110;
          this.currentFrame = 0;
        }
      } else if (this.xVel > 1 || this.xVel < -1) {
        if (this.status !== 'run'){
          this.status = 'run';
          this.totalFrames = 4;
          this.shiftStart = 0;
          this.shift = 0;
          this.currentFrame = 0;
          this.delayI = 0;
        }
          
      } else if (this.status !== 'idle') {
        this.status = 'idle';
        this.totalFrames = 1;
        this.shiftStart = 88;
        this.shift = 88;
        this.currentFrame = 0;
      }
        
      return;
    },
      
    animLoop: function() {
      this.delayI++;
      if (this.delayI === this.delay) {
        var parts = ['skin', 'shirt', 'hair', 'pants', 'shoes', 'eyes'];
        for (var i in parts) {
          this.context[parts[i]].clearRect(0, 0, 300, 300);
 
          //draw each frame + place them in the middle
          this.context[parts[i]].drawImage(this.sprite[parts[i]], this.shift, 0, this.frameWidth, this.frameHeight, 0, 0, this.frameWidth, this.frameHeight);
        }
        this.shift += this.frameWidth + 1;
        /*
        Start at the beginning once you've reached the
        end of your sprite!
        */
        if (this.currentFrame === this.totalFrames) {
          this.shift = this.shiftStart;
          this.currentFrame = 0;
            
        }
 
        this.currentFrame++;
        this.delayI = 0;
      }
      window.requestAnimationFrame(this.animLoop);
    },
      
    move: function() {

      // if (this.topCollision() && !this.isGrounded()){
      //   this.yVel = 1;
      // }
      this.yTop += (Math.floor(this.yVel * 10) / 10);
      this.xLHS += (Math.floor(this.xVel * 10) / 10);
      this.yBottom = this.yTop + 14;
      this.xRHS = this.xLHS + 6;
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
      if (this.yBottom < 213) {
        return false;
      } else {
        return true;
      }
    //   var gridLocY = Math.floor(this.yBottom / 20);
    //   var gridLocX = Math.floor((this.xLHS + 16) / 20) - 3;
    //   var grid = this.$parent.$refs.home.grid;
    //   var tilesToCheck = [];
    //   if (grid[gridLocY + 1] !== undefined) {
    //     if (grid[gridLocY + 1][gridLocX] !== undefined) {
    //       tilesToCheck.push(grid[gridLocY + 1][gridLocX]);
    //     }
        
    //   } else {
    //     return false;
    //   }
    
    //   for (var tile in tilesToCheck) {
    //     if (tilesToCheck[tile] === 'f') {
    //       return true;
    //     }
    //   }

    //   gridLocX = Math.floor((this.xRHS - 5) / 20) - 3;
    //   tilesToCheck = [];
    //   if (grid[gridLocY + 1] !== undefined) {
    //     if (grid[gridLocY + 1][gridLocX] !== undefined) {
    //       tilesToCheck.push(grid[gridLocY + 1][gridLocX]);
    //     }
        
    //   } else {
    //     return false;
    //   }
    
    //   for (tile in tilesToCheck) {
    //     if (tilesToCheck[tile] === 'f') {
    //       return true;
    //     }
    //   }
    
    //   return false;
    },
      
    topCollision: function() {
      var gridLocY = Math.floor((this.yTop + 22) / 20);
      var gridLocX = Math.floor(this.xLHS / 20) - 3;
      var grid = this.$parent.$refs.home.grid;
      var tilesToCheck = [];
      if (grid[gridLocY - 1] !== undefined) {
        if (grid[gridLocY - 1][gridLocX] !== undefined) {
          tilesToCheck.push(grid[gridLocY - 1][gridLocX]);
        }
        if (grid[gridLocY - 1][gridLocX + 1] !== undefined) {
          tilesToCheck.push(grid[gridLocY - 1][gridLocX + 1]);
        } else {
          return false;
        }
        
      } else {
        return false;
      }
    
      for (var tile in tilesToCheck) {
        if (tilesToCheck[tile] === 'f') {
          return true;
        }
      }
      return false;
    },
      // Actions
    jumpUp: function() {
      if (this.isGrounded() && this.yVel === 0) {
        this.yVel = -this.jump;
      }
    },
    
    moveRight: function() {
      // // BOUNDARY CHECK:
      // var gridLocY = Math.floor(this.yBottom / 20);
      // var gridLocX = Math.floor((this.xRHS - 5) / 20) - 3; // Grid rendering is 3 off on the x axis
      // var grid = this.$parent.$refs.home.grid;
      // var tilesToCheck = [];
      // // This first 'if' makes sure we're not looking for data inside an undefined obj
      // if (grid[gridLocY] !== undefined) {
      //   if (grid[gridLocY][gridLocX + 1] !== undefined) {
      //     tilesToCheck.push(grid[gridLocY][gridLocX + 1]);
      //   } else {
      //     return;
      //   }
      // } else {
      //   return;
      // }
      // if (grid[gridLocY - 1] !== undefined){
      //   if (grid[gridLocY - 1][gridLocX + 1] !== undefined) {
      //     tilesToCheck.push(grid[gridLocY - 1][gridLocX + 1]);
      //   } else {
      //     return;
      //   }
      // }
      
      // for (var tile in tilesToCheck) {
      //   if (tilesToCheck[tile] === 'f') {
      //     return;
      //   }
      // }
      
      this.xVel = this.speed;
      this.facing = 'scale(1,1)';
    },
      
    moveLeft: function() {
      // BOUNDARY CHECK:

      // var gridLocY = Math.floor((this.yBottom + 10) / 20);
      // var gridLocX = Math.floor((this.xLHS + 15) / 20) - 3;
      // var grid = this.$parent.$refs.home.grid;
      // var tilesToCheck = [];
      // // This first 'if' makes sure we're not looking for data inside an undefined obj
      // if (grid[gridLocY] !== undefined) {
      //   if (grid[gridLocY][gridLocX - 1] !== undefined) {
      //     tilesToCheck.push(grid[gridLocY][gridLocX - 1]);
      //   } else {
      //     return;
      //   }
      // } else {
      //   return;
      // }
      // if (grid[gridLocY - 1] !== undefined){
      //   if (grid[gridLocY - 1][gridLocX - 1] !== undefined) {
      //     tilesToCheck.push(grid[gridLocY - 1][gridLocX - 1]);
      //   } else {
      //     return;
      //   }
      // }
      
      // for (var tile in tilesToCheck) {
      //   if (tilesToCheck[tile] === 'f') {
      //     return;
      //   }
      // }
      this.xVel = (0 - this.speed);
      this.facing = 'scale(-1,1)';
    }
  }

});
