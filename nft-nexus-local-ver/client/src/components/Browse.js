import React, { useState, useEffect, useCallback, useRef } from 'react';
import CollectionDisplay from './browse-nfts/CollectionDisplay'
import { searchCollection } from '../utils/api';
import './browse-nfts/CollectionDisplay.css';

const Browse = () => {
  const [output, setOutput] = useState([]);
  const [collection, setCollection] = useState('');
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [sort, setSort] = useState('');
  const [interval, setInterval] = useState('1');
  const fetchDataCalledRef = useRef(false); // Ref to prevent duplicate fetching

  const handleProcessData = useCallback(async (source) => {
    if (source === 'search' || source === 'load') {
      if (false) {
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
      if (source === 'search' || source === 'load') {
        setOutput((prevOutput) => [...prevOutput, ...response.output]);
      } else {
        setOutput((prevOutput) => [...prevOutput, ...response.output.slice(1)]);
      }
      
      setHasMore(response.output.length >= 20);
    } catch (error) {
      setOutput(["error"]);
      console.error('Error fetching collections:', error);
    }
  }, [collection, cursor, sort, hasMore]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      if (!fetchDataCalledRef.current) {
        fetchDataCalledRef.current = true;
        try {
          handleProcessData('load');
        } catch (err) {
          setOutput(["error"]);
        }
      };
    }
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
      <div class="header">
        <form className="center" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Type to search collections..."
            value={collection}
            onChange={(e) => {
                setCollection(e.target.value);
                setHasMore(false);
              }
            }
          />
          <select 
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setHasMore(false);
            }
          }
        >
          <option value="">Select sort...</option>
          <option value="created_date">Created Date</option>
          <option value="market_cap">Market Cap</option>
          <option value="num_owners">Number of Owners</option>
          <option value="one_day_change">1-Day Change</option>
          <option value="seven_day_change">7-Day Change</option>
          <option value="seven_day_volume">7-Day Volume</option>
        </select>
          <button type="submit">Search</button>
        </form>
        <p>Select interval:</p>
        <select 
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
        >
          <option value="1">1 day</option>
          <option value="7">7 day</option>
          <option value="30">30 day</option>
        </select>
      </div>
      
      <CollectionDisplay content={output} interval={interval}/>
      {hasMore && (
      <div className="load-more">
        <p>Scroll to reveal more collections...</p>
      </div>
      )}
    </main>
  );
};

export default Browse;