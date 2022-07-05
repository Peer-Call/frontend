import { createStore, action, persist } from 'easy-peasy';

const userStore = createStore(
  persist({
    username: "",
    updateUser: action((state, payload) => {
      state.username = payload;
    }),
  }),
);


// const userStore = createStore({
//   persist({
//     username: "",


//   }),
// });

export default userStore;

// user: {
//   updateUser: action((state, payload) => {
//   }),
//   },
