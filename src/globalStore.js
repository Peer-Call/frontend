import { createStore } from "easy-peasy";
import user from "./models/user";
import videoCall from "./models/videoCall";

const globalModel = {
  user,
  videoCall,
};
const globalStore = createStore(globalModel, { name: "globalStore" });
// persist(
{
}
// {
//   storage: "localStorage",
// }
// ),
// );

export default globalStore;
