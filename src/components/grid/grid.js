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
      // 'f' = filled block, 'e' for empty
      // filled block decoration is applied automatically
      grid: [['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
             ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
             ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
             ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
             ['e', 'e', 'e', 'e', 'e', 'e', 'f', 'f', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
             ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'f', 'e', 'e', 'f', 'e', 'e', 'e', 'e', 'f', 'e', 'e'],
             ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'f', 'e', 'e', 'e', 'f', 'e', 'e', 'e'],
             ['f', 'f', 'f', 'e', 'e', 'e', 'f', 'e', 'e', 'e', 'f', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
             ['f', 'f', 'f', 'f', 'e', 'f', 'e', 'e', 'e', 'e', 'f', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
             ['f', 'f', 'f', 'f', 'f', 'e', 'e', 'e', 'e', 'e', 'f', 'e', 'e', 'e', 'e', 'f', 'e', 'e'],
             ['f', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'f', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
             ['f', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
             ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f']
      ],
      fill: {
        left: {
          material: 'f',
          depth: 10
        },
        right: {
          material: 'f',
          depth: 10
        },
        bottom: {
          material: 'f',
          depth: 5
        }
      },
      debug: false
    };
  },
   
  mounted: function() {
    console.log(this.note);
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
      console.log(this.grid);
        
      for (var y = 0; y < ySize; y++){
        for (var x = 0; x < xSize; x++){
          var space = document.createElement('div');
          space.classList.add('gridSpace');
          space.style.left = ((x * 20) + 40) + 'px';
          space.style.top = (y * 20) + 'px';
            
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
                deco.classList.add('grass2');
              }
              deco.style.left = ((x * 20) + 40) + 'px';
              deco.style.top = ((y - 1) * 20) + 'px';
              document.getElementById('grid').appendChild(deco);
            }
            
          }

          if (this.debug) {
            space.classList.add('outline');
          }
          document.getElementById('grid').appendChild(space);
        }
      }
    },
      
    fillBottom() {
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
          space.classList.add('bottomDirt');
        
          document.getElementById('grid').appendChild(space);
        }
      }
    },
      
    fillRight() {
      var xSize = this.width;
      var ySize = this.height;
    
      if (this.fill.right.depth < 1) {
        return;
      }
        
      for (var y = 0; y < (ySize + this.fill.bottom.depth); y++){
        for (var x = xSize; x < (xSize + this.fill.right.depth); x++){
          var space = document.createElement('div');
          space.classList.add('gridSpace');
          space.style.left = ((x * 20) + 40) + 'px';
          space.style.top = (y * 20) + 'px';
          space.classList.add('bottomDirt');
        
          document.getElementById('grid').appendChild(space);
        }
      }
    },
      
    fillLeft() {
      var ySize = this.height;
    
      if (this.fill.left.depth < 1) {
        return;
      }
        
      for (var y = 0; y < (ySize + this.fill.bottom.depth); y++){
        for (var x = -1; x > (-1 - this.fill.left.depth); x--){
          var space = document.createElement('div');
          space.classList.add('gridSpace');
          space.style.left = ((x * 20) + 40) + 'px';
          space.style.top = (y * 20) + 'px';
          space.classList.add('bottomDirt');
        
          document.getElementById('grid').appendChild(space);
        }
      }
    }
      
  }
    
});
