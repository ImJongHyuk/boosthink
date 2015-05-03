package com.develope.plto.domain;

public class CpntWithImageSrc {

	private LogicCpnt logicCpnt;
	private LayoutCpnt layoutCpnt;
	private ImageSrc imageSrc;
	public ImageSrc getImageSrc() {
		return imageSrc;
	}
	public LayoutCpnt getLayoutCpnt() {
		return layoutCpnt;
	}
	public LogicCpnt getLogicCpnt() {
		return logicCpnt;
	}
	public void setImageSrc(ImageSrc imageSrc) {
		this.imageSrc = imageSrc;
	}
	public void setLayoutCpnt(LayoutCpnt layoutCpnt) {
		this.layoutCpnt = layoutCpnt;
		this.logicCpnt = null;
	}
	public void setLogicCpnt(LogicCpnt logicCpnt) {
		this.logicCpnt = logicCpnt;
		this.layoutCpnt = null;
	}
}
