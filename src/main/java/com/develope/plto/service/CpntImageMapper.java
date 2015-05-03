package com.develope.plto.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.develope.plto.domain.CpntWithImageSrc;
import com.develope.plto.domain.ImageSrc;
import com.develope.plto.domain.Layout;
import com.develope.plto.domain.LayoutCpnt;
import com.develope.plto.domain.Logic;
import com.develope.plto.domain.LogicCpnt;


public interface CpntImageMapper {

	//public List<Map<LogicCpnt, ImageSrc>> setMappedLogicImage(List<LogicCpnt> logicCpnts);
	//public List<Map<LayoutCpnt, ImageSrc>> setMappedLayoutImage(List<LayoutCpnt> layoutCpnts);
	public List<CpntWithImageSrc> setMappedLogicImage(List<LogicCpnt> logicCpnts);
	public List<CpntWithImageSrc> setMappedLayoutImage(List<LayoutCpnt> layoutCpnts);
}
