package edu.ptit.openlab.controller.auth;
import edu.ptit.openlab.DTO.AuthenticationResponse;
import edu.ptit.openlab.DTO.LoginRequestDTO;
import edu.ptit.openlab.DTO.RegisterRequestDTO;
import edu.ptit.openlab.entity.User;
import edu.ptit.openlab.payload.response.BaseResponse;
import edu.ptit.openlab.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
//@PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_USER')")
public class AuthController {
    @Autowired
    private AuthenticationService authenticationService;

    // Login
    @PostMapping("/login")
    public ResponseEntity<BaseResponse> login(@RequestBody LoginRequestDTO loginRequest){
        BaseResponse response = new BaseResponse();
        try {
            AuthenticationResponse authResponse = authenticationService.login(loginRequest.getEmail(), loginRequest.getPassword());
            String token = authResponse.getToken();
            response.setStatus(HttpStatus.OK.value());
            response.setMessage("Login successfully");
            response.setData(authResponse);
            return ResponseEntity.ok().header("Authorization", "Bearer " + token).body(response);
        } catch (BadCredentialsException e){
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setMessage("Invalid email or password");
            response.setData(null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO request){
        try {
            User user = authenticationService.register(request.getUsername(), request.getEmail(), request.getPassword(), request.getRole());
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (IllegalArgumentException | IllegalAccessException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<BaseResponse> getAllUsers(){
        List<User> listUsers = authenticationService.getAllUsers();
        BaseResponse baseResponse = new BaseResponse();
        try {
            baseResponse.setStatus(200);
            baseResponse.setMessage("Successfully");
            baseResponse.setData(listUsers);
            return ResponseEntity.ok(baseResponse);
        } catch (Exception e){
            baseResponse.setStatus(400);
            baseResponse.setMessage("FAILED");
            return ResponseEntity.ok(baseResponse);
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<BaseResponse> updateUser(@PathVariable Long userId,
                                                   @RequestParam(required = false) String username,
                                                   @RequestParam(required = false) String email,
                                                   @RequestParam(required = false) String password,
                                                   @RequestParam(required = false) String role
    ){
        User updateUser = authenticationService.updateUser(userId, username, email, password, role);
        BaseResponse baseResponse = new BaseResponse();
        try {
            baseResponse.setStatus(200);
            baseResponse.setMessage("Updated successfully");
            baseResponse.setData(updateUser);
            return ResponseEntity.ok(baseResponse);
        } catch (Exception e){
            baseResponse.setStatus(500);
            baseResponse.setMessage("Update faile: " + e.getMessage());
            return ResponseEntity.badRequest().body(baseResponse);
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId){
        BaseResponse baseResponse = authenticationService.deleteUser(userId);
        if(baseResponse.getStatus() == 200){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(baseResponse.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
