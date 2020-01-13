/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import buttonStyle from './style';
import shareButtonImageSource from '../../../assets/share.png';

const useStyles = makeStyles({
  button: {
    ...buttonStyle,
    width: '100%',
    height: '3.2rem',
    '& img': {
      width: '2rem',
    },
  },
});

const ShareUrlButton = ({ onClick, classNames }) => {
  const classes = useStyles();
  return (
    <Button
      onClick={onClick}
      className={`${classNames.join(' ')} ${classes.button}`}
    >
      <img alt="share" src={shareButtonImageSource} />
    </Button>
  );
};

ShareUrlButton.defaultProps = {
  classNames: [],
};

ShareUrlButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  classNames: PropTypes.array,
};

export default ShareUrlButton;
