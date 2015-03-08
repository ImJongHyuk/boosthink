package com.develope.plto.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.develope.plto.domain.LayoutCpnt;
import com.develope.plto.domain.LogicCpnt;

public class LogicCpntDaoImpl implements LogicCpntDao {
	private SqlSession sqlSession;

	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	@Override
	public List<LogicCpnt> selectLogicCpnt(long category) {
		@SuppressWarnings("unchecked")
		List<LogicCpnt> list = (List<LogicCpnt>) sqlSession.selectList("selectLogicCpnt", category);
		return list;
	}

	@Override
	public List<LogicCpnt> selectAllLogicCpnt() {
		@SuppressWarnings("unchecked")
		List<LogicCpnt> list = (List<LogicCpnt>) sqlSession.selectList("selectAllLogicCpnt");
		return list;
	}

}
