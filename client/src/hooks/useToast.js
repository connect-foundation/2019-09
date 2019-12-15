import actions from '../actions';
/**
 * toasType: contants에 있는 toast 타입,
 * message: toast에 보여줄 메시지,
 * open: global state의 toast open,
 * dispatch: global dispatch
 * @param {*} param0
 */
const useToast = ({ toasType, message, open, dispatch }) => {
  if (open) {
    dispatch(actions.closeToast());
    setTimeout(() => {
      dispatch(actions.openToast(toasType, message));
    }, 100);
  } else {
    dispatch(actions.openToast(toasType, message));
  }
};

export default useToast;
