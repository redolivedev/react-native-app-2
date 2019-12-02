export const formatTime = time => {
  let hours = time.substr(0, 2);
  let minutes = time.substr(3, 5);
  let ampm = hours >= 12 ? 'pm' : 'am';
  if (hours.substr(0, 1) === '0') {
    hours = hours.substr(1, 2);
  }
  if (hours > 12) {
    hours = hours - 12;
  }
  return hours + ':' + minutes + ampm;
};

export const formatDate = date => {
  return (
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  );
};
