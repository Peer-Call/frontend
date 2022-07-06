import { createStore, action, persist } from 'easy-peasy';

const userStore = createStore(
  persist({
    user: {},
    updateUser: action((state, payload) => {
      console.log(payload, "Payload : ");
      state.user = payload;
    }),
  }, {
    storage: 'localStorage'
  }
  ),
);

export default userStore;
