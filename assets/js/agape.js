/*!

 =========================================================
 * Awesome Landing Page - v1.2.2
 =========================================================
 
 * Product Page: https://www.creative-tim.com/product/awesome-landing-page
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/awesome-landing-page/blob/master/LICENSE.md)
 
 =========================================================
 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

var big_image;
$().ready(function () {
    $('.selector').click(function () {
        SelectColor(this);
    });
    var selectCol = 0;
    if (selectCol == 0) {
        if ($('body').hasClass('landing-page1')) {

        }
    }

});

$(window).on('scroll', function () {
    responsive = $(window).width();
    if (responsive >= 768) {
        parallax();
    }
});

function SelectColor(btn) {
    oldColor = $('.filter-gradient').attr('data-color');
    newColor = $(btn).attr('data-color');

    oldButton = $('a[id^="Demo"]').attr('data-button');
    newButton = $(btn).attr('data-button');

    $('.filter-gradient').removeClass(oldColor).addClass(newColor).attr('data-color', newColor);

    $('a[id^="Demo"]').removeClass("btn-" + oldButton).addClass("btn-" + newButton).attr('data-button', newButton);

    $('.carousel-indicators').removeClass("carousel-indicators-" + oldColor).addClass("carousel-indicators-" + newColor);

    $('.card').removeClass("card-" + oldColor).addClass("card-" + newColor);

    $('.selector').removeClass('active');
    $(btn).addClass('active');
}

$('.switch').each(function () {
    var selector = $(this).parent('li')
    $(this).click(function () {
        if (selector.siblings().hasClass('active')) {
            selector.addClass('active');
            selector.siblings().removeClass('active');
            var slide = $(this).attr('data-slide')
            var lastClass = $('body').attr('class').split(' ').pop();
            $('body').removeClass(lastClass);
            $('body').addClass('landing-page' + slide);
        }
    });
});

var parallax = debounce(function () {
    no_of_elements = 0;
    $('.parallax').each(function () {
        var $elem = $(this);

        if (isElementInViewport($elem)) {
            var parent_top = $elem.offset().top;
            var window_bottom = $(window).scrollTop();
            var $image = $elem.find('.parallax-background-image')
            var $oVal = ((window_bottom - parent_top) / 3);
            $image.css('margin-top', $oVal + 'px');
        }
    });
}, 6)

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};


function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') !== -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round($elem.offset().top);
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function mask(o, f) {
    setTimeout(function () {
        var v = mphone(o.value);
        if (v !== o.value) {
            o.value = v;
        }
    }, 1);
}

function mphone(v) {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
        // 11+ digits. Format as 5+4.
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "(0$1) $2-$3");
    } else if (r.length > 5) {
        // 6..10 digits. Format as 4+4
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "(0$1) $2-$3");
    } else if (r.length > 2) {
        // 3..5 digits. Add (0XX..)
        r = r.replace(/^(\d\d)(\d{0,5})/, "(0$1) $2");
    } else {
        // 0..2 digits. Just add (0XX
        r = r.replace(/^(\d*)/, "(0$1");
    }
    return r;
}

function resetForm() {
    // clearing inputs
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        switch (inputs[i].type) {
            // case 'hidden':
            case 'text':
                inputs[i].value = '';
                break;
            case 'radio':
            case 'checkbox':
                inputs[i].checked = false;
        }
    }

    // clearing selects
    var selects = document.getElementsByTagName('select');
    for (var i = 0; i < selects.length; i++)
        selects[i].selectedIndex = 0;

    // clearing textarea
    var text = document.getElementsByTagName('textarea');
    for (var i = 0; i < text.length; i++)
        text[i].innerHTML = '';

    return false;
}
