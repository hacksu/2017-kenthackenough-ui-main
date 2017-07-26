import Vue from 'vue';
import VeeValidate from 'vee-validate';

import template from './sponsor.html';

// Import styles
import './sponsor.scss';

Vue.use(VeeValidate);

export default Vue.extend({
  template,

  components: {
      
  },

  data() {
    return {
      //Object for handling main scaling transform
      scalingObject: {
        transform: ''
      },
      scaledViewportWidth: 0,
      scaledViewportHeight: 0,
    
      paypal: false,
    };
  },

  // bind event handlers to the `doResize` method (defined below)
  mounted: function() {
    console.log('ready');
    window.addEventListener('resize', this.doResize);
    this.doResize();

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
      if (wrapperWidth > 480) {
        scale = wrapperHeight / this.$refs.scalingContainer.clientHeight;
        this.$parent.mobile = false;
      } else {
        scale = wrapperWidth / this.$refs.scalingContainer.clientWidth;
        this.$parent.mobile = true;
        
      }
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
  }

});
