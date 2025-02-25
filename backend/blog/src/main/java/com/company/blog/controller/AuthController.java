package com.company.blog.controller;

import com.company.blog.dto.LoginDto;
import com.company.blog.dto.UserDto;
import com.company.blog.entity.User;
import com.company.blog.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> register(@RequestBody @Valid UserDto userDto) {
        userService.registerUser(userDto);
        return ResponseEntity.ok("회원가입 성공!");
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginDto loginDto) {
        User user = userService.authenticate(loginDto.getUsername(), loginDto.getPassword());
        return ResponseEntity.ok(user); // ✅ User 객체 반환
    }
}
