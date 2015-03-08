package junitTest.dao;

import static org.junit.Assert.*;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.develope.plto.dao.LayoutDaoImpl;
import com.develope.plto.domain.Layout;

public class LayoutDaoImplTest {
	
	String[] configLocations = new String[] {"classpath:context/applicationContext-layouts.xml"};
	ApplicationContext context = new ClassPathXmlApplicationContext(configLocations);
	
	LayoutDaoImpl layoutDaoImpl = (LayoutDaoImpl) context.getBean("layoutDao"); 
	
	@Test
	public void testLayoutDaoImpl() {
		//create testLayout instance
		Layout testLayout = new Layout();
		testLayout.setId(999888);
		testLayout.setLayout("It is test string");
		//create testupdateLayout instance
		Layout testupdateLayout = new Layout();
		testupdateLayout.setId(999888);
		testupdateLayout.setLayout("It is update string");
		//1 = success, 0 = fail
		assertEquals(1,layoutDaoImpl.insert(testLayout));
		assertEquals(1,layoutDaoImpl.update(testupdateLayout));
		assertEquals(1,layoutDaoImpl.update(testupdateLayout));
		assertEquals("It is update string",layoutDaoImpl.selectLayout(999888));
		assertEquals(1,layoutDaoImpl.delete(999888));
	}
}
