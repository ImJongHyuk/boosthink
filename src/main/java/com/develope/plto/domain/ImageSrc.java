package com.develope.plto.domain;

public class ImageSrc {
	private long FD_IMAGE_ID;
	private String FD_IMAGE_INFO;
	private String FD_IMAGE_SRC;

	public ImageSrc() {
	}

	public ImageSrc(long FD_IMAGE_ID, String FD_IMAGE_INFO, String FD_IMAGE_SRC) {
		this.FD_IMAGE_ID = FD_IMAGE_ID;
		this.FD_IMAGE_INFO = FD_IMAGE_INFO;
		this.FD_IMAGE_SRC = FD_IMAGE_SRC;
	}

	public long getFD_IMAGE_ID() {
		return FD_IMAGE_ID;
	}

	public String getFD_IMAGE_SRC() {
		return FD_IMAGE_SRC;
	}

	public String getFD_IMAGE_INFO() {
		return FD_IMAGE_INFO;
	}

	public void setFD_IMAGE_ID(long fD_IMAGE_ID) {
		FD_IMAGE_ID = fD_IMAGE_ID;
	}

	public void setFD_IMAGE_INFO(String fD_IMAGE_INFO) {
		FD_IMAGE_INFO = fD_IMAGE_INFO;
	}

	public void setFD_IMAGE_SRC(String fD_SRC) {
		FD_IMAGE_SRC = fD_SRC;
	}

}
