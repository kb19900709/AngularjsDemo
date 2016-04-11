package com.service.user;

import java.util.List;

import com.myBatis.model.User;

public interface UserService {
	public List<User> getAllUser();
	public List<User> getAllUser(User param);
	public void addUser(User param);
	public void editUser(User param);
	public void deleteUser(String id);
	public boolean validate(User param); 
}
