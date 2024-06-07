export const SET_POSTS = "SET_POSTS";

export const setPosts = (payload) => {
    return (dispatch) =>
    dispatch({
      type: SET_POSTS,
      payload,
    });
  };
 