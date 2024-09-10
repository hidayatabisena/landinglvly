'use client';

import { useState, useEffect } from 'react';

const SCROLL_THRESHOLD = 1000; // this is the threshold for the scroll by pixels

const useInfiniteScroll = (
  callbackDown: () => void,
  callbackUp: () => void
) => {
  const [isFetchingDown, setIsFetchingDown] = useState(false);
  const [isFetchingUp, setIsFetchingUp] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetchingDown) return;
    callbackDown();
  }, [isFetchingDown, callbackDown]);

  useEffect(() => {
    if (!isFetchingUp) return;
    callbackUp();
  }, [isFetchingUp, callbackUp]);

  function handleScroll() {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Check for downward scroll
    if (scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD && !isFetchingDown) {
      setIsFetchingDown(true);
    }

    // Check for upward scroll
    if (scrollTop <= SCROLL_THRESHOLD && !isFetchingUp) {
      setIsFetchingUp(true);
    }
  }

  return [isFetchingDown, setIsFetchingDown, isFetchingUp, setIsFetchingUp] as const;
};

export default useInfiniteScroll;
