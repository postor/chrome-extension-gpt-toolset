chrome.runtime.onMessage.addListener(
  function(req, sender, cb) {
    console.log(req);
    cb({other: 'value'});
  }
);