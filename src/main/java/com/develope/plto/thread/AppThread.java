package com.develope.plto.thread;

import java.io.*;
import java.util.*;
import java.util.concurrent.*;

import org.json.simple.*;
import org.springframework.context.*;
import org.springframework.context.support.*;

import com.develope.plto.dao.*;
import com.develope.plto.domain.*;
import com.develope.plto.parser.*;



public class AppThread extends Thread{
	private boolean s_flag = false;//앱이 최소 한번 실행이 되었는지 확인하는 플래그
	private boolean end_flag = false;//쓰레드 종료를 알리는 플래그
	private long th_id;
	private long board_id;//쓰레드와 연결된 게시판 아이디
	private String plang;
	private Semaphore sem;
	private Queue inq;//처리할 플랭을 순서대로 담을 큐
	private BoardDaoImpl boardDaoImpl;
	// 사용자 정보와 그 사용자에게 할당할 toscript큐를 저장할 맵
	private Map<String,Queue> memberSession = new HashMap<String, Queue>(); 
	// 커넥션 유지 카운트를 저장할 맵
	private Map<String,Integer> memberCount = new HashMap<String, Integer>(); 
	
	//커넥션 검사 시 임시로 사용할 맵들
	private Map<String,Integer> beforeMap = new HashMap<String,Integer>();
	private Map<String,Integer> tmpMap = new HashMap<String,Integer>();

	//쓰레드에서 유지해야하는 데이터 새로운 참가자는 이정보를 이용하여 데이터를 로드한다
	private Map<String,List<JSONObject>> dataToSave = new HashMap<String,List<JSONObject>>();

	private CoreThread ct;
	
	//앱쓰레드에 사용자를 추가하는 메소드
	public void insertMemberSession(String email)
	{
		List<JSONObject> list= new ArrayList<JSONObject>();
		dataToSave.put(email, list);
		
		Queue newQueue = new LinkedList();
		memberSession.put(email, newQueue);
		memberCount.put(email, new Integer(0));
		//사용자가 한명은 입력되었으면 플래그를 true로 바꿈
		if(s_flag == false)
			s_flag=true;
	}

	// 앱쓰레드를 빠져나간 사용자 삭제
	public void removeMemberSession(String email)
	{
		memberSession.remove(email);
		memberCount.remove(email);
	}

	//이메일주소에 해당하는 큐 검사
	public JSONObject checkQueue(String email)
	{
		if(!email.equals("core"))
			memberCount.put(email,(memberCount.get(email)+1));// core가 아닌 정상 사용자는 카운트를 하나 증가시킨다.
		Queue q = memberSession.get(email);
		return (JSONObject) q.poll();
	}

	//앱쓰레드와 사용자간의 커넥션 검사
	public void updateMember()
	{

		String[] memberArray = memberCount.keySet().toArray(new String[0]);// 사용자 정보를 배열로 변환

		beforeMap.clear();
		beforeMap.putAll(tmpMap);
		tmpMap.clear();

		//접속중이라고 판단되는 모든 사용자 검사 
		for(int i=0; i<memberArray.length; i++)
		{
			//카운트 검사 후 증가 되지않았으면 커넥션이 끊겼다고 판단
			if(beforeMap.get(memberArray[i]) == memberCount.get(memberArray[i]))
			{
				System.out.println(memberArray[i]+" 빠져나감" +memberCount.get(memberArray[i]) + " " +beforeMap.get(memberArray[i])
						);
				removeMemberSession(memberArray[i]);
				continue;
			}
			tmpMap.put(memberArray[i], memberCount.get(memberArray[i]));
		}
	}

	//앱쓰레드에 접속중인 사용자가 있는지 없는지 판단하여 없으면 true를 리턴
	public boolean isMemberEmpty()
	{
		if(memberSession.isEmpty() && s_flag)
			return true;
		else
			return false;
	}

	//유지해야 하는 데이터를 직렬화하여 저장(쓰레드가 종료될때 실행)
	public void serializeData()
	{
	

		try {
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			ObjectOutputStream oos = new ObjectOutputStream(bos);
			oos.writeObject(dataToSave);
			System.out.println("Object out"
					+ " value ::"+dataToSave.toString());
			oos.flush();
			oos.close();
			bos.close();

			byte[] data = bos.toByteArray();

			Board b = new Board(board_id,0,data);
			boardDaoImpl.update(b);
			Map<String, Object> returnData = boardDaoImpl.selectData(1);
			byte[] aa = (byte[])returnData.get("BINARY_FILE_INFO");
			
			System.out.println(aa);
			ByteArrayInputStream bais;

			ObjectInputStream ins;

			bais = new ByteArrayInputStream(aa);

			ins = new ObjectInputStream(bais);

			Map<String,List<JSONObject>> m =(Map<String,List<JSONObject>>)(ins.readObject());

			System.out.println("Object in value ::"+m.toString());
			ins.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}



	}


	public void setBoardId(long b_id)
	{
		board_id = b_id;
	}

	public long getBoardId()
	{
		return board_id;
	}

	//코어를 생성하여 실행시키는 메소드
	public void startCore(AppThread at)
	{
		ct = new CoreThread(at);
		ct.start();
	}

	
	//생성자
	public AppThread()
	{
		th_id=-1;
		sem = new Semaphore(1);
		inq = new LinkedList();
		
		//core라는 사용자를 시작과 동시에 할당
		List<JSONObject> list= new ArrayList<JSONObject>();
		dataToSave.put("core", list);
		
		Queue newQueue = new LinkedList();
		memberSession.put("core", newQueue);
		
		ApplicationContext con = new FileSystemXmlApplicationContext("classpath:context/applicationContext_board.xml");
		boardDaoImpl= (BoardDaoImpl) con.getBean("boardDao");
	}

	/* appThread의 runnable method  */
	@Override
	public void run()
	{	
		th_id = Thread.currentThread().getId();//현재쓰레드 아이디를 가져옴
		
		try {
			sem.acquire();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		while(true)
		{

			try {
				sem.acquire();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if(!end_flag)
			{
				plang = (String)inq.poll();
				System.out.println(th_id+" is started");
				System.out.println("입력된 플랭: "+plang);
				
				
				try {
					InputStream is = new ByteArrayInputStream(plang.getBytes());
					Reader rdr = new InputStreamReader( is, "UTF-8" ) ;
					SimpleCharStream charStream = new SimpleCharStream( rdr ) ;
					plang_parserTokenManager tokenMan = new plang_parserTokenManager(charStream);
					
					//파서로 앱쓰레드와 코어쓰레드를 인자로 함께 보낸다(파서에서 사용하기 때문)
					// <tokenManager, AppThread, CoreThread>
					plang_parser parser = new plang_parser(tokenMan, this, ct);
					
					while(parser.parseOneLine()){}
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (UnsupportedEncodingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			else
				break;//쓰레드 종료
		}
	}

	//플랭을 큐에 집어넣고 세마포어를 풀어줌으로써 쓰레드를 작동시킴
	public void wakeUp(String plang)
	{
		inq.offer(plang);
		sem.release();
	}

	//쓰레드를 종료하기 위해 세마포어를 푸는 용도
	public void endThread()
	{
		end_flag = true;
		sem.release();
	}

	public long getId()
	{
		return th_id;
	}

}
