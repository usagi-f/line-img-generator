'use strict';

var module = angular.module('ligApp', []);

module.controller('mainCtrl', ['$scope', '$interval',
    function($scope, $interval) {

    //init
    $scope.title = 'お名前';
    $scope.type = 'right';
    $scope.status = {
        signal: 5,
        carrier: 'Softbank',
        network: 'wifi',
        time: new Date(),
        battery: 100
    };

    //status
    $scope.$watch('status.signal', function() {
        var signalArray = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false
        };
        for (var i = 1; i <= $scope.status.signal; i++) {
            signalArray[i] = true;
        }
        $scope.signals = signalArray;
    });
    $interval(function() {
        $scope.status.time = new Date();
    }, 30000);


    //timeline
    var logs = [],
        item;
    $scope.count = 0;
    $scope.messageSubmit = function(str) {
        if (!str) { return false; }
        item = {
            id: $scope.count,
            type: $scope.type,
            text: str,
            time: $scope.status.time
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

    //capture
    $scope.capture = function() {
        var capture = document.getElementById('capture');
        html2canvas(document.getElementById('app'), {
            onrendered: function(canvas) {
                capture.href = canvas.toDataURL('image/png');
            }
        });
        console.log(capture.href);
        capture.click();
    };
}]);
