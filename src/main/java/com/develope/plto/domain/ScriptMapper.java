package com.develope.plto.domain;


public class ScriptMapper {
	private long FD_ID;
	private String FD_PLANG_ID;
	private long FD_LAYOUT_ID;
	private String FD_EVENT_ID;
	
	public ScriptMapper(){}
	public ScriptMapper(long FD_ID, String FD_PLANG_ID, long FD_LAYOUT_ID, String FD_EVENT_ID)
	{
		this.FD_ID = FD_ID;
		this.FD_PLANG_ID = FD_PLANG_ID;
		this.FD_LAYOUT_ID = FD_LAYOUT_ID;
		this.FD_EVENT_ID = FD_EVENT_ID;
	}
	
	public long getId() {
		return FD_ID;
	}
	public String getPlangId() {
		return FD_PLANG_ID;
	}
	public long getLayoutId() {
		return FD_LAYOUT_ID;
	}
	public String getEventId() {
		return FD_EVENT_ID;
	}
	public void setId(long FD_ID) {
		this.FD_ID = FD_ID;
	}
	public void setPlangId(String FD_PLANG_ID) {
		this.FD_PLANG_ID = FD_PLANG_ID;
	}
	public void setLayoutId(long FD_LAYOUT_ID) {
		this.FD_LAYOUT_ID = FD_LAYOUT_ID;
	}
	public void setEventId(String FD_EVENT_ID) {
		this.FD_EVENT_ID = FD_EVENT_ID;
	}

}
