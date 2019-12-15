import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import { amber, green, deepPurple, red } from '@material-ui/core/colors';
import ToastContent from './ToastContent';
import {
  TOAST_TPYES,
  TOAST_ICONS,
  TOAST_POSITION,
  TOAST_TIME,
} from '../../constants/toast';

const useStyles = makeStyles({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[600],
  },
  info: {
    backgroundColor: deepPurple[600],
  },
  warning: {
    backgroundColor: amber[700],
  },
  test: {
    width: '10rem',
  },
});

/**
 * Toast 컴포넌트의 타입이 아닌 값이 들어왔을때, 기본값으로 SUCCESS타입을 반환
 * @param {*} toastType
 */
const checkToastType = toastType => {
  const defaultType = TOAST_TPYES.SUCCESS;
  return Object.values(TOAST_TPYES).includes(toastType)
    ? toastType
    : defaultType;
};

const Toast = ({ open, toastType, message, closeHandler }) => {
  const checkedToastType = checkToastType(toastType);
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={TOAST_POSITION}
      open={open}
      autoHideDuration={TOAST_TIME}
      onClose={closeHandler}
    >
      {
        <SnackbarContent
          className={classes[checkedToastType]}
          // prettier-ignore
          message={(<ToastContent icon={TOAST_ICONS[checkedToastType]} message={message} />)}
        />
      }
    </Snackbar>
  );
};

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  toastType: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  closeHandler: PropTypes.shape.isRequired,
};

export default Toast;
