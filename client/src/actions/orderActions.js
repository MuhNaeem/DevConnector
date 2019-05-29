import axios from "axios";

import { ADD_ORDER, GET_ERRORS } from "./types";

// Add Post
export const addOrder = (postId, commentId) => dispatch => {
  axios
    .post(`/api/orders/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: ADD_ORDER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
