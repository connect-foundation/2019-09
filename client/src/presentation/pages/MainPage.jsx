import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { MainTitle, Menu, Introduction } from '../containers';

const useStyle = makeStyles({
  mainPage: {
    width: '40rem',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: '1rem',
    },
  },
  mainPageWrapper: {
    margin: 0,
    width: '100%',
    height: '100%',
    background: '#E5F1FF',
    overflow: 'auto',
  },
});

const MainPage = () => {
  const classes = useStyle();
  return (
    <Box className={classes.mainPageWrapper}>
      <Container maxWidth="md" className={classes.mainPage}>
        <MainTitle />
        <Menu />
        <Introduction />
      </Container>
    </Box>
  );
};

export default MainPage;
