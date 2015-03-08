package com.develope.plto.domain;

import java.util.*;

public class Member {
	private String FD_EMAIL;
	private String FD_PASSWORD;
	private String FD_FIRSTNAME;
	private String FD_LASTNAME;
	private Date FD_BIRTH;
	private String FD_SEX; 
	private String FD_AUTHORITY;
	
	
	public Member(){}
	public Member(String FD_EMAIL, String FD_PASSWORD, String FD_FIRSTNAME, String FD_LASTNAME, Date FD_BIRTH, String FD_SEX, String FD_AUTHORITY)
	{
		this.FD_EMAIL = FD_EMAIL;
		this.FD_PASSWORD =FD_PASSWORD;
		this.FD_FIRSTNAME = FD_FIRSTNAME;
		this.FD_LASTNAME = FD_LASTNAME;
		this.FD_BIRTH = FD_BIRTH;
		this.FD_SEX = FD_SEX;
		this.FD_AUTHORITY = FD_AUTHORITY;
	}
	
	public String getEmail() {
		return FD_EMAIL;
	}
	public String getPassword() {
		return FD_PASSWORD;
	}
	public String getFirstname() {
		return FD_FIRSTNAME;
	}
	public String getLastname() {
		return FD_LASTNAME;
	}
	public Date getBirth() {
		return FD_BIRTH;
	}
	public String getSex() {
		return FD_SEX;
	}
	public String getAuthority() {
		return FD_AUTHORITY;
	}
	public void setEmail(String FD_EMAIL) {
		this.FD_EMAIL = FD_EMAIL;
	}
	public void setPassword(String FD_PASSWORD) {
		this.FD_PASSWORD = FD_PASSWORD;
	}
	public void setFirstname(String FD_FIRSTNAME) {
		this.FD_FIRSTNAME = FD_FIRSTNAME;
	}
	public void setLastname(String FD_LASTNAME) {
		this.FD_LASTNAME = FD_LASTNAME;
	}
	public void setBirth(Date FD_BIRTH) {
		this.FD_BIRTH = FD_BIRTH;
	}
	public void setSex(String FD_SEX) {
		this.FD_SEX = FD_SEX;
	}
	public void setAuthority(String FD_AUTHORITY) {
		this.FD_AUTHORITY = FD_AUTHORITY;
	}
}
