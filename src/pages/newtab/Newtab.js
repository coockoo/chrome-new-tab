import React from 'react';

import chromeFns from '../../chrome-fns';

export default function Newtab() {
  const openOptions = (e) => {
    e.preventDefault();
    chromeFns.openOptionsPage();
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
      <a href={chromeFns.getOptionsUrl()} onClick={openOptions}>
        Options
      </a>
    </div>
  );
}
