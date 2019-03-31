package com.codl.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codl.dao.PostDAO;
import com.codl.models.Post;

@Service
public class PostManagerImpl implements PostManager {

	@Autowired
	private PostDAO postDAO;

	@Override
	@Transactional
	public List<Post> getAllPosts() {
		return postDAO.getAllPosts();
	}

	@Override
	@Transactional
	public void addPost(Post post) {
		Date now = new Date();
		post.setVoteCount(0);
		post.setDateCreation(now);
		postDAO.addPost(post);
	}
}
