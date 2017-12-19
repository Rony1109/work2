define(function(require, exports, module){
	module.exports = {
		fn: function(){
			$('.ctn1 .btn').click(function(){
				$('.dialog').show();
				$('.shadow').css({
					width: $(document).width(),
					height: $(document).height(),
					opacity: 0.6
				}).show();
			});

			$('.dialog').find('.close').bind('click', function(){
				$('.dialog').hide();
				$('.shadow').hide();
				$('#Validform_msg').hide();
				return false;
			});
		},
		valid: function(elem){
			//表单验证及提交
			require('./Validform.css');
			require('./Validform.min.js');

			var form = $(elem).Validform();
			form.config({
				beforeSubmit: function(curform){
					$.post("http://cncms.csc86.com/formguide/index.php",$(curform).serialize(),function(data){
						if(data.status == true){
							alert("恭喜您！申请加入成功，我们的客服人员会在48小时内与您取得联系，感谢您的申请！");
							$(curform).find('input:not(:submit,:reset,:hidden)').val('');
							$('.dialog').hide();
							$('.shadow').hide();
							$('#Validform_msg').hide();
						}
						else{
							alert("申请失败，请刷新后重试！");
						}
					},'jsonp');
					return false; 
				}
			});
		}
	};

});