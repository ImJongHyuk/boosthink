package com.develope.plto.domain;




public class Board {
	private long FD_BOARD_ID;
	private long FD_LAYOUT_ID;
	private byte[] FD_DATA;
	
	public Board(){}
	public Board(long FD_BOARD_ID, long FD_LAYOUT_ID, byte[] FD_DATA)
	{
		this.FD_BOARD_ID = FD_BOARD_ID;
		this.FD_LAYOUT_ID = FD_LAYOUT_ID;
		this.FD_DATA = FD_DATA;
	}
	
	public long getId() {
		return FD_BOARD_ID;
	}
	public long getLayoutId() {
		return FD_LAYOUT_ID;
	}
	public byte[] getData() {
		return FD_DATA;
	}
	public void setId(long FD_BOARD_ID) {
		this.FD_BOARD_ID = FD_BOARD_ID;
	}
	public void setLayoutId(long FD_LAYOUT_ID) {
		this.FD_LAYOUT_ID = FD_LAYOUT_ID;
	}
	public void setData(byte[] FD_DATA) {
		this.FD_DATA = FD_DATA;
	}

}
