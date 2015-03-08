package com.develope.plto.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.develope.plto.domain.Layout;

public class LayoutDaoImpl implements LayoutDao {
	private SqlSession sqlSession;

	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	//모든 레이아웃 정보를 가져오는 메소드
	@Override
	public List<Layout> selectAllLayout()
	{
		@SuppressWarnings("unchecked")
		List<Layout> list = (List<Layout>) sqlSession.selectList("selectAllLayout");
		return list;
	}
	
	//레이아웃정보를 추가하는 메소드
	@Override
	public int insert(Layout layout) {
		// TODO Auto-generated method stub
		int n = sqlSession.insert("insert", layout);
		return n;
	}

	//레이아웃 아이디로 레이아웃 정보를 삭제하는 메소드
	@Override
	public int delete(long id) {
		// TODO Auto-generated method stub
		int n = sqlSession.delete("delete", id);
		return n;
	}

	//레이아웃정보를 수정하는 메소드
	@Override
	public int update(Layout layout) {
		// TODO Auto-generated method stub
		int n = sqlSession.update("update", layout);
		return n;
	}

	//레이아웃아이디로 레이아웃을 가져오는 메소드
	@Override
	public String selectLayout(long id) {
		// TODO Auto-generated method stub
		String layout =  (String) sqlSession.selectOne("selectLayout", id);
		return layout;
	}

}
