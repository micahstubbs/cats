/* global fetch */

export const CAT_IMAGES_REQUESTED = 'cats/CAT_IMAGES_REQUESTED';
export const CAT_IMAGES_RECEIVED = 'cats/CAT_IMAGES_RECEIVED';
export const CAT_IMAGES_REQUEST_FAILED = 'cats/CAT_IMAGES_REQUEST_FAILED';
export const CAT_FACTS_REQUESTED = 'cats/CAT_FACTS_REQUESTED';
export const CAT_FACTS_RECEIVED = 'cats/CAT_FACTS_RECEIVED';
export const CAT_FACTS_REQUEST_FAILED = 'cats/CAT_FACTS_REQUEST_FAILED';
export const REMOVE_CAT_IMAGE = 'cats/REMOVE_CAT_IMAGE';
export const REMOVE_CAT_FACT = 'cats/REMOVE_CAT_FACT';

// actions
export const requestCatImages = (count) => {
  if (typeof count === 'undefined') count = 1;

  return (dispatch) => {
    dispatch({
      type: CAT_IMAGES_REQUESTED,
    });

    fetch(`http://thecatapi.com/api/images/get?size=small&results_per_page=${count}`).then(
      (response) => {
        console.log('response', response);
        dispatch({
          type: CAT_IMAGES_RECEIVED,
          payload: response,
        });
      },
      err => dispatch({ type: CAT_IMAGES_REQUEST_FAILED, err }),
    );
  };
};

export const requestCatFacts = (count) => {
  if (typeof count === 'undefined') count = 1;

  return (dispatch) => {
    dispatch({
      type: CAT_FACTS_REQUESTED,
    });

    const randomPage = Math.ceil(Math.random() * 731);
    fetch(`http://www.catfact.info/api/v1/facts.json?page=${randomPage}&per_page=${1}`)
      .then(response => response.json())
      .then(
        (json) => {
          console.log('fact json', json);
          dispatch({
            type: CAT_FACTS_RECEIVED,
            payload: json.facts[0],
          });
        },
        err => dispatch({ type: CAT_FACTS_REQUEST_FAILED, err }),
      );
  };
};

// export const requestCatData() {
//   return dispatch => Promise.all([
//     dispatch(requestCatImages()),
//     dispatch(requestCatFacts())
//   ]).then()
// }

export const removeCatImage = () => (dispatch) => {
  dispatch({
    type: REMOVE_CAT_IMAGE,
  });
};

export const removeCatFact = () => (dispatch) => {
  dispatch({
    type: REMOVE_CAT_FACT,
  });
};

const initialState = {
  catImages: [],
  catFacts: [],
  isRequesting: false,
};

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case CAT_IMAGES_REQUESTED:
      return {
        ...state,
        isRequesting: true,
      };
    case CAT_IMAGES_RECEIVED: // eslint-disable-line
      const newCatImage = {
        url: action.payload.url,
        text: action.payload.url,
      };
      return {
        ...state,
        isRequesting: false,
        catImages: [...state.catImages, newCatImage],
      };
    case CAT_IMAGES_REQUEST_FAILED:
      console.error(action.err);
      return {
        ...state,
        isRequesting: false,
      };
    case CAT_FACTS_REQUESTED:
      return {
        ...state,
        isRequesting: true,
      };
    case CAT_FACTS_RECEIVED:
      // console.log('action.payload from CAT_FACTS_RECEIVED', action.payload);
      return {
        ...state,
        isRequesting: false,
        catFacts: [...state.catFacts, action.payload.details],
      };
    case CAT_FACTS_REQUEST_FAILED:
      console.error(action.err);
      return {
        ...state,
        isRequesting: false,
      };
    case REMOVE_CAT_IMAGE:
      return {
        ...state,
        catImages: state.catImages.slice(0, -1),
      };
    case REMOVE_CAT_FACT:
      return {
        ...state,
        catFacts: state.catFacts.slice(0, -1),
      };
    default:
      return state;
  }
};
