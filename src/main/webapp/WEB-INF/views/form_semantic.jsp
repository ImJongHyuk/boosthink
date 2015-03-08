<%@ page import="java.net.URLEncoder"%>
<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ page import="java.sql.*"%>
<%@ page import="org.json.simple.*"%>
<%

 String order=request.getParameter("order"); 
 String data=request.getParameter("data");

 String DB_URL = "jdbc:mysql://165.246.44.143:3308/db_plto?characterEncoding=utf-8";
 String DB_USER = "root";

 String DB_PASSWORD = "1234";
 String sql = null;
 
 if(order=="0")
 {
	 sql = "select distinct FD_SL_CATEGORY_TOP from tb_semantic_list"; 
 }
 else if(order=="1")
 {
	 sql = "select distinct FD_SL_CATEGORY_BOTTOM from tb_semantic_list"; 
 }
 else
 {
	 sql = "select distinct FD_SL_DATA from tb_semantic_list"; 
 }
 
 
 Connection conn = null;
 Statement stmt = null;
 ResultSet rs = null;

 Class.forName("com.mysql.jdbc.Driver");
 conn=DriverManager.getConnection(DB_URL,DB_USER,DB_PASSWORD);
 System.out.println("드라이버 로딩 성공");
  stmt = conn.createStatement();

 try{
	
  //sql = "select distinct FD_SL_CATEGORY_TOP from tb_semantic_list";
  rs = stmt.executeQuery(sql);
  //JSONArray arr = new JSONArray();
  
  while(rs.next()){
	 // String part = URLEncoder.encode(rs.getString("part"),"euc-kr"); 
	  // String answer = URLEncoder.encode(rs.getString("answer"),"euc-kr"); 
	  out.print(rs.getString(1));
	
	   }


 }
 catch(Exception e){
  System.out.println("접속실패" + e.getMessage());
  e.printStackTrace();
 }

%>


