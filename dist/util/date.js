"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertOutgoingDate = exports.convertIncomingDate = void 0;
const convertIncomingDate = (incomingDate) => {
    if (!incomingDate)
        return;
    const year = parseInt(incomingDate.substring(0, 4), 10);
    const month = parseInt(incomingDate.substring(4, 6), 10) - 1;
    const day = parseInt(incomingDate.substring(6, 8), 10);
    const hours = parseInt(incomingDate.substring(8, 10), 10);
    const minutes = parseInt(incomingDate.substring(10, 12), 10);
    const now = new Date(year, month, day, hours, minutes);
    return now;
};
exports.convertIncomingDate = convertIncomingDate;
const convertOutgoingDate = (outgoingDate) => {
    if (!outgoingDate)
        return;
    const year = outgoingDate.getFullYear();
    const month = String(outgoingDate.getMonth() + 1).padStart(2, '0');
    const day = String(outgoingDate.getDate()).padStart(2, '0');
    const hours = String(outgoingDate.getHours()).padStart(2, '0');
    const minutes = String(outgoingDate.getMinutes()).padStart(2, '0');
    const now = year + month + day + hours + minutes;
    return now;
};
exports.convertOutgoingDate = convertOutgoingDate;
//# sourceMappingURL=date.js.map