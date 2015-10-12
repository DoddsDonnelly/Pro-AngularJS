// by omiting [] you are telling the module that you want to locate a module that has already been defined. 
// this controller defines data that will be used in different views 
// controllers can be arranged in a hierarchy, and will inherit data and logic from the controller above them.
// this is a top-level controller
angular.module("sportsStore")
    // Setting up the Ajax request
    // Ajax requests a regular HTTP request that happens asynchronously (in the background).  AngularJS represents a asynchronous operations using promises.   
    .constant("dataUrl", "http://localhost:2403/products")
    .controller("sportsStoreCtrl", function ($scope, $http, dataUrl) {

        $scope.data = {};

        // HTTP GET method to request the URL passes as an argument.  
        // HTTP GET method starts the request.  It returns an object that defines both the success and error methods.
        // AngularJS promises to call one of the methods to let you know how the request turned out. 
        $http.get(dataUrl)
            // Runs if there is no problem.  Also converts the JSON data to JavaScript objects. 
            .success(function (data) {
                $scope.data.products = data;
            })
            // Runs if there is a problem
            .error(function (error) {
                $scope.data.error = error;
            });
});