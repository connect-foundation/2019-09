/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  video: {
    width: '100%',
    height: 'auto',
  },
}));

const StreamerVideo = ({ id }) => {
  const classes = useStyles();
  return <video id={id} className={classes.video} />;
};

StreamerVideo.propTypes = {
  id: PropTypes.string.isRequired,
};

export default StreamerVideo;
