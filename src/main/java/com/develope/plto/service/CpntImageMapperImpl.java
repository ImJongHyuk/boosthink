package com.develope.plto.service;

import java.util.*;

import org.codehaus.classworlds.uberjar.protocol.jar.Handler;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import com.develope.plto.dao.*;
import com.develope.plto.domain.*;
import com.develope.plto.thread.*;
import com.develope.plto.util.*;
import com.mysql.jdbc.log.Log;

@Service("CpntImageMapper")
public class CpntImageMapperImpl implements CpntImageMapper {

	@Autowired
	private ImageSrcDaoImpl imageSrcDaoImpl;
	
	@Override
	public List<Map<LogicCpnt, ImageSrc>> setMappedLogicImage(List<LogicCpnt> logicCpnts) {

		List<Map<LogicCpnt, ImageSrc>> list = new ArrayList<Map<LogicCpnt, ImageSrc>>();
		
		System.out.println("logicCpnts size: "+logicCpnts.size());
		for(int i=0, n=logicCpnts.size();i<n;i++){
			LogicCpnt tLogic = logicCpnts.get(i);
			ImageSrc tImgSrc = imageSrcDaoImpl.selectImageSrcById(logicCpnts.get(i).getImgSRC());
			Map<LogicCpnt, ImageSrc> tMap = new HashMap<>();
			tMap.put(tLogic, tImgSrc);
			list.add(tMap);
		}
		return list;
	}

	@Override
	public List<Map<LayoutCpnt, ImageSrc>> setMappedLayoutImage(List<LayoutCpnt> layoutCpnts) {
		
		List<Map<LayoutCpnt, ImageSrc>> list = new ArrayList<Map<LayoutCpnt, ImageSrc>>();
		
		for(int i=0,n=layoutCpnts.size();i<n;i++){
			LayoutCpnt tLayout = layoutCpnts.get(i);
			ImageSrc tImgSrc = imageSrcDaoImpl.selectImageSrcById(layoutCpnts.get(i).getImgSRC());
			Map<LayoutCpnt, ImageSrc> tMap = new HashMap<>();
			tMap.put(tLayout, tImgSrc);
			list.add(tMap);
		}
		return list;
	}



}
