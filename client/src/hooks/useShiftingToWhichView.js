import { useEffect, useState } from 'react';
import useIsMobile from './useIsMobile';

const useShiftingToWhichView = mobileViewBreakpoint => {
  const isMobile = useIsMobile(mobileViewBreakpoint);
  const [shiftingTo, setShiftingTo] = useState('');

  const isViewShiftingToMobile = currentIsMobile => {
    return currentIsMobile && currentIsMobile !== shiftingTo;
  };

  useEffect(() => {
    if (!isViewShiftingToMobile(isMobile)) {
      setShiftingTo('desktop');
    } else if (isViewShiftingToMobile(isMobile)) {
      setShiftingTo('mobile');
    }
  }, [isMobile]);
  return shiftingTo;
};

export default useShiftingToWhichView;
