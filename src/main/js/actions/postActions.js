import axios from "axios";
import {
  FETCH_POSTS,
  FETCH_MORE_POSTS,
  NEW_POST,
  DELETE_POST,
  DELETE_POST_COMMENT,
  UPVOTE_POST,
  DOWNVOTE_POST,
  USER_NEW_POST,
  USER_DELETE_POST,
  USER_UPVOTE_POST,
  USER_DOWNVOTE_POST,
  USER_REMOVE_VOTE_POST
} from "./types";
import { fetchTags } from "./tagActions";

const apiUrl = API_URL + "post";

export const fetchPosts = (filter, type) => dispatch =>
  Promise.resolve(
    axios
      .post(`${apiUrl}/getAll`, filter)
      .then(res => {
        if (type === "MORE") {
          dispatch({
            type: FETCH_MORE_POSTS,
            payload: res.data
          });
        } else {
          dispatch({
            type: FETCH_POSTS,
            payload: res.data
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
  );

export const upvotePost = vote => dispatch => {
  axios
    .post(`${apiUrl}/upvote`, vote)
    .then(() => {
      dispatch({
        type: USER_UPVOTE_POST,
        payload: vote
      });
      dispatch({
        type: UPVOTE_POST,
        payload: vote.postId
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const downvotePost = vote => dispatch => {
  axios
    .post(`${apiUrl}/downvote`, vote)
    .then(() => {
      dispatch({
        type: USER_DOWNVOTE_POST,
        payload: vote
      });
      dispatch({
        type: DOWNVOTE_POST,
        payload: vote.postId
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const removeVotePost = (vote, prevStatus) => dispatch => {
  axios
    .post(`${apiUrl}/removeVote`, vote)
    .then(() => {
      dispatch({
        type: USER_REMOVE_VOTE_POST,
        payload: vote
      });
      if (prevStatus === 1) {
        dispatch({
          type: DOWNVOTE_POST,
          payload: vote.postId
        });
      } else if (prevStatus === -1) {
        dispatch({
          type: UPVOTE_POST,
          payload: vote.postId
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const createPost = post => dispatch =>
  Promise.resolve(
    axios
      .post(`${apiUrl}/add`, post)
      .then(res => {
        dispatch({
          type: USER_NEW_POST,
          payload: res.data
        });
        dispatch({
          type: NEW_POST,
          payload: res.data
        });
        dispatch(fetchTags());
      })
      .catch(error => {
        console.log(error);
      })
  );

export const deletePost = id => dispatch =>
  Promise.resolve(
    axios
      .post(`${apiUrl}/delete`, id, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        dispatch({
          type: USER_DELETE_POST,
          payload: id
        });
        dispatch({
          type: DELETE_POST,
          payload: id
        });
        dispatch({
          type: DELETE_POST_COMMENT,
          payload: id
        });
        dispatch(fetchTags());
      })
      .catch(error => {
        console.log(error);
      })
  );
