/**
 * Created by Administrator on 2017-07-21.
 */
'use strict'
angular.module('fed',[
    'ngRoute',
    'fed.movie_detail',
    'fed.movie_list',

])
    .constant('AppConfig',{
        pageSize:10,
        listApiAddress:'http://api.douban.com/v2/movie/',
        detailApiAddress:'http://api.douban.com/v2/movie/subject/',
    })
    .config(['$routeProvider',function ($routeProvider) {
       $routeProvider.otherwise({redirectTo:'/in_theaters/p=1'});
}]).controller('NavController',[
    '$scope','$location',
    function ($scope,$location) {
    $scope.$location=$location;
         $scope.$watch('$location.path()',function (now) {
             if(now.startsWith('/in_theaters')){
             $scope.type = 'in_theaters';
             }else if(now.startsWith('/coming_soon')){
             $scope.type = 'coming_soon';
             }else if(now.startsWith('/top250')){
             $scope.type = 'top250';
             }
         })
    }
]).controller('SearchController',[
    '$scope','$route','AppConfig',
    function ($scope,$route,AppConfig) {
    console.log(AppConfig);
    $scope.input='';
    $scope.search=function () {
        console.log($scope.input);
        $route.updateParams({category:'search',q:$scope.input})
    }
}])
