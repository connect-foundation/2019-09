import { STYLE_COLORS } from '../../../utils';

const buttonStyle = {
  backgroundColor: STYLE_COLORS.BUTTON_BACKGROUND_COLOR,
  border: 0,
  borderRadius: 3,
  color: STYLE_COLORS.WHITE_COLOR,
  padding: '0 30px',
  fontSize: '1.5rem',
  '&:hover': {
    backgroundColor: STYLE_COLORS.BUTTON_BACKGROUND_COLOR_HOVER,
  },
};

export default buttonStyle;
