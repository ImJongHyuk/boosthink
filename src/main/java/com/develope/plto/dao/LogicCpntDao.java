package com.develope.plto.dao;

import java.util.List;

import com.develope.plto.domain.LogicCpnt;

public interface LogicCpntDao {
	public List<LogicCpnt> selectLogicCpnt(long category);
	public List<LogicCpnt> selectAllLogicCpnt();
}