package com.develope.plto.service;

import java.io.*;

import javax.servlet.*;
import javax.servlet.http.*;

import org.springframework.security.core.*;
import org.springframework.security.web.authentication.*;

public class LoginFailureHandler implements AuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest req,
			HttpServletResponse res, AuthenticationException auth)
			throws IOException, ServletException {
		// TODO Auto-generated method stub
		 res.sendRedirect(req.getContextPath()+"/");
	}

}
