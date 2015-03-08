package com.develope.plto.domain;


public class Layout {
	private long FD_LAYOUT_ID;
	private String FD_LAYOUT;
	
	
	public Layout(){}
	public Layout(long FD_LAYOUT_ID, String FD_LAYOUT)
	{
		this.FD_LAYOUT_ID = FD_LAYOUT_ID;
		this.FD_LAYOUT = FD_LAYOUT;
	}
	
	public long getId() {
		return FD_LAYOUT_ID;
	}
	public String getLayout() {
		return FD_LAYOUT;
	}
	public void setId(long FD_LAYOUT_ID) {
		this.FD_LAYOUT_ID = FD_LAYOUT_ID;
	}
	public void setLayout(String FD_LAYOUT) {
		this.FD_LAYOUT = FD_LAYOUT;
	}

}
