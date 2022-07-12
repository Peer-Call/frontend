import { thunk, action, computed } from "easy-peasy";
import { user as gunUserInstance } from "../GunInstance";

const userModel = {
  username: "",
  gunUserId: "",
  isLoggedIn: computed((state) => state.username !== ""),
  setUsername: action((state, payload) => {
    console.log("[setUsername()] :", payload);
    state.username = payload;
  }),
  setGunUserId: action((state, payload) => {
    console.log("[setGunUserId()] :", payload);
    state.gunUserId = payload;
  }),
  logout: thunk((actions, state) => {
    gunUserInstance.leave();
    actions.setUsername("");
    actions.setGunUserId("");
  }),
  // TODO: sync user with gundb (using listeners like thunkOn/actionOn and user.is/user.get(alias).on)
  // syncUser:,
};

export default userModel;
