import styleColors from '../../../constants/styleColors';

const buttonStyle = {
  backgroundColor: styleColors.THEME_COLOR,
  border: 0,
  borderRadius: 3,
  color: styleColors.BASE_WHITE_COLOR,
  padding: '0 30px',
  fontSize: '1.5rem',
  '&:hover': {
    backgroundColor: styleColors.THEME_HOVER_COLOR,
  },
};

export default buttonStyle;
