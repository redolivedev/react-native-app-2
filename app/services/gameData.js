const games = [
  {
    value: 1,
    label: 'Mini golf',
  },
  {
    value: 2,
    label: 'Croquet',
  },
  {
    value: 3,
    label: 'Cornhole',
  },
  {
    value: 4,
    label: 'Ring toss',
  },
  {
    value: 5,
    label: 'Shuffleboard',
  },
  {
    value: 6,
    label: 'Curling',
  },
  {
    value: 7,
    label: 'Trivia Faces',
  },
  {
    value: 8,
    label: 'Trivia Maps',
  },
  {
    value: 9,
    label: 'Basketball trick shot',
  },
  {
    value: 10,
    label: 'Giant ski ball',
  },
  {
    value: 11,
    label: 'Hockey',
  },
  {
    value: 12,
    label: 'Archery',
  },
  {
    value: 13,
    label: 'Giant sling shot',
  },
  {
    value: 14,
    label: 'Soccer darts',
  },
  {
    value: 15,
    label: 'Giant darts',
  },
  {
    value: 16,
    label: 'Giant pool table',
  },
  {
    value: 17,
    label: 'Rubber ball trick shot',
  },
  {
    value: 18,
    label: 'Bottle flipping',
  },
];

export const getAllGames = () => {
  return games;
};

export const getGame = id => {
  return games.find(game => game.value === id);
};
