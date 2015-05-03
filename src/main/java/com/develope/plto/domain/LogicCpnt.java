package com.develope.plto.domain;


public class LogicCpnt {
	private String FD_ID;
	private String FD_SRC;
	private int FD_CATEGORY;
	private int FD_IMG_SRC;

	public LogicCpnt(){}
	public LogicCpnt(String FD_ID, String FD_SRC, int FD_CATEGORY)
	{
		this.FD_ID = FD_ID;
		this.FD_SRC = FD_SRC;
		this.FD_CATEGORY = FD_CATEGORY;
	}

	public String getID() {
		return FD_ID;
	}
	public void setID(String iD) {
		FD_ID = iD;
	}
	public String getSRC() {
		return FD_SRC;
	}
	public void setSRC(String sRC) {
		FD_SRC = sRC;
	}
	public int getCATEGORY() {
		return FD_CATEGORY;
	}
	public void setCATEGORY(int cATEGORY) {
		FD_CATEGORY = cATEGORY;
	}
	public int getImgSRC(){
		return FD_IMG_SRC;
	}
	public void setImgSrc(int iMgSrc){
		FD_IMG_SRC = iMgSrc;
	}	
}