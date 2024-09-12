import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';

const Jobs = ({ onBookmark, bookmarks }) => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs(page);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  const fetchJobs = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      
      console.log('API Response:', response.data); // Log response to see structure

      // Assuming the API response is structured as { data: [...] }
      if (response.data && Array.isArray(response.data.results)) {
    
        const validJobs = response.data.results.filter(job => job.id && job.title); // Filter valid jobs
        setJobs((prevJobs) => [...prevJobs, ...validJobs]);
        
      } else {
        setError('Unexpected API response format');
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to fetch jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onBookmark={onBookmark} isBookmarked={bookmarks.some((b) => b.id === job.id)} />
      ))}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Jobs;
