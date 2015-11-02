/*
    // Using the factory method
    
    // creates a custom logging service but their is a built in service called $log that could have been used. 
    //service name need to be unique because they will replace an existing one if you are not careful. 
.factory("logService", function () {
    // messageCount variable is defined in the factory function, rather than as part of the service object. 
    // We don't want consumers of the service to be able to modify the counter, and placing it outside of the service object means that it isn't accessible to 
    // to service customers. 
    var messageCount = 0;
    return {
        log: function (msg) {
            console.log("(LOG + " + messageCount++ + ") " + msg);
        }
    };
});*/

/*
// using service method with prototypes
var baseLogger = function () {
    this.messageCount = 0;
    this.log = function (msg) {
        console.log(this.msgType + ": " + (this.messageCount++) + " " + msg);
    }
};

var debugLogger = function () { };
debugLogger.prototype = new baseLogger();
debugLogger.prototype.msgType = "Debug";

var errorLogger = function () { };
errorLogger.prototype = new baseLogger();
errorLogger.prototype.msgType = "Error";

angular.module("customServices", [])
.service("logService", debugLogger)
.service("errorService", errorLogger);
*/

/* 
 // using service method without prototyping
angular.module("customServices", [])
.service("logService", function () {
    return {
        messageCount: 0,
        log: function (msg) {
            console.log("Debug: " + (this.messageCount++) + " " + msg);
        }
    };
});
*/

/*
// Using the provider method
angular.module("customServices", [])
.provider("logService", function () {
    return {
        $get: function () {
            return {
                messageCount: 0,
                log: function (msg) {
                    console.log("Debug: " + (this.messageCount++) + " " + msg);
                }
            }
        }
    };
});
*/

// Using provider method with functions
angular.module("customServices", [])
.provider("logService", function () {
    var counter = true;
    var debug = true;
    return {
        messageCounterEnabled: function (setting) {
            if (angular.isDefined(setting)) {
                counter = setting;
            } else {
                return counter;
            }
        },

        debugEnabled: function (setting) {
            if (angular.isDefined(setting)) {
                debug = setting;
                return this;
            } else {
                return debug;
            }
        },

        $get: function () {
            return {
                messageCount: 0,
                log: function (msg) {
                    if (debug) {
                        console.log("(LOG" + (counter ? " + " + this.messageCount++ + ") " : ") ") + msg);
                    }
                }
            };
        }
    }
});
