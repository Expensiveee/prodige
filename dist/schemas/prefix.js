"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefixSchema = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        required: true,
    },
});
exports.prefixSchema = mongoose_1.model('prefixes', schema);
