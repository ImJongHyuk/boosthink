package com.develope.plto.dao;

import java.sql.*;
import java.util.*;

import javax.sql.rowset.serial.*;

import org.apache.ibatis.session.*;

import com.develope.plto.domain.*;

public class BoardDaoImpl implements BoardDao {
	private SqlSession sqlSession;

	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	//모든 게시글정보를 가져오는 메소드
	@Override
	public List<Board> selectAllBoard()
	{
		@SuppressWarnings("unchecked")
		List<Board> list = (List<Board>) sqlSession.selectList("selectAllBoard");
		return list;
	}

	//게시글을 추가하는 메소드
	@Override
	public int insert(Board b) {
		// TODO Auto-generated method stub
		int n = sqlSession.insert("insert", b);
		return n;
	}

	//게시글번호로 해당하는 레이아웃 아이디를 가져오는 메소드
	@Override
	public long selectLayoutId(long boardId) {
		// TODO Auto-generated method stub
		long layout_id = (Long) sqlSession.selectOne("selectLayoutId", boardId);
		return layout_id;
	}

	//게시글 번호로 해당 게시글의 이전 정보를 가져오는 메소드(직렬화된 객체 가져오기)
	@Override
	public Map<String, Object> selectData(long boardId){
		// TODO Auto-generated method stub
		Map<String, Object> map = new HashMap<String, Object>();
		map = (Map<String, Object>) sqlSession.selectOne("selectData", boardId);
		return map;
	}

	//게시글을 수정하는 메소드
	@Override
	public int update(Board board) {
		int n = sqlSession.update("update", board);
		return n;
	}
}
