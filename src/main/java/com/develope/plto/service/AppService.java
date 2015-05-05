package com.develope.plto.service;

import com.develope.plto.thread.*;

public interface AppService {
	public int manageAppService(long layout_id, String email);
	
	public int addApp(String layout_data, String logic_data);
	
	public String executeApp(long board_id,LifeCycleThread lct, String email);
}
