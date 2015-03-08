package com.develope.plto.domain;


public class Logic {
	private String FD_LOGIC_ID;
	private String FD_LOGIC;
	
	
	public Logic(){}
	public Logic(String FD_LOGIC_ID, String FD_LOGIC)
	{
		this.FD_LOGIC_ID = FD_LOGIC_ID;
		this.FD_LOGIC = FD_LOGIC;
	}
	
	public String getId() {
		return FD_LOGIC_ID;
	}
	public String getLogic() {
		return FD_LOGIC;
	}
	public void setId(String FD_LOGIC_ID) {
		this.FD_LOGIC_ID = FD_LOGIC_ID;
	}
	public void setLogic(String FD_LOGIC) {
		this.FD_LOGIC = FD_LOGIC;
	}

}
