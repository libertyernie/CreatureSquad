importScripts('workbox-sw.prod.v1.0.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "about.html",
    "revision": "cb8138712c98e98ae57f22a53168c5a0"
  },
  {
    "url": "app.css",
    "revision": "8377df81c571adbdfb3ad30b2a81f310"
  },
  {
    "url": "app.js",
    "revision": "e85f955bdfe70143b8eba2e3b3f4ac3c"
  },
  {
    "url": "averages.js",
    "revision": "d2185ebe62233df40ee81aad06107bb4"
  },
  {
    "url": "bases.js",
    "revision": "2452201eee98aa31daf9eeb176fc7109"
  },
  {
    "url": "batter.js",
    "revision": "4601609c32c5500b0d9b37611fe046c6"
  },
  {
    "url": "defaultTeams.js",
    "revision": "31e8e96d62e37e8cdda4009de2812275"
  },
  {
    "url": "images/default.png",
    "revision": "9c3f22390d3a227de5b7e6caa4b3f041"
  },
  {
    "url": "images/paralari.svg",
    "revision": "b48f9fdf916be2f264eba78ca969e54c"
  },
  {
    "url": "images/team1/arike.png",
    "revision": "68a01215c8572bc7aaf3760d6d906aed"
  },
  {
    "url": "images/team1/centian.png",
    "revision": "0f08927e55c8ab5a290dc9c2a5fa4c44"
  },
  {
    "url": "images/team1/mason.png",
    "revision": "c5ac004a1e35298fc44e6b2183f2495d"
  },
  {
    "url": "images/team1/megan.png",
    "revision": "fecd99ef42bb0416732f6922d3851b95"
  },
  {
    "url": "images/team1/paralari.png",
    "revision": "05faf53f438e8ab263a90cb0902e8d35"
  },
  {
    "url": "images/team1/ralph.png",
    "revision": "c3bb12ca05a84c4026a84850809252d6"
  },
  {
    "url": "images/team1/sabina.png",
    "revision": "a822d596b792483c6c45fb06a90da9e8"
  },
  {
    "url": "images/team1/square/arike.png",
    "revision": "058f0ee131f13bf599bcf49f85e94281"
  },
  {
    "url": "images/team1/square/centian.png",
    "revision": "d8dda0a62fcd861f178587839379377c"
  },
  {
    "url": "images/team1/square/mason.png",
    "revision": "30d2bec238fbf93f0c95847610af6025"
  },
  {
    "url": "images/team1/square/megan.png",
    "revision": "3486be93487b5f7309ee24c4cdee581c"
  },
  {
    "url": "images/team1/square/paralari.png",
    "revision": "24a11dcd9692535f30a099c6957ac8be"
  },
  {
    "url": "images/team1/square/ralph.png",
    "revision": "9e0572f71bc8c18e68fbe4fb5291c8af"
  },
  {
    "url": "images/team1/square/sabina.png",
    "revision": "55e0d822ba9526c61460e65636db813c"
  },
  {
    "url": "images/team1/square/tomas.png",
    "revision": "51096a51e6fc2e1fedb95fc0fc352db6"
  },
  {
    "url": "images/team1/square/zigzag.png",
    "revision": "2e5671a592ef4397da1cda317002d544"
  },
  {
    "url": "images/team1/tomas.png",
    "revision": "ea3323c96d97ad3ea93579fb00271cc7"
  },
  {
    "url": "images/team1/zigzag.png",
    "revision": "0184e854a302620f09a0cf4e5066ef8e"
  },
  {
    "url": "images/team2/angie.svg",
    "revision": "30e12b4f394b03994bed9e93b33edf5e"
  },
  {
    "url": "images/team2/bandit.svg",
    "revision": "c60430510d2862b495cd4b86b402b680"
  },
  {
    "url": "images/team2/looper.svg",
    "revision": "9a8bc6dcb3e20af2f498784929da0b72"
  },
  {
    "url": "images/team2/maria.svg",
    "revision": "1f9fbafacecef9df52cf3a5765c1c802"
  },
  {
    "url": "images/team2/melanie.svg",
    "revision": "4d3435b7262ffd79bd7815a34078d4d2"
  },
  {
    "url": "images/team2/parker.svg",
    "revision": "fb4e639fb10cded60c6b7b4a5ee0bbfc"
  },
  {
    "url": "images/team2/robert.svg",
    "revision": "4e17f94e6a8db2f8f099d92e531fb290"
  },
  {
    "url": "images/team2/rory.svg",
    "revision": "fe8515c18cf4f6ff675e9583141ad4f4"
  },
  {
    "url": "images/team2/square/angie.svg",
    "revision": "f5e76d2e1cdc2fd4b0b28e35de31babe"
  },
  {
    "url": "images/team2/square/bandit.svg",
    "revision": "7201347ddfb40551ce46c8c1d1bf464c"
  },
  {
    "url": "images/team2/square/casey.svg",
    "revision": "dea0a16cca98fc31b5d49f1b0d299bd1"
  },
  {
    "url": "images/team2/square/looper.svg",
    "revision": "d512e716cab4d9cf48e9787d9cd59552"
  },
  {
    "url": "images/team2/square/maria.svg",
    "revision": "0924604ea44a51db569f944a39038aec"
  },
  {
    "url": "images/team2/square/melanie.svg",
    "revision": "2cb0bab6f5a5ae65dc3cef421c4eb96b"
  },
  {
    "url": "images/team2/square/parker.svg",
    "revision": "02056596d4f6040602028ee98bdf37e8"
  },
  {
    "url": "images/team2/square/robert.svg",
    "revision": "c47326df37abdaf31cf6bfeec17d3428"
  },
  {
    "url": "images/team2/square/rory.svg",
    "revision": "e580decb45c8db3e34e3b31bb7dac786"
  },
  {
    "url": "index.html",
    "revision": "0bc9971da9b86b906418dcdc27a39f0b"
  },
  {
    "url": "knockout-3.4.2.js",
    "revision": "e34bcfc1b1f58016c43f76230e661004"
  },
  {
    "url": "party-member.js",
    "revision": "407a12dae1674867073503ad38c1faf0"
  },
  {
    "url": "team-setup-model.js",
    "revision": "bcce223ffea4a12d66338586085880bd"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
