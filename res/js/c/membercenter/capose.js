(function($) {
$.fn.extend({

    ie6fixedbug: function () {
        $(this).css("position", "absolute");
	
        var m = (window.screen.height - $(this).height()) / 4;

        var obj = $(this)[0];

        window.onscroll = function () {

            obj.style.top = (document.body.scrollTop || document.documentElement.scrollTop) + m + 'px';

        }
        window.onresize = function () {

            obj.style.top = (document.body.scrollTop || document.documentElement.scrollTop) + m + 'px';

        }
    }
});    

})(jQuery)