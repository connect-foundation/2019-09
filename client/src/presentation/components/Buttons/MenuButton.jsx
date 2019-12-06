import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import buttonStyle from './style';

const useStyles = makeStyles({
  button: props => ({
    ...buttonStyle,
    width: '100%',
    height: '5rem',
    fontSize: props.fontSize || '2rem',
    fontWeight: '600',
  }),
});

const MenuButtton = ({ onClick, children, fontSize }) => {
  const classes = useStyles({ fontSize });
  return (
    <Button onClick={onClick} variant="contained" className={classes.button}>
      {children}
    </Button>
  );
};

MenuButtton.propTypes = {
  children: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuButtton;
