package com.furnitures.Controller;

import com.furnitures.Entity.USER_ROLE;
import com.furnitures.Entity.User;
import com.furnitures.Exception.ResourceNotFoundException;
import com.furnitures.Repository.UserRepository;
import com.furnitures.Request.LoginRequest;
import com.furnitures.Response.AuthResponse;
import com.furnitures.Service.CustomUserDetailsService;
import com.furnitures.config.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("api/auth")
public class AuthController {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception {

        User isEmailExists=userRepository.findByEmail(user.getEmail());
        if(isEmailExists!=null){
            throw new Exception("email is already exists enter another email");
        }
        User createdUser=new User();

        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser=userRepository.save(createdUser);


        Authentication authentication= new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt=jwtProvider.generateToken(authentication);

        AuthResponse authResponse=new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setRole(savedUser.getRole());
        authResponse.setMessage("Register Success");


        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);

    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse>signin(@RequestBody LoginRequest loginRequest) throws Exception{

        String username=loginRequest.getEmail();
        String password=loginRequest.getPassword();

        Authentication authentication=authenticate(username,password);

        Collection<?extends GrantedAuthority> authorities=authentication.getAuthorities();
        String role=authorities.isEmpty()?null:authorities.iterator().next().getAuthority();


        String jwt=jwtProvider.generateToken(authentication);

        AuthResponse authResponse=new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("sign in success");
        authResponse.setRole(USER_ROLE.valueOf(role));

        return new ResponseEntity<>(authResponse,HttpStatus.OK);
    }


    private Authentication authenticate(String username, String password) throws Exception{
        User user= userRepository.findByEmail(username);

        if(user==null){
            throw new ResourceNotFoundException("Invalid EmailId");
        }


        UserDetails userDetails=customUserDetailsService.loadUserByUsername(username);

        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new ResourceNotFoundException("Invalid Password...");

        }


        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());

    }





}
