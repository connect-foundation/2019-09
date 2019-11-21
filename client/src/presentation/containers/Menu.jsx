import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { LargeButton, TextInput } from '../components';
import { DispatchContext } from '../../contexts';

const useStyle = makeStyles({
  menu: {
    width: '100%',
    height: 220,
    padding: '20px',
    border: '1px solid #cccccc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 5,
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
});

const textInpuStyles = {
  width: '100%',
};
const ButtonStyles = {
  width: '100%',
  height: '3.2rem',
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
      <LargeButton
        text="PLAY"
        style={ButtonStyles}
        component={Link}
        to="/game"
      />
      <LargeButton text="RANK" style={ButtonStyles} onClick={() => {}} />
    </Container>
  );
};

export default Menu;
