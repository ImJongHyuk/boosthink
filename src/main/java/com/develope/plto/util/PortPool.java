package com.develope.plto.util;

import java.util.SortedMap;
import java.util.TreeMap;

/** inner class로 변경이 필요할 시 변경 예정 (in Excute)*/
public class PortPool {

	private final static int lowestPort = 10000;
	private final static int highestPort = 15000;
	
	/** Key: port, Value: layoutId */
	/** Key: layoutId, Value: port (selected)*/
	//private static SortedMap<Integer, Long> portMap;
	private static SortedMap<Integer, Long> idMap;
	private static SortedMap<Long, Integer> portMap;
	
	public PortPool() {
		idMap = new TreeMap<Integer, Long>();
		portMap = new TreeMap<Long, Integer>();
	}
	
	public static synchronized void returnPort(int port){
		portMap.remove(idMap.get(port));
		idMap.remove(port);
	}
	
	public static synchronized int getPort(long layoutId){
		// 1. search portMap 
		// 2. if portMap has a port then return portnumber
		// 3. else add new port in portMap & idMap
		
		if(!portMap.get(layoutId).equals(null)){
			return portMap.get(layoutId);
		}else{
			for(int i=lowestPort; i<=highestPort; i++){
				if(idMap.get(i).equals(null)){
					idMap.put(i, layoutId);
					portMap.put(layoutId, i);
					return i; /** return port number */
				}
			}
		}
		
		/** portMap is full*/
		return -1;
	}
}
