
$(document).ready(function () {
    $('.slider-content').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        arrows: false,
        dotsClass: "vertical-dots",
        autoplay: true,
        autoplaySpeed: 4000
    });

    $('.slider-news-content').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: '<div class="slickPrev d-flex justify-content-center align-items-center"><i class="fas fa-angle-left"></i></div>',
        nextArrow: '<div class="slickNext d-flex justify-content-center align-items-center"><i class="fas fa-angle-right"></i></div>',
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    });
});


//Smooth scrolling
$("#scroll-icon").click(function () {
    $('html,body').animate({
        scrollTop: $("#footer").offset().top
    },
        'slow');
});

$('.anchor').click(function () {
    event.preventDefault();
    $('html,body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 'slow');
});

//active circle when hover over nav-link
$('.nav-link').hover(function () {
    $(this).prev().toggleClass("active-circle");
});

//
$(function () {
    $(document).scroll(function () {
        var $nav = $(".fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});