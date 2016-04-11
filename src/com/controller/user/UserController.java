package com.controller.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.myBatis.model.User;
import com.service.user.UserService;
import com.tool.DeveloperTool;

@Controller
public class UserController {
	
	private Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UserService userSrv;
	
	@RequestMapping(value = "/user" ,method = RequestMethod.GET)
	@ResponseBody
	private Map<String,Object> getAllUser(){
		logger.info("UserController.getAllUser begin");
		Map<String,Object> result = new HashMap<String,Object>();
		try{
			List<User> resultList = userSrv.getAllUser();
			if(!CollectionUtils.isEmpty(resultList)){
				result.put("resultList", resultList);
				result.put("resultFlag", true);
			}
		}catch(Exception e){
			logger.info("GET : /user >>> "+ e);
			e.printStackTrace();
		}
		return result;
	}
	
	@RequestMapping(value = "/user" ,method = RequestMethod.POST)
	@ResponseBody
	private Map<String,Object> addUser(@RequestBody User user){
		logger.info("UserController.addUser begin");
		Map<String,Object> result = new HashMap<String,Object>();
		try{
			userSrv.addUser(user);
			result.put("resultFlag", true);
		}catch(Exception e){
			logger.info("POST : /user >>> "+ e);
			e.printStackTrace();
		}
		return result;
	}
	
	@RequestMapping(value = "/user/{id}" ,method = RequestMethod.DELETE)
	@ResponseBody
	private Map<String,Object> deleteUser(@PathVariable("id") String id){
		logger.info("UserController.deleteUser begin");
		Map<String,Object> result = new HashMap<String,Object>();
		try{
			userSrv.deleteUser(id);
			result.put("resultFlag", true);
		}catch(Exception e){
			logger.info("DELETE : /user/"+id+" >>> "+ e);
			e.printStackTrace();
		}
		return result;
	}
	
	@RequestMapping(value = "/user/{id}" ,method = RequestMethod.PUT)
	@ResponseBody
	private Map<String,Object> updateUser(@PathVariable("id") String id ,@RequestBody User user){
		logger.info("UserController.updateUser begin");
		Map<String,Object> result = new HashMap<String,Object>();
		try{
			userSrv.editUser(user);
			result.put("resultFlag", true);
		}catch(Exception e){
			logger.info("PUT : /user/"+id+" >>> "+ e);
			e.printStackTrace();
		}
		return result;
	}
	
	@RequestMapping(value = "/user/query" ,method = RequestMethod.POST)
	@ResponseBody
	private Map<String,Object> getAllUserByParam(@RequestBody User user){
		logger.info("UserController.getAllUserByParam begin");
		Map<String,Object> result = new HashMap<String,Object>();
		try{
			List<User> resultList = userSrv.getAllUser(user);
			if(!CollectionUtils.isEmpty(resultList)){
				result.put("resultList", resultList);
				result.put("resultFlag", true);
			}
		}catch(Exception e){
			logger.info("POST : /user/query >>> "+ e);
			e.printStackTrace();
		}
		return result;
	}
	
	@RequestMapping(value = "/user/validate" ,method = RequestMethod.POST)
	@ResponseBody
	private ResponseEntity<?> validateByParam(@RequestBody User user){
		logger.info("UserController.validateByParam begin");
		HttpStatus resultHttpStatus = HttpStatus.OK;
		try{
			Map<String, Object> userMap = DeveloperTool.invokeMapToBean(user);
			if(userMap.size()>0){
				if(userMap.size() == 1 && MapUtils.getString(userMap, "seqNo") != null){
					resultHttpStatus = HttpStatus.NOT_FOUND;
				}else{
					boolean validate = userSrv.validate(user);
					if(!validate){
						resultHttpStatus = HttpStatus.BAD_REQUEST;
					}
				}
			}			
		}catch(Exception e){
			logger.info("POST : /user/validate >>> "+ e);
			e.printStackTrace();
		}
		return ResponseEntity.status(resultHttpStatus).body(null);
	}
}
