// login.js

function providePlugin(pluginName, pluginConstructor) {
	var ga = window[window['GoogleAnalyticsObject'] || 'ga'];
	if (typeof ga == 'function') {
		ga('provide', pluginName, pluginConstructor);
	}
}

/**
 * Constructor for the  plugin.
 */
var loginplugin = function(tracker, config) {
	this.tracker = tracker;
	this.userName = config.userName || 'name';
	this.eventLabel = config.eventLabel || 'csc86';

};

loginplugin.prototype.loginset = function() {

	var name = this.userName;
	if (name) {
		this.tracker.set('userName', name);
	}
};


CampaignLoader.prototype.loginsend = function() {
	var eventLabel=this.eventLabel;
	this.tracker.send('event',{
		'eventCategory': 'User',
		'eventAction': 'login',
		'eventLabel' : eventLabel
	});
};

// Register the plugin.
providePlugin('loginplugin', loginplugin);