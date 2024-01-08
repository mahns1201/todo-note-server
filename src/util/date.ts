export const convertIncomingDate = (incomingDate) => {
  const now = new Date(
    incomingDate.replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)$/, '$1-$2-$3 $4:$5'),
  );

  return now;
};

export const convertOutgoingDate = (outgoingDate: Date) => {
  const year = String(outgoingDate.getFullYear());
  const month = String(outgoingDate.getMonth() + 1).padStart(2, '0');
  const date = String(outgoingDate.getDate()).padStart(2, '0');
  const hour = String(outgoingDate.getHours()).padStart(2, '0');
  const minutes = String(outgoingDate.getMinutes()).padStart(2, '0');

  const now = year + month + date + hour + minutes;

  return now;
};
