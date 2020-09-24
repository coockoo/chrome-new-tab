import React, { useEffect, useState } from 'react';

import chromeFns from '../../chrome-fns';

import s from './styles.less';

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
    <div className={s.newtab}>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.url}>
            <a href={bookmark.url}>{bookmark.title}</a>
          </li>
        ))}
      </ul>
      <a href={chromeFns.getOptionsUrl()} onClick={openOptions}>
        Options
      </a>
    </div>
  );
}
