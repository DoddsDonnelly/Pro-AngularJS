angular.module("exampleApp", ["increment", "ngResource", "ngRoute", "ngAnimate"])
    .constant("baseUrl", "http://localhost:2403/products/")
    .factory("productsResource", function ($resource, baseUrl) {
        return $resource(baseUrl + ":id", { id: "@id" }, { create: { method: "POST" }, save: { method: "PUT" } });
    })
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        /*$routeProvider.when("/list", {
            templateUrl: "/views/tableView.html"
        });*/

        $routeProvider.when("/edit/:id", {
            templateUrl: "/views/editorView.html",
            controller: "editCtrl"
        });

        /*$routeProvider.when("/edit/:id/:data*", {
            templateUrl: "/views/editorView.html"
        });*/

        $routeProvider.when("/create", {
            templateUrl: "/views/editorView.html",
            controller: "editCtrl"
        });

        $routeProvider.otherwise({
            templateUrl: "/views/tableView.html",
            controller: "tableCtrl",
            resolve: {
                data: function (productsResource) {
                    return productsResource.query();
                }
            }
        });
    })

    .controller("defaultCtrl", function ($scope, $location, productsResource) {
    //.controller("defaultCtrl", function ($scope, $http, $resource, $location, $route, baseUrl) {
    //$scope.displayMode = "list";
    //$scope.currentProduct = null;

    //$routeChangeSuccess - Triggered after the route has changed
    /*$scope.$on("$routeChangeSuccess", function () {
        if ($location.path().indexOf("/edit/") == 0) {
            var id = $routeParams["id"];
            for (var i = 0; i < $scope.products.length; i++) {
                if ($scope.products[i].id == id) {
                    $scope.currentProduct = $scope.products[i];
                    break;
                }
            }
        }
    });*/

        $scope.data = {};
    // method - Sets HTTP method that will be used for the Ajax request
    //$scope.productsResource = $resource(baseUrl + ":id", { id: "@id" }, { create: { method: "POST" }, save: { method: "PUT" } });

    /*$scope.listProducts = function () {
        // Using angular resource
        // the array returned by the query method is initially empty and is populated only when an asynchronous HTTP request to the server has completed
        $scope.products = $scope.productsResource.query();
    }*/

    $scope.createProduct = function (product) {
        // Using resources
        // $save() - Saves the object to the server
        new productsResource(product).$create().then(function (newProduct) {
            $scope.data.products.push(newProduct);
            // using the routing service
            $location.path("/list");
        });
    }

    $scope.deleteProduct = function (product) {
        // Using resources
        // $delete() - Deletes the object from the server; equivalent to calling $remove()
        // $remove() - Deletes the object from the server; equivalent to calling $delete()
        product.$delete().then(function () {
            //$scope.products.splice($scope.products.indexOf(product), 1);
            $scope.data.products.splice($scope.data.products.indexOf(product), 1);
        });
        // using the routing service
        $location.path("/list");
    }

    /*$scope.updateProduct = function (product) {
        // Using resources
        product.$save();
        // using the routing service
        $location.path("/list");
    }

    $scope.saveEdit = function (product) {
        if (angular.isDefined(product.id)) {
            $scope.updateProduct(product);
        } else {
            $scope.createProduct(product);
        }
        $scope.currentProduct = {};
    }

    $scope.cancelEdit = function () {
        // Using resources
        // $get() - Refreshes the object from the server, cleaning any uncommitted local changes
        if ($scope.currentProduct && $scope.currentProduct.$get) {
            $scope.currentProduct.$get();
        }
        $scope.currentProduct = {};
        // using the routing service
        $location.path("/list");
    }*/

    //$scope.listProducts();
    })
    .controller("tableCtrl", function ($scope, $location, $route, data) {
        $scope.data.products = data;

        $scope.refreshProducts = function () {
            $route.reload();
        }
    })
.controller("editCtrl", function ($scope, $routeParams, $location) {

    $scope.currentProduct = null;

    if ($location.path().indexOf("/edit/") == 0) {
        var id = $routeParams["id"];
        //for (var i = 0; i < $scope.products.length; i++) {
            for (var i = 0; i < $scope.data.products.length; i++) {
                //if ($scope.products[i].id == id) {
                if ($scope.data.products[i].id == id) {
                //$scope.currentProduct = $scope.products[i];
                $scope.currentProduct = $scope.data.products[i];
                break;
            }
        }
    }

    $scope.cancelEdit = function () {
        /*if ($scope.currentProduct && $scope.currentProduct.$get) {
            $scope.currentProduct.$get();
        }

        $scope.currentProduct = {};*/
        $location.path("/list");
    }

    $scope.updateProduct = function (product) {
        product.$save();
        $location.path("/list");
    }

    $scope.saveEdit = function (product) {
        if (angular.isDefined(product.id)) {
            $scope.updateProduct(product);
        } else {
            $scope.createProduct(product);
        }
        $scope.currentProduct = {};
    }
});