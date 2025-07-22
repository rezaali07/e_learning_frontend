import axios from "axios";
import {
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAIL,
} from "../constants/CourseConstants";

// Fetch public courses (no login required)
export const getCourses = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COURSES_REQUEST });

    // Use relative URL — proxy will forward to backend port 4000
    const { data } = await axios.get("/api/v2/courses/public");

    dispatch({
      type: GET_COURSES_SUCCESS,
      payload: data.courses, // Adjust this based on your backend response structure
    });
  } catch (error) {
    dispatch({
      type: GET_COURSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
