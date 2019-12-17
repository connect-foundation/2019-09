import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Title, Description, Slogan } from '../components';
import {
  MAIN_HOW_TO_PLAY_TITLE,
  MAIN_HOW_TO_PLAY_DESCRIPTION,
  MAIN_SLOGAN,
} from '../../constants/message';
import styleColors from '../../constants/styleColors';

const useStyle = makeStyles({
  menu: {
    backgroundColor: styleColors.PURE_WHITE_COLOR,
    width: '100%',
    padding: '2rem',
    border: `0.3rem solid ${styleColors.THEME_COLOR}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
});

/**
 * font-size 고정 필요 rem 사용하지 말것
 */
const titleFontSize = '35px';
const descriptionFontSize = '13px';

const Introduction = () => {
  const classes = useStyle();
  return (
    <Container maxWidth="md" className={classes.menu}>
      <Title content={MAIN_HOW_TO_PLAY_TITLE} fontSize={titleFontSize} />
      <Description
        content={MAIN_HOW_TO_PLAY_DESCRIPTION}
        fontSize={descriptionFontSize}
      />
      <br />
      <Slogan content={MAIN_SLOGAN} />
    </Container>
  );
};

export default Introduction;
