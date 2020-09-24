function resolveCb(resolve, reject) {
  return () => {
    if (chrome.runtime.lastError) {
      return reject(chrome.runtime.lastError);
    }
    return resolve();
  };
}

function getOptionsUrl() {
  const manifest = chrome.runtime.getManifest();
  const optionsURL = chrome.runtime.getURL(manifest.options_page);
  return optionsURL;
}

function openOptionsPage() {
  return new Promise((resolve, reject) => {
    const cb = resolveCb(resolve, reject);
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage(cb);
    } else {
      chrome.tabs.create({ url: getOptionsUrl }, cb);
    }
  });
}

export default {
  getOptionsUrl,
  openOptionsPage,
};
