import { createStore, action, persist } from 'easy-peasy';

const userStore = createStore(
  persist({
    username: "",
    updateUser: action((state, payload) => {
      state.username = payload;
    }),
  }, {
    storage: 'localStorage'
  }
  ),
);

export default userStore;
