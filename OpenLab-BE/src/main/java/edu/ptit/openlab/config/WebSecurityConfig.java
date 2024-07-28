package edu.ptit.openlab.config;

import edu.ptit.openlab.filter.JWTAuthenticationFilter;
import edu.ptit.openlab.filter.JWTAuthorizationFilter;
import edu.ptit.openlab.service.AuthenticationService;
import edu.ptit.openlab.service.Impl.UserDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    @Lazy
    private AuthenticationService authenticationService;

    @Autowired
    private UserDetailServiceImpl userDetailService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration().applyPermitDefaultValues();

        // Remove this line which sets allowedOrigins to "*"
        // config.setAllowedOrigins(Arrays.asList("*"));

        // Add this line to allow any origin pattern
        config.setAllowedOriginPatterns(Arrays.asList("*"));

        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()  // Kích hoạt CORS và áp dụng các cấu hình mặc định cho CORS.
                .csrf().disable()  // Vô hiệu hoá bảo vệ CSRF (Cross-Site Request Forgery).
                .authorizeRequests()  // Bắt đầu cấu hình các quy tắc uỷ quyền cho các yêu cầu HTTP.
                .antMatchers("/api/images/**",
                        "/api/upload/video/**",
                        "/api/course/**",
                        "/api/lesson/**",
                        "/auth/login/**",
                        "/auth/register/**",
                        "/swagger-ui/**",
                        "/api-docs/**",
                        "/swagger-resources/**",
                        "/webjars/**",
                        "/configuration/**",
                        "/swagger*/**",
                        "/webjars/springfox-swagger-ui/**")
                .permitAll()  // Cho phép tất cả các yêu cầu đến các đường dẫn trên mà không cần xác thực.
                .anyRequest().authenticated()  // Yêu cầu xác thực cho tất cả các yêu cầu khác.
                .and()
                // Filter cho việc đăng nhập
                .addFilter(new JWTAuthenticationFilter(authenticationManager(), authenticationService))
                // Filter cho việc xác thực token
                .addFilter(new JWTAuthorizationFilter(authenticationManager(), authenticationService))
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);  // Thiết lập chế độ quản lý phiên làm việc là không trạng thái (stateless).
    }
}
