import GUN from "gun/gun";
import "gun/sea";

const gun = GUN({
  peers: [
    "https://gunjs.herokuapp.com/gun",
    "http://peercall-gun.herokuapp.com/gun",
  ],
  localStorage: true,
  retry: 6,
});

const user = gun.user().recall({sessionStorage: true});

// Usage: use import gunInstance from './GunInstance.js'
export { gun, user };
