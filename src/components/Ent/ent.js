import Vue from 'vue';
import template from './ent.html';

import './ent.scss';

export default Vue.extend({
  template,

  props: ['paused'],

  data() {
    return {
      name: '',
      showName: false,
      email: '',
      password: '',
      
        // Physics variables
      weight: 0.1,
      friction: 0.1,
      jump: 4,
      speed: 0.3,
    
      facing: 'scale(1,1)',
        // Coordinates
      yTop: 200,
      xLHS: 500,
      yBottom: 30,
      xRHS: 22,
        // Velocity
      yVel: 0,
      xVel: 0,
        
      status: 'idle', // 'idle', 'run', 'hurt'
        
      // Sprite Animation variables
      shift: 0,         // Used to log shift in pixels thru anim frames
      shiftStart: 32,    // 0 for Run, 88 for Idle, 110 for jump
      frameWidth: 32,   // CONST
      frameHeight: 50,  // CONST
      delay: 10,         // CONST
      delayI: 0,        // Delay iterator, starts at 0
      totalFrames: 3,   // 4 for run, 1 for idle or jump
      currentFrame: 0,  // Frame iterator, starts at 0
      context: {},      // Will hold different canvas locations
        
      // Stores all current sprites
      sprite: {
        ent: document.createElement('img')
      }
          
    };
  },

  // bind event handlers to the `doResize` method (defined below)
  mounted: function() {
    // Setting up canvas vars for animation
    var canvas = document.getElementById('ent');
    this.context.ent = canvas.getContext('2d');
      
    this.loadSprites();
    this.animLoop();
  },

  beforeDestroy: function() {
      
  },

  methods: {
    loadSprites() {
      this.sprite.ent.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/ent.png';
    },
      
    animate: function() {
      this.move();
        
//      this.fall();
//      this.slow(); //Causes friction
        
        //
        // ENT ANIMATION STANDIN
        //
      if (this.xLHS < 350) {
        this.status = 'hurt';
        this.slow();
      } else {
        this.moveLeft();
      }
        
      if (this.status === 'hurt') {
        this.totalFrames = 1;
        this.shiftStart = 128;
        this.shift = 128;
        this.currentFrame = 0;
        
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
        this.shiftStart = 0;
        this.shift = 0;
        this.currentFrame = 0;
      }
        
      return;
    },
      
    animLoop: function() {
      this.delayI++;
      if (this.delayI === this.delay) {
        var parts = ['ent'];
        for (var i in parts) {
          this.context[parts[i]].clearRect(0, 0, 300, 300);
 
          //draw each frame + place them in the middle
          this.context[parts[i]].drawImage(this.sprite[parts[i]], this.shift, 0, this.frameWidth, this.frameHeight, 0, 0, this.frameWidth, this.frameHeight);
        }
        this.shift += this.frameWidth;
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
      //Override movement for pause screen.
      if (this.paused) {
        // this.yTop =
        // this.xLHS = (Math.floor(this.xVel * 10) / 10);
        // this.yBottom = this.yTop + 14;
        // this.xRHS = this.xLHS + 6;
      }

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
      if (this.yBottom < 200) {
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
