import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  PlayerProfile: props => ({
    width: '100%',
    boxSizing: 'border-box',
    height: '6rem',
    marginBottom: '1rem',
    padding: '1rem',
    display: 'flex',
    fontSize: '1.6rem',
    backgroundColor: '#f4f4f4',
    border: (() => {
      if (props.isReady) return '0.2rem solid #5A96FF';
      if (props.type === 'streamer') return '0.2rem solid #e74c3c';
      return '0.2rem solid #f4f4f4';
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
