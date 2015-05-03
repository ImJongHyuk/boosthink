package com.develope.plto.dao;


import java.sql.*;
import java.util.*;

import org.apache.ibatis.session.*;

import com.develope.plto.domain.ImageSrc;

public class ImageSrcDaoImpl implements ImageSrcDao{
	
	private SqlSession sqlSession;

	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	/** id를 기준으로 검색된 image의 컬럼을 리턴함*/
	@Override
	public ImageSrc selectImageSrcById(long id) {
		// TODO select query (image src)
		
		ImageSrc imgSrc = (ImageSrc) sqlSession.selectOne("selectImageSrcbyId", id);	
		return imgSrc;
	}
	
	
	
}
