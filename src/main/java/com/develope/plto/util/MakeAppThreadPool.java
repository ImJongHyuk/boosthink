package com.develope.plto.util;

public class MakeAppThreadPool {

	/** TODO
		새로운 앱을 제작하거나, 제작중인 앱을 찾는 방법을 구혀해야함
		
		PortPool을 공유하여 port:layoutId 셋을 유지함
		
		요청: layoutId, email을 던져주며 포트를 내놓으라한다. (레이아웃 수정을 위한)
		응답: 통신을 위한 port를 던져준다.
		
		이후동작: MakeAppThread를 실행시키며, 이를 port:MakeAppThreadId 셋으로 유지
			MakeAppThread 동작
				- 시작 파라미터 (Socket통신을 위한 port(Integer), 접속자의 email(String))
				- UDP listen Packet Data type: JSON
					{email:"", data:""}
				- UDP send Packet Data type: JSON
					{type:"", data:"", locale:"", link:""}
				- joinMakeAppThread(email): thread 내 함수, socket통신의 대상 결정
	*/
	private static PortPool portPool;
	
	public MakeAppThreadPool() {
		// TODO Auto-generated constructor stub
	}
	
}
