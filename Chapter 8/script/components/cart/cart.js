// Custom Service in a new module called cart
angular.module("cart", [])
    .factory("cart", function () {
        // JavaScript object
        var cartData = [];

        return {
            //  Adds the specified product to the cart or increments the number required if the cart already contains the product
            addProduct: function (id, name, price) {
                var addedToExistingItem = false;
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData[i].count++;
                        addedToExistingItem = true;
                        break;
                    }
                }
                if (!addedToExistingItem) {
                    cartData.push({
                        count: 1, id: id, price: price, name: name
                    });
                }
            },
            // Removes the product with the specified ID
            removeProduct: function (id) {
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData.splice(i, 1);
                        break;
                    }
                }
            },
            // Returns the array of objects in the cart
            getProducts: function () {
                return cartData;
            }
        }
    })

    // Directives call a directive method and pass in the name of the directive and a factory function that returns a directive definition object. 
    // The definition object defines properties that tell your directive what and how to do things.   
    .directive("cartSummary", function (cart) {
        return {
            // Specifies how the directive can be applied. This used the vaule of E, which means that this directive can be applied only as an element.  
            // The most common value is EA, which means that the directive can be applied as an element or as an attribute. 
            restrict: "E",
            // Specifies the URL of a partical view whose contents will be inserted into the directive's element. 
            templateUrl: "script/components/cart/cartSummary.html",
            // Specifies a controller that will provide data and behaviors to the partial view. 
            controller: function ($scope) {

                var cartData = cart.getProducts();

                // Calculates the total
                $scope.total = function () {
                    var total = 0;
                    for (var i = 0; i < cartData.length; i++) {
                        total += (cartData[i].price * cartData[i].count);
                    }
                    return total;
                }

                // Counts the item in the cart
                $scope.itemCount = function () {
                    var total = 0;
                    for (var i = 0; i < cartData.length; i++) {
                        total += cartData[i].count;
                    }
                    return total;
                }
            }
        };
    });