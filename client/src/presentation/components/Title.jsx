import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles({
  title: {
    margin: '0.5rem 0',
  },
});

const Title = ({ content }) => {
  const classes = useStyle();
  return (
    <Typography className={classes.title} variant="h2" gutterBottom>
      {content}
    </Typography>
  );
};

Title.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Title;
