import GUN from "gun/gun";
import "gun/sea";

const db = GUN({
  peers: [
    "https://gunjs.herokuapp.com/gun",
    "http://peercall-gun.herokuapp.com/gun",
  ],
  localStorage: false,
  retry: Infinity,
});

const user = db.user();

// Usage: use import gunInstance from './GunInstance.js'
export { db, user };
