const delay = time => new Promise(resolve => setTimeout(() => resolve(), time));

const player = {
  state: [
    {
      id: 1,
      name: 'player 1',
    },
  ],
  reducers: {
    add(state, player) {
      const players = [...state];
      const existingPlayer = players.find(
        storedPlayer => storedplayer.id === player.id,
      );

      if (!existingPlayer) {
        players.push(player);
      }

      return players;
    },
    remove(state, id) {
      const players = [...state];
      const index = players.findIndex(player => player.id === id);

      if (index > -1) {
        players.splice(index, 1);
      }

      return players;
    },
  },
  effects: {
    async asyncRemove(id, state) {
      await delay(1000);
      this.remove(id);
    },
  },
};

export default user;
