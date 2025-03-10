package com.company.blog.config;

import com.company.blog.Utils.JwtFilter;
import com.company.blog.Utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil; // JwtUtil만 주입받고, JwtFilter는 메서드에서 생성

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // JwtFilter를 Bean으로 생성
    @Bean
    public JwtFilter jwtFilter(AuthenticationManager authenticationManager) {
        return new JwtFilter(jwtUtil, userDetailsService, authenticationManager);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF 보호 비활성화
                .cors(Customizer.withDefaults()) // CORS 설정 기본값 사용
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/signup", "/api/auth/login").permitAll() // 회원가입, 로그인은 모든 사용자 접근 가능
                        .requestMatchers(HttpMethod.GET, "/api/post/all", "/api/post/{id}", "/api/comments/{postId}").permitAll() // 게시글 조회는 허용
                        .requestMatchers(HttpMethod.POST, "/api/post/create","/api/comments/{postId}").authenticated() // ✅ 게시글 작성은 로그인 필요
                        .requestMatchers(HttpMethod.PUT, "/api/post/**").authenticated() // ✅ 게시글 수정은 로그인 필요
                        .requestMatchers(HttpMethod.DELETE, "/api/post/**","/api/comments/{commentId}").authenticated() // ✅ 게시글 삭제도 로그인 필요
                        .anyRequest().authenticated()) // 나머지 요청은 인증 필요
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 사용 X (JWT 기반 인증)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder()); // 패스워드 인코더 설정 추가
        return provider;
    }
}
