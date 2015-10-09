// by omiting [] you are telling the module that you want to locate a module that has already been defined. 
// this controller defines data that will be used in different views 
// controllers can be arranged in a hierarchy, and will inherit data and logic from the controller above them.
// this is a top-level controller
angular.module("sportsStore")
    .controller("sportsStoreCtrl", function ($scope) {

        $scope.data = {
            products: [
                { name: "Product #1", description: "A product", category: "Category #1", price: 100 },
                { name: "Product #2", description: "A product", category: "Category #1", price: 110 },
                { name: "Product #3", description: "A product", category: "Category #2", price: 210 },
                { name: "Product #4", description: "A product", category: "Category #3", price: 202 },
            ]
        };
});