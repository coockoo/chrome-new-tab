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
      <ul className={s.bookmarks}>
        {bookmarks.map((bookmark, index) => (
          <li key={index} className={s.bookmark}>
            <a className={s.bookmarkLink} href={bookmark.url}>
              <div className={s.image}>
                <img src={bookmark.image} alt="logo" title={bookmark.title} />
              </div>
              <div className={s.text}>
                <h1 className={s.title}>{bookmark.title}</h1>
                <p className={s.url}>{bookmark.url}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <a className={s.optionsLink} href={chromeFns.getOptionsUrl()} onClick={openOptions}>
        Options
      </a>
    </div>
  );
}
