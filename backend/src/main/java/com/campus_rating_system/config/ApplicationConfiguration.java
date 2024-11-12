package com.campus_rating_system.config;


import com.campus_rating_system.repositories.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Define the means of tools to be used for authentication
 *
 * <p>Bugs: None known
 *
 * @author Ethan Yang
 */
@Configuration
public class ApplicationConfiguration {
    private final UserRepository userRepository;

    public ApplicationConfiguration(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Responsible for retrieving details based on username
     * (ACTUAL LOGIC)
     *
     * @return user information when performing authentication
     */
    @Bean
    UserDetailsService userDetailsService() {
        return username -> (org.springframework.security.core.userdetails.UserDetails)
                userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    /**
     * Responsible for hashing passwords
     * (ACTUAL LOGIC)
     *
     * @return password encryptor to use
     */
    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Responsible to manage authentication, manage requests
     * used to check login info (like a gatekeeper)
     * <p>
     * ex: When someone tries to access a secure part of your app, Spring checks
     * if they’re logged in. If not, it asks the AuthenticationManager to check
     * their login info.
     *
     * @param config is the configuration used when validating a use
     * @return configuration setting
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Responsible to handle actual authentication logic, set the settings
     *
     * @return configuration setting
     */
    @Bean
    AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }
}