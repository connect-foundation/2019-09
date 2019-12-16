import { useEffect, useState } from 'react';
import EVENTS from '../constants/events';

const useInnerWidth = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener(EVENTS.RESIZE, e => {
      setInnerWidth(e.target.innerWidth);
    });
  }, []);

  return innerWidth;
};

export default useInnerWidth;
