import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MainTitle, Menu, HowToPlay } from '../containers';

const useStyle = makeStyles({
  mainPage: {
    width: '20rem',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: '1rem',
    },
  },
});

const MainPage = () => {
  const classes = useStyle();
  return (
    <Container maxWidth="md" className={classes.mainPage}>
      <MainTitle />
      <Menu />
      <HowToPlay />
    </Container>
  );
};

export default MainPage;
