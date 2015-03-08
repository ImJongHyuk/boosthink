package com.develope.plto.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.develope.plto.domain.LoginSession;

public class SessionDaoImpl implements SessionDao {
	private SqlSession sqlSession;

	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	/*세션정보 읽어오기*/
	@Override
	public List<LoginSession> selectAllSession() {
		@SuppressWarnings("unchecked")
		List<LoginSession> sessions = (List<LoginSession>) sqlSession.selectList("selectAllSession");
		return sessions;
	}

	/*세션을 파라미터로 받아 세션정보를 디비에 추가*/
	@Override
	public int insert(LoginSession session) {
		int n = sqlSession.insert("insert", session);
		return n;
	}

	/*이메일주소를 파라미터로 받아 해당하는 값을 디비에서 삭제*/
	@Override
	public int delete(String email) {
		int n = sqlSession.delete("delete", email);
		return n;
	}

	/*이메일주소에 해당하는 세션정보를 하나 읽어옴*/
	@Override
	public LoginSession selectSession(String email) {
		LoginSession session = (LoginSession) sqlSession.selectOne("selectSession", email);
		return session;
	}
	
	/*sessionId로 해당되는 이메일을 읽어옴*/
	@Override
	public String selectEmail(String sessionId) {
		String email = (String) sqlSession.selectOne("selectEmail", sessionId);
		return email;
	}
}
