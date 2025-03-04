package com.company.blog.controller;

import ch.qos.logback.core.net.SMTPAppenderBase;
import com.company.blog.Utils.JwtUtil;
import com.company.blog.dto.LoginDto;
import com.company.blog.dto.UserDto;
import com.company.blog.entity.User;
import com.company.blog.service.UserService;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;


    @PostMapping("/signup")
    public ResponseEntity<String> register(@RequestBody UserDto userDto) {
        try {
            userService.registerUser(userDto);
            return ResponseEntity.ok("회원가입 성공!");
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("서버 오류로 회원가입에 실패했습니다.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userService.findByEmail(request.getEmail()); // 이메일로 사용자 조회

        String token = jwtUtil.generateToken(request.getEmail());


        return ResponseEntity.ok(new AuthResponse(token, user.getUsername()));

    }
    // ✅ 로그인 요청 DTO
    @Getter
    @Setter
    static
    class LoginRequest {
        private String email;
        private String password;
        // ✅ Getter, Setter 추가
    }

    // ✅ 로그인 응답 DTO
    class AuthResponse {
        private String token;
        private String username; // ✅ username 추가
        public AuthResponse(String token, String username) { this.token = token;  this.username = username; }
        public String getToken() { return token; }
    }
}
