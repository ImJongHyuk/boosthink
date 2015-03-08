package com.develope.plto.dao;

import java.util.List;

import com.develope.plto.domain.LayoutCpnt;

public interface LayoutCpntDao {
	public List<LayoutCpnt> selectLayoutCpnt(long category);
	public List<LayoutCpnt> selectAllLayoutCpnt();
}