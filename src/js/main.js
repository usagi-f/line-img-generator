'use strict';

var module = angular.module('ligApp', []);

module.controller('mainCtrl', ['$scope', '$interval',
    function($scope, $interval) {

    var time = new Date();
    //status
    $scope.title = 'お名前';
    $scope.type = 'right';
    $scope.status = {
        signal: 1,
        carrier: 'Softbank',
        network: 'wifi',
        time: time,
        battery: 100
    };

    $scope.$watch('status.signal', function() {
        var array = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false
        },
            i = 1;
        while (i <= $scope.status.signal) {
            array[i] = true;
            i++;
        }
        $scope.signals = array;
    });
    $interval(function() {
        $scope.status.time = new Date();
    }, 30000);


    //timeline
    var logs = {},
        item;
    $scope.count = 0;
    $scope.messageSubmit = function(str) {
        if (!str) { return false; }
        item = {
            type: $scope.type,
            text: str
        };
        logs[$scope.count] = item;
        $scope.logs = logs;
        $scope.message = '';
        $scope.count++;
    };

    //input
    $scope.typeChange = function(str) {
        if (str === 'right') {
            $scope.type = 'left';
        } else if (str === 'left') {
            $scope.type = 'right';
        }
    };
}]);
