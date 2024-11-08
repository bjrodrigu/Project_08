package com.campus_rating_system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * This class is used to limit what users can and cannot access such as viewing specific
 * pages and what types of requests we can make.
 *
 * <p>Bugs: None known
 *
 * @Author Ethan Yang
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * Security configuration determines what users can and cannot see based on
     * whether they are logged into system or not
     *
     * <p>Bugs: None known
     *
     * @Author Ethan Yang
     */
    public SecurityConfiguration(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            AuthenticationProvider authenticationProvider
    ) {
        this.authenticationProvider = authenticationProvider;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    /**
     * Defines what web pages can and cannot be accessed based on user privilege level
     * and the rules that will be applied when authenticating.
     *
     * @param http the JWT token
     * @return the final config to be used by spring boot
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers("/user/login", "/user/signup", "/public/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                // Session Management Policy: The session management is set to stateless,
                // meaning the application will not create HTTP sessions.
                // Each request must be authenticated independently, typically using a JWT.
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                // What mechanisms are used for authentication
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    /**
     * Explicitly defining allowed origins, methods, and headers,
     * you control which cross-origin requests are permitted
     *
     * @return the final config to be used by spring boot
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // allowed sites to make requests
        configuration.setAllowedOrigins(List.of("http://localhost:8080", "http://localhost:3030"));
        configuration.setAllowedMethods(List.of("GET","POST"));
        configuration.setAllowedHeaders(List.of("Authorization","Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**",configuration);

        return source;
    }
}