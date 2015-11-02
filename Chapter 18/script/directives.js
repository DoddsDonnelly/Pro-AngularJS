angular.module("customDirectives", ["customServices"])
.directive("triButton", function (logService) {
    return {
        scope: {
            counter: "=counter"
        },
        link: function (scope, elemet, attrs) {
            elemet.on("click", function (event) {
                logService.log("Button click: " + event.target.innerText);
                scope.$apply(function () {
                    scope.counter++;
                });
            });
        }
    }
});