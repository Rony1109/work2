define(function(require, exports, module) {
module.exports =  function() {
  $.get('http://i.csc86.com/mem/cstInfo', function(data) {
    var msg = '';
    if (data.status === '200') {
      data = data.data;
      switch (data.level) {
        case 'vip':
          if (data.surplusDay > 10) {
            msg = '<h2 style="font-size:15px;"><img src="http://res.csc86.com/js/p/artDialog/4.1.5/skins/icons/mem-w.png" alt="" width="24" height="24" /> &nbsp;您已成功升级为城商通VIP会员！</h2><p style="padding:10px 0 5px">服务期限：' + data.startTime.replace(/\-/g, '/') + '-' + data.endTime.replace(/\-/g, '/') + '</p><p style="color:#888">（您可在服务到期前10天办理续期，如需提前续期，请联系客服）</p></div>';
          } else {
            msg = '<h2 style="font-size:15px;padding:15px 0;"><img src="http://res.csc86.com/js/p/artDialog/4.1.5/skins/icons/mem-w.png" alt="" width="24" height="24" /> &nbsp;您的城商通VIP会员还有' + data.surplusDay + '天到期，确定继续开通服务？</h2><p><a href="http://pay.csc86.com/service/confirm.html?id=88082324-212f-46c0-b6cd-757ea3b2af29" style="padding:4px 17px;border-radius:3px;text-decoration:none;background:#f9601d;color:#fff">确定</a> &nbsp; &nbsp; &nbsp;<a href="javascript:void(cstDialog.hide())" style="color:#333;padding:4px 17px;border -radius:3px;text-decoration:none;background:#efefef">取消</a></p>';
          }
          break;
        case '城商通':
          if (data.surplusDay > 10) {
            msg = '<h2><img src="http://res.csc86.com/js/p/artDialog/4.1.5/skins/icons/mem-w.png" alt="" width="24" height="24" /> &nbsp;您已成功升级为城商通普通会员！</h2><p style="padding:10px 0 5px">服务期限：' + data.startTime.replace(/\-/g, '/') + '-' + data.endTime.replace(/\-/g, '/') + '</p><p style="color:#888">（您可在服务到期前10天办理续期，如需提前续期，请联系客服）</p></div>';
          } else {
            msg = '<h2 style="font-size:15px;padding:15px 0;"><img src="http://res.csc86.com/js/p/artDialog/4.1.5/skins/icons/mem-w.png" alt="" width="24" height="24" /> &nbsp;您的城商通普通会员还有' + data.surplusDay + '天到期，确定继续开通服务？</h2><p><a href="http://pay.csc86.com/service/confirm.html?id=88082324-212f-46c0-b6cd-757ea3b2af29" style="padding:4px 17px;border-radius:3px;text-decoration:none;background:#f9601d;color:#fff">确定</a> &nbsp; &nbsp; &nbsp;<a style="color:#333;padding:4px 17px;border-radius:3px;text-decoration:none;background:#efefef" href="javascript:void(cstDialog.hide())">取消</a></p>';
          }
          break;
      }
    }
    if (data.status === '303') {
      msg = '<h2 style="font-size:16px;padding:15px 0;"><img src="http://res.csc86.com/js/p/artDialog/4.1.5/skins/icons/mem-w.png" alt="" width="24" height="24" /> &nbsp;开通旺铺，才能升级为城商通会员哦！</h2><p><a href="http://member.csc86.com/shop/introduce.html" class="g-d-ib g-t-c" style="padding:4px 17px;border-radius:3px;font-size:15px;text-decoration:none;background:#f9601d;color:#fff">立即开通旺铺</a></p>';
    }
    if (msg.length > 0) {
      csc.useDialog(function() {
        window.cstDialog = artDialog({
          title: false,
          lock: true,
          content: '<div class="g-t-c" style="font-size:14px;width:466px;height:85px">' + msg + '</div>'
        });
      });
      return;
    }
    location.href = $('.opn-serv').attr('href');
  }, 'jsonp');
}

	});