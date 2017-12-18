var project = {
    tab : function(tabs,box){
        var  $o = $(tabs);
        $o.bind("mouseover",function(){
            var $t = $(this),index = $t.index();
            $t.find("h3").hide().end().find("div").show().end().siblings().find("div").hide().end().find("h3").show();
            $(box).find("ul>li").eq(index).show().siblings().hide();
        });
    }
};

