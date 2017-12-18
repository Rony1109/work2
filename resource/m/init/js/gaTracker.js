define(function(require, exports, module) {
	var gaTracker={
		gaEvent:function(callback){
			window.CSCAnalyticsObject = 'cscga';
			window.cscga = window.cscga || function () {
					(cscga.q = cscga.q || []).push(arguments)
				};
			cscga.l = +new Date;
			cscga('create', 'SU-10001-1', 'auto', 'newtracker');
			cscga('newtracker.require', 'ec');
			cscga('set', 'userId', 'e51e6361-c37a-402c-bc7d-c86bdb21aa4d');
			cscga('set', 'userName', '13750363589');
			cscga('send', 'event', {
				'eventCategory': 'User',
				'eventAction': 'login',
				'eventLabel': 'csc86'
			});
		}
	};

	module.exports=gaTracker;
});
