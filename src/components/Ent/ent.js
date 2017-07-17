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
      weight: 0.05,
      friction: 0.1,
      jump: 4,
      speed: 0.5,
      hurtTime: 30,
      hurtCount: 0, // Hurt time is the length he'll stay hurt
      hp: 3,
    
      facing: 'scale(1,1)',
        // Coordinates
      yTop: 200,
      xLHS: 0,
      yBottom: 30,
      xRHS: 22,
        // Velocity
      yVel: 0,
      xVel: 0,
        
      status: 'idle', // 'idle', 'run', 'hurt'
      dead: false,
        
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
        ent: document.createElement('img'),
        slashes: [document.createElement('img'),
          document.createElement('img'),
          document.createElement('img')]
      },
        
      slashLoad: false
          
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
      
      this.sprite.slashes[0].src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/slash1.png';
      this.sprite.slashes[1].src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/slash2.png';
      this.sprite.slashes[2].src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/795933/slash3.png';
    },
      
    animate: function() {
      this.move();
        
//      this.fall();
//      this.slow(); //Causes friction
        
        //
        // ENT ANIMATION STANDIN
        //
      if (this.xLHS > 200 && !this.dead) {
        this.slow();
      } else if (this.dead) {
        this.fall();
        if (this.yTop > 600) {
          this.$parent.newMonster();
        }
      } else {
        this.moveRight();
      }
        
      var slashNode = document.getElementById('slash');
      if (this.$parent.slash && slashNode !== undefined && !this.slashLoaded) {
          
        var context = slashNode.getContext('2d');
          
        var slashIndex = Math.floor(Math.random() * 3);
          
        context.clearRect(0, 0, 300, 300);

        context.drawImage(this.sprite.slashes[slashIndex], 0, 0, 50, 50, 0, 0, 50, 50);
          
        this.slashLoaded = true;
      }
      if (!this.$parent.slash) {
        this.slashLoaded = false;
      }
        
      if (this.status === 'hurt') {
        this.hurtCount--;
        if (this.hurtCount === 0) {
          this.status = 'idle';
        }
          
        this.totalFrames = 1;
        this.shiftStart = 128;
        this.shift = 128;
        this.currentFrame = 0;
        
      } else if (this.xVel > 0.1 || this.xVel < -0.1) {
        if (this.status !== 'run'){
          this.status = 'run';
          this.totalFrames = 3;
          this.shiftStart = 0;
          this.shift = 0;
          this.currentFrame = 0;
          this.delayI = 0;
        }
          
      } else {
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
      return false;
//      if (this.yBottom < 200) {
//        return false;
//      } else {
//        return true;
//      }
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
    },
      
    hurt: function() {
      if (this.hurtCount > 0 || this.xLHS < 200) {
        return;
      }
      this.$parent.slash = true;
        
      this.hp--;
      console.log('Ent HP: ' + this.hp);
      if (this.hp <= 0) {
        this.yVel = -1;
        this.dead = true;
        this.status = 'hurt';
//        this.$parent.newMonster();
      }
      this.status = 'hurt';
      this.hurtCount = this.hurtTime;
    }
  }

});
