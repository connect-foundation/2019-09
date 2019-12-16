import { useEffect, useState } from 'react';
import useInnerWidth from './useInnerWidth';

const useIsMobile = mobileViewBreakpoint => {
  const innerWidth = useInnerWidth();
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < mobileViewBreakpoint,
  );
  useEffect(() => {
    setIsMobile(innerWidth < mobileViewBreakpoint);
  }, [innerWidth]);
  return isMobile;
};

export default useIsMobile;
