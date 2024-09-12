import React from 'react';
import './JobCard.css';

const JobCard = ({ job, onBookmark, isBookmarked }) => {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>company_name: {job.company_name}</p>
      <p>job_hours: {job.job_hours}</p>
      <p>job_category:{job.job_category}</p>
      <p>whatsapp_no: {job.whatsapp_no}</p>
      <button onClick={() => onBookmark(job)}>
        {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
      </button>
    </div>
  );
};

export default JobCard;
