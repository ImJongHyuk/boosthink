//delete를 snum으로 삭제하는 것이

package junitTest.dao;

import static org.junit.Assert.assertEquals;




import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.develope.plto.dao.SessionDaoImpl;
import com.develope.plto.domain.LoginSession;


public class SessionDaoImplTest {
	
	
	String[] configLocations = new String[] {"classpath:context/applicationContext_sessions.xml"};
	 ApplicationContext context = new ClassPathXmlApplicationContext(configLocations);
	    
	SessionDaoImpl sessionDaoImpl = (SessionDaoImpl) context.getBean("sessionDao"); 
	
	
	@Test
	public void testSessionDaoImpl() {
		
		//입력할 새로운 객체 생성 이걸로 입력 해봄
		LoginSession testSession= new LoginSession();
		testSession.setEmail("kimcj1229@naver.com");
		testSession.setSessionId("hsk111");
		testSession.setLoginTime(1);
		sessionDaoImpl.insert(testSession);//입렦!!
		
		
		//검색 및 입력확인
		LoginSession user = sessionDaoImpl.selectSession(testSession.getEmail());
		assertEquals(user.getEmail(), testSession.getEmail());
		assertEquals(user.getLoginTime(), testSession.getLoginTime());
		assertEquals(user.getSessionId(), testSession.getSessionId());
		
		
		//삭제	  
		assertEquals(1, sessionDaoImpl.delete(testSession.getEmail()));
	
	}
}

