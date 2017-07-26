/**
 * Created by Administrator on 2017-07-21.
 */
(function (angular) {
    'use strict';

    // 创建正在热映的模块
    var module=angular.module('fed.movie_list',[
        'ngRoute',
        'fed.services.http'
    ]);
    // 配置模块的路由
    module.config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/:category/p=:page',{
            templateUrl:'movielist/view.html',
            controller:'MovieListController'
        });
    }]);
    module.controller('MovieListController',
        ['$scope','$route','$routeParams','HttpService','AppConfig',
            function ($scope,$route,$routeParams,HttpService,AppConfig) {
                var count=AppConfig.pageSize;
                var count =10;
                var page=parseInt($routeParams.page);
                var start=(page-1)*count;
                $scope.loading=true;
                $scope.subjects=[];

                $scope.message='';
                $scope.totalCount=0;
                $scope.totalPages=0;
                $scope.currentPage=page;
                HttpService.jsonp(
                    AppConfig.listApiAddress+$routeParams.category,
                    //$routeParams的数据来源：1.路由匹配出来2.？参数
                    {start:start,count:count,q:$routeParams.q},
                    function (data) {
                        $scope.subjects=data.subjects;
                        $scope.totalCount=data.total;
                        $scope.totalPages=Math.ceil($scope.totalCount/count);
                        $scope.loading=false;
                        $scope.$apply();
                 })
        //测试http服务
                $scope.go=function (page) {
                    if(page>=1&&page<=$scope.totalPages){
                        $route.updateParams({page:page});
                    }
                }
            }]);

})(angular)