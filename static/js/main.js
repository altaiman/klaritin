'use strict';

$(function () {
    var countVal = $('.count').attr('data-value'),
        oldVal = countVal;

    function count() {
        var values = $('.count__cell.value');
        var i = countVal.length;

        for (i; i < 4; i++) {
            countVal = '0' + countVal;
        }

        [].forEach.call(values, function (value, k) {
            if ($(value).children().length > 1) {
                $(value).find('.value__item:first-child').remove();
            };

            if (countVal[k] != +$(value).text()) {
                var speed = Math.random();
                if (speed < 0.3) speed = 0.3;
                $(value).append('<span class="value__item">' + countVal[k] + '</span>');
                $(value).find('.value__item:last-child').css('transition', 'all ' + speed + 's');
                setTimeout(function () {
                    $(value).find('.value__item:nth-last-child(2)').css('top', '-150px');
                    $(value).find('.value__item:last-child').css('top', '0');
                }, 300);
            }
        });
    }

    count();

    setInterval(function () {
        var newVal = $('.count').attr('data-value');
        if (oldVal != newVal) {
            countVal = newVal;
            oldVal = newVal;
            count();
        }
    }, 3000);
});
'use strict';

$(function () {
    $('.header__menu-btn').on('click', function () {
        $(this).next().toggleClass('menu_show');
    });

    $('.menu__link_r').on('click', function () {
        $(this).parentsUntil('.section').find('.header__menu-btn').trigger('click');
    });

    $('#fullpage').fullpage({
        anchors: ['test', 'main'],
        slidesNavigation: true,
        controlArrows: false,
        responsiveHeight: 321

    });

    var elements = [{
        el: $(".page__content"),
        wrap: window
    }];

    var $wrapper = $(".page__wrap");

    if ($('.header_m').length === 0) {
        var doResize = function doResize(event) {

            var scale;

            elements.forEach(function (el) {
                var elHeight = el.el.outerHeight();
                var elWidth = el.el.outerWidth();

                scale = Math.min($(el.wrap).width() / elWidth, $(el.wrap).height() / (elHeight + 258));

                if (scale > 1) scale = 1;

                el.el.css({
                    transform: "scale(" + scale + ") perspective(0)"
                });
            });
        };

        $(window).on('resize', doResize);

        doResize();
    } else {
        var mobileResize = function mobileResize(e) {
            if (window.orientation != 0 && window.orientation) {
                $('.landscape').hide();
            }

            window.addEventListener("orientationchange", function () {
                $('.landscape').show();

                if (window.orientation != 0) {
                    $('.landscape').hide();
                }
            }, false);
        };

        $(window).on('resize', mobileResize);

        mobileResize();
    }
});
'use strict';

$(function () {
    $('.michael__btn_route').on('click', function () {
        $('.map').fadeIn();
    });

    $('.map__close').on('click', function () {
        $('.map').fadeOut();
    });

    function scale() {
        if ($('body').width() < 2080) {
            var x = $('body').width() / 2080;
        } else {
            var x = 1;
        }
        if ($('body').height() < 1100) {
            var y = $('body').height() / 1100;
        } else {
            var y = 1;
        }
        $('[data-scalable]').each(function () {

            var t = $(this);
            if (t.attr('data-scalable') == 'axis-x') {
                var s = x;
                t.css({
                    '-webkit-transform': 'scale(' + s + ')',
                    'transform': 'scale(' + s + ')'
                });
            }
            if (t.attr('data-scalable') == 'axis-both') {
                if (x > y) {
                    var s = y;
                } else {
                    var s = x;
                }
                t.css({
                    '-webkit-transform': 'scale(' + s + ')',
                    'transform': 'scale(' + s + ')'
                });
                if (t.attr('data-fullheight') !== undefined) {
                    t.css({
                        'height': ($('.section').height() - 100) / s
                    });
                }
            }
            if (t.hasClass('wrapper')) {
                t.css({
                    marginBottom: -t.outerHeight() * (1 - s)
                });
            }
        });
    }

    scale();
    $(window).on('resize', scale);
});
'use strict';

$(function () {
    $('.test__start').on('click', function () {
        $('.test').addClass('test_start');
        $('.test__subtitle').find('br').remove();

        setTimeout(function () {
            $('.question').fadeIn();
        }, 300);

        if ($('.header_m').length != 0) {
            $('.page__top_m .fp-slidesNav').css('bottom', '100px').fadeIn(300);
            $('.page__top_m .arrow').addClass('arrow_wt');
        }
    });

    if ($('.header_m').length != 0) {
        $('.question:nth-child(1) .question__list, .question:nth-child(3) .question__list, .question:nth-child(4) .question__list, .question:nth-child(7) .question__list').slick({
            slidesToShow: 1,
            infinite: false,
            arrows: false,
            variableWidth: true,
            dots: true
        });

        $('.question:nth-child(2) .question__list, .question:nth-child(5) .question__list, .question:nth-child(6) .question__list').slick({
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: false,
            arrows: false,
            variableWidth: true,
            dots: true
        });

        $('.result__info').slick({
            slidesToShow: 1,
            arrows: false,
            dots: true,
            infinite: false
        });
    }
});