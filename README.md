# default-browser-winlin
 [![Build Status](https://secure.travis-ci.org/jakub-g/default-browser-winlin.png)](http://travis-ci.org/jakub-g/default-browser-winlin)

 [![Get it on npm](https://nodei.co/npm/default-browser-winlin.png?compact=true)](https://www.npmjs.org/package/default-browser-winlin)


This small module finds out the default browser for current user (Windows / Linux).

Tested on Windows 7 64-bit, Windows XP 32-bit, Ubuntu 14.04 64-bit (en-US locale).

(For OS X, see [default-browser from Sindre Sorhus](https://github.com/sindresorhus/default-browser))

It requires nodejs and npm. If you don't have node, grab it at [nodejs.org](https://nodejs.org).
Node installer bundles npm (node package manager)


## How it works

* Windows:
  * checks registry value `HKCU\Software\Clients\StartMenuInternet`
* Linuxes:
  * reads the output of `xdg-mime query default x-scheme-handler/http`


## Usage as a nodejs module

```sh
$ npm install default-browser-winlin
```

```js
var defaultBrowser = require('default-browser-winlin');

defaultBrowser(function (err, res) {

    // in case of error, `err` will be a string with error message; otherwise it's `null`.

    console.dir(res);
	// => {
    //  isIE: false,
    //  isFirefox: true,
    //  isChrome: false,
    //  isChromium: false,
    //  isOpera: false,
    //  isWebkit: false,
    //  identity: 'firefox.exe',
    //  commonName: 'firefox'
    // }
});
```

* `commonName` is portable, it will be `ie`, `firefox`, `chrome`, `chromium`, `opera` or `unknown`
* `isWebkit` is true for Chrome, Chromium, Opera
* `identity` key is platform-specific.
  * On Windows, it's the prefix you can use for querying `HKLM\Software\Clients\StartMenuInternet\<prefix>`
    keys to find out details of the browser. It'll be one of `iexplore.exe`, `firefox.exe`, `google chrome`,
    `chromium.<somerandomkeyhere>`, `operastable`.
  * On Ubuntu, it will be `firefox.desktop`, `google-chrome.desktop`, `chromium-browser.desktop` or `opera.desktop`


## Usage from command line

```sh
$ npm install -g default-browser-winlin
$ default-browser-winlin
firefox
```

Command line version outputs the `commonName` key, i.e.  `ie`, `firefox`, `chrome`, `chromium`, `opera` or `unknown`.


## Linux support

This module was only tested on Ubuntu. Compatibility reports and fixes for other distros are more than welcome!
Use GitHub issues or email: (jakub.g.opensource) (gmail)


## License

MIT © [Jakub Gieryluk](http://jakub-g.github.io)


## Related projects

*     [default-browser](https://github.com/sindresorhus/default-browser) (OS X)
* [win-detect-browsers](https://github.com/vweevers/win-detect-browsers) (Windows)
*   [browser-launcher2](https://github.com/benderjs/browser-launcher2) (cross-platform)
*              [opener](https://github.com/domenic/opener) (cross-platform)
