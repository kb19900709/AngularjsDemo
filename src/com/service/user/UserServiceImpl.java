package com.service.user;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myBatis.dao.UserMapper;
import com.myBatis.model.User;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserMapper userMapper;

	@Override
	public List<User> getAllUser() {
		return userMapper.selectAll();
	}

	@Override
	public List<User> getAllUser(User param) {
		return userMapper.selectAllByParam(param);
	}

	@Override
	public void addUser(User param) {
		userMapper.insert(param);
	}

	@Override
	public void editUser(User param) {
		userMapper.updateByPrimaryKey(param);
	}

	@Override
	public void deleteUser(String id) {
		userMapper.deleteByPrimaryKey(id);
	}

	@Override
	public boolean validate(User param) {
		boolean result = true;
		List<User> resultList = userMapper.selectAllByParamForValid(param);
		if(!CollectionUtils.isEmpty(resultList)){
			result = false;
		}
		return result;
	}

}
