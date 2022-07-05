import { createStore, action, debug } from 'easy-peasy';

const userStore = createStore({
  user: {
    username: "",
    updateUser: action((state, payload) => {
      state.username = payload;
    }),
  },
});

export default userStore;
