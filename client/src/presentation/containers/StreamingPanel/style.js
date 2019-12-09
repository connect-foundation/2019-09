import { makeStyles } from '@material-ui/core/styles';
import { STYLE_COLORS } from '../../../utils';

const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    height: '100%',
    maxHeight: '48rem',
    minHeight: '20rem',
    backgroundColor: STYLE_COLORS.PANEL_COLOR,
    boxShadow: '0 0.2rem 0.7rem 0 rgba(0, 0, 0, 0.5)',
    borderRadius: '0.3rem',
    padding: 'none',
  },
}));

export default useStyles;
