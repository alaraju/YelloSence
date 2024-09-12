import React from 'react';
import JobCard from '../components/JobCard';

const Bookmarks = ({ bookmarks, onRemoveBookmark }) => {
  if (bookmarks.length === 0) {
    return <p>No jobs bookmarked yet.</p>;
  }

  return (
    <div>
      {bookmarks.map((job) => (
        <JobCard key={job.id} job={job} onBookmark={onRemoveBookmark} isBookmarked={true} />
      ))}
    </div>
  );
};

export default Bookmarks;
