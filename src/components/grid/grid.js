import Vue from 'vue';
import template from './grid.html';

import './grid.scss';

// NOTE:
// Set the property "debug" to true to see gridlines.

export default Vue.extend({
  template,

  data() {
    return {
      width: 0, // Height and width calculated at mount based on grid
      height: 0,
      ceiling: false,
        
      fill: {
        left: {
          material: 'f',
          depth: -1
        },
        right: {
          material: 'f',
          depth: -1
        },
        bottom: {
          material: 'f',
          depth: 5
        }
      },
      debug: false
    };
  },
    
  props: {
    theme: {
      default: 'grass',
      type: String
    },
      
    // 'f' = filled block, 'e' for empty
    // filled block decoration is applied automaticall
    grid: {
      default: function() {
        return [['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
              ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
              ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
              ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
              ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
              ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
              ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
              ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
              ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
              ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
              ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
              ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
              ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f']
        ];
      },
      type: Array
    }
  },
   
  mounted: function() {
    console.log(this.theme);
    this.height = this.grid.length;
    this.width = this.grid[0].length;
    this.renderGrid();
  },
  methods: {
    renderGrid: function() {
      this.fillBottom();
      this.fillRight();
      this.fillLeft();
    
      var xSize = this.width;
      var ySize = this.height;
        
      console.log('xSize: ' + xSize);
      console.log('ySize: ' + ySize);
        
      for (var y = 0; y < ySize; y++){
        for (var x = 0; x < xSize; x++){
          var space = document.createElement('div');
          space.classList.add('gridSpace');
          space.style.left = ((x * 20) + 40) + 'px';
          space.style.top = (y * 20) + 'px';
            
          this.renderBlock(x, y, space);

          if (this.debug) {
            space.classList.add('outline');
          }
          document.getElementById('grid').appendChild(space);
        }
      }
    },
      
    fillBottom() {
      /*
      var xSize = this.width;
      var ySize = this.height;
    
      if (this.fill.bottom.depth < 1) {
        return;
      }
        
      for (var y = ySize; y < (ySize + this.fill.bottom.depth); y++){
        for (var x = 0; x < xSize; x++){
          var space = document.createElement('div');
          space.classList.add('gridSpace');
          space.style.left = ((x * 20) + 40) + 'px';
          space.style.top = (y * 20) + 'px';
          this.renderSideBlock(x, y, space, 'fTop');
          space.classList.add('bottomDirt');
        
          document.getElementById('grid').appendChild(space);
        }
      }*/
    },
      
    fillRight() {
      var xSize = this.width;
      var ySize = this.height;
        
      var y = 0;
      var x = 0;
      var space = document.createElement('div');
    
      if (this.fill.right.depth === 0) {
        return;
      }
      if (this.fill.right.depth === -1) {
        for (y = 12; y <= 17; y++){
          for (x = xSize; x < (xSize + 25); x++){
            space = document.createElement('div');
            space.classList.add('gridSpace');
            space.style.left = ((x * 20) + 40) + 'px';
            space.style.top = (y * 20) + 'px';
            if (y === 12) {
              this.renderSideBlock(x, y, space, 'fTop');
//              space.classList.add('topDirt');
//
//              var deco = document.createElement('div');
//              deco.classList.add('deco2x1');
//
//              if (Math.floor(Math.random() * 2) === 1) {
//                deco.classList.add('grass1');
//              } else {
//                deco.classList.add('grass2');
//              }
//              deco.style.left = ((x * 20) + 40) + 'px';
//              deco.style.top = ((y - 1) * 20) + 'px';
//              document.getElementById('grid').appendChild(deco);
            } else {
              this.renderSideBlock(x, y, space, 'f');
            }
        
            document.getElementById('grid').appendChild(space);
          }
        }
        return;
      }
        
      for (y = 0; y < (ySize + this.fill.bottom.depth); y++){
        for (x = xSize; x < (xSize + this.fill.right.depth); x++){
          space = document.createElement('div');
          space.classList.add('gridSpace');
          space.style.left = ((x * 20) + 40) + 'px';
          space.style.top = (y * 20) + 'px';
          this.renderSideBlock(x, y, space, 'f');
          //space.classList.add('bottomDirt');
        
          document.getElementById('grid').appendChild(space);
        }
      }
    },
      
    fillLeft() {
      var xSize = this.width;
      var ySize = this.height;
        
      var y = 0;
      var x = 0;
      var space = document.createElement('div');
    
      if (this.fill.left.depth === 0) {
        return;
      }
        
      if (this.fill.left.depth === -1) {
        for (y = 12; y <= 17; y++){
          for (x = xSize; x > (-30); x--){
            space = document.createElement('div');
            space.classList.add('gridSpace');
            space.style.left = ((x * 20) + 40) + 'px';
            space.style.top = (y * 20) + 'px';
            if (y === 12) {
              this.renderSideBlock(x, y, space, 'fTop');
            } else {
              this.renderSideBlock(x, y, space, 'f');
            }
        
            document.getElementById('grid').appendChild(space);
          }
        }
        return;
      }
        
      for (y = 0; y < (ySize + this.fill.bottom.depth); y++){
        for (x = -1; x > (-1 - this.fill.left.depth); x--){
          space = document.createElement('div');
          space.classList.add('gridSpace');
          space.style.left = ((x * 20) + 40) + 'px';
          space.style.top = (y * 20) + 'px';
            
          space.classList.add('bottomDirt');
        
          document.getElementById('grid').appendChild(space);
        }
      }
    },
      
    renderBlock(x, y, space) {
      if (this.theme === 'grass') {
        if (this.grid[y][x] === 'f') {
          if (this.grid[y - 1][x] === 'f') {
            space.classList.add('bottomDirt');
          } else {
            space.classList.add('topDirt');
                
            var deco = document.createElement('div');
            deco.classList.add('deco2x1');
            
            if (Math.floor(Math.random() * 2) === 1) {
              deco.classList.add('grass1');
            } else {
              deco.classList.add('grass1');
            }
            deco.style.left = ((x * 20) + 40) + 'px';
            deco.style.top = ((y - 1) * 20) + 'px';
            document.getElementById('grid').appendChild(deco);
          }
        }
      } else if (this.theme === 'castle') {
        if (this.grid[y][x] === 'f') {
          space.classList.add('castleBrick1');
        } else if (this.grid[y][x] === 'g') {
          space.classList.add('castleBrick2');
        } else if (this.grid[y][x] === 'e') {
          space.classList.add('castleTile1');
        }
      }
      
    },
      
    renderSideBlock(x, y, space, fill) {
      if (this.theme === 'grass') {
        if (fill === 'f') {
          space.classList.add('bottomDirt');
        } else if (fill === 'fTop') {
          space.classList.add('topDirt');
                
          var deco = document.createElement('div');
          deco.classList.add('deco2x1');
            
          if (Math.floor(Math.random() * 2) === 1) {
            deco.classList.add('grass1');
          } else {
            deco.classList.add('grass1');
          }
          deco.style.left = ((x * 20) + 40) + 'px';
          deco.style.top = ((y - 1) * 20) + 'px';
          document.getElementById('grid').appendChild(deco);
        }
        
      } else if (this.theme === 'castle') {
        if (fill === 'f' || fill === 'fTop') {
          space.classList.add('castleBrick1');
        }
      }
    }
      
  }
    
});
