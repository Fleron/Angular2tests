/**
 * Created by fleron on 2016-12-23.
 */

angular.module('formExample', [])
    .controller('jsForm', ['$scope',function($scope){
        $scope.master = {};

        $scope.update = function(user){
            $scope.master = angular.copy(user);
        };
        $scope.reset = function(){
            $scope.user = angular.copy($scope.master);
        };
        $scope.reset();
    }]);