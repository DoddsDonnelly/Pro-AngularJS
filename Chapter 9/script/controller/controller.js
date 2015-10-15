var controllersModule = angular.module("exampleApp.Controllers", [])

// controller(name, constructor) acts as a conduit between the model and the views.

// the Module.controller method, takes two arguments: the name of the controller and a factory function, which is used to set up the controller and get it ready for use. 
// The naming convention for controllers is to use the suffix Ctrl. 
// The function passed to the Module.controller method is used to declare the controller's dependencies, which are the angularJS components that the controller requires.
/* AngularJS provides some built-in services and features that are specified using argument names that start with the $ symbol.   In this case $scope.
To declare a dependency on $scope, you just have to use the name as an argument to the factory function. */
/* Dependency Injection (DI) is where angularJS inspects the arguments that are specified for a function and locates the components they correspond to.
The function passed the controller method has an argument called x, and AngularJS will automatically pass in the scope object when the function is called 

In this example the controller depends on the $scope component to work.  
Dependency injection simplifies the process of dealing with dependencies - known as resolving a dependency - between components.  
without DI we would have to locate the $scope ourselves using global variables. */

/* A component in angularJS application declares its dependencies by defining arguments on its factory function whose names match the components it depends on.
In other words DI changes the purpose of the function arguments.  Without DI, arguments are used to receive whatever objects the caller wants to pass, but with DI, 
the function uses arguments to make demands, telling angularJS what building blocks it needs. */

// the order of the arguments always matches the order in which the dependencies are declared
// Each controller can support multiple views
controllersModule.controller("dayCtrl", function($scope, days) {
    //var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    $scope.day = days.today;
    //$scope.day = dayNames[new Date().getDay()];
    // $scope.tomorrow = dayNames[(new Date().getDate() + 1) % 7];
});
// both controllers can have a dayName property without them interfering with each other, as each scope has it's own part of the overall application. 
controllersModule.controller("tomorrowCtrl", function ($scope, days) {
    $scope.day = days.tomorrow;
    // var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //$scope.day = dayNames[(new Date().getDate() +1 ) %11 ];
});
