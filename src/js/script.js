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
                    required: "Введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Введите свой номер телефона",
                email: {
                  required: "Введите свой почтовый ящик",
                  email: "Ваш почтовый ящик должен быть в формате name@domain.com"
                }
            },
        })
    };

    validateForm('#consult-form');
    validateForm('#consultation form');
    validateForm('#order form');

    $('input[name=phone]').mask('+7 (999) 999-99-99');

  });



