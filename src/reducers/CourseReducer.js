import {
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAIL,
} from "../constants/CourseConstants";

const initialState = {
  courses: [],
  loading: false,
  error: null,
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSES_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_COURSES_SUCCESS:
      return { ...state, loading: false, courses: action.payload };

    case GET_COURSES_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default courseReducer;
