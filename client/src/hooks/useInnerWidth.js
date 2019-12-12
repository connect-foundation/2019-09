import { useEffect, useState } from 'react';

const useInnerWidth = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', e => {
      setInnerWidth(e.target.innerWidth);
    });
  }, []);

  return innerWidth;
};

export default useInnerWidth;
