import Gun from 'gun/gun'
import SEA from 'gun/sea.js'
import 'gun/lib/radix'
import 'gun/lib/radisk'
import 'gun/lib/store'
import 'gun/lib/rindexed'
import 'gun/lib/webrtc'
import 'gun/nts'

const gun = new Gun({
  peers: [
    "https://gunjs.herokuapp.com/gun",
    "http://peercall-gun.herokuapp.com/gun",
  ],
  localStorage: true,
  retry: 6,
});

const user = gun.user().recall({ sessionStorage: true });

export { gun, user };
