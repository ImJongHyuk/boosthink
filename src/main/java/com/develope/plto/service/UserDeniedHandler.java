package com.develope.plto.service;

import java.io.*;

import javax.servlet.*;
import javax.servlet.http.*;

import org.springframework.security.access.*;
import org.springframework.security.web.access.*;

public class UserDeniedHandler implements AccessDeniedHandler{

	@Override
	public void handle(HttpServletRequest req, HttpServletResponse res,
			AccessDeniedException ade) throws IOException, ServletException {
		// TODO Auto-generated method stub
		 
		 req.setAttribute("errMsg",ade.getMessage());
		 req.getRequestDispatcher("/WEB-INF/views/denied.jsp").forward(req, res);
	}

}
