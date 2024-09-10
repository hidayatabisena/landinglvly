'use client';

import { useState, useEffect, useCallback } from 'react';

const SCROLL_THRESHOLD = 1000; // this is the threshold for the scroll by pixels

const useInfiniteScroll = (
  callbackDown: () => void,
  callbackUp: () => void
) => {
  const [isFetchingDown, setIsFetchingDown] = useState(false);
  const [isFetchingUp, setIsFetchingUp] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // check downward scroll
    if (scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD && !isFetchingDown) {
      setIsFetchingDown(true);
    }

    // check upward scroll
    if (scrollTop <= SCROLL_THRESHOLD && !isFetchingUp) {
      setIsFetchingUp(true);
    }
  }, [isFetchingDown, isFetchingUp]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetchingDown) return;
    callbackDown();
  }, [isFetchingDown, callbackDown]);

  useEffect(() => {
    if (!isFetchingUp) return;
    callbackUp();
  }, [isFetchingUp, callbackUp]);

  return [isFetchingDown, setIsFetchingDown, isFetchingUp, setIsFetchingUp] as const;
};

export default useInfiniteScroll;

