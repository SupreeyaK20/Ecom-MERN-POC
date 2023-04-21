import { REGISTER_USER, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS } from "../action/action-type/registrationTypes";
import { initialState } from "../state/initialState";

export const authReducer = (state=initialState, action) => {
    switch(action.type){
        case REGISTER_USER:
        return { 
            ...state, 
            loading: true,
            message: '',
            error: null, 
        };
        case REGISTER_USER_SUCCESS:
        return { 
            ...state, 
            loading: false, 
            message: action.payload, 
        };
      case REGISTER_USER_FAILURE:
        return { 
            ...state,
            loading: false,
            error: action.payload,   
        };
    default:
      return state;
    }
}
