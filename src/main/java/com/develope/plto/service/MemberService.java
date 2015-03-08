package com.develope.plto.service;



public interface MemberService {
	public int insertMember(String email, String password,String firstname, String lastname,String birth_year, String birth_month,String birth_day, String sex);
	public int updateMember(String email, String password,String firstname, String lastname,String birth_year, String birth_month,String birth_day, String sex);
	
}
