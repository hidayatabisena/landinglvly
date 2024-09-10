'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/HeroSection.module.css';


const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      gsap.to(section, {
        y: '-100%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <div ref={sectionRef} className={styles.heroSection}>
      <h1 className={styles.title}>About <span className={styles.asterisk}>*</span>me</h1>
      <div className={styles.tag}>Frontend Dev</div>
      <p className={styles.greeting}>Hey there, I'm Nadia Lovely! 👋</p>
      <p className={styles.description}>
        I'm a frontend developer who's all about turning complex ideas into smooth,
        user-friendly digital experiences. My curiosity about how businesses work
        and my passion for innovation led me to study Information Systems.
      </p>
      <p className={styles.description}>
        But coding isn't my only focus. I thrive on bringing creative ideas to life,
        whether through business plan competitions or leading projects. I've
        worked in startups, software houses, university committees, and as a
        freelancer.
      </p>
      <p className={styles.description}>
        I'm always up for the next challenge!
      </p>
    </div>
  );
};

export default HeroSection;
