import { useEffect, useState } from 'react';
import useIsMobile from './useIsMobile';
import { MOBILE_VIEW, DESKTOP_VIEW } from '../config';

const useShiftingToWhichView = mobileViewBreakpoint => {
  const isMobile = useIsMobile(mobileViewBreakpoint);
  const [shiftingTo, setShiftingTo] = useState('');

  const isViewShiftingToMobile = currentIsMobile => {
    return currentIsMobile && currentIsMobile !== shiftingTo;
  };

  useEffect(() => {
    if (!isViewShiftingToMobile(isMobile)) {
      setShiftingTo(DESKTOP_VIEW);
    } else if (isViewShiftingToMobile(isMobile)) {
      setShiftingTo(MOBILE_VIEW);
    }
  }, [isMobile]);
  return shiftingTo;
};

export default useShiftingToWhichView;
