import { STYLE_COLORS } from '../../../utils';

const buttonStyle = {
  backgroundColor: STYLE_COLORS.THEME_COLOR,
  border: 0,
  borderRadius: 3,
  color: STYLE_COLORS.BASE_WHITE_COLOR,
  padding: '0 30px',
  fontSize: '1.5rem',
  '&:hover': {
    backgroundColor: STYLE_COLORS.THEME_HOVER_COLOR,
  },
};

export default buttonStyle;
