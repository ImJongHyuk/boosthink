package com.develope.plto.service;

import java.text.*;
import java.util.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import com.develope.plto.dao.*;
import com.develope.plto.domain.*;
import com.develope.plto.util.*;


@Service("memberService")
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberDaoImpl memberDaoImpl;
	
	@Autowired
	private ShaEncoder encoder;

	@Override
	public int insertMember(String email, String password, String firstname,
			String lastname, String birth_year, String birth_month,
			String birth_day, String sex) {
		// TODO Auto-generated method stub
		String ecpasswd = encoder.saltEncoding(password,email);

		Date birth = null;
		String birthStr=birth_year+String.format("%02d", Integer.parseInt(birth_month))+String.format("%02d", Integer.parseInt(birth_day));
		SimpleDateFormat transformat = new SimpleDateFormat("yyyymmdd");
		try{
			birth = (Date)transformat.parse(birthStr);
		}
		catch(ParseException e){
			e.printStackTrace();
		}

		if(sex.equals("male"))
			sex="M";
		else
			sex="F";

		Member member= new Member(email,ecpasswd,firstname,lastname,birth,sex,"ROLE_USER");

		//request정보를 가져와서 member DB에 insert
		
		return memberDaoImpl.insert(member);
	}

	@Override
	public int updateMember(String email, String password, String firstname,
			String lastname, String birth_year, String birth_month,
			String birth_day, String sex) {
		// TODO Auto-generated method stub
		String ecpasswd = encoder.saltEncoding(password,email);

		Date birth = null;
		String birthStr=birth_year+String.format("%02d", Integer.parseInt(birth_month))+String.format("%02d", Integer.parseInt(birth_day));
		SimpleDateFormat transformat = new SimpleDateFormat("yyyymmdd");
		try{
			birth = (Date)transformat.parse(birthStr);
		}
		catch(ParseException e){
			e.printStackTrace();
		}

		if(sex.equals("male"))
			sex="M";
		else
			sex="F";

		Member member= new Member(email,ecpasswd,firstname,lastname,birth,sex,"ROLE_USER");

		//request정보를 가져와서 member DB에 insert
		
		return memberDaoImpl.update(member);
	}
	
	

}
