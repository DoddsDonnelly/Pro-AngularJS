// filter(name, factory) - Creates a filter that formats data for display to the user

/* The filter method is used to define a filter, and the argument s are the name of the new filter and a factory function that will create the filter when invoked. 
Filters are themselves functions, which receive a data value and format it so it can be displayed */
angular.module("exampleApp.Filters", []).filter("dayName", function () {
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return function (input) {
        return angular.isNumber(input) ? dayNames[input] : input;
    };
});