"use strict";
exports.__esModule = true;
exports.User = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
        type: String, required: true,
        values: ['Owner',
            'Guest',
            'Admin'],
        message: '{VALUE} is not supported'
    }
});
exports.User = mongoose_1.model('User', schema);
