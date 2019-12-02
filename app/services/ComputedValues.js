export const getProgress = (keys, isPrivate = false, prefs = false) => {
  let totalItems = 7;
  if (isPrivate) {
    totalItems = totalItems + 1;
  }

  if (prefs) {
    totalItems = totalItems + 2;
  }

  return (keys.length / totalItems) * 100;
};
