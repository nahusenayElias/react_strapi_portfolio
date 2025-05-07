import { useState, useEffect } from 'react';

const useTypewriter = (text, speed = 100, loop = false) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isDeleting && currentIndex < text.length) {
      // Typing forward
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      }, speed);
    } else if (isDeleting && currentIndex > 0) {
      // Deleting backward
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex - 1));
        setCurrentIndex(prev => prev - 1);
      }, speed / 2); // Faster deletion
    } else if (loop && currentIndex === text.length) {
      // Finished typing, start deleting
      timeout = setTimeout(() => setIsDeleting(true), 1000); // Pause at end
    } else if (loop && currentIndex === 0 && isDeleting) {
      // Finished deleting, start typing again
      timeout = setTimeout(() => setIsDeleting(false), 500); // Pause at start
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, isDeleting, loop]);

  return {
    text: displayedText,
    isTyping: currentIndex < text.length || isDeleting
  };
};

export default useTypewriter;