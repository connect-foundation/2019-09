import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { STYLE_COLORS } from '../../utils';

const useStyles = makeStyles({
  nickname: props => ({
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: props.nicknameColor || STYLE_COLORS.WHITE_COLOR,
  }),
});

const Nickname = ({ children, nicknameColor }) => {
  const classes = useStyles({ nicknameColor });
  return (
    <Box component="span" className={classes.nickname}>
      {children}
    </Box>
  );
};

Nickname.propTypes = {
  children: PropTypes.string.isRequired,
  nicknameColor: PropTypes.string.isRequired,
};

export default Nickname;
