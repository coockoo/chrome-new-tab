import React, { useEffect, useState } from 'react';

import chromeFns from '../../chrome-fns';

import s from './styles.less';

export default function Options() {
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const addBookmark = (e) => {
    e.preventDefault();
    const doAddBookmark = async () => {
      const newBookmarks = [...bookmarks, { title, url }];
      await chromeFns.setStorage('bookmarks', newBookmarks);
      setBookmarks(newBookmarks);
      setTitle('');
      setUrl('');
    };
    doAddBookmark();
  };

  const deleteBookmark = (bookmark, index, e) => {
    e.preventDefault();
    const doDeleteBookmark = async () => {
      const newBookmarks = [...bookmarks.slice(0, index), ...bookmarks.slice(index + 1)];
      await chromeFns.setStorage('bookmarks', newBookmarks);
      setBookmarks(newBookmarks);
    };
    doDeleteBookmark();
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
    <div className={s.options}>
      <ul>
        {bookmarks.map((bookmark, index) => (
          <li key={bookmark.url} className={s.bookmark}>
            <div>
              <input type="text" value={bookmark.title} disabled />
              <input type="text" value={bookmark.url} disabled />
            </div>
            <button type="button" onClick={(e) => deleteBookmark(bookmark, index, e)}>
              Delete
            </button>
          </li>
        ))}
        <li className={s.bookmark}>
          <div>
            <input placeholder="title" type="text" value={title} onChange={onTitleChange} />
            <input placeholder="url" type="text" value={url} onChange={onUrlChange} />
          </div>
          <button type="button" onClick={addBookmark}>
            Add
          </button>
        </li>
      </ul>
    </div>
  );
}
