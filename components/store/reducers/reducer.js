
import { SET_USER } from "../actions/user";


const initialUserState = {
  user: {},
};

const UserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;




// import { SET_USER } from "../actions/user";
// import { SET_POST } from "../actions/user";

// const INITIAL_STATE = {
//   user: {},
// };

// const UserReducer = (state = INITIAL_STATE, actions) => {
//   switch (actions.type) {
//     case SET_USER:
//       return {
//         ...state,
//         user: actions.payload,
//       };

//     default:
//       return state;
//   }
// };

// export default UserReducer;
