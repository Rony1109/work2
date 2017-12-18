define(function(require, exports, module) {

    module.exports.cateName = function() {
        var tmp = "",
            $strong = $("div.you-select").children("span,strong");
        $("[name^='category']>:selected").each(function(i) {
            tmp += (i > 0 ? " &gt; " : "") + "<span>" + $(this).text() + "</span>";
        });
        $strong.is("strong") ? $strong.html(tmp) : $strong.before('<strong>' + tmp + '</strong>') && $strong.remove();
    };

    module.exports.selectCate = function() {
        var
        othis = this,
            cateSelected = $.trim($("#cateSelected").val()),
            cats = '';
        if (cateSelected.length > 0) {
            var cats = cateSelected.split(",");
        }
        $("#cate1,#cate2").on("change", function() {
            var $t = $(this);
            othis.cateName();
            $.get("/inquiry/management/subCategory", {
                category: $t.val()
            }, function(data) {
                if (data.length && data[0]) {
                    var opt = "";
                    $.each(data, function(i, v) {
                        opt += '<option value="' + v.categoryNo + '">' + v.categoryName + '</option>';
                    });
                    $t.next().is("select") ? $t.next().html(opt).next("select").remove() : $t.after('<select size="6" name="category[2]">' + opt + '</select>');
                    if (cats.length > 0) {
                        if ($t.is("#cate1")) {
                            setTimeout(function() {
                                $("#cate2").val(cats[1]).trigger("change");
                                cats.length > 1 || (cats = '');
                            }, 10);
                        } else {
                            setTimeout(function() {
                                $t.next().val(cats[2]).trigger("change");
                                cats = '';
                            }, 10);
                        }
                    }
                } else {
                    $t.next("select").remove();
                }
                othis.cateName();
            }, "jsonp");
        });
        cateSelected.length && cats.length > 0 && setTimeout(function() {
            $("#cate1").val(cats[0]).trigger("change")
        }, 10);
        $(".pro-cate").delegate("select[name='category[2]']","change", othis.cateName);
    };
    
    var
    $categoryPath = $(":hidden[name='categoryPath']"),
        $lableName = $(":hidden[name='lableName']");
    $("select[name='lableId']").on("change", function() {
        var $t = $(this);
        $lableName.val($t.children(":selected").text());
    });
    $("form").on("submit", function() {
        //if ($("select[name^='category']:last").val()) {
            $categoryPath.val($("div.you-select>strong").html());
        //} else {
            //csc.showFormError($("select[name^='category']:last"), "请选择产品分类");
            //return false;
        //}
    });
});
