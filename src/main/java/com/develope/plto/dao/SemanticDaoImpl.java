package com.develope.plto.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.develope.plto.domain.SemanticList;

public class SemanticDaoImpl implements SemanticDao{
	private SqlSession sqlSession;

	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	/*�ø�ƽ����Ʈ ���̺� ��ü�� List<SemanticList>���·� ���� */
	@Override
	public List<SemanticList> selectAllList(){
		@SuppressWarnings("unchecked")
		List<SemanticList> list = sqlSession.selectList("selectAllList");
		return list;
	}
	
	/*List<SemanticList> to Json form*/
	@Override
	public String toJson(List<SemanticList> list){
		String retStr="";
		if(!list.isEmpty())
		{
			retStr += "{\"Data\": [";
			retStr += "{\"snum\": \"" + list.get(0).getSnum() + "\", "+
					"\"value\": \"" + list.get(0).getValue() + "\", "+
					"\"cnt\": \"" + list.get(0).getCnt() + "\"}";
			for(int i=1; i<list.size();i++)
			{
				retStr += ", {\"snum\": \"" + list.get(i).getSnum() + "\", "+
						"\"value\": \"" + list.get(i).getValue() + "\", "+
						"\"cnt\": \"" + list.get(i).getCnt() + "\"}";
			}
			retStr += "]}";
		}
		else
		{
			retStr = "List is Empty";
		}
		
		return retStr;
	}
	
	/*List<SemanticList> to Xml form*/
	@Override
	public String toXml(List<SemanticList> list){
		String retStr="";
		if(!list.isEmpty())
		{
			retStr += "<?xml version=\"1.0\" encoding=\"utf-8\"?><SROOT>";
			for(int i=0; i<list.size();i++)
			{
				retStr += "<FD>";
				retStr += "<SNUM>" + list.get(i).getSnum() + "</SNUM>"+
						"<VALUE>" + list.get(i).getValue() + "</VALUE>"+
						"<CNT>" + list.get(i).getCnt() + "</CNT>";
				retStr += "</FD>";
			}
			retStr += "</SROOT>";
		}
		
		else
		{
			retStr = "List is Empty";
		}
		
		return retStr;
	}
}