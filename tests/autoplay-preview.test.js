const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('autoplay preview controller file exists', () => {
  const target = path.join(__dirname, '..', 'autoplay-preview.js');
  assert.equal(fs.existsSync(target), true);
});

test('exports createViewportAutoplayController', () => {
  const api = require('../autoplay-preview.js');
  assert.equal(typeof api.createViewportAutoplayController, 'function');
});

test('starts muted looping video when visible and pauses it offscreen', async () => {
  const { createViewportAutoplayController } = require('../autoplay-preview.js');
  let observerCallback;
  const observed = [];

  const observerFactory = (callback) => {
    observerCallback = callback;
    return {
      observe(video) { observed.push(video); },
      unobserve() {},
      disconnect() {}
    };
  };

  let playCalls = 0;
  let pauseCalls = 0;
  let loadCalls = 0;
  const video = {
    dataset: { src: 'https://example.test/video.mp4' },
    src: '',
    muted: false,
    loop: false,
    playsInline: false,
    autoplay: false,
    load() { loadCalls++; },
    play() { playCalls++; return Promise.resolve(); },
    pause() { pauseCalls++; }
  };

  const controller = createViewportAutoplayController({ observerFactory, threshold: 0.35 });
  controller.observe(video);

  assert.equal(video.muted, true);
  assert.equal(video.loop, true);
  assert.equal(video.playsInline, true);
  assert.equal(video.autoplay, true);
  assert.equal(observed[0], video);

  observerCallback([{ target: video, isIntersecting: true, intersectionRatio: 0.6 }]);
  await Promise.resolve();

  assert.equal(video.src, 'https://example.test/video.mp4');
  assert.equal(loadCalls, 1);
  assert.equal(playCalls, 1);

  observerCallback([{ target: video, isIntersecting: false, intersectionRatio: 0 }]);
  assert.equal(pauseCalls, 1);
});

test('portfolio integrates autoplay previews into project cards', () => {
  const script = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');
  const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const css = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf8');

  assert.match(index, /<script src="autoplay-preview\.js"><\/script>/);
  assert.match(script, /class="project-autoplay-video"/);
  assert.match(script, /autoplayController\.observe\(video\)/);
  assert.match(css, /\.project-autoplay-video/);
});
