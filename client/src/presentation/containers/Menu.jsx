import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom';
import { MenuButton, TextInput } from '../components';
import {
  browserLocalStorage,
  CONSTANT_VALUES,
  STYLE_COLORS,
} from '../../utils';

const useStyle = makeStyles({
  menu: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 'auto',
    padding: '2rem',
    border: `0.3rem solid ${STYLE_COLORS.THEME_COLOR}`,
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

  const nicknameInputKeypressHandler = event => {
    if (event.charCode !== CONSTANT_VALUES.ENTER_KEYCODE) return;
    if (!nickname) return;
    browserLocalStorage.setNickname(nickname);
    history.push('/game');
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
        textChangeHandler={setNickname}
        onKeyPress={nicknameInputKeypressHandler}
      />

      <Link
        to="/game"
        className={classes.fullAnchor}
        onClick={playButtonClickHandler}
      >
        <MenuButton fontSize={menuButtonFontSize}>PLAY</MenuButton>
      </Link>
      <Link to="/ranking" className={classes.fullAnchor}>
        <MenuButton fontSize={menuButtonFontSize}>RANK</MenuButton>
      </Link>
    </Container>
  );
};

export default Menu;
