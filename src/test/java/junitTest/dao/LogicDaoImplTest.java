package junitTest.dao;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.develope.plto.dao.LogicDaoImpl;
import com.develope.plto.domain.Logic;

public class LogicDaoImplTest {

	String[] configLocations = new String[] {"classpath:context/applicationContext-logics.xml"};
	ApplicationContext context = new ClassPathXmlApplicationContext(configLocations);
	
	LogicDaoImpl logicDaoImpl = (LogicDaoImpl) context.getBean("logicDao"); 

	@Test
	public void testLogicDaoImpl() {
		//create testLogic instance
		Logic testLogic = new Logic();
		testLogic.setId("999888");
		testLogic.setLogic("It is test string");
		//create testupdateLogic instance
		Logic testupdateLogic = new Logic();
		testupdateLogic.setId("999888");
		testupdateLogic.setLogic("It is update string");
		//1 = success, 0 = fail
		assertEquals(1,logicDaoImpl.insert(testLogic));
		assertEquals(1,logicDaoImpl.update(testupdateLogic));
		assertEquals("It is update string",logicDaoImpl.selectLogic("999888"));
		assertEquals(1,logicDaoImpl.delete("999888"));
	}

}
