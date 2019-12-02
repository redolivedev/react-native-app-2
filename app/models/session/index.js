const session = {
  state: {
    toggle: 'dashboard',
  },
  reducers: {
    add(state, data) {
      return {...state, ...data};
    },
    toggle(state, data) {
      return {...state, ...data};
    },
    updateScore(state, data) {
      return {
        ...state,
        games: state.games.map(game => {
          if (game.id === data.gameId) {
            return {
              ...game,
              players: game.players.map(player => {
                if (player.id === data.player) {
                  return {
                    ...player,
                    scores: player.scores.map((score, index) => {
                      if (index === data.round) {
                        return data.score;
                      }

                      return score;
                    }),
                  };
                }
                return player;
              }),
            };
          }
          return game;
        }),
      };
    },
  },
};

export default session;
