import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { MenuButton, TextInput } from '../components';
import { DispatchContext } from '../../contexts';

const useStyle = makeStyles({
  menu: {
    background: '#F3F4FE',
    width: '100%',
    height: 'auto',
    padding: '2rem',
    border: '0.1rem solid #cccccc',
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

const Menu = () => {
  const { dispatch } = useContext(DispatchContext);
  const classes = useStyle();

  const getTextValue = roomId => {
    dispatch({ type: 'changeRoomId', payload: { roomId } });
  };

  return (
    <Container maxWidth="md" className={classes.menu}>
      <TextInput
        label="ROOM NUMBER"
        style={textInpuStyles}
        textChangeHandler={getTextValue}
      />

      <Link to="/game" className={classes.fullAnchor}>
        <MenuButton>PLAY</MenuButton>
      </Link>

      <MenuButton>RANK</MenuButton>
    </Container>
  );
};

export default Menu;
