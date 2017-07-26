/**
 * Created by Administrator on 2017-07-23.
 */
'use strict';
(function (angular) {
    var http=angular.module('fed.services.http',[]);
    http.service('HttpService',['$window','$document',function ($window,$document) {
            this.jsonp=function (url,data,callback) {
               

                var querystring=url.indexOf('?')==-1?'?':'&';
                for(var key in data){
                    querystring+=key+'='+data[key]+'&';
                }
                var fnSu=Math.random().toString().replace('.','')
                var cbFuncName='my_json_cb'+fnSu;
               
                querystring+='callback='+cbFuncName;
                // 创建一个script标签
                var scriptElement=$document[0].createElement('script');
                scriptElement.src=url+querystring;
                $window[cbFuncName]=function (data) {
                    callback(data);
                    $document[0].body.removeChild(scriptElement);
                };
                // 将script标签放到页面上
                $document[0].body.appendChild(scriptElement);
                // append过后页面会自动对这个地址发送请求请求完成以后自动执行
            };
                //1.处理url地址中的回调参数
               /* 创建script
                挂载回调函数*/
        // console.log($document);

    }])
})(angular);
