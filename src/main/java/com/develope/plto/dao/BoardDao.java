package com.develope.plto.dao;

import java.sql.*;
import java.util.*;

import com.develope.plto.domain.*;


public interface BoardDao {
	public List<Board> selectAllBoard();
	public int insert(Board b);
	public long selectLayoutId(long boardId);
	public Map<String, Object> selectData(long boardId);
	public int update(Board board);
}
