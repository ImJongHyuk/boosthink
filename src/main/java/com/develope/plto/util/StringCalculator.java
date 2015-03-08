package com.develope.plto.util;

import javax.script.*;

public class StringCalculator {
	ScriptEngineManager mgr = new ScriptEngineManager();
	ScriptEngine engine = mgr.getEngineByName("JavaScript");
	
	public Object calculate(String input)
	{
		System.out.println("asdf1");
		Object retval= null;
		try {
			retval = engine.eval(input);
		} catch (ScriptException e) {
			// TODO Auto-generated catch block
			System.out.println("계산 오류");
			e.printStackTrace();
		}
		
		System.out.println("asdf");
		System.out.println(retval);
		return retval;
	}
}
