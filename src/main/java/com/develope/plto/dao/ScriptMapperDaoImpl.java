package com.develope.plto.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.develope.plto.domain.ScriptMapper;

public class ScriptMapperDaoImpl implements ScriptMapperDao {
	private SqlSession sqlSession;

	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	//매퍼에 매핑정보를 하나 추가하는 메소드
	@Override
	public int insert(ScriptMapper sm) {
		// TODO Auto-generated method stub
		int n = sqlSession.insert("insert", sm);
		return n;
	}
	
	//레이아웃아이디와 이벤트 아이디로 레이아웃을 삭제하는 메소드
	@Override
	public String selectPlangId(long layout_id, String event_id) {
		// TODO Auto-generated method stub
		Map<String, Object> map= new HashMap<String, Object>();
		map.put("layout_id", layout_id);
		map.put("event_id", event_id);
		String plang_id=(String)sqlSession.selectOne("selectPlangId", map);
		return plang_id;
	}
	
}
