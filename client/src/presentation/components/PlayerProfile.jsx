import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  PlayerProfile: props => ({
    width: '100%',
    height: '6rem',
    padding: '1rem',
    display: 'flex',
    fontSize: '1.6rem',
    backgroundColor: '#efefef',
    border: (() => {
      if (props.isReady) return '2px solid #5A96FF';
      if (props.isStreamer) return '2px solid #e74c3c';
      return 'none';
    })(),
  }),
  playerOrder: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    fontSize: '2rem',
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
  isStreamer,
  isYourProfile,
}) => {
  const classes = useStyles({ isReady, isStreamer, isYourProfile });
  return (
    <Box className={classes.PlayerProfile}>
      <Box className={classes.playerOrder}>{`# ${order}`}</Box>
      <Box className={classes.playerInformation}>
        <Box className={classes.playerNickname}>
          {`${nickname} ${isYourProfile ? '(You)' : ''}`}
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
  isStreamer: PropTypes.bool.isRequired,
  isYourProfile: PropTypes.bool.isRequired,
};

export default PlayerProfile;
