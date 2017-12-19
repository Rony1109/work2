define(function(require, exports, module){
	module.exports = function(elem){
		//fixed
		$(elem).css({
			top: ((document.documentElement.clientHeight / 2) - ($(elem).height() / 2))
		});

		$(window).on('resize', function(){
			//fixed
			$(elem).animate({
				top: ((document.documentElement.clientHeight / 2) - ($(elem).height() / 2))
			});
		});

		var top_data = {
			'a.f1' : [108,540],
			'a.f2' : [188,1080],
			'a.f3' : [230,1728],
			'a.f4' : [270,2214],
			'a.f5' : [353,2700],
			'a.f6' : [394,3240],
			'a.f7' : [434,3780],
			'a.f8' : [515,4374]
		};

		var top_data_ = [
			['a.f1',108,540],
			['a.f2',188,1080],
			['a.f3',230,1728],
			['a.f4',270,2214],
			['a.f5',353,2700],
			['a.f6',394,3240],
			['a.f7',434,3780],
			['a.f8',515,4374]
		];


		$.each(top_data, function(name, value){
			$(name).on('click', function(){
				//$(this).addClass('cur').siblings().removeClass('cur');
				$('html,body').animate({
					scrollTop: value[1]
				});
				return false;
			});


		});
		$(window).on('scroll', function(){
			var s_top = $(document).scrollTop();
			var tem_el = '',s1,i=top_data_.length;

			if(s_top >= 594 && s_top <= 1026) {
				$('.fixed-active1').find('img').attr('src','images/active1.png');
				$('.fixed-active1').slideDown(0).siblings('.judge-ff').slideUp(0);
			}
			else if(s_top >= 2322 && s_top <= 2636) {
				$('.fixed-active4').find('img').attr('src','images/active4.png');
				$('.fixed-active4').slideDown(0).siblings('.judge-ff').slideUp(0);
			}
			else if(s_top >= 2812 && s_top <= 3190) {
				$('.fixed-active3').find('img').attr('src','images/active3.png');
				$('.fixed-active3').slideDown(0).siblings('.judge-ff').slideUp(0);
			}
			else if(s_top >= 4486 && s_top <= 5188) {
				$('.fixed-active2').find('img').attr('src','images/active2.png');
				$('.fixed-active2').slideDown(0).siblings('.judge-ff').slideUp(0);
			}
			else {
				$('.fixed-active1').slideUp(0);
				$('.fixed-active2').slideUp(0);
				$('.fixed-active3').slideUp(0);
				$('.fixed-active4').slideUp(0);
			}

			
			$('.fixed-active1 a.close').on('click', function(){
				$('.fixed-active1').animate({top: -135});
				return false;
			});
			
			$('.fixed-active2 a.close').on('click', function(){
				$('.fixed-active2').animate({top: -135});
				return false;
			});
			
			$('.fixed-active3 a.close').on('click', function(){
				$('.fixed-active3').animate({top: -135});
				return false;
			});
			
			$('.fixed-active4 a.close').on('click', function(){
				$('.fixed-active4').animate({top: -135});
				return false;
			});

			for(var s = i-1;s>=0;s--){
				if(top_data_[s][2] <= s_top){
					s1 = s;
					break;
				}
			}

			if(s1 !== undefined){
				$(top_data_[s1][0]).addClass('cur').siblings().removeClass('cur');

				$(elem).find('i.ball').stop(false).animate({top: top_data_[s1][1]});
			}
		}).trigger("scroll");
	};
});