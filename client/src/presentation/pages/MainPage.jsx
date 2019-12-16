import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MetaTags from 'react-meta-tags';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { MainTitle, Menu, Introduction } from '../containers';
import browserLocalStorage from '../../utils/browserLocalStorage';
import Toast from '../components/Toast';
import { GlobalContext, DispatchContext } from '../../contexts';
import actions from '../../actions';
import { useToast } from '../../hooks';

const useStyle = makeStyles(theme => ({
  mainPage: {
    width: '40rem',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      marginBottom: '2rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  mainPageWrapper: {
    margin: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
}));

const MainPage = () => {
  const classes = useStyle();

  const dispatch = useContext(DispatchContext);
  const { toast } = useContext(GlobalContext);
  const { closeToast } = useToast({
    open: toast.open,
    dispatch,
    actions,
  });

  useEffect(() => {
    browserLocalStorage.verifyNicknameInLocalStorage();
  }, []);

  return (
    <Box className={classes.mainPageWrapper}>
      <MetaTags>
        <meta
          name="viewport"
          content="initial-scale=1.0, user-scalable=no, width=device-width"
        />
      </MetaTags>
      <Container maxWidth="md" className={classes.mainPage}>
        <Toast
          open={toast.open}
          toastType={toast.toastType}
          message={toast.message}
          closeHandler={() => {
            closeToast();
          }}
        />
        <MainTitle />
        <Menu />
        <Introduction />
      </Container>
    </Box>
  );
};

export default MainPage;
