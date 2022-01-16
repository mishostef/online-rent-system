"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
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
//# sourceMappingURL=User.js.map