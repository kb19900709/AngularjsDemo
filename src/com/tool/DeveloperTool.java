package com.tool;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

/**
 * 
 * @author KB
 * @version 2016/04/03
 *
 */
public class DeveloperTool {
	
	public static Map<String,Object> invokeMapToBean(Object obj){
		Map<String,Object> map = new HashMap<String,Object>();
		Class<?> clazz = obj.getClass();
		try{
			Field[] declaredFields = obj.getClass().getDeclaredFields();
			String fieldName;String methodName;Method method;Object invokeValue;
			for(Field field:declaredFields){
				fieldName = field.getName();
				methodName = DeveloperTool.getMethodName("get", fieldName);
				method = clazz.getMethod(methodName);
				invokeValue = method.invoke(obj);
				if(invokeValue!=null && checkObject(invokeValue)){
					map.put(fieldName, invokeValue);
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return map;
	}
	
	private static boolean checkObject(Object obj){
		Class<?> clazz = obj.getClass();
		boolean resultFlag = true;
		if(clazz.isAssignableFrom(String.class)){
			String str = (String)obj;
			if(StringUtils.isEmpty(str)){
				resultFlag = false;
			}
		}else if(clazz.isAssignableFrom(Date.class)){
			
		}
		return resultFlag;
	}
	
	private static String getMethodName(String prefix,String fieldName){
		if(StringUtils.isEmpty(prefix) || StringUtils.isEmpty(fieldName)){
			return null;
		}
		StringBuffer sb = new StringBuffer();
		sb.append(prefix);
		sb.append(fieldName.toUpperCase().charAt(0)+fieldName.substring(1));
		return sb.toString();
	}
	
	//取得非null、非final的成員變數資訊
	public static String getBeanToStringMsg(Object obj){
		StringBuffer sb = new StringBuffer();
		Field[] declaredFields = obj.getClass().getDeclaredFields();
		for(Field field : declaredFields){
			field.setAccessible(true);
			try{
				if(field.get(obj)!=null && 
						Modifier.toString(field.getModifiers()).indexOf("final")==-1){
					sb.append(field.getName()+" >>> "+field.get(obj)+"\n");
				}
			}catch(Exception e){
				//nothing to do
			}
		}
		return sb.toString();
	}
}