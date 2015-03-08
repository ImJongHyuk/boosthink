package com.develope.plto.service;

import java.io.*;

import javax.servlet.*;
import javax.servlet.http.*;

import org.springframework.context.*;
import org.springframework.context.support.*;
import org.springframework.security.core.*;
import org.springframework.security.web.authentication.*;

import com.develope.plto.dao.*;
import com.develope.plto.domain.*;

public class LoginSuccessHandler implements AuthenticationSuccessHandler {

	ApplicationContext con = new FileSystemXmlApplicationContext("classpath:context/applicationContext_sessions.xml");
	private SessionDaoImpl sessionDaoImpl= (SessionDaoImpl) con.getBean("sessionDao");

	@Override
	public void onAuthenticationSuccess(HttpServletRequest req,
			HttpServletResponse res, Authentication auth) throws IOException,
			ServletException {
		// TODO Auto-generated method stub
		HttpSession session = req.getSession();
		String session_id = session.getId();
		long login_time = session.getCreationTime();
		String email = auth.getName();

		
		//로그인 전에 snum이 겹치는 세션 정보 삭제
		sessionDaoImpl.delete(email);
		//이메일과 새로운 세션정보를 db에 등록
		LoginSession loginSession = new LoginSession(session_id, email, login_time);
		sessionDaoImpl.insert(loginSession);


		res.sendRedirect(req.getContextPath()+"/main");
	}
}

