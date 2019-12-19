import { makeStyles } from '@material-ui/core/styles';
import styleColors from '../../../constants/styleColors';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    height: '100%',
    backgroundColor: styleColors.BASE_BLACK_COLOR,
    boxShadow: '0 0.2rem 0.7rem 0 rgba(0, 0, 0, 0.5)',
    borderRadius: '0.3rem',
    [theme.breakpoints.down('xs')]: {
      borderRadius: '0',
    },
    padding: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default useStyles;
