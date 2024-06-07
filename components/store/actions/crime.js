export const SET_CRIMES = "SET_CRIMES";

export const setCrimes = (payload) => {
    return (dispatch) =>
    dispatch({
      type: SET_CRIMES,
      payload,
    });
  };
 