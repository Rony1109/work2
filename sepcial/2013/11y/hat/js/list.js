$(function(){
    var $container = $('#prolist');
    $container.imagesLoaded(function(){
        $container.masonry({
            itemSelector: '.box',
            columnWidth: 5
        });
    });

    $(window).scroll(function(){
        if($(window).scrollTop() > $container.offset().top + $container.height() - $(window).height()){
            $.get("data/2.html",function(data){
                $(".loading").ajaxStart(function(){
                    $(this).show();
                });
                var $newElems = $(data);
                $newElems.imagesLoaded(function(){
                    $container.append($newElems);
                    $container.masonry( 'appended', $newElems, true );
                    $container.masonry({
                        itemSelector: '.box',
                        columnWidth: 5
                    } );
                },"html");
                $(".loading").ajaxSuccess(function(){
                    $(this).hide();
                });
            });
        }
    });

    $(".prolist li").live("mouseover",function(){
        var $t = $(this), w = $t.width(),h = $t.height();
        $t.find(".bg").width(w).height(h);
        if($t.hasClass("b2")){
            $(this).addClass("b2-cur");
        }else{
            $(this).addClass("cur");
        }
    });
    $(".prolist li").live("mouseout",function(){
        $(this).removeClass("cur").removeClass("b2-cur");
    });
});