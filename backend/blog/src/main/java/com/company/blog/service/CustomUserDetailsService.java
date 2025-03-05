package com.company.blog.service;

import com.company.blog.entity.User;
import com.company.blog.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        log.info("🔍 JWT에 든 이메일: {}", email);
        // ✅ DB에서 사용자 정보 조회
        User dbUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        log.info("🔍 DB에서 찾은 사용자: {}", dbUser);

        // ✅ 사용자 역할 가져오기
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(dbUser.getRole().name()));
        log.info("🔍 부여된 권한: {}", authorities);

        // ✅ Spring Security의 UserDetails 객체 생성 (username을 email로 저장)
        return new org.springframework.security.core.userdetails.User(
                dbUser.getUsername(),  // ✅ email을 username 필드로 설정
                dbUser.getPassword(),
                authorities
        );
    }
}
