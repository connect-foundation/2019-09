/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  video: {
    width: '100%',
    height: '100%',
  },
}));

const StreamerVideo = () => {
  const classes = useStyles();
  return <video className={classes.video} autoPlay />;
};

export default StreamerVideo;
