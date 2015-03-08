package com.develope.plto.service;

import java.util.*;

import org.springframework.security.core.authority.*;
import org.springframework.security.core.userdetails.*;

import com.develope.plto.dao.*;
import com.develope.plto.domain.*;

public class MemberDetailsService implements UserDetailsService{
	
	//private ApplicationContext con = new FileSystemXmlApplicationContext("C:/Users/Gom/workspace/Copy of PLTO/src/main/resources/context/applicationContext-members.xml");
	//private MemberDaoImpl memberDaoImpl = (MemberDaoImpl)con.getBean("memberDao");
	private MemberDao memberDao;
	
	public void setMemberDao(MemberDaoImpl memberDao)
	{
		this.memberDao = memberDao;
	}

	@Override
	public UserDetails loadUserByUsername(String email)
			throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		Member member = memberDao.selectMember(email);
		String pwd = member.getPassword();
		
		Collection<SimpleGrantedAuthority> roles = new ArrayList<SimpleGrantedAuthority>();
		roles.add(new SimpleGrantedAuthority(member.getAuthority()));
		
		UserDetails user = new User(email, pwd, roles);
		return user;
	}
	
	
}
