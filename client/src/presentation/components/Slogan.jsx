import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles({
  slogan: {
    margin: '0 0.2rem',
    whiteSpace: 'pre-line',
    fontWeight: '600',
  },
});

const Slogan = ({ content }) => {
  const classes = useStyle();
  return (
    <Typography className={classes.slogan} variant="h5" gutterBottom>
      {content}
    </Typography>
  );
};

Slogan.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Slogan;
