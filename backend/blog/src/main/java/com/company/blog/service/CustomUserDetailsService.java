package com.company.blog.service;

import com.company.blog.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository; // 사용자 정보가 저장된 리포지토리

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // DB에서 사용자 정보 조회

        com.company.blog.entity.User dbUser = (com.company.blog.entity.User) userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        log.info(dbUser.toString());
        UserDetails user = User.builder()
                .username(dbUser.getEmail())
                .password(dbUser.getPassword())
                .roles("USER") // 단일 역할인 경우
                .build();
        log.info(user.toString());

        return user;
    }
}