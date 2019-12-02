import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Title, Description, Slogan } from '../components';
import {
  MainIntroductionTitle,
  MainIntroductionDescription,
  MainSlogan,
} from '../../config';
import { STYLE_COLORS } from '../../utils';

const useStyle = makeStyles({
  menu: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 220,
    padding: '20px',
    border: `0.3rem solid ${STYLE_COLORS.THEME_COLOR}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
});

const Introduction = () => {
  const classes = useStyle();

  return (
    <Container maxWidth="md" className={classes.menu}>
      <Title content={MainIntroductionTitle} />
      <Description content={MainIntroductionDescription} />
      <br />
      <Slogan content={MainSlogan} />
    </Container>
  );
};

export default Introduction;
