import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles({
  description: {
    margin: '0 0.2rem',
    fontSize: '1.2rem',
    whiteSpace: 'pre-line',
  },
});

const Description = ({ content }) => {
  const classes = useStyle();
  return (
    <Typography className={classes.description} variant="body1" gutterBottom>
      {content}
    </Typography>
  );
};

Description.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Description;
