package junitTest.dao;

import static org.junit.Assert.*;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.develope.plto.dao.ScriptMapperDaoImpl;
import com.develope.plto.domain.ScriptMapper;

public class ScriptMapperDaoImplTest {
	
	String[] configLocations = new String[] {"classpath:context/applicationContext_scriptmapper.xml"};
	ApplicationContext context = new ClassPathXmlApplicationContext(configLocations);
	
	ScriptMapperDaoImpl scriptMapperDaoImpl = (ScriptMapperDaoImpl) context.getBean("scriptMapperDao"); 
	@Test
	public void testInsert() {	
		/* 존재하고 있는 foreign key 로 테스트해야하는데.. 어떻게 해야할지 잘 모르겠네
		ScriptMapper sm = new ScriptMapper();
		sm.setId(100);
		sm.setLayoutId(998);
		sm.setEventId("EventId");
		sm.setPlangId("PlangId");
		//1 = success, 0 = fail
		assertEquals(1,scriptMapperDaoImpl.insert(sm));	
		*/
	}

	@Test
	public void testSelectPlangId() {
		assertEquals("asd",scriptMapperDaoImpl.selectPlangId(1891051753, "123"));
	}

}
