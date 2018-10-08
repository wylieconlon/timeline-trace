const inspect = require('object-inspect');

let _preloadTrackQueue = [];

window.__tracker = function() {
  _preloadTrackQueue.push([...arguments]);
};

document.addEventListener('DOMContentLoaded', function() {
  function _addCallTracking(type, name, loc, ...args) {
    const stringifiedArgs = args.map(inspect);
    window.parent.postMessage({
      type: 'tracking',
      trackingBody: {
        type,
        name,
        loc,
        args: stringifiedArgs
      }
    }, '*');
  }

  if (_preloadTrackQueue.length > 0) {
    _preloadTrackQueue.forEach((trackedCall) => {
      _addCallTracking(...trackedCall);
    });
  }

  function __tracker() {
    _addCallTracking(...arguments);
  }

  window.__tracker = __tracker;
});