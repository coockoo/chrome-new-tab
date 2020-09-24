import React, { useEffect, useState } from 'react';

import chromeFns from '../../chrome-fns';

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
    <div>
      {bookmarks.map((bookmark, index) => (
        <div key={bookmark.url}>
          {bookmark.title} - {bookmark.url}
          <button type="button" onClick={(e) => deleteBookmark(bookmark, index, e)}>
            Delete
          </button>
        </div>
      ))}
      <label htmlFor="title">Title:</label>
      <input id="title" type="text" value={title} onChange={onTitleChange} />
      <label htmlFor="url">URL:</label>
      <input id="url" type="text" value={url} onChange={onUrlChange} />

      <button type="button" onClick={addBookmark}>
        Add{' '}
      </button>
    </div>
  );
}
