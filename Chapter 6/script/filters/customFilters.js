// Custom Filter to create category elements dynamically from the product data object rather than create a fixed set of categories
// Custom filters are normally reusable within the current project as well as in other projects.  It is handy to keep a collection of frequently used filters to make your next project easier.  
angular.module("customFilter", [])
    // Filter methods are the name of the filter, and a factory function the returns a filter function that does the actual work.  
    .filter("unique", function () {
        // propertyName is an additional argument that will hold the results of the filtered data 
        return function (data, propertyName) {
            if (angular.isArray(data) && angular.isString(propertyName)) {
                var results = [];
                var keys = {};
                for (var i = 0; i < data.length; i++) {
                    var val = data[i][propertyName];
                    if (angular.isUndefined(keys[val])) {
                        keys[val] = true;
                        results.push(val);
                    }
                }
                return results;
            } else {
                return data;
            }
        }
    })


    // Pagination Filters
    // The range filter returns a range of elements from an array, corresponding to a page of products.  
    // Accepts arguments for the currently selected page and page size. 
    .filter("range", function ($filter) {
        return function (data, page, size) {
            if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
                var start_index = (page - 1) * size;
                if (data.length < start_index) {
                    return [];
                } else {
                    // the limitTo filter is a built in feature, which returns up to a specified number of items from an array.   
                    return $filter ("limitTo")(data.splice(start_index), size);
                }
            } else {
                return data;
            }
        }
    })

    // Filter figures out how many pages an array can be displayed in and then creates an array with that many numeric values.  
    // This works what may not be best practice as it is hacking the ng-repeat directive into doing something that it wasn't intended to do.  
    // The better way would be to make a custom directive, but is a quite advance technique and takes a more through understanding of the language. 
    .filter("pageCount", function () {
        return function (data, size) {
            if (angular.isArray(data)) {
                var result = [];
                for (var i = 0; i < Math.ceil(data.length / size) ; i++) {
                    result.push(i);
                }
                return result;
            } else {
                return data;
            }
        }
    });