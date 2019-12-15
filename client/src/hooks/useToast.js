import actions from '../actions';
/**
 * toasType: contants에 있는 toast 타입,
 * message: toast에 보여줄 메시지,
 * open: global state의 toast open,
 * dispatch: global dispatch
 * @param {*} param0
 */
const useToast = ({ toastType, message, open, dispatch }) => {
  if (open) {
    dispatch(actions.closeToast());
    setTimeout(() => {
      dispatch(actions.openToast(toastType, message));
    }, 100);
  } else {
    dispatch(actions.openToast(toastType, message));
  }
};

export default useToast;
