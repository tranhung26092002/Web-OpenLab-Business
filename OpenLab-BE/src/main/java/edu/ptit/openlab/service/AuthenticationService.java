package edu.ptit.openlab.service;

import edu.ptit.openlab.DTO.AuthenticationResponse;
import edu.ptit.openlab.entity.User;
import edu.ptit.openlab.payload.response.BaseResponse;
import edu.ptit.openlab.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.*;

@Service
public class AuthenticationService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Đoạn JWT_SECRET là bí mật, chỉ có phía server biết
    @Value("${jwt.secret-key}")
    private String JWT_SECRET_STRING;

    // method sử dụng key mở khóa
    private Key getSecretKey() {
        byte[] decodedKey = Base64.getDecoder().decode(JWT_SECRET_STRING);
        return Keys.hmacShaKeyFor(decodedKey);
    }
    //    private final Key JWT_SECRET = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    // Thời gian có hiêu lực của jwt (10 ngày)
    private final long JWT_EXPIRATION = 86400000L;

    public AuthenticationResponse login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            // Thong tin dang nhap dung tao ra jwt token
            String token = createToken(user);

            // trả về email
            AuthenticationResponse response = new AuthenticationResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRoles());
            return response;
        }
        throw new BadCredentialsException("Invalid email or password");
    }

    public User register(String username, String email, String password, String role) throws IllegalAccessException {
        //Kiểm tra xem email tồn tại không
        Optional<User> existingUser = Optional.ofNullable(userRepository.findByEmail(email));
        if(existingUser.isPresent()){
            throw new IllegalAccessException("Email already in use");
        }

        // Ma hoa mat khau
        String encryptedPassword = passwordEncoder.encode(password);

        // Tao nguoi dung moi va luu vao co so du lieu
        User newUser = new User();

        newUser.setName(username);
        newUser.setEmail(email);
        newUser.setPassword(encryptedPassword);

        Set<String> roles = new HashSet<>();
        roles.add(role);
        newUser.setRoles(roles);

        return userRepository.save(newUser);
    }

    public User updateUser(Long userId, String newName, String newEmail, String newPassword, String newRole){
        User user = userRepository.findById(userId)
                .orElseThrow(()->new NoSuchElementException("User not found with id: " + userId));

        if (newName != null && !newName.isEmpty()) {
            user.setName(newName);
        }
        if (newEmail != null && !newEmail.isEmpty()) {
            user.setEmail(newEmail);
        }
        if (newPassword != null && !newPassword.isEmpty()) {
            user.setPassword(passwordEncoder.encode(newPassword));
        }
        if (newRole != null) {
            Set<String> roles = user.getRoles();
            if (!roles.contains(newRole)) {
                roles.add(newRole);
                user.setRoles(roles);
            }
        }
        return userRepository.save(user);
    }

    public BaseResponse deleteUser(Long userId) {
        try {
            userRepository.deleteById(userId);
            return new BaseResponse(200,"User deleted successfully", null);
        } catch (Exception e) {
            // Xử lý ngoại lệ khi không thể xóa người dùng
            e.printStackTrace();
            return new BaseResponse(500,"Failed to delete user", null);
        }
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    private String createToken(User user) {
        // Thời gian hết hạn của Token
        Date expiryDate = new Date(System.currentTimeMillis() + JWT_EXPIRATION);
        //Tạo chuỗi json web token từ id của user
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("roles", user.getRoles())
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(getSecretKey())
                .compact();
    }

    public UserDetails verifyToken(String token){
        try {
            // Giải mã token
            String email = Jwts.parserBuilder()
                    .setSigningKey(getSecretKey()).build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
            // trả về email từ token
            User user = userRepository.findByEmail(email);
            // Trả về một đối tượng UserDetails
            if (user != null) {
                List<GrantedAuthority> authorities = new ArrayList<>();
                for (String role : user.getRoles()) {
                    authorities.add(new SimpleGrantedAuthority(role));
                }

                return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
            } else {
                return null; // User not found
            }
        } catch (Exception e){
            // Nếu token không hợp lệ, hoặc hết hạn trả về null
            return null;
        }
    }
}
