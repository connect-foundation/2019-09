import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { MainTitle, Menu, HowToPlay } from '../containers';
import { STYLE_COLORS } from '../../utils';

const useStyle = makeStyles({
  mainPage: {
    width: '40rem',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: '2rem',
    },
  },
  mainPageWrapper: {
    margin: 0,
    width: '100%',
    height: '100%',
    background: STYLE_COLORS.WHITE_COLOR,
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
        <HowToPlay />
      </Container>
    </Box>
  );
};

export default MainPage;
