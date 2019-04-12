"use strict";

$(document).ready(function () {
    /*INITIATING SLIDERS*/
    $(".catalogue-slider").owlCarousel({
        nav: true,
        navText: ['<img src="../images/slider-arrow-left.png" alt="">',
                  '<img src="../images/slider-arrow-right.png" alt="">'],

        dots: false,
        loop: true,
        center: true,
        margin: 0,
        items: 5
    });
    $(".offer-slider").owlCarousel({
        nav: true,
        navText: ['<img src="../images/slider-arrow-left.png" alt="">',
            '<img src="../images/slider-arrow-right.png" alt="">'],
        dots: false,
        loop: true,
        margin: 30,
        items: 3
    });
    $(".inner-offer-slider").owlCarousel({
        nav: true,
        navText: ['<img src="./images/slider-arrow-left.png" alt="">',
                  '<img src="./images/slider-arrow-right.png" alt="">'],
        dots: false,
        loop: true,
        margin: 30,
        items: 4
    });

    /* Slider on the inner page with thumbnails*/
    $(".main-slider").owlCarousel({
        nav: true,
        navText: ['<img src="./images/slider-arrow-left.png" alt="">',
            '<img src="./images/slider-arrow-right.png" alt="">'],
        dots: false,
        loop: true,
        margin: 30,
        items: 1
    }).on('changed.owl.carousel', syncPosition);;

    var sync1 = $(".main-slider");
    var sync2 = $(".thumbnails-slider");
    var syncedSecondary = true;
    sync2
        .on('initialized.owl.carousel', function() {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: 3,
            dots: false,
            nav: false,
            margin: 20
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        // var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }
        //end block

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });
    /* Slider on the inner page with thumbnails*/
    /*INITIATING SLIDERS*/

    /*ADDING CORNERS TO THE FIRST AND LAST SLIDES OF THE FIRST SLIDER*/
    $('.catalogue-slider .owl-item.active + .owl-item:not(.active)').prev().addClass('lastActiveItem');

    $('.catalogue-slider .owl-next').click(function( ){
        $('.catalogue-slider .owl-item').removeClass('lastActiveItem');

        $('.catalogue-slider .owl-item.active + .owl-item:not(.active)').prev().addClass('lastActiveItem');
        console.log('5');
    });

    $('.catalogue-slider .owl-prev').click(function( ){
        $('.catalogue-slider .owl-item').removeClass('lastActiveItem');

        $('.catalogue-slider .owl-item.active + .owl-item:not(.active)').prev().addClass('lastActiveItem');
        console.log('7');
    });
    /*ADDING CORNERS TO THE FIRST AND LAST SLIDES OF THE FIRST SLIDER*/


    $('.main-menu li').hover(
        function(){
            if ( $(this).find('ul').length === 1) {
                $(this).addClass('active-li');
            }
        },
        function(){
            $(this).removeClass('active-li');
        });
});




