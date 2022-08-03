var assert = require('assert');
var detect = require('rewire')('../lib/detect-mac');

var defaultBrowserIdResponse = {
  err: undefined,
  browserId: undefined,
};

var defaultBrowserIdStub = function (cb) {
  cb(defaultBrowserIdResponse.err, defaultBrowserIdResponse.browserId);
};

detect.__set__('defaultBrowserMac', defaultBrowserIdStub);

describe('macOS tests', function () {
  beforeEach(function () {
    defaultBrowserIdResponse.err = undefined;
    defaultBrowserIdResponse.browserId = undefined;
  });

  it('detects chrome', function (done) {
    defaultBrowserIdResponse.browserId = 'com.google.chrome';

    detect(function (err, res) {
      assert.equal(res.isChrome, true);
      assert.equal(res.isChromium, false);
      assert.equal(res.isWebkit, true);
      assert.equal(res.commonName, 'chrome');
      assert.equal(res.identity, defaultBrowserIdResponse.browserId);
      done(err);
    });
  });

  it('detects opera', function (done) {
    defaultBrowserIdResponse.browserId = 'com.operasoftware.Opera';

    detect(function (err, res) {
      assert.equal(res.isChrome, false);
      assert.equal(res.isChromium, false);
      assert.equal(res.isOpera, true);
      assert.equal(res.isWebkit, true);
      assert.equal(res.commonName, 'opera');
      assert.equal(res.identity, defaultBrowserIdResponse.browserId);
      done(err);
    });
  });

  it('detects firefox', function (done) {
    defaultBrowserIdResponse.browserId = 'org.mozilla.firefox';

    detect(function (err, res) {
      assert.equal(res.isFirefox, true);
      assert.equal(res.isWebkit, false);
      assert.equal(res.commonName, 'firefox');
      assert.equal(res.identity, defaultBrowserIdResponse.browserId);
      done(err);
    });
  });

  it('detects safari', function (done) {
    defaultBrowserIdResponse.browserId = 'com.apple.Safari';

    detect(function (err, res) {
      assert.equal(res.isSafari, true);
      assert.equal(res.isChrome, false);
      assert.equal(res.isChromium, false);
      assert.equal(res.isOpera, false);
      assert.equal(res.isFirefox, false);
      assert.equal(res.isWebkit, true);
      assert.equal(res.commonName, 'safari');
      assert.equal(res.identity, defaultBrowserIdResponse.browserId);
      done(err);
    });
  });
});
