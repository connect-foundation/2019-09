import { MOBILE_VIEW_BREAKPOINT } from '../../../../config';

const initialIsMobile = window.innerWidth < MOBILE_VIEW_BREAKPOINT;

const gameInitialState = {
  mobileChattingPanelVisibility: initialIsMobile,
  isPlayerListVisible: !initialIsMobile,
  gamePageRootHeight: window.innerHeight,
};

export default gameInitialState;
