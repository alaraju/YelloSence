import React, { useState, useEffect } from 'react';
import Jobs from './screens/Jobs';
import Bookmarks from './screens/Bookmarks';
import './App.css'

const App = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks')) || []);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleBookmark = (job) => {
    if (!bookmarks.some((b) => b.id === job.id)) {
      setBookmarks([...bookmarks, job]);
    }
  };

  const handleRemoveBookmark = (job) => {
    setBookmarks(bookmarks.filter((b) => b.id !== job.id));
  };

  return (
    <div>
      <div className="navigation">
        <button className='bt job-card' onClick={() => setActiveTab('jobs')}>Jobs</button>
        <button className='bt job-card' onClick={() => setActiveTab('bookmarks')}>Bookmarks</button>
      </div>
      {activeTab === 'jobs' && <Jobs onBookmark={handleBookmark} bookmarks={bookmarks} />}
      {activeTab === 'bookmarks' && <Bookmarks bookmarks={bookmarks} onRemoveBookmark={handleRemoveBookmark} />}
    </div>
  );
};

export default App;
