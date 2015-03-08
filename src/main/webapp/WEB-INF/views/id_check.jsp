<%@ page import="java.net.URLEncoder"%>
<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ page import="java.sql.*"%>
<%@ page import="org.json.simple.*"%>
<%
 String id_check=request.getParameter("id");


 String DB_URL = "jdbc:mysql://165.246.44.143:3308/db_plto?characterEncoding=utf-8";
 String DB_USER = "root";

 String DB_PASSWORD = "1234";
 String sql = null;
 Connection conn = null;
 Statement stmt = null;
 ResultSet rs = null;

 Class.forName("com.mysql.jdbc.Driver");
 conn=DriverManager.getConnection(DB_URL,DB_USER,DB_PASSWORD);
 System.out.println("드라이버 로딩 성공");
  stmt = conn.createStatement();

 try{
	
  sql = "select * from tb_members where FD_EMAIL like '"+id_check+"'";
  rs = stmt.executeQuery(sql);

  
  if(rs.next()){

	  out.print(id_check+" 는 이미 사용중입니다.");
	
	   }
  else
	 {
	  out.print(id_check+"는 사용가능한 아이디 입니다.");
	 }


 }
 catch(Exception e){
  System.out.println("접속실패" + e.getMessage());
  e.printStackTrace();
 }

%>


