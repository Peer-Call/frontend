import GUN from 'gun/gun';
import 'gun/sea';
// import 'gun/axe';

// change the relay server url - deploy that heroku thing
const db = GUN();

export const user = db.user().recall({ sessionStorage: true });

// Usage: use import gunInstance from './GunInstance.js'
export default db;
