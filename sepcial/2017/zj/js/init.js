var arr = [
    ['范利霞', '财务部', 'cw/flx.jpg'],
    ['黄思华', '财务部', 'cw/hsh.jpg'],
    ['黄威龙', '财务部', 'cw/hwl.jpg'],
    ['马慧芳', '财务部', 'cw/mhf.jpg'],
    ['孙永波', '财务部', 'cw/syb.jpg'],
    ['唐林红', '财务部', 'cw/thl.jpg'],
    ['温仕娟', '财务部', 'cw/wsj.jpg'],
    ['温秋平', '法务部', 'fw/wqp.jpg'],
    ['Ben Fray', '计划运营部', 'jhyyb/Ben-Fray.jpg'],
    ['周俊晖', '计划运营部', 'jhyyb/zjh.jpg'],
    ['曹雯雯', '技术部', 'jsb/cww.jpg'],
    ['曾超', '技术部', 'jsb/zc.jpg'],
    ['陈文中', '技术部', 'jsb/cwz.jpg'],
    ['陈勇', '技术部', 'jsb/cy.jpg'],
    ['程峰', '技术部', 'jsb/cf.jpg'],
    ['戴秋芳', '技术部', 'jsb/dqf.jpg'],
    ['董佳庚', '技术部', 'jsb/djg.jpg'],
    ['杜学斌', '技术部', 'jsb/dxb.jpg'],
    ['冯金强', '技术部', 'jsb/fjq.jpg'],
    ['冯焰超', '技术部', 'jsb/fyc.jpg'],
    ['龚一涛', '技术部', 'jsb/gyt.jpg'],
    ['郭志刚', '技术部', 'jsb/gzg.jpg'],
    ['胡梅', '技术部', 'jsb/hm.jpg'],
    ['黄奎', '技术部', 'jsb/hk.jpg'],
    ['黄良宝', '技术部', 'jsb/hlb.jpg'],
    ['李欢', '技术部', 'jsb/lh.jpg'],
    ['李敏兰', '技术部', 'jsb/lml.jpg'],
    ['李志聪', '技术部', 'jsb/lzc.jpg'],
    ['林则灿', '技术部', 'jsb/lzc2.jpg'],
    ['刘经海', '技术部', 'jsb/ljh.jpg'],
    ['罗荣华', '技术部', 'jsb/lrh.jpg'],
    ['马新博', '技术部', 'jsb/mxb.jpg'],
    ['彭丽娥', '技术部', 'jsb/ple.jpg'],
    ['任贸华', '技术部', 'jsb/rmh.jpg'],
    ['沈松', '技术部', 'jsb/ss.jpg'],
    ['唐勇', '技术部', 'jsb/ty.jpg'],
    ['王建', '技术部', 'jsb/wj.jpg'],
    ['王雪莲', '技术部', 'jsb/wxl.jpg'],
    ['夏聪', '技术部', 'jsb/xc.jpg'],
    ['肖文武', '技术部', 'jsb/xww.jpg'],
    ['叶群莉', '技术部', 'jsb/yql.jpg'],
    ['张超', '技术部', 'jsb/zc2.jpg'],
    ['张文标', '技术部', 'jsb/zwb.jpg'],
    ['罗传真', '技术部', 'jsb/lcz.jpg'],
    ['周玲', '技术部', 'jsb/zl.jpg'],
    ['周薇薇', '技术部', 'jsb/zww.jpg'],
    ['周阳', '技术部', 'jsb/zy.jpg'],
    ['邹行', '技术部', 'jsb/zx.jpg'],
    ['陈思洁', '客户服务部', 'khfwb/csj.jpg'],
    ['胡青青', '客户服务部', 'khfwb/hqq.jpg'],
    ['黄凌', '客户服务部', 'khfwb/hl.jpg'],
    ['王玉燕', '客户服务部', 'khfwb/wyy.jpg'],
    ['杨丽', '客户服务部', 'khfwb/yl.jpg'],
    ['陈姗姗', '人力行政部', 'rlxzb/css.jpg'],
    ['杜琳琳', '人力行政部', 'rlxzb/dll.jpg'],
    ['郭超', '人力行政部', 'rlxzb/gc.jpg'],
    ['黄梦玲', '人力行政部', 'rlxzb/hml.jpg'],
    ['罗平 ', '人力行政部', 'rlxzb/lp.jpg'],
    ['欧阳', '人力行政部', 'rlxzb/oy.jpg'],
    ['吴裕榕', '人力行政部', 'rlxzb/wyr.jpg'],
    ['叶红霞', '人力行政部', 'rlxzb/yhx.jpg'],
    ['余瑶', '人力行政部', 'rlxzb/yy.jpg'],
    ['章斯', '人力行政部', 'rlxzb/zs.jpg'],
    ['向应涛', '商务拓展部', 'swtzb/xyt.jpg'],
    ['班倩', '市场部', 'scb/bq.jpg'],
    ['戴磊', '市场部', 'scb/dl.jpg'],
    ['董亮亮', '市场部', 'scb/dll.jpg'],
    ['高小倩', '市场部', 'scb/gxq.jpg'],
    ['王志静', '市场部', 'scb/wzj.jpg'],
    ['辛姣萍', '市场部', 'scb/xjp.jpg'],
    ['陈涛', '运营部客户组', 'yybkhz/ct.jpg'],
    ['何伟峰', '运营部客户组', 'yybkhz/hwf.jpg'],
    ['王静珍', '运营部客户组', 'yybkhz/wjz.jpg'],
    ['叶廷明', '运营部客户组', 'yybkhz/ytm.jpg'],
    ['詹诗奇', '运营部客户组', 'yybkhz/zsq.jpg'],
    ['邹子豪 ', '运营部客户组', 'yybkhz/zzh.jpg'],
    ['陈桐岳 ', '运营部媒体组', 'yybmtz/cyt.jpg'],
    ['陈志霞  ', '运营部媒体组', 'yybmtz/czx.jpg'],
    ['郭欢 ', '运营部媒体组', 'yybmtz/gh.jpg'],
    ['郭庭 ', '运营部媒体组', 'yybmtz/gt.jpg'],
    ['黄江宝 ', '运营部媒体组', 'yybmtz/hjb.jpg'],
    ['江涛 ', '运营部媒体组', 'yybmtz/jt.jpg'],
    ['姜梦 ', '运营部媒体组', 'yybmtz/jm.jpg'],
    ['康探 ', '运营部媒体组', 'yybmtz/kt.jpg'],
    ['刘军秀 ', '运营部媒体组', 'yybmtz/ljx.jpg'],
    ['刘宁 ', '运营部媒体组', 'yybmtz/ln.jpg'],
    ['罗少娜 ', '运营部媒体组', 'yybmtz/lsn.jpg'],
    ['滕尚霖  ', '运营部媒体组', 'yybmtz/tsl.jpg'],
    ['王群 ', '运营部媒体组', 'yybmtz/wq.jpg'],
    ['王婷 ', '运营部媒体组', 'yybmtz/wt.jpg'],
    ['吴红霞 ', '运营部媒体组', 'yybmtz/whx.jpg'],
    ['肖彦松 ', '运营部媒体组', 'yybmtz/xys.jpg'],
    ['张晨剑 ', '运营部媒体组', 'yybmtz/zcj.jpg'],
    ['张淑霞 ', '运营部媒体组', 'yybmtz/zsx.jpg'],
    ['张燕飞 ', '运营部媒体组', 'yybmtz/zyf.jpg'],
    ['周莹 ', '运营部媒体组', 'yybmtz/zy.jpg'],
    ['蔡丽娟 ', '运营部产品组', 'yybcpz/clj.jpg'],
    ['蔡平 ', '运营部产品组', 'yybcpz/cp.jpg'],
    ['曹彩霞 ', '运营部产品组', 'yybcpz/ccx.jpg'],
    ['曹雨婷 ', '运营部产品组', 'yybcpz/cyt.jpg'],
    ['曾祥明 ', '运营部产品组', 'yybcpz/zxm.jpg'],
    ['陈雄 ', '运营部产品组', 'yybcpz/cx.jpg'],
    ['苟昌云 ', '运营部产品组', 'yybcpz/gcy.jpg'],
    ['管东林 ', '运营部产品组', 'yybcpz/gdl.jpg'],
    ['胡中央 ', '运营部产品组', 'yybcpz/hzy.jpg'],
    ['黄芬 ', '运营部产品组', 'yybcpz/hf.jpg'],
    ['江山 ', '运营部产品组', 'yybcpz/js.jpg'],
    ['刘杰 ', '运营部产品组', 'yybcpz/lj.jpg'],
    ['欧洁霞 ', '运营部产品组', 'yybcpz/ojx.jpg'],
    ['唐玲 ', '运营部产品组', 'yybcpz/tl.jpg'],
    ['王晨 ', '运营部产品组', 'yybcpz/wc.jpg'],
    ['王冲 ', '运营部产品组', 'yybcpz/wc2.jpg'],
    ['王芬 ', '运营部产品组', 'yybcpz/wf2.jpg'],
    ['王露 ', '运营部产品组', 'yybcpz/wl.jpg'],
    ['王世琼 ', '运营部产品组', 'yybcpz/wsq.jpg'],
    ['王挺庚 ', '运营部产品组', 'yybcpz/wtg.jpg'],
    ['魏改改 ', '运营部产品组', 'yybcpz/wgg.jpg'],
    ['翁铭浚 ', '运营部产品组', 'yybcpz/wmj.jpg'],
    ['吴成功 ', '运营部产品组', 'yybcpz/wcg.jpg'],
    ['吴芳 ', '运营部产品组', 'yybcpz/wf.jpg'],
    ['吴民锋 ', '运营部产品组', 'yybcpz/wmf.jpg'],
    ['薛可 ', '运营部产品组', 'yybcpz/xk.jpg'],
    ['杨日兴 ', '运营部产品组', 'yybcpz/yrx.jpg'],
    ['杨晓丽 ', '运营部产品组', 'yybcpz/yxl.jpg'],
    ['叶俊柳 ', '运营部产品组', 'yybcpz/yjl.jpg'],
    ['于晓艳 ', '运营部产品组', 'yybcpz/yxy.jpg'],
    ['郁思 ', '运营部产品组', 'yybcpz/ys.jpg'],
    ['罗思昉 ', '运营部产品组', 'yybcpz/lsf.jpg']
];
var go, num;

function loop() {
    var r = Math.round(Math.random() * (arr.length - 1));
    num = r;
    $('.img').css('background-image', 'url(./img/' + arr[r][2] + ')');
    $('.department').html(arr[r][1]);
    $('.name').html(arr[r][0]);
}

$('.go').on('click', function () {
    var $this = $(this);
    if ($this.data("stop") == 1) {
        $this.data({"stop": 0});
        $this.removeClass("s");
        clearInterval(go);
        arr.splice(num, 1);
    } else {
        if(arr.length==0){alert('没有中奖人了！');return false;}
        $this.data({"stop": 1});
        $this.addClass("s");
        go = setInterval('loop()', 50);
    }

    $(window).on('beforeunload', function () {
        return '刷新或关闭页面后，中奖将数据丢失！！！！';
    });

});


function imagePreload() {
    for (i = 0; i < arr.length; i++) {
        var Preload=new Image();
        Preload.src ="img/"+arr[i][2];
    }
}
imagePreload();
