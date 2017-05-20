module.exports = {
  "globDirectory": ".\\",
  "globPatterns": [
    "**/*.{html,css,js,png,svg}"
  ],
  "swDest": "sw.js",
  "globIgnores": [
    "workbox-cli-config.js",
	"apple-touch-icon.png",
	"apple-touch-icon.svg",
	"favicon.png",
	"favicon.svg"
  ],
  modifyUrlPrefix: {
    '/': ''
  }
};
