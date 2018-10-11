import inspect from 'object-inspect';

let _preloadTrackQueue = [];

window.__tracker = function() {
  _preloadTrackQueue.push([...arguments]);
};

document.addEventListener('DOMContentLoaded', function() {
  function _addCallTracking(type, name, loc, ...args) {
    const stringifiedArgs = args.map(inspect);

    const locList = loc.split(',').map((l) => parseInt(l));
    const locObject = {
      start: {
        line: locList[0],
        column: locList[1],
      },
      end: {
        line: locList[2],
        column: locList[3],
      }
    };

    window.parent.postMessage({
      type: 'tracking',
      trackingBody: {
        type,
        name,
        loc: locObject,
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