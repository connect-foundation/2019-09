import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles({
  title: props => ({
    margin: '0.5rem 0',
    fontSize: props.fontSize || '2rem',
  }),
});

const Title = ({ content, fontSize }) => {
  const classes = useStyle({ fontSize });
  return (
    <Typography className={classes.title} variant="h2" gutterBottom>
      {content}
    </Typography>
  );
};

Title.propTypes = {
  content: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
};

export default Title;
