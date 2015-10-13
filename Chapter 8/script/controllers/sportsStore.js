// by omiting [] you are telling the module that you want to locate a module that has already been defined. 
// this controller defines data that will be used in different views 
// controllers can be arranged in a hierarchy, and will inherit data and logic from the controller above them.
// this is a top-level controller
angular.module("sportsStore")
    // Setting up the Ajax request
    // Ajax requests a regular HTTP request that happens asynchronously (in the background).  AngularJS represents a asynchronous operations using promises.   
    .constant("dataUrl", "http://localhost:2403/products")
    .constant("orderUrl", "http://localhost:2403/orders")
    .controller("sportsStoreCtrl", function ($scope, $http, $location, dataUrl, orderUrl, cart) {

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

        // sendOrder receives the shipping details for the user as its argument
        $scope.sendOrder = function (shippingDetails) {
            // The .copy method creates a copy of the shipping details object so that it can be manipulated without it affection other parts of the application. 
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            // $post method creates an Ajax POST request to the specified URL and data
            $http.post(orderUrl, order)
                // Request was successful
            .success(function (data) {
                //assigns the id of the newly created order object to a scope property and clears the contents of the cart. 
                $scope.data.orderId = data.id;
                cart.getProducts().length = 0;
            })
            // Problem with the request
            .error(function (error) {
                $scope.data.orderError = error;
            }).finally(function () {
                // page that should be routed to once the request is finished
                $location.path("/complete")
            })
        }
    });