import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { STYLE_COLORS } from '../../utils';

const useStyles = makeStyles({
  PlayerProfile: props => ({
    width: '100%',
    boxSizing: 'border-box',
    height: '6rem',
    marginBottom: '1rem',
    padding: '1rem',
    display: 'flex',
    fontSize: '1.6rem',
    color: STYLE_COLORS.WHITE_COLOR,
    backgroundColor: STYLE_COLORS.PLAYER_PROFILE_BACKGROUND_COLOR,
    border: (() => {
      if (props.isReady)
        return `0.1rem solid ${STYLE_COLORS.READY_STATUS_BORDER_COLOR}`;
      if (props.type === 'streamer') return '0.1rem solid #e74c3c';
      return `0.1rem solid ${STYLE_COLORS.PLAYER_PROFILE_BACKGROUND_COLOR}`;
    })(),
  }),
  playerOrder: {
    display: 'flex',
    alignItems: 'center',
    flex: 1.5,
    fontSize: '1.5rem',
  },
  playerInformation: {
    display: 'flex',
    flexDirection: 'column',
    flex: 4,
  },
  playerNickname: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    fontWeight: '600',
  },
  playerScore: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
});

const PlayerProfile = ({
  order,
  nickname,
  score,
  isReady,
  type,
  isLocalPlayer,
}) => {
  const classes = useStyles({ isReady, type, isLocalPlayer });
  return (
    <Box className={classes.PlayerProfile}>
      <Box className={classes.playerOrder}>{`# ${order}`}</Box>
      <Box className={classes.playerInformation}>
        <Box className={classes.playerNickname}>
          {`${nickname} ${isLocalPlayer ? '(You)' : ''}`}
        </Box>
        <Box className={classes.playerScore}>{`Score : ${score}`}</Box>
      </Box>
    </Box>
  );
};

PlayerProfile.propTypes = {
  order: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  isReady: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  isLocalPlayer: PropTypes.bool.isRequired,
};

export default PlayerProfile;
