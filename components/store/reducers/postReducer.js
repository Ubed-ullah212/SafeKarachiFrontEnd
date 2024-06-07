import { SET_POSTS } from "../actions/post";


const initialPostState = {
    posts: [],
  };
  
 const PostReducer = (state = initialPostState, action) => {
    switch (action.type) {
      case SET_POSTS:
        return {
          ...state,
          posts: action.payload,
        };
  
      default:
        return state;
    }
  };

  export default PostReducer;