"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true }
});
exports.User = mongoose_1.model('User', schema);
//# sourceMappingURL=User.js.map