package com.codl.service;

import java.util.List;

import com.codl.models.Comment;
import com.codl.models.Vote;

public interface CommentManager {
	
	public List<Comment> getComments(long postId);
	public Comment addComment(Comment comment);
	public void deleteComment(long id);
	public void upvoteComment(Vote vote);
	public void removeVoteComment(Vote vote);

}
