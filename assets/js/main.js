jQuery(document).ready(function($) {

    /* ======= Scrollspy ======= */
    $('body').scrollspy({ target: '#header', offset: 400});

    /* ======= Fixed header when scrolled ======= */

    $(window).bind('scroll', function() {
         if ($(window).scrollTop() > 50) {
             $('#header').addClass('navbar-fixed-top');
         }
         else {
             $('#header').removeClass('navbar-fixed-top');
         }
    });

    /* ======= ScrollTo ======= */
    $('a.scrollto').on('click', function(e){

        //store hash
        var target = this.hash;

        e.preventDefault();

    $('body').scrollTo(target, 800, {offset: -70, 'axis':'y'});
        //Collapse mobile menu after clicking
    if ($('.navbar-collapse').hasClass('in')){
      $('.navbar-collapse').removeClass('in').addClass('collapse');
    }

  });

});

jQuery(document).ready(function(){
var view = {};

var checkPosition = function(){
   var elem = $('.donate .info'), top = elem.offset().top;

                if (top - view.limit < 300) {
                    elem.css('display','none');
                }
            };

       $(window).unbind('scroll').bind('scroll', function() {

            view.top = $(window).scrollTop();
            view.limit = view.top + $(window).height();

            checkPosition();
        });

});


jQuery(document).ready(function($) {

  $('.amount-chooser input.checkbutton').on('change', function() {
      $('.amount-chooser input.checkbutton').not(this).prop('checked', false);
  });

  $('.amount-chooser .textBox').focus(function() {
      $('.amount-chooser .checkbutton').prop('checked', false);
  });

  $('.amount-chooser .checkbutton').change(function() {
      if($(this).is(':checked')) {
          $('.amount-chooser .textBox').val("");
      }
  });

  $('#wire-transfer').click(function(event) {
      $('.wire-hidden').slideToggle(850);
  });
});

// Render the PayPal button into #paypal-button-container
paypal.Buttons({
    // Set up the transaction
    createOrder: function(data, actions) {
        var donation = jQuery(".amount-chooser .checkbutton:checked").size() ? jQuery(".amount-chooser .checkbutton:checked").val() : jQuery(".amount-chooser .textBox").val().replace(',', '.');
        console.log(donation);
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: donation
                }
            }],
            shipping_type: 'PICKUP',
            application_context: {
              shipping_preference: 'NO_SHIPPING'
            }
        });
    },
    // Finalize the transaction
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(orderData) {
            // Successful capture! For demo purposes:
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            var transaction = orderData.purchase_units[0].payments.captures[0];
            //alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
            $(".speech-bubble .intro").text("Vielen dank für Ihre Spende!");
            $(".speech-bubble").slideDown("slow", function() {
              $(".speech-bubble div.icon-holder").fadeIn(900);
            });

        });
    },
    onCancel: function(data, actions) {
        return actions.order.capture().then(function(orderData) {
            // Successful capture! For demo purposes:
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            var transaction = orderData.purchase_units[0].payments.captures[0];
            //alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
            $(".speech-bubble .intro").text("Vielen dank! Vielleicht nächsten Mal.");
            $(".speech-bubble").slideDown("slow", function() {
              $(".speech-bubble div.icon-holder").fadeIn(900);
            });

        });
    },
    onError: function(data, actions) {
        return actions.order.capture().then(function(orderData) {
            // Successful capture! For demo purposes:
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            var transaction = orderData.purchase_units[0].payments.captures[0];
            //alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
            $(".speech-bubble .intro").text("Eine Fehler ist aufgetreten! Versuchen Sie bitte noch ein Mal zur späteren Zeit.");
            $(".speech-bubble").slideDown("slow", function() {
              $(".speech-bubble div.icon-holder").fadeIn(900);
            });

        });
    },
}).render('#paypal-button-container');
