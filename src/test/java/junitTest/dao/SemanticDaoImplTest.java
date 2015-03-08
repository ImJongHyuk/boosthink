//DB에서 리스트를 가져와서 테스트 하지 않고 임의로 SemanticList를 임의로 만들어서 테스트 하였음.
//else 구문 테스트가 없음.

package junitTest.dao;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.develope.plto.dao.SemanticDaoImpl;
import com.develope.plto.domain.SemanticList;

public class SemanticDaoImplTest {


	String[] configLocations = new String[] {"classpath:context/applicationContext_semantic.xml"};
	ApplicationContext context = new ClassPathXmlApplicationContext(configLocations);
	    
	SemanticDaoImpl semanticDaoImpl = (SemanticDaoImpl) context.getBean("semanticDao"); 
	
	
	SemanticList testSem = new SemanticList();
	List<SemanticList> list = new ArrayList<SemanticList>();
	
	@Test
	public void testToJson() {
		//set test values
		testSem.setCnt(100);
		testSem.setSnum(200);
		testSem.setValue("test String");
		assertTrue(list.add(testSem));
		assertEquals(semanticDaoImpl.toJson(list),"{\"Data\": [{\"snum\": \"200\", \"value\": \"test String\", \"cnt\": \"100\"}]}");
	}

	@Test
	public void testToXml() {
		//set test values
		testSem.setCnt(100);
		testSem.setSnum(200);
		testSem.setValue("test String");
		assertTrue(list.add(testSem));
		assertEquals(semanticDaoImpl.toXml(list),"<?xml version=\"1.0\" encoding=\"utf-8\"?><SROOT><FD><SNUM>200</SNUM><VALUE>test String</VALUE><CNT>100</CNT></FD></SROOT>");
	}
}