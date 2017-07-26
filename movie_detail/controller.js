/**
 * Created by Administrator on 2017-07-21.
 */
(function (angular) {
    'use strict';

    // 创建正在热映的模块
    var module=angular.module('fed.movie_detail',[
        'ngRoute',
        'fed.services.http'
    ]);
    // 配置模块的路由
    module.config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/detail/:id',{
            templateUrl:'movie_detail/view.html',
            controller:'MovieDetailController'
        });
    }]);
    module.controller('MovieDetailController',
        ['$scope','$route','$routeParams','HttpService','AppConfig',
            function ($scope,$route,$routeParams,HttpService,AppConfig) {

                $scope.movie={};
                var id=$routeParams.id;
                var apiAddress=AppConfig.detailApiAddress+id;
                //跨域
                HttpService.jsonp(apiAddress,{},function (data) {
                    $scope.movie=data;
                   $scope.$apply();
                })
            }]);

})(angular)