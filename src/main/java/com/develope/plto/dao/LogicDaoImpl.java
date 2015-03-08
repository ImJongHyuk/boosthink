package com.develope.plto.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.develope.plto.domain.Logic;

public class LogicDaoImpl implements LogicDao {
	private SqlSession sqlSession;

	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	//모든 로직을 가져오는 메소드
	@Override
	public List<Logic> selectAllLogic()
	{
		@SuppressWarnings("unchecked")
		List<Logic> list = (List<Logic>) sqlSession.selectList("selectAllLogic");
		return list;
	}
	
	//로직정보를 저장하는 메소드
	@Override
	public int insert(Logic logic) {
		// TODO Auto-generated method stub
		int n = sqlSession.insert("insert", logic);
		return n;
	}

	//로직아이디로 로직을 삭제하는 메소드
	@Override
	public int delete(String id) {
		// TODO Auto-generated method stub
		int n = sqlSession.delete("delete", id);
		return n;
	}

	//로직을 수정하는 메소드
	@Override
	public int update(Logic logic) {
		// TODO Auto-generated method stub
		int n = sqlSession.update("update", logic);
		return n;
	}

	//로직아이디로 플랭을 가져오는 메소드
	@Override
	public String selectLogic(String id) {
		// TODO Auto-generated method stub
		String plang =  (String) sqlSession.selectOne("selectLogic", id);
		return plang;
	}

}
