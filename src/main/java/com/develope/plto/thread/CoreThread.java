package com.develope.plto.thread;

import java.util.*;
import java.util.concurrent.*;

import org.json.simple.*;

public class CoreThread extends Thread{
	private Map<String,Object> dataMap = new HashMap<String,Object>();
	private Map<Long, CoreLogicThread> logicMap = new HashMap<Long, CoreLogicThread>(); 
	private AppThread at;

	//생성과 동시에 앱쓰레드를 가져옴
	public CoreThread(AppThread at)
	{
		this.at = at;
	}
	
	
	public void putData(String key, Object value)
	{
		dataMap.put(key, value);
	}
	
	public Object getData(String key)
	{
		return dataMap.get(key);
	}


	//코어에서 실행할 로직쓰레드 실행(주기적으로 로직이 실행될 때)
	public void executeLogic(int time, long layout_id, String event_id, long thread_id)
	{
		//time주기로 레이아웃 아이디 이벤트 아이디에 해당하는 로직을 실행
		CoreLogicThread clt = new CoreLogicThread(time, layout_id, event_id, thread_id);
		clt.start();
		logicMap.put(clt.getId(), clt);
	}

	//0.2초마다 core의 큐를 검색한다.
	@Override
	public void run()
	{
		while(true)
		{
			JSONObject toScript = at.checkQueue("core");
			
			if(toScript != null)
				System.out.println("코어에서 받은 것: " + toScript.toJSONString());
			//받아온 투 스크립트 해석****

			try {
				Thread.sleep(200);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}


}
