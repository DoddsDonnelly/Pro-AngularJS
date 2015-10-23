var app = angular.module("exampleApp", []);

app.controller("topLevelCtrl", function ($scope) {

    /* 
     * When you read the value of a property that is defined directly on the scope, AngularJS checks to see whether there is a local property in the controller's scope and, 
     * if not, starts working its way up the scope hierarchy to see whether it has inherited one.  However, when you use the ng-model directive to modify such a property, 
     * AngularJS checks to see whether the scope has a property of the right name and, if not, assumes you want to implicitly define it. The effect is to override the property
     * value.  This doesn't happen when you assign an object to the scope and then define your data properties on that object.  This is because Java script implements what is known
     * as prototype inheritance.  When  doing it this way ng-model will create local variables, while using an object as an intermediary, ensure that ng-model will update the 
     * data values defined in the in the parent scope.  
     */

    //$scope.dataValue = "Hello, Adam";
    $scope.data = {dataValue: "Hello, Adam"};

    $scope.reverseText = function () {
        $scope.data.dataValue = $scope.data.dataValue.split("").reverse().join("");
    }

    $scope.changeCase = function () {
        var result = [];
        angular.forEach($scope.data.dataValue.split(""), function (char, index) {
            result.push(index % 2 == 1 ? char.toString().toUpperCase() : char.toString().toLowerCase());
        });
        $scope.data.dataValue = result.join("");
    };
});

app.controller("firstChildCtrl", function ($scope) {
    $scope.changeCase = function () {
        $scope.data.dataValue = $scope.data.dataValue.toUpperCase();
    };
});

app.controller("secondChildCtrl", function ($scope) {
    $scope.changeCase = function () {
        $scope.data.dataValue = $scope.data.dataValue.toLowerCase();
    };

    $scope.shiftFour = function () {
        var result = [];
        angular.forEach($scope.data.dataValue.split(""), function (char, index) {
            result.push(index < 4 ? char.toUpperCase() : char);
        });
        $scope.data.dataValue = result.join("");
    }
});