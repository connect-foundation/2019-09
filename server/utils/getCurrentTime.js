const leadingZeros = (number, digits) => {
  let zero = '';
  const numberToString = number.toString();

  if (numberToString.length < digits) {
    for (i = 0; i < digits - numberToString.length; i++) zero += '0';
  }
  return zero + numberToString;
};

const getCurrentTime = () => {
  const date = new Date();
  const dateString = `${leadingZeros(date.getFullYear(), 4)}-${leadingZeros(
    date.getMonth() + 1,
    2,
  )}-${leadingZeros(date.getDate(), 2)} ${leadingZeros(
    date.getHours(),
    2,
  )}:${leadingZeros(date.getMinutes(), 2)}:${leadingZeros(
    date.getSeconds(),
    2,
  )}`;

  return dateString;
};

module.exports = { getCurrentTime };
