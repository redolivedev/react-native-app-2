const newSession = {
  state: {
    date: new Date(),
  },
  reducers: {
    add(state, data) {
      return {...state, ...data};
    },
    remove(state, id) {
      return state;
    },
  },
};

export default newSession;
