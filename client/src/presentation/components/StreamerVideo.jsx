/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  video: {
    width: '100%',
    height: '100%',
    transform: 'rotateY(180deg)',
  },
}));

const StreamerVideo = ({ stream }) => {
  const classes = useStyles();
  const ref = React.createRef();

  useEffect(() => {
    const videoElement = ref.current;
    videoElement.srcObject = stream;
  }, []);

  return <video className={classes.video} autoPlay playsInline ref={ref} />;
};

StreamerVideo.propTypes = {
  stream: PropTypes.shape.isRequired,
};

export default StreamerVideo;
