/**
 * Created by Administrator on 2016/10/18.
 */
define(function(require, exports, module) {
    (function(window,localStorage,undefined){
        var LS = {
                set : function(key, value){
                    if( this.get(key) !== null )
                        this.remove(key);
                    localStorage.setItem(key, value);
                },
                get : function(key){
                    var v = localStorage.getItem(key);
                    return v === undefined ? null : v;
                },
                remove : function(key){ localStorage.removeItem(key); },
                clear : function(){ localStorage.clear(); },
                each : function(fn){
                    var n = localStorage.length, i = 0, fn = fn || function(){}, key;
                    for(; i<n; i++){
                        key = localStorage.key(i);
                        if( fn.call(this, key, this.get(key)) === false )
                            break;
                        if( localStorage.length < n ){
                            n --;
                            i --;
                        }
                    }
                }
            },
            j = window.jQuery, c = window.Core;
        if(j) j.LS = j.LS || LS;
        if(c) c.LS = c.LS || LS;
        module.exports= LS;
    })(window,window.localStorage);
});