package com.company.blog.service;

import com.company.blog.dto.LoginDto;
import com.company.blog.entity.Role;
import com.company.blog.dto.UserDto;
import com.company.blog.entity.User;
import com.company.blog.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void registerUser(UserDto userDto) {
        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new IllegalStateException("이미 존재하는 이메일입니다.");
        }

        User newUser = User.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword())) // ✅ 비밀번호 암호화 필수
                .email(userDto.getEmail())
                .role(Role.ROLE_USER) // 기본값 USER
                .build();

        userRepository.save(newUser); // ✅ DB 저장
    }

    public boolean authenticateUser(LoginDto loginDto) {
        return userRepository.findByEmail(loginDto.getEmail())
                .map(user -> passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) // ✅ 비밀번호 검증
                .orElse(false); // ✅ 아이디가 없으면 false 반환
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
}