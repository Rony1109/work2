function copyToClipboard(str) {
    var $this = $(str) , $div = $this.prev() , txt = $div.text() , id = $div.attr("id") , text = document.getElementById(id);
    if (window.clipboardData) {
        window.clipboardData.clearData();
        clipboardData.setData("Text", txt);
        csc.useDialog(function(){
            csc.success("复制成功！")
        });
    }else{
         if ($.browser.msie) {
            var range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if ($.browser.mozilla || $.browser.opera){
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        } else if ($.browser.safari) {
            var selection = window.getSelection();
            selection.setBaseAndExtent(text, 0, text, 1);
        }
        $this.next().remove();
        $this.after('<span class="c-888 m-l-10">请按 ctrl+c 复制</span>');
    }
}