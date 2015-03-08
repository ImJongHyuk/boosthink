package com.develope.plto.dao;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import com.develope.plto.domain.LayoutCpnt;

public class LayoutCpntDaoImpl implements LayoutCpntDao {
	private SqlSession sqlSession;

	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	//category에 해당하는 모든 로직을 가져오는 메소드
	@Override
	public List<LayoutCpnt> selectLayoutCpnt(long category)
	{
		@SuppressWarnings("unchecked")
		List<LayoutCpnt> list = (List<LayoutCpnt>) sqlSession.selectList("selectLayoutCpnt", category);
		return list;
	}
	@Override
	public List<LayoutCpnt> selectAllLayoutCpnt()
	{
		@SuppressWarnings("unchecked")
		List<LayoutCpnt> list = (List<LayoutCpnt>) sqlSession.selectList("selectAllLayoutCpnt");
		return list;
	}
}
