package com.develope.plto.dao;

import java.util.List;

import com.develope.plto.domain.LoginSession;

public interface SessionDao {
	public List<LoginSession> selectAllSession();
	public int insert(LoginSession session);
	public int delete(String email);
	public LoginSession selectSession(String email);
	public String selectEmail(String sessionId);
}