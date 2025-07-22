import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// ✅ Existing reducers
import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from "./reducers/userReducer";

// ✅ Existing reducer (you confirmed)
import courseReducer from "./reducers/CourseReducer";

// ✅ Combine only working reducers
const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  courses: courseReducer,
});

// ✅ Initial state (no cart/favourite)
const initialState = {};

// ✅ Middleware
const middleware = [thunk];

// ✅ Store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
