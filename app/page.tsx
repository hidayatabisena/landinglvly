import React from 'react';
import HomeContent from './components/HomeContent';
import { ThemeToggle } from './components/ThemeToggle';

export default function Home() {
  return (
    <div>
      <HomeContent />
      <ThemeToggle />
    </div>
  );
}
