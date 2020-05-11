/**
 *
 */

var cmmLib = {

        callAjax : function( url, /*param,*/ type, onSuccess) {
            this.excuteAjax(url, /*param,*/ type, onSuccess);
        },
        callAsyncAjax : function( url, /*param,*/ type, onSuccess) {
            this.excuteAsyncAjax(url, type, onSuccess);
        },
        excuteAjax		: function(url, /*param,*/ type, onSuccess) {

            $.ajax({
                url		: "http://222.121.219.245:7070/mapback"+url,
                //data	: param,
                type	: type,
                //cache	: false,
                //async	: false,
                beforeSend : function(){
                    $("#loading-mask").show();
                },
                complete:function(){
                    $("#loading-mask").fadeOut();

                },
                success	: onSuccess,

                error	: function(xhr, errMsg) {
                    console.log("ajax error: " , errMsg);
                }
            });
        },

        excuteAsyncAjax		: function(url, type, onSuccess) {

            $.ajax({
                url		: "http://222.121.219.245:7070/mapback"+url,
                type	: type,
                //cache	: false,
                async	: false,
                beforeSend : function(){
                    $("#loading-mask").show();
                },
                complete:function(){
                    $("#loading-mask").fadeOut();

                },
                success	: onSuccess,

                error	: function(xhr, errMsg) {
                    console.log("ajax error: " , errMsg);
                }
            });
        }

        ,getContextPath : function(){
            var hostIdx = location.href.indexOf( location.host ) + location.host.length;
            return location.href.substring( hostIdx, location.href.indexOf('/', hostIdx +1));
        }

}