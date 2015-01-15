window.Echo = (function (window, document) {

    'use strict';

    var store = [], offset, throttle, poll;

    var _inView = function (el) {
        var coords = el.getBoundingClientRect();
        var inViewHeight = ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset, 10));
        var inViewWidth  = (coords.left <= (window.innerWidth || document.documentElement.clientWidth) + parseInt(offset, 10));

        return inViewHeight && inViewWidth;
    };

    var _pollImages = function () {
        for (var i = store.length; i--;) {
            var self = store[i];
            var selfAlt = self.getAttribute('data-alt');
            var selfClass = self.getAttribute('class').replace('omniecho', '');
            var $img = $('<img>').attr('alt', selfAlt).addClass(selfClass);
            var optimalSrc = '';

            if (_inView(self)) {
                optimalSrc = _responsiveImage(self);
                if (optimalSrc === false) {
                    $img.attr('src', self.getAttribute('data-echo'));
                } else {
                    $img.attr('src', optimalSrc);
                }
                $(self).replaceWith($img);

                store.splice(i, 1);
            }
        }
    };

    var _responsiveImage = function (ele) {
        var viewportW = window.innerWidth;
        // devicePixelRatio can be 1, 2 ,3, etc Galaxy S4 is 3
        if (viewportW <= 480 && ele.getAttribute('data-src-small') !== null) {
            return ele.getAttribute('data-src-small');
        } else if (viewportW <= 1024 && ele.getAttribute('data-src-medium') !== null) {
            return ele.getAttribute('data-src-medium');
        } else if (viewportW <= 1399 && ele.getAttribute('data-src-large') !== null) {
            return ele.getAttribute('data-src-large');
        } else if (viewportW >= 1400 && ele.getAttribute('data-src-xlarge') !== null) {
            return ele.getAttribute('data-src-xlarge');
        }

        return false;
    };

    var _throttle = function () {
        clearTimeout(poll);
        poll = setTimeout(_pollImages, throttle);
    };

    var init = function (obj) {
        var nodes = document.querySelectorAll('[data-echo]');
        var opts = obj || {};
        offset = opts.offset || 0;
        throttle = opts.throttle || 250;

        for (var i = 0; i < nodes.length; i++) {
            store.push(nodes[i]);
        }

        _throttle();

        if (document.addEventListener) {
            window.addEventListener('scroll', _throttle, false);
        } else {
            window.attachEvent('onscroll', _throttle);
        }

        window.triggerLazyImagesLoad = function () {
            $(window).scrollTop($(window).scrollTop()+1);
        };
    };

    return {
        init: init,
        render: _throttle
    };

})(window, document);