// Custom controller to handle selected the category used with the views ng-click directive
angular.module("sportsStore")
    // By using the constant method to define a fixed value called productLIstActiveClass, you will be able to change the class in one place and have it take effect everywhere it is used.  
    // To access the value in the controller you have to declare the constant name as a dependency. 
    .constant("productListActiveClass", "btn-primary")
    .constant("productListPageCount", 3)
    .controller("productListCtrl", function ($scope, $filter, productListActiveClass, productListPageCount, cart) {
        // The selectedCategory variable is not defined on the scope.  It is a regular JavaScript variable, and by doing it this way can only be used within this controller.  The view and all other directive will not be able to access or use it. 
        var selectedCategory = null;

        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;

        $scope.selectCategory = function (newCategory) {
            selectedCategory = newCategory;
            $scope.selectedPage = 1;
        }

        $scope.selectPage = function (newPage) {
            $scope.selectedPage = newPage;
        }

        $scope.categoryFilterFn = function (product) {
            return selectedCategory == null ||
                product.category == selectedCategory;
        }

        $scope.getCategoryClass = function (category) {
            return selectedCategory == category ? productListActiveClass : "";
        }

        $scope.getPageClass = function (page) {
            return $scope.selectedPage == page ? productListActiveClass : "";
        }

        $scope.addProductToCart = function (product) {
            cart.addProduct(product.id, product.name, product.price);
        }

    });