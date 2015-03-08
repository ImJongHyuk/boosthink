package com.develope.plto.dao;

import com.develope.plto.domain.ScriptMapper;

public interface ScriptMapperDao {
	public int insert(ScriptMapper sm);
	public String selectPlangId(long layout_id, String event_id);
}
