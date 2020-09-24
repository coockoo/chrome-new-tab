import React, { useEffect, useState } from 'react';

import chromeFns from '../../chrome-fns';

export default function Newtab() {
  const [bookmarks, setBookmarks] = useState([]);

  const openOptions = (e) => {
    e.preventDefault();
    chromeFns.openOptionsPage();
  };

  useEffect(() => {
    const doGetBookmarks = async () => {
      const newBookmarks = await chromeFns.getStorage('bookmarks');
      setBookmarks(newBookmarks || []);
    };
    doGetBookmarks();
    return () => {};
  }, []);

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
