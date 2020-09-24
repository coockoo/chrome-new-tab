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

function getStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], (res) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(res ? res[key] : null);
    });
  });
}

function setStorage(key, value) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(
      {
        [key]: value,
      },
      () => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve();
      }
    );
  });
}

export default {
  getOptionsUrl,
  openOptionsPage,
  getStorage,
  setStorage,
};
