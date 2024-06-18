import React, { useState, useEffect, useCallback } from 'react';
import CollectionDisplay from './browse-nfts/CollectionDisplay'
import { searchCollection } from '../utils/api';

const Browse = () => {
  const [output, setOutput] = useState([]);
  const [collection, setCollection] = useState('');
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [sort, setSort] = useState('');
  const [renderCount, setRenderCount] = useState(0);

  const handleProcessData = useCallback(async (source) => {
    if (source === 'search' || source === 'load') {
      if (collection === null) {
        setOutput("400");
        return;
      }
      setOutput([]); // Clear the current output when initiating a new search
      setCursor(null); // Reset the cursor when initiating a new search
      setHasMore(false); // Reset hasMore when initiating a new search
    }
    try {
      const data = { collection, cursor, sort };
      const response = await searchCollection(data);
      console.log('Processed data:', response);
      setCursor(response.next);
      setOutput((prevOutput) => [...prevOutput, ...response.output]);
      setHasMore(response.output.length >= 100);
    } catch (error) {
      setOutput(["error"]);
      console.error('Error fetching collections:', error);
    }
  }, [collection, cursor, sort, hasMore]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        handleProcessData('load');
      } catch (err) {
        setOutput(["error"]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = async () => {
      // Check if the user has scrolled to the bottom of the page
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) return;
      
      // If the user has scrolled to the bottom and there are more NFTs to load, load more NFTs
      await handleProcessData('scroll');
    };

    // Add the scroll event listener to the window object
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function to remove the event listener when the component is unmounted or dependencies change
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleProcessData, hasMore]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProcessData('search');
  };

  return (
    <main>
      <form className="center" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Type to search collections..."
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>
      <CollectionDisplay content={output} />
      {hasMore && (
      <div className="load-more">
        <p>Scroll to reveal more collections...</p>
      </div>
      )}
    </main>
  );
};

export default Browse;