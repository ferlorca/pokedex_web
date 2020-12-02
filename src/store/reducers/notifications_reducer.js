import * as actionTypes from '../action_types';
import { updateObject } from '../utility';

const initialState = {   
    notifications:[],
    count:0,
    error: null,
    loading: false,    
};


const add = (state, action) => {
    return updateObject(state, { 
        notifications: state.notifications.concat(action.payload),
        count:state.count+1
    });
};

const remove = (state, action) => {
    return updateObject(state, { 
        notifications: state.notifications.filter(item=>item.Id !== action.payload)       
     });
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {        
        case actionTypes.NOTIFICATIONS_ADD: return add(state, action);
        case actionTypes.NOTIFICATIONS_DELETE: return remove(state, action);
        default:
            return state;
    }
};

export default reducer;

