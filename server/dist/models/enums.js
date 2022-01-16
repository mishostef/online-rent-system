"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceType = exports.userRole = void 0;
var userRole;
(function (userRole) {
    userRole[userRole["Owner"] = 0] = "Owner";
    userRole[userRole["Guest"] = 1] = "Guest";
    userRole[userRole["Admin"] = 2] = "Admin";
})(userRole = exports.userRole || (exports.userRole = {}));
var resourceType;
(function (resourceType) {
    resourceType[resourceType["villa"] = 0] = "villa";
    resourceType[resourceType["house"] = 1] = "house";
})(resourceType = exports.resourceType || (exports.resourceType = {}));
//# sourceMappingURL=enums.js.map