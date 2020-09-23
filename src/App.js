import React from 'react';
import { hot } from 'react-hot-loader/root';

function App() {
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
    </div>
  );
}

export default hot(App);
