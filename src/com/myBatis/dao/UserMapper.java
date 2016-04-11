package com.myBatis.dao;

import com.myBatis.model.User;
import java.util.List;

public interface UserMapper {
    int deleteByPrimaryKey(String seqNo);

    int insert(User record);

    User selectByPrimaryKey(String seqNo);

    List<User> selectAll();
    
    List<User> selectAllByParam(User param);

    int updateByPrimaryKey(User record);
    
    List<User> selectAllByParamForValid(User param);
}