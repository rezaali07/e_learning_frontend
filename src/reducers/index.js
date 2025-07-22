import { combineReducers } from "redux";
import { courseReducer } from "./CourseReducer";
// other reducers...

export default combineReducers({
  courses: courseReducer,
  // other reducers
});
