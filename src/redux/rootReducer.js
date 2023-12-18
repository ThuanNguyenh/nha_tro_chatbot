import { combineReducers } from 'redux';
import userReducer from './userSlice'; // import reducer

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;
