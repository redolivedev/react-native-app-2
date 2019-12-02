const user = {
  state: {},
  reducers: {
    add(state, user) {
      return user;
    },
    update(state, newProps) {
      return {...state, ...newProps};
    },
    remove(state) {
      return {};
    },
  },
};

export default user;
