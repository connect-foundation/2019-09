import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom';
import { MenuButton, TextInput } from '../components';
import { NICKNAME_LENGTH } from '../../constants/inputConstraints';
import { PLAY_WITH_FRIENDS_BUTTON_TEXT } from '../../constants/button';
import { browserLocalStorage } from '../../utils';
import { ENTER_KEYCODE } from '../../constants/browser';
import styleColors from '../../constants/styleColors';

const useStyle = makeStyles({
  menu: {
    backgroundColor: styleColors.PURE_WHITE_COLOR,
    width: '100%',
    height: 'auto',
    padding: '2rem',
    border: `0.3rem solid ${styleColors.THEME_COLOR}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    '& > *': {
      marginTop: '0.7rem',
      marginBottom: '0.7rem',
    },
  },
  fullAnchor: {
    width: '100%',
  },
});

const textInpuStyles = {
  width: '100%',
};
/**
 * 고정값 필요 rem 사용금지
 */
const menuButtonFontSize = '20px';

const Menu = () => {
  const [nickname, setNickname] = useState(browserLocalStorage.getNickname());
  const classes = useStyle();
  const history = useHistory();

  const checkNicknameValidity = targetNickname => {
    if (!targetNickname) return false;
    return true;
  };

  const sliceNicknameLength = targetNickname => {
    return targetNickname.slice(0, NICKNAME_LENGTH);
  };

  const nicknameInputKeypressHandler = event => {
    if (event.charCode !== ENTER_KEYCODE) return;
    const trimmedNickname = nickname.trim();
    if (checkNicknameValidity(trimmedNickname)) {
      const slicedNickname = sliceNicknameLength(trimmedNickname);
      browserLocalStorage.setNickname(slicedNickname);
      history.push('/game');
    }
  };

  const nicknameInputTextChangeHandler = event => {
    const trimmedNickname = event.target.value.trim();
    const slicedNickname = sliceNicknameLength(trimmedNickname);
    setNickname(slicedNickname);
  };

  const playButtonClickHandler = event => {
    if (!nickname) {
      event.preventDefault();
      return;
    }
    browserLocalStorage.setNickname(nickname);
  };

  return (
    <Container maxWidth="md" className={classes.menu}>
      <TextInput
        label="NICKNAME"
        style={textInpuStyles}
        value={nickname}
        textChangeHandler={nicknameInputTextChangeHandler}
        onKeyPress={nicknameInputKeypressHandler}
        maxLength={NICKNAME_LENGTH}
      />

      <Link
        to="/game"
        className={classes.fullAnchor}
        onClick={playButtonClickHandler}
      >
        <MenuButton fontSize={menuButtonFontSize}>PLAY</MenuButton>
      </Link>
      <Link
        to={{
          pathname: '/game',
          isPrivateRoomCreation: true,
        }}
        className={classes.fullAnchor}
        onClick={playButtonClickHandler}
      >
        <MenuButton fontSize={menuButtonFontSize}>
          {PLAY_WITH_FRIENDS_BUTTON_TEXT}
        </MenuButton>
      </Link>
      <Link to="/ranking" className={classes.fullAnchor}>
        <MenuButton fontSize={menuButtonFontSize}>RANK</MenuButton>
      </Link>
    </Container>
  );
};

export default Menu;
