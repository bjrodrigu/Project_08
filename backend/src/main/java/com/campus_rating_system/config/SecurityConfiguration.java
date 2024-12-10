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
 * This class is used to limit what users can and cannot access such as viewing
 * specific
 * pages and what types of requests we can make.
 *
 * <p>
 * Bugs: None known
 *
 * @author Ethan Yang
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
     * <p>
     * Bugs: None known
     *
     * @param jwtAuthenticationFilter file conatined in config directory
     * @param authenticationProvider auto implemented by spring boot
     */
    public SecurityConfiguration(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            AuthenticationProvider authenticationProvider) {
        this.authenticationProvider = authenticationProvider;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    /**
     * Defines what web pages can and cannot be accessed based on user privilege
     * level
     * and the rules that will be applied when authenticating.
     *
     * @param http the JWT token
     * @return the final config to be used by spring boot
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors() // allow CORS configuration
                .and()
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers("/user/login", "/user/signup", "/public/**",
                      "/location/getLocations", "/review/getAllReviews", 
                      "/review/getReviewsForLocation", "/review/getReviewsForUser",
                      "/building/getBuildings")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);
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
        configuration.setAllowedOrigins(List.of("http://localhost:8080", "http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        // credentials: Indicates whether user credentials should be included.
        // "include": Specifies that credentials (such as Cookies) should be included
        // regardless of whether the request is cross-origin or not.
        configuration.setAllowCredentials(true); // activate credentials
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}