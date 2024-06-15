"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcProgress = void 0;
const calcProgress = (totalCnt, closedCnt) => {
    if (totalCnt === 0) {
        return [0, 0, 0, 0];
    }
    return [
        totalCnt,
        totalCnt - closedCnt,
        closedCnt,
        Number((((totalCnt - (totalCnt - closedCnt)) / totalCnt) * 100).toFixed(2)),
    ];
};
exports.calcProgress = calcProgress;
//# sourceMappingURL=progress.js.map