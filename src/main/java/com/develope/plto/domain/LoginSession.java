package com.develope.plto.domain;


public class LoginSession {
	private String FD_SESSION_ID;
	private String FD_USER_EMAIL;
	private long FD_LOGIN_TIME;
	
	
	public LoginSession(){}
	public LoginSession(String FD_SESSION_ID, String FD_USER_EMAIL, long FD_LOGIN_TIME)
	{
		this.FD_SESSION_ID = FD_SESSION_ID;
		this.FD_USER_EMAIL = FD_USER_EMAIL;
		this.FD_LOGIN_TIME =FD_LOGIN_TIME;
	}
	
	public String getSessionId() {
		return FD_SESSION_ID;
	}
	public String getEmail() {
		return FD_USER_EMAIL;
	}
	public long getLoginTime() {
		return FD_LOGIN_TIME;
	}
	public void setSessionId(String FD_SESSION_ID) {
		this.FD_SESSION_ID = FD_SESSION_ID;
	}
	public void setEmail(String FD_USER_EMAIL) {
		this.FD_USER_EMAIL = FD_USER_EMAIL;
	}
	public void setLoginTime(long FD_LOGIN_TIME) {
		this.FD_LOGIN_TIME = FD_LOGIN_TIME;
	}

}
