import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import styleColors from '../../constants/styleColors';
import { PLAYER_TPYE } from '../../constants/game';

const useStyles = makeStyles({
  PlayerProfile: props => ({
    minWidth: '6rem',
    width: '100%',
    boxSizing: 'border-box',
    height: 'auto',
    marginBottom: '1rem',
    padding: '0.5rem 1rem',
    display: 'flex',
    fontSize: '1.6rem',
    color: styleColors.BASE_BLACK_COLOR,
    backgroundColor: (() => {
      return props.isCorrectPlayer
        ? styleColors.THEME_COLOR
        : styleColors.PURE_WHITE_COLOR;
    })(),
    boxShadow: '0 0.2rem 0.7rem 0 rgba(0, 0, 0, 0.6)',
    borderRadius: '0.3rem',
    border: (() => {
      if (props.type === PLAYER_TPYE.STREAMER) {
        return `0.2rem solid ${styleColors.STREAMER_BORDER_COLOR}`;
      }
      if (props.isReady) {
        return `0.2rem solid ${styleColors.THEME_COLOR}`;
      }
      if (props.isCorrectPlayer) {
        return `0.2rem solid ${styleColors.THEME_BORDER_COLOR}`;
      }
      return `0.2rem solid ${styleColors.BASE_WHITE_COLOR}`;
    })(),
  }),
  playerInformation: {
    display: 'flex',
    flexDirection: 'column',
    flex: 4,
  },
  playerNicknameConatainer: {
    fontWeight: '600',
    display: 'table',
    tableLayout: 'fixed',
    width: '100%',
  },
  playerNickname: {
    display: 'table-cell',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    lineHeight: '2rem',
  },
  playerScore: {},
});

const PlayerProfile = ({
  nickname,
  score,
  isReady,
  type,
  isLocalPlayer,
  isCorrectPlayer,
}) => {
  const classes = useStyles({
    isReady,
    type,
    isLocalPlayer,
    isCorrectPlayer,
  });
  return (
    <Box className={classes.PlayerProfile}>
      <Box className={classes.playerInformation}>
        <Box className={classes.playerNicknameConatainer}>
          <Box className={classes.playerNickname}>{nickname}</Box>
          {isLocalPlayer && <span>(Me)</span>}
        </Box>
        <Box className={classes.playerScore}>{`${score} p`}</Box>
      </Box>
    </Box>
  );
};

PlayerProfile.propTypes = {
  nickname: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  isReady: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  isLocalPlayer: PropTypes.bool.isRequired,
  isCorrectPlayer: PropTypes.bool.isRequired,
};

export default PlayerProfile;
