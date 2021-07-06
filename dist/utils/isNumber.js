"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = void 0;
const isNumber = (arg) => {
    const x = new Number(arg).valueOf();
    return x == x;
};
exports.isNumber = isNumber;
