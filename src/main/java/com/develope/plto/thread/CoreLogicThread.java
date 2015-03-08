package com.develope.plto.thread;

import org.springframework.context.*;
import org.springframework.context.support.*;

import com.develope.plto.dao.*;


public class CoreLogicThread extends Thread{
	private int time;
	private ScriptMapperDaoImpl scriptMapperDaoImpl;
	private LogicDaoImpl logicDaoImpl;
	private long layout_id;
	private String event_id;
	private long thread_id;
	
	
	//timeterm을 가져오고 레이아웃아이디와 이벤트아이디 쓰레드아이디도 받아온다 
	public CoreLogicThread(int time, long layout_id, String event_id, long thread_id)
	{
		ApplicationContext con = new FileSystemXmlApplicationContext("classpath:context/applicationContext_scriptmapper.xml");
		scriptMapperDaoImpl= (ScriptMapperDaoImpl) con.getBean("scriptMapperDao");
		ApplicationContext con2 = new FileSystemXmlApplicationContext("classpath:context/applicationContext-logics.xml");
		logicDaoImpl= (LogicDaoImpl) con2.getBean("logicDao");
		this.time = time;
		this.layout_id = layout_id;
		this.event_id = event_id;
		this.thread_id = thread_id;
	}
	
	@Override
	public void run()
	{
		while(true)
		{
			//로직을 가져옴
			String plang_id = scriptMapperDaoImpl.selectPlangId(layout_id, event_id);
			logicDaoImpl.selectLogic(plang_id);
			
			try {
				Thread.sleep(time);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	
}
