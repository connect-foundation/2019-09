import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const IconImage = styled.img`
  max-width: 2rem;
  height: auto;
  margin-right: 1rem;
`;

const useStyles = makeStyles({
  toastContent: props => ({
    display: 'flex',
    height: 'auto',
    alignItems: 'center',
    padding: (() => {
      return props.matches ? '0.5rem' : '0';
    })(),
    maxWidth: (() => {
      return props.matches ? '60rem' : '28rem';
    })(),
  }),
  message: {
    width: '100%',
    fontSize: '1.6rem',
  },
});

const ToastContent = ({ icon, message }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles({ matches, window });
  return (
    <Box className={classes.toastContent}>
      <IconImage alt="icon" src={icon} />
      <Box className={classes.message}>{message}</Box>
    </Box>
  );
};

ToastContent.propTypes = {
  icon: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ToastContent;
