package com.develope.plto.controller;

//import java.io.UnsupportedEncodingException;
//import java.util.List;
import java.io.*;
import java.util.*;

import javax.servlet.http.*;

import org.json.simple.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.security.core.*;
import org.springframework.stereotype.*;
import org.springframework.ui.*;
import org.springframework.web.bind.annotation.*;

import com.develope.plto.dao.*;
import com.develope.plto.domain.*;
import com.develope.plto.service.*;
import com.develope.plto.thread.*;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import org.springframework.web.bind.annotation.PathVariable;
//import com.develope.plto.domain.User;



/**
 * Handles requests for the application home page.
 */
@SuppressWarnings("serial")
@Controller
public class HomeController extends HttpServlet {

	// 서버를 시작하자마자 appthread를 관리하는 쓰레드를 작동시킴
	// 추후 init 메소드로 변경할 부분임
	private LifeCycleThread lifeCycleThread = new LifeCycleThread();

	@Autowired
	private MemberDaoImpl memberDaoImpl;

	@Autowired
	private MemberServiceImpl memberServiceImpl;

	@Autowired
	private ImageSrcDaoImpl imageSrcDaoImpl; 
	
	@Autowired
	private SessionDaoImpl sessionDaoImpl;

	@Autowired
	private LayoutDaoImpl layoutDaoImpl;

	@Autowired
	private LogicDaoImpl logicDaoImpl;

	@Autowired
	private BoardDaoImpl boardDaoImpl;

	@Autowired
	private ScriptMapperDaoImpl scriptMapperDaoImpl;

	@Autowired
	private AppServiceImpl appServiceImpl;

	@Autowired
	private LayoutCpntDaoImpl layoutCpntDaoImpl;

	@Autowired
	private LogicCpntDaoImpl logicCpntDaoImpl;
	
	@Autowired
	private CpntImageMapperImpl cpntImageMapperImpl;

	//"/login"으로 이동
	@RequestMapping(value = "/", method = {RequestMethod.GET,RequestMethod.POST})
	public String redirectLogin(Locale locale, Model model) {
		return "redirect:/login";
	}


	//login.jsp로 이동
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String loginPage(Locale locale, Model model) {
		System.out.println("get방식");

		return "login";
	}

	//login.jsp로 이동
	@RequestMapping(value = "/login", method =RequestMethod.POST)
	public String loginPage_post(Locale locale, Model model) {
		System.out.println("post방식");
		return "login";
	}

	//main.jsp로 이동
	@RequestMapping(value = "/main", method = {RequestMethod.GET,RequestMethod.POST})
	public String mainPage(Locale locale, Model model, Authentication auth) {
		//게시글 리스트 출력위한 
		List<Board> list = boardDaoImpl.selectAllBoard();
		model.addAttribute("list",list);

		return "main";
	}

	//아직 안씀
	@RequestMapping(value = "/form_semantic", method = RequestMethod.GET)
	public String moveToForm_Semantic(Locale locale, Model model) {
		System.out.println("시맨틱 실행!");
		return "form_semantic";
	}

	//회원가입페이지로 이동
	@RequestMapping(value = "/join", method = RequestMethod.GET)
	public String joinPage(Locale locale, Model model) {
		System.out.println("join 실행!");
		return "join";
	}

	//앱 제작 페이지로 이동
	@RequestMapping(value = "/make_app", method = RequestMethod.GET)
	public String makeAppPage(Locale locale, Model model) {
		System.out.println("edit 실행!");
		return "make_app";
	}

	//테스트 페이지로 이동
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String testPage(Locale locale, Model model) {
		System.out.println("test 실행!");
		return "test";
	}

	//이메일 중복 테스트
	@RequestMapping(value = "/check_email", method = RequestMethod.POST)
	public @ResponseBody String checkEmail(@RequestParam(value="email")String email)
	{
		String retval;
		if(memberDaoImpl.selectMember(email)==null)
		{
			retval = "unoccupied";
		}
		else
		{
			retval = "occupied";
		}
		return retval;
	}

	//기존 정보가 입력된 상태로 회원정보수정페이지로 이동
	@SuppressWarnings("deprecation")
	@RequestMapping(value = "/modify", method = RequestMethod.GET)
	public String modifyPage(Locale locale, Model model, Authentication auth) {
		System.out.println("modify 실행!");

		//권한이 없을 때
		if(auth == null)
		{
			return "redirect:/login";
		}
		String email = auth.getName();//인증정보로 이메일 가져옴

		//이메일로 기존 정보를 가져온다.
		Member member = memberDaoImpl.selectMember(email);
		String firstname = member.getFirstname();
		String lastname = member.getLastname();
		int year = member.getBirth().getYear()+1900;
		int month = member.getBirth().getMonth()+1;
		int day = member.getBirth().getDate();
		String sex = member.getSex();

		//기존 정보를 모델에 담는다.
		model.addAttribute("firstname", firstname);
		model.addAttribute("lastname", lastname);
		model.addAttribute("year", year);
		model.addAttribute("month", month);
		model.addAttribute("day", day);
		model.addAttribute("sex", sex);

		System.out.println("기존 정보: " + firstname + " " + lastname + " " + year
				+ " " + month + " " + day + " " + sex);

		//mod_user.jsp로 이동
		return "modify";
	}

	//수정된 정보로 회원정보 업데이트
	@RequestMapping(value = "/modifyProc", method = RequestMethod.POST)
	public String modifyProc(HttpServletRequest request, Authentication auth) {
		//권한 검사
		if(auth == null)
		{
			return "redirect:/login";
		}

		int result = memberServiceImpl.updateMember(auth.getName(), request.getParameter("user_password"), request.getParameter("user_firstname"),
				request.getParameter("user_lastname"), request.getParameter("user_birth_year"), request.getParameter("user_birth_month")
				, request.getParameter("user_birth_day"), request.getParameter("user_sex"));

		if(result == 1)
			return "redirect:/main";
		else
			return "error";
	}

	/*등록된 앱을 리스트형식으로 출력하는 메소드*/
	@RequestMapping(value = "/app_list", method = RequestMethod.GET)
	public String appList(Locale locale, Model model,HttpServletRequest request) throws UnsupportedEncodingException 
	{
		request.setCharacterEncoding("utf-8");
		@SuppressWarnings("unused")
		String msg=request.getParameter("layout_data");

		List<Layout> list = layoutDaoImpl.selectAllLayout();

		model.addAttribute("list",list);
		return "app_list";
	}

	/** app list response for javascript */
	@RequestMapping(value = "/get_dynamic_app_list_all.ajax", method = RequestMethod.GET)
	public @ResponseBody List<Layout> getDynamicAppListAll(){
		List<Layout> list = layoutDaoImpl.selectAllLayout();
		return list;
	}
	
	/**  layout cpnt list response for js */
	@RequestMapping(value = "/get_dynamic_all_layout_cpnt.ajax", method = RequestMethod.GET)
	public @ResponseBody List<CpntWithImageSrc> getDynamicAllLayoutCpnt()
	{
		List<LayoutCpnt> lcList = layoutCpntDaoImpl.selectAllLayoutCpnt();
		List<CpntWithImageSrc> list = cpntImageMapperImpl.setMappedLayoutImage(lcList);

		return list;
	}

	/**  logic cpnt list response for js */
	@RequestMapping(value = "/get_dynamic_all_logic_cpnt.ajax", method = RequestMethod.GET)
	public @ResponseBody List<CpntWithImageSrc> getDynamicAllLogicCpnt()
	{
		List<LogicCpnt> lcList = logicCpntDaoImpl.selectAllLogicCpnt();
		List<CpntWithImageSrc> list = cpntImageMapperImpl.setMappedLogicImage(lcList);

		return list;
	}	

	/**  members list response for js */
	@RequestMapping(value = "/get_dynamic_all_members.ajax", method = RequestMethod.GET)
	public @ResponseBody List<Member> getDynamicAllMembers()
	{
		List<Member> list = memberDaoImpl.selectAllMember();

		return list;
	}	

	//회원가입 요청을 get방식으로 할 때는 메인페이지로 이동
	@RequestMapping(value = "/signup", method = RequestMethod.GET)
	public String signupProc_get(Locale locale, Model model,HttpServletRequest request)
	{
		System.out.println("get방식 불가");
		return "redirect:/login";
	}

	/*회원가입 요청을 수락하는 메소드*/
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public @ResponseBody String signupProc(@RequestParam("j_username")String email, @RequestParam("j_password")String password,
			@RequestParam("user_firstname")String firstname, @RequestParam("user_lastname")String lastname,
			@RequestParam("user_birth_year")String birth_year, @RequestParam("user_birth_month")String birth_month,
			@RequestParam("user_birth_day")String birth_day, @RequestParam("user_sex")String sex) throws UnsupportedEncodingException 
			{
		System.out.println("signUp 시작!");
		int result = memberServiceImpl.insertMember(email, password, firstname, lastname, birth_year, birth_month, birth_day, sex);

		if(result == 1)
			return "success";
		else
			return "fail";
			}





	//앱등록요청을 get방식으로 할 때는 메인페이지로 이동
	@RequestMapping(value = "/add_app", method = RequestMethod.GET)
	public String addApp_get(Locale locale, Model model,HttpServletRequest request)
	{
		System.out.println("get방식 불가");
		return "redirect:/login";
	}


	/*앱 등록 요청을 수락하는 메소드*/
	/*앱 등록을 하기 위한 id를 설정함에 있어서 id를 db에서 자동으로 auto increment를 하게 되면
	 * 동시에 여러 사람이 db에 layout을 추가하게 되면서 자기 자신의 id를 찾을 수 없는 문제가 발생.. 아 뭐라는거지
	 * 아무튼 그래서 일단은 random number를 생성하여 id값을 중복을 피하게 음 뭐 그러하다. */
	@RequestMapping(value = "/add_app", method = RequestMethod.POST)
	public String addApp(Locale locale, Model model,HttpServletRequest request) throws UnsupportedEncodingException 
	{
		request.setCharacterEncoding("utf-8");
		//제작툴에서 만든 것을 해석한 레이아웃 데이타와 로직 데이터를 가져옴
		String layout_data=request.getParameter("layout_data");
		String logic_data=request.getParameter("logic_data");
		//String logic_data= "<EVENT:$button_id>{<$start_text>}\n<PLANG>\n<print_string:textbox2>{<$start_text>}\n<print_string:textbox1>{<>}\n</PLANG>";
		layout_data = layout_data.substring(8, layout_data.length()-9);

		int result = appServiceImpl.addApp(layout_data, logic_data);

		if(result == 1)
			return "login";
		else
			return "error";
	}


	//앱을 실행시키는 것을 get방식으로 요청할 때는 메인페이지로 이동
	@RequestMapping(value = "/execute_app", method = RequestMethod.GET)
	public String execute_get(Locale locale, Model model,HttpServletRequest request)
	{
		System.out.println("get방식 불가");
		return "redirect:/login";
	}

	/*앱을 실행시키는 메소드*/
	@RequestMapping(value = "/execute_app", method = RequestMethod.POST )
	public String execute(Locale locale, Model model,HttpServletRequest request , Authentication auth) throws UnsupportedEncodingException 
	{
		request.setCharacterEncoding("utf-8");
		long board_id= Integer.parseInt(request.getParameter("board_id"));
		System.out.println("게시글 아이디: "+board_id);


		String script = appServiceImpl.executeApp(board_id, lifeCycleThread, auth.getName());//앱 등록 서비스

		model.addAttribute("layout_data", script);


		return "execute_app";

	}

	//게시글을 등록하는 것을 get방식으로 요청할 때는 메인페이지로 이동
	@RequestMapping(value = "/put_up", method = RequestMethod.GET)
	public String putUp_get(Locale locale, Model model,HttpServletRequest request)
	{
		System.out.println("get방식 불가");
		return "redirect:/login";
	}

	/*게시글을 등록하는 메소드*/
	@RequestMapping(value = "/put_up", method = RequestMethod.POST )
	public String putUp(Locale locale, Model model,HttpServletRequest request , HttpSession session) throws UnsupportedEncodingException 
	{
		request.setCharacterEncoding("utf-8");
		int app_id= Integer.parseInt(request.getParameter("app_id"));
		System.out.println("앱 아이디: "+app_id);

		Board b = new Board(0,app_id,null);

		boardDaoImpl.insert(b);

		return "redirect:/main";
	}

	//이벤트 처리(버튼 클릭 등의 이벤트)
	@RequestMapping(value = "/exercise", method = RequestMethod.POST)
	public @ResponseBody String exe_plang(
			@RequestParam(value="thread_id")String thread_id, 
			@RequestParam(value="layout_id")String layout_id, 
			@RequestParam(value="event_id")String event_id, 
			@RequestParam(value="start_value")String start_value, 
			HttpSession session)
	{
		//쓰레드 아이디를 레이아웃에서 가져와서 실행
		AppThread at= lifeCycleThread.getThmap(Long.parseLong(thread_id));

		//플랭 아이디를 레이아웃 아이디와 이벤트 아이디를 이용하여 가져옴
		String plang_id = scriptMapperDaoImpl.selectPlangId(Long.parseLong(layout_id), event_id);
		String plang = logicDaoImpl.selectLogic(plang_id);

		//String plang = "<C_GETFROMCOMP:text1>{<<hello>>}"
		//		+ "<S_PRINTTEXT:print1>{<text1>}";
		at.wakeUp(plang);
		return start_value;
	}

	
	@RequestMapping(value = "/checkToScript.ajax", method = RequestMethod.POST)
	public @ResponseBody String checkToScript(
			@RequestParam(value="thread_id")long thread_id, 
			HttpSession session)
	{
		AppThread at = lifeCycleThread.getThmap(thread_id);

		JSONObject toScript = at.checkQueue(sessionDaoImpl.selectEmail(session.getId()));	
		if(toScript == null)
		{
			JSONObject jsonObj = new JSONObject();
			jsonObj.put("type", "empty");
			toScript = jsonObj;
		}
		else
		{
			System.out.println("큐에서 가져온 것: "+ toScript.toJSONString());
		}
		return toScript.toJSONString();
	}

	
	/*
	 * old method: category 기반으로 cpnt호출
	@RequestMapping(value = "/getLayoutComponentsByCategory.ajax", method = RequestMethod.POST)
	public @ResponseBody String getLayoutComponentsByCategory(
			@RequestParam(value="category")long category, 
			HttpSession session)
	{
		List<LayoutCpnt> list = layoutCpntDaoImpl.selectLayoutCpnt(category);

		JSONObject obj = new JSONObject();

		JSONArray cpnt = new JSONArray();
		obj.put("size", list.size());
		for(int i = 0 ; i < list.size(); i++ )
		{
			JSONObject arr = new JSONObject();
			arr.put("id", list.get(i).getID());
			arr.put("src", list.get(i).getSRC());
			arr.put("category", list.get(i).getCATEGORY());
			cpnt.add(arr);
		}
		obj.put("cpnt", cpnt);
		return obj.toJSONString();
	}

	@RequestMapping(value = "/getLogicComponentsByCategory.ajax", method = RequestMethod.POST)
	public @ResponseBody String getLogicComponentsByCategory(
			@RequestParam(value="category")long category, 
			HttpSession session)
	{
		List<LogicCpnt> list = logicCpntDaoImpl.selectLogicCpnt(category);

		JSONObject obj = new JSONObject();

		JSONArray cpnt = new JSONArray();
		obj.put("size", list.size());
		for(int i = 0 ; i < list.size(); i++ )
		{
			JSONObject arr = new JSONObject();
			arr.put("id", list.get(i).getID());
			arr.put("src", list.get(i).getSRC());
			arr.put("category", list.get(i).getCATEGORY());
			cpnt.add(arr);
		}
		obj.put("cpnt", cpnt);
		return obj.toJSONString();
	}

	//세션이 끊기거나 중복로그인시 처리
	@RequestMapping(value = "/duplicated", method = RequestMethod.GET)
	public String duplicated(Authentication auth,HttpServletRequest req)
	{
		if(auth == null && req.getHeader("Referer")!=null)
			return "duplicated";
		else
			return "redirect:/main";
	}
	*/
}
