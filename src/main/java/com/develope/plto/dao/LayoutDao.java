package com.develope.plto.dao;

import java.util.List;

import com.develope.plto.domain.Layout;

public interface LayoutDao {
	public List<Layout> selectAllLayout();
	public int insert(Layout layout);
	public int delete(long id);
	public int update(Layout layout);
	public String selectLayout(long id);
}