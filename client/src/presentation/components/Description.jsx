import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles({
  description: props => ({
    margin: '0 0.2rem',
    fontSize: props.fontSize || '1rem',
    whiteSpace: 'pre-line',
  }),
});

const Description = ({ content, fontSize }) => {
  const classes = useStyle({ fontSize });
  return (
    <Typography className={classes.description} variant="body1" gutterBottom>
      {content}
    </Typography>
  );
};

Description.propTypes = {
  content: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
};

export default Description;
