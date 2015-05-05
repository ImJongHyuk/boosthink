package com.develope.plto.thread;

import java.util.*;
import java.util.concurrent.*;

public class LifeCycleThread extends Thread{
	private static ExecutorService es;
	private static Map<Long, AppThread> thmap;//쓰레드 아이디와 쓰레드를 매핑해서 저장할 맵
	private static Map<Long, Long> btmap;//게시판 아이디와 쓰레드 아이디를 매핑해서 저장할 맵
	private static Map<Long, Long> blmap;//게시판 아이디와 레이아웃 아이디를 매핑해서 저장할 맵
	
	public LifeCycleThread()
	{
		es = Executors.newFixedThreadPool(1000);//쓰레드풀 1000개 생성
		thmap= new HashMap<Long, AppThread>();
		btmap= new HashMap<Long, Long>();
		this.start();
	}
	@SuppressWarnings("deprecation")
	@Override
	public void run()
	{
		while(true)
		{
			Long[] threadArray = thmap.keySet().toArray(new Long[0]);
			for(int i=0; i<threadArray.length; i++)
			{
				//각 쓰레드 검사
				AppThread at = thmap.get(threadArray[i]);
				
				at.updateMember();//멤버 갱신
				
				//만약 비어있으면 쓰레드 삭제
				if(at.isMemberEmpty())
					
				{
					System.out.println(at.getId()+"종료");
					//데이터 저장
			        at.serializeData();
					btmap.remove(at.getBoardId());
					at.endThread();
					thmap.remove(threadArray[i]);
				}
			}

			
			//10초간 대기, (=10초 마다 죽일지 여부를 판단)
			try {
				Thread.sleep(10000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	public void putThmap(long t_id, AppThread at)
	{
		thmap.put(t_id, at);
	}
	
	public void putBtmap(long b_id, long t_id)
	{
		btmap.put(b_id, t_id);
	}
	
	public AppThread getThmap(long t_id)
	{
		return thmap.get(t_id);
	}
	
	public Long getBtmap(long b_id)
	{
		return btmap.get(b_id);
	}
	
	public Set<Long> getThmapKeySet()
	{
		return thmap.keySet();
	}
	
	public void submitThread(AppThread at)
	{
		es.submit(at);
	}
	
}
