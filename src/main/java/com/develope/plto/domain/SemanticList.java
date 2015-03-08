package com.develope.plto.domain;

public class SemanticList {
	private long FD_SNUM;
	private long FD_CNT;
	private String FD_VALUE;
	
	public long getSnum() {
		return FD_SNUM;
	}
	public long getCnt() {
		return FD_CNT;
	}
	public String getValue() {
		return FD_VALUE;
	}
	public void setSnum(long FD_SNUM) {
		this.FD_SNUM = FD_SNUM;
	}
	public void setCnt(long FD_CNT) {
		this.FD_CNT = FD_CNT;
	}
	public void setValue(String FD_VALUE) {
		this.FD_VALUE = FD_VALUE;
	}
}