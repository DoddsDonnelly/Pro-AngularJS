angular.module("exampleApp", ["increment", "ngResource"])
    .constant("baseUrl", "http://localhost:2403/products/")
.controller("defaultCtrl", function ($scope, $http, $resource, baseUrl) {
    $scope.displayMode = "list";
    $scope.currentProduct = null;

    // method - Sets HTTP method taht will be used for the Ajax request
    $scope.productsResource = $resource(baseUrl + ":id", { id: "@id" },
        { create: { method: "POST" }, save: { method: "PUT"}});

    $scope.listProducts = function () {
        // Using angular resource
        // the array returned by the query method is initially empty and is populated only when an asynchronous HTTP request to the server has completed
        $scope.products = $scope.productsResource.query();

        /*// Ajax request
        $http.get(baseUrl).success(function (data) {
            $scope.products = data;
        });*/

        /*// placeholder data 
        $scope.products = [
        { id: 0, name: "Dummy1", category: "Test", price: 1.25 },
        { id: 1, name: "Dummy2", category: "Test", price: 2.45 },
        { id: 2, name: "Dummy3", category: "Test", price: 4.25 }
        ]*/
    }

    $scope.deleteProduct = function (product) {
        // Using resources
        // $delete() - Deletes the object from the server; equivalent to calling $remove()
        // $remove() - Deletes the object from the server; equivalent to calling $delete()
        product.$delete().then(function () {
            $scope.products.splice($scope.products.indexOf(product), 1);
        });
        $scope.displayMode = "list";

        /*// Ajax request (HTTP DELETE method)
        $http({
            method: "DELETE",
            url: baseUrl + product.id
        }).success(function () {
            $scope.products.splice($scope.products.indexOf(product), 1);
        });*/
    }

    $scope.createProduct = function (product) {
        // Using resources
        // $save() - Saves the object to the server
        new $scope.productsResource(product).$save().then(function (newProduct) {
            $scope.products.push(newProduct);
            $scope.displayMode = "list";
        });

        /*// Ajax request (HTTP POST method)
        $http.post(baseUrl, product).success(function (newProduct) {
            $scope.products.push(product);
            $scope.displayMode = "list";
        });*/
    }

    $scope.updateProduct = function (product) {
        // Using resources
        product.$save();
        $scope.displayMode = "list";

        /*// Ajax request (HTTP PUT method)
        $http({
            url: baseUrl + product.id,
            method: "PUT",
            data: product
        }).success(function (modifiedProduct) {
            for (var i = 0; i < $scope.products.length; i++) {
                if ($scope.products[i].id == modifiedProduct.id) {
                    $scope.products[i] = modifiedProduct;
                    break;
                }
            }
            $scope.displayMode = "list";
        });*/
    }

    $scope.editOrCreateProduct = function (product) {
        // Using resources
        $scope.currentProduct = product ? product : {};
        //$scope.currentProduct = product ? angular.copy(product) : {};
        $scope.displayMode = "edit";
    }

    $scope.saveEdit = function (product) {
        if (angular.isDefined(product.id)) {
            $scope.updateProduct(product);
        } else {
            $scope.createProduct(product);
        }
    }

    $scope.cancelEdit = function (product) {
        // Using resources
        // $get() - Refreshes the object from the server, cleaning any uncommitted local changes
        if ($scope.currentProduct && $scope.currentProduct.$get) {
            $scope.currentProduct.$get();
        }
        $scope.currentProduct = {};
        $scope.displayMode = "list";
    }

    $scope.listProducts();
})