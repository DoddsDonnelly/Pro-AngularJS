// code will be further explored in chapter 21.
angular.module("sportsStoreAdmin")
    .constant("productUrl", "http://localhost:2403/products/")
    // We don't have access to the $http service but we can change the default settings for the Ajax by calling the config method on the module and declaring a dependency on the provider for the $http service.  
.config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
})
    // $resource service is built on top of the features provided by the $http service and therefore withCredentials option must be enabled. 
.controller("productCtrl", function ($scope, $resource, productUrl) {

    // services can be created in several different ways, and this is one option - Defining the provider object that can be used to change the way that the service works. 
    // in this case the provider for the $http service, which is called $httpProvider, defines a defaults property that can be used to configure settings for all Ajax requests. 

    // The line below is the most important part of this.  This statement creates the access object that provides access to the RESTfulAPI
    // The first object passed into the $resource (productUrl) defines the the url format what will be used to make queries.
    // The :id corresponds to the map object, and tells angularJS that id the data object is working with an id property and that it should be appended to the URL. 
    // URLs and HTTP methods that are used to access the RESTful API are inferred from these two arguments, which means I don't have to make individual Ajax calls using the $http service. 
    $scope.productsResource = $resource(productUrl + ":id", { id: "@id" });

    $scope.listProducts = function () {
        $scope.products = $scope.productsResource.query();
    }

    // Adds the CRUD operations. 

    // Deletes products
    $scope.deleteProduct = function (product) {
        product.$delete().then(function () {
            $scope.products.splice($scope.products.indexOf(product), 1);
        });
    }

    // Adds New Product
    $scope.createProduct = function (product) {
        new $scope.productsResource(product).$save().then(function (newProduct) {
            $scope.products.push(newProduct);
            $scope.editedProduct = null;
        });
    }

    // Updates the products / Saves Product
    // The collection of data objects returned from the query method isn't automatically updated when objects are created or deleted, so code must be included to keep local collection in sync with remote changes. 
    $scope.updateProduct = function (product) {
        product.$save();
        $scope.editedProduct = null;
    }

    // Edits the products
    $scope.startEdit = function (product) {
        $scope.editedProduct = product;
    }

    // Cancels the edit on products
    $scope.cancelEdit = function () {
        $scope.editedProduct = null;
    }

    $scope.listProducts();

})