export const calcProgress = (totalCnt: number, closedCnt: number) => {
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
