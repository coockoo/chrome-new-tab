import React from 'react';

const manifest = chrome.runtime.getManifest();
const optionsURL = chrome.runtime.getURL(manifest.options_page);

export default function Newtab() {
  const openOptions = (e) => {
    e.preventDefault();
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      chrome.tabs.create({ url: optionsURL });
    }
  };
  const bookmarks = [
    { title: 'Github', url: 'https://github.com' },
    { title: 'Messenger', url: 'https://messenger.com' },
  ];
  return (
    <div>
      {bookmarks.map((bookmark) => (
        <div key={bookmark.url}>
          <a href={bookmark.url}>{bookmark.title}</a>
        </div>
      ))}
      <a href={optionsURL} onClick={openOptions}>
        Options
      </a>
    </div>
  );
}
