package com.furnitures.Service;

import com.furnitures.Entity.User;
import com.furnitures.Repository.UserRepository;
import com.furnitures.config.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private UserRepository userRepository;


    public User findUserByJwtToken(String jwt) throws Exception {
        String email= jwtProvider.getEmailFromJwtToken(jwt);

        User user=userRepository.findByEmail(email);

        //additional if token is wrong
        if(user==null)
            throw new Exception("token is not valid");

        return user;
    }

    public User findUserByEmail(String email) throws Exception {
        User user=userRepository.findByEmail(email);

        if(user==null){
            throw new Exception("User not Found");
        }

        return user;
    }
}
