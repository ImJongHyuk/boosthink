package com.develope.plto.dao;

import java.util.List;

import com.develope.plto.domain.SemanticList;

public interface SemanticDao {
	public List<SemanticList> selectAllList();
	public String toJson(List<SemanticList> list);
	public String toXml(List<SemanticList> list);
}
