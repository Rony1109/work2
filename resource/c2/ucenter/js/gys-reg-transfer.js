define(function(require, exports, module) {
    var transfer={
        exampleDialog:function(t,obj){
            var $body=$('body');
            var $exampleDialog=$('.example-dialog');
            var html='<div class="example-dialog">'+
                '<div class="bg"></div>'+
                '<div class="dialog-box">'+
                '<div class="dialog-hd">'+
                '<h2>'+t+'</h2>'+
                '<a class="close"></a>'+
                '</div>'+
                '<div class="dialog-bd">'+
                '</div>'+
                '</div>'+
                '</div>';

            if(!$exampleDialog[0]){
                $body.append(html);
            }else{
                $exampleDialog.find('.dialog-hd h2').html(t);
            }
            $body.find('.dialog-bd').append(obj);
            $exampleDialog=$body.find('.example-dialog')

            var $dialogBox=$exampleDialog.find('.dialog-box');
            var $close=$exampleDialog.find('.dialog-hd .close');
            var left=$dialogBox.outerWidth()/2;
            var top=$dialogBox.outerHeight()/2;

            $dialogBox.find('.dialog-hd').width($dialogBox.width());
            $dialogBox.css({'margin-left':-left,'margin-top':-top});

            $close.on('click',function(){
                $exampleDialog.remove();
                return false;
            });
        },
        init:function(){
            $('.jsPicExml').on('click',function(){
                var $this=$(this),
                    $img=$this.find('img').clone(),
                    t=$img.attr('alt');
                transfer.exampleDialog(t,$img);
            });
        }
    };
    transfer.init();
});