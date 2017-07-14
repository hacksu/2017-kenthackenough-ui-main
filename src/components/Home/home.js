import Vue from 'vue';
import VeeValidate from 'vee-validate';
//import { emailResource } from 'src/util/resources';
import template from './home.html';

Vue.use(VeeValidate);

export default Vue.extend({
  template,

  data() {
    return {
      email: null,
      message: null,
      emailMessage: 'Mailing list signup'
    };
  },

  methods: {
    submitEmail() {
      fetch('https://api.khe.io/v1.0/news', {
        method: 'POST',
        body: JSON.stringify({ email: this.email }),
        headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
      }).then(() => {
        this.email = null;
        this.emailMessage = 'We\'ll get back to you';
      }).catch(() => {
        this.email = null;
        this.emailMessage = 'Something went wrong';
      });
    }
  }

  // methods: {
  //   handleSubmit(){
  //     this.$validator.validateAll().then((success) => {
  //       if (success) {
  //         return this.savePost();
  //       }

  //       return this;
  //     });
  //   },

  //   showMessage(message = {}, timeout = 3000){
  //     this.message = message;
  //     setTimeout(() => {
  //       this.message = null;
  //     }, timeout);
  //   },

  //   savePost(){
  //     return emailResource.post('/', this.email)
  //       .then((response) => {
  //         this.email = response.data;

  //         this.showMessage({
  //           type: 'success',
  //           text: 'We got your email! Stay tuned for the party :)'
  //         });

  //         // We need to reset the fields after successfull request
  //         this.fields.reset();
  //       })
  //       .catch((errorResponse) => {
  //         // Handle error...
  //         this.showMessage({
  //           type: 'danger',
  //           text: errorResponse
  //         });
  //         console.log('API responded with:', errorResponse);
  //       });
  //   }
  // }
});
// $(function () {
//  +           let newsletter = $("#newsletter-sign-up");
//  +           newsletter.keyup(function (e) {
//  +               if (e.keyCode == 13) {
//  +                   $.post({
//  +                       url: "https://api.khe.io/v1.0/news",
//  +                       data: JSON.stringify({email: newsletter.val()}),
//  +                       contentType: "application/json; charset=utf-8",
//  +                       dataType: "json",
//  +                       success: function(data) {
//  +                           newsletter.attr("placeholder", "See you soon");
//  +                           newsletter.attr("disabled", true);
//  +                           newsletter.css("background-color","#008000");
//  +                           console.log("it worked")
//  +                       },
//  +                       error: function(data) {
//  +                           newsletter.attr("placeholder", "Try that again?");
//  +                           newsletter.css("background-color","#990000");
//  +                           console.log("it failed");
//  +                           newsletter.keyup(function (e) {
//  +                               newsletter.css("background-color","#111");
//  +                           })
//  +                       }
//  +                   });
//  +                   console.log(newsletter.val());
//  +                   newsletter.val("");
//  +               }
//  +           });
//  +       });
