$(document).ready(function(){
    // Slider
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/Slider/chevron_left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/Slider/chevron_right.svg"></button>'

    });

    // Tabs

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__link-back');

    // Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #feedback').fadeOut('slow');
    });

    $('.button_mini').each( function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        }) 
    });

    // Form validation

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                    
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                } 
            },
            messages: {
                name: {
                    required: "?????????????? ???????? ??????",
                    minlength: jQuery.validator.format("?????????????? {0} ??????????????!")
                  },
                phone: "?????????????? ???????? ?????????? ????????????????",
                email: {
                  required: "?????????????? ???????? ???????????????? ????????",
                  email: "?????? ???????????????? ???????? ???????????? ???????? ?? ?????????????? name@domain.com"
                }
            },
        })
    };

    validateForm('#consult-form');
    validateForm('#consultation form');
    validateForm('#order form');

    // Phone mask

    $('input[name=phone]').mask('+7 (999) 999-99-99');

    // Submit forms + smart.php

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #feedback').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // Slow scroll + page up

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a").on('click', function(event) {

        if (this.hash !== "") {
          event.preventDefault();

          const hash = this.hash;

          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 600, function(){
            window.location.hash = hash;
          });
        } 
    });



    // WOW.js
    new WOW().init();
      

  });



