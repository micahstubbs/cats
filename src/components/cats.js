export const CAT_IMAGES_REQUESTED = 'cats/CAT_IMAGES_REQUESTED';
export const CAT_IMAGES_RECEIVED = 'cats/CAT_IMAGES_RECEIVED';
export const CAT_IMAGES_REQUEST_FAILED = 'cats/CAT_IMAGES_REQUEST_FAILED';

// actions
export const requestCatImages = count => {
  if (typeof count === 'undefined') count = 1;

  return dispatch => {
    dispatch({
      type: CAT_IMAGES_REQUESTED
    });

    fetch(`http://thecatapi.com/api/images/get?size=small&results_per_page=${count}`)
      .then(
        response => {
          console.log('response', response);
          dispatch({
            type: CAT_IMAGES_RECEIVED,
            payload: response
          });
        },
        err => dispatch({ type: CAT_IMAGES_REQUEST_FAILED, err })
      );
  };
};

const initialState = {
  catImages: {},
  isRequesting: false
};

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case CAT_IMAGES_REQUESTED:
      return {
        ...state,
        isRequesting: true
      };
    case CAT_IMAGES_RECEIVED:
      return {
        ...state,
        isRequesting: false,
        catImages: action.payload
      };
    default:
      return state;
  }
};
