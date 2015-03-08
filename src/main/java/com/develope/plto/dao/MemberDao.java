package com.develope.plto.dao;

import java.util.List;

import com.develope.plto.domain.Member;

public interface MemberDao {
	public List<Member> selectAllMember();
	public int insert(Member member);
	public int delete(String email);
	public int update(Member member);
	public Member selectMember(String email);
	public Member selectMember(Member member);
	public String selectPwd(String email);
}