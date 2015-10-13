angular.module("sportsStoreAdmin")
    .constant("authUrl", "http://localhost:2403/users/login")
    .constant("ordersUrl", "http://localhost:2403/orders")
    .controller("authCtrl", function ($scope, $http, $location, authUrl) {

        $scope.authenticate = function (user, pass) {
            $http.post(authUrl, {
                username: user,
                password: pass
            }, {
                // the withCredentials option is set to true so that there is support for cross-origin requests.  Which allows Ajax requests to work with cookies that deal with authentication.  Without this option enabled, the browser will ignore the cookie the Deployd returns as part of the authentication response and expects to see in subsequent requests.  
                withCredentials: true
            }).success(function (data) {
                $location.path("/main");
            }).error(function (error) {
                $scope.authenticationError = error;
            });
        }
    })

    // mainCtrl provides the behaviors and data I needed to use the ng-include directives to manage views, as well as generate the navigation buttons that will switch between the views. 
.controller("mainCtrl", function ($scope) {

    $scope.screens = ["Products", "Orders"];
    $scope.current = $scope.screens[0];

    // setScreen Behavior is used to change the displayed view, which is exposed through the getScreen behavior. 
    $scope.setScreen = function (index) {
        $scope.current = $scope.screens[index];
    };

    $scope.getScreen = function () {
        return $scope.current == "Products"
            ? "/views/adminProducts.html" : "/views/adminOrders.html";
    };
})

    // Orders controller 
.controller("ordersCtrl", function ($scope, $http, ordersUrl) {

    // withCredentials set with get method this ensures that the browser includes the security cookie. 
    $http.get(ordersUrl, { withCredentials: true })
        .success(function (data) {
            $scope.orders = data;
        })
        .error(function (error) {
            $scope.error = error;
        });

    $scope.selectedOrder;

    // SelectOrder behavior is called to set a selectedOrder property, which will be used to zoom in on the details of an order.  
    $scope.selectOrder = function (order) {
        $scope.selectedOrder = order;
    }

    // calcTotal behavior works out the total value of the products in an order. 
    $scope.calcTotal = function (order) {
        var total = 0;
        for (var i = 0; i < order.products.length; i++) {
            total += order.products[i].count * order.products[i].price;
        }
        return total;
    }
});