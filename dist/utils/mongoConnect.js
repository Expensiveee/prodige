"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongo = void 0;
const mongoose_1 = require("mongoose");
const mongo = async (mongoURI) => {
    return await mongoose_1.connect(mongoURI !== null && mongoURI !== void 0 ? mongoURI : '', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    });
};
exports.mongo = mongo;
