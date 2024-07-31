package com.furnitures.Service;

import com.furnitures.Entity.USER_ROLE;
import com.furnitures.Entity.User;
import com.furnitures.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        List<GrantedAuthority> authorities = new ArrayList<>();
        if(user==null) {
            throw new UsernameNotFoundException("user not found with email" + username);
        }
        else  {
            USER_ROLE role = user.getRole();
            authorities = new ArrayList<>();

            authorities.add(new SimpleGrantedAuthority(role.toString()));


        }
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                authorities);
    }
}
