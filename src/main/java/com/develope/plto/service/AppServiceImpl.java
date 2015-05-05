package com.develope.plto.service;

import java.util.*;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import com.develope.plto.dao.*;
import com.develope.plto.domain.*;
import com.develope.plto.thread.*;
import com.develope.plto.util.*;

@Service("AppService")
public class AppServiceImpl implements AppService {

	@Autowired
	private ScriptMapperDaoImpl scriptMapperDaoImpl;

	@Autowired
	private LayoutDaoImpl layoutDaoImpl;

	@Autowired
	private LogicDaoImpl logicDaoImpl;

	@Autowired
	private BoardDaoImpl boardDaoImpl;

	/** old method: 두 값을 전부 받아서 한번에 변경하여 추가하는 서비스 */
	/** 지금은 MakeAppThread에서 List를 String으로 변경하여 본 메소드를 통해 새로운 board 디비 추가 */
	@Override
	public int addApp(String layout_data, String logic_data) {
		// TODO Auto-generated method stub
		Random random = new Random();
		int layout_id;
		List<String> logic_id = new ArrayList<String>();
		List<String> event_id = new ArrayList<String>();

		Layout layout = new Layout();
		Logic logic = new Logic();
		ScriptMapper sm = new ScriptMapper();

		// 레이아웃을 디비에 추가!!!!!!
		layout_id = random.nextInt();
		while (!(layoutDaoImpl.selectLayout(layout_id) == null)) {
			layout_id = random.nextInt();
		}
		layout.setId(layout_id);
		layout.setLayout(layout_data);

		if (layoutDaoImpl.insert(layout) == 0)
			return 0;

		// 로직을 디비에 추가!!!!
		String plang = "";
		String li = "";
		String[] logic_data_line = logic_data.split("\n");
		for (int i = 0; i < logic_data_line.length; i++) {
			if (logic_data_line[i].startsWith("<EVENT:")) {
				// 매퍼디비에 등록할 이벤트아이디를 event_id리스트에 추가
				event_id.add(logic_data_line[i]);
			} else if (logic_data_line[i].startsWith("<PLANG>")) {
				continue;
			}
			// 한 단위의 플랭이 끝났을 때
			else if (logic_data_line[i].startsWith("</PLANG>")) {
				// 플랭을 해싱하여 아이디로 활용
				li = MyMD5.testMD5(plang);
				String plang_temp;
				String logic_id_temp = li;
				while (true) {
					// 해싱한 아이디가 겹칠 경우
					if (!((plang_temp = logicDaoImpl.selectLogic(li)) == null)) {
						// 아이디가 겹치지만 플랭은 같지 않을 경우 아이디 뒤에 랜덤 숫자를 덧붙임
						if (!plang_temp.equals(plang)) {
							li = logic_id_temp + random.nextInt();
							continue;
						}

						// 아이디와 플랭까지 같은 경우 디비에 저장하지 않음
						else {
							break;
						}
					}

					// 해싱한 아이디가 유일할 경우 db에 저장한다
					else {
						logic.setId(li);
						logic.setLogic(plang);
						if (logicDaoImpl.insert(logic) == 0)
							return 0;
					}
				}
				// 매퍼에 등록하기 위해 로직아이디 리스트에도 추가
				logic_id.add(li);
				// 초기화
				plang = "";
				li = "";
			}
			// 일반적인 로직라인일 경우plang에 붙여나감
			else {
				plang = plang.concat(logic_data_line[i]).concat("\n");
			}
		}

		// 매퍼디비에 추가!!!
		for (int i = 0; i < logic_id.size(); i++) {
			sm.setId(0);
			sm.setPlangId(logic_id.get(i));
			sm.setLayoutId(layout_id);
			sm.setEventId(event_id.get(i));

			if (scriptMapperDaoImpl.insert(sm) == 0)
				return 0;
		}

		return 1;
	}

	@Override
	public int manageAppService(long layout_id, String email) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public String executeApp(long board_id, LifeCycleThread lct, String email) {
		// TODO Auto-generated method stub

		String res_script;

		long layout_id = boardDaoImpl.selectLayoutId(board_id);// 게시글에 해당하는
																// 레이아웃을 가져옴

		AppThread at;// 실행시킬 쓰레드

		// 게시글에 쓰레드가 이미 할당되어 있을 때 할당되어 있는 쓰레드를 가져온다.

		if (lct.getBtmap(board_id) != null) {
			at = lct.getThmap((long) lct.getBtmap(board_id));
		}

		// 게시글에 쓰레드가 할당되지 않았을 때 새로 쓰레드를 생성한다.
		else {
			at = new AppThread();
			lct.submitThread(at);
			while (true) {
				if (at.getId() != -1) {
					System.out.println("쓰레드 아이디 할당 완료");
					lct.putThmap(at.getId(), at);
					break;
				}
				System.out.println("쓰레드 아이디 할당 실패");
			}

			lct.putBtmap(board_id, at.getId());// 게시글 아이디와 쓰레드 아이디를 매핑시킴

			at.setBoardId(board_id);// 쓰레드에 게시판아이디 저장(처음 할당될때만 한다)

			at.startCore(at);// 새로운 쓰레드이니 코어도 새로 생성한다.
		}

		res_script = layoutDaoImpl.selectLayout(layout_id);
		res_script = res_script
				.concat("<INPUT id=\"layout_id\" type=hidden value=\""
						+ layout_id + "\">");
		res_script = res_script
				.concat("<INPUT id=\"thread_id\" type=hidden value=\""
						+ at.getId() + "\">");

		// 이메일 주소 할당.
		at.insertMemberSession(email);

		return res_script;
	}

}
