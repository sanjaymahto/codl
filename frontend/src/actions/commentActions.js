import { FETCH_COMMENTS, NEW_COMMENT, UPVOTE_COMMENT } from './types';

export const fetchComments = (postId) => dispatch => {
    fetch('http://localhost:8080/getComments', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(postId)
    }).then(res => res.json())
      .then(comments => dispatch({
        type: FETCH_COMMENTS,
        payload: comments
      }));
  }

export const createComment = (commentData) => dispatch => {
    fetch('http://localhost:8080/submitComment', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(commentData)
    }).then(comment => dispatch({
      type: NEW_COMMENT,
      payload: commentData
    }));
  }

  export const upvoteComment = (id) => dispatch => {
    fetch('http://localhost:8080/upvoteComment', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(id)
    }).then(response => dispatch({
      type: UPVOTE_COMMENT,
      payload: id
    }))
  }