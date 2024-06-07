import { SET_CRIMES } from "../actions/crime";


const initialCrimeState = {
    crimes: [],
  };
  
 const CrimeReducer = (state = initialCrimeState, action) => {
    switch (action.type) {
      case SET_CRIMES:
        return {
          ...state,
          crimes: action.payload,
        };
  
      default:
        return state;
    }
  };

  export default CrimeReducer;