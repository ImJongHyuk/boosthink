package com.develope.plto.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.develope.plto.domain.Member;

public class MemberDaoImpl implements MemberDao {
	private SqlSession sqlSession;

	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}

	/*모든 멤버정보를 리턴하는 메소드*/
	@Override
	public List<Member> selectAllMember() {
		@SuppressWarnings("unchecked")
		List<Member> members = (List<Member>) sqlSession.selectList("selectAllMember");
		return members;
	}

	/*새로운 사용자를 추가하는 메소드*/
	@Override
	public int insert(Member member) {
		int n = sqlSession.insert("insert", member);
		return n;
	}

	/*이메일주소로 사용자를 삭제하는 메소드*/
	@Override
	public int delete(String email) {
		int n = sqlSession.delete("delete", email);
		return n;
	}

	/*사용자 정보를 수정하는 메소드*/
	@Override
	public int update(Member member) {
		int n = sqlSession.update("update", member);
		return n;
	}

	/*이메일 주소로 사용자를 찾는 메소드*/
	@Override
	public Member selectMember(String email) {
		Member user = (Member) sqlSession.selectOne("selectMember_e", email);
		return user;
	}
	
	/*특정한 멤버정보로 해당되는 멤버를 찾는 메소드*/
	@Override
	public Member selectMember(Member member) {
		Member user = (Member) sqlSession.selectOne("selectMember_m", member);
		return user;
	}

	@Override
	public String selectPwd(String email) {
		// TODO Auto-generated method stub
		String pwd = (String)sqlSession.selectOne("selectPwd", email);
		return pwd;
	}
}
