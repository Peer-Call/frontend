import { createStore, action, persist } from 'easy-peasy';

const userStore = createStore(
  persist({
    user: {},
    updateUser: action((state, payload) => {
      state.user = payload;
    }),
  }, {
    storage: 'localStorage'
  }
  ),
);

export default userStore;
