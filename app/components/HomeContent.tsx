'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import HeroSection from './HeroSection';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const BUFFER_SIZE = 5; // add a buffer for the sections

const HomeContent: React.FC = () => {
  const [sections, setSections] = useState(() => Array.from({ length: 10 }, (_, i) => i + 1));
  const contentRef = useRef<HTMLDivElement>(null);

  // add sections to the top of the page
  const addSectionsToTop = useCallback(() => {
    setSections(prevSections => {
      const newSections = Array.from({ length: BUFFER_SIZE }, (_, i) => prevSections[0] - i - 1).reverse();
      return [...newSections, ...prevSections];
    });
  }, []);

  // add sections to the bottom of the page
  const addSectionsToBottom = useCallback(() => {
    setSections(prevSections => {
      const lastSection = prevSections[prevSections.length - 1];
      const newSections = Array.from({ length: BUFFER_SIZE }, (_, i) => lastSection + i + 1);
      return [...prevSections, ...newSections];
    });
  }, []);

  const [isFetchingDown, setIsFetchingDown, isFetchingUp, setIsFetchingUp] = useInfiniteScroll(
    addSectionsToBottom,
    addSectionsToTop
  );

  useEffect(() => {
    if (isFetchingDown) {
      setIsFetchingDown(false);
    }
    if (isFetchingUp) {
      setIsFetchingUp(false);
      if (contentRef.current) {
        const newFirstChild = contentRef.current.children[BUFFER_SIZE] as HTMLElement;
        if (newFirstChild) {
          window.scrollTo(0, newFirstChild.offsetTop);
        }
      }
    }
  }, [sections, isFetchingDown, isFetchingUp, setIsFetchingDown, setIsFetchingUp]);

  // initial scroll to middle of the page so it's more centered
  useEffect(() => {
    if (contentRef.current) {
      const middleIndex = Math.floor(sections.length / 2);
      const middleElement = contentRef.current.children[middleIndex] as HTMLElement;
      if (middleElement) {
        window.scrollTo(0, middleElement.offsetTop - window.innerHeight / 2);
      }
    }
  }, [sections.length]);

  return (
    <main ref={contentRef}>
      {sections.map((section, index) => (
        <HeroSection key={section} />
      ))}
    </main>
  );
};

export default HomeContent;
