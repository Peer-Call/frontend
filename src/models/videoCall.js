import { action, computed } from "easy-peasy";

const videoCallModel = {
  id: "",
  host: {
    id: "",
    username: "",
  },
  participants: [],
  isInVideoCall: computed((state) => state.id !== ""),
  // TODO: use below implementation later
  // isInVideoCall: computed((state) => !!state.id),
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
    // removing duplicate elements
    const uniqueIds = new Set();
    state.participants = state.participants.filter((participant) => {
      const isDuplicate = uniqueIds.has(participant.id);
      uniqueIds.add(participant.id);
      if (!isDuplicate) return true;
      return false;
    });
  }),
  addParticipants: action((state, payload) => {
    console.log("[addParticipants()] :", payload);
    state.participants = payload;
  }),
  participantCount: computed((state) => state.participants.length),
};
export default videoCallModel;
