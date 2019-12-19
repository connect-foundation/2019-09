import { useEffect, useState } from 'react';
import EVENTS from '../constants/events';

const useInnerWidth = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const resizeEventHandler = event => {
    setInnerWidth(event.target.innerWidth);
  };

  useEffect(() => {
    window.addEventListener(EVENTS.RESIZE, resizeEventHandler);
    return () => {
      window.removeEventListener(EVENTS.RESIZE, resizeEventHandler);
    };
  }, []);

  return innerWidth;
};

export default useInnerWidth;
