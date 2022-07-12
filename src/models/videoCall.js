import { action, computed } from "easy-peasy";

const videoCallModel = {
  id: "",
  host: {
    id: "",
    username: "",
  },
  participants: [],
  setId: action((state, payload) => {
    console.log("[setId()] :", payload);
    state.id = payload;
  }),
  setHostId: action((state, payload) => {
    console.log("[setHostId()] :", payload);
    state.host.id = payload;
  }),
  setHostUsername: action((state, payload) => {
    console.log("[setHostUsername()] :", payload);
    state.host.username = payload;
  }),
  addParticipant: action((state, payload) => {
    console.log("[addParticipant()] :", payload);
    state.participants.push(payload);
  }),
  participantCount: computed((state) => state.participants.length),
};
export default videoCallModel;
