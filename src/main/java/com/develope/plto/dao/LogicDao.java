package com.develope.plto.dao;

import java.util.List;

import com.develope.plto.domain.Layout;
import com.develope.plto.domain.Logic;

public interface LogicDao {
	public List<Logic> selectAllLogic();
	public int insert(Logic logic);
	public int delete(String id);
	public int update(Logic logic);
	public String selectLogic(String id);
}