package junitTest.dao;

import static org.junit.Assert.assertEquals;

import java.sql.Date;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.develope.plto.dao.MemberDaoImpl;
import com.develope.plto.domain.Member;

public class MemberDaoImplTest {

	String[] configLocations = new String[] {"classpath:context/applicationContext-members.xml"};
	ApplicationContext context = new ClassPathXmlApplicationContext(configLocations);
	
	MemberDaoImpl memberDaoImpl = (MemberDaoImpl) context.getBean("memberDao"); 
	
	@Test
	public void testMemberDaoImpl() {

	Member testMember= new Member();
	testMember.setPassword("q1w2e3");
	testMember.setEmail("test@test.com");
	testMember.setFirstname("young hwan");
	testMember.setLastname("choi");
	Date birth = new Date(0);
	testMember.setBirth(birth);
	testMember.setSex("M");
	memberDaoImpl.insert(testMember);

	
	//寃��깋 諛� �엯�젰�솗�씤
	Member user = memberDaoImpl.selectMember(testMember.getEmail());
	assertEquals(user.getEmail(), testMember.getEmail());
	assertEquals(user.getFirstname(), testMember.getFirstname());
	assertEquals(user.getLastname(), testMember.getLastname());
	//assertEquals(user.get(0).getBirth(), testMember.getBirth());
	assertEquals(user.getSex(), testMember.getSex());

	Member testupdateMember= new Member();
	testupdateMember.setPassword("aadd223");
	testupdateMember.setEmail("test@test.com");
	testupdateMember.setFirstname("�븳�떎");
	testupdateMember.setLastname("�뾽�뀒�씠�듃");
	testupdateMember.setBirth(birth);
	testupdateMember.setSex("F");

	
	//�뾽�뜲�씠�듃
	int temp = 1;
	if(memberDaoImpl.update(testupdateMember)<0)
	{
		temp = 0;
	}
	assertEquals(temp, 1);

	user = memberDaoImpl.selectMember(testupdateMember.getEmail());
	
	assertEquals(user.getEmail(), testupdateMember.getEmail());
	assertEquals(user.getFirstname(), testupdateMember.getFirstname());
	assertEquals(user.getLastname(), testupdateMember.getLastname());
	//assertEquals(user.getBirth(), testupdateMember.getBirth());
	//寃곌낵媛믪� 媛숈�留� �삎�떇�씠 �떖�씪�꽌 �뿉�윭�쑙
	assertEquals(user.getSex(), testupdateMember.getSex());
		
	
	
	//�궘�젣
	
	assertEquals(1, memberDaoImpl.delete(testupdateMember.getEmail()));
	
	
	//detail�씠 �궡媛� �깮媛곹븳 寃��깋 湲곕뒫�씠 �븘�떂.!!
	//Snum�쑝濡� �븷�닔�엳�뒗寃� �뾾�쓬. setSnum �솢 留뚮뱾�뿀�뒗吏� 紐⑤Ⅴ寃좎쓬
	//search媛� 由ъ뒪�듃濡� 諛쏆븘�삤�뒗嫄� �닔�젙�씠 �븘�슂�븿
	//寃��깋�씠�옉 �쟾泥댁쓽 硫ㅻ쾭瑜� 諛곗뿴濡� 諛쏆븘�삤�뒗 寃껋� �뀒�뒪�똿�븷 諛⑸쾿�쓣 李얠� 紐삵뻽�쓬!
	//DB�뿰寃� �솗�씤 �븘吏� �븞�뻽�쓬
	
	
	}
}