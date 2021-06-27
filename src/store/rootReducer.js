import { combineReducers } from "redux";
import cartReducer from "./reducers/SetJobAdvertisementReducer";


const rootReducer = combineReducers({
    cart :cartReducer
})

export default rootReducer;